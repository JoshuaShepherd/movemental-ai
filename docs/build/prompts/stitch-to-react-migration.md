# Prompt: Stitch → React / Next.js / Tailwind Migration

> **How to run this:** Paste the entire prompt into Claude Code inside the `movemental` repo (or invoke with `@docs/build/prompts/stitch-to-react-migration.md`). Do **not** skip the preflight section — it gates every downstream step.

---

## 1. Mission

You are building the movemental organizational site **from scratch** by translating screens from a single Stitch project into a production React + Next.js 16 + Tailwind v4 + shadcn/ui component system. The repo already has:

- Next.js 16 + React 19 + TypeScript scaffolded
- Tailwind v4 installed (no tailwind.config.ts — uses `@theme` in `src/app/globals.css`)
- shadcn/ui initialized (`radix-nova` style, components.json at root)
- Supabase clients, Drizzle, TanStack Query provider, env schema, proxy.ts
- `src/lib/utils.ts` with `cn()`
- `src/components/ui/button.tsx` (the only shadcn component installed so far)
- `src/app/providers.tsx` (React Query provider)

What it **does not** have — and what you are building in this task:

- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- Any routed pages beyond the root
- Any domain components

**You are rebuilding these files and all of `src/app/` and `src/components/` from scratch using only the Stitch templates in project `2208910962065880866`.** No improvisation, no stock "hero + features" template, no Lorem ipsum. Every visible pixel must trace back to a Stitch screen.

## 2. Non-negotiables (read before doing anything)

1. **Design source of truth is [docs/design/DESIGN.md](../../design/DESIGN.md).** If a Stitch screen's raw output contradicts DESIGN.md, DESIGN.md wins — translate the Stitch layout into the DESIGN.md token system.
2. **Stitch source of truth is [docs/build/stitch-project.md](../stitch-project.md).** Only project ID `2208910962065880866`. Never another project, never `list_projects`.
3. **No 1px solid borders for sectioning.** DESIGN.md section 3.1 forbids them. Replace any `border` / `border-b` separators in the Stitch HTML with surface shifts (`bg-background` on `bg-section`, etc.).
4. **No hardcoded hex or raw Tailwind color utilities** (`bg-blue-600`, `text-gray-500`, `#ffffff`) in any component. Only semantic tokens defined in `globals.css`. The Stitch output will contain raw hex and `bg-[#f7f9fb]` — translate every single one via the table in §7.
5. **No decorative drop shadows.** Use "Ghost Lift" (tonal stacking) or the ambient shadow `0 12px 40px rgba(42, 52, 57, 0.06)` token defined as `shadow-ambient`. Nothing else.
6. **Inter font only**, loaded via `next/font/google`. No CDN links.
7. **Server Components by default.** Only add `"use client"` to the leaves that actually need interactivity (forms, dropdowns, state). Never to layout.tsx or page.tsx.
8. **Next 16 conventions.** Middleware is `proxy.ts` at repo root (already exists). Params to Server Components arrive as `props.params` — use `useParams()` only inside client leaves.
9. **pnpm only.** Never `npm`/`yarn`.
10. **Strict TypeScript.** `pnpm typecheck` must pass at every commit boundary.

## 3. Preflight (STOP if any step fails)

Run these in order. If any check fails, report the failure and stop — do not proceed to migration.

```bash
# Working dir
pwd                              # must end in /movemental

# Toolchain
pnpm --version                   # >= 10
node --version                   # >= 20

# Dependencies (already installed, but verify)
pnpm list next react tailwindcss @supabase/ssr drizzle-orm zod \
  @tanstack/react-query class-variance-authority lucide-react 2>&1 | grep -E "next|react|tailwind"

# Current src/app state — MUST be nearly empty
ls src/app                       # expect: favicon.ico, providers.tsx
```

Then verify the Stitch MCP is reachable:

```bash
claude mcp list | grep -i stitch   # must show: ✓ Connected
```

Then pull the canonical screen list:

```ts
// Use the Stitch MCP tool directly
mcp__stitch__list_screens({ projectId: "2208910962065880866" })
```

