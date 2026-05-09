export type ContactInterest = "churches" | "nonprofits" | "institutions";

/** Normalize ?interest= from URLs (supports legacy for-* values). */
export function normalizeContactInterest(raw: string | string[] | undefined): ContactInterest | null {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (!v) return null;
  switch (v) {
    case "churches":
    case "nonprofits":
    case "institutions":
      return v;
    case "for-churches":
      return "churches";
    case "for-nonprofits":
      return "nonprofits";
    case "for-institutions":
    case "institutional":
      return "institutions";
    default:
      return null;
  }
}

export function contactInterestToOrgType(interest: ContactInterest): "church" | "nonprofit" | "institution" {
  if (interest === "churches") return "church";
  if (interest === "nonprofits") return "nonprofit";
  return "institution";
}
