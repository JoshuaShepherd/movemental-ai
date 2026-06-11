import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { persistSsssResult, recomputeOrgSynthesis } from "@/lib/ai-reality/persist";
import { resolveAiRealityInviteByToken } from "@/lib/ai-reality/invite.server";
import { createSlidingWindowRateLimiter } from "@/lib/rate-limit-in-memory";
import {
  computeSsssIntegrityResult,
  SSSS_INTEGRITY_ITEM_COUNT,
} from "@/lib/ssss-integrity-assessment";

/**
 * Anonymous teammate submission of the deeper instrument via a hashed team
 * invite token. No login: the token resolves to an org + invite_id, the scored
 * result lands against both, and the org synthesis is recomputed so the leader's
 * dashboard updates as responses arrive.
 */
const SubmitSchema = z.object({
  token: z.string().min(16).max(256),
  scores: z.array(z.number().int().min(1).max(5)).length(SSSS_INTEGRITY_ITEM_COUNT),
  displayName: z.string().max(160).optional(),
  email: z.string().email().max(320).optional().or(z.literal("")),
  audience: z.string().max(64).optional(),
});

const submitRateLimit = createSlidingWindowRateLimiter(20, 60 * 60 * 1000);

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (!submitRateLimit(ip)) {
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

  const parsed = SubmitSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: parsed.error.issues[0]?.message ?? "Validation failed" } },
      { status: 400 },
    );
  }

  const invite = await resolveAiRealityInviteByToken(parsed.data.token);
  if (!invite.ok) {
    const status = invite.reason === "not_found" ? 404 : 410;
    return NextResponse.json(
      { error: { code: invite.reason.toUpperCase(), message: "This invite link is no longer valid." } },
      { status },
    );
  }

  let result;
  try {
    result = computeSsssIntegrityResult(parsed.data.scores);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Computation failed";
    return NextResponse.json({ error: { code: "COMPUTE_ERROR", message } }, { status: 400 });
  }

  try {
    await persistSsssResult({
      organizationId: invite.organizationId,
      inviteId: invite.inviteId,
      email: parsed.data.email?.trim() || null,
      displayName: parsed.data.displayName?.trim() || null,
      audience: parsed.data.audience ?? null,
      anon: true,
      result,
    });
    await recomputeOrgSynthesis(invite.organizationId);
  } catch (persistErr) {
    console.error("ai-reality submit persist failed:", persistErr);
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: "Could not save your response. Please try again." } },
      { status: 500 },
    );
  }

  // Return only the responder's own result — org synthesis stays leader-only.
  return NextResponse.json({ success: true, data: { result } }, { status: 201 });
}
