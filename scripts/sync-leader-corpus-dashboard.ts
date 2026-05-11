/**
 * Phase 06 — upsert `movement_leader_corpus_data` (+ optional Anthropic framings)
 * for the shared Supabase used by movemental-dashboard.
 *
 * Usage:
 *   pnpm leader:sync-corpus-dashboard -- --slug=alan-hirsch
 *   pnpm leader:sync-corpus-dashboard -- --movement-leader-id=<uuid>
 *   pnpm leader:sync-corpus-dashboard -- --application-id=<uuid>
 *   pnpm leader:sync-corpus-dashboard -- --all-active [--no-ai]
 *
 * Requires DATABASE_URL in .env.local. Optional ANTHROPIC_API_KEY for framings.
 */

import path from "node:path";
import { fileURLToPath } from "node:url";

import { config as loadEnv } from "dotenv";
import postgres from "postgres";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
loadEnv({ path: path.join(__dirname, "..", ".env.local") });

import { runDashboardCorpusSync } from "../src/lib/movement-leader/dashboard-corpus-sync";

function longFlag(name: string): string | undefined {
  const prefix = `${name}=`;
  const hit = process.argv.find((a) => a.startsWith(prefix));
  if (hit) return hit.slice(prefix.length);
  const idx = process.argv.indexOf(name);
  if (idx !== -1) {
    const next = process.argv[idx + 1];
    if (next && !next.startsWith("--")) return next;
  }
  return undefined;
}

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  const slug = longFlag("--slug");
  const movementLeaderId = longFlag("--movement-leader-id");
  const applicationId = longFlag("--application-id");
  const allActive = process.argv.includes("--all-active");
  const noAi = process.argv.includes("--no-ai");

  const sql = postgres(connectionString, { max: 1, prepare: false });

  try {
    if (allActive) {
      const leaders = await sql<{ id: string }[]>`
        select id from movement_leaders where status = 'active'
      `;
      console.log(`Syncing ${leaders.length} active leaders…`);
      for (const row of leaders) {
        const r = await runDashboardCorpusSync(sql, {
          movementLeaderId: row.id,
          skipGeneration: noAi || !process.env.ANTHROPIC_API_KEY,
        });
        console.log("[ok]", r.corpus_slug, "files=", r.files_read, "generated=", r.generated_sections);
      }
      return;
    }

    const result = await runDashboardCorpusSync(sql, {
      corpusSlug: slug,
      movementLeaderId,
      applicationId,
      skipGeneration: noAi || !process.env.ANTHROPIC_API_KEY,
    });
    console.log(JSON.stringify(result, null, 2));
  } finally {
    await sql.end({ timeout: 10 });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
