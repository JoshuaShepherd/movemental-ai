# UI audit: Churches, nonprofits, and institutions audience pages

**Date:** 2026-05-06  
**Scope:** Production routes that render `AudiencePage` → `SegmentPathway` — `/churches`, `/nonprofits`, `/institutions` (plus aliases `/for-churches`, `/for-nonprofits`, `/for-institutions`).  
**Method:** Source inspection against known sticky-scroll patterns elsewhere in the repo. **Chrome DevTools MCP** was requested but is **not present** in this workspace’s configured MCP servers (`mcps/` lists Supabase, Sentry, GitLab, PostHog, Vercel, Atlassian, Stripe, Resend, shadcn only). To reproduce visually, open the three URLs in Chrome locally and verify Computed → `position` on the left rail in `#pathway-details`.

---

## Executive summary

The three audience pages share one implementation (`SegmentPathway`). The **left “path rail” (Safety → Sandbox → Skills → Solutions) does not use CSS `position: sticky`**, so it scrolls away with the document while the right column panels stay tall — which matches the reported “sticky not working” behavior. **There is no GSAP on this surface:** scrolling is driven by a `window` scroll listener updating a progress meter and active stage; the bug is missing sticky positioning (and some behavioral gaps vs the canonical `path/PathStickySection` implementation).

Secondary issues: **heavy duplication** between the hero “What are the outcomes?” grid and the four deep stage panels below; **globally scoped `document.querySelectorAll(".stage-panel")`** for jump navigation; **copy/IA rough edges** (FAQ heading); **stacked midnight bands** at the footer; and **inconsistent parity** with the more polished `PathRail` + `IntersectionObserver` stack used on the shared path experience.

---

## Route → component map

| Route(s) | Page component | Main UI |
|----------|----------------|---------|
| `/churches`, `/for-churches` | `src/app/(site)/churches/page.tsx` | `AudiencePage` |
| `/nonprofits`, `/for-nonprofits` | `src/app/(site)/nonprofits/page.tsx` | `AudiencePage` |
| `/institutions`, `/for-institutions` | `src/app/(site)/institutions/page.tsx` | `AudiencePage` |

`AudiencePage` (`src/components/studio/pages/AudiencePage.tsx`) composes:

1. `SegmentPathway` — hero, outcomes grid, four-stage scroll section, FAQs  
2. `CaseStudy` — narrative + stats + collapsible full story  
3. `PathClosingCta` — midnight band  
4. `PathFootnote` — second midnight band + anchor links  

Legacy/alternate implementations (`PathExperience` + `src/components/path/PathStickySection.tsx`, `AudiencePathSection` on older section pages) exist but **are not what these three URLs render today**.

---

## P0 — Left rail does not stick (root cause)

**Symptom:** On desktop (≥960px), the meter + “Stage X of 04” card on the left should remain visible while the reader scrolls through Safety, Sandbox, Skills, and Solutions on the right. Instead the whole left column scrolls off-screen.

**Cause:** In `SegmentPathway`, the left column wrapper is only `relative hidden … min-[960px]:block`. The inner card has **no `sticky` class** (contrast with `src/components/studio/path/PathStickySection.tsx`, which uses `sticky top-32` on the rail card, and `src/components/path/PathRail.tsx`, which uses `min-[960px]:sticky min-[960px]:top-[var(--site-header-height,4.25rem)]` plus viewport-height sizing).

**Reference (current structure — no sticky):**

```431:432:src/components/studio/segment/SegmentPathway.tsx
            <div className="relative hidden h-full min-[960px]:block" aria-label="Path stages">
              <div className="rounded-card bg-section border-border relative flex gap-8 border p-8">
```

**Note on “GSAP”:** `SegmentPathway` does **not** import GSAP or ScrollTrigger. Stage activation uses `getBoundingClientRect` vs `viewportHeight * 0.5`. Mislabeling is understandable because other parts of the site (e.g. fragmentation story) use ScrollTrigger for pinned stages.

**Fix direction (implementation hint, not prescriptive):**

- Add `sticky` + top offset aligned with fixed header (`--site-chrome-total` or `--site-header-height` — see `globals.css`).
- In CSS grid layouts, pair sticky with **`align-self: start`** on the rail column wrapper so the sticky box has a defined scroll span within the grid row (pattern already documented in `PathRail` comments).

---

## P1 — Jump navigation can target the wrong panels

`handleJump` uses:

```typescript
const sections = document.querySelectorAll(".stage-panel");
```

That selects **every** `.stage-panel` in the document, not scoped to `containerRef`. If another route or future section adds the same class, **click-to-jump may scroll to the wrong article**. Prefer `containerRef.current?.querySelectorAll(".stage-panel")` or refs per panel (as in `path/PathStickySection.tsx`).

---

## P1 — Active-stage and meter logic diverge from the canonical path section

The repo’s `src/components/path/PathStickySection.tsx` uses:

- **IntersectionObserver** with a tight center band (`rootMargin: "-45% 0px -45% 0px"`) for stable active-index selection.
- A **dedicated progress formula** over the section ref for the meter fill.

