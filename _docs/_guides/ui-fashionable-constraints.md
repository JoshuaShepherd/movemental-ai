# UI: Fashionable Constraints & Viable Options

This guide **eliminates the bad, ill-advised, and unfashionable** and states **what remains as clear best-practice options** for templates (e.g. `html/`, `app/templates`). The goal is SaaS- and content-site-appropriate design that would be at home on any modern platform—not avant-garde, but on the right side of current fashion.

**Related guides:** [font-pairings-saas-top-sites.md](./font-pairings-saas-top-sites.md) (font packages), [typography-2026.md](./typography-2026.md) (variant assignments), [color-palettes-2026.md](./color-palettes-2026.md) (variant palettes). **Routes and features:** [_docs/type/12_PUBLIC_SITEMAP_AND_FEATURES.md](../type/12_PUBLIC_SITEMAP_AND_FEATURES.md).

---

## 1. Featured images (by content type)

### 1.1 What to eliminate

- **Inconsistent aspect ratios** across the same content type (e.g. some articles 16:9, some 1:1, some 4:3) — looks uncurated.
- **Wrong ratio for context**: e.g. portrait-only for article cards that are always shown in landscape; extreme letterboxing or cropping.
- **Oversized files** (e.g. multi-MB hero images) — hurts performance and Core Web Vitals.
- **Too small source images** (e.g. &lt; 800px on the long edge for featured cards) — blurry on retina and large viewports.
- **Text-heavy or meme-style thumbnails** for course/video/podcast cards where the platform expects a clear visual (photo or illustration), not a slide.
- **Heavy filters, strong borders, or branded overlays** that differ per item with no system — looks chaotic.
- **Obscure focal area** — key subject cropped out when images are used in multiple crops (e.g. card vs. open-graph).

### 1.2 Viable options (by content type)

Pick **one aspect ratio per content type** and stick to it. Standardize crop and treatment so all images in that type feel part of the same system.

| Content type | Recommended aspect ratio | Min. long edge (px) | Max. file size (guideline) | Notes |
|--------------|--------------------------|----------------------|-----------------------------|--------|
| **Articles** | **16:9** or **3:2** or **4:3** | 1200 | &lt; 200 KB (after optimization) | 16:9 and 3:2 are most common for blog/article cards; 4:3 gives more vertical space and avoids aggressive crop on mobile. Choose one and use everywhere for articles. |
| **Courses** | **16:9** | 1280 | &lt; 250 KB | Industry standard for course cards and learning dashboards. Keep thumbnails image-led; avoid dense text in the art. |
| **Podcasts** | **1:1** (show art) or **16:9** (banner) | 600 (1:1) or 1280 (16:9) | &lt; 150 KB | 1:1 for cards and episode lists; 16:9 only if you use a dedicated banner slot. Prefer consistent treatment (e.g. same border radius, no random overlays). |
| **Videos** | **16:9** | 1280 (e.g. 1920×1080 source) | &lt; 250 KB for thumbnail | Match video frame ratio. Thumbnails should be a clear frame or designed keyframe, not a different ratio stretched/cropped. |

**Treatment rules (all types):**

- **One treatment per type**: e.g. either all cards get the same border-radius and no overlay, or a single overlay style (e.g. subtle gradient at bottom for text). No mix of heavy borders, shadows, and overlays across items.
- **Responsive images**: Serve appropriate widths (e.g. 640w, 1024w, 1280w) via `srcset`; avoid single huge image for all viewports.
- **Alt text**: Every featured image must have meaningful alt text for accessibility; decorative-only images should be marked so or omitted from content flow.

---

## 2. Color palette options & use

### 2.1 What to eliminate

