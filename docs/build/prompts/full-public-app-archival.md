# Prompt: Full archival of the current public React app

> **How to run this:** Paste the entire prompt into Claude Code inside the `movemental` repo (or invoke with `@docs/build/prompts/full-public-app-archival.md`). This prompt is the **first move** in the larger HTML-mocks → React rebuild documented in [`docs/build/prompts/mock-html-to-react-migration.md`](./mock-html-to-react-migration.md). Run this archival to a clean stop **before** touching the new build.

---

## 1. Mission

The `(site)` route group in [`src/app/(site)/`](../../../src/app/(site)) is the public-facing surface of movemental.com. It contains 26 top-level routes and several nested ones — every one of them was built ahead of the canonical Concept Modern HTML mockups in [`docs/html/`](../../html/). The mockups are now the source of truth; the existing React pages are the legacy. Before we rebuild, we archive the legacy intact so:

- nothing is lost,
- diffs against the new build remain auditable,
- API routes (`src/app/api/**`), components (`src/components/**`), services, hooks, schemas, and tests stay completely untouched,
- redirects can be staged from the legacy slugs to the new IA when the new pages land.

This prompt **archives only**. It does not delete and does not modify the new app. The next prompt — [`mock-html-to-react-migration.md`](./mock-html-to-react-migration.md) — handles the rebuild.

## 2. Non-negotiables (read before doing anything)

1. **Reversible.** Every move uses `git mv`. No `rm`, no `git rm`, no overwrites. If you need to delete a file, stop and ask.
2. **No API touches.** [`src/app/api/`](../../../src/app/api), [`src/lib/`](../../../src/lib), [`src/components/`](../../../src/components), [`src/hooks/`](../../../src/hooks), [`scripts/`](../../../scripts), [`tests/`](../../../tests), `proxy.ts`, `drizzle.config.ts`, `next.config.ts`, and any `.env*` are out of scope.
3. **Components stay where they are.** The legacy pages import from `@/components/sections/*`, `@/components/primitives/*`, `@/components/nav/*`. None of those imports break — only the `(site)` route folder moves, and it moves intact.
4. **Two known component-from-page imports must be repaired** (see §6.5):
   - [`src/components/sections/book-endorse/book-endorse-page-content.tsx`](../../../src/components/sections/book-endorse/book-endorse-page-content.tsx) imports `@/app/(site)/book/endorse/endorse-form`.
   - [`src/components/sections/book-moderate/book-moderate-page-content.tsx`](../../../src/components/sections/book-moderate/book-moderate-page-content.tsx) imports `@/app/(site)/book/moderate/moderation-forms`.
   These are the **only** known violations of the "components don't import from app/" rule. They must be relocated *before* the move (see §6.5).
5. **No new home page yet.** After archival, the root URL `/` should return Next's default 404. That is the expected state at the end of this prompt; the new home page is built in the migration prompt.
6. **No redirects yet.** Redirects from `/about`, `/contact`, etc. to the new IA will be added in the migration prompt once the new routes exist. During this archival, those slugs simply 404.
7. **One commit per archival pass.** Single `git mv` operation, single commit message: `chore(site): archive legacy public app to _archive/legacy-site-2026-04-28`.
8. **pnpm only.** No `npm`, no `yarn`.

## 3. Preflight (STOP if any step fails)

Run these in order. Any failure → stop and report.

```bash
# Working dir
pwd                                        # must end in /movemental

# Branch is clean OR every change is intentional
git status --short                         # review with the user before proceeding

# We're on a slice branch, not main
git rev-parse --abbrev-ref HEAD            # expect: slice/Sxx-archive-legacy-site
                                           # if main: stop and ask user to create a slice branch

# Toolchain
pnpm --version                             # >= 10
node --version                             # >= 20

# Inventory the route folders we are about to move (24 routes + the home page)
ls -la src/app/\(site\)
```

Confirm with the user that the inventory matches §4.

## 4. Inventory — what gets archived

The `(site)` route group as of 2026-04-28 contains **26 routes** plus shared layout/page files. Every item below moves to `_archive/legacy-site-2026-04-28/(site)/` preserving the exact folder shape.

### Route folders (24)

```text
about/                  articles/               assess/
book/                   churches/               contact/
cookies/                faq/                    fragmentation/
institutions/           methodology/            movement-leaders/
newsletter/             nonprofits/             organizations/
platform/               pricing/                privacy/
resources/              services/               system/
team/                   terms/                  voices/
who-is-a-movement-leader/
```

