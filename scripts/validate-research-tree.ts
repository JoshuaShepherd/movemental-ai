#!/usr/bin/env tsx
/**
 * Validate tenant movement-leader research trees against the canonical sidebar manifest.
 * Usage: pnpm research:tree-check [--slug=alan-hirsch]
 */
import { existsSync } from "node:fs";
import { join } from "node:path";

import {
  CANONICAL_RESEARCH_PATHS,
  reflectedUnderstandingPath,
  slugDir,
  TENANT_RESEARCH_SLUGS,
  fileStatus,
} from "./research-tree-paths";

function parseSlugArg(): string | null {
  const arg = process.argv.find((a) => a.startsWith("--slug="));
  return arg ? arg.slice("--slug=".length) : null;
}

function main(): void {
  const onlySlug = parseSlugArg();
  const slugs = onlySlug
    ? TENANT_RESEARCH_SLUGS.filter((s) => s === onlySlug)
    : [...TENANT_RESEARCH_SLUGS];

  if (onlySlug && slugs.length === 0) {
    console.error(`Unknown or out-of-scope slug: ${onlySlug}`);
    process.exit(1);
  }

  let failures = 0;

  for (const slug of slugs) {
    const root = slugDir(slug);
    if (!existsSync(root)) {
      console.error(`[${slug}] missing directory: ${root}`);
      failures++;
      continue;
    }

    const missing: string[] = [];
    const empty: string[] = [];

    for (const rel of CANONICAL_RESEARCH_PATHS) {
      const full = join(root, rel);
      const status = fileStatus(full);
      if (status === "missing") missing.push(rel);
      else if (status === "empty") empty.push(rel);
    }

    const ru = reflectedUnderstandingPath(slug);
    if (!existsSync(ru)) {
      missing.push("reflected-understanding/<slug>.md");
    } else if (fileStatus(ru) === "empty") {
      empty.push("reflected-understanding/<slug>.md");
    }

    if (missing.length > 0) {
      console.error(`[${slug}] missing paths (${missing.length}):`);
      for (const p of missing) console.error(`  - ${p}`);
      failures += missing.length;
    }

    if (empty.length > 0) {
      console.log(`[${slug}] empty stubs (${empty.length}): ${empty.join(", ")}`);
    } else {
      console.log(`[${slug}] OK — all canonical paths present`);
    }
  }

  if (failures > 0) {
    console.error(`\nresearch:tree-check failed — ${failures} missing path(s)`);
    process.exit(1);
  }

  console.log("\nresearch:tree-check passed");
}

main();
