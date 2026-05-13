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
 * Citations: where existing copy makes a statistical claim, inline
 * `<Cite />` marks are wired through `<CitationsProvider />`. Tooltip copy and
 * bibliography-style sources live in `src/lib/citations/eeat-site-claims.json`
 * and render on `/footnotes`. See `docs/build/prompts/site-footnotes-eeat-registry.md`.
 *
 * Chip order SSOT: `HOME_PAGE_CLAIM_ORDER` in `src/lib/citations/home-page-claims.ts`
 * (validated by `tests/unit/citations/home-page-footnotes.test.ts`).
 */

import { CitationsProvider } from "@/components/citations";
import { HOME_PAGE_CLAIM_ORDER } from "@/lib/citations/home-page-claims";
import { TopographicHero } from "@/components/studio/hero/TopographicHero";

import { AudienceFold } from "./audience-fold";
import { CredibilityFold } from "./credibility-fold";
import { FinalCta } from "./final-cta";
import { PathFold } from "./path-fold";

export function HomeContent() {
  return (
    <CitationsProvider claims={HOME_PAGE_CLAIM_ORDER}>
      <TopographicHero />
      <AudienceFold />
      <PathFold />
      <CredibilityFold />
      <FinalCta />
    </CitationsProvider>
  );
}
