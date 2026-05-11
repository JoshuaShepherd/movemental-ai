# SSOT charter — Movemental AI Path (markdown bundle)

## Supersession (draft wording)

Upon leadership setting part front matter (`status`) to **canonical**, the following holds:

This markdown bundle, derived from **`movemental_full_path_source_of_truth_v2.pdf`** and **`movemental_parts_nine_and_ten.pdf`**, becomes the authoritative internal description of the **Movemental AI Path**: stage sequence (**Safety → Sandbox → Skills → Solutions**), MVP Safety decisions (seven-item checklist), Sandbox / Skills / Solutions deliverables as written, productization levels, consolidated pricing orientation (see Part ten), and the technological foundation narrative (Part nine).

Where any prior internal prose (including repo docs not yet bannered, slide decks, and working notes dated before the PDF hash dates recorded in [`INDEX.md`](./INDEX.md)) **conflicts** with this bundle, **this bundle wins** after reconciliation is logged in [`CONTRADICTIONS.md`](./CONTRADICTIONS.md).

## Explicit carve-outs (not superseded blindly)

Topics outside the scope of these PDFs remain governed by their existing owning docs:

- **Visual / brand design:** Stitch pinning, DESIGN.md, Tailwind semantic tokens (`docs/design/`).
- **Repository-specific HOWTOs:** local dev bootstrap, env merge scripts, CLI recipes (`scripts/`, `.env`, Vercel link flows) unless the SSOT expressly prescribes operational policy.
- **Third-party tooling versions:** pinned package majors in `package.json` supersede illustrative mentions in prose unless Operations adopts SSOT wording into a BOM.
- **Tenant-specific implementations** (for example sibling app repos): architecture may realize SSOT commitments without restating every paragraph.

## Change control

1. Updates to substantive claims (pricing, compliance language, statistic citations) flow **PDF → markdown** or are edited in markdown with counterpart PDF revision—pick one spine and document it in INDEX when canonical.
2. PRs touching this directory require **documentation owner approval** (name TBD alongside [`docs/source-artifacts/movemental-full-path/README.md`](../../../source-artifacts/movemental-full-path/README.md)).
3. Regenerate markdown from refreshed `raw-extraction/*.txt` using `node scripts/ssot-raw-txt-to-markdown.mjs` after any re-extraction; record `extracted_at` and tooling in amended front matter (batch-edit if needed).

## Status

Draft — aligns with ingestion pass 2026-05-07. Do **not** treat as canonical until contradiction pass P1 items are cleared and reviewers initial the INDEX footer (add sign-off lines when ready).
