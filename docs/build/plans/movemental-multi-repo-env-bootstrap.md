# Movemental multi-repo environment bootstrap

Step-by-step guide to collect **every secret and configuration value** used across Movemental apps under `01-Movemental-Core`. All Postgres-backed apps should use the **same Supabase project** (“Movemental” / shared production database) unless you intentionally maintain a fork or preview database.

**Canonical example files (copy → `.env.local` or merge into your shared bundle):**

| Repository | Example file |
|------------|----------------|
| `movemental-ai` | `.env.local.example` |
| `alan-hirsch` | `.env.example` → copy to `.env.local` (Next.js convention) |
| `alan-books` | `.env.example` → use as `.env.local` or load via `direnv` |
| `movemental-dashboard` | `.env.local.example` |
| `movemental-ai/docs/ai-studio` | `.env.example` → copy to `.env` (Vite `loadEnv`) |
| `ai-lab-agent` | `.env.example` → `.env.local` |
| `movemental-ai-agents` | `.env.example` → `.env.local` |

**Git clones** (HTTPS, folder `~/dev/01-Movemental-Core`):

```bash
git clone https://github.com/JoshuaShepherd/ai-lab-agent.git ai-lab-agent
git clone https://github.com/JoshuaShepherd/movemental-ai-agents.git movemental-ai-agents
```

(`ai-agents` in internal naming maps to repo **`movemental-ai-agents`** — npm package name is `ai-agents`.)

---

## 0. Decide where secrets live

Pick **one** primary store so machines stay aligned:

1. **Vercel** — each linked project: *Settings → Environment Variables* — then `vercel env pull .env.local`.
2. **A shared dotenv file** on disk — e.g. `~/Dev/.env.shared` — merged into each repo via scripts (`pnpm env:local-from-shared` where available) or `direnv`.
3. **1Password / Vault** — export into `.env.local` locally (never commit).

Never commit real `.env.local` or `.env.shared`.

---

## 1. Supabase — project URL, anon key, service role, Postgres URLs

**Goal:** One Supabase project for Movemental; every app uses matching `NEXT_PUBLIC_SUPABASE_URL`, keys, and pooler/direct URLs.

