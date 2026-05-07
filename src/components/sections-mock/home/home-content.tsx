/**
 * Home page composition.
 *
 * Decision-driven sequence:
 *   Hero (recognition) →
 *   Audience (segment routing) →
 *   Path (the framework, including stage outcomes inline) →
 *   Credibility (who is behind this — founders + Movement Voices) →
 *   Proof beat (the path is being walked) →
 *   Final CTA (action).
 */

import { AudienceFold } from "./audience-fold";
import { CredibilityFold } from "./credibility-fold";
import { FinalCta } from "./final-cta";
import { HeroFold } from "./hero-fold";
import { PathFold } from "./path-fold";
import { ProofBeatFold } from "./proof-beat-fold";

export function HomeContent() {
  return (
    <>
      <HeroFold />
      <AudienceFold />
      <PathFold />
      <CredibilityFold />
      <ProofBeatFold />
      <FinalCta />
    </>
  );
}
