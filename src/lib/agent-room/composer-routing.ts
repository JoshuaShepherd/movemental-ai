/**
 * Stream-mode composer chip routing (PAR-02).
 *
 * Stub binds chips to `run(to)`; stream must not accidentally fork the same
 * label into an unrelated backend. See parity matrix § Default composer chips.
 */
import { BEAT_INTRO_SUGGEST_CHIPS } from "./local-choreography";

/** Mirrors `Suggestion` in `composer.tsx` — kept here to avoid lib→component imports. */
export type StreamSuggestion = { label: string; say: string; lead?: boolean };

/** How a default suggestion is handled in stream mode. */
export type StreamChipRoute =
  | { kind: "local"; scene: "beatIntro" }
  | { kind: "agent"; utterance: string };

/**
 * Post–beatIntro chips (stub: `SCENES.beatIntro` suggest). The `to` field is
 * stub-only; stream sends `utterance` to the agent.
 */
export const BEAT_INTRO_AGENT_CHIPS: ReadonlyArray<{ label: string; utterance: string; lead?: boolean }> =
  BEAT_INTRO_SUGGEST_CHIPS.map((c) => ({
    label: c.label,
    utterance: c.label,
    lead: c.lead,
  }));

/** Labels from `DEFAULT_SUGGESTIONS` → stream routing. */
const STREAM_CHIP_ROUTES: Record<string, StreamChipRoute> = {
  "Get a clear next AI step": { kind: "local", scene: "beatIntro" },
  "About Movemental": { kind: "agent", utterance: "About Movemental" },
  "Who’s behind this?": { kind: "agent", utterance: "Who's behind this?" },
  "What does it cost?": { kind: "agent", utterance: "What does it cost?" },
  "Read the FAQ": { kind: "agent", utterance: "Read the FAQ" },
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
