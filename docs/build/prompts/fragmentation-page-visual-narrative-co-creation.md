# Fragmentation route — visual narrative assessment & co-creation prompt

**Purpose.** This document assesses how the **full story** reads through **visuals and motion** on `/fragmentation`, compares that to the **canonical narrative** described in internal build docs, and gives a **step-by-step implementation backlog** (copy, layout, progressive disclosure, GSAP) suitable for handing to an agent or designer–engineer pair.

**Scope boundary.** [`src/app/(site)/fragmentation/page.tsx`](../../../src/app/(site)/fragmentation/page.tsx) is intentionally thin: metadata plus `searchParams` passed into `FragmentationStoryPageContent`. The **experienced story** lives in `src/components/sections/fragmentation-story/*`. This prompt treats **page + content shell + shell children** as one surface.

**Upstream docs (read order).**

| Doc | Role |
| --- | --- |
| [`docs/build/audit/fragmentation-story-approaches-audit.md`](../audit/fragmentation-story-approaches-audit.md) | A vs B vs C; metaphor tiering; file map |
| [`docs/build/strategy/fragmentation-route-strategic-impact.md`](../strategy/fragmentation-route-strategic-impact.md) | Stage model as GTM primitive; `/fragmentation` as primary public interface |
| [`docs/build/fragmentation-react-migration-plan.md`](../fragmentation-react-migration-plan.md) | Target six-stage semantics; dual intelligence |
| [`docs/build/fragmentation-unified-full-story-mockup.html`](../fragmentation-unified-full-story-mockup.html) | Approach A — editorial pacing reference |
| [`docs/build/fragmentation-unified-system-mockup.html`](../fragmentation-unified-system-mockup.html) | Approach B — “same objects, new layout” mechanism reference |

**Doc freshness note.** Some paragraphs in the audit and migration plan were written when Part II lived in a single oversized file, **Movement** was a placeholder, and **multiplication infrastructure** had not been ported. The React tree has since gained **stage-scoped files**, a **Movement** network visualization, and a **multiplication infrastructure** overlay. Where this prompt contradicts an older sentence in those docs, **treat the live React implementation as ground truth** and schedule a small doc refresh separately.

---

## 1. Canonical narrative intent

This section locks the **internal product narrative** (dual intelligence, costs, audiences, six stages) that every surface—including `/fragmentation`, home, methodology, pricing, and assessments—should be able to trace. It distills the leadership throughline shared for implementation; it is not a public letter.

**Thesis — two kinds of intelligence.** The throughline behind Movemental’s model, site, platform, and AI work is **not** “more content” or tools alone. It is the fragmentation and re-integration of **two kinds of intelligence** every serious leader and organization depends on:

| Kind | What it is (plain language) |
| --- | --- |
| **Informational intelligence** | What a person or organization **knows and has produced**: books, ideas, frameworks, articles, talks, curriculum, documents, data, accumulated wisdom. |
| **Relational intelligence** | **Who they are connected to and how those connections work**: trust, history, conversations, collaborations, donors, stakeholders, teams, successors, the people who carry the work. |

The build exists so both can **live together as a coherent whole**. The stage model is the **description of that system**, not a decorative arc: fragmentation names the starting mess; each later stage is a real move toward **activation, formation, faithful reproduction, and field-level connection**. AI matters because grounded systems need an integrated body of intelligence; AI is not the point if the two intelligences stay split.

**Costs of not solving it (story pressure for copy + ledger).** When either intelligence stays fragmented: ideas lose coherence; inheritance and stewardship break; credibility online thins; fundraising turns transactional; formation over-indexes on proximity and personality; governance and memory weaken; “more content” cannot fix structural split. The `/fragmentation` page should let **each dock audience** feel informational *and* relational fragmentation—and the same six-stage answer—without flattening one lens when the user toggles **Informational** / **Relational**.

**Per-audience obligations (broad strokes).** Every narrative pass (chapters, scatter ledger, stage captions, assessments, home links) should be able to answer: *where does this audience’s **informational** pain show up, and where does their **relational** pain show up?*

