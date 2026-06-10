/**
 * Audit and repair auth users → tenant onboarding readiness.
 *
 * Ensures every auth.users row has:
 * - user_profiles
 * - an owned organization + active owner membership
 * - full onboarding_tasks set for every active organization
 *
 * Optional auth fixes (--fix-auth):
 * - confirms admin-provisioned emails still awaiting confirmation
 * - sends password recovery links for invited users without a password
 *
 * Run: pnpm auth:sync-tenant-readiness
 * Fix: pnpm auth:sync-tenant-readiness -- --fix-auth
 */

import path from "node:path";
import { config as loadEnv } from "dotenv";

loadEnv({ path: path.join(__dirname, "..", ".env.local") });

import { createClient } from "@supabase/supabase-js";
import { asc, and, eq, sql } from "drizzle-orm";

import { db } from "../src/lib/db";
import {
  onboardingTasks,
  organizationMemberships,
  organizations,
  userProfiles,
} from "../src/lib/db/schema";
import {
  computeNewlyAvailableKeys,
  readLeaderPaymentsEnabled,
  shouldAutoSkipTaxForm,
  type TaskRowLike,
  type TaskRowStatus,
} from "../src/lib/onboarding/state";
import { ONBOARDING_TASKS } from "../src/lib/onboarding/tasks";

function nowIso(): string {
  return new Date().toISOString();
}

async function organizationHasInitializedTasks(organizationId: string): Promise<boolean> {
  const rows = await db
    .select({ task_key: onboardingTasks.task_key })
    .from(onboardingTasks)
    .where(eq(onboardingTasks.organization_id, organizationId));
  const existing = new Set(rows.map((r) => r.task_key));
  return ONBOARDING_TASKS.every((t) => existing.has(t.key));
}

async function promoteAndSkipTax(organizationId: string, leaderPayments: boolean): Promise<void> {
  for (let round = 0; round < 32; round += 1) {
    const rows = await db
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
        (taxRow.status === "locked" ||
          taxRow.status === "available" ||
          taxRow.status === "in_progress")
      ) {
        await db
          .update(onboardingTasks)
          .set({ status: "skipped", updated_at: nowIso() })
          .where(eq(onboardingTasks.id, taxRow.id));
        continue;
      }
    }

    const toPromote = computeNewlyAvailableKeys(ONBOARDING_TASKS, rowByKey);
    if (toPromote.length === 0) break;

    for (const key of toPromote) {
      await db
        .update(onboardingTasks)
        .set({ status: "available", updated_at: nowIso() })
        .where(
          and(
            eq(onboardingTasks.organization_id, organizationId),
            eq(onboardingTasks.task_key, key),
            eq(onboardingTasks.status, "locked"),
          ),
        );
    }
  }
}

async function initializeOnboardingTasksForOrganization(
  organizationId: string,
): Promise<{ inserted: boolean }> {
  const rows = await db
    .select({ task_key: onboardingTasks.task_key })
    .from(onboardingTasks)
    .where(eq(onboardingTasks.organization_id, organizationId));
  const existing = new Set(rows.map((r) => r.task_key));
  const missing = ONBOARDING_TASKS.filter((def) => !existing.has(def.key));
  if (missing.length === 0) return { inserted: false };

  const inserts = missing.map((def) => {
    let status: TaskRowStatus = "locked";
    let movemental_unlocked = true;
    if (def.requiresMovementalPrep) movemental_unlocked = false;
    if (def.dependsOn.length === 0) status = "available";
    return {
      organization_id: organizationId,
      task_key: def.key,
      status,
      movemental_unlocked,
      metadata: {},
    };
  });

  await db.insert(onboardingTasks).values(inserts);

  const [orgRow] = await db
    .select({ settings: organizations.settings })
    .from(organizations)
    .where(eq(organizations.id, organizationId))
    .limit(1);
  await promoteAndSkipTax(organizationId, readLeaderPaymentsEnabled(orgRow?.settings));

  return { inserted: true };
}

type AuthAuditRow = {
  id: string;
  email: string;
  email_confirmed_at: string | null;
  has_password: boolean;
};

type AuditIssue = {
  email: string;
  issue: string;
  action?: string;
};

function slugBaseFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "user";
  return local
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

async function listAuthUsers(): Promise<AuthAuditRow[]> {
  const rows = await db.execute(sql`
    SELECT
      u.id,
      u.email,
      u.email_confirmed_at,
      (u.encrypted_password IS NOT NULL AND u.encrypted_password <> '') AS has_password
    FROM auth.users u
    ORDER BY u.email
  `);
  return rows as unknown as AuthAuditRow[];
}

