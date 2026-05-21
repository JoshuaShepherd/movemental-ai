# Safety stage rebuild — cross-page QA report

**Date:** 2026-05-21
**Scope:** the three `-new` pages (`/home-new`, `/pathway/safety-new`, `/field-guides/safety-new`) and the four new components (`FiveLayerRead`, `TwoPathsTable`, `PathFoldNew`, `HomeCTABandNew`, plus `HomeContentNew`).
**Method:** mechanical grep + file-by-file read.

Legend: ✅ pass · ⚠️ flag · ❌ fail.

---

## 1. Canonical taxonomy check

- ✅ Five layers appear in canonical order on `SafetyNewPage`'s `LAYERS` const (Statement → Policy → Context → Rules → Response Plans). `SafetyNewPage.tsx:32–78`.
- ✅ Five layers appear in canonical order on `FiveLayerRead`'s `LAYERS` const. `FiveLayerRead.tsx:69–159`.
- ✅ Care Boundaries is listed under Layer 04 Rules in `SafetyNewPage.tsx:68` and `FiveLayerRead.tsx:133`. Never appears under Layer 03 Context anywhere in `_new/`.
- ✅ Named Refusals appears under Layer 02 Policy in `SafetyNewPage.tsx:51` ("Acceptable Use Policy (with Named Refusals)") and as its own line item in `FiveLayerRead.tsx:96` ("Acceptable Use Policy", "Named Refusals").
- ⚠️ `PathFoldNew.tsx:128` says "Acceptable Use **Statement** and Named Refusals" in the home Path fold's "What this stage produces" list. The canonical Layer 02 document is "Acceptable Use **Policy**" (per Field Guide + both other pages). Minor terminology drift; non-blocking but worth aligning. `src/components/safety/_new/PathFoldNew.tsx:128`.
- ✅ Vendor & Tool Inventory + Data Classification appear under Layer 03 Context. `SafetyNewPage.tsx:58`, `FiveLayerRead.tsx:113`.
- ⚠️ `PathFoldNew.tsx:134` says "Vendor Inventory and Incident Response Plan" — collapses two layers into one list line. Doesn't mention Data Classification at all in the home Path fold's "What this stage produces" list. Acceptable as marketing shorthand on a home fold, but flag for consistency. `src/components/safety/_new/PathFoldNew.tsx:130–137`.
- ✅ Data Handling Rules, Disclosure & Attribution, and Care Boundaries all appear under Layer 04 Rules. `SafetyNewPage.tsx:65–69`, `FiveLayerRead.tsx:130–134`.
- ⚠️ Minor naming drift between the two surfaces: `SafetyNewPage.tsx:67` writes "Disclosure & Attribution **Rules**" (with the trailing "Rules"), while `FiveLayerRead.tsx:132` writes "Disclosure & Attribution" (no suffix). Same artifact, two labels. Not a blocker.
- ✅ Incident Response Plan appears under Layer 05 in both `SafetyNewPage.tsx:76` and `FiveLayerRead.tsx:151`.
- ✅ No appearance of the non-canonical "five areas" framing (Acceptable Use / Data Boundaries / Human Oversight / Voice and Trust / Ethical and Theological Guardrails) anywhere in `_new/`. Grep returned only canonical mentions of "Acceptable Use Policy" + "Named Refusals" + "Data Handling Rules" tied to their correct layers.
- ❌ A fixed "seven deliverables" count appears in **two places** in `PathFoldNew.tsx`:
  - Line 64: `"$1,000 · two weeks · seven deliverables."`
  - Line 117: `"Two weeks of facilitated work that produces seven board-ratifiable governance documents…"`
  Both contradict the canonical Field Guide totals (the brief lists 8 documents if Acceptable Use Policy + Named Refusals are split, or 7 if merged). The inventory's open question #2 recommended dropping a fixed numeric count from marketing copy and reframing as "One AI Organizational Guidebook, organized in five layers." `SafetyNewPage` already avoids a number; `PathFoldNew` carries the legacy "seven" forward verbatim from the existing `path-fold.tsx`. **Decision needed.** `src/components/safety/_new/PathFoldNew.tsx:64, 117`.

