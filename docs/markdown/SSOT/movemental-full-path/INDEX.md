# Movemental AI Path — full source of truth (markdown SSOT)

**Status:** draft — ingestion executed 2026-05-07; prose is PDF-faithful text extraction pending human QA on dense tables (see [`AMBIGUITY.md`](AMBIGUITY.md)).

This bundle is the **canonical textual record** of the **Movemental AI Path** PDFs referenced below. Until `status` is bumped to **canonical** in each part file after editorial sign-off and contradiction resolution is closed, readers should validate critical numbers and tables against the PDFs under [`docs/source-artifacts/movemental-full-path/`](../../../source-artifacts/movemental-full-path/).

## Source artifacts

| PDF | Repo path |
| --- | --- |
| Full path SOv2 | [`movemental_full_path_source_of_truth_v2.pdf`](../../../source-artifacts/movemental-full-path/movemental_full_path_source_of_truth_v2.pdf) |
| Parts nine–ten extension | [`movemental_parts_nine_and_ten.pdf`](../../../source-artifacts/movemental-full-path/movemental_parts_nine_and_ten.pdf) |

## Extraction record

| Field | Value |
| --- | --- |
| extracted_at | 2026-05-07 |
| extract_tool | [pdf-parse](https://www.npmjs.com/package/pdf-parse) 1.1.1 (CLI via one-off npm install; see [`scripts/ssot-raw-txt-to-markdown.mjs`](../../../../scripts/ssot-raw-txt-to-markdown.mjs)) |
| raw text buffers | [`raw-extraction/`](./raw-extraction/) |

Callouts and tables in dense sections (Pricing, configuration matrices, cross-walks) **must be spot-checked** against the PDF; the heuristic markdown converter normalizes hyphenated line wraps and headings but cannot guarantee typographic fidelity.

## Reading order (linear path)

1. [`part-00-document-overview.md`](./part-00-document-overview.md) — cover framing + “how to use this document”.
2. [`part-01-reality-ai-organizations-2026.md`](./part-01-reality-ai-organizations-2026.md) — Part one.
3. [`part-02-minimum-viable-safety-checklist.md`](./part-02-minimum-viable-safety-checklist.md) — Part two.
4. [`part-03-working-source-of-truth-safety-stage.md`](./part-03-working-source-of-truth-safety-stage.md) — Part three (Safety working layer).
5. [`part-04-productization-strategy-cross-walk.md`](./part-04-productization-strategy-cross-walk.md) — Part four.
6. [`part-05-sandbox-discovery.md`](./part-05-sandbox-discovery.md) — Part five.
7. [`part-06-skills-development.md`](./part-06-skills-development.md) — Part six.
8. [`part-07-solutions-deployment.md`](./part-07-solutions-deployment.md) — Part seven.
9. [`part-08-cross-stage-productization.md`](./part-08-cross-stage-productization.md) — Part eight.
10. [`part-00-extension-preface.md`](./part-00-extension-preface.md) — extension PDF cover notes (imports before Parts nine–ten).
11. [`part-09-movemental-technological-foundation.md`](./part-09-movemental-technological-foundation.md) — Part nine.
12. [`part-10-consolidated-pricing.md`](./part-10-consolidated-pricing.md) — Part ten.

Governance statements: [`CHARTER.md`](./CHARTER.md). Conflict tracking: [`CONTRADICTIONS.md`](./CONTRADICTIONS.md). Superseded doc log: [`SUPERSEDES.md`](./SUPERSEDES.md).

Ingestion playbook (process): [`docs/build/prompts/company-process-pdf-to-ssot-markdown.md`](../../../build/prompts/company-process-pdf-to-ssot-markdown.md).

## Conventions used in markdown

- **`##`** — Primary segment headings recovered from lone PDF lines (e.g. `Churches`).
- **`###`** — Lettered clauses such as `Nine-A: …` preserved from the PDF subsection pattern.
- **`-`** — Bullets (including former `•` glyphs and enumerated **Item N.** lines).
- **Page headers** repeated from the PDF layout were stripped; cite the SHA256-stamped PDF for pagination.
