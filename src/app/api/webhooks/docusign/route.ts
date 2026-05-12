import { NextRequest, NextResponse } from "next/server";

import { and, eq, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import { organizations, signedAgreements } from "@/lib/db/schema";
import { env } from "@/lib/env";
import { AGREEMENT_TYPE_ENGAGEMENT_MSA } from "@/lib/legal/agreement-catalog";
import { tryCompleteSignAgreementFromWebhook } from "@/lib/onboarding/webhook-completion";
import { parseDocuSignConnectJson } from "@/lib/webhooks/docusign-connect-parse";
import { verifyDocuSignConnectHmac } from "@/lib/webhooks/docusign-signature";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const secret = env.DOCUSIGN_CONNECT_HMAC_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: { code: "not_configured", message: "DocuSign Connect HMAC is not configured." } },
      { status: 503 },
    );
  }

  const rawBody = await request.text();
  const sig = request.headers.get("X-DocuSign-Signature-1");
  if (!verifyDocuSignConnectHmac(rawBody, sig, secret)) {
    return NextResponse.json({ error: { code: "invalid_signature", message: "Invalid signature." } }, { status: 401 });
  }

  let json: unknown;
  try {
    json = JSON.parse(rawBody) as unknown;
  } catch {
    return NextResponse.json({ error: { code: "invalid_json", message: "Body must be JSON." } }, { status: 400 });
  }

  const parsed = parseDocuSignConnectJson(json);
  if (!parsed) {
    return NextResponse.json(
      { error: { code: "parse_error", message: "Missing envelope id or organization_slug custom field." } },
      { status: 400 },
    );
  }

  if (String(parsed.status).toLowerCase() !== "completed") {
    return NextResponse.json({ ok: true, ignored: true, reason: "not_completed" });
  }

  const [org] = await db
    .select({ id: organizations.id })
    .from(organizations)
    .where(eq(organizations.slug, parsed.organizationSlug))
    .limit(1);

  if (!org) {
    return NextResponse.json(
      { error: { code: "org_not_found", message: "Unknown organization slug." } },
      { status: 404 },
    );
  }

  const [dup] = await db
    .select({ id: signedAgreements.id })
    .from(signedAgreements)
    .where(
      and(
        eq(signedAgreements.organization_id, org.id),
        sql`${signedAgreements.metadata}->>'docusign_envelope_id' = ${parsed.envelopeId}`,
      ),
    )
    .limit(1);

  if (dup) {
    return NextResponse.json({ ok: true, duplicate: true });
  }

  const now = new Date().toISOString();
  await db.insert(signedAgreements).values({
    organization_id: org.id,
    agreement_type: parsed.agreementType,
    agreement_version: parsed.agreementVersion,
    signed_at: now,
    signed_by_user_id: null,
    document_url: parsed.documentUrl,
    metadata: {
      docusign_envelope_id: parsed.envelopeId,
      received_at: now,
    },
  });

  if (parsed.agreementType === AGREEMENT_TYPE_ENGAGEMENT_MSA) {
    await tryCompleteSignAgreementFromWebhook(org.id);
  }

  return NextResponse.json({ ok: true });
}
