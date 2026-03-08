/**
 * Generates all logo sizes and formats per _docs/_guides/logo-and-mark-treatment.md.
 * Run: npm run logo:generate
 * Source: logo-transparent.png, logo-black.png, logo-white.png (aspect ratio preserved).
 */

import sharp from "sharp";
import path from "path";
import fs from "fs";

const LOGO_DIR = path.join(process.cwd(), "public", "media-library", "images", "logo");

const VARIANTS: { file: string; name: string }[] = [
  { file: "logo-transparent.png", name: "full-color" },
  { file: "logo-black.png", name: "black" },
  { file: "logo-white.png", name: "white" },
];

/** Target heights in px (min 24–32 for legibility, 200/400 per guide 1×/2×). */
const HEIGHTS = [24, 32, 48, 64, 128, 200, 400];

async function main() {
  if (!fs.existsSync(LOGO_DIR)) {
    console.error("Logo directory not found:", LOGO_DIR);
    process.exit(1);
  }

  for (const { file: inputFile, name: variant } of VARIANTS) {
    const inputPath = path.join(LOGO_DIR, inputFile);
    if (!fs.existsSync(inputPath)) {
      console.warn("Skip (missing):", inputFile);
      continue;
    }

    const img = sharp(inputPath);
    const meta = await img.metadata();
    const srcW = meta.width ?? 0;
    const srcH = meta.height ?? 0;
    if (srcW === 0 || srcH === 0) {
      console.warn("Skip (no dimensions):", inputFile);
      continue;
    }

    console.log(`${inputFile} → logo-horizontal-${variant}-h* (${srcW}×${srcH})`);

    for (const h of HEIGHTS) {
      const outBase = `logo-horizontal-${variant}-h${h}`;
      const resized = img.clone().resize({ height: h, fit: "inside" });

      const pngPath = path.join(LOGO_DIR, `${outBase}.png`);
      const webpPath = path.join(LOGO_DIR, `${outBase}.webp`);

      await resized.png({ compressionLevel: 9 }).toFile(pngPath);
      await img
        .clone()
        .resize({ height: h, fit: "inside" })
        .webp({ quality: 90, alphaQuality: 100 })
        .toFile(webpPath);
    }
  }

  console.log("Done. See public/media-library/images/logo/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
