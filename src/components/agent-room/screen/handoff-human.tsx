import type { HandoffHumanProps } from "@/lib/agent-room/component-props";
import styles from "../ink-band.module.css";

/**
 * The honesty rail's landing place: when a request is outside the domain, the
 * agent shows this instead of bluffing — a real person to talk to.
 */
export function HandoffHuman({ props }: { props: HandoffHumanProps }) {
  return (
    <div className={styles.stageIn}>
      <p className={styles.eyebrow}>A person can help</p>
      <div className={styles.handoff}>
        <p className={styles.sub} style={{ marginBottom: 0 }}>
          {props.reason ??
            "That’s outside what this room can speak to honestly. I won’t bluff at the edges — that would undercut the whole point. For anything beyond where your organization stands with AI, a real person will help."}
        </p>
        <a className={styles.email} href={`mailto:${props.email}`}>
          {props.email}
        </a>
      </div>
    </div>
  );
}
