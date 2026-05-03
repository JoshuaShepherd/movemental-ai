/**
 * One-off: ingest hero PNGs from ~/Downloads → public/images/site/*.webp
 * Run: pnpm exec tsx scripts/ingest-download-heroes.mts
 */
import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const dl = path.join(process.env.HOME ?? "", "Downloads");
const outDir = path.join(process.cwd(), "public/images/site");

type Job = { src: string; dest: string; maxW: number; quality: number };

const jobs: Job[] = [
  { src: "joshua.2270_Architectural_interior_bright_atrium_white_plaster__eafa7284-4ba2-4389-a56c-a436eab1ae7e.png", dest: "hero-atrium-bright-plaster.webp", maxW: 2400, quality: 84 },
  { src: "joshua.2270_Documentary_editorial_photograph_Alan_Hirsch_real_n_2918585a-463e-49e9-91a6-add1bdfdf3d4.png", dest: "hero-alan-documentary.webp", maxW: 1600, quality: 85 },
  { src: "joshua.2270_Editorial_photograph_curated_bookshelf_beside_simpl_2a8e2ed3-30a5-4651-a7f2-0ba906cbd316.png", dest: "hero-bookshelf-editorial.webp", maxW: 2200, quality: 84 },
  { src: "joshua.2270_Editorial_photograph_modern_operations_floor_unoccu_3585ddf7-9b7c-4364-bc5a-fced31bdf968.png", dest: "hero-operations-floor-wide.webp", maxW: 2400, quality: 84 },
  { src: "joshua.2270_Editorial_photograph_strategy_session_aftermath_org_f27f86a2-859a-4ca4-86e4-9513677f03f2.png", dest: "hero-strategy-session-wide.webp", maxW: 2400, quality: 84 },
  { src: "joshua.2270_Editorial_still_life_curated_wall_of_framed_essays__4e250f84-7c9b-4ed1-bac4-c35f9a47a21e.png", dest: "hero-framed-essays-wall-a.webp", maxW: 1200, quality: 86 },
  { src: "joshua.2270_Editorial_still_life_curated_wall_of_framed_essays__6b1a9e7c-b87e-4f40-8192-5e18cbd13597.png", dest: "hero-framed-essays-wall-b.webp", maxW: 1200, quality: 86 },
  { src: "joshua.2270_Midnight_city_bokeh_abstract_lights_soft_ellipses_d_e4d76523-838e-451f-8e83-b57a6de28b5a.png", dest: "hero-midnight-city-bokeh-wide.webp", maxW: 2400, quality: 82 },
  { src: "joshua.2270_Overhead_editorial_photograph_organized_desk_index__10e87d16-2b1f-4665-9593-bdde47fde0fa.png", dest: "hero-desk-overhead-organized.webp", maxW: 2200, quality: 84 },
  { src: "joshua.2270_Seamless_abstract_texture_for_dark_UI_band_fine_noi_052b01a3-9d8e-4749-98b0-d9d13565f72c.png", dest: "hero-midnight-seamless-texture-wide.webp", maxW: 2400, quality: 82 },
  { src: "joshua.2270_Wide_editorial_photograph_calm_desk_with_notebook_a_86ce6963-285c-4143-99f9-ad5e72f7c6a8.png", dest: "hero-desk-calm-notebook-wide.webp", maxW: 2400, quality: 84 },
];

await fs.mkdir(outDir, { recursive: true });
for (const j of jobs) {
  const input = path.join(dl, j.src);
  await sharp(input)
    .rotate()
    .resize({ width: j.maxW, withoutEnlargement: true, fit: "inside" })
    .webp({ quality: j.quality, effort: 5, smartSubsample: true })
    .toFile(path.join(outDir, j.dest));
  const st = await fs.stat(path.join(outDir, j.dest));
  console.log(j.dest, Math.round(st.size / 1024), "KB");
}
