# Home page — component-by-component walkthrough

This document describes every section of `src/app/(site)/page.tsx` from top to bottom: the visual treatment, the copy intent, and how each piece connects to the next. Use it as the single reference for what the home page *should* look and read like when complete.

**Build / QA rank (P0–P6):** see [`HOME_PAGE_PRIORITY.md`](./HOME_PAGE_PRIORITY.md). **Static HTML home prototype (concept-modern):** [`../../html/homepage-concept-modern/index.html`](../../html/homepage-concept-modern/index.html). **Token / primitive lab (Tailwind):** [`../../../design-system-lab/`](../../../design-system-lab/) — not a duplicate home; use `docs/html` for full-page HTML exploration.

---

## Page composition order

```text
SiteNav          (shared chrome — fixed glass bar)
  HomeHero       §0  bg-background   — centered hero, tucked under nav
  HomePhilosophy §1  bg-inverse-surface (midnight) — adaptive challenge thesis
  HomeBento      §2  bg-background   — "What this actually is" bento grid
  HomeAudiences  §3  bg-section      — "Who this is for" media cards
  HomeEvidence   §4  bg-inverse-surface (midnight) — "This already exists" proof
  HomeMechanism  §5  bg-background   — three-level system flow
  HomeFinalCta   §6  bg-section      — closing CTA
SiteFooter       (shared chrome — multi-column links + legal strip)
```

Surface alternation creates the section rhythm: light → midnight → light → tinted → midnight → light → tinted. No borders separate sections — tonal shifts do all the work.

---

## 0. SiteNav (shared chrome)

**File:** `src/components/nav/site-nav.tsx`

### Visual

- Fixed to the top of the viewport, full bleed.
- Glass effect: `bg-card/80` with `backdrop-blur-xl`. No bottom border — the tonal contrast with the page beneath it is enough.
- Height: 64px (`h-16`). Content is center-aligned within `--container-max` (1200px).

### Content

| Element | Detail |
|---------|--------|
| **Brand** | "Movemental" — text mark, `font-semibold tracking-tight`. Links to `/`. |
| **Desktop nav** | Four dropdown groups aligned right: **Services**, **Proof**, **How it works**, **Company**. Each opens a menu panel. |
| **CTA button** | "Start a Conversation" — primary solid button linking to `/contact`. Hidden on mobile. |
| **Mobile nav** | Hamburger icon triggers a slide-out sheet with the same groups + CTA. |

### Design intent

The nav is minimalist — it should feel like a magazine masthead, not a SaaS toolbar. The glass blur lets the hero image (when present) peek through on scroll.

---

## 1. HomeHero — "Systems that Fuel Movement"

**File:** `src/components/sections/home-hero.tsx`

### Visual

- Full-bleed `bg-background` band with no explicit top padding — the `-mt-16` on the wrapper slides the section *behind* the fixed nav so any future background image extends under the glass bar.
- Content is vertically centered with generous top padding (`pt-32` → `sm:pt-40` → `lg:pt-48`) and bottom padding (`pb-32` → `lg:pb-40`).
- Everything is center-aligned, narrow measure (`max-w-4xl` for the headline, `max-w-3xl` for the subhead).

### Copy

| Element | Text | Token/Style |
|---------|------|-------------|
| **Eyebrow** | "Systems that Fuel Movement" | Uppercase, `tracking-[0.2em]`, `bg-card` pill with `shadow-ambient`. Sets the brand category before the eye reaches the headline. |
| **Headline** (Display lg) | "Turn your work or your organization into a system that forms people and fuels movement." | The single most important sentence on the site. It names the transformation: *your raw work* → *a system* → *formation + movement*. |
| **Subhead** (Prose, xl) | "Movemental builds integrated systems from your content, knowledge, and work — combining platforms, AI, training and consulting to provide movement leaders, churches, and organizations with digital systems that actually work." | Expands on the how and the who. Font-light for breathing contrast against the bold headline. |
| **Primary CTA** | "Start a Conversation" → `/contact` | Solid primary button, `h-14 px-10`. The hero's main conversion action. |
| **Secondary CTA** | "See How It Works" → `/methodology` | Outline button, same dimensions. For visitors who need proof before committing. |

### Open items

- **Background image:** The Stitch comp layers a grayscale abstract image behind the copy. Currently `bg-background` only. Replace with a first-party hero asset before launch (subtle, editorial — not a stock photo).

