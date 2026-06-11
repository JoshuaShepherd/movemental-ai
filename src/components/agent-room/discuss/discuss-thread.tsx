"use client";

import type { TranscriptTurn } from "@/lib/agent-room/discuss";
import styles from "../ink-band.module.css";
import { PassageMarkdown } from "./passage-markdown";

export type DiscussThreadProps = {
  transcript: TranscriptTurn[];
  /** Live streaming ink line (hybrid/stream). */
  liveText?: string;
  liveThinking?: boolean;
  /** Quiet tool/status line beside the thinking pulse (e.g. file_search). */
  liveThinkingNote?: string;
  /** Smaller type scale for overlay (Model C). */
  compact?: boolean;
  /** Include all assistant turns (fold) vs filter short voice turns (overlay). */
  showAllAssistant?: boolean;
};

/**
 * Shared transcript renderer for Discuss overlay (Model C) and DiscussFold.
 * Visitor turns use margin annotation styling; agent turns use body prose.
 */
export function DiscussThread({
  transcript,
  liveText,
  liveThinking,
  liveThinkingNote,
  compact = false,
  showAllAssistant = false,
}: DiscussThreadProps) {
  const shown = showAllAssistant
    ? transcript
    : transcript.filter((t) => t.role === "user" || t.surface !== "voice");

  const lastIdx = shown.length - 1;
  const threadClass = compact
    ? `${styles.discussThread} ${styles.discussThreadCompact}`
    : styles.discussThread;

  if (shown.length === 0 && !liveText && !liveThinking) return null;

  return (
    <div className={threadClass}>
      {shown.map((t, i) =>
        t.role === "user" ? (
          <div
            key={i}
            className={compact ? styles.marginUserCompact : styles.marginUser}
          >
            {t.content}
          </div>
        ) : (
          <div
            key={i}
            className={`${compact ? styles.passageCompact : styles.passage} ${styles.passageMarkdown} ${
              i === lastIdx && !liveText ? styles.settle : ""
            }`}
          >
            <PassageMarkdown text={t.content} />
          </div>
        ),
      )}
      {liveThinking && !liveText && (
        <div className={styles.thinking}>
          <span className={styles.pulse} aria-hidden="true" />
          {liveThinkingNote && (
            <span className={styles.thinkingNote}>{liveThinkingNote}…</span>
          )}
        </div>
      )}
      {liveText && (
        <p
          className={`${compact ? styles.liveInkCompact : styles.liveInk} ${styles.settle}`}
          aria-live="polite"
        >
          {liveText}
        </p>
      )}
    </div>
  );
}
