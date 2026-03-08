# Movemental V1: Navigation, Routing, and Flow Logic

> **Document type**: Product architecture spec (routing and logic only)  
> **Scope**: V1 public flow, auth gating, decision state, CTAs, redirects  
> **No**: UI copy, marketing, code implementation

---

## 1. Global Navigation Logic

### User states (canonical)

| State | Description |
|-------|-------------|
| **Anonymous** | Not signed in. May or may not have completed fit check (no persistent link to identity). |
| **Fit completed (not signed in)** | Completed fit check, saw fit result; not yet signed up/signed in. |
| **Authenticated (no decision)** | Signed in; no decision state set. |
| **Authenticated (decision pending)** | Signed in; `decision_status` in `initiated` or `offer_viewed`; not yet accepted. |
| **Accepted** | Signed in; `decision_status = accepted`; may or may not have completed checkout. |
| **Onboarded** | Signed in; active member (post-onboarding). |

### Nav behavior by state

| State | Visible nav items | Primary CTA (nav) | Secondary / notes |
|-------|-------------------|-------------------|-------------------|
| **Anonymous** | Home, Fit Check, Why Movemental, Architecture, Pricing, FAQ, Contact | "Take the Self-Screen" → `/fit-check` | No Tour, Decided, Decide in nav. Homepage does not expose `/tour`, `/decided`, `/decide` as primary paths. |
| **Fit completed (not signed in)** | Same as Anonymous. | "Sign up" or "Take the Self-Screen" (context-dependent; see CTA matrix). | Fit result page can show "Create account" / "Sign in" leading to `/signup` or `/signin` with return intent to tour. |
| **Authenticated (no decision)** | Home, Tour, Architecture, Pricing, FAQ, Contact. Optional: Fit Check (for re-take). | "Start the tour" or "Continue" → `/tour` | Decided / Decide not in main nav; accessible from Tour and sticky bar. |
| **Authenticated (decision pending)** | Same as authenticated (no decision). | "I've Decided" or "Continue to offer" → `/decided` (or "Help me decide" → `/decide`). | Sticky bar shows both options until accepted. |
| **Accepted** | Home, Welcome/Dashboard, Architecture, Pricing, FAQ, Contact. | "Go to dashboard" or "Welcome" → `/welcome` or dashboard. | Tour no longer primary path; can remain visible as "Review the tour" if desired. |
| **Onboarded** | Same as Accepted; dashboard is primary. | Dashboard or primary product CTA. | Public nav may simplify to Trust & Context + primary CTA. |

### Hidden or conditional routes

- **Anonymous**: `/tour`, `/decided`, `/decide` are not linked in global nav. Deep links to these routes trigger redirect (see §2).
- **Authenticated (no decision / decision pending)**: `/signup` and `/signin` remain reachable (e.g. account switch) but are not promoted.
- **Accepted / Onboarded**: `/decided` redirects to `/welcome` or dashboard. `/checkout` not linked after success.

---

## 1b. State Diagram (Text-Based)

```
                    ┌─────────────┐
                    │  Anonymous  │
                    └──────┬──────┘
                           │ signup/signin (after fit)
                           ▼
                    ┌─────────────┐     "I've Decided"
                    │  Auth       │─────────────────────┐
                    │  (no decision)                     │
                    └──────┬──────┘                     │
                           │                             ▼
                           │                     ┌───────────────┐
                           │                     │  initiated    │
                           │                     └───────┬───────┘
                           │                             │ view /decided
                           │                             ▼
                           │                     ┌───────────────┐
                           │                     │  offer_viewed │
                           │                     └───────┬───────┘
                           │                             │ Accept & Continue
                           │                             ▼
                           │                     ┌───────────────┐
                           │                     │   accepted    │
                           │                     └───────┬───────┘
                           │                             │ checkout success
                           │                             ▼
                           │                     ┌───────────────┐
                           │                     │ onboarding_   │
                           │                     │ in_progress   │
                           │                     └───────┬───────┘
                           │                             │ complete
                           │                             ▼
                           │                     ┌───────────────┐
                           └─────────────────────│ active_member│
                                 (tour)           └───────────────┘

  Route access:
  - Anonymous: /, /fit-check, /not-a-fit, /signin, /signup, /architecture, /pricing, /faq, /contact
  - Auth (any): above + /tour, /decide, /decided → (if accepted, /decided redirects to /welcome)
  - /checkout: only initiated or offer_viewed; after accepted redirect to /welcome
```

