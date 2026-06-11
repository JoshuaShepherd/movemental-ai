"use client";

import type { CSSProperties } from "react";

import { STAGE_CLEAR, STAGE_NAME, type Stage } from "@/lib/agent-room/data/map-q";
import type { ReadbackProps } from "@/lib/agent-room/component-props";
import styles from "../../ink-band.module.css";
import { Readback } from "../readback";
import { ReadbackMapEmail } from "../readback-map-email";
import type { ScreenProps } from "./stub-screen";

const ROWS: ReadonlyArray<[string, Stage]> = [
  ["01", "safety"],
  ["02", "sandbox"],
  ["03", "training"],
  ["04", "tech"],
];

/** Orgs that cleared the Safety gate are placed at Sandbox for readback. */
const HERE_STAGE: Stage = "sandbox";

/**
 * The `readback` registry entry (INT-02) — **dual-mode**, because the two
 * sources carry incompatible shapes:
 *  - **stream** — the diagnostician composed `{ verdict, hereStageIndex, prose,
 *    fork }`; render the prose-and-fork read-back (forks → `say`).
 *  - **stub** — render the local gap-spine from the computed `mapRead` (per-stage
 *    gap line + severity), the prototype's `mapStageRow` layout.
 * One component, one registry slot, two presentations. (Merging the two designs
 * into one is a product/design call, deferred — see INT-02 §10.) No hooks here,
 * so the top-level branch is rules-of-hooks-safe.
 */
export function ReadbackScreen({ mapRead, stream, disabled, onCaptureSubmit }: ScreenProps) {
  const emailCapture =
    onCaptureSubmit != null ? (
      <ReadbackMapEmail onCaptureSubmit={onCaptureSubmit} disabled={disabled} />
    ) : null;

  if (stream) {
    return (
      <>
        <Readback
          props={stream.props as ReadbackProps}
          onSay={stream.onSay}
          disabled={disabled}
        />
        {emailCapture}
      </>
    );
  }
  return (
    <div>
      <p className={styles.eyebrow}>Your reality, mapped</p>
      <p className={styles.q} style={{ marginBottom: "0.7rem" }}>
        Here’s the shape of where you stand.
      </p>

      <div className={styles.readback}>
        {ROWS.map(([num, key], idx) => {
          const here = key === HERE_STAGE;
          const gap = mapRead?.stages[key] ?? null;
          const line = gap ? gap.line : STAGE_CLEAR[key];
          const sev = gap ? gap.sev : 0;
          return (
            <div
              key={key}
              className={`${styles.rbStage} ${here ? styles.rbHere : ""} ${gap ? "" : styles.rbClear}`}
              style={{ "--i": idx } as CSSProperties}
            >
              {/* Ghost step index on the focused stage (proposal §3.3). */}
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

      <p className={styles.body} style={{ marginTop: "1rem" }}>
        <span id="rbphrase">
          <b>Your next move is Sandbox — a bounded place to try AI against your real work.</b>
        </span>
      </p>
      {emailCapture}
    </div>
  );
}
