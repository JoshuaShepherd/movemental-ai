"use client";

import styles from "../../ink-band.module.css";
import type { ScreenProps } from "./stub-screen";
import { LeaderBand } from "./leader-band";

/**
 * The opening/home screen (prototype `screens.js` `id==='home'`): the audience
 * eyebrow, the trust headline, the body with the `#phrase` gesture target, and
 * the leader portrait band. Shown centered with no margin rule (the `home` sheet
 * class). Text is byte-identical to `pages/home.html`.
 */
export function HomeScreen({
  onLeaderSelect,
  disabled,
}: Pick<ScreenProps, "onLeaderSelect" | "disabled">) {
  return (
    <div>
      <p className={styles.eyebrow}>Non-profit · Church · Institution · Leader</p>
      <h1>Navigate AI without eroding the trust you spent decades earning.</h1>
      <p className={styles.body}>
        We help mission-driven organizations respond to AI without losing{" "}
        <span id="phrase" className={styles.phrase}>
          <b>the trust their work depends on</b>
        </span>
        , by walking with them through one ordered path: get safe, experiment, form
        your people, then build.
      </p>
      <LeaderBand onSelect={onLeaderSelect} disabled={disabled} />
    </div>
  );
}
