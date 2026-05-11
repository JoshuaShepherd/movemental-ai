import "server-only";

import { and, asc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  futurePlanRatifications,
  futurePlanVersions,
  futurePlans,
  organizations,
} from "@/lib/db/schema";

/**
 * The Future Plan section manifest — the six-section narrative the cohort
 * composes for board distribution. Order matters: the editor renders them as
 * tabs in this order, and the board export prints them in this order.
 *
 * Section taxonomy is lifted from the Stitch `future_plan_drafting_editor`
 * template (six sections, not the Green/Yellow/Red Lights model the
 * pre-migration spec described — the authored design supersedes).
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

export function getFuturePlanSection(
  slug: string,
): FuturePlanSectionEntry | undefined {
  return SECTION_INDEX[slug as FuturePlanSectionSlug];
}

/** Per-section content shape stored under `future_plans.content[slug]`. */
export interface FuturePlanSectionContent {
  body_md: string;
}

export type FuturePlanContent = Partial<
  Record<FuturePlanSectionSlug, FuturePlanSectionContent>
>;

export type FuturePlanStatus = "draft" | "under_review" | "ratified" | "archived";

export interface FuturePlanState {
  /** When the row doesn't exist yet. */
  organizationId: string;
  organizationName: string;
  /** Null when no row has been created. */
  planId: string | null;
  status: FuturePlanStatus;
  content: FuturePlanContent;
  currentVersion: number;
  latestRatification: {
    id: string;
    versionId: string;
    ratifiedAt: string;
    notes: string | null;
  } | null;
}

/**
 * Loads (and lazily creates) the organization's Future Plan. Returns an empty
 * draft when nothing exists yet. Tables may not exist in some environments —
 * fall back to an empty in-memory plan so the page still renders.
 */
export async function loadFuturePlanState(
  organizationId: string,
): Promise<FuturePlanState> {
  const [org] = await db
    .select({ id: organizations.id, name: organizations.name })
    .from(organizations)
    .where(eq(organizations.id, organizationId))
    .limit(1);

  const organizationName = org?.name ?? "Your organization";

  const emptyState: FuturePlanState = {
    organizationId,
    organizationName,
    planId: null,
    status: "draft",
    content: {},
    currentVersion: 1,
    latestRatification: null,
  };

  let row: typeof futurePlans.$inferSelect | undefined;
  try {
    const rows = await db
      .select()
      .from(futurePlans)
      .where(eq(futurePlans.organization_id, organizationId))
      .limit(1);
    row = rows[0];
  } catch {
    return emptyState;
  }

  if (!row) return emptyState;

  let latestRatification: FuturePlanState["latestRatification"] = null;
  try {
    const ratifications = await db
      .select({
        id: futurePlanRatifications.id,
        version_id: futurePlanRatifications.version_id,
        ratified_at: futurePlanRatifications.ratified_at,
        notes: futurePlanRatifications.notes,
      })
      .from(futurePlanRatifications)
      .where(eq(futurePlanRatifications.future_plan_id, row.id))
      .orderBy(asc(futurePlanRatifications.ratified_at))
      .limit(1);
    const r = ratifications.at(-1);
    if (r) {
      latestRatification = {
        id: r.id,
        versionId: r.version_id,
        ratifiedAt: r.ratified_at,
        notes: r.notes,
      };
    }
  } catch {
    latestRatification = null;
  }

  return {
    organizationId,
    organizationName,
    planId: row.id,
    status: (row.status as FuturePlanStatus) ?? "draft",
    content: (row.content as FuturePlanContent) ?? {},
    currentVersion: row.current_version ?? 1,
    latestRatification,
  };
}

/**
 * Persists a single section's markdown body. Creates the plan row on first
 * write, snapshots the prior content into `future_plan_versions`, and bumps
 * `current_version`. Safe to call repeatedly — each call creates a version
 * row.
 *
 * Returns `{ ok: true, version }` on success; `{ ok: false, reason }` when
 * tables don't exist or another constraint trips. The editor surfaces the
 * reason in the UI.
 */
export async function saveFuturePlanSection(params: {
  organizationId: string;
  userId: string | null;
  sectionSlug: FuturePlanSectionSlug;
  bodyMarkdown: string;
}): Promise<
  { ok: true; version: number } | { ok: false; reason: string }
> {
  const { organizationId, userId, sectionSlug, bodyMarkdown } = params;

  try {
    const existing = await db
      .select()
      .from(futurePlans)
      .where(eq(futurePlans.organization_id, organizationId))
      .limit(1);

    const previousContent = (existing[0]?.content as FuturePlanContent) ?? {};
    const previousVersion = existing[0]?.current_version ?? 1;
    const planExists = Boolean(existing[0]);

    const nextContent: FuturePlanContent = {
      ...previousContent,
      [sectionSlug]: { body_md: bodyMarkdown },
    };
    const nextVersion = planExists ? previousVersion + 1 : 1;

    let planId: string;
    if (planExists) {
      planId = existing[0]!.id;
      await db
        .update(futurePlans)
        .set({
          content: nextContent,
          current_version: nextVersion,
          updated_at: new Date().toISOString(),
        })
        .where(and(eq(futurePlans.id, planId)));
    } else {
      const inserted = await db
        .insert(futurePlans)
        .values({
          organization_id: organizationId,
          status: "draft",
          content: nextContent,
          current_version: nextVersion,
        })
        .returning({ id: futurePlans.id });
      planId = inserted[0].id;
    }

    await db.insert(futurePlanVersions).values({
      future_plan_id: planId,
      version_number: nextVersion,
      content_snapshot: nextContent,
      edited_by_user_id: userId,
      section_slug: sectionSlug,
    });

    return { ok: true, version: nextVersion };
  } catch (e) {
    const message = e instanceof Error ? e.message : "unknown error";
    return {
      ok: false,
      reason: `Future Plan tables not yet migrated: ${message}`,
    };
  }
}
