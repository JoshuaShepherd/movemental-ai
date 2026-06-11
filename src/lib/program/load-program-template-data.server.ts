import "server-only";

import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { programEngagements } from "@/lib/db/schema";
import type { ProgramFixtureBase } from "@/lib/program/types/stitch-screen-family";
import { loadProgramFixtureJson } from "@/lib/program/load-program-fixture.server";
import { toSafeStartHeroTimelineFixture } from "@/lib/program/normalize-hero-timeline";
import type { SafeStartHeroTimelineFixture } from "@/lib/program/types/safe-start-hero";
import {
  listMembershipOrganizations,
  resolveActiveOrganizationId,
} from "@/lib/services/onboarding/onboarding.service";

type MilestoneRow = { label?: string; state?: string; title?: string; detail?: string };

function applyMilestonesToHeroFixture(
  base: SafeStartHeroTimelineFixture,
  milestones: unknown,
): SafeStartHeroTimelineFixture {
  const data = structuredClone(base);
  if (!Array.isArray(milestones) || milestones.length === 0) return data;
  const tl = data.sections.find((s) => s.kind === "timeline");
  if (!tl || tl.kind !== "timeline") return data;
  const stages = (milestones as MilestoneRow[]).map((m, i) => ({
    stageLabel: m.label ?? `Stage ${i + 1}`,
    title: (m.title ?? m.label) as string,
    detail: m.detail,
    state: (m.state === "complete" || m.state === "current" || m.state === "upcoming"
      ? m.state
      : "upcoming") as "complete" | "current" | "upcoming",
  }));
  tl.stages = stages;
  return data;
}

/**
 * Loads a program template fixture with optional org overlay and optional
 * `program_engagements` merge when the table exists in Postgres.
 */
export async function loadProgramTemplateData(
  userId: string,
  orgSlug: string | undefined,
  category: "safety" | "sandbox",
  templateId: string,
): Promise<{ fixture: ProgramFixtureBase; sourceBadge: string }> {
  const fixture = loadProgramFixtureJson(category, templateId);
  const resolved = await resolveActiveOrganizationId(userId, orgSlug ?? null);

  if (!resolved.success) {
    return {
      fixture,
      sourceBadge: "fixture only, organization context unavailable",
    };
  }

  const memberships = await listMembershipOrganizations(userId);
  const row = memberships.find((m) => m.organizationId === resolved.data.organizationId);
  if (row?.orgName && fixture.shell) {
    fixture.shell.tenantName = row.orgName;
  }

  const baseBadge = "fixture + active organization";

  let engagement: { summary_markdown: string | null; milestones: unknown } | null = null;
  try {
    const rows = await db
      .select({
        summary_markdown: programEngagements.summary_markdown,
        milestones: programEngagements.milestones,
      })
      .from(programEngagements)
      .where(
        and(
          eq(programEngagements.organization_id, resolved.data.organizationId),
          eq(programEngagements.template_slug, templateId),
        ),
      )
      .limit(1);
    engagement = rows[0] ?? null;
  } catch (e) {
    const message = e instanceof Error ? e.message : "unknown error";
    return {
      fixture,
      sourceBadge: `${baseBadge} · DB merge skipped (${message})`,
    };
  }

  if (!engagement) {
    return { fixture, sourceBadge: baseBadge };
  }

  if (fixture.screenFamily === "safestart-hero-timeline" && engagement.milestones) {
    const hero = toSafeStartHeroTimelineFixture(fixture);
    const merged = applyMilestonesToHeroFixture(hero, engagement.milestones);
    if (typeof engagement.summary_markdown === "string" && engagement.summary_markdown) {
      merged.page.supportingCopy = engagement.summary_markdown;
    }
    return {
      fixture: merged as unknown as ProgramFixtureBase,
      sourceBadge: "fixture + organization + program_engagements",
    };
  }

  if (typeof engagement.summary_markdown === "string" && engagement.summary_markdown && fixture.page) {
    fixture.page.supportingCopy = engagement.summary_markdown;
  }

  return {
    fixture,
    sourceBadge: "fixture + organization + program_engagements",
  };
}
