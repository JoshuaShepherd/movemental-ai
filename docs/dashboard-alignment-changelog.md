# Dashboard alignment — editorial changelog

This document records the **customer-facing and systemic** changes delivered across the dashboard alignment build sequence (Prompts 01–08). It is the handoff artifact for contributors who need to understand the **editorial and chromatic discipline** the authenticated surface now holds.

## Copy and register

- **Copy scrub:** Removed or rewrote implementation-flavored strings (“Save”, “Cancel”, “No rows / tables not migrated”, “wiring ships”, raw path-only links) in favor of calm, board-room language (“Record profile”, “Close editor”, “Not now”, “Record a preview without publishing”, “Your commitment is on file.”).
- **Editorial register commitment:** Product homes (SandboxLive, SafeStart, Leader) and org-admin surfaces use the shared **editorial home** vocabulary (`editorial-home.ts`): Newsreader-scale display lines, pathway eyebrows, hairline sectioning, and **Inter** for explanatory body copy.

## Chrome and layout

- **Single shell:** `AuthenticatedShell` replaced stacked headers; the teaching guide’s **duplicate sticky midnight bar was retired** — the shell supplies the only persistent midnight chrome.
- **Warm midnight:** `movemental-midnight` token moved to a **warmer** near-ink (`#141110`) aligned with inverse surfaces, applied consistently to header and side rails.
- **Product context:** Labels read **SandboxLive** and **SafeStart** (not generic “Sandbox” / “Safe”); context appears in a **rectangular amber pill** (square corners per dashboard radius discipline).
- **Sidebar:** **240px** rail; **3px** burnished-amber left border on active items; **13px** Inter, **12px** vertical padding; **0.5px** hairlines between items and section bands; section titles include **Engagement**, **Phases**, **Cohort**, **Organization**, **Author reflection**, **Publish**.
- **Org switcher:** Dropdown is used for **one or many** orgs so the **Leader workspace** shortcut is always woven into the same control pattern when applicable.

## Motion of onboarding

- **Progress rail:** Amber fill and editorial caption under the header when org or leader onboarding is **incomplete**; hidden where not applicable (e.g. leader-only shell choices per layout rules).

## Surfaces built or upgraded

- **Future Plan editor / export:** Board export gaps no longer use dashed “kind” placeholders; they use **`EditorialEmptyState`**-backed **`ExportDraftGap`** so print and screen both stay on-register.
- **Fixture resolution:** (Carried forward from earlier prompts in the sequence.) Program and phase fixtures remain the technical backbone; user-visible gaps are framed editorially, not as engineering errors.
- **Org admin:** Profile, settings, agreements, billing, members — **Record** language, **pathway** primary buttons, square field geometry, agreements register empty state componentized.
- **Leader public page:** Ratification flow uses **pathway** primaries, non–save/cancel dialog framing, and **public-site links** (`/voices`, `/movement-voice-commitments`, live URL) via **`DashboardPublicSiteLink`**.

## Public marketing continuity

- **Session-aware header CTA:** Authenticated users see dashboard or leader CTAs instead of “Start a Conversation”; users with **both** org and leader access see **Leader workspace** as the **primary** marketing CTA with dashboard as secondary.

## System tokens and components

- **`--rule` / `--color-rule`:** Dedicated hairline color for **0.5px** rules on cream surfaces.
- **`Button` `pathway` variant:** Burnished amber, **square** corners, for primary actions inside the dashboard without changing global ink-pill marketing semantics.
- **`DashboardPublicSiteLink`:** Canonical amber editorial link style for **public-site** references from inside the shell.

## Verification artifact

- **Route inventory:** `docs/dashboard-route-inventory.md` is the **post-build SSOT** for authenticated routes, chrome behavior, empty-state policy, and token notes.
