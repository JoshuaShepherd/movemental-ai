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

/** Paper — ported from `docs/articles/graded-high/85-99/finding-ai-guidance-worth-trusting.md`. */
export const findingAiGuidanceWorthTrustingBody: ReactNode = (
  <>
    <p className={styles.dropCap} id="section-summary">
      Mission-driven leaders are not mainly choosing software. They are choosing whose judgment will
      shape their staff&rsquo;s judgment when generative AI arrives in drafts, donor letters, board
      packets, and pastoral care workflows.
    </p>

    <p>
      This guide helps executive directors, board chairs, and senior pastors tell the difference between
      an expert (someone performing arrival in a field that has no elders) and a guide (someone still
      walking the territory, accountable to named peers, willing to slow you down when character
      formation matters more than reach).
    </p>

    <p>
      What the evidence supports: Consumer-facing generative assistants at today&rsquo;s scale are
      recent. ChatGPT&rsquo;s public launch in November 2022 is a fair marker{" "}
      <Cite n={31} title="OpenAI · Nov 2022" />. Randomized work with management consultants shows
      large gains on some tasks and serious failure modes on others, including confident wrong output
      when junior staff use AI without senior verification{" "}
      <Cite n={32} title="BCG · Sept 2024" />{" "}
      <Cite n={9} title="Dell'Anna · jagged frontier · 2023" />. That is enough to justify humility
      and verification. It is not enough to prove any single consultant market statistic.
    </p>

    <p>
      What we do not claim: That every AI advisor is dishonest, that tools do not matter, or that
      Movemental has this figured out. We offer questions and a checklist, not a vendor scorecard.
    </p>

    <p>
      Honest limit: Most signals here are behavioral and relational, not lab-tested. Use the questions
      and flags in conversation. Do not treat them as a hiring rubric you can run in one Zoom call
      without references.
    </p>

    <h3 id="section-real-question">The real question is not which tool</h3>

    <p>
      A nonprofit executive director I respect told me she had been pitched by four consultants in a
      month. Each one claimed to be &ldquo;the person&rdquo; on AI for mission-driven work. Two slide
      decks looked nearly identical. One had pedigrees she could not have afforded five years ago and
      could apparently afford now. One came from a board member who had seen someone on a podcast. She
      had budget to hire one of them. She did not have a frame to decide which.
    </p>

    <p>
      Her question was not really about tools. She already had tools. It was not really about strategy
      either. She had read enough decks to recognize LinkedIn posts bolted into PowerPoint. The question
      she kept arriving at, usually in private, often after a few expensive months she did not want to
      discuss publicly:
    </p>

    <p>Who can I actually trust to walk with us through this?</p>

    <p>
      That question is harder than it sounds. The market is full of expertise claims, confidence,
      credentials, and staged authority. It is short on people who can say out loud that this is new
      for everyone, and who have still done the patient work of being useful inside the newness.
    </p>

    <p>
      AI expertise is inflated. Credibility is harder to read, not easier. Every vendor, consultant, and
      solo operator can buy the same aesthetic package now. Confidence is distributed. Competence is
      not.
    </p>

    <p>
      The choice you are making is not primarily a tools choice or a vendor choice. It is a trust
      choice. You are choosing who to entrust yourself to in a period where no one, including me, has
      decades of experience in the stack you are being asked to govern. That choice will shape what your
      people become, not just what they ship.
    </p>

    <h3 id="section-early">We are early, and that matters</h3>

    <p>
      OpenAI released ChatGPT to the public on 30 November 2022{" "}
      <Cite n={31} title="OpenAI · Nov 2022" />. That date is not proof by itself. It marks how recent
      lived practice is widespread for most organizations outside specialized labs.
    </p>

    <p>
      There is no elder class for this stack the way there is for accounting software or database
      design. That is descriptive, not romantic.
    </p>

    <p>Two things follow.</p>

    <p>
      Humility is mandatory. Anyone selling you the tone of having figured this out is, at minimum,
      ahead of what the evidence supports. That does not make them dishonest. It often makes them
      performative in a way the moment will correct later.
    </p>

    <p>
      Experience still exists. But it is experience of grappling, not arrival. The people worth trusting
      are the ones who have built, broken, revised, and stayed in relationship while doing so. Their
      maps are drawn in pencil. They revise them publicly. They tell you what they tried last year that
      they would not try this year, and why.
    </p>

    <p>
      Credentials from 2015 are not disqualifying. They are also not predictive of help with the work
      your organization is actually trying to do in 2026. The question is not <em>does this person have
      a resume?</em> but <em>does this person have a current practice I can examine?</em>
    </p>

    <h3 id="section-consulting">Why default consulting logic fails here</h3>

    <p>
      Most organizations, when they meet AI as a leadership problem, reach for the pattern that worked
      for cloud migrations, CRM rollouts, and email marketing: committee, consultant, pilot, training,
      policy. Leaders running that pattern are not naive. They are doing what has worked.
    </p>

    <p>
      AI breaks the pattern. And much of the consulting economy rushing to meet the moment breaks it
      further.
    </p>

    <p>
      The part of the economy that sells AI has every incentive to start at Solutions: the tool, the
      pilot, the deployment. Demos are vivid. Pilots fit fiscal years. Screenshots of outputs circulate
      on boards. The quieter work does not screenshot well. Governance boundaries that actually bind.
      Structured experiments that produce shared language. Training that forms staff judgment rather
      than staff speed. Nobody takes a photo of a disagreement resolved before a donor letter went out.
    </p>

    <p>
      Movemental&rsquo;s AI Stewardship Sequence field guide names the forward order Safety → Sandbox →
      Skills → Solutions and the default scramble (demo → pilot → policy later). That inversion feels
      productive. It produces deliverables and the sensation of keeping pace. It almost never survives
      the first serious review.
    </p>

    <p>
      BCG&rsquo;s follow-on experiments with hundreds of consultants found that generative AI can help
      workers stretch into unfamiliar task types. It can also produce failure modes when the tool
      misleads on reliability, especially when junior staff use AI without senior oversight{" "}
      <Cite n={32} title="BCG · Sept 2024" />. That is not a story about mission-driven orgs alone.
      It is a warning about Solutions-first engagements that skip judgment formation.
    </p>

    <p>
      The people who can help you will resist starting at Solutions. They will ask, early and without
      embarrassment, what you are trying to protect, what your leadership actually owns, and what your
      staff are becoming whether you named it or not. If the first two conversations are about tools,
      the third will also be about tools, and so will the twelfth.
    </p>

    <p>
      This is not a tools problem. A consultant who cannot say that sentence and mean it is a consultant
      whose incentives point elsewhere.
    </p>

    <h3 id="section-expert-guide">Expert versus guide</h3>

    <p>
      An expert, in the popular imagination, has arrived. They have answers, confidence, a slide for
      every fear. They speak from <em>I have done this</em>. In a stable domain, that posture is earned
      and useful. In generative AI in 2026, it is often a performance.
    </p>

    <p>
      A guide is still walking the territory. Their maps are in pencil because the ground is moving
      faster than ink dries. They speak from <em>I am still inside this, and so are you; here is what I
      have learned; here is what I do not yet know</em>. They are translators more than oracles. Their
      first instinct is to ask what your room looks like before telling you what the room should do.
    </p>

    <p>
      If the AI moment were stable, you would want an expert. Because it is not, you want a guide.
    </p>

    <p>
      Experts, in the sense I mean here, arrive. They present, explain, close. They are hard to
      interrupt productively because their authority depends on continuity. The deck has to run. When
      advice fails, they reframe it as your implementation problem. When your mission shifts, they
      restate the framework.
    </p>

    <p>
      Guides walk. They ask what it is like to lead in your sector, your board culture, your theological
      or programmatic commitments. They tell you early about things they got wrong elsewhere. They
      decline questions they cannot answer and point you to someone who can. They are interruptible on
      purpose. The authority is in the walking, not the speech.
    </p>

    <p>
      Mission-driven organizations need guides more than experts right now. Nonprofits, churches,
      seminaries, institutions carrying inherited work. The failure modes here are not failures of
      technique. They are failures of judgment, pace, and formation. Those cannot be imported in a deck.
      They have to be grown in place, with accompaniment.
    </p>

    <p>
      The test is not whether the person on the call is smart. Most of them are smart. The test is
      whether they will still be useful after the engagement ends. When a model changes. When a staff
      member uses a tool badly. When a donor asks a pointed question. When you have to respond in your
      own voice without the consultant in the room.
    </p>

    <h3 id="section-look-for">What I actually look for</h3>

    <p>
      This is not a scoring rubric. It is a pattern I read in the first two or three conversations with
      someone proposing to help an organization I care about.
    </p>

    <p>
      Evidence of grappling. Fluency held next to honest wrestling. Real wins you can name, and real
      revisions the person does not hide. People who can say &ldquo;I used to think X; after eighteen
      months of building, I now think Y&rdquo; are showing what matters. People whose opinions have not
      moved since 2023 are showing the absence of it.
    </p>

    <p>
      Evidence of building. Not slides about building. Something shipped, maintained, reviewed by others
      who can be named. Ask to see it. Ask who touched it. Ask what the failure modes were. If failure
      sounds exciting rather than costly and specific, you are probably looking at marketing.
    </p>

    <p>
      Resistance to totalizing answers. &ldquo;It depends&rdquo; is trustworthy when followed by a clear
      list of dependencies. &ldquo;It depends&rdquo; without those dependencies is a hedge. Guides can
      articulate the shape of a decision even when they cannot prescribe it.
    </p>

    <p>
      Stewardship of pace. Trustworthy people treat learning and publishing as distinct activities. They
      do not push every experiment out as a case study before the ink is dry. Someone who treats every
      client engagement as LinkedIn content is underwriting their platform on the back of yours.
    </p>

    <p>
      Accountability to named relationships. Who corrects this person? Whose feedback have they
      incorporated publicly? In a field changing this fast, isolated authority is fragility wearing a
      brand.
    </p>

    <p>
      Fit to mission, not just sector. A consultant who understands nonprofit operations is not the same
      as one who understands your donor covenant, your public commitments, your history of promises kept.
      Ask how they would know when a draft betrayed your mission. If they cannot answer in your
      language, they will not recognize drift when it starts.
    </p>

    <p>
      Willingness to disappear. The best guides plan their exit from the start. Toward the day your
      organization can propose, sandbox, deploy, and retire a use case without them in the room. If the
      engagement requires their continued presence to stay stable, they are renting you capability, not
      building it.
    </p>

    <h3 id="section-network">The network test</h3>

    <p>
      Brian Eno&rsquo;s scenius names the intelligence of a scene, not a lone genius. It describes what
      happens when a community of practice sharpens, corrects, and cites each other over time. See the
      research synthesis on{" "}
      <ResearchLink slug="scenius-network-credibility">scenius as credibility mechanism</ResearchLink>.
      When models change every few months and no one has thirty years in this stack, isolated authority
      is fragile.
    </p>

    <p>
      This is not the same as follower counts. Ask: Who engages with them in ways that would be
      embarrassing to fake? Who publicly disagrees with them and gets incorporated?
    </p>

    <p>
      Ask directly: Who corrects you? Whose work sharpens yours? Who would tell me if you missed
      something important for my kind of organization?
    </p>

    <h3 id="section-hard-test">The hard test</h3>

    <p>Who is willing to lose a little reach to protect your formation?</p>

    <p>
      Formation is what your staff and leaders become by using these tools. It is what your
      organization&rsquo;s voice becomes after a year of drafts with a model at the table. It does not
      screenshot. It is, however, what determines whether your organization is still itself in five
      years.
    </p>

    <p>
      A guide worth trusting will, at some point, tell you to slow down in a way that costs them. If you
      cannot identify a moment where they chose your formation over their platform, you do not yet know
      whether you are looking at a guide.
    </p>

    <h3 id="section-discernment">Discernment layer: questions, flags, signals</h3>

    <p>Questions worth asking out loud</p>

    <ol className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>01.</span>
        <span>
          What did you believe about AI and our kind of organization eighteen months ago that you no
          longer believe, and why?
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>02.</span>
        <span>
          Describe something you have built or helped build in this space that is still running. Who else
          touched it? Who can I talk to?
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>03.</span>
        <span>What would you refuse to do for us, even if we asked and offered to pay?</span>
      </li>
      <li>
        <span className={styles.articleListNum}>04.</span>
        <span>
          Who corrects your thinking in this field? Whose public disagreement have you incorporated in the
          last year?
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>05.</span>
        <span>What does formation look like in this engagement, and how would we know it is happening?</span>
      </li>
      <li>
        <span className={styles.articleListNum}>06.</span>
        <span>
          If our senior leader had to describe our relationship to AI in one paragraph six months from now,
          what would it sound like, and who would have written it?
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>07.</span>
        <span>When should we stop working with you, and how will we know?</span>
      </li>
    </ol>

    <p>Red flags</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Solutions-first from the opening conversation.</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          A single-author public image. Nobody publicly disagrees with or corrects them.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Every experiment is already content. Learning and publishing not distinguished.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Unmoved opinions. Confidence unchanged since 2023 despite new evidence.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>No named relationships. Cannot say who catches them if they drift.</span>
      </li>
    </ul>

    <p>Green flags</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>They name things they got wrong. Specifically enough that you believe them.</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>They push back on your framing before they sell.</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>They recommend against things you came in asking for.</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>They distinguish pace from speed.</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>They plan their own exit.</span>
      </li>
    </ul>

    <h3 id="section-counter">Counterarguments to keep in the margin</h3>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Some experts are genuinely helpful for compliance, security review, or model evaluation. The
          guide frame is for organizational adoption and formation.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Slowing down has real costs. The response is bounded risk, not delay for its own sake.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Network tests can favor insiders. Ask whether correction comes from people with different blind
          spots.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Movemental has an interest in the sequence frame. Treat our stewardship order as hypothesis to
          test in your room.
        </span>
      </li>
    </ul>

    <h3 id="section-recommendations">Practical recommendations</h3>

    <ol className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>01.</span>
        <span>
          Run three conversations before you sign. Same questions. Compare whether answers deepen or
          repeat.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>02.</span>
        <span>
          Ask for one live reference from an organization like yours. Not a logo slide. A phone call.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>03.</span>
        <span>Write your non-negotiables first, before you meet vendors.</span>
      </li>
      <li>
        <span className={styles.articleListNum}>04.</span>
        <span>
          Start Safety and Sandbox even if you buy Solutions. Policy and bounded experiments should not be
          deferred until after deployment.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>05.</span>
        <span>
          Document who vouched for whom. Your trust graph is part of your credibility story with donors
          and boards.
        </span>
      </li>
    </ol>

    <h3 id="section-movemental">Where Movemental fits, briefly and without overclaiming</h3>

    <p>
      I run Movemental, and I am inside the tension this essay describes. That is disclosure, not a
      humblebrag.
    </p>

    <p>
      The frame we work inside is the AI Stewardship Sequence: Safety → Sandbox → Skills → Solutions. I
      offer the sequence as a case study, not a sacrament. What I am not offering is certainty, a single
      stack that solves your ethics, or immunity from error.
    </p>

    <h3 id="section-closing">Closing word</h3>

    <p>
      You do not have to trust me. You do not have to trust any particular voice in the room, including
      the most famous ones. You do have to choose carefully, because the choice you are making is not
      really about tools or strategies. It is about whose judgment will quietly shape your staff&rsquo;s
      judgment, whose posture will shape your leadership&rsquo;s posture, whose voice will show up in
      every draft your organization sends into the world for the next several years.
    </p>

    <p>
      Choose a guide. Choose someone who will walk with you, who is accountable to people you can name,
      and who will protect the parts of your organization that do not show up on a dashboard. Those are
      the parts that, five years from now, will decide whether your mission was amplified by AI or
      quietly replaced by it.
    </p>

    <p>
      We are early. Nobody has this figured out. Standing on that honestly is itself a form of authority.
      Walking on it with you is the only kind of help worth buying.
    </p>

    <h3 id="section-sequence">In this sequence</h3>

    <p className={styles.marginNote}>
      This piece is part of the AI Stewardship Sequence research library. Upstream: Safety (field guide).
      Next in the public research set:{" "}
      <ResearchLink slug="sandbox-discovery">Sandbox discovery</ResearchLink> →{" "}
      <ResearchLink slug="the-skill-of-ai">The skill of AI</ResearchLink>. Related:{" "}
      <ResearchLink slug="trust-verification">Trust and verification</ResearchLink>,{" "}
      <Link href="/research/sources" className={styles.textInkBlue}>
        verified research sources
      </Link>
      .
    </p>
  </>
);
