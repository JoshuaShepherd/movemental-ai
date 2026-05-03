# Workspace architecture: four-repo context & SSOT strategy

**Path:** `docs/build/notes/workspace-four-repo-context-strategy.md`  
**As of:** 2026-05-02 — **current truth** for repo layout, canonical disk paths (lowercase **`dev`** under `Desktop`), Claude/Cursor context boundaries, and SSOT.  
**Audience:** Agent directing this project; solo founder using heavy Cursor / Claude context.  
**Goal:** One orientation doc: roles, paths, what is done, what is optional.

---

## Implementation status (full report — `movemental` repo verified 2026-05-02)

This section is the **authoritative status snapshot** for agents: what is already correct on disk in **`~/Desktop/movemental`**, what was verified, and what remains optional elsewhere.

### Verified in this repo (`movemental`)

| Check | Status |
|-------|--------|
| [`.claude/settings.json`](../../../.claude/settings.json) `additionalDirectories` | Points at **`…/movemental-sites/alan-hirsch/.claude/skills`**, **`…/alan-hirsch/src`**, **`movemental-ai`**, **`my-skills`**, **`movemental/.claude/skills`** — **no** legacy `…/repos/alan-hirsch` app path. |
| [`.cursorignore`](../../../.cursorignore) | Excludes `.next/`, `node_modules/`, **`docs/html/`**, **`docs/movement_leader_research/**/*.pdf`**, **`docs/book-development/archive/`**. |
| Top-level symlinks in `.claude/skills/` | **Verified:** `find … -maxdepth 1 -type l ! -exec test -e {} \;` returned **no broken links** (after path normalization / repair script as applicable). |
| [`AGENTS.md`](../../../AGENTS.md) | States canonical tenant path **`movemental-sites/alan-hirsch`** (not `…/alan-hirsch`) and points to [`scripts/fix-alan-hirsch-skill-paths.sh`](../../../scripts/fix-alan-hirsch-skill-paths.sh) for machine moves. |
| [`scripts/fix-alan-hirsch-skill-paths.sh`](../../../scripts/fix-alan-hirsch-skill-paths.sh) | Backs up settings, normalizes `Desktop/Dev` → `Desktop/dev`, retargets legacy **`alan-hirsch/.claude/skills`** → **`movemental-sites/alan-hirsch/.claude/skills`**, rewires matching symlinks. |

### Interpretation for agents

- **High-impact path migration** (tenant repo folder rename, `additionalDirectories`, symlink targets, `.cursorignore`) is **done** in this workspace — do not re-litigate unless a **new machine** or **fresh clone** breaks paths again.
- **[`curated-cleanup-plan-2026-05.md`](./curated-cleanup-plan-2026-05.md)** — procedural cleanup checklist aligned with **this** file (same date); use together with the **Implementation status** table above.

### movemental.ai — reducing context noise while shipping `(site)`

When working on the marketing site, treat these as **SSOT**, not `docs/html/` prototypes:

- [`docs/arguments/SITE-SSOT.md`](../../arguments/SITE-SSOT.md)
- [`docs/design/DESIGN.md`](../../design/DESIGN.md)
- **`src/`** — production UI

Rule: if narrative doc and live code disagree, **code wins**; update the doc in the same change. **`docs/html/`** is intentionally excluded from default Cursor indexing — prototype lab only until a route is promoted to React.

### Skills & documentation SSOT (final policy)

| Layer | Role |
|-------|------|
| **`~/Desktop/dev/repos/my-skills`** | Shared skill hub — cross-tenant, generic tooling, `_reference` material. **Prefer one maintainer** for duplicated audit/style skills that appear in multiple repos. |
| **`…/movemental-sites/alan-hirsch/.claude/skills`** | **Authoritative** tenant skills; `movemental` consumes via **symlink**, edits happen here (or in `my-skills` for shared pieces). |
| **`movemental/.claude/skills`** | Movemental-only skills (narrative audit, prose, fragmentation-story, etc.) **plus** symlinks — avoid duplicating full trees by hand. |
| **`movemental-visual-editor`** | Studio-specific skills stay here; **dedupe** generic skills into `my-skills` rather than maintaining parallel copies long-term. |

