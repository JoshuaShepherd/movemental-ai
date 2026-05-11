"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { organizations, userProfiles } from "@/lib/db/schema";
import { createClient } from "@/lib/supabase/server";
import { readLeaderPaymentsEnabled } from "@/lib/onboarding/state";
import { resolveActiveOrganizationId } from "@/lib/services/onboarding/onboarding.service";
import * as onboardingHttp from "@/lib/services/onboarding/onboarding-http.service";

export type PersistTaskResult = { ok: boolean; message?: string };

type Actor = {
  userId: string;
  organizationId: string;
};

async function loadActor(organizationSlug: string | undefined): Promise<Actor | { error: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) return { error: "Sign in required." };
  const resolved = await resolveActiveOrganizationId(user.id, organizationSlug);
  if (!resolved.success) return { error: resolved.error.message };
  return { userId: user.id, organizationId: resolved.data.organizationId };
}

function bumpPaths() {
  revalidatePath("/welcome");
  revalidatePath("/dashboard");
}

export async function persistOrganizationProfileFields(input: {
  organizationSlug?: string;
  publicName: string;
  primaryDomain: string;
  primaryContactName: string;
  primaryContactEmail: string;
  secondaryContactName?: string;
  secondaryContactEmail?: string;
  mission?: string;
  city?: string;
  country?: string;
  aiReadiness?: number;
}): Promise<PersistTaskResult> {
  const actor = await loadActor(input.organizationSlug);
  if ("error" in actor) return { ok: false, message: actor.error };
  const persist = await onboardingHttp.persistOrganizationProfile({
    organizationId: actor.organizationId,
    profile: {
      publicName: input.publicName,
      primaryDomain: input.primaryDomain,
      primaryContactName: input.primaryContactName,
      primaryContactEmail: input.primaryContactEmail,
      secondaryContactName: input.secondaryContactName,
      secondaryContactEmail: input.secondaryContactEmail,
      mission: input.mission,
      city: input.city,
      country: input.country,
      aiReadiness: input.aiReadiness,
    },
  });
  if (!persist.success) return { ok: false, message: persist.error.message };
  bumpPaths();
  return { ok: true };
}

export async function persistOrganizationImages(input: {
  organizationSlug?: string;
  logoUrl?: string | null;
  leaderHeadshotUrl?: string | null;
}): Promise<PersistTaskResult> {
  const actor = await loadActor(input.organizationSlug);
  if ("error" in actor) return { ok: false, message: actor.error };
  const persist = await onboardingHttp.persistOrganizationImageUrls({
    organizationId: actor.organizationId,
    logoUrl: input.logoUrl,
    leaderHeadshotUrl: input.leaderHeadshotUrl,
  });
  if (!persist.success) return { ok: false, message: persist.error.message };
  bumpPaths();
  return { ok: true };
}

export async function persistBrandGuidelinesDraft(input: {
  organizationSlug?: string;
  voiceAdjectives: string[];
  audienceDescription: string;
  wordsToAvoid: string[];
  freeText?: string;
}): Promise<PersistTaskResult> {
  const actor = await loadActor(input.organizationSlug);
  if ("error" in actor) return { ok: false, message: actor.error };
  const persist = await onboardingHttp.persistBrandGuidelines({
    organizationId: actor.organizationId,
    guidelines: {
      voiceAdjectives: input.voiceAdjectives,
      audienceDescription: input.audienceDescription,
      wordsToAvoid: input.wordsToAvoid,
      freeText: input.freeText,
    },
  });
  if (!persist.success) return { ok: false, message: persist.error.message };
  bumpPaths();
  return { ok: true };
}

export async function persistConsentBlock(input: { organizationSlug?: string }): Promise<PersistTaskResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) return { ok: false, message: "Sign in required." };
  const actor = await loadActor(input.organizationSlug);
  if ("error" in actor) return { ok: false, message: actor.error };
  const persist = await onboardingHttp.persistConsentGrants({
    organizationId: actor.organizationId,
    userId: user.id,
    consents: [
      {
        consentType: "data_processing_ai",
        granted: true,
        consentVersion: "2026-05-11",
      },
    ],
  });
  if (!persist.success) return { ok: false, message: persist.error.message };
  bumpPaths();
  return { ok: true };
}

