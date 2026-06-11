import type { AiRealityStage } from "./types";

/** Internal SSSS stage ids (stable in assessment code) → public path names. */
const SSSS_TO_PUBLIC: Record<string, AiRealityStage> = {
  Safety: "Safety",
  Sandbox: "Sandbox",
  Skills: "Training",
  Solutions: "Tech",
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
