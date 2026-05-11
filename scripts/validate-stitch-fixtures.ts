/**
 * Validates vendored Stitch fixtures under src/lib/program/fixtures align with
 * manifest/templates (stitch-templates.json) and template-content-index.json.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const SCREEN_FAMILIES = new Set([
  "safestart-hero-timeline",
  "safestart-editorial-workspace",
  "editorial-thread",
  "governance-document",
  "ratification-flow",
  "sandboxlive-shell",
  "phase-workspace",
  "ethics-workspace",
  "future-plan-editor",
  "strategic-memo",
  "recipe-library",
  "oversight-modules",
  "generic-dashboard",
]);

type Manifest = {
  count: number;
  templates: Array<{
    id: string;
    category: "safety" | "sandbox";
    path: string;
    thumbnail: string;
  }>;
};

type IndexDoc = { entries: Array<{ templateId: string; screenFamily: string }> };

function readJson<T>(p: string): T {
  return JSON.parse(fs.readFileSync(p, "utf8")) as T;
}

function validateSafestartHeroTimeline(fixture: Record<string, unknown>, filePath: string): string[] {
  const errs: string[] = [];
  if (fixture.screenFamily !== "safestart-hero-timeline") {
    errs.push(`screenFamily must be safestart-hero-timeline (${filePath})`);
  }
  const shell = fixture.shell as Record<string, unknown> | undefined;
  if (!shell?.brandLine && shell?.brandLine !== null) errs.push(`missing shell.brandLine (${filePath})`);
  const page = fixture.page as Record<string, unknown> | undefined;
  if (!page?.headline && page?.headline !== null) errs.push(`missing page.headline (${filePath})`);
  const ref = fixture.$schemaRef as string | undefined;
  if (ref?.includes("safestart-hero-timeline")) {
    const sections = (fixture.sections ?? []) as Array<{ kind?: string }>;
    const kinds = sections.map((s) => s.kind);
    for (const req of ["timeline", "rosterColumns", "prepChecklist"]) {
      if (!kinds.includes(req)) errs.push(`missing sections kind "${req}" for schema-backed hero (${filePath})`);
    }
  }
  return errs;
}

function main() {
  const manifestPath = path.join(ROOT, "src", "lib", "program", "data", "stitch-templates.json");
  const indexPath = path.join(ROOT, "src", "lib", "program", "data", "template-content-index.json");
  let errors = 0;

  if (!fs.existsSync(manifestPath) || !fs.existsSync(indexPath)) {
    console.error("Missing vendored manifest — run pnpm sync:stitch-spec");
    process.exit(1);
  }

  const manifest = readJson<Manifest>(manifestPath);
  const index = readJson<IndexDoc>(indexPath);

  if (index.entries.length !== manifest.templates.length) {
    console.error("template-content-index entries mismatch manifest template count");
    errors++;
  }

  const indexIds = new Set(index.entries.map((e) => e.templateId));
  for (const t of manifest.templates) {
    const fixturePath = path.join(ROOT, "src", "lib", "program", "fixtures", t.category, `${t.id}.content.json`);
    if (!fs.existsSync(fixturePath)) {
      console.error("Missing fixture:", fixturePath);
      errors++;
      continue;
    }
    let fixture: Record<string, unknown>;
    try {
      fixture = readJson(fixturePath);
    } catch (e) {
      console.error("Invalid JSON:", fixturePath, (e as Error).message);
      errors++;
      continue;
    }
    for (const req of ["fixtureVersion", "templateId", "screenFamily", "shell", "page"]) {
      if (fixture[req] === undefined) {
        console.error(`Fixture missing "${req}":`, fixturePath);
        errors++;
      }
    }
    if (fixture.templateId !== t.id) {
      console.error(`templateId mismatch in ${fixturePath}`);
      errors++;
    }
    const sf = fixture.screenFamily as string;
    if (!SCREEN_FAMILIES.has(sf)) {
      console.error(`Unknown screenFamily "${sf}" in ${fixturePath}`);
      errors++;
    }

    const ref = fixture.$schemaRef as string | undefined;
    if (ref?.includes("safestart-hero-timeline")) {
      validateSafestartHeroTimeline(fixture, fixturePath).forEach((msg) => {
        console.error(msg);
        errors++;
      });
    }

    const htmlPath = path.join(ROOT, "public", t.path);
    const thumbPath = path.join(ROOT, "public", t.thumbnail);
    if (!fs.existsSync(htmlPath)) {
      console.error("Missing static HTML (run pnpm sync:stitch-spec with STITCH_REPO_PATH):", htmlPath);
      errors++;
    }
    if (!fs.existsSync(thumbPath)) {
      console.error("Missing static thumbnail (run pnpm sync:stitch-spec):", thumbPath);
      errors++;
    }
  }

  for (const id of indexIds) {
    if (!manifest.templates.some((t) => t.id === id)) {
      console.error("Unknown templateId in index:", id);
      errors++;
    }
  }

  if (errors) {
    console.error(`validate-stitch-fixtures: ${errors} issue(s)`);
    process.exit(1);
  }
  console.log(
    `validate-stitch-fixtures: OK (${manifest.templates.length} fixtures + public/templates static exports)`,
  );
}

main();
