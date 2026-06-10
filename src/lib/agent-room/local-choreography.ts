/**
 * Local Choreography Layer — deterministic scenes that run in **stream mode
 * without the LLM** (PAR-01).
 *
 * Classification (see `docs/build/agent-room-stub-stream-parity-matrix.md`):
 *
 * | Beat            | Class  | When |
 * | --------------- | ------ | ---- |
 * | `OPENING`       | LOCAL  | Load + REPLAY |
 * | `BEAT_INTRO`    | LOCAL  | Lead chip "Get a clear next AI step" (stream only handoff) |
 *
 * Handoff rule: local choreography **ends** when the visitor sends a composer
 * action classified AGENT (or taps a post-local chip like "Okay, map it").
 * `use-agent-room-stream` bumps `localGen` to cancel in-flight local scenes.
 *
 * Stub mode may call the same helpers for parity; it still uses `run("opening")`
 * / `run("beatIntro")` over full `SCENES` entries (including `show`/`suggest`).
 */
import type { Scene, SuggestChip } from "./acts";
import { SCENES } from "./data/scenes";
import { playScene, type Generation, type RunnerContext } from "./scene-runner";

/** Strip screen/suggest acts — stream already shows home + static composer chips. */
function inkActsOnly(scene: Scene): Scene {
  return scene.filter((act) => !("show" in act) && !("suggest" in act));
}

/** Opening: waits, spoken line, underline on `#phrase`. */
export const OPENING_CHOREOGRAPHY: Scene = inkActsOnly(SCENES.opening);

/** Cold-entry bridge before the diagnostic (opening lead chip only). */
export const BEAT_INTRO_CHOREOGRAPHY: Scene = inkActsOnly(SCENES.beatIntro);

/** Chips emitted after a local scene completes (stream binds actions upstream). */
export const BEAT_INTRO_SUGGEST_CHIPS: readonly SuggestChip[] = [
  { label: "Okay, map it", lead: true, to: "toBeat" },
];

/** Named map for auditors / tests. */
export const LOCAL_CHOREOGRAPHY = {
  opening: OPENING_CHOREOGRAPHY,
  beatIntro: BEAT_INTRO_CHOREOGRAPHY,
} as const;

export type LocalChoreographyKey = keyof typeof LOCAL_CHOREOGRAPHY;

type LocalCtx = Pick<RunnerContext, "clearInk" | "say" | "gesture" | "setBusy">;

function noopRunnerCtx(ctx: LocalCtx): RunnerContext {
  return {
    ...ctx,
    show: () => {},
    suggest: () => {},
    awaitCapture: async () => ({}),
  };
}

export async function playLocalChoreography(
  key: LocalChoreographyKey,
  ctx: LocalCtx,
  gen: Generation,
): Promise<void> {
  return playScene(LOCAL_CHOREOGRAPHY[key], noopRunnerCtx(ctx), gen);
}

export async function playOpeningChoreography(ctx: LocalCtx, gen: Generation): Promise<void> {
  return playLocalChoreography("opening", ctx, gen);
}

export async function playBeatIntroChoreography(ctx: LocalCtx, gen: Generation): Promise<void> {
  return playLocalChoreography("beatIntro", ctx, gen);
}

/** Boot once fonts settle — matches the prototype + stub runner. */
export function scheduleLocalChoreography(boot: () => void): () => void {
  let cancelled = false;
  const run = () => {
    if (!cancelled) boot();
  };
  if (typeof document !== "undefined" && "fonts" in document) {
    document.fonts.ready.then(run).catch(run);
  } else {
    run();
  }
  return () => {
    cancelled = true;
  };
}
