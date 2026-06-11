import { describe, expect, it } from "vitest";

import { beatScene } from "@/lib/agent-room/beat-scenes";
import { MAP_Q, computeMapRead } from "@/lib/agent-room/data/map-q";
import { MAP_EMAIL_CHIP_TARGET } from "@/lib/agent-room/suggest-chip-targets";

describe("beatScene post-readback flow", () => {
  it("offers inline email copy via chip — no full-screen map capture gate", () => {
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
});
