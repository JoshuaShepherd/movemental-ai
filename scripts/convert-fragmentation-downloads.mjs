/**
 * One-shot: convert Downloads Gemini PNGs → optimized WebP in public/images/fragmentation-story/
 * Run: node scripts/convert-fragmentation-downloads.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DOWNLOADS = "/Users/joshuashepherd/Downloads";
const OUT = path.join(process.cwd(), "public/images/fragmentation-story");

/** [sourceFilename, destWebpName] */
const MAP = [
  ["Gemini_Generated_Image_1cwqsr1cwqsr1cwq.png", "email-thread-multi-participant.webp"],
  ["Gemini_Generated_Image_3nrci43nrci43nrc.png", "book-fragments-of-form.webp"],
  ["Gemini_Generated_Image_4j94sf4j94sf4j94.png", "module-formal-systems-intro.webp"],
  ["Gemini_Generated_Image_745lbe745lbe745l.png", "core-hub-to-fragment-nodes.webp"],
  ["Gemini_Generated_Image_ccby51ccby51ccby.png", "cover-structural-fragments-investigation.webp"],
  ["Gemini_Generated_Image_cxk612cxk612cxk6.png", "message-thread-staggered-fragments.webp"],
  ["Gemini_Generated_Image_f34h2qf34h2qf34h.png", "cover-principles-design-fragmentation.webp"],
  ["Gemini_Generated_Image_guuk64guuk64guuk.png", "stage-presentation-three-shapes.webp"],
  ["Gemini_Generated_Image_lmkn6hlmkn6hlmkn.png", "mobile-chat-skeleton-bubbles.webp"],
  ["Gemini_Generated_Image_pjpbnppjpbnppjpb.png", "podcast-card-abstract-structures.webp"],
  ["Gemini_Generated_Image_pxmihcpxmihcpxmi.png", "sketch-converge-diverge-flow.webp"],
  ["Gemini_Generated_Image_qwcpdiqwcpdiqwcp.png", "formal-design-systems-split-flow.webp"],
  ["Gemini_Generated_Image_sxhe9lsxhe9lsxhe.png", "order-of-service-structured-units.webp"],
  ["Gemini_Generated_Image_u20qs4u20qs4u20q.png", "session-essential-structures-card.webp"],
  ["Gemini_Generated_Image_1mw8191mw8191mw8.png", "editorial-fragmentation-thesis-article.webp"],
  ["Gemini_Generated_Image_2dvobd2dvobd2dvo.png", "editorial-journal-entry-fragment.webp"],
  ["Gemini_Generated_Image_85zjbs85zjbs85zj.png", "editorial-unified-search-surface.webp"],
  ["Gemini_Generated_Image_csbzbscsbzbscsbz.png", "editorial-ai-reasoning-stream.webp"],
  ["Gemini_Generated_Image_itu8pyitu8pyitu8.png", "editorial-seo-visibility-fragmentation.webp"],
  ["Gemini_Generated_Image_nwjp14nwjp14nwjp.png", "editorial-transition-metrics-brief.webp"],
  ["Gemini_Generated_Image_z0z9bvz0z9bvz0z9.png", "editorial-relationship-crm-activity.webp"],
];

async function main() {
  await fs.promises.mkdir(OUT, { recursive: true });
  for (const [srcName, destName] of MAP) {
    const src = path.join(DOWNLOADS, srcName);
    const dest = path.join(OUT, destName);
    if (!fs.existsSync(src)) {
      console.error("Missing:", src);
      process.exitCode = 1;
      continue;
    }
    await sharp(src)
      .rotate()
      .resize({ width: 1400, height: 1400, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(dest);
    const st = await fs.promises.stat(dest);
    console.log(destName, "→", Math.round(st.size / 1024), "KB");
  }
}

main();
