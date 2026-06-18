# 09 — Onboarding content editor

**Priority:** 9 (Josh/Brad-only marketing copy that leaders see during onboarding)  
**Prompt ID:** ranked-09-onboarding-content-editor  
**Primary repo:** `movemental-visual-editor-main`  
**Depends on:** [01](./01-admin-shell-rbac-and-navigation.md)  
**Supabase project:** `movemental` — `vhaiiiykcukrlyvwlgip`  
**Last updated:** 2026-06-18

---

## The prompt

> Build inline and dedicated admin tools for **onboarding copy** — commitment letter, welcome letter, reflected understanding, committed voices bios — gated to authorized content editors (`josh@movemental.ai`, Brad Brisco), not all ops staff.
>
> ### 0. Read first
>
> 1. Sibling: `docs/build/prompts/admin-onboarding-content-inline-edit-prompt.md`
> 2. Sibling: `src/lib/services/admin/onboarding-content.service.ts`
> 3. Sibling: `src/components/admin/onboarding-markdown-editor.tsx`
> 4. Sibling: `src/lib/auth/onboarding-content-editor.ts` — `isOnboardingContentEditor`
> 5. Sibling: `/admin/commitments` — write commitments toggle surface
>
> ### 1. Product model
>
> | Surface | Who | Content |
> | --- | --- | --- |
> | `/admin/commitments` | Content editors + staff read | `write` commitment flags per committed voice |
> | Inline triggers on leader onboarding | Content editors | Edit dialogs from task pages |
> | `/admin/onboarding-content` (optional hub) | Content editors | Index of editable artifacts |
>
> **Gate:** `requireOnboardingContentEditorApiSession()` — email allowlist, stricter than general staff.
>
> ### 2. Editable artifacts
>
> | Artifact | API (sibling) | Storage |
> | --- | --- | --- |
> | Commitment letter | `/api/admin/onboarding-content/commitment-letter` | org-scoped JSON / markdown |
> | Welcome letter | `/api/admin/onboarding-content/welcome-letter` | per leader/org |
> | Reflected understanding | `/api/admin/onboarding-content/reflected-understanding` | corpus JSONB |
> | Committed voice bio | `/api/admin/onboarding-content/committed-voices/[slug]` | voice records |
>
> ### 3. UI requirements
>
> - **`/admin/commitments`:** table of committed voices with toggle + preview link (port `AdminWriteCommitmentsClient`)
> - **Markdown editor:** Tiptap or sibling `OnboardingMarkdownEditor` with preview split
> - **Audit trail:** use `onboarding-content-audit.ts` patterns — who saved, when
> - **Preview as leader:** ops preview hook (`useOpsPreview`) scoped to org
> - Nav: under Operations — Commitments (capability `ops.onboarding.console` for read; write still email-gated on API)
>
> ### 4. Implementation phases
>
> | Phase | Deliverable |
> | --- | --- |
> | 1 | Port API routes + editor allowlist |
> | 2 | Commitments page CRUD |
> | 3 | Inline edit dialogs wired to onboarding task pages |
> | 4 | Welcome letter publish service integration |
>
> ### 5. Guardrails
>
> - Content editors ⊂ staff — non-listed staff get 403 on write APIs
> - Published content must match what leaders see — no shadow markdown tables
> - Version history deferred unless `content_versions` already wired
>
> ### 6. Sign-off checklist
>
> - [ ] Josh can edit welcome letter for canonical leader slug
> - [ ] Brad (facilitator) access matches allowlist policy
> - [ ] Non-editor staff cannot PATCH content APIs
> - [ ] Commitments toggle affects public `/voices` roster source
> - [ ] `pnpm validate:all` green
