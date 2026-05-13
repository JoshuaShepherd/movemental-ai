# Definition of Done — movemental.ai MVP (public site, excluding dashboard)

**Surface:** `movemental.ai` public site — everything under `src/app/(site)/**` plus cross-cutting infrastructure. The dashboard has its own DoD at [`movemental-dashboard-dod.md`](./movemental-dashboard-dod.md) and is **out of scope** here.
**Purpose:** Single source of truth for what "MVP shippable" means for the public marketing site. Drives prioritization, review, and the eventual launch call.
**Last updated:** 2026-05-13 (refinement pass — strategy-work integration, doctrine tightening, tier clarity, verification-path tagging)

---

## 1. How to use this document (humans and AI)

### 1.1 Immutable DOD items — do not delete

- **Never delete, rewrite, or merge away the original DOD items** in Section 3. They are the permanent checklist.
- You may **only** change each item's **status** and **notes** in the tables provided (e.g. Not started → In progress → Done, or Not done / Blocked).
- If scope changes, **add** a new row or appendix note; do not remove historical criteria.

### 1.2 Closed-loop AI review

- An AI (or human) reviews this file against the **actual product**: routes, UI, copy, integrations, analytics, performance.
- Each review **updates statuses and notes** and **appends** one new entry to Section 5 (attempt log). It does **not** erase prior attempts.
- Reviews should cite **what was checked** (environment, URL, account class, lighthouse run, axe report) in the attempt log.

### 1.3 Iterative prompting — one next prompt only

- Section 4 holds **exactly one** active "next prompt" at a time: the **single** instruction that should be run next to move the program toward done.
- When that prompt is executed and its outcome is recorded in Section 5, replace Section 4 with the **next** single prompt (or mark the queue empty if everything in Section 3 is Done).
- **Do not** stack multiple future prompts in Section 4; future work belongs in notes or in the attempt log until it becomes the single next action.

### 1.4 Master completion

- When **every** P1 item in Section 3 is **Done**, the MVP is **shippable to first-wave outreach**. P2 closes within 30 days post-launch; P3 closes opportunistically.
- When **every** item across all tiers is Done, check the box below and add a final entry to Section 5 stating who/what verified end-to-end closure.

**Master P1 checklist (MVP ship gate):** [ ] All Section 3 P1 rows are Done and verified.
**Master full checklist (entire site DOD):** [ ] All Section 3 items (P1 + P2 + P3) are Done and verified.

### 1.5 What "shippable" means at each tier

This document collapses two different "Done" calls into one tracker — the **MVP ship gate** and the **full strategic credibility posture**. They are different milestones. Read this before triaging rows.

- **P1 — MVP shippable.** The public site is honest, navigable, and substantively present. A serious senior leader can land on the site, understand what Movemental is, read the field guides, see the founders' standing, and start a conversation. The doctrine guardrails are honored. The legal and operational baseline is solid. First-wave outreach can begin.
- **P2 — 30-day window.** The full credibility infrastructure is in place. Author bios, the Movement Leader directory with at least three published leaders, the public commitments document, the research hub with Field Paper 01, the press kit, the audience-page case-study signposting. The site reads as an institution, not a startup.
- **P3 — 90-day window.** Reviewer endorsements landed, dashboard walkthrough live, recipe library preview shipped, the Movement Leader directory expanded to 8+ leaders, the first named customer case study published. The site is doing the credibility work the strategy doc described.

Tier inflation is the failure mode to watch for: do **not** demote a P1 to P2 just to ship faster. Do **not** promote a P3 to P1 because it would be nice to have. The tier columns in §3 are the contract.

### 1.6 AI-verifiable vs human-required rows

Some rows can be ratified by automated tooling alone; some require human judgment; some need both. Each row's Notes cell begins with a verification-path tag:

- **`[A]`** — **Auto-verifiable.** A script, CI check, validator, lighthouse run, axe scan, grep audit, or other deterministic tool produces a pass/fail answer. An AI can mark these Done without human review.
- **`[H]`** — **Human-required.** Narrative coherence, copy tone, doctrine fidelity, founder approval of bios, legal review, judgment about whether a page reads at the right register. Mark Done only after a named human (Joshua, Brad, Alan, counsel, or designee) signs off in the row's Notes.
- **`[A+H]`** — **Hybrid.** Automated check exists, but a human ratifies final closure (e.g., form submits succeed in tests, but launch lead confirms the production happy path; grep finds zero violations, but a human spot-checks the borderline matches).

This protects the document from "AI marked everything Done" inflation. When the master P1 checklist is checked, the closing entry in §5 must name the human(s) who ratified every `[H]` and `[A+H]` row.

---

## 2. Context already known (do not treat as unverified unless re-checking)

