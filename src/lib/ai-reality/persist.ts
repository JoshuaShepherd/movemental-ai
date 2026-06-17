import "server-only";

import { and, desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { aiRealityOrgResults, aiRealityResults, userProfiles } from "@/lib/db/schema";
import type { SsssIllusionId, SsssIntegrityResult } from "@/lib/ssss-integrity-assessment";
import type { MapRead } from "@/lib/agent-room/data/map-q";

import { aggregateOrg } from "./aggregate";
import { countActiveInvites } from "./invite.server";
import { ssssStageToPublic } from "./stage-mapper";
import type { AiRealityOrgPayload, ParticipantScore } from "./types";

/**
 * Resolve the user_profiles PK for an OTP-authenticated email. Returns null when
 * no profile row exists yet (fresh signups) so callers can store user_id = null
 * rather than violate the foreign key.
 */
export async function resolveProfileIdByEmail(email: string): Promise<string | null> {
  const norm = email.toLowerCase().trim();
  if (!norm) return null;
  const [row] = await db
    .select({ id: userProfiles.id })
    .from(userProfiles)
    .where(eq(userProfiles.email, norm))
    .limit(1);
  return row?.id ?? null;
}

/** Persist one scored SSSS submission into the unified record. */
export async function persistSsssResult(input: {
  organizationId: string;
  userId?: string | null;
  inviteId?: string | null;
  email?: string | null;
  displayName?: string | null;
  audience?: string | null;
  anon?: boolean;
  sessionId?: string | null;
  anonId?: string | null;
  result: SsssIntegrityResult;
}): Promise<{ id: string }> {
  const r = input.result;
  const [row] = await db
    .insert(aiRealityResults)
    .values({
      organization_id: input.organizationId,
      user_id: input.userId ?? null,
      invite_id: input.inviteId ?? null,
      instrument: "ssss",
      email: input.email?.toLowerCase().trim() || null,
      display_name: input.displayName?.trim() || null,
      anon_submission: input.anon ?? false,
      session_id: input.sessionId ?? null,
      anon_id: input.anonId ?? null,
      audience: input.audience ?? null,
      overall_percent: r.normalizedOverallPercent,
      stage_safety: r.stagePercents.Safety,
      stage_sandbox: r.stagePercents.Sandbox,
      stage_skills: r.stagePercents.Training,
      stage_solutions: r.stagePercents.Tech,
      dominant_gap: ssssStageToPublic(r.dominantGapStage),
      illusion_flags: r.illusionFlags,
      result_payload: r,
    })
    .returning({ id: aiRealityResults.id });
  return { id: row!.id };
}

/** Persist a 6-question map readback into the unified record. */
export async function persistMapResult(input: {
  organizationId: string;
  userId?: string | null;
  email?: string | null;
  sessionId?: string | null;
  anonId?: string | null;
  mapRead: MapRead;
}): Promise<{ id: string }> {
  const [row] = await db
    .insert(aiRealityResults)
    .values({
      organization_id: input.organizationId,
      user_id: input.userId ?? null,
      instrument: "map",
      email: input.email?.toLowerCase().trim() || null,
      session_id: input.sessionId ?? null,
      anon_id: input.anonId ?? null,
      result_payload: input.mapRead,
    })
    .returning({ id: aiRealityResults.id });
  return { id: row!.id };
}

/**
 * After OTP auth, link any pre-auth map rows (written at capture time with an
 * email but no user_id) to the now-authenticated identity. Additive update only.
 */
export async function backfillMapIdentity(input: {
  organizationId: string;
  email: string;
  userId: string;
}): Promise<number> {
  const now = new Date().toISOString();
  const updated = await db
    .update(aiRealityResults)
    .set({ user_id: input.userId, updated_at: now })
    .where(
      and(
        eq(aiRealityResults.organization_id, input.organizationId),
        eq(aiRealityResults.email, input.email.toLowerCase().trim()),
        eq(aiRealityResults.instrument, "map"),
      ),
    )
    .returning({ id: aiRealityResults.id });
  return updated.length;
}

function toParticipant(row: {
  stage_safety: number | null;
  stage_sandbox: number | null;
  stage_skills: number | null;
  stage_solutions: number | null;
  overall_percent: number | null;
  dominant_gap: string | null;
  illusion_flags: unknown;
}): ParticipantScore {
  return {
    stagePercents: {
      Safety: row.stage_safety ?? 0,
      Sandbox: row.stage_sandbox ?? 0,
      Training: row.stage_skills ?? 0,
      Tech: row.stage_solutions ?? 0,
    },
    overallPercent: row.overall_percent ?? 0,
    dominantGapStage: ssssStageToPublic(row.dominant_gap ?? "Safety"),
    illusionFlags: Array.isArray(row.illusion_flags)
      ? (row.illusion_flags as SsssIllusionId[])
      : [],
  };
}

/**
 * Recompute the org synthesis from every SSSS submission for the org (leader +
 * teammates) plus the most recent map gaps, and upsert the single
 * ai_reality_org_results row the dashboard reads. Returns the fresh payload.
 */
export async function recomputeOrgSynthesis(
  organizationId: string,
): Promise<AiRealityOrgPayload> {
  const ssssRows = await db
    .select({
      stage_safety: aiRealityResults.stage_safety,
      stage_sandbox: aiRealityResults.stage_sandbox,
      stage_skills: aiRealityResults.stage_skills,
      stage_solutions: aiRealityResults.stage_solutions,
      overall_percent: aiRealityResults.overall_percent,
      dominant_gap: aiRealityResults.dominant_gap,
      illusion_flags: aiRealityResults.illusion_flags,
    })
    .from(aiRealityResults)
    .where(
      and(
        eq(aiRealityResults.organization_id, organizationId),
        eq(aiRealityResults.instrument, "ssss"),
      ),
    );

  const participants = ssssRows.map(toParticipant);

  // Most recent map readback (prefer identity-linked) for leader context.
  const [mapRow] = await db
    .select({ result_payload: aiRealityResults.result_payload })
    .from(aiRealityResults)
    .where(
      and(
        eq(aiRealityResults.organization_id, organizationId),
        eq(aiRealityResults.instrument, "map"),
      ),
    )
    .orderBy(desc(aiRealityResults.created_at))
    .limit(1);

  const leaderMapGaps =
    mapRow && mapRow.result_payload && typeof mapRow.result_payload === "object"
      ? ((mapRow.result_payload as MapRead).gaps ?? null)
      : null;

  const invitedCount = await countActiveInvites(organizationId);

  const payload = aggregateOrg(participants, {
    invitedCount: Math.max(invitedCount, participants.length),
    leaderMapGaps,
  });

  const now = new Date().toISOString();
  await db
    .insert(aiRealityOrgResults)
    .values({
      organization_id: organizationId,
      result_payload: payload,
      invited_count: payload.invitedCount,
      responded_count: payload.respondedCount,
      updated_at: now,
    })
    .onConflictDoUpdate({
      target: aiRealityOrgResults.organization_id,
      set: {
        result_payload: payload,
        invited_count: payload.invitedCount,
        responded_count: payload.respondedCount,
        updated_at: now,
      },
    });

  return payload;
}

/** Read the stored org dashboard payload (null when nobody has submitted SSSS). */
export async function getOrgDashboardPayload(
  organizationId: string,
): Promise<AiRealityOrgPayload | null> {
  const [row] = await db
    .select({ result_payload: aiRealityOrgResults.result_payload })
    .from(aiRealityOrgResults)
    .where(eq(aiRealityOrgResults.organization_id, organizationId))
    .limit(1);
  return row ? (row.result_payload as AiRealityOrgPayload) : null;
}
