/**
 * Agent Room — extracted SSE turn handler (hybrid + stream modes).
 *
 * Pure async function: POST to the room proxy, drain SSE chunks, invoke callbacks.
 * React hooks supply ink/voice/state side effects via `AgentStreamCallbacks`.
 */
import type { RoomPhase } from "./discuss";
import { parseSSEBuffer, type ComponentId, type StreamChunk } from "./stream-chunk";

/** Public proxy path — not `…/stream` (Cloudflare WAF blocks POST to that segment). */
export const AGENT_ROOM_STREAM_PATH = "/api/agent-room/turn";

export type StreamTurn = { role: "user" | "assistant"; content: string };

/** Script position sent to the engine on AGENT-classified turns. */
export type RoomContext = {
  screenId?: string;
  lastScene?: string;
  phase?: RoomPhase;
  mapAnswersCount?: number;
  inLocalScene?: boolean;
};

export type SuggestChipPayload = {
  label: string;
  lead?: boolean;
  value: string;
};

export type AgentStreamCallbacks = {
  onTextDelta: (assistantSoFar: string) => void;
  onProgressThinking: () => void;
  onAgentHandoff: () => void;
  onUiRender: (component: ComponentId, props: Record<string, unknown>) => void;
  onInkGesture: (kind: "underline" | "circle" | "arrow", target: string) => void;
  onSuggest: (chips: SuggestChipPayload[]) => void;
  onError: (message: string) => void;
};

export type RunAgentStreamTurnInput = {
  message: string;
  sessionId: string;
  anonId: string;
  history: StreamTurn[];
  phase: RoomPhase;
  roomContext?: RoomContext;
  signal: AbortSignal;
  callbacks: AgentStreamCallbacks;
};

export type AgentStreamTurnResult =
  | { ok: true; assistant: string }
  | { ok: false; error: string; status?: number };

/** Dispatch one validated chunk to callbacks; returns updated assistant text. */
export function dispatchStreamChunk(
  chunk: StreamChunk,
  assistant: string,
  callbacks: AgentStreamCallbacks,
): string {
  switch (chunk.type) {
    case "text_delta": {
      const next = assistant + chunk.delta;
      callbacks.onTextDelta(next);
      return next;
    }
    case "progress":
      if (chunk.phase === "thinking" && !assistant) {
        callbacks.onProgressThinking();
      }
      break;
    case "agent_handoff":
      callbacks.onAgentHandoff();
      return "";
    case "ui_render":
      callbacks.onUiRender(chunk.component, (chunk.props ?? {}) as Record<string, unknown>);
      break;
    case "ink_gesture":
      callbacks.onInkGesture(chunk.kind, chunk.target);
      break;
    case "suggest":
      callbacks.onSuggest(chunk.chips);
      break;
    case "error":
      callbacks.onError(chunk.message);
      break;
    default:
      break;
  }
  return assistant;
}

/** Drain a chunk of SSE text from the reader buffer. */
export function drainSSEText(
  chunkText: string,
  buffer: string,
  assistant: string,
  callbacks: AgentStreamCallbacks,
): { buffer: string; assistant: string } {
  let buf = buffer + chunkText;
  const { chunks, remaining } = parseSSEBuffer(buf);
  buf = remaining;
  let acc = assistant;
  for (const ch of chunks) {
    acc = dispatchStreamChunk(ch, acc, callbacks);
  }
  return { buffer: buf, assistant: acc };
}

export async function runAgentStreamTurn(
  input: RunAgentStreamTurnInput,
): Promise<AgentStreamTurnResult> {
  const { message, sessionId, anonId, history, phase, roomContext, signal, callbacks } =
    input;

  try {
    const res = await fetch(AGENT_ROOM_STREAM_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal,
      body: JSON.stringify({
        message,
        sessionId,
        anonId,
        history: history.length ? history : undefined,
        phase,
        roomContext,
      }),
    });

    if (!res.ok || !res.body) {
      const body = (await res.json().catch(() => ({}))) as { error?: unknown };
      const msg =
        typeof body.error === "string" ? body.error : `Request failed (${res.status})`;
      return { ok: false, error: msg, status: res.status };
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let assistant = "";

    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      const drained = drainSSEText(decoder.decode(value, { stream: true }), buffer, assistant, callbacks);
      buffer = drained.buffer;
      assistant = drained.assistant;
    }
    if (buffer.trim()) {
      const drained = drainSSEText("\n\n", buffer, assistant, callbacks);
      assistant = drained.assistant;
    }

    return { ok: true, assistant };
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") {
      return { ok: false, error: "aborted" };
    }
    return { ok: false, error: e instanceof Error ? e.message : "Stream failed" };
  }
}
