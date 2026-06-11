"use client";

import { PATH_STAGE_LABELS } from "@/lib/agent-room/naming";

import styles from "../../ink-band.module.css";
import type { ScreenProps } from "./stub-screen";
import { LeaderBand } from "./leader-band";

/**
 * The opening/home screen: the talk's cold open, young-adult stakes beneath it,
 * and the leader portrait band. `#phrase` is the single in-scene highlighter target.
 */
export function HomeScreen({
  onLeaderSelect,
  disabled,
}: Pick<ScreenProps, "onLeaderSelect" | "disabled">) {
  const pathLabels = [
    PATH_STAGE_LABELS.safety,
    PATH_STAGE_LABELS.sandbox,
    PATH_STAGE_LABELS.training,
    PATH_STAGE_LABELS.tech,
  ].join(" · ");

  return (
    <div>
      <h1>AI is already inside your organization.</h1>
      <p className={styles.body}>
        Right now, someone on your staff is using it — drafting an email, summarizing a
        meeting, or writing the first version of something that will go out under a real
        person&apos;s name. Nobody invited it. Nobody was trained to lead through it. It
        simply arrived.
      </p>
      <p className={styles.body}>
        And the people watching most closely are young adults. They are asking the machine
        the questions they used to ask a mentor — waiting to see whether you have anything
        true to say in this moment, or whether you&apos;ll answer with fear, or a shrug.
      </p>
      <p className={styles.body}>
        We help mission-driven organizations meet this moment without losing{" "}
        <span id="phrase" className={styles.hl}>
          the trust their work depends on
        </span>
        , through one ordered path: {pathLabels}.
      </p>
      <LeaderBand onSelect={onLeaderSelect} disabled={disabled} />
    </div>
  );
}
