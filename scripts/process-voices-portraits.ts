/**
 * Normalize voice/founder portraits to 4:5 WebP under public/images/voices.
 * Primary inputs: Downloads/<slug>.png (see manifest for filenames).
 *
 * Download roots (first match wins):
 *   - $VOICES_PORTRAIT_DOWNLOADS if set (single directory)
 *   - $HOME/Downloads
 *   - WSL: /mnt/c/Users/$USER/Downloads
 *
 * Slugs with no matching file in any root are skipped (existing WebP left as-is).
 *
 * Run from repo root: npx tsx scripts/process-voices-portraits.ts
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(REPO, "public/images/voices");
const HEADSHOTS = path.join(REPO, "public/headshots");

const TARGET_W = 960;
const TARGET_H = 1200; // 4:5

function downloadsRoots(): string[] {
  const roots: string[] = [];
  const envDir = process.env.VOICES_PORTRAIT_DOWNLOADS?.trim();
  if (envDir) roots.push(path.resolve(envDir));
  const home = process.env.HOME;
  if (home) roots.push(path.join(home, "Downloads"));
  const user = process.env.USER;
  if (user) roots.push(`/mnt/c/Users/${user}/Downloads`);
  return [...new Set(roots)];
}

type ManifestEntry = {
  slug: string;
  /** Tried in order: each root × each name */
  downloadNames: string[];
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
      "josh-shepherd.jpg",
      "joshua-shepherd.jpg",
    ],
  },
  {
    slug: "neil-cole",
    downloadNames: ["neil-cole.png", "neil-cole.webp", "neil-cole.jpg", "neil-cole.jpeg"],
  },
];

async function tryResolveInput(entry: ManifestEntry): Promise<string | null> {
  const roots = downloadsRoots();
  for (const root of roots) {
    for (const name of entry.downloadNames) {
      const p = path.join(root, name);
      try {
        await fs.access(p);
        return p;
      } catch {
        /* try next */
      }
    }
  }
  return null;
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
    try {
      await fs.access(src);
      await fs.copyFile(src, dest);
      console.log("Synced headshot", path.relative(REPO, dest));
    } catch {
      console.warn(`[process-voices-portraits] skip headshot sync ${to}: missing ${path.relative(REPO, src)}`);
    }
  }
}

async function main() {
  console.log("[process-voices-portraits] Downloads roots:", downloadsRoots().join(" | "));

  for (const entry of manifest) {
    const inputPath = await tryResolveInput(entry);
    if (!inputPath) {
      console.warn(
        `[process-voices-portraits] skip ${entry.slug}: no file in Downloads (tried ${entry.downloadNames.join(", ")})`,
      );
      continue;
    }
    const out = await toVoicesWebp(inputPath, entry.slug);
    console.log("Wrote", path.relative(REPO, out), "<-", path.relative(process.cwd(), inputPath));
  }

  await syncFounderHeadshots();
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
