/**
 * Opening choreography — scripted ink voice + gestures on load/replay.
 *
 * Separate from the live agent (stream SSE). The prototype always played this
 * locally on `fonts.ready`; stub mode still does via `run("opening")`. Stream
 * mode skips the `show`/`suggest` acts (screen is already home; composer chips
 * come from `DEFAULT_SUGGESTIONS`) but must still run the timed `say` + `gesture`
 * beats so the room feels alive before the visitor talks to the agent.
 */
import type { Scene } from "./acts";
import { SCENES } from "./data/scenes";
import { playScene, type Generation, type RunnerContext } from "./scene-runner";

/** The ink acts from `SCENES.opening` — waits, spoken line, underline gesture. */
export const OPENING_CHOREOGRAPHY: Scene = SCENES.opening.filter(
  (act) => !("show" in act) && !("suggest" in act),
);

export async function playOpeningChoreography(
  ctx: Pick<RunnerContext, "clearInk" | "say" | "gesture" | "setBusy">,
  gen: Generation,
): Promise<void> {
  return playScene(
    OPENING_CHOREOGRAPHY,
    {
      ...ctx,
      show: () => {},
      suggest: () => {},
      awaitCapture: async () => ({}),
    },
    gen,
  );
}

/** Boot once fonts settle — matches the prototype + stub runner. */
export function scheduleOpeningChoreography(boot: () => void): () => void {
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
