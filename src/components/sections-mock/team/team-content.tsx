/** Team — translated from docs/html/mock-team.html. */

import Image from "next/image";

import { BtnPill, SectionHead } from "@/components/sections-mock/primitives";

interface FounderProfile {
  initials: string;
  name: string;
  role: string;
  location: string;
  bio: string;
  credentials: string[];
  links: { href: string; label: string }[];
  portraitSrc: string;
}

const FOUNDERS: FounderProfile[] = [
  {
    initials: "BB",
    name: "Brad Brisco",
    role: "CEO & Co-founder",
    location: "United States",
    bio: "Brad has shaped how North American churches understand missional transition, covocational church planting, and neighborhood-based mission. Through published books, curriculum, organizational leadership with NAMB's Send Network, and training roles including Forge America and Forge Kansas City. He co-founded the Sentralized conference and keeps an active voice through the Missional Church Network.",
    credentials: [
      "Director, Send Network's missional initiative (NAMB)",
      "Co-founder, Sentralized conference",
      "Co-author, Missional Essentials & Next Door as It Is in Heaven",
      "Trainer, Forge America & Forge Kansas City",
    ],
    links: [
      { href: "#", label: "Missional Church Network →" },
      { href: "#", label: "LinkedIn →" },
    ],
    portraitSrc: "/images/voices/brad-brisco.webp",
  },
  {
    initials: "AH",
    name: "Alan Hirsch",
    role: "Chief Missiologist & Co-founder",
    location: "Six continents",
    bio: "Alan is known for helping the church recover its apostolic nature and rediscover movement as its native expression. His current work translates four decades of frameworks into formational resources that equip leaders wherever they are. Co-founder of the 5Q Collective and Movement Leaders Collective; partner with 100 Movements and Forge across six continents.",
    credentials: [
      "Co-founder, 5Q Collective",
      "Co-founder, Movement Leaders Collective",
      "Author, The Forgotten Ways & The Permanent Revolution",
      "Partner, 100 Movements & Forge",
    ],
    links: [
      { href: "#", label: "alanhirsch.org →" },
      { href: "#", label: "Movement Leaders Collective →" },
    ],
    portraitSrc: "/images/voices/alan-hirsch.webp",
  },
  {
    initials: "JS",
    name: "Joshua Shepherd",
    role: "CTO & Founder",
    location: "United States",
    bio: "Joshua is a writer, formation guide, and the creator of Trail Guide, a hybrid digital and relational ecosystem designed to equip spiritual leaders and imaginative practitioners for life in a rapidly evolving machine age. Not a futurist by training, but a shepherd by instinct. At Movemental he leads product and engineering, translating that posture into infrastructure for thought leaders and formation-minded organizations.",
    credentials: [
      "Founder, Trail Guide",
      "Lead architect, Movemental platform",
      "Writer on AI, formation, and movement leadership",
      "Twenty years building systems for mission-driven orgs",
    ],
    links: [
      { href: "#", label: "Writing →" },
      { href: "#", label: "LinkedIn →" },
    ],
    portraitSrc: "/images/voices/josh-shepherd.webp",
  },
];

export function TeamContent() {
  return (
    <>
      <Hero />
      <Profiles />
      <HowWeWork />
      <VoicesPointer />
      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <section className="band-midnight hero" aria-labelledby="hero-h1">
      <div className="container">
        <p className="eyebrow">The team</p>
        <h1 className="display" id="hero-h1">
          Three people. <em>One posture.</em>
        </h1>
        <p className="lede lede--regular">
          Brad Brisco (CEO and co-founder), Alan Hirsch (Chief Missiologist
          and co-founder), and Joshua Shepherd (CTO and founder) carry the
          work from first call to shipped system. Movement leadership,
          missional theology, and the infrastructure to hold both.
        </p>
        <div className="hero-actions">
          <BtnPill href="/contact" variant="primary">
            Start a conversation
          </BtnPill>
          <BtnPill href="/voices" variant="ghost">
            See trusted voices
          </BtnPill>
        </div>
      </div>
    </section>
  );
}

function Profiles() {
  return (
    <section className="band-default" aria-labelledby="team-h2">
      <div className="container">
        <SectionHead
          eyebrow="Founders"
          display={
            <>
              The people <em>holding the pen</em>.
            </>
          }
          displayId="team-h2"
          lede="Each carries decades of work in missional leadership, AI infrastructure, or both. None of us pretend the other two are unnecessary."
        />
        <div className="profile-grid">
          {FOUNDERS.map((f) => (
            <article key={f.name} className="profile-card">
              <span className="profile-card__portrait relative" aria-hidden="true">
                <Image
                  src={f.portraitSrc}
                  alt=""
                  fill
                  sizes="88px"
                  className="object-cover"
                />
              </span>
              <div>
                <h3 className="profile-card__name">{f.name}</h3>
                <p className="profile-card__role">{f.role}</p>
                <p className="profile-card__location">{f.location}</p>
              </div>
              <p className="profile-card__bio">{f.bio}</p>
              <ul className="profile-card__credentials">
                {f.credentials.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <div className="profile-card__links">
                {f.links.map((l) => (
                  <a key={l.label} href={l.href}>
                    {l.label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowWeWork() {
  return (
    <section className="band-section" aria-labelledby="how-h2">
      <div className="container">
        <div className="split-row">
          <div className="split-row__aside">
            <p className="eyebrow">How we lead</p>
            <p>
              We do not pretend AI is a tools problem. The work is human
              first, technical second, and we lead in that order ourselves.
            </p>
          </div>
          <div>
            <h2 className="display" id="how-h2">
              The same Sequence we ask of you, <em>we walk ourselves</em>.
            </h2>
            <ol className="stages-list">
              <li>
                <strong>Safety.</strong> We do not adopt a tool inside
                Movemental until we have named what it is allowed to touch in
                our own work.
              </li>
              <li>
                <strong>Sandbox.</strong> We run our own Sandbox seasons in
                public. New capabilities ship into our own work before they
                ship to yours.
              </li>
              <li>
                <strong>Skills.</strong> Each of us is forming, not just
                training. The work has changed each of us in identifiable
                ways across the last two years.
              </li>
              <li>
                <strong>Solutions.</strong> Every Solution we offer has been
                used internally first, against our own data, with our own
                staff and trusted voices in the room.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function VoicesPointer() {
  return (
    <section className="band-default" aria-labelledby="voices-h2">
      <div className="container">
        <SectionHead
          eyebrow="Beyond the team"
          display={
            <>
              The work is held by <em>more than three of us</em>.
            </>
          }
          displayId="voices-h2"
          lede="Movemental is a small team and a wider ecosystem. The Trusted Voices network is a separate surface, not a fourth audience. They walk alongside us, not behind us."
        />
        <p>
          <BtnPill href="/voices" variant="ghost">
            See trusted voices
          </BtnPill>
        </p>
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
        <p className="eyebrow">If this resonates</p>
        <h2 className="display" id="cta-h2">
          We would like to hear <em>what you are facing</em>.
        </h2>
        <p className="lede lede--regular">
          A first conversation is thirty minutes. We will tell you in that
          time whether the Sequence is a fit and whether the timing is.
        </p>
        <div className="hero-actions">
          <BtnPill href="/contact" variant="primary">
            Start a conversation
          </BtnPill>
          <BtnPill href="/field-guides" variant="ghost">
            Read the field guide
          </BtnPill>
        </div>
      </div>
    </section>
  );
}
