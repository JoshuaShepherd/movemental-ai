# RL-90 — Deferred surfaces

**Prompt ID:** RL-90  
**Status:** Deferred — operator request only  
**Last updated:** 2026-06-11

---

## Out of scope for the core migration pack

These are **explicitly deferred** until RL-08 is Done and product asks for them.

---

## 1. PDF download

Prototype shows "PDF" actions on index rows and `ArticleActions` component exists.

**When requested:**

- Generate PDF from React body or markdown SSOT (pick one pipeline)
- Store in `public/research/pdf/{slug}.pdf` or Vercel Blob
- Wire `research-row.tsx` PDF button to real asset
- Corpus v1 → single large PDF bundle

**Do not** ship broken PDF buttons — hide action until asset exists.

---

## 2. Full-text search

Ink research prototype has no search. Defer until:

- ≥ 13 live bodies
- Clear need from analytics or user requests

Options: Pagefind on static export, Algolia, or simple client filter on index.

---

## 3. `/articles` markdown route

Several Band A files use shapes better served by the articles loader later:

| Shape | Examples | Future route |
| --- | --- | --- |
| `canon` | `finding-ai-guidance-worth-trusting` | `/articles/[slug]` |
| `story` | (none in 85-99) | `/articles/[slug]` |
| `playbook` | `linking-strategy-eeat-geo-playbook` | Internal only |
| `methodology` | `who-says-what-an-org-needs` | `/articles/` or field guide |

**Dual publish policy:** Research library = EEAT research table UI. Articles route = editorial layout. Same slug may exist on both **only** with canonical URL set in frontmatter — default canonical = `/research/{slug}` for research-shaped pieces until articles ship.

---

## 4. MDX / markdown-driven bodies

RL-01–RL-05 port markdown to React manually for type safety and citation components.

**Revisit MDX when:**

- Body registry exceeds ~2,000 lines
- Non-engineers need to edit live copy weekly

Until then, markdown SSOT stays in `docs/`; React is deploy artifact.

---

## 5. `03-publishing-economics` live index

Currently in RL-03 batch as archive. Promote to live index when business narrative needs it on homepage funnel — coordinate with narrative audit.

---

## 6. Remaining graded-high bands

This pack covers **85–99 only**. Separate packs recommended for:

- `70–74` — upgrade via [upgrade-eeat-article-from-70-band.md](../upgrade-eeat-article-from-70-band.md) first
- `75–79`, `80–84` — batch after 85–99 migration proves pipeline

---

## §10 Attempt log

| Date | Agent | Outcome | Notes |
| --- | --- | --- | --- |
| 2026-06-11 | — | Pack authored | — |
| 2026-06-11 | Cursor | Hygiene pass | Index PDF/View PDF actions removed; `ArticleActions` → print; hero + metadata copy updated; corpus v1 comment clarified. Search, `/articles`, MDX, publishing-economics promotion, lower bands remain deferred. |
