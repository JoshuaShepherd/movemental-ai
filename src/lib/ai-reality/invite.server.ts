import "server-only";

import { createHash, randomBytes } from "node:crypto";

import { and, desc, eq, isNull } from "drizzle-orm";

import { db } from "@/lib/db";
import { aiRealityInvites, organizations } from "@/lib/db/schema";

/**
 * Team-invite token mechanics for the Organizational AI Reality Assessment —
 * the exact SHA-256 scheme proven by sandbox_staff_readiness_invites. Only the
 * hash is stored; the raw secret is shown once at creation time.
 */
export function hashInviteToken(raw: string): string {
  return createHash("sha256").update(raw, "utf8").digest("hex");
}

export function generateInviteSecret(): string {
  return randomBytes(24).toString("base64url");
}

export async function createAiRealityInvite(params: {
  organizationId: string;
  createdBy: string | null;
  label?: string | null;
  expiresAt?: string | null;
}): Promise<{ rawToken: string; inviteId: string }> {
  const rawToken = generateInviteSecret();
  const token_hash = hashInviteToken(rawToken);
  const [row] = await db
    .insert(aiRealityInvites)
    .values({
      organization_id: params.organizationId,
      token_hash,
      label: params.label ?? null,
      expires_at: params.expiresAt ?? null,
      created_by: params.createdBy,
    })
    .returning({ id: aiRealityInvites.id });

  if (!row) throw new Error("Failed to create AI Reality invite.");
  return { rawToken, inviteId: row.id };
}

export type ResolvedAiRealityInvite =
  | {
      ok: true;
      inviteId: string;
      organizationId: string;
      organizationName: string;
      organizationSlug: string;
    }
  | { ok: false; reason: "not_found" | "expired" | "revoked" };

export async function resolveAiRealityInviteByToken(
  rawToken: string,
): Promise<ResolvedAiRealityInvite> {
  const trimmed = rawToken.trim();
  if (trimmed.length < 16) return { ok: false, reason: "not_found" };

  const hash = hashInviteToken(trimmed);
  const [row] = await db
    .select({
      id: aiRealityInvites.id,
      organization_id: aiRealityInvites.organization_id,
      revoked_at: aiRealityInvites.revoked_at,
      expires_at: aiRealityInvites.expires_at,
      org_name: organizations.name,
      org_slug: organizations.slug,
    })
    .from(aiRealityInvites)
    .innerJoin(organizations, eq(aiRealityInvites.organization_id, organizations.id))
    .where(eq(aiRealityInvites.token_hash, hash))
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

export type AiRealityInviteListRow = {
  id: string;
  label: string | null;
  expiresAt: string | null;
  revokedAt: string | null;
  createdAt: string;
};

export async function listAiRealityInvites(
  organizationId: string,
): Promise<AiRealityInviteListRow[]> {
  const rows = await db
    .select({
      id: aiRealityInvites.id,
      label: aiRealityInvites.label,
      expires_at: aiRealityInvites.expires_at,
      revoked_at: aiRealityInvites.revoked_at,
      created_at: aiRealityInvites.created_at,
    })
    .from(aiRealityInvites)
    .where(eq(aiRealityInvites.organization_id, organizationId))
    .orderBy(desc(aiRealityInvites.created_at))
    .limit(100);

  return rows.map((r) => ({
    id: r.id,
    label: r.label,
    expiresAt: r.expires_at,
    revokedAt: r.revoked_at,
    createdAt: r.created_at,
  }));
}

/** Count non-revoked invites for an org — feeds the dashboard "X of Y" line. */
export async function countActiveInvites(organizationId: string): Promise<number> {
  const rows = await db
    .select({ id: aiRealityInvites.id })
    .from(aiRealityInvites)
    .where(
      and(
        eq(aiRealityInvites.organization_id, organizationId),
        isNull(aiRealityInvites.revoked_at),
      ),
    );
  return rows.length;
}
