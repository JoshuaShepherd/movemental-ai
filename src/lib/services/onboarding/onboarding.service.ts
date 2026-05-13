import "server-only";

import { and, desc, eq, inArray, isNotNull, isNull, or, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  auditLogs,
  onboardingTasks,
  organizationMemberships,
  organizations,
  staffUsers,
  userProfiles,
} from "@/lib/db/schema";
import {
  sendAgentReadyEmail,
  sendCorpusReadyEmail,
  sendOnboardingCompletedEmail,
  sendOnboardingPhase1CompleteEmail,
  sendOnboardingWelcomeEmail,
} from "@/lib/email/onboarding-emails";
import {
  computeNewlyAvailableKeys,
  dependencySatisfied,
  evaluateTaskUiStatus,
  readLeaderPaymentsEnabled,
  shouldAutoSkipTaxForm,
  type TaskRowLike,
  type TaskRowStatus,
} from "@/lib/onboarding/state";
import { resolveDashboardPersona, type DashboardPersona } from "@/lib/dashboard/dashboard-persona";
import {
  resolveWorkspaceCourseEntitlements,
  type WorkspaceCourseEntitlements,
} from "@/lib/dashboard/workspace-course-entitlements";
import {
  resolveWorkspaceNavPreset,
  type WorkspaceNavPreset,
} from "@/lib/dashboard/workspace-nav-preset";
import { presentOnboardingTaskForPersona } from "@/lib/onboarding/onboarding-persona-present";
import { ONBOARDING_PHASES, ONBOARDING_TASKS, taskDefinitionByKey } from "@/lib/onboarding/tasks";
import type { Result } from "@/lib/services/simplified/base.service";

export type { DashboardPersona } from "@/lib/dashboard/dashboard-persona";
export type { WorkspaceCourseEntitlements } from "@/lib/dashboard/workspace-course-entitlements";

function ok<T>(data: T): Result<T> {
  return { success: true, data };
}

function err(code: string, message: string): Result<never> {
  return { success: false, error: { code, message } };
}

/** postgres.js / node-postgres unique_violation — e.g. concurrent onboarding init for the same org. */
function isPostgresUniqueViolation(e: unknown): boolean {
  if (typeof e === "object" && e !== null && "code" in e && (e as { code: string }).code === "23505") {
    return true;
  }
  const msg = e instanceof Error ? e.message : "";
  return /duplicate key|unique constraint/i.test(msg);
}

function nowIso(): string {
  return new Date().toISOString();
}

type OnboardingStateJson = {
  emails_sent?: { welcome?: boolean; phase1_complete?: boolean };
};

function parseOnboardingState(raw: unknown): OnboardingStateJson {
  if (!raw || typeof raw !== "object") return {};
  return raw as OnboardingStateJson;
}

async function promoteAndSkipTax(
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  organizationId: string,
  leaderPayments: boolean,
): Promise<void> {
  for (let round = 0; round < 32; round++) {
    const rows = await tx
      .select()
      .from(onboardingTasks)
      .where(eq(onboardingTasks.organization_id, organizationId));

    const rowByKey = new Map<string, TaskRowLike>(
      rows.map((r) => [
        r.task_key,
        {
          task_key: r.task_key,
          status: r.status as TaskRowStatus,
          movemental_unlocked: r.movemental_unlocked,
        },
      ]),
    );

    if (shouldAutoSkipTaxForm(leaderPayments, rowByKey)) {
      const taxRow = rows.find((r) => r.task_key === "tax_form");
      if (
        taxRow &&
        (taxRow.status === "locked" || taxRow.status === "available" || taxRow.status === "in_progress")
      ) {
        await tx
          .update(onboardingTasks)
          .set({ status: "skipped", updated_at: nowIso() })
          .where(eq(onboardingTasks.id, taxRow.id));
        continue;
      }
    }

    const toPromote = computeNewlyAvailableKeys(ONBOARDING_TASKS, rowByKey);
    if (toPromote.length === 0) break;

    await tx
      .update(onboardingTasks)
      .set({ status: "available", updated_at: nowIso() })
      .where(
        and(
          eq(onboardingTasks.organization_id, organizationId),
          inArray(onboardingTasks.task_key, toPromote),
          eq(onboardingTasks.status, "locked"),
        ),
      );
  }
}

export async function organizationHasInitializedTasks(organizationId: string): Promise<boolean> {
  const row = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(onboardingTasks)
    .where(eq(onboardingTasks.organization_id, organizationId));
  return (row[0]?.n ?? 0) > 0;
}

