# Raw research: Movement infrastructure through history (Prompt 04)

**Date:** 2026-04-12  
**Prompt:** [docs/build/research/prompts/04-movement-infrastructure-historical.md](../prompts/04-movement-infrastructure-historical.md)  
**Skills applied:** Academic research (OpenAlex, Semantic Scholar where available), author-style secondary synthesis (web pointers), article-corpus (local Alan Hirsch markdown in sibling `alan-books` repo).

---

## Source index (retrieval log)

| Source | Query / identifier | Status | Notes |
|--------|-------------------|--------|-------|
| Semantic Scholar Graph API | `paper/search?query=Charles Tilly social movements infrastructure networks` | **Partial** | First request returned JSON with 8 papers (e.g. Castañeda 2023 on Tilly; Tilly & Wood 2015 *Social movements, 1768-2012*, citationCount 177). |
| Semantic Scholar Graph API | Subsequent queries same session | **429** | `Too Many Requests` — no API key; deferred additional SS calls. |
| OpenAlex Works API | `works?search=Infrastructure studies meet platform studies` + `mailto=research@example.com` | **OK** | Surfaced Plantin et al. 2016 (see below). |
| OpenAlex | `works?search=Sidney Tarrow contentious politics network` | **OK** (truncated in shell) | Included McAdam, Tarrow, Tilly mapping piece (Politix 1998). |
| OpenAlex | `works/https://doi.org/10.1177/1461444816661553` | **OK** | Confirmed title, year, cited_by_count, author list; abstract field null in API. |
| OpenAlex | `works?search=Andrew Pettegree book Reformation` | **OK** | Surfaced *Reformation and the Culture of Persuasion* (2005) and related works. |
| OpenAlex | `works?search=Rodney Stark rise Christianity networks` | **OK** | Mixed results; includes Stark-related sociology of religion items. |
| OpenAlex | `works?search=First Urban Christians Meeks` | **OK** | Index entries (reviews) — use monograph citation separately from DOI noise. |
| Web search | Pettegree print / oral / Eisenstein framing | **OK** | Secondary summaries; Cambridge Core article on print and Reformation cited as pointer. |
| Local corpus | Grep `infrastructure`, `network`, `house church` in `alan-books/corpus/alan_hirsch/the-forgotten-ways`, `the-permanent-revolution` | **OK** | Paths under `/Users/joshuashepherd/Desktop/dev/repos/alan-books/`. |

---

## Annotated bibliography (movement infrastructure scholarship)

### Social movements, contentious politics, networks

1. **Charles Tilly** — *Social Movements, 1768–2012* (with Lesley J. Wood, 2015). OpenAlex lists high citation footprint for the co-authored survey volume (Semantic Scholar: `citationCount` 177 on work id `d46c2c5e4a1335c64fd2214f4e861c88c83895cb`). Tilly’s corpus frames repertoires of contention, trust networks, and democratization; “infrastructure” is not always his vocabulary, but **relational organization, campaigns, and WUNC displays** function as the enabling foundation of mobilization.

2. **Sidney Tarrow** — *Power in Movement* (1994; later editions) and collaborative “contentious politics” framing with McAdam and Tilly. OpenAlex retrieved the 1998 Politix piece co-authored **McAdam, Tarrow, Tilly** — “Pour une cartographie de la politique contestataire” / “To Map Contentious Politics” (`doi:10.3406/polix.1998.1713`, cited_by_count 29 in OpenAlex). Use for **political opportunity, diffusion, and coalition** mechanisms rather than tech metaphors.

3. **Doug McAdam** — *Political Process and the Development of Black Insurgency, 1930–1970* (1982). Standard reference for **micromobilization contexts** that Morris builds on; keep alongside Morris for civil rights infrastructure claims.

### Network society and digital movements

4. **Manuel Castells** — *The Rise of the Network Society* (1996; 2nd ed. 2010) and later *Communication Power* (2009). OpenAlex shows **Communication Power** with very high `cited_by_count` (1961) — treat as hub work for **networked power, switchers, and programming** of networks. Helpful analogy guardrail: Castells distinguishes **network logic** from simple “tool adoption.”

5. **Jean-Christophe Plantin, Carl Lagoze, Paul N. Edwards, Christian Sandvig** — “Infrastructure studies meet platform studies in the age of Google and Facebook,” *New Media & Society* (2016), `https://doi.org/10.1177/1461444816661553`. OpenAlex: **cited_by_count 1419** (as of 2026-04-12 query). Foundational for the **infrastructure / platform** vocabulary question in Movemental positioning — argues for bridging STS “infrastructure” and communication “platform” studies.

### Civil rights movement infrastructure