| Fact | Source / assumption |
|------|---------------------|
| Public route inventory is canonical in `src/app/sitemap.ts` | Re-verify if a `(site)/**` page is added or removed |
| Movement leaders are a **trusted-voice ecosystem layer**, not a 4th audience card | [`docs/build/strategy/movement-leaders-as-ecosystem-layer.md`](../strategy/movement-leaders-as-ecosystem-layer.md) — canonical doctrine |
| Canonical public noun is **"Movement Leaders"**; "Trusted voices" is acceptable only as a section-internal eyebrow/band heading; "Committed Voices" stays internal-only | Strategy doc §02 + IA consultation |
| Audience hubs are exactly three: churches, nonprofits, institutions | Doctrine + sitemap |
| Design quality bar = "The Digital Curator" | [`docs/design/DESIGN.md`](../../design/DESIGN.md) |
| Primary header CTAs are conversation-first; org sign-in is footer utility | `docs/build/notes/homepage-ia-and-eeat-consultation-2026-05-12.md` §2 |
| Pricing economics SSOT is `/pricing`; other pages summarize, don't fork numbers | Same note, §4 |
| Tenant org id required for `/api/newsletter` (`TENANT_ORG_ID`) | `CLAUDE.md` env section |
| Stitch project for visual sources is pinned to `2208910962065880866` | `docs/build/stitch-project.md` |
| Dashboard MVP DoD is tracked separately; do not merge | [`movemental-dashboard-dod.md`](./movemental-dashboard-dod.md) |

---

## 3. DOD registry (original items — permanent)

Update **Status** and **Notes** only. Do not remove rows. IDs are stable once assigned.

**Status vocabulary:** `Not started` | `In progress` | `Done` | `Not done` | `Blocked`
**Tier vocabulary:** `P1` = blocks MVP ship · `P2` = ship within 30 days post-launch · `P3` = post-launch acceptable
**Verification tags (Notes column):** `[A]` auto-verifiable · `[H]` human-required · `[A+H]` hybrid

---

### 3.1 Home — `/`

| ID | Criterion | Tier | Status | Notes |
|----|-----------|------|--------|-------|
| MVP-01 | Hero fold loads above the fold with the canonical promise copy and a single primary CTA ("See the Movemental Path") plus secondary ("Start a Conversation"). | P1 | Not started | [H] `src/components/sections-mock/home/home-content.tsx` |
| MVP-02 | Path fold renders the Safety → Sandbox → Skills → Solutions order with the exact stage names used in `/pathway` and `/the-path`; no alternate orderings appear. | P1 | Not started | [A+H] Cross-check `/pathway/page.tsx` and `/the-path/page.tsx` |
| MVP-03 | Audiences module surfaces exactly three cards (Churches, Nonprofits, Institutions) — movement leaders are NOT a fourth card. | P1 | Not started | [A+H] Doctrine: [strategy/movement-leaders-as-ecosystem-layer.md](../strategy/movement-leaders-as-ecosystem-layer.md) |
| MVP-04 | Credibility fold lists founders with name + role + link to `/about/founders/[slug]`; no decorative initial avatars. | P1 | Not started | [A+H] `src/components/sections-mock/home/credibility-fold.tsx` |
| MVP-05 | Final CTA copy is voiced consistently with the hero (no marketing drift). | P1 | Not started | [H] `src/components/sections-mock/home/final-cta.tsx` |
| MVP-06 | Page passes axe-clean on desktop + mobile viewports with no serious or critical violations. | P1 | Not started | [A] Run `npx @axe-core/cli https://<preview-url>/` |
| MVP-07 | LCP < 2.5s on a Vercel preview deployment for the home route (median of 5 runs, mobile throttled). | P1 | Not started | [A] Lighthouse CI or PageSpeed Insights |
| MVP-08 | OG image + Twitter card render in the LinkedIn / Slack / X unfurl checks. | P1 | Not started | [A+H] Verify against `src/app/sitemap.ts` priority 1.0 page |
| MVP-09 | `/` includes a JSON-LD `Organization` block with founders and `sameAs` links populated. | P2 | Not started | [A] |

---

### 3.2 Path system — `/pathway`, `/pathway/safety`, `/pathway/sandbox`, `/pathway/skills`, `/pathway/solutions`, `/the-path`

