/**
 * Canonical public labels for the Movemental path and Safety lead magnet.
 * Single switch for agent-room scenes — import here instead of scattering literals.
 */

/** Four path stages as shown in the rail, beat tags, and body copy. */
export const PATH_STAGE_LABELS = {
  safety: "Safety",
  sandbox: "Sandbox",
  training: "Training",
  tech: "Tech",
} as const;

/** Internal map-q stage keys → public path labels. */
export const PATH_STAGE_DISPLAY: Record<
  "safety" | "sandbox" | "training" | "tech",
  string
> = {
  safety: PATH_STAGE_LABELS.safety,
  sandbox: PATH_STAGE_LABELS.sandbox,
  training: PATH_STAGE_LABELS.training,
  tech: PATH_STAGE_LABELS.tech,
};

/** Ordered stage titles for rails and lists (01–04). */
export const PATH_STAGE_RAIL = [
  { n: "01", title: PATH_STAGE_LABELS.safety },
  { n: "02", title: PATH_STAGE_LABELS.sandbox },
  { n: "03", title: PATH_STAGE_LABELS.training },
  { n: "04", title: PATH_STAGE_LABELS.tech },
] as const;

/** Safety stage deliverable — board-ratified organizational artifact. */
export const SAFETY_CHARTER = {
  fullTitle: "AI Charter",
  shortLabel: "Charter",
} as const;

/** Safety stage lead magnet — free field guide / download. */
export const SAFETY_HANDBOOK = {
  fullTitle: "AI Safety Handbook",
  shortLabel: "Handbook",
} as const;

/** Sandbox stage lead magnet — free field guide / download. */
export const SANDBOX_HANDBOOK = {
  fullTitle: "It Continues With Exploration",
  shortLabel: "Field Guide",
} as const;

/** @deprecated Use {@link SAFETY_HANDBOOK}. */
export const SAFETY_GUIDEBOOK = SAFETY_HANDBOOK;

/** Phrase for CTAs and voice lines (e.g. "Get the free Handbook"). */
export const FREE_HANDBOOK_CTA = `Get the free ${SAFETY_HANDBOOK.shortLabel}` as const;

/** @deprecated Use {@link FREE_HANDBOOK_CTA}. */
export const FREE_GUIDEBOOK_CTA = FREE_HANDBOOK_CTA;

/** Founding year and origin — use in about copy, profiles, and voice lines. */
export const MOVEMENTAL_FOUNDING = {
  year: 2026,
  origin:
    "Movemental took shape in 2026, out of a two-year conversation among Alan, Brad, and Josh.",
} as const;
