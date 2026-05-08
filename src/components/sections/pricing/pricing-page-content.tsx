import Link from "next/link";

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
type StageOffering = {
  stageEyebrow: string;
  title: string;
  priceLine: string;
  subPrice?: string;
  body: string;
  whatYouGet: readonly string[];
  payment: string;
  ctaLabel: string;
  ctaHref: string;
};

type BundleOffering = {
  eyebrow: string;
  badge?: string;
  title: string;
  priceLine: string;
  subPrice: string;
  body: string;
  whatYouGet: readonly string[];
  payment: string;
  ctaLabel: string;
  ctaHref: string;
};

const STAGE_OFFERINGS: readonly StageOffering[] = [
  {
    stageEyebrow: "Stage 01",
    title: "Safety Documentation",
    priceLine: "$1,000",
    subPrice: "Free toolkit available",
    body: "Two weeks of facilitated work. Roughly eight hours synchronous plus async drafting support. Seven ratifiable governance artifacts produced and customized to your organization. The free \"It Starts With Safety\" toolkit is the 16-page field guide for organizations that prefer to run the self-assessment first or do the work themselves.",
    whatYouGet: [
      "Acceptable Use Statement",
      "Care Boundaries",
      "Disclosure Standards",
      "Vendor and Tool Inventory",
      "Data Handling Protocol",
      "Incident Response Plan",
      "Named Refusals",
    ],
    payment: "Net 15 from signing.",
    ctaLabel: "Begin Safety",
    ctaHref: "/contact?interest=safety",
  },
  {
    stageEyebrow: "Stage 02",
    title: "Sandbox Discovery",
    priceLine: "$15,000",
    subPrice: "Standard engagement",
    body: "Four weeks of disciplined exploration. Real recipes against real work. Module-based facilitation calibrated to your team’s calendar. Variance: scope flexes meaningfully smaller or larger than standard depending on team count and organizational size; institutional and network-scale Sandbox engagements are priced separately and scoped per conversation.",
    whatYouGet: [
      "Use Case Portfolio with green/yellow/red adjudication",
      "Discernment Memo",
      "Readiness Assessment",
    ],
    payment: "50% at signing, 50% at completion.",
    ctaLabel: "Begin a Sandbox",
    ctaHref: "/contact?interest=sandbox",
  },
  {
    stageEyebrow: "Stage 03",
    title: "Skills Development",
    priceLine: "$15,000",
    subPrice: "Cohort facilitation · $5,000/year self-paced LMS license also available",
    body: "Eight modules over eight weeks. Cohort of 8 to 15 participants from your organization. The formational deepening that turns practitioners into discerners. Self-paced LMS license is currently in build for organizations integrating Skills into ongoing staff onboarding; license includes up to 15 participants per organization annually.",
    whatYouGet: [
      "Eight learning outcomes demonstrated",
      "Certified practitioner-to-discerner capacity in your staff",
      "Curriculum tuned to your team’s actual Sandbox-surfaced use cases",
    ],
    payment: "50% at signing, 50% at completion (cohort). Annual licensing (LMS).",
    ctaLabel: "Begin a Skills cohort",
    ctaHref: "/contact?interest=skills",
  },
  {
    stageEyebrow: "Stage 04",
    title: "Solutions Deployment",
    priceLine: "from $30,000",
    subPrice: "Scoped per conversation",
    body: "A configured deployment built on the foundation the upstream stages produced. Scope, configuration, and timeline are determined by what your Sandbox surfaced and what your Skills cohort prepared your staff to operate. The Movemental platform deployment is the architectural reference; specific configurations vary by what your situation warrants. Larger institutional and network-scale deployments are scoped separately.",
    whatYouGet: [
      "A configured deployment",
      "Governance integration document",
      "90 days of operational support",
      "Ongoing relationship structure determined per engagement",
    ],
    payment: "Milestone-based, typically 30% at signing, 30% at build midpoint, 40% at validation and handoff.",
    ctaLabel: "Begin a Solutions conversation",
    ctaHref: "/contact?interest=solutions",
  },
];

