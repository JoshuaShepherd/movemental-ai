# Movemental site — media & visualization inventory

**Generated:** 2026-04-13  
**Method:** Executed [docs/build/prompts/site-pages-media-visualization-inventory.md](../prompts/site-pages-media-visualization-inventory.md) against `src/app/(site)/**` and `src/components/sections/home-*.tsx`.  
**Design alignment:** [docs/design/DESIGN.md](../../design/DESIGN.md) (The Digital Curator — tonal stacking, restrained primary, semantic tokens).

**Conventions:** Placeholder raster URLs (`lh3.googleusercontent.com/aida-public/...`) are listed as **first-party replacements required**; subject taken from existing `alt` or section role. **Icon** = Lucide (or equivalent) unless noted.

---

## Production playbooks (DESIGN.md–aligned)

Use these sections to route work: **generative raster** (editorial stills only), **data/schematic JS**, or **code-only** implementation. Brand anchors for any generative brief: **Inter-class grotesk** mood in scene styling (no type overlay unless explicitly briefed), palette discipline **#101820** (midnight), **#f7f9fb / #ffffff** (air), ink **#2a3439**, muted **#566166**, accent **#0053db** used sparingly (props, edge light, single garment detail—not full fields of blue). Style: *The Digital Curator*—high-end editorial, soft natural light, shallow depth, **tonal stacking** feeling in sets (warm gray environments, not neon SaaS). **No** pasted drop shadows in prompts; **no** pure black; **no** busy collage UI chrome unless the slot is explicitly a **product screenshot** (those stay first-party).

### 1. Nano Banana 2 / Midjourney — editorial & atmosphere rasters

Use generative image models **only** where the inventory calls for **photography, texture, or editorial stills**—not for product UI truth, logos, or legally sensitive captures.

**Global negative / guardrails (append to each prompt):** “No readable UI, no fake logos, no watermark, no lens-flare cliché, no stock ‘handshake in lobby’ vibe; photoreal or contemporary editorial; color grade harmonized to deep blue-gray shadows and warm highlights; subtle grain OK.”

