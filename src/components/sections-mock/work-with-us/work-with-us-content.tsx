/**
 * Work With Us — engagement page.
 *
 * Designed as the third in a chain (home → /start-with-safety → /path →
 * /work-with-us). Reuses the established design language: midnight hero +
 * tonal-stacked sections + path-steps for the engagement model + audience
 * cards for engagement options. No forms, no pricing, no checkout — this is
 * the static engagement surface for MVP.
 */

import Link from "next/link";

import { BtnPill, SectionHead } from "@/components/sections-mock/primitives";

export function WorkWithUsContent() {
  return (
    <>
      <Hero />
      <AudienceFold />
      <EngagementModelFold />
      <FirstStepFold />
      <EngagementOptionsFold />
      <OutcomesFold />
      <BoundariesFold />
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
      aria-labelledby="wwu-hero-h1"
    >
      <div className="container">
        <p className="eyebrow">Work with Movemental</p>
        <h1 className="display" id="wwu-hero-h1">
          A guided path for organizations ready to{" "}
          <em>lead AI with clarity.</em>
        </h1>
        <p className="lede lede--regular">
          Movemental helps churches, nonprofits, and institutions establish
          safety, build capability, and develop AI solutions that serve their
          mission instead of reshaping it.
        </p>
        <div className="hero-actions">
          <BtnPill href="/contact" variant="primary">
            Talk With Us
          </BtnPill>
          <BtnPill href="/start-with-safety" variant="ghost">
            Start with Safety
          </BtnPill>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 2 — Who This Is For                                               */
/* -------------------------------------------------------------------------- */

interface AudienceCard {
  href: string;
  title: string;
  body: string;
}

const AUDIENCES: readonly AudienceCard[] = [
  {
    href: "/churches",
    title: "Church Leaders",
    body: "For pastors and ministry teams who need to lead staff and congregations through AI without compromising formation, theology, or trust.",
  },
  {
    href: "/nonprofits",
    title: "Nonprofit Leaders",
    body: "For executive directors and leadership teams who need clarity before AI spreads across programs, fundraising, communications, and operations.",
  },
  {
    href: "/institutions",
    title: "Institutional Leaders",
    body: "For seminaries, schools, and training organizations preparing people for an AI-shaped world with discernment and depth.",
  },
];

function AudienceFold() {
  return (
    <section
      className="band-default"
      id="fit"
      aria-labelledby="wwu-audience-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="Fit"
          display={
            <>
              This is for leaders carrying{" "}
              <em>real responsibility.</em>
            </>
          }
          displayId="wwu-audience-h2"
          lede="Movemental is built for organizations where AI decisions affect people, culture, trust, formation, and mission."
        />

        <div className="audience-grid">
          {AUDIENCES.map((card) => (
            <Link key={card.href} href={card.href} className="audience-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <span className="audience-card__arrow">
                Read the {card.title.split(" ")[0].toLowerCase()} path
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 3 — The Engagement Model                                          */
/* -------------------------------------------------------------------------- */

interface EngagementStep {
  number: number;
  title: string;
  body: string;
}

const ENGAGEMENT_STEPS: readonly EngagementStep[] = [
  {
    number: 1,
    title: "Listen",
    body: "Understand your context, risks, pressures, and current AI usage.",
  },
  {
    number: 2,
    title: "Clarify",
    body: "Establish shared language, safety boundaries, and leadership alignment.",
  },
  {
    number: 3,
    title: "Equip",
    body: "Train your people to use AI responsibly and consistently.",
  },
  {
    number: 4,
    title: "Build",
    body: "Develop tools, workflows, and systems only after the human foundation is in place.",
  },
];

function EngagementModelFold() {
  return (
    <section
      className="band-section path-section"
      id="model"
      aria-labelledby="wwu-model-h2"
    >
      <div className="container path-section__inner">
        <header className="path-section__header">
          <p className="section-eyebrow">How we work</p>
          <h2 className="path-section__title" id="wwu-model-h2">
            We do not start with tools. We start with leadership clarity.
          </h2>
          <p className="path-section__intro">
            Every engagement follows the Movemental AI Path: Safety, Sandbox,
            Skills, and Solutions. The pace and depth depend on your
            organization, but the order matters.
          </p>
        </header>

        <ol className="path-steps" aria-label="The engagement model">
          {ENGAGEMENT_STEPS.map((step) => (
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
          <BtnPill href="/path" variant="ghost">
            See the full path
          </BtnPill>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 4 — What Happens First                                            */
/* -------------------------------------------------------------------------- */

interface FirstStepColumn {
  label: string;
  title: string;
  bullets: readonly string[];
}

const FIRST_STEP_COLUMNS: readonly FirstStepColumn[] = [
  {
    label: "What we look at",
    title: "The current state of AI inside your organization.",
    bullets: [
      "Where AI is already being used",
      "What sensitive information needs protection",
      "Where staff need guidance",
      "What leaders need to agree on",
      "Which use cases are safe to explore first",
    ],
  },
  {
    label: "What you leave with",
    title: "A grounded starting point your team can act on.",
    bullets: [
      "Initial safety priorities",
      "Clearer leadership alignment",
      "A practical next-step recommendation",
      "Language for communicating with staff",
      "A starting point for policy and training",
    ],
  },
];

function FirstStepFold() {
  return (
    <section
      className="band-default"
      id="first-step"
      aria-labelledby="wwu-first-step-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="The first step"
          display={
            <>
              Most organizations begin with a{" "}
              <em>Safety Session.</em>
            </>
          }
          displayId="wwu-first-step-h2"
          lede="The Safety Session is a focused starting point for leaders who know AI is already present but do not yet have shared clarity. It helps your team identify current usage, surface risks, define initial boundaries, and determine the right next step."
        />

        <div
          className="problem-grid"
          aria-label="The shape of a Safety Session"
        >
          {FIRST_STEP_COLUMNS.map((col) => (
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
          <BtnPill href="/start-with-safety" variant="primary">
            Begin with Safety
          </BtnPill>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 5 — Engagement Options                                            */
/* -------------------------------------------------------------------------- */

interface EngagementOption {
  title: string;
  bestFor: string;
  body: string;
  includes: readonly string[];
  cta: string;
  href: string;
}

const ENGAGEMENT_OPTIONS: readonly EngagementOption[] = [
  {
    title: "Safety Session",
    bestFor: "Leaders who need a clear first step.",
    body: "A focused engagement to assess current AI use, identify immediate risks, and establish the first layer of shared clarity.",
    includes: [
      "Current-state conversation",
      "Safety priorities",
      "Initial guardrail recommendations",
      "Next-step roadmap",
    ],
    cta: "Start with Safety",
    href: "/start-with-safety",
  },
  {
    title: "Guided Pathway",
    bestFor: "Organizations ready to move through Safety, Sandbox, and Skills.",
    body: "A structured process for leaders and teams who need more than a workshop but are not yet ready for custom systems.",
    includes: [
      "Leadership alignment",
      "Safety framework",
      "Guided experimentation",
      "Team training",
    ],
    cta: "Explore the Pathway",
    href: "/path",
  },
  {
    title: "Solutions Partnership",
    bestFor: "Organizations ready to build on a human foundation.",
    body: "A deeper partnership for organizations that have established clarity and are ready to develop workflows, assistants, or systems.",
    includes: [
      "Workflow discovery",
      "Custom AI assistant design",
      "Integration planning",
      "Ongoing refinement",
    ],
    cta: "Talk With Us",
    href: "/contact",
  },
];

function EngagementOptionsFold() {
  return (
    <section
      className="band-section"
      id="options"
      aria-labelledby="wwu-options-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="Ways to engage"
          display={
            <>
              Start where your organization{" "}
              <em>actually is.</em>
            </>
          }
          displayId="wwu-options-h2"
          lede="Some organizations need a first conversation. Others need a guided safety process, team training, or implementation support. Movemental helps you take the next faithful step."
        />

        <div className="audience-grid">
          {ENGAGEMENT_OPTIONS.map((option) => (
            <Link
              key={option.title}
              href={option.href}
              className="audience-card"
              aria-label={`${option.title} — ${option.cta}`}
            >
              <p className="audience-card__eyebrow">Best for</p>
              <h3>{option.title}</h3>
              <p
                style={{
                  fontSize: "0.92rem",
                  fontWeight: 500,
                  color: "var(--foreground)",
                }}
              >
                {option.bestFor}
              </p>
              <p>{option.body}</p>
              <p
                className="audience-card__eyebrow"
                style={{ marginTop: "0.4rem" }}
              >
                Includes
              </p>
              <ul
                className="path-step__list"
                style={{ marginTop: "0.25rem" }}
              >
                {option.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <span className="audience-card__arrow">{option.cta}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 6 — What We Help You Produce                                      */
/* -------------------------------------------------------------------------- */

interface OutcomeCard {
  title: string;
  body: string;
}

const OUTCOMES: readonly OutcomeCard[] = [
  {
    title: "AI Safety Guidelines",
    body: "Clear standards for responsible use across your organization.",
  },
  {
    title: "Leadership Alignment",
    body: "Shared understanding among the people responsible for direction and trust.",
  },
  {
    title: "Staff Training",
    body: "Practical skill development rooted in your context and responsibilities.",
  },
  {
    title: "Use-Case Roadmap",
    body: "A prioritized path for where AI can safely help first.",
  },
  {
    title: "Custom Assistants",
    body: "AI tools shaped by your organization’s voice, constraints, and mission.",
  },
  {
    title: "Workflow Integration",
    body: "Practical systems that support real work without fragmenting your team.",
  },
];

function OutcomesFold() {
  return (
    <section
      className="band-default matters-section"
      id="outcomes"
      aria-labelledby="wwu-outcomes-h2"
    >
      <div className="container">
        <header className="matters-section__header">
          <p className="section-eyebrow">Outcomes</p>
          <h2 className="matters-section__title" id="wwu-outcomes-h2">
            The goal is not AI activity. The goal is organizational clarity.
          </h2>
          <p className="matters-section__intro">
            A good engagement should leave your organization with usable
            artifacts, shared confidence, and a healthier way to make AI
            decisions.
          </p>
        </header>

        <div className="matters-section__grid">
          {OUTCOMES.map((outcome) => (
            <article key={outcome.title} className="matters-block">
              <h3 className="matters-block__title">{outcome.title}</h3>
              <p className="matters-block__body">{outcome.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 7 — What We Do Not Do                                             */
/* -------------------------------------------------------------------------- */

interface BoundaryStatement {
  title: string;
  body: string;
}

const BOUNDARIES: readonly BoundaryStatement[] = [
  {
    title: "We do not start with software.",
    body: "Tools come after safety, clarity, and capability.",
  },
  {
    title: "We do not replace human judgment.",
    body: "AI can support leadership, but it cannot carry responsibility.",
  },
  {
    title: "We do not offer generic AI hype.",
    body: "Your organization’s mission, people, and context determine what is appropriate.",
  },
  {
    title: "We do not treat efficiency as the highest good.",
    body: "Efficiency matters, but it must serve formation, trust, and mission.",
  },
];

function BoundariesFold() {
  return (
    <section
      className="band-section difference-section"
      id="boundaries"
      aria-labelledby="wwu-boundaries-h2"
    >
      <div className="container">
        <header className="difference-section__header">
          <p className="section-eyebrow">Boundaries</p>
          <h2 className="difference-section__title" id="wwu-boundaries-h2">
            Movemental is not here to make your organization chase AI.
          </h2>
          <p className="difference-section__intro">
            We are not interested in faster adoption for its own sake. We help
            leaders make wise decisions in the right order.
          </p>
        </header>

        <div className="difference-section__grid">
          {BOUNDARIES.map((b) => (
            <article key={b.title} className="difference-block">
              <h3 className="difference-block__title">{b.title}</h3>
              <p className="difference-block__body">{b.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 8 — Final CTA                                                     */
/* -------------------------------------------------------------------------- */

function FinalCta() {
  return (
    <section
      className="band-midnight final-cta"
      id="cta"
      aria-labelledby="wwu-final-cta-h2"
    >
      <div className="container final-cta__inner">
        <h2 className="display" id="wwu-final-cta-h2">
          Ready to take the <em>first responsible step?</em>
        </h2>
        <p className="lede lede--regular">
          Start with safety, clarify your next move, and lead your organization
          through AI with confidence.
        </p>
        <div className="hero-actions final-cta__actions">
          <BtnPill href="/contact" variant="primary">
            Talk With Us
          </BtnPill>
          <BtnPill href="/start-with-safety" variant="ghost">
            Start with Safety
          </BtnPill>
        </div>
      </div>
    </section>
  );
}
