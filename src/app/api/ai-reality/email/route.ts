import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getOrgDashboardPayload } from "@/lib/ai-reality/persist";
import { createDashboardShareToken } from "@/lib/ai-reality/share-token.server";
import { sendOrgDashboardEmail } from "@/lib/email/ai-reality-notifications";
import { resolveProfileIdByEmail } from "@/lib/ai-reality/persist";
import { createSlidingWindowRateLimiter } from "@/lib/rate-limit-in-memory";
import { db } from "@/lib/db";
import { organizations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getOptionalAuthUser } from "@/lib/supabase/server";
import { getTenantOrgId } from "@/lib/tenant";

/**
 * "Email me my org dashboard" — generates a fresh share token, builds the share
 * URL, and sends the leader the dashboard email. The single-leader map email is
 * sent inline at capture time (see /api/agent-room/capture); this route covers
 * the org-dashboard send.
 */
const EmailSchema = z.object({
  email: z.string().email().max(320),
});

const emailRateLimit = createSlidingWindowRateLimiter(10, 60 * 60 * 1000);

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (!emailRateLimit(ip)) {
    return NextResponse.json({ error: { code: "RATE_LIMITED" } }, { status: 429 });
  }

  const orgId = getTenantOrgId();
  if (!orgId) {
    return NextResponse.json({ error: { code: "TENANT_NOT_CONFIGURED" } }, { status: 503 });
  }

  const { user } = await getOptionalAuthUser();
  if (!user?.email) {
    return NextResponse.json({ error: { code: "UNAUTHENTICATED" } }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: { code: "INVALID_JSON" } }, { status: 400 });
  }
  const parsed = EmailSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: { code: "VALIDATION_ERROR" } }, { status: 400 });
  }

  const payload = await getOrgDashboardPayload(orgId);
  if (!payload) {
    return NextResponse.json(
      { error: { code: "NO_DASHBOARD", message: "No dashboard yet, take the assessment first." } },
      { status: 404 },
    );
  }

  const [org] = await db
    .select({ name: organizations.name })
    .from(organizations)
    .where(eq(organizations.id, orgId))
    .limit(1);

  const profileId = await resolveProfileIdByEmail(user.email);
  const { rawToken } = await createDashboardShareToken({
    organizationId: orgId,
    createdBy: profileId,
  });
  const origin = new URL(request.url).origin;
  const dashboardUrl = `${origin}/share/ai-reality/${encodeURIComponent(rawToken)}`;

  const sent = await sendOrgDashboardEmail({
    email: parsed.data.email,
    organizationName: org?.name ?? "Your organization",
    dashboardUrl,
    payload,
  });

  return NextResponse.json({ success: true, data: { sent, url: dashboardUrl } });
}
