# Movemental Site Audit — 2026-05-11

Read-only reconnaissance of repository routes, navigation, components, forms, and assets. No code was modified for this pass.

## Summary

- **Total marketing routes (`src/app/(site)/`)**: **35** `page.tsx` files
- **Additional authenticated / product shell routes** (not counted above): `/login`, `/dashboard`, `/welcome`, `/onboarding/*`, `/admin/onboarding/*`, `/agent-runtime` (studio), plus extensive `src/app/api/*`
- **Production-ready (substantive narrative + wired UI)**: **~26** — pathway stage pages, audience offer pages, about/contact/pricing, evidence/voices, toolkit, field-guide safety landing, etc.
- **Placeholder / thin / misaligned copy vs stated product** (**~5–7**) — `/field-guide` long-form page (explicit artwork placeholder), `/library` (hardcoded demo cards, not CMS/DB), duplicate funnel surfaces (`/toolkit` vs `/field-guide/safety` vs pathway `#field-guide`), on-page field guide page counts still say “16 pages” while product is now larger volumes
- **Pruning candidates**: **30+** discrete signals (archived trees, unused components, redirects to missing routes, sitemap gaps, legacy nav files) — see consolidated section
- **Critical gaps**: **8** ranked — see **Critical Gaps**

---

## Category One: Pathway Pages

### Route: `/pathway`

- **Status**: Production-ready (overview template; less ornate than stage pages)
- **File path**: `src/app/(site)/pathway/page.tsx`
- **Linked from**: `src/components/nav/site-header.tsx` (“Movemental Path” mega-menu + mobile), internal pathway links, `src/components/sections/pricing/pricing-page-content.tsx` (indirect via stage CTAs), `src/components/studio/hero/TopographicHero.tsx`
- **Key components used**: `src/components/pathway/pathway-overview-template.tsx`
- **Notes**: Links to `/field-guide/safety` for “Read the Field Guide first.” Does not use `FieldGuideSeriesMast` / `FieldGuideAuthorBios` (those appear only on Safety).
- **Pruning flags**: Overlaps narratively with `/path` (see below). Not listed in `src/app/sitemap.ts` (gap / oversight).

### Route: `/pathway/safety`

- **Status**: Production-ready (explicit TODO for testimonial quote — see Notes)
- **File path**: `src/app/(site)/pathway/safety/page.tsx`
- **Linked from**: Header pathway menu, footer (via “Field guide” / pricing elsewhere), `pathway-overview-template`, pricing stage card, home mocks, toolkit page
- **Key components used**: `src/components/studio/pages/pathway/SafetyPage.tsx` → `PathwayStageRail`, `PathwayVoiceFallback`, `FieldGuideSeriesMast`, `FieldGuideAuthorBios`, `ToolkitDownloadForm`, `ToolkitCover`
- **Notes**: Comment at testimonial block: replace Movemental claim with real customer quote when available (`SafetyPage.tsx`). Field guide section copy references “sixteen-page” guide — likely stale vs current PDF length. `FieldGuideAuthorBios` only wired here, not other stages.
- **Pruning flags**: None for the route itself; watch stale page-count copy.

### Route: `/pathway/sandbox`

- **Status**: Production-ready
- **File path**: `src/app/(site)/pathway/sandbox/page.tsx`
- **Linked from**: Header pathway menu, mobile nav, pathway overview, pricing, Safety page CTA
- **Key components used**: `src/components/studio/pages/pathway/SandboxPage.tsx` — same pattern as Safety (rail, voices, `ToolkitDownloadForm` with `source="pathway-sandbox-field-guide"`)
- **Notes**: No `FieldGuideSeriesMast` on this stage in code. Sandbox PDF path is declared in `src/lib/sandbox-field-guide.ts` but **no matching file under `public/downloads/`** in repo (only Safety PDF present) — **likely broken download** if email/API paths rely on that static asset.
- **Pruning flags**: Related unused component: `src/components/pathway/sandbox-field-guide-gate.tsx` (**never imported**) — SafeStart attestation UI, candidate for removal or future wiring.

