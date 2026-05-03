import { SSSS_INTEGRITY_ITEMS } from "./items";
import type {
  SsssIllusionId,
  SsssIntegrityResult,
  SsssStageId,
} from "./types";
import { SSSS_INTEGRITY_VERSION } from "./types";

const MAIN_STAGES = ["Safety", "Sandbox", "Skills", "Solutions"] as const satisfies readonly Exclude<
  SsssStageId,
  "Cross"
>[];

type MainStage = (typeof MAIN_STAGES)[number];

function scoreForItemId(id: string, scores: readonly number[]): number {
  const idx = SSSS_INTEGRITY_ITEMS.findIndex((i) => i.id === id);
  if (idx < 0 || idx >= scores.length) return 0;
  return scores[idx] ?? 0;
}

function subscoreForStage(stage: MainStage | "Cross", scores: readonly number[]): number {
  const items = SSSS_INTEGRITY_ITEMS.filter((i) => i.stage === stage);
  if (items.length === 0) return 0;
  let sum = 0;
  let max = 0;
  for (const it of items) {
    const idx = SSSS_INTEGRITY_ITEMS.indexOf(it);
    const s = scores[idx] ?? 0;
    sum += s * it.weight;
    max += 5 * it.weight;
  }
  return max > 0 ? sum / max : 0;
}

function bandForNorm(n: number): { label: string; primaryRisk: string } {
  if (n <= 0.42) {
    return {
      label: "Early or Safety collapsed",
      primaryRisk: "Solutions-first drift, shadow adoption, reputational and moral hazard.",
    };
  }
  if (n <= 0.55) {
    return {
      label: "Safety partial / policy theater",
      primaryRisk: "“Legal signed off” mistaken for executives carrying boundaries under fatigue.",
    };
  }
  if (n <= 0.68) {
    return {
      label: "Safety real; Sandbox immature",
      primaryRisk: "“We’re experimenting” mistaken for a sandbox with organizational memory.",
    };
  }
  if (n <= 0.78) {
    return {
      label: "Sandbox producing evidence; Skills uneven",
      primaryRisk: "Voice drifts toward genre-default prose; measurement gaps; tool shopping.",
    };
  }
  if (n <= 0.87) {
    return {
      label: "Skills strong; Solutions selective",
      primaryRisk: "Automation or composition overshoot under vendor pressure.",
    };
  }
  return {
    label: "Solutions as infrastructure",
    primaryRisk: "Complacency as models and vendors shift; revisit cadence slips.",
  };
}

function dominantGap(scores: readonly number[]): MainStage {
  let worst: MainStage = "Safety";
  let worstVal = 1;
  for (const st of MAIN_STAGES) {
    const v = subscoreForStage(st, scores);
    if (v < worstVal) {
      worstVal = v;
      worst = st;
    }
  }
  return worst;
}

function collectIllusionFlags(scores: readonly number[]): SsssIllusionId[] {
  const flags: SsssIllusionId[] = [];
  const weightedSum = SSSS_INTEGRITY_ITEMS.reduce((acc, it, i) => acc + (scores[i] ?? 0) * it.weight, 0);
  const maxS = SSSS_INTEGRITY_ITEMS.reduce((acc, it) => acc + 5 * it.weight, 0);
  const sNorm = maxS > 0 ? weightedSum / maxS : 0;

  const q = (id: string) => scoreForItemId(id, scores);

  if (sNorm >= 0.72 && q("Q17") <= 2) flags.push("honesty_gap");

  const subSol = subscoreForStage("Solutions", scores);
  const subSbx = subscoreForStage("Sandbox", scores);
  const subSkl = subscoreForStage("Skills", scores);
  if (subSol - subSbx >= 0.15 && (q("Q07") < 4 || q("Q08") < 4)) {
    flags.push("solutions_without_evidence");
  }
  if (subSkl >= 0.75 && q("Q05") < 3) flags.push("skills_theater");
  if (q("Q05") < 3 && q("Q06") < 3) flags.push("shadow_sandbox");
  if (q("Q02") >= 4 && q("Q01") < 3) flags.push("safety_paper");

  const structural = flags.filter((f) => f !== "honesty_gap");
  if (structural.length >= 2) flags.push("inversion_profile");

  return [...new Set(flags)];
}

function pickLikelyIllusion(flags: readonly SsssIllusionId[]): SsssIllusionId {
  const priority: SsssIllusionId[] = [
    "honesty_gap",
    "inversion_profile",
    "solutions_without_evidence",
    "skills_theater",
    "shadow_sandbox",
    "safety_paper",
  ];
  for (const p of priority) {
    if (flags.includes(p)) return p;
  }
  return "none";
}

