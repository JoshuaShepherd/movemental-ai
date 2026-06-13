"use client";

import { SAFETY_FLOW_QUESTION, type SafetyFlowAnswer } from "@/lib/agent-room/data/safety-flow";
import styles from "../../ink-band.module.css";

export function SafetyFlowQuestion({
  disabled,
  onAnswer,
}: {
  disabled?: boolean;
  onAnswer: (answer: SafetyFlowAnswer) => void;
}) {
  return (
    <div className={styles.flowStep}>
      <p className={`${styles.eyebrow} ${styles.flowEyebrowCenter}`}>{SAFETY_FLOW_QUESTION.eyebrow}</p>
      <h1 className={`${styles.q} ${styles.flowTitleCenter}`}>{SAFETY_FLOW_QUESTION.title}</h1>
      <p className={`${styles.sub} ${styles.flowSubCenter}`}>{SAFETY_FLOW_QUESTION.sub}</p>
      <div className={`${styles.opts} ${styles.flowOptsCenter}`}>
        {SAFETY_FLOW_QUESTION.options.map((opt) => (
          <button
            key={opt.label}
            type="button"
            className={`${styles.opt} ${styles.flowOpt}`}
            disabled={disabled}
            onClick={() => onAnswer(opt.answer)}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <p className={`${styles.sub} ${styles.flowFootnote}`}>{SAFETY_FLOW_QUESTION.footnote}</p>
    </div>
  );
}
