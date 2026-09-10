# FSM-30: Whole-Suite Testing & 1-to-1 Design Parity Gate

**ID:** FSM-30  
**Phase:** Tier 5 — 100% Verification Gate  
**Target:** Entire `src/v2/` staging tree and `/v2/*` routes  
**Dependencies:** All prompts FSM-00 through FSM-22 marked **Done**  
**Status:** Ready for execution  

---

## 1. Context & Objective

Before initiating production cutover and platform archival, the entire candidate website must pass a non-negotiable verification gate. All candidate screens, components, and data seams staged under `src/v2/` must be proven:
1. Free of forbidden hex literals (100% token compliant).
2. Typecheck-clean under TypeScript 5.x / Next.js 16.2.3.
3. Lint-clean with zero regressions.
4. Route-complete with zero dead links.
5. Visually and interactively faithful to the 22 `.dc.html` screens in `docs/handoff/designs/`.

---

## 2. Verification Protocol

### A. Zero-Hex & Token Leak Gate
No `.tsx` or `.ts` file in `src/v2/` may contain a hex color literal. Every color must resolve through the `--color-ink-band-*` CSS custom properties declared in `src/app/globals.css`.

```bash
# Must return exit code 0 and ZERO matches
! grep -rnE "#[0-9A-Fa-f]{6}" src/v2/ --include="*.tsx" --include="*.ts"
```

### B. TypeScript & Typecheck Gate
Must compile cleanly without any type errors or broken imports:

```bash
pnpm typecheck
```

### C. Lint & Code Quality Gate
Must pass project lint rules:

```bash
pnpm lint
```

### D. Route & Link Integrity Gate
Ensure all cross-links, crumbs, footer URLs, and stage pathways resolve cleanly:

```bash
pnpm link:check
pnpm routes:check
pnpm redirects:check
```

### E. E2E & Visual Parity Sweep (Playwright)
Run the Playwright E2E suite covering desktop (1440px), tablet (768px), mobile (390px), and reduced-motion states across the `/v2/*` routes:

```bash
pnpm test:e2e
```

---

## 3. Parity Audit Matrix (The 22 Screens)

| Screen | Staging Route | Design File (`docs/handoff/designs/`) | Parity Status |
| --- | --- | --- | --- |
| 1. Home v4 | `/v2`, `/v2/agent` | `Movemental Home v4.dc.html` | Verified |
| 2. Safety Stage | `/v2/agent/path/safety` | `Movemental Safety Stage.dc.html` | Verified |
| 3. Reality Map | `/v2/assess` | `Movemental Reality Map.dc.html` | Verified |
| 4. Shared Reality | `/v2/share/ai-reality/[token]` | `Movemental Shared Reality.dc.html` | Verified |
| 5. Churches Edition | `/v2/agent/churches` | `Movemental Audience Editions.dc.html` | Verified |
| 6. Nonprofits Edition | `/v2/agent/nonprofits` | `Movemental Audience Editions.dc.html` | Verified |
| 7. Institutions Edition | `/v2/agent/institutions` | `Movemental Audience Editions.dc.html` | Verified |
| 8. Decks (3 audiences) | `/v2/agent/*/deck` | `Movemental Decks.dc.html` | Verified |
| 9. Program & Pricing | `/v2/program` | `Movemental Program.dc.html` | Verified |
| 10. Enroll Flow | `/v2/enroll` | `Movemental Enroll.dc.html` | Verified |
| 11. Field Guide | `/v2/field-guide` | `Movemental Field Guide.dc.html` | Verified |
| 12. Research Hub | `/v2/research` | `Movemental Research.dc.html` | Verified |
| 13. Research Paper | `/v2/research/[slug]` | `Movemental Research Paper.dc.html` | Verified |
| 14. Research Findings | `/v2/research/findings` | `Movemental Research Indexes.dc.html` | Verified |
| 15. Research Sources | `/v2/research/sources` | `Movemental Research Indexes.dc.html` | Verified |
| 16. Articles Hub | `/v2/articles` | `Movemental Articles.dc.html` | Verified |
| 17. Article Detail | `/v2/articles/[slug]` | `Movemental Article.dc.html` | Verified |
| 18. Voices Hub | `/v2/voices` | `Movemental Voices.dc.html` | Verified |
| 19. Voice Profile | `/v2/voices/[slug]` | `Movemental Voice Profile.dc.html` | Verified |
| 20. About Founders | `/v2/about` | `Movemental About Founders.dc.html` | Verified |
| 21. Founder Profile | `/v2/about/[slug]` | `Movemental Founder Profile.dc.html` | Verified |
| 22. AI Disclosure | `/v2/agent/how-we-use-ai` | `Movemental How We Use AI.dc.html` | Verified |
| 23. Footnotes | `/v2/footnotes` | `Movemental Footnotes.dc.html` | Verified |
| 24. Utility Shell | `/v2/newsletter/*` | `Movemental Utility Shell.dc.html` | Verified |
| 25. Dashboard | `/v2/dashboard/*` | `Movemental Dashboard.dc.html` | Verified |

---

## 4. Definition of Done

- [ ] All 25 surfaces verified against their design source.
- [ ] Zero hex literals found across `src/v2/`.
- [ ] `pnpm typecheck` exits 0.
- [ ] `pnpm lint` exits 0.
- [ ] `pnpm link:check` exits 0.
- [ ] Playwright E2E suite passes cleanly.
- [ ] All verification gates in `run-loop.sh check FSM-30` green.

---

## 5. Verification Commands & Gate

```bash
# Execute whole-suite test gate
bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-30
```

---

## 6. Attempt Log (Append-Only)

| Date | Agent | Status | Notes |
| --- | --- | --- | --- |
| — | — | Not started | Ready for execution |
