# Courses Page Templates - Build From Scratch Prompt

## Objective

Build the entire courses page template set from scratch. No dedicated course page templates exist yet (content-instructor-courses and content-lesson-list are content hub variants, not standalone course pages). This is a **new page type** — ~16 reference images are available.

## Current State

**0 variants implemented.** No switcher, no route, no manifest.

## Reference Images

Located in `_docs/reference-images-all/` with prefix `courses-*` (~16 images). This is one of the best-resourced unbuilt categories.

## Required Work

### 1. Full Build for Each Reference Image

For each of the ~16 reference images, follow `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md`:

1. **Analyze** the reference image — layout, colors, typography, interactive elements
2. **Define tokens** — create `[data-variant="courses-*"]` override blocks in `globals.css`
3. **Build component** — `components/layouts/movement-leader/courses-{variant-name}.tsx`
4. **Verify** against `00-iron-clad-rules.md` checklist

Course pages are complex — expect layouts with:
- Course catalog/grid views
- Course detail pages with curriculum outlines
- Lesson/module navigation
- Progress indicators
- Enrollment CTAs
- Instructor profiles
- Video player placeholders

### 2. Create Template Switcher

Create `components/layouts/movement-leader/courses-template-switcher.tsx` following the pattern in `assessments-template-switcher.tsx`.

### 3. Create Page Route

Create `app/templates/courses/page.tsx` following the established route pattern.

### 4. Create manifest.json

Create `_docs/reference-archive/courses-page/manifest.json` mapping all variants to reference images.

### 5. Register in Index

Export all courses components and the `CoursesVariant` type from `components/layouts/movement-leader/index.ts`.

### 6. Fidelity Verification

Run the fidelity reconciliation pass per `02-template-reference-fidelity-plan.md`.

## Iron-Clad Rules

Read and follow `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` in full.

## File Locations

| Item | Path |
|------|------|
| Template components (create) | `components/layouts/movement-leader/courses-*.tsx` |
| Template switcher (create) | `components/layouts/movement-leader/courses-template-switcher.tsx` |
| Page route (create) | `app/templates/courses/page.tsx` |
| Reference images | `_docs/reference-images-all/courses-*` |
| Reference archive (create) | `_docs/reference-archive/courses-page/manifest.json` |
| Central registry (update) | `components/layouts/movement-leader/index.ts` |
| Token config | `tailwind.config.ts` |
| Global CSS overrides (update) | `app/globals.css` |
| Iron-clad rules | `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` |
| Full build workflow | `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md` |
| Existing switcher example | `components/layouts/movement-leader/assessments-template-switcher.tsx` |
| Existing route example | `app/templates/assessments/page.tsx` |