| Route / slot | Aspect | Subject | Style notes | Example prompt (copy-ready) |
| ------------ | ------ | ------- | ----------- | --------------------------- |
| `/` HomeAudiences card 1 | **16:10** | Movement leader addressing a small diverse group in a modern civic or learning space | Grayscale-friendly base exposure, strong silhouette, **single restrained blue accent** (chair edge or book spine) | “Editorial photograph, movement leader facilitating discussion with attentive adults, contemporary architecture, soft side light, muted palette with deep blue-gray shadows #101820 and warm off-white walls #f7f9fb, subtle accent #0053db on one object only, 16:10, photoreal, calm authority, no logos” |
| `/` HomeAudiences card 2 | **16:10** | Sacred-space interior as environment (empty or lightly occupied) | Reverent, quiet, architectural | “Editorial interior, modern church nave or chapel with honest materials and daylight, restrained color, blue-gray shadow tones, 16:10, photoreal, contemplative, no crosses or denominational marks if ambiguous—prefer abstract architecture” |
| `/` HomeAudiences card 3 | **16:10** | Nonprofit team huddle / mission-driven workspace | Warm, human, documentary | “Documentary editorial, diverse nonprofit team collaborating around a table with laptops closed, human faces natural, environment #f0f4f7 feel, ink-like shadows #2a3439, 16:10, photoreal, premium nonprofit annual-report aesthetic” |
| `/` HomeAudiences card 4 | **16:10** | Institutional partnership / civic table | Institutional trust without cliché stock | “Editorial photograph, small roundtable with civic or institutional leaders listening deeply, neutral modern room, restrained palette, one blue #0053db accent in clothing or book, 16:10, photoreal, dignified” |
| `/` optional future HomeHero still | **21:9** or **2:1** | Abstract documentary still—texture, fabric, paper, architecture macro | **Midnight-safe**: mostly dark with lift in highlights | “Cinematic wide still, abstract close environment—linen, paper fibers, brushed metal—moonlit cool highlights on #101820 field, specular edge light hinting #0053db, ultra-wide 21:9, no text, moody editorial” |
| `/about` origin portrait | **~3:4** (match layout) | Founder / principal portrait or **environmental portrait** | Editorial magazine | “Environmental portrait, thoughtful leader in minimal studio with single plant or shelf, soft window light, wardrobe neutral with one ink or navy tone, background #f7f9fb family, 3:4, photoreal, intimate not heroic” |
| `/about` “what became clear” architecture | **per block** | Built artifact: studio shelf, books, model, wall of frames—**tangible proof** | Intentional **grayscale** base for code treatment | “Editorial still life, curated wall of framed essays and books suggesting publishing craft, soft shadows, grayscale-ready contrast, cool undertone, photoreal, no legible copyrighted cover art—blur spines” |
| `/case-studies` hero | **~16:9** | Outcomes atmosphere—team reviewing printed report or wall of sticky synthesis | Proof without fake metrics | “Editorial photograph, strategy session aftermath—organized sticky notes on glass wall shallow DOF, faces optional blurred, palette aligned to #f0f4f7 and #2a3439, restrained blue accent, 16:9, photoreal” |
| `/case-studies` narrative inline | **4:3**–**3:2** | Workshop / facilitation moment | Warm documentary | “Documentary editorial, facilitator at whiteboard edge frame, participants in soft bokeh, honest light, muted palette, photoreal” |
| `/case-studies` closing wide | **16:9** | System / operations calm—server room **avoided**; prefer **organized desk + notebook** | Modern editorial | “Wide editorial photograph, calm desk with notebook and closed laptop suggesting depth of work, shadow #101820 bias in background corners, 16:9, photoreal, premium consulting report cover” |
| `/contact` hero | **3:4** | Warm “conversation” portrait | Grayscale-friendly + **gentle** | “Editorial portrait, same subject as site tone—approachable expert, slight smile, soft window light, neutral wardrobe, background minimal, 3:4, photoreal, grayscale conversion friendly” |
| `/evidence` hero decorative | **16:9** full-bleed feel | **Abstract texture** only | Low contrast for `opacity-20` under type | “Full-bleed abstract photographic texture, paper grain and faint diagonal light beams, very low contrast, colors restricted to #101820 with subtle #566166 lift, 16:9, no recognizable objects, seamless tile feel” |
| `/evidence` value proposition figure | **4:3** | Bright minimal gallery / atrium | Matches alt “Bright minimal office gallery space” | “Architectural interior, bright atrium with white plaster and warm wood bench, one plant, soft daylight, 4:3, photoreal, gallery calm, palette #ffffff / #f7f9fb / ink shadows” |
| `/faq` aside | **4:5** or **3:4** | Friendly editorial portrait or seated conversation | Approachable | “Editorial photograph, person seated listening with open posture, soft light, minimal set, 4:5, photoreal, trustworthy FAQ companion image” |
| `/methodology` hero | **~3:4** | Human-centered methodology—interview or synthesis | “Methodology is human” | “Editorial photograph, researcher typing notes after conversation, coffee cup, human warmth, shallow DOF, palette cool-warm balance, photoreal” |
| `/methodology` bento large | **16:10** | Structured workspace / systems wall | Show **structure** not fake UI | “Overhead editorial photograph, organized desk with index cards in grid suggesting system design, no readable text, muted palette, 16:10, photoreal” |
| `/services` (three figures) | **mixed** | Continuum: **listening → building → proof** | Cohesive series | “Triptych brief (generate three related images): (A) leader listening in circle 3:2, (B) hands arranging modular blocks on felt board 4:3, (C) calm handshake-free team walking modern corridor 16:9; shared color grade, #0053db accents rare, photoreal editorial” |
| `/services/organizational-systems` ×3 | **16:9 / 4:3 / 3:2** | Org scale: **ops floor**, **integration diagram on glass** (no text), **outcome celebration** restrained | Institutional premium | “Three related editorial photographs for enterprise transformation story, no fake dashboards, photoreal, restrained blue, cool gray shadows” |
| `/services/system-builds` “build environment” | **16:9** | **Muted** desk / engineer workspace for video frame | Will sit under `opacity-60` + grayscale | “Cinematic 16:9 workspace still, laptop half-closed, cable management neat, single warm practical lamp, moody but not gloomy, desaturated-ready, photoreal, no readable screens—screens dark” |
| `/services/system-builds/content-fundraising` hero | **~16:10** | Bridge metaphor—**library + generosity** without religious cliché | Editorial still life acceptable | “Editorial photograph, curated bookshelf beside simple donation envelope motif **without text**, warm light, 16:10, photoreal, nonprofit sophistication” |
| `/system` hero decorative | **16:9** | Midnight abstract (match Evidence hero role) | Same as evidence decorative, darker | “Seamless abstract texture for dark UI band, noise and soft vignette, colors #101820–#2a3439 only, subtle lift, 16:9” |
| `/system` layer 1 image | **4:5** | Architecture / facade as “content & pathways” metaphor | **Grayscale + contrast** for code | “Vertical editorial photograph, modern building facade rhythm suggesting pathways, 4:5, photoreal, high micro-contrast for grayscale conversion” |
| `/system` layer 2 image | **4:3** | Studio collaboration | Grayscale | “Editorial 4:3, two people co-editing printed outline on table, faces partial, photoreal, grayscale-ready, calm” |
| `/walkthrough` ×3 | **16:9 / ~3:2 / 4:3** | Narrative: **atmosphere → contrast → synthesis** | Cohesive cool-warm grade | “Three-image series for product walkthrough: midnight city bokeh abstract; split desk showing messy vs organized papers (no text); team smiling at single laptop (screen dark), photoreal editorial” |
| `/who-we-serve` hero | **16:9** | Churches & institutions—**exterior or community hall** without sectarian symbols if ambiguous | Inclusive institutional | “Wide editorial photograph, civic-styled community hall exterior at golden hour, people entering blurred motion, dignified, 16:9, photoreal, palette restrained” |
| **Default OG / social** | **1200×630** | Lockup: **wordmark + short tag** on `background` or restrained midnight | Flat graphic **without** Inter from generator—keep background clean for later type overlay in Figma/code | “Clean marketing background plate only, subtle paper texture, horizontal 1200:630, color fields #f7f9fb and bottom weight toward #101820, **no text**, corner room for logo placement in post” |

