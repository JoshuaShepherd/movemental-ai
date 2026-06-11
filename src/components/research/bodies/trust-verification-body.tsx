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

/** Paper — ported from `docs/articles/graded-high/85-99/09-trust-verification.md`. */
export const trustVerificationBody: ReactNode = (
  <>
    <p className={styles.dropCap} id="section-question">
      Movemental wants to claim that <strong>individual polish signals</strong> (credentials, follower
      counts, publication volume) are losing ground to{" "}
      <strong>relationship-visible verification</strong>—co-authorship, mutual endorsement, traceable
      collaboration—especially under generative AI. The research partly supports that{" "}
      <strong>direction</strong>, but it does <strong>not</strong> grant a free pass: networks can be{" "}
      <strong>gamed</strong>, audiences often <strong>trust brands and institutions</strong> more than
      graphs they cannot read, and <strong>AI labeling</strong> does not automatically restore
      caution.
    </p>

    <h3 id="section-changing">What is actually changing: fragmentation, not a single &ldquo;trust slope&rdquo;</h3>

    <p>Three large survey literatures anchor the external context.</p>

    <p>
      <strong>Edelman Trust Barometer (2025 materials)</strong>{" "}
      <Cite n={18} title="Edelman · 2025" /> continues to describe a volatile institutional
      environment: grievance narratives, uneven trust by income, and acute sensitivity to perceived
      elite manipulation of information. The important nuance for Movemental is that Edelman&rsquo;s
      headline <strong>global trust index</strong> is often <strong>flat year to year</strong> while{" "}
      <strong>composition and mood</strong> shift. That means copy should avoid a cartoon
      &ldquo;everything collapsed this year&rdquo; unless tied to a specific indicator and wave.
    </p>

    <p>
      <strong>Reuters Institute <em>Digital News Report</em> 2025</strong>{" "}
      <Cite n={24} title="Reuters Institute · DNR 2025" /> offers a cleaner pair of facts for public
      epistemics. First, <strong>overall trust in news (40%)</strong> has been{" "}
      <strong>stable for three years</strong>—so the crisis is less &ldquo;people stopped trusting
      news in aggregate&rdquo; than &ldquo;attention, routes, and verification habits are
      reorganizing.&rdquo; Second, <strong>58%</strong> of respondents globally worry about telling
      true from false online (very high in the <strong>United States (73%)</strong> alongside parts of{" "}
      <strong>Africa (73%)</strong> in the same overview). Third, audiences expect AI to make news{" "}
      <strong>cheaper and faster</strong> but <strong>less trustworthy</strong> (net negative on
      trustworthiness). People still name <strong>trusted news brands</strong> and{" "}
      <strong>official sources</strong> as where they go to check claims—even as under-25s also reach
      for <strong>social</strong> and <strong>chatbots</strong>.
    </p>

    <p>
      <strong>Pew Research Center (2025)</strong> <Cite n={10} title="Pew · ongoing" /> complements
      this with AI-specific <strong>self-efficacy</strong>: most U.S. adults say knowing whether text,
      images, or video is AI-made is important, yet a majority express <strong>low confidence</strong>{" "}
      they can tell. That is not &ldquo;network verification,&rdquo; but it is fertile soil: users{" "}
      <strong>want</strong> proofs they cannot personally compute.
    </p>

    <p>
      <strong>Synthesis:</strong> Trust is <strong>fragmenting by channel and identity</strong>, not
      vanishing. Movemental&rsquo;s opportunity is to build <strong>legible proofs</strong> in an
      environment where people still reach for <strong>institutional brands</strong> when scared—and
      where <strong>fluency</strong> is cheap.
    </p>

    <h3 id="section-theory">Academic trust theory: where Movemental&rsquo;s four-part model fits</h3>

    <p>
      Movemental&rsquo;s shorthand—<strong>Trust + Expertise + Character + Platform</strong>—maps
      unevenly onto canonical frameworks:
    </p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Mayer, Davis, and Schoorman (1995)</strong> define trust in terms of perceived{" "}
          <strong>ability, benevolence, and integrity</strong> under risk. <strong>Expertise</strong>{" "}
          aligns with <strong>ability</strong>; <strong>character</strong> partially aligns with{" "}
          <strong>integrity</strong> and <strong>benevolence</strong>, though &ldquo;character&rdquo;
          also smuggles in moral aesthetics Mayer did not emphasize in that language.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Gefen, Karahanna, and Straub (2003)</strong> show that in online commerce,{" "}
          <strong>trust</strong> rivals perceived usefulness and ease as a driver of adoption—evidence
          that <strong>relationship-light</strong> digital environments still require{" "}
          <strong>credible trustee cues</strong>.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Hardin&rsquo;s &ldquo;encapsulated interest&rdquo;</strong> account reminds us that
          trust is not only a virtue display; it is an <strong>expectation sustained by interests and
          stakes</strong>. That matters for platform design: endorsements must be{" "}
          <strong>costly to fake</strong>, not merely plentiful.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Gambetta&rsquo;s work on signaling under moral hazard</strong> (popularized via{" "}
          <em>Codes of the Underworld</em>) is a blunt warning: <strong>signals get counterfeited</strong>{" "}
          when the upside is high and enforcement is weak—directly relevant to{" "}
          <strong>mutual praise rings</strong> and <strong>citation games</strong>.
        </span>
      </li>
    </ul>

    <p>
      <strong>Verdict:</strong> Movemental&rsquo;s model is <strong>defensible as synthesis</strong>,
      not as &ldquo;the standard social-science taxonomy.&rdquo; Use it internally for alignment;
      externally, pair it with <strong>Mayer-ish language</strong> when speaking to researchers, and
      be explicit that <strong>&ldquo;platform&rdquo;</strong> is a <strong>product governance</strong>{" "}
      layer Mayer&rsquo;s paper did not specify.
    </p>

    <h3 id="section-evaluation">Online trustworthiness evaluation: what people actually do</h3>

    <p>
      <strong>Elizabeth Sillence and colleagues&rsquo;</strong> early work on <strong>health websites</strong>{" "}
      showed a staged process: rapid <strong>rejection</strong> on superficial cues, deeper{" "}
      <strong>selection</strong> on perceived <strong>content credibility</strong> and{" "}
      <strong>personal fit</strong>. That pattern still haunts product design: users punish ugly or
      chaotic surfaces, then over-trust fluent prose.
    </p>

    <p>
      Movemental&rsquo;s &ldquo;transparent relationships&rdquo; thesis is compatible with this
      literature if &ldquo;transparency&rdquo; means{" "}
      <strong>inspectable evidence of work together over time</strong>—not a wall of logos. The failure
      mode is <strong>insider credentialism</strong>: a graph that impresses <strong>alumni networks</strong>{" "}
      but reads as <strong>clubbiness</strong> to newcomers.
    </p>

    <h3 id="section-network">Network-based trust: evidence and limits</h3>

    <p>
      <strong>What reputation systems teach.</strong> The <strong>eBay</strong> research program is the
      cleanest parable. Reputation profiles are <strong>economically valuable</strong> (price premia for
      established identities) but the system also exhibits <strong>reciprocity</strong>,{" "}
      <strong>positivity bias</strong>, and <strong>weak punishment</strong> for new sellers with a
      small number of negatives. <strong>Stack Overflow–style karma</strong> shows that even
      contribution-linked reputation produces <strong>exclusion dynamics</strong> and{" "}
      <strong>metric hacking</strong> over time.
    </p>

    <p>
      <strong>Co-authorship and citations.</strong> Inside science, <strong>co-authorship and citations</strong>{" "}
      are high-fidelity <strong>labor-market signals</strong>. Outside narrow publics, they are often{" "}
      <strong>illegible</strong>. Dense co-authorship and organizational affiliations are compelling{" "}
      <strong>to readers who already know what a citation means</strong>. For a general movement leader
      audience, the same graph must be <strong>translated</strong> into:{" "}
      <em>who did you build with, on what, and what can a stranger verify in five minutes?</em>
    </p>

    <p>
      <strong>Failure modes Movemental must name openly.</strong>{" "}
      <strong>Citation rings, peer-review fraud, bought citations, and coordinated inauthentic communities</strong>{" "}
      are not rare edge cases—they are an industry. Any platform that treats{" "}
      <strong>edges in a social graph</strong> as innocence by construction will get played.
      Movemental&rsquo;s honest pitch is <strong>comparative</strong>: relationship proofs are{" "}
      <strong>costlier than one-shot text</strong>, not impossible to forge.
    </p>

    <h3 id="section-identity">Digital identity today: badges, institutions, and the blockchain detour</h3>

    <p>
      Current mainstream verification stacks include <strong>platform-issued badges</strong>,{" "}
      <strong>institutional affiliations</strong>, <strong>professional directories</strong>,{" "}
      <strong>payment rails / legal identity</strong> (for commerce), and emerging{" "}
      <strong>W3C Verifiable Credentials</strong> ecosystems. Blockchain-based identity remains{" "}
      <strong>patchy in consumer adoption</strong>; treat as optional infrastructure, not prerequisite
      philosophy.
    </p>

    <p>
      What matters for Movemental is not maximal decentralization but <strong>interoperable evidence</strong>:
      stable identifiers, <strong>outbound links</strong> to canonical profiles, and{" "}
      <strong>time-stamped collaboration artifacts</strong> (shared publications, events, projects)
      that third parties can corroborate.
    </p>

    <h3 id="section-eeat">EEAT: Google&rsquo;s vocabulary is aligned—but easy to misquote</h3>

    <p>
      Google&rsquo;s own Search Central guidance is unusually explicit: systems aim to identify signals
      associated with <strong>Experience, Expertise, Authoritativeness, and Trustworthiness</strong>,
      with <strong>Trust foremost</strong>; <strong>E-E-A-T is not a single ranking factor</strong>;{" "}
      <strong>quality raters do not directly rank pages</strong>{" "}
      <Cite n={22} title="Google · Search Quality Rater Guidelines" />. The practical guidance
      Movemental should steal is mundane and powerful: <strong>clear bylines</strong>,{" "}
      <strong>author pages</strong>, <strong>About</strong> pages, <strong>process transparency</strong>{" "}
      (&ldquo;How was this made?&rdquo; including AI assistance), and a coherent{" "}
      <strong>site purpose</strong>.
    </p>

    <p>
      There is <strong>no</strong> public evidence bundle in this research pass that proves
      &ldquo;<strong>networks</strong> of verified experts always rank above{" "}
      <strong>individual</strong> experts.&rdquo; What <em>is</em> supported is weaker but still useful:{" "}
      <strong>authoritative reputation</strong> is evaluated in context, and <strong>recognition</strong>{" "}
      within a topic community is a recurring theme in rater concepts—which <strong>rhymes with</strong>{" "}
      mutual endorsement when those endorsements are <strong>real and checkable</strong>.
    </p>

    <h3 id="section-ai-sources">How AI assistants choose sources (high level)</h3>

    <p>
      Retrieval-augmented systems classically risk <strong>confusing relevance with truth</strong>.
      Recent research threads (e.g., reliability-aware RAG, EMNLP 2025) push toward{" "}
      <strong>cross-source corroboration</strong> and <strong>reliability weighting</strong>. In product
      reality, vendor assistants still heuristically favor <strong>well-linked, canonical domains</strong>{" "}
      and <strong>repeated training corpora associations</strong>.
    </p>

    <p>For Movemental, the design implication is dual:</p>

    <ol className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>01.</span>
        <span>
          <strong>Human trust:</strong> show <strong>relationships</strong> and{" "}
          <strong>accountability chains</strong>.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>02.</span>
        <span>
          <strong>Machine legibility:</strong> maintain <strong>stable entities</strong>,{" "}
          <strong>consistent naming</strong>, <strong>primary sources</strong>, and{" "}
          <strong>human-readable structured metadata</strong> so answers that cite the movement leader
          are <strong>anchored</strong> rather than hallucinated glosses.
        </span>
      </li>
    </ol>

    <h3 id="section-labels">AI labels and the uncomfortable psychology</h3>

    <p>
      Stanford HAI&rsquo;s policy brief on <strong>labeling AI-generated content</strong>{" "}
      <Cite n={25} title="Stanford HAI · AI labeling brief" /> summarizes evidence that labels can shift{" "}
      <strong>attribution</strong> without reliably reducing <strong>persuasion</strong> for some message
      types. JMIR-adjacent findings (summarized in secondary reporting) similarly suggest labels may
      help <strong>identify</strong> AI without fixing <strong>sharing</strong> behavior.
    </p>

    <p>
      <strong>Implication:</strong> &ldquo;Transparency as credibility protection&rdquo; must mean{" "}
      <strong>more than disclosure badges</strong>. Transparency should surface <strong>who vouches</strong>,{" "}
      <strong>what primary evidence exists</strong>, and <strong>what would falsify the claim</strong>—the
      kinds of moves that also satisfy skeptical readers trained on Wikipedia-era norms.
    </p>

    <h3 id="section-design">Design principles if Movemental bets on visible network trust</h3>

    <ol className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>01.</span>
        <span>
          <strong>Default to inspectability.</strong> Every endorsement should deep-link to{" "}
          <strong>public evidence of collaboration</strong> (event program, publication, project repo,
          dated media), not a floating integer.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>02.</span>
        <span>
          <strong>Costly signals only.</strong> Prefer infrequent, specific attestations over
          high-volume mutual likes.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>03.</span>
        <span>
          <strong>Outsider legibility.</strong> Translate academic co-authorship into{" "}
          <strong>plain-language &ldquo;built with&rdquo;</strong> stories.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>04.</span>
        <span>
          <strong>Anti-ring hygiene.</strong> Rate-limit symmetric endorsements; surface{" "}
          <strong>triangle closure</strong> anomalies; allow <strong>dispute</strong> and{" "}
          <strong>retraction</strong> flows.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>05.</span>
        <span>
          <strong>Pair graph with institution.</strong> Brands still function as{" "}
          <strong>verification endpoints</strong> in Reuters&rsquo; data—Movemental should{" "}
          <strong>partner</strong>, not pretend institutions are obsolete.
        </span>
      </li>
    </ol>

    <h3 id="section-overstated">Where the thesis can be overstated</h3>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Networks are not automatically harder to fake than text</strong>—cheap coordination
          can manufacture a clique.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Co-authorship is not a moral halo</strong>—bad actors publish together.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>EEAT is not a cheat code</strong>—it rewards clarity and truth-seeking behavior, not
          graph tricks.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Trust is stable in places</strong>—do not claim universal collapse without a named
          metric.
        </span>
      </li>
    </ul>

    <h3 id="section-bottom-line">Bottom line for internal strategy</h3>

    <p>
      Movemental&rsquo;s network-verification story is <strong>directionally aligned</strong> with major
      surveys (fragmentation, epistemic anxiety, AI pessimism on news trustworthiness) and with classic
      trust theory <strong>if</strong> incentives and inspectability are taken seriously. It becomes{" "}
      <strong>speculative</strong> when it implies <strong>automatic audience comprehension</strong> of
      dense academic graphs or <strong>immunity</strong> to gaming.
    </p>

    <p>
      The strongest honest version: <strong>fluency got cheap; relationships and corroboration still
      expensive</strong>—and a platform can make that <strong>visible</strong> without sounding like a
      guild if it invests in <strong>translation</strong>, <strong>evidence links</strong>, and{" "}
      <strong>governance</strong> that assumes malice as normal.
    </p>

    <p>
      <strong>Cross-check against credible AI guidance.</strong> Internal content on markers of
      credible AI guidance can align with the evidence above if &ldquo;love&rdquo; is operationalized as{" "}
      <strong>patient truthfulness</strong>—citing primary sources, naming limits, inviting
      correction—rather than warmth alone. Warm tone without <strong>verifiable accountability</strong>{" "}
      is exactly what generative models can counterfeit. The research on <strong>labels</strong>{" "}
      reinforces that <strong>disclosure is insufficient</strong>; the ethical bar is closer to{" "}
      <strong>provenance + consequences</strong> (who stands behind the answer, and what happens if it
      is wrong).
    </p>

    <p>
      <strong>Institutional trust vs. peer trust (keep both on the table).</strong> Edelman&rsquo;s
      tech-sector streams and AI-focused flash materials (2025 cycle) underline that{" "}
      <strong>comfort with corporate AI use</strong> and <strong>trust in &ldquo;technology&rdquo;</strong>{" "}
      do not move in lockstep—people can use tools they do not deeply trust. That is another reason
      Movemental should not overfit to a single story about <strong>peer graphs replacing
      institutions</strong>. A pragmatic product narrative is <strong>hybrid trust</strong>: peers and
      partners provide <strong>speed and context</strong>; institutions, publishers, and brands provide{" "}
      <strong>anchors</strong> when stakes are high—matching the Reuters finding that people still name
      established outlets when they want to verify a rumor.
    </p>
  </>
);
