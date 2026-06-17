"use client";

import { SAFETY_FLOW_QUESTION, type SafetyFlowAnswer } from "@/lib/agent-room/data/safety-flow";
import styles from "../../ink-band.module.css";

const GROUP_NAME = "safety-flow-answer";

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
      <fieldset className={styles.flowFieldset} disabled={disabled}>
        <legend className="sr-only">{SAFETY_FLOW_QUESTION.title}</legend>
        <div className={`${styles.opts} ${styles.flowOptsCenter}`}>
          {SAFETY_FLOW_QUESTION.options.map((opt) => (
            <label key={opt.label} className={`${styles.opt} ${styles.flowOpt}`}>
              <input
                type="radio"
                className="sr-only"
                name={GROUP_NAME}
                value={opt.answer}
                disabled={disabled}
                onChange={() => onAnswer(opt.answer)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <p className={`${styles.sub} ${styles.flowFootnote}`}>{SAFETY_FLOW_QUESTION.footnote}</p>
    </div>
  );
}