**Explicitly not generative (capture or design in Figma/code instead):** `HomeEvidence` product screenshot; any slot requiring **real UI**, **client data**, or **legal accuracy**; icon rows; OG **final** lockup typography (use design tool or `next/og`).

**Midjourney parameter cheat sheet:** append `--ar 16:10` (etc.), `--style raw` for photographic truth; **Nano Banana 2:** specify aspect in words and “photoreal editorial” unless testing illustration.

---

### 2. JavaScript-first visualizations (charts, schematics, flows)

Use code-driven viz where the story needs **recomputable data**, **interaction**, **accessibility**, or **layout fidelity**—not raster. Prefer **semantic token colors** from CSS variables at render time (map `#0053db` → `hsl(var(--primary))` etc. in theme).

| Need | Library | When to choose it | Agent prompt pattern (copy-ready) |
| ---- | ------- | ----------------- | --------------------------------- |
| Marketing KPIs, simple trends, before/after bars, pricing tier comparisons | **Recharts** (`recharts`) | Default for `/case-studies`, `/evidence`, `/pricing` if you add quant proof; React-friendly | “Add a `ResponsiveContainer` + `BarChart` comparing two periods for Movemental case study metrics; series colors from CSS variables `--primary`, `--muted-foreground`, `--foreground`; gridlines minimal `stroke-border`; tooltip uses `bg-card`; respect `prefers-reduced-motion`; no chartjunk; labels `text-muted-foreground`.” |
| Multi-series time series with annotations (cohorts, rolling averages) | **Recharts** or **Visx** (`@visx/xychart` + shapes) | Choose Visx when you need **non-standard** annotations or brush | “Build a Visx time series for monthly publishing output with a draggable brush synced to URL query; colors from tokens; midnight variant: invert text to `inverse-foreground`.” |
| Custom node–link diagram (ecosystem / “scenius” map, stakeholder graph) | **D3** (`d3-force`, `d3-selection`) or **React Flow** (`@xyflow/react`) | **React Flow** if nodes are interactive draggable; **D3** if static layout export | “Implement a read-only force-directed graph with <20 nodes, labels `text-xs text-muted-foreground`, edges `stroke-border`, primary node highlight `fill-primary`; `aria-label` summary table fallback; reduced motion disables simulation ticks.” |
| Sankey / multi-stage value flow (methodology, fundraising→content flow) | **D3 Sankey** (`d3-sankey`) or **Plot** (`@observablehq/plot`) | Plot for faster iteration in marketing prototypes; D3 for tight bundle control | “Sankey showing three stages Content → Formation → Distribution; link color `primary` at 30% opacity; node cards use `bg-card`; tooltips explain each stage; width responsive.” |
| Sunburst / hierarchy (org capabilities tree) | **D3 partition** or **Observable Plot** | Rare; use if `/services/organizational-systems` gains a **live** capability map | “Sunburst of service taxonomy from JSON; inner radius for category; color ramp from `--muted` to `--elevated`; focus+legend keyboard accessible.” |
| Sparklines embedded in cards | **Recharts `LineChart` minimal** or custom **SVG** | Sparklines in bento tiles | “2×24 sparkline in card footer; stroke `primary`; no axes; `aria-hidden` with numeric summary in `sr-only`.” |
| Simple flowchart / swimlane **in docs or internal** | **Mermaid** (`mermaid`) | **Not** for public hero art—OK for `/methodology` appendix MDX or PDF export | “Mermaid `flowchart LR` for six-layer design chain L0–L5; monochrome nodes; export SVG for docs.” |
| 3D / spatial metaphor (only if brand explicitly expands) | **three.js** + **@react-three/fiber** | Avoid unless art-directed; performance cost | “Defer unless requested: low-poly abstract ‘layers’ sculpture, midnight fog, **no** UI metaphor.” |

