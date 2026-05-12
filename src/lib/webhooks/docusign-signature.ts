import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * DocuSign Connect HMAC: `X-DocuSign-Signature-1` is Base64(HMAC-SHA256(secret, rawBody)).
 * @see https://developers.docusign.com/platform/webhooks/connect/hmac/
 */
export function verifyDocuSignConnectHmac(
  rawBody: string,
  signatureHeader: string | null,
  secret: string,
): boolean {
  if (!signatureHeader || !secret) return false;
  const expected = createHmac("sha256", secret).update(rawBody, "utf8").digest("base64");
  try {
    const a = Buffer.from(signatureHeader, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
