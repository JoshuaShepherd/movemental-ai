# Movement Leader Research — Directory Normalization Plan

**Date:** 2026-06-04  
**Audience:** Agents executing research file migration + optional ETL path updates  
**Scope:** All **tenant cohort** leaders with corpus rows in Supabase — **15 slugs** (excludes `jamie-roach`)  
**Master template:** `docs/movement_leader_research/alan-hirsch/`  
**Sidebar SSOT:** `movemental-visual-editor-main/src/lib/author-dossier/navigation.ts` (18 sections + At a Glance)  
**ETL SSOT:** `movemental-visual-editor-main/src/lib/services/movement-leader-research/` (`corpus-etl.ts`, `dossier-extras.ts`)  
**Related sprint:** [`author-profile-content-architecture/master_runner.md`](./author-profile-content-architecture/master_runner.md) (AP-00 → AP-05 complete)

---

## 1. Purpose

Normalize on-disk research so that:

1. **Every sidebar section** has a predictable file home (populated, empty stub, or intentionally absent with documented reason).
2. **Alan Hirsch** defines the **full master file manifest** — other leaders mirror the same tree; missing research becomes an **empty markdown file** so gaps are visible at a glance.
3. **All existing content is migrated** — nothing deleted until verified in canonical location; non-dashboard material moves to `_staff/` or `_misc/`.
4. **Redundant legacy files** (duplicate prose, deprecated nav slots) are stripped **after** content is merged into canonical files.
5. On-disk layout stays **ETL-compatible** with the Author Profile pipeline unless/until a paired visual-editor path-map change ships.

This document is the **plan only**. Do not execute bulk moves in the same session as writing the plan unless the operator explicitly asks.

---

## 2. Tenant cohort (in scope)

These slugs have `movement_leader_corpus_data` rows and org ↔ leader bridge (per AP-00 baseline). **`jamie-roach` is out of scope** (`legacy-write:`, empty corpus).

| Slug | ETL class | Notes |
| --- | --- | --- |
| `alan-hirsch` | **substrate** — never `research:etl` | Master template; richest historical research |
| `brad-brisco` | substrate | |
| `jr-woodward` | substrate | |
| `liz-rios` | substrate | Thin on-disk; many stubs expected |
| `lucas-pulley` | substrate | |
| `roy-moran` | merged | Phase 0 template leader |
| `andrew-jones` | merged | |
| `jeremy-chambers` | merged | |
| `peyton-jones` | merged | |
| `brian-sanders` | merged | |
| `neil-cole` | merged | |
| `dave-ferguson` | merged | |
| `rob-wegner` | merged | |
| `michael-cooper` | corpus | Most complete dossier extras on disk |
| `rowland-smith` | merged | Minimal corpus; leader-safe scrub needed before QA |

**Shared (not per-slug folder):**

| Path | Sidebar / pipeline |
| --- | --- |
| `reflected-understanding/<slug>.md` | **A Letter** (`/profile/a-letter`) |
| `reflected-understanding/README.md` | Operator docs only |

---

## 3. Sidebar → directory → file → database mapping

The Author Profile rail has **18 sections** (post AP-03). Directories group by **narrative part**; **filenames** match sidebar intent. This matches the ETL tree already wired in AP-01/AP-02.

### 3.1 Navigation manifest (target on-disk tree)