**Inventory tie-ins (slots that would *benefit* from JS viz if product adds proof):** case-studies outcome section; evidence “structured system” if metrics exist; methodology flow strip (replace static icon row with scroll-scrubbed step graphic **only** if IA adds data); pricing “why it works” comparative chart **if** numbers are real and sourced; organizational-systems early grid if `ScatterChart` icon becomes a **real** scatter of anonymized engagements.

---

### 3. React / Tailwind / Next — code-agent execution (not generative image)

These items must ship as **typed components**, **tokens**, and **real media**—not as Midjourney/NB2 outputs.

| Workstream | Scope | Agent prompt pattern (copy-ready) |
| ---------- | ----- | --------------------------------- |
| **Placeholder purge** | All `next/image` src pointing at `lh3.googleusercontent.com` / Stitch | “Replace every external placeholder `Image` src in `src/app/(site)` with `public/images/...` WebP paths; preserve `sizes`, `priority` only on true LCP hero; run `pnpm lint`.” |
| **OG + Twitter metadata** | `src/app/layout.tsx` gap | “Add `metadata.openGraph.images` and `twitter.images` default 1200×630 using `metadataBase`; optional `ImageResponse` route for dynamic OG later; document alt text policy.” |
| **HomeEvidence screenshot** | Product-in-use band | “Capture authenticated UI in staging with anonymized data; export PNG; apply bottom midnight gradient scrim in CSS as already spec’d; `alt` describes UI function not marketing fluff.” |
| **Grayscale + hover interactions** | HomeAudiences, contact hero, system-builds video band | “Verify CSS filters (`grayscale`, hover color) respect `prefers-reduced-motion` where transitions exist; ensure focus states on cards still meet contrast.” |
| **Midnight decorative images** | Evidence, system, walkthrough heroes | “Confirm `alt=""`, `aria-hidden`, `opacity-20` pattern; no informational content solely in image.” |
| **Icon consistency** | Lucide set per appendix | “Map appendix icon names to a single import barrel or tree-shaken imports; verify stroke weights match nav shell; do not swap to alternate icon packs.” |
| **Arrow duplication** | FAQ + global note | “Replace inline `ArrowRight` link rows with `ArrowLink` primitive where copy fits; keep one pattern for analytics.” |
| **`/manifesto` route** | Nav-only today | “Scaffold `manifesto/page.tsx` with `Section` bands; **no** assets until copy approved.” |
| **Foundation hairline** | `foundation/page.tsx` | “Keep `h-px w-8` rule divider as CSS per DESIGN.md—do not rasterize.” |
| **System AI motif** | Layer 3 | “Retain CSS ring/spinner motif; if marketing demands illustration, add **SVG** in code with token strokes—not PNG.” |
| **System page contrast filters** | `contrast-125` grayscale images | “Audit CLS when filters toggle; ensure images have explicit `width`/`height`.” |
| **Video loop future** | Home hero optional | “If adding `next/video` or background video, ship poster frame as optimized WebP + `prefers-reduced-motion` static fallback.” |
| **Footer / nav** | Global chrome | “Confirm zero raster logos in footer; glass nav uses `bg-card/80` + `backdrop-blur` tokens only.” |

---

## `/` (Home)

**Source file(s):** `src/app/(site)/page.tsx`, `src/components/sections/home-*.tsx`

