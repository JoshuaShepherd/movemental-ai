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

/**
 * Stall watchdog windows. The engine front-loads `progress` chunks (initializing
 * → context → thinking) before the first `text_delta`, so even a cold start
 * emits *something* well inside `CONNECT_TIMEOUT_MS`. Once chunks are flowing,
 * a gap longer than `IDLE_TIMEOUT_MS` means the upstream dropped — we cancel and
 * surface a retryable "stalled" rather than leaving the thinking pulse forever.
 */
export const CONNECT_TIMEOUT_MS = 45_000;
export const IDLE_TIMEOUT_MS = 30_000;

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
  /**
   * Optional: the host is consulting a tool (corpus lookup, map read, …).
   * `label` is a quiet, human-facing gerund ("consulting the field guide") —
   * the room surfaces it next to the thinking pulse, not as a chatbot tool panel.
   * Cleared (label `null`) when the tool resolves.
   */
  onToolActivity?: (label: string | null) => void;
};

/** Map an engine tool name to a calm, Ink-Band-voiced status line. */
const TOOL_LABELS: Record<string, string> = {
  file_search: "searching the archive",
  search_corpus: "searching the archive",
  request_diagnosis: "composing the read-back",
  render_beat: "laying out the reality check",
  render_readback: "writing the read-back",
  suggest_chips: "thinking through next steps",
};

function toolLabel(name: string): string {
  return TOOL_LABELS[name] ?? "consulting the field guide";
}

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
  | { ok: false; error: string; status?: number; retryable?: boolean };

/** Dispatch one validated chunk to callbacks; returns updated assistant text. */
export function dispatchStreamChunk(
  chunk: StreamChunk,
  assistant: string,
  callbacks: AgentStreamCallbacks,
): string {
  switch (chunk.type) {
    case "text_delta": {
      const next = assistant + chunk.delta;
      // First real prose ends any "consulting…" status.
      if (!assistant) callbacks.onToolActivity?.(null);
      callbacks.onTextDelta(next);
      return next;
    }
    case "progress":
      if (chunk.phase === "tool_call" && chunk.toolName) {
        callbacks.onToolActivity?.(
          chunk.status === "completed" ? null : toolLabel(chunk.toolName),
        );
      } else if (chunk.phase === "thinking" && !assistant) {
        callbacks.onProgressThinking();
      }
      break;
    case "tool_call":
      callbacks.onToolActivity?.(toolLabel(chunk.name));
      break;
    case "tool_result":
      callbacks.onToolActivity?.(null);
      break;
    case "agent_handoff":
      callbacks.onToolActivity?.(null);
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

  // Internal controller so a stall watchdog can cancel the request the same way
  // the caller's `signal` can. We track `stalled` to tell a timeout-abort apart
  // from a user-initiated abort in the catch.
  const ctrl = new AbortController();
  let stalled = false;
  const forwardAbort = () => ctrl.abort();
  if (signal.aborted) ctrl.abort();
  else signal.addEventListener("abort", forwardAbort, { once: true });

  let watchdog: ReturnType<typeof setTimeout> | undefined;
  const armWatchdog = (ms: number) => {
    if (watchdog) clearTimeout(watchdog);
    watchdog = setTimeout(() => {
      stalled = true;
      ctrl.abort();
    }, ms);
  };

  try {
    armWatchdog(CONNECT_TIMEOUT_MS);
    const res = await fetch(AGENT_ROOM_STREAM_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: ctrl.signal,
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
      // 5xx / 429 are transient — worth a retry. 4xx is the request itself.
      const retryable = res.status >= 500 || res.status === 429;
      return { ok: false, error: msg, status: res.status, retryable };
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let assistant = "";

    for (;;) {
      // Bound the wait for the next chunk; a silent upstream trips the timer.
      armWatchdog(IDLE_TIMEOUT_MS);
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
    if (stalled) {
      return { ok: false, error: "stalled", retryable: true };
    }
    if (e instanceof DOMException && e.name === "AbortError") {
      return { ok: false, error: "aborted" };
    }
    // Network-level failures (offline, DNS, connection reset) are worth a retry.
    return { ok: false, error: e instanceof Error ? e.message : "Stream failed", retryable: true };
  } finally {
    if (watchdog) clearTimeout(watchdog);
    signal.removeEventListener("abort", forwardAbort);
    callbacks.onToolActivity?.(null);
  }
}
