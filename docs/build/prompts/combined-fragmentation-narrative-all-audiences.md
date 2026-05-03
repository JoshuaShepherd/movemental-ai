# Combined narrative prompt: one story for four audiences × two intelligences

Use this prompt when authoring or implementing a **single long-form experience** that merges:

1. **`docs/build/fragmentation-sticky-mockup.html`** — scroll-choreographed **left sticky visual field** (Acts I–V), **scatter climax**, and **Part II** constellation stages (**Integration → Activation → Formation → Multiplication**) with **photographic WebP** artifacts.
2. **`docs/build/fragmentation-sticky-mockup-css.html`** — the **same narrative spine and layout mechanics** with **CSS-only** stand-ins for every artifact (zero raster dependency; useful for prototypes, fast iteration, or strict “no generated imagery” constraints).
3. **`docs/build/fragmentation-by-audience-mockup.html`** — **sticky audience dock** (four segments) plus a **mode rail** that toggles **Informational** vs **Relational** “fields,” each rendered as a **scatter of concrete artifact tiles** (spreadsheets, folders, threads, boards) and **audience-specific copy + taxes**.

The goal is **not** three separate pages. It is **one coherent narrative** that every audience recognizes as *their* full story — fragmentation is the **middle**, not the **ending** — and that honors **both forms of intelligence** throughout.

Companion implementation detail for the sticky visual column alone: `docs/build/prompts/sticky-left-fragmentation-visual-field.md`.

---

## 1. North star

**Promise to the reader:** “Here is how your work *actually* lives today — in the artifacts you can name — and here is the arc that moves from coherence through breakup, through the cost of sprawl, into a grounded picture of re-integration and multiplication.”

**Non-negotiables:**

- **Four audiences** share one spine but see **named, plausible artifacts** for their world: **movement leaders**, **nonprofits**, **churches**, **seminaries / institutions**.
- **Two intelligences** are always structurally visible: **Informational** (corpus, curriculum, files, SEO/GEO surfaces, publishing pipelines) and **Relational** (inboxes, cohorts, boards, vendors, pastoral care threads, succession-bearing networks).
- The story **extends past** the fragmentation acts: every audience path must **land** in **Integration → Activation → Formation → Multiplication** (the Part II stages in the sticky mockups), not stop at misalignment or scatter-only catharsis.

---

## 2. What each mockup contributes (merge, don’t duplicate)

| Layer | From sticky (image + CSS mirrors) | From audience mockup |
|-------|-----------------------------------|------------------------|
| **Macro rhythm** | Midnight intro → Acts I–V (unity → … → misalignment) → scatter “all at once” → Part II constellations → outro | Sticky **audience** + **field** controls; per-audience **tile vocabulary** and **tax lists** |
| **Primary metaphor** | Editorial **stage**: one dominant artifact, ghost siblings, choreographed separation | **Scatter field** of **recognizable UI objects** (sheets, folders, chat, email) |
| **Proof of specificity** | Generic-but-evocative imagery (bulletin → book → chat → email) | **Audience-tuned labels** (e.g. board packets, grant narratives, small-group pathways, research centers) |
| **Motion story** | GSAP `ScrollTrigger` scrub on desktop; inline figures on small screens | Scroll-driven “tax” counters / emphasis (where appropriate); keep field switch **instant** and **accessible** |
| **Asset strategy** | WebP set under `public/images/fragmentation-story/` **or** CSS-only facsimiles | Tiles can stay **vector/CSS** even when the sticky stage uses **photos** — intentional mixed fidelity is allowed if hierarchy is clear |

**Combination rule:** Treat the **sticky stage** as the **emotional and symbolic** layer (the five-act arc + constellation compositions). Treat the **audience scatter** as the **inventory and credibility** layer (this is literally your stack). They should **annotate each other**, not compete: copy in the scroll column should **name** what the stage shows and **enumerate** what the scatter tiles imply.

---

## 3. Proposed information architecture (single page, one URL)

Think in **horizontal** (who + which intelligence) and **vertical** (which act / stage).

### 3.1 Global chrome (persistent)

Below the site nav, a **compact dock** (from the audience mockup):

