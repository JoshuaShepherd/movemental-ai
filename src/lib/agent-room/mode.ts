/**
 * Agent Room runtime mode — the stub ↔ stream switch (AF-01).
 *
 * - `"stream"` — the live agent: `useAgentRoomStream` + `/api/agent-room/stream`
 *                (SSE) against `movemental-ai-agents`. The **default** since
 *                INT-07 (live happy-path + fallback proven end-to-end).
 * - `"stub"`   — the migrated Ink Band prototype: a local `play()` runner over
 *                ported `SCENES`, **no network**. The permanent offline fallback
 *                for demos / engine-down; opt in with the env flag below.
 *
 * Force offline with `NEXT_PUBLIC_AGENT_ROOM_MODE=stub`. The value is read at module
 * load (build-time inlined for the client), so it is constant per render —
 * `AgentRoom` can dispatch on it without violating the rules of hooks.
 */
export type AgentRoomMode = "stub" | "stream";

export const AGENT_ROOM_MODE: AgentRoomMode =
  (process.env.NEXT_PUBLIC_AGENT_ROOM_MODE as AgentRoomMode | undefined) ?? "stream";
