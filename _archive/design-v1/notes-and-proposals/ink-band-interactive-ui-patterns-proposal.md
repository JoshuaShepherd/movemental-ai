# Ink Band — interactive UI pattern proposals

**Path:** `docs/build/notes/ink-band-interactive-ui-patterns-proposal.md`  
**Created:** 2026-06-10  
**Trigger:** Reference UI (Framer-style process accordion, split-screen role picker, step spine, rounded-card carousel) evaluated against live agent-room and utility surfaces.  
**Scope:** UI-only layer — no schema, service, route, or agent-engine changes unless noted as out-of-band.

**Design canon:** [INK_BAND_DESIGN_CHAIN.md](../../design/INK_BAND_DESIGN_CHAIN.md)  
**Related:** [agent-room-suggestion-pills-inventory-and-recommendations.md](./agent-room-suggestion-pills-inventory-and-recommendations.md), [single-surface-url-architecture-seo-and-analytics.md](./single-surface-url-architecture-seo-and-analytics.md)

---

## 1. Reference patterns (what the screenshots show)

Four distinct interaction models appear in the reference set. None should be copied literally — each maps to an Ink Band primitive with token and motion constraints.

| # | Pattern | Reference behavior | Ink Band translation |
|---|---------|-------------------|----------------------|
| **A** | **Ghost-number step spine** | Large faint `01`, title below, thin vertical rule on the left | Mono step index + Playfair title + `--color-ink-band-blue` spine (not green accent) |
| **B** | **Split-screen role picker** | Top color band + large display heading; side list selects active role; heading updates | Paper/surface tonal split + audience labels in mono; ink-blue active state |
| **C** | **Horizontal process accordion** | Three equal columns; one expands with accent bar, body, media, tag row | Path/pricing stages as columns on `md+`; vertical drawer stack on narrow viewports |
| **D** | **Rounded-card carousel** | Square cards with ~16px radius; prev/next circles; scroll pill indicator | Leader/proof band: card wells on `--paper`, hairline borders, carousel nav from existing `.carouselBtn` |

**Non-goals for every proposal below:**

- No new hex colors — green accent from reference becomes `--color-ink-band-blue` active rail.
- No Concept Modern tokens (`cream`, `midnight`, `oat-*`) on agent-room sheets.
- No new closed `ScreenId` values without product sign-off (§5 of design charter).
- Motion uses house easing `cubic-bezier(.2,.7,.2,1)` and honors `prefers-reduced-motion`.

---

## 2. Where these patterns earn their place

Priority reflects visitor impact and how much the current UI under-serves the content.

| Priority | App surface | Route / component | Pattern | Rationale |
|----------|-------------|-------------------|---------|-----------|
| **P0** | The path (four stages) | `path-screen.tsx` | **C** horizontal accordion | Highest-information screen after readback; vertical drawers work but hide comparative structure |
| **P0** | Leader proof band | `leader-band.tsx` · `home-screen.tsx` | **D** card carousel | 17 faces need browse affordance; round avatars + one-at-a-time scroll under-sell network depth |
| **P1** | Reality readback | `readback-screen.tsx` · stream `readback.tsx` | **A** ghost-number spine | Stub readback already has a spine; refocus active stage with large index + ink rail |
| **P1** | Pricing by stage | `pricing-screen.tsx` | **C** accordion columns | Four stage groups (Safety, Sandbox, Training, Tech) mirror path vocabulary — horizontal scan aids comparison |
| **P1** | Audience fit | `audience.tsx` · assess entry | **B** split role picker | Three org types (church, nonprofit, institution) are mutually exclusive lenses — side picker is faster than prose block |
| **P2** | Beat progress | `beat-screen.tsx` · `reality-check-beat.tsx` | **A** ghost number | Current mono count + rail is close; large ghost `01` improves scan during six-question flow |
| **P2** | AI Reality dashboard path | `ai-reality/dashboard.tsx` | **C** + **A** | Authenticated share surface; ordered path + scores benefit from expandable stage column |
| **P2** | Utility multi-step flows | `/assess`, `/enroll`, `/field-guide` | **A** step spine | Shadcn utility shell today; step indicator unifies with agent-room vocabulary |
| **P3** | Founders / team | `founders-screen.tsx` | **D** compact carousel | Three founders — low urgency; optional polish |
| **P3** | Program workspace (future) | `/program`, onboarding steps | **C** | When Safety/Sandbox workspaces return, phase accordion is the natural shell |
| **Defer** | Opening hero | `opening-hero.tsx` | — | Already strong editorial stagger; split-screen would fight the manuscript metaphor |
| **Defer** | Composer / pills | `composer.tsx` | — | Chip row is intentionally flat; reference patterns add chrome without improving conversion |

