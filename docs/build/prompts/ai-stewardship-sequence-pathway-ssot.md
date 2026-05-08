# AI Stewardship Sequence & Pathway — live pages and single sources of truth

**Purpose:** Inventory every **public route** and **code/content SSOT** that relates to the four-stage framework (**Safety → Sandbox → Skills → Solutions**), the **Movemental AI Path**, **pathway** engagement surfaces, **published pricing** (Sandbox Season zones + pathway SKU numbers), and adjacent “sister” pages (field guide, start-with-safety, training, technology). Use this when editing copy, pricing, or IA so you know **where truth lives** and where it **forks**.

**Authority:** If this file disagrees with the repo, **the repo wins** — update this doc in the same PR.

**Last verified against repo:** 2026-05-08 (paths under `src/app/(site)/`, `next.config.ts`, `src/components/studio/pages/**`, `src/components/sections/**`, `src/components/sections-mock/**`).

---

## 1. Naming and global SSOT

| Topic | Where it is defined |
| ----- | ------------------- |
| Public framework name | **AI Stewardship Sequence** — four ordered stages; see `docs/arguments/SITE-SSOT.md` §3 and §12. |
| User-visible “field guide” URL constant | `src/lib/canon-routes.ts` — `SSSS_FIELD_GUIDE_PATH` → `/articles/ssss-field-guide-for-organizational-leaders` (constant name is historical; label in UI is “AI Stewardship Sequence field guide”). |
| Book hub path | `BOOK_HUB_PATH` in `src/lib/canon-routes.ts` → `/book`. |
| Broader site IA + legacy crosswalk | `docs/arguments/SITE-SSOT.md`, `docs/build/notes/site-pages-architecture-and-navigation-map.md`. |
| Movement-leader doctrine (not a fourth audience card) | `docs/build/strategy/movement-leaders-as-ecosystem-layer.md`. |

Acronym-first naming (`SSSS`, `4S`) in **new** copy is deprecated; internal routes and folders may still use `ssss-*` for stability.

---

## 2. Canonical pathway routes (stage detail pages)

All live under the `(site)` route group; URLs **omit** `(site)`.

| Public URL | `page.tsx` | Primary UI component (SSOT for that page’s layout + copy) | Default `metadata` title (from page) |
| ---------- | ---------- | ------------------------------------------------------------ | ------------------------------------- |
| `/pathway` | `src/app/(site)/pathway/page.tsx` | `PathwayOverviewPage` → `src/components/studio/pages/PathwayOverviewPage.tsx` | “The Pathway” |
| `/pathway/safety` | `src/app/(site)/pathway/safety/page.tsx` | `SafetyPage` → `src/components/studio/pages/pathway/SafetyPage.tsx` | Safety Documentation |
| `/pathway/sandbox` | `src/app/(site)/pathway/sandbox/page.tsx` | `SandboxPage` → `src/components/studio/pages/pathway/SandboxPage.tsx` | Sandbox Discovery |
| `/pathway/skills` | `src/app/(site)/pathway/skills/page.tsx` | `SkillsPathwayPage` → `src/components/studio/pages/pathway/SkillsPathwayPage.tsx` | Stage 03: Skills Development |
| `/pathway/solutions` | `src/app/(site)/pathway/solutions/page.tsx` | **`TechnologyPage`** → `src/components/studio/pages/TechnologyPage.tsx` | Solutions Deployment |

**Content model:** Stage pages (`SafetyPage`, `SandboxPage`, `SkillsPathwayPage`) and `TechnologyPage` are **self-contained React** — prose, FAQs, and structured blocks live in those files (not in `docs/articles/` and not in the DB).

**Pathway overview economics + deliverables:** `PathwayOverviewPage.tsx` defines `commonDeliverables` and `overviewPathwayStops` (duration, price, outcome, `href` per stage). That file is the **richest SSOT** for the four-stop table including **deliverable lists**.

---

## 3. Alternate URLs that render the same (or overlapping) stage

### 3.1 Duplicate render: Solutions / Technology

