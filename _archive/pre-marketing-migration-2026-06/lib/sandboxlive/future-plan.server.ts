import "server-only";

import { and, asc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  futurePlanRatifications,
  futurePlanVersions,
  futurePlans,
  organizations,
} from "@/lib/db/schema";

import type { FuturePlanContent, FuturePlanSectionSlug, FuturePlanStatus } from "./future-plan.catalog";

export type {
  FuturePlanContent,
  FuturePlanSectionContent,
  FuturePlanSectionEntry,
  FuturePlanSectionSlug,
  FuturePlanStatus,
} from "./future-plan.catalog";
export { FUTURE_PLAN_SECTIONS, getFuturePlanSection } from "./future-plan.catalog";

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
export async function loadFuturePlanState(organizationId: string): Promise<FuturePlanState> {
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
}): Promise<{ ok: true; version: number } | { ok: false; reason: string }> {
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
