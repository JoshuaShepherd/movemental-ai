import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";
import { integrityDiagnosticSubmissions } from "@/lib/db/schema";
import {
  notifyIntegrityDiagnosticInbox,
  sendIntegrityDiagnosticAck,
} from "@/lib/email/integrity-diagnostic-notifications";
import {
  DIMENSIONS,
  INTEGRITY_DIAGNOSTIC_VERSION,
  TOTAL_QUESTIONS,
  type DimensionId,
} from "@/lib/integrity-diagnostic/questions";
import { createSlidingWindowRateLimiter } from "@/lib/rate-limit-in-memory";
import { getTenantOrgId } from "@/lib/tenant";

const integrityRateLimitIp = createSlidingWindowRateLimiter(3, 60 * 60 * 1000);

const DIMENSION_IDS = DIMENSIONS.map((d) => d.id) as [DimensionId, ...DimensionId[]];

const FollowUpsSchema = z
  .record(z.enum(DIMENSION_IDS), z.string().max(2000))
  .optional();

const IntegrityDiagnosticSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Valid email is required"),
  organizationName: z.string().max(200).optional(),
  role: z.string().max(200).optional(),
  /** Twenty-two answers in question order; each is the chosen option index 0–3. */
  answers: z
    .array(z.number().int().min(0).max(3))
    .length(TOTAL_QUESTIONS, `Expected ${TOTAL_QUESTIONS} answers, in order`),
  followUps: FollowUpsSchema,
  closingNote: z.string().max(5000).optional(),
});

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (!integrityRateLimitIp(ip)) {
    return NextResponse.json(
      {
        error: {
          code: "RATE_LIMITED",
          message: "Too many submissions. Please try again later.",
        },
      },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: { code: "INVALID_JSON", message: "Request body must be valid JSON" },
      },
      { status: 400 },
    );
  }

  const parsed = IntegrityDiagnosticSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: parsed.error.issues[0]?.message ?? "Validation failed",
        },
      },
      { status: 400 },
    );
  }

  const orgId = getTenantOrgId();
  if (!orgId) {
    return NextResponse.json(
      {
        error: {
          code: "TENANT_NOT_CONFIGURED",
          message:
            "Set TENANT_ORG_ID to your Movemental organization UUID so diagnostics can be stored.",
        },
      },
      { status: 503 },
    );
  }

  const { name, email, organizationName, role, answers, followUps, closingNote } =
    parsed.data;

  try {
    const [row] = await db
      .insert(integrityDiagnosticSubmissions)
      .values({
        organization_id: orgId,
        name,
        email,
        organization_name: organizationName ?? null,
        role: role ?? null,
        answers,
        follow_ups: followUps ?? null,
        closing_note: closingNote ?? null,
        diagnostic_version: INTEGRITY_DIAGNOSTIC_VERSION,
      })
      .returning({ id: integrityDiagnosticSubmissions.id });

    if (row?.id) {
      const payload = {
        submissionId: row.id,
        name,
        email,
        organizationName,
        role,
        answers,
        followUps,
        closingNote,
      };
      try {
        await Promise.all([
          notifyIntegrityDiagnosticInbox(payload),
          sendIntegrityDiagnosticAck({
            submissionId: row.id,
            name,
            email,
          }),
        ]);
      } catch (emailErr) {
        console.error(
          "Integrity diagnostic email side-effects failed (submission saved):",
          emailErr,
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Integrity diagnostic submission failed:", err);
    return NextResponse.json(
      {
        error: { code: "SERVER_ERROR", message: "Something went wrong. Please try again." },
      },
      { status: 500 },
    );
  }
}
