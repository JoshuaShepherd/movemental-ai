/**
 * Full Stitch → movemental sync:
 * - manifest JSON + template-content index
 * - program fixtures (safety / sandbox / schema)
 * - static HTML + thumbnails under public/templates/ (served at /templates/…)
 *
 * Default source: sibling directory ../stitch (override with STITCH_REPO_PATH).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");

function copyDir(src: string, dest: string) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    const from = path.join(src, name);
    const to = path.join(dest, name);
    if (fs.statSync(from).isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

function countFilesRecursive(dir: string): number {
  if (!fs.existsSync(dir)) return 0;
  let n = 0;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) n += countFilesRecursive(p);
    else n += 1;
  }
  return n;
}

function main() {
  const stitchRoot = process.env.STITCH_REPO_PATH ?? path.join(REPO_ROOT, "..", "stitch");
  const manifestDir = path.join(stitchRoot, "manifest");
  const fixturesSafety = path.join(stitchRoot, "fixtures", "safety");
  const fixturesSandbox = path.join(stitchRoot, "fixtures", "sandbox");
  const fixturesSchema = path.join(stitchRoot, "fixtures", "schema");
  const srcTemplates = path.join(stitchRoot, "templates");

  if (!fs.existsSync(manifestDir)) {
    console.error(`sync-stitch-spec: Stitch repo not found at ${stitchRoot}`);
    console.error("Set STITCH_REPO_PATH or clone stitch next to movemental-ai.");
    process.exit(1);
  }

  if (!fs.existsSync(srcTemplates)) {
    console.error(`sync-stitch-spec: missing HTML export tree at ${srcTemplates}`);
    process.exit(1);
  }

  const dataDir = path.join(REPO_ROOT, "src", "lib", "program", "data");
  const outFixtures = path.join(REPO_ROOT, "src", "lib", "program", "fixtures");

  fs.mkdirSync(dataDir, { recursive: true });
  fs.mkdirSync(path.join(outFixtures, "safety"), { recursive: true });
  fs.mkdirSync(path.join(outFixtures, "sandbox"), { recursive: true });
  fs.mkdirSync(path.join(outFixtures, "schema"), { recursive: true });

  fs.copyFileSync(
    path.join(manifestDir, "templates.json"),
    path.join(dataDir, "stitch-templates.json"),
  );
  fs.copyFileSync(
    path.join(manifestDir, "template-content-index.json"),
    path.join(dataDir, "template-content-index.json"),
  );

  copyDir(fixturesSafety, path.join(outFixtures, "safety"));
  copyDir(fixturesSandbox, path.join(outFixtures, "sandbox"));
  copyDir(fixturesSchema, path.join(outFixtures, "schema"));

  const outTemplates = path.join(REPO_ROOT, "public", "templates");
  fs.mkdirSync(path.join(REPO_ROOT, "public"), { recursive: true });
  fs.rmSync(outTemplates, { recursive: true, force: true });
  copyDir(srcTemplates, outTemplates);

  const safetyCount = fs.readdirSync(path.join(outFixtures, "safety")).filter((f) => f.endsWith(".json")).length;
  const sandboxCount = fs.readdirSync(path.join(outFixtures, "sandbox")).filter((f) => f.endsWith(".json")).length;
  const staticCount = countFilesRecursive(outTemplates);
  console.log(
    `sync-stitch-spec: OK from ${stitchRoot} → manifests + ${safetyCount} safety + ${sandboxCount} sandbox fixtures + schema + ${staticCount} static template files → public/templates`,
  );
}

main();
