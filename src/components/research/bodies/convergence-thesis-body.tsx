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
      In media studies, &ldquo;convergence&rdquo; already has a famous owner. Henry Jenkins&rsquo;s{" "}
      <em>Convergence Culture</em> (2006) describes a collision of industrial cross-platform strategy,
      migratory audiences, and participatory sense-making: a cultural logic as much as a technological
      one. Manuel Castells&rsquo;s &ldquo;network society&rdquo; vocabulary gives a second, adjacent
      register: institutions reorganized through switched networks and protocols of connectivity.
    </p>

    <p>
      Movemental uses the same word for something related but not identical: four thematic crises
      (credibility under generative conditions, publishing political economy, intentional peer scenes,
      embodiment of Christian movement) said to be converging by necessity. That is closer to kairos
      discourse than to Jenkins&rsquo;s transmedia economics. There is no scandal in borrowing a resonant
      word, but there is a credibility risk if a reader assumes you mean peer-reviewed &ldquo;convergence
      theory&rdquo; when you mean strategic simultaneity.
    </p>

    <p>
      Recommendation: In outward copy, either avoid the bare word <em>convergence</em> or pair it with a
      plain gloss (&ldquo;four pressures tightening together for leaders like you&rdquo;) and reserve
      &ldquo;convergence culture&rdquo; for actual Jenkins-style arguments.
    </p>

    <h3 id="section-four-forces">Four forces: strongest evidence, strongest caveat</h3>

    <p>
      The research series already did the heavy lifting for each force. Here is the meta snapshot
      Movemental should keep in mind when bundling.
    </p>

    <p>
      Credibility. Strength: The cost of fluent, plausible, scalable &ldquo;expert performance&rdquo; has
      fallen; platforms reward volume; ordinary users are unsure how to authenticate text and images.
      Peer-reviewed work supports serious limits on unaided human detection under challenging conditions,
      and industry monitors document rapid growth in synthetic publishing at the long tail. Caveat:
      Several headline numbers in circulation are misaligned or unsourced; &ldquo;credibility
      collapse&rdquo; is rhetoric, not a standardized sociological term. Expert annotators, task design,
      and channel differences matter. Sociology of expertise often describes renegotiation and
      jurisdictional conflict, not a single monotonic collapse. Convergence implication: It is fair to
      say generative AI raises the premium on human-graph signals, which rhymes with scenius, if you
      avoid implying nobody can detect synthetic work or that all channels are already lost.
    </p>

    <p>
      Publication economics. Strength: The Authors Guild&rsquo;s income survey{" "}
      <Cite n={19} title="Authors Guild · 2023 · n=5,699" /> is a blunt instrument in the best sense:
      for many published authors, book cash is thin even when cultural prestige exists. That supports a
      structural critique without requiring you to win a Twitter fight about publisher operating margins.
      Caveat: The specific &ldquo;Substack keeps 85–90%&rdquo; family of claims is not compatible with
      official fee documentation once you measure cash fees honestly{" "}
      <Cite n={20} title="Substack Support · fee documentation" />. Strategic dependence (algorithms,
      account risk, mobile IAP) is real, but it is not the same sentence as rake. Convergence
      implication: Tie &ldquo;publication crisis&rdquo; to ownership and bundle design, not to false fee
      arithmetic. That actually strengthens the bridge to a partnership model because it shows you
      understand spreadsheets.
    </p>

    <p>
      Scenius. Strength: Brian Eno and Kevin Kelly give a memorable critique of lone-genius mythology and
      a checklist of cultural conditions scenes require. Movemental&rsquo;s extension (bounded, costly
      peer recognition as a counterweight to metric games) is a legible product philosophy. Caveat: Eno
      and Kelly do not offer a theory of justified belief or Sybil-resistant graphs. Digital scenes that
      look like scenius are everywhere in niches (open source, academia, fandoms, co-working communities),
      so &ldquo;the internet ignored scenius&rdquo; is too broad. The precise claim is narrower:
      movement-leader publishing stacks have often optimized for solo scale and feed performance rather
      than mutual, cross-checkable esteem at human scale. Convergence implication: The credibility ↔
      scenius link is design-plausible, not theorem-true.
    </p>

    <p>
      Movement and embodiment. Strength: Social movement scholarship is kind to trust networks,
      repertoires, and multimodal persuasion. The civil rights movement&rsquo;s churches-and-colleges
      pattern is the cleanest large-scale analogue for &ldquo;infrastructure&rdquo; that is not just a
      server rack. Movemental&rsquo;s action–reflection cycle is theologically disciplined: digital as
      support, not replacement. Caveat: Historical analogies weaken when they become monocausal tech
      myths (Gutenberg alone &ldquo;caused&rdquo; the Reformation). Digital sociology does not say
      &ldquo;online cannot matter offline&rdquo;; it says bridging is contingent on design and power.
      Convergence implication: Embodiment is a normative anchor and a product test (&ldquo;does this
      feature crowd out local practice?&rdquo;), not a proof that all four forces are one empirical
      shock.
    </p>

    <h3 id="section-crux">The crux: interacting crisis vs. narrative bundle</h3>

    <p>
      Ask a simple falsifying question: If generative models plateaued tomorrow, would Movemental&rsquo;s
      publication, scenius, and embodiment arguments still stand on their own? For the most part, yes,
      which is both a strength and a vulnerability. It is a strength because the venture is not a
      single-model hedge. It is a vulnerability because it suggests AI is not the sole logical glue
      holding the four forces together; it is the most dramatic accelerant in the 2020s telling.
    </p>

    <p>
      Interaction effects would show up as complementarities: adoption of one layer shifts demand for
      another in ways you can measure, not only assert. Example signatures: cohorts with higher
      cross-citation density among verified peers also show better retention on paid products, or leaders
      with offline gathering cadence derive more inbound trust traffic from graph-shaped discovery than
      matched solo-site controls. Movemental does not need to pretend those studies exist yet; it should
      treat them as the honest standard for upgrading convergence from story to thesis.
    </p>

    <p>
      Until then, the intellectually clean statement is: these four design problems are structurally
      coupled for Movemental&rsquo;s intended customer (high-responsibility leaders whose credibility,
      economics, peer world, and ecclesial imagination travel together in their week), even if they are
      not one exogenous megatrend in the econometric sense.
    </p>

    <h3 id="section-counter">Steel-man counter-argument</h3>

    <p>
      The strongest outsider critique is not &ldquo;you are liars,&rdquo; but &ldquo;you are
      storytellers.&rdquo; Four perennial Christian leadership anxieties (who can be believed, who gets
      paid, who truly knows me, whether screens disciple) have been compressed into a venture-shaped
      inevitability narrative. That critique stings because it is sometimes true of Silicon Valley decks.
      It loses force when you preempt it: show separable hypotheses, bounded promises, and corrections
      (like fixing fee comparisons) that signal you are not optimizing only for goosebumps.
    </p>

    <p>
      Another steel-man: &ldquo;Why now&rdquo; may be VC-convenient more than historically unique. Plenty
      of moral panics and gold rushes looked singular in the moment. Foresight literature warns of
      conviction narratives and compressed timelines. The ethical response is not to abandon urgency but
      to pair kairos with pre-mortem: name what would prove you wrong in three years and what you would
      do about it.
    </p>

    <p>
      Perfect storms and multi-cause stories. Argumentation and science-communication research is
      ambivalent about multi-cause &ldquo;perfect storm&rdquo; narratives. They can compress complexity
      into teachable memory (a legitimate leadership act) but they can also smuggle monocausal urgency
      when each cause actually has a different mechanism, timescale, and remedy. Movemental&rsquo;s
      convergence story is most ethical when it sequences claims: first show each force with its own
      evidence standard, then show why your product couples them, instead of letting the coupling borrow
      credibility from the scariest paragraph.
    </p>

    <h3 id="section-kairos">Kairos, hype, and the difference between discernment and pressure</h3>

    <p>
      Christian traditions really do distinguish reading the signs of the times from anxiety marketing.
      The convergence chapter&rsquo;s closing move (invitation rather than manifesto) is already aligned
      with that distinction. The research task is to keep ecclesial imagination from substituting for
      empirical proportion.
    </p>

    <p>Three guardrails that keep theology from overfunding hype:</p>

    <ol className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>01.</span>
        <span>
          Name beneficiaries and burdens. Kairos language should never float above who pays, who is
          excluded, and who maintains the infrastructure week to week.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>02.</span>
        <span>
          Separate prophecy from prediction. Prophetic speech names moral reality; prediction claims
          measurable futures. Do not let one voice pretend to be the other without a costume change.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>03.</span>
        <span>
          Pair urgency with Sabbath-shaped restraint. If everything is &ldquo;now or never,&rdquo; you
          are training souls (and customers) in scarcity spirituality. Let embodiment resistance extend
          to fundraising cadence and product launches.
        </span>
      </li>
    </ol>

    <p>
      None of this forbids strong language. It channels strong language toward accountable hope.
    </p>

    <h3 id="section-why-now">&ldquo;Why now&rdquo; without hucksterism</h3>

    <p>
      Market-timing essays are not peer review. They are bets. The defensible public version sounds like
      this: conditions are unusually favorable for an experiment that bundles ownership, bounded peer
      graphs, and movement-aware formation tooling, not &ldquo;history commands this product,&rdquo; but
      &ldquo;this is the shrewd place to allocate attention given how discovery, generation, and community
      are priced right now.&rdquo;
    </p>

    <p>
      For investors, add unit economics and distribution theses explicitly so &ldquo;convergence&rdquo; is
      not doing hidden work a spreadsheet should do.
    </p>

    <p>
      Polycrisis vocabulary: handle with care. Policy and central-bank discourse now sometimes uses
      &ldquo;polycrisis&rdquo; to name interacting systemic stresses. It can illuminate feedback
      metaphors, but it can also borrow gravitas from climate and macro shocks to dress up a product
      roadmap. If Movemental ever uses adjacent language, define it tightly and stay in lane: you are not
      claiming a general theory of civilization; you are claiming correlated pressures on a defined
      leader cohort.
    </p>

    <h3 id="section-recommendations">Recommendations: internal language, external language, and one hard rule</h3>

    <p>Internal language</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Keep &ldquo;convergence&rdquo; as a chapter title and retreat vocabulary, a rich metaphor
          leaders can inhabit.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          In strategy docs, prefer &ldquo;coupled design constraints for our ICP&rdquo; when you mean
          product logic.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Maintain a living disconfirmation list (what would make this bundle unnecessary).
        </span>
      </li>
    </ul>

    <p>External language (site + book)</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Do not imply Jenkins/Castells convergence without defining terms.</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Do anchor credibility and economics claims to named sources (Pew; Authors Guild; verified
          industry monitors) per the sibling research articles.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Do narrow scenius claims to movement publishing&rsquo;s common failure modes, not the whole
          internet.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Do keep embodiment as a design principle with concrete feature tests, not only as atmosphere.
        </span>
      </li>
    </ul>

    <p>One explicit rule</p>

    <p>
      Do not say &ldquo;four forces converge&rdquo; without immediately saying whether you mean (a)
      empirical co-movement in data, (b) integrated product design for a defined leader profile, or (c)
      a kairos reading. Mixing those senses in a single paragraph is how good founders accidentally train
      skeptical readers to stop trusting the next sentence.
    </p>

    <h3 id="section-closing">Closing verdict</h3>

    <p>
      Is this a genuine historical moment, a well-constructed narrative, or something in between? In
      between is the answer that fits the evidence discipline shown across the research series: the
      problems are real, the integrations are plausible, the superlative historiography is optional.
    </p>

    <p>
      Movemental&rsquo;s convergence chapter is strongest when it is read as an invitation to a particular
      ethical-economic arrangement (credentialed by careful numbers, bounded claims, and visible peer
      graphs) rather than as a physics of history nobody can argue with.
    </p>

    <p>
      That is not a downgrade. In a credibility-scarce age, intellectual hospitality (saying exactly what
      kind of claim you are making) is itself a credibility strategy.
    </p>

    <p>
      If you need one sentence that holds the whole argument: Movemental&rsquo;s convergence is a design
      coupling and a kairos reading backed by separable evidence threads. It is not yet a single
      falsified macro-law. It is not less valuable for that honesty.
    </p>

    <h3 id="section-coupling">How the four forces connect in practice</h3>

    <p>
      The four pressures do not need to be one historical law to justify one product. For the leader
      Movemental serves, credibility, economics, peer recognition, and embodied practice show up in the
      same week. A sermon draft raises trust questions. A thin book royalty raises sustainability
      questions. A solo platform raises isolation questions. A screen-heavy workflow raises formation
      questions. Movemental&rsquo;s bet is that these problems are best addressed together: owned
      publishing with inspectable AI assistance, economics that return margin to the leader, bounded
      peer graphs that reward cross-checkable esteem, and tooling that supports local practice rather
      than replacing it.
    </p>

    <p>
      That coupling is the product thesis. It is not prophecy. It is a design choice for a defined
      cohort, offered with numbered evidence, honest fee math, and room for the leader to say no.
    </p>
  </>
);
