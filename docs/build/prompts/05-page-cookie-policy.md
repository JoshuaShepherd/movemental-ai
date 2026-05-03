# Prompt 05 — Cookie policy (`/cookies`)

## Priority

**P05 — Legal / consent literacy.** Footer links **Cookie Policy**. React page exists: `src/app/(site)/cookies/page.tsx`. **Gap:** no `docs/html/cookies.html` for static review or parity.

## Deliverable

- `docs/html/cookies.html` mirroring `cookies/page.tsx` structure; keep **effective date** synchronized with Privacy when both change.

## Source documents

| Path | Use for |
| --- | --- |
| `src/app/(site)/cookies/page.tsx` | Canonical sections (what cookies, why, control, updates). |
| `src/app/(site)/privacy/page.tsx` | Cross-references; avoid defining “personal data” twice differently. |
| [`docs/html/site-templates/terms.html`](../../html/site-templates/terms.html) | Shell / typographic reference. |

## Product truth (do not over-claim)

- If the marketing site uses **analytics** (e.g. future PostHog / GA), name categories at a **policy** level only; do not hardcode vendor IDs in static HTML that will go stale—use placeholders until engineering confirms.

## Acceptance criteria

- [ ] Explains **essential vs analytics** (or equivalent) in plain language.
- [ ] Links to **Privacy** and **Contact**.
- [ ] Matches nav/footer pattern used on `privacy.html` draft pair.
