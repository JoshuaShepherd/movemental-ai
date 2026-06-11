"use client";

import {
  SAFETY_DASHBOARD_COPY,
  type DashboardProseBlock,
} from "@/lib/agent-room/data/safety-dashboard";
import styles from "../../ink-band.module.css";
import type { ScreenProps } from "./stub-screen";

function ProseBlocks({ blocks }: { blocks: readonly DashboardProseBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (typeof block === "string") {
          return (
            <p key={i} className={styles.dashboardProseP}>
              {block}
            </p>
          );
        }
        return (
          <p key={i} className={styles.handNote}>
            {block.hand}
          </p>
        );
      })}
    </>
  );
}

/** Dashboard conversion — narrative sell for the managed Safety sprint (HTML mock-up screen 3). */
export function SafetyDashboardScreen(_props: ScreenProps) {
  return (
    <>
      <p className={styles.eyebrow}>{SAFETY_DASHBOARD_COPY.eyebrow}</p>
      <p className={styles.q}>{SAFETY_DASHBOARD_COPY.headline}</p>

      <div className={styles.dashboardProse}>
        <ProseBlocks blocks={SAFETY_DASHBOARD_COPY.open} />
      </div>

      <div className={styles.sec}>
        <p className={styles.secLabel}>{SAFETY_DASHBOARD_COPY.questionLabel}</p>
        <p className={`${styles.q} ${styles.qSm}`}>{SAFETY_DASHBOARD_COPY.solutionHeadline}</p>
        <div className={styles.dashboardProse}>
          <ProseBlocks blocks={SAFETY_DASHBOARD_COPY.solution} />
        </div>
      </div>

      <div className={styles.dashboardOutcome}>
        <p>{SAFETY_DASHBOARD_COPY.outcome}</p>
      </div>

      <div className={styles.sec}>
        <p className={styles.secLabel}>{SAFETY_DASHBOARD_COPY.stepsLabel}</p>
        <ol className={styles.dashboardSteps}>
          {SAFETY_DASHBOARD_COPY.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    </>
  );
}
