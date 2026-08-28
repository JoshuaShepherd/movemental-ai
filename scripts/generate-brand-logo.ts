/**
 * Emits WebP wordmarks from the light/dark PNGs in public/images/brand/.
 * Run: pnpm brand:logo
 */

import fs from "fs";
import path from "path";

import sharp from "sharp";

const BRAND_DIR = path.join(process.cwd(), "public", "images", "brand");

const VARIANTS = [
  { stem: "movemental-logo-light", source: "movemental-logo-light.png" },
  { stem: "movemental-logo-dark", source: "movemental-logo-dark.png" },
] as const;

async function emit(sourcePath: string, outPath: string, height: number | null) {
  let pipeline = sharp(sourcePath);
  if (height) {
    pipeline = pipeline.resize({ height, fit: "inside" });
  }
  await pipeline.webp({ quality: 95, alphaQuality: 100, effort: 6 }).toFile(outPath);
  const outMeta = await sharp(outPath).metadata();
  const sizeKb = (fs.statSync(outPath).size / 1024).toFixed(1);
  console.log(`→ ${path.basename(outPath)} (${outMeta.width}×${outMeta.height}, ${sizeKb} KB)`);
}

async function main() {
  for (const { stem, source } of VARIANTS) {
    const sourcePath = path.join(BRAND_DIR, source);
    if (!fs.existsSync(sourcePath)) {
      console.error("Source PNG not found:", sourcePath);
      process.exit(1);
    }
    await emit(sourcePath, path.join(BRAND_DIR, `${stem}.webp`), null);
  }

  console.log("Done. Update src/lib/brand/assets.ts if dimensions changed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