Section totals: ✅ 7 · ⚠️ 3 · ❌ 1.

---

## 2. Two-paths integrity check

- ✅ SafeGuide and SafeStart are named explicitly as the two paths wherever the framing appears: `SafetyNewPage.tsx` section 4 (lines 247–266), `TwoPathsTable.tsx` (full file), `FiveLayerRead.tsx` results CTAs (lines 819–830), `FieldGuideSafetyNewLanding.tsx:104–115`.
- ✅ Every Field Guide download CTA in `_new/` points at `/field-guides/safety-new`:
  - `SafetyNewPage.tsx:137`, `SafetyNewPage.tsx:470` (hero + midnight band).
  - `TwoPathsTable.tsx:154`.
  - `FiveLayerRead.tsx:820` (results CTA).
  - `HomeCTABandNew.tsx:43`.
  - `PathFoldNew.tsx:72, 78` (Safety stage Read more + Begin with Safety).
- ✅ Every SafeStart contact CTA points at `/contact?interest=safestart`:
  - `SafetyNewPage.tsx:143, 297, 476`.
  - `TwoPathsTable.tsx:158`.
  - `HomeCTABandNew.tsx:46`.
- ⚠️ `FiveLayerRead.tsx:826` points at `/pathway/safety-new#safestart` (the in-page SafeStart anchor) instead of `/contact?interest=safestart`. This is intentional per the changelog (the FiveLayerRead is embedded **on** `/pathway/safety-new`, so the in-page jump is correct), but it's the only SafeStart CTA in `_new/` that doesn't go to the contact form. Acceptable design choice; flagged for awareness only.
- ⚠️ **SafeGuide naming is asymmetric across surfaces.**
  - `TwoPathsTable.tsx:85, 137` names the free path **"SafeGuide"**.
  - `FieldGuideSafetyNewLanding.tsx:105` names it **"SafeGuide"** in the explainer paragraph.
  - But the same landing page's hero headline is `"It Starts With Safety."` (line 60) with the kicker `"Free Field Guide · Volume One"` (line 57) — the page never says "SafeGuide" above the fold; only the body paragraph introduces the term.
  - `SafetyNewPage.tsx` mentions "SafeGuide" only twice (in copy lines 132, 292) and otherwise uses "the free field guide" / "the Field Guide". CTAs say "Get the Field Guide", not "Get SafeGuide".
  - `FiveLayerRead.tsx:823` CTA reads "Read the Field Guide", not "Get SafeGuide".
  This is the asymmetric naming the brief permits (Field Guide = SSOT for the artifact; SafeGuide = the path-name when set against SafeStart), and it's applied consistently — the term SafeGuide only appears where the two-paths comparison is explicit. Flagged for Joshua's final naming call; see section 7.
- ✅ No CTA points at `/start-with-safety` from any `-new` page or component. Grep confirms zero matches.

Section totals: ✅ 4 · ⚠️ 2 · ❌ 0.

---

## 3. Cross-link audit

All internal `href` values emitted from each surface, grouped by file. Every URL listed below was verified against the route tree.

### `/home-new` (`HomeContentNew` → `PathFoldNew` + `HomeCTABandNew`)

| Source | href | Status |
| --- | --- | --- |
| `PathFoldNew.tsx:72` | `/pathway/safety-new` | ✅ exists |
| `PathFoldNew.tsx:78` | `/pathway/safety-new` | ✅ exists |
| `PathFoldNew.tsx:93` | `/pathway/sandbox` | ✅ exists (canonical Sandbox) |
| `PathFoldNew.tsx:101` | `/pathway/skills` | ✅ exists |
| `PathFoldNew.tsx:109` | `/pathway/solutions` | ✅ exists |
| `PathFoldNew.tsx:179` | `/pathway` | ✅ exists |
| `HomeCTABandNew.tsx:43` | `/field-guides/safety-new` | ✅ exists |
| `HomeCTABandNew.tsx:46` | `/contact?interest=safestart` | ✅ exists (contact route accepts `interest`) |