Write the screen list into [docs/build/stitch-screens.md](../stitch-screens.md) as a checklist (one line per screen, with Stitch screen ID and display title). That file becomes your work log — tick each screen as its components land.

## 4. Build order (strict)

Do **not** start with pages. Build bottom-up so the foundation is settled before any screen composition:

1. **Tokens** → `src/app/globals.css`
2. **Root layout** → `src/app/layout.tsx`
3. **shadcn base components** (only what's needed: `button`, `card`, `input`, `label`, `separator`, `sheet`, `dialog`, `dropdown-menu`, `navigation-menu` — add via `pnpm dlx shadcn@latest add <name>`) and **theme overrides** so they match DESIGN.md
4. **Shared primitives** (container, section, eyebrow/label, display heading, body prose) under `src/components/primitives/`
5. **Navigation chrome** (top nav, footer) under `src/components/nav/` — derived from the Stitch navigation screen(s)
6. **Page-level screens** → `src/app/<route>/page.tsx`, one per Stitch screen
7. **Domain sections** extracted out of page files into `src/components/sections/` as they recur across pages

After each of steps 1–3 land, run `pnpm typecheck` and `pnpm build`. After each page, run `pnpm typecheck` and visually verify in `pnpm dev`.

## 5. Step 1 — `src/app/globals.css`

Create this file to declare the DESIGN.md token system inside Tailwind v4's `@theme` directive. Use CSS variables so shadcn's OKLCH-based components can consume them. Values below are the ones defined in DESIGN.md; **inferred** values are marked with a comment — pick a sensible neighbor on the same ramp.

Structure the file as:

1. `@import "tailwindcss";`
2. `@import "tw-animate-css";`
3. `@import "shadcn/tailwind.css";`
4. `@custom-variant dark (&:is(.dark *));` (kept for shadcn compatibility even though we don't ship a dark mode yet)
5. `@theme inline { ... }` — maps `--color-*` theme vars to CSS vars
6. `:root { ... }` — the canonical MD3 palette
7. `@layer base { ... }` — body font, default text color, link underline, selection color

Required tokens (derive CSS var names verbatim so Stitch translation is mechanical):

| Token (CSS var)         | Value                               | Source                  |
| ----------------------- | ----------------------------------- | ----------------------- |
| `--background`          | `#f7f9fb`                           | DESIGN.md section 3.1 (`surface`) |
| `--foreground`          | `#2a3439`                           | inferred `on_surface`   |
| `--section`             | `#f0f4f7`                           | `surface_container_low` |
| `--card`                | `#ffffff`                           | `surface_container_lowest` |
| `--card-foreground`     | `#2a3439`                           | inferred `on_surface`   |
| `--elevated`            | `#e1e9ee`                           | `surface_container_high` |
| `--surface-highest`     | `#d7dfe5`                           | inferred `surface_container_highest` |
| `--muted`               | `#f0f4f7`                           | alias of `section`      |
| `--muted-foreground`    | `#566166`                           | `on_surface_variant`    |
| `--primary`             | `#0053db`                           | DESIGN.md section 3.2 |
| `--primary-dim`         | `#0048c1`                           | DESIGN.md section 3.2 |
| `--primary-foreground`  | `#ffffff`                           | `on_primary`            |
| `--secondary`           | `#e1e9ee`                           | alias of `elevated`     |
| `--secondary-foreground`| `#2a3439`                           | `on_surface`            |
| `--accent`              | `#e1e9ee`                           | alias of `elevated`     |
| `--accent-foreground`   | `#2a3439`                           | `on_surface`            |
| `--destructive`         | `#ba1a1a`                           | inferred, MD3 standard  |
| `--border`              | `rgba(169, 180, 185, 0.15)`         | `outline_variant` @ 15% |
| `--input`               | `#d7dfe5`                           | `surface_container_highest` |
| `--ring`                | `rgba(0, 83, 219, 0.2)`             | `primary` @ 20%         |
| `--popover`             | `#ffffff`                           | `surface_container_lowest` |
| `--popover-foreground`  | `#2a3439`                           | `on_surface`            |
| `--inverse-surface`     | `#101820`                           | DESIGN.md sections 1 and 3 ("Midnight") |
| `--inverse-foreground`  | `#f7f9fb`                           | inferred                |
| `--outline`             | `#a9b4b9`                           | `outline_variant`       |
| `--radius`              | `0.375rem` (md)                     | DESIGN.md section 3.5   |

Also define:

- `--shadow-ambient: 0 12px 40px rgba(42, 52, 57, 0.06);`
- `--gradient-primary: linear-gradient(135deg, var(--primary) 0%, var(--primary-dim) 100%);`
- Layout tokens (custom, for the migration): `--container-max: 1200px;`, `--prose-max: 680px;`, `--section-y-sm: 80px;`, `--section-y-lg: 120px;`

In `@theme inline`, surface every token as a color (`--color-background: var(--background);` etc.) so Tailwind generates `bg-background`, `text-foreground`, `bg-card`, `bg-section`, `bg-elevated`, `bg-inverse-surface`, `text-inverse-foreground`, `bg-primary`, `shadow-ambient`, etc.

In `@layer base`:

- `html { @apply font-sans; color-scheme: light; }`
- `body { @apply bg-background text-foreground antialiased; }`
- `::selection { background-color: var(--primary); color: var(--primary-foreground); }`
- Heading defaults: `h1, h2, h3, h4 { @apply text-foreground tracking-tight; }`
- `h1` gets `letter-spacing: -0.02em` (display tracking rule from DESIGN.md section 5)

Do **not** add any component-level CSS. Everything else goes in React components.

## 6. Step 2 — `src/app/layout.tsx`

Rebuild the root layout:

```tsx
// pseudocode — you write the real thing
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "Movemental", template: "%s — Movemental" },
  description: /* pull the real tagline from the hero screen in Stitch */,
  metadataBase: new URL("https://movemental.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

**Rules:**

- No `className="dark"` on `<html>`. DESIGN.md is light-primary with a dark hero; dark sections are scoped to components, not the whole document.
- Keep `<Providers>` wrapping — it's already written and exports `QueryClientProvider`.
- Pull `metadata.description` from the actual hero copy in the Stitch landing screen, not a guess.
- Do **not** add nav/footer here. Those live in route group layouts (see §8).

## 7. Stitch → DESIGN.md translation table

Stitch's HTML output almost always uses Tailwind arbitrary values with raw hex. Translate mechanically — never leave a raw hex in a committed file.

| Stitch class (common)           | Replace with                                          |
| ------------------------------- | ----------------------------------------------------- |
| `bg-white`                      | `bg-card` (when it's a card) or `bg-popover`          |
| `bg-[#ffffff]`                  | `bg-card` or `bg-popover`                             |
| `bg-[#f7f9fb]`                  | `bg-background`                                       |
| `bg-[#f0f4f7]`                  | `bg-section` or `bg-muted`                            |
| `bg-[#e1e9ee]`                  | `bg-elevated` or `bg-secondary`                       |
| `bg-[#0053db]`, `bg-blue-600`   | `bg-primary`                                          |
| `bg-[#0048c1]`                  | `bg-primary-dim`                                      |
| `bg-[#101820]`, `bg-black`      | `bg-inverse-surface`                                  |
| `text-black`, `text-[#000]`     | `text-foreground` (never use pure black)              |
| `text-[#2a3439]`                | `text-foreground`                                     |
| `text-[#566166]`, `text-gray-500` | `text-muted-foreground`                             |
| `text-white` (on dark sections) | `text-inverse-foreground`                             |
| `text-[#0053db]`                | `text-primary`                                        |
| `border`, `border-b`, `divide-y` **(decorative)** | remove entirely; use `bg-section` / vertical spacing |
| `border` **(form accessibility)** | keep; use `border-border`                           |
| `shadow`, `shadow-md`, `shadow-lg` | `shadow-ambient` (or remove if it's a card — use tonal stacking) |
| `rounded`, `rounded-md`         | `rounded-md` (`0.375rem`, matches `--radius`)         |
| `rounded-full` on chips         | keep — DESIGN.md section 12 (chips / tags)           |
| `font-sans`                     | keep — Inter is bound to `--font-sans`                |
| Arbitrary tracking `tracking-[-0.02em]` on display | keep for h1 hero only                |

If you see a hex not in this table, **stop and check the ramp**. `#e9eef2`-ish → `surface_container` (between `low` and `high`) — alias to `--section`. Anything outside the ramp: ask before using.

## 8. Route & component placement rules

The Stitch project contains both **pages** and **reusable fragments**. Decide which is which before writing a file:

- **Page** — the Stitch screen title looks like a URL destination ("Home", "About", "Contact", "Learn", "Podcast", "Courses"). Output goes to `src/app/<slug>/page.tsx` (or `src/app/page.tsx` for home). No nav/footer in `page.tsx` — those belong to a layout.
- **Fragment** — the Stitch screen is a modal, drawer, card grid, or reusable hero. Output goes to `src/components/sections/<kebab-name>.tsx`.

Route group layout: if multiple pages share the same nav/footer (virtually always true for marketing surfaces), create `src/app/(site)/layout.tsx` that renders `<SiteNav />`, `{children}`, `<SiteFooter />`, and move page files under `src/app/(site)/...`. Keep the root `src/app/layout.tsx` chrome-free.

**Directory plan:**

```text
src/
  app/
    layout.tsx                       # chrome-free root
    page.tsx                         # OR move under (site)/ if site layout exists
    (site)/
      layout.tsx                     # nav + footer
      page.tsx                       # home
      about/page.tsx
      ...
  components/
    primitives/
      container.tsx                  # max-w wrapper with --container-max
      section.tsx                    # vertical rhythm wrapper
      eyebrow.tsx                    # uppercase label per DESIGN.md section 5
      display.tsx                    # hero-scale heading
      prose.tsx                      # long-form reader width
    nav/
      site-nav.tsx
      site-footer.tsx
      mobile-nav.tsx
    sections/
      <one-file-per-recurring-section>.tsx
    ui/                              # shadcn (already exists) — do not hand-edit
```

## 9. Per-screen migration workflow (repeat for each screen)

For every screen in the list from §3:

1. **Fetch the screen** via `mcp__stitch__get_screen({ name: "projects/2208910962065880866/screens/<ID>" })`. Save the raw HTML to `docs/build/_stitch-raw/<screen-id>.html` (gitignored — add `/docs/build/_stitch-raw/` to `.gitignore` once on first fetch).
2. **Read DESIGN.md again** with the screen open alongside. Spot any conflicts up front (borders, shadows, pure black, etc.).
3. **Outline the component tree** in a short comment at the top of the target `.tsx` file before writing JSX. Example:

   ```tsx
   // Stitch screen: "Home" (projects/2208910962065880866/screens/abc)
   // Tree:
   //   <Section variant="midnight">       -- hero, inverse_surface
   //     <Container>
   //       <Eyebrow /> <Display /> <Prose /> <CTA row />
   //   <Section>                          -- features grid
   //     <Container><CardGrid items={...} />
   //   <Section variant="elevated">       -- testimonial strip
   ```

4. **Translate** HTML → JSX, mechanically applying the §7 table. Any class that doesn't map cleanly → stop and resolve.
5. **Split**: if a block is >120 lines or appears in more than one screen, extract it to `src/components/sections/`.
6. **Classify**: does this node need state/effects/event handlers?
   - **No** → Server Component. No `"use client"`. Pass data in as props.
   - **Yes** → push the interactive subtree into a client leaf (e.g., `mobile-nav.tsx`), keep the parent server.
7. **Accessibility sweep** — every `<img>` → `next/image` with `alt`; decorative icons get `aria-hidden`; nav landmarks use `<nav>`; headings are in order; buttons use `<Button>` from shadcn, not raw `<button>` for styling.
8. **Type check** — `pnpm typecheck`. Zero errors.
9. **Visual check** — `pnpm dev`, open the route, compare side-by-side with the Stitch screenshot from the web UI. Tonal layering should match (light body, midnight hero, etc.). Grab console errors.
10. **Commit** — one screen per commit, message: `feat(site): migrate <screen-name> from stitch <screen-id>`. Tick the screen off in [docs/build/stitch-screens.md](../stitch-screens.md).

## 10. shadcn components — only what you need, theme-corrected

Run `pnpm dlx shadcn@latest add <name>` one at a time. Expected list for this migration:

- `button`, `card`, `input`, `label`, `textarea`, `separator`, `sheet`, `dialog`, `dropdown-menu`, `navigation-menu`, `accordion`, `tabs`, `avatar`

After adding each component, audit its generated TSX for:

- Raw `border-*`/`shadow-*` utilities that violate DESIGN.md → replace with token-aware variants or remove.
- Rounded-corner defaults — most shadcn components use `rounded-lg` or `rounded-md`; keep as-is unless DESIGN.md section 3.5 / 12 specify otherwise (chips → `rounded-full`, inputs → `rounded` (`0.25rem`)).
- Focus ring — should use `ring-ring` and `--ring` is already set to `primary` @ 20%. No further work needed.

Do **not** hand-edit `src/components/ui/*` for visual tweaks. Either extend via props/variants in a wrapper under `src/components/primitives/`, or override via token changes in `globals.css`.

## 11. Validation checklist (run before every commit)

- [ ] `pnpm typecheck` — zero errors
- [ ] `pnpm lint` — zero errors
- [ ] `pnpm build` — completes without warnings (workspace-root warning is acceptable only if pre-existing)
- [ ] No raw hex in any `src/**/*.{ts,tsx,css}` except `src/app/globals.css`
- [ ] No `bg-white`, `bg-black`, `text-black`, `text-white`, `bg-gray-*`, `text-gray-*` anywhere outside `globals.css` (allow `text-white` **only** inside an explicitly-labelled `variant="midnight"` Section wrapper, and even then prefer `text-inverse-foreground`)
- [ ] No `border` / `border-b` / `divide-y` used for section separation (forms and input fields are the only legitimate users of `border`)
- [ ] No `shadow-sm`/`shadow-md`/`shadow-lg` — only `shadow-ambient` or tonal stacking
- [ ] All images go through `next/image` with explicit `width`/`height` or `fill`
- [ ] No `"use client"` in `layout.tsx`, `page.tsx`, or any `src/app/**/layout.tsx`
- [ ] Every screen migrated is ticked in [docs/build/stitch-screens.md](../stitch-screens.md)

## 12. Handling unknowns / asking for help

The Stitch output will contain things that don't fit the rules. Expected cases and what to do:

- **Screen uses a color not on the DESIGN.md ramp.** Stop. Post the hex in chat. Do not guess.
- **Screen uses a gradient that isn't the `primary → primary_dim` CTA gradient.** Stop — DESIGN.md section 3.2 restricts gradients.
- **Screen has a dashboard / chart / metrics block.** Translate faithfully using `bg-elevated` surfaces and `shadow-ambient` for floaters (DESIGN.md sections 3.4 and 12).
- **Screen depends on an asset (image, video, font) not in the repo.** Write the asset path as a TODO comment and a missing-asset note in [docs/build/stitch-screens.md](../stitch-screens.md). Do not substitute with Unsplash or stock art.
- **Multiple Stitch screens contradict each other on the same component.** The latest `updateTime` wins; log the decision in the commit message.

If you're in doubt for more than a minute, **stop and ask**. Undoing a bad migration pass is more expensive than a quick clarification.

## 13. Definition of done

The migration is complete when:

1. Every screen from `list_screens({ projectId: "2208910962065880866" })` appears as a checked item in [docs/build/stitch-screens.md](../stitch-screens.md).
2. `pnpm build` completes clean and `pnpm start` serves every route.
3. Every page visually matches its Stitch source when opened side-by-side (tolerances: font kerning, sub-pixel spacing, hover micro-animations).
4. The validation checklist in §11 passes with no exemptions.
5. A final commit `docs(build): close out stitch migration` updates [docs/build/stitch-screens.md](../stitch-screens.md) with completion date and any follow-up TODOs.

Only after all five conditions are met is the migration considered landed. Until then, the repo is in "migration in progress" state and the only acceptable work is more migration.
