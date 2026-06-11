import type { SsssIllusionId } from "@/lib/ssss-integrity-assessment";

import { dominantGapLine, divergenceLine, illusionPlainEnglish, PLACEMENT_LINE } from "./copy";
import {
  AI_REALITY_ORG_VERSION,
  AI_REALITY_STAGES,
  type AiRealityOrgPayload,
  type AiRealityStage,
  type IllusionAggregate,
  type ParticipantScore,
  type StageAggregate,
} from "./types";

/**
 * Weight of each illusion flag for dominant-gap tie-breaking. A stage tied on
 * mean loses to the stage carrying the heavier illusion signal.
 */
const ILLUSION_STAGE_WEIGHT: Partial<Record<SsssIllusionId, AiRealityStage>> = {
  safety_paper: "Safety",
  shadow_sandbox: "Sandbox",
  skills_theater: "Training",
  solutions_without_evidence: "Technology",
};

function mean(xs: number[]): number {
  if (xs.length === 0) return 0;
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}

function median(xs: number[]): number {
  if (xs.length === 0) return 0;
  const s = [...xs].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 === 0 ? (s[mid - 1] + s[mid]) / 2 : s[mid];
}

function variance(xs: number[], avg: number): number {
  if (xs.length === 0) return 0;
  return xs.reduce((acc, x) => acc + (x - avg) ** 2, 0) / xs.length;
}

/**
 * The one genuinely new build: synthesize N participant SSSS submissions (plus
 * the leader's optional 6-question map) into a single org payload. Pure — no IO,
 * no clock. The dashboard reads this payload and recomputes nothing.
 */
export function aggregateOrg(
  participants: readonly ParticipantScore[],
  opts?: {
    invitedCount?: number;
    leaderMapGaps?: { stage: string; line: string; sev: number }[] | null;
  },
): AiRealityOrgPayload {
  const respondedCount = participants.length;
  const invitedCount = opts?.invitedCount ?? respondedCount;

  // --- Per-stage aggregates ------------------------------------------------
  const stages = {} as Record<AiRealityStage, StageAggregate>;
  for (const stage of AI_REALITY_STAGES) {
    const vals = participants.map((p) => p.stagePercents[stage] ?? 0);
    const avg = mean(vals);
    stages[stage] = {
      stage,
      mean: Math.round(avg),
      median: Math.round(median(vals)),
      min: vals.length ? Math.min(...vals) : 0,
      max: vals.length ? Math.max(...vals) : 0,
      spread: vals.length ? Math.max(...vals) - Math.min(...vals) : 0,
      variance: Math.round(variance(vals, avg)),
    };
  }

  // --- Org overall = normalized mean of participant overalls ---------------
  const overallPercent = Math.round(mean(participants.map((p) => p.overallPercent)));

  // --- Dominant gap = lowest mean stage; tie-break by illusion-flag weight --
  const flagCounts = countFlags(participants);
  const dominantGap = pickDominantGap(stages, flagCounts);

  // --- Team divergence: stage(s) with the widest spread --------------------
  const mostDivergentStages = pickMostDivergent(stages, respondedCount);

  // --- Illusion aggregation ------------------------------------------------
  const illusions = aggregateIllusions(participants);

  return {
    version: AI_REALITY_ORG_VERSION,
    respondedCount,
    invitedCount,
    overallPercent,
    orderedPath: [...AI_REALITY_STAGES],
    stages,
    dominantGap,
    dominantGapLine: dominantGapLine(dominantGap, respondedCount),
    mostDivergentStages,
    divergenceLine: divergenceLine(mostDivergentStages, respondedCount),
    illusions,
    leaderMapGaps: opts?.leaderMapGaps ?? null,
    placementLine: PLACEMENT_LINE,
    provisional: respondedCount <= 1,
  };
}

function countFlags(participants: readonly ParticipantScore[]): Map<SsssIllusionId, number> {
  const counts = new Map<SsssIllusionId, number>();
  for (const p of participants) {
    for (const f of p.illusionFlags) {
      counts.set(f, (counts.get(f) ?? 0) + 1);
    }
  }
  return counts;
}

function pickDominantGap(
  stages: Record<AiRealityStage, StageAggregate>,
  flagCounts: Map<SsssIllusionId, number>,
): AiRealityStage {
  let worst: AiRealityStage = "Safety";
  let worstMean = Infinity;
  let worstWeight = -1;
  for (const stage of AI_REALITY_STAGES) {
    const m = stages[stage].mean;
    const weight = stageIllusionWeight(stage, flagCounts);
    if (m < worstMean || (m === worstMean && weight > worstWeight)) {
      worstMean = m;
      worstWeight = weight;
      worst = stage;
    }
  }
  return worst;
}

function stageIllusionWeight(stage: AiRealityStage, flagCounts: Map<SsssIllusionId, number>): number {
  let w = 0;
  for (const [flag, count] of flagCounts) {
    if (ILLUSION_STAGE_WEIGHT[flag] === stage) w += count;
  }
  return w;
}

function pickMostDivergent(
  stages: Record<AiRealityStage, StageAggregate>,
  respondedCount: number,
): AiRealityStage[] {
  if (respondedCount <= 1) return [];
  const spreads = AI_REALITY_STAGES.map((s) => stages[s].spread);
  const maxSpread = Math.max(...spreads);
  // A real split only — ignore near-agreement (spread under 15 points).
  if (maxSpread < 15) return [];
  return AI_REALITY_STAGES.filter((s) => maxSpread - stages[s].spread <= 5 && stages[s].spread >= 15);
}

function aggregateIllusions(participants: readonly ParticipantScore[]): IllusionAggregate[] {
  const responded = participants.length;
  const counts = countFlags(participants);
  const out: IllusionAggregate[] = [];
  for (const [id, count] of counts) {
    if (id === "none") continue;
    const share = responded > 0 ? count / responded : 0;
    out.push({
      id,
      label: illusionPlainEnglish(id),
      count,
      share,
      unanimous: responded > 0 && count === responded,
      contested: count > 0 && count < responded,
    });
  }
  // Sharpest (most prevalent) first.
  return out.sort((a, b) => b.share - a.share || b.count - a.count);
}
