"use client";

import { useEffect, useRef } from "react";

import styles from "../ink-band.module.css";
import type { VoiceLineItem } from "./use-ink-voice";

const NIB = (
  <>
    <path d="M7 22 L15 8 L19 11 L11 25 Z" fill="var(--color-ink-band-blue)" />
    <path
      d="M15 8 L18.5 4.5 L21.5 7.5 L19 11 Z"
      fill="var(--color-ink-band-blue)"
      opacity=".8"
    />
    <circle cx="8.4" cy="22.6" r="1.5" fill="var(--color-ink-band-blue)" />
  </>
);

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * The pen-nib write-on needs a single non-wrapping line (it measures the line's
 * full width and sweeps a clip reveal across it). On phones the voice line wraps
 * to stay legible (see the ≤640px block in ink-band.module.css), which is
 * incompatible with that horizontal sweep — so there we skip the write-on and let
 * the line show with the CSS fade instead. Matches the 640px CSS breakpoint.
 */
function canWriteOn(): boolean {
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion()) return false;
  return window.innerWidth > 640;
}

/**
 * One voice line — Caveat, ink-blue — that writes itself on. Ported from the
 * prototype `inkLine` rAF loop: a cosine-eased clip-path reveal of the text with
 * the pen nib riding the write head. Each line animates once on mount and calls
 * `onDone` when finished (immediately under reduced motion, where the CSS already
 * shows the full line). Duration matches source: `max(620, len * 38)`ms.
 *
 * A `settled` line (a finished stream turn committed into the queue) is shown
 * fully revealed with no write-on, so the live `StreamVoiceLine` → static queue
 * hand-off is seamless.
 */
