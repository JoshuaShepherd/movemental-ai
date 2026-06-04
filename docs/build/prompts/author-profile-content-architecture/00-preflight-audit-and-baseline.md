# AP-00 — Preflight audit and baseline

**Prompt ID:** AP-00  
**Target agent:** Cursor / Claude Code  
**Primary repos:** `movemental-ai` + `movemental-visual-editor-main` + **Supabase MCP**  
**Blocks:** none (run first)  
**Last updated:** 2026-06-03

---

## 1. Role and stance

You are a **systems auditor** for the Movemental Author Profile program. This session is **read-only** except for updating [`master_runner.md`](./master_runner.md) and this file’s §10 Attempt log.

Establish a **traffic-light baseline** before any research normalization, ETL, or UI changes. Do not run `research:etl`, `research:publish`, or destructive SQL in this prompt.

Read first:

- [`../../notes/author-profile-content-architecture-proposal.md`](../../notes/author-profile-content-architecture-proposal.md)
- Skill: `.claude/skills/movemental-leader-corpus-upload/SKILL.md` (loader rules)
- Visual-editor: `docs/build/notes/movemental-research-content-supabase-tables.md`

---

## 2. Goal

Produce a **dated baseline report** embedded in §10 that answers:

1. Which leaders have corpus rows, welcome letters, and `network.dossier` keys?
2. Which leaders are **substrate** vs **merged/corpus** (re-ETL safety)?
3. Which on-disk research folders match the canonical tree vs legacy layout?
4. Which `/profile` sections are empty vs wired for **roy-moran** and the merged cohort?

No code changes required unless you find a broken `research:verify` script — fix only blockers that prevent AP-01 from starting.

---

## 3. Context — load-bearing facts

| Item | Value |
| --- | --- |
| Supabase project | `movemental` · ref **`vhaiiiykcukrlyvwlgip`** |
| Research SSOT | `movemental-ai/docs/movement_leader_research/<slug>/` |
| Dashboard / ETL | `movemental-visual-editor-main` |
| Dossier nav SSOT | `visual-editor/src/lib/author-dossier/navigation.ts` |
| JSONB contract | `visual-editor/src/lib/schemas/corpus-schema.ts` |
| Dossier extras map | `visual-editor/src/lib/services/movement-leader-research/dossier-extras.ts` → `DOSSIER_SECTION_FILES` |
| Slug bridge | `organizations.slug` === `movement_leaders.slug` === research folder |

**Two letters (do not conflate):**

| Surface | Storage |
| --- | --- |
| `/profile/a-letter` | `movement_leader_corpus_data.reflected_understanding_md` |
| `/welcome` | `movement_leader_welcome_letters.body_md` |

---

## 4. Definition of Done

- [x] Supabase MCP queries executed (§6) — results captured in §10.
- [x] On-disk folder inventory for **roy-moran** + merged cohort slugs (§7).
- [x] Traffic-light table: 🟢 done / 🟡 partial / 🔴 missing per slug × {core prose, media, dossier extras, welcome, RU}.
- [x] Substrate slugs explicitly flagged **do not re-ETL**.
- [x] `master_runner.md` AP-00 row updated; §10 Attempt log appended here.

---

## 5. Output format

Append to **§10 Attempt log** in this file:

1. **Corpus completeness table** (all leaders with rows).
2. **Roy Moran gap list** — which `DOSSIER_SECTION_FILES` keys are missing in DB vs on disk.
3. **Recommended AP-01 scope** — confirm or narrow file migration list.
4. **Blockers** — anything that must be resolved before AP-01.

Do not create new markdown files unless the operator asks.

---

## 6. Supabase MCP — query pack

Run via `execute_sql` on project **`vhaiiiykcukrlyvwlgip`**.

### 6.1 Corpus completeness

```sql
SELECT ml.slug,
       ml.status,
       mlcd.source_version,
       length(COALESCE(mlcd.reflected_understanding_md, '')) AS ru_len,
       ml.reflected_understanding_endorsed_at IS NOT NULL AS ru_endorsed,
       jsonb_array_length(COALESCE(mlcd.books, '[]'::jsonb)) AS books,
       jsonb_array_length(COALESCE(mlcd.articles, '[]'::jsonb)) AS articles,
       jsonb_array_length(COALESCE(mlcd.audio, '[]'::jsonb)) AS audio,
       jsonb_array_length(COALESCE(mlcd.videos, '[]'::jsonb)) AS videos,
       jsonb_array_length(COALESCE(mlcd.frameworks, '[]'::jsonb)) AS frameworks,
       length(COALESCE(mlcd.identity->>'markdown', '')) AS identity_len,
       length(COALESCE(mlcd.biography->>'markdown', '')) AS bio_len,
       length(COALESCE(mlcd.theology->>'markdown', '')) AS theology_len,
       length(COALESCE(mlcd.calling_profile->>'summary', '')) AS calling_len,
       (SELECT count(*) FROM jsonb_object_keys(COALESCE(mlcd.network->'dossier', '{}'::jsonb))) AS dossier_keys
FROM movement_leaders ml
LEFT JOIN movement_leader_corpus_data mlcd ON mlcd.movement_leader_id = ml.id
ORDER BY ml.slug;
```