### Route: `/pathway/skills`

- **Status**: **Exists — production-ready** (full studio page)
- **File path**: `src/app/(site)/pathway/skills/page.tsx`
- **Linked from**: Header pathway menu, mobile nav, pathway overview, pricing, Sandbox page CTA
- **Key components used**: `src/components/studio/pages/pathway/SkillsPathwayPage.tsx` — `PathwayStageRail`, `PathwayVoiceFallback`, `ToolkitDownloadForm` (`source="pathway-skills-field-guide"`)
- **Notes**: **Permanent redirect**: `/skills` → `/pathway/skills` (`next.config.ts`). Legacy names `/pathway/fluency` → `/pathway/skills`.
- **Pruning flags**: None.

### Route: `/pathway/solutions`

- **Status**: Production-ready
- **File path**: `src/app/(site)/pathway/solutions/page.tsx`
- **Linked from**: Header pathway menu, mobile nav, pathway overview, pricing
- **Key components used**: `src/components/studio/pages/pathway/SolutionsPathwayPage.tsx` — includes field-guide section with `ToolkitDownloadForm` (`source="solutions-pathway-page"`); links to `/field-guide`
- **Notes**: Legacy `/pathway/build` → `/pathway/solutions`.
- **Pruning flags**: Uses default `ToolkitCover` / Safety-oriented copy in field-guide band (“It Starts With Safety… sixteen-page”) — **conceptual mismatch** for Stage 04 (content QA, not routing).

### Duplicate / alternate surfaces (same conceptual territory)

| Route | File path | Role |
|-------|-----------|------|
| `/path` | `src/app/(site)/path/page.tsx` | Sister narrative to field guide (see `path-content.tsx` comment) — **not** the same component as `/pathway` |
| `/start-with-safety` | `src/app/(site)/start-with-safety/page.tsx` | Additional Safety/onboarding marketing surface |
| `/toolkit` | `src/app/(site)/toolkit/page.tsx` | Safety field guide landing + lead capture |
| `/toolkit/read` | `src/app/(site)/toolkit/read/page.tsx` | Long-form toolkit reading experience |

**Nav/footer**: Individual pathway stages are **not** listed in `SiteFooter`; they **are** in `SiteHeader` mega-menu + mobile. Footer emphasizes `/field-guide` and audience links.

---

## Category Two: Field Guide Pages

### Route: `/field-guides` (series index)

- **DOES NOT EXIST — gap identified.** Canonical surface is **`/field-guide`** (singular), not plural.

### Route: `/field-guide`

- **Status**: **Placeholder / editorial shell** — substantial prose but **explicit hero artwork placeholder** (“TODO artwork”, “[ Artwork Placeholder ]”)
- **File path**: `src/app/(site)/field-guide/page.tsx`
- **Linked from**: **Site footer** (twice), many CTAs across studio + sections (`SiteFooter`, pricing, contact, About, Solutions page, Movement leaders, Training, Technology, FAQ, etc.)
- **Key components used**: `src/components/studio/pages/FieldGuidePage.tsx` (client component)
- **Notes**: Functions as a **single long-scroll “Movemental Path” literary guide**, not a volumes index. Reading time callout (“Fifteen minutes”) may be stale for expanded PDFs.
- **Pruning flags**: Placeholder artwork block; consider merge vs `/path` and pathway `#field-guide` sections when repositioning lead magnets.

### Route: `/field-guide/safety`

- **Status**: Production-ready dedicated landing
- **File path**: `src/app/(site)/field-guide/safety/page.tsx`
- **Linked from**: `pathway-overview-template` (“Read the Field Guide first”); not prominent in footer (footer points to `/field-guide` root)
- **Key components used**: `src/components/field-guide/field-guide-safety-landing.tsx`, `ToolkitDownloadForm` (`source="field-guide-safety-hero"` / footer), metadata from `src/lib/field-guide.ts`
- **Notes**: Distinct from `/pathway/safety` (paid engagement page). Links back to `/pathway/safety` in component.
- **Pruning flags**: None.

