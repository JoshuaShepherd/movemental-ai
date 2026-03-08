# Using the Dave Ferguson HTML Template in the Next.js Site

The Dave Ferguson site is a standalone HTML/CSS/JS template in `html/dave-ferguson/`. To use it as a **shareable template** on the primary Next.js app (not in public nav, but reachable by URL), use this approach.

## Approach: Static template under `public/`

1. **Source of truth** stays in `html/dave-ferguson/` (all HTML, `styles/`, `scripts/`).
2. **Sync into Next.js** by copying that tree into `public/templates/dave-ferguson/` and rewriting asset paths so they work when served from the site root.
3. **Shareable URL**: `https://your-domain.com/templates/dave-ferguson/` (and `/templates/dave-ferguson/about.html`, etc.). No link in main nav; share the URL when needed.
4. **Optional**: A Next.js route `/templates/dave-ferguson` that redirects to `/templates/dave-ferguson/` so you have one clean URL without typing `index.html`.

### Why this is seamless

- **No React rewrite** — The template stays HTML; no conversion or duplicate maintenance.
- **Same codebase** — Edit in `html/dave-ferguson/`; run the sync script before deploy (or in CI).
- **Assets** — Images already live in `public/dave-ferguson/` and `public/media-library/`. The sync step only changes HTML references from `../../public/...` to absolute paths like `/dave-ferguson/`, so the same assets are used.
- **Not public** — Don’t add the URL to nav or footer; only people with the link see it.

## Steps

### 1. Run the sync script

From the repo root:

```bash
node scripts/sync-dave-ferguson-template.mjs
```

This script:

- Copies `html/dave-ferguson/` → `public/templates/dave-ferguson/` (HTML, `styles/`, `scripts/`).
- In the **copied** HTML files only, replaces:
  - `../../public/dave-ferguson/` → `/dave-ferguson/`
  - `../../public/media-library/` → `/media-library/`
- Does **not** copy or change `html/dave-ferguson/` itself; that remains the source to edit.

### 2. Use the template URL

- **Home**: `https://your-domain.com/templates/dave-ferguson/` or `.../templates/dave-ferguson/index.html`
- **Other pages**: `.../templates/dave-ferguson/about.html`, `.../templates/dave-ferguson/books.html`, etc.

With the optional redirect page, `https://your-domain.com/templates/dave-ferguson` (no trailing slash) will redirect to `.../templates/dave-ferguson/`.

### 3. When to run the script

- **Before deploy**: Run `node scripts/sync-dave-ferguson-template.mjs` in your build pipeline (e.g. `npm run build` or a pre-deploy step).
- **Locally**: Run it after editing files in `html/dave-ferguson/`, then refresh the browser at `/templates/dave-ferguson/`.

You can add an npm script, e.g.:

```json
"scripts": {
  "template:sync-dave-ferguson": "node scripts/sync-dave-ferguson-template.mjs"
}
```

### 4. Optional: Link from the templates dashboard

To help internal users find the template without guessing the URL, add a card or link on `app/(no-nav)/templates-dashboard/` that points to `/templates/dave-ferguson` (or the full URL). That keeps it “not in main nav” but discoverable for your team.

## What not to do

- **Don’t** add `/templates/dave-ferguson` to the main site navigation or footer if you want it unlisted.
- **Don’t** edit the copied files in `public/templates/dave-ferguson/`; they get overwritten by the sync. Always edit `html/dave-ferguson/`.
- **Don’t** put the HTML in a React page (e.g. `dangerouslySetInnerHTML` of the full document) — serving it as static files from `public/` is simpler and keeps the template self-contained (CSS, JS, chatbot, etc.).

## Summary

| Item | Location |
|------|----------|
| Edit template | `html/dave-ferguson/` |
| Sync script | `scripts/sync-dave-ferguson-template.mjs` |
| Deployed template | `public/templates/dave-ferguson/` (after sync) |
| Shareable URL | `/templates/dave-ferguson/` (and sub-pages) |
| Optional redirect | Next route `/templates/dave-ferguson` → `/templates/dave-ferguson/` |
