/**
 * Client/server-safe Calendly URL helpers.
 *
 * No DB, no `server-only`, no Node-only imports — safe to import from client
 * components. The DB-using counterpart lives in `./calendly-training-url`
 * (which is `import "server-only"`).
 */

/**
 * Append UTM so Calendly webhooks can map bookings back to an org slug (`utm_content`).
 */
export function withCalendlyOrgTracking(
  calendlyUrl: string,
  organizationSlug: string,
): string {
  try {
    const u = new URL(calendlyUrl);
    u.searchParams.set("utm_content", organizationSlug);
    u.searchParams.set("utm_source", "movemental");
    u.searchParams.set("utm_medium", "sandboxlive");
    return u.toString();
  } catch {
    return calendlyUrl;
  }
}