```text
docs/movement_leader_research/<slug>/
├── README.md                          # Per-slug sidebar manifest (see §3.3)
├── _tracker.md                        # Research ops (optional)
├── sources.md                         # Citations index (optional)
│
├── profile/                           # Part I–III core prose
│   ├── identity.md                    # → author-profile (identity column)
│   ├── biography.md                   # → biography
│   ├── theology.md                    # → theological-profile
│   ├── voice-analysis.md              # → voice-editorial-identity
│   └── calling-profile.md             # → vocational-profile (NEW canonical name)
│
├── summary.md                         # → vocational-profile (exec summary paragraph)
│
├── network/
│   └── organizations.md               # → author-profile (affiliations table)
│
├── content/                           # Part IV body of work
│   ├── books.md                       # → bibliography
│   ├── frameworks.md                  # → frameworks
│   ├── articles.md                    # → articles-blog-posts
│   ├── audio.md                       # → audio-podcast
│   ├── videos.md                      # → video-content
│   ├── content-audit.md               # → content-audit (network.dossier)
│   ├── academic.md                    # → academic-work (network.dossier)
│   └── courses.md                     # → courses-training (network.dossier)
│
├── analysis/
│   └── audience-analysis.md           # → audience-profile (network.dossier)
│
├── digital-presence/                  # Part V (UI merges first three → where-you-publish)
│   ├── websites.md                    # → where-you-publish (H2 block)
│   ├── platforms.md                   # → where-you-publish (H2 block)
│   ├── newsletters.md                 # → where-you-publish (H2 block)
│   └── social-media.md                # → social-media
│
├── fragmentation-story.md             # → the-fragmentation-story (network.dossier)
│
├── welcome-letter.md                  # → /welcome only (NOT sidebar)
│
├── _staff/                            # Operator-only — never ETL to leader-visible columns
│   ├── gap-analysis.md
│   ├── movemental-fit.md
│   ├── movemental-analysis.md
│   ├── competitive-landscape.md
│   ├── content-marketing-playbook.md
│   ├── identity-verification.md
│   ├── hirsch-affinity-rubric.md      # Alan-specific; generic leaders omit
│   └── legacy/                        # Archived {SLUG}_*.md after merge verified
│
└── _misc/                             # Collateral — not Author Profile sidebar
    ├── committed-voice.md
    ├── media/                         # press, citations, reviews
    ├── network/                       # collaborators, endorsements, events (At a Glance inputs)
    ├── collated/                      # HTML bundles, manifests
    ├── pdf/
    └── digital-presence-discovery.md  # Raw discovery notes pre-extraction
```

**A Letter** stays at `reflected-understanding/<slug>.md` (shared folder). Optionally add per-slug stub:

```text
<slug>/a-letter.md   # Single line: "See ../reflected-understanding/<slug>.md"
```

### 3.2 Complete sidebar crosswalk

| Part | Sidebar slug | UI title | Canonical file(s) | Supabase destination |
| --- | --- | --- | --- | --- |
| — | *(home)* | At a Glance | *derived* from `summary.md`, media arrays, `voice_analysis`, `network.sections[]` | Multiple columns |
| I | `author-profile` | Author Profile | `profile/identity.md` + `network/organizations.md` | `identity` + `organizations[]` |
| I | `biography` | Biography | `profile/biography.md` | `biography` |
| II | `theological-profile` | Theological Profile | `profile/theology.md` | `theology` |
| II | `vocational-profile` | Vocational Profile | `summary.md` + `profile/calling-profile.md` | `calling_profile` |
| III | `voice-editorial-identity` | Voice & Editorial Identity | `profile/voice-analysis.md` | `voice_analysis` |
| IV | `bibliography` | Bibliography | `content/books.md` | `books[]` |
| IV | `frameworks` | Frameworks | `content/frameworks.md` | `frameworks[]` |
| IV | `articles-blog-posts` | Articles & Blog Posts | `content/articles.md` | `articles[]` |
| IV | `audio-podcast` | Audio & Podcast | `content/audio.md` | `audio[]` |
| IV | `video-content` | Video Content | `content/videos.md` | `videos[]` |
| IV | `content-audit` | Content Audit | `content/content-audit.md` | `network.dossier['content-audit']` |
| IV | `academic-work` | Academic Work | `content/academic.md` | `network.dossier['academic-work']` |
| IV | `courses-training` | Courses & Training | `content/courses.md` | `network.dossier['courses-training']` |
| V | `audience-profile` | Audience & Reach | `analysis/audience-analysis.md` | `network.dossier['audience-profile']` |
| V | `where-you-publish` | Where You Publish | `digital-presence/websites.md` + `platforms.md` + `newsletters.md` | `network.dossier` keys merged in UI |
| V | `social-media` | Social Media | `digital-presence/social-media.md` | `network.dossier['social-media']` |
| VI | `the-fragmentation-story` | The Fragmentation Story | `fragmentation-story.md` | `network.dossier['the-fragmentation-story']` |
| VI | `a-letter` | A Letter | `reflected-understanding/<slug>.md` | `reflected_understanding_md` |
| — | *(onboarding)* | Welcome | `welcome-letter.md` | `movement_leader_welcome_letters` |

