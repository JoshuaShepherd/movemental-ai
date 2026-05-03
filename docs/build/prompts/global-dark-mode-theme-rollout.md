# Global dark mode — palette, documentation, and site-wide rollout

Standalone **implementation plan** for **user-chosen light / dark** with the same semantic model and brand DNA as the original light tokens. **Shipped:** [`docs/design/DESIGN.md`](../../design/DESIGN.md) §3.7–§3.9, `src/app/globals.css` `.dark` ramp, `ThemeProvider` + nav **sun/moon** toggle. Use this doc for audits, static HTML parity, and follow-ups.

**Prepend to any agent run:** read [`docs/design/DESIGN.md`](../../design/DESIGN.md) §2–§3 and [`docs/build/prompts/stitch-to-react-migration.md`](./stitch-to-react-migration.md) §7 (token remaps). Implementation truth for runtime colors remains `src/app/globals.css`.

---

## 1. Goals

| Goal | Success criteria |
| ---- | ---------------- |
| **Palette continuity** | Dark theme is not a separate “neon SaaS” skin; it reads as the **same system** inverted—deep ink surfaces, the same primary blue family (`#0053db` / `#0048c1`), warm grays (not pure black), tonal stacking without decorative section borders. |
| **Single semantic API** | Pages keep using `bg-background`, `text-foreground`, `bg-card`, `text-muted-foreground`, etc.; **no** new parallel utility namespace. Only `:root` vs `.dark` (or equivalent) changes underlying CSS variables. |
| **Documented** | `DESIGN.md` gains an explicit **global dark ramp** table, contrast notes, and rules for **Midnight sections + global dark** so authors never guess. |
| **Chrome control** | Users can switch theme; preference **persists** across visits; optional **system** sync; **no long flash** of wrong theme on load. |
| **Nav affordance** | **Sun / moon** (or moon / sun per convention) toggle in **desktop** header and **mobile** shell (see §6). |

---

## 2. Non-goals (for v1)

- Redesigning Stitch screens or swapping marketing photography for dark-specific assets (track as follow-up if contrast fails).
- Dark mode for every **`docs/html`** standalone file in one pass (optional wave; see §9).
- Per-route theme (one global preference is enough).

---

## 3. Palette strategy — “same palette, inverted ramp”

### 3.1 Design method

1. **Anchor** the existing light ramp in [`src/app/globals.css`](../../../src/app/globals.css) `:root` (already matches DESIGN.md §3.1–3.2).
2. **Derive** a dark ramp by role, not by blindly inverting hex:
   - **Background / section / card / elevated / surface-highest** should read as a **four-step tonal stack** on a near-midnight base (same spirit as light’s ghost lift), using **blue-gray warmth** aligned with `--inverse-surface` (`#101820`), not `#000000`.
   - **Foreground / muted-foreground** mirror light roles: body ink slightly off-white; muted ink for secondary text (WCAG AA on each surface tier used for text).
   - **Primary** stays the brand blue for CTAs; validate **focus rings** and **primary on dark elevated** surfaces.
   - **Border / ring / input / popover / destructive** each get dark-scoped values; keep **outline_variant-style** borders as low-contrast separators (forms exception per DESIGN.md).
3. **`--shadow-ambient`**: reduce or retint opacity in dark mode so cards do not carry a “light UI” gray halo (update both `@theme inline` companion if you duplicate shadow at parse time, and/or use a CSS variable for shadow consumed in components).

### 3.2 Midnight (`Section variant="midnight"`) vs global dark

Today, Midnight is **regional** inverse (`--inverse-surface` / `--inverse-foreground`). With global dark enabled, **choose one documented behavior** and implement consistently:

| Option | Behavior | Recommendation |
| ------ | -------- | ---------------- |
| **A — Midnight unchanged** | Regional bands still use `inverse-*` tokens; they may sit **one step brighter** than page background in dark mode. | Lowest risk; minimal section refactors. |
| **B — Midnight deepens** | In `.dark`, redefine `--inverse-surface` / `--inverse-foreground` (or band-only overrides via `[data-variant="midnight"]` under `.dark`) so Midnight remains **clearly distinct** from `bg-background`. | Best editorial drama; requires design pass and contrast checks. |

