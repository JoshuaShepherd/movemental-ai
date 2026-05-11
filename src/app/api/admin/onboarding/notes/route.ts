import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { addStaffOnboardingNote, isUserStaff } from "@/lib/services/onboarding/onboarding.service";

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

  const organizationId =
    typeof body === "object" && body && "organizationId" in body
      ? String((body as { organizationId: unknown }).organizationId)
      : "";
  const noteBody =
    typeof body === "object" && body && "body" in body ? String((body as { body: unknown }).body) : "";

  if (!organizationId) {
    return NextResponse.json(
      { error: { code: "validation_error", message: "organizationId is required." } },
      { status: 400 },
    );
  }

  const result = await addStaffOnboardingNote({
    staffUserId: user.id,
    organizationId,
    body: noteBody,
  });

  if (!result.success) {
    const code = result.error.code === "forbidden" ? 403 : 400;
    return NextResponse.json({ error: result.error }, { status: code });
  }

  return NextResponse.json({ success: true, data: { note: result.data } });
}