**Deprecated nav slugs** (redirect only — do not author separate files): `voice-analysis`, `voice-identity`, `editorial-bio-research`, `content-analysis`, `web-properties`, `platforms-publishing`, `newsletters`.

### 3.3 Per-slug `README.md` sidebar manifest (required)

After normalization, each slug folder gets a `README.md` table:

```markdown
| Sidebar slug | File | Status |
| --- | --- | --- |
| author-profile | profile/identity.md | populated |
| biography | profile/biography.md | populated |
| theological-profile | profile/theology.md | empty |
| … | … | populated \| empty \| staff-only \| misc |
```

**Status values:**

- `populated` — leader-safe content present
- `empty` — intentional stub (see §6)
- `staff-only` — lives in `_staff/`; not ETL'd to leader columns
- `misc` — lives in `_misc/`; supports research but not dossier section
- `n/a` — documented reason (e.g. Liz Rios: no separate theology research)

---

## 4. Master template — Alan Hirsch file manifest

Alan is the **widest** research packet. Every other tenant slug should contain **the same file paths**, with empty stubs where research does not exist.

### 4.1 Sidebar files (26 paths + welcome + RU)

| File | Alan today | Action for Alan |
| --- | --- | --- |
| `profile/identity.md` | ✅ populated | Keep; merge any unique prose from `ALAN_HIRSCH_AUTHOR_PROFILE.md` then archive legacy |
| `profile/biography.md` | ✅ populated | Keep; merge `biography.md` (root duplicate) then remove root |
| `profile/theology.md` | ✅ populated | Keep |
| `profile/voice-analysis.md` | ✅ populated | Keep |
| `profile/calling-profile.md` | ✗ (legacy root) | **Create** from `ALAN_HIRSCH_CALLING_PROFILE.md` |
| `summary.md` | ✅ populated | Keep |
| `network/organizations.md` | ✅ populated | Keep; merge `ALAN_HIRSCH_ORGS.md` then archive |
| `content/books.md` | ✅ populated | Keep |
| `content/frameworks.md` | ✗ missing on disk | **Create** from substrate DB export OR author from `content/` + books research; substrate has 7 frameworks in DB |
| `content/articles.md` | ✅ populated | Keep |
| `content/audio.md` | ✅ populated | Keep |
| `content/videos.md` | ✅ populated | Keep |
| `content/content-audit.md` | ✗ missing | **Create** leader-safe excerpt from `ALAN_HIRSCH_CONTENT_AUDIT.md` |
| `content/academic.md` | ✅ populated | Keep |
| `content/courses.md` | ✅ populated | Keep |
| `analysis/audience-analysis.md` | ✅ populated | Keep; merge leader-safe parts from `ALAN_HIRSCH_AUDIENCE_PROFILE.md` |
| `digital-presence/websites.md` | ✅ populated | Keep |
| `digital-presence/platforms.md` | ✅ populated | Keep |
| `digital-presence/newsletters.md` | ✅ populated | Keep |
| `digital-presence/social-media.md` | ✅ populated | Keep |
| `fragmentation-story.md` | ✅ populated | Keep |
| `reflected-understanding/alan-hirsch.md` | ✅ populated | Keep in shared folder |
| `welcome-letter.md` | ✅ populated | Keep |

### 4.2 Alan-only depth → `_staff/` and `_misc/`

