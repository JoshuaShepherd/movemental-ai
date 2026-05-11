import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { userProfiles } from "@/lib/db/schema";
import {
  finalizeLeaderOnboarding,
  resolveActiveOrganizationId,
} from "@/lib/services/onboarding/onboarding.service";

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

  const organizationSlug =
    typeof body === "object" && body && "organizationSlug" in body
      ? ((body as { organizationSlug?: unknown }).organizationSlug as string | undefined)
      : undefined;

  const attestationAccepted = Boolean(
    typeof body === "object" &&
      body &&
      "attestationAccepted" in body &&
      (body as { attestationAccepted?: unknown }).attestationAccepted,
  );

  const cohortPrepReflection =
    typeof body === "object" && body && "cohortPrepReflection" in body
      ? String((body as { cohortPrepReflection?: unknown }).cohortPrepReflection ?? "")
      : undefined;

  const resolved = await resolveActiveOrganizationId(user.id, organizationSlug);
  if (!resolved.success) {
    return NextResponse.json({ error: resolved.error }, { status: 400 });
  }

  const [profile] = await db
    .select({
      email: userProfiles.email,
      first_name: userProfiles.first_name,
    })
    .from(userProfiles)
    .where(eq(userProfiles.id, user.id))
    .limit(1);

  const result = await finalizeLeaderOnboarding({
    organizationId: resolved.data.organizationId,
    userId: user.id,
    userEmail: profile?.email ?? user.email ?? "",
    firstName: profile?.first_name ?? null,
    attestationAccepted,
    cohortPrepReflection: cohortPrepReflection?.trim() || undefined,
  });

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ success: true, data: result.data });
}
