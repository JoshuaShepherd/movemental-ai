/**
 * Walks docs/movement_leader_research/<slug>/ and merges markdown into
 * `movement_leaders.movement_leader_data.corpus` for rows that already exist.
 *
 * Requires DATABASE_URL (.env.local). Does not insert new leader rows (no email in filesystem).
 *
 * Run: pnpm leader:sync-corpus
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { config as loadEnv } from "dotenv";
import { eq } from "drizzle-orm";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
loadEnv({ path: path.join(__dirname, "..", ".env.local") });

import { db } from "../src/lib/db";
import { movementLeaders } from "../src/lib/db/schema";
import type { MovementLeaderDataJson } from "../src/lib/movement-leaders/types";

const REPO_ROOT = path.join(__dirname, "..");
const RESEARCH_ROOT = path.join(REPO_ROOT, "docs", "movement_leader_research");

const SKIP_DIRS = new Set([
  "network",
  "profiles",
  "audience",
  "reflected-understanding",
  "tam-search",
  "quadw-foundation",
]);

const MAX_FILE_BYTES = 120_000;

function collectMarkdownFiles(rootDir: string): Record<string, string> {
  const out: Record<string, string> = {};

  function walk(abs: string) {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(abs, { withFileTypes: true });
    } catch {
      return;
    }
    for (const ent of entries) {
      if (ent.name.startsWith(".")) continue;
      const full = path.join(abs, ent.name);
      if (ent.isDirectory()) {
        walk(full);
        continue;
      }
      if (!ent.isFile()) continue;
      if (!ent.name.endsWith(".md") && !ent.name.endsWith(".mdx")) continue;
      const rel = path.relative(rootDir, full).replace(/\\/g, "/");
      let body = fs.readFileSync(full, "utf8");
      if (body.length > MAX_FILE_BYTES) {
        body = `${body.slice(0, MAX_FILE_BYTES)}\n\n… [truncated by sync-leader-corpus]`;
      }
      out[rel] = body;
    }
  }

  walk(rootDir);
  return out;
}

async function main() {
  let dirNames: string[];
  try {
    dirNames = fs
      .readdirSync(RESEARCH_ROOT, { withFileTypes: true })
      .filter((e) => e.isDirectory() && !SKIP_DIRS.has(e.name))
      .map((e) => e.name);
  } catch (e) {
    console.error("Cannot read research root:", RESEARCH_ROOT, e);
    process.exit(1);
    return;
  }

  let updated = 0;
  let skippedNoRow = 0;
  let failed = 0;

  for (const slug of dirNames.sort()) {
    const dir = path.join(RESEARCH_ROOT, slug);
    try {
      const [row] = await db
        .select()
        .from(movementLeaders)
        .where(eq(movementLeaders.slug, slug))
        .limit(1);

      if (!row) {
        skippedNoRow++;
        console.warn(`[skip] No DB row for slug "${slug}"`);
        continue;
      }

      const files = collectMarkdownFiles(dir);
      const prev = (row.movement_leader_data ?? {}) as MovementLeaderDataJson;
      const next: MovementLeaderDataJson = {
        ...prev,
        corpus: {
          synced_at: new Date().toISOString(),
          source_slug: slug,
          files,
        },
      };

      await db
        .update(movementLeaders)
        .set({
          movement_leader_data: next,
          updated_at: new Date().toISOString(),
        })
        .where(eq(movementLeaders.id, row.id));

      updated++;
      console.log(`[ok] ${slug} — ${Object.keys(files).length} markdown files`);
    } catch (err) {
      failed++;
      console.error(`[err] ${slug}`, err);
    }
  }

  console.log(
    `\nDone. updated=${updated} skipped_no_row=${skippedNoRow} failed=${failed} (tables missing → failed updates are expected until migrations run).`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
