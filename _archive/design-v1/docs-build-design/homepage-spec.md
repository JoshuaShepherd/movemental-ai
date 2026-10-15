# Homepage — system build spec

**Route:** `src/app/(site)/page.tsx`  
**Sections (in order):** `HomeHero`, `HomePhilosophy`, `HomeBento`, `HomeAudiences`, `HomeEvidence`, `HomeMechanism`, `HomeFinalCta`  
**Stitch reference:** screen `74fd3a85b59c48c78b3f655547ad8e08` (“Movemental Landing Page - Refined Centered Hero”), project `2208910962065880866` (see `docs/build/stitch-project.md`).

This spec is **binding for rebuilds and audits**. Narrative walkthrough with copy tables: `docs/build/site-structure/HOME_PAGE.md`.

---

## Global constraints

| Item | Rule |
| ---- | ---- |
| Nav clearance | `(site)/layout.tsx`: `main` has `pt-16`. First section may use `-mt-16` to underlap nav. |
| Outer rail | All sections use `Container` for primary content (`--container-max`). |
| Separators | None between bands—tonal `Section` variants only. |
| Primary CTA phrase | “Start a Conversation” → `/contact` |
| Secondary CTA (hero) | “See How It Works” → `/methodology` |

---

## §0 — `HomeHero`

| Field | Spec |
| ----- | ---- |
| **Purpose** | State category + transformation promise; offer primary/secondary paths. |
| **Wrapper** | Native `<section>` with `-mt-16 overflow-hidden bg-background` (see migration notes for `Section` alignment). |
| **Surface** | `background` |
| **Vertical spacing** | `Container`: `pt-32 pb-32 sm:pt-40 lg:pt-48 lg:pb-40` (hero landmark, taller than `Section spacing="lg"` alone). |
| **Layout** | Column, centered; `Display` `max-w-4xl`; supporting `Prose` `max-w-3xl`. |
| **Eyebrow** | Pill: `rounded-full bg-card px-4 py-1.5 tracking-[0.2em] shadow-ambient` on `Eyebrow`. |
| **Headline** | `Display` `size="lg"` — single sentence value prop. |
| **Subhead** | `Prose` with overrides: `text-center text-xl font-light leading-relaxed sm:text-2xl`. |
| **CTAs** | Row: `flex-col gap-5 sm:flex-row`; both `Button size="lg"` `h-14 px-10 text-base`; primary `default`, secondary `outline`. |
| **Interaction** | Standard button + link hover; no scroll effects. |
| **Mobile** | Stack CTAs; maintain tap sizes. |
| **Desktop** | Center rail; future hero image must respect under-nav crop. |
| **Must accomplish before §1** | Visitor knows **what** Movemental is in category terms and **what to do next**. |
| **Visual intent** | Airy, magazine cover; eyebrow pill floats slightly (`shadow-ambient`). |
| **Optional / TODO** | Grayscale abstract hero asset behind copy (not yet in code). |

---

## §1 — `HomePhilosophy`

| Field | Spec |
| ----- | ---- |
| **Purpose** | Frame AI as adaptive challenge; state philosophical stance + product thesis. |
| **Pattern** | `Section variant="midnight" spacing="lg"` + `Container`. |
| **Surface** | `midnight` |
| **Layout** | Left-aligned block `max-w-4xl`. |
| **Type** | `Display size="md" as="h2"`; body paragraphs large, light (`font-light`), `text-inverse-foreground/80` etc. |
| **Accent** | Pull-quote column: `w-1 rounded-full bg-inverse-foreground/20` — **intra-section** accent, not a page divider. |
| **Interaction** | None. |
| **Mobile** | Reduce `pl-*` on quoted block if cramped; keep readable line length. |
| **Must accomplish before §2** | Visitor feels **stakes + seriousness**; brand is not chasing hype. |
| **Visual intent** | First gravity well after light hero. |

---

## §2 — `HomeBento`