### Optional cleanup (not blocking — conservative posture)

**Archive root:** `~/Desktop/Archive/2026-05-cleanup/` — prefer **archive over delete**.

| Repo | Optional actions |
|------|------------------|
| **`movemental`** | Archive large superseded `docs/html/` mockups **after** React migration + grep for references; optional **`docs/html/README.md`** stub (prototypes ≠ SSOT); trim stale `.claude/settings.json.bak.*` after confirming a good backup; optional `.cursorignore` lines for `docs/book-development/archive/` if unused in code. |
| **`movemental-visual-editor`** | Archive `_archive/` or redundant snapshots only after checking `_docs/` cross-links; add ignore rules for noisy build artifacts if needed. |
| **`movemental-sites/alan-hirsch`** | Optional archive old `captures/` / scratch exports if duplicated. |
| **`alan-hirsch-content`** | Archive legacy root `skills/` tree only after confirming workflows use `.claude/skills/`. |
| **`alan-books`** | Archive `corpus/alan_hirsch/_archive/`, old `reports/`, `tmp/`, verbose `logs/` per `BOOK_CORPUS_QUARANTINE.md` in that repo — confirm scripts do not rely on in-place paths before `mv`. |
| **`my-skills`** | Treat as SSOT; archive obsolete skill folders only with a README pointing to replacements. |

### Verification commands (re-run after disk moves or fresh clone)

```bash
# Broken symlinks at top level of movemental skills dir
find "${HOME}/Desktop/movemental/.claude/skills" -maxdepth 1 -type l ! -exec test -e {} \; -print

# Repair if needed (macOS)
chmod +x "${HOME}/Desktop/movemental/scripts/fix-alan-hirsch-skill-paths.sh"
"${HOME}/Desktop/movemental/scripts/fix-alan-hirsch-skill-paths.sh"

# Stale filesystem paths in movemental (review each hit — do not bulk-replace URL slugs)
rg '/Dev/repos/alan-hirsch|Desktop/dev/repos/alan-hirsch/' "${HOME}/Desktop/movemental" \
  --glob '*.md' --glob '*.json' --glob '*.ts' --glob '*.tsx'

# Archive scaffold (optional)
mkdir -p "${HOME}/Desktop/Archive/2026-05-cleanup"/{movemental-html-drafts,alan-books-tmp,movemental-visual-editor-archive}
```

---

## Agent brief — read first

1. **Alan Hirsch tenant app (learner site)** lives at **`~/Desktop/dev/repos/movemental-sites/alan-hirsch`**. There is **no** `~/Desktop/dev/repos/alan-hirsch` app folder (old name/layout). On macOS, `Desktop/Dev` and `Desktop/dev` often point at the same directory; **written paths in this workspace use lowercase `dev`.**

2. **`movemental` (this repo)** = **movemental.ai** marketing / org site only (Next.js **16**, `(site)`). Not the Studio, not the tenant app. Canon: [`docs/design/DESIGN.md`](../../design/DESIGN.md), [`docs/arguments/SITE-SSOT.md`](../../arguments/SITE-SSOT.md) (if doc and code disagree, **code wins** — update the doc in the same change).

