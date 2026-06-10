import { describe, expect, it } from "vitest";

import {
  BEAT_INTRO_CHOREOGRAPHY,
  LOCAL_CHOREOGRAPHY,
  OPENING_CHOREOGRAPHY,
} from "../../src/lib/agent-room/local-choreography";
import { SCENES } from "../../src/lib/agent-room/data/scenes";

describe("LOCAL_CHOREOGRAPHY (PAR-01)", () => {
  it("documents opening + beatIntro as LOCAL beats", () => {
    expect(Object.keys(LOCAL_CHOREOGRAPHY).sort()).toEqual(["beatIntro", "opening"]);
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

  it("BEAT_INTRO_CHOREOGRAPHY has two say lines, no suggest", () => {
    const says = BEAT_INTRO_CHOREOGRAPHY.filter((a) => "say" in a);
    expect(says).toHaveLength(2);
    expect(BEAT_INTRO_CHOREOGRAPHY.some((a) => "suggest" in a)).toBe(false);
  });
});
