import Link from "next/link";

import { Container, Section } from "@/components/primitives";

import type { CaseStudyHero } from "./types";

/**
 * Simple hero band. Three lines: kicker → big italic title → supporting lede,
 * plus a single conversation-forward CTA. Uses the same typographic register
 * as the home Ledger hero — Instrument Serif italic, hairline kicker rule.
 */
export function CaseStudyHeroBand({ hero }: { hero: CaseStudyHero }) {
  return (
    <Section variant="default" spacing="lg" aria-labelledby="case-study-hero-h1">
      <Container>
        <p className="inline-flex items-center gap-3 mb-7 text-[0.72rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
          <span aria-hidden className="inline-block w-7 h-px bg-foreground" />
          {hero.kicker}
        </p>
        <h1
          id="case-study-hero-h1"
          className="font-serif italic text-foreground text-[clamp(2.4rem,6vw,5rem)] leading-[1.02] tracking-[-0.025em] max-w-[20ch] mb-7"
        >
          {hero.title}
        </h1>
        <p className="max-w-[40rem] text-[1.18rem] leading-[1.6] text-muted-foreground mb-10">
          {hero.lede}
        </p>
        <Link
          href="/contact?interest=safestart"
          className="inline-flex items-center justify-center px-6 py-3 rounded-pill bg-primary text-primary-foreground font-medium text-[0.95rem] hover:bg-primary-dim transition-colors"
        >
          Start SafeStart
        </Link>
      </Container>
    </Section>
  );
}
