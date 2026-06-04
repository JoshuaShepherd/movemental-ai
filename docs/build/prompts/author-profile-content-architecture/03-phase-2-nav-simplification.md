# AP-03 — Phase 2: Nav simplification and progressive disclosure

**Prompt ID:** AP-03  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-visual-editor-main`  
**Requires:** [AP-02](./02-phase-1-wire-dossier-extras-cohort.md) recommended (content wired)  
**Last updated:** 2026-06-03

---

## 1. Role and stance

You are a **frontend architect** simplifying the Author Profile information architecture. Implement the nav changes from [`../../notes/author-profile-content-architecture-proposal.md`](../../notes/author-profile-content-architecture-proposal.md) §4 without breaking deep links or the corpus read path.

**Content stays in `movement_leader_corpus_data`.** This phase is **UI + mapper + nav manifest** only — no schema migration.

Read before coding:

- `src/lib/author-dossier/navigation.ts`
- `src/lib/author-dossier/corpus-content.ts` → `resolveSectionMarkdown()`
- `src/lib/schemas/corpus-schema.ts` → `DossierSectionSlug`
- Skill: `scholarly-authority-ui` (if available)

---

## 2. Goal

Reduce **empty-nav fatigue** and duplicate sections while preserving the six-part narrative arc.

### Nav changes (implement)

| Action | From | To |
| --- | --- | --- |
| **Merge** | `voice-analysis` + `voice-identity` | **`voice-editorial-identity`** (single slug — pick kebab name and use consistently) |
| **Remove from nav** | `editorial-bio-research` | Redirect to `author-profile` (301 or client redirect) |
| **Remove from nav** | `content-analysis` | Redirect to `bibliography` or At a Glance stats |
| **Add** | _(home-only today)_ | **`frameworks`** section in Part IV |
| **Merge (Part V)** | `web-properties`, `platforms-publishing`, `newsletters` | **`where-you-publish`** with H2 sub-blocks in mapper |
| **Optional merge** | `content-audit`, `academic-work`, `courses-training` | **`content-inventory`** — only if content volume low; otherwise keep separate |
| **Progressive disclosure** | all sections | Hide nav items when `resolveSectionMarkdown()` returns empty (staff preview override optional) |

Target: **~14 sidebar sections + At a Glance** (down from 22).

---

## 3. Context — current mapper bindings

Reference before changing slugs:

| Old slug | Corpus source |
| --- | --- |
| `voice-analysis`, `voice-identity` | `voice_analysis` |
| `editorial-bio-research` | `identity` |
| `content-analysis` | `books[]` + preamble |
| `frameworks` | `frameworks[]` — **no nav slug today**; home via `buildHomeData()` |
| Part V extras | `network.dossier[slug]` |

Merged Part V mapper should concatenate:

```markdown
## Web properties
{web-properties md}

## Platforms & publishing
{platforms-publishing md}

