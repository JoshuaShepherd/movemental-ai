/**
 * Sync live agent-room screen copy from TypeScript SSOT into agent-orchestration docs.
 *
 *   pnpm agent-orchestration:sync-screen-copy
 *   pnpm agent-orchestration:sync-screen-copy --check
 *
 * Source: src/lib/agent-room/data/*-copy.ts
 * Targets: page-scripts, movemental-room-script, room-host prompt (marked LIVE-COPY blocks)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { HOME_SCREEN_COPY } from "../src/lib/agent-room/data/home-copy";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");
const PACK_ROOT = path.join(REPO_ROOT, "docs/build/agent-orchestration");

const CHECK = process.argv.includes("--check");

type ScreenSync = {
  id: string;
  headline: string;
  bodyMarkdown: string;
  bodyPlain: string;
};

function homeBodyMarkdown(): string {
  return `${HOME_SCREEN_COPY.bodyBeforePhrase} **${HOME_SCREEN_COPY.phrase}**${HOME_SCREEN_COPY.bodyAfterPhrase}`;
}

function homeBodyPlain(): string {
  return `${HOME_SCREEN_COPY.bodyBeforePhrase} ${HOME_SCREEN_COPY.phrase}${HOME_SCREEN_COPY.bodyAfterPhrase}`;
}

const HOME_SYNC: ScreenSync = {
  id: "home",
  headline: HOME_SCREEN_COPY.headline,
  bodyMarkdown: homeBodyMarkdown(),
  bodyPlain: homeBodyPlain(),
};

function replaceMarkedBlock(content: string, id: string, inner: string): string {
  const begin = `<!-- LIVE-COPY:${id}:begin`;
  const end = `<!-- LIVE-COPY:${id}:end -->`;
  const startIdx = content.indexOf(begin);
  const endIdx = content.indexOf(end);
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    throw new Error(`Missing LIVE-COPY markers for "${id}"`);
  }
  const lineEnd = content.indexOf("\n", startIdx);
  const blockStart = lineEnd === -1 ? startIdx : lineEnd + 1;
  return content.slice(0, blockStart) + inner + content.slice(endIdx);
}

function syncHomePageScript(content: string): string {
  const inner = `**Headline:**  
*"${HOME_SYNC.headline}"*

**Body:**  
*"${HOME_SYNC.bodyMarkdown}"*

**Leader band:** Scrollable portraits of movement leaders (names and credentials from the leaders data). Each portrait is tappable.

`;
  return replaceMarkedBlock(content, "home", inner);
}

function syncRoomScript(content: string): string {
  const inner = `- Headline: "${HOME_SYNC.headline}"
- Body with \`#phrase\` gesture target: "…without losing **${HOME_SCREEN_COPY.phrase}**${HOME_SCREEN_COPY.bodyAfterPhrase}"
- Leader portrait band (17 leaders from \`leaders.ts\`)

`;
  return replaceMarkedBlock(content, "home-screen", inner);
}

function syncRoomHost(content: string): string {
  const inner = `- *Screen copy:* H1 "${HOME_SYNC.headline}" Body: "${HOME_SYNC.bodyPlain.replace(HOME_SCREEN_COPY.phrase, `**${HOME_SCREEN_COPY.phrase}**`)}" Below it, a band of movement-leader portraits (tapping one opens that leader's \`leader\` screen).

`;
  return replaceMarkedBlock(content, "home-host", inner);
}

function readOrThrow(relPath: string): string {
  const abs = path.join(PACK_ROOT, relPath);
  return fs.readFileSync(abs, "utf8");
}

function writeIfChanged(relPath: string, next: string): boolean {
  const abs = path.join(PACK_ROOT, relPath);
  const prev = fs.readFileSync(abs, "utf8");
  if (prev === next) return false;
  if (CHECK) {
    console.error(`Drift: ${relPath} is out of sync with src/lib/agent-room/data/home-copy.ts`);
    console.error(`  Run: pnpm agent-orchestration:sync-screen-copy`);
    return true;
  }
  fs.writeFileSync(abs, next);
  console.error(`Updated ${relPath}`);
  return true;
}

function main() {
  const targets: Array<{ rel: string; transform: (s: string) => string }> = [
    { rel: "page-scripts/01-home.md", transform: syncHomePageScript },
    { rel: "movemental-room-script.md", transform: syncRoomScript },
    { rel: "engine/prompts/room-host.md", transform: syncRoomHost },
  ];

  let changed = false;
  for (const { rel, transform } of targets) {
    const prev = readOrThrow(rel);
    const next = transform(prev);
    if (writeIfChanged(rel, next)) changed = true;
  }

  if (CHECK) {
    if (changed) process.exit(1);
    console.error("Agent orchestration screen copy is in sync.");
    return;
  }

  if (!changed) {
    console.error("Agent orchestration screen copy already in sync.");
  }
}

main();
