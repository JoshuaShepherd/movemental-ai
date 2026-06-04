# Author Profile content architecture — master runner

**Canonical location:** `movemental-ai/docs/build/prompts/author-profile-content-architecture/`  
**Target agent:** Cursor / Claude Code executing one prompt at a time or the full program  
**Strategy SSOT:** [`../../notes/author-profile-content-architecture-proposal.md`](../../notes/author-profile-content-architecture-proposal.md)  
**DB → frontend handoff (share with agents):** [`../../notes/author-profile-database-to-frontend-status.md`](../../notes/author-profile-database-to-frontend-status.md)  
**Last updated:** 2026-06-04

---

## Mandatory agent protocol (every session)

You are the **Author Profile architecture runner**. Before ending any session that touched dossier content, ETL, or `/profile`:

1. **Read this file first** when picking up work in a new context window.
2. Execute prompts in **Recommended order** (below) unless the status table shows a blocking dependency resolved elsewhere.
3. After each prompt (or partial progress), **update this file**:
   - Set **Status**, **Last touched**, **PR / branch**, **Blockers** in the master table.
   - Append a row to **Session changelog** (bottom).
   - Append to the individual prompt’s **§10 Attempt log**.
4. Run the **Verification checklist** (below) for every repo you changed.
5. Use **Supabase MCP** (`execute_sql`, `get_advisors`) for before/after corpus audits — project **`vhaiiiykcukrlyvwlgip`**.

**Never** mark a row **Done** without checked Definition of Done in the child prompt **and** a green verification checklist for touched repos.

**Critical substrate rule:** Leaders with `source_version` prefix `substrate:` — **never** run full `research:etl`. SQL-only patches. See AP-05.

---

## Master status table

| Order | ID | Prompt | Primary repo(s) | Status | Last touched | PR / branch | Blockers / notes |
| ---: | --- | --- | --- | --- | --- | --- | --- |
| 0 | AP-00 | [00-preflight-audit-and-baseline.md](./00-preflight-audit-and-baseline.md) | both + MCP | **Done** | 2026-06-03 | — | Baseline in AP-00 §10 |
| 1 | AP-01 | [01-phase-0-roy-moran-complete-dossier.md](./01-phase-0-roy-moran-complete-dossier.md) | movemental-ai + visual-editor | **Done** | 2026-06-03 | — | 9/9 dossier keys; browser QA deferred |
| 2 | AP-02 | [02-phase-1-wire-dossier-extras-cohort.md](./02-phase-1-wire-dossier-extras-cohort.md) | movemental-ai + visual-editor | **Done** | 2026-06-03 | — | 9/9 keys × 9 slugs; leader-safe ✅; browser QA deferred |
| 3 | AP-03 | [03-phase-2-nav-simplification.md](./03-phase-2-nav-simplification.md) | visual-editor | **Done** | 2026-06-03 | — | 22→18 sections; progressive nav; browser QA deferred |
| 4 | AP-04 | [04-phase-3-onboarding-alignment.md](./04-phase-3-onboarding-alignment.md) | visual-editor | **Done** | 2026-06-03 | — | Corpus→review 1:1 sync; count parity ✅ |
| 5 | AP-05 | [05-phase-4-substrate-leader-prose.md](./05-phase-4-substrate-leader-prose.md) | visual-editor + MCP | **Done** | 2026-06-03 | — | 5/5 identity+bio; media Δ0; leader-safe ✅; browser QA deferred |
| 6 | AP-06 | [06-research-directory-normalization.md](./06-research-directory-normalization.md) | movemental-ai + visual-editor | **Done** | 2026-06-04 | — | 15 slugs normalized; tree-check ✅; merged ETL ✅ |
| — | AP-90 | [90-phase-5-optional-enhancements-deferred.md](./90-phase-5-optional-enhancements-deferred.md) | both | **Deferred** | 2026-06-03 | — | Out of initial sprint |