| URL | Component |
| --- | --------- |
| `/pathway/solutions` | `TechnologyPage` |
| `/technology` | `TechnologyPage` |

Both `src/app/(site)/pathway/solutions/page.tsx` and `src/app/(site)/technology/page.tsx` import the same `TechnologyPage`. **Metadata `description` strings differ slightly** between the two wrappers — align them deliberately when you change positioning.

**Internal links:** The home page pathway band still sends stage 04 to `/technology` (not `/pathway/solutions`); the Pathway overview sends stage 04 to `/pathway/solutions`. See §6.

### 3.2 Training (narrative) vs Pathway Skills (offering) — relationship

| URL | Component | Role |
| --- | --------- | ---- |
| `/training` | `TrainingPage` → `src/components/studio/pages/TrainingPage.tsx` | Long-form “AI training for mission-driven organizations” — frames **Training = Stage 03: Skills**; educates buyers on why generic AI training fails mission orgs; CTAs to **`/pathway/skills`** and **`/field-guide`**. |
| `/pathway/skills` | `SkillsPathwayPage` | Stage 03 **offering** page — product narrative, cohort/pricing, deliverable tone. |

These are **complementary**, not redirects. Content SSOT is **split** across the two components.

### 3.3 Training page (`/training`) — route and component SSOT

| Item | Location |
| ---- | -------- |
| **App route** | `src/app/(site)/training/page.tsx` — server `metadata` (title + description). |
| **UI SSOT** | `src/components/studio/pages/TrainingPage.tsx` (**client** — `"use client"`). All prose, lists, and CTAs are **inline** in this file. |

**In-component data** (edit here only — not shared imports except UI primitives):

- **`buyersMeanCards`** — four cards (“What buyers usually mean by AI training”: Workshops, Courses, Certifications, Bootcamps).
- **`whereWorks` / `whereFallsShort`** — bullet lists comparing generic training vs mission context.
- **`movementalEight`** — eight labeled pillars (Governance … Gov Refresher) for the “What Movemental does instead” grid.
- **`guidanceCards`** — four contextual CTAs mapping readiness → **`/pathway/safety`**, **`/pathway/sandbox`**, **`/pathway/skills`**, **`/pathway/solutions`**.

**Client title override:** `useEffect` sets `document.title = "AI Training for Mission-Driven Organizations | Movemental"` — keep in sync with `metadata.title` in `training/page.tsx`.

**Outbound links:** Primary stage CTA **`/pathway/skills`**; secondary **`/field-guide`**; final band **`/contact`** + **`/field-guide`**. Includes a quoted stat with source line **“Virtuous-2026”** — verify sourcing if that string is public-facing.

**Discovery:** Not linked from **`SiteHeader`**’s Pathway mega-menu (that menu jumps straight to stage URLs). Entry is typically **direct URL**, **in-page links** from other studio pages, or bookmarks.

### 3.4 Technology / Solutions page (`/technology` and `/pathway/solutions`) — route and component SSOT

| Item | Location |
| ---- | -------- |
| **App routes** | `src/app/(site)/technology/page.tsx` and `src/app/(site)/pathway/solutions/page.tsx` — both render the **same** component; **`metadata.description`** differs slightly between files (integration/activation vs CMS/LMS wording). |
| **UI SSOT** | `src/components/studio/pages/TechnologyPage.tsx` (**client**). Entire Stage 04 narrative: readiness, capabilities, pricing band, build phases, live-build examples. |

**In-component data** (all in `TechnologyPage.tsx`):

- **`capabilities`** — five rows: Custom Agentic CMS, Integrated LMS, Relational Intelligence (CRM), AI Lab, Network Linking.
- **Readiness grid** — inline four-cell array (Safety / Sandbox / Skills / Executive alignment).
- **Foundation strip** — six icon tiles (Content Pipeline … CRM/Voice Intake) plus a **seventh tile** link to **`/technology#capabilities`** (anchor **must** stay aligned with `id="capabilities"` on the capabilities section).
- **`buildPhases`** — Integration → Multiplication with “typical timing” copy (table in the dark CTA section).
- **Pricing transparency block** — headline numbers: **from $30,000** (single-org build), **from $60,000** (network engagements), **$2,000–$8,000/mo** (subscription). These are **Stage-04-specific**; they **do not** live in `sandbox-season-data.tsx` (Sandbox Season zone table is a different offering — see §7).

