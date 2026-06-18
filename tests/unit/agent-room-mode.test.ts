import { describe, expect, it } from "vitest";

import { AGENT_ROOM_MODE, AGENT_ROOM_RAW_MODE } from "../../src/lib/agent-room/mode";

describe("agent room mode (AU-20)", () => {
  it("defaults to hybrid", () => {
    expect(AGENT_ROOM_MODE).toBe("hybrid");
  });

  it("exposes raw env mode for diagnostics", () => {
    expect(["stub", "hybrid", "stream"]).toContain(AGENT_ROOM_RAW_MODE);
  });
});
