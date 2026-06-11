import type { SsssIllusionId } from "@/lib/ssss-integrity-assessment";

import type { AiRealityStage } from "./types";

/**
 * Plain-English translations of the illusion flags — the voice of the existing
 * map gap-lines and agent `say` copy: plain, honest, no hype. No internal flag
 * names ("safety_paper", "shadow_sandbox") ever reach the screen.
 */
export const ILLUSION_PLAIN_ENGLISH: Record<Exclude<SsssIllusionId, "none">, string> = {
  safety_paper: "A policy on paper that nobody trains against.",
  shadow_sandbox: "People are experimenting, but off to the side — no shared record of what's been tried.",
  skills_theater: "Training has happened, but there's no shared log proving people actually got better.",
  solutions_without_evidence: "Tools are rolling out faster than the evidence that they work.",
  honesty_gap: "The scores look healthy, but the team can't yet say out loud where it's skipping steps.",
  inversion_profile: "Several signs point the same way: buying and deploying ahead of safety and skill.",
};

export function illusionPlainEnglish(id: SsssIllusionId): string {
  return id === "none" ? "" : ILLUSION_PLAIN_ENGLISH[id];
}

/**
 * Public label for a 6-question map stage. The map's internal vocabulary
 * ("training", "tech") is renamed to the public path ("Skills", "Solutions")
 * so the front door and the dashboard speak one language.
 */
export function mapStagePublicLabel(stage: string): string {
  switch (stage) {
    case "safety":
      return "Safety";
    case "sandbox":
      return "Sandbox";
    case "training":
      return "Skills";
    case "tech":
      return "Solutions";
    default:
      return stage.charAt(0).toUpperCase() + stage.slice(1);
  }
}

/** The fixed placement truth: the first move is always Safety. */
export const PLACEMENT_LINE =
  "Wherever the scores land, the first move is the same one: Safety. That's where you are on the path.";

/** Plain sentence naming the sharpest gap, in the map's gap-line voice. */
export function dominantGapLine(stage: AiRealityStage, respondedCount: number): string {
  const team = respondedCount > 1 ? "your team's" : "your";
  switch (stage) {
    case "Safety":
      return `The sharpest gap is Safety. ${cap(team)} weakest answers are about boundaries — what you will and won't do with AI, in writing, that people actually train against.`;
    case "Sandbox":
      return `The sharpest gap is Sandbox. Safety is holding, but there's no shared record of what AI has actually been tried against real work — experiments aren't leaving a trail anyone can point to.`;
    case "Skills":
      return `The sharpest gap is Skills. The scaffolding exists, but judgment isn't yet distributed — people can press the buttons faster than they can tell good output from bad.`;
    case "Solutions":
      return `The sharpest gap is Solutions. The groundwork is real; the missing piece is AI living inside actual workflows, with owners and gates, rather than as one-off tools.`;
  }
}

export function divergenceLine(stages: AiRealityStage[], respondedCount: number): string {
  if (respondedCount <= 1) {
    return "Only one person has answered so far, so there's no team agreement to read yet — invite the rest of your leadership to see where you align and where you split.";
  }
  if (stages.length === 0) {
    return "Your leadership team answered close together across every stage — there's broad agreement on where you stand.";
  }
  const list = stages.join(" and ");
  return `Your leadership disagrees most on ${list}. That split is worth a conversation before anything else — when leaders read the same stage differently, the gap is usually real on one side.`;
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
