/**
 * Idempotent backfill: initialize onboarding_tasks for every organization,
 * mark internal/staff orgs complete, and seed staff_users from account owners.
 *
 * Requires DATABASE_URL (and optionally SUPABASE_SERVICE_ROLE_KEY — unused here;
 * Drizzle uses DATABASE_URL and bypasses RLS).
 *
 * Run: pnpm tsx scripts/backfill-onboarding-tasks.ts
 */

import path from "node:path";
import { config as loadEnv } from "dotenv";

loadEnv({ path: path.join(__dirname, "..", ".env.local") });

import { asc, eq } from "drizzle-orm";

import { db } from "../src/lib/db";
import { onboardingTasks, organizations, staffUsers } from "../src/lib/db/schema";
import {
  initializeOnboardingTasksForOrganization,
  organizationHasInitializedTasks,
} from "../src/lib/services/onboarding/onboarding.service";

const STAFF_COMPLETE_SLUGS = new Set([
  "movemental",
  "movemental-admin",
  "josh-shepherd",
  "brad-brisco",
]);

function nowIso(): string {
  return new Date().toISOString();
}

async function main() {
  const allOrgs = await db.select().from(organizations).orderBy(asc(organizations.slug));

  const summary: string[][] = [];

  for (const org of allOrgs) {
    const hadTasks = await organizationHasInitializedTasks(org.id);
    const init = await initializeOnboardingTasksForOrganization(org.id);
    if (!init.success) {
      summary.push([org.slug, "init_error", init.error.message]);
      continue;
    }
    summary.push([org.slug, hadTasks ? "tasks_existed" : "initialized", ""]);

    if (STAFF_COMPLETE_SLUGS.has(org.slug)) {
      await db
        .update(onboardingTasks)
        .set({
          status: "skipped",
          updated_at: nowIso(),
        })
        .where(eq(onboardingTasks.organization_id, org.id));

      await db
        .update(organizations)
        .set({
          onboarding_completed_at: nowIso(),
          updated_at: nowIso(),
        })
        .where(eq(organizations.id, org.id));

      summary.push([org.slug, "marked_staff_complete", ""]);
    }
  }

  const ownerIds = new Set<string>();
  for (const org of allOrgs) {
    if (!STAFF_COMPLETE_SLUGS.has(org.slug)) continue;
    if (org.account_owner_id) ownerIds.add(org.account_owner_id);
  }

  for (const uid of ownerIds) {
    await db.insert(staffUsers).values({ user_id: uid }).onConflictDoNothing();
  }

  console.table(
    summary.map(([slug, action, note]) => ({ slug, action, note })),
  );
  console.log(`staff_users upserted (unique owners): ${ownerIds.size}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
