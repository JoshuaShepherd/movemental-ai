import "server-only";

import { and, gte, lt, like, eq, or, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import { newsletterSubscribers } from "@/lib/db/schema";
import { sendToolkitFollowupEmail, type ToolkitFollowupDay } from "@/lib/email/send-toolkit-followup-email";
import { env } from "@/lib/env";
import { createNewsletterUnsubscribeToken } from "@/lib/newsletter-unsubscribe-token";

/**
 * Day-3 / Day-7 follow-up cron for field-guide leads.
 *
 * Idempotency without a schema change: each follow-up uses a 24-hour window off
 * `created_at` ([3d,4d) for day-3, [7d,8d) for day-7). Run **once daily** and
 * every confirmed toolkit lead matches each window on exactly one run. The cron
 * schedule lives in `vercel.json`; the route guards with `CRON_SECRET`.
 *
 * Scoped to toolkit sources only (`safety-toolkit:%` / `sandbox-toolkit:%`), so
 * general newsletter and `assessment-map` subscribers are never touched.
 */

const DAY_MS = 24 * 60 * 60 * 1000;

function siteUrl(): string {
  return env.NEXT_PUBLIC_SITE_URL ?? "https://movemental.com";
}

function unsubscribeUrlFor(subscriberId: string): string | null {
  const secret = env.NEWSLETTER_UNSUBSCRIBE_SECRET;
  if (!secret || secret.length < 16) return null;
  return `${siteUrl()}/api/newsletter/unsubscribe?token=${encodeURIComponent(createNewsletterUnsubscribeToken(subscriberId, secret))}`;
}

async function sendWindow(day: ToolkitFollowupDay, nowMs: number): Promise<{ matched: number; sent: number }> {
  const windowStart = new Date(nowMs - (day + 1) * DAY_MS).toISOString();
  const windowEnd = new Date(nowMs - day * DAY_MS).toISOString();

  const rows = await db
    .select({ id: newsletterSubscribers.id, email: newsletterSubscribers.email })
    .from(newsletterSubscribers)
    .where(
      and(
        eq(newsletterSubscribers.status, "confirmed"),
        or(
          like(newsletterSubscribers.source, "safety-toolkit:%"),
          like(newsletterSubscribers.source, "sandbox-toolkit:%"),
        ),
        gte(newsletterSubscribers.created_at, sql`${windowStart}`),
        lt(newsletterSubscribers.created_at, sql`${windowEnd}`),
      ),
    );

  let sent = 0;
  for (const row of rows) {
    const ok = await sendToolkitFollowupEmail(row.email, day, {
      unsubscribeUrl: unsubscribeUrlFor(row.id),
    });
    if (ok) sent += 1;
  }
  return { matched: rows.length, sent };
}

export async function runToolkitFollowupCron(nowMs: number): Promise<{
  day3: { matched: number; sent: number };
  day7: { matched: number; sent: number };
}> {
  const day3 = await sendWindow(3, nowMs);
  const day7 = await sendWindow(7, nowMs);
  return { day3, day7 };
}
