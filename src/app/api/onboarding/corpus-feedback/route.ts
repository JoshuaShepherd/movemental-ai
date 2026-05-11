import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { resolveActiveOrganizationId } from "@/lib/services/onboarding/onboarding.service";
import { submitCorpusFeedback } from "@/lib/services/onboarding/onboarding-http.service";

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

  const decisions =
    typeof body === "object" && body && "decisions" in body
      ? (body as { decisions?: unknown }).decisions
      : undefined;

  if (!Array.isArray(decisions)) {
    return NextResponse.json(
      { error: { code: "validation_error", message: "decisions array is required." } },
      { status: 400 },
    );
  }

  const additions =
    typeof body === "object" && body && "additions" in body
      ? (body as { additions?: unknown }).additions
      : undefined;

  const resolved = await resolveActiveOrganizationId(user.id, organizationSlug);
  if (!resolved.success) {
    return NextResponse.json({ error: resolved.error }, { status: 400 });
  }

  const parsedDecisions = decisions
    .filter((d): d is Record<string, unknown> => typeof d === "object" && d !== null)
    .map((d) => ({
      itemId: String(d.itemId ?? ""),
      decision: d.decision as "approve" | "reject" | "edit",
      note: d.note as string | undefined,
      edits: d.edits as Record<string, unknown> | undefined,
    }))
    .filter((d) => d.itemId);

  const parsedAdditions = Array.isArray(additions)
    ? additions
        .filter((a): a is Record<string, unknown> => typeof a === "object" && a !== null)
        .map((a) => ({
          itemType: String(a.itemType ?? "note"),
          data: (a.data && typeof a.data === "object" ? a.data : {}) as Record<string, unknown>,
        }))
    : undefined;

  const result = await submitCorpusFeedback({
    organizationId: resolved.data.organizationId,
    userId: user.id,
    decisions: parsedDecisions,
    additions: parsedAdditions,
  });

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
