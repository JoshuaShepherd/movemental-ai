/**
 * Tier A workspace destinations — single source for AuthenticatedShell
 * (horizontal nav when no product sidebar, and “Workspace” dropdown when a
 * product context hides the horizontal links).
 */

import type { WorkspaceNavPreset } from "@/lib/dashboard/workspace-nav-preset";

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
  /** When `sandbox_live_focus`, Program + SafeStart are hidden; SandboxLive label becomes "Sandbox". */
  preset?: WorkspaceNavPreset;
}): WorkspaceNavItem[] {
  const preset = opts.preset ?? "default";

  const core: WorkspaceNavItem[] =
    preset === "sandbox_live_focus"
      ? [
          { label: "Sandbox", href: "/sandboxlive", appendOrg: true },
          { label: "Onboarding", href: "/welcome", appendOrg: true },
          { label: "Teaching library", href: "/dashboard/teaching/claude-skills", appendOrg: false },
        ]
      : [
          { label: opts.programNavLabel, href: "/program", appendOrg: true },
          { label: "SandboxLive", href: "/sandboxlive", appendOrg: true },
          { label: "SafeStart", href: "/safestart", appendOrg: true },
          { label: "Onboarding", href: "/welcome", appendOrg: true },
          { label: "Teaching library", href: "/dashboard/teaching/claude-skills", appendOrg: false },
        ];

  if (!opts.showStaff) return core;

  return [
    ...core,
    { label: "Admin onboarding", href: "/admin/onboarding", appendOrg: false },
    { label: "Leaders", href: "/admin/leaders", appendOrg: false },
    { label: "Design tokens", href: "/admin/design-tokens", appendOrg: false },
    { label: "Agent runtime", href: "/agent-runtime", appendOrg: false },
  ];
}
