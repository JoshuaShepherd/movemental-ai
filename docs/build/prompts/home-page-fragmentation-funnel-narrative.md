# Prompt: Home page → Fragmentation-funnel narrative rebuild

> **How to run this:** Invoke with `@docs/build/prompts/home-page-fragmentation-funnel-narrative.md`. This prompt rebuilds the site home page ([src/app/(site)/page.tsx](../../../src/app/(site)/page.tsx) and [src/components/sections/home/](../../../src/components/sections/home/)) so it reads as a single continuous argument — **problem → consequence → system → proof → expansion → invitation** — instead of a collage of standalone editorial sections.
>
> It **imports** three upstream documents and does not replace them:
> 1. [docs/design/DESIGN.md](../../design/DESIGN.md) — tokens, primitives, Midnight bands, typography, motion discipline
> 2. [docs/architecture/README.md](../../architecture/README.md) + [docs/architecture/TYPE_SAFETY.md](../../architecture/TYPE_SAFETY.md) — six-layer chain, Layer 6 hand-build rules
> 3. [docs/build/prompts/stitch-to-react-migration.md §2, §7, §11](./stitch-to-react-migration.md) — non-negotiables, translation table, validation checklist
>
> The scrollytelling patterns, dock mechanics, pinned stages, data module, and audience/field URL contract are modeled after the production implementation at [src/components/sections/fragmentation-story/](../../../src/components/sections/fragmentation-story/). **Read that folder before you edit the home page.** It is the reference implementation for every motion beat you will compress into the home.

---

## 1. Mission

Rewrite the composition under [home-page-content.tsx](../../../src/components/sections/home/home-page-content.tsx) so the page advances one argument, end-to-end, with **no tonal dead zones and no repeated beats**. The current page has strong individual blocks (`HomeHero`, `HomeCredibilityCrisis`, `HomeScenius`, `HomeConvergence`, `BookSection`, …) but it reads as parallel claims rather than a funnel.

### The funnel (top of page → bottom)

```
Top:        "I think this is about AI / content"
Middle:     "Oh — it's fragmentation"
Deeper:     "Oh — it's a system problem"
Conversion: "I need this system"
```

The home page **must not** replicate the fragmentation page. It must generate enough clarity and tension that a visitor needs to scroll into `/fragmentation` — and give them three tuned entry points (Movement Leaders / Nonprofits / Churches & Institutions) when they arrive at the bottom.

### Source of truth ordering

1. **Narrative truth** → §2 of this prompt (13-section spine).
2. **Visual / motion pattern truth** → [src/components/sections/fragmentation-story/](../../../src/components/sections/fragmentation-story/) — compressed, not copied.
3. **Token / design truth** → [docs/design/DESIGN.md](../../design/DESIGN.md) + `src/app/globals.css`.
4. **Type / data flow truth** → [docs/architecture/TYPE_SAFETY.md](../../architecture/TYPE_SAFETY.md).
5. **Migration mechanics** → [stitch-to-react-migration.md](./stitch-to-react-migration.md).

If a mockup, memory, or older home component contradicts §2, §2 wins.

---

## 2. The 13-section spine (section-by-section checklist)

Every section below must render in this exact order inside `<HomePageContent />`. Each section has a fixed `id` (for anchor links and analytics), a primitive (`Section` with a `variant`), and a narrative purpose. Do **not** add sections not on this list without updating this prompt first.

| # | Section id | Variant | Purpose (one sentence) |
|---|---|---|---|
| 1 | `hero` | `default` (light, photo backdrop OK) | Name the problem and the outcome. |
| 2 | `problem` | `section` | Define fragmentation (informational + relational). |
| 3 | `consequence` | `midnight` | Coherence breaks first; stakes for interpretation, representation, and trust (see §2.1 row 3). |
| 4 | `turn` | `section` | "What if all of this became one system?" — the pivot. |
| 5 | `system` | `default` | Compressed 6-stage arc (mirrors `/fragmentation`). |
| 6 | `integration` | `section` | One public home — informational + relational layer. |
| 7 | `activation` | `default` | Not just stored — usable. |
| 8 | `formation` | `section` | Transformation: information informs, relationships form. |
| 9 | `multiplication` | `default` | Infrastructure (informational + relational) — scale the system, not the content. |
| 10 | `movement` | `midnight` | **New** — network of platforms (leader-to-leader, org-to-org). |
| 11 | `proof` | `default` | Social proof reframed — "built with the people doing the work." |
| 12 | `entry-points` | `section` | Three tuned paths: Leaders / Nonprofits / Churches & Institutions. |
| 13 | `cta` | `midnight` | "You don't need another tool. You need your intelligence to exist as a system." |

