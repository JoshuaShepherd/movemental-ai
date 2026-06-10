#!/usr/bin/env tsx

/**
 * Validates frontmatter on every publishable article under `docs/articles/`
 * against the canonical Zod contract in `src/lib/articles-schema.ts`.
 *
 * Runs two modes:
 *   • `pnpm articles:check`          — reports every invalid file; exit non-zero on any error
 *   • `pnpm articles:check --warn`   — prints issues but exits zero (used during the
 *                                     phased frontmatter migration so CI doesn't block
 *                                     while articles are still being annotated)
 */

import fs from "node:fs";
import path from "node:path";

import { articleFrontmatterSchema } from "../src/lib/articles-schema";

const ARTICLES_DIR = path.join(process.cwd(), "docs", "articles");

const EXCLUDED_SLUGS = new Set([
  "00_ai-brief-why-movemental",
  "01_ai-vision-overview",
  "01_copy-deck-why-movemental",
  "02_individual-site-presentation",
  "03_platform-presentation",
  "07-ai-adoption-for-nonprofits-course-outline",
  "07-author-onboarding-course-outline",
  "08-ai-powered-fundraising-system-4-week-course-outline",
  "ai-governance-ethics-course-outline",
  "COURSE_STRATEGY",
  "HOW_MOVEMENTAL_USES_AI",
  "HOW_MOVEMENTAL_WORKS_VIDEO_SCRIPT",
  "LINKING-STRATEGY-EEAT-GEO-PLAYBOOK",
  "Thought Leader Platform Research Report",
  "UNIFORM-AND-DISTINCT-PLATFORM-GUIDE",
  "VIDEO_SCRIPT_MOVEMENTAL_COURSES_INTRO",
  "activation-workflow",
  "formation-workflow",
  "multiplication-workflow",
  "ai-integration-workflow",
  "nonprofit-content-build",
  "nonprofit-discovery-lab",
  "nonprofit-foundation-build",
  "nonprofit-fundraising-build",
  "nonprofit-governance-ethics-build",
  "credibility-how-it-works-video",
]);

function listSlugFiles(): Array<{ slug: string; file: string }> {
  const rows: Array<{ slug: string; file: string }> = [];
  if (!fs.existsSync(ARTICLES_DIR)) return rows; // no articles dir yet — nothing to validate
  for (const name of fs.readdirSync(ARTICLES_DIR)) {
    if (name.endsWith(".md") && !EXCLUDED_SLUGS.has(name.replace(/\.md$/, ""))) {
      if (name.startsWith("_")) continue; // skip inventory / internal markdown
      rows.push({ slug: name.replace(/\.md$/, ""), file: path.join(ARTICLES_DIR, name) });
    }
  }
  const sandboxDir = path.join(ARTICLES_DIR, "sandbox");
  if (fs.existsSync(sandboxDir)) {
    for (const name of fs.readdirSync(sandboxDir)) {
      if (name.endsWith(".md")) {
        rows.push({
          slug: `sandbox/${name.replace(/\.md$/, "")}`,
          file: path.join(sandboxDir, name),
        });
      }
    }
  }
  return rows.sort((a, b) => a.slug.localeCompare(b.slug));
}

/**
 * Minimal YAML-ish frontmatter parser for the subset the articles actually use:
 *   key: scalar
 *   key: [a, b, c]
 *   key: true / false / null
 *   key: "quoted string"
 */
function parseFrontmatter(raw: string): { data: Record<string, unknown>; hasBlock: boolean } {
  const stripped = raw.replace(/^\uFEFF/, "");
  if (!stripped.startsWith("---\n") && !stripped.startsWith("---\r\n")) {
    return { data: {}, hasBlock: false };
  }
  const end = stripped.indexOf("\n---", 4);
  if (end === -1) return { data: {}, hasBlock: false };
  const block = stripped.slice(4, end);

  const out: Record<string, unknown> = {};
  for (const rawLine of block.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const m = /^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/.exec(line);
    if (!m) continue;
    const key = m[1];
    const val: string = m[2].trim();
    {
      if (val === "") {
        out[key] = "";
        continue;
      }
      if (val === "true" || val === "false") {
        out[key] = val === "true";
        continue;
      }
      if (val === "null" || val === "~") {
        out[key] = null;
        continue;
      }
      if (/^-?\d+$/.test(val)) {
        out[key] = Number.parseInt(val, 10);
        continue;
      }
      if (/^-?\d+\.\d+$/.test(val)) {
        out[key] = Number.parseFloat(val);
        continue;
      }
      if (val.startsWith("[") && val.endsWith("]")) {
        const items = val
          .slice(1, -1)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .map((s) =>
            (s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))
              ? s.slice(1, -1)
              : s,
          );
        out[key] = items;
        continue;
      }
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        out[key] = val.slice(1, -1);
        continue;
      }
      out[key] = val;
    }
  }
  return { data: out, hasBlock: true };
}

type Report = {
  slug: string;
  hasBlock: boolean;
  ok: boolean;
  issues: string[];
};

function validateFile(slug: string, file: string): Report {
  const raw = fs.readFileSync(file, "utf-8");
  const { data, hasBlock } = parseFrontmatter(raw);
  const parsed = articleFrontmatterSchema.safeParse(data);
  if (parsed.success) {
    return { slug, hasBlock, ok: true, issues: [] };
  }
  const issues = parsed.error.issues.map((i) => `  • ${i.path.join(".") || "(root)"}: ${i.message}`);
  return { slug, hasBlock, ok: false, issues };
}

function main(): void {
  const warnMode = process.argv.includes("--warn");

  const files = listSlugFiles();
  const reports = files.map(({ slug, file }) => validateFile(slug, file));
  const invalid = reports.filter((r) => !r.ok);
  const noBlock = reports.filter((r) => !r.hasBlock);

  const pass = invalid.length;
  const missing = noBlock.length;

  if (pass === 0 && missing === 0) {
    console.log(`[articles:check] ✓ ${files.length} articles valid`);
    process.exit(0);
  }

  console.log(`[articles:check] ${files.length} articles scanned`);
  if (missing > 0) {
    console.log(`\n⚠ ${missing} articles have no frontmatter block:`);
    for (const r of noBlock.slice(0, 50)) console.log(`  - ${r.slug}`);
    if (noBlock.length > 50) console.log(`  … ${noBlock.length - 50} more`);
  }
  if (pass > 0) {
    console.log(`\n✗ ${pass} articles failed schema validation:`);
    for (const r of invalid) {
      console.log(`\n  ${r.slug}`);
      for (const line of r.issues) console.log(line);
    }
  }

  if (warnMode) {
    console.log("\n[articles:check] --warn mode: exit 0");
    process.exit(0);
  }
  process.exit(1);
}

main();
