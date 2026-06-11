# RL-07 — Reference layer and agent KB sync

**Prompt ID:** RL-07  
**Blocks:** RL-02  
**Can run parallel with:** RL-03–RL-06  
**Last updated:** 2026-06-11

---

## 1. Goal

Complete **Route B + C** migration — reference data without full readers:

| Source | Work |
| --- | --- |
| `ai-research-archive.md` | Sync findings + agent KB |
| `authoritative-sources-ai-nonprofits-faith-formation.md` | Complete `MASTER_SOURCES` (if RL-02 partial) |
| `movemental-research-corpus-v1.md` | Findings backup + maintenance metadata |
| `section-1-research-and-references.md` | Footnote backlog export |

---

## 2. Agent KB sync

Compare:

- `docs/articles/graded-high/85-99/ai-research-archive.md`
- `docs/build/agents/agent-room/files/public/ai-research-archive.md`

**Rules:**

- Graded-high wins for content updates
- Preserve agent-room YAML frontmatter (`corpus_id`, `chunking`, `retrieval_priority`)
- Run `movemental-publish-gate` on the merged archive before upload flag stays `true`
- Tier A/B/C study structure must remain machine-parseable for agent retrieval

---

## 3. Corpus v1 maintenance

From `movemental-research-corpus-v1.md`:

- Add code comment in `data.ts`: next verification **November 2026**
- Map VERIFIED / QUALIFIED / NEW / DROP tags to internal maintainer doc (not public UI in v1)
- Optional index stub row:

```typescript
{
  slug: "movemental-research-corpus-v1",
  kind: "Analysis",
  year: 2026,
  title: "Movemental Research Corpus v1",
  abstract: "Citation-quality reference for adoption, governance, and formation stats…",
  readMin: 45,
  sourceCount: 80,
  hasFullBody: false, // PDF / RL-90
}
```

Place in `RESEARCH_ARCHIVE` only.

---

## 4. Section 1 references

`section-1-research-and-references.md`:

- Export claim → source mapping to `src/lib/citations/` backlog if registry exists
- Do **not** publish as reader — link from `/footnotes` or internal docs
- Cross-reference book Section 1 scope in a comment for content team

---

## 5. Authoritative sources router

Add short prose block to `/research/sources` page (Server Component intro):

- Empirical vs ethical vs advocacy layers
- Pointer: "For Movemental's full source-quality rubric, see authoritative-sources…" (internal link or footnote)

---

## 6. Definition of Done

- [x] Agent-room archive matches graded-high archive (diff clean or documented)
- [x] Findings panels trace to archive Tier A studies
- [x] Corpus maintenance date documented
- [x] Section-1 exported to footnote backlog (or issue noted in §10)
- [x] `master_runner.md` RL-07 updated

---

## §10 Attempt log

| Date | Agent | Outcome | Notes |
| --- | --- | --- | --- |
| 2026-06-11 | — | Pack authored | — |
| 2026-06-11 | Cursor | **Done** | Agent KB body synced (graded-high SSOT + agent YAML); `corpus-confidence-tags.md`; `section-1-footnote-backlog.ts`; RESEARCH_ARCHIVE corpus stub; sources three-layer intro; publish gate GREEN on merged archive |
