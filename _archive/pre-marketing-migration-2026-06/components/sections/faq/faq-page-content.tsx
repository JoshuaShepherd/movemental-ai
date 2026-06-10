import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { NewsletterForm } from "@/components/forms/newsletter-form";
import {
  Container,
  Display,
  Eyebrow,
  FeatureSplit,
  InPageToc,
  Prose,
  Reveal,
  Section,
} from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/sections/faq-accordion";

import { faqSections, faqToc } from "./faq-data";

export function FaqPageContent() {
  return (
    <>
      <Section spacing="lg">
        <Container>
          <FeatureSplit
            intro={
              <div>
                <Eyebrow className="mb-4 animate-fade-in [animation-delay:100ms]">FAQ</Eyebrow>
                <Display size="lg" className="animate-fade-up">
                  Everything you&apos;d want to ask before engaging
                </Display>
                <Prose className="mt-6 text-lg animate-fade-up [animation-delay:200ms]">
                  <p>
                    Straight answers about what Movemental is, who it&apos;s for, how AI fits, what it costs, and what
                    you keep.
                  </p>
                  <p className="text-base text-muted-foreground">
                    <strong className="font-semibold text-foreground">Informational fragmentation</strong> is when what
                    you know is scattered across tools and files.{" "}
                    <strong className="font-semibold text-foreground">Relational fragmentation</strong> is when who you
                    know and steward lives outside the same surfaces. Both show up in credibility and continuity — see{" "}
                    <Link href="/fragmentation" className="font-medium text-primary underline-offset-4 hover:underline">
                      the fragmentation story
                    </Link>{" "}
                    for the six-stage path (Fragmentation → Integration → Activation → Formation → Multiplication →
                    Movement).
                  </p>
                  <p className="text-base text-muted-foreground">
                    Most teams feel the ceiling at{" "}
                    <strong className="font-semibold text-foreground">integration</strong> — when informational and
                    relational intelligence still need to become one foundation. Movemental names serious adoption as the{" "}
                    <strong className="font-semibold text-foreground">AI Stewardship Sequence: Safety, Sandbox, Skills, Solutions</strong>
                    , in that order. The longform arc lives in the{" "}
                    <Link href="/book" className="font-medium text-primary underline-offset-4 hover:underline">
                      book
                    </Link>
                    ; the organizational walkthrough lives in the{" "}
                    <Link
                      href="/articles/ssss-field-guide-for-organizational-leaders"
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      field guide article
                    </Link>
                    .
                  </p>
                </Prose>
              </div>
            }
          >
            <InPageToc heading="Jump to topic" items={[...faqToc]} />
          </FeatureSplit>
        </Container>
      </Section>

      <Section variant="section">
        <Reveal>
          <Container>
            <FaqAccordion sections={faqSections} />
          </Container>
        </Reveal>
      </Section>

      <Section variant="section" spacing="lg">
        <Reveal>
          <Container className="text-center">
            <Display size="sm" as="h2" className="mx-auto max-w-3xl">
              Still have questions?
            </Display>
            <Prose className="mx-auto mt-4 max-w-2xl">
              <p>
                The best next step is a real conversation. Tell us what you&apos;re building and we&apos;ll give you a
                straight answer.
              </p>
            </Prose>
            <div className="mt-8 flex flex-col items-center gap-8">
              <Button asChild size="lg">
                <Link href="/contact?interest=safestart">
                  Start SafeStart
                  <ArrowRight className="ml-1 size-4" aria-hidden />
                </Link>
              </Button>
              <div className="flex w-full max-w-md flex-col gap-3 border-t border-border pt-8 text-left">
                <p className="text-xs font-medium uppercase tracking-eyebrow text-ink-soft">Or begin quieter</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  One note per month on formation, infrastructure, and what we&apos;re learning.
                </p>
                <NewsletterForm source="faq-footer" />
              </div>
            </div>
          </Container>
        </Reveal>
      </Section>
    </>
  );
}
