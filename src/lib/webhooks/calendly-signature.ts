import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Calendly webhook signature header: `t=<unix>,v1=<hex_hmac>`.
 * Signed payload: `${t}.${rawBody}` with the webhook signing key.
 */
export function verifyCalendlyWebhookSignature(
  signatureHeader: string | null,
  rawBody: string,
  signingKey: string,
): boolean {
  if (!signatureHeader || !signingKey) return false;
  const parts = signatureHeader.split(",").map((p) => p.trim());
  const tPart = parts.find((p) => p.startsWith("t="));
  const v1Part = parts.find((p) => p.startsWith("v1="));
  if (!tPart || !v1Part) return false;
  const t = tPart.slice(2);
  const v1 = v1Part.slice(3);
  const signed = `${t}.${rawBody}`;
  const expectedHex = createHmac("sha256", signingKey).update(signed, "utf8").digest("hex");
  try {
    const a = Buffer.from(expectedHex, "hex");
    const b = Buffer.from(v1, "hex");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
