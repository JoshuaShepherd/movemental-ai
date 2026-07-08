# Build prompt — Generalize the Evergreen Engine into the content agent's prompting and stored prompt-packs

**Goal.** Turn the "Evergreen Engine" from a one-author playbook (written for Alan Hirsch and his five pathways) into a **multi-tenant capability of the platform**: a revised content-agent system prompt plus a library of **stored, layered prompt-packs** that any Movement Voice can run against their own corpus to produce a full SEO/GEO article cluster — and, as an extension, an evergreen course — grounded entirely in their books and written in their voice.

The Engine does one thing: it takes a finished body of work and makes it findable. The author already did the hard part — the ideas, the frameworks, the research. What is missing is *form*. A book is a sealed container; search engines can't read it and answer engines can't quote it. The Engine renders authority the author already has into the shapes discovery systems read: a definition, a glossary entry, an FAQ answer, a numbered framework. **It does not invent authority. It renders it.** That is the same principle the platform already commits to in `ASK_AI_PROMPTS` — *the AI reflects the corpus; it does not invent* — which is why this belongs in the platform and not bolted onto one tenant.

**Read first:**

- [eeat-research-content-qualification-rubric.md](../../notes/eeat-research-content-qualification-rubric.md) — the five EEAT dimensions and hard gates every finished piece must clear.
- [05-seo-geo-discoverability.md](../../research/articles/05-seo-geo-discoverability.md) — why GEO (being *quoted* by answer engines) now matters as much as SEO (being *ranked*).
- [research prompts README](../../research/prompts/README.md) — the house output shape (direct answer, confidence, honest limits).
- [upgrade-eeat-article-from-70-band.md](../upgrade-eeat-article-from-70-band.md) — the grading loop this feeds; articles the Engine produces are scored on the same rubric.
- `.claude/skills/plain-prose/SKILL.md` and `.claude/skills/movemental-prose/SKILL.md` — register discipline; the drafts must read like a person, not a deck.

**Do not conflate with:**

- `movemental-publish-gate` — the ship / no-ship gate for the live site. The Engine *produces*; the gate *clears*. They stay separate.
- `movemental-narrative-audit` — doctrine alignment. The Engine's fidelity check is narrower: does every sentence trace to the corpus.
- The **tenant `voice.md`** (e.g. `alan-voice`) — the Engine *consumes* it; it does not define it.

---

## 1 · The mental model — three inputs, one loop

The original guide hard-coded one author and one set of themes. The generalized Engine runs off **three inputs, and only these change from tenant to tenant**:

| Input | What it is | Where it lives in the platform |
|-------|-----------|-------------------------------|
| **The corpus** | The author's actual books, loaded and chunked. Everything written is drawn from here and nowhere else. | Notebook sources + `corpus-bindings` (`src/app/api/simplified/notebook-sources`, `corpus-bindings`) |
| **`voice.md`** | The author's register, posture, and signature rhetorical devices. Every prompt writes *in* this voice. | Tenant config artifact (see Phase 1) |
| **`themes.md`** | The author's themes (what the original called "pathways"). For each theme: its signature framework, signature concepts, native binaries, and the historical witnesses the corpus ties to it. | Tenant config artifact (see Phase 1) |

**The loop, in one sentence:** load the corpus, `voice.md`, and `themes.md` → pick one theme → apply one archetype prompt → go to the books and retrieve what that theme and archetype need → write the piece in the author's voice, grounded entirely in the corpus, never invented → a human reads it for fidelity and voice before it publishes.

That loop *is* the whole Engine. The ten article archetypes are that loop written out ten ways. Everywhere the original said "Alan Hirsch," read "the tenant, per `voice.md`." Everywhere it named a pathway, read "the chosen theme, from `themes.md`."

---

## 2 · The strategy, on one screen

Three rules decide whether the translation works, and one condition holds all three up.

- **E-E-A-T** — Experience, Expertise, Authoritativeness, Trustworthiness. Most sites strain to fake it; a real author already has it, trapped in books. Grounding every sentence in the corpus, naming the sources, and holding the vocabulary steady makes real expertise legible to a system that otherwise can't see it.
- **SEO — hub and spoke.** A theme's **pillar** page ranks for the broad term; the **cluster** of articles beneath it ranks for the hundred narrower questions; internal links bind them so authority earned by one page lifts the others. Fifty interlinked, corpus-grounded pieces read not as fifty pages but as one deep treatment of a field.
- **GEO — Generative Engine Optimization.** People increasingly ask an AI and read the synthesized answer without clicking. Those systems favor sources that are structured, self-contained, definitional, attributable, and internally consistent — an exact description of what the Engine produces. **SEO decides whether you're ranked. GEO decides whether you're quoted.**

**The load-bearing condition:** none of this survives thin content. A network of shallow, duplicative, machine-generated filler is not an authority graph — it's a liability, and both search and answer engines are built to catch it. Every sentence grounded in a real corpus, every claim checkable, every article genuinely different from its neighbors — **the faithfulness *is* the strategy.**

**The five production disciplines** (these become the acceptance criteria for the whole revision):

