# Prompt: Generate Reflected Understanding for a Single Movement Leader

Apply this prompt to **one** movement leader (e.g. Alan Hirsch, Brad Brisco, Mindy Caliguire, Mark Sayers, Cam Roxburgh). The output is a single, fully written reflected-understanding document saved under `_docs/movement_leader_research/reflected-understanding/` with the leader’s name as the filename (slug form).

---

## Input

- **Leader:** [Full name of the leader, e.g. "Alan Hirsch" or "Brad Brisco"]
- **Slug:** Derive from the name (lowercase, hyphens). Examples: Alan Hirsch → `alan-hirsch`, Brad Brisco → `brad-brisco`, Mark Sayers → `mark-sayers`.

---

## Sources to use

Read **all** already-gathered content for this leader in:

`_docs/movement_leader_research/[slug]/`

Prioritize (when present):

- `summary.md` — executive summary, digital presence, content landscape, key findings
- `gap-analysis.md` — embodied work indicators, digital expression analysis, gaps
- `movemental-analysis.md` — platform gaps, revenue model, Movemental fit
- `content-analysis.md` — content forms, themes, distribution
- `digital-presence-discovery.md` — sites, platforms, discoverability
- `sources.md` — references and citations

Use every other `.md` file in that directory as needed. Do **not** invent facts; only use what the research states or clearly implies. If a topic (e.g. TAM, royalties) isn’t in the research, either omit it or phrase at a general level (“your publisher,” “your current digital revenue”) without fabricating numbers or deals.

For **structure and language patterns**, use:

`_docs/_prompts/alan-hirsch-reflected-understanding.md`

especially the sections “Recommended Structure for a Reflected Understanding” and “Language Patterns: Templatized Common + Dynamic Entry Points.” The Alan Hirsch document is the canonical example of tone, length, and “common + dynamic” pattern.

---

## What to produce

One markdown file containing the **full reflected understanding** for this leader. Write in **second person** (“you”). The reader is the leader; the copy should be something they could endorse as true and familiar, with edges that deepen.

Use the **common frame** (what all movement leaders share) and fill in **dynamic details** from the research (their name, role, orgs, books, sites, constraints, commerce, credibility). Lead with the shared truth; complete with the specific facts. Do not use “leaders like you”; use “you” plus concrete detail.

---

## Required structure and what each section must answer

1. **Title and one-line intent**
   - **Heading:** `# [Full Name]: Reflected Understanding`
   - **Subheading:** One sentence that states the document’s purpose: a concise reflection spoken back so the language could be endorsed—familiar, but with edges that deepen.
   - No other content in this block.

2. **Calling**
   - **Common:** Success is formation and multiplication; they’re not selling a brand; they think in terms of movement.
   - **Dynamic:** *This* leader’s framing, language, and role (e.g. reactivate what’s latent, soul care, faith and culture). Their orgs, books, and primary contribution. One short paragraph.

3. **Audience**
   - **Common:** Movement-oriented; multiplication, sentness, formation; mix of pastors, academics, practitioners, international.
   - **Dynamic:** *This* leader’s personas (2–4 bullets if the research supports it). *This* leader’s TAM or “gap” (who knows them vs who would be formed if they could find the work). One short paragraph plus optional persona bullets.

4. **Existing Content (Before the Platform We’re Building)**
   - **Common:** They already have a body of work; the gap is circulation and coherence; offline vs online; silos; the work doesn’t “move.”
   - **Dynamic:** *This* leader’s exact locations (sites, books, orgs, conferences, podcasts). Their main digital asset (if any). Their content forms and themes.
   - **NOTs that Movemental addresses directly:** List only the NOTs that apply to *this* leader, with *their* examples: not translated, not structured/repurposed, not interconnected, not owned/unified, not legible to systems, not optimized for discoverability (SEO/GEO), not connected to AI that reflects their voice. End with one sentence: Movemental is built to speak to these NOTs so their content can move.
   - One or two short paragraphs plus the NOT list.

5. **Constraints**
   - **Common:** Time and attention are the limit; they’re at capacity; they cannot become full-time content operators; the issue is capacity, not desire.
   - **Dynamic:** *This* leader’s roles and time sinks, budget reality (if in research). One short paragraph.

6. **Commerce**
   - **Common:** No obvious viable path; trade publishing vs “own platform”; the system isn’t built for people like them.
   - **Dynamic:** *This* leader’s publisher and royalty situation, current digital revenue (if any), and “real commerce” (e.g. authority driving speaking, consulting, training). One short paragraph, or two if needed.

7. **Credibility (summation)** — optional but recommended
   - **Common:** Offline/in-the-room credibility is high; online it’s partial, fragmented, or invisible; that gap wasn’t fixable before without agencies/budgets/time; it’s become possible to close it in a way that respects their constraints.
   - **Dynamic:** *This* leader’s “in the room” vs “online” in one or two sentences. One short paragraph.

8. **Closing line**
   - One sentence: *This document is a reflected understanding for [Full Name], grounded in* _docs *and* _docs/movement_leader_research*, intended to be right to the point, true, and valuable.*

Do **not** include in the output document the “Supplemental” sections (what all movement leaders have in common, language patterns, recommended structure). Those live in the prompt and in the Alan Hirsch prompt file only. The output is purely the reflected understanding (sections 1–7 plus closing).

---

## Output path and filename

- **Directory:** `_docs/movement_leader_research/reflected-understanding/`
- **Filename:** `[slug].md` (e.g. `alan-hirsch.md`, `brad-brisco.md`, `mark-sayers.md`)
- **Full path example:** `_docs/movement_leader_research/reflected-understanding/brad-brisco.md`

---

## Checklist before saving

- [ ] Every claim is supported by the research in `_docs/movement_leader_research/[slug]/` (no invented stats, deals, or roles).
- [ ] Second person (“you”) throughout; no “leaders like you” or generic phrasing where the leader’s name or detail fits.
- [ ] Each section uses the common frame then the dynamic detail; the document feels both shared and personal.
- [ ] NOTs list only includes items that apply to this leader, with their examples.
- [ ] File is saved at `_docs/movement_leader_research/reflected-understanding/[slug].md`.
- [ ] Markdown is clean (headings, bullets, bold/italic as in the Alan Hirsch example).
