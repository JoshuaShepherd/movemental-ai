# AI Book — Book Development

> **Revision status:** The AI book is currently under **major revision**. Prose is still uneven; do not treat any folder as publication-final.

## Where to edit (canonical)

- **`fragmentation-manuscript-ordered/`** — **Public reader source:** wired to `/book` via [`src/lib/book.ts`](../../src/lib/book.ts) and [`BOOK_SPINE`](../../src/lib/book-types.ts). Edit here for what ships on the site.
- **`manuscript-ordered/`** — **Legacy *Content That Moves* workspace** (preface + 21 chapters). Not used by the live reader; see [`manuscript-ordered/ARCHIVED.md`](./manuscript-ordered/ARCHIVED.md). Keep only for editorial history or mining prose.
- **`manuscript-final/`** — **Legacy shape** (older numbering and chapter splits). Use only to **mine** prose; do not treat its outline as current.

## Contents

- **fragmentation-manuscript-ordered/** — Manuscript files for the public `/book` reader  
- **manuscript-ordered/** — Legacy *Content That Moves* ordered manuscript + outline + meta + voice guide (archived for the site reader; see `ARCHIVED.md` inside the folder)  
- **manuscript-final/** — Legacy manuscripts and PDFs (quarry, not canonical structure)  
- **book-draft/** — Earlier draft material  
- **process/** — Writing process, structure templates, synthesis method  
- **supporting-docs/** — Author transcripts and analysis  
- **CANONICAL_BOOK_DRAFTING_SYSTEM.md** — Research/epistemic rules, long prompts, edition-remix tables (complements `manuscript-ordered/`)  
- **BOOK_TRAJECTORY_AND_LATEST_OUTLINE.md** — Trajectory, three-section reader map, gap notes  
