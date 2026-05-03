# Curated cleanup plan (2026-05)

**Authority:** This plan is derived **only** from [`workspace-four-repo-context-strategy.md`](./workspace-four-repo-context-strategy.md) (2026-05-02).  
**Posture:** Conservative — archive over delete; protect corpus, tenant app, Studio, and content repos; shrink context noise for **movemental.ai** work.

---

## 1. Executive Summary

The workspace split is stable: **`movemental`** is movemental.ai (Next 16), **`movemental-visual-editor`** is the Studio, **`movemental-sites/alan-hirsch`** is the Alan tenant app, with **`alan-hirsch-content`**, **`alan-books`**, and **`my-skills`** as content, corpus, and shared-skill layers. In **`movemental`**, the heavy lifts are **already done** per verification: `.claude/settings.json` points at **`movemental-sites/alan-hirsch`** (not legacy `…/alan-hirsch`), `.cursorignore` drops **`docs/html/`** and bulk research PDFs, top-level skill **symlinks resolve**, and **`AGENTS.md`** documents the repair script. **Highest-value remaining work is optional:** periodic verification after machine moves, **`rg`** review for stray legacy **filesystem** paths in prompts/docs, conservative **archives** under `~/Desktop/Archive/2026-05-cleanup/`, a **single-maintainer policy** for duplicated generic skills, and small **movemental.ai** habits (work from `SITE-SSOT.md`, `DESIGN.md`, `src/` — not HTML prototypes).

---

## 2. High-Priority / Quick-Win Items (if any remain)

Nothing mandatory is blocked in **`movemental`** as of the architecture report. Treat these as **light recurring hygiene** (especially after a new clone or disk layout change):

**Broken symlink audit**

```bash
find "${HOME}/Desktop/movemental/.claude/skills" -maxdepth 1 -type l ! -exec test -e {} \; -print
```

**Repair paths + symlinks (only if the audit prints paths)**

```bash
chmod +x "${HOME}/Desktop/movemental/scripts/fix-alan-hirsch-skill-paths.sh"
"${HOME}/Desktop/movemental/scripts/fix-alan-hirsch-skill-paths.sh"
```

**Stale filesystem path references** — review each hit; **do not** bulk-replace URL slugs or JSON ids named `alan-hirsch`:

```bash
rg '/Dev/repos/alan-hirsch|Desktop/dev/repos/alan-hirsch/' "${HOME}/Desktop/movemental" \
  --glob '*.md' --glob '*.json' --glob '*.ts' --glob '*.tsx'
```

**Stale settings backups** — after confirming a known-good `.claude/settings.json`, you may remove redundant `.bak.*` copies (optional, manual).

---

## 3. Per-Repo Cleanup Recommendations

### `~/Desktop/movemental`

| | |
|--|--|
| **Keep (SSOT)** | `src/`; `docs/design/`, `docs/arguments/` (incl. `SITE-SSOT.md`), `docs/build/prompts/`; `tests/`; `scripts/`; real (non-symlink) skills in `.claude/skills/`; [`CLAUDE.md`](../../../CLAUDE.md), [`AGENTS.md`](../../../AGENTS.md). |
| **Archive** | Large superseded **`docs/html/`** mockups **after** the React route ships and references are grep’d → e.g. `~/Desktop/Archive/2026-05-cleanup/movemental-html-drafts/`. |
| **Delete** | **Nothing** required. Optional only: confirmed-redundant `.claude/settings.json.bak.*` after backup discipline. |
| **`.cursorignore` / `.claudeignore`** | **Already:** `.next/`, `node_modules/`, `docs/html/`, `docs/movement_leader_research/**/*.pdf`, **`docs/book-development/archive/`** (added 2026-05-02 cleanup run). Optional **`.claudeignore`** mirroring `.cursorignore` if Claude Code indexing should match Cursor exclusions. |
| **Docs** | **`docs/html/README.md`** added (2026-05-02) — prototypes ≠ SSOT; points to `DESIGN.md`, `SITE-SSOT.md`, `src/`. |

