import "server-only";

import { randomUUID } from "crypto";

import { and, eq, inArray } from "drizzle-orm";
import Stripe from "stripe";

import { db } from "@/lib/db";
import {
  consentRecords,
  corpusReviewItems,
  organizationAssets,
  organizations,
} from "@/lib/db/schema";
import { env } from "@/lib/env";
import type { Result } from "@/lib/services/simplified/base.service";

function ok<T>(data: T): Result<T> {
  return { success: true, data };
}

function err(code: string, message: string): Result<never> {
  return { success: false, error: { code, message } };
}

function nowIso(): string {
  return new Date().toISOString();
}

function readOnboardingState(org: { onboarding_state: unknown }): Record<string, unknown> {
  const raw = org.onboarding_state;
  if (!raw || typeof raw !== "object") return {};
  return { ...(raw as Record<string, unknown>) };
}

async function mergeOrgOnboardingState(
  organizationId: string,
  patch: Record<string, unknown>,
): Promise<void> {
  const [org] = await db
    .select({ onboarding_state: organizations.onboarding_state })
    .from(organizations)
    .where(eq(organizations.id, organizationId))
    .limit(1);
  if (!org) return;
  const cur = readOnboardingState(org);
  await db
    .update(organizations)
    .set({
      onboarding_state: { ...cur, ...patch } as unknown as Record<string, unknown>,
      updated_at: nowIso(),
    })
    .where(eq(organizations.id, organizationId));
}

async function mergeOrganizationSettings(
  organizationId: string,
  patch: Record<string, unknown>,
): Promise<void> {
  const [org] = await db
    .select({ settings: organizations.settings })
    .from(organizations)
    .where(eq(organizations.id, organizationId))
    .limit(1);
  if (!org) return;
  const cur =
    org.settings && typeof org.settings === "object" && !Array.isArray(org.settings)
      ? { ...(org.settings as Record<string, unknown>) }
      : {};
  await db
    .update(organizations)
    .set({
      settings: { ...cur, ...patch } as unknown as typeof organizations.$inferInsert.settings,
      updated_at: nowIso(),
    })
    .where(eq(organizations.id, organizationId));
}

export async function createOnboardingPaymentIntent(params: {
  organizationId: string;
}): Promise<Result<{ clientSecret: string; paymentIntentId: string; amount?: number; currency?: string }>> {
  const secret = env.STRIPE_SECRET_KEY;
  if (!secret) {
    return err("stripe_unconfigured", "Payment is not configured on this server.");
  }

  const amountCents = env.ONBOARDING_PAYMENT_AMOUNT_CENTS ?? 100;
  if (!Number.isFinite(amountCents) || amountCents < 50) {
    return err(
      "payment_amount_invalid",
      "Set ONBOARDING_PAYMENT_AMOUNT_CENTS (server env) to a valid Stripe amount in cents (minimum 50).",
    );
  }

  try {
    const stripe = new Stripe(secret);
    const pi = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: { organization_id: params.organizationId },
    });
    if (!pi.client_secret) {
      return err("stripe_error", "Stripe did not return a client secret.");
    }
    return ok({
      clientSecret: pi.client_secret,
      paymentIntentId: pi.id,
      amount: amountCents,
      currency: "usd",
    });
  } catch (e) {
    return err("stripe_error", e instanceof Error ? e.message : "Stripe error");
  }
}

export interface OrganizationProfilePayload {
  publicName: string;
  primaryDomain: string;
  primaryContactName: string;
  primaryContactEmail: string;
  secondaryContactName?: string;
  secondaryContactEmail?: string;
  /** Legal / public mission statement — maps to `organizations.description`. */
  mission?: string;
  city?: string;
  country?: string;
  /** 1–5 self-rating stored on `organizations.settings.ai_readiness`. */
  aiReadiness?: number;
}

