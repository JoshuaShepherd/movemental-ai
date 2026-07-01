import type { ComponentId } from "./stream-chunk";
import { OPENING_CHIP_RENDER_COMPONENT } from "./renderable-topics";

/**
 * Composer chip routing — stream mode (PAR-02) + dock-context hybrid routing.
 *
 * **Stream (Option A):** `resolveStreamChipRoute` keeps default opening chips on
 * agent utterances — legacy full-AI regression path only.
 *
 * **Hybrid:** `resolveChipRoute(..., surface)` — collapsed dock opens local
 * scenes; expanded drawer keeps informational chips conversational.
 */

/** Mirrors `Suggestion` in `composer.tsx` — kept here to avoid lib→component imports. */
export type StreamSuggestion = { label: string; say: string; lead?: boolean };

/** Local scenes for default opening chip labels (mirrors `SCENES.opening` suggest targets). */
export type OpeningChipScene = "toSafetyFlow" | "whatIs" | "cost" | "talkToUs";

/** How a default suggestion is handled. */
export type ChipRoute =
  | { kind: "local"; scene: OpeningChipScene }
  | { kind: "agent"; utterance: string; renderComponent?: ComponentId }
  | { kind: "navigate"; href: string };

/** @deprecated Alias — prefer `ChipRoute`. */
export type StreamChipRoute = ChipRoute;

/** Collapsed float chips vs expanded drawer / ways-in-adjacent chips. */
export type ChipSurface = "collapsed" | "expanded";

/** Opening labels → local scene (`run(name)`). */
const OPENING_CHIP_LOCAL_SCENES: Record<string, OpeningChipScene> = {
  "Get a clear next AI step": "toSafetyFlow",
  "About Movemental": "whatIs",
  "What does it cost?": "cost",
  "Get in touch": "talkToUs",
};

/** Labels from `DEFAULT_SUGGESTIONS` → expanded-drawer / legacy stream routing (G4 speak-and-show). */
const EXPANDED_DRAWER_CHIP_ROUTES: Record<string, ChipRoute> = {
  "Get a clear next AI step": { kind: "local", scene: "toSafetyFlow" },
  "About Movemental": {
    kind: "agent",
    utterance: "About Movemental",
    renderComponent: OPENING_CHIP_RENDER_COMPONENT["About Movemental"],
  },
  "What does it cost?": {
    kind: "agent",
    utterance: "What does it cost?",
    renderComponent: OPENING_CHIP_RENDER_COMPONENT["What does it cost?"],
  },
  "Get in touch": {
    kind: "agent",
    utterance: "Get in touch",
    renderComponent: OPENING_CHIP_RENDER_COMPONENT["Get in touch"],
  },
};

/** @deprecated AU-20 — use `EXPANDED_DRAWER_CHIP_ROUTES`. */
const STREAM_CHIP_ROUTES = EXPANDED_DRAWER_CHIP_ROUTES;

/** Local scene for a known opening chip label, if any. */
export function getOpeningChipLocalScene(label: string): OpeningChipScene | null {
  return OPENING_CHIP_LOCAL_SCENES[label] ?? null;
}

/**
 * Hybrid + dock-aware chip resolution.
 * Collapsed → screen-first local scenes; expanded → agent utterances for info chips.
 */
export function resolveChipRoute(
  suggestion: StreamSuggestion,
  surface: ChipSurface,
): ChipRoute {
  const localScene = getOpeningChipLocalScene(suggestion.label);
  if (surface === "collapsed" && localScene) {
    return { kind: "local", scene: localScene };
  }

  const streamRoute = STREAM_CHIP_ROUTES[suggestion.label];
  if (streamRoute) return streamRoute;

  return { kind: "agent", utterance: suggestion.say };
}

/** Stream mode — unchanged expanded-drawer / full-AI bias (Option A). */
export function resolveStreamChipRoute(suggestion: StreamSuggestion): ChipRoute {
  return (
    STREAM_CHIP_ROUTES[suggestion.label] ?? {
      kind: "agent",
      utterance: suggestion.say,
    }
  );
}

/**
 * Labels in `DEFAULT_SUGGESTIONS` with explicit stream routing — absent for scene follow-ups.
 * **Expanded-drawer / stream-mode bias** — hybrid collapsed dock uses `resolveChipRoute`.
 */
export function getKnownStreamChipRoute(label: string): ChipRoute | null {
  return STREAM_CHIP_ROUTES[label] ?? null;
}
