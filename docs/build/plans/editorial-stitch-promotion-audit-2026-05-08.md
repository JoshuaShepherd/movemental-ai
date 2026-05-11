# Editorial-stitch + LightTextureHero promotion — Slice 1 audit

Per [`docs/build/prompts/editorial-stitch-and-light-texture-hero-promotion.md`](../prompts/editorial-stitch-and-light-texture-hero-promotion.md) §5 Slice 1: this is the docs-only audit that names per-page swap-or-keep decisions before any code changes.

## Result

**Zero qualifying swaps across all 13 in-scope pages.** The prompt's green-light conditions (§4) are not satisfied anywhere on the live marketing tree. Slices 2–7 of the prompt collapse to no-op for this pass. Slice 8 (DESIGN.md note + audit-doc update) is the only code-touching work that should ship.

This outcome is anticipated by the prompt itself (§3.1: "Net effect on `/about`: likely zero swaps. That's fine"). Forcing swaps that fail green-light conditions is explicitly forbidden by §4 and §9.

## Why zero

The `editorial-stitch/` library was authored to a Stitch design-tool card gallery whose patterns the live site has since diverged from. The live pages use these idioms instead:

| Live idiom | Editorial-stitch counterpart | Why they don't match |
| --- | --- | --- |
| **Serif italic numerals (01–07)** as eyebrow on artifact / inside-section / step cards | `IconFeatureCard` (requires `icon: ReactNode` lead) | Numerals are ordinal style tags, not icons; swapping would either lose the editorial register or add a synthetic icon (copy change) |
| **Midnight hero bands** (`band-midnight` / `bg-inverse-surface`) on /, /about, /pathway/safety, /voices, /evidence, /work-with-us, /start-with-safety | `LightTextureHero` (light-only) | Wrong band; the live midnight hero is intentional |
| **Case-study hero band** on /churches, /nonprofits, /institutions | `LightTextureHero` (eyebrow + title + subhead + CTA only) | Case-study layout has TOC + sidebar + prose flow that LightTextureHero can't host |
| **Comparison-column grids** (with vs. without, problem vs. resolution) | None — no comparison primitive in palette | Pattern not covered |
| **Multi-CTA closing panels** (2–3 CTAs + tertiary line) | `GhostCtaPanel` (single CTA only) | CTA count disqualifies |
| **Form-integrated sections** (toolkit lead capture, diagnostic checklist) | None — no card primitive accepts forms | Form embed disqualifies |
| **Bespoke `bg-card` border-left accent cards** with no icon (Evidence Framework, In Practice) | `IconFeatureCard` (requires icon + eyebrow per card) | No icon, no per-card eyebrow |
| **Numbered ordered lists** (path-steps, FoundationFold) | None — no list primitive in palette | List ≠ card grid |

## Per-page findings

### `/about` — `src/components/studio/pages/AboutPage.tsx`

- **Hero (lines 102–128).** Midnight band, eyebrow + display + lede. **KEEP.** Wrong band for `LightTextureHero`.
- **Founder team (lines 135–193).** Photo grid; no icon, photo-led. **KEEP.** Disqualifies all card targets.
- **Origin (lines 199–249).** Two-column sticky-heading + flowing prose. **KEEP.** Prose pattern, not card.
- **Path compact (lines 256–306).** Bordered column grid with serif numerals (01–04). **KEEP.** Numerals not icons.
- **Commitments (lines 313–353).** Midnight band, ordinal numerals, no body per item. **KEEP.** List not cards.
- **Closing CTA (lines 359–402).** Two CTAs + tertiary "or download" line. **KEEP.** `GhostCtaPanel` is single-CTA.

**Net: 0 swaps, 6 keeps.**

### `/pathway/safety` — `src/components/studio/pages/pathway/SafetyPage.tsx`

- **Hero (lines 95–138).** Midnight band, dual CTA. **KEEP.**
- **Seven decisions grid (lines 143–174).** Serif italic numerals (01–07), no icons. **KEEP.**
- **Process steps (lines 179–222).** 4-column timeline with dot connectors. **KEEP.** Timeline not card.
- **Toolkit section (lines 227–261).** Image + heading + body + form. **KEEP.** Form embed.
- **Pricing section (lines 263–319).** Three-column included / not / payment terms. **KEEP.** Not a palette pattern.
- **Closing CTA (lines 324–359).** Midnight band with radial gradient. **KEEP.** No quote + citation; not `MidnightStatementQuote`.

