import { NextRequest, NextResponse } from "next/server";
import { realityAssessmentService } from "@/lib/services/assessment/reality-assessment.service";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: { code: "MISSING_TOKEN", message: "Assessment token is required" } },
      { status: 400 }
    );
  }

  const result = await realityAssessmentService.getResults(token);

  if (!result.ok) {
    return NextResponse.json(
      { error: { code: "NOT_FOUND", message: result.error.message } },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true, data: result.data });
}