3. **Claude Code (`movemental`)** — [`.claude/settings.json`](../../../.claude/settings.json) **`additionalDirectories`** (read-only context), exact machine layout:

   | Path | Role |
   |------|------|
   | `…/dev/repos/movemental-sites/alan-hirsch/.claude/skills` | Tenant skills (symlink source) |
   | `…/dev/repos/movemental-sites/alan-hirsch/src` | Tenant app source |
   | `…/dev/repos/movemental-ai` | Secondary patterns / sibling reference |
   | `…/dev/repos/my-skills` | Shared skill library |
   | `…/movemental/.claude/skills` | This repo’s skill dir (local + symlinks) |

   **Tenant repo** `movemental-sites/alan-hirsch` has its **own** [`.claude/settings.json`](../../../../dev/repos/movemental-sites/alan-hirsch/.claude/settings.json) — `Read`/`Bash` allow patterns and `additionalDirectories` use **`…/dev/repos/movemental-sites/alan-hirsch`**, not legacy `…/repos/alan-hirsch`.

4. **Skills in `movemental/.claude/skills/`** — real directories for movemental-only skills plus **symlinks** into **`my-skills`** and **`movemental-sites/alan-hirsch/.claude/skills`**. Targets use **`/Desktop/dev/repos/`** in absolute paths. Repair / legacy retarget / Dev→dev normalization: [`scripts/fix-alan-hirsch-skill-paths.sh`](../../../scripts/fix-alan-hirsch-skill-paths.sh).

5. **Cursor indexing (`movemental`)** — [`.cursorignore`](../../../.cursorignore) excludes `.next/`, `node_modules/`, **`docs/html/`**, **`docs/movement_leader_research/**/*.pdf`**, **`docs/book-development/archive/`**. **`docs/html/`** is prototype lab ([`docs/html/README.md`](../../html/README.md)); shipped UI SSOT is **`src/`** + DESIGN + SITE-SSOT.

6. **Shared env (optional, different folder)** — `pnpm env:local-from-shared` uses **`~/Desktop/Dev/.env.shared`** ([`CLAUDE.md`](../../../CLAUDE.md)); that is **not** under `repos/` — do not “fix” it to `dev` unless your disk layout changes.

7. **Curated cleanup plan** — optional archives, per-repo tables, commands: [`curated-cleanup-plan-2026-05.md`](./curated-cleanup-plan-2026-05.md). **Verified status** for `movemental`: **Implementation status** section at top of **this** file.

---

## Canonical paths (this machine)

| Role | Path |
|------|------|
| Marketing / org site | `~/Desktop/movemental` |
| Studio / dashboard | `~/Desktop/dev/repos/movemental-visual-editor` |
| Alan Hirsch **tenant app** | `~/Desktop/dev/repos/movemental-sites/alan-hirsch` |
| Alan **content** (no app) | `~/Desktop/dev/repos/alan-hirsch-content` |
| Book corpus + tooling | `~/Desktop/dev/repos/alan-books` |
| Shared skills | `~/Desktop/dev/repos/my-skills` |
| Sibling reference (marketing / nonprofit experiments) | `~/Desktop/dev/repos/movemental-ai` |
| Book corpus quarantine (external tree) | `~/Desktop/book-corpus-quarantine` (per `alan-books` / `BOOK_CORPUS_QUARANTINE.md`) |

**Naming:** “`alan-hirsch` repo” in old docs → **`movemental-sites/alan-hirsch`** unless the topic is **`alan-hirsch-content`**.

---

## 1. `~/Desktop/movemental`

- **Stack:** Next.js **16**, React 19, Tailwind v4, Stitch project pinned in [`docs/build/stitch-project.md`](../stitch-project.md).
- **Bridge:** [`docs/projects/alan-hirsch/README.md`](../../projects/alan-hirsch/README.md) — tenant app + Studio; paths **`movemental-sites/alan-hirsch`**.
- **Agent entrypoints:** [`CLAUDE.md`](../../../CLAUDE.md), [`AGENTS.md`](../../../AGENTS.md).

| Area | SSOT / note |
|------|-------------|
| `src/` | Production UI |
| `docs/design`, `docs/arguments`, `docs/build/prompts` | Charter, SITE prompts |
| `docs/html/` | Prototypes — `.cursorignore` |
| `.claude/skills/` | Local + symlinks |
| `scripts/fix-alan-hirsch-skill-paths.sh` | Path / symlink maintenance |

