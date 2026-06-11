import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { linkEnrolledUser } from "@/lib/services/safety/link-enrolled-user";
import { createClient } from "@/lib/supabase/server";

const BodySchema = z.object({
  inquiryId: z.string().uuid().optional(),
});

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id || !user.email) {
    return NextResponse.json(
      { error: { code: "unauthorized", message: "Sign in required." } },
      { status: 401 },
    );
  }

  let body: unknown = {};
  try {
    body = await request.json();
  } catch {
    // inquiryId optional — empty body is fine
  }

  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "validation_error", message: parsed.error.issues[0]?.message ?? "Invalid body." } },
      { status: 400 },
    );
  }

  const result = await linkEnrolledUser({
    authUserId: user.id,
    email: user.email,
    inquiryId: parsed.data.inquiryId,
  });

  if (!result.success) {
    const status =
      result.error.code === "email_mismatch" || result.error.code === "not_eligible" ? 403 : 400;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json({ success: true, data: result.data });
}
