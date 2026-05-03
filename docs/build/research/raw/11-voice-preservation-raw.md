# Raw research: Voice preservation and AI fidelity (Prompt 11)

**Date:** 2026-04-12  
**Prompt:** [docs/build/research/prompts/11-voice-preservation-ai-fidelity.md](../prompts/11-voice-preservation-ai-fidelity.md)  
**Argument IDs:** `C-F01`, `articles-035`, `business-079`, `business-078`, `articles-047`, `articles-019`, `business-032` (70/30)

**Skills applied:** OpenAlex retrieval (`mailto`); web verification (ACL Anthology, Pew, NPR+Barna, COPE); no Semantic Scholar batch (prior session rate limits).

---

## Source index

| Tier | Source | Method | Notes |
|------|--------|--------|-------|
| A | OpenAlex Works API | `curl` + `jq` 2026-04-12 | DOIs and citation counts below. |
| A | Ippolito, Duckworth, Callison-Burch, Eck, ACL 2020 | Web search → ACL Anthology | `doi:10.18653/v1/2020.acl-main.164` — detection vs. human fooling tradeoff. |
| A | Pew Research Center | `WebFetch` 2026-04-12 | U.S. adults, **n = 5,023**, Jun 9–15, 2025 — reactions if AI involvement revealed **after** liking content. |
| A | COPE — Authorship and AI tools | Web search summary + URL | `publicationethics.org` position (reviewed Feb 2023 per COPE). |
| B | NPR + Barna (clergy AI sermons) | `WebFetch` 2026-04-12 | Barna: **12%** senior Protestant clergy **comfortable** using AI to **write** sermons; **43%** see merits for **preparation/research**. |
| B | *Scientific Reports* (2025) human–genAI collaboration & motivation | OpenAlex | `doi:10.1038/s41598-025-98385-2`, cited_by_count **33** (Apr 2026). |
| B | *British Journal of Educational Technology* (2024) metacognitive laziness / GenAI | OpenAlex | `doi:10.1111/bjet.13544`, cited_by_count **291**. |
| C | ACM CHI — fiction writing with AI | OpenAlex | `doi:10.1145/3569219.3569418` — qualitative co-writing experience. |
| C | arXiv surveys (RAG, AIGC) | OpenAlex | e.g. `doi:10.48550/arxiv.2401.07883` (*Chronicles of RAG*), `doi:10.48550/arxiv.2303.04226` (AIGC survey). |

---

## 1. NLP: style, voice, and whether it is “solved”

### Historical: stylistic transfer (pre-LLM)

- **Carlson et al.,** *Stylistic Transfer in Natural Language Generation Systems Using Recurrent Neural Networks* (2016), `doi:10.18653/v1/w16-6010`, cited_by_count **34** — RNN-era formal “stylistic transfer”; shows lineage but **not** equivalent to modern LLM persona.

### LLM era: personalization and adaptation

- **Hu et al.,** *Parameter-efficient fine-tuning of large-scale pre-trained language models* (*Nature Machine Intelligence*, 2023), `doi:10.1038/s42256-023-00626-4`, cited_by_count **831** — PEFT/LoRA family enables **cheap adaptation** of large models; relevant to **tenant-specific** voice layers **if** training data and evaluation exist.

- **AUTOGEN: A Personalized Large Language Model for Academic Enhancement—Ethics and Proof of Principle** (2023), `doi:10.1080/15265161.2023.2233356`, cited_by_count **97** — personalized LLM in **high-stakes** domain with explicit **ethics** framing (parallel to theological voice claims).

### Multidisciplinary opinion stock-takes

- **Dwivedi et al.,** *“So what if ChatGPT wrote it?”* (*International Journal of Information Management*, 2023), `doi:10.1016/j.ijinfomgt.2023.102642`, cited_by_count **3404** — governance, authorship, policy; use for **risk register**, not for proving voice fidelity.

**Conclusion for Movemental:** **Surface style** (lexical n-grams, rhythm, rhetorical tics) can often be **approximated** with RAG + prompt + light adaptation; **deep authorial judgment** (what the author would **refuse** to say, nuance under critique, live doctrinal stakes) remains **active research + product discipline**, not a solved NLP task.

---

## 2. RAG vs. fine-tuning vs. prompting (trade-offs)

