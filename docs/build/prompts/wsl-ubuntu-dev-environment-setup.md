# WSL Ubuntu dev environment setup (post–Mac migration)

**Use this doc when:** the repo was cloned or synced onto **WSL2 Ubuntu** after living on **macOS**, or when dev tooling feels unexpectedly slow or flaky (Cursor, Claude Code, file watchers, installs).

**Instructions for agents:** Work through the checklist **in order**. For each section, run the suggested commands (or equivalent), record failures, and fix the lowest-level cause first (OS limits → Node/pnpm → clean install → native addons → app env). Do not assume Mac paths or Mac-only tools exist on Linux.

---

## 0. Filesystem and performance (WSL-specific)

Crossing the Windows ↔ Linux boundary is the most common source of slowness.

- [ ] **Repo lives on the Linux filesystem** (e.g. `/home/<user>/dev/...`), **not** under `/mnt/c/` or other NTFS mounts. If the project is on `C:\`, move or re-clone into `~` in WSL.
- [ ] **Cursor / IDE** opens the **WSL** workspace (Remote WSL or equivalent), not a slow UNC path into Linux from Windows unless that path is known-good for your setup.
- [ ] Optional: On Windows, exclude the WSL virtual disk or distro folder from aggressive real-time antivirus scanning if policy allows (often improves I/O for `node_modules` and `.next`).

---

## 1. Core Linux toolchain

- [ ] **Git** installed and identity configured (`user.name`, `user.email`).
- [ ] **SSH keys** (or HTTPS credential helper) working for Git remotes from WSL.
- [ ] **Line endings:** If the repo uses LF (typical for Next.js), ensure Git is not forcing CRLF on checkout in WSL (`core.autocrlf` usually `input` or `false` on Linux).

---

## 2. Node.js version

This repo targets modern Node (see `@types/node` in `package.json`; **Node 20 LTS** is a safe default; **22** is fine if your team standardizes on it).

- [ ] Install Node via **nvm**, **fnm**, **asdf**, or another version manager (avoid relying on an outdated distro `apt` Node).
- [ ] Align the active Node major with the team; verify with `node -v`.
- [ ] Optional but helpful: add a repo-root **`.nvmrc`** (or document the chosen major in team notes) so every machine pins the same version.

---

## 3. pnpm (required)

This repo uses **pnpm only** (not npm/yarn).

- [ ] **Corepack** enabled so pnpm matches the package manager contract:

  ```bash
  corepack enable
  corepack prepare pnpm@latest --activate
  ```

- [ ] Confirm `pnpm -v` runs inside WSL.

**PATH trap (common on WSL):** If `corepack enable` prints `bad interpreter: /bin/sh^M` or similar, a **Windows** `corepack` / Node install is earlier on `PATH` than Linux (often under `/mnt/c/Program Files/nodejs/`). Fix by installing Node with **nvm** on WSL, then **prepending** nvm’s `bin` to `PATH` and/or **removing** `/mnt/c/...` Node directories from `PATH` for dev shells. Using **Windows pnpm** (`/mnt/c/Users/.../pnpm`) for a Linux repo also hurts I/O; prefer Linux `pnpm` via Corepack.

- [ ] If migrating from a machine that used a different pnpm major, prefer a **clean install** (see §6) after aligning pnpm.

---

## 4. Environment variables and paths

Mac-specific paths in `.env.local`, scripts, or shell profiles will break on Linux.

- [ ] **`pnpm check:env`** passes after `.env.local` exists (see `scripts/check-env.ts` for required keys).
- [ ] If using shared env merge scripts (`pnpm env:local-from-shared`), confirm **`DEV_DOTENV_SHARED_PATH`** (or the default path in `scripts/merge-env-local-from-shared.mjs`) points to a file that **exists on this machine** — not a Mac-only path like `~/Desktop/...` unless that path is real in WSL.
- [ ] **`DATABASE_URL`**, Supabase URLs, and any local tunnel hosts use endpoints reachable **from WSL** (localhost vs host.docker.internal vs LAN IP as appropriate).

---

## 5. Vercel / deployment CLI (if used locally)

- [ ] `vercel` CLI available if you pull env or link projects (`pnpm vercel:pull`, `vercel link`).
- [ ] Logged in: `vercel whoami` succeeds.

---

## 6. Clean install (strongly recommended after OS change)

Native modules and `node_modules` built on macOS are **not** portable to Linux.

- [ ] From repo root:

  ```bash
  rm -rf node_modules .next
  pnpm install
  ```

- [ ] If anything still resolves oddly, delete **`pnpm-lock.yaml` only** as a last resort after team agreement (normally **keep** the lockfile and fix the underlying conflict).

---

## 7. Native addons and heavy devDependencies

- [ ] **`sharp`:** Reinstalled implicitly by `pnpm install` on Linux; if image optimization fails, wipe `node_modules` and reinstall (§6).
- [ ] **Playwright** (if you run e2e): after install, run browser setup as documented by Playwright for Linux, e.g. `pnpm exec playwright install` (and system deps if prompted). If Playwright reports **no supported browser build for your distro** (e.g. very new Ubuntu), upgrade Playwright when a release adds support, run e2e in CI, or use a supported base image.

---

## 8. File watchers and “too many open files”

Next.js / Turbopack / Vitest can exhaust inotify or file descriptor limits on Linux.

- [ ] If you see EMFILE / watcher errors, raise limits (exact steps depend on distro; common fixes: increasing `fs.inotify.max_user_watches` and user `nofile` limits).
- [ ] Ensure no redundant watchers (multiple dev servers, duplicate IDE extensions scanning the same tree).

---

## 9. Smoke verification (repo-specific)

Run from repo root after install:

- [ ] `pnpm check:env`
- [ ] `pnpm typecheck`
- [ ] `pnpm lint`
- [ ] `pnpm dev` starts without immediate crash (then spot-check a page).
- [ ] Optional: `pnpm test:run` and/or `pnpm validate:all` if you changed schema-adjacent layers.

---

## 10. Cursor / Claude Code ergonomics

Slowness is often **I/O + indexer + extension load**, not “Ubuntu is slow.”

- [ ] **Exclude large dirs** from unnecessary indexing if your editor supports it (e.g. `node_modules`, `.next`, Playwright output).
- [ ] **Symlinks:** If `.cursor/skills` or other paths symlink elsewhere (see `AGENTS.md`), confirm targets exist on this machine; broken symlinks confuse tools and waste retries.
- [ ] **Parallel agents:** Fewer concurrent heavy tasks reduce contention on CPU and disk — especially on WSL2 with default memory/CPU caps.

---

## 11. Done criteria

Setup is “good enough to develop” when:

1. Repository is on the **Linux** filesystem under WSL.  
2. **Node + pnpm** match team expectations and install completes cleanly.  
3. **`pnpm check:env`** and **`pnpm typecheck`** succeed.  
4. **`pnpm dev`** runs and hot reload works without watcher crashes.

---

## Related

- Bootstrap commands also appear in repo **README** / **CLAUDE.md** (if present): `pnpm install`, `vercel env pull`, `pnpm check:env`, `pnpm dev`.
- Design/build migration prompts for UI work live alongside this folder under `docs/build/` (this file is **environment** setup only).
