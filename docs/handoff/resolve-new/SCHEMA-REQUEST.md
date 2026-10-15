# Schema request: the Resolution (for the back-end merge)

Requested by slice S02-resolve-new. Nothing here was created; this repo makes no schema changes. The front end keeps this shape in `src/components/mv/resolve/draft.ts` so the screens won't change when storage moves to the server.

## Tables

**resolutions** — one per person per organization (5.3)
- `id`, `person_id` (nullable until saved), `org_type` (church, nonprofit, seminary, denomination), `org_label` (free text; a label only, never a join key), `organization_id` (nullable; set only through the three counting routes in 5.3)
- `visibility` (private, link, public), `share_token` (unique, revocable), `research_consent` (boolean, asked once), `count_in_org` (boolean)
- `display_name`, `role_text`, `org_role` (staff, board, volunteer, member, served; shown only as a count at five or more)
- `created_at`, `updated_at`

**resolution_versions** — every version kept (5.2)
- `resolution_id`, `version`, `created_at`
- `selections` (jsonb: ticked statement ids per theme, starred statement id per theme, skipped themes), `hardest_theme`, `acts` (statement ids), `two_minutes` (text)
- Only the latest version is counted anywhere.

**statements** — canonical text, so agreement can be counted (section 5)
- `id`, `theme`, `position`, `text`, `edition_override` (the church edition replaces one Presence statement)

**invitations** (5.3, 5.4)
- `id`, `inviter_id`, `invitee_email`, `organization_label`, `organization_id` (nullable), `note`, `token`, `sent_at`, `accepted_at`, `status_visible_to_inviter` (the invitee's consent), `reminded_at`

**organization_links** (5.3) — created by a space's owners; count, switch off

**join_requests** (5.3) — approved by owners

**connections** (5.4) — both sides say yes; no counts exposed

## Rules the database must enforce

- Grouped views return nothing below five contributors, overall and per role.
- A typed organization name never adds a Resolution to anyone's counts.
- Inviters see written / not yet / prefers not to say, never selections.
- Share tokens and invitation tokens are revocable.
- Sign-in by emailed link; no passwords (5.1).
