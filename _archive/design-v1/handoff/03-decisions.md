# 3 · Decisions

Every contradiction between the designs and the repo, classified. Nothing here
may be resolved silently by the implementing agent.

## Locked — implement the resolution, do not revisit

**L-1 · `/agent/path/safety` is a new route.**
Create `src/app/agent/path/safety/page.tsx`. It is the only new public route in
this migration. Build it from `designs/Movemental Safety Stage.dc.html`. Content
sources already exist: `src/lib/agent-room/data/safety-charter.ts`,
`data/safety-flow.ts`, `data/pricing.ts`, `data/faq.ts`, `naming.ts`. Do not
invent a data file for it.

**L-2 · Package manager is pnpm.**
Both lockfiles are committed, but `pnpm-workspace.yaml` is pnpm-only and
declares a pnpm 11 `allowBuilds` allowlist. Use `pnpm` for every install and
script. Do not delete `package-lock.json` as part of this work — that is a
separate cleanup and deleting it here will bury a real change in an unrelated
diff.

**L-3 · No role or bio text for the 25 movement leaders.**
Names and headshots only, everywhere they appear. `primary_role` is empty in the
table for all but one person, so any descriptor would be unverified. If the
field is populated later, rendering it is a one-line change — leave the seam,
do not pre-fill it.

**L-4 · Zero hex in component source.**
The designs are inline-styled HTML because that is what the design tool emits.
Every colour maps to an existing Ink Band variable — the table is in
`04-component-map.md`. A hex literal in a `.tsx` file is a defect.

**L-5 · Home is v4.**
`designs/Movemental Home v4.dc.html`. The other three home files are shipped as
history so you can see what changed and why; they are not build targets.

**L-6 · Do not rebuild auth or legal pages.**
`/login`, `/signup`, `/forgot-password`, `/auth/update-password`, `/terms`,
`/privacy`, `/cookies` all exist and are authored. The Utility Shell design
covered them only because the earlier prompt believed they were gaps.

## Stop and report — halt that phase only, continue the others

**S-1 · `/dashboard/ai-reality` has no design.**
It is a real, substantive, auth-gated screen. Do not design one, do not restyle
it, do not delete it. Write one line to the state file naming it as uncovered
and move on.

**S-2 · Any safety table beyond the four named.**
The designs are grounded in `safety_artifacts`, `safety_artifact_versions`,
`safety_artifact_publications`, and the provisioning path. If a screen appears
to need `safety_guidebooks`, `safety_guidebook_ratifications`, or
`safety_guidebook_signatures`, stop — those are unused and reaching for them
means the screen was misread.

**S-3 · Publishing permission.**
Today any org member can publish a board document; the dashboard UI implies
role-gating. This is a product gap, not a design bug. Do not add a role check
to make the UI true, and do not remove the UI affordance to make the code true.
Report it and leave both as they are.

## Check and branch — verify, then take the stated path

Written this way because these capabilities were **not** personally verified.

**C-1 · `LegalPageContent` props.**
Check `src/components/ink-band/legal-page-content.tsx` for the props used in
`terms/page.tsx` (`eyebrow`, `title`, `lede`, `sections[]`, `footerLinks[]`).
*If present* — reuse the component for any legal-shaped surface.
*If absent or different* — do not modify the component; build the surface
inline and record the mismatch in the state file.

**C-2 · `MOVEMENTAL_LOGO` export.**
Check `src/lib/brand/assets.ts` for `MOVEMENTAL_LOGO` with `lightSrc`,
`darkSrc`, `alt`, `width`, `height`.
*If present* — use `<MovementalLogo />` for every wordmark.
*If absent* — do not add an `<img>` with a hardcoded path; record and use a
text wordmark in the display face.

**C-3 · Tenant org id.**
Check `src/lib/tenant.ts` for `getTenantOrgId()`.
*If present and returns a value* — org-scoped screens read from it.
*If it returns null in the target environment* — render the existing
"Dashboard not configured" state rather than inventing an org picker.

**C-4 · Article markdown loader.**
Check `src/lib/articles.ts` for the frontmatter fields the articles hub renders.
*If the loader exposes them* — read through it.
*If a field the design shows is missing* — omit that field; do not add
frontmatter to the markdown files as part of this migration.

**C-5 · `ink-band.module.css` class availability.**
Before writing a new style block for anything inside `agent-room/`, grep the
138KB module for an existing class.
*If one exists* — use it.
*If not* — add to that module, not to a new stylesheet.
