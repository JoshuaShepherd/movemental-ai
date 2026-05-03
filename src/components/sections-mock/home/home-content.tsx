/**
 * Home page composition.
 *
 * Decision-driven sequence:
 *   Hero (recognition) →
 *   Audience (orientation) →
 *   Path (the framework, including stage outcomes inline) →
 *   Consequence (what happens if you don't lead this) →
 *   Credibility (who is behind this) →
 *   Final CTA (action).
 */

import { AudienceFold } from "./audience-fold";
import { ConsequenceFold } from "./consequence-fold";
import { CredibilityFold } from "./credibility-fold";
import { FinalCta } from "./final-cta";
import { HeroFold } from "./hero-fold";
import { PathFold } from "./path-fold";

export function HomeContent() {
  return (
    <>
      <HeroFold />
      <AudienceFold />
      <PathFold />
      <ConsequenceFold />
      <CredibilityFold />
      <FinalCta />
    </>
  );
}
