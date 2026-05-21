# Safety stage rebuild — component inventory & reuse manifest

**Status:** Draft 01 — pre-build survey. No `-new` files have been written.
**Target repo:** `movemental-ai` (the `movemental.ai` site, this repo).
**Target deliverable directory (per rebuild plan):** new sibling routes under `src/app/(site)/` with `-new` appended; new components under `src/components/.../_new/`.

> **Path correction (resolved):** the rebuild brief originally named `movemental-visual-editor-main` as the target repo. That repo is the `dashboard.movemental.ai` app and contains no marketing pages. The pages in scope all live in **this repo (`movemental-ai`)** under the `(site)` route group. The inventory below describes this repo only.

---

## Repository structure

- Next.js **16.2.3** (App Router, Turbopack pinned via `turbopack.root` in `next.config.ts`)
- React **19.2.4**, TypeScript strict, **Tailwind CSS v4** (CSS-first via `@theme inline` in `src/app/globals.css` + a thin `tailwind.config.ts` for fonts / motion / content globs)
- Next 16 middleware lives at **`proxy.ts`** (not `middleware.ts`)
- Three route groups under `src/app/`:
  - **`(site)/`** — public marketing (the five pages in scope live here, plus `about`, `evidence`, `case-studies`, `voices`, `who-we-serve`, segment hubs, etc.). Shared chrome injected by the **root** `src/app/layout.tsx` (SiteHeader / SiteFooter) — the group itself has no `layout.tsx`.
  - **`(dashboard)/`** — authenticated organization dashboard (`/dashboard/**`, `/program/**`)
  - **`(studio)/`** — internal authoring surfaces
- API routes under `src/app/api/**` (relevant: `api/toolkit-download/route.ts`, `api/newsletter/route.ts`, `api/contact/route.ts`)
- Components organized by domain under `src/components/`:
  - `pathway/` — pathway-page shared widgets (stage rail, series mast, author bios, voice fallback)
  - `field-guide/` — landing pages for the Field Guide PDF (Safety + Sandbox)
  - `toolkit/` — `ToolkitCover`, `ToolkitDownloadForm` (the lead-capture form)
  - `sections-mock/` — section-level page compositions (home + start-with-safety, etc.) plus shared `primitives.tsx` (`Band`, `SectionHead`, `BtnPill`)
  - `studio/pages/pathway/` — full page components for `/pathway/safety` and `/pathway/sandbox`
  - `studio/hero/` — `TopographicHero`, `LightTextureHero`
  - `studio/Reveal.tsx`, `studio/Container.tsx` — motion + layout primitives
  - `citations/` — `CitationsProvider`, `Cite`, hooks (numbered footnote chips with hover popovers)
  - `nav/` — `SiteHeader`, `SiteFooter`, `SiteHeaderCta`
- Design tokens: `src/app/globals.css` (`@theme inline` block + `:root` light values; `.dark` overrides; regional Midnight bands via `.band-midnight` recipe in `recipes.css`). DESIGN.md (`docs/design/DESIGN.md`) is the canonical spec — "Concept Modern" / "warm editorial".

---

## Existing tokens & libraries

### Tailwind + tokens

- **Tailwind v4 CSS-first.** Almost all design tokens live in `src/app/globals.css` under `@theme inline` (Tailwind v4 parses these at build time → utility classes). A small `tailwind.config.ts` extends fonts / motion / content globs and sets `darkMode: "class"`. DESIGN.md is the source of truth — when tailwind config disagrees with DESIGN.md, DESIGN.md wins.
- **Palette is "Concept Modern" (warm editorial), not the high-contrast palette in the rebuild brief.**
  - Light: `--background: #faf6ee` (cream paper), `--foreground: #19150f` (warm ink), `--section: #f2ece0`, `--card: #ffffff`, `--surface-highest: #efe7d6`.
  - "Primary" is **ink**, not blue (`--primary: #19150f`). The brief specifies `--action: #0053db` — that color does **not** exist in this codebase. See open question.
  - Status tokens: `--color-status-go: #6b7e3f`, `--color-status-caution: #a07a25`, `--color-status-stop: #9c2d20` (Sandbox green / yellow / red lights).
  - Editorial accent: `--color-pathway-accent: #b8893a` (used for italic numerals + active stage rules on pathway pages).
  - Inverse / Midnight: `--inverse-surface`, `--inverse-foreground`, plus the regional `.band-midnight` recipe in `recipes.css`.
- Tokens you'd want for the five-layer "diagnostic widget" colors already exist as `--color-status-{go,caution,stop}` — no new color tokens needed.

### Fonts

- Loaded via **`next/font/google`** in the **root** `src/app/layout.tsx`:
  - **Inter** → `--font-sans` (variable)
  - **Newsreader** → `--font-serif-display` (weights 400/500, normal + italic). Italic Newsreader is the editorial display face across pathway / field-guide / home heroes.
- **Source Serif 4 is not loaded** anywhere — the brief mentions it for "editorial display only," but the actual editorial serif on this site is **Newsreader**. See open question.

### UI / animation libraries (already in dependencies — reuse, do not introduce)

- **shadcn/ui** (via `shadcn@^4` package) on top of a broad `@radix-ui/*` set (accordion, avatar, checkbox, dialog, dropdown-menu, label, scroll-area, separator, slot, tabs). UI primitives in `src/components/ui/` (not heavily used in the five pages — most marketing components hand-roll Tailwind).
- **`lucide-react`** for icons (used in all five pages).
- **Motion / animation:** `motion@^12` (Framer Motion successor) and `gsap@^3` + `@gsap/react@^2`. In practice the five pages use `motion` indirectly via `<Reveal>` (`src/components/studio/Reveal.tsx`) — see component inventory below.
- **Theming:** `next-themes` (light/dark switch via `html.dark` class). Regional dark via `.band-midnight` is independent of user theme.
- **Forms:** `react-hook-form` + `@hookform/resolvers`, with `zod` validation; the toolkit form is hand-rolled `useState`.
- **Data viz** (home page Scenius network): `d3`, `sigma`, `graphology`, `@xyflow/react`.
- **Markdown:** `react-markdown` + `remark-gfm` (not used on the five pages but present).

