## Resend audit — movemental (movemental-ai) — 2026-08-10

**Tenant = Movemental · Repo = JoshuaShepherd/movemental-ai · From domain expected = movemental.ai** (via `RESEND_FROM_EMAIL`, e.g. `updates@movemental.ai`)

Package `name`: `movemental`. No `src/lib/config/tenant.config.ts` — tenant scoping uses `TENANT_ORG_ID` (`src/lib/tenant.ts`); brand string is **Movemental** in email helpers. Confirm / site links use `NEXT_PUBLIC_SITE_URL` with fallback `https://movemental.ai`.

Branch: `cursor/resend-email-audit-9217` (automation cloud branch). Re-applies unmerged safe fixes from `cursor/resend-email-audit-97cb` (2026-08-03 draft PR) plus this weekly report.

### MCP

| Server | Status |
|--------|--------|
| Resend | **needsAuth** — catalog `serverStatus: ready`, but `list-domains` / `list-api-keys` / `list-webhooks` / `list-logs` all returned `API key is invalid` (`validation_error`). No `mcp_auth` tool exposed for Resend in this environment. |
| Supabase (`movemental` / `vhaiiiykcukrlyvwlgip`) | **unavailable** — not in this run’s MCP catalog (only Cursor Automation Tools, cursor-cloud, Resend). No live SQL. |

Skills: Resend plugin + email-best-practices loaded. `.claude/skills/email-setup` symlink still **broken** (`../../../my-skills/email-setup` missing). React Email: **not** a dependency (`resend` `^6.12.0` only).

### Config

- Env keys / example / schema: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_FROM_NAME` optional in `src/lib/env.ts` (Zod) — matches fail-soft product intent. Documented in `.env.local.example`. Stack uses `RESEND_FROM_EMAIL` + `RESEND_FROM_NAME`, **not** `RESEND_FROM_DOMAIN`.
- From address & domain: `resendFromHeader()` builds `Movemental <email>` (default name); default email still `onboarding@resend.dev` when unset (dev sandbox). Production console warning when sandbox from is used.
- APP_URL for confirm links: `NEXT_PUBLIC_SITE_URL` → fallback `https://movemental.ai` (correct for this org site).
- No `NEXT_PUBLIC_*` Resend secrets. Client env schema does not expose Resend keys.
- Agent VM: `.env.local` absent; `RESEND_API_KEY` / `DATABASE_URL` / `NEXT_PUBLIC_SITE_URL` unset in process env (code-only + MCP attempt).
- `RESEND_WEBHOOK_SECRET` noted as future optional in `.env.local.example` (no receiver in code yet).

### Setup

- `getResend()` lazy singleton + null when unset + Sentry once-per-process warning: **yes** (`src/lib/email/resend.ts` + `import "server-only"`).
- Server-only send paths: all Resend helpers under `src/lib/email/*` and `src/lib/book-email.ts` use `server-only` (or import guarded clients). Callers are API routes, cron services, and server libs — no Client Component Resend SDK usage found.
- Double opt-in newsletter: **yes** — `POST /api/newsletter` → `pending` + token → Resend confirm mail → `GET /api/newsletter/confirm` sets `confirmed` / clears token. Same `newsletter_subscribers` table. Rate-limited. Requires `TENANT_ORG_ID`.
- Unsubscribe: signed one-click via `NEWSLETTER_UNSUBSCRIBE_SECRET` (`/api/newsletter/unsubscribe`). Absent secret → confirm mail omits unsub link (graceful).
- Supabase Auth email vs Resend: **distinct**. Magic-link OTP + password reset use **Supabase Auth** (`signInWithOtp`, `resetPasswordForEmail` on signup/assess/forgot-password/agent safety flow). Resend covers transactional product mail (newsletter confirm, contact, book, onboarding, toolkit, agent-room leads, integrity diagnostic, AI reality, public-page ratified, etc.). No Resend webhook receiver in-repo (`/api/webhooks` has calendly + stripe only).
- Templates: inline HTML/text in-repo (not React Email; no preview route) — **LOW**.
- Idempotency keys: **not** used on `emails.send` — reliability gap for retries.

