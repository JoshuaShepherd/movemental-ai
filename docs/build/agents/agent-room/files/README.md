# Agent room corpus files

**Purpose:** Upload-ready document set for the public `/agent` room `file_search` tool (OpenAI vector store). Same files are structured for future Claude Files API use if retrieval moves in-process.

**Binding slug:** `movemental-room-canon`  
**Corpus version:** `2026-05`  
**Machine manifest:** [`MANIFEST.json`](./MANIFEST.json)  
**Topic index:** [`INDEX.md`](./INDEX.md)

---

## Directory layout

```
files/
├── MANIFEST.json          # Upload manifest + retrieval policy (SSOT for sync)
├── manifest.schema.json   # JSON schema for manifest validation
├── INDEX.md               # Human topic map for operators and prompt authors
├── README.md              # This file
├── public/                # Upload to OpenAI vector store
│   ├── movemental-kb-phase-1.md   # Operating rules, Path, pricing, sources
│   ├── movemental-kb-phase-2.md   # Identity, origin, thesis
│   ├── movemental-kb-phase-3.md   # Scenii, proof, honest status
│   ├── movemental-kb-phase-4.md   # AI reality, Movemental AI use, product surface
│   └── movemental-the-talk.md     # 15-minute narrative (spoken arc)
└── internal/              # Do NOT upload — operator-only
    └── movement-voices-onboarding-walkthrough.md
```

---

## Design principles (RAG best practices)

These files were authored for retrieval, not just reading:

1. **Self-contained entries** — Each `###` section in the KB phases is written to stand alone when chunked.
2. **YAML frontmatter** — Every file carries `document_id`, `topics`, `upload` flag, and provider metadata.
3. **Smaller chunks for facts** — Manifest sets `500` tokens / `75` overlap (not OpenAI's 800/400 default) so pricing and Path facts retrieve precisely.
4. **Narrative chunking** — The Talk uses `600` / `100` overlap to preserve section flow.
5. **Live-fact markers** — `[LIVE]`, `[CONFLICT]`, `[VERIFY]` in source text; agent must not treat these as settled without live check.
6. **Canon precedence** — Prompt §5 Knowledge Canon wins over retrieval when they disagree ([`../corpus-and-rag.md`](../corpus-and-rag.md)).
7. **No internal leakage** — `internal/` is excluded by manifest; never upload operator onboarding or credential templates.

---

## OpenAI vector store workflow

### Prerequisites

- `OPENAI_API_KEY` in `.env.local`
- Vector store created in [OpenAI Platform](https://platform.openai.com/) → note `vs_…`
- `TENANT_ORG_ID` for Postgres binding (see [`../models-and-tenant.md`](../models-and-tenant.md))

### Sync files (recommended)

From repo root:

```bash
# Dry run — lists what would upload
pnpm agent-room:corpus:sync -- --dry-run

# Upload changed public files and attach to vector store
OPENAI_VECTOR_STORE_ID=vs_xxx pnpm agent-room:corpus:sync

# Force re-upload all manifest documents
OPENAI_VECTOR_STORE_ID=vs_xxx pnpm agent-room:corpus:sync -- --force
```

State is tracked in `files/.corpus-sync-state.json` (gitignored) keyed by SHA-256.

### Register binding + assign tool

```bash
# In movemental-ai-agents
CORPUS_BINDING_SLUG=movemental-room-canon OPENAI_VECTOR_STORE_ID=vs_xxx pnpm seed:corpus-binding
```

Then link `room-host.corpus_binding_id` via `/agent-runtime` or seed, and add `file_search` to `ASSIGNMENTS` ([`../corpus-and-rag.md`](../corpus-and-rag.md)).

---

## Claude Files API (future / parallel)

This stack uses **OpenAI** for `file_search` while **Claude** runs chat. If you later attach documents directly to Claude:

| Practice | Application here |
|----------|------------------|
| Upload once, reference by `file_id` | Upload each `public/*.md`; store `file_id` in sync state |
| SHA-256 dedup before upload | Sync script already hashes files |
| Deterministic file order in prompts | Sort by `document_id` for cache hits |
| Citations enabled on document blocks | Prefer for long-form answers in Discuss phase |
| Cleanup TTL job | Delete stale `file_id`s after 7–30 days if not referenced |

Beta header required: `anthropic-beta: files-api-2025-04-14`.

---

## Adding or updating documents

1. Add markdown under `public/` (or `internal/` if operator-only).
2. Add YAML frontmatter matching existing files.
3. Append entry to `MANIFEST.json` with `upload: true|false`.
4. Add topic row to `INDEX.md`.
5. Run `pnpm agent-room:corpus:sync`.
6. Update [`../corpus-and-rag.md`](../corpus-and-rag.md) scope list if corpus boundary changed.

---

## What's not in this corpus yet

Blocked **Phase 5** (per KB footers): audience playbooks, governance/legal verbatim, full FAQ scrape. Add when:

- Image-only Playbooks and Participation Agreement are OCR'd
- Live `/faq`, `/assess`, `/how-we-use-ai`, `/movement-voice-commitments` are captured

Field Guide PDFs (Safety, Sandbox) are also not included — add as separate manifest entries when exported for upload.

---

## Related docs

- [`../corpus-and-rag.md`](../corpus-and-rag.md) — enablement checklist
- [`../construction-decisions.md`](../construction-decisions.md) — corpus scope decision
- [`../prompts/room-host.md`](../prompts/room-host.md) — canon + retrieval policy
