# Next.js / Tailwind setup remediation

**Status:** audit complete — remediation not yet applied
**Audited:** 2026-06-13 · against Next 16.2.3, React 19.2.4, Tailwind v4, ESLint 9, Vitest 4
**Scope:** project & site structure + build/tooling config + Tailwind setup. Not a design-token or copy audit (see [docs/design/INK_BAND_DESIGN_CHAIN.md](../../design/INK_BAND_DESIGN_CHAIN.md) and the `tailwind-cleanup` / `design-audit` skills for those).

---

## TL;DR

The repo has **three pairs of duplicate config files**, and in every case the *stale initial-commit copy wins resolution and shadows the newer, intended one*:

| Pair | Active (wins) | Shadowed (dead) | Consequence |
|------|---------------|-----------------|-------------|
| Next config | [next.config.mjs](../../../next.config.mjs) (2026-03-08) | [next.config.ts](../../../next.config.ts) (2026-06-10) | Turbopack root pin, `serverExternalPackages`, all `/agent`-era redirects, `/onboarding` rewrites, and `images.remotePatterns` **never load** |
| Vitest config | [vitest.config.ts](../../../vitest.config.ts) (2026-03-08) | [vitest.config.mts](../../../vitest.config.mts) (2026-06-11) | Tests run with the wrong alias + glob; Playwright e2e specs get swept into the Vitest run |
| ESLint config | [eslint.config.mjs](../../../eslint.config.mjs) (flat) | [.eslintrc.json](../../../.eslintrc.json) (legacy) | Harmless but confusing; legacy file is ignored by ESLint 9 |

These are not style nits — the Next.js one has **live runtime and routing impact today**. Fixing the three shadowing pairs is the bulk of the work. Tailwind setup is sound but carries a removable v3-era JS config. The rest is repo hygiene.

Recommended order: **P0 (config shadowing) → P1 (route duplication that P0 unmasks) → P2 (Tailwind consolidation) → P3 (hygiene).**

---

## P0 — Duplicate config files (the stale copy wins)

### P0.1 — `next.config.mjs` shadows `next.config.ts` 🔴 highest impact

**What's happening.** Next 16 resolves config from a fixed precedence list and loads the **first** match:

```js
// node_modules/next/dist/shared/lib/constants.js
const CONFIG_FILES = ['next.config.js', 'next.config.mjs', 'next.config.ts', ...]
```

Both [next.config.mjs](../../../next.config.mjs) and [next.config.ts](../../../next.config.ts) exist, so **`.mjs` always wins** and `.ts` is never loaded. The two files are *not* merged.

The active `.mjs` is from the initial commit (2026-03-08) and contains only `reactStrictMode` + the `/templates/*` redirects. The shadowed `.ts` is the current, maintained config (2026-06-10) and is the only place the following are declared — **all of which are silently inactive right now:**

- `turbopack.root` workspace-root pin (prevents Turbopack walking up to a parent lockfile)
- `serverExternalPackages: ["postgres", "drizzle-orm", "@supabase/ssr", "sharp"]` — without this, native/server modules can be pulled into the client bundle
- `images.remotePatterns` for `lh3.googleusercontent.com` and `*.supabase.co` — **`next/image` with those hosts will throw `hostname not configured` at runtime**
- `rewrites()` mapping `/onboarding/:step` → `/dashboard/onboarding/:step`
- the entire 2026-06 "agent-first" redirect table (dozens of legacy routes → `/agent`, `/field-guide`, `/enroll`)

**Remediation — make `next.config.ts` the single source, delete `.mjs`:**

1. Port the still-needed `/templates/*` redirects from `.mjs` into `.ts`. **These are live** — `public/templates/library/` exists and is served via those redirects, so they must not be lost. Merge them into the `redirects()` array already in `.ts`.
2. Confirm `reactStrictMode: true` is set in `.ts` (the `.mjs` had it; `.ts` currently does not — add it).
3. Delete `next.config.mjs`:
   ```bash
   git rm next.config.mjs
   ```
4. Verify with `pnpm build` and by hitting a redirect (`/about` should 308 → `/agent`) and an image from Supabase storage.

> ⚠️ Do **not** simply delete `.ts` to keep the simpler `.mjs` — `.mjs` is the stale one and is missing every change made since March.

### P0.2 — `vitest.config.ts` shadows `vitest.config.mts` 🟠

