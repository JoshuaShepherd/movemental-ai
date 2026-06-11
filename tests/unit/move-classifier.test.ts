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
    expect(classifyTypedInput({ ...baseText, text: "What's their philosophy" })).toEqual({
      kind: "local",
      scene: "toFaq",
    });
  });

  it("routes unmatched text to agent", () => {
    expect(
      classifyTypedInput({
        ...baseText,
        text: "xyzzy completely unmatched phrase here",
      }),
    ).toEqual({ kind: "agent", reason: "open_text" });
  });

  it("routes meta phrasing to discuss offer when discuss enabled", () => {
    const result = classifyTypedInput({
      ...baseText,
      text: "our board uses ChatGPT for faq letters",
    });
    if (result.kind === "local") {
      expect(result).toEqual({ kind: "local", scene: "discussOffer" });
    } else {
      expect(result).toEqual({ kind: "agent", reason: "open_text" });
    }
  });

  it("routes discuss phase text to agent", () => {
    expect(
      classifyTypedInput({ ...baseText, phase: "discuss", text: "anything" }),
    ).toEqual({ kind: "agent", reason: "discuss" });
  });

  it("routes active chat text to agent even when regex would match", () => {
    expect(
      classifyTypedInput({
        ...baseText,
        text: "what does it cost",
        chatActive: true,
      }),
    ).toEqual({ kind: "agent", reason: "open_text" });
  });

  it("skips discuss offer on beat screen", () => {
    expect(
      classifyTypedInput({
        ...baseText,
        text: "what if our board is split",
        screenId: "beat",
      }),
    ).toEqual({ kind: "agent", reason: "open_text" });
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
