# Site-wide editorial chapel / nave hero — remaining image prompts

**Purpose:** Single source for **how many** marketing surfaces still need a **hero-grade** image in the **same lineage** as the existing Movemental chapel/nave generations, plus **copy-pasteable** prompts to produce every **remaining** asset.

**Canon prompt (verbatim seed):**

```text
Editorial interior photograph, modern church nave or chapel honest materials daylight restrained color blue-gray shadow tones contemplative quiet reverent atmosphere shallow depth of field photoreal, empty of people, avoid prominent denominational symbols prefer abstract architecture Movemental editorial The Digital Curator: restrained palette deep blue-gray shadows warm off-white highlights single rare electric blue accent #0053db only as small prop or edge light photoreal documentary calm premium publication no neon gradients no SaaS illustration
```

**Design alignment:** [docs/design/DESIGN.md](../../design/DESIGN.md) — *The Digital Curator*; hero or midnight-band imagery should read as **documentary calm**, not SaaS illustration. Implementation may use `next/image` with scrims (`bg-inverse-surface/…`) for text legibility; prompts do not specify UI.

---

## 1. How many pages need this kind of hero?

**Definitions**

| Term | Meaning |
|------|--------|
| **Route** | A `src/app/(site)/**/page.tsx` URL (26 total today). |
| **This kind of image** | **Editorial interior** sacred or sacred-adjacent architecture (nave, chapel, chancel approach), **same restraint spec** as the seed prompt above (blue-gray shadow bias, warm highlights, rare `#0053db` accent, empty of people, no neon, no SaaS art). |
| **Hero integration** | Full-bleed or large **first landmark band** / **midnight** background / **split hero** — not a tiny icon. |

**Counts (current repo, 2026-04-13)**

| Metric | Count | Notes |
|--------|------:|--------|
| Total `(site)` routes | **26** | All `page.tsx` under `src/app/(site)/`. |
| Legal / utility routes (hero **not** recommended) | **3** | `/privacy`, `/terms`, `/cookies` — typography-first; skip generative hero. |
| **Marketing / narrative routes** (hero editorial image *appropriate*) | **23** | \(26 − 3\). |
| Routes that **already** ship a **raster** hero / section `next/image` | **3** | `/about` (portrait), `/churches` (sanctuary aisle), `/evidence` (pews atmosphere). |
| Routes that **still lack any** wired hero raster | **20** | \(23 − 3\); these are the **primary** “remaining” set for production. |
| Of those 20, slots that **specifically** call for **chapel/nave DNA** (same prompt family, possibly sacred-adjacent wording for non-church pages) | **20** | One **distinct generation** per route below; subject line varies by audience, **tail** stays on-brand. |
| Routes **already** satisfied for **chapel/nave-style** editorial in code | **2** | `/churches`, `/evidence` — **do not re-brief** unless you want alternates. |
| **Optional** second layer | **1** | `/about` could add a **very dark** chapel/nave **midnight scrim** behind text while keeping the portrait; optional prompt §22. |

**Bottom line for stakeholders**

- **23** narrative/legal routes; **3** legal pages should **not** get this hero treatment → **20** pages “owe” a landmark editorial still (or non-photo treatment).
- **20 copy-paste prompts** below cover **every route that currently has no `next/image` hero** (excluding privacy/terms/cookies).
- **`/` (home)** is one of those 20 — highest leverage.
- **`/about`** already has a portrait; it is **not** in the 20 below, but an **optional** chapel-atmosphere background prompt is included if you want layered depth.

---

## 2. How to use these blocks

1. **Midjourney:** Paste **Midjourney (full line)**. Adjust `--ar` if your layout changes. Append the **shared `--no` tail** once per generation.
2. **Nano Banana 2 / Gemini Flash Image:** Paste **Nano Banana (same scene)**; no MJ flags.
3. **Integration:** Prefer **WebP**, width cap ~1920px hero, `next/image` + semantic scrim for type. See existing assets under `public/images/site/`.

---

## 3. Shared tails (append once)

**Midjourney negatives (append to every MJ line):**

```text
--no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, low-poly mascot, 3D cartoon character, plastic skin, HDR halos, prominent cross, denominational crest, readable signage
```

**Prose negative (if your tool has no `--no`):**