6. **Aldon D. Morris** — *The Origins of the Civil Rights Movement: Black Communities Organizing for Change* (Free Press, 1984). Classic statement of **movement centers** (Black churches, colleges, NAACP chapters) as **indigenous organizational strength** — not “charismatic episode only.” Cite for **micromobilization + preexisting organizations**.

7. **Charles Payne** — *I've Got the Light of Freedom: The Organizing Tradition and the Mississippi Freedom Struggle* (1995). Use for **Ella Baker / SNCC** lineage: decentralized leadership development as **organizing infrastructure** distinct from national-media-centric narratives.

### Early Christianity (historical and sociological)

8. **Wayne A. Meeks** — *The First Urban Christians: The Social World of the Apostle Paul* (Yale University Press, 1983). Social-historical reading of Pauline letters and urban **household** assemblies; supports **networked, socially embedded** early churches without overclaiming “Roman roads caused Christianity.”

9. **Larry W. Hurtado** — *Lord Jesus Christ: Devotion to Jesus in Earliest Christianity* (Eerdmans, 2003) and shorter works on **early Christian distinctiveness and worship practice**. Use to balance **sociological network** accounts with **theological/liturgical drivers** of spread.

10. **Rodney Stark** — *The Rise of Christianity: A Sociologist Reconsiders History* (Princeton/HarperSanFrancisco, 1996). Offers **network growth models**, epidemic analogies, and social-capital arguments. OpenAlex surfaces **critical responses** (e.g. gender-theory engagement with Stark in early Christianity journals) — analogy discipline: Stark is **stimulating and contested**, not consensus NT history.

### Reformation, print, media history

11. **Elizabeth L. Eisenstein** — *The Printing Press as an Agent of Change* (Cambridge University Press, 1979). Classic **macro** argument tying print to religious and scientific revolutions.

12. **Andrew Pettegree** — *The Book in the Renaissance* (2010); *Reformation and the Culture of Persuasion* (2005); *Brand Luther* (2015); and essays such as “Print and the Reformation: A Drama in Three Acts” (*Church History*). OpenAlex lists *Reformation and the Culture of Persuasion* with substantial citations (143). Pettegree stresses **cheap print, title-page propaganda, multilingual diffusion**, and **multi-modal persuasion** (sermon, song, drama, image) — a **corrective** to “Gutenberg alone” monocausal stories.

### Missiology / church-planting movements (applied)

13. **David Garrison** — *Church Planting Movements* (2004) and related IMB-era literature. Frequently cited in evangelical movement practice for **CPM criteria**; academically uneven — use as **practitioner theory** Alan Hirsch engages, not as neutral social science.

14. **Steve Addison** — *Movements That Change the World* (2011) and blog corpus. Popular movement-stage model; useful for **internal Movemental conversation**, not external scholarly proof.

---

## Assessment of historical analogies (what holds, what stretches)

### Early church: letters, house networks, itinerant leaders, empire-wide connectivity

| Claim | Supported by scholarship? | Caveats |
|-------|---------------------------|---------|
| Pauline letters as **coordination and formation** across cities | **Strong** — mainstream NT studies; Meeks on urban social world. | Letters are also **theological conflict documents**; not “neutral infrastructure manuals.” |
| House churches as **cellular network** units | **Strong** as sociological description (Meeks; 1 Cor household rhetoric). | Scale and uniformity **vary by region**; archaeology and local politics complicate one template. |
| Itinerant apostles / workers | **Moderate** — narrative + Pauline self-presentation; role debated. | Risk of **reading modern “apostolic movement” language** back without historical friction. |
| Roman roads / *pax Romana* as “platform” | **Suggestive but easy to overstate**. | Trade, law, multilingualism matter; **conversion and martyrdom dynamics** are not reducible to logistics. |
| Stark-style **network effects** | **Heuristic** | Significant **critiques** from historians and theologians — use as **model**, not proof. |

### Reformation: printing press as movement infrastructure

| Claim | Supported? | Caveats |
|-------|------------|---------|
| Print enabled **mass diffusion of controversial ideas** | **Strong** | Timing **differs by region**; censorship and confessional politics matter. |
| Print is **the** cause of Protestantism | **Weak** — Eisenstein legacy often **flattened** in popular talk. | Pettegree: **affinity between Protestantism and print is assumed more than demonstrated** without granular evidence; oral + manuscript + visual culture remained huge. |
| Luther + Cranach **media design** | **Strong** for **pamphlet culture** | Analogies to **modern content design** are fairer than to “cloud infrastructure.” |

### Civil rights: churches, HBCUs, buses, newsletters

