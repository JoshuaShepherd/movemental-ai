# Migration notes — from current repo to a cleaner system

This captures **what exists today**, what is **strong**, what is **inconsistent**, and what to **implement first** in code. It complements [`README.md`](./README.md) and `docs/design/DESIGN.md`.

---

## Keep (canonical — do not regress)

| Area | Evidence | Why |
| ---- | --------- | --- |
| Token ramp + Tailwind bridge | `src/app/globals.css` `:root` + `@theme inline` | Coherent MD3-style surfaces, single shadow, primary discipline |
| Midnight scoping | `[data-variant="midnight"]` in `globals.css` | Headings invert without sprinkling `text-inverse-*` on every line |
| `Section` / `Container` | `src/components/primitives/section.tsx`, `container.tsx` | Correct no-border section model |
| `Display`, `Eyebrow`, `Prose`, `ArrowLink` | `src/components/primitives/*` | Editorial type + accessible CTA row |
| Homepage arc | `src/app/(site)/page.tsx` + `sections/home-*.tsx` | Strong alternation: light → midnight → …; Stitch IDs documented in headers |
| Glass nav | `src/components/nav/site-nav.tsx` | Tokenized blur + container alignment |
| Footer tonal | `src/components/nav/site-footer.tsx` | `bg-section`, no top border |

---

## Normalize (documented target — converge code toward this)

| Issue | Current state | Target |
| ----- | ------------- | ------ |
| Hero wrapper | `HomeHero` uses raw `<section>` not `Section` | Use `Section variant="default" spacing="lg"` **or** document `HeroBand` as the one allowed raw wrapper; still apply same token rules |
| Eyebrow tracking | Primitive default `0.05em`; pills use `0.2em`–`0.25em` | Add `Eyebrow` variant prop (`plain` \| `pillWide`) so magic numbers don’t scatter |
| Marketing radius | Mix of `rounded-2xl`, `rounded-3xl`, `rounded-[2.5rem]` | Standardize: **cards** `rounded-3xl`, **inset midnight panels** `rounded-[2.5rem]`, **chips** `rounded-2xl` or `rounded-full` |
| Primary buttons | `Button` default `rounded-lg`; Services uses `rounded-full` | Decide **per route family** (marketing default vs pill) and document in `components.md` |
| Proof / UI cards | `HomeEvidence` uses `ring-1` on midnight | Keep as **documented exception** for dense chip legibility—do not generalize to light sections |
| `Prose` overrides | Hero / final CTA enlarge and center type | Allowlist patterns in `primitives.md`—avoid new one-offs without audit |

---

## Refactor (improve structure without visual redesign)

| Target | Suggestion |
| ------ | ---------- |
| Repeated pill eyebrows | Extract subcomponent or `Eyebrow` variants (reduces tracking class drift) |
| Connector div | `HomeMechanism` vertical pills → `<Connector />` primitive (`aria-hidden`) |
| Media + grayscale hover | Shared `EditorialImage` or `MediaFrame` for audiences + services hero |
| CTA pair row | Small `HeroCtas` wrapper for flex + gap consistency |

---

## Deprecate / stop doing

| Anti-pattern | Why |
| ------------ | --- |
| `border-t` / `divide-y` between major sections | Violates tonal rhythm model (comments already note Stitch removal) |
| Raw Stitch hex / slate utilities in new TSX | Charter violation |
| `shadow-md` / arbitrary shadows | Breaks single-shadow system |
| Global `.dark` marketing theme | Midnight is local to `Section` |
| shadcn `Card` for every marketing tile | Rings read “UI console,” not editorial ghost cards |

---

## Replace later (known TODOs in code)

| Item | Location | Action |
| ---- | -------- | ------ |
| Placeholder hero / proof images | `HomeHero`, `HomeEvidence`, `HomeAudiences`, Services | Swap to first-party assets + `next/image` domains config |
| Remote `lh3.googleusercontent.com` URLs | `home-audiences.tsx`, `home-evidence.tsx`, `services/page.tsx` | Host on Supabase/Vercel Blob or `/public` |

---

## Page-specific drift watchlist

| Page / file | Note |
| ----------- | ---- |
| `services/page.tsx` | Rich patterns (sticky sidebar, `rounded-full` CTA, primary-tinted eyebrows)—valuable but **busier** than home; audit with checklist section L before copying verbatim to other routes |
| Legal / long-form routes | May use `Prose` heavily—still enforce token colors |

---

## Inconsistencies found (summary)

1. **Hero vs `Section` primitive** — `HomeHero` bypasses `Section` for layout reasons (`-mt-16` on section root).
2. **Eyebrow tracking** — three visual dialects (default tight, pill wide, mechanism extra-wide).
3. **Button radius** — shadcn `rounded-lg` vs marketing `rounded-full` on Services.
4. **Marketing vs UI cards** — tonal `li`/`div` cards vs shadcn `Card` ring treatment (two valid contexts, easy to misuse).
5. **Inset midnight** — `HomeMechanism` nests `inverse-surface` inside `default` section; correct pattern but must not be confused with page-level midnight abuse.

---

## Recommended implementation order (code)

1. **Extract `Eyebrow` variants** (plain / pill / inverted pill) — highest leverage, lowest visual risk.  
2. **Align `HomeHero` with `Section`** or add a thin `HeroSection` wrapper that composes `Section` + underlap props—removes structural special case.  
3. **Add `Connector` + optional `MediaFrame` primitives** after second reuse on another route.  
4. **Button radius decision** — either override shadcn default in `button.tsx` for marketing alignment (requires visual QA) or codify “outline rounded-lg / primary rounded-full” per template in docs only (weaker). Prefer **one marketing default** + documented exceptions.  
5. **Asset pipeline** — replace remote placeholders; wire `images.remotePatterns` if interim CDN remains.

---

## Documentation map

| Concern | Doc |
| ------- | --- |
| Creative charter + Stitch remap table | `docs/design/DESIGN.md` |
| Build / audit chain | `docs/build/design/*` (this folder) |
| Home narrative detail | `docs/build/site-structure/HOME_PAGE.md` |
| Stitch → React workflow | `docs/build/prompts/stitch-to-react-migration.md` |
