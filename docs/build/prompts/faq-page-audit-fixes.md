# FAQ page — consolidated audit fixes

**Created:** 2026-04-19  
**Target files:** [`src/app/(site)/faq/page.tsx`](../../../src/app/(site)/faq/page.tsx) · [`src/components/sections/faq/faq-page-content.tsx`](../../../src/components/sections/faq/faq-page-content.tsx) · [`src/components/sections/faq/faq-data.ts`](../../../src/components/sections/faq/faq-data.ts) · [`src/components/sections/faq-accordion.tsx`](../../../src/components/sections/faq-accordion.tsx)  
**Purpose:** Single execution prompt for FAQ: narrative alignment with Movemental canon, cross-site IA, DESIGN.md compliance, and copy/data accuracy. Modeled on [`home-page-audit-fixes.md`](./home-page-audit-fixes.md).

**Audit passes (run and append findings here):**

| Skill / pass | Status | Notes |
| --- | --- | --- |
| `movemental-narrative-audit` | ✅ Shipped inline (2026-04-19) | Intro + answers: integration, six stages named, the AI Stewardship Sequence + four articles + book + the AI Stewardship Sequence org article |
| `movemental-page-auditor` | ✅ Shipped inline (2026-04-19) | Cross-links to `/pricing`, `/system-builds`, `/how-it-works`, `/assess` vs `/assessment-new`, methodology |
| `design-audit` | ✅ Shipped inline (2026-04-19) | Closing band: `Button asChild` + `NewsletterForm`; removed hand-rolled CTA classes |
| `typography-polish` | ⏳ Optional follow-up | Accordion hierarchy unchanged structurally |
| `tailwind-cleanup` | ✅ N/A this pass | No new arbitrary color on FAQ surfaces |
| `responsive-audit` | ✅ Shipped inline (2026-04-19) | `scroll-mt-28` on FAQ section anchors for fixed nav |
| `movemental-prose` | ✅ Shipped inline (2026-04-19) | Pricing answer shortened; ownership line softened from “will never change” |

**Companion prompts (read first):**

- [`docs/build/prompts/stitch-to-react-migration.md`](./stitch-to-react-migration.md) — token remap  
- [`docs/design/DESIGN.md`](../../design/DESIGN.md) — semantic tokens, primitives  
- [`docs/arguments/SITE-SSOT.md`](../../arguments/SITE-SSOT.md) — routes, nav IA, what not to promise  
- [`docs/build/prompts/strategy-artifacts-placement-and-flow.md`](./strategy-artifacts-placement-and-flow.md) — book vs the AI Stewardship Sequence field guide article, assessments  

---

## Fix status (seeded 2026-04-19)

| Fix | Title | Status |
| --- | --- | --- |
| 0 | Baseline inventory | ✅ Documented — current FAQ: intro + 7 sections + closing CTA |
| 1 | Preserve anchor contract | ✅ Shipped — TOC label `Product & platform` matches §03 H2; `scroll-mt-28` on section wrappers |
| 2 | Canon vocabulary in intro + key answers | ✅ Shipped — third intro paragraph + “What is Movemental?” body |
| 3 | Cross-links in answers (IA) | ✅ Shipped — segment links + `relatedLinks` rows; `/methodology` verified live |
| 4 | Closing band: primitives + optional newsletter | ✅ Shipped — `Button` + `NewsletterForm` `source="faq-footer"` |
| 5 | Pricing answer vs SSOT | ✅ Shipped — aligned with `/pricing` (Sandbox Season zones, not legacy $5k×4); movement leader: no upfront before revenue + 90/10 |
| 6 | Accordion content model | ✅ Shipped — `FaqSegment[]` + renderer in `faq-accordion.tsx` |
| 7 | Per-item `id` for deep links / GEO | ✅ Shipped — stable `slug` on each item, `id={slug}` on `AccordionItem`, `value={slug}` |
| 8 | Metadata + description refresh | ✅ Shipped — `faq/page.tsx` description updated |

**Shipped cumulative:** 9/9 execution fixes (2026-04-19). Optional: full skill re-runs for formal audit appendices.

---

## 0 · Non-negotiables

1. **Preserve section anchors:** `id="faq-01"` through `id="faq-07"` on the section wrappers in [`faq-accordion.tsx`](../../../src/components/sections/faq-accordion.tsx) (via `faq-${section.num}`). The in-page TOC in [`faq-data.ts`](../../../src/components/sections/faq/faq-data.ts) (`faqToc`) must stay in lockstep. If section order or numbering changes, update **both** files in the same PR.
2. **Semantic tokens only** on any new or touched UI. No raw hex, no `bg-white` / `text-gray-*` for sectioning. Closing CTA today uses hand-rolled `bg-linear-to-br` + ring classes — normalize to design-system `Button` + tokenized focus (see Fix 4).
3. **Canonical vocabulary is load-bearing.** The AI Stewardship Sequence = Safety, Sandbox, Skills, Solutions. Two intelligences = informational + relational. Field guide = the book (`/book`) unless you explicitly mean the separate AI Stewardship Sequence **article** (see strategy-artifacts SSOT). Do not fork naming.
4. **No fabricated proof.** Pricing, timelines, and product inclusions must match [`SITE-SSOT.md`](../../arguments/SITE-SSOT.md) and the actual routes/components they describe. If the site redirects (e.g. legacy `/services` → `/system-builds`), FAQ must not send readers down dead paths.
5. **FAQ’s cross-site role:** Answer logistics and objections; **defer** full economics to `/pricing` and full sprint catalog to `/system-builds`. FAQ should summarize and link, not duplicate entire pricing tables in one paragraph.

