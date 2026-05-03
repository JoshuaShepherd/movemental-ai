import { randomBytes } from "node:crypto";

import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";
import { newsletterSubscribers } from "@/lib/db/schema";
import { sendNewsletterConfirmationEmail } from "@/lib/email/send-newsletter-confirmation";
import { env } from "@/lib/env";
import { createNewsletterUnsubscribeToken } from "@/lib/newsletter-unsubscribe-token";
import { createSlidingWindowRateLimiter } from "@/lib/rate-limit-in-memory";
import { getTenantOrgId } from "@/lib/tenant";

const NewsletterSchema = z.object({
  email: z.string().email("Valid email is required"),
  source: z.string().max(50).optional(),
});

const newsletterRateLimitIp = createSlidingWindowRateLimiter(10, 60 * 60 * 1000);

function siteUrlForUnsub(): string {
  return env.NEXT_PUBLIC_SITE_URL ?? "https://movemental.com";
}

/**
 * Newsletter signup with double opt-in.
 * Rows live in `newsletter_subscribers` (Postgres is source of truth).
 * Confirmation link: GET /api/newsletter/confirm?token=…
 *
 * Sequences / digests: prefer Vercel Cron calling dedicated routes once rules exist;
 * do not duplicate subscriber state into Resend Audiences without a sync plan.
 */
export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (!newsletterRateLimitIp(ip)) {
    return NextResponse.json(
      { error: { code: "RATE_LIMITED", message: "Too many attempts. Please try again later." } },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: { code: "INVALID_JSON", message: "Request body must be valid JSON" } },
      { status: 400 },
    );
  }

  const parsed = NewsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: parsed.error.issues[0]?.message ?? "Validation failed" } },
      { status: 400 },
    );
  }

  const orgId = getTenantOrgId();
  if (!orgId) {
    return NextResponse.json(
      {
        error: {
          code: "TENANT_NOT_CONFIGURED",
          message:
            "Set TENANT_ORG_ID to your Movemental organization UUID so newsletter signups can be stored.",
        },
      },
      { status: 503 },
    );
  }

  const emailNorm = parsed.data.email.toLowerCase().trim();
  const source = parsed.data.source ?? "footer";
  const token = randomBytes(32).toString("hex");
  const ts = new Date().toISOString();

  try {
    const existing = await db
      .select({
        id: newsletterSubscribers.id,
        status: newsletterSubscribers.status,
      })
      .from(newsletterSubscribers)
      .where(
        and(eq(newsletterSubscribers.email, emailNorm), eq(newsletterSubscribers.organization_id, orgId)),
      )
      .limit(1);

    const row = existing[0];

    if (row?.status === "confirmed") {
      return NextResponse.json({
        success: true,
        state: "already_confirmed" as const,
        emailSent: false,
      });
    }

    let subscriberId: string;

    if (row) {
      const updated = await db
        .update(newsletterSubscribers)
        .set({
          confirmation_token: token,
          status: "pending",
          source,
          updated_at: ts,
        })
        .where(eq(newsletterSubscribers.id, row.id))
        .returning({ id: newsletterSubscribers.id });
      const u = updated[0];
      if (!u?.id) {
        throw new Error("Newsletter update did not return id");
      }
      subscriberId = u.id;
    } else {
      const inserted = await db
        .insert(newsletterSubscribers)
        .values({
          email: emailNorm,
          source,
          organization_id: orgId,
          status: "pending",
          confirmation_token: token,
        })
        .returning({ id: newsletterSubscribers.id });
      const ins = inserted[0];
      if (!ins?.id) {
        throw new Error("Newsletter insert did not return id");
      }
      subscriberId = ins.id;
    }

    const secret = env.NEWSLETTER_UNSUBSCRIBE_SECRET;
    const unsubscribeUrl =
      secret && secret.length >= 16
        ? `${siteUrlForUnsub()}/api/newsletter/unsubscribe?token=${encodeURIComponent(createNewsletterUnsubscribeToken(subscriberId, secret))}`
        : null;

    const emailSent = await sendNewsletterConfirmationEmail(emailNorm, token, unsubscribeUrl);

    return NextResponse.json({
      success: true,
      state: "pending_confirmation" as const,
      emailSent,
    });
  } catch (err) {
    console.error("Newsletter signup failed:", err);
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 },
    );
  }
}
