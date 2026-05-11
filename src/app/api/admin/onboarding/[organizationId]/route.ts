import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { buildAdminOnboardingDetail, isUserStaff } from "@/lib/services/onboarding/onboarding.service";

export async function GET(
  _request: NextRequest,
  ctx: { params: Promise<{ organizationId: string }> },
) {
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

  const staff = await isUserStaff(user.id);
  if (!staff) {
    return NextResponse.json(
      { error: { code: "forbidden", message: "Staff access required." } },
      { status: 403 },
    );
  }

  const { organizationId } = await ctx.params;
  const detail = await buildAdminOnboardingDetail({ organizationId });
  if (!detail) {
    return NextResponse.json(
      { error: { code: "not_found", message: "Organization not found." } },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true, data: detail });
}
