# RL-01 — Content model and body pipeline

**Prompt ID:** RL-01  
**Blocks:** RL-00 (routing matrix approved)  
**Last updated:** 2026-06-11

---

## 1. Goal

Establish the **canonical content model** for Band A migration and document the markdown→React body pipeline so RL-03–RL-05 agents port consistently.

Implement **schema extensions only** in this prompt — no full article bodies yet (those ship in batch prompts).

---

## 2. Read first

- RL-00 §10 routing matrix
- `src/lib/research/data.ts`
- `src/components/research/article-bodies.tsx`
- `public/templates/library/ink-research/article.html` — reader layout reference
- `src/components/research/research.module.css` — available body classes

---

## 3. `ResearchItem` conventions

Extend or align types in `data.ts`:

```typescript
export type ResearchKind = "Paper" | "Analysis" | "Thesis";

export interface ResearchItem {
  slug: string;              // kebab-case; matches Route A source slug
  kind: ResearchKind;
  year?: number;             // from published_at or 2026 default
  flagship?: boolean;        // at most one true in RESEARCH_ITEMS
  thesisNote?: string;       // marginal note for Thesis rows
  title: string;             // public H1 (may differ from internal filename)
  abstract: string;          // index blurb; {hl}…{/hl} for highlighter swipe
  readMin: number;           // ceil(wordCount / 220)
  sourceCount: number;       // count of Sourced refs in body + rail
  subtitle?: string;         // deck under title
  sections?: ResearchSection[];  // TOC ids must match body anchors
  sources?: ResearchSource[];    // right rail; index aligns with <Cite n={} />
  hasFullBody?: boolean;     // true when BODY_REGISTRY has entry
}
```

**Index placement:**

- `RESEARCH_ITEMS` — live library (flagship + featured + stewardship + top thesis)
- `RESEARCH_ARCHIVE` — research series depth pieces loaded via "Load archive"

---

## 4. Body registry pattern

In `article-bodies.tsx`:

```typescript
const BODY_REGISTRY: Record<string, ReactNode> = {
  "ai-credibility-crisis": aiCredibilityCrisisBody,
  // …
};

export function getArticleBody(item: ResearchItem): ReactNode {
  return BODY_REGISTRY[item.slug] ?? fallbackBody(item);
}
```

**One const per article** (`aiCredibilityCrisisBody`) — not inline in registry. Keeps diffs reviewable.

---

## 5. Markdown → React mapping rules

| Markdown | React |
| --- | --- |
| First `<p>` after H1 | `<p className={styles.dropCap}>` |
| `##` / `###` headings | `<h3 id="anchor">` — **h3** matches existing flagship body |
| Blockquote | `<blockquote className={styles.articleBlockquote}>` |
| Ordered list | `<ol className={styles.articleList}>` with `articleListNum` |
| `[text](url)` external | `<a href="…" className={styles.textInkBlue} target="_blank" rel="noopener noreferrer">` |
| Footnote `[1]` or inline Pew cite | `<Cite n={1} title="Pew · 2025" />` — prefer superscript link to `/research/sources` |
| Margin aside (if present in md) | `articleMarginWrap` + `marginNote` |
| `{hl}` in abstract only | Handled by index highlighter — not in body |
| YAML frontmatter | **Strip** — lives in `data.ts` only |
| Confidence tags (VERIFIED / QUALIFIED) | Keep as `<strong>` or small caps span; do not invent new components |

**Do not port:**

- Raw HTML from md unless already in prototype
- Concept Modern / Ink Band agent-room classes
- shadcn components inside article body (research module is self-contained)

---

## 6. Section anchor contract

For each Route A file:

1. Extract H2s from markdown (skip "Executive summary" if it becomes lede only).
2. Build `sections: [{ id, label }]` in `data.ts`.
3. Assign matching `id` on the `<h3>` or first `<p>` of each section in the body.
4. `ArticleToc` scroll-spy requires ids to be unique on the page.

Long pieces (`credibility-thesis`, `the-cost-of-fragmentation`) may need **8–12** TOC entries — match markdown H2 structure.

---

## 7. Stub policy

Until a body is migrated, `hasFullBody: false` and fallback stub is **honest** (already implemented). When adding a row to `RESEARCH_ITEMS`, either:

- Ship body in the same PR, or
- Keep row in `RESEARCH_ARCHIVE` hidden until body lands

Do not add live index rows with permanent stubs.

---

## 8. Tasks

1. Add `hasFullBody` helper or script comment documenting how to compute `readMin` / `sourceCount`.
2. Replace prototype placeholder titles in `data.ts` with **real slugs from RL-00** (metadata only — bodies still stub OK for placeholders not yet in Route A).
3. Document body file organization decision in a short comment at top of `article-bodies.tsx`:
   - **v1:** single file (current)
   - **v2 trigger:** when file exceeds ~800 lines, split to `article-bodies/*.tsx` + barrel export
4. Update `allResearchSlugs()` / `generateStaticParams` if new slugs added.

---

## 9. Definition of Done

- [ ] Content model documented and `data.ts` aligned with RL-00 slugs
- [ ] Body mapping rules comment block in `article-bodies.tsx`
- [ ] Prototype lorem ipsum abstract removed from placeholder rows
- [ ] `pnpm typecheck` green
- [ ] `master_runner.md` RL-01 updated

---

## §10 Attempt log

| Date | Agent | Outcome | Notes |
| --- | --- | --- | --- |
| 2026-06-11 | — | Pack authored | — |