| Claim | Supported? | Caveats |
|-------|------------|---------|
| Black churches as **movement centers** | **Strong** — Morris; Payne on organizing tradition. | Institutions also had **internal conservatisms**; gender and generational tensions real. |
| **Transport and media** (buses, Jet magazine, radio) | **Strong** for **nationalization** of local struggle | Risk: **romanticizing** logistics — federal response, cold-war geopolitics, labor markets all matter. |

### Counter-examples (prompt Q5)

- **Movements with thin “dedicated” infrastructure:** Some **digital cascades** (e.g. certain hashtag mobilizations) show **rapid bursts** with **low prior organization** — high variance in outcomes (Tarrow’s “cycles of protest”).
- **Infrastructure without movement:** **Institutional church** in Christendom has massive built infrastructure; **missional vitality** is not guaranteed — Hirsch’s **Christendom vs. movement** contrast is relevant here (see corpus notes).
- **Failed tech “movement stacks”:** Many **platform plays** in religion space plateau as **CRM + content hosting** without movemental outcomes — see competitive positioning research separately.

---

## Infrastructure vs. platform vs. tool (scholarly hooks)

- **Plantin et al. (2016)** explicitly invites **cross-fertilization**: infrastructure studies’ concern with **embeddedness, standards, maintenance, invisibility** vs. platform studies’ concern with **governance, multi-sided markets, data flows, lock-in**.
- For Movemental copy:
  - **Scholarly “infrastructure”** often implies **taken-for-granted foundation others depend on** (roads, DNS, payment rails) — **high bar**.
  - **“Platform”** implies **rules + intermediation + data** — closer to **SaaS + marketplace** reality.
  - **Honest synthesis:** Movemental can be **platform infrastructure** in Plantin’s sense — **stacked layers** (hosting, auth, content, AI, assessments) **in service of** leader-owned movement networks — without claiming equivalence to **electric grids**.

---

## Alan Hirsch corpus notes (movement / network / institution)

**Corpus path:** `/Users/joshuashepherd/Desktop/dev/repos/alan-books/corpus/alan_hirsch/`

### *The Forgotten Ways* — ch11 “Glossary” — entries **Christendom** and **Early Church**

Hirsch defines the NT-era church as contrasted with Christendom:

> “The Christendom church is fundamentally different from the NT church, which was made up of **a network of grassroots missional communities organized as a movement**.”

On buildings and clergy (same glossary entry):

> “The early church had **no recognized, dedicated buildings** other than houses, shops, etc.”

> “The idea of a **separated clergy**, I maintain, is **alien to the NT church**, as it is in the Jesus movements of the early church and China.”

**Early Church** glossary entry:

> “…a radical, **grassroots network** of churches and people, **organized as a movement**, largely in the context of persecution.”

**Source:** *The Forgotten Ways* — ch11 “Glossary” (local corpus file `the-forgotten-ways-ch11-glossary.md`).

### *The Forgotten Ways* — ch9 “Organic Systems”

- Cites **David Garrison** on church-planting movements: hierarchy/bureaucracy **inversely** related to movement dynamism; **house churches** should exercise evangelism/church planting **without waiting for external approval** (Hirsch’s paraphrase of Garrison’s pattern).
- **Niebuhr (via Bosch)** cited on **institution vs. movement** temperamental differences — institution conservative/past-oriented; movement progressive/future-oriented.
- **Network typologies** (chain, hub/star, all-channel) attributed to **Arquilla & Ronfeldt** — used to argue apostolic movements favor **distributed / all-channel** patterns.

**Source:** *The Forgotten Ways* — ch9 `the-forgotten-ways-ch09-organic-systems.md` (see sections on networking, Garrison, DCFI house-church growth illustration).

### *The Permanent Revolution* — appendix / movement theory

- mDNA summarized as six interrelating elements composing **apostolic genius** — includes **organic systems** (“organization as movement” and **viral, reproductive tendencies**).
- References **Jane Mansbridge** law: movements **splinter into sects** unless they win quickly, else **institutionalize** — useful guardrail when claiming “infrastructure guarantees multiplication.”

**Source:** *The Permanent Revolution* — ch14 appendix `the-permanent-revolution-ch14-appendix.md`.

---

## Gaps and next passes

- Deeper **Semantic Scholar** profiling once rate limits reset (or with API key): query bundles for “religious movements digital infrastructure,” “faith-based organizing platforms,” etc.
- **Full-text** read of Plantin 2016 and Morris 1984 intro chapters for quotable definitions.
- **HathiTrust / Internet Archive** pass on **Eisenstein** vs. **Pettegree** primary chapters for long-form article citations (author-research skill trajectory).

---

## Related internal argument IDs (from prompt)

`C-POS01`, `book-024`, `business-025`, `articles-046`, `C-A08` — cross-link when those markdown stubs exist in `docs/arguments/custom-gpt/`.
