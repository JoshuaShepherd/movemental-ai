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

export const READBACK_EMAIL_INPUT_ID = "readbackEmail";

/** Scroll the inline readback email field into view and focus it. */
export function focusReadbackMapEmail(): void {
  if (typeof document === "undefined") return;
  const el = document.getElementById(READBACK_EMAIL_INPUT_ID);
  if (!(el instanceof HTMLInputElement)) return;
  el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  el.focus();
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
  return handleDiscussChipTarget(to, enterDiscuss, run, context);
}
