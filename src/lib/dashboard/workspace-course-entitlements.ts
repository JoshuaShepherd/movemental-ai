/**
 * Per-organization workspace “courses” (product lanes) for Tier-A nav + route guards.
 *
 * Storage: `organizations.settings.workspaceCourses` — string[] allowlist, e.g.
 * `["safety", "sandbox"]`. See `docs/build/prompts/per-org-workspace-course-entitlements.md`.
 *
 * Decisions (product):
 * - **`safety`** gates both `/program` and `/safestart` (Program + SafeStart).
 * - **`skills`** / **`solutions`** are optional nav + placeholders until dedicated product routes ship.
 * - **Resources** (Claude skills hub) stays globally available in the workspace strip (not gated by `skills`).
 * - **Explicit non-empty `workspaceCourses`** wins over `workspaceNavPreset`.
 * - **Missing `workspaceCourses`:** opt-in default — **all courses off**, except legacy
 *   `workspaceNavPreset === "sandbox_live_focus"` → **sandbox on** only (safety off).
 * - **Empty array `[]`:** explicitly **no product courses** (all off); preset is ignored.
 */

import { resolveWorkspaceNavPreset } from "@/lib/dashboard/workspace-nav-preset";

export const WORKSPACE_COURSE_IDS = ["safety", "sandbox", "skills", "solutions"] as const;
export type WorkspaceCourseId = (typeof WORKSPACE_COURSE_IDS)[number];

export type WorkspaceCourseEntitlements = Record<WorkspaceCourseId, boolean>;

/** No workspace product modules — nav shows only Resources (+ staff links). */
export const WORKSPACE_COURSES_NONE: WorkspaceCourseEntitlements = {
  safety: false,
  sandbox: false,
  skills: false,
  solutions: false,
};

function isWorkspaceCourseId(s: string): s is WorkspaceCourseId {
  return (WORKSPACE_COURSE_IDS as readonly string[]).includes(s);
}

/**
 * Resolve entitlements from raw `organizations.settings` JSON.
 */
export function resolveWorkspaceCourseEntitlements(settings: unknown): WorkspaceCourseEntitlements {
  const raw =
    settings && typeof settings === "object" && settings !== null
      ? (settings as Record<string, unknown>).workspaceCourses
      : undefined;

  if (Array.isArray(raw)) {
    if (raw.length === 0) {
      return { ...WORKSPACE_COURSES_NONE };
    }
    const next: WorkspaceCourseEntitlements = {
      ...WORKSPACE_COURSES_NONE,
    };
    for (const item of raw) {
      if (typeof item === "string" && isWorkspaceCourseId(item)) {
        next[item] = true;
      }
    }
    return next;
  }

  if (resolveWorkspaceNavPreset(settings) === "sandbox_live_focus") {
    return { safety: false, sandbox: true, skills: false, solutions: false };
  }

  return { ...WORKSPACE_COURSES_NONE };
}

/** Nav label for SandboxLive when the strip is “sandbox-only” (no Safety). */
export function workspaceSandboxNavLabel(courses: WorkspaceCourseEntitlements): "Sandbox" | "SandboxLive" {
  return !courses.safety && courses.sandbox ? "Sandbox" : "SandboxLive";
}

/** Dashboard hub + copy: SandboxLive-first layout (implementation org, no Safety lane). */
export function isSandboxLiveFirstHub(
  persona: "movement_leader" | "implementation_org",
  courses: WorkspaceCourseEntitlements,
): boolean {
  return persona === "implementation_org" && !courses.safety && courses.sandbox;
}