### Top-level files inside `(site)/`

```text
layout.tsx              # the (site) layout — passthrough today, archive intact
page.tsx                # current home page composition
```

### Nested routes (move with their parents — listed for verification)

- `articles/`: `[slug]/`, `archive/`, `canon/`, `guides/`, `methodology/`, `playbooks/`, `sandbox/`, `sandbox/[slug]/`
- `assess/`: `formation/`
- `book/`: `contributors/`, `endorse/`, `moderate/`, `read/[slug]/`, `opengraph-image.tsx`
- `methodology/`: `eight-patterns/`
- `newsletter/`: `confirmed/`, `unsubscribed/`
- `resources/`: `templates/`
- `services/`: `sandbox-season/`
- `system/`: `intel-artifacts/`
- `voices/`: `[slug]/`

### Out of scope (do **not** move)

- `src/app/api/**` — API routes stay live.
- `src/app/layout.tsx` — root layout stays. We will edit it later (see §6.6) to remove the `<SiteNav>` / `<SiteFooter>` mounts that no longer have content underneath them, but the file does **not** move.
- `src/app/providers.tsx`, `src/app/globals.css`, `src/app/favicon.ico`, `src/app/opengraph-image.tsx` — stay.
- `src/components/**`, `src/lib/**`, `src/hooks/**`, `tests/**` — stay.

## 5. Target structure

After this prompt runs, the repo gains one new top-level directory inside `src/app/`:

```text
src/app/
├── _archive/
│   └── legacy-site-2026-04-28/
│       ├── README.md                                # provenance + restore instructions
│       └── (site)/
│           ├── layout.tsx
│           ├── page.tsx
│           ├── about/
│           ├── articles/
│           ├── ... (every legacy route)
│           └── who-is-a-movement-leader/
├── api/                                             # untouched
├── favicon.ico                                      # untouched
├── globals.css                                      # untouched here; edited in the migration prompt
├── layout.tsx                                       # edited in §6.6 only
├── opengraph-image.tsx                              # untouched
└── providers.tsx                                    # untouched
```

The `_archive` underscore prefix is critical: Next.js App Router treats any path segment starting with `_` as private. Files inside `_archive/` are excluded from routing entirely, so:

- `pnpm build` does not try to compile them as pages,
- imports from inside the archive do not become live routes,
- `pnpm typecheck` still type-checks them (which catches drift if shared types change later).

## 6. Execution

### 6.1 Create the slice branch

```bash
git checkout -b slice/S00-archive-legacy-site
```

If you're already on a slice branch with unrelated work, stop and consult the user.

### 6.2 Create the archive directory and provenance file

```bash
mkdir -p src/app/_archive/legacy-site-2026-04-28
```

Write [`src/app/_archive/legacy-site-2026-04-28/README.md`](../../../src/app/_archive/legacy-site-2026-04-28/README.md):

```markdown
# Legacy public site — archived 2026-04-28

This directory contains the entire `(site)` route group as it existed before the
HTML-mocks → React rebuild documented in
[`docs/build/prompts/mock-html-to-react-migration.md`](../../../../docs/build/prompts/mock-html-to-react-migration.md).

**Status:** dormant. Files live here for diff/reference only. Next.js does not
route them because the parent segment starts with an underscore (`_archive`).

## Why archived

The new public surface is being rebuilt from the canonical Concept Modern HTML
mockups in [`docs/html/`](../../../../docs/html). Once the new build lands, the
legacy is replaced wholesale rather than refactored in place — the IA, design
system, and copy are all changing in the same pass.

## What is in here

The full `(site)` route group as of 2026-04-28:

- 24 route folders (`about/`, `articles/`, ..., `who-is-a-movement-leader/`)
- The legacy `(site)/layout.tsx` (passthrough)
- The legacy `(site)/page.tsx` (home)

Component imports inside these files still point at `@/components/...`. Those
components were **not** archived and remain live in the new build until each is
either reused, replaced, or pruned during the migration.

## Restoring a single page

If a section of legacy copy or layout needs to be revived during the rebuild,
copy (do not move) the file out of this directory and into its target route under
`src/app/(site)/<route>/`. Do **not** restore the entire `(site)/` tree.

## Deleting

Do not delete this directory until the migration is closed out per
[`docs/build/prompts/mock-html-to-react-migration.md`](../../../../docs/build/prompts/mock-html-to-react-migration.md)
§13 (Definition of Done) and the user explicitly confirms.
```

