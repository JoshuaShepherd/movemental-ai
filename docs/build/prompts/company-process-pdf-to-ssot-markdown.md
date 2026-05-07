# Company process PDFs → canonical markdown SSOT (ingestion playbook)

**Use this doc when:** you need to turn the **Movemental full path** PDFs into **complete markdown documentation** that is the **latest single source of truth (SSOT)** for how the company works—superseding and correcting prior written material—**without changing application code yet**, while ensuring **no other supporting docs or content contradict** the new canonical source.

**Authoritative PDF sources (names as provided):**

- **`movemental_full_path_source_of_truth_v2.pdf`** — Primary “full path” SSOT package (v2).
- **`movemental_parts_nine_and_ten.pdf`** — Continuation / parts 9–10 of the same narrative (must be merged into one logical document set with the primary PDF).

**Typical canonical locations before ingestion:** copy or sync these files from the author’s machine (e.g. Windows: `C:\Users\Josh\Desktop\...`) into a **repo-adjacent or repo-internal staging area** that the team agrees to version or otherwise lock (see §1). Do not rely on a single desktop path as the long-term archive.

**Instructions for agents:** Execute sections **in order** unless a later step explicitly allows parallel work. This playbook is **documentation and governance only** for the initial pass: do **not** refactor code, rename public routes, or change product behavior until stakeholders sign off on the markdown SSOT and the contradiction pass (§8) is complete or explicitly deferred.

---

## 0. Outcomes and non-goals

### Outcomes

- [ ] A **single, navigable markdown corpus** that contains the **full text and structure** of the PDFs (no silent summarization of substantive claims).
- [ ] Explicit **front matter** stating version, scope, replacement of prior docs, and **date of PDFs / extraction**.
- [ ] A **register of superseded documents** (paths + “superseded by” pointer) and, where needed, **minimal correction notes** (what changed vs old docs and why—only when the SSOT clarifies).
- [ ] A **contradiction audit** across the repo’s docs (and optionally marketing copy pointers) with a **resolution status** per finding.

### Non-goals (this pass)

- [ ] No **code** changes except, if strictly necessary, **adding** read-only stubs (e.g. empty placeholder files or links)—prefer **none** until leadership approves.
- [ ] No **Stitch / design** migrations driven by this content unless a separate ticket says so.

---

## 1. Secure the sources (provenance)

- [ ] **Verify checksums:** compute `sha256` (or team standard) for each PDF **as received**; record hashes in the SSOT bundle’s `README` or front matter.
- [ ] **Store immutables:** place the PDFs in one of:
  - **Versioned:** `docs/source-artifacts/movemental-full-path/` (or equivalent) committed to git **if** policy allows binaries; or
  - **Object storage / drive** with immutable version id, with hashes and URLs recorded in markdown front matter.
- [ ] **Name a doc owner** (role + person) responsible for approving any future PDF revision and propagating updates to markdown.

---

## 2. Choose extraction method (full-fidelity text)

Pick one primary path; keep a fallback if tables or diagrams degrade.

- [ ] **Preferred (high structure):** PDF → structured export (tooling that preserves **headings**, **lists**, **tables**, **footnotes**). Acceptable stacks vary by team; document the **exact tool + version** used in the SSOT README.
- [ ] **Fallback (guaranteed completeness):** manual **page-by-page** verification against the PDF viewer for any section where extraction garbles **tables, numbering, or callouts**.
- [ ] **OCR:** only if sources are scanned; if OCR is used, record engine, language pack, and **spot-check** every page with small type or tables.

**Quality bar:** if a reader cannot reconstruct the author’s intended **order, section hierarchy, and tables** from markdown alone, the section is not done.

---

## 3. Build the markdown information architecture

Before writing prose, fix the **skeleton** so the corpus stays one SSOT.