```text
No readable text, no watermark, no logos, no UI, no neon gradients, no SaaS illustration; photoreal documentary; calm premium publication.
```

---

## 4. Master clause (prepend to every route-specific opening)

Use this **exact** trailing clause on **every** prompt below (already included in each fenced block):

```text
Movemental editorial The Digital Curator: restrained palette deep blue-gray shadows warm off-white highlights single rare electric blue accent #0053db only as small prop or edge light photoreal documentary calm premium publication no neon gradients no SaaS illustration
```

---

## 5. Remaining routes — full copy/paste prompts

> **Aspect policy:** Default hero bands in this repo favor **wide** stills (`21:9` or `2:1`) for full-bleed; use **`--ar 16:10`** if the asset is for a **card** or split-column slot.

---

### 01 — `/` (Home)

**Placement:** Optional hero behind first `Section` (with scrim) or first midnight band texture. **Aspect:** `21:9`

**Midjourney (full line):**

```text
Editorial interior photograph, modern church nave or chapel wide central aisle honest wood and plaster materials soft daylight from clerestory restrained color blue-gray shadow tones contemplative quiet reverent atmosphere shallow depth of field photoreal empty of people avoid prominent denominational symbols prefer abstract architecture leading lines toward distant chancel wall Movemental editorial The Digital Curator: restrained palette deep blue-gray shadows warm off-white highlights single rare electric blue accent #0053db only as small prop or edge light photoreal documentary calm premium publication no neon gradients no SaaS illustration --ar 21:9 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, low-poly mascot, 3D cartoon character, plastic skin, HDR halos, prominent cross, denominational crest, readable signage
```

**Nano Banana 2 (same scene):**

```text
Editorial interior photograph, modern church nave or chapel, wide central aisle, honest wood and plaster, soft daylight from high windows, restrained blue-gray shadows and warm off-white highlights, shallow depth of field, empty of people, abstract architecture, contemplative quiet mood, photoreal, horizontal 21:9 frame, single rare electric blue accent #0053db only as a thin edge light or small prop, Movemental editorial The Digital Curator calm premium publication, no text, no logos, no watermark, no neon, no SaaS illustration.
```

---

### 02 — `/manifesto`

**Placement:** First landmark section or midnight band. **Aspect:** `21:9`

**Midjourney (full line):**

```text
Editorial interior photograph, small modern chapel side chapel space not nave honest stone and oak materials single narrow window beam restrained color blue-gray shadow tones contemplative quiet reverent atmosphere shallow depth of field photoreal empty of people avoid prominent denominational symbols prefer abstract architecture Movemental editorial The Digital Curator: restrained palette deep blue-gray shadows warm off-white highlights single rare electric blue accent #0053db only as small prop or edge light photoreal documentary calm premium publication no neon gradients no SaaS illustration --ar 21:9 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, low-poly mascot, 3D cartoon character, plastic skin, HDR halos, prominent cross, denominational crest, readable signage
```

**Nano Banana 2 (same scene):**

```text
Editorial interior photograph, intimate modern side chapel, stone and oak, single tall window with soft beam, restrained blue-gray shadows, warm highlights, empty, shallow depth of field, photoreal, 21:9, abstract sacred architecture without readable symbols, rare #0053db accent as edge light only, Movemental editorial The Digital Curator, no text, no logos.
```

---

### 03 — `/vision`

**Placement:** Hero or first `Section variant="midnight"` background. **Aspect:** `21:9`

**Midjourney (full line):**

```text
Editorial interior photograph, modern chapel interior looking toward far wall with soft backlight honest materials daylight restrained color blue-gray shadow tones contemplative quiet reverent atmosphere shallow depth of field photoreal empty of people avoid prominent denominational symbols prefer abstract architecture sense of depth and stillness Movemental editorial The Digital Curator: restrained palette deep blue-gray shadows warm off-white highlights single rare electric blue accent #0053db only as small prop or edge light photoreal documentary calm premium publication no neon gradients no SaaS illustration --ar 21:9 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, low-poly mascot, 3D cartoon character, plastic skin, HDR halos, prominent cross, denominational crest, readable signage
```

**Nano Banana 2 (same scene):**