Plus `TopographicHero`, `AudienceFold`, `CredibilityFold` emit their own internal links — those are inherited from existing components and out of scope per the non-destructive rule.

### `/pathway/safety-new` (`SafetyNewPage`)

| Source | href | Status |
| --- | --- | --- |
| `SafetyNewPage.tsx:137` | `/field-guides/safety-new` | ✅ exists |
| `SafetyNewPage.tsx:143` | `/contact?interest=safestart` | ✅ exists |
| `SafetyNewPage.tsx:297` | `/contact?interest=safestart` | ✅ exists |
| `SafetyNewPage.tsx:364` | `/churches` `/nonprofits` `/institutions` (mapped via `AUDIENCES`) | ✅ all three exist as segment hubs |
| `SafetyNewPage.tsx:410` | `/voices` | ✅ exists |
| `SafetyNewPage.tsx:470` | `/field-guides/safety-new` | ✅ exists |
| `SafetyNewPage.tsx:476` | `/contact?interest=safestart` | ✅ exists |
| `SafetyNewPage.tsx:482` | `/pathway` | ✅ exists |

Embedded `FiveLayerRead` and `TwoPathsTable` add the links below; counted under their own files.

### `/field-guides/safety-new` (`FieldGuideSafetyNewLanding`)

| Source | href | Status |
| --- | --- | --- |
| `FieldGuideSafetyNewLanding.tsx:109` | `/pathway/safety-new#safestart` | ✅ anchor exists (`SafetyNewPage.tsx:271` has `id="safestart"`) |

### Embedded components

| Source | href | Status |
| --- | --- | --- |
| `TwoPathsTable.tsx:154` | `/field-guides/safety-new` | ✅ |
| `TwoPathsTable.tsx:158` | `/contact?interest=safestart` | ✅ |
| `FiveLayerRead.tsx:820` | `/field-guides/safety-new` | ✅ |
| `FiveLayerRead.tsx:826` | `/pathway/safety-new#safestart` | ✅ |

- ✅ No `-new` link points at the old `/pathway/safety` or `/field-guides/safety` from any `-new` surface. Grep confirmed: every `/pathway/safety` and `/field-guides/safety` string in `_new/` is in a JSDoc comment, never in an `href`.
- ✅ No 404-able link found.
- ✅ No link that should *drop* the `-new` suffix (i.e. accidentally pointing at `-new` from a surface that should hit the canonical route) — all `-new` references are intentional given the rebuild is sibling-route.

Section totals: ✅ 14 link groups · ⚠️ 0 · ❌ 0.

---

## 4. Design system compliance

- ⚠️ Two raw `#ffffff` hex values in `FiveLayerRead.tsx`:
  - Line 370 (LayerChips button inline style): `color: isAnswered ? "#ffffff" : "var(--muted-foreground)"`.
  - Line 771 (per-layer detail dot inline style): `color: rating ? "#ffffff" : "var(--muted-foreground)"`.
  These are used to color the lucide icon glyph **on top of** a coloured chip background (`var(--color-status-go|caution|stop)`) so the glyph reads against the saturated chip. The semantic-token equivalent would be `var(--inverse-foreground)` (which resolves to ink-cream `#f4efe5` on midnight, *not* pure white) — using `#ffffff` here is a deliberate choice for icon contrast against status fills, but it does violate the "no raw hex" rule. **Recommendation:** swap to `var(--inverse-foreground)` for consistency or document the exception. `src/components/safety/_new/FiveLayerRead.tsx:370, 771`.
