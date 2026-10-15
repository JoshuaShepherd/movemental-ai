import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { isStaleRefreshAuthError } from "@/lib/supabase/stale-session";

/**
 * Refreshes the Supabase session cookie on every request.
 * Called from proxy.ts (Next 16's renamed middleware file).
 */
export async function updateSession(
  request: NextRequest,
  injectHeaders?: Record<string, string>,
) {
  return (await updateSessionWithUser(request, injectHeaders)).response;
}

/** Same as `updateSession`, and also returns the signed-in user's id (or null). */
export async function updateSessionWithUser(
  request: NextRequest,
  injectHeaders?: Record<string, string>,
): Promise<{ response: NextResponse; userId: string | null }> {
  const requestHeaders = new Headers(request.headers);
  if (injectHeaders) {
    for (const [key, value] of Object.entries(injectHeaders)) {
      requestHeaders.set(key, value);
    }
  }

  let supabaseResponse = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          supabaseResponse = NextResponse.next({
            request: {
              headers: requestHeaders,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  // Do not run any code between createServerClient and supabase.auth.getUser().
  // A simple mistake could make it very hard to debug issues with users being
  // randomly logged out.
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (
    authError &&
    isStaleRefreshAuthError(
      "code" in authError ? String((authError as { code?: string }).code) : "",
      authError.message,
    )
  ) {
    await supabase.auth.signOut();
    return { response: supabaseResponse, userId: null };
  }

  return { response: supabaseResponse, userId: user?.id ?? null };
}
