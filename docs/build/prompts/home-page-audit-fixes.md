# Home page — consolidated audit fixes

**Created:** 2026-04-18
**Target file:** [`src/app/(site)/page.tsx`](../../../src/app/(site)/page.tsx) → [`src/components/sections/home/home-concept-modern-page-content.tsx`](../../../src/components/sections/home/home-concept-modern-page-content.tsx)
**Purpose:** Single, growing execution prompt capturing all fixes identified by the home-page audit series. Each audit skill appends a section. Fixes are grouped by priority; hero stays parked until the final pass.

**Audit passes completed:**
- ✅ `home-consult` — Phase 1 sections / Phase 2 scroll-stop / Phase 3 copy / Phase 4 conversion (2026-04-18)
- ✅ `movemental-narrative-audit` — copy / narrative arc / framework integrity / positioning (2026-04-18)
- ✅ `movemental-page-auditor` — six-pass audit: sequencing / copy / typography / UI / proof / cross-site (2026-04-18)
- ✅ `design-audit` — DESIGN.md fidelity: tokens / typography / tonal stacking / radius / primitives (2026-04-18)
- ✅ `visual-storytelling-audit` — section rhythm / tonal alternation / card storytelling (2026-04-18)
- ✅ `color-audit` — token completeness / WCAG contrast / 60-30-10 distribution (2026-04-18)
- ✅ `typography-polish` — Eyebrow primitive consolidation / body-text readability floor (2026-04-18)
- ✅ `tailwind-cleanup` — Tailwind v4 canonical-form modernizations (2026-04-18)
- ✅ `responsive-audit` — breakpoint coverage / layout collapse / touch targets (2026-04-18)

**Fix status (2026-04-18):**

