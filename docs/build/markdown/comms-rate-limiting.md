# Rate limiting for public comms forms

## Current behavior

`/api/contact`, `/api/newsletter`, and `/api/newsletter/unsubscribe` use a **sliding-window, in-memory** limiter (`src/lib/rate-limit-in-memory.ts`) keyed by `x-forwarded-for` (or `"unknown"`).

**Limits today**

- Contact: 5 requests / IP / hour
- Newsletter signup: 10 / IP / hour
- Newsletter unsubscribe: 30 / IP / hour (link may be prefetched by mail clients)

**Limitations**

- Counters reset on cold start / new instance (typical for serverless).
- Shared IPs (corporate NAT) can hit limits together.

## Stronger options (before high traffic)

1. **Vercel KV or Upstash Redis** — shared counter across regions and invocations; swap the limiter implementation to read/write a key `ratelimit:contact:${ip}` with TTL.
2. **Cloudflare Turnstile or hCaptcha** — add a client widget + server verify on `/api/contact` and `/api/newsletter` first.
3. **Edge middleware** — optional early reject before hitting the Node handler.

Prefer (1) + (2) for launch traffic if abuse appears in logs.
