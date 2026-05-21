/**
 * Home (`/home-new`) — page composition.
 *
 * Sibling of `src/components/sections-mock/home/home-content.tsx`. Mirrors
 * `HomeContent` section-for-section EXCEPT:
 *
 *   – `PathFold` → `PathFoldNew` (Safety CTA href changed to
 *     `/pathway/safety-new`; all other copy/layout/stages identical).
 *   – `FinalCta` → `HomeCTABandNew` (three CTAs collapsed to two — Get the
 *     Field Guide → `/field-guides/safety-new`; Talk about SafeStart →
 *     `/contact?interest=safestart`).
 *
 * Hero, audience trio, credibility fold (and its embedded Scenius network),
 * and the citations provider are reused as-is. The chip order SSOT
 * (`HOME_PAGE_CLAIM_ORDER`) is shared with the existing home — both pages
 * surface the same statistical claims via inline `<Cite />` chips.
 *
 * Non-destructive: do not edit the original `HomeContent`. See
 * `docs/_new/safety-new-changelog.md` for the rebuild log.
 */

import { CitationsProvider } from "@/components/citations";
import { HOME_PAGE_CLAIM_ORDER } from "@/lib/citations/home-page-claims";
import { AudienceFold } from "@/components/sections-mock/home/audience-fold";
import { CredibilityFold } from "@/components/sections-mock/home/credibility-fold";
import { TopographicHero } from "@/components/studio/hero/TopographicHero";

import { HomeCTABandNew } from "./HomeCTABandNew";
import { PathFoldNew } from "./PathFoldNew";

export function HomeContentNew() {
  return (
    <CitationsProvider claims={HOME_PAGE_CLAIM_ORDER}>
      <TopographicHero />
      <AudienceFold />
      <PathFoldNew />
      <CredibilityFold />
      <HomeCTABandNew />
    </CitationsProvider>
  );
}
