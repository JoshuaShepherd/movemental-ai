# Movemental HTML Prototype — Complete Content & Component Specification

This document describes the exact current state of the two HTML prototype pages in `html/`. It is intended as a handoff reference for another agent to faithfully reproduce or port these prototypes into React/Next.js/Tailwind components.

---

## File Structure

```
html/
├── styles/main.css        # Shared design system (2168 lines)
├── scripts/main.js        # Shared interactions (685 lines)
├── why.html               # WHY MOVEMENTAL page (609 lines)
├── how.html               # HOW MOVEMENTAL WORKS page (1084 lines)
└── PROTOTYPE-SPEC.md      # This file
```

---

## Global Shared Elements (both pages)

### Fonts (loaded via Google Fonts CDN)
- **Inter** — weights 400, 500, 600, 700 (body, headings sans)
- **Playfair Display** — weights 400, 700, 900 + italic 400 (display headings, quiet sections)
- **Space Grotesk** — weights 400, 500, 600, 700 (logo, section numbers, monospace accents)

### Color Tokens (CSS custom properties on `:root`)

| Token | Hex | Usage |
|-------|-----|-------|
| `--sage-500` | `#6e916e` | Primary brand green |
| `--sage-900` | `#161d16` | Dark section backgrounds |
| `--sage-950` | `#0f140f` | Darkest gradient terminus |
| `--scarlet-500` | `#cb3437` | Primary CTA, energy, scarlet-rush |
| `--scarlet-400` | `#d55d5f` | Active nav link, section numbers, accent text |
| `--orchid-500` | `#8c50af` | Secondary accent, velvet-orchid |
| `--text-on-dark` | `#ffffff` | Headings on dark backgrounds |
| `--text-on-dark-secondary` | `#e2e8f0` | Body text on dark |
| `--text-on-dark-muted` | `#cbd5e1` | Tertiary text on dark |
| `--text-on-dark-subtle` | `#94a3b8` | Quaternary / labels on dark |
| `--border-on-dark` | `rgba(255,255,255,0.15)` | Borders on dark sections |

Full palette includes sage (50–950), scarlet (50–900), orchid (50–900), snow (50–900). See `styles/main.css` lines 10–59.

### Scroll Progress Bar
- Element: `<div class="scroll-progress">` — fixed at top, z-index 1000
- Height: 3px
- Background: `linear-gradient(90deg, scarlet-500, orchid-500)`
- Width dynamically set by JS based on `scrollY / (docHeight - windowHeight)`

### Navigation
- Element: `<nav class="site-nav">` — fixed position, z-index 900
- Initially transparent; gains class `.scrolled` when `scrollY > 40` which adds:
  - `background: rgba(22, 29, 22, 0.92)` with `backdrop-filter: blur(12px)`
  - Subtle bottom border shadow
- Inner container: `.nav-inner` — max-width 1400px, height 72px, flex between logo and links
- **Logo**: `move<span>mental</span>` — font-family Space Grotesk, "move" in white, "mental" in scarlet-400
- **Links**: Why, How, Pricing, About — 14px Inter weight 500, color `text-on-dark-secondary`, active link gets `scarlet-400`
- **CTA button**: "Start discernment" — pill shape, scarlet-500 background, white text, 14px weight 600
- **Mobile**: hamburger toggle (3 spans) shown at `max-width: 768px`, nav-links hidden

### Footer
- Element: `<footer class="site-footer">` — background sage-950
- Logo: same as nav (Space Grotesk, move + mental)
- Links: Why, How, Pricing, About, Privacy — 14px, text-on-dark-muted
- Tagline: "A credibility ecology for movement leaders." — 13px centered, with top border

### Animation System
Four reveal classes, all triggered by IntersectionObserver (threshold 0.12, rootMargin bottom -60px):
1. `.reveal` — translateY(32px) → 0, opacity 0 → 1, 0.7s ease-out
2. `.reveal-left` — translateX(-40px) → 0
3. `.reveal-right` — translateX(40px) → 0
4. `.reveal-scale` — scale(0.92) → 1, 0.6s

Stagger: `.stagger > .reveal:nth-child(N)` adds N*100ms transition-delay (up to 9 children).

Elements also support inline `style="transition-delay: Xms"` for custom sequencing.

---

# WHY MOVEMENTAL PAGE (`why.html`)

Page title: "Why Movemental"

The page consists of 8 numbered content sections (labeled WHY — 01 through WHY — 08 in the UI, though spec originally called them WHY-1 through WHY-9). All sections use dark backgrounds. The hero is un-numbered.

## Section: Hero (id="why-hero")

- **Type**: Full-height hero, class `hero section--darker`
- **Background**: Gradient from sage-900 to sage-950 (vertical), plus `::before` pseudo-element with two radial gradients (orchid at 30%/50%, scarlet at 70%/30%) for subtle color wash
- **Content width**: max 860px centered
- **H1**: Font: Playfair Display 700 (class `heading-display`), size clamp(2.5rem, 5vw, 4rem)
  - Line 1: "The way we decide what to trust"
  - Line 2 (span.text-gradient): "has changed." — gradient text scarlet-400 → orchid-400
