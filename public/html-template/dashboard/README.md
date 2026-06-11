# Charter Dashboard (Ink Band HTML mockup)

Static SPA mockup imported from sibling repo `movemental-html-template` and restyled with **Ink Band** tokens per [`docs/design/INK_BAND_DESIGN_CHAIN.md`](../../../docs/design/INK_BAND_DESIGN_CHAIN.md).

## View locally

With `pnpm dev` running:

`http://localhost:3000/html-template/dashboard/charter-dashboard.html`

## Files

| File | Role |
|------|------|
| `charter-dashboard.html` | Shell markup |
| `css/ink-band-tokens.css` | Layer 1 tokens (Ink Band SSOT) |
| `css/base.css` | Reset + typography defaults |
| `css/dashboard.css` | Layer 4 dashboard chrome |
| `js/charter-dashboard.js` | Hash-routed client SPA |
| `js/charter-dashboard-mock.js` | Mock org / charter / assessment data |
| `OPEN-DECISIONS.md` | Product vocabulary notes (from source repo) |

## Design changes from source

The source mock in `movemental-html-template` used Oatmeal tokens with a **midnight sidebar**. This port uses Ink Band:

- Warm paper sidebar (`--paper` / `--surface`) with hairline borders
- Ink-blue (`#22409B`) for active nav, accents, and focus
- Playfair display + Inter body + IBM Plex Mono labels
- Red margin rule on the main content column
- Ink-pill primary CTAs; elevated CTA banner uses paper + ink border (not a dark band)

Mock-only — no auth, persistence, or API. See `OPEN-DECISIONS.md`.
