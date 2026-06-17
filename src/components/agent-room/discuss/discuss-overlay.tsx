"use client";

import type { ReactNode } from "react";

import type { ThreadTurn } from "@/lib/agent-room/thread";
import styles from "../ink-band.module.css";
import { DiscussThread } from "./discuss-thread";

/** @deprecated Superseded by expanded AgentDock (conversation choreography SSOT). */
export function DiscussOverlay({
  thread,
  liveThinking,
  onExit,
  stubCapture,
}: {
  thread: ThreadTurn[];
  liveThinking?: boolean;
  onExit?: () => void;
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
          <DiscussThread thread={thread} liveThinking={liveThinking} compact />
          {stubCapture}
        </div>
      </div>
    </div>
  );
}
