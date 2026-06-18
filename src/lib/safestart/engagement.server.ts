import "server-only";

import { and, desc, eq, inArray } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  organizations,
  programEngagements,
  safetyArtifacts,
  safetyArtifactVersions,
  safetyEngagements,
  safetyGuidebooks,
} from "@/lib/db/schema";
import {
  GUIDEBOOK_SECTIONS,
  SAFESTART_WORKSPACES,
  type GuidebookSectionSlug,
  type SafeStartWorkspaceSlug,
} from "@/lib/safestart/workspace-manifest";
import { GUIDEBOOK_LAYER_TAXONOMY } from "@/lib/safety/layer-taxonomy";

export type WorkspaceStatus = "not_started" | "in_progress" | "complete";
export type GuidebookSectionStatus = "not_drafted" | "drafted" | "in_review" | "ratified";

export interface SafeStartWorkspaceState {
  slug: SafeStartWorkspaceSlug;
  status: WorkspaceStatus;
}

export interface GuidebookSectionState {
  slug: GuidebookSectionSlug;
  status: GuidebookSectionStatus;
  currentVersionNumber: number | null;
  latestBodyMarkdown: string | null;
  artifactStatus: string | null;
}

export interface SafeStartEngagementState {
  organizationId: string;
  organizationName: string;
  workspaces: SafeStartWorkspaceState[];
  currentWorkspaceSlug: SafeStartWorkspaceSlug | null;
  guidebook: GuidebookSectionState[];
}

/**
 * Derives a coarse per-workspace status from program_engagements rows for the
 * five SafeStart workspace templates. "complete" requires every milestone (if
 * any) to be in state `complete`; a row with any data counts as `in_progress`;
 * absent rows are `not_started`.
 *
 * Also reads `safety_artifacts` + latest `safety_artifact_versions` for each
 * of the five Guidebook section kinds and reports each section's status:
 *   - `not_drafted` — no artifact row
 *   - `drafted` — artifact.status = "draft" with a version present
 *   - `in_review` — artifact.status = "in_review"
 *   - `ratified` — artifact.status = "ratified" (or "published")
 *
 * Wrapped in try/catch so missing-table environments still render the page.
 */
