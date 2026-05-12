import {
  AGREEMENT_TYPE_ENGAGEMENT_MSA,
  AGREEMENT_TYPE_IMPLEMENTATION_MOU,
  AGREEMENT_VERSION_LIVE,
  isAgreementType,
} from "@/lib/legal/agreement-catalog";

export type ParsedDocuSignConnectEvent = {
  envelopeId: string;
  status: string;
  organizationSlug: string;
  agreementType: string;
  agreementVersion: string;
  /** Completed PDF URI when present on envelope summary */
  documentUrl: string | null;
};

function readTextCustomFields(
  envelopeSummary: Record<string, unknown>,
): Record<string, string> {
  const out: Record<string, string> = {};
  const root = envelopeSummary.customFields;
  if (!root || typeof root !== "object") return out;
  const text = (root as { textCustomFields?: unknown }).textCustomFields;
  if (!Array.isArray(text)) return out;
  for (const row of text) {
    if (!row || typeof row !== "object") continue;
    const name = (row as { name?: unknown }).name;
    const value = (row as { value?: unknown }).value;
    if (typeof name === "string" && typeof value === "string" && name.trim()) {
      out[name.trim()] = value;
    }
  }
  return out;
}

/**
 * Best-effort parse for DocuSign Connect JSON (`event` + `data` envelope summary).
 * Configure DocuSign custom text fields: `organization_slug`, `agreement_type`, `agreement_version` (optional).
 */
export function parseDocuSignConnectJson(body: unknown): ParsedDocuSignConnectEvent | null {
  if (!body || typeof body !== "object") return null;
  const root = body as Record<string, unknown>;
  const data = root.data;
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;

  const summary =
    (d.envelopeSummary && typeof d.envelopeSummary === "object"
      ? d.envelopeSummary
      : d) as Record<string, unknown>;

  const envelopeId =
    (typeof d.envelopeId === "string" && d.envelopeId) ||
    (typeof summary.envelopeId === "string" && summary.envelopeId) ||
    "";
  const status = typeof summary.status === "string" ? summary.status : "";

  const fields = readTextCustomFields(summary);
  const organizationSlug =
    fields.organization_slug ||
    fields.organizationSlug ||
    fields.org_slug ||
    fields.OrganizationSlug ||
    "";
  let agreementType =
    fields.agreement_type || fields.agreementType || fields.AgreementType || AGREEMENT_TYPE_ENGAGEMENT_MSA;
  const agreementVersion =
    fields.agreement_version || fields.agreementVersion || AGREEMENT_VERSION_LIVE;

  if (!isAgreementType(agreementType)) {
    if (agreementType === "msa" || agreementType === "engagement") {
      agreementType = AGREEMENT_TYPE_ENGAGEMENT_MSA;
    } else if (agreementType === "mou") {
      agreementType = AGREEMENT_TYPE_IMPLEMENTATION_MOU;
    } else {
      agreementType = AGREEMENT_TYPE_ENGAGEMENT_MSA;
    }
  }

  const uri =
    typeof summary.uri === "string"
      ? summary.uri
      : typeof (summary as { pdfUri?: unknown }).pdfUri === "string"
        ? ((summary as { pdfUri: string }).pdfUri as string)
        : null;

  if (!envelopeId || !organizationSlug.trim()) return null;

  return {
    envelopeId,
    status,
    organizationSlug: organizationSlug.trim(),
    agreementType,
    agreementVersion,
    documentUrl: uri,
  };
}
