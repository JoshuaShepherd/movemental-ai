import { describe, expect, it } from "vitest";

import {
  getLastStreamingAssistantContent,
  resolveAssistantForTurnEnd,
  TOOL_ONLY_ASSISTANT_FALLBACK,
  type ThreadTurn,
} from "../../src/lib/agent-room/thread";

describe("agent-room thread turn-end", () => {
  it("prefers SSE accumulator over streaming row", () => {
    const thread: ThreadTurn[] = [
      { role: "user", content: "Hi" },
      { role: "assistant", content: "Old preamble", streaming: true },
    ];
    expect(resolveAssistantForTurnEnd("Final answer.", thread, false)).toBe("Final answer.");
  });

  it("falls back to streaming row when accumulator is empty", () => {
    const thread: ThreadTurn[] = [
      { role: "user", content: "Hi" },
      { role: "assistant", content: "Let me show you that.", streaming: true },
    ];
    expect(resolveAssistantForTurnEnd("", thread, false)).toBe("Let me show you that.");
  });

  it("uses tool-only fallback when ui_render fired with no prose", () => {
    const thread: ThreadTurn[] = [{ role: "user", content: "Hi" }];
    expect(resolveAssistantForTurnEnd("", thread, true)).toBe(TOOL_ONLY_ASSISTANT_FALLBACK);
  });

  it("uses streaming fallback ref when thread state has not flushed", () => {
    expect(resolveAssistantForTurnEnd("", [], false, "Still streaming…")).toBe("Still streaming…");
  });

  it("returns null when no prose and no ui_render", () => {
    expect(resolveAssistantForTurnEnd("", [], false)).toBeNull();
  });

  it("getLastStreamingAssistantContent ignores empty streaming rows", () => {
    expect(
      getLastStreamingAssistantContent([{ role: "assistant", content: "  ", streaming: true }]),
    ).toBeNull();
  });
});
