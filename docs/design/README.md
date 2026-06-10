# Design docs

**movemental-ai** uses a single design system: **Ink Band**.

- **Ink Band** — [INK_BAND_DESIGN_CHAIN.md](./INK_BAND_DESIGN_CHAIN.md) — the agent room (`/agent`),
  staff admin (`/agent-runtime`), and auth surfaces (`/login`, etc.). Warm paper sheet with a red
  margin rule, Playfair display, Caveat handwritten agent voice, IBM Plex Mono labels, ink-blue pen
  accent, hairline borders. Transcribed from the `movemental-agentic-front-end` prototype.

**Implementation:** `src/app/globals.css` (`.ink-band-surface` tokens), `src/components/agent-room/ink-band.module.css`, `src/components/ink-band/utility-shell.tsx`.

**Archived reference (not live in this repo):** [DESIGN.md](./DESIGN.md) documents the former
Concept Modern marketing system, preserved for when marketing routes return from a separate merge.
The `concept-modern-ui` skill symlink remains but is inactive for agent-only work here.

Related: [type-safety chain](../architecture/TYPE_SAFETY_CHAIN.md).
