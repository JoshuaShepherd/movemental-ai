# Repo Cleanup Report — 2026-05-13

**Repo:** `movemental-ai` (Next.js 16.2.3 + React 19.2.4 + Tailwind v4 + Drizzle + six-layer chain)
**Branch:** `slice/S00-frontend-cleanup-2026-05-13` (continues from the frontend-cleanup commit `9898856`)
**Skill:** `$repo-cleanup` (Phases 0–5, manually executed)
**Scope this run:** `docs`, `html`, `deps`, `.claude`, `public` (code was just covered by `$frontend-cleanup`)

---

## Stack profile

| Layer | Detection |
|---|---|
| Framework | Next.js 16.2.3 (`next.config.ts` + `proxy.ts` — confirmed Next 16 middleware naming) |
| UI | React 19.2.4 |
| Styling | Tailwind v4 (`postcss.config.mjs` + `tailwind.config.ts` + `globals.css @theme inline`) |
| Data | Drizzle ORM (`drizzle.config.ts`) |
| Auth/data backend | Supabase (via `@supabase/ssr`; no in-repo `supabase/` dir — schema lives upstream) |
| Six-layer chain | **Present** — `scripts/validate-db-alignment.ts`, `validate-hooks-alignment.ts`, `validate-routes-alignment.ts`, `generate-zod-schemas.ts`, `generate-hooks.ts`, `generate-routes.ts`, `generate-services.ts` |
| AI on this repo | Minimal: `@sentry/nextjs`, `@xyflow/react` + `sigma` + `graphology` for viz; one Anthropic API utility for build-time leader-corpus sync. No agent runtimes here. |

---

## Discovery — headline counts

| Bucket | Count |
|---|---:|
| Markdown files in `docs/` | **1,564** |
| Markdown files at top of repo | 3 (all canonical: `CLAUDE.md`, `AGENTS.md`, `README.md`) |
| `docs/` subfolders | 30 |
| `.html` files under `docs/html/` | 287 |
| `.html` files under `docs/ai-studio/` | 58 |
| Files in `public/` | 19 MB total |
| Top-level loose files outside configs | 0 *(prior cleanup got them)* |
| `.claude/skills/` symlinks | 239 (none broken) |
| `.claude/settings.json` | 62 lines (tidy) |
| Dependency candidates inspected | 54 (17 flagged but **all false-positives** — shadcn-bundled Radix + Next peer deps) |
| Generated artifacts properly gitignored | ✓ `playwright-report/`, `test-results/` |

The repo's documentation has already been through one or more prior cleanup passes — there are no orphaned `*_REPORT.md` / `*_AUDIT.md` / `*_COMPLETE.md` files left in the root, and `docs/articles/_archive/` + `public/archive/pathway-pre-consolidation/` show the established archive precedent.

---

## Archive plan (final scope — 4 files)

Destination: `_archive/2026-05-13/docs-html/` (repo-level archive, distinct from the component-level `src/components/_archive/2026-05-13/`).

| Path | Files | Reason |
|---|---:|---|
| `docs/html/_write_test.txt` | 1 | Zero-byte test artifact; created `2026-05-11` as a write-permissions probe |
| `docs/html/homepage-concept-modern-v2/` | 3 | Explicit `-v2` suffix on a Stitch mockup folder; React equivalent shipped in `src/components/sections-mock/home/`. The only remaining reference is a JSDoc comment in `home-concept-modern-page-content.tsx:205` (informational, no runtime impact). |

**Scope tightened from 9 → 4 during Phase 4 pre-flight:** `grep` surfaced that `docs/html/scenius-network-v2/` is a **generated artifact**. Two active scripts (`scripts/sync-movement-voices-html-data.ts` and `scripts/generate-movement-voices-html-app-js.py`) write into that directory, so archiving it would orphan the generators on their next run. The directory was restored and remains in place.

The repo is otherwise in good order — this is a small, surgical cleanup riding alongside the much larger frontend-cleanup commit.

---

## Flagged for review (NOT auto-archiving)

### 1. `docs/html/` overall (278 remaining files)

These are Stitch HTML mockups dumped during the React migration. Per [CLAUDE.md](../../CLAUDE.md), the canonical visual SSOT is the **pinned Stitch project `2208910962065880866`**, not these local HTML files. With 100 frontend components just archived (commit `9898856`), many of the HTML mockups whose React equivalents have shipped are likely now reference-only and could be moved to `_archive/`. But a per-file check against the live route list is needed — beyond the safe scope of a single repo-cleanup pass.

**Recommendation:** a focused follow-up like `docs-html-cleanup` skill, or a manual sweep aligned with the `(site)` route inventory.

### 2. `docs/articles/sandbox/` (10 files)

Initially looked like scratch (it's in a `sandbox/` subfolder). Inspection reveals proper frontmatter (`shape: sandbox`, `series: sandbox`, `series_order: N`) — these are **structured article drafts** in an intentional sandbox track, authored by Josh Shepherd. **Do not archive.**

### 3. `docs/notes/` (2 files)

- `mvmtl-cross-repo-documentation-index-2026-04-11.md` — date-stamped, ~1 month old, possibly stale. Owner's call.
- `mvmtl-running-notes-founder-input-2026-04.md` — founder running notes. Keep.

### 4. `docs/dashboard-route-inventory.md`, `docs/dashboard-alignment-changelog.md`

Both self-document as **SSOT** for the authenticated dashboard surface. The first describes routes; the second is an editorial changelog of the Prompts-01–08 alignment sequence. **Keep both.**

### 5. Dependencies

The 17 candidates flagged by the conservative grep are all **false-positives** — they're either shadcn-bundled Radix primitives loaded inside `src/components/ui/*` (which my coarse grep missed), Next peer deps (`react-dom`, `eslint-config-next`), dev tools (`@tanstack/react-query-devtools`, `shadcn`), or the `motion` / `react-hook-form` / `@hookform/resolvers` trio used in forms. **No safe removals.** A dedicated `knip` pass would confirm.

---

## `.claude/` surface

- 239 skill symlinks, **none broken**.
- `settings.json` is 62 lines — tidy.
- No need for $fewer-permission-prompts yet.
- The two new skill symlinks created today (`frontend-cleanup`, `repo-cleanup`) committed in `9898856`.

---

## Public assets

`public/` is 19 MB — modest. Live references confirmed for:
- `public/templates/safety/` (19 templates) → used by `src/lib/sandboxlive/recipe-catalog.ts`
- `public/templates/sandbox/` (26 templates) → used by `recipe-catalog.ts` + Stitch validation scripts
- `public/archive/pathway-pre-consolidation/` — already-archived, leave in place

No safe public/ archive candidates this run.

---

## Plan

1. `mkdir -p _archive/2026-05-13/docs-html/{homepage-concept-modern-v2,scenius-network-v2}`
2. `git mv docs/html/_write_test.txt _archive/2026-05-13/docs-html/`
3. `git mv docs/html/homepage-concept-modern-v2/* _archive/2026-05-13/docs-html/homepage-concept-modern-v2/`
4. `git mv docs/html/scenius-network-v2/* _archive/2026-05-13/docs-html/scenius-network-v2/`
5. Write `_archive/2026-05-13/MANIFEST.md`
6. Verify: `pnpm typecheck` (the .html moves shouldn't affect it; cheap insurance) + sanity grep for live references to the moved paths.
7. Commit.

Verification expected to be trivial since these files aren't imported by any TS/TSX.

---

## Approval

Reply **`yes`** to execute the 9-file archive + commit.
Reply **`broader pass on docs/html/`** to spawn a focused per-file review of the remaining 278 `.html` mockups.
