# 17. `/scenius` — RESOLVED: a redirect, needs no design

**Status** Investigated 2026-09-09 · **No page to build**

## What it is

`src/app/scenius/page.tsx`, in full:

```tsx
import { permanentRedirect } from "next/navigation";

/** Alias for `/agent/movement-voices` (Ink Band scenius / Movement Voices front door). */
export default function SceniusRedirectPage() {
  permanentRedirect("/agent/movement-voices");
}
```

## The four questions, answered

1. **What does it do today?** Nothing but redirect. It is a permanent (308)
   alias for `/agent/movement-voices`.
2. **Public, internal, or abandoned?** Public and deliberate — a vanity URL kept
   because "scenius" is the brand's own word for the network. It is not
   abandoned and not an experiment.
3. **Data source?** None. It renders no data.
4. **Does it duplicate a page already built?** Yes, by design. Its destination is
   the Movement Voices front door — the surface `/voices` covers, already built
   as `Movemental Voices.dc.html`.

## Decision

**No design work.** The prompt's own guard applies: "Do not build a second
`/voices`." A redirect has no visual surface to design, and the destination is
already built.

The Eno reading was correct about the word and irrelevant to the route — exactly
the trap the prompt warned about. Worth noting that the guess would have
produced a plausible, entirely unnecessary page.

## If this ever becomes a real page

The network-view idea in the original prompt still stands as the only version
worth building: relationships between leaders rather than a second roster —
co-authorships, shared organizations, lineage. That would be a new page, not
this route, and needs a product decision first.
