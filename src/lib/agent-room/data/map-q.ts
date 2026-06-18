import { PATH_STAGE_DISPLAY } from "../naming";
import {
  BEAT_CATALOG,
  BEAT_CORE_ORDER,
  BEAT_PROGRESS_TOTAL,
  branchBeatId,
  resolveBeatId,
  SAFETY_GATE_PASS_ANSWER,
  type BeatCatalogEntry,
  type BeatId,
} from "./beat-catalog";

/**
 * Agent Room — the Organizational Reality Map.
 *
 * Six reality-check beats (engine-aligned SSOT in `beat-catalog.ts`) with a
 * Safety gate on the decision beat. Orgs that fail the gate hear the threat and
 * stop; orgs that pass answer through trust and the step-6 branch (refusals or
 * worry), then get a readback. Data + pure `computeMapRead` only — beat/readback
 * markup and answer choreography live in `beat-scenes.ts` and the beat screen.
 */
export type Stage = "safety" | "sandbox" | "training" | "tech";

/** A gap signal an answer carries toward a stage. */
export interface ReadSignal {
  stage: Stage;
  line: string;
  /** Severity 1–3 (3 = sharpest gap). */
  sev: number;
}

export interface MapOption {
  /** The answer text shown on the option button. */
  t: string;
  /** The agent's grounded reply when this answer is chosen. */
  say: string;
  /** Optional gap this answer surfaces (absent = a "clear" answer). */
  read?: ReadSignal;
  /** Decision beat only — leadership ratified Safety in writing; proceed. */
  gatePass?: true;
  /** Decision beat only — stop the assessment and fire the threat. */
  gateFail?: true;
  /** Engine beat id for verdict contract alignment. */
  beatId?: BeatId;
}

export interface MapQuestion {
  /** Stage label shown above the question (e.g. "Safety"). */
  tag?: string;
  q: string;
  /** Optional lead-in before criteria bullets. */
  criteriaLead?: string;
  /** Optional checklist bullets. */
  criteria?: readonly string[];
  opts: MapOption[];
  beatId: BeatId;
}

/** Readback gap line when the decision beat fails the Safety gate. */
export const SAFETY_GATE_GAP_LINE =
  "leadership hasn't ratified Safety in writing yet";

/** Spoken when decision fails — legacy voice path; readback is primary. */
export const SAFETY_GATE_THREAT: readonly string[] = [
  "Then here's what's true right now, whether or not anyone's named it:",
  "AI is already in use across your staff, on donor records, member information, the pastoral and personal things people trusted you with, and no one has decided, on paper, what's allowed. The day that surfaces, in a board meeting, a news story, or a quiet complaint, the trust you spent decades earning is what pays for it.",
  "That's not a tooling problem, and it's not solved by being careful. It's one decision your leadership hasn't made yet. It's the first move, and everything else, experimenting, training your people, building anything, waits on it.",
  "You can do this yourself — the free handbook guides your leadership through all of it — or we can draft it with you in two weeks. Either way, this is where you start.",
];

export { SAFETY_GATE_PASS_ANSWER, BEAT_PROGRESS_TOTAL };

const DECISION_INDEX = BEAT_CORE_ORDER.indexOf("decision");

function catalogEntryToMapQuestion(entry: BeatCatalogEntry): MapQuestion {
  return {
    tag: entry.tag,
    q: entry.question.replace(/<\/?em>/g, ""),
    criteriaLead: entry.criteriaLead,
    criteria: entry.criteria,
    beatId: entry.beatId,
    opts: entry.options.map((o) => ({
      t: o.label,
      say: o.say,
      read: o.read,
      gatePass: o.gatePass,
      gateFail: o.gateFail,
      beatId: entry.beatId,
    })),
  };
}

