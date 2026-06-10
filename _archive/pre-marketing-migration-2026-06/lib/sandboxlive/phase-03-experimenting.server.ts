import "server-only";

import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  cohortMembers,
  organizations,
  programEngagements,
} from "@/lib/db/schema";
import { SANDBOXLIVE_PHASE_03_ENGAGEMENT_SLUG } from "@/lib/sandboxlive/phase-manifest";
import {
  resolveActiveOrganizationId,
} from "@/lib/services/onboarding/onboarding.service";

/** Milestone row when `kind` is omitted or `recipe` — active cohort recipe. */
export type Phase03RecipeMilestone = {
  kind?: string;
  recipeSlug?: string;
  status?: string;
  owner?: string;
  lastActivity?: string;
};

/** Cohort member experiment log entry — stored in `milestones` with this kind. */
export type Phase03RecordingMilestone = {
  kind: "experiment_recording";
  author?: string;
  organizationName?: string;
  results?: string;
  learnings?: string;
  iterations?: string;
  updatedAt?: string;
};

export interface Phase03CohortPeer {
  organizationId: string;
  organizationName: string;
  leaderName: string | null;
  leaderRole: string | null;
}

export interface Phase03ExperimentingData {
  organizationId: string;
  organizationName: string;
  cohortId: string | null;
  engagementSummary: string | null;
  recipeMilestones: Phase03RecipeMilestone[];
  recordingMilestones: Phase03RecordingMilestone[];
  cohortPeers: Phase03CohortPeer[];
}

function partitionMilestones(raw: unknown): {
  recipes: Phase03RecipeMilestone[];
  recordings: Phase03RecordingMilestone[];
} {
  if (!Array.isArray(raw)) return { recipes: [], recordings: [] };
  const recipes: Phase03RecipeMilestone[] = [];
  const recordings: Phase03RecordingMilestone[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const row = item as Record<string, unknown>;
    if (row.kind === "experiment_recording") {
      recordings.push({
        kind: "experiment_recording",
        author: typeof row.author === "string" ? row.author : undefined,
        organizationName:
          typeof row.organizationName === "string" ? row.organizationName : undefined,
        results: typeof row.results === "string" ? row.results : undefined,
        learnings: typeof row.learnings === "string" ? row.learnings : undefined,
        iterations: typeof row.iterations === "string" ? row.iterations : undefined,
        updatedAt: typeof row.updatedAt === "string" ? row.updatedAt : undefined,
      });
      continue;
    }
    if (row.kind === "recipe" || row.recipeSlug) {
      recipes.push({
        kind: typeof row.kind === "string" ? row.kind : undefined,
        recipeSlug: typeof row.recipeSlug === "string" ? row.recipeSlug : undefined,
        status: typeof row.status === "string" ? row.status : undefined,
        owner: typeof row.owner === "string" ? row.owner : undefined,
        lastActivity: typeof row.lastActivity === "string" ? row.lastActivity : undefined,
      });
    }
  }
  return { recipes, recordings };
}

/**
 * Loads org context, Phase 03 `program_engagements` row (if any), and cohort
 * peers when `organizations.cohort_id` is set. Safe when tables or columns
 * are absent (returns empty peers / no engagement).
 */
export async function loadPhase03ExperimentingData(
  userId: string,
  orgSlug: string | undefined,
): Promise<Phase03ExperimentingData | null> {
  const resolved = await resolveActiveOrganizationId(userId, orgSlug ?? null);
  if (!resolved.success) return null;

  const orgId = resolved.data.organizationId;

  let orgName = "Your organization";
  let cohortId: string | null = null;
  try {
    const [org] = await db
      .select({
        name: organizations.name,
        cohort_id: organizations.cohort_id,
      })
      .from(organizations)
      .where(eq(organizations.id, orgId))
      .limit(1);
    if (org) {
      orgName = org.name ?? orgName;
      cohortId = org.cohort_id;
    }
  } catch {
    cohortId = null;
  }

  let engagementSummary: string | null = null;
  let milestones: unknown = null;
  try {
    const [row] = await db
      .select({
        summary_markdown: programEngagements.summary_markdown,
        milestones: programEngagements.milestones,
      })
      .from(programEngagements)
      .where(
        and(
          eq(programEngagements.organization_id, orgId),
          eq(programEngagements.template_slug, SANDBOXLIVE_PHASE_03_ENGAGEMENT_SLUG),
        ),
      )
      .limit(1);
    if (row) {
      engagementSummary =
        typeof row.summary_markdown === "string" && row.summary_markdown.length > 0
          ? row.summary_markdown
          : null;
      milestones = row.milestones;
    }
  } catch {
    engagementSummary = null;
    milestones = null;
  }

  const { recipes, recordings } = partitionMilestones(milestones);

  let cohortPeers: Phase03CohortPeer[] = [];
  if (cohortId) {
    try {
      cohortPeers = await db
        .select({
          organizationId: organizations.id,
          organizationName: organizations.name,
          leaderName: cohortMembers.leader_name,
          leaderRole: cohortMembers.leader_role,
        })
        .from(cohortMembers)
        .innerJoin(organizations, eq(organizations.id, cohortMembers.organization_id))
        .where(eq(organizations.cohort_id, cohortId));
    } catch {
      cohortPeers = [];
    }
  }

  return {
    organizationId: orgId,
    organizationName: orgName,
    cohortId,
    engagementSummary,
    recipeMilestones: recipes,
    recordingMilestones: recordings,
    cohortPeers,
  };
}
