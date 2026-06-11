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

/** Paper — ported from `docs/articles/graded-high/85-99/the-skill-of-ai.md`. */
export const theSkillOfAiBody: ReactNode = (
  <>
    <p className={styles.dropCap} id="section-summary">
      Most AI training programs assume workers need a <strong>new primary skill</strong> — a distinct
      competence added to the toolkit, like learning Excel in 1995. That frame produces weak outcomes.
    </p>

    <p>
      <strong>Synthesis:</strong> AI does not mainly require a new skill. It requires staff to{" "}
      <strong>reorganize skills they already have</strong> — raise standards, recover voice, ask better
      questions, and remember what their judgment is for. Those are <strong>formation</strong> moves, not
      curriculum moves.
    </p>

    <p>
      The <strong>Skills</strong> stage of <strong>Safety → Sandbox → Skills → Solutions</strong> is not
      the certification stage. It is where the organization develops the human capability to use AI wisely
      — a different capability than most training vendors sell.
    </p>

    <p>
      <strong>What the evidence supports:</strong> Randomized experiments with consultants show large gains
      on some tasks and serious failure modes on others — including <strong>phantom expertise</strong> when
      junior staff use AI without senior verification <Cite n={32} title="BCG · Sept 2024" />. Recent work on
      AI-assisted reasoning finds people can <strong>perform better while calibrating worse</strong> —
      overestimating how well they did, sometimes <strong>more</strong> among those with higher AI literacy{" "}
      <Cite n={33} title="Fernandes et al. · CHB 2026" />. That supports teaching{" "}
      <strong>verification and collaborative posture</strong>, not feature tours alone.
    </p>

    <p>
      <strong>Honest limit:</strong> The five-level maturity model and pedagogy principles here are{" "}
      <strong>operational synthesis</strong> from Movemental practice — useful, not peer-reviewed as a
      package.
    </p>

    <h3 id="section-problem">The problem with the frame</h3>

    <p>
      The word <em>reskilling</em> has been doing more damage than the people using it realize. It suggests
      AI requires learning a new primary skill — modules, certifications, demonstrations of tool fluency.
    </p>

    <p>
      This is the frame most AI training programs assume. It is also the frame that produces the weakest
      outcomes.
    </p>

    <p>
      The Skills stage is not the curriculum stage. It is the stage where the organization develops human
      capability to use AI wisely — which is not what most training programs are built to produce.
    </p>

    <h3 id="section-not">What Skills is not</h3>

    <p>
      <strong>Skills is not tool mastery.</strong> Interface controls can be learned in thirty minutes and
      will be obsolete within eighteen months. Feature tours are expensive and short-lived.
    </p>

    <p>
      <strong>Skills is not a library of prompt templates.</strong> Templates without understanding produce
      dependency. A template applied without discernment is worse than no template, because the user stops
      noticing when the output is wrong.
    </p>

    <p>
      <strong>Skills is not certification.</strong> Certification optimizes for passing a test. The test has
      almost no relationship to using AI in real work.
    </p>

    <p>
      <strong>Skills is not generic &ldquo;AI literacy.&rdquo;</strong> Literacy is the floor — necessary,
      quick to establish, and not the point.
    </p>

    <p>
      What the stage actually is: the formation of <strong>judgment, taste, and collaborative posture</strong>{" "}
      in the staff who will do the work.
    </p>

    <h3 id="section-skill">What the skill of AI actually is</h3>

    <p>
      Five things are commonly conflated. The conflation is the source of most failed training programs I
      have seen.
    </p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>1.</span>
        <span>
          <strong>Tool fluency</strong> — controls, modes, shortcuts. Half-life: short; teach fast, move on.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>2.</span>
        <span>
          <strong>Prompt craft</strong> — structuring a request so the model produces something useful.
          Half-life: shrinking as models infer more.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>3.</span>
        <span>
          <strong>Verification</strong> — treating output as draft; checking facts, cross-referencing,
          sanity-testing. Half-life: permanent — under-taught because it is unglamorous.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>4.</span>
        <span>
          <strong>Taste</strong> — knowing what good looks like in <em>your</em> context so you spot
          plausible-but-wrong. Earned in domain, not installed by workshop.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>5.</span>
        <span>
          <strong>Collaborative posture</strong> — thinking <em>with</em> an authoritative-sounding model
          without ceding judgment. Psychological — closer to interviewing a plausible stranger than operating
          a wrench.
        </span>
      </li>
    </ul>

    <p>
      <strong>Sourced (verification / posture):</strong> On tasks outside a model&rsquo;s reliable frontier,
      consultants <strong>with</strong> AI were <strong>19 percentage points less likely to be correct</strong>{" "}
      than those without — on work that looked similar to tasks inside the frontier{" "}
      <Cite n={9} title="Dell'Anna · jagged frontier · 2023" />. Verification and posture are not optional
      extras. They are the skill.
    </p>

    <p>
      A development director has taste about donor communications. A program manager has taste about grant
      reports. A lead minister has taste about what should never end up in a public teaching script. AI does
      not supply taste; it <strong>reveals its absence</strong>.
    </p>

    <p>
      Taken together, these five layers are the skill of AI. Most are not technical. None is delivered by a
      feature tour.
    </p>

    <h3 id="section-reskilling">Reskilling, redefined</h3>

    <p>
      Under this definition, <em>reskilling</em> misnames the work. What most staff need is a{" "}
      <strong>reorganization of existing skills</strong>.
    </p>

    <p>
      Staff need to <strong>raise their standards.</strong> A first-draft AI output is often good enough to
      stop thinking — and stopping there is the failure. The work is teaching staff to keep going past{" "}
      <em>good enough</em> toward the quality their role requires, using AI as accelerant rather than
      destination.
    </p>

    <p>
      Staff need to <strong>recover their voice.</strong> The default voice of most models is smooth,
      plausible, and generic. Organizations that let that voice leak into communications lose what made them
      distinct. Skills teaches use <strong>without</strong> sounding like the model.
    </p>

    <p>
      Staff need to <strong>ask better questions.</strong> Output quality is bounded by framing quality. AI
      forces staff to articulate things they had left tacit. That is good. It is also uncomfortable.
    </p>

    <p>
      Staff need to <strong>re-learn what their judgment is for.</strong> When a model produces a first draft
      in thirty seconds, human value is no longer in production. It is in shaping, deciding, and discerning.
      Staff whose identity is tied to first-draft production will feel AI as a threat. Skills helps them
      relocate value higher in the workflow.
    </p>

    <p>
      None of this is a new primary skill. All of it is formation on skills they already have, now operating
      one altitude higher because the lower altitude is partially automated.
    </p>

    <h3 id="section-learned">Can it be learned?</h3>

    <p>
      Yes — unevenly, and not the way most training packages it.
    </p>

    <p>
      <strong>What cannot be taught in a workshop:</strong> taste, judgment, voice. These form through
      supervised practice in real work over months.
    </p>

    <p>
      <strong>What can be taught but only with practice:</strong> prompt structure, verification habits,
      when-to-use discernment. Workshops seed these; repetition consolidates them.
    </p>

    <p>
      <strong>What can be taught quickly:</strong> tool mechanics, guardrail awareness, basic failure modes,
      the shape of the skill itself. This layer should be <strong>small and sharp</strong>, not extensive.
    </p>

    <p>
      Most AI training programs are built upside down: maximum time on what can be taught quickly, minimum
      time on what takes longest to form. A well-designed Skills stage <strong>inverts</strong> this —
      minimize curriculum, maximize supervised practice, accept that taste and voice take six to twelve
      months of real use.
    </p>

    <h3 id="section-maturity">The maturity model</h3>

    <p>Five levels, observable in staff behavior.</p>

    <p>
      <strong>Level 1 — Unaware.</strong> Does not use AI. Cannot articulate why beyond vibes. Most
      organizations have more staff here than they think.
    </p>

    <p>
      <strong>Level 2 — Reactive.</strong> Uses AI personally — often through a personal account — or avoids
      it. Practice is private. No reliable verification habits. Unmanaged adoption lives here.
    </p>

    <p>
      <strong>Level 3 — Task-fluent.</strong> Uses AI for recurring tasks with stable quality. Basic
      verification habits. Recognizes wrong output on familiar tasks. Does not generalize well to novel tasks.{" "}
      <strong>Target for most staff after a well-run Skills stage.</strong>
    </p>

    <p>
      <strong>Level 4 — Judgment-fluent.</strong> Adapts across novel tasks. Preserves voice. Recognizes
      failure modes in real time. Knows when not to use AI. Pushes back on plausible-but-wrong output. AI
      becomes a durable multiplier.
    </p>

    <p>
      <strong>Level 5 — Formative.</strong> Teaches others. Shapes workflows and policy from practice.
      Graduates sandbox use cases into scaled deployment. Every organization needs a handful here; not every
      role requires it.
    </p>

    <p>
      For most nonprofit staff: <strong>Level 3</strong> by end of year one, <strong>Level 4</strong> by end
      of year two. Level 1 is not a stable state — staff either move up or become a governance concern.
    </p>

    <h3 id="section-pedagogy">The pedagogy</h3>

    <p>Five principles underpin every Skills stage that has held up in practice.</p>

    <p>
      <strong>Teach from their work, not from curriculum.</strong> Start with a task they already hate doing
      badly — a donor acknowledgment, a resented report, Monday correspondence. Let them feel leverage before
      theory. Generic use cases (&ldquo;summarize this article&rdquo;) teach nothing that transfers.
    </p>

    <p>
      <strong>Teach taste before techniques.</strong> If someone cannot articulate what good looks like for
      the output in front of them, no prompting technique will save them. Sharpen their standard for their
      own work first.
    </p>

    <p>
      <strong>Pair every technique with a failure.</strong> Prompt templates without awareness of breakage are
      worse than none. Verification habits without a real example of the model getting something wrong do not
      stick. <strong>The failure is the lesson.</strong>
    </p>

    <p>
      <strong>Practice under supervision until habits form.</strong> Workshop → supervised use → independent
      use. Most programs skip the middle — office hours, peer review, facilitated sandbox sessions — which is
      where skills actually form.
    </p>

    <p>
      <strong>Protect voice as an explicit value.</strong> The dominant risk for nonprofit employees is not
      danger alone. It is quietly losing their voice — and the organization&rsquo;s voice — by delegating too
      much thinking. Teach specific moves to keep voice intact, not a warning in the footer.
    </p>

    <h3 id="section-nonprofit">How this intersects with the actual nonprofit employee</h3>

    <p>
      Most nonprofit employees are mid-career and deeply committed to mission. They are stretched thin and
      have low tolerance for overhead. Tech comfort ranges from native to phobic on the same team. They are
      suspicious of corporate tooling trends that arrived loudly and left quietly. They care about ethics,
      authenticity, and voice — often more than employers credit. They are not paid to spend unpaid hours
      learning for its own sake.
    </p>

    <p>Enterprise training does not translate. What they need:</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Training from <strong>real work</strong>, not abstract examples</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Tools that earn keep within the first week</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Respect for the <strong>moral weight</strong> of the work — stakes corporate settings rarely carry
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Freedom from the demand to become engineers</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Honest acknowledgment that prompting well is mostly <strong>thinking clearly</strong>, which they
          already do
        </span>
      </li>
    </ul>

    <p>
      A pedagogy that respects this population produces Level 3–4 outcomes within twelve months. One that
      does not produces Level 2 indefinitely, regardless of hours delivered.
    </p>

    <h3 id="section-produces">What Skills produces</h3>

    <p>
      <strong>Confidence. Consistency.</strong> A staff that can defend AI use to a donor, regulator, skeptic,
      or new hire. Workflows stress-tested by the people who run them. Shared language not borrowed from a
      vendor.
    </p>

    <p>
      <strong>What it does not produce:</strong> uniform enthusiasm. Mature Skills produces staff with formed
      opinions — some extensive users, some sparing, some who decide the tool does not yet justify their
      specific work. All three outcomes signal success. An organization where everyone ends enthusiastic was
      running a <strong>marketing program</strong>, not formation.
    </p>

    <h3 id="section-counter">Counterarguments to keep in the margin</h3>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Some roles need deep tool mastery.</strong> Data engineers, comms ops, and IT admins may
          need technical depth beyond this frame. Skills as defined here targets <strong>judgment-bearing
          staff</strong>, not every job family.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Certification has its place</strong> for regulated environments — but it is not a substitute
          for taste and verification in donor-facing or pastoral work.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Level 3 can be enough.</strong> Not every staff member needs Level 4 for every task. The
          failure mode is <strong>declaring Skills done</strong> because workshops happened.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Voice preservation can become excuse.</strong> &ldquo;Protecting voice&rdquo; sometimes
          masks refusal to learn. The balance is explicit moves to stay distinct, not avoidance of the tool.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Six to twelve months is a luxury.</strong> Understaffed orgs may need narrower scope — one
          team, one workflow — rather than enterprise-wide formation at once.
        </span>
      </li>
    </ul>

    <h3 id="section-recommendations">Practical recommendations</h3>

    <ol className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>01.</span>
        <span>
          <strong>Run the threshold test</strong> on three random staff this month (see below). If fewer than
          two pass, Skills is not done.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>02.</span>
        <span>
          <strong>Schedule supervised practice</strong> — biweekly office hours for ninety days, minimum —
          before declaring training complete.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>03.</span>
        <span>
          <strong>Pair each prompt template with one documented failure</strong> from your sandbox logs.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>04.</span>
        <span>
          <strong>Name one voice-preservation move per role</strong> (e.g., &ldquo;I rewrite the opening
          paragraph by hand every time&rdquo;).
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>05.</span>
        <span>
          <strong>Do not advance to Solutions</strong> until Level 3 behavior is visible in the teams that
          will own deployment.
        </span>
      </li>
    </ol>

    <h3 id="section-threshold">The threshold test</h3>

    <p>A single-line test for whether Skills is done for a person:</p>

    <p className={styles.marginNote}>
      <em>
        On an ordinary Tuesday, can they name (1) a task where AI helps them, (2) a task where it does not,
        (3) a failure mode they have personally observed, and (4) one specific move they use to keep their
        voice intact?
      </em>
    </p>

    <p>
      If they cannot answer all four, Skills is not done for that person. Aggregate answers across staff are
      the real report card.
    </p>

    <h3 id="section-closing">Closing word</h3>

    <p>
      The skill of AI is not a skill most staff lack. It is the skill most staff already have — clear
      thinking, good judgment, taste in their domain, voice in their work — now asked to operate one altitude
      higher.
    </p>

    <p>
      Reskilling, in that sense, is a misnomer. The work asks for time, supervision, and practice to do what
      they already knew how to do — on top of a system that will happily do the lower-altitude work badly if
      no one is watching.
    </p>

    <p>
      AI did not raise the bar on training. It raised the bar on <strong>formation</strong>.
    </p>

    <h3 id="section-sequence">In this sequence</h3>

    <p className={styles.marginNote}>
      <strong>AI Stewardship Sequence:</strong> Safety (field guide) →{" "}
      <ResearchLink slug="sandbox-discovery">Sandbox</ResearchLink> →{" "}
      <strong>Skills</strong> (this piece) → Solutions. Upstream discernment:{" "}
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
