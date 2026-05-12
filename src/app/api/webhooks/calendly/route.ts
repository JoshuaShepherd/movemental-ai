import { NextRequest, NextResponse } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { organizations } from "@/lib/db/schema";
import { env } from "@/lib/env";
import { setOrganizationCohortStartDateFromIso } from "@/lib/onboarding/cohort-start-date";
import { tryCompleteChooseCohortFromWebhook } from "@/lib/onboarding/webhook-completion";
import { parseCalendlyInviteePayload } from "@/lib/webhooks/calendly-parse";
import { verifyCalendlyWebhookSignature } from "@/lib/webhooks/calendly-signature";

export const dynamic = "force-dynamic";

function readLastInviteeUri(settings: unknown): string | undefined {
  if (!settings || typeof settings !== "object") return undefined;
  const v = (settings as { calendly_webhook_last_invitee_uri?: unknown }).calendly_webhook_last_invitee_uri;
  return typeof v === "string" ? v : undefined;
}

export async function POST(request: NextRequest) {
  const signingKey = env.CALENDLY_WEBHOOK_SIGNING_KEY;
  if (!signingKey) {
    return NextResponse.json(
      { error: { code: "not_configured", message: "Calendly webhook signing key is not configured." } },
      { status: 503 },
    );
  }

  const rawBody = await request.text();
  const sigHeader = request.headers.get("Calendly-Webhook-Signature");
  if (!verifyCalendlyWebhookSignature(sigHeader, rawBody, signingKey)) {
    return NextResponse.json({ error: { code: "invalid_signature", message: "Invalid signature." } }, { status: 401 });
  }

  let json: unknown;
  try {
    json = JSON.parse(rawBody) as unknown;
  } catch {
    return NextResponse.json({ error: { code: "invalid_json", message: "Body must be JSON." } }, { status: 400 });
  }

  const root = json as Record<string, unknown>;
  const event = typeof root.event === "string" ? root.event : "";
  if (event !== "invitee.created") {
    return NextResponse.json({ ok: true, ignored: true, reason: "unsupported_event" });
  }

  const parsed = parseCalendlyInviteePayload(json);
  if (!parsed) {
    return NextResponse.json(
      {
        error: {
          code: "parse_error",
          message: "Missing start time or utm_content (organization slug) on payload.",
        },
      },
      { status: 400 },
    );
  }

  const [org] = await db
    .select({ id: organizations.id, settings: organizations.settings })
    .from(organizations)
    .where(eq(organizations.slug, parsed.organizationSlug))
    .limit(1);

  if (!org) {
    return NextResponse.json(
      { error: { code: "org_not_found", message: "Unknown organization slug from utm_content." } },
      { status: 404 },
    );
  }

  if (parsed.inviteeUri && readLastInviteeUri(org.settings) === parsed.inviteeUri) {
    return NextResponse.json({ ok: true, duplicate: true });
  }

  await setOrganizationCohortStartDateFromIso(org.id, parsed.startTimeIso);

  const now = new Date().toISOString();
  const prevSettings =
    org.settings && typeof org.settings === "object" && !Array.isArray(org.settings)
      ? (org.settings as Record<string, unknown>)
      : {};
  const nextSettings = {
    ...prevSettings,
    ...(parsed.inviteeUri ? { calendly_webhook_last_invitee_uri: parsed.inviteeUri } : {}),
    calendly_webhook_last_received_at: now,
  };

  await db
    .update(organizations)
    .set({
      settings: nextSettings,
      updated_at: now,
    })
    .where(eq(organizations.id, org.id));

  await tryCompleteChooseCohortFromWebhook(org.id);

  return NextResponse.json({ ok: true });
}
