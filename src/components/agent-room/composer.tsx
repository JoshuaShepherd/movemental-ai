"use client";

import { useState } from "react";

import styles from "./ink-band.module.css";

/** Raw suggestion data (an utterance + label). Bound to an action per mode. */
export type Suggestion = { label: string; say: string; lead?: boolean };

/**
 * A chip the composer renders — label + a pre-bound action. Decouples the
 * composer from what a tap means: in stub mode `onSelect` runs the target scene
 * (`run(to)`), in stream mode it sends the utterance (`onSay(say)`).
 */
export type ComposerChip = { label: string; lead?: boolean; onSelect: () => void };

/** Input placeholder copy (prototype). Rotates by screen — beat invites a typed
 *  answer; everywhere else invites talking to the agent. */
export const DEFAULT_PLACEHOLDER = "Type to the agent, or tap a suggestion…";
export const BEAT_PLACEHOLDER = "Tap an answer above, or type your own…";

export const DEFAULT_SUGGESTIONS: Suggestion[] = [
  { label: "Show me where we stand", say: "Show me where we stand", lead: true },
  { label: "What’s the path?", say: "What's the path?" },
  { label: "Who’s behind this?", say: "Who's behind this?" },
  { label: "What does it cost?", say: "What does it cost?" },
];

/**
 * The composer floor (prototype `.composer`): suggested utterances (things to
 * *say*, not CTAs), the input line — the only way to act — and a replay legend.
 * The voice line lives in its own `VoiceZone` above. Chips carry their own
 * action; the input submits typed text via `onSay` (regex routing in AF-11).
 */
export function Composer({
  suggestions,
  disabled,
  onSay,
  onReplay,
  placeholder = DEFAULT_PLACEHOLDER,
}: {
  suggestions: ComposerChip[];
  disabled?: boolean;
  onSay: (text: string) => void;
  onReplay: () => void;
  placeholder?: string;
}) {
  const [value, setValue] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = value.trim();
    if (!v || disabled) return;
    setValue("");
    onSay(v);
  };

  return (
    <div className={styles.composer}>
      <div className={styles.sugg}>
        {suggestions.map((s) => (
          <button
            key={s.label}
            type="button"
            className={`${styles.chip} ${s.lead ? styles.lead : ""}`}
            disabled={disabled}
            onClick={s.onSelect}
          >
            {s.label}
          </button>
        ))}
      </div>

      <form className={styles.line} onSubmit={submit}>
        <label className={styles.field}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="off"
            aria-label="Talk to Movemental"
            placeholder={placeholder}
          />
        </label>
        <button type="submit" className={styles.send} aria-label="Send" disabled={disabled}>
          &rarr;
        </button>
      </form>

      <p className={styles.legend}>
        <button type="button" className={styles.replay} onClick={onReplay}>
          &#8635; replay
        </button>
      </p>
    </div>
  );
}
