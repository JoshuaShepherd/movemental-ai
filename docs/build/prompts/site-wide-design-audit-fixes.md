# Site-wide design audit — fixes applied

**Created:** 2026-04-18
**Scope:** All page section components (`src/components/sections/`), navigation chrome (`src/components/nav/`), page routes (`src/app/(site)/`), and one primitive update. **Excludes** the home page (`src/components/sections/home/home-concept-modern-page-content.tsx`) which was already audited in the 9-pass cycle — see [`home-page-audit-fixes.md`](./home-page-audit-fixes.md).

**Approach:** Batch mechanical replacements via `sed` for patterns that had canonical forms already established by the home-page audit. Special-case handling for files with local re-implementations of existing primitives.

**Result:** 40 files modified; 0 new typecheck errors; 3 pre-existing lint issues unchanged.

---

## Patterns migrated (all shipped)

| # | Anti-pattern | Canonical form | Scope |
| --- | --- | --- | --- |
| 1 | `variant="editorial"` | `variant="default"` | All `<Section>` call sites (site-wide) |
| 2 | `variant="editorialAlt"` | `variant="section"` | All `<Section>` call sites (site-wide) |
| 3 | `scroll-mt-[var(--site-chrome-total)]` | `scroll-mt-(--site-chrome-total)` | Tailwind v4 CSS-var shorthand |
| 4 | `text-[0.72rem]` | `text-[0.78rem]` | Eyebrow labels — matches canonical `Eyebrow` primitive size, clears 12px readability floor |
| 5 | `[&:nth-child(odd)]:` | `odd:` | Tailwind v4 built-in variant |
| 6 | `[&:nth-child(even)]:` | `even:` | Tailwind v4 built-in variant |
| 7 | `[&:nth-child(2n)]:` / `(3n)` / `(4n)` | `nth-[2n]:` / `nth-[3n]:` / `nth-[4n]:` | Tailwind v4 shorthand |
| 8 | `max-w-[var(--container-max)]` | `max-w-(--container-max)` | Tailwind v4 CSS-var shorthand |
| 9 | `max-w-[var(--prose-max)]` | `max-w-(--prose-max)` | Tailwind v4 CSS-var shorthand |
| 10 | `max-w-[var(--container-narrow)]` | `max-w-(--container-narrow)` | Tailwind v4 CSS-var shorthand (in `Container` primitive) |

**Intentionally NOT migrated:**
- `src/components/primitives/section.tsx` — retains `"editorial" | "editorialAlt"` type aliases for backward compatibility with any still-unmigrated call sites.
- `src/app/globals.css` — legacy `[data-variant="editorial"]` CSS shim retained for the same reason.

---

## Special-case migrations

### `about-page-content.tsx` — deleted local `SerifEm` and `ConceptLabel` clones

The About page had its own local implementations of `SerifEm` (Instrument Serif emphasis) and `ConceptLabel` (eyebrow with ink dot) — pre-dating the canonical primitives. Migrated:

- 11 usages of `<ConceptLabel>X</ConceptLabel>` → `<Eyebrow withDot className="mb-5">X</Eyebrow>`
- 1 usage of `<ConceptLabel inverse>Begin</ConceptLabel>` → `<Eyebrow withDot inverse className="mb-5">Begin</Eyebrow>` (see primitive extension below)
- 3 usages of `<SerifEm>X</SerifEm>` → plain `<em>X</em>` (base layer auto-applies Instrument Serif italic via `h1–h4 em` selector)
- Local `ConceptLabel` and `SerifEm` function definitions deleted
- Added `Eyebrow` to the primitives import

### `Eyebrow` primitive — added `inverse` prop

The About page's `ConceptLabel` had an `inverse` variant for midnight-band usage (one call site). Extended the canonical [`src/components/primitives/eyebrow.tsx`](../../../src/components/primitives/eyebrow.tsx) with an `inverse` prop:

```tsx
inverse?: boolean; // per DESIGN.md §3.6 midnight ink hierarchy
```

When `inverse` is true:
- Text color: `text-inverse-foreground/70` (instead of `text-muted-foreground`)
- Dot color: `bg-inverse-foreground/80` (instead of `bg-foreground/80`)