const BUNDLE: BundleOffering = {
  eyebrow: "The full commitment",
  badge: "Full path",
  title: "The Path Bundle",
  priceLine: "$50,000",
  subPrice: "Safety + Sandbox + Skills + foundational Solutions",
  body: "For organizations ready to commit to the full path at the start. Approximately 20% below the cost of paying tier-by-tier. Foundational Solutions delivery is calibrated to what the upstream stages surface; engagements requiring expanded Solutions scope are addressed separately.",
  whatYouGet: ["Everything in Stages 01 through 04 of the Movemental AI Path, sequenced and integrated."],
  payment: "25% at each stage start (signing, Sandbox start, Skills start, Solutions delivery).",
  ctaLabel: "Begin the full path",
  ctaHref: "/contact?interest=bundle",
};

function StageCard({ offering }: { offering: StageOffering }) {
  return (
    <SurfaceCard tone="on-background" className="h-full gap-4">
      <Eyebrow className="text-left">{offering.stageEyebrow}</Eyebrow>
      <h3 className="text-left font-sans text-xl font-medium tracking-tight text-foreground">{offering.title}</h3>
      <p
        className="font-serif-display text-4xl font-normal italic leading-tight text-foreground sm:text-5xl"
        aria-label={`Price ${offering.priceLine}`}
      >
        {offering.priceLine}
      </p>
      {offering.subPrice ? (
        <p className="text-sm font-medium text-muted-foreground">{offering.subPrice}</p>
      ) : null}
      <Prose className="text-[0.94rem] leading-relaxed [&_p]:text-muted-foreground">
        <p>{offering.body}</p>
      </Prose>
      <div>
        <p className="text-[0.72rem] font-medium uppercase tracking-eyebrow text-muted-foreground">What you get</p>
        <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
          {offering.whatYouGet.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Payment:</span> {offering.payment}
      </p>
      <ArrowLink href={offering.ctaHref} className="mt-2">
        {offering.ctaLabel}
      </ArrowLink>
    </SurfaceCard>
  );
}

function BundleCard() {
  return (
    <SurfaceCard tone="on-section" className="relative gap-4 border-2 border-primary/25 shadow-ambient">
      <div className="flex flex-wrap items-center gap-3">
        <Eyebrow className="text-left">{BUNDLE.eyebrow}</Eyebrow>
        {BUNDLE.badge ? (
          <span className="rounded-full border border-primary/40 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-eyebrow text-primary">
            {BUNDLE.badge}
          </span>
        ) : null}
      </div>
      <h3 className="text-left font-sans text-xl font-medium tracking-tight text-foreground">{BUNDLE.title}</h3>
      <p
        className="font-serif-display text-4xl font-normal italic leading-tight text-foreground sm:text-5xl"
        aria-label={`Price ${BUNDLE.priceLine}`}
      >
        {BUNDLE.priceLine}
      </p>
      <p className="text-sm font-medium text-muted-foreground">{BUNDLE.subPrice}</p>
      <Prose className="text-[0.94rem] leading-relaxed [&_p]:text-muted-foreground">
        <p>{BUNDLE.body}</p>
      </Prose>
      <div>
        <p className="text-[0.72rem] font-medium uppercase tracking-eyebrow text-muted-foreground">What you get</p>
        <ul className="mt-2 list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
          {BUNDLE.whatYouGet.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Payment:</span> {BUNDLE.payment}
      </p>
      <ArrowLink href={BUNDLE.ctaHref} className="mt-2">
        {BUNDLE.ctaLabel}
      </ArrowLink>
    </SurfaceCard>
  );
}

export function PricingPageContent() {
  return (
    <>
      <Section variant="midnight" spacing="lg" className="text-center">
        <Container>
          <Reveal>
            <Eyebrow className="mb-4 text-inverse-foreground/70">Pricing</Eyebrow>
            <Display size="lg" as="h1" className="mx-auto max-w-4xl text-inverse-foreground">
              Honest prices for honest work.
            </Display>
            <Prose className="mx-auto mt-6 max-w-2xl text-lg text-inverse-foreground/80 [&_p]:text-inverse-foreground/80">
              <p>
                Movemental publishes its prices because most organizations evaluating AI work need to know whether the
                conversation is even worth starting. Five lines of pricing cover most of what we do. Network and
                institutional engagements are scoped per conversation because the variance is too real to publish as a
                single number. We will tell you specifically what your situation warrants, including when the answer is
                &ldquo;begin smaller&rdquo; or &ldquo;you do not need us yet.&rdquo;
              </p>
            </Prose>
          </Reveal>
        </Container>
      </Section>

      <Section variant="default" spacing="lg">
        <Container>
          <Reveal>
            <div className="mb-10 max-w-4xl">
              <Eyebrow className="mb-4">The path</Eyebrow>
              <Display size="md" as="h2" className="text-balance">
                Five prices on the four-stage path.
              </Display>
              <Prose className="mt-4 max-w-3xl">
                <p>
                  Most organizations begin with Safety, continue to Sandbox, and decide what comes next from there. The
                  bundle is for organizations ready to commit to the full path at the start. Each price reflects what
                  the work actually costs to deliver well. We do not discount our standard offerings; the bundle is the
                  published commitment discount.
                </p>
              </Prose>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-12">
            {STAGE_OFFERINGS.map((offering) => (
              <Reveal key={offering.title} className="md:col-span-1 xl:col-span-3">
                <StageCard offering={offering} />
              </Reveal>
            ))}
            <Reveal delay={80} className="md:col-span-2 xl:col-span-12">
              <BundleCard />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section variant="default" spacing="lg">
        <Container>
          <Reveal>
            <div className="mb-10 max-w-3xl">
              <Eyebrow className="mb-4">Network and institutional engagements</Eyebrow>
              <Display size="md" as="h2" className="text-balance">
                Larger engagements, scoped per conversation.
              </Display>
              <Prose className="mt-4 max-w-3xl">
                <p>
                  Denominations, training networks, multi-site organizations, and institutional bodies engage Movemental
                  on a different scale than standalone churches and nonprofits. The variance between engagements is too
                  large to publish as a single number, and the buyer expects a real conversation rather than a sticker
                  price.
                </p>
                <p className="mt-4 font-medium text-foreground">Available engagements include:</p>
              </Prose>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Reveal>
              <SurfaceCard tone="on-background" className="gap-3 border border-border/60 bg-card/80">
                <h3 className="font-medium text-foreground">Network Sandbox or Skills</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Sandbox or Skills work delivered across the institution and its member organizations with
                  cross-cohort learning and institutional synthesis. Typically begin at $60,000.
                </p>
              </SurfaceCard>
            </Reveal>
            <Reveal>
              <SurfaceCard tone="on-background" className="gap-3 border border-border/60 bg-card/80">
                <h3 className="font-medium text-foreground">Institutional platform deployments</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Movemental platform deployed as a dedicated institutional tenant with member-organization sub-tenants,
                  federated governance, and shared agent capability. Engagement value reflects the scope of the network.
                </p>
              </SurfaceCard>
            </Reveal>
            <Reveal>
              <SurfaceCard tone="on-background" className="gap-3 border border-border/60 bg-card/80">
                <h3 className="font-medium text-foreground">Train-the-Facilitator certification</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Twelve-week certification program preparing institutional staff to deliver Skills internally under
                  license. Currently in development for institutional partners.
                </p>
              </SurfaceCard>
            </Reveal>
            <Reveal>
              <SurfaceCard tone="on-background" className="gap-3 border border-border/60 bg-card/80">
                <h3 className="font-medium text-foreground">Hybrid and bespoke arrangements</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Custom engagements that do not map cleanly to the above. Always preceded by a Solutions Scoping
                  engagement that produces a written specification before further commitment.
                </p>
              </SurfaceCard>
            </Reveal>
          </div>
          <Reveal>
            <Prose className="mx-auto mt-10 max-w-3xl">
              <p>
                Each engagement is scoped through a conversation with our team. Most begin with a small written brief
                that names what the institution is trying to accomplish and what the upstream work has surfaced.
              </p>
            </Prose>
            <div className="mt-8">
              <ArrowLink href="/contact?interest=institutional">Discuss an institutional engagement</ArrowLink>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section variant="section" spacing="lg">
        <Container>
          <Reveal>
            <div className="mb-8 max-w-3xl">
              <Eyebrow className="mb-4">Terms</Eyebrow>
              <Display size="md" as="h2" className="text-balance">
                Honest about money.
              </Display>
              <Prose className="mt-4 max-w-3xl">
                <p>Three things worth saying directly.</p>
              </Prose>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Reveal>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-eyebrow text-foreground">Payment terms</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Safety MVP is Net 15 from signing. Sandbox and Skills cohorts are 50% at signing and 50% at completion.
                  Solutions engagements are milestone-based, typically 30/30/40 across signing, midpoint, and validation.
                  The Path Bundle is 25% at each stage start. Institutional engagements are structured per conversation.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-eyebrow text-foreground">Discounting</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  We do not discount our standard offerings. The Path Bundle is the published commitment discount. We
                  hold a small number of scholarship slots per quarter for under-resourced organizations whose mission
                  warrants the work; these are arranged through direct conversation and documented as scholarship rather
                  than negotiated as discount.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-eyebrow text-foreground">
                  Currency and international
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Prices are in US dollars. Engagements with international organizations are available; pricing in other
                  currencies and adjustments for purchasing-power parity are arranged per engagement.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section variant="default" spacing="lg">
        <Container>
          <Reveal>
            <div className="mb-10 max-w-3xl">
              <Eyebrow className="mb-4">Where to start</Eyebrow>
              <Display size="md" as="h2" className="text-balance">
                Begin where you actually are.
              </Display>
              <Prose className="mt-4 max-w-3xl">
                <p>
                  Most organizations evaluating Movemental should not begin by selecting an offering. Start by
                  understanding where your organization actually sits on the path. The Field Guide is a 30-minute read
                  that summarizes the path. The Movemental AI Assessment is a 15-minute structured intake that produces
                  a read-back naming your current posture and the recommended next step. A conversation is the right
                  starting point when reading and assessment have not produced clarity.
                </p>
              </Prose>
            </div>
          </Reveal>
          <Reveal>
            <div className="flex flex-col flex-wrap gap-4 sm:flex-row sm:items-center">
              <Link
                href="/field-guide"
                className="btn-pill btn-pill--primary inline-flex items-center justify-center px-8 py-4 text-center text-xs font-semibold uppercase tracking-eyebrow"
              >
                Read the Field Guide
              </Link>
              <Link
                href="/assess"
                className="btn-pill btn-pill--ghost inline-flex items-center justify-center border border-border px-8 py-4 text-center text-xs font-semibold uppercase tracking-eyebrow text-foreground hover:border-primary"
              >
                Take the Movemental AI Assessment
              </Link>
              <Link
                href="/contact"
                className="btn-pill btn-pill--ghost inline-flex items-center justify-center border border-border px-8 py-4 text-center text-xs font-semibold uppercase tracking-eyebrow text-foreground hover:border-primary"
              >
                Start a conversation
              </Link>
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
              One note per month on formation, infrastructure, and what we are learning.
            </p>
            <div className="relative mt-6">
              <NewsletterForm source="pricing-invitation" />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
