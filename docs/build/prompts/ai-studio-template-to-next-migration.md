# Prompt: AI Studio Template → Next.js App Migration

> **How to run this:** Paste the entire prompt into your agent inside the `movemental` repo (or invoke with `@docs/build/prompts/ai-studio-template-to-next-migration.md`). Execute phases in order. Do **not** skip the inventory or archive steps — they gate safe rollback.

---

## 1. Mission

Migrate the **Vite + React Router** prototype under [`docs/ai-studio-template`](../../ai-studio-template) into the production **Next.js 16 App Router** app (`src/app`, `src/components`, shared CSS).

**Fidelity goal:** Preserve the template **as-authored** — JSX structure, copy, section order, Tailwind class strings, and behavioral intent (dropdowns, theme toggle, mobile drawer). Mechanical edits are allowed only where the stacks differ (routing, metadata, imports, `"use client"` boundaries, `next/link`, optional `next/image`).

**Scope boundary:**

- **In scope:** Every page route declared in the template’s [`App.tsx`](../../ai-studio-template/src/App.tsx), every shared module those pages import, the template [`Layout.tsx`](../../ai-studio-template/src/components/Layout.tsx) header/footer (site chrome), and any CSS utilities the template relies on from [`index.css`](../../ai-studio-template/src/index.css).
- **Out of scope (leave unchanged):** Any `src/app/**/page.tsx` (or other routes) that **do not correspond** to a template route **and** are not required to host imported template code. See §6 for the explicit “do not touch” list for this repo snapshot.

This migration is **not** the Stitch migration ([`stitch-to-react-migration.md`](./stitch-to-react-migration.md)). Do not pull Stitch screens for these steps unless you are resolving a deliberate gap called out in QA.

---

## 2. Non-negotiables

1. **pnpm only.** Never `npm` / `yarn`.
2. **Next 16 conventions.** Middleware lives in `proxy.ts` at repo root. Prefer Server Components; add `"use client"` only on modules that use browser-only APIs or React client hooks (`useState`, `useEffect`, etc.).
3. **Repo layout.** Marketing routes live under `src/app/(site)/…`. The root [`src/app/layout.tsx`](../../../src/app/layout.tsx) already wraps the site with header + footer — you will **replace** those chrome components with the ported template header/footer (see §8).
4. **Canonical doctrine still applies to copy edits.** Do not rename “Trusted voices” or introduce roster/recruitment patterns on `/voices`. If the template already complies, leave it; if it drifts from [`docs/build/strategy/movement-leaders-as-ecosystem-layer.md`](../../strategy/movement-leaders-as-ecosystem-layer.md), fix copy **only** where it violates that doc (narrow exception to “exact” fidelity).
5. **Strict TypeScript.** `pnpm typecheck` passes at each phase checkpoint.
6. **Do not delete `docs/ai-studio-template` until §11 exit criteria are met.**

---

## 3. Preflight

Run from repo root:

```bash
pnpm --version
node --version
pnpm install
pnpm typecheck
pnpm lint
```

Confirm the template tree exists and matches the migration inventory:

```bash
# Windows PowerShell example
Get-ChildItem -Recurse docs/ai-studio-template/src/pages | Select-Object FullName
```

Read these files before writing code:

- [`docs/ai-studio-template/src/App.tsx`](../../ai-studio-template/src/App.tsx) — authoritative route list.
- [`docs/ai-studio-template/src/components/Layout.tsx`](../../ai-studio-template/src/components/Layout.tsx) — `SiteHeader`, `SiteFooter`, skip link pattern.
- [`docs/ai-studio-template/src/index.css`](../../ai-studio-template/src/index.css) — utilities (`btn-pill`, bands, typography helpers) and theme tokens.
- [`src/app/globals.css`](../../../src/app/globals.css) — merge destination for any missing utilities.

---

## 4. Archive originals (before edits)

**Objective:** Keep a frozen copy of the template until production parity is verified, then remove the working copy from `docs/ai-studio-template`.

1. Create an archive folder (choose one convention and stick to it):

   `docs/build/_archive/ai-studio-template-<YYYY-MM-DD>/`

2. Copy the **entire** `docs/ai-studio-template` directory into that archive:

   - Include `src/`, `package.json`, `tailwind.config.ts`, `vite.config.ts`, `index.html`, `README.md`, etc.
   - Exclude `node_modules` if present (optional; archive should be reproducible from lockfile).

