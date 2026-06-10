/**
 * Talk With Us — the contact page.
 *
 * Sequence: hero → reassurance → what happens next → who this is for →
 * contact method (form) → final CTA.
 *
 * Mirrors the recipe-class chain used by /churches, /institutions,
 * /start-with-safety, /path, and /work-with-us. The form remains the
 * existing client island wired to /api/contact.
 */

import { BtnPill, SectionHead } from "@/components/sections-mock/primitives";

import { ContactForm } from "./contact-form";

export function ContactContent() {
  return (
    <>
      <Hero />
      <ReassuranceFold />
      <WhatHappensNextFold />
      <WhoThisIsForFold />
      <ContactMethodFold />
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
      aria-labelledby="contact-hero-h1"
    >
      <div className="container">
        <p className="eyebrow">Start the conversation</p>
        <h1 className="display" id="contact-hero-h1">
          Let&rsquo;s talk about where your organization{" "}
          <em>actually is.</em>
        </h1>
        <p className="lede lede--regular">
          You don&rsquo;t need to have a plan yet. Most leaders reach out
          because they know AI is already present, but don&rsquo;t yet have
          shared clarity.
        </p>
        <div className="hero-actions">
          <BtnPill href="#contact-method" variant="primary">
            Send a note
          </BtnPill>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 2 — Reassurance                                                   */
/* -------------------------------------------------------------------------- */

const REASSURANCE_BULLETS: readonly string[] = [
  "No pressure to commit",
  "No expectation of technical knowledge",
  "No assumption you have this figured out",
];

function ReassuranceFold() {
  return (
    <section
      className="band-default"
      id="reassurance"
      aria-labelledby="contact-reassurance-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="Low pressure"
          display={
            <>
              This is <em>not a sales call.</em>
            </>
          }
          displayId="contact-reassurance-h2"
          lede="The goal of an initial conversation is simple: to understand your context, where AI is already showing up, and whether the Movemental approach would actually be helpful."
        />

        <ul
          className="path-step__list"
          style={{
            marginTop: "1.5rem",
            maxWidth: "42rem",
            paddingLeft: 0,
          }}
          aria-label="What this conversation is and is not"
        >
          {REASSURANCE_BULLETS.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 3 — What Happens Next                                             */
/* -------------------------------------------------------------------------- */

interface NextStep {
  number: number;
  title: string;
  body: string;
}

const NEXT_STEPS: readonly NextStep[] = [
  {
    number: 1,
    title: "A short conversation",
    body: "We listen to your context, challenges, and current AI usage.",
  },
  {
    number: 2,
    title: "Initial clarity",
    body: "We help you name what is already happening and where risk or confusion may exist.",
  },
  {
    number: 3,
    title: "A recommendation",
    body: "If it makes sense, we suggest a next step — often starting with Safety.",
  },
];

function WhatHappensNextFold() {
  return (
    <section
      className="band-section path-section"
      id="what-happens-next"
      aria-labelledby="contact-next-h2"
    >
      <div className="container path-section__inner">
        <header className="path-section__header">
          <p className="section-eyebrow">What happens next</p>
          <h2 className="path-section__title" id="contact-next-h2">
            What happens when you reach out.
          </h2>
          <p className="path-section__intro">
            Three steps, in order. Nothing about it requires you to know what
            you want yet.
          </p>
        </header>

        <ol className="path-steps" aria-label="What happens after you reach out">
          {NEXT_STEPS.map((step) => (
            <li key={step.title} className="path-step">
              <div className="path-step__number" aria-hidden="true">
                {step.number}
              </div>
              <h3 className="path-step__title">{step.title}</h3>
              <p className="path-step__body">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 4 — Who This Is For                                               */
/* -------------------------------------------------------------------------- */

const FIT_BULLETS: readonly string[] = [
  "Responsible for a team, organization, or institution",
  "A decision-maker or senior leader",
  "Aware that AI is already being used",
  "Looking for clarity, not just tools",
];

function WhoThisIsForFold() {
  return (
    <section
      className="band-default"
      id="who-this-is-for"
      aria-labelledby="contact-fit-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="Who this is for"
          display={
            <>
              This conversation is most helpful{" "}
              <em>if you are:</em>
            </>
          }
          displayId="contact-fit-h2"
        />

        <ul
          className="path-step__list"
          style={{
            marginTop: "1.5rem",
            maxWidth: "42rem",
            paddingLeft: 0,
          }}
          aria-label="Signals this conversation is a fit"
        >
          {FIT_BULLETS.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 5 — Contact Method                                                */
/* -------------------------------------------------------------------------- */

function ContactMethodFold() {
  return (
    <section
      className="band-section"
      id="contact-method"
      aria-labelledby="contact-method-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="Send a note"
          display={
            <>
              Tell us what you are <em>actually facing.</em>
            </>
          }
          displayId="contact-method-h2"
          lede="A few short fields. None are decisive on their own. Plain language helps more than the right word."
        />

        <div style={{ marginTop: "2.5rem" }}>
          <ContactForm />
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
      aria-labelledby="contact-final-cta-h2"
    >
      <div className="container final-cta__inner">
        <h2 className="display" id="contact-final-cta-h2">
          You don&rsquo;t need to have <em>the answers yet.</em>
        </h2>
        <p className="lede lede--regular">Just start the conversation.</p>
        <div className="hero-actions final-cta__actions">
          <BtnPill href="#contact-method" variant="primary">
            Send a note
          </BtnPill>
        </div>
      </div>
    </section>
  );
}
