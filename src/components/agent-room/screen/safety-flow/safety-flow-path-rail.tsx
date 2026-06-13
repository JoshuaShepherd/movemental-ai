"use client";

import { SAFETY_FLOW_PATH_STAGES } from "@/lib/agent-room/data/safety-flow";
import styles from "../../ink-band.module.css";

type Props = {
  hereStage: "safety" | "sandbox";
  doneStage?: "safety";
};

/** Horizontal four-stage path rail for the safety flow result screens. */
export function SafetyFlowPathRail({ hereStage, doneStage }: Props) {
  return (
    <div className={styles.flowRail} role="list" aria-label="Four-stage path">
      {SAFETY_FLOW_PATH_STAGES.map((stage) => {
        const stageKey =
          stage.n === "01" ? "safety" : stage.n === "02" ? "sandbox" : stage.n === "03" ? "training" : "tech";
        const here = stageKey === hereStage;
        const done = doneStage === "safety" && stageKey === "safety";
        return (
          <div
            key={stage.n}
            role="listitem"
            className={`${styles.flowChip} ${here ? styles.flowChipHere : ""} ${done ? styles.flowChipDone : ""}`}
          >
            <span className={styles.flowChipNum}>{stage.n}</span>
            <span className={styles.flowChipName}>{stage.title}</span>
            {here ? <span className={styles.flowChipTag}>You are here</span> : null}
            {done ? <span className={`${styles.flowChipTag} ${styles.flowChipDoneTag}`}>Done</span> : null}
          </div>
        );
      })}
    </div>
  );
}
