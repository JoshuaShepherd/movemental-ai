# Movemental — generative image prompts (copy/paste)

**Purpose:** One block per asset slot. Aligned with [docs/design/DESIGN.md](../../design/DESIGN.md) (*The Digital Curator*) and the playbook in [site-media-inventory.md](./site-media-inventory.md) § “Nano Banana 2 / Midjourney”.

**Brand look (bake into every prompt, or use the shared suffixes below):** High-end editorial / documentary calm; **no** SaaS meme art, **no** rainbow charts, **no** neon fields of blue. Palette: midnight `#101820`, air `#f7f9fb` / white `#ffffff`, ink `#2a3439`, muted `#566166`; accent `#0053db` **sparingly** (one prop, edge light, single garment detail—not full blue backgrounds). Soft natural light, shallow depth, subtle grain OK. **No** pasted drop-shadow language in images; **no** pure black.

---

## How to use

1. **Midjourney:** Copy the entire fenced block under **Midjourney (full line)**. Adjust `--ar` if your layout differs. `--style raw` favors photographic truth; drop it if you want a slightly more “rendered” look.
2. **Nano Banana 2 / Gemini Flash Image:** Copy **Nano Banana (same scene)** — same scene, aspect called out in words; omit MJ-only flags.

**Shared Midjourney negatives (append to any MJ prompt once):**

```text
--no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, low-poly mascot, 3D cartoon character, plastic skin, HDR halos
```

**Shared tail for prose prompts (paste after subject if you are not using `--no`):**

```text
No readable UI, no fake logos, no watermark, no lens-flare cliché; photoreal editorial; color grade: deep blue-gray shadows, warm highlights; subtle film grain OK; calm authority.
```

---

## Global suffixes (optional shortcuts)

**MJ brand suffix (after your prompt, before `--no`):**

```text
, Movemental editorial: restrained palette deep blue-gray shadows warm off-white highlights single rare electric blue accent photoreal documentary calm premium publication aesthetic
```

**NB2 closing phrase (end of prompt):**

```text
Photoreal editorial, 16:10 horizontal frame, high resolution, subtle grain, no text, no logos, no watermark.
```
*(Swap aspect to match slot.)*

---

## 01 — `/` HomeAudiences · card 1

**Aspect:** 16:10 · **Midjourney:** `--ar 16:10 --style raw`

**Midjourney (full line):**

```text
Editorial photograph, movement leader facilitating discussion with attentive adults in contemporary civic or learning architecture, soft side light, muted palette with deep blue-gray shadows and warm off-white walls, single restrained electric blue accent on one small object only chair edge or book spine, calm authority photoreal documentary --ar 16:10 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Nano Banana 2 (same scene):**

```text
Editorial photograph, movement leader facilitating a small group discussion, diverse attentive adults, modern learning or civic space, soft window light from the side, color palette cool blue-gray shadows and warm off-white walls, one small accent in electric blue on a single object only, horizontal 16:10 composition, photoreal, calm credible mood, no text, no logos, no watermark.
```

---

## 02 — `/` HomeAudiences · card 2

**Aspect:** 16:10

**Midjourney (full line):**

```text
Editorial interior photograph, modern church nave or chapel honest materials daylight restrained color blue-gray shadow tones contemplative quiet reverent atmosphere shallow depth of field photoreal, avoid prominent denominational symbols prefer abstract architecture --ar 16:10 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Nano Banana 2 (same scene):**

```text
Sacred-space interior, modern chapel or nave with stone or wood and soft daylight, quiet reverent mood, restrained desaturated colors with blue-gray shadows, wide 16:10, photoreal editorial, no crosses or readable signage if ambiguous, no text, no logos.
```

---

## 03 — `/` HomeAudiences · card 3

**Aspect:** 16:10

**Midjourney (full line):**

