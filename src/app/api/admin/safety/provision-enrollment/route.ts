import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { provisionEnrollment } from "@/lib/services/safety/provision-enrollment";
import { isUserStaff } from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

const BodySchema = z.object({
  inquiryId: z.string().uuid(),
});

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

  const staff = await isUserStaff(user.id);
  if (!staff) {
    return NextResponse.json(
      { error: { code: "forbidden", message: "Staff access required." } },
      { status: 403 },
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

  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "validation_error", message: parsed.error.issues[0]?.message ?? "Invalid body." } },
      { status: 400 },
    );
  }

  const result = await provisionEnrollment(parsed.data.inquiryId);
  if (!result.success) {
    const status =
      result.error.code === "not_found" || result.error.code === "orphan_inquiry" ? 404 : 400;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json({ success: true, data: result.data }, { status: 201 });
}
