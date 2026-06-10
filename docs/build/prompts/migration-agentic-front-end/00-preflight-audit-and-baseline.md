# AF-00 — Preflight audit and baseline

**Prompt ID:** AF-00  
**Target agent:** Cursor / Claude Code  
**Primary repos:** `movemental-agentic-front-end` (read) + `movemental-ai` (read)  
**Blocks:** none (run first)  
**Last updated:** 2026-06-09

---

## 1. Role and stance

You are a **migration auditor**. This session is **read-only** except for updating [`master_runner.md`](./master_runner.md) and this file's **§10 Attempt log**.

Establish a **traffic-light baseline** before any React porting. Do not implement components in this prompt.

Read first:

- [`README.md`](./README.md)
- Source: `movemental-agentic-front-end/docs/notes/intent-and-migration.md`
- Source: `movemental-agentic-front-end/MIGRATION.md`

---

## 2. Goal

Produce a dated baseline in **§10** that answers:

1. What files exist in the source repo (monolith, css, js modules, static pages)?
2. What already exists in `movemental-ai` under `src/components/agent-room/` and `src/app/agent/`?
3. Where do source screens diverge from current React screens (copy, layout, tokens)?
4. What is the closed screen set and act vocabulary?
5. Recommended order tweaks (if any) for AF-01 onward.

---

## 3. Context — load-bearing facts

### Source repo layout

```text
movemental-agentic-front-end/
  movemental-agent-ink-band.html    # SSOT monolith
  css/ink-band.css                  # All styles (~246 lines)
  index.html                        # Live agent shell
  js/
    app.js          # Input wiring + boot
    ink.js          # Voice + SVG gestures
    runner.js       # play(), run(), goHome()
    screens.js      # renderScreen()
    data/
      leaders.js    # Portrait band data
      profiles.js   # Leader profile records + HTML builders
      faq.js        # FAQ content
      map-q.js      # Reality-check questions
      scenes.js     # SCENES choreography
  pages/            # Static HTML snapshots (one doc per screen)
```

### Act vocabulary (locked contract — preserve in React)

| Act | Prototype | Intended stream event (future) |
| --- | --- | --- |
| `say` | Ink voice line | `text_delta` |
| `show` | Replace wall screen | `ui_render` |
| `gesture` | underline / circle / arrow | `ink_gesture` |
| `wait` | Pause | — |
| `suggest` | Utterance chips | — |
| `clear` | Wipe ink overlay | — |

### Closed screen set

`home` · `beat` · `readback` · `safety` · `confirm` · `path` · `founders` · `leader` · `about` · `contact` · `pricing` · `faq`

### Target repo (partial work exists)

| Path | Notes |
| --- | --- |
| `src/app/agent/page.tsx` | Route exists |
| `src/components/agent-room/*` | Oat-surface CSS module; **live stream hook** |
| `src/lib/agent-room/stream-chunk.ts` | SSE contract — **out of scope** for this pack |
| `src/app/api/agent-room/stream/route.ts` | Live proxy — **do not use** during migration |

---

## 4. Definition of Done

- [ ] Source file inventory captured (all `pages/**` listed).
- [ ] Target inventory captured (all agent-room TSX/CSS).
- [ ] Gap table: 🟢 ported / 🟡 partial / 🔴 missing per screen.
- [ ] Token/font delta noted (`ink-band.css` vs `agent-room.module.css` / `--color-oat-*`).
- [ ] `master_runner.md` AF-00 row updated; §10 appended here.

---

## 5. Audit procedure

### 5.1 Source inventory

```bash
# From movemental-agentic-front-end root
find pages -name '*.html' | sort
wc -l css/ink-band.css js/*.js js/data/*.js
head -20 movemental-agent-ink-band.html
```

List every `pages/**/*.html` path. Count leader profiles (`pages/leader/*.html`) and beats (`pages/beat/*.html`).

### 5.2 Target inventory

```bash
# From movemental-ai root
find src/components/agent-room src/lib/agent-room src/app/agent -type f | sort
pnpm typecheck
```

### 5.3 Side-by-side spot checks

Open these pairs and note visual/copy deltas:

| Screen | Source static | Target component |
| --- | --- | --- |
| Opening | `pages/home.html` | `screen/opening-hero.tsx` |
| Beat | `pages/beat/0.html` | `screen/reality-check-beat.tsx` |
| Readback | `pages/readback.html` | `screen/readback.tsx` |
| Path | `pages/path.html` | `screen/path.tsx` |
| Pricing | `pages/pricing.html` | `screen/pricing.tsx` |

### 5.4 Output format (append to §10)

1. **File counts** — source vs target.
2. **Screen parity table** — 12 screen IDs × status.
3. **Architecture recommendation** — keep/replace oat-surface vs fresh ink-band module.
4. **Blockers** — anything that prevents AF-01.

---

## 6. Skills