| # | Section / component | Placement | Kind | Role | Spec notes |
|---|---------------------|-----------|------|------|------------|
| 1 | `HomeHero` | Full-width hero band | — | **No raster/SVG hero asset today** | Typographic + CTAs only. Optional future: single midnight-safe hero still or slow-motion loop—only if IA explicitly adds it; do not assume. |
| 2 | `HomeAudiences` | Card header (×4) | Image | Humanize each audience segment | **16:10** (`aspect-[16/10]`). Replace placeholder URLs; **grayscale → full color on hover** (keep or revise per art direction). Subjects: leader+audience; church interior; nonprofit team; institutional collaboration. |
| 3 | `HomeMechanism` | Step card leading (×3) | Icon | Encode Capture / Connect / Sustain | `ScanLine`, `Link2`, `RefreshCw` — `h-8 w-8`, `text-muted-foreground`. |
| 4 | `HomeBento` | Card leading (×6) | Icon | “What this enables” vocabulary | `GraduationCap`, `Users`, `Clock`, `Wallet`, `Bot` — `h-6 w-6` in `h-14 w-14` rounded tile; hover swaps tile to `foreground`. |
| 5 | `HomeEvidence` | Midnight split, right column | Image | Proof of real platform | **Screenshot** of product in use; tall crop (`lg:h-[600px]`), `rounded-3xl`, bottom **gradient scrim** to midnight. First-party capture + disclosure if UI shows client data. |
| 6 | `HomeEvidence` | Proof list (×3) | Icon | Reinforce checklist read | `CheckCircle2` per row on midnight surface. |
| 7 | `HomePhilosophy`, `HomeShift`, `HomeCoreDefinition`, `HomeSolution`, `HomeDifferentiation`, `HomeEconomics`, `HomeValues`, `HomeTheology`, `HomeFinalCta` | — | — | **No `Image` / page-specific icons in code** | Typography + surfaces only. |

---

## `/about`

**Source file(s):** `src/app/(site)/about/page.tsx`

| # | Section / component | Placement | Kind | Role | Spec notes |
|---|---------------------|-----------|------|------|------------|
| 1 | Origin / editorial split | Portrait column | Image | Human anchor for “why we exist” | Replace Stitch URL; editorial portrait or environment; aspect per layout (see `Image` width/height in block ~117). |
| 2 | What became clear / asymmetric | Architecture / proof photo | Image | Tangible “what was built” | Second `Image` (~180); **grayscale** treatment in code — confirm intentional for launch. |
| 3 | What we do / service intro | Icon row (×4) | Icon | Four capability phrases | `Layers`, `Route`, `GraduationCap`, `Bot` in small cards. |
| 4 | Our approach / “We don’t” | Inline | Icon | Contrast marker | `Ban` (per layout). |
| 5 | Where we’re going / CTAs | Link rows | Icon | Direction affordance | `ArrowRight` inline (×3) — consider consolidating with `ArrowLink` pattern globally. |

---

## `/case-studies`

**Source file(s):** `src/app/(site)/case-studies/page.tsx`

| # | Section / component | Placement | Kind | Role | Spec notes |
|---|---------------------|-----------|------|------|------------|
| 1 | Hero / proof band | Background or featured | Image | Establish “visible results” | First `Image` (~62); align with midnight/section treatment in code. |
| 2 | Case narrative | Inline figure | Image | Evidence of work | Second `Image` (~209). |
| 3 | Closing / synthesis | Wide figure | Image | Outcome or system view | Third `Image` (~284). |
| 4 | Various | List / grid | Icon | Status + category vocabulary | `Check`; tile set `Landmark`, `CreditCard`, `Database`, `Brain` with labels (Governance / Fundraising / Content / AI). |

---

## `/contact`

**Source file(s):** `src/app/(site)/contact/page.tsx`

| # | Section / component | Placement | Kind | Role | Spec notes |
|---|---------------------|-----------|------|------|------------|
| 1 | Hero | Right column (hidden below `md`) | Image | Warm, editorial “conversation” tone | **3:4** `aspect-[3/4]`, `rounded-xl`, **grayscale + hover scale**; `TODO(assets)` in code — first-party studio or portrait. |
| 2 | Who this is for | Audience bento cards | Icon | Segment the inquiry | `Building2`, `Network`, `Church` — card-level. |
| 3 | Preparation / after panel | Bullets / panel chrome | Icon | Micro affordances | `ArrowRight` on primary CTA row; `X` on dismiss-style row (~243). |

---

## `/cookies`

**Source file(s):** `src/app/(site)/cookies/page.tsx`

| # | Section / component | Placement | Kind | Role | Spec notes |
|---|---------------------|-----------|------|------|------------|
| — | — | — | — | **No media in code** | Legal prose only. |

---

## `/evidence`

**Source file(s):** `src/app/(site)/evidence/page.tsx`

| # | Section / component | Placement | Kind | Role | Spec notes |
|---|---------------------|-----------|------|------|------------|
| 1 | Hero | Absolute full-bleed under copy | Image | Texture / depth on midnight | **Decorative:** `alt=""`, `aria-hidden`, `opacity-20`, `object-cover`. Replace with first-party abstract or documentary still; no informational content in image alone. |
| 2 | Proof grid / “What we proved” | Icon cards | Icon | Category of proof | `BookOpen`, `Radio`, `Database` (mapped in grid data). |
| 3 | Problem / contrast | Inline | Icon | “Not proven” signal | `XCircle` (~222). |
| 4 | Structured system | List | Icon | Positive checklist | `CheckCircle2` (×3). |
| 5 | Value proposition | Left column | Image | Editorial relief on light band | **4:3**, `rounded-xl`, `shadow-ambient`; alt describes environment (“Bright minimal office gallery space”) — replace URL; ensure alt reflects final art. |