### Lead-capture integration (the contract the `-new` Safety pages must hit)

- **Component:** `src/components/toolkit/ToolkitDownloadForm.tsx` (`"use client"`, hand-rolled fetch, no react-hook-form). Used in `field-guide-safety-landing.tsx` for both the top-of-page and midnight-footer captures.
- **Endpoint:** `POST /api/toolkit-download` → `src/app/api/toolkit-download/route.ts`.
- **Payload (Zod-validated):**
  ```
  { email: string (required, email), organization?: string, source?: string,
    fieldGuide?: "safety" | "sandbox" (default "safety"),
    gatePath?: "safestart" | "attestation" | "review",
    metadata?: any }
  ```
- **Backend behavior:** upserts into `newsletter_subscribers` (Drizzle) with `source = "safety-toolkit:{surface}"`, status `"confirmed"` (no double-opt-in for the toolkit path), then calls `sendToolkitLeadEmail()` → **Resend** transactional email with the PDF link. Day-0 only; day-3 / day-7 follow-ups TODO in `src/lib/email/send-safety-toolkit-email.ts`. Sliding-window in-memory rate limit (10/hour per IP). Requires `TENANT_ORG_ID` env var.
- **Implication for the new pages:** any -new Safety capture must `POST /api/toolkit-download` with `fieldGuide: "safety"` and a distinct `source` string so analytics can segment by surface. **Do not introduce a new endpoint.**

### Analytics integration

- **No third-party analytics SDK is wired into the marketing pages.** No `posthog`, no `@vercel/analytics`, no `gtag` in dependencies. The toolkit form does not fire client-side events.
- Server-side analytics exist as DB tables / hooks (`analytics_events`, `search_analytics`, `content_analytics`) but the marketing pages don't write to them.
- **Event naming convention:** none visible in the five pages. The `ToolkitDownloadForm`'s `source` prop (`"field-guide-safety-hero"`, `"field-guide-safety-footer"`) is the only surface-segmentation signal today, persisted via the `source` column on `newsletter_subscribers`. See open question.

---

## Component inventory (per page)

Conventions: every component below is from `src/` in this repo unless otherwise noted. "REUSE AS-IS" means the component is generic enough to drop into the `-new` pages with no edits. "REUSE WITH EDITS" means the component is mostly right but needs prop or copy changes for the new Safety story. "RETIRE" means it shouldn't appear in the `-new` set.

---

### 1. Home — `/` → `src/app/(site)/page.tsx`

Imports `HomeContent` from `src/components/sections-mock/home/home-content.tsx`, which composes:

- **`CitationsProvider`** — `src/components/citations/citations-provider.tsx`. Provides numbered footnote chips for inline `<Cite />` marks; chips link to `/footnotes`. **REUSE AS-IS.**
- **`TopographicHero`** — `src/components/studio/hero/TopographicHero.tsx`. Home hero: italic Newsreader H1 ("AI is already inside your organization"), Pew/nonprofit citation chips, three audience eyebrow lines, faint topographic hero image on the right. **REUSE WITH EDITS** if used on a `-new` Safety-focused home — copy needs to tilt toward Safety as the obvious next step (current copy is path-neutral) and the citation chips need to point to Safety-relevant claims; otherwise REUSE AS-IS.
- **`AudienceFold`** — `src/components/sections-mock/home/audience-fold.tsx`. Three-card segment row (Churches / Nonprofits / Institutions) linking to `/churches`, `/nonprofits`, `/institutions`. **REUSE AS-IS.**
- **`PathFold`** — `src/components/sections-mock/home/path-fold.tsx`. Four-stage editorial layout — Stage 01 Safety is the "boxed feature" with primary CTA (`/pathway/safety`), Stages 02–04 as smaller satellite columns. **REUSE WITH EDITS** — copy is correct but the Safety CTA should drop the user into the SafeGuide / SafeStart fork rather than the existing pathway page when used on `-new` home. Confirm with Joshua before editing.
- **`CredibilityFold`** — `src/components/sections-mock/home/credibility-fold.tsx`. SITE_FOUNDERS portraits + Scenius network preview + Movement Voices. **REUSE AS-IS.**
- **`SceniusNetworkHome`** — `src/components/sections-mock/home/scenius-network-home.tsx` (rendered inside CredibilityFold). Sigma/graphology network viz. **REUSE AS-IS.**
- **`FinalCta`** — `src/components/sections-mock/home/final-cta.tsx`. Midnight band with "Start with Safety. The path takes care of the order." and three pill CTAs (`/pathway/safety`, `/field-guides/safety`, `/contact`). **REUSE WITH EDITS** — copy is on-message but the three CTAs should reflect the two-path Safety entry (SafeGuide / SafeStart) once that fork is live; today both `/pathway/safety` and `/field-guides/safety` already exist as the two paths in disguise.
- **`Cite`** — `src/components/citations/cite.tsx`. Inline numbered citation chip with hover popover. Used inside hero + PathFold + CredibilityFold. **REUSE AS-IS.**
- **`SectionHead` / `BtnPill`** — `src/components/sections-mock/primitives.tsx`. Section eyebrow + display heading + lede primitive, and the pill-style CTA. **REUSE AS-IS** (canonical primitives).

Plus root chrome (loaded by `src/app/layout.tsx`, not by the page):

- **`SiteHeader`** — `src/components/nav/site-header.tsx`. **REUSE AS-IS.**
- **`SiteHeaderCta`** — `src/components/nav/site-header-cta.tsx`. **REUSE AS-IS.**
- **`SiteFooter`** — `src/components/nav/site-footer.tsx`. **REUSE AS-IS.**

