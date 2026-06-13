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
      being the default destination for curiosity about that framework. In practice, informational
      search is not a citation system. It is a competition for intent satisfaction among pages that
      can plausibly answer a question in one click, with strong priors favoring domains that are
      already large, heavily linked, and legible to both humans and machines.
    </p>

    <p>
      That gap between intellectual paternity and SERP primacy is real. It is also not unique to
      theology. If you search for many named methodologies in business or leadership, you will see
      publishers, Wikipedia-style summaries, training marketplaces, and well-capitalized consultancies
      occupying attention alongside, or ahead of, individual authors. Religious and movemental content
      adds familiar constraints: smaller teams, fewer commercial backlinks, uneven technical SEO, and
      (for some topics) expectations closer to &ldquo;Your Money or Your Life&rdquo; quality bars,
      where Google&rsquo;s own quality documentation stresses care and trust{" "}
      <Cite n={22} title="Google · Search Quality Rater Guidelines" />.
    </p>

    <p>
      None of this implies that originators &ldquo;deserve&rdquo; poor visibility. It does imply that
      discoverability is infrastructural, not a moral reward for being first.
    </p>

    <p>
      A useful parallel from business thought. When people learn &ldquo;Jobs to Be Done&rdquo; or
      &ldquo;Blue Ocean Strategy,&rdquo; they frequently meet the idea through secondary apparatus
      first: a podcast timestamp, a consultant&rsquo;s slide, a course landing page, or a Wikipedia
      summary that compresses nuance into definitional stability. The originator&rsquo;s own site may
      be excellent yet poorly matched to the exact informational phrasing people type, or it may sit on
      a domain that never invested in the long, unglamorous work of crawl hygiene, internal linking,
      and entity consolidation across years.
    </p>

    <p>
      Movemental&rsquo;s leaders are not failing some unique spiritual test when the same thing happens
      to &ldquo;APEST&rdquo; or &ldquo;apostolic genius.&rdquo; They are swimming in the same attention
      economy, one where convenience, familiarity, and consolidated answers beat lineage unless lineage
      is packaged as a first-class public resource.
    </p>

    <h3 id="section-what-changed">What actually changed: from ten blue links to synthesized answers</h3>

    <p>Two shifts compound the old problem.</p>

    <p>
      First, classic SEO already rewarded aggregators: sites that consolidate comparisons, reviews,
      definitions, and long-tail variants in bulk. The reasons are boring and durable: broad crawl
      paths, strong domain signals, habitual user behavior, and pages that match informational intent
      with low friction.
    </p>

    <p>
      Second, generative interfaces (AI Overviews, AI-first search products, assistant-style answers)
      change the victory condition. Even a strong traditional rank can produce fewer clicks when an
      answer is assembled on the SERP itself. Industry studies, particularly vendor analyses of large
      keyword sets, report substantial CTR pressure when AI summaries appear. The exact percentages move
      with geography, query mix, and UI changes, so marketing copy should treat them as directional,
      not eternal constants.
    </p>

    <p>
      The practical implication for Movemental&rsquo;s audience is blunt: being &ldquo;right&rdquo; and
      being findable diverged long ago; they now can diverge even when you rank.
    </p>

    <h3 id="section-eeat">EEAT: necessary, misunderstood, and not a cheat code</h3>

    <p>
      Google&rsquo;s Search Quality Rater Guidelines remain the cleanest primary reference for what
      Experience, Expertise, Authoritativeness, and Trustworthiness mean in evaluation terms{" "}
      <Cite n={22} title="Google · Search Quality Rater Guidelines" />. Raters are not dialing your
      rankings up or down by hand; their work is used to align automated systems with human judgments
      about quality. That distinction matters because the SEO industry sometimes talks as if EEAT were
      a transparent score you can &ldquo;optimize&rdquo; the way you optimize title tags.
    </p>

    <p>
      What EEAT is good for is defensible substance: clear authorship, real credentials where relevant,
      transparent sourcing, editorial standards, and pages that reduce harm. What EEAT is not is a
      guarantee that a niche expert page will outrank a dominant aggregator for a head term.
    </p>

    <p>
      Practitioner voices worth listening to (Lily Ray is a representative example) tend to converge
      on a boringly effective playbook: make expertise visible and connected (bios, bylines, primary
      sources, structured data where honest, consistent entity naming). That playbook helps both
      classic search and the extractive tendencies of large language models, which favor crisp,
      quotable, well-segmented passages.
    </p>

    <h3 id="section-geo">GEO: a real research agenda with early, noisy commercial packaging</h3>

    <p>
      The acronym GEO (Generative Engine Optimization) entered the conversation with a 2023 paper led
      by Princeton-affiliated authors, later updated on arXiv and associated with a major data-mining
      conference track <Cite n={23} title="Aggarwal et al. · GEO · 2023" />. The core claim is framed
      responsibly: generative engines synthesize multiple sources; creators face a black-box
      environment; the authors propose a benchmark and optimization framing and report material but
      bounded improvements in their evaluations, with domain dependence called out explicitly.
    </p>

    <p>
      That is the right mental model. GEO is not astrology. It is also not a settled engineering
      specification handed down by Google or OpenAI. Follow-on papers, vendor benchmarks, and
      &ldquo;citation economy&rdquo; reports are multiplying; some will be rigorous, some will be
      content marketing dressed as science. Movemental benefits from treating GEO as an experiment
      program: structured content, explicit citations, unique data and primary insight, clean semantics,
      and measurement against real queries your audience uses.
    </p>

    <p>
      The early GEO research caution also pushes back on lazy SEO reflexes. In controlled settings,
      some tactics that resemble old manipulation patterns do not behave the way they behaved in classic
      ranking games. The winning move is less &ldquo;trick the model&rdquo; and more be the kind of
      source a model should want to quote, which overlaps with good editorial craft.
    </p>

    <p>A pragmatic GEO playbook (without promising magic). Think in layers that help both retrieval and reading:</p>

    <ol className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>01.</span>
        <span>
          Extractable expertise: short declarative definitions, clearly attributed quotes, and
          &ldquo;first principles&rdquo; paragraphs a system can lift without torturing the prose.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>02.</span>
        <span>
          Primary-ness: case examples, field notes, data tables, and FAQs that cannot be trivially
          replaced by a generic encyclopedia article.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>03.</span>
        <span>
          Stable entities: consistent naming for people, books, frameworks, and institutions; sane URL
          slugs; avoid orphan pages that never earn internal links.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>04.</span>
        <span>
          Honest structured data: JSON-LD that reflects what is visibly true on the page, not keyword
          stuffing in schema clothing.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>05.</span>
        <span>
          Measurement: a quarterly review of a fixed query set. Where do you appear in classic results,
          in AI summaries, and in answer engines? Which pages earn citations when you explicitly prompt
          models to show sources?
        </span>
      </li>
    </ol>

    <p>
      None of these steps guarantees inclusion in an AI answer. They raise the odds that you are
      legible to machines and worthy of human trust, the same twin requirement EEAT has been pointing at
      all along.
    </p>

    <h3 id="section-networks">Do networks &ldquo;solve&rdquo; discoverability, or relocate the problem?</h3>

    <p>
      A network of movement leaders can be a genuine strategic asset if it produces what search systems
      and generative systems both reward: distinct coverage, non-duplicative depth, clean internal
      linking, shared authority without templated thin pages, and governance that prevents a thousand
      near-identical &ldquo;what is X?&rdquo; articles from cannibalizing each other.
    </p>

    <p>
      Topic cluster thinking (pillar pages plus supporting pages with intentional internal links) is
      mainstream SEO advice for a reason. It helps search engines understand scope. It also helps humans
      navigate a body of thought. A hundred-leader platform is not automatically an SEO advantage; it is
      a container that can be executed well or poorly.
    </p>

    <p>
      There is a second, less discussed network effect: co-citation in public language. When
      trustworthy adjacent authors link to you, mention you alongside primary texts, and treat you as a
      peer, the web&rsquo;s graph starts to resemble your actual intellectual graph. That is slower than
      a growth hack, but it aligns with both EEAT instincts and the kinds of sources AI systems already
      gravitate toward when they need a stable anchor.
    </p>

    <h3 id="section-multiplier">Stress-testing the multiplier narrative</h3>

    <p>
      Internal Movemental economics documentation models network reach as scaling from a solo baseline
      to 28× at roughly a hundred participants and 500× at roughly a thousand. That is best read as
      illustrative network math tied to a business story, not as an independently verified empirical law
      of audience growth.
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
          Treat 28×–500× as a scenario or internal model unless and until backed by transparent
          methodology (definitions of reach, deduplication across overlapping audiences, time window,
          channel mix).
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Prefer language like &ldquo;collective discovery surface&rdquo; or &ldquo;shared authority
          and cross-audience introduction&rdquo; when you want credibility without implying a replicated
          experiment you do not yet have.
        </span>
      </li>
    </ul>

    <h3 id="section-social-email">Social discovery versus email: do not overclaim a single &ldquo;waste percentage&rdquo;</h3>

    <p>
      It is directionally true that organic social reach is often constrained and that email, being
      permissioned and direct, can outperform social on conversion-like outcomes in many funnels.
      Marketing blogs routinely publish wide benchmark ranges. Those ranges are not interchangeable with
      Pew-style nationally representative surveys.
    </p>

    <p>
      If an argument cites &ldquo;70–80% left on the table,&rdquo; treat it as rhetorical compression
      unless you can tie it to a specific study definition. Safer public phrasing: rented audiences,
      algorithmic intermediation, inbox ownership, and measurement on your own list.
    </p>

    <h3 id="section-safe-to-say">What is safe to say in public right now</h3>

    <p>Reasonably safe with light qualification</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Original creators often compete poorly on the highest-competition informational queries against
          large, well-linked aggregators. This is a general pattern, not a theological insult.
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
          GEO is a real research direction with early empirical work; it complements classic SEO because
          the win can be &ldquo;cited in the answer,&rdquo; not only &ldquo;clicked from position
          two.&rdquo;
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Networks can expand discovery paths and topic coverage when executed as a coordinated editorial
          system, not a stampede of duplicates.
        </span>
      </li>
    </ul>

    <p>Needs qualification or backing before hard claims</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Any precise &ldquo;AI Overviews reduced CTR by X%&rdquo; number. Tie to a named study, date,
          and geography, or avoid the number.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>&ldquo;70–80% left on the table&rdquo; without a defined denominator.</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>&ldquo;28×–500×&rdquo; as if it were externally validated empirical reach.</span>
      </li>
    </ul>

    <h3 id="section-early-geo">Is Movemental early to GEO?</h3>

    <p>
      Early enough to be interesting, not early enough to be alone. The research frontier started in
      earnest with public GEO framing in 2023–2024; the commercial noise layer is already loud in 2026.
      The strategic opportunity is not &ldquo;coin a hashtag.&rdquo; It is to build durable corpora:
      structured, attributable, interlinked, theologically serious content that age well as engines
      change UI and retrieval.
    </p>

    <p>
      If Movemental&rsquo;s bet is that movement leaders should own platforms rather than rent
      audiences, the honest SEO story is aligned: ownership is measured in assets (lists, corpora,
      relationships, data, and brand entity), not in a single heroic homepage ranking for a head term
      you did not choose to fight for.
    </p>

    <h3 id="section-next-steps">Suggested next research steps</h3>

    <ol className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>01.</span>
        <span>
          Run a small fixed panel of queries (movemental and adjacent business framework queries) through
          a rank tracker and screenshot AI Overview presence monthly. Internal ground truth beats blog
          citations.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>02.</span>
        <span>
          Commission or replicate a lightweight citation audit on a dozen theology queries in ChatGPT,
          Perplexity, and Google AI mode. Document domains, not vibes.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>03.</span>
        <span>
          If the 28×–500× model remains in GTM materials, attach a one-page methods appendix:
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