---

## 3. Proposals (UI-only, Ink Band–adapted)

Each subsection: **fit**, **adaptation rules**, **files**, and a **copy-paste implementation prompt** for a UI pass.

---

### 3.1 P0 — Path screen → horizontal process accordion

**Current:** Vertical stack of four `.pathDrawer` articles; one open at a time (`path-screen.tsx`, styles in `ink-band.module.css` § `.pathStack`).

**Why upgrade:** Visitors comparing Safety → Sandbox → Training → Tech need to see all four titles at once. The reference accordion keeps collapsed columns visible while one column carries detail, media, and tag row — matching how leaders explain the path in conversation.

**Ink Band adaptation:**

| Reference | Ink Band |
|-----------|----------|
| Green left accent bar | `2px` `--color-ink-band-blue` rail on active column |
| Step `01` / `02` | `.pathDrawerNum` — mono, muted, scales up in active column |
| Body + image + tags | Keep stage-colored panel ramps (`data-stage="1"…"4"`) — already in CSS |
| Mobile | Below `768px`, fall back to existing vertical drawer stack (no horizontal squeeze) |

**Files (UI only):**

- `src/components/agent-room/screen/stub/path-screen.tsx`
- `src/components/agent-room/ink-band.module.css` — add `.pathColumns`, `.pathColumn`, `.pathColumnActive`, `.pathColumnRail`
- Optional shared primitive: `src/components/agent-room/screen/process-accordion.tsx` (presentational; no data layer)

**Implementation prompt:**

```text
Implement a responsive horizontal process accordion for the Path screen, Ink Band only.

Context:
- Read docs/design/INK_BAND_DESIGN_CHAIN.md and existing path-screen.tsx + .pathStack styles.
- Keep STAGES data and accordion behavior (one open; click open column to collapse).
- Desktop (md+): three-or-four-column grid with hairline vertical dividers (--color-ink-band-border).
  Active column gets a left ink-blue rail, bold Playfair title, expanded panel (lead + detail + tag row
  from existing copy). Inactive columns show ghost number + title only.
- Mobile: preserve current vertical .pathDrawer stack unchanged.
- Motion: column width transition 0.45s cubic-bezier(.2,.7,.2,1); honor prefers-reduced-motion.
- Do not add routes, change scene runner, or touch lib/agent-room/data.
- Validate: path screen in stub mode at /agent; no TypeScript errors; no raw hex outside tokens.

Deliverables:
1. process-accordion.tsx OR inline refactor in path-screen.tsx
2. CSS module additions only in ink-band.module.css
3. Brief comment in path-screen.tsx linking to this doc section
```

---

### 3.2 P0 — Leader band → rounded-card proof carousel

**Current:** `LeaderBand` — round portraits, one-step horizontal scroll, prev/next (`.band`, `.carouselShell` in `leader-band.tsx`).

**Why upgrade:** Reference carousel shows multiple proof cards peeking at once, with clear forward affordance. For 17 trusted voices, showing 2–3 card faces at a `md` breakpoint communicates “network” better than a single round avatar.

**Ink Band adaptation:**

| Reference | Ink Band |
|-----------|----------|
| Square photo cards | Rounded rect (`border-radius: 16px`) on `--color-ink-band-paper`, `1px` `--color-ink-band-border` |
| Duotone / grayscale | Keep existing grayscale → color on hover/focus; duotone optional via CSS filter, not new assets |
| Black circle nav | `.carouselBtn` — ink pill on active, muted border on disabled |
| Scroll pill | Centered `4px` height pill; fill width = `index / maxIndex` |

