# Supabase email + password auth — operator checklist

The app uses **email + password** sign-in (`/login`), **forgot password** (`/forgot-password`), and **reset password** (`/auth/update-password` after the recovery email link). Magic-link OTP on `/login` is removed.

Complete these steps in the **Supabase Dashboard** for the project behind `NEXT_PUBLIC_SUPABASE_URL`.

## Authentication → Providers → Email

1. Enable the **Email** provider with **email and password** (not passwordless-only).
2. Align with **sign-in only** (no public self-serve sign-up): disable **Allow new users to sign up** if you do not want public registration, or rely on admin-created users only.
3. **Confirm email**: if enabled, provisioned users must complete confirmation before `signInWithPassword` succeeds.

## URL configuration

1. **Site URL**: production canonical URL (e.g. `https://movemental.ai`).
2. **Redirect URLs**: add every origin that must receive auth redirects, including:
   - Production and staging origins
   - `http://localhost:3000` (and other local ports if used)
   - Vercel preview URL patterns if previews must reset passwords

## Reset password email template

1. Open **Authentication → Email Templates → Reset password**.
2. Ensure the user is sent to your app with a **PKCE `code`** flow (Supabase default for many setups). The app exchanges the code at `/auth/callback`.
3. Set **Redirect URL** used by the template to match an allowlisted URL. The app expects recovery to land on:

   `{ORIGIN}/auth/callback?next=%2Fauth%2Fupdate-password`

   (i.e. `next` path `/auth/update-password` after code exchange).

## User provisioning (no public sign-up)

Dashboard access still requires a row in `organization_memberships`. Create auth users via one of:

- **Supabase Dashboard → Authentication → Users** (invite or add user with password)
- **Admin API** / **`inviteUserByEmail`** using `SUPABASE_SERVICE_ROLE_KEY` in a trusted script

## Manual QA matrix

| Step | Expected |
|------|----------|
| `/login` with valid user + wrong password | Inline error, no session |
| `/login` with valid user + correct password | Redirect to `next` or `/dashboard` |
| Unauthenticated `/program` | Redirect to `/login` |
| User with auth but no org | `/login?reason=no_org` after dashboard layout |
| `/forgot-password` submit | Generic success copy; email received if account exists |
| Recovery link from email | Session established, redirect to `/auth/update-password` |
| Set new password + submit | Success; can open `/dashboard` when org exists |
| Malicious `?next=https://evil.com` on `/login` | After sign-in, redirect stays internal (sanitized to `/dashboard`) |

## Optional E2E

Set `E2E_AUTH_EMAIL` and `E2E_AUTH_PASSWORD` to a disposable test user (with org membership in a test project) to run password login checks in `tests/e2e/auth-password.spec.ts`.
