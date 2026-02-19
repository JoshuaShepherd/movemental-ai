#!/usr/bin/env node
/**
 * Convert all PNG/JPG/JPEG/GIF in directories/images to optimized WebP.
 * Writes .webp alongside originals, then removes originals.
 * Run from directories/images/scripts/: node convert-to-webp.js
 * Options: --dry (log only), --keep (do not delete originals)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_ROOT = path.resolve(__dirname, "..");
const DRY = process.argv.includes("--dry");
const KEEP = process.argv.includes("--keep");

const EXT_IN = [".png", ".jpg", ".jpeg", ".gif"];

function* walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walkDir(full);
    else if (e.isFile() && EXT_IN.some((x) => e.name.toLowerCase().endsWith(x)))
      yield full;
  }
}

async function convertOne(srcPath) {
  const ext = path.extname(srcPath).toLowerCase();
  const base = path.basename(srcPath, ext);
  const dir = path.dirname(srcPath);
  const destPath = path.join(dir, `${base}.webp`);

  if (DRY) {
    console.log("[dry] would convert:", path.relative(IMAGES_ROOT, srcPath), "->", path.relative(IMAGES_ROOT, destPath));
    return;
  }

  const pipeline = sharp(srcPath);
  const meta = await pipeline.metadata();
  const isOpaque = meta.hasAlpha === false;
  await pipeline
    .webp({
      quality: 85,
      alphaQuality: 90,
      lossless: false,
      smartSubsample: true,
      effort: 4,
    })
    .toFile(destPath);
  console.log("wrote:", path.relative(IMAGES_ROOT, destPath));

  if (!KEEP) {
    fs.unlinkSync(srcPath);
    console.log("  removed:", path.relative(IMAGES_ROOT, srcPath));
  }
}

async function main() {
  if (DRY) console.log("--- DRY RUN ---");
  const files = [...walkDir(IMAGES_ROOT)];
  console.log("Found", files.length, "non-WebP image(s).");
  for (const f of files) await convertOne(f);
  console.log("done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
