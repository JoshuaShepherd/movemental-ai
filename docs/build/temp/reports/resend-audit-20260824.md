## Resend audit — movemental (movemental-ai) — 2026-08-24

**Tenant = Movemental · Repo = JoshuaShepherd/movemental-ai · From domain expected = movemental.ai** (via `RESEND_FROM_EMAIL`, e.g. `updates@movemental.ai`)

Package `name`: `movemental`. No `src/lib/config/tenant.config.ts` — tenant scoping uses `TENANT_ORG_ID` (`src/lib/tenant.ts`); brand string is **Movemental** in email helpers. Confirm / site links use `NEXT_PUBLIC_SITE_URL` with fallback `https://movemental.ai`.

Branch: `cursor/resend-email-audit-86da` (automation cloud branch). Re-applies unmerged safe fixes from draft PRs #2 (`cursor/resend-email-audit-97cb`, 2026-08-03), #3 (`cursor/resend-email-audit-9217`, 2026-08-10), and #6 (`cursor/resend-email-audit-a596`, 2026-08-17).

### MCP

| Server | Status |
|--------|--------|
| Resend | **needsAuth** — catalog `namespaceStatus: ready`, but `list-domains` / `list-api-keys` / `list-webhooks` / `list-emails` / `list-logs` / `list-templates` all returned `API key is invalid` (`validation_error`). No `mcp_auth` tool exposed for Resend in this environment. Re-auth required in Cursor Automations MCP settings. |
| Supabase (`movemental` / `vhaiiiykcukrlyvwlgip`) | **unavailable** — not in this run’s MCP catalog (Cursor Automation Tools, cursor-cloud, Resend, cursor-subscriptions only). No live SQL. |

Skills: Resend plugin + email-best-practices loaded. `.claude/skills/email-setup` symlink still **broken** (`../../../my-skills/email-setup` missing). React Email: **not** a dependency (`resend` `^6.12.0` only).

### Config

- Env keys / example / schema: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_FROM_NAME` optional in `src/lib/env.ts` (Zod) — matches fail-soft product intent. Documented in `.env.local.example` (this run syncs example values to `updates@movemental.ai` / `Movemental`). Stack uses `RESEND_FROM_EMAIL` + `RESEND_FROM_NAME`, **not** `RESEND_FROM_DOMAIN`.
- From address & domain: `resendFromHeader()` builds `Movemental <email>` (default name); default email still `onboarding@resend.dev` when unset (dev sandbox). Production console warning when sandbox from is used.
- APP_URL for confirm links: `NEXT_PUBLIC_SITE_URL` → fallback `https://movemental.ai` (correct for this org site).
- No `NEXT_PUBLIC_*` Resend secrets. Client env schema does not expose Resend keys. Only `src/lib/email/resend.ts` imports the `resend` package (guarded with `server-only`).
- Agent VM: `.env.local` absent; Resend / site / tenant env vars unset in process (code-only + MCP attempt).
- `RESEND_WEBHOOK_SECRET` noted as future optional in `.env.local.example` (no receiver in code yet).

### Setup

- `getResend()` lazy singleton + null when unset + Sentry once-per-process warning: **yes** (`src/lib/email/resend.ts` + `import "server-only"`).
- Server-only send paths: Resend helpers under `src/lib/email/*` and `src/lib/book-email.ts` use `server-only` (or import guarded clients). Callers are API routes, cron services, and server libs — no Client Component Resend SDK usage found. Agent-room email UI components (`handbook-dock-email`, `readback-map-email`) are client capture forms only; they POST to API routes that send.
- Double opt-in newsletter: **yes** — `POST /api/newsletter` → `pending` + token → Resend confirm mail → `GET /api/newsletter/confirm` sets `confirmed` / clears token. Same `newsletter_subscribers` table. Rate-limited. Requires `TENANT_ORG_ID`.
- Unsubscribe: signed one-click via `NEWSLETTER_UNSUBSCRIBE_SECRET` (`/api/newsletter/unsubscribe`). Absent secret → confirm mail omits unsub link (graceful).
- Supabase Auth email vs Resend: **distinct**. Magic-link OTP + password reset use **Supabase Auth** (`signInWithOtp`, `resetPasswordForEmail` on signup/assess/forgot-password). Resend covers transactional product mail (newsletter confirm, contact, book, onboarding, toolkit, agent-room leads, integrity diagnostic, AI reality, public-page ratified, etc.). No Resend webhook receiver in-repo (`/api/webhooks` has calendly + stripe only).
- Intentional immediate-confirm exceptions (transactional lead magnets, not marketing DOI): toolkit download + some agent-room capture kinds upsert `newsletter_subscribers` as `confirmed` and send resource email — not a newsletter marketing subscribe path.
- Templates: inline HTML/text in-repo (not React Email; no preview route) — **LOW**.
- Idempotency keys: **not** used on `emails.send` — reliability gap for retries.

