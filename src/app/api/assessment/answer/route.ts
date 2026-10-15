import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { realityAssessmentService } from "@/lib/services/assessment/reality-assessment.service";

const AnswerSchema = z.object({
  contributorToken: z.string().min(1, "Contributor token is required"),
  answers: z.record(z.string(), z.number()),
  respondentRole: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = AnswerSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", details: parsed.error.issues } },
        { status: 400 }
      );
    }

    const { contributorToken, answers, respondentRole } = parsed.data;
    const numericAnswers: Record<number, number> = {};
    for (const [k, v] of Object.entries(answers)) {
      numericAnswers[parseInt(k, 10)] = v;
    }

    const result = await realityAssessmentService.submitContributorAnswers({
      contributorToken,
      answers: numericAnswers,
      respondentRole,
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
