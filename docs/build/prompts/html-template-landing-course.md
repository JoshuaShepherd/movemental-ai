# Prompt: Static HTML — course landing page (Movemental tokens)

## Goal

Ship a **course marketing** landing: hero with logistics (weeks, hours, cohort), dual CTAs, cover/visual, then 2–3 additional **content bands** (e.g. weekly arc quote, immersion, pricing teaser) as static sections. Structure informed by sibling `course-landing`; visuals strictly Movemental.

## Output

`templates/alan-hirsch/exemplars/exemplar-landing-course.html`  
Stylesheet: `./site-theme.css`

## Design constraints (Movemental)

- **Hero:** Prefer **light-primary** hero (`background` / `section`) with strong typography; if you use a midnight band, limit it to one intentional region and pair with `inverse-foreground`.
- **Cover image:** Rounded `card` frame; optional slight rotation only if subtle (≤2deg) and still accessible (no critical text in rotated area).
- **Meta strip:** Icons optional (unicode or inline SVG in `currentColor`); use `muted-foreground` for labels, `foreground` for values.
- **CTAs:** Primary button uses allowed gradient or solid `primary`; secondary = outline using `border` token + `foreground` text.
- **Below-fold sections:** Alternate `section` and `card` stacks; pull quotes in serif italic allowed if you load a second font—**default: Inter only** per DESIGN; if you add serif for quote only, document it in a comment and keep it minimal.

## Reference IA (read-only)

- `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/app/(public)/courses/[slug]/page.tsx`
- `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/course-landing/CourseHeroSection.tsx`
- Other sections in `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/course-landing/`

## Page structure (minimum)

1. Nav.
2. **Hero:** badge pill; `h1` course title; italic subtitle; meta row (3 items); two buttons (Enroll / Syllabus placeholders); cover column in two-column grid (`max-width: var(--container-max)`).
3. **Section 2:** “How the weeks run” — 3 step cards on `section` background.
4. **Section 3:** Quote band on `inverse-surface` **or** elevated `card` panel (pick one pattern, not both competing).
5. **Section 4:** Simple pricing table or three tier cards on `background`.
6. **Footer** CTA repeat (single row).

## Acceptance criteria

- [ ] Clear visual hierarchy: one dominant title in hero.
- [ ] Container max 1200px; horizontal padding matches other templates.
- [ ] No decorative section borders; separation via surface change.
- [ ] Buttons and links have visible `:focus-visible` styles.
