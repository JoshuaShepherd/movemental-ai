# Aggregated repository: Safety & Sandbox + audiences (full text)

This file **duplicates** primary source material from the repo into one place for sorting, redlining, and alignment. It is **not** a legal or pricing authority over the PDF-backed SSOT or signed contracts.

**How to read.** SSOT excerpts are verbatim from `docs/markdown/SSOT/movemental-full-path/`. App content is verbatim from `src/` as indicated. Where the same idea appears twice with different numbers (e.g. seven MVP Safety items vs fourteen checklist rows), **both** appear here so editors can reconcile.

**Section map.** A Terminology (excerpt) · B Movement-leaders doctrine (full) · C SSOT Part 2 Safety MVP (full) · D SSOT Part 3 Safety working SOT (full) · E SSOT Part 5 Sandbox (full) · F Thesis “The path” (excerpt) · G `shared-path-data.ts` (Safety/Sandbox + checklist) · H–J Safety/Sandbox marketing pages · K `/path` excerpt · L `SegmentPathway` segment copy · M FAQ “The Path” · N ai-studio `path-data` stage lines · O case studies · P Voices list · Q–R Who we serve / Movement leaders pages · S `SafetyContent` · T Network engagements JSX · U root metadata · Z HTML note.

---

## A. Terminology registers (endorsed + deprecated, excerpt)

Source: `docs/content/terminology-registers.md` through end of **Deprecated** section.

# Movemental terminology registers

Source of truth for the `movemental-prose` skill. Add, edit, or demote terms here — the skill reads this file at invocation. Keep each term on one line so the skill can grep cleanly.

Format: plain markdown headings + bulleted term rows. Each row: `- **term** — usage note or replacement`.

---

## Endorsed — use without gloss

These are Movemental's own vocabulary. The skill leaves them alone.

- **AI Stewardship Sequence** — Movemental's canonical AI adoption framework. First mention always expanded: "the AI Stewardship Sequence: Safety, Sandbox, Skills, Solutions." Subsequent mentions can say "the AI Stewardship Sequence" or just use the stage names once context is clear. Optional supporting line where helpful: "The order is the framework." Acronym-first naming ("SSSS," "4S") is deprecated — do not use in new writing.
- **Safety / Sandbox / Skills / Solutions** — the four ordered stages of the AI Stewardship Sequence; use the stage names freely once the sequence has been named in the piece.
- **Fragmentation / Integration / Activation / Formation / Multiplication** — the five stages.
- **Movement leader / nonprofit / church / institution** — the four audience arms.
- **Library / pathways / voice** — the artefact trio.
- **Core library** — the small body of anchor pieces (twenty to fifty) an organisation stands on.
- **Fragmentation tax** — the cost of unconnected work compounding.
- **Senior pastor / executive director / founder / institutional lead** — named roles in addresses.
- **Two intelligences** — in a piece that defines it once; assume definition in book context.
- **Governance / conviction / boundaries** — the three layers of Safety.

---


---


## B. Canonical doctrine: movement leaders vs organizations (full)

# Canonical doctrine: movement leaders as an ecosystem layer (not an audience funnel)

**Status:** Canonical (authoritative)
**Created:** 2026-04-21
**Supersedes drift:** any treatment of movement leaders as a standard parallel audience segment beside churches, nonprofits, and institutions.
**Related:** [../plans/movement-leaders-network-social-proof.md](../plans/movement-leaders-network-social-proof.md), [../notes/site-pages-architecture-and-navigation-map.md](../notes/site-pages-architecture-and-navigation-map.md), [../audit/site-pages-inventory.md](../audit/site-pages-inventory.md), [../prompts/site-wide-navigation-ia-proposal.md](../prompts/site-wide-navigation-ia-proposal.md).

---

## The rule

**Organizations are the primary implementation audiences.
Movement leaders are a distinct trusted-voice and ecosystem layer, not merely a parallel funnel segment.**

Do not default to placing movement leaders inside audience or funnel architecture unless there is a specific campaign or product reason to do so.

---

## Why this matters

Earlier iterations of the site implicitly treated **movement leaders** as a fourth audience card beside churches, nonprofits, and institutions. That reading is structurally wrong for what Movemental is and how it will grow:

1. Churches, nonprofits, and institutions are **implementation audiences.** They adopt the platform, do formation work inside it, and are the right subjects of audience architecture, pricing, onboarding, and implementation service copy.
2. Movement leaders are not primarily buyers of a generic offering. Their public bodies of work are **the kind of fragmented informational and relational intelligence Movemental exists to serve** — and their standing, credibility, and networks are what make Movemental legible as a serious platform in the first place.

Flattening the two into one audience funnel:

- muddles the promise ("is this a product for me, or am I named on the site as a voice?"),
- obscures accountability (founders and trusted voices have different responsibilities to the work), and
- blocks future product surfaces — voice-aware agents, curated corpora, co-authored SKUs — that only make sense when movement leaders are framed as an **ecosystem layer** rather than a conversion segment.

---

## The distinction, made explicit

### Organizations — implementation audiences

Churches, nonprofits, and institutions belong in:

- audience architecture (`/organizations`, `/churches`, `/nonprofits`, `/institutions`)
- funnel and conversion logic (pricing, sandbox season, engagement inquiry)
- service / application / implementation framing
- assessment logic (`/assess`, `/assess/formation`)
- "who is Movemental for" / "use-case" framing

The `/organizations` hub and segment pages stay the primary ramp for *someone who might run Movemental inside their organization.*

### Movement leaders — trusted-voice, corpus, ecosystem layer

Movement leaders belong in:

- **trust and proof architecture** (social proof, "built with," named voices)
- **ecosystem framing** (who Movemental is embedded with in the field)
- **"built with" language** on narrative pages
- **product and corpus explanation** (whose bodies of work inform frameworks and, when consented, inform agents and curated reading)
- **future voice-aware platform framing** (per-voice pages, eventually voice-faithful agents / courses / articles when consent + corpus are ready)

Movement leaders **should not** be treated by default as:

- just another audience card beside churches, nonprofits, and institutions
- a standard funnel segment with its own conversion flow
- a recruiting or roster-growth mechanism ("apply to be featured")
- a generic partner or logo strip

Where movement leaders *do* legitimately appear as an audience — e.g. the `/movement-leaders` page, which speaks **to** authors/teachers whose own life's work has fragmented — the page reads as a **fit definition + practitioner playbook**, not as a parallel audience funnel. Its purpose is to help a movement leader recognize themselves in the five-failures / five-moves shape, not to sit beside churches and nonprofits in "who do we sell to."

---

## Preferred public language

Default public phrase:

> **Trusted voices**

Acceptable supporting phrases:

- Voices shaping the work
- Built with trusted movement voices
- Leaders shaping the work
- In conversation with movement leaders including…
- Shaped with a circle of movement leaders

Avoid as the primary public label unless there is a strong reason:

- Scenius
- Committed voices
- Ambassadors
- Influencers
- Advisors
- Partners
- Roster

"Scenius" may remain **internal** (module names, code comments, occasional explanatory subtitle for readers who already know the word). It should not be the H1 or the nav label.

---

## Where this shows up in the codebase

Single source of truth: this doc.

| Surface | Expected treatment |
|---------|--------------------|
| `src/components/nav/nav-links.ts` → **"Audiences"** menu | Segments column lists **only** the organization implementation audiences (Churches · Nonprofits · Institutions). The "Start here" column keeps `/organizations` + `/who-is-a-movement-leader` (definition) + `/movement-leaders` (practitioner fit) so the movement-leader surfaces are findable — but they are framed as *definition + fit*, not as a fourth parallel segment card. |
| `src/components/nav/nav-links.ts` → **"About"** menu | **"Trusted voices"** link to `/voices`, not "Committed voices." Subtitle may keep the Scenius wording one click deeper. |
| `/voices` (`src/components/sections/voices/voices-page-content.tsx`) | Primary public label is **Trusted voices**. Hero, intro, and invitation read as proof + ecosystem, not recruitment. Roster data still lives in `src/lib/committed-voices.ts` — the module name is internal and can stay as-is. |
| `src/components/sections/voices/voices-strip.tsx` | Default eyebrow and heading are calm "built with / shaped with trusted movement voices." |
| `/movement-leaders` page | Framed as a practitioner fit + five-failures diagnosis for authors/teachers whose own work has fragmented. Uses the voices strip as *proof*, not as part of an audience-selector pattern. |
| `/who-is-a-movement-leader` | Working definition. Opens with a short note that movement leaders are *a distinct ecosystem layer*, not a standard audience segment — so the reader knows what category they are in. |
| `/organizations` hub | Copy keeps implementation-audience framing: churches / nonprofits / institutions. If a sentence acknowledges movement leaders, it points to `/voices` as the *trusted-voice layer* rather than listing them as a fourth segment card. |
| `/about` | "Who Movemental serves" chip list uses only the three organization audiences. A separate sentence or chip surface names movement leaders as the trusted-voice layer and links to `/voices` — not a fourth peer chip. |
| Home page and other proof surfaces | If a trust/proof band references movement leaders, it uses "trusted voices" / "built with" language linking to `/voices`. |

---

## Consequences for future agents

1. **Do not add movement leaders as a fourth sibling card** in any audience hub, funnel comparison, or segment grid unless a specific campaign requires it — and even then, do so with explicit doctrinal justification.
2. **Do not introduce a movement-leader recruiting surface** ("apply to be a committed voice," "nominate a leader"). Voice expansion is a private editorial decision, not a form submission.
3. **Do not rename `/voices` into an audience segment.** `/voices` is the trusted-voice hub; it is governed by this doctrine, not by audience funnel logic.
4. **Do prefer "trusted voices"** as the public label in copy, nav, metadata, and proof strips. Keep internal type names (`CommittedVoice`, `COMMITTED_VOICES`) as-is to avoid churn; the split between *internal data model* and *public label* is intentional.
5. **When writing new strategy or prompt docs** that describe audience architecture, explicitly separate the two layers (implementation audiences vs trusted-voice / ecosystem layer) rather than enumerating "movement leaders, churches, nonprofits, institutions" as a flat list.

---

## One-sentence version for pull requests and agent briefs

> Movement leaders are not primarily a demand-generation segment for Movemental — they are a credibility-bearing, wisdom-bearing, ecosystem-shaping layer of the platform's public identity and future development. Churches, nonprofits, and institutions are the primary implementation audiences.

If a change would muddle that distinction, stop and re-read this doc before shipping it.


## C. SSOT Part two — Minimum viable Safety checklist (verbatim)

---
ssot: movemental-full-path
source_pdf: movemental_full_path_source_of_truth_v2.pdf
extracted_at: 2026-05-07
extract_tool: pdf-parse 1.1.1 (Node, one-off npm install in /tmp)
pdf_sha256: 7712770678614da366b3e622610b2a01dc28dcf811ce77394ad3e0908580d5ad
supersedes: []
status: draft
---

# Part two: the minimum viable Safety checklist
The Safety stage exists to do a specific, concrete, urgent piece of work: to bring an organization's AI use out of the shadows and into governed daylight, in the smallest set of artifacts that responsibly address the documented reality. It is not a full risk-management program. It is not a multi-month consulting engagement. It is the minimum that protects the organization from the harms the data shows are already arriving. The MVP Safety checklist contains seven items. Six are written artifacts. The seventh is a single act of organizational communication. Together they take roughly two weeks to draft and ratify when an experienced facilitator is involved, and somewhat longer when the organization works through them independently. The seven items in summary

- Item 1. AI Use Charter — the principles and posture document

- Item 2. Acceptable Use Policy — the operational rules for staff

- Item 3. Data Handling Standards — what data may touch which tools

- Item 4. Disclosure and Attribution Standard — when AI involvement is named publicly

- Item 5. Pastoral / Programmatic / Educational Care Boundaries — where AI must not go

- Item 6. Voice Cloning and Impersonation Response Plan — the protocol for the active criminal threat

- Item 7. Communication to the Constituent Base — the public act

What this list deliberately does not include Several items that appear on more elaborate AI governance frameworks are not on this MVP list: vendor evaluation frameworks, formal AI risk registers, full incident response protocols beyond impersonation, vendor data processing agreements, and annual review processes. These are appropriate for organizations that have completed the MVP work and want to mature beyond it. They are not minimum-viable.


## D. SSOT Part three — Working source of truth, Safety stage (verbatim)

---
ssot: movemental-full-path
source_pdf: movemental_full_path_source_of_truth_v2.pdf
extracted_at: 2026-05-07
extract_tool: pdf-parse 1.1.1 (Node, one-off npm install in /tmp)
pdf_sha256: 7712770678614da366b3e622610b2a01dc28dcf811ce77394ad3e0908580d5ad
supersedes: []
status: draft
---

# Part three: the working source of truth
For each of the seven items, this section provides three things: the actual boilerplate text that can be templated and customized, the decisions the organization must make to customize the boilerplate, and Movemental's specific role at each of the three productization levels. The three productization levels referenced throughout this section are: Level 1: Free Toolkit. Downloadable field guide on movemental.ai. The organization completes the work itself using the boilerplate and questions provided. Free in exchange for email. Level 2: AI-Assisted Self-Service Product. A web product or Claude skill that walks an organization through structured intake (the decisions/questions) and generates draft artifacts (the boilerplate, customized) for the leadership to review and ratify. Priced at approximately $1,997. Level 3: Facilitated MVP Engagement. Two-week facilitated engagement with a Movemental facilitator who runs the leadership conversations, customizes the artifacts, and supports ratification. Priced at $5,000. Each item below documents the exact role Movemental plays at each level. This is the working layer for product build, facilitator training, and AI-assisted product configuration. Item 01: AI Use Charter What this is A short document — typically two to four pages — that names the organization's posture on AI. It declares the principles guiding AI use, the lines AI should not cross in this organization, and the values the leadership wants the staff to apply when AI questions arise that the charter does not anticipate. The charter is not a policy. It is the page a board ratifies and a senior leader can hand to a new staff member to communicate "this is how we think about this." Cost of not doing it. Without a charter, the organization has no shared frame for AI decisions. Every staff member operates from their own theology, ethics, or vendor enthusiasm. The communications director, the pastoral care lead, and the executive director all hold different assumptions, and the inconsistency surfaces as small mistakes that erode trust over time. In the 2026 data, this is the gap behind the 91% of churches and 47% to 76% of nonprofits with no governance: there is no shared starting point for the rest of the work.

A1. BOILERPLATE TEXT The following is the templated language for an AI Use Charter. Square-bracketed fields are organization specific and require completion. Italicized parenthetical notes are guidance for the customizer and are removed in the final document. AI Use Charter for [Organization Name] Adopted by [Board / Elder Council / Leadership Team] on [Date]. Why this charter exists. Artificial intelligence tools have entered the daily work of [Organization Name] whether we have authorized them or not. Members of our staff, our volunteers, and our community are using AI tools to draft communications, conduct research, generate content, and increasingly to seek counsel. We believe these tools can serve our mission well when used with discernment, and we believe they can damage our mission when used without it. This charter names the principles by which we will use AI in our work, the lines we will not cross, and the values we expect our staff and partners to apply when situations arise that this charter does not anticipate. Our mission is [insert mission statement or short framing of organizational purpose]. AI is a tool. Our mission is the measure. Where AI serves the mission, we use it. Where AI threatens the mission, we do not. Principles guiding our use of AI. First: the human comes first. AI does not replace human discernment, presence, or relationship in the work that matters most. We use AI to serve people, not to substitute for the humans those people came to be in relationship with. Second: integrity is non-negotiable. [For churches: The theological integrity of our teaching, preaching, and pastoral care.] [For nonprofits: The integrity of our mission, our beneficiary relationships, and our donor trust.] [For institutions: The integrity of our formation work and our accountability to the leaders we are forming.] AI-generated or AI-assisted content that touches these areas is reviewed by a human responsible for that integrity before it reaches the people we serve. Third: data is held with care. The data of our [members / donors / beneficiaries / students] is sacred. We do not expose it to AI tools that do not meet our data handling standards. We treat our data with the same care our people have a right to expect.

Fourth: transparency builds trust. We tell our [congregation / donors / community / students] what role AI plays in our work. We do not pretend AI is not present. We do not pretend AI is more central than it is. We are honest about how we use it, and we invite questions. Fifth: discernment over efficiency. When efficiency and discernment pull in different directions, we choose discernment. AI tempts every organization toward speed. Our calling is not speed. Our calling is faithfulness in the work we have been given, and we will not let AI rush us past it. Lines we will not cross. We will not use AI as a substitute for [pastoral care / direct beneficiary care / spiritual formation / the relational work that defines our mission]. We will not expose [member records / donor data / beneficiary information / student records / minor-related data] to AI tools that have not been vetted under our data handling standards. We will not publish AI-generated content under [our pastoral / leadership / institutional / staff] name without a human author taking responsibility for the substance of what is published. We will not use AI in ways that are deceptive to the people we serve. Living with this charter. This charter is a starting point, not a finished policy. Specific operational decisions are made in our Acceptable Use Policy and our Data Handling Standards, which derive from this charter. When a situation arises that none of these documents anticipate, we expect our staff to apply the principles above and to err on the side of [discernment / caution / consultation with leadership]. When in doubt, ask. When the question is significant, escalate. We will review this charter [annually / every two years]. We will revise it as our understanding deepens and as the technology changes. Ratified by [Names of Board or Leadership]. Signed [Date]. DECISIONS THE ORGANIZATION MUST MAKE To customize the AI Use Charter, the organization must answer the following questions. The answers populate the bracketed fields in the boilerplate and inform the language choices throughout.

- What is our organization's name and the formal body that will ratify this charter (board, elder council, leadership team)?

- What is our mission statement, in one or two sentences, framed in the language we already use about ourselves?

- What is the integrity standard most central to our work? (For churches: theological tradition and pastoral integrity. For nonprofits: mission, donor, and beneficiary integrity. For institutions: formation and accountability integrity.) Name it specifically.

- What language do we use to describe the people we serve? (Members, congregants, donors, beneficiaries, students, partners, community.) Use our actual language consistently.

- What are the three to five non-negotiable lines we want named explicitly? Beyond the defaults provided, what additional lines does our specific tradition or mission require?

- What is our default disposition when in doubt? Discernment, caution, consultation, prayer, escalation? Pick the language that fits how we actually want staff to behave.

- Who specifically signs and ratifies this charter, and on what date? Name the people who carry the institutional weight.

- What is our review cadence — annually, every two years, or some other interval?

