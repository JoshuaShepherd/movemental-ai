import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { recordFieldGuideLead } from "@/lib/leads/field-guide-lead";
import { createSlidingWindowRateLimiter } from "@/lib/rate-limit-in-memory";
import { getTenantOrgId } from "@/lib/tenant";

const ToolkitSchema = z.object({
  email: z.string().email("Valid email is required"),
  organization: z.string().max(200).optional(),
  source: z.string().max(80).optional(),
  /** When `sandbox`, sends the Sandbox Field Guide PDF and tags `sandbox-toolkit:*`. Default: Safety. */
  fieldGuide: z.enum(["safety", "sandbox"]).optional(),
  /** Sandbox gate only — when `review`, the lead is stored but no PDF email is sent. */
  gatePath: z.enum(["safestart", "attestation", "review"]).optional(),
  metadata: z.any().optional(),
});

const toolkitRateLimitIp = createSlidingWindowRateLimiter(10, 60 * 60 * 1000);

/**
 * Lead capture for field guide downloads (Safety by default; Sandbox when `fieldGuide: "sandbox"`).
 *
 * Reuses the `newsletter_subscribers` table with `source` of the form
 * `safety-toolkit:{surface}` or `sandbox-toolkit:{surface}`. Unlike the general newsletter signup, the
 * toolkit is transactional: status is set to "confirmed" immediately and the
 * day-0 toolkit email is sent without a double-opt-in step (except Sandbox `gatePath: "review"`).
 *
 * Day 3 / Day 7 follow-ups are not yet wired — see the TODO in
 * `src/lib/email/send-safety-toolkit-email.ts`.
 */
export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (!toolkitRateLimitIp(ip)) {
    return NextResponse.json(
      { error: { code: "RATE_LIMITED", message: "Too many attempts. Please try again later." } },
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

  const parsed = ToolkitSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: parsed.error.issues[0]?.message ?? "Validation failed" } },
      { status: 400 },
    );
  }

  const orgId = getTenantOrgId();
  if (!orgId) {
    return NextResponse.json(
      {
        error: {
          code: "TENANT_NOT_CONFIGURED",
          message:
            "Set TENANT_ORG_ID to your Movemental organization UUID so toolkit signups can be stored.",
        },
      },
      { status: 503 },
    );
  }

  const fieldGuide = parsed.data.fieldGuide ?? "safety";
  const skipSandboxEmail = fieldGuide === "sandbox" && parsed.data.gatePath === "review";

  if (fieldGuide === "sandbox" && parsed.data.metadata) {
    console.info("[toolkit-download] sandbox lead metadata", parsed.data.metadata);
  }

  try {
    const { emailSent, state } = await recordFieldGuideLead({
      orgId,
      email: parsed.data.email,
      organization: parsed.data.organization,
      fieldGuide,
      source: parsed.data.source,
      skipEmail: skipSandboxEmail,
    });

    return NextResponse.json({ success: true, state, emailSent });
  } catch (err) {
    console.error("Toolkit download lead capture failed:", err);
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 },
    );
  }
}
