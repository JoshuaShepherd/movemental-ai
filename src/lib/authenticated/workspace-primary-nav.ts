/**
 * Tier A workspace destinations — single source for AuthenticatedShell
 * (horizontal nav when no product sidebar, and “Workspace” dropdown when a
 * product context hides the horizontal links).
 */

import type { WorkspaceCourseEntitlements } from "@/lib/dashboard/workspace-course-entitlements";
import { workspaceSandboxNavLabel } from "@/lib/dashboard/workspace-course-entitlements";

export type WorkspaceNavItem = {
  label: string;
  /** Path only; shell appends `?org=` when `appendOrg` is true and slug is set. */
  href: string;
  /** Append `?org=<slug>` for org-scoped SSR (default true for most workspace routes). */
  appendOrg?: boolean;
};

export function appendOrgQuery(href: string, orgSlug: string | null | undefined): string {
  if (!orgSlug?.trim()) return href;
  const q = `org=${encodeURIComponent(orgSlug.trim())}`;
  return href.includes("?") ? `${href}&${q}` : `${href}?${q}`;
}

export function withOrgIfNeeded(
  item: Pick<WorkspaceNavItem, "href" | "appendOrg">,
  orgSlug: string | null | undefined,
): string {
  const append = item.appendOrg !== false;
  return append ? appendOrgQuery(item.href, orgSlug) : item.href;
}

/** Core + staff workspace links. Program label varies by dashboard persona (caller supplies). */
export function getWorkspacePrimaryNavItems(opts: {
  programNavLabel: string;
  showStaff: boolean;
  /** Per-org course entitlements from `organizations.settings.workspaceCourses` (+ legacy preset). */
  courses: WorkspaceCourseEntitlements;
}): WorkspaceNavItem[] {
  const { courses } = opts;
  const sandboxLabel = workspaceSandboxNavLabel(courses);

  const core: WorkspaceNavItem[] = [];

  if (courses.safety) {
    core.push({ label: opts.programNavLabel, href: "/program", appendOrg: true });
  }
  if (courses.sandbox) {
    core.push({ label: sandboxLabel, href: "/sandboxlive", appendOrg: true });
  }
  if (courses.safety) {
    core.push({ label: "SafeStart", href: "/safestart", appendOrg: true });
  }
  if (courses.skills) {
    core.push({ label: "Skills", href: "/dashboard/skills", appendOrg: false });
  }
  if (courses.solutions) {
    core.push({ label: "Solutions", href: "/dashboard/solutions", appendOrg: false });
  }

  core.push({ label: "Teaching library", href: "/dashboard/teaching/claude-skills", appendOrg: false });

  if (!opts.showStaff) return core;

  return [
    ...core,
    { label: "Admin onboarding", href: "/admin/onboarding", appendOrg: false },
    { label: "Leaders", href: "/admin/leaders", appendOrg: false },
    { label: "Design tokens", href: "/admin/design-tokens", appendOrg: false },
    { label: "Agent runtime", href: "/agent-runtime", appendOrg: false },
  ];
}
