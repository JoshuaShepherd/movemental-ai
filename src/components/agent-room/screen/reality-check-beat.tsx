import type { RealityCheckBeatProps } from "@/lib/agent-room/component-props";
import styles from "../ink-band.module.css";
import { Emphasis } from "./emphasis";

/**
 * One reality-check beat: progress dots, the question, and tappable answer
 * chips. Each chip is a thing the visitor says — tapping it sends that option
 * back through the agent as the next user turn (the host records it and
 * advances).
 */
export function RealityCheckBeat({
  props,
  onSay,
  disabled,
}: {
  props: RealityCheckBeatProps;
  onSay: (text: string) => void;
  disabled?: boolean;
}) {
  const { question, options, progress } = props;
  const total = Math.max(progress.total, progress.step);
  return (
    <div className={`${styles.stageIn} ${styles.beatContent}`}>
      <div className={styles.beatProg}>
        {Array.from({ length: total }).map((_, i) => {
          const cls =
            i < progress.step - 1 ? styles.done : i === progress.step - 1 ? styles.on : "";
          return <span key={i} className={`${styles.d} ${cls}`} />;
        })}
      </div>
      {/* Ghost question index (proposal §3.6), parity with the stub beat. */}
      <span className={styles.beatGhost} aria-hidden="true">
        {String(progress.step).padStart(2, "0")}
      </span>
      <p className={styles.beatQ}>
        <Emphasis text={question} />
      </p>
      {/* `id="opts"` + `data-oi` mirror the stub beat so INT-04 gesture targets
          (the gesture allow-list points `arrow`→`#opts`, `circle`→`[data-oi="N"]`)
          resolve on the live beat too, not just in stub mode. */}
      <div className={styles.chips} id="opts">
        {options.map((opt, oi) => (
          <button
            key={opt}
            type="button"
            data-oi={oi}
            className={styles.sug}
            disabled={disabled}
            onClick={() => onSay(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
