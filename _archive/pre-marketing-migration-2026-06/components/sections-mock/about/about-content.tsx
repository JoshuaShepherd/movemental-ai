/**
 * About — credibility, philosophy, grounding.
 *
 * Sequence: hero → origin → core belief → why we exist → kind of leadership
 * required → posture → final CTA. Quieter and more editorial than the audience
 * pages: prose treatment for the narrative sections, a single comparison
 * card pair for the “two bad options + third way” pivot. Shares the recipe
 * vocabulary used by the rest of the chain (/start-with-safety, /path,
 * /work-with-us, /evidence, /churches).
 */

import { BtnPill, SectionHead } from "@/components/sections-mock/primitives";

export function AboutContent() {
  return (
    <>
      <Hero />
      <OriginFold />
      <CoreBeliefFold />
      <WhyExistsFold />
      <LeadershipFold />
      <PostureFold />
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
      aria-labelledby="about-hero-h1"
    >
      <div className="container">
        <p className="eyebrow">About Movemental</p>
        <h1 className="display" id="about-hero-h1">
          This work comes from <em>leadership, not just technology.</em>
        </h1>
        <p className="lede lede--regular">
          Movemental exists to help organizations navigate AI as a leadership,
          formation, and mission challenge — not just a technical one.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 2 — The Origin of the Work                                        */
/* -------------------------------------------------------------------------- */

function OriginFold() {
  return (
    <section
      className="band-default"
      id="origin"
      aria-labelledby="about-origin-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="The origin"
          display={
            <>
              This did not <em>start with AI.</em>
            </>
          }
          displayId="about-origin-h2"
        />

        <p className="prose" style={{ marginTop: "1.75rem" }}>
          Movemental is shaped by years of work with churches, nonprofits, and
          institutions — the kind of organizations where trust, formation, and
          mission are not features. They are the work itself.
        </p>

        <p className="prose" style={{ marginTop: "1rem" }}>
          AI did not create these concerns. It revealed them.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 3 — The Core Belief                                               */
/* -------------------------------------------------------------------------- */

const CORE_BELIEF_BULLETS: readonly string[] = [
  "It changes how people think",
  "It changes how work is done",
  "It changes how trust is formed",
];

function CoreBeliefFold() {
  return (
    <section
      className="band-section"
      id="core-belief"
      aria-labelledby="about-core-belief-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="The core belief"
          display={
            <>
              AI is not primarily <em>a technology problem.</em>
            </>
          }
          displayId="about-core-belief-h2"
          lede="It is an anthropological and leadership problem."
        />

        <ul
          className="path-step__list"
          style={{
            marginTop: "1.5rem",
            maxWidth: "42rem",
            paddingLeft: 0,
          }}
          aria-label="What AI changes inside an organization"
        >
          {CORE_BELIEF_BULLETS.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 4 — Why Movemental Exists                                         */
/* -------------------------------------------------------------------------- */

interface BadOption {
  label: string;
  title: string;
  body: string;
}

const BAD_OPTIONS: readonly BadOption[] = [
  {
    label: "Option one",
    title: "Rush ahead without clarity.",
    body: "Adopt tools quickly, before standards or boundaries exist, and discover the costs after they have already shaped the organization.",
  },
  {
    label: "Option two",
    title: "Avoid until forced to react.",
    body: "Delay engagement and let the conversation be set somewhere else, by someone else, on terms the organization did not choose.",
  },
];

function WhyExistsFold() {
  return (
    <section
      className="band-default"
      id="why-exists"
      aria-labelledby="about-why-exists-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="Why we exist"
          display={
            <>
              Most organizations are being forced into{" "}
              <em>two bad options.</em>
            </>
          }
          displayId="about-why-exists-h2"
        />

        <div
          className="problem-grid"
          aria-label="The two default postures organizations fall into"
        >
          {BAD_OPTIONS.map((option) => (
            <article key={option.label} className="problem-card">
              <p className="problem-card__label">{option.label}</p>
              <h3>{option.title}</h3>
              <p>{option.body}</p>
            </article>
          ))}
        </div>

        <p className="problem-resolve">
          Movemental exists to provide a third way:{" "}
          <em>a structured, responsible path.</em>
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 5 — The Kind of Leadership Required                               */
/* -------------------------------------------------------------------------- */

interface LeadershipQuality {
  title: string;
  body: string;
}

const LEADERSHIP_QUALITIES: readonly LeadershipQuality[] = [
  {
    title: "Honest about uncertainty",
    body: "Willing to say what is unclear without pretending the ground is firmer than it is.",
  },
  {
    title: "Responsible for people",
    body: "Carrying the weight of the staff, members, and communities the organization actually serves.",
  },
  {
    title: "Willing to move carefully, not slowly",
    body: "Pace set by what the organization can absorb, not by the pressure of the news cycle.",
  },
  {
    title: "Focused on formation, not just output",
    body: "Measuring success by how people grow, not how fast tools are adopted.",
  },
];

function LeadershipFold() {
  return (
    <section
      className="band-section difference-section"
      id="leadership"
      aria-labelledby="about-leadership-h2"
    >
      <div className="container">
        <header className="difference-section__header">
          <p className="section-eyebrow">The kind of leadership required</p>
          <h2 className="difference-section__title" id="about-leadership-h2">
            This moment requires a different kind of leadership.
          </h2>
          <p className="difference-section__intro">
            Four qualities that do more work in this moment than any single
            decision about tools.
          </p>
        </header>

        <div className="difference-section__grid">
          {LEADERSHIP_QUALITIES.map((q) => (
            <article key={q.title} className="difference-block">
              <h3 className="difference-block__title">{q.title}</h3>
              <p className="difference-block__body">{q.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 6 — The Posture                                                   */
/* -------------------------------------------------------------------------- */

function PostureFold() {
  return (
    <section
      className="band-default"
      id="posture"
      aria-labelledby="about-posture-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="The posture"
          display={
            <>
              We are not pretending <em>this is solved.</em>
            </>
          }
          displayId="about-posture-h2"
        />

        <p className="prose" style={{ marginTop: "1.75rem" }}>
          Movemental is committed to learning, building, and guiding in real
          time — without pretending certainty or outsourcing responsibility to
          tools.
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
/* -------------------------------------------------------------------------- */

function FinalCta() {
  return (
    <section
      className="band-midnight final-cta"
      id="cta"
      aria-labelledby="about-final-cta-h2"
    >
      <div className="container final-cta__inner">
        <h2 className="display" id="about-final-cta-h2">
          If this resonates, <em>start with the first step.</em>
        </h2>
        <p className="lede lede--regular">
          Begin where every responsible organization should — by establishing
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
