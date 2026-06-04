# Movement Leader Author Profile — Content Architecture Proposal

**Date:** 2026-06-03  
**Scope:** Full dossier experience (`/profile`), At a Glance dashboard, onboarding adjacency  
**Primary onboarding target:** Roy Moran (first real leader after Alan Hirsch substrate path)  
**Related:** `movemental-visual-editor-main/docs/build/notes/movemental-research-content-supabase-tables.md`

---

## 1. Current State Summary

### What exists today

The Author Profile is a **6-part, 22-section** dossier defined in `movemental-visual-editor-main/src/lib/author-dossier/navigation.ts`. Body content is loaded server-side from **`movement_leader_corpus_data`** (one row per leader) via `getDossierForSlug()` → `corpus-content.ts` mappers.

| Layer | Role | Status |
| --- | --- | --- |
| **`movement_leader_corpus_data`** | SSOT for all `/profile` prose and media lists | 15/16 leaders have rows (missing: `jamie-roach`) |
| **`movement_leaders`** | Shell chrome: name, role, photo, endorsement timestamp | 16 rows; `bio_short`/`bio_long` parallel corpus but rarely used in dossier |
| **`movement_leader_welcome_letters`** | Onboarding welcome letter → `/welcome` | 15 published letters |
| **`corpus_review_items`** | Flattened copy of corpus media for `/onboarding/corpus` | 411 items across author orgs |
| **Product CMS** (`books`, `content_items`, `videos`, `podcast_episodes`) | Published tenant catalog → `/content` | Only Alan Hirsch (and partially Brad Brisco) are populated; **not** what `/profile` reads |

### On-disk research (`docs/movement_leader_research/<slug>/`)

Research is the **authoring SSOT**. The ETL pipeline (`research:bridge` → `research:etl` → `research:publish`) compiles a canonical tree into Supabase.

**Canonical shape (target):**

```text
profile/          identity, biography, theology, voice-analysis
content/          books, articles, audio, videos, frameworks, academic, courses, content-audit
network/          organizations
digital-presence/ websites, platforms, social-media, newsletters
analysis/         audience-analysis.md
fragmentation-story.md
summary.md + *_CALLING_PROFILE.md
reflected-understanding/<slug>.md   (shared folder)
welcome-letter.md                   (onboarding only)
```

**Reality:** Many leaders (including Roy Moran) still use **legacy root-level files** (`ROY_MORAN_AUDIENCE_PROFILE.md`, `ROY_MORAN_CONTENT_AUDIT.md`, etc.) alongside partial canonical folders. Roy has strong `profile/` + `content/` + `network/` but **no `digital-presence/` or `analysis/` directories** — audience and web research lives in legacy markdown at the folder root.

### Loader split (critical operational detail)

Two incompatible loader paths share one table:

| Prefix | Leaders | Safe to `research:etl`? |
| --- | --- | --- |
| `substrate:` | Alan Hirsch, Brad Brisco, JR Woodward, Liz Rios, Lucas Pulley | **No** — re-ETL wipes rich media; patch with targeted SQL |
| `merged:` / `corpus:` | Roy Moran, Neil Cole, Dave Ferguson, Michael Cooper, cohort leaders | **Yes** |

Roy Moran is on the **safe, file-based path** (`merged:a4c001fd…`).

### Completeness snapshot (live Supabase, 2026-06-03)

| Leader | Core prose (identity/bio/theology/calling) | Media arrays | RU letter | `network.dossier` extras |
| --- | --- | --- | --- | --- |
| **Alan Hirsch** | Partial (identity/bio empty; theology + calling populated) | Rich (substrate) | ✓ | **9 keys** (fully wired) |
| **Michael Cooper** | Full | Full | ✓ | **9 keys** |
| **Roy Moran** | Full | Moderate (2/6/6/6 books/articles/audio/videos) | ✓ (endorsed) | **2 keys only** (content-audit, fragmentation-story) |
| **Andrew Jones, Jeremy Chambers, Peyton Jones** | Partial–full | Moderate | ✓ | **0 keys** → Part IV–V skeletons |
| **Substrate leaders** (Brad, JR, Liz, Lucas) | Often empty identity/bio | Rich media | ✓ | 8–9 keys (Alan/Brad) or partial |
| **Rowland Smith** | Identity + bio only | Empty | ✗ | 1 key |