- [ ] **Single root narrative:** one top-level doc (e.g. `docs/markdown/SSOT/movemental-full-path/README.md` or `INDEX.md`) that:
  - states **this is the SSOT** for company process per the named PDFs;
  - links to **all parts** in reading order (including merged “parts 9–10”);
  - lists **version**, **hashes**, **extraction date**, **tooling**.
- [ ] **Split rule:** break into multiple `.md` files **only** at **natural part/chapter** boundaries that exist in the PDFs; avoid arbitrary splits that orphan context.
- [ ] **Stable slugs:** use **kebab-case** filenames that match PDF part titles where possible; avoid dates in filenames (version lives in front matter).
- [ ] **Cross-links:** replace “see page X” with **anchors** (`##` headings) where possible; if page refs must remain, keep them as **non-authoritative aids** pointing to PDF page + anchor.

### Front matter template (YAML at top of each file, adjust to team standard)

Use consistently across files:

```yaml
---
ssot: movemental-full-path
source_pdf: movemental_full_path_source_of_truth_v2.pdf  # or the parts 9–10 file
extracted_at: YYYY-MM-DD
extract_tool: name version
pdf_sha256: <hash>
supersedes:
  - <path or doc id>
status: draft | review | canonical
---
```

- [ ] Set `status: canonical` **only** after **editorial review** (§7) and **contradiction pass** sign-off or documented exceptions (§8).

---

## 4. Transcription pass (faithful markdown)

Work **sequentially through the PDFs** in the order the INDEX defines.

- [ ] **Preserve hierarchy:** `#` / `##` / `###` match PDF outline; do not flatten sections for convenience.
- [ ] **Preserve enumerations:** numbered lists stay numbered; nested lists stay nested.
- [ ] **Tables:** use markdown tables **or**—if unreadable—fenced verbatim blocks **plus** a short “table summary” line (only if unavoidable).
- [ ] **Quotes, callouts, sidebars:** use a **single convention** site-wide (`> blockquote`, `>**Note:**`, or `:::callout` if your renderer supports it—pick one and document it in the INDEX).
- [ ] **Images / diagrams:** if the PDF contains non-text figures essential to process:
  - export **PNG/SVG** into `docs/markdown/SSOT/movemental-full-path/assets/` with stable names;
  - caption with **figure number from PDF** and **short alt text**.
- [ ] **Definitions and terms:** on first substantive use of a capitalized framework term, **bold** or use a glossary section if the PDF does—stay consistent.

**Do not:** “clean up” meaning, merge steps, or drop caveats—editorial tightening happens in §6 **with explicit markings**.

---

## 5. Merge `movemental_parts_nine_and_ten.pdf`

- [ ] Identify in the primary PDF **where part 9 begins** conceptually (section title, page, or numbered part).
- [ ] Confirm **no overlap / duplicate** sections between v2 primary and parts 9–10; if overlap exists:
  - [ ] Prefer **newer SSOT wording** only if stakeholders confirm which file is authoritative;
  - [ ] Otherwise, **footnote the conflict** in markdown and escalate to doc owner **before** marking `canonical`.
- [ ] Update the INDEX so **reading order is unambiguous** (one linear path).

---

## 6. Editorial pass (clarity without changing substance)

Separate from transcription: tighten **presentation**, not **obligations**.

- [ ] **Link hygiene:** internal links resolve; broken anchors fixed.
- [ ] **Terms:** glossary or “defined terms” section matches PDF intent.
- [ ] **Ambiguity ledger:** list any passages that remain unclear after extraction; route to domain owner **before** contradiction work treats them as definitive.
- [ ] Optional: add **`> SSOT clarification (YYYY-MM-DD):`** callouts **only** when leadership approves a deliberate interpretation; never silently blend.

---

## 7. Formal SSOT declaration (governance)

In the INDEX (or a dedicated `CHARTER.md`):

