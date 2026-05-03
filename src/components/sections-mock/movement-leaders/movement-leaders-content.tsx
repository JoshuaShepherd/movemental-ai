/** Movement leaders definitional page — translated from
 *  docs/html/mock-movement-leaders.html. */

import Link from "next/link";

import { BtnPill, SectionHead } from "@/components/sections-mock/primitives";

export function MovementLeadersContent() {
  return (
    <>
      <Hero />
      <DefinitionFold />
      <EcosystemFold />
      <PractitionerFitFold />
      <PointerToVoices />
      <EditorialBoundary />
      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <section className="band-midnight hero" aria-labelledby="hero-h1">
      <div className="container">
        <p className="eyebrow">Trusted voices · Definition</p>
        <h1 className="display" id="hero-h1">
          What we mean by <em>movement leader</em>.
        </h1>
        <p className="lede lede--regular">
          Movement leaders are not a fourth audience. They are an ecosystem
          layer — practitioners whose discipleship of place and people gives
          weight to whatever Movemental publishes. This page is for the
          practitioner trying to read whether what we are building fits how
          they already work.
        </p>
        <div className="hero-actions">
          <BtnPill href="/voices" variant="primary">
            See the named voices
          </BtnPill>
          <BtnPill href="/field-guide" variant="ghost">
            Read the field guide
          </BtnPill>
        </div>
        <div className="hero-proof">
          <span className="hero-proof__label">Editorial posture</span>
          <span>
            This page is descriptive, not recruiting. There is no form below
            it, by design.
          </span>
        </div>
      </div>
    </section>
  );
}

const FACETS = [
  {
    label: "Facet 01",
    title: "Originator of practice.",
    body: "Has actually built something. A church, a network, a fellowship, a body of writing, an institution. Not theorizing about what should be done — already in motion, already accountable to people whose names you can find in their context.",
  },
  {
    label: "Facet 02",
    title: "Steward of relationship.",
    body: "Carries weight inside a network of peers and proteges who answer when they call. The peer credibility flows in both directions: they did not assemble it; it assembled around how they have shown up over time.",
  },
  {
    label: "Facet 03",
    title: "Witness to a sequence.",
    body: "Has lived through enough cycles — staff generations, donor seasons, theological turns — to recognize when an organization is repeating a mistake versus making a new one. Useful for AI specifically because most leaders, founders included, have not yet.",
  },
];

