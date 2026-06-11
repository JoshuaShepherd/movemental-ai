# Charter Dashboard — open decisions

Front-end mockup only. Do not treat choices here as product canon without review.

## 1. Charter vs Constitution / Covenant

**Decision for mockup:** Use **Charter** everywhere (`artifactLabel`, copy, filenames).

**Swappable:** Centralize in `js/charter-dashboard-mock.js` → `org.artifactLabel` and `org.productLabel`. UI strings in `charter-dashboard.js` reference those keys where possible.

## 2. Label for the five parts

**Decision for mockup:** **layers** (e.g. "3 of 5 layers complete", "Charter layers", layer nav).

**Alternatives:** documents, sections — pick one product-wide before launch.

## 3. Assessment length

**Flag:** Target ~10 minutes in copy; corpus disagrees (10-min/50-q vs 45-min/22-q).

**Mockup:** Preview shows five representative questions only; `durationNote` in mock data — do not hard-code a single canonical count in the UI.

## 4. Auth / multi-tenant / persistence

**Out of scope:** No real auth, org switching, or API.

**Stubbed:** Sign out toast; invite link is static; state is in-memory (hash route + JS state resets on reload). A production build would need session auth, tenant isolation, and persisted Charter/Assessment data.

## 5. People / roles

**Folded in:** Board view toggle on Charter; role shown in account footer (Executive Pastor).

**Flag:** Dedicated People/Roles surface may be warranted for permissions and rollout ownership.

## Entry point

Mock workspace: `dashboard/charter-dashboard.html` (not linked from marketing nav — intentional, non-destructive).
