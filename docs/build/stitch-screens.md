# Migration work log

> Active migration: HTML mocks (`docs/html/mock-*.html`) → React.
> Playbooks: [`prompts/full-public-app-archival.md`](./prompts/full-public-app-archival.md), [`prompts/mock-html-to-react-migration.md`](./prompts/mock-html-to-react-migration.md).
> Historic Stitch migration archived below for reference.

## HTML mocks → React (2026-04-28)

The legacy public app was archived to `src/app/_archive/legacy-site-2026-04-28/(site)/`. The new public surface is being rebuilt from the thirteen Concept Modern HTML mockups in `docs/html/`.

### Phase tracker

- [x] **F1** Recipe layer port (`src/app/recipes.css` imported from `globals.css`).
- [x] **F2** Site chrome — `SiteNav`, `SiteFooter`, mobile drawer, skip link.
- [x] **F3** Section primitives (`Band`, `SectionHead`, `BtnPill`).
- [x] **P0** mock-home.html → `/` (home).
- [x] **P1** mock-organizations / churches / nonprofits / institutions.
- [x] **P2** mock-voices / movement-leaders.
- [x] **P3** mock-about / team.
- [x] **P4** mock-field-guide / assess / faq / contact.
- [x] **C1** Closeout — `pnpm typecheck` ✓, `pnpm build` ✓ on 2026-04-28.

All thirteen mocks shipped. Lint surfaces pre-existing errors in
`src/components/book/`, `src/components/sections/article-detail/`,
`src/components/sections/home/home-concept-modern-page-content.tsx`, and
`src/lib/services/simplified/base.service.ts` — none introduced by this
migration. Tracked separately.

### Page checklist

- [x] mock-home.html              → /
- [x] mock-organizations.html     → /who-we-serve
- [x] mock-churches.html          → /churches
- [x] mock-nonprofits.html        → /nonprofits
- [x] mock-institutions.html      → /institutions
- [x] mock-voices.html            → /voices
- [x] mock-movement-leaders.html  → /movement-leaders
- [x] mock-about.html             → /about
- [x] mock-team.html              → /team
- [x] mock-field-guide.html       → /field-guide
- [x] mock-assess.html            → /assess
- [x] mock-faq.html               → /faq
- [x] mock-contact.html           → /contact

### Asset TODOs

Real headshots and photographs to source. Each entry was rendered as a `bg-elevated` placeholder square in the React port to maintain layout while the asset gap is closed.

- People-fold (home) — Liz Rios, JR Woodward, L. Rowland Smith, Alan Hirsch, Brad Brisco, Joshua Shepherd. Square 88×88 portraits at 2x density.
- Trusted voices page (P2) — full-portrait 4:5 ratio for each named voice.
- Team page (P3) — full-portrait 4:5 ratio for each founder.

### Known follow-ups

- Live `/assess` diagnostic (P4 ports the page-shaped surface only).
- `/contact` form wired to existing `POST /api/contact` (P4).
- Prune unused legacy primitives in `src/components/primitives/` once all pages are off them (C1 task).

---

## 2026-04-29 — Home page expanded migration

Re-migrated [`docs/html/mock-home.html`](../html/mock-home.html) → `/` with the
full ten-section design (audience cards, path-steps, matters, build,
difference, proof, plus the existing hero / people / diagnosis / final CTA).
Skipped the internal scorecard band (HTML lines 847–1209) — self-audit, not
production. Playbook: [`prompts/home-page-mock-to-react-full-migration.md`](./prompts/home-page-mock-to-react-full-migration.md).
Audit notes: [`notes/home-page-audit-2026-04-29.md`](./notes/home-page-audit-2026-04-29.md).

- [x] mock-home.html              → / (re-migrated to expanded design)

Card-shadow token unification (`--shadow-card-soft` / `--shadow-card-lift`) is
a cross-repo follow-up; the new home recipes currently mirror the bespoke
rgba ink tuples in `mock-pages.css` to preserve static/React parity.

---

## Stitch Screen Work Log (historic — 2026-04-11)

