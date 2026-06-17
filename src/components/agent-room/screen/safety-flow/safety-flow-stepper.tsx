"use client";

import { safetyFlowStepperIndex, type SafetyFlowStep } from "@/lib/agent-room/data/safety-flow";
import styles from "../../ink-band.module.css";

const STEPPER_DOTS = 5;
const STEPPER_MAX_INDEX = 4;

export function SafetyFlowStepper({ step }: { step: SafetyFlowStep }) {
  const current = safetyFlowStepperIndex(step);
  return (
    <div
      className={styles.flowStepper}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={STEPPER_MAX_INDEX}
      aria-valuenow={current}
      aria-label="Safety flow progress"
    >
      {Array.from({ length: STEPPER_DOTS }).map((_, i) => (
        <span
          key={i}
          aria-hidden
          className={`${styles.flowStepDot} ${i < current ? styles.flowStepDone : ""} ${
            i === current ? styles.flowStepCur : ""
          }`}
        />
      ))}
    </div>
  );
}
