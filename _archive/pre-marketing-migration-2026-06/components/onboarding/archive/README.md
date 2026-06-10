# Archived onboarding UI

**`onboarding-panel.tsx`** — Previously rendered above every non-`/leader` dashboard route from `(dashboard)/layout.tsx` as a collapsible white card with the full multi-phase checklist.

**Archived:** 2026-05 — Product direction favors a minimal header entry (Documents → MOU) plus `/welcome` for anyone who still needs the full checklist, instead of pinning the large panel on every screen.

To restore: import `OnboardingPanel` from this folder back into `src/app/(dashboard)/layout.tsx` and re-enable org onboarding progress in that layout if you also want the header progress rail.
