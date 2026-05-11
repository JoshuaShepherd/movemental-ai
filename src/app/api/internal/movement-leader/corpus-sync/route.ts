import postgres from "postgres";

import { runDashboardCorpusSync } from "@/lib/movement-leader/dashboard-corpus-sync";

export const runtime = "nodejs";

function unauthorized() {
  return Response.json({ error: { message: "Unauthorized." } }, { status: 401 });
}

export async function POST(request: Request) {
  const expected = process.env.MOVEMENT_LEADER_CORPUS_SYNC_SECRET;
  if (!expected) {
    return Response.json(
      { error: { message: "Server is not configured for corpus sync (missing secret)." } },
      { status: 503 },
    );
  }
  const sent = request.headers.get("x-movement-leader-corpus-sync-secret");
  if (!sent || sent !== expected) {
    return unauthorized();
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return Response.json({ error: { message: "DATABASE_URL is not set." } }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: { message: "Invalid JSON body." } }, { status: 400 });
  }

  const movementLeaderId = typeof body.movementLeaderId === "string" ? body.movementLeaderId : undefined;
  const applicationId = typeof body.applicationId === "string" ? body.applicationId : undefined;
  const corpusSlug = typeof body.corpusSlug === "string" ? body.corpusSlug : undefined;
  const skipGeneration = body.skipGeneration === true;

  if (!movementLeaderId && !applicationId && !corpusSlug) {
    return Response.json(
      { error: { message: "Provide movementLeaderId, applicationId, or corpusSlug." } },
      { status: 400 },
    );
  }

  const sql = postgres(connectionString, { max: 1, prepare: false });
  try {
    const result = await runDashboardCorpusSync(sql, {
      movementLeaderId,
      applicationId,
      corpusSlug,
      skipGeneration,
    });
    return Response.json({ data: result });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Corpus sync failed.";
    return Response.json({ error: { message } }, { status: 500 });
  } finally {
    await sql.end({ timeout: 10 });
  }
}
