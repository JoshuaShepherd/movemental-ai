/**
 * Tenant context for single-org-per-deployment via TENANT_ORG_ID.
 * Used by services to scope list/getById/getBySlug by organization_id.
 */
export function getTenantOrgId(): string | null {
  const id = process.env.TENANT_ORG_ID;
  return id ?? null;
}