```text
Documentary editorial photograph, diverse nonprofit team collaborating around a table laptops closed natural faces human warmth environment feels like soft cool gray panels and white cards ink-like shadows premium nonprofit annual report aesthetic photoreal --ar 16:10 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Nano Banana 2 (same scene):**

```text
Nonprofit team huddle, diverse people collaborating at a table with laptops closed, candid documentary moment, soft office light, palette cool grays and warm skin tones, subtle blue-gray shadow bias, horizontal 16:10, photoreal, trustworthy annual-report quality, no text, no logos.
```

---

## 04 — `/` HomeAudiences · card 4

**Aspect:** 16:10

**Midjourney (full line):**

```text
Editorial photograph, small roundtable civic or institutional leaders listening deeply neutral modern meeting room restrained palette one electric blue accent in clothing or book only dignified trustworthy photoreal documentary --ar 16:10 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Nano Banana 2 (same scene):**

```text
Institutional roundtable, small group of leaders in conversation, neutral modern room, listening poses, restrained color grade, only one small blue accent in the frame, 16:10 horizontal, photoreal editorial, dignified, no text, no logos, no watermark.
```

---

## 05 — `/` HomeHero · optional future still (abstract)

**Aspect:** 21:9 or 2:1 · **Midjourney:** `--ar 21:9`

**Midjourney (full line):**

```text
Cinematic ultra-wide abstract documentary still, extreme close environment linen paper fibers brushed metal moonlit cool highlights on deep midnight blue-black field specular edge light barely hinting electric blue no text no logos moody editorial premium publication --ar 21:9 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Nano Banana 2 (same scene):**

```text
Ultra-wide cinematic abstract still, macro texture of linen paper and cool metal, mostly very dark midnight field with soft lifted highlights, a hint of blue specular on one edge, 21:9, no text, no recognizable UI, photoreal editorial mood.
```

---

## 06 — `/about` · origin portrait

**Aspect:** ~3:4 · **Midjourney:** `--ar 3:4`

**Midjourney (full line):**

```text
Environmental portrait thoughtful leader in minimal studio single plant or shelf soft window light wardrobe neutral with one ink or navy tone background soft off-white family intimate not heroic photoreal editorial magazine --ar 3:4 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Nano Banana 2 (same scene):**

```text
Environmental portrait, thoughtful professional in a minimal studio, soft natural window light, neutral wardrobe with one deep ink or navy note, pale warm-gray background, vertical 3:4, intimate editorial photoreal, no text, no logos.
```

---

## 07 — `/about` · “what became clear” architecture / proof

**Aspect:** per layout (use 4:3 or 3:2) · **Grayscale-friendly in post**

**Midjourney (full line):**

```text
Editorial still life curated wall of framed essays and books suggesting publishing craft soft shadows grayscale-ready contrast cool undertone photoreal blur book spines so titles unreadable no legible copyrighted cover art --ar 4:5 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Nano Banana 2 (same scene):**

```text
Editorial still life, wall of frames and shelved books suggesting a writer’s studio, soft natural light, high micro-contrast for later grayscale conversion, blurred unreadable spines, 4:5 vertical, photoreal, no readable text or logos.
```

---

## 08 — `/case-studies` · hero

**Aspect:** ~16:9 · **Midjourney:** `--ar 16:9`

**Midjourney (full line):**

```text
Editorial photograph strategy session aftermath organized sticky notes on glass wall shallow depth of field faces optional softly blurred palette aligned to cool gray panels and ink shadows restrained single blue accent proof without fake metrics photoreal --ar 16:9 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Nano Banana 2 (same scene):**

```text
Post-workshop glass wall with clusters of sticky notes, shallow depth of field, anonymous teamwork atmosphere, muted blue-gray and warm white palette, one subtle blue accent, 16:9, photoreal editorial, no readable text on notes, no logos.
```

---

## 09 — `/case-studies` · narrative inline

**Aspect:** 4:3–3:2 · **Midjourney:** `--ar 4:3`

**Midjourney (full line):**

