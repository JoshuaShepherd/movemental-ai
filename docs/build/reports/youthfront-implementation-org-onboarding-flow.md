# Implementation-org workspace flow — proposal (Youth Front and similar)

**Context:** For sandbox-first engagements (e.g. Youth Front), operational reality is closer to **two group-level commitments** than a long pinned checklist: get people onto the calendar for in-person work, and run the short diagnostic assessment. Legal closure is often a **single MOU** executed by a COO or counsel, not sixteen surfaced tasks.

**What shipped in code (2026-05):** The persistent white **OnboardingPanel** (collapsible checklist above every dashboard route) is **archived** (`src/components/onboarding/archive/`). Signing is surfaced from the midnight header via **Documents → Memorandum of Understanding (MOU)**, linking to `/onboarding/agreement` (existing `AgreementSigningPanel` with DocuSign when `NEXT_PUBLIC_DOCUSIGN_MOU_URL` is configured). The full checklist remains on **`/welcome`** and linked from the workspace nav as **Onboarding** for teams that still need it.

---

## Recommended flow (intent-ordered)

### 1. Schedule first (group prerequisite)

- **Why first:** Trainings are in-person; cohorts and internal teams move at different times. Scheduling establishes commitment, capacity, and a shared clock before you ask for assessment time or document execution.
- **Product shape:** Prefer **embedded or deep-linked Calendly** (or equivalent) inside the platform so the COO never wonders where “the real” booking lives. You already have cohort scheduling surfaces (`/sandboxlive/cohort/schedule`, onboarding cohort APIs); the proposal is to treat **“Schedule with Movemental”** as the primary CTA for this persona until a session exists—not as a buried onboarding sub-step.
- **Success signal:** A confirmed session (or cohort date) visible to both sides without staff chasing email threads.

### 2. Assessment second (10–15 minutes, group checklist item)

- **Why second:** Once time is reserved, the assessment is a bounded, high-signal input for facilitation—not a prerequisite to *talk* to you, but a prerequisite to **run a useful first session** and to prioritize SandboxLive phases.
- **Product shape:** A single **“Start assessment”** entry point (org-scoped) with explicit time estimate. Deeper AI conversation can remain **post-first-meeting** unless you intentionally want async triage earlier.
- **Success signal:** Completion rate per org + timestamp visible to staff (existing assessment routes / data model can back this once wired).

### 3. MOU / legal (parallel or after schedule, never hidden)

- **Why:** Counsel often runs on a different calendar than operations. It should not block scheduling UI, but it **must** stay obvious until signed. Header **Documents → MOU** keeps it one click away without implying fifteen other tasks.
- **Success signal:** DocuSign Connect (already supported) writes `signed_agreements`; optional staff nudge if session is booked but MOU is open.

### 4. What to de-emphasize for this persona

- Long **phase-gated onboarding checklists** as the default mental model for Youth Front–class orgs.
- Framing **Program** nav as “Safety & Sandbox” when the engagement is sandbox-only (see `docs/build/prompts/per-org-workspace-navigation.md`).

---

## Checklist semantics for “group” items

| Item            | Owner              | Visibility                         |
|-----------------|--------------------|------------------------------------|
| Schedule        | COO / ops delegate | Org dashboard + reminder email     |
| Assessment      | Same or HR partner | Org dashboard; % complete for staff |
| MOU             | COO / counsel      | Header Documents + agreements register |

Avoid duplicating the same three CTAs in the dashboard body, the header, and the SandboxLive hero. Pick **one primary surface per intent** (header for legal, dashboard card or SandboxLive band for schedule/assessment).

---

## Open decisions

1. **Whether MOU must complete before assessment opens** — policy choice; default recommendation is *no hard gate* for schedule, soft nudge before first session if MOU unsigned.
2. **Whether to hide `/welcome` from primary nav** for sandbox-only orgs once schedule + assessment + MOU are first-class—product decision tied to per-org nav (prompt doc).
