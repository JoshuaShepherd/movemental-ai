import { describe, expect, it } from "vitest";

import { parseCalendlyInviteePayload } from "@/lib/webhooks/calendly-parse";

describe("parseCalendlyInviteePayload", () => {
  it("extracts slug from tracking utm_content and start_time from event", () => {
    const body = {
      event: "invitee.created",
      payload: {
        event: { start_time: "2026-06-01T15:00:00.000000Z", uri: "https://api.calendly.com/scheduled_events/x" },
        invitee: { email: "lead@example.com", uri: "https://api.calendly.com/invitees/y" },
        tracking: { utm_content: "acme-org" },
      },
    };
    const p = parseCalendlyInviteePayload(body);
    expect(p).not.toBeNull();
    expect(p?.organizationSlug).toBe("acme-org");
    expect(p?.startTimeIso).toBe("2026-06-01T15:00:00.000000Z");
    expect(p?.inviteeEmail).toBe("lead@example.com");
    expect(p?.inviteeUri).toBe("https://api.calendly.com/invitees/y");
  });

  it("returns null without utm_content", () => {
    const body = {
      event: "invitee.created",
      payload: {
        event: { start_time: "2026-06-01T15:00:00.000000Z" },
        tracking: {},
      },
    };
    expect(parseCalendlyInviteePayload(body)).toBeNull();
  });
});