### Live Resend (MCP)

- Domain verified: **[?] NEEDS MCP** (invalid API key)
- Webhooks: **[?] NEEDS MCP**; code has no Resend webhook endpoint → Dashboard webhooks unused even if configured (**INFO** until bounce/complaint suppression is productized)
- Recent delivery health: **[?] NEEDS MCP**
- Templates in dashboard: **[?] NEEDS MCP** (in-repo templates are inline HTML — drift expected / INFO)

### Supabase

- Subscriber/confirm table evidence: **[?] NEEDS MCP** — schema in code: `newsletter_subscribers` with `status`, `confirmation_token`, `confirmed_at`, `unsubscribed_at`, `organization_id` (`src/lib/db/schema.ts`). Confirm route updates the same table subscribe inserts.
- Tenant scoping: code requires `TENANT_ORG_ID` / `organization_id` on insert and lookup. Live pending vs confirmed rates unknown without MCP.
- No confirmation token TTL column — tokens remain valid until used or replaced (**MEDIUM**).

### Findings (CRITICAL → LOW)

| Severity | Finding |
|----------|---------|
| **HIGH** | Live domain verification unknown (Resend MCP invalid key). If production still sends from `onboarding@resend.dev`, deliverability / trust fail for launch — code defaults to sandbox when `RESEND_FROM_EMAIL` unset. |
| **MEDIUM** | No bounce/complaint webhook → app-level suppression hygiene absent for marketing list growth (Resend may auto-suppress at provider; app DB not synced). |
| **MEDIUM** | Newsletter `confirmation_token` has no expiry; confirm accepts any unused token forever until rotated. |
| **MEDIUM** | No `idempotencyKey` on Resend sends — retries can double-send. |
| **LOW** | No React Email / preview route; inline HTML only. |
| **LOW** | `.claude/skills/email-setup` symlink broken in this workspace. |
| **INFO** | Prior safe-fix draft PRs (#2, #3, #6) still unmerged — this run re-applies the same hardening on a fresh cloud branch. Close superseded drafts when this PR lands. |
| **INFO** | Auth verify / magic link is Supabase mailer, not Resend — configure separately in Supabase dashboard. |
| **INFO** | Toolkit / agent-room lead magnets confirm immediately (transactional exception to DOI). |

### Fixes applied / deferred

**Applied (safe in-repo):**

- `import "server-only"` on `resend.ts` and `send-public-page-ratified.ts`
- Default From display name `Movemental`; production warn when from is `@resend.dev`
- Onboarding senders use shared `resendFromHeader()`
- Clearer skip log + typo fix in public-page-ratified email (`— Movemental`)
- `.env.local.example`, `check-env`, `smoke:comms`, env merge/sync scripts synced for `RESEND_FROM_*`, notify, unsubscribe secrets
- Documented future `RESEND_WEBHOOK_SECRET` as commented optional in `.env.local.example`
- This report (`docs/build/temp/reports/resend-audit-20260824.md`)

**Deferred (needs human / MCP / product work):**

- Re-auth Resend MCP; verify `movemental.ai` SPF/DKIM/DMARC
- Attach Supabase MCP (`vhaiiiykcukrlyvwlgip`) to this automation for subscriber evidence
- Merge or close superseded draft PRs (#2 / #3 / #6) when this PR lands
- Wire Resend webhooks + suppression if marketing broadcasts launch
- Confirmation token TTL
- Idempotency keys on send helpers
- Fix `email-setup` skill symlink on primary machine

### Explicit non-actions

- No production sends, broadcasts, DNS changes, key rotation, or migrations
- No audience / `newsletter_subscribers` batch mail
- No domain delete / API key create
- No merge to `main`