### Route: `/field-guide/sandbox`

- **DOES NOT EXIST — gap identified.** Sandbox lead magnet is **only** embedded on `/pathway/sandbox#field-guide` (no series sibling route).

### Lead-magnet form infrastructure

| Mechanism | Path | Behavior |
|-----------|------|----------|
| Primary lead form component | `src/components/toolkit/ToolkitDownloadForm.tsx` | POST **`/api/toolkit-download`** |
| API | `src/app/api/toolkit-download/route.ts` | Inserts into **`newsletter_subscribers`** with `source` prefix `safety-toolkit:*`; **immediate confirm**; sends mail via **`sendSafetyToolkitEmail`** (Resend) |
| General newsletter | `src/components/forms/newsletter-form.tsx` | POST **`/api/newsletter`** — **double opt-in**; requires **`TENANT_ORG_ID`** |

**ESP**: **Resend** (`src/lib/email/resend.ts`, `send-safety-toolkit-email.ts`, contact + newsletter mail paths). Comment in newsletter route: do not duplicate into Resend Audiences without sync plan.

### PDF hosting

- **Safety field guide**: `public/downloads/movemental-it-starts-with-safety-field-guide.pdf` **present**. Canonical path `src/lib/safety-field-guide.ts` → `/downloads/movemental-it-starts-with-safety-field-guide.pdf`. Redirects from legacy URLs in `next.config.ts`.
- **Sandbox field guide**: Code expects `/downloads/movemental-it-continues-with-exploration-field-guide.pdf` — **file not present in repo `public/`** (only Safety PDF + `public/downloads/README.md`). **High risk of 404** for direct links or future sends.
- **Cover images**: Referenced paths under `/images/books/*.webp` — **`public/images` effectively empty** except `brand/brand-mark.svg`; covers likely rely on **deployment assets not committed** or remote URLs — **ambiguous / environment-dependent**.

### Gating logic

- **Implementation exists but unused**: `src/components/pathway/sandbox-field-guide-gate.tsx` — SafeStart email attestation copy; **no imports** elsewhere → **no active gating** in production tree.
- **Auth**: `proxy.ts` refreshes Supabase session; **dashboard/onboarding** segments gated; **public marketing routes are not auth-gated**.

### Old / parallel field guide artifacts

- **Archived articles-era**: `src/app/_archive/legacy-site-2026-04-28/(site)/articles/**` (includes sandbox field guide article routes in archive).
- **Canon constant**: `src/lib/canon-routes.ts` → `SSSS_FIELD_GUIDE_PATH = "/articles/ssss-field-guide-for-organizational-leaders"` — **live `/articles` app routes do not exist** → **404 if linked**.
- **HTML mock**: `src/components/sections-mock/field-guide/field-guide-content.tsx` (mock lineage — verify nothing routes to it directly).
- **Markdown corpus**: `src/content/field-guide/it-starts-with-safety.md`, `src/lib/field-guide.ts` (`CONTENT_DIR`) — powers structured field guide data for safety landing, not a public MDX route by itself.

---

## Category Three: Audience Pages

**Important**: There is **no `/audiences/*` segment**. Footer and nav use **flat routes**.

### Route: `/churches`

- **Status**: Production-ready
- **File path**: `src/app/(site)/churches/page.tsx`
- **Linked from**: `SiteFooter`, `SiteHeader` Audiences dropdown (desktop only — movement leaders **not** in header dropdown)
- **Key components used**: `src/components/audience/AudienceOfferPage.tsx` + `src/components/case-study/data/churches.ts`
- **Notes**: Tailored segment copy via `audience-offer-copy.tsx`; embedded **reconstructed case study** narrative (FAQ references this as “case studies” location).
- **Pruning flags**: Archived sibling pages under `src/app/_archive/audience-pages-2026-05-08/` (`for-churches`, etc.) — archival candidates only.

