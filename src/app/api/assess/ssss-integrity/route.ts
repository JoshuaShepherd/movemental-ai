import { NextRequest, NextResponse } from "next/server";

import { persistSsssResult, recomputeOrgSynthesis, resolveProfileIdByEmail } from "@/lib/ai-reality/persist";
import { analyticsEvents } from "@/lib/db/schema";
import { db } from "@/lib/db";
import {
  AUDIENCE_CONTEXT_OPTIONS,
  computeSsssIntegrityResult,
  LIKERT_LABELS,
  SSSS_INTEGRITY_ITEMS,
  SSSS_INTEGRITY_VERSION,
  SsssIntegritySubmitSchema,
} from "@/lib/ssss-integrity-assessment";
import { getOptionalAuthUser } from "@/lib/supabase/server";
import { getTenantOrgId } from "@/lib/tenant";

const EVENT_TYPE = "ssss_integrity_assessment" as const;
const EVENT_CATEGORY = "assessment" as const;
const EVENT_ACTION = "completed" as const;

/**
 * Movemental Path — integrity diagnostic. The single live assessment.
 * GET — item bank, Likert labels, and audience options for clients that prefer fetching.
 * POST — validate, compute result; optional analytics when TENANT_ORG_ID is set.
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      version: SSSS_INTEGRITY_VERSION,
      likertLabels: LIKERT_LABELS,
      audienceOptions: AUDIENCE_CONTEXT_OPTIONS,
      items: SSSS_INTEGRITY_ITEMS.map(({ id, stage, category, weight, prompt }) => ({
        id,
        stage,
        category,
        weight,
        prompt: prompt.replace(/\*\*/g, ""),
      })),
    },
  });
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: { code: "INVALID_JSON", message: "Request body must be valid JSON" } },
      { status: 400 },
    );
  }

  const parsed = SsssIntegritySubmitSchema.safeParse(body);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? "Validation failed";
    return NextResponse.json({ error: { code: "VALIDATION_ERROR", message: msg } }, { status: 400 });
  }

  let result;
  try {
    result = computeSsssIntegrityResult(parsed.data.scores);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Computation failed";
    return NextResponse.json({ error: { code: "COMPUTE_ERROR", message } }, { status: 400 });
  }

  const orgId = getTenantOrgId();
  if (orgId) {
    // Analytics event — unchanged, preserved for existing dashboards.
    try {
      await db.insert(analyticsEvents).values({
        event_type: EVENT_TYPE,
        event_category: EVENT_CATEGORY,
        event_action: EVENT_ACTION,
        event_label: result.dominantGapStage,
        metadata: {
          organization_id: orgId,
          assessment_version: SSSS_INTEGRITY_VERSION,
          normalized_overall_percent: result.normalizedOverallPercent,
          dominant_gap_stage: result.dominantGapStage,
          likely_illusion: result.likelyIllusion,
          illusion_flags: result.illusionFlags,
          audience: parsed.data.audience ?? null,
          email: parsed.data.email || null,
          client_session_id: parsed.data.clientSessionId ?? null,
        },
      });
    } catch (analyticsErr) {
      console.error("ssss_integrity analytics insert skipped:", analyticsErr);
    }

    // Unified AI Reality record — the authenticated leader's submission. Binds
    // to identity (when a profile exists) and triggers the org synthesis so a
    // provisional single-leader dashboard is available immediately.
    try {
      const { user } = await getOptionalAuthUser();
      const email = parsed.data.email?.trim() || user?.email || null;
      const userId = user?.email ? await resolveProfileIdByEmail(user.email) : null;
      await persistSsssResult({
        organizationId: orgId,
        userId,
        email,
        audience: parsed.data.audience ?? null,
        sessionId: parsed.data.clientSessionId ?? null,
        result,
      });
      await recomputeOrgSynthesis(orgId);
    } catch (persistErr) {
      console.error("ssss_integrity unified persist skipped:", persistErr);
    }
  }

  return NextResponse.json(
    {
      success: true,
      data: {
        result,
      },
    },
    { status: 201 },
  );
}