function illusionCopy(id: SsssIllusionId): { focus: string; stop: string } {
  switch (id) {
    case "honesty_gap":
      return {
        focus: "Run a location ritual: principals answer Safety exit tests aloud without notes; log where you skipped.",
        stop: "Stop treating aggregate score as truth until Q17 (honest location) rises.",
      };
    case "inversion_profile":
      return {
        focus: "Freeze net-new external AI-assisted channels until Sandbox log and graduated use cases exist.",
        stop: "Stop buying tools to compensate for missing evidence or formation.",
      };
    case "solutions_without_evidence":
      return {
        focus: "Charter bounded sandbox runs for the workflows you think are “live”; graduate or kill with written reasons.",
        stop: "Stop expanding licenses until Q07–Q08 reflect real evidence, not vendor claims.",
      };
    case "skills_theater":
      return {
        focus: "Replace slide-only training with live critique of real drafts, grounded in your sandbox log.",
        stop: "Stop celebrating workshop attendance until Q05 (shared log) is true.",
      };
    case "shadow_sandbox":
      return {
        focus: "Move experiments onto Safety-approved environments and assign a single log owner with weekly review.",
        stop: "Stop calling scattered personal use a sandbox.",
      };
    case "safety_paper":
      return {
        focus: "Executive session: compare written answers to Q01–Q04; reconcile until principals match.",
        stop: "Stop publishing policy updates until principals can cite boundaries in plain speech.",
      };
    default:
      return {
        focus: "Address the three lowest-scored items with named owners and dates.",
        stop: "Stop expanding pilots until the shared log reflects what you are actually learning.",
      };
  }
}

function remediateDominant(stage: MainStage): string {
  switch (stage) {
    case "Safety":
      return "Publish one-page governance + boundaries; tie procurement to data tiers; calendarize review.";
    case "Sandbox":
      return "Run the eight-pattern use-case mapping exercise; open a dated log; screen candidates through Safety.";
    case "Skills":
      return "Institute peer review on real artifacts; build rubrics from sandbox evidence, not templates.";
    case "Solutions":
      return "Map one workflow end-to-end with owners, gates, and outcome metrics; defer composition until governance holds.";
    default:
      return "Re-read the weakest three items as a leadership team and assign one owner each.";
  }
}

/** Validates length and each score in 1..5. */
export function assertValidScores(scores: readonly number[]): void {
  if (scores.length !== SSSS_INTEGRITY_ITEMS.length) {
    throw new Error(`Expected ${SSSS_INTEGRITY_ITEMS.length} scores, got ${scores.length}`);
  }
  for (let i = 0; i < scores.length; i++) {
    const s = scores[i];
    if (typeof s !== "number" || s < 1 || s > 5 || !Number.isInteger(s)) {
      throw new Error(`Score at index ${i} must be an integer 1–5`);
    }
  }
}

export function computeSsssIntegrityResult(scores: readonly number[]): SsssIntegrityResult {
  assertValidScores(scores);

  const weightedSum = SSSS_INTEGRITY_ITEMS.reduce((acc, it, i) => acc + scores[i] * it.weight, 0);
  const maxS = SSSS_INTEGRITY_ITEMS.reduce((acc, it) => acc + 5 * it.weight, 0);
  const normalizedOverall = maxS > 0 ? weightedSum / maxS : 0;

  const stagePercents = {
    Safety: Math.round(subscoreForStage("Safety", scores) * 100),
    Sandbox: Math.round(subscoreForStage("Sandbox", scores) * 100),
    Skills: Math.round(subscoreForStage("Skills", scores) * 100),
    Solutions: Math.round(subscoreForStage("Solutions", scores) * 100),
    Cross: Math.round(subscoreForStage("Cross", scores) * 100),
  } as const;

  const indexed = SSSS_INTEGRITY_ITEMS.map((it, i) => ({
    id: it.id,
    stage: it.stage,
    category: it.category,
    prompt: it.prompt.replace(/\*\*/g, ""),
    score: scores[i],
  }));
  const topWeaknesses = [...indexed].sort((a, b) => a.score - b.score).slice(0, 3);

  const weakestCategoryByStage: SsssIntegrityResult["weakestCategoryByStage"] = {};
  for (const st of MAIN_STAGES) {
    const stageItems = SSSS_INTEGRITY_ITEMS.filter((i) => i.stage === st);
    const byCat = new Map<string, number[]>();
    for (const it of stageItems) {
      const idx = SSSS_INTEGRITY_ITEMS.indexOf(it);
      const arr = byCat.get(it.category) ?? [];
      arr.push(scores[idx]);
      byCat.set(it.category, arr);
    }
    let worstCat = "";
    let worstAvg = 6;
    for (const [cat, vals] of byCat) {
      const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
      if (avg < worstAvg) {
        worstAvg = avg;
        worstCat = cat;
      }
    }
    if (worstCat) weakestCategoryByStage[st] = { category: worstCat, avg: worstAvg };
  }

  const illusionFlags = collectIllusionFlags(scores);
  const likelyIllusion = pickLikelyIllusion(illusionFlags);
  const gap = dominantGap(scores);
  const ill = illusionCopy(likelyIllusion);
  const next90Days =
    likelyIllusion === "none"
      ? {
          focus: remediateDominant(gap),
          stop: "Stop ignoring the three lowest-scored items—averages hide the inversion tax.",
        }
      : ill;

  return {
    version: SSSS_INTEGRITY_VERSION,
    normalizedOverall,
    normalizedOverallPercent: Math.round(normalizedOverall * 100),
    stagePercents,
    topWeaknesses,
    weakestCategoryByStage,
    illusionFlags,
    likelyIllusion,
    band: bandForNorm(normalizedOverall),
    next90Days,
    dominantGapStage: gap,
  };
}
