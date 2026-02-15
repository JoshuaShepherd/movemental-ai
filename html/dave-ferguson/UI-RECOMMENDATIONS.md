# Dave Ferguson HTML — UI Recommendations for Integration & Refinement

**Scope:** All pages under `html/dave-ferguson/` (index, about, books, speaking, contact, blog, newsletter, content, themes, theme-*, courses, course-hero-maker, reader, article-leadership-multiplication, privacy).  
**Purpose:** Unify navigation/footer, typography, meta, and patterns so the mock-up feels like one coherent platform.

---

## 1. Navigation & Shell

### 1.1 Two nav patterns (critical)

- **Home (`index.html`):** Uses `e-nav--home` — gray bar (#a09c96), stacked text logo (“DAVE” / “FERGUSON”), **dropdown “MORE”** (Content, Themes, Courses, Newsletter, Speaking, Blog), **no CTA button**, **Contact** → `#connect`, social icons in nav.
- **All other pages:** Standard `e-nav` — transparent then light on scroll, **image logo** (`logo.webp`), **full flat link list** (HOME, BOOKS, ABOUT, BLOG, NEWSLETTER, SPEAKING, CONTENT, THEMES, COURSES, CONTACT), no dropdown, no CTA, **no social icons** in nav, Contact → `index.html#connect`.

**Recommendation:**

- **Option A (unify to one nav):** Use the **same nav structure** everywhere: image logo, same link set, and either (1) add the dropdown “MORE” to inner pages to reduce clutter, or (2) keep the full list everywhere and add it to home for consistency. Prefer one canonical nav markup (e.g. a shared fragment or template) so order and labels are identical.
- **Option B (keep two, document):** If home is intentionally “marketing” and inner pages “content,” keep both but (1) ensure **footer** is consistent (see below), and (2) add a **Privacy** link in nav on all pages (currently only in footer). Privacy is linked from footer but not nav; add “Privacy” to nav (e.g. last item or in a “More”/dropdown) for legal discoverability.

**Contact destination:** Nav currently points to `index.html#connect`. A dedicated **Contact** page exists (`contact.html`). Recommend: **Use `contact.html`** as the nav “Contact” link on all pages so contact has its own URL and doesn’t depend on home. Update home’s in-page “Get in touch” / “Let’s Connect” to also link to `contact.html` where appropriate.

---

### 1.2 Footer (two variants)

- **Home:** `e-home-footer` — dark (#1a1a1a), copy + “COMMUNITY OF HOPE MOVEMENT” / “EXPONENTIAL” + social. No “move**mental**” wordmark; no footer nav links.
- **All other pages:** `e-footer` — light, move**mental** logo, full link list (Home, Content, Themes, Courses, Books, Blog, About, Speaking, Contact, Privacy), tagline “A credibility ecology for movement leaders.”

**Recommendation:**

- **Unify footer content** across the site: same link set and order on every page (including home). Decide whether the **visual** style is (1) always light `e-footer`, or (2) always dark `e-home-footer`, or (3) home dark / inner pages light as a deliberate contrast. If (3), ensure link list and tagline are still present on home (e.g. add footer links to `e-home-footer` so users don’t lose navigation when they leave home).
- Add **Privacy** to the nav (see above) so it’s available in both nav and footer.

---

### 1.3 Mobile nav

- Home’s `e-nav--home.menu-open` shows dropdown + social; inner pages’ `.e-nav.menu-open` show only `.e-nav__links` (and `.e-nav__social` when present — but inner pages don’t have `.e-nav__social` in the DOM). So on mobile, inner pages don’t show social.
- **Recommendation:** If social is desired site-wide, add the same social block to the inner-page nav and ensure CSS shows it in the mobile menu. Otherwise, remove it from home for consistency.

---

## 2. Typography & Font Loading

### 2.1 Inconsistent Google Fonts URLs

- **Full set (e.g. index, about, books, speaking, contact, newsletter, privacy):**  
  `Karla:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Newsreader:ital,opsz,wght@0,12..72,400;0,12..72,500;0,12..72,600;1,12..72,400`
- **Blog, content, article:**  
  `Karla:wght@300;400;500;600;700` (no italic) and `Newsreader:ital,wght@0,300;0,400;...` (includes 300).
- **Themes:**  
  `Karla:wght@400;600;700` and `Newsreader:ital,wght@0,400;0,600;1,400` (subset).
- **Theme-leadership:** Same subset as themes.
- **Courses / course-hero-maker:**  
  `Karla:ital,wght@0,400;0,600;0,700;1,400` and `Newsreader:ital,wght@0,400;0,600;1,400` (no 500 for Newsreader).
- **Reader:**  
  `Newsreader:ital,opsz,wght@0,6..72,...` (smaller opsz range).

**Recommendation:**

- **Single canonical font URL** for the Dave Ferguson editorial theme. Suggested (matches index/about/books):  
  `Karla:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Newsreader:ital,opsz,wght@0,12..72,400;0,12..72,500;0,12..72,600;1,12..72,400`
- Use this in **every** page `<head>` so type renders identically and we avoid FOUT between pages. Remove 300 if not used in CSS; keep one URL per environment (e.g. one for editorial).

---

### 2.2 Alignment with project typography

- `_docs/_guides/typography-2026.md` defines a type scale and tokens for the Next.js app (e.g. `--mvmt-font-heading`, `font-mvmt-heading`). The HTML mock-up uses its own tokens (`--e-font-display`, `--e-font-body`) and Newsreader + Karla.
- **Recommendation:** For the **static HTML** mock-up, keep Newsreader + Karla as the editorial choice; no change required. When/if these pages are ported into the Next.js app, map `--e-font-display` → `--mvmt-font-heading` (e.g. Playfair or Lora if you adopt a serif variant) and `--e-font-body` → `--mvmt-font-body` so the design system stays consistent.

---

## 3. Meta & SEO

- **Missing `<meta name="description">`** on: `blog.html`, `themes.html`, `content.html`, `article-leadership-multiplication.html`.
- **Recommendation:** Add a unique, concise description (1–2 sentences) on every page. Reuse the kind of copy used on about, books, speaking, contact, newsletter, privacy. This improves consistency and sharing/search snippets.

---

## 4. Page-Level Consistency

### 4.1 Hero patterns

- **Centered hero (e-hero):** about, books, speaking, contact, privacy, themes, courses, content, newsletter (different section class).
- **Full-bleed image hero:** index (e-home-hero), theme-* (e-theme-hero), blog (e-blog-hero), article (e-article-hero), course-hero-maker (e-course-hero).
- **Recommendation:** No structural change needed. Ensure **eyebrow + title + subtitle** are present where the design calls for it (e.g. privacy has no subtitle — optional). For newsletter, the hero is already distinct (e-newsletter-hero); keep as is.

### 4.2 Section numbering

- Numbered sections use either `e-section-num` + `e-container--with-num` or `e-section__num` / `e-section__number` + `e-section__inner`. CSS supports both.
- **Recommendation:** Pick one pattern (e.g. `e-section__num` + `e-section__inner`) and use it site-wide for numbered sections to avoid confusion and future style drift. Document in PROMPT.md or a small “Components” section in this doc.

### 4.3 CTA sections

- Most inner pages end with `e-cta` (dark strip) + one or two buttons. Index uses `e-home-thanks` and `e-home-connect` instead.
- **Recommendation:** Keep as is. Ensure every inner page has at least one clear next step (e.g. “Get in touch” or “Explore speaking”) that links to `contact.html` or the relevant page.

---

## 5. Components & CSS

### 5.1 Course detail (course-hero-maker.html)

- Uses `.e-course-instructor`, `.e-course-instructor__img`, `.e-course-instructor__name`, `.e-course-instructor__role`, and `.e-course-main` / `.e-course-stats`. The shared CSS defines `.e-course-sidebar__photo`, `.e-course-sidebar__card`, etc., but not `.e-course-instructor`.
- **Recommendation:** Either (1) add `.e-course-instructor` (and modifiers) to `dave-ferguson-editorial.css`, or (2) change the course-hero-maker markup to use the existing sidebar classes (e.g. `e-course-sidebar__card` and a small photo block) so one set of styles covers both.

### 5.2 Content hub (content.html)

- Tab filter (All, Articles, Books, etc.) and `.e-hub-indicator` require JS to move the indicator and toggle `.hidden` on cards. Verify the script is present and that the indicator position is computed correctly for “All” and when switching tabs.
- **Recommendation:** If not already done, add a small script that (1) on tab click, sets `active` on the button and moves the indicator, and (2) filters `.e-hub-card` by `data-type` and toggles `hidden` so layout doesn’t jump (e.g. min-height or placeholder).

### 5.3 Reader (reader.html)

- No global nav/footer; it’s a dedicated app-like layout. “Back” goes to `books.html`. Good for immersion.
- **Recommendation:** Keep. Ensure “Back” and any “Home” or “Books” links are consistent (e.g. always “← Books” to `books.html`). If you add more books, ensure `reader.html` handles `?book=...` for all slugs.

---

## 6. Accessibility & UX

- **Focus states:** Buttons and inputs use `:focus` (e.g. border-color accent/red). Ensure visible focus ring on all interactive elements (especially nav, dropdown, tabs, form controls).
- **Nav dropdown:** Use `aria-expanded` and `aria-hidden` (home already does). Ensure Escape closes the dropdown and focus is trapped or returned sensibly.
- **Reading progress bar:** `e-read-progress` is `aria-hidden="true"`; good. Keep it decorative.
- **Recommendation:** Run a quick pass with keyboard-only and a screen reader (e.g. NVDA/VoiceOver) on nav, contact form, content hub tabs, and reader controls. Add `aria-current="page"` on the active nav link if you don’t already.

---

## 7. Asset Paths & Performance

- Images use `../../public/...` (e.g. `../../public/dave-ferguson/logo.webp`, `../../public/media-library/images/headshots/dave-ferguson.webp`). Correct for repo structure.
- **Recommendation:** When moving to a deployed app, replace with public URLs or Next.js asset paths. For static hosting, ensure `public` is the document root or paths are rewritten. No change needed inside `html/` for the mock-up.

---

## 8. Summary Checklist

| Area | Action |
|------|--------|
| **Nav** | Unify structure (link set + order) across home and inner pages; or document the two variants and add Privacy to nav. |
| **Contact** | Use `contact.html` as the main “Contact” link in nav and in CTAs (instead of `index.html#connect` only). |
| **Footer** | Same link set (and optionally same style) on all pages, including home. |
| **Fonts** | One canonical Google Fonts URL for Karla + Newsreader; use on every page. |
| **Meta** | Add `<meta name="description">` to blog, themes, content, article-leadership-multiplication. |
| **Section pattern** | Standardize on one numbered-section pattern (e.g. `e-section__num` + `e-section__inner`) and reuse. |
| **Course detail** | Add `.e-course-instructor` styles or refactor to use existing sidebar classes. |
| **Content hub** | Confirm tab + filter JS and indicator position work. |
| **A11y** | Focus and ARIA check on nav, dropdown, forms, tabs. |

---

## 9. Suggested implementation order

1. **Canonical font URL** — one change per page, low risk.  
2. **Meta descriptions** — add to the four pages that lack them.  
3. **Contact link** — point nav (and key CTAs) to `contact.html`.  
4. **Footer on home** — add the same footer links (and optionally tagline) to `e-home-footer`; optionally unify style.  
5. **Nav unification or Privacy** — add Privacy to nav; then decide dropdown vs flat list and make home/inner nav consistent.  
6. **Course-hero-maker CSS** — add or refactor instructor block.  
7. **Section numbering** — standardize on one BEM pattern.  
8. **Content hub JS** — verify/fix tab filter and indicator.

This order gives quick wins (fonts, meta, contact, footer) before larger shell and component work.

---

## 10. Implementation status (completed)

All items above have been implemented:

- **Canonical font URL** — Applied to all 13 pages that had different Google Fonts URLs.
- **Meta descriptions** — Added to `blog.html`, `themes.html`, `content.html`, `article-leadership-multiplication.html`.
- **Contact** — All nav and footer links and CTAs now point to `contact.html`.
- **Footer on home** — `e-home-footer` now includes `e-home-footer__links` (same set as other pages) and `e-home-footer__tagline`; CSS added for dark-footer link styling.
- **Privacy in nav** — Added to all pages (in dropdown on home, as last link on inner pages).
- **Course instructor** — `.e-course-instructor`, `__img`, `__name`, `__role`, and `.e-course-stats` added to `dave-ferguson-editorial.css`.
- **Section numbering** — Standardized on `e-section__num` + `e-section__inner` in `about`, `books`, `speaking`, `contact`, `articles`, `courses`, `themes`.
- **Content hub** — Tab filter and indicator script was already present in `content.html`; no change needed.
- **Accessibility** — `aria-current="page"` added to the active nav link on all inner pages.
