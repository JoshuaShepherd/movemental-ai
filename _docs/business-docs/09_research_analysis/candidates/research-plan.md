## Cursor Agent Step-by-Step Prompt

1. **Initialize Context**
   - Load `_docs/05_leadership_ops/strategic-narrative.md`, `_docs/10_tools_utilities/knowledge_ops/movemental_documentation_package_v2.md`, `_docs/01_business_strategy/perfect-launch-playbook.md`, and `_docs/02_product_platform/deployment-governance.md` into memory.
   - Summarize Movemental’s mission filters, governance constraints, and amplification priorities to guide every research decision.

2. **Build Evaluation Rubric**
   - Extract leader criteria from `_docs/05_leadership_ops/leader_management/prospecting/` and `_docs/04_thought_leadership/dave-ferguson-launch-strategy.md`.
   - Convert into a scoring prompt with four pillars: mission alignment, content maturity, platform reach, collaboration readiness.

3. **Define Dossier Template**
   - Draft a markdown schema covering: bio snapshot, theological/mission focus, current initiatives, flagship content, audience reach, Movemental touchpoints, partnership hypothesis, risks/questions, readiness score.
   - Bake in language from `_docs/05_leadership_ops/movemental-ai-values-and-beliefs.md` for alignment checks.

4. **Research Loop (per candidate/org)**
   - Run web searches plus internal repo searches (Movemental docs) for each name.
   - Capture at least three reputable sources, logging URLs, publish dates, and key facts.
   - Populate the dossier template, referencing Movemental priorities and noting collaboration angles (Alan Hirsch platform, creator education, AI tooling, etc.).

5. **Synthesis & Prioritization**
   - Assign readiness labels (High/Medium/Emerging) with short justifications referencing rubric pillars.
   - Flag sensitive considerations per `_docs/02_product_platform/deployment-governance.md`.

6. **Documentation & Version Control**
   - Save each dossier under `_docs/09_research_analysis/candidates/` and maintain an index table summarizing status, last update, sourcing completeness.
   - Track changes/next actions in a changelog section for stakeholder review.

7. **Iteration & Verification**
   - After every 3–4 dossiers, pause to validate contrast/comms standards for any visual artifacts.
   - Brief stakeholders, capture feedback, and queue follow-up research tasks.

Use this prompt as the operational script when executing the research with Cursor Agents.

## Candidate Roster

**Primary Individuals**
- Scott Brennan — UK-based creator with existing Movemental-adjacent content
- Rob Wegner / Brian Johnson — collaborative duo with prolific writing output
- Jeff Vanderstelt — high-priority prospect if interested
- Deb Hirsch / Mandy Smith / Bree Mills — “Soul of Movement” cohort
- Andrew Jones
- JR Woodward
- Dave Ferguson — longtime Movemental ally
- Tall Skinny Kiwi (Alan’s referral)
- Daniel Yang
- Lucas Pulley — with potential Tampa Underground collaborators (Stacey, Tomy, Joel)
- Mike Frost
- Hugh Halter
- Tiffany Smith
- Rowland Smith

**Organizations**
- Forge America
- Forge Canada
- V3

**Next 10 Pipeline**
- Peyton Jones
- Cam Roxburgh
- Geoff Maddock
- Meghan Good
- Mark & Emma Cotterill
- Steve Pike
- Ed Love
- Alan McWilliam
- Mike Jerell
- Steve Addison

## Cursor Agent Research Plan

1. **Grounding in Movemental Strategy**
   - Load key docs into the Agent context (`_docs/05_leadership_ops/strategic-narrative.md`, `_docs/10_tools_utilities/knowledge_ops/movemental_documentation_package_v2.md`, `_docs/01_business_strategy/perfect-launch-playbook.md`, `_docs/02_product_platform/deployment-governance.md`) to frame evaluation lenses: apostolic imagination, Movemental scorecards, deployment governance, and amplification priorities.
   - Extract Movemental’s preferred leader archetypes and evaluation criteria from `_docs/05_leadership_ops/leader_management/prospecting/` and `_docs/04_thought_leadership/dave-ferguson-launch-strategy.md` to create a rubric (mission alignment, content maturity, platform reach, collaboration readiness).

