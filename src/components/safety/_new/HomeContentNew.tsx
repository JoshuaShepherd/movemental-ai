/**
 * Home (`/`) — page composition.
 *
 * Three jobs in proportion: argument (hero), offer (SafeStart block),
 * credibility (founders + named voices + Scenius graph). The full
 * four-stage methodology exposition — Stage 1 boxed feature, satellites,
 * governance deliverables grid, sequence doctrine — lives on `/pathway`,
 * not here. The homepage's path-fold collapses to a compressed
 * `SafeStartBlock` that names the engagement a visitor would actually
 * buy and links onward to the full path.
 *
 * Sections, in order:
 *   1. `TopographicHero` — argument + two CTAs + scarcity anchor.
 *   2. `AudienceFold` — "is this for you" with differentiated playbook
 *      links and a Field Guide fallback for the unsure visitor.
 *   3. `SafeStartBlock` — compressed Stage-1 offer; links to `/pathway`
 *      for the full methodology.
 *   4. `CredibilityFold` — founders, named voices, Scenius dot portrait.
 *   5. `HomeCTABandNew` — bottom band mirroring the hero's two CTAs
 *      and scarcity line for the visitor who scrolled the whole page.
 *
 * `PathFoldNew` is no longer imported — its content moved to `/pathway`
 * (see `PathwayOverviewTemplate`). The file stays in place under
 * `_new/` as a reference for any later regression check.
 */

import { CitationsProvider } from "@/components/citations";
import { HOME_PAGE_CLAIM_ORDER } from "@/lib/citations/home-page-claims";
import { AudienceFold } from "@/components/sections-mock/home/audience-fold";
import { CredibilityFold } from "@/components/sections-mock/home/credibility-fold";
import { TopographicHero } from "@/components/studio/hero/TopographicHero";

import { HomeCTABandNew } from "./HomeCTABandNew";
import { SafeStartBlock } from "./SafeStartBlock";

export function HomeContentNew() {
  return (
    <CitationsProvider claims={HOME_PAGE_CLAIM_ORDER}>
      <TopographicHero />
      <AudienceFold />
      <SafeStartBlock />
      <CredibilityFold />
      <HomeCTABandNew />
    </CitationsProvider>
  );
}