```text
Editorial interior photograph, modern chapel toward far wall, soft backlight, depth and stillness, honest materials, blue-gray shadows, warm off-white highlights, empty, photoreal, 21:9, rare #0053db edge accent only, Movemental editorial The Digital Curator, no text, no logos, abstract architecture.
```

---

### 04 — `/movement-leaders`

**Placement:** First hero split or wide band under headline. **Aspect:** `16:10` (split column) or `21:9` (wide)

**Midjourney (full line):**

```text
Editorial interior photograph, modern chapel oratory reading nook within sacred architecture built-in oak seating and soft daylight restrained color blue-gray shadow tones contemplative quiet reverent atmosphere shallow depth of field photoreal empty of people avoid prominent denominational symbols prefer abstract architecture Movemental editorial The Digital Curator: restrained palette deep blue-gray shadows warm off-white highlights single rare electric blue accent #0053db only as small prop or edge light photoreal documentary calm premium publication no neon gradients no SaaS illustration --ar 16:10 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, low-poly mascot, 3D cartoon character, plastic skin, HDR halos, prominent cross, denominational crest, readable signage
```

**Nano Banana 2 (same scene):**

```text
Editorial interior photograph, modern chapel oratory corner with built-in oak seating, soft daylight, restrained blue-gray palette, contemplative empty space, photoreal 16:10, rare #0053db accent on book edge or chair trim only, Movemental editorial The Digital Curator, no people, no text, no logos, abstract architecture.
```

---

### 05 — `/nonprofits`

**Placement:** Hero wide or first `Section variant="section"` figure. **Aspect:** `21:9`

**Midjourney (full line):**

```text
Editorial interior photograph, contemporary nonprofit-owned chapel or multi-use sacred hall used for reflection honest plywood and painted plaster daylight restrained color blue-gray shadow tones contemplative quiet reverent atmosphere shallow depth of field photoreal empty of people avoid prominent denominational symbols prefer abstract architecture Movemental editorial The Digital Curator: restrained palette deep blue-gray shadows warm off-white highlights single rare electric blue accent #0053db only as small prop or edge light photoreal documentary calm premium publication no neon gradients no SaaS illustration --ar 21:9 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, low-poly mascot, 3D cartoon character, plastic skin, HDR halos, prominent cross, denominational crest, readable signage
```

**Nano Banana 2 (same scene):**

```text
Editorial interior photograph, contemporary multi-use sacred hall for a nonprofit, plywood and plaster, daylight, restrained blue-gray shadows, warm highlights, empty, photoreal 21:9, abstract architecture, rare #0053db accent, Movemental editorial The Digital Curator, no text, no logos.
```

---

### 06 — `/who-is-a-movement-leader`

**Placement:** Hero or supporting wide band. **Aspect:** `21:9`

**Midjourney (full line):**

```text
Editorial interior photograph, narrow modern chapel corridor or ambulatory with repeating arches honest materials daylight restrained color blue-gray shadow tones contemplative quiet reverent atmosphere shallow depth of field photoreal empty of people avoid prominent denominational symbols prefer abstract architecture rhythmic columns Movemental editorial The Digital Curator: restrained palette deep blue-gray shadows warm off-white highlights single rare electric blue accent #0053db only as small prop or edge light photoreal documentary calm premium publication no neon gradients no SaaS illustration --ar 21:9 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, low-poly mascot, 3D cartoon character, plastic skin, HDR halos, prominent cross, denominational crest, readable signage
```

**Nano Banana 2 (same scene):**

```text
Editorial interior photograph, narrow modern chapel ambulatory, repeating arches, honest materials, blue-gray shadows, warm highlights, empty, rhythmic depth, photoreal 21:9, rare #0053db edge light, Movemental editorial The Digital Curator, no text, no logos.
```

---

### 07 — `/how-it-works`

**Placement:** Opening hero texture. **Aspect:** `21:9`

**Midjourney (full line):**

```text
Editorial interior photograph, modern church nave from threshold viewpoint doors open to interior honest materials daylight restrained color blue-gray shadow tones contemplative quiet reverent atmosphere shallow depth of field photoreal empty of people avoid prominent denominational symbols prefer abstract architecture sense of entry and sequence Movemental editorial The Digital Curator: restrained palette deep blue-gray shadows warm off-white highlights single rare electric blue accent #0053db only as small prop or edge light photoreal documentary calm premium publication no neon gradients no SaaS illustration --ar 21:9 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, low-poly mascot, 3D cartoon character, plastic skin, HDR halos, prominent cross, denominational crest, readable signage
```

