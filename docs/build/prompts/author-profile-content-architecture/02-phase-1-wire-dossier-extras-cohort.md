# AP-02 — Phase 1: Wire dossier extras for merged/corpus cohort

**Prompt ID:** AP-02  
**Target agent:** Cursor / Claude Code  
**Primary repos:** `movemental-ai` + `movemental-visual-editor-main`  
**Requires:** [AP-01](./01-phase-0-roy-moran-complete-dossier.md) complete (Roy = pattern)  
**Slug scope:** merged/corpus leaders only  
**Last updated:** 2026-06-03

---

## 1. Role and stance

Apply the **Roy Moran pattern** to the merged/corpus cohort: canonical on-disk files → ETL → populated `network.dossier` → verified `/profile` Part IV–V sections.

**Never** run full `research:etl` on substrate leaders (`alan-hirsch`, `brad-brisco`, `jr-woodward`, `liz-rios`, `lucas-pulley`) — defer to [AP-05](./05-phase-4-substrate-leader-prose.md).

---

## 2. Goal

For each slug in scope, Part IV–V dossier sections stop showing **“awaiting-etl-wiring”** when leader-safe research exists on disk.

**Target slugs:**

`andrew-jones`, `jeremy-chambers`, `peyton-jones`, `brian-sanders`, `neil-cole`, `dave-ferguson`, `rob-wegner`, `michael-cooper`

(`michael-cooper` may already have 9 keys — verify only.)

---

## 3. Context

### Canonical dossier extra paths

From `dossier-extras.ts` → `DOSSIER_SECTION_FILES`:

| Nav slug | Relative path |
| --- | --- |
| `audience-profile` | `analysis/audience-analysis.md` |
| `web-properties` | `digital-presence/websites.md` |
| `platforms-publishing` | `digital-presence/platforms.md` |
| `social-media` | `digital-presence/social-media.md` |
| `newsletters` | `digital-presence/newsletters.md` |
| `academic-work` | `content/academic.md` |
| `courses-training` | `content/courses.md` |
| `content-audit` | `content/content-audit.md` or `{SLUG}_CONTENT_AUDIT.md` |
| `the-fragmentation-story` | `fragmentation-story.md` |

### Legacy file fallback (implement in ETL if missing)

Many cohort folders use root-level naming:

```text
{SLUG_ENV}_AUDIENCE_PROFILE.md
{SLUG_ENV}_CONTENT_AUDIT.md
{SLUG_ENV}_AUTHOR_PROFILE.md  → extract digital-presence sections
```

Where `SLUG_ENV = slug.toUpperCase().replace(/-/g, '_')`.

**Prefer canonical paths** — add ETL fallbacks only when migration is blocked.

---

## 4. Definition of Done

Per slug (or batch with slug loop):

### movemental-ai

- [x] Traffic-light from AP-00 addressed: 🔴/🟡 folders upgraded to canonical tree where research exists.
- [x] Leader-safe markdown for each dossier extra file that will be shown.
- [x] Staff-only content stays in legacy files or excluded basenames — not in leader paths.

### visual-editor

- [x] Optional: extend `dossier-extras.ts` / `corpus-etl.ts` with legacy fallback readers (if canonical migration incomplete). *Not needed — canonical paths sufficient.*
- [x] Per slug:

  ```bash
  pnpm research:etl -- --slug=<slug>
  pnpm research:publish -- --slug=<slug> --unlock
  pnpm research:verify -- --slug=<slug>
  ```

- [x] `wire-dossier-extras` run if ETL does not populate `network.dossier`. *Not needed — ETL populated dossier.*

### Supabase MCP

- [x] Each slug: `dossier_keys` matches count of on-disk extra files (≥ 5 for leaders with digital-presence research). **9/9** for all 9 merged cohort slugs (incl. roy-moran).
- [x] Leader-safe regex: **zero rows** for all touched slugs (includes `network::text` for dossier JSONB).
- [x] `source_version` still `merged:` or `corpus:` — not corrupted to empty media arrays.

### Browser spot-check

- [ ] Sample 2 slugs (one thin, one rich) — Part V sections render. *Deferred — Chrome DevTools MCP unavailable in WSL.*
- [ ] Empty sections only where files intentionally absent. *Deferred with browser QA.*

### Runner

