"use client";

import type { ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { ChaptersFourThroughEight } from "./claude-skills-chapters-4-8";

function Editorial({ children }: { children: ReactNode }) {
  return (
    <p className="my-8 max-w-[600px] border-l-2 border-pathway-accent py-0 pl-6 font-serif text-xl font-normal italic leading-snug tracking-tight text-safestart-ink">
      {children}
    </p>
  );
}

function ChapterEnd({ n, nextHref, nextLabel }: { n: string; nextHref: string; nextLabel: string }) {
  return (
    <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-safestart-hairline pt-8 text-sm text-safestart-muted">
      <span>End of Chapter {n}</span>
      <Link href={nextHref} className="font-medium text-pathway-accent hover:text-safestart-ink">
        Next: {nextLabel} <em className="not-italic">→</em>
      </Link>
    </div>
  );
}

export function ClaudeSkillsGuideBody() {
  return (
    <>
      <section id="ch-1" className="mb-20 scroll-mt-28 sm:scroll-mt-32">
        <header className="mb-10">
          <span className="mb-4 block font-serif text-sm italic tracking-wide text-pathway-accent">Chapter 01</span>
          <h2 className="font-serif text-[clamp(2rem,4.5vw,2.75rem)] font-normal italic leading-tight tracking-tight text-safestart-ink">
            What a <em>skill</em> actually is.
          </h2>
          <p className="mt-6 max-w-[620px] text-lg leading-relaxed text-safestart-muted">
            Start with a familiar picture before we get to the technical one. A skill is what you build when you stop
            teaching someone a single task and start teaching them <em>how your organization does that kind of task</em>
            .
          </p>
        </header>

        <p className="mb-5 text-base leading-relaxed text-safestart-ink">
          Imagine you have hired a new development associate. She is bright and capable. Her first week, you ask her to
          draft a thank-you letter to a major donor. She writes a perfectly good letter — but it does not sound like your
          organization. The phrasing is generic. The framing is off. It does not reference the donor&apos;s program or her
          giving history the way your letters do.
        </p>
        <p className="mb-5 text-base leading-relaxed text-safestart-ink">
          So you sit with her. You explain how your organization writes thank-you letters. You walk through three
          examples from the last year. You tell her what to never say and why. You name the donor&apos;s program by hand.
          You point her at the database. You explain when to escalate a draft to you before sending and when she can send
          it on her own. By the end of the conversation, she is no longer drafting one letter — she has learned{" "}
          <em>how this organization writes thank-you letters</em>.
        </p>
        <Editorial>
          A skill, in Claude, is the same conversation — written down once so that anyone on your team, talking to Claude,
          gets the same orientation. Voice, examples, rules, the donor database, what counts as done, when to stop and
          escalate. Encoded. Reusable. Visible to everyone who needs it.
        </Editorial>
        <p className="mb-5 text-base leading-relaxed text-safestart-ink">
          That is the whole idea. Not magic. Not engineering. Not &quot;advanced prompting.&quot; Just the patient work of
          writing down — once — how your organization does a particular kind of work, so that the assistant can do that
          work in your voice every time.
        </p>

        <h3 className="mt-12 font-serif text-2xl font-normal italic leading-snug tracking-tight text-safestart-ink">
          What it is not.
        </h3>
        <p className="mb-5 mt-4 text-base leading-relaxed text-safestart-ink">
          A skill is not a long prompt you saved in a Google Doc. The difference matters. Saved prompts depend on
          whoever is at the keyboard remembering to paste them. They drift. They get edited inconsistently across copies.
          Nobody owns them. Nobody knows which version is current. When the person who wrote them leaves, the prompts
          leave too.
        </p>
        <p className="mb-5 text-base leading-relaxed text-safestart-ink">
          A skill is more like a named position in your organization. It has a defined purpose. It has an owner. It has
          rules about when it applies and when it does not. It is versioned, so you know what changed and when. It can be
          updated, reviewed, and retired the way any working document is. The difference between a saved prompt and a
          skill is the difference between someone&apos;s personal habit and your organization&apos;s actual practice.
        </p>

        <div className="my-6 border border-safestart-hairline bg-safestart-surface-container px-6 py-6 sm:px-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-pathway-accent">Working definition</p>
          <p className="mt-2 font-serif text-[22px] font-normal italic leading-snug text-safestart-ink">
            A skill is a named, owned, and reusable description of how your organization does a particular kind of work —
            written so Claude can follow it.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-safestart-ink">
            Four words that do the heavy lifting: <strong className="font-semibold">named</strong> (so people can find
            and refer to it), <strong className="font-semibold">owned</strong> (so someone is responsible for keeping it
            accurate), <strong className="font-semibold">reusable</strong> (the same description works across many uses),
            and <strong className="font-semibold">your organization&apos;s</strong> (it carries your voice, rules, and
            judgment — not a generic template).
          </p>
        </div>

        <h3 className="mt-12 font-serif text-2xl font-normal italic leading-snug tracking-tight text-safestart-ink">
          Why this matters now.
        </h3>
        <p className="mb-5 mt-4 text-base leading-relaxed text-safestart-ink">
          For the first year that most teams used Claude, they used it the way most people start: someone opened a chat
          window, typed a request, and got a response. Useful, but the quality depended entirely on who was at the keyboard
          and how much they had learned about phrasing requests well. The work was real but unrepeatable. The good prompts
          stayed in someone&apos;s head. Two staff members doing the same kind of work produced wildly different results.
        </p>
        <p className="mb-5 text-base leading-relaxed text-safestart-ink">
          Skills are how organizations cross from <em>using AI</em> to <em>working with AI as an institution</em>. The
          technique does not depend on any individual remembering how. The institution holds the knowledge. The institution
          can audit and revise it. The institution can hand it down when staff turn over. That is the move from personal
          habit to organizational practice — and it is the move most mission-driven organizations need to make before any
          AI investment compounds.
        </p>

        <ChapterEnd n="01" nextHref="#ch-2" nextLabel="Where skills fit" />
      </section>

      <section id="ch-2" className="mb-20 scroll-mt-28 sm:scroll-mt-32">
        <header className="mb-10">
          <span className="mb-4 block font-serif text-sm italic tracking-wide text-pathway-accent">Chapter 02</span>
          <h2 className="font-serif text-[clamp(2rem,4.5vw,2.75rem)] font-normal italic leading-tight tracking-tight text-safestart-ink">
            Where skills fit in the picture.
          </h2>
          <p className="mt-6 max-w-[620px] text-lg leading-relaxed text-safestart-muted">
            Skills sit alongside three other things you may have heard about. Knowing which is which will save you many
            confused meetings.
          </p>
        </header>
        <p className="mb-5 text-base leading-relaxed text-safestart-ink">
          The Claude vocabulary has four words that get used interchangeably in casual conversation, and they should not
          be. Each names something different. Each plays a different role. Most of the confusion in introductory AI
          conversations comes from conflating them.
        </p>
        <div className="my-8 border border-safestart-hairline bg-card">
          <AnatomyRow
            kicker="Concept 01"
            title="Chat"
            body="The default. You open a window, type a request, get a response. Chat is the surface on which everything else rests. A single chat conversation is ephemeral — it ends, it goes away, and Claude does not remember it next time you talk."
          />
          <AnatomyRow
            kicker="Concept 02"
            title="Project"
            body="A workspace for an ongoing stream of work. You can add reference files (a style guide, a donor history, prior board memos), set custom instructions for that workspace, and reuse the setup across many chat conversations. Projects are where context lives across sessions. They are scoped to a specific initiative or person."
          />
          <AnatomyRow
            kicker="Concept 03"
            title="Skill"
            body="A reusable description of how to do a particular kind of work. Skills are not tied to one project. The same skill can be invoked across many projects, many staff members, many situations. Skills travel."
          />
          <AnatomyRow
            kicker="Concept 04"
            title="Artifact"
            body="An editable document or interactive object Claude produces alongside the chat. When Claude writes a draft of a grant proposal, that draft can live as an artifact you keep refining together. Artifacts are the things skills produce; skills are the recipes for producing them."
            last
          />
        </div>
        <h3 className="mt-12 font-serif text-2xl font-normal italic leading-snug tracking-tight text-safestart-ink">
          A simple way to remember.
        </h3>
        <p className="mb-5 mt-4 text-base leading-relaxed text-safestart-ink">
          Chat is the conversation. Project is the room where ongoing conversations happen. Skill is the method the
          assistant uses inside the room. Artifact is the document that comes out of the conversation.
        </p>
        <p className="mb-5 text-base leading-relaxed text-safestart-ink">
          These are not competing concepts. They work together. A development associate opens a chat. She is in the Major
          Donor Cultivation project, which already has the donor history and giving database loaded as reference. She
          invokes the Thank-You Letter Drafting skill. Claude follows the skill&apos;s instructions to produce a thank-you
          letter, which appears as an artifact she can edit before sending. Four concepts. One workflow. Each one doing its
          specific job.
        </p>
        <h3 className="mt-12 font-serif text-2xl font-normal italic leading-snug tracking-tight text-safestart-ink">
          Why the distinction matters for leadership.
        </h3>
        <p className="mb-5 mt-4 text-base leading-relaxed text-safestart-ink">
          Because where you put your effort changes what compounds in your organization. Investing in good chat habits
          compounds in <em>one person</em>. Investing in good projects compounds in <em>one initiative</em>. Investing in
          good skills compounds across the whole organization — every person, every initiative, every conversation that
          uses the skill gets the benefit. Skills are the unit of organizational investment.
        </p>
        <Editorial>
          If you remember nothing else from this chapter: skills are where your organization&apos;s voice, judgment, and
          accumulated wisdom live so they can be applied at scale. The other three things are real, but they do not scale
          your organization the way skills do.
        </Editorial>
        <ChapterEnd n="02" nextHref="#ch-3" nextLabel="The four levels of maturity" />
      </section>

      <section id="ch-3" className="mb-20 scroll-mt-28 sm:scroll-mt-32">
        <header className="mb-10">
          <span className="mb-4 block font-serif text-sm italic tracking-wide text-pathway-accent">Chapter 03</span>
          <h2 className="font-serif text-[clamp(2rem,4.5vw,2.75rem)] font-normal italic leading-tight tracking-tight text-safestart-ink">
            The four levels of skill <em>maturity</em>.
          </h2>
          <p className="mt-6 max-w-[620px] text-lg leading-relaxed text-safestart-muted">
            The word &quot;skill&quot; gets applied to four very different things. Each is legitimate. None is final.
            Knowing which level you are operating at is more important than picking the most advanced one.
          </p>
        </header>
        <p className="mb-5 text-base leading-relaxed text-safestart-ink">
          Most organizations move through these four levels in order, over months or years. Trying to jump from level one
          to level four usually fails — not because the technology is missing, but because the organizational habits
          required for the higher levels have not been built. Read the ladder honestly. Place your organization where it
          actually is, not where you wish it were.
        </p>
        <Ladder />
        <h3 className="mt-12 font-serif text-2xl font-normal italic leading-snug tracking-tight text-safestart-ink">
          Where most organizations actually are.
        </h3>
        <p className="mb-5 mt-4 text-base leading-relaxed text-safestart-ink">
          Honestly: somewhere between A and B, with occasional flashes of C in one or two motivated teams. That is normal
          for the current moment. Most organizations have not yet built the habit of writing down their methods explicitly
          enough to register them as organizational skills. The work of getting to level D is partly technical — learning
          the format — but mostly organizational. It requires writing down what your organization actually believes, in
          language that survives without the person who wrote it.
        </p>
        <p className="mb-5 text-base leading-relaxed text-safestart-ink">
          The Movemental Sandbox engagement is, in significant part, the structured process of getting your organization
          from level B to level D for a small handful of the right use cases. The path matters. Jumping straight to D
          without the discovery work that the Sandbox provides is how organizations build elaborate skills for use cases
          that turn out not to matter — and miss the use cases that actually do.
        </p>
        <h3 className="mt-12 font-serif text-2xl font-normal italic leading-snug tracking-tight text-safestart-ink">
          A higher level you may hear about.
        </h3>
        <p className="mb-5 mt-4 text-base leading-relaxed text-safestart-ink">
          There is a fifth level we are intentionally leaving out of the main ladder: skills coupled to code, with the
          ability to take actions in other software systems on their own. This is real and powerful and the right answer
          for a small handful of advanced use cases. It is also where most organizations get into trouble by adopting it
          too early. Until your organization can confidently operate at level D — with skills your team is using well, with
          governance you can audit, with use cases that have proven their value — leave the fifth level alone. We will
          return to it briefly in Chapter 08.
        </p>
        <ChapterEnd n="03" nextHref="#ch-4" nextLabel="The anatomy of a real skill" />
      </section>

      <ChaptersFourThroughEight />
    </>
  );
}

function AnatomyRow({
  kicker,
  title,
  body,
  last,
}: {
  kicker: string;
  title: string;
  body: string;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid border-safestart-hairline md:grid-cols-[200px_minmax(0,1fr)]",
        !last && "border-b",
      )}
    >
      <div className="border-safestart-hairline bg-safestart-surface-container px-5 py-5 md:border-r md:border-b-0">
        <span className="block font-body text-[10px] font-bold uppercase tracking-[0.08em] text-pathway-accent">
          {kicker}
        </span>
        <span className="mt-1 block font-serif text-base italic tracking-tight text-safestart-ink">{title}</span>
      </div>
      <div className="px-5 py-5 text-sm leading-relaxed text-safestart-muted">
        <p className="m-0 text-sm leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

function Ladder() {
  const rungs = [
    {
      letter: "A",
      title: "The snippet library.",
      body: "Useful prompts saved in a shared document somewhere — Notion, Google Docs, a wiki. People copy and paste them when they remember. There is no contract, no owner, no versioning. Whoever is at the keyboard chooses what to use.",
      tag: "Personal",
      tagClass: "border border-safestart-hairline bg-safestart-surface-container text-safestart-muted",
    },
    {
      letter: "B",
      title: "The saved prompt.",
      body: "A single carefully-written instruction the person stores in Claude itself or in a personal workspace, then pastes when they remember. Better than copy-paste from a doc, because it lives where the work happens. Still personal, still dependent on the individual remembering to use it.",
      tag: "Personal",
      tagClass: "border border-safestart-hairline bg-safestart-surface-container text-safestart-muted",
    },
    {
      letter: "C",
      title: "The project-scoped instruction.",
      body: "Instructions attached to a specific project or workspace, so anyone working in that project sees them automatically. Good for one initiative — the Major Donor Cultivation project, the Board Materials project — but it does not travel across initiatives. Different teams reinvent the same instruction repeatedly.",
      tag: "Team",
      tagClass: "border border-pathway-accent/60 bg-pathway-accent/15 text-foreground",
    },
    {
      letter: "D",
      title: "The registered organizational skill.",
      body: "A named, owned skill with a clear purpose, a documented method, an owner, a version history, and a defined scope. Available across the whole organization. Anyone who needs it can find it. Anyone who has feedback knows who to send it to. The skill survives staff turnover because it is owned by the organization, not by an individual.",
      tag: "Organizational",
      tagClass: "bg-movemental-midnight text-safestart-bg",
    },
  ];
  return (
    <div className="my-8">
      {rungs.map((r) => (
        <div
          key={r.letter}
          className="grid grid-cols-[40px_1fr] gap-4 border-b border-safestart-hairline py-6 sm:grid-cols-[60px_1fr_auto] sm:gap-6"
        >
          <div className="font-serif text-3xl italic leading-none text-pathway-accent sm:text-[42px]">{r.letter}</div>
          <div className="min-w-0 pt-1">
            <h4 className="font-serif text-xl font-normal italic tracking-tight text-safestart-ink">{r.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-safestart-muted">{r.body}</p>
          </div>
          <span
            className={cn(
              "col-span-2 mt-2 justify-self-start px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] sm:col-span-1 sm:mt-0 sm:justify-self-end sm:self-start",
              r.tagClass,
            )}
          >
            {r.tag}
          </span>
        </div>
      ))}
    </div>
  );
}