3. Commit the archive in git **or** ensure your backup is otherwise durable (team policy). The archive is the rollback reference if Next migration regresses.

4. **Do not delete** `docs/ai-studio-template` yet — keep it side-by-side with the archive until §11.

---

## 5. Route map (template → Next.js)

Template paths come from [`App.tsx`](../../ai-studio-template/src/App.tsx). Map each to `src/app/(site)/<path>/page.tsx`.

| Template path | Next.js file | Notes |
|---------------|--------------|-------|
| `/` | `(site)/page.tsx` | Replace current implementation with ported `HomePage`. |
| `/pathway` | `(site)/pathway/page.tsx` | **New folder.** Maps to `PathwayOverviewPage`. |
| `/pathway/foundations` | `(site)/pathway/foundations/page.tsx` | **New.** `FoundationsPage`. |
| `/pathway/lab` | `(site)/pathway/lab/page.tsx` | **New.** `LabPage`. |
| `/training` | `(site)/training/page.tsx` | **New.** `TrainingPage`. |
| `/technology` | `(site)/technology/page.tsx` | **New.** `TechnologyPage`. |
| `/for-churches` | `(site)/for-churches/page.tsx` | **New.** `AudiencePage` with `audience="churches"`. |
| `/for-nonprofits` | `(site)/for-nonprofits/page.tsx` | **New.** `audience="nonprofits"`. |
| `/for-institutions` | `(site)/for-institutions/page.tsx` | **New.** `audience="institutions"`. |
| `/churches` | `(site)/churches/page.tsx` | Same component/props as template legacy route. |
| `/nonprofits` | `(site)/nonprofits/page.tsx` | Same. |
| `/institutions` | `(site)/institutions/page.tsx` | Same. |
| `/about` | `(site)/about/page.tsx` | Replace with ported `AboutPage`. |
| `/assess` | `(site)/assess/page.tsx` | Replace with ported `AssessPage`. |
| `/movement-leaders` | `(site)/movement-leaders/page.tsx` | Replace. |
| `/team` | `(site)/team/page.tsx` | Replace. |
| `/voices` | `(site)/voices/page.tsx` | Replace. |
| `/contact` | `(site)/contact/page.tsx` | Replace. |
| `/work-with-us` | `(site)/work-with-us/page.tsx` | Template **does not** register this route in `App.tsx` — see §6 (leave as-is). |
| `/start-with-safety` | `(site)/start-with-safety/page.tsx` | Not in template router — **leave as-is**. |
| `/evidence` | `(site)/evidence/page.tsx` | Template includes `EvidencePage` on `/evidence` — **replace** to match template. |
| `/library` | `(site)/library/page.tsx` | **New.** `LibraryPage`. |
| `/cookies` | `(site)/cookies/page.tsx` | Replace. |
| `/privacy` | `(site)/privacy/page.tsx` | Replace. |
| `/terms` | `(site)/terms/page.tsx` | Replace. |
| `/faq` | `(site)/faq/page.tsx` | Replace. |
| `/who-we-serve` | `(site)/who-we-serve/page.tsx` | Replace. |
| `/field-guide` | `(site)/field-guide/page.tsx` | Replace. |

**Path naming:** Keep URL paths **identical** to the template (`/pathway`, `/for-churches`, …). Do not silently rename to legacy names.

**Existing `/path` route:** This repo may already expose `(site)/path/page.tsx`. The template’s primary IA uses **`/pathway`**. Per instructions, pages **not** touched by the template stay as-is: **do not remove or rewrite** `(site)/path` unless a separate product decision adds redirects. Optional follow-up (not required here): add a `redirect` in `next.config` or `proxy.ts` from `/path` → `/pathway`.

---

## 6. Pages to leave unchanged (this repo snapshot)

These routes exist under `src/app/(site)/` but are **not** wired in [`docs/ai-studio-template/src/App.tsx`](../../ai-studio-template/src/App.tsx):

- [`(site)/work-with-us/page.tsx`](../../../src/app/(site)/work-with-us/page.tsx)
- [`(site)/start-with-safety/page.tsx`](../../../src/app/(site)/start-with-safety/page.tsx)