Optional read-only: `concept-modern-ui` (scope note: agent room ≠ marketing).

---

## §10 Attempt log

<!-- Append audit results below. Do not delete prior entries. -->

### 2026-06-09 — AF-00 baseline (read-only auditor pass)

**Repos:** source `movemental-agentic-front-end` @ working tree · target `movemental-ai` @ `main`.
**Headline:** the React `agent-room` that already exists is **not** a port of the Ink
Band prototype. It is a separate, earlier **oat-surface** build wired for **live agent
streaming** (smaller agent-tool screen set, different tokens/fonts, different copy). The
migration is therefore closer to a **fresh ink-band scoped surface** than an extend.
`pnpm typecheck` is **green (exit 0)** before any work — clean baseline.

#### 1. File counts — source vs target

**Source (`movemental-agentic-front-end`)**

| Group | Files | Notes |
| --- | --- | --- |
| Monolith SSOT | `movemental-agent-ink-band.html` | 889 lines / ~327 KB |
| CSS | `css/ink-band.css` | 245 lines |
| JS engine | `app.js` (36), `ink.js` (65), `runner.js` (18), `screens.js` (81) | acts-as-data runner + ink/gesture |
| JS data | `leaders.js` (1, minified), `profiles.js` (395), `faq.js` (104), `map-q.js` (118), `scenes.js` (170) | choreography + content |
| Static pages | **34** `pages/**/*.html` | full standalone docs via `pageDoc()` |

`pages/**` breakdown: `home`, `about`, `contact`, `pricing`, `faq`, `path`, `safety`,
`founders`, `readback`, `confirm-free`, `confirm-paid`, `beat/0–5` (**6 beats**),
`leader/0–16` (**17 leader profiles**).

**Target (`movemental-ai`)**

| Path | Files | Role |
| --- | --- | --- |
| `src/app/agent/page.tsx` | 1 | route (exists) |
| `src/app/api/agent-room/stream/route.ts` | 1 | live proxy — **deferred (AF-90), do not wire** |
| `src/components/agent-room/*` | 6 | shell, fallback, room, composer, `agent-room.module.css`, `use-agent-room-stream.ts` |
| `src/components/agent-room/screen/*` | 11 | opening-hero, reality-check-beat, readback, path, pricing, network, audience, founders, handoff-human, emphasis, screen.tsx |
| `src/lib/agent-room/*` | 3 | `stream-chunk.ts`, `component-props.ts`, `proxy-schema.ts` — **stream contract, deferred** |

#### 2. Screen parity table (12 Ink Band closed-set IDs)

🟢 ported · 🟡 partial (exists but diverges in copy/layout/data) · 🔴 missing

| # | Ink Band screen | Status | Evidence / gap |
| --- | --- | :---: | --- |
| 1 | `home` | 🟡 | `opening-hero.tsx` conflates the `opening` *scene* with the `home` *screen*. Different headline ("AI is already inside your organization…" vs source "Navigate AI without eroding the trust you spent decades earning."), no `Non-profit · Church · Institution · Leader` eyebrow tabs, only 6 initial-avatar faces vs source **18-leader portrait band** with roles + FLIP-to-profile. |
| 2 | `beat` | 🟡 | `reality-check-beat.tsx` exists but is agent-prop-driven (one question via `props`). `MAP_Q` (6 beats, 118-line data) not ported; chips vs source `.opt` buttons + dots + readback derivation. |
| 3 | `readback` | 🟡 | `readback.tsx` exists, agent-prop-driven. Source is the static 4-stage map (Safety/Sandbox/Training/Tech) with hand-font "you are here". |
| 4 | `safety` | 🔴 | No equivalent. `SAFETY_HTML` builder not ported. |
| 5 | `confirm` | 🔴 | No equivalent. Source has **two modes** (`confirm-free`, `confirm-paid`). |
| 6 | `path` | 🟡 | `path.tsx` exists but **wrong copy + wrong layout**: 2-col "lead stage + rest rows" using stage names **Sandbox/Skills/Solutions**, vs source **4 expandable drawers** Safety/Sandbox/**Training**/**Tech** with per-stage color ramp + accordion JS. Effectively near-🔴 for fidelity. |
| 7 | `founders` | 🟡 | `founders.tsx` exists; copy/structure to reconcile against `foundersHTML()`. |
| 8 | `leader` | 🔴 | No leader screen, **no 17 profiles**, no portrait→hero FLIP animation, no `getProfile()` seam (the deliberate RAG swap-point per intent doc). |
| 9 | `about` | 🔴 | No equivalent. `ABOUT_HTML` not ported. |
| 10 | `contact` | 🔴 | No equivalent. `CONTACT_HTML` + `bindContactForm()` not ported. |
| 11 | `pricing` | 🟡 | `pricing.tsx` is a **2-card** SafeGuide/SafeStart stub. Source is the full schedule (SafeGuide, SafeStart, SandboxGuide, SandboxLive, Training, Tech) + "What this pricing refuses", "If the price isn't walkable", Terms. |
| 12 | `faq` | 🔴 | No equivalent. `FAQ_HTML` (104-line data) not ported. |

