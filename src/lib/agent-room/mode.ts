/**
 * Agent Room runtime mode — the stub ↔ stream switch (AF-01).
 *
 * - `"stub"`   — the migrated Ink Band prototype: a local `play()` runner over
 *                ported `SCENES`, **no network**. The **default** — full scripted
 *                choreography (say, gestures, leader FLIP, chip → scene routing).
 * - `"stream"` — the live agent: `useAgentRoomStream` + `/api/agent-room/stream`
 *                (SSE) against `movemental-ai-agents`. Opt in when the engine is
 *                up and you want LLM-driven turns on top of the same UI shell.
 *
 * Opt into stream with `NEXT_PUBLIC_AGENT_ROOM_MODE=stream`. The value is read at
 * module load (build-time inlined for the client), so it is constant per render —
 * `AgentRoom` can dispatch on it without violating the rules of hooks.
 */
export type AgentRoomMode = "stub" | "stream";

export const AGENT_ROOM_MODE: AgentRoomMode =
  (process.env.NEXT_PUBLIC_AGENT_ROOM_MODE as AgentRoomMode | undefined) ?? "stub";
