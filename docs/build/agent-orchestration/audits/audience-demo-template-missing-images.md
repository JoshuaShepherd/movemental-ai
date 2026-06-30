# Audience demo templates — missing image audit

**Audited:** 2026-06-29  
**Scope:** Seeded preview sites linked from Movemental audience pages (`/agent/nonprofits`, `/agent/churches`, `/agent/institutions`)  
**Method:** HTTP crawl of internal links (up to 80 pages per origin) + HEAD/GET verification of every `<img src>` and CSS `background-image` URL found in server-rendered HTML.

| Site | Base URL | Pages crawled | Images checked | Missing assets (404) |
| --- | --- | ---: | ---: | ---: |
| Nonprofits | `https://nonprofits.movemental.ai` | 33 | 69 | **23** |
| Church | `https://church.movemental.ai` | 23 | 64 | **0** |
| Institutions | `https://institutions.movemental.ai` | 50 | 87 | **0** |

**Summary:** Only the **nonprofit** demo template (`ImpactOS`) has missing image files. Church and institutions templates serve all referenced images successfully (church uses hosted Stitch/Aida URLs; institutions uses `/images/midjourney/*.webp` assets that all return HTTP 200).

**Out of scope for this doc (not missing files):** The nonprofit home page uses four hero/card background images whose **files exist** (`/images/heroes/*.webp` return 200) but whose Tailwind `bg-[url(...)]` classes are HTML-entity escaped in SSR (`&#x27;`), so they can appear blank in the browser. That is a **markup bug**, not a missing asset — fix in the template repo, not with new generation.

---

## How to use this doc

Each missing asset below includes:

1. **Where it appears** — live page + UI slot  
2. **Expected path** — where the template expects the file  
3. **Template intent** — `alt` / `data-alt` from the shipped HTML  
4. **Nano Banana Pro prompt** — ready to paste, with **aspect ratio**, **styling**, and **export path**

**Visual contract (nonprofit / ImpactOS):** Light-mode editorial photography. High-key natural or studio lighting, crisp whites, restrained **emerald green** accents in scene details (not floods on faces). Humanitarian / philanthropic tone — trustworthy, modern, never stock-photo cheesy. Photorealistic. No text overlays, no logos, no watermarks.

**Nano Banana settings (recommended defaults):**

| Slot type | Aspect ratio | Master export size | Format |
| --- | --- | --- | --- |
| Card / hero cover (`object-cover`, full bleed) | **16:9** | 1920 × 1080 | WebP or JPG |
| Inline article figure (`w-full h-auto`) | **16:9** | 1600 × 900 | WebP or JPG |
| Avatar / author chip (`rounded-full`, 32–64 px UI) | **1:1** | 512 × 512 | WebP or JPG |
| Profile tile (`120×120` inline) | **1:1** | 512 × 512 | WebP or JPG |

After generation, place files at the **Expected path** on the nonprofit template deployment (or rename to match and update references if you standardize on WebP).

---

## Church (`church.movemental.ai`)

**Result:** No missing images. All 64 image references across 23 pages returned HTTP 200 (including external `lh3.googleusercontent.com/aida-public/…` Stitch assets).

No Nano Banana work required for this template at audit time.

---

## Institutions (`institutions.movemental.ai`)

**Result:** No missing images. All 87 image references across 50 pages returned HTTP 200 (primarily `/images/midjourney/*.webp`).

No Nano Banana work required for this template at audit time.

---

## Nonprofits (`nonprofits.movemental.ai`) — 23 missing assets

### Pathways — `/pathways`

#### NP-01 · Pathway card hero — corporate transparency

| Field | Value |
| --- | --- |
| **Page** | `https://nonprofits.movemental.ai/pathways` |
| **Slot** | Pathway card cover image |
| **Expected path** | `/images/heroes/asset-6.jpg` |
| **HTTP** | 404 |
| **Alt** | Corporate transparency meeting |

**Aspect ratio:** 16:9 · **Export:** 1920 × 1080 JPG

**Nano Banana Pro prompt:**

> Photorealistic editorial photograph for a modern humanitarian tech nonprofit website (light mode UI). A modern glass-walled boardroom bathed in bright soft natural light. Clean white tables with subtle green accent chairs. Diverse professionals in smart-casual attire discussing digital transparency metrics on a large display. Optimistic, hyper-clean, authoritative mood. High-key lighting, shallow depth of field, no logos, no text overlays. **Aspect ratio 16:9.**

---

