import { ANSWER_BY_ID, BELIEF_PART, PARTS, QUESTIONS, lineText } from "./questions";

/**
 * Sample data from the canvas boards, shown until enough real Resolutions exist. Every screen
 * that renders these labels them "Sample data." Riverbend, Priya and everyone else here are
 * fictional. Counts are keyed by answer id: t = ticked or chosen, s = starred.
 */

/** The board's sample invitation, used only with `?invited=sample` on /resolve. */
export const SAMPLE_INVITATION = { from: "Priya", pronoun: "she", org: "Riverbend Church" } as const;

/** Nine people from one organization (board: Team). */
export const SAMPLE_TEAM_SIZE = 9;
export const SAMPLE_COUNTS: Record<string, Record<string, { t: number; s: number }>> = {"q01": {"q01a": {"t": 5, "s": 1}, "q01b": {"t": 6, "s": 2}, "q01c": {"t": 5, "s": 3}, "q01d": {"t": 5, "s": 1}, "q01e": {"t": 6, "s": 2}}, "q02": {"q02a": {"t": 7, "s": 5}, "q02b": {"t": 7, "s": 1}, "q02c": {"t": 2, "s": 0}, "q02d": {"t": 6, "s": 3}, "q02e": {"t": 5, "s": 0}, "q02f": {"t": 5, "s": 0}}, "q03": {"q03a": {"t": 5, "s": 3}, "q03b": {"t": 8, "s": 2}, "q03c": {"t": 9, "s": 2}, "q03d": {"t": 6, "s": 1}, "q03e": {"t": 3, "s": 0}, "q03f": {"t": 6, "s": 1}}, "q04": {"q04a": {"t": 6, "s": 4}, "q04b": {"t": 6, "s": 4}, "q04c": {"t": 3, "s": 0}, "q04d": {"t": 7, "s": 0}, "q04e": {"t": 8, "s": 1}, "q04f": {"t": 8, "s": 0}}, "q05": {"q05a": {"t": 1, "s": 0}, "q05b": {"t": 2, "s": 0}, "q05c": {"t": 5, "s": 0}, "q05d": {"t": 0, "s": 0}, "q05e": {"t": 1, "s": 0}}, "q06": {"q06a": {"t": 9, "s": 2}, "q06b": {"t": 8, "s": 4}, "q06c": {"t": 5, "s": 1}, "q06d": {"t": 7, "s": 1}, "q06e": {"t": 5, "s": 1}}, "q07": {"q07a": {"t": 9, "s": 1}, "q07b": {"t": 3, "s": 2}, "q07c": {"t": 9, "s": 5}, "q07d": {"t": 2, "s": 0}, "q07e": {"t": 2, "s": 0}, "q07f": {"t": 2, "s": 1}}, "q08": {"q08a": {"t": 8, "s": 3}, "q08b": {"t": 7, "s": 2}, "q08c": {"t": 3, "s": 0}, "q08d": {"t": 2, "s": 1}, "q08e": {"t": 4, "s": 0}, "q08f": {"t": 6, "s": 3}}, "q09": {"q09a": {"t": 4, "s": 2}, "q09b": {"t": 2, "s": 0}, "q09c": {"t": 6, "s": 3}, "q09d": {"t": 4, "s": 3}, "q09e": {"t": 4, "s": 0}, "q09f": {"t": 5, "s": 1}}, "q10": {"q10a": {"t": 8, "s": 4}, "q10b": {"t": 3, "s": 0}, "q10c": {"t": 5, "s": 0}, "q10d": {"t": 3, "s": 0}, "q10e": {"t": 7, "s": 5}}, "q11": {"q11a": {"t": 8, "s": 2}, "q11b": {"t": 6, "s": 5}, "q11c": {"t": 2, "s": 0}, "q11d": {"t": 5, "s": 1}, "q11e": {"t": 2, "s": 1}, "q11f": {"t": 2, "s": 0}}, "q12": {"q12a": {"t": 6, "s": 1}, "q12b": {"t": 7, "s": 4}, "q12c": {"t": 7, "s": 4}, "q12d": {"t": 5, "s": 0}, "q12e": {"t": 6, "s": 0}}, "q13": {"q13a": {"t": 2, "s": 0}, "q13b": {"t": 2, "s": 2}, "q13c": {"t": 7, "s": 1}, "q13d": {"t": 4, "s": 2}, "q13e": {"t": 4, "s": 2}, "q13f": {"t": 6, "s": 2}}, "q14": {"q14a": {"t": 2, "s": 2}, "q14b": {"t": 2, "s": 0}, "q14c": {"t": 5, "s": 1}, "q14d": {"t": 4, "s": 1}, "q14e": {"t": 7, "s": 3}, "q14f": {"t": 4, "s": 2}}};