| ID | Criterion | Tier | Status | Notes |
|----|-----------|------|--------|-------|
| MVP-10 | `/pathway` index lists the four stages in canonical order with one-paragraph descriptions and links to each stage page. | P1 | Not started | [A+H] |
| MVP-11 | Each stage page (`/pathway/safety`, `/sandbox`, `/skills`, `/solutions`) has a hero, a "what you'll do" section, an outcomes section, a pricing summary line linking to `/pricing`, and a single CTA to `/contact` or `/assess`. | P1 | Not started | [H] |
| MVP-12 | `/the-path` and `/pathway` do not contradict each other on stage order, names, or counts. | P1 | Not started | [A+H] If divergent, decide which is canonical and redirect the other |
| MVP-13 | Pricing numbers shown inline on stage pages match `/pricing` exactly; if not, link out and remove the inline number. | P1 | Not started | [A+H] Source of truth is `/pricing` |
| MVP-14 | Each stage page passes axe-clean with no serious/critical violations. | P1 | Not started | [A] |
| MVP-15 | LCP < 2.5s on `/pathway` mobile preview (median of 5 runs). | P1 | Not started | [A] |
| MVP-16 | Stage pages render correctly with no console errors in latest Chrome, Safari, Firefox. | P1 | Not started | [A+H] |
| MVP-17 | All four stage pages have unique `<title>` and `<meta description>` populated from Next Metadata API. | P1 | Not started | [A] |

---

### 3.3 Start-with-Safety entry point — `/start-with-safety`, `/safety/sign`

| ID | Criterion | Tier | Status | Notes |
|----|-----------|------|--------|-------|
| MVP-18 | `/start-with-safety` has a hero that names the audience problem in plain language and offers a single next action (path link or field guide download). | P1 | Not started | [H] |
| MVP-19 | `/safety/sign` is functional or, if not yet shipped, returns a clear "available on request" state with a `/contact` link — never a blank 500. | P2 | Not started | [A+H] |
| MVP-20 | Page works without JS for first paint (RSC by default). | P2 | Not started | [A] |

---

### 3.4 Field guides — `/field-guides`, `/field-guides/safety`, `/field-guide/sandbox`

| ID | Criterion | Tier | Status | Notes |
|----|-----------|------|--------|-------|
| MVP-21 | `/field-guides` lists available guides with download or read-here CTAs that work (no 404 on the download). | P1 | Not started | [A] |
| MVP-22 | `/field-guides/safety` either renders the guide inline or links to a working PDF/HTML rendering. | P1 | Not started | [A+H] |
| MVP-23 | Email gate (if any) writes to the newsletter table with double opt-in. | P1 | Not started | [A+H] Newsletter integration tested separately in §3.16 |
| MVP-24 | Mobile rendering preserves heading hierarchy and download buttons stay tappable (≥44px). | P1 | Not started | [A+H] |
| MVP-104 | `/field-guide/sandbox` (Volume Two) landing page exists with the same lead-capture pattern as `/field-guide/safety`, the Sandbox PDF properly placed at `/public/downloads/movemental-it-continues-with-exploration-field-guide.pdf`, and editorial framing matching the strategy doc. | P1 | Not started | [H] Mirrors MVP-22 pattern; consolidated lead-magnet path |

---

### 3.5 Pricing — `/pricing`

| ID | Criterion | Tier | Status | Notes |
|----|-----------|------|--------|-------|
| MVP-25 | `/pricing` shows stage-level fees, bundle/comparison logic, and a single qualifying CTA to `/contact` or `/assess`. | P1 | Not started | [H] |
| MVP-26 | All numbers shown on `/pricing` are the same numbers shown anywhere else on the site (one ledger). | P1 | Not started | [A+H] Spot-check `/pathway/*` and home path fold |
| MVP-27 | Page passes axe-clean; table semantics correct for screen readers. | P1 | Not started | [A] |
| MVP-28 | No "starting at" or hidden-cost copy that contradicts the published numbers. | P1 | Not started | [H] |
| MVP-105 | `/dashboard-walkthrough` exists as the editorial walkthrough of the SandboxLive dashboard — eight phase chapters with static designed screenshots paired with substantive narrative, treated as magazine product photography. Linked from `/pathway/sandbox`. | P2 | Not started | [H] |

---

### 3.6 Audience hubs — `/churches`, `/nonprofits`, `/institutions`

| ID | Criterion | Tier | Status | Notes |
|----|-----------|------|--------|-------|
| MVP-29 | Each hub has a hero naming the audience problem in their audience's own vocabulary (church board / executive director / institutional leader), with a "Who this is genuinely for" section per the recent Cursor edit set. | P2 | Not started | [H] Re-verify after recent audience-page Cursor edits |
| MVP-30 | Each hub bridges to the Path system with at least one in-context link per page and signposts the reconstructed case-study scenarios. | P2 | Not started | [A+H] |
| MVP-31 | None of the three hubs introduce a fourth "movement leaders" peer card or "trusted voices" recruiting CTA. | P1 | Not started | [A+H] Doctrine guardrail |
| MVP-32 | Each hub has a primary CTA (`/contact` or `/assess`) and a secondary "see the path" link. | P2 | Not started | [A+H] |
| MVP-33 | Each hub passes axe-clean and renders cleanly on mobile. | P2 | Not started | [A+H] |

---

### 3.7 Trusted-voice & ecosystem surfaces — `/movement-leaders`, `/movement-leaders/[slug]`, `/are-we-compatriots`, `/movement-voice-commitments`, `/voices`