| Audience | Informational (examples of fragmentation) | Relational (examples of fragmentation) |
| --- | --- | --- |
| **Movement leaders** | Corpus across channels (books, talks, podcasts, notes, unpublished insight); frameworks split across media; courses disconnected from the body of work. | Peer networks, mentees, collaborators, conferences, org ties—real but unmapped, unstewarded; influence trapped in proximity. |
| **Nonprofits** | Reports, curriculum, grants, strategy decks, program knowledge in heads, donor comms in inboxes/CRMs/PDFs. | Donor and stakeholder context split across CRM, email, memory, turnover; partner and board history uneven. |
| **Churches** | Sermons, teaching, discipleship assets, liturgy, leadership notes—pockets without one pathway or shared memory. | Who is known to which leaders; small groups without shared formational logic; partnerships not tied to central life. |
| **Institutions** | Research, curricula, policy, and published thought living in disconnected systems (LMS, repositories, grant portals, versioned PDFs). | Faculty, partners, boards, donors, and field relationships unevenly held across people, inboxes, and events—hard to steward as one living map. |

**Six stages in this language (lock for UI + docs).**

1. **Fragmentation** — Both intelligences exist **in pieces**; little connects enough to form people, guide decisions, or scale with integrity.
2. **Integration** — Informational work becomes **gathered and structured**; relational work becomes **visible, mappable, intelligible**—a pile becomes a **system** (not finished, but whole enough to work with).
3. **Activation** — The integrated system becomes **usable**: retrieval, access, context, memory, response—platform, DB, CMS, CRM, LMS, comms, grounded AI as **one coherent system**, not disconnected tools.
4. **Formation** — The two intelligences **converge**: informationally—dissonance, insight, action, reflection, learning; relationally—recognition, belonging, alignment, accountability, imitation. Truth **and** trust; not content delivery alone.
5. **Multiplication** — The system **reproduces through infrastructure**: informational (SEO/GEO, translation, agents, subscriptions, ecommerce, org learning) and relational (CRM memory, integrated comms, network awareness, participation, contextual relational support). Not “more reach” alone—**faithful reproduction**.
6. **Movement** — **Multiple integrated systems connect**—leaders as a network, nonprofits in ecosystems, churches in mission together; the object is **field-level** connection, amplification, and multiplication—not a single org holding itself together only.

**Tiered metaphors (strategy doc §7).**

- **Scatter → ledger → flash** = emotional proof of **cost** (both intelligences scattered).
- **Sticky cross-fade acts** = how coherence **broke over time** (same thesis as dual fragmentation).
- **Hub + lines, IDE, pathway, tenant + infra, platform network** = Part II **exhibit** sequence aligned to the table above.

**Approach B thesis (optional, not a replacement).**

Approach B insists: *the same artifact set rearranges* — continuous transformation rather than unrelated “scenes.” Strategy recommends **borrowing that sensation inside Multiplication** (contract hub, echo clusters) without replacing the long-scroll emotional arc. That motion should still read as **one library** of informational + relational artifacts **recomposed**, not a new illustration per stage.

---

## 2. What the shipped page actually does (visual storyboard)

### 2.1 Route and shell

| Beat | Implementation | Visual role |
| --- | --- | --- |
| Metadata / OG | `page.tsx` | Names **informational + relational** fragmentation and six-stage re-composition; aligns with outro. |
| Intro midnight band | `fragmentation-story-page-content.tsx` | Names **two kinds of intelligence**, fragmentation, dock for audience + **informational / relational** emphasis. |
| Dock | `fragmentation-story-dock.tsx` | Persistent **audience** + **informational / relational** rail; URL-synced. |
| Part I acts | `fragmentation-story-acts.tsx` + `fragmentation-story-stage-layers.tsx` | Two-column **sticky stage** (lg+) + six **chapters** (unity → misalignment). |
| Climax | `fragmentation-story-scatter.tsx` | Pinned scatter, veil, **cost ledger**, primary flash, resolution copy. |
| Bridge | `fragmentation-story-part-two.tsx` | Re-composition thesis; **informational + relational** verbs; **six stages**, one library. |
| Stages | `fragmentation-story-stage-*.tsx` | Integration → Activation → Formation → Multiplication → Movement → outro CTA. |

### 2.2 Strengths (already at or near spec)

- **Part I** matches Approach A well: sticky composites, intel surfaces, scrubbed card/ghost entrances on desktop, six-act prose with audience accents.
- **Scatter** mirrors the mockup’s structure: motion uses transforms/opacity; reduced motion and **mobile** bail out to a sane static layout.
- **Integration** and **Formation** use **scrubbed** GSAP timelines (lines / pathway) — strong “exhibit hall” feel.
- **Multiplication** now carries **tenant ecosystem diagram + infrastructure cards** (informational + relational columns) — closes a major gap called out in the audit.
- **Movement** is a **real stage**: polar layout, edges, primary/seed/expansion nodes, **density slider** with URL `nodes` sync — matches the strategic definition better than a placeholder band.
- **Outro** explicitly names **six stages** and “field,” consistent with metadata.

