# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the **movemental** organizational site repo.

## What this repo is

Movemental is the organizational site for Movemental — a fresh build from scratch. The canonical design spec lives at [docs/design/DESIGN.md](docs/design/DESIGN.md) (**Concept Modern** — warm cream paper, near-black ink, Inter + Newsreader italic emphasis, ink pill CTAs, Midnight bands). Sibling static HTML reference: [docs/design/MOVEMENTAL_HTML_TEMPLATE.md](docs/design/MOVEMENTAL_HTML_TEMPLATE.md) (Oatmeal html-template — **content/IA only**, do not import its tokens).

### Current state: Stitch migration well underway

The core shell (`globals.css`, `layout.tsx`) and home page are built. A `(site)` route group provides shared nav/footer chrome, with pages for about, case-studies, contact, cookies, evidence, faq, methodology, pricing, privacy, services, system, terms, walkthrough, and who-we-serve. Components live in `primitives/`, `sections/`, and `nav/`.

New pages and components should still follow [docs/build/prompts/stitch-to-react-migration.md](docs/build/prompts/stitch-to-react-migration.md) — it is the authoritative way to translate Stitch screens into React. Do not improvise layouts, paste marketing templates, or substitute stock imagery.

### Stitch project pin

The **only** Stitch project that informs this repo is `2208910962065880866`. See [docs/build/stitch-project.md](docs/build/stitch-project.md) for access patterns and scope guardrails. Never call `mcp__stitch__list_projects` during normal work — go straight to `mcp__stitch__list_screens({ projectId: "2208910962065880866" })`.

### Sibling repos (read-only references)

Available via `.claude/settings.json` → `additionalDirectories`:

- `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch` — Alan Hirsch **tenant app** (primary reference for patterns, six-layer type chain, and symlinked skills)
- `/Users/joshuashepherd/Desktop/dev/repos/movemental-ai` — secondary reference, sibling project

Use them for *how* to structure things (conventions, patterns). Do **not** copy visual components or page content from them — movemental's design is the Stitch project, not these siblings.

## Commands

- `pnpm dev` — Start Next.js dev server (Turbopack is the default in Next 16)
- `pnpm build` — Production build
- `pnpm typecheck` — TypeScript check (`tsc --noEmit`)
- `pnpm lint` — ESLint
- `pnpm drizzle:gen` — Generate Drizzle migrations
- `pnpm drizzle:push` — Push schema to the database (reads `.env.local` via drizzle.config.ts)
- `pnpm db:studio` — Open Drizzle Studio
- `pnpm check:env` — Validate required env vars are present in `.env.local`
- `pnpm env:local-from-shared` — Merge `~/Desktop/Dev/.env.shared` → `.env.local`
- `pnpm vercel:env:sync` — Push movemental-scoped keys from shared file to linked Vercel (prod/preview/dev)
- `pnpm test` / `pnpm test:run` — Vitest (watch / single-run). Config: [vitest.config.mts](vitest.config.mts); specs under [tests/](tests/). Run one file with `pnpm test:run path/to/file.test.ts`, or focus with `.only` / `-t "name"`.
- `pnpm test:e2e` / `pnpm test:e2e:ui` — Playwright ([playwright.config.ts](playwright.config.ts))
- `pnpm validate:all` — Run the six-layer alignment checks (contracts → services → routes → hooks). Stages: `pnpm db:check`, `pnpm contracts:check`, `pnpm services:check`, `pnpm routes:check`, `pnpm hooks:check`
- `pnpm generate:schemas|services|routes|hooks` — Regenerate a layer from the Drizzle schema. When `validate:all` fails, regenerate the lowest broken layer and re-validate — do not hand-patch upper layers.
- `pnpm reader:sync` / `pnpm reader:check` / `pnpm reader:serve` — Sync and serve the `docs/` reader manifest (static docs site on :8765)
- `prebuild` runs [scripts/pre-build-check.ts](scripts/pre-build-check.ts) automatically before `pnpm build`; also exposed as `pnpm build:check`

### Bootstrap (fresh clone)

```bash
pnpm install
vercel link                          # link to the Vercel project
vercel env pull .env.local --yes     # pull environment variables
pnpm check:env                       # sanity-check required keys
pnpm dev
```