### 2.1 Copy contracts (exact strings the page must contain)

These are the **non-negotiable** copy anchors. Supporting paragraphs are author-controlled; headlines and hinge lines below are locked.

| # | Locked copy |
|---|---|
| 1 | **Headline:** "Your intelligence is fragmented. That's why it doesn't compound, form people, or scale." • **Primary CTA:** "See how it works" (in-page anchor to `#system`) • **Secondary CTA:** "View the full story" → `/fragmentation` |
| 2 | **Headline:** "The problem isn't content, tools, or AI. It's fragmentation." • **Two labels:** "Informational fragmentation" / "Relational fragmentation" |
| 3 | **Headline:** "When intelligence fragments, coherence is the first thing that breaks." • **Hinge:** "Not because truth is gone. Because coherence is gone." • **Body (required):** Name coherence, interpretation, and representational failure (incl. search/assistants) without numeric claims unless L2b-attributed on-page. • **Trust link (required):** "Read the inspectable diagnosis" (or equivalent) → `/book/read/the-invisible-tax` (fragmentation book Ch 1 in shipped spine) — see [`home-page-narrative-credibility-ia-plan.md`](./home-page-narrative-credibility-ia-plan.md) §6–7. *(Amended 2026-04-15: prior headline over-claimed without on-page citations.)* |
| 4 | **Headline:** "What if all of this became one system?" • **Close:** "You don't need more content. You need your intelligence to exist as a coherent whole." |
| 5 | **Title:** "From fragmentation to movement." • **Six stages in order:** Fragmentation, Integration, Activation, Formation, Multiplication, Movement |
| 6 | **Headline:** "One system for everything you know and everyone you serve." |
| 7 | **Headline:** "Not just stored — usable." |
| 8 | **Headline:** "This is where transformation actually happens." • **Key line:** "Information informs. Relationships form. Together, they transform." |
| 9 | **Headline:** "Now your system can scale." • **Key idea:** "You're not scaling content. You're scaling a system." |
| 10 | **Headline:** "And eventually, it becomes a movement." • **Hint link:** "Watch this grow" → `/fragmentation#stage-movement` |
| 11 | **Headline:** "Built with the people doing the work." |
| 12 | **Headline:** "Where do you start?" • **Three labels:** "Movement Leaders" / "Nonprofits" / "Churches & Institutions" |
| 13 | **Headline:** "You don't need another tool. You need your intelligence to exist as a system." • **CTAs:** "Build your system" / "See the full breakdown" (→ `/fragmentation`) / "Talk to us" (→ `/contact`) |

---

## 3. Component plan

### 3.1 File map (what to create, keep, delete)

Create under [src/components/sections/home/](../../../src/components/sections/home/). Prefer **one file per section** so each block is individually Storybookable and diff-safe. This mirrors the split in `fragmentation-story/` (one `fragmentation-story-stage-*.tsx` per stage).

