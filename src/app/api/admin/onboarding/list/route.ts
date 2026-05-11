import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { isUserStaff, listDashboardAdminOnboardingOrgs } from "@/lib/services/onboarding/onboarding.service";

export async function GET() {
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

  const organizations = await listDashboardAdminOnboardingOrgs();
  return NextResponse.json({ success: true, data: { organizations } });
}