/** Inserts task rows for an org when missing. Safe to call multiple times. */
export async function initializeOnboardingTasksForOrganization(
  organizationId: string,
): Promise<Result<{ inserted: boolean }>> {
  try {
    const exists = await organizationHasInitializedTasks(organizationId);
    if (exists) return ok({ inserted: false });

    const inserts = ONBOARDING_TASKS.map((def) => {
      let status: TaskRowStatus = "locked";
      let movemental_unlocked = true;
      if (def.requiresMovementalPrep) {
        movemental_unlocked = false;
      }
      if (def.dependsOn.length === 0) {
        status = "available";
      }
      return {
        organization_id: organizationId,
        task_key: def.key,
        status,
        movemental_unlocked,
        metadata: {},
      };
    });

    let insertedNewRows = true;
    try {
      await db.insert(onboardingTasks).values(inserts);
    } catch (e) {
      if (!isPostgresUniqueViolation(e)) throw e;
      const afterRace = await organizationHasInitializedTasks(organizationId);
      if (!afterRace) throw e;
      insertedNewRows = false;
    }

    const [orgRow] = await db
      .select({ settings: organizations.settings })
      .from(organizations)
      .where(eq(organizations.id, organizationId))
      .limit(1);
    const leaderPayments = readLeaderPaymentsEnabled(orgRow?.settings);

    await db.transaction(async (tx) => {
      await promoteAndSkipTax(tx, organizationId, leaderPayments);
    });

    return ok({ inserted: insertedNewRows });
  } catch (e) {
    return err("init_failed", e instanceof Error ? e.message : "Unknown error");
  }
}

export async function listMembershipOrganizations(userId: string) {
  return db
    .select({
      organizationId: organizations.id,
      orgName: organizations.name,
      orgSlug: organizations.slug,
      onboardingCompletedAt: organizations.onboarding_completed_at,
      cohortStartDate: organizations.cohort_start_date,
      accountOwnerId: organizations.account_owner_id,
      membershipRole: organizationMemberships.role,
      membershipStatus: organizationMemberships.status,
    })
    .from(organizationMemberships)
    .innerJoin(organizations, eq(organizationMemberships.organization_id, organizations.id))
    .where(
      and(
        eq(organizationMemberships.user_id, userId),
        or(
          eq(organizationMemberships.status, "active"),
          eq(organizationMemberships.status, "pending"),
        ),
      ),
    )
    .orderBy(desc(organizationMemberships.joined_at));
}

export async function resolveActiveOrganizationId(
  userId: string,
  orgSlug?: string | null,
): Promise<Result<{ organizationId: string; slug: string }>> {
  const list = await listMembershipOrganizations(userId);
  if (list.length === 0) {
    return err("no_membership", "No organization membership found for this account.");
  }
  if (orgSlug) {
    const match = list.find((r) => r.orgSlug === orgSlug);
    if (!match) return err("org_not_found", "You are not a member of that organization.");
    return ok({ organizationId: match.organizationId, slug: match.orgSlug });
  }
  return ok({ organizationId: list[0].organizationId, slug: list[0].orgSlug });
}

/** Active organization + dashboard persona for authenticated dashboard pages. */
export async function resolveDashboardContextForSessionUser(
  userId: string,
  orgSlugParam?: string | null,
): Promise<{
  slug: string;
  organizationId: string;
  persona: DashboardPersona;
  workspaceNavPreset: WorkspaceNavPreset;
  workspaceCourses: WorkspaceCourseEntitlements;
} | null> {
  const resolved = await resolveActiveOrganizationId(userId, orgSlugParam ?? undefined);
  if (!resolved.success) return null;

  const [row] = await db
    .select({
      organization_type: organizations.organization_type,
      settings: organizations.settings,
      slug: organizations.slug,
    })
    .from(organizations)
    .where(eq(organizations.id, resolved.data.organizationId))
    .limit(1);

  if (!row) return null;

  return {
    slug: resolved.data.slug,
    organizationId: resolved.data.organizationId,
    persona: resolveDashboardPersona(row),
    workspaceNavPreset: resolveWorkspaceNavPreset(row.settings),
    workspaceCourses: resolveWorkspaceCourseEntitlements(row.settings),
  };
}

/** Workspace nav preset per org slug (same query as persona — use with `loadDashboardShellMapsForUser`). */
export async function loadDashboardShellMapsForUser(userId: string): Promise<{
  personaByOrgSlug: Record<string, DashboardPersona>;
  workspaceNavPresetByOrgSlug: Record<string, WorkspaceNavPreset>;
  workspaceCoursesByOrgSlug: Record<string, WorkspaceCourseEntitlements>;
}> {
  const memberships = await listMembershipOrganizations(userId);
  if (memberships.length === 0) {
    return { personaByOrgSlug: {}, workspaceNavPresetByOrgSlug: {}, workspaceCoursesByOrgSlug: {} };
  }

  const ids = memberships.map((m) => m.organizationId);
  const rows = await db
    .select({
      slug: organizations.slug,
      organization_type: organizations.organization_type,
      settings: organizations.settings,
    })
    .from(organizations)
    .where(inArray(organizations.id, ids));

  const personaByOrgSlug: Record<string, DashboardPersona> = {};
  const workspaceNavPresetByOrgSlug: Record<string, WorkspaceNavPreset> = {};
  const workspaceCoursesByOrgSlug: Record<string, WorkspaceCourseEntitlements> = {};
  for (const r of rows) {
    personaByOrgSlug[r.slug] = resolveDashboardPersona(r);
    workspaceNavPresetByOrgSlug[r.slug] = resolveWorkspaceNavPreset(r.settings);
    workspaceCoursesByOrgSlug[r.slug] = resolveWorkspaceCourseEntitlements(r.settings);
  }
  return { personaByOrgSlug, workspaceNavPresetByOrgSlug, workspaceCoursesByOrgSlug };
}

