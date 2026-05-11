import { NextRequest, NextResponse } from "next/server";

import {
  listMembershipOrganizations,
  resolveActiveOrganizationId,
} from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

/**
 * Resolves the authenticated user's active organization for program surfaces.
 * Honors `?org=` (slug) when the user has membership; otherwise falls back to
 * the first membership (same semantics as onboarding helpers).
 *
 * Use this from client components when you need org scope without relying on
 * `TENANT_ORG_ID`. Row-backed CRUD should still go through `/api/simplified/*`
 * once tables exist in the live DB and Layers 2–5 are regenerated.
 */
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    return NextResponse.json(
      { error: { code: "UNAUTHORIZED", message: "Sign in required." } },
      { status: 401 },
    );
  }

  const orgSlug = request.nextUrl.searchParams.get("org");
  const resolved = await resolveActiveOrganizationId(user.id, orgSlug);
  if (!resolved.success) {
    return NextResponse.json({ error: resolved.error }, { status: 400 });
  }

  const memberships = await listMembershipOrganizations(user.id);
  const row = memberships.find((m) => m.organizationId === resolved.data.organizationId);

  return NextResponse.json({
    organizationId: resolved.data.organizationId,
    slug: resolved.data.slug,
    organizationName: row?.orgName ?? null,
  });
}
