import type { SsssIllusionId } from "@/lib/ssss-integrity-assessment";

/** The four stages of the AI Reality path, in their fixed public order. */
export const AI_REALITY_STAGES = ["Safety", "Sandbox", "Training", "Technology"] as const;
export type AiRealityStage = (typeof AI_REALITY_STAGES)[number];

export const AI_REALITY_ORG_VERSION = "ai-reality-org-v1" as const;

/** Public names. Internal instrument names ("SSSS", "MAP_Q", "Phase 02") must
 *  never reach user-facing copy — these are the only labels the UI may show. */
export const AI_REALITY_INSTRUMENT_NAME = "Organizational AI Reality Assessment" as const;
export const AI_REALITY_DASHBOARD_NAME = "AI Reality Dashboard" as const;

/** Per-participant input to the org aggregation (one scored SSSS submission). */
export interface ParticipantScore {
  stagePercents: Record<AiRealityStage, number>;
  overallPercent: number;
  dominantGapStage: AiRealityStage;
  illusionFlags: readonly SsssIllusionId[];
}

export interface StageAggregate {
  stage: AiRealityStage;
  mean: number;
  median: number;
  min: number;
  max: number;
  /** max − min across participants (0 for a single participant). */
  spread: number;
  /** population variance of participant subscores. */
  variance: number;
}

export interface IllusionAggregate {
  id: SsssIllusionId;
  /** Plain-English translation (no internal jargon). */
  label: string;
  count: number;
  /** count / respondedCount, 0–1. */
  share: number;
  /** every responder shows this flag. */
  unanimous: boolean;
  /** some but not all responders show it — disagreement is signal. */
  contested: boolean;
}

/** The single payload the dashboard renders. Computed once; never recomputed in the view. */
export interface AiRealityOrgPayload {
  version: typeof AI_REALITY_ORG_VERSION;
  respondedCount: number;
  invitedCount: number;
  /** Normalized mean of participant overall percents. */
  overallPercent: number;
  /** Ordered path — ALWAYS Safety → Sandbox → Training → Technology. */
  orderedPath: AiRealityStage[];
  stages: Record<AiRealityStage, StageAggregate>;
  /** Lowest mean stage (illusion-flag weighted tie-break). */
  dominantGap: AiRealityStage;
  /** Plain-language sentence naming the sharpest gap. */
  dominantGapLine: string;
  /** Stage(s) where the leadership team disagrees most. */
  mostDivergentStages: AiRealityStage[];
  divergenceLine: string;
  illusions: IllusionAggregate[];
  /** Leader's optional 6-question map gaps, sharpest first. */
  leaderMapGaps: { stage: string; line: string; sev: number }[] | null;
  /** "you are here" is always Safety — the first move regardless of scores. */
  placementLine: string;
  /** True before the full team responds (single-leader provisional view). */
  provisional: boolean;
}
