---
corpus_id: movemental-room-public
document_id: kb-phase-1
title: "Movemental KB — Operating rules, Path, pricing, sources"
version: "2026-05"
audience: public
upload: true
topics:
  - operating-rules
  - path
  - pricing
  - source-register
kb_parts: ["0", "IV", "V", "XIII"]
retrieval_priority: high
live_facts: true
openai_attributes:
  category: knowledge-base
  phase: "1"
  domain: path-pricing
chunking:
  strategy: static
  max_chunk_size_tokens: 500
  chunk_overlap_tokens: 75
---

# The Movemental Genius Knowledge Base: Phase 1

*Phase 1 of four ready phases: the operating rules, the Path, pricing, and the source register. Written only from Movemental's own documents, current as of May 2026. Each entry is written to stand on its own when retrieved. Items marked [LIVE], [CONFLICT], [VERIFY], or [UNCONFIRMED] must be checked against the live source before the agent states them as settled.*

---

## Part 0: Operating rules for the knowledge base

### How the agent uses this knowledge base
The Movemental Genius answers questions about Movemental from this knowledge base. Its first duty is accuracy, not persuasion. When a question touches a fact that changes over time, the agent checks the live source before answering and says when a figure may be out of date. When the knowledge base does not hold an answer, the agent says so plainly rather than filling the gap from memory.

### Rule one: provenance discipline
Every claim about the world outside Movemental, whether a statistic, a law, or an external event, must carry its source. Movemental's website routes this evidence to a page called "Claims and sources" at `/footnotes`. The agent cites; it does not assert. If a source cannot be named, the claim is not stated as fact.

### Rule two: settled facts versus live facts
Some facts are stable: the four stages of the Path, the founders, the refusals. Others move and must be re-checked before stating: current pricing, the number of committed Movement Voices, AI-sector statistics, the status of forthcoming products, and the access mechanism the company has committed to. These are marked [LIVE] throughout the knowledge base.

### Rule three: do not resolve conflicts by guessing
Where two source documents disagree, the agent states the most recent or most authoritative figure, names the other, and does not invent a reconciliation or quietly average them. The known conflicts are listed in the source register in Part XIII.

### Rule four: the refusals bind the agent
The agent does not claim that Movemental authors content under a human's name. It does not impersonate a Movement Voice or invent positions for Joshua Shepherd, Alan Hirsch, Brad Brisco, or any Voice. When asked, it discloses that it is an AI.

### Rule five: no marketing voice
Plain, direct, declarative sentences. No urgency, no intensifiers such as "transformative" or "powerful," no questions used as headings. This mirrors Movemental's own published voice rules.

### Rule six: separate Movemental's claims from verified facts
Much of what the knowledge base contains is Movemental's own framing and compiled research, not independently established fact. The agent makes the distinction audible. It says "Movemental's reading is" or "according to the AI Reality Paper" when relaying a company claim, and reserves flat assertion for things that are independently verifiable and sourced. On contested or external matters it presents the claim and its source, and lets the reader weigh it.

### Rule seven: stay inside scope, and refer out where it belongs
The agent answers about Movemental, the Path, the network, pricing, and the state of AI as the corpus documents them. It does not give legal, financial, or pastoral advice; on those it offers the relevant information and points to a qualified human. It does not speculate about named individuals beyond what the documents state, and it does not describe people as committed Movement Voices unless a current source confirms it.

---

## Part IV: The Path

### What the Path is
The Movemental Path is a four-stage methodology for adopting AI: Safety, Sandbox, Skills, Solutions, walked in that order. It is the product Movemental sells to mission-driven organizations: churches, faith-based nonprofits, and theological institutions. Each stage produces specific artifacts an organization can ratify. The full methodology is published in free Field Guides, so a team can run it themselves, or they can engage Movemental to facilitate it. The Path is documented at `/pathway`, with a long-form essay version at `/the-path`.

### The Path at a glance
| Stage | Free self-directed | Facilitated | Produces |
|---|---|---|---|
| 01 Safety | SafeGuide (free, 33pp, 1 to 2 months) | SafeStart ($1,000, 2 weeks) | AI Organizational Guidebook: five layers, seven artifacts |
| 02 Sandbox | SandboxGuide (free, 48pp) | SandboxLive ($15,000, 4 to 6 weeks) | Future Plan (green/yellow/red), Discernment Memo, Readiness Assessment |
| 03 Skills | none (cohort-only) | Skills ($15,000 + $5,000/yr, 8 weeks) | A formed cohort with three capacities: discernment, authorship, stewardship |
| 04 Solutions | none | Solutions (from $30,000, scoped) | Scoped AI deployment across six configurations |

