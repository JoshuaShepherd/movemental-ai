import "server-only";

import { redirect } from "next/navigation";

import type { DashboardPersona } from "@/lib/dashboard/dashboard-persona";
import type { WorkspaceCourseEntitlements } from "@/lib/dashboard/workspace-course-entitlements";
import { resolveDashboardContextForSessionUser } from "@/lib/services/onboarding/onboarding.service";
import { getOptionalAuthUser } from "@/lib/supabase/server";

export type SafetyDashboardSession = {
  user: { id: string; email?: string };
  slug: string;
  organizationId: string;
  persona: DashboardPersona;
  workspaceCourses: WorkspaceCourseEntitlements;
};

/**
 * Fail-closed guard for `/dashboard/safety/**` — auth, membership, and safety entitlement.
 */
export async function requireSafetyDashboardSession(
  orgSlug?: string | null,
): Promise<SafetyDashboardSession> {
  const { user } = await getOptionalAuthUser();
  if (!user) {
    redirect("/signup?next=/dashboard/safety");
  }

  const ctx = await resolveDashboardContextForSessionUser(user.id, orgSlug);
  if (!ctx) {
    redirect("/login?reason=no_org&next=/dashboard/safety");
  }

  if (!ctx.workspaceCourses.safety) {
    redirect("/welcome?reason=no_safety_entitlement");
  }

  return {
    user: { id: user.id, email: user.email },
    slug: ctx.slug,
    organizationId: ctx.organizationId,
    persona: ctx.persona,
    workspaceCourses: ctx.workspaceCourses,
  };
}
