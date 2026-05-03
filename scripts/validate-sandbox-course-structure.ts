/**
 * Validates markdown week files for sandbox-ai-nonprofits against
 * docs/articles/COURSE_STRATEGY.md section stacks (8 weeks, canonical order).
 *
 * Usage: pnpm exec tsx scripts/validate-sandbox-course-structure.ts
 */

import * as fs from "node:fs";
import * as path from "node:path";
import {
  SANDBOX_AI_NONPROFITS_SLUG,
  extractSectionNth,
  sectionsForWeek,
  weekFileName,
} from "./lib/sandbox-ai-nonprofits-course-spec";

const MIN_BODY_LEN = 12;

function main() {
  const root = path.join(process.cwd(), "content-library", "courses", SANDBOX_AI_NONPROFITS_SLUG);
  const manifestPath = path.join(root, "course-manifest.json");
  if (!fs.existsSync(manifestPath)) {
    console.error("Missing", manifestPath);
    process.exit(1);
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8")) as { duration_weeks?: number };
  if (manifest.duration_weeks !== 8) {
    console.error("course-manifest.json: expected duration_weeks 8, got", manifest.duration_weeks);
    process.exit(1);
  }

  let errors = 0;
  for (let w = 1; w <= 8; w++) {
    const file = path.join(root, weekFileName(w));
    if (!fs.existsSync(file)) {
      console.error("Missing week file:", file);
      errors++;
      continue;
    }
    const md = fs.readFileSync(file, "utf-8");
    const spec = sectionsForWeek(w);
    const typeOccurrence = new Map<string, number>();
    for (const row of spec) {
      const occ = typeOccurrence.get(row.section_type) ?? 0;
      typeOccurrence.set(row.section_type, occ + 1);
      const body = extractSectionNth(md, row.section_type, occ);
      if (!body || body.length < MIN_BODY_LEN) {
        console.error(
          `Week ${w}: empty or short body for section "${row.section_type}" (occurrence ${occ}). Expected ## ${row.section_type} block with content.`,
        );
        errors++;
      }
    }
  }

  if (errors) {
    console.error(`validate-sandbox-course-structure: ${errors} error(s)`);
    process.exit(1);
  }

  console.log("validate-sandbox-course-structure: OK (8 weeks, all section bodies present).");
  console.log(
    "Manual QA: compare learn section chrome to docs/html/alan-hirsch-course-migration/forgotten-ways/fixtures/ and tokens to docs/design/DESIGN.md.",
  );
  process.exit(0);
}

main();
