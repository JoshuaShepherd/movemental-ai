/**
 * Safety Self-Assessment — the public, narrower Safety-readiness check.
 *
 * Distinct from /assess (the broader path-integrity diagnostic, 45 min,
 * human-reviewed read-back). This page produces an automated client-side
 * read-back from seven foundational Safety questions. Built per Prompt 07
 * Option B (transform /start-with-safety from a third Safety overview into
 * the public Safety Self-Assessment).
 */

import { Compass, Eye, Lock, MessageSquare, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

import { BtnPill, SectionHead } from "@/components/sections-mock/primitives";

import { SafetySelfAssessment } from "./safety-self-assessment";

export function StartWithSafetyContent() {
  return (
    <>
      <Hero />
      <MeasuresFold />
      <AssessmentFold />
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
        <p className="eyebrow">Safety Self-Assessment</p>
        <h1 className="display" id="safety-hero-h1">
          Where is your organization
          <br />
          <em>actually starting with AI?</em>
        </h1>
        <p className="lede lede--regular">
          Seven questions. Ten minutes. A read-back written to your situation —
          not a score, not a benchmark, no email required. The read-back tells
          you whether Volume One is enough or whether SafeStart facilitation
          would accelerate the work.
        </p>
        <div className="hero-actions">
          <BtnPill href="#assessment" variant="primary">
            Take the assessment
          </BtnPill>
          <BtnPill href="/field-guides/safety" variant="ghost">
            Read Volume One first
          </BtnPill>
        </div>
        <div className="hero-proof">
          <span className="hero-proof__label">Narrow check — Safety stage only</span>
          <span>
            For the full path-integrity diagnostic across all four stages,
            see <a href="/assess">/assess</a>.
          </span>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 2 — What the assessment measures (5 areas)                        */
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
    body: "How will AI support communication without flattening the organization's voice or simulating human care?",
    icon: <MessageSquare strokeWidth={1.5} />,
  },
  {
    title: "Ethical and Theological Guardrails",
    body: "What values, convictions, and responsibilities should govern AI use in your context?",
    icon: <Compass strokeWidth={1.5} />,
  },
];

function MeasuresFold() {
  return (
    <section
      className="band-section build-section"
      id="measures"
      aria-labelledby="safety-measures-h2"
    >
      <div className="container build-section__inner">
        <header className="build-section__header">
          <p className="section-eyebrow">What this assessment measures</p>
          <h2 className="build-section__title" id="safety-measures-h2">
            Five areas every organization should clarify first.
          </h2>
          <p className="build-section__intro">
            The seven questions on the next page test whether your senior team
            can answer the foundational questions across five areas. Each is an
            alternate articulation of the five Field Guide layers — Statement,
            Policy, Context, Rules, and Response Plans.
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
/*  Section 3 — The assessment (interactive)                                  */
/* -------------------------------------------------------------------------- */

function AssessmentFold() {
  return (
    <section
      className="band-default"
      id="assessment"
      aria-labelledby="safety-assessment-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="The assessment"
          display={
            <>
              How safe is your <em>current AI usage?</em>
            </>
          }
          displayId="safety-assessment-h2"
          lede="Answer honestly. Each question has four choices. The read-back at the end will tell you what is foundational, what is refinement, and what next step fits your situation."
        />
        <SafetySelfAssessment />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 4 — What the full Safety step produces (6 output cards)           */
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
          <p className="section-eyebrow">What the full Safety step produces</p>
          <h2 className="matters-section__title" id="safety-outputs-h2">
            The assessment is the start. Safety produces the artifacts.
          </h2>
          <p className="matters-section__intro">
            The read-back tells you whether the work is foundational or
            refinement. The work itself — done either on your own with Volume
            One or facilitated through SafeStart — produces these six artifacts
            your board, staff, and team can actually use.
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
/*  Section 5 — Mini Path (Safety → Sandbox → Skills → Solutions)             */
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
          <BtnPill href="/field-guides/safety" variant="ghost">
            Read Volume One
          </BtnPill>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 6 — Final CTA                                                     */
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
          The assessment is the first honest conversation about{" "}
          <em>where AI already lives in your organization.</em>
        </h2>
        <p className="lede lede--regular">
          Take the seven questions to your senior team and run them together.
          Then read the volume, draft the artifacts, and decide whether you
          need facilitation. The path begins here.
        </p>
        <div className="hero-actions final-cta__actions">
          <BtnPill href="#assessment" variant="primary">
            Take the assessment
          </BtnPill>
          <BtnPill href="/contact?interest=safestart" variant="ghost">
            Talk about SafeStart
          </BtnPill>
        </div>
      </div>
    </section>
  );
}