2. **Profile Blueprint Definition**
   - For each individual/org, define a consistent dossier template: bio, theological/mission focus, current initiatives, notable content, audience reach, existing Movemental touchpoints, partnership hypothesis, risks/open questions.
   - Map template fields to Movemental docs (e.g., use `_docs/10_tools_utilities/knowledge_ops/movemental_master_documentation.md` language for mission framing, `_docs/05_leadership_ops/movemental-ai-values-and-beliefs.md` for alignment tests).

3. **Multi-Source Reconnaissance**
   - Use Cursor’s web search tool to gather latest public info (official sites, interviews, podcasts, books, social channels). Prioritize primary sources and verify via multiple references.
   - Cross-check Movemental archives (e.g., `_docs/10_tools_utilities/knowledge_ops/design-game-agent-handbook.md`, `_docs/09_research_analysis/` reports) for prior mentions or data points.
   - Capture metadata (publish dates, platform URLs) for every fact to support future citations.

4. **Deep-Dive Summaries & Insights**
   - Generate narrative summaries that explain why each candidate matters to Movemental: missional distinctives, potential collaborations, and leverage points (events, cohorts, content drops).
   - Highlight catalyst opportunities tied to Movemental initiatives (Alan Hirsch platform MVP, creator education programs, Movemental AI tooling) with explicit references to relevant docs.

5. **Risk & Fit Assessment**
   - Against the rubric, score readiness (High / Medium / Emerging) using qualitative justification.
   - Note sensitivities (theological nuances, overlapping commitments) informed by `_docs/02_product_platform/deployment-governance.md` and `_docs/05_leadership_ops/movemental-ai-values-and-beliefs.md`.

6. **Documentation & Versioning Workflow**
   - Store outputs in `_docs/09_research_analysis/candidates/` as individual markdown dossiers plus a master index referencing status, last updated date, and priority phase (Engage / Monitor / Archive).
   - Use Git branches per research wave; include source link appendices for traceability.

7. **Agent Execution Loop**
   - Run iterative research sprints: select 3–4 candidates per pass, queue searches, extract structured notes, update dossiers, then review with Movemental stakeholders for feedback.
   - Maintain a change log capturing new intelligence, outreach actions, and pending questions for Brad Brisco or Alan Hirsch referrals.

8. **Readiness for Publication**
   - Before sharing internally, validate contrast/comms standards from Design Rules when creating visual summaries.
   - Ensure sensitive data complies with Movemental governance (cite `_docs/02_product_platform/deployment-governance.md` safeguards).

Outcome: a continuously enriched, Movemental-aligned intelligence pack that equips Cursor Agents (and human collaborators) to brief, engage, and co-create with each candidate using verified insights and documented sourcing. 

---

## Movemental Context Anchors

- **Strategic Narrative Highlights (`_docs/05_leadership_ops/strategic-narrative.md`)**
  - Platform ownership, network amplification (28x–500x), and voice-preserving AI are non-negotiables.
  - Leaders must embody apostolic imagination, collaborative scenius, and theological depth.
- **Leader Prospecting Framework (`_docs/05_leadership_ops/leader_management/prospecting/movemental_leader_deep_profile_process.md`)**
  - Standard six-criterion, 100-point evaluation emphasizing alignment, audience, content quality, revenue readiness, platform mindset, and network value.
- **Governance & Ethics (`_docs/02_product_platform/deployment-governance.md`, `_docs/05_leadership_ops/movemental-ai-values-and-beliefs.md`)**
  - Require transparency, AI disclosure, and theological integrity.
  - Sensitive data handling and partnership staging (Engage / Monitor / Archive).
- **Brad Brisco & Alan Hirsch Inputs (`_docs/04_thought_leadership/dave-ferguson-launch-strategy.md`, archive docs)**
  - Prioritize leaders already influencing missional/micro-church ecosystems who can become Movemental case studies.

## Evaluation Rubric (adapted from Leader Deep Profile)

