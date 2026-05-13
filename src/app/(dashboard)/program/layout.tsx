import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { appendOrgQuery } from "@/lib/authenticated/workspace-primary-nav";
import { workspaceFallbackHrefAfterBlockedCourse } from "@/lib/dashboard/workspace-course-guard.server";
import {
  resolveActiveOrganizationId,
  resolveWorkspaceCourseEntitlementsForSessionUser,
} from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

/**
 * Block `/program` when the active org does not have the **safety** course
 * (Program + SafeStart). Deep links match nav visibility.
 */
export default async function ProgramLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const orgSlug = h.get("x-dashboard-org-slug")?.trim() || null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    return children;
  }

  const courses = await resolveWorkspaceCourseEntitlementsForSessionUser(user.id, orgSlug);
  if (courses == null) {
    return children;
  }

  if (!courses.safety) {
    const resolved = await resolveActiveOrganizationId(user.id, orgSlug ?? undefined);
    if (!resolved.success) {
      redirect(workspaceFallbackHrefAfterBlockedCourse(courses));
    }
    redirect(appendOrgQuery(workspaceFallbackHrefAfterBlockedCourse(courses), resolved.data.slug));
  }

  return children;
}
