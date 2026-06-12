"use client";

import { useCallback, useEffect, useState } from "react";

export type DeckMode = "deck" | "snap" | "stack";

const RM = "(prefers-reduced-motion: reduce)";
const COARSE = "(pointer: coarse)";
const NARROW = "(max-width: 760px)";

/**
 * Pick a layout mode from capability, never user-agent:
 *   - reduced-motion → "stack" (no pin, no scroll-jack, no translate).
 *   - coarse pointer / narrow viewport → "snap" (native horizontal swipe).
 *   - otherwise → "deck" (pinned horizontal track, control-driven).
 * Re-evaluates on media-query changes (rotate, resize, OS setting flip).
 */
export function useDeckMode(): DeckMode {
  const [mode, setMode] = useState<DeckMode>("deck");

  useEffect(() => {
    const queries = [RM, COARSE, NARROW].map((q) => window.matchMedia(q));
    const compute = (): DeckMode => {
      if (queries[0].matches) return "stack";
      if (queries[1].matches || queries[2].matches) return "snap";
      return "deck";
    };
    const onChange = () => setMode(compute());
    onChange();
    queries.forEach((mq) => mq.addEventListener("change", onChange));
    return () => queries.forEach((mq) => mq.removeEventListener("change", onChange));
  }, []);

  return mode;
}

/** Bounded current-slide index with relative + absolute movers. */
export function useDeckControls(count: number) {
  const [index, setIndex] = useState(0);

  const clamp = useCallback((k: number) => Math.min(count - 1, Math.max(0, k)), [count]);
  const go = useCallback((delta: number) => setIndex((i) => clamp(i + delta)), [clamp]);
  const jump = useCallback((k: number) => setIndex(clamp(k)), [clamp]);

  return { index, setIndex, go, jump };
}