### The asymmetry that orders everything
For the organizations Movemental serves, credibility is not a competitive advantage. It is the product. A marketing agency that makes an AI mistake loses a client. A church loses the authority of its pulpit. A nonprofit loses the donor trust that is its lifeline. A seminary loses its claim to form people. There is no second product to fall back on. This asymmetry is the reason the Path exists in this order, and the reason "move fast and break things" is the wrong posture for this customer base. The cost of skipping a stage is paid in the one currency these organizations cannot afford to lose. Source: Four-Stage Path underlying logic; the three-minute narrative.

### The conveyor-belt logic
The four stages are not a list. Each stage names the failure mode of the one before it. Safety alone is theater: barriers against AI with no test of whether AI had value. Sandbox without Safety is reckless: testing powerful tools against real work with no ratified rules. Skills without Sandbox is abstraction: forming people against findings that do not exist yet. Solutions without Skills is replacement: deploying AI into the hands of people who cannot steward it. Movemental does not push organizations along the Path; the logic moves them. Source: Four-Stage Path underlying logic.

### The two traps
The Path is framed against two traps the company refuses. The first is the fear trap: banning or avoiding AI, which leaves shadow use ungoverned and forfeits any value the tools might hold. The second is the uncritical-enthusiasm trap: adopting AI wholesale without governance or formation, which erodes the trust the organization runs on. Movemental refuses both the Luddite and the techno-utopian script. [VERIFY exact wording against `/pathway`.] Source: origin and trajectory note; the letter to Movement Voices.

### Stage 01: Safety, what it is
Safety is the first stage because AI is already in the organization. It produces the AI Organizational Guidebook, a board-ratifiable document that names what the organization believes about AI, what it will and will not do, what is true in its environment, what governs specific uses, and what it does when something goes wrong. The trust dividend arrives the moment the board ratifies. From that point the organization has a public answer for a journalist, a defensible posture for a major donor, a shared frame for staff, and a document it can cite when a vendor pitches a prohibited use. Source: Four-Stage Path underlying logic; /pricing copy prompt.

### Stage 01: Safety, the Guidebook's two framings
The Guidebook is described two ways, and the knowledge base treats them as two views of one deliverable: "five layers, seven artifacts." The five layers are Statement (what we believe), Policy (what we do and refuse), Context (what is true in our environment now), Rules (what governs specific domains), and Response Plans (what we do when something goes wrong). The seven artifacts, named as the minimum viable Safety checklist, are: the AI Use Charter; the Acceptable Use Policy; Data Handling Standards; the Disclosure and Attribution Standard; Pastoral, Programmatic, or Educational Care Boundaries; the Voice Cloning and Impersonation Response Plan; and a Communication to the Constituent Base. The precise mapping of the seven artifacts onto the five layers is an open reconciliation item; see Part XIII. Source: Four-Stage Path underlying logic; AI Reality Paper, May 2026.

### Stage 01: Safety, the two paths through it
Safety can be walked two ways. SafeGuide is the free, self-directed path: a 33-page Field Guide, Volume One, titled "It Starts With Safety," which a team uses to draft the Guidebook itself over one to two months. SafeStart is the facilitated path: $1,000, two weeks, six steps, in which Movemental drafts all five layers customized to the organization and the team revises and ratifies them inside a private dashboard. The ratification is the organization's own; Movemental is not in the room for it. Both paths produce the same kind of board-ratified Guidebook. Source: /pricing copy prompt; Four-Stage Path underlying logic; site map.

### Stage 01: Safety, what a SafeStart organization receives
A SafeStart engagement delivers more than the document. The organization receives a complete five-layer Guidebook customized to it and board-ratified; a private, searchable dashboard where staff find the relevant clause by question and where new hires see the organization's full AI posture on day one; the Guidebook in the formats the organization actually uses, including print-quality PDF for board packets, HTML and CSS for the website, and the living dashboard; and a set of rollout supports, including a board ratification packet, staff announcement templates, a constituent-facing communication draft, and an incident-readiness briefing. It also integrates with the rest of the Path, so a later Sandbox is adjudicated against this Guidebook and a later Skills cohort anchors to its Statement and Policy. Source: Four-Stage Path underlying logic.

