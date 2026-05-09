import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import {
  completeOnboardingTask,
  resolveActiveOrganizationId,
} from "@/lib/services/onboarding/onboarding.service";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { organizations, userProfiles } from "@/lib/db/schema";

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

  const taskKey = typeof body === "object" && body && "taskKey" in body ? String((body as { taskKey: unknown }).taskKey) : "";
  const organizationSlug =
    typeof body === "object" && body && "organizationSlug" in body
      ? ((body as { organizationSlug?: unknown }).organizationSlug as string | undefined)
      : undefined;
  const metadata =
    typeof body === "object" && body && "metadata" in body && (body as { metadata?: unknown }).metadata
      ? ((body as { metadata?: Record<string, unknown> }).metadata ?? {})
      : {};

  if (!taskKey) {
    return NextResponse.json(
      { error: { code: "validation_error", message: "taskKey is required." } },
      { status: 400 },
    );
  }

  const resolved = await resolveActiveOrganizationId(user.id, organizationSlug ?? request.nextUrl.searchParams.get("org"));
  if (!resolved.success) {
    return NextResponse.json({ error: resolved.error }, { status: 400 });
  }

  if (taskKey === "choose_cohort") {
    const [org] = await db
      .select({ cohort_start_date: organizations.cohort_start_date })
      .from(organizations)
      .where(eq(organizations.id, resolved.data.organizationId))
      .limit(1);
    if (!org?.cohort_start_date) {
      return NextResponse.json(
        {
          error: {
            code: "cohort_required",
            message: "Choose a cohort start date before completing this task.",
          },
        },
        { status: 400 },
      );
    }
  }

  const [profile] = await db
    .select({
      email: userProfiles.email,
      first_name: userProfiles.first_name,
    })
    .from(userProfiles)
    .where(eq(userProfiles.id, user.id))
    .limit(1);

  const result = await completeOnboardingTask({
    organizationId: resolved.data.organizationId,
    userId: user.id,
    userEmail: profile?.email ?? user.email ?? "",
    firstName: profile?.first_name ?? null,
    taskKey,
    metadata,
  });

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ success: true, data: result.data });
}
