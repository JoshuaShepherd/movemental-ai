# Design philosophy — Movemental

This document states the **worldview** behind the interface. Implementation details live in [`tokens.md`](./tokens.md) and [`primitives.md`](./primitives.md); the creative charter expands the same story in [`docs/design/DESIGN.md`](../../design/DESIGN.md).

## What Movemental should feel like

- **Editorial first.** The site reads like a serious publication or institutional report: clear hierarchy, generous vertical rhythm, and type that carries meaning—not decoration.
- **Calm authority.** Confidence shows up as spacing, measure, and tone—not motion overload, neon gradients, or playful illustration defaults.
- **Tonal depth, not line noise.** Sections meet through **background shifts** (`background`, `section`, `elevated`, `midnight`), not hairline borders between every block.
- **Human and trustworthy.** Formation and movement work is intimate; the chrome should recede so ideas and proof lead.
- **Premium without theater.** No faux-luxury gloss, no “startup unicorn” visual tropes. Restraint signals quality.

## What it should not feel like

- A generic **SaaS marketing template** (rainbow feature grids, three-column icon + blurb clones, floating blobs).
- A **dense dashboard** masquerading as a website.
- **Novelty for its own sake** (asymmetric chaos, scroll-jacking, gratuitous parallax).
- **Sterile minimalism** (all white, no warmth—Movemental uses a cool-gray surface ramp with organic undertones, not hospital white).

## Editorial principles

1. **One main claim per section.** Supporting copy elaborates; it does not compete with the headline.
2. **Earn the CTA.** Proof and mechanism sections exist so “Start a conversation” feels inevitable, not desperate.
3. **Readable measure.** Long explanations use the `Prose` column (`--prose-max`). Marketing headlines may be wider; body text should not sprawl edge-to-edge.
4. **Plain-spoken confidence.** Prefer concrete verbs and outcomes over hype adjectives.

## Trust principles

- **Midnight moments** (`Section variant="midnight"`) signal “we are serious about this problem”—use sparingly so they retain weight.
- **Proof is structural**, not an afterthought: chips, screenshots, and “already exists” claims belong in the narrative arc, not only in a footer strip.
- **Visible focus states** on interactive elements (`ArrowLink`, nav links, buttons). Never remove rings for aesthetics.
- **No dark patterns.** One primary action per band; secondary actions are visually quieter (`outline`, `ArrowLink`).

## Visual restraint principles

1. **Primary is a light switch.** Blue appears where the user should act or attend—not as page wallpaper.
2. **One ambient shadow.** `shadow-ambient` is the only approved marketing drop shadow; everything else uses surface lift.
3. **Borders are for forms and dense UI**, not for separating hero from body. Use `Section` variants.
4. **Inter only.** No competing display fonts in marketing surfaces.

## Why not “generic SaaS”

Movemental’s audience (movement leaders, churches, nonprofits) associates **competence** with **restraint and clarity**, not with gamified UI. SaaS templates optimize for shallow scanning and feature count; this site optimizes for **conceptual clarity** and **long-term relationship**. The design system exists to protect that difference.

## How the aesthetic supports messaging

| Message need | Design response |
| ------------- | ---------------- |
| Depth of thought | Large type, light weights, midnight bands |
| Integrated system | Connector motifs, tonal cards, “one system” rhythm lines |
| Tangible product | Evidence imagery, screenshot treatment, proof chips |
| Invitation to dialogue | Single strong CTA, `ArrowLink` for exploratory paths |

When copy and visuals disagree (e.g., loud UI + gentle copy), **dial the UI back**.
