# Design docs

**New public site (`-new` routes, October 2026):** **Paper** — [MV_DESIGN_CHARTER.md](./MV_DESIGN_CHARTER.md), with tokens, brand book and component reference under [mv/](./mv/). Scoped to `src/app/(new)/` and `.mv-surface`; it never shares tokens with Ink Band.

**movemental-ai** uses a single design system: **Ink Band**.

- **Ink Band** — [INK_BAND_DESIGN_CHAIN.md](./INK_BAND_DESIGN_CHAIN.md) — the agent room (`/agent`),
  staff admin (`/agent-runtime`), and auth surfaces (`/login`, etc.). Warm paper sheet with a red
  margin rule, Playfair display, Caveat handwritten agent voice, IBM Plex Mono labels, ink-blue pen
  accent, hairline borders. Transcribed from the `movemental-agentic-front-end` prototype.

**Implementation:** `src/app/globals.css` (`.ink-band-surface` tokens), `src/components/agent-room/ink-band.module.css`, `src/components/ink-band/utility-shell.tsx`.

**Archived reference (not live in this repo):** [DESIGN.md](./DESIGN.md) documents the former
Concept Modern marketing system, preserved for when marketing routes return from a separate merge.
The `movemental-ink` skill is the active front-end design skill for the Ink Band agent room here.

Related: [type-safety chain](../architecture/TYPE_SAFETY_CHAIN.md).
