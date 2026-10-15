# Ink Band — Design Charter & Layer-by-Layer Design Chain

> The canonical design specification for the Movemental **agent room** ("the agent's hand").
> Transcribed from the `movemental-agentic-front-end` prototype so the design can be rebuilt
> as real, model-driven React in this repo without re-deriving it from the HTML.

**Source of truth:** `movemental-agentic-front-end` (vanilla HTML/CSS/JS) —
monolith `movemental-agent-ink-band.html`, look-and-feel in `css/ink-band.css` (245 lines),
intent in `docs/notes/intent-and-migration.md`.
**Scope:** the agent-room surface only (`/agent` in this repo). This is **not** a replacement
for [DESIGN.md](./DESIGN.md) (Concept Modern, the marketing site) — see §9 for how the two relate.
**Status:** design canon. The prototype is a front-end-only mock-up bound for agentic integration
into `movemental-ai` (UI) + `movemental-ai-agents` (engine). Changes to the prototype set the
standard this repo's implementation must honor.

---

## 1. Design charter

### The metaphor

The agent room is a **sheet of warm paper** the agent writes on by hand. Everything follows from
that: a cream page with a faint **red margin rule**, headlines set in a literary serif, the
agent's live voice rendered in **handwriting** in pen-ink blue, section labels and metadata in a
**typewriter mono**, and the agent's gestures (underline, circle, arrow) drawn as **rough ink
strokes** over the page. The product is not a chat window or a dashboard — it is a **manuscript
the org is shown back to itself**.

### Pillars

1. **Editorial, not app-like.** Generous measure, serif display, asymmetric ruled sheet. The page
   reads like a thoughtful document, not a form. When something feels crowded, add space — never
   shrink type.
2. **The hand is visible.** The agent has a literal hand: handwritten "say" lines that draw on with
   a moving nib, and ink gestures that mark the page. Motion is choreography, not decoration.
3. **One pen, one accent.** A single ink-blue (`#22409B`) carries voice, links, active state, and
   ink strokes. Red (`#C08A7E`) is reserved for the margin rule, severity ticks, and refusals.
   Highlighter-yellow (`#EAFF3A`) marks exactly one emphasised chip. Nothing else competes.
4. **Paper depth, light borders.** Depth comes from tonal stacking (`paper` on `surface` on `bg`),
   but unlike Concept Modern this system **does** use hairline `1px` borders and generous radii
   (12–20px) as part of the notebook/card vocabulary.
5. **A closed screen set.** The agent may only put a fixed set of screens on the wall (home, beat,
   readback, safety, safetyFlow, confirm, path, founders, leader, about, contact, faq, pricing). New surfaces
   are a deliberate vocabulary change, not an ad-hoc page.
6. **Restraint as honesty.** The voice is plain and direct; pricing names the honest trade-off;
   refusals are shown, not hidden. The aesthetic serves candor.

### Quality bar (a screen is "Ink Band" when…)

- It sits on the paper shell (`mast` / `screen` / `voice` / `composer`) and writes inside a `.sheet`.
- It uses the four type voices correctly: **Playfair** display for headlines, **Inter** for body,
  **Caveat** for the agent voice only, **IBM Plex Mono** for eyebrows/labels/metadata.
- Accent is ink-blue and nothing else; red and yellow stay in their reserved roles.
- Reveal motion is staggered with the house easing `cubic-bezier(.2,.7,.2,1)` and honors
  `prefers-reduced-motion`.
- It belongs to the closed screen set and degrades to a static `pages/*.html` snapshot.

### What it is **not**

- Not a chat UI, not a generic admin dashboard, not card-grid marketing.
- Not Concept Modern: it adds Playfair + Caveat + IBM Plex Mono, an ink-blue accent, visible
  hairline borders, and duotone portraiture — none of which belong on the marketing site.
- Not a real agent: the prototype's choreography is scripted data; the **design** is the deliverable.

---

## 2. The design chain

Design decisions flow **downstream**, exactly like the [type-safety chain](../architecture/TYPE_SAFETY_CHAIN.md):
each layer composes the one below it and never reaches around it. Want a new look on a page? Change a
token or compose existing primitives — never hard-code a hex or a font on a page.

