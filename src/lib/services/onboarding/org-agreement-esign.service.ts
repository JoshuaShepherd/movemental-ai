import "server-only";

import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { signedAgreements } from "@/lib/db/schema";
import {
  AGREEMENT_TYPE_IMPLEMENTATION_MOU,
  AGREEMENT_VERSION_LIVE,
  type AgreementType,
} from "@/lib/legal/agreement-catalog";
import { validateSignatoryLegalName } from "@/lib/onboarding/org-agreement-esign.validation";
import type { Result } from "@/lib/services/simplified/base.service";

function ok<T>(data: T): Result<T> {
  return { success: true, data };
}

function err(code: string, message: string): Result<never> {
  return { success: false, error: { code, message } };
}

/** Onboarding e-sign is limited to the live implementation MOU row (per org + version). */
export const ESIGN_ONBOARDING_AGREEMENT_TYPE: AgreementType = AGREEMENT_TYPE_IMPLEMENTATION_MOU;
export const ESIGN_ONBOARDING_AGREEMENT_VERSION = AGREEMENT_VERSION_LIVE;

export async function getOrgImplementationMouSignStatus(organizationId: string): Promise<{
  signed: boolean;
  signedAt: string | null;
}> {
  const [row] = await db
    .select({ signed_at: signedAgreements.signed_at })
    .from(signedAgreements)
    .where(
      and(
        eq(signedAgreements.organization_id, organizationId),
        eq(signedAgreements.agreement_type, ESIGN_ONBOARDING_AGREEMENT_TYPE),
        eq(signedAgreements.agreement_version, ESIGN_ONBOARDING_AGREEMENT_VERSION),
      ),
    )
    .limit(1);

  return {
    signed: Boolean(row),
    signedAt: row?.signed_at ?? null,
  };
}

export async function recordOrgImplementationMouEsign(params: {
  organizationId: string;
  signedByUserId: string;
  documentUrl: string | null;
  signatoryLegalName: string;
  audit: { userAgent: string | null; ip: string | null };
}): Promise<Result<{ id: string; alreadyExisted: boolean }>> {
  const nameResult = validateSignatoryLegalName(params.signatoryLegalName);
  if (!nameResult.success) return nameResult;

  const existing = await getOrgImplementationMouSignStatus(params.organizationId);
  if (existing.signed) {
    const [row] = await db
      .select({ id: signedAgreements.id })
      .from(signedAgreements)
      .where(
        and(
          eq(signedAgreements.organization_id, params.organizationId),
          eq(signedAgreements.agreement_type, ESIGN_ONBOARDING_AGREEMENT_TYPE),
          eq(signedAgreements.agreement_version, ESIGN_ONBOARDING_AGREEMENT_VERSION),
        ),
      )
      .limit(1);
    return ok({ id: row?.id ?? "", alreadyExisted: true });
  }

  const metadata = {
    signatory_legal_name: nameResult.data,
    electronic_signature_method: "typed_name" as const,
    consent_electronic_signature: true,
    consent_intent_to_be_bound: true,
    user_agent: params.audit.userAgent,
    forwarded_for: params.audit.ip,
  };

  const [inserted] = await db
    .insert(signedAgreements)
    .values({
      organization_id: params.organizationId,
      agreement_type: ESIGN_ONBOARDING_AGREEMENT_TYPE,
      agreement_version: ESIGN_ONBOARDING_AGREEMENT_VERSION,
      signed_by_user_id: params.signedByUserId,
      document_url: params.documentUrl,
      metadata,
    })
    .returning({ id: signedAgreements.id });

  if (!inserted?.id) {
    return err("insert_failed", "Could not record your signature. Try again or contact support.");
  }

  return ok({ id: inserted.id, alreadyExisted: false });
}