---

## `/faq`

**Source file(s):** `src/app/(site)/faq/page.tsx`

| # | Section / component | Placement | Kind | Role | Spec notes |
|---|---------------------|-----------|------|------|------------|
| 1 | Hero / aside | Supporting column | Image | Humanize FAQ entry | Single `Image` (~162); replace placeholder. |
| 2 | Links / accordion CTAs | Inline | Icon | `ArrowRight` next to link copy | Page-level duplicate of arrow pattern — see Global. |

---

## `/methodology`

**Source file(s):** `src/app/(site)/methodology/page.tsx`

| # | Section / component | Placement | Kind | Role | Spec notes |
|---|---------------------|-----------|------|------|------------|
| 1 | Hero | Split / portrait card | Image | Anchor “methodology is human” | First `Image` (~82). |
| 2 | System built / bento | Large panel | Image | Show structure / workspace | Second `Image` (~290). |
| 3 | Extraction / flow | Various | Icon | Step labels + emphasis | `Search`, `TrendingUp`, `Users`, `Brain` in flow strip; `Network` (large), `FileText`, `TrendingUp`, `Workflow` in lower sections (see file for placement). |

---

## `/pricing`

**Source file(s):** `src/app/(site)/pricing/page.tsx`

| # | Section / component | Placement | Kind | Role | Spec notes |
|---|---------------------|-----------|------|------|------------|
| 1 | Investment hero | — | — | **No `Image`** | Midnight `rounded-xl` panel — tonal only. |
| 2 | For Movement Leaders | List rows | Icon | Pricing semantics | `Landmark`, `TrendingUp`, `Ban`. |
| 3 | For Organizations | Callout strip | Icon | Delivery emphasis | `Zap` in `bg-card` strip. |
| 4 | Why it works | Requirement tiles (×4) | Icon | “Requires” grid | `Users`, `Building`, `Network`, `Headphones`. |
| 5 | What you’re paying for | Header + cards | Icon | Negation + deliverables | `Ban` (×2, `text-destructive`); cards: `Puzzle`, `Book`, `GraduationCap`, `Route`. |
| 6 | Why different | Left column | Icon | “Most orgs pay for” lines | `Info` (×2). |

---

## `/privacy`

**Source file(s):** `src/app/(site)/privacy/page.tsx`

| — | — | — | — | **No media in code** | |

---

## `/services`

**Source file(s):** `src/app/(site)/services/page.tsx`

| # | Section / component | Placement | Kind | Role | Spec notes |
|---|---------------------|-----------|------|------|------------|
| 1 | Hero / narrative | Primary visual | Image | Services promise | First `Image` (~156). |
| 2 | Mid-page | Split / feature | Image | Continuation of editorial story | Second `Image` (~263). |
| 3 | Closing / proof | Supporting | Image | Credibility | Third `Image` (~334). |
| 4 | Problem / static reality | Cards / list | Icon | Offering map | Card icons: `Network`, `Compass`, `GraduationCap`, `Brain`. |
| 5 | Links | CTAs | Icon | `ArrowRight`, `ArrowUpRight` | |

---

## `/services/organizational-systems`

**Source file(s):** `src/app/(site)/services/organizational-systems/page.tsx`

| # | Section / component | Placement | Kind | Role | Spec notes |
|---|---------------------|-----------|------|------|------------|
| 1 | Hero | Full-bleed or featured | Image | Org-scale systems tone | First `Image` (~96). |
| 2 | Mid narrative | Figure | Image | Operations / integration | Second `Image` (~218). |
| 3 | Lower band | Figure | Image | Outcome / team | Third `Image` (~302). |
| 4 | Early grid | Capability tiles | Icon | `ArrowUpDown`, `ScatterChart`, `Users`, `Network` | |
| 5 | Mid sections | Pairs / callouts | Icon | `FileText`, `CreditCard`; `Brain` hero icon; `Gavel`, `Compass` | |
| 6 | Lower bento | Stack visual | Icon | `SquareStack` (×2 in layout). |
| 7 | Closing | Callout | Icon | `Construction` | |

---

## `/services/system-builds`

**Source file(s):** `src/app/(site)/services/system-builds/page.tsx`

