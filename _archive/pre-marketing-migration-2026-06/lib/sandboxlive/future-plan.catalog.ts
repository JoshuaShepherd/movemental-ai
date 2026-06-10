/**
 * Future Plan section manifest + shared types — safe for Client Components.
 * (DB access lives in {@link ./future-plan.server}.)
 */

export type FuturePlanSectionSlug =
  | "context"
  | "vision"
  | "strategy"
  | "refusals"
  | "roadmap"
  | "metrics";

export interface FuturePlanSectionEntry {
  slug: FuturePlanSectionSlug;
  /** 1-based order shown in the tab nav and the export. */
  order: number;
  name: string;
  /** Eyebrow used above the section title in the editor and export. */
  eyebrow: string;
  /** Italic display heading for the section. */
  heading: string;
  /** One-line description shown beneath the heading. */
  prompt: string;
  /** Placeholder shown when the section's body is empty. */
  placeholder: string;
}

export const FUTURE_PLAN_SECTIONS: readonly FuturePlanSectionEntry[] = [
  {
    slug: "context",
    order: 1,
    name: "Context",
    eyebrow: "Section 01",
    heading: "Where the cohort begins.",
    prompt:
      "The factual ground the plan is being written on — mission, current operating reality, the work the cohort just walked through.",
    placeholder:
      "Set the context. What is true about the organization right now that the board needs to see before reading the rest of the plan?",
  },
  {
    slug: "vision",
    order: 2,
    name: "Vision",
    eyebrow: "Section 02",
    heading: "What the cohort is moving toward.",
    prompt:
      "The mission-aligned future the plan is steering the organization into. Should read as recognizably yours — not a generic strategy doc.",
    placeholder:
      "Describe the future the organization is committing to. Keep the language plain — what does success look like in two or three years?",
  },
  {
    slug: "strategy",
    order: 3,
    name: "Strategy",
    eyebrow: "Section 03",
    heading: "How the cohort intends to get there.",
    prompt:
      "The active commitments — what the organization will do, who will own each piece, on what timeline. The green lights from your discerning verdicts.",
    placeholder:
      "Name the active commitments. For each, write owner, timeline, and what success means. This is the green-light list.",
  },
  {
    slug: "refusals",
    order: 4,
    name: "What we refuse",
    eyebrow: "Section 04",
    heading: "What the cohort will not do.",
    prompt:
      "Use cases the discerning process refused, with the rationale. Strategy is defined as much by exclusion as inclusion — this is the red-light list, written down so future-you can hold the line.",
    placeholder:
      "List refused use cases with rationale. Every entry should answer: what was proposed, why was it refused, what would have to change for the answer to flip.",
  },
  {
    slug: "roadmap",
    order: 5,
    name: "Roadmap",
    eyebrow: "Section 05",
    heading: "The sequence and the rhythm.",
    prompt:
      "Implementation schedule. What happens first, what waits, what depends on what. Quarterly cadence is usually right.",
    placeholder:
      "Lay out the sequence. Quarter-by-quarter is usually the right grain. Name the dependencies — what has to land before the next thing can start.",
  },
  {
    slug: "metrics",
    order: 6,
    name: "Metrics",
    eyebrow: "Section 06",
    heading: "What the cohort will watch.",
    prompt:
      "How the organization will know the plan is working. Mission-aligned metrics — outcomes, not vanity numbers.",
    placeholder:
      "Name the metrics that will tell you whether the plan is working. Keep them few and mission-aligned. Vanity numbers don&rsquo;t belong here.",
  },
] as const;

const SECTION_INDEX: Record<FuturePlanSectionSlug, FuturePlanSectionEntry> =
  FUTURE_PLAN_SECTIONS.reduce(
    (acc, entry) => {
      acc[entry.slug] = entry;
      return acc;
    },
    {} as Record<FuturePlanSectionSlug, FuturePlanSectionEntry>,
  );

export function getFuturePlanSection(slug: string): FuturePlanSectionEntry | undefined {
  return SECTION_INDEX[slug as FuturePlanSectionSlug];
}

/** Per-section content shape stored under `future_plans.content[slug]`. */
export interface FuturePlanSectionContent {
  body_md: string;
}

export type FuturePlanContent = Partial<Record<FuturePlanSectionSlug, FuturePlanSectionContent>>;

export type FuturePlanStatus = "draft" | "under_review" | "ratified" | "archived";
