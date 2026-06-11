import type { ReactNode } from "react";
import Link from "next/link";

import type { ResearchItem } from "@/lib/research/data";

import { aiCredibilityCrisisBody } from "./bodies/ai-credibility-crisis-body";
import { convergenceThesisBody } from "./bodies/convergence-thesis-body";
import { credibilityThesisBody } from "./bodies/credibility-thesis-body";
import { findingAiGuidanceWorthTrustingBody } from "./bodies/finding-ai-guidance-worth-trusting-body";
import { publishingEconomicsBody } from "./bodies/publishing-economics-body";
import { sandboxDiscoveryBody } from "./bodies/sandbox-discovery-body";
import { theCostOfFragmentationBody } from "./bodies/the-cost-of-fragmentation-body";
import { theCredibilityCrisisBody } from "./bodies/the-credibility-crisis-body";
import { theSkillOfAiBody } from "./bodies/the-skill-of-ai-body";
import { sceniusNetworkCredibilityBody } from "./bodies/scenius-network-credibility-body";
import { seoGeoDiscoverabilityBody } from "./bodies/seo-geo-discoverability-body";
import { trustVerificationBody } from "./bodies/trust-verification-body";
import { voicePreservationBody } from "./bodies/voice-preservation-body";
import styles from "./research.module.css";

/** Slug → full-read body. Papers without an entry fall back to a stub. */
const BODY_REGISTRY: Record<string, ReactNode> = {
  "ai-credibility-crisis": aiCredibilityCrisisBody,
  "finding-ai-guidance-worth-trusting": findingAiGuidanceWorthTrustingBody,
  "sandbox-discovery": sandboxDiscoveryBody,
  "the-skill-of-ai": theSkillOfAiBody,
  "scenius-network-credibility": sceniusNetworkCredibilityBody,
  "publishing-economics": publishingEconomicsBody,
  "seo-geo-discoverability": seoGeoDiscoverabilityBody,
  "trust-verification": trustVerificationBody,
  "voice-preservation": voicePreservationBody,
  "convergence-thesis": convergenceThesisBody,
  "credibility-thesis": credibilityThesisBody,
  "the-credibility-crisis": theCredibilityCrisisBody,
  "the-cost-of-fragmentation": theCostOfFragmentationBody,
};

/** Minimal honest body for papers whose full read is not yet wired. */
function fallbackBody(item: ResearchItem): ReactNode {
  return (
    <>
      <p className={styles.dropCap}>{item.abstract.replace(/\{\/?hl\}/g, "")}</p>
      <p className={styles.textMuted}>
        This piece is part of the Movemental research library. The full text is being prepared;
        in the meantime you can review the sources behind it or ask the agent about its argument.
      </p>
      <p>
        <Link href="/research/sources" className={styles.btnLink}>
          View the sources &rarr;
        </Link>
      </p>
    </>
  );
}

export function getArticleBody(item: ResearchItem): ReactNode {
  return BODY_REGISTRY[item.slug] ?? fallbackBody(item);
}
