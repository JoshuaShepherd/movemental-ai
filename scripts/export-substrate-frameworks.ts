#!/usr/bin/env tsx
/**
 * Export frameworks[] from Supabase into content/frameworks.md for substrate leaders.
 * Requires DATABASE_URL in .env.local (movemental-ai or visual-editor).
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { config as loadEnv } from "dotenv";
import postgres from "postgres";

loadEnv({ path: ".env.local" });

import { ensureDir, slugDir, SUBSTRATE_SLUGS } from "./research-tree-paths";

type FrameworkRow = { name: string; markdown: string };

function frameworksToMarkdown(slug: string, items: FrameworkRow[]): string {
  const name = slug
    .split("-")
    .map((p) => (p === "jr" ? "JR" : p.charAt(0).toUpperCase() + p.slice(1)))
    .join(" ");

  const lines = [
    `# Frameworks: ${name}`,
    "",
    `_Exported from movement_leader_corpus_data.frameworks[] — on-disk SSOT for Author Profile._`,
    "",
  ];

  for (const item of items) {
    lines.push(`### ${item.name}`, "", item.markdown.trim(), "", "---", "");
  }

  return lines.join("\n").trim() + "\n";
}

async function main(): Promise<void> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL required");
    process.exit(1);
  }

  const sql = postgres(url, { max: 1 });

  for (const slug of SUBSTRATE_SLUGS) {
    const rows = await sql<
      Array<{ frameworks: FrameworkRow[] | null }>
    >`
      SELECT mlcd.frameworks
      FROM movement_leaders ml
      JOIN movement_leader_corpus_data mlcd ON mlcd.movement_leader_id = ml.id
      WHERE ml.slug = ${slug}
    `;

    const frameworks = rows[0]?.frameworks ?? [];
    if (!frameworks.length) {
      console.log(`[${slug}] no frameworks in DB — skip`);
      continue;
    }

    const dest = join(slugDir(slug), "content/frameworks.md");
    ensureDir(join(dest, ".."));
    writeFileSync(dest, frameworksToMarkdown(slug, frameworks), "utf8");
    console.log(`[${slug}] wrote ${frameworks.length} frameworks → content/frameworks.md`);
  }

  await sql.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
