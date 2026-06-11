/**
 * Agent Room — the ONE stub runner (AF-05). Ports `js/runner.js`: a single
 * `playScene` walks a scene's acts in order, awaiting the timed ones, with a
 * generation guard so a newer turn (e.g. `goHome`) supersedes an in-flight scene.
 *
 * This file is the framework-agnostic core: the act loop + helpers. The React
 * glue (state, refs, `run`/`goHome`, boot) lives in `use-agent-room-stub.ts`,
 * which supplies a `RunnerContext` of act handlers wired to the ink layer
 * (AF-04) and screen/suggestion state. No network — choreography is local DATA
 * (`data/scenes.ts`, AF-06). The stream path is the untouched AF-90 counterpart.
 */
import type { GestureKind, ScreenId, Scene, ShowOpts, SuggestChip } from "./acts";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** `sleep(ms)` — a beat of silence; collapses to 0 under reduced motion. */
export const sleep = (ms: number): Promise<void> =>
  new Promise((r) => setTimeout(r, prefersReduced() ? 0 : ms));

/** A mutable generation token shared between the runner and `goHome`. */
export interface Generation {
  value: number;
}

/** The act handlers a host wires to the ink layer + screen/suggestion state. */
export interface RunnerContext {
  clearInk: () => void;
  /** Wipe committed voice lines (paired with `clear` acts before a new beat). */
  clearVoice: () => void;
  say: (text: string) => Promise<void>;
  show: (id: ScreenId, opts: ShowOpts) => void;
  gesture: (kind: GestureKind, target: string) => Promise<void>;
  suggest: (chips: SuggestChip[]) => void;
  setBusy: (busy: boolean) => void;
  /** Pause until the rendered capture form submits (or is abandoned). */
  awaitCapture: () => Promise<{ cancelled?: boolean }>;
}

/**
 * Perform one scene's acts in order (prototype `play`). Bumps the generation so
 * an in-flight scene bails the moment a newer one starts (the `myGen !== gen`
 * guard) — that's how `goHome`/replay cut a scene short cleanly.
 */
export async function playScene(scene: Scene, ctx: RunnerContext, gen: Generation): Promise<void> {
  const myGen = (gen.value += 1);
  ctx.setBusy(true);
  for (const act of scene) {
    if (myGen !== gen.value) return; // a newer turn superseded this one
    if ("wait" in act) await sleep(act.wait);
    else if ("clear" in act) {
      ctx.clearInk();
      ctx.clearVoice();
    }
    else if ("say" in act) await ctx.say(act.say);
    else if ("show" in act)
      ctx.show(act.show, {
        qi: act.qi,
        mode: act.mode,
        id: act.id,
        kind: act.kind,
        singleQuestionHint: act.singleQuestionHint,
      });
    else if ("gesture" in act) await ctx.gesture(act.gesture, act.target ?? "");
    else if ("suggest" in act) ctx.suggest(act.suggest);
    else if ("await" in act) {
      const res = await ctx.awaitCapture();
      if (myGen !== gen.value) return; // a newer turn superseded during the wait
      if (res.cancelled) return; // skipped/abandoned (e.g. Home pressed)
    }
  }
  if (myGen === gen.value) ctx.setBusy(false);
}
