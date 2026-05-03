# Stitch prompt: Movement Leader Research Reader (UI mockup)

Paste the block below into Stitch (or your design tool’s “generate screen from text” flow). It lists every region, state, and behavior so you can produce a **full-fidelity visual mock** to align with `docs/movement_leader_research/index.html` before code polish.

---

## Context primer (for the model)

**Product:** A **local web tool** (served over HTTP, not `file://`) for reading ~700 markdown research dossiers organized by **movement leader** (~160 leader folders). This is an **internal research library**, not a public marketing site.

**Visual system:** Align with **Movemental** static preview language: **light** background, **Inter** for UI and long-form body, **Instrument Serif** (italic) for the current document title / display moments. **Frosted** sticky top bar, **subtle borders** (no heavy drop shadows on cards), **primary** accent for focus and active nav, **muted** secondary text for metadata. Compact but **legible**—this is a tool people use for hours.

**Layout pattern:** **Split shell** — fixed-width **left sidebar** (file tree) + **scrollable main** (article). **Desktop:** sidebar always visible. **Mobile / narrow:** sidebar becomes a **slide-over drawer**; a **top bar** under the app header has a hamburger + short breadcrumb.

**Critical controls (must appear in the mockup):**
1. **App header (sticky):** kicker “Research library”, title “Movement leader research”, then a **native-style leader dropdown** (all leaders + per-leader, with counts), a **search field** “Filter files” (filters the sidebar list), and a small **text stat** (e.g. “742 documents · 162 leaders”).
2. **Sidebar:** title line (current leader or “All leaders”), **meta line** (e.g. “Listing 12 files”), then **grouped nav** — section labels like “Analysis”, “Content”, “Overview & index”, with **one line per file** (title; when “all leaders” mode, a second line = file path). **Active** item: left border accent + filled background.
3. **Main column:** **Optional mobile topbar** (menu + “Reading `path…`”). **Article chrome:** small **leader label**, **large italic serif H1** (document title from filename), **path/meta** under it. **Body:** comfortable **prose** (paragraphs, H2–H3, lists, blockquotes, tables, code blocks). Long lines constrained to a **reading max width** (~680px feel).

**Optional strip (can be a slim banner):** warning that `file://` does not work—user must run a local server. Visually **non-destructive** (soft tint, not alarm red as primary—still readable).

**Interactions to imply in the design (not build):** Choosing a leader repopulates the sidebar. Search **narrows** the list. Clicking a file **loads** content in the main area and **updates the URL hash** for sharing. **Empty states:** no leader selected (prompt in sidebar); no search results; load error in the article area.

**Data scale:** Dropdown list is **long** (hundreds of options in “all” mode is not the pattern—**only one leader** or **all files** in sidebar, not 700 options in the select). The **select** options are: placeholder, “All leaders (N docs)”, then one row per **leader name + file count**. Keep the **closed** select looking **premium** (clear chevron, padding, height ~40px).

**States to cover (suggest 2–3 frames or one frame with callouts):**
- **A — Default / desktop:** “Alan Hirsch” selected, sidebar partially scrolled, one doc **active**, article shows a sample markdown page.
- **B — Mobile:** drawer **open** over a dimmed backdrop, same content.
- **C — All leaders + filter:** “All leaders” selected, search field has text, sidebar shows path sublines, stat updated.

**Anti-patterns:** No generic “AI slop” purple gradients. No dark mode unless you show a **separate** variant. No marketing hero—this is a **reader**. No tiny body text; **accessibility**-friendly hit targets (44px where possible).

**Deliverable:** One or more **high-fidelity** screens (desktop 1280px+ and mobile 390px) showing the **full shell** and enough **content density** in the sidebar to feel real. Export or label **components**: AppHeader, LeaderSelect, FileFilter, DocStat, Sidebar (NavGroup, NavItem), MainArticle (Prose), MobileTopbar, Drawer, FileProtocolBanner.

---

**End of prompt block**

When you have Stitch output, drop screens into the repo (e.g. `docs/html/...` or your Stitch download folder) and we can map components back to `mlr-reader.css` + `index.html` for a visual pass.
