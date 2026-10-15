# Layouts & page composition (L5)

Rules for assembling **routes** from **sections** and **primitives**. Default layout: `src/app/(site)/layout.tsx` (`SiteNav` + `main.pt-16` + `SiteFooter`).

---

## Core sequence

For almost every marketing page:

1. **Optional hero underlap** — first band pulls up with `-mt-16` if it should read behind glass nav.
2. **Stack of `Section` components** — each full bleed; **no** `border-t` between bands.
3. **Footer** — `bg-section` (already separate from `main`).

Inside each `Section`: **`Container`** → content. Avoid second full-bleed wrappers unless for background media.

---

## Surface rhythm patterns

**Allowed alternation (light site):**

| Code | Typical role |
| ---- | ------------ |
| `default` (`background`) | Hero, long read, “air” |
| `section` (`muted`/`section`) | Secondary band, audiences, closing CTA |
| `elevated` | Testimonial strip, inset wells, subtle emphasis |
| `midnight` | Thesis, proof, high-stakes claims |

**Recommended cadence for narrative home:**

`background` → `midnight` → `background` → `section` → `midnight` → `background` → `section`

(See live order in `src/app/(site)/page.tsx`.)

**Fatigue guard:** avoid **three** consecutive `midnight` full-width bands. Insert a light `default` or `section` breather.

---

## Page archetypes

### Narrative marketing (Home, Methodology story)

1. **Promise** — hero: what we do in one sentence + subhead + CTA pair.
2. **Problem / stakes** — often midnight: why this matters now.
3. **Product clarity** — what it is (bento / feature grid).
4. **Audience fit** — who it’s for (cards or list).
5. **Proof** — midnight or elevated: existence, outcomes, logos (when available).
6. **Mechanism** — how it works (steps, connectors).
7. **CTA** — one primary ask on `section` or `elevated`.

**Turning points:** alternate **tone** (midnight) and **density** (sparse hero → denser grid → sparse CTA).

### Service / offer page

- Hero: split or stacked headline + proof-oriented subhead + **one** primary button.
- “You already have…” / pain mirror (`section` or sticky sidebar + long copy).
- “What changes” / transformation (`default` + inset midnight media allowed).
- Deliverables, process, pricing (if public)—each as its own `Section`.
- Closing CTA band mirroring home final CTA rules.

**Reference:** `services/page.tsx`.

### Proof / evidence page

- Lead with **credibility**, not brand slogan.
- Prefer **numbered lists, pull quotes, screenshots** over abstract icons.
- Use midnight sparingly for “evidence vault” moments.

### Audience page

- Start from **their** vocabulary (movement leader vs church).
- Use **media cards** or **split layouts**; avoid anonymous stock people where possible (replace with first-party when assets exist).

---

## CTA placement rules

| Location | Rule |
| -------- | ---- |
| Hero | Primary + one secondary max (`Button` + `Button outline` or `ArrowLink` elsewhere) |
| Mid-page | Prefer `ArrowLink` to deep pages; avoid third full `Button` primary |
| Closing | Single **`Button` primary**; supporting line in `Prose` |

**Global nav CTA** duplicates the primary ask—page-level primary should still read clearly if nav is ignored.

---

## Density rules

- **Max major `Section` bands:** roughly **6–9** per long page before scroll fatigue; merge related ideas.
- **Inside grids:** prefer **more whitespace** over smaller type (`DESIGN.md` breathing rule).
- **Lists:** if more than ~8 items, group into subheads or accordions (future).

---

## Image usage

- **Aspect ratios:** document intended ratio per template (`16/10` audiences, hero media `3/4` on Services).
- **Treatment:** editorial grayscale → color on hover is an approved **Movemental** pattern (see `HomeAudiences`, Services hero).
- **Remote URLs:** Stitch placeholder hosts in code—**replace before launch** (called out in section file comments).
- **`sizes`:** always set for responsive `fill` images.

---

## Responsive behavior

- **Single column default**; break to 2–3 columns at `md:` / `lg:` with consistent gaps (`gap-10`, `gap-12`, `gap-24` at section edges).
- **Nav:** desktop menus vs `MobileNav` sheet—do not duplicate IA differently between them (`nav-links.ts` is single source).

---

## Section arcs (copy-me templates)

Use these as **ordering heuristics**, not rigid law:

1. **Promise → Problem → Product → Audience → Proof → Process → CTA**
2. **Claim → Credibility → Mechanism → Offer → CTA** (shorter landing)
3. **Who → What → How → Proof → CTA** (audience-first campaign page)

Pick one arc per route and **delete sections** that repeat the same job.

---

## Long pages without fatigue

- Insert a **tonal downshift** (`midnight` or `elevated`) after a dense grid.
- Use **sticky narrative** sidebars only when the opposite column is long (Services pattern)—otherwise skip sticky.
- End with **low visual noise** before footer: centered `Display` + short `Prose` + one button.

---

## Layout implementation references

| Concern | File |
| ------- | ---- |
| Nav offset | `src/app/(site)/layout.tsx` |
| Container / section tokens | `src/components/primitives/container.tsx`, `section.tsx` |
| Home composition | `src/app/(site)/page.tsx` |
