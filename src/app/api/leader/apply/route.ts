import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";
import { movementLeaderApplications } from "@/lib/db/schema";
import { createSlidingWindowRateLimiter } from "@/lib/rate-limit-in-memory";

const applyRateLimitIp = createSlidingWindowRateLimiter(8, 60 * 60 * 1000);

const ReferenceEntrySchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  relationship: z.string().min(1).max(200),
});

const ApplySchema = z.object({
  full_name: z.string().min(1).max(200),
  email: z.string().email(),
  organization: z.string().max(200).optional(),
  role: z.string().max(200).optional(),
  why_leader: z.string().min(20).max(8000),
  bio: z.string().min(20).max(8000),
  photo_url: z.string().url().max(2000).optional().or(z.literal("")),
  reference_entries: z.array(ReferenceEntrySchema).max(6).default([]),
});

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (!applyRateLimitIp(ip)) {
    return NextResponse.json(
      { error: { code: "RATE_LIMITED", message: "Too many submissions. Try again later." } },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: { code: "INVALID_JSON", message: "Request body must be JSON." } },
      { status: 400 },
    );
  }

  const parsed = ApplySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: parsed.error.issues[0]?.message ?? "Validation failed",
        },
      },
      { status: 400 },
    );
  }

  const refs = parsed.data.reference_entries ?? [];
  const photoUrl =
    parsed.data.photo_url && parsed.data.photo_url.length > 0 ? parsed.data.photo_url : null;

  try {
    await db.insert(movementLeaderApplications).values({
      full_name: parsed.data.full_name,
      email: parsed.data.email.trim().toLowerCase(),
      organization: parsed.data.organization ?? null,
      role: parsed.data.role ?? null,
      why_leader: parsed.data.why_leader,
      bio: parsed.data.bio,
      photo_url: photoUrl,
      reference_entries: refs,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("movement_leader_applications insert failed:", err);
    return NextResponse.json(
      {
        error: {
          code: "SERVER_ERROR",
          message:
            "We could not save your application yet. The database may still be migrating — try again soon.",
        },
      },
      { status: 500 },
    );
  }
}