- ✅ No raw hex anywhere else in the new tree. Grep for `bg-[#…]` / `text-[#…]` / `border-[#…]` arbitrary-value Tailwind classes returned zero matches.
- ✅ No non-semantic Tailwind color classes (`bg-white`, `bg-black`, `bg-blue-*`, `text-gray-*`, `text-blue-*`, `text-white`, `text-black`). All color references go through semantic tokens (`bg-background`, `bg-section`, `bg-card`, `bg-elevated`, `bg-foreground`, `bg-surface-highest`, `bg-inverse-surface` via `.band-midnight`, `text-foreground`, `text-muted-foreground`, `text-inverse-foreground`, `text-inverse-muted`, `text-pathway-accent`, `text-primary`, `border-border`, plus `--color-status-*` via inline `var(--…)`).
- ✅ No font outside Inter (`font-sans`) and Newsreader (`font-serif`, `font-serif-display`). The single "Source Serif" string in the new tree is a comment in `FiveLayerRead.tsx:17` confirming it is **not** used.
- ⚠️ `FieldGuideSafetyNewLanding.tsx:128` uses `text-primary` for the audience-card titles ("Executive Pastors", etc.). The repo's `--primary` resolves to ink (`#19150f`) on light, which is fine, but the existing landing it was copied from uses a slightly different convention. Acceptable; flagged for awareness only.
- ✅ Radii: all rounded usage is `rounded-full` on small icon chips, status dots, and meta-pill dots (≤ 9×9 / decorative). No `rounded-lg/xl/2xl` on structural surfaces. Square corners on the `TwoPathsTable`, hero figure, midnight tile — matches Concept Modern.
- ✅ Shadows: only `shadow-ambient` is used (`FieldGuideSafetyNewLanding.tsx:81, 162`). No drop shadows, no glow effects, no multi-layer shadows.
- ✅ Motion: `transition-colors`, `transition-opacity`, `transition-transform` with `duration-200` (PathFoldNew CTA + audience arrow). The `FiveLayerRead` step transition uses `cubic-bezier(0.22, 1, 0.36, 1)` (canonical ease-out) with `var(--duration-normal, 300ms)` (`FiveLayerRead.tsx:548–551`). No spring, no bounce, no >400ms duration in custom code. The `Reveal` wrapper uses the existing motion config.
- ⚠️ `FiveLayerRead.tsx:520` uses `max-w-content` — that token isn't defined in `tailwind.config.ts` or `globals.css` (no `--content` / `--max-width-content` variable). Tailwind v4 will treat it as a no-op class, so the parent `.container` (Tailwind's `container` class) is what's actually constraining width. Visually probably fine on the live page, but the class is dead code. **Recommendation:** drop `max-w-content` or replace with `max-w-(--container-max)` / `max-w-prose` if a narrower clamp is desired. `src/components/safety/_new/FiveLayerRead.tsx:520`.

Section totals: ✅ 6 · ⚠️ 3 · ❌ 0.

---

## 5. Copy drift

- ✅ The five layer one-liners on `SafetyNewPage.tsx:43, 50, 57, 64, 75` and the five-layer definitions on `FiveLayerRead.tsx:78, 95, 112, 129, 150` are coherent — both surfaces use the same Statement / Policy / Context / Rules / Response Plans names, in order, with the same canonical document assignments. The phrasing differs (SafetyNewPage uses one-line definitions, FiveLayerRead uses richer multi-clause definitions) but the substance aligns.
- ⚠️ Naming inconsistency between surfaces:
  - SafetyNewPage Layer 02: `"Acceptable Use Policy (with Named Refusals)"` (single document with parenthetical).
  - FiveLayerRead Layer 02: `"Acceptable Use Policy"` + `"Named Refusals"` (two separate documents).
  - PathFoldNew Stage 01 list: `"Acceptable Use Statement and Named Refusals"` (Statement vs Policy mismatch — see §1).
  Three different framings of the same Layer 02. Pick one; the FiveLayerRead form (two named documents) reads as the most canonical per the brief.
- ✅ TwoPathsTable rows (`TwoPathsTable.tsx:22–63`) align with the canonical model:
  - Cost: Free / $1,000 fixed — matches brief.
  - Timeline: One to two months / Two weeks — matches brief.
  - Finished Artifact: same Guidebook in both — matches brief.
  - Difficulty / Who Drafts / Likely Challenges / Best Fit — sensible extensions of the brief without contradicting it.
