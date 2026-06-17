"use client";

import { ArrowRight } from "lucide-react";

import {
  SAFETY_FLOW_RESULT_COPY,
  type SafetyFlowAnswer,
} from "@/lib/agent-room/data/safety-flow";
import styles from "../../ink-band.module.css";
import { SafetyFlowBack } from "./safety-flow-back";
import { SafetyFlowPathRail } from "./safety-flow-path-rail";

export function SafetyFlowResult({
  answer,
  onNext,
  onBack,
  disabled,
}: {
  answer: SafetyFlowAnswer;
  onNext: () => void;
  onBack: () => void;
  disabled?: boolean;
}) {
  const copy = SAFETY_FLOW_RESULT_COPY[answer === "draft" ? "draft" : "start"];

  return (
    <div className={styles.flowStep}>
      <p className={`${styles.eyebrow} ${styles.flowEyebrowCenter}`}>Where you stand</p>
      <h1 className={`${styles.q} ${styles.flowTitleCenter}`}>{copy.title}</h1>
      <p className={`${styles.sub} ${styles.flowSubCenter}`}>{copy.sub}</p>
      <SafetyFlowPathRail hereStage="safety" />
      <p className={`${styles.sub} ${styles.flowBodyCenter}`}>{copy.body}</p>
      <div className={styles.flowCenter}>
        <button type="button" className={styles.flowBtn} disabled={disabled} onClick={onNext}>
          What&apos;s my next step?
          <ArrowRight className={styles.flowBtnIcon} strokeWidth={1.75} aria-hidden />
        </button>
      </div>
      <SafetyFlowBack onClick={onBack}>back</SafetyFlowBack>
    </div>
  );
}