- [x] [`master_runner.md`](./master_runner.md) AP-02 updated; §11 per-slug matrix.

---

## 5. Output format

- Batch research commits in movemental-ai.
- Single ETL improvement PR in visual-editor (if fallback logic added).
- §10 table: slug × files created × dossier_keys × verify pass/fail.

---

## 6. Recommended execution order

Process **thinnest packets first** (validates pipeline):

1. `andrew-jones`, `jeremy-chambers`, `peyton-jones`
2. `brian-sanders`, `rob-wegner`
3. `neil-cole`, `dave-ferguson`
4. `michael-cooper` (verify-only unless gaps found)

One slug per commit series when authoring research; ETL can batch.

---

## 7. Approach — per slug workflow

```text
1. AP-00-style disk inventory for slug
2. Author/migrate missing canonical files (leader-safe)
3. research:etl → publish → verify
4. Supabase: dossier key list + leader-safe
5. Browser: ?org=<slug> Part IV–V walkthrough
6. Record in §10
```

### Thin-packet leaders (andrew-jones, jeremy-chambers, peyton-jones)

May need **expanded research** before extras — use Michael Cooper README 13-phase pattern for minimum viable:

- `profile/*` (if missing)
- `content/*` catalogs
- `fragmentation-story.md`
- `analysis/audience-analysis.md` (abbreviated OK if leader-safe)
- `digital-presence/*` (can be short factual stubs with verified URLs only)

Do not block on perfection — block on **leader-safe wiring**.

---

## 8. Layer / type-safety (visual-editor)

| Change type | Layer | Action |
| --- | --- | --- |
| New markdown only | — | movemental-ai only |
| Legacy path fallback | L3 | `dossier-extras.ts`, maybe `markdown.ts` |
| New JSONB field shape | L2b | `corpus-schema.ts` + unit tests |
| Schema DDL | L1 | **Avoid** — out of scope unless operator approves |

After code changes:

```bash
pnpm typecheck
pnpm test:run tests/unit/author-dossier/
pnpm services:check   # if available
```

---

## 9. Supabase batch audit (post-run)

```sql
SELECT ml.slug,
       mlcd.source_version,
       (SELECT count(*) FROM jsonb_object_keys(COALESCE(mlcd.network->'dossier', '{}'::jsonb))) AS dossier_keys
FROM movement_leaders ml
JOIN movement_leader_corpus_data mlcd ON mlcd.movement_leader_id = ml.id
WHERE ml.slug IN (
  'andrew-jones','jeremy-chambers','peyton-jones','brian-sanders',
  'neil-cole','dave-ferguson','rob-wegner','michael-cooper'
)
ORDER BY ml.slug;
```

---

## 10. Hard rules

1. **Substrate slugs excluded** from `research:etl` in this prompt.
2. Idempotent upsert — re-run must not drop `reflected_understanding_md` or `calling_profile`.
3. Do not edit `src/components/ui/*`.
4. `pnpm` only.

---

## 11. Attempt log (append-only)

| Date | Agent | Slug | Files added | dossier_keys | verify | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-06-03 | Cursor | andrew-jones | 9 canonical (audience, 4× digital-presence, content-audit, academic, courses, fragmentation-story) | 9 | pass | Thin packet; merged source |
| 2026-06-03 | Cursor | jeremy-chambers | 9 canonical (same tree) | 9 | pass | Thin packet; merged source |
| 2026-06-03 | Cursor | peyton-jones | 9 canonical (same tree) | 9 | pass | Thin packet; merged source |
| 2026-06-03 | Cursor | brian-sanders | 7 new (+ existing websites, social-media) | 9 | pass | merged source |
| 2026-06-03 | Cursor | neil-cole | content-audit; scrubbed fragmentation-story staff file refs | 9 | pass | Re-ETL after scrub; merged source |
| 2026-06-03 | Cursor | dave-ferguson | content-audit (leader-safe summary) | 9 | pass | Rich pre-existing tree; merged source |
| 2026-06-03 | Cursor | rob-wegner | content-audit; scrubbed fragmentation-story staff refs | 9 | pass | Re-ETL after scrub; merged source |
| 2026-06-03 | Cursor | michael-cooper | content-audit; removed Movemental section from fragmentation-story | 9 | pass | Re-ETL after scrub; corpus source |