```text
Documentary editorial facilitator at whiteboard edge of frame participants in soft bokeh honest available light muted palette photoreal warm documentary --ar 4:3 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Nano Banana 2 (same scene):**

```text
Facilitation moment, facilitator at whiteboard edge-framed, participants softly out of focus, natural indoor light, muted trustworthy colors, 4:3 photoreal documentary, whiteboard content abstract or blank, no text, no logos.
```

---

## 10 — `/case-studies` · closing wide

**Aspect:** 16:9

**Midjourney (full line):**

```text
Wide editorial photograph calm desk with notebook and closed laptop suggesting depth of work shadow bias in background corners toward midnight blue-black premium consulting report cover photoreal still life no server room cliché --ar 16:9 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Nano Banana 2 (same scene):**

```text
Calm desk scene, closed laptop and open notebook, pen, soft side light, corners drifting to deep blue-gray shadow, 16:9 wide, photoreal editorial still life, screens dark and unreadable, no text, no logos.
```

---

## 11 — `/contact` · hero

**Aspect:** 3:4 · **Grayscale-friendly** · **Midjourney:** `--ar 3:4`

**Midjourney (full line):**

```text
Editorial portrait approachable expert slight smile soft window light neutral wardrobe minimal background warm conversation tone photoreal grayscale conversion friendly gentle human FAQ companion --ar 3:4 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Nano Banana 2 (same scene):**

```text
Warm editorial portrait, approachable expert, slight smile, soft window light, neutral clothing, minimal pale background, vertical 3:4, photoreal, suitable for later desaturation in UI, no text, no logos.
```

---

## 12 — `/evidence` · hero decorative (under type, low contrast)

**Aspect:** 16:9 · **Midjourney:** `--ar 16:9`

**Midjourney (full line):**

```text
Full-bleed abstract photographic texture paper grain faint diagonal light beams very low contrast colors restricted deep midnight with subtle muted gray lift no recognizable objects seamless tile feel designed to sit under typography at low opacity --ar 16:9 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Nano Banana 2 (same scene):**

```text
Abstract full-bleed texture, paper grain and soft light streaks, extremely low contrast, palette only deep blue-black and soft gray lift, 16:9, no objects, no text, photographic subtlety for UI underlay.
```

---

## 13 — `/evidence` · value proposition figure

**Aspect:** 4:3 · **Midjourney:** `--ar 4:3`

**Midjourney (full line):**

```text
Architectural interior bright atrium white plaster warm wood bench single plant soft daylight gallery calm palette white and pale warm gray ink shadows photoreal 4:3 editorial --ar 4:3 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Nano Banana 2 (same scene):**

```text
Bright minimal gallery-like atrium, white plaster, warm wood bench, one plant, soft daylight, calm premium interior, 4:3 photoreal editorial, no people required, no text, no logos.
```

---

## 14 — `/faq` · aside

**Aspect:** 4:5 or 3:4 · **Midjourney:** `--ar 4:5`

**Midjourney (full line):**

```text
Editorial photograph person seated listening open posture soft light minimal set trustworthy FAQ companion image photoreal approachable --ar 4:5 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Nano Banana 2 (same scene):**

```text
Editorial seated portrait, person listening with open relaxed posture, soft natural light, minimal interior, 4:5 vertical, friendly trustworthy photoreal, no text, no logos.
```

---

## 15 — `/methodology` · hero

**Aspect:** ~3:4 · **Midjourney:** `--ar 3:4`

**Midjourney (full line):**

```text
Editorial photograph researcher typing notes after conversation coffee cup human warmth shallow depth of field methodology is human palette cool-warm balance photoreal documentary --ar 3:4 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Nano Banana 2 (same scene):**

```text
Human-centered methodology moment, researcher with notes after a conversation, coffee cup on table, warm candid light, shallow depth of field, vertical 3:4, photoreal editorial, notebook text unreadable, no logos.
```

---

## 16 — `/methodology` · bento large

**Aspect:** 16:10 · **Midjourney:** `--ar 16:10`

**Midjourney (full line):**

```text
Overhead editorial photograph organized desk index cards arranged in loose grid suggesting system design no readable text muted palette photoreal structure not fake UI --ar 16:10 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Nano Banana 2 (same scene):**

