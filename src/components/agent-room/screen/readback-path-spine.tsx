"use client";

import type { CSSProperties } from "react";

import {
  STAGE_CLEAR,
  STAGE_NAME,
  type MapRead,
  type Stage,
} from "@/lib/agent-room/data/map-q";
import { PATH_STAGE_RAIL } from "@/lib/agent-room/naming";
import styles from "../ink-band.module.css";

const STAGE_KEYS: readonly Stage[] = ["safety", "sandbox", "training", "tech"];

export interface ReadbackPathSpineProps {
  /** Active stage index 0–3 (Safety → Technology). */
  hereStageIndex: number;
  /** Optional gap data from mapRead; omit in stream mode for stage-only spine. */
  mapRead?: MapRead | null;
  /** Hero rail variant (safety readback aside). */
  variant?: "default" | "hero";
  className?: string;
}

function stageFromIndex(index: number): Stage {
  return STAGE_KEYS[Math.min(Math.max(index, 0), STAGE_KEYS.length - 1)]!;
}

/**
 * Ghost-number path spine (Ink Band pattern A). Shows Safety → Technology with
 * a large faint index on the active row, ink-blue rail, and optional gap lines.
 * Shared by stub readback, stream readback, and safety readback hero.
 */
export function ReadbackPathSpine({
  hereStageIndex,
  mapRead = null,
  variant = "default",
  className,
}: ReadbackPathSpineProps) {
  const hereStage = stageFromIndex(hereStageIndex);
  const rootClass = [
    styles.readback,
    variant === "hero" ? styles.readbackHero : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass} aria-label="Four-stage path">
      {PATH_STAGE_RAIL.map(({ n, title }, idx) => {
        const key = STAGE_KEYS[idx]!;
        const here = key === hereStage;
        const gap = mapRead?.stages[key] ?? null;
        const line = gap ? gap.line : STAGE_CLEAR[key];
        const sev = gap ? gap.sev : 0;

        return (
          <div
            key={key}
            className={`${styles.rbStage} ${here ? styles.rbHere : ""} ${gap ? "" : styles.rbClear}`}
            style={{ "--i": idx } as CSSProperties}
          >
            <span
              className={`${styles.rbGhostNum} ${here ? styles.rbGhostNumActive : styles.rbGhostNumMuted}`}
              aria-hidden="true"
            >
              {n}
            </span>
            {here ? <span className={styles.rbActiveRail} aria-hidden="true" /> : null}
            <span className={styles.rbNode} aria-hidden="true" />
            <div className={styles.rbHead}>
              <span className={styles.rbNum}>{n}</span>
              <span className={styles.rbName} id={here ? "hereStage" : undefined}>
                {STAGE_NAME[key] ?? title}
              </span>
              {here ? <span className={styles.rbHereTag}>you are here</span> : null}
              {sev > 0 ? (
                <span className={styles.rbSev} title="gap intensity">
                  {Array.from({ length: sev }).map((_, k) => (
                    <i key={k} />
                  ))}
                </span>
              ) : null}
            </div>
            <span className={styles.rbLine}>{line}</span>
          </div>
        );
      })}
    </div>
  );
}

/** Map a {@link Stage} key to its 0-based index for the spine. */
export function stageToIndex(stage: Stage): number {
  return STAGE_KEYS.indexOf(stage);
}
