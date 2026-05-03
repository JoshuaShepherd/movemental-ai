# Concept Modern — Phase 0 locked source map

**Status:** Phase 0–2 complete — inventory, global chrome, and first **page-route** migrations (articles archive + assessments hub reachability).  
**Date:** 2026-04-17 (Phase 0–1); 2026-04-17 (Phase 2)

This document **locks** what counts as the Concept Modern reference set, where it maps in the Next.js app, and which **redirects** must be treated as part of the live information architecture. Do not treat `docs/html` paths as routes; always reconcile with `src/app/(site)`, `src/components/nav/nav-links.ts`, and `next.config.ts`.

---

## 1. Scope rules

### In scope (visual / copy reference)

- All files under `docs/html/` whose names or paths include **`concept-modern`** (see §2).
- Global chrome alignment uses **`docs/html/master-components/nav-01.html`** per [concept-modern-html-to-react-prompts.md](./prompts/concept-modern-html-to-react-prompts.md) Prompt 02 (not named `*concept-modern*`, but part of the same program).

### Out of scope unless explicitly expanded

- `docs/html/fragmentation-stages-*` and other HTML prototypes **without** `concept-modern` in the name.
- `_archived` route groups under `src/app/(site)/_archived/` — reference only, not live IA.

### Authoritative docs chain

1. Mechanical React rules: [prompts/stitch-to-react-migration.md](./prompts/stitch-to-react-migration.md)
2. Concept Modern migration prompts (Prompts 01+): [prompts/concept-modern-html-to-react-prompts.md](./prompts/concept-modern-html-to-react-prompts.md)
3. After Prompt 01: **`docs/design/DESIGN.md`** overrides conflicting notes in `FUTURE-concept-modern-html-charter.md`

Do **not** author a second competing charter in random markdown; extend this map or `DESIGN.md`.

---

## 2. HTML inventory (`*concept-modern*`)

Paths are relative to repo root `docs/html/`.

| Path | Role |
|------|------|
| `approach-concept-modern.html` | Standalone “Approach” page (AI Stewardship Sequence framing) |
| `assessments-concept-modern.html` | Assessments **hub** shell (copy/layout reference) |
| `churches-concept-modern.html` | Legacy single-file audience variant — prefer `audience-concept-modern/churches.html` for parity checks |
| `contributors-concept-modern.html` | Book contributors / authority layer |
| `institutions-concept-modern.html` | Legacy single-file audience variant — prefer `audience-concept-modern/institutions.html` |
| `nonprofits-concept-modern.html` | Legacy single-file audience variant — prefer `audience-concept-modern/nonprofits.html` |
| `services-pricing-concept-modern.html` | Services + pricing narrative (no live `/services` hub; see §5) |
| `articles-concept-modern/article.html` | Article detail template |
| `articles-concept-modern/articles-archive.html` | Articles archive UX |
| `articles-concept-modern/archive.js` | Archive behavior |
| `articles-concept-modern/index.html` | Articles index |
| `articles-concept-modern/styles.css` | Articles layer styles |
| `audience-concept-modern/churches.html` | Churches audience |
| `audience-concept-modern/institutions.html` | Institutions audience |
| `audience-concept-modern/movement-leaders.html` | Movement leaders audience |
| `audience-concept-modern/nonprofits.html` | Nonprofits audience |
| `audience-concept-modern/styles.css` | Shared audience deltas |
| `books-concept-modern/book-ereader.html` | Book reader chrome / flow |
| `books-concept-modern/ereader.js` | Reader behavior |
| `books-concept-modern/index.html` | Book landing |
| `books-concept-modern/styles.css` | Book layer styles |
| `fragmentation-concept-modern/index.html` | Long-form fragmentation story (scroll article) |
| `fragmentation-concept-modern/script.js` | Fragmentation page motion |
| `fragmentation-concept-modern/styles.css` | Fragmentation styles |
| `homepage-concept-modern/index.html` | Home |
| `homepage-concept-modern/script.js` | Home motion |
| `homepage-concept-modern/styles.css` | Shared foundation (nav, hero, sections, footer) |
| `team-concept-modern/index.html` | Team |
| `team-concept-modern/styles.css` | Team deltas |
| `vision-concept-modern/index.html` | “Vision at 100 leaders” long page |
| `vision-concept-modern/script.js` | Vision motion |
| `vision-concept-modern/styles.css` | Vision styles |

