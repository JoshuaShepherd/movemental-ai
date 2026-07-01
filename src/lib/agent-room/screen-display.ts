/**
 * Visitor-facing labels for mounted sheets — behind-indicator and return affordances.
 */
import type { ComponentId } from "./stream-chunk";
import type { ScreenId } from "./acts";
import { isEngineExtra } from "./screen-map";

/** Display names for Ink Band stub screens (behind-indicator / ↩ affordance). */
export const SCREEN_DISPLAY_NAMES: Record<ScreenId, string> = {
  home: "Home",
  beat: "Reality check",
  readback: "Read-back",
  safety: "Safety",
  confirm: "Confirmation",
  path: "The path",
  founders: "Founders",
  leader: "Leader profile",
  about: "About",
  contact: "Contact",
  pricing: "Pricing",
  faq: "FAQ",
  capture: "Capture",
  safetyDashboard: "Safety dashboard",
  sandbox: "Sandbox",
  training: "Training",
  technology: "Technology",
  safetyFlow: "Safety flow",
};

const ENGINE_EXTRA_DISPLAY_NAMES: Partial<Record<ComponentId, string>> = {
  network: "Network",
  audience: "Audience",
  handoff_human: "Human handoff",
};

export function getScreenDisplayName(screenId: ScreenId): string {
  return SCREEN_DISPLAY_NAMES[screenId] ?? screenId;
}

export function getEngineExtraDisplayName(component: ComponentId): string {
  return ENGINE_EXTRA_DISPLAY_NAMES[component] ?? component;
}

/**
 * True when the expanded drawer should show the behind-sheet indicator.
 * Suppressed for full-bleed engine overlays (network / audience / handoff).
 */
export function shouldShowBehindIndicator(
  engineExtraComponent: ComponentId | null | undefined,
): boolean {
  if (!engineExtraComponent) return true;
  return !isEngineExtra(engineExtraComponent);
}

/** LOCAL `SCENES` runner target → Ink Band screen (G1 caption / reversal). */
export const LOCAL_SCENE_TO_SCREEN: Partial<Record<string, ScreenId>> = {
  cost: "pricing",
  whatIs: "about",
  talkToUs: "contact",
  toPath: "path",
  toFaq: "faq",
  whoBehind: "founders",
  toSafety: "safety",
  toSafetyFlow: "safetyFlow",
  toSandbox: "sandbox",
  toTraining: "training",
  toTechnology: "technology",
  toBeat: "beat",
};

export function getLocalSceneDisplayName(scene: string): string {
  const screenId = LOCAL_SCENE_TO_SCREEN[scene];
  return screenId ? getScreenDisplayName(screenId) : scene;
}