**Roy-specific gap:** Core profile sections render; **7 of 9 Part IV–V sidebar sections show empty** because `network.dossier` was never wired for audience, web properties, platforms, social, newsletters, academic work, or courses — even though much of that content exists on disk in legacy files.

### Duplication and confusion

1. **Same data, multiple nav slots:** `voice-analysis` and `voice-identity` both read `voice_analysis`; `editorial-bio-research` duplicates `identity`; `content-analysis` is bibliography with a preamble.
2. **Two different “letters”:** `a-letter` → `reflected_understanding_md`; welcome letter → `movement_leader_welcome_letters` → `/welcome`. Leaders may conflate these.
3. **Three homes for list content:** corpus JSONB arrays, `corpus_review_items`, and (for some tenants) product CMS tables.
4. **`network.dossier` as junk drawer:** Nine sidebar sections with no dedicated column share one JSONB map keyed by nav slug — easy to forget at ETL time.
5. **Staff-only research leaking risk:** Gap analysis, Movemental fit scores, audience TAM, commerce recommendations live in on-disk research but must be stripped before leader-visible columns (`stripStaffSections`).

---

## 2. Proposed Content Hierarchy

Design principle: **what the leader sees should match how they think about their work** — identity → calling → voice → corpus → presence → synthesis — not how research was historically filed.

### Home — At a Glance

Dashboard summary derived from corpus (not a separate table):

- **Hero** — name, role, one-line calling summary (`calling_profile.oneLiner` or first prose from `summary.md`)
- **Endorsement chip** — `movement_leaders.reflected_understanding_endorsed_at`
- **Profile metrics** — counts from `books[]`, `articles[]`, `audio[]`, `videos[]`, `frameworks[]`
- **Framework cards** — from `frameworks[]` (card body = one-sentence summary per framework)
- **Voice fingerprint** — derived meters from `voice_analysis` structured fields
- **Digital presence** — derived meters from `network.dossier` digital-presence keys (when wired)
- **Career timeline** — parsed from biography markdown headings (convention-dependent)
- **Relational network** — from `network.sections[]`
- **In their own words** — quotes from `voice_analysis.recurringPhrases` / biography pull quotes

Optional override column: `at_glance` JSONB — **overrides only**, never primary storage.

---

### Part I — Profile

#### Author Profile

Who you are: identity narrative + organizational affiliations table.

#### Biography

Life story and career arc (full prose).

---

### Part II — Calling & Conviction

#### Theological Profile

Theological center of gravity, influences, distinctives.

#### Vocational Profile

Movement calling, contribution, and vocational narrative (exec summary + calling profile depth).

---

### Part III — Voice

#### Voice & Editorial Identity *(merged section)*

Tone, register, recurring phrases, metaphors, argument patterns.  
**Retire** separate `voice-analysis` + `voice-identity` nav entries; one section, one read path.

---

### Part IV — Body of Work

#### Bibliography

Published books and major works (table from `books[]`).

#### Articles & Essays

Articles, blog posts, essays (`articles[]`).

#### Audio & Podcast

Podcast episodes, talks, audio (`audio[]`).

#### Video

Video catalog (`videos[]`).

#### Frameworks *(new dedicated section — currently home-only)*

Each framework as a card + expandable prose (from `frameworks[]`). Leaders expect to see their intellectual contributions named explicitly, not only on the dashboard.

#### Content Inventory *(optional merge)*

Combine **Content Audit**, **Academic Work**, and **Courses & Training** into one “Content Inventory” section with three sub-headings — or keep as sub-nav if content volume warrants it. These are all long-form markdown essays, not structured lists.

---

### Part V — Digital Presence

#### Where You Publish *(merged)*