| ID | Criterion | Tier | Status | Notes |
|----|-----------|------|--------|-------|
| MVP-34 | `/movement-leaders` frames Movement Leaders as **definition + practitioner fit**, not as a parallel audience funnel. | P1 | Not started | [H] Doctrine canon |
| MVP-35 | `/voices` displays Movement Leaders as ecosystem proof; no "nominate a voice" or recruiting form. | P1 | Not started | [A+H] Doctrine canon |
| MVP-36 | Public label on `/voices` and in nav uses **"Movement Leaders"** as the canonical noun; "Trusted voices" only appears as a section-internal eyebrow or band heading, never as the public noun for people themselves. | P1 | Not started | [A+H] Internal type names (`CommittedVoice`) stay as-is in code |
| MVP-37 | At least one voice has a working profile link (internal page or external canonical URL) so the page is not all dead-end cards. | P2 | Not started | [A+H] |
| MVP-38 | Pages pass axe-clean and render on mobile. | P2 | Not started | [A+H] |
| MVP-106 | `/movement-leaders/[slug]` individual leader pages exist and render at the editorial register specified in the Stitch prompt set — hero with pull quote, editorial bio, frameworks, endorsements, network position, leader's relationship-to-Movemental essay. **P1 for at least Hirsch, Brisco, and Shepherd; P2 for the rest of the directory.** | P1 | Not started | [H] Mixed tier — P1 gate covers the three founder-tier leaders; remaining roster is P2 |
| MVP-107 | `/are-we-compatriots` audience-segmentation page exists with the seven shared convictions, seven "you are likely a compatriot if" traits, and seven "you are likely not a compatriot if" traits. | P1 | Not started | [H] |
| MVP-108 | `/movement-voice-commitments` public commitments document exists with the ten commitments (five refusals, five practices), signing path for Movement Leaders, and the three-CTA audience segmentation at the bottom. | P1 | Not started | [H] Supersedes the lighter doctrine check at MVP-65 |

---

### 3.8 Assessment & conversion — `/assess`, `/contact`

| ID | Criterion | Tier | Status | Notes |
|----|-----------|------|--------|-------|
| MVP-39 | `/assess` form submits successfully to `POST /api/assess` end-to-end in production with `TENANT_ORG_ID` configured. | P1 | Not started | [A+H] `src/components/studio/IntegrityDiagnosticForm.tsx` |
| MVP-40 | A failed submission (network error, validation error) shows an actionable inline message; no silent failure. | P1 | Not started | [A+H] |
| MVP-41 | `/contact` submits to `POST /api/contact` and triggers the internal notification email when `CONTACT_NOTIFY_EMAIL` is set. | P1 | Not started | [A+H] `src/lib/email/contact-notifications.ts` |
| MVP-42 | `/contact` form has anti-spam protection (rate limit or token); not a bare POST. | P1 | Not started | [A] |
| MVP-43 | Both forms have keyboard-only happy paths verified (tab order, enter to submit, no traps). | P1 | Not started | [A+H] |
| MVP-44 | Both pages have unique titles, meta descriptions, and a single primary CTA. | P2 | Not started | [A] |

---

### 3.9 About + founders — `/about`, `/about/founders/[slug]`, `/about/brad-brisco`, `/about/alan-hirsch`, `/about/joshua-shepherd`

| ID | Criterion | Tier | Status | Notes |
|----|-----------|------|--------|-------|
| MVP-45 | `/about` introduces the company, founders, and the platform's reason for existing in one cohesive narrative. | P2 | Not started | [H] |
| MVP-46 | Each founder slug page (`alan-hirsch`, `brad-brisco`, `joshua-shepherd`) has a bio paragraph + portrait + `sameAs` links (LinkedIn, personal site). | P2 | Not started | [H] `src/lib/site-founders.ts` |
| MVP-47 | Founder pages include a `Person` JSON-LD block so AI overviews and search engines disambiguate them. | P3 | Not started | [A] Superseded by the fuller MVP-110 spec |
| MVP-48 | `/about` and founder pages pass axe-clean. | P2 | Not started | [A] |
| MVP-109 | Substantial editorial author bio pages exist at `/about/brad-brisco`, `/about/alan-hirsch`, `/about/joshua-shepherd` matching the Stitch prompt spec — hero with pull quote, editorial bio with approval timestamp, books, organizational footprint, frameworks, standing, connected Movement Leaders. | P1 | Not started | [H] Explicit gap from the EEAT analysis; bios must be founder-approved before publish |
| MVP-110 | Each author bio page carries a `Person` JSON-LD block with `sameAs` links populated, `worksFor`, and `knowsAbout` fields. | P2 | Not started | [A] Rich-result eligibility |

---

### 3.10 Evidence + EEAT — `/evidence`, `/footnotes`, `/library`, `/technology`, `/how-we-use-ai`, `/research`