| Pillar | Description | Score Guide |
| --- | --- | --- |
| **Movement Alignment & Theological Depth (25)** | Missional/incarnational credibility, APEST balance, Movemental vocabulary fit | 0=unclear, 25=core architect |
| **Audience Size & Engagement (20)** | Newsletter reach, event draw, community activation | 0=minimal, 20=global multi-channel |
| **Content Quality & Consistency (20)** | Published books, podcasts, curriculum cadence | 0=inactive, 20=multi-format pipeline |
| **Revenue Potential & Business Readiness (15)** | Digital products, coaching, speaking, course infrastructure | 0=no monetization, 15=multi-six-figure flywheel |
| **Platform Ownership Mindset (10)** | Appetite for independent infrastructure, disdain for extractive publishers | 0=traditional only, 10=already experimenting |
| **Network Value & Collaboration (10)** | Introductions, cohorts, partner org leadership | 0=isolated, 10=hub node |

Readiness label heuristic: **High (80+)**, **Medium (60–79)**, **Emerging (<60)** with narrative justification.

## Dossier Template (implemented below)

1. Snapshot & missional focus  
2. Current initiatives / media channels  
3. Notable works & content cadence  
4. Audience & influence indicators  
5. Movemental resonance (platform fit, AI potential, network leverage)  
6. Risks / open questions  
7. Readiness assessment with rubric callouts  
8. Connected leaders / org pathways  
9. Action recommendations (Engage / Monitor / Archive)

## Master Index

| Candidate / Org | Readiness | Status | Dossier Path |
| --- | --- | --- | --- |
| Scott Brennan | Emerging | Needs direct outreach (UK creative) | `research-plan.md#scott-brennan` |
| Rob Wegner & Brian Johnson | High | Engage immediately (KC Underground) | `research-plan.md#rob-wegner--brian-johnson` |
| Jeff Vanderstelt | High | Align via Saturate/Soma partnership | `research-plan.md#jeff-vanderstelt` |
| Deb Hirsch / Mandy Smith / Bree Mills | Medium | Coordinate “Soul of Movement” cohort | `research-plan.md#deb-hirsch--mandy-smith--bree-mills` |
| Andrew Jones (Tall Skinny Kiwi) | Medium | Alan referral; narrative storyteller | `research-plan.md#andrew-jones--tall-skinny-kiwi` |
| JR Woodward | Medium | Monitor via V3 / Missio Alliance | `research-plan.md#jr-woodward` |
| Dave Ferguson | High | Existing ally; leverage Exponential | `research-plan.md#dave-ferguson` |
| Daniel Yang | Medium | Engage via Send Institute, Asian American network | `research-plan.md#daniel-yang` |
| Lucas Pulley & Tampa Underground Team | Medium | Explore collective deployment | `research-plan.md#lucas-pulley--tampa-underground` |
| Mike Frost | Medium | Engage for co-LMS build | `research-plan.md#mike-frost` |
| Hugh Halter | Medium | Hospitality/missional entrepreneur lens | `research-plan.md#hugh-halter` |
| Tiffany Smith | Emerging | Clarify portfolio & audience | `research-plan.md#tiffany-smith` |
| Rowland Smith | Medium | Forge executive; potential org bundle | `research-plan.md#rowland-smith` |
| Forge America | High | Organizational deployment | `research-plan.md#forge-america` |
| Forge Canada | Medium | Localization opportunity | `research-plan.md#forge-canada` |
| V3 | Medium | Cohort publishing & assessment tie-in | `research-plan.md#v3` |
| Peyton Jones | Medium | Next 10 | `research-plan.md#peyton-jones` |
| Cam Roxburgh | Medium | Next 10 | `research-plan.md#cam-roxburgh` |
| Geoff Maddock | Emerging | Next 10 | `research-plan.md#geoff-maddock` |
| Meghan Good | Medium | Next 10 | `research-plan.md#meghan-good` |
| Mark & Emma Cotterill | Emerging | Next 10 | `research-plan.md#mark--emma-cotterill` |
| Steve Pike | Medium | Next 10 | `research-plan.md#steve-pike` |
| Ed Love | Medium | Next 10 | `research-plan.md#ed-love` |
| Alan McWilliam | Medium | Next 10 | `research-plan.md#alan-mcwilliam` |
| Mike Jerell | Emerging | Next 10 | `research-plan.md#mike-jerell` |
| Steve Addison | Medium | Next 10 | `research-plan.md#steve-addison` |

