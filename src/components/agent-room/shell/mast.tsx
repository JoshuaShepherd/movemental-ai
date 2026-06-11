"use client";

import { MovementalLogo } from "@/components/brand/movemental-logo";

import styles from "../ink-band.module.css";

/**
 * The mast — the only chrome above the stage. The Movemental wordmark is the
 * always-available home control: clicking it returns to the opening scene
 * (`goHome` / `reset`).
 */
export function Mast({ onHome }: { onHome: () => void }) {
  return (
    <header className={styles.mast}>
      <button
        type="button"
        className={styles.logo}
        onClick={onHome}
        aria-label="Movemental — back to the start"
      >
        <MovementalLogo priority className={styles.logoMark} />
      </button>
    </header>
  );
}