- **Audience tabs:** Leaders · Nonprofits · Churches · Seminaries  
- **Field toggle:** Informational | Relational (segmented control or tab pair; keyboard and ARIA parity with the HTML mockup)

**Behavior:**

- Changing **audience** swaps **tile sets**, **tax examples**, and **one-line panel meta** — not the whole page layout.
- Changing **field** swaps **which scatter** is primary in the “inventory” regions while keeping the **same vertical acts** (so the reader learns: *same life, two shapes*).

### 3.2 Vertical spine (shared by all audiences)

Use the **sticky mockup’s order** as canonical:

1. **Intro (Midnight)** — thesis: intelligence widens into partials that don’t know each other exist. Optionally add one sentence that **four kinds of organizations** feel this in different skins.
2. **Act I–V block** — left sticky stage + right chapters (or CSS artifact equivalents). **Audience affects copy**, not necessarily the **order** of acts: the *beats* stay stable so the reader builds pattern recognition.
3. **Scatter climax** — “all of it, all at once” (sticky mockup). Here, **audience + field** strongly modulate **which tiles rush in** and which **tax line** hits hardest.
4. **Part II — four stages** — Integration, Activation, Formation, Multiplication. Constellation layout from sticky mockup; **captions and microcopy** branch by audience and, where useful, by field (e.g. relational integration = shared CRM + pastoral handoff; informational integration = single corpus + attribution layer).
5. **Outro (light)** — CTA framed as **movement of intelligence**, not tool shopping.

### 3.3 Where “full story per audience” shows up

For **each** of the four audiences, author **two short passages** (≈120–220 words each) used as **pull quotes or side rails** in Part II, not only in the scatter intro:

- **Informational full story:** what *integrated* knowledge looks like for them (publish once, cite cleanly, curriculum/version truth, translation pipeline, GEO-defensible surfaces).
- **Relational full story:** what *integrated* trust and coordination looks like (succession, board/staff continuity, donor memory, cohort pathways, vendor handoffs).

This prevents the page from being “fragmentation porn” — the **back half** explicitly answers: *so what does reconnection look like in our world?*

---

## 4. Unifying the two “intelligence” fields with the five acts

The five acts describe **how** fragmentation happens. The two fields describe **where** it shows up.

| Act | Informational field should emphasize | Relational field should emphasize |
|-----|--------------------------------------|-----------------------------------|
| **I · Unity** | Single canonical artifact (order of service, syllabus, theory of change doc) | Single gathered community rhythm (one room, one cohort night, one chapel) |
| **II · First break** | Version fork (two docs, two slide decks, duplicate Notions) | Duplicated care (two threads, two pastors, same family) |
| **III · Divergence** | Many surfaces (book, module, PDF, grant attachment) | Many relationship graphs (board, staff, partners) without shared memory |
| **IV · Channels** | Podcast, site, LMS, social — parallel publishing | SMS, DMs, chat, hallway — parallel pastoral / operational comms |
| **V · Misalignment** | SEO/GEO cites wrong version; translation stall | Email thread sprawl; turnover walks away with the network |

**Prompt instruction for writers:** When the reader flips **Informational ↔ Relational**, the **headline of each act** stays parallel; only the **examples and scatter tiles** swing. That parity is what makes it *one* narrative with two lenses.

---

## 5. Visual system: one stage, two fidelity modes

When implementing (or briefing design in Stitch / production React):

- **Desktop:** Keep **one** sticky stage column for Acts I–V. Map `data-chapter` to scroll sections as in the sticky mockups.
- **Stage assets:** Ship **either** WebP **or** CSS facsimiles per `fragmentation-sticky-mockup-css.html`. Prefer **one** path per build for performance; mixed mode only if art-directed.
- **Scatter / tiles:** Prefer **CSS tiles** for audience specificity (fast to iterate, reads as “software reality”). Optionally **echo** one tile as a **ghost** on the sticky stage during Act III–V for continuity.
- **Part II constellations:** Reuse the **same node components** as the scatter tiles where possible so “integration” reads visually as **the same objects, now wired** — not a new illustration style.

---

## 6. Motion and accessibility

