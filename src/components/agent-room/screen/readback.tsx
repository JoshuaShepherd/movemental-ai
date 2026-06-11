import type { ReadbackProps } from "@/lib/agent-room/component-props";
import styles from "../ink-band.module.css";
import { Emphasis } from "./emphasis";

const STAGES = ["Safety", "Sandbox", "Training", "Technology"];

/**
 * The diagnostician's read-back: where the organization stands on the four-stage
 * path, prose composed for THIS org, and the honest next-step fork. Never a
 * score. Fork buttons route back through the agent as user turns.
 */
export function Readback({
  props,
  onSay,
  disabled,
}: {
  props: ReadbackProps;
  onSay: (text: string) => void;
  disabled?: boolean;
}) {
  const { hereStageIndex, prose, fork, handoffNote } = props;
  const here = Math.min(Math.max(hereStageIndex, 0), STAGES.length - 1);
  return (
    <div className={styles.stageIn}>
      <p className={styles.thinking} style={{ marginBottom: "1.25rem" }}>
        Your read-back
      </p>
      <div className={styles.rbMap}>
        {STAGES.map((stage, i) => (
          <span key={stage} style={{ display: "inline-flex", alignItems: "flex-start" }}>
            <span className={`${styles.rbStage} ${i === here ? styles.here : ""}`}>
              <span className={styles.n}>0{i + 1}</span>
              {stage}
              {i === here ? <span className={styles.rbHere}>you are here</span> : null}
            </span>
            {i < STAGES.length - 1 ? <span className={styles.rbAw}>&rarr;</span> : null}
          </span>
        ))}
      </div>

      <p className={styles.say}>
        <Emphasis text={prose.lead} />
      </p>
      {prose.body.map((para, i) => (
        <p key={i} className={styles.sub}>
          <Emphasis text={para} />
        </p>
      ))}

      {handoffNote ? <p className={styles.rbHandoff}>{handoffNote}</p> : null}

      <div className={styles.fork}>
        {fork.map((f) => (
          <button
            key={f.label}
            type="button"
            className={`${styles.forkBtn} ${f.paid ? styles.paid : ""}`}
            disabled={disabled}
            onClick={() => onSay(f.label)}
          >
            <span className={styles.fLabel}>{f.label}</span>
            <span className={styles.fSub}>{f.sub}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
