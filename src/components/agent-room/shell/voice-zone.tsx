"use client";

import { useAgentRoomRefs, useInk } from "../agent-room-context";
import { InkVoice } from "../ink/ink-voice";
import styles from "../ink-band.module.css";
import { validateCaption } from "@/lib/agent-room/caption-validator";
import type { VoiceState } from "../use-agent-room-stream";

/**
 * Collapsed ink caption band (SSOT I1) — one short, non-wrapping Caveat line.
 */
export function VoiceZone({
  error,
  caption,
}: {
  voice?: VoiceState;
  error: string | null;
  caption?: string;
}) {
  const { voiceEl } = useAgentRoomRefs();
  const { voiceLines, resolveLine } = useInk();

  const rawCaption =
    caption ??
    (voiceLines.length > 0 ? voiceLines[voiceLines.length - 1]?.text : undefined);
  const validated = rawCaption ? validateCaption(rawCaption) : { eligible: false as const };
  const showCaption = validated.eligible ? validated.caption : undefined;
  const matchingLine = showCaption
    ? voiceLines.find((l) => l.text === showCaption)
    : undefined;

  return (
    <div
      ref={voiceEl}
      className={`${styles.handwritingVline} ${styles.voiceCaption}`}
      aria-live="polite"
    >
      {error ? (
        <span className={styles.errorLine}>{error}</span>
      ) : showCaption && matchingLine ? (
        <InkVoice lines={[matchingLine]} onLineDone={resolveLine} />
      ) : showCaption ? (
        <div className={styles.vline}>
          <span className={styles.vspan}>{showCaption}</span>
        </div>
      ) : null}
    </div>
  );
}