Pick **A or B in DESIGN.md** before large-scale QA.

### 3.3 `color-scheme`

- **`html`**: `color-scheme: light` in light mode; `color-scheme: dark` when `.dark` is present (matches DESIGN.md §3.6 intent, but at **root** when product ships global dark).
- Ensure native form controls, scrollbars, and iOS Safari UI chrome feel intentional.

---

## 4. Documentation deliverables (`docs/design`)

### 4.1 `DESIGN.md` updates (required)

1. **Revise §1.3 non-goals** — Replace “no global dark theme” with: global dark is **optional user preference**; default remains light for first visit unless system sync is on.
2. **Revise §3.7** — State that **`.dark` on `<html>`** is allowed for the marketing product when the parallel ramp is defined; keep the checklist (now **done** items): full ramp, WCAG, `color-scheme`, Midnight interaction, coordinated `globals.css` + primitives + this doc.
3. **Add §3.x “Global dark ramp”** — Table mirroring §3.1: semantic name, CSS variable, Tailwind utility, **hex (dark theme)**. Include **inverse** / Midnight tokens if they change under `.dark`.
4. **Add §3.x “Theme preference”** — Persistence (cookie vs `localStorage`), SSR + hydration constraints, respect for `prefers-reduced-motion` (unchanged), and **no theme jank** policy.
5. **Cross-links** — Point to this build prompt and `globals.css`; update document map table if section numbers shift.

### 4.2 Optional

- [`docs/design/STATIC_HTML_AND_TEMPLATES.md`](../../design/STATIC_HTML_AND_TEMPLATES.md) — Note that static templates may stay light-only until `site-theme.css` gains a `.dark` mirror.
- [`CLAUDE.md`](../../../CLAUDE.md) — Update the “Light-primary, not dark” one-liner to match shipped behavior so agents do not fight the product.

---

## 5. Engineering — tokens (`src/app/globals.css`)

1. **Keep** existing `:root { ... }` as the **light** canonical values.
2. **Add** a second block, e.g. `.dark { ... }`, assigning **every** consumer variable used by `@theme inline` (same keys as `:root` for colors, radius if unchanged, shadow token if variable-driven).
3. **Preserve** `@theme inline` mapping **to** `var(--background)` etc. — do **not** duplicate theme keys for light/dark in `@theme` unless you adopt a different Tailwind v4 pattern; the industry-standard approach is **toggle CSS variables** on `html.dark`.
4. **Custom variant** — Already present:

   ```css
   @custom-variant dark (&:is(.dark *));
   ```

   Confirm `tailwind.config.ts` remains `darkMode: "class"` so shadcn `dark:` utilities resolve when `html` has `class="dark"`.

5. **Base layer** — Move or duplicate `html { color-scheme: ... }` so it keys off `.dark` (attribute selector on `html` or `:root.dark`).

6. **Selection** — Ensure `::selection` remains legible on dark backgrounds.

---

## 6. Engineering — React / Next.js shell

### 6.1 Where the class lives

- Apply **`dark` class on `<html>`** (not `body` only) so `dark:` variants and `:is(.dark *)` behave predictably.
- `src/app/layout.tsx` currently sets `className` on `<html>` for the Inter variable; merge with theme class **without** dropping `suppressHydrationWarning` if using client hydration for theme.

### 6.2 Theme provider

