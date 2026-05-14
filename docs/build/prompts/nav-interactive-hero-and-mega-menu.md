# Prompt: Five interactive nav + hero concept directions for movemental.com

**Surface:** Public marketing site — top of `/` (home).
**Scope:** Upgrade the **site header** (Movemental Path + Audiences dropdowns) and the **home hero section**.
**Copy:** **Locked.** Do not change any displayed strings.
**Where to build:** [docs/html/nav-interactive](docs/html/nav-interactive) — static HTML/CSS/JS mockups, one file per direction.
**Last updated:** 2026-05-14

---

## 1. What we have today

### 1.1 Header (current, see [src/components/nav/site-header.tsx](src/components/nav/site-header.tsx))

- **Movemental Path** — text-only dropdown listing four stages:
  1. **01. Safety** — *AI use & trust charters*
  2. **02. Sandbox** — *Safe exploration · Tested use cases · Real work*
  3. **03. Skills** — *Cohorts & self-paced training*
  4. **04. Solutions** — *Custom agentic CMS/LMS builds*
- **Audiences** — text-only dropdown: For Churches · For Nonprofits · For Institutions.
- **About**, **Contact** — flat links.
- Right rail: small "FIELD GUIDE" download, theme toggle, **Start a Conversation** pill CTA.
- Current "active" pathway stage = **Safety**.

### 1.2 Hero (current, see [src/components/sections/home/home-hero.tsx](src/components/sections/home/home-hero.tsx) and [src/components/sections/home/home-data.ts](src/components/sections/home/home-data.ts))

Two-column layout:

- **Left column:**
  - **Display:** *"Your intelligence is fragmented. That's why it doesn't compound, form people, or scale."*
  - **Supporting paragraph:** *"Movemental helps churches, nonprofits, and institutions compose scattered corpus and relationships into one navigable system—so the same intelligence can compound in public, in rooms, and in the tools people already use. What follows compresses the argument; the canonical walkthrough is one click away."*
  - **CTAs:** `See how it works` (primary, links to `#system`) and `View the full story` (outline, links to `/fragmentation`).
- **Right column:** `HomeHeroTabbedAudiences` — tabbed iframe previews of audience pages.

### 1.3 The two real problems

1. **Path dropdown is invisible as a journey.** Four bullet items hide the fact that this is an *ordered six-stage system*, with **Safety** currently the active stage and three more downstream products on the same spine. Visitors need to *feel* "we are here, more is coming, this is a path."
2. **Audiences dropdown is generic.** Three identical text links can't carry the fact that churches, nonprofits, and institutions are **the same system in different contexts** — a key narrative beat repeated across the site. The nav should signal "applications, not separate products" without saying it.

The hero copy works. The hero **frame** doesn't — it's a tabbed iframe gadget that doesn't telegraph the fragmentation→integration arc the rest of the page rewards.

---

## 2. Design boundaries (non-negotiable)

These come from [docs/design/DESIGN.md](docs/design/DESIGN.md) — "The Digital Curator" — and the production [globals.css](src/app/globals.css) tokens. Static mockups must mirror them or they will not translate cleanly to React later.

| Token / rule | Value | Use |
|---|---|---|
| `--background` (paper) | `#faf6ee` | Default page surface. |
| `--foreground` (ink) | `#19150f` | All body / display text. |
| `--section` (alt band) | `#f2ece0` | Stacked surface for tonal depth. |
| `--card` | `#ffffff` | Elevated card surface. |
| `--inverse-surface` (Midnight) | `#141110` | Regional dark bands only. |
| `--inverse-foreground` | `#f4efe5` | Text on Midnight. |
| `--primary` | `#19150f` (ink) | CTA fill — **not a blue**. |
| `--border` | `#e6ddcb` | Hairlines only. |
| `--pathway-accent` | `#b8893a` | Burnished editorial accent (numerals, active rule). |
| `--audience-ring-churches` | `#0053db` | Audience-only accent ring. |
| `--audience-ring-nonprofits` | `#b8893a` | Audience-only accent ring. |
| `--audience-ring-institutions` | `#6b7e3f` | Audience-only accent ring. |
| `--font-sans` | Inter | All UI + body. |
| `--font-serif` | Newsreader / Instrument Serif | **Italic emphasis only** inside display lines. |
| Tracking | `--tracking-display: -0.022em`, `--tracking-eyebrow: 0.09em` | Display tight; labels wide. |