### 6.2 Dossier key detail (Roy + cohort)

```sql
SELECT ml.slug, key AS dossier_slug
FROM movement_leaders ml
JOIN movement_leader_corpus_data mlcd ON mlcd.movement_leader_id = ml.id,
     jsonb_object_keys(COALESCE(mlcd.network->'dossier', '{}'::jsonb)) AS key
WHERE ml.slug IN (
  'roy-moran', 'andrew-jones', 'jeremy-chambers', 'peyton-jones',
  'brian-sanders', 'neil-cole', 'dave-ferguson', 'rob-wegner', 'michael-cooper'
)
ORDER BY ml.slug, key;
```

### 6.3 Welcome letters

```sql
SELECT ml.slug, wl.status, wl.word_count, wl.published_at IS NOT NULL AS published
FROM movement_leaders ml
LEFT JOIN movement_leader_welcome_letters wl
  ON wl.movement_leader_id = ml.id AND wl.status = 'published'
ORDER BY ml.slug;
```

### 6.4 Corpus review items (onboarding mirror)

```sql
SELECT o.slug,
       count(*) FILTER (WHERE cri.status = 'pending_review') AS pending,
       count(*) AS total
FROM organizations o
JOIN corpus_review_items cri ON cri.organization_id = o.id
WHERE o.slug IN (
  'roy-moran', 'andrew-jones', 'jeremy-chambers', 'peyton-jones',
  'brian-sanders', 'neil-cole', 'dave-ferguson', 'rob-wegner', 'michael-cooper'
)
GROUP BY o.slug
ORDER BY o.slug;
```

### 6.5 Leader-safe leak scan (all corpus rows)

```sql
SELECT ml.slug
FROM movement_leaders ml
JOIN movement_leader_corpus_data mlcd ON mlcd.movement_leader_id = ml.id
WHERE (
  mlcd.biography::text || mlcd.identity::text || mlcd.calling_profile::text
  || mlcd.theology::text || COALESCE(mlcd.reflected_understanding_md, '')
) ~* '(gap.analysis|movemental.fit|movemental.analysis|recommendation:.{0,4}onboard)'
ORDER BY ml.slug;
```

---

## 7. On-disk inventory commands

From **movemental-ai** repo root:

```bash
SLUG=roy-moran
ROOT=docs/movement_leader_research/$SLUG

echo "=== canonical paths ==="
for p in profile/identity.md profile/biography.md profile/theology.md profile/voice-analysis.md \
  content/books.md content/articles.md content/audio.md content/videos.md content/frameworks.md \
  content/content-audit.md content/academic.md content/courses.md \
  network/organizations.md \
  analysis/audience-analysis.md \
  digital-presence/websites.md digital-presence/platforms.md \
  digital-presence/social-media.md digital-presence/newsletters.md \
  fragmentation-story.md summary.md welcome-letter.md; do
  test -f "$ROOT/$p" && echo "✓ $p" || echo "✗ $p"
done

echo "=== legacy root files ==="
ls -1 "$ROOT"/*.md 2>/dev/null | head -20
```

Repeat for merged cohort slugs (abbreviated — check at minimum `dossier extras` paths).

Cross-check against `DOSSIER_SECTION_FILES` in visual-editor:

```text
visual-editor/src/lib/services/movement-leader-research/dossier-extras.ts
```

Expected keys: `audience-profile`, `web-properties`, `platforms-publishing`, `social-media`, `newsletters`, `academic-work`, `courses-training`, `content-audit`, `the-fragmentation-story`.

---

## 8. Type-safety / architecture notes (no changes this phase)

Confirm these files exist and are the read path for `/profile`:

| Layer | File |
| --- | --- |
| L2b | `src/lib/schemas/corpus-schema.ts` |
| L3 | `src/lib/services/movement-leader-research/dossier-read.ts` |
| L6 mappers | `src/lib/author-dossier/corpus-content.ts` → `resolveSectionMarkdown()` |
| Nav | `src/lib/author-dossier/navigation.ts` |

Run `pnpm typecheck` in visual-editor — record pass/fail in §10 (informational only).

---

## 9. Escalation gates

Stop and record in §10 if:

- **jamie-roach** or other slug lacks org ↔ leader bridge (run `movemental-tenant-provision` before AP-01).
- Leader-safe scan returns rows — flag for scrub before leader-facing QA.
- `source_version` unknown prefix — classify before any ETL.

---

## 10. Attempt log (append-only)

<!-- Agents append dated entries below -->

| Date | Agent | Summary | Blockers |
| --- | --- | --- | --- |
| 2026-06-03 | Cursor | AP-00 preflight complete — Supabase MCP + on-disk inventory + typecheck | None for AP-01 |

### 2026-06-03 — AP-00 baseline report

**Supabase project:** `vhaiiiykcukrlyvwlgip` · **visual-editor typecheck:** ✅ pass

#### 1. Corpus completeness (all leaders with rows)

| slug | source_version | core prose | media (b/a/au/v/fw) | dossier_keys | RU | welcome |
| --- | --- | --- | --- | ---: | --- | --- |
| alan-hirsch | `substrate:7904…` | 🟡 id/bio=0, theo/calling ok | 1/14/40/48/7 | 9 | 2998 | ✅ |
| andrew-jones | `merged:edaec…` | 🟡 theo=0 | 2/11/3/4/6 | 0 | 6936 | ✅ |
| brad-brisco | `substrate:c8c4…` | 🟡 id/bio=0 | 1/29/21/35/5 | 9 | 10335 | ✅ |
| brian-sanders | `merged:35994…` | 🟡 theo=0 | 6/7/6/5/6 | 2 | 5930 | ✅ |
| dave-ferguson | `merged:1b2a4…` | 🟢 | 10/35/31/24/8 | 8 | 6418 | ✅ |
| jamie-roach | `legacy-write:…` | 🔴 empty | 0/0/0/0/0 | 0 | 0 | ✗ |
| jeremy-chambers | `merged:16a58…` | 🟢 | 3/12/5/3/6 | 0 | 6248 | ✅ |
| jr-woodward | `substrate:62358…` | 🟡 id/bio=0 | 1/48/14/28/9 | 8 | 6932 | ✅ |
| liz-rios | `substrate:c0067…` | 🟡 id/bio=0 | 1/18/10/8/6 | 2 | 6604 | ✅ |
| lucas-pulley | `substrate:3587f…` | 🟡 id/bio=0 | 1/12/5/7/6 | 8 | 6761 | ✅ |
| michael-cooper | `corpus:998758…` | 🟢 | 17/5/9/7/8 | 9 | 7012 | ✅ |
| neil-cole | `merged:a3464…` | 🟢 | 14/8/5/12/7 | 8 | 6034 | ✅ |
| peyton-jones | `merged:769c5…` | 🟡 theo=0 | 5/6/7/7/6 | 0 | 6094 | ✅ |
| rob-wegner | `merged:ff70bc…` | 🟢 | 11/20/0/10/9 | 8 | 6623 | ✅ |
| rowland-smith | `merged:03723…` | 🟡 theo=0 | 0/0/0/0/0 | 1 | 0 | ✅ |
| roy-moran | `merged:a4c00…` | 🟢 | 2/6/6/6/6 | 2 | 5953 ✅ endorsed | ✅ |

**ETL safety classification:**

| Class | Slugs | Rule |
| --- | --- | --- |
| **Substrate — SQL only** | `alan-hirsch`, `brad-brisco`, `jr-woodward`, `liz-rios`, `lucas-pulley` | `source_version` prefix `substrate:` — never `research:etl` |
| **Merged/corpus — safe re-ETL** | `roy-moran`, `andrew-jones`, `jeremy-chambers`, `peyton-jones`, `brian-sanders`, `neil-cole`, `dave-ferguson`, `rob-wegner`, `michael-cooper` | `merged:` or `corpus:` prefix |
| **Legacy / out of scope** | `jamie-roach` (`legacy-write:`), `rowland-smith` (minimal corpus) | Provision / scrub separately |

#### 2. Traffic-light — cohort × dimension

| slug | core prose | media | dossier extras | welcome | RU |
| --- | --- | --- | --- | --- | --- |
| **roy-moran** | 🟢 | 🟢 | 🔴 2/9 | 🟢 | 🟢 |
| andrew-jones | 🟡 | 🟢 | 🔴 0/9 | 🟢 | 🟢 |
| jeremy-chambers | 🟢 | 🟢 | 🔴 0/9 | 🟢 | 🟢 |
| peyton-jones | 🟡 | 🟢 | 🔴 0/9 | 🟢 | 🟢 |
| brian-sanders | 🟡 | 🟢 | 🔴 2/9 | 🟢 | 🟢 |
| neil-cole | 🟢 | 🟢 | 🟢 8/9 | 🟢 | 🟢 |
| dave-ferguson | 🟢 | 🟢 | 🟢 8/9 | 🟢 | 🟢 |
| rob-wegner | 🟢 | 🟡 audio=0 | 🟢 8/9 | 🟢 | 🟢 |
| michael-cooper | 🟢 | 🟢 | 🟢 9/9 | 🟢 | 🟢 |

