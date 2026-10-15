import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { realityAssessmentService } from "@/lib/services/assessment/reality-assessment.service";

const StartAssessmentSchema = z.object({
  organizationName: z.string().min(1, "Organization name is required"),
  organizationType: z.string().optional(),
  leaderEmail: z.string().email("Valid email is required"),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = StartAssessmentSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", details: parsed.error.issues } },
        { status: 400 }
      );
    }

    const result = await realityAssessmentService.startSession(parsed.data);

    if (!result.ok) {
      return NextResponse.json(
        { error: { code: "SERVER_ERROR", message: result.error.message } },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, data: result.data });
  } catch (err) {
    return NextResponse.json(
      { error: { code: "INVALID_REQUEST", message: String(err) } },
      { status: 400 }
    );
  }
}
