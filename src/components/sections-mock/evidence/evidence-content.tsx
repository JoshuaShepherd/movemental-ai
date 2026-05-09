/**
 * Evidence — the proof page that is not a case-studies page.
 *
 * Sequence: hero (reframe) → problem is real → system is coherent →
 * work already happening → people behind it → building in public → final CTA.
 * Testimonials section is intentionally omitted — only include when real
 * quotes exist. Recipe classes from src/app/recipes.css carry the visual
 * language; this file owns content, typed data, and small local components.
 */

import { BtnPill, SectionHead } from "@/components/sections-mock/primitives";

export function EvidenceContent() {
  return (
    <>
      <Hero />
      <ProblemIsRealFold />
      <SystemIsCoherentFold />
      <PracticeSnapshotsFold />
      <PeopleBehindItFold />
      <BuildingInPublicFold />
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
      aria-labelledby="evidence-hero-h1"
    >
      <div className="container">
        <p className="eyebrow">Evidence</p>
        <h1 className="display" id="evidence-hero-h1">
          Proof looks different in a <em>new category.</em>
        </h1>
        <p className="lede lede--regular">
          Most AI work is measured in tools deployed or efficiency gained.
          Movemental is measured in something harder — whether organizations
          adopt AI without losing clarity, trust, or mission.
        </p>
        <div className="hero-actions">
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

/* -------------------------------------------------------------------------- */
/*  Section 2 — The Problem Is Real                                           */
/* -------------------------------------------------------------------------- */

interface ProblemBlock {
  label: string;
  title: string;
  body: string;
}

const PROBLEM_BLOCKS: readonly ProblemBlock[] = [
  {
    label: "Reality 01",
    title: "AI Saturation",
    body: "A growing percentage of content and communication is AI-generated, making real expertise harder to distinguish.",
  },
  {
    label: "Reality 02",
    title: "Credibility Breakdown",
    body: "Traditional signals of trust — volume, polish, consistency — no longer reliably indicate real knowledge or experience.",
  },
  {
    label: "Reality 03",
    title: "Organizational Fragmentation",
    body: "Tools and experiments spread across teams without coordination, preventing work from compounding.",
  },
  {
    label: "Reality 04",
    title: "Leadership Gap",
    body: "AI is often treated as a technical problem, when it is actually a leadership and formation challenge.",
  },
];

function ProblemIsRealFold() {
  return (
    <section
      className="band-default"
      id="reality"
      aria-labelledby="evidence-reality-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="The reality"
          display={
            <>
              This is <em>not a hypothetical problem.</em>
            </>
          }
          displayId="evidence-reality-h2"
          lede="AI adoption is already happening across organizations — often without structure, shared standards, or leadership clarity."
        />

        <div
          className="problem-grid problem-grid--4up"
          aria-label="The conditions evidence has to answer for"
        >
          {PROBLEM_BLOCKS.map((block) => (
            <article key={block.label} className="problem-card">
              <p className="problem-card__label">{block.label}</p>
              <h3>{block.title}</h3>
              <p>{block.body}</p>
            </article>
          ))}
        </div>

        <p
          className="matters-section__closing"
          style={{ marginTop: "2rem" }}
        >
          The question is no longer whether organizations will use AI. It is
          whether they will lead it well.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 3 — The System Is Coherent                                        */
/* -------------------------------------------------------------------------- */

interface PathStep {
  number: number;
  title: string;
  description: string;
}

const COMPACT_PATH: readonly PathStep[] = [
  {
    number: 1,
    title: "Safety",
    description: "Boundaries first.",
  },
  {
    number: 2,
    title: "Sandbox",
    description: "Guided exploration next.",
  },
  {
    number: 3,
    title: "Skills",
    description: "Capability before systems.",
  },
  {
    number: 4,
    title: "Solutions",
    description: "Systems built on trust.",
  },
];

interface OrderColumn {
  label: string;
  title: string;
  bullets: readonly string[];
}

const ORDER_COLUMNS: readonly OrderColumn[] = [
  {
    label: "Out of order",
    title: "Adoption that fragments.",
    bullets: [
      "Tools without training",
      "Training without boundaries",
      "Experimentation without clarity",
    ],
  },
  {
    label: "In order",
    title: "Adoption that holds.",
    bullets: [
      "Boundaries first",
      "Guided exploration next",
      "Capability before systems",
      "Systems built on trust",
    ],
  },
];

function SystemIsCoherentFold() {
  return (
    <section
      className="band-section path-section"
      id="system"
      aria-labelledby="evidence-system-h2"
    >
      <div className="container path-section__inner">
        <header className="path-section__header">
          <p className="section-eyebrow">The framework</p>
          <h2 className="path-section__title" id="evidence-system-h2">
            Clarity is evidence in a chaotic space.
          </h2>
          <p className="path-section__intro">
            In a landscape defined by rapid change and scattered
            experimentation, a clear and ordered approach is rare. Movemental
            organizes AI adoption into a sequence that leaders can actually
            follow.
          </p>
        </header>

        <ol className="path-steps" aria-label="The four-stage sequence">
          {COMPACT_PATH.map((step) => (
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
          style={{
            marginTop: "1.5rem",
            marginBottom: "2.25rem",
            textAlign: "left",
            maxWidth: "52ch",
          }}
        >
          Each stage builds on the one before it. When organizations skip
          ahead, they create more problems than they solve.
        </p>

        <div
          className="problem-grid"
          aria-label="What changes when the order is kept"
        >
          {ORDER_COLUMNS.map((col) => (
            <article key={col.label} className="problem-card">
              <p className="problem-card__label">{col.label}</p>
              <h3>{col.title}</h3>
              <ul
                className="path-step__list"
                style={{ marginTop: "0.4rem" }}
              >
                {col.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="path-section__cta" style={{ marginTop: "2rem" }}>
          <BtnPill href="/path" variant="ghost">
            See the full path
          </BtnPill>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 4 — The Work Is Already Happening                                 */
/* -------------------------------------------------------------------------- */

interface Snapshot {
  title: string;
  body: string;
}

const SNAPSHOTS: readonly Snapshot[] = [
  {
    title: "Clarifying Safety Before Expansion",
    body: "Leaders recognized that staff were already using AI tools in uncoordinated ways. Before adopting new systems, they focused on defining acceptable use, data boundaries, and leadership alignment — creating a foundation for responsible growth.",
  },
  {
    title: "Moving from Experimentation to Discipline",
    body: "Teams that had been experimenting individually began to develop shared language, training, and expectations. AI use shifted from scattered activity to a coordinated capability.",
  },
  {
    title: "Building Only After Clarity",
    body: "Instead of rushing into custom tools, organizations delayed solution-building until safety, experimentation, and skills were in place — resulting in systems that actually fit their mission and people.",
  },
];

function PracticeSnapshotsFold() {
  return (
    <section
      className="band-default matters-section"
      id="practice"
      aria-labelledby="evidence-practice-h2"
    >
      <div className="container">
        <header className="matters-section__header">
          <p className="section-eyebrow">In practice</p>
          <h2 className="matters-section__title" id="evidence-practice-h2">
            This is already being worked out in real organizations.
          </h2>
          <p className="matters-section__intro">
            Movemental is not theoretical. The framework is being applied,
            tested, and refined in real organizational contexts.
          </p>
        </header>

        <div className="matters-section__grid">
          {SNAPSHOTS.map((snapshot) => (
            <article key={snapshot.title} className="matters-block">
              <h3 className="matters-block__title">{snapshot.title}</h3>
              <p className="matters-block__body">{snapshot.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 5 — The People Behind It                                          */
/* -------------------------------------------------------------------------- */

interface CredibilityPillar {
  title: string;
  body: string;
}

const CREDIBILITY_PILLARS: readonly CredibilityPillar[] = [
  {
    title: "Movement Leadership Experience",
    body: "Years of work leading and supporting organizations where trust, formation, and mission matter.",
  },
  {
    title: "Frameworks That Have Been Taught and Applied",
    body: "Ideas and structures already used in real training environments, not just conceptual models.",
  },
  {
    title: "Technology Properly Ordered",
    body: "A commitment to using technology in service of human and organizational flourishing.",
  },
];

function PeopleBehindItFold() {
  return (
    <section
      className="band-section difference-section"
      id="people"
      aria-labelledby="evidence-people-h2"
    >
      <div className="container">
        <header className="difference-section__header">
          <p className="section-eyebrow">Credibility</p>
          <h2 className="difference-section__title" id="evidence-people-h2">
            Built by movement leaders, not just technologists.
          </h2>
          <p className="difference-section__intro">
            Movemental is grounded in decades of leadership across churches,
            nonprofits, and institutions. The work is shaped by people who
            understand formation, mission, and organizational complexity — not
            just software.
          </p>
        </header>

        <div className="difference-section__grid">
          {CREDIBILITY_PILLARS.map((pillar) => (
            <article key={pillar.title} className="difference-block">
              <h3 className="difference-block__title">{pillar.title}</h3>
              <p className="difference-block__body">{pillar.body}</p>
            </article>
          ))}
        </div>

        <div className="path-section__cta" style={{ marginTop: "2rem" }}>
          <BtnPill href="/about" variant="ghost">
            Meet the founders
          </BtnPill>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 6 — Building in Public                                            */
/* -------------------------------------------------------------------------- */

function BuildingInPublicFold() {
  return (
    <section
      className="band-default"
      id="building-in-public"
      aria-labelledby="evidence-building-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="Posture"
          display={
            <>
              We are not pretending <em>this is solved.</em>
            </>
          }
          displayId="evidence-building-h2"
          lede="AI is a rapidly changing landscape. Movemental’s approach is not to claim mastery, but to model responsible leadership in real time — learning, refining, and building in the open."
        />

        <p className="prose" style={{ marginTop: "1.75rem" }}>
          This means sharing what is working, what is unclear, and how
          decisions are being made — so others can lead with greater clarity
          and confidence.
        </p>

        <p
          className="matters-section__closing"
          style={{ marginTop: "2rem", textAlign: "left", maxWidth: "52ch" }}
        >
          Authority comes from sustained, honest engagement — not from
          appearing certain.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 7 — Final CTA                                                     */
/*  (Testimonials section intentionally omitted — only include with real      */
/*   quotes from named leaders.)                                              */
/* -------------------------------------------------------------------------- */

function FinalCta() {
  return (
    <section
      className="band-midnight final-cta"
      id="cta"
      aria-labelledby="evidence-final-cta-h2"
    >
      <div className="container final-cta__inner">
        <h2 className="display" id="evidence-final-cta-h2">
          This is what <em>responsible AI leadership</em> looks like.
        </h2>
        <p className="lede lede--regular">
          Start with safety, follow a clear path, and lead your organization
          through AI with confidence.
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
