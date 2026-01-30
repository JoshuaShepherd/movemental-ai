# Auth / Login Page Templates - Build From Scratch Prompt

## Objective

Build the entire auth/login page template set from scratch. No templates exist yet. ~1 reference image is available — additional references needed.

## Current State

**0 variants implemented.** No switcher, no route, no manifest.

## Reference Images

Located in `_docs/reference-images-all/` with prefix `auth-*` (~1 image). This category needs significant reference sourcing.

## Required Work

### 1. Source Additional References

Only ~1 reference image exists. Source 7-9 more from:

- Clerk (modern auth with social providers)
- Linear (minimal dark login)
- Vercel (clean split-screen auth)
- Notion (simple centered auth)
- Stripe (corporate auth with branding)
- Discord (playful themed auth)
- Supabase (developer-focused auth)
- Auth0 (customizable branded login)

Save to `_docs/reference-images-all/auth-{descriptor}-{index}.png`.

### 2. Full Build for Each Reference

Follow `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md`:

1. Analyze each reference
2. Define `[data-variant="auth-*"]` token overrides in `globals.css`
3. Build component in `components/layouts/movement-leader/auth-{variant-name}.tsx`
4. Verify against `00-iron-clad-rules.md`

Auth pages typically include:
- Login / signup form with email and password
- Social login buttons (Google, Apple, etc.)
- Brand logo and tagline
- Terms and privacy links
- Forgot password / magic link options

**Suggested variant concepts:**
- auth-split-image (left form, right hero image)
- auth-centered-card (centered card on gradient background)
- auth-dark-minimal (dark theme minimal form)
- auth-social-first (social login buttons prominent)
- auth-branded-hero (full brand story with auth sidebar)
- auth-magic-link (email-only magic link flow)
- auth-tabbed-form (login/signup as tabs)
- auth-gradient-overlay (form over gradient background)

### 3. Create Template Switcher

Create `components/layouts/movement-leader/auth-template-switcher.tsx`.

### 4. Create Page Route

Create `app/templates/movement-leader/auth/page.tsx`.

### 5. Create manifest.json

Create `_docs/reference-archive/auth-page/manifest.json`.

### 6. Register in Index

Export all components and the `AuthVariant` type from `index.ts`.

## Iron-Clad Rules

Read and follow `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` in full.

## File Locations

| Item | Path |
|------|------|
| Template components (create) | `components/layouts/movement-leader/auth-*.tsx` |
| Template switcher (create) | `components/layouts/movement-leader/auth-template-switcher.tsx` |
| Page route (create) | `app/templates/movement-leader/auth/page.tsx` |
| Reference images | `_docs/reference-images-all/auth-*` |
| Reference archive (create) | `_docs/reference-archive/auth-page/manifest.json` |
| Central registry (update) | `components/layouts/movement-leader/index.ts` |
| Token config | `tailwind.config.ts` |
| Global CSS overrides (update) | `app/globals.css` |
| Iron-clad rules | `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` |
| Full build workflow | `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md` |
| Existing switcher example | `components/layouts/movement-leader/assessments-template-switcher.tsx` |
| Existing route example | `app/templates/movement-leader/assessments/page.tsx` |