export async function persistTaxFormFields(input: {
  organizationSlug?: string;
  formType: "W-9" | "W-8BEN" | "not_applicable";
  documentUrl?: string | null;
  legalName?: string;
  notes?: string;
}): Promise<PersistTaskResult> {
  const actor = await loadActor(input.organizationSlug);
  if ("error" in actor) return { ok: false, message: actor.error };
  const [org] = await db
    .select({ settings: organizations.settings })
    .from(organizations)
    .where(eq(organizations.id, actor.organizationId))
    .limit(1);
  const leaderPayments = readLeaderPaymentsEnabled(org?.settings);
  if (leaderPayments && input.formType !== "not_applicable") {
    const url = input.documentUrl?.trim();
    if (!url) {
      return { ok: false, message: "Add a document URL before completing this step." };
    }
  }
  const persist = await onboardingHttp.persistTaxForm({
    organizationId: actor.organizationId,
    taxForm: {
      formType: input.formType,
      legalName: input.legalName,
      notes: input.notes,
      documentUrl: input.documentUrl,
    },
  });
  if (!persist.success) return { ok: false, message: persist.error.message };
  bumpPaths();
  return { ok: true };
}

export async function persistOrientation(input: { organizationSlug?: string }): Promise<PersistTaskResult> {
  const actor = await loadActor(input.organizationSlug);
  if ("error" in actor) return { ok: false, message: actor.error };
  const persist = await onboardingHttp.persistOrientationAcknowledgement({
    organizationId: actor.organizationId,
  });
  if (!persist.success) return { ok: false, message: persist.error.message };
  bumpPaths();
  return { ok: true };
}

export async function persistAffiliatesReview(input: {
  organizationSlug?: string;
  note?: string;
}): Promise<PersistTaskResult> {
  const actor = await loadActor(input.organizationSlug);
  if ("error" in actor) return { ok: false, message: actor.error };
  const list = await onboardingHttp.listAffiliatesForOrg(actor.organizationId);
  const payload =
    list.success && list.data.length > 0 ? list.data : [{ acknowledged: true, note: input.note ?? "" }];
  const persist = await onboardingHttp.persistAffiliatesReview({
    organizationId: actor.organizationId,
    affiliates: payload,
  });
  if (!persist.success) return { ok: false, message: persist.error.message };
  bumpPaths();
  return { ok: true };
}

export async function persistThemesReview(input: {
  organizationSlug?: string;
  note?: string;
}): Promise<PersistTaskResult> {
  const actor = await loadActor(input.organizationSlug);
  if ("error" in actor) return { ok: false, message: actor.error };
  const list = await onboardingHttp.listThemesForOrg(actor.organizationId);
  const payload =
    list.success && list.data.length > 0 ? list.data : [{ acknowledged: true, note: input.note ?? "" }];
  const persist = await onboardingHttp.persistThemesReview({
    organizationId: actor.organizationId,
    themes: payload,
  });
  if (!persist.success) return { ok: false, message: persist.error.message };
  bumpPaths();
  return { ok: true };
}

export async function persistPlatformTour(input: {
  organizationSlug?: string;
  checklist: Record<string, boolean>;
}): Promise<PersistTaskResult> {
  const actor = await loadActor(input.organizationSlug);
  if ("error" in actor) return { ok: false, message: actor.error };
  const required = ["sandboxlive", "recipes", "cohort", "future_plan", "guidebook"] as const;
  for (const k of required) {
    if (!input.checklist[k]) {
      return { ok: false, message: "Check off each area after you have visited it." };
    }
  }
  const persist = await onboardingHttp.persistPlatformTourChecklist({
    organizationId: actor.organizationId,
    checklist: input.checklist,
  });
  if (!persist.success) return { ok: false, message: persist.error.message };
  bumpPaths();
  return { ok: true };
}

export async function persistCohortPrep(input: { organizationSlug?: string }): Promise<PersistTaskResult> {
  const actor = await loadActor(input.organizationSlug);
  if ("error" in actor) return { ok: false, message: actor.error };
  const persist = await onboardingHttp.persistCohortPrepRead({
    organizationId: actor.organizationId,
  });
  if (!persist.success) return { ok: false, message: persist.error.message };
  bumpPaths();
  return { ok: true };
}
