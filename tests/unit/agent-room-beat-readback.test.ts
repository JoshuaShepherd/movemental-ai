import { describe, expect, it } from "vitest";

import { beatScene } from "../../src/lib/agent-room/beat-scenes";
import { BEAT_CORE_ORDER } from "../../src/lib/agent-room/data/beat-catalog";
import { MAP_Q, computeMapRead } from "../../src/lib/agent-room/data/map-q";
import { MAP_EMAIL_CHIP_TARGET } from "../../src/lib/agent-room/suggest-chip-targets";

const DECISION_INDEX = BEAT_CORE_ORDER.indexOf("decision");

describe("beatScene post-readback flow", () => {
  it("decision gate fail voices Safety readback then shows conversion chips", () => {
    const prior = Array.from({ length: DECISION_INDEX }, () => null);
    const read = computeMapRead([...prior, MAP_Q[DECISION_INDEX].opts[2]]);
    const scene = beatScene(DECISION_INDEX, 2, read, [...prior, MAP_Q[DECISION_INDEX].opts[2]]);

    expect(scene.some((a) => "show" in a && a.show === "readback")).toBe(true);
    expect(scene.some((a) => "say" in a && a.say.includes("Safety"))).toBe(true);
    expect(scene.some((a) => "show" in a && a.show === "capture")).toBe(false);

    const suggestAct = scene.find((a) => "suggest" in a);
    expect(suggestAct && "suggest" in suggestAct).toBe(true);
    if (!suggestAct || !("suggest" in suggestAct)) return;

    expect(suggestAct.suggest.some((c) => c.to === "toSafetyFlowDiy")).toBe(true);
    expect(suggestAct.suggest.some((c) => c.to === "toSafetyFlowSignup")).toBe(true);
  });

  it("offers inline email copy via chip after full path — no full-screen map capture gate", () => {
    const answers = MAP_Q.map((q) => q.opts[0]);
    const read = computeMapRead(answers);
    const scene = beatScene(BEAT_CORE_ORDER.length, 0, read, answers);

    expect(scene.some((a) => "show" in a && a.show === "readback")).toBe(true);
    expect(scene.some((a) => "show" in a && a.show === "capture")).toBe(false);

    const suggestAct = scene.find((a) => "suggest" in a);
    expect(suggestAct && "suggest" in suggestAct).toBe(true);
    if (!suggestAct || !("suggest" in suggestAct)) return;

    expect(suggestAct.suggest.some((c) => c.to === MAP_EMAIL_CHIP_TARGET)).toBe(true);
    expect(suggestAct.suggest.some((c) => c.label === "Email me a copy")).toBe(true);
  });

  it("gate pass advances to next beat without interstitial voice", () => {
    const prior = Array.from({ length: DECISION_INDEX }, () => null);
    const pass = MAP_Q[DECISION_INDEX].opts[0];
    const read = computeMapRead([...prior, pass]);
    const scene = beatScene(DECISION_INDEX, 0, read, [...prior, pass]);

    expect(scene.some((a) => "show" in a && a.show === "beat" && a.qi === DECISION_INDEX + 1)).toBe(
      true,
    );
    expect(scene.some((a) => "say" in a)).toBe(false);
  });
});