| # | Section / component | Placement | Kind | Role | Spec notes |
|---|---------------------|-----------|------|------|------------|
| 1 | Build cards (×4) | Per-card feature rows | Icon | Map builds to features | **Unique set:** `Compass`, `Workflow`, `Network`, `Cpu`, `Sparkles`, `LayoutDashboard`, `ShieldCheck`, `FileText`, `BarChart3`, `TrendingUp` (see `builds[]`). |
| 2 | Build environment | Midnight `aspect-video` | Image | “Real-time build” metaphor | **16:9** video frame; `opacity-60` + **grayscale** + overlay quote; replace with first-party workspace/desk still or muted loop. |
| 3 | Value vs clarity | Section header | Icon | Editorial marker | `Info` `h-12 w-12` centered. |

---

## `/services/system-builds/content-fundraising`

**Source file(s):** `src/app/(site)/services/system-builds/content-fundraising/page.tsx`

| # | Section / component | Placement | Kind | Role | Spec notes |
|---|---------------------|-----------|------|------|------------|
| 1 | Hero / split | Featured | Image | Content + fundraising bridge | Single `Image` (~189). |
| 2 | Problem / contrast | Columns | Icon | `Blend`, `EyeOff` | |
| 3 | Body lists | Inline | Icon | `Network`, `Plug` | |
| 4 | Closing tiles | Pair | Icon | `Network`, `BarChart3` | |

---

## `/services/system-builds/foundation`

**Source file(s):** `src/app/(site)/services/system-builds/foundation/page.tsx`

| # | Section / component | Placement | Kind | Role | Spec notes |
|---|---------------------|-----------|------|------|------------|
| 1 | Governance — current state | List (×3) | Icon | Problem statements | `AlertCircle`, `RefreshCw`, `AlertTriangle`. |
| 2 | Governance — links | Micro | Icon | `ArrowRight` small (~155–164). |
| 3 | Governance — outcomes | Checklist | Icon | `Check` | |
| 4 | Ethics / Lab — cards | Capability (×3) | Icon | `Beaker`, `Microscope`, `Users` | |
| 5 | Eyebrow rules | Horizontal rule | — | **CSS hairline** (`h-px w-8`) — not an exportable asset | Allowed dense-UI exception per DESIGN.md. |

---

## `/system`

**Source file(s):** `src/app/(site)/system/page.tsx`

| # | Section / component | Placement | Kind | Role | Spec notes |
|---|---------------------|-----------|------|------|------------|
| 1 | Hero | Absolute bg | Image | Midnight depth | Decorative: `alt=""`, `aria-hidden`, `opacity-20` — replace with first-party abstract texture. |
| 2 | Breakdown — layer 1 | Left `aspect-[4/5]` | Image | Content & pathways | **4:5**, **grayscale + contrast-125**; architecture/facade metaphor. |
| 3 | Breakdown — layer 2 | Right `aspect-[4/3]` | Image | Formation | **4:3**, **grayscale**; studio/collaboration. |
| 4 | Breakdown — layer 3 (AI) | Square midnight card | — | **CSS ring** (`border` spinner motif) | Not raster; optional future illustration if marketing wants explicit “AI” mark. |
| 5 | Layer 1 list | Bullets | Icon | `Compass`, `Route` | |
| 6 | Difference | Two columns | Icon | `Plug`, `Fingerprint` | |

---

## `/terms`

**Source file(s):** `src/app/(site)/terms/page.tsx`

| — | — | — | — | **No media in code** | |

---

## `/walkthrough`

**Source file(s):** `src/app/(site)/walkthrough/page.tsx`

| # | Section / component | Placement | Kind | Role | Spec notes |
|---|---------------------|-----------|------|------|------------|
| 1 | Hero | Midnight bg | Image | Full-bleed atmosphere | First `Image` (~66); check `alt` / scrim in code. |
| 2 | Difference / steps | Step imagery | Image | “Current vs Movemental” | Second `Image` (~177). |
| 3 | What you’re seeing | Tile / figure | Image | Synthesis | Third `Image` (~314). |
| 4 | Difference header | Label | Icon | `Network` | |
| 5 | Steps / connector | Vertical rhythm | Icon | `AlignVerticalSpaceAround`, `GraduationCap` (see layout). |
| 6 | Tiles / synthesis | 3-tile row | Icon | `ArrowUpRight`, `Network`, `Hourglass` (per data structure ~448–453). |
| 7 | Why matters / lists | Bullets | Icon | `Check`, `Sparkles` | |
| 8 | Negative path | Inline | Icon | `X` | |

---

## `/who-we-serve`

**Source file(s):** `src/app/(site)/who-we-serve/page.tsx`

