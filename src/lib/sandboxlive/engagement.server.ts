import "server-only";

import { and, eq, inArray } from "drizzle-orm";

import { db } from "@/lib/db";
import { organizations, programEngagements } from "@/lib/db/schema";
import {
  SANDBOXLIVE_PHASES,
  type SandboxLivePhaseSlug,
} from "@/lib/sandboxlive/phase-manifest";

export type PhaseStatus = "not_started" | "in_progress" | "complete";

export interface SandboxLivePhaseStatus {
  slug: SandboxLivePhaseSlug;
  status: PhaseStatus;
}

export interface SandboxLiveEngagementState {
  organizationId: string;
  cohortName: string;
  phases: SandboxLivePhaseStatus[];
  currentPhaseSlug: SandboxLivePhaseSlug | null;
}

/**
 * Reads `program_engagements` rows for the SandboxLive phase template IDs
 * and derives a coarse per-phase status. "complete" requires every milestone
 * (if any) to be in state `complete`; otherwise a row with any data counts
 * as `in_progress`; absence of a row is `not_started`.
 *
 * `currentPhaseSlug` is the first phase that is not yet `complete` — used by
 * the home hero to say "your cohort is currently in Phase 0X". Returns `null`
 * if every phase is complete (engagement done) or every phase is untouched
 * (engagement not started — fall back to Phase 01 in copy).
 */
export async function loadSandboxLiveEngagementState(
  organizationId: string,
): Promise<SandboxLiveEngagementState> {
  const [org] = await db
    .select({ id: organizations.id, name: organizations.name })
    .from(organizations)
    .where(eq(organizations.id, organizationId))
    .limit(1);

  const cohortName = org?.name ?? "Your cohort";

  const templateSlugs = SANDBOXLIVE_PHASES.map((p) => p.templateId ?? p.engagementTemplateSlug).filter(
    (id): id is string => Boolean(id),
  );

  // `program_engagements` may not yet exist in some environments — degrade
  // gracefully to "no data" rather than 500-ing the home page.
  let rows: Array<{
    template_slug: string;
    summary_markdown: string | null;
    milestones: unknown;
  }> = [];
  if (templateSlugs.length) {
    try {
      rows = await db
        .select({
          template_slug: programEngagements.template_slug,
          summary_markdown: programEngagements.summary_markdown,
          milestones: programEngagements.milestones,
        })
        .from(programEngagements)
        .where(
          and(
            eq(programEngagements.organization_id, organizationId),
            inArray(programEngagements.template_slug, templateSlugs),
          ),
        );
    } catch {
      rows = [];
    }
  }

  const byTemplate = new Map(rows.map((r) => [r.template_slug, r] as const));

  const phases: SandboxLivePhaseStatus[] = SANDBOXLIVE_PHASES.map((p) => {
    const slugKey = p.templateId ?? p.engagementTemplateSlug;
    if (!slugKey) return { slug: p.slug, status: "not_started" };
    const row = byTemplate.get(slugKey);
    if (!row) return { slug: p.slug, status: "not_started" };

    if (Array.isArray(row.milestones) && row.milestones.length > 0) {
      const allComplete = (row.milestones as Array<{ state?: string }>).every(
        (m) => m?.state === "complete",
      );
      if (allComplete) return { slug: p.slug, status: "complete" };
    }

    const hasAnyData =
      (typeof row.summary_markdown === "string" && row.summary_markdown.length > 0) ||
      (Array.isArray(row.milestones) && row.milestones.length > 0);

    return { slug: p.slug, status: hasAnyData ? "in_progress" : "not_started" };
  });

  const currentPhase = phases.find((p) => p.status !== "complete");
  const currentPhaseSlug = currentPhase
    ? currentPhase.slug
    : phases.every((p) => p.status === "complete")
      ? null
      : phases[0].slug;

  return {
    organizationId,
    cohortName,
    phases,
    currentPhaseSlug,
  };
}
