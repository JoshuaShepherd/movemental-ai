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
    <p id="section-summary">
      This analysis checks the numbers behind claims about AI and credibility. If you lead a church,
      nonprofit, or institution, you have probably heard alarming statistics. Some hold up. Some are broken
      telephone. This piece separates what the evidence supports from what gets repeated because it sounds
      right.
    </p>

    <p>
      A fair read of the research does not say humans always lose. It says cheap fluency is everywhere,
      discernment is hard for most people most of the time, and the old shortcuts for judging trust no
      longer work as well as they did. That is enough to take seriously without inventing a crisis headline.
    </p>

    <h3 id="section-sixty-eight">The &ldquo;68%&rdquo; statistic: likely a broken telephone</h3>
    <p>
      A careful pass for a statistic matching &ldquo;68% of internet users struggle to distinguish human vs.
      AI content&rdquo; did not surface a primary source with that exact triad (68 / internet users /
      struggle).
    </p>
    <p>What <em>is</em> well sourced:</p>
    <p>
      Pew Research Center (U.S. adults, June 2025, <em>n</em>=5,023)
      <Cite n={10} title="Pew · ongoing" />: 76% say it is extremely or very important to tell whether
      pictures, videos, and text are AI- or human-made. 53% are <em>not too</em> or <em>not at all
      confident</em> they can tell. That is a clean &ldquo;importance vs. self-efficacy&rdquo; gap. It
      supports a credibility narrative without inventing a fraction.
    </p>
    <p>
      All About Cookies (U.S. adults, February 2024, <em>n</em>=1,000, Prolific): 77% report they
      encountered something they believed was from a real person and later learned it was AI-generated. That
      supports pervasiveness plus retrospective surprise. It is not a controlled measure of discrimination
      accuracy.
    </p>
    <p>
      &ldquo;68%&rdquo; may be a mangled recall of 76% (Pew importance), 77% (AAC fooled), or another
      adjacent figure from a secondary infographic. Until someone produces the original citation, retire
      &ldquo;68%&rdquo; and use Pew 53% / 76% (with link and date) or AAC 77% with explicit &ldquo;U.S.
      self-report; not a lab discrimination task.&rdquo;
    </p>

    <h3 id="section-prevalence">
      &ldquo;40–60% of blog posts are AI-generated or assisted&rdquo;
    </h3>
    <p>
      This claim mixes three different empirical questions. What fraction of published posts contain any
      model-generated wording? What fraction are majority-AI with minimal human editing? What fraction of
      professional workflows use AI for drafting or research? Each question has different answers.
    </p>
    <p>
      The best large-scale prevalence proxy located for the first question, with explicit limits, is
      Ahrefs&rsquo; April 2025 study of 900,000 newly detected English pages (one per domain) using an
      in-house detector: 74.2% contained <em>some</em> AI-flagged content, with only 2.5% labeled
      &ldquo;pure AI&rdquo; and 25.8% &ldquo;pure human.&rdquo; That is staggering. But it is not
      &ldquo;blogs on major platforms&rdquo; and it is detector-dependent.
    </p>
    <p>
      Industry ranking studies (notably Semrush work summarized in Search Engine Land and Semrush&rsquo;s
      blog) suggest pure AI pages underperform humans at position #1 in sampled SERPs. That complicates any
      monotonic story that &ldquo;AI is already winning the credibility war everywhere.&rdquo; A more
      accurate line: AI is flooding the long tail and middle of the web, while high-trust discovery slots
      remain contested. They may be more dependent on brand, citations, and human proof than before.
    </p>
    <p>
      Retire &ldquo;40–60%&rdquo; unless tied to a specific report&rsquo;s definitions. Prefer Ahrefs&rsquo;
      74% contains some AI-detected text (new pages, English, Apr 2025) plus detector caveat, or cite
      workflow adoption separately.
    </p>

    <h3 id="section-synthetic">Synthetic scale: real, but mind the superlative</h3>
    <p>
      NewsGuard and similar organizations have documented thousands of AI-dominated &ldquo;news&rdquo; domains
      and rapid growth. EU DisinfoLab traces coordinated inauthentic behavior, including generative techniques
      in campaigns like Doppelganger.
    </p>
    <p>
      Be cautious with claims like &ldquo;millions of synthetic accounts indistinguishable from humans&rdquo;
      unless each clause is tied to a platform transparency report or a named measurement paper. The direction
      is right. The magnitude should not be freehand.
    </p>

    <h3 id="section-detection">Can people detect AI? It depends which humans and which media</h3>
    <p>
      The cleanest &ldquo;hard&rdquo; result for multimodal synthetic content in challenging conditions is
      Cooke et al., &ldquo;As Good As A Coin Toss&rdquo; (<em>CACM</em> 2025; arXiv:2403.16760): ~1,300
      participants, realistic stimuli, mean accuracy near chance (~50%), with several factors that degrade
      performance further. The authors argue bluntly against relying on unaided human perception as a defense.
    </p>
    <p>
      Text is not identical to video/audio. A <em>Scientific Reports</em> (2024) study on individual
      differences in text discrimination finds above-chance average performance but meaningful variance. Fluid
      intelligence helps. Heavier social/smartphone use correlates with mislabeling AI as human.
    </p>
    <p>
      2025 ACL work shows frequent ChatGPT-using expert annotators can be very strong detectors under certain
      protocols. Expertise and task design matter. Most people, most of the time, should not bet their trust
      habits on vibe checks, especially as models improve. It is unfair to imply nobody can detect AI or that
      all channels are already dominated undetectably.
    </p>

    <h3 id="section-trajectories">Trajectories and &ldquo;2–3 years&rdquo;</h3>
    <p>
      Economic incentives (cheap generation, ad arbitrage, affiliate farms) plus tooling defaults (AI in
      docs, mail, social drafts) point to more AI-touch, not less. NewsGuard&rsquo;s growth curves reinforce
      speed.
    </p>
    <p>
      What we did <em>not</em> find: a consensus academic forecast that by 2028 &ldquo;distinguishing real
      expertise from generated fluency will be nearly impossible without network verification.&rdquo; That
      sentence is strategic projection, not a literature finding. It can still be used if labeled as forecast
      and paired with what verification must solve (adversarial adaptation, incentives to spoof graphs of
      trust, and so on).
    </p>

    <h3 id="section-search">Search, platforms, and expertise discoverability</h3>
    <p>
      Google&rsquo;s public posture continues to evolve around spam, scaled low-value content, and quality,
      with third-party evidence that who ranks #1 in commercial queries still skews human-led in large
      samples. That does not negate AI&rsquo;s impact. It sharpens it. The fight moves from &ldquo;can you
      publish?&rdquo; to &ldquo;can you prove you were there, in relationship, in time?&rdquo; That shift
      favors leaders and organizations who can show real formation behind their words, not just fluent output.
    </p>

    <h3 id="section-collapse">&ldquo;Credibility collapse&rdquo;</h3>
    <p>
      No standard paper titled <em>credibility collapse</em> was identified as a canonical term in this pass.
      The phrase can still be useful if defined plainly: cheap signals (layout, tone, length,
      &ldquo;researchiness&rdquo;) are collapsing as proxies for human formation. Institutions still grade
      the old exam. Trust shifts to in-group attestations and dark patterns unless better habits emerge. That
      is honest framing: a coined term with a clear definition, not faux-academic naming.
    </p>

    <h3 id="section-religious">Religious / nonprofit / movement sector</h3>
    <p>
      Quantitative prevalence for &ldquo;AI-written sermons&rdquo; or &ldquo;AI-drafted annual reports&rdquo;
      was not established here. Qualitative evidence does show seminaries and theological educators wrestling
      with integrity, pedagogy, and policy (e.g., ATLA proceedings and theological librarianship literature in
      2024). That is enough for a &ldquo;culture is catching up&rdquo; subplot. It is not enough for a
      fabricated sector percentage.
    </p>

    <h3 id="section-evidence">Strongest version of the argument the evidence currently supports</h3>
    <p>
      First, a self-efficacy crisis (U.S., high quality): Pew&rsquo;s 53% not confident vs. 76% who say
      detection matters. Second, material contamination of new web documents (industry measurement): Ahrefs
      74.2% with some AI-detected content, with transparent detector limits. Third, weaponized scale
      (investigative orgs): NewsGuard and EU DisinfoLab document industrial misuse, not anecdote. Fourth,
      human limits under realism (peer review): Cooke et al. near-chance multimodal detection. Fifth, a
      non-collapse caveat (industry SEO): human-led pages still win many top slots. The honest conclusion is
      not &ldquo;humans always lose.&rdquo; It is that humans need better proof to defend scarce attention.
    </p>

    <h3 id="section-institutional">Institutional trust and &ldquo;poll&rdquo; context</h3>
    <p>
      Content authenticity connects to institutional trust. Edelman&rsquo;s 2025 Trust Barometer materials
      <Cite n={18} title="Edelman · 2025" /> (including AI-focused streams and flash polling) are useful for
      showing uneven comfort with corporate AI use and geographic divergence in AI trust. Pew&rsquo;s parallel
      finding that Americans are more concerned than excited about AI&rsquo;s spread (50% more concerned than
      excited in the September 2025 reporting suite)
      <Cite n={10} title="Pew · ongoing" /> complements the detection-confidence gap. Together, these sources
      support a societal unease story without requiring any single dramatic percentage about &ldquo;fooled
      users.&rdquo;
    </p>

    <h3 id="section-counter">Counterarguments to keep in the margin</h3>
    <p>
      Detector-driven prevalence may inflate &ldquo;AI %&rdquo; if detectors false-positive on certain human
      styles (non-native English, highly edited corporate tone). Experts exist who detect well. Some
      institutions will price discriminate toward them, creating inequality of discernment. That is a
      different social problem than universal fooled-ness. Platforms may throttle the worst slop faster than
      pessimists expect, while still leaving mid-tier junk ubiquitous.
    </p>

    <h3 id="section-verification">Verification systems and gaming (honest scope)</h3>
    <p>
      The fair answer from open reporting is yes for some layers: SEO networks, affiliate templates, AI news
      farms, and coordinated operations adapt to rulesets quickly. Academic and industry literature also
      documents detector evasion and humanization tactics. None of that proves that every verification
      approach is hopeless. It does imply arms-race maintenance costs for any signal that stays purely
      syntactic (metadata badges, stylometry, cheap attestations). Relationship-backed verification needs to
      be articulated as economic and social hardness, not mystical certainty. Networks can be gamed too.
      Cliques and astroturf are real. The honest pitch is comparative advantage: harder to fake than paragraph
      farms, worth building anyway.
    </p>

    <h3 id="section-constructive">Connection to Movemental&rsquo;s constructive thesis</h3>
    <p>
      The research does not prove any single platform thesis. It does clear space for a narrower claim. If
      fluency is cheap, relationship-rich verification (who vouches, who co-labored, who saw the work happen)
      becomes more valuable, not less, provided those connections are harder to fake than text alone.
      Movemental is building in that direction. The work is partial. The need is real.
    </p>

    <h3 id="section-closing">Closing note (tone)</h3>
    <p>
      This document is intentionally cool-headed. Urgency reads as maturity when the footnotes survive
      contact with Pew, arXiv, and the better industry studies. The goal is scope discipline, sourced
      numbers, and a willingness to soften a claim rather than defend a rounded integer that slipped in from
      a press release chain. Anchor claims to named studies with scope statements (country, date, <em>n</em>,
      task type). Separate &ldquo;AI touched this document&rdquo; from &ldquo;AI wrote this document&rdquo;
      from &ldquo;AI replaced human judgment.&rdquo; Treat &ldquo;credibility collapse&rdquo; as a defined
      thesis, not an established academic term. Pair alarm with counterevidence where it exists.
    </p>
  </>
);
