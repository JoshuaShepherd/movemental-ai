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

  it("routes regex matches locally via navigation shape", () => {
    expect(classifyTypedInput({ ...baseText, text: "what does it cost" })).toEqual({
      kind: "local",
      scene: "cost",
    });
    expect(classifyTypedInput({ ...baseText, text: "tell me about movemental" })).toEqual({
      kind: "local",
      scene: "whatIs",
    });
    expect(classifyTypedInput({ ...baseText, text: "whole path" })).toEqual({
      kind: "local",
      scene: "toPath",
    });
    expect(classifyTypedInput({ ...baseText, text: "get a clear next step" })).toEqual({
      kind: "local",
      scene: "toSafetyFlow",
    });
    expect(classifyTypedInput({ ...baseText, text: "map where we stand" })).toEqual({
      kind: "local",
      scene: "toSafetyFlow",
    });
  });

  it("routes philosophy in non-leading position to agent (G3)", () => {
    expect(classifyTypedInput({ ...baseText, text: "What's their philosophy" })).toEqual({
      kind: "agent",
      reason: "open_text",
    });
  });

  it("routes ambiguous about-phrases away from whatIs on first collapsed message", () => {
    expect(
      classifyTypedInput({
        ...baseText,
        text: "question about donors",
      }),
    ).toEqual({ kind: "agent", reason: "open_text" });
    const boardConcern = classifyTypedInput({
      ...baseText,
      text: "concern about our board",
    });
    expect(boardConcern).not.toEqual({ kind: "local", scene: "whatIs" });
  });

  it("routes unmatched text to agent", () => {
    expect(
      classifyTypedInput({
        ...baseText,
        text: "xyzzy completely unmatched phrase here",
      }),
    ).toEqual({ kind: "agent", reason: "open_text" });
  });

  it("routes ambiguous first messages to agent even when regex loosely matches", () => {
    expect(
      classifyTypedInput({
        ...baseText,
        text: "I have a question about donors and AI",
      }),
    ).toEqual({ kind: "agent", reason: "open_text" });
  });

  it("routes the same free-form question to agent on turn 1 and turn 2", () => {
    const text = "I'm curious how you think about AI in churches";
    expect(classifyTypedInput({ ...baseText, text })).toEqual({
      kind: "agent",
      reason: "open_text",
    });
    expect(classifyTypedInput({ ...baseText, text, chatActive: true })).toEqual({
      kind: "agent",
      reason: "open_text",
    });
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

  it("routes active chat text to agent when dock is expanded", () => {
    expect(
      classifyTypedInput({
        ...baseText,
        text: "what does it cost",
        chatActive: true,
      }),
    ).toEqual({ kind: "agent", reason: "open_text" });
  });

  it("chatActive mirrors dockState === expanded", () => {
    const expanded = classifyTypedInput({
      ...baseText,
      text: "what does it cost",
      chatActive: true,
    });
    const collapsed = classifyTypedInput({
      ...baseText,
      text: "what does it cost",
      chatActive: false,
    });
    expect(expanded).toEqual({ kind: "agent", reason: "open_text" });
    expect(collapsed).toEqual({ kind: "local", scene: "cost" });
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
