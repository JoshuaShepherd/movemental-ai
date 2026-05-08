import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";
import { newsletterSubscribers } from "@/lib/db/schema";
import { sendSafetyToolkitEmail } from "@/lib/email/send-safety-toolkit-email";
import { env } from "@/lib/env";
import { createNewsletterUnsubscribeToken } from "@/lib/newsletter-unsubscribe-token";
import { createSlidingWindowRateLimiter } from "@/lib/rate-limit-in-memory";
import { getTenantOrgId } from "@/lib/tenant";

const ToolkitSchema = z.object({
  email: z.string().email("Valid email is required"),
  organization: z.string().max(200).optional(),
  source: z.string().max(50).optional(),
});

const toolkitRateLimitIp = createSlidingWindowRateLimiter(10, 60 * 60 * 1000);

const SOURCE_PREFIX = "safety-toolkit";

function siteUrlForUnsub(): string {
  return env.NEXT_PUBLIC_SITE_URL ?? "https://movemental.com";
}

/**
 * Lead capture for the "It Starts With Safety" toolkit.
 *
 * Reuses the `newsletter_subscribers` table with `source` of the form
 * `safety-toolkit:{surface}` (e.g. `safety-toolkit:modal`,
 * `safety-toolkit:safety-page`). Unlike the general newsletter signup, the
 * toolkit is transactional: status is set to "confirmed" immediately and the
 * day-0 toolkit email is sent without a double-opt-in step.
 *
 * Day 3 / Day 7 follow-ups are not yet wired — see the TODO in
 * `src/lib/email/send-safety-toolkit-email.ts`.
 */
export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (!toolkitRateLimitIp(ip)) {
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

  const parsed = ToolkitSchema.safeParse(body);
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
            "Set TENANT_ORG_ID to your Movemental organization UUID so toolkit signups can be stored.",
        },
      },
      { status: 503 },
    );
  }

  const emailNorm = parsed.data.email.toLowerCase().trim();
  const surface = (parsed.data.source ?? "modal").replace(/[^a-z0-9_-]/gi, "-").slice(0, 32);
  const source = `${SOURCE_PREFIX}:${surface}`;
  const organization = parsed.data.organization?.trim() || null;
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
      if (!u?.id) {
        throw new Error("Toolkit lead update did not return id");
      }
      subscriberId = u.id;
    } else {
      const inserted = await db
        .insert(newsletterSubscribers)
        .values({
          email: emailNorm,
          name: organization,
          source,
          organization_id: orgId,
          status: "confirmed",
          confirmed_at: ts,
        })
        .returning({ id: newsletterSubscribers.id });
      const ins = inserted[0];
      if (!ins?.id) {
        throw new Error("Toolkit lead insert did not return id");
      }
      subscriberId = ins.id;
    }

    const secret = env.NEWSLETTER_UNSUBSCRIBE_SECRET;
    const unsubscribeUrl =
      secret && secret.length >= 16
        ? `${siteUrlForUnsub()}/api/newsletter/unsubscribe?token=${encodeURIComponent(createNewsletterUnsubscribeToken(subscriberId, secret))}`
        : null;

    const emailSent = await sendSafetyToolkitEmail(emailNorm, { unsubscribeUrl });

    return NextResponse.json({
      success: true,
      state: "delivered" as const,
      emailSent,
    });
  } catch (err) {
    console.error("Toolkit download lead capture failed:", err);
    return NextResponse.json(
      { error: { code: "SERVER_ERROR", message: "Something went wrong. Please try again." } },
      { status: 500 },
    );
  }
}