---

## 2. Route Guarding and Redirect Rules

### Auth-gated routes

| Route | Condition | Redirect |
|-------|-----------|----------|
| `/tour` | Not authenticated | `/signin?next=/tour` (or `/signup?next=/tour` if signup is preferred for new users). |
| `/decided` | Not authenticated | `/signin?next=/decided`. |
| `/decide` | Not authenticated | `/signin?next=/decide`. |
| `/checkout` | Not authenticated | `/signin?next=/checkout`. |
| `/welcome` | Not authenticated | `/signin?next=/welcome`. |

### Decision-state rules

| Route | Condition | Action |
|-------|-----------|--------|
| `/decided` | User already `accepted` (or `onboarded`) | Redirect to `/welcome` (or dashboard). Do not show offer again. |
| `/decided` | User `initiated` or `offer_viewed` | Allow. Show structured offer. |
| `/decided` | User authenticated but `decision_status = none` | Allow or redirect to `/tour`. **Policy**: Allow direct link to `/decided` for authenticated users (e.g. from email); optionally set `offer_viewed` on first view. No hard block. |
| `/checkout` | User has not viewed offer (`offer_viewed` or `initiated` not set) | Redirect to `/decided`. User must see offer before checkout. |
| `/checkout` | User already `accepted` and payment recorded | Redirect to `/welcome` or dashboard. |

### Fit-check rules

| Route | Condition | Action |
|-------|-----------|--------|
| `/tour` | User never completed fit check (no stored result for this user/session) | **Policy option A**: Allow. Fit check is recommended but not strictly enforced for authenticated users. **Policy option B**: Redirect to `/fit-check` if no fit result. **V1 recommendation**: Option A; show soft prompt on tour start if no fit result. |
| `/not-a-fit` | N/A | Always accessible when fit result is "not a fit". No auth required. |

### Supporting routes (no gates)

- `/`, `/fit-check`, `/not-a-fit`, `/architecture`, `/pricing`, `/faq`, `/contact`, `/signin`, `/signup` are reachable without auth (except where signin/signup are the destination).
- `/proposal` (if used): treat like `/decided` for auth and decision-state logic, or as post-offer step; define once chosen.

### Redirect logic tree (summary)

```
Request to /tour
  → If !authenticated → redirect /signin?next=/tour
  → Else → allow

Request to /decided
  → If !authenticated → redirect /signin?next=/decided
  → If decision_status in [accepted, onboarding_in_progress, active_member] → redirect /welcome (or dashboard)
  → Else → allow (show offer)

Request to /decide
  → If !authenticated → redirect /signin?next=/decide
  → Else → allow

Request to /checkout
  → If !authenticated → redirect /signin?next=/checkout
  → If decision_status = accepted (and payment done) → redirect /welcome
  → If !(offer_viewed or initiated) → redirect /decided
  → Else → allow

Request to /welcome
  → If !authenticated → redirect /signin?next=/welcome
  → Else → allow
```

---

## 3. CTA Wiring Rules (Matrix)

### Page: Home (`/`)

| CTA | Anonymous | Fit done (not signed in) | Auth, no decision | Auth, decision pending | Accepted / Onboarded |
|-----|------------|---------------------------|-------------------|------------------------|----------------------|
| Primary hero CTA | `/fit-check` | `/signup` or `/signin` (next=/tour) | `/tour` | `/decided` | `/welcome` or dashboard |
| Secondary | `/architecture` or `/pricing` | Same | `/tour` | `/decide` or `/decided` | — |

### Page: Fit check result (fit) (`/fit-check` outcome)

| CTA | Target |
|-----|--------|
| "Create account" / "Sign up" | `/signup?next=/tour` |
| "Sign in" | `/signin?next=/tour` |

### Page: Not a fit (`/not-a-fit`)

| CTA | Target |
|-----|--------|
| "Back" / "Return" | `/` or `/fit-check` |
| Contact (if any) | `/contact` |

### Page: Tour (`/tour`)