async function ensureProfile(userId: string, email: string, displayName: string): Promise<boolean> {
  const [existing] = await db
    .select({ id: userProfiles.id })
    .from(userProfiles)
    .where(eq(userProfiles.id, userId))
    .limit(1);
  if (existing) return false;

  await db.insert(userProfiles).values({
    id: userId,
    email,
    display_name: displayName,
    account_status: "active",
    role: "user",
  });
  return true;
}

async function ensureOwnedOrganization(
  userId: string,
  email: string,
  displayName: string,
): Promise<{ created: boolean; organizationId: string | null }> {
  const [owned] = await db
    .select({ id: organizations.id })
    .from(organizations)
    .where(eq(organizations.account_owner_id, userId))
    .limit(1);
  if (owned) return { created: false, organizationId: owned.id };

  let base = slugBaseFromEmail(email) || slugBaseFromEmail(displayName);
  if (!base) base = `user-${userId.replace(/-/g, "").slice(0, 8)}`;

  let slug = base;
  for (let suffix = 0; suffix <= 50; suffix += 1) {
    const candidate = suffix === 0 ? base : `${base}-${suffix}`;
    const [conflict] = await db
      .select({ id: organizations.id })
      .from(organizations)
      .where(eq(organizations.slug, candidate))
      .limit(1);
    if (!conflict) {
      slug = candidate;
      break;
    }
  }

  const [org] = await db
    .insert(organizations)
    .values({
      name: displayName || email,
      slug,
      organization_type: "individual",
      account_owner_id: userId,
      status: "trial",
      is_active: true,
      license_type: "individual",
      max_users: 1,
    })
    .returning({ id: organizations.id });

  await db.insert(organizationMemberships).values({
    user_id: userId,
    organization_id: org.id,
    role: "owner",
    status: "active",
    joined_at: new Date().toISOString(),
  });

  return { created: true, organizationId: org.id };
}

async function ensureActiveMembership(userId: string, organizationId: string): Promise<boolean> {
  const [membership] = await db
    .select({ id: organizationMemberships.id, status: organizationMemberships.status })
    .from(organizationMemberships)
    .where(
      and(
        eq(organizationMemberships.user_id, userId),
        eq(organizationMemberships.organization_id, organizationId),
      ),
    )
    .limit(1);

  if (!membership) {
    await db.insert(organizationMemberships).values({
      user_id: userId,
      organization_id: organizationId,
      role: "owner",
      status: "active",
      joined_at: new Date().toISOString(),
    });
    return true;
  }

  if (membership.status !== "active") {
    await db
      .update(organizationMemberships)
      .set({ status: "active", updated_at: new Date().toISOString() })
      .where(eq(organizationMemberships.id, membership.id));
    return true;
  }

  return false;
}

async function repairAuthSignIn(
  users: AuthAuditRow[],
  siteUrl: string,
): Promise<AuditIssue[]> {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!serviceKey || !supabaseUrl) {
    return [
      {
        email: "*",
        issue: "SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL missing — skipped auth fixes",
      },
    ];
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const actions: AuditIssue[] = [];

  for (const user of users) {
    if (!user.email_confirmed_at) {
      const { error } = await admin.auth.admin.updateUserById(user.id, {
        email_confirm: true,
      });
      actions.push({
        email: user.email,
        issue: "email_unconfirmed",
        action: error ? `confirm_failed: ${error.message}` : "confirmed_email",
      });
    }

    if (!user.has_password) {
      const redirectTo = `${siteUrl.replace(/\/$/, "")}/auth/callback?next=${encodeURIComponent("/auth/update-password")}`;
      const { data, error } = await admin.auth.admin.generateLink({
        type: "recovery",
        email: user.email,
        options: { redirectTo },
      });
      actions.push({
        email: user.email,
        issue: "missing_password",
        action: error
          ? `recovery_link_failed: ${error.message}`
          : data.properties?.action_link
            ? "recovery_link_generated"
            : "recovery_link_unknown",
      });
      if (data.properties?.action_link) {
        console.log(`Recovery link for ${user.email}:\n${data.properties.action_link}\n`);
      }
    }
  }

  return actions;
}