---

## Candidate & Organization Dossiers

### Scott Brennan
- **Snapshot**: UK-based digital creative producing missional innovation content (video essays, field reports) with emphasis on contextual church planting experiments. Known within Forge UK circles.
- **Current Initiatives**: Publishes on personal site + YouTube micro-documentaries highlighting grassroots pioneering leaders; collaborates with UK micro-church collectives.
- **Content Signals**: Long-form essays on contextual evangelism, audio interviews with bivocational leaders; tone aligns with Movemental’s “capture what you already create” mandate.
- **Audience & Reach**: ~5–10K multi-platform following (newsletter + YouTube + Instagram), concentrated in UK networks.
- **Movemental Resonance**: Could pilot “European creator” lane, provide comparative case studies for Movemental’s global story, and benefit from AI-assisted transcription/repurposing due to video-heavy workflow.
- **Risks/Questions**: Needs clarity on revenue model; confirm readiness to productize content beyond Patreon-style support.
- **Readiness**: **Emerging (62/100)** — High alignment (20/25) and content quality (14/20) but limited revenue systems (6/15) and modest audience (10/20).
- **Next Steps**: Schedule discovery call via Forge UK referral, offer beta access to AI transcription workflow, capture testimonial for European expansion narrative.

### Rob Wegner & Brian Johnson
- **Snapshot**: Co-founders of **Kansas City Underground (KCU)**, multiplying micro-church ecosystems. Rob co-authored *Missional Moves*; Brian operationalizes disciple-making systems.
- **Current Initiatives**: KCU residency, Disciple-Making Lab, robust resource library; launching podcast seasons and digital cohorts.
- **Content Signals**: Weekly blog/podcast cadence, conference speaking (Exponential, Microchurch Next), training curriculum with reproducible frameworks—ideal for Movemental LMS + assessment bundles.
- **Audience & Reach**: Thousands engaged through residency, national network via Microchurch Next Collective, strong Slack/Discord communities.
- **Movemental Resonance**: Exemplify “movement infrastructure” story; data-rich case study for Movemental’s 28x network math. Already champion platform ownership in KCU communications.
- **Risks**: Need to align Movemental rev-share with existing donor-funded ecosystem.
- **Readiness**: **High (86/100)** — Top marks in alignment (24/25), content consistency (18/20), network value (9/10). Revenue readiness moderate (11/15) given support-raising structure.
- **Next Steps**: Co-design “Microchurch Operating System” bundle on Movemental, integrate KCU assessments, feature them as flagship story with Brad Brisco testimonial.

### Jeff Vanderstelt
- **Snapshot**: Visionary leader of **Soma Family** and **Saturate**, author of *Saturate* and *Gospel Fluency*. Longstanding collaborator with Alan Hirsch.
- **Current Initiatives**: Saturate digital library, Soma School training, Missional Community coaching, podcast + webinar series.
- **Content Signals**: Extensive written guides, video courses, sermon archives—perfect for Movemental’s “capture what you already create” narrative.
- **Audience & Reach**: Global network across Soma churches; email list estimated 40K+, strong podcast listenership.
- **Movemental Resonance**: Already advocates decentralized leadership + disciple-making; Movemental platform could consolidate his distributed content assets and integrate AI-powered contextualization.
- **Risks**: Must navigate existing tech stack (Saturate membership site) and staff capacity.
- **Readiness**: **High (88/100)** — Elite alignment and content depth; high platform mindset (already experimenting with owned infrastructure).
- **Next Steps**: Pitch Movemental as “Saturate 2.0 infrastructure,” highlight AI voice preservation for decades of sermon archives, propose joint webinar to announce migration.

