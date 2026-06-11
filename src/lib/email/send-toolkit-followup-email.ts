import "server-only";

import { resendFromHeader } from "@/lib/email/from";
import { getResend } from "@/lib/email/resend";
import { env } from "@/lib/env";
import { SSSS_FIELD_GUIDE_PATH } from "@/lib/canon-routes";

const SITE_NAME = "Movemental";

export type ToolkitFollowupDay = 3 | 7;

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

function unsubBlock(unsubscribeUrl?: string | null): string {
  return unsubscribeUrl && unsubscribeUrl.length > 0
    ? `<p style="font-size: 12px; color: #6b6660; line-height: 1.5; margin-top: 28px;">
          Don&rsquo;t want the follow-ups?
          <a href="${escapeHtmlAttr(unsubscribeUrl)}" style="color: #19150f;">Unsubscribe</a>.
        </p>`
    : "";
}

const COPY: Record<ToolkitFollowupDay, { subject: string; heading: string; body: string; flow: string }> = {
  3: {
    subject: `A 30-minute conversation about your AI Handbook — ${SITE_NAME}`,
    heading: "How's the field guide landing?",
    body: `If you and your leadership have started the self-assessment, a short call can save you a lot of false starts.
      I'll spend 30 minutes with you, no pitch — just helping you find the one next decision that matters most.
      Reply to this email and we'll find a time.`,
    flow: "toolkit_day_3",
  },
  7: {
    subject: `The $1,000 facilitated path — ${SITE_NAME}`,
    heading: "When you'd rather not draft it alone.",
    body: `Some teams have the time and discipline to draft all five Safety layers themselves; the field guide is built for that.
      Others would rather we draft it with them. The facilitated MVP is $1,000 and takes about two weeks: we draft your Handbook
      customized to your context, your team reviews and ratifies it inside a private dashboard, and you leave with a print-quality PDF.
      This is the last automated note — reply any time if it'd help to talk.`,
    flow: "toolkit_day_7",
  },
};

/**
 * Day-3 / Day-7 follow-up sequence for field-guide leads. Driven by the cron in
 * `src/lib/services/leads/toolkit-followup-cron.service.ts`. Honors the day-0
 * email's promise: "two short notes — a 30-minute conversation, then context on
 * the $1,000 facilitated MVP."
 *
 * @returns true if Resend accepted the send; false otherwise (e.g. no API key).
 */
export async function sendToolkitFollowupEmail(
  email: string,
  day: ToolkitFollowupDay,
  options: { unsubscribeUrl?: string | null } = {},
): Promise<boolean> {
  const resend = getResend();
  if (!resend) {
    console.warn("[toolkit-followup] RESEND_API_KEY not set — skipping follow-up email.");
    return false;
  }

  const copy = COPY[day];
  const safetyPageUrl = `${siteUrl()}${SSSS_FIELD_GUIDE_PATH}`;

  const { error } = await resend.emails.send({
    from: resendFromHeader(),
    to: [email],
    subject: copy.subject,
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; color: #19150f;">
          <h1 style="font-size: 22px; font-weight: 600; margin-bottom: 16px; letter-spacing: -0.02em;">${copy.heading}</h1>
          <p style="font-size: 16px; line-height: 1.6;">${copy.body}</p>
          <p style="font-size: 14px; line-height: 1.6; color: #4a443a;">
            The Safety stage overview: <a href="${escapeHtmlAttr(safetyPageUrl)}" style="color: #19150f;">${escapeHtmlAttr(safetyPageUrl)}</a>
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #4a443a;">— Josh<br />josh@movemental.ai</p>
          ${unsubBlock(options.unsubscribeUrl)}
        </body>
      </html>
    `,
    tags: [{ name: "flow", value: copy.flow }],
  });

  if (error) {
    console.error(`[toolkit-followup] Failed to send day-${day} email:`, error);
    return false;
  }
  return true;
}
