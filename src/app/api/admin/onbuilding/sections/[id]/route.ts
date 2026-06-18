import { NextRequest, NextResponse } from "next/server";

import { requireOnbuildingAdmin } from "@/lib/auth/require-onbuilding-admin";
import { OnbuildingSectionUpdateSchema } from "@/lib/schemas/onbuilding-admin";
import {
  deleteSection,
  getSection,
  updateSection,
} from "@/lib/services/onbuilding/onbuilding-sections-admin.service";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  const auth = await requireOnbuildingAdmin();
  if ("error" in auth) return auth.error;

  const { id } = await context.params;
  const result = await getSection(id);
  if (!result.success) {
    const status = result.error.code === "NOT_FOUND" ? 404 : 500;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json({ success: true, data: result.data });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const auth = await requireOnbuildingAdmin();
  if ("error" in auth) return auth.error;

  const { id } = await context.params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: { code: "invalid_json", message: "Body must be JSON." } },
      { status: 400 },
    );
  }

  const parsed = OnbuildingSectionUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "validation_error", message: parsed.error.issues[0]?.message ?? "Invalid body." } },
      { status: 400 },
    );
  }

  const result = await updateSection(auth.authUserId, id, parsed.data);
  if (!result.success) {
    const status =
      result.error.code === "NOT_FOUND" ? 404 : result.error.code === "CONFLICT" ? 409 : 500;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json({ success: true, data: result.data });
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const auth = await requireOnbuildingAdmin();
  if ("error" in auth) return auth.error;

  const { id } = await context.params;
  const result = await deleteSection(id);
  if (!result.success) {
    const status = result.error.code === "NOT_FOUND" ? 404 : 500;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json({ success: true, data: result.data });
}
