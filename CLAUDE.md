# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the **movemental** organizational site repo.

## What this repo is

Movemental is the organizational site for Movemental — a fresh build from scratch. It runs **two design systems, by surface**, both documented as a charter + layer-by-layer chain (tokens → primitives → components → built layers → pages):

- **Concept Modern** — [docs/design/DESIGN.md](docs/design/DESIGN.md) — the **marketing site** (warm cream paper, near-black ink, Inter + Newsreader italic emphasis, ink-pill CTAs, Midnight bands).
- **Ink Band** — [docs/design/INK_BAND_DESIGN_CHAIN.md](docs/design/INK_BAND_DESIGN_CHAIN.md) — the **agent room** (`/agent`, `.oat-surface`): warm paper sheet, Playfair + Caveat + IBM Plex Mono, ink-blue pen accent. Transcribed from the `movemental-agentic-front-end` prototype.

Index: [docs/design/README.md](docs/design/README.md). Keep the two separated — Ink Band tokens must not leak onto marketing pages. The data-side companion is [docs/architecture/TYPE_SAFETY_CHAIN.md](docs/architecture/TYPE_SAFETY_CHAIN.md).

### Current state: marketing migration in flight

The core shell (`globals.css`, `layout.tsx`) is built and the design tokens are canonical. The repo is mid-pivot toward the **paper / agentic** surfaces: live route groups are `(paper)`, `(studio)`, and `agent`. The earlier `(site)` marketing route group and its `nav/` + `sections/` components are archived under `_archive/pre-marketing-migration-2026-06/`. The editorial **primitives** (`src/components/primitives/`) remain live and are the basis for new pages.

New pages and components should still follow [docs/build/prompts/stitch-to-react-migration.md](docs/build/prompts/stitch-to-react-migration.md) — it is the authoritative way to translate Stitch screens into React. Do not improvise layouts, paste marketing templates, or substitute stock imagery.

### Stitch project pin

The **only** Stitch project that informs this repo is `2208910962065880866`. See [docs/build/stitch-project.md](docs/build/stitch-project.md) for access patterns and scope guardrails. Never call `mcp__stitch__list_projects` during normal work — go straight to `mcp__stitch__list_screens({ projectId: "2208910962065880866" })`.

### Sibling repos (read-only references)

Available via `.claude/settings.json` → `additionalDirectories`:

- `/home/josh/dev/01-Movemental-Core/alan-hirsch` — Alan Hirsch **tenant app** (primary reference for patterns, the six-layer type chain, and symlinked skills)
- `/home/josh/dev/01-Movemental-Core/movemental-visual-editor-main` — Studio / authoring app on the same shared DB (the other canonical type-chain reference)
- `/home/josh/dev/01-Movemental-Core/movemental-agentic-front-end` — the **Ink Band** agent-room design prototype (HTML/CSS/JS); design canon for `/agent` (see [docs/design/INK_BAND_DESIGN_CHAIN.md](docs/design/INK_BAND_DESIGN_CHAIN.md))
- `/home/josh/dev/01-Movemental-Core/movemental-ai-agents` — the agent **engine** (`ai-agents` package) the agent room is wired to

Use them for *how* to structure things (conventions, patterns). Do **not** copy visual components or page content from them — movemental's design is the Stitch project + the two design-chain docs, not these siblings.

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
  architecture/
    TYPE_SAFETY_CHAIN.md       # Six-layer data chain (Drizzle→Zod→services→routes→hooks→UI)
  design/
    DESIGN.md                  # Concept Modern — marketing design charter + chain
    INK_BAND_DESIGN_CHAIN.md   # Ink Band — agent-room design charter + chain
    README.md                  # Index of the two design systems
  build/
    stitch-project.md          # Pins Stitch project 2208910962065880866
    prompts/
      stitch-to-react-migration.md   # The authoritative build prompt
