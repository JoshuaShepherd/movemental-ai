import { createBrowserClient } from "@supabase/ssr";

import { isStaleRefreshAuthError } from "@/lib/supabase/stale-session";

/**
 * Supabase client for use in Client Components.
 * Safe to call from the browser. Reads NEXT_PUBLIC_* vars only.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

/**
 * Browser `getUser` that never rejects: stale / missing refresh tokens clear
 * the local session (same codes as server `getOptionalAuthUser`).
 *
 * Note: `@supabase/auth-js` may still `console.error` once while it removes a
 * dead session during refresh — that is upstream behavior, not an unhandled
 * rejection from this helper.
 */
export async function getBrowserUserEmail(): Promise<string | null> {
  const supabase = createClient();
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (!error) return user?.email ?? null;
    const code = "code" in error ? String((error as { code?: string }).code) : "";
    if (isStaleRefreshAuthError(code, error.message)) {
      await supabase.auth.signOut().catch(() => {});
    }
    return null;
  } catch (err: unknown) {
    const code =
      typeof err === "object" && err !== null && "code" in err
        ? String((err as { code?: string }).code ?? "")
        : "";
    const msg =
      typeof err === "object" && err !== null && "message" in err
        ? String((err as { message?: string }).message)
        : undefined;
    if (isStaleRefreshAuthError(code, msg)) {
      await createClient().auth.signOut().catch(() => {});
    }
    return null;
  }
}
