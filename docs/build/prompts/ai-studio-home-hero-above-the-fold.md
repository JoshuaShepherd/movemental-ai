# AI Studio — Home (or landing) above-the-fold hero

Use this prompt when you want AI Studio to **redesign or rebuild only the above-the-fold hero** for Movemental’s organizational marketing surface. Do not change secondary sections, nav structure, or page length unless the tool requires a minimal wrapper—**scope is hero only**.

**Design authority:** Follow `docs/design/DESIGN.md` (Digital Curator): semantic tokens only (`bg-background`, `text-foreground`, `text-muted-foreground`, `bg-inverse-surface` for midnight bands if used, `text-primary` for deliberate emphasis), Inter, breathing layout, tonal stacking over heavy borders, no pasted-on shadows unless `shadow-ambient` is justified.

---

## Objective

Create an **editorial, high-attention above-the-fold** that feels like a **designed pull-quote moment**: the reader should feel the weight of the setup line, then **typographically lock onto the question**. The block should read as intentional magazine/editorial layout—not a generic SaaS hero.

---

## Visual and typographic direction

1. **Pull-quote energy:** Treat the opening lines and the question as one **composed typographic unit** (generous vertical rhythm, clear hierarchy, optional subtle inset or tonal band so it reads as a “featured quote” without looking like a stock testimonial card).
2. **The question must dominate:** The line **“What are we gonna do about AI?”** should be the **largest, strongest type** in the fold—display scale, tight letter-spacing where appropriate for Inter display, and enough contrast from body/supporting text that it reads as *the* focal point.
3. **Setup → punch:** The lines before the question should read as **inevitable preamble** (slightly smaller than the question but still prominent—like a deck or pull-quote lead-in, not body copy).
4. **Eyebrow discipline:** Small, uppercase or label-style eyebrow per DESIGN.md conventions (letter-spacing for labels), **muted** relative to the headline stack so it frames without competing.
5. **Supporting paragraph:** Calm, readable body width (prose scale); **muted-foreground** is acceptable for de-emphasis vs the quote stack.
6. **Motion (optional):** If animating, prefer **restraint**—stagger the reveal setup → question → eyebrow/supporting text, or a single subtle opacity/translate; respect `prefers-reduced-motion`.

---

## Copy — exact strings (hero only)

### Eyebrow (label above the main headline stack)

**Full-stack AI training and technology for organizations—nonprofits, churches, and institutions.**

(Use an em dash or en dash consistently with the rest of the site; keep the four audience nouns in that order unless a global style guide says otherwise.)

### Headline stack (pull-quote treatment)

**Line 1–2 (setup — keep this narrative, preserve the capital T on “The” if it helps typographic emphasis):**

Now that AI is already inside the organization. There’s no way around **The question.**

**Line 3 (the question — typographic hero):**

What are we gonna do about AI?

*Note for implementation:* If “The question.” reads better on one line with the question below it, you may break lines for measure; **do not** soften “gonna” into “going to” unless explicitly asked—the casual diction is intentional.

### Supporting subtext (replace prior hero subtext only; moderate edit, preserve meaning)

We help organizations discern the **human** and **technological** response—in **that order**—so that AI isn’t built on a fragmented foundation. We provide a clear, logical path for organizations to map their response to the question of AI. Whether you follow the exact sequence we propose is up to you, but **there is a sequence**, and it begins with **safety**, in every sense of the word.

*Implementation note:* Bold markers above are **optional** emphasis for Studio/layout; if the design system uses italic for strategic emphasis instead, follow DESIGN.md and pick one system—do not stack competing emphasis styles.

---

## What stays out of scope

- Everything **below** the first full-width section boundary after this supporting paragraph: **leave unchanged** (or omit from generation).
- Do **not** invent new stage names, pricing, or CTAs unless the existing page already had them directly under the hero—in that case, **preserve existing CTAs and links** and only refresh layout/type around them.

---

## Acceptance checklist (Studio self-verify)

- [ ] Eyebrow matches the exact string in **Eyebrow** (allowing only dash character normalization).
- [ ] Setup + “The question.” + the quoted question appear **exactly** as specified (punctuation included).
- [ ] Supporting paragraph reflects the **revised** copy (human before technological; fragmented foundation; clear path; sequence optional but real; safety first).
- [ ] Question is the **clear typographic focal point** of the fold.
- [ ] No banned hype vocabulary from site voice rules (see `docs/build/prompts/ai-studio-full-site-mvp-phased.md` Phase 0 voice list if in doubt).
- [ ] Token-first styling; no raw hex / `bg-white` / `text-gray-500` shortcuts.

---

## One-line prompt (paste into AI Studio)

**“Design only the above-the-fold hero: eyebrow ‘Full-stack AI training and technology for organizations—nonprofits, churches, and institutions.’ Then a pull-quote-style stack: ‘Now that AI is already inside the organization. There’s no way around The question.’ followed by a dominant display line: ‘What are we gonna do about AI?’ Subtext: we help organizations discern the human and technological response in that order so AI isn’t built on a fragmented foundation; we offer a clear logical path to map their response; the exact sequence we propose is optional but a real sequence exists and begins with safety in every sense. Editorial typography, DESIGN.md tokens, hero-only scope.”**
