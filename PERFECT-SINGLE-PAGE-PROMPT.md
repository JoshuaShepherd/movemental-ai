# The Perfect Single-Page Website — Design Prompt

**Use this prompt to brief an AI or designer.** Each section is crafted so that, when followed, the output is one **Mobbin-worthy, Behance-worthy single-page website**: public imagery, real illustration, perfect typography, and a custom look that is unmistakably of our time (2025–2026).  
Output can be **HTML/CSS/JS** (static) or **React + Next.js + Tailwind** (component-based). **All images and illustration assets must come from the project’s `public/` directory.** The prompt is structured so every paragraph maps to a concrete design decision.

---

## 1. Role and quality bar

You are a **state-of-the-art product designer** in the vein of Mobbin and Behance’s best: you ship single-page experiences that could sit in a top portfolio or a “best of the web” roundup. You work in **React, Next.js, and Tailwind** (or, if requested, vanilla **HTML, CSS, and minimal JavaScript**). You think in **design systems**: type scale, spacing rhythm, color semantics, and reusable components. You never use placeholder content, Lorem Ipsum, or stock “AI slop” aesthetics. Every choice—font, color, image, illustration—is **intentional and specific**.

**Quality bar:** The page must feel **custom, contemporary, and complete**. A senior designer reviewing it should not be able to tell it was generated; it should feel like a real client project with a clear point of view.

---

## 2. Single-page intent and message

Before any layout or style:

- **One primary message** the page exists to convey (e.g. “We help X do Y,” “This is who we are,” “Start here”).
- **One primary action** the visitor should take (one main CTA; secondary actions are clearly secondary).
- **Audience** in one sentence (who is this for?).

Define these in 1–2 sentences. Every section of the page should support that message and that action. If a section doesn’t, remove it or reframe it.

---

## 3. Typography — “perfect fonts”

**No generic system stacks.** Choose a **deliberate pairing**:

- **Headings:** One font with strong personality—editorial serif (e.g. Playfair Display, Fraunces, DM Serif Display, Libre Baskerville) or distinctive sans (e.g. Syne, Outfit, Space Grotesk, Sora). Specify **exact weights** (e.g. 600 for H2, 700 for H1).
- **Body:** Highly readable, slightly neutral so headlines lead—e.g. Inter, Source Sans 3, Lato, Nunito, or a readable serif like Lora if the mood is editorial.
- **Scale:** Use a **type scale** (e.g. 1.25 modular scale). Define: H1 (e.g. 3rem–4rem), H2, H3, body (e.g. 1rem), small/meta (e.g. 0.875rem), caption (e.g. 0.75rem). Keep line-height generous for body (1.5–1.75); tight for display (1.1–1.25).
- **Source:** Prefer **Google Fonts** or **Adobe Fonts** with explicit names and weights. In Next.js, load via `next/font/google` and expose as CSS variables (e.g. `--font-heading`, `--font-body`). No “use a nice font” — name the font.

**Rule:** Every text element has a defined font family, size, weight, and line-height. No unspecified type.

---

## 4. Color — palette and semantics

**One clear palette**, not random hex codes:

