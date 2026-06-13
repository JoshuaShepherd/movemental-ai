"use client";

import { SAFETY_FLOW_FORK_CARDS, SAFETY_FLOW_FORK_COPY } from "@/lib/agent-room/data/safety-flow";
import type { SafetyFlowStep } from "@/lib/agent-room/data/safety-flow";
import styles from "../../ink-band.module.css";

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
      <div className={styles.flowFork}>
        {SAFETY_FLOW_FORK_CARDS.map((card) => (
          <article
            key={card.id}
            className={`${styles.flowForkCard} ${card.recommended ? styles.flowForkReco : ""}`}
          >
            <span className={styles.flowForkTag}>{card.tag}</span>
            <h3 className={styles.flowForkTitle}>{card.title}</h3>
            <p className={styles.flowForkPrice}>{card.price}</p>
            <p className={styles.flowForkBody}>{card.body}</p>
            <p className={styles.flowForkBest}>
              <b>Best when:</b> {card.bestWhen}
            </p>
            <button
              type="button"
              className={`${styles.flowBtn} ${card.recommended ? styles.flowBtnBlue : styles.flowBtnGhost}`}
              disabled={disabled}
              onClick={() => onSelect(card.step)}
            >
              {card.cta}
            </button>
          </article>
        ))}
      </div>
      <p className={styles.flowTuesday}>{SAFETY_FLOW_FORK_COPY.tuesday}</p>
      <button type="button" className={styles.flowBack} onClick={onBack}>
        ← back
      </button>
    </div>
  );
}