---

## Fix 1 · Anchor + TOC contract

**Problem:** [`faqToc`](../../../src/components/sections/faq/faq-data.ts) labels section **03** as `"Product"` while the rendered H2 is **"Product & Platform"** — minor trust/clarity gap.

**Fix:**

- Either rename the TOC label to `Product & platform` (sentence case per site patterns) **or** shorten the section H2 to `Product` with a subtitle in prose. Pick one; do not leave them silently mismatched.

**Verify:** Click every TOC item on desktop and mobile; focus must scroll to the correct accordion group (`scroll-margin` already inherited from site layout where applicable — add `scroll-mt-*` on section wrappers if anchors sit under the fixed nav).

---

## Fix 2 · Canon vocabulary (intro + selective answers)

**Current strength:** Intro already defines informational vs relational fragmentation and links to [`/fragmentation`](../../../src/app/(site)/fragmentation).

**Gaps vs canon (mirror home narrative audit):**

- The **AI Stewardship Sequence** is never named on the FAQ page. At minimum, the intro’s second paragraph (or the “What is Movemental?” answer) should introduce the sequence once — "the AI Stewardship Sequence: Safety, Sandbox, Skills, Solutions" — and optionally point to the four canonical articles (same targets as home Fix 5 — verify slugs in [`src/lib/articles.ts`](../../../src/lib/articles.ts) before linking).
- **Integration** as the structural stall (fragmentation → integration) appears implicitly but not by the word *integration* — add **one** explicit sentence in either intro or “What is Movemental?” tying two-intelligences work to integration/foundation language (see home Fix 10 / 11 for phrasing discipline; do not paste the whole home paragraph).
- **Field guide:** Add a hairline link to **`/book`** (and only use “field guide” if that matches your public language SSOT — strategy doc distinguishes book vs the AI Stewardship Sequence field guide **article**). If you mean the article, link `/articles/ssss-field-guide-for-organizational-leaders` instead. Do not use both interchangeably.

**Execution note:** ~~Answers in `faq-data.ts` are plain strings.~~ **Done (2026-04-19):** answers use `segments: FaqSegment[]` (`text` | `link`) plus optional `relatedLinks`; see [`faq-data.ts`](../../../src/components/sections/faq/faq-data.ts) and [`faq-accordion.tsx`](../../../src/components/sections/faq-accordion.tsx).

---

## Fix 3 · Cross-site links (reduce duplication, increase confidence)

**Targets:**

| Topic | Link to | Rationale |
| --- | --- | --- |
| Org sprint pricing, fee tables | `/pricing` | Single source for published numbers |
| Named builds (Discovery Lab, Governance, etc.) | `/system-builds` and specific child routes if cited | SSOT route table |
| How the system fits together | `/how-it-works` | FAQ “product” answers should not re-teach the whole story |
| Assessments | `/assess` vs `/assessment-new` per strategy SSOT | Distinct products; FAQ must not collapse them |

**Anti-pattern:** Long answers that restate entire pages. Prefer 2–3 sentences + `ArrowLink` or inline text link to the authoritative surface.

**Blocked check:** `SITE-SSOT` states `/methodology` may not exist as a standalone route. Before linking “methodology,” `Glob` for `src/app/(site)/methodology/**` — if present, link it; if not, point to `/how-it-works` or `/evidence` per editorial choice.

---

## Fix 4 · Closing “Still have questions?” band

**Current:** [`faq-page-content.tsx`](../../../src/components/sections/faq/faq-page-content.tsx) uses a raw `Link` with Tailwind classes mimicking a primary button.

**Fix:**

- Replace with the same **`Button` + `Link`** (or `Button asChild`) pattern used on `/contact` and home §Invitation — primary → `/contact`.
- **Optional (product decision):** Add secondary path: inline **`NewsletterForm`** with `source="faq-footer"` (mirror home Fix 3). Only ship if `TENANT_ORG_ID` is verified for `/api/newsletter`. If omitted, add a secondary `ArrowLink` to `/articles` or `/book` instead.

**Design:** Keep `Section variant="section"` and `spacing="lg"` unless `design-audit` recommends a midnight band for contrast — default is lighter editorial continuity with the accordion block above.

