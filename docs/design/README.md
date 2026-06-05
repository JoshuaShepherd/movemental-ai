# Design documentation (single source of truth)

This directory holds the **product design charter** for the Movemental organizational site and the **operational contracts** for static HTML work that mirrors production.

| Document | Purpose |
| -------- | ------- |
| [DESIGN.md](./DESIGN.md) | **Canonical charter** — creative direction, pillars, MD3-style semantic ramp (light + Midnight + global dark policy), typography scale, motion and accessibility, spacing and layout, primitives catalog (React), Stitch translation rules, checklist, static HTML notes (§14), extended craft (imagery, performance, §15), and change control (§16). |
| [MOVEMENTAL_HTML_TEMPLATE.md](./MOVEMENTAL_HTML_TEMPLATE.md) | **Sibling static repo** — full page manifest (R0–R3), CSS namespaces, `js/main.js` motion map, Oatmeal→Concept Modern token translation, sync decisions |
| [MOTION.md](./MOTION.md) §8 | **Static ↔ React motion parity** — `js/main.js` vs `<Reveal>` / nav chrome |
| [STATIC_HTML_AND_TEMPLATES.md](./STATIC_HTML_AND_TEMPLATES.md) | **Core `1-html` static SSOT** — mandatory `<head>` / stylesheet order, token parity with `src/app/globals.css`, primitive class ↔ React mapping, shell choice (`site-top` vs `site-header`), forbidden patterns, validation checklist, and **copy-paste agent prompts** to align a page or template. |

**Rule of thumb:** product and Stitch → React work starts in **DESIGN.md**. Core `1-html` static work starts in **STATIC_HTML_AND_TEMPLATES.md**. Parity checks against the sibling **movemental-html-template** repo start in **MOVEMENTAL_HTML_TEMPLATE.md**; motion specifics in **MOTION.md** §8.

Step-by-step Stitch migration remains in [docs/build/prompts/stitch-to-react-migration.md](../build/prompts/stitch-to-react-migration.md). HTML exemplar prompts are indexed in [docs/build/prompts/html-template-exemplars-index.md](../build/prompts/html-template-exemplars-index.md). To extend the design charter with additional **component families** (tables, timelines, logo strips, in-page nav, etc.), use [docs/build/prompts/design-component-exemplars-expansion.md](../build/prompts/design-component-exemplars-expansion.md).
