import { describe, expect, it } from "vitest";

import {
  LOCAL_CHOREOGRAPHY,
  OPENING_CHOREOGRAPHY,
  TO_BEAT_COLD_VOICE_CHOREOGRAPHY,
} from "../../src/lib/agent-room/local-choreography";
import { SCENES } from "../../src/lib/agent-room/data/scenes";

describe("LOCAL_CHOREOGRAPHY (PAR-01)", () => {
  it("documents opening + toBeatCold voice as LOCAL beats", () => {
    expect(Object.keys(LOCAL_CHOREOGRAPHY).sort()).toEqual(["opening", "toBeatCold"]);
  });

  it("OPENING_CHOREOGRAPHY has say + gesture, no show/suggest", () => {
    expect(OPENING_CHOREOGRAPHY.some((a) => "say" in a)).toBe(true);
    expect(OPENING_CHOREOGRAPHY.some((a) => "gesture" in a)).toBe(true);
    expect(OPENING_CHOREOGRAPHY.some((a) => "show" in a)).toBe(false);
    expect(OPENING_CHOREOGRAPHY.some((a) => "suggest" in a)).toBe(false);
  });

  it("OPENING_CHOREOGRAPHY matches ink acts from SCENES.opening", () => {
    const expected = SCENES.opening.filter((a) => !("show" in a) && !("suggest" in a));
    expect(OPENING_CHOREOGRAPHY).toEqual(expected);
  });

  it("TO_BEAT_COLD_VOICE_CHOREOGRAPHY has one say line, no suggest", () => {
    const says = TO_BEAT_COLD_VOICE_CHOREOGRAPHY.filter((a) => "say" in a);
    expect(says).toHaveLength(1);
    expect(TO_BEAT_COLD_VOICE_CHOREOGRAPHY.some((a) => "show" in a)).toBe(false);
    expect(TO_BEAT_COLD_VOICE_CHOREOGRAPHY.some((a) => "suggest" in a)).toBe(false);
  });
});
