import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/db/schema";
import {
  notifyContactInbox,
  sendContactSubmitterAck,
} from "@/lib/email/contact-notifications";
import { createSlidingWindowRateLimiter } from "@/lib/rate-limit-in-memory";

const contactRateLimitIp = createSlidingWindowRateLimiter(5, 60 * 60 * 1000);

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Valid email is required"),
  organization: z.string().max(200).optional(),
  audience_segment: z.enum([
    "Movement leader",
    "Organization / institution",
    "Media / research",
    "Other",
  ]),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (!contactRateLimitIp(ip)) {
    return NextResponse.json(
      { error: { code: "RATE_LIMITED", message: "Too many submissions. Please try again later." } },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: { code: "INVALID_JSON", message: "Request body must be valid JSON" } },
      { status: 400 },
    );
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: parsed.error.issues[0]?.message ?? "Validation failed" } },
      { status: 400 },
    );
  }

  try {
    const [row] = await db
      .insert(contactSubmissions)
      .values(parsed.data)
      .returning({ id: contactSubmissions.id });

    if (row?.id) {
      const payload = { submissionId: row.id, ...parsed.data };
      try {
        await Promise.all([
          notifyContactInbox(payload),
          sendContactSubmitterAck(payload),
        ]);
      } catch (emailErr) {
        console.error("Contact email side-effects failed (submission saved):", emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact submission failed:", err);
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 },
    );
  }
}
