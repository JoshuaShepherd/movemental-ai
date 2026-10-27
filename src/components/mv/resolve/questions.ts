import content from "./content/questions.json";

/**
 * The fourteen Resolve questions (content v3, October 2026).
 *
 * Source of truth: docs/handoff/resolve-v3/resolve-questions-v3.json, split into
 * content/questions.json (questions, answers, sector wording, Movemental's answers) and
 * content/examples-{sector}.json (three example decisions per answer, loaded on demand).
 * Answer ids (q08b) are stable: counts, saved Resolutions and the Map all key on them.
 */

export type Sector = "church" | "nonprofit" | "school" | "network";
export type QuestionMode = "multi" | "single";

export interface ResolveAnswer {
  id: string;
  text: string;
  /** q03 only: the question a person can bring to their leaders. */
  ask?: string;
  /** Wording for a sector where it differs from `text`. The meaning is identical. */
  sectorText?: Partial<Record<Sector, string>>;
}

export type TakeBlock =
  | { kind: "p"; value: string }
  | { kind: "h"; value: string }
  | { kind: "ul"; value: string[] };

export interface ResolveQuestion {
  id: string;
  part: string;
  /** Short label used on the Resolution and in the side sheet. */
  label: string;
  title: string;
  sectorTitles?: Partial<Record<Sector, string>>;
  /** The common framework term, shown as a small caption. */
  term: string;
  why: string;
  how: string;
  mode: QuestionMode;
  teach: { heading: string; text: string }[];
  answers: ResolveAnswer[];
  /** Movemental's answer, shown only after the person has answered. Never counted. */
  take: { head: string; body: TakeBlock[] };
  deeper: string;
}

export interface ResolvePart {
  id: string;
  name: string;
  blurb: string;
}

const C = content as unknown as { version: string; parts: ResolvePart[]; questions: ResolveQuestion[] };

export const RESOLVE_VERSION = C.version;
export const PARTS: readonly ResolvePart[] = C.parts;
export const QUESTIONS: readonly ResolveQuestion[] = C.questions;
export const QUESTION_COUNT = QUESTIONS.length;
/** The one single-choice question: the overall approach. */
export const APPROACH_QID = "q05";
/** Questions in the first part are the person's own views ("I believe"). */
export const BELIEF_PART = "p1";

export interface SectorDef {
  id: Sector;
  label: string;
  /** How the Resolution names an unnamed organization of this kind. */
  org: string;
  /** "Examples for churches" */
  exName: string;
  namePlaceholder: string;
  rolePlaceholder: string;
}

export const SECTORS: readonly SectorDef[] = [
  { id: "church", label: "Church", org: "our church", exName: "churches", namePlaceholder: "Riverbend Church", rolePlaceholder: "Staff, elder, volunteer or member" },
  { id: "nonprofit", label: "Nonprofit", org: "our organization", exName: "nonprofits", namePlaceholder: "Eastside Family Services", rolePlaceholder: "Staff, board, volunteer or someone we serve" },
  { id: "school", label: "Seminary or school", org: "our school", exName: "seminaries and schools", namePlaceholder: "Northgate Seminary", rolePlaceholder: "Faculty, staff, trustee or student" },
  { id: "network", label: "Denomination or network", org: "our network", exName: "denominations and networks", namePlaceholder: "Plains Conference", rolePlaceholder: "Staff, board or member church leader" },
];

export function sectorDef(s: Sector): SectorDef {
  return SECTORS.find((x) => x.id === s) ?? SECTORS[0]!;
}

export const QUESTION_BY_ID: ReadonlyMap<string, ResolveQuestion> = new Map(QUESTIONS.map((q) => [q.id, q]));
export const ANSWER_BY_ID: ReadonlyMap<string, ResolveAnswer> = new Map(
  QUESTIONS.flatMap((q) => q.answers.map((a) => [a.id, a] as const)),
);

export function questionTitle(q: ResolveQuestion, s: Sector): string {
  return q.sectorTitles?.[s] ?? q.title;
}

export function answerText(a: ResolveAnswer, s: Sector): string {
  return a.sectorText?.[s] ?? a.text;
}

/** How an answer reads as a line of the Resolution: "We should" is implied by the heading. */
export function lineText(qid: string, text: string): string {
  if (QUESTION_BY_ID.get(qid)?.part === BELIEF_PART) return text;
  const t = text.replace(/^We should\s+/, "");
  return t.charAt(0).toUpperCase() + t.slice(1);
}

export function partOf(qid: string): ResolvePart | undefined {
  const q = QUESTION_BY_ID.get(qid);
  return q ? PARTS.find((p) => p.id === q.part) : undefined;
}

/** "Questions 03 to 05" for a part. */
export function partRange(partId: string): [number, number] {
  const nums = QUESTIONS.map((q, i) => (q.part === partId ? i + 1 : 0)).filter(Boolean);
  return [nums[0] ?? 1, nums.at(-1) ?? 1];
}

export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** Example decisions for a sector, loaded only when someone opens them. */
const exampleCache = new Map<Sector, Promise<Record<string, string[]>>>();
export function loadExamples(s: Sector): Promise<Record<string, string[]>> {
  let p = exampleCache.get(s);
  if (!p) {
    p = (
      s === "church"
        ? import("./content/examples-church.json")
        : s === "nonprofit"
          ? import("./content/examples-nonprofit.json")
          : s === "school"
            ? import("./content/examples-school.json")
            : import("./content/examples-network.json")
    ).then((m) => (m.default ?? m) as Record<string, string[]>);
    exampleCache.set(s, p);
  }
  return p;
}

/** Split "<strong>Lead.</strong> rest" into plain segments, so no HTML is injected. */
export function richSegments(value: string): { strong: boolean; text: string }[] {
  const out: { strong: boolean; text: string }[] = [];
  const re = /<strong>([\s\S]*?)<\/strong>/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(value))) {
    if (m.index > last) out.push({ strong: false, text: value.slice(last, m.index) });
    out.push({ strong: true, text: m[1]! });
    last = m.index + m[0].length;
  }
  if (last < value.length) out.push({ strong: false, text: value.slice(last) });
  return out;
}

export const RESOLVE_ACTS: readonly string[] = [
  "I’ll share this with someone who decides.",
  "I’ll invite a colleague to write theirs.",
  "I’ll ask for this conversation at our next team meeting.",
  "I have authority to begin this conversation for our organization.",
];
