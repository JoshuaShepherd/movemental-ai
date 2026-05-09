export type AudienceKind = "churches" | "nonprofits" | "institutions";

/** Query values for `/contact?interest=` — segment names only (no `for-*` prefix). */
export const AUDIENCE_CONTACT_INTEREST: Record<AudienceKind, string> = {
  churches: "churches",
  nonprofits: "nonprofits",
  institutions: "institutions",
};

export function audienceContactHref(audience: AudienceKind): string {
  return `/contact?interest=${AUDIENCE_CONTACT_INTEREST[audience]}`;
}
