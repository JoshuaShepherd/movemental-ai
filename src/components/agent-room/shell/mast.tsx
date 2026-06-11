"use client";

import { MovementalLogo } from "@/components/brand/movemental-logo";

import styles from "../ink-band.module.css";
import { MastAuth } from "./mast-auth";

const MAST_AUDIENCE = "Non-profits · Churches · Institutions";

/**
 * The mast — logo, audience eyebrow, and session chrome above the stage.
 * Parity with `docs/html/home/index.html`. The wordmark is the always-available
 * home control: clicking it returns to the opening scene (`goHome` / `reset`).
 */
export function Mast({ onHome }: { onHome: () => void }) {
  return (
    <header className={styles.mast}>
      <div className={styles.mastStart}>
        <button
          type="button"
          className={styles.logo}
          onClick={onHome}
          aria-label="Movemental — back to the start"
        >
          <MovementalLogo priority className={styles.logoMark} />
        </button>
      </div>

      <p className={styles.mastAudience} aria-label="Who we serve">
        {MAST_AUDIENCE}
      </p>

      <div className={styles.mastEnd}>
        <MastAuth />
      </div>
    </header>
  );
}