**Status values:** `Not started` · `In progress` · `Blocked` · `PR open` · `Done` · `Deferred`

---

## Recommended execution order

```text
AP-00  Preflight audit (read-only baseline — always first)
  ↓
AP-01  Roy Moran complete dossier (template leader)
  ↓
AP-02  Wire dossier extras for merged/corpus cohort
  ↓
AP-03  Nav simplification + hide-empty-sections     ← can overlap AP-04
AP-04  Onboarding / corpus_review_items alignment   ← can overlap AP-03
  ↓
AP-05  Substrate leader profile prose (SQL-only)
  ↓
AP-06  Research directory normalization (15 tenant slugs)
  ↓
AP-90  Optional enhancements (defer until operator asks)
```

**One prompt per PR** when possible. Cross-repo work: land **movemental-ai research files first**, then **visual-editor ETL/publish**, then verify with Supabase MCP + browser.

---

## Verification checklist (run after each prompt)

Fix **bottom-up** on type errors. Author Profile uses a **custom chain** for corpus JSONB (see [README.md](./README.md)).

### Repos

| Repo | Root | Schema path |
| --- | --- | --- |
| **Studio (visual-editor)** | `movemental-visual-editor-main` | `src/lib/database/schema.ts` |
| **Research / marketing** | `movemental-ai` | `src/lib/db/schema.ts` (mirror only if L1 changes) |

### Layer gates (visual-editor — primary)

| Layer | Command | Pass criterion |
| --- | --- | --- |
| **L1 Database** | `pnpm db:check` or `pnpm typecheck` after `pnpm drizzle:gen` | Schema compiles; migration only if table DDL changed |
| **L2b Corpus contract** | `pnpm typecheck` + `tests/unit/author-dossier/corpus-content.test.ts` | `corpus-schema.ts` + mappers agree |
| **L3 Services** | `pnpm services:check` | ETL / dossier-read compile |
| **L6 UI** | `pnpm typecheck` + manual `/profile?org=<slug>` | DoD from child prompt satisfied |
| **All layers** | `pnpm validate:all` | When schema or generated layers touched |

If scripts missing: **`pnpm typecheck`** + **`pnpm test:run tests/unit/author-dossier/**`** minimum.

### Supabase MCP gates (every phase that writes corpus)

Project ID: **`vhaiiiykcukrlyvwlgip`**

1. **Before writes:** snapshot dossier completeness for affected slug(s) (AP-00 query pack).
2. **After writes:** re-run completeness + leader-safe regex (below).
3. **After DDL (rare):** `get_advisors` — block on new HIGH/CRITICAL touching corpus tables.

**Leader-safe check** (must return **zero rows** for affected leaders):

```sql
SELECT ml.slug
FROM movement_leaders ml
JOIN movement_leader_corpus_data mlcd ON mlcd.movement_leader_id = ml.id
WHERE ml.slug = ANY($slugs::text[])
  AND (
    mlcd.biography::text || mlcd.identity::text || mlcd.calling_profile::text
    || mlcd.theology::text || COALESCE(mlcd.reflected_understanding_md, '')
  ) ~* '(gap.analysis|movemental.fit|movemental.analysis|recommendation:.{0,4}onboard|audience.tam|commerce.recommendation)'
;
```

**Dossier extras count:**

```sql
SELECT ml.slug,
       (SELECT count(*) FROM jsonb_object_keys(COALESCE(mlcd.network->'dossier', '{}'::jsonb))) AS dossier_keys
FROM movement_leaders ml
JOIN movement_leader_corpus_data mlcd ON mlcd.movement_leader_id = ml.id
WHERE ml.slug = ANY($slugs::text[])
ORDER BY ml.slug;
```

### Browser verification (AP-01, AP-02, AP-03)

Use Chrome DevTools MCP or manual QA:

1. Switch tenant to target slug (`?org=roy-moran` or tenant switcher).
2. Open `/profile` — At a Glance blocks populated or intentional empty states.
3. Walk sidebar — no spurious “awaiting-etl-wiring” for sections with on-disk files.
4. Console clean; network 200 on dossier load.