| CTA | Action | Target |
|-----|--------|--------|
| "I've Decided" | Set `decision_status = initiated` (persist); optional analytics `decided_initiated` | `/decided` |
| "Help Me Decide" | No state change | `/decide` |

### Page: Decide (`/decide`)

| CTA | Target |
|-----|--------|
| "I've Decided" (soft return) | `/decided` |
| "Request a Conversation" | `/contact` |

### Page: Decided (`/decided`)

| CTA | Target |
|-----|--------|
| "Accept & Continue" | `/checkout` or `/proposal` (configurable) |
| "I still have questions" | `/decide` |

### Page: Architecture (`/architecture`)

| CTA | Anonymous | Authenticated (no decision) | Decision pending | Accepted |
|-----|------------|-----------------------------|------------------|----------|
| "Take the Self-Screen" | `/fit-check` | `/fit-check` or `/tour` | `/decided` | `/welcome` |
| "Return to the tour" | — | `/tour` | `/tour` | — |
| "I've decided" | — | `/decided` (after auth) | `/decided` | `/welcome` |

### Page: Pricing (`/pricing`)

| CTA | Anonymous | Auth, no decision | Decision pending | Accepted |
|-----|------------|-------------------|------------------|----------|
| "Take the Self-Screen" | `/fit-check` | `/tour` or `/fit-check` | `/decided` | `/welcome` |
| "Help me decide" | `/decide` (after auth redirect if needed) | `/decide` | `/decide` | — |
| "I've decided" | `/signin?next=/decided` (or show as secondary) | `/decided` | `/decided` | `/welcome` |

### Page: Contact (`/contact`)

| CTA | Behavior |
|-----|----------|
| Form submit "Request a conversation" | Submit only. No change to decision state. No redirect away from contact. |
| Alternative links (tour, discernment) | `/tour`, `/decide`. Do not override decision status. |

### Page: FAQ (`/faq`)

| CTA | Same as supporting pages: primary CTA by state (e.g. Self-Screen when anonymous, Tour when auth no decision, Decided when pending). |

### Sticky bar CTAs (when visible)

| CTA | Action | Target |
|-----|--------|--------|
| "I've Decided" | Set `decision_status = initiated` if not already set | `/decided` |
| "Help Me Decide" | — | `/decide` |

---

## 4. Decision State Model

### States (canonical)

| State | Meaning |
|-------|---------|
| `none` | Authenticated user has not started decision flow. |
| `initiated` | User clicked "I've Decided" (or equivalent). Offer can be shown. |
| `offer_viewed` | User has viewed the structured offer page (`/decided`). |
| `accepted` | User accepted the offer (e.g. clicked "Accept & Continue"). May be pre-checkout or post-checkout. |
| `onboarding_in_progress` | Post-acceptance; onboarding started, not yet complete. |
| `active_member` | Onboarded; active participant. |

### Route access by decision state

| Route | none | initiated | offer_viewed | accepted | onboarding_in_progress | active_member |
|-------|------|-----------|--------------|----------|------------------------|---------------|
| `/tour` | Allow | Allow | Allow | Allow (optional) | Allow (optional) | Allow (optional) |
| `/decide` | Allow | Allow | Allow | Allow | Allow | Allow |
| `/decided` | Allow | Allow | Allow | **Redirect /welcome** | **Redirect /welcome** | **Redirect /welcome** |
| `/checkout` | Redirect /decided | Allow | Allow | Redirect /welcome | Redirect /welcome | Redirect /welcome |
| `/welcome` | Allow | Allow | Allow | Allow | Allow | Allow |

### Nav CTA by decision state (authenticated)

| State | Primary nav CTA | Homepage primary CTA |
|-------|------------------|----------------------|
| `none` | "Start the tour" → `/tour` | `/tour` |
| `initiated` | "Continue to offer" or "I've Decided" → `/decided` | `/decided` |
| `offer_viewed` | Same | `/decided` |
| `accepted`+ | "Welcome" / "Dashboard" → `/welcome` | `/welcome` or dashboard |

### Tour as primary path

- **Tour appears as primary path** when `decision_status` is `none`, `initiated`, or `offer_viewed`.
- **Tour is de-emphasized** (or hidden from primary CTA) when `accepted`, `onboarding_in_progress`, or `active_member`.