### Route: `/nonprofits`

- **Status**: Production-ready
- **File path**: `src/app/(site)/nonprofits/page.tsx`
- **Linked from**: Footer, header Audiences dropdown
- **Key components used**: `AudienceOfferPage` + `nonprofitsCaseStudy`
- **Notes**: Same pattern as churches.

### Route: `/institutions`

- **Status**: Production-ready
- **File path**: `src/app/(site)/institutions/page.tsx`
- **Linked from**: Footer, header Audiences dropdown
- **Key components used**: `AudienceOfferPage` + `institutionsCaseStudy`

### Route: `/movement-leaders`

- **Status**: Production-ready (studio page)
- **File path**: `src/app/(site)/movement-leaders/page.tsx`
- **Linked from**: **Footer only** (not in header Audiences dropdown — aligns with doctrine: distinct ecosystem layer)
- **Key components used**: `src/components/studio/pages/MovementLeadersPage.tsx`
- **Notes**: Uses `/field-guide` CTAs; framing is definition + fit per repo rules.

### Route: `/who-we-serve`

- **Status**: Exists (hub)
- **File path**: `src/app/(site)/who-we-serve/page.tsx` (not deeply traced in this pass — studio `WhoWeServePage`)
- **Linked from**: `nav-config.ts` **PRIMARY_NAV** — but **`SiteHeader` does not import `nav-config.ts`** (uses inline IA). **Verify**: “Who we serve” may be **orphaned from primary chrome** if only footer lists audiences.
- **Pruning flags**: If `/who-we-serve` is unreachable from `SiteHeader`, flag as **unlinked primary route** (confirm during UX pass).

---

## Category Four: Authority / EEAT Pages

### Route: `/about`

- **Status**: Production-ready
- **File path**: `src/app/(site)/about/page.tsx`
- **Linked from**: Header, footer
- **Key components used**: `src/components/sections/about/about-page-content.tsx` — **founder bios inline** (Brad Brisco, Alan Hirsch, Joshua Shepherd) with external links; no separate `/team`
- **Notes**: **`/team` → `/about` permanent redirect** (`next.config.ts`).

### Route: `/team` or `/people`

- **No dedicated page** — **redirects to `/about`**.

### Author bio pages (standalone `/about/brad-brisco`, etc.)

- **DOES NOT EXIST — gap identified.** Bios live **only** as sections inside `/about`.

### Route: `/voices`

- **Status**: Production-ready (trusted voices / credibility)
- **File path**: `src/app/(site)/voices/page.tsx` → `VoicesPage.tsx` (Supabase-hosted imagery URLs in data)

### Route: `/evidence`

- **Status**: Exists (proof / credibility — studio page)
- **File path**: `src/app/(site)/evidence/page.tsx`

### Route: `/research`, `/field-papers`, `/publications`

- **No dedicated app routes found** under `(site)`.
- **Research corpus** lives in **`docs/research/**`** and **`src/lib/citations/sources.ts`** feeds **footnotes / claims** — not a public “research hub” route.
- **DOES NOT EXIST — gap identified** for housing “AI Has Already Arrived” and future papers as browsable IA.

### Route: `/case-studies`

- **No page** — **`next.config.ts` redirects `/case-studies` → `/faq`**. Case study content is **embedded in audience pages**, not a standalone index.

### Route: `/library`

- **Status**: **Thin / demo** — hardcoded `LIBRARY_ITEMS` cards in `LibraryPage.tsx`, not wired to DB/content layer
- **File path**: `src/app/(site)/library/page.tsx`
- **Linked from**: Footer

### Route: `/articles` or article slug routes

- **DOES NOT EXIST** in live `src/app/(site)/` — **archived** under `_archive/legacy-site-2026-04-28/(site)/articles/**`.
- **Broken IA risk**: `next.config.ts` redirects **`/blog` → `/articles`** → **404** on current tree. **`canon-routes` field guide URL** also targets missing `/articles/...`.

