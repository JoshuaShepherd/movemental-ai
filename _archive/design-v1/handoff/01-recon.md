# 1 · Recon

Every claim in this package traces to a file read at
`JoshuaShepherd/movemental-ai@205198904fdf` on 2026-09-09T22:58Z.

## Files read → what they establish

| File read | What it establishes |
| --- | --- |
| `package.json` | Next 16.2.3, React 19.2.4, Tailwind v4, drizzle-orm 0.45, Supabase SSR, Stripe, Resend. Gate scripts exist: `typecheck`, `lint`, `routes:check`, `link:check`, `redirects:check`, `validate:all`, `test:run`, `build:check` |
| `tailwind.config.ts` | Tailwind v4 config extends fonts/radii only; tokens live in `globals.css`. Canon doc named: `docs/design/INK_BAND_DESIGN_CHAIN.md` |
| `src/app/globals.css` | **The token source.** `:root` shadcn ramp + `.ink-band-surface` Ink Band ramp. Every colour the designs use exists here as a named variable |
| `components.json` | shadcn configured — style `radix-nova`, base `neutral`, CSS variables on, icons `lucide`, ui alias `@/components/ui` |
| `src/components/ui/button.tsx` | The **only** UI primitive in the repo. cva variants: default/primary/ghost/outline/secondary/destructive/link; sizes default/sm/lg/xs/icon/icon-sm |
| `src/app/page.tsx` | Root `/` is a `permanentRedirect("/agent")`. There is no root marketing page to edit |
| `src/app/**` route tree (368 files) | The full live route inventory — see the two tables below |
| `src/components/**` (depth 2, 226 files) | Component inventory. `agent-room/` is the bulk; `ink-band/`, `research/`, `voices/`, `founders/`, `field-guide/`, `safety-dashboard/`, `style-finder/` are the named subsystems |
| `src/app/terms/page.tsx` | `/terms` **exists**, fully authored, five sections via `LegalPageContent` |
| `src/components/ink-band/utility-shell.tsx` | `InkBandUtilityShell` — the wrapper for auth/admin surfaces. Applies `ink-band-surface` + Caveat font var |
| `src/app/dashboard/ai-reality/page.tsx` | A dashboard screen the design set never covered. Auth-gated, reads `getOrgDashboardPayload(orgId)`, org scope from `getTenantOrgId()` |
| `src/components/brand/movemental-logo.tsx` | Wordmark component; sources from `@/lib/brand/assets` `MOVEMENTAL_LOGO` (light/dark rasters) |
| `AGENTS.md` | Next 16 warning; read `node_modules/next/dist/docs/` before writing code |
| `pnpm-workspace.yaml` | pnpm 11 `allowBuilds` allowlist — pnpm-only file |
| repo root listing | **Both** `package-lock.json` (518KB) and `pnpm-lock.yaml` (578KB) are committed |
| `vercel.json` | One cron: `/api/cron/toolkit-followups` daily at 14:00 |
| `drizzle.config.ts` (present, root) | Drizzle owns schema. Migrations are `drizzle:gen` / `drizzle:push` |
| grep `path/safety|agent/path` under `src/lib/agent-room` | **No matches.** The Safety Stage route the designs assume does not exist and is referenced nowhere |

## Live public routes (read from the tree)

`/` → redirect to `/agent` · `/agent` · `/agent/about` · `/agent/assessment` ·
`/agent/churches` · `/agent/churches/deck` · `/agent/nonprofits` ·
`/agent/nonprofits/deck` · `/agent/institutions` · `/agent/institutions/deck` ·
`/agent/how-we-use-ai` · `/agent/invite` · `/agent/movement-voices` ·
`/about` · `/about/[slug]` · `/articles` · `/articles/[slug]` · `/assess` ·
`/cookies` · `/enroll` · `/field-guide` · `/footnotes` · `/how-we-use-ai` ·
`/movement-voices` · `/newsletter/confirmed` · `/newsletter/unsubscribed` ·
`/privacy` · `/program` · `/program/[category]/[templateId]` · `/research` ·
`/research/[slug]` · `/research/findings` · `/research/sources` · `/scenius` ·
`/share/ai-reality/[token]` · `/style-finder` · `/terms` · `/voices` ·
`/voices/[slug]` · `/welcome`

## Live auth / authed routes

`/login` · `/signup` · `/forgot-password` · `/auth/update-password` ·
`/auth/callback` · `/team-invite/[token]` · `/dashboard` ·
`/dashboard/safety` · `/dashboard/ai-reality` · `/dashboard/onboarding/[step]` ·
`/dashboard/onboarding/leader/[step]` · `/admin/onbuilding` ·
`/(studio)/agent-runtime`

## Not read, and therefore not claimed

- The Supabase schema itself. Table names in this package come from repo source
  that queries them, not from a database introspection.
- `src/components/agent-room/ink-band.module.css` (138KB) was not read in full.
  It is named as the style reference for agent-room surfaces; read the relevant
  block before restyling anything inside `agent-room/`.
- The 149 component files below depth 2 were listed by directory, not read.