---

## 2. HomePhilosophy — "AI is a global adaptive challenge"

**File:** `src/components/sections/home-philosophy.tsx`

### Visual

- First **Midnight** moment (`Section variant="midnight"`, `spacing="lg"`).
- Left-aligned text block, `max-w-4xl`. The sudden dark-on-dark shift after the airy hero creates narrative gravity — this is where the *problem* lives.
- A thin vertical accent rule (`bg-inverse-foreground/20`, `w-1`, full height) sits beside the second paragraph. It reads as a pull-quote indicator, not a structural border.

### Copy

| Element | Text | Purpose |
|---------|------|---------|
| **Headline** (Display md) | "AI is a global adaptive challenge facing every leader and organization." | Names the tension the visitor already feels. "Adaptive challenge" borrows Heifetz leadership language — signals intellectual seriousness without jargon-dumping. |
| **First paragraph** | "In a time of rapid, discontinuous change, neither mindless adoption nor willful avoidance will help. Instead, we must lead and we must do it together." | Eliminates two false options (blind adoption, ignoring AI) and frames Movemental as the third way. Text is `2xl → 4xl`, font-light, `inverse-foreground/80`. |
| **Second paragraph** (accent rule) | "Movemental builds custom AI-integrated digital systems that support the work of formation and movement without displacing the stuff that matters most: human relationship, wisdom, and local embodied practice." | The product promise in philosophical terms. The accent rule visually sets it apart as the thesis statement. `inverse-foreground/60` — deliberately quieter than the first paragraph. |

### Design intent

This section earns the right to sell. Before showing features or pricing, it acknowledges the real problem. The Midnight band signals: "we take this seriously." A visitor who resonates here will keep scrolling.

---

## 3. HomeBento — "What this actually is"

**File:** `src/components/sections/home-bento.tsx`

### Visual

- Returns to `bg-background` (default light). The shift from midnight back to light feels like emerging from a deep thought into clear answers.
- Centered intro text (`max-w-3xl`), then a 2×2 card grid (`md:grid-cols-2`, `gap-10`).
- Cards use **ghost lift** — `bg-section` blocks on the `bg-background` band, rounded-3xl, generous `p-8 md:p-12`. No borders, no drop shadows.
- Hover: card shifts to `bg-card` and the icon container inverts (`bg-foreground` with `text-inverse-foreground`). All transitions are 500ms — slow enough to feel editorial.
- Below the grid: a dot-separated tagline row acting as a rhythmic punchline.

### Copy

| Element | Text |
|---------|------|
| **Section heading** (Display sm) | "What this actually is" |
| **Section subhead** (Prose) | "Movemental turns what you already have into a structured system." |

**Cards (2×2):**

| Icon | Title | Description |
|------|-------|-------------|
| Database | "A library of structured, searchable content" | "Centralize your organizational wisdom into a resilient, cross-referenced digital archive." |
| Waypoints | "Thematic pathways that guide people" | "Don't just list articles. Create sequences that take a learner from curiosity to deep mastery." |
| GraduationCap | "Courses designed for reflection, action, and community" | "Interactive formation experiences that turn passive readers into active participants." |
| Bot | "AI that understands your work" | "Custom LLMs grounded in your specific frameworks to help people engage and apply your ideas." |

**Tagline row:** "All of it connected. · Not separate tools. · Not disconnected experiences. · **One system.**"

### Design intent

After the philosophical framing, this is the practical payoff — four tangible things visitors can picture. The "one system" punchline at the bottom preempts the objection that this is just a bundle of unrelated products.

---

## 4. HomeAudiences — "Who this is for"

**File:** `src/components/sections/home-audiences.tsx`

### Visual

- `Section variant="section"` (`bg-section`) — the subtle tonal step down from the bento grid's `bg-background` signals a new chapter.
- Three portrait-orientation media cards in a `lg:grid-cols-3` row, `rounded-3xl`, `bg-card`.
- Each card has a 16:10 image area (grayscale by default, color on hover with a subtle `scale-105` zoom — 700ms transition). Below: title, description, and an `ArrowLink` CTA.
- Hover adds `shadow-ambient` to the whole card.

### Copy

