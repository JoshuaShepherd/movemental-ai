import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import {
  getTranscriptForSession,
  transcriptRowsToThread,
} from "@/lib/agent-room/transcript-service";
import { getTenantOrgId } from "@/lib/tenant";

const QuerySchema = z.object({
  sessionId: z.string().min(1).max(200),
});

/**
 * GET /api/agent-room/transcript?sessionId=
 *
 * Restores tenant-scoped conversation history for a returning anonymous session.
 * Rows are written by the engine on turn completion; this route never stores secrets.
 */
export async function GET(request: NextRequest) {
  const orgId = getTenantOrgId();
  if (!orgId) {
    return NextResponse.json({ error: "Tenant not configured" }, { status: 503 });
  }

  const parsed = QuerySchema.safeParse({
    sessionId: request.nextUrl.searchParams.get("sessionId") ?? undefined,
  });
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const rows = await getTranscriptForSession(orgId, parsed.data.sessionId);
  return NextResponse.json({
    sessionId: parsed.data.sessionId,
    turns: transcriptRowsToThread(rows),
    count: rows.length,
  });
}
