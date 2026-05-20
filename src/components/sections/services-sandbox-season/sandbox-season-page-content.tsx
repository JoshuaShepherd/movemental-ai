import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  ArrowLink,
  Container,
  Display,
  Eyebrow,
  Prose,
  Reveal,
  Section,
  SurfaceCard,
  Timeline,
  TimelineItem,
} from "@/components/primitives";

import {
  cohortRoles,
  deliverables,
  outOfScopeItems,
  pricingZonesStandard,
  timelinePhases,
} from "./sandbox-season-data";

export function SandboxSeasonPageContent() {
  return (
    <>
      <Hero />
      <Deliverables />
      <TimelineSection />
      <Cohort />
      <OutOfScope />
      <Pricing />
      <MethodologyPointer />
      <ExemplarPointer />
      <ClosingCTA />
    </>
  );
}

// ---------------------------------------------------------------------------

function Hero() {
  return (
    <Section variant="midnight" spacing="lg" className="text-center">
      <Container>
        <Reveal>
          <Eyebrow className="mb-4 text-inverse-foreground/70">
            AI Stewardship Sequence · Stage 2
          </Eyebrow>
          <Display size="lg" className="mx-auto max-w-4xl">
            A twelve-week <em>Sandbox Season</em> for organizations ready to adopt
            AI without losing what they are for.
          </Display>
          <Prose className="mx-auto mt-6 max-w-2xl text-lg text-inverse-foreground/80 [&_p]:text-inverse-foreground/80">
            <p>
              A small cohort of your staff — five or six people — takes your real
              work, runs three cycles of structured experiments, and assembles a
              validated portfolio of AI use cases the senior team is willing to
              stand behind.
            </p>
          </Prose>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex h-auto items-center justify-center rounded-full bg-inverse-foreground px-8 py-3.5 text-base font-medium text-inverse-surface transition-transform duration-200 ease-out hover:-translate-y-0.5"
            >
              Request a conversation
              <ArrowRight className="ml-2 size-4" aria-hidden />
            </Link>
            <Link
              href="/methodology"
              className="inline-flex items-center gap-2 border-b border-inverse-foreground/40 pb-0.5 text-base font-medium text-inverse-foreground transition-colors hover:border-inverse-foreground"
            >
              Read the methodology
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

// ---------------------------------------------------------------------------

function Deliverables() {
  return (
    <Section spacing="lg">
      <Container>
        <Reveal>
          <div className="mb-12 max-w-3xl">
            <Eyebrow className="mb-4">What you walk away with</Eyebrow>
            <Display size="md" as="h2" className="text-balance">
              Three artifacts, one trained team, <em>honestly scored.</em>
            </Display>
          </div>
        </Reveal>
        <div className="grid gap-8 md:grid-cols-3">
          {deliverables.map((item) => (
            <Reveal key={item.eyebrow}>
              <SurfaceCard tone="on-background" className="h-full">
                <span className="text-[0.78rem] font-medium uppercase tracking-eyebrow text-ink-soft">
                  {item.eyebrow}
                </span>
                <h3 className="font-serif text-[clamp(1.35rem,2.1vw,1.65rem)] font-normal italic leading-tight tracking-[-0.005em] text-foreground">
                  {item.title}
                </h3>
                <p className="text-[0.98rem] leading-normal text-muted-foreground">
                  {item.description}
                </p>
              </SurfaceCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ---------------------------------------------------------------------------

function TimelineSection() {
  return (
    <Section variant="section" spacing="lg">
      <Container>
        <div className="grid gap-16 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
          <Reveal>
            <div>
              <Eyebrow className="mb-4">The twelve-week shape</Eyebrow>
              <Display size="md" as="h2" className="text-balance">
                Five phases. <em>Spaced practice.</em> One shared document.
              </Display>
              <Prose className="mt-6">
                <p>
                  Weekly ninety-minute working sessions with roughly three hours
                  of async work between them. Short loops on purpose. Spacing is
                  what lets the eye develop between cycles.
                </p>
              </Prose>
            </div>
          </Reveal>
          <Reveal>
            <Timeline>
              {timelinePhases.map((phase) => (
                <TimelineItem
                  key={phase.meta}
                  meta={phase.meta}
                  title={phase.title}
                >
                  {phase.description}
                </TimelineItem>
              ))}
            </Timeline>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

// ---------------------------------------------------------------------------

function Cohort() {
  return (
    <Section spacing="lg">
      <Container>
        <Reveal>
          <div className="mb-12 max-w-3xl">
            <Eyebrow className="mb-4">The cohort</Eyebrow>
            <Display size="md" as="h2" className="text-balance">
              Seven named roles, <em>five or six people.</em>
            </Display>
            <Prose className="mt-6">
              <p>
                Below four, you do not get enough experiments. Above seven, the
                shared document loses signal and the weekly session stops being
                a working meeting. Five or six participants carry seven
                accountability threads so the flag, the portfolio, and the
                experiments never collapse into one overloaded seat.
              </p>
            </Prose>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cohortRoles.map((role) => (
            <Reveal key={role.role}>
              <SurfaceCard tone="on-background" className="h-full gap-3">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[1.05rem] font-medium tracking-tight text-foreground">
                    {role.role}
                  </h3>
                  <span className="shrink-0 text-[0.72rem] font-medium uppercase tracking-eyebrow text-ink-soft">
                    {role.commitment}
                  </span>
                </div>
                <p className="text-[0.95rem] leading-normal text-muted-foreground">
                  {role.description}
                </p>
              </SurfaceCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ---------------------------------------------------------------------------

function OutOfScope() {
  return (
    <Section variant="section" spacing="lg">
      <Container>
        <div className="grid gap-12 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
          <Reveal>
            <div>
              <Eyebrow className="mb-4">What is out of scope</Eyebrow>
              <Display size="md" as="h2" className="text-balance">
                Scope discipline <em>is</em> the product.
              </Display>
              <Prose className="mt-6">
                <p>
                  A proposal without an out-of-scope list fails. It is the list
                  that keeps a season&rsquo;s integrity intact. We name it before we
                  begin, defend it through the twelve weeks, and only expand
                  with explicit written authorization.
                </p>
              </Prose>
            </div>
          </Reveal>
          <Reveal>
            <ul className="space-y-3">
              {outOfScopeItems.map((item) => (
                <li key={item}>
                  <SurfaceCard tone="on-section" className="flex gap-4 text-[0.98rem] leading-normal text-muted-foreground">
                    <span
                      aria-hidden
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-ink-soft"
                    />
                    <span>{item}</span>
                  </SurfaceCard>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

// ---------------------------------------------------------------------------

function Pricing() {
  return (
    <Section spacing="lg">
      <Container>
        <Reveal>
          <div className="mb-12 max-w-3xl">
            <Eyebrow className="mb-4">Pricing</Eyebrow>
            <Display size="md" as="h2" className="text-balance">
              Fixed fee, <em>published zones</em>, clear duration.
            </Display>
            <Prose className="mt-6">
              <p>
                Not hourly. Not a retainer. Not outcome-based. A fixed fee scoped to your organization&rsquo;s size, with
                a defined program length. Cadence and operational details are confirmed in your engagement letter.
                Enterprise and multi-cohort scopes are custom; the full table lives on the pricing page.
              </p>
            </Prose>
            <div className="mt-6 flex flex-wrap gap-6">
              <ArrowLink href="/pricing">Open full pricing table</ArrowLink>
              <ArrowLink href="/contact" tone="foreground">
                Ask about the full AI Stewardship Sequence arc
              </ArrowLink>
            </div>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {pricingZonesStandard.map((zone) => (
            <Reveal key={zone.zone}>
              <SurfaceCard tone="on-background" className="h-full gap-4">
                <span className="text-[0.78rem] font-medium uppercase tracking-eyebrow text-ink-soft">
                  {zone.zone}
                </span>
                <div className="font-serif text-[clamp(1.5rem,2.6vw,1.9rem)] font-normal italic leading-tight tracking-[-0.005em] text-foreground">
                  {zone.fee}
                </div>
                <dl className="mt-1 space-y-3 text-[0.92rem] leading-normal text-muted-foreground">
                  <div>
                    <dt className="text-[0.72rem] font-medium uppercase tracking-eyebrow text-ink-soft">
                      Revenue band
                    </dt>
                    <dd className="mt-1">{zone.revenueBand}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.72rem] font-medium uppercase tracking-eyebrow text-ink-soft">
                      Scope
                    </dt>
                    <dd className="mt-1">{zone.scope}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.72rem] font-medium uppercase tracking-eyebrow text-ink-soft">
                      Timeline
                    </dt>
                    <dd className="mt-1">{zone.payment}</dd>
                  </div>
                </dl>
              </SurfaceCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ---------------------------------------------------------------------------

function MethodologyPointer() {
  return (
    <Section variant="section" spacing="lg">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="mb-4">Methodology</Eyebrow>
            <Display size="md" as="h2" className="text-balance">
              The argument is <em>published.</em>
            </Display>
            <Prose className="mx-auto mt-6">
              <p>
                Every session, every template, every flag paragraph traces back
                to a published canon piece. The nine-article sandbox canon is
                readable in about three hours end-to-end. Read it before you
                sign anything — it is the most accurate preview of the season
                we can offer.
              </p>
            </Prose>
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              <ArrowLink href="/articles/the-purpose-of-sandbox">Start the sandbox canon</ArrowLink>
              <ArrowLink href="/articles/sandbox" tone="foreground">
                Sandbox canon hub
              </ArrowLink>
              <ArrowLink href="/methodology" tone="foreground">
                Methodology map
              </ArrowLink>
              <ArrowLink href="/services/sandbox-season/exemplar" tone="foreground">
                Composite exemplar
              </ArrowLink>
              <ArrowLink href="/articles" tone="foreground">
                All articles
              </ArrowLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

// ---------------------------------------------------------------------------

function ExemplarPointer() {
  return (
    <Section spacing="lg">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-2xl bg-card p-8 text-center sm:p-10">
            <Eyebrow className="mb-4">Composite case</Eyebrow>
            <Display size="sm" as="h2" className="text-balance">
              See a season without a real client in the room
            </Display>
            <Prose className="mx-auto mt-4">
              <p>
                The exemplar is fiction on purpose: same cadence and artifacts as a real season, invented particulars so
                nothing leaks from any engagement file.
              </p>
            </Prose>
            <div className="mt-6">
              <ArrowLink href="/services/sandbox-season/exemplar">Read the composite exemplar</ArrowLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function ClosingCTA() {
  return (
    <Section variant="midnight" spacing="lg">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Display size="md" as="h2" className="text-balance">
              The smaller group that does not choose <em>either equal error.</em>
            </Display>
            <Prose className="mx-auto mt-6 [&_p]:text-inverse-foreground/80">
              <p>
                Most organizations will choose fearful avoidance or reckless
                adoption. You are being invited into the smaller group that
                does neither.
              </p>
            </Prose>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex h-auto items-center justify-center rounded-full bg-inverse-foreground px-8 py-3.5 text-base font-medium text-inverse-surface transition-transform duration-200 ease-out hover:-translate-y-0.5"
              >
                Book a 30-minute intro call
                <ArrowRight className="ml-2 size-4" aria-hidden />
              </Link>
              <Link
                href="/resources/templates"
                className="inline-flex items-center gap-2 border-b border-inverse-foreground/40 pb-0.5 text-base font-medium text-inverse-foreground transition-colors hover:border-inverse-foreground"
              >
                Request the template pack
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
