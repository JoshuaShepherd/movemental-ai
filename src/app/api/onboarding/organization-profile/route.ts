import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { resolveActiveOrganizationId } from "@/lib/services/onboarding/onboarding.service";
import { persistOrganizationProfile } from "@/lib/services/onboarding/onboarding-http.service";

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

  const profile =
    typeof body === "object" && body && "profile" in body
      ? (body as { profile?: Record<string, unknown> }).profile
      : undefined;

  if (!profile || typeof profile !== "object") {
    return NextResponse.json(
      { error: { code: "validation_error", message: "profile object is required." } },
      { status: 400 },
    );
  }

  const resolved = await resolveActiveOrganizationId(user.id, organizationSlug);
  if (!resolved.success) {
    return NextResponse.json({ error: resolved.error }, { status: 400 });
  }

  const result = await persistOrganizationProfile({
    organizationId: resolved.data.organizationId,
    profile: {
      publicName: String(profile.publicName ?? ""),
      primaryDomain: String(profile.primaryDomain ?? ""),
      primaryContactName: String(profile.primaryContactName ?? ""),
      primaryContactEmail: String(profile.primaryContactEmail ?? ""),
      secondaryContactName: profile.secondaryContactName as string | undefined,
      secondaryContactEmail: profile.secondaryContactEmail as string | undefined,
    },
  });

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
