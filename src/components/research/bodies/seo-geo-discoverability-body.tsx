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

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className={styles.textInkBlue} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

/** Analysis — ported from `docs/articles/graded-high/85-99/05-seo-geo-discoverability.md`. */
export const seoGeoDiscoverabilityBody: ReactNode = (
  <>
    <h3 id="section-uncomfortable-truth">The uncomfortable truth about &ldquo;who owns the idea&rdquo; online</h3>

    <p className={styles.dropCap}>
      Movement leaders often assume that being the originator of a framework should translate into
      being the <strong>default destination</strong> for curiosity about that framework. In practice,
      informational search is not a citation system. It is a{" "}
      <strong>competition for intent satisfaction</strong> among pages that can plausibly answer a
      question in one click, with strong priors favoring domains that are already large, heavily
      linked, and legible to both humans and machines.
    </p>

    <p>
      That gap—between <strong>intellectual paternity</strong> and <strong>SERP primacy</strong>—is
      real. It is also not unique to theology. If you search for many named methodologies in business
      or leadership, you will see publishers, Wikipedia-style summaries, training marketplaces, and
      well-capitalized consultancies occupying attention alongside, or ahead of, individual authors.
      Religious and movemental content adds familiar constraints: smaller teams, fewer commercial
      backlinks, uneven technical SEO, and (for some topics) expectations closer to &ldquo;Your Money
      or Your Life&rdquo; quality bars, where Google&rsquo;s own quality documentation stresses care
      and trust <Cite n={22} title="Google · Search Quality Rater Guidelines" />.
    </p>

    <p>
      None of this implies that originators &ldquo;deserve&rdquo; poor visibility. It does imply that{" "}
      <strong>discoverability is infrastructural</strong>, not a moral reward for being first.
    </p>

    <p>
      <strong>A useful parallel from business thought.</strong> When people learn &ldquo;Jobs to Be
      Done&rdquo; or &ldquo;Blue Ocean Strategy,&rdquo; they frequently meet the idea through{" "}
      <strong>secondary apparatus</strong> first: a podcast timestamp, a consultant&rsquo;s slide, a
      course landing page, or a Wikipedia summary that compresses nuance into definitional stability.
      The originator&rsquo;s own site may be excellent yet poorly matched to the{" "}
      <strong>exact informational phrasing</strong> people type, or it may sit on a domain that never
      invested in the long, unglamorous work of crawl hygiene, internal linking, and entity
      consolidation across years.
    </p>

    <p>
      Movemental&rsquo;s leaders are not failing some unique spiritual test when the same thing happens
      to &ldquo;APEST&rdquo; or &ldquo;apostolic genius.&rdquo; They are swimming in the same{" "}
      <strong>attention economy</strong>—one where convenience, familiarity, and consolidated answers
      beat lineage unless lineage is packaged as a first-class public resource.
    </p>

    <h3 id="section-what-changed">What actually changed: from ten blue links to synthesized answers</h3>

    <p>
      Two shifts compound the old problem.
    </p>

    <p>
      First, classic SEO already rewarded <strong>aggregators</strong>—sites that consolidate
      comparisons, reviews, definitions, and long-tail variants at scale. The reasons are boring and
      durable: broad crawl paths, strong domain signals, habitual user behavior, and pages that match
      informational intent with low friction.
    </p>

    <p>
      Second, <strong>generative interfaces</strong> (AI Overviews, AI-first search products,
      assistant-style answers) change the victory condition. Even a strong traditional rank can
      produce <strong>fewer clicks</strong> when an answer is assembled on the SERP itself. Industry
      studies—particularly vendor analyses of large keyword sets—report substantial CTR pressure when
      AI summaries appear. The exact percentages move with geography, query mix, and UI changes, so
      marketing copy should treat them as <strong>directional</strong>, not eternal constants.
    </p>

    <p>
      The practical implication for Movemental&rsquo;s audience is blunt: being &ldquo;right&rdquo; and
      being <strong>findable</strong> diverged long ago; they now can diverge{" "}
      <strong>even when you rank</strong>.
    </p>

    <h3 id="section-eeat">EEAT: necessary, misunderstood, and not a cheat code</h3>

    <p>
      Google&rsquo;s Search Quality Rater Guidelines remain the cleanest primary reference for what{" "}
      <strong>Experience, Expertise, Authoritativeness, and Trustworthiness</strong> mean in
      evaluation terms <Cite n={22} title="Google · Search Quality Rater Guidelines" />. Raters are
      not dialing your rankings up or down by hand; their work is used to{" "}
      <strong>align</strong> automated systems with human judgments about quality. That distinction
      matters because the SEO industry sometimes talks as if EEAT were a transparent score you can
      &ldquo;optimize&rdquo; the way you optimize title tags.
    </p>

    <p>
      What EEAT is good for is <strong>defensible substance</strong>: clear authorship, real
      credentials where relevant, transparent sourcing, editorial standards, and pages that reduce
      harm. What EEAT is not is a guarantee that a niche expert page will outrank a dominant
      aggregator for a head term.
    </p>

    <p>
      Practitioner voices worth listening to—Lily Ray is a representative example—tend to converge on
      a boringly effective playbook: make expertise <strong>visible and connected</strong> (bios,
      bylines, primary sources, structured data where honest, consistent entity naming). That playbook
      helps both classic search and the extractive tendencies of large language models, which favor
      crisp, quotable, well-segmented passages.
    </p>

    <h3 id="section-geo">GEO: a real research agenda with early, noisy commercial packaging</h3>

    <p>
      The acronym <strong>GEO</strong> (Generative Engine Optimization) entered the conversation with
      a 2023 paper led by Princeton-affiliated authors, later updated on arXiv and associated with a
      major data-mining conference track{" "}
      <Cite n={23} title="Aggarwal et al. · GEO · 2023" />. The core claim is framed responsibly:
      generative engines synthesize multiple sources; creators face a <strong>black-box</strong>{" "}
      environment; the authors propose a benchmark and optimization framing and report{" "}
      <strong>material but bounded</strong> improvements in their evaluations—with{" "}
      <strong>domain dependence</strong> called out explicitly.
    </p>

    <p>
      That is the right mental model. GEO is not astrology. It is also not a settled engineering
      specification handed down by Google or OpenAI. Follow-on papers, vendor benchmarks, and
      &ldquo;citation economy&rdquo; reports are multiplying; some will be rigorous, some will be{" "}
      <strong>content marketing dressed as science</strong>. Movemental benefits from treating GEO as{" "}
      <strong>an experiment program</strong>: structured content, explicit citations, unique data and
      primary insight, clean semantics, and measurement against real queries your audience uses.
    </p>

    <p>
      The early GEO research caution also pushes back on lazy SEO reflexes. In controlled settings,
      some tactics that resemble old manipulation patterns do not behave the way they behaved in
      classic ranking games. The winning move is less &ldquo;trick the model&rdquo; and more{" "}
      <strong>be the kind of source a model should want to quote</strong>—which overlaps with good
      editorial craft.
    </p>

    <p>
      <strong>A pragmatic GEO playbook (without promising magic).</strong> Think in layers that help
      both retrieval and reading:
    </p>

    <ol className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>01.</span>
        <span>
          <strong>Extractable expertise</strong> — short declarative definitions, clearly attributed
          quotes, and &ldquo;first principles&rdquo; paragraphs a system can lift without torturing the
          prose.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>02.</span>
        <span>
          <strong>Primary-ness</strong> — case examples, field notes, data tables, and FAQs that cannot
          be trivially replaced by a generic encyclopedia article.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>03.</span>
        <span>
          <strong>Stable entities</strong> — consistent naming for people, books, frameworks, and
          institutions; sane URL slugs; avoid orphan pages that never earn internal links.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>04.</span>
        <span>
          <strong>Honest structured data</strong> — JSON-LD that reflects what is visibly true on the
          page, not keyword stuffing in schema clothing.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>05.</span>
        <span>
          <strong>Measurement</strong> — a quarterly review of a fixed query set: where do you appear
          in classic results, in AI summaries, and in answer engines; which pages earn citations when
          you explicitly prompt models to show sources?
        </span>
      </li>
    </ol>

    <p>
      None of these steps <strong>guarantees</strong> inclusion in an AI answer. They raise the odds
      that you are legible to machines <strong>and</strong> worthy of human trust—the same twin
      requirement EEAT has been pointing at all along.
    </p>

    <h3 id="section-networks">Do networks &ldquo;solve&rdquo; discoverability, or relocate the problem?</h3>

    <p>
      A network of movement leaders can be a genuine strategic asset <strong>if</strong> it produces
      what search systems and generative systems both reward: <strong>distinct coverage</strong>,{" "}
      <strong>non-duplicative depth</strong>, <strong>clean internal linking</strong>,{" "}
      <strong>shared authority without templated thin pages</strong>, and <strong>governance</strong>{" "}
      that prevents a thousand near-identical &ldquo;what is X?&rdquo; articles from cannibalizing each
      other.
    </p>

    <p>
      Topic cluster thinking—pillar pages plus supporting pages with intentional internal links—is
      mainstream SEO advice for a reason. It helps search engines understand scope. It also helps
      humans navigate a body of thought. A hundred-leader platform is not automatically an SEO
      advantage; it is a <strong>container</strong> that can be executed well or poorly.
    </p>

    <p>
      There is a second, less discussed network effect: <strong>co-citation in public language</strong>.
      When trustworthy adjacent authors link to you, mention you alongside primary texts, and treat
      you as a peer, the web&rsquo;s graph starts to resemble your actual intellectual graph. That is
      slower than a growth hack, but it aligns with both EEAT instincts and the kinds of sources AI
      systems already gravitate toward when they need a stable anchor.
    </p>

    <h3 id="section-multiplier">Stress-testing the multiplier narrative</h3>

    <p>
      Internal Movemental economics documentation models network reach as scaling from a solo baseline
      to <strong>28× at roughly a hundred participants</strong> and{" "}
      <strong>500× at roughly a thousand</strong>. That is best read as{" "}
      <strong>illustrative network math tied to a business story</strong>, not as an independently
      verified empirical law of audience growth.
    </p>

    <p>
      A literature-style web pass did not surface a standard, citable study that validates
      &ldquo;28×–500×&rdquo; as measured propagation across social graphs. Contagion research on
      platforms does show amplification dynamics, but reported ratios are domain- and
      mechanism-specific and rarely map cleanly onto &ldquo;number of authors on a platform.&rdquo;
    </p>

    <p>Public messaging should therefore:</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Treat <strong>28×–500×</strong> as a <strong>scenario</strong> or internal model unless and
          until backed by transparent methodology (definitions of reach, deduplication across
          overlapping audiences, time window, channel mix).
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Prefer language like <strong>&ldquo;collective discovery surface&rdquo;</strong> or{" "}
          <strong>&ldquo;shared authority and cross-audience introduction&rdquo;</strong> when you want
          credibility without implying a replicated experiment you do not yet have.
        </span>
      </li>
    </ul>

    <h3 id="section-social-email">Social discovery versus email: do not overclaim a single &ldquo;waste percentage&rdquo;</h3>

    <p>
      It is directionally true that organic social reach is often constrained and that email—being
      permissioned and direct—can outperform social on conversion-like outcomes in many funnels.
      Marketing blogs routinely publish wide benchmark ranges. Those ranges are not interchangeable
      with Pew-style nationally representative surveys.
    </p>

    <p>
      If an argument index cites &ldquo;70–80% left on the table,&rdquo; treat it as{" "}
      <strong>rhetorical compression</strong> unless you can tie it to a specific study definition.
      Safer public phrasing: <strong>rented audiences</strong>,{" "}
      <strong>algorithmic intermediation</strong>, <strong>inbox ownership</strong>, and{" "}
      <strong>measurement on your own list</strong>.
    </p>

    <h3 id="section-safe-to-say">What is safe to say in public right now</h3>

    <p>
      <strong>Reasonably safe with light qualification</strong>
    </p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Original creators often compete poorly on the highest-competition informational queries
          against large, well-linked aggregators—this is a <strong>general</strong> pattern, not a
          theological insult.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          EEAT-aligned editorial practices reduce tail risk and improve the odds that both humans and
          systems treat you as a serious source.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          GEO is a <strong>real research direction</strong> with early empirical work; it complements
          classic SEO because the win can be &ldquo;cited in the answer,&rdquo; not only &ldquo;clicked
          from position two.&rdquo;
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Networks can expand <strong>discovery paths</strong> and <strong>topic coverage</strong> when
          executed as a coordinated editorial system, not a stampede of duplicates.
        </span>
      </li>
    </ul>

    <p>
      <strong>Needs qualification or backing before hard claims</strong>
    </p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Any precise &ldquo;AI Overviews reduced CTR by X%&rdquo; number—tie to a named study, date,
          and geography, or avoid the number.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          &ldquo;70–80% left on the table&rdquo; without a defined denominator.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          &ldquo;28×–500×&rdquo; as if it were externally validated empirical reach.
        </span>
      </li>
    </ul>

    <h3 id="section-early-geo">Is Movemental early to GEO?</h3>

    <p>
      <strong>Early enough to be interesting, not early enough to be alone.</strong> The research
      frontier started in earnest with public GEO framing in 2023–2024; the commercial noise layer is
      already loud in 2026. The strategic opportunity is not &ldquo;coin a hashtag.&rdquo; It is to
      build <strong>durable corpora</strong>—structured, attributable, interlinked, theologically serious
      content—that age well as engines change UI and retrieval.
    </p>

    <p>
      If Movemental&rsquo;s bet is that movement leaders should own platforms rather than rent
      audiences, the honest SEO story is aligned: <strong>ownership is measured in assets</strong>—lists,
      corpora, relationships, data, and brand entity—not in a single heroic homepage ranking for a
      head term you did not choose to fight for.
    </p>

    <h3 id="section-next-steps">Suggested next research steps</h3>

    <ol className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>01.</span>
        <span>
          Run a <strong>small fixed panel</strong> of queries (movemental + adjacent business framework
          queries) through a rank tracker and screenshot AI Overview presence monthly—internal ground
          truth beats blog citations.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>02.</span>
        <span>
          Commission or replicate a <strong>lightweight citation audit</strong> on a dozen theology
          queries in ChatGPT, Perplexity, and Google AI mode—document domains, not vibes.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>03.</span>
        <span>
          If the 28×–500× model remains in GTM materials, attach a <strong>one-page methods appendix</strong>:
          assumptions, variables, and what would falsify the model.
        </span>
      </li>
    </ol>

    <h3 id="section-references">References (selected)</h3>
    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Google, <em>Search Quality Rater Guidelines</em>.{" "}
          <Ext href="https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf">
            guidelines.raterhub.com
          </Ext>
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Aggarwal, P., et al. (2023). &ldquo;GEO: Generative Engine Optimization.&rdquo;{" "}
          <Ext href="https://arxiv.org/abs/2311.09735">arxiv.org/abs/2311.09735</Ext>
        </span>
      </li>
    </ul>
  </>
);
