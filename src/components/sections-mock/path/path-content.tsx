/**
 * Movemental AI Path — the structured, scannable explanation of the
 * four-stage system (Safety → Sandbox → Skills → Solutions).
 *
 * Sister surface to /field-guide (long-form, literary). This page is the
 * canonical structured explanation: tension → overview → deep dives → order
 * → engagement bridge → final CTA. Recipe classes from src/app/recipes.css
 * carry the visual language; this file owns content, typed data, and a few
 * small local components for page-specific rhythm.
 */

import type { ReactNode } from "react";

import { BtnPill, SectionHead } from "@/components/sections-mock/primitives";

export function PathContent() {
  return (
    <>
      <Hero />
      <CoreTensionFold />
      <OverviewFold />
      <SafetyDeepDive />
      <SandboxDeepDive />
      <SkillsDeepDive />
      <SolutionsDeepDive />
      <OrderMattersFold />
      <EngagementFold />
      <FinalCta />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Shared types                                                              */
/* -------------------------------------------------------------------------- */

interface ComparisonColumn {
  label: string;
  title: string;
  body?: string;
  bullets: readonly string[];
}

interface SubSection {
  title: string;
  bullets: readonly string[];
}

interface PathOverviewStep {
  number: number;
  title: string;
  description: string;
}

/* -------------------------------------------------------------------------- */
/*  Section 1 — Hero                                                          */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section
      className="band-midnight hero hero--fold hero--path"
      aria-labelledby="path-hero-h1"
    >
      <div className="container">
        <p className="eyebrow">The Movemental AI Path</p>
        <h1 className="display" id="path-hero-h1">
          A clear path for leading your organization{" "}
          <em>through AI.</em>
        </h1>
        <p className="lede lede--regular">
          Most organizations either rush into AI or avoid it. Movemental
          provides a wiser way — an ordered path that builds safety, develops
          real capability, and leads to solutions your organization can trust.
        </p>
        <div className="hero-actions">
          <BtnPill href="/start-with-safety" variant="primary">
            Start with Safety
          </BtnPill>
          <BtnPill href="#stage-safety" variant="ghost">
            See the First Step
          </BtnPill>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 2 — Core Tension                                                  */
/* -------------------------------------------------------------------------- */

const TENSION_COLUMNS: readonly ComparisonColumn[] = [
  {
    label: "Trap one",
    title: "Rush Ahead",
    body: "Adopt tools quickly without shared standards, clear boundaries, or leadership alignment.",
    bullets: [
      "Tools multiply without coordination",
      "Staff develop inconsistent habits",
      "Risk and confusion increase over time",
    ],
  },
  {
    label: "Trap two",
    title: "Stand Still",
    body: "Delay engagement with AI due to uncertainty, risk, or lack of clarity.",
    bullets: [
      "Staff experiment anyway, without guidance",
      "Opportunities are missed",
      "Leadership loses visibility",
    ],
  },
];

function CoreTensionFold() {
  return (
    <section
      className="band-default"
      id="tension"
      aria-labelledby="path-tension-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="The problem"
          display={
            <>
              Most organizations fall into <em>one of two traps.</em>
            </>
          }
          displayId="path-tension-h2"
        />

        <div
          className="problem-grid"
          aria-label="The two default postures organizations fall into"
        >
          {TENSION_COLUMNS.map((col) => (
            <article key={col.title} className="problem-card">
              <p className="problem-card__label">{col.label}</p>
              <h3>{col.title}</h3>
              {col.body ? <p>{col.body}</p> : null}
              <ul className="path-step__list" style={{ marginTop: "0.4rem" }}>
                {col.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p
          className="matters-section__closing"
          style={{ marginTop: "2rem" }}
        >
          Neither approach leads to responsible, sustainable adoption.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 3 — Full Path Overview                                            */
/* -------------------------------------------------------------------------- */

const OVERVIEW_STEPS: readonly PathOverviewStep[] = [
  {
    number: 1,
    title: "Safety",
    description: "Clear boundaries and shared expectations.",
  },
  {
    number: 2,
    title: "Sandbox",
    description: "Guided exploration inside trusted limits.",
  },
  {
    number: 3,
    title: "Skills",
    description: "Practical capability across your team.",
  },
  {
    number: 4,
    title: "Solutions",
    description: "Tools and workflows built on a human foundation.",
  },
];

function OverviewFold() {
  return (
    <section
      className="band-section path-section"
      id="overview"
      aria-labelledby="path-overview-h2"
    >
      <div className="container path-section__inner">
        <header className="path-section__header">
          <p className="section-eyebrow">The model</p>
          <h2 className="path-section__title" id="path-overview-h2">
            There is a better sequence.
          </h2>
          <p className="path-section__intro">
            Movemental organizes AI adoption into four stages. Each builds on
            the one before it.
          </p>
        </header>

        <ol className="path-steps" aria-label="The four stages of the path">
          {OVERVIEW_STEPS.map((step) => (
            <li key={step.title} className="path-step">
              <div className="path-step__number" aria-hidden="true">
                {step.number}
              </div>
              <h3 className="path-step__title">{step.title}</h3>
              <p className="path-step__body">{step.description}</p>
            </li>
          ))}
        </ol>

        <p
          className="matters-section__closing"
          style={{ marginTop: "1.5rem", textAlign: "left", maxWidth: "52ch" }}
        >
          Most organizations start at Solutions. Movemental starts at Safety.
        </p>

        <div className="path-section__cta">
          <BtnPill href="/start-with-safety" variant="primary">
            Start with Safety
          </BtnPill>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sections 4–7 — Deep dives                                                 */
/* -------------------------------------------------------------------------- */

interface StepDetailProps {
  band: "default" | "section";
  anchorId: string;
  headingId: string;
  stepNumber: number;
  eyebrow: string;
  title: ReactNode;
  body: string;
  subsections: readonly SubSection[];
  cta?: { href: string; label: string };
}

function StepDetailSection({
  band,
  anchorId,
  headingId,
  stepNumber,
  eyebrow,
  title,
  body,
  subsections,
  cta,
}: StepDetailProps) {
  return (
    <section
      className={`band-${band}`}
      id={anchorId}
      aria-labelledby={headingId}
    >
      <div className="container">
        <header
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "1.25rem",
            maxWidth: "min(46rem, 100%)",
            marginBottom: "clamp(2rem, 4vw, 2.75rem)",
          }}
        >
          <div className="path-step__number" aria-hidden="true">
            {stepNumber}
          </div>
          <div style={{ flex: 1 }}>
            <p className="section-eyebrow">{eyebrow}</p>
            <h2 className="path-section__title" id={headingId}>
              {title}
            </h2>
            <p
              className="path-section__intro"
              style={{ marginTop: "0.75rem" }}
            >
              {body}
            </p>
          </div>
        </header>

        <div className="difference-section__grid">
          {subsections.map((sub) => (
            <article key={sub.title} className="difference-block">
              <h3 className="difference-block__title">{sub.title}</h3>
              <ul
                className="path-step__list"
                style={{ marginTop: "0.6rem" }}
              >
                {sub.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {cta ? (
          <div className="path-section__cta" style={{ marginTop: "2rem" }}>
            <BtnPill href={cta.href} variant="primary">
              {cta.label}
            </BtnPill>
          </div>
        ) : null}
      </div>
    </section>
  );
}

const SAFETY_SUBSECTIONS: readonly SubSection[] = [
  {
    title: "Why it comes first",
    bullets: [
      "Prevents fragmented, hidden adoption",
      "Protects sensitive information and trust",
      "Gives leaders shared language and visibility",
    ],
  },
  {
    title: "If you skip this step",
    bullets: [
      "Staff create habits before standards exist",
      "Risk surfaces after damage is done",
      "Leadership becomes reactive instead of proactive",
    ],
  },
];

function SafetyDeepDive() {
  return (
    <StepDetailSection
      band="default"
      anchorId="stage-safety"
      headingId="stage-safety-h2"
      stepNumber={1}
      eyebrow="Step 1"
      title={<>Safety — establish the foundation first.</>}
      body="Before adoption spreads, leaders need clarity. Safety defines what responsible AI use looks like across your organization."
      subsections={SAFETY_SUBSECTIONS}
      cta={{ href: "/start-with-safety", label: "Start with Safety" }}
    />
  );
}

const SANDBOX_SUBSECTIONS: readonly SubSection[] = [
  {
    title: "What this looks like",
    bullets: [
      "Controlled use cases",
      "Leadership-guided experimentation",
      "Clear feedback loops",
    ],
  },
  {
    title: "Why it matters",
    bullets: [
      "Prevents tool sprawl",
      "Builds confidence gradually",
      "Keeps learning aligned across teams",
    ],
  },
];

function SandboxDeepDive() {
  return (
    <StepDetailSection
      band="section"
      anchorId="stage-sandbox"
      headingId="stage-sandbox-h2"
      stepNumber={2}
      eyebrow="Step 2"
      title={<>Sandbox — explore without chaos.</>}
      body="Once boundaries are clear, your organization can begin to experiment. Sandbox creates a safe environment for learning without fragmentation."
      subsections={SANDBOX_SUBSECTIONS}
    />
  );
}

const SKILLS_SUBSECTIONS: readonly SubSection[] = [
  {
    title: "What this includes",
    bullets: [
      "Staff training",
      "Shared language and standards",
      "Role-specific use cases",
    ],
  },
  {
    title: "Outcome",
    bullets: [
      "AI becomes a capability, not a novelty",
      "Teams operate with consistency",
      "Leaders can scale usage responsibly",
    ],
  },
];

function SkillsDeepDive() {
  return (
    <StepDetailSection
      band="default"
      anchorId="stage-skills"
      headingId="stage-skills-h2"
      stepNumber={3}
      eyebrow="Step 3"
      title={<>Skills — build real capability.</>}
      body="AI becomes valuable when teams know how to use it responsibly and consistently. Skills turns experimentation into disciplined practice."
      subsections={SKILLS_SUBSECTIONS}
    />
  );
}

const SOLUTIONS_SUBSECTIONS: readonly SubSection[] = [
  {
    title: "What this includes",
    bullets: [
      "Custom AI assistants",
      "Workflow integration",
      "Organization-specific tools",
    ],
  },
  {
    title: "Why this order matters",
    bullets: [
      "Tools reflect your organization’s values",
      "Systems support people instead of replacing them",
      "Adoption scales without breaking trust",
    ],
  },
];

function SolutionsDeepDive() {
  return (
    <StepDetailSection
      band="section"
      anchorId="stage-solutions"
      headingId="stage-solutions-h2"
      stepNumber={4}
      eyebrow="Step 4"
      title={<>Solutions — build on a human foundation.</>}
      body="Only after safety, exploration, and skills are in place should organizations build systems and tools."
      subsections={SOLUTIONS_SUBSECTIONS}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 8 — Why Order Matters                                             */
/* -------------------------------------------------------------------------- */

const ORDER_COLUMNS: readonly ComparisonColumn[] = [
  {
    label: "Out of order",
    title: "Adoption that fragments the organization.",
    bullets: [
      "Solutions without skills",
      "Skills without boundaries",
      "Experimentation without clarity",
    ],
  },
  {
    label: "In order",
    title: "Adoption that strengthens the organization.",
    bullets: [
      "Clear boundaries first",
      "Guided exploration next",
      "Capability before systems",
      "Systems built on trust",
    ],
  },
];

function OrderMattersFold() {
  return (
    <section
      className="band-default"
      id="order"
      aria-labelledby="path-order-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="Sequence matters"
          display={
            <>
              The order is <em>not optional.</em>
            </>
          }
          displayId="path-order-h2"
          lede="Each stage depends on the one before it. When organizations skip ahead, they create more problems than they solve."
        />

        <div
          className="problem-grid"
          aria-label="What happens when the order is broken vs kept"
        >
          {ORDER_COLUMNS.map((col) => (
            <article key={col.label} className="problem-card">
              <p className="problem-card__label">{col.label}</p>
              <h3>{col.title}</h3>
              <ul className="path-step__list" style={{ marginTop: "0.4rem" }}>
                {col.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p
          className="matters-section__closing"
          style={{ marginTop: "2rem" }}
        >
          The difference is not speed. It is whether adoption strengthens or
          fragments your organization.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 9 — How This Becomes Real (light engagement bridge)               */
/* -------------------------------------------------------------------------- */

const ENGAGEMENT_BULLETS: readonly string[] = [
  "Leadership alignment sessions",
  "Safety framework development",
  "Guided sandbox environments",
  "Skills training",
  "Solution design and integration",
];

function EngagementFold() {
  return (
    <section
      className="band-section"
      id="engagement"
      aria-labelledby="path-engagement-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="How it works in practice"
          display={
            <>
              This path becomes real through{" "}
              <em>guided implementation.</em>
            </>
          }
          displayId="path-engagement-h2"
          lede="Movemental helps organizations move through each stage with clarity and support. This includes leadership sessions, team training, and practical implementation work."
        />

        <ul
          className="path-step__list"
          style={{
            marginTop: "1.5rem",
            maxWidth: "42rem",
            paddingLeft: 0,
          }}
          aria-label="What guided implementation includes"
        >
          {ENGAGEMENT_BULLETS.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>

        <div className="path-section__cta" style={{ marginTop: "2rem" }}>
          <BtnPill href="/contact" variant="primary">
            Talk With Us
          </BtnPill>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 10 — Final CTA                                                    */
/* -------------------------------------------------------------------------- */

function FinalCta() {
  return (
    <section
      className="band-midnight final-cta"
      id="cta"
      aria-labelledby="path-final-cta-h2"
    >
      <div className="container final-cta__inner">
        <h2 className="display" id="path-final-cta-h2">
          You do not need to master AI.
          <br />
          You need a clear path for <em>leading through it.</em>
        </h2>
        <p className="lede lede--regular">
          Start where every responsible organization should — by establishing
          safety.
        </p>
        <div className="hero-actions final-cta__actions">
          <BtnPill href="/start-with-safety" variant="primary">
            Start with Safety
          </BtnPill>
          <BtnPill href="/contact" variant="ghost">
            Talk With Us
          </BtnPill>
        </div>
      </div>
    </section>
  );
}
