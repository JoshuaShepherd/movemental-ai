"use client";

import styles from "../../ink-band.module.css";
import type { ScreenProps } from "./stub-screen";
import { Crumb, Way } from "./chrome";

const REFUSALS = [
  "We don’t negotiate the price. It’s the same for a 500-person church and a 50,000-member denomination.",
  "We don’t gate the methodology. The field guides are free, and any team can run the work itself.",
  "We don’t run hidden enterprise tiers. There is no number above what’s listed here.",
  "We don’t charge per seat. Pricing is by engagement, because per-seat rewards lock-in, not belonging.",
  "We don’t use urgency. No limited-time discounts, no “spots filling fast.”",
  "We don’t pay our network in logos. The movement leaders behind the path are paid through a real agreement, with royalties — available on request.",
];

/** The full pricing schedule (prototype `PRICING_HTML`). Byte-identical. */
export function PricingScreen({ onHome }: ScreenProps) {
  return (
    <div>
      <Crumb onHome={onHome} />
      <h1>Pricing.</h1>

      <div className={styles.sec}>
        <p className={styles.secLabel}>Safety</p>
        <div className={styles.ways}>
          <Way title="SafeGuide" price="FREE · 1–2 MONTHS">
            The 33-page field guide, <em>It Starts With Safety</em>. Your team drafts the
            AI Guidebook — five layers, seven artifacts.
          </Way>
          <Way title="SafeStart" price="$1,000 · TWO WEEKS" paid>
            We draft the Guidebook customized to you; your team revises and ratifies in
            the dashboard. Same five layers, seven artifacts.
          </Way>
        </div>
      </div>

      <div className={styles.sec}>
        <p className={styles.secLabel}>Sandbox</p>
        <div className={styles.ways}>
          <Way title="SandboxGuide" price="FREE · SELF-PACED">
            The 48-page field guide, <em>It Continues With Exploration</em>. Your team
            runs the eight phases on its own.
          </Way>
          <Way title="SandboxLive" price="$15,000 · 4–6 WEEKS" paid>
            About ten hours of in-person teaching across the eight phases, an LMS, a
            custom AI recipe library, and dashboard integration. Produces a Future Plan
            with green / yellow / red-light use cases.
          </Way>
        </div>
      </div>

      <div className={styles.sec}>
        <p className={styles.secLabel}>Training &amp; Tech</p>
        <div className={styles.ways}>
          <Way title="Training" price="$15,000 + $5,000/YR" paid>
            An eight-week formation cohort building three capacities — discernment,
            authorship, stewardship — in the people who will steward AI inside your
            organization. Cohort-only, by design.
          </Way>
          <Way title="Tech" price="FROM $30,000 · SCOPED" paid>
            Scoped AI deployment across six configurations, from tool optimization to
            network-scale work for institutions and denominations.
          </Way>
        </div>
        <p className={styles.honest}>
          Field guides for Training and Tech are still being written. Until then those
          stages are facilitated only — and we’ll say so plainly rather than pretend
          otherwise.
        </p>
      </div>

      <div className={styles.sec}>
        <p className={styles.secLabel}>What this pricing refuses</p>
        {REFUSALS.map((line) => (
          <p key={line} className={styles.refuse}>
            {line}
          </p>
        ))}
      </div>

      <div className={styles.sec}>
        <p className={styles.secLabel}>If the price isn’t walkable</p>
        <p className={styles.body} style={{ marginTop: "0.2rem" }}>
          The same price for everyone means it isn’t walkable for every organization — a
          90-person church on a $180k budget, a seminary in a non-USD economy. We treat
          that as a real problem, not a marketing one. If that’s you, write to us before
          you rule anything out; we work access out case by case.
        </p>
      </div>

      <div className={styles.sec}>
        <p className={styles.secLabel}>Terms</p>
        <p className={styles.body} style={{ marginTop: "0.2rem" }}>
          Engagements are paid in two halves — 50% to begin, 50% on completion, Net 15
          each. Check, ACH, or card.
        </p>
      </div>

      <p className={styles.honest}>
        Questions about any of this? Get in touch — or map where you stand, and we’ll
        know exactly what to talk about.
      </p>
    </div>
  );
}
