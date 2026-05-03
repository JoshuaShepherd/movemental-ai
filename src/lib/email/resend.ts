import { Resend } from "resend";

let _resend: Resend | null = null;

/**
 * Lazy-initialized Resend client.
 * Returns null when RESEND_API_KEY is not set (graceful degradation).
 */
export function getResend(): Resend | null {
  if (_resend) return _resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  _resend = new Resend(key);
  return _resend;
}
