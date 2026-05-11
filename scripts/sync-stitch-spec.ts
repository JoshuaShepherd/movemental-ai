/**
 * Copies Stitch manifest + fixtures + JSON schemas into this repo.
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

function main() {
  const stitchRoot = process.env.STITCH_REPO_PATH ?? path.join(REPO_ROOT, "..", "stitch");
  const manifestDir = path.join(stitchRoot, "manifest");
  const fixturesSafety = path.join(stitchRoot, "fixtures", "safety");
  const fixturesSandbox = path.join(stitchRoot, "fixtures", "sandbox");
  const fixturesSchema = path.join(stitchRoot, "fixtures", "schema");

  if (!fs.existsSync(manifestDir)) {
    console.error(`sync-stitch-spec: Stitch repo not found at ${stitchRoot}`);
    console.error("Set STITCH_REPO_PATH or clone stitch next to movemental-ai.");
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

  const safetyCount = fs.readdirSync(path.join(outFixtures, "safety")).filter((f) => f.endsWith(".json")).length;
  const sandboxCount = fs.readdirSync(path.join(outFixtures, "sandbox")).filter((f) => f.endsWith(".json")).length;
  console.log(
    `sync-stitch-spec: OK from ${stitchRoot} → manifests + ${safetyCount} safety + ${sandboxCount} sandbox fixtures + schema`,
  );
}

main();
