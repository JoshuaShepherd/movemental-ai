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
 * For churches — Concept Modern HTML parity
 * (`docs/html/audience-concept-modern/churches.html`).
 */
export function ChurchesPageContent() {
  return (
    <div data-audience="concept-modern" className="text-pretty">
      <OrganizationsSegmentNav />
      <AudienceConceptHero
        label={
          <span className="font-serif text-[0.95em] font-normal italic text-foreground">
            For churches navigating formation, care, and memory in an AI-disrupted world
          </span>
        }
        title={
          <>
            Formation cannot remain <AudienceSerifEm>accidental</AudienceSerifEm>.
          </>
        }
        subhead="Between fragmented pastoral reality and premature technological adoption, one move comes first: the foundation underneath both."
        supportBlocks={
          <>
            <p>The work of the church is not broadcast. It is not transaction.</p>
            <p>It is formation over time&mdash;through relationships, memory, and care.</p>
            <p>And that work is now being strained by systems that cannot hold it.</p>
          </>
        }
        errorsBlock={
          <div className="border-t border-b border-border pt-7" aria-label="Two equal errors">
            <p className="max-w-[28ch] text-[clamp(1.35rem,2.8vw,2rem)] font-medium leading-snug tracking-tight text-foreground">
              When it comes to this moment, there are <AudienceSerifEm>two equal errors.</AudienceSerifEm>
            </p>
            <p className="border-t border-border py-3.5 text-[clamp(1.1rem,1.8vw,1.35rem)] text-muted-foreground">
              Attempting to scale ministry through tools without a foundation.
            </p>
            <p className="border-t border-b border-border py-3.5 text-[clamp(1.1rem,1.8vw,1.35rem)] text-muted-foreground">
              Continuing to rely on memory and heroic leadership structures that no longer hold.
            </p>
            <p className="mt-4 text-[1.05rem] text-muted-foreground">Neither will sustain the work of formation.</p>
          </div>
        }
        ctas={[
          { label: "Start with clarity", href: "#stakes", variant: "primary" },
          { label: "See the shape of the problem", href: "#shape", variant: "ghost" },
        ]}
        aside={{
          body: (
            <p>
              &ldquo;Fragmentation is not an efficiency problem. It is pastoral. It is the structural condition in
              which people are being shaped accidentally&mdash;or not at all.&rdquo;
            </p>
          ),
          attribution: "From the playbook",
          ariaLabel: "The diagnosis",
        }}
      />

      <AudienceProseSection
        id="stakes"
        variant="section"
        label="What&rsquo;s at stake"
        titleId="stakes-title"
        title="Can a church sustain real formation over decades without a shared foundation?"
        containerWidth="narrow"
        className="scroll-mt-(--site-chrome-total)"
      >
        <p>
          Every church runs on{" "}
          <Link href="/book/read/two-intelligences" className="underline decoration-border decoration-1 underline-offset-4 hover:decoration-foreground">
            two intelligences
          </Link>
          : the <strong>informational</strong> (theology, curricula, pathways, sermons, decision rationales) and the <strong>relational</strong> (pastoral memory, mentoring, small groups, generational handoff). Most churches are not failing because of theology. They are struggling because:
        </p>
        <ul>
          <li>formation is not structurally carried</li>
          <li>pastoral knowledge is not preserved</li>
          <li>relationships do not compound</li>
          <li>and memory is lost faster than it is built</li>
        </ul>
        <p>The result is not dramatic collapse. It is slow drift.</p>
      </AudienceProseSection>

      <AudienceProseSection
        id="orientation"
        variant="default"
        label="Reframe"
        titleId="orientation-title"
        title={
          <>
            This is not a ministry <AudienceSerifEm>activity</AudienceSerifEm> problem.
          </>
        }
        containerWidth="narrow"
      >
        <p>The instinct is to respond with:</p>
        <ul>
          <li>better programming</li>
          <li>stronger preaching</li>
          <li>more intentional discipleship efforts</li>
        </ul>
        <p>
          But fragmentation is not an efficiency problem. It is pastoral. It is the structural condition in which
          people are being shaped accidentally&mdash;or not at all.
        </p>
      </AudienceProseSection>

      <AudienceShapeSection
        label="The shape of your fragmentation"
        titleId="shape-title"
        title="Six failures, running together."
        lede={
          <>
            <strong className="font-medium text-foreground">
              The intelligence required to shape a congregation intentionally is already present.
            </strong>{" "}
            It is simply scattered beyond what any single pastor can hold. These are the structural failures that
            emerge&mdash;particularly in congregations above a few hundred members.
          </>
        }
        failures={[
          {
            num: "Failure 01",
            title: "Formation gaps",
            body: (
              <>
                The pathway exists in theory. In practice, formation is accidental&mdash;determined by availability,
                memory, and circumstance. No single layer is holding the question:{" "}
                <em className="font-serif italic">Is this person being formed?</em>
              </>
            ),
          },
          {
            num: "Failure 02",
            title: "Pastoral burnout",
            body: "The senior pastor carries the relational memory of the congregation: grief, family dynamics, key moments&mdash;held mostly in one mind. No rhythm of rest can solve a structural problem.",
          },
          {
            num: "Failure 03",
            title: "Sunday-to-weekday fracture",
            body: "Between Sunday&rsquo;s word and Monday&rsquo;s life, there is no bridge. Each person builds their own structure for application. Most do not.",
          },
          {
            num: "Failure 04",
            title: "Generational handoff failure",
            body: "Formation is carried relationally. When the people carrying it leave, the formation leaves with them.",
          },
          {
            num: "Failure 05",
            title: "Stewardship as transactional",
            body: "Financial systems hold transactions. Pastoral systems hold relationships. Without integration, stewardship becomes impersonal&mdash;at exactly the moment it should be most pastoral.",
          },
          {
            num: "Failure 06",
            title: "Cultural-pressure incoherence",
            body: "Different parts of the church hold different assumptions. Alignment is invisible. Misalignment is invisible&mdash;until it breaks.",
          },
        ]}
      />

      <AudienceProseSection
        id="authority"
        variant="section"
        label="Why this requires a different approach"
        titleId="authority-title"
        title={
          <>
            Why this cannot be solved with <AudienceSerifEm>better tools</AudienceSerifEm>.
          </>
        }
        containerWidth="narrow"
      >
        <p>This is not solved by adding:</p>
        <ul>
          <li>a better database</li>
          <li>a communication tool</li>
          <li>a new ministry initiative</li>
        </ul>
        <p>It is solved by building:</p>
        <ul>
          <li>shared memory</li>
          <li>structured formation</li>
          <li>integrated pastoral systems</li>
        </ul>
        <p>
          We work at the intersection of theology, pastoral leadership, formation, and systems&mdash;not to replace
          pastoral work, but to make it sustainable.
        </p>
      </AudienceProseSection>

      <AudiencePathSection
        variant="default"
        label="The discipline of integration"
        titleId="path-title"
        title="There is a way to build this well."
        lede={
          <>
            The full trajectory has{" "}
            <Link
              href="/fragmentation"
              className="underline decoration-border decoration-1 underline-offset-4 hover:decoration-foreground"
            >
              six stages
            </Link>
            , and almost every church stalls at the same transition: fragmentation to integration. Churches that navigate this moment faithfully do not start with tools. They start with foundation.
          </>
        }
        stepsEyebrow="The sequence"
        steps={[
          {
            num: "01",
            label: "Safety",
            body: (
              <>
                <p>Clarify theological, ethical, and relational boundaries.</p>
                <p>What must be protected? What must remain pastoral? What can be structured?</p>
              </>
            ),
          },
          {
            num: "02",
            label: "Sandbox",
            body: (
              <p>
                Create safe environments to explore new patterns: formation structures, pastoral systems, early
                AI-assisted workflows&mdash;without exposing the congregation to risk.
              </p>
            ),
          },
          {
            num: "03",
            label: "Skills",
            body: (
              <p>
                Develop the capacity of leaders to discern wisely, structure ministry intentionally, and use tools
                without distorting the work.
              </p>
            ),
          },
          {
            num: "04",
            label: "Solutions",
            body: (
              <p>Only then implement systems, workflows, and AI-supported layers that actually serve the church&rsquo;s mission.</p>
            ),
          },
        ]}
        coda="The stall usually looks like activity&mdash;new programs, new platforms, new hires. None of it changes the foundation layer. That is why the results do not hold."
      />

      <AudienceMovesSection
        label="In practice"
        titleId="moves-title"
        title="What this looks like in practice."
        moves={[
          {
            num: "Move 01",
            title: "The formation pathways library",
            paragraphs: [
              "A real, shared articulation of formation. Not a diagram. A living structure that connects ministries, anchors theology, and guides people over time.",
            ],
          },
          {
            num: "Move 02",
            title: "The pastoral memory layer",
            paragraphs: [
              "The most delicate and powerful move. Not confidential content. But the relational pattern of care&mdash;structured, shared, and protected.",
            ],
          },
          {
            num: "Move 03",
            title: "The sermon-to-practice bridge",
            paragraphs: [
              "Preaching becomes architectural. Each series carries practices, rhythms, and pathways into the life of the congregation.",
            ],
          },
          {
            num: "Move 04",
            title: "The succession carry-forward",
            paragraphs: [
              "Every pastor leaves. What remains determines whether the church continues or resets. The foundation must carry theology, memory, decisions, and reasoning.",
            ],
          },
        ]}
      />

      <AudienceOutcomesSection
        id="outcomes"
        label="Beyond drift"
        titleId="outcomes-title"
        title="What becomes possible"
        outcomes={[
          {
            num: "01",
            title: "Formation becomes architectural",
            body: "Not mechanical&mdash;but held. The Spirit forms within a structure that persists.",
          },
          {
            num: "02",
            title: "Pastoral load becomes sustainable",
            body: "Memory is shared. Care is distributed. Leadership becomes durable.",
          },
          {
            num: "03",
            title: "Decisions become grounded in reality",
            body: "The church remembers what it has done, and why.",
          },
        ]}
      />

      <AudienceStartingSection
        label="Starting point"
        titleId="starting-title"
        title="Start where the load is heaviest."
        intro={
          <>
            <p>The instinct is to begin with the most visible work. The wiser move is to begin where sustainability is most at risk.</p>
            <p>
              For most churches, this is the <strong className="font-medium text-foreground">pastoral memory layer</strong>.
            </p>
          </>
        }
        questions={[
          {
            num: "Q. 01",
            prompt:
              "Which households would the senior pastor most regret losing track of if she had to step away for three months?",
            gloss: "Name them. That relational intelligence is what most needs a shared foundation first—it is also what is most at risk of being lost in any given season.",
          },
          {
            num: "Q. 02",
            prompt: "What has your elder board decided in the last five years whose reasoning is not written anywhere durable?",
            gloss: "Name the decisions. Capture the reasoning while it still lives in memory; in a decade, unwritten rationale is often unrecoverable.",
          },
          {
            num: "Q. 03",
            prompt: "What is the single most important piece of your formation pathway that still lives only in the senior pastor's head?",
            gloss: "Name it. That becomes the first canonical entry in the formation pathways library—because it is what the next leader (and the congregation) will need to inherit intact.",
          },
        ]}
      />

      <AudienceInvitationSection
        label="Begin"
        titleId="invitation-title"
        title={
          <>
            Start navigating this well&mdash; <AudienceSerifEm>before the cost compounds.</AudienceSerifEm>
          </>
        }
        body={
          <p>
            The church is not called to operate on heroic memory. Nor to outsource formation to systems it does not
            understand. There is a faithful way forward.
          </p>
        }
        bodySoft={
          <span className="font-serif text-[clamp(1.15rem,2vw,1.35rem)] font-normal italic leading-snug text-foreground">
            Less dependent on the accidents of memory. Not less dependent on the Spirit.
          </span>
        }
        primaryCta={{ label: "Start a conversation", href: "/contact" }}
        secondaryCta={{ label: "See the full trajectory", href: "/fragmentation" }}
        tertiaryCta={{ label: "Read the full playbook", href: "/articles/playbook-church" }}
      />
    </div>
  );
}