- [ ] **Supersession statement** in plain language: “This markdown bundle supersedes prior internal documentation on [scope] dated before [date], except [explicit carve-outs].”
- [ ] **Carve-outs:** list topics **not** covered by these PDFs (e.g. design system, engineering runbooks) so readers do not over-apply the SSOT.
- [ ] **Change control:** how v3+ will be proposed, reviewed, and propagated (PR rules, required reviewers, whether PDF is regenerated from markdown or markdown from PDF).

---

## 8. Contradiction audit (repo-wide, no code)

Goal: **no supporting doc contradicts** the SSOT unless explicitly marked historical.

- [ ] **Inventory targets** (adjust to repo layout):
  - `docs/**/*.md` (including `docs/build/`, `docs/design/`, `docs/markdown/`, `docs/research/`, etc.)
  - Root `*.md` (`README.md`, `AGENTS.md`, `CLAUDE.md`, contribution guides)
  - `.cursor/rules`, skills, or agent briefs that state **process** or **doctrine** (not pure tooling)
  - Optional: public-facing copy under `src/` **only** if it asserts company process (often better as a **separate** content audit ticket)
- [ ] **Search patterns:** run ripgrep (or IDE search) for keywords that are **specific** to the full-path model (names of stages, proprietary terms, numeric lists of steps). Complement with **semantic** spot checks in high-risk folders (`docs/build/strategy/`, audits, playbooks).
- [ ] **Contradiction register:** spreadsheet or `docs/markdown/SSOT/movemental-full-path/CONTRADICTIONS.md` with columns:
  - `location` (path)
  - `excerpt or summary`
  - `ssot reference` (markdown path + heading)
  - `resolution` (update doc / add banner / archive / defer)
  - `owner`
  - `status`
- [ ] **Standard banner** for non-canonical material (apply after resolution choice):

  ```markdown
  > **Historical / non-canonical:** This document predates the Movemental full-path SSOT markdown bundle. Where it conflicts, prefer `docs/markdown/SSOT/movemental-full-path/` (see INDEX).
  ```

- [ ] **Deprecation:** move superseded docs to `docs/archive/...` **only if** retention policy allows; otherwise banner in place + INDEX pointer.

**Exit criterion:** zero open **P1** contradictions (factual conflicts on process); P2/P3 wording drift documented with owners and dates.

---

## 9. Reader manifest and discovery (optional but recommended)

If this repo serves a static docs reader (e.g. `pnpm reader:*` flows):

- [ ] Register the SSOT INDEX in the **reader manifest** so humans and agents find it consistently.
- [ ] Add **one** upstream link from the highest-traffic doc hub (e.g. `docs/README.md` or equivalent) to the SSOT INDEX—**without** duplicating the full text.

---

## 10. Handoff to engineering / product (future, not this pass)

When leadership sets `status: canonical`:

- [ ] Open tickets for **code** or **UI** alignment only where product behavior must match SSOT.
- [ ] Keep SSOT markdown **free of implementation detail** unless the PDFs themselves specify it; otherwise link to technical specs that **inherit** from SSOT without restating it.

---

## Quick checklist (one page)

- [ ] 1. Hash + archive PDFs
- [ ] 2. Extract with tool + version logged
- [ ] 3. INDEX + file split + front matter
- [ ] 4. Full transcription both PDFs
- [ ] 5. Merge parts 9–10 cleanly
- [ ] 6. Editorial pass + ambiguity ledger
- [ ] 7. Supersession charter + carve-outs
- [ ] 8. Contradiction audit + banners/archive
- [ ] 9. Reader manifest / hub link
- [ ] 10. Defer code until explicit ticket

---

## Related references in this repo

- Platform / pipeline audits and other narratives may **support** SSOT ingestion but must be reconciled via §8 (e.g. `docs/markdown/Audit/`).
- Multi-repo bootstrap and env docs describe **technical** onboarding; SSOT scope may carve them out unless the PDFs explicitly govern them (`docs/build/plans/movemental-multi-repo-env-bootstrap.md`).

When in doubt: **PDF + approved markdown wording wins** over older markdown; record every intentional exception.
