import "server-only";

import type { WorkspaceCourseEntitlements } from "@/lib/dashboard/workspace-course-entitlements";

/** First workspace destination the user may still access when a course route is blocked. */
export function workspaceFallbackHrefAfterBlockedCourse(courses: WorkspaceCourseEntitlements): string {
  if (courses.sandbox) return "/sandboxlive";
  if (courses.safety) return "/program";
  return "/dashboard";
}
