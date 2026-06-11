/**
 * Optimizes the Movemental wordmark from the source PNG in public/images/brand/.
 * Strips baked-in paper/cream backgrounds so the wordmark is truly transparent.
 * Run: pnpm brand:logo
 */

import fs from "fs";
import path from "path";

import sharp from "sharp";

const BRAND_DIR = path.join(process.cwd(), "public", "images", "brand");
const SOURCE = path.join(BRAND_DIR, "movemental-logo-transparent.png");

const OUTPUTS = [
  { file: "movemental-logo-transparent.webp", resize: null as number | null },
  { file: "movemental-logo-transparent.h96.webp", resize: 96 },
  { file: "movemental-logo-transparent.h224.webp", resize: 224 },
] as const;

/** Light, low-saturation pixels are treated as paper and keyed out. */
async function stripPaperBackground(input: Buffer): Promise<Buffer> {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i]!;
    const g = data[i + 1]!;
    const b = data[i + 2]!;
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    const spread = Math.max(r, g, b) - Math.min(r, g, b);
    const isPaper = lum > 175 && spread < 35;

    if (isPaper) {
      data[i + 3] = 0;
    }
  }

  return sharp(data, { raw: { width, height, channels } }).png().toBuffer();
}

async function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error("Source PNG not found:", SOURCE);
    process.exit(1);
  }

  const sourceBytes = fs.readFileSync(SOURCE);
  const transparentPng = await stripPaperBackground(sourceBytes);
  await fs.promises.writeFile(SOURCE, transparentPng);

  const meta = await sharp(transparentPng).metadata();
  const srcW = meta.width ?? 0;
  const srcH = meta.height ?? 0;
  if (srcW === 0 || srcH === 0) {
    console.error("Source PNG has no dimensions:", SOURCE);
    process.exit(1);
  }

  console.log(`Source ${srcW}×${srcH} (paper background removed)`);

  for (const { file, resize } of OUTPUTS) {
    const outPath = path.join(BRAND_DIR, file);
    let pipeline = sharp(transparentPng);
    if (resize) {
      pipeline = pipeline.resize({ height: resize, fit: "inside" });
    }
    await pipeline.webp({ quality: 88, alphaQuality: 100, effort: 6 }).toFile(outPath);
    const outMeta = await sharp(outPath).metadata();
    const sizeKb = (fs.statSync(outPath).size / 1024).toFixed(1);
    console.log(`→ ${file} (${outMeta.width}×${outMeta.height}, ${sizeKb} KB)`);
  }

  console.log("Done. Update src/lib/brand/assets.ts if dimensions changed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
