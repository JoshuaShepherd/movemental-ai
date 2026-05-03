# Research Prompt 14: Church Planting Movements and Multiplication — Do the Growth Claims Hold?

## Context

Several arguments in the index cite specific growth statistics from historical and contemporary movements as evidence that movement infrastructure works. These numbers are load-bearing for the credibility of the movement thesis.

Key claims:

- "Chinese underground church: 2 million → 120 million in 70 years under persecution" — cited in knowledge base case studies
- "Movement leaders solve for multiplication and reproduction, not institutional sustainability" (`articles-036`)
- Movement DNA (mDNA): six essential elements that characterize all genuine apostolic movements
- "Church function, not form: leaders care about whether the church moves as movement" (`book-010`)
- Rick Warren's Purpose Driven: "30+ million books sold, 85+ languages" (`research-047`)
- 150,000+ APEST assessments demonstrate "widespread adoption" (`C-PR02`)
- The TAM: "50,000 engaged leaders, millions more searching" (`research-050`)

**Argument IDs to trace in the index:** tie findings back to `articles-036`, `book-010`, `research-047`, `C-PR02`, `research-050`, and any knowledge-base case-study nodes that repeat the China growth narrative.

## Relationship to other prompts

- **Prompt 04 (movement infrastructure)** already asks missiology to contextualize Garrison/Addison and technology in multiplication. **Prompt 14** goes deeper on **quantitative claims, sourcing, and contested statistics** — not whether movements need infrastructure, but whether cited numbers and adoption metrics withstand scrutiny.
- **Prompt 17 (assessment science)** covers APEST psychometrics and the assessment-to-content pipeline in product terms. **Prompt 14** treats **150K+ as a marketing/credibility statistic**: sourcing, comparators, and whether "widespread" is justified. Cross-link findings; avoid duplicating full psychometric deep-dives (defer detail to 17).

## Research Questions

### Chinese church growth statistics

1. Where does the "2 million to 120 million" figure originate? What are the scholarly sources? (David Aikman, Tony Lambert, Fenggang Yang, World Christian Database)
2. What do demographers and China scholars say about the actual numbers? Are they contested? What's the range of estimates?
3. What methodological challenges exist in counting Christians in China? How do these challenges affect the narrative's reliability?
4. Is the "under persecution" framing accurate for the full 70-year period, or does it collapse important distinctions (Mao era vs. Deng reforms vs. Xi era)?
5. How does the **World Christian Database** / Operation World / Joshua Project produce China estimates? What are documented critiques of WCD methodology (definitions of "Christian," projection models, input data from national churches)?
6. What do **Pew Research Center** and other survey-based estimates imply for the order of magnitude? Where do practitioner narratives and survey-based ranges diverge, and why?

### Movement multiplication research

