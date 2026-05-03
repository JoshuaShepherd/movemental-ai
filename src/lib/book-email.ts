import "server-only";

import { env } from "@/lib/env";
import type { AudienceLens } from "@/lib/book-types";
import { BOOK_TITLE } from "@/lib/book-meta";
import { resendFromHeader } from "@/lib/email/from";
import { getResend } from "@/lib/email/resend";

function siteUrl(): string {
  return env.NEXT_PUBLIC_SITE_URL ?? "https://movemental.com";
}

function lensReadingPath(lens: AudienceLens): string {
  const base = `${siteUrl()}/book`;
  if (lens === "movement-leaders") return base;
  return `${base}?lens=${lens}`;
}

/** Immediate welcome after book list signup (Phase 2 sequence — step 1). */
export async function sendBookSubscriberWelcome(params: {
  email: string;
  lens: AudienceLens;
  source: string;
  chapterSlug?: string | null;
}): Promise<{ ok: boolean; error?: string }> {
  const resend = getResend();
  if (!resend) {
    console.warn("[book-email] RESEND_API_KEY not set; skipping send");
    return { ok: false, error: "resend_not_configured" };
  }

  const readUrl = lensReadingPath(params.lens);
  const html = `
    <p>Thanks for choosing to stay close to <strong>${BOOK_TITLE}</strong>.</p>
    <p>Your edition: <a href="${readUrl}">${readUrl}</a></p>
    <p>We'll email you when your lens gets new margin notes, revisions, or export builds.</p>
    <p style="color:#6b6660;font-size:14px;margin-top:24px">— Movemental</p>
  `;

  const { error } = await resend.emails.send({
    from: resendFromHeader(),
    to: [params.email],
    subject: `You're subscribed — ${BOOK_TITLE}`,
    html,
    tags: [
      { name: "flow", value: "book_welcome" },
      { name: "lens", value: params.lens },
    ],
  });

  if (error) {
    console.error("[book-email] Resend error:", error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

/** After export request — confirms signup + where to read while PDF pipeline ships. */
export async function sendBookExportConfirmation(params: {
  email: string;
  lens: AudienceLens;
  format: "pdf" | "epub";
}): Promise<{ ok: boolean; error?: string }> {
  const resend = getResend();
  if (!resend) {
    console.warn("[book-email] RESEND_API_KEY not set; skipping send");
    return { ok: false, error: "resend_not_configured" };
  }

  const readUrl = lensReadingPath(params.lens);
  const html = `
    <p>We received your request for a <strong>${params.format.toUpperCase()}</strong> of <em>${BOOK_TITLE}</em> (${params.lens.replace(/-/g, " ")}).</p>
    <p>Automated export is rolling out; for now your reading link is always current:</p>
    <p><a href="${readUrl}">${readUrl}</a></p>
    <p>We'll follow up from this address when downloadable builds are attached.</p>
  `;

  const { error } = await resend.emails.send({
    from: resendFromHeader(),
    to: [params.email],
    subject: `Your ${params.format.toUpperCase()} request — ${BOOK_TITLE}`,
    html,
    tags: [
      { name: "flow", value: "book_export" },
      { name: "format", value: params.format },
    ],
  });

  if (error) {
    console.error("[book-email] Resend error:", error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

/** Day 3 / 7 / digest — call from cron or Resend automations when wired. */
export async function sendBookAuthorNoteStub(email: string): Promise<void> {
  void email;
  // Intentionally empty: schedule via Resend workflows or `/api/cron/book-digest` later.
}