**Nano Banana 2 (same scene):**

```text
Editorial interior photograph, modern nave seen from threshold, sense of entry and sequence, honest materials, daylight, restrained blue-gray palette, empty, photoreal 21:9, rare #0053db accent, Movemental editorial The Digital Curator, no text, no logos, abstract architecture.
```

---

### 08 — `/system`

**Placement:** Midnight band or hero — **abstract architecture** emphasis. **Aspect:** `21:9`

**Midjourney (full line):**

```text
Editorial interior photograph, modern chapel ceiling and upper clerestory only abstract geometry of beams and glass honest materials daylight restrained color blue-gray shadow tones contemplative quiet reverent atmosphere shallow depth of field photoreal empty of people avoid prominent denominational symbols prefer abstract architecture no floor clutter Movemental editorial The Digital Curator: restrained palette deep blue-gray shadows warm off-white highlights single rare electric blue accent #0053db only as small prop or edge light photoreal documentary calm premium publication no neon gradients no SaaS illustration --ar 21:9 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, low-poly mascot, 3D cartoon character, plastic skin, HDR halos, prominent cross, denominational crest, readable signage
```

**Nano Banana 2 (same scene):**

```text
Editorial interior photograph, upward view of modern chapel clerestory and beams, abstract geometry, honest wood and glass, restrained blue-gray shadows, photoreal 21:9, empty, rare #0053db accent as thin light line, Movemental editorial The Digital Curator, no text, no logos.
```

---

### 09 — `/platform`

**Placement:** Hero — **architecture-as-system** metaphor (still interior, still restraint spec). **Aspect:** `21:9`

**Midjourney (full line):**

```text
Editorial interior photograph, modern institutional gallery or chapel-adjacent circulation hall with honest concrete and wood daylight restrained color blue-gray shadow tones contemplative quiet atmosphere shallow depth of field photoreal empty of people no desks no computers avoid prominent denominational symbols prefer abstract architecture Movemental editorial The Digital Curator: restrained palette deep blue-gray shadows warm off-white highlights single rare electric blue accent #0053db only as small prop or edge light photoreal documentary calm premium publication no neon gradients no SaaS illustration --ar 21:9 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, low-poly mascot, 3D cartoon character, plastic skin, HDR halos, prominent cross, denominational crest, readable signage
```

**Nano Banana 2 (same scene):**

```text
Editorial interior photograph, modern institutional gallery hall, concrete and wood, daylight, restrained blue-gray palette, empty, quiet, photoreal 21:9, sacred-adjacent calm not corporate tech, rare #0053db edge accent only, Movemental editorial The Digital Curator, no text, no logos, no UI.
```

---

### 10 — `/services`

**Placement:** Services overview hero. **Aspect:** `21:9`

**Midjourney (full line):**

```text
Editorial interior photograph, modern chapel meeting annex visible from nave through glass partition honest materials daylight restrained color blue-gray shadow tones contemplative quiet reverent atmosphere shallow depth of field photoreal empty of people avoid prominent denominational symbols prefer abstract architecture sense of layers and depth Movemental editorial The Digital Curator: restrained palette deep blue-gray shadows warm off-white highlights single rare electric blue accent #0053db only as small prop or edge light photoreal documentary calm premium publication no neon gradients no SaaS illustration --ar 21:9 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, low-poly mascot, 3D cartoon character, plastic skin, HDR halos, prominent cross, denominational crest, readable signage
```

**Nano Banana 2 (same scene):**

```text
Editorial interior photograph, modern nave with glass partition glimpsing a side annex, layered depth, honest materials, restrained blue-gray palette, empty, photoreal 21:9, rare #0053db accent, Movemental editorial The Digital Curator, no text, no logos, abstract architecture.
```

---

### 11 — `/services/system-builds`

**Placement:** Hub hero. **Aspect:** `21:9`

**Midjourney (full line):**