**Rule:** Do not open or rewrite those files during this migration unless a dependency change forces a global rename (should not happen).

**Also leave unchanged:** Any routes outside `(site)` that already exist (API routes, app folders not listed in §5). Do not delete archived paths under `src/app/_archive/`.

---

## 7. Shared modules inventory (copy order)

Migrate dependencies **bottom-up** so pages compile early.

### 7.1 Library / data

| Template path | Suggested Next destination |
|---------------|----------------------------|
| [`src/lib/utils.ts`](../../ai-studio-template/src/lib/utils.ts) | Diff against [`src/lib/utils.ts`](../../../src/lib/utils.ts). Merge **only** if the template adds helpers; otherwise keep a single canonical `cn` source. |
| [`src/lib/integrity-diagnostic/questions.ts`](../../ai-studio-template/src/lib/integrity-diagnostic/questions.ts) | `src/lib/integrity-diagnostic/questions.ts` (create folders as needed). |
| [`src/data/home-data.ts`](../../ai-studio-template/src/data/home-data.ts) | `src/data/home-data.ts` or colocate under `components/…` if only used by home — prefer `src/data/` for clarity. |
| [`src/data/path-data.ts`](../../ai-studio-template/src/data/path-data.ts) | `src/data/path-data.ts` |
| [`src/data/shared-path-data.ts`](../../ai-studio-template/src/data/shared-path-data.ts) | `src/data/shared-path-data.ts` |

### 7.2 Components (non-layout)

Port files from [`docs/ai-studio-template/src/components/`](../../ai-studio-template/src/components/) into `src/components/`, preserving relative import cohesion:

- `Container.tsx`
- `Reveal.tsx`
- `SectionHead.tsx`
- `IntegrityDiagnosticForm.tsx`
- `CaseStudyNarrative.tsx`
- `PathwayComponent.tsx`
- `segment/SegmentPathway.tsx`
- Path subtree: `path/PathStickySection.tsx`, `path/PathIntro.tsx`, `path/PathClosingCta.tsx`, `path/PathFootnote.tsx`, `path/CaseStudy.tsx`, `path/stages/*.tsx`

**Import aliases:** Template uses `@/` — align with [`tsconfig.json`](../../../tsconfig.json) paths (`@/*` → `src/*`).

**Name collisions:** If a Next filename already exists with different behavior, either:

- Temporarily namespace (`template-container.tsx`), **or**
- Replace deliberately after comparing outputs.

Prefer **one canonical component** once parity is confirmed.

### 7.3 Pages

For each `*Page.tsx` under [`docs/ai-studio-template/src/pages/`](../../ai-studio-template/src/pages/):

1. Create or replace the matching `page.tsx` per §5.
2. Rename export: Next convention is `default function Page()` or default export alias — keep content identical.
3. Replace `react-router-dom` imports:
   - `Link` → `next/link` (`href` prop instead of `to`).
   - Remove `Outlet` usage (layout handles children).

4. Replace `document.title` / `useEffect` title hacks with Next metadata **only where it improves behavior without changing UX**:

```tsx
export const metadata: Metadata = {
  title: "…",
  description: "…",
};
```

If a page must stay client-only, use `metadata` on a thin Server wrapper or accept client titles — **do not block migration on perfection**; prefer metadata when trivial.

5. **`next/image`:** Optional. For pixel-parity, retaining `<img>` from the template is acceptable; switch to `next/image` when straightforward (remote patterns may require [`next.config`](../../../next.config.ts) `images.remotePatterns`).

---

## 8. Migrate navigation (header + footer)

The template chrome lives in [`Layout.tsx`](../../ai-studio-template/src/components/Layout.tsx) as `SiteHeader` and `SiteFooter`.

**Steps:**

1. Port `SiteHeader` into the repo’s nav system:

   - Recommended: replace implementations in [`src/components/nav/site-header.tsx`](../../../src/components/nav/site-header.tsx) (and any pieces it uses), **or** swap `SiteHeader` import in root [`layout.tsx`](../../../src/app/layout.tsx) to a new `TemplateSiteHeader` that wraps the same markup.

2. Port `SiteFooter` similarly into [`site-footer.tsx`](../../../src/components/nav/site-footer.tsx).

