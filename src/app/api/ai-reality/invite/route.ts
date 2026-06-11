import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import {
  createAiRealityInvite,
  listAiRealityInvites,
} from "@/lib/ai-reality/invite.server";
import { resolveProfileIdByEmail } from "@/lib/ai-reality/persist";
import { getOptionalAuthUser } from "@/lib/supabase/server";
import { getTenantOrgId } from "@/lib/tenant";

/**
 * Team-invite management for the Organizational AI Reality Assessment.
 * Authenticated leader only. Org scope = TENANT_ORG_ID (the tenant IS the org),
 * so the same route serves the public front door and a named engagement.
 *
 * GET  — list this org's invites.
 * POST — mint a new invite; returns the raw token + shareable URL (shown once).
 */
const CreateSchema = z.object({
  label: z.string().max(160).optional(),
  expiresAt: z.string().datetime().optional(),
});

function inviteUrl(request: NextRequest, rawToken: string): string {
  const origin = new URL(request.url).origin;
  return `${origin}/team-invite/${encodeURIComponent(rawToken)}`;
}

async function requireLeader() {
  const orgId = getTenantOrgId();
  if (!orgId) return { error: "TENANT_NOT_CONFIGURED" as const };
  const { user } = await getOptionalAuthUser();
  if (!user?.email) return { error: "UNAUTHENTICATED" as const };
  const profileId = await resolveProfileIdByEmail(user.email);
  return { orgId, email: user.email, profileId };
}

export async function GET() {
  const ctx = await requireLeader();
  if ("error" in ctx) {
    const status = ctx.error === "TENANT_NOT_CONFIGURED" ? 503 : 401;
    return NextResponse.json({ error: { code: ctx.error } }, { status });
  }
  const invites = await listAiRealityInvites(ctx.orgId);
  return NextResponse.json({ success: true, data: { invites } });
}

export async function POST(request: NextRequest) {
  const ctx = await requireLeader();
  if ("error" in ctx) {
    const status = ctx.error === "TENANT_NOT_CONFIGURED" ? 503 : 401;
    return NextResponse.json({ error: { code: ctx.error } }, { status });
  }

  let body: unknown = {};
  try {
    body = await request.json();
  } catch {
    /* empty body is fine */
  }
  const parsed = CreateSchema.safeParse(body ?? {});
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: parsed.error.issues[0]?.message } },
      { status: 400 },
    );
  }

  const { rawToken, inviteId } = await createAiRealityInvite({
    organizationId: ctx.orgId,
    createdBy: ctx.profileId,
    label: parsed.data.label ?? null,
    expiresAt: parsed.data.expiresAt ?? null,
  });

  return NextResponse.json(
    { success: true, data: { inviteId, url: inviteUrl(request, rawToken) } },
    { status: 201 },
  );
}
