/** Audience hub — translated from docs/html/mock-organizations.html. */

import Link from "next/link";

import { BtnPill, SectionHead } from "@/components/sections-mock/primitives";

export function WhoWeServeContent() {
  return (
    <>
      <Hero />
      <SharedFold />
      <DiffersFold />
      <ThreeDoorsFold />
      <MovementLeadersFold />
      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <section className="band-midnight hero" aria-labelledby="hero-h1">
      <div className="container">
        <p className="eyebrow">Who we serve</p>
        <h1 className="display" id="hero-h1">
          Three organizations, <em>one Sequence</em>.
        </h1>
        <p className="lede lede--regular">
          Churches, nonprofits, and institutions arrive at AI from different
          angles, with different boards, different vocabularies, and different
          proof shapes. The Sequence is the same. The work inside it is shaped
          by the organization.
        </p>
        <div className="hero-actions">
          <BtnPill href="/field-guide" variant="primary">
            Read the field guide
          </BtnPill>
          <BtnPill href="/contact" variant="ghost">
            Start a conversation
          </BtnPill>
        </div>
        <div className="hero-proof">
          <span className="hero-proof__label">A note on language</span>
          <span>
            Movement leaders are not a fourth audience — they are an ecosystem
            layer. See{" "}
            <Link
              href="/movement-leaders"
              style={{
                color: "inherit",
                textDecoration: "underline",
                textUnderlineOffset: "0.2em",
              }}
            >
              the definition
            </Link>
            .
          </span>
        </div>
      </div>
    </section>
  );
}

const SHARED = [
  {
    label: "Shared 01",
    title: "The default response is one of two postures.",
    body: "Wait it out, or ship it now. Both look principled from inside. Both, in different speeds, hand the future of the organization to someone else's defaults.",
  },
  {
    label: "Shared 02",
    title: "The senior team is not yet in the room.",
    body: "AI conversations are still happening with whichever staff member adopted ChatGPT first. The board, the elders, the executive team — the people who hold the mission — are usually one or two months behind their own staff.",
  },
  {
    label: "Shared 03",
    title: "The mission is being treated as a constant.",
    body: 'Most organizations are asking "how do we use AI to do what we already do, faster?" The harder question — what AI quietly changes about what we are — gets postponed. Postponing it is the most expensive choice.',
  },
  {
    label: "Shared 04",
    title: "The vocabulary is borrowed.",
    body: "The words being used to talk about AI inside the organization were written somewhere else, by someone else, for someone else. None of the three audiences can walk the Sequence with someone else's vocabulary. The first move is naming things in your own.",
  },
] as const;

