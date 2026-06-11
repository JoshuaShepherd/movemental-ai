/**
 * Qualitative signals for interpretive views — not fabricated KPIs.
 */

export type LegibilitySignal = "low" | "medium" | "high";

export type LegibilityProfile = {
  canonicalSpine: LegibilitySignal;
  transcriptCoverage: LegibilitySignal;
  internalLinking: LegibilitySignal;
  entityClarity: LegibilitySignal;
  topicDepth: LegibilitySignal;
  multilingualReach: LegibilitySignal;
};

export function describeLegibility(profile: LegibilityProfile): string {
  const highs = Object.entries(profile).filter(([, v]) => v === "high").length;
  if (highs >= 5) {
    return "The corpus reads as a coherent intellectual system: stable anchors, legible transcripts, and clear thematic spine.";
  }
  if (highs >= 3) {
    return "Structure is emerging: some anchors exist, but pathways, translations, or transcripts may still be uneven.";
  }
  return "The work is present, but the system is still fragmented, high-value ideas may remain under-linked and under-transcribed.";
}
