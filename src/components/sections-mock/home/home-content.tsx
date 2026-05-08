/**
 * Home page composition (Ledger edition).
 *
 * Translated from `docs/html/home-citations-ledger.html`. Every empirical
 * claim renders next to a citation chip, and the page closes with a
 * numbered references rail. The catalog of source claims rendered here
 * lives in `src/lib/citations/{sources,claims}.ts` and is anchored to the
 * Movemental Research Corpus v1.0.
 *
 * Sequence:
 *   Hero (recognition + 92% / 81% chips) →
 *   Stat strip (7% / 47% / $893M / 1-in-3) →
 *   Gap argument (long-form prose with three chips) →
 *   Path (four-stage hairline grid + workflow-redesign chip) →
 *   Closing (midnight CTA) →
 *   References rail.
 *
 * The previous TopographicHero / AudienceFold / PathFold / CredibilityFold /
 * FinalCta composition is preserved in git history; the section files remain
 * in this folder for incremental reuse.
 */

import { HomeLedger } from "./home-ledger";

export function HomeContent() {
  return <HomeLedger />;
}