```text
Layer 1  Tokens        :root custom properties — color, type, (implicit) scale/motion/radius
   │  consumed by every rule below; never bypassed with a raw hex
   ▼
Layer 2  Primitives    eyebrow · sheet h1/body/q · sec-label · chip · opt · field/send · mast/logo/crumb · mail · refuse
   │  single-purpose atoms; the smallest styled units
   ▼
Layer 3  Components     readback spine · beat progress · path drawers · ways (pricing) · faq · faces band · team · lead head · cform
   │  multi-atom patterns with their own motion + state
   ▼
Layer 4  Built layers   the agent-room shell: mast / #screen (+ ink SVG) / voice / composer · the static-page shell variant
   │  the persistent frame every screen lives inside
   ▼
Layer 5  Pages/layouts  the closed screen set — one .sheet composition per ScreenId, rendered live or as a pages/*.html snapshot
```

---

## 3. Layer 1 — Tokens (`:root`)

Every value in the system resolves to one of these. There are **no** raw hex or font-family
literals anywhere else in the stylesheet — that is the rule a port must keep.

### Color

| Token | Value | Role |
|-------|-------|------|
| `--bg` | `#FBFAF6` | App background (warmest paper); the `#screen` radial wash sits on this |
| `--surface` | `#F6F3EC` | Chrome surfaces — `voice`, `composer`, `static-foot`, photo wells |
| `--paper` | `#FFFDF7` | Raised writing surface — cards, options, fields, drawers, "you are here" |
| `--ink` | `#1A1A1A` | Primary text + the ink-pill CTA / send button (never pure black) |
| `--ink-muted` | `#5C5651` | Secondary text, metadata, body copy |
| `--border` | `#E5DFD2` | Hairline borders, rails, node rings, scrollbar |
| `--hero-dark` | `#0A0E1A` | Reserved near-black for dark hero treatments |
| `--margin-red` | `#C08A7E` | The ruled margin line, severity ticks, refusal rule (reserved) |
| `--ink-blue` | `#22409B` | **The pen.** Voice text, links, active borders, ink strokes, focus ring |
| `--hl-yellow` | `#EAFF3A` | Highlighter marker behind the single lead suggestion chip (reserved) |

### Type

| Token | Stack | Used for |
|-------|-------|----------|
| `--font-display` | `'Playfair Display', Georgia, serif` | Headlines (`h1`, `.q`, card titles, success) |
| `--font-body` | `'Inter', system-ui, sans-serif` | Body, options, drawer titles, inputs |
| `--font-hand` | `'Caveat', cursive` | **Agent voice only** (`.vline`) |
| `--font-mono` | `'IBM Plex Mono', monospace` | Eyebrows, section/band labels, metadata, prices, crumbs, footer |

Fonts load from Google Fonts in `<head>`: Playfair (400/500/600 + italics), Inter (400/500/600),
Caveat (500/600), IBM Plex Mono (400/500).

### Implicit scales (conventions baked into the rules, worth tokenizing on port)

- **Type sizing** is fluid via `clamp()`: `h1` `clamp(1.85rem,4.3vw,2.85rem)`, `.q`
  `clamp(1.5rem,3.6vw,2.05rem)`, the giant path numeral `clamp(3.4rem,11vw,5.25rem)`.
- **Eyebrow/label idiom:** mono, ~`.66–.7rem`, `letter-spacing:.13–.18em`, `text-transform:uppercase`,
  `--ink-muted`. This single recipe appears as `.eyebrow`, `.sec-label`, `.band-label`, `.rb-num`,
  `.lead-role`, `.cflabel`.
- **Radii:** `12px` (option/field/faq), `14–16px` (cards/way/path-here), `20px` (path stack card),
  `999px` (chips, field, send). Borders are always `1px solid var(--border)`, going `var(--ink)` on
  hover/active.
- **Motion:** house easing `cubic-bezier(.2,.7,.2,1)`; staggered reveals key off a `--i` index custom
  property (`calc(var(--i,0)*Nms + delay)`). See §8.
- **Measure:** body `max-width:68ch`, drawer/way copy `56–62ch`, question `40ch`, headline `22ch`.
  Sheet width `56rem` → `68rem` (≥62rem) → `76rem` (≥90rem).

---

## 4. Layer 2 — Primitives

Single-purpose atoms. Each is one styled class composing only tokens.

