import { describe, expect, it } from "vitest";

import {
  DEFAULT_THINKING_STATUS,
  resolveProgressStatus,
  THINKING_STATUS,
} from "../../src/lib/agent-room/thinking-status";

describe("thinking-status", () => {
  it("prefers engine progress message", () => {
    expect(
      resolveProgressStatus({ phase: "thinking", message: "Checking your corpus…" }, false),
    ).toBe("Checking your corpus…");
  });

  it("maps phases to default status lines", () => {
    expect(resolveProgressStatus({ phase: "initializing" }, false)).toBe(
      THINKING_STATUS.initializing,
    );
    expect(resolveProgressStatus({ phase: "context" }, false)).toBe(THINKING_STATUS.context);
    expect(resolveProgressStatus({ phase: "thinking" }, false)).toBe(THINKING_STATUS.thinking);
  });

  it("suppresses status once assistant text exists", () => {
    expect(resolveProgressStatus({ phase: "thinking" }, true)).toBeNull();
  });

  it("exposes a default for empty thinking UI", () => {
    expect(DEFAULT_THINKING_STATUS).toBe(THINKING_STATUS.thinking);
  });
});
