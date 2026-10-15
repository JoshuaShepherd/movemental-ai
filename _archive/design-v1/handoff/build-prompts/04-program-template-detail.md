# 04. `/program/[category]/[templateId]` — RE-SCOPED, not built here

**Status** Re-scoped to prompt 20 (dashboard shell) · **Resolved** 2026-09-09

## What the repo actually says

Both routes were read before designing, as this prompt required:

- `src/app/program/page.tsx` — calls `getOptionalAuthUser()` and, with no user,
  `redirect("/login?next=/program")`. Metadata sets `robots: { index: false }`.
  The authenticated view is an honest holding page: "Program templates are not
  on this surface yet."
- `src/app/program/[category]/[templateId]/page.tsx` — the same shape. It
  redirects unauthenticated visitors to `/login?next=/program/<category>/<id>`,
  then renders "Template not available here yet" with the raw `templateId`
  echoed back. It fetches no template data at all.

## The four questions, answered

1. **What is a "template" here?** Undetermined — nothing is fetched. No
   `front_end_templates`, `content_templates`, or `course_blueprints` read
   exists on this route.
2. **What are the categories?** Not enumerated anywhere. `category` is a free
   URL segment echoed into the page.
3. **Public marketing, or authenticated selection?** **Authenticated.** Both
   routes are `noindex` and gated behind login.
4. **Preview imagery?** Not referenced by either route.

## Decision

This prompt's own escape clause applies: *"If the answer to 3 is 'authenticated
selection', this page belongs with the dashboard shell (prompt 20), not with
`/program`, and the prompt should be re-scoped before building."*

It is re-scoped. **Do not build a public program-template page.** Designing one
would mean inventing a content model the repo does not have, and pricing tiers
`pricing.ts` does not price — both forbidden by the ground rules.

The public pricing surface those stubs point at is **prompt 03**, built as
`Movemental Program.dc.html`.

## Carried into prompt 20

When the dashboard shell is designed, it must cover:

- `/program` — authenticated holding page, with its two real CTAs (`/agent`,
  `/enroll`).
- `/program/[category]/[templateId]` — the same, plus the echoed template id and
  a `/program` back link.
- The login redirect state both routes depend on.

Before designing either, establish the template content model with the product
team. Until it exists, the honest design is the holding page the repo already
ships.