---

### 2. `/pathway/safety` → `src/app/(site)/pathway/safety/page.tsx`

Page file is a 23-line wrapper that imports **`SafetyPage`** from `src/components/studio/pages/pathway/SafetyPage.tsx` (574 lines, `"use client"`). All sections are hand-rolled inside that file (no internal section subcomponents). Components it actually imports:

- **`FieldGuideAuthorBios`** — `src/components/pathway/field-guide-author-bios.tsx`. Brad Brisco + Alan Hirsch + Joshua Shepherd bio strip. **REUSE AS-IS.**
- **`FieldGuideSeriesMast`** — `src/components/pathway/field-guide-series-mast.tsx`. Horizontal mast naming Vol. 01–04 with active state. **REUSE AS-IS** (active="vol-01" for Safety).
- **`PathwayStageRail`** — `src/components/pathway/pathway-stage-rail.tsx`. Top rail showing all four pathway stages with the current one highlighted. **REUSE AS-IS** (variant="safety").
- **`PathwayVoiceFallback`** — `src/components/pathway/pathway-voice-fallback.tsx`. Initials-disk + name + role + bio card for a Movement Voice (used when no portrait image exists yet). **REUSE AS-IS.**
- **`Reveal`** — `src/components/studio/Reveal.tsx`. Scroll-triggered fade/slide-up wrapper (uses `motion`). **REUSE AS-IS.**
- **`ToolkitCover`** — `src/components/toolkit/ToolkitCover.tsx`. Visual cover mock for the Field Guide volume (used in the "Read Volume One" section). **REUSE AS-IS.**

