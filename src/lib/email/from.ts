import "server-only";

import { env } from "@/lib/env";

/** Resend sandbox sender — OK for local smoke tests only. */
const DEFAULT_FROM_EMAIL = "onboarding@resend.dev";
/** Org display name for this marketing-site tenant (not a leader-tenant brand). */
const DEFAULT_FROM_NAME = "Movemental";

let _warnedSandboxFrom = false;

/**
 * Resend `from` header: display name + verified sender email.
 * Prefer `RESEND_FROM_EMAIL` on a verified domain in production
 * (not `onboarding@resend.dev`). This stack uses `RESEND_FROM_EMAIL` /
 * `RESEND_FROM_NAME` — not the alan-hirsch-era `RESEND_FROM_DOMAIN`.
 * @see https://resend.com/docs/api-reference/emails/send-email#body-parameters
 */
export function resendFromHeader(): string {
  const email = env.RESEND_FROM_EMAIL ?? DEFAULT_FROM_EMAIL;
  const name = env.RESEND_FROM_NAME?.trim() || DEFAULT_FROM_NAME;

  if (
    !_warnedSandboxFrom &&
    email.endsWith("@resend.dev") &&
    env.NODE_ENV === "production"
  ) {
    _warnedSandboxFrom = true;
    console.warn(
      "[resend] Production from address still uses resend.dev sandbox — set RESEND_FROM_EMAIL to a verified domain (e.g. updates@movemental.ai).",
    );
  }

  return `${name} <${email}>`;
}
