import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { createSlidingWindowRateLimiter } from "@/lib/rate-limit-in-memory";
import { canEnrolledEmailSignUp } from "@/lib/services/safety/enrollment-gate";

const rateLimit = createSlidingWindowRateLimiter(20, 60 * 60 * 1000);

const BodySchema = z.object({
  email: z.string().email().max(320),
});

/**
 * Gated signup pre-check. Returns the same generic message when blocked (no enumeration).
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
      { error: { code: "validation_error", message: "Enter a valid email address." } },
      { status: 400 },
    );
  }

  const allowed = await canEnrolledEmailSignUp(parsed.data.email);
  if (!allowed) {
    return NextResponse.json(
      {
        error: {
          code: "not_eligible",
          message: "Check your enrollment email, signup opens after your dashboard is provisioned.",
        },
      },
      { status: 403 },
    );
  }

  return NextResponse.json({ success: true, data: { allowed: true } });
}
