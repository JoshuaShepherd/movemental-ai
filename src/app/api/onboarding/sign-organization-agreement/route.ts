import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { implementationMouDashboardDocumentHref } from "@/lib/legal/agreement-catalog";
import {
  ESIGN_ONBOARDING_AGREEMENT_TYPE,
  ESIGN_ONBOARDING_AGREEMENT_VERSION,
  getOrgImplementationMouSignStatus,
  recordOrgImplementationMouEsign,
} from "@/lib/services/onboarding/org-agreement-esign.service";
import { resolveActiveOrganizationId } from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

function clientIp(request: NextRequest): string | null {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip");
}

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    return NextResponse.json({ error: { code: "unauthorized", message: "Sign in required." } }, { status: 401 });
  }

  const organizationSlug = request.nextUrl.searchParams.get("organizationSlug") ?? undefined;
  const resolved = await resolveActiveOrganizationId(user.id, organizationSlug);
  if (!resolved.success) {
    return NextResponse.json({ error: resolved.error }, { status: 400 });
  }

  const status = await getOrgImplementationMouSignStatus(resolved.data.organizationId);
  return NextResponse.json({
    success: true,
    organizationSlug: resolved.data.slug,
    agreementType: ESIGN_ONBOARDING_AGREEMENT_TYPE,
    agreementVersion: ESIGN_ONBOARDING_AGREEMENT_VERSION,
    documentHref: implementationMouDashboardDocumentHref(resolved.data.slug),
    ...status,
  });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    return NextResponse.json({ error: { code: "unauthorized", message: "Sign in required." } }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: { code: "invalid_json", message: "Body must be JSON." } },
      { status: 400 },
    );
  }

  const organizationSlug =
    typeof body === "object" && body && "organizationSlug" in body
      ? String((body as { organizationSlug?: unknown }).organizationSlug ?? "").trim() || undefined
      : undefined;

  const signatoryLegalName =
    typeof body === "object" && body && "signatoryLegalName" in body
      ? String((body as { signatoryLegalName?: unknown }).signatoryLegalName ?? "")
      : "";

  const consentReview =
    typeof body === "object" && body && "consentReviewedAgreement" in body
      ? Boolean((body as { consentReviewedAgreement?: unknown }).consentReviewedAgreement)
      : false;

  const consentEsign =
    typeof body === "object" && body && "consentElectronicSignature" in body
      ? Boolean((body as { consentElectronicSignature?: unknown }).consentElectronicSignature)
      : false;

  if (!consentReview || !consentEsign) {
    return NextResponse.json(
      {
        error: {
          code: "validation_error",
          message: "Confirm both checkboxes before signing.",
        },
      },
      { status: 400 },
    );
  }

  const resolved = await resolveActiveOrganizationId(user.id, organizationSlug);
  if (!resolved.success) {
    return NextResponse.json({ error: resolved.error }, { status: 400 });
  }

  const documentHref = implementationMouDashboardDocumentHref(resolved.data.slug);
  const documentUrl = documentHref;

  const result = await recordOrgImplementationMouEsign({
    organizationId: resolved.data.organizationId,
    signedByUserId: user.id,
    documentUrl,
    signatoryLegalName,
    audit: {
      userAgent: request.headers.get("user-agent"),
      ip: clientIp(request),
    },
  });

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  if (!result.data.alreadyExisted) {
    revalidatePath("/sandboxlive/org/agreements");
    revalidatePath("/welcome");
    revalidatePath("/dashboard/onboarding/agreement");
    revalidatePath("/onboarding/agreement");
  }

  return NextResponse.json({
    success: true,
    alreadySigned: result.data.alreadyExisted,
    id: result.data.id,
  });
}