- **Scroll-linked** motion on the stage; **prefers-reduced-motion** must collapse to fades or static states (patterns already sketched in both sticky mockups).
- **Audience / field** controls: no mandatory hover; full keyboard path; `aria-selected` / `role="tablist"` conventions per audience mockup.
- **Color:** semantic tokens only (`inverse-surface`, `foreground`, `primary`, etc.); no raw hex in production — see `docs/design/DESIGN.md`.

---

## 7. Deliverables checklist (for whoever executes this)

- [ ] One vertical script: **Acts I–V + scatter + four Part II stages + outro**, with **explicit audience branches** at Acts III–V and each Part II stage.
- [ ] **Eight** “full story” micro-narratives (4 audiences × 2 fields), each stating **integration outcomes**, not only pains.
- [ ] **Tile manifest** per audience × field (inventory from audience mockup, extended where Part II needs new nodes).
- [ ] **Stage ↔ chapter map** (reuse table in `sticky-left-fragmentation-visual-field.md`, extended for Part II beats).
- [ ] Single implementation spec: dock behavior, scroll triggers, reduced motion, mobile stack order (copy-first, inline chapter images).

---

## 8. One-paragraph brief you can paste to a designer or LLM

Combine the **scroll-driven sticky stage** and **five-act fragmentation arc** from `fragmentation-sticky-mockup(.html| -css.html)` with the **sticky four-audience dock** and **Informational / Relational field toggle** from `fragmentation-by-audience-mockup.html`. Maintain **one shared vertical spine** (intro → Acts I–V → scatter climax → Integration → Activation → Formation → Multiplication → outro). For **each** audience, swap **scatter tiles, taxes, and captions** while keeping **act titles parallel** across both fields so readers see **the same structural story** told through **informational** and **relational** surfaces. Do **not** end on fragmentation: **Part II must carry the full “what reconnection looks like”** for leaders, nonprofits, churches, and seminaries — in both intelligences — using constellation compositions that reuse the same tile language as the scatter field.

---

## 9. Next.js + React + Tailwind integration (step-by-step)

These steps assume the **movemental** repo: App Router under `src/app/(site)/`, shared nav from root `src/app/layout.tsx`, Tailwind v4 via `@theme` in `src/app/globals.css`, primitives in `src/components/primitives/`, page bodies composed from `src/components/sections/**`. Follow **`docs/build/prompts/stitch-to-react-migration.md`** wherever a Stitch screen becomes the visual source of truth; for this **HTML mockup** slice, treat the mockups as the spec **but still remap** every color to semantic tokens (DESIGN.md wins over mock CSS if they diverge).

### 9.0 Preconditions

- Dependencies already in repo: `gsap`, `@gsap/react`. Register `ScrollTrigger` only inside **client** modules.
- Images: WebPs live under **`public/images/fragmentation-story/`** — reference in React as **`/images/fragmentation-story/<file>.webp`** (use `next/image` with explicit `width` / `height` or a known aspect box).
- **Do not** paste the mockups’ `<link href="fonts.googleapis.com">` — Inter is loaded in `src/app/layout.tsx`.

### 9.1 Decide the surface (URL)

Pick **one** primary home for the full experience (avoid duplicating long scroll + GSAP on two routes).

| Option | When to use | What to add |
|--------|-------------|-------------|
| **A. Dedicated route** (recommended) | Long-form story is its own destination (shareable, SEO, no home bloat) | New route e.g. `src/app/(site)/fragmentation/page.tsx` — URL e.g. `/fragmentation` or `/how-fragmentation-happens` (choose one slug and keep it stable). |
| **B. Section on home** | Story must appear above the fold on `/` | Extract a **`FragmentationStorySection`** (or similar) from the page component tree and insert it in `src/components/sections/home/home-page-content.tsx` in the desired order. Still implement heavy logic in **subfiles** under `sections/fragmentation-story/` so `home-page-content.tsx` stays a thin list. |

Default recommendation: **Option A** + **one** deep link from home or “How it works” via `<Link>`.

### 9.2 Create the route (Option A)

