"use client";

import { useSyncExternalStore } from "react";

import {
  APPROACH_QID,
  BELIEF_PART,
  PARTS,
  QUESTIONS,
  QUESTION_COUNT,
  RESOLVE_ACTS,
  type ResolveAnswer,
  type ResolveQuestion,
  type Sector,
  answerText,
  lineText,
  sectorDef,
} from "./questions";

/**
 * The person's Resolution, kept on this device (localStorage) until they save it.
 * Shape follows docs/handoff/resolve-v3/README.md: one `Pick` per question, keyed by
 * question id, with ticks and stars keyed by answer id so counts work across sectors.
 */

export type FlowStep = "arrive" | "question" | "review" | "lead";
export type Visibility = "private" | "link" | "public";

export interface Pick {
  ticks: Record<string, true>;
  /** Multi questions: the one answer starred as most important. */
  star: string | null;
  /** The single-choice question (q05): the answer chosen. */
  choice: string | null;
  /** "None of these fits my view". */
  none: boolean;
  /** Their own words. Private, never counted. */
  own: string;
}

export interface ResolutionVersion {
  at: string;
  lines: string[];
}

export interface Invitation {
  from: string;
  pronoun: "she" | "he" | "they";
}

export interface ResolutionDraft {
  v: 2;
  id?: string;
  shareToken?: string;
  sector: Sector;
  org: string;
  picks: Record<string, Pick>;
  /** Answer id of the line hardest to do today, or "none". */
  hardest: string | null;
  /** Indexes into RESOLVE_ACTS. */
  acts: number[];
  two: string;
  name: string;
  role: string;
  step: FlowStep;
  /** Question index, 0 to 13, while step is "question". */
  qi: number;
  finishedAt: string | null;
  versions: ResolutionVersion[];
  saved: { email: string; at: string } | null;
  visibility: Visibility;
  research: boolean;
  countInOrg: boolean;
  invitation: Invitation | null;
}

export function emptyDraft(): ResolutionDraft {
  return {
    v: 2,
    sector: "church",
    org: "",
    picks: {},
    hardest: null,
    acts: [],
    two: "",
    name: "",
    role: "",
    step: "arrive",
    qi: 0,
    finishedAt: null,
    versions: [],
    saved: null,
    visibility: "private",
    research: false,
    countInOrg: true,
    invitation: null,
  };
}

export function emptyPick(): Pick {
  return { ticks: {}, star: null, choice: null, none: false, own: "" };
}

/** v1 drafts (nine themes) do not map to the questions and are left untouched under their own key. */
const KEY = "mv.resolution.v2";
let cache: ResolutionDraft | null | undefined;
const listeners = new Set<() => void>();

function read(): ResolutionDraft | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ResolutionDraft>;
    if (parsed.v !== 2) return null;
    return { ...emptyDraft(), ...parsed, v: 2 };
  } catch {
    return null;
  }
}

function getSnapshot(): ResolutionDraft | null {
  if (cache === undefined) cache = read();
  return cache;
}