MOVEMENTAL'S ROLE BY LEVEL At Level 1 (Free Toolkit): We provide the boilerplate above as a downloadable Word and Markdown document. We provide the eight decision questions as a worksheet. The organization fills in the brackets and adapts the language themselves. We provide a one-page guide on common pitfalls (writing it too long, making it too theological for the staff to use, drafting it without leadership in the room). The organization owns the work end to end. We provide no human support. At Level 2 (AI-Assisted Product, $1,997): The eight decision questions become the structured intake. The organization completes the intake in roughly fifteen to twenty minutes. The product generates a customized AI Use Charter draft using the boilerplate language tuned to their answers, their tradition, and their voice. The organization reviews the draft, edits in the product interface, and exports the final ratification-ready Word document. The product also generates a one-page board briefing memo that summarizes the charter for ratification. We provide a single asynchronous question-and-answer thread (handled by a Movemental team member or by the AI itself, escalating to human as needed) to address questions during ratification. At Level 3 (Facilitated MVP, $5,000): A Movemental facilitator runs a 90-minute leadership conversation that surfaces the answers to the decision questions in the room. The facilitator drafts the charter within 72 hours, returns it for one round of leadership feedback, and supports the board ratification meeting (attending if helpful). The Charter is one of seven artifacts produced in the two-week engagement. The facilitator handles voice, language, theological texture, and the political navigation of getting the document ratified. The Charter is finalized by end of week one of the engagement.

Item 02: Acceptable Use Policy What this is A working document that names which AI tools are approved for use in the organization, what they are approved for, what they are not approved for, and what the consequences are for violating the boundaries. This is the operational artifact staff actually consult. It should be specific enough to answer real questions: Can I paste donor data into ChatGPT? Can I use AI to draft a sermon and not disclose it? Can a youth pastor use an AI counseling app with a student? Cost of not doing it. Without an acceptable use policy, staff make individual judgments under time pressure, and those judgments accumulate into organizational practice without anyone deciding it should. The most common failure mode in the 2026 nonprofit data — 81% of nonprofits using AI individually without shared workflows — is downstream of this gap. Without a policy, donor data ends up in consumer AI tools. Pastoral notes get processed through models that retain training data. Beneficiary records get pasted into chatbots for "summarization." Each is a real incident pattern, and each is preventable with one written page. A1. BOILERPLATE TEXT Acceptable Use Policy for AI Tools at [Organization Name] Effective [Date]. Reviewed [Cadence]. Purpose. This policy governs the use of artificial intelligence tools by all staff, contractors, and volunteers of [Organization Name]. It exists to operationalize the principles in our AI Use Charter and to give our team clear guidance on what is and is not appropriate. Approved tools. The following AI tools are approved for use in our work, subject to the limitations below. [List approved tools — typically: ChatGPT (paid tier), Claude (paid tier), Microsoft Copilot, Google Gemini, Grammarly, transcription tools like Otter or Fireflies, image generation tools as applicable. Specify whether free tier or paid tier is approved — typically only paid tier for any tool that handles organizational data.] Tools not on this list require approval from [Designated Leader] before use for organizational work. Approved use cases. Staff may use approved AI tools for the following purposes:

- Drafting and editing internal communications (subject to review before sending externally)

- Research and information gathering (with verification of any factual claims before use)

- Brainstorming and idea generation

- Translation drafts (subject to review by a fluent speaker before publication)

- Administrative tasks: scheduling, meeting summaries, agenda drafting

- [Sermon preparation / proposal drafting / curriculum drafting / etc., as applicable] — subject to the disclosure standards in our Disclosure and Attribution Standard

- Image generation for [internal use / approved external surfaces]

Use cases requiring additional review. The following uses require sign-off from [Designated Leader] before proceeding, and may have additional documentation requirements:

- Any use involving [member / donor / beneficiary / student] data

- [For churches: any use that touches pastoral care, theological content, or worship preparation]

- [For nonprofits: any use that touches program delivery, beneficiary intake, or donor communications at scale]

- [For institutions: any use in formative settings, accredited course delivery, or institutional communications]

- Any use that produces content published under our organizational name

Prohibited uses. Staff may not use AI tools for the following purposes:

- Substitute for direct [pastoral care / beneficiary care / formation / spiritual direction / human relationship]

- Processing of [member directory information / donor giving records / beneficiary case records / student records / financial records / minor-related data] in tools not approved under our Data Handling Standards

- Generation of content presented as the personal voice of [a pastor / executive / faculty member] without that person's explicit authorization

- Deceptive practices, including impersonation of any individual or organization

- Bypass of any review or approval process required by this policy or by other organizational standards