Web properties + platforms + newsletters in one section with H2 sub-blocks. Reduces three thin pages into one scannable surface.

#### Audience & Reach

Leader-safe audience profile (no TAM/commerce/gap analysis).

#### Social Media

Keep separate only if content is substantial; otherwise fold into “Where You Publish.”

**Staff-only research** (gap analysis, Movemental fit, commerce recommendations) stays in on-disk research and **never** enters leader-visible storage.

---

### Part VI — Synthesis

#### The Fragmentation Story

Essay on where their work lives and why it feels scattered.

#### A Letter

Reflected understanding — Movemental’s articulation of who they are. Endorsement flow toggles Preliminary → Endorsed.

**Welcome letter remains outside this hierarchy** — `/welcome` onboarding artifact, separate table.

---

### Proposed nav count

| Current | Proposed |
| --- | --- |
| 22 sections + home | **~14 sections + home** |
| 6 parts | **6 parts** (same narrative arc, fewer duplicates) |

---

## 3. Content → Storage Mapping

**Recommendation: keep one row in `movement_leader_corpus_data`.** Do not normalize into section tables now. Improve shape and ETL discipline instead.

### Primary columns (typed JSONB or text)

| Content area | Storage | Format | On-disk source |
| --- | --- | --- | --- |
| Author Profile | `identity` + `organizations[]` | JSONB `{ markdown }` + structured org rows | `profile/identity.md`, `network/organizations.md` |
| Biography | `biography` | JSONB `{ markdown }` | `profile/biography.md` |
| Theological Profile | `theology` | JSONB `{ markdown }` | `profile/theology.md` |
| Vocational Profile | `calling_profile` | JSONB `{ summary, oneLiner, markdown }` | `summary.md`, `*_CALLING_PROFILE.md` |
| Voice & Editorial Identity | `voice_analysis` | JSONB structured + `summaryMarkdown` | `profile/voice-analysis.md` |
| Bibliography | `books[]` | JSONB array `CorpusMediaItem` | `content/books.md` |
| Articles | `articles[]` | JSONB array | `content/articles.md` |
| Audio | `audio[]` | JSONB array | `content/audio.md` |
| Video | `videos[]` | JSONB array | `content/videos.md` |
| Frameworks | `frameworks[]` | JSONB array `{ name, markdown }` | `content/frameworks.md` |
| A Letter | `reflected_understanding_md` | **Plain text** markdown | `reflected-understanding/<slug>.md` |
| Relational network (At a Glance) | `network.sections[]` | JSONB array | `network/` research |
| At a Glance overrides | `at_glance` | JSONB optional | Derived; manual override only |

### Dossier extras (`network.dossier[slug]` → markdown string)

Until a cleaner column exists, keep using `network.dossier` — but **treat it as a first-class ETL output**, not an afterthought:

| Nav slug | File path | Notes |
| --- | --- | --- |
| `content-audit` | `content/content-audit.md` or `{SLUG}_CONTENT_AUDIT.md` (leader-safe excerpt) | Add to `DOSSIER_SECTION_FILES` |
| `academic-work` | `content/academic.md` | |
| `courses-training` | `content/courses.md` | |
| `audience-profile` | `analysis/audience-analysis.md` or legacy `{SLUG}_AUDIENCE_PROFILE.md` | Strip staff sections |
| `web-properties` | `digital-presence/websites.md` | |
| `platforms-publishing` | `digital-presence/platforms.md` | |
| `social-media` | `digital-presence/social-media.md` | |
| `newsletters` | `digital-presence/newsletters.md` | |
| `the-fragmentation-story` | `fragmentation-story.md` | |

**Future optional clarity:** rename `network.dossier` → top-level `dossier_sections jsonb` on the same row. Same data, clearer name. Not required for Phase 1.

### Separate tables (keep bounded)

| Table | Purpose | Do not merge into corpus |
| --- | --- | --- |
| `movement_leaders` | Identity chrome, endorsement timestamp, editable bios | Parallel to corpus; dossier should prefer corpus for `/profile` |
| `movement_leader_welcome_letters` | Onboarding welcome | Different route, voice, lifecycle |
| `corpus_review_items` | Onboarding approval UX for media lists | **Derived** from corpus arrays on publish |
| Product CMS tables | Published sellable content | Promotion bridge via `CorpusMediaItem.externalId` later |

