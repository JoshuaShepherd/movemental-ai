import type { ReactNode } from "react";

import styles from "../research.module.css";

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className={styles.textInkBlue} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

/** Thesis — ported from `docs/articles/graded-high/85-99/02-scenius-network-credibility.md`. */
export const sceniusNetworkCredibilityBody: ReactNode = (
  <>
    <p className={styles.dropCap} id="section-why">
      Movemental&rsquo;s public thesis treats <strong>scenius</strong>—Brian Eno&rsquo;s portmanteau of{" "}
      <em>scene</em> and <em>genius</em>—as more than a collaboration value. It is framed as a{" "}
      <strong>credibility technology</strong> for an era in which individual metrics and synthetic
      text proliferate: credibility is said to emerge when <strong>credible humans</strong> cite,
      engage with, and build on one another&rsquo;s work in ways that leave{" "}
      <strong>durable, cross-checkable traces</strong>. That is a strong claim. It is also a{" "}
      <strong>stretch</strong> of the term&rsquo;s original semantic field, which was artistic and
      ecological rather than epistemological. This article traces the lineage of <em>scenius</em>,
      maps it against adjacent scholarship, states the honest limits, and suggests how Movemental
      can tighten its sourcing without losing narrative power.
    </p>

    <h3 id="section-eno-kelly">What Eno and Kelly actually established</h3>

    <p>
      <strong>Eno: communal intelligence, not verification.</strong> The most frequently cited primary path for Eno&rsquo;s definition is not a journal article but{" "}
      <strong>1996 book paratext</strong>: a letter to Dave Stewart published in{" "}
      <em>A Year with Swollen Appendices</em>, where Eno reportedly contrasts lone-genius mythology
      with the <strong>&ldquo;intelligence and intuition of a whole cultural scene.&rdquo;</strong>{" "}
      He names that communal intelligence <strong>scenius</strong>—the &ldquo;communal form&rdquo; of
      genius. The emphasis is <strong>historical and aesthetic</strong>: breakthroughs arise from
      dense, interacting milieux.
    </p>
    <p>
      That matters for two reasons. First, <strong>nothing in that core definition requires
      truth-seeking</strong>; scenes can be collectively brilliant yet collectively wrong, cruel, or
      self-referential. Second, <strong>credibility in a religious or movemental sense</strong>{" "}
      (trustworthiness, spiritual authority, faithful witness) is a <strong>normative</strong>{" "}
      construct. Eno gives a <strong>descriptive sociology of creativity</strong>, not a theory of
      justified belief.
    </p>

    <p>
      <strong>Kelly: conditions for creative scenes—and a warning.</strong> In June 2008 Kevin Kelly popularized Eno&rsquo;s term in <em>The Technium</em> (
      <Ext href="https://kk.org/thetechnium/scenius-or-comm/">
        &ldquo;Scenius, or Communal Genius&rdquo;
      </Ext>
      , also mirrored in <em>WIRED</em>). Kelly lists nurturing factors—
      <strong>mutual appreciation</strong>, <strong>rapid tool exchange</strong>,{" "}
      <strong>network effects of success</strong>, <strong>local tolerance for novelty</strong>—and
      a roster of historical scenes from the Algonquin Round Table to Building 20. His closing moral
      is methodological: scenius <strong>cannot be commanded</strong>; institutions should{" "}
      <strong>not kill it</strong> through over-formalization.
    </p>
    <p>
      Kelly&rsquo;s essay is invaluable for <strong>movement culture design</strong> (what to protect,
      what kills creative density). It does not, however, adjudicate <strong>who deserves public
      trust</strong> or how to resist <strong>adversarial manipulation</strong> of apparent peer
      networks. Those are the questions Movemental presses into service.
    </p>

    <h3 id="section-academic">Academic &ldquo;neighbors&rdquo;: where the real theory lives</h3>
    <p>
      Because <em>scenius</em> barely appears in trust or security literature, the honest scholarly
      mapping runs through <strong>adjacent constructs</strong>:
    </p>
    <p>
      <strong>Communities of practice.</strong> Etienne Wenger&rsquo;s communities-of-practice frame
      (mutual engagement, joint enterprise, shared repertoire) explains how{" "}
      <strong>legitimate peripheral participation</strong> turns into <strong>full membership</strong>{" "}
      and how <strong>identity</strong> forms through recognition by competent peers. That is the
      cleanest academic rhyme for &ldquo;mutual elevation&rdquo; and &ldquo;you become credible by
      sustained participation among practitioners who know the craft.&rdquo;
    </p>
    <p>
      <strong>Epistemic communities.</strong> Peter Haas&rsquo;s introduction to epistemic communities
      in <em>International Organization</em> (1992) models how{" "}
      <strong>transnational expert networks</strong> share causal beliefs and norms and thereby shape
      policy. The parallel to Movemental is <strong>discourse-bound authority</strong>: influence
      travels through <strong>who takes whose claims seriously</strong>, not through raw popularity.
    </p>
    <p>
      <strong>Scenes and creative clusters.</strong> Sociological work on <strong>music scenes</strong>{" "}
      (and economic geography on <strong>creative clusters</strong>) explains spatial and
      subcultural concentration. OpenAlex retrieves contemporary uses of the token <em>scenius</em>{" "}
      chiefly in <strong>music-book chapters</strong>—for example work on the &ldquo;Canterbury
      scenius&rdquo;—not in reputation-systems research.
    </p>
    <p>
      <strong>Citation graphs and meta-research.</strong> Science studies and bibliometrics treat{" "}
      <strong>citations</strong> as <strong>networked esteem signals</strong>. That is the closest
      formal analog to &ldquo;public, indexed, mutual reference.&rdquo; But the same literature
      documents <strong>citation rings</strong>, <strong>predatory publishing</strong>,{" "}
      <strong>paper mills</strong>, and <strong>metric gaming</strong>—a direct warning that{" "}
      <strong>graphs optimize</strong> once stakes rise.
    </p>
    <p>
      <strong>Proof-of-personhood (PoP) and Sybil resistance.</strong> Blockchain-adjacent research
      (e.g., reviews in <em>Frontiers in Blockchain</em>, 2020) studies{" "}
      <strong>decentralized identity</strong> under <strong>Sybil</strong> assumptions—many fake nodes
      pretending to be distinct humans. The parallel problem statement is real:{" "}
      <strong>if credibility is a graph, who controls node creation?</strong> The solution classes,
      however, diverge: cryptography and mechanism design versus <strong>curated human culture</strong>.
      Movemental should cite PoP <strong>carefully</strong>—as <strong>problem kinship</strong>, not as
      evidence that editorial scenius inherits proven security guarantees.
    </p>
    <p>
      Empirical work on <strong>online reputation</strong> and <strong>social graphs</strong>{" "}
      repeatedly finds that <strong>topology alone</strong> is insufficient: <strong>edge weight</strong>{" "}
      (interaction depth), <strong>temporal persistence</strong>, <strong>multiplex ties</strong>{" "}
      (offline + online), and <strong>content-level</strong> signals all add predictive value for
      whether an account represents a <strong>coherent human trajectory</strong> rather than a
      campaign. Participatory-culture research also reminds us that <strong>visibility</strong> and{" "}
      <strong>trust</strong> decouple: content can circulate widely among low-trust actors. The
      constructive move is not to abandon <strong>discoverability</strong> but to tie it to{" "}
      <strong>networks of warranted esteem</strong>—the same move science attempted with citations,
      then had to <strong>defend</strong> against gaming.
    </p>

    <h3 id="section-novelty">&ldquo;Scenius as credibility mechanism&rdquo;: novelty or rebranding?</h3>

    <p>
      <strong>What is not new.</strong> The idea that <strong>trust accrues through embeddedness in a competent community</strong> is
      ancient. In modern social theory it is distributed across CoP, epistemic communities,
      professions, denominations, and academic disciplines. The idea that{" "}
      <strong>citations and collaborations signal esteem</strong> is standard. The critique that{" "}
      <strong>naive metrics</strong> (followers, likes, impact factors) are <strong>gameable</strong>{" "}
      is also standard—now central to <strong>meta-research</strong> and <strong>integrity</strong>{" "}
      debates.
    </p>

    <p>
      <strong>What <em>is</em> relatively distinctive.</strong> Movemental&rsquo;s synthesis targets a <strong>specific contemporary failure mode</strong>:{" "}
      <strong>generative AI collapses the cost of plausible solo performance</strong>. The response
      is not merely &ldquo;peer review&rdquo; in the institutional sense but{" "}
      <strong>a designed, bounded network</strong> where <strong>costly association</strong>{" "}
      (publishing beside named peers, cross-linking, mutual stakes) is meant to function as{" "}
      <strong>evidence of human seriousness over time</strong>.
    </p>
    <p>
      <strong>Why the naming still matters:</strong> <em>Scenius</em> is memetically legible to
      creative-class leaders, encodes <strong>anti-solo-empire</strong> ethics, and differentiates
      from both <strong>institutional gatekeeping</strong> and <strong>influencer metrics</strong>.
      The risk is <strong>over-claiming scholarly pedigree</strong> for that brand move.
    </p>
    <p>
      Internal messaging sometimes justifies a <strong>small, invitation-only</strong> cohort by
      saying members must <strong>actually know one another</strong> for scenius to function. What{" "}
      <em>can</em> be claimed safely is directional: <strong>unbounded</strong> &ldquo;everyone on the
      platform&rdquo; graphs <strong>cannot</strong> sustain the same <strong>costly peer
      knowledge</strong> that a deliberate <strong>clique-plus-bridges</strong> structure attempts to
      preserve.
    </p>

    <h3 id="section-counter">Counter-arguments Movemental should not dodge</h3>
    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Insularity and homophily.</strong> Dense networks increase trust <strong>inside</strong>{" "}
          and suspicion <strong>outside</strong>.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Groupthink.</strong> Scenes amplify fashions. Without structured{" "}
          <strong>disagreement, audit, and outside counsel</strong>, scenius can preserve errors as
          elegantly as truths.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Manufactured graphs.</strong> Citation rings and bot swarms prove that{" "}
          <strong>networks can be faked</strong> when verification is only topological.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Credibility oligarchy.</strong> A cap near <strong>one hundred</strong> leaders trades
          scale for <strong>knowability</strong>—defensible as <strong>Dunbar-adjacent design</strong>{" "}
          but vulnerable to the critique that <strong>power concentrates</strong> among insiders who
          control invitations.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Category slip: creativity ≠ sanctity.</strong> Eno&rsquo;s and Kelly&rsquo;s object
          domain is <strong>cultural productivity</strong>. Christian <strong>authority</strong> also
          requires <strong>character</strong>, <strong>accountability structures</strong>, and often{" "}
          <strong>institutional</strong> checks.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Capture by tastemakers.</strong> Any curated network reinvents{" "}
          <strong>gatekeeping</strong> with softer lighting. The difference is{" "}
          <strong>transparency of relationships</strong> and <strong>explicit values</strong>, not the
          absence of power.
        </span>
      </li>
    </ul>

    <h3 id="section-religious">Religious movements: scenius-like patterns without the label</h3>
    <p>
      Historically, <strong>legitimacy</strong> in religious movements has often traveled through{" "}
      <strong>relational proof</strong>: who baptized whom, who signed whose letter, who shared a{" "}
      <strong>class meeting</strong>, who carried a <strong>book</strong> across a border. The
      Reformation&rsquo;s <strong>print networks</strong> and Methodism&rsquo;s{" "}
      <strong>connexional</strong> discipline are <strong>network-theoretic</strong> precedents for
      &ldquo;credibility as traceable mutuality,&rdquo; even though none invoked <em>scenius</em>.
    </p>
    <p>
      Weber&rsquo;s ideal types still organize much discussion: <strong>charismatic</strong> authority
      (gifts and presence), <strong>traditional</strong> authority (lineage and liturgy),{" "}
      <strong>legal-rational</strong> authority (office and procedure). Movemental&rsquo;s scenius
      thesis can be read as a <strong>deliberate counter-design</strong>: re-embedding
      charismatic-traditional elements in a <strong>graph-like public</strong> without reducing them
      to <strong>vanity metrics</strong>.
    </p>
    <p>
      Religious credibility also involves <strong>sacrament</strong>, <strong>discipline</strong>,{" "}
      <strong>confession</strong>, and <strong>eldership</strong>—modes that are not always{" "}
      <strong>publicly legible</strong> without becoming <strong>spectacle</strong>. Movemental should
      acknowledge <strong>privacy of formation</strong> as a value alongside{" "}
      <strong>public traceability of ideas</strong>.
    </p>

    <h3 id="section-recommendations">Recommendations for stronger public framing</h3>
    <ol className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>01.</span>
        <span>
          <strong>Split definitions in prose:</strong> use <strong>Eno–Kelly scenius</strong> for{" "}
          <strong>cultural conditions of collaboration</strong>; use{" "}
          <strong>peer-network credibility</strong> or <strong>communities-of-practice legitimacy</strong>{" "}
          when making <strong>epistemic</strong> claims.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>02.</span>
        <span>
          <strong>Cite Haas + Wenger</strong> (and selected meta-research on metric gaming) when arguing
          &ldquo;networks beat naive metrics&rdquo;—that is where <strong>peer-reviewed</strong> weight
          lives.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>03.</span>
        <span>
          <strong>Treat PoP as analogy, not proof:</strong> same adversary (Sybils), different toolbox
          (cryptography vs. curation).
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>04.</span>
        <span>
          <strong>Preempt the oligarchy critique:</strong> explain{" "}
          <strong>rotation, renewal pathways, external advisors, and transparency</strong>.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>05.</span>
        <span>
          <strong>Keep the AI claim proportional:</strong> &ldquo;<strong>harder</strong> to fake than
          thin solo metrics&rdquo; is defensible; &ldquo;<strong>cannot</strong> be faked&rdquo; is a
          moving target.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>06.</span>
        <span>
          <strong>Publish a &ldquo;limits&rdquo; page alongside the &ldquo;thesis&rdquo; page</strong>—a
          short list of <strong>known failure modes</strong> and <strong>what Movemental does to
          mitigate</strong> them.
        </span>
      </li>
    </ol>

    <h3 id="section-closing">Closing</h3>
    <p>
      <em>Scenius</em> gives Movemental a <strong>vivid name</strong> for collaborative genius and a{" "}
      <strong>Kelly-shaped design instinct</strong>—protect the margin, do not over-formalize the magic.{" "}
      <strong>Credibility under AI</strong>, however, is a <strong>security-adjacent</strong> problem
      about <strong>graphs, incentives, and Sybils</strong> as much as a <strong>cultural</strong>{" "}
      problem about <strong>beauty and belonging</strong>. The strongest version of Movemental&rsquo;s
      argument is therefore <strong>hybrid</strong>: scenius as <strong>moral-aesthetic vision</strong>,
      communities-of-practice and epistemic-network theory as{" "}
      <strong>social-scientific spine</strong>, and <strong>curatorial practice</strong> as the{" "}
      <strong>engineering</strong> that tries to make the graph <strong>costly</strong> to counterfeit.
      That hybrid is more modest than a single buzzword—but modesty here is{" "}
      <strong>strategic truthfulness</strong>, and in the long run it is also{" "}
      <strong>more credible</strong>.
    </p>

    <h3 id="section-references">References (selected)</h3>
    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Eno, B. <em>A Year with Swollen Appendices</em> (1996).</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Kelly, K. (2008). &ldquo;Scenius, or Communal Genius.&rdquo;{" "}
          <Ext href="https://kk.org/thetechnium/scenius-or-comm/">kk.org/thetechnium/scenius-or-comm/</Ext>
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Haas, P. M. (1992). &ldquo;Introduction: Epistemic communities and international policy
          coordination.&rdquo; <em>International Organization</em>, 46(1), 1–35.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Wenger, E. (1998). <em>Communities of practice: Learning, meaning, and identity.</em>{" "}
          Cambridge University Press.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Purohit, G., et al. (2020). &ldquo;Who Watches the Watchmen? … Proof of Personhood
          Protocols.&rdquo; <em>Frontiers in Blockchain</em>.{" "}
          <Ext href="https://doi.org/10.3389/fbloc.2020.590171">doi.org/10.3389/fbloc.2020.590171</Ext>
        </span>
      </li>
    </ul>
  </>
);
