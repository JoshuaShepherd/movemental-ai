# Architecture docs

How `movemental-ai` is built underneath the marketing/AI surface.

- **[TYPE_SAFETY_CHAIN.md](./TYPE_SAFETY_CHAIN.md)** — the six-layer chain (Drizzle → Zod → Services → API → Hooks → UI), how types flow downstream from the live `movemental` Postgres, the per-layer reference, the generate/validate commands, current lock status, and the schema-change waterfall. **Start here for any data-layer work.**

This repo shares its database with `alan-hirsch` and `movemental-visual-editor-main`; their `docs/architecture/TYPE_SAFETY_CHAIN.md` files are the canonical cross-repo reference.

## Companion: the design chain

The design-side counterpart to the type-safety chain lives under `docs/design/`:

- **[../design/INK_BAND_DESIGN_CHAIN.md](../design/INK_BAND_DESIGN_CHAIN.md)** — the agent-room
  ("Ink Band") design charter + layer-by-layer design chain (tokens → primitives → components →
  built layers → pages/layouts), transcribed from the `movemental-agentic-front-end` prototype.
- **[../design/README.md](../design/README.md)** — Ink Band design index (sole live system in this repo).
