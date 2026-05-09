import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, BookOpen, Check, Circle, MessageSquare } from "lucide-react";

import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Container, Reveal, Section } from "@/components/primitives";
import { cn } from "@/lib/utils";

type StageCard = {
  stageEyebrow: string;
  title: string;
  price: ReactNode;
  intro: string;
  deliverables: readonly string[];
  payment: string;
  ctaLabel: string;
  ctaHref: string;
};

const STAGES: readonly StageCard[] = [
  {
    stageEyebrow: "Stage 01",
    title: "Safety Documentation",
    price: "$1,000",
    intro: "Two weeks of facilitated work. Free toolkit available.",
    deliverables: [
      "Acceptable Use Statement",
      "Care Boundaries",
      "Disclosure Standards",
      "Vendor and Tool Inventory",
      "Data Handling Protocol",
      "Incident Response Plan",
      "Named Refusals",
    ],
    payment: "Payment: Net 15 from signing",
    ctaLabel: "Begin Safety",
    ctaHref: "/pathway/safety",
  },
  {
    stageEyebrow: "Stage 02",
    title: "Sandbox Discovery",
    price: "$15,000",
    intro: "Four weeks of disciplined exploration. Real recipes against real work.",
    deliverables: [
      "Use Case Portfolio with green/yellow/red adjudication",
      "Discernment Memo",
      "Readiness Assessment",
      "Module-based facilitation",
    ],
    payment: "Payment: 50% signing / 50% completion",
    ctaLabel: "Begin a Sandbox",
    ctaHref: "/pathway/sandbox",
  },
  {
    stageEyebrow: "Stage 03",
    title: "Skills Development",
    price: "$15,000",
    intro: "Cohort facilitation. $5,000/year self-paced LMS license also available.",
    deliverables: [
      "8 modules / 8 weeks",
      "Cohort of 8-15",
      "Formational deepening",
      "Self-paced LMS license",
    ],
    payment: "Payment: 50/50 cohort; Annual LMS",
    ctaLabel: "Begin a Skills cohort",
    ctaHref: "/pathway/skills",
  },
  {
    stageEyebrow: "Stage 04",
    title: "Solutions Deployment",
    price: (
      <>
        <span className="font-sans text-xl not-italic font-medium text-muted-foreground">from </span>
        $30,000
      </>
    ),
    intro: "Scoped per conversation. Configurations vary by situation.",
    deliverables: [
      "Configured deployment",
      "Governance integration document",
      "90 days support",
      "Ongoing relationship structure",
    ],
    payment: "Payment: 30/30/40 milestones",
    ctaLabel: "Begin Solutions",
    ctaHref: "/pathway/solutions",
  },
];

const BUNDLE = {
  eyebrow: "Comprehensive",
  title: "The Path Bundle",
  price: "$50,000",
  intro: "Safety + Sandbox + Skills + foundational Solutions integration.",
  details: [
    "Everything in Stages 01-04 integrated",
    "18% below cost of tier-by-tier",
    "Foundational Solutions delivery",
  ] as const,
  payment: "Payment: 25% at each stage start",
  ctaLabel: "Begin the full path",
  ctaHref: "/contact?interest=bundle",
};

const INSTITUTIONAL = [
  { title: "Sandbox/Skills Institution-wide", meta: "from $60k" },
  { title: "Dedicated Institutional Tenant", meta: "Scoped integration" },
  { title: "Train-the-Facilitator", meta: "Capacity building" },
  { title: "Hybrid/Bespoke", meta: "Per requirements" },
] as const;