- **Too many competing saturated colors** — more than one primary and one accent (or a small accent set) for key UI (buttons, links, highlights) creates visual noise and looks unprofessional.
- **Color used only decoratively** with no semantic or interactive role — color should support hierarchy, actions, and state (see design systems: Horizon, Atlassian, Stack Overflow).
- **Poor contrast** — text that fails WCAG AA (4.5:1 for normal text, 3:1 for large) is both unfashionable and inaccessible.
- **Pure black (#000) on pure white (#FFF)** for long-form body — harsh; soft neutrals (e.g. #1a1a1a on #fff or #f7f7f7) are the norm.
- **Random accent colors** that don’t relate to a defined palette (e.g. one button blue, another red, another green with no role).
- **No clear “on” colors** for surfaces — e.g. dark surfaces need defined text/icon colors (e.g. on-dark-primary, on-dark-muted).

### 2.2 Viable options

**Palette structure:** Use a **small set of roles**, not a large set of one-off hex values.

| Role | Purpose | Viable approach |
|------|---------|------------------|
| **Primary** | Main brand and primary actions (e.g. primary CTA) | One hue (or a tight range). Use for one primary button style and key links. |
| **Accent** | Secondary emphasis, highlights, or secondary CTAs | One accent (or a small set that are clearly related). Can match primary or complement. |
| **Neutrals** | Backgrounds, borders, body text, secondary text | Gray scale with clear steps (e.g. 50, 100, 200 … 900). Define at least: surface (bg), text primary, text secondary, border. |
| **Semantic** (optional) | Success, warning, error, info | Only if the product needs them (forms, toasts, status). Use muted, consistent variants. |

**Count:** **3–5 main roles** (e.g. primary, accent, neutral scale, plus optional semantic) is the norm for SaaS. See [_docs/_guides/color-palettes-2026.md](./color-palettes-2026.md) for variant-specific palettes.

**Use rules:**

- **Contrast:** All body and UI text must meet WCAG AA (4.5:1 normal, 3:1 large). Check primary and accent against their backgrounds.
- **Surfaces:** Define a small set of surface colors (e.g. default, elevated, overlay) and corresponding “on” colors so every surface has a defined text/icon color.
- **Consistency:** Same role = same use across templates (e.g. “accent” always for this type of button or link, not mixed with “primary”).

---

## 3. Component design

### 3.1 What to eliminate

- **Inconsistent card styles** — some cards with heavy shadows, some flat, some with thick borders — pick one card style per context.
- **Too many border radii** — mixing 4px, 8px, 12px, 16px, 24px, full pill on similar components; use a defined radius scale (e.g. 2–3 values).
- **Overly strong shadows** — heavy multi-layer shadows that feel dated; prefer subtle elevation (e.g. one soft shadow) or flat with border.
- **Glassmorphism or gradient borders everywhere** — use sparingly and only where they’re a clear pattern (e.g. one modal style), not as default for every card.
- **Buttons that don’t look clickable** — no clear primary vs. secondary; similar weight for primary and tertiary actions.
- **Dense, cramped components** — no breathing room; text flush against edges.

### 3.2 Viable options

- **Cards:** One dominant style per context: either **subtle shadow + one radius** (e.g. 8px or 12px) or **border + same radius**. Avoid mixing shadow and strong border on the same card. Keep padding consistent (see spacing below).
- **Border radius scale:** Use **2–3 values** only, e.g. `sm` (4–6px), `md` (8–12px), `lg` (16–24px). Apply consistently (e.g. all cards `md`, all buttons `md` or `lg`).
- **Buttons:** Clear hierarchy: **primary** (filled, accent/primary color), **secondary** (outline or ghost), **tertiary** (text or subtle). One primary per section; avoid multiple competing “primary” buttons.
- **Form controls:** Align with the same radius and focus style (visible focus ring); consistent height and padding across inputs and buttons.

---

## 4. Layout, margins, spacing

### 4.1 What to eliminate

- **Arbitrary spacing** — different margins/padding on similar sections (e.g. 23px, 17px, 31px) with no scale.
- **No grid** — misaligned columns and uneven gutters; content that doesn’t align across sections.
- **Tiny touch targets** — interactive elements below ~44×44px (or 24px min height with adequate padding) on touch devices.
- **Full-bleed content with no max-width** — long lines of text on large screens (hard to read); body content should have a max width (e.g. 65–75ch or 720–960px).

### 4.2 Viable options

- **Spacing scale (4pt base):** Use a **4px-based scale** for margins and padding: e.g. 4, 8, 12, 16, 24, 32, 48, 64, 96. No odd values (e.g. 5, 7, 11) except where required for pixel-perfect alignment to a fixed grid.
- **Section rhythm:** Use **one or two** vertical rhythm values (e.g. 24px between blocks, 48 or 64px between sections) so the page breathes consistently.
- **Content width:** **Max-width for text:** 65–75ch (or ~720–960px) for article/reading content. Wider only for dashboards or data-heavy layouts with clear columns.
- **Margins at viewport edges:** Consistent horizontal margin/gutter at breakpoints (e.g. 16px mobile, 24px tablet, 32px desktop) so content doesn’t touch the viewport edge unpredictably.
- **Grid:** Use a simple column grid (e.g. 12-column) with consistent gutters; align key elements to the grid.

---

## 5. Motion & animation

### 5.1 What to eliminate

- **Long functional animations** — transitions > 400ms for UI feedback (e.g. modals, hovers) feel slow and hurt perceived performance.
- **Animation for its own sake** — decorative motion on every scroll or hover that doesn’t support understanding or feedback.
- **Ignoring reduce-motion** — failing to respect `prefers-reduced-motion: reduce` is an accessibility and inclusivity failure.
- **Too many simultaneous motions** — multiple elements animating at once with no hierarchy; distracting and dated.

### 5.2 Viable options

- **Durations:**  
  - **Small UI feedback (hover, focus, toggle):** 100–150ms.  
  - **Most transitions (buttons, tabs, small panels):** 200–300ms.  
  - **Larger transitions (modals, sheets, page-level):** 300–350ms.  
  - **Avoid** > 400ms for anything the user is waiting on.
- **Easing:** Use **ease-out** or a standard curve (e.g. `cubic-bezier(0.4, 0, 0.2, 1)`) for enter; **ease-in** or similar for exit. Keep consistent across the product.
- **Scope:** Use motion for **state change and feedback** (e.g. open/close, loading, success). Use sparingly for emphasis (e.g. one hero or CTA, not every section).
- **Accessibility:** Honor `prefers-reduced-motion: reduce` (disable or drastically shorten non-essential motion). Avoid motion that could trigger vestibular issues (e.g. large parallax, spinning).

---

## 6. Typography (beyond font choice)

Font **packages** (heading + body) are defined in [_docs/_guides/font-pairings-saas-top-sites.md](./font-pairings-saas-top-sites.md). Here we constrain **scale, weight, and hierarchy**.

### 6.1 What to eliminate

- **More than 2 typefaces** in one template (heading + body, or single face with weights). A third face (e.g. random script or display) without a defined role looks chaotic.
- **Body text below 16px** for main content — 14px is acceptable only for secondary/caption text; 16px is the safe default for body.
- **Line height too tight** — body line height below 1.5 risks failing WCAG text-spacing expectations and hurts readability; 1.5–1.7 is the viable range for body.
- **Flat hierarchy** — similar size and weight for H1, H2, and body so structure is unclear.
- **Overly large hero type** that doesn’t scale down on small screens (e.g. 72px that never reduces).

### 6.2 Viable options

- **Font package:** Choose **one** pairing from the font-pairings guide; do not mix in additional families.
- **Body:** **16px** default; **line height 1.5–1.7**. Minimum 1.5 for body to support accessibility.
- **Scale:** A **modular scale** (e.g. 1.2 or 1.25) for headings so steps are clear: e.g. 16 → 20 → 24 → 30 → 36 → 48 (or similar). Hero H1 in the **48–72px** range (responsive); subtitle **18–24px**.
- **Weights:** **Regular** for body; **Semibold or Bold** for headings and primary labels. Avoid more than two weights in body copy (e.g. regular + bold for emphasis).
- **Responsive type:** Scale down heading sizes on small viewports so hero and H1 don’t dominate; keep body at 16px or switch to 16px below a breakpoint if currently larger.

See [_docs/_guides/typography-2026.md](./typography-2026.md) for the current type scale and variant assignments.

---

## 7. Summary: constraints at a glance

| Area | Eliminate | Viable options |
|------|-----------|----------------|
| **Featured images** | Mixed ratios, huge files, text-heavy thumbnails, inconsistent treatment | One ratio per type (16:9 or 3:2/4:3 articles; 16:9 courses/videos; 1:1 or 16:9 podcasts); one treatment per type; responsive srcset; &lt; 200–250 KB |
| **Color** | Many competing colors, decorative-only use, poor contrast, no roles | 3–5 roles (primary, accent, neutrals, optional semantic); WCAG AA; defined surface + on colors |
| **Components** | Mixed card styles, many radii, heavy shadows, weak button hierarchy | 2–3 radius values; one card style per context; clear primary/secondary/tertiary buttons |
| **Layout & spacing** | Arbitrary spacing, no grid, small touch targets, no max-width | 4pt spacing scale; consistent section rhythm; max-width for text (65–75ch); 44px min touch target |
| **Motion** | &gt; 400ms for UI, decorative overload, no reduce-motion | 100–350ms by scope; ease-out/ease-in; prefer state/feedback; respect prefers-reduced-motion |
| **Typography** | 3+ typefaces, &lt; 16px body, tight line height, flat hierarchy | One font package; 16px body, 1.5–1.7 line height; modular heading scale; 2 weights in body |
| **Flows & content types** | Orphan components, duplicate card styles, flows with no clear end | Necessary components per type (§8): card + detail + listing (+ consumption UI if in-app); one shared grid and one card variant per type |

Use this doc together with the font-pairings, typography-2026, and color-palettes-2026 guides to keep templates within fashionable, best-practice bounds. For which components are required for each flow and content type, see **§8**.

---

## 8. Necessary components by flow and content type

The platform uses a **finite set of content types and user flows**. For each, only certain components are **necessary** to feel complete and on-brand; the rest are optional or contextual. This section constrains what you must have (and what you can skip) so templates don’t over-build or under-build.

**Source of truth for routes and features:** [_docs/type/12_PUBLIC_SITEMAP_AND_FEATURES.md](../type/12_PUBLIC_SITEMAP_AND_FEATURES.md). **UI patterns per feature:** `_docs/ui/<feature>/DESIGN_DIRECTION.md`.

### 8.1 Content types we use

| Content type | Listing route | Detail route | Reading / consumption | MVP status |
|-------------|---------------|--------------|------------------------|------------|
| **Books** | `/books` | `/books/[slug]` | `/books/[slug]/chapters/[chapterSlug]` or read view | Must-have |
| **Articles** | `/articles` | `/articles/[slug]` | In-page (reading layout) | Must-have |
| **Videos** | `/videos` | `/videos/[slug]` | In-page player | Must-have if video exists |
| **Podcasts** | `/podcast` | `/podcast/[slug]`, `/podcast/series/[slug]` | In-page audio player | Optional |
| **Courses** | `/courses` | `/courses/[slug]`, `/courses/[slug]/learn` | Learning UI (modules/lessons) | Must-have if courses exist |
| **Assessments** | `/assessments` | `/assessments/[slug]`, take, results | Take + results views | Optional |

**Writer/content records** (e.g. `write_content`) use types such as `article`, `book`, `talk`, `quote` — these surface in profile and search; the **necessary components** are the same as for the main content type (e.g. article → article card + article detail).

### 8.2 Necessary components by content type

For each content type, **necessary** = required for a complete, fashionable experience. **Optional** = improves UX but not required to ship.

| Content type | Necessary components | Optional components |
|--------------|----------------------|----------------------|
| **Books** | **Book card** (cover, title, author, link); **Book detail page** (description, CTA, optionally table of contents); **Content grid** for listing; **Reading layout** for chapter/read view (if chapters exist) | Reading progress bar, bookmarking, related books, list view |
| **Articles** | **Article card** (image or placeholder, title, excerpt, metadata, link); **Article detail** (title, body, metadata, readable width); **Content grid** for listing | Reading progress bar, related articles, comments, table of contents, FAQ block |
| **Videos** | **Video card** (thumbnail, title, duration/metadata, link); **Video detail** with **video player** and metadata; **Content grid** for listing | Related videos, transcript, chapters in player |
| **Podcasts** | **Episode card** (art, title, date/duration, link); **Episode detail** with **audio player** and metadata; **Content grid** or list for episodes; **Series** grouping if multiple shows | Show art, subscribe CTA, transcript |
| **Courses** | **Course card** (image, title, description or meta, duration/lessons, link); **Course detail** (description, curriculum outline, enrollment CTA); **Content grid** for catalog; **Learning UI** (module/lesson nav, lesson content, progress) if user can enroll | Progress indicators, certificates, quizzes, resource cards, TOC cards |
| **Assessments** | **Assessment card** (title, description, link); **Assessment detail** (intro, CTA to take); **Take flow** (questions, submit); **Results view** (and optional share) | Results sharing, recommendations based on results |

**Rules of thumb:**

- **Every content type that you expose** needs at least: a **card** (for grids/lists), a **detail page** (single-item view), and a **listing** (grid or list). Reading/viewing/learning UIs are necessary only where the content is consumed in-app (books/chapters, articles, video player, audio player, course lessons).
- **One card style per content type** — don’t mix multiple card layouts for the same type (see §3).
- **Search and filters** that span content types should use the same card components and tokens so results feel coherent.

### 8.3 Necessary components by flow

Flows are multi-step or multi-page experiences. **Necessary** = minimum set to complete the flow without dead ends or missing expectations.

| Flow | Necessary components | Optional components |
|------|----------------------|----------------------|
| **Public site** | **Header** (logo, nav, search, account); **Footer** (links, legal); **Homepage** (hero, featured content, CTAs); **Search** (input, results page, result cards) | Mega menu, footer newsletter, breadcrumbs |
| **Reading (article/book)** | **Reading layout** (content area, max-width body); **Prev/next or back** for navigation | Table of contents sidebar, reading progress bar, focus mode |
| **Course discovery → enroll → learn** | **Course catalog** (grid of course cards); **Course detail** (description, outline, enroll CTA); **Learning UI** (module/lesson list, lesson view, continue/next); **Enrollment** (e.g. button or short form that grants access) | Progress dashboard, certificates, discussion, resource downloads |
| **Onboarding** (fit-check, why-movemental, path) | **Single-purpose pages** with clear CTA and minimal form or content; **Progress** (steps or timeline) if multi-step; **Next step** always visible | Branching logic, long-form copy, team/credibility page |
| **Leader / profile** | **Profile header** (avatar, name, bio/tagline); **Content sections** (tabs or sections by type: books, articles, etc.) using same cards as main site; **Links** (e.g. social, site) | Stats, badges, following list, edit profile modal |
| **Account / dashboard** | **Account nav** (sidebar or tabs); **Profile/settings** (form to edit); **Content library** or **dashboard** (list of my content or quick links) | Bookmarks, billing, notifications |
| **Auth** | **Login** and **Sign up** (forms, links to reset); **Post-auth redirect** to dashboard or intended URL | Social login, magic link, remember me |

**Eliminate:**

- Flows that **don’t end somewhere clear** (e.g. course catalog with no detail page, or detail with no way to enroll or read).
- **Duplicate entry points** to the same flow with different component sets (e.g. two different “course card” styles in one product).
- **Orphan components** (e.g. a “related articles” block with no article card or detail defined).

### 8.4 Cross-cutting shared components

These are needed across multiple flows and content types. Use **one** implementation per component type so the product feels consistent.

| Component | Used in | Necessary? |
|-----------|--------|------------|
| **Content grid** | Books, articles, videos, podcasts, courses, search results | Yes — one grid component, configurable per type (card variant, columns). |
| **Content card (per type)** | Listings, search, profile, homepage featured | Yes — one card variant per content type (book, article, video, podcast, course, assessment). |
| **Search bar + results** | Header, search page | Yes. |
| **Header / footer** | Every public page | Yes. |
| **Reading layout** | Articles, book chapters | Yes if you have reading content. |
| **Video player** | Video detail | Yes if you have video. |
| **Audio player** | Podcast episode | Yes if you have podcast. |
| **Modal / sheet** | Enroll, auth, profile edit, confirmations | Yes — one modal/sheet pattern (see §3). |
| **Primary / secondary CTA** | All flows | Yes — same button styles everywhere (§3). |

### 8.5 Summary: minimum viable by scope

- **Content type “on”:** For each content type you enable (books, articles, videos, podcasts, courses, assessments), you need: **card + detail page + listing**. Add **reading/player/learning UI** only if consumption happens in-app.
- **Flow “on”:** For each flow you support (e.g. courses), you need **all steps** from entry to completion (e.g. catalog → detail → enroll → learn) with the **necessary** components above; optional components can come later.
- **Templates (html/, app/templates):** When building or choosing a template for a given content type or flow, ensure it includes the **necessary** components for that type/flow and follows the constraints in §§1–7. Omit or simplify optional components rather than inventing new ones that fall outside the viable options.
