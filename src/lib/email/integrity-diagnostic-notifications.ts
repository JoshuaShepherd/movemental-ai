import "server-only";

import {
  DIMENSIONS,
  QUESTIONS,
  QUESTIONS_BY_DIMENSION,
  type DimensionId,
} from "@/lib/integrity-diagnostic/questions";
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

export interface IntegrityDiagnosticPayload {
  submissionId: string;
  email: string;
  name: string;
  organizationName?: string;
  role?: string;
  /** Twenty-two answer indices in question order (0–3 each). */
  answers: readonly number[];
  /** Optional narrative follow-up per dimension, keyed by dimension id. */
  followUps?: Partial<Record<DimensionId, string>>;
  closingNote?: string;
}

function renderTextSummary(p: IntegrityDiagnosticPayload): string {
  const lines: string[] = [
    `New Integrity Diagnostic submission (${p.submissionId})`,
    `Site: ${env.NEXT_PUBLIC_SITE_URL ?? "https://movemental.ai"}`,
    `Submitter: ${p.name} <${p.email}>`,
  ];
  if (p.organizationName) lines.push(`Organization: ${p.organizationName}`);
  if (p.role) lines.push(`Role: ${p.role}`);
  lines.push("");

  for (const dim of DIMENSIONS) {
    lines.push(`${dim.num} · ${dim.title}`);
    const dimQs = QUESTIONS_BY_DIMENSION[dim.id];
    for (const q of dimQs) {
      const idx = QUESTIONS.findIndex((qq) => qq.id === q.id);
      const choice = p.answers[idx];
      const optionText =
        typeof choice === "number" ? q.options[choice] ?? "(out of range)" : "(missing)";
      lines.push(`  Q: ${q.prompt}`);
      lines.push(`  A[${choice ?? "-"}]: ${optionText}`);
    }
    const followUp = p.followUps?.[dim.id];
    if (followUp && followUp.trim().length > 0) {
      lines.push(`  Follow-up: ${followUp.trim()}`);
    }
    lines.push("");
  }

  if (p.closingNote && p.closingNote.trim().length > 0) {
    lines.push("Closing note:");
    lines.push(p.closingNote.trim());
  }

  return lines.join("\n");
}

/**
 * Notify the internal inbox when CONTACT_NOTIFY_EMAIL is set and Resend is
 * configured. Reply-To is the submitter so the team can respond in-thread.
 */
export async function notifyIntegrityDiagnosticInbox(
  p: IntegrityDiagnosticPayload,
): Promise<void> {
  const to = env.CONTACT_NOTIFY_EMAIL;
  if (!to) return;

  const resend = getResend();
  if (!resend) {
    console.warn(
      "[integrity-diagnostic-email] RESEND_API_KEY not set; skipping team notify",
    );
    return;
  }

  const text = renderTextSummary(p);
  const subject = p.organizationName
    ? `[movemental.ai] Integrity Diagnostic, ${p.organizationName}`
    : `[movemental.ai] Integrity Diagnostic, ${p.name}`;

  const { error } = await resend.emails.send({
    from: resendFromHeader(),
    to: [to],
    replyTo: p.email,
    subject,
    text,
    html: `<pre style="font-family:system-ui,sans-serif;white-space:pre-wrap">${escapeHtml(text)}</pre>`,
    tags: [{ name: "source", value: "integrity_diagnostic" }],
  });

  if (error) {
    console.error("[integrity-diagnostic-email] Team notify failed:", error);
  }
}

/** Acknowledgment to the submitter — no scoring, sets read-back expectation. */
export async function sendIntegrityDiagnosticAck(
  p: Pick<IntegrityDiagnosticPayload, "submissionId" | "email" | "name">,
): Promise<void> {
  const resend = getResend();
  if (!resend) {
    console.warn(
      "[integrity-diagnostic-email] RESEND_API_KEY not set; skipping submitter ack",
    );
    return;
  }

  const first = firstName(p.name);
  const safeFirst = escapeHtml(first);

  const text = `Hi ${first},

Thanks for completing the Movemental Integrity Diagnostic. We have your responses.

Within five business days, one of the Movemental founders will read your diagnostic, write a six-page narrative read-back, and send you a calendar invite for a thirty-minute call to review it together.

There is no score. There is no benchmark. The point is honesty inside the room, and a clearer next step on the other side.

Movemental`;

  const html = `<p>Hi ${safeFirst},</p>
<p>Thanks for completing the Movemental Integrity Diagnostic. We have your responses.</p>
<p>Within five business days, one of the Movemental founders will read your diagnostic, write a six-page narrative read-back, and send you a calendar invite for a thirty-minute call to review it together.</p>
<p>There is no score. There is no benchmark. The point is honesty inside the room, and a clearer next step on the other side.</p>
<p style="margin-top:24px;color:#6b6660;font-size:14px">Movemental</p>`;

  const { error } = await resend.emails.send({
    from: resendFromHeader(),
    to: [p.email],
    subject: "We received your Integrity Diagnostic | Movemental",
    text,
    html,
    tags: [{ name: "source", value: "integrity_diagnostic_ack" }],
  });

  if (error) {
    console.error("[integrity-diagnostic-email] Submitter ack failed:", error);
  }
}
