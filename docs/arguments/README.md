# Arguments & site knowledge (`docs/arguments`)

This folder holds **argument / messaging material** for Movemental and the **authoritative site snapshot** agents should use when the question is “what does the live product look like *right now*?”

## Single source of truth (by concern)

| Concern | Canonical doc | Notes |
| -------- | ---------------- | ----- |
| **Routes, nav, IA, content surfaces** | [SITE-SSOT.md](./SITE-SSOT.md) | Generated from `src/app/(site)` and `src/components/nav/nav-links.ts`. Prefer this over older “by page” claim bundles when paths conflict. |
| **Visual design & tokens** | [docs/design/DESIGN.md](../design/DESIGN.md) | “The Digital Curator” charter; implementation in `src/app/globals.css`. |
| **Stitch → React build rules** | [docs/build/prompts/stitch-to-react-migration.md](../build/prompts/stitch-to-react-migration.md) | Migration mechanics and token remap tables. |
| **Page inventory (detailed)** | [docs/build/audit/site-pages-inventory.md](../build/audit/site-pages-inventory.md) | Long-form table including book chapter slugs; keep in sync when routes change. |
| **Claim library (YAML cards)** | [custom-gpt/](./custom-gpt/) | `messaging-00-live-site-and-narrative-ssot.md` (hand-maintained live narrative + article slugs) **then** `messaging-01` … `messaging-08` — strategic claims; **page routing inside each card may name retired pages** (see [SITE-SSOT.md §8](./SITE-SSOT.md#8-legacy-claim-routing-messaging-corpus-vs-live-site)). |

## Subfolders

- **`custom-gpt/`** — Flat markdown bundle for Custom GPT upload (`messaging-*.md`, optional `jr-woodward-knowledge-base.md`). See [custom-gpt/README.md](./custom-gpt/README.md).

## Maintenance

1. After adding or removing a marketing route under `src/app/(site)/`, update [SITE-SSOT.md](./SITE-SSOT.md) and [docs/build/audit/site-pages-inventory.md](../build/audit/site-pages-inventory.md) in the same change (or immediately after).
2. When `docs/html/deduped-megapage.html` or tabbed routing HTML changes, regenerate bundles: `node scripts/extract-arguments.mjs` (see custom-gpt README). After home, `/fragmentation`, book spine, or publishable articles change, update **`docs/arguments/custom-gpt/messaging-00-live-site-and-narrative-ssot.md`** by hand (the extract script does not touch it).
3. When JR Woodward dossier changes: `node scripts/regenerate-jr-woodward-knowledge-base.mjs`.
