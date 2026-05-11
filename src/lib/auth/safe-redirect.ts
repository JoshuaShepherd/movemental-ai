/**
 * Prevents open redirects: only same-site relative paths are allowed for `next`
 * after auth (callback, post-login navigation).
 */
export function sanitizeAuthRedirectNext(
  raw: string | null | undefined,
  fallback = "/dashboard",
): string {
  if (raw == null) return fallback;
  let s = raw.trim();
  try {
    s = decodeURIComponent(s);
  } catch {
    return fallback;
  }
  if (!s.startsWith("/") || s.startsWith("//")) return fallback;
  if (s.includes("://")) return fallback;
  if (s.includes("\\")) return fallback;
  return s;
}