### Stage 01: Safety, the Integrity Diagnostic
Before choosing a path, an organization can take a free assessment that maps its current AI use and shows where the gaps are. [CONFLICT] The specifications differ across sources: one document describes ten minutes and fifty questions; the site map describes the assessment at `/assess` as forty-five minutes, twenty-two questions, six dimensions, with a six-page narrative read-back; the system inventory describes twenty-two questions and five dimensions. The question count of twenty-two is the most likely current figure; the time and the dimension count are unresolved. Verify against the live `/assess` page before stating specifics. A narrower seven-question, ten-minute Safety Self-Assessment is also referenced. Source: site map; How Movemental Uses AI inventory; Four-Stage Path underlying logic.

### Stage 01: Safety, the five layers in operational detail
The Statement is two pages: a mission-alignment clause, a posture toward both fear and uncritical enthusiasm, an ethical or theological grounding paragraph, a scope clause, and an annual-review cadence, signed by senior leadership and ratified by the board. The Policy names sanctioned, constrained, and prohibited uses, the consequences of violations, and the Named Refusals. The Context names what is actually true now: a Vendor and Tool Inventory (every AI tool in use, by whom, for what, under what terms), a Data Classification with tiers of sensitivity, and a procurement gate for new tools, reviewed quarterly. The Rules map data tiers to permitted tools, specify when AI involvement must be disclosed, set care boundaries where AI cannot substitute for human presence, and give pre-approved workflows. The Response Plans center on an Incident Response Plan with named owners, escalation paths, verification protocols, a constituent-communication template, and a post-incident review. Source: Four-Stage Path underlying logic.

### Stage 01: Safety, the Named Refusals
Inside the Policy, the Named Refusals are covenants an organization can cite when a vendor pitches a prohibited use anyway. The standard refusals are: AI in eligibility determinations; AI-driven surveillance of constituents; AI-generated personal voice without disclosure; AI substitution in pastoral or counseling care; and deepfakes and voice cloning. They are written so the organization can point to a ratified commitment rather than argue each case from scratch. Source: Four-Stage Path underlying logic.

### Stage 01: Safety, the SafeStart six steps
A SafeStart engagement runs in six steps over roughly three weeks. Step one, Engagement on Day 0: the organization signs and a private dashboard is provisioned within twenty-four hours. Step two, a one-hour kickoff Zoom within three business days, with a contributor team of four to seven people and the lead decider. Step three, drafting and asynchronous review across Week One, with all five layers published to the dashboard within seven days for comment. Step four, a one-hour revision Zoom in Week Two to resolve open questions, with the revised Guidebook published within forty-eight hours. Step five, internal ratification at the end of Week Two, which the deciding team does on its own, without Movemental in the room. Step six, publication and rollout in Week Three. Contributor time runs about three to four hours per person across the two weeks. Source: Four-Stage Path underlying logic.

### Stage 01: Safety, the three failure modes it prevents
Movemental's reading is that organizations which skip Safety tend to meet three failure modes, in order of how often they occur. First, an AI-authorship incident, where the damage is usually the non-disclosure rather than the use itself: the organization that disclosed early gets to define the terms, while the one that gets caught loses the framing. Second, a confidential-data exposure, where a staff member pastes pastoral notes, donor records, or student records into a consumer tool, believing they are being efficient, and without a Guidebook does not know it is a violation. Third, insurance and regulatory exposure that surfaces only when a claim is filed or an audit arrives. The Guidebook does not make staff infallible; it makes AI use in the organization governable rather than ad hoc. Source: Four-Stage Path underlying logic.

### Stage 02: Sandbox, what it is and what it produces
Sandbox is the second stage. A Safety Guidebook with no Sandbox is barriers built before anyone tested whether the tools had value. Sandbox is where a team tries AI against its real work, against its own ratified Guidebook, and adjudicates each use case as green, yellow, or red. It produces a Future Plan containing those adjudicated use cases, a Discernment Memo capturing what the team learned and now believes is true, and a Readiness Assessment recommending the next stage. The team leaves Sandbox having actually used AI against its own work rather than theorizing about it. Source: Four-Stage Path underlying logic; /pricing copy prompt.

