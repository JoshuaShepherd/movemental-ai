"use client";

import { SAFETY_FLOW_FORK_CARDS, SAFETY_FLOW_FORK_COPY } from "@/lib/agent-room/data/safety-flow";
import type { SafetyFlowStep } from "@/lib/agent-room/data/safety-flow";
import styles from "../../ink-band.module.css";
import { SafetyFlowBack } from "./safety-flow-back";

export function SafetyFlowFork({
  onSelect,
  onBack,
  disabled,
}: {
  onSelect: (step: SafetyFlowStep) => void;
  onBack: () => void;
  disabled?: boolean;
}) {
  return (
    <div className={styles.flowStep}>
      <p className={`${styles.eyebrow} ${styles.flowEyebrowCenter}`}>{SAFETY_FLOW_FORK_COPY.eyebrow}</p>
      <h1 className={`${styles.q} ${styles.flowTitleCenter}`}>{SAFETY_FLOW_FORK_COPY.title}</h1>
      <p className={`${styles.sub} ${styles.flowSubCenter}`}>{SAFETY_FLOW_FORK_COPY.sub}</p>
      <div className={`${styles.ways} ${styles.waysPlans} ${styles.flowForkWays}`}>
        {SAFETY_FLOW_FORK_CARDS.map((card) => (
          <article
            key={card.id}
            className={`${styles.way} ${styles.wayPlan} ${card.recommended ? styles.wayLead : ""}`}
          >
            <span className={styles.wayBadge}>{card.tag}</span>
            <p className={styles.wayTagline}>{card.title}</p>
            <p className={styles.price}>{card.price}</p>
            <p className={styles.wayBody}>{card.body}</p>
            <p className={styles.flowForkBest}>
              <b>Best when:</b> {card.bestWhen}
            </p>
            <button
              type="button"
              className={`${styles.wayCtaBtn} ${card.recommended ? styles.wayCtaBtnPaid : ""}`}
              disabled={disabled}
              onClick={() => onSelect(card.step)}
            >
              {card.cta}
            </button>
          </article>
        ))}
      </div>
      <p className={styles.flowTuesday}>{SAFETY_FLOW_FORK_COPY.tuesday}</p>
      <SafetyFlowBack onClick={onBack}>back</SafetyFlowBack>
    </div>
  );
}