3. **Must be client components** where the template uses `useState`, `useEffect`, scroll listeners, theme toggle, mobile menu. Keep server/client split minimal — the template header/footer are inherently client-heavy.

4. **Links:** Convert every `react-router-dom` `Link` to `next/link`.

5. **Theme:** Template toggles `document.documentElement.classList` for `dark`. Align with existing [`Providers`](../../../src/app/providers.tsx) / `next-themes` if already present; otherwise preserve template behavior exactly.

6. **Nav config:** Today [`nav-config.ts`](../../../src/components/nav/nav-config.ts) drives IA. After migration, either:

   - Derive nav from template structure **as source of truth** (update or replace `PRIMARY_NAV`), **or**
   - Inline links in the ported header/footer and deprecate unused config gradually.

   Goal: **Rendered nav matches template IA** (Pathway mega-menu, Audiences → `/for-*`, About, Contact, CTA).

7. **Skip link:** Root layout already includes skip-link markup — reconcile duplication when merging Layout patterns.

---

## 9. Styles (`index.css` → `globals.css`)

1. Diff [`docs/ai-studio-template/src/index.css`](../../ai-studio-template/src/index.css) against [`src/app/globals.css`](../../../src/app/globals.css).

2. Merge **missing** pieces only:

   - `@utility` / `@layer components` blocks relied on by template classes (`btn-pill`, `band-midnight`, `section-eyebrow`, etc.).
   - Any `--variable` definitions the template uses that are absent in Next.

3. **Fonts:** Root layout already loads **Inter** and **Instrument Serif** via `next/font/google` — **do not** add Google Fonts `<link>` duplicates from the template.

4. **Tailwind v4:** Next app uses CSS-first `@theme` in `globals.css`. Do not add a separate `tailwind.config.ts` from the template unless required for a documented gap; prefer porting tokens into `@theme` / `:root`.

5. **DESIGN.md vs template tokens:** If colors diverge, prefer **template values for this migration** (user-requested fidelity). Flag notable deltas in the PR description for design review.

---

## 10. Verification checkpoints

After each batch (data → shared components → pages → nav → CSS):

```bash
pnpm typecheck
pnpm lint
pnpm build
```

**Manual QA (dev):**

- Hit every route in §5; compare side-by-side with the archived Vite app (`pnpm dev` in archived copy **or** AI Studio hosted preview linked from template README).
- Keyboard: focus order, mobile menu `aria-expanded`, skip link.
- Theme toggle: no flash regressions.

**Automated:** Add or update Playwright smoke tests only if the repo already covers marketing routes; otherwise optional.

---

## 11. Delete template source (after safe replacement)

Only when **all** are true:

1. Archive copy exists under `docs/build/_archive/ai-studio-template-<date>/`.
2. `pnpm build` succeeds on `main` (or merge branch).
3. Stakeholder sign-off OR internal QA checklist complete for §10.
4. Git history contains the pre-migration template state **or** the archive folder is committed.

**Then:**

1. Delete the working tree `docs/ai-studio-template/` (not the archive).
2. Optionally add a short pointer in `docs/build/README.md` or internal index: “AI Studio template archived at …” **only if your team maintains such an index** (optional).

---

## 12. Execution checklist (for agents)

Use this as a literal task list:

- [ ] Preflight §3
- [ ] Archive §4
- [ ] Migrate `src/lib` / `src/data` §7.1
- [ ] Migrate shared components §7.2
- [ ] Create/replace `(site)` routes §5–§7.3
- [ ] Port header/footer §8; align nav IA
- [ ] Merge CSS utilities §9
- [ ] Run §10 gates
- [ ] Obtain §11 approval; delete `docs/ai-studio-template`
- [ ] Leave `(site)/work-with-us`, `(site)/start-with-safety`, `(site)/path` untouched unless separately specified

---

## 13. Relationship to other prompts

| Document | When to use |
|----------|-------------|
| [`stitch-to-react-migration.md`](./stitch-to-react-migration.md) | Stitch project `2208910962065880866` is design source for net-new screens. |
| This file | Mechanical port from `docs/ai-studio-template` only. |

If Stitch and template disagree, treat **template** as authoritative **for this migration task**; schedule Stitch realignment separately.

---

*Last reviewed with template routes as defined in `docs/ai-studio-template/src/App.tsx` (AI Studio export). Update §5–§6 if that file changes.*
