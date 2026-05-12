# Nested chrome inside the workspace (inventory)

Authenticated pages use **`AuthenticatedShell`** (`src/components/authenticated/authenticated-shell.tsx`) as the global midnight header and optional product sidebar. Some routes still render **additional** midnight / `safestart-*` chrome inside the content column for historical Stitch fidelity.

This file lists known exceptions so token audits do not mistake them for accidental drift. Prefer converging new work to workspace semantic tokens (`bg-section`, `bg-card`, `text-foreground`) unless a Stitch preview explicitly requires the nested shell.

| Area | File(s) | Notes |
|------|---------|--------|
| Program template viewer | `src/components/program/layout/program-shell.tsx` | Midnight header/footer around template content. |
| Teaching library (Claude skills) | `src/components/dashboard/teaching/claude-skills-teaching-guide.tsx` | Sticky midnight bar + `safestart-*` body tokens. |

**Related:** [`dashboard-shell-and-navigation-architecture-prompt.md`](../prompts/dashboard-shell-and-navigation-architecture-prompt.md) Step 6.
