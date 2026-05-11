/** Assess (Integrity Diagnostic) — translated from docs/html/mock-assess.html. */

import { BtnPill, SectionHead } from "@/components/sections-mock/primitives";

import { IntegrityDiagnosticForm } from "./integrity-diagnostic-form";

export function AssessContent() {
  return (
    <>
      <Hero />
      <WhatItMeasures />
      <Preview />
      <ReadBack />
      <EditorialNote />
      <WhereInEngagement />
      <Faq />
      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <section className="band-midnight hero" aria-labelledby="hero-h1">
      <div className="container">
        <p className="eyebrow">
          Movemental Path · Integrity Diagnostic
        </p>
        <h1 className="display" id="hero-h1">
          Where is your organization <em>actually starting</em>?
        </h1>
        <p className="lede lede--regular">
          A short diagnostic for senior leaders who suspect their AI
          conversation is further along than their AI posture is. Forty-five
          minutes to complete with two or three colleagues in the room. A
          six-page read-back inside five business days, read with you on a
          thirty-minute call.
        </p>
        <div className="hero-actions">
          <BtnPill href="#begin" variant="primary">
            Take the diagnostic
          </BtnPill>
          <BtnPill href="/field-guides" variant="ghost">
            Read the field guide first
          </BtnPill>
        </div>
        <div className="hero-proof">
          <span className="hero-proof__label">No score, no benchmark</span>
          <span>
            The diagnostic produces a narrative, not a number. See the
            editorial note below.
          </span>
        </div>
      </div>
    </section>
  );
}

const DIMENSIONS = [
  {
    num: "01",
    title: "Sequence integrity",
    body: "Whether your organization has walked Safety, Sandbox, Skills, Solutions in order — or skipped a stage and is now working backward to recover it.",
  },
  {
    num: "02",
    title: "Posture clarity",
    body: "Whether the senior team can state, in one paragraph, the organization's relationship to AI in language a board would ratify.",
  },
  {
    num: "03",
    title: "Refusal capacity",
    body: "Whether the organization has named, in writing, three things AI is not allowed to touch — and whether anyone outside the senior team knows what they are.",
  },
  {
    num: "04",
    title: "Sandbox truth",
    body: "Whether your staff have explored real AI work against real organizational data, with the senior team watching, before any deployment.",
  },
  {
    num: "05",
    title: "Formation, not training",
    body: "Whether the staff judgment around AI is built or borrowed — formed in your context, or imported from someone else's.",
  },
  {
    num: "06",
    title: "Solution restraint",
    body: "Whether tools have been deployed only after the human work, or whether tools are pulling the human work behind them at speed.",
  },
];