### Stage 02: Sandbox, the two paths through it
Sandbox can also be walked two ways. SandboxGuide is the free, self-directed path: a 48-page Field Guide, Volume Two, titled "It Continues With Exploration," covering the eight phases of the Sandbox. SandboxLive is the facilitated path: $15,000, four to six weeks, including roughly ten hours of in-person teaching per cohort across the eight phases, plus LMS access, a customized AI recipe library, and dashboard integration with the Safety Guidebook. SandboxLive produces the Future Plan with green, yellow, and red use cases. Source: /pricing copy prompt; site map.

### Stage 03: Skills, what it is
Skills is the third stage, because Sandbox findings need people who can carry them. Skills is an eight-week formation cohort that develops three capacities in the people who will steward AI inside the organization: discernment, authorship, and stewardship. The curriculum anchors to the organization's own ratified Statement and Policy from Safety. Skills is cohort-only by design; no self-paced version exists, because formation requires community rather than consumption. It produces a formed group inside the organization that can carry AI decisions across it without depending on outside help. Source: Four-Stage Path underlying logic; /pricing copy prompt.

### Stage 04: Solutions, what it is
Solutions is the final stage, because deploying AI into the hands of people who cannot yet steward it, inside infrastructure that was not rebuilt for the new conditions, is replacement rather than progress. Solutions is scoped AI deployment across six configurations: tool optimization, custom recipes, infrastructure builds, domain-specific applications, multi-organization coordination, and network-scale deployments. It is built and operated by formed people, governed by the working Guidebook, against use cases the Sandbox already adjudicated. Each Solutions engagement is scoped to its own situation. Source: Four-Stage Path underlying logic; /pricing copy prompt.

### Choosing between the self-directed and facilitated paths
The free Field Guides are described as genuinely sufficient on their own, not as a downgrade; the trust dividend arrives when the board ratifies, regardless of who drafted the document. The self-directed path fits leadership teams with time, alignment, internal capacity, and the discipline to finish what they start. The facilitated path fits organizations that want speed and external coordination, or that recognize the work as a technical task sitting inside a larger adaptive challenge. Skills and Solutions have no self-directed path, because formation requires a cohort and deployment requires scoping. Source: Four-Stage Path underlying logic; /pricing copy prompt.

### The Field Guides
The methodology is published in full in free Field Guides, so any team can run the work itself. Volume One, "It Starts With Safety," covers the Safety stage and is 33 pages. Volume Two, "It Continues With Exploration," covers the Sandbox stage and is 48 pages. Both are available now. Volume Three (Skills) and Volume Four (Solutions) are forthcoming. The index lives at `/field-guides`. [LIVE] Confirm availability before stating. Source: site map; /pricing copy prompt.

---

## Part V: Pricing

*All pricing is [LIVE]. State numbers exactly; never round, approximate, or hedge. Verify against `/pricing` before quoting. Source for this part: the /pricing copy prompt and the end-user pricing strategy, May 2026.*

### Movemental engagement pricing, quick reference
| Tier | Price | Time |
|---|---|---|
| SafeGuide | Free | Self-paced, 1 to 2 months |
| SafeStart | $1,000 | 2 weeks |
| SandboxGuide | Free | Self-paced |
| SandboxLive | $15,000 | 4 to 6 weeks |
| Skills | $15,000 + $5,000/year | 8 weeks plus ongoing access |
| Solutions | From $30,000 | Per engagement |
| Path Bundle | Discount unconfirmed | Varies |
| Institutional | Scoped | Per engagement |

### Movemental engagement pricing, in full
Movemental's own engagement prices are published, not hidden behind a sales call. SafeGuide is free; it is the self-directed PDF Field Guide for Safety. SafeStart is $1,000 for a fixed two weeks. SandboxGuide is free; it is the self-directed Field Guide for Sandbox. SandboxLive is $15,000 for four to six weeks. Skills is $15,000 plus $5,000 per year. Solutions is from $30,000, scoped per engagement. Institutional pricing, for denominations, seminary networks, and multi-organization engagements, is scoped per engagement, and the conversation begins at josh@movemental.ai. The Path Bundle, which combines Safety, Sandbox, and Skills, exists, but its discount is [UNCONFIRMED]: the source leaves it bracketed, so do not quote a bundle price until it is confirmed.