src/
  app/
    globals.css                # Tailwind v4 @theme inline + :root/.dark token SSOT (Concept Modern + scoped oat-*)
    layout.tsx                 # Root layout — Inter + Newsreader + oat faces, Providers wrapper
    providers.tsx              # React Query + Theme providers (client component)
    favicon.ico
    (paper)/                   # Paper/editorial route group (e.g. home-paper)
    (studio)/                  # Studio / agent-runtime route group
    agent/                     # The agent room (.oat-surface → Ink Band design)
    # NOTE: the prior (site) marketing group + nav/sections are archived under
    #       src/components/_archive/ + _archive/pre-marketing-migration-2026-06/
  components/
    primitives/                # Editorial primitives — Section, Container, Display, Eyebrow, Prose, SurfaceCard, Reveal, …
    agent-room/                # Agent-room UI (Ink Band surface)
    providers/                 # Theme provider, etc.
    ui/                        # shadcn components (added on-demand; do not hand-edit)
    _archive/                  # Archived pre-migration marketing components (nav/, sections/)
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

### Six-layer type safety chain — mirrors the tenant apps (`alan-hirsch`, `movemental-visual-editor`)

**Full reference: [docs/architecture/TYPE_SAFETY_CHAIN.md](docs/architecture/TYPE_SAFETY_CHAIN.md)** — topology, per-layer detail, generate/validate commands, lock status, and the schema-change waterfall. This repo shares the live `movemental` Supabase DB (`vhaiiiykcukrlyvwlgip`) with both sibling repos.

Types flow **downstream only** — never import from higher layers into lower:

1. **Drizzle schema** (`src/lib/db/schema.ts`) — structure SSOT. Hand-maintained here (no `generate-schema` script); add the `pgTable` *and* a matching live-DB migration together.
2. **Zod schemas** (`src/lib/schemas/index.ts`) — types SSOT; generated from Drizzle via `drizzle-zod` (`pnpm generate:schemas`)
3. **Services** (`src/lib/services/simplified/`) — `Result<T>`, never throw; `base.service.ts` adds CRUD + `TENANT_ORG_ID` scoping. Domain logic goes in sibling folders (e.g. `services/onboarding/`), never in generated files.
4. **API routes** (`src/app/api/simplified/`) — generated CRUD backbone; hand-written product endpoints live in `api/{admin,leader,book,program,…}`
5. **React hooks** (`src/hooks/simplified/`) — TanStack Query wrappers; never raw `fetch`. Requires `QueryClientProvider` (`src/app/providers.tsx`).
6. **UI components** (`src/components/`) — consume hooks, never call APIs directly (not generated/validated in this repo)

Fix errors bottom-up: trace to the source layer and fix there first. Never modify a lower layer to satisfy an upper layer's needs. Validate with `pnpm validate:all` (per-layer locks) and `pnpm typecheck` (the real proof).

## Design system rules (Ink Band only)

This repo is **agent-only** — one design system: **Ink Band**. Canon:
[docs/design/INK_BAND_DESIGN_CHAIN.md](docs/design/INK_BAND_DESIGN_CHAIN.md). Index:
[docs/design/README.md](docs/design/README.md). Concept Modern ([DESIGN.md](docs/design/DESIGN.md)) is
archived reference for a future marketing merge; do not implement it in `src/`.

**Agent room docs index:** [docs/build/notes/agent-room-documentation-index.md](docs/build/notes/agent-room-documentation-index.md) — SSOT registry, authority order, and supersession chains before editing dock/voice/thread/Discuss docs or code.

Quick rules:

- **Scoped surface.** Agent room and utility pages wrap in `.ink-band-surface` (see `agent/layout.tsx`, `components/ink-band/utility-shell.tsx`). Tokens: `--color-ink-band-*`, `--font-ink-*`.
- **Typography.** Inter body; Playfair display headings; IBM Plex Mono labels; Caveat hand line (agent room only).
- **Accent.** Ink-blue `#22409b` for pen gestures, links, and focus — not legacy Digital Curator blue.
- **Paper depth.** Tonal stacking (`bg` → `surface` → `paper`) plus hairline borders where the prototype uses them.
- **CSS modules.** Agent UI lives in `src/components/agent-room/ink-band.module.css` — do not add Concept Modern or `oat-*` tokens.
- **Shadcn utility pages** (login, agent-runtime) use Tailwind semantic tokens mapped to the Ink Band ramp in `globals.css` `:root`.

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
