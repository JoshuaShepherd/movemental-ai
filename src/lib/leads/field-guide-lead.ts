import "server-only";

import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { newsletterSubscribers } from "@/lib/db/schema";
import { sendToolkitLeadEmail, type ToolkitLeadKind } from "@/lib/email/send-safety-toolkit-email";
import { env } from "@/lib/env";
import { createNewsletterUnsubscribeToken } from "@/lib/newsletter-unsubscribe-token";

/**
 * Shared field-guide (Safety / Sandbox) lead capture. Single-sourced so both the
 * public `/api/toolkit-download` route and the agent-room `/api/agent-room/capture`
 * (`kind: "free"`) endpoint behave identically.
 *
 * Reuses `newsletter_subscribers` with a `source` of `safety-toolkit:{surface}` /
 * `sandbox-toolkit:{surface}`. Transactional: status is set to "confirmed" on the
 * spot and the day-0 PDF email is sent (unless `skipEmail`, e.g. Sandbox review gate).
 */
export interface RecordFieldGuideLeadInput {
  orgId: string;
  email: string;
  organization?: string | null;
  fieldGuide?: ToolkitLeadKind;
  /** Raw source surface label (e.g. "modal", "agent-room"). Slugified internally. */
  source?: string | null;
  /** When true, the lead is stored but no PDF email is sent (Sandbox review gate). */
  skipEmail?: boolean;
}

export interface RecordFieldGuideLeadResult {
  subscriberId: string;
  emailSent: boolean;
  state: "recorded" | "delivered";
}

function siteUrlForUnsub(): string {
  return env.NEXT_PUBLIC_SITE_URL ?? "https://movemental.ai";
}

export async function recordFieldGuideLead(
  input: RecordFieldGuideLeadInput,
): Promise<RecordFieldGuideLeadResult> {
  const emailNorm = input.email.toLowerCase().trim();
  const fieldGuide: ToolkitLeadKind = input.fieldGuide ?? "safety";
  const surface = (input.source ?? "modal").replace(/[^a-z0-9_-]/gi, "-").slice(0, 48);
  const sourcePrefix = fieldGuide === "sandbox" ? "sandbox-toolkit" : "safety-toolkit";
  const source = `${sourcePrefix}:${surface}`;
  const organization = input.organization?.trim() || null;
  const ts = new Date().toISOString();

  const existing = await db
    .select({ id: newsletterSubscribers.id, status: newsletterSubscribers.status })
    .from(newsletterSubscribers)
    .where(and(eq(newsletterSubscribers.email, emailNorm), eq(newsletterSubscribers.organization_id, input.orgId)))
    .limit(1);

  const row = existing[0];
  let subscriberId: string;

  if (row) {
    const updated = await db
      .update(newsletterSubscribers)
      .set({
        source,
        name: organization ?? undefined,
        // Mark confirmed immediately — toolkit is transactional, not double opt-in.
        status: "confirmed",
        confirmed_at: ts,
        updated_at: ts,
      })
      .where(eq(newsletterSubscribers.id, row.id))
      .returning({ id: newsletterSubscribers.id });
    const u = updated[0];
    if (!u?.id) throw new Error("Field-guide lead update did not return id");
    subscriberId = u.id;
  } else {
    const inserted = await db
      .insert(newsletterSubscribers)
      .values({
        email: emailNorm,
        name: organization,
        source,
        organization_id: input.orgId,
        status: "confirmed",
        confirmed_at: ts,
      })
      .returning({ id: newsletterSubscribers.id });
    const ins = inserted[0];
    if (!ins?.id) throw new Error("Field-guide lead insert did not return id");
    subscriberId = ins.id;
  }

  const secret = env.NEWSLETTER_UNSUBSCRIBE_SECRET;
  const unsubscribeUrl =
    secret && secret.length >= 16
      ? `${siteUrlForUnsub()}/api/newsletter/unsubscribe?token=${encodeURIComponent(createNewsletterUnsubscribeToken(subscriberId, secret))}`
      : null;

  const emailSent = input.skipEmail
    ? false
    : await sendToolkitLeadEmail(emailNorm, fieldGuide, { unsubscribeUrl });

  return {
    subscriberId,
    emailSent,
    state: input.skipEmail ? "recorded" : "delivered",
  };
}
