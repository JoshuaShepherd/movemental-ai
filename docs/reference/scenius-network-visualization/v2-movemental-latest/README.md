# v2 — movemental-latest (imperative D3 SVG)

Archived snapshot from [JoshuaShepherd/movemental-latest](https://github.com/JoshuaShepherd/movemental-latest) @ `45ca951bb5b692831764ab3c1de780d39bfc8d82`.

- **`scenius-graph.tsx`** — Main visualization (`SceniusGraph`). Originally imported `@/lib/data`.
- **`supporting-lib-data.ts`** — Copy of `lib/data.ts` from that repo so imports can be understood offline.
- **`app-scenius-visualization-page.tsx`** — Thin page wrapping `SceniusGraph` with layout chrome (`Navigation` / `Footer` not copied).

For production in this monorepo, replace `@/lib/data` with a deliberate data module or CMS-backed graph.

See [parent README](../README.md) for scope and porting notes.
