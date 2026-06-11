import type { ReactNode } from "react";
import Link from "next/link";

import styles from "../research.module.css";

/** Superscript citation marker linking to the master sources page. */
function Cite({ n, title }: { n: number; title: string }) {
  return (
    <Link href="/research/sources" className={styles.citationSup} title={title}>
      [{n}]
    </Link>
  );
}

/** Flagship analysis — ported from `docs/articles/graded-high/85-99/01-ai-credibility-crisis.md`. */
export const aiCredibilityCrisisBody: ReactNode = (
  <>
    <p className={styles.dropCap} id="section-summary">
      The underlying <em>story</em> Movemental wants to tell is directionally plausible:
      generative AI lowers the cost of fluent, polished, &ldquo;credible-looking&rdquo; text and
      imagery; platform incentives reward volume; and ordinary users are unsure how to authenticate
      what they see. But several <strong>specific numbers</strong> in circulation are{" "}
      <strong>misaligned with their likely sources</strong> or{" "}
      <strong>overstate what peer-reviewed work proves</strong>.
    </p>

    <p>
      If Movemental wants a reputation for intellectual honesty (especially with research-minded
      movement leaders), the strongest public version of the argument will:
    </p>

    <ol className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>01.</span>
        <span>
          <strong>Anchor claims to named studies</strong> with scope statements (country, date,{" "}
          <em>n</em>, task type: discrimination vs. self-reported &ldquo;fooled once&rdquo; vs.
          workflow survey).
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>02.</span>
        <span>
          <strong>Separate</strong> &ldquo;AI touched this document&rdquo; from &ldquo;AI wrote
          this document&rdquo; from &ldquo;AI replaced human judgment.&rdquo;
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>03.</span>
        <span>
          Treat <strong>&ldquo;credibility collapse&rdquo;</strong> as a <strong>defined thesis</strong>,
          not an established academic term.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>04.</span>
        <span>
          Pair alarm with <strong>counterevidence where it exists</strong> (e.g., top-ranking pages
          still disproportionately human-led in major SEO samples; expert annotators can detect many
          AI texts).
        </span>
      </li>
    </ol>

    <h3 id="section-sixty-eight">The &ldquo;68%&rdquo; statistic: likely a broken telephone</h3>
    <p>
      A careful pass for a statistic matching{" "}
      <strong>
        &ldquo;68% of internet users struggle to distinguish human vs. AI content&rdquo;
      </strong>{" "}
      did not surface a primary source with that exact triad (68 / internet users / struggle).
    </p>
    <p>What <em>is</em> well sourced:</p>
    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>
            Pew Research Center (U.S. adults, June 2025, <em>n</em>=5,023)
            <Cite n={10} title="Pew · ongoing" />:
          </strong>{" "}
          <strong>76%</strong> say it is extremely or very important to tell whether pictures,
          videos, and text are AI- or human-made; <strong>53%</strong> are <em>not too</em> or{" "}
          <em>not at all confident</em> they can tell. That is a clean &ldquo;importance vs.
          self-efficacy&rdquo; gap—excellent for a credibility narrative without inventing a
          fraction.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>All About Cookies (U.S. adults, February 2024, <em>n</em>=1,000, Prolific):</strong>{" "}
          <strong>77%</strong> report they encountered something they believed was from a real person
          and later learned it was AI-generated. That supports{" "}
          <strong>pervasiveness + retrospective surprise</strong>, not a controlled measure of
          discrimination accuracy.
        </span>
      </li>
    </ul>
    <p>
      <strong>Hypothesis:</strong> &ldquo;68%&rdquo; may be a mangled recall of <strong>76%</strong>{" "}
      (Pew importance), <strong>77%</strong> (AAC fooled), or another adjacent figure from a
      secondary infographic.
    </p>
    <p>
      <strong>Editorial recommendation:</strong> Delete &ldquo;68%&rdquo; until someone produces
      the original citation. Replace with <strong>Pew 53% / 76%</strong> (with link and date) or{" "}
      <strong>AAC 77%</strong> with explicit &ldquo;U.S. self-report; not a lab discrimination
      task.&rdquo;
    </p>

    <h3 id="section-prevalence">
      &ldquo;40–60% of blog posts are AI-generated or assisted&rdquo;
    </h3>
    <p>This claim mixes <strong>three different empirical questions</strong>:</p>
    <ol className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>1.</span>
        <span>What fraction of published posts contain any model-generated wording?</span>
      </li>
      <li>
        <span className={styles.articleListNum}>2.</span>
        <span>What fraction are majority-AI with minimal human editing?</span>
      </li>
      <li>
        <span className={styles.articleListNum}>3.</span>
        <span>
          What fraction of professional <em>workflows</em> use AI for drafting or research?
        </span>
      </li>
    </ol>
    <p>
      The best large-scale <strong>prevalence</strong> proxy located for (1), with explicit limits,
      is <strong>Ahrefs&rsquo; April 2025 study</strong> of <strong>900,000</strong> newly detected
      English pages (one per domain) using an in-house detector: <strong>74.2%</strong> contained{" "}
      <em>some</em> AI-flagged content, with only <strong>2.5%</strong> labeled &ldquo;pure
      AI&rdquo; and <strong>25.8%</strong> &ldquo;pure human.&rdquo; That is staggering—but it is{" "}
      <strong>not</strong> &ldquo;blogs on major platforms&rdquo; and it is{" "}
      <strong>detector-dependent</strong>.
    </p>
    <p>
      Industry ranking studies (notably <strong>Semrush</strong> work summarized in Search Engine
      Land and Semrush&rsquo;s blog) suggest <strong>pure AI pages underperform humans at position
      #1</strong> in sampled SERPs. That complicates any monotonic story that &ldquo;AI is already
      winning the credibility war everywhere.&rdquo; A more accurate line:{" "}
      <strong>AI is flooding the long tail and middle of the web</strong>, while{" "}
      <strong>high-trust discovery slots remain contested</strong>—and may be <em>more</em> dependent
      on brand, citations, and human proof than before.
    </p>
    <p>
      <strong>Recommendation:</strong> Retire &ldquo;40–60%&rdquo; unless tied to a specific
      report&rsquo;s definitions. Prefer <strong>Ahrefs&rsquo; 74% contains some AI-detected text</strong>{" "}
      (new pages, English, Apr 2025) plus detector caveat, <em>or</em> cite{" "}
      <strong>workflow adoption</strong> separately.
    </p>

    <h3 id="section-synthetic">Synthetic scale: real, but mind the superlative</h3>
    <p>
      <strong>NewsGuard</strong> and similar organizations have documented <strong>thousands</strong>{" "}
      of AI-dominated &ldquo;news&rdquo; domains and rapid growth.{" "}
      <strong>EU DisinfoLab</strong> traces <strong>coordinated inauthentic behavior</strong> at
      scale, including <strong>generative</strong> techniques in campaigns like{" "}
      <strong>Doppelganger</strong>.
    </p>
    <p>
      Movemental should be cautious with{" "}
      <strong>
        &ldquo;millions of synthetic accounts indistinguishable from humans&rdquo;
      </strong>{" "}
      unless each clause is tied to a platform transparency report or a named measurement paper. The{" "}
      <em>direction</em> is right; the <strong>magnitude</strong> should not be freehand.
    </p>

    <h3 id="section-detection">Can people detect AI? It depends which humans and which media</h3>
    <p>
      The cleanest &ldquo;hard&rdquo; result for <strong>multimodal synthetic content in challenging
      conditions</strong> is Cooke et al., <strong>&ldquo;As Good As A Coin Toss&rdquo;</strong> (
      <em>CACM</em> 2025; arXiv:2403.16760): <strong>~1,300 participants</strong>, realistic stimuli,{" "}
      <strong>mean accuracy near chance (~50%)</strong>, with several factors that degrade
      performance further. The authors argue bluntly against relying on{" "}
      <strong>unaided human perception</strong> as a defense.
    </p>
    <p>
      Text is not identical to video/audio. A <em>Scientific Reports</em> (2024) study on{" "}
      <strong>individual differences</strong> in text discrimination finds{" "}
      <strong>above-chance</strong> average performance but meaningful variance;{" "}
      <strong>fluid intelligence</strong> helps, and heavier <strong>social/smartphone use</strong>{" "}
      correlates with <strong>mislabeling AI as human</strong>.
    </p>
    <p>
      2025 ACL work shows <strong>frequent ChatGPT-using expert annotators</strong> can be{" "}
      <strong>very strong</strong> detectors under certain protocols—an important nuance:{" "}
      <strong>expertise and task design matter</strong>.
    </p>
    <p>
      <strong>Implication for Movemental:</strong> It is still fair to say{" "}
      <strong>
        most people, most of the time, should not bet their epistemology on vibe checks
      </strong>
      —especially as models improve—but it is unfair to imply <strong>nobody</strong> can detect AI
      or that <strong>all channels</strong> are already dominated undetectably.
    </p>

    <h3 id="section-trajectories">Trajectories and &ldquo;2–3 years&rdquo;</h3>
    <p>
      Economic incentives (cheap generation, ad arbitrage, affiliate farms) plus tooling defaults (AI
      in docs, mail, social drafts) point to <strong>more</strong> AI-touch, not less. NewsGuard&rsquo;s
      growth curves reinforce <strong>speed</strong>.
    </p>
    <p>
      What we did <em>not</em> find: a consensus academic forecast that <strong>by 2028</strong>{" "}
      &ldquo;distinguishing real expertise from generated fluency will be{" "}
      <strong>nearly impossible</strong> without network verification.&rdquo; That sentence is{" "}
      <strong>strategic projection</strong>, not a literature finding. It can still be used{" "}
      <strong>if labeled as forecast</strong> and paired with <strong>what verification must
      solve</strong> (adversarial adaptation, incentives to spoof graphs of trust, etc.).
    </p>

    <h3 id="section-search">Search, platforms, and expertise discoverability</h3>
    <p>
      Google&rsquo;s public posture continues to evolve around <strong>spam</strong>,{" "}
      <strong>scaled low-value content</strong>, and <strong>quality</strong>—with third-party
      evidence that <strong>who ranks #1</strong> in commercial queries still skews{" "}
      <strong>human-led</strong> in large samples. That does not negate AI&rsquo;s impact; it{" "}
      <strong>sharpens</strong> it: <strong>the fight moves from &ldquo;can you publish?&rdquo; to
      &ldquo;can you prove you were there, in relationship, in time?&rdquo;</strong> That is
      actually friendly to Movemental&rsquo;s deeper thesis about{" "}
      <strong>network-embodied credibility</strong>.
    </p>

    <h3 id="section-collapse">&ldquo;Credibility collapse&rdquo;</h3>
    <p>
      No standard paper titled <em>credibility collapse</em> was identified as a canonical term in
      this pass. Movemental can own the phrase <strong>if</strong> it defines:
    </p>
    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Inputs collapsing:</strong> cheap signals (layout, tone, length,
          &ldquo;researchiness&rdquo;)
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Verification lag:</strong> institutions still grading the old exam
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Epistemic externalities:</strong> trust shifts to <strong>in-group
          attestations</strong> and <strong>dark patterns</strong> unless better infrastructure
          emerges
        </span>
      </li>
    </ul>
    <p>
      That is honest framing: <strong>coinage + definition</strong>, not faux-academic naming.
    </p>

    <h3 id="section-religious">Religious / nonprofit / movement sector</h3>
    <p>
      Quantitative prevalence for &ldquo;AI-written sermons&rdquo; or &ldquo;AI-drafted annual
      reports&rdquo; was not established here. Qualitative evidence <strong>does</strong> show
      seminaries and theological educators wrestling with <strong>integrity, pedagogy, and
      policy</strong> (e.g., ATLA proceedings and theological librarianship literature in 2024). That
      is enough for a <strong>culture is catching up</strong> subplot, not for a fabricated sector
      percentage.
    </p>

    <h3 id="section-evidence">Strongest version of the argument the evidence currently supports</h3>
    <ol className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>1.</span>
        <span>
          <strong>Self-efficacy crisis (U.S., high quality):</strong> Pew&rsquo;s <strong>53%</strong>{" "}
          not confident vs. <strong>76%</strong> who say detection matters.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>2.</span>
        <span>
          <strong>Material contamination of new web documents (industry measurement):</strong> Ahrefs{" "}
          <strong>74.2%</strong> with some AI-detected content, with transparent detector limits.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>3.</span>
        <span>
          <strong>Weaponized scale (investigative orgs):</strong> NewsGuard / EU DisinfoLab document{" "}
          <strong>industrial</strong> misuse—not anecdote.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>4.</span>
        <span>
          <strong>Human limits under realism (peer review):</strong> Cooke et al.{" "}
          <strong>near-chance</strong> multimodal detection.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>5.</span>
        <span>
          <strong>Non-collapse caveat (industry SEO):</strong> human-led pages still win many{" "}
          <strong>top</strong> slots—so Movemental&rsquo;s offer is not &ldquo;humans always
          lose,&rdquo; but <strong>humans need better proof graphs</strong> to defend <em>scarce</em>{" "}
          attention.
        </span>
      </li>
    </ol>

    <h3 id="section-constructive">Connection to Movemental&rsquo;s constructive thesis</h3>
    <p>The research does not <em>prove</em> &ldquo;scenius,&rdquo; but it <strong>clears space</strong> for it:</p>
    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          If <strong>fluency is cheap</strong>, <strong>relationship-rich verification</strong> (who
          vouches, who co-labored, who saw the work happen) becomes <strong>more valuable</strong>,
          not less—<em>provided</em> those graphs are harder to fake than text alone.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Movemental should be explicit that <strong>network verification</strong> is not a magic
          shield; it can be <strong>gamed</strong> by cliques and astroturf. The honest pitch is{" "}
          <strong>comparative advantage</strong>: harder to scale than paragraph farms;{" "}
          <strong>worth building</strong> anyway.
        </span>
      </li>
    </ul>

    <h3 id="section-counter">Counterarguments to keep in the margin</h3>
    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Detector-driven prevalence</strong> inflates &ldquo;AI %&rdquo; if detectors
          false-positive on certain human styles (non-native English, highly edited corporate tone).
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Experts exist</strong> who detect well; some institutions will{" "}
          <strong>price discriminate</strong> toward them—creating{" "}
          <strong>inequality of discernment</strong>, a different social problem than universal
          fooled-ness.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Platforms may throttle</strong> the worst slop faster than pessimists expect—while
          still leaving <strong>mid-tier junk</strong> ubiquitous.
        </span>
      </li>
    </ul>

    <h3 id="section-institutional">Institutional trust and &ldquo;poll&rdquo; context</h3>
    <p>
      Movemental sometimes needs a bridge from <strong>content authenticity</strong> to{" "}
      <strong>institutional trust</strong>. Edelman&rsquo;s 2025 Trust Barometer materials
      <Cite n={18} title="Edelman · 2025" /> (including AI-focused streams and flash polling) are
      useful for showing <strong>uneven comfort</strong> with corporate AI use and{" "}
      <strong>geographic divergence</strong> in AI trust—helpful nuance so Movemental does not imply
      a single global mood. Pew&rsquo;s parallel finding that Americans are{" "}
      <strong>more concerned than excited</strong> about AI&rsquo;s spread (50% more concerned than
      excited in the September 2025 reporting suite)
      <Cite n={10} title="Pew · ongoing" /> complements the detection-confidence gap. Together,
      these sources support a <strong>societal unease</strong> story without requiring any single
      dramatic percentage about &ldquo;fooled users.&rdquo;
    </p>

    <h3 id="section-verification">Verification systems and gaming (honest scope)</h3>
    <p>
      The fair answer from open reporting is <strong>yes for some layers</strong>: SEO networks,
      affiliate templates, AI news farms, and coordinated operations adapt to rulesets quickly.
      Academic and industry literature also documents <strong>detector evasion</strong> and{" "}
      <strong>humanization</strong> tactics. None of that proves that <em>every</em> verification
      approach is hopeless; it does imply <strong>arms-race maintenance costs</strong> for any signal
      that stays purely syntactic (metadata badges, stylometry, cheap attestations). That is
      precisely why Movemental&rsquo;s emphasis on <strong>relationship-backed verification</strong>{" "}
      needs to be articulated as <strong>economic and social</strong> hardness—not mystical
      certainty.
    </p>

    <h3 id="section-closing">Closing note (tone)</h3>
    <p>
      This document is intentionally cool-headed. The marketing site can still be urgent—but{" "}
      <strong>urgency reads as maturity</strong> when the footnotes survive contact with Pew, arXiv,
      and the better industry studies. Movemental wins when it models the{" "}
      <strong>epistemic virtues</strong> it sells: scope discipline, sourced numbers, and a
      willingness to <strong>soften a claim</strong> rather than defend a rounded integer that
      slipped in from a press release chain.
    </p>
  </>
);
