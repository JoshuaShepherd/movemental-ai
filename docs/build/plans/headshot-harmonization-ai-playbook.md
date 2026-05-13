# Playbook — Harmonizing disparate headshots with AI (Nano Banana 2 and similar)

**Goal:** Take mismatched source photos (mixed lighting, crops, backgrounds, aspect ratios) and produce a **visually cohesive set** for the public site — **without** altering recognizable identity: **face structure, expression, skin, hair, and clothing stay faithful to the source.**

**Non-goals:** Beauty filters that reshape faces, “de-aging,” gender or ethnicity presentation changes, or swapping wardrobe. If a model drifts into any of that, **discard the output** and re-prompt or fall back to manual retouching.

**Canonical design context:** Editorial, token-first surfaces per [`docs/design/DESIGN.md`](../../design/DESIGN.md) (light default, optional global dark, Midnight regional bands). Headshots should read as **one intentional photographic system**, not nine unrelated stock shoots.

**Related skills:** [`asset-generate`](../../../.claude/skills/asset-generate/SKILL.md) (generation briefs), [`asset-edit`](../../../.claude/skills/asset-edit/SKILL.md) (edits with explicit keep/change), [`image-optimize`](../../../.claude/skills/image-optimize/SKILL.md) (WebP variants after approval).

---

## 1. What “cohesion” actually means (levers you *are* allowed to pull)

Treat the person as **frozen geometry and texture**; treat everything else as **negotiable**.

| Lever | Typical use | Identity risk |
|--------|-------------|----------------|
| **Aspect ratio & crop** | Unify to one canvas (e.g. 4:5 for cards, 1:1 for small avatars) | Low if you crop from shoulders up and **do not** invent missing limbs or torso |
| **Background** | Solid, soft gradient, or subtle editorial blur consistent across the set | Low when described as *behind* the subject only |
| **Relighting (global)** | Match key direction, softness, and warmth across portraits | Medium — keep prompts **scene-level** (“same soft key from camera-left”) not “reshape cheekbones” |
| **Color grade** | Shared white balance, shadow tint, highlight roll-off | Medium — avoid pushing skin into unnatural orange/gray |
| **Grain / sharpness / micro-contrast** | Same “film” or “digital” finish so files feel like one shoot | Low |
| **Edge treatment** | Same vignette strength, corner radius preview, or cutout softness | Low |

**Rule of thumb:** If a stakeholder could look at A and B side-by-side and say “same photographer, same day, sensible wardrobe variety,” you have cohesion. If they say “same FaceTune preset,” you went too far.

---

## 2. Pick one “visual contract” before touching any image

Write a **one-page spec** (bullets are enough) that every portrait must satisfy:

1. **Output geometry** — e.g. master **4:5 @ 960×1200** for `public/images/voices/`, plus derived 1:1 if needed for dense UI.
2. **Framing** — e.g. “eyes on upper third line; chin to crown occupies ~55% of frame height; minimal forehead clipping.”
3. **Background vocabulary** — pick **one** of:
   - **Studio:** seamless paper or soft cyclorama (single hue family).
   - **Environmental blur:** same lens language (e.g. “85mm, f/2, subject sharp, background creamy”).
   - **Dark band:** muted cool/warm dark gradient that still reads on `bg-inverse-surface` / Midnight sections without pure black.
4. **Light model** — e.g. “large soft source camera-left + gentle fill; no hard specular rectangles on glasses; no second conflicting key.”
5. **Palette tie-in** — not hex in prompts; describe **hue family** that harmonizes with site tokens (cool neutrals + restrained warmth; primary `#0053db` is for **UI**, not necessarily background floods on faces).
6. **Forbidden moves** — explicit list: no wardrobe recolor, no beard/hair edits, no tooth whitening, no “make them smile,” no slimming.

Store the spec next to exports (e.g. `docs/build/plans/headshot-spec-YYYY-MM.md` or a pinned Notion page) so future additions match the same contract.

---

## 3. Pipeline (recommended order)

### Phase A — Ingest & normalize inputs

1. **Collect highest-resolution originals** (RAW or JPEG from photographer > phone screenshot > web thumbnail).
2. **Rename by slug** (`alan-hirsch-source.jpg`) and note **rights** (work-for-hire, license, or written permission for AI refinement).
3. **Light technical prep (non-AI):** straighten, lens-profile if you have it, **neutral white balance** as a starting point — AI grades stack better on neutralized sources.

### Phase B — “Style anchor” (optional but high leverage)

1. Produce **one gold-reference portrait** (best source subject + best lighting) that already matches the contract.
2. Use that file as the **style reference** in subsequent edits (“match lighting, grain, and background treatment to reference **without** copying the face”).
3. If the tool does not support multi-image style transfer, **verbalize** the gold reference in the spec (Section 2) and paste the same block into every prompt.

### Phase C — Per-subject pass (Nano Banana 2 / edit-first workflow)

Use an **edit-first** mental model even if the product is labeled “generation”: you are **re-photographing the plate**, not inventing a person.