---

## 2. `~/Desktop/dev/repos/movemental-visual-editor`

- Studio: `(dashboard)`, courses, video, assessments, AI tooling.
- Engineering SSOT: **`_docs/`**. Root **`docs/`** may reference **quarantined** corpus material (see notes in that repo).

---

## 3. `~/Desktop/dev/repos/movemental-sites/alan-hirsch`

- **Tenant app:** `(public)`, `(admin)`, `api/`, **`src/lib/config/tenant.config.ts`**, **`_docs/_build/engineering/`** (PLATFORM_GUIDE, CHARTER, STATUS_REPORT).
- **Stack note:** Next.js **15** in tenant repo vs **16** on movemental — don’t assume identical middleware filenames when copying patterns.
- **Orientation:** tenant root [**`CLAUDE.md`**](../../../../dev/repos/movemental-sites/alan-hirsch/CLAUDE.md) includes **“Repo location (canonical)”** with the same paths as this doc.
- **Skills:** `.claude/skills/` here is the **authoritative tree** for tenant-linked symlinks in `movemental`.

---

## 4. `~/Desktop/dev/repos/alan-hirsch-content`

- Content-only: pathways, courses corpus, research; see that repo’s **`CLAUDE.md`**.

---

## 5. `~/Desktop/dev/repos/alan-books`

- English chapters: `corpus/alan_hirsch/<book-slug>/`; quarantine policy + Desktop archive paths in **`BOOK_CORPUS_QUARANTINE.md`**.

---

## SSOT by concern

| Concern | Where truth lives |
|---------|-------------------|
| movemental.ai UI, routes, nav | This repo — `SITE-SSOT.md`, `DESIGN.md`, `src/` |
| Studio internals | `movemental-visual-editor/_docs/` |
| Tenant runtime, six-layer chain | `movemental-sites/alan-hirsch/_docs/` |
| Course voice / pedagogy | `alan-hirsch-content` |
| Book Markdown + ingest | `alan-books` |

---

## Completed (baseline for agents — do not re-litigate)

**`movemental`**

- `.claude/settings.json` → `additionalDirectories` list above; symlink targets → **`movemental-sites/alan-hirsch`** skills + **`my-skills`**; absolute paths use **`dev`**.
- `.cursorignore` as above.
- Docs/prompts under `docs/` aligned to **`…/dev/repos/movemental-sites/alan-hirsch`** and lowercase **`dev`** where sibling repos are cited.
- **Status:** Verified 2026-05-02 — see **Implementation status** at top of this file.

**`movemental-sites/alan-hirsch`**

- Its `.claude/settings.json` updated off legacy **`…/alan-hirsch`** root.
- Bulk doc/script path refresh: **`Desktop/dev/repos`**, **`repos/alan-hirsch` → `repos/movemental-sites/alan-hirsch`** where it meant this repo.
- Tenant **`CLAUDE.md`** — repo location section.

**Still optional**

- Archive moves, single maintainer for duplicated audit skills across repos, optional **`docs/html/README.md`** stub — summarized in **Optional cleanup** above; procedural detail in [`curated-cleanup-plan-2026-05.md`](./curated-cleanup-plan-2026-05.md).

---

## Related (this repo)

- [`docs/arguments/SITE-SSOT.md`](../../arguments/SITE-SSOT.md)
- [`docs/projects/alan-hirsch/README.md`](../../projects/alan-hirsch/README.md)
- [`docs/build/prompts/mvmtl-cross-repo-documentation-index.md`](../prompts/mvmtl-cross-repo-documentation-index.md)
- [`curated-cleanup-plan-2026-05.md`](./curated-cleanup-plan-2026-05.md)
- Root [`CLAUDE.md`](../../../CLAUDE.md), [`AGENTS.md`](../../../AGENTS.md), [`.claude/settings.json`](../../../.claude/settings.json), [`.cursorignore`](../../../.cursorignore)
