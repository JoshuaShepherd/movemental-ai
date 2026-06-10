import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Next 16 request middleware (renamed from middleware.ts → proxy.ts).
 *
 * Responsibilities:
 *   1. Refresh Supabase auth cookies on every request.
 *   2. Inject `x-movemental-shell` and pathname headers for layout chrome.
 *
 * Canon: docs/design/INK_BAND_DESIGN_CHAIN.md
 */
const AUTHENTICATED_PATH_PREFIXES = ["/agent-runtime"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const dashboardShell = AUTHENTICATED_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  const inject: Record<string, string> = { "x-pathname": pathname };
  const orgSlug = request.nextUrl.searchParams.get("org");
  if (orgSlug) inject["x-dashboard-org-slug"] = orgSlug;

  if (dashboardShell) inject["x-movemental-shell"] = "dashboard";

  // Agent Room — full-screen Ink Band surface (no utility chrome).
  if (pathname === "/agent" || pathname.startsWith("/agent/")) {
    inject["x-movemental-shell"] = "room";
  }

  return updateSession(request, inject);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
