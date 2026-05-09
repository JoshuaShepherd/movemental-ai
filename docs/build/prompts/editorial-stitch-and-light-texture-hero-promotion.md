# Agent prompt — promote `editorial-stitch` and `LightTextureHero` across the live site

> **Outcome.** Every ad-hoc card, midnight quote, ghost CTA panel, and light-themed hero on the live site is replaced by the canonical reusable component that already exists in `src/components/editorial-stitch/` and `src/components/studio/hero/`. The result is a more consistent visual language, less duplicated CSS, and a clear single home for each editorial pattern.
>
> **Hard rule.** **Do not change any copy.** This is a design upgrade only. Every headline, eyebrow, body paragraph, link label, alt text, and CTA string moves to the new component byte-for-byte.
>
> Treat this document as the **complete instruction set**. It walks the available component palette, the page-by-page migration targets, the mapping rules, the safe-execution sequence, the per-slice verification checklist, and the rollback discipline.

---

## 0 — Read these files before you start

1. **The audit that motivated this work** — [`docs/build/plans/unused-component-audit-2026-05-08.md`](../plans/unused-component-audit-2026-05-08.md). §1 ("PROMOTE candidates") names `editorial-stitch/` and `LightTextureHero` as the targets of this prompt.
2. **The component palette** — [`src/components/editorial-stitch/`](../../../src/components/editorial-stitch/) (9 components) and [`src/components/studio/hero/LightTextureHero.tsx`](../../../src/components/studio/hero/LightTextureHero.tsx). Read each file's signature and JSDoc before swapping.
3. **Design constitution** — [`docs/design/DESIGN.md`](../../design/DESIGN.md). Especially the **semantic tokens only** rule and the **Ghost Lift / no border for sectioning** rule. The `editorial-stitch` components already comply; bespoke replacements that duplicate them often don't.
4. **Project rules** — [`CLAUDE.md`](../../../CLAUDE.md). Six-layer type chain, Tailwind v4 `@theme inline`, Inter via `next/font`, Section primitives, no raw hex.
5. **Stitch migration prompt** — [`docs/build/prompts/stitch-to-react-migration.md`](stitch-to-react-migration.md). This is the source-of-truth for token translation rules and DESIGN.md compliance; the new components were authored against it.

---

## 1 — Definition of done

