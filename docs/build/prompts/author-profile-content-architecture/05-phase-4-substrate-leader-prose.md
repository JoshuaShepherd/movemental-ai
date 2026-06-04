# AP-05 — Phase 4: Substrate leader profile prose (SQL-only)

**Prompt ID:** AP-05  
**Target agent:** Cursor / Claude Code  
**Primary repos:** `movemental-visual-editor-main` + **Supabase MCP** (+ movemental-ai for on-disk source files)  
**Requires:** [AP-00](./00-preflight-audit-and-baseline.md)  
**May parallel:** AP-02/AP-03 after AP-00  
**Last updated:** 2026-06-03

---

## 1. Role and stance

Fill **identity**, **biography**, and missing **dossier extras** for **substrate leaders** without running full `research:etl`.

Substrate leaders carry rich media in JSONB from historical loaders. Re-ETL **silently wipes** `videos`, `audio`, `frameworks`, and often `calling_profile`.

**Allowed:** targeted SQL `UPDATE` of specific JSONB columns; `wire-dossier-extras`; manual markdown injection from on-disk research.

**Forbidden:** `pnpm research:etl -- --slug=alan-hirsch` (and any substrate slug).

Read: skill `movemental-leader-corpus-upload` — substrate rules section.

---

## 2. Goal

Substrate leaders show profile prose in `/profile` Parts I–II comparable to merged leaders, without losing media richness.

**Substrate slug scope:**

| Slug | `source_version` prefix | Priority gap (baseline) |
| --- | --- | --- |
| `alan-hirsch` | `substrate:` | identity/bio empty; dossier extras ✅ (9 keys) |
| `brad-brisco` | `substrate:` | identity/bio empty; wire dossier if gaps |
| `jr-woodward` | `substrate:` | identity/bio empty |
| `liz-rios` | `substrate:` | identity/bio empty |
| `lucas-pulley` | `substrate:` | identity/bio empty |

---

## 3. Context

### Where substrate content may live

1. On-disk research: `movemental-ai/docs/movement_leader_research/<slug>/profile/`
2. Legacy column: `movement_leader_corpus_data.substrate_md` (large blob — extract sections, do not expose whole blob in UI)
3. `movement_leaders.bio_short` / `bio_long` (parallel — may copy into corpus if appropriate)

### Target columns for SQL patch

| Column | Source |
| --- | --- |
| `identity` | `profile/identity.md` → `{ "markdown": "..." }` |
| `biography` | `profile/biography.md` |
| `theology` | already populated for some — patch only if empty |
| `network.dossier` | run `wire-dossier-extras` from files — merges into existing `network` jsonb |

**Do not patch:** `books`, `articles`, `audio`, `videos`, `frameworks` arrays unless operator explicitly requests and you have a reproducible source.

---

## 4. Definition of Done

Per substrate slug:

- [ ] `length(identity->>'markdown')` > 500 **or** documented intentional short identity.
- [ ] `length(biography->>'markdown')` > 500 **or** documented gap.
- [ ] `dossier_keys` ≥ 7 when on-disk extras exist (wire-dossier-extras).
- [ ] Leader-safe regex: **zero rows**.
- [ ] `source_version` prefix still `substrate:` — unchanged.
- [ ] Media array lengths **unchanged** from AP-00 baseline (±0):

  ```sql
  -- Capture BEFORE and AFTER for each slug
  SELECT slug, books, articles, audio, videos, frameworks
  FROM (... AP-00 completeness query ...) t
  WHERE slug = 'alan-hirsch';
  ```

### Browser

- [ ] `?org=alan-hirsch` — Author Profile + Biography sections show prose (not empty skeleton).

### Runner

- [ ] [`master_runner.md`](./master_runner.md) AP-05 updated; §10 matrix per slug.

---

## 5. Output format

- SQL patch script(s) in visual-editor: `scripts/sql/` or documented MCP `execute_sql` statements in §10 (prefer checked-in SQL file for repeatability).
- Optional on-disk research commits in movemental-ai if `profile/identity.md` missing.
- **No** ETL script changes that auto-run full re-ETL on substrate slugs.

---

## 6. Approach

### Step 1 — Baseline lock (MCP)

For each substrate slug, record:

