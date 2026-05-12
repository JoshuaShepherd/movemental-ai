import { describe, expect, it } from "vitest";
import { createHmac } from "node:crypto";

import { verifyCalendlyWebhookSignature } from "@/lib/webhooks/calendly-signature";

describe("verifyCalendlyWebhookSignature", () => {
  it("accepts a valid v1 signature", () => {
    const signingKey = "test_signing_key_32_chars______";
    const rawBody = '{"event":"invitee.created"}';
    const t = "1690000000";
    const signed = `${t}.${rawBody}`;
    const v1 = createHmac("sha256", signingKey).update(signed, "utf8").digest("hex");
    const header = `t=${t},v1=${v1}`;
    expect(verifyCalendlyWebhookSignature(header, rawBody, signingKey)).toBe(true);
  });

  it("rejects tampered body", () => {
    const signingKey = "test_signing_key_32_chars______";
    const rawBody = '{"event":"invitee.created"}';
    const t = "1690000000";
    const signed = `${t}.${rawBody}`;
    const v1 = createHmac("sha256", signingKey).update(signed, "utf8").digest("hex");
    const header = `t=${t},v1=${v1}`;
    expect(verifyCalendlyWebhookSignature(header, '{"event":"other"}', signingKey)).toBe(false);
  });

  it("rejects missing header", () => {
    expect(verifyCalendlyWebhookSignature(null, "{}", "key")).toBe(false);
  });
});
