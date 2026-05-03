/**
 * Simple sliding-window rate limiter keyed by string (usually client IP).
 * Resets on serverless cold starts — adequate for light abuse; see
 * docs/build/markdown/comms-rate-limiting.md for stronger options.
 */
export function createSlidingWindowRateLimiter(maxRequests: number, windowMs: number) {
  const map = new Map<string, number[]>();

  return function checkRateLimit(key: string): boolean {
    const now = Date.now();
    if (!map.has(key)) {
      map.set(key, []);
    }
    const stamps = map.get(key)!;
    const recent = stamps.filter((t) => now - t < windowMs);
    if (recent.length >= maxRequests) {
      map.set(key, recent);
      return false;
    }
    recent.push(now);
    map.set(key, recent);
    return true;
  };
}
