"use server";

import { ReadinessAnonymousSubmitSchema } from "@/lib/sandboxlive/readiness-intake-schema";
import {
  insertReadinessAnonymousSubmission,
  resolveReadinessInviteBySecretToken,
} from "@/lib/sandboxlive/readiness-invite.server";

export type SubmitReadinessInviteResult =
  | { ok: true; submittedAt: string }
  | { ok: false; reason: string };

export async function submitReadinessInviteIntakeAction(input: {
  rawToken: string;
  payload: unknown;
}): Promise<SubmitReadinessInviteResult> {
  const resolved = await resolveReadinessInviteBySecretToken(input.rawToken);
  if (!resolved.ok) {
    const map: Record<typeof resolved.reason, string> = {
      not_found: "This link is not valid.",
      expired: "This link has expired. Ask your facilitator for a new one.",
      revoked: "This link is no longer active.",
    };
    return { ok: false, reason: map[resolved.reason] };
  }

  const parsed = ReadinessAnonymousSubmitSchema.safeParse(input.payload);
  if (!parsed.success) {
    return {
      ok: false,
      reason: "Check your name and answers — something could not be saved.",
    };
  }

  const ins = await insertReadinessAnonymousSubmission({
    inviteId: resolved.inviteId,
    organizationId: resolved.organizationId,
    displayName: parsed.data.displayName,
    email: parsed.data.email,
    roleOrTeam: parsed.data.roleOrTeam,
    answers: parsed.data.answers,
    intakeVersion: parsed.data.intakeVersion,
  });

  if (!ins.ok) {
    if (ins.reason === "invalid_answers") {
      return {
        ok: false,
        reason: "Some answers were missing or invalid. Please review the form.",
      };
    }
    return { ok: false, reason: "Could not save your responses. Please try again." };
  }

  return { ok: true, submittedAt: ins.submittedAt };
}