| Section | File | Notes |
|---|---|---|
| 1 | `home-hero.tsx` + `home-hero-visual-dual-field.tsx` | **Shipped.** Copy + right-side `HeroVisualDualField` (dual-field Motion, session + reduced motion). Spec: [`home-hero-scatter-integration-visual-plan.md`](./home-hero-scatter-integration-visual-plan.md). |
| 2 | `home-problem.tsx` | **New.** Two-column: copy left, artifact scatter visual right. |
| 3 | `home-consequence.tsx` | **Rename + rewrite** `home-credibility-crisis.tsx` → this. Midnight band. |
| 4 | `home-turn.tsx` | **New.** Pivot. Fragments pulling together visual. |
| 5 | `home-system.tsx` | **New.** Compressed 6-stage rail. Reuses artifact vocabulary from `fragmentation-story-content.ts`. |
| 6 | `home-integration.tsx` | **New.** Mirrors `fragmentation-story-stage-integration.tsx` in a single viewport. |
| 7 | `home-activation.tsx` | **New.** Mirrors `fragmentation-story-stage-activation.tsx` (IDE-lite). |
| 8 | `home-formation.tsx` | **New.** Mirrors `fragmentation-story-stage-formation.tsx` pathway arc. |
| 9 | `home-multiplication.tsx` | **New.** Mirrors `fragmentation-story-stage-multiplication.tsx` + infrastructure overlay. |
| 10 | `home-movement.tsx` | **New, critical.** Network-of-platforms (not people dots). Midnight. |
| 11 | `home-proof.tsx` | **Rewrite** of `home-leader-profiles.tsx` + `home-scenius.tsx`. One merged block. |
| 12 | `home-entry-points.tsx` | **New.** Three-card grid → `/movement-leaders`, `/nonprofits`, `/churches`. |
| 13 | `home-cta.tsx` | **Rewrite** of `home-closing-cta.tsx`. Three CTAs. |
| — | `home-data.ts` | **Extend.** Becomes the pure-data module (see §3.3). |
| — | `home-page-content.tsx` | **Rewrite.** Server component that composes 1→13 in order. |

**Delete after the rebuild lands:**
- `home-scenius.tsx` (absorbed into `home-proof.tsx`)
- `home-leader-profiles.tsx` (absorbed into `home-proof.tsx`)
- `home-credibility-crisis.tsx` (replaced by `home-consequence.tsx`)
- `home-closing-cta.tsx` (replaced by `home-cta.tsx`)
- `home-convergence.tsx` (removed — its ideas live inside §3, §5, §10)
- `home-alan-hirsch.tsx` (removed — Alan is one node in §10/§11, not a dedicated section)
- `home-system-readiness-rail.tsx` (remove; it duplicates §5 in a weaker form)
- `BookSection` import from `@/components/book` — remove from home composition; book lives on `/book`.

### 3.2 `home-page-content.tsx` — final composition

```tsx
// src/components/sections/home/home-page-content.tsx
// Server component. No "use client". Client behavior is pushed into each section file.

import { HomeHero } from "./home-hero";
import { HomeProblem } from "./home-problem";
import { HomeConsequence } from "./home-consequence";
import { HomeTurn } from "./home-turn";
import { HomeSystem } from "./home-system";
import { HomeIntegration } from "./home-integration";
import { HomeActivation } from "./home-activation";
import { HomeFormation } from "./home-formation";
import { HomeMultiplication } from "./home-multiplication";
import { HomeMovement } from "./home-movement";
import { HomeProof } from "./home-proof";
import { HomeEntryPoints } from "./home-entry-points";
import { HomeCta } from "./home-cta";

export function HomePageContent() {
  return (
    <>
      <HomeHero />
      <HomeProblem />
      <HomeConsequence />
      <HomeTurn />
      <HomeSystem />
      <HomeIntegration />
      <HomeActivation />
      <HomeFormation />
      <HomeMultiplication />
      <HomeMovement />
      <HomeProof />
      <HomeEntryPoints />
      <HomeCta />
    </>
  );
}
```

### 3.3 `home-data.ts` — pure-data module

Follow the pattern in [fragmentation-story-content.ts](../../../src/components/sections/fragmentation-story/fragmentation-story-content.ts): **all copy, stage definitions, entry-point cards, and proof rows live in one typed module.** JSX files import from it. This is how a non-engineer can change home copy in one file.

Required exports (minimum):

```ts
export type HomeStageId =
  | "fragmentation" | "integration" | "activation"
  | "formation" | "multiplication" | "movement";

export type HomeStage = {
  id: HomeStageId;
  index: 1 | 2 | 3 | 4 | 5 | 6;
  label: string;      // "Fragmentation"
  oneLiner: string;   // single-sentence explanation
  href: `/fragmentation#${string}` | "/fragmentation";
};

export type EntryPoint = {
  id: "leaders" | "nonprofits" | "churches";
  label: string;
  blurb: string;
  href: `/${string}`;
};

