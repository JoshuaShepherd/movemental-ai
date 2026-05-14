/**
 * Auth errors where the browser still holds Supabase cookies but the refresh
 * token is no longer valid (revoked DB session, wrong project, local env swap).
 * Treat the visitor as signed out and clear cookies when possible.
 */
export const STALE_SESSION_AUTH_CODES = new Set([
  "refresh_token_not_found",
  "invalid_grant",
]);

export function isStaleRefreshAuthError(
  code: string | undefined,
  message?: string,
): boolean {
  if (code && STALE_SESSION_AUTH_CODES.has(code)) return true;
  if (message && /refresh token not found/i.test(message)) return true;
  return false;
}