function StageOfferingCard({
  offering,
  columnIndex,
}: {
  offering: StageCard;
  columnIndex: number;
}) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-8",
        columnIndex > 0 && "lg:border-l lg:border-border/50 lg:pl-8",
      )}
    >
      <div>
        <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
          {offering.stageEyebrow}
        </p>
        <h3 className="font-serif text-2xl font-medium text-foreground">{offering.title}</h3>
      </div>
      <div className="font-serif text-4xl italic leading-tight text-primary">{offering.price}</div>
      <p className="border-b border-border/50 pb-6 text-sm leading-relaxed text-muted-foreground">{offering.intro}</p>
      <div className="grow space-y-6">
        <p className="text-[0.65rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">Deliverables</p>
        <ul className="space-y-3 text-sm text-foreground">
          {offering.deliverables.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check className="mt-1 size-4 shrink-0 text-primary/50" aria-hidden strokeWidth={2} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4 border-t border-border/50 pt-6">
        <p className="text-[0.65rem] text-muted-foreground">{offering.payment}</p>
        <Link
          href={offering.ctaHref}
          className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-eyebrow text-primary transition-colors hover:text-primary-dim"
        >
          {offering.ctaLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
}

function BundleOfferingCard() {
  return (
    <div className="flex flex-col space-y-8 bg-section p-6 lg:border-l-2 lg:border-primary lg:bg-transparent lg:px-0 lg:pl-8">
      <div>
        <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-eyebrow text-primary">{BUNDLE.eyebrow}</p>
        <h3 className="font-serif text-2xl font-medium text-foreground">{BUNDLE.title}</h3>
      </div>
      <div className="font-serif text-4xl italic leading-tight text-primary">{BUNDLE.price}</div>
      <p className="border-b border-border/50 pb-6 text-sm leading-relaxed text-muted-foreground lg:border-primary/20">
        {BUNDLE.intro}
      </p>
      <div className="grow space-y-6">
        <p className="text-[0.65rem] font-semibold uppercase tracking-eyebrow text-muted-foreground lg:text-primary">
          Details
        </p>
        <ul className="space-y-3 text-sm text-foreground">
          {BUNDLE.details.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Circle className="mt-1 size-4 shrink-0 fill-primary text-primary" aria-hidden strokeWidth={1.5} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4 border-t border-border/50 pt-6 lg:border-primary/20">
        <p className="text-[0.65rem] text-muted-foreground">{BUNDLE.payment}</p>
        <Link
          href={BUNDLE.ctaHref}
          className="inline-flex w-full items-center justify-center gap-2 bg-primary px-4 py-3 text-xs font-semibold uppercase tracking-eyebrow text-primary-foreground transition-colors hover:bg-primary-dim"
        >
          {BUNDLE.ctaLabel}
        </Link>
      </div>
    </div>
  );
}

export function PricingPageContent() {
  return (
    <>
      <Section variant="midnight" spacing="lg" className="scroll-mt-(--site-chrome-total) border-b border-inverse-border/10 pt-8 md:pt-10">
        <Container width="default" className="max-w-4xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-inverse-muted">Pricing</p>
            <h1 className="mt-8 font-serif text-5xl font-medium leading-tight tracking-tight text-inverse-foreground md:text-6xl lg:text-7xl lg:leading-[1.05]">
              What it costs <br />
              <span className="italic">to walk the path.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-inverse-muted md:text-lg">
              Five prices for the four-stage path. Most organizations begin with Safety at $1,000 and decide what comes
              next from there. Larger institutional engagements are scoped per conversation.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section variant="default" spacing="lg" className="border-t border-border/20">
        <Container width="default" className="max-w-7xl space-y-24">
          <Reveal>
            <div className="max-w-3xl space-y-6">
              <p className="text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">The path</p>
              <h2 className="font-serif text-4xl font-medium tracking-tight text-foreground md:text-5xl">
                Five prices on the four-stage path.
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                Most organizations begin with Safety, continue to Sandbox, and decide what comes next from there. The
                bundle is for organizations ready to commit to the full path at the start.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="grid grid-cols-1 gap-8 border-t border-border pt-12 md:grid-cols-3 lg:grid-cols-5">
              {STAGES.map((offering, i) => (
                <StageOfferingCard key={offering.title} offering={offering} columnIndex={i} />
              ))}
              <BundleOfferingCard />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section variant="default" spacing="lg" className="relative border-t border-border/20">
        <div className="pointer-events-none absolute inset-y-0 left-[clamp(1.25rem,4vw,2.5rem)] hidden border-l border-border/20 md:block" aria-hidden />
        <Container width="default" className="max-w-5xl space-y-16 md:pl-16">
          <Reveal>
            <h2 className="max-w-2xl font-serif text-4xl font-medium text-foreground md:text-5xl">
              Larger engagements scoped per conversation.
            </h2>
            <div className="grid grid-cols-1 gap-px border border-border/20 bg-border/20 md:grid-cols-2">
              {INSTITUTIONAL.map((cell) => (
                <div
                  key={cell.title}
                  className="space-y-4 bg-background p-12 transition-colors hover:bg-section"
                >
                  <h4 className="font-serif text-2xl text-foreground">{cell.title}</h4>
                  <p className="text-sm text-muted-foreground">{cell.meta}</p>
                </div>
              ))}
            </div>
            <Link
              href="/contact?interest=institutional"
              className="inline-flex items-center gap-2 border border-border px-6 py-4 text-xs font-semibold uppercase tracking-eyebrow text-primary transition-colors hover:bg-section"
            >
              Discuss an institutional engagement
              <ArrowRight className="size-4" aria-hidden strokeWidth={2} />
            </Link>
          </Reveal>
        </Container>
      </Section>

      <Section variant="section" spacing="lg" className="border-t border-border/20">
        <Container width="default" className="max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <Reveal>
              <div className="space-y-4">
                <h5 className="text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">Payment Terms</h5>
                <p className="text-sm leading-relaxed text-foreground">
                  Detailed per stage. Standard net 15 on invoice unless otherwise structured in agreement.
                </p>
              </div>
            </Reveal>
            <Reveal delay={40}>
              <div className="space-y-4">
                <h5 className="text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">Discounting</h5>
                <p className="text-sm leading-relaxed text-foreground">
                  No standard discount. Scholarships available upon request and qualification.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="space-y-4">
                <h5 className="text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">Currency</h5>
                <p className="text-sm leading-relaxed text-foreground">
                  Base pricing in USD. International PPP (Purchasing Power Parity) adjustments available.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section variant="default" spacing="lg">
        <Container width="default" className="max-w-4xl text-center">
          <Reveal>
            <h2 className="font-serif text-4xl font-medium text-foreground">Where to begin</h2>
            <div className="mt-16 flex flex-col justify-center gap-8 md:flex-row md:flex-wrap">
              <Link
                href="/field-guide"
                className="group flex flex-col items-center gap-4 border border-border p-8 transition-colors hover:border-primary"
              >
                <BookOpen className="size-10 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden strokeWidth={1.25} />
                <span className="text-xs font-semibold uppercase tracking-eyebrow text-foreground">Read the field guide</span>
              </Link>
              <Link
                href="/assess"
                className="group flex flex-col items-center gap-4 border border-border p-8 transition-colors hover:border-primary"
              >
                <BarChart3 className="size-10 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden strokeWidth={1.25} />
                <span className="text-xs font-semibold uppercase tracking-eyebrow text-foreground">
                  Take the AI Assessment
                </span>
              </Link>
              <Link
                href="/contact"
                className="group flex flex-col items-center gap-4 border border-border bg-section p-8 transition-colors hover:bg-elevated"
              >
                <MessageSquare className="size-10 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden strokeWidth={1.25} />
                <span className="text-xs font-semibold uppercase tracking-eyebrow text-foreground">
                  Start a conversation
                </span>
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section variant="midnight" spacing="lg">
        <Container width="narrow" className="max-w-2xl text-center">
          <Reveal>
            <h3 className="font-serif text-3xl text-inverse-foreground">Occasional notes from the work.</h3>
            <div className="relative mt-8">
              <NewsletterForm source="pricing-band" appearance="inverseBand" />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