function SharedFold() {
  return (
    <section className="band-default" id="shared" aria-labelledby="shared-h2">
      <div className="container">
        <SectionHead
          eyebrow="The common shape"
          display={
            <>
              Different organizations, the <em>same starting state</em>.
            </>
          }
          displayId="shared-h2"
          lede="Almost every organization that comes to us is, in their honest moments, in one of two responses. The diagnosis below is not categorical — it is the most common starting state we encounter, in roughly equal measure across all three audiences."
        />

        <div className="problem-grid problem-grid--4up">
          {SHARED.map(({ label, title, body }) => (
            <article key={label} className="problem-card">
              <p className="problem-card__label">{label}</p>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

interface CompareRow {
  label: string;
  churches: string;
  nonprofits: string;
  institutions: string;
}

const COMPARE_ROWS: CompareRow[] = [
  {
    label: "Senior team in the room",
    churches: "Senior pastor and elder team. Lay leadership where relevant.",
    nonprofits:
      "Executive director and board. Development and program leads when the work touches donors or beneficiaries.",
    institutions:
      "President or provost, senior staff, faculty representation, and counsel.",
  },
  {
    label: "Proof shape that lands",
    churches:
      "A pastoral letter. A board-readable narrative the congregation can hear from the front.",
    nonprofits:
      "A donor-facing posture. A 990-defensible audit trail. Program integrity language.",
    institutions:
      "A faculty-readable framework. Accreditation-aware governance. Counsel-reviewed policy.",
  },
  {
    label: "Vocabulary in play",
    churches: "Theology, polity, formation, pastoral care, witness.",
    nonprofits:
      "Donor trust, program integrity, audit, mandate, stewardship.",
    institutions:
      "Governance, faculty, counsel, accreditation, fiduciary duty.",
  },
  {
    label: "Timeline that holds",
    churches:
      "A season — one fiscal cycle, one preaching arc, one staff retreat-to-retreat horizon.",
    nonprofits:
      "A grant cycle — six to twelve months around budgeted programs and reporting cadence.",
    institutions:
      "An academic year, with multi-year accompaniment available when the work crosses departments.",
  },
];

function DiffersFold() {
  return (
    <section className="band-section" id="differs" aria-labelledby="differs-h2">
      <div className="container">
        <SectionHead
          eyebrow="What the organization shapes"
          display={
            <>
              The Sequence holds. The work inside it is{" "}
              <em>shaped by who you are</em>.
            </>
          }
          displayId="differs-h2"
          lede="Four axes where the Sequence is the same but the work is not. If the language in the column that names you does not feel right, that is itself diagnostic — the organization may be reading the wrong audience page."
        />

        <div
          className="compare-grid"
          role="table"
          aria-label="What differs across audiences"
        >
          <div
            className="compare-grid__row compare-grid__row--head"
            role="row"
          >
            <span className="compare-grid__label" role="rowheader" />
            <span
              className="compare-grid__cell compare-grid__cell--head"
              role="columnheader"
            >
              Churches
            </span>
            <span
              className="compare-grid__cell compare-grid__cell--head"
              role="columnheader"
            >
              Nonprofits
            </span>
            <span
              className="compare-grid__cell compare-grid__cell--head"
              role="columnheader"
            >
              Institutions
            </span>
          </div>

          {COMPARE_ROWS.map((row) => (
            <div key={row.label} className="compare-grid__row" role="row">
              <span className="compare-grid__label" role="rowheader">
                {row.label}
              </span>
              <span className="compare-grid__cell" role="cell">
                {row.churches}
              </span>
              <span className="compare-grid__cell" role="cell">
                {row.nonprofits}
              </span>
              <span className="compare-grid__cell" role="cell">
                {row.institutions}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const DOORS = [
  {
    href: "/nonprofits",
    eyebrow: "For nonprofits",
    title: "Executive directors and boards.",
    body: "Protect donor trust and program integrity while AI accelerates the back office. Audit-aware language, board-ratified posture, 990 readiness.",
    cta: "See the nonprofits path",
  },
  {
    href: "/churches",
    eyebrow: "For churches",
    title: "Senior pastors and elder teams.",
    body: "Hold theology, polity, and pastoral care in the room while staff begin using AI well. Church-shaped Sandbox Season tuned for elder participation.",
    cta: "See the churches path",
  },
  {
    href: "/institutions",
    eyebrow: "For institutions",
    title: "Provosts, presidents, senior staff.",
    body: "Move at the pace governance can defend, with boards, counsel, faculty, and accreditors reading the same page. Multi-year accompaniment available.",
    cta: "See the institutions path",
  },
] as const;

function ThreeDoorsFold() {
  return (
    <section
      className="band-default"
      id="audiences"
      aria-labelledby="audiences-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="The three audience pages"
          display={
            <>
              Open the page that <em>names you correctly</em>.
            </>
          }
          displayId="audiences-h2"
          lede="Each audience page carries the same Sequence translated into the right vocabulary, the right proof shape, and the right room composition. Read the one that fits."
        />

        <div className="audience-grid">
          {DOORS.map((d) => (
            <Link key={d.href} href={d.href} className="audience-card">
              <p className="audience-card__eyebrow">{d.eyebrow}</p>
              <h3>{d.title}</h3>
              <p>{d.body}</p>
              <span className="audience-card__arrow">{d.cta}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function MovementLeadersFold() {
  return (
    <section
      className="band-section"
      id="movement-leaders"
      aria-labelledby="movement-leaders-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="Adjacent to this page, not on it"
          display={
            <>
              Movement leaders are <em>not a fourth card</em>.
            </>
          }
          displayId="movement-leaders-h2"
        />

        <p className="prose" style={{ marginTop: "1.5rem" }}>
          Many readers come to a page like this expecting a fourth audience:
          &ldquo;and movement leaders.&rdquo; Movemental treats that as a
          mistake. Movement leaders are an ecosystem layer that sits next to
          all three of the audiences above, not a parallel funnel that competes
          with them. We have a separate definitional surface for the term. The
          named ecosystem layer lives on the Trusted voices page.
        </p>

        <div className="btn-row">
          <BtnPill href="/movement-leaders" variant="ghost">
            Read the definition
          </BtnPill>
          <BtnPill href="/voices" variant="ghost">
            See the trusted voices
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
        <p className="eyebrow">When you have read the right page</p>
        <h2 className="display" id="cta-h2">
          The Sequence is the same. <em>The work is yours.</em>
        </h2>
        <p className="lede lede--regular">
          A first conversation is thirty minutes. We will tell you in that time
          whether the Sequence is a fit and whether the timing is. If it is
          not yet, we will say so directly and recommend a smaller starting
          move.
        </p>
        <div className="hero-actions">
          <BtnPill href="/contact" variant="primary">
            Start a conversation
          </BtnPill>
          <BtnPill href="/assess" variant="ghost">
            Take the diagnostic
          </BtnPill>
        </div>
      </div>
    </section>
  );
}
