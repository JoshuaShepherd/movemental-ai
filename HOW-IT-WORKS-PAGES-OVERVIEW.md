# How-It-Works Pages: Comprehensive Overview & Direction

**Purpose:** Inventory all current how-it-works content, rank what should exist vs. cut, identify gaps, and recommend a final direction with UI notes.  
**Audience:** Product/content decision-making.  
**Last updated:** February 2026.

### Implementation status (done)

- **Canonical only:** `/how-it-works` is the single How It Works page; `OnboardingPathContainer` includes merged content (Your work here, Pipeline, AI role).
- **Redirects:** `/onboarding`, `/how-it-works-new`, and `/how-it-works-final` 301 → `/how-it-works` (`next.config.mjs`).
- **Alternate routes removed:** `app/(public)/how-it-works-new/page.tsx` and `app/(public)/how-it-works-final/page.tsx` deleted; components remain in repo for reference.
- **Template hero:** `HeroHowItWorks` JSDoc and `displayName = "HeroHowItWorksTemplate"` clarify it is for template preview only, not the main site.

---

## Part 1 — Current Inventory: All How-It-Works Content

### 1.1 Live routes and what they render

| Route | Status | Renders | Linked from nav? |
|-------|--------|---------|------------------|
| `/how-it-works` | **Canonical** | `OnboardingPathContainer` | Yes (primary nav, footer, FAQ, Why outro) |
| `/onboarding` | Redirect 301 → `/how-it-works` | — | No (legacy; redirect in place) |
| `/how-it-works-new` | **Alternate** (no nav link) | `HowItWorksNewContainer` | No |
| `/how-it-works-final` | **Alternate** (no nav link) | `HowItWorksFinalContainer` | No |

Only `/how-it-works` is in sitemap and navigation. The “new” and “final” routes are alternate implementations not linked from the main site.

---

### 1.2 Canonical page: `/how-it-works` → OnboardingPathContainer

**File:** `app/(public)/how-it-works/page.tsx` → `components/onboarding-path/OnboardingPathContainer.tsx`  
**Copy sources:** Inline in container; phase data in `lib/schemas/onboarding-path.ts`.

#### Section-by-section content (in order)

