# Audit & fix prompt — "Your Next AI Step" safety flow migration

Run this **after** the safety-flow migration lands (the `movemental-safety-flow-full.html`
prototype → React). It checks the build and the design against the Ink Band canon,
Tailwind v4 best practice, responsiveness, and accessibility, then fixes everything it finds.

Paste the block below into a fresh agent turn (Cursor or Claude Code) in the
`movemental-ai` repo. It is self-contained and repo-aware.

---

## The prompt

> You are auditing and fixing a just-completed migration of the "Your Next AI Step"
> safety flow — the prototype at `docs/html/movemental-safety-flow-full.html` was
> rebuilt as React on the **Ink Band** surface. Your job is to find and fix every
> deviation from our build standards, design canon, Tailwind setup, and responsive /
> a11y best practice, then prove it green. Do not restyle for taste — hold to the
> canon below.
>
> ### 0. Orient first (don't assume file paths)
> - Run `git status` and `git diff --stat main` to find exactly which files the
>   migration touched. That is your audit surface. List them back before you start.
> - Read `CLAUDE.md` (Ink Band rules), `docs/design/INK_BAND_DESIGN_CHAIN.md` (canon),
>   and `src/app/globals.css` (the `.ink-band-surface` token ramp — the SSOT).
> - Confirm the flow renders inside a scoped Ink Band surface (wrapped in
>   `.ink-band-surface`, or under `/agent` which the layout already scopes). Ink Band
>   tokens must never leak onto an unscoped page, and `oat-*` / Concept-Modern tokens
>   must never appear here.
>
> ### 1. Reuse what already exists — do NOT reinvent
> The prototype hand-rolled primitives we already have. Flag any net-new component that
> duplicates these, and refactor to reuse them:
> - **Charter document cards + sticky notes** → `.docCard`, `.docCardFold`, `.sticky`,
>   `.docStatus`, `.docStatusRatified|Open|Review`, `[data-ratified]` in
>   `src/components/agent-room/ink-band.module.css`. The prototype's `.paper` + `.sticky`
>   + `.badge` map onto these.
> - **The two-way fork (free vs. dashboard)** → `.way` / `.wayBadge` / `.plansPreview`
>   plan-card classes already in the module.
> - **The stepper / progress spine** → `src/components/ink-band/step-spine.tsx`
>   (`StepSpine`), not a bespoke `.stepper`.
> - **The Safety Dashboard itself** → `src/components/safety-dashboard/charter-dashboard-shell.tsx`
>   (`CharterDashboardShell`) and its real status model (`draft` / `published`,
>   `layersComplete` / `layerCount`). The migrated dashboard screen must render this,
>   not a parallel hardcoded one.
> - Utility chrome → `src/components/ink-band/utility-shell.tsx` / `utility-page-nav.tsx`.
>
> ### 2. Kill the hardcoded color layer (highest-priority design fix)
> The prototype defines its own `:root` palette and sets colors inline. None of that is
> allowed. Specifically find and fix:
> - **Any raw hex / rgba in TSX or new CSS.** Everything maps to `--color-ink-band-*`
>   tokens (`bg`, `surface`, `paper`, `ink`, `ink-muted`, `border`, `blue`, `highlight`,
>   `hero-dark`, `margin-red`/`margin-red-ink`) or the shadcn semantic tokens that are
>   already mapped to the Ink Band ramp in `globals.css :root`.
> - **Inline `el.style.color = '#...'` JS restyling of status pills** (the prototype's
>   `renderDash` loop). Replace with a `data-status` attribute (`none|draft|review|ratified`)
>   driving CSS — reuse `.docStatusRatified|Review|Open`.
> - **Status / accent colors absent from the palette** — the prototype's green
>   (`#3a7a4a` ratified), amber (`#9a8a23`/`#9a5a2a` review/warn), and sticky-yellow
>   (`#FBF3C4`). The Ink Band palette is deliberately ink / paper / ink-blue + margin-red,
>   with **no green**. Decision rule:
>   - If `.docStatusRatified|Review` already encode these status colors, **reuse them** —
>     do not introduce new hex.
>   - If a genuinely new status/sticky color is required, add it **once** as a scoped
>     token in `globals.css` under `.ink-band-surface` (e.g. `--color-ink-band-success`,
>     `--color-ink-band-warn`, `--color-ink-band-sticky`) and reference the token
>     everywhere. Never sprinkle literals.
>   - The Caveat "hand" sticky note is canon (it's the room's annotation voice) — keep
>     the hand font (`--font-ink-hand`), but tokenize its paper color.
> - Run the **`tailwind-cleanup`** skill over the changed files and apply its fixes
>   (arbitrary values, raw hex, non-semantic tokens, border violations, raw HTML that
>   should be a primitive/shadcn component). Then run **`color-audit`** for token
>   completeness, contrast (WCAG AA — note the prototype's `--muted #5C5651` on paper and
>   any new status text must pass), and 60-30-10 distribution.
>
> ### 3. Ink Band design fidelity
> Run the **`movemental-ink`** skill against the migrated screens and apply its findings.
> Verify against canon:
> - **Typography:** Playfair Display (`--font-ink-display`) for headings; Inter
>   (`--font-ink-body`) body; IBM Plex Mono (`--font-ink-mono`) for eyebrows / layer
>   labels / statuses; Caveat (`--font-ink-hand`) **only** for the sticky-note voice.
>   Then run **`typography-polish`** (heading hierarchy, eyebrow convention, prose width).
> - **Accent:** ink-blue `#22409b` via `--color-ink-band-blue` for pens/links/focus/the
>   recommended-fork ring — not a legacy blue, not introduced as a literal.
> - **Paper depth & hairlines:** tonal stacking (`bg → surface → paper`) and 1px
>   `--color-ink-band-border` hairlines where the prototype uses them; no heavy shadows
>   beyond the established card elevation.
> - **CSS lives in the module** (`ink-band.module.css` or a co-located `*.module.css`),
>   not inline styles and not `oat-*`.
> - **Icons:** lucide-react only — run **`icon-audit`** (no mixed libraries, sized, not
>   hardcoded-color, accessible). The prototype's text glyphs (`×`, `→`, `←`, `↑`)
>   should become lucide icons or get proper `aria-hidden` / labels.
>
> ### 4. Responsiveness (mobile-first)
> Run the **`responsive-audit`** skill and fix everything, paying attention to the
> prototype's known weak points:
> - The horizontally-scrolling **charter card row** on mobile (scroll-snap, momentum,
>   visible affordance, no clipped sticky notes).
> - The **fork** 2-up → 1-up collapse, the **rail** 4-up → 2-up, and the dashboard
>   **`.ddoc`** grid reflow (status + open link must not overflow at 320px).
> - The **modal** on small screens (full-height scroll, padding, no horizontal overflow).
> - Touch targets ≥ 44×44px (the `.opt` radios, `.restart`, `.back`, `.x` close, chips).
> - Fluid type already uses `clamp()` — keep it; verify no fixed px that breaks at 320px
>   or overflows at 1440px+. Test at 320 / 375 / 768 / 1024 / 1440.
>
> ### 5. Accessibility & interaction architecture
> The prototype is a static demo; production must be accessible React:
> - **No inline `onclick=` / global `<script>`** — convert to React event handlers and
>   component state. The multi-screen wizard (`s-q → s-result → s-step → s-fork →
>   s-diy|s-signup → s-dashboard`, plus `s-ahead`) should be a typed state machine, not
>   DOM-class toggling.
> - **No `alert()` placeholders in shipped code.** Each must become a real action (route,
>   API call, or dialog) or an explicit, typed `// TODO(safety-flow):` stub that no-ops
>   visibly — never a silent dead button. List every one you find and what you did with it.
> - **The one-question radios** (`.opt`) must be a real radio group / fieldset with
>   keyboard support and labels, not click-only `<button>`s that hide their semantics.
> - **`<div onclick>`** clickable cards (`.paper`, `.ddoc`) → real `<button>` / `<a>` with
>   keyboard + focus-visible.
> - **The modal** → an accessible dialog: focus trap, `Esc` to close, restore focus to
>   the trigger, `role="dialog"` + `aria-modal` + `aria-labelledby`, backdrop click close.
>   Prefer the existing Radix/shadcn `Dialog` (`@radix-ui/react-dialog` is a dependency)
>   over a hand-rolled backdrop.
> - **Stepper** and **progress bar** need `aria` (e.g. `role="progressbar"`,
>   `aria-valuenow/min/max`, or an accessible step label).
> - **`prefers-reduced-motion`:** gate the `fade` screen transition and the paper-card
>   rotate/translate hover so they no-op for users who ask for less motion.
> - Run **`design-audit`** (or **`page-audit`** for the whole-page pass) for a final
>   token/a11y/consistency sweep.
>
> ### 6. Wire to the real backend (not the prototype's fake state)
> The prototype fakes everything in memory. We have real infrastructure — confirm the
> migration uses it, or flag precisely where it's intentionally stubbed:
> - Front-door email capture → the `/assess` magic-link pattern (`createClient()` +
>   Supabase OTP) already in `src/app/assess/page.tsx`. The DIY "send me the Handbook"
>   and signup email flows should not invent a new auth path.
> - Signup / dashboard provisioning → `/api/safety/signup-gate` and
>   `/api/safety/complete-signup`.
> - Charter + per-layer status → `/api/safety/charter-dashboard` and
>   `/api/safety/artifacts/[id]/draft` · `/publish`; the five docs
>   (Statement/Policy/Context/Rules/Response) are real `safety-artifacts` with
>   `draft → review → ratified(published)` status. The "Mark as ratified" action must
>   call the publish endpoint (or be a clearly-labeled demo stub), never just mutate
>   local state in shipped UI.
> - If the migration is intentionally a **public pre-auth marketing funnel** (no live
>   data yet), say so explicitly and ensure the seams to the above are clean TODOs, not
>   misleading fake success states.
>
> ### 7. Copy & doctrine (light pass)
> - Preserve the flow's explicit **anti-dark-pattern** stance ("No urgency. No scarcity.
>   No spots filling fast.") — it is on-brand and must survive the migration verbatim in
>   spirit. Run **`movemental-voice`** only if copy was rewritten; otherwise leave prose
>   alone.
> - Keep the stage naming canon exactly: **Safety · Sandbox · Training · Tech**, in order.
>
> ### 8. Prove it — gates must pass
> Run and fix until all are clean (pnpm only):
> ```bash
> pnpm typecheck
> pnpm lint
> pnpm build
> ```
> Push `"use client"` to the leaves; keep route `page.tsx` server components where
> possible (receive `params`/`searchParams` as props). Then load the migrated route in
> the dev server and click every screen transition, the modal, and the ratify action at
> 375px and 1280px.
>
> ### 9. Report
> Output: (a) the list of changed files you audited, (b) a severity-ranked table of every
> issue found and the fix applied (or why deferred), (c) each `alert()` / fake-state seam
> and its disposition, (d) confirmation that typecheck/lint/build are green and the
> manual click-through passed. Keep findings concrete (`file:line`), not generic.

---

### Notes for whoever runs this

- This prompt assumes the Ink Band primitives and `/api/safety/*` endpoints listed in §1
  and §6 still exist — verify with `git`/search if the tree has moved since 2026-06-13.
- The single biggest predictable failure is the **hardcoded color layer** (§2): the
  prototype carries its whole palette as literals and sets status colors via inline JS.
  Expect that to be the bulk of the design fixes.
- If the migrated files don't yet exist when you run this, the agent's §0 step will tell
  you — re-run after Cursor finishes.
