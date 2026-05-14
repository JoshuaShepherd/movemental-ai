import "server-only";

import { createHash, randomBytes } from "node:crypto";

import { and, desc, eq, isNull } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  organizations,
  sandboxStaffReadinessAnonymousSubmissions,
  sandboxStaffReadinessInvites,
} from "@/lib/db/schema";

import { ReadinessAnswersSchema } from "./readiness-intake-schema";

export function hashReadinessInviteToken(raw: string): string {
  return createHash("sha256").update(raw, "utf8").digest("hex");
}

export function generateReadinessInviteSecret(): string {
  return randomBytes(24).toString("base64url");
}

export async function createReadinessInvite(params: {
  organizationId: string;
  createdBy: string | null;
  label?: string | null;
  expiresAt?: string | null;
}): Promise<{ rawToken: string; inviteId: string }> {
  const rawToken = generateReadinessInviteSecret();
  const token_hash = hashReadinessInviteToken(rawToken);
  const [row] = await db
    .insert(sandboxStaffReadinessInvites)
    .values({
      organization_id: params.organizationId,
      token_hash,
      label: params.label ?? null,
      expires_at: params.expiresAt ?? null,
      created_by: params.createdBy,
    })
    .returning({ id: sandboxStaffReadinessInvites.id });

  if (!row) {
    throw new Error("Failed to create readiness invite.");
  }
  return { rawToken, inviteId: row.id };
}

export type ResolvedReadinessInvite =
  | {
      ok: true;
      inviteId: string;
      organizationId: string;
      organizationName: string;
      organizationSlug: string;
    }
  | { ok: false; reason: "not_found" | "expired" | "revoked" };

export async function resolveReadinessInviteBySecretToken(
  rawToken: string,
): Promise<ResolvedReadinessInvite> {
  const trimmed = rawToken.trim();
  if (trimmed.length < 16) return { ok: false, reason: "not_found" };

  const hash = hashReadinessInviteToken(trimmed);
  const [row] = await db
    .select({
      id: sandboxStaffReadinessInvites.id,
      organization_id: sandboxStaffReadinessInvites.organization_id,
      revoked_at: sandboxStaffReadinessInvites.revoked_at,
      expires_at: sandboxStaffReadinessInvites.expires_at,
      org_name: organizations.name,
      org_slug: organizations.slug,
    })
    .from(sandboxStaffReadinessInvites)
    .innerJoin(organizations, eq(sandboxStaffReadinessInvites.organization_id, organizations.id))
    .where(eq(sandboxStaffReadinessInvites.token_hash, hash))
    .limit(1);

  if (!row) return { ok: false, reason: "not_found" };
  if (row.revoked_at) return { ok: false, reason: "revoked" };
  if (row.expires_at) {
    const expMs = new Date(row.expires_at).getTime();
    if (Number.isFinite(expMs) && Date.now() > expMs) {
      return { ok: false, reason: "expired" };
    }
  }

  return {
    ok: true,
    inviteId: row.id,
    organizationId: row.organization_id,
    organizationName: row.org_name,
    organizationSlug: row.org_slug,
  };
}

export type ReadinessAnonymousInsertInput = {
  inviteId: string;
  organizationId: string;
  displayName: string;
  email?: string;
  roleOrTeam?: string;
  answers: Record<string, unknown>;
  intakeVersion?: string;
};

export async function insertReadinessAnonymousSubmission(
  input: ReadinessAnonymousInsertInput,
): Promise<{ ok: true; id: string; submittedAt: string } | { ok: false; reason: string }> {
  const parsedAnswers = ReadinessAnswersSchema.safeParse(input.answers);
  if (!parsedAnswers.success) {
    return { ok: false, reason: "invalid_answers" };
  }

  const [row] = await db
    .insert(sandboxStaffReadinessAnonymousSubmissions)
    .values({
      invite_id: input.inviteId,
      organization_id: input.organizationId,
      display_name: input.displayName.trim(),
      email: input.email?.trim() || null,
      role_or_team: input.roleOrTeam?.trim() || null,
      answers: parsedAnswers.data,
      intake_version: input.intakeVersion ?? null,
    })
    .returning({
      id: sandboxStaffReadinessAnonymousSubmissions.id,
      submitted_at: sandboxStaffReadinessAnonymousSubmissions.submitted_at,
    });

  if (!row) {
    return { ok: false, reason: "insert_failed" };
  }
  return { ok: true, id: row.id, submittedAt: row.submitted_at };
}

export type ReadinessInviteListRow = {
  id: string;
  label: string | null;
  expiresAt: string | null;
  revokedAt: string | null;
  createdAt: string;
};

export async function listReadinessInvitesForOrganization(
  organizationId: string,
): Promise<ReadinessInviteListRow[]> {
  const rows = await db
    .select({
      id: sandboxStaffReadinessInvites.id,
      label: sandboxStaffReadinessInvites.label,
      expires_at: sandboxStaffReadinessInvites.expires_at,
      revoked_at: sandboxStaffReadinessInvites.revoked_at,
      created_at: sandboxStaffReadinessInvites.created_at,
    })
    .from(sandboxStaffReadinessInvites)
    .where(eq(sandboxStaffReadinessInvites.organization_id, organizationId))
    .orderBy(desc(sandboxStaffReadinessInvites.created_at))
    .limit(50);

  return rows.map((r) => ({
    id: r.id,
    label: r.label,
    expiresAt: r.expires_at,
    revokedAt: r.revoked_at,
    createdAt: r.created_at,
  }));
}

export async function revokeReadinessInvite(params: {
  organizationId: string;
  inviteId: string;
}): Promise<{ ok: true } | { ok: false; reason: "not_found" | "forbidden" }> {
  const now = new Date().toISOString();
  const result = await db
    .update(sandboxStaffReadinessInvites)
    .set({ revoked_at: now, updated_at: now })
    .where(
      and(
        eq(sandboxStaffReadinessInvites.id, params.inviteId),
        eq(sandboxStaffReadinessInvites.organization_id, params.organizationId),
        isNull(sandboxStaffReadinessInvites.revoked_at),
      ),
    )
    .returning({ id: sandboxStaffReadinessInvites.id });

  if (result.length === 0) {
    return { ok: false, reason: "not_found" };
  }
  return { ok: true };
}
