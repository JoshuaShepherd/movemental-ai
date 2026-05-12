import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Next 16 request middleware (renamed from middleware.ts → proxy.ts).
 *
 * Responsibilities:
 *   1. Refresh Supabase auth cookies on every request.
 *   2. Gate protected routes (expanded as auth surface grows).
 *
 * Keep logic here focused on interception, auth gates, rewrites, and redirects.
 * See docs/design/DESIGN.md — this file enforces system containment.
 */
/**
 * Paths that render inside the AuthenticatedShell (not the marketing
 * SiteHeader/SiteFooter). The root layout reads `x-movemental-shell` to know
 * which chrome to render.
 *
 * Extended in Phase 01 (chrome rationalization) to include /program,
 * /agent-runtime, and the product shells introduced in later phases so all
 * authenticated surfaces render with exactly one set of chrome.
 */
/**
 * `/recipes` is intentionally excluded — Phase 04 routes the public Recipe
 * Library preview under `(site)/recipes`. The authenticated cohort version
 * lives at `/sandboxlive/recipes` and is covered by the `/sandboxlive` prefix.
 *
 * `/leader/apply` will be a public route under `(site)` per Phase 06. When
 * that route lands, it must be opted out of the dashboard shell here
 * (e.g. by checking `pathname !== "/leader/apply"`).
 *
 * **Prefix matrix** (layout + product chrome) — keep in sync with
 * `docs/build/notes/dashboard-route-prefix-matrix.md` and
 * `resolveAuthenticatedShellContext` in `src/lib/authenticated/product-context.ts`.
 * Future Plan lives under `/sandboxlive/phase/08-future-plan`, not a top-level
 * `/future-plan` route.
 */
const AUTHENTICATED_PATH_PREFIXES = [
  "/dashboard",
  "/welcome",
  "/onboarding",
  "/admin",
  "/program",
  "/agent-runtime",
  "/sandboxlive",
  "/safestart",
  "/leader",
];

/** Public marketing chrome — not AuthenticatedShell (Phase 06). */
const PUBLIC_LEADER_PATHS = new Set(["/leader/apply"]);

function usesAuthenticatedShell(pathname: string): boolean {
  return AUTHENTICATED_PATH_PREFIXES.some((prefix) => {
    if (prefix === "/leader" && PUBLIC_LEADER_PATHS.has(pathname)) {
      return false;
    }
    return pathname === prefix || pathname.startsWith(`${prefix}/`);
  });
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const dashboardShell = usesAuthenticatedShell(pathname);

  const inject: Record<string, string> = { "x-pathname": pathname };
  const orgSlug = request.nextUrl.searchParams.get("org");
  if (orgSlug) inject["x-dashboard-org-slug"] = orgSlug;
  if (dashboardShell) inject["x-movemental-shell"] = "dashboard";

  return updateSession(request, inject);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - public assets with a file extension
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
