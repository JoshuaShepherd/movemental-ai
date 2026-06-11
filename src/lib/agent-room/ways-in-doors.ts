/**
 * Curated "ways in" doors for the expanded agent conversation panel.
 * Edit this object to change copy — no prompt-library sprawl.
 */

export type WaysInAudience = "nonprofits" | "churches" | "institutions" | "exploring";

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
