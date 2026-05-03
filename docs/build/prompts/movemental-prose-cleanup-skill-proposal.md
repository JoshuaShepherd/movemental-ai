# Prompt: `movemental-prose` skill — rationale and reference

**Status:** Skill is implemented. This document captures the rationale, corpus evidence, and extensibility model. Read it before editing the skill or the registers file.

**The skill:** [`.claude/skills/movemental-prose/SKILL.md`](../../../.claude/skills/movemental-prose/SKILL.md)
**The registers file (extensible):** [`docs/content/terminology-registers.md`](../../content/terminology-registers.md)

**Use the skill when:** You are preparing Movemental prose (articles, book chapters, field guides, paratext, emails, site copy) for publication and want it to read like a thoughtful human guide writing for senior leaders — not AI-polished content.

**Not the same as:**
- [`movemental-narrative-audit`](../../.claude/skills/movemental-narrative-audit/SKILL.md) — strategic / editorial alignment (two-intelligences, six stages, pathways). Runs at the *argument* level.
- [`movemental-page-auditor`](../../.claude/skills/movemental-page-auditor/SKILL.md) — six-pass page audit including proof burden and cross-site role.
- [`article-audit`](../../.claude/skills/article-audit/SKILL.md) / [`alan-voice`](../../.claude/skills/alan-voice/SKILL.md) — Alan Hirsch's five voice markers (Christocentric, pastoral, narrative imagery, theological depth, prophetic intensity). **This is not Movemental's voice.**
- [`book-chapter-publisher-quality-edit`](./book-chapter-publisher-quality-edit.md) — chapter-scoped developmental + substantive editorial pass for the manuscript.

This proposal names a gap: there is no skill that enforces **Movemental's own house voice** and **audience register** at the line level across articles, field guides, paratext, emails, and site copy.

---

## Part 1 — The problem this skill solves

Pieces across `docs/articles/`, `docs/book-development/manuscript-ordered/`, and `docs/book-development/fragmentation-manuscript-ordered/` read, at the margins, like high-quality AI output that has been lightly humanised. The failure modes are specific and repeating. Each one is quotable from the current corpus.

### 1.1 Throat-clearing / fuzzy openings that presuppose an already-oriented reader

A senior pastor or executive director reads the first two sentences. If those sentences drift, the piece is gone. Current openings often begin in a reflective mood the reader has not yet entered.

Examples from the corpus:

- `the-movemental-thesis.md` opens *"You did not ask for this terrain. You were trained for another kind of decade…"* — the reader has to earn their way into what "this terrain" refers to for a full paragraph before the stakes land.
- `the-ssss-framework.md` (the AI Stewardship Sequence article) opens *"Picture a staircase in an old building. Four treads. A landing at the top…"* — literary, atmospheric, and genre-neutral; the reader does not know whether this is a parable, a management book, or a theological essay.
- `the-fragmentation-tax.md` (better) opens with a concrete donor scene that resolves in four sentences. It is the pattern the weaker pieces should match.

**The rule:** within the first 60–90 words, the reader must know (a) who this is for, (b) what concrete situation is on the table, and (c) why it rewards ten more minutes of attention. Mood can follow. Mood cannot lead.

### 1.2 Nominal cross-references that assume content the reader has not read

Canon pieces sprinkle `See [*Why Order Matters*](./why-order-matters.md).` style pointers through dense paragraphs. They function as footnotes for the author, not invitations for the reader. A reader who has not already read the linked piece gets nothing from the citation.

`the-movemental-thesis.md` alone contains roughly a dozen such pointers — to *The Frontier You Didn't Choose*, *Why This Moment Feels Disorienting*, *The Two Equal Errors*, *This Is Not a Tools Problem*, *Integrity vs. Impact*, *The Fragmentation Tax*, *Content That Doesn't Move*, *The Collapse of Signal in the AI Age*, *Why Expertise Is Becoming Invisible*, *The Death of Isolated Work*, *Safety Before Speed*, *The Purpose of Sandbox*, *Skills as Formation, Not Training*, *Why Solutions Come Last*, *The AI Stewardship Sequence*, *There Is a Way Through This*, *Why Order Matters*, *When Work Begins to Move*, *From Content to Movement*, *The Return of Coherent Leadership*, *AI With Integrity*, *Building for the Next Decade*. The cumulative effect is an index, not an argument.