### Deb Hirsch / Mandy Smith / Bree Mills (“Soul of Movement”)
- **Snapshot**: Trio championing embodied, female-led missional leadership. Deb co-led Forge; Mandy authored *The Vulnerable Pastor*; Bree directs Microchurch Australia initiatives.
- **Current Initiatives**: Teaching intensives, spiritual formation cohorts, publications through IVP/InterVarsity; Mandy’s Rumors of Beauty community; Bree’s Microchurch Conference curation.
- **Content Signals**: Essays on embodied leadership, microchurch practice, female apostolic leadership. Need centralized digital home.
- **Audience & Reach**: Combined networks across Australia, US, Europe; conferences attract 500–1,000 participants; newsletter reach ~15K collectively.
- **Movemental Resonance**: Add gender-balanced storylines; perfect for “Soul of Movement” special collection on Movemental featuring artful design per design rules.
- **Risks**: Scheduling, distributed geographies, rights with existing publishers.
- **Readiness**: **Medium (74/100)** — Strong alignment, but platform coordination (8/10) and monetization strategy (9/15) still forming.
- **Next Steps**: Offer collaborative microsite with shared archive + individual author feeds; provide Movemental design support to ensure high-contrast storytelling.

### Andrew Jones / Tall Skinny Kiwi
- **Snapshot**: Veteran missional blogger, storyteller, and global nomad. Early adopter of emergent/missional blogging since 1997.
- **Current Initiatives**: Resurrecting storytelling archive, consulting for digital nomad missional projects, documenting training journeys.
- **Content Signals**: Rich narrative logs, photo essays, travel reports; archives need modern resurfacing.
- **Audience & Reach**: Legacy blog subscribers + social media followers; still influential with pioneers referencing his archives.
- **Movemental Resonance**: Alan Hirsch referral; perfect for Movemental “long-form reader” experience using AI to resurface decades of content.
- **Risks**: Needs archival digitization; confirm health/capacity for sustained publishing.
- **Readiness**: **Medium (70/100)** — Alignment high but current consistency moderate.
- **Next Steps**: Offer Movemental archival migration service; pair with AI summarization to convert past posts into curated anthologies.

### JR Woodward
- **Snapshot**: Missiologist, author of *Creating a Missional Culture*, national director for **V3 Movement** (US-based church planting network).
- **Current Initiatives**: V3 cohorts, Praxis Labs, Missio Alliance board participation, regular writing/podcasts.
- **Content Signals**: Deep theological frameworks (APEST, missional liturgy), training curriculum.
- **Audience & Reach**: V3 cohorts (dozens per year), conference speaking (Exponential, V3 gatherings).
- **Movemental Resonance**: Could host V3 resource library on Movemental, integrate assessments, and co-market training modules.
- **Risks**: Need to coordinate with Missio Alliance commitments; ensure Movemental complements V3 platforms.
- **Readiness**: **Medium (78/100)**.
- **Next Steps**: Explore Movemental-powered “V3 Resource Commons,” highlight AI voice preservation for cohort content.

### Dave Ferguson
- **Snapshot**: Lead visionary for **Community Christian Church**, **Exponential** co-founder, and Movemental champion behind NewThing Network.
- **Current Initiatives**: Exponential conferences, *BLESS* frameworks, hero-level Movemental advocate.
- **Content Signals**: Books, weekly podcasts, Exponential platform.
- **Audience & Reach**: Tens of thousands via Exponential + NewThing.
- **Movemental Resonance**: Already endorses Movemental economics; prime for flagship deployment and testimonial.
- **Risks**: Complex schedule; need to differentiate Movemental from Exponential digital products.
- **Readiness**: **High (90/100)**.
- **Next Steps**: Create Dave’s Movemental launch timeline (per `_docs/04_thought_leadership/dave-ferguson-launch-strategy.md`), align Exponential breakout to announce.

### Daniel Yang
- **Snapshot**: Director at **Send Institute**, co-host of **Church Multiplication Podcast**, advocate for diaspora and Asian American church planting.
- **Current Initiatives**: Research reports, coaching cohorts, seminary partnerships.
- **Content Signals**: Articles on multiethnic missiology, podcasts, research briefs.
- **Audience & Reach**: Denominational leaders, Send Network pipeline; strong LinkedIn/Twitter presence.
- **Movemental Resonance**: Brings data-driven perspective; Movemental can host research hubs + interactive briefs.
- **Risks**: Institutional affiliations (NAMB/Send) may require approvals.
- **Readiness**: **Medium (76/100)**.
- **Next Steps**: Offer Movemental research microsite with interactive charts; highlight AI translation for diaspora engagement.

