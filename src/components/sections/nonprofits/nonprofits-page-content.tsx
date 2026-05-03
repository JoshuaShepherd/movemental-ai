import Link from "next/link";

import {
  AudienceConceptHero,
  AudienceErrorsBand,
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
 * For nonprofits — Concept Modern HTML parity
 * (`docs/html/audience-concept-modern/nonprofits.html`).
 */
export function NonprofitsPageContent() {
  return (
    <div data-audience="concept-modern" className="text-pretty">
      <OrganizationsSegmentNav />
      <AudienceConceptHero
        label="For nonprofits navigating AI with mission, money, and memory at stake"
        title="Integration is no longer optional."
        subhead="Between fragmented systems and premature AI adoption, one move comes first: the foundation underneath both."
        ctas={[{ label: "Start with clarity", href: "#invitation", variant: "primary" }]}
        aside={{
          body: (
            <>
              <p>You are being asked to lead in a moment your organization was not built for.</p>
              <p>Not just to raise more money.</p>
              <p>Not just to run better programs.</p>
              <p>
                But to hold together mission, relationships, and knowledge in a system that can actually
                scale.
              </p>
            </>
          ),
          ariaLabel: "Leadership moment",
        }}
      />

      <AudienceErrorsBand
        sectionId="nonprofit-tension"
        titleId="nonprofits-tension-title"
        label="The moment"
        title={
          <>
            When it comes to this moment, there are <AudienceSerifEm>two equal errors</AudienceSerifEm>:
          </>
        }
        pairLines={[
          "Plunging ahead into tools without a foundation.",
          "Standing still inside systems that are already breaking.",
        ]}
        coda="Neither will hold."
      />

      <AudienceProseSection
        id="stakes"
        variant="default"
        label="What&rsquo;s actually at risk"
        titleId="stakes-title"
        title="What&rsquo;s at stake"
        containerWidth="narrow"
        className="scroll-mt-(--site-chrome-total)"
      >
        <p>
          Every nonprofit runs on{" "}
          <Link href="/book/read/two-intelligences" className="underline decoration-border decoration-1 underline-offset-4 hover:decoration-foreground">
            two intelligences
          </Link>
          : the <strong className="font-medium text-foreground">informational</strong> (case evidence, program data, grant narratives, institutional memory) and the <strong className="font-medium text-foreground">relational</strong> (donors, beneficiaries, staff, board, partners).
        </p>
        <p>Most nonprofits are not failing because of effort. They are failing because both intelligences are fragmented:</p>
        <ul>
          <li>knowledge is trapped in people</li>
          <li>systems don&apos;t connect</li>
          <li>relationships don&apos;t compound</li>
          <li>and every year, more is lost than is built</li>
        </ul>
      </AudienceProseSection>

      <AudienceProseSection
        id="orientation"
        variant="section"
        label="Reframe the problem"
        titleId="orientation-title"
        title={
          <>
            This is not a <AudienceSerifEm>tools problem</AudienceSerifEm>.
          </>
        }
        containerWidth="narrow"
      >
        <p>The instinct is to solve this with:</p>
        <ul>
          <li>a better CRM</li>
          <li>a new AI tool</li>
          <li>a more disciplined process</li>
        </ul>
        <p>But the real issue is structural.</p>
        <p>What looks like separate problems&mdash;fundraising gaps, program misalignment, staff turnover, inconsistent storytelling&mdash;</p>
        <p>is actually one problem:</p>
        <p>
          <strong>The organization does not have a shared foundation.</strong>
        </p>
        <p>And without that foundation, nothing compounds.</p>
      </AudienceProseSection>

      <AudienceShapeSection
        label="Structural reality"
        titleId="shape-title"
        title="The shape of your fragmentation"
        lede={
          <>
            <strong className="font-medium text-foreground">
              The surface problems differ by organization. The structure does not.
            </strong>{" "}
            Six failures tend to run together&mdash;quietly compounding each year the foundation goes unbuilt.
          </>
        }
        failures={[
          {
            num: "Failure 01",
            title: "Donor amnesia",
            body: "The CRM holds transactions. It does not hold relationships. The details that matter&mdash;family, priorities, promises&mdash;live in individual memory. When people leave, that memory leaves with them.",
          },
          {
            num: "Failure 02",
            title: "Program-development split",
            body: "Program teams hold reality. Development teams need to represent it. Without a shared system, the gap fills with approximation&mdash;and donors meet a version that doesn&apos;t quite match the work.",
          },
          {
            num: "Failure 03",
            title: "Mid-tier giving drift",
            body: "Major gifts are relational. Annual fund is broadcast. Mid-tier sits in between&mdash;and quietly underperforms&mdash;because it has neither system.",
          },
          {
            num: "Failure 04",
            title: "Story starvation",
            body: "You generate hundreds of stories. You can access a handful. The rest are lost in conversations, notes, unlabeled assets. So the same stories get reused&mdash;until they stop working.",
          },
          {
            num: "Failure 05",
            title: "Staff turnover amplified",
            body: "Turnover doesn&apos;t just cost time. It erases context, relationships, decisions already made. The loss becomes visible later&mdash;when someone hits a problem that was already solved.",
          },
          {
            num: "Failure 06",
            title: "Board-staff asymmetry",
            body: "Boards see summaries. Staff live reality. Without a shared foundation, both operate on different versions of the organization.",
          },
        ]}
      />

      <AudienceProseSection
        id="authority"
        variant="section"
        label="Why Movemental"
        titleId="authority-title"
        title="Why this requires a different approach"
        containerWidth="narrow"
        className="scroll-mt-(--site-chrome-total)"
      >
        <p>This is not solved by adding tools. It is solved by building four load-bearing artifacts underneath them:</p>
        <ul>
          <li>a <strong>library</strong> — one queryable corpus of programs, evaluations, grants, and board packets</li>
          <li>a <strong>graph</strong> — one legible map of donors, beneficiaries, staff, and partners</li>
          <li>a <strong>voice</strong> — one articulated narrative so development, program, and governance sound like the same organization</li>
          <li><strong>pathways</strong> — durable rails that move donors, partners, and beneficiaries from first contact to carried responsibility</li>
        </ul>
        <p>This is the work at the seam of the two intelligences &mdash; where information is structured and relationship is held. Not a trend to chase. A transition to navigate carefully.</p>
      </AudienceProseSection>

      <AudiencePathSection
        variant="default"
        label="The discipline of integration"
        titleId="path-title"
        title={
          <>
            How integration <AudienceSerifEm>gets built</AudienceSerifEm>
          </>
        }
        lede={
          <>
            The full trajectory has{" "}
            <Link
              href="/fragmentation"
              className="underline decoration-border decoration-1 underline-offset-4 hover:decoration-foreground"
            >
              six stages
            </Link>
            &mdash; and almost every organization stalls at the same transition: fragmentation to integration. This is what integration actually looks like from the inside.
            <br />
            <br />
            <strong className="font-medium text-foreground">Not speed first. Not tools first.</strong>
            <br />
            <br />
            <strong className="font-medium text-foreground">Foundation first.</strong>
          </>
        }
        steps={[
          {
            num: "01",
            label: "Safety",
            body: "Define what is acceptable, aligned, and protected. Policies, theology, data boundaries&mdash;before action.",
          },
          {
            num: "02",
            label: "Sandbox",
            body: "Create structured environments to explore safely. Learn what works without exposing the organization to risk.",
          },
          {
            num: "03",
            label: "Skills",
            body: "Develop the human capability to think, decide, and act well with AI. Not just training&mdash;formation.",
          },
          {
            num: "04",
            label: "Solutions",
            body: "Only then deploy tools, workflows, and systems that actually fit. What works here is different because the foundation exists.",
          },
        ]}
        coda="The stall usually looks like activity&mdash;new documents, new platforms, new hires. None of it changes the foundation layer. That is why the results don&apos;t hold."
      />

      <AudienceMovesSection
        label="In practice"
        titleId="moves-title"
        title="What this looks like in practice"
        lede="Once the foundation is in place, integration becomes possible."
        moves={[
          {
            num: "Move 01",
            title: "Relational foundation for mid-tier donors",
            paragraphs: [
              "Capture and structure the soft knowledge that drives giving. Not owned by individuals&mdash;held by the organization.",
            ],
          },
          {
            num: "Move 02",
            title: "Story pipeline",
            paragraphs: [
              "Create a real connection between program and development. With consent, structure, and repeatable capture.",
            ],
          },
          {
            num: "Move 03",
            title: "Integrated evaluation layer",
            paragraphs: [
              "Enter outcomes once. Use them everywhere. Shift from reporting → memory.",
            ],
          },
          {
            num: "Move 04",
            title: "Private AI layer (RAG)",
            paragraphs: [
              "Make the organization&apos;s knowledge accessible: private, permissioned, source-grounded.",
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
            title: "Staff transitions stop being catastrophic",
            body: "Knowledge persists. The organization absorbs change.",
          },
          {
            num: "02",
            title: "Fundraising becomes grounded",
            body: "Every output draws from the same foundation. Consistency replaces drift.",
          },
          {
            num: "03",
            title: "Alignment stops requiring heroics",
            body: "Decisions reference shared reality. Meetings get shorter. Outcomes get better.",
          },
        ]}
      />

      <AudienceStartingSection
        label="Starting point"
        titleId="starting-title"
        title="Start where you are"
        intro={
          <>
            <p>The instinct is to do everything at once. The right move is to start with one foundation that works.</p>
            <p>
              For most organizations, that is{" "}
              <strong className="font-medium text-foreground">the relational layer for mid-tier donors</strong>. Six to
              nine months is a realistic window to prove the foundation. From there, the rest becomes possible.
            </p>
            <p>Three diagnostic questions:</p>
          </>
        }
        questions={[
          {
            num: "Q. 01",
            prompt:
              "Who on your team holds mid-tier donor intelligence in their head—the kind that would take years to reconstruct if they left tomorrow?",
            gloss: "Often the director of development, the ED, or a major-gifts lead. That knowledge is your first foundation input.",
          },
          {
            num: "Q. 02",
            prompt: "What is your actual mid-tier retention over the last five years?",
            gloss: "Many teams cannot produce the number quickly. If you cannot, that gap is itself a signal about the foundation.",
          },
          {
            num: "Q. 03",
            prompt: "What is the one story-capture rhythm your program team would actually sustain?",
            gloss: "Not the ideal process—the one a busy program lead will keep: a short weekly note, a monthly conversation, a cohort exit template. Build the pipeline around a rhythm you will execute.",
          },
        ]}
      />

      <AudienceInvitationSection
        label="Invitation"
        titleId="invitation-title"
        title={
          <>
            Start navigating this well&mdash; <AudienceSerifEm>before the cost compounds</AudienceSerifEm>
          </>
        }
        body={
          <>
            <p>You don&apos;t need to solve everything. You need to take the first step&mdash;with clarity.</p>
            <p>Don&apos;t guess your way through this.</p>
          </>
        }
        primaryCta={{ label: "Start with clarity", href: "/contact" }}
        secondaryCta={{ label: "See the full trajectory", href: "/fragmentation" }}
        tertiaryCta={{ label: "Read the full playbook", href: "/articles/playbook-nonprofit" }}
      />
    </div>
  );
}
