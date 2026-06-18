import type { AiRealityStage } from "./types";
import { PATH_STAGE_DISPLAY, PATH_STAGE_LABELS } from "@/lib/agent-room/naming";

/** Canonical public path labels — re-exported for assessment ↔ agent-room bridges. */
export { PATH_STAGE_LABELS as PUBLIC_STAGE_LABELS, PATH_STAGE_DISPLAY };

export type PublicStageId = keyof typeof PATH_STAGE_LABELS;

/** Render the canonical public label for a path stage id. */
export function publicStageLabel(id: PublicStageId): string {
  return PATH_STAGE_LABELS[id];
}

/** Internal / legacy stage ids → public path names. */
const SSSS_TO_PUBLIC: Record<string, AiRealityStage> = {
  Safety: "Safety",
  Sandbox: "Sandbox",
  Skills: "Training",
  Training: "Training",
  Solutions: "Tech",
  Technology: "Tech",
  Tech: "Tech",
};

/** Map an internal assessment stage label to the public path name. */
export function ssssStageToPublic(stage: string): AiRealityStage {
  return SSSS_TO_PUBLIC[stage] ?? (stage as AiRealityStage);
}

/** Map public path stage to the legacy DB column suffix (stage_skills, stage_solutions). */
export function publicStageToDbColumn(stage: AiRealityStage): "safety" | "sandbox" | "skills" | "solutions" {
  switch (stage) {
    case "Safety":
      return "safety";
    case "Sandbox":
      return "sandbox";
    case "Training":
      return "skills";
    case "Tech":
      return "solutions";
  }
}