### Engagement terms
Payment is made in two tranches: fifty percent on engagement initiation, due net fifteen days from contract signing, and fifty percent on completion, due net fifteen days from final delivery. Payment is accepted by check, ACH, or credit card, with the applicable processing fee on card payments. Late payments may, at Movemental's discretion, suspend engagement activity until paid, and written notice always precedes any suspension. These terms apply to the facilitated tiers.

### The access mechanism for under-resourced organizations
Movemental states plainly that its standard prices are not walkable by every organization, and treats this as a real problem rather than a marketing one. Three access mechanisms were drafted: a publicly reported Scholarship Pool funded by a share of every facilitated engagement and by Movement Voice facilitation hours; a budget-tiered or regional pricing model keyed to organizational budget and, internationally, to World Bank income tiers; and a set of lower-cost LMS-only self-guided tiers. [UNCONFIRMED] Which mechanism the company has committed to is not settled in the source. Do not describe any access mechanism as live until the company has selected and named it.

### Movement Voice compensation
The senior leaders whose credibility and content shape the network are paid through a published Movement Voice Participation Agreement. Compensation includes an annual participation fee, content royalties on direct revenue, a pooled royalty on Skills cohort revenue distributed among the Voices whose content is part of the active curriculum, facilitation and advisory fees when a Voice facilitates an engagement, and ten to fifteen percent referral compensation when an engagement originates from a Voice's introduction. The full agreement is available on request. The stated principle: most thought-leader networks pay in logos and exposure; Movemental pays in cash and royalties.

### End-user and network pricing, recommended bands
Separate from engagement pricing, Movement Voices sell products to end users. Movemental publishes recommended bands but does not enforce them. Digital books run $9.99 to $19.99 for new releases and $4.99 to $9.99 for backlist older than three years. Print books run $18 to $28 hardcover and $14 to $22 paperback. Eight-week formation cohorts led by a Voice run $300 to $900 per participant. Subscriptions and memberships run $5 to $15 per month, or $50 to $150 per year. The newsletter is always free, and articles are free at the article level, because single-article paywalls fracture the formation pathways and weaken the network's discoverability. Source: end-user pricing strategy, May 2026.

### Network-controlled products
For products that span Voices, Movemental sets the price with transparent royalty splits. The Skills cohort fee is $15,000 plus $5,000 per year, a flat network-wide price because the product is Movemental's. Cross-Voice content bundles are priced by Movemental with a royalty to each contributing Voice. Licensed institutional content runs $500 to $5,000 per institution per year, sliding by institutional size. A network-level all-access subscription, as the network matures, runs $30 to $60 per month or $300 to $600 per year. Translation rights are coordinated by Movemental and shared with the Voice and translator, with under-resourced language markets priced at a heavy discount or initially free. Governance runs through a scholarship pool, recommended at five percent of paid revenue, and an annual Pricing Council of elected Voices. Source: end-user pricing strategy.

### The four principles behind end-user pricing
Movemental reasons about Voice pricing from four principles held in tension. Sovereignty: each Voice owns their corpus and was a senior leader with established audience economics before Movemental existed, so they set their own prices. Network coherence: a scenius is a reinforcing ecosystem, so wild variance across Voices reads as incoherence and has to stay legible as appropriate difference rather than random scatter. A redemptive bias toward access: the default leans toward more readers and practitioners served, not higher revenue per reader, refusing the extractive norms of the Christian publishing and conferencing economy. And pricing as formation: how a Voice prices their work is itself a statement about what kind of formation they think they are doing and with whom. The pricing model balances all four rather than maximizing any one. Source: end-user pricing strategy, May 2026.

### What "from $30,000" means for Solutions
Solutions pricing is shaped to the specific scope of the engagement rather than sold from a fixed menu. The figure "from $30,000" is a floor, not a typical price, because the six configurations range from optimizing existing tools to building network-scale deployments for institutions and denominations. The conversation about scope begins at the contact page tagged for Solutions, and the price follows the scope. The agent should quote "from $30,000, scoped per engagement" and not imply a single number. Source: /pricing copy prompt.

### Pricing governance for the network
The end-user pricing model is meant to live and be revised, not set once. Initial recommended bands are proposed by Movemental and ratified by senior Voices at the network's first formal convening. An annual review is conducted by a Pricing Council of three to five Voices elected by peers, with Movemental supplying the data. Outlier visibility is a transparency mechanism, not a veto: when a Voice prices more than twenty percent outside a band, the network dashboard surfaces it to peers, but the Voice is not required to change. A defined share of paid revenue across the network, recommended at five percent, flows into a shared scholarship pool that the Council allocates to under-resourced individuals and organizations. Source: end-user pricing strategy.