**Count:** 32 tracked files (per glob `**/*concept-modern*`). Duplicates (`churches-concept-modern.html` vs `audience-concept-modern/churches.html`) are intentional **legacy**; prefer **`audience-concept-modern/`** + **`homepage-concept-modern/styles.css`** as the primary reference stack.

---

## 3. Live IA — nav and primary routes

### Navigation config (single source)

- **`src/components/nav/nav-links.ts`** — `siteNavSections`, `siteHeaderFlatNavLinks`, `siteCtaLink`, `siteSecondaryCtaLink`, `footerSections`, `footerLegalLinks`

### `(site)` routes that participate in Concept Modern parity

| URL path | Route file | Primary section / note |
|----------|------------|-------------------------|
| `/` | `(site)/page.tsx` | `home-concept-modern-page-content.tsx` |
| `/fragmentation` | `(site)/fragmentation/page.tsx` | `FragmentationDeck` (not the HTML scroll article) |
| `/articles` | `(site)/articles/page.tsx` | In-page composition + `audience-concept` |
| `/articles/archive` | `(site)/articles/archive/page.tsx` | `ArticlesArchiveClient` — filter / search / sort (Concept Modern archive parity) |
| `/articles/[slug]` | `(site)/articles/[slug]/page.tsx` | `ArticleDetailPageContent` |
| `/book` | `(site)/book/page.tsx` | `BookConceptModernPageContent` |
| `/book/read/[slug]` | `(site)/book/read/[slug]/page.tsx` | `ChapterReaderPageContent` |
| `/book/contributors` | `(site)/book/contributors/page.tsx` | `BookContributorsPageContent` |
| `/movement-leaders` | `(site)/movement-leaders/page.tsx` | `MovementLeadersPageContent` |
| `/churches` | `(site)/churches/page.tsx` | `ChurchesPageContent` |
| `/nonprofits` | `(site)/nonprofits/page.tsx` | `NonprofitsPageContent` |
| `/institutions` | `(site)/institutions/page.tsx` | `InstitutionsPageContent` |
| `/team` | `(site)/team/page.tsx` | `TeamPageContent` |
| `/about` | `(site)/about/page.tsx` | Standard marketing |
| `/faq` | `(site)/faq/page.tsx` | Standard marketing |
| `/contact` | `(site)/contact/page.tsx` | Primary CTA destination |
| `/assessment-new` | `(site)/assessment-new/page.tsx` | `DualIntelligenceDiagnostic` — **public entry for “assessment”** (see §5) |
| `/assess` | `(site)/assess/page.tsx` | `AssessPageContent` — assessments hub (system readiness diagnostic shell) |
| `/assess/formation` | `(site)/assess/formation/page.tsx` | Formation framing + link to diagnostic |

Other `(site)/page.tsx` files exist (blog, legal, book tools, etc.); they are **out of band** for Concept Modern unless a future prompt adds them.

### HTML → React quick map (parity work)

| HTML reference | React target |
|----------------|--------------|
| `homepage-concept-modern/*` | `/` |
| `fragmentation-concept-modern/*` | `/fragmentation` (expect structural divergence; see §6) |
| `articles-concept-modern/*` | `/articles`, `/articles/archive`, `/articles/[slug]` |
| `books-concept-modern/*` | `/book`, `/book/read/[slug]` |
| `audience-concept-modern/*.html` | Matching audience route |
| `team-concept-modern/*` | `/team` |
| `contributors-concept-modern.html` | `/book/contributors` |
| `assessments-concept-modern.html` | `/assess` — `AssessPageContent` (hub + system readiness); compare shell copy/layout in a later pass |
| `services-pricing-concept-modern.html` | **No hub**; `/services` → `/contact` |
| `approach-concept-modern.html` | **No dedicated route** — align with home sections or add `/approach` in a later phase |
| `vision-concept-modern/*` | **No live page**; `/vision` → `/fragmentation` |
| `churches-` / `nonprofits-` / `institutions-concept-modern.html` (root) | Superseded by `audience-concept-modern/` for parity |

---

## 4. Redirects (`next.config.ts`) — full list

All entries are **permanent** unless noted. Order matters only for overlapping patterns; this is the **logical** set as of lock date.