### Legacy / operator-only (do not expose in UI)

| Column | Use |
| --- | --- |
| `substrate_md`, `substrate_sections`, `manifest` | Substrate leader audit trail; read-only |
| `source_version` | Loader provenance; gates re-ETL safety |

### Format decisions by content type

| Type | Best format | Rationale |
| --- | --- | --- |
| Long prose sections (bio, theology, fragmentation) | **Markdown → `{ markdown }` JSONB wrapper** | Human-editable in git; renders to HTML in UI |
| Media catalogs (books, articles, audio, video) | **Structured JSONB arrays** | Powers tables, stats, review items, future Studio promotion |
| Frameworks | **Structured JSONB array** | Cards on home + dedicated section; needs name + summary |
| Voice | **Structured JSONB + rendered markdown** | Meters need typed fields; prose needs readability |
| Digital presence / audience essays | **Markdown in `network.dossier`** (Phase 1) | Infrequent edits; full prose; leader-safe stripping at ingest |
| A Letter | **Dedicated text column** | Highest-visibility artifact; easy to query and endorse |
| Welcome letter | **Separate table `body_md`** | Versioned, published, onboarding-scoped |

---

## 4. Sidebar / Navigation Recommendations

### Verdict: **Reorganize and simplify — do not keep all 22 sections as-is**

The current IA mirrors an HTML reference prototype (`michael-cooper-author-dossier.html`) but creates **empty-nav fatigue**: leaders scroll past skeleton sections that duplicate populated ones or were never wired.

### Recommended changes

| Action | Sections affected | Why |
| --- | --- | --- |
| **Merge** | `voice-analysis` + `voice-identity` → **Voice & Editorial Identity** | Identical data source today |
| **Remove or redirect** | `editorial-bio-research` | Duplicates `author-profile`; if editorial positioning diverges later, restore as distinct file |
| **Remove** | `content-analysis` | Duplicates bibliography with a header; stats belong on At a Glance |
| **Add** | **Frameworks** as Part IV section | Currently home-only; leaders ask “where are my frameworks?” |
| **Merge (Part V)** | `web-properties` + `platforms-publishing` + `newsletters` → **Where You Publish** | Three sections often thin; one page with H2 blocks |
| **Keep** | `audience-profile`, `social-media` | Distinct enough when populated |
| **Collapse (Part IV optional)** | `content-audit` + `academic-work` + `courses-training` → **Content Inventory** | All long-form markdown; reduces nav clutter |
| **Keep** | `the-fragmentation-story`, `a-letter` | Core synthesis; differentiated purpose |
| **Hide until wired** | Any section with empty content | Progressive disclosure beats 15 skeleton pages |

### UX pattern: progressive nav

```text
Section states:
  ● Complete     — content present, shown in nav
  ○ In progress  — staff researching; hidden from leader OR shown with "coming soon"
  — Empty        — hidden from nav (not skeleton in main flow)
```

Implement via completeness check in `resolveSectionMarkdown()` — if empty and not staff preview, omit from sidebar. Alan Hirsch can remain staff-visible for QA.

### At a Glance vs sidebar

| Surface | Shows | Source |
| --- | --- | --- |
| **At a Glance** | Metrics, cards, meters, timeline, network, quotes | Derived from corpus columns |
| **Sidebar** | Full prose sections | Same row; deep links into Parts I–VI |

Do not duplicate full section bodies on the home page — only summaries and cards.

---

## 5. Phased Rollout

### Phase 0 — Roy Moran “complete dossier” (this week)

Roy is the template leader: file-based ETL, corpus row exists, RU endorsed, welcome letter published. Gaps are **wiring and file normalization**, not architecture.

