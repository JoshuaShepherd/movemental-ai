import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { NewsletterForm } from "@/components/forms/newsletter-form";
import {
  ArrowLink,
  Container,
  Display,
  Eyebrow,
  Prose,
  Reveal,
  Section,
} from "@/components/primitives";
import { BOOK_HUB_PATH, SSSS_FIELD_GUIDE_PATH } from "@/lib/canon-routes";

/**
 * Public “system” hub — how public surfaces connect (six-stage deck, book, articles,
 * assessments) and where inspectability lives, without collapsing into generic SaaS language.
 */
export function SystemPageContent() {
  return (
    <>
      <Section id="top" variant="midnight" spacing="lg" className="text-center">
        <Container>
          <Reveal>
            <Eyebrow className="mb-4 text-inverse-foreground/70">The system</Eyebrow>
            <Display size="lg" className="mx-auto max-w-4xl text-balance">
              One spine, <em>many surfaces</em>
            </Display>
            <Prose className="mx-auto mt-6 max-w-2xl text-lg text-inverse-foreground/80 [&_p]:text-inverse-foreground/80">
              <p>
                Movemental is not a single app pretending to own your mission. It is a
                disciplined set of public surfaces — narrative, manuscript, essays, and
                instruments — that all answer to the same thesis:{" "}
                <strong>two intelligences</strong> integrated into a legible foundation before
                scale. The job of the system is coherence and inspectability, not feature sprawl.
              </p>
            </Prose>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/fragmentation"
                className="inline-flex h-auto items-center justify-center rounded-full bg-inverse-foreground px-8 py-3.5 text-base font-medium text-inverse-surface transition-transform duration-200 ease-out hover:-translate-y-0.5"
              >
                Walk the six stages
                <ArrowRight className="ml-2 size-4" aria-hidden />
              </Link>
              <Link
                href="/platform"
                className="inline-flex items-center gap-2 border-b border-inverse-foreground/40 pb-0.5 text-base font-medium text-inverse-foreground transition-colors hover:border-inverse-foreground"
              >
                Platform overview
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section variant="section" spacing="lg">
        <Container>
          <Reveal>
            <div className="mb-10 max-w-3xl">
              <Eyebrow className="mb-4">Surfaces</Eyebrow>
              <Display size="md" as="h2" className="text-balance">
                Where the argument stays checkable
              </Display>
              <Prose className="mt-4">
                <p>
                  The horizontal deck at <Link href="/fragmentation">/fragmentation</Link>{" "}
                  dramatizes the arc. The book hub carries the long manuscript. Articles name the
                  staircase and the ethics of use. Engagements (Sandbox Season first) turn the
                  same vocabulary into fixed-scope work inside your organization — so when you say{" "}
                  <strong>Integration</strong>, everyone can point at the same artifacts.
                </p>
              </Prose>
            </div>
          </Reveal>
          <Reveal>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <Link
                href="/articles/two-intelligences-integration"
                className="border-b border-border pb-0.5 font-medium text-foreground transition-colors hover:border-foreground"
              >
                Two intelligences, one integration thesis
              </Link>
              <Link
                href={SSSS_FIELD_GUIDE_PATH}
                className="border-b border-border pb-0.5 font-medium text-foreground transition-colors hover:border-foreground"
              >
                AI Stewardship Sequence field guide
              </Link>
              <Link
                href={BOOK_HUB_PATH}
                className="border-b border-border pb-0.5 font-medium text-foreground transition-colors hover:border-foreground"
              >
                Read the field guide (book)
              </Link>
              <Link
                href="/methodology"
                className="border-b border-border pb-0.5 font-medium text-foreground transition-colors hover:border-foreground"
              >
                Methodology
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section variant="default" spacing="lg">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <Eyebrow className="mb-4">When you are ready</Eyebrow>
              <Display size="md" as="h2" className="text-balance">
                Services, pricing, and contact stay explicit
              </Display>
              <Prose className="mt-4">
                <p>
                  Nothing here replaces a conversation about fit. If you need scope, start at{" "}
                  <Link href="/services">Services</Link> and <Link href="/pricing">Pricing</Link>
                  , then use <Link href="/contact">Contact</Link> when you are ready to name
                  constraints.
                </p>
              </Prose>
              <div className="mt-8 flex flex-wrap gap-6">
                <ArrowLink href="/services">Services overview</ArrowLink>
                <ArrowLink href="/pricing" tone="foreground">
                  Pricing
                </ArrowLink>
                <ArrowLink href="/contact" tone="foreground">
                  Start a conversation
                </ArrowLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section id="invitation" variant="section" spacing="lg">
        <Container className="mx-auto max-w-lg text-center">
          <Reveal>
            <Eyebrow className="mb-4">Stay close</Eyebrow>
            <Display size="sm" as="h2" className="text-balance">
              Or begin quieter
            </Display>
            <p className="mt-4 text-base text-muted-foreground">
              One note per month on formation, infrastructure, and what we&rsquo;re learning.
            </p>
            <div className="mt-6">
              <NewsletterForm source="system-invitation" />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