**What's happening.** Vitest resolves `vitest.config.*` with `.ts` ahead of `.mts`. Verified empirically: `npx vitest list` loads the broad-glob legacy config and warns about `test.describe()` calls in `tests/e2e/agent-room.spec.ts` — i.e. it is **sweeping Playwright e2e specs into the Vitest run.**

The two configs disagree materially:

| | [vitest.config.ts](../../../vitest.config.ts) (active, stale) | [vitest.config.mts](../../../vitest.config.mts) (shadowed, canonical) |
|---|---|---|
| `@` alias | `./` (repo root) | `./src` ✅ |
| `include` | `**/*.{test,spec}.ts` (catches e2e) | `src/**` + `tests/unit/**` ✅ |
| `globals` | `true` | `false` ✅ |

[CLAUDE.md](../../../CLAUDE.md) explicitly names `vitest.config.mts` as *the* config — so the active file is the wrong one.

**Remediation:**
```bash
git rm vitest.config.ts
```
Then run `pnpm test:run` and confirm e2e specs are no longer collected and the `@ → src` alias resolves. (Playwright is configured separately in [playwright.config.ts](../../../playwright.config.ts).)

### P0.3 — `.eslintrc.json` alongside flat `eslint.config.mjs` 🟡

ESLint 9 + `eslint-config-next@16` use the **flat** config ([eslint.config.mjs](../../../eslint.config.mjs)). The legacy [.eslintrc.json](../../../.eslintrc.json) (`{ "extends": "next/core-web-vitals" }`) is ignored unless `ESLINT_USE_FLAT_CONFIG=false`. Harmless but misleading.

**Remediation:**
```bash
git rm .eslintrc.json
```

---

## P1 — Route duplication unmasked by P0.1 🟠

Because the agent-first redirects live only in the **dead** `next.config.ts`, the old top-level marketing routes are still reachable *and* duplicate their `/agent/*` equivalents:

| Live top-level route | Intended redirect (currently dead) | Duplicate of |
|---|---|---|
| [src/app/about/](../../../src/app/about/) | → `/agent` | `src/app/agent/about/` |
| [src/app/churches/](../../../src/app/churches/) | → `/agent` | `src/app/agent/churches/` |
| [src/app/nonprofits/](../../../src/app/nonprofits/) | → `/agent` | `src/app/agent/nonprofits/` |
| [src/app/institutions/](../../../src/app/institutions/) | → `/agent` | `src/app/agent/institutions/` |

Both copies render today. This is a direct downstream effect of P0.1.

**Remediation (do *after* P0.1 so behavior is observable):**
1. Once `next.config.ts` is the live config, decide per route whether the canonical page is the top-level one or the `/agent/*` one. Per [CLAUDE.md](../../../CLAUDE.md), the repo is **agent-only** — the `/agent/*` surface should win.
2. Delete the orphaned top-level route folders whose redirects now fire, or move them under `_archive/` consistent with the existing `pre-marketing-migration-2026-06` archive convention.
3. Reconcile [CLAUDE.md](../../../CLAUDE.md): it documents live route groups as `(paper)`, `(studio)`, `agent`, but `src/app/` has **no `(paper)` group** and many ungrouped top-level routes. Update the doc to match reality (or restructure to match the doc).

---

## P2 — Tailwind v4 setup (works, but carries a v3-era JS config) 🟡

The Tailwind v4 wiring is otherwise correct: `@import "tailwindcss"` + `@tailwindcss/postcss` in [postcss.config.mjs](../../../postcss.config.mjs), tokens defined CSS-first via `@theme inline` in [src/app/globals.css](../../../src/app/globals.css), no `tailwind.config` reference in [components.json](../../../components.json). Good.

The one deviation: [globals.css](../../../src/app/globals.css) pulls a **v3-style JS config** back in via `@config "../../tailwind.config.ts"`, and [tailwind.config.ts](../../../tailwind.config.ts) **re-declares tokens that already live in `@theme`**:

- `content: [...]` globs — **redundant in v4** (automatic content detection covers `./src/**`); `@config` re-enables manual scanning unnecessarily.
- `fontFamily.sans` / `fontFamily.mono` — already defined as `--font-sans` / `--font-mono` in `@theme inline`. Declaring both is a divergence risk.
- `borderRadius.pill`, `maxWidth.content/prose`, `transitionDuration.fast`, `transitionTimingFunction.out` — all duplicate `--radius-pill`, `--container-max`, `--prose-max`, `--duration-fast`, `--ease-out` already in `@theme`.
- `fontFamily.display` → `--font-ink-display-face` is the **only** thing the JS config adds that isn't in `@theme` (there is no `--font-display` token).

