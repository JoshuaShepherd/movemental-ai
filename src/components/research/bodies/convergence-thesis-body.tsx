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

/** Thesis — ported from `docs/articles/graded-high/85-99/16-convergence-thesis.md`. */
export const convergenceThesisBody: ReactNode = (
  <>

    <h3 id="section-clarify">Clarify the word: Jenkins, Castells, and Movemental</h3>

    <p>
      In media studies, <strong>&ldquo;convergence&rdquo;</strong> already has a famous owner. Henry
      Jenkins&rsquo;s <em>Convergence Culture</em> (2006) defines a collision of{" "}
      <strong>industrial cross-platform strategy</strong>, <strong>migratory audiences</strong>, and{" "}
      <strong>participatory sense-making</strong> — a cultural logic as much as a technological one.
      Manuel Castells&rsquo;s &ldquo;network society&rdquo; vocabulary gives a second, adjacent register:
      institutions reorganized through <strong>switched networks</strong> and{" "}
      <strong>protocols of connectivity</strong>.
    </p>

    <p>
      Movemental uses the same word for something related but not identical: four{" "}
      <strong>thematic crises</strong> — credibility under generative conditions, publishing political
      economy, intentional peer scenes, embodiment of Christian movement — said to be{" "}
      <strong>converging by necessity</strong>. That is closer to <strong>kairos</strong> discourse than
      to Jenkins&rsquo;s transmedia economics. There is no scandal in borrowing a resonant word, but
      there <strong>is</strong> a credibility risk if a reader assumes you mean{" "}
      <strong>peer-reviewed &ldquo;convergence theory&rdquo;</strong> when you mean{" "}
      <strong>strategic simultaneity</strong>.
    </p>

    <p>
      <strong>Recommendation:</strong> In outward copy, either avoid the bare word{" "}
      <em>convergence</em> or pair it with a plain gloss —{" "}
      <strong>&ldquo;four pressures tightening together for leaders like you&rdquo;</strong> — and reserve{" "}
      <strong>&ldquo;convergence culture&rdquo;</strong> for actual Jenkins-style arguments.
    </p>

    <h3 id="section-four-forces">Four forces — strongest evidence, strongest caveat</h3>

    <p>
      The research series already did the heavy lifting for each force. Here is the{" "}
      <strong>meta</strong> snapshot Movemental should keep in mind when bundling.
    </p>

    <p>
      <strong>Credibility.</strong> <strong>Strength:</strong> The cost of fluent, plausible, scalable
      &ldquo;expert performance&rdquo; has fallen; platforms reward volume; ordinary users are unsure how
      to authenticate text and images. Peer-reviewed work supports serious limits on{" "}
      <strong>unaided human detection</strong> under challenging conditions, and industry monitors
      document rapid growth in synthetic publishing at the long tail. <strong>Caveat:</strong> Several
      headline numbers in circulation are <strong>misaligned or unsourced</strong>; &ldquo;credibility
      collapse&rdquo; is <strong>rhetoric</strong>, not a standardized sociological term. Expert
      annotators, task design, and channel differences matter. Sociology of expertise often describes{" "}
      <strong>renegotiation and jurisdictional conflict</strong>, not a single monotonic collapse.{" "}
      <strong>Convergence implication:</strong> It is fair to say generative AI{" "}
      <strong>raises the premium</strong> on <strong>human-graph</strong> signals — which rhymes with
      scenius — <strong>if</strong> you avoid implying <strong>nobody</strong> can detect synthetic work
      or that <strong>all</strong> channels are already lost.
    </p>

    <p>
      <strong>Publication economics.</strong> <strong>Strength:</strong> The Authors Guild&rsquo;s income
      survey <Cite n={19} title="Authors Guild · 2023 · n=5,699" /> is a blunt instrument in the best
      sense: for many published authors, <strong>book cash is thin</strong> even when cultural prestige
      exists. That supports a <strong>structural</strong> critique without requiring you to win a Twitter
      fight about publisher operating margins. <strong>Caveat:</strong> The specific{" "}
      <strong>&ldquo;Substack keeps 85–90%&rdquo;</strong> family of claims is <strong>not</strong>{" "}
      compatible with official fee documentation once you measure <strong>cash fees</strong> honestly{" "}
      <Cite n={20} title="Substack Support · fee documentation" />. Strategic dependence — algorithms,
      account risk, mobile IAP — is real, but it is <strong>not the same sentence</strong> as rake.{" "}
      <strong>Convergence implication:</strong> Tie &ldquo;publication crisis&rdquo; to{" "}
      <strong>ownership and bundle design</strong>, not to <strong>false fee arithmetic</strong>. That
      actually <strong>strengthens</strong> the bridge to a partnership model because it shows you
      understand spreadsheets.
    </p>

    <p>
      <strong>Scenius.</strong> <strong>Strength:</strong> Brian Eno and Kevin Kelly give a{" "}
      <strong>memorable</strong> critique of lone-genius mythology and a <strong>checklist</strong> of
      cultural conditions scenes require. Movemental&rsquo;s extension —{" "}
      <strong>bounded, costly peer recognition</strong> as a counterweight to metric games — is a{" "}
      <strong>legible product philosophy</strong>. <strong>Caveat:</strong> Eno/Kelly do <strong>not</strong>{" "}
      offer a theory of <strong>justified belief</strong> or Sybil-resistant graphs. Digital scenes that
      look like scenius are <strong>everywhere</strong> in niches — open source, academia, fandoms,
      co-working communities — so &ldquo;the internet ignored scenius&rdquo; is too broad. The precise
      claim is narrower: <strong>
        movement-leader publishing stacks have often optimized for solo scale and feed performance rather
        than mutual, cross-checkable esteem at human scale.
      </strong>{" "}
      <strong>Convergence implication:</strong> The credibility ↔ scenius link is{" "}
      <strong>design-plausible</strong>, not <strong>theorem-true</strong>.
    </p>

    <p>
      <strong>Movement and embodiment.</strong> <strong>Strength:</strong> Social movement scholarship is
      kind to <strong>trust networks</strong>, <strong>repertoires</strong>, and{" "}
      <strong>multimodal persuasion</strong> — the civil rights movement&rsquo;s churches-and-colleges
      pattern is the cleanest large-scale analogue for &ldquo;infrastructure&rdquo; that is not just a
      server rack. Movemental&rsquo;s <strong>action–reflection</strong> cycle is theologically
      disciplined: digital as <strong>support</strong>, not <strong>replacement</strong>.{" "}
      <strong>Caveat:</strong> Historical analogies weaken when they become{" "}
      <strong>monocausal tech myths</strong> (Gutenberg alone &ldquo;caused&rdquo; the Reformation).
      Digital sociology does not say &ldquo;online cannot matter offline&rdquo;; it says{" "}
      <strong>bridging is contingent on design and power</strong>.{" "}
      <strong>Convergence implication:</strong> Embodiment is a <strong>normative anchor</strong> and a{" "}
      <strong>product test</strong> (&ldquo;does this feature crowd out local practice?&rdquo;), not a
      proof that all four forces are one empirical shock.
    </p>

    <h3 id="section-crux">The crux: interacting crisis vs. narrative bundle</h3>

    <p>
      Ask a simple falsifying question: <strong>If generative models plateaued tomorrow</strong>, would
      Movemental&rsquo;s publication, scenius, and embodiment arguments still stand on their own? For
      the most part, <strong>yes</strong> — which is both a strength and a vulnerability. It is a
      strength because the venture is not a single-model hedge. It is a vulnerability because it suggests{" "}
      <strong>AI is not the sole logical glue</strong> holding the four forces together; it is the{" "}
      <strong>most dramatic accelerant</strong> in the 2020s telling.
    </p>

    <p>
      Interaction effects — the kind complex systems talk likes to name — would show up as{" "}
      <strong>complementarities</strong>: adoption of one layer <strong>shifts demand</strong> for another
      in ways you can <strong>measure</strong>, not only <strong>assert</strong>. Example signatures:
      cohorts with higher <strong>cross-citation density</strong> among verified peers also show{" "}
      <strong>better retention</strong> on paid products, or leaders with{" "}
      <strong>offline gathering cadence</strong> derive <strong>more</strong> inbound trust traffic from
      graph-shaped discovery than matched solo-site controls. Movemental does not need to pretend those
      studies exist yet; it <strong>should</strong> treat them as the honest standard for upgrading
      convergence from <strong>story</strong> to <strong>thesis</strong>.
    </p>

    <p>
      Until then, the intellectually clean statement is:{" "}
      <strong>
        these four design problems are structurally coupled for Movemental&rsquo;s intended customer
      </strong>{" "}
      — high-responsibility leaders whose credibility, economics, peer world, and ecclesial imagination{" "}
      <strong>travel together</strong> in their week — even if they are not{" "}
      <strong>one exogenous megatrend</strong> in the econometric sense.
    </p>

    <h3 id="section-counter">Steel-man counter-argument</h3>

    <p>
      The strongest outsider critique is not &ldquo;you are liars,&rdquo; but &ldquo;you are{" "}
      <strong>storytellers</strong>.&rdquo; Four perennial Christian leadership anxieties —{" "}
      <strong>who can be believed, who gets paid, who truly knows me, whether screens disciple</strong>{" "}
      — have been <strong>compressed</strong> into a venture-shaped inevitability narrative. That critique
      stings because it is sometimes <strong>true</strong> of Silicon Valley decks. It loses force when
      you <strong>preempt</strong> it: show <strong>separable hypotheses</strong>,{" "}
      <strong>bounded promises</strong>, and <strong>corrections</strong> (like fixing fee comparisons)
      that signal you are not optimizing only for goosebumps.
    </p>

    <p>
      Another steel-man: <strong>&ldquo;Why now&rdquo;</strong> may be <strong>VC-convenient</strong> more
      than <strong>historically unique</strong>. Plenty of moral panics and gold rushes looked singular in
      the moment. Foresight literature warns of <strong>conviction narratives</strong> and{" "}
      <strong>compressed timelines</strong>. The ethical response is not to abandon urgency but to{" "}
      <strong>pair kairos with pre-mortem</strong> — name what would prove you wrong in three years and
      what you would do about it.
    </p>

    <p>
      <strong>Perfect storms and multi-cause stories.</strong> Argumentation and science-communication
      research is ambivalent about <strong>multi-cause &ldquo;perfect storm&rdquo;</strong> narratives.
      They can <strong>compress complexity</strong> into teachable memory — a legitimate leadership act
      — but they can also <strong>smuggle monocausal urgency</strong> when each cause actually has a
      different mechanism, timescale, and remedy. Movemental&rsquo;s convergence story is most ethical when
      it <strong>sequences</strong> claims: first show <strong>each force</strong> with its own evidence
      standard, then show <strong>why your product couples them</strong>, instead of letting the coupling{" "}
      <strong>borrow</strong> credibility from the scariest paragraph.
    </p>

    <h3 id="section-kairos">Kairos, hype, and the difference between discernment and pressure</h3>

    <p>
      Christian traditions really do distinguish <strong>reading the signs of the times</strong> from{" "}
      <strong>anxiety marketing</strong>. The convergence chapter&rsquo;s closing move — invitation rather
      than manifesto — is already aligned with that distinction. The research task is to keep{" "}
      <strong>ecclesial imagination</strong> from substituting for <strong>empirical proportion</strong>.
    </p>

    <p>Three guardrails that keep theology from overfunding hype:</p>

    <ol className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>01.</span>
        <span>
          <strong>Name beneficiaries and burdens.</strong> Kairos language should never float above{" "}
          <strong>who pays</strong>, <strong>who is excluded</strong>, and <strong>who maintains</strong>{" "}
          the infrastructure week to week.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>02.</span>
        <span>
          <strong>Separate prophecy from prediction.</strong> Prophetic speech names moral reality;
          prediction claims measurable futures. Do not let one voice pretend to be the other without a
          costume change.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>03.</span>
        <span>
          <strong>Pair urgency with Sabbath-shaped restraint.</strong> If everything is &ldquo;now or
          never,&rdquo; you are training souls — and customers — in scarcity spirituality. Let embodiment
          resistance extend to <strong>fundraising cadence</strong> and <strong>product launches</strong>.
        </span>
      </li>
    </ol>

    <p>
      None of this forbids strong language. It <strong>channels</strong> strong language toward{" "}
      <strong>accountable hope</strong>.
    </p>

    <h3 id="section-why-now">&ldquo;Why now&rdquo; without hucksterism</h3>

    <p>
      Market-timing essays are not peer review. They are <strong>bets</strong>. The defensible public
      version sounds like this: <strong>
        conditions are unusually favorable for an experiment that bundles ownership, bounded peer graphs,
        and movement-aware formation tooling
      </strong>{" "}
      — not <strong>&ldquo;history commands this product,&rdquo;</strong> but{" "}
      <strong>
        &ldquo;this is the shrewd place to allocate attention given how discovery, generation, and
        community are priced right now.&rdquo;
      </strong>
    </p>

    <p>
      For investors, add <strong>unit economics</strong> and <strong>distribution</strong> theses explicitly
      so &ldquo;convergence&rdquo; is not doing hidden work a spreadsheet should do.
    </p>

    <p>
      <strong>Polycrisis vocabulary — handle with care.</strong> Policy and central-bank discourse now
      sometimes uses <strong>&ldquo;polycrisis&rdquo;</strong> to name interacting systemic stresses. It
      can illuminate <strong>feedback</strong> metaphors, but it can also <strong>borrow gravitas</strong>{" "}
      from climate and macro shocks to <strong>dress up</strong> a product roadmap. If Movemental ever uses
      adjacent language, define it tightly and <strong>stay in lane</strong>: you are not claiming a
      general theory of civilization; you are claiming <strong>correlated pressures on a defined leader
      cohort</strong>.
    </p>

    <h3 id="section-recommendations">Recommendations — internal language, external language, and one hard rule</h3>

    <p>
      <strong>Internal language</strong>
    </p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Keep <strong>&ldquo;convergence&rdquo;</strong> as a <strong>chapter title</strong> and{" "}
          <strong>retreat vocabulary</strong> — a rich metaphor leaders can inhabit.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          In strategy docs, prefer <strong>&ldquo;coupled design constraints for our ICP&rdquo;</strong>{" "}
          when you mean product logic.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Maintain a living <strong>disconfirmation list</strong> (what would make this bundle
          unnecessary).
        </span>
      </li>
    </ul>

    <p>
      <strong>External language (site + book)</strong>
    </p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Do not</strong> imply Jenkins/Castells convergence <strong>without</strong> defining
          terms.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Do</strong> anchor credibility and economics claims to <strong>named sources</strong>{" "}
          (Pew; Authors Guild; verified industry monitors) per the sibling research articles.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Do</strong> narrow scenius claims to <strong>movement publishing&rsquo;s common failure
          modes</strong>, not the whole internet.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Do</strong> keep embodiment as a <strong>design principle</strong> with concrete feature
          tests, not only as atmosphere.
        </span>
      </li>
    </ul>

    <p>
      <strong>One explicit rule</strong>
    </p>

    <p>
      <strong>Do not say X without Y:</strong> Do not say <strong>&ldquo;four forces converge&rdquo;</strong>{" "}
      without immediately saying <strong>whether you mean</strong> (a){" "}
      <strong>empirical co-movement in data</strong>, (b){" "}
      <strong>integrated product design for a defined leader profile</strong>, or (c){" "}
      <strong>a kairos reading</strong>. Mixing those senses in a single paragraph is how good founders
      accidentally train skeptical readers to stop trusting the next sentence.
    </p>

    <h3 id="section-closing">Closing verdict</h3>

    <p>
      Is this a <strong>genuine historical moment</strong>, a <strong>well-constructed narrative</strong>,
      or <strong>something in between</strong>? <strong>In between</strong> is the answer that fits the
      evidence discipline shown across the research series: the problems are real, the integrations are
      plausible, the <strong>superlative historiography</strong> is optional.
    </p>

    <p>
      Movemental&rsquo;s convergence chapter is strongest when it is read as{" "}
      <strong>an invitation to a particular ethical-economic arrangement</strong> — credentialed by
      careful numbers, bounded claims, and visible peer graphs — rather than as a{" "}
      <strong>physics of history</strong> nobody can argue with.
    </p>

    <p>
      That is not a downgrade. In a credibility-scarce age, <strong>intellectual hospitality</strong> —
      saying exactly what kind of claim you are making — is itself a credibility strategy.
    </p>

    <p>
      If you want a single sentence for internal alignment, use this:{" "}
      <strong>
        Movemental&rsquo;s convergence is a design coupling and a kairos reading backed by separable
        evidence threads — not yet a single falsified macro-law, and not less valuable for that honesty.
      </strong>
    </p>

    <p>
      <strong>Practical next edits (cross-team)</strong>
    </p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Book + site: add a <strong>glossary footnote</strong> the first time <strong>convergence</strong>{" "}
          appears in a strong sense.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Marketing: replace <strong>fee-based platform horror stories</strong> with{" "}
          <strong>ownership + risk</strong> language unless the fee table is accurate.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Fundraising: lead with <strong>why the bundle beats point solutions for this ICP</strong>, not
          with <strong>epoch uniqueness</strong> unless you can cite independent support.
        </span>
      </li>
    </ul>
  </>
);