1. **Hero** (no `id`)
   - Bridge line: *"You've seen the problem. Here's the path."*
   - Badge: *"3–4 weeks from fit to live"*
   - Headline: *"How Movemental Works"* (gradient on “Works”)
   - Subline: *"Four phases to make your content discoverable, connected, and moving. Your platform launches with content, not empty templates."*
   - CTA: *"See the four phases"* (scroll to #phases)

2. **Order of Understanding** (`id="order"`)
   - Statement: *"The right order to understand Movemental"*
   - Intro: *"For someone who doesn't know, the path only makes sense after you understand why Movemental exists."*
   - Numbered list: Self-Screen → Why Movemental → How It Works → Team/Credibility → AI Book → Learning Hub → Pricing & Access

3. **Path intro** (`id="path"`)
   - Statement: *"From fit to live in 3–4 weeks"*
   - Paragraph: Four phases, platform launches with content, movement-first / evidence-based / launch-ready

4. **Four phases** (`id="phases"`)
   - Statement: *"Four phases to launch"*
   - **Phase 1 — Discovery & Vision** (Week 1): Core Identity Exploration, Movement Context Mapping, Business Model Alignment, Vision Documentation. *"We begin by understanding who you are, your movement context, and your vision..."*
   - **Phase 2 — Content Research** (Week 1–2): Automated Content Analysis, Theme & Topic Extraction, Network Intelligence, Content Strategy Brief. *"Our AI analyzes your existing content..."*
   - **Phase 3 — Platform Architecture** (Week 2): Platform Requirements, AI Integration Setup, Content Migration, Feature Configuration. *"We configure your platform with the features and integrations..."*
   - **Phase 4 — Network & Launch** (Week 3–4): Network Onboarding, Cross-Promotion Strategy, Launch Preparation, Platform Launch. *"You join the Movemental network and launch..."*
   - UI: Horizontal timeline + vertical expandable phase cards

5. **What makes this different** (`id="different"`)
   - Statement: *"This is not a DIY platform or a generic template."*
   - Six cards: Movement-First, Evidence-Based, Launch-Ready, Network Effects, Owned Not Rented, AI-Amplified (short copy per card)

6. **What you get** (`id="get"`)
   - Statement: *"What you get"*
   - Bullets: complete digital publishing platform; your voice; ownership; connection to Movemental network; ongoing support

7. **Pricing and access** (`id="pricing"`)
   - Short note: upfront fee + revenue share; link to Pricing page

8. **Supporting pieces** (`id="supporting"`)
   - Team / Credibility, AI Book / Knowledge Spine, Learning Hub — with links to /team, /book, /learn

9. **Summary** (`id="summary"`, dark block)
   - *"How it works in one pass"* — single paragraph recap (fit → why → four phases → live with content and network → own it, revenue, supporting pieces)

10. **CTA** (`id="cta"`)
    - *"Ready to begin?"* — Start with Self-Screen (→ /fit-check), Why Movemental (→ /why-movemental)

**UI features:** `ScrollProgress`, `SectionNav` (sticky) with 9 sections, `Timeline` / `TimelineHorizontal`, `PhaseCard`, `NarrativeSection` / `NarrativeStatement`.

---

### 1.3 Alternate: `/how-it-works-new` → HowItWorksNewContainer

**File:** `app/(public)/how-it-works-new/page.tsx` → `components/how-it-works-new/HowItWorksNewContainer.tsx`

**Sections (with section nav):**

1. **The Path** — *"A Clear Path — Not a Content Treadmill"*; starts with what you have → living, discoverable body of work; `PathDiagram`
2. **Playbook** — *"A Proven Playbook — Shown, Not Dumped"*; playbook that compounds; `PlaybookFlowDiagram` (Existing Work → Evergreen → Courses → Translation & Circulation → Long-Term Compounding)
3. **Pipeline** — *"What Happens to the Work You're Already Doing"*; existing body → *"Creation is not accelerated. Circulation is."*; `ContentPipelineDiagram`
4. **AI role** — *"What AI Does — and What It Doesn't"*; two columns (AI assists / Humans retain); dark section
5. **Voice** — *"Preserving Voice and Integrity"*; `VoiceComparisonDemo`
6. **Launch** — *"A 30-Day Launch — Not an Endless Setup"*; `LaunchTimelineDiagram`
7. **After launch** — *"After Launch: A Sustainable Rule of Life"*; ~3 hours/week, platform as anchor for circulation
8. **CTA** — Discernment, not commitment; Self-Screen

**Notable:** 30-day launch, rule-of-life framing, voice demo, path + playbook + pipeline diagrams. No “order of understanding,” no pricing/supporting/summary blocks.

---

### 1.4 Alternate: `/how-it-works-final` → HowItWorksFinalContainer

**File:** `app/(public)/how-it-works-final/page.tsx` → `components/how-it-works-final/HowItWorksFinalContainer.tsx`

**Sections (no section nav):**

1. **Hero** — *"A clear path from your existing work to a living system."*; *"No hype. No black box."*
2. **Work here / vision** — *"Your work is here. It should also be here."*; sermons, books, talks, notes; *"If it's cheap and fast, it's stewardship."*; `WorkHereVisionSection`
3. **Playbook (Alan)** — *"The full digital playbook we extracted and employed for Alan."*; `PlaybookFlowDiagram` (same nodes as new)
4. **Content pipeline** — *"The content pipeline."*; existing → evergreen → courses → translation; *"Creation is not accelerated. Circulation is."*; `ContentPipelineDiagram`
5. **AI's role** — AI assists / Humans retain (same split as new); *"Quality is preserved through feedback loops."*
6. **2-week timeline** — *"The 2-week onboarding timeline."*; `TwoWeekTimelineDiagram`
7. **CTA** — Discernment; Self-Screen

**Notable:** 2-week timeline (not 3–4 weeks or 30 days), Alan as named example, “work here / vision” and stewardship line. No order of understanding, no pricing, no supporting/summary.

---

### 1.5 Hero template variant (movement-leader templates)

**File:** `components/layouts/movement-leader/hero-how-it-works.tsx`  
**Use:** Template switcher / preview (e.g. `/templates`), not the main public How It Works page.

**Content:** Blue Apron Wine–style hero: full-bleed image, headline *"Discover the perfect resource for your movement context"*, CTA *"Get Started"* + “Free” badge. Below: *"How It Works"* with three steps — Incredible Resources, Ongoing Delivery, Sized for Teams.  
**Note:** Copy is product-subscription style; not aligned with the credibility/onboarding narrative of the main site.

---

### 1.6 Reference / long-form docs (not rendered as pages)

| Document | Location | Content summary |
|----------|----------|------------------|
| **How Credibility Works** | `credibility-how-it-works.md` (root) | Long-form essay: credibility as judgment; offline (institutions + people) vs online (E-E-A-T, legibility, topology); claim vs node; scenius vs publisher; playbook (one home, author legible, content as nodes, graph, restraint); checklist & amplification; Movemental vs playbook; 100 in the system; value & revenue; stewardship; AI & credibility in 2026 (posture, boundaries, practices). |
| **Credibility video script** | `credibility-how-it-works-video.md` (root) | Same narrative as above, scripted for ~6 min Remotion explainer (S1–S14 + asset list, Midjourney prompts). |
| **Reconciliation note** | `_docs/reference-archive/hero-page/reconciliation/how-it-works.md` | Visual/color reference for “how-it-works” hero variant (Blue Apron Wine); checklist for implementation. |

The credibility doc is the **foundational narrative** for “why credibility and scenius matter”; it is not currently surfaced as a dedicated page but is referenced from SCENIUS and product docs.

---

## Part 2 — Ranked Assessment: Keep vs. Cutting Room Floor

### Tier 1 — Must exist (canonical)

- **Single canonical How It Works page at `/how-it-works`**  
  One place that answers “what actually happens from fit to launch?” for the main conversion path.  
  **Verdict:** Keep. Current canonical is `OnboardingPathContainer`.

- **Clear timeline**  
  One number to avoid confusion: either “3–4 weeks” (current canonical) or “2 weeks” (final) or “30 days” (new).  
  **Verdict:** Decide one; align all copy and diagrams.

- **Bridge from Why**  
  “You’ve seen the problem. Here’s the path.” already exists in the canonical hero.  
  **Verdict:** Keep; ensure Why outro links to `/how-it-works` (already in place per reframe doc).

- **Four-phase structure (or equivalent)**  
  Canonical uses Discovery → Research → Architecture → Launch with concrete activities.  
  **Verdict:** Keep as the primary “process” story; optional to enrich with playbook/pipeline visuals from alternates.

### Tier 2 — Strong candidates (merge into canonical or keep as one narrative)

- **Playbook flow (Existing Work → Evergreen → Courses → Translation → Compounding)**  
  Exists in both new and final; explains *what* happens to content, not just *when*.  
  **Verdict:** **Merge** into canonical (e.g. “What happens to your content” section with `PlaybookFlowDiagram` or simplified version).

- **Content pipeline diagram**  
  Same pipeline idea (existing → evergreen → courses → translation/circulation).  
  **Verdict:** **Merge** as one clear “content pipeline” or “content playbook” section to avoid duplication with phases.

- **AI’s role (assists vs humans retain)**  
  In both new and final; clarifies posture.  
  **Verdict:** **Merge** into canonical (one short section + two-column list).

- **“Your work is here / It should also be here”**  
  Strong opening from final; aligns with “content that moves.”  
  **Verdict:** **Consider** as hero subline or first narrative block on canonical.

- **Order of understanding**  
  Canonical only: Self-Screen → Why → How → Team → AI Book → Learn → Pricing.  
  **Verdict:** **Keep**; it orients first-time visitors and supports IA.

- **What you get / What makes this different / Supporting pieces / Summary**  
  Only in canonical.  
  **Verdict:** **Keep**; they answer “what do I get?” and “where do I go next?” without sending people to other pages for basics.

### Tier 3 — Optional / experimental (cut or archive)

- **Separate routes `/how-it-works-new` and `/how-it-works-final`**  
  **Verdict:** **Cut from production** once the chosen narrative is merged into `/how-it-works`. Keep components in repo for reference or reuse; remove or redirect routes so only one How It Works page exists.

- **Voice comparison demo**  
  Only in new.  
  **Verdict:** **Optional** merge if voice preservation is a key differentiator; otherwise archive.

- **30-day vs 2-week timeline**  
  New says 30-day launch; final says 2-week; canonical says 3–4 weeks.  
  **Verdict:** **Pick one** and remove the others from live copy (see Gaps below).

- **“Rule of life” / “3 hours per week”**  
  Only in new.  
  **Verdict:** **Optional** — one sentence in canonical “After launch” or “What you get” is enough if you want it; otherwise cut.

- **Alan by name**  
  Final uses “playbook we extracted and employed for Alan.”  
  **Verdict:** **Optional** — use if you want a concrete example; otherwise “we use a proven playbook” is enough.

- **Hero template `HeroHowItWorks`**  
  Product steps (Resources, Delivery, Teams) for template preview.  
  **Verdict:** **Keep only in template system**; do not use as main site hero. Consider renaming to avoid confusion (e.g. “HeroProductSteps”).

### Tier 4 — Reference only (not a page)

- **`credibility-how-it-works.md`**  
  **Verdict:** **Keep as source of truth** for credibility narrative. Optionally: short “How credibility works” subsection on How It Works or Why, or a link to /book or /learn if you publish a shorter version.

- **`credibility-how-it-works-video.md`**  
  **Verdict:** **Keep** for future video production; not a page.

- **Reconciliation/how-it-works.md**  
  **Verdict:** **Keep** for design reference only.

---

## Part 3 — Gaps and Alignment

### 3.1 Timeline inconsistency

- **Canonical:** 3–4 weeks (from `lib/schemas/onboarding-path.ts` and hero).
- **Final:** 2-week onboarding timeline.
- **New:** 30-day launch.

**Recommendation:** Choose one (e.g. “3–4 weeks from fit to live”) and use it everywhere: hero, phases, diagrams, and any “new”/“final” content merged into canonical.

### 3.2 Proposed but not built (_docs/product/why-vs-how-reframe.md)

- **Content System Map** (books → articles → courses → network) — proposed for How It Works or “What you get.”  
  **Recommendation:** Add as one visual section (e.g. after “What you get” or integrated into playbook/pipeline).

- **Content Movement Diagnostic** (offline → siloed → unstructured → unlinked → moving) — proposed for Why intro.  
  **Recommendation:** Implement on Why; optional one-line or link from How It Works (“See why content gets stuck” → Why).

- **Trust Signals Panel** — proposed for Why or How.  
  **Recommendation:** Optional; “What makes this different” already covers some of this.

### 3.3 Broken or missing links

- Reframe doc noted `/contact` in onboarding CTA; canonical CTA now uses /fit-check and /why-movemental. Confirm no remaining /contact references on How It Works.

### 3.4 Credibility narrative

- The long credibility essay is not on the site.  
  **Recommendation:** Either (a) keep as internal/partner doc and surface key ideas in Why + How + AI Vision, or (b) add a short “How credibility works” section or /learn (or /book) page that links to or condenses it.

---

## Part 4 — Recommended Final Direction

### 4.1 One canonical page

- **Single page:** `/how-it-works` only.  
- **Redirect:** Keep `/onboarding` → `/how-it-works`.  
- **Remove or redirect:** `/how-it-works-new` and `/how-it-works-final` (e.g. 301 to `/how-it-works` or remove from build).

### 4.2 Content to merge into canonical

- **From new/final:**  
  - One “Content playbook / pipeline” section with a single diagram (playbook flow or content pipeline, not both duplicated).  
  - One “AI’s role” section (assists / humans retain).  
  - Optional: “Your work is here. It should also be here.” as hero or first narrative block.  
  - Optional: One timeline diagram (align with chosen timeline: 3–4 weeks recommended).  
- **Keep from current canonical:**  
  Order of understanding, four phases (with activities), what makes this different, what you get, pricing teaser, supporting pieces, summary, CTA.

### 4.3 One timeline

- Standardize on **“3–4 weeks from fit to live”** (or explicitly choose 2 weeks if that’s the real process).  
- Update any diagram (e.g. `TwoWeekTimelineDiagram` or `LaunchTimelineDiagram`) to same duration and labels.

### 4.4 Credibility

- Keep `credibility-how-it-works.md` and video script as foundational docs.  
- Do not add a separate “How Credibility Works” page unless you commit to maintaining it; instead, weave “one home, author legible, content as nodes, graph, restraint” into Why and How where relevant.

---

## Part 5 — UI Recommendations

### 5.1 Structure and navigation

- **Keep** `ScrollProgress` and sticky `SectionNav` on the canonical page for long-form orientation.
- **Add** one “Content system” or “Content playbook” section with a visual (Content System Map or PlaybookFlowDiagram) to show end-state and flow.
- **Consider** in-page anchors from “Order of understanding” (e.g. “How It Works” links to `#phases` or `#playbook`).

### 5.2 Consistency with Why Movemental

- Hero bridge line is already aligned: *“You’ve seen the problem. Here’s the path.”*
- Ensure Why Movemental outro has a clear secondary CTA: *“See how we get you there”* → `/how-it-works` (already recommended in reframe doc).
- Reuse same design tokens and section rhythm (`NarrativeSection`, `NarrativeStatement`) so Why and How feel like one journey.

### 5.3 Diagrams and “show don’t tell”

- **Playbook or pipeline:** One diagram (either `PlaybookFlowDiagram` or `ContentPipelineDiagram`, or a single merged diagram) with clear labels (e.g. Existing work → Evergreen → Courses → Circulation).
- **Timeline:** One timeline component matching the chosen duration (3–4 weeks recommended); reuse or adapt existing `Timeline`/`TimelineHorizontal` or the 2-week/30-day diagram with updated copy.
- **AI role:** Keep two-column layout (AI assists / Humans retain); no extra animation required.
- **Content System Map:** If built, use simple grid or horizontal flow (books → articles → courses → network) with optional “Learn more” per node.

### 5.4 Mobile and performance

- Section nav: ensure sticky behavior and tap targets work on small screens.
- Diagrams: ensure they collapse or scroll horizontally on narrow viewports; avoid heavy animation on first load if reusing framer-motion.

### 5.5 Template hero

- Keep `HeroHowItWorks` only in the movement-leader template system; do not use its copy (Resources, Delivery, Teams) on the main How It Works page.  
- If needed, rename to something like `HeroProductSteps` or `HeroHowItWorksTemplate` to avoid confusion with the main onboarding narrative.

---

## Part 6 — Summary Table

| Item | Action |
|------|--------|
| `/how-it-works` | Keep as only canonical How It Works page |
| `/onboarding` | Keep 301 → `/how-it-works` |
| `/how-it-works-new` | Remove or 301 → `/how-it-works` after merge |
| `/how-it-works-final` | Remove or 301 → `/how-it-works` after merge |
| OnboardingPathContainer | Keep; add playbook/pipeline + AI role (and optional “work here” + timeline diagram) |
| HowItWorksNewContainer | Archive; reuse diagrams/copy where merged |
| HowItWorksFinalContainer | Archive; reuse diagrams/copy where merged |
| Timeline | Standardize on one (recommend 3–4 weeks) |
| Credibility long-form | Keep as doc; surface ideas in Why/How/AI Vision, not a separate page |
| Content System Map | Build and add to canonical if “show don’t tell” is priority |
| Hero template (HeroHowItWorks) | Keep for templates only; rename to avoid confusion |

---

*End of overview. Use this document to decide final copy, route strategy, and which components to merge into the canonical How It Works page.*