---

## Fix 5 · Pricing & economics answer (`faq-data.ts`)

**Problem:** The “How does pricing work?” response is one very long string. It is easy for numbers/names to drift from [`pricing-page-content.tsx`](../../../src/components/sections/pricing/pricing-page-content.tsx), [`sandbox-season-data`](../../../src/components/sections/services-sandbox-season/sandbox-season-data.tsx), or org SSOT.

**Fix:**

1. **Fact-check** every dollar figure and sprint name against live sources in the repo + SSOT snapshot date.  
2. **Rewrite** into 2 short paragraphs: (a) movement-leader economics at a glance; (b) organization sprint economics at a glance + “full tables → `/pricing`”.  
3. Remove or qualify anything that reads like a contract (e.g. “will never change”) unless legal has approved that language for FAQ.

---

## Fix 6 · Accordion content model (links inside answers)

**Problem:** `FaqAccordion` renders `item.a` as a flat string — you cannot insert `Link` or bold runs without either HTML-in-string (forbidden) or a richer type.

**Fix (pick one approach, do not hybridize):**

- **Option A (recommended):** Extend the item type to `a: ReactNode` and author answers in a **`faq-answers.tsx`** (or per-section TSX) map that returns `<p>…<Link>…` fragments. `faq-data.ts` keeps metadata-only (slug, q, section) **or** the whole dataset moves to TSX.  
- **Option B:** Add `relatedLinks?: { label: string; href: string }[]` to each item; render below the paragraph in `AccordionContent` with `ArrowLink`. Keeps strings pure; limited but safe.

**Constraint:** Preserve existing copy intent; this is a **presentation + linkability** upgrade, not a full rewrite unless narrative audit demands it.

---

## Fix 7 · Optional deep-link IDs per question

**Goal:** Allow `https://…/faq#fragmentation-pricing` style links for sales and GEO.

**Spec:** Stable `id`s derived from a kebab slug stored next to each `q` (e.g. `slug: "who-owns-content"`). Accordion items expose `id={slug}` on `AccordionItem` or a wrapper **if** Radix API allows; otherwise put `id` on a `div` immediately inside `AccordionContent`. Document slugs in this file when added.

---

## Fix 8 · Page metadata

**File:** [`src/app/(site)/faq/page.tsx`](../../../src/app/(site)/faq/page.tsx)

After copy fixes, refresh `metadata.description` (and `openGraph` / `twitter` if the site pattern includes them on other marketing pages — match sibling pages).

---

## Narrative audit — seeded findings (pre-skill pass)

**Ground truth:** Same canon sources as home audit — [`docs/articles/two-intelligences-integration.md`](../../articles/two-intelligences-integration.md), fragmentation manuscript six-stage materials, the AI Stewardship Sequence articles, [`SITE-SSOT.md`](../../arguments/SITE-SSOT.md).

| Dimension | Initial read | Evidence |
| --- | --- | --- |
| Copy (shared vocabulary) | **Partial** | Two intelligences + fragmentation link present; the AI Stewardship Sequence, integration, six stages, book/field guide not explicit enough for a reader who lands on FAQ first. |
| Cross-site role | **Partial** | Strong standalone Q&A; tends to duplicate pricing and product depth instead of pointing to `/pricing` and `/how-it-works`. |
| Proof / accuracy | **At risk** | Long pricing string is a drift vector whenever economics change. |
| Design system | **Partial** | Closing CTA bypasses `Button` primitive; otherwise uses `Section` / `Container` / `FeatureSplit` appropriately. |

## Verdict (working)

FAQ is **useful and mostly aligned** but under-connected to the same canon surfaces the rest of the site is converging on. Fixes 2–6 are the high-leverage bundle; 7–8 are polish.

---

## Execution order

1. Fix 5 (pricing truth) + Fix 1 (TOC copy) — low risk, high trust.  
2. Fix 6 (content model) — unblocks Fix 2 and Fix 3 links.  
3. Fix 2 + Fix 3 (copy + IA).  
4. Fix 4 (CTA / optional newsletter).  
5. Run listed audit skills; append scored sections below (same structure as `home-page-audit-fixes.md` §“Narrative audit findings”).  
6. Fix 7–8 as time allows.

---

## Appendix · Route verification checklist (before linking)

Run from repo root:

```bash
rg "faq-" src/components/sections/faq -n
pnpm typecheck
pnpm lint
```

Confirm every `href` introduced in FAQ content resolves to a route file under `src/app/(site)/`.

---

## PR draft block (when shipping)

**Title:** FAQ: canon links, pricing SSOT, CTA primitives  
**Summary:** Aligns FAQ copy and IA with Movemental canon (AI Stewardship Sequence, book/field guide, integration language), deduplicates pricing narrative toward `/pricing`, refactors FAQ answers to support inline links, and replaces the hand-rolled closing CTA with design-system buttons. Updates metadata to match.