- ✅ The "What SafeStart actually delivers" four bullets on `SafetyNewPage.tsx:310–315` match the canonical model verbatim: publishable internal documentation platform · print-quality PDF · supports and messaging for each Guidebook area · integration with the rest of the Movemental Path.
- ✅ The honest caveat **verbatim** appears on the `FiveLayerRead` results screen: `FiveLayerRead.tsx:812–814` reads "Documentation begins the work. It does not finish it. People still make mistakes. Training is still required. The Guidebook is the door, not the house." Confirmed character-for-character against the canonical.
- ⚠️ A **paraphrased** version of the caveat appears on `SafetyNewPage.tsx:231–235`: "Documentation begins the work. It does not finish it. The Guidebook is the door, not the house — staff still need training, the documents still need ratification, and the rest of the Path follows from here." This drops "People still make mistakes. Training is still required." and rewrites the back half. Since the canonical version appears in full on the embedded `FiveLayerRead` (which renders just above this paragraph in the same page), the duplication is slightly off-key. Two options for resolution: (a) replace the paraphrased line with the verbatim caveat, or (b) drop the paraphrase entirely (the verbatim version is one section up). **Recommendation:** drop. `src/components/safety/_new/SafetyNewPage.tsx:231–235`.
- ✅ Voice spot-check — no marketing-loud language. Grep for "transform / unlock / empower / revolutionize / game-changing / disrupt / leverage" returned only one hit: `SafetyNewPage.tsx:377` `"transition-transform"`, which is a CSS utility class, not copy. No emoji. No exclamation marks in body copy.

Section totals: ✅ 4 · ⚠️ 2 · ❌ 0.

---

## 6. Accessibility quick-check

- ✅ Midnight band white text contrast: `band-midnight` recipe (per `src/app/recipes.css`) renders `var(--inverse-foreground)` (ink-cream ~`#f4efe5`) on `var(--inverse-surface)` (~`#0b0d12`-class dark). The contrast ratio exceeds WCAG AAA at body sizes; small `text-inverse-muted` (line 37 of HomeCTABandNew, ~68% opacity) on midnight clears WCAG AA at body sizes.
- ✅ Focus-visible rings present on every interactive non-link element:
  - `FiveLayerRead` LayerChips buttons (`FiveLayerRead.tsx:363`).
  - `FiveLayerRead` SegmentedControl buttons (`FiveLayerRead.tsx:406`).
  - `FiveLayerRead` back / reset buttons (`FiveLayerRead.tsx:655, 838`).
  - `SafetyNewPage` audience cards (`SafetyNewPage.tsx:365`).
  - The `outline-none` on `FiveLayerRead.tsx:545` is on the step-shell `<div tabIndex={-1}>` used for managed screen-reader focus; intentional and paired with a programmatic focus call, not a missing ring.
  - All `btn-pill` / `btn-pill--ghost` instances get focus rings from the `.btn-pill:focus-visible` rule in `src/app/recipes.css:1282` (verified in the recipe file).
- ✅ Form labels — `ToolkitDownloadForm` ships with `<label htmlFor={…}>` for email + organization (verified at `src/components/toolkit/ToolkitDownloadForm.tsx:158–199`). `FieldGuideSafetyNewLanding` passes `emailLabel="Email Address"` / `organizationLabel="Organization"` to both instances.
- Heading hierarchy by page:

  **`/home-new`** (composition: TopographicHero → AudienceFold → PathFoldNew → CredibilityFold → HomeCTABandNew)
  - `TopographicHero` h1 (existing)
  - `AudienceFold` h2 (existing) → audience h3s (existing)
  - `PathFoldNew` h2 (line 34) → Stage 01 h3 (line 60), `SatelliteStage` h3s (line 228) → ✅
  - `CredibilityFold` (existing)
  - `HomeCTABandNew` h2 (line 34) → ✅
  - ✅ No heading skips on the `-new` surfaces.

  **`/pathway/safety-new`** (`SafetyNewPage`)
  - Hero h1 (line 121) ✅
  - Architecture h2 (line 173) → layer h3 (line 210) ✅
  - Two paths h2 (line 251) ✅; embedded `TwoPathsTable` adds h3 (lines 84, 95, 186) under that h2 — ✅
  - SafeStart h2 (line 281) ✅
  - Audiences h2 (line 348) → audience h3 (line 367) ✅
  - Credibility h2 (line 401) ✅; embedded `PathwayVoiceFallback` adds h-level voices (existing)
  - Midnight closing h2 (line 462) ✅
  - Embedded `FiveLayerRead` adds its own h2 (`FiveLayerRead.tsx:526`) + h3s (lines 619, 692) — ✅ no skip
  - ✅ Clean hierarchy.

  **`/field-guides/safety-new`** (`FieldGuideSafetyNewLanding`)
  - Hero h1 (line 59) ✅
  - Audience block h2 (line 122) → audience h3 (line 128) ✅
  - Self-assessment h2 (line 141) ✅
  - Midnight band h2 (line 158) ✅
  - ✅ Clean hierarchy.