function DefinitionFold() {
  return (
    <section
      className="band-default"
      id="definition"
      aria-labelledby="definition-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="The definition"
          display={
            <>
              Three things <em>at once</em>.
            </>
          }
          displayId="definition-h2"
          lede="Borrowing from the missiology around movement DNA: a movement leader is, in the same person, an originator of practice, a steward of relationship, and a witness to a sequence of decisions over time."
        />
        <div className="problem-grid">
          {FACETS.map((f) => (
            <article key={f.label} className="problem-card">
              <p className="problem-card__label">{f.label}</p>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EcosystemFold() {
  return (
    <section
      className="band-section"
      id="ecosystem"
      aria-labelledby="ecosystem-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="Where this fits"
          display={
            <>
              An ecosystem layer, <em>not a funnel</em>.
            </>
          }
          displayId="ecosystem-h2"
          lede="Movemental serves three implementation audiences: churches, nonprofits, and institutions. Movement leaders sit alongside that work, not inside it."
        />

        <p className="prose" style={{ marginTop: "1.75rem" }}>
          Movement leaders do not buy engagements the way a church or a
          nonprofit does. They are present in the conversation because their
          judgment about how AI is unfolding inside the church, the academy,
          and the missional sector is already worth more than a
          consultant&rsquo;s certainty in a field that is barely three years
          old. The two layers serve each other — but they are not the same
          layer, and treating them as the same is the most common way
          conversations like this go wrong.
        </p>

        <div className="versus-grid">
          <article className="versus-col versus-col--theirs">
            <p className="versus-col__title">How an audience layer works</p>
            <ul>
              <li>Buys engagements.</li>
              <li>
                Has a board, elders, or executive team that ratifies posture.
              </li>
              <li>
                Walks the AI Stewardship Sequence inside the organization.
              </li>
              <li>Carries the Sequence forward by example.</li>
            </ul>
          </article>
          <article className="versus-col versus-col--ours">
            <p className="versus-col__title">How an ecosystem layer works</p>
            <ul>
              <li>Reads our work in public, criticizes it in public.</li>
              <li>
                Brings the rest of their network with them when they do.
              </li>
              <li>Lends judgment, not an organizational logo.</li>
              <li>
                Calls when something is misnamed; we change it on the page.
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

function PractitionerFitFold() {
  return (
    <section className="band-default" id="fit" aria-labelledby="fit-h2">
      <div className="container">
        <SectionHead
          eyebrow="Who reads this page well"
          display={
            <>
              Three signs this work fits the{" "}
              <em>shape of your practice</em>.
            </>
          }
          displayId="fit-h2"
          lede="Practitioner fit, not application criteria. There is nothing to apply to."
        />
        <ol className="stages-list">
          <li>
            <strong>You are already named in the discourse.</strong> If you are
            reading this and thinking &ldquo;I have not opted in to
            anything&rdquo; — that is the right read. Movement leaders who fit
            Movemental&rsquo;s framing are people who would have shown up in
            the conversation with or without an org chart.
          </li>
          <li>
            <strong>
              You are willing to have your judgment cited, not just your name.
            </strong>{" "}
            We do not run on logos. The trust we are building is the kind
            where we can write &ldquo;X has reservations about how we are
            framing Y&rdquo; and have that be more useful than a quote of
            agreement.
          </li>
          <li>
            <strong>You are not looking for a roster.</strong> If you are
            looking for a place that recruits, certifies, and lists movement
            leaders, you are looking for a different kind of organization. We
            are not that, by design, and we do not plan to become that.
          </li>
        </ol>
      </div>
    </section>
  );
}

function PointerToVoices() {
  return (
    <section className="band-section" id="voices" aria-labelledby="voices-h2">
      <div className="container">
        <SectionHead
          eyebrow="Trusted voices"
          display={
            <>
              Where these names are <em>visible</em>.
            </>
          }
          displayId="voices-h2"
          lede="Movemental's named ecosystem layer is published, with bios and roles, on the Trusted voices page."
        />
        <p className="prose" style={{ marginTop: "1.5rem" }}>
          There is no separate roster. There is no nominate-a-leader form.
          There is no application. The page is curated on the basis of
          published practice and ongoing relationship — and the curation is
          editable on request from the people on it. If someone is on the page
          who should not be, or someone is not on the page who should be, that
          conversation goes through the same door as everything else.
        </p>
        <div className="btn-row">
          <BtnPill href="/voices" variant="ghost">
            See the trusted voices
          </BtnPill>
        </div>
      </div>
    </section>
  );
}

function EditorialBoundary() {
  return (
    <section
      className="band-default"
      id="boundary"
      aria-labelledby="boundary-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="What this page is not"
          display={
            <>
              The line, <em>on the page</em>.
            </>
          }
          displayId="boundary-h2"
          lede="Easier to drift past a line that lives in someone's head than a line that lives in print."
        />

        <aside className="evidence-note">
          <p className="evidence-note__label">Editorial note</p>
          <p className="evidence-note__body">
            This page does not ask you to do anything. There is no form below
            this section. There is no calendar to book. We do not collect
            interest. We do not maintain a recruitment list. We do not
            certify, license, or commission movement leaders, and we will not
            in the future.{" "}
            <strong>
              If a future version of this site adds those surfaces, we will
              have stopped meaning what we mean by &ldquo;movement
              leader.&rdquo;
            </strong>{" "}
            That is the line, and we are publishing it here so it is harder to
            drift across.
          </p>
          <p className="evidence-note__caveat">
            The named ecosystem of movement leaders is on the{" "}
            <Link
              href="/voices"
              style={{ color: "var(--primary)", fontStyle: "normal" }}
            >
              Trusted voices page
            </Link>
            ; the implementation audiences are at{" "}
            <Link
              href="/who-we-serve"
              style={{ color: "var(--primary)", fontStyle: "normal" }}
            >
              Who we serve
            </Link>
            .
          </p>
        </aside>
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
        <p className="eyebrow">If you came here to talk to us</p>
        <h2 className="display" id="cta-h2">
          Talk to us as practitioners, <em>not as candidates</em>.
        </h2>
        <p className="lede lede--regular">
          If your organization is in motion and you want to think about AI
          alongside us, the conversation goes through the same door as
          everyone else&rsquo;s. We do not have a separate track for movement
          leaders, on purpose.
        </p>
        <div className="hero-actions">
          <BtnPill href="/contact" variant="primary">
            Start a conversation
          </BtnPill>
          <BtnPill href="/field-guide" variant="ghost">
            Read the field guide
          </BtnPill>
        </div>
      </div>
    </section>
  );
}
