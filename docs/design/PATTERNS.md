# Movemental application patterns

> **Companion to [DESIGN.md](./DESIGN.md).** DESIGN.md is the foundation charter (tokens, primitives, typography base, color model, motion basics). This file catalogs the **emergent application patterns** — the compositions of primitives that show up repeatedly in real pages but aren't part of the foundation.

**Relationship to DESIGN.md:**

- DESIGN.md answers *"what tokens / primitives / rules does the system provide?"*
- PATTERNS.md answers *"how do primitives compose into real page elements?"*

**Lifecycle:** A pattern enters this file when it appears 3+ times across the site OR is deliberately canonicalized in a build prompt. A pattern **graduates** into DESIGN.md when it either (a) needs to become a primitive under `src/components/primitives/`, or (b) becomes a foundation-level rule (e.g., "every card uses `rounded-card`").

**Source of truth:** Patterns codified here were extracted from the home page audit cycle (2026-04-18, 41 fixes across 9 audit passes). File-line citations point to live usages. If a pattern has drifted from this doc, treat that as a bug — fix the doc OR the code, not both simultaneously.

---

## Table of contents

1. [Card typology](#1-card-typology)
2. [Hairline link](#2-hairline-link)
3. [Rail dividers between cards](#3-rail-dividers-between-cards)
4. [Numbered rail prefix](#4-numbered-rail-prefix)
5. [Tonal rhythm (section alternation)](#5-tonal-rhythm-section-alternation)
6. [Display H3 exception — full-heading serif italic](#6-display-h3-exception--full-heading-serif-italic)
7. [Touch target minimums](#7-touch-target-minimums)
8. [Authority moment (scroll-stop / pull quote)](#8-authority-moment-scroll-stop--pull-quote)
9. [Hero aside](#9-hero-aside)
10. [Newsletter form inline](#10-newsletter-form-inline)
11. [Logo strip with typographic fallback](#11-logo-strip-with-typographic-fallback)
12. [System-map diagram](#12-system-map-diagram)
13. [Responsive application rules](#13-responsive-application-rules)
14. [Open questions](#14-open-questions)

---

## 1. Card typology

**Purpose:** The home page uses 5+ card variants with near-identical structure. This is the canonical card anatomy.

**Anatomy:**

1. Outer container — `rounded-card bg-card p-[clamp(1.5rem,2.6vw,2rem)]` on a `bg-section` or `bg-background` band (Ghost Lift).
2. Eyebrow (optional) — `<span className="text-[0.78rem] font-medium uppercase tracking-eyebrow text-ink-soft">`
3. Title — `<h3>` with serif-italic treatment (see §6).
4. Body — `<p className="text-[0.98rem] leading-normal text-muted-foreground">`
5. Outbound link (if interactive) — hairline link pattern (see §2) with `group-hover:border-foreground` on a parent `<Link class="group ...">`

**Canonical example (interactive card):**

```tsx
<Link
  href={hub.href}
  className="group relative flex h-full flex-col gap-3 rounded-card bg-card p-[clamp(1.5rem,2.6vw,2rem)] transition-transform duration-250 ease-out hover:-translate-y-0.5"
>
  <span className="text-[0.78rem] font-medium uppercase tracking-eyebrow text-ink-soft">
    {hub.tag}
  </span>
  <h3 className="font-serif text-[clamp(1.35rem,2.1vw,1.65rem)] font-normal italic leading-tight tracking-[-0.005em] text-foreground">
    {hub.title}
  </h3>
  <p className="flex-1 text-[0.98rem] leading-normal text-muted-foreground">
    {hub.body}
  </p>
  <span className="mt-1 inline-flex items-center gap-1.5 self-start border-b border-border pb-0.5 text-sm font-medium text-foreground transition-colors group-hover:border-foreground">
    Go deeper
    <ArrowRight className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5" aria-hidden />
  </span>
</Link>
```

**Variants:**

- **Static card** (§Two-intelligences, §Foundation nodes): same anatomy, no wrapping `<Link>`, no hover lift, may omit the outbound link. Use `<article>`.
- **Interactive card** (§Audiences, §Writing sampler): whole card is a `<Link class="group ...">`, includes hover lift (`-translate-y-0.5`) and hairline-link gesture.
- **People card** (§About founders): adds a `header` block with portrait + name + role before the body. Portrait is 64px (`size-16 shrink-0 rounded-full`).
- **Icon card** (§Foundation): icon at top (`size-7 text-foreground stroke-[1.25]`), then title + body. No eyebrow.

**Where used:**

- §Two-intelligences cards — [home-concept-modern-page-content.tsx](../../src/components/sections/home/home-concept-modern-page-content.tsx) (lookup `article className="flex h-full flex-col gap-5 rounded-card bg-card`)
- §Audiences — `Link ... rounded-card bg-card`
- §Writing sampler — `Link ... rounded-card bg-card`
- §Foundation — `div className="flex h-full flex-col gap-4 bg-card ..."`
- §About founders — `article className="flex h-full flex-col gap-4 rounded-card bg-card ..."`

**Rules:**

- Use `rounded-card` (14px). Never `rounded-[20px]` or larger.
- Use `bg-card` (`#ffffff`). Always on `bg-section` or `bg-background` for Ghost Lift.
- Never add `shadow-sm/md/lg`. Elevation comes from tonal contrast.
- Padding uses `p-[clamp(1.5rem,2.6vw,2rem)]` for standard cards. Two-intelligences cards use a larger `p-[clamp(1.75rem,3vw,2.4rem)]` for their depth role.
- Body text always `text-muted-foreground`, never full `text-foreground`.

**Graduates when:** a `<SurfaceCard>` primitive is added to `src/components/primitives/`. Then card anatomy becomes a primitive spec, and PATTERNS.md tracks only the variants.

---

## 2. Hairline link

**Purpose:** Tertiary navigation / outbound links that shouldn't compete with a primary CTA pill but need more presence than body-text links.

**Anatomy:**

- Inline text — `text-sm font-medium text-foreground`
- Underline — `border-b border-border pb-0.5`
- Hover — `transition-colors hover:border-foreground`
- Arrow — `<ArrowRight className="size-3.5 ..." aria-hidden />` with `group-hover:translate-x-0.5`

**Canonical example:**

```tsx
<Link
  href="/book"
  className="group inline-flex items-center gap-1.5 border-b border-border pb-0.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
>
  Read the book
  <ArrowRight
    className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
    aria-hidden
  />
</Link>
```

**Where used on the home page:**

- §Two-errors closing — "See the path"
- §Path forward bridge — "Walk the six stages" + "Read the book" + "AI Stewardship Sequence field guide" (see `BOOK_HUB_PATH` / `SSSS_FIELD_GUIDE_PATH` in `src/lib/canon-routes.ts`)
- §Path steps (AI Stewardship Sequence) — "Learn more" (x4)
- §Path closing — "The book is specific about this"
- §Two-intelligences closing — "Read Chapter 2" + `/walkthrough` placeholder
- §Writing — "Read — {readTime}" (x3), "All writing"
- §Grounding — "Read the book" + "AI Stewardship Sequence field guide"
- §Foundation closing — "Read Chapter 11"

**12+ instances. This is the page's most-repeated micro-pattern.**

**Rules:**

- Always pair with an `ArrowRight` icon at `size-3.5` (14px).
- Always inside a `group` (parent with `group` class) so the arrow translate-x fires on parent hover.
- On interactive cards where the whole card is a `<Link>`, the hairline link is nested inside and uses `group-hover:border-foreground` — triggered by card hover, not the inner span.
- Standalone hairline links wrap in their own `group`.

**Graduates when:** a `<HairlineLink>` or `<ArrowLink>` primitive is added. `ArrowLink` exists today ([src/components/primitives/arrow-link.tsx](../../src/components/primitives/arrow-link.tsx)) but is unused on the home page — migration pending.

---

## 3. Rail dividers between cards

**Purpose:** Structural hairlines between cells in a horizontal rail, per DESIGN.md §3.1 allowance ("structural hairlines between cards, path steps, ledger rows").

**Two techniques used:**

### 3a. `border + divide` pattern (per-cell borders)

Each cell gets its own `border-b` / `border-r border-border` classes with responsive overrides.

**Used in:** §AI Stewardship Sequence rail (4 steps), §Authority rail (3 statements), §Two-errors (2 items).

**Canonical example (from §AI Stewardship Sequence rail):**

```tsx
<ol className="... grid list-none border-t border-border p-0 sm:grid-cols-2 lg:grid-cols-4">
  {PATH_STEPS.map((step) => (
    <li
      className={cn(
        "relative flex flex-col gap-3.5 border-b border-border py-[clamp(1.75rem,3vw,2.25rem)] pr-0",
        "sm:border-r sm:pr-[clamp(1.25rem,2vw,1.75rem)]",
        "sm:nth-[2n]:border-r-0 sm:nth-[2n]:pr-0",
        "lg:border-b-0 lg:border-r lg:pr-[clamp(1.25rem,2vw,1.75rem)]",
        "lg:nth-[2n]:border-r lg:nth-[2n]:pr-[clamp(1.25rem,2vw,1.75rem)]",
        "lg:nth-[4n]:border-r-0 lg:nth-[4n]:pr-0"
      )}
    >
      ...
    </li>
  ))}
</ol>
```

### 3b. `bg-border gap-px overflow-hidden` pattern (background reveal)

Outer grid has `bg-border` as its background color; cells have `bg-card`; 1px grid gaps reveal the hairline.

**Used in:** §Foundation 4-node system map.

**Canonical example:**

```tsx
<div className="grid gap-px overflow-hidden rounded-card bg-border sm:grid-cols-2 lg:grid-cols-4">
  {nodes.map((node) => (
    <div className="flex h-full flex-col gap-4 bg-card p-[clamp(1.5rem,2.8vw,2.2rem)]">
      ...
    </div>
  ))}
</div>
```

**When to use which:**

- **Pattern 3a** when cells have variable internal heights and `border-b-0 border-r-0` responsive nth-child manipulation is acceptable.
- **Pattern 3b** when the grid needs to feel like a single unit (framed block with rounded corners) and hairline continuity matters.

**Rules:**

- Always use `border-border` / `bg-border` (semantic token). Never raw `border-[#...]`.
- Never use `shadow-sm` or outline-based separation between cards.
- Never use these patterns to separate *sections*. Tonal stacking (see §5) is the only sectioning mechanism.

**Open issue:** Pattern 3b's `overflow-hidden` clips per-cell `RevealOnScroll` `translateY(12px)` entrance animations. Cosmetic glitch during reveal only. Flagged in visual-storytelling audit; acceptable for now.

---

## 4. Numbered rail prefix

**Purpose:** Two-digit ordinal labels on rail items ("01 Safety", "02 Sandbox") that read as structural metadata, not headings.

**Canonical class:** `text-xs font-medium uppercase tabular-nums tracking-eyebrow text-ink-soft`

**Anatomy:**

- Size `text-xs` (12px).
- Weight `font-medium` (500).
- Transform `uppercase`.
- Numerals `tabular-nums` so "01" and "10" align.
- Tracking `tracking-eyebrow` (0.09em) — same as eyebrows.
- Color `text-ink-soft` — tertiary ink (darkened to `#7e786f` in Fix 33 for WCAG AA large-text 3:1+).

**Canonical example:**

```tsx
<span className="text-xs font-medium uppercase tabular-nums tracking-eyebrow text-ink-soft">
  {step.n}
</span>
```

**Where used:**

- §AI Stewardship Sequence 4 step cards
- §Authority rail 3 statements
- §Two-errors 2 items
- §Stakes — not used (H3 serves as the label)

**Rules:**

- Always two-digit padded: `"01"`, `"02"` — never `"1"`, `"2"`.
- Paired with a serif-italic title below (see §6) or occasionally with an Inter H3.
- Don't use primary color. Don't bold. The number is a wayfinding aid, not content.

---

## 5. Tonal rhythm (section alternation)

**Purpose:** DESIGN.md §3.1 specifies tonal stacking as the sectioning mechanism but doesn't articulate *rhythm rules*. This section does.

**Rule:** **Adjacent sections should differ in variant.** The canonical rhythm is alternating `default` / `section`, with `midnight` used sparingly (0–2 bands per page) for authority moments.

**Why:** Concept Modern only has two paper tones (`--background` #faf6ee, `--section` #f2ece0) plus midnight. Without alternation, a page of 5+ default-colored bands in a row visually flattens and loses its sectioning signal.

**Example — post-audit home page rhythm:**

```text
§Hero           default
§Proof strip    default   ← acceptable: compact band, no argument, pairs with hero
§Two-errors     section
§Stakes         default
§Path           section
§Two-intelligences  default
§Writing        default   ← two in a row: acceptable when content shape differs
§Audiences      section
§Foundation     default
§About          default   ← two in a row: founders + statements breaks monotony
§Grounding      section
§Pull quote     midnight  ← authority moment
§Invitation     default + gradient
```

**Rules:**

- Never 4+ default sections in a row. Break with a `section` band.
- Midnight is for authority moments only — book quotes, architectural claims, high-confidence statements. Max 2 per page.
- Compact sections (proof strips, nav bars) may pair with their neighbor without breaking rhythm.
- A section's variant should be chosen based on (a) what tonal contrast it needs and (b) what its neighbors are, not by prop convenience.

**Where enforced:** visual-storytelling audit Fix 30 (§Grounding `default` → `section`) and Fix 31 (§Pull-quote `default` → `midnight`).

---

## 6. Display H3 exception — full-heading serif italic

**Purpose:** The home page has 9 H3s using full-heading `font-serif italic` treatment (not `<em>` emphasis inside an Inter heading). This diverges from DESIGN.md §5 canonical pattern but is consistent within its register.

**Current state:**

```tsx
<h3 className="font-serif text-[clamp(1.35rem,2.1vw,1.65rem)] font-normal italic leading-tight tracking-[-0.005em] text-foreground">
  {title}
</h3>
```

**Where used:**

- §Stakes — 3 H3s ("Move too fast", "Move too slow", "The real challenge")
- §AI Stewardship Sequence — 4 H3s ("Safety", "Sandbox", "Skills", "Solutions")
- §Two-intelligences — 2 H3s ("Informational intelligence", "Relational intelligence")
- §Audiences — 3 H3s ("For nonprofits", "For churches", "For institutions")
- §Writing — 3 H3s (article titles)
- §Foundation — 4 H3s ("Library", "Graph", "Voice", "Pathways")
- §About founders — 3 H3s (founder names)

**Tension:** DESIGN.md §1 says *"Italic serif = emphasis layer only. Wrap stressed words in `<em>` inside display headings."* These H3s bypass that rule by wearing the serif-italic treatment as display styling.

**Current decision (2026-04-18):** Keep the pattern. These are display-size card labels, not body copy. Changing them en masse risks visual drift without a verification pass (design-audit deferred this, typography-polish reaffirmed the deferral).

**If we change later:** Two options —

- **Option A (conservative):** wrap heading contents in `<em>` and delete the inline `font-serif italic tracking-[-0.005em]` classes. Base layer applies Newsreader at 1.04em / -0.01em. Net result: ~4% size bump; canonical markup.
- **Option B (radical):** switch card H3s to plain Inter 500 `tracking-display` (foundation-layer default). Card labels become Inter, serif italic reserved strictly for emphasis inside Inter headings. Visual register shifts.

**Until decided:** the canonical class string `"font-serif text-[clamp(...)] font-normal italic leading-tight tracking-[-0.005em] text-foreground"` IS the card H3 pattern. Reuse it.

**Open question flagged in §14.**

---

## 7. Touch target minimums

**Purpose:** DESIGN.md doesn't specify button height minimums. Responsive-audit flagged a 36px Subscribe button below the 44px WCAG AAA target.

**Rules:**

- **Primary CTA buttons** (shadcn `<Button size="lg">`): 44px+ height. Canonical.
- **Secondary / form buttons:** 36px minimum, 44px preferred. Below 36px should have a wider hit box via padding.
- **Inline hairline links:** 20px+ tap height is acceptable inside body-text reading context per WCAG AA 2.5.5 (24x24 minimum has exceptions for inline content).
- **Card tap targets:** the whole card is clickable via wrapping `<Link>` — generous padding (`p-[clamp(1.5rem,2.6vw,2rem)]`) means the tap area far exceeds minimums.

**Known issue:** Newsletter Subscribe button (`h-9` = 36px) is below the 44px thumb-friendly target. Acceptable per WCAG AA 2.5.5. Flagged for future polish if mobile conversion testing shows impact.

---

## 8. Authority moment (scroll-stop / pull quote)

**Purpose:** A single dramatic mid-page beat that interrupts scanning and shifts the visitor from reading to feeling.

**Two canonical forms on the home page:**

### 8a. Midnight pull quote

Book passage on inverse-surface band. Serif italic display type on cream ink.

**Canonical example (home page §Pull-quote, Fix 31):**

```tsx
<Section variant="midnight" spacing="lg" aria-label="From the book">
  <Container width="narrow">
    <RevealOnScroll>
      <figure className="flex flex-col gap-6">
        <blockquote className="max-w-[28ch] text-balance font-serif text-[clamp(1.9rem,4vw,3rem)] font-normal italic leading-[1.1] tracking-[-0.01em] text-inverse-foreground">
          {passage}
        </blockquote>
        <figcaption className="text-xs font-medium uppercase tracking-eyebrow text-inverse-foreground/60">
          From the book — Chapter {n}
        </figcaption>
      </figure>
    </RevealOnScroll>
  </Container>
</Section>
```

### 8b. System-map diagram (default band)

Visual punctuation via icon grid with motion. Used when the authority moment is about architecture, not quotation. See §12.

**Rules:**

- Max one authority moment per page. Two is already too many — pull-quote + system-map on one page feels over-produced.
- Midnight pull quotes go where the narrative needs an emotional breath before an ask (before §Invitation on the home page).
- System-map diagrams go at the seam between concept and application (between §Audiences and §About on the home page).
- Always cite the source (figcaption with `— Chapter N` or `— From the book`).

---

## 9. Hero aside

**Purpose:** A supporting conviction block in the hero that sits beside the primary headline on desktop, below on mobile.

**Anatomy:**

- Outer `<aside className="max-w-[36ch] border-l-2 border-foreground pl-5 ...">`
- Eyebrow with label (e.g., "A note to leadership")
- 2–4 short `<p>` tags inside a `<div className="space-y-2">`

**Canonical example:**

```tsx
<aside
  className="max-w-[36ch] border-l-2 border-foreground pl-5 text-[1.02rem] leading-relaxed text-muted-foreground"
  aria-label="A note to leadership"
>
  <Eyebrow withDot className="mb-3">A note to leadership</Eyebrow>
  <div className="space-y-2">
    <p>First conviction.</p>
    <p>Second conviction.</p>
    <p>Third conviction.</p>
  </div>
</aside>
```

**Rules:**

- Exactly 2px left border (`border-l-2`) on `border-foreground` (ink). This is the only sanctioned 2px border on the site.
- `pl-5` (20px) left padding after the border. Non-negotiable.
- Max width `36ch` reading measure.
- Label via `<Eyebrow withDot>` — the eyebrow is informational, not decorative.
- Hero aside is the only pattern that uses `border-l-2`. Don't propagate it elsewhere.

---

## 10. Newsletter form inline

**Purpose:** Low-intent capture path in the invitation band, positioned below the primary CTA as a quieter alternative.

**Canonical example:**

```tsx
<RevealOnScroll
  delaySec={0.24}
  className="mt-[clamp(2.25rem,4vw,3rem)] flex max-w-[44ch] flex-col gap-3 border-t border-border pt-[clamp(1.5rem,2.5vw,2rem)]"
>
  <Eyebrow withDot className="mb-0">Or begin quieter</Eyebrow>
  <p className="text-[1.02rem] leading-relaxed text-muted-foreground">
    One note per month on formation, infrastructure, and what we're learning.
  </p>
  <NewsletterForm source="home-invitation" />
</RevealOnScroll>
```

**Rules:**

- Use the shared `NewsletterForm` component (`src/components/forms/newsletter-form.tsx`). Don't inline new form markup.
- Always label with an `<Eyebrow>` — the capture is signaled as an alternative path, not a primary ask.
- `border-t` above separates from primary CTA; respects the "tonal/structural hairline allowed between sibling blocks" rule from DESIGN.md §3.1.
- Pass a meaningful `source` prop so analytics can distinguish home vs. footer vs. book captures.

---

## 11. Logo strip with typographic fallback

**Purpose:** Social proof via partner / affiliation names when real logo assets aren't available yet.

**Canonical example (home page §Proof, Fix 1):**

```tsx
<LogoStrip
  heading="Our co-founders have built and led"
  aria-label="Organizations our co-founders have built and led"
  items={[
    { name: "Forge" },
    { name: "100 Movements" },
    { name: "Movement Leaders Collective" },
    { name: "North American Mission Board" },
  ]}
/>
```

**Primitive:** [src/components/primitives/logo-strip.tsx](../../src/components/primitives/logo-strip.tsx).

**Rules:**

- When an item has no `src`, the primitive renders a typographic pill (`bg-secondary px-4 py-2 text-xs font-semibold tracking-wide text-secondary-foreground`). Acceptable as an interim; swap in real logo SVGs when they're ready.
- Heading copy must be honest about what the strip represents. "Trusted by" is forbidden unless the orgs listed are actual clients. Use framings like "Our co-founders have built and led" or "Movemental came out of the work of" when listing founder affiliations.
- Minimum 4 items, maximum 8. Fewer reads thin; more wraps confusingly.
- Never mix pill fallbacks with real logos in the same strip.

---

## 12. System-map diagram

**Purpose:** Visualize 3–6 concepts that the page names repeatedly but never shows.

**Canonical example (home page §Foundation, Fix 4/21 merged):**

```tsx
<Section id="foundation" variant="default" spacing="lg">
  <Container>
    <Eyebrow withDot className="mb-5">The foundation</Eyebrow>
    <h2 className="max-w-[26ch] text-balance text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.08] tracking-display text-foreground">
      What integration actually produces, underneath the path.
    </h2>
    <div
      className="mt-[clamp(2.5rem,5vw,3.5rem)] grid gap-px overflow-hidden rounded-card bg-border sm:grid-cols-2 lg:grid-cols-4"
      aria-label="The four integration outputs"
    >
      {FOUNDATION_NODES.map((node, i) => (
        <RevealOnScroll key={node.tag} delaySec={0.1 + i * 0.12}>
          <div className="flex h-full flex-col gap-4 bg-card p-[clamp(1.5rem,2.8vw,2.2rem)]">
            <node.Icon className="size-7 shrink-0 text-foreground" strokeWidth={1.25} aria-hidden />
            <div className="flex flex-col gap-2">
              <h3 className="font-serif text-[clamp(1.35rem,2.1vw,1.65rem)] font-normal italic leading-tight tracking-[-0.005em] text-foreground">
                {node.tag}
              </h3>
              <p className="text-[0.98rem] leading-normal text-muted-foreground">
                {node.body}
              </p>
            </div>
          </div>
        </RevealOnScroll>
      ))}
    </div>
  </Container>
</Section>
```

**Rules:**

- Uses the `bg-border gap-px` rail divider pattern (§3b).
- Each node has an icon (`lucide-react`), a title (serif-italic H3 display pattern, §6), and a one-sentence body.
- Icons at `size-7` (28px) with `strokeWidth={1.25}` for editorial thinness.
- Reveal stagger `delaySec={0.1 + i * 0.12}` so nodes appear sequentially (slightly slower than card-grid stagger to feel diagrammatic).
- One per page maximum. Competing with pull quotes dilutes both.

---

## 13. Responsive application rules

**Purpose:** DESIGN.md §4.3 is generic ("mobile-first, respect breakpoints"). This section specifies application-level breakpoint rules derived from the responsive-audit pass.

**Grid breakpoint rules:**

- **2-column grids:** stack on mobile, activate `md:grid-cols-2` at 768px. Avoid `lg:grid-cols-2` (wastes tablet real estate — see Fix 40).
- **3-column grids:** stack on mobile, activate `md:grid-cols-3` at 768px. Avoid `sm:grid-cols-3` (cramped at 640px — see Fix 41).
- **4-column grids:** stack on mobile → 2-col at `sm:` (640px) → 4-col at `lg:` (1024px). See §AI Stewardship Sequence and §Foundation.
- **Custom breakpoints** (`min-[900px]:`) acceptable when content needs specific breathing room not served by standard Tailwind steps. Use sparingly.

**Fluid typography:**

- Display headings use `text-[clamp(Nrem,Nvw,Nrem)]` with minimum ≥ 1.9rem, vw slope 3–6.4, max ≤ 5.5rem.
- Body text uses `text-[Nrem]` (1rem or above). Don't use clamp for body — it confuses line-height computations.
- Eyebrows are fixed at `text-[0.78rem]` (matches `Eyebrow` primitive). Below 12px is the readability floor.

**Container padding:**

- Always via `Container` primitive: `px-4 sm:px-6 lg:px-12`. Don't override at the section level.
- Sections that need tighter/wider reading columns use `<Container width="narrow">` (740px) or `<Container width="reading">` (640px).

**Touch targets:** See §7.

---

## 14. Open questions

These need decisions before certain patterns stabilize:

1. **§6 — Display H3 exception.** Keep full-heading serif italic (current practice), or migrate to `<em>`-wrapped Inter H3 per DESIGN.md §5 canonical? Decision needed before the pattern is promoted to DESIGN.md or refactored out.
2. **§11 — When to swap pill fallbacks for real logo SVGs.** Criteria: aspect-ratio consistency, grayscale-compat, tonal weight. Needs a brand/asset decision.
3. **§7 — Should the shared `NewsletterForm` button height bump to 44px?** Affects home, footer, and any other surface that uses the form. Component-wide change.
4. **§12 — System-map motion.** Current pattern uses per-cell `RevealOnScroll` with stagger. Flagged `overflow-hidden` clipping during reveal (visual-storytelling audit). Acceptable, but a canonical "draw-in" animation via GSAP `ScrollTrigger` would be cleaner.
5. **Hairline link primitive.** `<ArrowLink>` exists but is unused on the home page — migration pending. Should §2's canonical pattern become a primitive?

---

## How to add a new pattern

1. **Does it appear 3+ times?** If not, wait. Single uses belong in the page file, not here.
2. **Is it already a DESIGN.md token or primitive?** If yes, extend DESIGN.md instead.
3. **Extract the canonical class string or component structure.** Must be copy-pasteable.
4. **Cite real usages.** Link to the file(s) and line(s) where the pattern actually ships.
5. **Specify rules.** What's allowed, what's forbidden, what's an open question.
6. **Add to the table of contents.**
7. **If the pattern later graduates** (becomes a primitive or a DESIGN.md rule), update this file: move the specification *out*, keep a short "moved to DESIGN.md §N" note for at least one release cycle.

---

**Last updated:** 2026-04-18 · derived from 41 home-page fixes across 9 audit passes.