| ID | Criterion | Tier | Status | Notes |
|----|-----------|------|--------|-------|
| MVP-49 | `/evidence` cites at least one specific, attributable claim per major argument with a working link or footnote. | P2 | Not started | [H] |
| MVP-50 | `/footnotes` lists the canonical claims/sources registry consistent with `src/lib/citations/eeat-site-claims.json`. | P2 | Not started | [A+H] |
| MVP-51 | Every `Cite` component on the site resolves to an entry in the registry; no broken citation pills. | P1 | Not started | [A] `src/components/citations/cite.tsx` |
| MVP-52 | `/library` either lists external resources with working links or is removed from the sitemap until populated. | P3 | Not started | [A+H] |
| MVP-53 | `/technology` and `/how-we-use-ai` exist with at least one paragraph each describing stance and stack — not placeholder copy. | P3 | Not started | [H] |
| MVP-111 | `/research` publications hub exists with "AI Has Already Arrived" published as Field Paper 01 plus a forthcoming list. | P2 | Not started | [H] |
| MVP-112 | The Field Guides (`/field-guide/safety` and `/field-guide/sandbox`) carry edition number, last-updated date, and a small "Changelog" link visible to the reader. | P2 | Not started | [A+H] EEAT signal — guides are maintained institutional documents, not one-time marketing artifacts |
| MVP-113 | At least three named external reviewer endorsements (real practitioners, full attribution) appear on the Field Guide landing pages within 90 days post-launch. | P2 | Not started | [H] High-leverage EEAT move per strategy doc |
| MVP-114 | At least one named customer case study exists on `/case-studies` within 180 days post-launch. | P3 | Not started | [H] Strategic target documented; not blocking MVP |

---

### 3.11 FAQ — `/faq`

| ID | Criterion | Tier | Status | Notes |
|----|-----------|------|--------|-------|
| MVP-54 | `/faq` answers at least the top 10 questions a cold founder/leader would ask before booking. | P2 | Not started | [H] Source from `docs/build/notes/movemental-master-talking-points-index.md` |
| MVP-55 | Each Q/A includes structured-data `FAQPage` JSON-LD so it can rank as a rich result. | P3 | Not started | [A] |

---

### 3.12 Auth utility — `/login`, `/forgot-password`

| ID | Criterion | Tier | Status | Notes |
|----|-----------|------|--------|-------|
| MVP-56 | `/login` accepts valid credentials and routes signed-in users to `/dashboard` or `/login?next=…` target. | P1 | Not started | [A+H] Verified separately in dashboard DoD; here we check the public surface renders without error |
| MVP-57 | `/forgot-password` triggers a password-reset email; the email link lands on `/auth/update-password`. | P2 | Not started | [A+H] |
| MVP-58 | Neither page exposes errors that disclose whether an email is registered (no enumeration). | P2 | Not started | [A+H] |
| MVP-59 | Both pages render cleanly without console errors. | P2 | Not started | [A+H] |

---

### 3.13 Legal — `/privacy`, `/terms`, `/cookies`

| ID | Criterion | Tier | Status | Notes |
|----|-----------|------|--------|-------|
| MVP-60 | `/privacy` reflects actual data practices (Supabase, Resend, GA4, PostHog, Vercel) and lists the controller's contact email. | P1 | Not started | [H] Counsel review |
| MVP-61 | `/terms` is current with the company's legal entity name and governing-law clause. | P1 | Not started | [H] Counsel review |
| MVP-62 | `/cookies` lists the categories of cookies actually set and pairs with a working consent mechanism (or states no consent banner is required in the launch jurisdiction). | P1 | Not started | [H] |
| MVP-63 | All three legal pages link from the footer on every public page. | P1 | Not started | [A] `src/components/nav/site-footer.tsx` |

---

### 3.14 Recipes, case studies, press, and other one-offs — `/recipes`, `/who-we-serve`, `/movement-voice-commitments`, `/case-studies`, `/press`

| ID | Criterion | Tier | Status | Notes |
|----|-----------|------|--------|-------|
| MVP-64 | Each one-off page that ships either has a clear purpose + working CTA, or is removed from sitemap and nav until it does. | P2 | Not started | [H] `/who-we-serve` was modified in current branch — confirm intent |
| MVP-65 | `/movement-voice-commitments` reflects current trusted-voice doctrine (no audience-card language). | P2 | Not started | [H] Lighter doctrine check; MVP-108 is the full spec |
| MVP-115 | `/case-studies` is the honest in-development page (eyebrow "CASE STUDIES — IN DEVELOPMENT"; clear explanation of why not yet; links to alternative reading paths; newsletter signup; no conversation CTA). | P1 | Not started | [H] Replaces the hostile `/case-studies` → `/faq` redirect |
| MVP-116 | `/press` (or `/media-kit`) page exists with three lengths of organizational boilerplate, founder bios with downloadable headshots, field guide covers and assets, and a clear media inquiry path. | P2 | Not started | [H] |
| MVP-117 | `/recipes` public recipe library preview exists with 12–15 representative recipes across functions, each card opening into a slide-out drawer with recipe document, video, and sanitized transcript excerpt. | P2 | Not started | [H] Substantive build; can ship within 30 days post-launch |