Non-breaking addition — defaults to `false`; existing call sites unaffected.

### `AudiencePathSection` + `AudienceProseSection` — wrapper variant defaults

Both audience-concept wrapper components had legacy `variant` defaults:

- `audience-prose-section.tsx` — default `"editorial"` → `"default"`
- `audience-path-section.tsx` — default `"editorialAlt"` → `"section"`; type changed from `"editorial" | "editorialAlt"` → `"default" | "section"`

Fixes typecheck errors in churches / institutions / nonprofits page content that were passing the new canonical variant names.

---

## Files modified (40 total)

Breakdown by directory:

- `src/components/sections/` — ~30 files (audience-concept, articles, article-detail, about, assess, blog, book, book-*, churches, contact, faq, fragmentation-story, home/*, institutions, legal-*, movement-leaders, nonprofits, organizations, services, team)
- `src/components/nav/` — 1 file (`site-footer.tsx`)
- `src/components/primitives/` — 2 files (`eyebrow.tsx`, `container.tsx`)
- `src/app/(site)/` — 7 files (assess/formation, articles, various `page.tsx`)

Full list in `git diff --name-only` output.

---

## Verification

```bash
# Typecheck — clean
pnpm exec tsc --noEmit

# Legacy patterns remaining in call sites — all zero
grep -rl 'variant="editorial"' src/components/sections src/app  # 0
grep -rl 'scroll-mt-\[var(--site-chrome-total)\]' src/components src/app  # 0
grep -rl 'text-\[0\.72rem\]' src/components src/app  # 0
grep -rl '\[&:nth-child(' src/components src/app  # 0
grep -rl 'max-w-\[var(' src/components src/app  # 0
grep -rl 'function SerifEm\|function ConceptLabel' src/components  # 0
```

**Two intentional remainders** (by design, retained for backward compatibility):
- `src/components/primitives/section.tsx` — type aliases
- `src/app/globals.css` — CSS legacy shim

---

## What this pass did NOT do

The home-page audit cycle ran 9 passes (home-consult, narrative, page-auditor, design-audit, visual-storytelling, color, typography-polish, tailwind-cleanup, responsive) and surfaced deeper page-specific findings (integration-sentence inserts, infrastructure vocabulary, six-stages bridges, founder rail builds, newsletter form wiring, system-map diagrams, etc.). This site-wide pass only migrated the **mechanical DESIGN.md anti-patterns** already identified — it does NOT rerun the deeper audits against each page.

**If you want deeper per-page coverage**, run individual audit passes against the specific page (e.g., `design-audit` + `color-audit` + `responsive-audit` against `/about`, `/fragmentation`, each audience page). The mechanical cleanup this file records is a prerequisite — it means all pages are now on the same canonical foundation before any deeper work.

**Pages that would most benefit from a deeper audit next:**

- `/fragmentation` — complex interactive narrative with scroll-story behavior (fragmentation-story components)
- `/about` — just had major structural edits; worth a deeper pass to ensure coherence
- Audience pages (`/nonprofits`, `/churches`, `/institutions`) — share a common shell; audit should focus on the concept shell + one audience for efficiency
- `/book` — long-form reading experience, worth the reading-pass audit

---

## Open questions inherited from home-page cycle

These still apply site-wide — they weren't resolved by the mechanical cleanup:

1. **Display H3 exception** — does `font-serif italic` on whole H3 headings (contradicts DESIGN.md §5 `<em>`-only rule) stay as the card-label pattern, or get refactored? See [`PATTERNS.md §6`](../../design/PATTERNS.md#6-display-h3-exception--full-heading-serif-italic).
2. **Touch target minimum for shared form buttons** — `NewsletterForm`'s 36px submit height. See [`PATTERNS.md §7`](../../design/PATTERNS.md#7-touch-target-minimums).
3. **`<ArrowLink>` primitive migration** — hairline-link pattern is repeated 50+ times site-wide but an unused `ArrowLink` primitive exists. See [`PATTERNS.md §2`](../../design/PATTERNS.md#2-hairline-link).

---

**Last updated:** 2026-04-18 after site-wide design-audit mechanical pass.