**The rule:** every internal link must either (a) be loadbearing — the sentence names what the reader will find there and why it matters *here*, or (b) be demoted to an end-of-piece "read next" module with a one-sentence gloss per link. No bare `See [Title]` links inside paragraphs.

### 1.3 Abstract nouns asserted without concrete anchors

The corpus tends to stack capitalised or specialised nouns — *stewardship*, *formation*, *fragmentation tax*, *signal collapse*, *citation economy*, *orbits and infra channels*, *movement-shaped imagination* — as if naming them were the same as grounding them. Some pieces (e.g., `the-fragmentation-tax.md`, `sandbox/the-three-kinds-of-value.md`) do the grounding work: a donor, a four-hundred-piece archive, a specific thank-you note, a specific funeral. Others (e.g., large stretches of `the-movemental-thesis.md`, the AI Stewardship Sequence article `the-ssss-framework.md`) state the abstraction twice and move on.

**The rule:** any abstract noun that is carrying an argument must be anchored within three sentences by a concrete instantiation — a named role (executive director, communications lead, board chair, volunteer coordinator), a specific artefact (a donor note, an appeal email, a sermon series), a specific number, or a specific situation. Repeating the abstraction is not anchoring it.

### 1.4 Jargon and in-house terminology the audience does not actually use

The audience Movemental names — *senior pastor, executive director, founder, institutional lead* — does not, in ordinary speech, use *scenius*, *load-bearing*, *apostolic genius*, *ceremony vs. sequence*, *trip-wires*, *movement-shaped imagination*, or reach for the AI Stewardship Sequence by any shorthand before the four words have been named. Some of these are genuine Movemental terms (Safety, Sandbox, Skills, Solutions; fragmentation; formation; integration). Others are drift — vocabulary borrowed from the Hirsch corpus or invented for rhetorical effect and then repeated as if it were already shared.

**The rule:** maintain an explicit list of (a) **endorsed** Movemental terms — introduced once, used consistently; (b) **tolerated** terms — usable with an inline gloss on first use; (c) **flagged** terms — drift from sibling corpora or one-off coinages that should either be glossed, replaced with plain language, or cut. See Part 4 for the starter list.

### 1.5 AI-shaped sentence architecture and cadence

Recognisable AI-prose signatures cluster in the less-edited pieces:

- **Tricolons with escalating abstraction.** *"It fills slots. It satisfies calendars. It disappears."*
- **Antithesis / "Not X. It is Y." constructions.** *"Sincerity is not the scarce resource. Structure is."* *"It is not a ban by default. It is confidence to move without betraying the mission."* Used two or three times per piece they read as voice; used on every page they read as a tic.
- **Signature-phrase closers in italics or blockquotes** that summarise the argument aphoristically. *"the only adoption that endures is adoption your organization can still recognize as itself a year later."*
- **Meta-adjective stacks.** *"load-bearing claim"*, *"structural pressure"*, *"moral theater"*, *"lab coat"*, *"decisive layers"*. The adjectives do rhetorical work the nouns should do.
- **Parallelism used as decoration rather than argument.** *"Volume drowns. Format incentives favor velocity over judgment. Discovery layers increasingly reward what is easy to produce and easy to quote without context."*
- **Universal-addressee "you".** A "you" that could be any reader anywhere. Effective "you" has a specific role, context, and pressure.

**The rule:** antithesis, tricolon, and aphoristic closers are allowed up to a budget per piece (see Part 5). Over budget, they must be rewritten.

### 1.6 Over-edited first-person absence

Movemental's best paragraphs have Josh on the page — "I watched a mid-sized nonprofit…", "a donor, after five years of steady giving…". Weaker paragraphs lose the first person entirely and the voice flattens into magisterial third-person observation. The skill should preserve and, where appropriate, *recover* first-person grounding, without tipping into memoir.

---

## Part 2 — What "thoughtful human guide" means for Movemental (distinct from `alan-voice`)

