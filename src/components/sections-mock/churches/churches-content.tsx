/**
 * Churches page composition.
 *
 * Sequence:
 *   Hero with three entry cards →
 *   "What this looks like in a church" →
 *   Pathway component (church-scoped outcomes) →
 *   If-skipped component (church-scoped risks) →
 *   Church FAQ →
 *   Proof beat (Youthfront) →
 *   Closing CTA.
 *
 * Voice and rhythm match the homepage. Reusable PathwayComponent,
 * IfSkippedComponent, and EntryCardsComponent live under
 * `src/components/marketing/path-shared/` and are used here.
 */

import {
  EntryCardsComponent,
  IfSkippedComponent,
  PathwayComponent,
  type EntryCard,
  type PathwayStop,
} from "@/components/marketing/path-shared";
import { BtnPill, SectionHead } from "@/components/sections-mock/primitives";

const ENTRY_CARDS: readonly [EntryCard, EntryCard, EntryCard] = [
  {
    heading: "Our board is asking and we need a position.",
    body: "Start with Safety Documentation. A 14-document governance package drafted in two weeks, ratified in your voice.",
    ctaLabel: "Start with Safety",
    href: "/pathway/safety",
  },
  {
    heading: "Our staff is already experimenting and we need a framework.",
    body: "Start with Sandbox Discovery. A structured environment where your team identifies what's worth building and what isn't.",
    ctaLabel: "Start with Sandbox",
    href: "/pathway/sandbox",
  },
  {
    heading: "We're ready to rebuild our digital infrastructure.",
    body: "Start a conversation about Solutions Deployment.",
    ctaLabel: "Talk about Solutions",
    href: "/contact?interest=solutions-deployment-churches",
  },
];

const CHURCH_PATHWAY_STOPS: readonly PathwayStop[] = [
  {
    num: "01",
    name: "Safety",
    outcome: "A charter your elder board can sign.",
    href: "/pathway/safety",
  },
  {
    num: "02",
    name: "Sandbox",
    outcome: "Pastoral and operational use cases proven safe.",
    href: "/pathway/sandbox",
  },
  {
    num: "03",
    name: "Skills",
    outcome: "Staff trained to lead AI work without losing the plot.",
    href: "/pathway/skills",
  },
  {
    num: "04",
    name: "Solutions",
    outcome:
      "Sermons, formation, member care, and communications, integrated.",
    href: "/pathway/solutions",
  },
];

const CHURCH_SKIP_RISKS: readonly string[] = [
  "AI use spreads through staff without governance, and the elder board finds out from a problem rather than a plan",
  "Pastoral and member care boundaries get crossed before anyone has named them",
  "Theological integrity questions arrive after content has already been generated and shared",
  "The leadership loses standing to set policy because the practice is already in motion",
];

const CHURCH_FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Will this conflict with our theology around discernment, presence, and pastoral care?",
    a: "No. The path is designed precisely so AI serves pastoral work rather than replacing it. Safety Documentation specifically codifies where AI must not go.",
  },
  {
    q: "What if our staff isn't technical?",
    a: "Most aren't. The path assumes that. Skills Development is built for non-technical staff to become competent — not engineers, leaders.",
  },
  {
    q: "Do we have to do all four stages?",
    a: "No. Most churches begin at Safety or Sandbox. Many continue. Step 1 is non-negotiable — the rest sequences to where you are.",
  },
  {
    q: "Can our denomination or network engage at multi-entity scale?",
    a: "Yes. Network Engagements are quoted per conversation and start from $60,000 depending on scope.",
  },
];