**Engine layers (not screens, all 🔴 in target as ink-band):** ink voice (`inkLine`,
rAF clip-path write-on), SVG gestures (`underline` / `circle` / `arrow`), the single
acts-as-data runner (`play` / `run` / `goHome`), and `SCENES` choreography. None exist
in the oat-surface build.

**Extra React screens outside the Ink Band closed set:** `network`, `audience`,
`emphasis` (helper), `handoff-human` — these belong to the streaming/agent design and
map to `COMPONENT_IDS` in `stream-chunk.ts`. Leave intact for **AF-90**; do not port
into the ink-band set.

#### 3. Token / font delta (`ink-band.css` `:root` vs `--color-oat-*` / `--font-oat-*`)

| Concern | Ink Band source | Oat-surface target | Action for AF-02 |
| --- | --- | --- | --- |
| Display | `Playfair Display` | `--font-oat-display` (not Playfair) | introduce Playfair as scoped `--font-ink-display` |
| Hand | `Caveat` | **none** | **new** face — required for readback "you are here", inkLine |
| Mono | `IBM Plex Mono` | `--font-oat-mono` | maps |
| Body | `Inter` | `--font-oat-body` | maps |
| bg / ink / muted | `#FBFAF6` / `#1A1A1A` / `#5C5651` | `--color-oat-bg/ink/ink-muted` | close; re-scope as ink-band tokens |
| Accent blue | `#22409B` (`--ink-blue`) | `--color-oat-blue` | reconcile exact value |
| Highlight | `#EAFF3A` (`--hl-yellow`) | `--color-oat-highlight` | source is acid-yellow; verify match |
| Hero dark | `#0A0E1A` | `--color-oat-hero-dark` | maps |
| **Margin red** | `#C08A7E` (`--margin-red`) | **none** | **new** — notebook margin rule `.sheet::before` has no oat token |
| Notebook framing | `data-theme="paper"`, `.sheet` + red margin + `radial-gradient` stage bg | none | ink-band scoped surface must add these |

**Conclusion:** the oat tokens were ported from a *different* prototype
(`movemental-agentic-surface.html`); they overlap but **do not cover** the hand font,
margin-red, or the notebook framing that define the Ink Band look. AF-02 needs its own
scoped token block, not a reuse of `--color-oat-*`.

#### 4. Architecture recommendation

- **Build a fresh ink-band scoped surface**, do **not** restyle the oat-surface module
  in place. Suggest `src/components/agent-room/ink-band/` + a new
  `ink-band.module.css` (or scoped `@layer`) with the AF-02 token block.
- **Leave the streaming path untouched** per AF-90 guardrails:
  `use-agent-room-stream.ts`, `stream-chunk.ts`, `component-props.ts`,
  `proxy-schema.ts`, `api/agent-room/stream/route.ts`, and the agent-tool screens
  (`network`, `audience`, `handoff-human`, `emphasis`). The AF-01 mode flag
  (`NEXT_PUBLIC_AGENT_ROOM_MODE`, default `"stub"`) lets the ink-band stub runner and
  the oat/stream build coexist; AF-90 flips default to `"stream"`.
- **Honor the act grammar + closed screen set** exactly (`say`/`show`/`gesture`/
  `wait`/`suggest`/`clear`; 12 screens). Keep choreography as **data** (`SCENES`) and
  preserve `getProfile()` as the single per-leader content seam.

#### 5. Blockers for AF-01

- **None hard.** Baseline typecheck green; both repos readable.
- **Decisions to record in AF-01 (not blockers):** (a) coexistence strategy =
  fresh `ink-band/` subfolder + mode flag (recommended above); (b) treat `opening`
  *scene* vs `home` *screen* as distinct (AF-08); (c) `confirm` ships two modes
  (free/paid); (d) `COMPONENT_IDS` enum harmonization (`home`/`about`/`contact`/`faq`/
  `safety`/`leader` absent; `network`/`audience` extra) is **AF-90/INT-01**, not this pack.

#### 6. Recommended order tweaks

- Keep the published order. **AF-10 (leader band + 17 profiles + FLIP)** is the single
  heaviest unit — confirm it can ship as its own PR in parallel with AF-08/AF-09 once
  AF-06 (data: `leaders`/`profiles`) and AF-07 (registry) land.
- AF-06 must port **five** data modules (`leaders`, `profiles`, `faq`, `map-q`,
  `scenes`); `profiles.js` (395 lines) + `getProfile()` seam is the largest.
- AF-08 should explicitly split the `opening` choreography from the `home` render so the
  full audience-tab + portrait-band home is not lost behind the lighter opening hero.