| Card | Title | Description | CTA |
|------|-------|-------------|-----|
| 1 | "Movement Leaders" | "You've spent years building a body of work — books, talks, frameworks, ideas. We turn that work into a system that people can discover, move through, and engage over time." | "Explore for Movement Leaders" → `/services` |
| 2 | "Nonprofits" | "You have knowledge, experience, and mission — but no system to organize and scale it. We build the systems you need: content, fundraising, governance, and AI capability." | "Explore for Nonprofits" → `/services` |
| 3 | "Churches & Institutions" | "You have years of teaching, formation, and leadership — but it lives in isolated formats. We turn that into a structured system for ongoing engagement and formation." | "Explore for Churches & Institutions" → `/who-we-serve` |

### Open items

- **Images:** Currently using Stitch CDN placeholder images. Replace with first-party photography before launch.
- **Link targets:** Cards 1 & 2 both point to `/services`. Consider splitting to audience-specific anchor sections or dedicated landing pages as the services page matures.

### Design intent

This is the "see yourself" moment. Each card mirrors back the visitor's situation and names the gap Movemental fills. The grayscale-to-color hover reinforces the editorial premium feel and rewards engagement.

---

## 5. HomeEvidence — "This already exists"

**File:** `src/components/sections/home-evidence.tsx`

### Visual

- Second **Midnight** band (`Section variant="midnight"`, `spacing="lg"`).
- Two-column grid on desktop (`lg:grid-cols-2`, `gap-24`). Left column: text + proof chips. Right column: proof image.
- Proof chips: 2×2 grid of small cards with `bg-inverse-foreground/5`, `ring-1 ring-inverse-foreground/10`, each with a `CheckCircle2` icon. These chips use a subtle ring — one of the few places where a ring is acceptable on midnight (accessibility/readability).
- Right-column image: rounded-3xl with `shadow-ambient`, a gradient-to-transparent overlay fading to the section background at the bottom.

### Copy

| Element | Text |
|---------|------|
| **Headline** (Display sm) | "This already exists" |
| **Subhead** | "Movemental was first built by translating decades of work from a single movement leader into a structured system." |

**Proof chips:**

1. "hundreds of thousands of words of content"
2. "structured pathways across core themes"
3. "full course architecture"
4. "AI grounded in that work"

**Closing statement** (bold, `text-3xl`): "This is not a concept. It is already working."

### Open items

- **Proof image:** Currently a Stitch CDN placeholder. Replace with an actual screenshot of the live Movemental system (the alan-hirsch platform) before launch — this is the single most important piece of social proof on the page.

### Design intent

By section 5, the visitor has understood the problem, seen the product categories, and identified their audience segment. Now they need to believe it's real. The Midnight band returns to match the gravity of the philosophy section — bookending the light "product" sections. The closing statement is deliberate repetition: "not a concept" eliminates vaporware anxiety.

---

## 6. HomeMechanism — "How the system works"

**File:** `src/components/sections/home-mechanism.tsx`

### Visual

- Back to `bg-background` (default light), `spacing="lg"`, narrowed to `max-w-5xl` for focus.
- Three vertical levels connected by tonal pill connectors (`bg-elevated`, `h-16 w-1 rounded-full`). The connectors replace traditional line dividers while staying within DESIGN.md rules.

**Level 01 — Existing Content:**
- Eyebrow pill on `bg-card`: "Level 01 — Existing Content"
- Four small cards in a `md:grid-cols-4` row, each `bg-card rounded-3xl p-8` with a Lucide icon and an uppercase label.

**Level 02 — Digital Curator System:**
- Eyebrow pill on `bg-foreground` (inverted): "Level 02 — Digital Curator System"
- A single large midnight rounded block (`bg-inverse-surface rounded-[2.5rem]`) containing a 2×2 grid of items, each with a translucent icon container and bold label.

**Level 03 — Final Outcome:**
- Eyebrow pill on `bg-card`: "Level 03 — Final Outcome"
- Two side-by-side cards: **Formation** (light, `bg-card`) and **Movement** (midnight, `bg-inverse-surface`). Each has a large icon, a bold uppercase title (`text-4xl font-black tracking-tighter`), and a small caption.

**Closing headline** (`mt-40`): two-tone Display md.

### Copy

| Element | Text |
|---------|------|
| **Section heading** (Display sm) | "How the system works" |
| **Section subhead** (Prose) | "Everything connects. Content becomes structured articles. Articles become thematic pathways. Pathways lead into courses. Courses are supported by AI and community." |