**Hard rules:**

- **No raw hex** in markup for layout color — use the CSS variables above (mirrored at the top of each mock).
- **No 1px solid border boxes** for sectioning. Depth comes from `--card` on `--section`.
- **No drop shadows** except `--shadow-ambient` on a true dialog or floating mega-menu.
- **Pure black is forbidden** — `#19150f` is the darkest ink.
- **One blue, no rainbow.** `#0053db` appears only as the *churches* audience ring; never as background or paragraph emphasis.
- **Italics carry emphasis in display lines** via `<em>` rendered in the serif. Do not bold display copy.
- **Six-stage system** is the canonical mental model — even if the nav only exposes the first four products today, treat them as part of the larger arc when illustrating "you are here."

---

## 3. Five design directions

Each direction makes a different bet about *how* a high-end editorial site can teach its own structure inside its chrome. They are not "five variants of the same idea" — they argue.

### Direction A — **Atlas Stages** (canonical-confident)

**Bet:** the safest, most professional reading of the brief. A full-width mega-menu opens on hover with a **horizontal four-stage stepper**: numbered cards in order, hairline rule connecting them, an explicit "You are here" pin on **Safety**, and a one-line next-step description under each. Audiences become **three large cards** with category eyebrow, single-line value prop, and an icon glyph keyed to the audience ring color.

**Hero pairing:** keep the editorial two-column layout but replace the iframe gadget with a **calm "system spine"** — a small horizontal six-dot diagram (the six stages from `home-data.ts`) that ties the hero directly into §5 of the page. Stage 01 highlighted; the other five named below in microcopy.

**Risk:** competent but expected. The win is *legibility*, not surprise.

---

### Direction B — **Trail Map** (cartographic narrative)

**Bet:** the path is literally a map. Mega-menu renders a **hand-drawn SVG trail** that arcs across the dropdown, with the four stages as labeled stops (waypoint pins). The trail is dashed where you haven't been, solid where you are. Audiences appear as **three terrain tiles** beneath the trail — each one tinted with its audience ring color and labeled like a region ("Churches · formation country", "Nonprofits · mission territory", "Institutions · long-arc terrain").

**Hero pairing:** the headline sits on the left; the right column becomes a **larger, faded trail-map illustration** that lines up with the mega-menu's mini-map. Scroll-trigger pulls a "you are here" pin onto Safety. Telegraphs *journey* before any product names appear.

**Risk:** cute. Must avoid feeling whimsical — the line work has to be confident, single-weight, the same hairline as the rest of the site.

---

### Direction C — **Compass** (split-pane preview)

**Bet:** the dropdown is a working surface, not a menu. Mega-menu opens as a **two-column panel**: left column lists the four stages as compact numbered tiles (vertical stack); right column is a **live preview region** that swaps on hover — title, two-sentence description, a screenshot/illustration thumbnail, and a "Read the stage →" link. The audiences submenu uses the same split: three vertical tiles on the left, a preview pane on the right that shows the audience's hero illustration.

**Hero pairing:** the hero borrows the same split-pane logic. Left = locked display + paragraph + CTAs. Right = an interactive **stage carousel** that lets the visitor tab through Safety→Sandbox→Skills→Solutions and watch the right pane swap, foreshadowing the deeper §5 system band.

**Risk:** more code surface, requires real hover/focus state choreography. Highest payoff for a *show, don't tell* product story.

---

### Direction D — **Editorial Index** (book-of-the-site)

**Bet:** lean all the way into "high-end editorial." The mega-menu reads like the front-matter of a thoughtful book — eyebrow text "**The Movemental Path**," then a **chapter-list** with serif italic numerals (`I · II · III · IV`), each line a stage with a one-sentence subtitle, and a hairline rule between them. Safety is marked "**you are reading**" in burnished `--pathway-accent`. Audiences mirror as a "**Applications**" list with the same chapter typography.

**Hero pairing:** the hero becomes a single full-width column with a **pull-quote**–styled display (italic emphasis on "fragmented" via `<em>` in serif), the supporting paragraph below, and a thin "you are at the beginning" reading-progress hairline beneath the CTAs. Right column is removed entirely; the page breathes.

