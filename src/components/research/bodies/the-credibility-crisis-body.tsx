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

/** Paper — ported from `docs/articles/graded-high/85-99/the-credibility-crisis.md`. */
export const theCredibilityCrisisBody: ReactNode = (
  <>
    <p className={styles.dropCap} id="section-opening">
      You are reading an article. A newsletter, a blog, a thread. It is about something you care about. The
      voice is smooth. The structure is clean. There are subheads, transitions, even a plausible citation
      or two. Halfway down, you notice something you cannot quite name: the piece feels{" "}
      <em>assembled</em>. It does not lie. It does not scream &ldquo;robot.&rdquo; It reads like someone
      who has read a thousand pieces like it and merged them into something new.
    </p>

    <p>
      You scroll to the byline. There is a name. Maybe a photo. You still do not know what you need to
      know: did a human stand behind this with their reputation, their years, their skin in the
      game? Or did a machine help produce fluent text that <em>performs</em> expertise?
    </p>

    <p>
      If your vocation runs through words people are meant to trust, teaching, grants, curriculum, a letter
      that asks someone to give, you already live inside this shift.
    </p>

    <p>
      That uncertainty is not a personality flaw. It is the early edge of what I will call, carefully, a
      credibility collapse. That is not a standardized label in social science. It is a useful name for
      something real: the decay of cheap signals (volume, polish, pace) as proxies for human formation.
    </p>

    <p>
      I want to be calm here. This chapter is not a prophecy that the sky is falling. It is closer to a
      doctor walking you through a scan. Here is what the image shows. Here is what it does not prove.
      Here is why it matters for people whose work depends on being trusted.
    </p>

    <h3 id="section-changing">What is actually changing</h3>

    <p>
      Plausible expertise is cheaper to produce than it used to be. Generative models can draft memos,
      articles, FAQs, board briefings, donor letters, and social threads in seconds. Some of that output
      is helpful. Some is wrong in confident, memorable ways. Much of it is in the middle. Good enough to
      pass a quick read. Not good enough to survive a careful one.
    </p>

    <p>
      That does not mean &ldquo;AI content is always bad.&rdquo; It means good and bad are harder to sort at
      a glance. The old heuristics assumed that fluent, well-formatted, frequent publication correlated
      with costly human investment. That correlation still exists, often. But it is weaker than it was.
      Noise has gotten cheaper faster than discernment has gotten sharper.
    </p>

    <h3 id="section-evidence">What the evidence supports (with names)</h3>

    <p>
      Start with what ordinary people say about their own confidence. In a Pew Research Center survey of
      U.S. adults fielded June 9–15, 2025 (<em>n</em> = 5,023, American Trends Panel), 53% said they were{" "}
      <em>not too</em> or <em>not at all confident</em> they could tell if something they encountered was
      made by AI or by a person. In the same survey, 76% said it mattered <em>a great deal</em> or{" "}
      <em>a fair amount</em> to know whether text, images, or video were AI- or human-made{" "}
      <Cite n={10} title="Pew · AI disclosure · 2025" />. That gap matters. People care more than they
      feel able to judge. That is one clean description of the lived credibility problem.
    </p>

    <p>
      Next, scale. Ahrefs analyzed roughly 900,000 newly detected English-language pages (one per domain)
      in April 2025 using an in-house classifier and reported that 74.2% contained <em>some</em> AI-flagged
      content, with 2.5% labeled &ldquo;pure AI&rdquo; and 25.8% &ldquo;pure human&rdquo; under their
      definitions <Cite n={34} title="Ahrefs · Apr 2025 · 900k pages" />. That is not a moral verdict on
      every flagged page. Detectors disagree. Boundaries blur. &ldquo;AI-assisted&rdquo; is not the same as
      &ldquo;AI-authored.&rdquo; But it <em>is</em> evidence that new public text is often machine-touching
      in large numbers. That changes what &ldquo;volume&rdquo; signals.
    </p>

    <p>
      On human limits: Cooke et al., in <em>Communications of the ACM</em> (2025; originally reported on
      arXiv:2403.16760), tested realistic multimodal synthetic content with roughly 1,300 participants and
      found mean discrimination accuracy near chance (~50%). The authors&rsquo; blunt title frame: about as
      good as a coin toss <Cite n={35} title="Cooke et al. · CACM 2025" />. That does not mean experts can
      never detect synthetic work under other conditions. It does mean you should not build your trust habits
      on vibe alone.
    </p>

    <p>
      NewsGuard and similar watchdogs have documented thousands of low-quality, often AI-heavy
      &ldquo;news&rdquo; style domains used for ad arbitrage and junk information. Not a few bad actors.
      Many. EU-focused investigations (for example EU DisinfoLab&rsquo;s work on coordinated inauthentic
      behavior) trace how generative techniques get folded into campaigns. The point is not panic. The point
      is that economic incentives plus default tooling produce more synthetic text in the channel. That
      raises the burden on readers and institutions.
    </p>

    <p>
      Finally, the ambient mood. Reuters Institute&rsquo;s <em>Digital News Report</em> (2025) found 58% of
      respondents across their international sample <em>very</em> or <em>extremely concerned</em> about
      distinguishing real and false information on the internet. That is a broad epistemic anxiety measure,
      not specific to generative AI alone. It is part of the same weather system{" "}
      <Cite n={24} title="Reuters DNR · 2025" />.
    </p>

    <p>
      None of these lines proves that &ldquo;humans always lose.&rdquo; Industry SEO studies still often show
      human-led sites winning many top slots on important queries. The honest synthesis is narrower. Fluency
      is abundant. Formation is still costly. The signals that used to separate them are weaker than they
      were. For the full stat audit, see{" "}
      <ResearchLink slug="ai-credibility-crisis">The AI Credibility Crisis</ResearchLink> (analysis).
    </p>

    <h3 id="section-organizations">Organizations inherit the same weather</h3>

    <p>
      The crisis is not only something your <em>audience</em> feels when they read a newsletter. It is
      something <em>teams</em> feel when they draft donor letters, grant narratives, board decks, hiring
      pages, and internal FAQs. The same tools that help a tired communicator finish a paragraph also make
      it easier for an organization to ship fluency without friction. Friction, inconveniently, is sometimes
      where integrity shows up.
    </p>

    <p>
      In teams I have walked with through serious AI pilots, not as hype but as governance, we keep returning
      to a staged picture of organizational maturity. Early on, the posture that keeps trust intact is often
      structured experimentation with a moratorium on publishing. Learn in private. Document use cases.
      Treat &ldquo;we can generate a draft&rdquo; as a different claim from &ldquo;we are ready to stand
      behind this in public.&rdquo; That is not fear of technology. It is respect for the difference between
      speed and accountability.
    </p>

    <p>
      There is a humbler kind of credibility work, too: demoting or rewriting polished copy when provenance
      is unclear, when copy reads like a template that could belong to anyone. Credibility is not only what
      you add. Sometimes it is what you refuse to treat as finished.
    </p>

    <p>
      I mention this here because the rest of the book will keep circling the same tension. The channel
      rewards visibility. Trust requires traceability. Traceability is slower than a first draft.
    </p>

    <p>
      Organizations mirror the same weather. When fluent output is cheap, internal fragmentation stops being
      merely inefficient and becomes a threat to clarity. Clarity is part of credibility. The familiar reflex
      to add another tool onto a scattered system eventually hits a wall. The honest question becomes not
      only which platform to adopt but what system you are actually running. Later, when we take up shared,
      networked credibility inside a real field of practice (see{" "}
      <ResearchLink slug="credibility-thesis">The Credibility Thesis</ResearchLink> and{" "}
      <ResearchLink slug="scenius-network-credibility">Scenius as Credibility Mechanism</ResearchLink>), we
      return to what it takes to rebuild trust together. In this chapter the work stays diagnostic. Fluency
      spreads faster than formation. Institutions feel the same pressure readers do.
    </p>

    <h3 id="section-signals">Why volume, polish, and presence wobble</h3>

    <p>
      For years, if someone published steadily, articles, talks, newsletters, you could <em>infer</em>{" "}
      sustained attention. Today, a single operator with the right stack can simulate the <em>shape</em> of
      that consistency without the same embodied cost. Volume still <em>can</em> mean depth. It no longer{" "}
      <em>must</em>.
    </p>

    <p>
      Polish used to track with years of craft. Today, first drafts can look like final drafts. That is a
      gift for many communicators. It is also a mask. The page looks &ldquo;finished&rdquo; while the
      foundation, lived research, moral wrestling, community accountability, may be thin.
    </p>

    <p>
      Presence, posting, replying, showing up, used to signal commitment. Automated and semi-automated
      workflows can mimic presence. Again, the signal is not meaningless now. It is simply easier to fake.
      Wise readers hold it more lightly.
    </p>

    <p>
      If you are a movement leader, pastor, or nonprofit director, you may feel the unfairness here. You did
      the reading. You did the years. You took the losses that create genuine insight. And you are now asked
      to compete for attention in a channel where fluency spreads faster than wisdom. That is not a reason to
      despair. It is a reason to rename the problem. Not &ldquo;I am irrelevant,&rdquo; but &ldquo;the old
      shortcuts for proving relevance are eroding.&rdquo;
    </p>

    <h3 id="section-not">What this is not</h3>

    <p>
      This is not a claim that audiences have become irredeemably cynical about everything, or that
      AI-written text is always unethical or always false. Treating every smooth paragraph as suspect is not
      the answer either. That way lies paranoia.
    </p>

    <p>
      It <em>is</em> an invitation to lower your trust in cheap proxies and raise your investment in thick
      verification: named sources, accountable relationships, networks where people stake more than a profile
      photo on what they endorse.
    </p>

    <p>
      Thick verification also has a boring infrastructure shape. Where does the canonical version of a claim
      live? How do you map a sentence back to evidence? How do you keep a corpus from splintering across a
      dozen folders nobody can search? I have spent real months on that unglamorous layer. Not because it
      replaces moral judgment. Because credibility suffers when memory is scattered and nobody can find what
      was actually said.
    </p>

    <h3 id="section-tool">AI as both stressor and tool</h3>

    <p>
      The same technologies that flood the channel can, with boundaries, help a truthful voice be clearer and
      more discoverable. This book lives inside that tension. AI is part of the credibility pressure and
      part of the possible response. I am not going to resolve that neatly in chapter one. I am going to ask
      you to hold it with me.
    </p>

    <p>
      For leaders whose public voice is the center of their work, the boundary question is rarely
      &ldquo;whether&rdquo; AI is involved. It is who approves what, and on what basis: formation,
      relationship, and explicit process rather than intuition alone. AI does not do discernment. It does not
      do pastoral care. Those remain human work.
    </p>

    <h3 id="section-first">Why this chapter comes first</h3>

    <p>
      If we skip the diagnosis, the practical chapters sound like tactics for a world that no longer exists.
      If we exaggerate the diagnosis, we steal your hope and your agency. The middle path is sober
      description. The signals are weaker. Verification is harder. Your formation still matters. The game is
      not over. It changed.
    </p>

    <p>
      In the next chapter, I want to reframe <em>what kind of problem this is</em>, the leadership and
      formation work beneath the tooling decisions. Not because technology is irrelevant. It is not. Because
      the part that will bend your community, your ethics, and your calendar is not the same as the part that
      belongs in a release note.
    </p>

    <h3 id="section-reflection">Reflection questions</h3>

    <ol className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>01.</span>
        <span>
          When did you last misread fluency as expertise? What gave it away, if anything did?
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>02.</span>
        <span>
          Which cheap signal have you relied on most in your own leadership: volume, polish, or presence? What
          would it cost to supplement it with thicker proof?
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>03.</span>
        <span>
          Where do you feel unfairly invisible, and where might part of the problem be discoverability rather
          than substance?
        </span>
      </li>
    </ol>
  </>
);
