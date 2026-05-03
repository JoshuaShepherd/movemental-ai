import { NextResponse, type NextRequest } from "next/server";
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
export async function proxy(request: NextRequest) {
  // Always refresh the Supabase session so Server Components see a fresh user.
  const response = await updateSession(request);
  return response ?? NextResponse.next();
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