#### NP-02 · Pathway card hero — global equity collaboration

| Field | Value |
| --- | --- |
| **Page** | `https://nonprofits.movemental.ai/pathways` |
| **Slot** | Pathway card cover image |
| **Expected path** | `/images/heroes/asset-30.jpg` |
| **HTTP** | 404 |
| **Alt** | Global equity collaboration |

**Aspect ratio:** 16:9 · **Export:** 1920 × 1080 JPG

**Nano Banana Pro prompt:**

> Photorealistic editorial photo for a premium NGO web template. A diverse team of humanitarian workers collaborating around a sleek white table in a bright airy architectural space, examining digital maps and data visualizations on a tablet. Minimalist interior with organic green plant accents. High-key lighting, warm professional mood, light-mode aesthetic. No logos or text. **Aspect ratio 16:9.**

---

#### NP-03 · Testimonial / user avatar

| Field | Value |
| --- | --- |
| **Page** | `https://nonprofits.movemental.ai/pathways` |
| **Slot** | Circular profile avatar (`w-16 h-16 rounded-full`) |
| **Expected path** | `/images/heroes/asset-31.jpg` |
| **HTTP** | 404 |
| **Alt** | User profile |

**Aspect ratio:** 1:1 · **Export:** 512 × 512 JPG

**Nano Banana Pro prompt:**

> Photorealistic headshot for a nonprofit learning pathway testimonial. Friendly professional woman in her 30s, neutral expression, smart-casual attire, soft studio background in off-white and light grey. Even high-key lighting, shoulders-up framing centered for circular crop. Trustworthy humanitarian tech brand tone. No logos. **Aspect ratio 1:1.**

---

### Courses index — `/courses`

#### NP-04 · Course hero — academic environment

| Field | Value |
| --- | --- |
| **Page** | `https://nonprofits.movemental.ai/courses` |
| **Slot** | Featured course hero (`absolute inset-0 object-cover`) |
| **Expected path** | `/images/heroes/asset-19.jpg` |
| **HTTP** | 404 |
| **Alt** | Academic Environment |

**Aspect ratio:** 16:9 · **Export:** 1920 × 1080 JPG

**Nano Banana Pro prompt:**

> Bright modern university library or study space with glass partitions and warm wood accents. People engaged in quiet study and collaborative discussion at minimalist tables. Light-mode palette: expansive whites, lush green plants, technological precision softened by organic elements. Photorealistic editorial. **Aspect ratio 16:9.**

---

#### NP-05 · Course tile — cybersecurity / data

| Field | Value |
| --- | --- |
| **Page** | `https://nonprofits.movemental.ai/courses` |
| **Slot** | Secondary course tile background |
| **Expected path** | `/images/heroes/asset-20.jpg` |
| **HTTP** | 404 |
| **Alt** | Cybersecurity/Data |

**Aspect ratio:** 16:9 · **Export:** 1920 × 1080 JPG

**Nano Banana Pro prompt:**

> Macro photograph of a sophisticated server rack with pristine white casing and soft ambient green LED indicators. Extremely clean futuristic data-center aesthetic representing secure data provenance for a humanitarian platform. Shallow depth of field, smooth background gradient. Photorealistic, no readable labels. **Aspect ratio 16:9.**

---

#### NP-06 · Instructor avatar (female)

| Field | Value |
| --- | --- |
| **Page** | `https://nonprofits.movemental.ai/courses` |
| **Slot** | Instructor chip (`w-8 h-8 rounded-full`) |
| **Expected path** | `/images/heroes/asset-21.jpg` |
| **HTTP** | 404 |
| **Alt** | Instructor |

**Aspect ratio:** 1:1 · **Export:** 512 × 512 JPG

**Nano Banana Pro prompt:**

> Portrait of a confident female academic professional in her 40s, rectangular glasses, light grey suit jacket, subtle smile. Bright out-of-focus office background with large windows. Soft natural lighting, trustworthy rigorous academic persona. Centered for circular avatar crop. **Aspect ratio 1:1.**

---

#### NP-07 · Instructor avatar (male)

| Field | Value |
| --- | --- |
| **Page** | `https://nonprofits.movemental.ai/courses` |
| **Slot** | Instructor chip (`w-8 h-8 rounded-full`) |
| **Expected path** | `/images/team/a-portrait-of-a-male-instructor-with-a-neatly-tr.jpg` |
| **HTTP** | 404 |
| **Alt** | Instructor |

