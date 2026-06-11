"use client";

import type { ReactNode } from "react";

import type { TranscriptTurn } from "@/lib/agent-room/discuss";
import styles from "../ink-band.module.css";
import { DiscussComposer } from "./discuss-composer";
import { DiscussThread } from "./discuss-thread";

/**
 * Model C — full-screen Discuss overlay. Conversation owns the viewport while
 * Guide content stays on the sheet underneath. X closes back to Guide + fold.
 */
export function DiscussOverlay({
  transcript,
  liveText,
  liveThinking,
  disabled,
  onSay,
  onReplay,
  onExit,
  stubCapture,
}: {
  transcript: TranscriptTurn[];
  liveText?: string;
  liveThinking?: boolean;
  disabled?: boolean;
  onSay: (text: string) => void;
  onReplay: () => void;
  onExit?: () => void;
  /** Stub-only: embed discuss capture form below the thread. */
  stubCapture?: ReactNode;
}) {
  return (
    <div
      className={styles.discussOverlayBackdrop}
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onExit?.();
      }}
    >
      <div
        className={styles.discussOverlay}
        role="dialog"
        aria-modal="true"
        aria-labelledby="discuss-overlay-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.discussOverlayHeader}>
          <h2 id="discuss-overlay-title" className={styles.discussOverlayTitle}>
            Conversation
          </h2>
          <button
            type="button"
            className={styles.discussOverlayClose}
            aria-label="Close conversation"
            onClick={onExit}
          >
            ×
          </button>
        </header>

        <div className={styles.discussOverlayBody}>
          <DiscussThread
            transcript={transcript}
            liveText={liveText}
            liveThinking={liveThinking}
            compact
          />
          {stubCapture}
        </div>

        {!stubCapture && (
          <DiscussComposer
            disabled={disabled}
            onSay={onSay}
            onReplay={onReplay}
            onExit={onExit}
          />
        )}
      </div>
    </div>
  );
}
