"use client";

import { useState } from "react";

import type { TranscriptTurn } from "@/lib/agent-room/discuss";
import styles from "../ink-band.module.css";

/**
 * Sheet marginalia for Discuss (INT-08, Model B §5.1). The longer written
 * exchange accumulates as edits on the **same document** below the active screen
 * content — never a second column or bubble chat:
 *
 * - **Visitor turns** — Inter, a hairline left rule in `--margin-red` at low
 *   opacity (margin annotation, not a right-aligned bubble).
 * - **Agent passages** — body prose on the paper; the latest settle-reveals.
 *
 * Rendered inside the `#sheet` after the screen composition (so it scrolls with
 * the sheet). In INT-08 the transcript is seeded by the stub/dev seam; INT-10
 * routes live `text_delta` passages here.
 */
export function DiscussMarginalia({ transcript }: { transcript: TranscriptTurn[] }) {
  // Visitor turns always annotate the sheet; agent turns appear here only when
  // they're a written **passage** (long, or untagged) — short replies tagged
  // `surface:"voice"` (INT-10) stay ephemeral in the voice band, not the sheet.
  const shown = transcript.filter((t) => t.role === "user" || t.surface !== "voice");
  if (shown.length === 0) return null;
  const last = shown.length - 1;
  return (
    <div className={styles.marginalia}>
      {shown.map((t, i) =>
        t.role === "user" ? (
          <div key={i} className={styles.marginUser}>
            {t.content}
          </div>
        ) : (
          <p
            key={i}
            className={`${styles.passage} ${i === last ? styles.settle : ""}`}
          >
            {t.content}
          </p>
        ),
      )}
    </div>
  );
}

/**
 * The "What we discussed" fold (INT-08, Model B §6.2). On exiting Discuss the
 * marginalia collapses into this section at the bottom of the sheet in Guide —
 * the conversation is preserved, not discarded. Only renders when a Discuss
 * session has produced a transcript, so Guide stays AF-12-identical until then.
 */
export function DiscussFold({ transcript }: { transcript: TranscriptTurn[] }) {
  const [open, setOpen] = useState(false);
  if (transcript.length === 0) return null;
  return (
    <div className={styles.discussFold}>
      <button
        type="button"
        className={styles.foldToggle}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "▾ " : "▸ "}What we discussed
      </button>
      {open && (
        <div className={styles.foldBody}>
          {transcript.map((t, i) =>
            t.role === "user" ? (
              <div key={i} className={styles.marginUser}>
                {t.content}
              </div>
            ) : (
              <p key={i} className={styles.passage}>
                {t.content}
              </p>
            ),
          )}
        </div>
      )}
    </div>
  );
}