**Aspect ratio:** 1:1 · **Export:** 512 × 512 JPG

**Nano Banana Pro prompt:**

> Portrait of a male instructor with a neatly trimmed beard and warm brown eyes, crisp white button-down shirt. Minimalist brightly lit studio background in subtle off-white tones. Hyper-clean professional aesthetic for an online academy. Shoulders up, centered for circular crop. **Aspect ratio 1:1.**

---

### Research index — `/research`

#### NP-08 · Researcher avatar — lead researcher (male)

| Field | Value |
| --- | --- |
| **Page** | `https://nonprofits.movemental.ai/research` |
| **Slot** | Author stack avatar (`w-8 h-8 rounded-full`) |
| **Expected path** | `/images/team/close-up-professional-portrait-of-a-male-lead-re.jpg` |
| **HTTP** | 404 |

**Aspect ratio:** 1:1 · **Export:** 512 × 512 JPG

**Nano Banana Pro prompt:**

> Close-up professional portrait of a male lead researcher with a warm smile, dark turtleneck, soft neutral studio background. Intelligence and trustworthiness, high-trust light-mode NGO aesthetic. Even lighting, centered for small circular UI avatar. **Aspect ratio 1:1.**

---

#### NP-09 · Researcher avatar — scientist (female)

| Field | Value |
| --- | --- |
| **Page** | `https://nonprofits.movemental.ai/research` |
| **Expected path** | `/images/team/close-up-professional-portrait-of-a-female-resea.jpg` |
| **HTTP** | 404 |

**Aspect ratio:** 1:1 · **Export:** 512 × 512 JPG

**Nano Banana Pro prompt:**

> Close-up portrait of a female research scientist looking forward with confidence. Soft cinematic lighting, neutral bright background, clean modern design, professional academic authority. Circular avatar crop safe. **Aspect ratio 1:1.**

---

#### NP-10 · Researcher avatar — office profile (male)

| Field | Value |
| --- | --- |
| **Page** | `https://nonprofits.movemental.ai/research` |
| **Expected path** | `/images/team/professional-profile-of-a-man-in-a-modern-office.jpg` |
| **HTTP** | 404 |

**Aspect ratio:** 1:1 · **Export:** 512 × 512 JPG

**Nano Banana Pro prompt:**

> Professional profile of a man in a modern office, soft high-key lighting, focused expression, cinematic depth of field, neutral grey tones. High-trust technical leadership aesthetic for a humanitarian research index. **Aspect ratio 1:1.**

---

#### NP-11 · Researcher avatar — young researcher (female)

| Field | Value |
| --- | --- |
| **Page** | `https://nonprofits.movemental.ai/research` |
| **Expected path** | `/images/team/portrait-of-a-young-female-researcher-in-a-brigh.jpg` |
| **HTTP** | 404 |

**Aspect ratio:** 1:1 · **Export:** 512 × 512 JPG

**Nano Banana Pro prompt:**

> Portrait of a young female researcher in a bright modern creative workspace, soft sunlight through windows, optimistic engaged expression, vibrant yet professional light-mode palette. **Aspect ratio 1:1.**

---

#### NP-12 · Researcher avatar — academic professional

| Field | Value |
| --- | --- |
| **Page** | `https://nonprofits.movemental.ai/research` |
| **Expected path** | `/images/impact/serious-but-approachable-academic-professional-h.jpg` |
| **HTTP** | 404 |

**Aspect ratio:** 1:1 · **Export:** 512 × 512 JPG

**Nano Banana Pro prompt:**

> Serious but approachable academic professional, natural daylight, soft bokeh background, representing humanitarian global literacy work. High-resolution photorealistic headshot for small UI avatar. **Aspect ratio 1:1.**

---

#### NP-13 · Researcher avatar — field operative (male)

| Field | Value |
| --- | --- |
| **Page** | `https://nonprofits.movemental.ai/research` |
| **Expected path** | `/images/team/detailed-portrait-of-a-male-field-operative-with.jpg` |
| **HTTP** | 404 |

**Aspect ratio:** 1:1 · **Export:** 512 × 512 JPG

**Nano Banana Pro prompt:**

> Detailed portrait of a male field operative with thoughtful expression, outdoor soft-focus natural environment, warm lighting, humanitarian field-work aesthetic with professional clarity. **Aspect ratio 1:1.**

---

#### NP-14 · Research card hero — global data network