### `~/Desktop/dev/repos/movemental-visual-editor`

| | |
|--|--|
| **Keep** | `src/`, `drizzle/`, `packages/`; **`_docs/`** as Studio engineering SSOT; tenant-specific or Studio workflows you rely on. |
| **Archive** | Contents of **`_archive/`** or redundant snapshots **only after** listing and confirming **`_docs/`** links still resolve → e.g. `~/Desktop/Archive/2026-05-cleanup/movemental-visual-editor-archive/`. |
| **Delete** | **No** bulk deletes; `_archive/` may still hold migration clues. |
| **`.cursorignore` / `.claudeignore`** | `.next/`, `node_modules/`; optionally `_archive/`, noisy generated reports — tune per local noise. |
| **Docs** | Optional short pointer in that repo’s `CLAUDE.md` or `README`: quarantined corpus notes + link to **`alan-books`** quarantine policy by name. |

### `~/Desktop/dev/repos/movemental-sites/alan-hirsch`

| | |
|--|--|
| **Keep** | Full app; **`_docs/`** (PLATFORM_GUIDE, CHARTER, STATUS_REPORT chain); **`src/lib/config/tenant.config.ts`**; **`.claude/skills/`** as **authoritative** tenant skill tree (symlink source for `movemental`). |
| **Archive** | Optional: old **`captures/`** or scratch exports if duplicated elsewhere. |
| **Delete** | None in first wave. |
| **`.cursorignore` / `.claudeignore`** | `.next/`, `node_modules/`; optional `captures/` if large and unused. |
| **Docs** | Keep tenant **`CLAUDE.md`** “Repo location (canonical)” aligned with [`workspace-four-repo-context-strategy.md`](./workspace-four-repo-context-strategy.md). |

### `~/Desktop/dev/repos/alan-hirsch-content`

| | |
|--|--|
| **Keep** | `courses/`, `pathways/`, `articles/`, `corpus/`, `research/`; voice/strategy docs; **`.claude/skills/`**; repo **`CLAUDE.md`**. |
| **Archive** | Legacy root **`skills/`** tree **only after** confirming active workflows use **`.claude/skills/`**. |
| **Delete** | Not required for policy alignment; avoid deleting corpus-adjacent trees without archive. |
| **`.cursorignore` / `.claudeignore`** | Optional: `research/**/*.pdf` or bulk `research/` when not authoring in that repo. |
| **Docs** | None mandatory beyond keeping **`CLAUDE.md`** as entrypoint. |

### `~/Desktop/dev/repos/alan-books`

| | |
|--|--|
| **Keep** | `corpus/alan_hirsch/**` (live chapters), `_meta/`, `scripts/`, `_prompts/`, `.claude/skills/`, **`BOOK_CORPUS_QUARANTINE.md`**. |
| **Archive** | `corpus/alan_hirsch/_archive/`, superseded `reports/`, `tmp/`, verbose `logs/` → e.g. `~/Desktop/Archive/2026-05-cleanup/alan-books-tmp/` — **only after** confirming no scripts assume those paths in place (read **`BOOK_CORPUS_QUARANTINE.md`**). |
| **Delete** | **Not recommended** for corpus files. Optional: regenerable **`tmp/*`** **after** copy to Archive. |
| **`.cursorignore` / `.claudeignore`** | `tmp/`, `logs/`, `.marker-work/`, heavy ingest dirs if present; `node_modules/`. |
| **Docs** | Quarantine / archive policy stays authoritative in **`BOOK_CORPUS_QUARANTINE.md`** in that repo. |

### `~/Desktop/dev/repos/my-skills`

| | |
|--|--|
| **Keep** | Entire tree as **shared skill SSOT**; `_reference` and cross-repo generic skills. |
| **Archive** | Obsolete skill **folders** only, with a **README** in Archive naming the replacement skill path. |
| **Delete** | Avoid; prefer archive + README. |
| **`.cursorignore` / `.claudeignore`** | Only if a subtree is huge and never invoked — default is **keep visible** for agents. |
| **Docs** | Maintain naming consistency with what **`movemental`** symlinks expect. |

