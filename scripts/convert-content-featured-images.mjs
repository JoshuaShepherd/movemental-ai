/**
 * Converts the 6 abstract content-featured PNGs to optimized WebP and writes
 * to public/media-library/images/dave-ferguson/featured/ with clean names.
 * Run: node scripts/convert-content-featured-images.mjs
 * Source: html/dave-ferguson/media/images/*.png
 */

import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC_DIR = path.join(ROOT, "html", "dave-ferguson", "media", "images");
const OUT_DIR = path.join(ROOT, "public", "media-library", "images", "dave-ferguson", "featured");

const SOURCE_FILES = [
  "scmarketing_Abstract_oil_painting_symbolizing_exponential_growt_4ff1906e-9fe8-4345-a459-dce7ee90b992.png",
  "scmarketing_Abstract_oil_painting_symbolizing_exponential_growt_6c206595-20b1-4a4f-a1bd-ed0c850aa846.png",
  "scmarketing_Abstract_oil_painting_symbolizing_exponential_growt_9aef8272-96fe-4155-9cb0-c0116e9a07c5.png",
  "scmarketing_Abstract_oil_painting_symbolizing_exponential_growt_a743cf46-3df8-4bdb-bb0c-3401f2591a45.png",
  "scmarketing_Abstract_oil_painting_symbolizing_formation_in_comm_eedd3a95-0f32-4b67-ae00-1a4b59d69088.png",
  "scmarketing_Abstract_oil_painting_symbolizing_skunkworks_innova_1798b295-c798-47e1-9ff4-c77eccd027e8.png",
];

const MAX_WIDTH = 1200;
const WEBP_QUALITY = 85;

async function main() {
  if (!fs.existsSync(SRC_DIR)) {
    console.error("Source directory not found:", SRC_DIR);
    process.exit(1);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (let i = 0; i < SOURCE_FILES.length; i++) {
    const srcFile = SOURCE_FILES[i];
    const srcPath = path.join(SRC_DIR, srcFile);
    const outName = `content-featured-${i + 1}.webp`;
    const outPath = path.join(OUT_DIR, outName);

    if (!fs.existsSync(srcPath)) {
      console.warn("Skip (missing):", srcFile);
      continue;
    }

    const pipeline = sharp(srcPath)
      .resize(MAX_WIDTH, null, { withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 6 });
    await pipeline.toFile(outPath);
    console.log("Wrote:", outName);
  }
  console.log("Done. Output:", OUT_DIR);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