export type ProofRow = {
  name: string;
  role: string;
  blurb: string;
  href?: `/${string}`;
};

export const homeStages: readonly HomeStage[];
export const entryPoints: readonly EntryPoint[];
export const proofRows: readonly ProofRow[];
```

Reuse — do not duplicate — the `fragmentation-story-content.ts` artifact definitions where visuals share vocabulary (artifact types, pathway stops). If a piece of copy is already in that module, **import it**; do not re-key it.

---

## 4. Design system rules (hard constraints)

All of these are already covered in [DESIGN.md](../../design/DESIGN.md) — they are repeated here because this is the easiest page to regress on them.

1. **Semantic tokens only.** `bg-background` / `bg-section` / `bg-card` / `bg-inverse-surface`, `text-foreground` / `text-muted-foreground` / `text-inverse-foreground`, `bg-primary`. **Never** raw hex, `bg-white`, `bg-black`, `bg-blue-600`, `text-gray-500`.
2. **One primitive per section.** Wrap with `<Section variant="midnight|section|default" spacing="sm|md|lg">` → `<Container>` → content. No hand-rolled `<section className="…">` wrappers.
3. **Midnight discipline.** Use Midnight only for §3 (consequence), §10 (movement), §13 (cta). That rhythm — `default → section → midnight → section → default → section → default → section → default → midnight → default → section → midnight` — is the Ghost-Lift cadence; do not flatten it.
4. **No 1px sectioning borders, no pasted drop shadows.** Depth comes from tonal stacking. Cards may use `shadow-ambient` if they truly float; prefer tonal lift.
5. **Primary is a light-switch.** `#0053db` / `bg-primary` appears on exactly these surfaces: hero primary CTA, `#cta` primary CTA, and the `is-active` stage pip in `#system`. Anywhere else, primary is a bug.
6. **Inter only**, display headings at `tracking-[-0.02em]`, eyebrows `uppercase tracking-[0.05em]`. Use `Display`, `Eyebrow`, `Prose` primitives — do not reinvent.
7. **Image discipline.** Every artifact uses `next/image` with `fill` + `sizes`. No hotlinked images. Pull from `public/images/fragmentation-story/` where artifact vocabulary is shared.
8. **No icons used as decoration.** Icons only communicate state (arrow, check, external). Four `lucide-react` icons max on the whole page.

If you reach for a new token, radius, or shadow, **stop** and add it to `globals.css` + `DESIGN.md` in the same change.

---

## 5. Scrollytelling rules (how motion collapses into the home)

The fragmentation page earns its length with six pinned stages. The home page earns attention in ~60 seconds — motion must be **sparse, local, and optional**. Rules:

1. **No full-viewport pins on the home page.** The fragmentation page pins; the home page does not. Motion here is scroll-reveal (enter/exit) at most.
2. **Per-section client boundary.** If a section needs JS, make only that file `"use client"`. `home-page-content.tsx` stays a Server Component. Mirror the approach in `fragmentation-story-shell.tsx` / `fragmentation-story-acts.tsx`.
3. **Desktop-only, motion-safe.** Enable motion only for `min-width: 64rem` **and** `!prefers-reduced-motion`. On small screens and reduced motion, render the final state as static layout. Use the same guard shape as `FragmentationStoryActs` (see the `matchMedia` gate in [fragmentation-story-acts.tsx](../../../src/components/sections/fragmentation-story/fragmentation-story-acts.tsx)).
4. **One motion beat per section, max.** Examples:
   - §1 hero right visual: three artifacts drift into alignment on mount (CSS-only keyframes, no scrub).
   - §2 problem: artifact scatter fades in on `IntersectionObserver` entry.
   - §4 turn: fragments converge on entry (transform + opacity only).
   - §5 system: the six stage pips gain `is-active` as you scroll past (`IntersectionObserver`, no scrub).
   - §9 multiplication: infrastructure overlay fades in beneath the tenant grid on entry.
   - §10 movement: one staggered node reveal on entry.
