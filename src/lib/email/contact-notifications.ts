import "server-only";

import { env } from "@/lib/env";
import { resendFromHeader } from "@/lib/email/from";
import { getResend } from "@/lib/email/resend";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function firstName(fullName: string): string {
  const part = fullName.trim().split(/\s+/)[0];
  return part || fullName;
}

/**
 * Notify internal inbox when CONTACT_NOTIFY_EMAIL is set and Resend is configured.
 * Reply-To is the submitter so the team can respond in-thread.
 */
export async function notifyContactInbox(params: {
  submissionId: string;
  name: string;
  email: string;
  organization?: string;
  audience_segment: string;
  message: string;
}): Promise<void> {
  const to = env.CONTACT_NOTIFY_EMAIL;
  if (!to) return;

  const resend = getResend();
  if (!resend) {
    console.warn("[contact-email] RESEND_API_KEY not set; skipping team notify");
    return;
  }

  const site = env.NEXT_PUBLIC_SITE_URL ?? "https://movemental.ai";
  const text = [
    `New contact form submission (${params.submissionId})`,
    `Site: ${site}`,
    `Name: ${params.name}`,
    `Email: ${params.email}`,
    params.organization ? `Organization: ${params.organization}` : null,
    `Segment: ${params.audience_segment}`,
    "",
    "Message:",
    params.message,
  ]
    .filter((line): line is string => Boolean(line))
    .join("\n");

  const { error } = await resend.emails.send({
    from: resendFromHeader(),
    to: [to],
    replyTo: params.email,
    subject: `[movemental.ai] Contact, ${params.audience_segment}`,
    text,
    html: `<pre style="font-family:system-ui,sans-serif;white-space:pre-wrap">${escapeHtml(text)}</pre>`,
    tags: [{ name: "source", value: "contact_form" }],
  });

  if (error) console.error("[contact-email] Team notify failed:", error);
}

/** Transactional acknowledgment to the person who submitted the contact form. */
export async function sendContactSubmitterAck(params: {
  submissionId: string;
  email: string;
  name: string;
}): Promise<void> {
  const resend = getResend();
  if (!resend) {
    console.warn("[contact-email] RESEND_API_KEY not set; skipping submitter ack");
    return;
  }

  const first = firstName(params.name);
  const safeFirst = escapeHtml(first);

  const { error } = await resend.emails.send({
    from: resendFromHeader(),
    to: [params.email],
    subject: "We received your message | Movemental",
    text: `Hi ${first},

Thanks for reaching out through movemental.ai. We read what you send and will follow up when a human with the right context can respond with care.

Movemental`,
    html: `<p>Hi ${safeFirst},</p>
<p>Thanks for reaching out through movemental.ai. We read what you send and will follow up when a human with the right context can respond with care.</p>
<p style="margin-top:24px;color:#6b6660;font-size:14px">Movemental</p>`,
    tags: [{ name: "source", value: "contact_ack" }],
  });

  if (error) console.error("[contact-email] Submitter ack failed:", error);
}