- ✅ Alt text on the only `next/image` in the new tree: `FieldGuideSafetyNewLanding.tsx:84` — `alt="It Starts With Safety — Movemental Safety Field Guide cover"`. Non-empty, meaningful.
- ✅ Interactive icons in `FiveLayerRead`:
  - LayerChips: `aria-label` on each button (line 355) describes layer + rating; `aria-current="step"` on the active chip (line 360).
  - SegmentedControl: `role="group"` + `aria-label` on the wrapper (line 393); `aria-pressed={isSelected}` on each option (line 403).
  - All decorative icons inside buttons carry `aria-hidden` (lines 373, 414, 440, 762).
  - ✅ Pattern is solid.

Section totals: ✅ 9 · ⚠️ 0 · ❌ 0.

---

## 7. Open issues (for Joshua)

1. **"Seven deliverables" count in `PathFoldNew`.** Lines 64 and 117 carry the legacy `"seven deliverables"` / `"seven board-ratifiable governance documents"` framing forward from the existing `path-fold.tsx`. The canonical Field Guide breakdown (per the brief + `SafetyNewPage` + `FiveLayerRead`) lists 8 documents if Acceptable Use Policy and Named Refusals are split, or 7 if merged into one — and the rest of the `-new` tree avoids any fixed numeric count. Inventory open question #2 already flagged this; remains unresolved.
2. **SafeGuide vs Field Guide naming.** The brief allows either symmetric ("SafeGuide" vs "SafeStart") or asymmetric ("Field Guide" + "SafeStart") naming. The `-new` tree currently does asymmetric: "SafeGuide" appears only inside two-paths comparison framing (TwoPathsTable column header, the FieldGuideSafetyNewLanding explainer paragraph, two SafetyNewPage prose mentions). Every CTA labels the artifact "Field Guide", never "SafeGuide". Confirm this is the intended public framing.
3. **Footer "Read the field guide" + nav "Field Guide" carry-overs.** Confirmed migration-step items per the changelog; both sit on global chrome (`site-footer.tsx`, `site-header.tsx`) rendered by the root layout. **Not a QA failure.** Will be flipped when the `-new` pages are promoted to canonical and the nav/footer hrefs land in the same migration.
4. **Pathway page paraphrased caveat.** `SafetyNewPage.tsx:231–235` paraphrases the brand qualifier instead of using the verbatim version. The verbatim version already appears one section up on the embedded `FiveLayerRead` results screen. Open question: drop the paraphrase entirely, replace with the verbatim, or accept the duplication as two surfaces of the same idea.
5. **Layer 02 document framing — single vs split.** Three surfaces describe Layer 02 three different ways: `"Acceptable Use Policy (with Named Refusals)"` (single doc parenthetical, SafetyNewPage), `"Acceptable Use Policy"` + `"Named Refusals"` (two docs, FiveLayerRead), `"Acceptable Use Statement and Named Refusals"` (PathFoldNew, with "Statement" instead of "Policy"). Decide on a single canonical phrasing.
6. **`text-primary` on audience-card titles** (FieldGuideSafetyNewLanding.tsx:128). The current site convention uses `text-primary` for these — confirm whether the warm Concept Modern register wants those treated as `text-foreground` instead for tonal consistency.

---

## Verdict

**Ready with fixes.** No fundamental copy or taxonomy errors. Two raw-hex inline styles, two "seven deliverables" copy carry-overs, one paraphrased caveat, three Layer 02 phrasings, one dead Tailwind class — all batchable into a single Prompt 7 fix without touching the architecture.

