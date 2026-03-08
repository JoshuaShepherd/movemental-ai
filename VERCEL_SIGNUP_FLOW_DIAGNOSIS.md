# Vercel Sign-Up / Fit-Check Flow — Diagnosis & Resolution

**Issue:** `Application error: a server-side exception occurred while loading movemental-ai-site.vercel.app` when visiting the sign-up URL or arriving via the fit-check path (Fit Check → Full Fit → Info step → redirect to `/sign-up?next=/tour`).

**Last Updated:** February 14, 2025

---

## 1. Root Cause Analysis

### 1.1 Environment Variable Mismatch (Primary Suspect)

The codebase expects specific Supabase environment variable names that do **not** match what appears in `.env.local`:

| Code Expects | Your .env.local Has | Impact |
|--------------|---------------------|--------|
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | Key is never read → Supabase client throws |
| or `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (not set) | Same outcome |

**Where it fails:**

- `lib/supabase/server.ts` — used by sign-up server action, auth callback, sign-out
- `lib/supabase/client.ts` — used by any client component calling `createClient()`
- `lib/supabase/proxy.ts` — used by root `proxy.ts` on every request (gracefully returns early if missing; does not throw)

When the Supabase key is missing, `createClient()` throws:

```
Missing Supabase env: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)
```

### 1.2 When the Exception Occurs

The server-side exception can be triggered at these points:

| Trigger | Code Path | Required Env |
|---------|-----------|--------------|
| Sign-up form submit | `signUp()` in `auth/actions.ts` → `createClient()` | Supabase URL + key |
| Auth callback (OAuth/email confirm) | `app/auth/callback/route.ts` → `createClient()` + `linkProspectiveWriter` | Supabase URL + key, `DATABASE_URL` |
| Sign-out | `app/auth/signout/route.ts` → `createClient()` | Supabase URL + key |
| API: linked writers | `GET /api/simplified/linked-writers` → `writeService` → `db` | `DATABASE_URL` |
| Onboarding upload | `POST /api/onboarding/upload` | `SUPABASE_SERVICE_ROLE_KEY` |

For the **sign-up / fit-check flow**, the most likely failure is:

1. User submits sign-up form → `signUp` server action → `createClient()` throws (missing key).
2. User completes OAuth or email confirmation → auth callback → `createClient()` or `linkProspectiveWriter` (which loads `db`) throws.

### 1.3 Database URL Requirement

`lib/auth/link-prospective-writer.ts` calls `writeService`, which imports `db` from `db/index.ts`. That module throws at load time if `DATABASE_URL` is missing:

```ts
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}
```

So any flow that hits the auth callback (OAuth or email confirm) needs both Supabase vars and `DATABASE_URL`.

---

## 2. Required Environment Variables (Vercel)

Set these in **Vercel Project → Settings → Environment Variables** for the relevant environments (Production, Preview, Development):

### 2.1 Supabase Auth (mandatory for sign-up / sign-in / sign-out)

| Variable | Example / Notes |
|----------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://<project-ref>.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_...` or your anon/publishable key |
| **Or** `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Legacy anon JWT if using older Supabase setup |

**Important:** Use `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, not `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`.

### 2.2 Database (for auth callback and linked-writers API)

| Variable | Example / Notes |
|----------|-----------------|
| `DATABASE_URL` | `postgresql://...@...pooler.supabase.com:6543/postgres` |

### 2.3 Optional but Recommended

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_APP_URL` | Base URL for auth redirects (e.g. `https://movemental-ai-site.vercel.app`). Falls back to `VERCEL_URL` if unset. |
| `SUPABASE_SERVICE_ROLE_KEY` | Required only for onboarding upload; not needed for sign-up flow. |

---

## 3. Diagnosis Steps

### 3.1 Inspect Vercel Logs

1. Open **Vercel Dashboard** → your project → **Logs**.
2. Filter by **Runtime Logs** and time window when you reproduce the error.
3. Look for:
   - `Missing Supabase env: set NEXT_PUBLIC_SUPABASE_URL and...`
   - `DATABASE_URL is not set`
   - Any other stack trace or error message.

### 3.2 Verify Environment Variables

1. **Vercel Dashboard** → Project → **Settings** → **Environment Variables**.
2. Confirm:
   - `NEXT_PUBLIC_SUPABASE_URL` — present and correct.
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` **or** `NEXT_PUBLIC_SUPABASE_ANON_KEY` — present and correct (not `PUBLISHABLE_DEFAULT_KEY`).
   - `DATABASE_URL` — present if using auth callback or linked-writers.
3. Ensure variables are enabled for **Production** (and Preview if you test on preview deployments).
4. Redeploy after changing env vars.

### 3.3 Check Supabase Dashboard

1. Supabase → Project → **Settings** → **API**.
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** / **publishable** key → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

### 3.4 Reproduce Locally With Simulated Env

1. Temporarily rename in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
2. Run `npm run dev`, go through fit-check → Full Fit → Info step → sign-up and submit.
3. If it works locally, the mismatch is confirmed.

---

## 4. Recommended Fixes

### 4.1 Vercel Environment Variables (Do This First)

1. In Vercel, add or update:

   ```
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = <value from NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY in .env.local>
   ```

2. If you prefer to keep `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` as the source of truth, add the same value under the name the code expects:

   ```
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = <copy of PUBLISHABLE_DEFAULT_KEY value>
   ```

3. Ensure `DATABASE_URL` is set for Production (and Preview if needed).
4. Redeploy the project.

### 4.2 Code Change: Support `PUBLISHABLE_DEFAULT_KEY` (Already Applied)

To align with Supabase’s newer naming, you can add a fallback in the Supabase client code so both names work. This is optional; the primary fix is to set the correct variable name in Vercel.

**Files updated:** `lib/supabase/server.ts`, `lib/supabase/client.ts`, `lib/supabase/proxy.ts`, `lib/supabase/test-client.ts` — a fallback for `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` is now in place. On Vercel, set either `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`.

---

## 5. Post-Fix Checklist

- [ ] Set `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (or `ANON_KEY`) in Vercel with the correct value.
- [ ] Confirm `NEXT_PUBLIC_SUPABASE_URL` is set.
- [ ] Confirm `DATABASE_URL` is set (needed for auth callback and linked-writers).
- [ ] Redeploy on Vercel.
- [ ] Test flow: Fit Check → Full Fit → Info step → Sign Up → submit form.
- [ ] If using email confirmation, test: confirm link → landing page.
- [ ] If using OAuth, test: OAuth flow → callback → redirect.
- [ ] Check Vercel logs for any remaining errors.

---

## 6. Flow Reference

```
Fit Check (/fit-check)
  → User selects Full Fit
  → Info step (informational page)
  → Redirect: /sign-up?next=/tour

Sign Up (/sign-up)
  → User submits form
  → signUp() server action → createClient() [needs Supabase env]
  → If email confirm: redirect /confirm
  → Else: redirect /tour

Auth Callback (/auth/callback)
  → OAuth code exchange or email OTP verify
  → createClient() [needs Supabase env]
  → linkProspectiveWriter() → writeService → db [needs DATABASE_URL]
  → Redirect to next param
```

---

## 7. Related Documentation

- `CLAUDE.md` — Supabase auth env and project structure
- `_docs/guides/prospective-writers-supabase-mcp-and-why-movemental.md` — auth callback and linking
- Supabase: [Project API keys](https://supabase.com/dashboard/project/_/settings/api)
- Vercel: [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