| Approach | Voice upside | Voice / truth risks | Ops |
|----------|--------------|---------------------|-----|
| **Prompting + RAG** over frozen model | Retrieves **real** phrases/examples; updatable corpus; cheaper iteration | Retrieval misses; **context stuffing** homogenizes; model base tone bleeds | Lowest friction |
| **Full fine-tune** | Can shift distribution strongly | Overfit; catastrophic forgetting; data governance; expensive | High |
| **PEFT / LoRA / adapters** | Middle ground; per-author heads | Still needs **clean** training pairs + eval harness | Medium |

**RAG survey pointer:** *The Chronicles of RAG: The Retriever, the Chunk and the Generator* (2024), `doi:10.48550/arxiv.2401.07883`, cited_by_count **15** — documents that RAG success is **systems engineering** (chunking, routing, eval), not “turn on vector DB.”

---

## 3. Measuring “sounds like author X” — stylometry and limits

**Classical NLP / linguistics**

- **Stamatatos,** *Automatic Text Categorization in Terms of Genre and Author* (2000), `doi:10.1162/089120100750105920`, cited_by_count **397** — foundational **author + genre** categorization.

- **Koppel & Winter,** *Authorship attribution and verification with many authors and limited data* (2008), `doi:10.3115/1599081.1599146`, cited_by_count **151**.

**Important distinction**

- **Authorship attribution** (which of *k* known authors?) ≠ **generative fidelity** (does new text **extend** the author faithfully?).  
- **Generative models can score well on surface similarity** while **violating** author commitments — no single metric captures **theological constraint**.

**Ippolito et al., ACL 2020** — `doi:10.18653/v1/2020.acl-main.164`

- Finding: decoding choices that **fool humans** can create **statistical fingerprints** machines exploit — human and automatic judgment **diverge**.  
- Implication for “voice fingerprinting”: **human panel + statistical drift detectors** is closer to research consensus than either alone.

**Validated “fidelity score” for thought leaders:** No widely adopted public benchmark like BLEU for “Hirsch-ness.” Movemental’s **business-079 / business-078** claims should be framed as **internal rubrics + human adjudication**, optionally informed by stylometric features, **not** as an industry-standard psychometric.

---

## 4. Human–AI co-writing and the 70/30 rule (`business-032`)

**Empirical caution**

- **Yang et al.,** *Human-generative AI collaboration enhances task performance but undermines human’s intrinsic motivation* (2025), `doi:10.1038/s41598-025-98385-2` — collaboration can **boost immediate performance** but interact badly with **motivation** and follow-on solo work depending on design.

- **Valtonen et al.,** *Beware of metacognitive laziness* (2024), `doi:10.1111/bjet.13544`, cited_by_count **291** — GenAI can **short-circuit** learning/metacognition if the human delegates cognition uncritically.

**Qualitative creative practice**

- **Swafford & Ko,** *A Redhead Walks into a Bar: Experiences of Writing Fiction with Artificial Intelligence* (CHI 2022), `doi:10.1145/3569219.3569418`, cited_by_count **50** — writers negotiate **voice, shame, control** with AI; useful analogy for **pastoral** voice anxiety.

**Human-centered communication framing**

- *Human-Centered AI Communication in Co-Creativity: An Initial Framework and Insights* (2025), `doi:10.1145/3698061.3726932`, cited_by_count **6** — nascent but on-brief.

**Verdict on 70/30:** Treat as **editorial workflow heuristic** (like “first draft fast, second pass human”). **No** retrieved paper validates **70% / 30%** as universally optimal for theological prose. Recommend Movemental publish **rationale** (e.g., time-boxing, risk control) not **false precision**.

---

## 5. Ethics: authorship, disclosure, responsibility

**COPE — Authorship and AI tools**  
`https://publicationethics.org/guidance/cope-position/authorship-and-ai-tools`

- AI tools **cannot** be authors (cannot take responsibility).  
- **Disclosure** of tool, scope, and section.  
- Humans **remain liable** for all content including AI portions.

**Parallel for Movemental (non-journal contexts):** “Human-authored” should be **graded**:

- **Human-only**  
- **AI-assisted, human-final** (disclosed)  
- **AI-generated, human-approved** (heavy disclosure)  
- **AI roleplay** (clearly labeled simulation)

---

## 6. Audience trust and disclosure (U.S. general public)

