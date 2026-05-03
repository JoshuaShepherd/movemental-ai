import { createHmac, timingSafeEqual } from "node:crypto";

const VERSION = "v1";

function b64urlEncode(buf: Buffer): string {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function b64urlDecode(s: string): Buffer {
  const pad = 4 - (s.length % 4);
  const normalized = s.replace(/-/g, "+").replace(/_/g, "/") + (pad === 4 ? "" : "=".repeat(pad));
  return Buffer.from(normalized, "base64");
}

/**
 * Signed one-click unsubscribe token (no extra DB column).
 * Requires NEWSLETTER_UNSUBSCRIBE_SECRET (min 16 chars) in production for links to be issued.
 */
export function createNewsletterUnsubscribeToken(subscriberId: string, secret: string): string {
  const exp = Math.floor(Date.now() / 1000) + 86400 * 730; // 2 years
  const payload = `${VERSION}:${subscriberId}:${exp}`;
  const sig = createHmac("sha256", secret).update(payload).digest();
  return `${b64urlEncode(Buffer.from(payload, "utf8"))}.${b64urlEncode(sig)}`;
}

export function verifyNewsletterUnsubscribeToken(
  token: string,
  secret: string,
): { subscriberId: string } | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  try {
    const payloadBuf = b64urlDecode(parts[0]!);
    const sigBuf = b64urlDecode(parts[1]!);
    const payload = payloadBuf.toString("utf8");
    const expectedSig = createHmac("sha256", secret).update(payload).digest();
    if (sigBuf.length !== expectedSig.length || !timingSafeEqual(sigBuf, expectedSig)) {
      return null;
    }
    const bits = payload.split(":");
    if (bits.length !== 3 || bits[0] !== VERSION) return null;
    const subscriberId = bits[1]!;
    const exp = Number(bits[2]);
    if (!subscriberId || !Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return { subscriberId };
  } catch {
    return null;
  }
}
