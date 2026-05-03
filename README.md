# movemental

System interface for missional movement. Fresh build of the Movemental organizational site.

The canonical design spec is [docs/design/DESIGN.md](docs/design/DESIGN.md). The repo conventions, architecture, and Claude guidance live in [CLAUDE.md](CLAUDE.md).

## Stack

- Next.js 16 (App Router, Turbopack, React 19 Server Components)
- TypeScript (strict)
- Tailwind CSS v4 + shadcn/ui (`radix-nova`) + Radix + Lucide
- Supabase (`@supabase/ssr` + `@supabase/supabase-js`)
- Drizzle ORM + `postgres` + `drizzle-zod`
- Zod 4, TanStack Query v5, React Hook Form
- Vercel (Fluid Compute)

## Getting started

```bash
pnpm install
vercel link                          # link to the Vercel project
vercel env pull .env.local --yes     # pull environment variables (or use shared merge below)
pnpm check:env                       # sanity-check required keys
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

**Josh’s shared env (`~/Desktop/Dev/.env.shared`):** merge into `.env.local`, then push the same movemental-scoped keys to the linked Vercel project:

```bash
pnpm env:local-from-shared   # writes/updates .env.local from shared file
pnpm vercel:env:sync         # npx vercel env add … for production, preview, development
```

If you don't have Vercel linked yet, copy `.env.local.example` → `.env.local` and fill in values manually.

## Scripts

- `pnpm dev` — Dev server (Turbopack, default in Next 16)
- `pnpm build` — Production build
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm lint` — ESLint
- `pnpm drizzle:gen` — Generate Drizzle migrations
- `pnpm drizzle:push` — Push schema to the database
- `pnpm db:studio` — Open Drizzle Studio
- `pnpm check:env` — Validate `.env.local` has required keys
- `pnpm env:local-from-shared` — Merge `~/Desktop/Dev/.env.shared` into `.env.local`
- `pnpm vercel:env:sync` — Push merged keys to Vercel (`vercel link` required)

## Directory highlights

```text
proxy.ts                 # Next 16 request middleware (Supabase session refresh)
drizzle.config.ts
src/
  app/                   # App Router
  components/ui/         # shadcn components (do not hand-edit)
  lib/
    env.ts               # Zod-validated environment
    supabase/            # Supabase clients (browser / server / middleware)
    db/                  # Drizzle client + schema
docs/design/DESIGN.md    # Canonical design spec
.claude/skills/          # 228 Claude skills (symlinked from alan-hirsch + my-skills)
```

## Deploy

Deploys to Vercel via the Git integration. Preview deployments on PRs; production on `main`. See [CLAUDE.md](CLAUDE.md) for conventions.