1. Add **`src/app/(site)/<your-slug>/page.tsx`** — a **Server Component** that only exports `metadata` and renders one composed child, same pattern as `how-it-works/page.tsx`:

   - `export const metadata: Metadata = { title, description, … }`
   - `export default function Page() { return <FragmentationStoryPageContent />; }`

2. Implement **`FragmentationStoryPageContent`** in **`src/components/sections/fragmentation-story/fragmentation-story-page-content.tsx`** (name can vary; keep the folder **one topic per directory**).

### 9.3 Component split (Server vs client — critical)

Keep **`page.tsx` and `FragmentationStoryPageContent` without `"use client"`** if the top-level is static layout + prose. Push **`"use client"`** to the **smallest** leaves that need:

- `useState` / `useReducer` for audience + informational/relational field
- `useRef` / `useLayoutEffect` for GSAP + `ScrollTrigger`
- `useMediaQuery` or resize listeners for breakpoint-specific stage behavior
- Subscriptions to `ScrollTrigger` refresh

Suggested tree (adjust names to taste):

```text
src/components/sections/fragmentation-story/
  fragmentation-story-page-content.tsx    # server: Section, Container, static intro copy
  fragmentation-story-dock.tsx            # client: audience tabs + field toggle (sticky)
  fragmentation-story-acts.tsx             # client: left stage + right chapters + GSAP
  fragmentation-story-scatter.tsx          # client: scatter climax (if scroll-pinned)
  fragmentation-story-stages.tsx           # client: Part II constellations + optional scroll
  fragmentation-story-content.ts           # pure data: chapters, audience copy, tile defs
  fragmentation-story-tiles.tsx            # client or server: presentational tiles
```

**Rule:** One file registers GSAP plugins and creates timelines; **kill timelines in `useEffect` cleanup** on unmount and call `ScrollTrigger.getAll().forEach((t) => t.kill())` (or store refs and `.revert()`) so Fast Refresh does not leak triggers.

### 9.4 Port order (from HTML mockup → React)

Work **top to bottom** in the DOM of the combined design, not bottom-up by abstraction:

1. **Intro band** — Use `<Section variant="midnight" spacing="lg">` + `<Container>` + primitives (`Eyebrow`, `Display`, prose). No GSAP.
2. **Audience dock** — Port from `fragmentation-by-audience-mockup.html`: `position: sticky` with **`top`** set to clear the fixed site nav (site uses `pt-16` in chrome — match **`top: 4rem`** or a shared CSS variable if you introduce `--site-nav-offset` in `globals.css`). Use **`Button` variant="ghost"** or **tabs** from shadcn only if they match DESIGN.md; otherwise build minimal `<button>`s with token classes. Mirror **ARIA**: `role="tablist"` / `role="tab"` / `aria-selected`.
3. **Acts I–V** — Port grid: `lg:grid lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)]`, left column `lg:sticky lg:top-[var(--sticky-top)]`, right column stacked `<article>` chapters with stable **`id`s** for scroll targets if needed.
4. **Scatter climax** — Isolate pin/scroll logic; respect **`prefers-reduced-motion`**: skip pin or show static “climax” composition.
5. **Part II stages** — Each stage is a `<Section>` with appropriate `variant`; constellations as positioned children + optional SVG lines (same IDs for GSAP line draws if any).
6. **Outro** — Light `Section variant="section"` + CTA row using existing **`Button`** + **`Link`** from `next/link`.

### 9.5 Tailwind and tokens (no raw mockup colors in TSX)

- Replace mockup `var(--foreground)` etc. with Tailwind semantic classes: `text-foreground`, `bg-inverse-surface`, `text-muted-foreground`, `bg-section`, `shadow-ambient`, etc.
- **Sectioning:** no `border-b` between major bands — alternate **`Section` `variant`** (see `src/components/primitives/section.tsx`).
- If a mockup needs a one-off layout utility cluster, prefer **`className={cn(...)}`** on the component; avoid a second global stylesheet unless the team agrees (Tailwind v4 + `@theme` should carry almost everything).
- **Sticky top:** `--sticky-top: calc(var(--site-nav-offset, 4rem) + 0.5rem)` in `:root` or on a wrapper class only for this page if you need extra offset below `SiteNav`.