function WhatItMeasures() {
  return (
    <section
      className="band-default"
      id="measures"
      aria-labelledby="measures-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="Six dimensions"
          display={
            <>
              Six honest questions, <em>in order</em>.
            </>
          }
          displayId="measures-h2"
          lede="The diagnostic walks the same Sequence the engagement walks: Safety, Sandbox, Skills, Solutions — broken into six readable dimensions, each with its own short section."
        />
        <ul className="outcomes-grid">
          {DIMENSIONS.map((d) => (
            <li key={d.num} className="outcome-card">
              <p className="outcome-card__num">{d.num}</p>
              <h3>{d.title}</h3>
              <p>{d.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Preview() {
  return (
    <section className="band-section" id="preview" aria-labelledby="preview-h2">
      <div className="container">
        <SectionHead
          eyebrow="Take the diagnostic"
          display={
            <>
              Forty-five minutes, six sections, <em>no scoring</em>.
            </>
          }
          displayId="preview-h2"
          lede="Twenty-two multiple-choice questions across six sections, plus an optional 'show your work' note for each. Nothing is timed. Nothing is scored. The point is to make the conversation more honest, not to rank your organization."
        />
        <IntegrityDiagnosticForm />
      </div>
    </section>
  );
}

function ReadBack() {
  return (
    <section
      className="band-default"
      id="readback"
      aria-labelledby="readback-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="The read-back"
          display={
            <>
              A six-page narrative, <em>not a number</em>.
            </>
          }
          displayId="readback-h2"
          lede="You complete the diagnostic. We read it. Within five business days, you receive a written read-back and a calendar invite for a thirty-minute call to walk it."
        />
        <ul className="engagement-list">
          <li>
            <strong>The read-back document</strong>
            <span>
              Six pages, one per dimension. What we read in your answers, in
              plain language. Where the Sequence is intact and where it is
              not. No score, no benchmark, no rank.
            </span>
          </li>
          <li>
            <strong>A thirty-minute call</strong>
            <span>
              One of the Movemental founders reads the document with you. The
              point of the call is to make sure we got the read right. We
              will revise the document if we did not.
            </span>
          </li>
          <li>
            <strong>A short list of next moves</strong>
            <span>
              Three things to do next. Sometimes the answer is &ldquo;do
              less, slower.&rdquo; Sometimes the answer is &ldquo;this is
              further along than you thought.&rdquo; Both are real findings.
            </span>
          </li>
          <li>
            <strong>Permission to share it</strong>
            <span>
              If the diagnostic is honest, share it with your board. If it is
              not yet, tell us what we missed and we will rewrite the
              section.
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}

function EditorialNote() {
  return (
    <section
      className="band-section"
      id="not-this"
      aria-labelledby="not-this-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="What this is not"
          display={
            <>
              The line, <em>on the page</em>.
            </>
          }
          displayId="not-this-h2"
        />
        <aside className="evidence-note">
          <p className="evidence-note__label">Editorial note</p>
          <p className="evidence-note__body">
            <strong>This is not a maturity model.</strong> It is not a
            benchmark. It is not a score. We will not tell you that your
            organization is at &ldquo;level 3 of 5.&rdquo; We will not produce
            a percentile. There is no leaderboard, public or private. If you
            are looking for a tool that ranks your organization against a
            peer set, this is not that tool, on purpose. Maturity-model
            framing is the most common way the AI conversation is being
            polluted right now. Movemental is built to refuse it.
          </p>
          <p className="evidence-note__caveat">
            The diagnostic is held confidentially by the Movemental founders.
            It is not shared, sold, aggregated, or anonymized into any
            benchmark. It is yours.
          </p>
        </aside>
      </div>
    </section>
  );
}

function WhereInEngagement() {
  return (
    <section className="band-default" id="when" aria-labelledby="when-h2">
      <div className="container">
        <SectionHead
          eyebrow="Where this sits"
          display={
            <>
              Before the first proposal, <em>not after</em>.
            </>
          }
          displayId="when-h2"
        />
        <p className="prose" style={{ marginTop: "1.5rem" }}>
          We use the Integrity Diagnostic to read whether the timing is right
          before any proposal is written. If you are not yet ready for the
          conversation it asks you to have, the diagnostic itself is the
          engagement — there is no further conversation needed yet, and we
          will tell you so. If you are ready, the diagnostic is the first
          artifact we write together, and the rest of the engagement begins
          from what it surfaces.
        </p>
        <div className="btn-row">
          <BtnPill href="/field-guides" variant="ghost">
            Read the field guide for the full Sequence
          </BtnPill>
        </div>
      </div>
    </section>
  );
}

const ASSESS_FAQ = [
  {
    q: "Does this cost anything?",
    a: "No. The diagnostic is free, including the thirty-minute read-back call. We invest the time because the diagnostic is also how we read whether an engagement is a fit. If it is not, we want to know that before either of us has spent more than an hour.",
  },
  {
    q: "Can our board take it?",
    a: "Yes, and we recommend it. The most useful version of the diagnostic is taken twice: once by the senior staff and once by the board or elder team. The gap between the two answer sets is usually the most diagnostic part.",
  },
  {
    q: "Can we take it more than once?",
    a: "Yes. Most organizations re-take it after the Sandbox stage — the answers shift, sometimes dramatically. Some questions only become answerable after the human work has been done.",
  },
  {
    q: "Is the data confidential?",
    a: "Yes. The diagnostic is held by the Movemental founders and is not shared, sold, aggregated, or anonymized into any benchmark. The read-back is yours; the raw answers stay with us only as long as needed to complete the read-back.",
  },
  {
    q: "Why isn't there a public leaderboard?",
    a: "On purpose — see the editorial note above. A leaderboard would change what the diagnostic is for. The point is honesty inside the room, not ranking across rooms.",
  },
  {
    q: "What if we are not ready to take it?",
    a: "Read the field guide first. The diagnostic assumes the senior team has read it, or read enough of it to know what the four stages are and why the order matters. Taking the diagnostic without that grounding usually produces answers that need to be rewritten on the read-back call, which is a slower path to the same place.",
  },
];

function Faq() {
  return (
    <section className="band-section" id="faq" aria-labelledby="faq-h2">
      <div className="container">
        <SectionHead
          eyebrow="Common questions"
          display={
            <>
              What leaders ask <em>before they take it</em>.
            </>
          }
          displayId="faq-h2"
        />
        <div className="faq">
          {ASSESS_FAQ.map(({ q, a }) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        <div className="btn-row" style={{ marginTop: "2rem" }}>
          <BtnPill href="/faq" variant="ghost">
            See the full FAQ
          </BtnPill>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section
      className="band-midnight final-cta"
      id="cta"
      aria-labelledby="cta-h2"
    >
      <div className="container">
        <p className="eyebrow">When you are ready</p>
        <h2 className="display" id="cta-h2">
          Forty-five minutes. <em>Six honest questions</em>.
        </h2>
        <p className="lede lede--regular">
          Two or three colleagues in the room. No score. A six-page read-back
          inside a week, read with you on a thirty-minute call.
        </p>
        <div className="hero-actions">
          <BtnPill href="#begin" variant="primary">
            Take the diagnostic
          </BtnPill>
          <BtnPill href="/contact" variant="ghost">
            Start a conversation first
          </BtnPill>
        </div>
      </div>
    </section>
  );
}