**Pew Research Center** (Jun 9–15, 2025, **n = 5,023** U.S. adults), scenarios where respondent **already liked** content, then learns AI was involved:

- **71%** would view a **political candidate** less favorably if AI helped write a **liked speech**; **3%** more favorable; **25%** no change.  
- **56%** would react **negatively** if AI wrote a **liked news article**; **7%** more positively; **36%** no change.  
- Arts scenarios more **mixed** (e.g., painting: **49%** less favorable, **48%** no change).

Source: [Pew short read, Sep 17, 2025](https://www.pewresearch.org/short-reads/2025/09/17/from-political-speeches-to-songs-how-would-americans-react-if-they-found-out-ai-was-involved/) (fetched 2026-04-12).

**Implication:** Disclosure after positive reception still **hurts** in **high-trust** domains (politics, news). Religious teaching may pattern closer to **news/speech** than to **song** for some audiences — **test with Movemental readers**, do not assume art-world tolerance.

---

## 7. Faith sector examples and reception

**NPR + Religious News Service** (Jul 17, 2025) citing **Barna** online survey of senior Protestant clergy:

- **12%** comfortable using AI to **write** sermons.  
- **43%** see merits for **sermon preparation and research**.

Source: [NPR article](https://www.npr.org/2025/07/17/nx-s1-5468637/clergy-grapple-with-the-ethics-of-using-ai-to-write-sermons) → Barna link in story.

**Father Justin / Catholic Answers** (2024) — chatbot persona controversy (digital absolution issue); rapid product change after backlash. Useful **cautionary tale** for “embodied voice” without **guardrails** (America Magazine and others covered).

**Theological voices in public debate** — Brad East (*Christianity Today* op-ed “AI Has No Place in the Pulpit,” linked from NPR); countervoices (Rabbi Bogard on chavrutah-style AI study). Use as **discourse map**, not as data on model quality.

---

## 8. “Uncanny valley” for voice (almost-right)

Not the robotic **visual** uncanny valley, but a **pragmatic** analogue:

- Correct **diction**, wrong **commitments** (sounds like author until a specialist reads).  
- Correct **tone**, **hallucinated** citations (NPR notes fabricated scripture risk in clergy interviews).  
- **Over-smoothed** prose — statistically “clean” LLM cadence Ippolito line of work connects to **detectability** and **human unease**.

---

## 9. Theology of authorship (high-level, non-exhaustive)

Analogies invoked in public theology:

- **Scribe / secretary** — transmits under author direction; moral **responsibility** remains with commissioner.  
- **Editor** — shapes voice with consent.  
- **Ghostwriter** — contractual voice transfer; ethically bounded by disclosure contracts.

**LLM difference:** scale, opacity, and **lack of moral agency** — closer to **power tool** than to **disciple**. Movemental can defend **tool use** with **transparency + accountability**; claiming the model **is** the leader crosses into **category error** unless explicitly framed as **simulation** for learning.

---

## 10. OpenAlex query log (selected)

```
works?search=neural style transfer text author style
→ Stylistic Transfer RNN 2016 W16-6010; ChatGPT education 2023; multidisciplinary ChatGPT opinion 2023

works?search=parameter efficient fine tuning language models
→ Hu et al. Nat Mach Intell 2023 DOI 10.1038/s42256-023-00626-4 (831 citations)

works?search=authorship verification deep learning stylometry
→ Stamatatos 2000; Koppel & Winter 2008; etc.

works?search=human AI collaborative writing co-creation
→ CHI 2022 fiction+AI; Human-centered AI co-creativity 2025; etc.

works?search=Human-generative AI collaboration intrinsic motivation
→ Scientific Reports 2025 DOI 10.1038/s41598-025-98385-2
```

---

## 11. Gaps Movemental should fund internally

1. **Human rubric study** — blinded experts rate “in/out of voice” + **theological accept** on a Movemental-generated panel.  
2. **Drift monitoring** — distribution shift over model upgrades (versioned prompts + retrieval index).  
3. **User trust** — A/B disclosure copy on leader sites (not only U.S. general public Pew panel).  
4. **Negative corpus** — what the author **would not say** (hard to collect ethically, high value).

---

## Disclaimer

Model vendors, detection startups, and Movemental product metrics **age quickly**. External marketing should avoid “solved problem” unless tied to **reproducible eval** and **version pinning**.
