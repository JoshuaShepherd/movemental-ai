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

/** Paper, ported from `docs/articles/graded-high/85-99/09-trust-verification.md`. */
export const trustVerificationBody: ReactNode = (
  <>
    <p className={styles.dropCap} id="section-question">
      The research question is whether polished individual signals (credentials, follower counts,
      publication volume) are losing ground to verification you can see in relationships: co-authorship,
      mutual endorsement, traceable collaboration, especially under generative AI. The evidence partly
      supports that direction. It does not grant a free pass. Networks can be gamed. Audiences often trust
      brands and institutions more than graphs they cannot read. AI labeling does not automatically restore
      caution.
    </p>

    <h3 id="section-changing">What is actually changing: fragmentation, not a single &ldquo;trust slope&rdquo;</h3>

    <p>Three large survey literatures anchor the external context.</p>

    <p>
      The Edelman Trust Barometer (2025 materials){" "}
      <Cite n={18} title="Edelman · 2025" /> continues to describe a volatile institutional
      environment: grievance narratives, uneven trust by income, and acute sensitivity to perceived
      elite manipulation of information. The important nuance is that Edelman&rsquo;s headline global
      trust index is often flat year to year while composition and mood shift. Copy should avoid a cartoon
      &ldquo;everything collapsed this year&rdquo; unless tied to a specific indicator and wave.
    </p>

    <p>
      The Reuters Institute <em>Digital News Report</em> 2025{" "}
      <Cite n={24} title="Reuters Institute · DNR 2025" /> offers a cleaner pair of facts for public
      epistemics. First, overall trust in news (40%) has been stable for three years. The crisis is less
      &ldquo;people stopped trusting news in aggregate&rdquo; than &ldquo;attention, routes, and
      verification habits are reorganizing.&rdquo; Second, 58% of respondents globally worry about telling
      true from false online (very high in the United States (73%) alongside parts of Africa (73%) in the
      same overview). Third, audiences expect AI to make news cheaper and faster but less trustworthy (net
      negative on trustworthiness). People still name trusted news brands and official sources as where they
      go to check claims, even as under-25s also reach for social media and chatbots.
    </p>

    <p>
      Pew Research Center (2025) <Cite n={10} title="Pew · ongoing" /> complements this with AI-specific
      self-efficacy: most U.S. adults say knowing whether text, images, or video is AI-made is important,
      yet a majority express low confidence they can tell. That is not &ldquo;network verification,&rdquo;
      but it is fertile soil: users want proofs they cannot personally compute.
    </p>

    <p>
      Synthesis: Trust is fragmenting by channel and identity, not vanishing. The opportunity is to build
      legible proofs in an environment where people still reach for institutional brands when scared, and
      where fluency is cheap.
    </p>

    <h3 id="section-theory">Academic trust theory: where the four-part model fits</h3>

    <p>
      The shorthand Trust + Expertise + Character + Platform maps unevenly onto canonical frameworks:
    </p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Mayer, Davis, and Schoorman (1995) define trust in terms of perceived ability, benevolence, and
          integrity under risk. Expertise aligns with ability; character partially aligns with integrity and
          benevolence, though &ldquo;character&rdquo; also smuggles in moral aesthetics Mayer did not
          emphasize in that language.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Gefen, Karahanna, and Straub (2003) show that in online commerce, trust rivals perceived
          usefulness and ease as a driver of adoption. Relationship-light digital environments still require
          credible trustee cues.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Hardin&rsquo;s &ldquo;encapsulated interest&rdquo; account reminds us that trust is not only a
          virtue display; it is an expectation sustained by interests and stakes. Endorsements must be
          costly to fake, not merely plentiful.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Gambetta&rsquo;s work on signaling under moral hazard (popularized via <em>Codes of the
          Underworld</em>) is a blunt warning: signals get counterfeited when the upside is high and
          enforcement is weak. That applies directly to mutual praise rings and citation games.
        </span>
      </li>
    </ul>

    <p>
      Verdict: The four-part model is defensible as synthesis, not as &ldquo;the standard social-science
      taxonomy.&rdquo; Use it internally for alignment; externally, pair it with Mayer-ish language when
      speaking to researchers, and be explicit that &ldquo;platform&rdquo; is a product governance layer
      Mayer&rsquo;s paper did not specify.
    </p>

    <h3 id="section-evaluation">Online trustworthiness evaluation: what people actually do</h3>

    <p>
      Elizabeth Sillence and colleagues&rsquo; early work on health websites showed a staged process: rapid
      rejection on superficial cues, deeper selection on perceived content credibility and personal fit.
      That pattern still haunts product design: users punish ugly or chaotic surfaces, then over-trust
      fluent prose.
    </p>

    <p>
      The &ldquo;transparent relationships&rdquo; thesis is compatible with this literature if
      &ldquo;transparency&rdquo; means inspectable evidence of work together over time, not a wall of
      logos. The failure mode is insider credentialism: a graph that impresses alumni networks but reads as
      clubbiness to newcomers.
    </p>

    <h3 id="section-network">Network-based trust: evidence and limits</h3>

    <p>
      What reputation systems teach. The eBay research program is the cleanest parable. Reputation profiles
      are economically valuable (price premia for established identities) but the system also exhibits
      reciprocity, positivity bias, and weak punishment for new sellers with a small number of negatives.
      Stack Overflow-style karma shows that even contribution-linked reputation produces exclusion dynamics
      and metric hacking over time.
    </p>

    <p>
      Co-authorship and citations. Inside science, co-authorship and citations are high-fidelity labor-market
      signals. Outside narrow publics, they are often illegible. Dense co-authorship and organizational
      affiliations are compelling to readers who already know what a citation means. For a general movement
      leader audience, the same graph must be translated into: who did you build with, on what, and what
      can a stranger verify in five minutes?
    </p>

    <p>
      Failure modes to name openly. Citation rings, peer-review fraud, bought citations, and coordinated
      inauthentic communities are not rare edge cases. They are an industry. Any platform that treats edges
      in a social graph as innocence by construction will get played. The honest pitch is comparative:
      relationship proofs are costlier than one-shot text, not impossible to forge.
    </p>

    <h3 id="section-identity">Digital identity today: badges, institutions, and the blockchain detour</h3>

    <p>
      Current mainstream verification stacks include platform-issued badges, institutional affiliations,
      professional directories, payment rails and legal identity (for commerce), and emerging W3C Verifiable
      Credentials ecosystems. Blockchain-based identity remains patchy in consumer adoption; treat as
      optional infrastructure, not prerequisite philosophy.
    </p>

    <p>
      What matters is not maximal decentralization but interoperable evidence: stable identifiers, outbound
      links to canonical profiles, and time-stamped collaboration artifacts (shared publications, events,
      projects) that third parties can corroborate.
    </p>

    <h3 id="section-eeat">EEAT: Google&rsquo;s vocabulary is aligned, but easy to misquote</h3>

    <p>
      Google&rsquo;s own Search Central guidance is unusually explicit: systems aim to identify signals
      associated with Experience, Expertise, Authoritativeness, and Trustworthiness, with trust foremost;
      E-E-A-T is not a single ranking factor; quality raters do not directly rank pages{" "}
      <Cite n={22} title="Google · Search Quality Rater Guidelines" />. The practical guidance worth
      stealing is mundane and powerful: clear bylines, author pages, About pages, process transparency
      (&ldquo;How was this made?&rdquo; including AI assistance), and a coherent site purpose.
    </p>

    <p>
      There is no public evidence bundle in this research pass that proves &ldquo;networks of verified
      experts always rank above individual experts.&rdquo; What is supported is weaker but still useful:
      authoritative reputation is evaluated in context, and recognition within a topic community is a
      recurring theme in rater concepts, which rhymes with mutual endorsement when those endorsements are
      real and checkable.
    </p>

    <h3 id="section-ai-sources">How AI assistants choose sources (high level)</h3>

    <p>
      Retrieval-augmented systems classically risk confusing relevance with truth. Recent research threads
      (e.g., reliability-aware RAG, EMNLP 2025) push toward cross-source corroboration and reliability
      weighting. In product reality, vendor assistants still heuristically favor well-linked, canonical
      domains and repeated training corpora associations.
    </p>

    <p>For design, the implication is dual:</p>

    <ol className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>01.</span>
        <span>Human trust: show relationships and accountability chains.</span>
      </li>
      <li>
        <span className={styles.articleListNum}>02.</span>
        <span>
          Machine legibility: maintain stable entities, consistent naming, primary sources, and
          human-readable structured metadata so answers that cite the movement leader are anchored rather
          than hallucinated glosses.
        </span>
      </li>
    </ol>

    <h3 id="section-labels">AI labels and the uncomfortable psychology</h3>

    <p>
      Stanford HAI&rsquo;s policy brief on labeling AI-generated content{" "}
      <Cite n={25} title="Stanford HAI · AI labeling brief" /> summarizes evidence that labels can shift
      attribution without reliably reducing persuasion for some message types. JMIR-adjacent findings
      (summarized in secondary reporting) similarly suggest labels may help identify AI without fixing
      sharing behavior.
    </p>

    <p>
      Implication: &ldquo;Transparency as credibility protection&rdquo; must mean more than disclosure
      badges. Transparency should surface who vouches, what primary evidence exists, and what would falsify
      the claim. Those are the moves that also satisfy skeptical readers trained on Wikipedia-era norms.
    </p>

    <h3 id="section-design">Design principles if you bet on visible network trust</h3>

    <ol className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>01.</span>
        <span>
          Default to inspectability. Every endorsement should deep-link to public evidence of collaboration
          (event program, publication, project repo, dated media), not a floating integer.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>02.</span>
        <span>
          Costly signals only. Prefer infrequent, specific attestations over high-volume mutual likes.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>03.</span>
        <span>
          Outsider legibility. Translate academic co-authorship into plain-language &ldquo;built with&rdquo;
          stories.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>04.</span>
        <span>
          Anti-ring hygiene. Rate-limit symmetric endorsements; surface triangle-closure anomalies; allow
          dispute and retraction flows.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>05.</span>
        <span>
          Pair graph with institution. Brands still function as verification endpoints in Reuters&rsquo;
          data. Partner with institutions; do not pretend they are obsolete.
        </span>
      </li>
    </ol>

    <h3 id="section-overstated">Where the thesis can be overstated</h3>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Networks are not automatically harder to fake than text. Cheap coordination can manufacture a clique.</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Co-authorship is not a moral halo. Bad actors publish together.</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          EEAT is not a cheat code. It rewards clarity and truth-seeking behavior, not graph tricks.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Trust is stable in places. Do not claim universal collapse without a named metric.
        </span>
      </li>
    </ul>

    <h3 id="section-bottom-line">Bottom line</h3>

    <p>
      The network-verification story is directionally aligned with major surveys (fragmentation, epistemic
      anxiety, AI pessimism on news trustworthiness) and with classic trust theory if incentives and
      inspectability are taken seriously. It becomes speculative when it implies automatic audience
      comprehension of dense academic graphs or immunity to gaming.
    </p>

    <p>
      The strongest honest version: fluency got cheap; relationships and corroboration are still expensive.
      A platform can make that visible without sounding like a guild if it invests in translation, evidence
      links, and governance that assumes malice as normal.
    </p>

    <p>
      Cross-check against credible AI guidance. Internal content on markers of credible AI guidance can
      align with the evidence above if &ldquo;love&rdquo; is defined as patient truthfulness:
      citing primary sources, naming limits, inviting correction, rather than warmth alone. Warm tone
      without verifiable accountability is exactly what generative models can counterfeit. Research on
      labels reinforces that disclosure is insufficient; the ethical bar is closer to provenance and
      consequences (who stands behind the answer, and what happens if it is wrong).
    </p>

    <p>
      Institutional trust vs. peer trust (keep both on the table). Edelman&rsquo;s tech-sector streams and
      AI-focused flash materials (2025 cycle) underline that comfort with corporate AI use and trust in
      &ldquo;technology&rdquo; do not move in lockstep. People can use tools they do not deeply trust. That
      is another reason not to overfit to a single story about peer graphs replacing institutions. A
      pragmatic narrative is hybrid trust: peers and partners provide speed and context; institutions,
      publishers, and brands provide anchors when stakes are high, matching the Reuters finding that people
      still name established outlets when they want to verify a rumor.
    </p>
  </>
);
