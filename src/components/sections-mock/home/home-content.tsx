/**
 * Home page composition.
 *
 * Decision-driven sequence:
 *   Hero (recognition) →
 *   Audience (segment routing) →
 *   Path (the framework, including stage outcomes inline) →
 *   Credibility (who is behind this — founders + Movement Voices) →
 *   Final CTA (action).
 */

import { TopographicHero } from "@/components/studio/hero/TopographicHero";

import { AudienceFold } from "./audience-fold";
import { CredibilityFold } from "./credibility-fold";
import { FinalCta } from "./final-cta";
import { PathFold } from "./path-fold";

export function HomeContent() {
  return (
    <>
      <TopographicHero />
      <AudienceFold />
      <PathFold />
      <CredibilityFold />
      <FinalCta />
    </>
  );
}