### 2.3 Gaps and tensions (visual / narrative UX)

1. **~~Bridge copy vs outro / metadata — stage count ambiguity~~** *(addressed in implementation)*  
   Bridge, intro, and metadata now align on **six stages** and explicitly name **informational + relational** intelligence. Keep chapter/stage microcopy audited so nothing reintroduces “five stages” without defining it.

2. **Mobile and `<lg` — half the exhibit disappears**  
   Sticky stage is `hidden` below `lg`. Acts remain, but **there is no inline figure** per chapter on small viewports — the story becomes **mostly prose** until scatter. That is a bigger experiential drop than Approach A’s single-column fallback if the mockup had one.

3. **GSAP is effectively “desktop-only” in Acts**  
   `FragmentationStoryActs` returns early when `!desktop || reduced`. Tablet landscape (`md`) users get no chapter-driven stage sync and no scrub cards. Consider a **breakpoint policy** (e.g. enable from `md` with simplified stage height) or a **non-GSAP** reduced motion pattern for tablet.

4. **Activation is still “static composition”**  
   Migration plan called this out: the IDE/workspace reads well but does not **earn** its moment through scroll-linked motion the way Integration and Formation do. Risk: middle of Part II feels slightly **flat** in the scroll rhythm.

5. **Multiplication — motion opportunity**  
   Diagram + infra cards are strong **statically**, but the audit’s highest-leverage idea remains: **Approach B-style “contract + echo”** (hub compresses, peripheral infra pulses in on scrub) would make multiplication feel like **transformation**, not only “another grid.”

6. **Movement — interaction without scroll choreography**  
   The slider is excellent for **understanding** scale; there is no **ScrollTrigger** narrative (e.g. edges drawing in as you enter the section, or “field pulse” tied to scroll). The stage can feel slightly **decoupled** from the scroll poem that precedes it.

7. **Progressive disclosure of “where am I?”**  
   Dock shows audience/field but not **chapter** or **stage**. `debug=1` exposes chapter in a chip — useful for QA, invisible to users. A **lightweight progress system** (dots, “Part I / Part II”, or compact chapter strip) would match how sales and leadership use the page as a **repeatable reference** (strategy §6).

8. **Deep links**  
   Stage sections expose ids such as `#stage-movement`, `#stage-multiplication`. Metadata and intro body text do not advertise **`?audience=` / `field=` / `nodes=`**. GTM would benefit from one sentence + example links in intro or foot of dock (without clutter).

9. **Documentation drift**  
   Update [`fragmentation-story-approaches-audit.md`](../audit/fragmentation-story-approaches-audit.md) §3 “Weaknesses” for Approach C and [`fragmentation-react-migration-plan.md`](../fragmentation-react-migration-plan.md) §2 once the backlog below is done — so future agents do not “fix” already-shipped work.

---

## 3. Recommended fixes and additions (step-by-step)

Work in roughly this order: **copy truth → mobile fairness → scroll rhythm → multiplication motion → wayfinding → polish.**

### Step 1 — ~~Resolve the “five vs six stages” copy conflict~~ **Done; extend dual-intelligence copy**

**Where.** `fragmentation-story-part-two.tsx` (bridge), `fragmentation-story-page-content.tsx` (intro), `page.tsx` (metadata).

**Shipped.** Bridge now states **six stages—from fragmentation to movement** and ties the transition to **informational + relational** arrangement, connection, use, formation, infra, and field-level platforms. Intro and metadata echo the **two kinds of intelligence** thesis.

**Next.** Audit `fragmentation-story-content.ts` chapter accents, cost ledger lines, and each `MULTIPLICATION_COPY` / stage headline so **every audience** can hear both pains (use the per-audience table in §1 above). Add a lint or content checklist row in PR template: “Does this string serve informational, relational, or both?”

---

### Step 2 — Mobile / tablet: restore “figure per beat” without requiring sticky GSAP

**Problem.** Below `lg`, Part I loses the sticky composite entirely.

**Actions (pick one or combine).**

1. **Inline chapter thumbnails**  
   After each `<article>` heading (or between title and paragraphs), render a **single** `FragmentationIntelArtifact` or a small **static** composite per `ChapterId` — reusing the same slugs as `fragmentation-story-stage-layers.tsx` so the story still **shows** the break, not only describes it.

