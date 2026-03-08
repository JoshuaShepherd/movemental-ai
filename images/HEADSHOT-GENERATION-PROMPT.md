# Headshot generation with ChatGPT Images (reference + prompt)

Use **ChatGPT Images** (powered by GPT Image 1.5) to turn a reference photo into a consistent, product-ready headshot. The model keeps **face, likeness, and expression** and lets you change **aspect ratio, background, lighting, and color** via prompt.

---

## How to use it in ChatGPT

1. **Open ChatGPT** (chatgpt.com) and start a new chat.
2. **Upload your reference image** — attach the photo of the person (see “Reference image” below).
3. **Paste the prompt** (or the short variant) into the same message or a follow-up, and send.
4. **Iterate** — e.g. “Same person, make the background a soft sage gray” or “Keep everything the same but output as 4:5 portrait.”

**Tip:** In the dedicated **Images** experience (sidebar on chatgpt.com), you can use a **one-time likeness upload** and reuse it across generations without re-uploading.

---

## Reference image

Use **one clear photo per person** that shows:

- **Face and shoulders** clearly visible, well lit.
- **Neutral or simple background** (so the model isn’t fighting a busy scene).
- **Front or 3/4 view**; eyes open, natural expression.
- **High enough resolution** (e.g. 800px+ on the short edge) so detail is preserved.

The model will preserve **identity and likeness** and change only what you ask (background, aspect ratio, lighting, etc.).

---

## Full prompt (copy-paste)

Use this when you upload a **reference photo** and want a **single canonical 4:5 professional headshot** with neutral background.

```
Using the person in the attached/reference image, create a professional headshot that meets all of the following. Preserve the person's exact face, facial features, skin tone, expression, and likeness—do not alter identity in any way.

Output a single portrait image with these specs:
- Aspect ratio: 4:5 (portrait), with the face in the upper 50–60% of the frame so the image can be cropped to square later without losing the face.
- Framing: Head and shoulders (or slightly more torso); face clearly centered and well lit.
- Background: Solid, neutral, soft—e.g. soft gray, warm white, or very subtle gradient. No patterns, no busy environments, no logos or text. The background should work when the image is later cropped to a circle (e.g. for avatars) or placed on different template backgrounds.
- Lighting: Soft, even, slightly warm; professional portrait style. No harsh shadows, no dramatic or cinematic grading. Natural skin tones and believable detail (pores, fabric) so it reads as a real photograph.
- Style: Photorealistic, clean, editorial-style headshot suitable for a team page, author byline, or professional profile. No watermarks, no extra text, no accessories or props unless already present in the reference.

Do not change the person's appearance, age, or identity. Change only background, framing/crop, lighting balance, and overall polish to match the description above.
```

---

## Short prompt (same intent, fewer words)

```
Using the person in this image: create a 4:5 professional headshot. Keep their exact face, features, and likeness. Use a solid neutral background (soft gray or warm white), soft even lighting, head-and-shoulders framing with face in the upper half of the frame. Photorealistic, no text or watermarks. Only change background, crop, and lighting—do not alter the person.
```

---

## Variant prompts (after you have the first result)

Once you have a 4:5 headshot, you can ask for **derivatives** in the same chat (the model will keep likeness across edits):

- **Square (for avatars/circles):**  
  `Crop or reframe this image to a square (1:1), keeping the face centered and clearly visible. Keep the same neutral background and lighting. Do not change the person's appearance.`

- **Different background:**  
  `Keep the person exactly as they are. Replace only the background with [e.g. soft sage green / warm cream / dark charcoal]. Same lighting style and photorealistic quality.`

- **Softer or warmer lighting:**  
  `Keep the person and composition identical. Make the lighting slightly warmer and softer. Do not change face or background.`

- **Black and white:**  
  `Convert this headshot to black and white. Preserve the person's likeness and framing. High contrast, professional portrait look.`

---

## Notes

- **ChatGPT Images** (and the API model **GPT Image 1.5**) are described in [OpenAI’s Dec 2025 announcement](https://openai.com/index/new-chatgpt-images-is-here/) and the [Image Gen 1.5 prompting guide](https://cookbook.openai.com/examples/multimodal/image-gen-1.5-prompting_guide). There is no separate “ChatGPT 5.3” image product; image generation in ChatGPT uses this model.
- For **stronger identity preservation** on larger edits, the API supports `input_fidelity="high"`; in ChatGPT, uploading a clear reference and stating “preserve exact face and likeness” in the prompt is the equivalent.
- Use the **full prompt** when you want the first output to match the [headshot design spec](../_docs/site-docs/scenius-network-node-images.md) and the 4:5 team card layout; use the **short prompt** for quick tests, then refine with the variant prompts above.
