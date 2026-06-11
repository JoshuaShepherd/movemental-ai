export const SSSS_INTEGRITY_VERSION = "ssss-i-v1" as const;

export type SsssStageId = "Safety" | "Sandbox" | "Training" | "Technology" | "Cross";

export type SsssIllusionId =
  | "none"
  | "honesty_gap"
  | "inversion_profile"
  | "solutions_without_evidence"
  | "skills_theater"
  | "shadow_sandbox"
  | "safety_paper";

export type SsssIntegrityItem = {
  readonly id: string;
  readonly stage: SsssStageId;
  readonly category: string;
  readonly weight: number;
  readonly prompt: string;
};

export type SsssIntegrityResult = {
  readonly version: typeof SSSS_INTEGRITY_VERSION;
  /** Sum(score × weight) / max possible (95 with default weights). */
  readonly normalizedOverall: number;
  readonly normalizedOverallPercent: number;
  readonly stagePercents: Record<Exclude<SsssStageId, "Cross">, number> & { Cross: number };
  readonly topWeaknesses: readonly {
    readonly id: string;
    readonly stage: SsssStageId;
    readonly category: string;
    readonly prompt: string;
    readonly score: number;
  }[];
  readonly weakestCategoryByStage: Partial<
    Record<Exclude<SsssStageId, "Cross">, { readonly category: string; readonly avg: number }>
  >;
  readonly illusionFlags: readonly SsssIllusionId[];
  readonly likelyIllusion: SsssIllusionId;
  readonly band: { readonly label: string; readonly primaryRisk: string };
  readonly next90Days: { readonly focus: string; readonly stop: string };
  readonly dominantGapStage: Exclude<SsssStageId, "Cross">;
};
