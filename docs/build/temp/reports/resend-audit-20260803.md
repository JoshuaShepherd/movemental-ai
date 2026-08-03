## Resend audit — movemental (movemental-ai) — 2026-08-03

**Tenant = Movemental · Repo = JoshuaShepherd/movemental-ai · From domain expected = movemental.ai** (via `RESEND_FROM_EMAIL`, e.g. `updates@movemental.ai`)

Package `name`: `movemental`. No `src/lib/config/tenant.config.ts` in this repo — tenant scoping uses `TENANT_ORG_ID` (`src/lib/tenant.ts`); brand string is hardcoded as **Movemental** in email helpers. Confirm / site links use `NEXT_PUBLIC_SITE_URL` with fallback `https://movemental.ai`.

Branch: `cursor/resend-email-audit-97cb` (automation cloud branch).

### MCP

| Server | Status |
|--------|--------|
| Resend | **needsAuth** — server listed `ready`, but all read calls returned `API key is invalid` (`validation_error`). No `mcp_auth` tool exposed for this server in-catalog. |
| Supabase (`movemental` / `vhaiiiykcukrlyvwlgip`) | **unavailable** — not present in this run’s MCP catalog. No live SQL. |

Skills: Resend plugin + email-best-practices loaded. `.claude/skills/email-setup` symlink is **broken** (`../../../my-skills/email-setup` missing). React Email: **not** a dependency (`resend` `^6.12.0` only).

### Config

- Env keys / example / schema: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_FROM_NAME` optional in `src/lib/env.ts` (Zod) — matches fail-soft product intent. Documented in `.env.local.example`. This stack does **not** use `RESEND_FROM_DOMAIN` (alan-hirsch legacy); docs already prefer `RESEND_FROM_EMAIL`.
- From address & domain: `resendFromHeader()` builds `Name <email>`; default email still `onboarding@resend.dev` when unset (dev sandbox). Production warning added when sandbox from is used.
- APP_URL for confirm links: `NEXT_PUBLIC_SITE_URL` → fallback `https://movemental.ai` (correct for this org site).
- No `NEXT_PUBLIC_*` Resend secrets. Client env schema does not expose Resend keys.
- Local `.env.local` / process env: Resend + Database URLs **unset** in this agent VM (code-only + MCP attempt).

### Setup

- `getResend()` lazy singleton + null when unset + Sentry once-per-process warning: **yes** (`src/lib/email/resend.ts`).
- Server-only send paths: helpers use `import "server-only"` (client now also enforced on `resend.ts` / `send-public-page-ratified.ts`). Callers are API routes, cron services, and server libs — no Client Component Resend SDK usage found.
- Double opt-in newsletter: **yes** — `POST /api/newsletter` inserts/updates `pending` + token → Resend confirm mail → `GET /api/newsletter/confirm` sets `confirmed` / clears token. Same table for subscribe + confirm. Rate-limited. Requires `TENANT_ORG_ID`.
- Unsubscribe: signed one-click via `NEWSLETTER_UNSUBSCRIBE_SECRET` (`/api/newsletter/unsubscribe`). Absent secret → confirm mail omits unsub link (graceful).
- Supabase Auth email vs Resend: **distinct**. Login/signup OTP + password reset use **Supabase Auth** (`signInWithOtp`, `resetPasswordForEmail`). Resend covers transactional product mail (newsletter confirm, contact, book, onboarding, toolkit, agent-room leads, etc.). No Resend webhook receiver in-repo (`/api/webhooks` has calendly + stripe only).
- Templates: inline HTML/text in-repo (not React Email; no preview route) — **LOW** vs email-setup ideal.
- Idempotency keys: **not** used on `emails.send` — reliability gap for retries.

### Live Resend (MCP)

- Domain verified: **[?] NEEDS MCP** (invalid API key)
- Webhooks: **[?] NEEDS MCP**; code has no Resend webhook endpoint → Dashboard webhooks would be unused even if configured (**INFO** until bounce/complaint suppression is productized)
- Recent delivery health: **[?] NEEDS MCP**
- Templates in dashboard: **[?] NEEDS MCP**; in-repo templates are code-owned (expected drift **INFO**)

### Supabase

- Subscriber/confirm table evidence: **[?] NEEDS MCP** — schema in Drizzle shows `newsletter_subscribers` with `status`, `confirmation_token`, `confirmed_at`, `unsubscribed_at`, `organization_id` (aligned with routes).
- Tenant scoping: insert/list paths filter by `organization_id` = `TENANT_ORG_ID`. Confirm looks up by token only (acceptable for 32-byte hex tokens; no org filter on confirm).
- Token expiry: **not implemented** in schema or confirm route (tokens cleared on confirm/unsub only).

### Findings (CRITICAL → LOW)

1. **HIGH** — Resend MCP credentials invalid in this automation environment; live domain / delivery / webhook verification could not run. Re-authenticate Resend MCP before relying on weekly live checks.
2. **HIGH** — Supabase MCP unavailable here; no live counts of pending vs confirmed subscribers or stuck-token rates.
3. **HIGH (launch)** — Production risk if `RESEND_FROM_EMAIL` remains unset or on `@resend.dev` (code falls back to sandbox sender). Mitigated in this PR with prod console warn + `check-env` / smoke / example guidance. **Human:** verify domain DNS in Resend dashboard and set Vercel prod env.
4. **MEDIUM** — No Resend webhook receiver / suppression list wiring for bounce & complaint → list hygiene incomplete for marketing-scale sends (email-best-practices). Acceptable while volume is transactional + double opt-in only; required before broadcast digests.
5. **MEDIUM** — Newsletter `confirmation_token` has no expiry / rotation TTL.
6. **MEDIUM** — Send helpers do not pass Resend `idempotencyKey` on retries.
7. **LOW** — Broken `email-setup` skill symlink in `.claude/skills/`.
8. **LOW** — No React Email templates / preview route; inline HTML accepted for now.
9. **INFO** — `onboarding-emails` previously used a parallel `movementalFrom()`; aligned to `resendFromHeader()`.
10. **INFO** — Auth verify / magic-link mail is Supabase-managed; configure templates & redirect allowlists in Supabase, not Resend.

### Fixes applied / deferred

**Applied (safe in-repo):**

- `import "server-only"` on `resend.ts` and `send-public-page-ratified.ts`
- Default From display name `Movemental`; production warn when from is `@resend.dev`
- Onboarding senders use shared `resendFromHeader()`
- Clearer skip log + typo fix in public-page-ratified email
- `.env.local.example`, `check-env`, `smoke:comms`, env merge/sync scripts synced for `RESEND_FROM_*`, notify, unsubscribe secrets
- This report

**Deferred (needs human / MCP / product work):**

- Re-auth Resend MCP; verify `movemental.ai` SPF/DKIM/DMARC
- Wire Resend webhooks + suppression if marketing broadcasts launch
- Confirmation token TTL
- Idempotency keys on send helpers
- Fix `email-setup` skill symlink on primary machine
- Live Supabase subscriber health queries

### Explicit non-actions

- No production sends, broadcasts, DNS changes, key rotation, or migrations
- No audience / `newsletter_subscribers` batch mail
- No domain delete / API key create
- No merge to `main`
