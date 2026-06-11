import "server-only";

import { and, desc, eq, inArray } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  safetyArtifacts,
  safetyArtifactVersions,
  organizations,
} from "@/lib/db/schema";
import type { SafetyArtifacts, SafetyArtifactVersions } from "@/lib/schemas";
import type { Result } from "@/lib/services/simplified/base.service";

function ok<T>(data: T): Result<T> {
  return { success: true, data };
}

function err(code: string, message: string): Result<never> {
  return { success: false, error: { code, message } };
}

export type CharterLayerPayload = {
  artifact: SafetyArtifacts;
  latestVersion: SafetyArtifactVersions | null;
};

export type CharterDashboardPayload = {
  organization: {
    id: string;
    name: string;
    slug: string;
  };
  charter: {
    layersComplete: number;
    layerCount: number;
    overallStatus: "draft" | "published";
    layers: CharterLayerPayload[];
  };
};

export async function loadCharterDashboardForOrg(
  organizationId: string,
): Promise<Result<CharterDashboardPayload>> {
  const [org] = await db
    .select({
      id: organizations.id,
      name: organizations.name,
      slug: organizations.slug,
    })
    .from(organizations)
    .where(eq(organizations.id, organizationId))
    .limit(1);

  if (!org) {
    return err("not_found", "Organization not found.");
  }

  const artifacts = await db
    .select()
    .from(safetyArtifacts)
    .where(eq(safetyArtifacts.organization_id, organizationId))
    .orderBy(safetyArtifacts.slug);

  if (artifacts.length === 0) {
    return ok({
      organization: org,
      charter: {
        layersComplete: 0,
        layerCount: 5,
        overallStatus: "draft",
        layers: [],
      },
    });
  }

  const artifactIds = artifacts.map((a) => a.id);
  const versions = await db
    .select()
    .from(safetyArtifactVersions)
    .where(inArray(safetyArtifactVersions.artifact_id, artifactIds))
    .orderBy(desc(safetyArtifactVersions.version_number));

  const latestByArtifact = new Map<string, SafetyArtifactVersions>();
  for (const v of versions) {
    if (!latestByArtifact.has(v.artifact_id)) {
      latestByArtifact.set(v.artifact_id, v as SafetyArtifactVersions);
    }
  }

  const layers: CharterLayerPayload[] = artifacts.map((artifact) => ({
    artifact: artifact as SafetyArtifacts,
    latestVersion: latestByArtifact.get(artifact.id) ?? null,
  }));

  const layersComplete = layers.filter(
    (l) => l.latestVersion && l.latestVersion.body_md.trim().length > 0,
  ).length;
  const allPublished = artifacts.every((a) => a.status === "published");

  return ok({
    organization: org,
    charter: {
      layersComplete,
      layerCount: Math.max(5, artifacts.length),
      overallStatus: allPublished ? "published" : "draft",
      layers,
    },
  });
}

export async function saveArtifactDraft(params: {
  organizationId: string;
  artifactId: string;
  bodyMd: string;
  userId?: string | null;
}): Promise<Result<SafetyArtifactVersions>> {
  const [artifact] = await db
    .select()
    .from(safetyArtifacts)
    .where(
      and(
        eq(safetyArtifacts.id, params.artifactId),
        eq(safetyArtifacts.organization_id, params.organizationId),
      ),
    )
    .limit(1);

  if (!artifact) {
    return err("not_found", "Artifact not found.");
  }

  const [latest] = await db
    .select({ version_number: safetyArtifactVersions.version_number })
    .from(safetyArtifactVersions)
    .where(eq(safetyArtifactVersions.artifact_id, params.artifactId))
    .orderBy(desc(safetyArtifactVersions.version_number))
    .limit(1);

  const nextVersion = (latest?.version_number ?? 0) + 1;

  const [inserted] = await db
    .insert(safetyArtifactVersions)
    .values({
      artifact_id: params.artifactId,
      version_number: nextVersion,
      body_md: params.bodyMd,
      created_by_user_id: params.userId ?? null,
    })
    .returning();

  await db
    .update(safetyArtifacts)
    .set({ status: "draft", updated_at: new Date().toISOString() })
    .where(eq(safetyArtifacts.id, params.artifactId));

  return ok(inserted as SafetyArtifactVersions);
}

export async function publishArtifact(params: {
  organizationId: string;
  artifactId: string;
  userId?: string | null;
}): Promise<Result<{ publicationId: string; publicSlug: string }>> {
  const [artifact] = await db
    .select()
    .from(safetyArtifacts)
    .where(
      and(
        eq(safetyArtifacts.id, params.artifactId),
        eq(safetyArtifacts.organization_id, params.organizationId),
      ),
    )
    .limit(1);

  if (!artifact) {
    return err("not_found", "Artifact not found.");
  }

  const [latest] = await db
    .select()
    .from(safetyArtifactVersions)
    .where(eq(safetyArtifactVersions.artifact_id, params.artifactId))
    .orderBy(desc(safetyArtifactVersions.version_number))
    .limit(1);

  if (!latest) {
    return err("no_version", "No draft version to publish.");
  }

  const publicSlug = `${artifact.slug}-${Date.now()}`;

  const { safetyArtifactPublications } = await import("@/lib/db/schema");
  const [pub] = await db
    .insert(safetyArtifactPublications)
    .values({
      artifact_id: params.artifactId,
      version_id: latest.id,
      public_slug: publicSlug,
      is_active: true,
      published_by_user_id: params.userId ?? null,
    })
    .returning({ id: safetyArtifactPublications.id });

  await db
    .update(safetyArtifacts)
    .set({ status: "published", updated_at: new Date().toISOString() })
    .where(eq(safetyArtifacts.id, params.artifactId));

  return ok({ publicationId: pub.id, publicSlug });
}
