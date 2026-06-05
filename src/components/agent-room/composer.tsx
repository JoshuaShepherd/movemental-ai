"use client";

import { useState } from "react";

import styles from "./agent-room.module.css";
import type { VoiceState } from "./use-agent-room-stream";

export type Suggestion = { label: string; say: string; lead?: boolean };

export const DEFAULT_SUGGESTIONS: Suggestion[] = [
  { label: "Show me where we stand", say: "Show me where we stand", lead: true },
  { label: "What’s the path?", say: "What's the path?" },
  { label: "Who’s behind this?", say: "Who's behind this?" },
  { label: "What does it cost?", say: "What does it cost?" },
];

/**
 * The floor: the voice line (calm pulse → host's words), the suggested
 * utterances (things to say, not CTAs), and the input — the only way to act.
 */
export function Composer({
  voice,
  error,
  isStreaming,
  suggestions,
  onSay,
}: {
  voice: VoiceState;
  error: string | null;
  isStreaming: boolean;
  suggestions: Suggestion[];
  onSay: (text: string) => void;
}) {
  const [value, setValue] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = value.trim();
    if (!v || isStreaming) return;
    setValue("");
    onSay(v);
  };

  return (
    <div className={styles.composer}>
      <div className={styles.composerIn}>
        <div className={styles.voiceLine} aria-live="polite">
          {error ? (
            <span className={styles.errorLine}>{error}</span>
          ) : voice.thinking && !voice.text ? (
            <span className={styles.thinking}>
              <span className={styles.pulse} /> Thinking
            </span>
          ) : (
            voice.text || <span className={styles.muted}>&nbsp;</span>
          )}
        </div>

        {suggestions.length > 0 ? (
          <div className={styles.suggest}>
            {suggestions.map((s) => (
              <button
                key={s.label}
                type="button"
                className={`${styles.sug} ${s.lead ? styles.lead : ""}`}
                disabled={isStreaming}
                onClick={() => onSay(s.say)}
              >
                {s.label}
              </button>
            ))}
          </div>
        ) : null}

        <form className={styles.composerLine} onSubmit={submit}>
          <label className={styles.field}>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoComplete="off"
              aria-label="Talk to Movemental"
              placeholder="Tell me about your organization, or ask me anything…"
            />
          </label>
          <button type="submit" className={styles.send} aria-label="Send" disabled={isStreaming}>
            &rarr;
          </button>
        </form>

        <p className={styles.note}>
          A focused guide for one thing: where your organization stands with AI,
          and what to do next. It won&rsquo;t pretend to be anything else.
        </p>
      </div>
    </div>
  );
}
