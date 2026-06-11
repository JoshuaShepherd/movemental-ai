import "server-only";

import { env } from "@/lib/env";
import { resendFromHeader } from "@/lib/email/from";
import { getResend } from "@/lib/email/resend";

const SITE_NAME = "Movemental";

function siteUrl(): string {
  return env.NEXT_PUBLIC_SITE_URL ?? "https://movemental.com";
}

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/'/g, "&#39;");
}

/**
 * Double opt-in confirmation for site newsletter (`newsletter_subscribers`).
 * @param unsubscribeUrl — optional one-click URL when `NEWSLETTER_UNSUBSCRIBE_SECRET` is set server-side.
 * @returns true if Resend accepted the send; false if misconfigured or API error.
 */
export async function sendNewsletterConfirmationEmail(
  email: string,
  token: string,
  unsubscribeUrl?: string | null,
): Promise<boolean> {
  const resend = getResend();
  if (!resend) {
    console.warn("[newsletter-email] RESEND_API_KEY not set, skipping confirmation email.");
    return false;
  }

  const confirmUrl = `${siteUrl()}/api/newsletter/confirm?token=${encodeURIComponent(token)}`;
  const unsubBlock =
    unsubscribeUrl && unsubscribeUrl.length > 0
      ? `<p style="font-size: 12px; color: #6b6660; line-height: 1.5; margin-top: 28px;">
          Prefer not to join this list?
          <a href="${escapeHtmlAttr(unsubscribeUrl)}" style="color: #19150f;">Unsubscribe</a>
          (no confirmation step required).
        </p>`
      : "";

  const { error } = await resend.emails.send({
    from: resendFromHeader(),
    to: [email],
    subject: `Confirm your subscription, ${SITE_NAME}`,
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; color: #19150f;">
          <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 16px; letter-spacing: -0.02em;">Confirm your subscription</h1>
          <p style="font-size: 16px; line-height: 1.6; color: #19150f;">
            Thanks for joining the ${SITE_NAME} list. Click the button below to confirm your email address.
          </p>
          <a href="${escapeHtmlAttr(confirmUrl)}"
             style="display: inline-block; margin: 24px 0; padding: 12px 24px; background-color: #19150f; color: #faf6ee; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;">
            Confirm subscription
          </a>
          <p style="font-size: 13px; color: #6b6660; line-height: 1.5;">
            If you did not request this, you can safely ignore this email.
          </p>
          ${unsubBlock}
        </body>
      </html>
    `,
    tags: [{ name: "flow", value: "newsletter_confirm" }],
  });

  if (error) {
    console.error("[newsletter-email] Failed to send confirmation:", error);
    return false;
  }

  return true;
}