function VoiceLine({
  id,
  text,
  old,
  settled = false,
  multiline = false,
  onDone,
}: {
  id: number;
  text: string;
  old: boolean;
  settled?: boolean;
  /** Discuss phase: let the line wrap (skip the single-line nib write-on). */
  multiline?: boolean;
  /** Stable resolver — called with this line's id when the write-on finishes. */
  onDone: (id: number) => void;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const nibRef = useRef<SVGSVGElement>(null);
  // Stream commits mark lines `settled` — they must wrap like live StreamVoice,
  // not collapse back to nowrap and run off the page.
  const wrap = multiline || settled;

  useEffect(() => {
    const span = spanRef.current;
    const nib = nibRef.current;
    if (!span) return;

    // A wrapping line can't carry the horizontal clip sweep (the nib rides a
    // single line) — show it fully and skip the animation.
    if (wrap || !canWriteOn()) {
      span.style.clipPath = "none";
      if (nib) nib.style.opacity = "0";
      onDone(id);
      return;
    }

    const width = span.getBoundingClientRect().width;
    const dur = Math.max(320, text.length * 18);
    let start: number | null = null;
    let frameId = 0;
    if (nib) nib.style.opacity = "1";

    const frame = (t: number) => {
      if (start === null) start = t;
      const raw = Math.min(1, (t - start) / dur);
      const p = 0.5 - 0.5 * Math.cos(Math.PI * raw);
      span.style.clipPath = `inset(0 ${((1 - p) * 100).toFixed(2)}% 0 0)`;
      if (nib) {
        nib.style.transform = `translate(${(p * width).toFixed(1)}px, ${(
          Math.sin(raw * 38) * 0.6
        ).toFixed(2)}px)`;
      }
      if (raw < 1) {
        frameId = requestAnimationFrame(frame);
      } else {
        if (nib) {
          nib.style.transition = "opacity .28s";
          nib.style.opacity = "0";
        }
        onDone(id);
      }
    };
    frameId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(frameId);
    // Animate once per line; id/text/onDone/settled are stable for a given line.
  }, [id, text, wrap, onDone]);

  return (
    <div className={`${styles.vline} ${wrap ? styles.vlineWrap : ""} ${old ? styles.old : ""}`}>
      <span ref={spanRef} className={`${styles.vspan} ${wrap ? styles.vspanWrap : ""}`}>
        {text}
      </span>
      {!wrap && (
        <svg ref={nibRef} className={styles.nib} viewBox="0 0 26 26" aria-hidden="true">
          <g transform="rotate(-26 8 20)">{NIB}</g>
        </svg>
      )}
    </div>
  );
}

/**
 * The live streaming line (INT-03): one assistant turn that grows as `text_delta`
 * chunks arrive. Unlike `VoiceLine` (which animates a known-length write-on once),
 * this eases a revealed-width toward the text's *current* full width every frame,
 * so newly-arrived glyphs reveal as a growing tail with the nib trailing the write
 * head. The rAF loop runs for the component's life and reads `scrollWidth` live, so
 * it tracks growth without restarting; on commit the parent unmounts it and a
 * settled `VoiceLine` shows the final text. Reduced motion → full text, no nib.
 */
function StreamVoiceLine({ text, multiline = false }: { text: string; multiline?: boolean }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const nibRef = useRef<SVGSVGElement>(null);
  const revealedRef = useRef(0);

  useEffect(() => {
    const span = spanRef.current;
    const nib = nibRef.current;
    if (!span) return;

    // Wrapping line: the growing `text` itself is the live "typing" — no single-
    // line clip sweep, no nib. Keeps long agent answers on the page instead of
    // running off the right edge.
    if (multiline || !canWriteOn()) {
      span.style.clipPath = "none";
      if (nib) nib.style.opacity = "0";
      return;
    }

    let frameId = 0;
    if (nib) nib.style.opacity = "1";

    const frame = (t: number) => {
      const target = span.scrollWidth;
      if (target <= 0) {
        span.style.clipPath = "inset(0 100% 0 0)";
        frameId = requestAnimationFrame(frame);
        return;
      }
      // Exponential approach toward the live full width + a small floor so the
      // tail keeps moving even when a single delta lands.
      const next = revealedRef.current + (target - revealedRef.current) * 0.18 + 0.6;
      revealedRef.current = Math.min(target, next);
      const revealed = revealedRef.current;
      span.style.clipPath = `inset(0 ${(((target - revealed) / target) * 100).toFixed(2)}% 0 0)`;
      if (nib) {
        nib.style.transform = `translate(${revealed.toFixed(1)}px, ${(
          Math.sin(t / 70) * 0.6
        ).toFixed(2)}px)`;
      }
      frameId = requestAnimationFrame(frame);
    };
    frameId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(frameId);
    // Mount once; the loop reads the live `text` width from the DOM each frame.
  }, [multiline]);

  return (
    <div className={`${styles.vline} ${multiline ? styles.vlineWrap : ""}`}>
      <span ref={spanRef} className={`${styles.vspan} ${multiline ? styles.vspanWrap : ""}`}>
        {text}
      </span>
      {!multiline && (
        <svg ref={nibRef} className={styles.nib} viewBox="0 0 26 26" aria-hidden="true">
          <g transform="rotate(-26 8 20)">{NIB}</g>
        </svg>
      )}
    </div>
  );
}

/**
 * Renders the committed voice queue: at most two lines, the earlier faded to
 * `.old`. The resolver fires per line so `inkLine(text)` awaits the right one.
 * `forceOld` fades every line (used when a live `StreamVoiceLine` or the thinking
 * pulse is the current focus below the queue).
 */
export function InkVoice({
  lines,
  onLineDone,
  forceOld = false,
  multiline = false,
}: {
  lines: VoiceLineItem[];
  onLineDone: (id: number) => void;
  forceOld?: boolean;
  /** Discuss phase: let each line wrap instead of nowrap-clipping off the edge. */
  multiline?: boolean;
}) {
  return (
    <>
      {lines.map((line, i) => (
        <VoiceLine
          key={line.id}
          id={line.id}
          text={line.text}
          old={forceOld || i < lines.length - 1}
          settled={line.settled}
          multiline={multiline}
          onDone={onLineDone}
        />
      ))}
    </>
  );
}

/** The live streaming voice line — keyed by the parent on the stream id. */
export function StreamVoice({ text, multiline = false }: { text: string; multiline?: boolean }) {
  return <StreamVoiceLine text={text} multiline={multiline} />;
}
