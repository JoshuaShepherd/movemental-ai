"use client";

import Image from "next/image";

import { MOVEMENTAL_LOGO_MAST } from "@/lib/brand/assets";

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
        <Image
          src={MOVEMENTAL_LOGO_MAST.src}
          alt={MOVEMENTAL_LOGO_MAST.alt}
          width={MOVEMENTAL_LOGO_MAST.width}
          height={MOVEMENTAL_LOGO_MAST.height}
          className={styles.logoImg}
          priority
        />
      </button>
    </header>
  );
}
