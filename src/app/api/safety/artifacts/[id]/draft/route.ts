import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { saveArtifactDraft } from "@/lib/services/safety/charter-dashboard";
import { requireSafetyApiContext } from "@/lib/services/safety/require-safety-api";

const BodySchema = z.object({
  bodyMd: z.string().max(500_000),
  org: z.string().max(120).optional(),
});

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: RouteContext) {
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

  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "validation_error", message: parsed.error.issues[0]?.message ?? "Invalid body." } },
      { status: 400 },
    );
  }

  const gate = await requireSafetyApiContext(parsed.data.org ?? null);
  if (!gate.ok) {
    return NextResponse.json({ error: { code: gate.code, message: gate.message } }, { status: gate.status });
  }

  const result = await saveArtifactDraft({
    organizationId: gate.ctx.organizationId,
    artifactId: id,
    bodyMd: parsed.data.bodyMd,
    userId: gate.ctx.userId,
  });

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: result.data });
}
