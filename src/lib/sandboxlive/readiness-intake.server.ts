import "server-only";

import { and, eq, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import { sandboxStaffReadinessSubmissions } from "@/lib/db/schema";

import {
  ReadinessAnswersSchema,
  type ReadinessAnswers,
} from "./readiness-intake-schema";

/** Postgres undefined_table — table not migrated yet. */
function isUndefinedTableError(error: unknown): boolean {
  let current: unknown = error;
  for (let depth = 0; depth < 6 && current; depth += 1) {
    if (
      typeof current === "object" &&
      current !== null &&
      "code" in current &&
      (current as { code: string }).code === "42P01"
    ) {
      return true;
    }
    if (
      typeof current === "object" &&
      current !== null &&
      "cause" in current &&
      (current as { cause: unknown }).cause !== undefined
    ) {
      current = (current as { cause: unknown }).cause;
    } else {
      break;
    }
  }
  return false;
}

export interface ReadinessSubmissionRow {
  id: string;
  organizationId: string;
  userId: string;
  answers: ReadinessAnswers;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

/** Load the current user's submission for the active org, if any. */
export async function loadReadinessSubmission(
  organizationId: string,
  userId: string,
): Promise<ReadinessSubmissionRow | null> {
  let row:
    | {
        id: string;
        organization_id: string;
        user_id: string;
        answers: unknown;
        submitted_at: string;
        created_at: string;
        updated_at: string;
      }
    | undefined;

  try {
    [row] = await db
      .select({
        id: sandboxStaffReadinessSubmissions.id,
        organization_id: sandboxStaffReadinessSubmissions.organization_id,
        user_id: sandboxStaffReadinessSubmissions.user_id,
        answers: sandboxStaffReadinessSubmissions.answers,
        submitted_at: sandboxStaffReadinessSubmissions.submitted_at,
        created_at: sandboxStaffReadinessSubmissions.created_at,
        updated_at: sandboxStaffReadinessSubmissions.updated_at,
      })
      .from(sandboxStaffReadinessSubmissions)
      .where(
        and(
          eq(sandboxStaffReadinessSubmissions.organization_id, organizationId),
          eq(sandboxStaffReadinessSubmissions.user_id, userId),
        ),
      )
      .limit(1);
  } catch (e) {
    if (isUndefinedTableError(e)) {
      return null;
    }
    throw e;
  }

  if (!row) return null;

  const parsed = ReadinessAnswersSchema.safeParse(row.answers ?? {});
  return {
    id: row.id,
    organizationId: row.organization_id,
    userId: row.user_id,
    // If a stored row drifts from the current schema (renamed question id,
    // etc.), keep returning the raw bag so the UI can still render older
    // answers; new submissions are validated below before write.
    answers: parsed.success ? parsed.data : (row.answers as ReadinessAnswers),
    submittedAt: row.submitted_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export type UpsertReadinessResult =
  | { ok: true; row: ReadinessSubmissionRow }
  | { ok: false; reason: string };

/**
 * Upsert the current user's submission for the org — "latest wins" per the
 * `(organization_id, user_id)` unique constraint. The caller is responsible
 * for verifying the session and membership before invoking this.
 */
export async function upsertReadinessSubmission(params: {
  organizationId: string;
  userId: string;
  answers: ReadinessAnswers;
}): Promise<UpsertReadinessResult> {
  const validated = ReadinessAnswersSchema.safeParse(params.answers);
  if (!validated.success) {
    return { ok: false, reason: "Some answers failed validation." };
  }

  const now = new Date().toISOString();

  let row:
    | {
        id: string;
        organization_id: string;
        user_id: string;
        answers: unknown;
        submitted_at: string;
        created_at: string;
        updated_at: string;
      }
    | undefined;

  try {
    [row] = await db
      .insert(sandboxStaffReadinessSubmissions)
      .values({
        organization_id: params.organizationId,
        user_id: params.userId,
        answers: validated.data,
        submitted_at: now,
      })
      .onConflictDoUpdate({
        target: [
          sandboxStaffReadinessSubmissions.organization_id,
          sandboxStaffReadinessSubmissions.user_id,
        ],
        set: {
          answers: validated.data,
          submitted_at: now,
          updated_at: sql`now()`,
        },
      })
      .returning({
        id: sandboxStaffReadinessSubmissions.id,
        organization_id: sandboxStaffReadinessSubmissions.organization_id,
        user_id: sandboxStaffReadinessSubmissions.user_id,
        answers: sandboxStaffReadinessSubmissions.answers,
        submitted_at: sandboxStaffReadinessSubmissions.submitted_at,
        created_at: sandboxStaffReadinessSubmissions.created_at,
        updated_at: sandboxStaffReadinessSubmissions.updated_at,
      });
  } catch (e) {
    if (isUndefinedTableError(e)) {
      return {
        ok: false,
        reason:
          "Readiness responses could not be saved because the database table is not set up yet. Run the migration in scripts/sql/20260514_sandbox_staff_readiness_submissions.sql.",
      };
    }
    throw e;
  }

  if (!row) return { ok: false, reason: "Database did not return the saved row." };

  return {
    ok: true,
    row: {
      id: row.id,
      organizationId: row.organization_id,
      userId: row.user_id,
      answers: row.answers as ReadinessAnswers,
      submittedAt: row.submitted_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    },
  };
}
