/**
 * Agent Room — the locked prototype contract, ported verbatim (AF-01 / AF-03).
 *
 * Copied from the SSOT prototype header (`movemental-agentic-front-end/js/app.js`):
 *
 *   THE CONTRACT (locked)
 *   SCREENS (closed set the agent may put on the wall):
 *      home · beat · readback · safety · confirm · path · founders · leader · about · contact · pricing · faq
 *   ACTS (the agent's whole vocabulary per turn):
 *      say      → write one ink line (the voice)        [stream: text_delta]
 *      show     → put a screen up (clears the wall)     [stream: ui_render]
 *      gesture  → underline | circle | arrow at a target[stream: ink_gesture]
 *      wait     → a beat of silence
 *      suggest  → offer utterance chips
 *      clear    → housekeeping: wipe ink in place (not an expressive act)
 *   A scene is an ordered list of acts. ONE runner, play(), performs any scene.
 *   Choreography is therefore DATA (see SCENES), not bespoke code.
 *
 * This file is the typed source of truth for that contract. The act *runner*
 * (`play`) lands in AF-05 (`scene-runner.ts`); the screen *registry* in AF-07.
 *
 * NOTE — this closed set is the Ink Band set, NOT the live engine's
 * `ComponentId` enum in `stream-chunk.ts` (which lacks `home`/`about`/`contact`/
 * `faq`/`safety`/`leader` and adds `network`/`audience`/`handoff_human`).
 * Reconciling the two is deferred to AF-90 / INT-01 — do not collapse them here.
 */

/** The closed set of screens the agent may put on the wall. */
export const SCREEN_IDS = [
  "home",
  "beat",
  "readback",
  "safety",
  "confirm",
  "path",
  "founders",
  "leader",
  "about",
  "contact",
  "pricing",
  "faq",
  "capture",
] as const;

export type ScreenId = (typeof SCREEN_IDS)[number];

/** The agent's whole vocabulary per turn. */
export const ACT_KINDS = [
  "say",
  "show",
  "gesture",
  "wait",
  "suggest",
  "clear",
] as const;

export type ActKind = (typeof ACT_KINDS)[number];

/** Gesture vocabulary drawn over the screen (ink overlay). */
export type GestureKind = "underline" | "circle" | "arrow";

/** A suggested utterance chip: a label and the scene it routes to. */
export interface SuggestChip {
  label: string;
  /** Marks the primary / leading chip. */
  lead?: boolean;
  /** Scene name to `run()` when tapped. */
  to: string;
}

/**
 * One act. A scene is an ordered `Act[]`; the single runner (`play`, AF-05)
 * performs any scene. Shapes mirror the prototype's act objects exactly.
 */
/** Optional opts a `show` act carries (beat question index, confirm mode, leader index). */
export interface ShowOpts {
  qi?: number;
  mode?: string;
  id?: number;
  /** Capture variant for the `capture` screen (map | paid | free). */
  kind?: string;
}

export type Act =
  | { say: string }
  | ({ show: ScreenId } & ShowOpts)
  | { gesture: GestureKind; target?: string }
  | { wait: number }
  | { suggest: SuggestChip[] }
  | { await: "capture" }
  | { clear: true };

/** A scene is an ordered list of acts (or a function that builds one lazily). */
export type Scene = Act[];
export type SceneFactory = () => Scene;
