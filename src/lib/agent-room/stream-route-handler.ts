import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

import { env } from "@/lib/env";
import { agentRoomClientBodySchema } from "@/lib/agent-room/proxy-schema";

const DEFAULT_AGENT_SLUG = "room-host";

/**
 * SSE proxy handler for Agent Room turns.
 *
 * Public path is `/api/agent-room/turn` (not `…/stream`) — Cloudflare in front of
 * www.movemental.ai blocks POST to URL paths containing `stream`.
 */
export async function handleAgentRoomStreamPost(request: NextRequest) {
  const base = env.AI_AGENTS_BASE_URL?.replace(/\/$/, "");
  const secret = env.AI_AGENTS_SERVICE_SECRET;
  const tenantOrgId = env.AI_AGENTS_TENANT_ORG_ID;
  if (!base || !secret || !tenantOrgId) {
    return NextResponse.json(
      { error: "Agent Room engine is not configured" },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 422 });
  }

  const parsed = agentRoomClientBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const upstreamBody = {
    tenantOrgId,
    userId: parsed.data.anonId?.trim() || `anon-${randomUUID()}`,
    agentSlug: parsed.data.agentSlug?.trim() || DEFAULT_AGENT_SLUG,
    message: parsed.data.message,
    sessionId: parsed.data.sessionId,
    history: parsed.data.history,
    phase: parsed.data.phase,
    roomContext: parsed.data.roomContext,
  };

  let upstream: Response;
  try {
    upstream = await fetch(`${base}/api/agents/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`,
        "X-Tenant-Org-Id": tenantOrgId,
      },
      body: JSON.stringify(upstreamBody),
      signal: request.signal,
    });
  } catch {
    return NextResponse.json({ error: "Agent Room engine unreachable" }, { status: 502 });
  }

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => "");
    return NextResponse.json(
      { error: text || upstream.statusText || "Upstream error" },
      { status: upstream.status >= 400 ? upstream.status : 502 },
    );
  }

  return new NextResponse(upstream.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
