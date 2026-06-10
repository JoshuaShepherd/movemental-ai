import { describe, expect, it, vi } from "vitest";

import {
  dispatchStreamChunk,
  drainSSEText,
} from "../../src/lib/agent-room/agent-stream-turn";

describe("agent-stream-turn", () => {
  it("dispatches text_delta cumulatively", () => {
    const onTextDelta = vi.fn();
    const assistant = dispatchStreamChunk(
      { type: "text_delta", delta: "Hello" },
      "",
      { onTextDelta, onProgressThinking: vi.fn(), onAgentHandoff: vi.fn(), onUiRender: vi.fn(), onInkGesture: vi.fn(), onSuggest: vi.fn(), onError: vi.fn() },
    );
    expect(assistant).toBe("Hello");
    expect(onTextDelta).toHaveBeenCalledWith("Hello");
  });

  it("drains SSE buffer with ink_gesture", () => {
    const onInkGesture = vi.fn();
    const { assistant } = drainSSEText(
      'data: {"type":"ink_gesture","kind":"circle","target":"#opts"}\n\n',
      "",
      "",
      {
        onTextDelta: vi.fn(),
        onProgressThinking: vi.fn(),
        onAgentHandoff: vi.fn(),
        onUiRender: vi.fn(),
        onInkGesture,
        onSuggest: vi.fn(),
        onError: vi.fn(),
      },
    );
    expect(assistant).toBe("");
    expect(onInkGesture).toHaveBeenCalledWith("circle", "#opts");
  });
});
