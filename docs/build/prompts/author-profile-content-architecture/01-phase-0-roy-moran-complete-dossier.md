# AP-01 — Phase 0: Roy Moran complete dossier

**Prompt ID:** AP-01  
**Target agent:** Cursor / Claude Code  
**Primary repos:** `movemental-ai` (research files) + `movemental-visual-editor-main` (ETL/publish/verify)  
**Requires:** [AP-00](./00-preflight-audit-and-baseline.md) baseline complete  
**Slug scope:** `roy-moran` only  
**Last updated:** 2026-06-03

---

## 1. Role and stance

You are implementing the **template leader dossier** for Roy Moran. Roy is on the **safe merged/corpus ETL path** — full `research:etl` is allowed.

Goals:

1. Normalize on-disk research to the **canonical tree**.
2. Load all **dossier extras** into `network.dossier`.
3. Verify leader-safe content and populated `/profile` sections.

Read before acting:

- Skill: `movemental-leader-corpus-upload` (full file → column map)
- [`../../notes/author-profile-content-architecture-proposal.md`](../../notes/author-profile-content-architecture-proposal.md) — Appendix A
- Visual-editor: `src/lib/services/movement-leader-research/dossier-extras.ts`

---

## 2. Goal

Roy Moran’s Author Profile shows **real content** (not skeletons) for every section that has research on disk. Minimum outcomes:

| Section area | Target |
| --- | --- |
| Parts I–III | Already populated — verify unchanged |
| Part IV media + frameworks | Populated from `content/*` |
| Part IV–V dossier extras | `network.dossier` contains all keys with on-disk sources |
| Part VI | Fragmentation story + A Letter populated |
| Leader-safe | No staff-only sections in leader-visible columns |

---

## 3. Context — Roy-specific gaps (baseline 2026-06-03)

| Gap | On disk | In Supabase | Fix |
| --- | --- | --- | --- |
| Audience profile | `ROY_MORAN_AUDIENCE_PROFILE.md` (legacy) | ✗ | Leader-safe extract → `analysis/audience-analysis.md` |
| Digital presence | Partial in author profile / audit | ✗ | Create `digital-presence/*.md` |
| Content audit | Legacy `ROY_MORAN_CONTENT_AUDIT.md` | partial | Canonical `content/content-audit.md` (leader-safe excerpt) |
| Academic / courses | Unknown | ✗ | Author from research or omit + document hide |
| Dossier extras count | — | **2 keys** | ETL → target **≥7 keys** (all files that exist) |

**Do not** set `reflected_understanding_endorsed_at` unless operator explicitly asks (already endorsed for Roy).

---

## 4. Definition of Done

### movemental-ai (research)

- [x] `analysis/audience-analysis.md` exists — leader-safe; no TAM/commerce/gap-analysis blocks.
- [x] `digital-presence/websites.md`, `platforms.md`, `social-media.md`, `newsletters.md` created where research supports content.
- [x] `content/content-audit.md` exists (leader-safe excerpt from legacy audit).
- [x] `content/academic.md` and/or `content/courses.md` created **or** documented as intentionally absent.
- [x] Legacy root files retained for staff reference (do not delete `ROY_MORAN_*` without operator approval).

### visual-editor (pipeline)

- [x] From visual-editor with `.env.local`:

  ```bash
  pnpm research:etl -- --slug=roy-moran
  pnpm research:publish -- --slug=roy-moran --unlock
  pnpm research:verify -- --slug=roy-moran
  ```

- [x] ETL merged dossier extras automatically (`buildDossierExtrasFromFiles` in `corpus-etl.ts`); `research:wire-dossier` not required.

### Supabase MCP

- [x] `dossier_keys` ≥ 7 for `roy-moran` — **9 keys** (all `DOSSIER_SECTION_FILES`).
- [x] Leader-safe regex returns **zero rows** for `roy-moran`.
- [x] `corpus_review_items` count unchanged (20 total, 0 pending).

### Browser

- [ ] `/profile?org=roy-moran` — Parts I–III and VI render prose.
- [ ] Previously empty Part IV–V sections with new files show content (not “awaiting-etl-wiring”).
- [ ] Console clean.

*(Browser QA deferred — Chrome DevTools MCP unavailable in WSL environment; dev server confirmed ready on :3000.)*

### Runner

- [x] [`master_runner.md`](./master_runner.md) AP-01 row updated; §10 appended here.

---

## 5. Output format

- **Research commits** in `movemental-ai` (new markdown under `docs/movement_leader_research/roy-moran/`).
- **ETL/script changes** in `visual-editor` only if canonical paths need new fallback parsers (prefer file normalization first).
- Append implementation notes to **§10**.

---

## 6. Approach — research normalization

### Step 1 — Leader-safe extraction rules

When migrating from legacy `ROY_MORAN_*.md`:

- **Include:** audience description, platforms used, content inventory summaries, web properties, social presence facts.
- **Exclude:** Gap Analysis, Movemental Fit, Movemental Recommendation, Audience TAM, Commerce recommendations, internal scores.
- Use `stripStaffSections()` logic from visual-editor `markdown.ts` as reference — headings matching staff patterns must not appear in leader files.