```text
Overhead desk, index cards in an organized grid suggesting systems thinking, hands partly in frame optional, muted cool-warm palette, 16:10, photoreal, all writing illegible or blank, no logos.
```

---

## 17 — `/services` · triptych (generate three related images)

**Aspects:** A 3:2 · B 4:3 · C 16:9 — **use three MJ jobs with shared grade**

**Midjourney — A (listening):**

```text
Editorial photograph movement leader listening in small circle of adults contemporary room soft light photoreal documentary restrained palette rare blue accent --ar 3:2 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Midjourney — B (building):**

```text
Editorial photograph hands arranging modular wooden blocks on felt board planning metaphor no readable labels photoreal restrained palette --ar 4:3 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Midjourney — C (proof / corridor):**

```text
Wide editorial photograph diverse team walking modern corridor together calm confident no handshake cliché laptop bags screens not visible photoreal --ar 16:9 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Nano Banana 2 (triptych brief — run three times with this series note):**

```text
Series of three related editorial photos for one services page: (1) leader listening in circle 3:2, (2) hands placing modular blocks on felt 4:3, (3) team walking a calm modern corridor 16:9. Shared color grade: cool gray shadows, warm highlights, blue accents rare. Photoreal, no text, no logos.
```

---

## 18 — `/services/organizational-systems` · three related stills

**Aspects:** 16:9 / 4:3 / 3:2

**Midjourney — 18a ops floor:**

```text
Editorial photograph modern operations floor calm professionals at work shallow depth muted institutional premium photoreal no fake dashboards --ar 16:9 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Midjourney — 18b integration on glass:**

```text
Editorial photograph people discussing simple line diagram drawn on glass wall abstract nodes and links only no readable words photoreal --ar 4:3 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Midjourney — 18c restrained celebration:**

```text
Editorial photograph small team quiet satisfaction after milestone modern office restrained emotion photoreal dignified no balloons cliché --ar 3:2 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Nano Banana 2 (series):**

```text
Three related enterprise-transformation stills: (1) calm ops floor wide 16:9, (2) collaboration at glass wall with abstract diagram 4:3, (3) restrained team moment 3:2. Cohesive cool-gray and warm-skin grade, photoreal, no readable UI, no logos.
```

---

## 19 — `/services/system-builds` · build environment (under opacity + grayscale)

**Aspect:** 16:9 · **Midjourney:** `--ar 16:9`

**Midjourney (full line):**

```text
Cinematic 16:9 workspace still laptop half-closed neat cable management single warm practical lamp moody but not gloomy desaturated-ready photoreal no readable screens screens dark --ar 16:9 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Nano Banana 2 (same scene):**

```text
Muted engineer desk, laptop half closed, tidy cables, one warm desk lamp, moody cinematic 16:9, photoreal, screens black and unreadable, suitable for heavy desaturation in UI, no text, no logos.
```

---

## 20 — `/services/system-builds/content-fundraising` · hero

**Aspect:** ~16:10 · **Midjourney:** `--ar 16:10`

**Midjourney (full line):**

```text
Editorial photograph curated bookshelf beside simple donation envelope motif without any printed text warm light nonprofit sophistication photoreal 16:10 still life or quiet interior --ar 16:10 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Nano Banana 2 (same scene):**

```text
Editorial still life, quality bookshelf and a plain envelope prop suggesting generosity, warm soft light, sophisticated nonprofit tone, horizontal 16:10, photoreal, no text on envelope, blurred book spines, no logos.
```

---

## 21 — `/system` · hero decorative (midnight band)

**Aspect:** 16:9

**Midjourney (full line):**

```text
Seamless abstract texture for dark UI band fine noise soft vignette colors only deep midnight to ink lift subtle no objects no text premium editorial --ar 16:9 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Nano Banana 2 (same scene):**

```text
Dark abstract texture for hero underlay, soft vignette, very subtle grain, colors only deep blue-black and soft gray lift, 16:9, no shapes, no text, photographic.
```

---

## 22 — `/system` · layer 1 (pathways metaphor · grayscale in UI)

**Aspect:** 4:5 · **Midjourney:** `--ar 4:5`

**Midjourney (full line):**

```text
Vertical editorial photograph modern building facade rhythm suggesting pathways strong vertical lines high micro-contrast for grayscale conversion photoreal architecture metaphor --ar 4:5 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Nano Banana 2 (same scene):**