| Field | Value |
| --- | --- |
| **Page** | `https://nonprofits.movemental.ai/research` |
| **Slot** | Research publication card cover |
| **Expected path** | `/images/research/abstract-visualization-of-a-global-data-network.jpg` |
| **HTTP** | 404 |

**Aspect ratio:** 16:9 · **Export:** 1920 × 1080 JPG

**Nano Banana Pro prompt:**

> Abstract visualization of a global data network: glowing interconnected lines in electric moss green over deep charcoal-blue background. Sophisticated technology, emergent systems, high-contrast cinematic lighting. No text, no UI chrome. Suitable as card hero image on light NGO website. **Aspect ratio 16:9.**

---

#### NP-15 · Research card hero — laboratory / server room

| Field | Value |
| --- | --- |
| **Page** | `https://nonprofits.movemental.ai/research` |
| **Expected path** | `/images/research/modern-minimalist-laboratory-or-server-room-with.jpg` |
| **HTTP** | 404 |

**Aspect ratio:** 16:9 · **Export:** 1920 × 1080 JPG

**Nano Banana Pro prompt:**

> Modern minimalist laboratory or server room, clean architectural lines, soft ambient green light on glass surfaces. Calm urgent mood — ethics and safety in advanced computing. Photorealistic or high-end 3D editorial hybrid. **Aspect ratio 16:9.**

---

### Essays index — `/essays`

#### NP-16 · Featured essay hero

| Field | Value |
| --- | --- |
| **Page** | `https://nonprofits.movemental.ai/essays` |
| **Slot** | Featured essay card hero |
| **Expected path** | `/images/heroes/asset-25.jpg` |
| **HTTP** | 404 |
| **Alt** | Featured Essay Hero Image |

**Aspect ratio:** 16:9 · **Export:** 1920 × 1080 JPG

**Nano Banana Pro prompt:**

> Wide-angle photograph of an advanced drone flying over a remote arid landscape delivering a pristine white container of medical aid. Clear high-key natural lighting, modern optimistic humanitarian aesthetic, subtle emerald green accents on equipment. Photorealistic editorial. **Aspect ratio 16:9.**

---

#### NP-17 · Author portrait — featured essay (female)

| Field | Value |
| --- | --- |
| **Page** | `https://nonprofits.movemental.ai/essays` |
| **Expected path** | `/images/heroes/asset-26.jpg` |
| **HTTP** | 404 |
| **Alt** | Author Portrait |

**Aspect ratio:** 1:1 · **Export:** 512 × 512 JPG (displayed in small square tile)

**Nano Banana Pro prompt:**

> Tightly cropped portrait of a confident female researcher with glasses, minimal modern white blazer. Soft out-of-focus laboratory or bright office background. Flattering soft light, approachable yet authoritative senior ethics fellow. **Aspect ratio 1:1.**

---

#### NP-18 · Author portrait — policy researcher (male)

| Field | Value |
| --- | --- |
| **Page** | `https://nonprofits.movemental.ai/essays` |
| **Expected path** | `/images/team/a-clean-modern-headshot-of-a-male-policy-researc.jpg` |
| **HTTP** | 404 |

**Aspect ratio:** 1:1 · **Export:** 512 × 512 JPG

**Nano Banana Pro prompt:**

> Clean modern headshot of a male policy researcher in his 30s, crisp blue button-down shirt, stark minimal light grey background, even bright lighting, authoritative NGO policy essay author. **Aspect ratio 1:1.**

---

#### NP-19 · Author portrait — field operative (female)

| Field | Value |
| --- | --- |
| **Page** | `https://nonprofits.movemental.ai/essays` |
| **Expected path** | `/images/team/a-bright-optimistic-portrait-of-a-female-field-o.jpg` |
| **HTTP** | 404 |

**Aspect ratio:** 1:1 · **Export:** 512 × 512 JPG

**Nano Banana Pro prompt:**

> Bright optimistic portrait of a female field operative in her 20s, gentle smile, heavily blurred outdoor background for clean UI aesthetic, natural high-key lighting, modern trustworthy humanitarian identity. **Aspect ratio 1:1.**

---

### Fellows — `/fellows`

#### NP-20 · Fellow profile photo — Dr. Aris Thorne

| Field | Value |
| --- | --- |
| **Page** | `https://nonprofits.movemental.ai/fellows` |
| **Slot** | Fellow profile image (120 × 120 display) |
| **Expected path** | `/images/heroes/asset-35.jpg` |
| **HTTP** | 404 |
| **Alt** | Dr. Aris Thorne |

