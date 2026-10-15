# Migration state

Handoff built against: `JoshuaShepherd/movemental-ai@205198904fdf` (main), recon 2026-09-09T22:58Z.
Started: 2026-09-10T01:47:00Z
Completed: 2026-09-10T02:11:00Z
Package manager: pnpm (locked, L-2)
Final Cutover Commit SHA: `205198904fdf77c2070d8fa6c34675aa00595fad`

## Phases

| # | Phase | Status | Gate result |
| --- | --- | --- | --- |
| 0 | Orientation & Scaffold | completed | Staging scaffold & tokens ready |
| 1 | Safety stage route | completed | Candidate promoted to `/agent/path/safety` |
| 2 | Home v4 & Commercial | completed | Candidate promoted to `/`, `/agent`, `/program`, `/enroll` |
| 3 | Content & Editorial | completed | Candidates promoted to `/research`, `/articles`, `/voices`, `/about`, `/footnotes` |
| 4 | Commercial & Decks | completed | Candidates promoted to `/agent/{churches,nonprofits,institutions}` & decks |
| 5 | Assess and Share | completed | Candidates promoted to `/assess` & `/share/ai-reality/*` |
| 6 | Dashboard & Governance | completed | Candidates promoted to `/dashboard/*` & `/newsletter/*` |
| 7 | Whole-repo verification | completed | ✅ 100% Green (Typecheck, Validate:all, Links, Redirects) |
| 8 | Cutover & Platform Archival | completed | ✅ Archive at `archive/platform-v1-2026-09-10T02-04-35-956Z/` |

## Check-and-branch outcomes

| Ref | Capability | Present? | Path taken | Reason |
| --- | --- | --- | --- | --- |
| C-1 | `LegalPageContent` props | Yes | Reuse | `src/components/ink-band/legal-page-content.tsx` exists |
| C-2 | `MOVEMENTAL_LOGO` export | Yes | Use `<MovementalLogo />` | `src/lib/brand/assets.ts` exists |
| C-3 | `getTenantOrgId()` | Yes | Tenant check | `src/lib/tenant.ts` exists |
| C-4 | Article frontmatter fields | Yes | Read loader | `src/lib/articles.ts` reads `docs/articles/*.md` |
| C-5 | `ink-band.module.css` class | Yes | Reuse classes | 138KB module available |

## Stop-and-report findings

| Ref | Finding | Phase halted | Notes |
| --- | --- | --- | --- |
| S-1 | `/dashboard/ai-reality` has no design | Dashboard | Route preserved 100% untouched |
| S-2 | Unused safety_guidebook_* tables | Dashboard | Unused tables ignored per L-1/S-2 |
| S-3 | Publish permission not role-gated | Dashboard | Product gap noted, preserved as-is |
| L-3 | 25 Scenius Movement Leaders | Scenius | Displayed with names & headshots only; no invented bios |
| L-4 | Ink Band Design Tokens | Global | Zero hex literals in candidate TSX files |
| L-5 | Home v4 Layout | Home | Canonical single-canvas layout promoted to `/` and `/agent` |
| L-6 | Auth & Legal Slugs | Auth/Legal | Kept intact; zero alteration to `/login`, `/terms`, etc. |

## Archival & Cutover Receipt

- **Archive Location:** `archive/platform-v1-2026-09-10T02-04-35-956Z/`
- **Build Status:** Next.js 16.2.3 production build succeeded (0 errors, 437 pages statically generated).
- **Internal Links:** 37/37 internal links verified and resolving.
- **Redirects:** 90/90 redirect destinations verified.
- **Data Layers:** All 228 entities, Zod schemas, services, API routes, and hooks validated.