```text
Editorial interior photograph, modern church nave under construction or renovation stillness scaffolding absent finished surfaces only honest wood stone plaster daylight restrained color blue-gray shadow tones contemplative quiet atmosphere shallow depth of field photoreal empty of people avoid prominent denominational symbols prefer abstract architecture sense of structure being formed Movemental editorial The Digital Curator: restrained palette deep blue-gray shadows warm off-white highlights single rare electric blue accent #0053db only as small prop or edge light photoreal documentary calm premium publication no neon gradients no SaaS illustration --ar 21:9 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, low-poly mascot, 3D cartoon character, plastic skin, HDR halos, prominent cross, denominational crest, readable signage
```

**Nano Banana 2 (same scene):**

```text
Editorial interior photograph, modern sacred interior emphasizing structure and materials as if mid-fit-out but calm and empty, wood stone plaster, restrained blue-gray palette, photoreal 21:9, metaphor of building systems, rare #0053db accent, Movemental editorial The Digital Curator, no text, no logos, no scaffolding clutter.
```

---

### 12 — `/services/system-builds/foundation`

**Placement:** Section hero. **Aspect:** `16:10`

**Midjourney (full line):**

```text
Editorial interior photograph, chapel floor and first rows of pews low angle honest wood stone materials daylight restrained color blue-gray shadow tones contemplative quiet reverent atmosphere shallow depth of field photoreal empty of people avoid prominent denominational symbols prefer abstract architecture sense of foundation and grounding Movemental editorial The Digital Curator: restrained palette deep blue-gray shadows warm off-white highlights single rare electric blue accent #0053db only as small prop or edge light photoreal documentary calm premium publication no neon gradients no SaaS illustration --ar 16:10 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, low-poly mascot, 3D cartoon character, plastic skin, HDR halos, prominent cross, denominational crest, readable signage
```

**Nano Banana 2 (same scene):**

```text
Editorial interior photograph, low angle across chapel floor toward pew bases and stone, grounding composition, restrained blue-gray palette, empty, photoreal 16:10, rare #0053db accent, Movemental editorial The Digital Curator, no text, no logos.
```

---

### 13 — `/services/system-builds/content`

**Placement:** Section hero. **Aspect:** `16:10`

**Midjourney (full line):**

```text
Editorial interior photograph, modern chapel lectern area without text or book honest wood materials soft side daylight restrained color blue-gray shadow tones contemplative quiet reverent atmosphere shallow depth of field photoreal empty of people avoid prominent denominational symbols prefer abstract architecture Movemental editorial The Digital Curator: restrained palette deep blue-gray shadows warm off-white highlights single rare electric blue accent #0053db only as small prop or edge light photoreal documentary calm premium publication no neon gradients no SaaS illustration --ar 16:10 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, low-poly mascot, 3D cartoon character, plastic skin, HDR halos, prominent cross, denominational crest, readable signage
```

**Nano Banana 2 (same scene):**

```text
Editorial interior photograph, modern chapel speaking corner, plain wood lectern surface without books or text, soft side light, restrained palette, empty, photoreal 16:10, rare #0053db accent, Movemental editorial The Digital Curator, no text, no logos.
```

---

### 14 — `/services/system-builds/fundraising`

**Placement:** Section hero. **Aspect:** `16:10`

**Midjourney (full line):**

```text
Editorial interior photograph, small side chapel with donation or memorial wall treated as abstract wooden lattice no readable plaques honest materials daylight restrained color blue-gray shadow tones contemplative quiet reverent atmosphere shallow depth of field photoreal empty of people avoid prominent denominational symbols prefer abstract architecture Movemental editorial The Digital Curator: restrained palette deep blue-gray shadows warm off-white highlights single rare electric blue accent #0053db only as small prop or edge light photoreal documentary calm premium publication no neon gradients no SaaS illustration --ar 16:10 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, low-poly mascot, 3D cartoon character, plastic skin, HDR halos, prominent cross, denominational crest, readable signage
```

**Nano Banana 2 (same scene):**

```text
Editorial interior photograph, small side chapel, abstract wooden lattice wall without readable inscriptions, soft daylight, restrained blue-gray palette, empty, photoreal 16:10, rare #0053db accent, Movemental editorial The Digital Curator, no text, no logos.
```

---

### 15 — `/services/system-builds/governance-ethics`