## Newsletters
{newsletters md}
```

Pull from existing `network.dossier` keys — **no ETL change required** for merge-only UI.

---

## 4. Definition of Done

### Navigation manifest (L6 manifest — not DB)

- [x] `navigation.ts` updated with new `DOSSIER_PARTS` tree.
- [x] `DossierSectionSlug` type still exhaustive (derived from `DOSSIER_SECTIONS`).
- [x] Old slugs handled: `permanentRedirect` in `[sectionSlug]/page.tsx` — bookmarks resolve cleanly.

### Mappers (L6 view model)

- [x] `corpus-content.ts`:
  - [x] New merged section resolvers (`voice-editorial-identity`, `where-you-publish`, `frameworks`).
  - [x] `buildSectionContent()` + `buildHomeData()` unchanged in behavior for populated leaders.
- [x] `resolveSectionMarkdown()` covers every **visible** nav slug (+ deprecated aliases for programmatic calls).

### Progressive nav

- [x] Sidebar component filters sections where content empty (`getVisibleSectionSlugs` → `DossierRail`).
- [x] Empty sections still reachable via direct URL — render empty state (no redirect). Documented in §10.
- [x] Staff QA: append `?staff=1` to show all nav sections (including empty).

### Tests

- [x] Update `tests/unit/author-dossier/corpus-content.test.ts` for new slugs + merged markdown.
- [x] `pnpm typecheck` clean.
- [ ] `pnpm test:run tests/unit/author-dossier/` green. *Blocked: Vitest ESM/`encoding-lite` env error (pre-existing).*

### Browser

- [ ] `?org=roy-moran` — sidebar shows merged sections; no duplicate voice entries. *Deferred — Chrome unavailable in WSL.*
- [ ] Frameworks section renders cards/prose from `frameworks[]`. *Deferred.*
- [ ] Old URLs (`/profile/voice-identity`) redirect or alias correctly. *Deferred.*

### Runner

- [x] [`master_runner.md`](./master_runner.md) AP-03 updated; §10 appended.

---

## 5. Output format

- Single PR in **visual-editor** touching:
  - `navigation.ts`
  - `corpus-content.ts`
  - Sidebar component(s) under `src/components/author-dossier/`
  - Route handler under `src/app/(dashboard)/profile/` if slug validation changes
  - Unit tests

Do **not** change ETL or movemental-ai research in this prompt unless a slug rename requires `DOSSIER_SECTION_FILES` key addition (unlikely).

---

## 6. Approach (recommended)

### Step 1 — Type-safe slug union

Ensure `DossierSectionSlug` is imported in `corpus-schema.ts` and `resolveSectionMarkdown` switch is exhaustive (TypeScript will flag missing cases).

### Step 2 — Add new sections before removing old

1. Add `frameworks`, merged voice, merged where-you-publish.
2. Wire mappers reading existing corpus fields.
3. Add redirects from deprecated slugs.
4. Remove deprecated entries from `DOSSIER_PARTS`.

### Step 3 — `sectionHasContent(corpus, slug)` helper

```typescript
// Pseudocode — implement in corpus-content.ts
export function sectionHasContent(corpus: MovementLeaderCorpus, slug: DossierSectionSlug): boolean {
  return resolveSectionMarkdown(corpus, slug).markdown.trim().length > 0;
}
```

Sidebar: `DOSSIER_SECTIONS.filter(s => sectionHasContent(corpus, s.slug) || showAllSections)`.

### Step 4 — Frameworks section UI

Reuse `DossierFrameworkGrid` card pattern from `DossierHomeView` + expandable prose from each `frameworks[].markdown`.

---

## 7. Layer checklist (visual-editor)

| Layer | Touch? |
| --- | --- |
| L1 Database | No |
| L2b corpus-schema | Only if adding `DossierSectionSlug` imports / helpers |
| L3 services | No (unless extracting shared read helper) |
| L6 author-dossier | **Yes** — primary |

```bash
pnpm typecheck
pnpm test:run tests/unit/author-dossier/
pnpm validate:all   # optional full chain
```

No Supabase MCP required unless verifying content still loads — optional spot-check.

---

## 8. Anti-patterns

| Do not | Why |
| --- | --- |
| Add new DB columns for nav | Nav is manifest-driven |
| Fetch product CMS in mappers | Blurs research vs published catalog |
| Hand-edit `src/components/ui/*` | shadcn managed |
| Break `loadActiveDossier()` / RSC read path | Keep server-first dossier load |

---

## 9. Backward compatibility

Maintain alias map for at least one release:

```typescript
const DEPRECATED_SLUG_REDIRECTS: Record<string, DossierSectionSlug> = {
  'voice-analysis': 'voice-editorial-identity',
  'voice-identity': 'voice-editorial-identity',
  'editorial-bio-research': 'author-profile',
  'content-analysis': 'bibliography',
  // Part V merges if old slugs removed:
  'web-properties': 'where-you-publish',
  'platforms-publishing': 'where-you-publish',
  'newsletters': 'where-you-publish',
};
```

Implement in profile `[sectionSlug]/page.tsx` or middleware within dashboard profile routes.

---

## 10. Attempt log (append-only)

| Date | Agent | PR | Sections before→after | Tests | Browser | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-06-03 | Cursor | — | 22 → 18 (+ home) | typecheck ✅; vitest ESM blocked | deferred | Merged voice + where-you-publish; added frameworks; progressive nav; `?staff=1`; deprecated slug 301 redirects |
