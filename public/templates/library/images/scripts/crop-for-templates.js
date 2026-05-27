#!/usr/bin/env node
/**
 * Crop and realign images for HTML templates.
 *
 * Reads from: ../alan/, ../brad/, ../dave/, ../art/hero-sections/
 * Writes to: ../hero/16x9/, ../hero/3x4/, ../portraits/headshot/
 *
 * Run from directories/images/scripts/:
 *   npm install && npm run crop
 *
 * Or from directories/images/:
 *   node scripts/crop-for-templates.js
 *
 * Options:
 *   --dry   Log what would be done without writing files.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_ROOT = path.resolve(__dirname, "..");
const DRY = process.argv.includes("--dry");

const HERO_16X9 = { width: 1920, height: 1080 };
const HERO_3X4 = { width: 600, height: 800 };
const HEADSHOT_4X5 = { width: 400, height: 500 };
const HEADSHOT_SQUARE = { width: 256, height: 256 };

const AUTHOR_SOURCES = ["alan", "brad", "dave"];
const ART_SOURCE = path.join(IMAGES_ROOT, "art", "hero-sections");

const OUT = {
  hero16x9: path.join(IMAGES_ROOT, "hero", "16x9"),
  hero3x4: path.join(IMAGES_ROOT, "hero", "3x4"),
  headshot: path.join(IMAGES_ROOT, "portraits", "headshot"),
};

const EXT = [".webp", ".png", ".jpg", ".jpeg"];

function ensureDir(dir) {
  if (!DRY && !fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function findFirstImage(dir) {
  if (!fs.existsSync(dir)) return null;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const file = entries.find(
    (e) => e.isFile() && EXT.some((x) => e.name.toLowerCase().endsWith(x))
  );
  return file ? path.join(dir, file.name) : null;
}

function listImages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(
      (e) =>
        e.isFile() &&
        EXT.some((x) => e.name.toLowerCase().endsWith(x))
    )
    .map((e) => path.join(dir, e.name));
}

async function cropToRatio(srcPath, destPath, targetW, targetH, anchor = "right") {
  const img = sharp(srcPath);
  const meta = await img.metadata();
  const { width: w, height: h } = meta;
  if (!w || !h) return;

  const targetRatio = targetW / targetH;
  const currentRatio = w / h;
  let cropW = w,
    cropH = h,
    left = 0,
    top = 0;

  if (currentRatio > targetRatio) {
    cropW = Math.round(h * targetRatio);
    cropH = h;
    if (anchor === "right") left = w - cropW;
    else if (anchor === "center") left = Math.round((w - cropW) / 2);
  } else {
    cropW = w;
    cropH = Math.round(w / targetRatio);
    top = Math.round((h - cropH) / 2);
  }

  const pipeline = img.extract({
    left: Math.max(0, left),
    top: Math.max(0, top),
    width: cropW,
    height: cropH,
  });

  const out = pipeline.resize(targetW, targetH).webp({ quality: 85 });

  if (DRY) {
    console.log("[dry] would write:", destPath, `(${targetW}x${targetH})`);
    return;
  }
  ensureDir(path.dirname(destPath));
  await out.toFile(destPath);
  console.log("wrote:", path.relative(IMAGES_ROOT, destPath));
}

async function processAuthor(name) {
  const dir = path.join(IMAGES_ROOT, name);
  const src = findFirstImage(dir);
  if (!src) {
    console.warn("no image found in", dir);
    return;
  }
  const base = path.basename(src, path.extname(src));
  const slug = name;

  await cropToRatio(
    src,
    path.join(OUT.hero16x9, `${slug}-hero-16x9.webp`),
    HERO_16X9.width,
    HERO_16X9.height,
    "right"
  );
  await cropToRatio(
    src,
    path.join(OUT.hero3x4, `${slug}-hero-3x4.webp`),
    HERO_3X4.width,
    HERO_3X4.height,
    "center"
  );
  await cropToRatio(
    src,
    path.join(OUT.headshot, `${slug}-headshot-4x5.webp`),
    HEADSHOT_4X5.width,
    HEADSHOT_4X5.height,
    "center"
  );
  await cropToRatio(
    src,
    path.join(OUT.headshot, `${slug}-headshot-square.webp`),
    HEADSHOT_SQUARE.width,
    HEADSHOT_SQUARE.height,
    "center"
  );
}

async function processArtHeroSections() {
  const files = listImages(ART_SOURCE);
  for (const src of files.slice(0, 5)) {
    const base = path.basename(src, path.extname(src));
    const safe = base.replace(/\s+/g, "-").slice(0, 40);
    const dest = path.join(OUT.hero16x9, `art-${safe}-16x9.webp`);
    await cropToRatio(
      src,
      dest,
      HERO_16X9.width,
      HERO_16X9.height,
      "right"
    );
  }
}

async function main() {
  if (DRY) console.log("--- DRY RUN ---");
  ensureDir(OUT.hero16x9);
  ensureDir(OUT.hero3x4);
  ensureDir(OUT.headshot);

  for (const name of AUTHOR_SOURCES) await processAuthor(name);
  await processArtHeroSections();

  console.log("done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