**Net: 0 swaps, 6 keeps.**

### `/toolkit` — `src/app/(site)/toolkit/page.tsx`

- **Hero (lines 62–92).** Eyebrow + display + subhead + cover image right + form below. **KEEP.** Sidebar image + form integration.
- **Inside sections grid (lines 94–121).** 2-column, serif italic numerals (01–06). **KEEP.** Numerals.
- **Form section (lines 123–147).** Form-centered. **KEEP.** Form embed.
- **Skip-ahead section (lines 149–178).** Prose + 3 CTAs. **KEEP.** Multi-CTA.
- **After-download (lines 180–211).** Prose with day-by-day labels. **KEEP.** Prose.

**Net: 0 swaps, 5 keeps.**

### `/voices` — canonical `VoicesPage`

- **Hero (lines 27–43).** Midnight band, dual CTA. **KEEP.**
- **What voices means (lines 45–77).** 3-column with inline icons + custom hover/borders. **KEEP.** Custom hover effects don't fit `IconFeatureCard` lift surface.
- **Featured voices grid (lines 79–109).** Voice cards with grayscale-hover photos. **KEEP.** Bespoke voice-card pattern.
- **Why voices matter (lines 111–136).** 3-column text-only. **KEEP.** Prose.
- **Shared question (lines 138–165).** Custom quote + bullets. **KEEP.** Quote is inline prose; not midnight statement.
- **Final CTA (lines 167–182).** Midnight, dual CTA. **KEEP.**

**Net: 0 swaps, 6 keeps.**

### `/evidence` — `src/components/studio/pages/EvidencePage.tsx`

- **Hero (lines 16–32).** Midnight band, dual CTA. **KEEP.**
- **Reality section (lines 34–66).** 2×2 grid of `bg-card` divs, title + body, no icons. **KEEP.** No icon, no eyebrow.
- **Framework section (lines 69–115).** 4-column `bg-card` cards with border-left accent, no icons. **KEEP.**
- **In practice (lines 117–141).** 3-column `bg-section` cards with eyebrow + title + body. **KEEP.** No icon; the section's eyebrow is a label, not the per-card eyebrow `IconFeatureCard` expects.
- **People section (lines 143–168).** 3-column text-only. **KEEP.** Prose.
- **Posture (lines 170–186).** Prose + italic quote. **KEEP.** Inline quote, not midnight statement.
- **Final CTA (lines 188–204).** Midnight band. **KEEP.**

**Net: 0 swaps, 7 keeps.**

### `/start-with-safety` — `src/components/sections-mock/start-with-safety/start-with-safety-content.tsx`

- **Hero (lines 34–63).** Midnight, dual CTA. **KEEP.**
- **ReframeFold (lines 98–146).** Comparison columns. **KEEP.**
- **FoundationFold (lines 186–220).** Section with 5 lucide icons + title + body. The closest match in the audit, but **KEEP**: each card lacks the `eyebrow` `IconFeatureCard` requires; adding synthetic per-card eyebrows would be a copy change. Note in the palette gap log.
- **DiagnosticFold (lines 236–274).** Static checklist. **KEEP.** Form-like.
- **OutputsFold (lines 332–361).** 2×3 grid of title + body, no icons. **KEEP.**
- **PathFold (lines 397–437).** 4-item ordered list. **KEEP.** List.
- **FinalCta (lines 445–471).** Midnight. **KEEP.**

**Net: 0 swaps, 7 keeps.**

### `/path` — `src/components/sections-mock/path/path-content.tsx`

- **Hero (lines 59–87).** Midnight. **KEEP.**
- **CoreTensionFold (lines 116–161).** Comparison columns. **KEEP.**
- **OverviewFold (lines 190–236).** 4-item ordered list. **KEEP.** List.
- **StepDetailSection × 4 (lines 345–460).** Custom step-detail layout, ordinal numbers (1–4). **KEEP.**
- **OrderMattersFold (lines 489–535).** Comparison columns. **KEEP.**
- **EngagementFold (lines 549–591).** Prose + bullet list. **KEEP.**
- **FinalCta (lines 597–625).** Midnight. **KEEP.**

