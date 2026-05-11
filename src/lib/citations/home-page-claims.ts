import type { CitationId } from "./claims";

/**
 * Home (`/`) citation chip order — document order for `<CitationsProvider />`.
 * Keep in sync with `TopographicHero`, `PathFold`, and `CredibilityFold`.
 *
 * Integrity: `tests/unit/citations/home-page-footnotes.test.ts` asserts every
 * `eeat-site-claims.json` row with `page === "/"` and non-empty `citationIds`
 * is covered here (no orphaned home footnotes vs live chips).
 */
export const HOME_PAGE_CLAIM_ORDER = [
  "nonprofit-92-adoption",
  "nonprofit-81-adhoc",
  "high-performer-cohort-5-7",
  "mckinsey-workflow-redesign",
  "pew-ai-detection-attribution-gap",
] as const satisfies ReadonlyArray<CitationId>;

export type HomePageCitationId = (typeof HOME_PAGE_CLAIM_ORDER)[number];
