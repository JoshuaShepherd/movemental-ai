/**
 * Canonical `signed_agreements.agreement_type` values and active document versions.
 * Bump `AGREEMENT_VERSION_LIVE` when counsel publishes a new template.
 */
export const AGREEMENT_TYPE_ENGAGEMENT_MSA = "engagement_msa";
export const AGREEMENT_TYPE_IMPLEMENTATION_MOU = "implementation_mou";

/** Workspace org slug for Youthfront nonprofit dashboard / SandboxLive engagement. */
export const YOUTHFRONT_ORG_SLUG = "youthfront" as const;

/**
 * Canonical implementation MOU PDF for Youthfront (served from `public/downloads/`).
 * Replace the file in-repo when counsel publishes a new version; bump {@link AGREEMENT_VERSION_LIVE} if types change.
 */
export const YOUTHFRONT_IMPLEMENTATION_MOU_PDF_HREF = "/downloads/youthfront-implementation-mou.pdf";

export const AGREEMENT_VERSION_LIVE = "2026-01-01";

export const AGREEMENT_TYPES = [
  AGREEMENT_TYPE_ENGAGEMENT_MSA,
  AGREEMENT_TYPE_IMPLEMENTATION_MOU,
] as const;

export type AgreementType = (typeof AGREEMENT_TYPES)[number];

export function isAgreementType(value: string): value is AgreementType {
  return (AGREEMENT_TYPES as readonly string[]).includes(value);
}
