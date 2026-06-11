import type { NextRequest } from "next/server";

import { handleAgentRoomStreamPost } from "@/lib/agent-room/stream-route-handler";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  return handleAgentRoomStreamPost(request);
}
