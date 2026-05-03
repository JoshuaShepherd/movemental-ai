# Home page — narrative ownership, credibility evidence, and IA plan

> **How to use this document:** Invoke with `@docs/build/prompts/home-page-narrative-credibility-ia-plan.md` when refactoring **`/`** so the home page **orients and converts** without **replacing** the fragmentation story, the book, or the article library — and so **strong claims** (especially credibility) are either **grounded** or **scoped** per manuscript discipline.
>
> **Companion prompts (read first when rebuilding copy or layout):**
>
> - [`strategy-artifacts-placement-and-flow.md`](./strategy-artifacts-placement-and-flow.md) — canonical ownership: book (`/book`) vs the AI Stewardship Sequence field guide (`/articles/ssss-field-guide-for-organizational-leaders`) vs Ch. 2; `/assess` vs `/assessment-new`; proof types; `/about`; no duplicate “chapter zero”
> - [`home-page-fragmentation-funnel-narrative.md`](./home-page-fragmentation-funnel-narrative.md) — 13-section spine, locked copy anchors, funnel intent vs `/fragmentation`
> - [`stitch-to-react-migration.md`](./stitch-to-react-migration.md) — token rules, primitives, Stitch parity
> - [`book-chapter-ground-truth-deepening.md`](./book-chapter-ground-truth-deepening.md) — how to align marketing claims to manuscript + research files
>
> **Canonical design:** [`docs/design/DESIGN.md`](../../design/DESIGN.md) — especially **L2b Trust / evidence** (citations, inspectability, `.evidence-note`, `.references`, §14)

---

## 0. The homepage’s unique job (compressed argument)

The homepage is the **compressed argument**: enough structure for **recognition**, **tension**, **directional clarity**, and **desire to go deeper** — in one scroll, without pretending to be the manuscript.

**`/fragmentation`** is the **full canonical walkthrough** of the **stage model** (interactive shell, stage anchors, URL-tunable audience/field).

The homepage is **not** a shorter fragmentation page. It is the **front-door argument** that makes the visitor **want** the full story.

| Surface | Job |
| ------- | --- |
| **`/`** | Recognition → tension → pivot → **named system** (compressed) → staged product narrative → trust → path selection |
| **`/about`** | **Light orientation** — why Movemental exists; pointers to `/book`, `/fragmentation`, `/evidence` — **not** a second opening of the full thesis ([`strategy-artifacts-placement-and-flow.md`](./strategy-artifacts-placement-and-flow.md)) |
| **`/fragmentation`** | Canonical **public expression** of the six-stage **model** (depth, inspectable progression) |
| **Book + research files** | Canonical **evidence** for credibility / epistemic claims (Chapter 1, articles) |

---

## 1. Why this plan exists

The shipped home (`src/components/sections/home/home-page-content.tsx` and siblings) correctly implements a **linear funnel** (problem → consequence → turn → six-stage index → stage bands → proof → entry points → CTA). Gaps addressed by this plan:

1. **Hero vs problem:** Both compressed “fragmentation” without a sharp **felt vs legible** split — the hero should **make the problem felt**; the problem section should **make it legible** (two intelligences, concrete channels).

2. **Emotional and perceptual sequencing:** The doc must govern **first impression**, **band-to-band progression**, and **tonal contrast** — not only copy ownership.

3. **Consequence band:** Must cover **coherence loss**, **interpretation failure**, and **representational failure** (search / AI surfaces), not only “credibility crisis” language — while staying **evidence-disciplined** (no fake sources; soften headline if inspectable citations are not on-page).

4. **Visual hierarchy:** The home must **read as one continuous argument** (progressive sections), reuse **fragmentation visual vocabulary** without embedding the full interactive story.

This plan **does not** replace the funnel prompt’s spine; it **extends** it with homepage-specific **behavior**, **emotion**, and **visual-system** requirements. **Locked headline changes** are recorded in [`home-page-fragmentation-funnel-narrative.md`](./home-page-fragmentation-funnel-narrative.md) §2.1 when they ship.

---

## 2. One owner per thesis (model vs page vs evidence)

| Layer | Canonical owner | Meaning |
| ----- | ---------------- | ------- |
| **Stage model** (six stages, names, order) | **Company / product model** — same vocabulary everywhere | Not “owned” by a URL; it is the **shared map**. |
| **Canonical public expression of the model** | **`/fragmentation`** | Long walkthrough, anchors, optional params — the **page** where the model is **fully** shown. |
| **Canonical evidence for credibility / epistemic collapse** | **Prior manuscript** (`docs/book-development/manuscript-ordered/01-the-credibility-crisis.md`) + vetted research articles — **not** all shipped at `/book/read/*` | On-site reader uses the **fragmentation book spine** (`src/lib/book-types.ts`); link **inspectable** chapters that exist (e.g. Ch 1 → `/book/read/the-invisible-tax`). |