**Risk:** loses the imagery anchor of the current tabbed iframe. Compensates by making the page feel like a *publication*, not a SaaS landing page.

---

### Direction E — **Living System** (diagrammatic chrome)

**Bet:** the chrome *is* the system map. The mega-menu opens into a **mini interactive diagram**: the six-stage spine from `home-data.ts` rendered as connected nodes (the four products live on stages 02–06; Safety sits at the front). Hovering a node highlights the matching label and shows a small caption. Audiences appear as **three branches** off the spine, each tinted with its audience ring color, with labels like "Churches sit here," "Nonprofits sit here," "Institutions sit here."

**Hero pairing:** the hero right column becomes a **larger version of the same diagram** — nodes pulse subtly, edges draw in on load, and Safety is the only filled node. Replaces the iframe entirely. The visitor sees the actual product architecture before they read a single product name.

**Risk:** ambitious — must avoid looking like a generic "AI network graph" cliché. The motion has to be earned (slow draw-in, no perpetual motion), and the diagram has to render on mobile gracefully.

---

## 4. The five-file build prompt (paste-able)

> **Task.** Build five standalone HTML/CSS/JS mockups in [docs/html/nav-interactive/](docs/html/nav-interactive/). One file per direction in §3 above. Each file is self-contained (inline `<style>` and `<script>`, no build step, opens directly in a browser).
>
> **Copy lock.** Do not change the headline, the supporting paragraph, the CTA labels, the path-stage names, the path-stage one-liners, the audience labels, or any other on-page string from §1. The whole brief is **design over copy**.
>
> **Token discipline.** Mirror the CSS variables in §2 at `:root` in every file (light) and at `.dark` (optional, you don't need a working theme toggle — just don't poison the values). All color references go through `var(--…)`. No inline hex except inside the `:root` declarations.
>
> **Header (every file).** Sticky top, Movemental wordmark on the left (use the public Supabase logo URLs from `site-header.tsx`), three primary nav targets (Movemental Path, Audiences, About, Contact), Field Guide micro-link, theme toggle glyph (non-functional is fine), Start a Conversation pill CTA. The Path and Audiences dropdowns are where the direction's signature appears — the rest of the header is shared chrome.
>
> **Hero (every file).** Render the locked display headline and locked supporting paragraph from §1.2. CTAs unchanged. The right side / layout treatment varies per direction.
>
> **Active state.** Path stage 01 (**Safety**) must read as the active stage in every mockup — explicit visual cue, not just bold text.
>
> **Accessibility floor.** Keyboard-openable dropdowns (focus shows them, tab moves through items, Esc closes), visible focus rings on interactive elements, `aria-haspopup` on dropdown triggers, prefers-reduced-motion respected.
>
> **Don'ts.** No backend, no fetches, no external JS frameworks. No `bg-white` / `text-gray-500` / `border-zinc-200`-style raw utilities — these are static HTML, not Tailwind. No drop shadows except the canonical `--shadow-ambient` on a *floating* surface. No emojis. No screenshots-with-rounded-shadow stock illustrations.
>
> **Output one file each:**
> 1. `01-atlas-stages.html`
> 2. `02-trail-map.html`
> 3. `03-compass.html`
> 4. `04-editorial-index.html`
> 5. `05-living-system.html`
>
> **Definition of done.** Each file opens in a fresh browser tab and (a) renders the header with the direction's mega-menu working on hover/focus, (b) renders the hero with the direction's layout, (c) reads as a sibling of the production site (same fonts, same paper, same ink, same primary), (d) loads without console errors, (e) prefers-reduced-motion shortens or removes any animation.

---

## 5. How we'll decide

We will not pick one; we will mix. Each direction is engineered to **isolate one variable**:

- **A** isolates *legibility* — does an explicit stepper make the path readable in two seconds?
- **B** isolates *narrative* — does mapping the path as terrain make the journey feel intuitive?
- **C** isolates *previewability* — does the dropdown earning its space (showing the next view) outperform a clean text list?
- **D** isolates *brand register* — does an editorial book-of-the-site posture sell the high end better than UI cleverness?
- **E** isolates *system fidelity* — does the chrome teaching the architecture beat a hero gadget that doesn't?

The shipped React version will likely take **C's preview discipline**, **D's typographic restraint**, and **E's diagrammatic anchor** — but only if these five make the tradeoffs obvious side-by-side.
