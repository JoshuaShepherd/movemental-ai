/**
 * Agent Room — Discuss entry resolution (Layer 3 triggers).
 *
 * Central SSOT for when typed input or chip taps should offer Discuss, enter
 * Discuss, or fall through to normal Guide routing. Used by stub, hybrid, and
 * stream controllers so trigger behavior cannot drift.
 */
import {
  DISCUSS_CHIP_TARGET,
  DISCUSS_ENABLED,
  type DiscussReason,
  type RoomPhase,
} from "./discuss";
import { isMetaOrObjection, routeInput } from "./route-input";

export type DiscussEntryAction =
  | { kind: "enter"; reason: DiscussReason }
  | { kind: "offer" }
  | { kind: "noop" };

/** Honest opener when stub enters Discuss (no fake LLM). */
export const STUB_DISCUSS_OPENER =
  "That deserve**s** a real conversation, more than I can script here. Leave your email and the team will pick it up with you.";

export type DiscussChipContext = {
  /** Last scene the runner played — used to infer post-readback entry. */
  lastScene?: string;
};

/**
 * Resolve a chip `to` target into a Discuss entry reason, or null if not a
 * Discuss entry chip.
 */
export function resolveDiscussChip(
  to: string,
  context: DiscussChipContext = {},
): DiscussReason | null {
  if (to !== DISCUSS_CHIP_TARGET) return null;
  if (context.lastScene === "readback") return "post-readback";
  return "user";
}

/**
 * When a chip targets Discuss entry and the feature flag is on, call
 * `enterDiscuss(reason)` instead of running the legacy capture scene.
 */
export function handleDiscussChipTarget(
  to: string,
  enterDiscuss: (reason?: DiscussReason) => void,
  run: (scene: string) => void,
  context: DiscussChipContext = {},
): boolean {
  const reason = resolveDiscussChip(to, context);
  if (!reason || !DISCUSS_ENABLED) {
    run(to);
    return false;
  }
  enterDiscuss(reason);
  return true;
}

export type TypedDiscussSignalInput = {
  text: string;
  phase: RoomPhase;
  /** Active screen id — beat blocks implicit offer (design §4.4). */
  screenId?: string;
  freeTextStreak: number;
  fallbackStreak: number;
};

/**
 * Classify whether typed Guide input should offer Discuss (consent), enter Discuss,
 * or continue normal routing. Does not perform regex routing itself.
 */
export function resolveTypedDiscussSignal(
  input: TypedDiscussSignalInput,
): DiscussEntryAction {
  const text = input.text.trim();
  if (!text) return { kind: "noop" };

  if (input.phase === "discuss") {
    return { kind: "noop" };
  }

  if (input.screenId === "beat") {
    return { kind: "noop" };
  }

  const target = routeInput(text);
  const nextFreeText = input.freeTextStreak + 1;
  const nextFallback = target === "fallback" ? input.fallbackStreak + 1 : 0;

  const implicit =
    isMetaOrObjection(text) || nextFreeText >= 3 || nextFallback >= 2;

  if (DISCUSS_ENABLED && implicit) {
    return { kind: "offer" };
  }

  return { kind: "noop" };
}
