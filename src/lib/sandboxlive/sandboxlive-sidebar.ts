import type { AuthenticatedSidebarSection } from "@/components/authenticated/authenticated-shell";
import { SAFESTART_WORKSPACES } from "@/lib/safestart/workspace-manifest";
import { SANDBOXLIVE_PHASES } from "@/lib/sandboxlive/phase-manifest";

const SANDBOXLIVE_COHORT_ITEMS: AuthenticatedSidebarSection["items"] = [
  { label: "Recipe Library", href: "/sandboxlive/recipes" },
  { label: "Cohort view", href: "/sandboxlive/cohort" },
  { label: "Sponsor oversight", href: "/sandboxlive/sponsor-oversight" },
];

const SANDBOXLIVE_ORG_ADMIN_ITEMS: AuthenticatedSidebarSection["items"] = [
  { label: "Your organization", href: "/sandboxlive/org" },
  { label: "Members", href: "/sandboxlive/org/members" },
  { label: "Settings", href: "/sandboxlive/org/settings" },
  { label: "Agreements", href: "/sandboxlive/org/agreements" },
  { label: "Billing", href: "/sandboxlive/org/billing" },
];

/**
 * SandboxLive shell sidebar. `includeOrganizationAdmin` adds the Organization
 * section (org admins only — resolved in `(dashboard)/layout.tsx`).
 */
export function buildSandboxLiveSidebarSections(opts: {
  includeOrganizationAdmin: boolean;
}): AuthenticatedSidebarSection[] {
  const sections: AuthenticatedSidebarSection[] = [
    {
      label: "Phases",
      items: SANDBOXLIVE_PHASES.map((p) => ({
        label: p.name,
        href: `/sandboxlive/phase/${p.slug}`,
        number: p.number,
      })),
    },
    {
      label: "Cohort",
      items: SANDBOXLIVE_COHORT_ITEMS,
    },
  ];
  if (opts.includeOrganizationAdmin) {
    sections.push({
      label: "Organization",
      items: SANDBOXLIVE_ORG_ADMIN_ITEMS,
    });
  }
  return sections;
}

/** SafeStart sidebar (unchanged from product-context). */
export function buildSafeStartSidebarSections(): AuthenticatedSidebarSection[] {
  return [
    {
      label: "Engagement",
      items: SAFESTART_WORKSPACES.map((w) => ({
        label: w.name,
        href: `/safestart/${w.slug}`,
        number: String(w.order).padStart(2, "0"),
      })),
    },
    {
      label: "Artifact",
      items: [{ label: "AI Organizational Guidebook", href: "/safestart/guidebook" }],
    },
  ];
}