1. Open [Supabase Dashboard](https://supabase.com/dashboard) and select the **Movemental** project.
2. **Project URL + anon (public) key**  
   - Path: **Project Settings → API**  
   - Doc: [API settings](https://supabase.com/docs/guides/api/creating-routes)  
   - Copy into:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Service role key (server-only)**  
   - Same page: **Project API keys → `service_role` (secret)**  
   - Doc: [Understanding API keys](https://supabase.com/docs/guides/api/api-keys)  
   - Set `SUPABASE_SERVICE_ROLE_KEY` anywhere admin/storage bypass is needed (never expose to the browser).
4. **Postgres connection strings**  
   - Path: **Project Settings → Database**  
   - Doc: [Connecting to Postgres](https://supabase.com/docs/guides/database/connecting-to-postgres)  
   - Use **connection pooling** (transaction pooler, port **6543**) for serverless/app queries → `DATABASE_URL` / `POSTGRES_URL` as appropriate per repo.
   - Use **direct** or **session** pooler when **Drizzle migrations / `drizzle-kit push`** require it → `DIRECT_DATABASE_URL`, `SESSION_POOLER_DATABASE_URL`, or `DRIZZLE_DATABASE_URL` (see `movemental-dashboard/drizzle.config.ts`).

**Resolve `TENANT_ORG_ID`:** In Supabase **SQL Editor**, run:

```sql
select id, slug, name from organizations order by slug;
```

Use the UUID for the org that owns tenant-scoped rows (e.g. Alan Hirsch tenant vs Movemental org site). Set `TENANT_ORG_ID` in each app that scopes data by organization.

---

## 2. Vercel — link projects and pull env

For each Next app deployed on Vercel:

1. [Vercel Dashboard](https://vercel.com/dashboard) → select the project → **Settings → Environment Variables**.  
   - Doc: [Environment variables](https://vercel.com/docs/projects/environment-variables)
2. Locally: `vercel link`, then `vercel env pull .env.local --yes`.  
   - CLI: [vercel env](https://vercel.com/docs/cli/env)

**Typical project mapping** (scope `joshuashepherds-projects` — yours may differ):

| Local repository folder | Vercel project name |
|-------------------------|---------------------|
| `movemental-ai` | `movemental-ai-site` |
| `alan-hirsch` | `alan-hirsch` |
| `alan-books` | `alan-books` |
| `movemental-dashboard` | `movemental-visual-editor` |
| `movemental-ai/docs/ai-studio` | `movemental-content-studio` |
| `ai-lab-agent` | `ai-lab-agent` |
| `movemental-ai-agents` | `movemental-ai-agents` |

Non-interactive link + pull **development** env (repeat per repo, from that repo’s root):

```bash
pnpm exec vercel link --yes --scope joshuashepherds-projects --project <project-name>
pnpm exec vercel env pull .env.local --yes --environment development
```

(`docs/ai-studio` pulls to `.env` instead of `.env.local` — use `vercel env pull .env --yes --environment development`.)

**After pulling, fix naming mismatches:**

- **movemental-ai** — Vercel may expose `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`; the app expects **`NEXT_PUBLIC_SUPABASE_ANON_KEY`**. Duplicate the value under the anon key name (or rename in Vercel).
- **alan-hirsch** — Drizzle reads **`POSTGRES_URL`**; many pulls only define **`DATABASE_URL`**. Set `POSTGRES_URL` to the same pooler URI as `DATABASE_URL`.
- **alan-books** — The linked Vercel project often has **few or no** DB vars in Development; copy `DATABASE_URL`, `TENANT_ORG_ID`, and Supabase keys from `movemental-ai`’s `.env.local` if you run ingest scripts locally.
- **alan-hirsch** — **`AUTH_SECRET`** is usually **not** on Vercel (local/session signing). Generate once and add to `.env.local`: `openssl rand -base64 32`.
- **docs/ai-studio** — Vite expects **`GEMINI_API_KEY`**; Vercel may only store **`GOOGLE_GENERATIVE_AI_API_KEY`**. Alias locally if needed.
- **movemental-ai-agents** (`pnpm check:env`) — requires **`DATABASE_URL`**, **`SUPABASE_SERVICE_ROLE_KEY`**, **`NEXT_PUBLIC_*`** Supabase keys, **`UPSTASH_REDIS_REST_URL`** / **`UPSTASH_REDIS_REST_TOKEN`**, and **`SERVICE_API_SECRET`** (≥32 chars). **`TENANT_ORG_ID`** is strongly recommended for scripts/single-tenant defaults.
- **ai-lab-agent** — requires **`OPENAI_API_KEY`**, **`AI_LAB_API_KEY`**, **`DATABASE_URL`** (see `.env.example`). If `pnpm`/CLI lacks `vercel`, invoke **`pnpm exec vercel`** from `movemental-ai` after **`pnpm install`** there, or use **`npx vercel`** globally.

---

## 3. Auth secret (Alan Hirsch tenant app only)

**Alan Hirsch** uses session encryption (`AUTH_SECRET`).

1. Generate a random secret (32+ bytes), e.g. `openssl rand -base64 32`.  
2. Set `AUTH_SECRET` in `.env.local`.  
   - Related patterns: [Auth.js environment variables](https://authjs.dev/reference/core#environment-variables) (conceptually similar; follow your app’s exact middleware expectations).

---

## 4. App URL / redirect bases

Set canonical URLs so OAuth, Stripe redirects, and metadata resolve correctly:

| Variable | Typical use |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | movemental-ai, dashboard public URLs |
| `BASE_URL` | alan-hirsch Stripe callbacks |
| `NEXT_PUBLIC_APP_URL` | alan-hirsch dashboard server fetches |
| `NEXT_PUBLIC_SITE_URL` / `APP_URL` | dashboard welcome links; ai-studio hosting URL |

Local dev often uses `http://localhost:3000` (or the port your app prints).

---

## 5. Resend (transactional email)

Used by **movemental-ai** for contact, newsletter, book flows.

1. [Resend API keys](https://resend.com/docs/dashboard/api-keys/introduction)  
2. [Domain verification](https://resend.com/docs/dashboard/domains/introduction)  
3. Set `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, optional `RESEND_FROM_NAME`, `CONTACT_NOTIFY_EMAIL`, and `NEWSLETTER_UNSUBSCRIBE_SECRET` (generate locally: `openssl rand -hex 24`).

---

## 6. Stripe (payments)

1. [Stripe API keys](https://stripe.com/docs/keys)  
2. [Webhooks](https://stripe.com/docs/webhooks) — signing secret → `STRIPE_WEBHOOK_SECRET`  
3. Set `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, and webhook secret in each app that enables checkout.

---

## 7. Sentry (optional)

1. [Sentry](https://sentry.io/) → create/select project.  
2. [Auth token for uploads](https://docs.sentry.io/product/cli/configuration/) (CI/source maps): `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT`  
3. Client DSN: `NEXT_PUBLIC_SENTRY_DSN` (and server `SENTRY_DSN` where used).

---

## 8. OpenAI

Used heavily by **movemental-dashboard** (agents, writing assistant, transcripts, SEO tooling).

1. [API keys](https://platform.openai.com/api-keys)  
2. Set `OPENAI_API_KEY`; optional: `OPENAI_MODEL`, `OPENAI_VECTOR_STORE_ID`, `OPENAI_WEBHOOK_SECRET` (batch webhooks), `VOICE_FIDELITY_MODEL`, `SEO_AGENT_MODEL`, `SEO_LSI_MODEL`.

---

## 9. Anthropic (Claude)

1. [Anthropic Console](https://console.anthropic.com/) → API keys  
2. Set `ANTHROPIC_API_KEY`; optional `ANTHROPIC_MODEL`.

---

## 10. Google Gemini (dashboard + ai-studio)

**Dashboard:** enable with `GEMINI_ENABLED=true` and `GOOGLE_GENERATIVE_AI_API_KEY`.  
- [Google AI Studio](https://aistudio.google.com/app/apikey) or [Gemini API docs](https://ai.google.dev/gemini-api/docs/api-key)

**`docs/ai-studio` (Vite):** `GEMINI_API_KEY` in `.env` (see `vite.config.ts`).

Optional: `GEMINI_DEFAULT_MODEL`.

---

## 11. YouTube Data API (dashboard — optional)

1. [YouTube Data API v3](https://developers.google.com/youtube/v3/getting-started)  
2. Set `YOUTUBE_API_KEY` for in-dashboard video search.

---

## 12. SERP / competitive SEO (optional)

1. [Serper.dev](https://serper.dev/) (or your provider)  
2. Set `SERP_API_KEY`, optional `SERP_PROVIDER` (default `serper`).

---

## 13. Shopify (optional)

If integrating storefront sync:

1. [Shopify Admin API access tokens](https://shopify.dev/docs/apps/auth/admin-app-access-tokens)  
2. Set `SHOPIFY_SHOP_DOMAIN`, `SHOPIFY_ACCESS_TOKEN`.

---

## 14. Playwright E2E (dashboard)

Optional authenticated runs:

- Set `E2E_AUTH_EMAIL`, `E2E_AUTH_PASSWORD`  
- Optional `PLAYWRIGHT_BASE_URL`

---

## 15. Alan Books — scripts only

No Next.js runtime bundle; scripts need **Postgres + tenant** and optional **AI keys** for ingest/RAG (see `alan-books/.env.example`).

---

## 16. Verify per repo

After filling secrets:

| Repo | Command / check |
|------|------------------|
| `movemental-ai` | `pnpm check:env` |
| `movemental-dashboard` | `pnpm check:env` (loads `src/lib/env`) |
| `alan-hirsch` | Start `pnpm dev` — ensure `POSTGRES_URL`, Supabase URL/anon, `AUTH_SECRET` present |
| `alan-books` | Run target script with `DATABASE_URL` set (see script headers) |
| `docs/ai-studio` | `pnpm dev` with `GEMINI_API_KEY` in `.env` |
| `movemental-ai-agents` | `pnpm check:env` |
| `ai-lab-agent` | `pnpm build:check` (and `.env.local` matches `.env.example` shape) |

---

## Related

- WSL/Linux shell setup: [docs/build/prompts/wsl-ubuntu-dev-environment-setup.md](../prompts/wsl-ubuntu-dev-environment-setup.md)  
- Contact/newsletter ops: [docs/build/markdown/contact-newsletter-operations-playbook.md](../markdown/contact-newsletter-operations-playbook.md)
