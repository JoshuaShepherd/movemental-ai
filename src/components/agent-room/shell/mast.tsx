"use client";

import styles from "../ink-band.module.css";

/**
 * The mast — the only chrome above the stage. Just the wordmark, per the
 * prototype (`<header class="mast"><span class="logo">m·vemental</span>`). The
 * dot is a small circle in `--border`. Clicking the logo is the always-available
 * "home": it returns to the opening scene (`goHome`, wired in AF-05; `reset`
 * for now).
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
        m<span className={styles.d} />vemental
      </button>
    </header>
  );
}