- **Background(s):** Primary surface (e.g. white, off-white, or dark #0f0f14–#1a1a2e). Optionally one alternate section background for rhythm.
- **Text:** Primary, secondary (muted), and optional “on dark” if you use dark sections.
- **Accent:** One main accent (brand/CTA). One optional secondary accent for highlights or badges.
- **Borders/dividers:** Subtle, tokenized (e.g. `rgba(0,0,0,0.08)` on light, `rgba(255,255,255,0.12)` on dark).

Define these as **CSS custom properties** (e.g. `--color-bg`, `--color-text`, `--color-accent`, `--color-text-muted`) so the whole page reads from one system. Prefer a **curated palette** (e.g. from a “color palettes 2026”–style guide) so the result feels current, not random.

**Rule:** No one-off hex codes in components. All color flows from the palette tokens.

---

## 5. Imagery — public images only

**Use only images that already exist under the project’s `public/` directory.** No external URLs, no placeholders (no Lorem Picsum, no “use an Unsplash photo”). Every image path must resolve to a file in `public/`.

- **Source (required):**  
  - **Media library:** `public/media-library/images/` — organized by aspect ratio (`landscape/16-9/`, `landscape/4-3/`, `portrait/3-4/`, `square/1-1/`) and by theme (`community/`, `leadership/`, `people/`, `mission/`, `worship/`, `bw/`, etc.). Use paths like `/media-library/images/landscape/16-9/{filename}` or `/media-library/images/community/{filename}`.  
  - **Author/headshots (if applicable):** `public/media-library/images/headshots/{author-name}/` — e.g. headshots and candid shots for leader or team pages.  
  - **Root assets:** `public/*.svg` or other files in `public/` (e.g. logos, icons) when they exist.  
  Before building, **list which files under `public/` you will use**; if the exact image you need isn’t there, pick the closest available or use a different section treatment (e.g. type-only, gradient, or illustration).
- **Usage:** Hero (full-bleed or contained), section backgrounds, cards, avatars. Match **aspect ratios** to the media-library folders (e.g. 16:9 hero from `landscape/16-9/`, 1:1 cards from `square/1-1/`) and set **object-fit** (cover vs contain) so cropping is intentional.
- **Treatment:** Optional overlay (e.g. gradient or scrim) for text legibility; border-radius and shadows if they match the design system. Images should feel part of the layout, not dropped in.

**Rule:** Every `<img>` or `next/image` uses a **path under `public/`** (e.g. `src="/media-library/images/..."`) and has a clear **alt** description. In the deliverable, list the exact public paths used. See `public/media-library/README.md` and `public/media-library/QUICK-REFERENCE.md` for structure and conventions.

---

## 6. Illustration — from public assets only

**Use only illustration or icon assets that live under `public/`.** No external illustration packs or embedded third-party SVGs from the web.

- **Source (required):**  
  - **Project SVGs:** Any SVG or icon set in `public/` (e.g. `public/*.svg`, or under `public/media-library/icons/` if present). Reference by path (e.g. `src="/window.svg"` or `/media-library/icons/...`).  
  - **Inline/custom:** If you add new illustration assets, they must be **saved into `public/`** (or a subfolder like `public/media-library/icons/`) and then referenced; the deliverable includes both the asset and the path used on the page.  
  - **Minimal use:** If the project has no illustration assets in `public/`, rely on **photography (from §5) and type** only; don’t pull in external clip art or unsourced SVGs.
- **Style:** One consistent treatment: same line weight, same color system (use palette tokens). If you add new SVGs, make them match the page palette (e.g. accent color, stroke/fill from CSS variables).

**Rule:** Every illustration or decorative graphic is **sourced from `public/`** (path listed in deliverable). No mixed styles; one coherent look per page.

---

## 7. Layout and rhythm

- **Sections:** Name them (Hero, Social proof, Features, Quote/testimonial, CTA, Footer). One clear **vertical rhythm** — e.g. 4rem/6rem/8rem section padding (or a spacing scale: 1 / 1.5 / 2 / 3 / 4 in rem).
- **Grid:** Simple and consistent (e.g. 12-column with max-width container, or 1/2/3-column sections). No one-off “magic” widths; use the same container and gaps everywhere.
- **Hierarchy:** One hero block that establishes the message; then supporting sections in order of importance. Footer is minimal (logo, 2–4 links, optional tagline).

**Rule:** Spacing and max-widths come from a **spacing scale** and **container token**, not arbitrary pixel values.

---

## 8. Components and interaction

- **Navigation:** Sticky or static; logo + 3–5 links + primary CTA. Mobile: hamburger or simplified nav; no broken layouts at 375px.
- **Buttons:** Primary CTA uses the **accent color**; secondary is outline or subtle. One radius system (e.g. 0.5rem or pill). Hover state defined (e.g. darken or scale).
- **Cards/tiles:** If used, consistent padding, radius, and shadow (or border) from the design tokens.
- **Micro-interactions (optional):** Scroll-triggered fade-in, or one subtle hover (e.g. card lift, button feedback). Don’t overdo it; the page should feel calm and fast.

**Rule:** Buttons and links are **obviously clickable**; focus states are visible for accessibility.

---

## 9. “From our time” — contemporary and custom

The page should feel **current (2025–2026)** and **custom**, not template-y:

- **Current patterns (use sparingly, with intent):** Generous whitespace, bold headline type, one strong accent, optional glass/blur or gradient mesh only if it fits the mood. Subtle rounded corners and soft shadows are common; avoid heavy skeuomorphism or dated gradients.
- **Avoid:** Generic “AI” look (purple gradients, same Inter + purple, floating blobs, duplicated patterns). Avoid “startup cliché” (e.g. same hero + three icons + testimonial strip) unless you subvert it with distinct type, color, or imagery.
- **Custom:** The combination of **your** font pairing, **your** palette, **your** images, and **your** copy should feel like a single brand, not a theme.

**Rule:** A designer should be able to say “this looks like 2025” and “this has a point of view,” not “this could be any SaaS template.”

---

## 10. Technical and deliverable

- **Stack (choose one):**  
  - **A:** React + Next.js + Tailwind. One page (e.g. `app/(public)/landing/page.tsx`). Use Next.js `Image` for all images; semantic HTML; no inline styles for color/font—use Tailwind and/or CSS variables.  
  - **B:** Single HTML file + one CSS file + minimal JS. Semantic sections, class names that map cleanly to components (for future port to React). Images referenced by path; CSS uses custom properties for palette and type.
- **Accessibility:** Sufficient contrast (WCAG AA); headings in order; alt on images; focus visible.
- **Performance:** Images sized and (if Next) served in modern formats (e.g. WebP/AVIF). No unnecessary scripts.

**Deliverable:**  
- The page (and, if applicable, component files and styles).  
- A short **design summary:** message, audience, font pairing, palette name/source, **list of public image/illustration paths used** (e.g. `/media-library/images/landscape/16-9/...`), and one sentence on what makes the design “of our time” and custom.

---

## Quick checklist before calling it done

- [ ] One clear message and one primary CTA.
- [ ] Typography: named heading font + body font, with scale and weights.
- [ ] Color: all from a single palette (CSS variables); no stray hex codes.
- [ ] Imagery: every image is from `public/` (media-library or headshots); paths listed in deliverable.
- [ ] Illustration: every graphic/SVG is from `public/`; one consistent style or photography + type only.
- [ ] Layout: spacing scale and container; sections named and ordered.
- [ ] Navigation + footer; mobile considered.
- [ ] Feels contemporary and custom, not generic.
- [ ] Accessible (contrast, focus, semantics) and performant (images, minimal JS).

Use this prompt as the **full brief** for generating or reviewing a single-page website. Each section is there so the output is complete, consistent, and portfolio-ready.
