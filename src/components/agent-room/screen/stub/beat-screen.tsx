"use client";

import { useState, type CSSProperties } from "react";

import { MAP_Q } from "@/lib/agent-room/data/map-q";
import type { RealityCheckBeatProps } from "@/lib/agent-room/component-props";
import styles from "../../ink-band.module.css";
import { RealityCheckBeat } from "../reality-check-beat";
import type { ScreenProps } from "./stub-screen";

const pad2 = (x: number) => (x < 10 ? `0${x}` : `${x}`);

/**
 * The `beat` registry entry (INT-02). Dispatches by render path:
 *  - **stream** — the agent sent `{ question, options, progress }`; render the
 *    prop-driven beat and route option taps back through the agent (`say`).
 *  - **stub** — read the local `MAP_Q` and play the local beat choreography.
 * The wrapper holds no hooks, so the branch (constant per mount — `stream` is
 * present iff the room is in stream mode) is rules-of-hooks-safe.
 */
export function BeatScreen(props: ScreenProps) {
  if (props.stream) {
    return (
      <RealityCheckBeat
        props={props.stream.props as RealityCheckBeatProps}
        onSay={props.stream.onSay}
        disabled={props.disabled}
      />
    );
  }
  return <StubBeat {...props} />;
}

/**
 * One reality-check beat (prototype `screens.js` `id==='beat'` + `beatDots`).
 * Editorial step progress (mono count + ink rail), the question, and the answer
 * options with the `--i` stagger. Tapping an option locks the rest, marks the
 * chosen one, and hands `(qi, oi)` to the runner (`answerMap` → `beatScene`),
 * which circles the choice, voices the reply, and advances. `id="opts"` is the
 * arrow gesture target; `data-oi` is the circle target.
 */
function StubBeat({ opts, onBeatAnswer, disabled }: ScreenProps) {
  const qi = opts.qi ?? 0;
  const question = MAP_Q[qi];
  const total = MAP_Q.length;
  const pct = total > 1 ? Math.round((qi / (total - 1)) * 100) : 0;

  const [chosen, setChosen] = useState<number | null>(null);
  const locked = disabled || chosen !== null;

  return (
    <div>
      <div className={styles.dots}>
        <span className={styles.beatCount}>
          {pad2(qi + 1)} <span className={styles.beatOf}>/ {pad2(total)}</span>
        </span>
        <span className={styles.beatRail}>
          <span className={styles.beatFill} style={{ width: `${pct}%` }} />
        </span>
        <span className={styles.beatWord}>where you stand</span>
      </div>

      {question.tag ? <p className={styles.eyebrow}>{question.tag}</p> : null}

      {/* Ghost question index (proposal §3.6) — scan aid during the six-beat flow. */}
      <span className={styles.beatGhost} aria-hidden="true">
        {pad2(qi + 1)}
      </span>
      <p className={styles.q}>{question.q}</p>

      {question.criteriaLead ? (
        <p className={styles.body} style={{ marginBottom: "0.35rem" }}>
          {question.criteriaLead}
        </p>
      ) : null}
      {question.criteria?.length ? (
        <ul className={styles.body} style={{ margin: "0 0 0.9rem 1.1rem", padding: 0 }}>
          {question.criteria.map((item) => (
            <li key={item} style={{ marginBottom: "0.25rem" }}>
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      <div className={styles.opts} id="opts">
        {question.opts.map((o, oi) => {
          const stateClass =
            chosen === null ? "" : chosen === oi ? styles.chosen : styles.locked;
          return (
            <button
              key={o.t}
              type="button"
              data-oi={oi}
              className={`${styles.opt} ${stateClass}`}
              style={{ "--i": oi } as CSSProperties}
              disabled={locked}
              onClick={() => {
                if (locked) return;
                setChosen(oi);
                onBeatAnswer(qi, oi);
              }}
            >
              {o.t}
            </button>
          );
        })}
      </div>
    </div>
  );
}