- **Subhead**: "Movemental exists to protect credibility — and help it travel — when the internet can no longer tell the difference." — body-large, color text-on-dark-secondary
- **Video placeholder**: 16:9 aspect ratio, max-width 640px, sage-800 background with radial scarlet glow
  - Play button: 64px circle, scarlet-500 background, white triangle SVG (play icon)
  - Label: "Watch 90 seconds" — 14px text-on-dark-muted
  - Hover: border turns scarlet-500, subtle glow, play button scales to 1.08
- **CTA**: Single button "Start discernment" — btn-primary (scarlet-500 pill)
- **Animations**: H1 → reveal, subhead → reveal (delay 150ms), video → reveal (delay 250ms), CTA → reveal (delay 350ms)

## Section: WHY — 01 — Credibility Collapse (id="why-collapse")

- **Type**: `section section--dark` (flat sage-900 background)
- **Layout**: `.split` — 2-column grid, 64px gap, content left / diagram right
- **Section number**: "WHY — 01" — Space Grotesk 13px 600, scarlet-400
- **H2**: "Credibility is harder to see." — Inter 700, clamp(1.75rem, 3.5vw, 2.75rem)
- **Body copy** (3 paragraphs):
  1. "Clear signals of authorship and trust used to be easy to notice." — text-on-dark-secondary
  2. "Now everything arrives in the same format, at the same speed, with the same confidence." — text-on-dark-secondary
  3. "The result isn't just misinformation — it's *indistinguishability*." — text-on-dark-muted, "indistinguishability" in `<em>`
- **Disclosure toggle**: "What changed?" — border box with chevron icon (rotates 180° on open)
  - Content (bulleted list, 5 items):
    - Algorithmic feeds flattened editorial hierarchy
    - AI-generated content removed visible markers of origin
    - Platform incentives reward engagement, not accuracy
    - Trust signals (publisher, author, track record) became invisible
    - Speed of distribution outpaced verification
  - Animation: grid-template-rows 0fr → 1fr transition
- **Right column — SVG diagram** (viewBox 0 0 400 280): "Signal flattening"
  - Left: 3 stacked rectangles representing abstract sources:
    - "Source A" — sage green border
    - "Source B" — orchid border
    - "Source C" — scarlet border
  - Center: Tall rectangle labeled "THE FEED" containing 3 identical card wireframes (all look the same — same gray bars)
  - Right: Large red "?" with "Indistinguishable" label
  - Arrows connecting stages (draw-path class for stroke animation)
  - Arrow marker defined in `<defs>`
  - Note: Sources are deliberately abstract (no moral accusation of specific formats)
- **Animations**: section-number → reveal, h2 → reveal, body → reveal (delay 100ms), disclosure → reveal (delay 200ms), diagram → reveal-right (delay 300ms)

## Section: WHY — 02 — Content Doesn't Move (id="why-stuck")

- **Type**: `section section--darker`
- **Layout**: `.split.split--reverse` — reversed 2-column (content right, viz left on desktop)
- **Section number**: "WHY — 02"
- **H2**: "Most good work doesn't travel."
- **Body copy** (3 parts):
  1. "If you're a credible leader, the issue usually isn't quality."
  2. "It's *circulation*." — with `<em>` emphasis
  3. "Your work can be deeply true — and still remain largely invisible to the people who would actually receive it."
- **Left column — Canvas visualizations**: `.content-viz` — 2-column grid, max-width 600px
  - **Stuck orbit** (canvas id="stuck-orbit"):
    - Dark card (`.content-viz-card--stuck`): white-alpha-4% bg, white-alpha-15% border
    - Canvas draws: dashed circle orbit (radius 25px), center dot, a small content card (40x28px, scarlet-tinted) orbiting endlessly in a tiny circle
    - Label below: "Stuck in a small orbit" — 13px text-on-dark-subtle
  - **Moving orbit** (canvas id="moving-orbit"):
    - Green card (`.content-viz-card--moving`): sage-alpha-8% bg, sage-alpha-20% border
    - Canvas draws: 6 network nodes connected by edges, a content card (sage-tinted) traveling along edges node-to-node with a trailing glow
    - Label below: "Traveling through a network" — 13px sage-300
  - Both canvases: start/stop animation on IntersectionObserver visibility, HiDPI aware
- **Animations**: section-number → reveal, h2 → reveal, body → reveal (delay 100ms), viz → reveal-left (delay 200ms)

## Section: WHY — 03 — Credibility vs Amplification (id="why-category")