### Step 2 — Target file templates

**`analysis/audience-analysis.md`** — prose sections: who they serve, how they find Roy, primary channels. No market sizing tables labeled TAM.

**`digital-presence/websites.md`** — owned sites, church/org URLs, blog.

**`digital-presence/platforms.md`** — publishing platforms (Substack, Amazon, podcast hosts, etc.).

**`digital-presence/social-media.md`** — handles, activity level, follower counts if verified.

**`digital-presence/newsletters.md`** — if none, state clearly (“No confirmed newsletter as of …”) — still a valid leader-safe page.

**`content/content-audit.md`** — leader-safe inventory summary (formats, volume, gaps in their own words — not Movemental sales copy).

### Step 3 — Quality bar

Use `michael-cooper/` and `dave-ferguson/` dossier extras as tone/structure references. Ground claims in existing Roy research — no fabricated URLs or dates.

---

## 7. Approach — ETL and verification

### Layer touch map (visual-editor)

| Layer | May touch? | Files |
| --- | --- | --- |
| L1 | No | — |
| L2b | Only if new shapes | `corpus-schema.ts` |
| L3 | If ETL gaps | `corpus-etl.ts`, `dossier-extras.ts`, `markdown.ts` |
| L6 | No | UI reads mappers automatically after DB update |

### Verify SQL (post-ETL)

```sql
SELECT ml.slug,
       (SELECT count(*) FROM jsonb_object_keys(COALESCE(mlcd.network->'dossier', '{}'::jsonb))) AS dossier_keys,
       (SELECT array_agg(key ORDER BY key)
        FROM jsonb_object_keys(COALESCE(mlcd.network->'dossier', '{}'::jsonb)) AS key) AS keys
FROM movement_leaders ml
JOIN movement_leader_corpus_data mlcd ON mlcd.movement_leader_id = ml.id
WHERE ml.slug = 'roy-moran';
```

Expected keys (minimum when files exist):  
`audience-profile`, `web-properties`, `platforms-publishing`, `social-media`, `newsletters`, `content-audit`, `the-fragmentation-story`  
Plus optional: `academic-work`, `courses-training`.

### Tests

```bash
cd movemental-visual-editor-main
pnpm typecheck
pnpm test:run tests/unit/author-dossier/corpus-content.test.ts
```

---

## 8. Hard rules

1. **Roy is merged/corpus** — re-ETL is safe; still preserve `calling_profile` / `reflected_understanding_md` if files empty (ETL should already).
2. **Never** put staff-only research into `identity`, `biography`, `theology`, `calling_profile`, `reflected_understanding_md`, or `network.dossier` values.
3. **Do not** merge welcome letter into corpus or `/profile/a-letter`.
4. **Do not** modify `movement_leaders.reflected_understanding_endorsed_at` without operator request.

---

## 9. Regression checks

- `/welcome` still loads Roy’s welcome letter from `movement_leader_welcome_letters`.
- `/onboarding/corpus` review items still list books/articles/audio/video.
- Other leaders’ corpus rows untouched.

---

## 10. Attempt log (append-only)

| Date | Agent | Summary | dossier_keys | MCP leader-safe | Browser |
| --- | --- | --- | --- | --- | --- |
| 2026-06-03 | Cursor | Normalized 7 canonical research files; ETL/publish/verify green | **9** (all keys) | ✅ zero rows | ⏸ Chrome unavailable in WSL |

### Files created (movemental-ai)

| Path | Source |
| --- | --- |
| `analysis/audience-analysis.md` | Leader-safe extract from `ROY_MORAN_AUDIENCE_PROFILE.md` (segments, consumption map; no TAM/Movemental mapping) |
| `digital-presence/websites.md` | Author profile + content audit platform inventory |
| `digital-presence/platforms.md` | Books, podcast, blog, video, speaking platforms |
| `digital-presence/social-media.md` | LinkedIn, Facebook, YouTube gap |
| `digital-presence/newsletters.md` | Confirmed none |
| `content/content-audit.md` | Leader-safe inventory (no gap-analysis / Movemental roadmap sections) |
| `content/academic.md` | DTS ThM + boards; no peer-reviewed output |
| `content/courses.md` | Mercy Alliance, Trout Lake, Gnowbe certs |

Legacy `ROY_MORAN_*.md` files retained unchanged.

### Pipeline

```text
pnpm research:etl -- --slug=roy-moran        → ok (merged:9cc08eab33fb8487)
pnpm research:publish -- --slug=roy-moran --unlock → corpus=20
pnpm research:verify -- --slug=roy-moran     → All checks passed
pnpm typecheck                               → pass
```

### Supabase post-ETL

```sql
-- dossier_keys = 9
-- keys: academic-work, audience-profile, content-audit, courses-training,
--       newsletters, platforms-publishing, social-media,
--       the-fragmentation-story, web-properties
-- corpus_review_items: 20 total, 0 pending
-- leader-safe scan: 0 rows for roy-moran
```
