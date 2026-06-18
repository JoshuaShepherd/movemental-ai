/**
 * Agent Room runtime mode — stub ↔ hybrid (stream deprecated AU-20).
 *
 * - `"hybrid"` — **default**. Full local `SCENES` choreography; SSE agent only on
 *                classified unscripted moves (typed fallback, Discuss, agent chips).
 * - `"stub"`   — zero-network offline fallback (demos / engine-down operator flag).
 * - `"stream"` — **deprecated** (AU-20). Maps to hybrid unless
 *                `NEXT_PUBLIC_AGENT_ROOM_LEGACY_STREAM=1` is set.
 *
 * Override with `NEXT_PUBLIC_AGENT_ROOM_MODE`. Build-time inlined for the client.
 */
export type AgentRoomMode = "stub" | "hybrid" | "stream";

const RAW_MODE: AgentRoomMode =
  (process.env.NEXT_PUBLIC_AGENT_ROOM_MODE as AgentRoomMode | undefined) ?? "hybrid";

const LEGACY_STREAM_ENABLED =
  process.env.NEXT_PUBLIC_AGENT_ROOM_LEGACY_STREAM === "1";

let streamDeprecationWarned = false;

function warnStreamDeprecated(): void {
  if (streamDeprecationWarned || RAW_MODE !== "stream" || LEGACY_STREAM_ENABLED) return;
  streamDeprecationWarned = true;
  const message =
    "[agent-room] NEXT_PUBLIC_AGENT_ROOM_MODE=stream is deprecated; running hybrid. " +
    "Set NEXT_PUBLIC_AGENT_ROOM_LEGACY_STREAM=1 to keep the legacy stream controller.";

  if (process.env.NODE_ENV === "development") {
    console.warn(message);
    return;
  }

  if (typeof window !== "undefined") {
    void import("@sentry/nextjs")
      .then((Sentry) => {
        Sentry.addBreadcrumb({
          category: "agent_room",
          message,
          level: "warning",
        });
      })
      .catch(() => {});
  }
}

function resolveAgentRoomMode(): AgentRoomMode {
  if (RAW_MODE === "stub") return "stub";
  if (RAW_MODE === "stream") {
    if (LEGACY_STREAM_ENABLED) return "stream";
    warnStreamDeprecated();
    return "hybrid";
  }
  return "hybrid";
}

/** Effective runtime mode after deprecation mapping. */
export const AGENT_ROOM_MODE: AgentRoomMode = resolveAgentRoomMode();

/** Raw env value before deprecation remap (analytics / diagnostics). */
export const AGENT_ROOM_RAW_MODE: AgentRoomMode = RAW_MODE;

/** True when legacy stream controller is still active. */
export const AGENT_ROOM_LEGACY_STREAM: boolean =
  RAW_MODE === "stream" && LEGACY_STREAM_ENABLED;
