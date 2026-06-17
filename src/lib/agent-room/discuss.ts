/**
 * Agent Room — Discuss phase contract (INT-08).
 *
 * The room has two phases inside one `/agent` route (design note
 * `agent-room-long-form-discussion-ui.md`): **Guide** (the default guided
 * choreography that ships today) and **Discuss** (Model B — "mark up one
 * document": the screen stays dominant, the voice band grows, longer exchange
 * accumulates as marginalia on the sheet). These types are the shared SSOT for
 * both the stub and stream controllers so `AgentRoomView` stays mode-agnostic.
 *
 * This is protocol + a feature flag only — no React, no network.
 */

export type RoomPhase = "guide" | "discuss";

/**
 * @deprecated Use `ThreadTurn` from `@/lib/agent-room/thread` — the single
 * conversation log. Kept for DiscussFold / dev seam compatibility during migration.
 */
export interface TranscriptTurn {
  role: "user" | "assistant";
  content: string;
  surface?: "voice" | "margin" | "passage" | "capture";
}

/** Why Discuss was entered (drives prompt policy / analytics in INT-09/INT-10). */
export type DiscussReason = "user" | "agent" | "post-readback";

/**
 * Feature flag gating the Discuss UI so it can ship ahead of the stream policy
 * (INT-05/INT-10). When off, `enterDiscuss` is a no-op and the room stays in
 * Guide — visually identical to the AF-12 sign-off. Build-time inlined for the
 * client (constant per render), so callers can branch without hook gymnastics.
 */
export const DISCUSS_ENABLED: boolean =
  process.env.NEXT_PUBLIC_AGENT_ROOM_DISCUSS === "1";

/**
 * Turn-cap (INT-09, design note §5.5): after roughly this many **assistant**
 * turns in Discuss, the agent offers to continue with a human via the `capture`
 * cell (`kind:'discuss'`) — a soft offer, never a hard wall or a `/contact`
 * redirect. Tunable via `NEXT_PUBLIC_AGENT_ROOM_DISCUSS_TURN_CAP`; default 7
 * (the "~6–8 agent turns" band). The stream agent enforces it in INT-10; the
 * counter (`discussTurnCount`) is tracked client-side from INT-08.
 */
export const DISCUSS_TURN_CAP: number = (() => {
  const raw = Number(process.env.NEXT_PUBLIC_AGENT_ROOM_DISCUSS_TURN_CAP);
  return Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 7;
})();

/**
 * Sentinel `suggest` chip value (INT-10). The room-host's Guide→Discuss "Yes"
 * chip carries this value; the stream hook intercepts it and switches to the
 * Discuss phase **locally** (`enterDiscuss`) rather than sending a turn — the UI
 * transition is not a network round-trip (design §2.4). Kept in lockstep with
 * the `value: "enter-discuss"` example in the engine's `room-host.md`.
 */
export const ENTER_DISCUSS_VALUE = "enter-discuss";

/** Chip / scene sentinel for explicit Discuss entry (INT-09 entry points). */
export const DISCUSS_CHIP_TARGET = "toDiscuss";

/**
 * Length (chars) above which an assistant turn gets in-thread passage styling.
 * Does **not** route content between caption and thread (SSOT I4).
 */
export const DISCUSS_PASSAGE_THRESHOLD = 180;
