# Contradiction register

Track **explicit** conflicts between this SSOT and other repo (or sibling) prose. Columns follow the ingestion playbook §8.

| id | location | excerpt or summary | ssot_reference | resolution | owner | status |
| --- | --- | --- | --- | --- | --- | --- |
| C-001 | `docs/markdown/Audit/platform-capabilities-and-data-pipeline-audit.md` §2 opener | Describes `docs/articles/HOW_MOVEMENTAL_USES_AI.md` as authoritative plain-language ingestion narrative for the platform pipeline while also anchoring SSOT-ish technology claims elsewhere. | `part-09-movemental-technological-foundation.md` (“honest framing” tech foundation narrative); Pipeline claims in Parts five–seven for stage artifacts | Harmonize wording: **`PART`** documents govern company path/productization/architecture storyline; **`HOW_MOVEMENTAL_USES_AI`** remains an implementation-facing narrative that must **defer** where SSOT asserts different facts—add reciprocal pointer from article to INDEX when canonical. Banner optional until editorial decision. | — | Open (P2) |
| C-002 | Multiple docs use “Sandbox” loosely (e.g. audit §2 “Sandbox course scaffolding”) | Engineering sense of scaffolded nonprofit course differs from Movemental AI Path stage **Sandbox Discovery** framing. Risk of terminology collision in agent search. | `part-05-sandbox-discovery.md` naming + scope | Glossaries: prepend “**(technical)** Sandbox” vs **Path stage Sandbox** qualifiers in audits when referring to scaffolding scripts; defer code renames (`course:scaffold:sandbox`). | — | Open (P3) |

**Statuses:** Open / deferred / resolved. **Severity:** P1 factual conflict blocking canonical; P2 dual-authority ambiguity; P3 wording drift.

Add new rows whenever searches surface overlapping claims (`pnpm` scripts mention “skills,” “Solutions,” Stripe env vs Part ten monetization wording, movement-leader doctrine vs Path audience framing).

Historical banner snippet for resolved legacy docs lives in [`docs/build/prompts/company-process-pdf-to-ssot-markdown.md`](../../../build/prompts/company-process-pdf-to-ssot-markdown.md).
