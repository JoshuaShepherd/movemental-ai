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
 * Public "platform" hub — foundation layer (library · graph · voice · pathways),
 * relationship to the six-stage arc and the AI Stewardship Sequence, with paths
 * to engagements and pricing.
 */
export function PlatformPageContent() {
  return (
    <>
      <Section id="top" variant="midnight" spacing="lg" className="text-center">
        <Container>
          <Reveal>
            <Eyebrow className="mb-4 text-inverse-foreground/70">The platform</Eyebrow>
            <Display size="lg" className="mx-auto max-w-4xl text-balance">
              Foundation for <em>two intelligences</em>, not another tool stack
            </Display>
            <Prose className="mx-auto mt-6 max-w-2xl text-lg text-inverse-foreground/80 [&_p]:text-inverse-foreground/80">
              <p>
                Movemental is built for the moment after fragmentation becomes visible: when
                informational and relational intelligence still live in different rooms, and{" "}
                <strong>integration</strong> — not a software SKU — is the load-bearing move. The
                work produces an integrated <strong>library</strong>, a legible relational{" "}
                <strong>graph</strong>, a recoverable <strong>voice</strong>, and{" "}
                <strong>pathways</strong> people can actually walk.
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
                href="/pricing"
                className="inline-flex items-center gap-2 border-b border-inverse-foreground/40 pb-0.5 text-base font-medium text-inverse-foreground transition-colors hover:border-inverse-foreground"
              >
                See published pricing
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
              <Eyebrow className="mb-4">Trajectory</Eyebrow>
              <Display size="md" as="h2" className="text-balance">
                One arc: Fragmentation to Movement
              </Display>
              <Prose className="mt-4">
                <p>
                  The horizontal deck at <Link href="/fragmentation">/fragmentation</Link> names
                  the same six stages the book treats as one evolving system. Most organizations
                  stall longest moving from Fragmentation into <strong>Integration</strong> — where
                  scatter has to become a shared foundation before activation is honest.
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
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section variant="default" spacing="lg">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <Eyebrow className="mb-4">Engagements</Eyebrow>
              <Display size="md" as="h2" className="text-balance">
                Hands-on seasons on top of public methodology
              </Display>
              <Prose className="mt-4">
                <p>
                  Safety · Sandbox · Skills · Solutions is the staircase organizations climb to
                  enter AI faithfully. Published methodology lives in articles and the book; scoped
                  seasons (starting with Sandbox Season) are where we work inside your corpus with
                  fixed fees and named deliverables.
                </p>
              </Prose>
              <div className="mt-8 flex flex-wrap gap-6">
                <ArrowLink href="/services">Services overview</ArrowLink>
                <ArrowLink href="/services/sandbox-season" tone="foreground">
                  Sandbox Season
                </ArrowLink>
                <ArrowLink href="/contact?interest=safestart" tone="foreground">
                  Start SafeStart
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
              <NewsletterForm source="platform-invitation" />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