## Fix list

- **Fix 1:** Replace `#ffffff` raw hex with `var(--inverse-foreground)` in `FiveLayerRead.tsx:370` and `FiveLayerRead.tsx:771` (icon glyph color over status fills). If the white-on-status contrast is intentional, document the exception with a code comment.
- **Fix 2:** Remove the "seven deliverables" count from `PathFoldNew.tsx:64` and `PathFoldNew.tsx:117`. Reframe both lines to match the canonical "One AI Organizational Guidebook organized in five layers" framing already used on `SafetyNewPage` and the changelog's recommendation. Example replacements: line 64 `"$1,000 · two weeks · ratifiable Guidebook."`; line 117 `"Two weeks of facilitated work that produces a board-ratifiable AI Organizational Guidebook in five layers."`
- **Fix 3:** Align Layer 02 phrasing across all three surfaces. Recommend `SafetyNewPage.tsx:51` swap `"Acceptable Use Policy (with Named Refusals)"` → split into two array entries `["Acceptable Use Policy", "Named Refusals"]` matching `FiveLayerRead`. And fix `PathFoldNew.tsx:128` `"Acceptable Use Statement and Named Refusals"` → `"Acceptable Use Policy and Named Refusals"` (Statement → Policy).
- **Fix 4:** Resolve the duplicated caveat on `SafetyNewPage.tsx:231–235`. Recommend dropping the paragraph entirely since the verbatim caveat already appears on the embedded `FiveLayerRead` results screen one section above.
- **Fix 5:** Drop the dead `max-w-content` class on `FiveLayerRead.tsx:520`. Either remove it (the parent `.container` already constrains width) or replace with the defined `max-w-(--container-max)` / `max-w-prose` if a tighter clamp is desired.
- **Fix 6:** Minor naming alignment — `SafetyNewPage.tsx:67` `"Disclosure & Attribution Rules"` → `"Disclosure & Attribution"` to match `FiveLayerRead.tsx:132`.
- **Fix 7:** Optional — also realign `PathFoldNew.tsx:130–137` "What this stage produces" bullets so they don't collapse Layer 03 (Vendor + Data Classification) into one line with Incident Response Plan (Layer 05). Suggested rewrite: `"Acceptable Use Policy and Named Refusals" / "Vendor & Tool Inventory and Data Classification" / "Data Handling, Disclosure, and Care Boundaries" / "Incident Response Plan"`.

---

## Fixes resolved (Prompt 7, 2026-05-21)

All seven fixes in the list above were applied. Typecheck (`pnpm typecheck`) is clean.

- ✅ **Fix 1** resolved — `FiveLayerRead.tsx:370,771` raw `#ffffff` replaced with `var(--inverse-foreground)`.
- ✅ **Fix 2** resolved — `PathFoldNew.tsx:64,117` "seven deliverables" removed; reframed to "ratifiable Guidebook" / "AI Organizational Guidebook in five layers".
- ✅ **Fix 3** resolved — Layer 02 phrasing aligned: `SafetyNewPage.tsx:51` split into `["Acceptable Use Policy", "Named Refusals"]`; `PathFoldNew.tsx:128` `Statement` → `Policy`.
- ✅ **Fix 4** resolved — `SafetyNewPage.tsx:231–235` paraphrased caveat dropped; verbatim version on `FiveLayerRead` results screen is now the single canonical instance on the page.
- ✅ **Fix 5** resolved — `FiveLayerRead.tsx:520` dead `max-w-content` class removed.
- ✅ **Fix 6** resolved — `SafetyNewPage.tsx:67` `"Disclosure & Attribution Rules"` → `"Disclosure & Attribution"`.
- ✅ **Fix 7** resolved — `PathFoldNew.tsx:127–136` bullets rewritten to trace canonical layer order (02 → 03 → 04 → 05) without collapsing layers.

Open items deferred to the migration step (not QA failures, intentional non-destructive carry-overs): global nav "Field Guide" CTA href, global footer "Read the field guide" href, and the "seven deliverables" / "SafeGuide" naming framing in the rest of the live site outside `_new/`.

**Status after fixes:** Ready for migration.
