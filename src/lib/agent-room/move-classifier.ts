/**
 * Agent Room — move classifier SSOT (hybrid handoff).
 *
 * Every visitor action is classified LOCAL (deterministic `SCENES` runner) or
 * AGENT (SSE turn) before the hybrid controller acts. Pure functions only.
 */
import { SCENES } from "./data/scenes";
import { DISCUSS_ENABLED } from "./discuss";
import { isMetaOrObjection, routeInput } from "./route-input";

/** Why a move routes to the live agent. */
export type AgentMoveReason = "open_text" | "discuss" | "agent_chip";

export type MoveRoute =
  | { kind: "local"; scene: string }
  | { kind: "local"; handler: "beat" | "leader" | "capture" }
  | { kind: "local"; scene: "discussOffer" }
  | { kind: "agent"; reason: AgentMoveReason };

export type ClassifyTextInput = {
  type: "text";
  text: string;
  /** Room phase — Discuss typed turns always go to the agent. */
  phase: "guide" | "discuss";
  freeTextStreak: number;
  fallbackStreak: number;
};

export type ClassifyChipInput = {
  type: "chip";
  /** Stub scene target from `SuggestChip.to`. */
  scene: string;
};

export type ClassifyMoveInput =
  | ClassifyTextInput
  | ClassifyChipInput
  | { type: "leader" }
  | { type: "beat" }
  | { type: "agent_chip" };

/** True when `scene` exists in the static `SCENES` table (or leader-aware names). */
export function isKnownScene(name: string): boolean {
  if (name === "leaderWork" || name === "leaderConnect") return true;
  return name in SCENES;
}

/**
 * Classify typed composer input for hybrid mode.
 * Guide: regex → local; meta/streak → discussOffer; unmatched → agent.
 * Discuss: always agent.
 */
export function classifyTypedInput(input: ClassifyTextInput): MoveRoute {
  const text = input.text.trim();
  if (!text) return { kind: "agent", reason: "open_text" };

  if (input.phase === "discuss") {
    return { kind: "agent", reason: "discuss" };
  }

  const target = routeInput(text);
  const nextFreeText = input.freeTextStreak + 1;
  const nextFallback = target === "fallback" ? input.fallbackStreak + 1 : 0;

  const implicit =
    isMetaOrObjection(text) || nextFreeText >= 3 || nextFallback >= 2;
  if (DISCUSS_ENABLED && implicit) {
    return { kind: "local", scene: "discussOffer" };
  }

  if (target !== "fallback") {
    return { kind: "local", scene: target };
  }

  return { kind: "agent", reason: "open_text" };
}

/** Classify a suggestion chip tap — always local when bound to a known scene. */
export function classifyChipTap(input: ClassifyChipInput): MoveRoute {
  if (isKnownScene(input.scene)) {
    return { kind: "local", scene: input.scene };
  }
  // Unknown chip target — treat as agent utterance fallback (should not happen in SSOT).
  return { kind: "agent", reason: "agent_chip" };
}

export function classifyMove(input: ClassifyMoveInput): MoveRoute {
  switch (input.type) {
    case "text":
      return classifyTypedInput(input);
    case "chip":
      return classifyChipTap(input);
    case "leader":
      return { kind: "local", handler: "leader" };
    case "beat":
      return { kind: "local", handler: "beat" };
    case "agent_chip":
      return { kind: "agent", reason: "agent_chip" };
    default:
      return { kind: "agent", reason: "open_text" };
  }
}

/** After classification, whether the typed-input streak counters should reset. */
export function shouldResetTextStreak(route: MoveRoute): boolean {
  return route.kind === "local" && "scene" in route && route.scene === "discussOffer";
}

/** Whether a fallback streak increment applies for this typed route. */
export function isTypedFallback(route: MoveRoute): boolean {
  return route.kind === "agent" && route.reason === "open_text";
}
