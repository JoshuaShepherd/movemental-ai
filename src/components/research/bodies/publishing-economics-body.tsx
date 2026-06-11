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
      Movemental&rsquo;s economic story has three layers that are easy to collapse into one slogan:{" "}
      <strong>traditional publishing is extractive</strong>,{" "}
      <strong>platforms rent you back your audience</strong>, and{" "}
      <strong>90/10 plus a $1,000 launch</strong> fixes the injustice. Each layer contains something
      true — and at least one layer that currently{" "}
      <strong>misstates how money moves</strong> in the best-documented parts of the digital stack.
      This article separates <strong>cash economics</strong> (fees, royalties, processing) from{" "}
      <strong>power economics</strong> (who owns the customer relationship, who controls
      distribution, who bears risk) so you can say what is strongest without overclaiming.
    </p>

    <h3 id="section-publisher-ninety">What &ldquo;the publisher takes 90%&rdquo; actually means</h3>

    <p>
      In trade nonfiction, it is normal for print royalties to sit in a band that{" "}
      <strong>sounds</strong> like &ldquo;the author gets a single-digit or low-double-digit slice of
      the cover price&rdquo;: commonly cited ranges include roughly <strong>10–15% of list</strong> for
      hardcovers and lower percentages for many paperbacks, with{" "}
      <strong>ebooks often contracted as a percent of the publisher&rsquo;s net receipts</strong>{" "}
      (frequently cited around <strong>25% of net</strong> in industry explainers). None of that is
      the same sentence as &ldquo;the publisher keeps ninety cents of every dollar as profit.&rdquo;
    </p>

    <p>
      Between cover price and author royalty sits a long list of <strong>non-negotiables</strong>:
      retailer margin, returns, printing and binding, freight, marketing spend, overhead, and the
      publisher&rsquo;s risk on inventory and advances. Economists and publishing professionals argue
      about margins and market power, but serious critique distinguishes{" "}
      <strong>rent extraction</strong> from <strong>costly intermediation</strong>. If
      Movemental&rsquo;s public argument implies publishers{" "}
      <strong>bank ninety percent of list as operating income</strong>, skeptical readers will
      correctly push back. If the argument is that{" "}
      <strong>authors routinely realize a small fraction of consumer spend as personal cash</strong>,
      that is easier to defend — and it aligns with what large-scale surveys actually measure.
    </p>

    <p>
      The Authors Guild&rsquo;s <strong>2023 Author Income Survey</strong> (income year{" "}
      <strong>2022</strong>, <strong>5,699</strong> published authors){" "}
      <Cite n={19} title="Authors Guild · 2023 · n=5,699" /> is the cleanest U.S. snapshot for
      &ldquo;are book royalties a living?&rdquo; It reports a{" "}
      <strong>median book income of $10,000</strong> for full-time authors, and{" "}
      <strong>$20,000</strong> median for all author-related work combined (editing, teaching,
      speaking, journalism, and so on). For full-time authors in commercial markets (excluding
      academic and educational books), medians rise to <strong>$15,000</strong> from books and{" "}
      <strong>$25,000</strong> total. For the whole sample including part-time writers, median book
      income is <strong>$2,000</strong>. The Guild&rsquo;s own summary states that{" "}
      <strong>half of full-time authors</strong> remain below minimum wage in many states when{" "}
      <strong>all</strong> writing-related work is counted — and far below that when{" "}
      <strong>only books</strong> are counted.
    </p>

    <p>
      That is not a niche complaint. It is evidence for a proposition Movemental can own without
      exaggeration:{" "}
      <strong>
        book publishing, as experienced by most working authors, is financially thin for the writer
      </strong>
      , even when the writer is &ldquo;successful&rdquo; by craft standards. It also explains why{" "}
      <strong>speaking, consulting, and institutional roles</strong> dominate the income mix for many
      thought leaders — a pattern your messaging already names for movement-adjacent figures.
    </p>

    <p>
      What the Guild data does <strong>not</strong> prove by itself is a specific{" "}
      <strong>85–90% &ldquo;value capture&rdquo;</strong> numerator for traditional houses. Treat that
      band as a <strong>rhetorical compression</strong> unless you define numerator and denominator
      with a footnote.
    </p>

    <h3 id="section-digital-stack">The digital stack: fees are not secretly seventy percent</h3>

    <p>
      Here the internal copy needs a hard correction. Substack&rsquo;s own help documentation states
      that when paid subscriptions are enabled, Substack takes <strong>10%</strong> of each
      transaction, with additional <strong>Stripe</strong> processing charges (commonly cited as{" "}
      <strong>2.9% + $0.30</strong> per transaction plus a <strong>recurring billing</strong> component
      that Substack documents as <strong>0.7%</strong> for renewals as of <strong>July 2024</strong>,
      with transitional rules for older accounts){" "}
      <Cite n={20} title="Substack Support · fee documentation" />. In plain language, a typical web
      subscription leaves the creator with something in the <strong>mid-to-high eighties</strong>{" "}
      percent of gross <strong>before taxes</strong> — not &ldquo;15–30%.&rdquo;
    </p>

    <p>
      Patreon&rsquo;s fee structure is tiered and has been in flux for legacy versus new plans, but it
      is also <strong>not</strong> a seventy-eighty percent platform rake on the core membership
      product. Newer standard plans discussed in Patreon&rsquo;s 2025-era help materials center on a{" "}
      <strong>10%</strong> platform fee for many new pages, with processing and platform-adjacent
      charges on top — again, a different world from the &ldquo;creators keep 15–30%&rdquo; sentence
      that appears in Movemental&rsquo;s consolidated messaging.
    </p>

    <p>
      So where could a <strong>70–85% &ldquo;extraction&rdquo;</strong> figure come from? Only by{" "}
      <strong>redefining extraction</strong> to include things that are real but not
      payment-processor line items: <strong>Apple&rsquo;s in-app purchase commissions</strong> on mobile
      conversions, <strong>algorithmic dependence</strong>, <strong>brand dilution</strong>,{" "}
      <strong>non-portable audience graphs</strong>, and <strong>opportunity cost</strong>. Those are
      legitimate strategic concerns for a movement leader — they are just{" "}
      <strong>not the same claim</strong> as &ldquo;the platform keeps eighty cents.&rdquo; Mixing the
      two undermines trust with anyone who has ever read a Stripe dashboard.
    </p>

    <p>
      Course platforms muddy comparisons further. On many paid tiers, <strong>Kajabi</strong> and{" "}
      <strong>Thinkific</strong> emphasize <strong>zero percent platform transaction fees</strong>,
      meaning the creator&rsquo;s marginal burden is mostly <strong>payment processing</strong> plus
      the <strong>monthly SaaS bill</strong>. Teachable mixes{" "}
      <strong>percent fees on entry plans</strong> with <strong>zero percent on higher tiers</strong>{" "}
      (details change; cite the live pricing page before printing a table in marketing). Comparing
      Movemental&rsquo;s <strong>percent of gross platform revenue</strong> to a{" "}
      <strong>flat SaaS + processing</strong> stack is a category error unless you translate both
      into <strong>total cost of ownership</strong> for a given revenue level.
    </p>

    <h3 id="section-false-choice">Where the &ldquo;false choice&rdquo; framing still lands</h3>

    <p>
      Even after fixing the fee math, the <strong>C-P03</strong> intuition survives: many leaders
      experience <strong>prestige without cash</strong> in traditional channels, and{" "}
      <strong>cash without sovereignty</strong> in large platforms — not because Stripe secretly eats
      seventy percent, but because <strong>the system that scales is rarely the system that belongs to
      them</strong>.
    </p>

    <p>
      Traditional deals can bundle <strong>prestige, editing, distribution, and risk absorption</strong>{" "}
      — valuable services — with <strong>slow timelines</strong>, <strong>limited control</strong>, and{" "}
      <strong>weak direct reader relationships</strong> relative to email-first or community-first
      models. Rental platforms bundle <strong>distribution and payments</strong> with{" "}
      <strong>terms of service, discovery logic, and account risk</strong>. Custom builds bundle{" "}
      <strong>control</strong> with <strong>capital expense and maintenance</strong>.
      Movemental&rsquo;s honest wedge is not &ldquo;Substack mathematically keeps eighty-five
      percent,&rdquo; but &ldquo;
      <strong>we are designing for a different bundle</strong>: ownership, movement-specific workflows,
      and network-shaped distribution.&rdquo; That is a <strong>product thesis</strong>, not a
      fee-schedule dunk.
    </p>

    <h3 id="section-stress-test">Stress-testing 90/10 against alternatives</h3>

    <p>
      <strong>Against traditional publishing:</strong> 90/10 is not a substitute for an
      advance-and-royalty deal; it is a <strong>different product</strong> (owned site, courses,
      agents, community, etc.). The comparison is meaningful only when the leader&rsquo;s
      monetization is <strong>actually migrating</strong> to on-platform SKUs.
    </p>

    <p>
      <strong>Against Substack-style newsletters:</strong> If both Movemental and Substack charge{" "}
      <strong>10% of GMV</strong> at the headline layer, Movemental&rsquo;s differentiation must be{" "}
      <strong>what the ten percent buys</strong> (integrated site, curriculum tooling, AI workflows,
      denominational or network distribution, support SLAs). Otherwise a spreadsheet-minded creator
      will stay on Substack plus a cheap website.
    </p>

    <p>
      <strong>Against course SaaS:</strong> At moderate revenue, a <strong>$150–400/month</strong> tool
      stack plus <strong>2.9% processing</strong> can under-run <strong>10% of GMV</strong> — or
      over-run it — depending on scale. Movemental needs a <strong>breakeven narrative</strong> (&ldquo;above
      $X ARR, we win on TCO&rdquo;) grounded in assumptions you are willing to publish.
    </p>

    <p>
      <strong>Unit economics sketch:</strong> If <strong>one hundred</strong> leaders each drive{" "}
      <strong>$200,000</strong> in annual gross through Movemental rails and the platform keeps{" "}
      <strong>10%</strong>, that is <strong>$2,000,000</strong> a year in platform share before costs
      — a toy model, but it shows why the business cares about <strong>ARPU</strong> and{" "}
      <strong>payment mix</strong>, not vibes.
    </p>

    <h3 id="section-scenario-band">The $140K–$380K band: treat it as a scenario, not a statistic</h3>

    <p>
      Your research prompt ties this figure to <strong>business-042</strong>, but in the consolidated
      strategy file that ID is <strong>invitation-only GTM</strong> — unrelated. The{" "}
      <strong>$140K–$380K</strong> language actually lives in movement-leader research dossiers and
      related messaging about <strong>under-monetized digital surface area</strong> (courses,
      audiobooks, newsletter tier, YouTube centralization, premium assessments).
    </p>

    <p>
      That estimate is best read as a <strong>portfolio of upside levers</strong>, not a peer-reviewed
      forecast. Before using it in outward-facing claims, publish the implied{" "}
      <strong>conversion paths</strong> (for example: paid seats per cohort at plausible price points,
      audiobook attach rates, newsletter paid conversion from documented list sizes). Without that, a
      critic will fairly label it <strong>consulting fiction</strong>.
    </p>

    <h3 id="section-creator-inequality">Creator income inequality and &ldquo;subscription fatigue&rdquo;</h3>

    <p>
      Industry reports (ConvertKit&rsquo;s <strong>State of the Creator Economy</strong>, Linktree and
      SignalFire summaries, etc.) repeatedly document <strong>power-law earnings</strong>: a thin top
      tier captures outsized revenue; the median creator is modest. Pull{" "}
      <strong>exact medians and methodology</strong> from the primary PDFs before citing numbers —
      press releases round aggressively.
    </p>

    <p>
      On the demand side, consumers now juggle many recurring media bills. Pew&rsquo;s 2025 reporting on
      streaming uptake{" "}
      <Cite n={21} title="Pew · 2025 · streaming subscriptions" /> is a sober reminder that{" "}
      <strong>attention and wallet share are contested</strong> even when creator tools are cheap. That
      does not kill subscriptions; it means <strong>conversion and retention</strong> must be modeled
      conservatively for religious and nonprofit-adjacent audiences.
    </p>

    <h3 id="section-recommendations">Recommendations for public argumentation</h3>

    <p>
      <strong>Strengthen without overclaiming</strong>
    </p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Lead with <strong>Authors Guild medians</strong> and the{" "}
          <strong>diversified income reality</strong> for full-time writers — that is your most
          defensible &ldquo;structural underpayment&rdquo; evidence.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Separate <strong>royalty rate</strong> language from <strong>profit share</strong> language
          when discussing traditional publishing.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Reframe platform critique around{" "}
          <strong>ownership, portability, mission-fit workflows, and discovery risk</strong>, reserving
          fee tables for <strong>accurate apples-to-apples</strong> comparisons.
        </span>
      </li>
    </ul>

    <p>
      <strong>Correct before wide use</strong>
    </p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Replace any statement that Substack or Patreon leaves creators only{" "}
          <strong>15–30%</strong> of subscription revenue with numbers consistent with{" "}
          <strong>official fee documentation</strong>, or reword as a non-cash theory of &ldquo;captured
          value.&rdquo;
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Fix the <strong>business-042 / $140K–$380K</strong> cross-reference in the prompt and any
          index that inherited it.
        </span>
      </li>
    </ul>

    <p>
      <strong>Fill data gaps</strong>
    </p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Add <strong>agency or Clutch-distributed quotes</strong> if you will keep the{" "}
          <strong>$50K–$150K custom dev</strong> anchor.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Model the <strong>$140K–$380K</strong> band as a <strong>sensitivity table</strong> or
          downgrade to qualitative upside.
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Optional: a short <strong>cooperative / platform-co-op</strong> appendix for audiences who
          ask for historical precedent.
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
