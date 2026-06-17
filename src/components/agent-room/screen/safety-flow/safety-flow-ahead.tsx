"use client";

import { SAFETY_FLOW_AHEAD_COPY } from "@/lib/agent-room/data/safety-flow";
import styles from "../../ink-band.module.css";
import { SafetyFlowBack } from "./safety-flow-back";
import { SafetyFlowPathRail } from "./safety-flow-path-rail";

export function SafetyFlowAhead({
  onSandbox,
  onRevisitCharter,
  onBack,
  onRunScene,
  disabled,
}: {
  onSandbox?: () => void;
  onRevisitCharter: () => void;
  onBack: () => void;
  onRunScene?: (scene: string) => void;
  disabled?: boolean;
}) {
  const handleSandbox = () => {
    if (onRunScene) {
      onRunScene("toSandbox");
      return;
    }
    onSandbox?.();
  };

  return (
    <div className={styles.flowStep}>
      <p className={`${styles.eyebrow} ${styles.flowEyebrowCenter}`}>{SAFETY_FLOW_AHEAD_COPY.eyebrow}</p>
      <h1 className={`${styles.q} ${styles.flowTitleCenter}`}>{SAFETY_FLOW_AHEAD_COPY.title}</h1>
      <p className={`${styles.sub} ${styles.flowSubCenter}`}>{SAFETY_FLOW_AHEAD_COPY.sub}</p>
      <SafetyFlowPathRail hereStage="sandbox" doneStage="safety" />
      <p className={`${styles.sub} ${styles.flowBodyCenter}`}>{SAFETY_FLOW_AHEAD_COPY.body}</p>
      <div className={styles.flowCenter}>
        <button type="button" className={styles.flowBtn} disabled={disabled} onClick={handleSandbox}>
          Continue to Sandbox
        </button>
        <button type="button" className={`${styles.flowBtn} ${styles.flowBtnGhost}`} onClick={onRevisitCharter}>
          Revisit the Charter
        </button>
      </div>
      <SafetyFlowBack onClick={onBack}>back</SafetyFlowBack>
    </div>
  );
}