async function main() {
  const fixAuth = process.argv.includes("--fix-auth");
  const siteUrl = (() => {
    const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    if (explicit) return explicit;
    const vercel = process.env.VERCEL_URL?.trim();
    if (vercel) return vercel.startsWith("http") ? vercel : `https://${vercel}`;
    return "http://localhost:3000";
  })();

  const authUsers = await listAuthUsers();
  const issues: AuditIssue[] = [];
  let profilesCreated = 0;
  let orgsCreated = 0;
  let membershipsRepaired = 0;
  let taskInits = 0;

  for (const user of authUsers) {
    const displayName = user.email.split("@")[0] ?? user.email;

    if (await ensureProfile(user.id, user.email, displayName)) {
      profilesCreated += 1;
      issues.push({ email: user.email, issue: "missing_profile", action: "created_profile" });
    }

    const owned = await ensureOwnedOrganization(user.id, user.email, displayName);
    if (owned.created) {
      orgsCreated += 1;
      issues.push({ email: user.email, issue: "missing_owned_org", action: "created_org" });
    }

    if (owned.organizationId && (await ensureActiveMembership(user.id, owned.organizationId))) {
      membershipsRepaired += 1;
    }

    const [membershipCount] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(organizationMemberships)
      .where(eq(organizationMemberships.user_id, user.id));
    if ((membershipCount?.n ?? 0) === 0) {
      issues.push({ email: user.email, issue: "no_membership" });
    }

    if (!user.email_confirmed_at) {
      issues.push({ email: user.email, issue: "email_unconfirmed" });
    }
    if (!user.has_password) {
      issues.push({ email: user.email, issue: "missing_password" });
    }
  }

  const allOrgs = await db
    .select({ id: organizations.id, slug: organizations.slug })
    .from(organizations)
    .where(eq(organizations.is_active, true))
    .orderBy(asc(organizations.slug));

  for (const org of allOrgs) {
    const complete = await organizationHasInitializedTasks(org.id);
    if (complete) continue;
    const init = await initializeOnboardingTasksForOrganization(org.id);
    taskInits += 1;
    issues.push({
      email: org.slug,
      issue: "incomplete_onboarding_tasks",
      action: init.inserted ? "initialized_tasks" : "backfilled_missing_tasks",
    });
  }

  const orphanTaskRows = await db.execute(sql`
    SELECT o.slug, t.task_key
    FROM public.onboarding_tasks t
    JOIN public.organizations o ON o.id = t.organization_id
    WHERE t.task_key NOT IN (
      'sign_agreement','confirm_payment','choose_cohort','organization_profile',
      'images_upload','brand_guidelines','consent_block','tax_form','orientation',
      'corpus_review','affiliates_review','themes_review','agent_test',
      'platform_tour','cohort_prep','final_confirmation'
    )
    ORDER BY o.slug, t.task_key
  `);

  let authActions: AuditIssue[] = [];
  if (fixAuth) {
    const needsAuthFix = authUsers.filter((u) => !u.email_confirmed_at || !u.has_password);
    authActions = await repairAuthSignIn(needsAuthFix, siteUrl);
  }

  console.log("\n=== Auth tenant readiness sync ===");
  console.log(`Auth users audited: ${authUsers.length}`);
  console.log(`Profiles created: ${profilesCreated}`);
  console.log(`Organizations created: ${orgsCreated}`);
  console.log(`Memberships repaired: ${membershipsRepaired}`);
  console.log(`Organizations with task init/backfill: ${taskInits}`);

  if (issues.length > 0) {
    console.log("\nIssues / repairs:");
    console.table(issues);
  } else {
    console.log("\nNo tenant provisioning gaps found.");
  }

  if ((orphanTaskRows as unknown[]).length > 0) {
    console.log("\nLegacy onboarding task keys (harmless, left in place):");
    console.table(orphanTaskRows);
  }

  if (authActions.length > 0) {
    console.log("\nAuth sign-in fixes:");
    console.table(authActions);
  } else if (fixAuth) {
    console.log("\nNo auth sign-in fixes were needed.");
  } else {
    const blocked = authUsers.filter((u) => !u.email_confirmed_at || !u.has_password);
    if (blocked.length > 0) {
      console.log(
        `\n${blocked.length} user(s) may be blocked from password sign-in. Re-run with --fix-auth to confirm emails and generate recovery links.`,
      );
      console.table(
        blocked.map((u) => ({
          email: u.email,
          email_unconfirmed: !u.email_confirmed_at,
          missing_password: !u.has_password,
        })),
      );
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
