"use client";

import { HOME_SCREEN_COPY } from "@/lib/agent-room/data/home-copy";

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
    <div className={styles.homeContent}>
      <h1>{HOME_SCREEN_COPY.headline}</h1>
      <p className={styles.body}>
        {HOME_SCREEN_COPY.bodyBeforePhrase}{" "}
        <span id="phrase" className={styles.phrase}>
          <b>{HOME_SCREEN_COPY.phrase}</b>
        </span>
        {HOME_SCREEN_COPY.bodyAfterPhrase}
      </p>
      <LeaderBand onSelect={onLeaderSelect} disabled={disabled} />
    </div>
  );
}
