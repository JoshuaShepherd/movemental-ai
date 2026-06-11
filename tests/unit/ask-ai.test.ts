import { describe, expect, it } from "vitest";

import {
  ASK_AI_PROMPTS,
  ASK_AI_PROVIDERS,
  buildAskAiMarkdown,
  buildAskAiProviderUrls,
  resolveAskAiPrompt,
} from "../../src/lib/agent-room/ask-ai";

describe("ask-ai prompts", () => {
  it("resolves promptKey over default", () => {
    expect(resolveAskAiPrompt(undefined, "aboutFull")).toContain("movemental.ai/agent/about");
    expect(resolveAskAiPrompt(undefined, "aboutFull")).not.toBe(ASK_AI_PROMPTS.default);
  });

  it("prefers explicit prompt string", () => {
    expect(resolveAskAiPrompt("custom", "aboutFull")).toBe("custom");
  });

  it("falls back to default", () => {
    expect(resolveAskAiPrompt()).toBe(ASK_AI_PROMPTS.default);
  });

  it("catalog covers every wired surface", () => {
    const keys = [
      "default",
      "aboutFull",
      "aboutStub",
      "howWeUseAi",
      "movementVoices",
      "churchesTheCase",
      "churchesStart",
      "nonprofitsTheCase",
      "nonprofitsStart",
      "institutionsTheCase",
      "institutionsStart",
    ] as const;

    for (const key of keys) {
      expect(ASK_AI_PROMPTS[key].length).toBeGreaterThan(400);
      expect(ASK_AI_PROMPTS[key]).toMatch(/Continue/);
    }
  });
});

describe("ask-ai providers", () => {
  it("builds three provider URLs with encoded prompt", () => {
    const urls = buildAskAiProviderUrls("hello world");
    expect(urls.chatgpt).toBe("https://chatgpt.com/?q=hello%20world");
    expect(urls.claude).toBe("https://claude.ai/new?q=hello%20world");
    expect(urls.gemini).toBe("https://gemini.google.com/app?prompt=hello%20world");
  });

  it("exports chatgpt, claude, gemini in order", () => {
    expect(ASK_AI_PROVIDERS.map((p) => p.id)).toEqual(["chatgpt", "claude", "gemini"]);
  });
});

describe("buildAskAiMarkdown", () => {
  it("renders heading and three provider links by default", () => {
    const md = buildAskAiMarkdown({ promptKey: "aboutStub", heading: "Ask your AI about this" });
    expect(md).toContain("## Ask your AI about this");
    expect(md).toContain("[ChatGPT](");
    expect(md).toContain("[Claude](");
    expect(md).toContain("[Gemini](");
    expect(md).not.toContain("<details>");
    expect(md).toContain(encodeURIComponent(ASK_AI_PROMPTS.aboutStub.slice(0, 40)));
  });

  it("can include an optional collapsible prompt block", () => {
    const md = buildAskAiMarkdown({
      promptKey: "aboutStub",
      includePromptBlock: true,
    });
    expect(md).toContain("<details>");
    expect(md).toContain("<summary>Full prompt</summary>");
    expect(md).toContain(ASK_AI_PROMPTS.aboutStub.slice(0, 40));
  });

  it("embeds custom prompt text in provider URLs", () => {
    const md = buildAskAiMarkdown({ prompt: "short" });
    expect(md).not.toContain("<details>");
    expect(md).toContain("short");
  });
});
