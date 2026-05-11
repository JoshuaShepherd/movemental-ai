import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { adminCompleteOnboardingTaskOnBehalf, isUserStaff } from "@/lib/services/onboarding/onboarding.service";

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
  const taskKey =
    typeof body === "object" && body && "taskKey" in body ? String((body as { taskKey: unknown }).taskKey) : "";
  const note =
    typeof body === "object" && body && "note" in body ? String((body as { note: unknown }).note) : "";

  if (!organizationId || !taskKey) {
    return NextResponse.json(
      { error: { code: "validation_error", message: "organizationId and taskKey are required." } },
      { status: 400 },
    );
  }

  const result = await adminCompleteOnboardingTaskOnBehalf({
    staffUserId: user.id,
    organizationId,
    taskKey,
    note,
  });

  if (!result.success) {
    const code = result.error.code === "forbidden" ? 403 : 400;
    return NextResponse.json({ error: result.error }, { status: code });
  }

  return NextResponse.json({ success: true });
}
