"use client";

import styles from "../../ink-band.module.css";
import type { ScreenProps } from "./stub-screen";
import { Crumb, LayerRow } from "./chrome";

/** About Movemental (prototype `ABOUT_HTML`). Byte-identical prose. */
export function AboutScreen({ onHome }: ScreenProps) {
  return (
    <div>
      <Crumb onHome={onHome} />
      <p className={styles.eyebrow}>About Movemental</p>
      <p className={styles.q} style={{ marginBottom: "1rem" }}>
        We help mission-driven organizations meet AI without eroding the trust their
        work depends on.
      </p>
      <p className={styles.body}>
        AI is already inside most organizations, used in ways no one has decided are
        acceptable. Movemental exists to help churches, nonprofits, and institutions
        respond to that wisely — not by handing you a tool, but by walking with you down
        one ordered path.
      </p>

      <div className={styles.sec}>
        <p className={styles.secLabel}>The path we walk with you</p>
        <div className={styles.layers}>
          <LayerRow
            n="01"
            title="Safety"
            g="decide what’s wise before the tools — your AI Guidebook, ratified by your board."
          />
          <LayerRow
            n="02"
            title="Sandbox"
            g="try AI against real work in a bounded place. Sort what helps from what doesn’t."
          />
          <LayerRow
            n="03"
            title="Training"
            g="form your people to steward it. Judgment, not a one-off workshop."
          />
          <LayerRow
            n="04"
            title="Tech"
            g="build the tools your work actually needs, on what you already have."
          />
        </div>
        <p className={styles.honest}>
          Each step earns the next. Skip one and the ones after it have nothing to stand
          on.
        </p>
      </div>

      <div className={styles.sec}>
        <p className={styles.secLabel}>Why we started</p>
        <p className={styles.body} style={{ marginTop: "0.2rem" }}>
          We began in 2024 around a single concern: that the AI moment would happen{" "}
          <em>to</em> mission-driven organizations rather than be navigated by them.
          Movemental is built by three founders — Alan, Brad, and Josh — alongside a
          wider network of movement leaders.
        </p>
      </div>

      <p className={styles.honest}>
        The path was built with the leaders on the home page — people who have spent
        decades doing this work.
      </p>
    </div>
  );
}
