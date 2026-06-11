# Agent room corpus files

**Purpose:** Upload-ready document set for the public `/agent` room `file_search` tool (OpenAI vector store). Same files are structured for future Claude Files API use if retrieval moves in-process.

**Binding slug:** `movemental-room-canon`  
**Corpus version:** `2026-06`  
**Machine manifest:** [`MANIFEST.json`](./MANIFEST.json)  
**Topic index:** [`INDEX.md`](./INDEX.md)

---

## Directory layout

```
files/
├── MANIFEST.json              # Upload manifest + retrieval policy (SSOT for sync)
├── manifest.schema.json
├── INDEX.md                   # Human topic map
├── README.md                  # This file
├── public/                    # Upload to OpenAI vector store
│   ├── movemental-kb-phase-1.md … phase-4.md
│   ├── ai-research-archive.md
│   ├── movemental-the-talk.md
│   └── pdf/
│       ├── safety-field-guide.pdf      # Field Guide Vol 1 — Safety
│       ├── sandbox-field-guide.pdf     # Field Guide Vol 2 — Sandbox
│       └── evergreen-engine.pdf        # Evergreen Engine Edition One
└── internal/                  # Do NOT upload
    └── movement-voices-onboarding-walkthrough.md
```

**Rule:** All upload candidates live under `public/` or `public/pdf/`. Do not leave markdown or PDFs at the `files/` root — they will not sync.

---

## Corpus inventory (9 public documents)

| ID | File | Format | ~Size |
|----|------|--------|-------|
| `ai-research-archive` | `public/ai-research-archive.md` | markdown | — |
| `kb-phase-1` | `public/movemental-kb-phase-1.md` | markdown | 31 KB |
| `kb-phase-2` | `public/movemental-kb-phase-2.md` | markdown | 25 KB |
| `kb-phase-3` | `public/movemental-kb-phase-3.md` | markdown | 25 KB |
| `kb-phase-4` | `public/movemental-kb-phase-4.md` | markdown | 29 KB |
| `narrative-the-talk` | `public/movemental-the-talk.md` | markdown | 15 KB |
| `field-guide-safety` | `public/pdf/safety-field-guide.pdf` | pdf | 342 KB |
| `field-guide-sandbox` | `public/pdf/sandbox-field-guide.pdf` | pdf | 423 KB |
| `evergreen-engine` | `public/pdf/evergreen-engine.pdf` | pdf | 514 KB |

---

## Design principles (RAG best practices)

1. **Self-contained entries** — KB `###` sections stand alone when chunked.
2. **YAML frontmatter** — Markdown files carry `document_id`, `topics`, and chunking hints.
3. **Smaller chunks for facts** — Markdown: 500 tokens / 75 overlap. PDFs: OpenAI `auto` chunking.
4. **Field Guide authority** — For Safety/Sandbox methodology detail, PDFs beat KB summaries.
5. **Canon precedence** — Prompt §5 wins over retrieval when they disagree.
6. **No internal leakage** — `internal/` excluded from manifest upload list.

---

## OpenAI vector store workflow

```bash
# Dry run
pnpm agent-room:corpus:sync -- --dry-run

# Upload changed files
OPENAI_VECTOR_STORE_ID=vs_xxx pnpm agent-room:corpus:sync

# Force re-upload all
OPENAI_VECTOR_STORE_ID=vs_xxx pnpm agent-room:corpus:sync -- --force
```

Register binding in `movemental-ai-agents`:

```bash
CORPUS_BINDING_SLUG=movemental-room-canon OPENAI_VECTOR_STORE_ID=vs_xxx pnpm seed:corpus-binding
```

---

## Adding new files

1. Place under `public/` (`.md`) or `public/pdf/` (`.pdf`).
2. Add YAML frontmatter to markdown (copy an existing file as template).
3. Append entry to `MANIFEST.json` with `upload: true`.
4. Add row to `INDEX.md`.
5. Run `pnpm agent-room:corpus:sync`.

---

## Still not in corpus

- Training / Technology Field Guide PDFs (forthcoming)
- Audience playbooks (OCR pending)
- Participation Agreement (OCR pending)
- FAQ verbatim (`/faq` scrape)
- Phase 5 KB markdown

---

## Related docs

- [`../corpus-and-rag.md`](../corpus-and-rag.md)
- [`../construction-decisions.md`](../construction-decisions.md)
- [`../prompts/room-host.md`](../prompts/room-host.md)
