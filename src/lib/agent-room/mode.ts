/**
 * Agent Room runtime mode — stub ↔ hybrid ↔ stream switch.
 *
 * - `"hybrid"` — **default**. Full local `SCENES` choreography; SSE agent only on
 *                classified unscripted moves (typed fallback, Discuss, agent chips).
 * - `"stub"`   — zero-network offline fallback (demos / engine-down operator flag).
 * - `"stream"` — legacy full-AI path for dev/regression (`useAgentRoomStream`).
 *
 * Override with `NEXT_PUBLIC_AGENT_ROOM_MODE`. Build-time inlined for the client.
 */
export type AgentRoomMode = "stub" | "hybrid" | "stream";

export const AGENT_ROOM_MODE: AgentRoomMode =
  (process.env.NEXT_PUBLIC_AGENT_ROOM_MODE as AgentRoomMode | undefined) ?? "hybrid";