**Outbound links:** **`/contact?interest=solutions`**, **`/contact?interest=Build`**, **`/contact?interest=Walkthrough`**, **`/field-guide`**, external **`https://alanhirsch.com`** (live-build demos).

**Foundation → capabilities link:** The “See capabilities & live builds” tile uses **`href="/technology#capabilities"`** (absolute path, not `#capabilities` alone). On **`/pathway/solutions`**, that click **navigates to `/technology#capabilities`** — same React tree, **URL changes** to the `/technology` route. Use relative **`#capabilities`** instead if you ever need to stay on **`/pathway/solutions`** without a route change.

**Client title override:** `document.title = "Solutions & Technology | Movemental"` — does **not** match the Next `metadata.title` (“Solutions Deployment”) from either wrapper; align deliberately.

**Design note:** File header comment references Stitch lineage: `stitch_movemental_system_builder/stage_04_solutions_refined_layout`.

### 3.5 Legacy pathway segment names → `next.config.ts`

Permanent redirects (selected):

| Legacy path | Canonical destination |
| ----------- | ---------------------- |
| `/pathway/foundations`, `/pathway/foundations/*` | `/pathway/safety`, `/pathway/safety/*` |
| `/pathway/lab`, `/pathway/lab/*` | `/pathway/sandbox`, `/pathway/sandbox/*` |
| `/pathway/fluency`, `/pathway/fluency/*` | `/pathway/skills`, `/pathway/skills/*` |
| `/pathway/build`, `/pathway/build/*` | `/pathway/solutions`, `/pathway/solutions/*` |

See comments in `next.config.ts` near the “Pathway stage rename” block.

---

## 4. Sister surfaces — “path” story without booking the pathway SKUs

| Public URL | `page.tsx` | Content SSOT | Relationship to framework |
| ---------- | ---------- | ------------- | ------------------------- |
| `/path` | `src/app/(site)/path/page.tsx` | `PathContent` → `src/components/sections-mock/path/path-content.tsx` | Structured editorial explainer: tension → overview → **per-stage deep dives** → order → CTA. Uses recipe/CSS from `src/app/recipes.css`. |
| `/start-with-safety` | `src/app/(site)/start-with-safety/page.tsx` | `StartWithSafetyContent` → `src/components/sections-mock/start-with-safety/start-with-safety-content.tsx` | Positioning and rationale for **Safety-first**; parallel **recipe** stack to `/path`. |
| `/field-guide` | `src/app/(site)/field-guide/page.tsx` | `FieldGuidePage` → `src/components/studio/pages/FieldGuidePage.tsx` | Studio **long-scroll** field guide (TOC, prose sections per stage). **Not** the same file as the markdown article (§5). |

`/path`’s source file describes `/field-guide` as a “sister surface” to the structured `/path` page — both explain the sequence in different modes (scannable path vs field-guide experience).

---

## 5. Article library (markdown) — doctrine and long-form

Mounted via `src/lib/articles.ts` from `docs/articles/**/*.md`.

| Artifact | File | Public URL |
| -------- | ---- | ------------ |
| AI Stewardship Sequence field guide (article) | `docs/articles/ssss-field-guide-for-organizational-leaders.md` | `/articles/ssss-field-guide-for-organizational-leaders` |
| Framework article | `docs/articles/the-ssss-framework.md` | `/articles/the-ssss-framework` |
| Journey assessment checklist (article) | `docs/articles/the-ssss-journey-assessment-checklist.md` | `/articles/the-ssss-journey-assessment-checklist` |