| Current path | Destination | Reason |
| --- | --- | --- |
| `analysis/gap-analysis.md`, root `gap-analysis.md` | `_staff/gap-analysis.md` | Staff-only |
| `analysis/movemental-fit.md` | `_staff/movemental-fit.md` | Staff-only |
| `movemental-analysis.md` | `_staff/movemental-analysis.md` | Staff-only |
| `analysis/competitive-landscape.md` | `_staff/competitive-landscape.md` | Staff-only |
| `analysis/content-analysis.md` | `_misc/analysis-content-analysis.md` | Duplicates bibliography stats |
| `content-marketing-playbook.md` (+ `.pdf`) | `_staff/content-marketing-playbook.md` | Operator playbook |
| `hirsch-affinity-rubric.md`, `hirsch-affinity-ranked-list.md` | `_staff/` | Alan-specific scoring |
| `identity-verification.md` | `_staff/identity-verification.md` | Operator QA |
| `committed-voice.md` | `_misc/committed-voice.md` | Ecosystem roster, not dossier |
| `network/collaborators.md`, `endorsements.md`, `events.md` | `_misc/network/` | At a Glance graph inputs, not sidebar prose |
| `media/*` | `_misc/media/` | Press/citations — not nav sections |
| `collated/`, `pdf/`, `*.html` | `_misc/collated/`, `_misc/pdf/` | Delivery artifacts |
| `digital-presence-discovery.md` | `_misc/digital-presence-discovery.md` | Raw notes |
| `ALAN_HIRSCH_*.md` (legacy root) | `_staff/legacy/` after merge | Redundant once canonical populated |
| `ALAN_HIRSCH_RESEARCH_COLLATED.*` | `_misc/collated/` | HTML/MD bundles |
| `AUTHOR_PROFILE_PRESENTATION_STANDARDS.md` | `_staff/legacy/` | Meta standards doc |
| Root `content-analysis.md`, `biography.md` | Merge → canonical, then delete | Duplicate paths |

---

## 5. Content migration rules

### 5.1 Leader-safe extraction (mandatory)

When migrating from legacy `{SLUG}_*.md` or staff analysis files into canonical sidebar files:

**Include:** factual audience description, platform inventory, content catalogs, affiliations, vocational narrative, theological prose, voice characteristics.

**Exclude (move to `_staff/` or strip):** Gap Analysis, Movemental Fit, Movemental Recommendation, Audience TAM, commerce recommendations, onboarding scores, internal rubrics.

Reference: `stripStaffSections()` in visual-editor `markdown.ts`; AP-01 Step 1.

### 5.2 Redundancy stripping (after merge verified)

| Pattern | Keep | Remove / archive |
| --- | --- | --- |
| `{SLUG}_AUTHOR_PROFILE.md` vs `profile/identity.md` | Canonical `profile/identity.md` | Legacy → `_staff/legacy/` |
| `{SLUG}_AUDIENCE_PROFILE.md` vs `analysis/audience-analysis.md` | Canonical analysis file | Legacy after leader-safe merge |
| `{SLUG}_CONTENT_AUDIT.md` vs `content/content-audit.md` | Canonical content-audit | Legacy after excerpt |
| `{SLUG}_CALLING_PROFILE.md` vs `profile/calling-profile.md` | **Rename to** `profile/calling-profile.md` | Legacy root name |
| Root `biography.md` vs `profile/biography.md` | `profile/biography.md` | Root duplicate |
| Root `gap-analysis.md` + `analysis/gap-analysis.md` | One copy in `_staff/` | Delete duplicate |
| `{SLUG}_VOICE_IDENTITY.md` vs `profile/voice-analysis.md` | `profile/voice-analysis.md` | Legacy voice file |
| Collated HTML/MD bundles | `_misc/collated/` | Never ETL |

**Rule:** Never delete until `git diff` shows canonical file contains merged content and `research:verify -- --slug=…` passes (merged cohort) or manual leader-safe review passes (substrate).

### 5.3 Special consolidations

#### Vocational profile

- `summary.md` — first paragraph → `calling_profile.summary` (ETL)
- `profile/calling-profile.md` — full calling narrative (migrate from `{SLUG}_CALLING_PROFILE.md`)
- If no separate calling file exists (e.g. `jr-woodward`): populate `calling-profile.md` from `summary.md` extended sections OR leave stub with pointer in README