| Layer | Done means |
| --- | --- |
| **Component adoption** | Every live page has been audited for ad-hoc instances of the patterns listed in §3. Each instance has either been swapped to the canonical component or annotated with a one-line `// keep: <reason>` comment explaining why a swap is unsafe (e.g., the prop API doesn't fit). |
| **Copy preservation** | A `git diff` of the swap commits, filtered to non-`.tsx` text content (eyebrows, headlines, body, links), shows **zero copy changes**. Every word stays identical. |
| **Image / asset preservation** | All `Image` `src`, `alt`, `priority`, and `sizes` props transfer one-for-one. Where a swap moves an image into an `Image` inside `editorial-stitch`, the `sizes` prop is updated to match the new container width — that is the only image-prop change permitted. |
| **Tokens** | No raw hex anywhere a swap touches. If a swap reveals a pre-existing hex violation in surrounding code, leave it (out of scope) but flag it in the PR description. |
| **A11y** | `aria-labelledby` / `aria-label` survive each swap. If the swap-target component owns a different landmark (e.g., `<figure>` vs. `<section>`), preserve the heading wiring by passing the correct landmark prop where supported (`titleAs`, `as`) or by wrapping the component in the original landmark. |
| **Verification** | `pnpm typecheck`, `pnpm lint`, `pnpm test:run` green per slice. Visual diff of the affected route at desktop 1440px and mobile 375px reviewed before merge. |
| **PR shape** | One PR per slice (§5). Each PR's diff stat is small enough to read end-to-end. No omnibus "design upgrade" PR. |

---

## 2 — The component palette

These are the only components this pass introduces. Do not reach outside the palette. If a page needs a pattern none of these covers, leave the existing code in place and note it in §10.

### 2.1 `editorial-stitch/` (import path `@/components/editorial-stitch`)

| Component | Pattern it owns | Required props |
| --- | --- | --- |
| `AtmosphericMediaCard` | Tonal full-bleed image card with gradient scrim, icon anchor, ArrowLink CTA. Min height 28rem. | `imageUrl`, `imageAlt`, `icon` (ReactNode), `title`, `description`, `href`, `linkLabel` |
| `DotTextureCard` | Tonal "dot field" surface with side media. Padded 10. | `title`, `description`, `mediaUrl`, `mediaAlt` |
| `IconFeatureCard` | Icon-forward feature panel on a lifted inner surface (Ghost Lift). | `icon` (ReactNode), `eyebrow`, `title`, `description` |
| `MidnightStatementQuote` | Midnight band pull-quote with decorative quote watermark. Distinct from `PullQuote` (bar variant). | `quote`, `citation` |
| `GhostCtaPanel` | Centered Ghost Lift CTA slab — `shadow-ambient` + primary gradient button only. | `title`, `description`, `ctaLabel`, plus `ctaHref` **or** `onCtaClick` |
| `EditorialShowcaseIntro` | Page-level intro: eyebrow + display headline + description, left or center. | `eyebrow`, `title`, `description`; optional `align`, `eyebrowTone`, `titleAs` |
| `EditorialPreviewWell` | Tonal well for nesting nav / layout previews. | optional `label`; takes `children` |
| `StitchGlassTopBar` | Fixed glass top bar. **Marketing pages must keep `SiteNav`** — this bar is for focused flows or assess-only layouts. Out of scope for this pass except where flagged in §3.6. | optional `brand`, `trailing`, `showMenu` |

Note: `dot-texture-card` uses semantic outline color (`var(--outline)`) for its dot field; it does not introduce a new token.

### 2.2 `studio/hero/LightTextureHero` (import path `@/components/studio/hero/LightTextureHero`)

The light-default companion to `TopographicHero` (which is live on the home page). Same terrain image, `filter: invert()` flips to dark linework, `mix-blend-multiply` darkens the cream paper, left-to-right wash keeps the text column clean.

```ts
interface LightTextureHeroProps {
  eyebrow?: string;          // small uppercase kicker
  title: ReactNode;          // display headline; pass <em> inline for italic emphasis
  subhead?: ReactNode;       // multi-paragraph supporting copy
  children?: ReactNode;      // CTAs / entry cards rendered after subhead
  hideImageOnMobile?: boolean;
  textureSrc?: string;       // defaults to home topography
  headingId?: string;        // wire `aria-labelledby` to this
}
```

This component is the canonical light-themed hero. Any light-themed hero on a marketing page that uses bespoke layout for kicker / display / subhead / CTA-row should swap to it unless the page is doing something genuinely different (e.g., the toolkit landing's two-column hero with `ToolkitCover`).

---

## 3 — Page-by-page migration targets

**Audit each route. Confirm the ad-hoc pattern matches the rule before swapping. If it doesn't fit, leave it.** Scope ordering follows blast radius — smallest, highest-confidence pages first.

### 3.1 `/about` (file: `src/components/studio/pages/AboutPage.tsx`)

| Section | Current | Target | Notes |
| --- | --- | --- | --- |
| **Hero (midnight)** | Bespoke midnight band with `band-midnight bg-inverse-surface` + eyebrow / display / lede. | **Keep.** Midnight hero is intentional; not a `LightTextureHero` candidate. |
| **Origin** | Custom `<blockquote>` with `border-l border-border pl-6 font-serif-display text-3xl italic` for the line "The path is what we built. The path is what we sell." | Swap the surrounding origin section's quote moment to **`MidnightStatementQuote`** _only if_ the origin section converts to a midnight band. Otherwise **keep**. Document the reason. |
| **Founder team grid** | 3-column grid with image + role + bio + ArrowLink. | **Keep.** This is a founder-bio pattern, not the Stitch `IconFeatureCard` (no icon, has photo). The component is too tightly fitted to swap without a copy-or-asset change. |
| **Closing CTA** | Centered headline + body + 2 CTAs + tertiary "or download" line. | Evaluate **`GhostCtaPanel`** — but the existing CTA has 3 actions and a tertiary line. `GhostCtaPanel` only supports one CTA. **Keep** for now; revisit if `GhostCtaPanel` ever supports a second action. |

**Net effect on `/about`:** likely **zero swaps** this pass. That's fine — the audit hypothesis was that `/about` had candidates, but the editorial we just shipped is intentionally idiosyncratic. Note this in the slice's PR.

### 3.2 `/pathway/safety` (file: `src/components/studio/pages/pathway/SafetyPage.tsx`)

| Section | Current | Target | Notes |
| --- | --- | --- | --- |
| **Closing CTA (midnight)** | Midnight band with display + lede + 2 CTAs. | **Keep.** Two-CTA pattern; `GhostCtaPanel` supports one. |
| **Pricing tier line** ("$1,000. Net 15 from signing.") | Plain section. | **Keep.** Doesn't match any palette pattern. |
| **The seven artifacts grid** | 4-col grid of `<article>` blocks with serif-display number + title + body. | Evaluate **`IconFeatureCard`** — but the artifact cards have no icon. The numbered serif display is the eyebrow equivalent. **Keep**; the artifact card is its own established pattern. |

**Net effect:** likely **zero swaps**. Note in PR.

### 3.3 `/pathway/safety` toolkit lead-capture section

The `/pathway/safety` toolkit-lead-capture section composes `ToolkitCover` and `ToolkitDownloadForm` in a 2-col grid with eyebrow / display headline / supporting copy. **Keep.** This composition is its own established pattern; `IconFeatureCard` doesn't fit (no icon, has form embed).

### 3.4 `/toolkit` (file: `src/app/(site)/toolkit/page.tsx`)

| Section | Current | Target | Notes |
| --- | --- | --- | --- |
| **"Six sections. Sixteen pages." card grid** | 2-col grid of inline `<div className="flex flex-col gap-3">` blocks: serif numeral + serif-display title + body. | Evaluate **`IconFeatureCard`** — but cards have no icon and use a serif numeral as the eyebrow. **Keep**; numeral-as-eyebrow is the toolkit-specific identity. |
| **"What happens after you download" timeline** | Numbered prose paragraphs (Day 0 / Day 3 / Day 7). | **Keep.** Not a card pattern. |
| **"Or skip ahead" panel** | Card with eyebrow + display + 3 CTAs. | Evaluate **`GhostCtaPanel`** — but 3 CTAs. **Keep.** |

**Net effect:** likely **zero swaps**. Note in PR.

### 3.5 `/toolkit/read`

The toolkit-read page was authored with the editorial discipline already; do not touch. **Skip.**

### 3.6 `/voices` (file: `src/components/sections/voices/voices-page-content.tsx`)

Audit for:
- Voice strip / portrait grid → **keep** (own established pattern).
- Closing CTA panel → evaluate **`GhostCtaPanel`** if single-CTA. If multi-CTA, **keep**.

### 3.7 `/evidence` (file: `src/components/studio/pages/EvidencePage.tsx`)

Audit for:
- Pull-quote moments on midnight bands → **`MidnightStatementQuote`** swap candidate.
- "Meet the founders" CTA panel → evaluate **`GhostCtaPanel`** if single-CTA.
- Card grids with icons → evaluate **`IconFeatureCard`**.

### 3.8 `/methodology` (file: live methodology route — confirm canonical entry before editing)

Audit for:
- The eight-pattern grid → likely an **`IconFeatureCard`** swap candidate **only if** each pattern has an icon today. If patterns are number-led, **keep**.
- Pull quotes on midnight → **`MidnightStatementQuote`**.

### 3.9 Audience hubs — `/churches`, `/nonprofits`, `/institutions`

These pages are the strongest **`LightTextureHero`** candidates. Each currently has a bespoke light-themed hero (eyebrow + display + lede + CTA row). The agent should:

1. Confirm the hero is light-themed (not midnight). If midnight, skip.
2. Confirm the hero structure is eyebrow / title / subhead / CTAs — i.e., fits the `LightTextureHeroProps` API exactly.
3. Confirm the hero does not embed a custom image (other than a backdrop). If it does — e.g., a portrait or document mockup — **keep**.
4. Swap to `LightTextureHero` with all copy preserved verbatim. Pass:
   - `eyebrow`: existing kicker
   - `title`: existing display headline (preserve any `<em>` italic emphasis)
   - `subhead`: existing supporting copy
   - `headingId`: derive from existing `aria-labelledby`
   - `children`: existing CTA row JSX, untouched
5. Verify the texture image renders at the same opacity as it does on `/` home (the active `TopographicHero` consumer).

### 3.10 `/work-with-us`, `/start-with-safety`, `/path`, `/pathway`

Audit for:
- Light-themed hero → **`LightTextureHero`** candidate.
- Card grids — evaluate against `IconFeatureCard` / `AtmosphericMediaCard` / `DotTextureCard`.
- Midnight quote moments → `MidnightStatementQuote`.
- Single-CTA closing panels → `GhostCtaPanel`.

### 3.11 Pages explicitly out of scope

| Route | Reason |
| --- | --- |
| `/` (home) | Already uses `TopographicHero`; the rest is `sections-mock/home` and is its own composition that the design system was tuned against. |
| `/toolkit/read` | Just authored with the editorial discipline. |
| `/contact` | Pending its own redesign (per current migration sequence). |
| `/pricing` | Pending its own redesign. |
| `/privacy`, `/terms`, `/cookies` | Legal stubs; out of scope. |
| `/admin/*`, `/api/*` | Not marketing surfaces. |
| `/assess` | Has its own focused-flow chrome via `StitchGlassTopBar`; the marketing palette doesn't apply. |

---

## 4 — Mapping rules

Use this table to evaluate any candidate swap. If the candidate doesn't satisfy **all** the green-light conditions, **do not swap** — leave the code and add a `// keep: <reason>` comment.

### 4.1 `IconFeatureCard` swap

Green light:
- Card has a clear lead icon (ReactNode, not a number or photo).
- Card has an eyebrow / kicker, a title, and a body description.
- Card lives on a section with `bg-section` or `bg-elevated` (the inner surface needs tonal contrast).
- No CTA inside the card — the section CTA lives below the grid.

Red light:
- Card uses a serif numeral as the eyebrow (toolkit / artifacts pattern).
- Card has a CTA, a form, or a complex media element.
- Card needs custom width / padding (the component pads 10–16).

### 4.2 `AtmosphericMediaCard` swap

Green light:
- Card has a full-bleed background image with gradient scrim.
- Card has icon + title + description + ArrowLink CTA.
- Card is at least 28rem tall.

Red light:
- Image is foreground (not scrim'd background).
- Card is small / compact.
- No CTA, or two CTAs.

### 4.3 `DotTextureCard` swap

Green light:
- Card uses a dot-texture / pattern background.
- Card has title + description on the left and a square media block on the right.

Red light:
- Card is grid-cell-sized (the component is `md:w-2/3`).
- Background is solid or image, not pattern.

### 4.4 `MidnightStatementQuote` swap

Green light:
- Quote sits on a midnight band (`band-midnight` / `bg-inverse-surface`).
- Quote is a full-section moment, not an inline pull quote.
- Quote has both a quote string and an attribution/citation string.

Red light:
- Quote is on a light background (use existing `PullQuote` instead).
- Quote is inline within prose (use `<blockquote>` inline pattern).

### 4.5 `GhostCtaPanel` swap

Green light:
- Single CTA panel.
- Centered, lifted card aesthetic (Ghost Lift pattern).
- One title + one body + one button.

Red light:
- Two or more CTAs.
- Panel has a form, list, or sidebar.
- Tertiary copy line below the CTA.

### 4.6 `EditorialShowcaseIntro` swap

Green light:
- Section opens with an eyebrow + display headline + description block, no list / image / form alongside.
- The intro is decoupled from the grid below it.

Red light:
- Intro composes additional layout (sidebar, image, sticky behavior).
- Intro is `h1` and the page already has an `h1` (use `titleAs="h2"` to avoid duplicating landmarks).

### 4.7 `LightTextureHero` swap

Green light:
- Hero is light-themed (paper background, ink text).
- Hero has eyebrow / title / subhead / CTA-row composition only (no embedded image card, form, or sidebar).
- Texture is acceptable on the page (i.e., the hero is the page's primary visual moment).

Red light:
- Hero is midnight (use existing `TopographicHero`).
- Hero embeds a portrait, mockup, or asset that must remain visible.
- Hero has a sticky / parallax behavior bespoke to the page.

---

## 5 — Execution sequence

Each step is a discrete PR. Do not merge slices out of order; later slices depend on stability of earlier ones for visual diff baselines.

### Slice 1 — Audit and inventory (no code changes)

1. Run `grep -rn "<MidnightStatementQuote\|<AtmosphericMediaCard\|<IconFeatureCard\|<DotTextureCard\|<GhostCtaPanel\|<EditorialShowcaseIntro\|<LightTextureHero" src/` to confirm the live tree currently has zero consumers (baseline).
2. For each route in §3, read the live page-content file end to end and write a one-paragraph audit note: "section X is a candidate for component Y because Z" or "no swap candidates."
3. Output: a single audit file at `docs/build/plans/editorial-stitch-promotion-audit-<DATE>.md` listing concrete swap-or-keep decisions per page, per section, with file:line references.
4. Submit as a docs-only PR. **No code changes in this slice.** Get the audit reviewed before swapping anything.

### Slice 2 — `LightTextureHero` adoption (audience hubs)

Scope: `/churches`, `/nonprofits`, `/institutions` audience hubs only.

1. For each hub, swap the bespoke hero to `LightTextureHero` per §3.9.
2. Visual diff at desktop 1440px and mobile 375px before / after, three pages × two viewports = six screenshots.
3. Verify `aria-labelledby` resolves correctly on each.
4. PR description names exactly what was swapped and includes the six screenshots inline.

### Slice 3 — `MidnightStatementQuote` adoption

Scope: any midnight band quote moments confirmed in Slice 1.

1. Swap each instance in a single PR. Touch only the quote block — surrounding section markup stays.
2. Verify the `<figure>` / `<figcaption>` semantics replace the prior `<blockquote>` correctly. If the page used `aria-labelledby` on the surrounding section, ensure the swap doesn't orphan the heading reference.
3. Visual diff per page.

### Slice 4 — `GhostCtaPanel` adoption

Scope: confirmed single-CTA closing panels only.

1. Swap each instance. Use `ctaHref` (not `onCtaClick`) since these are marketing CTAs to known routes.
2. Verify the panel sits on the correct band (`bg-section` / `bg-elevated`) — the panel itself is a `bg-card` lifted surface.
3. Visual diff per page.

### Slice 5 — `IconFeatureCard` adoption

Scope: confirmed icon-forward feature grids.

1. Swap each grid cell to `IconFeatureCard`. Preserve the icon node verbatim (lucide icons render the same).
2. Verify the surrounding grid layout still spaces correctly — `IconFeatureCard` pads 10–16 internally; the grid's `gap-*` classes may now over-space.
3. Visual diff at desktop and mobile.

### Slice 6 — `AtmosphericMediaCard` and `DotTextureCard` adoption

Scope: full-bleed image cards (Atmospheric) and pattern-background side-media cards (DotTexture).

1. Swap each instance. Carry image `sizes` props forward, updated to match the new container width.
2. Visual diff per page.

### Slice 7 — `EditorialShowcaseIntro` adoption

Scope: pure intro lockups (eyebrow + display + description).

1. Swap each. Pass `titleAs="h2"` where the page has its own `h1` to preserve landmark semantics.
2. Visual diff per page.

### Slice 8 — Cleanup and deletion

After Slice 1–7 land:

1. Re-grep for the editorial-stitch component imports — confirm each component is consumed at least once. Any component still at zero consumers gets a `// TODO` annotation in `editorial-stitch/index.ts` for future review.
2. Delete bespoke duplicates: any local component file in `studio/pages/` or `sections-mock/` that this pass replaced wholesale should be removed. Confirm zero remaining imports first.
3. Update the [unused-component audit](../plans/unused-component-audit-2026-05-08.md) to reflect that `editorial-stitch` and `LightTextureHero` are now PROMOTED (no longer dark).

---

## 6 — Per-slice verification checklist

For every slice (2–7):

- [ ] `pnpm typecheck` green.
- [ ] `pnpm lint` produces no new errors in the changed files (existing repo errors are out of scope; document the count delta in the PR).
- [ ] `pnpm test:run` green.
- [ ] `git diff --stat` is small enough to review end-to-end (target: under 400 lines changed per slice).
- [ ] Diff filtered to non-component text content shows zero copy changes:

  ```bash
  git diff <base>..HEAD -- 'src/**/*.tsx' \
    | grep -E '^[+-]' \
    | grep -vE '^[+-]{3}|^[+-]\s*//' \
    | grep -E '"[^"]{15,}"'
  # Inspect output: only attribute keys / class strings should appear, never marketing copy.
  ```
- [ ] Visual diff at desktop 1440px and mobile 375px on every affected route. Screenshots in PR.
- [ ] No new raw hex introduced (`grep -E '#[0-9a-fA-F]{3,8}' <changed-file>` returns only existing pre-change hits).
- [ ] No new tenant strings, no new feature flags, no new infrastructure.
- [ ] If the swap touches an `aria-labelledby`, the referenced `id` still exists on the new component.

---

## 7 — Editorial constraints (re-stating the hard rule)

**Do not change any copy.** If during a swap you notice a typo, a duplicate word, an awkward phrase, or a stale claim — leave it. File the observation as a separate issue or note in the PR description. Editorial revisions belong in a different pass with founder review, not in a design-upgrade slice.

**Do not change any image asset.** `Image` `src` paths transfer one-for-one. The only image-related change permitted is updating `sizes` to match the new container width when an image moves into a swap-target component.

**Do not change link hrefs.** A swap that takes a `Link href` should pass exactly the same string to the new component's `ctaHref` / `href` prop.

**Do not refactor surrounding code.** If a page imports a helper that becomes unused after a swap, remove the import — but do not rename, restructure, or "clean up" surrounding sections. That is scope creep and breaks the design-only invariant.

**Preserve `id` attributes used by anchor navigation.** If a section has `id="foo"` and the swap moves the section landmark inside a wrapper, place `id="foo"` on the wrapper to keep `#foo` deep-links working.

---

## 8 — Rollback discipline

Each slice ships behind a single PR. If a slice is reverted:

- Revert the PR cleanly with `git revert -m 1 <merge-sha>`. Do not cherry-pick subsets.
- If a deeper issue is discovered (e.g., `MidnightStatementQuote` has a vertical-rhythm bug), pause the entire pass at that slice. Do not continue to later slices on top of a known regression.
- Document the revert in the unused-component audit doc so the next pass knows what blocked promotion.

---

## 9 — What NOT to do

- **Do not touch `/`, `/toolkit/read`, `/contact`, `/pricing`, `/assess`, `/admin/*`, `/api/*`, or legal pages** in this pass. They have separate plans or chrome.
- **Do not introduce new components.** If a page needs a pattern outside the palette, leave it. Note it in §10 below for a future palette-expansion pass.
- **Do not promote `StitchGlassTopBar` into marketing pages.** Marketing pages keep `SiteNav` from the `(site)/layout.tsx` chrome. The Stitch top bar is for focused flows.
- **Do not change DESIGN.md.** The current tokens are correct. If a swap reveals a token gap, leave the gap and document it.
- **Do not refactor `editorial-stitch/` itself.** The components are correct as authored. If a prop seems missing (e.g., `GhostCtaPanel` doesn't support 2 CTAs), that's a signal **not to swap**, not to extend the component.
- **Do not delete unused components from the audit's DELETE list** as part of this pass. That cleanup belongs to its own PR (the audit's §5 step 2/3).
- **Do not change copy.** Stated three times for emphasis. Any copy change found in a slice's diff is grounds for the slice to be rejected at review.

---

## 10 — Palette gap log

Where a swap fails because the palette doesn't cover a needed pattern, append a row here:

| Page (file:line) | Pattern needed | Why no existing component fits | Suggested name for future component |
| --- | --- | --- | --- |
| _(populated as the pass executes)_ | | | |

This log is the input to a future palette-expansion prompt. Do not act on it in this pass.

---

## 11 — Final acceptance

The promotion is complete when:

1. Slices 1–8 have all merged and the `main` branch passes typecheck + lint + test.
2. `grep -rn "<MidnightStatementQuote\|<AtmosphericMediaCard\|<IconFeatureCard\|<DotTextureCard\|<GhostCtaPanel\|<EditorialShowcaseIntro\|<LightTextureHero" src/` shows non-zero consumers for at least 4 of the 7 components (the others are documented in §10 as awaiting a fitting use case).
3. The unused-component audit ([`docs/build/plans/unused-component-audit-2026-05-08.md`](../plans/unused-component-audit-2026-05-08.md) §1) is updated to reflect that the PROMOTE candidates are now in active use.
4. A short follow-up note is added to [`docs/design/DESIGN.md`](../../design/DESIGN.md) under the primitives / sections chain naming `editorial-stitch` and `LightTextureHero` as canonical patterns, so future authors find them before improvising.

The first three are non-negotiable. Step 4 is a small documentation slice that should be bundled with Slice 8.