/** On the server and during hydration the draft is unknown. */
function getServerSnapshot(): undefined {
  return undefined;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function writeDraft(next: ResolutionDraft | null) {
  cache = next;
  try {
    if (next) window.localStorage.setItem(KEY, JSON.stringify(next));
    else window.localStorage.removeItem(KEY);
  } catch {
    // Storage can be unavailable (private windows, blocked site data). The draft still
    // lives in memory for this visit.
  }
  listeners.forEach((l) => l());
}

/** `undefined` while loading, `null` when this device has no Resolution. */
export function useDraft(): ResolutionDraft | null | undefined {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function updateDraft(fn: (d: ResolutionDraft) => ResolutionDraft) {
  writeDraft(fn(getSnapshot() ?? emptyDraft()));
}

/* Derived values */

export function pickOf(d: ResolutionDraft, qid: string): Pick {
  return d.picks[qid] ?? emptyPick();
}

export function isAnswered(d: ResolutionDraft, q: ResolveQuestion): boolean {
  const p = pickOf(d, q.id);
  return p.none || !!p.choice || Object.keys(p.ticks).length > 0;
}

export function answeredCount(d: ResolutionDraft): number {
  return QUESTIONS.filter((q) => isAnswered(d, q)).length;
}

export function firstOpenIndex(d: ResolutionDraft): number {
  const i = QUESTIONS.findIndex((q) => !isAnswered(d, q));
  return i < 0 ? QUESTION_COUNT - 1 : i;
}

/** The organization as written on the Resolution. Unnamed organizations read "our church". */
export function orgName(d: ResolutionDraft): string {
  return d.org.trim() || sectorDef(d.sector).org;
}

/** Capitalized for the start of a sentence or heading. */
export function orgTitle(d: ResolutionDraft): string {
  const n = orgName(d);
  return n.charAt(0).toUpperCase() + n.slice(1);
}

export function hasOrgName(d: ResolutionDraft): boolean {
  return d.org.trim().length > 0;
}

export function orgPossessive(d: ResolutionDraft): string {
  return `${orgName(d)}’s`;
}

export interface QuestionLines {
  qid: string;
  label: string;
  /** The starred answer (or the q05 choice, or the first tick). */
  lead: { id: string; text: string } | null;
  others: string[];
  own: string;
  none: boolean;
}

export function questionLines(d: ResolutionDraft, q: ResolveQuestion): QuestionLines {
  const p = pickOf(d, q.id);
  const text = (a: ResolveAnswer) => lineText(q.id, answerText(a, d.sector));
  const chosen =
    q.mode === "single" ? q.answers.filter((a) => a.id === p.choice) : q.answers.filter((a) => p.ticks[a.id]);
  const lead = q.mode === "single" ? chosen[0] : (q.answers.find((a) => a.id === p.star) ?? chosen[0]);
  return {
    qid: q.id,
    label: q.label,
    lead: lead ? { id: lead.id, text: text(lead) } : null,
    others: chosen.filter((a) => a !== lead).map(text),
    own: p.own.trim(),
    none: p.none,
  };
}

export function beliefLines(d: ResolutionDraft): QuestionLines[] {
  return QUESTIONS.filter((q) => q.part === BELIEF_PART).map((q) => questionLines(d, q));
}

export function orgLineParts(d: ResolutionDraft): { name: string; rows: QuestionLines[] }[] {
  return PARTS.filter((p) => p.id !== BELIEF_PART).map((p) => ({
    name: p.name,
    rows: QUESTIONS.filter((q) => q.part === p.id).map((q) => questionLines(d, q)),
  }));
}

/** Leading lines of the "We should" questions, the candidates for "hardest to do today". */
export function hardestCandidates(d: ResolutionDraft): { id: string; text: string }[] {
  return QUESTIONS.filter((q) => q.part !== BELIEF_PART && q.id !== APPROACH_QID).flatMap((q) => {
    const l = questionLines(d, q).lead;
    return l ? [l] : [];
  });
}

export function hardestLine(d: ResolutionDraft): string {
  if (!d.hardest || d.hardest === "none") return "";
  return hardestCandidates(d).find((c) => c.id === d.hardest)?.text ?? "";
}

/** The question to bring to leaders, from the starred first-step answer (q03). */
export function leaderQuestion(d: ResolutionDraft): string {
  const q3 = QUESTIONS.find((q) => q.id === "q03");
  if (!q3) return "";
  const lead = questionLines(d, q3).lead;
  return (lead && q3.answers.find((a) => a.id === lead.id)?.ask) || "";
}

export function chosenActs(d: ResolutionDraft): string[] {
  return RESOLVE_ACTS.filter((_, i) => d.acts.includes(i));
}

/** A flat, readable snapshot used for versions and the saved record. */
export function snapshotLines(d: ResolutionDraft): string[] {
  return QUESTIONS.flatMap((q) => {
    const l = questionLines(d, q);
    return l.lead ? [`${q.label}: ${l.lead.text}`] : [];
  });
}

export function hasAnyAnswer(d: ResolutionDraft): boolean {
  return QUESTIONS.some((q) => questionLines(d, q).lead);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

const NUMBER_WORDS = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen"];

export function numberWord(n: number): string {
  return NUMBER_WORDS[n] ?? String(n);
}

/** What the server stores for a version. Ticks and stars are by answer id; own words stay on this device. */
export function savePayload(d: ResolutionDraft) {
  const picks = Object.fromEntries(
    Object.entries(d.picks).map(([qid, p]) => [
      qid,
      { ticks: Object.keys(p.ticks), star: p.star, choice: p.choice, none: p.none },
    ]),
  );
  return {
    sector: d.sector,
    picks,
    hardest: d.hardest,
    hardestText: hardestLine(d),
    beliefs: beliefLines(d).map(({ label, lead, others }) => ({ label, text: lead?.text ?? "", others })),
    parts: orgLineParts(d).map((p) => ({
      name: p.name,
      rows: p.rows.map(({ label, lead, others }) => ({ label, text: lead?.text ?? "", others })),
    })),
  };
}

/**
 * Persist the current draft via /api/resolve/save.
 * Updates the local draft with the returned share token, id and saved time.
 */
export async function syncResolutionToBackend(
  draft: ResolutionDraft,
  options?: { email?: string; name?: string; role?: string },
): Promise<{ ok: boolean; shareToken?: string; error?: string }> {
  try {
    const email = options?.email ?? draft.saved?.email;
    const displayName = options?.name ?? draft.name;
    const roleText = options?.role ?? draft.role;
    const res = await fetch("/api/resolve/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email || undefined,
        orgType: sectorDef(draft.sector).label,
        orgLabel: draft.org.trim() || sectorDef(draft.sector).org,
        visibility: draft.visibility,
        researchConsent: draft.research,
        countInOrg: draft.countInOrg,
        displayName: displayName || undefined,
        roleText: roleText || undefined,
        v2: savePayload(draft),
        acts: chosenActs(draft),
        twoMinutes: draft.two,
        lines: snapshotLines(draft),
      }),
    });
    const json = await res.json();
    if (!res.ok || !json.ok) {
      return { ok: false, error: json.error?.message || "Your Resolution didn’t save. Try again in a moment." };
    }
    const { shareToken, resolutionId, savedAt } = json.data;
    updateDraft((d) => ({
      ...d,
      id: resolutionId,
      shareToken,
      saved: email ? { email, at: savedAt } : d.saved ? { ...d.saved, at: savedAt } : { email: "", at: savedAt },
      name: displayName ?? d.name,
      role: roleText ?? d.role,
    }));
    return { ok: true, shareToken };
  } catch {
    return { ok: false, error: "Your Resolution didn’t save. Check your connection and try again." };
  }
}