#### Where You Publish

UI merges three dossier keys. On disk, **keep three files** under `digital-presence/` (ETL expects separate keys). Do not author a single `where-you-publish.md` on disk unless ETL is updated.

#### Liz Rios thin packet

- `digital-presence.md` (single file) → **split** into `digital-presence/websites.md`, `platforms.md`, `newsletters.md`, `social-media.md`
- `network/affiliations.md` → merge into `network/organizations.md`
- `network/endorsers.md`, `movemental-overlap.md` → `_misc/network/`
- `content/content-audit.md` exists — extend pattern for other missing stubs

#### Rowland Smith

- Leader-safe scrub required before any ETL (AP-00 flagged regex hits)
- Create full stub tree; populate only identity, biography, fragmentation-story, summary, welcome-letter
- **Create** `reflected-understanding/rowland-smith.md` stub or author RU before `/profile/a-letter` QA

---

## 6. Empty file policy

For every canonical path in §3.1 that a leader lacks:

1. **Create the file** with YAML frontmatter + one-line placeholder:

```markdown
---
status: empty
sidebar: theological-profile
---

<!-- Intentionally empty: no theological profile research on file for {Leader Name}. -->
```

2. Record `empty` in slug `README.md` manifest.
3. **Do not** fabricate research to fill stubs.
4. Substrate leaders with rich **DB-only** media (e.g. Alan frameworks in JSONB but missing `content/frameworks.md`): export from Supabase or author from existing research — prefer **export** to avoid drift.

### 6.1 Per-slug empty stub checklist (2026-06-04 baseline)

Legend: **·** = file exists with content · **○** = create empty stub · **→** = migrate/create from legacy

| Canonical file | alan | roy | brad | jr | liz | lucas | andrew | jeremy | peyton | brian | neil | dave | rob | michael | rowland |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `profile/identity.md` | · | · | · | · | · | · | · | · | · | · | · | · | · | · | · |
| `profile/biography.md` | · | · | · | · | · | · | · | · | · | · | · | · | · | · | · |
| `profile/theology.md` | · | ○ | · | · | ○ | · | ○ | · | ○ | ○ | · | · | · | · | ○ |
| `profile/voice-analysis.md` | · | · | · | · | · | · | · | · | · | · | · | · | · | · | ○ |
| `profile/calling-profile.md` | → | → | → | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | → | ○ |
| `summary.md` | · | · | · | · | · | · | · | · | · | · | · | · | · | · | · |
| `network/organizations.md` | · | · | · | · | → | · | · | · | · | · | · | · | · | · | · |
| `content/books.md` | · | · | · | · | ○ | · | · | · | · | · | · | · | · | · | ○ |
| `content/frameworks.md` | → | · | → | → | ○ | → | · | · | · | · | · | · | · | · | ○ |
| `content/articles.md` | · | · | · | · | ○ | · | · | · | · | · | · | · | · | · | ○ |
| `content/audio.md` | · | · | · | · | ○ | · | · | · | · | · | · | · | · | · | ○ |
| `content/videos.md` | · | · | · | · | ○ | · | · | · | · | · | · | · | · | · | ○ |
| `content/content-audit.md` | → | · | → | → | · | → | · | · | · | · | · | · | · | · | ○ |
| `content/academic.md` | · | · | · | · | ○ | · | · | · | · | · | · | · | · | · | ○ |
| `content/courses.md` | · | · | · | · | ○ | · | · | · | · | · | · | · | · | · | ○ |
| `analysis/audience-analysis.md` | · | · | · | · | → | · | · | · | · | · | · | · | · | · | ○ |
| `digital-presence/websites.md` | · | · | · | · | → | · | · | · | · | · | · | · | · | · | ○ |
| `digital-presence/platforms.md` | · | · | · | · | → | · | · | · | · | · | · | · | · | · | ○ |
| `digital-presence/newsletters.md` | · | · | · | · | → | · | · | · | · | · | · | · | · | · | ○ |
| `digital-presence/social-media.md` | · | · | · | · | → | · | · | · | · | · | · | · | · | · | ○ |
| `fragmentation-story.md` | · | · | · | · | · | · | · | · | · | · | · | · | · | · | · |
| `reflected-understanding/<slug>.md` | · | · | · | · | · | · | · | · | · | · | · | · | · | · | ○ |
| `welcome-letter.md` | · | · | · | · | · | · | · | · | · | · | · | · | · | · | · |

