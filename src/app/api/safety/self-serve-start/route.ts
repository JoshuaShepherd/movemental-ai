import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { createSlidingWindowRateLimiter } from "@/lib/rate-limit-in-memory";
import { provisionSafetyOrganization } from "@/lib/services/safety/provision-safety-org";

const rateLimit = createSlidingWindowRateLimiter(10, 60 * 60 * 1000);

const BodySchema = z.object({
  orgName: z.string().min(2).max(200),
  email: z.string().email().max(320),
  contactName: z.string().max(200).optional(),
});

/**
 * Self-serve Safety dashboard start: provision org + artifacts immediately.
 * Client sends magic-link OTP after this succeeds.
 */
export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: { code: "rate_limited", message: "Too many attempts. Try again later." } },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: { code: "invalid_json", message: "Body must be JSON." } },
      { status: 400 },
    );
  }

  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "validation_error", message: parsed.error.issues[0]?.message ?? "Invalid body." } },
      { status: 400 },
    );
  }

  const result = await provisionSafetyOrganization({
    orgName: parsed.data.orgName,
    email: parsed.data.email,
    contactName: parsed.data.contactName,
    source: "self_serve",
  });

  if (!result.success) {
    const status = result.error.code === "validation_error" ? 400 : 500;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json({
    success: true,
    data: {
      inquiryId: result.data.inquiryId,
      idempotent: result.data.idempotent,
    },
  });
}