/** Public Resolutions in the sample (board: Others). */
export const SAMPLE_PUBLIC = 1074;

/** The sample writer's starred answers (boards: Shared, Others). */
export const SAMPLE_PICKS: Record<string, string> = {
  q01: "q01b", q02: "q02b", q03: "q03c", q04: "q04e", q05: "q05c", q06: "q06a", q07: "q07a",
  q08: "q08b", q09: "q09b", q10: "q10a", q11: "q11c", q12: "q12b", q13: "q13c", q14: "q14a",
};

function sampleLine(aid: string): string {
  return lineText(aid.slice(0, 3), ANSWER_BY_ID.get(aid)?.text ?? "");
}

const row = (qid: string, label: string) => ({ label, text: sampleLine(SAMPLE_PICKS[qid]!), others: [] as string[] });

/** Board: Shared. The one shared Resolution at the board's sample link. */
export const SAMPLE_SHARED = {
  token: "k7p2qx",
  author: "Priya Nair",
  role: "Associate pastor",
  org: "Riverbend Church",
  short: "Riverbend Church",
  date: "October 20, 2026",
  beliefs: QUESTIONS.filter((q) => q.part === BELIEF_PART).map((q) => row(q.id, q.label)),
  parts: PARTS.filter((p) => p.id !== BELIEF_PART).map((p) => ({
    name: p.name,
    rows: QUESTIONS.filter((q) => q.part === p.id).map((q) => row(q.id, q.label)),
  })),
  lines: [] as [string, string][],
  hardest: sampleLine("q11c"),
  acts: ["I’ll share this with someone who decides.", "I’ll ask for this conversation at our next team meeting."],
  two: "Half our staff already use AI and we have never said what is off limits. Before anything else, can we agree this month on what never goes into an AI tool?",
};

/** Board: People. The people a sample writer invited, below the five-person threshold. */
export const SAMPLE_INVITEES = [
  ["James Okafor", "Senior pastor", "Written theirs"],
  ["Ana Ruiz", "Children’s ministry", "Written theirs"],
  ["Daniel Kim", "Elder", "Not yet"],
  ["Grace Liu", "Operations", "Doesn’t share status"],
] as const;

export const SAMPLE_WRITTEN = 3;

/** Board: People. Public Resolutions from people working through the same questions. */
export const SAMPLE_ROAD = {
  same: [
    ["Marcus Bell", "Harbor Street Church", "Starred the same answer to question 12", sampleLine("q12b")],
    ["Ruth Adeyemi", "Northside Family Center", "Starred the same answer to question 03", sampleLine("q03c")],
    ["Tom Becker", "Plains Conference", "Starred the same answer to question 06", sampleLine("q06a")],
  ],
  kind: [
    ["Elena Santos", "Grace Fellowship", "Also a church", sampleLine("q08b")],
    ["Paul Whitaker", "Cedar Hill Church", "Also a church", sampleLine("q05c")],
    ["Hannah Cole", "St. Luke’s Parish", "Also a church", sampleLine("q07a")],
  ],
  near: [
    ["Joy Mensah", "Eastside Family Services", "Kansas City", sampleLine("q11c")],
    ["Luis Ortega", "Westport Community Church", "Kansas City", sampleLine("q13c")],
  ],
} as const;