**Priority migrations (→):** Alan/brad/jr/lucas frameworks + content-audit; all `{SLUG}_CALLING_PROFILE.md` → `profile/calling-profile.md`; Liz digital-presence split; rowland RU stub.

---

## 7. Execution phases

Run **one slug per PR** when possible. Order: normalize files in `movemental-ai` first, then pipeline in `movemental-visual-editor-main`.

### Phase 0 — Tooling prep (visual-editor, optional but recommended)

| Task | File | Change |
| --- | --- | --- |
| Add `profile/calling-profile.md` parser path | `corpus-etl.ts` | Prefer `profile/calling-profile.md`, fallback `{SLUG}_CALLING_PROFILE.md` |
| Document `_staff/` exclusion | `corpus-etl.ts` / `RESEARCH_EXCLUDE` | Skip `_staff/**`, `_misc/**` |
| Validation script | `movemental-ai/scripts/validate-research-tree.ts` (new) | Assert 26 canonical paths exist per tenant slug |

### Phase 1 — Alan Hirsch master normalization

1. Create missing canonical files (§4.1).
2. Move staff/misc per §4.2.
3. Merge legacy `ALAN_HIRSCH_*` into canonical; archive to `_staff/legacy/`.
4. Write `alan-hirsch/README.md` manifest.
5. **Do not** `research:etl`. Use `research:wire-dossier` for new dossier files only; SQL patch for identity/bio if needed.

### Phase 2 — Substrate cohort parity

Slugs: `brad-brisco`, `jr-woodward`, `liz-rios`, `lucas-pulley`

- Mirror Alan tree (empty stubs where needed).
- Same `_staff/` / `_misc/` moves as Alan pattern.
- `research:wire-dossier` for new dossier markdown only.
- `research:patch-substrate` only if identity/bio edits needed.

### Phase 3 — Merged cohort parity

Slugs: `roy-moran`, `andrew-jones`, `jeremy-chambers`, `peyton-jones`, `brian-sanders`, `neil-cole`, `dave-ferguson`, `rob-wegner`, `michael-cooper`, `rowland-smith`

1. Complete stub tree + legacy merges.
2. Leader-safe scrub (`rowland-smith` first).
3. Per slug:

```bash
pnpm research:etl -- --slug=<slug>
pnpm research:publish -- --slug=<slug> --unlock
pnpm research:verify -- --slug=<slug>
```

4. Supabase MCP: `dossier_keys` = count of populated dossier files (not stubs); leader-safe regex = 0 rows.

### Phase 4 — Legacy cleanup

After verify passes for a slug:

- Remove duplicate root files (content merged).
- Keep `_staff/legacy/` for audit trail unless operator approves delete.
- Update `docs/movement_leader_research/manifest.json` via existing generator if present.

### Phase 5 — Manifest regeneration

- Add `pnpm research:tree-check` (or extend validate script) to CI / pre-ETL gate.
- Optional: symlink or generate `_sidebar-manifest.json` for dashboard tooling.

---

## 8. Verification checklist (per slug)

### On-disk

- [ ] All 26 canonical paths exist (populated or empty stub with frontmatter).
- [ ] `README.md` sidebar manifest complete.
- [ ] No leader-visible staff headings in canonical files (grep gap analysis / movemental fit / TAM).
- [ ] Legacy root `{SLUG}_*.md` either merged to `_staff/legacy/` or documented in README.
- [ ] `reflected-understanding/<slug>.md` exists (or documented exception).

### Pipeline (merged/corpus only)