---

### 3.15 Cross-cutting — Navigation & chrome

| ID | Criterion | Tier | Status | Notes |
|----|-----------|------|--------|-------|
| MVP-66 | Site header is consistent across every `(site)/**` route; no page renders with a different shell. | P1 | Not started | [A+H] `src/app/(site)/layout.tsx` |
| MVP-67 | Header primary CTAs are conversation-first ("Start a Conversation" / Path mega-menu); org sign-in lives in footer utility, per IA decision. | P1 | Not started | [A+H] `src/components/nav/site-header-cta.tsx` |
| MVP-68 | Mobile nav is keyboard-operable and traps focus correctly when open. | P1 | Not started | [A+H] |
| MVP-69 | Footer carries Movement Leaders, Path, Audiences, About, Pricing, Field guide, FAQ, Footnotes/sources, Contact, Org sign-in, Legal links. | P1 | Not started | [A+H] `src/components/nav/site-footer.tsx` |
| MVP-70 | Theme switcher (light/dark) does not break any P1 page's layout or contrast. | P2 | Not started | [A+H] |
| MVP-71 | No nav surface treats Movement Leaders as a 4th audience peer. | P1 | Not started | [A+H] Doctrine guardrail |
| MVP-118 | Session-aware public chrome: authenticated users visiting the public site see a "Go to your dashboard" affordance replacing "Start a Conversation"; authenticated Movement Leaders see "Go to your Leader workspace" specifically. Verified by signing in and visiting `/`. | P2 | Not started | [A+H] Dashboard-public seam |

---

### 3.16 Cross-cutting — Forms, email, and lifecycle

| ID | Criterion | Tier | Status | Notes |
|----|-----------|------|--------|-------|
| MVP-72 | Newsletter double opt-in: subscribe → confirm email → row marked confirmed; unconfirmed rows expire. | P1 | Not started | [A+H] Per `docs/build/markdown/contact-newsletter-operations-playbook.md` |
| MVP-73 | Contact submissions deliver to `CONTACT_NOTIFY_EMAIL` in production within 60 seconds. | P1 | Not started | [A+H] |
| MVP-74 | Both endpoints (`/api/contact`, `/api/newsletter`) have IP+email rate limiting that returns a usable 429 with retry-after, not a generic 500. | P1 | Not started | [A] |
| MVP-75 | All transactional email senders pass SPF/DKIM/DMARC; first sends from `RESEND_FROM_EMAIL` are not rejected by Gmail/Outlook. | P1 | Not started | [A+H] Resend dashboard verification |

---

### 3.17 Cross-cutting — SEO infrastructure

| ID | Criterion | Tier | Status | Notes |
|----|-----------|------|--------|-------|
| MVP-76 | `sitemap.xml` validates and is in sync with `src/app/sitemap.ts`; every page in `src/app/(site)/**` is either listed or intentionally omitted (and the omission is documented in §2). | P1 | Not started | [A] |
| MVP-77 | `robots.txt` allows crawl of the public site and links to the sitemap; gated routes (`/dashboard`, `/api`, `/auth`) are disallowed. | P1 | Not started | [A] |
| MVP-78 | Every P1 page has a unique `<title>`, `<meta description>`, canonical URL, and OG image; no defaults leaking through. | P1 | Not started | [A] |
| MVP-79 | `Organization` JSON-LD on `/` validates in Google's Rich Results Test. | P2 | Not started | [A] |
| MVP-80 | No `noindex` accidentally set on a public route. | P1 | Not started | [A] |

---

### 3.18 Cross-cutting — Analytics & observability

| ID | Criterion | Tier | Status | Notes |
|----|-----------|------|--------|-------|
| MVP-81 | GA4 fires page_view, form_submit, and CTA-click events from at least `/`, `/pathway`, `/assess`, `/contact`. | P1 | Not started | [A+H] |
| MVP-82 | PostHog records the same events with consistent naming (per `telemetry-standards`). | P1 | Not started | [A+H] |
| MVP-83 | Vercel Analytics is enabled and showing data for the production deployment. | P2 | Not started | [A] |
| MVP-84 | Sentry captures and groups a deliberately-thrown test error from a public page; alerting target verified. | P1 | Not started | [A] `@sentry/nextjs` already in stack |
| MVP-85 | A simple conversion funnel (page_view → form_submit) is visible in either GA4 or PostHog. | P2 | Not started | [A+H] |

