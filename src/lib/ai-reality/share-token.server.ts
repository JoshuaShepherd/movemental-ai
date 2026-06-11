import "server-only";

import { createHash, randomBytes } from "node:crypto";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { aiRealityShareTokens, organizations } from "@/lib/db/schema";

/**
 * Fresh share-token scheme for the AI Reality Dashboard. Deliberately NOT the
 * legacy mDNA `assessment_share_tokens` route (which returns APEST gift scores).
 * Hashed token → one organization's dashboard.
 */
export function hashShareToken(raw: string): string {
  return createHash("sha256").update(raw, "utf8").digest("hex");
}

export async function createDashboardShareToken(params: {
  organizationId: string;
  createdBy: string | null;
  expiresAt?: string | null;
}): Promise<{ rawToken: string }> {
  const rawToken = randomBytes(24).toString("base64url");
  await db.insert(aiRealityShareTokens).values({
    organization_id: params.organizationId,
    token_hash: hashShareToken(rawToken),
    expires_at: params.expiresAt ?? null,
    created_by: params.createdBy,
  });
  return { rawToken };
}

export type ResolvedShareToken =
  | { ok: true; organizationId: string; organizationName: string }
  | { ok: false; reason: "not_found" | "expired" | "revoked" };

export async function resolveDashboardShareToken(rawToken: string): Promise<ResolvedShareToken> {
  const trimmed = rawToken.trim();
  if (trimmed.length < 16) return { ok: false, reason: "not_found" };

  const [row] = await db
    .select({
      organization_id: aiRealityShareTokens.organization_id,
      revoked_at: aiRealityShareTokens.revoked_at,
      expires_at: aiRealityShareTokens.expires_at,
      org_name: organizations.name,
    })
    .from(aiRealityShareTokens)
    .innerJoin(organizations, eq(aiRealityShareTokens.organization_id, organizations.id))
    .where(eq(aiRealityShareTokens.token_hash, hashShareToken(trimmed)))
    .limit(1);

  if (!row) return { ok: false, reason: "not_found" };
  if (row.revoked_at) return { ok: false, reason: "revoked" };
  if (row.expires_at) {
    const expMs = new Date(row.expires_at).getTime();
    if (Number.isFinite(expMs) && Date.now() > expMs) return { ok: false, reason: "expired" };
  }
  return { ok: true, organizationId: row.organization_id, organizationName: row.org_name };
}
