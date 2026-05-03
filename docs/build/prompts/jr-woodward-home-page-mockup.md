# Prompt: JR Woodward — Home Page Mock-up (Static HTML/CSS/JS)

> **How to run this:** Paste the entire prompt into Claude Code inside the `movemental` repo (or invoke with `@docs/build/prompts/jr-woodward-home-page-mockup.md`). Read all sections before building — the research data in §6 gates every content decision.

---

## 1. Mission

Build a **static HTML/CSS/JS mock-up** of a Movemental thought-leader home page for **JR Woodward** in `docs/html-jr-woodward/`. This is not a production React build — it is a high-fidelity browser-presentable prototype that demonstrates what JR's platform could look like on Movemental.

The mock-up must:

- Follow the **same section architecture** as the alan-hirsch and brad-brisco home pages (nav, hero, social proof, pathways, scroll stop, course CTA, newsletter, about bio, footer)
- Use the **Movemental org-site design chain** (`site-theme.css` tokens, not the alan-hirsch plum/parchment palette)
- Be **tailored to JR's actual work** — his books, frameworks, vocabulary, network, and theological register
- Be **self-contained and presentable** — openable in any browser with no server, no build step, no external dependencies beyond Google Fonts

The purpose: show JR Woodward (and Brad Brisco, who is present) what his work looks like when it has structure. This mock-up is a companion artifact to the conversation deck at `docs/html/jr-woodward-conversation-deck.html`.

---

## 2. Non-negotiables

1. **Design source of truth is the Movemental org-site chain.** Use `docs/html/site-templates/site-theme.css` for all tokens. All colors via `var(--*)`. No raw hex, no `bg-blue-600`, no `text-gray-500`. No `bg-white` or `bg-black`.
2. **Section architecture mirrors alan-hirsch / brad-brisco.** Same sequence of sections. Same nav pattern. Same footer pattern. Content is JR-specific. Layouts may differ in detail but the structural skeleton is the same.
3. **Inter font only.** Loaded via Google Fonts `<link>` (acceptable for static HTML prototypes per DESIGN.md). Serif accent (`Newsreader`) may be used for the display heading only — matching the alan-hirsch pattern of serif hero + sans body.
4. **No 1px solid borders for sectioning.** Depth comes from tonal band stacking (`band-midnight`, `band-section`, `band-default`). Borders allowed only for form inputs and nav chrome (use `var(--border)`).
5. **No decorative drop shadows.** Use Ghost Lift (tonal stacking) or `var(--shadow-ambient)` where cards sit on tonal backgrounds.
6. **Midnight is regional, not global.** Use `band-midnight` for 1–2 high-impact sections (hero, scroll stop). No `class="dark"` on `<html>`.
7. **No external JS frameworks.** Vanilla JS only for interactions (mobile menu toggle, scroll animations if any). Keep it minimal.
8. **Reduced motion respected.** All animation/transition gated behind `@media (prefers-reduced-motion: no-preference)` or collapsed to `0.01ms` for `reduce`.
9. **All content must be real.** No Lorem ipsum. No placeholder headings. Every word on the page must be specific to JR Woodward's actual work, using the research data in §6.
10. **No stock photos.** Use placeholder containers with labeled dimensions where images would go (e.g., `[Portrait: 4:5, alan-hero style]`). Do not invent or link to external images.

---

## 3. File structure

Create the following:

```
docs/html-jr-woodward/
├── index.html          # The home page mock-up (primary deliverable)
├── styles.css          # Page-specific styles (imports site-theme.css)
└── nav.js              # Mobile nav toggle + any minimal interactions
```

