import { describe, expect, it } from "vitest";

import { CONCIERGE_VOICE } from "../../src/lib/agent-room/data/concierge-voice-lines";
import { FALLBACK_SAY } from "../../src/lib/agent-room/route-input";
import { SCENES } from "../../src/lib/agent-room/data/scenes";

describe("CONCIERGE_VOICE (CON-01 SSOT)", () => {
  it("opening scene uses the signature greeting", () => {
    const openingSay = SCENES.opening.find((act) => "say" in act);
    expect(openingSay && "say" in openingSay ? openingSay.say : "").toBe(
      CONCIERGE_VOICE.openingGreeting,
    );
  });

  it("router fallback matches refusal line", () => {
    expect(FALLBACK_SAY).toBe(CONCIERGE_VOICE.refusal);
  });

  it("self-names as Movemental Concierge on entry", () => {
    expect(CONCIERGE_VOICE.openingGreeting).toMatch(/Movemental Concierge/i);
  });
});
