# Template Library — Sync from Templates Repo

**Purpose:** The HTML design-mode prototypes under `public/templates/library/` are a **copy** of the templates repo’s `directories/` folder. Do not edit files in `public/templates/library/`; they are overwritten when you sync.

---

## Source of truth

- **Repo:** `c:\dev\#source\templates`
- **Folder:** `directories/` (index.html, templates-manifest.json, design-mode folders, data/, images/, js/)

All edits to the template library (HTML, CSS, JS, data, images) should be made in that repo. This site only consumes the synced copy.

---

## How to update the site

From this repo’s root (`movemental-ai`):

```bash
npm run template:sync-library
```

Or with an explicit source path (e.g. if the templates repo is elsewhere):

**PowerShell:**

```powershell
$env:TEMPLATES_SOURCE = "c:\dev\#source\templates\directories"
node scripts/sync-template-library.mjs
```

**Cmd:**

```cmd
set TEMPLATES_SOURCE=c:\dev\#source\templates\directories
node scripts/sync-template-library.mjs
```

The script wipes `public/templates/library/` and copies the full `directories/` tree. No path rewriting is applied; relative paths in the templates work as-is when served at `/templates/library/{template-id}/`.

---

## Configuration

- **Script:** `scripts/sync-template-library.mjs`
- **Default source:** `../../#source/templates/directories` (relative to this repo root). Override with **`TEMPLATES_SOURCE`** (absolute or relative to repo root).
- **Dashboard:** `app/(no-nav)/templates-dashboard/TemplatesDashboardClient.tsx` loads `/templates/library/templates-manifest.json` and links to `/templates/library/{id}/`.
- **Redirects:** `next.config.mjs` redirects `/templates/library` and `/templates/library/:template` to the corresponding index.html.

Full sync and config details: **`c:\dev\#source\templates\_docs\SYNC_TEMPLATES_TO_MOVEMENTAL_AI.md`**.
