"use client";

import { useCallback, useRef, useState } from "react";

/** One written line in the voice zone. */
export interface VoiceLineItem {
  id: number;
  text: string;
  /**
   * A line that is already fully revealed (e.g. a finished stream turn committed
   * into the queue). `VoiceLine` shows it instantly with no write-on, so the
   * hand-off from the live `StreamVoiceLine` to the static queue is seamless.
   * Undefined for stub `inkLine` calls, which keep their one-shot write-on.
   */
  settled?: boolean;
}

/** The active streaming line — one assistant turn that grows as deltas arrive. */
export interface StreamLine {
  id: number;
  text: string;
}

/**
 * The voice half of the ink layer (prototype `inkLine`): a small queue of at
 * most two lines — the previous one faded to `.old`, the newest written on. The
 * write-on animation itself lives in the `VoiceLine` component (it owns its own
 * span/nib); this hook just holds the queue and the per-line promise resolvers
 * so `inkLine(text)` resolves when that line finishes drawing — letting the
 * runner (AF-05) `await` a `say` act before moving on.
 *
 * INT-03 adds a **streaming line** for live (stream) mode: a single growing line
 * (`stream`) whose deltas are appended via `appendStream` and animated as a
 * growing tail by `StreamVoiceLine`. On `commitStream` it settles into the queue
 * as a finished line. The stub path (`inkLine`) is untouched.
 */
export function useInkVoice() {
  const [lines, setLines] = useState<VoiceLineItem[]>([]);
  const [stream, setStreamState] = useState<StreamLine | null>(null);
  const resolvers = useRef<Map<number, () => void>>(new Map());
  const idRef = useRef(0);
  // Mirror of `stream` for synchronous reads inside the stream hook's drain loop
  // (where setState hasn't flushed yet).
  const streamRef = useRef<StreamLine | null>(null);

  const setStream = useCallback((next: StreamLine | null) => {
    streamRef.current = next;
    setStreamState(next);
  }, []);

  const inkLine = useCallback(
    (text: string): Promise<void> =>
      new Promise<void>((resolve) => {
        const id = (idRef.current += 1);
        resolvers.current.set(id, resolve);
        setLines((prev) => [...prev, { id, text }].slice(-2));
      }),
    [],
  );

  /** Called by a `VoiceLine` when its write-on animation completes. */
  const resolveLine = useCallback((id: number) => {
    const r = resolvers.current.get(id);
    if (r) {
      resolvers.current.delete(id);
      r();
    }
  }, []);

  /** Start a new streaming line (first `text_delta` of an assistant turn). */
  const beginStream = useCallback(() => {
    const id = (idRef.current += 1);
    setStream({ id, text: "" });
  }, [setStream]);

  /** Replace the streaming line's text with the full accumulated turn so far. */
  const appendStream = useCallback(
    (fullText: string) => {
      const cur = streamRef.current;
      if (cur) setStream({ id: cur.id, text: fullText });
      else {
        const id = (idRef.current += 1);
        setStream({ id, text: fullText });
      }
    },
    [setStream],
  );

  /**
   * Finalize the streaming line: it settles into the queue (already revealed, so
   * no re-animation) and the next stream begins fresh. No-op if no active stream
   * or it never received text. Matches the prototype's "a new screen settles the
   * voice" — the runner commits on `ui_render` / `agent_handoff` / turn end.
   */
  const commitStream = useCallback(() => {
    const cur = streamRef.current;
    setStream(null);
    if (cur && cur.text) {
      setLines((prev) => [...prev, { id: cur.id, text: cur.text, settled: true }].slice(-2));
    }
  }, [setStream]);

  /** Wipe the voice (prototype clears it when returning to the home screen). */
  const clearVoice = useCallback(() => {
    resolvers.current.forEach((r) => r());
    resolvers.current.clear();
    setStream(null);
    setLines([]);
  }, [setStream]);

  return {
    lines,
    stream,
    inkLine,
    resolveLine,
    beginStream,
    appendStream,
    commitStream,
    clearVoice,
  };
}
