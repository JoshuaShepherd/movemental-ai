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
    oneLiner: "Teaching, care, and formation intelligence surfaced for leaders and congregations.",
  },
  {
    id: "nonprofits",
    canonicalPath: "/nonprofits",
    label: "Nonprofits",
    oneLiner: "Mission operations: donors, programs, and stories threaded into one navigable layer.",
  },
  {
    id: "institutions",
    canonicalPath: "/institutions",
    label: "Institutions",
    oneLiner: "Research, curriculum, and faculty collaboration mapped across the institutional corpus.",
  },
] as const;

export function getAudienceExampleNew(id: string): AudienceExampleNewPublic | undefined {
  return audienceExamplesNew.find((e) => e.id === id);
}