#### 3. Roy Moran — `DOSSIER_SECTION_FILES` gap list

| key | canonical path | on disk | in DB |
| --- | --- | --- | --- |
| `audience-profile` | `analysis/audience-analysis.md` | ✗ (legacy `ROY_MORAN_AUDIENCE_PROFILE.md`) | ✗ |
| `web-properties` | `digital-presence/websites.md` | ✗ | ✗ |
| `platforms-publishing` | `digital-presence/platforms.md` | ✗ | ✗ |
| `social-media` | `digital-presence/social-media.md` | ✗ | ✗ |
| `newsletters` | `digital-presence/newsletters.md` | ✗ | ✗ |
| `academic-work` | `content/academic.md` | ✗ | ✗ |
| `courses-training` | `content/courses.md` | ✗ | ✗ |
| `content-audit` | `content/content-audit.md` | ✗ (legacy `ROY_MORAN_CONTENT_AUDIT.md`) | ✅ |
| `the-fragmentation-story` | `fragmentation-story.md` | ✅ | ✅ |

**On-disk canonical tree:** 12/21 paths present; 9 dossier-extra paths missing (theology ✗ but loaded via profile elsewhere).

#### 4. Dossier keys in DB (merged cohort detail)

| slug | keys present |
| --- | --- |
| roy-moran | `content-audit`, `the-fragmentation-story` |
| andrew-jones | *(none)* |
| jeremy-chambers | *(none)* |
| peyton-jones | *(none)* |
| brian-sanders | `social-media`, `web-properties` |
| neil-cole | 8 keys (missing `content-audit`) |
| dave-ferguson | 8 keys (missing `content-audit`) |
| rob-wegner | 8 keys (missing `content-audit`) |
| michael-cooper | 9 keys (complete) |

#### 5. Welcome letters

All cohort slugs have **published** welcome letters (~1018–1100 words). Exception: `jamie-roach` — no row.

#### 6. Corpus review items (onboarding mirror)

| slug | pending | total |
| --- | ---: | ---: |
| roy-moran | 0 | 20 |
| andrew-jones | 19 | 19 |
| jeremy-chambers | 21 | 21 |
| peyton-jones | 25 | 25 |
| brian-sanders | 24 | 24 |
| neil-cole | 37 | 37 |
| dave-ferguson | 40 | 40 |
| rob-wegner | 31 | 31 |
| michael-cooper | 38 | 38 |

Roy is the only slug with zero pending review items.

#### 7. Leader-safe leak scan

**1 row flagged:** `rowland-smith` (staff terms in corpus prose). **Cohort slugs: zero rows.** Scrub before any leader-facing QA on rowland-smith; not in AP-01 scope.

#### 8. Architecture files (visual-editor) — confirmed

| Layer | File | Status |
| --- | --- | --- |
| L2b | `src/lib/schemas/corpus-schema.ts` | ✅ exists |
| L3 | `src/lib/services/movement-leader-research/dossier-read.ts` | ✅ exists |
| L6 | `src/lib/author-dossier/corpus-content.ts` | ✅ exists |
| Nav | `src/lib/author-dossier/navigation.ts` | ✅ exists |
| Extras map | `src/lib/services/movement-leader-research/dossier-extras.ts` | ✅ 9 keys |

#### 9. Recommended AP-01 scope

Confirm AP-01 as written. Priority file migrations for `roy-moran`:

1. `ROY_MORAN_AUDIENCE_PROFILE.md` → leader-safe `analysis/audience-analysis.md`
2. Extract digital presence from `ROY_MORAN_AUTHOR_PROFILE.md` / audit → `digital-presence/*.md` (4 files)
3. Leader-safe excerpt → `content/content-audit.md`
4. Evaluate academic/courses from legacy profiles — create or document intentional absence
5. ETL + wire → target **≥7 dossier keys** in Supabase

#### 10. Blockers before AP-01

| Item | Severity | Action |
| --- | --- | --- |
| None for roy-moran | — | AP-01 may start |
| `rowland-smith` leader-safe leak | Low (out of sprint) | Scrub before QA |
| `jamie-roach` empty corpus | Low (out of sprint) | `movemental-tenant-provision` if needed |
| Substrate leaders id/bio=0 in DB | Info | Expected — prose in theology/calling; AP-05 handles SQL patches |
