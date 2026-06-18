import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { createCheckoutSessionSchema } from "@/lib/safety/schemas";
import { createCheckoutSession } from "@/lib/safety/server/stripe";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: { code: "invalid_json", message: "Body must be JSON." } },
      { status: 400 },
    );
  }

  const parsed = createCheckoutSessionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "validation_error", message: parsed.error.issues[0]?.message ?? "Invalid body." } },
      { status: 400 },
    );
  }

  const result = await createCheckoutSession(parsed.data.enrollment_id);
  if (!result.success) {
    const status =
      result.error.code === "stripe_unconfigured"
        ? 503
        : result.error.code === "not_found"
          ? 404
          : 400;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json({ success: true, data: result.data });
}
