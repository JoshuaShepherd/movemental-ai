# Scenius network visualization — archived reference only

**Status:** Historical examples copied from older repositories. **Not imported into the Next.js app** and **not maintained** as runnable code in this folder. Use them as design and implementation references when building:

1. A **static HTML/CSS/JS** “match template” (behavior + layout parity without React), then  
2. A **production React** implementation under `src/` (aligned with DESIGN.md and current routing).

---

## What’s here

| Folder | Origin repo | Captured at commit | What it demonstrates |
|--------|-------------|-------------------|----------------------|
| [`v1-movemental-ai-site/`](./v1-movemental-ai-site/) | [movemental-ai-site](https://github.com/JoshuaShepherd/movemental-ai-site) | `117a47b23715f7c6b5c773d64205d4121dd8e75d` | **GSAP ScrollTrigger** (pinned scrub timeline), **d3-force** layout via `useNetworkLayout`, tiered nodes with **Alan as anchored center** in data (`network-data.ts`). Modal uses shadcn **Sheet** (`NodeModal.tsx`). |
| [`v2-movemental-latest/`](./v2-movemental-latest/) | [movemental-latest](https://github.com/JoshuaShepherd/movemental-latest) | `45ca951bb5b692831764ab3c1de780d39bfc8d82` | **Imperative D3** inside `useEffect` on an SVG (force simulation, drag, zoom-ish viewBox). Uses **Motion** (`motion/react`) for UI chrome. Mock graph built from `leaders` / `topics` in **`supporting-lib-data.ts`** (snapshot of `@/lib/data`). |

---

## Product narrative (why both exist)

Canonical intent is documented in the strategy doc [**scenius-network-viz**](https://github.com/JoshuaShepherd/docs/blob/main/10-business/strategy/site-docs/scenius-network-viz.md) (organization `docs` repo): scenius as a **credibility graph**, Alan at the hub, additional voices and personas revealed in tiers, scroll-driven storytelling.

- **v1** matches that story most closely (explicit tiers, anchor id, ScrollTrigger choreography).  
- **v2** is a **denser exploratory graph** (extra synthetic nodes); useful for **D3-only SVG patterns** and interaction ideas, less tied to the tier narrative.

---

## Dependencies (when you port)

**v1 (`scenius-visualization/`):**

- `react`, `gsap` (+ `ScrollTrigger`), `d3-force`
- `@/components/ui/sheet` (shadcn) for `NodeModal.tsx`
- Original route wrapper: `app-public-scenius-page.tsx` (was `src/app/(public)/scenius/page.tsx`); used `tenantConfig` there — **not copied**; replace with current metadata/layout patterns.

**v2:**

- `react`, `d3` (full bundle), `motion/react`, `next/navigation` (`useRouter` in graph — optional for a static template)
- Imports `@/lib/data` → use bundled **`supporting-lib-data.ts`** and remap paths when copying into this repo.

---

## Suggested migration path into `movemental-ai`

1. **Static prototype:** Reproduce world coordinates, forces, and scroll beats in vanilla JS (or a single `.html` under `docs/` later if you add one), matching token colors from DESIGN.md instead of hard-coded hex where applicable.  
2. **React:** Port **v1** as the primary UX match for “why movemental” / scenius story; borrow interaction patterns from **v2** only if needed (e.g. drag behavior).  
3. Replace **Sheet** dependency or align with existing shadcn in this repo; wire a route (e.g. `/system/...` or product route) only after design sign-off.

---

## Updating these snapshots

To refresh from GitHub (requires network):

```bash
git clone --depth 1 https://github.com/JoshuaShepherd/movemental-ai-site.git /tmp/movemental-ai-site-ref
git clone --depth 1 https://github.com/JoshuaShepherd/movemental-latest.git /tmp/movemental-latest-ref
# Then re-copy files into v1/ and v2/ and amend the commit SHAs in this README.
```