1. **Templates, not one-offs** — every prompt is a reusable pack with a fixed scaffold and one or two variable slots.
2. **Corpus grounding** — the model *retrieves*; it does not *recall*. Every draft comes from the author's actual books, paraphrased for the web — never from training data.
3. **A voice layer** — the register is defined once, in `voice.md`, and carried into every prompt.
4. **A standardized skeleton** — each archetype has a fixed structure, so fifty articles read as one library and the human review stays fast.
5. **A human editorial gate** — AI-first is not AI-only. Every draft passes a human fidelity/voice/accuracy check before publishing. This is the one step that cannot be automated, and the one that protects the author's name.

---

## 3 · The revision, phase by phase

### Phase 0 — Inventory what exists

1. Read the current content-agent system prompt(s) in `src/lib/agent-room/ask-ai/prompts.ts` and any notebook-artifact generation prompts.
2. Read the stored-prompt machinery: `src/lib/services/simplified/prompt-packs.service.ts`, `prompt-pack-layers.service.ts`, `discussion-prompts.service.ts`, and the matching hooks in `src/hooks/simplified/`. Record the `PromptPacks` / `PromptPackLayers` shapes (name, slug, body, ordering, tenant scoping).
3. Read the notebook/corpus surfaces: `notebook-sources`, `notebook-source-chunks`, `corpus-bindings`, `corpus-review-items`, `notebook-artifacts`.
4. Produce a one-page map: *where a content prompt is stored today, how it is composed at run time, and where the corpus is bound.* Everything below slots into that map — do not introduce a parallel system.

### Phase 1 — Make the three inputs first-class tenant config

The Engine is only as portable as its inputs. Give each tenant three durable artifacts:

