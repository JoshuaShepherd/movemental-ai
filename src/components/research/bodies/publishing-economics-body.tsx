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

/** Analysis — ported from `docs/articles/graded-high/85-99/03-publishing-economics.md`. */
export const publishingEconomicsBody: ReactNode = (
  <>
    <p className={styles.dropCap}>
      Movemental&rsquo;s economic story has three layers that are easy to collapse into one slogan:
      traditional publishing is extractive, platforms rent you back your audience, and 90/10 plus a
      $1,000 launch fixes the injustice. Each layer contains something true, and at least one layer that
      currently misstates how money moves in the best-documented parts of the digital stack. This
      article separates cash economics (fees, royalties, processing) from power economics (who owns the
      customer relationship, who controls distribution, who bears risk) so you can say what is strongest
      without overclaiming.
    </p>

    <h3 id="section-publisher-ninety">What &ldquo;the publisher takes 90%&rdquo; actually means</h3>

    <p>
      In trade nonfiction, it is normal for print royalties to sit in a band that sounds like &ldquo;the
      author gets a single-digit or low-double-digit slice of the cover price&rdquo;: commonly cited
      ranges include roughly 10–15% of list for hardcovers and lower percentages for many paperbacks,
      with ebooks often contracted as a percent of the publisher&rsquo;s net receipts (frequently cited
      around 25% of net in industry explainers). None of that is the same sentence as &ldquo;the
      publisher keeps ninety cents of every dollar as profit.&rdquo;
    </p>

    <p>
      Between cover price and author royalty sits a long list of non-negotiables: retailer margin,
      returns, printing and binding, freight, marketing spend, overhead, and the publisher&rsquo;s risk
      on inventory and advances. Economists and publishing professionals argue about margins and market
      power, but serious critique distinguishes rent extraction from costly intermediation. If
      Movemental&rsquo;s public argument implies publishers bank ninety percent of list as operating
      income, skeptical readers will correctly push back. If the argument is that authors routinely
      realize a small fraction of consumer spend as personal cash, that is easier to defend, and it
      aligns with what large-scale surveys actually measure.
    </p>

    <p>
      The Authors Guild&rsquo;s 2023 Author Income Survey (income year 2022, 5,699 published authors){" "}
      <Cite n={19} title="Authors Guild · 2023 · n=5,699" /> is the cleanest U.S. snapshot for
      &ldquo;are book royalties a living?&rdquo; It reports a median book income of $10,000 for
      full-time authors, and $20,000 median for all author-related work combined (editing, teaching,
      speaking, journalism, and so on). For full-time authors in commercial markets (excluding academic
      and educational books), medians rise to $15,000 from books and $25,000 total. For the whole sample
      including part-time writers, median book income is $2,000. The Guild&rsquo;s own summary states
      that half of full-time authors remain below minimum wage in many states when all writing-related
      work is counted, and far below that when only books are counted.
    </p>

    <p>
      That is not a niche complaint. It is evidence for a proposition Movemental can own without
      exaggeration: book publishing, as experienced by most working authors, is financially thin for
      the writer, even when the writer is &ldquo;successful&rdquo; by craft standards. It also explains
      why speaking, consulting, and institutional roles dominate the income mix for many thought
      leaders, a pattern your messaging already names for movement-adjacent figures.
    </p>

    <p>
      What the Guild data does not prove by itself is a specific 85–90% &ldquo;value capture&rdquo;
      numerator for traditional houses. Treat that band as rhetorical compression unless you define
      numerator and denominator with a footnote.
    </p>

    <h3 id="section-digital-stack">The digital stack: fees are not secretly seventy percent</h3>

    <p>
      Here the internal copy needs a hard correction. Substack&rsquo;s own help documentation states that
      when paid subscriptions are enabled, Substack takes 10% of each transaction, with additional
      Stripe processing charges (commonly cited as 2.9% + $0.30 per transaction plus a recurring billing
      component that Substack documents as 0.7% for renewals as of July 2024, with transitional rules for
      older accounts) <Cite n={20} title="Substack Support · fee documentation" />. In plain language, a
      typical web subscription leaves the creator with something in the mid-to-high eighties percent of
      gross before taxes, not &ldquo;15–30%.&rdquo;
    </p>

    <p>
      Patreon&rsquo;s fee structure is tiered and has been in flux for legacy versus new plans, but it is
      also not a seventy-eighty percent platform rake on the core membership product. Newer standard plans
      discussed in Patreon&rsquo;s 2025-era help materials center on a 10% platform fee for many new
      pages, with processing and platform-adjacent charges on top. Again, a different world from the
      &ldquo;creators keep 15–30%&rdquo; sentence that appears in Movemental&rsquo;s consolidated
      messaging.
    </p>

    <p>
      So where could a 70–85% &ldquo;extraction&rdquo; figure come from? Only by redefining extraction
      to include things that are real but not payment-processor line items: Apple&rsquo;s in-app purchase
      commissions on mobile conversions, algorithmic dependence, brand dilution, non-portable audience
      graphs, and opportunity cost. Those are legitimate strategic concerns for a movement leader. They
      are just not the same claim as &ldquo;the platform keeps eighty cents.&rdquo; Mixing the two
      undermines trust with anyone who has ever read a Stripe dashboard.
    </p>

    <p>
      Course platforms muddy comparisons further. On many paid tiers, Kajabi and Thinkific emphasize zero
      percent platform transaction fees, meaning the creator&rsquo;s marginal burden is mostly payment
      processing plus the monthly SaaS bill. Teachable mixes percent fees on entry plans with zero
      percent on higher tiers (details change; cite the live pricing page before printing a table in
      marketing). Comparing Movemental&rsquo;s percent of gross platform revenue to a flat SaaS plus
      processing stack is a category error unless you translate both into total cost of ownership for a
      given revenue level.
    </p>

    <h3 id="section-false-choice">Where the &ldquo;false choice&rdquo; framing still lands</h3>

    <p>
      Even after fixing the fee math, the core intuition survives: many leaders experience prestige
      without cash in traditional channels, and cash without sovereignty in large platforms. Not because
      Stripe secretly eats seventy percent, but because the system that grows is rarely the system that
      belongs to them.
    </p>

    <p>
      Traditional deals can bundle prestige, editing, distribution, and risk absorption (valuable
      services) with slow timelines, limited control, and weak direct reader relationships relative to
      email-first or community-first models. Rental platforms bundle distribution and payments with terms
      of service, discovery logic, and account risk. Custom builds bundle control with capital expense
      and maintenance. Movemental&rsquo;s honest wedge is not &ldquo;Substack mathematically keeps
      eighty-five percent,&rdquo; but &ldquo;we are designing for a different bundle: ownership,
      movement-specific workflows, and network-shaped distribution.&rdquo; That is a product thesis,
      not a fee-schedule dunk.
    </p>

    <h3 id="section-stress-test">Stress-testing 90/10 against alternatives</h3>

    <p>
      Against traditional publishing: 90/10 is not a substitute for an advance-and-royalty deal; it is a
      different product (owned site, courses, agents, community, etc.). The comparison is meaningful only
      when the leader&rsquo;s monetization is actually migrating to on-platform SKUs.
    </p>

    <p>
      Against Substack-style newsletters: If both Movemental and Substack charge 10% of GMV at the
      headline layer, Movemental&rsquo;s differentiation must be what the ten percent buys (integrated
      site, curriculum tooling, AI workflows, denominational or network distribution, support SLAs).
      Otherwise a spreadsheet-minded creator will stay on Substack plus a cheap website.
    </p>

    <p>
      Against course SaaS: At moderate revenue, a $150–400/month tool stack plus 2.9% processing can
      under-run 10% of GMV, or over-run it, depending on scale. Movemental needs a breakeven narrative
      (&ldquo;above $X ARR, we win on TCO&rdquo;) grounded in assumptions you are willing to publish.
    </p>

    <p>
      Unit economics sketch: If one hundred leaders each drive $200,000 in annual gross through
      Movemental rails and the platform keeps 10%, that is $2,000,000 a year in platform share before
      costs. A toy model, but it shows why the business cares about ARPU and payment mix, not vibes.
    </p>

    <h3 id="section-scenario-band">The $140K–$380K band: treat it as a scenario, not a statistic</h3>

    <p>
      Movemental messaging and movement-leader research dossiers sometimes cite a $140K–$380K range for
      under-monetized digital presence: courses, audiobooks, newsletter tiers, YouTube
      centralization, premium assessments. That estimate is best read as a portfolio of upside levers,
      not a peer-reviewed forecast.
    </p>

    <p>
      Before using it in outward-facing claims, publish the implied conversion paths (for example: paid
      seats per cohort at plausible price points, audiobook attach rates, newsletter paid conversion from
      documented list sizes). Without that, a critic will fairly label it consulting fiction.
    </p>

    <h3 id="section-creator-inequality">Creator income inequality and &ldquo;subscription fatigue&rdquo;</h3>

    <p>
      Industry reports (ConvertKit&rsquo;s State of the Creator Economy, Linktree and SignalFire
      summaries, etc.) repeatedly document power-law earnings: a thin top tier captures outsized revenue;
      the median creator is modest. Pull exact medians and methodology from the primary PDFs before
      citing numbers. Press releases round aggressively.
    </p>

    <p>
      On the demand side, consumers now juggle many recurring media bills. Pew&rsquo;s 2025 reporting on
      streaming uptake <Cite n={21} title="Pew · 2025 · streaming subscriptions" /> is a sober reminder
      that attention and wallet share are contested even when creator tools are cheap. That does not kill
      subscriptions; it means conversion and retention must be modeled conservatively for religious and
      nonprofit-adjacent audiences.
    </p>

    <h3 id="section-recommendations">Recommendations for public argumentation</h3>

    <p>Strengthen without overclaiming</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Lead with Authors Guild medians and the diversified income reality for full-time writers. That
          is your most defensible &ldquo;structural underpayment&rdquo; evidence.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Separate royalty rate language from profit share language when discussing traditional
          publishing.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Reframe platform critique around ownership, portability, mission-fit workflows, and discovery
          risk, reserving fee tables for accurate apples-to-apples comparisons.
        </span>
      </li>
    </ul>

    <p>Correct before wide use</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Replace any statement that Substack or Patreon leaves creators only 15–30% of subscription
          revenue with numbers consistent with official fee documentation, or reword as a non-cash
          theory of &ldquo;captured value.&rdquo;
        </span>
      </li>
    </ul>

    <p>Fill data gaps</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Add agency or Clutch-distributed quotes if you will keep the $50K–$150K custom dev anchor.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Model the $140K–$380K band as a sensitivity table or downgrade to qualitative upside.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Optional: a short cooperative / platform-co-op appendix for audiences who ask for historical
          precedent.
        </span>
      </li>
    </ul>

    <h3 id="section-references">Sources (selected)</h3>
    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          The Authors Guild, &ldquo;Key Takeaways from the Authors Guild&rsquo;s 2023 Author Income
          Survey,&rdquo; September 27, 2023.{" "}
          <Ext href="https://authorsguild.org/news/key-takeaways-from-2023-author-income-survey">
            authorsguild.org
          </Ext>
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Substack, Inc., &ldquo;How much does Substack cost?&rdquo; Substack Support.{" "}
          <Ext href="https://support.substack.com/hc/en-us/articles/360037607131-How-much-does-Substack-cost">
            support.substack.com
          </Ext>
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Pew Research Center, &ldquo;83% of U.S. adults use streaming services, far fewer subscribe to
          cable or satellite TV,&rdquo; July 1, 2025.{" "}
          <Ext href="https://www.pewresearch.org/short-reads/2025/07/01/83-of-us-adults-use-streaming-services-far-fewer-subscribe-to-cable-or-satellite-tv/">
            pewresearch.org
          </Ext>
        </span>
      </li>
    </ul>
  </>
);