`SegmentPathway` uses a single scroll handler with midpoint heuristics and a different progress calculation (`rect.height - viewportHeight`, `-rect.top`). This may cause:

- Subtle **flicker** or wrong stage when two panels straddle the midpoint.
- **Meter progress** that feels misaligned with perceived reading position compared to `/path` or mockups.

Aligning behavior with `PathStickySection` / `PathRail` would reduce one-off bugs and user-reported “janky” scroll UX.

---

## P2 — Information architecture and density

1. **Duplicate path storytelling:** The hero already includes a full four-column **“What are the outcomes?”** block (stage names, duration, price, outcome line, deliverables, links). The following `#pathway-details` section repeats the same four stages at **much greater depth** (checklists, tables, long prose). For a first-time reader this is **redundant and exhausting**; consider collapsing the hero summary, turning it into anchors, or deferring deliverables to the detail column only.

2. **FAQ heading:** `Questions from {audience}` renders as e.g. **“Questions from churches”** — informal / oddly phrased vs **“Questions from church leaders”** or **“Common questions”** with audience in the deck only.

3. **Institutions-only callout:** The Network Engagements block is appropriate but increases vertical rhythm variance vs the other two pages — ensure spacing and heading hierarchy feel intentional, not bolted on.

---

## P2 — Visual system consistency

- **Studio vs DESIGN.md primitives:** These pages lean on `band-default`, `band-section`, `band-midnight`, and recipe-oriented classes (`recipes.css`). That is coherent with the AI Studio shell but differs from `(site)` marketing sections that use `Section` / `Container` primitives and stricter token naming. Worth a pass for **border usage** (some section borders vs DESIGN.md “tonal stacking” preference) — not necessarily wrong here if Studio is intentionally separate.

- **Stacked midnight sections:** `PathClosingCta` and `PathFootnote` are both `band-midnight`. Back-to-back midnight can feel **heavy**; consider a single combined footer band or a light separator / tonal shift between them.

- **`PathStickySection` (studio) gradient:** `src/components/studio/path/PathStickySection.tsx` uses `from-white/40` on the rail overlay — a **raw white** wash; `SegmentPathway` uses `from-background/40`, which is closer to token discipline. If consolidating rail implementations, prefer semantic mixes.

---

## P3 — Header height vs CSS variables

`PathRail` assumes `--site-header-height: 4.25rem`. `SiteHeader` is sticky and its **vertical padding changes when scrolled** (`py-4` vs `py-2`), so the real header height is not constant. Sticky rails should use an offset that matches **maximum** header height or measure after layout — minor polish once sticky is fixed.

---

## Comparison matrix (implementations)

| Concern | `SegmentPathway` (audience pages) | `path/PathStickySection` + `PathRail` | `studio/path/PathStickySection` |
|--------|-----------------------------------|--------------------------------------|--------------------------------|
| Sticky rail | **Missing** | Yes (`sticky` + viewport height) | Yes (`sticky top-32`) |
| Stage detection | Scroll + midpoint | IntersectionObserver | Scroll + midpoint |
| Jump targets | Global `.stage-panel` | Ref-scoped | Global `.stage-panel` |
| Meter progress | Custom formula | RAF + section rect | Custom formula |

**Recommendation:** Prefer **one rail implementation** — ideally promote `PathRail` / `PathMeter` / `StepCard` (or shared hooks) and inject audience-specific titles/outcomes from `segmentData` — rather than maintaining three divergent scroll stacks.

---

## Suggested remediation order

1. **Fix sticky rail** in `SegmentPathway` + grid `self-start`; verify in Chrome ≥960px and spot-check mobile (rail hidden — ensure mobile stage headers remain clear).
2. **Scope jump + scroll queries** to the pathway container or refs.
3. **Optional:** Port active-stage + progress logic from `path/PathStickySection` for parity.
4. **Editorial/layout:** Reduce duplication between outcomes grid and detail panels; polish FAQ heading and midnight stacking.
5. **Long-term:** Consolidate studio path UI with `path/` primitives to avoid regressions when one fork changes.

---

## Chrome DevTools checks (when MCP or manual)

After fixes, verify:

1. Select left rail card → Computed `position` is `sticky`; no ancestor has `overflow: hidden` that clips sticking (aside: `PathClosingCta` uses `overflow-hidden` on its own section only — should not affect `#pathway-details`).
2. Scroll through four panels — active dots / meter height track without large jumps.
3. Resize across 960px breakpoint — no layout thrash; sticky top clears fixed header (no overlap).
4. **Reduced motion:** jump buttons still work with `scrollIntoView` behavior `auto`.

---

## Files touched by this audit (read path)

- `src/components/studio/segment/SegmentPathway.tsx` — primary findings  
- `src/components/studio/pages/AudiencePage.tsx` — composition  
- `src/components/path/PathStickySection.tsx`, `PathRail.tsx` — reference behavior  
- `src/components/studio/path/PathStickySection.tsx` — alternate sticky reference  
- `src/app/globals.css` — `--site-header-height`, `--site-chrome-total`  
- `src/components/studio/path/CaseStudy.tsx`, `PathClosingCta.tsx`, `PathFootnote.tsx` — secondary UX notes  