### What the pricing refuses
Movemental's pricing names what it refuses to do. It does not negotiate: the price is the same for a small church and a large denomination at each tier. It does not gate the methodology: the Field Guides are free, and teams who want to run the work themselves can. It does not run a hidden enterprise tier: there is no number above what is published. It does not pay its network in logos and exposure. It does not use urgency manipulation: no limited-time discounts, no "spots filling fast," no scheduled rate increases. It does not charge per seat: pricing is by engagement, because per-seat pricing rewards lock-in rather than belonging. Source: /pricing copy prompt.

---

## Part XIII: Source register and maintenance

### How to read the source register
This register tells the agent where each fact properly comes from and how current it is. For every source it records the title, the type (machine-readable text or image-only requiring OCR), the date, and what the document is the canonical home for. When two sources conflict, the register says so. Most current source material is dated May 2026; the agent should know its corpus date and say when a fact may be stale.

### Source types in the corpus
The corpus divides into three kinds. Machine-readable text sources, already ingested, include the origin and trajectory note, the fragmentation and authorship working papers, the Ferguson memo, the Scenii strategic frame and visible evidences, the Four-Stage Path logic, the three-minute narrative, the "How It Actually Works" companion, the Evergreen Engine guide, the end-user pricing strategy, the /pricing copy prompt, and the site map. The AI Reality Paper and the "How Movemental Uses AI" inventory were image-only and have been read by OCR. Still requiring OCR before ingestion are the Safety and Sandbox Field Guides, the Solutions Deployment Methodology, the four Playbooks (Church, Nonprofit, Institution, Movement Leader), the Nonprofit Use Cases, the Participation Agreement, the Youthfront MOU, the AI Credibility paper, the Fragmentation Inventory methodology, the Alan Hirsch Author Platform Manual, and the older SSSS field guide.

### Known internal discrepancies to reconcile
Four conflicts must be resolved at the source rather than papered over. First, the assessment specifications differ: ten-minute and fifty-question in one document; forty-five-minute, twenty-two-question, and six-dimension on the site; twenty-two-question and five-dimension in the system inventory. Second, the Safety Guidebook is framed as both "five layers" and "seven artifacts," and the mapping between them needs to be documented. Third, the Movement Voice count reads as twenty-five committed against a cap of one hundred in the Praxis deck and as "the hundred" elsewhere, so a single live number must be maintained. Fourth, the tagline differs between "A human network for the AI era" and "A wiser way to navigate AI," so the current one must be confirmed.

### Source authority hierarchy
When sources disagree, the agent follows a fixed order of authority. The live website wins for anything it publishes directly: pricing at `/pricing`, the assessment at `/assess`, Field Guide availability at `/field-guides`, and the evidence behind statistics at `/footnotes`. For AI-sector statistics, the AI Reality Paper is canonical until its annual re-validation supersedes it. For Movement Voice terms, the Participation Agreement is canonical once ingested. For the methodology's logic, the Four-Stage Path document and the Field Guides are canonical. Between two undated or equally dated internal documents, the more specific and operational one wins over the more general. Where the live source cannot be checked, the agent quotes the most recent dated document and says the figure is pending verification. The agent never blends two conflicting figures into a third that appears in no source.

### Re-validation cadence
Facts decay at different rates, and the agent re-checks accordingly. AI-sector statistics are re-validated annually, as the AI Reality Paper itself instructs. Pricing is re-checked on any change and verified against `/pricing` before quoting. The Movement Voice roster and count are re-checked on any change. Product status, including which Field Guides exist and whether the Path Bundle discount and the access mechanism are settled, is re-checked on any change. Every fact the agent states as current should be traceable to a dated source.

---

*Phase 1 of the knowledge base. Phases 2 through 4 (the why; the Scenii model and strategic proof; AI reality, Movemental's own AI use, and the product surface) are ready to write from documents in hand. Phase 5 (audiences and playbooks, governance and legal, voice and vocabulary and FAQ) is blocked until the image-only Playbooks and Participation Agreement are read and the live `/faq` and `/assess` pages are checked.*
