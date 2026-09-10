# 2 · Drift — authoritative

**This table overrides every other document in this package, and it overrides
the build prompts in `build-prompts/`.** Those prompts were written against
assumed data shapes before the recon in `01-recon.md`.

Where a row says the design is wrong, the repo wins.

| The design / prompt assumed | The repo actually has | What to do |
| --- | --- | --- |
| `/terms` has no real copy; the Utility Shell screen shows a labelled content gap | `src/app/terms/page.tsx` — fully authored, five sections (`use`, `content`, `privacy`, `disclaimer`, `contact`) rendered through `LegalPageContent` | **Do not build a terms screen.** The page exists and is done. Delete the gap panel from the Utility Shell work |
| Auth screens (`/login`, `/signup`, `/forgot-password`) are placeholder holding pages in the design | All three exist as real pages: `login/page.tsx` (6493 b), `signup/page.tsx` (5718 b), `forgot-password/page.tsx` (3550 b), plus `auth/update-password/page.tsx` (4392 b) | **Do not rebuild auth.** Read the existing pages. If a visual refresh is wanted, that is a separate ask — not part of this migration |
| The dashboard is five screens (D1–D5) covering shell, charter, document, ratification, onboarding | `/dashboard/ai-reality` also exists and is substantive — auth-gated, org-scoped, renders `AiRealityDashboard` from a precomputed payload | **Stop and report.** No design covers this screen. Do not invent one. Record it in the state file and leave the route untouched |
| `/agent/path/safety` is the Safety stage route every other screen links to | No such route. Grep for `path/safety` and `agent/path` across `src/lib/agent-room` returns **zero** matches | **Locked: create it.** This is the one genuinely new public route in the set. See `03-decisions.md` L-1 |
| Home is `Movemental Home (current)` / v2 / v3 | Four home variants now exist in `designs/`. **v4 is current** — hero renovated, leaders in a full-width band, no notebook rule | Build from `Movemental Home v4.dc.html`. v2/v3/current are history, shipped only as reference |
| Leader roster rows carry a role descriptor ("Missiologist · The Forgotten Ways") | `movement_leaders.primary_role` is empty for everyone except Brian Sanders | **Locked: names and headshots only.** No role line, no bio, for any of the 25. Founders keep roles — those come from `src/lib/founders/content.ts` |
| One package manager | Both `package-lock.json` and `pnpm-lock.yaml` are committed, plus `pnpm-workspace.yaml` (a pnpm-only file referencing pnpm 11) | **Locked: pnpm.** See `03-decisions.md` L-2 |
| The repo has a component library to draw on | Exactly one primitive exists: `src/components/ui/button.tsx` | See `04-component-map.md`. Compose from Ink Band tokens; do not `shadcn add` |
| Publishing a safety artifact writes a ratification | `publishArtifact()` writes to `safety_artifact_publications` (artifact_id, version_id, public_slug). `safety_guidebook_ratifications` and `safety_guidebook_signatures` are unused | Already corrected in the D4 design. Keep it corrected — do not "restore" ratification wiring |
| Onboarding is a step flow | Both `/dashboard/onboarding/[step]` and `/dashboard/onboarding/leader/[step]` are holding pages reading no onboarding table | Ship the holding pages verbatim. The step flow is a later slice |

## Known-unchanged since the design work

These were verified this pass and did **not** drift:

- `/scenius` is still a redirect (242-byte page). No screen needed.
- `/program/[category]/[templateId]` is still auth-gated and fetches no template
  data. No public content model to design.
- `/style-finder` is still the unlisted visual-style wizard (17 components under
  `src/components/style-finder/`), still blocked on real `template-previews` art.
- `/how-we-use-ai` still redirects to `/agent/how-we-use-ai` and is fully written.
