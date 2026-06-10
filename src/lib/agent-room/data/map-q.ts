/**
 * Agent Room — the Organizational Reality Map (ported from `js/data/map-q.js`).
 *
 * The six reality-check questions. Each answer carries an optional gap signal
 * toward a stage; the readback mirrors the org back to itself across the ordered
 * path, sharpest gaps first. Data + the pure `computeMapRead` derivation only —
 * the beat/readback *markup* (`beatDots`, `mapStageRow`) and the answer
 * choreography (`beatStep`) become React in AF-08.
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
}

export interface MapQuestion {
  q: string;
  opts: MapOption[];
}

export const MAP_Q: readonly MapQuestion[] = [
  // Ordered gentlest-first: the invitational "tried real work" question leads so a
  // first-time visitor isn't audited at question one; the sharpest inventory
  // question ("name every AI tool") now sits at index 2. Order is safe to change —
  // `computeMapRead` aggregates by `read.stage`, NOT by question index, and the
  // beat progression reads `MAP_Q[qi]`, so the dots and advance track this order.
  {
    q: "Has your team tried AI against real work, in a way you could point to?",
    opts: [
      { t: "Yes — with results we recorded", say: "Then there’s something to build on." },
      { t: "A little, here and there", say: "Ad hoc rarely tells you what’s worth keeping.", read: { stage: "sandbox", line: "experiments are ad hoc, with nothing recorded", sev: 2 } },
      { t: "Not really", say: "So you can’t yet sort what helps from what doesn’t.", read: { stage: "sandbox", line: "no bounded place to try AI against real work", sev: 2 } },
    ],
  },
  {
    q: "Has your board or leadership put anything in writing — what you will, and won’t, do with AI?",
    opts: [
      { t: "Yes, ratified", say: "Then you’re ahead of almost everyone." },
      { t: "We’ve talked about it", say: "Talk isn’t a document you can stand on.", read: { stage: "safety", line: "no ratified position — convictions aren’t on paper", sev: 2 } },
      { t: "Nothing yet", say: "That’s the gap Safety closes first.", read: { stage: "safety", line: "no written position to defend under pressure", sev: 3 } },
    ],
  },
  {
    q: "Could your leadership name every AI tool your staff already use — and what data each touches?",
    opts: [
      { t: "Yes — we keep an inventory", say: "Rare. That’s a real head start." },
      { t: "Some of it", say: "So the picture is partial.", read: { stage: "safety", line: "some AI use is unnamed and ungoverned", sev: 1 } },
      { t: "Honestly, no", say: "That’s the honest answer most give.", read: { stage: "safety", line: "AI is already in use, unnamed and ungoverned", sev: 3 } },
    ],
  },
  {
    q: "Picture your staff. How ready do they feel to use AI well?",
    opts: [
      { t: "Mostly confident", say: "Good — that’s hard to build." },
      { t: "A real mix", say: "A mix usually means the quiet ones are stuck.", read: { stage: "training", line: "readiness is uneven across the team", sev: 1 } },
      { t: "Anxious or untrained", say: "Then formation matters more than tools.", read: { stage: "training", line: "the team is anxious and unformed for AI", sev: 2 } },
    ],
  },
  {
    q: "Would it bother your team if a colleague used AI on shared work and didn’t say so?",
    opts: [
      { t: "We have norms for that", say: "That means trust is already named." },
      { t: "It’s unspoken", say: "Unspoken norms break under pressure.", read: { stage: "safety", line: "no shared rules for disclosure and attribution", sev: 1 } },
      { t: "We’ve never discussed it", say: "That’s where trust quietly erodes.", read: { stage: "safety", line: "disclosure is undiscussed — a trust risk", sev: 2 } },
    ],
  },
  {
    q: "Where does your team’s work live — could AI actually plug into it?",
    opts: [
      { t: "Unified systems, ready", say: "Then the foundation for building is there." },
      { t: "Scattered but workable", say: "Scattered work makes good tools hard to build.", read: { stage: "tech", line: "work is scattered across disconnected tools", sev: 1 } },
      { t: "Fragmented — nothing connects", say: "Fragmentation is the thing that produces slop.", read: { stage: "tech", line: "fragmented systems — no foundation to build on yet", sev: 2 } },
    ],
  },
];

export const STAGE_CLEAR: Record<Stage, string> = {
  safety: "governance footing looks solid",
  sandbox: "you have room to experiment",
  training: "your people are ready",
  tech: "your systems can carry tools",
};

export const STAGE_NAME: Record<Stage, string> = {
  safety: "Safety",
  sandbox: "Sandbox",
  training: "Training",
  tech: "Tech",
};

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
}

/**
 * Mirror the org back across the ordered path from its chosen answers (pure
 * version of the prototype `computeMapRead`, which read a `mapAnswers` global).
 * Keeps each stage's *worst* gap; lists gaps sharpest-first.
 */
export function computeMapRead(answers: (MapOption | null | undefined)[]): MapRead {
  const stages: Record<Stage, StageRead> = {
    safety: null,
    sandbox: null,
    training: null,
    tech: null,
  };
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
  return { stages, gaps };
}
