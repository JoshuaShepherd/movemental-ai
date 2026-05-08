export type AudienceKind = "churches" | "nonprofits" | "institutions";

export const AUDIENCE_CONTACT_INTEREST: Record<AudienceKind, string> = {
  churches: "for-churches",
  nonprofits: "for-nonprofits",
  institutions: "for-institutions",
};

export function audienceContactHref(audience: AudienceKind): string {
  return `/contact?interest=${AUDIENCE_CONTACT_INTEREST[audience]}`;
}
