import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import {
  BEAT_CATALOG,
  BEAT_CORE_ORDER,
  BEAT_PROGRESS_TOTAL,
  type BeatId,
} from "../../src/lib/agent-room/data/beat-catalog";

const AGENTS_ROOM_SCENES = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../../../movemental-ai-agents/scripts/seed-data/scenes/room-scenes.ts",
);

function stripHtml(s: string): string {
  return s.replace(/<\/?em>/g, "");
}

describe("beat catalog SSOT (AU-04)", () => {
  it("defines six progress steps across core and branch beats", () => {
    for (const id of BEAT_CORE_ORDER) {
      expect(BEAT_CATALOG[id].progress).toEqual({
        step: BEAT_CORE_ORDER.indexOf(id) + 1,
        total: BEAT_PROGRESS_TOTAL,
      });
    }
    for (const id of ["refusals", "worry"] as BeatId[]) {
      expect(BEAT_CATALOG[id].progress).toEqual({ step: 6, total: BEAT_PROGRESS_TOTAL });
    }
  });

  it("matches movemental-ai-agents HOST_SCENES.beats when sibling repo is present", () => {
    if (!existsSync(AGENTS_ROOM_SCENES)) {
      return;
    }
    const source = readFileSync(AGENTS_ROOM_SCENES, "utf8");
    for (const id of Object.keys(BEAT_CATALOG) as BeatId[]) {
      const entry = BEAT_CATALOG[id];
      const plain = stripHtml(entry.question);
      expect(source.includes(entry.question) || source.includes(plain)).toBe(true);
      for (const opt of entry.options) {
        expect(source).toContain(opt.label);
      }
    }
  });

  it("exports stable question text for contract hashing", () => {
    const snapshot = (Object.keys(BEAT_CATALOG) as BeatId[]).map((id) => ({
      beatId: id,
      question: stripHtml(BEAT_CATALOG[id].question),
      options: BEAT_CATALOG[id].options.map((o) => o.label),
    }));
    expect(snapshot).toMatchSnapshot();
  });
});
