import "server-only";

import { resendFromHeader } from "@/lib/email/from";
import { getResend } from "@/lib/email/resend";
import { env } from "@/lib/env";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Internal notification for a high-intent agent-room capture (paid dashboard
 * interest, mapped reality, or a Discuss hand-off). The durable row already
 * lives in `agent_room_leads`; this is the nudge so a human picks it up.
 *
 * No-ops cleanly when `CONTACT_NOTIFY_EMAIL` or `RESEND_API_KEY` is unset.
 */
export async function notifyAgentRoomLead(params: {
  leadId: string;
  kind: string;
  email: string;
  name?: string | null;
  organization?: string | null;
  role?: string | null;
  source?: string | null;
}): Promise<void> {
  const to = env.CONTACT_NOTIFY_EMAIL;
  if (!to) return;

  const resend = getResend();
  if (!resend) {
    console.warn("[agent-room-lead] RESEND_API_KEY not set; skipping internal notify");
    return;
  }

  const site = env.NEXT_PUBLIC_SITE_URL ?? "https://movemental.com";
  const text = [
    `New agent-room lead, ${params.kind} (${params.leadId})`,
    `Site: ${site}`,
    `Email: ${params.email}`,
    params.name ? `Name: ${params.name}` : null,
    params.organization ? `Organization: ${params.organization}` : null,
    params.role ? `Role: ${params.role}` : null,
    params.source ? `Source: ${params.source}` : null,
  ]
    .filter((line): line is string => Boolean(line))
    .join("\n");

  const { error } = await resend.emails.send({
    from: resendFromHeader(),
    to: [to],
    replyTo: params.email,
    subject: `[movemental.com] Agent room, ${params.kind} lead`,
    text,
    html: `<pre style="font-family:system-ui,sans-serif;white-space:pre-wrap">${escapeHtml(text)}</pre>`,
    tags: [
      { name: "source", value: "agent_room_capture" },
      { name: "kind", value: params.kind },
    ],
  });

  if (error) console.error("[agent-room-lead] Internal notify failed:", error);
}