| Source | Destination |
|--------|----------------|
| `/blog`, `/blog/:path*` | `/articles` |
| `/fragmentation-old` | `/fragmentation` |
| `/nonprofits-new`, `/nonprofits-new/next` | `/nonprofits` |
| `/churches-new` | `/churches` |
| `/movement-leaders-new` | `/movement-leaders` |
| `/institutions-new` | `/institutions` |
| `/nonprofits-system-example-new` | `/nonprofits` |
| `/fragmentation-intel` | `/fragmentation` |
| `/platform` | `/fragmentation` |
| `/system` | `/fragmentation` |
| `/movemental-at-100` | `/fragmentation` |
| `/knowledge-ecosystem` | `/fragmentation` |
| `/vision` | `/fragmentation` |
| `/services`, `/services/:path*` | `/contact` |
| `/who-its-for` | `/movement-leaders` |
| `/how-it-works`, `/how-it-works/:path*` | `/fragmentation` |
| `/system-builds`, `/system-builds/:path*` | `/contact` |
| `/evidence` | `/faq` |
| `/case-studies` | `/faq` |
| `/pricing` | `/contact` |
| `/manifesto` | `/contact` |
| `/apply` | `/contact` |
| `/inquiry` | `/contact` |
| `/book/read/:slug` (legacy slugs) | `/book` | *(from `LEGACY_BOOK_READ_SLUGS` in `src/lib/book-legacy-read-redirects`)* |

**Migration rule:** Before changing any public URL or removing a redirect, update this table and grep the repo for hardcoded `href`s.

---

## 5. Known IA anomalies (fix in later phases, not Phase 0)

1. ~~**`/assess` → `/assessment-new`**~~ **(resolved Phase 2)** — Redirects removed; **`/assess`** renders the assessments hub and **`/assess/formation`** is reachable. **`/assessment-new`** remains the dual-intelligence diagnostic entry.
2. **`/services` → `/contact`** — `services-pricing-concept-modern.html` has no first-class React home.
3. **`/vision` → `/fragmentation`** — `vision-concept-modern/` has no dedicated live route.
4. **`movemental-at-100/page.tsx`** returns `null` at route file level; **`/movemental-at-100`** redirects to **`/fragmentation`** anyway.

---

## 6. Fragmentation: explicit divergence

| Artifact | Nature |
|----------|--------|
| `fragmentation-concept-modern/` | Long-form **article** (reading progress, section nav) |
| `FragmentationDeck` on `/fragmentation` | **Horizontal GSAP** “six stages” experience + integration browser |

Phase 0 **does not** pick a winner; later phases choose merge, subroutes, or deprecation.

---

## 7. Phase 1 (complete) — global chrome & tokens

Implemented in repo:

- **`nav` breakpoint (901px)** in `tailwind.config.ts` — marketing nav chrome uses `nav:*` instead of `lg:*` so the desktop/mobile split matches `docs/html/master-components/css/nav-demos.css` with `nav-01`.
- **`SiteNav`** — flex row parity with `nav-01.html` (brand · flex-1 centered links · actions).
- **`--font-serif`** in `src/app/globals.css` `@theme inline` — stacks `var(--font-serif-display)` first (from `Instrument_Serif` in `src/app/layout.tsx`) so base-layer `<em>` and Concept Modern HTML match the self-hosted font.
- **`docs/design/DESIGN.md`** — §10 layout table corrected; §17.3 documents nav-01, `nav` breakpoint, `nav-links.ts` SSOT, and Instrument loading; legacy “primary blue” copy aligned to ink primary.

## 9. Phase 2 (complete) — articles archive + assessments routing

- **`/articles/archive`** — New route + `ArticlesArchiveClient`: hero and toolbar aligned with `articles-concept-modern/articles-archive.html` (search, shape chips, sort, card grid). Data from `listArticlesForArchive()` in `src/lib/articles.ts` (mtime + category derived from `eyebrow`). Links from `/articles` body + **Story** column in `nav-links.ts` (`Article archive`).
- **`/assess` / `/assess/formation`** — Removed permanent redirects to `/assessment-new` in `next.config.ts` so `AssessPageContent` and formation framing match the **hub** intent of `assessments-concept-modern.html`; diagnostic stays on **`/assessment-new`**.

## 10. Next step (Phase 3+)

Continue remaining prompts in [concept-modern-html-to-react-prompts.md](./prompts/concept-modern-html-to-react-prompts.md): full **Prompt 03** home diff if needed, **Prompt 06** articles index fine-grained parity, **Prompt 08** assess hub shell vs `assessments-concept-modern.html`, `/services` vs `services-pricing-concept-modern.html`, `/approach`, vision route decision, fragmentation article vs deck.
