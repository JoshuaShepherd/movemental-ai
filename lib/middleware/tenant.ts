import { NextRequest } from 'next/server';
import { db } from '../../db/index';
import { organizations } from '../../db/schema';
import { eq } from 'drizzle-orm';

/**
 * Get organization ID from tenant context
 * CRITICAL: organizationId must come from tenant context (middleware), never from client input
 */
export async function getOrganizationId(
  request: NextRequest
): Promise<string | null> {
  // Try header first (set by middleware)
  const headerOrgId = request.headers.get('x-organization-id');
  if (headerOrgId) {
    return headerOrgId;
  }

  // Try subdomain resolution
  const hostname = request.headers.get('host') || '';
  const subdomain = extractSubdomain(hostname);

  if (subdomain) {
    const [org] = await db
      .select({ id: organizations.id })
      .from(organizations)
      .where(eq(organizations.slug, subdomain))
      .limit(1);

    if (org) {
      return org.id;
    }
  }

  // TODO: Try session (fallback) - implement when auth is set up
  // const session = await getSession(request);
  // if (session?.user) {
  //   // Get user's primary organization
  //   ...
  // }

  return null;
}

/**
 * Extract subdomain from hostname
 */
function extractSubdomain(hostname: string): string | null {
  const parts = hostname.split('.');
  if (parts.length >= 3) {
    return parts[0];
  }
  return null;
}
