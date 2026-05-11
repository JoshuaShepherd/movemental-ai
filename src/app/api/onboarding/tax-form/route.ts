import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { resolveActiveOrganizationId } from "@/lib/services/onboarding/onboarding.service";
import { persistTaxForm } from "@/lib/services/onboarding/onboarding-http.service";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    return NextResponse.json(
      { error: { code: "unauthorized", message: "Sign in required." } },
      { status: 401 },
    );
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
      ? ((body as { organizationSlug?: unknown }).organizationSlug as string | undefined)
      : undefined;

  const taxForm =
    typeof body === "object" && body && "taxForm" in body
      ? (body as { taxForm?: Record<string, unknown> }).taxForm
      : undefined;

  if (!taxForm || typeof taxForm !== "object") {
    return NextResponse.json(
      { error: { code: "validation_error", message: "taxForm object is required." } },
      { status: 400 },
    );
  }

  const resolved = await resolveActiveOrganizationId(user.id, organizationSlug);
  if (!resolved.success) {
    return NextResponse.json({ error: resolved.error }, { status: 400 });
  }

  const result = await persistTaxForm({
    organizationId: resolved.data.organizationId,
    taxForm: {
      formType: taxForm.formType as "W-9" | "W-8BEN" | "not_applicable",
      legalName: taxForm.legalName as string | undefined,
      taxIdentifier: taxForm.taxIdentifier as string | undefined,
      countryOfResidence: taxForm.countryOfResidence as string | undefined,
      notes: taxForm.notes as string | undefined,
    },
  });

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
