/**
 * One-off: optimize movemental-team PNG headshots and convert to WebP.
 * Output: public/media-library/images/headshots/movemental-team/*.webp
 * Run: npx tsx scripts/optimize-team-headshots.ts
 */
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const ROOT = path.resolve(__dirname, '..')
const SRC_DIR = path.join(ROOT, 'public/media-library/images/headshots/movemental-team')
const FILES = [
  { png: 'josh-headshot-4x5.png', webp: 'josh-headshot-4x5.webp' },
  { png: 'brad-headshot-4x5.png', webp: 'brad-headshot-4x5.webp' },
  { png: 'alan-headshot-4x5.png', webp: 'alan-headshot-4x5.webp' },
]

async function main() {
  for (const { png, webp } of FILES) {
    const src = path.join(SRC_DIR, png)
    const dest = path.join(SRC_DIR, webp)
    if (!fs.existsSync(src)) {
      console.warn(`Skip (missing): ${png}`)
      continue
    }
    const meta = await sharp(src).metadata()
    const out = await sharp(src)
      .webp({ quality: 85, effort: 6 })
      .toFile(dest)
    console.log(`${png} → ${webp} (${meta.width}x${meta.height}, ${(out.size / 1024).toFixed(1)} KB)`)
  }
  console.log('Done.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