Stage that file:

```bash
git add src/app/_archive/legacy-site-2026-04-28/README.md
```

### 6.3 Confirm there is no `(site)` archive collision

```bash
ls src/app/_archive/legacy-site-2026-04-28/      # expect: README.md only
```

If anything else exists, stop — the directory must be empty before the move.

### 6.4 Move the entire `(site)` group

```bash
git mv "src/app/(site)" "src/app/_archive/legacy-site-2026-04-28/(site)"
```

This is a single, atomic operation. Git records it as a rename of every file inside the tree, so blame and history are preserved.

Verify:

```bash
# Old path is gone
ls "src/app/(site)" 2>/dev/null && echo "FAIL: (site) still exists" || echo "ok"

# New path has the full tree
ls "src/app/_archive/legacy-site-2026-04-28/(site)"

# Page count matches the inventory in §4
find "src/app/_archive/legacy-site-2026-04-28/(site)" -name "page.tsx" | wc -l
# expect: 39 (matches: pre-archive `find src/app/(site) -name page.tsx | wc -l`)
```

### 6.5 Repair the two component-from-page imports

Two `src/components/**` files import from inside the now-archived `(site)/book/` tree. Both must be relocated **into the components tree** so they no longer cross the `app/` boundary.

#### File 1 — `endorse-form`

```bash
# Verify the source still exists in the archive
ls src/app/_archive/legacy-site-2026-04-28/\(site\)/book/endorse/endorse-form.tsx

# Move it to live with its only consumer
mkdir -p src/components/sections/book-endorse
git mv \
  "src/app/_archive/legacy-site-2026-04-28/(site)/book/endorse/endorse-form.tsx" \
  "src/components/sections/book-endorse/endorse-form.tsx"
```

Then edit [`src/components/sections/book-endorse/book-endorse-page-content.tsx`](../../../src/components/sections/book-endorse/book-endorse-page-content.tsx):

```diff
- import { EndorseForm } from "@/app/(site)/book/endorse/endorse-form";
+ import { EndorseForm } from "@/components/sections/book-endorse/endorse-form";
```

#### File 2 — `moderation-forms`

```bash
ls src/app/_archive/legacy-site-2026-04-28/\(site\)/book/moderate/moderation-forms.tsx

mkdir -p src/components/sections/book-moderate
git mv \
  "src/app/_archive/legacy-site-2026-04-28/(site)/book/moderate/moderation-forms.tsx" \
  "src/components/sections/book-moderate/moderation-forms.tsx"
```

Edit [`src/components/sections/book-moderate/book-moderate-page-content.tsx`](../../../src/components/sections/book-moderate/book-moderate-page-content.tsx):

```diff
- import { ModerationForms } from "@/app/(site)/book/moderate/moderation-forms";
+ import { ModerationForms } from "@/components/sections/book-moderate/moderation-forms";
```

Re-grep to confirm zero remaining `@/app/(site)` imports anywhere in `src/`:

```bash
grep -rn "@/app/(site)" src/ && echo "FAIL: imports remain" || echo "ok"
```

### 6.6 Trim the root layout to a chrome-free shell

The root [`src/app/layout.tsx`](../../../src/app/layout.tsx) currently mounts `<SiteNav />`, the `<main>` element, and `<SiteFooter />`. With no public content underneath, that chrome would render around an empty 404. Trim it so the root layout is a pure passthrough until the new home page lands:

```diff
- import { SiteFooter } from "@/components/nav/site-footer";
- import { SiteNav } from "@/components/nav/site-nav";
- import { canonicalSiteOrigin } from "@/lib/site-url";
  ...
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} h-full min-h-dvh antialiased`} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col bg-background text-foreground">
        <Providers>
-         <a href="#main" className="...skip link...">Skip to content</a>
-         <SiteNav />
-         <main id="main" className="flex flex-1 flex-col pt-[var(--site-chrome-total,4.125rem)]">
-           {children}
-         </main>
-         <SiteFooter />
+         {children}
        </Providers>
      </body>
    </html>
  );
