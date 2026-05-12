import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { setOrganizationCohortStartDateFromIso } from "@/lib/onboarding/cohort-start-date";
import { resolveActiveOrganizationId } from "@/lib/services/onboarding/onboarding.service";

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

  const cohortStartDate =
    typeof body === "object" && body && "cohortStartDate" in body
      ? String((body as { cohortStartDate: unknown }).cohortStartDate)
      : "";
  const organizationSlug =
    typeof body === "object" && body && "organizationSlug" in body
      ? ((body as { organizationSlug?: unknown }).organizationSlug as string | undefined)
      : undefined;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(cohortStartDate)) {
    return NextResponse.json(
      { error: { code: "validation_error", message: "cohortStartDate must be YYYY-MM-DD." } },
      { status: 400 },
    );
  }

  const resolved = await resolveActiveOrganizationId(user.id, organizationSlug);
  if (!resolved.success) {
    return NextResponse.json({ error: resolved.error }, { status: 400 });
  }

  await setOrganizationCohortStartDateFromIso(resolved.data.organizationId, `${cohortStartDate}T12:00:00.000Z`);

  return NextResponse.json({ success: true });
}