### Route: `/press` or `/media-kit`

- **DOES NOT EXIST — gap identified.**

---

## Category Five: Operational Pages

### Route: `/contact`

- **Status**: Production-ready
- **File path**: `src/app/(site)/contact/page.tsx`
- **Form**: `ContactConversationForm` → **`POST /api/contact`** (`src/app/api/contact/route.ts`) — validates with Zod, inserts **`contact_submissions`**, sends **`notifyContactInbox` + `sendContactSubmitterAck`** via Resend (best-effort if keys missing)
- **Linked from**: Header CTA, footer, multiple CTAs

### Route: `/pricing`

- **Status**: Production-ready — **this is the closest thing to a published SafeStart vs Sandbox comparison table** (four stage cards + Path Bundle + institutional notes). **No route named `/engagements`.** Labels use **Safety / Sandbox / Skills / Solutions**, not necessarily “SafeStart” / “SandboxLive” product names verbatim.
- **File path**: `src/app/(site)/pricing/page.tsx`
- **Also embeds**: `NewsletterForm` (general double opt-in)

### Route: `/newsletter`

- **DOES NOT EXIST** as a standalone marketing page — signup is **component-embedded** (`NewsletterForm`) and **API-backed** (`/api/newsletter`).

### Route: `/privacy`

- **Status**: Exists — **studio** `PrivacyPage` via `(site)/privacy/page.tsx` (not audited line-by-line for legal freshness)

### Route: `/terms`

- **Status**: Exists — `(site)/terms/page.tsx`

### Route: `/cookies`

- **Status**: Exists — `(site)/cookies/page.tsx`

### Post-purchase / paid customer onboarding routes

- **`/onboarding/cohort`**, **`/onboarding/payment`**, **`/onboarding/agreement`** (`src/app/(dashboard)/onboarding/*`)
- **`/welcome`**, **`/dashboard`**
- **`/admin/onboarding`** (admin tooling)
- Extensive **`src/app/api/onboarding/*`** surface

### Other operational / edge routes

- **`/login`** — Supabase magic link (`src/app/(site)/login/page.tsx`)
- **`/safety/sign`** — Safety engagement signing UI (`src/app/(site)/safety/sign/page.tsx`) — likely deep-linked from sales ops (not in main nav)

---

## Pruning Recommendations

Grouped as requested.

### Unlinked or weakly linked routes

- **`/who-we-serve`** — linked from legacy `nav-config.ts` but **not** from `SiteHeader` / `SiteFooter` (confirm and either wire or deprecate).
- **Pathway subtree** (`/pathway`, `/pathway/safety`, …) — **missing from `src/app/sitemap.ts`** despite being primary IA.
- **`/field-guide/safety`** — only strongly linked from pathway overview; footer goes to `/field-guide` root — consider intentional or fix cross-links.

### Duplicate implementations

- **Lead capture**: Single shared **`ToolkitDownloadForm`** + **`/api/toolkit-download`** (good), but **many competing destinations** (`/toolkit`, `/field-guide/safety`, pathway anchors, nav modal “FIELD GUIDE”) — strategic consolidation candidate.
- **Path narrative**: **`/path`** vs **`/pathway`** vs literary **`/field-guide`** — three lenses on the same story.
- **Pricing vs pathway**: Both repeat stage explanations — acceptable but easy to drift.

### Old / deprecated naming / archive trees

- **`src/app/_archive/**`** — large legacy route trees (**do not serve** in production router — verify Next ignores; still repo weight).
- **`src/components/_archive/**`** — old Safety page, audience full-scroll, about pre-rewrite, etc.
- **`src/components/nav/nav-links.ts`** — explicitly **NOT wired** to live site; **`mobile-nav.tsx`** same — confusion hazard for contributors.
- **`next.config.ts`** redirects to **missing** routes: **`/organizations`** (`/who-its-for`), **`/fragmentation`** (multiple sources), **`/articles/**`** (`/blog`, content/articles); **`/book/read/*`** → `/book` but **`/book` page not in live `(site)`** — **redirect chains may land on 404**.

