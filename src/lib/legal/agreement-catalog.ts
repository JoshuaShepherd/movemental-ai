/**
 * Canonical `signed_agreements.agreement_type` values and active document versions.
 * Bump `AGREEMENT_VERSION_LIVE` when counsel publishes a new template.
 */
export const AGREEMENT_TYPE_ENGAGEMENT_MSA = "engagement_msa";
export const AGREEMENT_TYPE_IMPLEMENTATION_MOU = "implementation_mou";

export const AGREEMENT_VERSION_LIVE = "2026-01-01";

export const AGREEMENT_TYPES = [
  AGREEMENT_TYPE_ENGAGEMENT_MSA,
  AGREEMENT_TYPE_IMPLEMENTATION_MOU,
] as const;

export type AgreementType = (typeof AGREEMENT_TYPES)[number];

export function isAgreementType(value: string): value is AgreementType {
  return (AGREEMENT_TYPES as readonly string[]).includes(value);
}
