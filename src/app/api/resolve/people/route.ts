import { NextRequest, NextResponse } from "next/server";
import { resolutionService } from "@/lib/services/resolutions/resolution.service";

export async function GET(req: NextRequest) {
  const org = req.nextUrl.searchParams.get("org") || "";
  const result = await resolutionService.getPeopleSummary(org);

  if (!result.ok) {
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: result.error.message } },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, data: result.data });
}