### Unused assets / broken references

- **Sandbox PDF** — referenced in code, **absent from `public/downloads/`** in repo.
- **`/images/books/*.webp`** — referenced for OG/covers; **not present under `public/images`** in this checkout (only `public/images/brand/brand-mark.svg`).
- **`src/components/pathway/sandbox-field-guide-gate.tsx`** — **zero imports** — dead code candidate.

### Placeholder content

- **`FieldGuidePage.tsx`** — hero **TODO artwork**.
- **`SafetyPage.tsx`** — testimonial **TODO** + possible stale **page count** (“sixteen-page”).
- **`LibraryPage.tsx`** — **fixture data**, not production CMS.

---

## Critical Gaps

Ranked for the stated strategy (field guides as primary lead magnet; paid engagements second).

1. **`/field-guides` series index** (or equivalent) listing **all volumes** with clear download CTAs — **missing**; `/field-guide` is literary, not a catalog.
2. **Dedicated `/field-guide/sandbox` landing** — **missing**; Sandbox magnet only on pathway page.
3. **`/articles` / canonical long-form host** — **missing** while redirects and **`canon-routes` still point at `/articles/...`** — **broken links** risk anywhere those constants survive.
4. **Standalone **author bio URLs**** for EEAT — **missing** (only inline on `/about`).
5. **Research / publications hub** — **missing** for papers like “AI Has Already Arrived.”
6. **Sandbox PDF + cover assets** in **`public/`** (or documented CDN policy) — **incomplete** in repo.
7. **Unified “lead magnet” analytics/source taxonomy** — multiple `source` strings; acceptable technically but easy to fragment reporting.
8. **`/newsletter` landing** — optional but **no standalone explainer** page for double opt-in list (only embedded forms).

---

## Infrastructure Observations

- **Form handling**: Contact → Postgres **`contact_submissions`** + Resend notifications. Toolkit download → **`newsletter_subscribers`** + immediate Resend transactional send. Newsletter → **`newsletter_subscribers`** + confirmation token flow.
- **ESP**: **Resend** throughout; env validation per `src/lib/env.ts` / CLAUDE.md.
- **Database**: Drizzle + Postgres; subscriber and contact tables used by APIs above. Marketing **library** page **not** DB-driven.
- **Auth**: Supabase; **`proxy.ts`** session refresh; **dashboard/onboarding** shell gated — **marketing pages public**.
- **PDF hosting**: **Safety** PDF in **`public/downloads`**; **Sandbox** PDF **not committed**; email templates link to site URL + path.

---

## Anything Else Worth Knowing

- **Navigation split-brain**: Live chrome is **`site-header.tsx` + `site-footer.tsx`**. **`nav-config.ts`, `nav-links.ts`, `mobile-nav.tsx`** are largely **historical / unused** — easy to cargo-cult wrong links.
- **Studio vs primitives**: Many pages use **`components/studio/pages/*`** (AI Studio lineage); others use **`components/sections/*`** — mixed patterns; migration mid-flight.
- **`SiteHeader` Audiences dropdown** omits **movement leaders** (footer includes them) — intentional per doctrine doc in CLAUDE.md.
- **Toolkit modal**: Nav “FIELD GUIDE” opens **`useToolkitModal`** — parallel entry to `/toolkit` page.
- **Content drift signal**: Multiple places still say **16 pages** for Safety field guide; product reality described as **33 / 48 pages** — requires coordinated copy pass.
- **Redirect hazards**: Legacy SEO/book/blog URLs may **301 into 404s** until `/book`, `/articles`, `/fragmentation`, `/organizations` are restored or redirects retargeted.

---

*End of audit — 2026-05-11.*