- [ ] `pnpm research:verify -- --slug=<slug>` exits 0
- [ ] Supabase: leader-safe regex 0 rows
- [ ] `/profile?org=<slug>` — populated sections render; empty sections hidden from rail (unless `?staff=1`)

### Substrate only

- [ ] No full `research:etl`
- [ ] Media counts unchanged (books/articles/audio/videos/frameworks Δ0)
- [ ] New dossier keys via `wire-dossier` only

---

## 9. Agent session protocol

When executing this plan:

1. Read this doc + [`author-profile-database-to-frontend-status.md`](../notes/author-profile-database-to-frontend-status.md).
2. Pick **one slug**; complete Phases 1–4 for that slug before starting the next.
3. Append progress to a new **`AP-06`** prompt or section in `master_runner.md` when execution begins (not part of this plan doc).
4. Never delete content — move to `_staff/` or `_misc/`.
5. Prefer **empty stubs** over invented prose.

---

## 10. Open decisions (operator)

| # | Question | Default recommendation |
| --- | --- | --- |
| 1 | Rename `{SLUG}_CALLING_PROFILE.md` → `profile/calling-profile.md` vs keep both with ETL fallback? | **Rename**; update ETL fallback for one release |
| 2 | Export substrate `frameworks[]` from DB to author `content/frameworks.md`? | **Yes** for Alan/brad/jr/lucas — prevents on-disk/DB drift |
| 3 | Delete `_staff/legacy/` after 30 days or keep indefinitely? | **Keep** until all leaders verified |
| 4 | Part-prefixed directories (`part-iv-body-of-work/`) instead of `content/`? | **Defer** — requires ETL rewrite; functional dirs sufficient if manifest is clear |

---

## Appendix A — Legacy root file migration map (all tenants)

| Legacy pattern | Canonical destination |
| --- | --- |
| `{SLUG}_AUTHOR_PROFILE.md` | `profile/identity.md` |
| `{SLUG}_AUDIENCE_PROFILE.md` | `analysis/audience-analysis.md` |
| `{SLUG}_CONTENT_AUDIT.md` | `content/content-audit.md` |
| `{SLUG}_CALLING_PROFILE.md` | `profile/calling-profile.md` |
| `{SLUG}_VOICE_IDENTITY.md` | `profile/voice-analysis.md` |
| `{SLUG}_PROFILES_INDEX.md` | `_misc/` or README links |
| `{SLUG}_RESEARCH_SUMMARY.md` | merge into `summary.md` or `_misc/` |
| `{SLUG}_MASTER_WRITING_PROMPT.md` | `_staff/` |
| `{SLUG}_RESEARCH_COLLATED.md` / `.html` | `_misc/collated/` |
| `{SLUG}_COLLATION_MANIFEST.json` | `_misc/collated/` |
| Root `content-analysis.md` | `_misc/` (deprecated nav) |
| Root `gap-analysis.md` | `_staff/gap-analysis.md` |
| Root `movemental-analysis.md` | `_staff/movemental-analysis.md` |
| `digital-presence-discovery.md` | `_misc/` |
| `digital-presence.md` (single file) | split → `digital-presence/*.md` |
| `network/affiliations.md` | `network/organizations.md` |

---

## Appendix B — Files that never map to sidebar (always `_misc/` or `_staff/`)

| File / dir | Bucket |
| --- | --- |
| `gap-analysis.md`, `movemental-fit.md`, `movemental-analysis.md` | `_staff/` |
| `content-marketing-playbook.md` | `_staff/` |
| `identity-verification.md` | `_staff/` |
| `committed-voice.md` | `_misc/` |
| `media/`, `pdf/`, `collated/`, `*.html` | `_misc/` |
| `network/collaborators.md`, `endorsements.md`, `events.md` | `_misc/network/` |
| `hirsch-affinity-*` | `_staff/` (Alan only) |
| `welcome-letter.md` | stays at root — onboarding table, not dossier nav |

---

*Plan authored 2026-06-04. Execute via phased PRs; update this doc when operator decisions in §10 are resolved.*