Authoritative checklist for the prior Stitch → React migration. Source project: `2208910962065880866`. Fetched 2026-04-11 via `mcp__stitch__list_screens`.

Raw HTML dumps land in `docs/build/_stitch-raw/<screen-id>.html` (gitignored).

## Pages

All 17 marketing surfaces migrated. Each page passes `pnpm typecheck` + `pnpm lint` + `pnpm build` and prerenders statically.

- [x] **Home** — `74fd3a85b59c48c78b3f655547ad8e08` — _Movemental Landing Page - Refined Centered Hero_ → [src/app/(site)/page.tsx](../../src/app/(site)/page.tsx)
- [x] **About / Origin** — `382523aeb7c14c8d80e9a1469dafc792` — _Movemental Origin & Why We Exist_ → [src/app/(site)/about/page.tsx](../../src/app/(site)/about/page.tsx)
- [x] **Methodology** — `5e08d26a65ac4f019041827aa4fdd590` — _Movemental Methodology_ → [src/app/(site)/methodology/page.tsx](../../src/app/(site)/methodology/page.tsx)
- [x] **The Movemental System** — `11272072501042728857906b0e22ecee` — _The Movemental System_ → [src/app/(site)/system/page.tsx](../../src/app/(site)/system/page.tsx)
- [x] **Manifesto** — `eabc037386b34a42a8c222218a94ddb6` — _Systems Philosophy Manifesto_ → [src/app/(site)/manifesto/page.tsx](../../src/app/(site)/manifesto/page.tsx)
- [x] **Walkthrough** — `de355f54b44449ffa1be80a265df2036` — _Movemental Walkthrough_ → [src/app/(site)/walkthrough/page.tsx](../../src/app/(site)/walkthrough/page.tsx)
- [x] **Services — Overview** — `a15d4daf68be4b5890d11a10178d8083` — _Movemental Service Page - Section Refinement_ → [src/app/(site)/services/page.tsx](../../src/app/(site)/services/page.tsx)
- [x] **System Builds — Overview** — `00ef26469de34fb1be60e7fb0c10483c` — _Movemental - System Builds_ → [src/app/(site)/services/system-builds/page.tsx](../../src/app/(site)/services/system-builds/page.tsx)
- [x] **System Builds — Content & Fundraising** — `860b6a8f56bc4062af0a75f36c529fa8` — _Movemental System Builds - Content & Fundraising_ → [src/app/(site)/services/system-builds/content-fundraising/page.tsx](../../src/app/(site)/services/system-builds/content-fundraising/page.tsx)
- [x] **System Builds — Foundation Layer** — `ac6050ab602a430ba46c7b92df902b87` — _Movemental Foundation Layer Build_ → [src/app/(site)/services/system-builds/foundation/page.tsx](../../src/app/(site)/services/system-builds/foundation/page.tsx)
- [x] **Organizational Systems** — `4f1554bae91d4acc8fbf3f7b6660ff30` — _Movemental Organizational Systems_ → [src/app/(site)/services/organizational-systems/page.tsx](../../src/app/(site)/services/organizational-systems/page.tsx)
- [x] **Churches & Institutions** — `dfdfb73473bb4c8ca344af257c42e7d9` — _Movemental Churches & Institutions_ → [src/app/(site)/who-we-serve/page.tsx](../../src/app/(site)/who-we-serve/page.tsx)
- [x] **Case Studies** — `ec543b7c8ec7499c9a0a050b43849c7b` — _Movemental Case Studies_ → [src/app/(site)/case-studies/page.tsx](../../src/app/(site)/case-studies/page.tsx)
- [x] **Evidence / Proof of Concept** — `66f9ff6a12514b6fb2c84b633f05ae46` — _Movemental Evidence & Proof of Concept_ → [src/app/(site)/evidence/page.tsx](../../src/app/(site)/evidence/page.tsx)
- [x] **Pricing** — `bb84cb5aadcd461799807e492e7a13ba` — _Movemental Pricing & Investment_ → [src/app/(site)/pricing/page.tsx](../../src/app/(site)/pricing/page.tsx)
- [x] **FAQ** — `c7e5389f0f2c4b58acc5db0499943b6f` — _Movemental FAQ_ (canonical) → [src/app/(site)/faq/page.tsx](../../src/app/(site)/faq/page.tsx)
- [x] **Contact** — `0971c4b3befe466d9d0f38afbf9bd722` — _Movemental Contact & Conversation_ → [src/app/(site)/contact/page.tsx](../../src/app/(site)/contact/page.tsx)

