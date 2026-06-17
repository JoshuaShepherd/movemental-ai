/**
 * Agent Room — the single source of truth mapping the engine's render
 * vocabulary (`ComponentId`) to the Ink Band screen set (`ScreenId`). INT-01.
 *
 * Decision A (see INT-01 §10): the engine `ComponentId` enum was extended to
 * speak the Ink Band screen names directly, so the 13 Ink Band screens map 1:1.
 * The 3 engine-extra ids (`network` / `audience` / `handoff_human`) are NOT in
 * the Ink Band closed `ScreenId` set; they map to `null` here and are rendered
 * by the client's ComponentId-keyed renderer (`screen/screen.tsx`) directly —
 * disposition = **render**, never routed through `ScreenId`.
 *
 * The `satisfies` clauses are the rail: adding or renaming a `ComponentId` (or a
 * `ScreenId`) without updating its entry here is a **compile error** on this
 * file. This is the one place the two namespaces are reconciled — keep
 * `COMPONENT_IDS` (`stream-chunk.ts`), the engine `ComponentId` (`ai/types.ts`),
 * and these tables in lockstep.
 */
import type { ComponentId } from "./stream-chunk";
import type { ScreenId } from "./acts";

/**
 * `ComponentId` → Ink Band `ScreenId`, or `null` for engine-extra ids that have
 * no Ink Band screen (rendered directly by the client renderer).
 */
export const COMPONENT_TO_SCREEN = {
  // --- Ink Band screens (1:1) ---
  home: "home",
  beat: "beat",
  readback: "readback",
  safety: "safety",
  confirm: "confirm",
  path: "path",
  founders: "founders",
  leader: "leader",
  about: "about",
  contact: "contact",
  pricing: "pricing",
  faq: "faq",
  capture: "capture",
  safetyFlow: "safetyFlow",
  // --- Engine-extra: no Ink Band screen; rendered directly ---
  network: null,
  audience: null,
  handoff_human: null,
} satisfies Record<ComponentId, ScreenId | null>;

/**
 * Reverse table: every Ink Band `ScreenId` resolves to the `ComponentId` of the
 * same name (the engine can be asked to render any Ink Band screen).
 */
export const SCREEN_TO_COMPONENT = {
  home: "home",
  beat: "beat",
  readback: "readback",
  safety: "safety",
  confirm: "confirm",
  path: "path",
  founders: "founders",
  leader: "leader",
  about: "about",
  contact: "contact",
  pricing: "pricing",
  faq: "faq",
  capture: "capture",
  safetyFlow: "safetyFlow",
  /** Funnel-only stub screen; engine maps to `safety` until a dedicated component exists. */
  safetyDashboard: "safety",
  /** Stage screens — stub-only until engine ComponentIds exist. */
  sandbox: "path",
  training: "path",
  technology: "path",
} satisfies Record<ScreenId, ComponentId>;

/** The Ink Band screen a rendered component maps to, or `null` if engine-extra. */
export function toScreenId(component: ComponentId): ScreenId | null {
  return COMPONENT_TO_SCREEN[component];
}

/** The `ComponentId` the agent renders for a given Ink Band screen. */
export function toComponentId(screen: ScreenId): ComponentId {
  return SCREEN_TO_COMPONENT[screen];
}

/** True when a `ComponentId` has no Ink Band screen (rendered directly). */
export function isEngineExtra(component: ComponentId): boolean {
  return COMPONENT_TO_SCREEN[component] === null;
}