Movemental's voice is not Alan Hirsch's voice. Alan's five markers (Christocentric anchoring, pastoral warmth, narrative imagery, theological depth, prophetic intensity) are correct for alanhirsch.com and wrong here. Movemental writes to an ecumenical mission-driven audience — churches, nonprofits, institutions, movement leaders — in which theology is one vocabulary among several and the organisation's legal structure varies.

### 2.1 The Movemental voice, named explicitly

**The guide posture.** A senior practitioner writing to another senior practitioner. Calm. Unhurried. Does not flatter the reader and does not perform expertise. Assumes the reader has responsibility, tiredness, board pressure, and limited patience. Writes as if the reader will make a decision today based on this paragraph.

**The five Movemental voice markers** — proposed, to be ratified:

| Marker | What it means | Target |
|---|---|---|
| **1. Concrete grounding** | Every abstract claim is anchored within three sentences by a named role, situation, artefact, or number. | ≥1 concrete anchor per ~150 words of argument. |
| **2. Role-specific "you"** | The reader being addressed is a specific role under specific pressure (executive director reading a donor note at 9pm; pastor reading an AI-drafted pastoral email). Not a universal reader. | Named role or situation in first 90 words. |
| **3. Sequence-honesty** | The argument states its sequence, acknowledges counter-objections, and names where the argument is uncertain. Epistemic humility without hedging. | At least one "a thoughtful reader should interrupt here…" move per major piece. |
| **4. Structural diagnosis, not moralising** | Problems are diagnosed as structural (incentives, sequence, architecture), not moral failures of the reader. The reader is tired, not wrong. | Zero sentences that shame the reader. |
| **5. Plain Anglo-Saxon verbs** | Strong verbs where possible; abstract nominalisations cut where possible. Technical vocabulary (Safety, Sandbox, Skills, Solutions, fragmentation, integration) kept; decorative vocabulary (*stewardship crisis*, *moral theater*, *structural pressure*) earned or cut. | Flesch-Kincaid grade ≤ 12 for articles; ≤ 14 for book chapters. |