**Placement:** Section hero. **Aspect:** `16:10`

**Midjourney (full line):**

```text
Editorial interior photograph, modern chapel with balanced symmetrical pews and clear center aisle sense of order honest materials daylight restrained color blue-gray shadow tones contemplative quiet reverent atmosphere shallow depth of field photoreal empty of people avoid prominent denominational symbols prefer abstract architecture Movemental editorial The Digital Curator: restrained palette deep blue-gray shadows warm off-white highlights single rare electric blue accent #0053db only as small prop or edge light photoreal documentary calm premium publication no neon gradients no SaaS illustration --ar 16:10 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, low-poly mascot, 3D cartoon character, plastic skin, HDR halos, prominent cross, denominational crest, readable signage
```

**Nano Banana 2 (same scene):**

```text
Editorial interior photograph, symmetrical modern chapel aisle, sense of order and ethics, honest materials, restrained palette, empty, photoreal 16:10, rare #0053db accent, Movemental editorial The Digital Curator, no text, no logos, abstract architecture.
```

---

### 16 — `/services/organizational-systems`

**Placement:** Hero wide. **Aspect:** `21:9`

**Midjourney (full line):**

```text
Editorial interior photograph, modern nave balcony rail viewpoint looking down into quiet space honest wood metal materials daylight restrained color blue-gray shadow tones contemplative quiet reverent atmosphere shallow depth of field photoreal empty of people avoid prominent denominational symbols prefer abstract architecture sense of oversight and systems view Movemental editorial The Digital Curator: restrained palette deep blue-gray shadows warm off-white highlights single rare electric blue accent #0053db only as small prop or edge light photoreal documentary calm premium publication no neon gradients no SaaS illustration --ar 21:9 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, low-poly mascot, 3D cartoon character, plastic skin, HDR halos, prominent cross, denominational crest, readable signage
```

**Nano Banana 2 (same scene):**

```text
Editorial interior photograph, view from modest balcony rail into quiet nave below, wood and metal, restrained blue-gray palette, empty, photoreal 21:9, systems oversight metaphor, rare #0053db accent, Movemental editorial The Digital Curator, no text, no logos.
```

---

### 17 — `/services/discovery-lab`

**Placement:** Hero — **sacred-adjacent learning hall** (same spec, not a literal lab bench). **Aspect:** `21:9`

**Midjourney (full line):**

```text
Editorial interior photograph, modern education wing attached to chapel vocabulary oak tables absent people stacked chairs minimal honest materials daylight restrained color blue-gray shadow tones contemplative quiet atmosphere shallow depth of field photoreal empty of people no laptops no screens avoid prominent denominational symbols prefer abstract architecture Movemental editorial The Digital Curator: restrained palette deep blue-gray shadows warm off-white highlights single rare electric blue accent #0053db only as small prop or edge light photoreal documentary calm premium publication no neon gradients no SaaS illustration --ar 21:9 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, low-poly mascot, 3D cartoon character, plastic skin, HDR halos, prominent cross, denominational crest, readable signage
```

**Nano Banana 2 (same scene):**

```text
Editorial interior photograph, quiet modern education hall with chapel-adjacent materials, empty tables and stacked chairs, no devices, daylight, restrained blue-gray palette, photoreal 21:9, rare #0053db accent, Movemental editorial The Digital Curator, no text, no logos.
```

---

### 18 — `/pricing`

**Placement:** Subtle wide band (low contrast behind cards) — **no busy center detail**. **Aspect:** `21:9`

**Midjourney (full line):**

```text
Editorial interior photograph, defocused soft modern chapel nave background bokeh only honest materials daylight restrained color blue-gray shadow tones contemplative quiet atmosphere very shallow depth of field photoreal empty of people avoid prominent denominational symbols prefer abstract architecture minimal center detail Movemental editorial The Digital Curator: restrained palette deep blue-gray shadows warm off-white highlights single rare electric blue accent #0053db only as small prop or edge light photoreal documentary calm premium publication no neon gradients no SaaS illustration --ar 21:9 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, low-poly mascot, 3D cartoon character, plastic skin, HDR halos, prominent cross, denominational crest, readable signage
```

**Nano Banana 2 (same scene):**