**SSOT split:** Nav/footer constants point organizational leaders at the **article** URL above (`canon-routes.ts`). The **studio page** `/field-guide` is a separate designed surface in `FieldGuidePage.tsx`. Updating one does **not** update the other — coordinate manually.

---

## 6. Homepage, segments, and data modules (drift risks)

These are **not** a single import chain — copy/paths can diverge:

| Surface | File | What can drift |
| ------- | ---- | -------------- |
| Home — pathway band | `src/components/studio/pages/HomePage.tsx` | `homePathwayStops`: stage 04 **`href` is `/technology`** while `PathwayOverviewPage` uses **`/pathway/solutions`**. Duration string for stage 04 uses an **en-dash** (`8–12`) in Home vs **hyphen** in overview (`8-12`). |
| Pathway overview | `PathwayOverviewPage.tsx` | `overviewPathwayStops` + `commonDeliverables` — canonical **full** deliverable lists. |
| Interactive / definition data | `src/data/home-data.ts` | `INTERACTIVE_PATH_STAGES` — stage definitions, work products, definition-of-done, if-skipped (used for **path education** UX; wording may differ from studio pathway pages). |
| Audience Stitch segments | `src/components/studio/segment/SegmentPathway.tsx` | Church/nonprofit/institution pathway FAQ + CTAs; repeats pricing/step framing. |
| Stage 04 detail pricing | `TechnologyPage.tsx` | **Pricing transparency** section ($30K / $60K / $2–8K mo) is **only** in this file — compare to **`overviewPathwayStops`** headline (**from $30,000** Solutions) and **`HomePage`** pathway row so public numbers stay consistent. |
| Stage 03: Training vs Skills pages | `TrainingPage.tsx` vs `SkillsPathwayPage.tsx` | Same stage, different jobs (`/training` vs `/pathway/skills` copy, cohort numbers, pricing lines — cross-check when either changes). |
| Legacy marketing sections | `src/components/sections-mock/churches/churches-content.tsx` | Overlapping “Safety Documentation” language. |
| Shared entry copy | `src/components/marketing/path-shared/` | Small shared strings and `PathwayComponent` usage patterns. |

**Operational rule:** When changing **prices, durations, outcomes, or stage URLs**, check **HomePage**, **PathwayOverviewPage**, **SegmentPathway**, **`TechnologyPage`** (Solutions deployment + subscription bands), **`TrainingPage`** / **`SkillsPathwayPage`** for Stage 03, and any **segment** pages that quote the four-stop sequence.

**Sandbox Season zone fees (revenue-band table):** The numeric **zone** fees (`Small` / `Mid` / `Large` / `Enterprise`) and payment schedules are defined once in `src/components/sections/services-sandbox-season/sandbox-season-data.tsx` as **`pricingZones`**. **Sandbox Season** marketing UI imports that module. The public **`/pricing`** page uses **separate** published stage and bundle economics—see §7.2—and does **not** import **`pricingZones`**.

---

## 7. Pricing page and engagement economics SSOT

Published economics split into **two families**: (A) **AI Stewardship Sequence pathway SKUs** (Safety / Sandbox / Skills / Solutions — concise headline numbers on home and pathway pages), and (B) **Sandbox Season** engagements (**zone-based** fixed fees).

### 7.1 Sandbox Season — zone table (code SSOT)

| Item | Location |
| ---- | -------- |
| **`pricingZones`** (all four zones, including **Enterprise**) | `src/components/sections/services-sandbox-season/sandbox-season-data.tsx` |
| **`pricingZonesStandard`** | Same file — **filter** of `pricingZones` **excluding** `Enterprise` (used where only Small/Mid/Large appear). |
| **Planning / product SSOT (human-authored)** | Per file header comment in `sandbox-season-data.tsx`: **`docs/movemental-offering/03-sandbox-playbook.md`** and **`docs/movemental-offering/04-engagement-design.md`** — keep types + numbers in the TS module aligned when those docs change. |

### 7.2 Full pricing page UI (composition SSOT)

