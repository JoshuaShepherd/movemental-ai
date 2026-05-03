/**
 * Normalize voice/founder portraits to 4:5 WebP under public/images/voices.
 * Primary inputs: ~/Downloads/<slug>.png (and a few alternate names).
 * Fallbacks only when a slug is missing from Downloads (see manifest below).
 *
 * Run from repo root: npx tsx scripts/process-voices-portraits.ts
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(REPO, "public/images/voices");
const DOWNLOADS = path.join(process.env.HOME ?? "", "Downloads");
const HEADSHOTS = path.join(REPO, "public/headshots");

const TARGET_W = 960;
const TARGET_H = 1200; // 4:5

type ManifestEntry = {
  slug: string;
  /** Tried in order under ~/Downloads */
  downloadNames: string[];
  /** Repo-relative fallback (already WebP/PNG/JPEG) — last resort */
  fallback?: string;
};

const manifest: ManifestEntry[] = [
  {
    slug: "alan-hirsch",
    downloadNames: ["alan-hirsch.png", "alan-hirsch.webp", "alan-hirsch.jpg", "alan-hirsch.jpeg"],
  },
  {
    slug: "brad-brisco",
    downloadNames: ["brad-brisco.png", "brad-brisco.webp", "brad-brisco.jpg", "brad-brisco.jpeg"],
  },
  {
    slug: "jr-woodward",
    downloadNames: ["jr-woodward.png", "jr-woodward.webp", "jr-woodward.jpg", "jr-woodward.jpeg"],
  },
  {
    slug: "liz-rios",
    downloadNames: ["liz-rios.png", "liz-rios.webp", "liz-rios.jpg", "liz-rios.jpeg"],
  },
  {
    slug: "rowland-smith",
    downloadNames: ["rowland-smith.png", "rowland-smith.webp", "rowland-smith.jpg", "rowland-smith.jpeg"],
  },
  {
    slug: "lucas-pulley",
    downloadNames: ["lucas-pulley.png", "lucas-pulley.webp", "lucas-pulley.jpg", "lucas-pulley.jpeg"],
  },
  {
    slug: "tim-catchim",
    downloadNames: ["tim-catchim.png", "tim-catchim.webp", "tim-catchim.jpg", "tim-catchim.jpeg"],
    fallback: "public/images/voices/tim-catchim.webp",
  },
  {
    slug: "rob-wegner",
    downloadNames: ["rob-wegner.png", "rob-wegner.webp", "rob-wegner.jpg", "rob-wegner.jpeg"],
  },
  {
    slug: "josh-shepherd",
    downloadNames: [
      "josh-shepherd.png",
      "joshua-shepherd.png",
      "josh-shepherd.webp",
      "joshua-shepherd.webp",
    ],
    fallback: "public/headshots/joshua-shepherd.webp",
  },
];

async function resolveInput(entry: ManifestEntry): Promise<{ path: string; fromDownloads: boolean }> {
  for (const name of entry.downloadNames) {
    const p = path.join(DOWNLOADS, name);
    try {
      await fs.access(p);
      return { path: p, fromDownloads: true };
    } catch {
      /* try next */
    }
  }
  if (entry.fallback) {
    const p = path.join(REPO, entry.fallback);
    await fs.access(p);
    console.warn(
      `[process-voices-portraits] ${entry.slug}: no file in Downloads (tried ${entry.downloadNames.join(", ")}); using ${entry.fallback}`,
    );
    return { path: p, fromDownloads: false };
  }
  throw new Error(
    `[process-voices-portraits] Missing input for ${entry.slug}: add one of [${entry.downloadNames.join(", ")}] to Downloads`,
  );
}

async function toVoicesWebp(inputPath: string, slug: string) {
  const outPath = path.join(OUT_DIR, `${slug}.webp`);
  await fs.mkdir(OUT_DIR, { recursive: true });
  const pipeline = sharp(inputPath)
    .rotate()
    .resize(TARGET_W, TARGET_H, { fit: "cover", position: "attention" })
    .webp({ quality: 84, effort: 6, smartSubsample: true });

  if (path.resolve(inputPath) === path.resolve(outPath)) {
    const buf = await pipeline.toBuffer();
    await fs.writeFile(outPath, buf);
  } else {
    await pipeline.toFile(outPath);
  }
  return outPath;
}

/** Keep founder headshots aligned with voices exports (same crop pipeline). */
async function syncFounderHeadshots() {
  await fs.mkdir(HEADSHOTS, { recursive: true });
  const pairs: [string, string][] = [
    ["alan-hirsch.webp", "alan-hirsch.webp"],
    ["brad-brisco.webp", "brad-brisco.webp"],
    ["josh-shepherd.webp", "joshua-shepherd.webp"],
  ];
  for (const [from, to] of pairs) {
    const src = path.join(OUT_DIR, from);
    const dest = path.join(HEADSHOTS, to);
    await fs.copyFile(src, dest);
    console.log("Synced headshot", path.relative(REPO, dest));
  }
}

async function main() {
  for (const entry of manifest) {
    const { path: inputPath } = await resolveInput(entry);
    const out = await toVoicesWebp(inputPath, entry.slug);
    console.log("Wrote", path.relative(REPO, out));
  }

  await syncFounderHeadshots();
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
