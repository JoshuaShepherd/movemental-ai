"use server";

import { revalidatePath } from "next/cache";

import { ReadinessSubmitInputSchema } from "@/lib/sandboxlive/readiness-intake-schema";
import { upsertReadinessSubmission } from "@/lib/sandboxlive/readiness-intake.server";
import { resolveActiveOrganizationId } from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

export type SubmitReadinessResult =
  | { ok: true; submittedAt: string }
  | { ok: false; reason: string };

/**
 * Persist a SandboxLive staff readiness intake for the signed-in user, scoped
 * to the active organization. One row per (org, user) — upsert semantics.
 *
 * Note: Drizzle uses `DATABASE_URL` (service-role-ish), which bypasses RLS.
 * The session check + `resolveActiveOrganizationId` membership lookup IS the
 * auth gate. RLS on the table is defense-in-depth for future direct reads.
 */
export async function submitReadinessIntakeAction(input: {
  orgSlug: string | undefined;
  payload: unknown;
}): Promise<SubmitReadinessResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    return { ok: false, reason: "Not signed in." };
  }

  const resolved = await resolveActiveOrganizationId(user.id, input.orgSlug);
  if (!resolved.success) {
    return { ok: false, reason: "No active organization." };
  }

  const parsed = ReadinessSubmitInputSchema.safeParse(input.payload);
  if (!parsed.success) {
    return {
      ok: false,
      reason: "Some answers were missing or invalid. Please review the highlighted questions.",
    };
  }

  const result = await upsertReadinessSubmission({
    organizationId: resolved.data.organizationId,
    userId: user.id,
    answers: parsed.data.answers,
  });

  if (!result.ok) {
    return { ok: false, reason: result.reason };
  }

  revalidatePath("/sandboxlive/readiness");
  revalidatePath("/sandboxlive");

  return { ok: true, submittedAt: result.row.submittedAt };
}
