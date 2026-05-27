# Movemental SSOT Dashboard

This directory is the **single source of truth** (SSOT) dashboard for the Movemental vision, story, and product structure. It is the **first link in the chain**: humans and agents use it first; the React app and other generated content align to it.

## Purpose

- **Living format**: Recreates Movemental’s vision and documentation in one navigable, well-designed surface (not just links to `_docs`).
- **Docs-first**: Structure and content are derived from `_docs` (site purpose and order, sitemap, platform architecture, AI vision, design system).
- **Dual audience**: Designed for both **humans** (readable, clear nav, typography) and **agents** (semantic HTML, stable landmarks, clear headings).

## Relationship to the Repo

| Item | Role |
|------|------|
| `_docs/` | Canonical markdown source; dashboard content restates and structures it here. |
| `app/` (Next.js) | React app; content and structure should align with this dashboard. |
| `ssot-dashboard/` | This dashboard — the living SSOT and first link in the chain. |

## How to Run

- **Local**: Open `index.html` in a browser, or run a static server from this directory (e.g. `npx serve .` or `python -m http.server 8080` from `ssot-dashboard/`).
- **Optional**: Add a script to the root `package.json` (e.g. `"ssot:serve": "npx serve ssot-dashboard"`) and run `npm run ssot:serve`.

## Structure

```
ssot-dashboard/
├── index.html          # Shell: sidebar + main content area (all sections inlined)
├── README.md           # This file
├── css/
│   ├── tokens.css      # Design tokens (colors, type scale, spacing)
│   ├── layout.css      # Grid, sidebar, main area
│   └── components.css  # Cards, sections, nav
├── js/
│   └── main.js         # Navigation, content loading (hash-based)
└── content/            # Section content (HTML) — mirrors inlined sections
    ├── foundation.html
    ├── site-order.html
    ├── platform.html
    ├── ai-vision.html
    ├── design-system.html
    ├── core-story-vim.html      # Anchor story (500w); Vision, Intention, Means
    ├── value-proposition.html   # Value prop, one-liner, Start with Why
    ├── audience.html           # Who we serve, naming, demographics, archetypes
    ├── principles.html         # Non-negotiables, ranked values
    ├── narrative.html          # Story we tell, pricing language
    ├── canonical-copy.html     # Hero, Sound familiar, key page prose
    ├── voice.html             # Platform voice & tone
    └── content-types.html      # Article, course, book, etc.; creation rules
```

## Content sections (foundation for all subsequent content)

| Section | Purpose |
|--------|---------|
| **Foundation** | Why Movemental exists; dashboard as first link in chain |
| **Core Story / VIM** | 500-word anchor story; Vision, Intention, Means (Dallas Willard VIM) |
| **Site order & sitemap** | Order of understanding; primary vs supporting pages |
| **Platform & type safety** | Stack; six-layer chain; multi-tenant |
| **AI vision** | Movemental Intelligence; amplification not replacement |
| **Design system & tokens** | Typography, colors, component patterns |
| **Value proposition** | Primary and segment value props; one-liner; Start with Why |
| **Audience** | Who we serve; naming; demographics; psychographic; archetypes |
| **Principles** | Four non-negotiables; ranked values (guardrails for content) |
| **Narrative & story** | Story we tell; how we talk about pricing; invitation |
| **Canonical copy** | Master prose for Why Movemental hero, Sound familiar, etc. |
| **Voice & tone** | Platform voice; what we avoid; leader-specific refs |
| **Content types** | Article, course, book, video, podcast; creation rules |

## Cursor Integration

- **Rule**: `.cursor/rules/ssot-dashboard-creator.mdc` — persona and mandate when editing this dashboard.
- **Skill**: `.cursor/skills/ssot-dashboard/` — workflow for designing and refining the SSOT dashboard and its structure.