/** Persona per org slug for the signed-in user's memberships (dashboard chrome). */
export async function loadDashboardPersonaMapForUser(userId: string): Promise<Record<string, DashboardPersona>> {
  const { personaByOrgSlug } = await loadDashboardShellMapsForUser(userId);
  return personaByOrgSlug;
}

/** Active org's workspace nav preset (defaults when no org resolved). */
export async function resolveWorkspaceNavPresetForSessionUser(
  userId: string,
  orgSlugParam?: string | null,
): Promise<WorkspaceNavPreset> {
  const resolved = await resolveActiveOrganizationId(userId, orgSlugParam ?? undefined);
  if (!resolved.success) return "default";

  const [row] = await db
    .select({ settings: organizations.settings })
    .from(organizations)
    .where(eq(organizations.id, resolved.data.organizationId))
    .limit(1);

  return resolveWorkspaceNavPreset(row?.settings);
}

/** Course entitlements for the active org, or `null` when org cannot be resolved. */
export async function resolveWorkspaceCourseEntitlementsForSessionUser(
  userId: string,
  orgSlugParam?: string | null,
): Promise<WorkspaceCourseEntitlements | null> {
  const resolved = await resolveActiveOrganizationId(userId, orgSlugParam ?? undefined);
  if (!resolved.success) return null;

  const [row] = await db
    .select({ settings: organizations.settings })
    .from(organizations)
    .where(eq(organizations.id, resolved.data.organizationId))
    .limit(1);

  return resolveWorkspaceCourseEntitlements(row?.settings);
}

export async function isUserStaff(userId: string): Promise<boolean> {
  const row = await db.select().from(staffUsers).where(eq(staffUsers.user_id, userId)).limit(1);
  return row.length > 0;
}

export async function touchOnboardingStartedAndWelcomeEmail(params: {
  organizationId: string;
  userId: string;
  userEmail: string;
  firstName: string | null;
}): Promise<void> {
  const [org] = await db
    .select({
      id: organizations.id,
      onboarding_started_at: organizations.onboarding_started_at,
      onboarding_state: organizations.onboarding_state,
    })
    .from(organizations)
    .where(eq(organizations.id, params.organizationId))
    .limit(1);
  if (!org) return;

  const state = parseOnboardingState(org.onboarding_state);
  if (org.onboarding_started_at) return;

  let nextState = state;
  if (!state.emails_sent?.welcome && params.userEmail) {
    await sendOnboardingWelcomeEmail(params.userEmail, params.firstName);
    nextState = {
      ...state,
      emails_sent: { ...state.emails_sent, welcome: true },
    };
  }

  await db
    .update(organizations)
    .set({
      onboarding_started_at: nowIso(),
      onboarding_state: nextState as unknown as Record<string, unknown>,
    })
    .where(eq(organizations.id, params.organizationId));
}

async function maybeSendPhase1Email(orgId: string, userEmail: string, firstName: string | null) {
  const keys = ["sign_agreement", "confirm_payment", "choose_cohort"] as const;
  const rows = await db
    .select()
    .from(onboardingTasks)
    .where(and(eq(onboardingTasks.organization_id, orgId), inArray(onboardingTasks.task_key, [...keys])));

  const allDone = keys.every((k) => {
    const r = rows.find((x) => x.task_key === k);
    return r?.status === "completed";
  });
  if (!allDone) return;

  const [org] = await db
    .select({ onboarding_state: organizations.onboarding_state })
    .from(organizations)
    .where(eq(organizations.id, orgId))
    .limit(1);
  const state = parseOnboardingState(org?.onboarding_state);
  if (state.emails_sent?.phase1_complete) return;

  await sendOnboardingPhase1CompleteEmail(userEmail, firstName);
  await db
    .update(organizations)
    .set({
      onboarding_state: {
        ...state,
        emails_sent: { ...state.emails_sent, phase1_complete: true },
      } as unknown as Record<string, unknown>,
    })
    .where(eq(organizations.id, orgId));
}