| Item | Location |
| ---- | -------- |
| **`PricingPageContent`** | `src/components/sections/pricing/pricing-page-content.tsx` — six sections: Hero, five offering cards (four stages + Path Bundle), network/institutional engagements, payment/terms/discounting, where to start (standard CTAs), newsletter. |
| **Route** | `src/app/(site)/pricing/page.tsx` |
| **Numbers / copy** | **Inline** in `PricingPageContent` (no `pricingZones` import). Published fees align with stage naming: Stage 01–04 and Path Bundle; narrative CTAs include `/field-guide`, `/assess`, `/contact` with `interest=` query variants on card CTAs. |

### 7.3 Sandbox Season detail page (partial zone table)

| Item | Location |
| ---- | -------- |
| **`SandboxSeasonPageContent`** (or equivalent export) | `src/components/sections/services-sandbox-season/sandbox-season-page-content.tsx` |
| **Zones shown** | Maps **`pricingZonesStandard`** (no Enterprise row); copy directs readers to **“Open full pricing table”** → **`/pricing`**. |

### 7.4 Pathway SKU headline numbers (separate from Sandbox Season zones)

Stage-level fees such as **$5,000** (Safety), **$15,000** (Sandbox Discovery), **from $4,800/yr** / **$15,000** (Skills — varies by surface), **from $30,000** (Solutions) live in **studio** components, not in `sandbox-season-data.tsx`:

| Surface | File(s) |
| ------- | ------- |
| Pathway overview table | `PathwayOverviewPage.tsx` — `overviewPathwayStops` |
| Home pathway band | `HomePage.tsx` — `homePathwayStops` |
| Audience segments | `SegmentPathway.tsx` |
| Stage detail pages | `SafetyPage.tsx`, `SandboxPage.tsx`, `SkillsPathwayPage.tsx`, `TechnologyPage.tsx` (inline where repeated). |
| **Solutions — build / subscription detail** | **`TechnologyPage.tsx`** only — **Pricing transparency** block (single-org build, network engagements, ongoing subscription). Not duplicated in `PathwayOverviewPage` deliverables table. |

Changing a headline pathway number requires the same **multi-file sweep** as §6; do not assume the Sandbox Season zone table is the only place money appears. Updating Solutions **build economics** almost always means editing **`TechnologyPage.tsx`** and reconciling with **`overviewPathwayStops`** / **home pathway** row **from $30,000** language.

### 7.5 Route status: `/pricing`

**Live:** `src/app/(site)/pricing/page.tsx` renders **`PricingPageContent`**. An older archived composition may still exist under **`src/app/_archive/legacy-site-2026-04-28/(site)/pricing/page.tsx`** for reference only.

**Strategic reference:** `docs/build/notes/movemental-master-talking-points-index.md` — public numbers should match **`/pricing`** and the stage tables in studio pages where those surfaces quote the same SKUs.

### 7.6 FAQ and internal links

`src/components/sections/faq/faq-data.ts` references **`/pricing`** in multiple FAQ entries — keep FAQ, zone data, and pathway headline numbers coherent when economics change.

---

## 8. Live primary navigation (pathway)

The root layout (`src/app/layout.tsx`) mounts **`SiteHeader`** (`src/components/nav/site-header.tsx`). The Pathway dropdown there is the **live** IA for:

- `/pathway`
- `/pathway/safety`
- `/pathway/sandbox`
- `/pathway/skills`
- `/pathway/solutions`

`src/components/nav/nav-config.ts` defines an alternate IA (e.g. flat “The Path” → `/path`) for legacy/other shells; **`mobile-menu.tsx`** still imports `PRIMARY_NAV` from `nav-config` — confirm which mobile component the layout actually uses before assuming nav parity.

`src/components/nav/nav-links.ts` is explicitly **not wired** into the live shell (see file header comment) but remains a reference for older footers / audits.

**Desktop vs mobile:** In `SiteHeader`, the desktop Pathway dropdown lists **all four** stages. The **mobile** drawer links to `/pathway` plus, under “Products,” only **`/pathway/skills`** and **`/pathway/solutions`** — it does **not** list Safety or Sandbox as direct links (users reach them via `/pathway` or other entry points).