**Shared env (primary machine):** `~/Desktop/Dev/.env.shared` — run `pnpm env:local-from-shared` then `pnpm vercel:env:sync` instead of (or after) `vercel env pull` when you want local + Vercel aligned to that file. Optional `DEV_DOTENV_SHARED_PATH` overrides the path.

## Tech stack

- **Next.js 16** (App Router, Turbopack, React Server Components)
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first config via `@theme` in `src/app/globals.css`)
- **shadcn/ui** (`radix-nova` style, Radix primitives, `lucide-react` icons)
- **Supabase** — auth + Postgres (`@supabase/ssr`, `@supabase/supabase-js`)
- **Drizzle ORM** + `postgres` driver + `drizzle-zod`
- **Zod 4** — runtime validation
- **TanStack Query v5** — data fetching on the client
- **React Hook Form** + `@hookform/resolvers`
- **Sentry** (`@sentry/nextjs`) — error monitoring
- **Motion / GSAP** (`motion`, `gsap`, `@gsap/react`) — animations
- **Viz stack** (`d3`, `sigma`, `graphology`, `@xyflow/react`) — network / graph visualizations
- **Vitest** + **Playwright** — unit/integration and e2e tests
- **Vercel** — deployment target (Fluid Compute by default)

## Architecture

### Directory layout

```text
proxy.ts                       # Next 16 request middleware (renamed from middleware.ts)
drizzle.config.ts
scripts/
  check-env.ts                 # Validates required env vars
  pre-build-check.ts           # Runs before `pnpm build` (via prebuild script)
  validate-*.ts                # Six-layer alignment checks (db, semantic, services, routes, hooks)
  generate-*.ts                # Regenerate a layer from the Drizzle schema
tests/                         # Vitest specs (vitest.config.mts) + Playwright e2e (playwright.config.ts)
docs/
  design/DESIGN.md             # Concept Modern — canonical design spec
  design/MOVEMENTAL_HTML_TEMPLATE.md  # Sibling Oatmeal html-template (reference only)
  build/
    stitch-project.md          # Pins Stitch project 2208910962065880866
    prompts/
      stitch-to-react-migration.md   # The authoritative build prompt
src/
  app/
    globals.css                # Tailwind v4 @theme inline + MD3 :root tokens
    layout.tsx                 # Root layout — Inter font, Providers wrapper
    providers.tsx              # React Query provider (client component)
    favicon.ico
    (site)/                    # Route group — marketing pages with shared nav/footer
      layout.tsx               # SiteNav + SiteFooter chrome, pt-16 for fixed nav
      page.tsx                 # Home page (composes section components)
      about/ case-studies/ contact/ evidence/ faq/ methodology/
      pricing/ services/ walkthrough/ who-we-serve/
      cookies/ privacy/ terms/ # Legal pages
      system/                  # Design system preview (if present)
  components/
    nav/                       # SiteNav (glass bar), SiteFooter, mobile nav, link config
    primitives/                # Section, Container, Display, Eyebrow, Prose, ArrowLink
    sections/                  # Home page sections (hero, philosophy, mechanism, etc.)
    ui/                        # shadcn components (added on-demand; do not hand-edit)
  lib/
    env.ts                     # Zod-validated environment variables
    utils.ts                   # `cn` helper
    supabase/
      client.ts                # Browser client
      server.ts                # Server Component / Action / Route Handler client
      middleware.ts            # Session refresh helper called from proxy.ts
    db/
      index.ts                 # Drizzle client (postgres-js)
      schema.ts                # Drizzle schema — single source of truth
```

### Six-layer type safety chain (aspirational, mirrors tenant app — `movemental-sites/alan-hirsch`)

Types flow **downstream only** — never import from higher layers into lower:

1. **Drizzle schema** (`src/lib/db/schema.ts`) — single source of truth
2. **Zod schemas** — runtime validation (generated from Drizzle via `drizzle-zod`)
3. **Services** — business logic returning `Result<T>`, never throw
4. **API routes** — HTTP endpoints with Zod validation
5. **React hooks** — TanStack Query wrappers; never raw `fetch`
6. **UI components** — consume hooks, never call APIs directly

Fix errors bottom-up: trace to the source layer and fix there first. Never modify a lower layer to satisfy an upper layer's needs.

## Design system rules (from docs/design/DESIGN.md)

