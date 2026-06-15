import "server-only";

import { resendFromHeader } from "@/lib/email/from";
import { getResend } from "@/lib/email/resend";
import { env } from "@/lib/env";
import { SSSS_FIELD_GUIDE_PATH } from "@/lib/canon-routes";
import {
  SAFETY_FIELD_GUIDE_PDF_PATH,
  SAFETY_HANDBOOK_DISPLAY_TITLE,
} from "@/lib/safety-field-guide";
import { SANDBOX_FIELD_GUIDE_PDF_PATH } from "@/lib/sandbox-field-guide";

const SITE_NAME = "Movemental";

export type ToolkitLeadKind = "safety" | "sandbox";

function siteUrl(): string {
  return env.NEXT_PUBLIC_SITE_URL ?? "https://movemental.ai";
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
          <a href="${escapeHtmlAttr(unsubscribeUrl)}" style="color: #19150f;">Unsubscribe</a>
          (no confirmation step required).
        </p>`
    : "";
}

/**
 * Day-0 transactional send for field-guide lead capture (Safety or Sandbox volume).
 *
 * Canonical PDF URLs → static files under `public/downloads/`.
 *
 * TODO: Wire up the day-3 and day-7 follow-ups via Vercel Cron + a dedicated route that queries
 * `newsletter_subscribers` where `source` starts with `safety-toolkit:` / `sandbox-toolkit:` as appropriate.
 *
 * @returns true if Resend accepted the send; false otherwise (e.g. no API key).
 */
export async function sendToolkitLeadEmail(
  email: string,
  kind: ToolkitLeadKind,
  options: { unsubscribeUrl?: string | null } = {},
): Promise<boolean> {
  const resend = getResend();
  if (!resend) {
    console.warn("[toolkit-email] RESEND_API_KEY not set, skipping toolkit email.");
    return false;
  }

  const unsub = unsubBlock(options.unsubscribeUrl);

  if (kind === "sandbox") {
    const downloadUrl = `${siteUrl()}${SANDBOX_FIELD_GUIDE_PDF_PATH}`;
    const sandboxPageUrl = `${siteUrl()}/field-guide?guide=sandbox`;
    const { error } = await resend.emails.send({
      from: resendFromHeader(),
      to: [email],
      subject: `Your Sandbox Field Guide (PDF), ${SITE_NAME}`,
      html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; color: #19150f;">
          <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 16px; letter-spacing: -0.02em;">It continues with Exploration.</h1>
          <p style="font-size: 16px; line-height: 1.6;">
            Here is your download link for <strong>It Continues With Exploration</strong> the Sandbox Field Guide.
            Forty-eight pages in eight phases, toward a board-ready Future Plan.
          </p>
          <a href="${escapeHtmlAttr(downloadUrl)}"
             style="display: inline-block; margin: 24px 0; padding: 12px 24px; background-color: #19150f; color: #faf6ee; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;">
            Download the Sandbox Field Guide (PDF)
          </a>
          <p style="font-size: 14px; line-height: 1.6; color: #4a443a;">
            This volume assumes your organization has substantially completed the Safety stage. The Sandbox pathway overview is here:
            <a href="${escapeHtmlAttr(sandboxPageUrl)}" style="color: #19150f;">${escapeHtmlAttr(sandboxPageUrl)}</a>
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #4a443a;">
            Josh<br />josh@movemental.ai
          </p>
          ${unsub}
        </body>
      </html>
    `,
      tags: [{ name: "flow", value: "sandbox_toolkit_day_0" }],
    });

    if (error) {
      console.error("[toolkit-email] Failed to send Sandbox field guide email:", error);
      return false;
    }
    return true;
  }

  const downloadUrl = `${siteUrl()}${SAFETY_FIELD_GUIDE_PDF_PATH}`;
  const safetyPageUrl = `${siteUrl()}${SSSS_FIELD_GUIDE_PATH}`;

  const { error } = await resend.emails.send({
    from: resendFromHeader(),
    to: [email],
    subject: `Your ${SAFETY_HANDBOOK_DISPLAY_TITLE} (PDF), ${SITE_NAME}`,
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; color: #19150f;">
          <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 16px; letter-spacing: -0.02em;">It starts with Safety.</h1>
          <p style="font-size: 16px; line-height: 1.6;">
            Here is your download link for <strong>${SAFETY_HANDBOOK_DISPLAY_TITLE}</strong> first response documentation for nonprofits, churches, and institutions. Sixteen pages: read it in an evening, run the self-assessment with your leadership team in about 30 minutes.
          </p>
          <a href="${escapeHtmlAttr(downloadUrl)}"
             style="display: inline-block; margin: 24px 0; padding: 12px 24px; background-color: #19150f; color: #faf6ee; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;">
            Download the Handbook (PDF)
          </a>
          <p style="font-size: 14px; line-height: 1.6; color: #4a443a;">
            We&rsquo;ll follow up once over the next week with two short notes: one offering a 30-minute conversation, and one with context on the $1,000 facilitated MVP that takes the toolkit to seven ratifiable decisions. After that, no further automated emails.
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #4a443a;">
            If you want to skip ahead, the Safety stage is here: <a href="${escapeHtmlAttr(safetyPageUrl)}" style="color: #19150f;">${escapeHtmlAttr(safetyPageUrl)}</a>
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #4a443a;">
            Josh<br />josh@movemental.ai
          </p>
          ${unsub}
        </body>
      </html>
    `,
    tags: [{ name: "flow", value: "safety_toolkit_day_0" }],
  });

  if (error) {
    console.error("[toolkit-email] Failed to send Safety field guide email:", error);
    return false;
  }

  return true;
}
