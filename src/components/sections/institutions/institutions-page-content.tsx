import Link from "next/link";

import {
  AudienceConceptHero,
  AudienceInvitationSection,
  AudienceMovesSection,
  AudienceOutcomesSection,
  AudiencePathSection,
  AudienceProseSection,
  AudienceSerifEm,
  AudienceShapeSection,
  AudienceStartingSection,
} from "@/components/sections/audience-concept";
import { OrganizationsSegmentNav } from "@/components/sections/organizations/organizations-segment-nav";

/**
 * For institutions — Concept Modern HTML parity
 * (`docs/html/audience-concept-modern/institutions.html`).
 */
export function InstitutionsPageContent() {
  return (
    <div data-audience="concept-modern" className="text-pretty">
      <OrganizationsSegmentNav />
      <AudienceConceptHero
        label="For institutions navigating coherence across entities, generations, and authority in an AI-disrupted world"
        title={
          <>
            Coherence can no longer be <AudienceSerifEm>assumed</AudienceSerifEm>.
          </>
        }
        subhead="Between institutional drift and premature AI adoption, one move comes first: make the institution legible to itself."
        supportBlocks={
          <>
            <p>Institutions were built to carry meaning across:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>campuses</li>
              <li>regions</li>
              <li>generations</li>
            </ul>
            <p>That work is now under pressure.</p>
            <p>Not because the institution has lost its purpose&mdash;</p>
            <p>but because it has lost the ability to render itself clearly and consistently.</p>
          </>
        }
        errorsBlock={
          <div className="border-t border-b border-border pt-7" aria-labelledby="hero-tension-title">
            <p
              id="hero-tension-title"
              className="max-w-[28ch] text-[clamp(1.35rem,2.8vw,2rem)] font-medium leading-snug tracking-tight text-foreground"
            >
              When it comes to this moment, there are <AudienceSerifEm>two equal errors</AudienceSerifEm>:
            </p>
            <p className="border-t border-border py-3.5 text-[clamp(1.1rem,1.8vw,1.35rem)] text-muted-foreground">
              Attempting to scale authority through AI without a verifiable foundation
            </p>
            <p className="border-t border-b border-border py-3.5 text-[clamp(1.1rem,1.8vw,1.35rem)] text-muted-foreground">
              Continuing to rely on institutional reputation without making that foundation legible
            </p>
            <p className="mt-4 text-[1.05rem] text-muted-foreground">Neither will hold.</p>
          </div>
        }
        ctas={[{ label: "Start with clarity", href: "#stakes", variant: "primary" }]}
        aside={{
          body: (
            <p>
              Institutions that have not gathered their material into a foundation with verifiable provenance are
              indistinguishable, to the public, from well-executed fakes.
            </p>
          ),
          attribution: "The stakes, in one line",
          ariaLabel: "Foundational claim",
        }}
      />

      <AudienceProseSection
        id="stakes"
        variant="section"
        label="What's at risk"
        titleId="stakes-title"
        title="What&rsquo;s at stake"
        containerWidth="narrow"
        className="scroll-mt-(--site-chrome-total)"
      >
        <p>
          Every institution runs on{" "}
          <Link href="/book/read/two-intelligences" className="underline decoration-border decoration-1 underline-offset-4 hover:decoration-foreground">
            two intelligences
          </Link>
          : the <strong>informational</strong> (credentials, archives, decision rationales, accreditation evidence) and the <strong>relational</strong> (alumni, faculty, regional entities, public authority). Both now need to be legible&mdash;to the public, to accreditors, and to the institution itself.
        </p>
        <p>Can an institution still make credible claims about what it is, what it teaches, and what it produces?</p>
        <p>In the AI era:</p>
        <ul>
          <li>content can be generated</li>
          <li>authority can be simulated</li>
          <li>coherence can be mimicked</li>
        </ul>
        <p>Which means:</p>
        <p>
          <strong className="font-medium text-foreground">
            Institutions must now prove what they previously assumed.
          </strong>
        </p>
        <p>Without a foundation:</p>
        <ul>
          <li>credentials drift</li>
          <li>internal disagreement compounds</li>
          <li>public credibility erodes</li>
        </ul>
        <p>Slowly at first. Then suddenly.</p>
      </AudienceProseSection>

      <AudienceProseSection
        id="orientation"
        variant="default"
        label="Reframe"
        titleId="orientation-title"
        title={
          <>
            This is not a <AudienceSerifEm>technical problem</AudienceSerifEm>
          </>
        }
        containerWidth="narrow"
      >
        <p>The instinct is to respond with:</p>
        <ul>
          <li>better systems</li>
          <li>improved reporting</li>
          <li>more consistent communication</li>
        </ul>
        <p>But the fragmentation inside institutions is:</p>
        <ul>
          <li>political</li>
          <li>theological</li>
          <li>historical</li>
        </ul>
        <p>before it is technical.</p>
        <p className="font-serif text-[clamp(1.2rem,2vw,1.45rem)] font-normal italic leading-snug text-foreground">
          Institutions that have not gathered their material into a foundation with verifiable provenance are
          indistinguishable, to the public, from well-executed fakes.
        </p>
      </AudienceProseSection>

      <AudienceShapeSection
        label="The shape of the problem"
        titleId="shape-title"
        title="The shape of your fragmentation"
        lede={
          <>
            <strong className="font-medium text-foreground">
              Institutions carry two layers of fragmentation at once:
            </strong>{" "}
            the operational layer every organization has, and the cross-entity layer unique to institutions&mdash;where
            disagreement has been running&mdash;quietly&mdash;for years.
          </>
        }
        failures={[
          {
            num: "Failure 01",
            title: "Credentialing drift",
            body: "The same credential means different things depending on year, campus, and faculty. Without a foundation, drift is invisible until it matters.",
          },
          {
            num: "Failure 02",
            title: "Cross-entity incoherence",
            body: "Regional bodies drift from the center. Everyone senses it. Few can see it clearly.",
          },
          {
            num: "Failure 03",
            title: "Alumni invisibility",
            body: "Alumni are distributed, influential, and formative&mdash;and almost entirely unstructured.",
          },
          {
            num: "Failure 04",
            title: "Accreditation & regulatory risk",
            body: "Evidence must be reconstructed under pressure. Which reveals how much has never been gathered.",
          },
          {
            num: "Failure 05",
            title: "Archival illegibility",
            body: "The institution has a history. It cannot access it. So debates repeat themselves&mdash;without memory.",
          },
          {
            num: "Failure 06",
            title: "Public credibility fragility",
            body: "Reputation once carried authority. Now: authority requires evidence.",
          },
        ]}
      />

      <AudienceProseSection
        id="authority"
        variant="section"
        label="Why Movemental"
        titleId="authority-title"
        title={
          <>
            Why this cannot be solved <AudienceSerifEm>incrementally</AudienceSerifEm>
          </>
        }
        containerWidth="narrow"
      >
        <p>This is not solved by:</p>
        <ul>
          <li>better documentation alone</li>
          <li>stronger reporting cycles</li>
          <li>improved internal communication</li>
        </ul>
        <p>It requires:</p>
        <ul>
          <li>a canonical foundation</li>
          <li>structured provenance</li>
          <li>cross-entity coherence</li>
        </ul>
        <p>We work at the intersection of:</p>
        <ul>
          <li>institutional leadership</li>
          <li>theological integrity</li>
          <li>governance</li>
          <li>and systems</li>
        </ul>
        <p>Not to simplify the institution&mdash;but to make it legible again.</p>
      </AudienceProseSection>

      <AudiencePathSection
        variant="default"
        label="The discipline of integration"
        titleId="path-title"
        title="There is a way to build this"
        lede={
          <>
            The full trajectory has{" "}
            <Link
              href="/fragmentation"
              className="underline decoration-border decoration-1 underline-offset-4 hover:decoration-foreground"
            >
              six stages
            </Link>
            , and almost every institution stalls at the same transition: fragmentation to integration. Institutions that navigate this well do not begin with scale.
            <br />
            <br />
            <strong className="font-medium text-foreground">They begin with foundation.</strong>
          </>
        }
        stepsEyebrow="The sequence"
        steps={[
          {
            num: "01",
            label: "Safety",
            body: (
              <p>
                <strong className="font-medium text-foreground">Define:</strong> what is authoritative; what is
                protected; what must remain invariant&mdash;across entities.
              </p>
            ),
          },
          {
            num: "02",
            label: "Sandbox",
            body: (
              <p>
                <strong className="font-medium text-foreground">Create environments where:</strong> disagreements can be
                surfaced; structures can be tested; coherence can be explored&mdash;without forcing premature resolution.
              </p>
            ),
          },
          {
            num: "03",
            label: "Skills",
            body: (
              <p>
                <strong className="font-medium text-foreground">Develop leadership capacity to:</strong> hold complexity;
                navigate disagreement; build shared structures&mdash;without collapsing difference.
              </p>
            ),
          },
          {
            num: "04",
            label: "Solutions",
            body: (
              <p>
                <strong className="font-medium text-foreground">Only then build:</strong> systems; schemas;
                AI-supported infrastructure that actually reflect the institution.
              </p>
            ),
          },
        ]}
        coda="The stall usually looks like activity&mdash;new reporting cycles, new strategic plans, new hires. None of it makes the institution legible. That is why the systems fail."
      />

      <AudienceMovesSection
        label="In practice"
        titleId="moves-title"
        title="What this looks like in practice"
        moves={[
          {
            num: "Move 01",
            title: "The cross-entity schema",
            paragraphs: [
              "A canonical structure that makes visible what is shared, what is different, and what is drifting.",
            ],
          },
          {
            num: "Move 02",
            title: "The alumni intelligence layer",
            paragraphs: [
              "Alumni become visible, structured, and connected&mdash;not just a list, but an institutional intelligence.",
            ],
          },
          {
            num: "Move 03",
            title: "The accreditation evidence layer",
            paragraphs: [
              "A standing, living foundation: not reconstructed, not reactive, but continuously maintained.",
            ],
          },
          {
            num: "Move 04",
            title: "Translation infrastructure",
            paragraphs: [
              "The ability to carry coherence across regions, entities, and partners without losing identity.",
            ],
          },
        ]}
      />

      <AudienceOutcomesSection
        id="outcomes"
        label="What changes"
        titleId="outcomes-title"
        title="What becomes possible"
        outcomes={[
          {
            num: "01",
            title: "Credentials become defensible",
            body: "The institution can clearly state what its credentials mean&mdash;now.",
          },
          {
            num: "02",
            title: "Accreditation becomes continuous",
            body: "Not episodic crisis&mdash;but ongoing clarity.",
          },
          {
            num: "03",
            title: "Institutional memory becomes real",
            body: "The institution remembers what it decided, why, and what followed.",
          },
        ]}
      />

      <AudienceStartingSection
        label="Starting point"
        titleId="starting-title"
        title="Start where it is most tractable"
        intro={
          <>
            <p>The instinct is to begin with the most visible work.</p>
            <p>The wiser move is to begin with the most contained.</p>
            <p>
              For most institutions:{" "}
              <strong className="font-medium text-foreground">the accreditation evidence layer</strong>.
            </p>
          </>
        }
        questions={[
          {
            num: "Q. 01",
            prompt:
              "When is your next major review — accreditation, denominational, regulatory, or peer?",
            gloss: "If the answer is less than eighteen months, the accreditation evidence layer is already the first move by default. Start now and the review is the forcing function; wait and the review becomes a fire drill that consumes the resources that would have built the layer.",
          },
          {
            num: "Q. 02",
            prompt:
              "Which decisions made by your institution in the last twenty years have the most load-bearing reasoning currently not written down anywhere?",
            gloss: "Name them. These are the highest-priority captures for the decision-rationale portion of the foundation — the people who remember the reasoning are aging or leaving, and it will not survive another decade without intentional capture.",
          },
          {
            num: "Q. 03",
            prompt: "Which entity is currently most visibly drifting from the center, and which is most tightly aligned?",
            gloss:
              "Name both. The drifting entity is where the translation infrastructure’s absence is costing the most. The aligned entity is where the schema can be piloted with the lowest political friction. Start with the aligned entity. Prove the pattern. Extend.",
          },
        ]}
      />

      <AudienceInvitationSection
        label="Invitation"
        titleId="invitation-title"
        title="Start navigating this well&mdash;before the cost compounds"
        body={
          <>
            <p>Institutions are not failing because they lack knowledge.</p>
            <p>They are failing because they cannot gather and carry it.</p>
            <p>There is a way to rebuild coherence&mdash;without flattening complexity.</p>
          </>
        }
        bodySoft={
          <span className="font-serif text-[clamp(1.35rem,2.4vw,1.85rem)] font-normal italic leading-snug text-foreground">
            An institution more itself&mdash;because its self is finally legible.
          </span>
        }
        primaryCta={{ label: "Start a conversation", href: "/contact" }}
        secondaryCta={{ label: "See the full trajectory", href: "/fragmentation" }}
        tertiaryCta={{ label: "Read the full playbook", href: "/articles/playbook-institution" }}
      />
    </div>
  );
}
