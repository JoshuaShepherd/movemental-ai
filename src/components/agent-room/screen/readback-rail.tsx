"use client";

import type { CSSProperties } from "react";

import {
  STAGE_CLEAR,
  STAGE_NAME,
  type MapRead,
  type Stage,
} from "@/lib/agent-room/data/map-q";
import styles from "../ink-band.module.css";

const ROWS: ReadonlyArray<[string, Stage]> = [
  ["01", "safety"],
  ["02", "sandbox"],
  ["03", "training"],
  ["04", "tech"],
];

export interface ReadbackRailProps {
  mapRead: MapRead | null;
  hereStage: Stage;
  className?: string;
}

/** Vertical path spine — shared by readback and safety readback hero rail. */
export function ReadbackRail({ mapRead, hereStage, className }: ReadbackRailProps) {
  return (
    <div className={className ? `${styles.readback} ${className}` : styles.readback}>
      {ROWS.map(([num, key], idx) => {
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
            {here ? (
              <span className={styles.rbGhostNum} aria-hidden="true">
                {num}
              </span>
            ) : null}
            <span className={styles.rbNode} aria-hidden="true" />
            <div className={styles.rbHead}>
              <span className={styles.rbNum}>{num}</span>
              <span className={styles.rbName} id={here ? "hereStage" : undefined}>
                {STAGE_NAME[key]}
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