**Remediation — consolidate to pure CSS-first v4:**
1. Add the missing display key to `@theme inline` in `globals.css`:
   ```css
   --font-display: var(--font-ink-display-face), "Playfair Display", Georgia, serif;
   ```
   (mirrors the existing `--font-sans` / `--font-mono` pattern; gives a real `font-display` utility).
2. Confirm `--radius-pill`, `--container-max`, `--prose-max`, `--duration-fast`, `--ease-out` cover every utility the JS config provided (they do).
3. Remove the `@config "../../tailwind.config.ts";` line from `globals.css`.
4. Delete the JS config:
   ```bash
   git rm tailwind.config.ts
   ```
5. `pnpm build` and spot-check `font-display`, `max-w-content`, `max-w-prose`, `rounded-pill`, `duration-fast`, `ease-out` still resolve.

> If you prefer to keep a JS config for tooling familiarity, the minimum fix is to **delete the `content` array** (auto-detected in v4) and the keys that duplicate `@theme`, leaving only genuinely JS-only additions — but full removal is cleaner and is the v4-recommended path.

---

## P3 — Repo hygiene 🟢

Lower-risk cleanups; none block builds.

1. **Stale agent guidance.** [AGENTS.md](../../../AGENTS.md) points sibling skills at `~/Desktop/dev/repos/movemental-sites/alan-hirsch`, but this session's working dirs use `/home/josh/dev/01-Movemental-Core/alan-hirsch`. Reconcile with the path in [CLAUDE.md](../../../CLAUDE.md).
2. **Root-level stray docs/scripts** tracked at repo root: [PERFECT-SINGLE-PAGE-PROMPT.md](../../../PERFECT-SINGLE-PAGE-PROMPT.md), [credibility-how-it-works.md](../../../credibility-how-it-works.md), `credibility-how-it-works-video.md`, `guide-ai-credibility-2026.md`, [aggregate-images.sh](../../../aggregate-images.sh). Move under `docs/` / `scripts/` or `_archive/`.
3. **Legacy Cursor config.** `.cursorrules` (36 KB) and `.cursorignore` are tracked. Keep only if Cursor is still in use; otherwise remove.
4. **`tsconfig.tsbuildinfo` (~4 MB) sits in the working tree.** It is correctly git-ignored (`*.tsbuildinfo`), so no action needed beyond awareness — do not commit it.
5. **shadcn `ui/` has a single component** ([button.tsx](../../../src/components/ui/button.tsx)) for 160 component files. Expected for an Ink-Band-only surface, but worth confirming nothing references un-added shadcn primitives.

---

## Remediation sequence (copy-paste checklist)

```bash
# P0.1 — Next config: port /templates redirects + reactStrictMode INTO next.config.ts first, then:
git rm next.config.mjs

# P0.2 — Vitest: keep the canonical .mts
git rm vitest.config.ts

# P0.3 — ESLint: drop legacy config
git rm .eslintrc.json

# P2 — Tailwind: add --font-display to @theme, drop @config line in globals.css, then:
git rm tailwind.config.ts

# Verify
pnpm typecheck
pnpm lint
pnpm test:run            # e2e specs should no longer be collected
pnpm build               # confirm redirects (/about -> /agent), next/image hosts, font-display utility
pnpm test:e2e            # Playwright still runs independently
```

Then handle **P1** (delete/archive the now-redirected duplicate top-level routes) and reconcile **CLAUDE.md / AGENTS.md** to the real tree.

## Verification checklist

- [ ] `next.config.ts` is the only Next config; `/about` returns 308 → `/agent`; a Supabase-hosted `next/image` renders without `hostname not configured`.
- [ ] `pnpm test:run` collects only `src/**` + `tests/unit/**`; no `test.describe()` warnings from `tests/e2e/`.
- [ ] `pnpm lint` passes with flat config only.
- [ ] `font-display`, `max-w-content`, `max-w-prose`, `rounded-pill`, `duration-fast`, `ease-out` still resolve after `tailwind.config.ts` removal.
- [ ] No duplicate marketing routes reachable; CLAUDE.md route-group list matches `src/app/`.
```
