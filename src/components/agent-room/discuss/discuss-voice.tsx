"use client";

import { useState } from "react";

import {
  DISCUSS_DRAWER_LINES,
  DISCUSS_VOICE_LINES,
  type TranscriptTurn,
} from "@/lib/agent-room/discuss";
import styles from "../ink-band.module.css";
import { InkVoice } from "../ink/ink-voice";
import type { VoiceLineItem } from "../ink/use-ink-voice";

/**
 * The Discuss-phase voice band (INT-08, Model B §5.1). The live Caveat presence
 * is retained and allowed to grow: it shows the most recent 3–5 **assistant**
 * lines (older ones `.old`-faded), and the latest keeps the write-on nib — so it
 * reuses the same `InkVoice` renderer the Guide band uses. Tapping the band opens
 * a small drawer with the last ~3 agent utterances (still Caveat — not a full
 * scrollback dump). It is not a transcript log; the *record* lives on the sheet
 * as marginalia (`DiscussMarginalia`), this band is the *live presence*.
 */
export function DiscussVoice({
  transcript,
  multiline = false,
}: {
  transcript: TranscriptTurn[];
  multiline?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const agent = transcript.filter((t) => t.role === "assistant");
  const recent = agent.slice(-DISCUSS_VOICE_LINES);
  const base = agent.length - recent.length; // absolute index of the first shown line
  // Stable ids (absolute agent-turn index) so React reuses instances — only the
  // newest line animates; older lines are `settled` (shown full, no re-animation).
  const lines: VoiceLineItem[] = recent.map((t, i) => ({
    id: base + i,
    text: t.content,
    settled: base + i < agent.length - 1,
  }));
  const drawer = agent.slice(-DISCUSS_DRAWER_LINES);

  return (
    <>
      {agent.length > 1 && (
        <button
          type="button"
          className={styles.voiceExpand}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Hide recent" : "Recent conversation"}
        </button>
      )}
      {open && drawer.length > 0 && (
        <div className={styles.voiceDrawer}>
          {drawer.map((t, i) => (
            <p key={base + i} className={styles.voiceDrawerLine}>
              {t.content}
            </p>
          ))}
        </div>
      )}
      <InkVoice lines={lines} onLineDone={() => {}} multiline={multiline} />
    </>
  );
}
