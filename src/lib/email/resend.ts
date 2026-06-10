import * as Sentry from "@sentry/nextjs";
import { Resend } from "resend";

let _resend: Resend | null = null;
let _missingKeyReported = false;

/**
 * Lazy-initialized Resend client.
 * Returns null when RESEND_API_KEY is not set (graceful degradation).
 *
 * When the key is absent we still no-op, but a silently-skipped send shouldn't
 * look identical to success — so the first time it happens we surface an
 * admin-visible Sentry signal (once per process) in addition to the per-call
 * `console.warn` each sender already emits.
 */
export function getResend(): Resend | null {
  if (_resend) return _resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    if (!_missingKeyReported) {
      _missingKeyReported = true;
      Sentry.captureMessage(
        "RESEND_API_KEY is not configured — transactional emails are being silently skipped.",
        "warning",
      );
    }
    return null;
  }
  _resend = new Resend(key);
  return _resend;
}