1. **Normalize on-disk files for Roy:**
   - Extract leader-safe excerpts from `ROY_MORAN_AUDIENCE_PROFILE.md` → `analysis/audience-analysis.md`
   - Extract leader-safe content audit excerpt → `content/content-audit.md`
   - Create `digital-presence/` from author profile / content audit web sections
   - Add `content/academic.md`, `content/courses.md` if research supports them (or mark N/A and hide nav)

2. **Run pipeline** (from `movemental-visual-editor-main`):

   ```bash
   pnpm research:etl -- --slug=roy-moran
   pnpm research:publish -- --slug=roy-moran --unlock
   pnpm research:verify -- --slug=roy-moran
   ```

   Ensure `buildDossierExtrasFromFiles()` runs inside ETL so `network.dossier` gets all 9 keys.

3. **Verify leader-safe:** no gap analysis / Movemental fit / commerce copy in any leader-visible column.

4. **Browser QA:** `/profile` for Roy — zero skeleton sections in Parts I–III and VI; Part IV–V populated or intentionally hidden.

### Phase 1 — Wire dossier extras for merged/corpus cohort (~2 weeks)

Apply Roy pattern to **merged/corpus leaders** with on-disk research:

`andrew-jones`, `jeremy-chambers`, `peyton-jones`, `brian-sanders`, `neil-cole`, `dave-ferguson`, `rob-wegner`, `michael-cooper`

- Add legacy-file fallback paths in ETL for cohort naming (`{SLUG}_*.md`)
- Run `wire-dossier-extras` per slug after canonical files exist
- **Do not re-ETL substrate leaders**

**Outcome:** Part IV–V stop showing “awaiting-etl-wiring” for file-based leaders.

### Phase 2 — Nav simplification (~2–3 weeks)

In `navigation.ts`:

- Merge duplicate sections (voice, digital presence)
- Add Frameworks section
- Implement hide-empty-sections in sidebar component
- Update `corpus-content.ts` mappers for merged slugs (redirect old slugs for bookmarks)

**Outcome:** Leader-facing IA matches proposed hierarchy; fewer empty clicks.

### Phase 3 — Onboarding alignment (~1 week)

- Make `research:publish` **fully replace** `corpus_review_items` from corpus arrays (idempotent)
- Confirm `/onboarding/corpus` lists match `/profile` bibliography/articles/audio/video counts
- Document welcome letter vs A Letter in onboarding copy

**Outcome:** One catalog, two views (research dossier + review workflow).

### Phase 4 — Substrate leader profile prose (ongoing, SQL-only)

For Alan Hirsch, Brad Brisco, JR Woodward, Liz Rios, Lucas Pulley:

- Patch `identity`, `biography` via targeted SQL or substrate section extraction — **never full re-ETL**
- Wire `network.dossier` where on-disk files exist (Alan already has 9 keys)

**Outcome:** Substrate leaders get profile prose without losing rich media.

### Phase 5 — Optional enhancements (later)

- `CorpusMediaItem.externalId` → product CMS promotion bridge
- `dossier_sections` column rename / migration off `network.dossier`
- Inline editing (admin pencil) with PATCH API per section
- `at_glance` overrides for timeline when biography headings don’t parse

---

## 6. Decision Summary

| Question | Answer |
| --- | --- |
| New tables for dossier sections? | **No** — one `movement_leader_corpus_data` row |
| Where should markdown essays live? | **`network.dossier[slug]`** (Phase 1–2); optional rename later |
| Where should media lists live? | **Typed JSONB arrays** on same row |
| Merge welcome letter into corpus? | **No** — separate onboarding artifact |
| Merge product CMS into corpus? | **No** — promotion bridge later |
| Keep 22 sidebar sections? | **No** — collapse to ~14; hide empty |
| First implementation target? | **Roy Moran** — normalize files + wire dossier extras + verify |

---

## Appendix A: Roy Moran — section readiness today

