import { afterEach, describe, expect, it, vi } from "vitest";

import { submitLead } from "../../src/lib/agent-room/capture";

describe("submitLead capture contract (AU-02)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("POSTs the expected body shape to /api/agent-room/capture", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await submitLead("map", {
      email: "leader@example.org",
      first: "Jordan",
      org: "Example Org",
      source: "readback",
      sessionId: "sess-1",
      mapRead: { clearedSafety: true, gaps: [] },
    });

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith("/api/agent-room/capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: "map",
        email: "leader@example.org",
        first: "Jordan",
        name: undefined,
        org: "Example Org",
        role: undefined,
        source: "readback",
        sessionId: "sess-1",
        anonId: undefined,
        mapAnswers: undefined,
        metadata: { mapRead: { clearedSafety: true, gaps: [] } },
      }),
    });
  });

  it("skips POST when email is missing", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await submitLead("free", { org: "Example Org" });

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("ignores unknown capture kinds", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await submitLead("unknown", { email: "a@b.co" });

    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("capture route validation schema (AU-02)", () => {
  it("rejects invalid kind and missing email", async () => {
    const { z } = await import("zod");

    const CaptureSchema = z.object({
      kind: z.enum(["map", "paid", "free", "discuss"]),
      email: z.string().email("Valid email is required"),
    });

    expect(CaptureSchema.safeParse({ kind: "map", email: "ok@example.org" }).success).toBe(true);
    expect(CaptureSchema.safeParse({ kind: "paid", email: "not-an-email" }).success).toBe(false);
    expect(CaptureSchema.safeParse({ kind: "contact", email: "ok@example.org" }).success).toBe(false);
  });
});
