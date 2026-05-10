/**
 * Exports Movement Voices graph data (home credibility band) into the static
 * HTML preview under docs/html/scenius-network-v2/.
 *
 * Run after editing `src/components/sections-mock/home/voices-graph-data.ts`:
 *   pnpm docs:sync-movement-voices-html
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  CENTER_NODE_ID,
  MOVEMENT_VOICES,
  MOVEMENTAL_CENTER,
} from "../src/components/sections-mock/home/voices-graph-data";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const outDir = join(repoRoot, "docs/html/scenius-network-v2");

mkdirSync(outDir, { recursive: true });

function htmlAssetPath(abs: string): string {
  if (!abs.startsWith("/")) return abs;
  return `../../../public${abs}`;
}

const payload = {
  centerNodeId: CENTER_NODE_ID,
  centerLabel: MOVEMENTAL_CENTER.label,
  voices: MOVEMENT_VOICES.map((v) => ({
    ...v,
    imageSrcHtml: htmlAssetPath(v.imageSrc),
  })),
};

writeFileSync(join(outDir, "movement-voices-graph.json"), `${JSON.stringify(payload, null, 2)}\n`);
writeFileSync(
  join(outDir, "movement-voices-graph-embedded.js"),
  `window.__MOVEMENT_VOICES_GRAPH__ = ${JSON.stringify(payload)};\n`,
);

console.log(`Wrote ${join(outDir, "movement-voices-graph.json")}`);
console.log(`Wrote ${join(outDir, "movement-voices-graph-embedded.js")}`);
