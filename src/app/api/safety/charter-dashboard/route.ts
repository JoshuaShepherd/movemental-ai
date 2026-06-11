import { NextRequest, NextResponse } from "next/server";

import { loadCharterDashboardForOrg } from "@/lib/services/safety/charter-dashboard";
import { requireSafetyApiContext } from "@/lib/services/safety/require-safety-api";

export async function GET(request: NextRequest) {
  const orgSlug = request.nextUrl.searchParams.get("org");
  const gate = await requireSafetyApiContext(orgSlug);
  if (!gate.ok) {
    return NextResponse.json({ error: { code: gate.code, message: gate.message } }, { status: gate.status });
  }

  const result = await loadCharterDashboardForOrg(gate.ctx.organizationId);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: result.data });
}
