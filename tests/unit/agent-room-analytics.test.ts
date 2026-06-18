import { afterEach, describe, expect, it, vi } from "vitest";

import {
  setAgentRoomAnalyticsIds,
  trackAgentRoomChipTap,
} from "../../src/lib/analytics/agent-room-events";
import { __setPostHogCaptureForTests } from "../../src/lib/analytics/posthog-client";

describe("agent room analytics (AU-19)", () => {
  afterEach(() => {
    __setPostHogCaptureForTests(null);
    setAgentRoomAnalyticsIds({});
  });

  it("chip tap fires agent_room_chip_tap with route props", () => {
    const capture = vi.fn();
    __setPostHogCaptureForTests(capture);
    setAgentRoomAnalyticsIds({ anonId: "anon-test-123", sessionId: "sess-test-456" });

    trackAgentRoomChipTap({
      label: "Get a clear next AI step",
      routeKind: "local",
      surface: "collapsed",
      screenId: "home",
    });

    expect(capture).toHaveBeenCalledTimes(1);
    expect(capture.mock.calls[0]?.[0]).toBe("agent_room_chip_tap");
    expect(capture.mock.calls[0]?.[1]).toMatchObject({
      label: "Get a clear next AI step",
      route_kind: "local",
      surface: "collapsed",
      screen_id: "home",
      mode: "hybrid",
      anon_id_suffix: "test-123",
      session_id_suffix: "test-456",
    });
    expect(capture.mock.calls[0]?.[1]).not.toHaveProperty("email");
    expect(capture.mock.calls[0]?.[1]).not.toHaveProperty("message");
  });

  it("no-ops when PostHog is not configured", () => {
    expect(() =>
      trackAgentRoomChipTap({
        label: "About Movemental",
        routeKind: "agent",
        surface: "expanded",
        screenId: "home",
      }),
    ).not.toThrow();
  });
});