DESIGN.md is **Concept Modern** — charter (pillars + quality bar), semantic color (light default, optional **global dark** via `html.dark` + `next-themes`, Midnight regional bands), typography and motion tokens, spacing, accessibility, primitives/UI/section chain, Stitch rules, and change control. Full spec: [docs/design/DESIGN.md](docs/design/DESIGN.md). Agent UI skill: `.claude/skills/concept-modern-ui/SKILL.md`. Quick rules:

- **Light default; global dark optional.** Users can switch light/dark (nav sun/moon); do not hand-edit `html` theme class in pages. Dark **hero bands** still use `variant="midnight"` (`--inverse-surface`) for regional contrast.
- **Semantic tokens only.** Use `bg-background`, `bg-section`, `bg-card`, `bg-elevated`, `bg-inverse-surface`, `text-foreground`, `text-muted-foreground`, `text-inverse-foreground`, `bg-primary` — **never** raw hex, `bg-white`, `bg-black`, `bg-blue-600`, `text-gray-500`. DESIGN.md section 11 summarizes Stitch remaps; the migration prompt [section 7](docs/build/prompts/stitch-to-react-migration.md) has the full mechanical table for agents.
- **No 1px solid borders for sectioning.** Depth comes from tonal stacking — a `bg-card` block sitting on a `bg-section` background is the "Gold Standard." Borders are allowed only for form-field accessibility (use `border-border`, which resolves to `outline_variant` at 15% opacity).
- **No pasted-on drop shadows.** If elevation is truly needed, use `shadow-ambient` (`0 12px 40px rgba(42, 52, 57, 0.06)`). Otherwise, rely on Ghost Lift (tonal stacking).
- **Primary is ink, not blue.** `bg-primary` is the near-black **ink pill** CTA on light surfaces (cream on dark). Do not use legacy `#0053db` Digital Curator blue on marketing pages.
- **Never pure black.** Use `text-foreground` (which resolves to ink `#19150f`) or `bg-inverse-surface` for dark elements.
- **Inter + Newsreader.** Inter via `next/font` for body/UI; Newsreader italic via `<em>` inside display lines only — never for multi-paragraph body copy.
- **Breathing layout.** If a component feels crowded, increase padding — never shrink type to fit. Layout tokens: `--container-max: 1200px`, `--prose-max: 680px`, `--section-y-sm: 80px`, `--section-y-lg: 120px`.

## React / Next.js rules

- **`"use client"` boundaries.** Never add to root layout. Push as deep as possible (leaf components). Keep layouts as Server Components.
- **Params in Server Components.** Receive `params` / `searchParams` as props. Only use `useParams()` / `useSearchParams()` in client components that need interactivity.
- **Supabase Auth (SSR).** Use only `getAll` / `setAll` for cookies (never `get` / `set` / `remove`). Import from `@supabase/ssr`, never `auth-helpers-nextjs`.
- **Next 16 middleware is `proxy.ts`.** Not `middleware.ts`. Keep logic focused on interception, auth gates, rewrites, and redirects.
- **Turbopack is default.** No special config needed for dev or build.

## Environment variables

Required:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `DATABASE_URL`

Optional:

- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_FROM_NAME` — transactional email ([Resend + Next.js](https://resend.com/docs/send-with-nextjs))
- `CONTACT_NOTIFY_EMAIL` — internal inbox for new `/api/contact` submissions (see `src/lib/email/contact-notifications.ts`)
- `TENANT_ORG_ID` — **required for `/api/newsletter`** (double opt-in rows are scoped to this org); see `docs/build/markdown/contact-newsletter-operations-playbook.md`

Use `vercel env pull .env.local` to sync from the Vercel project. Validate with `pnpm check:env`. Runtime validation happens in `src/lib/env.ts`.

## Stitch MCP (Google's UI design tool)

Stitch MCP is the single source of truth for every visual in this repo. See [docs/build/stitch-project.md](docs/build/stitch-project.md) — **only project `2208910962065880866`** feeds components into `src/`.

Stitch MCP is configured **globally** at `~/.claude/mcp.json` and connects at session start. Verify with `claude mcp list` — look for `stitch: ... ✓ Connected`. No repo-local `.mcp.json` is committed because the API key cannot safely be checked in.

### Fresh-machine setup

Add this block to `~/.claude/mcp.json` under `mcpServers` and restart Claude Code:

```json
"stitch": {
  "command": "npx",
  "args": ["@_davideast/stitch-mcp", "proxy", "--transport", "stdio"],
  "env": {
    "STITCH_API_KEY": "<your-key>"
  }
}
```

Get a key from [stitch.withgoogle.com](https://stitch.withgoogle.com) → account settings.

### Key tools

- `mcp__stitch__list_screens({ projectId: "2208910962065880866" })` — **the default entry point**
- `mcp__stitch__get_screen`, `get_project`, `edit_screens`
- `mcp__stitch__list_design_systems`, `create_design_system`, `apply_design_system`
- `mcp__stitch__generate_screen_from_text`, `generate_variants` — only when explicitly asked to author new screens

`mcp__stitch__list_projects` returns hundreds of KB and **must not** be called during normal work. Go straight to `list_screens` with the pinned project ID.

### Workflow skills

Stitch workflow skills under `.claude/skills/` wrap the MCP calls for common flows. Use them via the Skill tool rather than raw MCP:

- **`stitch-design`** — generate new screens from text prompts, apply design system
- **`stitch-build`** — convert a Stitch screen into production React components
- **`stitch-react`** — Stitch → React component system (design tokens, decomposition, TS types, validation)
- **`stitch-loop`** — iterative refinement loop on a screen
- **`stitch-variants`** / **`stitch-iterate`** — alternatives and targeted edits
- **`stitch-export`** / **`stitch-download`** — pull assets out of Stitch

For the ongoing site build, **read [docs/build/prompts/stitch-to-react-migration.md](docs/build/prompts/stitch-to-react-migration.md) first.** It is the authoritative, step-by-step migration prompt and supersedes the generic `stitch-build` / `stitch-react` skills for this repo. The skills remain useful for one-off tasks.

## Claude skills

`.claude/skills/` is mostly symlinks — tenant skills from `movemental-sites/alan-hirsch/.claude/skills` plus shared skills from `my-skills`. On name collisions, **the tenant app repo wins** as primary reference. Because they're symlinks, updates in either source repo are picked up automatically.

Highlights for this repo:

- `react-best-practices`, `tailwind-design-system`, `frontend-patterns` — UI work
- `supabase-security-audit`, `nextjs-supabase-auth`, `postgres-best-practices` — data layer
- `deploy-to-vercel`, `vercel-cli-with-tokens`, `env-setup` — deployment / env
- `new-page`, `design-section`, `new-entity` — scaffolding
- `type-safety-chain` — layer validation patterns from the tenant app repo (`movemental-sites/alan-hirsch`)
- `testing-setup`, `e2e-studio-tests`, `storybook-setup` — test harness when needed

When a skill is relevant to the task, invoke it via the Skill tool rather than free-handing the approach.

## Canonical doctrine — movement leaders vs organizations

Authoritative: [docs/build/strategy/movement-leaders-as-ecosystem-layer.md](docs/build/strategy/movement-leaders-as-ecosystem-layer.md).

> Organizations are the primary implementation audiences. Movement leaders are a distinct trusted-voice and ecosystem layer, not merely a parallel funnel segment.

Consequences:

- **Do not** place movement leaders as a fourth sibling card beside churches / nonprofits / institutions in audience hubs, grids, or funnel comparisons.
- **Default public label** for the movement-leader ecosystem surface is **"Trusted voices"** (not "Committed voices," "Scenius," "ambassadors," "partners," or "roster"). Internal type names like `CommittedVoice` / `COMMITTED_VOICES` in `src/lib/committed-voices.ts` stay as-is.
- Movement-leader pages (`/movement-leaders`, `/who-is-a-movement-leader`) remain, but frame as **definition + practitioner fit** — not as a parallel audience funnel.
- No recruiting / roster-growth surfaces. `/voices` is trust and ecosystem proof, never a "nominate a leader" form.

Read that doc before writing IA, nav, home-page proof bands, audience hubs, or any copy that references movement leaders.

## Important constraints

- **pnpm only** — never `npm` or `yarn`
- **Schema is source of truth** — never modify Drizzle schema for UI convenience
- **No hardcoded tenant strings** in components — use tokens and (once added) a tenant config
- **No direct commits to `main`** — use `slice/Sxx-<description>` branch naming once the repo is tracked
