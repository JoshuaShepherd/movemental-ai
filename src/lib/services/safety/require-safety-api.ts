import "server-only";

import { resolveDashboardContextForSessionUser } from "@/lib/services/onboarding/onboarding.service";
import { getOptionalAuthUser } from "@/lib/supabase/server";

export type SafetyApiContext = {
  userId: string;
  organizationId: string;
  slug: string;
};

export async function requireSafetyApiContext(
  orgSlug?: string | null,
): Promise<{ ok: true; ctx: SafetyApiContext } | { ok: false; status: number; code: string; message: string }> {
  const { user } = await getOptionalAuthUser();
  if (!user?.id) {
    return { ok: false, status: 401, code: "unauthorized", message: "Sign in required." };
  }

  const dashboard = await resolveDashboardContextForSessionUser(user.id, orgSlug);
  if (!dashboard) {
    return { ok: false, status: 403, code: "no_org", message: "No organization membership found." };
  }

  if (!dashboard.workspaceCourses.safety) {
    return {
      ok: false,
      status: 403,
      code: "no_entitlement",
      message: "Safety dashboard is not provisioned for this organization.",
    };
  }

  return {
    ok: true,
    ctx: {
      userId: user.id,
      organizationId: dashboard.organizationId,
      slug: dashboard.slug,
    },
  };
}
