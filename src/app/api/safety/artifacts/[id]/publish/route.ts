import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { publishArtifact } from "@/lib/services/safety/charter-dashboard";
import { requireSafetyApiContext } from "@/lib/services/safety/require-safety-api";

const BodySchema = z.object({
  org: z.string().max(120).optional(),
});

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  let body: unknown = {};
  try {
    body = await request.json();
  } catch {
    // org slug optional
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

  const result = await publishArtifact({
    organizationId: gate.ctx.organizationId,
    artifactId: id,
    userId: gate.ctx.userId,
  });

  if (!result.success) {
    const status = result.error.code === "not_found" ? 404 : 400;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json({ success: true, data: result.data }, { status: 201 });
}