| Field | Spec |
| ----- | ---- |
| **Purpose** | Decompose “system” into four concrete capabilities. |
| **Pattern** | `Section variant="default" spacing="lg"`. |
| **Surface** | `background` band; cards `bg-section` → hover `bg-card`. |
| **Intro** | Centered `max-w-3xl`: `Display sm` + `Prose` (`text-xl font-light`). |
| **Grid** | `grid-cols-1 md:grid-cols-2 gap-10`; cards `rounded-3xl p-8 md:p-12`. |
| **Icon well** | `rounded-2xl bg-card` → group-hover inverts to `bg-foreground` / `text-inverse-foreground` on icon. |
| **Card title** | `text-2xl font-bold tracking-tight text-foreground`. |
| **Card body** | `text-lg font-light text-muted-foreground`. |
| **Footer rhythm** | Dot-separated line: `rounded-full bg-elevated` bullets; last phrase `font-bold text-foreground`. |
| **Motion** | `duration-500` on hovers. |
| **Must accomplish before §3** | Visitor understands **components of the system**, not vague consulting. |

---

## §3 — `HomeAudiences`

| Field | Spec |
| ----- | ---- |
| **Purpose** | Self-segmentation by audience with deep links. |
| **Pattern** | `Section variant="section" spacing="lg"`. |
| **Surface** | `section` |
| **Header** | `Display sm` centered `mb-24`. |
| **Grid** | `gap-12 lg:grid-cols-3`. |
| **Card** | `rounded-3xl bg-card overflow-hidden`; hover `shadow-ambient`. |
| **Media** | `aspect-[16/10]`; `object-cover`; grayscale → color + slight zoom on hover. |
| **CTA** | `ArrowLink tone="foreground"` per card. |
| **Must accomplish before §4** | Visitor finds **their** door. |
| **TODO** | Replace remote placeholder images with first-party photography. |

---

## §4 — `HomeEvidence`

| Field | Spec |
| ----- | ---- |
| **Purpose** | Prove the system is real today; show density of what was built. |
| **Pattern** | `Section variant="midnight" spacing="lg"`. |
| **Surface** | `midnight` |
| **Layout** | `lg:grid-cols-2 gap-24`; text column `min-w-0`. |
| **Proof grid** | `md:grid-cols-2` chips: `rounded-2xl bg-inverse-foreground/5 ring-1 ring-inverse-foreground/10` + `CheckCircle2`. |
| **Screenshot** | `rounded-3xl shadow-ambient`; bottom gradient overlay `from-inverse-surface`. |
| **Closing line** | Bold statement block separate from chips (`mt-16 pt-12`). |
| **Must accomplish before §5** | Skepticism reduced—“already working,” not vapor. |
| **TODO** | First-party product screenshot. |

---

## §5 — `HomeMechanism`

| Field | Spec |
| ----- | ---- |
| **Purpose** | Explain the pipeline from raw content → system → outcomes. |
| **Pattern** | `Section variant="default" spacing="lg"`; inner content `max-w-5xl`. |
| **Surface** | Mostly `background`; **inset** `inverse-surface` for level 02 grid + one level 03 card. |
| **Connectors** | Centered `h-16 w-1 rounded-full bg-elevated` between levels (`aria-hidden`). |
| **Eyebrows** | Pills with varying backgrounds (`bg-card`, `bg-foreground text-inverse-foreground`) + wide tracking. |
| **Level rows** | Responsive grids; level 03 split cards `rounded-[2.5rem]`. |
| **Closing** | `Display md` with muted span for second clause. |
| **Must accomplish before §6** | Visitor understands **flow**, not just parts. |

---

## §6 — `HomeFinalCta`

| Field | Spec |
| ----- | ---- |
| **Purpose** | Single conversion moment after narrative. |
| **Pattern** | `Section variant="section" spacing="lg"`. |
| **Surface** | `section` |
| **Layout** | `Container max-w-4xl` centered. |
| **Type** | `Display lg as="h2"`; `Prose` `text-xl sm:text-2xl font-light` centered. |
| **CTA** | One `Button lg` `h-16 px-12 text-lg` primary. |
| **Must accomplish before footer** | Visitor knows **exactly one** action to take next. |

---

## Quality bar

Shipped homepage must pass [`page-audit-checklist.md`](./page-audit-checklist.md) with **no Fix** items in sections A–G.