export async function completeOnboardingTask(params: {
  organizationId: string;
  userId: string;
  userEmail: string;
  firstName: string | null;
  taskKey: string;
  metadata?: Record<string, unknown>;
}): Promise<Result<{ organizationId: string }>> {
  const def = taskDefinitionByKey(params.taskKey);
  if (!def) return err("unknown_task", "Unknown task key.");

  try {
    await db.transaction(async (tx) => {
      const [orgRow] = await tx
        .select()
        .from(organizations)
        .where(eq(organizations.id, params.organizationId))
        .limit(1);
      if (!orgRow) throw new Error("Organization not found");

      const leaderPayments = readLeaderPaymentsEnabled(orgRow.settings);

      const [taskRow] = await tx
        .select()
        .from(onboardingTasks)
        .where(
          and(
            eq(onboardingTasks.organization_id, params.organizationId),
            eq(onboardingTasks.task_key, params.taskKey),
          ),
        )
        .limit(1);
      if (!taskRow) throw new Error("Task row not found");

      if (taskRow.status !== "available" && taskRow.status !== "in_progress") {
        throw new Error("Task is not available to complete.");
      }
      if (def.requiresMovementalPrep && !taskRow.movemental_unlocked) {
        throw new Error("This task is still being prepared.");
      }
      if (!dependencySatisfied(def, buildMapFromRows(await loadRows(tx, params.organizationId)))) {
        throw new Error("Dependencies not satisfied.");
      }

      await tx
        .update(onboardingTasks)
        .set({
          status: "completed",
          completed_at: nowIso(),
          completed_by_user_id: params.userId,
          metadata: params.metadata ?? {},
          updated_at: nowIso(),
        })
        .where(eq(onboardingTasks.id, taskRow.id));

      await promoteAndSkipTax(tx, params.organizationId, leaderPayments);

      if (params.taskKey === "final_confirmation") {
        await tx
          .update(organizations)
          .set({ onboarding_completed_at: nowIso() })
          .where(eq(organizations.id, params.organizationId));
      }

      await tx.insert(auditLogs).values({
        user_id: params.userId,
        action: "onboarding_task_completed",
        resource_type: "organization",
        resource_id: params.organizationId,
        changes: { task_key: params.taskKey, metadata: params.metadata ?? {} },
      });
    });

    await maybeSendPhase1Email(params.organizationId, params.userEmail, params.firstName);

    if (params.taskKey === "final_confirmation") {
      const [org] = await db
        .select({ cohort_start_date: organizations.cohort_start_date })
        .from(organizations)
        .where(eq(organizations.id, params.organizationId))
        .limit(1);
      const label = org?.cohort_start_date
        ? new Date(org.cohort_start_date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        : "soon";
      await sendOnboardingCompletedEmail(params.userEmail, params.firstName, label);
    }

    return ok({ organizationId: params.organizationId });
  } catch (e) {
    return err("complete_failed", e instanceof Error ? e.message : "Unknown error");
  }
}

async function loadRows(
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  organizationId: string,
) {
  return tx.select().from(onboardingTasks).where(eq(onboardingTasks.organization_id, organizationId));
}

function buildMapFromRows(
  rows: { task_key: string; status: string; movemental_unlocked: boolean }[],
): Map<string, TaskRowLike> {
  return new Map(
    rows.map((r) => [
      r.task_key,
      {
        task_key: r.task_key,
        status: r.status as TaskRowStatus,
        movemental_unlocked: r.movemental_unlocked,
      },
    ]),
  );
}

export async function adminUnlockOnboardingTask(params: {
  staffUserId: string;
  organizationId: string;
  taskKey: string;
}): Promise<Result<{ ok: true }>> {
  const staff = await isUserStaff(params.staffUserId);
  if (!staff) return err("forbidden", "Staff access required.");

  const def = taskDefinitionByKey(params.taskKey);
  if (!def?.requiresMovementalPrep) {
    return err("invalid_unlock", "Only Movemental-prep tasks can be unlocked from admin.");
  }

  try {
    await db.transaction(async (tx) => {
      const [taskRow] = await tx
        .select()
        .from(onboardingTasks)
        .where(
          and(
            eq(onboardingTasks.organization_id, params.organizationId),
            eq(onboardingTasks.task_key, params.taskKey),
          ),
        )
        .limit(1);
      if (!taskRow) throw new Error("Task row not found");

      await tx
        .update(onboardingTasks)
        .set({ movemental_unlocked: true, updated_at: nowIso() })
        .where(eq(onboardingTasks.id, taskRow.id));

      const [orgRow] = await tx
        .select({ settings: organizations.settings })
        .from(organizations)
        .where(eq(organizations.id, params.organizationId))
        .limit(1);
      const leaderPayments = readLeaderPaymentsEnabled(orgRow?.settings);
      await promoteAndSkipTax(tx, params.organizationId, leaderPayments);

      await tx.insert(auditLogs).values({
        user_id: params.staffUserId,
        action: "onboarding_admin_unlock",
        resource_type: "organization",
        resource_id: params.organizationId,
        changes: { task_key: params.taskKey },
      });
    });

    const [owner] = await db
      .select({
        email: userProfiles.email,
        first_name: userProfiles.first_name,
      })
      .from(organizations)
      .innerJoin(userProfiles, eq(organizations.account_owner_id, userProfiles.id))
      .where(eq(organizations.id, params.organizationId))
      .limit(1);

    const email = owner?.email;
    if (email) {
      if (params.taskKey === "corpus_review") {
        await sendCorpusReadyEmail(email, owner?.first_name ?? null);
      }
      if (params.taskKey === "agent_test") {
        await sendAgentReadyEmail(email, owner?.first_name ?? null);
      }
    }

    return ok({ ok: true });
  } catch (e) {
    return err("unlock_failed", e instanceof Error ? e.message : "Unknown error");
  }
}

/** Full payload for dashboard / panel — phases 2–4 may show placeholders in UI. */
export async function buildOnboardingStatePayload(organizationId: string) {
  const [org] = await db
    .select()
    .from(organizations)
    .where(eq(organizations.id, organizationId))
    .limit(1);
  if (!org) return null;

  const dashboardPersona = resolveDashboardPersona({
    slug: org.slug,
    organization_type: org.organization_type,
    settings: org.settings,
  });

  const rows = await db
    .select()
    .from(onboardingTasks)
    .where(eq(onboardingTasks.organization_id, organizationId));

  const rowByKey = buildMapFromRows(rows);
  const leaderPayments = readLeaderPaymentsEnabled(org.settings);

  const tasks = ONBOARDING_TASKS.map((def) => {
    const row = rows.find((r) => r.task_key === def.key);
    const like: TaskRowLike | undefined = row
      ? {
          task_key: row.task_key,
          status: row.status as TaskRowStatus,
          movemental_unlocked: row.movemental_unlocked,
        }
      : undefined;

    const uiStatus = like ? evaluateTaskUiStatus(def, like, rowByKey) : "locked";

    const presented = presentOnboardingTaskForPersona(
      dashboardPersona,
      def.key,
      def.title,
      def.description,
    );

    return {
      key: def.key,
      phase: def.phase,
      title: presented.title,
      description: presented.description,
      estimatedMinutes: def.estimatedMinutes,
      route: def.route,
      requirement: def.requirement,
      requiresMovementalPrep: def.requiresMovementalPrep,
      dbStatus: row?.status ?? null,
      uiStatus,
      completedAt: row?.completed_at ?? null,
    };
  });

  const phaseSummaries = ONBOARDING_PHASES.map((phase) => {
    const phaseTasks = tasks.filter((t) => t.phase === phase);
    const total = phaseTasks.length;
    const completed = phaseTasks.filter(
      (t) => t.dbStatus === "completed" || t.dbStatus === "skipped",
    ).length;
    const available = phaseTasks.filter((t) => t.uiStatus === "available" || t.uiStatus === "in_progress")
      .length;
    return { phase, completed, total, available };
  });

  let remainingMinutes = 0;
  let commitmentRemainingMinutes = 0;
  for (const t of tasks) {
    if (t.dbStatus === "completed" || t.dbStatus === "skipped") continue;
    const def = taskDefinitionByKey(t.key);
    if (def?.requirement === "optional") continue;
    if (def?.key === "tax_form" && !leaderPayments) continue;
    const add = def?.estimatedMinutes ?? 0;
    if (t.uiStatus === "waiting_movemental" || t.uiStatus === "locked") {
      remainingMinutes += add;
      if (t.phase === "commitment") commitmentRemainingMinutes += add;
      continue;
    }
    remainingMinutes += add;
    if (t.phase === "commitment") commitmentRemainingMinutes += add;
  }

  const settingsObj =
    org.settings && typeof org.settings === "object" && org.settings !== null
      ? (org.settings as Record<string, unknown>)
      : {};
  const engagementType = settingsObj.engagement_type;
  const courseEntitlements = resolveWorkspaceCourseEntitlements(org.settings);
  const postOnboardingHref =
    engagementType === "safestart" || engagementType === "safe_start"
      ? courseEntitlements.safety
        ? "/safestart"
        : courseEntitlements.sandbox
          ? "/sandboxlive"
          : "/dashboard"
      : courseEntitlements.sandbox
        ? "/sandboxlive"
        : "/dashboard";
  const aiReadinessRaw = settingsObj.ai_readiness;
  const aiReadiness =
    typeof aiReadinessRaw === "number" && aiReadinessRaw >= 1 && aiReadinessRaw <= 5
      ? aiReadinessRaw
      : typeof aiReadinessRaw === "string" && /^[1-5]$/.test(aiReadinessRaw)
        ? Number(aiReadinessRaw)
        : null;

  return {
    dashboardPersona,
    organization: {
      id: org.id,
      name: org.name,
      slug: org.slug,
      description: org.description,
      website: org.website,
      contact_email: org.contact_email,
      city: org.city,
      country: org.country,
      logo_url: org.logo_url,
      leader_headshot_url:
        typeof settingsObj.leader_headshot_url === "string" ? settingsObj.leader_headshot_url : null,
      aiReadiness,
      onboarding_completed_at: org.onboarding_completed_at,
      onboarding_started_at: org.onboarding_started_at,
      cohort_start_date: org.cohort_start_date,
      postOnboardingHref,
    },
    tasks,
    phaseSummaries,
    remainingMinutes,
    commitmentRemainingMinutes,
    leaderPaymentsEnabled: leaderPayments,
  };
}

const MS_DAY = 86400000;

export interface AdminOnboardingOrgSummary {
  organizationId: string;
  name: string;
  slug: string;
  dashboardPersona: DashboardPersona;
  cohortStartDate: string | null;
  onboardingCompletedAt: string | null;
  currentPhaseLabel: string;
  lastActivityAt: string | null;
  stuck: boolean;
  prepTaskStates: Array<{ key: string; movemental_unlocked: boolean; status: string }>;
}

function currentPhaseLabelForOrg(
  rows: { task_key: string; status: string }[],
  leaderPayments: boolean,
): string {
  const rowByKey = new Map(rows.map((r) => [r.task_key, r]));
  for (const phase of ONBOARDING_PHASES) {
    const defs = ONBOARDING_TASKS.filter((d) => d.phase === phase);
    const phaseComplete = defs.every((def) => {
      if (def.requirement === "optional") return true;
      if (def.key === "tax_form" && !leaderPayments) return true;
      const st = rowByKey.get(def.key)?.status;
      return st === "completed" || st === "skipped";
    });
    if (!phaseComplete) {
      return phase;
    }
  }
  return "complete";
}

/** Staff-only: all organizations with onboarding task rollups for `/admin/onboarding`. */
export async function listAdminOnboardingSummaries(): Promise<AdminOnboardingOrgSummary[]> {
  const orgs = await db.select().from(organizations).orderBy(organizations.name);
  const allTasks = await db.select().from(onboardingTasks);

  const byOrg = new Map<string, typeof allTasks>();
  for (const t of allTasks) {
    const list = byOrg.get(t.organization_id) ?? [];
    list.push(t);
    byOrg.set(t.organization_id, list);
  }

  const prepDefs = ONBOARDING_TASKS.filter((d) => d.requiresMovementalPrep);
  const now = Date.now();

  return orgs.map((org) => {
    const rows = byOrg.get(org.id) ?? [];
    const leaderPayments = readLeaderPaymentsEnabled(org.settings);
    const lastActivityAt =
      rows.length === 0
        ? null
        : rows.reduce<string | null>((acc, r) => {
            const u = r.updated_at;
            if (!acc || u > acc) return u;
            return acc;
          }, null);

    let stuck = false;
    if (lastActivityAt && org.onboarding_completed_at == null) {
      const aged = now - new Date(lastActivityAt).getTime() >= 5 * MS_DAY;
      if (aged) {
        stuck = rows.some((r) => {
          if (r.status !== "available") return false;
          const def = taskDefinitionByKey(r.task_key);
          if (!def || def.requirement === "optional") return false;
          if (def.key === "tax_form" && !leaderPayments) return false;
          return true;
        });
      }
    }

    const prepTaskStates = prepDefs.map((def) => {
      const r = rows.find((x) => x.task_key === def.key);
      return {
        key: def.key,
        movemental_unlocked: r?.movemental_unlocked ?? false,
        status: r?.status ?? "missing",
      };
    });

    return {
      organizationId: org.id,
      name: org.name,
      slug: org.slug,
      dashboardPersona: resolveDashboardPersona({
        slug: org.slug,
        organization_type: org.organization_type,
        settings: org.settings,
      }),
      cohortStartDate: org.cohort_start_date,
      onboardingCompletedAt: org.onboarding_completed_at,
      currentPhaseLabel: currentPhaseLabelForOrg(rows, leaderPayments),
      lastActivityAt,
      stuck,
      prepTaskStates,
    };
  });
}

/** Dashboard `AdminOnboardingOrgRow` — active onboardings only for staff list. */
export interface DashboardAdminOnboardingOrgRow {
  organizationId: string;
  name: string;
  slug: string;
  onboardingStartedAt: string | null;
  onboardingCompletedAt: string | null;
  currentPhase: string | null;
  phaseSummaries: Array<{ phase: string; completed: number; total: number; available: number }>;
  prepLocks: Array<{ taskKey: string; locked: boolean }>;
  lastActivityAt: string | null;
  notesCount: number;
}

function staffNotesFromState(raw: unknown): unknown[] {
  if (!raw || typeof raw !== "object") return [];
  const sn = (raw as { staff_notes?: unknown }).staff_notes;
  return Array.isArray(sn) ? sn : [];
}

async function buildDashboardAdminOrgRow(orgId: string): Promise<DashboardAdminOnboardingOrgRow | null> {
  const [org] = await db.select().from(organizations).where(eq(organizations.id, orgId)).limit(1);
  if (!org) return null;

  const payload = await buildOnboardingStatePayload(orgId);
  if (!payload) return null;

  const rows = await db
    .select()
    .from(onboardingTasks)
    .where(eq(onboardingTasks.organization_id, orgId));

  const leaderPayments = readLeaderPaymentsEnabled(org.settings);
  const lastActivityAt =
    rows.length === 0
      ? null
      : rows.reduce<string | null>((acc, r) => {
          const u = r.updated_at;
          if (!acc || u > acc) return u;
          return acc;
        }, null);

  const phaseLabel = currentPhaseLabelForOrg(rows, leaderPayments);
  const currentPhase = phaseLabel === "complete" ? null : phaseLabel;

  const prepLocks = ONBOARDING_TASKS.filter((d) => d.requiresMovementalPrep).map((def) => {
    const r = rows.find((x) => x.task_key === def.key);
    return {
      taskKey: def.key,
      locked: !(r?.movemental_unlocked ?? false),
    };
  });

  const notesCount = staffNotesFromState(org.onboarding_state).length;

  return {
    organizationId: org.id,
    name: org.name,
    slug: org.slug,
    onboardingStartedAt: org.onboarding_started_at,
    onboardingCompletedAt: org.onboarding_completed_at,
    currentPhase,
    phaseSummaries: payload.phaseSummaries,
    prepLocks,
    lastActivityAt,
    notesCount,
  };
}

/** Staff list: started, not completed. */
export async function listDashboardAdminOnboardingOrgs(): Promise<DashboardAdminOnboardingOrgRow[]> {
  const orgs = await db
    .select({ id: organizations.id })
    .from(organizations)
    .where(and(isNotNull(organizations.onboarding_started_at), isNull(organizations.onboarding_completed_at)))
    .orderBy(organizations.name);

  const out: DashboardAdminOnboardingOrgRow[] = [];
  for (const o of orgs) {
    const row = await buildDashboardAdminOrgRow(o.id);
    if (row) out.push(row);
  }
  return out;
}

export interface DashboardAdminOnboardingNote {
  id: string;
  authorUserId: string;
  authorName?: string;
  body: string;
  createdAt: string;
}

export interface DashboardAdminAuditEntry {
  id: string;
  actorUserId: string;
  actorName?: string;
  action: string;
  taskKey?: string;
  note?: string;
  createdAt: string;
}

export async function addStaffOnboardingNote(params: {
  staffUserId: string;
  organizationId: string;
  body: string;
}): Promise<Result<DashboardAdminOnboardingNote>> {
  const staff = await isUserStaff(params.staffUserId);
  if (!staff) return err("forbidden", "Staff access required.");

  const trimmed = params.body.trim();
  if (!trimmed) return err("validation_error", "Note body is required.");

  const [org] = await db
    .select({ onboarding_state: organizations.onboarding_state })
    .from(organizations)
    .where(eq(organizations.id, params.organizationId))
    .limit(1);
  if (!org) return err("not_found", "Organization not found.");

  const cur =
    org.onboarding_state && typeof org.onboarding_state === "object"
      ? { ...(org.onboarding_state as Record<string, unknown>) }
      : {};
  const notes = Array.isArray(cur.staff_notes)
    ? [...(cur.staff_notes as DashboardAdminOnboardingNote[])]
    : [];

  const [actor] = await db
    .select({ first_name: userProfiles.first_name, last_name: userProfiles.last_name })
    .from(userProfiles)
    .where(eq(userProfiles.id, params.staffUserId))
    .limit(1);
  const authorName = [actor?.first_name, actor?.last_name].filter(Boolean).join(" ").trim() || undefined;

  const note: DashboardAdminOnboardingNote = {
    id: crypto.randomUUID(),
    authorUserId: params.staffUserId,
    authorName,
    body: trimmed,
    createdAt: nowIso(),
  };
  notes.push(note);

  await db
    .update(organizations)
    .set({
      onboarding_state: { ...cur, staff_notes: notes } as unknown as Record<string, unknown>,
      updated_at: nowIso(),
    })
    .where(eq(organizations.id, params.organizationId));

  await db.insert(auditLogs).values({
    user_id: params.staffUserId,
    action: "onboarding_staff_note",
    resource_type: "organization",
    resource_id: params.organizationId,
    changes: { note_id: note.id },
  });

  return ok(note);
}

export async function adminCompleteOnboardingTaskOnBehalf(params: {
  staffUserId: string;
  organizationId: string;
  taskKey: string;
  note: string;
}): Promise<Result<{ organizationId: string }>> {
  const staff = await isUserStaff(params.staffUserId);
  if (!staff) return err("forbidden", "Staff access required.");

  const noteTrim = params.note.trim();
  if (!noteTrim) return err("validation_error", "A note is required when completing on behalf.");

  const def = taskDefinitionByKey(params.taskKey);
  if (!def) return err("unknown_task", "Unknown task key.");

  const [owner] = await db
    .select({
      id: userProfiles.id,
      email: userProfiles.email,
      first_name: userProfiles.first_name,
    })
    .from(organizations)
    .innerJoin(userProfiles, eq(organizations.account_owner_id, userProfiles.id))
    .where(eq(organizations.id, params.organizationId))
    .limit(1);

  const result = await completeOnboardingTask({
    organizationId: params.organizationId,
    userId: owner?.id ?? params.staffUserId,
    userEmail: owner?.email ?? "",
    firstName: owner?.first_name ?? null,
    taskKey: params.taskKey,
    metadata: { completed_on_behalf_by: params.staffUserId, staff_note: noteTrim },
  });

  if (!result.success) return result;

  await db.insert(auditLogs).values({
    user_id: params.staffUserId,
    action: "onboarding_complete_on_behalf",
    resource_type: "organization",
    resource_id: params.organizationId,
    changes: { task_key: params.taskKey, note: noteTrim },
  });

  return ok({ organizationId: params.organizationId });
}

export async function finalizeLeaderOnboarding(params: {
  organizationId: string;
  userId: string;
  userEmail: string;
  firstName: string | null;
  attestationAccepted: boolean;
  cohortPrepReflection?: string;
}): Promise<Result<{ onboardingCompletedAt: string }>> {
  if (!params.attestationAccepted) {
    return err("validation_error", "You must confirm accuracy before finishing.");
  }

  const meta: Record<string, unknown> = { attestationAccepted: true };
  if (params.cohortPrepReflection?.trim()) {
    meta.cohortPrepReflection = params.cohortPrepReflection.trim();
  }

  const result = await completeOnboardingTask({
    organizationId: params.organizationId,
    userId: params.userId,
    userEmail: params.userEmail,
    firstName: params.firstName,
    taskKey: "final_confirmation",
    metadata: meta,
  });

  if (!result.success) return result;

  const [org] = await db
    .select({ onboarding_completed_at: organizations.onboarding_completed_at })
    .from(organizations)
    .where(eq(organizations.id, params.organizationId))
    .limit(1);

  return ok({ onboardingCompletedAt: org?.onboarding_completed_at ?? nowIso() });
}

export async function fetchAdminOnboardingAudit(organizationId: string): Promise<DashboardAdminAuditEntry[]> {
  const rows = await db
    .select()
    .from(auditLogs)
    .where(
      and(eq(auditLogs.resource_type, "organization"), eq(auditLogs.resource_id, organizationId)),
    )
    .orderBy(desc(auditLogs.created_at))
    .limit(100);

  const out: DashboardAdminAuditEntry[] = [];
  for (const r of rows) {
    if (
      ![
        "onboarding_task_completed",
        "onboarding_admin_unlock",
        "onboarding_staff_note",
        "onboarding_complete_on_behalf",
      ].includes(r.action)
    ) {
      continue;
    }
    const changes = (r.changes && typeof r.changes === "object" ? r.changes : {}) as Record<
      string,
      unknown
    >;
    let actorName: string | undefined;
    if (r.user_id) {
      const [p] = await db
        .select({ first_name: userProfiles.first_name, last_name: userProfiles.last_name })
        .from(userProfiles)
        .where(eq(userProfiles.id, r.user_id))
        .limit(1);
      actorName = [p?.first_name, p?.last_name].filter(Boolean).join(" ").trim() || undefined;
    }
    out.push({
      id: r.id,
      actorUserId: r.user_id ?? "",
      actorName,
      action: r.action,
      taskKey: typeof changes.task_key === "string" ? changes.task_key : undefined,
      note: typeof changes.note === "string" ? changes.note : undefined,
      createdAt: r.created_at,
    });
  }
  return out;
}

type OnboardingStatePayloadNonNull = NonNullable<Awaited<ReturnType<typeof buildOnboardingStatePayload>>>;

export async function buildAdminOnboardingDetail(params: {
  organizationId: string;
}): Promise<{
  organization: DashboardAdminOnboardingOrgRow;
  tasks: OnboardingStatePayloadNonNull["tasks"];
  notes: DashboardAdminOnboardingNote[];
  audit: DashboardAdminAuditEntry[];
} | null> {
  const orgRow = await buildDashboardAdminOrgRow(params.organizationId);
  if (!orgRow) return null;

  const payload = await buildOnboardingStatePayload(params.organizationId);
  if (!payload) return null;

  const [org] = await db
    .select({ onboarding_state: organizations.onboarding_state })
    .from(organizations)
    .where(eq(organizations.id, params.organizationId))
    .limit(1);

  const notesRaw = staffNotesFromState(org?.onboarding_state);
  const notes: DashboardAdminOnboardingNote[] = notesRaw
    .filter(
      (n): n is DashboardAdminOnboardingNote =>
        typeof n === "object" &&
        n !== null &&
        "id" in n &&
        "body" in n &&
        typeof (n as { id: unknown }).id === "string",
    )
    .map((n) => n as DashboardAdminOnboardingNote);

  const audit = await fetchAdminOnboardingAudit(params.organizationId);

  return {
    organization: orgRow,
    tasks: payload.tasks,
    notes,
    audit,
  };
}