1. What does the academic study of church planting movements actually show? (David Garrison's "Church Planting Movements," Steve Addison's "Movements That Change the World")
2. Are there peer-reviewed studies on movement multiplication, or is most of the literature practitioner-written and self-reported?
3. What are the failure rates? For every movement that multiplied, how many efforts stalled or failed? Is there survivorship bias in the literature?
4. What does missiological scholarship say about the validity of movement methodology? (Critics like Jackson Wu, Mark Noll, or Lesslie Newbigin's legacy)
5. **Insider movements, "exponential" baptism statistics, and ethnographic pushback:** What does anthropology and religious studies literature say about counting converts and house networks in high-growth narratives?

### APEST and assessment validity

1. What is the psychometric validity of the APEST assessment? Has it been tested for reliability, construct validity, or predictive validity? Are there published studies?
2. How does 150,000 assessments compare to other leadership assessments? (StrengthsFinder: 20M+; MBTI: hundreds of millions; DISC: similar scale) Is 150K "widespread"?
3. What do assessment science and industrial-organizational psychology say about the validity requirements for personality/gifting assessments?
4. **Who counts as an "assessment"?** If the figure aggregates multiple instruments, completions, or denominational deployments, document the definition — opacity here undermines the claim.

### TAM and market sizing

1. Where does the "50,000 engaged leaders" figure come from? What methodology was used? Is this a top-down estimate or bottom-up count?
2. How does this TAM compare to the addressable market for comparable platforms (Teachable's creator count, Kajabi's user base, Mighty Networks' community count)?
3. What does "millions more searching for frameworks they don't yet know exist" mean concretely? Can this be validated with search volume data?
4. **Honest uncertainty:** If the TAM cannot be sourced, state that explicitly and recommend how Movemental should revise or qualify the claim.

### Auxiliary statistic: Purpose Driven scale (`research-047`)

1. Are "30+ million books sold" and "85+ languages" still accurate in 2026? What is the publisher or rights-holder source? How do these figures compare to other blockbuster Christian titles (e.g., ordering of magnitude for comparison only)?

## Skills to use

- `/academic-research` — missiology, church planting movements, religious demography, psychometrics
- `/author-research` — David Garrison, Steve Addison, Fenggang Yang, Tony Lambert, David Aikman
- `/poll-opinion-research` — Pew Research Center religion data, World Christian Database, assessment industry benchmarks
- `/article-corpus` — what Alan Hirsch and Movemental corpus sources assert about mDNA, multiplication, and China; flag where internal copy overstates what external sources support

## Output expectations

### Raw research file → `docs/build/research/raw/14-church-planting-movements-raw.md`

Include:

- **China estimates table:** low / mid / high figures with definition of "Christian" (registered TSPM, unregistered, all Protestants, etc.), year, and full citation
- **Lineage of the 2M → 120M claim:** earliest appearance in print or web; telephone-game risk across secondary sources
- **Movement multiplication literature matrix:** columns for author, type (peer-reviewed / gray / practitioner), data source (self-report vs. independent), and a one-line critique
- **APEST / 150K:** what is documented vs. asserted; psychometric citations or explicit "none found"; comparator table vs. other assessments
- **TAM:** provenance of 50K and "millions searching"; if unknown, a short "cannot verify" section with suggested replacement language
- **Confidence ratings** for each major statistic: Verified / Partially Supported / Unverified / Contradicted (with rationale)
- **Counter-arguments** section: strongest scholarly or journalistic objections to each headline number

### Exploratory article → `docs/build/research/articles/14-church-planting-movements.md`

**Target length:** 2,000–3,000 words.

**Purpose:** An honest assessment of the movement data: what is well-documented, what is estimated, what is aspirational, and how Movemental should handle contested statistics in sales copy, the book, and investor-facing materials.

**Suggested outline:**

1. **Why the numbers matter** — credibility debt when load-bearing stats fail
2. **China: ranges, methods, and narrative risk** — persecution framing across eras; what responsible language looks like
3. **Church planting movements literature** — peer-reviewed vs. practitioner; survivorship bias; one paragraph on relation to infrastructure thesis (pointer to Prompt 04)
4. **APEST scale and "widespread"** — 150K in context; defer pipeline psychometrics to Prompt 17 where appropriate
5. **TAM and "millions searching"** — evidence or qualification
6. **Purpose Driven** (brief) — fact-check the auxiliary stat if it remains in materials
7. **Recommendations** — editorial policy for statistics, footnotes, and "confidence lane" language for leadership audiences

**Tone:** Intellectual honesty over advocacy (see `docs/build/research/prompts/README.md` ground rules). If a claim does not hold, say so clearly and propose softer accurate alternatives.

## Execution notes for the research agent

1. Read **`docs/build/research/raw/00-existing-corpus-audit.md`** (if present) before duplicating work already captured in the four-repo audit.
2. **Full citations** for every statistic: author, title, publisher or journal, date, URL or DOI where applicable.
3. Prefer **primary or peer-reviewed** sources for demographic claims; label practitioner or missionary sources appropriately.
4. When Prompt **17** already covers APEST validity in depth, **summarize** in 14 and link rather than repeating entire sections.
5. Save outputs only to the paths specified above unless the user directs otherwise.