- **Type**: `section section--dark`
- **Layout**: Centered header + centered chart
- **Section number**: "WHY — 03"
- **H2**: "Amplification and credibility are different forces."
- **Body**: "Amplification increases reach. Credibility is earned over time. When amplification outruns credibility, trust collapses."
- **Chart** (container id="cred-amp-chart"): SVG generated by JavaScript (viewBox 0 0 500 280, max-width 500px)
  - 4 horizontal grid lines, subtle white-alpha-6%
  - X-axis label: "Time"
  - Two curves with draw-on animation (stroke-dashoffset transition):
    - **Credibility line** (sage-500, #6e916e): logarithmic curve — `log(1 + t*4) / log(5)` — slow, cumulative growth
    - **Amplification line** (scarlet-500, #cb3437): cubic curve — `t³` — fast exponential growth
  - Legend: two colored bars with labels "Credibility (slow, cumulative)" and "Amplification (fast, exponential)" — 11px Inter, white-alpha-50%
- **Closing line**: "These forces behave differently. Confusing them has consequences." — italic, text-on-dark-muted, centered (diagnosis, not positioning — no self-reference)
- **Animations**: header → reveal, chart → reveal-scale (delay 200ms), closing line → reveal (delay 350ms)

## Section: WHY — 04 — Scenius / Credibility Ecology (id="why-scenius")

- **Type**: `section section--darker`
- **Layout**: `.split` — copy left, network canvas right
- **Section number**: "WHY — 04"
- **H2**: "Credibility now travels through relationships."
- **Body** (3 paragraphs):
  1. "Institutional trust can't carry the weight it once did."
  2. "What remains scalable is relational credibility: visible networks of people who vouch for what they know is real."
  3. "Movemental is designed as a credibility ecology — a *scenius* — not a content platform."
- **Micro-callout**: "The network is part of the product." — with users SVG icon
- **Right column — Static SVG network**: rounded container (sage-950 bg, border-on-dark), viewBox 0 0 400 300
  - Center node: radius 14, scarlet fill, with two concentric glow rings (scarlet-alpha-15%, scarlet-alpha-6%)
  - 6 peer nodes: radius 8, mix of sage-500 and orchid-500 fills at 0.7 opacity
  - Solid lines from center to all peers (white-alpha-8%, stroke-width 1.5)
  - Dashed lines between select peers (white-alpha-5%, stroke-dasharray 4)
  - Note: Static SVG replaces previous animated canvas — section is conceptual, not kinetic
- **Animations**: text → reveal + reveal delays, SVG → reveal-right (delay 300ms)

## Section: WHY — 05 — Built for Alan (id="why-alan")

- **Type**: `section section--dark`
- **Layout**: Centered header + 3-column case study strip
- **Section number**: "WHY — 05"
- **H2**: "We started by building for one credible voice."
- **Body**: "Movemental began as a full digital platform built to steward a real body of work — books, talks, decades of formation — so it could be found, trusted, and carried forward without distortion." — max-width 640px
- **Case study strip**: `.case-strip` — 3-column grid (1-col on mobile), `.stagger` class for delayed reveals
  - **Card 1 — "Before"**:
    - Image area: sage-800 bg, contains `.placeholder-ui` mockup (gray bars/blocks representing messy scattered content)
    - Label: "BEFORE" — 11px uppercase, scarlet-400
    - Caption: "Scattered archives, broken links, content locked in formats that don't travel."
  - **Card 2 — "After"**:
    - Image area: sage-800 bg, placeholder shows organized UI with avatar icon, two structured cards (sage-green tinted)
    - Label: "AFTER" — sage-400 color
    - Caption: "A coherent platform home where everything is findable, structured, and alive."
  - **Card 3 — "Living system"**:
    - Image area: gradient sage-800 to orchid-900 (#1c1023), placeholder shows two feature cards (orchid-tinted + scarlet-tinted) and 3 column items
    - Label: "LIVING SYSTEM" — orchid-400 color
    - Caption: "Pipeline outputs: articles, courses, translations — all flowing from one source of truth."
- **Closing line**: "It began as a focused build and became a shared vision." — italic, text-on-dark-subtle, centered
- **Animations**: stagger on all 3 cards

## Section: WHY — 06 — Why Now (id="why-now")

- **Type**: `section section--darker`
- **Layout**: `.split` — copy left, constraint bars right
- **Section number**: "WHY — 06"
- **H2**: "This wasn't feasible until recently."
- **Body** (3 parts):
  1. "Not because AI can replace leaders —"
  2. "but because it can remove digital friction that used to require agencies, budgets, and endless time."
  3. "AI belongs in the background, translating your work into discoverability and circulation."
- **Right column — Constraint collapse bars**: 3 simplified bar charts stacked vertically, max-width 600px
  - Each bar has:
    - Label row (left: metric name, right: change description)
    - Track (32px height, white-alpha-6% bg) with single fill (sage gradient)
  - **Bar 1**: "Time to launch" / "Years → Weeks" — fill: 25%
  - **Bar 2**: "Cost" / "Agency budget → Sustainable" — fill: 20%
  - **Bar 3**: "Complexity" / "Full team → Small team" — fill: 30%
  - No legend (simplified — the point is feasibility, not optimization)
  - Animation: bars animate width from 0% to target on IntersectionObserver (0.3s delay)
- **Animations**: text → reveal, bars → reveal-right (delay 200ms)

## Section: WHY — 07 — Boundaries (id="why-boundaries")

- **Type**: `section section--dark`
- **Layout**: Centered header + 3-column card grid
- **Section number**: "WHY — 07"
- **H2**: "This is intentionally narrow."
- **Card grid**: `.cards-grid` — 3 columns (1-col mobile), `.stagger` class
  - **Card 1 — "Who it's for"**:
    - Chip: "WHO" — chip--sage (sage-100 bg, sage-700 text)
    - Title: "Who it's for"
    - Body: "For leaders with embodied credibility and real communities."
    - Declarative close: "We work with people who already have it — not those trying to manufacture it." (text-on-dark-subtle)
  - **Card 2 — "Why stop at 100"**:
    - Chip: "SCALE" — chip--scarlet (scarlet-50 bg, scarlet-600 text)
    - Title: "Why stop at 100"
    - Body: "Because relational credibility has limits."
    - Declarative close: "A trusted ecology of 100 holds more weight than a diluted marketplace of 10,000." (text-on-dark-subtle)
  - **Card 3 — "Downward scaling"**:
    - Chip: "DEPTH" — chip--orchid (orchid-50 bg, orchid-600 text)
    - Title: "Downward scaling"
    - Body: "Movemental scales depth, not noise."
    - Declarative close: "Each leader serves their actual community better — not a wider audience worse." (text-on-dark-subtle)
  - Note: No disclosure toggles — boundaries are stated, not defended. Each card uses a declarative second sentence in place of expandable rationale.
  - All cards: dark variant (white-alpha-4% bg, white-alpha-15% border), hover: brighter border, slightly elevated bg

## Section: WHY — 08 — Soul Protection (id="why-soul")

- **Type**: `section section--darker`, extra bottom padding
- **Layout**: `.quiet-section` — centered, max-width 620px, text-forward (no diagrams)
- **Section number**: "WHY — 08"
- **H2**: "Movement still happens offline." — Playfair Display italic, weight 400, text-on-dark-secondary
- **Body block 1**: "Formation can't be automated. / Community can't be simulated." + "Movemental exists to reduce digital burden — so leaders can stay present to people." — text-on-dark-muted, 1.05rem, line-height 1.8
- **Telos line**: "Success is being heard by your people — not everyone." — font-weight 600, sage-300, 1.1rem
- **Rule of life motif**: Inline-flex pill with clock SVG icon (sage-400) + "~3 hours per week of your attention. We handle the rest." — white-alpha-4% bg, border-on-dark border, 14px text-on-dark-muted
- **Lament line**: "This wasn't built from hype. It was built from the sense that something precious was being lost." — Playfair Display italic, text-on-dark-subtle
- **Section divider**: 1px gradient line (transparent → border-on-dark → transparent), max-width 200px, centered
- **CTA**: "Start discernment" — btn-primary
- **Animations**: sequential reveals with 100ms increments (section-number → h2 → body → telos → rule-motif → lament → divider → CTA)

---

# HOW MOVEMENTAL WORKS PAGE (`how.html`)

Page title: "How Movemental Works"

The page consists of 11 numbered content sections (labeled HOW — 01 through HOW — 11), an un-numbered hero, and an un-numbered closing CTA section. All sections use dark backgrounds.

## Section: Hero (id="how-hero")

- **Type**: Full-height hero, `hero section--darker`
- **Same radial gradient treatment** as WHY hero
- **H1**: Playfair Display 700
  - Line 1: "A clear path from your existing work"
  - Line 2 (span.text-gradient): "to a living system."
- **Subhead**: "No hype. No black box. Just a repeatable process built around credible leadership."
- **CTA**: "See the full playbook" — btn-secondary (outline style, white border) with downward arrow SVG icon, links to `#how-playbook`
- **Animations**: same stagger pattern as WHY hero

## Section: HOW — 01 — The Playbook (id="how-playbook")

- **Type**: `section section--dark`
- **Layout**: Centered header + vertical pipeline accordion
- **Section number**: "HOW — 01"
- **H2**: "The playbook."
- **Body**: "We begin with what already exists. We clarify your lane. We turn it into a coherent body of work that compounds over time."
- **Pipeline component**: `.pipeline` — vertical accordion, max-width 640px centered
  - 5 nodes connected by `.pipeline-connector` dividers (2px × 24px vertical lines)
  - Each node is a `.pipeline-node` with header and collapsible content
  - Accordion behavior: only one node open at a time (JS closes others when one opens)
  - Node header has: number circle (32px, white-alpha-8% bg → scarlet-500 when open), title, chevron (rotates 180°)
  - Node content has: 1 artifact placeholder (3:2 aspect ratio, labeled box) + bullet list emphasizing decisions (arrow prefix "→" in scarlet-400)
  - **Node 1 — "Existing Work"** (starts open):
    - Artifact: "Books, talks & manuscripts"
    - Bullets: "Produces: Indexed archive with metadata" / "You decide: Which sources are canonical"
  - **Node 2 — "Evergreen Content"**:
    - Artifact: "Topic clusters & articles"
    - Bullets: "Produces: Interconnected topic architecture" / "You decide: Priorities and guardrails"
  - **Node 3 — "Courses & Learning"**:
    - Artifact: "Course modules & paths"
    - Bullets: "Produces: Structured learning from your material" / "You decide: Pedagogical structure and depth"
  - **Node 4 — "Translation & Circulation"**:
    - Artifact: "Translation & distribution"
    - Bullets: "Produces: Circulation through the relational network" / "You decide: Which languages and communities to serve"
  - **Node 5 — "Compounding"**:
    - Artifact: "Compounding effects"
    - Bullets: "Produces: Cross-pollination with peer leaders" / "You decide: How to steward growth"

## Section: HOW — 02 — Onboarding Wizard (id="how-onboarding")

- **Type**: `section section--darker`
- **Layout**: Centered header + stepper + wizard panel
- **Section number**: "HOW — 02"
- **H2**: "Onboarding that meets you where you are."
- **Body**: "You don't start with a blank page. You start with your work — then we build a coherent platform around it."
- **Stepper**: 4 steps with connecting lines, centered
  - Step 1: "Identity" — state: completed (sage-500 green circle with white number)
  - Step 2: "Sources" — state: active (scarlet-500 red circle with white number)
  - Step 3: "Calibration" — state: pending (gray bordered circle)
  - Step 4: "Platform" — state: pending
  - Connectors: 40px × 2px lines, completed ones turn sage-500
  - Clicking a step updates all states and shows the corresponding panel
  - On mobile (≤768px): step labels hidden, connectors shrink to 24px
- **Wizard panel**: `.wizard-panel--dark` — rounded box, white-alpha-3% bg, min-height 320px, padding 48px
  - **Panel 1 (Identity, hidden by default)**: Two form fields with generic placeholders: "Your name" / "Enter your full name" and "Your domain" / "Your primary area of expertise"
  - **Panel 2 (Sources, visible by default)**: Title "Links & corpus sources"
    - Row 1: Book icon (sage) + "Books & manuscripts" / "Published works, drafts, key papers" + checkmark — sage-green tinted row
    - Row 2: Video icon (orchid) + "Talks & lectures" / "Video, audio, conference recordings" + checkmark — orchid-tinted row
    - Row 3: Plus-circle icon + "Add more sources..." — dashed border, cursor pointer
  - **Panel 3 (Calibration, hidden)**: Title "Lane + voice calibration"
    - "Your lane (auto-detected)": chips — Primary topic, Secondary topic, Leadership (chip--dark)
    - "Voice constraints": chips — Tone, Cadence, Vocabulary (chip--sage)
  - Note: Wizard is deliberately de-personalized — no case-specific data. HOW must feel inhabitable, not case-specific.
  - **Panel 4 (Platform, hidden)**: Title "Platform draft generated"
    - Centered layout icon (sage-400) + "Your platform is ready for review" + "Homepage, about, topics, and content architecture — all generated from your sources."
- **Micro-callout**: "Intelligent, not bureaucratic." — with layers SVG icon

## Section: HOW — 03 — Content Pipeline (id="how-pipeline")

- **Type**: `section section--dark`
- **Layout**: Centered header + vertical layered stack
- **Section number**: "HOW — 03"
- **H2**: "Your work becomes structured outputs."
- **Body**: "Your existing material becomes a living archive — then becomes evergreen content, courses, and translated circulation." + italic: "Creation is not accelerated. Circulation is."
- **Linear flow diagram**: 3 stacked layers (max-width 700px centered), no funnel shape
  - **Layer 1 — Inputs**: sage-tinted row (sage-alpha-6% bg, sage border), document icon, "Inputs" heading, "Sermons, talks, books, notes, lectures"
  - **Layer 2 — Discernment**: scarlet-tinted row (scarlet-alpha-4% bg, scarlet side borders), checkmark icon, "Discernment" heading, "Voice calibration, lane clarity, human review"
  - **Layer 3 — Outputs**: orchid-tinted row (orchid-alpha-4% bg, orchid border), layers icon, "Outputs" heading, "Articles, courses, collections, translations"
  - Note: Linear stack replaces funnel. Funnels imply conversion; this is formation and stewardship.

## Section: HOW — 04 — Writing Assistant (id="how-assistant")

- **Type**: `section section--darker`
- **Layout**: `.split` — copy left, editor mockup right
- **Section number**: "HOW — 04"
- **H2**: "Quality is preserved through feedback loops."
- **Body**: 3 paragraphs: "AI helps draft and structure from your material." / "Humans shape voice, meaning, and theological integrity." / "The system learns your constraints over time."
- **Editor mockup**: `.editor-mock` — rounded dark container, sage-950 bg
  - **Toolbar**: 3 macOS dots (red #ff5f57, yellow #febc2e, green #28c840) + title "Content Workbench" (11px right-aligned)
  - **Split panes**: 2-column grid (stacks on mobile)
    - Left pane: label "YOUR SOURCE" + 7 gray line bars of varying widths (80%, 95%, 60%, 90%, 75%, 85%, 50%)
    - Right pane: label "DRAFT" + 7 line bars, some with `.editor-line--highlight` class (scarlet-alpha-20% bg) at widths 85%, 90%, 70%, 80%, 95%, 65%, 45%
  - **Feedback row**: orchid-500 avatar circle "JK" + italic quote: "The tone in paragraph 2 needs more warmth — this reads too academic for the audience."
  - **Editorial flow**: horizontal text sequence: "Draft → Review → Adjustment → Publish" — Adjustment highlighted in scarlet-400 font-weight 600. No version metrics or revision dots — this is editorial discernment, not agile iteration.

## Section: HOW — 05 — Voice Preservation (id="how-voice")

- **Type**: `section section--dark`
- **Layout**: Centered header + voice comparison block
- **Section number**: "HOW — 05"
- **H2**: "You don't sound like a machine."
- **Body**: "Voice is treated as a constraint, not a vibe. We test, correct, and preserve your language until the work sounds like you."
- **Voice delta comparison**: `.voice-comparison` — max-width 700px centered
  - **Original block** (`.voice-block--original`): white-alpha-4% bg, default border
    - Label: "ORIGINAL PARAGRAPH" with document icon
    - Text: "The church has always been a movement at its core. When it forgets this, it becomes an institution managing decline. The missional impulse isn't a strategy — it's the DNA of the body of Christ, written into its very nature."
    - No highlighted phrases — text reads as continuous prose
  - **AI-assisted block** (`.voice-block--assisted`): scarlet-alpha-4% bg, scarlet-alpha-15% border
    - Label: "AI-ASSISTED PARAGRAPH" with pen icon (scarlet-400)
    - Text: Only new/changed phrases marked with `<mark>` tags (scarlet-alpha-15% bg):
      - "living organism, not a static structure"
      - "embedded from the beginning and always pressing outward"
    - Note: Highlighting reduced so the eye reads continuity, not diffing. Original text has no highlights — the reader sees what stayed the same naturally.
  - **Voice constraint chips**: 4 chips below:
    - "Tone: prophetic warmth" — chip--sage
    - "Vocabulary: theological" — chip--orchid
    - "Cadence: declarative" — chip--scarlet
    - "Constraint: no corporate language" — chip--dark

## Section: HOW — 06 — Templates + Customization (id="how-templates")

- **Type**: `section section--darker`
- **Layout**: Centered header + 3-tile template grid + fixed-vs-flexible chips
- **Section number**: "HOW — 06"
- **H2**: "Fast builds without chaos."
- **Body**: "Templates give speed and coherence. Customization keeps leaders feeling distinct." + italic: "We avoid bespoke rebuilds by keeping structure stable and expression flexible."
- **Template gallery**: `.template-grid` — 3 columns (2 on tablet, 1 on mobile), 20px gap
  - Each tile: rounded corners, light border, hover lifts (-4px) with shadow and scarlet-200 border
  - Tile preview: 4:3 aspect ratio with inner "page wireframe" (header bar + body bars + accent bar)
  - 3 archetypes (reduced from 6 — templates are reassurance, not a marketplace):
    1. **Movement Leader** — "Full platform with hero, topics, courses" — sage bg, scarlet accent
    2. **Scholar-Practitioner** — "Academic tone, book-focused" — orchid-50 bg, orchid accent
    3. **Formation Guide** — "Warm editorial, course-forward" — slate bg (#f1f5f9), sky blue accent (#0ea5e9)
- **Fixed vs Flexible breakdown** (below gallery):
  - "FIXED (STABLE)": chips (chip--dark) — IA, SEO schema, Page system, Routing
  - "FLEXIBLE (EXPRESSIVE)": chips (chip--scarlet) — Palette, Type scale, Hero layout, Modules, Highlights

## Section: HOW — 07 — With You vs For You (id="how-contract")

- **Type**: `section section--dark`
- **Layout**: Centered header + 2-column comparison
- **Section number**: "HOW — 07"
- **H2**: "This is not outsourcing."
- **Comparison columns**: `.comparison` — 2-column grid, max-width 800px centered
  - **Left — "We do with you"** (white-alpha-5% bg, default border):
    - Header with users icon (sage-400)
    - 4 items, each with unique sage-stroke SVG icon:
      1. Lane clarity and positioning (person icon)
      2. Course design and structure (book icon)
      3. Editorial decisions (pen icon)
      4. Discernment checkpoints (checkmark icon)
  - **Right — "We do for you"** (scarlet-alpha-6% bg, scarlet-alpha-15% border):
    - Header with wrench icon (scarlet-400)
    - 4 items, each with unique scarlet-stroke SVG icon:
      1. Platform setup and structure (layout icon)
      2. Automation and formatting (code icon)
      3. Translation support (globe icon)
      4. Circulation infrastructure (pulse/activity icon)

## Section: HOW — 08 — Human Judgment Checkpoints (id="how-checkpoints")

- **Type**: `section section--darker`
- **Layout**: `.split` — copy left, checkpoints right
- **Section number**: "HOW — 08"
- **H2**: "Some decisions must remain human."
- **Body**: "Because credibility is moral, not mechanical." + "The system is designed to force discernment where it matters most."
- **Checkpoints list**: `.checkpoints` — vertical stack, max-width 600px
  - Each checkpoint: flex row with gate circle (40px, white-alpha-6% bg, border-on-dark border) + text
  - 5 checkpoints with consistent shield icon (same gate motif — moral authority from consistency, not visual variety):
    1. **Voice calibration approval** — "You confirm the system captures your tone and language before anything publishes."
    2. **Evergreen priorities selection** — "You choose which topics to prioritize — not an algorithm."
    3. **Course design decisions** — "Pedagogical structure, depth, and audience are your call."
    4. **Disclosure & integrity choices** — "Where AI assisted, how it's labeled, what gets human attribution."
    5. **Final publish approval** (gate has scarlet-500 border, scarlet-400 icon) — "Nothing goes live without your explicit sign-off."
  - Checkpoints separated by 1px border-on-dark top borders

## Section: HOW — 09 — Timeline (id="how-timeline")

- **Type**: `section section--dark`
- **Layout**: Centered header + 2-column timeline grid (max-width 900px)
- **Section number**: "HOW — 09"
- **H2**: "A realistic timeline."
- **Body**: "Week-by-week launch to get a coherent platform live. Then steady iteration to build evergreen content and courses without overload."
- **Left column — Launch phase**:
  - Phase indicator: 48px scarlet-500 circle with lightning bolt SVG + "Launch" heading + "First 30 days" (scarlet-400)
  - Vertical timeline with connecting line (2px, border-on-dark):
    1. "Week 1–2: Onboarding & intake" — completed (sage-500 dot) — "Identity, sources, lane clarity, voice calibration begins."
    2. "Week 2–3: Platform build" — completed (sage-500 dot) — "Template selection, content architecture, first pages live."
    3. "Week 3–4: Launch & review" — active (scarlet-500 dot with `.pulse` animation) — "Platform goes live. First feedback loop. Adjustments."
- **Right column — Stabilize + Build phase**:
  - Phase indicator: 48px sage-500 circle with layers SVG + "Stabilize + Build" heading + "Next 60 days" (sage-400)
  - Timeline:
    1. "Month 2: Evergreen pipeline" — pending (gray dot) — "First batch of evergreen articles. SEO structure matures."
    2. "Month 2–3: Course development" — pending — "First course designed and structured from existing material."
    3. "Month 3: Relational circulation begins" — pending — "Cross-pollination with peer leaders begins. Circulation lifts."
- **Animations**: left column → reveal-left, right column → reveal-right (delay 200ms)

## Section: HOW — 10 — After Launch (id="how-after")

- **Type**: `section section--darker`
- **Layout**: `.split` — copy left, network SVG right
- **Section number**: "HOW — 10"
- **H2**: "After launch, steady rhythm."
- **Body**: "Your platform doesn't need constant attention. It needs faithful stewardship." + "Your work circulates through the ecology — through relationships, not algorithms alone. The pace is sustainable by design."
- **Narrative role**: Pre-closure. This section establishes ongoing rhythm and stewardship, not expansion or momentum. It prepares the reader for the moral boundary of HOW-11.
- **Network diagram**: Static SVG (viewBox 0 0 400 300) in a bordered container
  - Center node: 18px radius, scarlet-500 fill, "YOU" label in white
  - 6 peer nodes: 12px radius, mix of sage-500 and orchid-500 fills at 0.7 opacity
  - Solid lines from center to all peers (white-alpha-10%, stroke-width 1.5)
  - Dashed lines between select peers (white-alpha-6%, stroke-dasharray 4)
  - Two concentric glow circles around center node (scarlet-alpha-15% and scarlet-alpha-8%)
  - 3 "Peer leader" text labels (9px Inter, white-alpha-40%)
  - Caption below: "Circulation happens through relational links, at a pace you can sustain"

## Section: HOW — 11 — What We Don't Build (id="how-restraint")

- **Type**: `section section--dark`
- **Layout**: `.split` — copy left, not-building list right
- **Section number**: "HOW — 11"
- **Narrative role**: Final numbered section. Moral and architectural boundary before CTA. The HOW page must end on restraint, clarity of limits, and wisdom — not growth or momentum.
- **H2**: "Restraint is part of the design."
- **Body**: "Movemental is built to protect leaders from digital drift, not accelerate it."
- **Not-building list**: `.not-building-list` — vertical stack, max-width 640px
  - Each item: flex row with X-circle icon (scarlet-400) + text + chevron toggle
  - Clicking toggles `.open` class — reason text animates max-height 0→100px + opacity 0→1, chevron rotates 180°
  - 4 items:
    1. **"We don't chase viral content"** → "Viral dynamics reward outrage and novelty. Credibility requires patience and consistency. We optimize for trust, not clicks."
    2. **"We don't automate pastoral presence"** → "The work of being present to people can't be delegated to software. We reduce digital burden so you can show up in person."
    3. **"We don't build attention traps"** → "No infinite scroll, no engagement bait, no dark patterns. The goal is usefulness, not time-on-site."
    4. **"We don't optimize for everyone"** → "Movemental is intentionally narrow. Broad appeal would dilute the very credibility we're trying to protect."

## Section: Closing CTA (no id, no section number)

- **Type**: `section section--darker`, extra bottom padding
- **Layout**: `.quiet-section` — centered, max-width 620px
- **H2**: "If you're ready, begin discernment." — Playfair Display italic, weight 400
- **Body**: "The process starts with a conversation — not a contract. We want to understand your work before we propose anything."
- **Section divider**: gradient line, 200px centered
- **Two CTAs**:
  1. "Start discernment" — btn-primary (scarlet-500)
  2. "Read the Why" — btn-secondary (outline), links to why.html

---

## JavaScript Interactions Summary (`scripts/main.js`)

| Function | Trigger | Effect |
|----------|---------|--------|
| `initScrollProgress` | scroll event | Updates `.scroll-progress` width as percentage of page scroll |
| `initNavScroll` | scroll event | Adds/removes `.scrolled` class on nav when scrollY > 40 |
| `initRevealAnimations` | IntersectionObserver | Adds `.visible` class to `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale` elements |
| `initDisclosures` | click on `.disclosure-trigger` | Toggles `.open` class on parent `.disclosure` |
| `initPipelineNodes` | click on `.pipeline-node-header` | Toggles `.open` on node, closes sibling nodes (accordion) |
| `initNotBuildingItems` | click on `.not-building-item` | Toggles `.open` class (shows/hides reason text) |
| `initStepper` | click on `.step` | Updates step/connector states, shows/hides wizard panels |
| `initConstraintBars` | IntersectionObserver | Adds `.animated` class to trigger CSS width transitions |
| `initTrackBars` | IntersectionObserver | Adds `.animated` class to `.track-fill` elements |
| `initContentOrbit` | IntersectionObserver + rAF | Two canvases: stuck orbit (tiny circle) vs moving orbit (network traversal) |
| `initSignalDiagram` | IntersectionObserver | Sets stroke-dasharray/offset on `.draw-path` SVGs for draw-on effect |
| `initCredibilityChart` | DOMContentLoaded | Creates SVG chart with two curves + legend in `#cred-amp-chart` |

---

## CSS Component Library Summary (`styles/main.css`)

| Component | Class(es) | Description |
|-----------|-----------|-------------|
| Scroll progress | `.scroll-progress` | Fixed 3px gradient bar at top |
| Navigation | `.site-nav`, `.nav-inner`, `.nav-logo`, `.nav-links`, `.nav-cta`, `.nav-toggle` | Fixed nav with scroll-aware backdrop |
| Buttons | `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-ghost` | Pill-shaped buttons with hover states |
| Cards | `.card`, `.card--dark` | Rounded containers with hover elevation |
| Disclosure | `.disclosure`, `.disclosure--dark`, `.disclosure-trigger`, `.disclosure-content` | Expandable sections with chevron rotation and grid-row animation |
| Split layout | `.split`, `.split--reverse` | 2-column grid, responsive to 1-column |
| Cards grid | `.cards-grid` | 3-column grid, responsive to 1-column |
| Stepper | `.stepper`, `.step`, `.step-number`, `.step-label`, `.step-connector` | Horizontal wizard indicator |
| Wizard panel | `.wizard-panel`, `.wizard-panel--dark` | Container for step content |
| Timeline | `.timeline`, `.timeline-item`, `.timeline-dot` | Vertical timeline with connecting line |
| Comparison | `.comparison`, `.comparison-col--left`, `.comparison-col--right` | Two-column comparison with different tints |
| Template gallery | `.template-grid`, `.template-tile`, `.template-preview`, `.template-meta` | Responsive tile grid with hover lift |
| Chips | `.chip`, `.chip--sage`, `.chip--scarlet`, `.chip--orchid`, `.chip--dark` | Uppercase pill labels |
| Case study strip | `.case-strip`, `.case-card` | 3-column image+caption cards |
| Constraint bars | `.constraint-bar`, `.constraint-bar-track`, `.constraint-bar-fill` | Animated single-fill comparison bars |
| Voice comparison | `.voice-comparison`, `.voice-block--original`, `.voice-block--assisted`, `mark` | Side-by-side text comparison blocks |
| Funnel (retained CSS) | `.funnel`, `.funnel-stage`, `.funnel-arrow` | Horizontal flow diagram (replaced by layered stack in HTML) |
| Not-building list | `.not-building-list`, `.not-building-item` | Expandable rejection list |
| Editor mockup | `.editor-mock`, `.editor-toolbar`, `.editor-panes`, `.editor-pane`, `.editor-feedback` | App window simulation |
| Pipeline | `.pipeline`, `.pipeline-node`, `.pipeline-connector` | Vertical accordion pipeline |
| Checkpoints | `.checkpoints`, `.checkpoint`, `.checkpoint-gate` | Vertical gate list |
| Micro-callout | `.micro-callout` | Inline pill with icon + text |
| Section number | `.section-number` | Space Grotesk label (e.g. "WHY — 01") |
| Quiet section | `.quiet-section`, `.telos-line`, `.lament` | Text-centered closing sections |
| Rule motif | `.rule-motif` | Clock icon + time commitment badge |
| Video placeholder | `.video-placeholder`, `.play-button`, `.video-label` | 16:9 video embed placeholder |
| Section divider | `.section-divider` | Gradient horizontal rule |
| Footer | `.site-footer`, `.footer-inner`, `.footer-logo`, `.footer-links`, `.footer-copy` | Dark bottom bar |
| Network canvas | `.network-canvas` | Canvas element (removed — WHY-04 now uses static SVG) |
| Content viz | `.content-viz`, `.content-viz-card--stuck`, `.content-viz-card--moving` | Canvas containers for orbit animations |
| Diagram container | `.diagram-container` | SVG wrapper with max-width |
| Draw path | `.draw-path` | SVG stroke animation (dasharray/offset) |
| Animations | `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale`, `.stagger`, `.pulse`, `.float` | Scroll-triggered entrance animations |

---

## Section Background Pattern

Both pages alternate between two dark background variants:

- `section--dark`: flat `var(--sage-900)` (#161d16)
- `section--darker`: vertical gradient from sage-900 to sage-950 (#161d16 → #0f140f)

The hero sections both use `section--darker`. After that, sections alternate: dark → darker → dark → darker → etc. This creates subtle depth variation without ever going light.