5. **Reuse, don't reinvent.** If a motion is already solved in `fragmentation-story-stage-*.tsx`, import or copy the reduced-motion guard and the transform math. Do not install GSAP for the home page; CSS + `IntersectionObserver` is enough at this density.
6. **Transform/opacity only.** No `filter`, no `top/left` animation, no layout thrash.
7. **Animation is never load-bearing for copy.** Every headline and body paragraph must be legible with JS disabled.

---

## 6. Type-safety / architecture rules

From [docs/architecture/TYPE_SAFETY.md](../../architecture/TYPE_SAFETY.md): the home page is pure Layer 6. It **must not** read from DB, services, hooks, or routes. All copy and structure live in `home-data.ts` (pure, typed, no runtime fetching). If a future version pulls a real case-study or testimonial list from the database, it enters at Layer 3 → Layer 5 first — not in JSX.

- No `fetch`, no TanStack Query, no Supabase imports in any `home-*.tsx` file.
- No dynamic route params, no `searchParams`. The home page has no URL state (unlike `/fragmentation`, which syncs `audience` / `field`).
- Types flow downstream only: `home-data.ts` exports concrete types; section components import them. Do not re-declare types inside component files.

---

## 7. Execution protocol

### 7a. Inventory (before any edits)

1. Read the full current [home-page-content.tsx](../../../src/components/sections/home/home-page-content.tsx) and every `home-*.tsx` file it imports.
2. Read [fragmentation-story-page-content.tsx](../../../src/components/sections/fragmentation-story/fragmentation-story-page-content.tsx), [fragmentation-story-shell.tsx](../../../src/components/sections/fragmentation-story/fragmentation-story-shell.tsx), and every `fragmentation-story-stage-*.tsx`. These are the **patterns** you are compressing.
3. Read [fragmentation-story-content.ts](../../../src/components/sections/fragmentation-story/fragmentation-story-content.ts) end-to-end. Decide which artifact types, stage names, and pathway stops the home page can reuse by import rather than duplicate.
4. Read the audit at [docs/build/audit/fragmentation-story-approaches-audit.md](../audit/fragmentation-story-approaches-audit.md) for the three-approach context.
5. List every piece of copy in today's home that you are removing. Confirm none of it is load-bearing for SEO — if anything is a ranked keyword, migrate it into §2 or §5 first.

### 7b. Scaffold

In one PR, create empty stubs for all 13 section files that render `<Section>` → `<Container>` → `<Display>` with only the §2.1 locked headline. Update `home-page-content.tsx` to compose them in order. Delete the removed files (see §3.1). Run `pnpm typecheck` and `pnpm build` — page should render, visually sparse, no TS errors.

### 7c. Fill

Implement one section per commit, top to bottom:

1. §1 hero (rewrite) — copy first, then the right-side mini visual.
2. §2 problem — artifact scatter visual reused from `fragmentation-story-stage-layers` vocabulary.
3. §3 consequence — simple midnight band, one hinge line.
4. §4 turn — pivot card with converge animation.
5. §5 system — six compressed stage cards with `is-active` scroll progression.
6. §6 integration — single-viewport compression of the fragmentation integration stage.
7. §7 activation — IDE-lite panel (1 viewport, not 2-column pinned).
8. §8 formation — pathway arc with the same five stops (Dissonance → Action → Reflection → Community → Local Embodied Practice).
9. §9 multiplication — tenant hub + **infrastructure overlay** (SEO / AI / Translation / Peer Network). This matches the audit's §6 recommendation.
10. §10 movement — network of platforms. Nodes are named leaders' platforms (Alan Hirsch, Brad Brisco, JR Woodward, …). Not people dots. Not logos. Platform cards.
11. §11 proof — merged `scenius` + `leader-profiles`.
12. §12 entry-points — three cards, each links to its respective audience page already in `src/app/(site)/`.
13. §13 cta — three CTAs (Build your system / See the full breakdown / Talk to us).

After each section, run `pnpm typecheck` + `pnpm lint` + `pnpm dev` and verify the funnel reads correctly from top to this section before moving on.

### 7d. Compression check (after §13 lands)

Open the home page at 1440×900 and do a scroll-through in under 60s. Every section must:
- Raise **one** claim or one question.
- Resolve that claim or question inside the same section.
- Hand off to the next section tonally (midnight after a light section, or vice versa).