/** Resolve the question at linear index `qi` (branch beat at qi=5 uses prior answers). */
export function getMapQuestion(
  qi: number,
  priorAnswers: readonly (MapOption | null | undefined)[] = [],
): MapQuestion | null {
  const beatId = resolveBeatId(qi, priorAnswers);
  if (!beatId) return null;
  return catalogEntryToMapQuestion(BEAT_CATALOG[beatId]);
}

/**
 * Static six-beat projection for length checks and simple indexing (beat 6 defaults
 * to `worry`; runtime uses `getMapQuestion` + `branchBeat` opts for refusals).
 */
export const MAP_Q: readonly MapQuestion[] = [
  ...BEAT_CORE_ORDER.map((id) => catalogEntryToMapQuestion(BEAT_CATALOG[id])),
  catalogEntryToMapQuestion(BEAT_CATALOG.worry),
];

export const STAGE_CLEAR: Record<Stage, string> = {
  safety: "your Safety footing is real",
  sandbox: "you have room to experiment",
  training: "your people are ready",
  tech: "your systems can carry tools",
};

export const STAGE_NAME: Record<Stage, string> = PATH_STAGE_DISPLAY;

/** Capitalize the first letter (prototype `cap`). */
export function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const STAGE_ORDER: Stage[] = ["safety", "sandbox", "training", "tech"];

/** A stage's worst surfaced gap (or null = clear). */
export type StageRead = { line: string; sev: number } | null;

export interface MapRead {
  stages: Record<Stage, StageRead>;
  /** Gaps that surfaced, sharpest (highest severity) first. */
  gaps: { stage: Stage; line: string; sev: number }[];
  /** True when the decision beat was a full yes — org cleared the Safety gate. */
  clearedSafety: boolean;
}

/**
 * Mirror the org back across the ordered path from its chosen answers.
 * Keeps each stage's *worst* gap; lists gaps sharpest-first. Decision gate
 * answers do not carry gap signals — only `gatePass` / `gateFail`.
 */
export function computeMapRead(answers: (MapOption | null | undefined)[]): MapRead {
  const stages: Record<Stage, StageRead> = {
    safety: null,
    sandbox: null,
    training: null,
    tech: null,
  };
  const clearedSafety = answers[DECISION_INDEX]?.gatePass === true;
  if (clearedSafety) {
    stages.safety = null;
  } else if (answers[DECISION_INDEX]?.gateFail) {
    stages.safety = { line: SAFETY_GATE_GAP_LINE, sev: 3 };
  }
  answers.forEach((opt) => {
    const r = opt?.read;
    if (r) {
      const current = stages[r.stage];
      if (!current || r.sev > current.sev) stages[r.stage] = { line: r.line, sev: r.sev };
    }
  });
  const gaps = STAGE_ORDER.filter((k) => stages[k]).map((k) => {
    const s = stages[k]!;
    return { stage: k, line: s.line, sev: s.sev };
  });
  gaps.sort((a, b) => b.sev - a.sev);
  return { stages, gaps, clearedSafety };
}

/** Resolve question for the beat screen (`branchBeat` opts override step 6). */
export function getMapQuestionForShow(
  qi: number,
  priorAnswers: readonly (MapOption | null | undefined)[] = [],
  branchBeat?: BeatId,
): MapQuestion | null {
  if (branchBeat && qi === BEAT_CORE_ORDER.length) {
    return catalogEntryToMapQuestion(BEAT_CATALOG[branchBeat]);
  }
  return getMapQuestion(qi, priorAnswers);
}

/** Whether answering this beat finishes the assessment. */
export function isTerminalBeatIndex(qi: number, opt: MapOption): boolean {
  if (opt.gateFail) return true;
  return qi >= BEAT_CORE_ORDER.length;
}

/** Branch beat id for step 6 after trust is answered. */
export function resolveBranchBeatId(priorAnswers: readonly (MapOption | null | undefined)[]): BeatId {
  const decision = priorAnswers[DECISION_INDEX];
  return branchBeatId(decision?.t);
}