```sql
SELECT ml.slug,
       mlcd.source_version,
       jsonb_array_length(COALESCE(mlcd.books, '[]'::jsonb)) AS books,
       jsonb_array_length(COALESCE(mlcd.articles, '[]'::jsonb)) AS articles,
       jsonb_array_length(COALESCE(mlcd.audio, '[]'::jsonb)) AS audio,
       jsonb_array_length(COALESCE(mlcd.videos, '[]'::jsonb)) AS videos,
       jsonb_array_length(COALESCE(mlcd.frameworks, '[]'::jsonb)) AS frameworks,
       length(COALESCE(mlcd.identity->>'markdown', '')) AS identity_len,
       length(COALESCE(mlcd.biography->>'markdown', '')) AS bio_len
FROM movement_leaders ml
JOIN movement_leader_corpus_data mlcd ON mlcd.movement_leader_id = ml.id
WHERE ml.slug IN ('alan-hirsch','brad-brisco','jr-woodward','liz-rios','lucas-pulley');
```

Save counts in §10 — **after work, counts must match**.

### Step 2 — Author or locate markdown

If `profile/identity.md` / `profile/biography.md` missing on disk, author from public research or extract leader-safe sections from `substrate_md` using a one-off script:

```bash
# Example — adapt to repo script if exists
pnpm exec tsx scripts/extract-substrate-section.ts -- --slug=alan-hirsch --section=identity
```

Prefer human-reviewed markdown files in movemental-ai over blind substrate extraction.

### Step 3 — Targeted SQL UPDATE

Pattern (parameterized — run via MCP or migration):

```sql
UPDATE movement_leader_corpus_data mlcd
SET identity = jsonb_build_object('markdown', $identity_md),
    biography = jsonb_build_object('markdown', $bio_md),
    last_synced_at = now()
FROM movement_leaders ml
WHERE mlcd.movement_leader_id = ml.id
  AND ml.slug = $slug;
```

Run `stripStaffSections()` on strings **before** UPDATE (use visual-editor `markdown.ts` in a tsx script — do not hand-strip in SQL).

### Step 4 — Dossier extras without full ETL

```bash
pnpm exec tsx scripts/wire-dossier-extras.ts -- --slug=alan-hirsch
```

This should merge `network.dossier` keys without touching media arrays. **Verify** script behavior in source before running — if script re-ETLs, stop and patch script first.

### Step 5 — Post-verify

Re-run leader-safe scan + media count equality + browser QA.

---

## 7. Layer / safety checklist

| Check | Required |
| --- | --- |
| No `research:etl` on substrate slugs | ✅ |
| Media counts unchanged | ✅ |
| Leader-safe content | ✅ |
| `pnpm typecheck` if scripts touched | ✅ |
| `get_advisors` if new SQL functions/policies | Only if DDL |

---

## 8. Alan Hirsch special case

Alan is the reference tenant for product CMS overlap — **do not** merge product `books` table into corpus in this prompt.

Alan already has 9 dossier keys — focus on **identity + biography** prose columns.

Reflected understanding (`reflected_understanding_md`) is short in baseline (~3k chars) — optional refresh from `reflected-understanding/alan-hirsch.md` via **SQL update of that column only**, not re-ETL.

---

## 9. Rollback plan

Before UPDATE, export current column values:

```sql
SELECT ml.slug, mlcd.identity, mlcd.biography
FROM movement_leader_corpus_data mlcd
JOIN movement_leaders ml ON ml.id = mlcd.movement_leader_id
WHERE ml.slug = $slug;
```

Store JSON in §10 or temp file for rollback.

---

## 10. Hard rules

1. **Never** full re-ETL substrate leaders.
2. **Never** truncate `substrate_md`.
3. Patch **one column at a time** when debugging — easier rollback.
4. Do not set `reflected_understanding_endorsed_at` without operator request.

---

## 11. Attempt log (append-only)

| Date | Agent | Slug | Columns patched | Media Δ | dossier_keys | Leader-safe |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-06-03 | Cursor | alan-hirsch | identity, biography | 0 | 9 | ✅ |
| 2026-06-03 | Cursor | brad-brisco | identity, biography | 0 | 9 | ✅ |
| 2026-06-03 | Cursor | jr-woodward | identity, biography | 0 | 8 | ✅ |
| 2026-06-03 | Cursor | liz-rios | identity, biography; dossier wire | 0 | 2 | ✅ (thin on-disk — no digital-presence/ analysis paths) |
| 2026-06-03 | Cursor | lucas-pulley | identity, biography (re-patch after movemental-fit scrub) | 0 | 8 | ✅ |

**Baseline → after media (books/articles/audio/videos/frameworks):** unchanged for all five slugs. `source_version` prefixes remain `substrate:*`.

**Scripts added:** `movemental-visual-editor-main/scripts/patch-substrate-prose.ts`, `pnpm research:patch-substrate`, `scripts/sql/20260603_substrate_identity_biography_patch.sql`.

**On-disk fix:** `lucas-pulley/profile/identity.md` — removed staff `movemental-fit` link; `stripStaffSections` now matches `movemental-fit` hyphen form.
