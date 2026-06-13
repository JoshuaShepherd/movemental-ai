# Platform stillshots (Playwright)

Manifest-driven full-page PNG captures for every public surface (plus optional authenticated routes). Pattern matches the alan-hirsch `captures/demo-manifest.json` workflow — adapted for movemental.ai.

## Layout

| Path | Purpose |
|------|---------|
| `platform-manifest.json` | Route list, filenames, auth/actions flags |
| `output/` | Generated PNGs (gitignored — copy elsewhere to commit) |
| `output/index.json` | Machine-readable run summary (paths, status, timestamps) |

Output folders mirror site areas: `public/`, `agent/`, `research/`, `auth/`, `utility/`.

## One-time setup

```bash
pnpm exec playwright install chromium
```

On unsupported Linux hosts (WSL without deps):

```bash
PLAYWRIGHT_HOST_PLATFORM_OVERRIDE=ubuntu24.04-x64 pnpm exec playwright install chromium
# optional: PW_CHROMIUM_PATH=/path/to/chromium
```

WSL note: if `pnpm dev` is not running, start it first — the script does not boot the server for you.

## Capture (local dev)

Terminal 1:

```bash
pnpm dev
```

Terminal 2:

```bash
pnpm captures:platform
```

Defaults: `http://localhost:3000`, viewport **1440×900**, output → `docs/captures/output/`.

## Capture (production / preview)

```bash
CAPTURE_BASE_URL=https://movemental.ai pnpm captures:platform
```

## Authenticated routes

Set credentials in the shell (never commit):

```bash
CAPTURE_EMAIL=you@example.com CAPTURE_PASSWORD='…' pnpm captures:platform
```

Manifest rows with `"requiresAuth": true` are skipped when credentials are absent. Sign-in uses `/login`.

## Partial runs

```bash
pnpm captures:platform -- --only agent,public
pnpm captures:platform -- --id agent-opening
```

## Refresh manifest from App Router

After adding/removing `page.tsx` files, regenerate the static route list and merge dynamic samples:

```bash
pnpm captures:manifest
```

Review `platform-manifest.json` before capturing — dynamic segments (`[slug]`, tokens) still need manual rows.

## Agent room sub-views

Some `/agent` states are one URL with different UI (opening chip → safety flow). Those use `"actions"` in the manifest instead of separate routes.

## Updating slugs

Research and program template slugs drift. Re-verify live URLs (or run against local dev) before a production capture pass.
