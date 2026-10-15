# Home: "In practice," the proof section with real screens (S17)

**Source of truth:** board `Home-v4` on the Movemental canvas, "Home headline" page, committed under `source/`. Josh, October 15, 2026: "Migrate JUST THIS SECTION now for integration in the live home page without breaking anything else on it."

| Part | Built as |
|---|---|
| "In practice" / "Another way is already being built." and the two-sentence lede | `ProofInPractice` in `src/components/mv/home/sections.tsx`. Copy verbatim from the board. Export name and `id="proof"` kept, so `#proof` from Work with Movemental and `MV_ROUTES.proof` still land here. |
| Alan Hirsch and Brad Brisco side by side, Brad set lower | `.mv-built-feat` (58/42) and `.mv-built-offset` in `src/app/(new)/mv.css`. One column under 1100px. |
| Michael Cooper and Kate Coleman and Cham Kaur-Mann as a pair | `.mv-built-pair`. |
| Each platform: a framed main screen with its host, a second screen inset, a dated caption | `ProofScreens`; `.mv-shot`, `.mv-shot-main`, `.mv-shot-inset`. Reuses `.mv-preview` and `.mv-preview-bar` unchanged. |
| Outbound links | `MV_PROOF_SITES` in `src/components/mv/routes.ts`. Added `bradBriscoNeighborhood` and `kateColeman`; the existing keys are unchanged (Work page uses them). |
| Closing line "Distinct people. Distinct purposes. Shared foundations that keep getting more capable." | Verbatim. |

**Images:** eight screenshots supplied by Josh on October 15, 2026, saved as webp in `public/images/site/proof/` (a `public/` exception to the diff gate, needed for the section). Every image has alt text and loads lazily.

**Changed from the board:** the inset on Brad's landing page was cropped to the headline, so the page's "$10" price does not appear on the home page (locked rule: no prices anywhere). The board's inset still shows the full screen.

**Removed:** `SitePreview` and the old "Built with people already doing the work." section, including its labeled placeholders (S01 deferral now closed) and its "Explore the movement leaders →" link. The Leaders band directly below links to `/leaders`.

**Open:**
- Kate and Cham's link goes to their preview host, `kate-coleman.movemental.ai`. Change `MV_PROOF_SITES.kateColeman` when their own domain is live.
- The captions are dated "October 2026." Retake the screens when the sites change enough to matter.

**Gates:** typecheck clean; eslint clean on the changed files (the one error under `src/components/mv/**` is in `assessment/assessment-views.tsx`, untouched); link:check LOCKED (35 hrefs); no new color literals; `/` 200 under `next dev`; all eight images load; the section's widest edge is inside the viewport at 1440 and 390. Under `next dev` the document reports `scrollWidth` 1551 at 1440 and 419 at 390 with or without this slice, but `scrollX` stays 0, so nothing scrolls sideways.
