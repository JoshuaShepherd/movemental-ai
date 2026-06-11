import { describe, expect, it, vi } from "vitest";

import {
  dispatchStreamChunk,
  drainSSEText,
  type AgentStreamCallbacks,
} from "../../src/lib/agent-room/agent-stream-turn";

function callbacks(overrides: Partial<AgentStreamCallbacks> = {}): AgentStreamCallbacks {
  return {
    onTextDelta: vi.fn(),
    onProgressThinking: vi.fn(),
    onAgentHandoff: vi.fn(),
    onUiRender: vi.fn(),
    onInkGesture: vi.fn(),
    onSuggest: vi.fn(),
    onError: vi.fn(),
    onToolActivity: vi.fn(),
    ...overrides,
  };
}

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

  it("surfaces a tool-activity label on tool_call and clears it on tool_result", () => {
    const onToolActivity = vi.fn();
    const cb = callbacks({ onToolActivity });
    dispatchStreamChunk(
      { type: "tool_call", id: "tc1", name: "request_diagnosis", input: {} },
      "",
      cb,
    );
    expect(onToolActivity).toHaveBeenLastCalledWith("composing the read-back");
    dispatchStreamChunk({ type: "tool_result", id: "tc1", output: {} }, "", cb);
    expect(onToolActivity).toHaveBeenLastCalledWith(null);
  });

  it("labels file_search tool activity for the thinking pulse", () => {
    const onToolActivity = vi.fn();
    dispatchStreamChunk(
      { type: "tool_call", id: "fs1", name: "file_search", input: { query: "safety" } },
      "",
      callbacks({ onToolActivity }),
    );
    expect(onToolActivity).toHaveBeenCalledWith("searching the archive");
  });

  it("falls back to a generic label for unknown tools", () => {
    const onToolActivity = vi.fn();
    dispatchStreamChunk(
      { type: "tool_call", id: "tc2", name: "mystery_lookup", input: {} },
      "",
      callbacks({ onToolActivity }),
    );
    expect(onToolActivity).toHaveBeenCalledWith("consulting the field guide");
  });

  it("clears tool activity once the first prose delta arrives", () => {
    const onToolActivity = vi.fn();
    // Mid-stream deltas (assistant already non-empty) do not re-clear.
    dispatchStreamChunk({ type: "text_delta", delta: " more" }, "Hi", callbacks({ onToolActivity }));
    expect(onToolActivity).not.toHaveBeenCalled();
    // The first delta (empty assistant) ends any "consulting…" status.
    dispatchStreamChunk({ type: "text_delta", delta: "Hi" }, "", callbacks({ onToolActivity }));
    expect(onToolActivity).toHaveBeenCalledWith(null);
  });
});