```text
Editorial interior photograph, heavily defocused modern chapel nave as soft background bokeh, restrained blue-gray palette, very gentle detail in center for UI overlay, empty, photoreal 21:9, rare #0053db in bokeh edge only, Movemental editorial The Digital Curator, no text, no logos.
```

---

### 19 — `/faq`

**Placement:** Optional muted hero strip. **Aspect:** `21:9`

**Midjourney (full line):**

```text
Editorial interior photograph, modern chapel side wall with vertical window rhythm only honest materials daylight restrained color blue-gray shadow tones contemplative quiet reverent atmosphere shallow depth of field photoreal empty of people avoid prominent denominational symbols prefer abstract architecture calm pattern not busy Movemental editorial The Digital Curator: restrained palette deep blue-gray shadows warm off-white highlights single rare electric blue accent #0053db only as small prop or edge light photoreal documentary calm premium publication no neon gradients no SaaS illustration --ar 21:9 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, low-poly mascot, 3D cartoon character, plastic skin, HDR halos, prominent cross, denominational crest, readable signage
```

**Nano Banana 2 (same scene):**

```text
Editorial interior photograph, modern chapel side wall with vertical window rhythm, calm pattern, restrained palette, empty, photoreal 21:9, rare #0053db accent, Movemental editorial The Digital Curator, no text, no logos.
```

---

### 20 — `/contact`

**Placement:** Hero texture (low contrast; form dominates). **Aspect:** `21:9`

**Midjourney (full line):**

```text
Editorial interior photograph, modern chapel narthex or lobby interior still empty bench honest materials daylight restrained color blue-gray shadow tones contemplative quiet reverent atmosphere shallow depth of field photoreal empty of people avoid prominent denominational symbols prefer abstract architecture welcoming but quiet Movemental editorial The Digital Curator: restrained palette deep blue-gray shadows warm off-white highlights single rare electric blue accent #0053db only as small prop or edge light photoreal documentary calm premium publication no neon gradients no SaaS illustration --ar 21:9 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, low-poly mascot, 3D cartoon character, plastic skin, HDR halos, prominent cross, denominational crest, readable signage
```

**Nano Banana 2 (same scene):**

```text
Editorial interior photograph, modern chapel narthex, simple empty bench, welcoming quiet, honest materials, restrained blue-gray palette, photoreal 21:9, rare #0053db accent, Movemental editorial The Digital Curator, no text, no logos.
```

---

## 6. Optional — `/about` second layer (portrait already wired)

Use only if you want a **midnight scrim** or split-band **atmospheric** still behind typographic hero **in addition to** the portrait block.

**Aspect:** `21:9` · **Opacity:** expect 20–40% visible under `inverse-surface` overlay in CSS.

**Midjourney (full line):**

```text
Editorial interior photograph, modern church nave or chapel honest materials daylight restrained color blue-gray shadow tones contemplative quiet reverent atmosphere shallow depth of field photoreal, empty of people, avoid prominent denominational symbols prefer abstract architecture Movemental editorial The Digital Curator: restrained palette deep blue-gray shadows warm off-white highlights single rare electric blue accent #0053db only as small prop or edge light photoreal documentary calm premium publication no neon gradients no SaaS illustration extra dark exposure-ready for text overlay --ar 21:9 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, low-poly mascot, 3D cartoon character, plastic skin, HDR halos, prominent cross, denominational crest, readable signage
```

**Nano Banana 2 (same scene):**

```text
Same as seed prompt: Editorial interior photograph, modern church nave or chapel, honest materials, daylight, restrained blue-gray shadows, warm highlights, empty, photoreal, darker exposure safe for text overlay, 21:9, rare #0053db accent only, Movemental editorial The Digital Curator, no text, no logos.
```

---

## 7. Already satisfied (reference only — do not require new brief)

| Route | Role |
|-------|------|
| `/churches` | Wide sanctuary editorial — **shipped** (`sanctuary-modern-aisle.webp`). |
| `/evidence` | Pews / atmosphere — **shipped** (`sanctuary-pews-blue-atmosphere.webp`). |

---

## 8. Excluded routes (do not generate this hero type)

| Route | Reason |
|-------|--------|
| `/privacy`, `/terms`, `/cookies` | Legal readability; **no** full-bleed editorial hero. |

---

**End of document.**