**Net: 0 swaps, 7 keeps.**

### `/pathway` — `src/components/studio/pages/PathwayOverviewPage.tsx`

- **Main section (lines 100–125).** Intro + custom `PathwayComponent`. **KEEP.**
- **Why this order (lines 127–146).** `bg-section` prose. **KEEP.**

**Net: 0 swaps, 2 keeps.**

### `/work-with-us` — `src/components/sections-mock/work-with-us/work-with-us-content.tsx`

- **Hero (lines 34–62).** Midnight, dual CTA. **KEEP.**
- **AudienceFold (lines 92–120).** Custom audience cards (link-forward, no icon, no lift). **KEEP.**

**Net: 0 swaps, 2 keeps.**

### `/churches`, `/nonprofits`, `/institutions` — case-study layout

All three route through `CaseStudyLayout` → `CaseStudyHeroBand` (`src/components/case-study/`). The hero is part of a TOC + sidebar + prose-flow case-study composition. **`LightTextureHero` does not fit** — it cannot host the case-study TOC and prose architecture. **KEEP.**

**Net: 0 swaps, 1 keep × 3 routes.**

### `/methodology` — route does not exist

The audit confirms there is no `/methodology` route or page in the live codebase. The `sections/methodology/` and `sections/methodology-eight-patterns/` directories from the unused-component audit are dead code and out of scope here.

## Palette gap log (per prompt §10)

| Gap | Why no existing component fits | Implication |
| --- | --- | --- |
| **Multi-CTA closing panel** | `GhostCtaPanel` is single-CTA. Live pages use 2 CTAs + tertiary line. | Either extend `GhostCtaPanel` to accept a `secondaryCta` prop, or stop trying to consolidate the closing-CTA pattern. |
| **Numeral-led card** | `IconFeatureCard` requires `icon: ReactNode`, but live pages use serif italic numerals as the lead element. | Either add a `NumeralFeatureCard` variant, or accept that numeral-led cards are a distinct editorial register. |
| **Comparison columns** (with / without, problem / resolution) | No comparison primitive in palette. | Frequent enough across `/start-with-safety`, `/path`, etc. that a `ComparisonColumns` primitive may be worth adding. |
| **Form-integrated section** (toolkit hero, diagnostic checklist) | No card primitive accepts a form. | Probably out of scope for `editorial-stitch`; forms have their own composition. |
| **Eyebrow-less title + body card** (Evidence Reality / Framework) | `IconFeatureCard` requires both icon and eyebrow. | Either add an `EyebrowlessFeatureCard` variant, or accept that the Evidence card pattern is its own register. |

The gap log is **not** acted on in this pass. It is the input to a future palette-expansion prompt that would extend `editorial-stitch` to cover the divergent live patterns.

## Recommended action

1. **Skip Slices 2–7.** No qualifying swaps. Forcing fits violates the prompt's hard rules.
2. **Ship Slice 8 immediately:** add a DESIGN.md note pointing future authors at `editorial-stitch/` and `LightTextureHero` so the next page author finds them before improvising. This is the value extraction even when current pages don't decompose cleanly.
3. **Update the unused-component audit** ([`unused-component-audit-2026-05-08.md`](unused-component-audit-2026-05-08.md) §1) to reflect that the PROMOTE candidates were audited and remain dark — not because they're bad, but because the live site has diverged from their design assumptions. Recommendation downgrades from PROMOTE to ARCHIVE-OR-EXTEND pending a palette-expansion decision.
4. **File the palette gaps** above as the input to a future palette-expansion prompt — explicitly do not attempt that work in this pass.

## What this audit deliberately did not do

- **Did not force swaps.** The prompt forbids it (§4 red-light conditions, §9 "do not refactor / do not change copy").
- **Did not extend `editorial-stitch/` mid-pass.** The prompt forbids it (§9 "do not refactor `editorial-stitch/` itself").
- **Did not change the live pages.** The audit is read-only.
- **Did not propose a separate redesign.** That belongs to a future prompt with founder review.