**Files:**

- `src/components/agent-room/screen/stub/leader-band.tsx`
- `src/components/agent-room/ink-band.module.css` — extend `.band`, `.carouselViewport`, add `.leaderCard`
- Preserve `id="ph-{i}"` and `setPendingFlip` for leader FLIP (`leader-flip.ts`)

**Implementation prompt:**

```text
Upgrade LeaderBand to a rounded-card proof carousel (Ink Band), UI only.

Requirements:
- Show 1 card on xs, 2 on sm, 3 on md+ within the sheet measure; partial peek of next card.
- Card: portrait (existing LEADERS img), name (Inter semibold), cred line (mono, muted).
- Keep shuffle-on-mount order, prev/next, ResizeObserver measure logic, and FLIP hooks (ph-{i}).
- Nav buttons: reuse .carouselBtn patterns; disabled at ends.
- Add scroll progress pill below track (aria-hidden decorative; announce slide N of M on buttons).
- Reduced motion: instant scroll, no transform animation.
- Do not switch to next/image; keep img for FLIP compatibility per file comment.

Test: home screen stub, tap portrait → leader screen FLIP still works.
```

---

### 3.3 P1 — Readback → focused ghost-number stage spine

**Current:** `.readback` vertical spine with `.rbStage` rows, `you are here` tag, severity ticks (`readback-screen.tsx`).

**Why upgrade:** Reference ghost-number pattern makes the active stage unmistakable during the post-diagnostic moment — the highest-stakes read in the funnel.

**Ink Band adaptation:**

- Active row: large mono ghost number (`font-size: clamp(2.5rem, 8vw, 3.5rem)`, `opacity: 0.12`) behind or beside `01`
- Spine: margin-red tick only for severity; blue gradient spine stays
- Optional: tap row to expand gap detail (UI-only; stub data already on row)

**Files:**

- `src/components/agent-room/screen/stub/readback-screen.tsx`
- `src/components/agent-room/screen/readback.tsx` (stream variant — match visual language)
- `ink-band.module.css` — `.rbGhostNum`, `.rbStage.isFocused`

**Implementation prompt:**

```text
Enhance readback stage rows with ghost-number focus styling (Ink Band).

- Add .rbGhostNum for large faint step index on the row matching mapRead "here" stage (or first gap stage).
- Active row: rbHere + stronger ink-blue node ring; inactive rows slightly reduced opacity.
- Stream readback.tsx: apply same visual tokens to stage list if present — props unchanged.
- Stagger animation: keep --i delay; reduced-motion disables stagger.
- No changes to map-q scoring, mapRead computation, or stream props schema.
```

---

### 3.4 P1 — Pricing → stage accordion columns

**Current:** Vertical `.sec` blocks per stage with `.ways` cards (`pricing-screen.tsx`).

**Why upgrade:** Pricing mirrors the four path stages. Horizontal accordion lets visitors compare SafeGuide vs SafeStart side-by-side within the Safety column before advancing — same mental model as path.

**Ink Band adaptation:**

- Column headers: mono stage label (`.secLabel` voice)
- Active column shows both `Way` cards + refusal block only in “What this pricing refuses” footer section (keep full list below all columns, not duplicated)
- Paid ways keep existing `.way.paid` border treatment

**Files:**

- `src/components/agent-room/screen/stub/pricing-screen.tsx`
- Reuse `process-accordion.tsx` if built in §3.1
- `ink-band.module.css` — pricing-specific column min-width

**Implementation prompt:**

```text
Refactor pricing-screen.tsx to use the shared process accordion (§3.1) with four columns:
Safety, Sandbox, Training & Tech, and a fourth "Refusals" or keep refusals as full-width footer.

- Each of first three columns contains that section's .ways grid (stacked cards, not side-by-side ways).
- Default open column: Safety.
- Mobile: stack as vertical sections (current layout).
- Copy remains byte-identical to prototype; no pricing logic changes.
```

---

### 3.5 P1 — Audience → split-screen role picker

**Current:** Static prose listing churches / nonprofits / seminaries (`audience.tsx`).

