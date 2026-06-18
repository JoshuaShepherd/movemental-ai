#!/usr/bin/env tsx
/**
 * Query Agent Room transcripts (internal / operator use).
 *
 * Usage:
 *   pnpm tsx scripts/query-room-transcripts.ts --session-id <id>
 *   pnpm tsx scripts/query-room-transcripts.ts --limit 20
 */
import { desc, eq } from "drizzle-orm";

import { db } from "../src/lib/db";
import { agentRoomTranscripts } from "../src/lib/db/schema";
import { getTenantOrgId } from "../src/lib/tenant";

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

async function main() {
  const sessionId = arg("--session-id");
  const limit = Number(arg("--limit") ?? "50");
  const orgId = getTenantOrgId();
  if (!orgId) {
    console.error("TENANT_ORG_ID is required");
    process.exit(1);
  }

  const rows = await db
    .select()
    .from(agentRoomTranscripts)
    .where(
      sessionId
        ? eq(agentRoomTranscripts.session_id, sessionId)
        : eq(agentRoomTranscripts.organization_id, orgId),
    )
    .orderBy(desc(agentRoomTranscripts.created_at))
    .limit(limit);

  console.log(JSON.stringify(rows, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