If a section raises a question another section answers, merge them. If a section answers a question no section raised, cut it.

### 7e. Link integrity

- `/fragmentation` must be linkable from §1 (secondary CTA), §5 (per-stage hrefs), §10 ("Watch this grow"), and §13 (secondary CTA).
- `/movement-leaders`, `/nonprofits`, `/churches` must each be linked once from §12.
- `/contact` is the target for §13's tertiary CTA and only there.
- No orphan anchors. Every `id` on this page is referenced at least once from inside the page (hero → `#system`) or from the nav.

---

## 8. Validation checklist

Before opening a PR, every box must be checked.

**Architecture**
- [ ] `home-page-content.tsx` is a Server Component (no `"use client"`).
- [ ] Exactly one `"use client"` per section that needs motion, pushed to the leaf.
- [ ] `home-data.ts` owns all copy; no string literals in JSX except inline emphasis rendering.
- [ ] No `fetch`, no query hooks, no Supabase imports on this page.

**Design**
- [ ] Zero raw hex, `bg-white`, `bg-black`, `text-gray-*`, `bg-blue-*`, `border-gray-*` anywhere in home files.
- [ ] Every section uses `<Section variant="…">` → `<Container>`.
- [ ] Midnight used only in §3, §10, §13.
- [ ] `bg-primary` used only in the three surfaces listed in §4.5.
- [ ] No `shadow-*` class except `shadow-ambient`.
- [ ] Every image is `next/image` with `fill` + `sizes`.

**Narrative**
- [ ] All 13 locked copy anchors from §2.1 appear verbatim.
- [ ] Section order matches §2 exactly.
- [ ] The scroll-through argument resolves in under 60s (see §7d).
- [ ] `/fragmentation` is linked from §1, §5, §10, §13.
- [ ] Three entry-point links (§12) resolve to existing routes.

**Motion**
- [ ] No pinned (`position: sticky` + viewport-height) sections on the home page.
- [ ] Every motion beat is guarded by `min-width: 64rem` **and** `!prefers-reduced-motion`.
- [ ] Static layout at reduced-motion / narrow viewport is fully legible (copy in final state).
- [ ] GSAP is **not** imported by any `home-*.tsx` file.

**Type safety**
- [ ] `pnpm typecheck` clean.
- [ ] `pnpm lint` clean.
- [ ] `pnpm build` succeeds with no new warnings.

**Deletions**
- [ ] `home-scenius.tsx`, `home-leader-profiles.tsx`, `home-credibility-crisis.tsx`, `home-closing-cta.tsx`, `home-convergence.tsx`, `home-alan-hirsch.tsx`, `home-system-readiness-rail.tsx` all removed.
- [ ] No imports of `@/components/book` in `home-*.tsx`.

---

## 9. Anti-patterns to reject

- **Replicating `/fragmentation` on the home page.** The home page is a funnel into `/fragmentation`, not a mirror. If a home section needs more than one viewport of content to make its point, it belongs on `/fragmentation`.
- **Marketing-template additions.** No "Features" grid, no "Why Movemental" three-up, no testimonial carousel, no logo strip before proof (§11).
- **People-dot diagrams in §10.** Movement is leaders' *platforms* connecting, not avatars with lines.
- **Stock imagery anywhere.** Every visual is either (a) an artifact from `public/images/fragmentation-story/`, (b) an SVG composed from semantic tokens, or (c) already approved photography under `public/images/site/`.
- **New Midnight bands beyond §3/§10/§13.** The cadence is load-bearing.
- **Inline copy strings.** If a string is visible to a user, it is in `home-data.ts`.

---

## 10. Done criteria

The rebuild is complete when:

1. A first-time reader, scrolling top to bottom once, can repeat back the four funnel beats (problem → system → proof → invitation) without prompting.
2. A second reader who wants to go deeper clicks "See the full breakdown" from §13 (or "Watch this grow" from §10, or the secondary CTA in §1) and lands on `/fragmentation`.
3. A third reader who already knows they want to engage picks one of the three cards in §12 and lands on the right audience page.
4. All checkboxes in §8 are green.
5. The delete list in §3.1 is executed — dead code removed, no compatibility shims.

That is the whole job.
