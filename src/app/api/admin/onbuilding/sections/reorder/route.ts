import { NextRequest, NextResponse } from "next/server";

import { requireOnbuildingAdmin } from "@/lib/auth/require-onbuilding-admin";
import { OnbuildingSectionReorderSchema } from "@/lib/schemas/onbuilding-admin";
import { reorderSections } from "@/lib/services/onbuilding/onbuilding-sections-admin.service";

export async function PUT(request: NextRequest) {
  const auth = await requireOnbuildingAdmin();
  if ("error" in auth) return auth.error;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: { code: "invalid_json", message: "Body must be JSON." } },
      { status: 400 },
    );
  }

  const parsed = OnbuildingSectionReorderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "validation_error", message: parsed.error.issues[0]?.message ?? "Invalid body." } },
      { status: 400 },
    );
  }

  const result = await reorderSections(
    auth.authUserId,
    parsed.data.movementLeaderId,
    parsed.data.orderedSectionIds,
  );
  if (!result.success) {
    const status = result.error.code === "VALIDATION_ERROR" ? 400 : 500;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json({ success: true, data: result.data });
}