export async function loadSafeStartEngagementState(
  organizationId: string,
): Promise<SafeStartEngagementState> {
  const [org] = await db
    .select({ id: organizations.id, name: organizations.name })
    .from(organizations)
    .where(eq(organizations.id, organizationId))
    .limit(1);

  const organizationName = org?.name ?? "Your organization";

  // Prefer `safety_engagements` + `safety_guidebooks` when provisioned via SafeStart.
  try {
    const [engagement] = await db
      .select()
      .from(safetyEngagements)
      .where(eq(safetyEngagements.organization_id, organizationId))
      .orderBy(desc(safetyEngagements.created_at))
      .limit(1);

    if (engagement) {
      const guidebook = engagement.guidebook_id
        ? await db
            .select()
            .from(safetyGuidebooks)
            .where(eq(safetyGuidebooks.id, engagement.guidebook_id))
            .limit(1)
            .then((rows) => rows[0] ?? null)
        : await db
            .select()
            .from(safetyGuidebooks)
            .where(eq(safetyGuidebooks.organization_id, organizationId))
            .orderBy(desc(safetyGuidebooks.created_at))
            .limit(1)
            .then((rows) => rows[0] ?? null);

      const artifactRows = guidebook
        ? await db
            .select({
              id: safetyArtifacts.id,
              kind: safetyArtifacts.kind,
              status: safetyArtifacts.status,
              review_status: safetyArtifacts.review_status,
            })
            .from(safetyArtifacts)
            .where(eq(safetyArtifacts.guidebook_id, guidebook.id))
            .orderBy(safetyArtifacts.layer_order)
        : [];

      const artifactIds = artifactRows.map((r) => r.id);
      let versionRows: Array<{
        artifact_id: string;
        version_number: number;
        body_md: string;
      }> = [];
      if (artifactIds.length) {
        versionRows = await db
          .select({
            artifact_id: safetyArtifactVersions.artifact_id,
            version_number: safetyArtifactVersions.version_number,
            body_md: safetyArtifactVersions.body_md,
          })
          .from(safetyArtifactVersions)
          .where(inArray(safetyArtifactVersions.artifact_id, artifactIds));
      }

      const latestByArtifact = new Map<string, { version_number: number; body_md: string }>();
      for (const v of versionRows) {
        const cur = latestByArtifact.get(v.artifact_id);
        if (!cur || v.version_number > cur.version_number) {
          latestByArtifact.set(v.artifact_id, {
            version_number: v.version_number,
            body_md: v.body_md,
          });
        }
      }

      const stepToWorkspace: Record<number, SafeStartWorkspaceSlug> = {
        1: "drafting",
        2: "review",
        3: "editorial-comments",
        4: "ratification",
        5: "steady-state",
        6: "steady-state",
      };

      const currentSlug = stepToWorkspace[engagement.current_step] ?? "drafting";
      const workspaces: SafeStartWorkspaceState[] = SAFESTART_WORKSPACES.map((w) => {
        if (w.slug === currentSlug) return { slug: w.slug, status: "in_progress" };
        if (w.order < (SAFESTART_WORKSPACES.find((x) => x.slug === currentSlug)?.order ?? 1)) {
          return { slug: w.slug, status: "complete" };
        }
        return { slug: w.slug, status: "not_started" };
      });

      const guidebookSections: GuidebookSectionState[] = GUIDEBOOK_LAYER_TAXONOMY.map((layer) => {
        const sectionMeta = GUIDEBOOK_SECTIONS.find((s) => s.slug === layer.slug.replace("response-plans", "response-plans") || s.number === String(layer.layerOrder).padStart(2, "0"));
        const slug = (sectionMeta?.slug ?? layer.slug) as GuidebookSectionSlug;
        const artifact = artifactRows.find(
          (a) => a.kind === layer.kind || a.kind === sectionMeta?.artifactKind,
        );
        if (!artifact) {
          return {
            slug,
            status: "not_drafted" as const,
            currentVersionNumber: null,
            latestBodyMarkdown: null,
            artifactStatus: null,
          };
        }
        const latest = latestByArtifact.get(artifact.id) ?? null;
        const reviewStatus = artifact.review_status ?? artifact.status;
        const status: GuidebookSectionStatus =
          reviewStatus === "ratified" || artifact.status === "published"
            ? "ratified"
            : reviewStatus === "in_review" || reviewStatus === "revised"
              ? "in_review"
              : "drafted";
        return {
          slug,
          status,
          currentVersionNumber: latest?.version_number ?? null,
          latestBodyMarkdown: latest?.body_md ?? null,
          artifactStatus: artifact.status,
        };
      });

      return {
        organizationId,
        organizationName,
        workspaces,
        currentWorkspaceSlug: currentSlug,
        guidebook: guidebookSections,
      };
    }
  } catch {
    /* fall through to legacy program_engagements derivation */
  }

  const templateSlugs = SAFESTART_WORKSPACES.map((w) => w.templateId).filter(
    (id): id is string => Boolean(id),
  );

  let engagementRows: Array<{
    template_slug: string;
    summary_markdown: string | null;
    milestones: unknown;
  }> = [];
  if (templateSlugs.length) {
    try {
      engagementRows = await db
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
      engagementRows = [];
    }
  }

  const byTemplate = new Map(
    engagementRows.map((r) => [r.template_slug, r] as const),
  );

  // A workspace can map to a template id; multiple workspaces may share the
  // same fixture (drafting + async review). Dedupe by checking the row.
  const workspaces: SafeStartWorkspaceState[] = SAFESTART_WORKSPACES.map((w) => {
    if (!w.templateId) return { slug: w.slug, status: "not_started" };
    const row = byTemplate.get(w.templateId);
    if (!row) return { slug: w.slug, status: "not_started" };

    if (Array.isArray(row.milestones) && row.milestones.length > 0) {
      const allComplete = (row.milestones as Array<{ state?: string }>).every(
        (m) => m?.state === "complete",
      );
      if (allComplete) return { slug: w.slug, status: "complete" };
    }

    const hasAnyData =
      (typeof row.summary_markdown === "string" && row.summary_markdown.length > 0) ||
      (Array.isArray(row.milestones) && row.milestones.length > 0);

    return { slug: w.slug, status: hasAnyData ? "in_progress" : "not_started" };
  });

  const currentWorkspace = workspaces.find((w) => w.status !== "complete");
  const currentWorkspaceSlug = currentWorkspace
    ? currentWorkspace.slug
    : workspaces.every((w) => w.status === "complete")
      ? null
      : workspaces[0].slug;

  // Guidebook section state
  const sectionKinds = GUIDEBOOK_SECTIONS.map((s) => s.artifactKind);

  let artifactRows: Array<{
    id: string;
    kind: string;
    status: string;
  }> = [];
  try {
    artifactRows = await db
      .select({
        id: safetyArtifacts.id,
        kind: safetyArtifacts.kind,
        status: safetyArtifacts.status,
      })
      .from(safetyArtifacts)
      .where(
        and(
          eq(safetyArtifacts.organization_id, organizationId),
          inArray(safetyArtifacts.kind, sectionKinds),
        ),
      );
  } catch {
    artifactRows = [];
  }

  const artifactByKind = new Map(artifactRows.map((r) => [r.kind, r] as const));

  // For each section's artifact (if present), fetch the latest version body.
  const artifactIds = artifactRows.map((r) => r.id);
  let versionRows: Array<{
    artifact_id: string;
    version_number: number;
    body_md: string;
  }> = [];
  if (artifactIds.length) {
    try {
      versionRows = await db
        .select({
          artifact_id: safetyArtifactVersions.artifact_id,
          version_number: safetyArtifactVersions.version_number,
          body_md: safetyArtifactVersions.body_md,
        })
        .from(safetyArtifactVersions)
        .where(inArray(safetyArtifactVersions.artifact_id, artifactIds));
    } catch {
      versionRows = [];
    }
  }

  // Reduce to "latest version per artifact" by version_number desc.
  const latestByArtifact = new Map<
    string,
    { version_number: number; body_md: string }
  >();
  for (const v of versionRows) {
    const cur = latestByArtifact.get(v.artifact_id);
    if (!cur || v.version_number > cur.version_number) {
      latestByArtifact.set(v.artifact_id, {
        version_number: v.version_number,
        body_md: v.body_md,
      });
    }
  }

  const guidebook: GuidebookSectionState[] = GUIDEBOOK_SECTIONS.map((s) => {
    const artifact = artifactByKind.get(s.artifactKind);
    if (!artifact) {
      return {
        slug: s.slug,
        status: "not_drafted",
        currentVersionNumber: null,
        latestBodyMarkdown: null,
        artifactStatus: null,
      };
    }
    const latest = latestByArtifact.get(artifact.id) ?? null;
    const status: GuidebookSectionStatus =
      artifact.status === "ratified" || artifact.status === "published"
        ? "ratified"
        : artifact.status === "in_review"
          ? "in_review"
          : "drafted";
    return {
      slug: s.slug,
      status,
      currentVersionNumber: latest?.version_number ?? null,
      latestBodyMarkdown: latest?.body_md ?? null,
      artifactStatus: artifact.status,
    };
  });

  return {
    organizationId,
    organizationName,
    workspaces,
    currentWorkspaceSlug,
    guidebook,
  };
}