| # | Section / component | Placement | Kind | Role | Spec notes |
|---|---------------------|-----------|------|------|------------|
| 1 | Hero | Supporting | Image | Churches & institutions tone | Single hero `Image` (~87). |
| 2 | What we build | Icon tiles (×4) | Icon | Outcome phrases | `BookOpen`, `Route`, `GraduationCap`, `RefreshCw`. |
| 3 | Lower comparison | Rows | Icon | `Brain`, `MessageSquare`, `Lightbulb` | |

---

## `/manifesto` (nav-only)

**Source file(s):** *No `page.tsx` at audit time*

| # | Section / component | Placement | Kind | Role | Spec notes |
|---|---------------------|-----------|------|------|------------|
| — | — | — | — | **TBD — route not implemented** | Linked from `nav-links.ts` only. Defer media list until page exists. |

---

## Global chrome & UI shell

**Source file(s):** `src/components/nav/site-nav.tsx`, `site-nav-menus.tsx`, `mobile-nav.tsx`, `site-footer.tsx`, `src/components/primitives/arrow-link.tsx`, `src/components/ui/*` (as consumed)

| # | Area | Placement | Kind | Role | Spec notes |
|---|------|-----------|------|------|------------|
| 1 | Desktop primary nav | Dropdown triggers | Icon | `ChevronDownIcon` (`site-nav-menus.tsx`) | Single stroke weight with text. |
| 2 | Mobile nav | Open control | Icon | `Menu` (`mobile-nav.tsx`) | |
| 3 | Sheet / dialog (shadcn) | Close | Icon | `XIcon` in `sheet.tsx` / `dialog.tsx` | Product shell — list once. |
| 4 | Accordion | Disclosure | Icon | `ChevronDownIcon` / `ChevronUpIcon` (`accordion.tsx`) | |
| 5 | Dropdown menu | Items | Icon | `CheckIcon`, `ChevronRightIcon` | |
| 6 | `ArrowLink` | Trailing | Icon | `ArrowRight` | All pages using primitive share this — **do not duplicate per route** in asset production counts. |
| 7 | Site footer | — | — | **No logos or imagery in code** | Text links only. |

---

## Metadata & social

**Source file(s):** `src/app/layout.tsx`

| # | Placement | Kind | Role | Spec notes |
|---|-----------|------|------|------------|
| 1 | Default `metadata` | OG / Twitter card | Image | **Gap:** no `openGraph.images` or `twitter.images` defined | Add one **default OG** image (e.g. 1200×630) — editorial lockup on `background` or restrained midnight; wordmark + short tag; `metadataBase` already `https://movemental.com`. Per-route overrides optional later. |

---

## Appendix — Lucide icons referenced on marketing routes

Sorted unique names (site pages + home sections; **excludes** only importing UI primitives if not used on `(site)` pages — accordion/dropdown/sheet still listed under Global above).

`AlertCircle`, `AlertTriangle`, `AlignVerticalSpaceAround`, `ArrowRight`, `ArrowUpDown`, `ArrowUpRight`, `Ban`, `BarChart3`, `Beaker`, `Blend`, `Book`, `BookOpen`, `Bot`, `Brain`, `Building`, `Building2`, `Check`, `CheckCircle2`, `Church`, `Clock`, `Compass`, `Construction`, `Cpu`, `CreditCard`, `Database`, `EyeOff`, `FileText`, `Fingerprint`, `Gavel`, `GraduationCap`, `Headphones`, `Hourglass`, `Info`, `Landmark`, `Layers`, `LayoutDashboard`, `Lightbulb`, `Link2`, `Menu`, `MessageSquare`, `Microscope`, `Network`, `Plug`, `Puzzle`, `Radio`, `RefreshCw`, `Route`, `ScanLine`, `ScatterChart`, `Search`, `ShieldCheck`, `Sparkles`, `SquareStack`, `TrendingUp`, `Users`, `Wallet`, `Workflow`, `X`, `XCircle`, `Zap`

**Chevron / checkmarks inside `components/ui`:** also `ChevronDownIcon`, `ChevronUpIcon`, `ChevronRightIcon`, `CheckIcon`, `XIcon` (shell).

---

## Reviewer checklist (from prompt)

- [x] Every canonical **implemented** route has a table or “No media” line.  
- [x] Global icons not repeated per page (only page-specific sets tabulated per route).  
- [x] Each `next/image` usage accounted for (home + inner pages).  
- [x] `/manifesto` flagged TBD.  
- [x] OG image gap noted.  
- [x] System page AI “spinner” documented as CSS, not exportable raster.