**Page-level reuse verdict: REUSE WITH MAJOR EDITS / partial rebuild.**
The current page already implements the five-layer architecture (`LAYERS` const, lines 22–63) with `01 Statement / 02 Policy / 03 Context / 04 Rules / 05 Response Plans` — this matches the Field Guide PDF model. **But** it markets the artifact count as **"seven specific deliverables"** nested in five layers (lines 137–141, 215–217, 311) without ever showing the two-path SafeGuide vs SafeStart fork as a peer comparison — SafeStart is presented as the primary engagement and the free field guide is a secondary CTA. The `-new` version needs: (a) a dedicated two-paths comparison surface, (b) reconciliation of the "seven deliverables" count against the Field Guide PDF's canonical document list, (c) explicit naming of the five layers' canonical documents per the brief (Layer 02 should show *both* "Acceptable Use Policy" *and* "Named Refusals" — current page omits Named Refusals; Layer 03 should show "Vendor & Tool Inventory" + "Data Classification" — current page shows "Pastoral, Programmatic & Educational Care Boundaries" instead, which is closer to Layer 04 in the brief's model).

---

### 3. `/pathway/sandbox` → `src/app/(site)/pathway/sandbox/page.tsx`

Page wrapper imports **`SandboxPage`** from `src/components/studio/pages/pathway/SandboxPage.tsx`. Mirrors the SafetyPage structure (same imports). Components:

- **`FieldGuideAuthorBios`** — same as above. **REUSE AS-IS.**
- **`FieldGuideSeriesMast`** — `active="vol-02"`. **REUSE AS-IS.**
- **`PathwayStageRail`** — `variant="sandbox"`. **REUSE AS-IS.**
- **`PathwayVoiceFallback`** — **REUSE AS-IS.**
- **`Reveal`** — **REUSE AS-IS.**
- **`ToolkitCover`** — **REUSE AS-IS.**
- Plus internal lib reads: `SANDBOX_FIELD_GUIDE_COVER_IMAGE`, `SANDBOX_FIELD_GUIDE_DISPLAY_TITLE` from `src/lib/sandbox-field-guide.ts`.

**Page-level reuse verdict: REUSE AS-IS (structural reference only).**
The Sandbox page is in scope only as the *sibling pattern* for the Safety rebuild. No edits to it. Its 8-phase narrative (Boundaries → Future Plan, lines 25–66 of SandboxPage.tsx) and its "two paths" framing (SandboxGuide vs SandboxLive, line 73) are the precedent the Safety rebuild should match — the Safety `-new` page should adopt the same "two paths into the stage" architecture Sandbox already uses.

---

### 4. `/start-with-safety` → `src/app/(site)/start-with-safety/page.tsx`

Page wrapper imports **`StartWithSafetyContent`** from `src/components/sections-mock/start-with-safety/start-with-safety-content.tsx`. That file composes six sub-folds defined in the same file plus one external component:

- **`Hero`** (local) — Midnight band, "Where is your organization *actually starting with AI?*", links to `#assessment` and `/field-guides/safety`. **REUSE WITH EDITS** — works, but copy should be reconciled against the SafeGuide/SafeStart fork.
- **`MeasuresFold`** (local) — "Five areas every organization should clarify first" — lists Acceptable Use, Data Boundaries, Human Oversight, Voice and Trust, Ethical and Theological Guardrails. **REUSE WITH EDITS** — these five names are *adjacent to* but **not identical to** the canonical five layers in the brief (Statement / Policy / Context / Rules / Response Plans). The page itself notes the mapping ("each is an alternate articulation of the five Field Guide layers"). The `-new` page should either drop this fold or re-label it explicitly so the canonical five-layer names lead and the practical area names follow.
- **`AssessmentFold`** (local) — wraps **`SafetySelfAssessment`** from `src/components/sections-mock/start-with-safety/safety-self-assessment.tsx`. **`SafetySelfAssessment` is a complete 7-question, 4-option-per-question, client-side, read-back diagnostic** (`"use client"`, `useState`, `useMemo`). Generates a tier (`ready` / `refining` / `significant` / `beginning`) with a flagged-questions read-back. **REUSE AS-IS** — this is the closest existing thing to the brief's requested `FiveLayerRead` diagnostic, but it is structured around *questions* not *layers*. See "Gaps" — a true `FiveLayerRead` would map each of the 5 layers to one or more diagnostic prompts and return per-layer status (red/yellow/green) rather than a single composite tier.
- **`OutputsFold`** (local) — "The assessment is the start. Safety produces the artifacts." Lists six outputs: AI Use Guidelines, Data Boundary Map, Leadership Alignment, Risk Register, Review Standards, Next-Step Roadmap. **REUSE WITH EDITS** — these are six (not seven, not five-layer-aligned) and they don't match the brief's canonical document list. Replace with the canonical five-layer + seven-document breakdown.
- **`PathFold`** (local) — Mini path tile (Safety → Sandbox → Skills → Solutions). **REUSE AS-IS.**
- **`FinalCta`** (local) — Midnight band CTA. **REUSE AS-IS** (already references SafeStart).
- **`SectionHead` / `BtnPill`** — from `sections-mock/primitives.tsx`. **REUSE AS-IS.**

**Page-level reuse verdict: PARTIAL REBUILD.**
The page already houses the right *kind* of diagnostic (`SafetySelfAssessment`), but its "5 measures" + "6 outputs" framing diverges from the canonical 5-layers + 7-documents Field Guide model. The `-new` version should keep the assessment widget (or swap it for the per-layer `FiveLayerRead`) and rebuild the surrounding folds against the canonical model.

---

### 5. `/field-guides/safety` → `src/app/(site)/field-guides/safety/page.tsx`

Page wrapper renders **`FieldGuideSafetyLanding`** from `src/components/field-guide/field-guide-safety-landing.tsx` (256 lines, single self-contained component) plus a `<script type="application/ld+json">` Article schema block. Components:

- **`ToolkitDownloadForm`** — `src/components/toolkit/ToolkitDownloadForm.tsx`. The canonical lead-capture form. Rendered **twice** on this page (top hero + midnight footer) with distinct `source` strings (`"field-guide-safety-hero"`, `"field-guide-safety-footer"`). **REUSE AS-IS** — this is the contract every `-new` Safety lead capture must hit.
- Internal lib reads: `SAFETY_FIELD_GUIDE_COVER_IMAGE`, `SAFETY_FIELD_GUIDE_DOWNLOAD_FILENAME`, `SAFETY_FIELD_GUIDE_PDF_PATH` from `src/lib/safety-field-guide.ts`.
- Icons from `lucide-react`: `BookOpen, FileText, MapPin, Ruler, Siren, Users` — one per layer card.
- `Image` and `Link` from `next/`.

**Page-level reuse verdict: REUSE WITH EDITS.**
The page already lays out **"Five layers. Seven deliverables. One ratifiable framework."** (line 86) — this is the cleanest existing canonical-model rendering on the site. Layer copy is closer to the brief than the pathway page is. **But** Layer 03 Context shows only "Care Boundaries" (the brief assigns *Vendor & Tool Inventory + Data Classification* to Layer 03 and *Care Boundaries* to Layer 04), and Layer 05 includes a "Constituent Communication template" the brief does not name. The "Plus / Self-Assessment" sixth card (lines 137–143) is a UX nicety but inflates the "5 layers" count optically. The `-new` version should reconcile the document-to-layer mapping with the Field Guide PDF and decide whether the assessment belongs as a sixth card or as its own surface linking to `/start-with-safety`.

---

## Gaps to fill (new components to build under `components/.../_new/`)

All paths below are proposed; final locations TBD by the implementation prompt.

1. **`FiveLayerRead`** — `src/components/safety/_new/five-layer-read.tsx`
   Interactive client-side diagnostic that walks the user through the 5 canonical layers (Statement / Policy / Context / Rules / Response Plans) one at a time, asks 1–3 short questions per layer, and emits a per-layer status read-back (`go` / `caution` / `stop` using the existing `--color-status-*` tokens). Output: a 5-row "Guidebook Readiness" card listing each layer's status, the gap, and the next action — plus an overall recommendation pointing the user to **SafeGuide** (self-directed) or **SafeStart** (facilitated). Logic-only differs from the existing `SafetySelfAssessment`; can share styling primitives.

2. **`TwoPathsTable`** — `src/components/safety/_new/two-paths-table.tsx`
   Side-by-side comparison surface for **SafeGuide** vs **SafeStart**. Columns: cost (free / $1,000), format (self-directed / facilitated), duration (1–2 months / 2 weeks), deliverable (same — one AI Organizational Guidebook), facilitation, dashboard, support, fit. Should use existing `bg-card` + tonal stacking; an inline `BtnPill` CTA per column points to `/field-guides/safety` (SafeGuide) and `/contact?interest=safestart` (SafeStart). Mobile: stacks vertically with a sticky "Choose your path" eyebrow.

3. **`GuidebookContents`** — `src/components/safety/_new/guidebook-contents.tsx`
   The canonical "what's in the AI Organizational Guidebook" visualization: a single Guidebook tile with five layer-rows nested inside it, each row listing its canonical document(s) per the brief — Layer 01 → AI Use Charter; Layer 02 → Acceptable Use Policy + Named Refusals; Layer 03 → Vendor & Tool Inventory + Data Classification; Layer 04 → Data Handling Rules + Disclosure & Attribution + Care Boundaries; Layer 05 → Incident Response Plan. Replaces the current scattered "five layers, seven deliverables" statements with one authoritative visual.

4. **`NamedRefusalsCallout`** — `src/components/safety/_new/named-refusals-callout.tsx`
   Editorial pull-out callout explaining what Named Refusals are (the things an organization decides AI will **never** be used for) and why they live under Layer 02 alongside the Acceptable Use Policy. Currently the site never names this artifact; the brief names it explicitly.

5. **`SafetyLayerNav`** — `src/components/safety/_new/safety-layer-nav.tsx`
   Sticky in-page nav strip listing the five layers with anchor links and read state. Mirrors the editorial register of `FieldGuideSeriesMast` but for the within-page five-layer architecture. Used on the long-form `/pathway/safety-new` page so a reader can jump between Layer 01–05 sections.

6. **`SafeStartScopeCard`** — `src/components/safety/_new/safestart-scope-card.tsx`
   A scoped "what SafeStart includes / does not include" card explicitly tied to the $1,000 / 2-week container, replacing the inline "What's included / What's not included" two-column block in `SafetyPage.tsx` so it can be reused on `/start-with-safety-new` and the home final CTA.

7. **`FieldGuidePdfPreview`** — `src/components/safety/_new/field-guide-pdf-preview.tsx`
   (Optional, low-priority.) A small "first-page-of-the-PDF" preview tile to sit beside the `ToolkitDownloadForm` on `/field-guides/safety-new`, giving a tangible glimpse of the 33-page document. The existing `ToolkitCover` is more abstract (a designed cover mock); this would render the actual first page.

8. **`TwoPathsCallToAction`** — `src/components/safety/_new/two-paths-cta.tsx`
   The dual-CTA strip used on the home final CTA, the pathway hero, and the field-guide page — two pill CTAs side by side for "Read the Field Guide (free)" and "Talk to us about SafeStart" plus a shared subline ("Both produce the same AI Organizational Guidebook"). Currently this CTA pattern appears three different ways across the three pages; consolidate.

---

## Open questions for Joshua

1. ~~**Which repo is the actual target?**~~ **Resolved 2026-05-21:** `movemental-ai` (this repo). The brief's mention of `movemental-visual-editor-main` was a mistake — that repo is the dashboard app and has no marketing pages.

2. **Seven deliverables vs five layers — which framing wins?** The Field Guide PDF (per the brief) describes **one Guidebook, multiple documents across five named layers** — and the layer-to-document mapping in the brief totals **eight or nine** documents (Charter, AUP, Named Refusals, Vendor & Tool Inventory, Data Classification, Data Handling Rules, Disclosure & Attribution, Care Boundaries, Incident Response Plan). The current `/pathway/safety` page markets **"seven specific deliverables nested under five layers."** The current `/field-guides/safety` page markets **"Five layers. Seven deliverables."** The current `/start-with-safety` page lists **six outputs** that don't match either count. **Recommendation:** drop a fixed numeric count from the marketing copy and reframe as "One AI Organizational Guidebook, organized in five layers, ratifiable as a single board document." Need Joshua's confirmation before writing the new copy.

3. **Document-to-layer mapping disagreement.** Specifically, where does **Care Boundaries** belong?
   - Brief: Layer 04 Rules
   - Current `/pathway/safety`: Layer 03 Context
   - Current `/field-guides/safety`: Layer 03 Context
   And where does **Vendor & Tool Inventory + Data Classification** belong? The brief assigns them to Layer 03; neither current page mentions them at all. Need authoritative resolution from the Field Guide PDF.

4. **Named Refusals.** The brief explicitly names this as a Layer 02 artifact (alongside Acceptable Use Policy). Neither current page surfaces it. Confirm we should introduce it as a first-class concept on the `-new` pages.

5. **Two-paths naming.** The brief uses **SafeGuide** (self-directed, free) and **SafeStart** (facilitated, $1,000). The site uses **SafeStart** but never names **SafeGuide** — the free path is called "Volume One" or "the Field Guide" or just "read the field guide and run Safety with your own team." Should the `-new` pages introduce "SafeGuide" as a named path, or keep the asymmetric naming (Field Guide = self-directed, SafeStart = facilitated)?

6. **Analytics event names for new CTAs.** No client-side analytics SDK is wired. The only segmentation today is the `source` field on `newsletter_subscribers` (e.g., `"safety-toolkit:field-guide-safety-hero"`). Options for the `-new` work:
   (a) keep the `source`-string convention and add new surface tags like `safety-toolkit:two-paths-cta`, `safety-toolkit:five-layer-read`, `safety-toolkit:home-final-cta-new`;
   (b) introduce a client-side analytics SDK (out of scope per "no new libraries");
   (c) wire CTA clicks to the existing server `analytics_events` table via a new lightweight endpoint.
   **Recommendation:** option (a) for parity with the current site; revisit (c) once -new pages are live.

7. **Token / palette mismatch in the brief.** The brief specifies `--action: #0053db` (blue) and `--bg: #fff` plus Source Serif 4 for editorial display. The **actual repo** uses warm cream paper `#faf6ee`, ink-on-cream primary (`--primary: #19150f`, no blue defined), and **Newsreader** italic for editorial display. (Note: this repo's `CLAUDE.md` also references `#0053db` as primary, which contradicts the live `globals.css`.) The `-new` pages must inherit the Concept Modern palette + Newsreader because they share `app/layout.tsx`, `globals.css`, and the SiteHeader/SiteFooter chrome with the existing site. **Confirm:** treat the brief's tokens as a note from an earlier draft and build against the actual repo tokens — or is the brief signaling a planned palette migration that should land alongside the `-new` pages?

8. **Are `-new` files co-located under each route, or grouped under a single `_new/` shadow tree?** The brief says "parallel `-new` versions of several existing pages so the originals stay live" but does not specify the file convention. Options: `src/app/(site)/pathway/safety-new/page.tsx` (sibling route — what the brief seems to mean by "append `-new` to the final route segment"), or `src/app/(site)/pathway/safety/_new/page.tsx` (won't route — `_new` is a private folder in Next App Router), or a feature-flag toggle in the existing page. **Recommendation:** new sibling routes like `/pathway/safety-new`, `/field-guides/safety-new`, `/start-with-safety-new`, and a home variant at `/home-new`; new components under `src/components/safety/_new/` (a single shadow tree, since they're cross-cutting). Confirm before scaffolding.

---

## FiveLayerRead — usage

Interactive five-step diagnostic wizard for the Safety stage. Single-screen linear flow that rates each canonical layer (Statement / Policy / Context / Rules / Response Plans) as Yes / Partial / No, narrates the picture as it forms, and emits a per-layer read-back with two CTAs (Field Guide / SafeStart).

- **Import path:** `import FiveLayerRead from "@/components/safety/_new/FiveLayerRead";`
- **Render:**

  ```tsx
  <FiveLayerRead />
  ```

- **Props:** none. Client component; manages all state internally with `useState` / `useMemo`. CTAs link to `/field-guides/safety-new` and `/pathway/safety-new#safestart`.

---

## /pathway/safety-new

The canonical Safety stage page. Built as a sibling to `/pathway/safety` so the original stays live during the migration. Mirrors the existing `SafetyPage` register (Concept Modern palette, Newsreader italic display, `pathway-accent` numerals) and reuses pathway chrome.

### Files created

- `src/app/(site)/pathway/safety-new/page.tsx` — server component page wrapper. Metadata + canonical URL via `canonicalPageUrl("/pathway/safety-new")`. ~23 LOC.
- `src/components/safety/_new/SafetyNewPage.tsx` — `"use client"` page composition. Eight sections (hero → five-layer-read → architecture → two-paths → safestart → audiences → credibility → midnight CTA). ~360 LOC.
- `src/components/safety/_new/TwoPathsTable.tsx` — hairline-ruled SafeGuide vs SafeStart comparison. Desktop: 3-col grid; mobile: stacked path cards with sticky "Choose your path" kicker. 7 rows: Cost / Timeline / Difficulty / Who Drafts / Finished Artifact / Likely Challenges / Best Fit. ~185 LOC.

### Components reused (imported as-is)

- `FiveLayerRead` from `@/components/safety/_new/FiveLayerRead` — embedded at section 2 with `id="five-layer-read"` anchor; component supplies its own `container` wrapper.
- `PathwayStageRail` from `@/components/pathway/pathway-stage-rail` (`variant="safety"`).
- `FieldGuideSeriesMast` from `@/components/pathway/field-guide-series-mast` (`active="vol-01"`).
- `FieldGuideAuthorBios` from `@/components/pathway/field-guide-author-bios` — rendered inside the credibility section.
- `PathwayVoiceFallback` from `@/components/pathway/pathway-voice-fallback` — three Movement Voices in the credibility section (Rios / Woodward / Smith).
- `Reveal` from `@/components/studio/Reveal` — scroll-fade wrapper used on every band.
- `canonicalPageUrl` from `@/lib/site-url`.

### Components replicated inline (not editable existing components)

- **Audience trio** (church / nonprofit / institution cards) — the existing `SafetyPage.tsx` has no audience trio; the home page `AudienceFold` is structurally a fit but its `band-default audience-section` recipe wraps copy specific to the home page. Replicated the three-card markup with `lib/utils#cn` + Tailwind utilities inside `SafetyNewPage.tsx` (not a new component) to honour the "do not edit `SafetyPage.tsx`" constraint.
- **Credibility / founders block** — `SafetyPage.tsx` does not export an internal credibility component; replicated the Movement Voices + `FieldGuideAuthorBios` composition inline using the same `PathwayVoiceFallback` + `FieldGuideAuthorBios` primitives the original page uses.

### Key decisions resolved during build

- **Canonical taxonomy enforced.** Care Boundaries lives under Layer 04 Rules. Named Refusals is named explicitly under Layer 02 alongside the Acceptable Use Policy. Vendor & Tool Inventory + Data Classification sit at Layer 03 Context. The non-canonical `/start-with-safety` "five areas" framing is not referenced anywhere on this page.
- **`/contact?topic=…` → `/contact?interest=…`.** The brief asked for `topic=safestart`. The actual contact page (`src/app/(site)/contact/page.tsx`) reads `interest` (normalized through `src/lib/contact-interest.ts`). `interest=safestart` doesn't match the existing audience enum (`churches | nonprofits | institutions`) so it normalizes to `null` and the page renders without pre-selected audience — but the URL is what the existing `SafetyPage.tsx` and `SandboxPage.tsx` already use, so the convention is `interest=safestart` and the broader site-wide alignment will happen when the contact page itself is rebuilt.
- **CTA labels.** Primary lead-magnet CTA is `Get the Field Guide` (not `Read the Field Guide`) per the brief. Routes to `/field-guides/safety-new` (the sibling rebuild). SafeStart CTAs route to `/contact?interest=safestart`.
- **Hero is cream, not midnight.** Matches the existing SafetyPage hero register (`bg-background`), not the SandboxPage cross-promotion band.
- **No new endpoint / no inline lead capture.** The page does not host its own `ToolkitDownloadForm`; lead capture happens on `/field-guides/safety-new` (the SafeGuide landing rebuild).
- **No `#0053db`, no Source Serif 4.** Concept Modern palette + Newsreader italic throughout. `--color-pathway-accent` for numerals + facilitated-path kicker.

### Routes created

- `GET /pathway/safety-new` — the new canonical Safety page.

### What was NOT changed

- `src/app/(site)/pathway/safety/page.tsx` — untouched.
- `src/components/studio/pages/pathway/SafetyPage.tsx` — untouched.
- No edits to `FieldGuideAuthorBios`, `PathwayStageRail`, `FieldGuideSeriesMast`, `PathwayVoiceFallback`, `Reveal`.

---

## /field-guides/safety-new

The SafeGuide path landing page — lean, lead-capture-first sibling to `/field-guides/safety`. Built as a sibling route so the original stays live. The page does ONE job: make the SafeGuide path real and capture the email to deliver the Field Guide PDF. Restraint is the design.

### Files created

- `src/app/(site)/field-guides/safety-new/page.tsx` — server-component page wrapper. Metadata (title, description, canonical, OG/Twitter) + an `Article` JSON-LD `<script>` block mirroring the existing `/field-guides/safety` page. ~65 LOC.
- `src/components/safety/_new/FieldGuideSafetyNewLanding.tsx` — server-component landing composition. Five sections, top to bottom:
  1. Hero / primary lead capture — two-column desktop (left: kicker, italic headline, lede, four meta pills, top `ToolkitDownloadForm`; right: book cover). Stacks on mobile.
  2. Two-paragraph explainer — what the Field Guide produces + plain-language SafeGuide vs SafeStart, with an inline link to `/pathway/safety-new#safestart`.
  3. Audience trio — three-column "Written for senior leaders…" block (Executive Pastors / Directors / Presidents). Copy replicated verbatim from the existing `field-guide-safety-landing.tsx` per the no-edits constraint.
  4. Self-assessment note — small `bg-elevated` band stating the 30-minute self-assessment lives inside the PDF.
  5. Midnight bottom band — second `ToolkitDownloadForm` for users who scrolled past the hero. The form is wrapped in a `bg-card` cream tile so it retains its native styling on the midnight background.
  
  ~165 LOC. No `"use client"` (the form supplies its own client boundary).

### Components reused (no edits)

- `ToolkitDownloadForm` — `@/components/toolkit/ToolkitDownloadForm`. Rendered twice with distinct `source` strings (`"field-guide-safety-new-hero"`, `"field-guide-safety-new-footer"`) so analytics can segment by surface. Default submit label ("Send me the toolkit") used — the brief allowed shipping as-is if the form did not expose a label override that would land cleanly without modifying the component.
- `SAFETY_FIELD_GUIDE_COVER_IMAGE` — `@/lib/safety-field-guide`. Reused for the right-column book cover and OG image.
- `getFieldGuide("it-starts-with-safety")` — `@/lib/field-guide`. Reused for `authors`, `publisher`, `date` in the JSON-LD block.
- `canonicalPageUrl` — `@/lib/site-url`.

### Key decisions resolved during build

- **`fieldGuide` prop is not on the form.** The brief asked to pass `fieldGuide="safety"` to `ToolkitDownloadForm`. The form does not accept that prop — it forwards only `email`, `organization`, `source` to `POST /api/toolkit-download`. The API defaults `fieldGuide` to `"safety"` server-side, so the SafeGuide landing gets correct behavior without modifying the form. Constraint satisfied without an edit.
- **Default submit label retained.** The brief said not to modify the form. The shipped form's default submit label is `"Send me the toolkit"` (not `"Send me the Field Guide"`). The existing `/field-guides/safety` page overrides this via the `submitLabel` prop; the new lean page intentionally keeps the form pristine (no overrides beyond what was strictly necessary) so the page is the cleanest possible composition of the canonical primitive. Switching to `submitLabel="Send me the Field Guide"` would still be a single prop, but the brief said "DO NOT modify the form" and "ship as-is" if it doesn't expose what you want — interpreted conservatively, the default copy stands. Reassess if conversion data shows a gap.
- **Midnight form rendering — cream tile wrap, no inverse variant.** `ToolkitDownloadForm` does not have a built-in dark/inverse styling story (the existing midnight footer on `/field-guides/safety` ships ~7 different `*ClassName` overrides to force it inverse). Per the constraint "DO NOT modify ToolkitDownloadForm to add a dark variant", the new midnight band wraps the form in a `bg-card` tile with `shadow-ambient` so the form retains its native cream-on-cream styling while the surrounding band stays midnight. Headline + eyebrow above the tile inherit `.band-midnight` colors via the global recipe.
- **Italic letterform in the headline.** Headline rendered as `<em>It</em> Starts With Safety.` — the leading `It` gets the Newsreader italic letterform (the brief's recommended treatment). The remainder of the line is italic via the parent's `italic` class, so the visual effect is a slightly more intentional `It`.
- **Four pills, not three.** The brief said "three pill-labels" then listed four; per the brief's resolution note, all four shipped as a single tracked-caps row with bullet separators: `33 pages · Free · Self-assessment included · No drip campaign`.
- **`/contact?interest=safestart`.** The link from paragraph two routes to `/pathway/safety-new#safestart` (per the brief), but any SafeStart-direct contact links elsewhere on the site continue to use the `interest=safestart` convention locked in by the prior SafetyNewPage build.
- **No methodology rehash, no plus-six self-assessment card.** Per the brief's "sections explicitly REMOVED" list, the new page omits the five-layer methodology grid and the standalone "Self-Assessment" card. The 30-minute team self-assessment is surfaced as a one-section note (section 4) pointing at the PDF.
- **Page is visibly leaner than the existing landing.** New landing is ~165 LOC vs the existing 256 LOC, and the section count drops from 5 to 5 with the heaviest mid-page section (five-layer architecture) removed — the visible vertical footprint is roughly half.

### Routes created

- `GET /field-guides/safety-new` — the SafeGuide path landing page.

### What was NOT changed

- `src/app/(site)/field-guides/safety/page.tsx` — untouched.
- `src/components/field-guide/field-guide-safety-landing.tsx` — untouched.
- `src/components/toolkit/ToolkitDownloadForm.tsx` — untouched.
- `src/lib/safety-field-guide.ts` — read-only consumption.

---

## /home-new

The cleaned-up home page sibling. Identical to `/` in nearly every respect — same hero (`TopographicHero`), same audience trio (`AudienceFold`), same credibility fold (`CredibilityFold` + embedded `SceniusNetworkHome`), same `CitationsProvider` claim order. Two surgical CTA changes route traffic into the `-new` Safety stack:

1. **Path fold's Safety CTA → `/pathway/safety-new`.** The Stage 01 "Begin with Safety" button and the inline "Read more →" link on the Safety card now point at the canonical sibling page. Stages 02–04 are unchanged.
2. **Bottom midnight CTA band: 3 CTAs → 2.** Primary white pill `Get the Field Guide → /field-guides/safety-new`; ghost button `Talk about SafeStart → /contact?interest=safestart`. The third CTA (Start a Conversation) is removed. Headline and lede copy match the existing `FinalCta` verbatim — the only changes are the action set.

### Files created

- `src/app/(site)/home-new/page.tsx` — server component shell. ~28 LOC. Metadata mirrors `src/app/(site)/page.tsx` verbatim (title `"A wiser way to navigate AI"`, description naming the four-stage path) so the existing home's SERP / OG signal carries over.
- `src/components/safety/_new/HomeContentNew.tsx` — ~40 LOC. Mirrors `HomeContent` import-for-import, swapping `PathFold` → `PathFoldNew` and `FinalCta` → `HomeCTABandNew`. Reuses `CitationsProvider`, `HOME_PAGE_CLAIM_ORDER`, `TopographicHero`, `AudienceFold`, and `CredibilityFold` from their existing locations.
- `src/components/safety/_new/PathFoldNew.tsx` — ~256 LOC. Verbatim copy of `src/components/sections-mock/home/path-fold.tsx` with **only** the two Stage 01 (Safety) hrefs changed from `/pathway/safety` to `/pathway/safety-new`. `SatelliteStage` helper, copy, layout, all other stages identical.
- `src/components/safety/_new/HomeCTABandNew.tsx` — ~49 LOC. New two-CTA midnight band. Uses the same `.band-midnight` + `.final-cta` recipe pair as `FinalCta` so typography, padding, and container width match the existing band exactly; the `BtnPill` primitive is reused (variant `primary` becomes white-on-midnight automatically via the `.band-midnight .btn-pill--primary` recipe in `src/app/recipes.css`).

### Components reused (no edits)

- `TopographicHero` — `@/components/studio/hero/TopographicHero`.
- `AudienceFold` — `@/components/sections-mock/home/audience-fold`.
- `CredibilityFold` — `@/components/sections-mock/home/credibility-fold` (and its embedded `SceniusNetworkHome`).
- `CitationsProvider` — `@/components/citations`.
- `HOME_PAGE_CLAIM_ORDER` — `@/lib/citations/home-page-claims`.
- `BtnPill` — `@/components/sections-mock/primitives`.

### Components NOT touched

- `src/app/(site)/page.tsx` — untouched (existing home stays live at `/`).
- `src/components/sections-mock/home/home-content.tsx` — untouched.
- `src/components/sections-mock/home/path-fold.tsx` — untouched (the new home uses `PathFoldNew` instead).
- `src/components/sections-mock/home/final-cta.tsx` — untouched (the new home uses `HomeCTABandNew` instead).
- `src/components/sections-mock/home/audience-fold.tsx` — untouched (reused as-is).
- `src/components/sections-mock/home/credibility-fold.tsx` — untouched (reused as-is).
- `src/components/studio/hero/TopographicHero.tsx` — untouched (reused as-is).

### Non-destructive carry-overs (deferred to migration step)

Two CTAs sit on shared chrome and **cannot** be flipped to the `-new` Safety targets without modifying components that are rendered site-wide. Per the explicit "do not edit existing files" constraint, both are deferred to the eventual `-new` → canonical promotion:

1. **Root footer "Read the field guide"** — `src/components/nav/site-footer.tsx` line 192–197. Currently points at `/field-guides` (the hub), not `/field-guides/safety`. Will be revisited when the footer is rebuilt or when `-new` pages are promoted to canonical. On `/home-new` the footer renders identically to every other page (it is injected by `src/app/layout.tsx`).
2. **Nav "Field Guide" CTA** — `src/components/nav/site-header.tsx` lines 235 and 359 both hardcode `/field-guides/safety`. The nav is global chrome rendered by the root layout. Will be updated when the `-new` pages are promoted to canonical (the nav CTA href flip and the `-new` → canonical rename will land in the same migration).

### Route created (/home-new)

- `GET /home-new` — the new home page.

### Key decisions (/home-new)

- **Metadata mirrors the existing home verbatim.** The existing `(site)/page.tsx` defines `title: "A wiser way to navigate AI"` + a description naming the four-stage path. Reused the same object on `/home-new` — when the `-new` pages are promoted, this metadata simply moves with the page swap.
- **`/contact?interest=safestart` convention preserved.** Same convention used on `/pathway/safety-new` and `/field-guides/safety-new`. The contact page's `normalizeContactInterest` does not recognize `safestart` (it expects `churches | nonprofits | institutions`), so the contact form renders without pre-selected audience. Sitewide consistency wins over local pre-fill; broader `interest` enum extension is a separate task.
- **No new design tokens, fonts, or motion libraries.** Concept Modern palette + Newsreader italic + Tailwind utilities only. The midnight band's white pill / ghost pill inversions come from the existing `.band-midnight` recipe in `src/app/recipes.css` — no new CSS.
- **`HomeCTABandNew` is a new component, not an inline JSX block.** The brief said "build a new component" — chose to extract it (vs. inlining inside `HomeContentNew`) so the two-CTA band can be reused on other surfaces later if needed (e.g., the eventual canonical home, or a segment hub).
- **`PathFoldNew` was a full copy, not a prop refactor.** Could have refactored `PathFold` to accept the Safety href as a prop (defaulting to `/pathway/safety`) and reused it. Chose not to — the non-destructive constraint says "Do not edit it" without exception, and a copy is the lowest-risk option that survives the eventual `-new` → canonical promotion (when `PathFoldNew` is renamed and the original is deleted, no parent component needs to change its prop wiring).
