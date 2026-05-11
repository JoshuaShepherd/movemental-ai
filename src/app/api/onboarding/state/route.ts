import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import {
  buildOnboardingStatePayload,
  initializeOnboardingTasksForOrganization,
  listMembershipOrganizations,
  resolveActiveOrganizationId,
  touchOnboardingStartedAndWelcomeEmail,
} from "@/lib/services/onboarding/onboarding.service";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { userProfiles } from "@/lib/db/schema";

export async function GET(request: NextRequest) {
  try {
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

    const orgSlug = request.nextUrl.searchParams.get("org");
    const resolved = await resolveActiveOrganizationId(user.id, orgSlug);
    if (!resolved.success) {
      return NextResponse.json({ error: resolved.error }, { status: 400 });
    }

    const init = await initializeOnboardingTasksForOrganization(resolved.data.organizationId);
    if (!init.success) {
      return NextResponse.json({ error: init.error }, { status: 500 });
    }

    const [profile] = await db
      .select({
        email: userProfiles.email,
        first_name: userProfiles.first_name,
      })
      .from(userProfiles)
      .where(eq(userProfiles.id, user.id))
      .limit(1);

    await touchOnboardingStartedAndWelcomeEmail({
      organizationId: resolved.data.organizationId,
      userId: user.id,
      userEmail: profile?.email ?? user.email ?? "",
      firstName: profile?.first_name ?? null,
    });

    const payload = await buildOnboardingStatePayload(resolved.data.organizationId);
    if (!payload) {
      return NextResponse.json(
        { error: { code: "not_found", message: "Organization not found." } },
        { status: 404 },
      );
    }

    const memberships = await listMembershipOrganizations(user.id);

    return NextResponse.json({
      success: true,
      data: {
        ...payload,
        memberships: memberships.map((m) => ({
          organizationId: m.organizationId,
          name: m.orgName,
          slug: m.orgSlug,
        })),
        activeSlug: resolved.data.slug,
        userFirstName: profile?.first_name ?? null,
      },
    });
  } catch (e) {
    console.error("[GET /api/onboarding/state]", e);
    const safeMessage =
      process.env.NODE_ENV === "production"
        ? "An unexpected error occurred. Please try again."
        : e instanceof Error
          ? e.message
          : "Unknown error";
    return NextResponse.json(
      { error: { code: "internal_error", message: safeMessage } },
      { status: 500 },
    );
  }
}
