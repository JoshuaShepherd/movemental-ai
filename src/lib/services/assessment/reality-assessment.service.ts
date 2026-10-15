import { db } from "@/lib/db";
import {
  realityAssessmentSessions,
  realityAssessmentPredictions,
  realityAssessmentResponses,
  realityAssessmentInvites,
} from "@/lib/db/schema";
import { eq, and, sql, desc, or } from "drizzle-orm";
import { randomBytes } from "crypto";

export type Result<T, E = Error> =
  | { ok: true; data: T }
  | { ok: false; error: E };

export function Ok<T>(data: T): Result<T, never> {
  return { ok: true, data };
}

export function Err<E = Error>(error: E): Result<never, E> {
  return { ok: false, error };
}

function generateSecureToken(): string {
  return randomBytes(8).toString("base64url").toLowerCase();
}

export interface StartAssessmentInput {
  organizationName: string;
  organizationType?: string;
  leaderEmail: string;
}

export interface SealPredictionsInput {
  leaderToken: string;
  predictions: Record<number, number>;
}

export interface SubmitAnswersInput {
  contributorToken: string;
  answers: Record<number, number>;
  respondentRole?: string;
}

export interface AssessmentResultsData {
  unlocked: boolean;
  contributorCount: number;
  threshold: number;
  organizationName: string;
  leaderPredictions?: Record<number, number>;
  contributorAverages?: Record<number, number>;
  gaps?: Record<number, number>;
  message: string;
}

export class RealityAssessmentService {
  /**
   * Start a new assessment session and issue leader and contributor tokens.
   */
  async startSession(input: StartAssessmentInput): Promise<
    Result<{
      sessionId: string;
      leaderToken: string;
      contributorToken: string;
      predictUrl: string;
      answerUrl: string;
    }>
  > {
    try {
      const leaderToken = generateSecureToken();
      const contributorToken = generateSecureToken();

      const [session] = await db
        .insert(realityAssessmentSessions)
        .values({
          organization_name: input.organizationName.trim(),
          organization_type: input.organizationType || "Nonprofit",
          leader_email: input.leaderEmail.trim().toLowerCase(),
          leader_token: leaderToken,
          contributor_token: contributorToken,
          status: "in_progress",
        })
        .returning({ id: realityAssessmentSessions.id });

      return Ok({
        sessionId: session!.id,
        leaderToken,
        contributorToken,
        predictUrl: `/assessment/predict?token=${leaderToken}&org=${encodeURIComponent(
          input.organizationName.trim()
        )}`,
        answerUrl: `/assessment/answer?token=${contributorToken}&org=${encodeURIComponent(
          input.organizationName.trim()
        )}`,
      });
    } catch (err) {
      return Err(err instanceof Error ? err : new Error(String(err)));
    }
  }

  /**
   * Seal leader predictions so they cannot be altered or leaked to staff.
   */
  async sealPredictions(input: SealPredictionsInput): Promise<Result<{ sealedAt: string }>> {
    try {
      const [session] = await db
        .select({ id: realityAssessmentSessions.id, status: realityAssessmentSessions.status })
        .from(realityAssessmentSessions)
        .where(eq(realityAssessmentSessions.leader_token, input.leaderToken.trim().toLowerCase()))
        .limit(1);

      if (!session) {
        return Err(new Error("Assessment session not found for provided leader token."));
      }

      const now = new Date().toISOString();

      await db.insert(realityAssessmentPredictions).values({
        session_id: session.id,
        predictions: input.predictions,
        sealed: true,
      });

      await db
        .update(realityAssessmentSessions)
        .set({
          status: "sealed",
          predictions_sealed_at: now,
          updated_at: now,
        })
        .where(eq(realityAssessmentSessions.id, session.id));

      return Ok({ sealedAt: now });
    } catch (err) {
      return Err(err instanceof Error ? err : new Error(String(err)));
    }
  }

