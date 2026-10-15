import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { realityAssessmentService } from "@/lib/services/assessment/reality-assessment.service";

const PredictSchema = z.object({
  leaderToken: z.string().min(1, "Leader token is required"),
  predictions: z.record(z.string(), z.number()),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = PredictSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", details: parsed.error.issues } },
        { status: 400 }
      );
    }

    const { leaderToken, predictions } = parsed.data;
    const numericPredictions: Record<number, number> = {};
    for (const [k, v] of Object.entries(predictions)) {
      numericPredictions[parseInt(k, 10)] = v;
    }

    const result = await realityAssessmentService.sealPredictions({
      leaderToken,
      predictions: numericPredictions,
    });

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
