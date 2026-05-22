import Link from "next/link";
import { ArrowRight, Layers, Shield } from "lucide-react";

import { NewsletterForm } from "@/components/forms/newsletter-form";
import {
  ArrowLink,
  Container,
  Display,
  Eyebrow,
  Prose,
  Reveal,
  Section,
  SurfaceCard,
} from "@/components/primitives";
import { BOOK_HUB_PATH, SSSS_FIELD_GUIDE_PATH } from "@/lib/canon-routes";

const followOnStages = [
  {
    stage: "Safety",
    title: "Readiness and boundaries",
    body:
      "Named Safety Owner, explicit data classes, and non-negotiable outs before experiments touch real work. Offered as a scoped engagement ahead of Sandbox when leadership asks for it.",
    href: "/contact",
  },
  {
    stage: "Sandbox",
    title: "Sandbox Season",
    body:
      "The twelve-week facilitated season: portfolio, governance one-pager, and a trained cohort. This is the product Movemental publishes in full.",
    href: "/services/sandbox-season",
  },
  {
    stage: "Skills",
    title: "Judgment under load",
    body:
      "Deeper formation on the highest-risk use cases the portfolio surfaces. Sixteen weeks, fixed scope, after at least one Sandbox season.",
    href: "/contact",
  },
  {
    stage: "Solutions",
    title: "Production advisory",
    body:
      "Scoped support when a validated use case is ready to ship. Not sold until the portfolio has lived inside the organization for two quarters.",
    href: "/contact",
  },
] as const;

export function ServicesHubPageContent() {
  return (
    <>
      <Section id="top" variant="midnight" spacing="lg" className="text-center">
        <Container>
          <Reveal>
            <Eyebrow className="mb-4 text-inverse-foreground/70">Engagements</Eyebrow>
            <Display size="lg" className="mx-auto max-w-4xl">
              How Movemental works <em>with</em> organizations
            </Display>
            <Prose className="mx-auto mt-6 max-w-2xl text-lg text-inverse-foreground/80 [&_p]:text-inverse-foreground/80">
              <p>
                Public methodology, private client work. Start from the offering that matches where you are in the
                Safety · Sandbox · Skills · Solutions staircase, then go deeper only when the prior stage earns the
                next one. That staircase sits on the longer six-stage arc — see{" "}
                <Link
                  href="/fragmentation"
                  className="font-medium text-inverse-foreground underline decoration-inverse-foreground/40 underline-offset-4 hover:decoration-inverse-foreground"
                >
                  /fragmentation
                </Link>{" "}
                for the trajectory and{" "}
                <Link
                  href="/platform"
                  className="font-medium text-inverse-foreground underline decoration-inverse-foreground/40 underline-offset-4 hover:decoration-inverse-foreground"
                >
                  /platform
                </Link>{" "}
                for what integration is meant to produce underneath.
              </p>
            </Prose>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/services/sandbox-season"
                className="inline-flex h-auto items-center justify-center rounded-full bg-inverse-foreground px-8 py-3.5 text-base font-medium text-inverse-surface transition-transform duration-200 ease-out hover:-translate-y-0.5"
              >
                Sandbox Season
                <ArrowRight className="ml-2 size-4" aria-hidden />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 border-b border-inverse-foreground/40 pb-0.5 text-base font-medium text-inverse-foreground transition-colors hover:border-inverse-foreground"
              >
                See pricing
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <Reveal>
            <div className="mb-10 max-w-3xl">
              <Eyebrow className="mb-4">Featured offering</Eyebrow>
              <Display size="md" as="h2" className="text-balance">
                Sandbox Season
              </Display>
              <Prose className="mt-4">
                <p>
                  Twelve weeks, one cohort, one shared document, three experiment cycles. You leave with a validated
                  portfolio, a board-ready governance one-pager, and staff who can run the next season without us.
                </p>
              </Prose>
              <div className="mt-6 flex flex-wrap gap-6">
                <ArrowLink href="/services/sandbox-season" size="md">
                  Read the full service page
                </ArrowLink>
                <ArrowLink href="/services/sandbox-season/exemplar" size="md" tone="foreground">
                  Composite exemplar
                </ArrowLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section variant="section" spacing="lg">
        <Container>
          <Reveal>
            <div className="mb-10 max-w-3xl">
              <Eyebrow className="mb-4">The AI Stewardship Sequence</Eyebrow>
              <Display size="md" as="h2" className="text-balance">
                Safety, Sandbox, Skills, Solutions
              </Display>
              <Prose className="mt-4">
                <p>
                  Sandbox is Stage 2. The stages before and after are real products, each with its own contract and
                  cadence. They are named here so you can see the full arc, even when you only enter at one step.
                </p>
              </Prose>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {followOnStages.map((item) => (
              <Reveal key={item.stage}>
                <SurfaceCard tone="on-section" className="h-full gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-[0.78rem] font-medium uppercase tracking-eyebrow text-ink-soft">
                      {item.stage}
                    </span>
                    {item.stage === "Sandbox" ? (
                      <Layers className="size-5 shrink-0 text-muted-foreground" aria-hidden />
                    ) : (
                      <Shield className="size-5 shrink-0 text-muted-foreground" aria-hidden />
                    )}
                  </div>
                  <h3 className="font-serif text-[clamp(1.2rem,2vw,1.45rem)] font-normal italic leading-tight tracking-[-0.005em] text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-[0.95rem] leading-normal text-muted-foreground">{item.body}</p>
                  <div className="mt-auto pt-2">
                    <ArrowLink href={item.href} size="sm" tone="foreground">
                      {item.stage === "Sandbox" ? "Open Sandbox Season" : "Ask about this stage"}
                    </ArrowLink>
                  </div>
                </SurfaceCard>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mx-auto mt-12 flex max-w-3xl flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
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
                href="/assess"
                className="border-b border-border pb-0.5 font-medium text-foreground transition-colors hover:border-foreground"
              >
                AI Stewardship Sequence assessment
              </Link>
              <Link
                href="/system"
                className="border-b border-border pb-0.5 font-medium text-foreground transition-colors hover:border-foreground"
              >
                How the system fits together
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Display size="sm" as="h2" className="text-balance">
                Not sure where you land?
              </Display>
              <Prose className="mx-auto mt-4">
                <p>
                  Send context on email or use the form. A human routes it. If Sandbox is the wrong fit, we will say so
                  directly.
                </p>
              </Prose>
              <div className="mt-8">
                <ArrowLink href="/contact?interest=safestart" size="lg">
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
              <NewsletterForm source="services-invitation" />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
