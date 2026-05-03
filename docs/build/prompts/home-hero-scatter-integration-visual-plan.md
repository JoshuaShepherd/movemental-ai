# Plan: Home hero — stronger scatter / integration story

**Purpose.** Evolve the **right-hand visual** in [§1 Hero](../../../src/components/sections/home/home-hero.tsx) so it carries **emotional tension → resolution** and **dual-field semantics** (informational primary, relational implied)—without duplicating `/fragmentation`, fighting [DESIGN.md](../../design/DESIGN.md), or matching [§2 Problem](../../../src/components/sections/home/home-problem.tsx) scatter density.

**Implementation.** Live behavior is defined in [home-hero-visual-dual-field.tsx](../../../src/components/sections/home/home-hero-visual-dual-field.tsx) (`HeroVisualDualField`). This document is the art‑direction and QA contract.

**Copy contracts** remain in [home-page-fragmentation-funnel-narrative.md](./home-page-fragmentation-funnel-narrative.md).

---

## 1. Current state (ground truth)

| Surface | File | Role |
| --- | --- | --- |
| Hero visual | `HeroVisualDualField` | Dual-field Motion: **dissonant first frame → settle once** (viewport + session), frame emergence, ≤3 `next/image`. |
| Problem visual | `ArtifactScatter` in `home-problem.tsx` | **Eight** tiles — explicit fragmentation demonstration. |

**Assets.** [home-data.ts](../../../src/components/sections/home/home-data.ts) → `IMG` from `fragmentation-story-content`.

---

## 2. Narrative goals

### 2.1 One sentence

> The visitor briefly feels **almost coherent intelligence that is subtly wrong**, then sees it **become a formed system**—informational work dominant, relational work present but tucked.

### 2.2 First-frame read (before motion)

> In the **first ~2 seconds**, with **no animation yet**, the user must perceive: **multiple elements**, **slight misalignment**, and **potential for order** (something could snap into place).

This is a **static compositional** requirement, not only a motion outcome.

### 2.3 Differentiation from §2 Problem

| | Hero (§1) | Problem (§2) |
| --- | --- | --- |
| **Job** | **Suggestion** of fragmentation + promise of **system formation**. | **Demonstration** — density and labels prove the claim. |
| **Density** | **Low** — never equals or exceeds §2. | **High** — eight-tile scatter. |
| **Read** | Felt before understood. | Understood through copy + visual ledger. |

**Rule:** Hero = *hint*; Problem = *proof*. Hero must **not** visually equal §2 scatter density.

### 2.4 Emotional constraint (critical)

- **First frame:** **slight dissonance**, not chaos — *almost* coherent, **subtly misaligned** so the user feels **“something is off”** before knowing why.
- **Resolution (“settle”):** **alignment**, **coherence**, **stability** — relief, not spectacle.

**Rule:**

> The hero must be **felt** before it is **understood**.

### 2.5 Meaning of “settle” (causality)

The transition must read as **why** things come together, not decoration. At least one of:

- **Emergence of a frame / container** (system boundary becomes visible), or  
- **Alignment to a shared grid or axis**, or  
- **One organizing center** (implicit hub: the frame or stacked focal point—not arbitrary card shuffling).

**Rule:**

> The system must feel **formed**, not **arranged**.

**Reject:** arbitrary snapping, motion with no causal read.

### 2.6 Simplification constraint (object count)

- **1–2** dominant informational artifacts (shipped: **2** — book, module).  
- **≤1** supporting relational element (shipped: **1** — chat).  
- **Total `next/image` ≤3**; **total visible figures ≤4** (shipped: **3** images).

> Simplicity is required for **cognitive clarity** at hero scale.

### 2.7 Book-informed tone (optional copy alignment)

- Structure is **load-bearing**; relationship is **non‑outsourcable** (fragmentation manuscript, formation / relational chapters). The visual implies **integration serves formation**, not replacement.

---

## 3. Direction lock

| Direction | Status |
| --- | --- |
| **B — Dual field** (informational primary, relational implied) | **Primary recommended** — shipped in `HeroVisualDualField`. |
| **A — Scatter snap** | **Fallback** if Motion must be removed or dual-field AB-tests poorly. |
| **C — Single object morph** | **Rejected** for hero — too subtle for first-read dissonance. |
| **D — Living diagram** | **Rejected** — reads SaaS‑coded / abstract at hero scale. |

