import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { newsletterSubscribers } from "@/lib/db/schema";
import { env } from "@/lib/env";
import { verifyNewsletterUnsubscribeToken } from "@/lib/newsletter-unsubscribe-token";
import { createSlidingWindowRateLimiter } from "@/lib/rate-limit-in-memory";

const limitUnsubIp = createSlidingWindowRateLimiter(30, 60 * 60 * 1000);

function siteUrl(): string {
  return env.NEXT_PUBLIC_SITE_URL ?? "https://movemental.com";
}

/**
 * GET — one-click unsubscribe using signed token (see `NEWSLETTER_UNSUBSCRIBE_SECRET`).
 * Redirects to `/newsletter/unsubscribed` with query state.
 */
export async function GET(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (!limitUnsubIp(ip)) {
    return NextResponse.redirect(new URL(`${siteUrl()}/newsletter/unsubscribed?error=rate_limited`));
  }

  const raw = request.nextUrl.searchParams.get("token")?.trim();
  if (!raw) {
    return NextResponse.redirect(new URL(`${siteUrl()}/newsletter/unsubscribed?error=missing_token`));
  }

  const secret = env.NEWSLETTER_UNSUBSCRIBE_SECRET;
  if (!secret || secret.length < 16) {
    return NextResponse.redirect(new URL(`${siteUrl()}/newsletter/unsubscribed?error=not_configured`));
  }

  const parsed = verifyNewsletterUnsubscribeToken(raw, secret);
  if (!parsed) {
    return NextResponse.redirect(new URL(`${siteUrl()}/newsletter/unsubscribed?error=invalid_token`));
  }

  const now = new Date().toISOString();

  try {
    const rows = await db
      .select({
        id: newsletterSubscribers.id,
        unsubscribed_at: newsletterSubscribers.unsubscribed_at,
      })
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.id, parsed.subscriberId))
      .limit(1);

    const row = rows[0];
    if (!row) {
      return NextResponse.redirect(new URL(`${siteUrl()}/newsletter/unsubscribed?error=unknown`));
    }

    if (row.unsubscribed_at) {
      return NextResponse.redirect(new URL(`${siteUrl()}/newsletter/unsubscribed?state=already`));
    }

    await db
      .update(newsletterSubscribers)
      .set({
        status: "unsubscribed",
        unsubscribed_at: now,
        updated_at: now,
        confirmation_token: null,
      })
      .where(eq(newsletterSubscribers.id, row.id));

    return NextResponse.redirect(new URL(`${siteUrl()}/newsletter/unsubscribed?state=ok`));
  } catch (err) {
    console.error("[newsletter/unsubscribe]", err);
    return NextResponse.redirect(new URL(`${siteUrl()}/newsletter/unsubscribed?error=server`));
  }
}
