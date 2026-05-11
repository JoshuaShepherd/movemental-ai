import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { resolveActiveOrganizationId } from "@/lib/services/onboarding/onboarding.service";
import { persistBrandGuidelines } from "@/lib/services/onboarding/onboarding-http.service";

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

  const guidelines =
    typeof body === "object" && body && "guidelines" in body
      ? (body as { guidelines?: Record<string, unknown> }).guidelines
      : undefined;

  if (!guidelines || typeof guidelines !== "object") {
    return NextResponse.json(
      { error: { code: "validation_error", message: "guidelines object is required." } },
      { status: 400 },
    );
  }

  const resolved = await resolveActiveOrganizationId(user.id, organizationSlug);
  if (!resolved.success) {
    return NextResponse.json({ error: resolved.error }, { status: 400 });
  }

  const result = await persistBrandGuidelines({
    organizationId: resolved.data.organizationId,
    guidelines: {
      voiceAdjectives: Array.isArray(guidelines.voiceAdjectives)
        ? (guidelines.voiceAdjectives as string[])
        : [],
      audienceDescription: String(guidelines.audienceDescription ?? ""),
      wordsToAvoid: Array.isArray(guidelines.wordsToAvoid) ? (guidelines.wordsToAvoid as string[]) : [],
      freeText: guidelines.freeText as string | undefined,
    },
  });

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