**Failure modes** (mirroring Alan's failure-mode list, but calibrated to Movemental):

- **AI-essayist default** — signature closers, "It is not X. It is Y.", tricolons every paragraph, "load-bearing" used more than twice per piece.
- **Bookish drift** — written as if every reader is reading all sibling pieces in order. Corrected by either inline grounding or demoting links to an end-of-piece module.
- **Sermon posture** — aphoristic blockquotes functioning as altar calls. Allowed at most once per piece and only at the close.
- **Decorative parallelism** — three-part symmetry used for rhythm rather than argument.
- **Generic-audience "you"** — a "you" that could be a CEO of any org anywhere.
- **Theology-flavoured secular prose (or vice versa)** — words like *conviction*, *discernment*, *stewardship* used as rhetorical paint over arguments that were not actually theological. Either earn the theology or choose plainer words.

### 2.2 Relationship to `alan-voice`

`alan-voice` lives under `alan-hirsch/.claude/skills/` (symlinked in). It is correct for alanhirsch.com content. **This skill must explicitly not apply Alan's five markers.** When a piece is co-authored or being adapted from Alan's corpus into Movemental, running both skills would flatten the difference between the two voices. The Movemental skill should short-circuit with a warning if Christocentric density is >0.6 — that is a sign the piece belongs on alanhirsch.com, not here.

---

## Part 3 — Audience and register

### 3.1 Audience personas (ratified by existing docs)

From [`docs/personas/`](../../personas/) and the audience pages under `src/app/(site)/`:

1. **Movement leader / thought-leader author.** Writes books, teaches, runs a small team. Reads for argument and voice. Will tolerate a literary opening if it pays off by minute two.
2. **Nonprofit executive director.** Board-facing, donor-facing, staff-facing. Reads for decision support. Has no patience for throat-clearing. Needs the stakes in the first paragraph.
3. **Senior pastor / denominational lead.** Reads theologically but also operationally. Will not trust a piece that uses theological vocabulary as paint.
4. **Institutional lead (seminary, college, denomination).** Reads for structural coherence and precedent. Values footnotes, honest uncertainty, and named counter-positions.

All four share: **responsibility, tiredness, limited patience for AI-smelling prose, high sensitivity to vocabulary that does not match their sector.**

### 3.2 Terminology registers — starter list

These are proposed. The skill should read from a canonical file (`docs/content/terminology-registers.md` — to be created) rather than hard-coding; this proposal seeds that file.

**Endorsed (use without gloss):**
- Safety / Sandbox / Skills / Solutions (the four steps)
- Fragmentation / Integration / Activation / Formation / Multiplication (the five stages)
- Movement leader, nonprofit, church, institution (the four audience arms)
- Library, pathways, voice (the artefact trio)
- Core library

**Tolerated (gloss on first use):**
- Scenius — gloss as "shared, networked intelligence inside a real field of practice" on first use per piece.
- APEST / 5Q / mDNA — gloss when the audience is non-theological; otherwise flag for removal and reference `alan-voice` instead.
- Apostolic Genius — only when the piece is explicitly engaging the Hirsch corpus; otherwise cut.
- Two intelligences — gloss on first use; in book context, assume prior definition.

**Flagged (drift — replace, gloss, or cut):**
- "Load-bearing" used as an adjective (cap at twice per piece; replace second use with plain restatement of what the sentence load-bears).
- "Staircase, not a menu" / "staircase vs. scramble" (fine once per piece; tic after that).
- "Ceremony vs. sequence" (fine in the AI Stewardship Sequence frame; tic elsewhere).
- "Trip-wires" (cap at once per piece).
- "Moral theater", "lab coat", "genre-drifting", "sanded off" — decorative; cut unless doing load-bearing work.
- "The category error is not at the metric level. It is at the adjective level." and siblings — one per piece at most.
- Any shorthand for the AI Stewardship Sequence before the four words (Safety, Sandbox, Skills, Solutions) are spelled out in a given piece.

**Audience-mismatch flags (specific to sector):**
- "Pastoral touchpoints", "child-safety protocol", "eulogy" — drop when addressing nonprofit or secular-institutional readers (they will not recognise the category).
- "Appeal letters", "development calendar", "major gifts" — drop when addressing church readers who do not speak fundraising dialect.
- "Governance in plain language" is endorsed because every audience uses it.

---

## Part 4 — Proposed SKILL.md

File path: `.claude/skills/movemental-prose-cleanup/SKILL.md`

Proposed frontmatter and body, ready to drop in:

```markdown
---
name: movemental-prose-cleanup
description: Audit and fix line-level prose in Movemental articles, book chapters, field guides, paratext, emails, and site copy against Movemental's house voice and audience registers. Catches AI-shaped openings, nominal cross-references, unanchored abstractions, drift vocabulary, and AI-telltale cadence. Not for Alan Hirsch corpus (use alan-voice). Not for strategic/narrative alignment (use movemental-narrative-audit).
user-invocable: true
allowed-tools: Read, Write, Edit, Grep, Glob
---

Audit and/or fix prose: $ARGUMENTS

$ARGUMENTS should be either (a) a file path to the piece being edited, (b) pasted prose, or (c) a directory. Prefix with `audit:` for diagnosis only, `fix:` for in-place revision, or omit for audit+fix. If no arguments, ask what to audit.

---

## Mode selection

- **Audit** — score against the five Movemental voice markers, flag failure modes, quote offending passages, propose specific fixes. No writes.
- **Fix** — apply Edit calls in place for all High and Critical findings. Low findings go into the output as suggestions only.
- **Audit+fix** (default) — audit first, present findings, apply fixes for Critical and High only unless the user says otherwise.

If the target is the Alan Hirsch corpus (sibling repo) or a file with Christocentric density >0.6, stop and recommend `alan-voice` / `article-audit` instead.

---

## Step 1 — Read the registers

Before judging a word, read:

- `docs/content/terminology-registers.md` (or this prompt, Part 3.2) for endorsed / tolerated / flagged terms.
- `docs/design/DESIGN.md` for voice constraints tied to site chrome.
- The target piece's frontmatter — `audience_tier`, `canon_section`, `audience`, `author`. The audience tier determines how strict the skill is on jargon (executive > deepening > synthesis).

---

## Step 2 — The five voice markers (score each 0.0–1.0)

| Marker | Target | What to check |
|---|---|---|
| **1. Concrete grounding** | ≥0.7 | Every abstract claim anchored within three sentences by role, situation, artefact, or number. Count unanchored abstractions. |
| **2. Role-specific "you"** | ≥0.7 | Named role or situation in first 90 words. No universal "you". |
| **3. Sequence-honesty** | ≥0.6 | At least one counter-objection / "a thoughtful reader should interrupt" move in any piece over 1500 words. Hedging ≠ honesty. |
| **4. Structural diagnosis** | ≥0.7 | Zero reader-shaming sentences. Diagnoses are structural (sequence, incentive, architecture). |
| **5. Plain verbs** | ≥0.6 | Abstract nominalisation density ≤ 10% of content words. Readability grade within range for the tier. |

**Overall coherence target: ≥0.75.** Below 0.65 = major revision. Below 0.50 = consider whether the piece should exist.

---

## Step 3 — The six failure-mode gates

For each, quote a specific passage and propose a rewrite. A piece cannot be marked "publish ready" with any Critical gate open.

1. **Fuzzy opening (Critical).** Within the first 60–90 words, does the reader know (a) who this is for, (b) what concrete situation is on the table, (c) why ten more minutes is worth it? If not, rewrite the opening. Use the `the-fragmentation-tax.md` donor-note pattern as the reference exemplar.

2. **Nominal cross-references (High).** For each internal link: is the sentence naming what the reader will find there and why it matters *here*? If not, either rewrite the sentence to be loadbearing, or demote the link to an end-of-piece "Read next" block with a one-sentence gloss per link. No bare `See [Title]` links inside paragraphs.

3. **Unanchored abstractions (High).** For each capitalised/specialised noun (fragmentation tax, signal collapse, stewardship, formation, citation economy, two intelligences, etc.): is there a concrete anchor within three sentences? If not, insert one or cut the abstraction.

4. **Drift vocabulary (High).** Cross-check against the Flagged list in registers. Each flagged term: replace with plain language, gloss inline, or cut. Cap "load-bearing" at 2/piece; cap "staircase"/"ceremony"/"trip-wires" patterns at 1/piece.

5. **AI cadence (Medium).** Count per piece:
   - Tricolons (three-part parallel sentences): cap at 3/piece for articles under 2500 words; 5/piece for longer.
   - "Not X. Y." / "It is not X. It is Y." / antithesis constructions: cap at 3/piece.
   - Signature-phrase aphoristic closers (italicised or blockquoted): cap at 1/piece, only at the close.
   - Over budget → rewrite the weakest instance into flat declarative prose.

6. **Audience-mismatch vocabulary (Medium).** If the piece targets a specific audience arm, strip vocabulary that only another arm would recognise. Nonprofit pieces: drop "pastoral touchpoints", "eulogy"-class examples. Church pieces: drop "major gifts", "development calendar". Institution pieces: drop "founder" as a generic actor. Replace with examples the audience actually lives inside.

---

## Step 4 — Repair moves (cookbook)

**For a fuzzy opening.** Replace with: (a) a named scene involving a specific role under specific pressure, or (b) a one-paragraph plain statement of the argument's stakes for that role, ending in a sentence that names what the piece will deliver. Keep mood to a half-sentence if at all.

**For nominal cross-references.** Collapse clusters into an end-of-piece "Where this connects" block with this template:

```
### Where this connects

- **[Title]** — [one-sentence gloss of what the reader finds there and why it matters].
- **[Title]** — …
```

Inside the body, keep only links where the sentence itself does the connecting work.

**For unanchored abstractions.** Insert a concrete anchor using this pattern: `<abstract claim>. A <specific role> <specific action> and <specific consequence>.` Example: `Fragmentation shows up first in the donor relationship. An executive director realises, five years in, that a long-time donor still cannot describe the organisation in one sentence.`

**For drift vocabulary.** Apply this replacement table (seed; extend in registers file):

| Drift term | Replace with (default) | Keep when |
|---|---|---|
| load-bearing claim | core claim | you have used the adjective ≤1 time already |
| the staircase vs. the scramble | the forward sequence vs. the inverted one | first instance in piece |
| structural pressure | pressure from how the work is set up | abstract-density already high |
| moral theater | performance without underlying change | theology context earns it |
| lab coat | unacknowledged production | within the specific Sandbox-vs-pilot contrast |
| trip-wires | categories where a small mistake becomes a public problem | ≤1/piece |
| orbits and infra channels | connected channels and background infrastructure | always gloss first use |

**For AI cadence.** Rewrite the weakest instance of tricolon / antithesis / aphorism into a plain sentence. If the paragraph depends on the cadence, cut the paragraph.

**For audience mismatch.** Swap the example. Keep the argument.

---

## Step 5 — Output format

### Audit mode

```
# Prose Audit: <title or path>

**Readiness:** PUBLISH READY / NEEDS REVISION / MAJOR REVISION REQUIRED
**Audience:** <from frontmatter>
**Word count:** <n>

## Voice Markers

| Marker | Score | Target | Status |
| --- | --- | --- | --- |
| Concrete grounding | 0.X | ≥0.7 | ✓/✗ |
| Role-specific "you" | 0.X | ≥0.7 | ✓/✗ |
| Sequence-honesty | 0.X | ≥0.6 | ✓/✗ |
| Structural diagnosis | 0.X | ≥0.7 | ✓/✗ |
| Plain verbs | 0.X | ≥0.6 | ✓/✗ |
| **Overall** | **0.X** | **≥0.75** | ✓/✗ |

## Failure-Mode Gates

1. **Fuzzy opening** [CRITICAL/OK] — quote + proposed rewrite
2. **Nominal cross-references** [HIGH/OK] — count + worst offenders + proposed fix
3. **Unanchored abstractions** [HIGH/OK] — list + proposed anchors
4. **Drift vocabulary** [HIGH/OK] — table of terms used with counts + replacements
5. **AI cadence** [MEDIUM/OK] — tricolon/antithesis/closer counts + cuts
6. **Audience mismatch** [MEDIUM/OK] — offending vocabulary + swaps

## Priority Fix List (max 10)

1. [CRITICAL] <issue> — <fix>
2. [HIGH] <issue> — <fix>
…
```

### Fix mode

Apply Edits in place for all Critical and High items. Report the diff summary at the end:

```
# Fixes Applied: <path>

- Rewrote opening (Critical) — see diff
- Demoted 11 cross-references to Read next block (High)
- Anchored 6 abstractions with concrete examples (High)
- Replaced 4 drift terms (High)
- Cut 2 tricolons, 1 aphoristic closer (Medium)

Deferred to suggestion list (Medium/Low):
- …
```

---

## Step 6 — Pre-return checklist

- [ ] Target file's frontmatter read and audience arm identified
- [ ] Registers file read (or Part 3.2 of the proposal if registers file absent)
- [ ] All five markers scored with quoted evidence
- [ ] All six gates run
- [ ] If Fix mode: every Edit traces back to a specific gate or marker finding
- [ ] No fix introduces new drift vocabulary or new unanchored abstractions
- [ ] Christocentric density check: if >0.6, skill stopped and recommended alan-voice
```

---

## Part 5 — Budgets and thresholds (ratify before building)

These numbers are proposed, not derived from data yet. The skill should read them from a config file so they can be tuned without editing the skill.

| Limit | Proposed value | Notes |
|---|---|---|
| Tricolons per piece (≤2500 words) | 3 | Article-length. |
| Tricolons per piece (>2500 words) | 5 | Chapter-length. |
| Antithesis / "Not X. Y." constructions per piece | 3 | Across all lengths. |
| Aphoristic closers in italics/blockquote | 1 per piece, at the close only | Over budget → rewrite as plain declarative. |
| "Load-bearing" uses | 2 per piece | Second must be plain restatement. |
| "Staircase" / "ceremony" / "lab coat" patterns | 1 per piece | |
| Unanchored abstractions | 0 tolerated over three sentences | Critical fix. |
| Nominal cross-references per paragraph | 0 | Demote to Read next. |
| Word count before named role/situation appears | ≤90 | Critical. |
| Readability grade — executive tier | ≤12 | Flesch-Kincaid. |
| Readability grade — deepening tier | ≤14 | |
| Readability grade — synthesis tier | ≤16 | Book-level. |

---

## Part 6 — Test protocol before shipping the skill

Run the proposed skill in Audit mode against this corpus sample. The sample exercises the full range of failure modes.

**Good exemplars (should score ≥0.8 overall):**
- [`docs/articles/the-fragmentation-tax.md`](../../articles/the-fragmentation-tax.md) — concrete opening, named scene, structural diagnosis.
- [`docs/articles/sandbox/the-three-kinds-of-value.md`](../../articles/sandbox/the-three-kinds-of-value.md) — named donor example, grounded argument.

**Mid exemplars (should score 0.6–0.75 and produce 3–8 fix items):**
- [`docs/articles/the-ssss-framework.md`](../../articles/the-ssss-framework.md) — the AI Stewardship Sequence piece; strong argument, fuzzy opening, drift vocabulary.
- [`docs/articles/why-expertise-is-becoming-invisible.md`](../../articles/why-expertise-is-becoming-invisible.md) — good diagnosis, nominal cross-references sparse.

**Stress exemplars (should score 0.4–0.6 and trigger Critical on fuzzy opening + nominal cross-references):**
- [`docs/articles/the-movemental-thesis.md`](../../articles/the-movemental-thesis.md) — literary opening, ~20 bare internal links.
- Selected chapters from `docs/book-development/manuscript-ordered/` — book-length, dense abstraction.

For each test piece, record: (a) skill's scores vs. human judgement, (b) whether proposed fixes preserved argument and voice, (c) false-positives on endorsed vocabulary. Tune budgets and registers from this pass before user-invocable rollout.

---

## Part 7 — Where the skill fits in the existing audit stack

Run order for a piece being prepared to publish:

1. **`movemental-narrative-audit`** — is the argument right? (strategic)
2. **`movemental-prose-cleanup`** (this skill) — does it sound like Movemental, not AI, for its audience? (line-level)
3. **`movemental-page-auditor`** (if it has a page) — sequencing, copy, proof, cross-site role.
4. **`visual-storytelling-audit`** (if it has a page) — tonal band, rhythm, tokens.
5. **`pnpm typecheck`** between passes; human final read before publish.

This skill should **not** run against sibling-repo content (alan-hirsch, movemental-ai, movemental-content-studio). It should **stop and recommend** if it is pointed at content whose frontmatter or content signature indicates it belongs to another property.

---

## Part 8 — Decisions made (implemented)

The skill is built. Decisions taken:

1. **Name:** `movemental-prose` (not `-cleanup`; matches the terser pattern of `article-audit`, `alan-voice`).
2. **Registers file:** [`docs/content/terminology-registers.md`](../../content/terminology-registers.md) is the only extensible surface. Edit it to add, demote, or endorse terms. The skill re-reads on every invocation.
3. **Budgets:** Paragraph-scoped, not per-piece caps. The flag is *clustering* (three or more AI-signature devices in a single paragraph; repeated aphoristic closers). Individual devices at natural rates are not flagged — Josh's voice has real rhythm.
4. **Alan-voice relationship:** The skill stops and recommends `alan-voice` if Christocentric density is high. They do not run together.
5. **Fix mode:** Auto-applies Critical and High; Medium goes into a "Suggestions not applied" list. Conservative enough to preserve voice; aggressive enough to be useful.
6. **Extensibility:** New drift candidates surface at the end of every audit ("Terms Josh should consider adding") so the registers file grows from real corpus patterns rather than speculation.

## Part 9 — How to invoke

```text
/movemental-prose docs/articles/the-movemental-thesis.md
/movemental-prose audit: docs/articles/the-ssss-framework.md
/movemental-prose fix: docs/articles/the-fragmentation-tax.md
```

Or via the Skill tool:

```text
Skill(movemental-prose, "<path or prose>")
```

To add a term: edit [`docs/content/terminology-registers.md`](../../content/terminology-registers.md) directly. Next run picks it up.

---

**End of proposal.**
