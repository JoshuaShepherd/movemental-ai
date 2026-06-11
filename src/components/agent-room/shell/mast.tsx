"use client";

import Link from "next/link";

import { MovementalLogo } from "@/components/brand/movemental-logo";

import styles from "../ink-band.module.css";
import { MastAudienceNav } from "./mast-audience-nav";
import { MastAuth } from "./mast-auth";

type MastProps =
  | { onHome: () => void; homeHref?: never }
  | { homeHref: string; onHome?: never };

/**
 * The mast — logo, audience eyebrow, and session chrome above the stage.
 * Parity with `docs/html/home/index.html`. The wordmark is the always-available
 * home control: clicking it returns to the opening scene (`goHome` / `reset`) or
 * links home when `homeHref` is set (document surfaces like `/agent/institutions`).
 */
export function Mast(props: MastProps) {
  const homeHref = "homeHref" in props ? props.homeHref : undefined;
  const onHome = "onHome" in props ? props.onHome : undefined;

  return (
    <header className={styles.mast}>
      <div className={styles.mastStart}>
        {homeHref ? (
          <Link className={styles.logo} href={homeHref} aria-label="Movemental — home">
            <MovementalLogo priority className={styles.logoMark} />
          </Link>
        ) : (
          <button
            type="button"
            className={styles.logo}
            onClick={onHome}
            aria-label="Movemental — back to the start"
          >
            <MovementalLogo priority className={styles.logoMark} />
          </button>
        )}
      </div>

      <MastAudienceNav />

      <div className={styles.mastEnd}>
        <MastAuth />
      </div>
    </header>
  );
}
