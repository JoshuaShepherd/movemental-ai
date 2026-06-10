import { describe, expect, it } from "vitest";

import {
  BEAT_INTRO_AGENT_CHIPS,
  resolveStreamChipRoute,
} from "../../src/lib/agent-room/composer-routing";

describe("composer routing (PAR-02)", () => {
  it("routes lead chip to local beatIntro", () => {
    const route = resolveStreamChipRoute({
      label: "Get a clear next AI step",
      say: "Get a clear next AI step",
      lead: true,
    });
    expect(route).toEqual({ kind: "local", scene: "beatIntro" });
  });

  it("routes info chips to agent utterances", () => {
    expect(
      resolveStreamChipRoute({ label: "About Movemental", say: "About Movemental" }),
    ).toEqual({ kind: "agent", utterance: "About Movemental" });
    expect(
      resolveStreamChipRoute({ label: "What does it cost?", say: "What does it cost?" }),
    ).toEqual({ kind: "agent", utterance: "What does it cost?" });
  });

  it("exposes beatIntro follow-up chip for agent handoff", () => {
    expect(BEAT_INTRO_AGENT_CHIPS).toEqual([
      { label: "Okay, map it", utterance: "Okay, map it", lead: true },
    ]);
  });
});
