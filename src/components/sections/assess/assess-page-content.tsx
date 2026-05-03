import Link from "next/link";

import { SsssIntegrityDiagnostic } from "@/components/assessment";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container, Section } from "@/components/primitives";
import { AudienceLabel } from "@/components/sections/audience-concept";

export function AssessPageContent() {
  return (
    <div data-assess="ssss-integrity" className="text-pretty">
      <Section variant="default" spacing="lg" className="scroll-mt-(--site-chrome-total) pt-8 md:pt-12">
        <Container width="narrow">
          <RevealOnScroll>
            <AudienceLabel>Evaluate</AudienceLabel>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.06}>
            <h1 className="mt-2 text-balance text-display text-foreground">
              AI Stewardship Sequence — integrity diagnostic
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.1} className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              One diagnostic for the full sequence:{" "}
              <strong className="font-medium text-foreground">Safety, Sandbox, Skills, Solutions</strong>. It is
              operational infrastructure — governance and evidence before workflows and tools — not a generic AI
              maturity quiz.
            </p>
            <p>
              The item bank, scoring rules, and illusion flags are documented in the{" "}
              <Link
                href="/articles/the-ssss-journey-assessment-checklist"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                operational backbone article
              </Link>{" "}
              (single source of truth for product and workshops).
            </p>
          </RevealOnScroll>
        </Container>
      </Section>

      <Section variant="section" spacing="lg" aria-labelledby="ssss-assess-title">
        <Container width="narrow">
          <h2 id="ssss-assess-title" className="sr-only">
            AI Stewardship Sequence — integrity diagnostic
          </h2>
          <RevealOnScroll>
            <SsssIntegrityDiagnostic />
          </RevealOnScroll>
        </Container>
      </Section>
    </div>
  );
}
