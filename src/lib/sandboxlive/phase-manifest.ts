/**
 * SandboxLive phase manifest — the canonical mapping from human-readable
 * phase slugs (e.g. "03-experimenting") to:
 *   - the Stitch template ID that backs the workspace fixture (when one
 *     exists in `src/lib/program/data/stitch-templates.json`)
 *   - the phase number and display name
 *   - a one-line description for the home-page phase grid
 *   - what the phase produces (used in the per-phase lede paragraph)
 *
 * The eight phases are the canonical SandboxLive arc. Phase 03 is authored in
 * React (`SandboxLivePhase03ExperimentingView`); engagement rows use
 * {@link SANDBOXLIVE_PHASE_03_ENGAGEMENT_SLUG}.
 */

export type SandboxLivePhaseSlug =
  | "01-boundaries"
  | "02-assessment"
  | "03-experimenting"
  | "04-iteration"
  | "05-reflection"
  | "06-ethics"
  | "07-discerning"
  | "08-future-plan";

export interface SandboxLivePhaseEntry {
  slug: SandboxLivePhaseSlug;
  number: string;
  /** Display name in nav, hero, and grid card. */
  name: string;
  /** Phase-grid one-line description. */
  description: string;
  /** Lede paragraph naming what the phase produces. */
  produces: string;
  /** Template ID in `stitch-templates.json`. `null` when no fixture exists. */
  templateId: string | null;
  /**
   * When `templateId` is null, cohort progress for this phase may still be
   * tracked in `program_engagements` under this slug (React workspace only).
   */
  engagementTemplateSlug?: string;
}

/** `program_engagements.template_slug` for Phase 03 — no Stitch fixture. */
export const SANDBOXLIVE_PHASE_03_ENGAGEMENT_SLUG =
  "phase_03_experimenting_workspace" as const;

export const SANDBOXLIVE_PHASES: readonly SandboxLivePhaseEntry[] = [
  {
    slug: "01-boundaries",
    number: "01",
    name: "Boundaries",
    description:
      "Name what the cohort will use AI for and what it will refuse.",
    produces:
      "A working set of in-scope use cases and named refusals — the boundary the cohort will hold for the engagement.",
    templateId: "phase_01_boundaries_workspace_movemental",
  },
  {
    slug: "02-assessment",
    number: "02",
    name: "Assessment",
    description:
      "Map current reality across the cohort: where AI already lives, what's missing.",
    produces:
      "A Current Reality Map of every place AI is already in your organizations and every place it isn't.",
    templateId: "phase_02_assessment_sandboxlive_workspace",
  },
  {
    slug: "03-experimenting",
    number: "03",
    name: "Experimenting",
    description:
      "Run small, contained AI experiments inside the boundary set in Phase 01.",
    produces:
      "A portfolio of small experiments — each one a recipe that the cohort can review, refuse, or refine.",
    templateId: null,
    engagementTemplateSlug: SANDBOXLIVE_PHASE_03_ENGAGEMENT_SLUG,
  },
  {
    slug: "04-iteration",
    number: "04",
    name: "Iteration",
    description:
      "Refine the experiments that worked. Retire the ones that didn't.",
    produces:
      "Iterated recipes ready to graduate into named use cases, plus a written record of what was retired and why.",
    templateId: "phase_04_iteration_sandboxlive_workspace",
  },
  {
    slug: "05-reflection",
    number: "05",
    name: "Reflection",
    description:
      "Pause. Write down what the cohort has learned about itself and its mission.",
    produces:
      "Cohort reflections — written by each leader — naming what AI is revealing about the mission, the work, and the team.",
    templateId: "phase_05_reflection_sandboxlive_workspace",
  },
  {
    slug: "06-ethics",
    number: "06",
    name: "Ethics review",
    description:
      "Hold every surviving use case against a written ethical standard.",
    produces:
      "Ethics review verdicts — green light, yellow light, red light — recorded for every use case still under consideration.",
    templateId: "phase_06_ethics_review_sandboxlive_dashboard",
  },
  {
    slug: "07-discerning",
    number: "07",
    name: "Discerning adjudication",
    description:
      "Adjudicate disagreement. Decide what the cohort will commit to as a body.",
    produces:
      "Discerning verdicts — final adjudications across the cohort on each use case, recorded with rationale.",
    templateId: "phase_07_discerning_adjudication_workspace",
  },
  {
    slug: "08-future-plan",
    number: "08",
    name: "Future plan",
    description:
      "Compose the board-facing document — green/yellow/red lights, schedule, budget, approval.",
    produces:
      "A Future Plan — the cumulative deliverable of the engagement, ready for board distribution.",
    templateId: "phase_08_future_plan_editor_sandboxlive_workspace",
  },
] as const;

/**
 * Lookup helpers — keep the consuming code simple.
 */
const SLUG_INDEX: Record<SandboxLivePhaseSlug, SandboxLivePhaseEntry> =
  SANDBOXLIVE_PHASES.reduce(
    (acc, entry) => {
      acc[entry.slug] = entry;
      return acc;
    },
    {} as Record<SandboxLivePhaseSlug, SandboxLivePhaseEntry>,
  );

export function getSandboxLivePhase(
  slug: string,
): SandboxLivePhaseEntry | undefined {
  return SLUG_INDEX[slug as SandboxLivePhaseSlug];
}

export function isSandboxLivePhaseSlug(slug: string): slug is SandboxLivePhaseSlug {
  return slug in SLUG_INDEX;
}

export function getNextSandboxLivePhase(
  slug: SandboxLivePhaseSlug,
): SandboxLivePhaseEntry | undefined {
  const idx = SANDBOXLIVE_PHASES.findIndex((p) => p.slug === slug);
  if (idx < 0 || idx >= SANDBOXLIVE_PHASES.length - 1) return undefined;
  return SANDBOXLIVE_PHASES[idx + 1];
}
