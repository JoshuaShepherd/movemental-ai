/**
 * Home page composition.
 *
 * Decision-driven sequence:
 *   Hero (recognition) →
 *   Audience (segment routing) →
 *   Path (the framework, including stage outcomes inline) →
 *   Credibility (who is behind this — founders + Movement Voices) →
 *   Final CTA (action).
 *
 * Citations: where existing copy makes a statistical claim, an inline
 * `<Cite />` chip is wired through `<CitationsProvider />`. Tooltip copy and
 * bibliography-style sources live in `src/lib/citations/eeat-site-claims.json`
 * and render on `/footnotes`. See `docs/build/prompts/site-footnotes-eeat-registry.md`.
 */

import { CitationsProvider } from "@/components/citations";
import type { CitationId } from "@/lib/citations/claims";
import { TopographicHero } from "@/components/studio/hero/TopographicHero";

import { AudienceFold } from "./audience-fold";
import { CredibilityFold } from "./credibility-fold";
import { FinalCta } from "./final-cta";
import { PathFold } from "./path-fold";

/**
 * Page-scoped citation order. Listed in document order so chip numbers line up.
 * Each entry corresponds to a single statistical
 * claim made by the existing copy on this page; framework / values / slogan
 * lines are intentionally not chipped.
 *
 *   1. TopographicHero — "human foundation precedes any technological
 *      implementation" → McKinsey workflow-redesign correlate.
 *   2. PathFold — "Most organizations jump straight to tech, or freeze in
 *      place" → 5–7% high-performer cohort (cross-sector convergent finding).
 */
const HOME_CLAIMS = [
  "mckinsey-workflow-redesign",
  "high-performer-cohort-5-7",
] as const satisfies ReadonlyArray<CitationId>;

export function HomeContent() {
  return (
    <CitationsProvider claims={HOME_CLAIMS}>
      <TopographicHero />
      <AudienceFold />
      <PathFold />
      <CredibilityFold />
      <FinalCta />
    </CitationsProvider>
  );
}