### Head order (in `index.html`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Newsreader:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../html/site-templates/site-theme.css">
<link rel="stylesheet" href="styles.css">
```

The page inherits all L0–L2 tokens from `site-theme.css`. `styles.css` adds only page-specific layout (hero grid, pathway cards, section compositions) — never redefines tokens.

---

## 4. Section architecture (in order)

The home page consists of **10 sections** that mirror the alan-hirsch / brad-brisco pattern, adapted for JR. Each section below specifies: purpose, layout, content, and tonal band.

---

### 4.1 — FIXED NAV

**Pattern source:** alan-hirsch `SiteBar` / movemental `site-top`

**Layout:**
- Fixed top, z-100
- Glass bar: `color-mix(in srgb, var(--card) 88%, transparent)` + `backdrop-filter: blur(12px)`
- Inner: `max-width: var(--container-max)`, flex, items-center, space-between
- Height: ~56px

**Left zone:**
- Brand text: "JR Woodward" — `font-weight: 600; letter-spacing: -0.02em; font-size: 1.05rem`
- Subtitle below (optional): "Missional Theology & Formation" — eyebrow style, `0.65rem`, uppercase, `letter-spacing: 0.08em`, `color: var(--muted-foreground)`

**Center zone (desktop only):**
- Nav links: **Pathways** · **Content** · **Courses** · **AI Lab**
- Style: `0.8rem`, `font-weight: 500`, `color: var(--muted-foreground)`, hover → `var(--foreground)` with `bg-section`
- Active state: `color: var(--primary)`, `font-weight: 600`

**Right zone:**
- Hamburger toggle (visible on mobile, hidden on desktop)
- Mobile dropdown: same links, vertical stack, `bg-card`, `border-bottom: 1px solid var(--border)`, `box-shadow: var(--shadow-ambient)`

**Behavior:**
- Mobile menu toggles via `nav.js`
- Links are `href="#"` (mock-up — no real routes)

---

### 4.2 — HERO

**Pattern source:** alan-hirsch hero (full-height, portrait + text)

**Band:** `band-midnight` (dark hero)

**Layout:**
- Min-height: `85dvh` (fallback `85vh`), min `560px`
- Two-column grid on desktop: text left (55%), portrait right (45%)
- Single column on mobile: text above, portrait below
- Padding: `var(--section-y-lg)` vertical, `24px` horizontal
- Content vertically centered within the band

**Left column — content:**

- **Eyebrow:** `"Missional Theology · Ecclesiology · Formation"` — eyebrow style, `color-mix(in srgb, var(--inverse-foreground) 52%, transparent)`
- **Headline (h1):** Serif (`Newsreader`), display size (`clamp(2.4rem, 5vw, 3.6rem)`), `letter-spacing: -0.02em`, `line-height: 1.05`
  - Text: **"The church was made for more than survival"**
- **Subheading:** `1.15rem`, `font-weight: 300`, `line-height: 1.55`, `max-width: 38ch`, `color-mix(in srgb, var(--inverse-foreground) 78%, transparent)`
  - Text: "Explore structured pathways through ecclesiology, polycentric leadership, fivefold ministry, and the theology of the Powers — grounded in thirty-five years of church planting and academic research."
- **Primary CTA:** `btn-primary` style
  - Label: **"Find Your Pathway"**
  - `href="#pathways"`
- **Secondary CTA:** `btn-ghost` style (inverse variant: `color: var(--inverse-foreground)`, border `color-mix(in srgb, var(--inverse-foreground) 28%, transparent)`)
  - Label: **"Enter the AI Lab"**
  - `href="#"`

**Right column — portrait:**

- Placeholder container: `aspect-ratio: 4/5`, `max-width: 400px`, `border-radius: calc(var(--radius) * 2)`, `background: color-mix(in srgb, var(--inverse-foreground) 8%, transparent)`
- Label inside: `[Portrait: JR Woodward, 4:5]`
- Styled as a subtle elevated card within the midnight band

**Scroll indicator (optional):**
- Centered below content, small chevron + "Scroll" text
- `color-mix(in srgb, var(--inverse-foreground) 40%, transparent)`
- Gentle bounce animation (gated behind `prefers-reduced-motion: no-preference`)

---

### 4.3 — SOCIAL PROOF (Affiliations Strip)

**Pattern source:** alan-hirsch `SocialProof`, brad-brisco `SocialProofStrip`

**Band:** `band-section`

**Layout:**
- Compact strip: `padding: 28px 24px`
- Container centered, flex wrap, `gap: 24px`, `justify-content: center`, `align-items: center`

**Content:**

- **Label (optional):** Centered eyebrow: "Partners in formation and missional movement"
- **Organization names** (text-only — no logos in mock-up, use styled text pills):
  1. V3 Church Planting Movement
  2. Missio Alliance
  3. Fuller Theological Seminary
  4. Ecclesia Network
  5. 100 Movements
  6. Praxis Gathering

**Styling per org:**
- `font-size: 0.8rem`, `font-weight: 500`, `color: var(--muted-foreground)`, `opacity: 0.6`
- Hover: `opacity: 1`, `color: var(--foreground)`
- Separated by subtle `·` or spacing only

---

### 4.4 — PATHWAYS (Thematic Portals)

**Pattern source:** alan-hirsch `Pathways` (5-card grid)

**Band:** `band-default`

**Layout:**
- Header row: title left, "View all pathways →" link right (desktop), stacked (mobile)
- Card grid: `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))`, `gap: 20px`
- Cards: `aspect-ratio: 3/4`, `border-radius: calc(var(--radius) * 1.5)`, `overflow: hidden`

**Header content:**
- **Heading (h2):** Display style, `clamp(1.8rem, 3.5vw, 2.6rem)`: **"Where will you enter the work?"**
- **Description:** Prose style, `max-width: 42ch`: "Five pathways into the deeper architecture of missional leadership, ecclesiology, and formation."
- **Link:** `color: var(--primary)`, `font-weight: 500`: "View all pathways →"

**Pathway cards (5 total):**

Each card is a tonal container with overlay text at the bottom:

| # | Title | Subtitle | Color hint |
|---|-------|----------|------------|
| 1 | **Polycentric Leadership** | "Many interrelated centers rather than hierarchy or flat structures — reflecting the communal trinitarian nature of God." | `var(--elevated)` bg |
| 2 | **Fivefold Ministry** | "Dream Awakeners, Heart Revealers, Story Tellers, Soul Healers, Light Givers — the five culture creators the church needs to thrive." | `var(--section)` bg |
| 3 | **Ecclesial Architecture** | "How we structure the church determines what we produce. Movement requires architecture designed for movement." | `var(--elevated)` bg |
| 4 | **Theology of the Powers** | "Naming, unmasking, and engaging the principalities — because leadership formation requires a theology of power." | `var(--inverse-surface)` bg with `var(--inverse-foreground)` text |
| 5 | **Missional Formation** | "Being precedes doing. Formation is the ground from which faithful mission grows." | `var(--section)` bg |

**Card internals:**
- Placeholder image area: top 60% of card, `background: var(--elevated)` (or inverse for #4)
- Bottom 40%: `padding: 16px 18px`
- Title: `font-weight: 600`, `font-size: 1rem`, `letter-spacing: -0.01em`
- Description: `font-size: 0.85rem`, `color: var(--muted-foreground)`, `line-height: 1.5`, 2-line clamp

**Pathway card #4 (Theology of the Powers)** uses the midnight variant — dark background, inverse text. This creates a visual break in the grid that draws the eye to JR's most distinctive contribution.

---

### 4.5 — AI LAB TEASER

**Pattern source:** alan-hirsch `AILabTeaser`

**Band:** `band-section`

**Layout:**
- Centered content, `max-width: 640px`, `text-align: center`
- Padding: `var(--section-y-sm)` vertical

**Content:**

- **Badge:** Pill shape, `background: color-mix(in srgb, var(--primary) 10%, transparent)`, `color: var(--primary)`, `font-size: 0.72rem`, `font-weight: 600`, uppercase, `letter-spacing: 0.08em`
  - Text: "AI Lab"
- **Heading (h2):** Display style: **"What's your question?"**
- **Subheading:** Prose style, `max-width: 36ch`, centered: "Ask anything about ecclesiology, leadership, formation, or the Powers — grounded in JR's body of work."
- **Search bar (mock):**
  - Input: `height: 52px`, `border-radius: var(--radius-pill)`, `border: 1px solid var(--border)`, `background: var(--card)`, `padding: 0 56px 0 20px`
  - Placeholder: `"e.g. What are the Five Culture Creators?"`
  - Button: circular, `background: var(--gradient-primary)`, `color: var(--primary-foreground)`, absolute-positioned right inside input
- **Question pills:** Flex wrap, centered, `gap: 10px`, `margin-top: 20px`
  - Each pill: `padding: 8px 16px`, `border-radius: var(--radius-pill)`, `background: var(--card)`, `border: 1px solid var(--border)`, `font-size: 0.82rem`
  - Pill texts:
    - "What is polycentric leadership?"
    - "Explain the theology of the Powers"
    - "How does mimetic desire shape leaders?"
    - "What are the Eight Movement Competencies?"
    - "How does fivefold ministry create culture?"

---

### 4.6 — SCROLL STOP (Full-Height Quote)

**Pattern source:** alan-hirsch `ScrollStop`

**Band:** `band-midnight`

**Layout:**
- Min-height: `65dvh` (fallback `65vh`), min `480px`
- Flex, items-center, justify-center, text-center
- Padding: `var(--section-y-lg)` vertical

**Content:**

- **Blockquote:** Serif (`Newsreader`), `clamp(1.5rem, 3.5vw, 2.6rem)`, `font-weight: 400`, `line-height: 1.3`, `max-width: 22ch`, centered, `color: var(--inverse-foreground)`
  - Text: **"Not to imitate Christ is to imitate the Powers."**
- **Attribution:** `font-size: 0.88rem`, `color-mix(in srgb, var(--inverse-foreground) 58%, transparent)`, `margin-top: 20px`
  - Text: "— JR Woodward, The Scandal of Leadership"
- **Optional link:** "Learn more →", `color-mix(in srgb, var(--inverse-foreground) 45%, transparent)`, hover brighter

**Design notes:**
- This is the most powerful single line from JR's PhD thesis. It carries the conceptual weight of the entire Theology of the Powers framework.
- Sparse. No cards, no supporting text. Just the line, the attribution, and breathing room.
- The midnight band creates a contemplative pause in the page — a visual break that forces the reader to slow down.

---

### 4.7 — COURSE CTA (Two-Column)

**Pattern source:** alan-hirsch `CourseCTA`

**Band:** `band-default`

**Layout:**
- Two-column grid on desktop: text left, featured course card right
- Single column on mobile: card above text
- Gap: `48px` desktop, `32px` mobile
- Padding: `var(--section-y-sm)` vertical

**Left column — content:**

- **Heading (h2):** Display style: **"Where courses become formation"**
- **Description:** Prose style: "Formation journeys designed to move you from theory to practice — through productive dissonance, guided reflection, and community accountability."
- **Checklist (4 items):**
  - Each item: bullet dot (`var(--primary)` circle) + text
  1. "Polycentric leadership in practice"
  2. "Naming and unmasking the Powers"
  3. "Fivefold ministry activation"
  4. "Ecclesial architecture for movement"
- **CTA:** `btn-primary`: **"Begin Formation"** → `href="#"`

**Right column — featured course card:**

- Container: `aspect-ratio: 3/4`, `max-width: 360px`, `border-radius: calc(var(--radius) * 2)`, `overflow: hidden`
- Background: `var(--elevated)` (placeholder for cover image)
- Overlay gradient: bottom-to-top, `var(--inverse-surface)` at 80% opacity → transparent
- **Badge (top-left):** Pill, `background: var(--primary)`, `color: var(--primary-foreground)`: "8 Weeks"
- **Content (bottom, over overlay):**
  - Title: `font-weight: 600`, `font-size: 1.3rem`, `color: var(--inverse-foreground)`: **"Creating a Missional Culture"**
  - Description: `0.88rem`, `color-mix(in srgb, var(--inverse-foreground) 72%, transparent)`: "Equip your community with the Five Culture Creators framework for polycentric leadership and ecclesial formation."
  - Link text: `color: var(--primary)`: "Begin Formation →"

---

### 4.8 — NEWSLETTER

**Pattern source:** alan-hirsch `Newsletter` (full primary-color band)

**Band:** Custom — `background: var(--primary); color: var(--primary-foreground)`

**Layout:**
- Full width, `padding: 80px 24px`
- Container centered, `max-width: 600px`, text-center

**Content:**

- **Badge:** Pill, `background: rgba(255,255,255,0.12)`, `color: var(--primary-foreground)`: "Free Framework Guide"
- **Heading (h2):** Display style, `color: var(--primary-foreground)`: **"Formation delivered, not just information."**
- **Subheading:** `font-size: 1.05rem`, `color: rgba(255,255,255,0.78)`, `max-width: 36ch`, centered: "Join leaders across six continents receiving structured pathways through ecclesiology, formation, and missional theology."
- **Email form (mock):**
  - Input: `height: 48px`, `border-radius: var(--radius)`, `background: rgba(255,255,255,0.12)`, `color: var(--primary-foreground)`, `border: 1px solid rgba(255,255,255,0.2)`
  - Placeholder: `"Enter your email address"`
  - Button: `background: var(--primary-foreground)`, `color: var(--primary)`, `font-weight: 600`: "Subscribe"
  - Layout: side-by-side on desktop, stacked on mobile
- **Privacy text:** `font-size: 0.75rem`, `color: rgba(255,255,255,0.5)`: "By subscribing, you agree to our Privacy Policy."

---

### 4.9 — ABOUT BIO (Leader Profile + Stats)

**Pattern source:** alan-hirsch `About` (bio + stats row)

**Band:** `band-section`

**Layout:**
- Container centered, `max-width: 860px`, `text-align: center`
- Padding: `var(--section-y-sm)` vertical

**Content:**

- **Heading (h2):** Display style: **"About JR Woodward"**
- **Lead paragraph:** Prose style, `max-width: var(--prose-max)`, centered:
  - "JR Woodward is a church planter, missiologist, and theologian whose work integrates thirty-five years of grassroots church planting with rigorous academic research. From founding New Life Christian Fellowship at Virginia Tech to co-founding the V3 Church Planting Movement, Missio Alliance, and the Praxis Gathering, his career bridges the gap between ecclesial theory and incarnational practice. His PhD research at the University of Manchester — synthesizing Walter Wink, René Girard, and William Stringfellow — produced the theology of the Powers framework that grounds The Scandal of Leadership."
- **Stats row (grid: 4 columns on desktop, 2 on mobile):**
  - Bordered top and bottom: `border-top: 1px solid var(--border)`, `padding: 28px 0`
  - Stats:

  | Number | Label |
  |--------|-------|
  | **3** | Books |
  | **35+** | Years |
  | **1,000+** | Planters Trained |
  | **7** | Orgs Founded |

  - Number: `font-size: clamp(1.6rem, 3vw, 2.2rem)`, `font-weight: 700`, `color: var(--foreground)`
  - Label: `font-size: 0.72rem`, `font-weight: 600`, `text-transform: uppercase`, `letter-spacing: 0.08em`, `color: var(--muted-foreground)`

- **CTA group (flex, centered, gap: 16px):**
  - Button 1: `btn-primary`: **"Read Full Bio"** → `href="#"`
  - Link 2: `color: var(--primary)`, `font-weight: 500`: "View Books →" → `href="#"`

---

### 4.10 — FOOTER

**Pattern source:** movemental `site-footer` from `site-theme.css`

**Band:** `background: var(--section)`, `border-top: 1px solid var(--border)`

**Layout:**
- Inner: `max-width: var(--container-max)`, grid 4 columns on desktop (`minmax(180px, 1fr)`), stacked on mobile
- Padding: `40px 24px 28px`

**Column 1 — Brand:**
- "JR Woodward" — `font-weight: 600`, `letter-spacing: -0.02em`
- Tagline: "Missional theology for the church in motion"
- `color: var(--muted-foreground)`, `font-size: 0.88rem`

**Column 2 — Explore:**
- Heading: `site-footer__heading` style: "EXPLORE"
- Links: Pathways, Content Library, Books, Courses, AI Lab

**Column 3 — Connect:**
- Heading: "CONNECT"
- Links: About JR, Contact, Newsletter

**Column 4 — Organizations:**
- Heading: "ORGANIZATIONS"
- Links: V3 Movement, Missio Alliance, Praxis Gathering, Ecclesia Network

**Bottom meta row:**
- `text-align: center`, `font-size: 0.78rem`, `color: var(--muted-foreground)`
- "© 2026 JR Woodward. Equipping the church for missional movement. All rights reserved."
- Links: Privacy · Terms · Accessibility

---

## 5. Style guide for `styles.css`

`styles.css` handles only layout compositions not covered by `site-theme.css`. It must **never** redefine `:root` tokens or override L0/L1 rules.

### What belongs in `styles.css`:
- Hero grid layout (two-column responsive)
- Pathway card grid and card aspect ratios
- AI Lab teaser centered composition
- Scroll stop centering
- Course CTA two-column layout
- Newsletter form layout
- About stats grid
- Image placeholder styling
- Serif font application for display headings
- Nav fixed-position override for page (if site-theme.css `site-top` isn't sufficient)

### What does NOT belong in `styles.css`:
- Color definitions
- Font-family declarations (except applying Newsreader to specific selectors)
- Token redefinitions
- Shadow definitions
- Border styles for sectioning (use tonal bands)
- Resets (already in site-theme.css)

### Serif accent rule:
```css
.display-serif {
  font-family: "Newsreader", Georgia, "Times New Roman", serif;
  font-weight: 400;
  font-style: normal;
}
```

Apply `.display-serif` only to: hero h1, scroll-stop blockquote, and course CTA h2. Everything else stays Inter.

---

## 6. JR Woodward research data (content source of truth)

All content on the page must derive from the following verified research. Do not invent, extrapolate, or embellish.

### Identity
- **Full name:** JR Woodward (Gailand Woodward Jr.)
- **Handle:** @dreamawakener
- **Location:** Lynnwood, WA
- **Career span:** 35+ years (since 1989)
- **Education:** PhD, University of Manchester (2020); MA, Fuller Theological Seminary (2011); BS, Radford University (Psychology, 1987)

### Books (authored/co-authored)
1. **Creating a Missional Culture** (IVP, 2012) — Foreword by Alan Hirsch — Goodreads 4.04/5
2. **The Church as Movement** (IVP, 2016) — Co-authored with Dan White Jr. — Foreword by Alan Hirsch — IVP Book of the Year 2017 — Goodreads 4.32/5
3. **The Scandal of Leadership** (100 Movements, 2023) — Foreword by David Fitch — Goodreads 4.77/5 (highest-rated)

### Core frameworks
| Framework | Source | Description |
|-----------|--------|-------------|
| **Five Culture Creators** | *Creating a Missional Culture* | APEST reframed: Dream Awakeners (Apostles), Heart Revealers (Prophets), Story Tellers (Evangelists), Soul Healers (Pastors), Light Givers (Teachers) |
| **The Cultural Web** | *Creating a Missional Culture* | Six dimensions shaping culture: Language, Artifacts, Rituals, Ethics, Institutions, Guiding Narratives |
| **Polycentric Leadership** | *Creating a Missional Culture* | Many interrelated centers reflecting communal trinitarian theology — neither hierarchical nor flat |
| **Eight Movement Competencies** | *The Church as Movement* | Movement Intelligence, Polycentric Leadership, Being Disciples, Making Disciples, Missional Theology, Ecclesial Architecture, Community Formation, Incarnational Practices |
| **Four Spaces of Belonging** | V3 teaching | Four relational spaces of varying intimacy for discipleship and mission |
| **Theology of the Powers** | PhD thesis / *The Scandal of Leadership* | Synthesis of Wink (naming/unmasking), Girard (mimetic desire), Stringfellow (Image/Institution/Ideology) |
| **Imitation-Based Leadership** | PhD thesis / *The Scandal of Leadership* | Leaders imitate either Christ (redemptive) or the Powers (domineering) — no neutral ground |
| **Three Contours of Leadership** | *The Scandal of Leadership* | Identity (who leaders are), Praxis (how they lead), Telos (what they value) |

### Organizations founded or co-founded (7)
1. New Life Christian Fellowship (1989) — Virginia Tech
2. Kairos Los Angeles (2002) — East Hollywood
3. Solis Foundation (2007) — Kenya
4. The Unembraced — Kenya
5. Ecclesia Network (2007)
6. Missio Alliance (2012)
7. Praxis Gathering (~2015)

### Current leadership
- **V3 Church Planting Movement** — National Director (2013–present) — 1,000+ planters trained
- **Praxis Gathering** — Co-Director
- **Missio Alliance** — Governing Board
- **Fuller Theological Seminary** — Adjunct Professor (Doctor of Global Leadership cohort)
- **Central Seminary, Missio Seminary, America Evangelical University** — Adjunct Professor

### Key relationships (for social proof / network context)
- **Alan Hirsch** — forewords for both IVP books; published through 100 Movements
- **Dan White Jr.** — co-author, co-leads V3
- **David Fitch** — foreword for *Scandal of Leadership*
- **Brad Brisco** — present in the conversation; adjacent missional ecosystem
- **Amos Yong** — afterword for *Scandal of Leadership*

### Intellectual genealogy
Walter Wink, René Girard, William Stringfellow, Lesslie Newbigin, James K.A. Smith, Henri Nouwen, Miroslav Volf

### PhD thesis
- **Title:** *Missional Leadership, Mimetic Desire, and a Theology of the Powers*
- **Central claim:** "Not to imitate Christ is to imitate the Powers."
- **Word count:** 80,385
- **Dedicated to:** The V3 Church Planting Movement

### Digital presence gaps (the problem Movemental solves)
- No personal YouTube channel (20–30 videos scattered across third-party platforms)
- No audiobooks (0 of 3 titles)
- Basic WordPress site (jrwoodward.com)
- V3 training curriculum invisible outside cohort enrollment
- Praxis Gathering content disappears after events
- Seminary teaching (4 institutions) — zero published content
- Substack ("Faithful Resistance") active but isolated from body of work

### Stats for About section
| Stat | Value |
|------|-------|
| Books | 3 |
| Years | 35+ |
| Planters trained (V3) | 1,000+ |
| Organizations founded | 7 |

---

## 7. Content voice rules

The copy on this page must:

- Use JR's own vocabulary: **formation**, **polycentric**, **ecclesial architecture**, **the Powers**, **missional**, **incarnational**, **kenotic**
- Avoid startup language: no "scale your impact," "unlock your potential," "10x your reach"
- Avoid generic Christian platitudes: no "transform the world," "kingdom impact," "life-changing"
- Be specific to JR's frameworks — name them by name
- Assume high intelligence and deep theological literacy in the reader
- Be restrained, confident, and structurally clear — not breathless or promotional
- Match the register of JR's own writing: precise, theologically grounded, ecclesially serious

---

## 8. Pathway definitions for card content

These are the 5 pathways to display. Each should feel like a genuine intellectual entry point into JR's body of work.

### Pathway 1: Polycentric Leadership
- **Entry point:** *Creating a Missional Culture* ch. 3–5
- **Core idea:** Leadership as many interrelated centers reflecting trinitarian community — not hierarchy, not flat
- **Connects to:** Cultural Web, Five Environments, ecclesiology

### Pathway 2: Fivefold Ministry (Five Culture Creators)
- **Entry point:** *Creating a Missional Culture* ch. 6–10
- **Core idea:** APEST as culture creators — each gift creates a distinct environment the church needs
- **Connects to:** Five Environments, polycentric leadership, formation practices

### Pathway 3: Ecclesial Architecture
- **Entry point:** *The Church as Movement* (all 8 competencies)
- **Core idea:** How we structure the church determines what we produce — movement requires architecture for movement
- **Connects to:** Eight Competencies, incarnational practices, community formation

### Pathway 4: Theology of the Powers
- **Entry point:** *The Scandal of Leadership* (the entire Powers framework)
- **Core idea:** Principalities and powers are created good, fallen, and redeemable — leaders imitate either Christ or the Powers
- **Connects to:** Mimetic desire, imitation-based leadership, kenotic spirituality

### Pathway 5: Missional Formation
- **Entry point:** Cross-cutting — draws from all three books + V3 curriculum
- **Core idea:** Being precedes doing — formation is the ground from which faithful mission grows
- **Connects to:** Four Spaces, Five Environments, discipleship, community formation

---

## 9. Build checklist

Before considering the mock-up complete, verify:

- [ ] `index.html` opens cleanly in browser with no console errors
- [ ] All colors resolve from `var(--*)` tokens — no raw hex in `styles.css`
- [ ] Tonal band stacking creates visual rhythm without `border-bottom` separators
- [ ] Hero uses midnight band with serif display heading
- [ ] Scroll stop uses midnight band with JR's strongest line ("Not to imitate Christ...")
- [ ] All 5 pathway cards render with readable hierarchy
- [ ] Nav glass bar is fixed and functional (mobile toggle works)
- [ ] Newsletter section uses primary color background
- [ ] About section stats match §6 data exactly (3 / 35+ / 1,000+ / 7)
- [ ] Footer has 4-column layout on desktop, collapses on mobile
- [ ] No external images loaded — all image areas are labeled placeholders
- [ ] Responsive: page reads correctly at 375px, 768px, and 1440px widths
- [ ] `prefers-reduced-motion: reduce` collapses all transitions
- [ ] No Lorem ipsum, no placeholder text, no fabricated content
- [ ] Total page weight (HTML + CSS + JS) under 50KB
- [ ] File structure matches §3 exactly

---

## 10. What this is NOT

- **Not a production build.** This is a static prototype for conversation and alignment.
- **Not a Stitch migration.** This does not consume Stitch screens. It follows the architectural pattern established by alan-hirsch and brad-brisco, rendered as static HTML.
- **Not a design system exercise.** It inherits the Movemental design chain via `site-theme.css`. It does not create new tokens.
- **Not a feature demo.** The AI Lab search bar, newsletter form, and nav links are visual mock-ups. They do not function.
- **Not generic.** Every word, every card, every pathway, every stat is JR Woodward's actual work. If it could be swapped for another leader without changing anything, it's wrong.