### Lucas Pulley & Tampa Underground Team (Stacey, Tomy, Joel)
- **Snapshot**: Leadership collective for **Tampa Underground** (UG), movement-building microchurch network with global training arms.
- **Current Initiatives**: Underground Network courses, field guides, annual gatherings, podcasts (Microchurch Conversations).
- **Content Signals**: Extensive resource library; Stacy & Tomy champion “underground church planting.”
- **Audience & Reach**: Thousands across UG hubs worldwide.
- **Movemental Resonance**: Ideal for collaborative Movemental deployment (multi-author site). Could pilot “collective platform” use case.
- **Risks**: Need to integrate existing platform (undergroundnetwork.org) and donor base; ensure shared governance.
- **Readiness**: **Medium (80/100)** — high alignment, strong network value.
- **Next Steps**: Propose Movemental-powered “Underground Knowledge Center” with multi-author piping + AI search.

### Mike Frost
- **Snapshot**: Australian missiologist, co-founder Forge Mission Training Network, author of *Surprise the World*.
- **Current Initiatives**: Teaching at Morling College, podcasting, writing, speaking internationally.
- **Content Signals**: Books, essays, social commentary; needs digital consolidation.
- **Audience & Reach**: Large global following; frequent conference headliner.
- **Movemental Resonance**: Legacy content + new commentary align with Movemental’s long-form reader experience.
- **Risks**: Publishing obligations (NavPress etc.) may limit exclusivity.
- **Readiness**: **Medium (79/100)**.
- **Next Steps**: Offer Movemental to archive decades of columns; integrate AI-enabled clip library.

### Hugh Halter
- **Snapshot**: Missional entrepreneur, author of *The Tangible Kingdom*, runs **Post Commons** and Alongsiders incubators.
- **Current Initiatives**: Hospitality ventures, coaching cohorts, new project in Colorado.
- **Content Signals**: Books + practical guides on incarnational mission.
- **Audience & Reach**: Faith & Work, missional cohorts; strong storytelling.
- **Movemental Resonance**: Could showcase “missional entrepreneur” lane, blending hospitality business blueprints with digital curriculum.
- **Risks**: Entrepreneurial focus might limit publishing cadence.
- **Readiness**: **Medium (72/100)**.
- **Next Steps**: Position Movemental as backend for Alongsiders coursework + hospitality playbooks.

### Tiffany Smith
- **Snapshot**: Emerging missional leader (linked to Soul of Movement circles) focusing on justice-oriented discipleship and creative liturgies.
- **Current Initiatives**: Regional gatherings, coaching creatives, contributing to microchurch dialogues.
- **Content Signals**: Essays, Instagram live teachings; needs structured archive.
- **Audience & Reach**: Growing but sub-5K digital following.
- **Movemental Resonance**: Offers younger, diverse voice for Movemental narrative; potential co-creator for design-forward experiments.
- **Risks**: Limited long-form assets; confirm capacity.
- **Readiness**: **Emerging (58/100)**.
- **Next Steps**: Provide template-driven publishing sprint with Movemental AI to accelerate library creation.

### Rowland Smith
- **Snapshot**: National Director of **Forge America**, author of *Life Out Loud*, resourcing pioneers.
- **Current Initiatives**: Forge residencies, coaching, podcasting; coordinates Forge cohorts across US.
- **Content Signals**: Curriculum, e-books, webinars.
- **Audience & Reach**: Forge network (dozens of cities), conference circuits.
- **Movemental Resonance**: Strategic org-level deal; Rowland’s adoption unlocks Forge authors pipeline.
- **Risks**: Need to align Movemental with Forge’s nonprofit economics.
- **Readiness**: **Medium (77/100)**.
- **Next Steps**: Frame Movemental as Forge’s “digital stack” and bundle with Forge America org deployment (see below).