**Why upgrade:** Reference split-screen makes org type a **selection** rather than a paragraph — useful before beat intro and on `/assess` org-type field.

**Ink Band adaptation:**

| Reference | Ink Band |
|-----------|----------|
| Pink / yellow bands | `--color-ink-band-surface` top, `--color-ink-band-paper` bottom — no pastel marketing colors |
| Side list roles | Right rail on `md+`: three options in Inter; active = ink-blue left rule + semibold |
| Large heading | Playfair display: dynamic per selection (e.g. “For churches”) |

**Files:**

- `src/components/agent-room/screen/audience.tsx` — add client boundary for selection state
- New: `src/components/agent-room/screen/audience-picker.tsx` (presentational)
- Optional reuse on `src/app/assess/page.tsx` wrapper (visual only; form state separate)

**Implementation prompt:**

```text
Build AudiencePicker (Ink Band) and wire into audience.tsx.

- State: 'church' | 'nonprofit' | 'institution' (default church).
- Layout md+: 55/45 split — left: Playfair headline + 2-sentence body for active type; right: vertical option list.
- Layout sm: stacked — options as horizontal chips above body (existing .chip patterns).
- Copy: pull from current audience.tsx lines; seminaries roll into 'institution'.
- onSelect optional callback for future agent context — default noop.
- Screen stays in closed ScreenId set; no new scenes.ts entries required for static demo.
```

---

### 3.6 P2 — Beat progress → ghost-number header

**Current:** `.beatCount` + `.beatRail` + `.beatWord` (`beat-screen.tsx`).

**Why upgrade:** Low-effort alignment with readback/path numbering during the six-question reality check.

**Ink Band adaptation:**

- Replace or supplement count with ghost `pad2(qi+1)` behind question
- Rail remains; `--color-ink-band-blue` fill width unchanged

**Files:**

- `src/components/agent-room/screen/stub/beat-screen.tsx`
- `src/components/agent-room/screen/reality-check-beat.tsx`
- `ink-band.module.css` — `.beatGhost`

**Implementation prompt:**

```text
Add ghost-number beat header to stub and stream beat components.

- Display large faint question index behind or above .q; keep beatRail progress.
- Stream variant: read progress.step from props as today.
- Do not alter MAP_Q, onBeatAnswer, or gesture targets (#opts, data-oi).
```

---

### 3.7 P2 — AI Reality dashboard → path accordion (utility shell)

**Current:** Ordered list with progress bars (`ai-reality/dashboard.tsx`) — shadcn/Tailwind semantic tokens, not `.ink-band-surface`.

**Why upgrade:** Shared path vocabulary between share link and agent readback reduces cognitive load for leadership teams.

**Ink Band adaptation:**

- Wrap path section in `.ink-band-surface` (see `components/ink-band/utility-shell.tsx` if present) OR map semantic tokens already wired in `globals.css`
- Accordion columns read-only (scores visible in collapsed header: mean % + median)
- Expand shows gap line + bar chart detail from existing payload — no new API fields

**Files:**

- `src/components/ai-reality/dashboard.tsx`
- Optional: `src/components/ai-reality/path-accordion.tsx`
- `src/app/share/ai-reality/[token]/page.tsx` — no logic change

**Implementation prompt:**

```text
Add a read-only four-column path accordion to AiRealityDashboard path section.

- Collapsed: stage name + mean% bar (existing data).
- Expanded: median, divergent badge if stage in mostDivergentStages, placement copy snippet.
- Use Ink Band utility tokens (--color-ink-band-*) per globals.css :root mapping.
- Server component stays server-side; extract client accordion only if interaction required.
- Print styles: expand all columns for PDF/print.
```

---

### 3.8 P2 — Utility pages → step spine wrapper

**Surfaces:** `/assess`, `/enroll`, `/field-guide` — multi-step or staged copy (`assess/page.tsx`, `enroll/page.tsx`, `field-guide-page-content.tsx`).

**Why upgrade:** Single spine component ties standalone entry points to the agent room’s numbered path language (Stage 01 · Safety, etc.).

**Ink Band adaptation:**