```

Keep `metadata`, `viewport`, the font wiring, and `<Providers>` exactly as they are. The next prompt restores the chrome around the new build.

> Note: `SiteNav`, `SiteFooter`, and `canonicalSiteOrigin` are still imported elsewhere — do **not** delete those modules. We are only removing this layout's references.

### 6.7 Verify the build still passes

The repo should build clean even with no `(site)` routes. Next will route only `/` (which now returns 404 because there is no `src/app/page.tsx`) and `/api/*` (which is unchanged).

```bash
pnpm typecheck       # zero errors
pnpm lint            # zero errors
pnpm build           # completes; no “Route /about not found” style failures
```

If typecheck breaks because something inside the archive references something outside that no longer exists, **do not patch the archive** — fix the outside reference (which is likely an unrelated drift) and re-run.

If `pnpm build` complains about the missing `/` route, that's expected — Next will report "no root page" but the build will still succeed unless `next.config.ts` or [`scripts/pre-build-check.ts`](../../../scripts/pre-build-check.ts) explicitly fails on it. Read [`scripts/pre-build-check.ts`](../../../scripts/pre-build-check.ts) first; if it asserts the home page exists, add a temporary skip with a TODO referencing this prompt and the migration prompt, and remove the skip in the migration prompt.

### 6.8 Smoke test

```bash
pnpm dev
# Open http://localhost:3000
#   → expect Next's default 404 page (no chrome, no content). That is correct.
# Open http://localhost:3000/about
#   → expect 404. Correct.
# Open http://localhost:3000/api/contact (any GET-supporting api route)
#   → API behaves as before.
```

### 6.9 Update [`docs/build/stitch-screens.md`](../stitch-screens.md) (if it exists)

Append a one-line entry under a new **Archival** heading recording the archival commit and date. If the file does not exist yet, skip — the migration prompt creates it.

### 6.10 Commit

```bash
git add -A
git status                     # review the diff one more time
git commit -m "$(cat <<'EOF'
chore(site): archive legacy public app to _archive/legacy-site-2026-04-28

Move the entire (site) route group — 24 routes plus layout and home — into
src/app/_archive/legacy-site-2026-04-28/ ahead of the HTML-mocks → React
rebuild. Two cross-boundary component imports (endorse-form, moderation-forms)
relocated into src/components/sections/. Root layout trimmed to a chrome-free
passthrough until the new home page lands.

API routes, components, lib, hooks, and tests are unchanged.

See: docs/build/prompts/full-public-app-archival.md
Next: docs/build/prompts/mock-html-to-react-migration.md
EOF
)"
```

Push and open a PR. Title: `Archive legacy public site (site/* → _archive/)`. Body: link to this prompt and the migration prompt.

## 7. Rollback

If anything goes wrong before the commit:

```bash
# Reverse the moves
git mv "src/app/_archive/legacy-site-2026-04-28/(site)" "src/app/(site)"
git mv "src/components/sections/book-endorse/endorse-form.tsx" "src/app/(site)/book/endorse/endorse-form.tsx"
git mv "src/components/sections/book-moderate/moderation-forms.tsx" "src/app/(site)/book/moderate/moderation-forms.tsx"
# Revert the import edits
git checkout -- \
  src/components/sections/book-endorse/book-endorse-page-content.tsx \
  src/components/sections/book-moderate/book-moderate-page-content.tsx \
  src/app/layout.tsx
# Drop the archive shell
rm -rf src/app/_archive
```

After the commit lands, rollback is a `git revert <sha>` away — every move is recorded as a rename so the revert is clean.

## 8. Definition of done

The archival is complete when **all** of the following are true:

- [ ] `src/app/(site)/` no longer exists.
- [ ] `src/app/_archive/legacy-site-2026-04-28/(site)/` contains the full legacy tree, with `page.tsx` count matching the pre-archive inventory.
- [ ] `src/app/_archive/legacy-site-2026-04-28/README.md` is in place.
- [ ] `grep -rn "@/app/(site)" src/` returns nothing.
- [ ] `src/app/layout.tsx` no longer mounts `SiteNav` / `SiteFooter` / `<main>` / skip link.
- [ ] `pnpm typecheck` and `pnpm lint` pass.
- [ ] `pnpm build` completes (a missing-home-page warning is acceptable).
- [ ] `pnpm dev` serves the API routes correctly and returns 404 for every legacy slug.
- [ ] One commit on a slice branch, message starts `chore(site): archive legacy public app …`.
- [ ] PR open and linked to this prompt.

Once all of the above hold, hand off to [`docs/build/prompts/mock-html-to-react-migration.md`](./mock-html-to-react-migration.md). Until then, do not start the rebuild.