2. **Collapsible “See this beat”**  
   Progressive disclosure: a `Button` variant “Show visual” toggles a compact figure — avoids vertical explosion for users who want text-first.

3. **Tablet (`md`–`lg`)**  
   Either show a **scaled-down sticky** (one column, shorter height) or inline figures from (1). If sticky returns, re-test `scroll-mt-*` against the dock.

**Constraints.** Keep client boundary shallow; prefer server-friendly static markup with optional `"use client"` only on a small `ChapterInlineFigure` wrapper if interactivity is needed.

**Acceptance.** A reader on a phone can **see** unity → misalignment without reading-only fatigue.

---

### Step 3 — Acts GSAP: tablet policy + `ScrollTrigger.refresh`

**Where.** `fragmentation-story-acts.tsx`.

**Actions.**

1. **Breakpoint audit** — Decide if `min-width: 64rem` is still correct now that Movement and multiplication grew. If enabling GSAP at `48rem`, shorten scrub distances and reduce `pin` expectations (there is no pin in Acts today — only triggers).

2. **Refresh on layout shift** — Dock height changes when wrapping; call `ScrollTrigger.refresh()` on `resize` debounced and optionally when audience tabs wrap (ResizeObserver on dock).

3. **Optional: chapter typography micro-motion**  
   On enter, stagger **eyebrow + title** only (not full paragraphs) to avoid a11y noise — respect `prefers-reduced-motion`.

**Acceptance.** No “dead” triggers after dock wrap; optional motion does not harm reduced-motion users.

---

### Step 4 — Activation: scroll-scrubbed “live system” beat

**Where.** `fragmentation-story-stage-activation.tsx`.

**Goal.** Match the **emotional rhythm** of Integration and Formation without turning the whole section into a film. Narratively, Activation is where the integrated system becomes **usable**—retrieval, access, context, memory, response—not storage for its own sake (dual-intelligence throughline).

**Concrete ideas (implement 1–2).**

1. **Scrubbed highlight** — ScrollTrigger scrub ties to section: fake **caret** opacity in search, **ring** migration across two artifact thumbs, or schema panel **line draw** (same stroke-dashoffset pattern as Formation, shorter).

2. **Pinned inner workspace** (optional, harder) — Pin only the center `aspect-square` workspace for ~150vh while copy scrolls in a side column on `xl` — mirrors methodology “mechanism” pages; test mobile carefully.

**Constraints.** Transform/opacity first; no layout thrash; mirror `formation` / `integration` reduced-motion early returns.

**Acceptance.** Activation “breathes” on scroll the way a prospect expects after Integration.

---

### Step 5 — Multiplication: borrow Approach B “contract + echo” inside existing layout

**Where.** `fragmentation-story-stage-multiplication.tsx` (+ small helper file if timeline exceeds ~120 lines).

**Design.**

1. **Phase 0 (current)** — Full diagram + infra visible at rest *or* after scroll end.

2. **Scrub timeline (desktop, non-reduced)** — On section scroll:
   - **0.0–0.35:** Tenant orbit slightly **contracts**; line opacities dip.
   - **0.35–0.7:** **Infrastructure grid** fades/scales in (stagger the four informational, then relational row per `MULTIPLICATION_INFRA` order).
   - **0.7–1.0:** Captions **cross-fade** from “tenant” emphasis to “infra across the field” emphasis (if you split caption groups in content).

3. **Reduced motion** — Show final state; optional single 300ms fade-in on mount.

**Data.** Prefer driving labels from `fragmentation-story-content.ts` so marketing edits stay centralized.

**Acceptance.** Multiplication reads as **infra emerging from reproduction**, not a second unrelated poster—and viewers feel **both** informational and relational infrastructure (per §1 canonical narrative).

---

### Step 6 — Movement: optional scroll-linked “field wake” + respect slider

**Where.** `fragmentation-story-stage-movement.tsx`.

**Ideas.**

1. **Enter timeline** — On `ScrollTrigger` once (not scrub): edges **draw** (`stroke-dashoffset`), nodes **pop** in stagger from center platform — **then** user can still use the slider to rescale (timeline should not fight slider; kill or pause intro tl on first input).

2. **Ambient loop (subtle)** — Very low-amplitude **primary glow** pulse on `requestAnimationFrame` or short GSAP yoyo — only if reduced-motion is off; cap CPU.

