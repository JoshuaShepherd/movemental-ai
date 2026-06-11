import { describe, expect, it } from "vitest";

import { beatScene } from "../../src/lib/agent-room/beat-scenes";
import { MAP_Q, computeMapRead } from "../../src/lib/agent-room/data/map-q";
import { MAP_EMAIL_CHIP_TARGET } from "../../src/lib/agent-room/suggest-chip-targets";

describe("beatScene post-readback flow", () => {
  it("Q1 gate fail goes straight to readback with conversion chips", () => {
    const read = computeMapRead([MAP_Q[0].opts[2]]);
    const scene = beatScene(0, 2, read);

    expect(scene.some((a) => "show" in a && a.show === "readback")).toBe(true);
    expect(scene.some((a) => "say" in a)).toBe(false);
    expect(scene.some((a) => "show" in a && a.show === "capture")).toBe(false);

    const suggestAct = scene.find((a) => "suggest" in a);
    expect(suggestAct && "suggest" in suggestAct).toBe(true);
    if (!suggestAct || !("suggest" in suggestAct)) return;

    expect(suggestAct.suggest.some((c) => c.label === "Get the free Field Guide")).toBe(true);
  });

  it("offers inline email copy via chip after full path — no full-screen map capture gate", () => {
    const answers = MAP_Q.map((q) => q.opts[0]);
    const read = computeMapRead(answers);
    const scene = beatScene(MAP_Q.length - 1, 0, read);

    expect(scene.some((a) => "show" in a && a.show === "readback")).toBe(true);
    expect(scene.some((a) => "show" in a && a.show === "capture")).toBe(false);

    const suggestAct = scene.find((a) => "suggest" in a);
    expect(suggestAct && "suggest" in suggestAct).toBe(true);
    if (!suggestAct || !("suggest" in suggestAct)) return;

    expect(suggestAct.suggest.some((c) => c.to === MAP_EMAIL_CHIP_TARGET)).toBe(true);
    expect(suggestAct.suggest.some((c) => c.label === "Email me a copy")).toBe(true);
  });

  it("gate pass advances to next beat without interstitial voice", () => {
    const read = computeMapRead([MAP_Q[0].opts[0]]);
    const scene = beatScene(0, 0, read);

    expect(scene.some((a) => "show" in a && a.show === "beat" && a.qi === 1)).toBe(true);
    expect(scene.some((a) => "say" in a)).toBe(false);
  });
});