---

### 3.19 Cross-cutting — Performance & resilience

| ID | Criterion | Tier | Status | Notes |
|----|-----------|------|--------|-------|
| MVP-86 | LCP < 2.5s (mobile throttled) on `/`, `/pathway`, `/pricing`, `/assess`. | P1 | Not started | [A] Lighthouse CI |
| MVP-87 | CLS < 0.1 on the same set. | P1 | Not started | [A] |
| MVP-88 | No render-blocking third-party scripts on the home critical path. | P2 | Not started | [A] |
| MVP-89 | Custom `/404` and `/500` (or `not-found.tsx` / `error.tsx`) exist with brand chrome and a single recovery CTA. | P1 | Not started | [A+H] |
| MVP-90 | No production page returns 5xx under standard load. | P1 | Not started | [A] Vercel logs |

---

### 3.20 Cross-cutting — Accessibility baseline

| ID | Criterion | Tier | Status | Notes |
|----|-----------|------|--------|-------|
| MVP-91 | Every P1 page passes axe-core with zero serious or critical violations. | P1 | Not started | [A] |
| MVP-92 | Color contrast meets WCAG AA on body text and primary CTAs in both light and dark themes. | P1 | Not started | [A] DESIGN.md §6 |
| MVP-93 | Keyboard-only walkthrough from `/` → `/pathway` → `/contact` → submit completes without traps or invisible focus. | P1 | Not started | [A+H] |
| MVP-94 | All images on P1 pages have `alt` text or are explicitly decorative. | P1 | Not started | [A] |
| MVP-95 | `prefers-reduced-motion` disables non-essential animations site-wide. | P2 | Not started | [A] |

---

### 3.21 Cross-cutting — Narrative & doctrine integrity

| ID | Criterion | Tier | Status | Notes |
|----|-----------|------|--------|-------|
| MVP-96 | Site-wide content search returns zero hits where Movement Leaders are placed as a 4th audience card or recruiting funnel. | P1 | Not started | [A+H] Search command: `grep -ri 'movement leader' src/ docs/ \| grep -v node_modules \| grep -v dist`. Manual review of any hit beyond the Movement-Leader-specific pages (`/movement-leaders`, `/movement-leaders/[slug]`, `/movement-voice-commitments`, `/are-we-compatriots`, `/about/founders/*`) required to confirm it is not introducing the four-audience drift. |
| MVP-97 | The Safety → Sandbox → Skills → Solutions sequence appears identically wherever it appears (home, `/pathway`, `/the-path`, audience hubs). | P1 | Not started | [A+H] |
| MVP-98 | Public-facing references to the ecosystem layer use the canonical noun **"Movement Leaders"** (per strategy doc §02). "Trusted voices" is acceptable only as a section-internal eyebrow or band heading, never as the public noun for the people themselves. "Committed Voices" stays internal-only. | P1 | Not started | [A+H] Footer column header, directory page title, nav labels all use "Movement Leaders". Internal type names (`CommittedVoice` / `COMMITTED_VOICES`) in `src/lib/committed-voices.ts` stay as-is. |
| MVP-99 | One canonical narrative spine review (founders) confirms the site reads as a single argument, not a collection of pages. | P1 | Not started | [H] Author Joshua Shepherd or designee |
| MVP-119 | All Movement Leaders displayed on `/movement-leaders` and `/movement-leaders/[slug]` have explicitly approved their public-facing content. No leader appears publicly without an `approved_at` and `published_at` timestamp on their `movement_leader_public_pages` row. | P1 | Not started | [A+H] Consent gate from the strategy doc — must not be skipped. Verify by SQL spot-check before each leader's pages go live. |

---

### 3.22 Cross-cutting — Build & deploy hygiene

| ID | Criterion | Tier | Status | Notes |
|----|-----------|------|--------|-------|
| MVP-100 | `pnpm typecheck`, `pnpm lint`, `pnpm test:run` all pass on the branch being shipped. | P1 | Not started | [A] |
| MVP-101 | `pnpm build` succeeds with no warnings on the same branch. | P1 | Not started | [A] |
| MVP-102 | Production env vars verified by `pnpm check:env` against the linked Vercel project. | P1 | Not started | [A] |
| MVP-103 | Six-layer validation (`pnpm validate:all`) is green or the failing layer is documented in §5 with a deferred-to-post-launch decision. | P2 | Not started | [A] |

---

## 4. Next prompt queue (single item only)

**Rule:** This subsection must contain **one** prompt at a time (or explicitly `— None —` when Section 3 is fully Done).

**Current next prompt:**