Home **compresses** the model and **points** to `/fragmentation` for the walkthrough and to **book read routes** for inspectable diagnosis.

---

## 3. Guiding principles

| Principle | Meaning |
| --------- | ------- |
| **One owner per thesis** | Fragmentation **walkthrough** → `/fragmentation`. Research-backed **credibility stats** → manuscript + `docs/build/research/` articles. **Shipped book reader** → `BOOK_SPINE` slugs only. Home **points**; it does not silently fork copy. |
| **Earn the headline** | Any statistic on `/` must be **L2b-attributed** or removed. If citations are not ready on-page, **soften** the headline and defer to the book — **never** imply research with placeholder “Source A/B” cards. |
| **Hero vs problem** | **Hero:** compressed problem + **promise of resolution**; visual suggests fragmentation → coherence; slight **dissonance → stability**. **Problem:** names **two intelligences** explicitly; **more diagnostic** than the hero. **Rule:** *The hero makes the problem felt. The problem section makes it legible.* |
| **No duplicate opening chapters** | After the hero, the problem section adds **specificity**, not a second title-level restatement alone. |
| **L2b when numbers appear** | Use DESIGN.md trust patterns for any quantitative line. |
| **Composable reuse, not page embed** | Reuse shared strings / images from fragmentation content modules; **do not** embed `FragmentationStoryNewShell` on `/`. |
| **Movemental AI posture** | Present AI as a **function of context, corpus, and governance** — not a standalone magical assistant ([`strategy-artifacts-placement-and-flow.md`](./strategy-artifacts-placement-and-flow.md) §6). |
| **No duplicate “chapter zero”** | Home **compresses**; it does not re-host the full book or fragmentation arc opening — see [`strategy-artifacts-placement-and-flow.md`](./strategy-artifacts-placement-and-flow.md) §2. |

---

## 4. Emotional sequence across the homepage (design requirement)

Each band has a **non-optional** emotional job. Implementation (copy, spacing, midnight vs light `Section` variants, motion restraint) must support this sequence:

| Section | Emotional job |
| ------- | ------------- |
| **Hero** | **Tension + promise** — something is wrong; there is a credible path. |
| **Problem** | **Recognition** — “that is my desk / my stack.” |
| **Consequence** | **Weight / urgency** — stakes without panic. |
| **Turn** | **Relief / possibility** — pivot to agency. |
| **System** | **Clarity** — named answer to what preceded. |
| **Stages (integration → movement)** | **Confidence** — verbs and outcomes stack. |
| **Proof** | **Trust** — humans + links to depth. |
| **Entry + CTA** | **Commitment** — choose a path; act. |

---

## 5. Visual system — homepage as one continuous argument

**Requirement:** The homepage must **feel like one continuous argument**, not isolated modules. **Tonal stacking** alternates `Section` variants (`default` / `section` / `midnight`) for **perceptual contrast** — **no decorative section borders** (DESIGN.md).

| Zone | Visual recommendation |
| ---- | ---------------------- |
| **Hero** | **Lighter, simpler** dual-field visual (`HeroVisualDualField`) — fragmentation → coherence; **dissonance → settle** once; respect `prefers-reduced-motion`. |
| **Problem** | **Denser artifact scatter** (same image library as `/fragmentation`) — concrete “scatter field.” |
| **Consequence (Midnight)** | **Trust-oriented, grounded** treatment: editorial triad (coherence / interpretation / representation) **or** L2b evidence notes — **no fake research tiles**. |
| **Turn** | Prefer **`variant="default"`** immediately after Midnight so the pivot **reads as relief**. Converge visual stays **simpler** than problem scatter. |
| **System** | **Compress** the six stages into the **card rail** only — **do not** recreate the full interactive narrative. One line of copy must tie this block to the **answer** to the prior tension. |
| **Stage bands** | Visual language **consistent** with fragmentation stage **metaphors** (integration bridge, activation workspace, etc.) but **single-viewport** each. |
| **Movement (Midnight)** | **Culmination** band: copy and layout must read as the **terminal state** the arc implied — not an add-on module. |

---

## 6. Consequence band — scope beyond credibility-only framing

The consequence band is **not only** “credibility collapse.” It is the place for **coherence loss**, **interpretation failure**, and **representational failure** (what search, assistants, and newcomers can infer when the foundation is scattered).

**Evidence rule:** If inspectable citations are **not** yet implemented on `/`, the **headline must be softened** (see funnel §2.1) so the band does not **over-claim**. The hinge line about **coherence vs truth** may remain. Always offer a **single clear link** to a **live** reader chapter (shipped spine: `/book/read/the-invisible-tax` for fragmentation Ch 1) or to **articles** when the claim is research-specific.

---

## 7. Section-to-section funnel behavior (conversion requirement)

The user should move through:

1. **Problem recognition** (hero + problem)  
2. **Consequence recognition** (stakes)  
3. **System curiosity** (turn → `#system`)  
4. **Stage comprehension** (integration → movement)  
5. **Trust** (proof)  
6. **Path selection** (entry points + CTA)

