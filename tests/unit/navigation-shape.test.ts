import { describe, expect, it } from "vitest";

import {
  classifyTypedInput,
} from "../../src/lib/agent-room/move-classifier";
import {
  composerSendHint,
  contentTokens,
  navigationShape,
} from "../../src/lib/agent-room/navigation-shape";

describe("navigationShape (G3)", () => {
  const fixtures: Array<{ input: string; route: ReturnType<typeof navigationShape> }> = [
    { input: "cost", route: "cost" },
    { input: "pricing", route: "cost" },
    { input: "what does it cost?", route: "cost" },
    { input: "tell me about movemental", route: "whatIs" },
    { input: "contact", route: "talkToUs" },
    { input: "whole path", route: "toPath" },
    { input: "founders", route: "whoBehind" },
    { input: "i'm worried about what AI will cost us in trust", route: null },
    { input: "question about donors", route: null },
    { input: "how should we think about AI and our donors?", route: null },
    { input: "I have a question about donors and AI", route: null },
    { input: "What's their philosophy", route: null },
  ];

  it.each(fixtures)("navigationShape(%j) → $route", ({ input, route }) => {
    expect(navigationShape(input)).toBe(route);
  });

  it("strips filler tokens for length check", () => {
    expect(contentTokens("what does it cost")).toEqual(["cost"]);
  });
});

describe("composerSendHint (G2)", () => {
  it("hints page open for navigation-shaped input", () => {
    expect(composerSendHint("pricing")).toBe("↵ opens the pricing page");
  });

  it("hints chat for non-navigation input", () => {
    expect(composerSendHint("how should we think about AI and our donors?")).toBe(
      "↵ starts a chat",
    );
  });
});

describe("classifyTypedInput uses navigationShape", () => {
  const base = {
    type: "text" as const,
    phase: "guide" as const,
    freeTextStreak: 0,
    fallbackStreak: 0,
  };

  it("routes keyword-in-long-sentence to AGENT", () => {
    expect(
      classifyTypedInput({
        ...base,
        text: "i'm worried about what AI will cost us in trust",
      }),
    ).toEqual({ kind: "agent", reason: "open_text" });
  });
});
