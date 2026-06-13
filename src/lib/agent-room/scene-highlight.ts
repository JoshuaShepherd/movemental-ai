import type { ComposerChip } from "@/components/agent-room/composer";

import { FREE_HANDBOOK_CTA } from "./naming";

/**
 * At most one fluorescent highlighter swipe per scene — on ONE float chip label.
 * In-scene `.hl` spans are chosen separately in screen markup (opening hero, etc.).
 */
export function highlightChipForScene(
  screenId: string,
  suggestions: ComposerChip[],
): string | null {
  const labels = new Set(suggestions.map((s) => s.label));
  const pick = (label: string) => (labels.has(label) ? label : null);

  switch (screenId) {
    case "home":
      return pick("Get a clear next AI step");
    case "pricing":
      // Highlighter lives on the Safety free card CTA (wayLead), not a float chip.
      return null;
    case "readback":
      return (
        pick("Want this for your actual organization?") ??
        pick(FREE_HANDBOOK_CTA) ??
        pick("See what Sandbox looks like")
      );
    case "safetyDashboard":
      return pick("Get started with the dashboard");
    case "safety":
      return pick("Start free, guided");
    case "path":
      return pick("Show me Safety");
    case "safetyFlow":
      return null;
    case "beat":
    case "leader":
    case "about":
    case "founders":
    case "faq":
    case "contact":
      return null;
    default:
      return null;
  }
}