---

## 9. Assessments and integrity tools (related, not pathway marketing pages)

| Concern | SSOT |
| ------- | ---- |
| Integrity assessment implementation | `src/lib/ssss-integrity-assessment/`, API routes under `src/app/api/assess/` (see `SITE-SSOT.md` §7–8, §12). |
| Public assess hub | `src/app/(site)/assess/page.tsx` (not re-listed here — see site route map docs). |

These validate **sequence integrity**; they are not substitutes for the pathway SKU pages in §2.

---

## 10. Sitemap and SEO note

`src/app/sitemap.ts` lists a **subset** of marketing routes (e.g. `/path`, `/start-with-safety`, `/field-guide`). It does **not** enumerate **`/pathway` or the four stage URLs** at the time this doc was written. If SEO completeness matters, align `ROUTES` with `src/app/(site)/**/page.tsx` deliberately.

---

## 11. Reference index — file paths only

| Area | Paths |
| ---- | ----- |
| Pathway app routes | `src/app/(site)/pathway/page.tsx`, `.../safety/page.tsx`, `.../sandbox/page.tsx`, `.../skills/page.tsx`, `.../solutions/page.tsx` |
| Studio pathway pages | `src/components/studio/pages/PathwayOverviewPage.tsx`, `src/components/studio/pages/pathway/SafetyPage.tsx`, `SandboxPage.tsx`, `SkillsPathwayPage.tsx`, `src/components/studio/pages/TechnologyPage.tsx` |
| **Training & Technology (Stage 03–04 narrative)** | `src/components/studio/pages/TrainingPage.tsx` (route: `src/app/(site)/training/page.tsx`); `src/components/studio/pages/TechnologyPage.tsx` (routes: `src/app/(site)/technology/page.tsx`, `src/app/(site)/pathway/solutions/page.tsx`) |
| Alternate routes | `src/app/(site)/technology/page.tsx`, `src/app/(site)/training/page.tsx`, `src/app/(site)/path/page.tsx`, `src/app/(site)/start-with-safety/page.tsx`, `src/app/(site)/field-guide/page.tsx` |
| Editorial “recipe” pages | `src/components/sections-mock/path/path-content.tsx`, `src/components/sections-mock/start-with-safety/start-with-safety-content.tsx` |
| **Pricing — full page UI** | `src/components/sections/pricing/pricing-page-content.tsx`; **`src/app/(site)/pricing/page.tsx`** (published stage + bundle economics; no `pricingZones` import) |
| **Pricing — Sandbox Season data** | `src/components/sections/services-sandbox-season/sandbox-season-data.tsx` (`pricingZones`, `pricingZonesStandard`, cohort/timeline/deliverable data); **Sandbox Season** section UI: `sandbox-season-page-content.tsx` (`SandboxSeasonPageContent`) |
| **Pricing — offering docs** | `docs/movemental-offering/03-sandbox-playbook.md`, `docs/movemental-offering/04-engagement-design.md` |
| Redirects | `next.config.ts` → `redirects()` |
| Constants | `src/lib/canon-routes.ts` |
| Articles | `docs/articles/the-ssss-framework.md`, `docs/articles/ssss-field-guide-for-organizational-leaders.md`, `docs/articles/the-ssss-journey-assessment-checklist.md` |
| FAQ links to pricing | `src/components/sections/faq/faq-data.ts` |

---

## 12. Related internal docs (read before large IA changes)

- `docs/arguments/SITE-SSOT.md` — design SSOT, route table, API, naming edge cases.
- `docs/build/notes/site-pages-architecture-and-navigation-map.md` — full static route index and redirect list.
- `docs/build/prompts/strategy-artifacts-placement-and-flow.md` — book vs field guide vs assessments placement.
- `docs/build/prompts/stitch-to-react-migration.md` — if touching Stitch-aligned studio components.
- `docs/build/notes/movemental-master-talking-points-index.md` — economics / public numbers discipline; references **`/pricing`** as the published-fees surface.
