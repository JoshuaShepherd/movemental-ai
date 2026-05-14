import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { User } from "@supabase/supabase-js";

import { isStaleRefreshAuthError } from "@/lib/supabase/stale-session";

/**
 * Supabase client for use in Server Components, Server Actions,
 * and Route Handlers. Reads cookies via next/headers.
 *
 * Uses only getAll / setAll (never get/set/remove) per @supabase/ssr guidance.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // setAll called from a Server Component — ignored; session
            // refresh is handled by proxy.ts.
          }
        },
      },
    },
  );
}

export type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

/**
 * {@link createClient} plus {@link User} read with stale refresh handling. When the
 * refresh token is unusable, attempts `signOut` so cookies can be cleared (may no-op
 * from Server Components; middleware still runs).
 */
export async function getOptionalAuthUser(): Promise<{
  supabase: SupabaseServerClient;
  user: User | null;
}> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!error) {
    return { supabase, user: user ?? null };
  }

  const code = "code" in error ? String((error as { code?: string }).code) : "";
  if (isStaleRefreshAuthError(code, error.message)) {
    try {
      await supabase.auth.signOut();
    } catch {
      /* cookie writes may be unavailable in this context */
    }
  }

  return { supabase, user: null };
}