```text
Vertical architectural facade, repeating windows and stone rhythm, abstract “pathways” feeling, crisp detail for grayscale UI, 4:5 photoreal editorial, no signage readable, no logos.
```

---

## 23 — `/system` · layer 2 (formation · grayscale in UI)

**Aspect:** 4:3 · **Midjourney:** `--ar 4:3`

**Midjourney (full line):**

```text
Editorial 4:3 two people co-editing printed outline on table faces partial calm collaboration photoreal grayscale-ready soft window light --ar 4:3 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Nano Banana 2 (same scene):**

```text
Two people collaborating over printed outlines on a table, faces partly visible, calm studio light, 4:3 photoreal editorial, documents without readable text, no logos.
```

---

## 24 — `/walkthrough` · three-image narrative series

**Aspects:** 16:9 / ~3:2 / 4:3

**Midjourney — 24a atmosphere:**

```text
Midnight city bokeh abstract lights soft ellipses deep blue-black field restrained highlights photoreal editorial no text --ar 16:9 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Midjourney — 24b contrast (messy vs organized):**

```text
Split desk still life messy papers on one side organized stack on other side no readable text photoreal editorial cool-warm balance --ar 3:2 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Midjourney — 24c synthesis:**

```text
Small team smiling at single laptop screen dark and unreadable candid office photoreal editorial trustworthy --ar 4:3 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Nano Banana 2 (series):**

```text
Three related walkthrough images: (1) abstract midnight bokeh city lights 16:9, (2) desk split messy vs organized papers 3:2 no text, (3) small team pleased at one closed laptop 4:3. Shared cool-warm editorial grade, photoreal, no UI, no logos.
```

---

## 25 — `/who-we-serve` · hero

**Aspect:** 16:9

**Midjourney (full line):**

```text
Wide editorial photograph civic-styled community hall exterior golden hour people entering with slight motion blur dignified inclusive institutional restrained palette photoreal 16:9 avoid sectarian symbols if ambiguous --ar 16:9 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Nano Banana 2 (same scene):**

```text
Wide exterior of a civic community hall at golden hour, a few people entering, gentle motion blur, dignified inclusive mood, restrained colors, 16:9 photoreal editorial, no readable signage, no logos.
```

---

## 26 — Default OG / social background plate (type added in Figma or `next/og`)

**Aspect:** 1200×630 (≈ 1.91:1) · **Midjourney:** `--ar 1200:630` may not work on all versions — use `--ar 16:9` and crop, or `--ar 191:100` if supported; **safe:** `--ar 16:9` then crop to 1200×630.

**Midjourney (full line):**

```text
Clean horizontal marketing background plate only subtle paper texture color fields pale cool white-gray with bottom weight toward deep midnight blue-black corner room reserved for future logo no text no watermark premium editorial --ar 16:9 --style raw --no readable text, typography, watermark, logo, UI screenshot, fake dashboard, lens flare, oversaturated neon, rainbow gradient, stock handshake lobby, corporate clipart, busy collage, 3D cartoon character, plastic skin, HDR halos
```

**Nano Banana 2 (same scene):**

```text
Horizontal empty background plate 16:9, subtle paper texture, soft gradient from pale warm gray at top to deep midnight blue-black at bottom, generous negative space for logo and title later, no text, no logos, no watermark.
```

---

## Not generative (do not run in MJ/NB2)

Per inventory: **HomeEvidence** product screenshot, any real UI, client data, legal figures, Lucide icons, **final** OG typography lockup. Capture, Figma, or code instead.

---

## Cross-link

- Full audit tables and JS viz / code-agent patterns: [site-media-inventory.md](./site-media-inventory.md)