---

## 4. Skills & Documentation SSOT Final Policy

| Layer | Role |
|-------|------|
| **`my-skills`** | **Primary shared hub** — cross-tenant generics, `_reference`, tooling skills. **One maintainer** for any skill that exists in more than one repo under the same name. |
| **`movemental-sites/alan-hirsch/.claude/skills`** | **Authoritative tenant** skills; **`movemental`** links read-only via symlink; edits happen here or in `my-skills` for shared behavior. |
| **`movemental/.claude/skills`** | **Site-specific** skills plus symlinks — no hand-maintained duplicate forest. |
| **`movemental-visual-editor`** | **Studio-native** skills remain here; **generic** audit/style duplicates should converge on **`my-skills`** over time. |

**Documentation:** Canonical workspace orientation remains [`workspace-four-repo-context-strategy.md`](./workspace-four-repo-context-strategy.md). **`movemental`** agent entrypoints: [`CLAUDE.md`](../../../CLAUDE.md), [`AGENTS.md`](../../../AGENTS.md).

---

## 5. movemental.ai Polishing Priority

1. **Trust indexing exclusions** — [`docs/html/`](../../html/) is excluded from Cursor via [`.cursorignore`](../../../.cursorignore); do not treat mockups as SSOT during `(site)` work.
2. **Work from the triad** — [`docs/arguments/SITE-SSOT.md`](../../arguments/SITE-SSOT.md), [`docs/design/DESIGN.md`](../../design/DESIGN.md), **`src/`**; when copy and code diverge, **code wins** — update docs in the same change.
3. **After promoting HTML → React** — grep for references, then **archive** (not delete-first) superseded HTML under `~/Desktop/Archive/2026-05-cleanup/movemental-html-drafts/`.
4. **Optional stub** — `docs/html/README.md` stating prototypes ≠ production SSOT (reduces mistaken agent assumptions).

---

## 6. Ready-to-Run Commands & Scripts

**Archive scaffold (safe, idempotent)**

```bash
mkdir -p "${HOME}/Desktop/Archive/2026-05-cleanup"/{movemental-html-drafts,alan-books-tmp,movemental-visual-editor-archive}
```

**Verification loop (`movemental`)**

```bash
find "${HOME}/Desktop/movemental/.claude/skills" -maxdepth 1 -type l ! -exec test -e {} \; -print
```

**Path repair script (`movemental`)**

```bash
chmod +x "${HOME}/Desktop/movemental/scripts/fix-alan-hirsch-skill-paths.sh"
"${HOME}/Desktop/movemental/scripts/fix-alan-hirsch-skill-paths.sh"
```

**Find legacy filesystem strings (`movemental` tree — manual review)**

```bash
rg '/Dev/repos/alan-hirsch|Desktop/dev/repos/alan-hirsch/' "${HOME}/Desktop/movemental" \
  --glob '*.md' --glob '*.json' --glob '*.ts' --glob '*.tsx'
```

**Settings rollback (if a bad edit)**

```bash
cp "${HOME}/Desktop/movemental/.claude/settings.json.bak.YOURTIMESTAMP" \
  "${HOME}/Desktop/movemental/.claude/settings.json"
```

**Example archive pattern (do not run `mv` until paths and dependents are confirmed)**

```bash
# Illustration only — adjust after reading alan-books BOOK_CORPUS_QUARANTINE.md
# ARCH="${HOME}/Desktop/Archive/2026-05-cleanup/alan-books-tmp"
# mkdir -p "$ARCH"
# mv "${HOME}/Desktop/dev/repos/alan-books/tmp" "$ARCH/"   # example
```

---

## Related

- [`workspace-four-repo-context-strategy.md`](./workspace-four-repo-context-strategy.md) — architecture + verified status
- Root [`.cursorignore`](../../../.cursorignore), [`.claude/settings.json`](../../../.claude/settings.json), [`scripts/fix-alan-hirsch-skill-paths.sh`](../../../scripts/fix-alan-hirsch-skill-paths.sh)
