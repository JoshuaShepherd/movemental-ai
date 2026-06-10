"use client";

import { useAgentRoomRefs, useInk } from "../agent-room-context";
import { InkVoice, StreamVoice } from "../ink/ink-voice";
import { DiscussVoice } from "../discuss/discuss-voice";
import styles from "../ink-band.module.css";
import type { VoiceState } from "../use-agent-room-stream";
import type { RoomPhase, TranscriptTurn } from "@/lib/agent-room/discuss";

/**
 * The voice zone — its own band between the stage and the composer, where the
 * agent's hand writes (Caveat in ink-blue). Both modes share the same ink layer
 * (`useInk`): the stub runner's `inkLine` calls fill the committed queue
 * (`voiceLines`), and live (stream) mode routes `text_delta` through
 * `beginStream`/`appendStream`, surfaced here as `voiceStream` and animated as a
 * growing tail by `StreamVoice`. When a stream line (or the stream-only thinking
 * pulse) is the current focus, the committed queue fades via `forceOld`. `error`
 * takes precedence; the reserved `min-height` keeps the band from jumping when
 * empty.
 */
export function VoiceZone({
  voice,
  error,
  phase = "guide",
  transcript = [],
}: {
  voice: VoiceState;
  error: string | null;
  /** Discuss phase (INT-08): grows the band to 3–5 lines + tap-to-expand. */
  phase?: RoomPhase;
  transcript?: TranscriptTurn[];
}) {
  const { voiceEl } = useAgentRoomRefs();
  const { voiceLines, resolveLine, voiceStream } = useInk();

  // Discuss (Model B): the band grows and is fed by the transcript's recent
  // assistant lines (DiscussVoice). During a live stream turn (INT-10) the
  // growing ink shows below the committed lines; on turn end it commits to the
  // transcript and clears. The thinking pulse covers the gap before the first
  // delta. Error still wins.
  if (phase === "discuss") {
    return (
      <div ref={voiceEl} className={`${styles.voice} ${styles.voiceDiscuss}`} aria-live="polite">
        {error ? (
          <span className={styles.errorLine}>{error}</span>
        ) : (
          <>
            <DiscussVoice transcript={transcript} />
            {voiceStream && <StreamVoice key={voiceStream.id} text={voiceStream.text} />}
            {voice.thinking && !voiceStream && (
              <div className={styles.thinking}>
                <span className={styles.pulse} aria-hidden="true" />
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  // Thinking pulse is stream-only (the stub never sets `voice.thinking`): the calm
  // pulse shows before the first delta and again while the read-back composes.
  const showPulse = voice.thinking && !voiceStream;
  const hasInk = voiceLines.length > 0 || Boolean(voiceStream);

  return (
    <div ref={voiceEl} className={styles.voice} aria-live="polite">
      {error ? (
        <span className={styles.errorLine}>{error}</span>
      ) : (
        <>
          {voiceLines.length > 0 && (
            <InkVoice
              lines={voiceLines}
              onLineDone={resolveLine}
              forceOld={Boolean(voiceStream) || showPulse}
            />
          )}
          {voiceStream && <StreamVoice key={voiceStream.id} text={voiceStream.text} />}
          {showPulse && (
            <div className={styles.thinking}>
              <span className={styles.pulse} aria-hidden="true" />
            </div>
          )}
          {/* Last-resort fallback if a turn produced text outside the ink layer. */}
          {!hasInk && !showPulse && voice.text && (
            <div className={styles.vline}>{voice.text}</div>
          )}
        </>
      )}
    </div>
  );
}