  /**
   * Submit anonymous contributor answers.
   */
  async submitContributorAnswers(input: SubmitAnswersInput): Promise<Result<{ submittedAt: string }>> {
    try {
      const [session] = await db
        .select({ id: realityAssessmentSessions.id })
        .from(realityAssessmentSessions)
        .where(eq(realityAssessmentSessions.contributor_token, input.contributorToken.trim().toLowerCase()))
        .limit(1);

      if (!session) {
        return Err(new Error("Assessment session not found for provided contributor token."));
      }

      const now = new Date().toISOString();

      await db.insert(realityAssessmentResponses).values({
        session_id: session.id,
        answers: input.answers,
        respondent_role: input.respondentRole || null,
      });

      return Ok({ submittedAt: now });
    } catch (err) {
      return Err(err instanceof Error ? err : new Error(String(err)));
    }
  }

  /**
   * Look up assessment results. Enforces the 5-contributor threshold rule:
   * Returns unlocked results only when 5 or more responses have been collected.
   */
  async getResults(token: string): Promise<Result<AssessmentResultsData>> {
    try {
      const cleanToken = token.trim().toLowerCase();

      // Find by leader_token or contributor_token
      const [session] = await db
        .select({
          id: realityAssessmentSessions.id,
          organization_name: realityAssessmentSessions.organization_name,
          leader_token: realityAssessmentSessions.leader_token,
          status: realityAssessmentSessions.status,
        })
        .from(realityAssessmentSessions)
        .where(
          or(
            eq(realityAssessmentSessions.leader_token, cleanToken),
            eq(realityAssessmentSessions.contributor_token, cleanToken)
          )
        )
        .limit(1);

      if (!session) {
        return Err(new Error("Assessment session not found."));
      }

      // Count responses
      const responses = await db
        .select({ answers: realityAssessmentResponses.answers })
        .from(realityAssessmentResponses)
        .where(eq(realityAssessmentResponses.session_id, session.id));

      const count = responses.length;
      const threshold = 5;

      if (count < threshold) {
        return Ok({
          unlocked: false,
          contributorCount: count,
          threshold,
          organizationName: session.organization_name,
          message: `${count} of ${threshold} contributors have answered. Results unlock at ${threshold}.`,
        });
      }

      // Unlocked: calculate averages across responses
      const questionSums: Record<number, number> = {};
      const questionCounts: Record<number, number> = {};

      for (const r of responses) {
        const answersObj = (typeof r.answers === "object" && r.answers !== null ? r.answers : {}) as Record<
          string,
          number
        >;
        for (const [qStr, score] of Object.entries(answersObj)) {
          const qId = parseInt(qStr, 10);
          if (!isNaN(qId) && typeof score === "number") {
            questionSums[qId] = (questionSums[qId] || 0) + score;
            questionCounts[qId] = (questionCounts[qId] || 0) + 1;
          }
        }
      }

      const contributorAverages: Record<number, number> = {};
      for (const [qId, sum] of Object.entries(questionSums)) {
        const id = parseInt(qId, 10);
        const c = questionCounts[id] || 1;
        contributorAverages[id] = Math.round((sum / c) * 10) / 10;
      }

      // Fetch leader predictions
      const [predRow] = await db
        .select({ predictions: realityAssessmentPredictions.predictions })
        .from(realityAssessmentPredictions)
        .where(eq(realityAssessmentPredictions.session_id, session.id))
        .limit(1);

      const leaderPredictions = (predRow?.predictions || {}) as Record<number, number>;

      // Compute reality gaps
      const gaps: Record<number, number> = {};
      for (let i = 0; i < 8; i++) {
        const leaderScore = leaderPredictions[i] ?? 3;
        const avgScore = contributorAverages[i] ?? 3;
        gaps[i] = Math.round(Math.abs(leaderScore - avgScore) * 10) / 10;
      }

      return Ok({
        unlocked: true,
        contributorCount: count,
        threshold,
        organizationName: session.organization_name,
        leaderPredictions,
        contributorAverages,
        gaps,
        message: `Results unlocked with ${count} contributor responses.`,
      });
    } catch (err) {
      return Err(err instanceof Error ? err : new Error(String(err)));
    }
  }
}

export const realityAssessmentService = new RealityAssessmentService();
