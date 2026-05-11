import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { resolveActiveOrganizationId } from "@/lib/services/onboarding/onboarding.service";
import { persistUploadedAssetRecord } from "@/lib/services/onboarding/onboarding-http.service";

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

  const asset =
    typeof body === "object" && body && "asset" in body
      ? (body as { asset?: Record<string, unknown> }).asset
      : undefined;

  if (!asset || typeof asset !== "object" || typeof asset.storagePath !== "string") {
    return NextResponse.json(
      { error: { code: "validation_error", message: "asset.storagePath is required." } },
      { status: 400 },
    );
  }

  const resolved = await resolveActiveOrganizationId(user.id, organizationSlug);
  if (!resolved.success) {
    return NextResponse.json({ error: resolved.error }, { status: 400 });
  }

  const result = await persistUploadedAssetRecord({
    organizationId: resolved.data.organizationId,
    userId: user.id,
    asset: {
      storagePath: asset.storagePath,
      assetType: String(asset.assetType ?? "other"),
      contentType: asset.contentType as string | undefined,
      sizeBytes: typeof asset.sizeBytes === "number" ? asset.sizeBytes : undefined,
    },
  });

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ success: true, data: result.data });
}