---

## 4. Direction B — Dual field (enforced hierarchy)

**Informational intelligence is primary. Relational intelligence is supportive and implied.**

**Require:**

- **1–2 dominant** informational artifacts (implementation: **book + module**).  
- **1 subtle** relational element (**chat** or **email** — implementation: **chat**).  
- Relational layer must: **not** compete visually, **not** form a second “lane,” feel **integrated or tucked beneath** (lower opacity, smaller scale, z‑index under informational cards).

**Reject:**

- Equal-weight dual columns  
- Mirrored compositions  
- A second full “lane” of relational tiles  

**Animation:** Frame/container **emerges** on settle; informational cards **align** to a shared vertical axis; relational card **tucks** under the pair (opacity/position reinforce “inside the system,” not parallel competition).

---

## 5. Design system constraints

From [DESIGN.md](../../design/DESIGN.md): semantic tokens, calm motion, `shadow-ambient` only when justified, no decorative noise. [MOTION.md](../../design/MOTION.md) / `Reveal` budgets apply to the rest of the page; hero visual uses **one** controlled timeline (Motion), **transform-only** motion on figures.

---

## 6. Implementation (locked)

| Field | Choice |
| --- | --- |
| Component | `HeroVisualDualField` — `"use client"` in `home-hero-visual-dual-field.tsx`; session I/O in [`home-hero-visual-session.ts`](../../../src/lib/home-hero-visual-session.ts) (Vitest: `home-hero-visual-session.test.ts`) |
| Stack | **Motion** (`motion/react`), `useReducedMotion`, variants `mess` → `settled` |
| Motion shape | **Transform-only** on figures (`x`, `y`, `rotate`, `scale`, `opacity`); shell **scale + opacity** for frame emergence. `layout` prop omitted: figures are anchor-fixed `absolute` layers—transform variants deliver the snap without FLIP layout thrash. |
| Duration | **0.75–0.8s** (within 600–1000ms) |
| Easing | `easeInOut` — `[0.42, 0, 0.58, 1]` |
| Trigger | `IntersectionObserver` (~same threshold spirit as `Reveal`), **once** per session after play (`sessionStorage` via [`home-hero-visual-session.ts`](../../../src/lib/home-hero-visual-session.ts); `playedLiveRef` gates writes so restored sessions do not re-flag) |
| Images | **3** × `next/image` — `IMG.book`, `IMG.module`, `IMG.chat` |
| a11y | Decorative shell `aria-hidden`; `sr-only` description **outside** the hidden subtree |

**GSAP** remains documented as optional alternative in archive sense only; production hero uses Motion.

---

## 7. Measurement & QA

- [x] First frame: **slight off**, not chaotic.  
- [x] Settle: **clear coherence** + causal read (shell scale/opacity + shared **y** axis on informational pair + tucked chat).  
- [x] Informational **dominates**; relational **subtle**.  
- [x] Motion **calm**, not decorative.  
- [x] Hero density **&lt; §2**.  
- [x] Read: **system formed**, not “nice layout.”  
- [ ] LCP / CLS / `prefers-reduced-motion` / token audit — **verify in Lighthouse / browser** before release.

---

## 8. Related documents

1. [home-page-fragmentation-funnel-narrative.md](./home-page-fragmentation-funnel-narrative.md)  
2. [fragmentation-page-visual-narrative-co-creation.md](./fragmentation-page-visual-narrative-co-creation.md)  
3. [sticky-left-fragmentation-visual-field.md](./sticky-left-fragmentation-visual-field.md)  
4. [DESIGN.md](../../design/DESIGN.md) §1, §6  
5. Fragmentation manuscript — Ch.12–13 for tone (`docs/book-development/fragmentation-manuscript-ordered/`).

---

## 9. Decision record (shipped)

| Field | Choice |
| --- | --- |
| Primary direction | **B — Dual field** |
| Stack | **Motion** (`motion/react`) |
| Motion policy | Once per session after first in-view play; reduced motion = static resolved |
| Hero asset subset | `book`, `module`, `chat` WebPs |
| Owner sign-off | engineering + plan alignment |
