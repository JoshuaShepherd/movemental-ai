/**
 * Organizational reality map — beat SSOT (AU-04).
 *
 * Canonical beat questions and options shared by local stub choreography and the
 * live engine (`render_beat` / `HOST_SCENES.beats` in movemental-ai-agents).
 * Keep in sync via `tests/unit/beat-catalog-sync.test.ts`.
 */
import { PATH_STAGE_DISPLAY } from "../naming";
import type { ReadSignal, Stage } from "./map-q";

export type BeatId =
  | "org_kind"
  | "reality"
  | "visibility"
  | "decision"
  | "trust"
  | "refusals"
  | "worry";

/** Ordered core beats before the step-6 branch. */
export const BEAT_CORE_ORDER = [
  "org_kind",
  "reality",
  "visibility",
  "decision",
  "trust",
] as const satisfies readonly BeatId[];

export const BEAT_BRANCH_IDS = ["refusals", "worry"] as const satisfies readonly BeatId[];

export const BEAT_PROGRESS_TOTAL = 6;

/** Engine-aligned Safety gate pass (decision beat). */
export const SAFETY_GATE_PASS_ANSWER = "Yes — written and ratified";

export type BeatCatalogOption = {
  label: string;
  say: string;
  read?: ReadSignal;
  gatePass?: true;
  gateFail?: true;
};

export type BeatCatalogEntry = {
  beatId: BeatId;
  tag?: string;
  question: string;
  criteriaLead?: string;
  criteria?: readonly string[];
  options: readonly BeatCatalogOption[];
  progress: { step: number; total: number };
};

/**
 * Full beat catalog — mirrors `HOST_SCENES.beats` in movemental-ai-agents with
 * local choreography fields (`say`, `read`, gate flags) for stub mode.
 */
export const BEAT_CATALOG: Record<BeatId, BeatCatalogEntry> = {
  org_kind: {
    beatId: "org_kind",
    tag: "Start",
    question: "First — what kind of organization are you?",
    options: [
      { label: "Church", say: "Got it — a church." },
      { label: "Nonprofit", say: "Got it — a nonprofit." },
      { label: "Seminary or institution", say: "Got it — a seminary or institution." },
      { label: "Something else", say: "Got it — something else." },
    ],
    progress: { step: 1, total: BEAT_PROGRESS_TOTAL },
  },
  reality: {
    beatId: "reality",
    tag: PATH_STAGE_DISPLAY.sandbox,
    question:
      "Is AI already being used in your actual work — emails, donor letters, lesson plans, sermons, grants?",
    options: [
      { label: "Yes, definitely", say: "AI is already in the actual work." },
      {
        label: "Probably, but I'm not sure",
        say: "AI is probably in the work, but you're not certain.",
        read: { stage: "sandbox" as Stage, line: "AI use is informal and unrecorded", sev: 1 },
      },
      {
        label: "No, not yet",
        say: "AI isn't in the work yet.",
        read: { stage: "sandbox" as Stage, line: "no bounded place to try AI against real work", sev: 2 },
      },
    ],
    progress: { step: 2, total: BEAT_PROGRESS_TOTAL },
  },
  visibility: {
    beatId: "visibility",
    tag: PATH_STAGE_DISPLAY.safety,
    question:
      "Could your senior leadership, right now, name every AI tool your staff uses — and what goes into each one?",
    options: [
      { label: "Yes, all of it", say: "Leadership can name every tool in use — that's rare, and good." },
      {
        label: "Some of it",
        say: "Leadership can name some of it but not all — that's the common middle.",
        read: { stage: "safety" as Stage, line: "leadership cannot fully name tools in use", sev: 2 },
      },
      {
        label: "Honestly, no",
        say: "Leadership couldn't fully name the tools in use right now. That's the common answer, not the embarrassing one.",
        read: { stage: "safety" as Stage, line: "no inventory of AI tools and data touched", sev: 3 },
      },
    ],
    progress: { step: 3, total: BEAT_PROGRESS_TOTAL },
  },
  decision: {
    beatId: "decision",
    tag: PATH_STAGE_DISPLAY.safety,
    question:
      "Has someone with the authority to decide actually decided what's okay — in writing, where staff can find it before they guess?",
    options: [
      {
        label: SAFETY_GATE_PASS_ANSWER,
        say: "Someone with authority has decided, in writing.",
        gatePass: true,
      },
      {
        label: "We've talked about it",
        say: "It's been talked about but not actually decided in writing.",
        gateFail: true,
      },
      {
        label: "No",
        say: "No one with the authority to decide has decided yet.",
        gateFail: true,
      },
    ],
    progress: { step: 4, total: BEAT_PROGRESS_TOTAL },
  },
  trust: {
    beatId: "trust",
    tag: PATH_STAGE_DISPLAY.training,
    question:
      "If a donor, parishioner, or board member learned tomorrow exactly how AI is used in your work — would it strengthen their trust, or shake it?",
    options: [
      { label: "Strengthen it", say: "You think disclosure would strengthen trust." },
      {
        label: "Not sure",
        say: "You're not sure whether disclosure would help or hurt.",
        read: { stage: "training" as Stage, line: "readiness is uneven across the team", sev: 1 },
      },
      {
        label: "Shake it",
        say: "You think disclosure today would shake trust.",
        read: { stage: "training" as Stage, line: "the team is unformed for AI", sev: 2 },
      },
    ],
    progress: { step: 5, total: BEAT_PROGRESS_TOTAL },
  },
  refusals: {
    beatId: "refusals",
    tag: PATH_STAGE_DISPLAY.safety,
    question:
      "Does it name specific things you refuse to do with AI — or is it general guidance?",
    options: [
      { label: "Names specific refusals", say: "It names specific refusals — that's the bar for past Safety." },
      { label: "It's more general", say: "It's general guidance, not named refusals." },
    ],
    progress: { step: 6, total: BEAT_PROGRESS_TOTAL },
  },
  worry: {
    beatId: "worry",
    tag: "Last",
    question: "Last one — what are you most worried about getting wrong?",
    options: [
      { label: "Trust with the people we serve", say: "Trust with the people you serve is the worry." },
      { label: "A data or privacy breach", say: "A data or privacy breach is the worry." },
      { label: "Staff using it badly", say: "Staff using it badly is the worry." },
      { label: "Falling behind", say: "Falling behind is the worry." },
      { label: "Not sure yet", say: "You're not sure yet what worries you most." },
    ],
    progress: { step: 6, total: BEAT_PROGRESS_TOTAL },
  },
};

/** Resolve step-6 branch beat from decision answer label. */
export function branchBeatId(decisionAnswerLabel: string | undefined): BeatId {
  return decisionAnswerLabel === SAFETY_GATE_PASS_ANSWER ? "refusals" : "worry";
}

/** Beat id at linear index `qi` given prior answers (handles step-6 branch). */
export function resolveBeatId(
  qi: number,
  priorAnswers: readonly ({ t?: string; gatePass?: true } | null | undefined)[],
): BeatId | null {
  if (qi < BEAT_CORE_ORDER.length) return BEAT_CORE_ORDER[qi]!;
  if (qi === BEAT_CORE_ORDER.length) {
    const decision = priorAnswers[BEAT_CORE_ORDER.indexOf("decision")];
    return branchBeatId(decision?.t);
  }
  return null;
}
