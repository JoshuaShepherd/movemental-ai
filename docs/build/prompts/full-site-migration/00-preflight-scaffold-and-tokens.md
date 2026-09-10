# FSM-00: Preflight Scaffold & Token Bridge

**ID:** FSM-00  
**Phase:** Tier 0 — Scaffolding & Foundation  
**Target Route/Files:** `MIGRATION-STATE.md`, `src/v2/`, `src/app/(site-v2)/`  
**Dependencies:** None (first step in topological order)  
**Status:** Ready for execution  

---

## 1. Context & Objective

Before authoring any component or route, establish the shadow staging scaffold. This ensures:
1. All candidate code is developed side-by-side in `src/v2/` without altering or breaking existing production routes (`src/app/page.tsx`, `src/app/agent/page.tsx`, `src/app/program/page.tsx`, etc.).
2. The Ink Band design tokens from `src/app/globals.css` are wired and ready to be imported or composed.
3. `MIGRATION-STATE.md` is initialized at the repository root from `docs/handoff/templates/MIGRATION-STATE.md`.
4. The lockfile is verified under `pnpm` (pnpm 11 workspace rules per L-2).

---

## 2. Repo Sources to Read First

- `AGENTS.md` (Next.js 16.2.3 conventions)
- `docs/handoff/01-recon.md` (baseline verification against tree `205198904fdf`)
- `docs/handoff/02-drift.md` (authoritative drift rules)
- `docs/handoff/03-decisions.md` (decisions L-1 through L-6, S-1 through S-3, C-1 through C-5)
- `docs/handoff/04-component-map.md` (hex-to-token table)
- `docs/handoff/templates/MIGRATION-STATE.md`
- `src/app/globals.css` (Ink Band CSS custom properties)

---

## 3. Anti-Invention & Design Constraints

- **Zero hex in TSX files:** All colors must resolve through the CSS variables in `globals.css`:
  - `--color-ink-band-bg` (`#FBFAF6`) -> page background
  - `--color-ink-band-surface` (`#F6F3EC`) -> recessed section bands
  - `--color-ink-band-paper` (`#FFFDF7`) -> cards, elevated surfaces
  - `--color-ink-band-ink` (`#1A1A1A`) -> text primary
  - `--color-ink-band-ink-muted` (`#5C5651`) -> secondary text, eyebrows
  - `--color-ink-band-border` (`#E5DFD2`) -> hairlines
  - `--color-ink-band-blue` (`#22409B`) -> active actions, ink voice
  - `--color-ink-band-highlight` (`#EAFF3A`) -> marker swipe
  - `--color-ink-band-margin-red` (`#C08A7E`) -> notebook rule line (NEVER text)
- **Do not run `shadcn add`:** Only `src/components/ui/button.tsx` exists. Compose UI from tokens.
- **Package manager is strictly pnpm:** Never run `npm` or `yarn`.

---

## 4. Implementation Steps

1. **Initialize State File:**
   - Copy `docs/handoff/templates/MIGRATION-STATE.md` to `MIGRATION-STATE.md` at the repo root.
   - Record the base tree SHA: `205198904fdf`.
2. **Initialize Schema Request File:**
   - Copy `docs/handoff/templates/SCHEMA-REQUEST.md` to `SCHEMA-REQUEST.md` at the repo root if not already present.
3. **Scaffold Shadow Tree:**
   - Create directories:
     - `src/v2/components/` (candidate UI components)
     - `src/v2/lib/` (candidate helpers/data loaders)
     - `src/app/(site-v2)/v2/` (previewable route tree for manual and Playwright validation)
4. **Create Root Staging Layout:**
   - Create `src/app/(site-v2)/v2/layout.tsx` wrapping all `/v2/*` routes with the `.ink-band-surface` class and font variables (`font-sans`, `font-serif`, etc.) so that candidate pages render in high fidelity.
5. **Verify Lockfile Stability:**
   - Run `pnpm install --frozen-lockfile` (or `pnpm install`). Confirm `git diff --exit-code pnpm-lock.yaml` passes.

---

## 5. Definition of Done

- [ ] `MIGRATION-STATE.md` exists at repo root and names tree SHA `205198904fdf`.
- [ ] `SCHEMA-REQUEST.md` exists at repo root.
- [ ] `src/v2/components/`, `src/v2/lib/`, and `src/app/(site-v2)/v2/layout.tsx` exist.
- [ ] `pnpm-lock.yaml` is clean and unmutated.
- [ ] `pnpm typecheck` exits 0.

---

## 6. Verification Commands & Gate

```bash
# 1. Check state file
test -f MIGRATION-STATE.md && grep -q "205198904fdf" MIGRATION-STATE.md

# 2. Check staging directory
test -d src/v2/components && test -f src/app/\(site-v2\)/v2/layout.tsx

# 3. Check typecheck
pnpm typecheck

# 4. Check gate script
bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-00
```

---

## 7. Attempt Log (Append-Only)

| Date | Agent | Status | Notes |
| --- | --- | --- | --- |
| — | — | Not started | Ready for execution |