---

## 5. Sticky Components Behavior

### When the sticky decision bar is shown

- On: `/tour`, `/architecture`, `/pricing`.
- Optionally on: `/faq`.
- Not on: `/`, `/fit-check`, `/not-a-fit`, `/signin`, `/signup`, `/contact`, `/decide`, `/decided`, `/checkout`, `/welcome`, dashboard.

### When the sticky bar is hidden

- User is on `/decided` or `/decide` (decision surface is the page).
- User is in state `accepted`, `onboarding_in_progress`, or `active_member`.
- User is not authenticated (sticky is irrelevant; auth required for decision).

### Sticky bar content

- Two actions only: **"I've Decided"** → `/decided` (set `initiated` if needed); **"Help Me Decide"** → `/decide`.
- No tertiary CTA. Same behavior regardless of which page the sticky is on.

### Logic summary

```
show_sticky = authenticated
  && decision_status in [none, initiated, offer_viewed]
  && current_route in [/tour, /architecture, /pricing, (/faq)]
```

---

## 6. Flow Integrity Constraints

### Required safeguards

1. **Checkout only after offer**
   - Do not allow direct access to `/checkout` without `initiated` or `offer_viewed`. Redirect to `/decided`.

2. **Fit check not bypassed by default**
   - Home and primary CTAs for anonymous users point to `/fit-check` first. Deep links to `/tour` require auth and redirect to signin; after signin, `next` can send to `/tour` (fit check can be recommended but not forced for returning auth users).

3. **Decision routes require auth**
   - `/tour`, `/decided`, `/decide`, `/checkout`, `/welcome` all require authentication. Redirect to `/signin?next=<requested_path>`.

4. **Accepted users do not re-see offer**
   - Visiting `/decided` when `accepted` (or later) redirects to `/welcome` (or dashboard). No "Accept again" flow.

5. **Supporting pages do not replace primary flow**
   - `/architecture`, `/pricing`, `/faq`, `/contact` are reachable from nav and footer. Primary conversion path remains: fit → signup/signin → tour → decide/decided → checkout → welcome. Supporting pages link back into this path via CTAs and sticky bar, not as alternative entry to `/tour` for anonymous users.

6. **Contact does not change decision state**
   - Submitting the contact form does not set or clear `decision_status`. Contact is always available and neutral.

---

## 7. URL Canonical Flow Summary

### Anonymous

```
/  →  [Primary CTA: Take the Self-Screen]
        ↓
/fit-check  →  (Fit)  →  /signup or /signin (next=/tour)
        ↓
      (Not a fit)  →  /not-a-fit  →  / or /contact
```

After signup/signin with `next=/tour`: user lands on `/tour`.

### Authenticated (no decision)

```
/tour  →  [I've Decided]  →  /decided
     →  [Help Me Decide]  →  /decide
```

### Decision path

```
/decided  →  [Accept & Continue]  →  /checkout (or /proposal)
                ↓
         (success)  →  /welcome
```

### Support path (from any page)

```
[Help me decide]  →  /decide  →  (optional) [I've Decided]  →  /decided
```

### State-based canonical flows (one-line)

- **Anonymous**: `/` → `/fit-check` → `/signup` | `/signin` → (after auth) `/tour`.
- **Authenticated, no decision**: `/tour` → `/decide` or `/decided`.
- **Decision path**: `/decided` → `/checkout` (if applicable) → `/welcome`.
- **Support**: Any page → `/decide`; `/decide` → (optional) `/decided`.

---

## 8. Edge Case Handling

