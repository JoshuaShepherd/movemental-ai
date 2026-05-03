/**
 * Movemental Voices — leaders helping shape the conversation.
 *
 * Reuses the band/recipe chain from /path, /evidence, /work-with-us:
 *   midnight hero → tonal-stacked sections → midnight final CTA.
 * Voices are framed as a circle of credible leaders, not endorsements.
 */

import Image from "next/image";

import { BtnPill, SectionHead } from "@/components/sections-mock/primitives";

type MovementalVoice = {
  name: string;
  descriptor?: string;
  note?: string;
  imageSrc: string;
};

type Principle = {
  title: string;
  body: string;
};

const movementalVoices: readonly MovementalVoice[] = [
  {
    name: "Alan Hirsch",
    descriptor: "Movement thinker and missional author",
    note: "A foundational voice in movemental theology and formation.",
    imageSrc: "/images/voices/alan-hirsch.webp",
  },
  {
    name: "Brad Brisco",
    descriptor: "Missional leader and author",
    note: "A practitioner voice in incarnational mission and organizational imagination.",
    imageSrc: "/images/voices/brad-brisco.webp",
  },
  {
    name: "JR Woodward",
    descriptor: "Church movement leader",
    note: "A leader in multiplication, networks, and movement-building.",
    imageSrc: "/images/voices/jr-woodward.webp",
  },
  {
    name: "Dr. Liz Rios",
    descriptor: "Leader, scholar, and practitioner",
    note: "A voice at the intersection of leadership, formation, and public witness.",
    imageSrc: "/images/voices/liz-rios.webp",
  },
  {
    name: "Dr. Rowland Smith",
    descriptor:
      "National Director, Forge America · Founder, The Pando Collective",
    note: "A practitioner–scholar voice connecting movemental formation with institutional and field leadership.",
    imageSrc: "/images/voices/rowland-smith.webp",
  },
  {
    name: "Lucas Pulley",
    descriptor: "Movements Director, Underground Network",
    note: "A multiplication and network voice grounded in underground and movemental practice.",
    imageSrc: "/images/voices/lucas-pulley.webp",
  },
  {
    name: "Tim Catchim",
    descriptor: "APE practitioner · Co-author, The Permanent Revolution",
    note: "A voice for fivefold ministry, movement DNA, and theology that travels back into the organization.",
    imageSrc: "/images/voices/tim-catchim.webp",
  },
  {
    name: "Rob Wegner",
    descriptor: "Founding Leader, Kansas City Underground",
    note: "A field-shaping voice in underground church, place-based mission, and movement imagination.",
    imageSrc: "/images/voices/rob-wegner.webp",
  },
];

const voicePrinciples: readonly Principle[] = [
  {
    title: "Conversation over promotion",
    body: "This is not about borrowing credibility. It is about gathering serious leaders around serious questions.",
  },
  {
    title: "Formation over hype",
    body: "AI is changing how people think, work, communicate, and trust. These voices help keep the conversation human.",
  },
  {
    title: "Shared discernment",
    body: "No one is pretending the landscape is settled. Movemental is creating space for wise leadership in real time.",
  },
];

const credibilityReasons: readonly Principle[] = [
  {
    title: "Trust is relational",
    body: "People discern credibility through networks of leaders they already recognize and respect.",
  },
  {
    title: "Wisdom is distributed",
    body: "No single leader sees the whole landscape. The conversation is stronger when practitioners, pastors, scholars, and organizational leaders contribute.",
  },
  {
    title: "Movements are carried by people",
    body: "Technology can support the work, but movements still depend on embodied leaders, communities, and trust.",
  },
];

const conversationTopics: readonly string[] = [
  "AI and formation",
  "AI and trust",
  "AI and organizational leadership",
  "AI and theology",
  "AI and mission",
  "AI and human responsibility",
];

