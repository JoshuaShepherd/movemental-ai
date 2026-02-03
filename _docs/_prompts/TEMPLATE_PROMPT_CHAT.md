# Chat Interface Templates - Completion Prompt

## Objective

Complete and polish the chat interface template set. 10 variants exist. Focus is on fidelity reconciliation, style cleanup, and manifest creation.

## Current State

**10 variants implemented:**
chat-assistant-friendly, chat-dark-sidebar, chat-hero-overlay, chat-panel-sidebar, chat-split-templates, chat-suggestion-chips, chat-support-minimal, chat-team-channels, chat-warm-greeting, chat-widget-popup

**Switcher:** `components/layouts/movement-leader/chat-template-switcher.tsx`
**Route:** `app/templates/chat/page.tsx`

## Reference Images

Located in `_docs/reference-images-all/` with prefix `chat-*` (~12 images). If any images lack matching components, build the missing variants.

## Required Work

### 1. Create manifest.json

Create `_docs/reference-archive/chatbot-page/manifest.json`:

```json
{
  "templateCategory": "chatbot-page",
  "variants": [
    { "id": "chat-assistant-friendly", "file": "chat-assistant-friendly.tsx", "reference": "<matching-image>.png", "source": "<source-app>" }
  ]
}
```

### 2. Build Missing Variants

Compare the ~12 reference images to the 10 existing components. For unmatched references, follow `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md`.

### 3. Fidelity Reconciliation Pass

Follow `_docs/reference-images-all/template-process-prompts/02-template-reference-fidelity-plan.md` for each variant.

### 4. Style Cleanup

Per `_docs/_prompts/STYLE_CLEANUP_PROMPT.md`, migrate all inline styles to Tailwind utilities.

### 5. Export and Route Verification

All variants exported from `index.ts`, switcher type union complete, route renders correctly.

## Iron-Clad Rules

Read and follow `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` in full.

## File Locations

| Item | Path |
|------|------|
| Template components | `components/layouts/movement-leader/chat-*.tsx` |
| Template switcher | `components/layouts/movement-leader/chat-template-switcher.tsx` |
| Page route | `app/templates/chat/page.tsx` |
| Reference images | `_docs/reference-images-all/chat-*` |
| Reference archive | `_docs/reference-archive/chatbot-page/` |
| Token config | `tailwind.config.ts` |
| Global CSS overrides | `app/globals.css` |
| Iron-clad rules | `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` |
| Full build workflow | `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md` |
| Fidelity plan | `_docs/reference-images-all/template-process-prompts/02-template-reference-fidelity-plan.md` |
| Style cleanup guide | `_docs/_prompts/STYLE_CLEANUP_PROMPT.md` |