export async function persistOrganizationProfile(params: {
  organizationId: string;
  profile: OrganizationProfilePayload;
}): Promise<Result<{ ok: true }>> {
  const p = params.profile;
  const domain = p.primaryDomain.trim().replace(/^https?:\/\//i, "");
  try {
    const ai =
      typeof p.aiReadiness === "number" && p.aiReadiness >= 1 && p.aiReadiness <= 5
        ? Math.round(p.aiReadiness)
        : undefined;

    const orgPatch: {
      name: string;
      website: string | null;
      contact_email: string;
      updated_at: string;
      description?: string | null;
      city?: string | null;
      country?: string | null;
    } = {
      name: p.publicName.trim(),
      website: domain ? `https://${domain}` : null,
      contact_email: p.primaryContactEmail.trim(),
      updated_at: nowIso(),
    };
    if (p.mission !== undefined) {
      orgPatch.description = p.mission.trim() ? p.mission.trim() : null;
    }
    if (p.city !== undefined) {
      orgPatch.city = p.city.trim() ? p.city.trim() : null;
    }
    if (p.country !== undefined) {
      orgPatch.country = p.country.trim() ? p.country.trim() : null;
    }

    await db.update(organizations).set(orgPatch).where(eq(organizations.id, params.organizationId));

    if (ai !== undefined) {
      await mergeOrganizationSettings(params.organizationId, { ai_readiness: ai });
    }

    await mergeOrgOnboardingState(params.organizationId, {
      organization_profile: {
        primaryContactName: p.primaryContactName.trim(),
        secondaryContactName: p.secondaryContactName?.trim(),
        secondaryContactEmail: p.secondaryContactEmail?.trim(),
      },
    });
    return ok({ ok: true });
  } catch (e) {
    return err("save_failed", e instanceof Error ? e.message : "Unknown error");
  }
}

export async function persistUploadedAssetRecord(params: {
  organizationId: string;
  userId: string;
  asset: {
    storagePath: string;
    assetType: string;
    contentType?: string;
    sizeBytes?: number;
  };
}): Promise<Result<{ assetId: string }>> {
  try {
    const [row] = await db
      .insert(organizationAssets)
      .values({
        organization_id: params.organizationId,
        asset_type: params.asset.assetType,
        storage_path: params.asset.storagePath,
        uploaded_by_user_id: params.userId,
        metadata: {
          contentType: params.asset.contentType,
          sizeBytes: params.asset.sizeBytes,
        },
      })
      .returning({ id: organizationAssets.id });

    return ok({ assetId: row?.id ?? "" });
  } catch (e) {
    return err("save_failed", e instanceof Error ? e.message : "Unknown error");
  }
}

export interface BrandGuidelinesPayload {
  voiceAdjectives: string[];
  audienceDescription: string;
  wordsToAvoid: string[];
  freeText?: string;
}

export async function persistBrandGuidelines(params: {
  organizationId: string;
  guidelines: BrandGuidelinesPayload;
}): Promise<Result<{ ok: true }>> {
  try {
    const md = params.guidelines.freeText?.trim();
    if (md) {
      await mergeOrganizationSettings(params.organizationId, { brand_guidelines: md });
    }
    await mergeOrgOnboardingState(params.organizationId, {
      brand_guidelines: params.guidelines,
    });
    return ok({ ok: true });
  } catch (e) {
    return err("save_failed", e instanceof Error ? e.message : "Unknown error");
  }
}

export type ConsentTypePayload =
  | "privacy_policy"
  | "likeness_marks"
  | "ai_usage"
  | "authorized_to_bind"
  | "comms_recording"
  /** AI-assisted work falls under the org’s existing data policies (Phase 07). */
  | "data_processing_ai";

export async function persistConsentGrants(params: {
  organizationId: string;
  userId: string;
  consents: Array<{ consentType: ConsentTypePayload; granted: boolean; consentVersion: string }>;
}): Promise<Result<{ ok: true }>> {
  try {
    await db.transaction(async (tx) => {
      const types = params.consents.map((c) => c.consentType);
      if (types.length > 0) {
        await tx
          .delete(consentRecords)
          .where(
            and(
              eq(consentRecords.organization_id, params.organizationId),
              eq(consentRecords.user_id, params.userId),
              inArray(consentRecords.consent_type, types),
            ),
          );
      }
      for (const c of params.consents) {
        await tx.insert(consentRecords).values({
          organization_id: params.organizationId,
          user_id: params.userId,
          consent_type: c.consentType,
          granted: c.granted,
          consent_version: c.consentVersion,
          metadata: {},
        });
      }
    });
    return ok({ ok: true });
  } catch (e) {
    return err("save_failed", e instanceof Error ? e.message : "Unknown error");
  }
}

export interface TaxFormPayload {
  formType: "W-9" | "W-8BEN" | "not_applicable";
  legalName?: string;
  taxIdentifier?: string;
  countryOfResidence?: string;
  notes?: string;
  /** Signed PDF or scan URL stored on `organizations.settings.tax_form_document_url`. */
  documentUrl?: string | null;
}

export async function persistTaxForm(params: {
  organizationId: string;
  taxForm: TaxFormPayload;
}): Promise<Result<{ ok: true }>> {
  try {
    if (params.taxForm.documentUrl !== undefined) {
      await mergeOrganizationSettings(params.organizationId, {
        tax_form_document_url: params.taxForm.documentUrl?.trim() || null,
      });
    }
    await mergeOrgOnboardingState(params.organizationId, {
      tax_form: params.taxForm,
    });
    return ok({ ok: true });
  } catch (e) {
    return err("save_failed", e instanceof Error ? e.message : "Unknown error");
  }
}

export async function persistOrganizationImageUrls(params: {
  organizationId: string;
  logoUrl?: string | null;
  leaderHeadshotUrl?: string | null;
}): Promise<Result<{ ok: true }>> {
  try {
    if (params.leaderHeadshotUrl !== undefined) {
      await mergeOrganizationSettings(params.organizationId, {
        leader_headshot_url: params.leaderHeadshotUrl?.trim() || null,
      });
    }
    if (params.logoUrl !== undefined) {
      await db
        .update(organizations)
        .set({
          logo_url: params.logoUrl?.trim() || null,
          updated_at: nowIso(),
        })
        .where(eq(organizations.id, params.organizationId));
    }
    return ok({ ok: true });
  } catch (e) {
    return err("save_failed", e instanceof Error ? e.message : "Unknown error");
  }
}

export async function persistOrientationAcknowledgement(params: {
  organizationId: string;
}): Promise<Result<{ ok: true }>> {
  try {
    await mergeOrgOnboardingState(params.organizationId, {
      orientation_acknowledged_at: nowIso(),
    });
    return ok({ ok: true });
  } catch (e) {
    return err("save_failed", e instanceof Error ? e.message : "Unknown error");
  }
}

export async function persistPlatformTourChecklist(params: {
  organizationId: string;
  checklist: Record<string, boolean>;
}): Promise<Result<{ ok: true }>> {
  try {
    await mergeOrgOnboardingState(params.organizationId, {
      platform_tour_checklist: params.checklist,
    });
    return ok({ ok: true });
  } catch (e) {
    return err("save_failed", e instanceof Error ? e.message : "Unknown error");
  }
}

export async function persistCohortPrepRead(params: {
  organizationId: string;
}): Promise<Result<{ ok: true }>> {
  try {
    await mergeOrgOnboardingState(params.organizationId, {
      cohort_prep_read_at: nowIso(),
    });
    return ok({ ok: true });
  } catch (e) {
    return err("save_failed", e instanceof Error ? e.message : "Unknown error");
  }
}

function mapCorpusDbStatusToApi(status: string): "pending" | "approved" | "rejected" | "added_by_leader" {
  if (status === "approved" || status === "leader_approved") return "approved";
  if (status === "rejected" || status === "leader_rejected") return "rejected";
  if (status === "added_by_leader") return "added_by_leader";
  return "pending";
}

function mapCorpusCompiledRow(row: typeof corpusReviewItems.$inferSelect) {
  const data = row.movemental_compiled_data as Record<string, unknown>;
  const title = (data.title as string | undefined) ?? row.item_type;
  const summary = (data.summary as string | undefined) ?? (data.text as string | undefined);
  return {
    id: row.id,
    itemType: row.item_type,
    title,
    summary,
    movementalCompiledData: data,
    status: mapCorpusDbStatusToApi(row.status),
    leaderFeedback: row.leader_feedback as Record<string, unknown> | null | undefined,
  };
}

export async function listCorpusItemsForOrg(organizationId: string): Promise<Result<ReturnType<typeof mapCorpusCompiledRow>[]>> {
  try {
    const rows = await db
      .select()
      .from(corpusReviewItems)
      .where(eq(corpusReviewItems.organization_id, organizationId));
    return ok(rows.map(mapCorpusCompiledRow));
  } catch (e) {
    return err("load_failed", e instanceof Error ? e.message : "Unknown error");
  }
}

export async function submitCorpusFeedback(params: {
  organizationId: string;
  userId: string;
  decisions: Array<{
    itemId: string;
    decision: "approve" | "reject" | "edit";
    note?: string;
    edits?: Record<string, unknown>;
  }>;
  additions?: Array<{ itemType: string; data: Record<string, unknown> }>;
}): Promise<Result<{ ok: true }>> {
  try {
    await db.transaction(async (tx) => {
      for (const d of params.decisions) {
        const status =
          d.decision === "approve"
            ? "approved"
            : d.decision === "reject"
              ? "rejected"
              : "pending_review";
        await tx
          .update(corpusReviewItems)
          .set({
            status,
            leader_feedback: {
              decision: d.decision,
              note: d.note,
              edits: d.edits,
            },
            reviewed_at: nowIso(),
            reviewed_by_user_id: params.userId,
          })
          .where(
            and(eq(corpusReviewItems.id, d.itemId), eq(corpusReviewItems.organization_id, params.organizationId)),
          );
      }
      for (const add of params.additions ?? []) {
        await tx.insert(corpusReviewItems).values({
          organization_id: params.organizationId,
          item_type: add.itemType,
          movemental_compiled_data: add.data,
          status: "added_by_leader",
          leader_feedback: { source: "leader_addition" },
          reviewed_at: nowIso(),
          reviewed_by_user_id: params.userId,
        });
      }
    });
    return ok({ ok: true });
  } catch (e) {
    return err("save_failed", e instanceof Error ? e.message : "Unknown error");
  }
}

async function readAffiliatesJson(organizationId: string): Promise<unknown[]> {
  const [org] = await db
    .select({ onboarding_state: organizations.onboarding_state })
    .from(organizations)
    .where(eq(organizations.id, organizationId))
    .limit(1);
  const cur = readOnboardingState(org ?? { onboarding_state: {} });
  const raw = cur.affiliates_review_items;
  return Array.isArray(raw) ? raw : [];
}

export async function listAffiliatesForOrg(organizationId: string): Promise<Result<unknown[]>> {
  try {
    const items = await readAffiliatesJson(organizationId);
    return ok(items);
  } catch (e) {
    return err("load_failed", e instanceof Error ? e.message : "Unknown error");
  }
}

export async function persistAffiliatesReview(params: {
  organizationId: string;
  affiliates: unknown[];
}): Promise<Result<{ ok: true }>> {
  try {
    await mergeOrgOnboardingState(params.organizationId, {
      affiliates_review_items: params.affiliates,
    });
    return ok({ ok: true });
  } catch (e) {
    return err("save_failed", e instanceof Error ? e.message : "Unknown error");
  }
}

export async function listThemesForOrg(organizationId: string): Promise<Result<unknown[]>> {
  try {
    const [org] = await db
      .select({ onboarding_state: organizations.onboarding_state })
      .from(organizations)
      .where(eq(organizations.id, organizationId))
      .limit(1);
    const cur = readOnboardingState(org ?? { onboarding_state: {} });
    const raw = cur.themes_review_items;
    return ok(Array.isArray(raw) ? raw : []);
  } catch (e) {
    return err("load_failed", e instanceof Error ? e.message : "Unknown error");
  }
}

export async function persistThemesReview(params: {
  organizationId: string;
  themes: unknown[];
}): Promise<Result<{ ok: true }>> {
  try {
    await mergeOrgOnboardingState(params.organizationId, {
      themes_review_items: params.themes,
    });
    return ok({ ok: true });
  } catch (e) {
    return err("save_failed", e instanceof Error ? e.message : "Unknown error");
  }
}

export async function agentTestChat(params: {
  organizationId: string;
  conversationId?: string;
  messages: Array<{ role: string; content: string }>;
}): Promise<
  Result<{ message: { role: "assistant"; content: string; createdAt?: string }; conversationId: string }>
> {
  const convId = params.conversationId?.trim() || randomUUID();
  const lastUser = [...params.messages].reverse().find((m) => m.role === "user");
  const snippet = lastUser?.content?.trim().slice(0, 200) ?? "";

  const body =
    snippet.length > 0
      ? `Thanks for trying the agent preview. You asked about “${snippet.slice(0, 80)}${snippet.length > 80 ? "…" : ""}”. Full chat routing will connect here once your tenant agent is wired to the inference pipeline.`
      : "Thanks for trying the agent preview. Ask a question to see how responses will appear once your agent is connected.";

  return ok({
    conversationId: convId,
    message: {
      role: "assistant",
      content: body,
      createdAt: nowIso(),
    },
  });
}

export async function persistAgentFeedback(params: {
  organizationId: string;
  feedback: Record<string, unknown>;
}): Promise<Result<{ ok: true }>> {
  try {
    await mergeOrgOnboardingState(params.organizationId, {
      agent_test_feedback: params.feedback,
    });
    return ok({ ok: true });
  } catch (e) {
    return err("save_failed", e instanceof Error ? e.message : "Unknown error");
  }
}
