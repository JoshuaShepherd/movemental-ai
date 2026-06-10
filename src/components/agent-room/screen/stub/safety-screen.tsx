"use client";

import Link from "next/link";

import styles from "../../ink-band.module.css";
import type { ScreenProps } from "./stub-screen";
import { Crumb, LayerRow, Way } from "./chrome";

/** Stage 01 · Safety (prototype `SAFETY_HTML`, with the prepended crumb). */
export function SafetyScreen({ onHome }: ScreenProps) {
  return (
    <div>
      <Crumb onHome={onHome} />
      <p className={styles.eyebrow}>Stage 01 · Safety</p>
      <h1>Decide what’s wise, before the tools.</h1>
      <p className={styles.body}>
        AI is already inside your organization, used in ways no one has decided are
        acceptable. Safety is how you respond to that, wisely, before anything else.
      </p>

      <div className={styles.sec}>
        <p className={styles.secLabel}>What it produces</p>
        <p className={styles.body} style={{ marginTop: "0.2rem" }}>
          One thing: your AI Guidebook. Five plain layers your board can ratify.
        </p>
        <div className={styles.layers}>
          <LayerRow n="01" title="Statement" g="what we believe about AI in our mission." />
          <LayerRow n="02" title="Policy" g="what we’ll do, and refuse to do." />
          <LayerRow n="03" title="Context" g="what’s actually true in our environment." />
          <LayerRow n="04" title="Rules" g="what governs AI use in specific areas." />
          <LayerRow n="05" title="Response Plans" g="what we do when something goes wrong." />
        </div>
      </div>

      <div className={styles.sec}>
        <p className={styles.secLabel}>Two ways in</p>
        <div className={styles.ways}>
          <Way title="On your own" price="FREE · 1–2 MONTHS">
            The field guide, <em>It Starts With Safety</em>. Your team drafts all five
            layers. Best if you have the time, alignment, and discipline to finish.
          </Way>
          <Way title="With us" price="$1,000 · TWO WEEKS" paid>
            We draft it customized to you; your team reviews and ratifies inside a
            private dashboard. Print-quality PDF and rollout materials included.
          </Way>
        </div>
        <p className={styles.honest}>
          We’re not trying to talk you out of the free route. Both produce the same
          ratified Guidebook.
        </p>
        <div className={styles.ways} style={{ marginTop: "0.75rem" }}>
          <Link href="/field-guide" className={styles.chip}>
            Get the free field guide →
          </Link>
          <Link href="/enroll" className={styles.chip}>
            Set up my dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
}
