/**
 * Stream-mode composer chip routing (PAR-02).
 *
 * Stub binds chips to `run(to)`; stream must not accidentally fork the same
 * label into an unrelated backend. See parity matrix § Default composer chips.
 */

/** Mirrors `Suggestion` in `composer.tsx` — kept here to avoid lib→component imports. */
export type StreamSuggestion = { label: string; say: string; lead?: boolean };

/** How a default suggestion is handled in stream mode. */
export type StreamChipRoute =
  | { kind: "local"; scene: "toBeatCold" }
  | { kind: "agent"; utterance: string };

/** Labels from `DEFAULT_SUGGESTIONS` → stream routing. */
const STREAM_CHIP_ROUTES: Record<string, StreamChipRoute> = {
  "Get a clear next AI step": { kind: "local", scene: "toBeatCold" },
  "About Movemental": { kind: "agent", utterance: "About Movemental" },
  "What does it cost?": { kind: "agent", utterance: "What does it cost?" },
  "Get in touch": { kind: "agent", utterance: "Get in touch" },
};

export function resolveStreamChipRoute(suggestion: StreamSuggestion): StreamChipRoute {
  return (
    STREAM_CHIP_ROUTES[suggestion.label] ?? {
      kind: "agent",
      utterance: suggestion.say,
    }
  );
}
