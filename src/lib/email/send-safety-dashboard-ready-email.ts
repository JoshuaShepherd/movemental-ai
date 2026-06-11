import "server-only";

import { resendFromHeader } from "@/lib/email/from";
import { getResend } from "@/lib/email/resend";
import { env } from "@/lib/env";

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
 * Post-provision transactional email — links enrolled customer to gated `/signup`.
 */
export async function sendSafetyDashboardReadyEmail(params: {
  email: string;
  contactName: string;
  orgName: string;
  inquiryId: string;
}): Promise<boolean> {
  const resend = getResend();
  if (!resend) {
    console.warn("[safety-dashboard-email] RESEND_API_KEY not set, skipping send.");
    return false;
  }

  const signupUrl = `${siteUrl()}/signup?email=${encodeURIComponent(params.email)}&inquiry=${encodeURIComponent(params.inquiryId)}`;
  const firstName = params.contactName.split(/\s+/)[0] || "there";

  const { error } = await resend.emails.send({
    from: resendFromHeader(),
    to: [params.email],
    subject: `Your Safety dashboard is ready, ${SITE_NAME}`,
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; color: #19150f;">
          <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 16px; letter-spacing: -0.02em;">Hi ${escapeHtmlAttr(firstName)}, your dashboard is ready.</h1>
          <p style="font-size: 16px; line-height: 1.6;">
            We provisioned the private Safety workspace for <strong>${escapeHtmlAttr(params.orgName)}</strong>.
            Create your account with the same email you used to enroll, then you&rsquo;ll land in your AI Charter dashboard.
          </p>
          <a href="${escapeHtmlAttr(signupUrl)}"
             style="display: inline-block; margin: 24px 0; padding: 12px 24px; background-color: #19150f; color: #faf6ee; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;">
            Create your account
          </a>
          <p style="font-size: 14px; line-height: 1.6; color: #4a443a;">
            Already have an account? <a href="${escapeHtmlAttr(`${siteUrl()}/login?next=/dashboard/safety`)}" style="color: #19150f;">Sign in here</a>.
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #4a443a;">
            Josh<br />josh@movemental.ai
          </p>
        </body>
      </html>
    `,
    tags: [{ name: "flow", value: "safety_dashboard_provisioned" }],
  });

  if (error) {
    console.error("[safety-dashboard-email] Failed to send:", error);
    return false;
  }
  return true;
}