export function ChurchesContent() {
  return (
    <>
      <ChurchesHero />
      <WhatThisLooksLike />
      <ChurchPathway />
      <ChurchSkipRisks />
      <ChurchFaq />
      <ChurchProofBeat />
      <ChurchClosing />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

function ChurchesHero() {
  return (
    <section
      className="band-default hero hero--fold"
      aria-labelledby="churches-hero-h1"
    >
      <div className="container">
        <p className="eyebrow">For churches</p>
        <h1 className="display" id="churches-hero-h1">
          Your church is being asked to take a position on AI.
        </h1>
        <p className="lede lede--regular">
          Whether the question came from your staff, your elders, your
          congregation, or your own conscience — it’s here, and it’s not going
          away. We help church leaders answer it well.
        </p>
        <p className="mt-6 max-w-(--prose-max) text-base italic leading-relaxed text-muted-foreground md:text-[1.0625rem]">
          Step one is the human work. We won’t build solutions on top of a
          church that hasn’t done it — ours or yours.
        </p>

        <div className="mt-12 md:mt-16">
          <EntryCardsComponent cards={ENTRY_CARDS} />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  What this looks like in a church                                          */
/* -------------------------------------------------------------------------- */

function WhatThisLooksLike() {
  return (
    <section
      className="band-section"
      id="church-context"
      aria-labelledby="church-context-heading"
    >
      <div className="container">
        <SectionHead
          eyebrow="Church reality"
          display={
            <>
              What this looks like <em>in a church.</em>
            </>
          }
          displayId="church-context-heading"
        />

        <div className="mt-10 flex max-w-(--prose-max) flex-col gap-6 text-[1.0625rem] leading-relaxed text-foreground md:text-lg">
          <p>
            Churches are not businesses, and AI cannot be adopted as if they
            were. Pastoral care has boundaries that no agent should cross.
            Member data carries weight that no policy can treat as ordinary.
            Sermons, formation pathways, and theological content cannot be
            trained on without deliberate care for voice, tradition, and
            integrity. The work is not generic — and we don’t pretend it is.
          </p>
          <p>
            Movemental brings frameworks built specifically for church
            reality: pastoral and member care AI boundaries, theological
            integrity guidelines for content generation, member data handling
            standards rooted in trust rather than compliance, and elder board
            governance documents drafted in language your leadership actually
            uses. The path is consistent across organizations. The work, in a
            church, is church-specific.
          </p>
        </div>

        <div className="mt-10">
          <BtnPill href="/pathway/safety" variant="ghost">
            See the full deliverable list
          </BtnPill>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pathway with church outcomes                                              */
/* -------------------------------------------------------------------------- */

function ChurchPathway() {
  return (
    <section
      className="band-default"
      id="church-pathway"
      aria-labelledby="church-pathway-heading"
    >
      <div className="container">
        <h2
          id="church-pathway-heading"
          className="sr-only"
        >
          The Movemental AI Path, applied to church reality
        </h2>
        <PathwayComponent
          stops={CHURCH_PATHWAY_STOPS}
          contextLine="The same path. Applied to church reality."
        />

        <div className="mt-12">
          <BtnPill href="/pathway" variant="ghost">
            See the full path
          </BtnPill>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  If Safety is skipped, in a church                                         */
/* -------------------------------------------------------------------------- */

function ChurchSkipRisks() {
  return (
    <section
      className="band-default"
      aria-label="What happens if Safety is skipped in a church"
    >
      <div className="container">
        <IfSkippedComponent
          heading="If Safety is skipped in a church"
          items={CHURCH_SKIP_RISKS}
        />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                       */
/* -------------------------------------------------------------------------- */

function ChurchFaq() {
  return (
    <section
      className="band-section"
      id="church-faq"
      aria-labelledby="church-faq-heading"
    >
      <div className="container">
        <SectionHead
          eyebrow="FAQ"
          display={
            <>
              Common questions from <em>church leaders.</em>
            </>
          }
          displayId="church-faq-heading"
        />

        <dl className="mt-12 flex max-w-(--prose-max) flex-col gap-10">
          {CHURCH_FAQS.map((faq) => (
            <div key={faq.q} className="flex flex-col gap-3">
              <dt className="font-serif text-xl italic leading-snug tracking-tight text-foreground md:text-2xl">
                {faq.q}
              </dt>
              <dd className="text-[1.0625rem] leading-relaxed text-muted-foreground">
                {faq.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Proof beat                                                                */
/* -------------------------------------------------------------------------- */

function ChurchProofBeat() {
  return (
    <section
      className="band-default"
      aria-labelledby="church-proof-beat-heading"
    >
      <div className="container">
        <h2
          id="church-proof-beat-heading"
          className="display"
        >
          The path is <em>being walked.</em>
        </h2>
        <p className="mt-8 max-w-(--prose-max) text-lg leading-relaxed text-foreground md:text-xl">
          Youthfront, a youth-development organization in Kansas City,
          completed Sandbox Discovery across ten teams in our first month of
          operation. Their use case portfolio and risk register are now a
          working artifact for the youth ministry leaders in their network.
        </p>
        <p className="mt-6 max-w-(--prose-max) text-sm italic leading-relaxed text-muted-foreground md:text-base">
          Case study available on{" "}
          <a
            href="/contact?interest=youthfront-case-study"
            className="underline decoration-primary/30 underline-offset-4 transition-colors hover:text-foreground hover:decoration-primary"
          >
            request
          </a>
          .
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Closing                                                                   */
/* -------------------------------------------------------------------------- */

function ChurchClosing() {
  return (
    <section
      className="band-midnight final-cta"
      id="cta"
      aria-labelledby="church-closing-heading"
    >
      <div className="container final-cta__inner">
        <h2 className="display" id="church-closing-heading">
          The path is consistent.{" "}
          <em>The work becomes specific.</em>
        </h2>
        <p className="lede lede--regular">
          Start where your church actually is. We’ll meet you there.
        </p>
        <div className="hero-actions final-cta__actions">
          <BtnPill href="/contact" variant="primary">
            Start a Conversation
          </BtnPill>
        </div>
      </div>
    </section>
  );
}
