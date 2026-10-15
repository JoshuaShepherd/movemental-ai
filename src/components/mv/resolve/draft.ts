"use client";

import { useSyncExternalStore } from "react";

import { NOT_READY_ACT, RESOLVE_ACTS, RESOLVE_THEMES } from "./themes";

/**
 * The person's Resolution, kept on this device only (localStorage).
 *
 * Fixture seam: there is no back end yet. Saving, sharing, invitations and organization
 * counts are front-end state. TODO(back-end merge): replace this module's storage with the
 * resolution service described in docs/handoff/resolve-new/SCHEMA-REQUEST.md, keeping the
 * same shape so the screens do not change.
 */

export type OrgType = "Church" | "Nonprofit" | "Seminary" | "Denomination";
export type FlowStep = "arrive" | "theme" | "review" | "lead";
export type Visibility = "private" | "link" | "public";

export interface ResolutionVersion {
  at: string;
  lines: string[];
}

export interface Invitation {
  from: string;
  pronoun: "she" | "he" | "they";
}

export interface ResolutionDraft {
  v: 1;
  id?: string;
  shareToken?: string;
  orgType: OrgType;
  org: string;
  /** "themeIndex-statementIndex" for every statement ticked. */
  ticks: Record<string, true>;
  /** themeIndex → starred statement index. */
  stars: Record<number, number>;
  skipped: Record<number, true>;
  /** themeIndex of the line hardest to adopt; -1 for "None of them". */
  hardest: number | null;
  acts: number[];
  two: string;
  name: string;
  role: string;
  step: FlowStep;
  ti: number;
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
    v: 1,
    orgType: "Nonprofit",
    org: "",
    ticks: {},
    stars: {},
    skipped: {},
    hardest: null,
    acts: [],
    two: "",
    name: "",
    role: "",
    step: "arrive",
    ti: 0,
    finishedAt: null,
    versions: [],
    saved: null,
    visibility: "private",
    research: false,
    countInOrg: true,
    invitation: null,
  };
}

const KEY = "mv.resolution.v1";
let cache: ResolutionDraft | null | undefined;
const listeners = new Set<() => void>();

function read(): ResolutionDraft | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    return { ...emptyDraft(), ...(JSON.parse(raw) as Partial<ResolutionDraft>), v: 1 };
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

export const ORG_TYPE_LABELS: Record<OrgType, string> = {
  Church: "Church",
  Nonprofit: "Nonprofit",
  Seminary: "Seminary or college",
  Denomination: "Denomination or network",
};

export const ORG_TYPES: readonly OrgType[] = ["Church", "Nonprofit", "Seminary", "Denomination"];

/** The church edition replaces one Presence statement (from the board's edition switch). */
export function statementText(orgType: OrgType, ti: number, j: number): string {
  if (orgType === "Church" && ti === 0 && j === 2) return "We should keep prayer human.";
  return RESOLVE_THEMES[ti]!.statements[j]!;
}

/** The organization as written on the Resolution. Unnamed organizations read "our organization". */
export function orgName(d: ResolutionDraft): string {
  return d.org.trim() || "our organization";
}

export function hasOrgName(d: ResolutionDraft): boolean {
  return d.org.trim().length > 0;
}

export interface ResolutionLine {
  ti: number;
  theme: string;
  text: string;
}

export function starredLines(d: ResolutionDraft): ResolutionLine[] {
  return RESOLVE_THEMES.flatMap((t, ti) => {
    const j = d.stars[ti];
    return j === undefined ? [] : [{ ti, theme: t.name, text: statementText(d.orgType, ti, j) }];
  });
}

/** Statements ticked but not starred, in theme order. */
export function otherMarkedLines(d: ResolutionDraft): ResolutionLine[] {
  return RESOLVE_THEMES.flatMap((t, ti) =>
    t.statements.flatMap((_, j) =>
      d.ticks[`${ti}-${j}`] && d.stars[ti] !== j
        ? [{ ti, theme: t.name, text: statementText(d.orgType, ti, j) }]
        : [],
    ),
  );
}

export function hardestLine(d: ResolutionDraft): string {
  if (d.hardest === null || d.hardest < 0) return "";
  const j = d.stars[d.hardest];
  return j === undefined ? "" : statementText(d.orgType, d.hardest, j);
}

export function chosenActs(d: ResolutionDraft): string[] {
  return RESOLVE_ACTS.filter((_, i) => i !== NOT_READY_ACT && d.acts.includes(i));
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const NUMBER_WORDS = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

export function numberWord(n: number): string {
  return NUMBER_WORDS[n] ?? String(n);
}

/**
 * Persist the current draft to the database via /api/resolve/save.
 * Updates local draft with returned shareToken, id, and saved timestamp.
 */
export async function syncResolutionToBackend(
  draft: ResolutionDraft,
  options?: { email?: string; name?: string; role?: string }
): Promise<{ ok: boolean; shareToken?: string; error?: string }> {
  try {
    const email = options?.email ?? draft.saved?.email;
    const displayName = options?.name ?? draft.name;
    const roleText = options?.role ?? draft.role;

    const lines = starredLines(draft).map((l) => `${l.theme}: ${l.text}`);

    const res = await fetch("/api/resolve/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email || undefined,
        orgType: draft.orgType,
        orgLabel: draft.org.trim() || "our organization",
        visibility: draft.visibility,
        researchConsent: draft.research,
        countInOrg: draft.countInOrg,
        displayName: displayName || undefined,
        roleText: roleText || undefined,
        selections: {
          ticks: draft.ticks,
          stars: draft.stars,
          skipped: draft.skipped,
        },
        hardestTheme: draft.hardest,
        acts: draft.acts,
        twoMinutes: draft.two,
        lines,
      }),
    });

    const json = await res.json();
    if (!res.ok || !json.ok) {
      return { ok: false, error: json.error?.message || "Failed to save Resolution" };
    }

    const { shareToken, resolutionId, savedAt } = json.data;
    updateDraft((d) => ({
      ...d,
      id: resolutionId,
      shareToken,
      saved: email ? { email, at: savedAt } : (d.saved ? { ...d.saved, at: savedAt } : { email: "", at: savedAt }),
      name: displayName ?? d.name,
      role: roleText ?? d.role,
    }));

    return { ok: true, shareToken };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Network error" };
  }
}

