# 10 — Onbuilding profile sections composition editor

**Priority:** 10 (ops CRUD over 259 dossier sections — high value, narrower audience)  
**Prompt ID:** ranked-10-onbuilding-profile-sections-composition-editor  
**Primary repo:** `movemental-ai` (admin surface here; leader companion stays in visual-editor)  
**Depends on:** [01](./01-admin-shell-rbac-and-navigation.md) — or standalone staff gate  
**Supabase project:** `movemental` — `vhaiiiykcukrlyvwlgip`  
**Last updated:** 2026-06-18

---

## The prompt

> **Execute the full build spec in the canonical prompt:**
>
> **[../onbuilding-profile-sections-admin-composition-editor.md](../onbuilding-profile-sections-admin-composition-editor.md)**
>
> This ranked entry exists to place onbuilding admin in the overall priority queue. Summary below — the linked doc is authoritative for phases, API contracts, and QA.
>
> ### Why priority 10 (not higher)
>
> - Depends on staff auth patterns from prompt 01 (or `(studio)/layout` gate)
> - Leader-facing `/onbuilding` companion already works in visual-editor for ratification
> - Ops need directory + onboarding + enrollments (prompts 02–04) before bulk section editing
> - **Josh-only** destructive CRUD — smaller operator surface than org directory
>
> ### Scope reminder
>
> | Surface | Route | Who |
> | --- | --- | --- |
> | Admin composition editor | `/admin/onbuilding` | `josh@movemental.ai` only |
> | Leader companion | `/onbuilding` (visual-editor) | Leader + staff |
>
> ### Live data (2026-06-18)
>
> ```sql
> select count(*) as sections, count(distinct movement_leader_id) as leaders
> from onbuilding_profile_sections;
> -- 259 sections, 15 leaders
> ```
>
> ### Cross-repo note
>
> If admin UI is consolidated onto `dashboard.movemental.ai` only, port this build to `movemental-visual-editor-main` under the same route prefix and keep **identical** domain service semantics — do not fork CRUD logic.
>
> ### Sign-off
>
> Complete checklist §16 in the canonical prompt before marking this ranked item done.
