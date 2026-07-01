/**
 * Curated "ways in" doors for the expanded agent conversation panel.
 * Edit this object to change copy — no prompt-library sprawl.
 */

export type WaysInAudience = "nonprofits" | "churches" | "institutions" | "exploring";

import type { ComponentId } from "@/lib/agent-room/stream-chunk";

export type AgentSayOptions = {
  /** Set when the utterance came from the expanded ways-in panel (not float chips). */
  source?: "ways-in";
  /** Expected `ui_render` target for speak-and-show (G4 expanded info chips). */
  renderComponent?: ComponentId;
  /** When true, keep the agent reply in the conversation thread — do not auto-render a local screen. */
  suppressSpeakShow?: boolean;
};

export type AgentSayHandler = (text: string, opts?: AgentSayOptions) => void;

export const WAYS_IN_LEAD_DOOR = "Map where we actually stand";

export const WAYS_IN_SEGMENTS: ReadonlyArray<{ id: WaysInAudience; label: string }> = [
  { id: "nonprofits", label: "Non-profits" },
  { id: "churches", label: "Churches" },
  { id: "institutions", label: "Institutions" },
  { id: "exploring", label: "Just exploring" },
] as const;

export const WAYS_IN_DOORS: Record<WaysInAudience, readonly string[]> = {
  nonprofits: [
    "We're already using AI and honestly it's a mess.",
    "What do we actually have to decide before we let staff use this?",
    "How do we protect donor and client data with AI in the mix?",
    "We can't afford a consultant. Where do we even start?",
  ],
  churches: [
    "Our board is nervous about AI and I need to bring them something.",
    "Is it okay for staff to use AI for sermon prep or counseling notes?",
    "We haven't decided anything about AI yet. Help us start.",
    "How do we use this without losing trust with our congregation?",
  ],
  institutions: [
    "AI is showing up across our departments with no policy.",
    "We need a governance position our board can actually ratify.",
    "What are the real risks we're exposed to right now?",
    "How do we move from ad-hoc AI use to something coherent?",
  ],
  exploring: [
    "What is Movemental, and what do you actually do?",
    "Show me the whole path.",
    "Who's behind this?",
    "What does it cost?",
  ],
};

const ALL_WAYS_IN_DOORS: ReadonlySet<string> = new Set(
  Object.values(WAYS_IN_DOORS).flatMap((doors) => [...doors, WAYS_IN_LEAD_DOOR]),
);

/** Curated ways-in copy — still uses local regex routing when the dock is expanded. */
export function isWaysInDoor(text: string): boolean {
  return ALL_WAYS_IN_DOORS.has(text.trim());
}

const NONPROFITS_HREF = "/agent/nonprofits";
const CHURCHES_HREF = "/agent/churches";
const INSTITUTIONS_HREF = "/agent/institutions";

/** Default segment from mast audience route; falls back to Just exploring. */
export function resolveWaysInAudience(pathname: string | null | undefined): WaysInAudience {
  if (!pathname) return "exploring";
  if (pathname.startsWith(NONPROFITS_HREF)) return "nonprofits";
  if (pathname.startsWith(CHURCHES_HREF)) return "churches";
  if (pathname.startsWith(INSTITUTIONS_HREF)) return "institutions";
  return "exploring";
}

const AUDIENCE_IDS: ReadonlySet<string> = new Set(WAYS_IN_SEGMENTS.map((s) => s.id));

/** Narrow an arbitrary string (e.g. a `?from=` hand-off param) to a known segment. */
export function parseWaysInAudience(value: string | null | undefined): WaysInAudience | null {
  return value && AUDIENCE_IDS.has(value) ? (value as WaysInAudience) : null;
}

/** sessionStorage key carrying the segment a visitor handed off from. */
const HANDOFF_AUDIENCE_KEY = "movemental:agent-audience";

/** sessionStorage key — document-page chip requests a local scene on `/agent` mount. */
const HANDOFF_SCENE_KEY = "movemental:agent-scene";

/** Record the originating segment so the concierge opens route-aware after hand-off. */
export function stashHandoffAudience(audience: WaysInAudience): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(HANDOFF_AUDIENCE_KEY, audience);
  } catch {
    /* sessionStorage unavailable (private mode) — the route default still applies */
  }
}

/** The segment a visitor handed off from this session, if any. */
export function readHandoffAudience(): WaysInAudience | null {
  if (typeof window === "undefined") return null;
  try {
    return parseWaysInAudience(window.sessionStorage.getItem(HANDOFF_AUDIENCE_KEY));
  } catch {
    return null;
  }
}

/** Record a local scene to run once after `/agent` opening settles (document chips). */
export function stashHandoffScene(scene: string): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(HANDOFF_SCENE_KEY, scene);
  } catch {
    /* sessionStorage unavailable */
  }
}

/** Scene stashed from a document-page chip handoff, if any. */
export function readHandoffScene(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage.getItem(HANDOFF_SCENE_KEY);
  } catch {
    return null;
  }
}

/** Clear scene handoff after consumption. */
export function clearHandoffScene(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(HANDOFF_SCENE_KEY);
  } catch {
    /* sessionStorage unavailable */
  }
}
