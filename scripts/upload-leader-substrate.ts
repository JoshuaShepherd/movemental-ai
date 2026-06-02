/**
 * Upload movement-leader COLLATED substrate(s) into the shared Supabase table
 * `movement_leader_corpus_data` — fully, without truncation.
 *
 *   pnpm leader:upload-substrate <slug>     # one leader
 *   pnpm leader:upload-substrate all         # every _collated/*_RESEARCH_COLLATED.md
 *   pnpm leader:upload-substrate <slug> --no-ensure-schema   # skip the idempotent DDL
 *   pnpm leader:upload-substrate all --dry-run                # parse + report, no writes
 *
 * Requires DATABASE_URL (.env.local). This is the staff-write path — the
 * connection string must belong to a role allowed to write the table (service
 * role / direct DB owner), consistent with the table's staff-only INSERT/UPDATE RLS.
 *
 * New leaders: if a slug has no `movement_leaders` row, this script STOPS and
 * tells you to provision the leader first (movemental-tenant-provision). It will
 * not create auth users / orgs — that is the provisioning skill's job.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { config as loadEnv } from "dotenv";
import postgres from "postgres";

import {
  ENSURE_SUBSTRATE_COLUMNS_SQL,
  resolveSubstratePaths,
  runSubstrateCorpusSync,
  splitSubstrateSections,
} from "../src/lib/movement-leader/substrate-corpus-sync";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");
loadEnv({ path: path.join(REPO_ROOT, ".env.local") });

const RESEARCH_ROOT = path.join(REPO_ROOT, "docs", "movement_leader_research");
const COLLATED_DIR = path.join(RESEARCH_ROOT, "_collated");

function fileSlug(fileName: string): string {
  return fileName.replace(/_RESEARCH_COLLATED\.md$/, "").toLowerCase().replace(/_/g, "-");
}

function collatedSlugs(): string[] {
  if (!fs.existsSync(COLLATED_DIR)) return [];
  return fs
    .readdirSync(COLLATED_DIR)
    .filter((f) => f.endsWith("_RESEARCH_COLLATED.md"))
    .map(fileSlug)
    .sort();
}

async function main() {
  const args = process.argv.slice(2);
  const flags = new Set(args.filter((a) => a.startsWith("--")));
  const positional = args.filter((a) => !a.startsWith("--"));
  const target = positional[0];
  const ensureSchema = !flags.has("--no-ensure-schema");
  const dryRun = flags.has("--dry-run");

  if (!target) {
    console.error("Usage: pnpm leader:upload-substrate <slug|all> [--no-ensure-schema] [--dry-run]");
    process.exit(1);
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL is not set. Run `vercel env pull .env.local` or set it in .env.local.");
    process.exit(1);
  }

  const slugs = target === "all" ? collatedSlugs() : [target];
  if (slugs.length === 0) {
    console.error(`No substrates found in ${path.relative(REPO_ROOT, COLLATED_DIR)}/`);
    process.exit(1);
  }

  if (dryRun) {
    for (const slug of slugs) {
      const { mdPath, manifestPath } = resolveSubstratePaths(RESEARCH_ROOT, slug);
      if (!mdPath) {
        console.log(`✗ ${slug}: no collated substrate found`);
        continue;
      }
      const md = fs.readFileSync(mdPath, "utf8");
      const { sections } = splitSubstrateSections(md);
      console.log(
        `• ${slug}: ${Buffer.byteLength(md, "utf8")} bytes, ${Object.keys(sections).length} sections` +
          `${manifestPath ? ", +manifest" : ""}  [dry-run]`,
      );
    }
    return;
  }

  const sql = postgres(connectionString, { max: 1, prepare: false });
  try {
    if (ensureSchema) {
      await sql.unsafe(ENSURE_SUBSTRATE_COLUMNS_SQL);
      console.log("✓ ensured substrate columns (substrate_md, substrate_sections, manifest)");
    }

    let ok = 0;
    const blocked: string[] = [];
    for (const slug of slugs) {
      try {
        const r = await runSubstrateCorpusSync(sql, { corpusSlug: slug, repoRoot: REPO_ROOT });
        ok++;
        console.log(
          `✓ ${r.corpus_slug}: ${r.substrate_bytes} bytes, ${r.sections} sections, ` +
            `${r.frameworks} frameworks → corpus_data (${r.source_version}, no truncation)`,
        );
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        if (/No movement_leaders row matched/.test(msg)) {
          blocked.push(slug);
          console.warn(`⚠ ${slug}: NOT PROVISIONED — run movemental-tenant-provision for "${slug}" first.`);
        } else {
          console.error(`✗ ${slug}: ${msg}`);
        }
      }
    }

    console.log(`\nDone: ${ok}/${slugs.length} uploaded.${blocked.length ? `  Needs provisioning: ${blocked.join(", ")}` : ""}`);
    if (blocked.length) process.exitCode = 2;
  } finally {
    await sql.end({ timeout: 10 });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