| Section | On disk | In Supabase | Action |
| --- | --- | --- | --- |
| Author Profile | ✓ `profile/identity.md` | ✓ | None |
| Biography | ✓ | ✓ | None |
| Theological / Vocational | ✓ | ✓ | None |
| Voice | ✓ | ✓ | Merge nav only |
| Bibliography / Articles / Audio / Video | ✓ | ✓ | None |
| Frameworks | ✓ | ✓ (6) | Add nav section |
| Content Audit | ✓ legacy file | ✓ wired | Migrate to `content/content-audit.md` |
| Fragmentation Story | ✓ | ✓ wired | None |
| A Letter | ✓ reflected-understanding | ✓ endorsed | None |
| Audience Profile | ✓ legacy `ROY_MORAN_AUDIENCE_PROFILE.md` | ✗ | Extract leader-safe → `analysis/` + ETL |
| Web / Platforms / Social / Newsletters | Partial in author profile | ✗ | Create `digital-presence/` + ETL |
| Academic / Courses | Unknown / partial | ✗ | Author or hide nav |
| Welcome letter | ✓ | ✓ `/welcome` | Keep separate |

---

## Appendix B: Nav slug → DB mapping (current implementation)

Reference for ETL and mappers. Slugs from `DOSSIER_PARTS` in `navigation.ts`.

| Part | Sidebar slug | movemental-ai path (typical) | DB column / location |
| --- | --- | --- | --- |
| I | _(home)_ at-a-glance | _(derived)_ | Multiple JSONB + `movement_leaders` |
| I | `author-profile` | `profile/identity.md` + orgs | `identity` + `organizations` |
| I | `biography` | `profile/biography.md` | `biography` |
| II | `theological-profile` | `profile/theology.md` | `theology` |
| II | `vocational-profile` | `summary.md`, `*_CALLING_PROFILE.md` | `calling_profile` |
| III | `voice-analysis` | `profile/voice-analysis.md` | `voice_analysis` |
| III | `voice-identity` | _(same as voice)_ | `voice_analysis` |
| III | `editorial-bio-research` | _(same as identity)_ | `identity` |
| IV | `bibliography` | `content/books.md` | `books[]` |
| IV | `content-analysis` | _(derived from books)_ | `books[]` |
| IV | `content-audit` | staff research file (leader-safe excerpt) | `network.dossier['content-audit']` |
| IV | `academic-work` | `content/academic.md` | `network.dossier['academic-work']` |
| IV | `articles-blog-posts` | `content/articles.md` | `articles[]` |
| IV | `audio-podcast` | `content/audio.md` | `audio[]` |
| IV | `courses-training` | `content/courses.md` | `network.dossier['courses-training']` |
| IV | `video-content` | `content/videos.md` | `videos[]` |
| V | `audience-profile` | `analysis/audience-analysis.md` | `network.dossier['audience-profile']` |
| V | `web-properties` | `digital-presence/websites.md` | `network.dossier['web-properties']` |
| V | `platforms-publishing` | `digital-presence/platforms.md` | `network.dossier['platforms-publishing']` |
| V | `social-media` | `digital-presence/social-media.md` | `network.dossier['social-media']` |
| V | `newsletters` | `digital-presence/newsletters.md` | `network.dossier['newsletters']` |
| VI | `the-fragmentation-story` | `fragmentation-story.md` | `network.dossier['the-fragmentation-story']` |
| VI | `a-letter` | `reflected-understanding/<slug>.md` | `reflected_understanding_md` (not welcome letter) |

---

## Appendix C: End-to-end data flow (target)

```text
movemental-ai/docs/movement_leader_research/<slug>/
        │
        │  pnpm research:etl  (or substrate-safe SQL patch)
        ▼
movement_leader_corpus_data  ──────────────────────►  /profile (RSC)
        │                      parseMovementLeaderCorpus
        │                      buildHomeData / buildSectionContent
        │
        │  pnpm research:publish
        ▼
corpus_review_items  ─────────────────────────────►  /onboarding/corpus
        │
        │  pnpm research:publish-letter
        ▼
movement_leader_welcome_letters  ───────────────────►  /welcome

(Optional, separate pipeline)
corpus media item ──promote──► books / content_items / videos / podcast_episodes
                                      └──► /content, /books, …
```
