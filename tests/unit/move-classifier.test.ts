import { describe, expect, it } from "vitest";

import {
  classifyChipTap,
  classifyMove,
  classifyTypedInput,
  isKnownScene,
} from "../../src/lib/agent-room/move-classifier";

describe("move-classifier", () => {
  const baseText = {
    type: "text" as const,
    phase: "guide" as const,
    freeTextStreak: 0,
    fallbackStreak: 0,
  };

  it("routes regex matches locally", () => {
    expect(classifyTypedInput({ ...baseText, text: "what does it cost" })).toEqual({
      kind: "local",
      scene: "cost",
    });
  });

  it("routes unmatched text to agent", () => {
    expect(
      classifyTypedInput({
        ...baseText,
        text: "our board uses ChatGPT for donor letters",
      }),
    ).toEqual({ kind: "agent", reason: "open_text" });
  });

  it("routes discuss phase text to agent", () => {
    expect(
      classifyTypedInput({ ...baseText, phase: "discuss", text: "anything" }),
    ).toEqual({ kind: "agent", reason: "discuss" });
  });

  it("routes chip taps to local scenes", () => {
    expect(classifyChipTap({ type: "chip", scene: "beatIntro" })).toEqual({
      kind: "local",
      scene: "beatIntro",
    });
  });

  it("classifies leader and beat handlers", () => {
    expect(classifyMove({ type: "leader" })).toEqual({ kind: "local", handler: "leader" });
    expect(classifyMove({ type: "beat" })).toEqual({ kind: "local", handler: "beat" });
  });

  it("knows static SCENES keys", () => {
    expect(isKnownScene("opening")).toBe(true);
    expect(isKnownScene("not-a-scene")).toBe(false);
    expect(isKnownScene("leaderWork")).toBe(true);
  });
});
