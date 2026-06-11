/**
 * Non-scene composer chip targets — actions that stay on the current sheet
 * instead of routing to a `SCENES` entry (Discuss entry lives in discuss-entry.ts).
 */
import type { DiscussReason } from "./discuss";
import {
  handleDiscussChipTarget,
  type DiscussChipContext,
} from "./discuss-entry";

/** Chip `to` value — focuses the inline readback email field (no scene swap). */
export const MAP_EMAIL_CHIP_TARGET = "focusMapEmail";

/** Chip `to` value — expands the dock and focuses the handbook email capture. */
export const HANDBOOK_EMAIL_CHIP_TARGET = "focusHandbook";

/** Chip `to` value — full Safety dashboard enrollment (name, org, Stripe payment). */
export const ENROLL_CHIP_TARGET = "toEnroll";

export const READBACK_EMAIL_INPUT_ID = "readbackEmail";

export const HANDBOOK_EMAIL_INPUT_ID = "handbookEmail";

export const FOCUS_HANDBOOK_EMAIL_EVENT = "agent-room:focus-handbook";

/** Scroll the inline readback email field into view and focus it. */
export function focusReadbackMapEmail(): void {
  if (typeof document === "undefined") return;
  const el = document.getElementById(READBACK_EMAIL_INPUT_ID);
  if (!(el instanceof HTMLInputElement)) return;
  el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  el.focus();
}

/** Expand the agent dock, highlight handbook capture, and focus the email field. */
export function focusHandbookEmail(): void {
  if (typeof document === "undefined") return;
  document.dispatchEvent(new CustomEvent(FOCUS_HANDBOOK_EMAIL_EVENT));
  requestAnimationFrame(() => {
    const el = document.getElementById(HANDBOOK_EMAIL_INPUT_ID);
    if (!(el instanceof HTMLInputElement)) return;
    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    el.focus();
  });
}

/**
 * Resolve a chip `to` target. Returns true when handled without calling `run` for
 * a normal scene (Discuss entry and map-email focus are handled here).
 */
export function handleSuggestChipTarget(
  to: string,
  enterDiscuss: (reason?: DiscussReason) => void,
  run: (scene: string) => void,
  context: DiscussChipContext = {},
): boolean {
  if (to === MAP_EMAIL_CHIP_TARGET) {
    focusReadbackMapEmail();
    return true;
  }
  if (to === HANDBOOK_EMAIL_CHIP_TARGET) {
    focusHandbookEmail();
    return true;
  }
  if (to === ENROLL_CHIP_TARGET) {
    if (typeof window !== "undefined") {
      window.location.assign("/enroll");
    }
    return true;
  }
  return handleDiscussChipTarget(to, enterDiscuss, run, context);
}