3. **Copy cue for `nodes` param** — One line: “Share this density: URL updates as you drag” (true because shell syncs URL).

**Acceptance.** Movement feels like a **finale** tied to scroll, not only an interactive widget—and reads as **multiple integrated systems in a field**, not scale for its own sake (throughline §1).

---

### Step 7 — Wayfinding: user-visible story position (no `debug` required)

**Where.** New small component consumed by `fragmentation-story-shell.tsx` or dock footer.

**Ideas.**

1. **Segmented control** — `Part I · Problem` / `Part II · System` based on `IntersectionObserver` on `#fragmentation`, `#scatter`, `#bridge-part-two`, `#stage-integration`, …

2. **Chapter dots** — Only during Part I; mirrors `ChapterId` order; clicking scrolls to `#chapter-*` (respect dock offset).

3. **Stage stepper for Part II** — Minimal six labels with current stage **emphasized**; click navigates to `#stage-*`.

**Accessibility.** Use `role="tablist"` only if keyboard model matches tabs; otherwise `nav` + links.

**Acceptance.** A returning stakeholder can **jump** without reading the whole scroll every time (strategy §6 “repeatable reference”).

---

### Step 8 — Intro and metadata: surface the URL contract once

**Where.** `fragmentation-story-page-content.tsx` intro column or a single line under dock.

**Action.** Add **one** restrained sentence with example permalinks, e.g. `/fragmentation?audience=nonprofit&field=relational&nodes=40` — helps campaigns without duplicating the whole funnel (strategy §5–6).

**Acceptance.** Sales can copy a link from the page itself.

---

### Step 9 — Optional cross-pollination from Approach B (longer horizon)

**Not for a single PR unless scoped.**

- Extract **13 slug set** (or reuse existing intel slugs) and a **layout map** per stage; single pinned canvas for `/methodology` or a **short embed** — strategy already positions Approach B as **mechanism explainer**, not replacement for `/fragmentation`.

---

### Step 10 — QA checklist (run before merging narrative changes)

1. **`pnpm typecheck` / `pnpm lint`** after any TS or GSAP refactors.
2. **Motion:** `prefers-reduced-motion: reduce` — verify Integration, Formation, Scatter, Acts (if enabled), new Activation/Multiplication timelines all **degrade to readable final states**.
3. **Breakpoints:** 320, 390, 768, 1024, 1280, 1536 — dock wrap, scroll margins, no horizontal bleed (`overflow-x-clip` on `main`).
4. **URL:** Toggle audience, field, movement slider; confirm `replaceState` still matches parsers in `fragmentation-story-content.ts`.
5. **Keyboard:** Dock tabs, field toggle, new wayfinding controls, Movement slider.
6. **Performance:** Run Performance panel while scrubbing Multiplication; avoid filter-heavy effects; prefer transform/opacity.

---

## 4. Co-creation principles (Movemental + GSAP)

- **Semantic tokens only** — no raw hex; primary is a **light switch** for emphasis flashes and rings, not ambient fills.
- **Client boundaries** — Keep `"use client"` at **shell / stage / scatter** leaves; do not push unnecessary client wrappers into `page.tsx`.
- **ScrollTrigger hygiene** — `gsap.context` + revert in the same effect that created it; refresh on font load and resize; avoid duplicate ids when cloning SVG defs (Movement already uses `useId()` — follow that pattern).
- **Dual intelligence (non-negotiable)** — New copy, motion beats, and illustrations should answer: *Which intelligence is under stress here, and does the dock’s **informational / relational** toggle change something meaningful?* Formation and Multiplication must never collapse to “content only” or “reach only”; Movement must never read as “more Multiplication.”
- **Audience parity** — Movement leaders, nonprofits, churches, and institutions each carry **both** fragmentation patterns (see §1 table); accents and ledger lines should not optimize one sector at the expense of sounding generic on the other.

---

## 5. One-line summary for stakeholders

The `/fragmentation` route is the **primary public exhibit** for a single thesis: **informational and relational intelligence** have been fragmented; the **same library** re-composes through **six stages** into one coherent system, then a **field**. Shipped copy at intro, bridge, and metadata now states that intent explicitly. Highest-impact **remaining** work is **mobile/tablet figure parity**, **scroll rhythm in Activation and Multiplication**, **wayfinding / deep-link hints**, and a **content pass** so every audience + field combination carries the dual-intelligence story as clearly as the hero does.
