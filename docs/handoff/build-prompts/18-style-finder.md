# 18. `/style-finder` — RESOLVED: the visual picker · blocked on real preview art

**Status** Investigated 2026-09-09 · **Reading confirmed** · **Not built**

## Which of the two readings is correct

**Reading 2: the visual-style picker.** The evidence is unambiguous, and
`layout.tsx` answered it outright, as the prompt predicted it would:

```tsx
export const metadata: Metadata = {
  title: "Style Finder",
  description: "Discover typography, templates, images, and palettes for your visual direction.",
  robots: { index: false, follow: false },
};
```

`page.tsx` mounts `StyleFinderWizard` from `@/components/style-finder/`, with its
own comment: *"Unlisted visual style discovery wizard — share via direct URL
only. Not linked from nav or sitemap."*

The voice-finder reading is wrong. `writing_style_preferences`,
`voice_identities` and the rest belong to a different surface.

## Public or authenticated

**Neither, exactly.** It is public but unlisted: no auth gate, `robots:
{ index: false, follow: false }`, absent from nav and sitemap, shared by direct
URL only. So it does *not* belong with the dashboard shell (prompt 20) — it is a
marketing-adjacent surface with a deliberately private door.

It wraps in `InkBandUtilityShell`, the same shell as prompt 19, so the chrome is
already built.

## Part of onboarding?

Not structurally. It is a standalone route with its own layout, not a step
inside `onboarding_*`. Whether it is used *during* onboarding as a shared link
is a product question, not a code one.

## Why it is not built

The prompt's own constraint blocks it: *"use real preview art from
`template-previews` and never drawn mock-ups."*

A template gallery is preview art. The `template-previews` bucket contents are
not available in this project, and the wizard's step structure, option sets and
copy live in `style-finder-wizard.tsx`, which has not been read. Building it now
would mean inventing both the options and the artwork — a gallery of fabricated
templates, which is the one thing a picker must not be.

## To unblock

Two things, in order:

1. Read `src/components/style-finder/style-finder-wizard.tsx` for the real step
   sequence, option sets, and copy.
2. Supply real preview images from the `template-previews` storage bucket, or
   confirm the gallery should render as labelled empty slots until art exists.

Then this file can be replaced with a scoped prompt. Everything else it needs —
the utility shell, `WayCard`, the `var(--ink)` selection border — is already
built in `Movemental Utility Shell.dc.html`.