- Shared `StepSpine` primitive: vertical rule + ghost number + mono eyebrow
- Enroll already uses “Stage 01 · Safety” — formalize as component

**Files:**

- New: `src/components/ink-band/step-spine.tsx` + module CSS or Tailwind with ink tokens
- Consume in enroll (done state), assess, field-guide meta strip

**Implementation prompt:**

```text
Create StepSpine presentational component for utility pages.

Props: step: string (e.g. '01'), label: string, title?: string, active?: boolean.
Visual: match readback ghost-number + left rule from ink-band.module.css (extract shared classes or duplicate minimally).
Apply to enroll page header and assess page hero; field-guide MetaStrip optional.
No API or auth changes.
```

---

## 4. Shared primitive recommendation

Build **`ProcessAccordion`** once, use in path (§3.1) and pricing (§3.4):

```tsx
// Presentational API (UI layer only)
type ProcessAccordionItem = {
  id: string;
  step: string;       // "01" … "04"
  title: string;
  summary?: string;   // collapsed
  children: React.ReactNode; // expanded
  tags?: string[];
};

type ProcessAccordionProps = {
  items: ProcessAccordionItem[];
  activeId: string;
  onActiveChange: (id: string) => void;
  layout?: "horizontal" | "vertical"; // responsive switch internal
};
```

Place at `src/components/agent-room/screen/process-accordion.tsx`. Styles live in `ink-band.module.css` under a `/* process accordion */` block. Agent-room screens only — do not export to marketing archive.

---

## 5. Implementation sequence

Recommended order minimizes rework and validates the shared primitive early:

| Phase | Work | Surfaces touched | Risk |
|-------|------|------------------|------|
| **1** | `ProcessAccordion` + path screen horizontal layout | `path-screen.tsx` | Medium — responsive breakpoint testing |
| **2** | Leader card carousel | `leader-band.tsx` | Medium — FLIP regression |
| **3** | Readback ghost-number + beat ghost header | readback, beat | Low |
| **4** | Pricing accordion (reuse primitive) | `pricing-screen.tsx` | Low |
| **5** | Audience picker | `audience.tsx` | Low |
| **6** | `StepSpine` on utility pages | assess, enroll, field-guide | Low |
| **7** | AI Reality dashboard accordion | share dashboard | Low — authenticated |

After each phase: `pnpm typecheck`, manual pass at `/agent` stub mode, leader FLIP spot-check, `prefers-reduced-motion` spot-check.

---

## 6. Explicitly out of scope (this doc)

| Item | Reason |
|------|--------|
| New marketing pages or `(site)` revival | Agent-first pivot; archived under `_archive/pre-marketing-migration-2026-06/` |
| Composer pill layout changes | Covered by suggestion-pills doc; different problem |
| Stream/agent prop schema changes | Engine contract (`movemental-ai-agents`); UI reads existing props only |
| Dashboard onboarding checklist content | Placeholder pages only until archive remount |
| Concept Modern split-screen colors | Violates Ink Band charter |

---

## 7. Success criteria

A pattern ship is done when:

1. **Token compliance** — no raw hex in components; Playfair / Inter / mono / Caveat roles respected.
2. **Closed screen set** — no new `ScreenId` without product note in this doc.
3. **Responsive** — horizontal patterns collapse to vertical stacks on narrow viewports inside the sheet measure.
4. **Motion** — house easing + reduced-motion static fallbacks.
5. **Parity** — stub screens match stream visuals where both exist (readback, beat).
6. **Conversion path intact** — pills and beat flow still prioritize reality check → Safety (see suggestion-pills doc §2.2).

---

## 8. Quick reference — pattern → file map

```
Pattern A (ghost step)     → readback-screen.tsx, beat-screen.tsx, step-spine.tsx (new)
Pattern B (split picker)   → audience.tsx, assess/page.tsx (optional)
Pattern C (accordion)      → path-screen.tsx, pricing-screen.tsx, ai-reality/dashboard.tsx
Pattern D (card carousel)  → leader-band.tsx, founders-screen.tsx (optional)
Shared                     → process-accordion.tsx (new), ink-band.module.css
```
