# AF-09 — Screens: static and info pages

**Prompt ID:** AF-09  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Blocks:** AF-07  
**Last updated:** 2026-06-09

---

## 1. Role and stance

Port **informational screens** the agent shows via `show` acts — mostly static content with light interactivity (FAQ accordion, contact form UI, confirm modes).

Static HTML references under `movemental-agentic-front-end/pages/`:

| Screen | File | JS builder |
| --- | --- | --- |
| about | `about.html` | `ABOUT_HTML` in profiles.js |
| contact | `contact.html` | `CONTACT_HTML` + `bindContactForm` |
| pricing | `pricing.html` | `PRICING_HTML` |
| faq | `faq.html` | `faq.js` |
| safety | `safety.html` | `SAFETY_HTML` |
| founders | `founders.html` | `foundersHTML()` |
| confirm (free/paid) | `confirm-free.html`, `confirm-paid.html` | `confirmHTML(mode)` |

Skills: **`typography-polish`**, **`design-section`**.

---

## 2. Goal

One React component per screen, visually matching static snapshots. Forms are **UI-only** in this pack (no API POST).

---

## 3. Implementation order

1. **about** — simplest prose block
2. **pricing** — two-column `.ways` grid
3. **faq** — grouped sections from `faq.ts`
4. **safety** — long-form charter content
5. **founders** — team grid with portraits
6. **contact** — form fields + validation UI (submit → local toast or noop)
7. **confirm** — `mode: 'free' | 'paid'` prop from show act

---

## 4. Shared patterns

### 4.1 Crumb navigation

Screens that include `CRUMB` in prototype show back control — wire to `goHome()` or `run('opening')`.

### 4.2 Scroll

All these screens add `#screen.scroll` — long content scrolls inside screen zone.

### 4.3 Section labels

`.sec-label`, `.eyebrow` — mono uppercase tracking from CSS module.

---

## 5. Contact form (UI only)

Port `bindContactForm` behavior:

- Field focus styles
- Submit button state
- **Do not** wire to `/api/contact` until product decision — show inline "Prototype — message not sent" or console log.

Document in component comment.

---

## 6. FAQ

Port FAQ structure from `faq.ts`:

- Jump links or accordion (match prototype interaction)
- If prototype uses static expanded sections, keep static — do not invent accordion

---

## 7. Confirm screen

`renderScreen('confirm', { mode: 'free' })` vs paid — diff the two HTML files and branch on prop.

---

## 8. HTML → React procedure

For each page:

```bash
# Optional: extract sheet inner HTML
grep -A999 'class="sheet' pages/about.html | head -80
```

1. Create `components/agent-room/screens/<name>-screen.tsx`
2. Port CSS subsets into `agent-room.module.css` (or screen-specific module if file grows)
3. Register in screen map (AF-07)
4. Add scene in stub that navigates to screen for QA (`run('whatIs')`, etc.)

---

## 9. Definition of Done

- [ ] Seven screen components implemented and registered.
- [ ] Static HTML parity for typography, spacing, grids (AF-12 will formalize).
- [ ] FAQ + contact interactions match prototype (UI level).
- [ ] Confirm free/paid variants render correctly.
- [ ] `pnpm typecheck` passes.
- [ ] §10 + master runner updated.

---

## §10 Attempt log

<!-- Screen checklist, form stub behavior, content sync commit. -->

### 2026-06-09 — AF-09 static/info screens

**Source sync:** `movemental-agentic-front-end` @ `9d54e78`. Copy byte-identical
to `ABOUT_HTML` / `PRICING_HTML` / `SAFETY_HTML` / `CONTACT_HTML` / `confirmHTML` /
`foundersHTML` / `faq.js`.

**Files created** (`src/components/agent-room/screen/stub/`)

| File | Screen | Notes |
| --- | --- | --- |
| `chrome.tsx` | shared | `Crumb` (↑ Home → `onHome`), `LayerRow`, `Way` (offer card) |
| `about-screen.tsx` | about | prose + path layers |
| `pricing-screen.tsx` | pricing | 6 `Way` cards + 6 refusals + walkable + terms |
| `faq-screen.tsx` | faq | jump links + 10 sections of native `<details>` |
| `safety-screen.tsx` | safety | five-layer Guidebook + two ways |
| `founders-screen.tsx` | founders | 3-portrait team grid (Alan/Brad/Josh) |
| `contact-screen.tsx` | contact | UI-only form (topic chips, validation, mock success) |
| `confirm-screen.tsx` | confirm | branches on `opts.mode` (`free` \| `paid`) |

**Files changed**

| Path | Change |
| --- | --- |
| `ink-band.module.css` | Ported the static-screen CSS (crumb, layers, ways grid, refusals, team grid, faq accordion, the full contact form + check-draw). |
| `stub-screen.tsx` | `ScreenProps` gains `onHome`; registry now points 11 of 12 ids at real screens (only `leader` is a placeholder, AF-10). |
| `placeholders.tsx` | Trimmed to just `LeaderScreen`. |
| `path-screen.tsx` | Added the `Crumb` (an inner screen the prototype gives `CRUMB`). |
| `use-agent-room-stub.ts` / `agent-room.tsx` | `onHome = reset` threaded through `StubScreen`. |

**Decisions / deviations**

- **Crumb everywhere the prototype has it** — `renderScreen` prepends `CRUMB` to
  about/contact/pricing/faq/safety/confirm/founders/path/leader (not home/beat/
  readback). Added to `path` (it was missing from AF-08).
- **Contact is UI-only, no POST** (§5 / AF-90). Topic-chip select + inline
  validation (`cfInvalid` shake on empty name / bad email / empty message) + a
  local success toast ("Got it, {firstName}.") — no `/api/contact` call;
  documented in the component header.
- **FAQ kept native `<details>`** (collapsed by default), matching the prototype —
  no invented accordion (§6).
- **Founders/leader-band use `<img>`** (file-level eslint-disable) for the custom
  portrait hover filter, consistent with AF-08.
- **CSS class renames to avoid module clashes**: the team line is `.tmLine` (the
  prototype reused `.ln` for both layer numbers and team lines).

**Verification — headless Chromium (Playwright), reduced-motion:**

- [x] All **7 screens render** (reached via chips): about ("The path we walk with
  you" + crumb), pricing ("What this pricing refuses", **6 ways**), founders (**3**
  portraits), safety ("What it produces").
- [x] **FAQ**: 10 groups / **59** `<details>` + jump links; clicking a summary
  toggles `open` false→true (native accordion).
- [x] **Contact**: empty submit flags **3** `cfInvalid` fields; a valid submit →
  "Got it, Jordan." success state (no network).
- [x] **Confirm**: `free` ("Your field guide is on its way" / "How to use it") and
  `paid` ("You're in. Here's the next two weeks" / "The two weeks") both render
  from `opts.mode`.
- [x] `pnpm typecheck` green; `eslint` clean; **0 console errors**.
- Pixel parity formalized in AF-12.
