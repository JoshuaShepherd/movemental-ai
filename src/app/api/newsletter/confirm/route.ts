import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { newsletterSubscribers } from "@/lib/db/schema";
import { env } from "@/lib/env";

function siteUrl(): string {
  return env.NEXT_PUBLIC_SITE_URL ?? "https://movemental.ai";
}

/**
 * GET — complete double opt-in for `newsletter_subscribers` using `confirmation_token`.
 * Redirects to a public confirmation page (or home with error query).
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token")?.trim();
  if (!token) {
    return NextResponse.redirect(new URL(`${siteUrl()}/newsletter/confirmed?error=missing_token`));
  }

  try {
    const rows = await db
      .select({
        id: newsletterSubscribers.id,
        status: newsletterSubscribers.status,
      })
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.confirmation_token, token))
      .limit(1);

    const row = rows[0];
    if (!row) {
      return NextResponse.redirect(new URL(`${siteUrl()}/newsletter/confirmed?error=invalid_token`));
    }

    if (row.status === "confirmed") {
      return NextResponse.redirect(new URL(`${siteUrl()}/newsletter/confirmed?state=already`));
    }

    const now = new Date().toISOString();
    const updated = await db
      .update(newsletterSubscribers)
      .set({
        status: "confirmed",
        confirmed_at: now,
        confirmation_token: null,
        updated_at: now,
      })
      .where(and(eq(newsletterSubscribers.id, row.id), eq(newsletterSubscribers.confirmation_token, token)))
      .returning({ id: newsletterSubscribers.id });

    if (updated.length === 0) {
      return NextResponse.redirect(new URL(`${siteUrl()}/newsletter/confirmed?error=invalid_token`));
    }

    return NextResponse.redirect(new URL(`${siteUrl()}/newsletter/confirmed?state=confirmed`));
  } catch (err) {
    console.error("[newsletter/confirm]", err);
    return NextResponse.redirect(new URL(`${siteUrl()}/newsletter/confirmed?error=server`));
  }
}
