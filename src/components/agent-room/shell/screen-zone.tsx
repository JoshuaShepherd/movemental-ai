"use client";

import type { ReactNode } from "react";

import { useAgentRoomRefs } from "../agent-room-context";
import styles from "../ink-band.module.css";

/**
 * The `#screen` stage: the radial-gradient field that holds the active screen on
 * its `.sheet` (with the red margin rule, dropped for `home`) and the `#ink`
 * overlay above it. Scroll is toggled per-screen — the prototype adds `.scroll`
 * to everything except the reality-check beat (`screens.js`).
 */
export function ScreenZone({
  scroll,
  home,
  children,
}: {
  scroll: boolean;
  /** The opening/home sheet — centered, no margin rule. */
  home: boolean;
  children: ReactNode;
}) {
  const { screenEl, sheetEl } = useAgentRoomRefs();
  return (
    <section
      ref={screenEl}
      className={`${styles.screen} ${scroll ? styles.scroll : ""}`}
    >
      <div ref={sheetEl} className={`${styles.sheet} ${home ? styles.home : ""}`}>
        {children}
      </div>
    </section>
  );
}
