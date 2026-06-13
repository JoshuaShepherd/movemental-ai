/**
 * Homepage audience applications band — canonical paths only (no shadow routes).
 */

export type AudienceExampleIdNew = "organizations" | "nonprofits" | "churches" | "institutions";

export type AudienceExampleNewPublic = {
  id: AudienceExampleIdNew;
  /** Canonical audience URL */
  canonicalPath: `/${string}`;
  label: string;
  oneLiner: string;
};

export const audienceExamplesNew: readonly AudienceExampleNewPublic[] = [
  {
    id: "organizations",
    canonicalPath: "/organizations",
    label: "Organizations",
    oneLiner:
      "One path for churches, nonprofits, and institutions, choose your context; the arc stays the same.",
  },
  {
    id: "churches",
    canonicalPath: "/churches",
    label: "Churches",
    oneLiner: "Teaching, discipleship, and ministry record your pastor and elders can trust.",
  },
  {
    id: "nonprofits",
    canonicalPath: "/nonprofits",
    label: "Nonprofits",
    oneLiner: "Donors, programs, and impact stories in one place your board can verify.",
  },
  {
    id: "institutions",
    canonicalPath: "/institutions",
    label: "Institutions",
    oneLiner: "Scholarship, curriculum, and faculty work in one archive your board can govern.",
  },
] as const;

export function getAudienceExampleNew(id: string): AudienceExampleNewPublic | undefined {
  return audienceExamplesNew.find((e) => e.id === id);
}
