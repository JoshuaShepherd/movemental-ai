import "server-only";

import { env } from "@/lib/env";

const DEFAULT_FROM_EMAIL = "onboarding@resend.dev";

/**
 * Resend `from` header: optional display name + verified sender email.
 * @see https://resend.com/docs/api-reference/emails/send-email#body-parameters
 */
export function resendFromHeader(): string {
  const email = env.RESEND_FROM_EMAIL ?? DEFAULT_FROM_EMAIL;
  const name = env.RESEND_FROM_NAME?.trim();
  if (name) return `${name} <${email}>`;
  return email;
}
