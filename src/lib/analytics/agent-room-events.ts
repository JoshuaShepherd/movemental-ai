/**
 * Agent Room analytics — PostHog event catalog (AU-19).
 *
 * No PII: never pass raw email, message body, or beat answer text.
 * Call from controllers only; failures are swallowed.
 */
import type { AgentRoomMode } from "@/lib/agent-room/mode";
import type { AgentMoveReason } from "@/lib/agent-room/move-classifier";
import type { DiscussReason } from "@/lib/agent-room/discuss";
import type { RoomContext } from "@/lib/agent-room/agent-stream-turn";
import type { CaptureKind } from "@/lib/agent-room/capture";
import type { ChipRoute, ChipSurface } from "@/lib/agent-room/composer-routing";

import { posthogCapture, posthogIdentify } from "./posthog-client";

export type DockExpandReason = "user" | "send" | "chip" | "discuss" | "agent";

export type DiscussEnterAnalyticsReason = "readback" | "objection" | "chip" | "agent";

export type AgentRoomAnalyticsIds = {
  anonId?: string;
  sessionId?: string;
};

let ids: AgentRoomAnalyticsIds = {};
let distinctBound = false;

export function setAgentRoomAnalyticsIds(next: AgentRoomAnalyticsIds): void {
  ids = next;
  if (!distinctBound && next.anonId) {
    distinctBound = true;
    posthogIdentify(next.anonId);
  }
}

export function mapDiscussReason(reason?: DiscussReason): DiscussEnterAnalyticsReason {
  if (reason === "post-readback") return "readback";
  if (reason === "agent") return "agent";
  return "chip";
}

function baseProps(): Record<string, unknown> {
  const props: Record<string, unknown> = { mode: "hybrid" as AgentRoomMode };
  if (ids.anonId) props.anon_id_suffix = ids.anonId.slice(-8);
  if (ids.sessionId) props.session_id_suffix = ids.sessionId.slice(-8);
  return props;
}

function capture(event: string, properties: Record<string, unknown>): void {
  try {
    posthogCapture(event, { ...baseProps(), ...properties });
  } catch {
    /* analytics must never block the room */
  }
}

export function trackAgentRoomChipTap(input: {
  label: string;
  routeKind: ChipRoute["kind"];
  surface: ChipSurface;
  screenId: string;
}): void {
  capture("agent_room_chip_tap", {
    label: input.label,
    route_kind: input.routeKind,
    surface: input.surface,
    screen_id: input.screenId,
  });
}

export function trackAgentRoomScreenShow(input: {
  screenId: string;
  scene?: string;
  source: "local" | "engine";
}): void {
  capture("agent_room_screen_show", {
    screen_id: input.screenId,
    scene: input.scene,
    source: input.source,
  });
}

export function trackAgentRoomTurn(input: {
  phase: string;
  classifier: AgentMoveReason | "local";
  hadUiRender: boolean;
  roomContext: RoomContext & { mode?: AgentRoomMode };
}): void {
  capture("agent_room_turn", {
    phase: input.phase,
    classifier: input.classifier,
    had_ui_render: input.hadUiRender,
    roomContext: {
      screenId: input.roomContext.screenId,
      phase: input.roomContext.phase,
      mapAnswersCount: input.roomContext.mapAnswersCount,
      inLocalScene: input.roomContext.inLocalScene,
      mode: input.roomContext.mode ?? "hybrid",
    },
  });
}

export function trackAgentRoomDockExpand(reason: DockExpandReason): void {
  capture("agent_room_dock_expand", { reason });
}

export function trackAgentRoomDiscussEnter(reason: DiscussEnterAnalyticsReason): void {
  capture("agent_room_discuss_enter", { reason });
}

export function trackAgentRoomCaptureSubmit(input: {
  kind: CaptureKind | string;
  source: "scene" | "dock" | "overlay";
}): void {
  capture("agent_room_capture_submit", {
    kind: input.kind,
    source: input.source,
  });
}

export function trackAgentRoomStallRecovery(retryable: boolean): void {
  capture("agent_room_stall_recovery", { retryable });
}

/** G5 — prose-only agent turn on a renderable topic (host omitted `ui_render`). */
export function trackSpeakShowViolation(input: {
  topic: string;
  autoRendered: boolean;
  modelId?: string;
}): void {
  capture("speakshow.violation", {
    topic: input.topic,
    auto_rendered: input.autoRendered,
    model_id: input.modelId,
  });
}