**Aspect ratio:** 1:1 · **Export:** 512 × 512 JPG

**Nano Banana Pro prompt:**

> Distinguished academic fellow portrait, gender-neutral presentation acceptable, late 40s, thoughtful expression, smart casual blazer, soft neutral background suitable for 120px square profile with slight border radius. Photorealistic, high-trust research institute tone. **Aspect ratio 1:1.**

---

### Support — `/support`

#### NP-21 · Support section hero — data network abstract

| Field | Value |
| --- | --- |
| **Page** | `https://nonprofits.movemental.ai/support` |
| **Slot** | Section hero / illustration panel |
| **Expected path** | `/images/heroes/asset-44.jpg` |
| **HTTP** | 404 |

**Aspect ratio:** 16:9 · **Export:** 1920 × 1080 JPG

**Nano Banana Pro prompt:**

> Sophisticated architectural visualization: network of glowing verdant green data nodes connected by fine precise lines, pristine light-grey architectural background. High-key soft modern lighting, professional clean NGO technology aesthetic, abstract but photoreal rendering style. No text. **Aspect ratio 16:9.**

---

### Research article — `/research/distributed-ai-safety`

#### NP-22 · Article author headshot

| Field | Value |
| --- | --- |
| **Page** | `https://nonprofits.movemental.ai/research/distributed-ai-safety` |
| **Expected path** | `/images/heroes/asset-23.jpg` |
| **HTTP** | 404 |
| **Alt** | Author |

**Aspect ratio:** 1:1 · **Export:** 512 × 512 JPG (shown in author byline block)

**Nano Banana Pro prompt:**

> Professional author headshot for a research article on AI safety. Male or female senior researcher, neutral studio background, soft natural light, credible academic publisher tone. **Aspect ratio 1:1.**

---

#### NP-23 · Article inline figure — neural network visualization

| Field | Value |
| --- | --- |
| **Page** | `https://nonprofits.movemental.ai/research/distributed-ai-safety` |
| **Slot** | Inline article figure (`w-full h-auto object-cover`) |
| **Expected path** | `/images/heroes/asset-24.jpg` |
| **HTTP** | 404 |

**Aspect ratio:** 16:9 · **Export:** 1600 × 900 JPG

**Nano Banana Pro prompt:**

> Digital visualization of a neural network: glowing emerald green nodes connected by intricate filaments of light on soft off-white background. Clean minimalist scientific precision, data flow and provenance paths, rigorous academic analysis mood. No labels or text. **Aspect ratio 16:9.**

---

## Quick reference — all missing paths

```text
/images/heroes/asset-6.jpg
/images/heroes/asset-19.jpg
/images/heroes/asset-20.jpg
/images/heroes/asset-21.jpg
/images/heroes/asset-23.jpg
/images/heroes/asset-24.jpg
/images/heroes/asset-25.jpg
/images/heroes/asset-26.jpg
/images/heroes/asset-30.jpg
/images/heroes/asset-31.jpg
/images/heroes/asset-35.jpg
/images/heroes/asset-44.jpg
/images/team/a-portrait-of-a-male-instructor-with-a-neatly-tr.jpg
/images/team/a-clean-modern-headshot-of-a-male-policy-researc.jpg
/images/team/a-bright-optimistic-portrait-of-a-female-field-o.jpg
/images/team/close-up-professional-portrait-of-a-male-lead-re.jpg
/images/team/close-up-professional-portrait-of-a-female-resea.jpg
/images/team/professional-profile-of-a-man-in-a-modern-office.jpg
/images/team/portrait-of-a-young-female-researcher-in-a-brigh.jpg
/images/team/detailed-portrait-of-a-male-field-operative-with.jpg
/images/impact/serious-but-approachable-academic-professional-h.jpg
/images/research/abstract-visualization-of-a-global-data-network.jpg
/images/research/modern-minimalist-laboratory-or-server-room-with.jpg
```

---

## Re-audit

Re-run after deploying assets:

```bash
# From movemental-ai repo — quick broken-image scan
node scripts/audit-audience-demo-images.mjs   # add if you want this scripted; audit was ad-hoc 2026-06-29
```

Or repeat the crawl logic used for this audit (internal link walk + HTTP check on every image URL in SSR HTML).

---

*Registered in the agent orchestration pack for local HTML viewer. Related audience routes: `src/app/agent/{nonprofits,churches,institutions}/page.tsx` · demo URLs in `src/components/agent-room/audience/the-build-data.ts`.*
