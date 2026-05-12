import { describe, expect, it } from "vitest";
import { createHmac } from "node:crypto";

import { verifyDocuSignConnectHmac } from "@/lib/webhooks/docusign-signature";

describe("verifyDocuSignConnectHmac", () => {
  it("accepts valid X-DocuSign-Signature-1", () => {
    const secret = "connect_hmac_secret";
    const rawBody = '{"event":"envelope-completed"}';
    const expected = createHmac("sha256", secret).update(rawBody, "utf8").digest("base64");
    expect(verifyDocuSignConnectHmac(rawBody, expected, secret)).toBe(true);
  });

  it("rejects wrong secret", () => {
    const rawBody = "{}";
    const sig = createHmac("sha256", "a").update(rawBody, "utf8").digest("base64");
    expect(verifyDocuSignConnectHmac(rawBody, sig, "b")).toBe(false);
  });
});
