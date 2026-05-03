# Prompt 08 — System builds hub (`/services/system-builds`)

## Priority

**P08 — Modular offer shelf.** React hub lists builds with slugs (`src/app/(site)/services/system-builds/page.tsx`, Stitch `00ef26469de34fb1be60e7fb0c10483c`). **Partial HTML:** vertical slices exist (`content-system-build.html`, `fundraising-system-build.html`, `governance-ethics-system-build.html`) but **no parent page** that explains **how modules combine**, **four-week sprint shape**, and **routing** between Foundation vs verticals.

## Deliverable

- `docs/html/system-builds.html` — parent narrative + cards linking to existing vertical HTML files **and** the Foundation prompt output.

## Source documents

| Path | Use for |
| --- | --- |
| `src/app/(site)/services/system-builds/page.tsx` | Build list, tier/price presentation (if present), metadata. |
| [`docs/notes/mvmtl-running-notes-founder-input-2026-04.md`](../../notes/mvmtl-running-notes-founder-input-2026-04.md) | **Five modules**, **four-week sprints**, standalone optionality, discovery lab first positioning. |
| [`docs/html/discovery-lab.html`](../../html/discovery-lab.html) | Module 1 story tone. |
| [`docs/html/content-system-build.html`](../../html/content-system-build.html) | Content track vertical. |
| [`docs/html/fundraising-system-build.html`](../../html/fundraising-system-build.html) | Fundraising track vertical. |
| [`docs/html/governance-ethics-system-build.html`](../../html/governance-ethics-system-build.html) | Governance/ethics vertical. |

## IA clarity (match live routes)

- **Combined vertical:** `/services/system-builds/content-fundraising` — single React page titled **Content & Fundraising System Builds** (`content-fundraising/page.tsx`, Stitch `860b6a8f56bc4062af0a75f36c529fa8`). Hub cards should **not** pretend there are two separate child URLs for content vs fundraising unless the app is split later.
- **Foundation:** `/services/system-builds/foundation` — governance + ethics + related foundation framing (`foundation/page.tsx`).
- **Discovery Lab** lives at **`/discovery-lab`** (top-level route), not under `system-builds/` — link there from the hub as **module 1** / entry sprint (per April 2026 notes).
- Note: `system-builds/page.tsx` currently repeats some `slug` values in its `builds` array; treat **`page.tsx` links and filesystem routes** as source of truth over the array stub data when writing static HTML.

## Acceptance criteria

- [ ] One diagram or numbered list: **recommended sequence** vs **à la carte** (no false rigidity if practice varies).
- [ ] Each card: **outcome statement** + link + “who it’s for” subline.
- [ ] CTA: **Contact** with expectation of scoping call.
