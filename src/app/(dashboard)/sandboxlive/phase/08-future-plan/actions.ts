"use server";

import { revalidatePath } from "next/cache";

import {
  saveFuturePlanSection,
  type FuturePlanSectionSlug,
} from "@/lib/sandboxlive/future-plan.server";
import { resolveActiveOrganizationId } from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

export type SaveSectionResult =
  | { ok: true; version: number }
  | { ok: false; reason: string };

/**
 * Server action for the Future Plan editor. Persists a single section's
 * markdown body and revalidates the editor + export routes so the new
 * content shows on next render.
 */
export async function saveSectionAction(params: {
  orgSlug: string | undefined;
  sectionSlug: FuturePlanSectionSlug;
  bodyMarkdown: string;
}): Promise<SaveSectionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    return { ok: false, reason: "Not signed in." };
  }

  const resolved = await resolveActiveOrganizationId(user.id, params.orgSlug);
  if (!resolved.success) {
    return { ok: false, reason: "No active organization." };
  }

  const result = await saveFuturePlanSection({
    organizationId: resolved.data.organizationId,
    userId: user.id,
    sectionSlug: params.sectionSlug,
    bodyMarkdown: params.bodyMarkdown,
  });

  if (result.ok) {
    revalidatePath("/sandboxlive/phase/08-future-plan");
    revalidatePath("/sandboxlive/phase/08-future-plan/export");
  }

  return result;
}
