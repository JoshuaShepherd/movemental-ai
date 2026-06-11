import { PATH_STAGE_DISPLAY } from "../naming";

/**
 * Agent Room — the Organizational Reality Map (ported from `js/data/map-q.js`).
 *
 * Four reality-check questions with a Safety gate on Q1. Orgs that fail the gate
 * hear the threat and stop; orgs that pass answer Q2–Q4 and get a readback that
 * mirrors Sandbox/Training/Technology gaps, sharpest first. Data + pure
 * `computeMapRead` only — beat/readback markup and answer choreography live in
 * `beat-scenes.ts` and the beat screen.
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
  /** Q1 only — all four Safety artifacts exist in writing; proceed to Q2. */
  gatePass?: true;
  /** Q1 only — stop the assessment and fire the threat. */
  gateFail?: true;
}

export interface MapQuestion {
  /** Stage label shown above the question (e.g. "Safety"). */
  tag?: string;
  q: string;
  /** Optional lead-in before criteria bullets (Q1 gate). */
  criteriaLead?: string;
  /** Optional checklist bullets (Q1 gate). */
  criteria?: readonly string[];
  opts: MapOption[];
}

/** Readback gap line when Q1 fails the Safety gate (most organizations). */
export const SAFETY_GATE_GAP_LINE =
  "leadership hasn't ratified Safety in writing yet";

/** Spoken when Q1 is anything but a full yes — legacy voice path; readback is primary. */
export const SAFETY_GATE_THREAT: readonly string[] = [
  "Then here's what's true right now, whether or not anyone's named it:",
  "AI is already in use across your staff, on donor records, member information, the pastoral and personal things people trusted you with, and no one has decided, on paper, what's allowed. The day that surfaces, in a board meeting, a news story, or a quiet complaint, the trust you spent decades earning is what pays for it.",
  "That's not a tooling problem, and it's not solved by being careful. It's one decision your leadership hasn't made yet. It's the first move, and everything else, experimenting, training your people, building anything, waits on it.",
  "You can do this yourself — the free handbook guides your leadership through all of it — or we can draft it with you in two weeks. Either way, this is where you start.",
];

export const MAP_Q: readonly MapQuestion[] = [
  {
    tag: "Safety",
    q: "Has your leadership actually decided, in writing, and signed off, what your organization will and won't do with AI?",
    criteriaLead: "A real yes means all four of these exist on paper:",
    criteria: [
      "a position your board has put its name to",
      "the AI uses you refuse on principle, named",
      "a list of every AI tool your staff already use, and the data each one touches",
      "rules that tell a staff member what's allowed before they have to guess",
    ],
    opts: [
      { t: "Yes, all four, in writing", say: "That's rare. Most organizations can't say that.", gatePass: true },
      { t: "Some, but not all four", say: "", gateFail: true },
      { t: "No, none of this yet", say: "", gateFail: true },
    ],
  },
  {
    tag: "Sandbox",
    q: "Has your team actually tried AI against real work, in a way you could point to, with results you kept?",
    opts: [
      { t: "Yes, we tested it and recorded what worked", say: "Then there's something real to build on." },
      {
        t: "A little, here and there",
        say: "Ad hoc rarely tells you what's worth keeping.",
        read: { stage: "sandbox", line: "experiments are ad hoc, nothing recorded", sev: 2 },
      },
      {
        t: "Not really",
        say: "Then you can't yet sort what helps from what doesn't, which is the whole point of a Sandbox.",
        read: { stage: "sandbox", line: "no bounded place to try AI against real work", sev: 2 },
      },
    ],
  },
  {
    tag: PATH_STAGE_DISPLAY.training,
    q: "Picture your staff. Are they formed to use AI with judgment, not just given access to it?",
    opts: [
      { t: "Yes, they exercise real judgment", say: "That's the hard part, and you've done it." },
      {
        t: "A real mix",
        say: "A mix usually means the quiet ones are quietly stuck.",
        read: { stage: "training", line: "readiness is uneven across the team", sev: 1 },
      },
      {
        t: "Anxious or untrained",
        say: "Then forming your people matters more than any tool you could buy.",
        read: { stage: "training", line: "the team is unformed for AI", sev: 2 },
      },
    ],
  },
  {
    tag: PATH_STAGE_DISPLAY.tech,
    q: "Where does your work actually live, could AI plug into it, or is it scattered?",
    opts: [
      { t: "Unified, ready to build on", say: "Then the foundation for building is there." },
      {
        t: "Scattered but workable",
        say: "Scattered work makes good tools hard to build.",
        read: { stage: "tech", line: "work is spread across disconnected tools", sev: 1 },
      },
      {
        t: "Fragmented, nothing connects",
        say: "Fragmentation is the thing that produces slop, which is why it's the last thing you fix, not the first.",
        read: { stage: "tech", line: "no foundation to build on yet", sev: 2 },
      },
    ],
  },
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
  /** True when Q1 was a full yes — org cleared the Safety gate. */
  clearedSafety: boolean;
}

/**
 * Mirror the org back across the ordered path from its chosen answers (pure
 * version of the prototype `computeMapRead`, which read a `mapAnswers` global).
 * Keeps each stage's *worst* gap; lists gaps sharpest-first. Q1 gate answers
 * do not carry gap signals — only `gatePass` / `gateFail`.
 */
export function computeMapRead(answers: (MapOption | null | undefined)[]): MapRead {
  const stages: Record<Stage, StageRead> = {
    safety: null,
    sandbox: null,
    training: null,
    tech: null,
  };
  const clearedSafety = answers[0]?.gatePass === true;
  if (clearedSafety) {
    stages.safety = null;
  } else if (answers[0]?.gateFail) {
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
