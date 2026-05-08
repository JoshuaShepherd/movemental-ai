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
 * Day-0 send for the "It Starts With Safety" toolkit lead capture.
 *
 * The toolkit PDF is intended to live at `/toolkit/safety-toolkit.pdf` in
 * `public/`. Until that file is uploaded, the link will 404 — operations
 * should drop the PDF before promoting the toolkit broadly.
 *
 * TODO: Wire up the day-3 ("Questions on the toolkit?") and day-7
 * ("Most organizations begin here.") follow-ups via Vercel Cron + a
 * dedicated route that queries `newsletter_subscribers` where
 * `source = 'safety-toolkit'` and the subscriber is ≥3 / ≥7 days old.
 * Sender: josh@movemental.ai. After day 7, no further automated emails;
 * manual outreach only.
 *
 * @returns true if Resend accepted the send; false otherwise (e.g. no API key).
 */
export async function sendSafetyToolkitEmail(
  email: string,
  options: { unsubscribeUrl?: string | null } = {},
): Promise<boolean> {
  const resend = getResend();
  if (!resend) {
    console.warn("[safety-toolkit-email] RESEND_API_KEY not set — skipping toolkit email.");
    return false;
  }

  const downloadUrl = `${siteUrl()}/toolkit/safety-toolkit.pdf`;
  const safetyPageUrl = `${siteUrl()}/pathway/safety`;
  const unsubBlock =
    options.unsubscribeUrl && options.unsubscribeUrl.length > 0
      ? `<p style="font-size: 12px; color: #6b6660; line-height: 1.5; margin-top: 28px;">
          Don&rsquo;t want the follow-ups?
          <a href="${escapeHtmlAttr(options.unsubscribeUrl)}" style="color: #19150f;">Unsubscribe</a>
          (no confirmation step required).
        </p>`
      : "";

  const { error } = await resend.emails.send({
    from: resendFromHeader(),
    to: [email],
    subject: `Your Safety toolkit — ${SITE_NAME}`,
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; color: #19150f;">
          <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 16px; letter-spacing: -0.02em;">It starts with Safety.</h1>
          <p style="font-size: 16px; line-height: 1.6;">
            The toolkit is attached below. Sixteen pages — read it in an evening, run the self-assessment with your leadership team in 30 minutes.
          </p>
          <a href="${escapeHtmlAttr(downloadUrl)}"
             style="display: inline-block; margin: 24px 0; padding: 12px 24px; background-color: #19150f; color: #faf6ee; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;">
            Download the toolkit (PDF)
          </a>
          <p style="font-size: 14px; line-height: 1.6; color: #4a443a;">
            We&rsquo;ll follow up once over the next week with two short notes: one offering a 30-minute conversation, and one with context on the $1,000 facilitated MVP that takes the toolkit to seven ratifiable artifacts. After that, no further automated emails.
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #4a443a;">
            If you want to skip ahead, the Safety stage is here: <a href="${escapeHtmlAttr(safetyPageUrl)}" style="color: #19150f;">${escapeHtmlAttr(safetyPageUrl)}</a>
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #4a443a;">
            — Josh<br />josh@movemental.ai
          </p>
          ${unsubBlock}
        </body>
      </html>
    `,
    tags: [{ name: "flow", value: "safety_toolkit_day_0" }],
  });

  if (error) {
    console.error("[safety-toolkit-email] Failed to send day-0 email:", error);
    return false;
  }

  return true;
}