## Reference screens (not routed; inform components + tokens)

These design explorations, token galleries, and variants are inputs to shared components (`src/components/sections/*`, `src/components/primitives/*`) rather than pages. Not migrated as standalone routes. Latest `updateTime` wins when variants contradict.

- `abcbf82927dc4d89839cce5f1a34f033` — _Movemental Design System - SSoT Token Library_ (desktop) — informed `globals.css` tokens
- `b710e8210f3f41b59d342a1a459fc58a` — _Movemental Design System - SSoT Token Library_ (mobile)
- `920d21f663d446288e70e090b941509d` — _Color Token Detail: Primary Command_
- `b3fd1a91a7314300b633c1079d667d9e` — _Gradient Token Detail: Linear Command_
- `6b3bd735978d402c864feae368f130d9` — _Movemental Component Library - Technical (Refined)_
- `18ccc08ac1f34cd79efc5f2842a34ba7` — _Movemental Component Library - Technical & Density_
- `1a929e3950be415b8ca78ea71b60673b` — _Card Grid Showcase_
- `b900ea8de1384c80a9926be6026a417b` — _Card Grid Showcase: Systemic_
- `5599b7972f0849898b9b96d7afdcfea1` — _Card Grid Showcase: Editorial_
- `a75e77622d23481d9bdd0b7adf0d5880` — _Card Grid Showcase: Tonal Depth_
- `e8296eca7dd045af9025672f961e9cab` — _Movemental Features - Variation 1 (Centered)_
- `07f747dc47c04c8eaae413fb23d2f0a0` — _Movemental Features - Variation 3 (Dark Editorial)_
- `4467e532aedc44aea7ec5eb064da4166` — _Movemental FAQ - Bold Contrast_ (variant — canonical FAQ used `c7e5389f…`)
- `2b0d7f8101f548d1898d338d79ff9789` — _Movemental FAQ - Clean Minimalist_ (variant)

## Non-screen assets

- `4455388690303316128` — `screencapture-notion-2026-04-11-03_11_44.png` — Image-only screen, no HTML. Skipped.

## Follow-ups / TODO

- **Assets.** Every page that shows imagery currently points at `lh3.googleusercontent.com` Stitch-hosted URLs, wired through `next/image` via the remote host whitelist in [next.config.ts](../../next.config.ts). Each is tagged `TODO(assets)`. These must be replaced with first-party imagery (Supabase Storage or `/public`) before launch.
- **CTAs with `#` destinations.** Contact hero button currently points at `#schedule`; wire this to a real booking widget or Calendly embed once decided.
- **`/privacy`, `/terms`, `/cookies`.** Referenced from the footer but not yet routed. Add boilerplate pages before launch.
- **Responsive review.** All pages were translated mechanically; spot-check each page at mobile breakpoints in `pnpm dev`. Any layout drift should be corrected page-by-page rather than in primitives.
- **Visual diff vs. Stitch.** Open each Stitch screen side-by-side with the corresponding live route (`pnpm dev`) and adjust tonal layering, spacing, and copy emphasis where the React translation feels off. `aspect-[16/9]`, `aspect-[4/5]`, etc. can be canonicalised to `aspect-video`, `aspect-4/5` in a follow-up pass.
- **Component extraction.** Sections that recur across pages (4-week build callout, investment model tiles, "Start there" closing) could be extracted into `src/components/sections/*` if the duplication becomes a maintenance burden.

_Last updated: 2026-04-11 — all 17 pages migrated, builds clean._
