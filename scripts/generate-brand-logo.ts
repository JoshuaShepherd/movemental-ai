/**
 * Optimizes the Movemental wordmark from the source PNG in public/images/brand/.
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
] as const;

async function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error("Source PNG not found:", SOURCE);
    process.exit(1);
  }

  const meta = await sharp(SOURCE).metadata();
  const srcW = meta.width ?? 0;
  const srcH = meta.height ?? 0;
  if (srcW === 0 || srcH === 0) {
    console.error("Source PNG has no dimensions:", SOURCE);
    process.exit(1);
  }

  console.log(`Source ${srcW}×${srcH}`);

  for (const { file, resize } of OUTPUTS) {
    const outPath = path.join(BRAND_DIR, file);
    let pipeline = sharp(SOURCE);
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
