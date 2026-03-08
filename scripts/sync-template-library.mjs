#!/usr/bin/env node
/**
 * Syncs the templates repo "directories" folder into public/templates/library/
 * so the design-mode prototypes are served as the template library in the Next.js app.
 *
 * Run from repo root: node scripts/sync-template-library.mjs
 * Or: npm run template:sync-library
 *
 * Source: TEMPLATES_SOURCE env, or default ../../#source/templates/directories
 * (relative to movemental-ai repo root).
 * Dest: public/templates/library/
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = process.env.TEMPLATES_SOURCE
  ? (path.isAbsolute(process.env.TEMPLATES_SOURCE)
      ? process.env.TEMPLATES_SOURCE
      : path.resolve(ROOT, process.env.TEMPLATES_SOURCE))
  : path.join(ROOT, "..", "..", "#source", "templates", "directories");
const DEST = path.join(ROOT, "public", "templates", "library");

function copyRecursive(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) {
    console.error("Source not found:", srcDir);
    console.error("Set TEMPLATES_SOURCE to the path to the 'directories' folder (relative or absolute).");
    process.exit(1);
  }
  fs.mkdirSync(destDir, { recursive: true });
  for (const name of fs.readdirSync(srcDir)) {
    const srcPath = path.join(srcDir, name);
    const destPath = path.join(destDir, name);
    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log("Syncing template library (directories) to public/templates/library/...");
console.log("Source:", SRC);
if (fs.existsSync(DEST)) {
  fs.rmSync(DEST, { recursive: true });
}
copyRecursive(SRC, DEST);
console.log("Done. Library available at /templates/library/");
console.log("Run the app and open /templates or /templates-dashboard to browse.");
