import type { ReadbackProps } from "@/lib/agent-room/component-props";
import styles from "../ink-band.module.css";
import { Emphasis } from "./emphasis";
import { ReadbackPathSpine } from "./readback-path-spine";

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
  const here = Math.min(Math.max(hereStageIndex, 0), 3);

  return (
    <div className={styles.stageIn}>
      <p className={styles.thinking} style={{ marginBottom: "1.25rem" }}>
        Your read-back
      </p>

      <ReadbackPathSpine hereStageIndex={here} />

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
