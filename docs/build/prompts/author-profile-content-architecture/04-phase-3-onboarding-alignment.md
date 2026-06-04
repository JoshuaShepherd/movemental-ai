# AP-04 — Phase 3: Onboarding alignment (corpus review mirror)

**Prompt ID:** AP-04  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-visual-editor-main`  
**Requires:** [AP-01](./01-phase-0-roy-moran-complete-dossier.md) (corpus populated for at least Roy + one cohort slug)  
**May parallel:** [AP-03](./03-phase-2-nav-simplification.md)  
**Last updated:** 2026-06-03

---

## 1. Role and stance

Align **onboarding corpus review** with the Author Profile SSOT so leaders never see different book/article/audio/video lists in `/onboarding/corpus` vs `/profile`.

Treat `corpus_review_items` as a **derived projection** of `movement_leader_corpus_data` media arrays — regenerated on publish, not a second catalog editors maintain by hand.

Read before acting:

- `src/lib/services/movement-leader-research/publish-onboarding-slices.ts`
- Skill: `movemental-leader-corpus-upload`
- Visual-editor: `docs/build/notes/movemental-research-content-supabase-tables.md` — Tier 3

---

## 2. Goal

When `research:publish` runs for a slug:

1. **Delete** existing `corpus_review_items` for that org (or item types being republished).
2. **Insert** fresh rows from `movement_leader_corpus_data.{books,articles,audio,videos}` with stable `movemental_compiled_data` shape.
3. Counts in onboarding match counts in Author Profile bibliography/media sections.

Secondary: clarify in onboarding UI copy that **Welcome letter ≠ A Letter** (reflected understanding).

---

## 3. Context

### Current redundancy

| Store | Role |
| --- | --- |
| `movement_leader_corpus_data.books[]` etc. | SSOT — `/profile` |
| `corpus_review_items` | Onboarding approve/reject UX |
| Product CMS | Published catalog — separate bounded context |

### Live drift symptoms

- Review items `pending_review` while profile shows catalogs (OK) but **title counts differ** (not OK).
- Manual SQL or partial publish left orphan review rows.

### Item payload keys (existing)

`movemental_compiled_data`: `title`, `sourcePath`, `year`, `reference`, `link`, `summary`, `role`

---

## 4. Definition of Done

### L3 publish service

- [x] `publish-onboarding-slices.ts` (or equivalent) **replaces** review items idempotently per org when `--unlock` or dedicated `--replace-corpus-review` flag runs. *Always on publish; transactional delete+insert.*
- [x] Mapping from `CorpusMediaItem` → `movemental_compiled_data` is single function — `corpusMediaItemToCompiledData()` in `corpus-review-sync.logic.ts`.
- [x] Leader feedback preserved **only** when operator opts in (default: reset on full replace — `--preserve-approvals` flag). Documented in §10.

### Verification

- [x] For `roy-moran` after publish: counts match per type (see §10 table).
- [x] `pnpm research:verify` still passes for touched slugs.

### Onboarding copy (L6 — minimal)

- [x] One clarifying line on `/onboarding/reflected-understanding` or corpus step: reflected understanding is **`/profile/a-letter`**, not the welcome letter at `/welcome`.
- [x] No redesign of onboarding stepper — copy-only unless broken.

### Tests

- [x] Unit test: `corpusMediaToReviewItem()` (or extracted pure function) — `corpus-review-sync.test.ts`.
- [x] `pnpm typecheck` clean.
- [ ] `pnpm test:run` green. *Blocked: Vitest ESM/`encoding-lite` env error (pre-existing).*

### Runner

- [x] [`master_runner.md`](./master_runner.md) AP-04 updated; §10 appended.

---

## 5. Output format

- PR in visual-editor: publish service + tests + optional onboarding copy.
- No movemental-ai changes unless documenting runbook.
- §10: before/after count table for 2+ slugs.

---

## 6. Approach

### Step 1 — Extract pure mapper (L3)

```typescript
// Pure function — testable without DB
export function corpusMediaItemsToReviewRows(
  items: CorpusMediaItem[],
  itemType: 'book' | 'article' | 'audio' | 'video',
  organizationId: string,
): CorpusReviewItemInsert[] { ... }
```

Place in `publish-onboarding-slices.ts` or `corpus-review-sync.logic.ts`.

### Step 2 — Replace transaction

Within publish flow for org:

```text
BEGIN
  DELETE FROM corpus_review_items WHERE organization_id = $org AND item_type IN (...)
  INSERT ... SELECT from parsed corpus arrays
COMMIT
```

Use Drizzle transaction pattern already in repo.

### Step 3 — Preserve approvals (decision)

**Default for this prompt:** full replace resets status to `pending_review` — matches fresh research publish.

If product requires preserve: match on `title` + `item_type` and carry `leader_feedback` — document if implemented.

### Step 4 — Re-run publish for cohort

```bash
for slug in roy-moran andrew-jones jeremy-chambers; do
  pnpm research:publish -- --slug=$slug --unlock
done
```

Supabase MCP verify counts.

---

## 7. Layer checklist

| Layer | Action |
| --- | --- |
| L1 | No DDL |
| L2b | Use existing `CorpusMediaItem` from `corpus-schema.ts` |
| L3 | **Publish service** — primary |
| L4 | Only if new admin API endpoint |
| L6 | Copy tweak optional |

```bash
pnpm typecheck
pnpm test:run   # include new unit tests
pnpm services:check
```

### Supabase MCP post-check

```sql
SELECT o.slug, cri.item_type, count(*) AS n
FROM corpus_review_items cri
JOIN organizations o ON o.id = cri.organization_id
WHERE o.slug IN ('roy-moran', 'michael-cooper')
GROUP BY o.slug, cri.item_type
ORDER BY o.slug, cri.item_type;
```

Compare to corpus array lengths query from §4.

---

## 8. Hard rules

1. Do not merge `corpus_review_items` into corpus JSONB — direction is corpus → review only.
2. Do not read product CMS tables in publish slice.
3. Substrate leaders: publish may refresh review items from **existing** corpus arrays without re-ETL.
4. Run `get_advisors` only if SQL/RLS policies change (unexpected in this prompt).

---

## 9. Regression

- `/onboarding/corpus` UI still loads and allows approve/reject.
- `/profile` bibliographies unchanged except from prior phases.
- `onboarding_tasks` for `review_corpus` still completable.

---

## 10. Attempt log (append-only)

| Date | Agent | PR | Slugs republished | Count parity | Tests |
| --- | --- | --- | --- | --- | --- |
| 2026-06-03 | Cursor | — | roy-moran, andrew-jones, jeremy-chambers, alan-hirsch | ✅ all 5 checked slugs (see below) | typecheck ✅; vitest ESM blocked |

**Count parity after publish** (corpus array length = review row count per type):

| Slug | books | articles | audio | video | parity |
| --- | --- | --- | --- | --- | --- |
| roy-moran | 2/2 | 6/6 | 6/6 | 6/6 | ✅ |
| andrew-jones | 2/2 | 11/11 | 3/3 | 4/4 | ✅ |
| jeremy-chambers | 3/3 | 12/12 | 5/5 | 3/3 | ✅ |
| michael-cooper | 17/17 | 5/5 | 0/0 | 0/0 | ✅ |
| alan-hirsch | 1/1 | 14/14 | 40/40 | 48/48 | ✅ |

**Behavior:** Default publish = transactional full replace, all rows `pending_review`. `--preserve-approvals` keeps leader decisions matched by `item_type` + title. Removed 18/10/10/10 caps and 40-item ceiling. Substrate bibliography blobs (no `title`, has `section`) normalize to one review row per array element.
