# FSM-31: Production Cutover & Platform Archival

**ID:** FSM-31  
**Phase:** Tier 6 — Atomic Production Cutover  
**Target:** Root production slugs (`src/app/`, `src/components/`)  
**Dependencies:** FSM-30 (Whole-Suite Testing Gate) marked **Done**  
**Status:** Ready for execution  

---

## 1. Context & Objective

This is the final phase of the website replacement program. All candidate components, routes, and data connections have been built side-by-side in `src/v2/` and verified 100% green against all unit, lint, typecheck, and Playwright tests.

In this step, the runner executes an atomic cutover:
1. **Archive Current Platform:** Snapshots the existing platform code into `archive/platform-v1-<timestamp>/` to preserve legacy history without losing git provenance.
2. **Promote v2 into Canonical Slugs:** Swaps the candidate routes and components into root locations (`src/app/`, `src/components/`), replacing superseded slugs.
3. **Clean Up Staging Harness:** Removes temporary `/v2` preview route groups.
4. **Post-Cutover Whole-Repo Validation:** Runs `pnpm validate:all`, `pnpm build`, and tests.
5. **Issue Migration Receipt:** Closes out `MIGRATION-STATE.md` and issues the final receipt per `docs/handoff/07-return-channel.md`.

---

## 2. Protected Routes (Do Not Archive or Delete)

Per authoritative drift rules (§02-drift.md & §03-decisions.md):
- **Auth routes:** `src/app/login/`, `src/app/signup/`, `src/app/forgot-password/`, `src/app/auth/`
- **Legal pages:** `src/app/terms/`, `src/app/privacy/`, `src/app/cookies/`
- **AI Reality Dashboard:** `src/app/dashboard/ai-reality/` (S-1: live with substantive backend; no design exists; must remain untouched)
- **API routes:** `src/app/api/`

---

## 3. Automated Cutover Script

Execute the cutover script:

```bash
# Dry run first to preview the file movements
tsx scripts/cutover-v2-website.ts --dry-run

# Execute atomic cutover
tsx scripts/cutover-v2-website.ts --execute
```

---

## 4. Manual Cutover Procedure (Fallback)

If executing manually:
1. Create archive directory:
   ```bash
   TIMESTAMP=$(date +%Y%m%d_%H%M%S)
   mkdir -p "archive/platform-v1-${TIMESTAMP}"
   ```
2. Archive superseded route directories from `src/app/` (e.g. legacy `agent/`, `program/`, `enroll/`, `assess/` if being replaced).
3. Move `src/v2/components/*` into `src/components/v2/` or replace superseded components.
4. Promote staging pages from `src/app/(site-v2)/v2/*` into canonical `src/app/*` slugs.
5. Remove `src/app/(site-v2)/`.
6. Run `pnpm build` to confirm zero duplicate-route errors.

---

## 5. Post-Cutover Whole-Repo Validation

Every command must exit 0:

```bash
# 1. Full semantic & route alignment
pnpm validate:all

# 2. Typecheck
pnpm typecheck

# 3. Lint
pnpm lint

# 4. Production build
pnpm build

# 5. Automated test sweep
pnpm test:run
```

---

## 6. Migration Receipt & State Closeout

Update `MIGRATION-STATE.md` at the repo root:
1. Record final commit SHA (`git rev-parse HEAD`).
2. Mark all phases 0–8 as **Done**.
3. Record S-1 (`/dashboard/ai-reality` preserved untouched).
4. Record S-2 (no unused safety tables wired).
5. Record S-3 (publishing permission noted).
6. Record L-3 (25 movement leaders: names and headshots only).

---

## 7. Definition of Done

- [ ] Current platform archived to `archive/platform-v1-<timestamp>/`.
- [ ] New website live at root slugs (`/`, `/agent`, `/agent/path/safety`, `/assess`, `/program`, `/enroll`, etc.).
- [ ] `pnpm build` completes with 0 errors and 0 duplicate-route warnings.
- [ ] All post-cutover verification commands pass green.
- [ ] `MIGRATION-STATE.md` finalized with receipt.

---

## 8. Attempt Log (Append-Only)

| Date | Agent | Status | Notes |
| --- | --- | --- | --- |
| — | — | Not started | Ready for execution |