1. **Corpus binding** — already modeled. Confirm a tenant's notebook can be scoped to *only* that author's books for a generation run (no cross-tenant bleed). The Engine's non-negotiable is "draw only from this corpus" — enforce it at the retrieval layer, not just in prose.
2. **`voice.md`** — a stored artifact per tenant. Schema in [Appendix B](#appendix-b). It defines tone, posture, first-person policy, and any signature **reframe device** (e.g. a "usual question / better question" turn).
3. **`themes.md`** — a stored artifact per tenant. For each theme it names: the signature **framework** (with its real elements and their real order), the signature **concepts**, the native **binaries**, and the associated historical **witnesses**. Schema in [Appendix B](#appendix-b).

These three are the *only* things that change from author to author. Treat them as tenant config, versioned and human-edited — not as free text pasted into a chat.

### Phase 2 — Revise the agent system prompt (the shared discipline)

The blocks the original guide repeats on every prompt — **Role, Source Discipline, Audience, Voice, Output** — are not per-article text. They are the agent's standing contract. Lift them into the content-agent system prompt (or a shared base layer, per Phase 3) so every generation inherits them. The revised system prompt must assert:

- **Role** — "You are an evergreen content writer for *this tenant's* site, writing in the voice defined in the tenant `voice.md`, drawing entirely from the tenant corpus loaded in this notebook. You produce one standardized article in a planned SEO/GEO cluster; it must match its siblings in structure, voice, and discipline."
- **Source discipline (non-negotiable)** — "Draw only from the corpus in this notebook. Every definition, claim, framework element, and historical example must be grounded in the source material — paraphrased and restructured for the web, never imported from outside knowledge and never invented. If the corpus does not support a claim, leave it out. No inline citation markers in the body; end with a single `Sources drawn from:` line naming the books relied on, so an editor can verify fidelity." This is the platform's "reflects, doesn't invent" rule made operational.
- **Audience** — "The author's intended readers, searching online. Assume intelligence and genuine hunger but no prior familiarity with the author's vocabulary; define any signature term in plain language on first use."
- **Voice** — "Hold the register in `voice.md` throughout; apply its signature devices consistently; use the reframe device once where the structure calls for it; no marketing filler; never break character."
- **GEO output rule** — "The direct answer (2–3 sentences after the H1) must be structured to win the featured snippet and to be quotable, standalone, by an answer engine."

Wire these as *inherited* — never re-authored per article — so a single edit to the discipline propagates to all fifty pieces.

### Phase 3 — Model the stored prompts as packs + layers

The real system already has `prompt-packs` and `prompt-pack-layers`. Use them exactly as intended:

```
Composed prompt  =  [Base discipline layer]      ← shared, from Phase 2, one row, all archetypes
                 +  [Archetype layer]            ← the TASK / SEO INTENT / STRUCTURE / DO-NOT for one archetype
                 +  [Variable fill-ins]          ← THEME, and where present CONCEPT | PAIR | MOVEMENT
```

- One **base layer** carries Role + Source Discipline + Audience + Voice + Output (Phase 2). It is stored once and referenced by every pack.
- Each **archetype pack** stores only its distinct blocks (TASK, SEO INTENT, STRUCTURE, LENGTH, DO NOT). This is why the original guide's "shared blocks repeat on every prompt by design" is *correct as a reading experience* but must be **de-duplicated in storage**: layers give you the identical composed prompt without maintaining the shared text in ten places.
- **Variables** are named slots resolved at run time from `themes.md` (`THEME`, `CONCEPT`, `PAIR`, `MOVEMENT`). They are not prose to edit; they are a pick-list bound to tenant config.

The complete, ready-to-store text of the base layer and all archetype layers is in [Appendix A](#appendix-a). Seed them as tenant-agnostic packs; they read the tenant from the bound corpus + `voice.md` + `themes.md`.

### Phase 4 — Seed the ten archetype packs (the article grid)

Fifty articles is not fifty decisions. It is **ten archetypes run across five themes** — a grid where, by design, no two articles compete for the same query. Each archetype is a distinct search intent, so articles within a theme's cluster reinforce each other instead of cannibalizing.

| # | Archetype | Target intent | Funnel stage | Variable slots | Runs per theme |
|---|-----------|---------------|--------------|----------------|----------------|
| 01 | The Definition | "what is {theme}" | Top — awareness | THEME | 1 |
| 02 | The Problem | a "why" / cause query | Top — problem-aware | THEME | 1 |
| 03 | The Framework Explainer | "{model} explained" | Middle — consideration | THEME | 1 |
| 04 | The Concept Spotlight | "what is {concept}" | Top / middle | THEME, CONCEPT | 1+ per term |
| 05 | The How-To | a "how to" query | Bottom — application | THEME | 1 |
| 06 | The Comparison | "{X} vs {Y}" | Middle — consideration | THEME, PAIR | 1+ per binary |
| 07 | The Misconceptions | "{theme} myths" | Middle — objection | THEME | 1 |
| 08 | The Case Study | named-movement / story | Middle — trust | THEME, MOVEMENT | 1+ per witness |
| 09 | The Biblical Foundation | "biblical basis for {theme}" | Middle — validation | THEME | 1 |
| 10 | The Diagnostic | a self-assessment query | Bottom — decision | THEME | 1 |

Run every archetype once per theme and the grid is complete; 04, 06, and 08 run more than once where a theme offers more than one term, binary, or witness — which is how a fifty-article target is comfortably met or passed. Seed all ten layers from [Appendix A](#appendix-a).

### Phase 5 — Seed the pillar / hub pack (run once per theme)

Each theme needs one **pillar** page — the hub the cluster links up to. The pillar ranks for the broad term and stays broad: it names the framework in a paragraph and links out to the Framework Explainer (03), carries an FAQ that seeds the Misconceptions article (07), and points to every spoke. **Non-cannibalization runs both ways:** a spoke must target a query the pillar does not, and the pillar must not sink to a spoke's depth. The generalized pillar template is in [Appendix A](#pillar-template).

### Phase 6 — Extend to evergreen courses (the "etc.")

A course is the same loop with a different artifact at the end. The corpus, `voice.md`, and `themes.md` don't change; the *shape* does. Map the grid you already have onto a learning sequence:

| Course component | Built from | Source archetype it reuses |
|------------------|-----------|----------------------------|
| Course promise & outcome | the theme's ache + answer | 01 Definition, 02 Problem |
| Module spine | the framework's real elements, in corpus order | 03 Framework Explainer |
| Lesson bodies | signature concepts | 04 Concept Spotlight |
| Practices / exercises | the theme's practices material | 05 How-To |
| Illustrations | historical witnesses | 08 Case Study |
| Objection handling | the theme's misconceptions | 07 Misconceptions |
| Grounding / "why trust this" | the authoritative source | 09 Biblical Foundation |
| Placement & self-assessment | the diagnostic | 10 Diagnostic |

Seed one **Course-Builder pack** (template in [Appendix A](#course-template)) that produces an evergreen course outline — modules, lessons, exercises, and an entry diagnostic — under the identical source discipline and human gate. The course is not new content; it is the cluster re-sequenced for formation. This is what makes courses *evergreen*: rebuilt from the corpus, they never go stale unless the corpus does.

### Phase 7 — The human editorial gate + fidelity check

AI-first, not AI-only. Every draft — article, pillar, or lesson — routes to a human before publish. The gate checks three things the machine cannot vouch for itself:

1. **Fidelity** — does every substantive claim trace to the corpus? The `Sources drawn from:` line makes this checkable in minutes; spot-check the hardest claims against the named books. Reuse `corpus-review-items` for the queue.
2. **Voice** — does it hold the `voice.md` register, and is the reframe device used once, not sprinkled?
3. **Non-cannibalization** — does it target a query no sibling and not the pillar already owns?

Only after the gate does a piece move to the publish gate (`movemental-publish-gate`) and grading (the EEAT rubric). The fidelity check is the step that protects the author's name; it is never skipped and never automated away.

### Phase 8 — Verification & rollout

1. **Dry run on the seed tenant.** Pick the tenant with the most complete `themes.md` and corpus. Generate the full grid for one theme (10 archetypes) + its pillar. Confirm: no two pieces share a target query; every piece carries a `Sources drawn from:` line; the direct answers are standalone-quotable.
2. **Score against the rubric.** Run the generated set through the [EEAT rubric](../../notes/eeat-research-content-qualification-rubric.md). Band A on evidence and publication-readiness is the bar; a piece that can't cite the corpus fails fidelity by construction.
3. **Second-tenant portability test.** Swap `voice.md` + `themes.md` + corpus binding for a second tenant and run archetype 01. If nothing but the three inputs changed and the output is right, the generalization holds.
4. **Roll the packs out** as platform defaults; each new Movement Voice inherits the full library on corpus onboarding.

**Acceptance criteria:** the five disciplines from §2 are all demonstrably enforced — templated packs, retrieval-grounded output, an inherited voice layer, a standardized skeleton, and a live human fidelity gate — and the whole thing runs for a second tenant by changing only the three inputs.

---

<a name="appendix-a"></a>
## Appendix A — The generalized prompt library (ready to store)

Store the **base layer** once; store each **archetype layer** as its own pack referencing the base. At run time the composed prompt = base layer + archetype layer + resolved variables, which reproduces the original guide's full copy-paste prompts exactly, without duplicating the shared text ten times.

### Base discipline layer (shared — stored once, inherited by every pack)

```
ROLE
You are an evergreen content writer for the tenant's site. You write in the voice of the author as
defined in voice.md, drawing entirely from the author's published works — the corpus — loaded in this
notebook. You are producing one standardized article in a planned SEO content cluster; it must match its
siblings in structure, voice, and discipline.

SOURCE DISCIPLINE — NON-NEGOTIABLE
Draw only from the author's corpus in this notebook. Every definition, substantive claim, framework
element, and historical example must be grounded in the source material — paraphrased and restructured
for the web, never imported from outside knowledge and never invented. If the corpus does not support a
claim, leave it out rather than reaching for it.
Do not use inline citation markers in the article body. At the very end, add a single line — "Sources
drawn from:" — naming which of the author's books the piece relied on, so an editor can verify fidelity.

AUDIENCE
The author's intended readers, searching online to understand or apply this idea. Assume intelligence
and genuine hunger, but no prior familiarity with the author's vocabulary. Any signature term you use
must be defined in plain language on first use.

VOICE — WRITE AS THE AUTHOR
Hold the register defined in voice.md throughout. voice.md specifies the author's tone, posture, and
signature rhetorical devices — apply them consistently. Where voice.md defines a signature "reframe"
device (for example, a "the usual question / the better question" turn), use it once, where the structure
calls for it. First person is welcome where the corpus uses it. No generic marketing filler; never break
character.

THE VARIABLE
Run each archetype once per theme unless its slots say otherwise. Set THEME (and any CONCEPT / PAIR /
MOVEMENT slot) from themes.md and rerun — everything else stays identical.
THEME = [a theme from themes.md]   valid options: the themes listed in themes.md

INTERNAL LINKING
Where the article would naturally point to a deeper piece, insert a placeholder in this exact format:
[LINK: brief description of the target article]. At minimum, link up to the {THEME} pillar page, and
laterally to two or three sibling articles in the same cluster. Do not invent URLs.

LENGTH
1,200–1,800 words for the article body.

OUTPUT
Return the target-query line first (where the archetype has one), then the finished article in clean
publishable form following the archetype's structure, then the meta description, then the "Sources drawn
from:" line. Output the article only — do not explain your process or break character.
```

### The universal article skeleton

Every finished article shares the same bones: an SEO title (<60 chars) and H1; a sharp **2–3 sentence direct answer** immediately after the H1, written to win the featured snippet and be quotable by answer engines; the archetype's specific body; a **Key Takeaways** block (3–5 one-sentence bullets); standardized internal links (up to the pillar, laterally to siblings); and a 150–160 character meta description. **Non-cannibalization rule:** before publishing, confirm the piece targets a query the pillar does not. If it would compete with the pillar, narrow it.

---

Below, each archetype layer gives only its distinct blocks. Compose with the base layer above.

### Archetype 01 — The Definition  ·  "What is {theme}?"

The highest-volume, top-of-funnel piece; the one most readers meet first. Its job is to be the definitive web answer for a first-timer: what the theme is, where it comes from, what it's mistaken for. It must stand alone, and it names the framework only at a high level (the element-by-element walk is Archetype 03). Run once per theme.

```
TASK
Write "The Definition" article for the {THEME} theme: the cornerstone explainer answering
"What is {THEME}?" for a reader meeting the idea for the first time. Expand the concept fully — what it
is, where it comes from, what it is commonly mistaken for — but name the framework only at a high level.

SEO INTENT
Target "what is {THEME}". The opening answer must win the featured snippet and be quotable by answer engines.

STRUCTURE — FOLLOW EXACTLY
1. SEO title (<60 chars, includes the theme name).  2. H1.
3. The Direct Answer — 2–3 sentences that plainly answer the question and stand alone as a snippet.
4. Why this matters — ~150 words naming the ache this theme addresses (brief; do not exhaust it).
5. The full definition — the heart: what it is, its origin, what it is mistaken for; name core components at a high level only.
6. The reframe — deliver the author's signature reframe device (per voice.md) here.
7. What this means for you — bring it to the reader's context and first posture.
8. Key Takeaways (3–5 bullets).  9. Meta description (150–160 chars).

DO NOT
- Do not duplicate the pillar page — go deeper on the definition specifically.
- Do not walk the full framework element by element (that is Archetype 03).
- Do not invent statistics, quotes, or history; do not break character.
```

### Archetype 02 — The Problem  ·  "Why {the pain}?"

Catches the problem-aware reader at the moment the obvious fixes have failed. Its only job is to name the ache honestly and expose the root cause beneath it — *not* to solve it. The solution lives in the other articles; this piece diagnoses and hands the reader onward, oriented and hopeful. Discipline: resist the urge to fix; diagnose without turning cynical or alarmist. Run once per theme.

```
TASK
Write "The Problem" article for the {THEME} theme: name the ache or failure this theme exists to address,
then expose the deeper root cause beneath it. The reader senses something is wrong but has not yet found
the framework that explains it. Diagnose; do not solve.

SEO INTENT
Target the "why" query a reader types hunting for the cause of this theme's core problem (e.g. "why
churches stop growing," "why change efforts fail"). Choose the phrasing that best fits {THEME} and state
it on its own line at the top.

STRUCTURE — FOLLOW EXACTLY
1. Target query line.  2. SEO title (<60 chars, framed around the problem).  3. H1.
4. The Direct Answer — 2–3 sentences naming the root cause; standalone snippet.
5. The symptom — what the reader is actually experiencing, in terms they recognize (~150–200 words).
6. The misdiagnosis — what people usually blame (more resources, better programs, harder effort) and why it falls short.
7. The real problem — the heart: the deeper root cause as a problem of design or imagination, not of effort or volume.
8. The reframe — the author's signature reframe device (per voice.md).
9. Where this goes from here — point toward the theme as the answer without solving it; leave the reader oriented and hopeful.
10. Key Takeaways (3–5 bullets).  11. Meta description (150–160 chars).

INTERNAL LINKING (in addition to base) — at minimum link to this theme's Definition article as the answer to the problem named here.

DO NOT
- Do not solve the problem or walk the framework; this article diagnoses.
- Do not be cynical, alarmist, or despairing — diagnose honestly, end in hope.
- Do not invent data or history; do not break character.
```

### Archetype 03 — The Framework Explainer  ·  "{The named model} explained"

The standalone deep treatment of the theme's signature framework. Where the pillar names the model in a paragraph and the Definition names it high-level, this gives every element room and then shows how the parts form a system — including, where the corpus says so, that the whole is emergent and fails if any part is missing. **The one hard rule is fidelity to the model's real shape:** retrieve the actual framework, its actual elements, and their actual order; never renumber or tidy for a cleaner article. Run once per theme.

```
BEFORE WRITING
Retrieve the correct framework for {THEME} and use its real structure and element count. themes.md names
each theme's framework; retrieve its real elements and order from the corpus. Do not invent or renumber.
FRAMEWORK (retrieve, do not guess) = the signature framework for {THEME}.

TASK
Write "The Framework Explainer" for {THEME}: the definitive walk-through of its signature framework.
Introduce the model as an integrated system, take each element in turn, then show how the parts
interrelate — including, where the corpus says so, that the whole is emergent and fails if any part is missing.

SEO INTENT
Target the query for the named model itself (e.g. "the six elements of {model}," "the {model} framework
explained"). State the chosen query on its own line at the top.

STRUCTURE — FOLLOW EXACTLY
1. Target query line, then SEO title (<60 chars), then H1.
2. The Direct Answer — 2–3 sentences naming the framework and its parts; snippet.
3. Why the framework exists — the problem it answers.
4. The framework, element by element — one clearly headed subsection per element, in corpus order, each defined and made concrete.
5. How the parts work together — the systemic / emergent relationship; what happens when one element is missing.
6. Where to begin — a brief, honest word on the first element or entry point.
7. Key Takeaways — one bullet per element plus one on the whole.  8. Meta description (150–160 chars).

DO NOT
- Do not change the number of elements or their order to fit a tidier article.
- Do not collapse the framework into the Definition article's scope; this is the deep treatment.
- Do not invent data or history; do not break character.
```

### Archetype 04 — The Concept Spotlight  ·  "What is {concept}?"

Every theme carries a handful of signature terms with their own search demand. This gives one such term a dedicated home so it isn't buried inside a framework article. Keep the lens tight on the single concept; do not re-explain the whole theme. Takes a **CONCEPT** slot; run once for each term worth its own page.

```
VARIABLE (in addition to THEME)
CONCEPT = [one signature term of {THEME}, from themes.md]. Run again for each term with its own search demand.

TASK
Write "The Concept Spotlight" on {CONCEPT}, a signature term of {THEME}. Define it precisely, trace where
the term comes from, explain why it matters, name the most common misunderstanding, and show how it
appears in real practice.

SEO INTENT
Target "what is {CONCEPT}" (or its most natural phrasing). State the chosen query on its own line at the top.

STRUCTURE — FOLLOW EXACTLY
1. Target query line, then SEO title (<60 chars), then H1.
2. The Direct Answer — a 2–3 sentence definition that works as a snippet.
3. Where the term comes from — its origin, and who the author draws it from where the corpus says so.
4. Why it matters — what this concept makes possible, or what its absence costs.
5. The common misunderstanding — how the term is misused or domesticated, and the correction.
6. What it looks like in practice — concrete expression in a real setting.
7. Key Takeaways (3–5 bullets).  8. Meta description (150–160 chars).

DO NOT
- Do not re-explain the whole theme; keep the lens tight on the single concept.
- Do not invent an etymology or attribution the corpus does not support.
- Do not break character or pad with filler.
```

### Archetype 05 — The How-To  ·  "How to {practice the theme}"

The closest article to action. It converts the theme's practices into a clear, doable sequence for a reader ready to begin, and routes toward a next step. Its steps must come from the theme's own practices material in the corpus — never invented — and it must be honest about what the work costs, including time. It refuses the marketing temptation to promise speed and ease the corpus does not promise, and ends with a single smallest action for this week. Run once per theme.

```
TASK
Write "The How-To" article for {THEME}: a practical guide for a reader ready to begin. Draw the steps from
the theme's own practices material in the corpus. Be concrete and honest about what the work requires,
including time.

SEO INTENT
Target a "how to" query fitting the theme (e.g. "how to make disciples," "how to start a missional
community"). State the chosen query on its own line at the top.

STRUCTURE — FOLLOW EXACTLY
1. Target query line, then SEO title (<60 chars), then H1.
2. The Direct Answer — 2–3 sentences summarizing the path; snippet.
3. What you are actually aiming at — name the goal so the steps have a destination.
4. Before you begin — the readiness or first conditions the corpus names.
5. The steps — a numbered sequence drawn from the theme's practices, each concrete and doable by an ordinary reader.
6. Your first step — the single smallest action to take this week.
7. What to expect — realistic timeline and common failure points.
8. Key Takeaways (3–5 bullets).  9. Meta description (150–160 chars).

DO NOT
- Do not promise speed or ease the corpus does not promise; name the real cost and timeline.
- Do not invent steps; draw them from the author's practices material.
- Do not break character or pad with filler.
```

### Archetype 06 — The Comparison  ·  "{X} vs. {Y}"

Most corpora run on binaries — organism vs. machine, addition vs. multiplication. Comparison queries carry real volume and come almost free because the contrast is already in the source. Set two terms side by side as the binary is understood within the theme, define each cleanly, show what's at stake, and guide the reader directionally, not polemically. **Discipline: fairness** — state the weaker side as its own advocates would; don't turn a directional difference into a moral hierarchy the corpus doesn't claim. Takes a **PAIR** slot; can run more than once per theme.

```
VARIABLE (in addition to THEME)
PAIR = [a binary native to {THEME}, from themes.md].

TASK
Write "The Comparison" setting {PAIR} side by side, as that binary is understood within {THEME}. Define
each term cleanly, show what is genuinely at stake in the difference, and guide the reader — directionally,
not polemically.

SEO INTENT
Target "{X} vs {Y}" in its most natural search phrasing. State the chosen query on its own line at the top.

STRUCTURE — FOLLOW EXACTLY
1. Target query line, then SEO title (<60 chars), then H1.
2. The Direct Answer — 2–3 sentences naming the core difference; snippet.
3. Why this comparison matters — what hangs on getting it right.
4. Each side, defined — one clear subsection per term, fairly stated.
5. A side-by-side comparison — a clean comparison table of the key contrasts (formation, growth pattern, leadership, reproducibility, and so on).
6. Where each is right and where each falls short — honest, not a caricature.
7. The better path — the direction the corpus actually commends, and why.
8. Key Takeaways (3–5 bullets).  9. Meta description (150–160 chars).

DO NOT
- Do not caricature the weaker side; state it as its own advocates would.
- Do not present the comparison as a moral hierarchy where the corpus calls it directional.
- Do not invent data; do not break character.
```

### Archetype 07 — The Misconceptions  ·  "Common myths about {theme}"

Targets objection and "is this only for…" queries. The theme's pillar FAQ is its natural seed; this article takes each objection and gives it a full, fair answer — naming the five to seven most common misunderstandings, stating each the way a reasonable reader actually holds it, correcting it, and naming the truth underneath. **Two failure modes to avoid: straw-manning the objections, and condescending to those who hold them.** Run once per theme.

```
TASK
Write "The Misconceptions" article for {THEME}: name the five to seven most common misunderstandings of
this idea, and answer each fairly and clearly. The goal is to clear the ground so the real idea can be
received. Seed the misconceptions from the theme's pillar FAQ, then expand each into a full treatment.

SEO INTENT
Target objection-shaped queries — "{THEME} myths," "misconceptions about {THEME}," "is {THEME} only
for…". State the chosen primary query on its own line at the top.

STRUCTURE — FOLLOW EXACTLY
1. Target query line, then SEO title (<60 chars), then H1.
2. The Direct Answer — 2–3 sentences naming the single biggest misconception and its correction; snippet.
3. A short intro — why this idea attracts misunderstanding.
4. The misconceptions — five to seven, each its own subsection: state the myth plainly, correct it, name the truth underneath.
5. What the idea actually is — a brief, clean restatement once the ground is cleared.
6. Key Takeaways (3–5 bullets).  7. Meta description (150–160 chars).

DO NOT
- Do not straw-man the misconceptions; state each as a reasonable reader would hold it.
- Do not be condescending toward people who hold these views.
- Do not invent data or history; do not break character.
```

### Archetype 08 — The Case Study  ·  one historical movement, told as proof

The story-driven, shareable, credibility-building piece. It takes one historical witness the corpus ties to the theme and shows the theme's framework operating in real history — the setting, what happened, why it worked when mapped onto the framework, and what it means for a reader today. Tell the story with genuine narrative momentum while staying strictly grounded: no invented dates, figures, or events, and no romanticizing of hardship. Takes a **MOVEMENT** slot; can run more than once where the corpus offers more than one witness.

```
VARIABLE (in addition to THEME)
MOVEMENT = [one historical witness the corpus treats with {THEME}, from themes.md].

TASK
Write "The Case Study" on {MOVEMENT} as a historical witness to {THEME}. Tell the story well, then show
how the theme's framework was operating within it — and what that means for a reader today.

SEO INTENT
Target the searcher looking for this movement as a model (e.g. "the {movement} model," "how the
{movement} grew"). State the chosen query on its own line at the top.

STRUCTURE — FOLLOW EXACTLY
1. Target query line, then SEO title (<60 chars), then H1.
2. The Direct Answer — 2–3 sentences naming the movement and why it matters; snippet.
3. The setting — the conditions the movement arose in.
4. What happened — the story told with narrative momentum, grounded in the corpus.
5. Why it worked — map the story onto the theme's framework, showing the elements in operation.
6. What it means for you — the transferable principle for the reader's context, without flattening the history.
7. Key Takeaways (3–5 bullets).  8. Meta description (150–160 chars).

DO NOT
- Do not invent dates, figures, or events not present in the corpus.
- Do not romanticize persecution or hardship; let the history carry its own weight.
- Do not break character or pad with filler.
```

### Archetype 09 — The Biblical Foundation  ·  "The biblical basis for {theme}"

Some readers search in source-anchored terms and want to know the idea is grounded in the tradition, not merely strategic. (In the original instantiation the source was Scripture; for another author, substitute whatever authoritative text or tradition the corpus grounds the theme in.) Set out the key passages the corpus uses, explain what each establishes, draw them into one throughline, and answer the reader who asks whether this is genuinely grounded or just a strategy. **Disciplines: don't proof-text or stretch a passage past what the corpus claims; don't reproduce long blocks of the source text — cite the reference and summarize.** Run once per theme.

```
TASK
Write "The Biblical Foundation" article for {THEME}: set out the key passages the corpus uses to ground
this idea, explain what each establishes, and answer the reader who asks whether this is genuinely
grounded in the tradition or merely a strategy. Where the author's grounding text is not Scripture,
substitute the corpus's actual authoritative source.

SEO INTENT
Target "biblical basis for {THEME}" / "is {THEME} biblical" and related source-anchored queries. State
the chosen query on its own line at the top.

STRUCTURE — FOLLOW EXACTLY
1. Target query line, then SEO title (<60 chars), then H1.
2. The Direct Answer — 2–3 sentences naming the grounding; snippet.
3. A short intro — why the grounding question matters here.
4. The key passages — one subsection per passage: the reference, and what it establishes for this theme. Use the passages the corpus actually uses.
5. The throughline — how the passages together form one coherent case.
6. Is this grounded, or just strategy? — answer the objection directly and honestly.
7. Key Takeaways (3–5 bullets).  8. Meta description (150–160 chars).

DO NOT
- Do not proof-text or stretch a passage past what the corpus claims for it.
- Do not reproduce long blocks of the source text; cite the reference and summarize.
- Do not invent data or history; do not break character.
```

### Archetype 10 — The Diagnostic  ·  a self-assessment query

The bottom-of-funnel, decision-stage piece. A reader who suspects the theme applies to them wants to *check*. This gives them an honest self-assessment: a set of markers or questions — drawn from the corpus's own description of what the theme's presence or absence looks like — that lets a reader locate themselves, read the result without flattery, and take the right next step. **The signals must come from the corpus (the framework's real elements and markers), never invented, and the result must be honest — it may tell the reader they are further from the goal than they hoped.** Run once per theme.

```
TASK
Write "The Diagnostic" article for {THEME}: a self-assessment that lets a reader honestly locate
themselves against this idea. Build the questions or markers from the corpus's own account of what the
theme's presence and absence look like (typically the framework's elements). Help the reader read their
result truthfully and take the right next step. Assess and orient; do not sell.

SEO INTENT
Target a self-assessment query fitting the theme (e.g. "is my church {THEME}," "{THEME} assessment,"
"signs of {THEME}"). State the chosen query on its own line at the top.

STRUCTURE — FOLLOW EXACTLY
1. Target query line, then SEO title (<60 chars), then H1.
2. The Direct Answer — 2–3 sentences telling the reader what this assessment measures and how to read it; snippet.
3. Why self-assess — what an honest read makes possible; name the temptation to grade oneself generously.
4. The diagnostic — a clear set of questions or markers, grouped by the framework's elements, each phrased so a reader can answer honestly about their own context.
5. How to read your result — what a low, mixed, or strong result actually means, stated without flattery or alarm.
6. Your next step — route each result to the right next piece or practice (a spoke or the How-To), one concrete action.
7. Key Takeaways (3–5 bullets).  8. Meta description (150–160 chars).

DO NOT
- Do not invent diagnostic signals; draw them from the corpus's account of the theme.
- Do not flatter the reader into a false positive, and do not shame a low result — assess honestly, route hopefully.
- Do not break character or pad with filler.
```

<a name="pillar-template"></a>
### The Pillar template (the hub — run once per theme)

The pillar ranks for the broad term and stays broad. It is the page every spoke links up to.

```
TASK
Write the pillar page for {THEME}: the comprehensive hub that ranks for the broad term and links out to
the whole cluster. Cover the theme end to end at survey depth — what it is, why it matters, its framework
(named in a paragraph, not walked element by element), its key concepts, its practice, and its grounding —
then hand each of those out to the deeper spoke that treats it. Include an FAQ that seeds the
Misconceptions article. Stay broad: the pillar must not sink to any spoke's depth.

SEO INTENT
Target the broad head term "{THEME}". The direct answer must be the single most quotable definition of
the theme on the page.

STRUCTURE — FOLLOW EXACTLY
1. SEO title (<60 chars), then H1.
2. The Direct Answer — the definitive 2–3 sentence definition of {THEME}; snippet.
3. Why {THEME} matters — the ache and the promise, briefly. [LINK: the Problem article]
4. What {THEME} is — survey definition. [LINK: the Definition article]
5. The framework, in a paragraph — name it and its elements at a glance. [LINK: the Framework Explainer]
6. Key concepts — a short list, each one line. [LINK: each Concept Spotlight]
7. {THEME} in practice — a paragraph. [LINK: the How-To]
8. A witness — one paragraph. [LINK: a Case Study]
9. Is it grounded? — a paragraph. [LINK: the Biblical Foundation]
10. Where do you stand? — a paragraph. [LINK: the Diagnostic]
11. FAQ — 5–8 Q&As (these seed the Misconceptions article).
12. Key Takeaways (3–5 bullets).  13. Meta description (150–160 chars).

LENGTH
2,000–3,000 words. Broad, not deep — every subsection hands off to a spoke.

DO NOT
- Do not walk the framework element by element (that is Archetype 03).
- Do not out-depth a spoke; the pillar orients, the spokes deliver.
- Do not invent; do not break character.
```

<a name="course-template"></a>
### The Course-Builder template (evergreen course — run once per theme)

```
TASK
Build an evergreen course for {THEME} from the corpus: a sequenced formation path a reader can work
through. Do not write new content — re-sequence the theme's own material into modules and lessons.
Map the framework's elements (in corpus order) to modules; the signature concepts to lessons; the
practices material to exercises; a historical witness to an illustration; the misconceptions to an
objection-handling lesson; the grounding source to a "why trust this" lesson; and the diagnostic to an
entry self-assessment. Every lesson holds the same source discipline and voice as the articles.

OUTPUT
1. Course promise — one paragraph: the outcome a finisher can expect, drawn from the theme's ache + answer.
2. Entry diagnostic — the self-assessment that places a learner (from Archetype 10).
3. Module spine — one module per framework element, in corpus order, each with a one-line aim.
4. Lessons — under each module, 2–4 lessons: title, the concept or practice it teaches, the corpus
   material it draws on, and one exercise the learner does.
5. A running "Sources drawn from:" list per module, so an editor can verify fidelity.

DO NOT
- Do not renumber or reorder the framework to make a tidier course.
- Do not invent lessons, exercises, or outcomes the corpus does not support.
- Do not break voice; a course is the cluster re-sequenced for formation, in the author's register.
```

---

<a name="appendix-b"></a>
## Appendix B — The tenant inputs (schemas)

Only these three change from author to author. Store them as versioned, human-edited tenant config.

### `voice.md`

```md
# Voice — <Author Name>
tone:        <e.g. warm, provocative, pastoral-but-urgent>
posture:     <how the author stands toward the reader — peer, mentor, fellow-struggler>
first_person: <when the author uses "I" / "we"; when they don't>
reframe_device:
  name: <e.g. "the usual question / the better question">
  how:  <how it works, with one example from the corpus>
signature_devices:
  - <recurring rhetorical move #1>
  - <recurring rhetorical move #2>
never:
  - <registers/moves the author never uses — marketing filler, hype, jargon, etc.>
```

### `themes.md`

```md
# Themes — <Author Name>
themes:
  - name: <Theme 1>
    framework:
      name: <the signature model>
      elements: [<element 1>, <element 2>, …]   # real order; never renumber
      emergent: <true|false — does the whole fail if one part is missing?>
    concepts:  [<signature term>, …]             # each a candidate Concept Spotlight
    binaries:  [<X vs Y>, …]                      # each a candidate Comparison
    witnesses: [<historical movement/figure>, …] # each a candidate Case Study
    grounding_source: <Scripture | other authoritative tradition the corpus uses>
  - name: <Theme 2>
    …
```

### Corpus

The author's actual books, bound to the tenant notebook and scoped so a generation run retrieves from *only* that author's works. The corpus is the source of truth for every claim; `voice.md` and `themes.md` only tell the Engine *how* to write and *what* to write about — never *what is true*. That always comes from the books.
