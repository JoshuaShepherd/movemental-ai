/**
 * Canonical origin for metadata (`metadataBase`, `openGraph.url`, JSON-LD).
 * Prefer `NEXT_PUBLIC_SITE_URL`, then Vercel preview host, then sensible defaults.
 */
export function canonicalSiteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) {
    try {
      return new URL(fromEnv).origin;
    } catch {
      /* fall through */
    }
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  return "https://movemental.ai";
}

/** Absolute URL for a path (must start with `/`). */
export function canonicalPageUrl(pathname: string): string {
  const origin = canonicalSiteOrigin();
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${origin}${path}`;
}