### 9.6 GSAP + ScrollTrigger

- Create **`fragmentation-story-acts.tsx`** (client) that:
  - `import gsap from "gsap"` and `import { ScrollTrigger } from "gsap/ScrollTrigger"` then `gsap.registerPlugin(ScrollTrigger)` **once** in that module scope (guard with `typeof window !== "undefined"` if you ever import from a boundary that runs on server — ideally only import this file from client components).
  - Builds a timeline per chapter using **`trigger` = each right-column `<article>`** (or a `ref` map), **`scrub`**, **`start` / `end`** mirroring the mockup.
  - On **`useLayoutEffect`**, `ScrollTrigger.refresh()` after fonts/images (optional `imagesLoaded` pattern or `onLoadingComplete` on `next/image`).
- **`@gsap/react`** `useGSAP` is optional but encouraged for cleanup.

### 9.7 Images vs CSS artifacts

- **WebP path:** `next/image` **`src="/images/fragmentation-story/..."`**.
- **CSS-only stage:** If shipping the CSS mockup fidelity, co-locate **`fragmentation-story-artifacts.module.css`** (or Tailwind-only divs) next to the client component; **do not** ship raw hex in module CSS — use `var(--foreground)` etc.

### 9.8 Metadata, layout, and anchors

- Set **`metadata.title`**, **`metadata.description`**, and optional **`metadata.openGraph`** on the **page** Server Component.
- If the dock should survive share URLs with a preselected audience, add optional **`searchParams`** on the page: e.g. `?audience=nonprofit&field=relational` and pass props into the client dock **from the server**. In this repo, App Router page props that are async (e.g. **`params: Promise<…>`**) are **`await`ed** in `page.tsx` — treat **`searchParams`** the same way if your Next version types it as a Promise (see existing dynamic routes under `src/app/(site)/` for the pattern).

### 9.9 Verify

```bash
pnpm typecheck
pnpm lint
pnpm build
```

Fix **hydration** issues by ensuring stage markup **matches** server-first output (avoid `Date.now()` in first paint; defer GSAP visibility to client-only classes if needed).

---

## 10. Linking strategy (where and how)

### 10.1 Internal navigation (`next/link`)

- Use **`import Link from "next/link"`** for every in-site CTA (outro, cross-links from “How it works,” audience pages).
- Prefer **descriptive labels** (“See the full fragmentation story”) over “Learn more.”

### 10.2 Site nav and footer (`src/components/nav/nav-links.ts`)

- Add **one** entry under the most honest IA bucket (often **“System”** or **“Evaluate”**), e.g. `{ label: "The fragmentation story", href: "/fragmentation" }` — **match the slug** you created in §9.2.
- `siteNavSections` feeds **header dropdowns** (first four groups) and **footer columns**; if a fifth group is required, either swap a group into the header cap or add only to **footer** by extending the footer's data source if the project later splits header/footer arrays.

### 10.3 Deep links from existing pages

- **`src/components/sections/home/home-page-content.tsx`** — optional `<HomeFragmentationTeaser />` server section with a single **`Link href="/fragmentation"`** (or anchor **`/fragmentation#acts`** if you publish section IDs).
- **Audience routes** already exist (`/movement-leaders`, `/nonprofits`, `/churches`); add a short **“How this shows up in your stack”** paragraph + **`Link`** to the story route with **`?audience=`** query if you implement §9.8.

### 10.4 Same-page anchors

- Put **`id="fragmentation-acts"`** (etc.) on `<Section>` or chapter wrappers for **`/fragmentation#fragmentation-acts`**. Ensure the sticky dock does not obscure scroll-margin: use **`scroll-mt-[var(--sticky-offset)]`** on headed sections.

### 10.5 sitemap / SEO (if applicable)

- If the project exposes a **sitemap** route or config, **add the new URL** so the long-form page is discoverable.

### 10.6 Relationship to Stitch

- If this experience is later **rebuilt from Stitch**, treat the React structure above as **provisional**: re-diff against the Stitch screen and **`stitch-to-react-migration.md`** token table — **keep URLs and content modules** where possible, swap markup to match Stitch output.
