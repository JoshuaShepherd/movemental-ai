"use client";

import type { ThreadTurn } from "@/lib/agent-room/thread";
import styles from "../ink-band.module.css";
import { AgentThreadProse, PassageMarkdown } from "./passage-markdown";

export type DiscussThreadProps = {
  /** Single conversation log (Guide + Discuss). */
  thread: ThreadTurn[];
  liveThinking?: boolean;
  liveThinkingNote?: string;
  compact?: boolean;
  onAffordanceAction?: (kind: "back_to_sheet", screenId: string) => void;
};

/**
 * The one thread renderer for both Guide and Discuss phases (SSOT §9).
 */
export function DiscussThread({
  thread,
  liveThinking,
  liveThinkingNote,
  compact = false,
  onAffordanceAction,
}: DiscussThreadProps) {
  const lastIdx = thread.length - 1;
  const threadClass = compact
    ? `${styles.discussThread} ${styles.discussThreadCompact}`
    : styles.discussThread;

  const hasStreaming = thread.some((t) => t.role === "assistant" && t.streaming);
  if (thread.length === 0 && !liveThinking) return null;

  return (
    <div className={threadClass}>
      {thread.map((t, i) =>
        t.role === "user" ? (
          <div
            key={`user-${i}-${t.content.slice(0, 16)}`}
            className={compact ? styles.marginUserCompact : styles.threadMsgUser}
          >
            <p>{t.content}</p>
          </div>
        ) : t.role === "affordance" ? (
          <div key={`affordance-${i}-${t.screenId}`} className={styles.threadAffordanceRow}>
            <button
              type="button"
              className={styles.threadAffordance}
              onClick={() => onAffordanceAction?.(t.affordanceKind, t.screenId)}
            >
              {t.content}
            </button>
          </div>
        ) : t.passage ? (
          <div
            key={`agent-${i}-${t.content.slice(0, 16)}`}
            className={`${compact ? styles.passageCompact : styles.passage} ${styles.passageMarkdown} ${
              i === lastIdx && !hasStreaming ? styles.settle : ""
            }`}
          >
            <PassageMarkdown text={t.content} />
          </div>
        ) : (
          <div
            key={`agent-${i}-${t.content.slice(0, 16)}`}
            className={styles.threadMsgAgent}
          >
            <AgentThreadProse
              text={t.content}
              className={
                t.streaming
                  ? `${compact ? styles.liveInkCompact : styles.liveInk} ${styles.settle}`
                  : i === lastIdx && !hasStreaming
                    ? styles.settle
                    : undefined
              }
              ariaLive={t.streaming ? "polite" : undefined}
            />
          </div>
        ),
      )}
      {liveThinking && !hasStreaming ? (
        <div className={styles.thinking}>
          <span className={styles.pulse} aria-hidden="true" />
          {liveThinkingNote ? (
            <span className={styles.thinkingNote}>{liveThinkingNote}…</span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

/** @deprecated Use `thread` prop — alias for DiscussFold compatibility. */
export function DiscussThreadFromTranscript({
  transcript,
  ...rest
}: {
  transcript: { role: "user" | "assistant"; content: string; surface?: string }[];
  liveText?: string;
  liveThinking?: boolean;
  liveThinkingNote?: string;
  compact?: boolean;
  showAllAssistant?: boolean;
}) {
  const thread: ThreadTurn[] = transcript.map((t) => ({
    role: t.role,
    content: t.content,
    passage: t.surface === "passage",
  }));
  return <DiscussThread thread={thread} {...rest} />;
}
