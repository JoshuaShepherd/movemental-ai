/**
 * Dashboard persona distinguishes implementation buyers (nonprofit ops / governance lane)
 * from movement-leader tenants (trusted-voice corpus → agent activation).
 *
 * Resolution order:
 * 1. `organizations.settings.dashboardPersona` — explicit `"implementation_org"` | `"movement_leader"`.
 * 2. `organization_type === "organization"` and slug is not an internal Movemental org → `implementation_org`.
 * 3. Default → `movement_leader`.
 *
 * Internal orgs: `movemental` stays movement_leader even though it uses organization_type organization.
 */
export type DashboardPersona = "movement_leader" | "implementation_org";

/** Slugs that use organization_type organization but are Movemental-internal (not buyer implementations). */
const INTERNAL_ORG_SLUGS_IMPLEMENTATION_EXCLUDED = new Set(["movemental"]);

export type DashboardPersonaOrgInput = {
  slug: string;
  organization_type: string;
  settings: unknown;
};

export function resolveDashboardPersona(org: DashboardPersonaOrgInput): DashboardPersona {
  const raw =
    org.settings && typeof org.settings === "object" && org.settings !== null
      ? (org.settings as Record<string, unknown>).dashboardPersona
      : undefined;

  if (raw === "implementation_org") return "implementation_org";
  if (raw === "movement_leader") return "movement_leader";

  if (
    org.organization_type === "organization" &&
    !INTERNAL_ORG_SLUGS_IMPLEMENTATION_EXCLUDED.has(org.slug)
  ) {
    return "implementation_org";
  }

  return "movement_leader";
}