### Live Resend (MCP)

- Domain verified: **[?] NEEDS MCP** (invalid API key)
- Webhooks: **[?] NEEDS MCP**; code has no Resend webhook endpoint → Dashboard webhooks unused even if configured (**INFO** until bounce/complaint suppression is productized)
- Recent delivery health: **[?] NEEDS MCP**
- Templates in dashboard: **[?] NEEDS MCP**; in-repo templates are code-owned (expected drift **INFO**)

### Supabase

- Subscriber/confirm table evidence: **[?] NEEDS MCP** — Drizzle `newsletter_subscribers` has `status`, `confirmation_token`, `confirmed_at`, `unsubscribed_at`, `organization_id` (aligned with routes).
- Tenant scoping: subscribe path filters by `organization_id` = `TENANT_ORG_ID`. Confirm looks up by token only (acceptable for 32-byte hex tokens).
- Token expiry: **not implemented** (tokens cleared on confirm/unsub only).

### Findings (CRITICAL → LOW)

1. **HIGH** — Resend MCP credentials still invalid (same as 2026-08-03). Weekly live domain/delivery checks cannot run until the automation’s Resend API key is rotated/re-authenticated in Cursor Automations MCP settings.
2. **HIGH** — Supabase MCP still unavailable in this automation’s MCP set; no live pending/confirmed counts or stuck-token rates.
3. **HIGH (launch)** — Production risk if `RESEND_FROM_EMAIL` remains unset or on `@resend.dev` (code falls back to sandbox sender). Mitigated in this PR with prod console warn + `check-env` / smoke / example guidance. **Human:** verify domain DNS in Resend dashboard and set Vercel prod env.
4. **MEDIUM** — No Resend webhook receiver / suppression wiring for bounce & complaint → list hygiene incomplete for marketing-scale sends. Acceptable while volume is transactional + double opt-in only; required before broadcast digests.
5. **MEDIUM** — Newsletter `confirmation_token` has no expiry / rotation TTL.
6. **MEDIUM** — Send helpers do not pass Resend `idempotencyKey` on retries.
7. **LOW** — Broken `email-setup` skill symlink in `.claude/skills/`.
8. **LOW** — No React Email templates / preview route; inline HTML accepted for now.
9. **INFO** — Prior audit PR `cursor/resend-email-audit-97cb` (draft, 2026-08-03) was never merged; safe fixes re-applied on this branch.
10. **INFO** — Auth verify / magic-link mail is Supabase-managed; configure templates & redirect allowlists in Supabase, not Resend.

### Fixes applied / deferred

**Applied (safe in-repo):**

- Re-applied: `import "server-only"` on `resend.ts` and `send-public-page-ratified.ts`
- Re-applied: default From display name `Movemental`; production warn when from is `@resend.dev`
- Re-applied: onboarding senders use shared `resendFromHeader()`
- Re-applied: clearer skip log + typo fix in public-page-ratified email
- Re-applied: `.env.local.example`, `check-env`, `smoke:comms`, env merge/sync scripts synced for `RESEND_FROM_*`, notify, unsubscribe secrets
- Documented future `RESEND_WEBHOOK_SECRET` as commented optional in `.env.local.example`
- This report (`docs/build/temp/reports/resend-audit-20260810.md`)

**Deferred (needs human / MCP / product work):**

- Re-auth Resend MCP; verify `movemental.ai` SPF/DKIM/DMARC
- Attach Supabase MCP (`vhaiiiykcukrlyvwlgip`) to this automation for subscriber evidence
- Merge or close superseded draft PR on `cursor/resend-email-audit-97cb`
- Wire Resend webhooks + suppression if marketing broadcasts launch
- Confirmation token TTL
- Idempotency keys on send helpers
- Fix `email-setup` skill symlink on primary machine

### Explicit non-actions

- No production sends, broadcasts, DNS changes, key rotation, or migrations
- No audience / `newsletter_subscribers` batch mail
- No domain delete / API key create
- No merge to `main`
