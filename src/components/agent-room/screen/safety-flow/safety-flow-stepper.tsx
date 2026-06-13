"use client";

import { safetyFlowStepperIndex, type SafetyFlowStep } from "@/lib/agent-room/data/safety-flow";
import styles from "../../ink-band.module.css";

export function SafetyFlowStepper({ step }: { step: SafetyFlowStep }) {
  const current = safetyFlowStepperIndex(step);
  return (
    <div className={styles.flowStepper} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`${styles.flowStepDot} ${i < current ? styles.flowStepDone : ""} ${
            i === current ? styles.flowStepCur : ""
          }`}
        />
      ))}
    </div>
  );
}
