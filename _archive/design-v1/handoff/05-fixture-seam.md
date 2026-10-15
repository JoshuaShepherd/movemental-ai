# 5 · Fixture seam

What is real, what is stubbed, what arrives later. One row per dynamic surface,
so nobody tries to wire a backend that is not the job.

| Surface | Real now | Stubbed in the design | Later slice | Gate |
| --- | --- | --- | --- | --- |
| Leader roster + headshots | `public.movement_leaders` + public `media-library` bucket. 25 rows, names and images only | Nothing — the design reads the real bucket | Role/org line once `primary_role` is populated | None; public data |
| Founders | `src/lib/founders/content.ts` — rights-cleared SSOT, three profiles | Nothing | — | None |
| Committed voices | `src/lib/committed-voices.ts` — three published profiles | The other 22 render as named-but-unpublished | Profiles as they clear rights | None |
| Articles | `docs/articles/*.md` via `src/lib/articles.ts`. Eight bodies copied into the design set | ~62 articles have frontmatter but no body in the design bundle | Bodies land as markdown, no code change | None |
| Research | `src/lib/research/data.ts` — items, archive, findings, master sources | Nothing | — | None |
| Footnotes | `src/lib/citations/eeat-site-claims.json` — 38 claim rows, fetched at runtime | Nothing | — | None |
| Pricing / FAQ | `data/pricing.ts`, `data/faq.ts` — verbatim, character for character | Nothing. Training and Tech field guides are genuinely placeholder in the data and render with no CTA | Real guides replace the placeholders in the data file | None |
| Enroll submit | Field list, options, validation, success copy all from `src/app/enroll/page.tsx` | **Submit does not send.** The design validates and shows the repo's own success state | Wire to `/api/agent-room/enroll` | Existing route |
| Reality map | Beats, options, agent replies, gap signals from `data/beat-catalog.ts` | Answers are not persisted in the design | `/api/ai-reality/submit` | Existing route |
| Shared read-back | `AiRealityOrgPayload` — org-wide means, spread, illusion flags, provisional state | Token resolution is faked in the design | Real token lookup | Existing route |
| Safety charter | `safety_artifacts`, `safety_artifact_versions`, `safety_artifact_publications`. Provisioning inserts version 1 for all five layers at signup | Counts are illustrative | — | Auth |
| Publish action | `publishArtifact()` → `safety_artifact_publications` | The design shows the three progress states; it does not call the API | `/api/safety/artifacts/[id]/publish` | Auth |
| Dashboard onboarding | Nothing — both routes read no onboarding table | Holding pages, verbatim | The step flow | Auth |
| `/dashboard/ai-reality` | Real and shipped | **Not designed at all** | — | Auth — see S-1 |
| Newsletter | `/api/newsletter`, `confirm`, `unsubscribe` all exist | Confirmation screens are static in the design | — | Existing routes |
