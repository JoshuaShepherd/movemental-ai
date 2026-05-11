/**
 * Start with Safety — first step of the Movemental Path.
 *
 * Composition mirrors the home page chain: midnight hero → reframe →
 * foundation cards → diagnostic → outputs → mini path → midnight final CTA.
 * Recipe classes from src/app/recipes.css carry the visual language; this
 * file owns content, typed data, and a few small local components for the
 * page-specific surfaces (comparison columns, diagnostic checklist).
 */

import { Check, Compass, Eye, Lock, MessageSquare, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

import { BtnPill, SectionHead } from "@/components/sections-mock/primitives";

export function StartWithSafetyContent() {
  return (
    <>
      <Hero />
      <ReframeFold />
      <FoundationFold />
      <DiagnosticFold />
      <OutputsFold />
      <PathFold />
      <FinalCta />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 1 — Hero                                                          */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section
      className="band-midnight hero hero--fold"
      aria-labelledby="safety-hero-h1"
    >
      <div className="container">
        <p className="eyebrow">Start with Safety</p>
        <h1 className="display" id="safety-hero-h1">
          Before your organization adopts more AI,
          <br />
          <em>establish the ground rules.</em>
        </h1>
        <p className="lede lede--regular">
          AI is already being used inside your organization. Safety gives
          leaders a shared way to protect people, clarify boundaries, and move{" "}
          forward without panic.
        </p>
        <div className="hero-actions">
          <BtnPill href="/contact" variant="primary">
            Begin the Safety Step
          </BtnPill>
          <BtnPill href="#foundation" variant="ghost">
            See What Safety Includes
          </BtnPill>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 2 — Safety Reframe (two-column comparison)                        */
/* -------------------------------------------------------------------------- */

interface ComparisonColumn {
  label: string;
  title: string;
  bullets: readonly string[];
}

const COMPARISON_COLUMNS: readonly ComparisonColumn[] = [
  {
    label: "Without Safety",
    title: "Adoption happens in private, in fragments.",
    bullets: [
      "Staff use tools quietly and inconsistently",
      "Sensitive information may enter the wrong systems",
      "Leaders react after problems surface",
      "Teams develop habits before standards exist",
    ],
  },
  {
    label: "With Safety",
    title: "Adoption happens in the open, in agreement.",
    bullets: [
      "Everyone understands the boundaries",
      "Risk is named before adoption accelerates",
      "Leaders have visibility and shared language",
      "Experimentation happens inside trusted limits",
    ],
  },
];

function ReframeFold() {
  return (
    <section
      className="band-default"
      id="reframe"
      aria-labelledby="safety-reframe-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="Safety is not stalling"
          display={
            <>
              Safety is what makes <em>wise adoption possible.</em>
            </>
          }
          displayId="safety-reframe-h2"
          lede="Many leaders hear “AI safety” and imagine delay, restriction, or bureaucracy. Movemental means something different. Safety is the shared foundation that lets your team experiment with confidence because the boundaries are clear."
        />

        <p
          className="prose"
          style={{ marginTop: "1.5rem", marginBottom: "2.25rem" }}
        >
          Without safety, AI adoption becomes private, inconsistent, and
          reactive. With safety, leaders can name what is allowed, what is
          off-limits, who is responsible, and how the organization will learn
          together.
        </p>

        <div
          className="problem-grid"
          aria-label="The shift safety creates inside an organization"
        >
          {COMPARISON_COLUMNS.map((col) => (
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
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 3 — What Safety Includes (5 foundation cards)                     */
/* -------------------------------------------------------------------------- */

interface SafetyArea {
  title: string;
  body: string;
  icon: ReactNode;
}

const SAFETY_AREAS: readonly SafetyArea[] = [
  {
    title: "Acceptable Use",
    body: "Where can AI be used responsibly, and where should human judgment remain primary?",
    icon: <ShieldCheck strokeWidth={1.5} />,
  },
  {
    title: "Data Boundaries",
    body: "What information should never be pasted, uploaded, summarized, or stored in an AI system?",
    icon: <Lock strokeWidth={1.5} />,
  },
  {
    title: "Human Oversight",
    body: "Who reviews AI-assisted work before it reaches donors, members, students, clients, or the public?",
    icon: <Eye strokeWidth={1.5} />,
  },
  {
    title: "Voice and Trust",
    body: "How will AI support communication without flattening the organization’s voice or simulating human care?",
    icon: <MessageSquare strokeWidth={1.5} />,
  },
  {
    title: "Ethical and Theological Guardrails",
    body: "What values, convictions, and responsibilities should govern AI use in your context?",
    icon: <Compass strokeWidth={1.5} />,
  },
];

function FoundationFold() {
  return (
    <section
      className="band-section build-section"
      id="foundation"
      aria-labelledby="safety-foundation-h2"
    >
      <div className="container build-section__inner">
        <header className="build-section__header">
          <p className="section-eyebrow">The safety foundation</p>
          <h2 className="build-section__title" id="safety-foundation-h2">
            Five areas every organization should clarify first.
          </h2>
          <p className="build-section__intro">
            Before building AI workflows or custom tools, your organization
            needs a shared safety foundation. These are the first questions
            Movemental helps leaders answer.
          </p>
        </header>

        <div className="build-section__grid">
          {SAFETY_AREAS.map((area) => (
            <article key={area.title} className="build-item">
              <span className="build-item__icon" aria-hidden="true">
                {area.icon}
              </span>
              <h3 className="build-item__title">{area.title}</h3>
              <p className="build-item__body">{area.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 4 — Safety Diagnostic (static checklist)                          */
/* -------------------------------------------------------------------------- */

const DIAGNOSTIC_QUESTIONS: readonly string[] = [
  "Do you know which AI tools your staff are already using?",
  "Do you have written guidance for acceptable and unacceptable use?",
  "Have you defined what information should never enter AI tools?",
  "Do leaders agree on when human review is required?",
  "Do staff know how to handle confidential, pastoral, donor, student, or client information?",
  "Do you have a process for reviewing new AI use cases?",
  "Can your team explain why your AI boundaries exist?",
];

function DiagnosticFold() {
  return (
    <section
      className="band-default"
      id="diagnostic"
      aria-labelledby="safety-diagnostic-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="Quick diagnostic"
          display={
            <>
              How safe is your <em>current AI usage?</em>
            </>
          }
          displayId="safety-diagnostic-h2"
          lede="You do not need a perfect strategy to begin. Start by asking whether your organization can answer the basic questions."
        />

        <ul
          className="mt-10 grid gap-3 max-w-[42rem] list-none p-0"
          aria-label="Self-assessment checklist"
        >
          {DIAGNOSTIC_QUESTIONS.map((q) => (
            <ChecklistItem key={q}>{q}</ChecklistItem>
          ))}
        </ul>

        <p
          className="prose"
          style={{ marginTop: "1.75rem", maxWidth: "42rem" }}
        >
          If several of these questions are unclear, safety is the right place
          to begin.
        </p>
      </div>
    </section>
  );
}

interface ChecklistItemProps {
  children: ReactNode;
}

function ChecklistItem({ children }: ChecklistItemProps) {
  return (
    <li className="flex gap-3 items-start py-3 px-4 rounded-lg bg-card border border-border/70">
      <span
        className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary mt-0.5"
        aria-hidden="true"
      >
        <Check size={14} strokeWidth={2.5} />
      </span>
      <span className="text-foreground text-[0.95rem] leading-snug">
        {children}
      </span>
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 5 — What You Get (6 output cards)                                 */
/* -------------------------------------------------------------------------- */

interface SafetyOutput {
  title: string;
  body: string;
}

const SAFETY_OUTPUTS: readonly SafetyOutput[] = [
  {
    title: "AI Use Guidelines",
    body: "Clear language for what is allowed, discouraged, and prohibited.",
  },
  {
    title: "Data Boundary Map",
    body: "A practical guide to what information can and cannot enter AI tools.",
  },
  {
    title: "Leadership Alignment",
    body: "Shared expectations across senior leaders, staff, and key decision-makers.",
  },
  {
    title: "Risk Register",
    body: "A simple way to name, track, and revisit AI-related risks.",
  },
  {
    title: "Review Standards",
    body: "Guidance for when AI-assisted work requires human review before use.",
  },
  {
    title: "Next-Step Roadmap",
    body: "A clear recommendation for whether your organization is ready for Sandbox, Skills, or further Safety work.",
  },
];

function OutputsFold() {
  return (
    <section
      className="band-section matters-section"
      id="outputs"
      aria-labelledby="safety-outputs-h2"
    >
      <div className="container">
        <header className="matters-section__header">
          <p className="section-eyebrow">What this step produces</p>
          <h2 className="matters-section__title" id="safety-outputs-h2">
            Safety turns anxiety into shared clarity.
          </h2>
          <p className="matters-section__intro">
            The Safety step gives your organization practical decisions and
            leadership alignment before adoption accelerates.
          </p>
        </header>

        <div className="matters-section__grid">
          {SAFETY_OUTPUTS.map((output) => (
            <article key={output.title} className="matters-block">
              <h3 className="matters-block__title">{output.title}</h3>
              <p className="matters-block__body">{output.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 6 — Mini Path (Safety → Sandbox → Skills → Solutions)             */
/* -------------------------------------------------------------------------- */

interface PathStep {
  number: number;
  title: string;
  body: string;
}

const PATH_STEPS: readonly PathStep[] = [
  {
    number: 1,
    title: "Safety",
    body: "Clear boundaries and shared expectations.",
  },
  {
    number: 2,
    title: "Sandbox",
    body: "Guided experimentation inside trusted limits.",
  },
  {
    number: 3,
    title: "Skills",
    body: "Practical capability and judgment formation.",
  },
  {
    number: 4,
    title: "Solutions",
    body: "Tools and workflows built on a human foundation.",
  },
];

function PathFold() {
  return (
    <section
      className="band-default path-section"
      id="path"
      aria-labelledby="safety-path-h2"
    >
      <div className="container path-section__inner">
        <header className="path-section__header">
          <p className="section-eyebrow">Safety first — but not the end</p>
          <h2 className="path-section__title" id="safety-path-h2">
            Safety is the foundation for everything that follows.
          </h2>
          <p className="path-section__intro">
            Movemental does not stop at policy. Safety prepares your
            organization for a healthier path: Sandbox, Skills, and
            Solutions. Once boundaries are clear, your team can explore real
            use cases, build practical capability, and create tools that serve
            your mission instead of reshaping it.
          </p>
        </header>

        <ol className="path-steps" aria-label="The Movemental Path">
          {PATH_STEPS.map((step) => (
            <li key={step.title} className="path-step">
              <div className="path-step__number" aria-hidden="true">
                {step.number}
              </div>
              <h3 className="path-step__title">{step.title}</h3>
              <p className="path-step__body">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="path-section__cta">
          <BtnPill href="/field-guide" variant="ghost">
            See the full path
          </BtnPill>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 7 — Final CTA                                                     */
/* -------------------------------------------------------------------------- */

function FinalCta() {
  return (
    <section
      className="band-midnight final-cta"
      id="cta"
      aria-labelledby="safety-final-cta-h2"
    >
      <div className="container final-cta__inner">
        <h2 className="display" id="safety-final-cta-h2">
          Start with the step that <em>makes every other step safer.</em>
        </h2>
        <p className="lede lede--regular">
          Before you rush into tools or wait until confusion grows, establish
          the foundation your organization can trust.
        </p>
        <div className="hero-actions final-cta__actions">
          <BtnPill href="/contact" variant="primary">
            Begin the Safety Step
          </BtnPill>
          <BtnPill href="/contact" variant="ghost">
            Talk With Us
          </BtnPill>
        </div>
      </div>
    </section>
  );
}
