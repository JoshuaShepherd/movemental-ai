import type { ReactNode } from "react";
import Link from "next/link";

import styles from "../research.module.css";

function Cite({ n, title }: { n: number; title: string }) {
  return (
    <Link href="/research/sources" className={styles.citationSup} title={title}>
      [{n}]
    </Link>
  );
}

function ResearchLink({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <Link href={`/research/${slug}`} className={styles.textInkBlue}>
      {children}
    </Link>
  );
}

/** Paper — ported from `docs/articles/graded-high/85-99/sandbox-discovery.md`. */
export const sandboxDiscoveryBody: ReactNode = (
  <>
    <p className={styles.dropCap} id="section-summary">
      Most organizations meet AI through <strong>demos, pilots, or scattered personal use</strong> —
      learning that never compounds because it has no shared memory, no governance baseline, and no exit
      criteria.
    </p>

    <p>
      <strong>Sandbox Discovery</strong> is the second stage of{" "}
      <strong>Safety → Sandbox → Skills → Solutions</strong>. It is structured experimentation{" "}
      <strong>after</strong> Safety defines what may and may not be touched — not permissionless play,
      not shadow IT with better branding.
    </p>

    <p>
      <strong>What a real sandbox requires:</strong> tooling Safety already configured; synthetic or
      public inputs (not live restricted data); outputs reviewed before anything external; learning
      captured in <strong>shared artifacts</strong>, not individual inboxes. Miss any of those four and
      you have experimentation, not a sandbox.
    </p>

    <p>
      <strong>What the stage produces:</strong> prioritized use cases, experiment briefs, measurement
      and risk notes, and a <strong>draft playbook</strong> — plus a <strong>graduation gate</strong> that
      decides what may advance to Skills or Solutions.
    </p>

    <p>
      <strong>Sourced anchor:</strong> Randomized consultant experiments show AI can produce{" "}
      <strong>phantom expertise</strong> — confident wrong output — especially when junior staff use tools
      without senior verification <Cite n={32} title="BCG · Sept 2024" />. That is why sandbox work must
      stay bounded and logged before it touches donors, boards, or pastoral edges.
    </p>

    <p>
      <strong>Honest limit:</strong> The four outputs and graduation checklist are{" "}
      <strong>Movemental operational synthesis</strong> — tested in practice, not a published academic
      framework.
    </p>

    <h3 id="section-evolution">The evolution from Discovery Lab</h3>

    <p>
      The first version of this stage — the Discovery Lab — framed itself as a nonprofit&rsquo;s AI entry
      point. Four weeks, four outputs: prioritized use cases, experiment briefs, measurement and risk
      notes, an internal playbook draft. The argument then was that <strong>learning-first beats
      tool-first and strategy-first</strong>. That remains correct.
    </p>

    <p>
      What the original framing got wrong is <strong>position in the sequence</strong>. Organizations that
      begin with experimentation before a governance baseline learn the wrong lessons — or learn the
      right lessons from <strong>incidents they caused</strong>.
    </p>

    <p>
      In <strong>Safety → Sandbox → Skills → Solutions</strong>, Sandbox Discovery is <strong>second</strong>,
      not first. Same discipline. Sharper dependencies. A clearer exit criterion.
    </p>

    <h3 id="section-what-is">What the sandbox actually is</h3>

    <p>
      A controlled environment for exploration without premature risk. Not <em>everyone go try ChatGPT.</em>{" "}
      Not a directive to &ldquo;be curious about AI.&rdquo; <strong>Designed discovery</strong> within
      boundaries Safety already defined.
    </p>

    <p>
      The word <em>sandbox</em> does opposing work in the same sentence. Vendors mean permissionless play.
      Compliance teams mean an isolated test environment. The version that matters for organizational
      learning is closer to the second: consequences of getting something wrong are <strong>bounded</strong>,
      so the cost of learning is paid in attention rather than damage.
    </p>

    <p>A real sandbox has four properties:</p>

    <ol className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>01.</span>
        <span>
          <strong>Configured tooling</strong> — not personal accounts, not shadow trials
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>02.</span>
        <span>
          <strong>Safe inputs</strong> — synthetic or public-domain, not live sensitive data
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>03.</span>
        <span>
          <strong>Reviewed outputs</strong> — nothing external until reviewed
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>04.</span>
        <span>
          <strong>Shared artifacts</strong> — learning in org memory, not private inboxes
        </span>
      </li>
    </ol>

    <p>
      If any of those four is missing, the organization has experimentation. It does not have a sandbox.
    </p>

    <h3 id="section-fragmented">The fragmented state this replaces</h3>

    <p>
      Before the stage, experimentation is happening — and scattered. Individual staff run prompts that
      work for them; those prompts never leave their accounts. A program manager forms an opinion that
      never gets captured. Two departments hold contradictory views about AI in donor-facing work,
      neither grounded in shared evidence. Measurement is absent. Risk is framed differently by every staff
      member, so the organization cannot prioritize actual risks.
    </p>

    <p>
      Vendor demos keep landing. Each is compelling in isolation. None offers a frame for deciding
      whether the tool fits <strong>your</strong> work. Tool-shopping becomes the default because no other
      frame exists.
    </p>

    <p>
      Sandbox Discovery ends this pattern — not by banning individual experimentation, but by giving the
      organization a place where experimentation produces <strong>compounding learning</strong> instead
      of dispersed anecdote.
    </p>

    <h3 id="section-outputs">The four outputs, re-rooted in Safety</h3>

    <p>
      Each output is anchored in the governance baseline from Safety — not assumed into existence.
    </p>

    <p>
      <strong>Prioritized use cases.</strong> Maps the organization&rsquo;s actual work against AI&rsquo;s
      actual capabilities; ranks the intersection by value and feasibility. <strong>Every candidate is
      screened against data-sensitivity tiers from Safety</strong> before it reaches the priority list. A
      use case requiring prohibited or restricted data is redesigned, routed to a separately scoped
      environment, or deferred — never treated as prioritizable just because it sounds valuable. The
      filter is <strong>upstream</strong> of the ranking.
    </p>

    <p>
      <strong>Experiment briefs.</strong> Convert <em>someone should try this</em> into an experiment with
      a decidable outcome. Each brief names hypothesis, success criteria, data touched, guardrails,
      timeline, and owner. Two fields are <strong>required</strong>, not optional:{" "}
      <strong>failure modes already considered</strong>, and{" "}
      <strong>explicit sign-off path if the experiment graduates</strong>. Both force the brief to
      anticipate exit rather than be surprised by it.
    </p>

    <p>
      <strong>Measurement and risk notes.</strong> Capture what was measured, what was learned about
      quality and time, and what risks surfaced that the original framing missed. This is the honesty
      move. Near-misses during sandbox work feed the <strong>same incident register</strong> Safety
      maintains — a risk note and an incident note are different documents only until the incident
      happens.
    </p>

    <p>
      <strong>Draft playbook.</strong> Consolidates what use cases the organization believes are worth
      doing, what it has learned, what guardrails it runs inside, and what it is{" "}
      <strong>explicitly not pursuing yet</strong>. The playbook is a <strong>draft</strong>. An
      organization that treats it as finished stops updating it; a playbook that stops updating stops being
      useful within a quarter.
    </p>

    <h3 id="section-graduation">The graduation gate</h3>

    <p>
      The sharpest addition to the evolved stage: an explicit exit criterion. The stage ends with a
      playbook <strong>and</strong> a set of use cases that passed graduation into Skills or Solutions.
    </p>

    <p>A use case graduates when it has:</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>A completed use-case card</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Peer review from at least one other team member</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Supervisor sign-off</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>A clean audit-log check for the pilot window</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>For restricted data — program-director-level review</span>
      </li>
    </ul>

    <p>
      Until all of those have happened, the use case <strong>stays in the sandbox</strong>, regardless of
      how well the pilot appeared to go.
    </p>

    <p>
      This gate keeps the sandbox from becoming shadow production. Without it, successful pilots quietly
      become real workflows — erasing the distinction the sandbox was built to create.
    </p>

    <p>
      <strong>A use case that fails to graduate is not a failure.</strong> It is the sandbox working. An
      organization that graduates every pilot does not have a sandbox; it has a pipeline with a euphemism.
    </p>

    <h3 id="section-formation">The formation-focused finish</h3>

    <p>
      The stage&rsquo;s real output is not a tool short-list. It is a <strong>formational shift</strong> in
      how the organization relates to AI.
    </p>

    <p>
      Staff form <strong>shared literacy</strong> — a team with a common evidence base, not individual
      users with individual opinions. Conversations move from enthusiast-vs-skeptic split into grounded
      disagreement about what the evidence shows.
    </p>

    <p>
      The organization forms the capacity to <strong>evaluate rather than purchase</strong>. When a vendor
      shows up, staff run the demo against prioritized use cases, experiment briefs, risk notes, and data
      tiers. Within an hour they can tell whether the tool fits a problem already identified and respects
      constraints already named.
    </p>

    <p>
      Leadership forms a <strong>defensible posture</strong>. The board asks what the organization is doing
      with AI; leadership points to prioritized use cases, measured experiments, a risk register, a living
      playbook, and a gate that determines what graduates. The answer is no longer{" "}
      <em>a few people are trying things</em>. It is{" "}
      <em>
        here is what we learned, what graduated, what we deferred, and how we tell the difference.
      </em>
    </p>

    <p>
      Critically, the stage feeds <strong>Skills and Solutions</strong>. Skills training organizes around
      workflows that <strong>graduated</strong>, not generic tool fluency (
      <ResearchLink slug="the-skill-of-ai">The Skill of AI</ResearchLink>). Solutions attach to use cases
      that demonstrated value inside guardrails. The sandbox is where learning gets captured so the rest of
      the system acts on it without improvising.
    </p>

    <h3 id="section-sequence-why">Why this sequence is the one that holds</h3>

    <p>
      <strong>Tool-first:</strong> Pick a platform, deploy it, see what happens. The organization gets
      shaped by the tool&rsquo;s assumptions; governance is a retrofit.
    </p>

    <p>
      <strong>Strategy-first:</strong> Commission a framework, produce a deck, debate it for a year. The
      strategy is correct in the abstract and never meets a real experiment — so it never updates against
      reality.
    </p>

    <p>
      <strong>Learning-first before Safety</strong> is indistinguishable from tool-first, because the
      boundaries that would make learning safe have not been drawn yet.
    </p>

    <p>
      <strong>Learning-first after Safety</strong> produces an evidence base, a practice, and a draft the
      organization revises as it goes. That is the only placement, in our experience, that produces{" "}
      <strong>capability</strong> rather than <strong>narrative</strong>.
    </p>

    <p>
      <strong>Attributed:</strong> The AI Stewardship Sequence field guide names the same inversion — demo
      → pilot → policy later — and the borrowing chain: Solutions borrows from Skills; Skills from Sandbox;
      Sandbox from Safety.
    </p>

    <h3 id="section-counter">Counterarguments to keep in the margin</h3>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Some orgs need a fast pilot under crisis pressure.</strong> A bounded sandbox can still
          run in two weeks — but Safety minimums (data tiers, forbidden categories) are not optional even
          then.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Shared artifacts feel bureaucratic to small teams.</strong> At under ten staff, a single
          running doc may suffice — but it must be <strong>shared and dated</strong>, not &ldquo;we talked
          about it.&rdquo;
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Graduation gates slow good work.</strong> They slow <strong>undeclared production</strong>,
          which is the point. Heroes who bypass the gate recreate shadow IT.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Synthetic inputs miss real-world mess.</strong> True — which is why graduation includes
          peer review and audit logs before restricted or external work.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Vendors offer &ldquo;sandbox environments.&rdquo;</strong> Product sandboxes solve
          isolation; they do not replace <strong>organizational</strong> sandbox discipline (hypotheses, risk
          notes, playbook).
        </span>
      </li>
    </ul>

    <h3 id="section-recommendations">Practical recommendations</h3>

    <ol className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>01.</span>
        <span>
          <strong>Do not open Sandbox until Safety passes the principal-alignment test</strong> — same three
          questions, same answers on paper.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>02.</span>
        <span>
          <strong>Run one four-week cycle</strong> with a single accountable team and a shared log — not
          enterprise-wide curiosity.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>03.</span>
        <span>
          <strong>Require failure modes on every experiment brief</strong> before anyone runs a prompt.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>04.</span>
        <span>
          <strong>Hold a graduation review</strong> even for &ldquo;obvious wins&rdquo; — if everything
          graduates, tighten the gate.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>05.</span>
        <span>
          <strong>Feed graduated use cases directly into Skills design</strong> — do not schedule generic AI
          literacy while sandbox evidence sits unused.
        </span>
      </li>
    </ol>

    <h3 id="section-closing">Closing word</h3>

    <p>
      A sandbox without a graduation gate is a staging environment with better branding. A sandbox without
      a governance baseline underneath it is a pilot waiting to become an incident.
    </p>

    <p>
      A real sandbox is neither. It is the stage where an organization learns what it believes about AI by
      testing what it can actually do inside constraints it has already committed to.
    </p>

    <p>
      AI did not raise the bar on experimentation. It raised the <strong>cost</strong> of experimentation
      without discipline.
    </p>

    <h3 id="section-sequence">In this sequence</h3>

    <p className={styles.marginNote}>
      <strong>AI Stewardship Sequence:</strong> Safety (field guide) →{" "}
      <strong>Sandbox</strong> (this piece) →{" "}
      <ResearchLink slug="the-skill-of-ai">Skills</ResearchLink> → Solutions. Upstream discernment:{" "}
      <ResearchLink slug="finding-ai-guidance-worth-trusting">
        Finding AI guidance worth trusting
      </ResearchLink>
      . Evidence:{" "}
      <Link href="/research/sources" className={styles.textInkBlue}>
        verified research sources
      </Link>
      .
    </p>
  </>
);