export function VoicesContent() {
  return (
    <>
      <Hero />
      <WhatVoicesMeansFold />
      <FeaturedVoicesFold />
      <WhyThisMattersFold />
      <ConversationFold />
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
      aria-labelledby="voices-hero-h1"
    >
      <div className="container">
        <p className="eyebrow">Movemental Voices</p>
        <h1 className="display" id="voices-hero-h1">
          Leaders helping <em>shape this moment.</em>
        </h1>
        <p className="lede lede--regular">
          Movemental is a growing conversation among leaders navigating AI,
          formation, and mission in real time.
        </p>
        <div className="hero-actions">
          <BtnPill href="/contact" variant="primary">
            Start a Conversation
          </BtnPill>
          <BtnPill href="/path" variant="ghost">
            Explore the Path
          </BtnPill>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 2 — What "Voices" Means                                           */
/* -------------------------------------------------------------------------- */

function WhatVoicesMeansFold() {
  return (
    <section
      className="band-default"
      id="what-voices-means"
      aria-labelledby="voices-meaning-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="Not endorsements. Not a logo wall."
          display={
            <>
              These are leaders <em>joining the conversation.</em>
            </>
          }
          displayId="voices-meaning-h2"
          lede="Movemental Voices are not presented as customers, sponsors, or product endorsements. They are leaders engaging the same urgent questions: How do we lead through AI without losing formation, trust, mission, or human responsibility?"
        />

        <p className="prose">
          Their presence matters because this work is not primarily technical.
          It is a leadership and formation challenge. The right conversation
          requires people who have spent years building, pastoring, teaching,
          organizing, and leading movements.
        </p>

        <div className="build-section__grid">
          {voicePrinciples.map((p) => (
            <article key={p.title} className="build-item">
              <h3 className="build-item__title">{p.title}</h3>
              <p className="build-item__body">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 3 — Featured Voices Grid                                          */
/* -------------------------------------------------------------------------- */

function FeaturedVoicesFold() {
  return (
    <section
      className="band-section"
      id="featured-voices"
      aria-labelledby="voices-grid-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="Early voices"
          display={
            <>
              A growing circle <em>of leaders.</em>
            </>
          }
          displayId="voices-grid-h2"
          lede="From zero at launch to a growing group of recognized voices, Movemental is already drawing leaders who understand the stakes of this moment."
        />

        <ul className="matters-section__grid" aria-label="Movemental voices">
          {movementalVoices.map((voice) => (
            <li key={voice.name}>
              <VoiceCard voice={voice} />
            </li>
          ))}
        </ul>

        <p className="matters-section__closing">
          More voices are joining as the conversation develops.
        </p>
      </div>
    </section>
  );
}

function VoiceCard({ voice }: { voice: MovementalVoice }) {
  return (
    <article className="matters-block">
      <div className="relative mb-5 aspect-4/5 w-full max-w-[280px] overflow-hidden rounded-xl bg-muted shadow-sm ring-1 ring-border/40">
        <Image
          src={voice.imageSrc}
          alt={`Portrait of ${voice.name}`}
          width={960}
          height={1200}
          className="h-full w-full object-cover"
          sizes="(max-width: 768px) 100vw, 280px"
        />
      </div>
      <h3 className="matters-block__title">{voice.name}</h3>
      {voice.descriptor ? (
        <p className="problem-card__label">{voice.descriptor}</p>
      ) : null}
      {voice.note ? <p className="matters-block__body">{voice.note}</p> : null}
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 4 — Why This Matters                                              */
/* -------------------------------------------------------------------------- */

function WhyThisMattersFold() {
  return (
    <section
      className="band-default"
      id="why-voices-matter"
      aria-labelledby="voices-why-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="Why voices matter"
          display={
            <>
              AI credibility cannot be carried by{" "}
              <em>one person alone.</em>
            </>
          }
          displayId="voices-why-h2"
          lede="In an AI-saturated environment, polish is cheap and volume is easy. Credibility increasingly comes through trusted relationships, visible alignment, and people willing to stand near the work."
        />

        <div className="build-section__grid">
          {credibilityReasons.map((reason) => (
            <article key={reason.title} className="build-item">
              <h3 className="build-item__title">{reason.title}</h3>
              <p className="build-item__body">{reason.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 5 — The Conversation We Are Building                              */
/* -------------------------------------------------------------------------- */

function ConversationFold() {
  return (
    <section
      className="band-section"
      id="the-conversation"
      aria-labelledby="voices-conversation-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="The shared question"
          display={
            <>
              How do we lead through AI without losing{" "}
              <em>what makes us human?</em>
            </>
          }
          displayId="voices-conversation-h2"
          lede="Movemental exists to help organizations move beyond fearful avoidance and reckless adoption. The Voices page exists because this question cannot be answered by software alone. It requires leaders who understand formation, mission, theology, trust, governance, and organizational life."
        />

        <p className="prose">The conversation includes:</p>
        <ul className="path-step__list" aria-label="Topics in the conversation">
          {conversationTopics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>

        <p className="prose">
          This is not a finished answer. It is a serious conversation taking
          shape.
        </p>
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
      aria-labelledby="voices-final-cta-h2"
    >
      <div className="container final-cta__inner">
        <h2 className="display" id="voices-final-cta-h2">
          Join the conversation by taking the{" "}
          <em>first responsible step.</em>
        </h2>
        <p className="lede lede--regular">
          Start with safety, follow a clear path, and lead your organization
          through AI with people, mission, and trust intact.
        </p>
        <div className="hero-actions final-cta__actions">
          <BtnPill href="/start-with-safety" variant="primary">
            Start with Safety
          </BtnPill>
          <BtnPill href="/contact" variant="ghost">
            Start a Conversation
          </BtnPill>
        </div>
      </div>
    </section>
  );
}
