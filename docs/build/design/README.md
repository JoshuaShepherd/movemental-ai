# Movemental design system — build documentation

This directory is the **binding internal source of truth** for how Movemental’s marketing site is designed, built, and audited in code. It sits alongside the creative charter at [`docs/design/DESIGN.md`](../../design/DESIGN.md) (“The Digital Curator”). Together they define intent (charter) and execution (this chain).

## Purpose

Movemental should not rely on repeated freeform UI generation. It should rely on a **documented system** that is:

- inferred from what already ships in `src/`
- normalized where the codebase is still mixed
- practical for humans and agents (audit, compose, repair)

If this documentation and `src/app/globals.css` disagree, treat that as **drift**—fix implementation and update these docs in the same change.

## The chain (bottom → top)

| Layer | What it is | Where it lives |
| ----- | ---------- | -------------- |
| **L0 — Tokens** | Colors, type rhythm, spacing, radii, shadows, layout metrics | `src/app/globals.css` (`:root`, `@theme inline`); contract summarized in [`tokens.md`](./tokens.md) and [`tokens.css`](./tokens.css) |
| **L1 — Base** | `html`/`body`, heading defaults, midnight scoping, selection, reduced motion | `@layer base` in `globals.css` |
| **L2 — Primitives** | Section bands, container, display type, eyebrow, prose, arrow CTA | `src/components/primitives/*` — see [`primitives.md`](./primitives.md) |
| **L3 — UI shell** | shadcn controls (Button, Card, Input, …) | `src/components/ui/*` — see [`components.md`](./components.md) |
| **L4 — Sections / chrome** | Homepage blocks, nav, footer | `src/components/sections/*`, `src/components/nav/*` |
| **L5 — Pages** | Route composition only | `src/app/(site)/**/page.tsx` — rules in [`layouts.md`](./layouts.md) |

**Dependency rule:** upper layers consume lower layers only. Pages compose sections and primitives; primitives use tokens. No raw hex or Tailwind default palette colors in TSX.

## How to use these docs

| Role | Start here |
| ---- | ---------- |
| **Designer / PM** | [`design-philosophy.md`](./design-philosophy.md), then [`layouts.md`](./layouts.md) |
| **Developer** | [`tokens.md`](./tokens.md), [`primitives.md`](./primitives.md), [`components.md`](./components.md) |
| **Agent (audit / build)** | [`page-audit-checklist.md`](./page-audit-checklist.md), [`homepage-spec.md`](./homepage-spec.md), [`migration-notes.md`](./migration-notes.md) |

## Design philosophy (summary)

Editorial, high-trust, restrained. Rhythm through **tonal surfaces** (`background` → `section` → `card`), not border stacks. **Midnight** (`inverse-surface`) is a narrative device used sparingly. Primary blue is a **light switch** for actions and focus—not large fields of brand color.

Full worldview: [`design-philosophy.md`](./design-philosophy.md).

## Non-goals

- Replacing `docs/design/DESIGN.md` (charter + Stitch mapping tables stay there)
- Pixel-perfect Figma parity with every Stitch export
- A second token pipeline that diverges from `globals.css`
- Dark mode as a global product theme (`class="dark"` on `<html>` is out of scope)

## Anti-drift guidance

1. **New marketing UI** → default to `Section` + `Container` + documented primitives; extract repeated blocks into `sections/` after the second use.
2. **New color** → extend `:root` and `@theme inline` in `globals.css`, then update [`tokens.md`](./tokens.md), [`tokens.css`](./tokens.css), and `DESIGN.md` section 3 together.
3. **Stitch import** → remap hex and slate utilities per `DESIGN.md` section 11; never ship raw Stitch palette in TSX.
4. **Shadows** → only `shadow-ambient` for floating UI; otherwise ghost lift (surface stack).
5. **Section breaks** → never `border-t` / `divide-y` between major bands; use `Section` `variant` changes.

## Visual lab (static HTML)

**Tailwind token / primitive / component strips:** [`design-system-lab/README.md`](../../../design-system-lab/README.md) (`npx serve design-system-lab`). **Static HTML home prototype (concept-modern):** [`docs/html/README.md`](../../html/README.md) → [`docs/html/homepage-concept-modern/index.html`](../../html/homepage-concept-modern/index.html) — do not fork another full home in the lab.

## File index

| File | Role |
| ---- | ---- |
| [`design-philosophy.md`](./design-philosophy.md) | Feel, trust, restraint, anti-SaaS posture |
| [`tokens.md`](./tokens.md) | Canonical token semantics and usage |
| [`tokens.css`](./tokens.css) | CSS custom property reference (keep in sync with implementation) |
| [`primitives.md`](./primitives.md) | L2 building blocks |
| [`components.md`](./components.md) | L3–L4 approved compositions |
| [`layouts.md`](./layouts.md) | Page structure, arcs, density |
| [`page-audit-checklist.md`](./page-audit-checklist.md) | Pass/fail audit for any page |
| [`homepage-spec.md`](./homepage-spec.md) | System-level home build spec |
| [`migration-notes.md`](./migration-notes.md) | Keep / normalize / deprecate from current repo state |
