import "server-only";

import type { ProgramFixtureBase } from "@/lib/program/types/stitch-screen-family";
import { loadProgramFixtureJson } from "@/lib/program/load-program-fixture.server";
import { toSafeStartHeroTimelineFixture } from "@/lib/program/normalize-hero-timeline";
import type { SafeStartHeroTimelineFixture } from "@/lib/program/types/safe-start-hero";
import {
  listMembershipOrganizations,
  resolveActiveOrganizationId,
} from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

type MilestoneRow = { label?: string; state?: string; title?: string; detail?: string };

function isMissingProgramEngagementsTable(message: string | undefined): boolean {
  if (!message) return false;
  return (
    message.includes("program_engagements") &&
    (message.includes("does not exist") || message.includes("schema cache"))
  );
}

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
      sourceBadge: "fixture only — organization context unavailable",
    };
  }

  const memberships = await listMembershipOrganizations(userId);
  const row = memberships.find((m) => m.organizationId === resolved.data.organizationId);
  if (row?.orgName && fixture.shell) {
    fixture.shell.tenantName = row.orgName;
  }

  const baseBadge = "fixture + active organization";

  const supabase = await createClient();
  // Table is optional until `docs/build/sql/program_engagements.sql` is applied to the project database.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- not yet in generated Supabase Database typings
  const { data: engagement, error } = await (supabase as any)
    .from("program_engagements")
    .select("summary_markdown, milestones")
    .eq("organization_id", resolved.data.organizationId)
    .eq("template_slug", templateId)
    .maybeSingle();

  if (error) {
    if (isMissingProgramEngagementsTable(error.message)) {
      return { fixture, sourceBadge: baseBadge };
    }
    return {
      fixture,
      sourceBadge: `${baseBadge} · DB merge skipped (${error.message})`,
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
