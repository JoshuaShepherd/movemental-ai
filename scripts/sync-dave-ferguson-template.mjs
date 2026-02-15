#!/usr/bin/env node
/**
 * Syncs html/dave-ferguson/ into public/templates/dave-ferguson/ and rewrites
 * asset paths so the template works when served from the Next.js site root.
 *
 * Run from repo root: node scripts/sync-dave-ferguson-template.mjs
 *
 * Source of truth: html/dave-ferguson/
 * Deployed copy: public/templates/dave-ferguson/ (path-normalized HTML only)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "html", "dave-ferguson");
const DEST = path.join(ROOT, "public", "templates", "dave-ferguson");

const PATH_REPLACEMENTS = [
  ["../../public/dave-ferguson/", "/dave-ferguson/"],
  ["../../public/media-library/", "/media-library/"],
  ["../public/dave-ferguson/", "/dave-ferguson/"],
  ["../public/media-library/", "/media-library/"],
];

function copyRecursive(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) {
    console.error("Source not found:", srcDir);
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

function rewriteHtmlPaths(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let changed = false;
  for (const [from, to] of PATH_REPLACEMENTS) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changed = true;
    }
  }
  if (changed) fs.writeFileSync(filePath, content, "utf8");
}

function forEachHtml(dir, fn) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      forEachHtml(full, fn);
    } else if (name.endsWith(".html")) {
      fn(full);
    }
  }
}

// Main
console.log("Syncing Dave Ferguson template to public/...");
if (fs.existsSync(DEST)) {
  fs.rmSync(DEST, { recursive: true });
}
copyRecursive(SRC, DEST);
forEachHtml(DEST, rewriteHtmlPaths);
console.log("Done. Template available at /templates/dave-ferguson/");
