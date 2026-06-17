/**
 * Local MAP_Q Safety gate → engine-aligned pre/past verdict for contract tests.
 * Live AGENT path uses engine 6-beat answers via computeSafetyVerdict in the engine.
 */
import type { MapOption } from "./map-q";

export type BeatAnswer = { beatId: string; answer: string };

const PAST_DECISION = "Yes — written and ratified";
const PAST_REFUSALS = "Names specific refusals";

/** Maps local Q1 gatePass to pre/past semantics aligned with engine verdict rule. */
export function computeSafetyVerdictFromMapAnswers(
  answers: readonly (MapOption | undefined)[],
  refusalsAnswer?: string,
): { verdict: "past" | "pre"; hereStageIndex: 0 | 1 } {
  const clearedQ1 = answers[0]?.gatePass === true;
  if (!clearedQ1) {
    return { verdict: "pre", hereStageIndex: 0 };
  }
  if (refusalsAnswer === PAST_REFUSALS) {
    return { verdict: "past", hereStageIndex: 1 };
  }
  return { verdict: "pre", hereStageIndex: 0 };
}

/** Engine-shaped verdict from structured beat answers (mirrors engine SSOT). */
export function computeSafetyVerdict(answers: BeatAnswer[]): {
  verdict: "past" | "pre";
  hereStageIndex: 0 | 1;
} {
  const decision = answers.find((a) => a.beatId === "decision")?.answer;
  const refusals = answers.find((a) => a.beatId === "refusals")?.answer;
  const isPast = decision === PAST_DECISION && refusals === PAST_REFUSALS;
  return isPast
    ? { verdict: "past", hereStageIndex: 1 }
    : { verdict: "pre", hereStageIndex: 0 };
}
