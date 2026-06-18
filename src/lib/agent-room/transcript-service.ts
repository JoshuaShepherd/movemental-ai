/**
 * Agent Room transcript read path — restores durable rows written by the engine.
 *
 * Retention: rows older than 90 days may be purged by a future operator job;
 * reads always cap at {@link TRANSCRIPT_TURN_CAP} turns for client restore.
 */
import { and, asc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { agentRoomTranscripts } from "@/lib/db/schema";
import type { ThreadTurn } from "@/lib/agent-room/thread";

/** Max turns restored into the client thread (matches proxy history cap). */
export const TRANSCRIPT_TURN_CAP = 50;

export type TranscriptRow = {
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

export async function getTranscriptForSession(
  organizationId: string,
  sessionId: string,
): Promise<TranscriptRow[]> {
  const rows = await db
    .select({
      role: agentRoomTranscripts.role,
      content: agentRoomTranscripts.message_text,
      createdAt: agentRoomTranscripts.created_at,
    })
    .from(agentRoomTranscripts)
    .where(
      and(
        eq(agentRoomTranscripts.organization_id, organizationId),
        eq(agentRoomTranscripts.session_id, sessionId),
      ),
    )
    .orderBy(asc(agentRoomTranscripts.created_at))
    .limit(TRANSCRIPT_TURN_CAP * 2);

  return rows
    .filter((r) => r.role === "user" || r.role === "assistant")
    .map((r) => ({
      role: r.role as "user" | "assistant",
      content: r.content,
      createdAt: r.createdAt,
    }));
}

export function transcriptRowsToThread(rows: TranscriptRow[]): ThreadTurn[] {
  return rows.map((r) => ({ role: r.role, content: r.content }));
}
