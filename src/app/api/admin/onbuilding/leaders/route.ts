import { NextResponse } from "next/server";

import { requireOnbuildingAdmin } from "@/lib/auth/require-onbuilding-admin";
import { listLeadersWithSectionCounts } from "@/lib/services/onbuilding/onbuilding-sections-admin.service";

export async function GET() {
  const auth = await requireOnbuildingAdmin();
  if ("error" in auth) return auth.error;

  const result = await listLeadersWithSectionCounts();
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ success: true, data: result.data });
}
