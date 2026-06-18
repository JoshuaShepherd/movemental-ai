# Ranked admin build prompts — `dashboard.movemental.ai`

**Purpose:** Ordered, discrete build prompts for a state-of-the-art Movemental **operations admin** used by `josh@movemental.ai` and staff. Each file is paste-ready for Cursor / Claude Code. Execute **in numeric order** unless a later item is explicitly unblocked.

**Platform:** [dashboard.movemental.ai](https://dashboard.movemental.ai) — primary implementation repo **`movemental-visual-editor-main`**. This repo (`movemental-ai`) shares the live Supabase project and hosts some admin APIs + agent/safety surfaces; prompts call out cross-repo ports where needed.

**Supabase project:** `movemental` — `vhaiiiykcukrlyvwlgip`

**Admin principal (verified 2026-06-18):**

| Email | `user_profiles.role` | `staff_users.staff_role` | Active |
| --- | --- | --- | --- |
| `josh@movemental.ai` | `admin` | `founder` | yes |
| `joshuajordanshepherd@gmail.com` | `admin` | `founder` | yes |

**Live data snapshot (same date):**

| Signal | Count |
| --- | ---: |
| Organizations | 41 (39 movement-leader lane, 2 implementation org) |
| Movement leaders | 24 |
| Onbuilding profile sections | 259 across 15 leaders |
| Organization inquiries (Safety enroll) | 7 (all `new`) |
| Active staff users | 3 (2 founder, 1 facilitator) |
| Movement leader applications | 0 rows |

---

## Priority order

| # | Prompt | Why this rank |
| --- | --- | --- |
| [01](./01-admin-shell-rbac-and-navigation.md) | Admin shell, RBAC, navigation | Nothing else ships safely without ops layout + capability gates |
| [02](./02-organizations-tenant-directory.md) | Organizations tenant directory | Single SSOT for “who is on the platform” — supersedes roster/authors/tenants lists |
| [03](./03-enrollment-inquiries-provisioning-console.md) | Enrollment & inquiry provisioning | 7 unprovisioned Safety inquiries; revenue-critical ops gap |
| [04](./04-onboarding-operations-console.md) | Onboarding operations console | Daily unblock tool; APIs partially exist in both repos |
| [05](./05-organization-detail-lifecycle-actions.md) | Organization detail + lifecycle actions | Deep tenant ops: start account, magic link, entitlements, stage |
| [06](./06-users-staff-and-access-management.md) | Users, staff, access management | Invite operators, manage memberships, staff_roles |
| [07](./07-movement-leader-applications-review.md) | Movement leader applications | Inbound pipeline when applications resume |
| [08](./08-cohorts-and-wave-management.md) | Cohorts & wave management | Group 41 orgs by cohort waves; filter directory |
| [09](./09-onboarding-content-editor.md) | Onboarding content editor | Josh/Brad-only copy for welcome letter, commitments, reflected understanding |
| [10](./10-onbuilding-profile-sections-composition-editor.md) | Onbuilding profile sections | Ops CRUD over 259 sections — see also [standalone prompt](../onbuilding-profile-sections-admin-composition-editor.md) |
| [11](./11-author-profile-dossier-admin.md) | Author profile dossier admin | Edit what leaders see on `/profile` — same mappers, not shadow forms |
| [12](./12-assessments-and-diagnostics-admin.md) | Assessments & diagnostics admin | AI Reality, integrity diagnostic, sandbox readiness review |
| [13](./13-corpus-sync-research-and-media-ops.md) | Corpus sync, research, media ops | Bridge research → corpus → agent; onboarding prep unlocks |
| [14](./14-captures-inbox-and-comms-triage.md) | Captures inbox & comms triage | Contact, newsletter, agent-room leads — operational triage |
| [15](./15-audit-log-security-and-platform-settings.md) | Audit log, security, platform settings | Compliance layer; currently `comingSoon` in visual-editor nav |

---

## Authority order (read before any prompt)

1. [docs/architecture/TYPE_SAFETY_CHAIN.md](../../architecture/TYPE_SAFETY_CHAIN.md) — six-layer waterfall (both repos).
2. **Sibling (read-only reference):** `movemental-visual-editor-main`
   - `src/lib/navigation/admin-nav.ts` — capability-gated nav SSOT
   - `src/lib/auth/require-ops-access.ts` + `staff-capabilities.ts` — RBAC
   - `docs/build/prompts/admin-unified-tenant-account-ops-prompt.md` — org directory consolidation doctrine
   - `docs/build/prompts/admin-platform-operations-center-prompt.md` — lifecycle + roster north star
3. [docs/design/INK_BAND_DESIGN_CHAIN.md](../../design/INK_BAND_DESIGN_CHAIN.md) — admin chrome in `movemental-ai` (Ink Band utility shell).
4. Visual-editor design: Warm Scholarly Authority dashboard shell (see sibling `designer-dashboard` skill).

---

## Cross-repo notes

| Concern | Where it lives today |
| --- | --- |
| Admin UI routes (`/admin/*`) | `movemental-visual-editor-main` (production dashboard) |
| Archived admin UI reference | `movemental-ai/_archive/pre-marketing-migration-2026-06/app/(dashboard)/admin/` |
| Onboarding admin APIs | Both repos — `src/app/api/admin/onboarding/*` |
| Safety provision API | `movemental-ai` — `POST /api/admin/safety/provision-enrollment` (port to dashboard repo or proxy) |
| Onbuilding admin (planned) | `movemental-ai` per [onbuilding prompt](../onbuilding-profile-sections-admin-composition-editor.md) |
| Customer workspace (`/dashboard/safety`, etc.) | `movemental-ai` |

When a prompt targets `movemental-visual-editor-main`, branch there (`slice/Sxx-…`). When it targets `movemental-ai`, branch here. Never duplicate divergent admin APIs across repos without an explicit port task in the prompt.

---

## Validation (every prompt)

```bash
pnpm validate:all   # per repo
pnpm typecheck
```

Re-verify live DB shape with **Supabase MCP** on `vhaiiiykcukrlyvwlgip` before schema or CRUD work.

---

**Last updated:** 2026-06-18
