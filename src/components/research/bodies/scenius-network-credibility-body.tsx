import type { ReactNode } from "react";

import styles from "../research.module.css";

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className={styles.textInkBlue} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

/** Thesis, ported from `docs/articles/graded-high/85-99/02-scenius-network-credibility.md`. */
export const sceniusNetworkCredibilityBody: ReactNode = (
  <>
    <p className={styles.dropCap} id="section-why">
      Movemental&rsquo;s public thesis treats <em>scenius</em>, Brian Eno&rsquo;s portmanteau of{" "}
      <em>scene</em> and <em>genius</em>, as more than a collaboration value. It is framed as a way to
      establish credibility in an era when individual metrics and synthetic text proliferate: credibility is
      said to emerge when credible humans cite, engage with, and build on one another&rsquo;s work in ways
      that leave durable, cross-checkable traces. That is a strong claim. It is also a stretch of the
      term&rsquo;s original meaning, which was artistic and ecological rather than about knowing who to
      trust. This article traces the lineage of <em>scenius</em>, maps it against adjacent scholarship,
      states the honest limits, and suggests how Movemental can tighten its sourcing without losing narrative
      power.
    </p>

    <h3 id="section-eno-kelly">What Eno and Kelly actually established</h3>

    <p>
      Eno: communal intelligence, not verification. The most frequently cited primary path for Eno&rsquo;s
      definition is not a journal article but 1996 book paratext: a letter to Dave Stewart published in{" "}
      <em>A Year with Swollen Appendices</em>, where Eno contrasts lone-genius mythology with the
      &ldquo;intelligence and intuition of a whole cultural scene.&rdquo; He names that communal intelligence{" "}
      <em>scenius</em>, the &ldquo;communal form&rdquo; of genius. The emphasis is historical and aesthetic:
      breakthroughs arise from dense, interacting milieux.
    </p>
    <p>
      That matters for two reasons. First, nothing in that core definition requires truth-seeking; scenes
      can be collectively brilliant yet collectively wrong, cruel, or self-referential. Second, credibility
      in a religious or movemental sense (trustworthiness, spiritual authority, faithful witness) is a
      normative construct. Eno gives a descriptive sociology of creativity, not a theory of justified
      belief.
    </p>

    <p>
      Kelly: conditions for creative scenes, and a warning. In June 2008 Kevin Kelly popularized Eno&rsquo;s
      term in <em>The Technium</em> (
      <Ext href="https://kk.org/thetechnium/scenius-or-comm/">
        &ldquo;Scenius, or Communal Genius&rdquo;
      </Ext>
      , also mirrored in <em>WIRED</em>). Kelly lists nurturing factors: mutual appreciation, rapid tool
      exchange, network effects of success, local tolerance for novelty, and a roster of historical scenes
      from the Algonquin Round Table to Building 20. His closing moral is methodological: scenius cannot be
      commanded; institutions should not kill it through over-formalization.
    </p>
    <p>
      Kelly&rsquo;s essay is invaluable for movement culture design (what to protect, what kills creative
      density). It does not, however, adjudicate who deserves public trust or how to resist adversarial
      manipulation of apparent peer networks. Those are the questions Movemental presses into service.
    </p>

    <h3 id="section-academic">Academic &ldquo;neighbors&rdquo;: where the real theory lives</h3>
    <p>
      Because <em>scenius</em> barely appears in trust or security literature, the honest scholarly mapping
      runs through adjacent constructs:
    </p>
    <p>
      Communities of practice. Etienne Wenger&rsquo;s communities-of-practice frame (mutual engagement, joint
      enterprise, shared repertoire) explains how legitimate peripheral participation turns into full
      membership and how identity forms through recognition by competent peers. That is the cleanest academic
      rhyme for &ldquo;mutual elevation&rdquo; and &ldquo;you become credible by sustained participation
      among practitioners who know the craft.&rdquo;
    </p>
    <p>
      Epistemic communities. Peter Haas&rsquo;s introduction to epistemic communities in{" "}
      <em>International Organization</em> (1992) models how transnational expert networks share causal
      beliefs and norms and thereby shape policy. The parallel to Movemental is discourse-bound authority:
      influence travels through who takes whose claims seriously, not through raw popularity.
    </p>
    <p>
      Scenes and creative clusters. Sociological work on music scenes (and economic geography on creative
      clusters) explains spatial and subcultural concentration. OpenAlex retrieves contemporary uses of the
      token <em>scenius</em> chiefly in music-book chapters, for example work on the &ldquo;Canterbury
      scenius,&rdquo; not in reputation-systems research.
    </p>
    <p>
      Citation graphs and meta-research. Science studies and bibliometrics treat citations as networked
      esteem signals. That is the closest formal analog to &ldquo;public, indexed, mutual reference.&rdquo;
      But the same literature documents citation rings, predatory publishing, paper mills, and metric gaming.
      That is a direct warning that graphs optimize once stakes rise.
    </p>
    <p>
      Proof-of-personhood (PoP) and Sybil resistance. Blockchain-adjacent research (e.g., reviews in{" "}
      <em>Frontiers in Blockchain</em>, 2020) studies decentralized identity under Sybil assumptions: many
      fake nodes pretending to be distinct humans. The parallel problem statement is real: if credibility is
      a graph, who controls node creation? The solution classes, however, diverge: cryptography and mechanism
      design versus curated human culture. Cite PoP carefully, as problem kinship, not as evidence that
      editorial scenius inherits proven security guarantees.
    </p>
    <p>
      Empirical work on online reputation and social graphs repeatedly finds that topology alone is
      insufficient: edge weight (interaction depth), temporal persistence, multiplex ties (offline and
      online), and content-level signals all add predictive value for whether an account represents a
      coherent human trajectory rather than a campaign. Participatory-culture research also reminds us that
      visibility and trust decouple: content can circulate widely among low-trust actors. The constructive
      move is not to abandon discoverability but to tie it to networks of warranted esteem, the same move
      science attempted with citations, then had to defend against gaming.
    </p>

    <h3 id="section-novelty">&ldquo;Scenius as credibility mechanism&rdquo;: novelty or rebranding?</h3>

    <p>
      What is not new. The idea that trust accrues through embeddedness in a competent community is ancient.
      In modern social theory it is distributed across communities of practice, epistemic communities,
      professions, denominations, and academic disciplines. The idea that citations and collaborations
      signal esteem is standard. The critique that naive metrics (followers, likes, impact factors) are
      gameable is also standard, now central to meta-research and integrity debates.
    </p>

    <p>
      What is relatively distinctive. Movemental&rsquo;s synthesis targets a specific contemporary failure
      mode: generative AI collapses the cost of plausible solo performance. The response is not merely
      &ldquo;peer review&rdquo; in the institutional sense but a designed, bounded network where costly
      association (publishing beside named peers, cross-linking, mutual stakes) is meant to function as
      evidence of human seriousness over time.
    </p>
    <p>
      Why the naming still matters: <em>Scenius</em> is memetically legible to creative-class leaders,
      encodes anti-solo-empire ethics, and differentiates from both institutional gatekeeping and influencer
      metrics. The risk is over-claiming scholarly pedigree for that brand move.
    </p>
    <p>
      Internal messaging sometimes justifies a small, invitation-only cohort by saying members must actually
      know one another for scenius to function. What can be claimed safely is directional: unbounded
      &ldquo;everyone on the platform&rdquo; graphs cannot sustain the same costly peer knowledge that a
      deliberate clique-plus-bridges structure attempts to preserve.
    </p>

    <h3 id="section-counter">Counter-arguments Movemental should not dodge</h3>
    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Insularity and homophily. Dense networks increase trust inside and suspicion outside.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Groupthink. Scenes amplify fashions. Without structured disagreement, audit, and outside counsel,
          scenius can preserve errors as elegantly as truths.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Manufactured graphs. Citation rings and bot swarms prove that networks can be faked when
          verification is only topological.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Credibility oligarchy. A cap near one hundred leaders trades scale for knowability, defensible as
          Dunbar-adjacent design but vulnerable to the critique that power concentrates among insiders who
          control invitations.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Category slip: creativity is not sanctity. Eno&rsquo;s and Kelly&rsquo;s object domain is cultural
          productivity. Christian authority also requires character, accountability structures, and often
          institutional checks.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Capture by tastemakers. Any curated network reinvents gatekeeping with softer lighting. The
          difference is transparency of relationships and explicit values, not the absence of power.
        </span>
      </li>
    </ul>

    <h3 id="section-religious">Religious movements: scenius-like patterns without the label</h3>
    <p>
      Historically, legitimacy in religious movements has often traveled through relational proof: who
      baptized whom, who signed whose letter, who shared a class meeting, who carried a book across a
      border. The Reformation&rsquo;s print networks and Methodism&rsquo;s connexional discipline are
      precedents for &ldquo;credibility as traceable mutuality,&rdquo; even though none invoked{" "}
      <em>scenius</em>.
    </p>
    <p>
      Weber&rsquo;s ideal types still organize much discussion: charismatic authority (gifts and presence),
      traditional authority (lineage and liturgy), legal-rational authority (office and procedure).
      Movemental&rsquo;s scenius thesis can be read as a deliberate counter-design: re-embedding
      charismatic-traditional elements in a graph-like public without reducing them to vanity metrics.
    </p>
    <p>
      Religious credibility also involves sacrament, discipline, confession, and eldership, modes that are
      not always publicly legible without becoming spectacle. Movemental should acknowledge privacy of
      formation as a value alongside public traceability of ideas.
    </p>

    <h3 id="section-recommendations">Recommendations for stronger public framing</h3>
    <ol className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>01.</span>
        <span>
          Split definitions in prose: use Eno-Kelly scenius for cultural conditions of collaboration; use
          peer-network credibility or communities-of-practice legitimacy when making epistemic claims.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>02.</span>
        <span>
          Cite Haas and Wenger (and selected meta-research on metric gaming) when arguing &ldquo;networks
          beat naive metrics.&rdquo; That is where peer-reviewed weight lives.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>03.</span>
        <span>
          Treat PoP as analogy, not proof: same adversary (Sybils), different toolbox (cryptography vs.
          curation).
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>04.</span>
        <span>
          Preempt the oligarchy critique: explain rotation, renewal pathways, external advisors, and
          transparency.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>05.</span>
        <span>
          Keep the AI claim proportional: &ldquo;harder to fake than thin solo metrics&rdquo; is defensible;
          &ldquo;cannot be faked&rdquo; is a moving target.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>06.</span>
        <span>
          Publish a &ldquo;limits&rdquo; page alongside the &ldquo;thesis&rdquo; page: a short list of known
          failure modes and what Movemental does to mitigate them.
        </span>
      </li>
    </ol>

    <h3 id="section-closing">Closing</h3>
    <p>
      <em>Scenius</em> gives Movemental a vivid name for collaborative genius and a Kelly-shaped design
      instinct: protect the margin, do not over-formalize the magic. Credibility under AI, however, is a
      security-adjacent problem about graphs, incentives, and Sybils as much as a cultural problem about
      beauty and belonging. The strongest version of Movemental&rsquo;s argument is therefore hybrid: scenius
      as moral-aesthetic vision, communities-of-practice and epistemic-network theory as social-scientific
      spine, and curatorial practice as the engineering that tries to make the graph costly to counterfeit.
      That hybrid is more modest than a single buzzword, but modesty here is strategic truthfulness, and in
      the long run it is also more credible.
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
