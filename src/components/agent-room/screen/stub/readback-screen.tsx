"use client";

import type { Stage } from "@/lib/agent-room/data/map-q";
import type { ReadbackProps } from "@/lib/agent-room/component-props";
import styles from "../../ink-band.module.css";
import { Readback } from "../readback";
import { ReadbackMapEmail } from "../readback-map-email";
import { ReadbackRail } from "../readback-rail";
import { SafetyReadbackScene } from "../safety-readback-scene";
import type { ScreenProps } from "./stub-screen";

/** Orgs that cleared the Safety gate are placed at Sandbox for readback. */
function hereStageForRead(mapRead: ScreenProps["mapRead"]): Stage {
  return mapRead?.clearedSafety ? "sandbox" : "safety";
}

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
export function ReadbackScreen({
  mapRead,
  stream,
  disabled,
  onCaptureSubmit,
  onRunScene,
}: ScreenProps) {
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

  if (!mapRead?.clearedSafety) {
    return (
      <SafetyReadbackScene mapRead={mapRead} onRunScene={onRunScene} disabled={disabled} />
    );
  }

  const hereStage = hereStageForRead(mapRead);
  return (
    <div>
      <p className={styles.eyebrow}>Your reality, mapped</p>
      <p className={styles.q} style={{ marginBottom: "0.7rem" }}>
        Here’s the shape of where you stand.
      </p>

      <ReadbackRail mapRead={mapRead} hereStage={hereStage} />

      <p className={styles.body} style={{ marginTop: "1rem" }}>
        <span id="rbphrase">
          <b>
            Your next move is Sandbox — a bounded place to try AI against your real work.
          </b>
        </span>
      </p>
      <p className={styles.honest} style={{ marginTop: "0.75rem" }}>
        Stage placement draws on the four-question reality map.{" "}
        <a className={styles.inlineLink} href="/footnotes#safety-church-policy-9">
          Sources
        </a>
      </p>
      {emailCapture}
      <p className={styles.dashboardBridge}>
        <a className={styles.ctaLead} href="/assess">
          Want this for your actual organization? Take the full AI reality assessment →
        </a>
      </p>
    </div>
  );
}