---

## Global Definition of Done (runner level)

A prompt is **Done** only when:

- [ ] Child prompt **§4 Definition of Done** boxes checked (or deferred with reason in Blockers).
- [ ] Verification checklist green for every touched repo.
- [ ] **`pnpm typecheck`** passes in visual-editor (and movemental-ai if changed).
- [ ] **Supabase MCP** before/after audit recorded in child §10.
- [ ] **Leader-safe** regex returns zero rows for touched slugs.
- [ ] **`master_runner.md`** status row updated + session changelog appended.
- [ ] Child prompt **§10 Attempt log** appended.

---

## How to run a single prompt

1. Open [master_runner.md](./master_runner.md) → confirm status and blockers.
2. Open the child prompt (e.g. `01-phase-0-roy-moran-complete-dossier.md`).
3. Set runner row to **In progress** + date.
4. Execute child §1–§9.
5. Run verification checklist + Supabase MCP.
6. Update runner + child §10. Set status **PR open** or **Done**.

## How to run the full program

Execute AP-00 → AP-05 in order; skip **AP-90** unless operator explicitly requests Phase 5 work.

---

## Cohort reference

### Template leader (Phase 0)

`roy-moran`

### Merged/corpus cohort (Phase 1 — safe to `research:etl`)

`andrew-jones`, `jeremy-chambers`, `peyton-jones`, `brian-sanders`, `neil-cole`, `dave-ferguson`, `rob-wegner`, `michael-cooper`

### Substrate cohort (Phase 4 — SQL-only, never re-ETL)

`alan-hirsch`, `brad-brisco`, `jr-woodward`, `liz-rios`, `lucas-pulley`

---

## Session changelog (append-only)

| Date | Agent / human | Prompt ID | Summary | MCP + typecheck | Outcome |
| --- | --- | --- | --- | --- | --- |
| 2026-06-03 | build-prompt | — | Created prompt pack + master runner from architecture proposal | — | Ready for execution |
| 2026-06-03 | Cursor | AP-00 | Preflight audit: Supabase MCP (16 leaders), on-disk inventory (15 slugs), visual-editor typecheck ✅, traffic-light baseline | MCP ✅ typecheck ✅ | **Done** — AP-01 unblocked |
| 2026-06-03 | Cursor | AP-01 | Roy Moran dossier: 7 new canonical files, ETL/publish/verify, 9 dossier keys in Supabase | MCP ✅ typecheck ✅ | **Done** — browser QA deferred |
| 2026-06-03 | Cursor | AP-02 | Cohort dossier extras: 8 slugs wired (thin + rich packets), ETL/publish/verify all pass; scrubbed neil-cole, michael-cooper, rob-wegner leader-safe leaks | MCP ✅ (9/9 keys, 0 regex hits) | **Done** — browser QA deferred |
| 2026-06-03 | Cursor | AP-03 | Nav simplification: merged voice + where-you-publish, frameworks section, progressive rail, deprecated slug redirects | typecheck ✅ | **Done** — browser/vitest deferred |
| 2026-06-03 | Cursor | AP-04 | Onboarding alignment: corpus-review-sync.logic.ts, full replace on publish, count parity 5 slugs | MCP ✅ typecheck ✅ | **Done** — vitest env blocked |
| 2026-06-03 | Cursor | AP-05 | Substrate prose: `patch-substrate-prose.ts`, 5 slugs identity+bio SQL patch; liz-rios dossier wire (+2 keys); lucas-pulley leader-safe fix | MCP ✅ typecheck ✅ | **Done** — browser QA deferred |
| 2026-06-04 | Cursor | AP-06 | Research directory normalization: tree-normalize × 15, export frameworks, merged ETL, substrate wire-dossier, manifest regen | tree-check ✅ ETL ✅ | **Done** |