| Primitive | Class | What it is |
|-----------|-------|------------|
| Eyebrow | `.eyebrow` | Mono uppercase kicker above a headline |
| Section label | `.sec-label`, `.band-label` | Mono uppercase label introducing a `.sec` / `.band` |
| Display headline | `.sheet h1` | Playfair 600, fluid, tight tracking (`-.022em`) |
| Question | `.q` | Playfair 400 prompt line (the agent's posed question), `max-width:40ch` |
| Body | `.sheet .body` | Inter, `1.05rem/1.6`, `--ink-muted`; `b` lifts to `--ink` 500 |
| Suggestion chip | `.chip` | Pill, paper, mono-ish; `.chip.lead` gets the highlighter `::before` (marker filter) |
| Option | `.opt` | Reality-check answer button; `.locked` / `.chosen` states; staggered `optIn` |
| Field + send | `.field` / `.field input` / `.send` | Rounded input row; ink send button → ink-blue on hover |
| Mast / logo / crumb | `.mast` `.logo` `.crumb` | Top bar; wordmark with the `·` dot (`.d`); mono back-crumb |
| Mail link | `.mail` | Mono address with ink-blue underline |
| Refusal | `.refuse` | Red-ruled left border with a `×` mark — "what we won't do" |
| Honest note | `.honest` | Italic muted caveat (used under pricing) |
| Ink stroke | `.stroke` | SVG path: ink-blue, round caps, `filter:url(#rough)` — a drawn gesture |

---

## 5. Layer 3 — Components

Multi-atom patterns with their own structure, state, and motion. These are the reusable "figures"
the agent draws.

- **Beat progress** (`.dots` / `.beat-count` / `.beat-rail` / `.beat-fill` / `.beat-word`) — editorial
  step indicator: mono `2 / 5` count + a short ink-blue rail that grows (`beatGrow`) + an uppercase
  word. Used on the reality-check `beat` screens.
- **Readback spine** (`.readback` / `.rb-stage` / `.rb-node` / `.rb-head` / `.rb-line` / `.rb-here` /
  `.rb-sev`) — the org shown back to itself down an ordered path. A vertical gradient spine threads
  four stages; each row staggers in (`rbIn`); the "you are here" stage is elevated like a drawer
  (`.rb-here`, ink-blue node halo); severity gaps surface as 1–3 red margin ticks (`.rb-sev i`).
- **Path drawers** (`.path-stack-card` / `.path-stack` / `.path-drawer` / `-trigger` / `-num` /
  `-panel`) — Framer-style stacked expandable drawers for the four-stage path. Each `data-stage`
  (1→4) sets a tint scale via local custom props, bars darkening to ink-blue at stage 4; a giant
  Inter numeral sits behind the title; panels open with a `grid-template-rows:0fr→1fr` transition.
- **Ways / pricing** (`.ways` / `.way` / `.way.paid` / `.price`) — two paper cards (free vs paid),
  Playfair title + mono price; `.paid` carries an ink border; collapses to one column < 560px.
- **FAQ accordion** (`.faq` / `.faq-item` / `.faq-q` / `.faq-a`) — native `<details>`; `+` glyph
  rotates to `×` and goes ink-blue when `[open]`; jump links (`.faq-jump`) above.
- **Faces band** (`.band` / `.faces` / `.face` / `.ph`) — horizontal scroll-snap strip of duotone
  leader avatars (grayscale+sepia, color on hover/`.lit`); staggered `faceIn`. The home page's
  "trusted voices" proof strip.
- **Team** (`.team` / `.tm` / `.tph`) — founders rows: duotone portrait + name + mono role + line.
- **Leader head** (`.lead-head` / `.lead-hero` / `.lead-meta` / `.lead-role` / `.lead-bio`) — a
  single leader profile header: large duotone portrait + Playfair name + mono role + bio.
- **Contact form** (`.cform` / `.cfield` / `.cflabel` / `.cchip` / `.cf-submit` / `.cf-success` /
  `.cf-check`) — a real editorial form: mono labels, paper inputs with ink-blue focus ring,
  selectable `.cchip` topics, invalid-shake (`cfShake`), and an animated SVG check success state
  (`cfDraw`).
- **Layered list** (`.layers` / `.layer` / `.ln`) — mono line-number + bold term + muted gloss; the
  generic "ordered detail" list used on about/safety/leader/confirm screens.

---

## 6. Layer 4 — Built layers (the agent-room shell)

The persistent frame every screen lives inside. The body is a full-height (`100dvh`) flex column,
`overflow:hidden`, that never scrolls as a whole — only `#screen` scrolls.

```text
┌ .mast ───────────────────────────────────────────────┐  flex:0 0 auto — wordmark + crumb
├ #screen ──────────────────────────────────────────────┤  flex:1 1 auto — the page; radial paper wash
│    .sheet   (ruled writing surface, red margin ::before)│  max 56→76rem, centered
│    <svg #ink> (rough + marker filters; .stroke gestures)│  absolute overlay, pointer-events:none
├ .voice ───────────────────────────────────────────────┤  flex:0 0 auto — handwritten agent line(s)
│    .vline (Caveat, ink-blue) · .vspan (clip-path reveal)│  .nib pen rides the stroke
├ .composer ────────────────────────────────────────────┤  flex:0 0 auto
│    .sugg (suggestion chips) · .line(.field + .send)     │
│    .legend (replay)                                     │
└───────────────────────────────────────────────────────┘
```

- **`#screen`** carries a radial wash (`radial-gradient(120% 80% at 50% 0%, #FFFEFA, var(--bg))`),
  centers the sheet, and toggles `.scroll` for long screens (live agent screens center vertically
  when short).
- **`.sheet`** is the writing surface: a left red **margin rule** (`::before`, `--margin-red` at
  .32 opacity) and a `1.6rem` left indent. The `.home` variant drops the rule and centers the stack.
- **`#ink`** is the gesture overlay — two SVG filters: `#rough` (fractal-noise displacement → drawn
  line wobble) for `.stroke` gestures, and `#marker` for the highlighter chip. Pen movement is the
  `.nib` atom.
- **`.voice`** renders the agent's "say" acts as handwriting; old lines fade (`.vline.old`).
- **`.composer`** is the input surface: suggestion `.chip`s (one may be `.chip.lead` with the
  highlighter), the rounded `.field` + ink `.send`, and a mono `replay`.

### Static-page shell variant

Each `pages/*.html` is a **standalone** document that reuses the same shell **minus the agent
voice/composer**, swapping in a footer: `body.static-page` → `.mast` → `#screen.scroll` →
`.sheet.settle` → `.static-foot`. This is the "read-only snapshot" of a screen and the natural
shape for an SSR/route version in this repo.

---

## 7. Layer 5 — Pages / layouts (the closed screen set)

Every screen is one `.sheet` composition. The `.sheet` takes optional variant/utility classes
(`.home`, `.settle`) and then composes Layer-2/3 figures. The set is **closed**: these ScreenIds
are the agent's entire UI vocabulary.

| ScreenId | `.sheet` composition (top-level figures) | Notes |
|----------|------------------------------------------|-------|
| `home` | `.sheet.home`: eyebrow → h1 → body → `.band/.faces` | Centered hero + trusted-voices face band |
| `beat` (0–5) | `.dots` (beat progress) → `.q` → `.opts/.opt` | The reality-check Q&A flow |
| `readback` | `.q` → `.readback` spine | The org reflected down the ordered path |
| `path` | eyebrow → `.q` → `.path-stack-card/.path-drawer×4` | Stacked stage drawers |
| `pricing` | `.sec/.sec-label` → `.ways/.way` (free, paid) → `.honest` | Two honest options |
| `safety` | eyebrow → body → `.sec` → `.layers` → `.refuse` | What it will / won't do |
| `confirm` (free/paid) | eyebrow → body → `.sec/.layers` → `.mail` | Post-choice confirmation |
| `leader` (0–16) | `.lead-head` → `.lead-bio` → `.sec/.layers` | One per movement leader |
| `founders` | eyebrow → `.q` → body → `.team/.tm` | The people behind it |
| `about` | eyebrow → `.q` → body → `.sec/.layers` | Narrative |
| `contact` | eyebrow → `.q` → body → `.cform` (+ `.cf-success`) | Real form |
| `faq` | eyebrow → `.q` → `.faq-jump` → `.faq/.faq-item` | Accordion |
| `capture` | eyebrow → `.q` → `.cform` (+ variant: map / paid / free / discuss) | Lead forms; composer hidden during `await:capture` |
| `safetyFlow` | `.flow-stepper` → step panels (question → fork → charter → diy/signup → result) | Primary Safety on-ramp wizard; in-screen `.opt` on question step |
| `sandbox` | eyebrow → `.q` → `.sec/.layers` | Path stage 02 detail |
| `training` | eyebrow → `.q` → `.sec/.layers` | Path stage 03 detail |
| `technology` | eyebrow → `.q` → `.sec/.layers` | Path stage 04 detail |
| `safetyDashboard` | legacy paid funnel stub | Superseded by `safetyFlow` signup + `/enroll`; retained for parity |

**Discuss exception (2026-06-30):** In Discuss phase, expanded dock may hide the sheet below mast (Model C overlay). Guide phase keeps manuscript-first layout. See [agent-room-discuss-layout-decision.md](../build/notes/agent-room-discuss-layout-decision.md).

Common page furniture: a `.crumb` (mono back link, top-right) on every non-home screen; the
`.settle` reveal on load; the `.static-foot` on snapshot pages.

The closed set maps 1:1 to the integration's `ScreenId` contract — see
[INT-01](../build/prompts/integration-agent-backend/01-harmonize-component-ids.md) for the
engine `ComponentId` ↔ Ink Band `ScreenId` reconciliation that lets the live agent drive these.

---

## 8. Motion language

Motion is part of the charter, not polish. The rules:

- **House easing:** `cubic-bezier(.2,.7,.2,1)` for nearly every transition and keyframe.
- **Staggered entrance:** lists reveal item-by-item via a `--i` index —
  `animation-delay:calc(var(--i,0)*Nms + delay)`. Steppings: options `70ms`, readback `95ms`,
  faces `32ms`.
- **Named keyframes:** `optIn`, `rbIn`, `faceIn`, `settle`, `fadein` (rise + fade); `beatGrow`
  (rail fill); `cfDraw` (SVG check draw); `cfShake` (invalid field).
- **The hand:** the agent voice draws on with a `clip-path:inset(0 100% 0 0)→0` reveal under a
  moving `.nib`; gestures are SVG `.stroke`s through the `#rough` filter.
- **Reduced motion:** `@media(prefers-reduced-motion:reduce)` disables the clip reveal, hides the
  nib, and turns off `opt`/`rb-stage`/`face`/`beat-fill`/form animations. **A port must keep this.**

---

## 9. Porting into `movemental-ai` (how to rebuild it here)

The agent room in this repo (`/agent`, `src/components/agent-room/`, `src/lib/agent-room/`) is the
target. Guidance for the React rebuild:

1. **Tokens first.** Ink Band tokens live in `globals.css` (`.ink-band-surface`) and
   `ink-band.module.css`. Shadcn utility pages map `:root` to the same ramp. No raw hex in components.
2. **Agent-only repo (2026-06).** `movemental-ai` ships `/agent`, `/agent-runtime`, and auth only.
   Concept Modern ([DESIGN.md](./DESIGN.md)) is archived reference for a future marketing merge —
   do not reintroduce a second live token system here.
3. **Compose down the chain.** Build Layer 2 primitives as components, Layer 3 figures from those,
   the Layer 4 shell once, then render Layer 5 screens by composition. Mirror the closed screen set
   as the agent's render surface.
4. **Preserve the act grammar.** The prototype's acts (`say`→`text_delta`, `show`→`ui_render`,
   `gesture`→`ink_gesture`, `suggest`→chips) map onto the streaming agent protocol; the scripted
   `SCENES`/stub `getProfile()` become live agent output + a retrieval call. Replace the **data**,
   keep the **structure** and the screen vocabulary. (`docs/notes/intent-and-migration.md` in the
   prototype, and the INT-0x prompts in `docs/build/prompts/integration-agent-backend/`.)
5. **Keep reduced-motion and the duotone portrait treatment** — both are load-bearing for the feel.

---

## 10. Provenance & change control

- **SSOT is the prototype monolith** `movemental-agent-ink-band.html`; `css/`, `js/`, `pages/` are
  generated by `scripts/split-ink-band.mjs` and must not be hand-edited there.
- **This document** is the transcription used to rebuild the design in `movemental-ai`. When the
  prototype's design changes, update the prototype, then update this doc, then the React
  implementation — downstream, never the reverse.
- Related: [DESIGN.md](./DESIGN.md) (Concept Modern, marketing), the agent-room integration prompts
  in [docs/build/prompts/integration-agent-backend/](../build/prompts/integration-agent-backend/),
  and the [type-safety chain](../architecture/TYPE_SAFETY_CHAIN.md) (the data-side companion to this
  design-side chain).