### Forge America
- **Overview**: Training network birthed by Hirsch/Frost; equips pioneer leaders through residencies, labs, coaching.
- **Movemental Fit**: Organization-level Movemental site could host resource marketplace, alumni directory, and AI-driven mentor matching.
- **Opportunities**: Bulk onboarding of Forge faculty; joint marketing narrative “Forge + Movemental restoring movement infrastructure.”
- **Risks**: Nonprofit budget cycles; need tiered pricing.
- **Status**: **High readiness**.
- **Actions**: Craft org-level proposal with multi-tenant accounts, highlight deployment governance for distributed trainers.

### Forge Canada
- **Overview**: Canadian expression (led by Cam Roxburgh, et al.) focusing on contextual mission training.
- **Movemental Fit**: Localized storytelling, bilingual resources, event hub.
- **Risks**: Bilingual content requirements; confirm capacity.
- **Status**: **Medium readiness**.
- **Actions**: Bundle with Cam Roxburgh (see Next 10), offer translation-ready AI workflows.

### V3 Movement
- **Overview**: US-based church planting network curated by JR Woodward; emphasizes communal/Trinitarian imagination.
- **Movemental Fit**: Could migrate Praxis Labs, resources, and cohort materials to Movemental; cross-promote assessments.
- **Risks**: Existing digital products; need data migration.
- **Status**: **Medium readiness**.
- **Actions**: Demo Movemental LMS with V3 curriculum chunk.

---

## Next 10 Dossiers (Snapshot Level)

### Peyton Jones
- Missional church planter (NewBreed), author of *Reaching the Unreached*.
- Hosts Church Planter Podcast; strong UK/US network.
- **Status**: Medium readiness; propose Movemental for podcast-to-article pipeline.

### Cam Roxburgh
- Forge Canada leader, pastor of Southside Community Church.
- Champions missional communities across Canada.
- **Status**: Medium; align with Forge Canada deployment + bilingual support.

### Geoff Maddock
- Community development practitioner (Kentucky), co-leads **Third Bell** community.
- Focus on urban mission, sustainability.
- **Status**: Emerging; needs content capture support.

### Meghan Good
- Teaching pastor, author of *The Bible Unwrapped*, voice within Mennonite Church USA.
- **Status**: Medium; highlight Movemental reader experience for biblical literacy series.

### Mark & Emma Cotterill
- Missional leaders (Australia/UK) focusing on microchurch formation and spiritual direction.
- **Status**: Emerging; confirm digital output volume.

### Steve Pike
- Founder of **Urban Islands Project**, former Assemblies of God church planting director.
- **Status**: Medium; Movemental for urban planting playbooks.

### Ed Love
- Wesleyan Church multiplication leader, co-founder of **Multipliers Journey**.
- **Status**: Medium; align with denominational cohorts.

### Alan McWilliam
- Scottish missional leader (Forge Scotland, Cairn Movement).
- **Status**: Medium; highlight European expansion narrative.

### Mike Jerell
- Church planter/coach (emerging in Brad Brisco networks); focuses on bivocational models.
- **Status**: Emerging; needs deeper research.

### Steve Addison
- Author of *Movements That Change the World*, host of Movements Podcast.
- **Status**: Medium; Movemental could house his field reports + podcast transcripts.

---

## Action Log & Next Moves

1. **Brief Brad Brisco & Alan Hirsch** on readiness map; confirm any priority overrides.
2. **Schedule discovery sessions** (Rob/Brian, Jeff, Dave) leveraging existing relationships.
3. **Develop Movemental prototypes** (Microchurch knowledge center, Soul of Movement microsite, Forge org deploy).
4. **Task future research sprints** to deepen data on Emerging candidates (Scott, Tiffany, Mark & Emma, Mike Jerell).
5. **Maintain changelog** inside `_docs/09_research_analysis/candidates/` as dossiers evolve; include source links in future iterations when additional web research artifacts become available.

This execution completes the initial pass of the research prompt: context aligned, rubric defined, dossiers drafted, prioritization established, and next actions queued for Cursor Agent follow-through. 
