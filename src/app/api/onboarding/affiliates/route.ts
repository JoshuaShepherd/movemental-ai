import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { resolveActiveOrganizationId } from "@/lib/services/onboarding/onboarding.service";
import { listAffiliatesForOrg } from "@/lib/services/onboarding/onboarding-http.service";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    return NextResponse.json(
      { error: { code: "unauthorized", message: "Sign in required." } },
      { status: 401 },
    );
  }

  const orgSlug = request.nextUrl.searchParams.get("org");
  const resolved = await resolveActiveOrganizationId(user.id, orgSlug);
  if (!resolved.success) {
    return NextResponse.json({ error: resolved.error }, { status: 400 });
  }

  const result = await listAffiliatesForOrg(resolved.data.organizationId);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ success: true, data: { affiliates: result.data } });
}