**Per portrait, one major operation per turn** (per `asset-edit` guidance):

1. **Turn 1 — Background + canvas**  
   Prompt pattern:  
   *“Using the attached photo: replace **only** the background with [spec background]. Extend canvas to [aspect ratio]. **Preserve the person’s face, hair, skin, body, clothing, and accessories exactly** — no beautification, no wardrobe changes, no facial restructuring. Photorealistic.”*

2. **Turn 2 — Relight to match set** (if needed)  
   *“Adjust **global** scene lighting so key light matches [spec]: soft source from camera-left, gentle fill. **Do not** alter facial features or clothing. Keep identity pixel-locked to source where possible.”*

3. **Turn 3 — Grade + finish**  
   *“Apply the shared color grade: [warm/cool neutrals, shadow tint, highlight rolloff]. Add subtle [grain/sharpness] per spec. **Still** no changes to face or attire.”*

4. **Turn 4 — Crop guard** (if model widened frame oddly)  
   *“Re-crop to [framing spec]. **Do not** resize head larger or smaller relative to frame.”*

After each turn: **save intermediate** — models recover poorly from bad cumulative edits.

### Phase D — Deterministic finish (outside the model)

1. **Crop & export** with Sharp/ffmpeg to exact pixel dimensions used in Next.js (`sizes`, card layout). Repo precedent: `scripts/process-voices-portraits.ts` (Sharp, 4:5, `public/images/voices`).
2. **Optimize** WebP quality / responsive variants per `image-optimize` skill when shipping.

---

## 4. Prompting patterns that reduce “identity drift”

- **Lead with preservation:** first sentence = what must **not** change; second sentence = what **may** change.
- **Name the attachment explicitly:** “the person in the **input image**” beats “this man” / “this woman” (reduces model hallucination of a different archetype).
- **Avoid competitive instructions:** do not ask for “dramatic cinematic lighting” and “absolutely unchanged face” in the same breath unless you prioritize one.
- **Negative space for UI:** if cards overlay text, ask for **clean shoulder-line silhouette** and low-detail background in **text-safe zones** (usually lower third).
- **Glasses / jewelry / clerical collar:** call them out as **must-preserve** when present.

---

## 5. QA gate (binary checks before merge)

For each output vs source:

| Check | Pass criteria |
|--------|----------------|
| **Identity** | A colleague recognizes them instantly; family would not call it “wrong.” |
| **Wardrobe** | Pattern, color family, collar shape unchanged (compression ≠ recolor). |
| **Geometry** | Head size vs shoulders within ~5% of source at same crop class; no elongated neck. |
| **Skin** | Texture still human; no plastic blur; no shifted undertone vs source beyond agreed grade. |
| **Artifacts** | No extra fingers; no melted glasses; no duplicated collars; no text gibberish in background. |
| **Accessibility** | If used on Midnight, silhouette still reads; not only low-luminance edge separation from `bg-inverse-surface`. |

If any check fails: **revert to last good intermediate** or schedule **manual** retouch.

---

## 6. Rights, consent, and comms

1. **Permission** — AI refinement still counts as derivative use; ensure contracts or email allow it.
2. **No impersonation** — do not generate **new** poses implying endorsement of products/events the person did not agree to.
3. **Credit** — optional “Portrait treatment …” in internal docs; public site usually credits the **person**, not the model.
4. **Retention** — keep originals immutable; store prompts + seeds + tool version with exports for reproducibility.

---

## 7. When to stop using AI and hire light

- Source is **<600px** face height after crop.
- **Heavy mixed lighting** (magenta stage wash + daylight) — models invent transitions.
- **Occlusion** (mic covering mouth, hat brim shadow on eyes).
- **Legal sensitivity** (board members, minors, trauma contexts).

Fallback: **single photographer, single lighting diagram**, same backdrop — AI only for cleanup.

---

## 8. Practical Movemental defaults (suggested starting point)

These align with the voices graph + founder cards without dictating creative finality:

- **Master ratio:** 4:5 (matches `960×1200` pipeline in `process-voices-portraits.ts`).
- **Background:** soft cool-neutral gradient (`slate` family) slightly lifted in shadows — reads on both `bg-card` and Midnight bands.
- **Light:** large soft key camera-left; fill ~1.5 stops under key; no hard rim unless reference set already uses one.
- **Finish:** light editorial grain + restrained sharpening on eyes only (if tool allows localized sharpening; otherwise global mild).

Adjust once with design + comms, then **freeze** the spec for the whole roster refresh.

---

## 9. Deliverables checklist

- [ ] Written visual contract (Section 2) approved.
- [ ] Source files archived with rights notes.
- [ ] Per-slug final WebP + optional 1:1 derivative.
- [ ] QA sheet signed (even self-review) per Section 5.
- [ ] `pnpm` image pipeline run if filenames/slugs changed in code.

---

## Revision log

| Date | Author | Notes |
|------|--------|--------|
| 2026-05-13 | — | Initial playbook for NB2-class tools + Movemental cohesion constraints. |