- Add a small **client** `ThemeProvider` (e.g. [`next-themes`](https://github.com/pacocoursey/next-themes) — verify compatibility with **Next.js 16** / React 19 before pinning) **inside** existing [`src/app/providers.tsx`](../../../src/app/providers.tsx), or wrap only `(site)` layout if you intentionally exclude other route groups (default: **root** for consistency).
- Recommended props: `attribute="class"`, `defaultTheme="system"`, `enableSystem`, storage key namespaced (`theme` → `movemental-theme` or similar).
- **FOUC / flash**: use the library’s **blocking script** pattern or inline `script` before paint to set `class` on `html` from `localStorage` / system preference before React hydrates.

### 6.3 Toggle UI — sun / moon in nav

| Surface | Placement |
| ------- | --------- |
| **Desktop** | `SiteNav`: new control in the **right cluster** (before or after secondary link + primary CTA), `md:flex`, icon-only button with **`aria-label`** that reflects action (“Switch to dark mode” / “Switch to light mode”). Use **`lucide-react`** (`Sun`, `Moon`) per repo icon rules. |
| **Mobile** | Either: (1) **next to** `MobileNav` hamburger in the header row, or (2) inside **Sheet** footer — prefer **header row** so theme is reachable without opening the menu. Match tap target size (44px) and focus ring tokens. |

Implementation detail: use `resolvedTheme` / `setTheme` from the provider; avoid hydration mismatch by rendering a **placeholder** or `suppressHydrationWarning` on the button label if needed.

### 6.4 Components to smoke-test early

- **Glass nav**: `bg-card/80 backdrop-blur-xl` must still read as glass on dark surfaces.
- **Midnight sections**: `Section` + `[data-variant="midnight"]` base styles in `globals.css`.
- **Marketing heroes** with photos: check overlays and text contrast.
- **shadcn** components already carrying `dark:` branches ([`button`](../../../src/components/ui/button.tsx), [`input`](../../../src/components/ui/input.tsx), etc.) — once `html.dark` exists, verify they look **on-brand**, not generic; trim or adjust `dark:` overrides if they fight Movemental tokens.

---

## 7. Site-wide audit checklist

Run after tokens land:

1. **Grep** `src/` for raw hex, `bg-white`, `bg-black`, `text-gray-*`, `border-gray-*` — migrate to semantic tokens per DESIGN.md.
2. **Hardcoded `text-white`** on Midnight → already should be `text-inverse-foreground`; re-scan for light-only assumptions.
3. **Images / logos** — SVG or PNG marks may need **currentColor** or a dark variant.
4. **Third-party** embeds (if any) — document exclusions.
5. **Focus visible** — keyboard tab through nav, forms, dialogs in both themes.

Automate what you can: extend ESLint / existing `tailwind-cleanup` skill workflows if patterns recur.

---

## 8. Validation

| Check | Command / method |
| ----- | ------------------ |
| Types | `pnpm typecheck` |
| Lint | `pnpm lint` |
| Build | `pnpm build` |
| Contrast | Manual + optional tooling (axe, WebAIM) on home, `/contact`, a Midnight-heavy page |
| E2E | Playwright: assert `html` class toggles, persisted preference, and a representative page screenshot in both themes |

---

## 9. Static HTML parity (deferred wave)

If org needs **docs/html** previews to match production:

1. Duplicate dark variables into [`docs/html/site-templates/site-theme.css`](../../html/site-templates/site-theme.css) under `.dark` on `html`.
2. Add a tiny script or manual toggle for preview only.
3. Sync numeric parity notes in [`STATIC_HTML_AND_TEMPLATES.md`](../../design/STATIC_HTML_AND_TEMPLATES.md).

---

## 10. Suggested rollout order

1. **Design tokens only** — `.dark` block in `globals.css` + DESIGN.md tables (review in browser with temporary manual `html` class).
2. **Theme plumbing** — Provider + FOUC script + `color-scheme`.
3. **Nav toggle** — Desktop + mobile; keyboard + screen reader labels.
4. **Midnight decision** — Implement option A or B; update `Section` / base layer if needed.
5. **Site-wide pass** — Grep fixes, shadcn visual pass, imagery.
6. **Docs + CLAUDE** — Align agent guardrails with shipped behavior.
7. **Tests** — E2E + visual spot-check list.

---

## 11. Related files (starting point)

| Area | Path |
| ---- | ---- |
| Tokens + base | `src/app/globals.css` |
| Root shell | `src/app/layout.tsx`, `src/app/providers.tsx` |
| Nav | `src/components/nav/site-nav.tsx`, `src/components/nav/mobile-nav.tsx` |
| Tailwind dark mode | `tailwind.config.ts` |
| Charter | `docs/design/DESIGN.md` |
| Section inverse | `src/components/primitives/section.tsx` (verify `data-variant` / `midnight` mapping) |

---

## 12. PR expectations

- Single coordinated PR or **stacked** PRs: (1) tokens + docs, (2) provider + nav. Avoid merging **nav toggle** without **working `.dark` variables** or the UI will look broken.
- PR description should cite **DESIGN.md section** updates and the **Midnight** decision (A vs B).
