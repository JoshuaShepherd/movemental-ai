/**
 * Canonical roles for `organization_memberships.role`.
 * Legacy values (owner, org_admin, …) are normalized in SQL + at read time.
 */
export const ORG_MEMBERSHIP_ROLES = ["member", "admin", "sponsor"] as const;
export type OrgMembershipRole = (typeof ORG_MEMBERSHIP_ROLES)[number];

export function normalizeOrgMembershipRole(
  raw: string | null | undefined,
  opts?: { isAccountOwner?: boolean },
): OrgMembershipRole {
  if (opts?.isAccountOwner) return "admin";
  const r = (raw ?? "member").trim().toLowerCase();
  if (r === "admin" || r === "sponsor" || r === "member") return r;
  if (
    r === "owner" ||
    r === "org_admin" ||
    r === "organization_admin" ||
    r === "administrator" ||
    r === "org_owner"
  ) {
    return "admin";
  }
  return "member";
}

export function isSandboxLiveOrgAdminRole(
  raw: string | null | undefined,
  opts?: { isAccountOwner?: boolean },
): boolean {
  return normalizeOrgMembershipRole(raw, opts) === "admin";
}