**Level 01 items:** Books, PDFs / Docs, Videos, Audio

**Level 02 items:** Informative Articles, Thematic Pathways, Transformative Courses, Grounded AI

**Level 03 items:**

| Card | Title | Caption | Tone |
|------|-------|---------|------|
| Formation | "FORMATION" | "Internal transformation" | Light (bg-card) |
| Movement | "MOVEMENT" | "External impact" | Midnight (bg-inverse-surface) |

**Closing headline:** "People don't just consume your work. *They move through it.*" — the second half in `text-muted-foreground` for a visual fade effect.

### Design intent

This is the intellectual centerpiece of the page. The three levels tell a transformation story: raw materials (your existing content) → structured system (what Movemental builds) → human outcomes (formation and movement). The vertical flow deliberately echoes a funnel diagram but renders it as editorial layout rather than a marketing infographic. The light/dark split on the final outcome cards mirrors the dual nature of the product's promise: inner transformation and outer impact.

---

## 7. HomeFinalCta — "Start there"

**File:** `src/components/sections/home-final-cta.tsx`

### Visual

- `Section variant="section"` (`bg-section`), `spacing="lg"`. The tonal shift from the mechanism section's `bg-background` provides the boundary.
- Tight center-aligned layout, `max-w-4xl`. Simple and spacious — this section deliberately has the *least* visual complexity on the page.

### Copy

| Element | Text |
|---------|------|
| **Headline** (Display lg) | "Start there" |
| **Subhead** (Prose, xl) | "This is not something you browse. It's something we build — with you, around your work or your organization." |
| **CTA button** | "Start a Conversation" → `/contact` | Primary solid, `h-16 px-12 text-lg` — deliberately larger than the hero buttons to signal finality. |

### Design intent

Two words: "Start there." After 6 sections of philosophy, proof, and architecture, the visitor just needs permission to take the next step. The copy reframes the relationship: this isn't a product you add to cart — it's a collaboration. The enlarged button dimensions reward the visitor who scrolled the full page.

---

## 8. SiteFooter (shared chrome)

**File:** `src/components/nav/site-footer.tsx`

### Visual

- `bg-section` — continuous tonal match with HomeFinalCta above, so there's no jarring boundary before the footer. No top border.
- Four-column grid on desktop: brand + three link groups. Single-column stack on mobile.
- Legal strip below: Privacy Policy, Terms of Service, Cookie Policy on the left; "© 2026 Movemental. All rights reserved." on the right.
- All text is small uppercase with wide tracking — matching the Eyebrow primitive's typographic voice.

### Content

**Brand column:** "MOVEMENTAL" — uppercase wordmark, `font-semibold`.

**Link columns:**

| Column | Links |
|--------|-------|
| Solutions | Services overview, System builds, Organizational systems |
| Evaluate | Pricing, FAQ, Evidence |
| Company | About, Manifesto, Contact |

**Legal strip:** Privacy Policy · Terms of Service · Cookie Policy

---

## Full-page narrative arc

The home page follows a deliberate rhetorical structure:

1. **Promise** (Hero) — Here's what we do, in one sentence.
2. **Problem** (Philosophy) — Here's why it matters right now.
3. **Product** (Bento) — Here's what the system actually contains.
4. **People** (Audiences) — Here's who it's for — see yourself.
5. **Proof** (Evidence) — This already exists and works.
6. **Process** (Mechanism) — Here's exactly how it transforms raw content into outcomes.
7. **Permission** (Final CTA) — Start here.

Each section earns the right to show the next. The tonal rhythm (light → dark → light → tinted → dark → light → tinted) keeps the eye moving without visual fatigue.

---

## Open items (pre-launch)

| Item | Section | Status |
|------|---------|--------|
| Hero background image (grayscale abstract from Stitch comp) | HomeHero | Not yet added |
| First-party audience photography (3 images) | HomeAudiences | Using Stitch CDN placeholders |
| Platform screenshot for proof section | HomeEvidence | Using Stitch CDN placeholder |
| Audience card link targets (consider dedicated pages) | HomeAudiences | Cards 1 & 2 both → `/services` |
| Manifesto page (linked in nav/footer, currently deleted) | SiteNav/Footer | Route exists in nav config but `page.tsx` deleted |
