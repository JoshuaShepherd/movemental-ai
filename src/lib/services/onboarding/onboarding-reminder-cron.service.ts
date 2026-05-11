import "server-only";

import { and, eq, isNotNull, isNull } from "drizzle-orm";

import { db } from "@/lib/db";
import { onboardingTasks, organizations, userProfiles } from "@/lib/db/schema";
import {
  sendOnboardingPhase2ReminderEmail,
  sendPreCohortOnboardingReminderEmail,
} from "@/lib/email/onboarding-emails";
import { ONBOARDING_TASKS } from "@/lib/onboarding/tasks";
import {
  readLeaderPaymentsEnabled,
  shouldAutoSkipTaxForm,
  type TaskRowLike,
  type TaskRowStatus,
} from "@/lib/onboarding/state";

const PHASE_1_KEYS = ["sign_agreement", "confirm_payment", "choose_cohort"] as const;
const MS_48H = 48 * 3600000;

type EmailState = {
  emails_sent?: {
    welcome?: boolean;
    phase1_complete?: boolean;
    phase2_reminder?: boolean;
    pre_cohort_reminder?: boolean;
  };
};

function parseEmailState(raw: unknown): EmailState {
  if (!raw || typeof raw !== "object") return {};
  return raw as EmailState;
}

function cohortFiveDaysOutLabel(cohortDateStr: string): boolean {
  const cohort = new Date(`${cohortDateStr}T12:00:00.000Z`);
  if (Number.isNaN(cohort.getTime())) return false;
  const boundary = new Date(cohort);
  boundary.setUTCDate(boundary.getUTCDate() - 5);
  const y = boundary.toISOString().slice(0, 10);
  const today = new Date().toISOString().slice(0, 10);
  return y === today;
}

function identityStillIncomplete(
  taskRows: { task_key: string; status: string; movemental_unlocked: boolean }[],
  leaderPayments: boolean,
): boolean {
  const taskLikes: Map<string, TaskRowLike> = new Map(
    taskRows.map((r) => [
      r.task_key,
      {
        task_key: r.task_key,
        status: r.status as TaskRowStatus,
        movemental_unlocked: r.movemental_unlocked,
      },
    ]),
  );

  const defs = ONBOARDING_TASKS.filter((d) => d.phase === "identity");
  for (const def of defs) {
    if (def.requirement === "optional") continue;
    if (def.key === "tax_form" && shouldAutoSkipTaxForm(leaderPayments, taskLikes)) continue;
    const st = taskLikes.get(def.key)?.status;
    if (st !== "completed" && st !== "skipped") return true;
  }
  return false;
}

/** Authenticated by `CRON_SECRET` at the route layer. */
export async function runOnboardingReminderCron(): Promise<{
  phase2RemindersSent: number;
  preCohortRemindersSent: number;
}> {
  let phase2RemindersSent = 0;
  let preCohortRemindersSent = 0;

  const orgs = await db
    .select({
      id: organizations.id,
      onboarding_state: organizations.onboarding_state,
      cohort_start_date: organizations.cohort_start_date,
      ownerEmail: userProfiles.email,
      ownerFirst: userProfiles.first_name,
    })
    .from(organizations)
    .innerJoin(userProfiles, eq(organizations.account_owner_id, userProfiles.id))
    .where(and(isNotNull(organizations.onboarding_started_at), isNull(organizations.onboarding_completed_at)));

  const now = Date.now();

  for (const org of orgs) {
    const taskRows = await db
      .select()
      .from(onboardingTasks)
      .where(eq(onboardingTasks.organization_id, org.id));

    const rowByKey = new Map(taskRows.map((r) => [r.task_key, r]));

    const [settingsRow] = await db
      .select({ settings: organizations.settings })
      .from(organizations)
      .where(eq(organizations.id, org.id))
      .limit(1);
    const leaderPayments = readLeaderPaymentsEnabled(settingsRow?.settings);

    const phase1Done = PHASE_1_KEYS.every((k) => {
      const st = rowByKey.get(k)?.status;
      return st === "completed" || st === "skipped";
    });

    const emails = parseEmailState(org.onboarding_state).emails_sent ?? {};

    if (
      phase1Done &&
      identityStillIncomplete(taskRows, leaderPayments) &&
      !emails.phase2_reminder &&
      org.ownerEmail
    ) {
      const completedAts = PHASE_1_KEYS.map((k) => rowByKey.get(k)?.completed_at).filter(Boolean) as string[];
      const lastPhase1 = completedAts.length
        ? Math.max(...completedAts.map((t) => new Date(t).getTime()))
        : 0;
      if (lastPhase1 > 0 && now - lastPhase1 >= MS_48H) {
        await sendOnboardingPhase2ReminderEmail(org.ownerEmail, org.ownerFirst ?? null);
        const baseState =
          typeof org.onboarding_state === "object" && org.onboarding_state
            ? { ...(org.onboarding_state as Record<string, unknown>) }
            : {};
        await db
          .update(organizations)
          .set({
            onboarding_state: {
              ...baseState,
              emails_sent: { ...emails, phase2_reminder: true },
            } as unknown as Record<string, unknown>,
            updated_at: new Date().toISOString(),
          })
          .where(eq(organizations.id, org.id));
        phase2RemindersSent += 1;
      }
    }

    const cohortStr = org.cohort_start_date ?? null;
    if (
      cohortStr &&
      cohortFiveDaysOutLabel(cohortStr) &&
      !emails.pre_cohort_reminder &&
      org.ownerEmail
    ) {
      const label = new Date(`${cohortStr}T12:00:00.000Z`).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      await sendPreCohortOnboardingReminderEmail(org.ownerEmail, org.ownerFirst ?? null, label);
      const baseState =
        typeof org.onboarding_state === "object" && org.onboarding_state
          ? { ...(org.onboarding_state as Record<string, unknown>) }
          : {};
      await db
        .update(organizations)
        .set({
          onboarding_state: {
            ...baseState,
            emails_sent: { ...emails, pre_cohort_reminder: true },
          } as unknown as Record<string, unknown>,
          updated_at: new Date().toISOString(),
        })
        .where(eq(organizations.id, org.id));
      preCohortRemindersSent += 1;
    }
  }

  return { phase2RemindersSent, preCohortRemindersSent };
}