> **Founders verification pass — post-consolidation status check (one sitting, ~45 min):** Open this DoD next to the live Vercel preview. The recent work has executed: the four overlapping path surfaces have been consolidated into `/pathway` and `/field-guides`; `/agent-runtime` is gated behind staff auth; the `/voices` page initials have been replaced with editorial placeholders; the `/field-guide/safety` page count and cover image are corrected; the lead-magnet forms are consolidated to two dedicated landing pages; `/start-with-safety` has been transformed into a Safety Self-Assessment (or whichever option was chosen); `/training` has been folded into `/pathway/skills`; the FAQ has been tightened; `/login` has editorial framing; `/voices` and `/movement-voices` have been consolidated into `/movement-leaders`; the three audience pages have audience-first hero copy; `/case-studies` is an honest in-development page; `/library` is the Teaching Library; the footer architecture is rationalized.
>
> Walk every **P1 row** in §3.1, §3.2, §3.4, §3.6, §3.7, §3.8, §3.13, §3.14, §3.15. For each row, set **Status** to one of: `Done`, `In progress`, `Not done`, `Blocked`. Add a one-line note citing what was checked (URL + observation). Do **not** touch P2/P3 rows in this pass. Append one entry to §5 summarizing the pass. After this pass, the next prompt becomes a focused **EEAT verification across §3.9, §3.10, and §3.17**.

---

## 5. Attempt log (append-only)

| Date (ISO) | Actor | Summary | DOD IDs touched | Outcome |
|------------|-------|---------|-----------------|---------|
| 2026-05-12 | build-prompt skill / AI initial draft | File created from `docs/build/prompts/movemental-mvp-dod.md`. Registry seeded with 103 rows across 22 sub-tables (home, path, start-with-safety, field-guides, pricing, audience hubs, trusted voices, assessment & contact, about & founders, evidence/EEAT, FAQ, auth, legal, one-offs, nav, forms/email, SEO, analytics, performance, a11y, narrative integrity, build hygiene). Statuses default to `Not started`. | — | Registry seeded; awaiting founders verification pass |
| 2026-05-13 | Cursor-style refinement pass / AI | Strategy-work integration + doctrine tightening + tier clarity + verification tagging. Added §1.5 ("What 'shippable' means at each tier"), §1.6 (AI-verifiable vs human-required key). Updated context table to record the canonical-noun resolution. Added rows MVP-104..MVP-119 (16 new rows): §3.4 sandbox field guide; §3.5 dashboard walkthrough; §3.7 leader slug pages + are-we-compatriots + full commitments doc; §3.9 substantial author bios + Person JSON-LD; §3.10 research hub + edition/changelog + reviewer endorsements + case-study target; §3.14 honest case-studies + press + recipes preview; §3.15 session-aware chrome; §3.21 Movement Leader consent gate. Updated criteria + notes on MVP-96 (grep convention + manual-review carve-out) and MVP-98 (canonical-noun resolution from "Trusted voices" → "Movement Leaders"). Tagged every row's Notes cell with [A] / [H] / [A+H] verification path. Replaced §4 next-prompt with post-consolidation status check across nine sub-tables. No rows deleted; no IDs renumbered. | New: MVP-104..MVP-119. Criterion/notes edited: MVP-29, MVP-30, MVP-34, MVP-35, MVP-36, MVP-47, MVP-65, MVP-69, MVP-71, MVP-96, MVP-98. Notes tagged: all rows MVP-01..MVP-119. | Registry expanded to 119 rows; awaiting founders verification pass per updated §4 |

---

## 6. Links and references

- **Public route SSOT:** [`src/app/sitemap.ts`](../../../src/app/sitemap.ts)
- **Authoring prompt for this DOD:** [`docs/build/prompts/movemental-mvp-dod.md`](../prompts/movemental-mvp-dod.md)
- **Sibling dashboard DOD:** [`movemental-dashboard-dod.md`](./movemental-dashboard-dod.md)
- **Canonical doctrine — movement leaders ecosystem layer:** [`docs/build/strategy/movement-leaders-as-ecosystem-layer.md`](../strategy/movement-leaders-as-ecosystem-layer.md)
- **Design quality bar:** [`docs/design/DESIGN.md`](../../design/DESIGN.md)
- **Homepage IA & EEAT consultation:** [`docs/build/notes/homepage-ia-and-eeat-consultation-2026-05-12.md`](../notes/homepage-ia-and-eeat-consultation-2026-05-12.md)
- **Site audit (2026-05-11):** [`docs/build/audits/movemental-site-audit-2026-05-11.md`](../audits/movemental-site-audit-2026-05-11.md)
- **Citations / claims SSOT:** [`src/lib/citations/eeat-site-claims.json`](../../../src/lib/citations/eeat-site-claims.json)
- **Newsletter & contact ops playbook:** [`docs/build/markdown/contact-newsletter-operations-playbook.md`](../markdown/contact-newsletter-operations-playbook.md)
- **CLAUDE.md (project conventions, env vars, stack rules):** [`CLAUDE.md`](../../../CLAUDE.md)