Review and approval workflow. Content produced with substantial AI assistance and intended for external publication is reviewed by [Specific Role] before release. Theologically sensitive content [for churches] is reviewed by [a pastor or designated theological reviewer]. Content involving [donors / beneficiaries / students] is reviewed by [the leader responsible for that constituency]. Personal use. Staff may use AI tools for personal purposes outside of organizational work without restriction by this policy. However, staff may not use organizational accounts for personal purposes, and may not feed organizational data into personal-account AI tools. Violations and consequences. Violations of this policy are addressed through [Organization's standard staff accountability process]. Significant violations — particularly those involving sensitive data or reputational risk — may result in [disciplinary action up to and including termination / restoration of trust through a defined process / consultation with the board]. Questions. Questions about this policy should be directed to [Designated Leader]. When in doubt about a specific use case, ask before proceeding. Adopted by [Authority] on [Date]. Reviewed [Cadence]. DECISIONS THE ORGANIZATION MUST MAKE

- What is the title and effective date of this policy, and what is our review cadence?

- Which specific AI tools have we already authorized, and which tier of each? (Free vs. paid matters

— paid tiers typically have stronger data handling protections.)

- Who is the designated leader who approves new tools and handles questions?

- What constituency-specific language do we use? (Members, congregants, donors, beneficiaries, students, partners, community.)

- What are our segment-specific sensitive use cases that require sign-off? List the three to five categories that matter most to us.

- Who reviews content involving each category? (For churches: who reviews theological content?

For nonprofits: who reviews donor-facing content? For institutions: who reviews formative content?)

- What is our staff accountability process, and what consequence language fits our culture? (Some organizations are direct about termination; others prefer restoration language; some require board consultation for serious matters.)

- How do we want to handle personal use of AI by staff? (Most organizations explicitly do not regulate personal use, but draw the line at using organizational accounts or feeding org data into personal tools.)

MOVEMENTAL'S ROLE BY LEVEL At Level 1 (Free Toolkit): We provide the boilerplate as a Word and Markdown document. We provide the eight decision questions as a worksheet. We include a one-page reference card listing the most common AI tools and their data-handling characteristics (e.g., free tier of ChatGPT trains on your data; ChatGPT Team and Enterprise do not). The organization completes the policy themselves. At Level 2 (AI-Assisted Product): Structured intake captures the eight decision answers. The product generates a customized Acceptable Use Policy draft. The product also generates a one-page staff-facing summary card (the policy is for the document; the summary card is for the wall of the staff break room). The organization reviews and edits in-product, then exports finalized versions. The product maintains an updated reference list of AI tools with current data-handling characteristics, refreshed quarterly, so the policy reflects current reality. At Level 3 (Facilitated MVP): A facilitator runs a 60-minute working session that surfaces the eight decision answers and produces the policy draft live. The facilitator handles the politically sensitive piece — the consequences-and- violations section — with care for the organizational culture. Final policy delivered within 72 hours. The facilitator also customizes the staff summary card and a five-minute talking script that the senior leader uses to introduce the policy to staff. Item 03: Data Handling Standards What this is A specific document — usually one to two pages — that names what categories of organizational data may and may not be exposed to AI tools, and under what conditions. The categories are sector-specific. The handling rules are mostly standard. The mapping of which data the organization actually has and where it lives is genuinely organization-specific. Cost of not doing it. Without data handling standards, staff treat all data as equivalent and make the worst kind of mistake: pasting the most sensitive information into the least controlled tool. The 2026 nonprofit data documents this directly — donor records and beneficiary data routinely flowing through consumer AI tools without contractual data protection. Major-donor confidence, legal exposure, and beneficiary safety can be compromised in seconds, and the organization often does not know until much later.

A1. BOILERPLATE TEXT Data Handling Standards for AI Tools at [Organization Name] Effective [Date]. Reviewed [Cadence]. Purpose. This document classifies the data our organization holds, defines which categories of data may be processed by AI tools, and specifies the conditions under which any such processing may occur. It operationalizes the data-protection commitments in our AI Use Charter. Data classification. Our organization holds data in the following categories. Each category has a specific handling standard. Category A — Public Information. Information that is already publicly available about our organization: published sermons, public newsletters, public-facing program descriptions, public board members, public financial summaries. Handling: may be processed in any approved AI tool (paid tier) without further restriction. Category B — Internal Operational Information. Information used in the course of organizational work but not generally protected: internal meeting notes, draft communications, project plans, internal training material. Handling: may be processed in approved AI tools with paid-tier accounts that do not retain inputs for training. Free-tier consumer AI tools are not approved for this data. Category C — Constituent Identifying Information. [Member directory data / donor names and giving histories / beneficiary intake records / student records and academic information]. Handling: may only be processed in AI tools with explicit contractual data protection (Enterprise tier accounts with signed Data Processing Agreements, on-premises tools, or organizational AI tools we have specifically vetted). Consumer AI tools — even paid tiers — are not approved unless their data terms have been verified by [Designated Leader]. Category D — Sensitive Personal Information. [Pastoral care notes / beneficiary trauma disclosures / financial records of individuals / minor-related data / health information / immigration status / counseling records]. Handling: not approved for AI processing in any consumer or general-purpose tool. May only be processed in tools we have specifically vetted, with a documented use case approved by [Designated Leader]. When in doubt, do not use AI. Category E — Privileged or Protected Information. [Attorney-client communications / executive session board materials / specific personnel records / data subject to FERPA, HIPAA, or other regulatory protection where applicable]. Handling: never processed in AI tools without explicit authorization from [Designated Leader] and review of applicable legal and regulatory requirements.

Specific prohibitions.

- Never paste [donor giving histories / beneficiary records / student records] into the free tier of

ChatGPT, Claude, or any consumer AI tool.

- Never use personal AI accounts to process organizational data in any category above Public.

- Never use AI transcription tools for [pastoral care conversations / counseling sessions / sensitive board discussions] without explicit authorization and informed consent of all parties.

- Never feed [member directory / mailing list / donor database] in bulk to AI tools for "analysis" without explicit authorization.

What to do when you are unsure. If you are not sure which category a piece of data belongs to, treat it as the higher category. When in doubt, ask [Designated Leader]. The cost of asking is small. The cost of guessing wrong can be substantial. Mapping our actual data. Appendix A of this document is an internal-only mapping of where each data category lives in our organization (which systems, which staff have access, which third-party services hold copies). This appendix is reviewed annually and updated as our systems change. Adopted by [Authority] on [Date]. DECISIONS THE ORGANIZATION MUST MAKE

- What constituency-specific data do we hold? List the actual categories — for churches: member directory, giving records, pastoral care notes, sermon archive, prayer requests, minor-related data. For nonprofits: donor records, beneficiary intake, program records, financial records, sensitive case files. For institutions: student records, faculty research, financial data, denominational records.

- What sensitive personal information do we hold that requires Category D treatment? List specifically — counseling notes, immigration data, health information, minor records, etc.

- What regulatory categories apply to us? (FERPA for institutions handling student records, HIPAA- adjacent obligations if handling health-related data, donor confidentiality commitments under state law.)

- Which specific AI tools have we approved for which categories? Map the tools we actually use to the categories they handle safely.

- Who is our designated leader for data handling questions, and what is the escalation path?

- Where does each data category actually live in our organization? Which systems, which staff have access, which third parties hold copies? (This is the mapping work that requires real organizational knowledge and is the part Movemental cannot do without the organization's direct input.)

- What are our existing data protection commitments to constituents? (Donor confidentiality promises, member privacy expectations, student rights statements.) The data handling standards must be consistent with these.

MOVEMENTAL'S ROLE BY LEVEL At Level 1 (Free Toolkit): We provide the boilerplate plus a sector-specific data category template (one for churches, one for nonprofits, one for institutions). We provide a Data Mapping Worksheet that helps the organization complete the appendix work. We provide a reference table of common AI tools and their current data-handling characteristics. The organization performs the mapping work themselves, which is the part that takes the most time. At Level 2 (AI-Assisted Product): The intake structure walks the organization through data categories specific to their segment. The product generates a customized Data Handling Standards document. The product cannot complete the appendix mapping without organizational input — this requires the organization to actually inventory their systems. The product provides a guided mapping workflow but the organization does the work of identifying their own data locations. The product maintains the AI-tool reference table updated quarterly. At Level 3 (Facilitated MVP): A facilitator runs a 90-minute data inventory session with the operations leader and IT-equivalent role. This is the most labor-intensive of the seven items because it requires actual mapping. The facilitator produces the standards document plus the appendix mapping. The facilitator also identifies any high-risk data flows that need immediate attention (e.g., a staff member who has been pasting donor records into the free tier of ChatGPT) and produces a remediation note. The mapping work is the irreducible human element of this item — even at this level, the organization must produce the inventory; the facilitator structures and codifies it. Item 04: Disclosure and Attribution Standard What this is

A statement of when and how the organization discloses AI involvement in its public-facing work. The standard need not be elaborate. It needs to answer one question clearly: when is AI involvement disclosed, and in what form? Cost of not doing it. Without a disclosure standard, the organization is making an implicit promise it has not examined: that what appears in the organization's name was produced by the organization's human voice. When that promise is later revealed to have been broken, the credibility damage is significantly larger than if the practice had been disclosed from the start. Only 7% of churches have any disclosure statement at all. The 87% of churches whose congregations are bringing up AI questions are forming opinions about church AI use without information from the church. This is the most common path to trust erosion and the cheapest to prevent. A1. BOILERPLATE TEXT Disclosure and Attribution Standard for AI-Assisted Content at [Organization Name] Effective [Date]. Our commitment. We tell our [congregation / donors / community / students] when AI plays a substantive role in the content we publish under our name. We do not pretend AI is absent. We do not pretend AI is more central than it is. Honesty about our practices is part of how we maintain trust. What requires disclosure. The following types of content disclose AI involvement when AI has played a substantive role in their creation:

- [Sermons / homilies / teaching content] published in writing or recorded for distribution

- [Pastoral letters / executive director letters / institutional communications] published under a named leader's name

- [Donor appeals / fundraising letters / grant applications] presented as the organization's direct communication

- [Curriculum / formation content / educational materials] that bear our institutional name

- [Public-facing reports / impact statements / annual reports]

What does not require disclosure. The following types of work do not require disclosure of AI assistance, because AI use in these contexts is so common that disclosure would be noise rather than information:

- Routine administrative communications (scheduling, logistics, internal coordination)

- Spelling and grammar tools (Grammarly, spell-check) used to refine human-authored work

- Translation drafts that are then reviewed and finalized by a fluent human

- Internal-only documents not published outside the organization

- Brainstorming and research support that informs but does not author the final work

What "substantive role" means. AI played a substantive role when the AI generated material that is included in the final published work without being substantially rewritten in human voice. Editing AI output for grammar is not substantive use. Using AI to draft a paragraph that appears in the final work, with light editing, is substantive use. The test: if the AI had not been involved, would the published content be meaningfully different in substance? If yes, disclose. How we disclose. Disclosure takes one of the following forms, depending on context:

- A standing notice on our website that names our AI use practices in general terms

- A brief footnote or end-note on long-form published content noting AI involvement (e.g., "This sermon was prepared with the assistance of AI tools for research and outline development. The content and theological positions are the author's own.")

- A statement at the beginning of formal published content where appropriate

What we do not do. We do not publish AI-generated content under a named leader's personal voice without that leader's direct authorship and authorization. AI cannot be the ghostwriter that the public believes is the leader. The leader's name on the work means the leader has done the work. Adopted by [Authority] on [Date]. DECISIONS THE ORGANIZATION MUST MAKE

- What public-facing content categories do we produce that require disclosure consideration? (Sermons, newsletters, donor appeals, social media, formal reports, etc.)

- What is our disposition on disclosure: tell-everything, tell-when-substantive, or tell-rarely? Most organizations land at tell-when-substantive. Some traditions push toward tell-everything. Pick the disposition that matches the trust commitments we have made to our constituents.

- What is our standing notice — the language we put on our website about general AI use practices?

Draft a two-or-three-sentence statement.

- What footnote language do we use for long-form content? Draft the standard form.

- What is our position on AI ghost-writing under named leader voice? (Most organizations explicitly prohibit this. Some will allow it with the named leader's explicit authorization and review.) Pick our line.

- Who reviews content for disclosure compliance, and at what point in the workflow?

MOVEMENTAL'S ROLE BY LEVEL At Level 1 (Free Toolkit): Boilerplate plus the six decision questions plus three sample standing notices (a more open one, a more cautious one, and a middle option) for the organization to choose between or adapt. At Level 2 (AI-Assisted Product): Intake captures the six decision answers. Product generates a customized Disclosure and Attribution Standard. Product also generates the standing notice copy ready to paste on the website, the footnote template, and a one-page staff reference. Product offers three preset disclosure dispositions (transparent, balanced, conservative) that pre-configure the language tone. At Level 3 (Facilitated MVP): A facilitator runs a 30-minute conversation focused on the trust dimension — what have we promised our constituents, and what does honesty require given that promise? The facilitator drafts the standard plus the standing notice, the footnote template, and the staff reference. This item is among the lighter-touch items at the facilitated level. Item 05: Pastoral / Programmatic / Educational Care Boundaries What this is A document specific to the segment that names where AI must not go in the work the organization considers most sacred. For churches, this is pastoral care. For nonprofits, it is programmatic boundaries — direct service delivery to beneficiaries in vulnerable situations. For institutions, it is formative boundaries — spiritual formation work, mentorship, direct theological discernment. The document does not have to enumerate every case. It has to draw a clear line that staff can apply. Cost of not doing it. Without this document, AI quietly enters the spaces the organization considers most sacred. The 2026 data shows 67% of church leaders worry that AI will gradually replace the human connection pastoral ministry depends on. Staff under time pressure are already turning to AI for tasks that involve confidential disclosure. The cost is twofold: the immediate confidentiality risk to the person whose disclosure is being processed, and the slower erosion of the trust that distinguishes the organization's most distinctive work.

A1. BOILERPLATE TEXT Care Boundaries for AI Tools at [Organization Name] Effective [Date]. Our conviction. The most sacred work of [Organization Name] is the [pastoral / formative / direct care] relationship between a human carrying organizational responsibility and a human who has come to us in need, in formation, or in spiritual seeking. AI does not replace this relationship, and we do not allow AI tools to enter spaces where their presence would compromise it. Where AI does not go. [FOR CHURCHES — adapt language as needed]

- Confessional and pastoral counseling conversations are not transcribed by AI tools, summarized by AI tools, or processed by AI tools in any form. The confidentiality of these conversations is part of the pastoral covenant.

- Crisis pastoral care — including bereavement support, marriage crisis, suicidal disclosure, mental health crisis, and acute spiritual distress — is not delegated to AI tools, in any form. AI is not consulted as a substitute for human pastoral judgment in these moments.

- Pastoral notes following confidential conversations are not generated by AI, processed by AI, or stored in systems that expose them to AI. They are written by the pastor, stored securely, and treated as sacred records.

- Conversations with minors that involve any disclosure of vulnerability, family circumstance, or personal struggle are not processed by AI tools.

- AI does not preach. A sermon may be prepared with AI assistance for research and outlining (subject to our Acceptable Use Policy and Disclosure Standard), but the act of preaching — the words spoken in the moment to the gathered people — is the work of a human who has prayed, prepared, and stands accountable for the words.

[FOR NONPROFITS — adapt language as needed]

- Direct beneficiary care conversations — intake involving trauma disclosure, advocacy work involving sensitive personal circumstance, services delivered in person to vulnerable individuals

— are not processed by AI tools without explicit beneficiary consent and clear authorization.

- Beneficiary case notes are not generated by AI or processed by AI without explicit authorization and contractual data protection.

- AI is not used to make decisions about service eligibility, resource allocation to specific beneficiaries, or other determinations that affect individuals' access to our programs without human review and accountability.

- Donor stewardship conversations — major-donor relationship work that involves personal disclosure, family circumstance, or estate planning — are not transcribed or summarized by AI tools without donor consent.

[FOR INSTITUTIONS — adapt language as needed]

- Spiritual formation work, including direction, discernment, and mentorship, is not delegated to

AI tools. AI is not the spiritual director.

- Confidential conversations between students and faculty regarding vocational discernment, personal struggle, or formative concerns are not processed by AI.

- Faculty assessment of student formative readiness — for ordination, for ministry deployment, for advanced placement — is not generated or substantially informed by AI evaluation. AI may inform research; it does not assess persons.

- Theological assessment of student work that touches on questions of orthodoxy, fidelity, or doctrinal formation requires human faculty judgment and is not delegated to AI evaluation.

Where AI may serve. AI may serve the work that supports these sacred relationships: scheduling, logistics, administrative coordination, research that informs human judgment, drafting of communications that the responsible human reviews and authorizes. The boundary is not between AI and our work generally. The boundary is between AI and the specific moments in which presence, judgment, and human responsibility define the work. When in doubt. If a staff member is unsure whether a specific use case crosses a care boundary, the answer is not. Ask before proceeding. The cost of pausing is small. The cost of crossing the boundary, even once, can be substantial and is often impossible to undo. Adopted by [Authority] on [Date]. DECISIONS THE ORGANIZATION MUST MAKE

- What is the most sacred work our organization does? Name it specifically in our own language. (Pastoral care, formation, direct service, spiritual direction, theological judgment, etc.)

- What are the three to seven specific scenarios where AI must not enter? Be concrete. The document is more useful when scenarios are named than when only categories are described.

- What is our position on AI in sermon preparation, formation work, beneficiary care, and other lighter-touch supporting tasks? We need to distinguish "where AI may not go" from "where AI may serve."

- Who in our organization holds the responsibility for these sacred relationships, and how does the document name their authority?

- What is our theological or mission-based reason for these boundaries? The boundaries should not feel arbitrary; they should connect to what we believe about the work.

- What is the staff guidance for cases that arise that this document does not anticipate? (Most organizations land on "ask before proceeding" or "err on the side of human presence." Pick the language that fits our culture.)

MOVEMENTAL'S ROLE BY LEVEL At Level 1 (Free Toolkit): We provide three sector-specific boilerplate documents — one for churches, one for nonprofits, one for institutions. We provide the six decision questions. We include three short reflections from sector-specific theologians or practitioners on why these boundaries matter (sourced from Hirsch, Halter, or other movement-network voices, where permission is granted). The organization customizes the document themselves. This item is the one most resistant to productization, because the lines are theologically and contextually specific. The free toolkit gets the organization to a strong starting point but cannot draw the lines for them. At Level 2 (AI-Assisted Product): Intake captures the six decision answers, with thoughtful prompting that draws out the organization's actual theological convictions about what is sacred. The product generates a customized boundaries document. The product flags this document as one that should be reviewed by senior leadership and (for churches) a pastor or theological reader before ratification. The product does not promise that its draft is theologically complete; it promises a serious starting point that the organization's leadership owns finalizing. The product offers an optional 30-minute consultation with a Movemental facilitator as an add-on for this item specifically (priced at $300), because this is the item where AI assistance most needs human review. At Level 3 (Facilitated MVP): This is the most theologically and pastorally substantive item in the engagement. A facilitator (ideally one with pastoral or theological training) runs a 90-minute conversation focused specifically on this question: where does AI not belong in this organization's most sacred work? The facilitator produces the boundaries document with deep customization to the organization's tradition, theology, and pastoral practice. This item is where the $5,000 facilitated engagement most clearly justifies its price. The facilitator may recommend additional theological review by the organization's own pastoral or theological resources before ratification.

Item 06: Voice Cloning and Impersonation Response Plan What this is A specific protocol for what the organization does when its leaders' voices, faces, or names appear in AI generated content used to defraud or manipulate constituents. The protocol names the people responsible for monitoring, the channel through which constituents can report suspicious communications, the verification standard the organization will use, the platforms the organization will pre-emptively notify, and the message to the constituent base that establishes the verification norm in advance. Cost of not doing it. This is the only item on the list that addresses a documented, currently-active criminal threat. Twenty-five percent of churches have already experienced AI-generated scams or misinformation in their community. Sixty percent of church leaders are very concerned about voice cloning. The FBI has issued public warnings. Without a response plan, the first incident is the disaster. With a plan, the first incident is the activation of a protocol the organization has practiced. The cost of not having a plan is paid by the most vulnerable members of the organization — typically older constituents — who lose money to a voice they trusted. A1. BOILERPLATE TEXT Voice Cloning and Impersonation Response Plan for [Organization Name] Effective [Date]. Practiced [Cadence]. Why this plan exists. AI-generated impersonation of religious and nonprofit leaders is a documented and active threat. Scammers harvest publicly available audio, video, and likeness from sermons, livestreams, social media, and recorded events to create convincing synthetic content used to solicit donations, request emergency wire transfers, and manipulate constituents. Our [pastors / executives / leaders] are at risk because of the public nature of our work. This plan defines how we prevent, detect, and respond to such incidents. What we tell our constituents in advance. We commit to telling our [congregation / donor base / community / students] the following, repeatedly and through every channel we use:

- Our [pastors / leaders / staff] will never contact you through unsolicited calls, texts, or messages asking for money, gift cards, wire transfers, or urgent personal financial assistance.

- Real giving opportunities are always communicated through our official channels: [our website, our official email list, our published giving page, in-service announcements].

- If you receive a surprising message that appears to be from one of our leaders requesting urgent financial action, assume it is fraudulent. Verify by contacting our office directly at [Official

Number] or [Official Email] before acting.

- You can report suspicious communications to [Designated Contact / Reporting Channel].

We will publish this commitment on our website, include it in our regular communications, address it from the [pulpit / platform / staff meeting] at least quarterly, and reinforce it whenever a new wave of scam activity is reported in the broader sector. Detection: how we monitor for impersonation.

- [Designated Person] reviews social media mentions and direct reports of suspicious content monthly.

- We have established a reporting channel — [specific email or phone] — where staff and constituents can report suspected impersonation.

- Our staff is trained to recognize the signs of synthetic content: unnatural pauses, slight visual inconsistencies, requests for urgent action, requests for nonstandard payment methods (gift cards, wire transfers, cryptocurrency), and messages from new or unverified accounts.

Response: what we do when an incident is detected. Step 1 (within 24 hours of confirmed incident): [Designated Leader] is notified and assesses scope. The incident is logged. Step 2 (within 48 hours): A communication is sent to our [congregation / donor base / community / students] through all primary channels naming the incident, identifying the impersonated leader, and reaffirming our verification standard. Step 3 (within 72 hours): Reports are filed with the relevant platforms (Facebook, Instagram, TikTok, YouTube, etc.) requesting takedown of the impersonating content. Reports are filed with the FBI Internet Crime Complaint Center (IC3) at ic3.gov for any incident involving financial fraud.

Step 4 (within 7 days): If any constituent has been financially harmed, we offer pastoral or organizational support and connect them with [law enforcement / consumer protection / counseling resources] as appropriate. Step 5 (ongoing): The incident is reviewed in our next leadership meeting, and any improvements to this plan are noted and implemented. Practice. We practice this plan annually through a tabletop exercise. The practice ensures that the people responsible know what to do, the communication templates are ready, and the reporting channels are functional. Designated roles. [Specific person] is responsible for monitoring. [Specific person] is responsible for incident response. [Specific person] is responsible for the constituent communication. These roles may be held by one person in a small organization or by different people in a larger one. Adopted by [Authority] on [Date]. Practiced [Cadence]. DECISIONS THE ORGANIZATION MUST MAKE

- Which of our leaders are at highest risk because of public exposure? (Senior pastor, executive director, named institutional leaders with public-facing roles, faculty with public profiles.)

- Through what channels do we currently reach our constituents, and which do we consider

"official"? (Website, email list, in-service announcements, member portal, etc.)

- Who specifically holds the monitoring, response, and communication roles? In a small organization, this may be one person. In a larger one, it should be different people with clear handoffs.

- What is our official reporting channel for constituents to flag suspicious communications? (Specific email, specific phone number, web form.)

- What is our official phone number and email for constituents to verify communications? Make sure these are easy to find and stable over time.

- How often will we communicate the verification commitment to constituents? (Quarterly is typical. More frequently during periods of heightened scam activity.)

- What is our practice cadence — annually is recommended. Schedule the first tabletop exercise on the calendar now.

MOVEMENTAL'S ROLE BY LEVEL At Level 1 (Free Toolkit): We provide the boilerplate plus a one-page Constituent Verification Notice ready to paste on a website. We provide the seven decision questions plus a Tabletop Exercise script the organization can run themselves. We provide a list of relevant reporting URLs (FBI IC3, major platform reporting,

BBB) updated quarterly. At Level 2 (AI-Assisted Product): Intake captures decision answers. Product generates customized response plan including: the master document, the constituent verification notice ready for website paste, the constituent communication templates pre-drafted (one for the proactive announcement, one for the post- incident communication), and the tabletop exercise script. The product also includes a calendar reminder for annual practice. This is one of the items where AI generation produces excellent output because the structure is highly templatable. At Level 3 (Facilitated MVP): A facilitator runs a 45-minute working session that walks through the decisions and produces the plan. The facilitator also runs the first tabletop exercise (a 30-minute additional commitment, included in the engagement) so that the organization has practiced the plan once before the engagement ends. This item is fast at the facilitated level because the structure is so templatable; the facilitated value-add is the practice exercise. Item 07: Communication to the Constituent Base What this is A single act of communication — a letter, a sermon, a board statement, a member email — in which the organization tells the people it serves what its position on AI is, what governance it has put in place, and what they can expect. This is not a document. It is the act of speaking publicly about the work the prior six items represent. It can be five paragraphs long. It can take fifteen minutes to read aloud. What matters is that it happens, that it is signed by the senior leadership, and that it establishes the organization as having a position rather than a void. Cost of not doing it. Without this communication, the prior six artifacts exist privately and the constituent base continues to form its own opinions about AI in the organization without information. The 2026 data shows 87% of church congregations bringing up AI regularly and 51% of churches not addressing AI use with their congregation at all. That gap is filled by rumor, suspicion, and projection. The cheapest, fastest, highest-leverage governance move on this list is the public communication that the work has been done. A1. BOILERPLATE TEXT

A letter to our [congregation / community / donors / students] on artificial intelligence From [Senior Leader Name and Title] [Date] Dear [friends / family in Christ / community / partners], I want to write to you about something we have been thinking about carefully as a [church / organization / institution]: how we will and will not use artificial intelligence in our work together. Like you, we have watched AI move quickly into the daily life of every kind of organization. We have seen the benefits — research that takes minutes instead of hours, communications drafted faster, translations made accessible, content reaching people who could not encounter it before. We have also seen the costs — content that sounds authoritative while being wrong, voices cloned to defraud trusting people, the slow erosion of the human relationships that define the work we are called to. We want you to know that we have done the work of thinking carefully about this. Over the past [weeks / month], our [board / leadership / elder council] has adopted [an AI Use Charter / a set of governance documents / a framework] that names how we will use AI in our work and where we will not allow it to go. The full documents are available on our website at [URL]. The short version is this: First, we believe AI can serve our work, and we will use it carefully — for research, for drafting, for administrative support, for the kinds of tasks that free our staff to do the work that requires their full presence. Second, we believe there are places AI does not belong in our work. [Pastoral care / direct beneficiary work / spiritual formation / the relationships at the center of what we do] is human work. We do not let AI substitute for the human presence and judgment those relationships require. Third, we will be honest about how we use AI. When AI plays a substantial role in something we publish under our name, we will tell you. We do not want you to discover something is true that we should have told you ourselves. Fourth, we want to protect you from a specific threat. Scammers are using AI to clone the voices and faces of pastors, executive directors, and other leaders to manipulate the people who trust them. Please know: I will never contact you out of the blue asking for money, gift cards, or urgent financial help. If you ever receive a message that appears to be from me requesting urgent financial action, please assume it is fraudulent and verify by contacting our office at

[Official Number]. Tell your friends and family in our community. The most vulnerable members of any community are the most likely to be targeted, and our protection of them depends on a shared verification habit. Finally, we want to invite your questions. AI is going to keep changing. The questions it raises are not going to settle quickly. If you have concerns, observations, or ideas about how we should engage these questions, please bring them to us. Our work together is stronger when our constituents speak into it. Thank you for your trust. We do not take it lightly. [Senior Leader Signature, Title, Organization] DECISIONS THE ORGANIZATION MUST MAKE

- Who is the senior leader signing this communication? Their voice and authority carry the message.

- Through what primary channel will this communication reach the constituent base? (Email, mailed letter, sermon, video message, member portal post, board statement.) Some organizations will use multiple channels.

- What is the appropriate length and tone for our culture? (Some communities expect formal letter format; others prefer conversational sermon-style; others want a brief executive memo.) Pick the form that fits.

- What is the URL where the full governance documents will be available? Set this up before the communication goes out.

- What official phone number and email do we want constituents to use for verification?

- What is our follow-up plan for questions that come back? (A dedicated email address, a town hall meeting, a Q&A session, designated staff to handle inquiries.)

- When will the communication go out? Set a specific date that is after ratification of the other six artifacts but before too much time has passed.

MOVEMENTAL'S ROLE BY LEVEL At Level 1 (Free Toolkit): Boilerplate letter plus the seven decision questions plus three sample alternate forms (formal letter, conversational sermon-style, executive memo). The organization customizes the letter in their senior leader's voice. At Level 2 (AI-Assisted Product):

Intake captures decisions. Product generates a customized letter in the form selected. The product offers an optional voice-tuning step where the senior leader provides a sample of their writing (a recent sermon, a recent newsletter, a recent letter) and the product re-tunes the draft to match the leader's actual voice. This voice-tuning capability is the highest-value AI use in the entire product, because it solves a real problem (the leader has to sign something that sounds like them) at a level no template can. At Level 3 (Facilitated MVP): A facilitator works directly with the senior leader on this letter — typically a 45-minute conversation in which the leader speaks the heart of what they want to say and the facilitator captures it, then drafts the letter in the leader's voice within 24 hours. The facilitator also helps the leader rehearse the in-person reading if the letter will be delivered as a sermon or address. This item closes the engagement, and is the moment the work becomes public. The facilitator's role is to ensure that moment is well-shaped.


## E. SSOT Part five — Sandbox Discovery (verbatim)

---
ssot: movemental-full-path
source_pdf: movemental_full_path_source_of_truth_v2.pdf
extracted_at: 2026-05-07
extract_tool: pdf-parse 1.1.1 (Node, one-off npm install in /tmp)
pdf_sha256: 7712770678614da366b3e622610b2a01dc28dcf811ce77394ad3e0908580d5ad
supersedes: []
status: draft
---

# Part five: Sandbox Discovery
The Sandbox stage is the exploratory, disciplined, locally-tested discovery of where AI actually creates value in this organization, what use cases are wise to pursue, what use cases need revision before pursuit, and what use cases are off the table. It is a four-week engagement priced at $15,000 in its facilitated form. The premise of the Sandbox stage is that AI is not a technological challenge first. The interface to current AI tools is human communication. Cutting-edge AI tools do not present as conventional technology — they present as human simulation. The way to evaluate AI in any organization is therefore not to study it from a distance but to put real recipes in the hands of real staff doing real work, observe what happens, and adjudicate the findings against the values and constraints documented in the Safety stage. The Sandbox is not a training program. It is a structured exploration with documented outcomes.

### Five-A: What Sandbox produces

Sandbox Discovery produces three connected deliverables. Deliverable one: a Use Case Portfolio. A working document containing every use case explored during the four-week engagement, with for each: a description of the workflow, the AI tool or recipe applied, the staff member or team that tested it, the time the test took, the value the use case promises (time saved, revenue generated, work improved), the human or ethical concerns surfaced, the integrity considerations relative to the organization's Safety documentation, and a final adjudication of green light, yellow light, or red light. The portfolio is the document the organization keeps and uses to make decisions about which use cases to deploy, modify, or set aside. Deliverable two: a Discernment Memo. A short narrative document — typically four to eight pages — that names the patterns the Sandbox surfaced. What kinds of use cases consistently produced value in this organization. Which kinds of use cases consistently raised concerns. What the team learned about itself in the process. What the leadership now sees that they did not see before. The Discernment Memo is the document that informs the decision about whether to proceed to Skills, to Solutions, or to neither. Deliverable three: a Readiness Assessment.

A brief evaluation of whether the organization is ready to proceed to Skills (deepening human capacity to lead this work) or directly to Solutions (technological deployment). Not every organization needs every stage. Some are well-served by Sandbox and the Discernment Memo, then a focused Solutions deployment. Some need substantial Skills work before any further technology is added. The Readiness Assessment names which path is right for this organization based on what the Sandbox surfaced.

### Five-B: The traffic-light system

Every use case tested in the Sandbox receives one of three signals. The signals are only assigned in the context of discovered potential value — the Sandbox does not adjudicate use cases the team did not pursue, did not test, or did not surface. Adjudication happens for use cases that have demonstrated some promise, with the integrity question evaluated against that promise. GREEN LIGHT. The use case produces clear value, raises no significant concerns under the organization's Safety documentation, can be performed by current staff with reasonable training, and serves the mission rather than warping it. Green light means the use case is ready for deployment in Solutions or for immediate productive use within the boundaries already documented. YELLOW LIGHT. The use case produces value but requires documented revision before deployment. The revision could be technical (the recipe needs adjustment), procedural (the workflow needs review or oversight added), formational (the staff using it need additional preparation), or ethical (a concern surfaced that requires a leadership decision). Yellow light means promising but not yet ready. The Discernment Memo captures what specifically must change before the use case is deployed. RED LIGHT. The use case cannot be pursued under the organization's current Safety framework, mission integrity, or constituent commitments. The reason is documented and named clearly. Red light is not a negotiation. It is the sober recognition that not every promising-on-paper use case is wise in practice for this specific organization. Red light use cases are valuable to document because they protect the organization from later attempts to deploy what should have been declined.

### Five-C: The Sandbox process, week by week

Week 0: Pre-engagement assessment. Before the engagement formally begins, the organization completes a broad assessment that maps where each staff member currently stands. The assessment is delivered as a Claude artifact — a structured interactive intake — and asks each participant about their current workflow, their team context, their feelings about AI, the tools they currently use, their experience with AI to date, and the friction points in their work that they wish were different. The output is a personalized starting point for each participant. This is the moment Movemental meets each person where they are, not where the organization wishes they were. The assessment respects that AI work is most usefully tested as locally as possible — down to the user — because each staff member's relationship to AI, their tasks, their fears, and their existing tools is specific to them.

Week 1: Recipe deployment and value mapping. Each participant is given a small set of pre-built Claude skills — recipes — adapted to their specific role. The recipes are configured against the organization's Safety documentation and are pre-screened to operate within Data Handling Standards and Care Boundaries. Participants run the recipes against real workflows: a communications director drafts donor appeals with a Donor Letter recipe; a pastor researches a sermon series with a Sermon Research recipe; an executive director summarizes board materials with a Board Briefing recipe; an operations lead drafts policies with a Policy Drafting recipe. Each participant logs their experience: time taken, time saved relative to baseline, output quality, concerns observed. The point of this week is value discovery. Not training. Not theory. Real recipes against real work, with the friction and the value both made visible. Participants do not need to understand prompt engineering or model selection to run a recipe well. The recipe handles the technical complexity. The participant brings the contextual judgment. This honors what the AI moment actually is — a frontier we need to navigate immediately rather than a topic we need to study before approaching. Week 2: Concern surfacing and use case expansion. Participants reconvene, having now lived with the recipes for a week. The conversation in week two surfaces what worked well, what produced unease, what surprised the participant about their own response to AI assistance, and what new use cases the participant would now like to explore based on what they have already tried. New recipes are configured for the second-week tests. Participants who saw promising patterns extend their use; participants who encountered concerns slow down and explore those concerns more deliberately. The facilitator (Movemental staff) attends to several specific signals during week two. Where is AI assisted work landing back in the participant's human workflow well? Where is it creating new friction? Where are participants beginning to over-trust the output? Where are participants under-trusting it and missing real value? The facilitator's job is not to push participants harder toward AI use but to help each participant calibrate accurately. Week 3: Adjudication and revision. The facilitator works with participants and leadership to adjudicate each tested use case. Some receive green-light status immediately. Others need a working session to determine what revision would convert them from yellow to green, or whether the revision is itself worth doing. A small number receive red-light status with documentation of why. The Use Case Portfolio takes shape during this week.

Week 4: Discernment Memo and Readiness Assessment. The facilitator drafts the Discernment Memo and the Readiness Assessment based on what the four weeks revealed. The leadership reviews and refines. The engagement concludes with a leadership conversation that names what the organization has learned, what it now believes is true about its relationship with AI, and what it will do next. The conversation is structured but not scripted. It is the moment the organization moves from exploring to deciding.

### Five-D: Sandbox technological supports

The Sandbox is the first stage at which Movemental's technological capability becomes directly visible to the organization. Three technological supports are central. Pre-built Claude skills (recipes). Movemental maintains a growing library of Claude skills configured for the work organizations in our segments actually do. These are not generic prompts. They are skills configured against the organization's Safety documentation, adapted to the role of the staff member running them, and pre-screened for the constraints documented in Data Handling Standards and Care Boundaries. A Sermon Research recipe knows the church's tradition. A Donor Letter recipe knows the nonprofit's donor language. A Curriculum Outline recipe knows the institution's formative commitments. The recipes carry the organizational context the participant does not have to re-create from scratch. The assessment artifact. A Claude artifact delivered in week zero that surfaces each participant's starting point. The artifact is structured but conversational. It asks the questions that reveal where the person actually is, and produces a personalized starting profile that informs which recipes are appropriate for that person and what the facilitator should attend to during the engagement. The Use Case Portfolio interface. A web interface (built on Movemental's existing React/Next.js/Tailwind/Supabase stack) that captures use case data as it is generated. Each participant logs their tests; the facilitator adjudicates each entry; the portfolio accumulates as a living document throughout the engagement and is exported as the deliverable at week four.

### Five-E: Sandbox boilerplate templates

A1. USE CASE PORTFOLIO ENTRY TEMPLATE Use Case [Number]: [Short Name]

Workflow tested. [Description of the actual workflow the staff member was performing — e.g., "drafting the monthly donor newsletter," "researching exegesis for a four-week Romans series," "summarizing the quarterly board financial report for the executive team."] Recipe applied. [Name of the Claude skill or recipe used, with version reference.] Tested by. [Staff member name and role.] Time invested in test. [Hours or days.] Time savings observed. [Quantitative estimate against baseline workflow, with caveats about whether the test was representative of typical conditions.] Value promised. [Specific value the use case offers if deployed: time savings per occurrence, revenue impact if applicable, work improvement description. Quantify where possible; describe qualitatively where not.] Frequency of underlying workflow. [How often this work happens — weekly, monthly, annually, ad hoc. Multiplies the value estimate.] Human and ethical concerns surfaced. [What the staff member or team noticed: places where the AI output felt off, places where the workflow now requires more rather than less human attention, places where the integrity of the work is potentially affected, places where the recipient of the work might feel differently if they knew AI was involved.] Safety alignment. [Reference to specific Safety documents that govern this use case: Acceptable Use Policy clauses that apply, Data Handling Standards relevant to the data involved, Care Boundaries that bear on this work, Disclosure and Attribution Standard implications.] Adjudication. [Green / Yellow / Red, with reasoning.] If yellow: required revision. [What specifically must change before this use case can move to green status. Could include: technical refinement of the recipe, addition of human review steps, formational preparation of the staff using it, leadership decision on a specific concern, additional documentation in Safety files.] If red: rationale. [Why this use case is not pursued in this organization. The rationale should be specific enough that a future staff member who suggests the same use case can read this entry and understand the prior decision.] A2. DISCERNMENT MEMO STRUCTURE Discernment Memo: [Organization Name] Sandbox Discovery

Engagement dates. [Start and end dates of the four-week Sandbox.] Participants. [Roles and number of staff who participated.] What we tested. [Brief overview of the use cases explored, organized by domain — communications, formation, operations, etc.] What surfaced as patterns of value. [Two to four paragraphs naming the kinds of work where AI assistance produced consistent value in this organization. Be specific: in this organization, AI was genuinely helpful for X, Y, and Z. The pattern is not generic. It reflects this team, this work, this season.] What surfaced as patterns of concern. [Two to four paragraphs naming the kinds of work where AI assistance produced consistent unease, friction, or integrity questions. Again be specific. Concerns are honored as data, not dismissed as resistance.] What we learned about ourselves. [One to two paragraphs naming what the team noticed about its own relationship to AI through the four weeks. People discover surprising things about themselves when they actually use these tools rather than discussing them in the abstract. Capture what surfaced.] What we now believe is true. [Two or three short statements that the leadership endorses as the organization's current position, derived from this engagement. These statements may evolve. They are the organization's honest read of its own situation as of the end of the Sandbox.] What we are choosing to do next. [Concrete decisions: which green-light use cases will deploy immediately, which yellow-light use cases the organization will revise and reconsider, which red- light use cases are documented as off-limits, and whether the organization will pursue Skills, Solutions, both, or neither in the next season.] A3. READINESS ASSESSMENT TEMPLATE Readiness Assessment: [Organization Name] At the conclusion of Sandbox Discovery, the following observations inform our recommendation regarding next stages. Observed staff capacity for AI work. [Description: where staff demonstrated genuine competence, where staff hit ceilings of comfort or capability, where formational work would most benefit the organization.]

Observed leadership clarity. [Description: where leadership has clear convictions about AI use, where leadership is still working through its position, where the team is awaiting leadership clarity to proceed.] Observed technological readiness. [Description: where the organization's existing tools and infrastructure are sufficient for the green-light use cases, where infrastructure changes would unlock substantial additional value, where premature technology investment would compound problems rather than solve them.] Recommended next stage. [Choose one and elaborate:] Option A: Skills Development is the priority. The Sandbox surfaced significant capacity-building opportunities; the organization's green-light use cases require deeper formation before they will be sustained. Recommend Skills Development before any further technology investment. Option B: Solutions Deployment is appropriate now. The Sandbox surfaced clear, valuable, deployable use cases; the team is ready to operate them; existing technology with focused customization is sufficient. Recommend a focused Solutions engagement, with Skills as an optional later addition. Option C: Both Skills and Solutions in parallel. The organization has both the capacity opportunity and the deployment opportunity; running them in sequence would lose momentum. Recommend overlapping engagement with clear coordination. Option D: Neither at this time. The Sandbox surfaced that the organization's current state is well-served by the green-light use cases now operating, and that further investment would not currently produce proportional value. Recommend operating the current state, revisiting in 12- 18 months. DECISIONS THE ORGANIZATION MUST MAKE

- Who from our organization will participate in the Sandbox? (Typically 4-10 people across roles.

Choose for diversity of role and openness to learning rather than pre-existing AI enthusiasm.)

- What time can each participant commit weekly to the Sandbox? (Realistic estimate: 3-5 hours per week per participant during the four-week engagement.)

- What workflows are we most curious about testing? (Initial list, knowing the Sandbox will surface use cases we did not anticipate.)

- What concerns or hesitations do we want to actively explore? (The Sandbox is as valuable for naming concerns as for finding value.)

- Who in our leadership owns the adjudication decisions? (Yellow and red light decisions ultimately need leadership ratification, not just facilitator recommendation.)

- What is our intended posture toward concerns that surface? (Some organizations want to push through concerns; others want to honor them as data; the right posture is a leadership decision.)

- How will the Use Case Portfolio be maintained after the engagement ends? (Living documents need owners; without one, the portfolio becomes a snapshot rather than an ongoing reference.)

MOVEMENTAL'S ROLE BY LEVEL At Level 1 (Self-Service Sandbox Toolkit, ~$497): Movemental publishes a downloadable Sandbox toolkit containing the assessment artifact (delivered as a Claude artifact link), a starter library of generic Claude skills the organization can adapt to its own context, the Use Case Portfolio template, the Discernment Memo template, the Readiness Assessment template, and a four-week facilitator guide that a senior leader can use to run the Sandbox internally. The organization runs its own Sandbox. Movemental provides the materials and a single 60-minute orientation call. This level is appropriate for organizations with internal capacity to facilitate their own discovery. At Level 2 (AI-Assisted Sandbox, ~$3,997): Movemental provides a configured set of Claude skills tuned to the organization's segment and Safety documentation, the assessment artifact pre-customized for the organization, the Use Case Portfolio interface (web-based), and asynchronous facilitator support throughout the four weeks (typically 2-3 hours of facilitator time per week, delivered through the portfolio interface and email). The organization runs the engagement; Movemental provides the technological infrastructure and asynchronous expertise. This level scales to organizations that want strong support without full facilitation. At Level 3 (Facilitated Sandbox Discovery, $15,000): A Movemental facilitator runs the full four-week engagement. The facilitator delivers the assessment, configures the Claude skills against the organization's Safety documentation, conducts weekly working sessions with the participant team, adjudicates use cases collaboratively with leadership, drafts the Discernment Memo and Readiness Assessment, and concludes with a leadership conversation. The Use Case Portfolio interface is used throughout. This is the standard offering for organizations engaging Movemental for Sandbox. Network Engagement Sandbox (Institutions only, from $60,000): For denominations, training networks, and multi-site organizations, the Sandbox can be run as a Network Engagement that includes the institution itself plus 3-10 member organizations, with shared discovery, shared portfolio, and a teaching artifact published to the broader network at the conclusion. Pricing scales with scope.

Stage 03: Skills


## F. Essay — *The Movemental Thesis* — “The path” section (verbatim excerpt)

## The path

There is a path through. Not a formula. Not a vendor roadmap. A sequence learned in painful public view: organizations that do well tend to obey it. Organizations that fail tend to invert it. The sequence is Safety, Sandbox, Skills, Solutions. The order is not decorative. Skip one and the later steps have nothing solid to stand on.

Safety means governance with real authority, ethical and conviction-level naming of what will be tested when you adopt these tools, and explicit boundaries on where AI does and does not belong in this organization’s work. It is not a ban by default. It is confidence to move without betraying the mission. Safety is what lets an executive director sleep after reading AI-drafted donor language that suddenly sounds like a stranger. Without Safety, speed curdles into self-suspicion.

Sandbox means structured exploration: bounded space, stated hypotheses, defined use cases, a learning loop, shared artifacts. It is not shadow IT scattered across twelve staff members. It is not a pilot that becomes production by accident. It is the protected place where the organization learns what it is becoming before it bets the mission on the answer. Sandbox is where you earn the right to have opinions that are not merely personal preferences. It is also where you discover the trip-wires your policy will later need to protect.

Skills means formation, not training. Training transfers discrete techniques. Formation reshapes judgment. The capacities that matter are discernment, authorship, and stewardship: recognizing drift, holding the pen, knowing what must remain unmediated. Skills are what keep a clever tool from becoming a substitute conscience. Two staff members can use the same system and produce opposite organizational futures, depending on whether their formation made them more careful or more careless with the truth.

Solutions means deployment into real workflows, owned by humans who can course-correct, governed by policy that is already real, under leadership that can name the tradeoffs. Solutions matter. They come last because their value is conditional on the previous three being in place. Solutions first is how you get fast outputs and slow trust. Solutions last is how you get outputs that still look like you when the novelty wears off.

The framework is introduced as a staircase, not a menu. The invitation to treat it as a threshold rather than a table of contents is deliberate.

The most expensive mistake is inversion: starting at Solutions because that is where ROI slides live, then retrofitting policy, training, and conviction afterward. Retrofitted governance is rarely enforceable. Retrofitted formation produces cargo-cult competence. Retrofitted theology becomes either toothless or cruel. Doing the sequence forward is slower only if you measure speed in press releases. If you measure speed in rework avoided and trust preserved, the forward path is faster.

One more word about inversion, because it hides inside virtuous language. “We are being responsive” can mean “we are being led by whatever is loudest.” “We are being careful” can mean “we are refusing to learn in public because learning would admit uncertainty.” The sequence is not a personality type. It is a discipline that keeps responsiveness from becoming drift and carefulness from becoming cowardice.


## G. Production app: shared path data

### `src/data/shared-path-data.ts` (Safety + Sandbox + checklist — verbatim TypeScript)

```typescript
// shared path data for audience pages

export const stageMeta = [
  {
    num: "01",
    name: "Safety",
    protect: "Protects #2",
    mapDesc: "Trust, data, and mission boundaries.",
    tagline: "Protect trust, data, and mission boundaries.",
    sentence: "Decide as a leadership team what staff are <em>allowed to do with AI today</em>, and put it in writing your people will actually read.",
    doneWhen: [
      "Leaders agree on what is allowed, discouraged, and prohibited",
      "Sensitive information has been classified clearly",
      "Staff know the policy exists and can find it",
      "There is a plan for what happens when something goes wrong"
    ],
    watchFor: "If Safety is skipped, <em>staff form habits before standards exist</em>."
  },
  {
    num: "02",
    name: "Sandbox",
    protect: "Protects #3",
    mapDesc: "Real use cases, no sensitive data.",
    tagline: "Explore real use cases without exposing sensitive information.",
    sentence: "Run a small set of approved experiments <em>without sensitive data</em>, and capture what you learn somewhere leadership can actually see it.",
    doneWhen: [
      "Experiments avoid private or sensitive data",
      "Each experiment has an owner",
      "Learning is captured in one shared place",
      "Leadership can see what is working, what is risky, and what should stop"
    ],
    watchFor: "If Sandbox is skipped, experimentation goes <em>private, scattered, and impossible to learn from</em>."
  },
  {
    num: "03",
    name: "Skills",
    protect: "Protects #4",
    mapDesc: "Judgment, review, shared language.",
    tagline: "Train staff to use AI responsibly across roles.",
    sentence: "Form your people — not just train them — so their <em>judgment holds up</em> when AI is in the room.",
    doneWhen: [
      "Staff can explain what AI is appropriate for",
      "AI-assisted work is reviewed before public or sensitive use",
      "Teams know when human judgment has to lead",
      "Leaders model responsible uncertainty"
    ],
    watchFor: "If Skills is skipped, <em>AI becomes a habit before it becomes a discipline</em>."
  },
  {
    num: "04",
    name: "Solutions",
    protect: "The build",
    mapDesc: "Tools shaped around the work.",
    tagline: "Build tools that fit your workflows, voice, and mission.",
    sentence: "Build only after <em>safety, experimentation, and staff capability</em> are in place.",
    doneWhen: [
      "Tools follow the safety rules already established",
      "Staff know how to use and review outputs",
      "Workflow ownership is clear",
      "The system reduces fragmentation instead of adding another tool"
    ],
    watchFor: "If Solutions are rushed, the organization gets <em>tools that look useful but don’t fit</em> the people, the data, or the mission."
  }
];

export const safetyQuickItems = [
  "Ownership is assigned",
  "AI posture is agreed",
  "Allowed and prohibited uses are written",
  "Sensitive data is classified",
  "Staff policy is published",
  "Review and update rhythm is scheduled"
];

export const safetyChecklistRows = [
  {
    index: "i",
    name: "One leader and one decision group own this",
    example: "One senior leader — your executive director, chief of staff, or COO — is officially the person responsible for AI at the organization. A small group (your senior team plus one or two board members) meets on a recurring schedule to make AI decisions together. <strong>Both are written down, both are on the calendar, and every staff member knows who they are.</strong>"
  },
  {
    index: "ii",
    name: "Leaders agree on what your organization believes about AI",
    example: "Your senior leaders have spent real time talking through what your organization believes about people, truth, privacy, and what should never be handed off to a machine — and they have written it down on one page in plain English. Faith-based organizations name where their faith draws the line. Other organizations name the values that draw it. <strong>Either way, the page is in your own words, not a template.</strong>"
  },
  {
    index: "iii",
    name: "A short, signed list of “here is what we will and won’t do with AI”",
    example: "Five to ten clear sentences, written in your own words and signed by the leaders who actually run the organization, that say what you will and will not do with AI. <strong>Short enough to read out loud at the start of a staff meeting, specific enough to settle an argument</strong>, and used as the standard for every AI decision from now on."
  },
  {
    index: "iv",
    name: "A complete list of every kind of sensitive information you handle",
    example: "A simple spreadsheet listing every type of sensitive information your organization touches: donor names and contact info, the people you serve, employee records, financial data, counseling or case notes, legal records, partner agreements, and so on. For each one, you have written down where it is stored, why you have it, and how long you keep it. <strong>Nothing is missing.</strong>"
  },
  {
    index: "v",
    name: "Information sorted into “safe to use” and “never use” groups",
    example: "Every type of information from your inventory is sorted into clear groups — <strong>fine to use with AI, okay with care, restricted, or never enters AI tools.</strong> The “never” list is short, specific, and written down. Any staff member can look at a document or a piece of information and know which group it falls into."
  },
  {
    index: "vi",
    name: "A short policy that tells staff what they can and can’t do with AI",
    example: "One short document — readable in under ten minutes by a brand-new hire — that says clearly what staff are allowed to do with AI, what they are not allowed to do, and why. Plain English, not legal language. Where it borrows rules from your AI tool’s own policy (ChatGPT, Claude, Microsoft Copilot, etc.), it quotes them directly so <strong>staff have one trusted source to point to when a donor, parent, or partner asks.</strong>"
  },
  {
    index: "vii",
    name: "The AI tool is set up to follow your rules automatically",
    example: "The AI tools you have approved are set up so your policy is built in, not optional. That means: staff sign in with their work account (no personal accounts on the side), accounts are removed when people leave, the tool keeps a record of how it is used, and any tool that connects to your other systems has a named owner. If you handle health, legal, or other regulated information, that work lives in a separate, locked-down environment with the right contracts in place. <strong>A written policy the tool itself ignores does not count.</strong>"
  },
  {
    index: "viii",
    name: "A clear plan for what to do when something goes wrong",
    example: "A short, written plan that says exactly what to do at each level of problem — from a near-miss (“I almost pasted donor info into ChatGPT”) to a real exposure (“a draft with a beneficiary’s name was sent to a vendor”). The plan names <strong>who to tell, how fast, and what happens next.</strong> Staff who report a near-miss are not punished, and near-misses are tracked in a simple log so you can see patterns before they become incidents."
  },
  {
    index: "ix",
    name: "All of these documents live in one easy-to-find place",
    example: "Your beliefs page, AI policy, data list, “never” list, incident plan, and a short glossary all live in one folder or page that any staff member can find from the staff homepage in <strong>less than thirty seconds.</strong> If a new hire on day one cannot find it that fast, it does not yet exist."
  },
  {
    index: "x",
    name: "A practice run of “what if something goes wrong”",
    example: "Before any real incident happens, your senior team sits down together and walks through a realistic scenario — for example, <em>“a staff member uploaded a donor list to an unapproved AI tool”</em> — step by step, with the actual people who would handle it. The exercise exposes gaps you didn’t see on paper, and <strong>the plan gets fixed afterward, before a real incident teaches the same lessons more expensively.</strong>"
  },
  {
    index: "xi",
    name: "Every staff member has read and signed the AI policy",
    example: "Every single staff member who has access to AI tools has signed your AI policy. The list of who signed is checked against your HR roster — not against memory, not “most people.” <strong>This is the clear gate: nobody starts using AI on real work until everyone has signed.</strong>"
  },
  {
    index: "xii",
    name: "A one-page public statement, ready before anyone asks",
    example: "One page, written in your voice, that you can hand to your board, a regulator, a funder, a major donor, your denomination, an accreditor, or a key partner if they ask <em>“how does your organization use AI?”</em> It exists <strong>before the first time anyone asks the question</strong>, and staff use the same wording so the answer is consistent across the organization."
  },
  {
    index: "xiii",
    name: "A regular schedule of check-ups, on the calendar",
    example: "Every quarter, your decision group reviews the AI tool’s usage records, who has access to what, and whether the rules about how long data is kept are being followed. Every month, your senior team sees usage numbers. Each review is on the calendar with a name next to it. <strong>If it is not on the calendar, it does not happen.</strong>"
  },
  {
    index: "xiv",
    name: "A way to update the policy as you learn",
    example: "Every incident, near-miss, or experiment that didn’t go as planned ends with one question: <em>“What should we change in our training, policy, or tools so this is less likely next time?”</em> The policy is dated and numbered (v1.0, v1.1, v1.2…) with a short list of what changed and when. <strong>A policy that has never been updated is a policy that has not yet met the real world.</strong>"
  }
];
```

---


## H. Production app: `/pathway/safety` page component (verbatim TSX)

```tsx
"use client";

import React, { useEffect } from 'react';
import Link from "next/link";

import { Container } from '@/components/studio/Container';
import { Reveal } from '@/components/studio/Reveal';

export function SafetyPage() {
  useEffect(() => {
    document.title = "Safety Documentation | Movemental";
  }, []);

  const deliverables = [
    "AI Use & Trust Charter (organization-specific, mission-aligned)",
    "Roles & Decision Rights matrix",
    "Data Hygiene Audit",
    "AI Risk Register specific to the sector",
    "Acceptable Use Policy for staff and contractors",
    "Vendor Evaluation Framework",
    "Sector-Specific AI Boundaries document",
    "Data Handling Standards (Donor, Member, or Beneficiary)",
    "Incident Response Protocol",
    "Staff Communication Kit",
    "Board Briefing Document",
    "90-Day Readiness Roadmap",
    "Charter Adoption Checklist",
  ];

  const faqs = [
    {
      q: "Do we really need 14 documents?",
      a: "You don't need documents for the sake of documents. You need the clarity they force. These artifacts answer the questions your staff is already asking informally, and they protect your board from assumed risk.",
    },
    {
      q: "Is this just legal boilerplate?",
      a: "No. Boilerplate won't address theology, donor trust, or mission alignment. We draft the policies, but they are tuned to your specific organizational constraints.",
    },
    {
      q: "Who needs to be involved?",
      a: "Typically the executive team and a board representative. Staff is brought in once the charter and readiness roadmap are established.",
    },
  ];

  return (
    <div className="pt-24 pb-20 md:pt-32">
      <Container>
        <Reveal>
          <div className="max-w-4xl mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary/70 mb-4 block">Stage 01</span>
            <h1 className="font-serif-display text-5xl md:text-6xl lg:text-7xl italic mb-6 text-foreground">
              Safety Documentation
            </h1>
            <p className="lede text-xl md:text-2xl text-muted-foreground leading-relaxed mb-6">
              Your AI policy, governance, and human-readiness, drafted in two weeks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Link href="/contact?interest=safety-documentation" className="btn-pill btn-pill--primary">Start with Safety</Link>
            </div>
            <div className="flex gap-4 items-center text-sm font-medium uppercase tracking-widest text-foreground">
              <span>2 Weeks</span>
              <span className="text-primary">•</span>
              <span>$5,000</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 italic">Standard engagement. Timeline and scope adapt to your situation.</p>
          </div>
        </Reveal>
      </Container>

      <section className="bg-section py-20 border-y border-border">
        <Container>
          <Reveal>
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl">
              <div>
                <h2 className="font-serif-display text-3xl italic mb-6">Why this stage matters</h2>
                <div className="space-y-4 text-[1.0625rem] text-muted-foreground leading-relaxed">
                  <p>
                    Most organizations spend three months arguing about AI policy in circles because no one owns the first draft. The result is a vague statement that neither protects the organization nor empowers the staff.
                  </p>
                  <p>
                    We draft yours in two weeks. Fast, specific, and mission-aligned. You spend the second week reviewing, refining, and ratifying. You exit this stage with a charter your board can actually sign, data hygiene standards that protect your constituents, and a clear set of boundaries for your staff.
                  </p>
                </div>
              </div>
              <div className="bg-card border border-border p-8 rounded-2xl">
                <h3 className="font-semibold text-lg text-foreground mb-6">What&apos;s included</h3>
                <ul className="space-y-3">
                  {deliverables.map((item, i) => (
                    <li key={i} className="flex gap-3 text-[1.0625rem] text-muted-foreground"><span className="text-primary">—</span> {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 md:py-28">
         <Container>
            <Reveal>
              <h2 className="font-serif-display text-3xl md:text-4xl italic mb-12 text-foreground max-w-3xl">
                Questions about Safety Documentation
              </h2>
              <div className="max-w-4xl space-y-8">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-card border border-border p-8 rounded-2xl">
                    <h3 className="font-medium text-lg md:text-xl text-foreground mb-4">{faq.q}</h3>
                    <p className="text-muted-foreground leading-relaxed text-[1.0625rem]">{faq.a}</p>
                  </div>
                ))}
              </div>
            </Reveal>
         </Container>
      </section>

      <section className="bg-primary/5 py-20 border-t border-primary/20">
        <Container>
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary mb-4 block">What happens next</span>
              <h2 className="font-serif-display text-3xl italic mb-6">Move from theory to practice.</h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Once governance is established and constraints are clear, the next step is safely testing the technology against your actual work. Sandbox Discovery is ready.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/pathway/sandbox" className="btn-pill btn-pill--ghost">Explore Stage 02: Sandbox Discovery</Link>
                <Link href="/contact?interest=safety-documentation" className="btn-pill btn-pill--primary">Ready to start Safety?</Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}

```


## I. Production app: `/pathway/sandbox` page component (verbatim TSX)

```tsx
"use client";

import React, { useEffect } from 'react';
import Link from "next/link";

import { Container } from '@/components/studio/Container';
import { Reveal } from '@/components/studio/Reveal';

export function SandboxPage() {
  useEffect(() => {
    document.title = "Sandbox Discovery | Movemental";
  }, []);

  const deliverables = [
    "Pre-engagement team assessment",
    "Four weeks of facilitated discovery sprints",
    "Private sandbox environment access",
    "Weekly facilitated working sessions (2 hours)",
    "Use Case Discovery Framework",
    "Use Case Scoring Rubric",
    "Candidate Use Case Briefs (8-14)",
    "Use Case Portfolio (ready to fund or kill)",
    "Post-engagement capability assessment",
    "Living Case Study artifact",
  ];

  const faqs = [
    {
      q: "Why four weeks?",
      a: "Shorter isn't enough time to surface non-obvious use cases. Longer leads to fatigue. Four weeks provides enough pressure to focus and enough space to experiment.",
    },
    {
      q: "Who sits in the Sandbox?",
      a: "A cross-functional team of 4 to 8 people. You need operators, creatives, and at least one skeptic. We facilitate.",
    },
    {
      q: "What happens to the data we put in the sandbox?",
      a: "The sandbox is privacy-protected and publishing-prevented. Models running here do not use your data for training. It is the safest place for your team to play.",
    },
  ];

  return (
    <div className="pt-24 pb-20 md:pt-32">
      <Container>
        <Reveal>
          <div className="max-w-4xl mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary/70 mb-4 block">Stage 02</span>
            <h1 className="font-serif-display text-5xl md:text-6xl lg:text-7xl italic mb-6 text-foreground">
              Sandbox Discovery
            </h1>
            <p className="lede text-xl md:text-2xl text-muted-foreground leading-relaxed mb-6">
              Find what&apos;s worth building. Prove it. Document the cost of getting it wrong.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Link href="/contact?interest=sandbox-discovery" className="btn-pill btn-pill--primary">Start a Sandbox</Link>
            </div>
            <div className="flex gap-4 items-center text-sm font-medium uppercase tracking-widest text-foreground">
              <span>4 Weeks</span>
              <span className="text-primary">•</span>
              <span>$15,000</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 italic">Standard engagement. Timeline and scope adapt to your situation.</p>
          </div>
        </Reveal>
      </Container>

      <section className="bg-section py-20 border-y border-border">
        <Container>
          <Reveal>
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl">
              <div>
                <h2 className="font-serif-display text-3xl italic mb-6">Why this stage matters</h2>
                <div className="space-y-4 text-[1.0625rem] text-muted-foreground leading-relaxed">
                  <p>
                    Most organizations buy AI tools and then look for problems to solve with them. It usually results in scattered experiments, mild amusement, and abandoned software licenses.
                  </p>
                  <p>
                    We do the opposite. Your team finds the problems worth solving, proves the value in a secure environment, and documents the risk — before anyone signs a procurement contract. The outcome is a structured portfolio of use cases, scored by impact and risk, ready for a funding decision.
                  </p>
                </div>
              </div>
              <div className="bg-card border border-border p-8 rounded-2xl">
                <h3 className="font-semibold text-lg text-foreground mb-6">What&apos;s included</h3>
                <ul className="space-y-3">
                  {deliverables.map((item, i) => (
                    <li key={i} className="flex gap-3 text-[1.0625rem] text-muted-foreground"><span className="text-primary">—</span> {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 md:py-28">
         <Container>
            <Reveal>
              <h2 className="font-serif-display text-3xl md:text-4xl italic mb-12 text-foreground max-w-3xl">
                Questions about Sandbox Discovery
              </h2>
              <div className="max-w-4xl space-y-8">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-card border border-border p-8 rounded-2xl">
                    <h3 className="font-medium text-lg md:text-xl text-foreground mb-4">{faq.q}</h3>
                    <p className="text-muted-foreground leading-relaxed text-[1.0625rem]">{faq.a}</p>
                  </div>
                ))}
              </div>
            </Reveal>
         </Container>
      </section>

      <section className="bg-primary/5 py-20 border-t border-primary/20">
        <Container>
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary mb-4 block">What happens next</span>
              <h2 className="font-serif-display text-3xl italic mb-6">Equip the whole organization.</h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                The Sandbox proves what&apos;s possible for a small team. Skills Development scales that capability across the organization so everyone shares the same language.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/pathway/skills" className="btn-pill btn-pill--ghost">Explore Stage 03: Skills Development</Link>
                <Link href="/contact?interest=sandbox-discovery" className="btn-pill btn-pill--primary">Ready to start a Sandbox?</Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}

```


## J. Production app: Sandbox stage panel (`SandboxContent.tsx`, verbatim)

```tsx
"use client";

import React from 'react';
import { stageMeta } from '@/data/shared-path-data';

export function SandboxContent() {
  return (
    <div className="prose max-w-none text-foreground/80 text-lg leading-relaxed space-y-12">
      <div>
        <p className="font-serif-display text-3xl md:text-4xl leading-tight mb-8 text-foreground/90" dangerouslySetInnerHTML={{ __html: stageMeta[1].sentence }} />
        
        <div className="mt-12 bg-section p-8 rounded-card border border-border">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">The Sandbox pact</div>
          <p className="mb-8 font-medium text-foreground">Sandbox is not "everyone try whatever you want." It is structured experimentation inside boundaries. Two rules make it safe enough to actually learn from. If either one is missing, the experiment doesn't run yet.</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card p-6 rounded-lg border border-border">
               <div className="text-xs uppercase tracking-widest font-semibold text-primary mb-2">Rule 01</div>
               <h5 className="text-lg font-bold text-foreground mb-3 mt-0">Nothing made in the sandbox gets published.</h5>
               <p className="text-sm m-0 text-muted-foreground">While experiments are running, AI-generated work doesn't leave the organization. Not to donors, not to the public, not to the people you serve. The sandbox is for learning what works — not for shipping it. Anything that ships goes through a separate approval step after the experiment is done.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
               <div className="text-xs uppercase tracking-widest font-semibold text-primary mb-2">Rule 02</div>
               <h5 className="text-lg font-bold text-foreground mb-3 mt-0">Private information stays private — by process, not by promise.</h5>
               <p className="text-sm m-0 text-muted-foreground">Before any experiment runs, you have a real, trained procedure for keeping sensitive information out of AI tools. Not a memo people skim — an actual process every staff member has been walked through. If a privacy breach is even possible, the experiment doesn't run yet.</p>
            </div>
          </div>
          
          <p className="mb-10 text-muted-foreground">With both rules in place, your team is free to actually explore — to find where AI saves time on tedious work, helps generate revenue, or raises the quality of what you produce. Those three places are where most of the value lives.</p>
          
          <div className="border-t border-border pt-10">
             <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-6">How the experiment runs</div>
             <p className="mb-8 font-medium">An eight-week structured process for finding, documenting, and reviewing AI use cases that fit your organization.</p>
             
             <div className="space-y-8">
                <div className="pl-6 border-l-2 border-border relative">
                  <div className="absolute w-3 h-3 bg-card border-2 border-primary rounded-full -left-[7px] top-1" />
                  <h6 className="font-bold text-foreground mt-0 mb-2">Step 01 — Recipes:</h6>
                  <p className="text-sm m-0">Movemental brings a starting list of proven AI use cases — across fundraising, communications, programs, and operations. Your team picks the ones worth testing for your organization.</p>
                </div>
                <div className="pl-6 border-l-2 border-border relative">
                  <div className="absolute w-3 h-3 bg-card border-2 border-primary rounded-full -left-[7px] top-1" />
                  <h6 className="font-bold text-foreground mt-0 mb-2">Step 02 — Experiment:</h6>
                  <p className="text-sm m-0">Each use case gets a designated owner and runs as a structured experiment, using anonymized examples or made-up data. No real donors, no real client records, no real financials.</p>
                </div>
                <div className="pl-6 border-l-2 border-border relative">
                  <div className="absolute w-3 h-3 bg-card border-2 border-primary rounded-full -left-[7px] top-1" />
                  <h6 className="font-bold text-foreground mt-0 mb-2">Step 03 — Log the value:</h6>
                  <p className="text-sm m-0">Every experiment is logged in one shared place — what was tried, what worked, and what kind of value it produced (time saved, revenue generated, or quality improved). AI helps assess the value; a human reviews every entry.</p>
                </div>
                <div className="pl-6 border-l-2 border-border relative">
                  <div className="absolute w-3 h-3 bg-card border-2 border-primary rounded-full -left-[7px] top-1" />
                  <h6 className="font-bold text-foreground mt-0 mb-2">Step 04 — Open visibility:</h6>
                  <p className="text-sm m-0">The whole organization can see the running list. Anyone on staff can flag an ethical or trust concern on any use case — no special training, no permission needed.</p>
                </div>
                <div className="pl-6 border-l-2 border-transparent relative">
                  <div className="absolute w-3 h-3 bg-card border-2 border-primary rounded-full -left-[7px] top-1" />
                  <h6 className="font-bold text-foreground mt-0 mb-2">Step 05 — Governance review:</h6>
                  <p className="text-sm mb-4">At the end of the eight weeks, your decision group reviews each use case — its value, and any concerns staff flagged — and assigns one of three lights:</p>
                  
                  <ul className="list-none m-0 space-y-3 bg-card border border-border rounded-lg p-5">
                     <li className="flex gap-4 text-sm"><div className="w-4 h-4 rounded-full bg-status-go mt-0.5 shrink-0" /><span className="leading-tight"><strong className="text-foreground font-semibold">Green light</strong> — Clear value, no concerns. Ready to use across the team.</span></li>
                     <li className="flex gap-4 text-sm"><div className="w-4 h-4 rounded-full bg-status-caution mt-0.5 shrink-0" /><span className="leading-tight"><strong className="text-foreground font-semibold">Yellow light</strong> — Real value, but only with specific guardrails — <em dangerouslySetInnerHTML={{ __html: "used this way, and only this way." }} /></span></li>
                     <li className="flex gap-4 text-sm"><div className="w-4 h-4 rounded-full bg-status-stop mt-0.5 shrink-0" /><span className="leading-tight"><strong className="text-foreground font-semibold">Red light</strong> — Off the table. Added to the "never" list, alongside the boundaries from Safety.</span></li>
                  </ul>
                </div>
             </div>
             
             <p className="mt-8 font-serif-display italic text-2xl text-foreground m-0">What you walk away with is a recipe book your organization actually agreed on.</p>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-border">
        <div>
           <h4 className="font-sans font-semibold text-sm mb-4 text-foreground uppercase tracking-wider">Required before proceeding</h4>
           <ul className="space-y-3 m-0 list-none p-0 text-base">
             {stageMeta[1].doneWhen.map((req, j) => (
               <li key={j} className="flex items-start"><span className="text-primary font-bold mr-3">✓</span> {req}</li>
             ))}
           </ul>
        </div>
        <div>
           <h4 className="font-sans font-semibold text-sm mb-4 text-foreground uppercase tracking-wider">If you skip this stage</h4>
           <div className="bg-background border border-border p-6 rounded-lg text-base">
              <p className="flex items-start m-0"><span className="text-primary/60 mr-3 mt-0.5">—</span> <span dangerouslySetInnerHTML={{ __html: stageMeta[1].watchFor.replace('If Sandbox is skipped, ', '') }} /></p>
           </div>
        </div>
      </div>
    </div>
  );
}

```


## K. Production app: `/path` page — Hero through Sandbox deep dive (verbatim TSX excerpt)

```tsx
function Hero() {
  return (
    <section
      className="band-midnight hero hero--fold hero--path"
      aria-labelledby="path-hero-h1"
    >
      <div className="container">
        <p className="eyebrow">The Movemental AI Path</p>
        <h1 className="display" id="path-hero-h1">
          A clear path for leading your organization{" "}
          <em>through AI.</em>
        </h1>
        <p className="lede lede--regular">
          Most organizations either rush into AI or avoid it. Movemental
          provides a wiser way — an ordered path that builds safety, develops
          real capability, and leads to solutions your organization can trust.
        </p>
        <div className="hero-actions">
          <BtnPill href="/start-with-safety" variant="primary">
            Start with Safety
          </BtnPill>
          <BtnPill href="#stage-safety" variant="ghost">
            See the First Step
          </BtnPill>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 2 — Core Tension                                                  */
/* -------------------------------------------------------------------------- */

const TENSION_COLUMNS: readonly ComparisonColumn[] = [
  {
    label: "Trap one",
    title: "Rush Ahead",
    body: "Adopt tools quickly without shared standards, clear boundaries, or leadership alignment.",
    bullets: [
      "Tools multiply without coordination",
      "Staff develop inconsistent habits",
      "Risk and confusion increase over time",
    ],
  },
  {
    label: "Trap two",
    title: "Stand Still",
    body: "Delay engagement with AI due to uncertainty, risk, or lack of clarity.",
    bullets: [
      "Staff experiment anyway, without guidance",
      "Opportunities are missed",
      "Leadership loses visibility",
    ],
  },
];

function CoreTensionFold() {
  return (
    <section
      className="band-default"
      id="tension"
      aria-labelledby="path-tension-h2"
    >
      <div className="container">
        <SectionHead
          eyebrow="The problem"
          display={
            <>
              Most organizations fall into <em>one of two traps.</em>
            </>
          }
          displayId="path-tension-h2"
        />

        <div
          className="problem-grid"
          aria-label="The two default postures organizations fall into"
        >
          {TENSION_COLUMNS.map((col) => (
            <article key={col.title} className="problem-card">
              <p className="problem-card__label">{col.label}</p>
              <h3>{col.title}</h3>
              {col.body ? <p>{col.body}</p> : null}
              <ul className="path-step__list" style={{ marginTop: "0.4rem" }}>
                {col.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p
          className="matters-section__closing"
          style={{ marginTop: "2rem" }}
        >
          Neither approach leads to responsible, sustainable adoption.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 3 — Full Path Overview                                            */
/* -------------------------------------------------------------------------- */

const OVERVIEW_STEPS: readonly PathOverviewStep[] = [
  {
    number: 1,
    title: "Safety",
    description: "Clear boundaries and shared expectations.",
  },
  {
    number: 2,
    title: "Sandbox",
    description: "Guided exploration inside trusted limits.",
  },
  {
    number: 3,
    title: "Skills",
    description: "Practical capability across your team.",
  },
  {
    number: 4,
    title: "Solutions",
    description: "Tools and workflows built on a human foundation.",
  },
];

function OverviewFold() {
  return (
    <section
      className="band-section path-section"
      id="overview"
      aria-labelledby="path-overview-h2"
    >
      <div className="container path-section__inner">
        <header className="path-section__header">
          <p className="section-eyebrow">The model</p>
          <h2 className="path-section__title" id="path-overview-h2">
            There is a better sequence.
          </h2>
          <p className="path-section__intro">
            Movemental organizes AI adoption into four stages. Each builds on
            the one before it.
          </p>
        </header>

        <ol className="path-steps" aria-label="The four stages of the path">
          {OVERVIEW_STEPS.map((step) => (
            <li key={step.title} className="path-step">
              <div className="path-step__number" aria-hidden="true">
                {step.number}
              </div>
              <h3 className="path-step__title">{step.title}</h3>
              <p className="path-step__body">{step.description}</p>
            </li>
          ))}
        </ol>

        <p
          className="matters-section__closing"
          style={{ marginTop: "1.5rem", textAlign: "left", maxWidth: "52ch" }}
        >
          Most organizations start at Solutions. Movemental starts at Safety.
        </p>

        <div className="path-section__cta">
          <BtnPill href="/start-with-safety" variant="primary">
            Start with Safety
          </BtnPill>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sections 4–7 — Deep dives                                                 */
/* -------------------------------------------------------------------------- */

interface StepDetailProps {
  band: "default" | "section";
  anchorId: string;
  headingId: string;
  stepNumber: number;
  eyebrow: string;
  title: ReactNode;
  body: string;
  subsections: readonly SubSection[];
  cta?: { href: string; label: string };
}

function StepDetailSection({
  band,
  anchorId,
  headingId,
  stepNumber,
  eyebrow,
  title,
  body,
  subsections,
  cta,
}: StepDetailProps) {
  return (
    <section
      className={`band-${band}`}
      id={anchorId}
      aria-labelledby={headingId}
    >
      <div className="container">
        <header
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "1.25rem",
            maxWidth: "min(46rem, 100%)",
            marginBottom: "clamp(2rem, 4vw, 2.75rem)",
          }}
        >
          <div className="path-step__number" aria-hidden="true">
            {stepNumber}
          </div>
          <div style={{ flex: 1 }}>
            <p className="section-eyebrow">{eyebrow}</p>
            <h2 className="path-section__title" id={headingId}>
              {title}
            </h2>
            <p
              className="path-section__intro"
              style={{ marginTop: "0.75rem" }}
            >
              {body}
            </p>
          </div>
        </header>

        <div className="difference-section__grid">
          {subsections.map((sub) => (
            <article key={sub.title} className="difference-block">
              <h3 className="difference-block__title">{sub.title}</h3>
              <ul
                className="path-step__list"
                style={{ marginTop: "0.6rem" }}
              >
                {sub.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {cta ? (
          <div className="path-section__cta" style={{ marginTop: "2rem" }}>
            <BtnPill href={cta.href} variant="primary">
              {cta.label}
            </BtnPill>
          </div>
        ) : null}
      </div>
    </section>
  );
}

const SAFETY_SUBSECTIONS: readonly SubSection[] = [
  {
    title: "Why it comes first",
    bullets: [
      "Prevents fragmented, hidden adoption",
      "Protects sensitive information and trust",
      "Gives leaders shared language and visibility",
    ],
  },
  {
    title: "If you skip this step",
    bullets: [
      "Staff create habits before standards exist",
      "Risk surfaces after damage is done",
      "Leadership becomes reactive instead of proactive",
    ],
  },
];

function SafetyDeepDive() {
  return (
    <StepDetailSection
      band="default"
      anchorId="stage-safety"
      headingId="stage-safety-h2"
      stepNumber={1}
      eyebrow="Step 1"
      title={<>Safety — establish the foundation first.</>}
      body="Before adoption spreads, leaders need clarity. Safety defines what responsible AI use looks like across your organization."
      subsections={SAFETY_SUBSECTIONS}
      cta={{ href: "/start-with-safety", label: "Start with Safety" }}
    />
  );
}

const SANDBOX_SUBSECTIONS: readonly SubSection[] = [
  {
    title: "What this looks like",
    bullets: [
      "Controlled use cases",
      "Leadership-guided experimentation",
      "Clear feedback loops",
    ],
  },
  {
    title: "Why it matters",
    bullets: [
      "Prevents tool sprawl",
      "Builds confidence gradually",
      "Keeps learning aligned across teams",
    ],
  },
];

function SandboxDeepDive() {
  return (
    <StepDetailSection
      band="section"
      anchorId="stage-sandbox"
      headingId="stage-sandbox-h2"
      stepNumber={2}
      eyebrow="Step 2"
      title={<>Sandbox — explore without chaos.</>}
      body="Once boundaries are clear, your organization can begin to experiment. Sandbox creates a safe environment for learning without fragmentation."
      subsections={SANDBOX_SUBSECTIONS}
    />
  );
}

const SKILLS_SUBSECTIONS: readonly SubSection[] = [
  {
    title: "What this includes",
    bullets: [
      "Staff training",
      "Shared language and standards",
      "Role-specific use cases",
    ],
  },
  {
    title: "Outcome",
    bullets: [
      "AI becomes a capability, not a novelty",
      "Teams operate with consistency",
      "Leaders can scale usage responsibly",
    ],
  },
];

```


## L. Production app: audience pathway — `commonDeliverables` + `segmentData` (verbatim TSX)

```tsx
const commonDeliverables = {
  safety: [
    "AI Use & Trust Charter",
    "Roles & Decision Rights",
    "Data Hygiene Audit",
    "AI Risk Register",
    "Acceptable Use Policy",
  ],
  sandbox: [
    "Facilitated discovery sprints",
    "Private sandbox environment",
    "Use Case Discovery Framework",
    "Use Case Scoring Rubric",
    "Use Case Portfolio",
  ],
  skills: [
    "The Movemental AI Wisdom course",
    "Up to 15 participant seats",
    "LMS-hosted recipe library",
    "Facilitator Track",
    "Pre/post capability assessments",
  ],
  solutions: [
    "Integration: Ingest intelligence",
    "Activation: Native AI workflows",
    "Transformation: Adaptive training",
    "Multiplication: Strategic linking",
  ],
};

const segmentData = {
  churches: {
    hero: {
      h1: "Your church is being asked to take a position on AI.",
      subhead:
        "Most churches don’t have a clean answer yet. The Movemental AI Path is a four-step sequence — Safety Documentation, Sandbox Discovery, Skills Development, Solutions Deployment — designed so AI lands on a church that’s ready for it, instead of amplifying problems that were already there.",
      nonNegotiable:
        "Step 1 is the human work. We won’t build solutions on top of a church that hasn’t done it — ours or yours.",
      cards: [
        {
          heading: "Our board is asking and we need a position.",
          body: "Start with Step 1: Safety Documentation. A 14-document governance package drafted in two weeks, ratified in your voice.",
          cta: "Start with Safety Documentation",
          href: "/pathway/safety",
        },
        {
          heading: "Our staff is already experimenting and we need a framework.",
          body: "Start with Step 2: Sandbox Discovery. A structured environment where your team identifies what’s worth building and what isn’t.",
          cta: "Start with Sandbox Discovery",
          href: "/pathway/sandbox",
        },
        {
          heading: "We’re ready to rebuild our digital infrastructure.",
          body: "Start a conversation about Step 4: Solutions Deployment. We’ll confirm your Safety Documentation is in place — ours or yours — before we build.",
          cta: "Talk about Solutions Deployment",
          href: "/contact?interest=solutions-deployment-churches",
        },
      ],
    },
    stops: [
      {
        num: "01",
        name: "Safety Documentation",
        duration: "2 weeks",
        price: "$5,000",
        outcome: "A charter your elder board can sign.",
        deliverables: commonDeliverables.safety,
        href: "/pathway/safety",
      },
      {
        num: "02",
        name: "Sandbox Discovery",
        duration: "4 weeks",
        price: "$15,000",
        outcome: "Pastoral and operational use cases proven safe.",
        deliverables: commonDeliverables.sandbox,
        href: "/pathway/sandbox",
      },
      {
        num: "03",
        name: "Skills Development",
        duration: "8 weeks",
        price: "from $4,800/yr",
        outcome: "Staff trained to lead AI work without losing the plot.",
        deliverables: commonDeliverables.skills,
        href: "/pathway/skills",
      },
      {
        num: "04",
        name: "Solutions Deployment",
        duration: "8-12 weeks",
        price: "from $30K",
        outcome: "Sermons, formation, member care, and communications, integrated.",
        deliverables: commonDeliverables.solutions,
        href: "/pathway/solutions",
      },
    ],
    faqs: [
      {
        q: "Will this conflict with our theology around discernment, presence, and pastoral care?",
        a: "No. The path is designed precisely so AI serves pastoral work rather than replacing it. Safety Documentation specifically codifies where AI must not go.",
      },
      {
        q: "What if our staff isn't technical?",
        a: "Most aren't. The path assumes that. Skills Development is built for non-technical staff to become competent — not engineers, leaders.",
      },
      {
        q: "Do we have to do all four stages?",
        a: "No. Many continue; none are forced.",
      },
    ],
  },
  nonprofits: {
    hero: {
      h1: "Your nonprofit can’t afford to get AI wrong.",
      subhead:
        "Donor data is sacred. Beneficiary data is sacred. Mission integrity is non-negotiable. The Movemental AI Path is a four-step sequence — Safety Documentation, Sandbox Discovery, Skills Development, Solutions Deployment — designed to protect what matters most while the organization adopts what matters next.",
      nonNegotiable:
        "Step 1 is the human work. We won’t build solutions on top of a nonprofit that hasn’t done it — ours or yours.",
      cards: [
        {
          heading: "Our board wants clarity before our staff goes further.",
          body: "Start with Step 1: Safety Documentation. A governance package built around your mission, your data, and your beneficiaries — drafted in two weeks.",
          cta: "Start with Safety Documentation",
          href: "/pathway/safety",
        },
        {
          heading: "We have ideas. We need a way to evaluate them honestly.",
          body: "Start with Step 2: Sandbox Discovery. Structured discovery that surfaces real opportunities and names real risks — before you commit to any tool.",
          cta: "Start with Sandbox Discovery",
          href: "/pathway/sandbox",
        },
        {
          heading: "We’re ready to integrate the work we already have.",
          body: "Start a conversation about Step 4: Solutions Deployment. We’ll confirm your Safety Documentation is in place — ours or yours — before we build.",
          cta: "Talk about Solutions Deployment",
          href: "/contact?interest=solutions-deployment-nonprofits",
        },
      ],
    },
    stops: [
      {
        num: "01",
        name: "Safety Documentation",
        duration: "2 weeks",
        price: "$5,000",
        outcome: "Donor and beneficiary data, governed and protected.",
        deliverables: commonDeliverables.safety,
        href: "/pathway/safety",
      },
      {
        num: "02",
        name: "Sandbox Discovery",
        duration: "4 weeks",
        price: "$15,000",
        outcome: "Mission-aligned use cases, validated.",
        deliverables: commonDeliverables.sandbox,
        href: "/pathway/sandbox",
      },
      {
        num: "03",
        name: "Skills Development",
        duration: "8 weeks",
        price: "from $4,800/yr",
        outcome: "A team that can lead AI work without compromising the mission.",
        deliverables: commonDeliverables.skills,
        href: "/pathway/skills",
      },
      {
        num: "04",
        name: "Solutions Deployment",
        duration: "8-12 weeks",
        price: "from $30K",
        outcome: "Programs, donors, communications, integrated and multiplied.",
        deliverables: commonDeliverables.solutions,
        href: "/pathway/solutions",
      },
    ],
    faqs: [
      {
        q: "How do you protect beneficiary and donor data?",
        a: "The Sandbox is privacy-protected and publishing-prevented by design. Safety Documentation codifies the data handling standards before anything touches a model.",
      },
      {
        q: "Can we afford this?",
        a: "The full Pathway is $65,000. A single comparable engagement at a Big Four consultancy starts at $250,000 and doesn't include the platform.",
      },
      {
        q: "What if we're already using ChatGPT informally?",
        a: "That's exactly when Safety Documentation matters most. Informal use without a charter is the most common path to a problem.",
      },
    ],
  },
  institutions: {
    hero: {
      h1: "Your institution is being asked to lead on AI — internally and externally.",
      subhead:
        "Seminaries, training networks, and denominational bodies face the AI question twice — for their own institution, and for the leaders they’re forming. The Movemental AI Path is a four-step sequence — Safety Documentation, Sandbox Discovery, Skills Development, Solutions Deployment — designed to address both at once.",
      nonNegotiable:
        "Step 1 is the human work. We won’t build solutions on top of an institution that hasn’t done it — ours or yours.",
      cards: [
        {
          heading: "We need an institutional position and a teachable framework.",
          body: "Start with Step 1: Safety Documentation. A charter that governs your institution and serves as a teaching artifact for the leaders and organizations you serve.",
          cta: "Start with Safety Documentation",
          href: "/pathway/safety",
        },
        {
          heading: "We want a Sandbox that doubles as a learning case study.",
          body: "Start with Step 2: Sandbox Discovery. Structured discovery that produces both internal use cases and a published artifact you can extend to your network.",
          cta: "Start with Sandbox Discovery",
          href: "/pathway/sandbox",
        },
        {
          heading: "We’re ready to rebuild our infrastructure and connect our network.",
          body: "Start a conversation about Step 4: Solutions Deployment, including network deployment across member entities. We’ll confirm your Safety Documentation is in place — ours or yours — before we build.",
          cta: "Talk about Solutions Deployment",
          href: "/contact?interest=network-engagement",
        },
      ],
    },
    stops: [
      {
        num: "01",
        name: "Safety Documentation",
        duration: "2 weeks",
        price: "$5,000",
        outcome: "Institutional charter and a teachable governance framework.",
        deliverables: commonDeliverables.safety,
        href: "/pathway/safety",
      },
      {
        num: "02",
        name: "Sandbox Discovery",
        duration: "4 weeks",
        price: "$15,000",
        outcome: "Use cases proven, plus a living teaching artifact.",
        deliverables: commonDeliverables.sandbox,
        href: "/pathway/sandbox",
      },
      {
        num: "03",
        name: "Skills Development",
        duration: "8 weeks",
        price: "from $4,800/yr",
        outcome: "Your staff and your students learning the same wisdom.",
        deliverables: commonDeliverables.skills,
        href: "/pathway/skills",
      },
      {
        num: "04",
        name: "Solutions Deployment",
        duration: "8-12 weeks",
        price: "from $30K",
        outcome: "Curriculum, network, and scholarship, integrated as infrastructure.",
        deliverables: commonDeliverables.solutions,
        href: "/pathway/solutions",
      },
    ],
    faqs: [
      {
        q: "Can we white-label or extend this to the organizations we serve?",
        a: "Yes. Many of our institutional engagements include extension rights or referral structures.",
      },
      {
        q: "Does this work for accredited programs?",
        a: "Yes. Skills Development includes assessment, certification, and credentialing structures compatible with accredited learning environments.",
      },
      {
        q: "What does Solutions Deployment look like for a multi-entity institution?",
        a: "Multi-entity Solutions Deployment engagements are quoted custom under our Network Engagements structure, typically starting at $60,000 and scaling by scope.",
      },
    ],
  },
};

```


## M. Production app: FAQ cluster “The Path” (verbatim TSX excerpt)

```tsx
    id: "the-path",
    num: "02",
    band: "default",
    eyebrow: "The Path",
    display: "The four stages, in order.",
    lede: "Safety, Sandbox, Skills, Solutions. Each stage builds on the one before it.",
    tocLabel: "The Path",
    items: [
      {
        slug: "what-is-the-path",
        q: "What is the Movemental AI Path?",
        a: (
          <>
            A four-stage sequence for adopting AI without losing trust,
            formation, or mission: <strong>Safety</strong> (boundaries first),{" "}
            <strong>Sandbox</strong> (guided exploration next),{" "}
            <strong>Skills</strong> (capability before systems),{" "}
            <strong>Solutions</strong> (tools built on a human foundation).{" "}
            <Link href="/path">See the full Path</Link>.
          </>
        ),
      },
      {
        slug: "why-this-order",
        q: "Why this order? Why not all four in parallel?",
        a: "The order is the work. Skipping Safety means deploying before you know what you are willing to defend. Skipping Sandbox means training judgment in production, on real people. Skipping Skills means importing someone else’s. Solutions deployed without the prior three stages are technical answers to questions the organization has not yet asked itself.",
      },
      {
        slug: "can-we-skip-stages",
        q: "Can we skip stages if we have already done some of this?",
        a: "In practice, every engagement starts where you are. If a Solution has already been deployed, we walk Safety in writing, run the Sandbox the deployment skipped, and form the Skills the deployment assumed. The Solution stays. What changes is whether the organization can defend it.",
      },
      {
        slug: "do-the-stages-overlap",
        q: "Do the stages overlap?",
        a: (
          <>
            Yes — early Sandbox can run while Safety is still being ratified.
            But the order in which work is <em>finished</em> matters: nothing
            leaves the Sandbox into production before Safety is named, and no
            Solutions ship before Skills are formed. The order of completion is
            load-bearing.
          </>
        ),
      },
      {
        slug: "what-does-safety-actually-cover",
        q: "What does Safety actually cover?",
        a: (
          <>
            Five areas: acceptable use, data boundaries, human oversight,
            voice and trust, and ethical/theological guardrails. The artifact
            is a written set of guidelines, a data-boundary map, and shared
            leadership alignment.{" "}
            <Link href="/start-with-safety">
              See what Safety includes
            </Link>
            .
          </>
        ),
      },
      {
        slug: "what-does-sandbox-mean-in-practice",
        q: "What does Sandbox mean in practice?",
        a: (
          <>
            Guided experimentation inside trusted limits. Real use cases,
            controlled scope, leadership-guided. The point is to develop
            judgment in cases that resemble the organization’s real work —
            without that work being put at risk.{" "}
            <Link href="/path">See the Path</Link>.
          </>
        ),
      },
      {
        slug: "what-do-skills-and-solutions-include",
        q: "What do Skills and Solutions include?",
        a: (
          <>
            <strong>Skills</strong>: shared language, role-specific training,
            judgment formation across the team.{" "}
            <strong>Solutions</strong>: workflow integration, custom
            assistants, organization-specific tools — built only after Safety,
            Sandbox, and Skills are in place.{" "}
            <Link href="/path">See the Path</Link>.
          </>
        ),
      },
    ],
  },
  {
```


## N. `docs/ai-studio` alternate stage one-liners (`path-data.ts` stageMeta, verbatim)

```typescript
export const stageMeta = [
  {
    num: '01',
    name: 'Safety',
    protect: 'Protect the mission',
    mapDesc: 'Establish wise guardrails and parameters.',
    sentence: 'Before adopting any tool, an organization must define what is <em>safe</em>. This means establishing guardrails for data, privacy, and missional alignment so staff can experiment without risking the organization\'s reputation or the trust of the people it serves.'
  },
  {
    num: '02',
    name: 'Sandbox',
    protect: 'Protect the team',
    mapDesc: 'Create a contained environment for structured experimentation.',
    sentence: 'Once safety is defined, the organization creates a contained environment for <em>structured experimentation</em>. The goal is not rapid deployment, but rather building fluency and evaluating capabilities without pressure to perform.'
  },
  {
    num: '03',
    name: 'Skills',
    protect: 'Build the capability',
    mapDesc: 'Formalize training for the broader team.',
    sentence: 'The findings from the sandbox are translated into formal training for the <em>broader team</em>. This stage shifts the focus from individual exploration to organizational capability, ensuring everyone shares a common language and baseline skill.'
  },
  {
    num: '04',
    name: 'Solutions',
    protect: 'Accelerate the work',
    mapDesc: 'Build integrated workflows and systems.',
    sentence: 'Only after safety, experimentation, and skills are established does the organization move to building <em>integrated solutions</em>. At this stage, AI is thoughtfully woven into operations, workflows, and perhaps even products or ministry delivery.'
  }
];

```


## O. Case study strips (`src/data/path-data.ts`, verbatim)

```typescript
/** Case study strips for audience pathway pages (ai-studio source of truth). */
export const caseStudies = {
  churches: {
    audienceLabel: "For church leaders.",
    copy: {
      WhyThisWorked: [
        {
          title: "Theological clarity first",
          description:
            "They established limits not just on data, but on what tasks are inherently pastoral and cannot be outsourced.",
        },
        {
          title: "Guided exploration",
          description: "Pastors were given private environments to test sermon prep assistance without fear of judgment.",
        },
        {
          title: "Congregational transparency",
          description: "They openly communicated their AI policy to the church, building trust rather than suspicion.",
        },
      ],
      Stats: [
        { label: "Staff trained", value: "100%" },
        { label: "Policy adopted", value: "3 weeks" },
        { label: "Hours saved/week", value: "12+" },
      ],
      PullQuote:
        "We realized that if we didn't give our staff a theological framework for AI, they would just inherit the framework of the tech companies.",
    },
  },
  nonprofits: {
    audienceLabel: "For nonprofit leaders.",
    copy: {
      WhyThisWorked: [
        {
          title: "Donor data protection",
          description: "Strict enterprise agreements ensured PII never leaked into public training models.",
        },
        {
          title: "Grant writing acceleration",
          description: "They built a custom knowledge base of past successful grants to dramatically speed up drafting.",
        },
        {
          title: "Mission integrity",
          description: "They defined exactly where Human-In-The-Loop review is required to ensure empathy.",
        },
      ],
      Stats: [
        { label: "Grant velocity", value: "3x" },
        { label: "Data breaches", value: "0" },
        { label: "Cost savings", value: "$40k" },
      ],
      PullQuote:
        "It's not just about efficiency. It's about spending less time on administration so we can spend more time sitting across from the people we serve.",
    },
  },
  institutions: {
    audienceLabel: "For institutional leaders.",
    copy: {
      WhyThisWorked: [
        {
          title: "Academic integrity redefined",
          description:
            "Moved away from fragile AI detectors to designing assessments that evaluate process over mere output.",
        },
        {
          title: "Faculty alignment",
          description:
            "Created safe spaces for skeptical faculty to explore capabilities before setting departmental policies.",
        },
        {
          title: "Student formation",
          description:
            "Shifted focus to teaching students how to govern AI tools, treating it as a core competency for future leaders.",
        },
      ],
      Stats: [
        { label: "Departments aligned", value: "14" },
        { label: "Policy clarity", value: "100%" },
        { label: "Syllabi updated", value: "120+" },
      ],
      PullQuote:
        "We had to stop asking how to prevent students from using AI and start asking how we form leaders who can govern it wisely.",
    },
  },
};

```


## P. Movement Voices list constant (verbatim TSX excerpt)

```tsx
const VOICES_LIST = [
  { name: 'Alan Hirsch', descriptor: 'Forgotten Ways and APEST architect; twenty books; Forge and 100 Movements; 150k+ assessments; coined movemental.', image: 'https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/voices/alan-hirsch.webp', note: 'Alan Hirsch is the Australian-born missiologist behind The Forgotten Ways (mDNA) and the APEST / 5Q movement—frameworks adopted across denominations, planting networks, and seminaries. Serial founder (Forge, 100Movements, etc.), twenty-book corpus, and co-architect of practices now assessed over 150,000 times. He named the posture this platform carries: movemental.' },
  { name: 'Brad Brisco', descriptor: 'NAMB / Send Network multiplication strategies director; covocational ministry; five books; missional theology ↔ evangelical systems translator.', image: 'https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/voices/brad-brisco.webp', note: 'Brad Brisco leads multiplication strategy for NAMB Send Network, translating Newbigin–Bosch–Hirsch-grade missional theology into Southern Baptist planting systems without diluting it into slogans. Five-book arc on missional practice—three co-authored with Lance Ford. Thirty-plus years practitioner-theologian; Forge America and Sentralized orbit.' },
  { name: 'JR Woodward', descriptor: 'V3 Church Planting national director; Manchester PhD powers scholar; published IVP books; Missio Alliance co-founder.', image: 'https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/voices/jr-woodward.webp', note: 'JR Woodward leads V3 Church Planting Movement nationally while integrating grassroots planting with academic rigor: University of Manchester Ph.D. feeding The Scandal of Leadership. Co-founded Missio Alliance and Praxis Gathering; IVP Book of the Year recognition (The Church as Movement); adjunct practitioner-scholar.' },
  { name: 'Liz Rios', descriptor: 'Afro-Boricua theologian; Passion2Plant founder; Lilly-funded Púlpito Fellows; Fuller adjunct; Sojourners board; Need to Know contributor.', image: 'https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/voices/liz-rios.webp', note: 'Rev. Dr. Liz Rios is an Afro-Boricua theologian-practitioner with 35+ years in ministry. She founded Passion2Plant—the only national BIPOC-woman-led church planting network in the United States—and directs Púlpito Fellows. Fuller Seminary adjunct; Sojourners board; contributor to Need to Know. Mujerista voice with operator-grade cohort discipline.' },
  { name: 'Rowland Smith', descriptor: 'Forge America director; Pando Collective founder; Pulpit Rock mission pastor; Red Skies curator; DMiss scholar.', image: 'https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/voices/rowland-smith.webp', note: 'Dr. Leo Rowland Smith directs Forge America nationally while founding The Pando Collective Front Range micro-church network and serving Pastor of Missional Culture at The Church at Pulpit Rock. Author of Life Out Loud; curator-editor of Red Skies multi-author volume. Adjunct across Fuller, Denver Seminary, Grand Canyon University.' },
  { name: 'Lucas Pulley', descriptor: 'Underground Network Movements Director; fourteen-plus years microchurch; Tampa neighborhood practitioner; Fuller MGL; mathematics-trained systems thinking.', image: 'https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/voices/lucas-pulley.webp', note: 'Lucas Pulley helps lead Underground Network from the movements-translocal lane—supporting 100+ Tampa microchurches—while still pastoring a neighborhood house church. 14+ years decentralized church multiplication. Fuller Master of Global Leadership; BA pure mathematics—systems-native practitioner voice Exponential and Missio Alliance circuits recognize.' },
  { name: 'Tim Catchim', descriptor: 'Permanent Revolution co-author with Hirsch; Trimtab APEST coach; OneLife Nashville team leader; IVP-published movemental practitioner.', image: 'https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/voices/tim-catchim.webp', note: 'Tim Catchim co-authored The Permanent Revolution and the Permanent Revolution Playbook with Alan Hirsch (IVP)—core texts translating APEST into twenty-first-century ecclesial imagination. Founder of Trimtab coaching (APEST application, cohort learning), Team Leader at OneLife movemental church plant. Multi-vocational entrepreneur-practitioner.' },
  { name: 'Rob Wegner', descriptor: 'Kansas City Underground founder; Microchurch NEXT co-director; Starfish and the Spirit co-author; eight-book multiplication bibliography.', image: 'https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/voices/rob-wegner.webp', note: 'Rob Wegner founded Kansas City Underground (95+ microchurches, 110+ missionaries) and co-directs Microchurch NEXT at Exponential. Co-authored The Starfish and the Spirit with Alan Hirsch and Lance Ford. Eight books across Zondervan / Exponential catalogs bridge mega-church formation and decentralized movement leadership.' }
];

```


## Q. `/who-we-serve` page (`WhoWeServePage.tsx`, verbatim)

```tsx
"use client";

import React, { useEffect } from 'react';
import { Container } from '@/components/studio/Container';
import { Reveal } from '@/components/studio/Reveal';
import { SectionHead } from '@/components/studio/SectionHead';
import Link from "next/link";

export function WhoWeServePage() {
  useEffect(() => {
    document.title = "Who we serve | Movemental";
  }, []);

  return (
    <div className="who-we-serve-page">
      <section className="band-midnight hero" aria-labelledby="hero-h1">
        <Container>
          <Reveal>
            <span className="section-eyebrow">Who we serve</span>
            <h1 id="hero-h1" className="display hero-headline max-w-4xl">
              Three organizations, <em dangerouslySetInnerHTML={{__html: 'one Sequence.'}} />
            </h1>
            <p className="hero-subhead lede lede--regular text-inverse-foreground/80 mb-10 max-w-3xl">
              We guide churches, nonprofits, and institutions through the identical AI Stewardship Sequence, mapping it directly to their distinct operational realities.
            </p>
            <div className="hero-actions flex flex-wrap gap-4">
              <Link href="/field-guide" className="btn-pill btn-pill--primary">Read the field guide</Link>
              <Link href="/contact" className="btn-pill border border-inverse-border text-inverse-foreground hover:bg-inverse-foreground/10">Start a conversation</Link>
            </div>
            <div className="mt-12 flex items-center gap-3 border-t border-inverse-border/30 pt-6 max-w-2xl">
               <span className="text-inverse-foreground/60 text-sm font-medium uppercase tracking-widest">A note on language:</span>
               <Link href="/movement-leaders" className="text-inverse-foreground hover:text-inverse-foreground text-sm font-medium hover:underline flex items-center gap-1 group">
                 See the definition of Movement Leaders
                 <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
               </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="shared">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="The common shape"
              display={<>Different organizations, the <em dangerouslySetInnerHTML={{__html: 'same starting state.'}} /></>}
              lede="Regardless of tax status, mission-driven organizations face the same structural vulnerabilities when encountering AI."
            />
            
            <div className="grid md:grid-cols-2 gap-6 mt-12">
               <div className="bg-card p-8 border border-border shadow-sm rounded-xl">
                  <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft mb-4 block">Shared 01</span>
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Relational Equity</h3>
                  <p className="text-[0.98rem] text-muted-foreground leading-relaxed">Unlike B2B companies, your primary capital is trust. Undisclosed or reckless use of automation risks fracturing your relationship with your congregation or donor base.</p>
               </div>
               <div className="bg-card p-8 border border-border shadow-sm rounded-xl">
                  <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft mb-4 block">Shared 02</span>
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Constrained Resources</h3>
                  <p className="text-[0.98rem] text-muted-foreground leading-relaxed">You cannot afford dedicated AI engineering teams. You need structural safety protocols that operational staff can uphold without high technical barriers.</p>
               </div>
               <div className="bg-card p-8 border border-border shadow-sm rounded-xl">
                  <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft mb-4 block">Shared 03</span>
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">The "Shadow IT" Reality</h3>
                  <p className="text-[0.98rem] text-muted-foreground leading-relaxed">Your staff is already using consumer LLMs to draft emails and write reports. If you haven't set the boundaries, they are currently guessing.</p>
               </div>
               <div className="bg-card p-8 border border-border shadow-sm rounded-xl">
                  <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft mb-4 block">Shared 04</span>
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Higher Stakes for Formation</h3>
                  <p className="text-[0.98rem] text-muted-foreground leading-relaxed">You are in the business of forming humans, not just delivering services. Your tools must never short-circuit the actual work of human care.</p>
               </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-section" id="differs">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="What the organization shapes"
              display={<>The Sequence holds. The work inside it is <em dangerouslySetInnerHTML={{__html: 'shaped by who you are.'}} /></>}
              lede="While the order—Safety, Sandbox, Skills, Solutions—applies to everyone, the content of those stages changes radically."
            />
            
            <div className="overflow-x-auto mt-12 bg-card rounded-xl border border-border shadow-sm">
               <table role="table" className="w-full min-w-[800px] text-left border-collapse">
                  <thead>
                     <tr className="border-b border-border bg-section">
                        <th className="p-6 font-semibold w-[20%] text-foreground/70 uppercase tracking-wider text-xs">Stage Focus</th>
                        <th className="p-6 font-semibold w-[26%] text-foreground">Churches</th>
                        <th className="p-6 font-semibold w-[26%] text-foreground">Nonprofits</th>
                        <th className="p-6 font-semibold w-[26%] text-foreground">Institutions</th>
                     </tr>
                  </thead>
                  <tbody className="bg-card text-[0.98rem]">
                     <tr className="border-b border-border">
                        <th scope="row" className="p-6 font-medium text-muted-foreground border-r border-border">Safety boundaries protect...</th>
                        <td className="p-6 text-muted-foreground">Pastoral notes, giving data, and the authenticity of the pulpit voice.</td>
                        <td className="p-6 text-muted-foreground">Donor profiles, grant strategy, and vulnerable beneficiary data.</td>
                        <td className="p-6 text-muted-foreground">Student records, intellectual property, and research data.</td>
                     </tr>
                     <tr className="border-b border-border">
                        <th scope="row" className="p-6 font-medium text-muted-foreground border-r border-border">Red lines focus on...</th>
                        <td className="p-6 text-muted-foreground">Maintaining incarnational theology and embodied pastoral care.</td>
                        <td className="p-6 text-muted-foreground">Protecting donor equity and maintaining programmatic integrity.</td>
                        <td className="p-6 text-muted-foreground">Preserving academic rigor and standardizing assessment integrity.</td>
                     </tr>
                     <tr>
                        <th scope="row" className="p-6 font-medium text-muted-foreground border-r border-border">Solutions scale...</th>
                        <td className="p-6 text-muted-foreground">Discipleship infrastructure and communication workflows.</td>
                        <td className="p-6 text-muted-foreground">Grant reporting, donor analytics, and impact tracking.</td>
                        <td className="p-6 text-muted-foreground">Cross-departmental policy enforcement and operational consistency.</td>
                     </tr>
                  </tbody>
               </table>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="audiences">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="The three audience pages"
              display={<>Open the page that <em dangerouslySetInnerHTML={{__html: 'names you correctly.'}} /></>}
              lede="Each path leads you through the same four stages, but contextualized to your specific friction points."
            />
            
            <div className="grid md:grid-cols-3 gap-6 mt-12 bg-section p-2 rounded-xl">
               <Link href="/nonprofits" className="bg-card border border-border hover:border-primary p-8 rounded-lg shadow-sm group">
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Nonprofits</h3>
                  <p className="text-[0.98rem] text-muted-foreground leading-relaxed mb-8">For executives balancing rapid scale with rigorous donor trust and compliance.</p>
                  <span className="text-primary font-medium text-sm border-b border-primary/30 group-hover:border-primary pb-0.5 inline-block">Read the nonprofit path →</span>
               </Link>
               <Link href="/churches" className="bg-card border border-border hover:border-primary p-8 rounded-lg shadow-sm group">
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Churches</h3>
                  <p className="text-[0.98rem] text-muted-foreground leading-relaxed mb-8">For pastors protecting theological depth while equipping staff to lead efficiently.</p>
                  <span className="text-primary font-medium text-sm border-b border-primary/30 group-hover:border-primary pb-0.5 inline-block">Read the church path →</span>
               </Link>
               <Link href="/institutions" className="bg-card border border-border hover:border-primary p-8 rounded-lg shadow-sm group">
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Institutions</h3>
                  <p className="text-[0.98rem] text-muted-foreground leading-relaxed mb-8">For leaders standardizing policy across faculties, departments, and operations.</p>
                  <span className="text-primary font-medium text-sm border-b border-primary/30 group-hover:border-primary pb-0.5 inline-block">Read the institutional path →</span>
               </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-section" id="movement-leaders">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Adjacent to this page, not on it"
              display={<>Movement leaders are <em dangerouslySetInnerHTML={{__html: 'not a fourth card.'}} /></>}
              lede="They are the ecosystem wrapping around these organizations."
            />
            
            <p className="prose max-w-[640px] text-[1.0625rem] leading-[1.75] text-muted-foreground mb-8">
               Movement leaders—authors, denominational heads, network leaders, and strategists—do not typically fall neatly into the operational categories above. They sit adjacent to the organizations, translating theological and missional urgency down to the ground.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4 border-t border-border max-w-[640px]">
               <Link href="/movement-leaders" className="btn-pill btn-pill--ghost">Read the definition</Link>
               <Link href="/voices" className="btn-pill btn-pill--ghost">See the trusted voices</Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-midnight final-cta text-center">
        <Container width="narrow">
          <Reveal>
            <h2 className="display mb-8">
              When you have read the right page
            </h2>
            <p className="lede text-inverse-foreground/80 mx-auto mb-10">
              The Sequence is the same. <em dangerouslySetInnerHTML={{__html: 'The work is yours.'}} />
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-pill btn-pill--primary">Start a conversation</Link>
              <Link href="/assess" className="btn-pill border border-inverse-border text-inverse-foreground hover:bg-inverse-foreground/10">Take the diagnostic</Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}

```


## R. `/movement-leaders` page (`MovementLeadersPage.tsx`, verbatim)

```tsx
"use client";

import React, { useEffect } from 'react';
import { Reveal } from '@/components/studio/Reveal';
import { Container } from '@/components/studio/Container';
import { SectionHead } from '@/components/studio/SectionHead';
import Link from "next/link";

export function MovementLeadersPage() {
  useEffect(() => {
    document.title = "Movement leaders | Movemental";
  }, []);

  return (
    <div className="movement-leaders-page">
      <section className="band-midnight hero" aria-labelledby="hero-h1">
        <Container>
          <Reveal>
            <span className="section-eyebrow">Movement Voices · Definition</span>
            <h1 id="hero-h1" className="display hero-headline max-w-4xl">
              What we mean by <em dangerouslySetInnerHTML={{__html: 'movement leader'}} />.
            </h1>
            <p className="hero-subhead lede lede--regular text-inverse-foreground/80 mb-10 max-w-3xl">
              What we mean by movement leader. Practitioners whose discipleship of place and people gives weight to whatever Movemental publishes — an ecosystem layer, not a fourth audience.
            </p>
            <div className="hero-actions flex flex-wrap gap-4 mb-16">
              <Link href="/voices" className="btn-pill btn-pill--primary">See the named voices</Link>
              <Link href="/field-guide" className="btn-pill border border-inverse-border text-inverse-foreground hover:bg-inverse-foreground/10">Read the field guide</Link>
            </div>

            <div className="border-l-2 border-inverse-border pl-6 max-w-[40ch]">
               <span className="text-xs font-semibold uppercase tracking-widest text-inverse-foreground/60 mb-2 block">Editorial posture</span>
               <p className="text-sm text-inverse-foreground/80 leading-relaxed">This page is descriptive, not recruiting. There is no form below it, by design.</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="definition">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="The definition"
              display={<>Three things <em dangerouslySetInnerHTML={{__html: 'at once'}} />.</>}
              lede="A movement leader is necessarily a missiological originator, a steward of a tradition, and a witness in practice."
            />
            
            <div className="grid md:grid-cols-3 gap-6">
               <div className="bg-card border border-border p-8 rounded-card hover:-translate-y-0.5 transition-transform">
                  <h3 className="font-serif-display text-2xl italic mb-4 text-foreground">Missiological Originator</h3>
                  <p className="text-muted-foreground text-[0.98rem] leading-relaxed">Someone translating orthodox theology into new cultural frontiers, rather than merely repeating inherited forms.</p>
               </div>
               <div className="bg-card border border-border p-8 rounded-card hover:-translate-y-0.5 transition-transform">
                  <h3 className="font-serif-display text-2xl italic mb-4 text-foreground">Steward of Tradition</h3>
                  <p className="text-muted-foreground text-[0.98rem] leading-relaxed">Carrying responsibility for the theological and ethical boundaries of a community, denomination, or decentralized network.</p>
               </div>
               <div className="bg-card border border-border p-8 rounded-card hover:-translate-y-0.5 transition-transform">
                  <h3 className="font-serif-display text-2xl italic mb-4 text-foreground">Practitioner Witness</h3>
                  <p className="text-muted-foreground text-[0.98rem] leading-relaxed">Doing the work in a specific place with specific people. Their authority comes from practice, not just publishing.</p>
               </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-section" id="ecosystem">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Where this fits"
              display={<>An ecosystem layer, <em dangerouslySetInnerHTML={{__html: 'not a funnel'}} />.</>}
              lede="Movemental engages three direct audiences: churches, nonprofits, and institutions."
            />
            
            <p className="prose max-w-[640px] text-[1.0625rem] leading-[1.75] text-muted-foreground mb-12">
              Movement leaders do not constitute an audience for our consulting practice. The consulting certainty required to promise &rsquo;safe AI adoption&rsquo; is fundamentally distinct from the exploratory discernment of movement leadership. Mashing them together diminishes both.
            </p>
            
            <div className="grid md:grid-cols-2 gap-12 bg-background p-8 md:p-12 rounded-card border border-border">
               <div>
                  <h3 className="font-serif-display text-2xl italic mb-6 text-foreground">How an audience layer works</h3>
                  <ul className="space-y-4 text-[0.98rem] text-muted-foreground">
                    <li className="flex items-start"><span className="text-primary mr-3 mt-1 font-bold">•</span>Buys engagements</li>
                    <li className="flex items-start"><span className="text-primary mr-3 mt-1 font-bold">•</span>Answers to a board or elder body</li>
                    <li className="flex items-start"><span className="text-primary mr-3 mt-1 font-bold">•</span>Walks the Sequence</li>
                    <li className="flex items-start"><span className="text-primary mr-3 mt-1 font-bold">•</span>Carries the work forward by example</li>
                  </ul>
               </div>
               <div>
                  <h3 className="font-serif-display text-2xl italic mb-6 text-foreground">How an ecosystem layer works</h3>
                  <ul className="space-y-4 text-[0.98rem] text-muted-foreground">
                    <li className="flex items-start"><span className="text-primary mr-3 mt-1 font-bold">•</span>Reads and criticizes the work in public</li>
                    <li className="flex items-start"><span className="text-primary mr-3 mt-1 font-bold">•</span>Translates the work to their network</li>
                    <li className="flex items-start"><span className="text-primary mr-3 mt-1 font-bold">•</span>Lends judgment to edges we cannot see</li>
                    <li className="flex items-start"><span className="text-primary mr-3 mt-1 font-bold">•</span>Calls us when we misname a theological risk</li>
                  </ul>
               </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="fit">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Who reads this page well"
              display={<>Three signs this work fits the <em dangerouslySetInnerHTML={{__html: 'shape of your practice'}} />.</>}
              lede="Practitioner fit, not application criteria. There is nothing to apply to."
            />
            
            <ol className="list-decimal pl-5 space-y-6 max-w-3xl text-foreground font-medium text-lg marker:text-ink-soft">
               <li className="pl-4">
                 <strong className="block text-foreground mb-1">Your name carries weight in a specific discourse.</strong>
                 <span className="font-normal text-muted-foreground text-base leading-relaxed">Not because of platform algorithms, but because of sustained contribution to a defined theological or missiological conversation.</span>
               </li>
               <li className="pl-4">
                 <strong className="block text-foreground mb-1">Your judgment is cited by others.</strong>
                 <span className="font-normal text-muted-foreground text-base leading-relaxed">Other leaders look to your framing of cultural or technological shifts before setting their own course.</span>
               </li>
               <li className="pl-4">
                 <strong className="block text-foreground mb-1">You are not looking for a consulting roster.</strong>
                 <span className="font-normal text-muted-foreground text-base leading-relaxed">You are interested in shaping the architecture of how faith organizations adopt technology, not acting as a sales agent.</span>
               </li>
            </ol>
          </Reveal>
        </Container>
      </section>

      <section className="band-section" id="voices">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Movement Voices"
              display={<>Where these names are <em dangerouslySetInnerHTML={{__html: 'visible'}} />.</>}
              lede="Our named ecosystem lives on the Movement Voices page."
            />
            
            <p className="prose max-w-[640px] text-[1.0625rem] leading-[1.75] text-muted-foreground mb-10">
              There is no open roster and no form to nominate someone. The list is curated slowly and deliberately by the Movemental founders. It is an editable list—voices are added as the conversation expands and changes shape.
            </p>
            
            <Link href="/voices" className="btn-pill btn-pill--ghost">See the trusted voices</Link>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="boundary">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="What this page is not"
              display={<>The line, <em dangerouslySetInnerHTML={{__html: 'on the page'}} />.</>}
              lede="We define this clearly because mission drift happens at the boundaries."
            />
            
            <aside className="border border-border-soft bg-card p-8 rounded-card max-w-3xl relative overflow-hidden">
               <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft mb-4 block relative z-10">Editorial note</span>
               <div className="prose max-w-none text-muted-foreground text-[0.98rem] leading-relaxed relative z-10 flex flex-col gap-4">
                  <p><strong>Movement leaders do not buy from Movemental.</strong> We do not offer special pricing, certification programs, or "movement-level" product tiers.</p>
                  
                  <p>If we build surfaces for this group in the future, they will be editorial surfaces (roundtables, anthologies, structured critiques) — not consulting products.</p>
                  
                  <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border-soft">
                     <Link href="/voices" className="text-primary font-medium hover:underline inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span> Movement Voices page</Link>
                     <Link href="/who-we-serve" className="text-primary font-medium hover:underline inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span> Who we serve</Link>
                  </div>
               </div>
            </aside>
          </Reveal>
        </Container>
      </section>

      <section className="band-midnight final-cta text-center">
        <Container width="narrow">
          <Reveal>
            <span className="section-eyebrow text-inverse-foreground/80 flex justify-center items-center gap-2 mb-6">
              If you came here to talk to us
            </span>
            <h2 className="display mb-8">
              Talk to us as practitioners, <em dangerouslySetInnerHTML={{__html: 'not as candidates'}} />.
            </h2>
            <p className="lede text-inverse-foreground/80 mx-auto mb-10">
              Movemental is an organization in motion. If you want to critique the architecture, read early drafts, or push back on a premise, use the same contact door everyone else uses. We read everything. There is no separate track.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-pill btn-pill--primary">Start a conversation</Link>
              <Link href="/field-guide" className="btn-pill border border-inverse-border text-inverse-foreground hover:bg-inverse-foreground/10">Read the field guide</Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}

```



---

## S. Production app: Safety stage panel (`SafetyContent.tsx`, verbatim)

Source: `src/components/studio/path/stages/SafetyContent.tsx`

```tsx
"use client";

import React from 'react';
import { stageMeta, safetyQuickItems, safetyChecklistRows } from '@/data/shared-path-data';

export function SafetyContent() {
  return (
    <div className="prose max-w-none text-foreground/80 text-lg leading-relaxed space-y-12">
      <div>
        <p className="font-serif-display text-3xl md:text-4xl leading-tight mb-8 text-foreground/90" dangerouslySetInnerHTML={{ __html: stageMeta[0].sentence }} />
        
        <div className="mt-12 bg-section p-8 rounded-card border border-border">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">Safety checklist</div>
          <h4 className="text-xl font-medium text-foreground mb-4 m-0">The governance baseline.</h4>
          <p className="mb-8">Before staff use AI on real work, leadership needs a clear governance baseline. These are the essential pieces that make AI use safe enough to begin.</p>
          
          <ul className="space-y-3 mb-8 list-none p-0">
            {safetyQuickItems.map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-primary/60 mr-4 font-mono font-medium">{i + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          
          <details className="group [&_summary::-webkit-details-marker]:hidden border border-border rounded-card bg-card overflow-hidden">
            <summary className="flex cursor-pointer items-center justify-between p-6 text-foreground font-semibold hover:bg-muted/50 transition-colors">
              <span className="flex items-center gap-4">
                <span>View full 14-item checklist</span>
                <span className="bg-muted px-2 py-0.5 rounded text-xs font-medium text-muted-foreground uppercase tracking-widest">14 items</span>
              </span>
              <span className="relative flex h-5 w-5 shrink-0 items-center justify-center text-xl font-medium text-muted-foreground group-open:rotate-45 transition-transform duration-300">+</span>
            </summary>
            
            <div className="p-6 md:p-8 bg-card border-t border-border">
              <div className="space-y-10">
                {safetyChecklistRows.map((row) => (
                  <div key={row.index} className="border-l-2 border-primary/20 pl-6 py-1">
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="font-serif-display text-lg text-primary">{row.index}.</span>
                      <h5 className="font-semibold text-lg text-foreground m-0">{row.name}</h5>
                    </div>
                    <details className="mt-2 group/sub [&_summary::-webkit-details-marker]:hidden">
                      <summary className="cursor-pointer text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                        An "A" grade looks like
                      </summary>
                      <div className="mt-4 text-[0.95rem] text-muted-foreground bg-section p-5 rounded-lg border border-border leading-relaxed" dangerouslySetInnerHTML={{ __html: row.example }} />
                    </details>
                  </div>
                ))}
              </div>
            </div>
          </details>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-border">
        <div>
           <h4 className="font-sans font-semibold text-sm mb-4 text-foreground uppercase tracking-wider">Required before proceeding</h4>
           <ul className="space-y-3 m-0 list-none p-0 text-base">
             {stageMeta[0].doneWhen.map((req, j) => (
               <li key={j} className="flex items-start"><span className="text-primary font-bold mr-3">✓</span> {req}</li>
             ))}
           </ul>
        </div>
        <div>
           <h4 className="font-sans font-semibold text-sm mb-4 text-foreground uppercase tracking-wider">If you skip this stage</h4>
           <div className="bg-background border border-border p-6 rounded-lg text-base">
              <p className="flex items-start m-0"><span className="text-primary/60 mr-3 mt-0.5">—</span> <span dangerouslySetInnerHTML={{ __html: stageMeta[0].watchFor.replace('If Safety is skipped, ', '') }} /></p>
           </div>
        </div>
      </div>
    </div>
  );
}
```

---

## T. `SegmentPathway` — Network Engagements callout (institutions only, verbatim JSX)

Source: `src/components/studio/segment/SegmentPathway.tsx` (excerpt; appears when `audience === "institutions"`).

```tsx
            {audience === "institutions" ? (
              <div className="border-primary/20 bg-primary/5 mt-12 max-w-4xl rounded-card border p-8">
                <h3 className="mb-3 text-xl font-semibold text-foreground">Network Engagements</h3>
                <p className="text-primary/90 mb-6 text-[1.0625rem] leading-relaxed">
                  For denominations, training networks, and multi-site organizations, Solutions Deployment extends across entities —
                  shared governance, linked platforms, federated intelligence. These engagements are quoted per
                  conversation. Most start at $60,000 and scale with scope.
                </p>
                <Link href="/contact" className="btn-pill btn-pill--primary inline-flex text-sm">
                  Talk about a Network Engagement
                </Link>
              </div>
            ) : null}
```

---

## U. Root site metadata (verbatim)

Source: `src/app/layout.tsx` — `metadata.description`

> Movemental walks church and nonprofit leaders through the AI Stewardship Sequence: Safety, Sandbox, Skills, Solutions, in order — so the mission stays recognizable on the other side.

---

## Z. HTML templates (summary only)

Stitch HTML under `docs/templates/stitch/` does **not** reproduce the AI Stewardship Sequence Safety/Sandbox copy as defined in SSOT; pages are product mockups (formation pathways, dashboards). No verbatim HTML aggregation included here.

---

*End of aggregated file.*