| Scenario | Expected behavior |
|----------|-------------------|
| **User refresh mid-flow** | State is persisted (auth + decision_status). Refresh on `/decided` shows offer again unless state is `accepted` (then redirect to `/welcome`). Refresh on `/checkout` keeps user on checkout if state allows. |
| **Abandoned decision** | User in `initiated` or `offer_viewed` who never accepts. No automatic reset. They can return to `/decided` or `/decide` anytime. No "expire offer" for V1 unless explicitly added later. |
| **Payment failure** | User remains in `accepted` or a dedicated `payment_pending`. Show clear error; allow retry to `/checkout` or payment link. Do not reset to `offer_viewed` automatically. |
| **Multiple browser tabs** | Each tab uses same auth and server-side decision state. If user accepts in one tab, next load in another tab should reflect `accepted` and redirect from `/decided` to `/welcome`. No special tab coordination for V1. |
| **"I've Decided" clicked twice** | Idempotent: set `initiated` once; second click still routes to `/decided`. No duplicate analytics event if same session (optional dedupe). |
| **Fit check completed twice** | Allow. Second completion overwrites or updates result. No block. Optionally track "fit_retaken" for analytics. |
| **Expired or invalid decision state** | If backend invalidates a state (e.g. offer withdrawn), redirect from `/decided` or `/checkout` to `/tour` or `/decide` with optional message. V1 can treat all valid auth states as non-expired. |
| **Direct link to /decided (auth, state none)** | Allow. Show offer. Optionally set `offer_viewed` on first view. No redirect to `/tour` required. |
| **Signin with next=/decided** | After signin, redirect to `/decided`. Show offer. Set `offer_viewed` on view if desired. |

---

## 9. Minimal V1 Implementation Requirements

### Must have

1. **Auth gating**
   - Middleware or route-level check: `/tour`, `/decided`, `/decide`, `/checkout`, `/welcome` require authenticated session. Redirect to `/signin?next=<path>` when not authenticated.

2. **Decision state tracking**
   - Persisted field (e.g. `decision_status`) per user: `none` | `initiated` | `offer_viewed` | `accepted` | `onboarding_in_progress` | `active_member`. Set `initiated` when user clicks "I've Decided" from tour or sticky. Set `offer_viewed` on first view of `/decided` (optional but recommended). Set `accepted` on "Accept & Continue" (before or after payment, as defined).

3. **CTA consistency**
   - All CTAs in §3 implemented with correct target and, where specified, state update before navigation. Primary nav CTA and homepage CTA vary by user state as in §1 and §4.

4. **Sticky component logic**
   - Sticky bar visibility: authenticated + decision_status in [none, initiated, offer_viewed] + route in [tour, architecture, pricing, (faq)]. Hide on decide, decided, checkout, welcome, and when accepted/onboarded/active.

5. **Redirect integrity**
   - All redirect rules in §2 implemented: auth gates, decision-state-based redirects from `/decided` and `/checkout`, and no direct checkout without offer view.

6. **Analytics hooks (events)**
   - Fire events for: `home_cta`, `fit_started`, `tour_viewed`, `decided_initiated`, `offer_viewed`, `accepted`, `checkout_success`. No requirement for full analytics pipeline; only that hooks exist at these points for V1.

### Out of scope for V1

- Advanced dashboard or org-level permission logic.
- Role-based multi-permission systems.
- Complex feature flags beyond "show sticky" / "show tour".
- Expiration of decision state or time-limited offers.

---

## 10. V1 Technical Checks (Checklist)

- [ ] Auth middleware (or equivalent) runs on `/tour`, `/decided`, `/decide`, `/checkout`, `/welcome`; redirects to `/signin?next=<path>` when unauthenticated.
- [ ] `decision_status` is stored per user and read on protected routes.
- [ ] "I've Decided" (tour and sticky) sets `decision_status = initiated` and routes to `/decided`.
- [ ] Visit to `/decided` when `accepted` (or onboarding/active) redirects to `/welcome` (or dashboard).
- [ ] Visit to `/checkout` when `decision_status` not in [initiated, offer_viewed] redirects to `/decided`.
- [ ] Visit to `/checkout` when already accepted (and payment done) redirects to `/welcome`.
- [ ] Sticky bar is hidden on `/decide`, `/decided`, and when `decision_status` is accepted/onboarding/active.
- [ ] Sticky bar is shown only when authenticated and on `/tour`, `/architecture`, `/pricing` (and optionally `/faq`).
- [ ] Homepage and nav primary CTA change by state (anonymous → fit-check; auth no decision → tour; decision pending → decided; accepted → welcome).
- [ ] Contact form submit does not modify decision state.
- [ ] Analytics hooks exist for: home_cta, fit_started, tour_viewed, decided_initiated, offer_viewed, accepted, checkout_success.

---

*End of routing and flow logic spec.*