| Fix | Title | Status |
| --- | --- | --- |
| 1 | Social proof strip | ✅ Shipped — founder-affiliation strip (Forge · 100M · MLC · NAMB) between §Hero and §Two-errors as typographic pills; logo assets can swap in when ready |
| 2 | Rewrite §Why Movemental into real About | ✅ Shipped — section renamed "About", 3-founder rail (Alan Hirsch / Brad Brisco / Josh Shepherd with Alan's portrait + initials fallback for others), origin paragraph, existing `AUTHORITY_STATEMENTS` retained |
| 3 | Newsletter capture | ✅ Shipped — `NewsletterForm` inline in §Invitation below primary CTA, `source="home-invitation"`, wired to existing `/api/newsletter` |
| 4 | Scroll-stop as system map (merged with Fix 21) | ✅ Shipped — new `#foundation` section between §Audiences and §About with 4-node grid (Library · Graph · Voice · Pathways) with lucide icons, sequential reveal, link to book Ch. 11 |
| 5 | AI Stewardship Sequence card "Learn more →" links | ✅ Shipped |
| 6 | Delete §"A different kind of response" | ✅ Shipped (folded into Fix 11 §1) |
| 7 | Content sampler | ⏸ Optional — needs editorial decision |
| 8 | Copy touch-ups (hairline links) | ✅ Shipped (Two-equal-errors link + Grounding field-guide link) |
| 9 | Hero | 🛑 Parked — runs last |
| 10 | Name "integration" in §Two-equal-errors | ✅ Shipped |
| 11 §1 | Infrastructure lead line in AI Stewardship Sequence intro | ✅ Shipped |
| 11 §2 | Why Movemental bridge line | ✅ Shipped |
| 11 §3 | Replace `PRODUCES` with canonical outputs | ✅ Shipped |
| 12 | AI Stewardship Sequence → six-stages bridge paragraph | ✅ Shipped |
| 13 | Audience cards (dual-intelligence) | ✅ Shipped |
| 14 | `NOT_THIS` rewrite | ✅ Shipped |
| 15 | Grounded-AI beat in §Two-intelligences | ✅ Shipped |
| 16 | Verify AI Stewardship Sequence article routes | ✅ Confirmed — all 4 articles live |
| 17 | Rewrite `AUTHORITY_STATEMENTS` — proof-adjacent | ✅ Shipped |
| 18 | Delete §Why Movemental closing paragraph (repeat of H2) | ✅ Shipped |
| 19 | Link grounded-AI beat → `/walkthrough` | ⏸ Blocked — `/walkthrough` route not yet shipped |
| 20 | Link §Path bridge → `/fragmentation` | ✅ Shipped (added "Walk the six stages →" alongside field guide) |
| 21 | System map — library / graph / voice / pathways | ⏸ Blocked — needs design call |
| 22 | §Invitation — replace abstract-noun stack with concrete artifacts | ✅ Shipped |
| 23 | Link "Most organizations try to begin with solutions" → book Ch. 5 | ✅ Shipped ("The book is specific about this →") |
| 24 | §Stakes — replace "it requires an adaptive response" | ✅ Shipped |
| 25 | Typographic climax between §Grounding and §Invitation | ✅ Shipped — Ch. 5 pull quote ("one landscape, seen from progressively closer in") |
| 26 | Break "We [verb]" monotony in `AUTHORITY_STATEMENTS` | ✅ Shipped (via Fix 17) |

**Shipped cumulative:** 17 fixes + 1 verification. Typecheck + lint clean. Remaining: Fix 19 (blocked on `/walkthrough` shipping), Fix 21 + Fix 25 (design calls), carryover blocked/parked items (1–4, 7, 9).

---

## Decisions resolved (2026-04-18 · round 2)

Answers to the eight design/decision questions surfaced after the page-auditor pass. These lock the specs for Fixes 1–4, 7, 19, 21, 25.

| # | Question | Decision |
| --- | --- | --- |
| 1 | `/walkthrough` destination for grounded-AI beat | **(c)** Accept as tech debt. Leave unlinked until `/walkthrough` ships. |
| 2 | Build system-map diagram? | **(c)** Merge with scroll-stop (Fix 4). One visual moment, two jobs. Fix 21 is subsumed by Fix 4. |
| 3 | Typographic climax before §Invitation | **(a)** Pull quote from book Ch. 5 between §Grounding and §Invitation. |
| 4 | Consultancy / platform / both? | **(c)** Product with a founding services layer. Platform + hands-on deployment. Pricing stays quote-based today; tiers later when pure platform matures. |
| 5 | Who are "we"? | **(a)** + **(b)** Name the three co-founders: **Josh Shepherd**, **Alan Hirsch**, **Brad Brisco**. "It's a good story" — About block gets the origin narrative treatment. |
| 6 | Free path | **(a)** + **(c)** Newsletter capture + content sampler (articles). |
| 7 | Scroll-stop placement | **(d)** Merged with system map — see answer to Q2. |
| 8 | AI Stewardship Sequence primary or on-ramp to six stages? | **(a)** Keep the AI Stewardship Sequence primary. Current structure holds. |

### What these decisions unlock

- **Fix 2 (About rewrite)** — unblocked. Named co-founders + origin story give the section a real body. Needs portraits (3× founder headshots) before full ship; structure and copy can draft immediately.
- **Fix 3 (Newsletter)** — unblocked. Ship Option A: replace the ghost `/contact` CTA in §Invitation with an inline email form wired to `/api/newsletter`. Requires `TENANT_ORG_ID` env var verified.
- **Fix 4 (Scroll-stop as system-map)** — spec updated. Four-node diagram (library · graph · voice · pathways) with GSAP parallax / assembling motion, placed between §Where this lands and §Why Movemental. NB2 image is **optional background texture**, not the primary element. See §"Fix 4 revised spec" below.
- **Fix 7 (Content sampler)** — unblocked. 3-card editorial grid of articles, placed between §Two-intelligences and §Audiences *or* inside the new About block. Needs editorial pick of 3 articles.
- **Fix 25 (Pull quote)** — unblocked. Passage from Ch. 5: *"The map, read honestly, is not six mountains to climb one after the other. It is one landscape, seen from progressively closer in."*

### What stays blocked

- **Fix 1 (Logo strip)** — still needs real organizational logos. Alan Hirsch's affiliations (Forge, 100M, Movement Leaders Collective, etc.) and Brad Brisco's affiliations could supply a first pass; decision pending on whether those count as Movemental logos or endorsement-adjacent context.
- **Fix 19 (walkthrough link)** — deferred until `/walkthrough` page is built (separate initiative).

---

## Fix 2 revised spec — About with named co-founders

**Placement:** replace current `#about` section (§Why Movemental) structure while preserving the `id="about"` anchor and the already-shipped `AUTHORITY_STATEMENTS` (Fix 17) and infrastructure bridge line (Fix 11 §2). Keep those; add the people layer.

**New section order within `#about`:**

1. `ConceptLabel`: **About**
2. H2 (keep existing): "We work at the intersection of leadership, formation, technology, and **mission**."
3. Infrastructure bridge line (keep existing — Fix 11 §2).
4. **NEW — Three co-founders rail** (replaces no current element; sits above the current authority statements).
   - Grid: 3 columns on `lg`, stacked on mobile.
   - Each card: portrait (circular or editorial square), name, one-line role, 2–3-sentence proof-point body.
   - Names: Josh Shepherd, Alan Hirsch, Brad Brisco.
   - Proof points each founder brings:
     - **Alan Hirsch** — author (*The Forgotten Ways*, *The Permanent Revolution*, et al.); Movement Leaders Collective / Forge / 100M. Carries the movement-leader / APEST / missional-ecclesiology corpus.
     - **Brad Brisco** — author / missiologist; North American Mission Board church-planting lead. Carries institutional church + nonprofit context.
     - **Josh Shepherd** — founder / operator. Carries the product, infrastructure, and AI-integration side.
   - Tone: proof-adjacent, not self-declared. No "thought leader" language. Lead each body with a concrete fact, not an adjective.
5. **NEW — Origin paragraph** (the "good story"): 80–140 words in Alan's voice (run through `alan-voice` skill). Covers: who got in the room, what problem they recognized, what they decided to build. Must be datable.
6. Existing `AUTHORITY_STATEMENTS` rail (keep — Fix 17 already shipped).
7. Closing line — deleted in Fix 18. Do not restore.

**Blockers:** 3 portraits. Suggest generating with `asset-headshot` skill or using existing photographs. Story copy needs one authoring session.

**Once shipped:** this upgrades Fix 1 (social proof) posture meaningfully. Alan's book-cover strip alone is credible proof for the audience.

---

## Fix 3 revised spec — Newsletter (Option A chosen)

**Target:** §Invitation, replace the secondary ghost CTA `<Button asChild variant="ghost" size="lg"><Link href="/contact">Start a conversation</Link></Button>` with an inline email-capture form.

**Copy scaffold (above the form):**

> Or begin quieter — one note per month on formation, infrastructure, and what we're learning.

**Form:**

- Single email input + `Subscribe` button, inline.
- POSTs to existing `/api/newsletter` endpoint (requires `TENANT_ORG_ID` env var — verify before ship).
- Double opt-in per existing contract (see [contact-newsletter-operations-playbook.md](../markdown/contact-newsletter-operations-playbook.md) if present).
- Reuse styling / validation from existing `/contact` form — do not invent a new pattern.
- Success state: replace form with "Check your inbox to confirm."
- Failure state: inline error, no toast.

**Preserve:** primary `Start with clarity → /contact` CTA above. Subscribe is the *alternative* path, not a replacement.

---

## Fix 4 revised spec — Scroll-stop as system map

**Merged with Fix 21.** The scroll-stop moment *is* the four-node system map with motion. One visual beat, two jobs.

**Placement:** New section `id="foundation"` between `#audiences` and `#about`. `spacing="lg"`, variant `editorial`.

**Structure:**

1. `ConceptLabel`: **The foundation**
2. Short intro line (≤14 words): *"What integration actually produces, underneath the path."*
3. **Four-node diagram** — horizontal rail on desktop, stacked on mobile. Each node is a card-lite block (tonal stacking, no borders) with:
   - Icon or glyph (editorial — thin line, semantic token color)
   - Label: **Library** / **Graph** / **Voice** / **Pathways**
   - One-line description each.
4. Motion: GSAP `ScrollTrigger` — nodes assemble sequentially on scroll enter; thin connecting lines draw in between them; respect `prefers-reduced-motion`.
5. Optional background texture: NB2-generated atmospheric texture (desaturated, low-contrast) behind the diagram. Not a full cinematic image — just a subtle field. Skip entirely if it competes with the diagram.
6. Hairline link below: *"Read Ch. 11 — The library, the pathways, the voice →"* linking to `/book/read/the-library-the-pathways-the-voice`.

**Why this merge works:** the concept "library / graph / voice / pathways" is named four times in the current page copy; a diagram makes it visible. Motion makes it a scroll-stop. Single beat, two jobs.

**Dependencies:**

- Component build: new `FoundationDiagram` component under `src/components/sections/home/`.
- Icons: choose from existing `lucide-react` set (e.g., `Library`, `Network`/`GitBranch`, `MessageSquare`, `Route`) or custom SVG if editorial needs demand it.
- GSAP: already installed. Use `@gsap/react` + `ScrollTrigger`.
- Optional NB2 texture: `/asset-generate` with prompt for subtle editorial atmosphere; skip if it doesn't clearly add.

---

## Fix 7 revised spec — Content sampler (3 articles)

**Placement:** between §Two intelligences (`#unfold`) and §Where this lands (`#audiences`).

**Structure:**

1. `ConceptLabel`: **Recent writing**
2. Short intro (≤12 words): *"Three pieces for the reader who wants to go deeper."*
3. 3-card editorial grid. Each card: eyebrow (topic), title, 1-line summary, hairline link.
4. Card bodies pull from `Article` metadata via `listArticles()` from [`src/lib/articles.ts`](../../../src/lib/articles.ts).

**Candidate articles (needs editorial pick — any 3):**

- `two-intelligences-integration` — paired frame, per-audience
- `the-movemental-thesis` — compressed thesis
- `ai-collapses-the-cost-of-integration` — why now
- `the-story-of-movemental` — origin + positioning
- `from-content-to-movement` — trajectory
- `content-that-doesnt-move` — diagnostic

**Default pick (if no editorial direction):** `two-intelligences-integration`, `the-movemental-thesis`, `ai-collapses-the-cost-of-integration`.

---
- ⏳ `design-audit` — pending
- ⏳ `visual-storytelling-audit` — pending
- ⏳ `color-audit` — pending
- ⏳ `typography-polish` — pending
- ⏳ `icon-audit` — pending
- ⏳ `tailwind-cleanup` — pending
- ⏳ `responsive-audit` — pending
- ⏳ `asset-match` / `asset-audit` — pending
- ⏳ `web-design-guidelines` — pending

**Companion prompts (read first):**
- [`home-page-revision-v2-decisive-hero-ssss-proof.md`](./home-page-revision-v2-decisive-hero-ssss-proof.md) — hero revision (supersedes Fix 9 below when the hero pass runs)
- [`home-page-narrative-credibility-ia-plan.md`](./home-page-narrative-credibility-ia-plan.md) — L2b trust discipline
- [`stitch-to-react-migration.md`](./stitch-to-react-migration.md) — token remap
- [`docs/design/DESIGN.md`](../../design/DESIGN.md) — semantic tokens, section variants, motion

---

## 0 · Non-negotiables

1. **Preserve all section `id`s:** `#top`, `#stakes`, `#path`, `#unfold`, `#audiences`, `#about`, `#invitation`. New sections get new ids; never repurpose an existing one.
2. **Semantic tokens only.** No raw hex, no `bg-white`, `bg-black`, `bg-blue-*`, `text-gray-*`. See DESIGN.md §8, §11.
3. **Primitives only.** Use `Section`, `Container`, `RevealOnScroll`, `ConceptLabel`, `SerifEm`, `Button`, `LogoStrip`. No bespoke layout wrappers.
4. **Canonical vocabulary is load-bearing.** The AI Stewardship Sequence = Safety, Sandbox, Skills, Solutions (spell the full phrase on first use; after that, "the AI Stewardship Sequence" or the stage names). Two intelligences = informational + relational. Field guide = `/book`. Do not fork.
5. **No fabricated proof.** Every logo, name, partner, and credit must be real. If not available today, leave the component scaffolded but empty rather than inventing.
6. **Editorial voice.** Calm, declarative. No manifesto posturing. No SaaS language.
7. **Tonal stacking over borders.** `bg-card` on `bg-section` is the "Gold Standard." No 1px dividers for sectioning (form borders excepted).

---

## Fix 1 · Add social proof strip (Declare)

**Context:** Page currently has zero social proof before the argument begins. `LogoStrip` primitive exists at [`src/components/primitives/logo-strip.tsx`](../../../src/components/primitives/logo-strip.tsx) and is unused on `/`.

**Placement:** New `Section` between the existing Hero (`#top`) and "Two equal errors". Variant `editorial`, spacing `sm`. Must sit *before* any argument so trust precedes the ask.

**Spec:**

- `ConceptLabel`: `Organizations we serve` (or `Partners & institutions` — pick the one that is truthful today)
- `LogoStrip` with 4–6 real organizational logos. Grouping strategy: see `affiliation-audit` and `logo-strip-author` skills.
- One optional sub-line (≤14 words), e.g. *"Trusted by churches, nonprofits, and institutions navigating AI with mission at stake."*
- No CTA, no headline. This is trust signal, not pitch.

**Authoring:** Run `/logo-strip-author` with the current list of real organizational affiliations before building. If zero real logos are available today, **do not build this section yet** — instead add a stub comment in the page file (`{/* TODO: logo strip — awaiting real affiliations, see Fix 1 */}`) and flag for the team.

**New section `id`:** `proof` (scroll-mt already handled by site chrome var).

---

## Fix 2 · Rewrite §"Why Movemental" into a real About block

**Current state:** [Lines 629–695](../../../src/components/sections/home/home-concept-modern-page-content.tsx#L629-L695) contains three self-declared authority statements under `id="about"`. No named people, no org history, no evidence.

**Problem:** The semantic `id="about"` promises About content. Visitors arrive from `#about` links expecting to learn who is behind this; they get three more paragraphs of thesis.

**Revised structure (same `id="about"`, same `editorial` variant, same `spacing="lg"`):**

```
ConceptLabel: About
Heading (H2): Movemental is built by [N] practitioners working at the intersection of leadership, formation, technology, and mission.
  (SerifEm on "practitioners" — aligns with existing serif emphasis pattern)

Grid — two columns at lg:
  Column A (5/12):
    — Portrait or team image (or NB2 atmospheric fallback if no portrait available)
    — 2–3 proof points as a list:
      • X years at the intersection of [work]
      • Books, articles, or frameworks published
      • Movements, cohorts, or orgs served
  Column B (7/12):
    — 80–120 word org bio in Alan's voice
    — Single "Read more about us →" link to /about

Closing one-liner (existing pattern — full width, muted-foreground):
  "We do not begin with AI solutions. We begin with the conditions that make AI use trustworthy, durable, and actually useful."
```

**Preserve:** the closing bridge paragraph. The authority statements (`AUTHORITY_STATEMENTS` const) **migrate** to `/about` as the page's lead content rather than being deleted.

**Blocker:** needs real names, portrait(s), and proof points. If unavailable today, scaffold the structure and surface the gap as a TODO. Do not fabricate.

---

## Fix 3 · Add newsletter capture (Convert)

**Context:** Infrastructure exists per CLAUDE.md (`/api/newsletter`, `TENANT_ORG_ID`, double opt-in). Zero surfaces on `/`. Largest low-intent conversion leak.

**Two placement options — pick ONE, do not add both:**

**Option A (recommended): Replace the redundant secondary CTA in the Invitation section.**
- In [lines 803–816](../../../src/components/sections/home/home-concept-modern-page-content.tsx#L803-L816), both CTAs currently point to `/contact`. Replace the ghost CTA with an inline email form.
- Form spec: single email input + `Subscribe` button, 1-line value prop above: *"Formation notes, field updates, and new writing — delivered rarely and carefully."*
- Validate via existing `/api/newsletter` endpoint. Requires `TENANT_ORG_ID` in env per CLAUDE.md.

**Option B: New dedicated section immediately before Invitation.**
- Variant `editorialAlt`, spacing `md`. One-line hook + email form + short reassurance ("No cadence promises we can't keep; unsubscribe any time").
- Use this option only if the Invitation gradient band needs to remain pure commitment.

**No new primitive.** Reuse form styling from existing contact form at `/contact`.

---

## Fix 4 · Add scroll-stop moment (emotional punctuation)

**Placement:** Between §"Where this lands" (`#audiences`, lines 570–626) and §"Why Movemental" (`#about`, lines 629–695). This is the seam between Orient and Declare-via-authority, which is exactly where a pattern interrupt earns its keep.

**Chosen option (from Phase 2 scoring — 22/25):** **NB2 atmospheric image + GSAP parallax + single assembling quote.**

**Why this over Spline or Spline+NB2:** Movemental's editorial restraint (Inter, hairline rules, no drop shadows per DESIGN.md) is violated by 3D scenes. Spline reads "tech startup"; NB2 + GSAP stays inside the Digital Curator register. You already have GSAP (`@gsap/react`), existing `RevealOnScroll` patterns, and NB2 skills.

**Spec:**

- New `Section` with `id="narrow-way"`, variant `editorial`, spacing `lg`, no `Container` (image is edge-to-soft-edge with safe zone).
- **Image:** 16:9 cinematic landscape. Generate via `/asset-generate` (NB2). Prompt direction — narrow path through a landscape at dawn, fog lifting, editorial b&w or desaturated color grade. See `asset-author-style` for Movemental brand conventions. Width 2560px, WebP + AVIF + JPG fallback, Supabase storage.
- **Overlay quote (GSAP assembling reveal):**

  > AI becomes trustworthy only when the path is walked in order.

  Serif, italic, `SerifEm`-style, `text-inverse-foreground` over the image. Words assemble sequentially on scroll enter. Parallax the background image at 0.85× scroll speed.
- **Attribution (optional):** small eyebrow beneath — `From the field guide` → links `/book`.
- **Mobile:** disable parallax (respect `prefers-reduced-motion`), center-crop image, keep quote legible.
- **Performance:** lazy-load; LCP must remain on hero. Image file ≤ 220KB compressed.

**Dependencies:** run `/asset-generate` for the image before building the component; commit the final asset to Supabase storage (per `image-optimize` skill).

---

## Fix 5 · Turn AI Stewardship Sequence cards into real entry points

**Current:** [Lines 455–488](../../../src/components/sections/home/home-concept-modern-page-content.tsx#L455-L488) render 4 step cards with no outbound links. Framework is the page's strongest asset and currently terminates on itself.

**Fix:** Each of the 4 cards gets a hairline footer link (`Learn more →`) to its article:

| Step | Target |
|---|---|
| 01 Safety | `/articles/safety-before-speed` |
| 02 Sandbox | `/articles/sandbox-discovery` |
| 03 Skills | `/articles/the-skill-of-ai` |
| 04 Solutions | `/articles/solutions-deployment` |

**Styling:** match the `border-b border-border pb-0.5 hover:border-foreground` treatment already used in §"Two intelligences" (line 557) for link consistency.

**Extend the `PATH_STEPS` const** ([line 9](../../../src/components/sections/home/home-concept-modern-page-content.tsx#L9)) with `href` on each entry; render only when present (fail-closed if article routes don't exist yet — verify with `Grep` before building).

---

## Fix 6 · Compress §"A different kind of response"

**Current:** [Lines 368–419](../../../src/components/sections/home/home-concept-modern-page-content.tsx#L368-L419) is a full `spacing="lg"` section functioning as a pure transition into the AI Stewardship Sequence. Content overlaps with the hero aside and the AI Stewardship Sequence section intro.

**Fix:** Delete this section entirely. Fold its essence into the AI Stewardship Sequence section intro ([lines 430–453](../../../src/components/sections/home/home-concept-modern-page-content.tsx#L430-L453)) by adding a single lead line above the existing intro:

> You're not being asked to master AI. You're being asked to lead faithfully on a new frontier — and that requires a different path.

Preserve the hairline-downward visual cue (line 400–406) by moving it to the bottom of §Stakes instead.

**Net change:** page goes from 9 flow sections to 8; rhythm tightens without losing the "lead faithfully" beat.

**Do not change:** any `id` on existing sections. The deleted section had no `id`.

---

## Fix 7 · Content sampler (optional, recommended)

**Placement:** Between §Two intelligences (`#unfold`) and §Audiences (`#audiences`), *or* absorbed into the expanded About block in Fix 2 as a "Recent writing" list. Pick one, not both.

**Spec:** 3-card editorial grid — 2 articles + 1 book chapter. Card: eyebrow (type) · title · 1-line summary · hairline link. Uses existing `bg-card` on `bg-section` pattern.

**Decision needed:** which 3 pieces best represent the thesis to a first-time visitor? Default candidates from the canon: `two-intelligences-integration`, `why-order-matters`, book ch. 2. Confirm with editorial before building.

**Skip this fix** if the content inventory isn't ready to show a curated 3. Better empty than mediocre.

---

## Fix 8 · Per-section copy touch-ups

Small, bounded. Each is a single-line or single-link change.

- **§Two equal errors** — Add hairline link below the closing interpretation: `See the path →` linking to `#path`.
- **§Two intelligences** — Tighten the em-dash dense bodies in [lines 75–97](../../../src/components/sections/home/home-concept-modern-page-content.tsx#L75-L97). Target: reduce each body by ~15% without losing meaning. Preserve the `<em>content</em>` / `<em>people</em>` serif emphases.
- **§Grounding** — Add closing link after the two lists: `Read the field guide →` → `/book`.
- **§Invitation** — Differentiate the CTAs per Fix 3 (primary `/contact`, secondary newsletter or `/book`).

---

## Fix 9 · Hero (parked — runs last)

**Do not execute until every other fix above is settled.** The hero depends on everything downstream being locked.

**Reference:** [`home-page-revision-v2-decisive-hero-ssss-proof.md`](./home-page-revision-v2-decisive-hero-ssss-proof.md) §2. That prompt already drafts the revised headline, subhead, and aside. When the hero pass runs, reconcile any conflicts between that draft and findings from the remaining audits in this file's "Audit passes completed" list.

---

## Narrative audit findings (2026-04-18)

**Ground truth cited:**
- [`docs/articles/two-intelligences-integration.md`](../../articles/two-intelligences-integration.md) — dual fragmentation; 4-stage sequence (integration → activation → formation → multiplication); per-audience application.
- [`docs/book-development/fragmentation-manuscript-ordered/05-the-six-stages-at-a-glance.md`](../../book-development/fragmentation-manuscript-ordered/05-the-six-stages-at-a-glance.md) — canonical six stages: **Fragmentation → Integration → Activation → Formation → Multiplication → Movement**; stall pattern (most orgs stall fragmentation → integration); "one system evolving."
- [`src/components/sections/fragmentation-story/fragmentation-story-content.ts`](../../../src/components/sections/fragmentation-story/fragmentation-story-content.ts) — audience rails (`leader`, `nonprofit`, `church`, `institution`), intelligence field keys (`informational` / `relational`).
- [`docs/build/prompts/home-page-revision-v2-decisive-hero-ssss-proof.md`](./home-page-revision-v2-decisive-hero-ssss-proof.md) — the AI Stewardship Sequence articles are canonical for Movemental (Safety, Sandbox, Skills, Solutions).

## Dimension scores

| Dimension | Score | Evidence |
| --- | --- | --- |
| Copy (shared vocabulary) | **Partial** | The AI Stewardship Sequence and "two intelligences" are used correctly. Canonical terms **fragmentation**, **integration**, **infrastructure / foundation**, **library / graph / voice / pathways**, and **scenius** never appear on the page. |
| Narrative (arc + tension) | **Partial** | Strong problem → reframe → mechanism → invitation arc, but the mechanism (the AI Stewardship Sequence) is decoupled from the broader canonical trajectory (six stages). No visible bridge from "navigate AI wisely" to "fragmentation → movement." |
| Framework (mental model) | **Partial** | Two intelligences invoked correctly in `#unfold`. **Six stages never named.** The canonical stall point (Stage 1 → Stage 2) — the load-bearing claim of the whole book — is absent. The AI Stewardship Sequence is the only framework visible; it coexists with the six stages in canon but the relationship between them is not modeled for the visitor. |
| Business model (positioning) | **Misaligned (tone)** | Page reads as advisory / consultancy ("we help you navigate AI with clarity") rather than as **digital infrastructure** (library, graph, voice, pathways — the foundation layer beneath surfaces). The word "infrastructure" or "foundation" appears zero times. Canonical `two-intelligences-integration.md` is explicit that foundation-layer work is the offer. |
| Design charter (copy-level) | **Aligned** | Calm, declarative, editorial voice respected. No hype, no manufactured stats. Light flag: "We do not begin with AI solutions" has a slight manifesto lean — acceptable. |

## Drift patterns observed

- **Tool-first / advisory drift.** "We help mission-driven organizations walk it" frames the relationship as guidance, not infrastructure. Canonical stance is foundation-building (informational and relational graphs, canonical versions, ontology, decision log, pathways).
- **Skip-integration drift.** Page names a different path (the AI Stewardship Sequence) without acknowledging that the broader canon identifies **integration** as the specific stall point most organizations collectively fail. A visitor who agrees with the sequence is never told where the real ceiling lives.
- **AI-as-subject drift.** The page treats "navigating AI" as the job to be done. Canonical frame inverts this: **AI made the fragmentation tax visible and urgent** — the job is integrating two intelligences; AI is the reason this suddenly matters, not the thing being navigated for its own sake.
- **Book invisibility.** The fragmentation book — the field guide the whole canon leans on — appears as a single inline link in `#unfold` to chapter 2. It is not treated as the load-bearing longform artifact it is.

## Verdict

The home page is **not misaligned with canon — it under-represents canon.** The AI Stewardship Sequence and two intelligences are accurate. What is missing is the bridge from the sequence → six stages, the naming of "integration" as the canonical stall, and the reframing of the offer as digital infrastructure rather than AI advisory. The fixes below add bridges; they do not replace the sequence.

---

## Fix 10 · Name "integration" as the canonical stall

**Problem:** The word **integration** never appears on the page. Per [`05-the-six-stages-at-a-glance.md`](../../book-development/fragmentation-manuscript-ordered/05-the-six-stages-at-a-glance.md), "almost every organization stalls between Stage 1 and Stage 2" — this is the single most load-bearing claim in the entire book. The home page's "two equal errors" diagnostic is good, but it describes a *symptomatic* error (fast vs slow), not the *structural* one.

**Fix:** Add one sentence to the closing interpretation line in §"Two equal errors" ([line 287–295](../../../src/components/sections/home/home-concept-modern-page-content.tsx#L287-L295)) that names the canonical stall:

**Current:**
> Most organizations oscillate between these without realizing that **both fail the same way** — they treat AI as a tool problem when it is a judgment problem.

**Revised:**
> Most organizations oscillate between these without realizing that **both fail the same way** — they treat AI as a tool problem when it is, structurally, a problem of **integration**: the informational and relational intelligence an organization runs on has never been brought together into a coherent foundation.

This is the one place on the page where the canonical stall is cheap to name without restructuring — it bridges "two equal errors" into the two-intelligences block that already exists downstream.

**Supersedes:** the Fix 8 touch-up for this section ("hairline link to #path"). Keep the link, add the sentence.

---

## Fix 11 · Reframe the offer as digital infrastructure (not AI advisory)

**Problem:** Zero occurrences of **infrastructure**, **foundation**, **library**, **graph**, **voice**, or **pathways** on the home page. Canonical positioning per [`two-intelligences-integration.md`](../../articles/two-intelligences-integration.md) §1 calls these the concrete outputs of integration — they are Movemental's offer.

**Fix:** Three light-touch insertions (no new sections):

1. **§"A different kind of response" (or its compressed-in-AI-Stewardship-Sequence-intro successor per Fix 6).** Replace "a different kind of response" with explicit infrastructure language. Proposal:

   > You're not being asked to master AI. You're being asked to build the **foundation** that makes faithful leadership possible on a new frontier — an integrated library, a legible relational graph, a coherent voice, and pathways that actually form people.

   This names four canonical integration outputs (library · graph · voice · pathways) in the visitor's first exposure to what the work actually produces.

2. **§"Why Movemental" bridge line ([line 651–656](../../../src/components/sections/home/home-concept-modern-page-content.tsx#L651-L656)).** Replace:

   > We do not begin with AI solutions. We begin with the conditions that make AI use trustworthy, durable, and actually useful — then we help build what now fits.

   with:

   > We do not begin with AI tools. We begin with the **foundation layer** — the integrated library, graph, voice, and pathways underneath AI — because nothing downstream holds without it.

3. **§"What this produces" ([`PRODUCES` const, line 107–112](../../../src/components/sections/home/home-concept-modern-page-content.tsx#L107-L112)).** Replace the current four generic outputs with canonical integration outputs:

   - An integrated **library** of your core knowledge, frameworks, and media.
   - A legible **relational graph** of the people and networks the work actually moves through.
   - A recoverable **voice** — a canonical articulation of how your work sounds.
   - **Pathways** that form people, not just inform them.

   This converts the page's one "what does Movemental actually make" list from abstract language into the canonical four-part foundation.

**Dependency:** Fix 2 (About rewrite) should inherit this vocabulary. Fix 11 §3 supersedes the current `PRODUCES` content.

---

## Fix 12 · Bridge the AI Stewardship Sequence → six stages

**Problem:** The AI Stewardship Sequence is the canonical adoption-pathway framework. Six stages is the canonical organizational-trajectory framework. A visitor who accepts the sequence on the home page has no way to discover that there is a larger trajectory they are being positioned inside of.

**Fix:** Add a single paragraph and link immediately after the closing paragraph of the AI Stewardship Sequence section ([line 490–502](../../../src/components/sections/home/home-concept-modern-page-content.tsx#L490-L502)):

> The AI Stewardship Sequence is how an organization safely **enters** AI. What comes after safe entry is a longer trajectory — **Fragmentation, Integration, Activation, Formation, Multiplication, Movement** — the six stages by which an organization becomes a field rather than a franchise. The sequence is the on-ramp. The trajectory is the road.
>
> *Read the field guide → /book*

**Styling:** hairline-link treatment matching the `border-b border-border pb-0.5` pattern from §"Two intelligences" (line 557). Reveal delay after the existing closing-paragraph Reveal.

**Why here:** The AI Stewardship Sequence is where a first-time visitor first encounters "ordered steps." It is the right seam to introduce the broader six-stage trajectory without derailing the page.

**Dependency:** none. Self-contained copy addition.

---

## Fix 13 · Deepen audience cards with canonical integration language

**Problem:** Audience cards (`AUDIENCE_HUBS`, [line 50–69](../../../src/components/sections/home/home-concept-modern-page-content.tsx#L50-L69)) use generic "integrate X, Y, Z" language without naming the canonical dual intelligences. [`two-intelligences-integration.md`](../../articles/two-intelligences-integration.md) §5-8 has explicit per-audience breakdowns for movement leaders, nonprofits, churches, and institutions that the cards could draw from directly.

**Fix:** Rewrite each card body to explicitly name **one informational fragmentation** and **one relational fragmentation** that audience carries, then the integration. Draft:

- **Nonprofits:** *Donor letters, impact reports, and program frameworks scattered across drives — and donor histories, partner dynamics, and staff memory held in individual heads. Integrate both, and the story the world hears still sounds like yours.*
- **Churches:** *Teaching archives, pastoral care notes, and discipleship pathways in five tools — and relational memory of who's in what season living only in the staff that happens to still be there. Integrate both, and formation becomes architectural.*
- **Institutions:** *Curriculum, faculty knowledge, and accreditation artifacts across decades of systems — and alumni, donor, and partner relationships no single department sees whole. Integrate both, and the institution remembers itself.*

Each card preserves its existing `/nonprofits`, `/churches`, `/institutions` link.

**Voice check:** drafts above are in Alan's register; tune for final. Reference [`alan-voice`](../../../.claude/skills/alan-voice/SKILL.md) skill before shipping.

**Dependency:** none. Self-contained copy change on the existing `AUDIENCE_HUBS` const.

---

## Fix 14 · Reframe "What this is not"

**Problem:** `NOT_THIS` list ([line 100–105](../../../src/components/sections/home/home-concept-modern-page-content.tsx#L100-L105)) negates generic bad options ("not a consultancy, not tool-first, not fear-based, not a shortcut"). It does not distinguish Movemental from the **adjacent categories visitors are most likely to confuse it with** per canonical positioning.

**Fix:** Replace with canonical negations — each one earned by the corpus:

- *Not a content refresh. The ache is not that you need a better deck.*
- *Not a new platform. The ache is not that you need another tool.*
- *Not AI adoption. AI made the fragmentation tax visible; it is not the work itself.*
- *Not a shortcut around leadership. Integration surfaces the decisions you have been avoiding.*

Each negation directly maps to a canonical diagnosis from [`two-intelligences-integration.md`](../../articles/two-intelligences-integration.md) §1 ("content problem / systems problem") and [`05-the-six-stages-at-a-glance.md`](../../book-development/fragmentation-manuscript-ordered/05-the-six-stages-at-a-glance.md) (the stall pattern).

**Supersedes:** the existing `NOT_THIS` const values.

---

## Fix 15 · Add an "AI amplifies a grounded corpus" beat

**Problem:** The canonical frame is that **AI made the fragmentation tax visible** ([book ch. 4](../../book-development/fragmentation-manuscript-ordered/04-the-moment-ai-made-the-tax-visible.md)), and that grounded AI (retrieval on an integrated corpus) is faithful extension, whereas ungrounded AI is "fluent approximation on top of scatter." The home page never makes this move — it just says AI is hard to navigate.

**Fix:** Add one beat in §"Two intelligences" ([line 549–566](../../../src/components/sections/home/home-concept-modern-page-content.tsx#L549-L566)) immediately after the existing closing statement:

> **Ungrounded AI produces fluent approximation** on top of organizational scatter — confident text that sounds like you and isn't. **Grounded AI** — retrieval over an integrated informational corpus routed through a legible relational graph — produces faithful extension of the work. The difference is the foundation underneath.

**Styling:** same muted-foreground, preserve the existing book link beneath.

**Why here:** it is where two-intelligences lands; it is where AI-as-amplifier belongs. No new section required.

**Dependency:** none.

---

## Fix 16 · Soft-flag for the AI Stewardship Sequence articles

**Problem:** AI Stewardship Sequence cards (Fix 5 adds links to `/articles/{safety-before-speed, sandbox-discovery, the-skill-of-ai, solutions-deployment}`) require those articles to be present and live. Per the v2 hero revision prompt, these are canonical references. Verify before Fix 5 ships.

**Fix:** Pre-flight check — before shipping Fix 5, confirm each article route exists and is publicly reachable:

```bash
ls docs/articles/safety-before-speed.md \
   docs/articles/sandbox-discovery.md \
   docs/articles/the-skill-of-ai.md \
   docs/articles/solutions-deployment.md
```

If any are missing or still drafts, either (a) prioritize publishing before Fix 5, or (b) scope Fix 5 to only include the steps whose articles are ready.

**Dependency of Fix 5.** Non-destructive scope reduction is acceptable.

---

## Page-auditor findings (2026-04-18)

Full six-pass audit ran post-fix (after Fixes 5, 6, 8, 10–16 shipped). Verdict: **sequencing strong, copy mostly clean, two cross-site rule violations, one weak section.** New fixes 17–26 below.

**Score summary:**

| Pass | Score / Verdict |
| --- | --- |
| 1. Narrative sequencing | Strong — arc maps canonical homepage rubric |
| 2. Copy & language | Mostly clean — monotony in §Why Movemental; abstract-noun stack in §Invitation |
| 3. Typography & hierarchy | Good variety; one typographic lift missing between §Grounding and §Invitation |
| 4. UI / proof / demonstration | Page is too textual; "library/graph/voice/pathways" named 4× without ever being shown |
| 5. Proof burden | One self-declared authority block (§Why Movemental); one empirical claim without link ("Most organizations try to begin with solutions") |
| 6. Cross-site role | Owns correct job; **missing `/fragmentation` and `/walkthrough` links** — both cross-site rule violations |

---

## Fix 17 · Rewrite `AUTHORITY_STATEMENTS` — proof-adjacent, not self-declared

**Problem:** Three self-declared "We [verb]" statements in a row. Per `copy-patterns.md` marker 5 (authority without grandiosity) and §4 (monotony patterns), this is a double failure: self-declared authority + three identical subject starts. Current bodies:

1. "We understand the leadership and formation problem."
2. "We are built for mission-driven organizations."
3. "We build what the work actually needs."

**Fix:** rewrite as proof-adjacent — each one either points to a verifiable surface or describes a concrete fact rather than asserting authority. Break the "We [verb]" shape in at least two of the three.

**Proposed rewrite (draft — tune with `alan-voice`):**

```ts
const AUTHORITY_STATEMENTS = [
  {
    n: "01",
    t: "Leadership and formation, not tools.",
    body: "AI pressures judgment, voice, trust, and organizational coherence. Those are leadership problems — and they precede any tool choice. Our work begins where the leadership work begins.",
  },
  {
    n: "02",
    t: "Shaped inside real organizational questions.",
    body: "Movemental was built alongside real movement, church, nonprofit, and institutional work — not imported from generic software logic. The product reflects what the work asked for.",
    // TODO: link to /case-studies once a verifiable case is live.
  },
  {
    n: "03",
    t: "Conditions before capabilities.",
    body: "Before tools, workflows, and agents can be trustworthy, the foundation has to hold. That is where we begin — and why downstream deployments last.",
  },
] as const;
```

Each headline is a statement, not a self-claim. Bodies describe the posture rather than assert competence. Leaves a `TODO` for `/case-studies` link (currently unverifiable).

**Also resolves:** Fix 26 (monotony). Merge the two edits.

---

## Fix 18 · Delete §Why Movemental closing paragraph

**Problem:** Closing paragraph of §Why Movemental ([line 703–710](../../../src/components/sections/home/home-concept-modern-page-content.tsx#L703-L710)) restates the H2 verbatim:

- H2: *"We work at the intersection of leadership, formation, technology, and mission."*
- Closing: *"We work at the intersection of leadership, formation, technology, and mission — helping organizations move wisely before confusion hardens into drift or reaction."*

This is the §4 monotony pattern: same idea stated twice with nothing new added.

**Fix:** delete the closing RevealOnScroll. The authority rail + the infrastructure bridge line above it already carry the section; the closing is decorative.

**Alternative (if the section feels bare without it):** replace with a single hairline-link line that routes to `/about` or `/articles/the-movemental-thesis`, once those pages are load-bearing.

---

## Fix 19 · Link grounded-AI beat → `/walkthrough`

**Problem:** §Two-intelligences grounded-AI beat (Fix 15) makes a strong claim about AI behavior: *"retrieval over an integrated informational corpus routed through a legible relational graph produces faithful extension of the work."* Per cross-site map, AI product truth is owned by `/walkthrough`. Current beat has no link out.

**Pre-flight:** verify `src/app/(site)/walkthrough/page.tsx` exists before adding the link.

**Fix:** append a hairline link beneath the grounded-AI paragraph, above the existing "Read Chapter 2" link:

```tsx
<Link
  href="/walkthrough"
  className="group mt-3 inline-flex items-center gap-1.5 border-b border-border pb-0.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
>
  See how this works in practice
  <ArrowRight
    className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
    aria-hidden
  />
</Link>
```

Alternative label: *"See it in the walkthrough"*.

---

## Fix 20 · Link to `/fragmentation`

**Problem:** §Path forward's six-stages bridge paragraph (Fix 12) names all six canonical stages but only links to `/book`. Per cross-site map: pages that mention fragmentation must link to `/fragmentation`. The page never links there today.

**Pre-flight:** verify `src/app/(site)/fragmentation/page.tsx` exists.

**Fix (pick one):**

- **Option A (recommended):** add a second hairline link beside the existing "Read the field guide →" in the §Path bridge:

  ```tsx
  <Link href="/fragmentation" className="...same styles...">
    Walk the six stages
    <ArrowRight ... />
  </Link>
  ```

  Rationale: the bridge names the six stages; the link should resolve to the page that owns the walkthrough.

- **Option B:** add `/fragmentation?audience=…` links to audience cards in §Where this lands. More work (requires fragmentation page to support the query param), but aligns with audience-page cross-site patterns.

Start with Option A.

---

## Fix 21 · System map — library / graph / voice / pathways

**Problem (Pass 4):** The page names the four canonical integration outputs four times — AI Stewardship Sequence intro (Fix 11 §1), §Why Movemental bridge (Fix 11 §2), §Grounding `PRODUCES` (Fix 11 §3), and the grounded-AI beat (Fix 15) — but never shows them. A page that names the foundation that often earns a single visual moment.

**Fix (design call needed):** small four-node diagram placed between §Path forward (after the AI Stewardship Sequence closing + six-stages bridge) and §Two-intelligences. Nodes: `Library · Graph · Voice · Pathways`. One sentence below labeling the diagram as the foundation layer.

**Scope:** SVG or CSS-grid diagram using existing semantic tokens. No animation required for v1; could layer GSAP parallax in v2.

**Dependency:** overlaps with Fix 4 (scroll-stop). If the scroll-stop between §Audiences and §Why Movemental ships, the system map should sit earlier in the page to avoid two visual moments stacked. Design call needed.

**Blocked until:** scroll-stop placement (Fix 4) + design direction chosen.

---

## Fix 22 · §Invitation — concrete artifacts, not stacked nouns

**Problem:** `§Invitation` still contains *"Begin with a path that can actually hold integrity, learning, and long-term use."* — three stacked abstract nouns per `copy-patterns.md` §5 (elegant-but-empty test).

**Fix:** replace with concrete artifacts using the Fix 11 §3 pattern. Target the closing block inside §Invitation ([line 819–835](../../../src/components/sections/home/home-concept-modern-page-content.tsx#L819-L835)).

**Proposed rewrite:**

```tsx
<p className="text-[1.15rem] leading-relaxed text-muted-foreground">
  Don&rsquo;t guess your way through AI. Begin with a path that can
  hold its shape in year three &mdash;{" "}
  <span className="font-medium text-foreground">
    a coherent voice, pathways that still form people, and judgment that
    still travels with the work
  </span>
  .
</p>
```

Keeps the "year three" time horizon implicit by naming what should survive it, rather than asking the reader to imagine "long-term use" in the abstract.

---

## Fix 23 · Soften or cite "Most organizations try to begin with solutions"

**Problem (Pass 5):** §Path forward closing claims *"Most organizations try to begin with solutions. That is why the results do not hold."* — empirical claim, backed by book Ch. 5 (stall pattern) but currently unlinked. Per `copy-patterns.md` proof burden: soften or cite.

**Fix:** the line is canonical and accurate — link rather than soften. Turn "Most organizations try to begin with solutions" into a hairline link to `/book/read/the-six-stages-at-a-glance` (or the article that carries the claim — verify which is published).

**Alternative:** leave the copy, add a *"The book is specific about this →"* hairline link on the next line.

**Pre-flight:** verify `/book/read/the-six-stages-at-a-glance` exists before linking.

---

## Fix 24 · §Stakes closing — replace "adaptive response"

**Problem:** §Stakes closing reads *"…and it requires an adaptive response."* — "adaptive" is a placeholder adjective; sentence adds nothing the previous sentence didn't.

**Fix:** either drop the trailing half or replace with a concrete move.

**Proposed rewrite:**

```tsx
<p className="mt-2 text-[1.05rem] text-muted-foreground">
  It is a problem of judgment, responsibility, and organizational
  coherence &mdash; and it is answered by building the foundation
  before deploying the tools.
</p>
```

Connects the stakes section to the AI Stewardship Sequence intro that follows it, and trades the abstract "adaptive response" for a concrete direction.

---

## Fix 25 · Typographic climax between §Grounding and §Invitation

**Problem (Pass 3):** §Invitation headline at clamp(2.4rem, _, 4rem) is the only real typographic climb in the page. §Stakes / §Path / §Unfold / §Audiences / §Why Movemental all sit at roughly clamp(2, _, 3). The page flattens between §Path and §Invitation.

**Fix (optional, design call):** one display-size line between §Grounding and §Invitation — either a full-width pull quote from the book or a single declarative sentence. Examples of what could carry it:

- *"Integration is not a phase. It is the foundation every later phase is standing on."*
- A pulled passage from `docs/book-development/fragmentation-manuscript-ordered/05-the-six-stages-at-a-glance.md`.

**Dependency:** interacts with Fix 4 (scroll-stop) and Fix 21 (system map). If all three land, the mid-page rhythm gets over-crowded. Pick at most two of {Fix 4, Fix 21, Fix 25}.

---

## Fix 26 · Break "We [verb]" monotony

**Subsumed by Fix 17.** The `AUTHORITY_STATEMENTS` rewrite resolves the monotony pattern. Mark Fix 26 done when Fix 17 ships.

---

## Design-audit findings (2026-04-18)

Full DESIGN.md fidelity pass run after Fixes 1–25 shipped. Verdict: **4.5 / 7 dimensions passing**; 3 real violations shipped, 4 deferred with rationale.

### Fixes 27–29 (shipped)

| Fix | Title | Status |
| --- | --- | --- |
| 27 | Delete local `SerifEm` component; use plain `<em>` (base-layer auto-applies Instrument Serif) | ✅ Shipped — 4 usages migrated; §Two-errors uses `<em data-emphasis="serif">` for in-`<p>` emphasis |
| 28 | `rounded-[20px]` → `rounded-card` (canonical 14px per DESIGN.md §3.5) | ✅ Shipped — 5 card sites updated |
| 29 | Migrate `variant="editorial"` / `"editorialAlt"` → canonical `"default"` / `"section"` | ✅ Shipped — 8 section definitions updated; tonal stacking now uses canonical names |

### Deferred with rationale

- **`font-serif italic` applied to whole H3s** (~22 instances across Stakes, the AI Stewardship Sequence, Two-intelligences, Audiences, Foundation, Sampler, Authority rail). DESIGN.md §1/§5 pattern is Inter H3 with `<em>` for emphasis — but these are display-size card labels, not body copy. Changing 22 instances without a visual check is risky. Flag for future polish pass when fresh eyes are on the page.
- **`text-[clamp(...)]` ad-hoc sizing on H1/H2** instead of `Display` primitive. Migration is larger and `Display` isn't consistently used elsewhere on the page. Defer.
- **Ad-hoc `tracking-[-0.005em]`** — primarily inside the deleted `SerifEm` (resolved by Fix 27). Any remaining inline instances are on whole-H3s covered by the deferred item above.
- **`bg-border` grid-gap trick in §Foundation** for hairline dividers between cards. Non-canonical per DESIGN.md but is a common Tailwind pattern and produces clean hairlines on Concept Modern. Keep.

### What this pass verified passing
- No hardcoded colors (no `bg-white`/`bg-black`/hex/`text-white`/`text-black`).
- No decorative drop shadows; tonal stacking carries elevation.
- No stray `"use client"` directives; client components imported properly.
- Heading order is sequential; ARIA labels and `aria-hidden` on decorative icons are consistent.
- `rounded-full` on primary CTA pill confirmed via shadcn `Button`.

---

## Visual-storytelling audit findings (2026-04-18)

Full section-rhythm + card-storytelling pass run after design-audit Fixes 27–29 shipped. Verdict: **5 / 7 dimensions passing**; 3 actionable fixes shipped, 2 flagged for future polish.

### Fixes 30–32 (shipped)

| Fix | Title | Status |
| --- | --- | --- |
| 30 | §Grounding `default` → `section` — breaks the 5-default-in-a-row tonal flattening in the bottom half | ✅ Shipped |
| 31 | §Pull-quote `default` → `midnight` — page's first regional dark band; authority moment before invitation; `text-inverse-foreground` + `text-inverse-foreground/60` on blockquote + figcaption | ✅ Shipped |
| 32 | Add "All writing →" hairline link to `/articles` below §Writing cards — every other card-grid section terminates in a link, §Writing was the exception | ✅ Shipped |

### Flagged but not shipped (rationale)

- **§Foundation `overflow-hidden` clips cell reveal transforms (MEDIUM).** The `gap-px` + `bg-border` hairline trick on the 4-node grid clips the `translateY(12px)` intro animation of each cell. Only visible during the ~700ms reveal window on first scroll-in. Fixing requires either grid-level reveal (loses stagger) or reworking the hairline approach entirely. Cosmetic, not load-bearing — defer.
- **Ad-hoc `max-w-[Nch]` throughout the page (LOW).** Already flagged in design-audit as deferred. Use `--prose-max` or `--container-narrow` tokens in a future consolidation pass.

### What this pass verified passing

- Card structure uniform across §Two-intelligences / §Audiences / §Writing / §Foundation / §About: eyebrow → title → body → hairline link. Pattern adherence strong.
- Numbered-step formatting (`text-xs font-medium uppercase tabular-nums tracking-eyebrow text-ink-soft`) identical across §Path (4), §Authority (3), §Two-errors (2).
- Grid variety: 2-col, 3-col, 4-col, and asymmetric layouts mixed — avoids monotony.
- `RevealOnScroll` stagger (`delaySec={0.1 + i * 0.08}`) consistent; `prefers-reduced-motion` respected via base layer.
- Concept Modern italic emphasis convention now canonical after Fix 27 deletion of `SerifEm`.

---

## Color-audit findings (2026-04-18)

Token-level contrast pass run after 32 fixes shipped. Audit performed against the **current Concept Modern palette** (cream `#faf6ee` / ink `#19150f` / ink primary pill) — the color-audit skill's embedded "Palette Reference" is stale (still references the older Digital Curator blue palette) and was ignored.

### Fix 33 (shipped — globals.css)

| Fix | Title | Status |
| --- | --- | --- |
| 33 | Darken `--ink-soft` from `#9f978b` (2.68:1 on paper, fails WCAG AA) to `#7e786f` (~4:1, clears AA large-text / UI). Light-mode only; dark-mode `ink-soft` already passes at 5.36:1 (cream @ 54%) | ✅ Shipped |

### What this pass verified passing

- Token inventory complete for Concept Modern (surface ramp, ink scale, primary pill, inverse/Midnight, chrome, semantic).
- All body-text pairs meet WCAG AA: foreground/background ~15:1, foreground/card ~19:1, muted-foreground/background ~6.5:1, muted-foreground/section ~4.97:1, primary-foreground/primary ~18:1.
- Midnight pairs all pass: inverse-foreground ~18:1, `/60` ~6.4:1, `/70` ~8.6:1 (Fix 31 pull-quote and ConceptLabel inverse variant both fine).
- Tonal stacking monotonic and correct (card ↑ background ↑ section=elevated ↑ surface-highest ↑ midnight ↓).
- 60-30-10 distribution exemplary: paper+ink dominate, white cards provide ghost-lift secondary structure, primary ink pill used only on 2 CTAs, no competing accents.
- No hardcoded colors, no non-semantic token usage (already cleared by design-audit).

### Known residual

- `--ink-soft` at 4:1 clears AA large-text / UI but not AA body (4.5:1). Eyebrow meta is small uppercase (text-xs), which is technically body-text-size. For strict AA body compliance, ink-soft would need to drop to ~`#756d62` — but that compresses the hierarchy against `--muted-foreground` (#6b6660). The 4:1 value is the pragmatic floor: strong enough for small meta labels, distinguishable from muted-foreground. Document for a future dedicated a11y pass if strict AA body is needed.

---

## Typography-polish findings (2026-04-18)

Audit run after color-audit Fix 33. Skill's "Inter only — no exceptions" rule is stale (predates Concept Modern's Instrument Serif emphasis layer) — audited against current DESIGN.md §5.

### Fixes 34–35 (shipped)

| Fix | Title | Status |
| --- | --- | --- |
| 34 | Bump 5 sub-12px eyebrow uses from `text-[0.72rem]` (11.52px) to `text-[0.78rem]` (matches canonical `Eyebrow` primitive size; clears 12px readability floor) — §Two-intelligences card tags, §Writing card eyebrows, §Audiences card tags, §Grounding "What this is not" / "What this produces" headers | ✅ Shipped |
| 35 | Migrate 12 usages of local `ConceptLabel` component to canonical `<Eyebrow withDot>` primitive; delete the local component. Micro-differences (text-xs → text-[0.78rem], gap-2 → gap-[0.55rem], flex → inline-flex, built-in mb-5 → explicit className) now canonical | ✅ Shipped |

### Deferred with rationale

- **Hero H1 / 9 section H2s use bespoke `text-[clamp(...)]` instead of `<Display>` primitive.** Sizes differ from primitive lg/md/sm by small margins (hero is clamp(2.6rem, 6.2vw, 5rem); Display lg is clamp(2.6rem, 6.4vw, 5.5rem)). Migration risks visual drift without eyeball check. Flagged in design-audit, still deferred.
- **9 H3s use full `font-serif italic` treatment instead of `<em>` emphasis inside an Inter H3.** Wrapping contents in `<em>` would trigger the base-layer `[h1–h4] em` rule (Instrument Serif 400 italic at 1.04em with -0.01em tracking) — but that's a 4% size bump from current rendering. Also, italicizing founder names ("Alan Hirsch", "Brad Brisco", "Josh Shepherd") is conventionally unusual. Requires visual design decision before changing.

### What this pass verified passing

- Inter + Instrument Serif loaded via `next/font/google` in layout.tsx; Instrument Serif reserved for `<em>` emphasis per DESIGN.md §5.
- Single H1 per page (hero).
- Heading hierarchy sequential (h1 → h2 → h3); no skipping.
- All H2s have following body content (no orphaned headings).
- Body text ≥ 16px everywhere (clamp minimums ≥ 1rem).
- Prose blocks capped via `max-w-[NNch]` or `max-w-[--prose-max]`.
- Responsive clamp() sizing throughout.
- Post Fix-27: plain `<em>` and `[data-emphasis="serif"]` are the only Instrument Serif entry points.

---

## Tailwind-cleanup findings (2026-04-18)

Audit run after typography-polish Fix 35. Skill doc is stale (references old Digital Curator `--radius: 0.375rem`, `#0053db` primary) — audited against current Concept Modern DESIGN.md.

### Fixes 36–39 (shipped — Tailwind v4 canonical-form modernizations)

| Fix | Title | Status |
| --- | --- | --- |
| 36 | `scroll-mt-[var(--site-chrome-total)]` → `scroll-mt-(--site-chrome-total)` (10 sites) — canonical v4 CSS-var shorthand | ✅ Shipped |
| 37 | `duration-[250ms]` → `duration-250` (2 sites) — canonical v4 millisecond-integer form | ✅ Shipped |
| 38 | `max-w-[var(--container-max)]` → `max-w-(--container-max)` (1 site) — canonical v4 CSS-var shorthand; **ignored** the linter's suggestion to use `max-w-max` because that resolves to `max-content` intrinsic sizing, not the 1200px token value | ✅ Shipped |
| 39 | `[&:nth-child(Nn)]:utility` → `nth-[Nn]:utility` (8 class-utilities across 3 lines in §Path step rail) — canonical v4 nth-child shorthand | ✅ Shipped |

### What this pass verified passing

- **Hardcoded colors:** zero. All prior passes (color-audit, design-audit) cleared non-semantic palette classes.
- **Decorative shadows:** zero. Tonal stacking + Ghost Lift carry all elevation.
- **Dark mode assumptions:** zero `dark:` prefixes or `html.dark` dependencies.
- **Raw HTML bypassing primitives:** remaining deferrals (Display primitive for hero / H2s, font-serif H3s) already tracked in design-audit and typography-polish; not in scope for cleanup.
- **Borders:** 9 uses of `border-border` or `border-foreground` — all legitimate structural hairlines on rail grids per DESIGN.md §3.1 allowance, plus one 2px stylistic left-border on the hero "note to leadership" aside.
- **Arbitrary values that look like anti-patterns:** the ~78 remaining `[...]` bracket uses are all legitimate — `clamp()` for fluid type / spacing, `NNch` for reading measure, and CSS var refs (which now use the shorthand form after Fixes 36/38).

---

## Responsive-audit findings (2026-04-18)

Static analysis across breakpoints 375 / 640 / 768 / 1024 / 1280px. No Chrome DevTools MCP available for visual verification, but layout constraints and grid breakpoints were analytically checked.

### Fixes 40–41 (shipped)

| Fix | Title | Status |
| --- | --- | --- |
| 40 | §Two-intelligences `lg:grid-cols-2 lg:gap-6` → `md:grid-cols-2 md:gap-6` — cards now go 2-col at tablet (768px) instead of waiting until laptop (1024px); eliminates 256px of wasted tablet real estate | ✅ Shipped |
| 41 | §Stakes `sm:grid-cols-3 sm:gap-10` → `md:grid-cols-3 md:gap-10` — 3-col rail activates at 768px (~220px per column) instead of 640px (~173px per column); each H3 + body gets room to breathe | ✅ Shipped |

### Flagged but not fixed

- **Subscribe button `h-9` (36px) in `NewsletterForm`** — below 44px ideal touch target. Passes WCAG AA 2.5.5 (24x24 min with exceptions). Not fixing here — the component is shared with other surfaces (footer, etc.); changing its size has wider implications than the home page.
- **Inline hairline links** ("Learn more", "All writing", etc.) at ~20px tap height — acceptable for inline text per WCAG AA. Not fixing.

### What this pass verified passing

- No horizontal overflow at any of the five sampled breakpoints (375 / 640 / 768 / 1024 / 1280px).
- All grid layouts collapse gracefully mobile-first.
- `minmax(0, Nfr)` on hero grid prevents overflow from long H1 content.
- Fluid `clamp()` typography scales across breakpoints without hitting < 16px body floor.
- `max-w-Nch` reading constraints keep prose at comfortable measure at all widths.
- Container primitive handles responsive padding (`px-4 sm:px-6 lg:px-12`).
- Primary CTAs use `<Button size="lg">` = 44px+ tall; card tap targets are full cards with generous padding.
- `min-[900px]:` breakpoint on Authority rail is deliberate — italic-serif card titles benefit from the extra breathing room vs. standard `md:` 768px.
- Hero 8/4 grid collapses to single column below `lg`; aside slides below naturally.

---

## Updated execution order

**Shipped in pass 1 (2026-04-18):** Fixes 10, 16, 5, 12, 15, 6, 11 §1–3, 13, 14, 8 — see status table at top of file.

**Pass 2 (next — all shippable, zero decisions needed):**

1. Fix 18 — Delete §Why Movemental closing paragraph (pure deletion)
2. Fix 17 (+ 26) — Rewrite `AUTHORITY_STATEMENTS` proof-adjacent
3. Fix 24 — Replace "adaptive response" in §Stakes closing
4. Fix 22 — §Invitation: concrete artifacts instead of abstract nouns
5. Fix 19 — Link grounded-AI beat → `/walkthrough` (verify route first)
6. Fix 20 — Link §Path bridge → `/fragmentation` (verify route first)
7. Fix 23 — Link "Most organizations try to begin with solutions" → book Ch. 5 or article

**Pass 3 (design calls / optional):**

1. Fix 21 — System map diagram (library / graph / voice / pathways)
2. Fix 25 — Typographic climax between §Grounding and §Invitation
3. Fix 7 — Content sampler (optional; needs editorial decision)

**Pass 4 (decision-blocked):**

1. Fix 1 — Social proof strip (needs real logos)
2. Fix 2 — Rewrite About (needs team/portrait decision; inherits Fix 11 vocabulary)
3. Fix 3 — Newsletter capture (needs free-path decision)
4. Fix 4 — Scroll-stop moment (needs NB2 asset generation + placement call)

**Pass 5 (last):**

- **Fix 9 — Hero**

---

## Open discussion points (need decision before execution)

These are strategic, not tactical. Resolve before Fix 2 / Fix 3 / Fix 7 can ship cleanly.

1. **Consulting practice, platform/product, or both?** Current page deliberately refuses to name the commercial shape. Pricing-tier visibility follows from this answer.
2. **Who are "we"?** Naming 1–3 people (or at least a founder) changes the trust math for Fix 2 substantially. Is there a reason to stay anonymous today?
3. **What is the free path?** Newsletter / book chapters / articles / AI Lab — any could be it. Fix 3 assumes newsletter; reconsider if the real free path is the book or an interactive demo.
4. **Which 3 pieces anchor the content sampler?** Needed only if Fix 7 ships.
5. **Scroll-stop placement — §9/§10 seam (recommended) or hero-integrated?** Hero-integrated gives stronger first impression but risks overpowering typography. Fix 4 assumes the seam placement.
6. **Is the AI Stewardship Sequence the right home-page primary framework, or is it the on-ramp to the six-stage trajectory?** Current page treats the sequence as the main event. Canon suggests it is an entry framework inside a larger trajectory. Fix 12 proposes a bridge; a bolder move would be to repurpose §"Path forward" to present the **six stages** and let the AI Stewardship Sequence live on the `/services` or `/methodology` page. Trade-off: bigger narrative reframe, more aligned with canon, riskier to execute.
7. **Is Movemental positioning primarily as infrastructure, advisory, or platform?** Fix 11 assumes infrastructure. If the actual commercial shape is advisory (fee-for-engagement consulting), the infrastructure language will overclaim. Decision needed before Fix 11 ships.
8. **Should the home page mention the fragmentation book by name, or keep it as "the field guide"?** Canonical internal reference is "the field guide"; canonical public-facing artifact has a title. Current home uses neither consistently.

Each fix should be its own commit with `slice/home-audit-fixN-<slug>` branch per CLAUDE.md conventions.

---
