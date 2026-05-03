# Home page — build & QA priority rank

**Source of truth for copy and section behavior:** [`HOME_PAGE.md`](./HOME_PAGE.md)  
**System spec:** [`../design/homepage-spec.md`](../design/homepage-spec.md)

Sections are ranked **P0 (highest)** by conversion and narrative dependency: each tier earns the next. When shipping is incremental, build and QA in this order.

| Rank | Section | Component | Narrative job | Notes |
| ---- | ------- | --------- | -------------- | ----- |
| **P0** | §0 | `HomeHero` | Promise + primary CTAs | Must include conversation CTA + "See How It Works" |
| **P1** | §1 | `HomePhilosophy` | Problem / stakes (Midnight) | Without this, bento feels like feature soup |
| **P2** | §2 | `HomeBento` | Product clarity (four capabilities) | Depends on P1 for tone |
| **P3** | §3 | `HomeAudiences` | Self-segmentation ("see yourself") | Can ship after P0–P2 if assets lag; use placeholders |
| **P4** | §4 | `HomeEvidence` | Proof (Midnight) | Vaporware killer — prioritize before scaling paid traffic |
| **P5** | §5 | `HomeMechanism` | Process / how it connects | Intellectual centerpiece; longest section |
| **P6** | §6 | `HomeFinalCta` | Permission + **conversation CTA** | Single "Start a Conversation" — larger than hero |

**Chrome (parallel, not gated on home sections):** `SiteNav` / `SiteFooter` — P0 for wayfinding but independent of section scroll order.

**Stopping point for a thin slice:** P0 + P6 delivers a minimal funnel (promise + ask) but skips story; **not recommended** for public launch. **Minimum credible home:** P0–P2 + P6, with P4 added before paid acquisition.

**Out of scope for home body (separate tickets):** hero background asset, first-party audience photos, proof screenshot, `manifesto` route if removed from nav.
