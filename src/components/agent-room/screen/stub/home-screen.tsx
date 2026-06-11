"use client";

import styles from "../../ink-band.module.css";
import type { ScreenProps } from "./stub-screen";
import { LeaderBand } from "./leader-band";

/**
 * The opening/home screen (prototype `screens.js` `id==='home'`): the trust
 * headline, the body with the `#phrase` gesture target, and the leader portrait
 * band. The audience eyebrow lives in the mast (`docs/html/home`). Shown centered
 * with no margin rule (the `home` sheet class).
 */
export function HomeScreen({
  onLeaderSelect,
  disabled,
}: Pick<ScreenProps, "onLeaderSelect" | "disabled">) {
  return (
    <div>
      <h1>Navigate AI without eroding the trust you spent decades earning.</h1>
      <p className={styles.body}>
        We help mission-driven organizations respond to AI without losing{" "}
        <span id="phrase" className={styles.phrase}>
          <b>the trust their work depends on</b>
        </span>
        , through one ordered path: get safe, experiment, form
        your people, then build.
      </p>
      <LeaderBand onSelect={onLeaderSelect} disabled={disabled} />
    </div>
  );
}