**Rule:** Each section **earns the next** — add **short bridge copy** where needed (especially **turn → system**, **system → integration**) so the scroll does not feel like **stacked bands**. The home should **not** feel like disconnected “modules.”

---

## 8. Source-of-truth map (for implementers)

| Topic | Primary repo source | Home page role |
| ----- | ------------------- | --------------- |
| Fragmentation definition + six-stage names | `FragmentationIntroHeader`, `fragmentation-story` content, `/fragmentation` | Point; **do not** fully duplicate. |
| Locked funnel copy anchors | `home-page-fragmentation-funnel-narrative.md` §2.1 | Preserve; amend in that file when locks change. |
| Credibility / epistemic evidence (Pew-style stats) | `docs/book-development/manuscript-ordered/01-the-credibility-crisis.md`, articles | **Articles** or L2b on-page; do not link legacy slugs that redirect to `/book`. |
| Visual / token rules | `docs/design/DESIGN.md`, `globals.css` | Semantic tokens only; Midnight for consequence + movement + final CTA. |

---

## 9. Step-by-step implementation plan

Execute in order. **Ship safely:** change **one component at a time**; preserve **`id`s and anchors** (`#hero`, `#problem`, `#consequence`, `#turn`, `#system`, …) unless a deliberate migration updates analytics and redirects. **Do not** rewrite stable sections without narrative need. **Trace copy** changes to this doc + funnel §2.1. **New variants** (e.g. softer headline) go through **funnel lock update** first.

### Step 0 — Audit and baseline

1. Confirm section `id`s and in-page anchors.  
2. Map hero vs problem sentences against the **felt / legible** rule.  
3. List factual claims on `/`; mark L2b-ready vs must defer.

### Step 1 — Hero

Keep locked **Display** headline and CTAs (funnel). Add **supporting** copy that leans **promise / resolution** without repeating the diagnostic columns of `#problem`.

### Step 2 — Problem

Keep locked headline + two column labels. Add **explicit two-intelligences** framing and concrete channel bullets (data-driven from `home-data.ts`).

### Step 3 — Consequence

Implement **softened** locked headline (funnel §2.1), retain hinge where locked, broaden body copy (coherence / interpretation / representation), remove **fake** source tiles; add **book read** link.

### Step 4 — Turn

Keep locked copy; add **bridge** toward `#system`; use **`variant="default"`** after Midnight for relief.

### Step 5 — System

Add **answer framing** copy; keep six-card compression + `/fragmentation` links; `variant="section"` for tonal “answer band.”

### Step 6 — Integration through Movement

Add **one connector line** per section where useful; cut **diagnosis repetition**; strengthen **movement** as **culmination** copy.

### Step 7 — Proof

Strengthen outbound graph: book, articles, **Chapter 1** and **`/evidence`** where appropriate.

### Step 8 — Entry + CTA

Unchanged unless IA shifts; keep three distinct actions.

### Step 9 — Engineering hygiene

Lint, typecheck, preserve `"use client"` boundaries, no unnecessary client expansion.

### Step 10 — Post-ship narrative QA

`movemental-narrative-audit` skill or manual rubric.

---

## 10. Safe implementation guidance

- Edit **component-by-component**; prefer small PRs per band.  
- **Preserve** section `id`s and primary anchor targets.  
- **Do not** break routes; `/fragmentation` remains the deep link.  
- **Analytics:** if `data-*` or event names exist on sections, keep stable or document migration.  
- **New content** belongs in `home-data.ts` where it is shared or long.

---

## 11. What this plan explicitly does *not* do

- **Does not** replace [`home-page-fragmentation-funnel-narrative.md`](./home-page-fragmentation-funnel-narrative.md); amend that file when **locks** change.  
- **Does not** embed the full fragmentation interactive shell on `/`.  
- **Does not** authorize new statistics without manuscript / research grounding.

---

## 12. Finished vision — what the home page *is* (overall)

The home is a **front-door compressed argument**: recognition, tension, pivot, **named six-stage answer**, staged confidence, trust, and path selection — with **clear hunger** for `/fragmentation` and the **book** for depth and citations.

**Tone:** Calm, editorial, high-trust — same middle path as Chapter 1.

**Trust (L2b):** No placeholder sources; softened claims until citations ship on-page.

**Success:** After `/`, the visitor **wants** the full walkthrough because the home felt **progressive and honest**, not repetitive or over-precise.

---

## 13. Revision history

| Date | Author | Note |
| ---- | ------ | ---- |
| 2026-04-15 | Agent (Cursor) | Initial plan from home vs fragmentation vs Chapter 1 gap analysis. |
| 2026-04-15 | Agent (Cursor) | Amendments: unique homepage job; emotional sequence; hero/problem rule; visual system; consequence scope + soften-without-citations; funnel micro-behavior; model vs page vs evidence; safe implementation. |
