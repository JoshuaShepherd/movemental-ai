/**
 * Robust "Ask your AI" prompts — self-contained so a visitor's LLM can
 * sustain depth even without fetching movemental.ai.
 */

export const ASK_AI_PROMPTS = {
  default: `I'm exploring Movemental (movemental.ai) — a path for mission-driven organizations (churches, nonprofits, seminaries) to adopt AI without eroding trust.

**Context:** Movemental argues AI is already inside most organizations ungoverned; the deeper problem is fragmentation (scattered teaching, records, and voice); and the fix is ordered: Safety → Sandbox → Training → Technology — with a ratified AI Charter first, not a tech purchase.

**Your role:** Rigorous advisor, not a sales bot. Help me think clearly about whether this fits my organization.

**Work through:**
1. **What Movemental is offering** — In plain language, what is the product/service model? Who is it for and who is it NOT for?
2. **The four-stage path** — What happens at Safety, Sandbox, Training, and Technology? What is an "AI Charter" and what would it contain?
3. **How this differs** from generic "AI for churches/nonprofits" vendors, ChatGPT Enterprise rollouts, or consulting firms.
4. **Concrete vs. marketing** — What claims would I need to verify? What evidence should I ask for?
5. **Strongest objections** — What would a skeptical board member or CFO push back on?
6. **First 30 days** — If I were starting from zero, what would a credible first step look like for a church, nonprofit, or seminary?

**Before you answer:** Ask me 3–5 questions about my organization (type, size, current AI use, governance state, biggest trust risk). Then tailor your analysis.

**Continue the conversation** — help me prepare questions for a first call with Movemental, draft talking points for my board, or stress-test specific use cases.`,

  aboutFull: `I'm reading Movemental's About page (movemental.ai/agent/about) — the founding story, authorship break, fragmentation thesis, Babel vs. Pentecost ethic, four layers (scenius / corpus / platform / AI), named refusals, and formation stakes for young adults.

**What the page argues:**
- **Authorship break:** For the first time in history, readers cannot tell whether a human stands behind published words. That erodes trust in publication itself — not just content quality.
- **Fragmentation:** Work that was whole in a person is scattered across formats that don't connect. AI built on fragmentation amplifies dysfunction ("slop is fragmentation, reflected and multiplied").
- **Babel vs. Pentecost:** Not all coherence heals. Babel = coherence that points at itself; Pentecost = coherence that honors difference and points away from itself. Movemental applies this test to its own work.
- **Four layers kept distinct:** scenius (shared scene intelligence, served not owned), corpus (author's own work, consent-gathered), platform (tools), AI (reader for the network — reflects, doesn't invent).
- **Formation stakes:** Young adults are asking the machine questions they used to ask mentors/church. They're watching whether institutions lead with fear, shrug, or careful formation.

**Your role:** Help me evaluate Movemental's theology of technology and organizational ethics — not just their feature list.

**Work through:**
1. **Core beliefs** — Summarize the authorship break and fragmentation thesis. Is this coherent? What's novel vs. repackaged AI anxiety?
2. **Babel/Pentecost frame** — Does this distinction hold up? Where could it be misused or become vague?
3. **Four layers** — Why keep scenius, corpus, platform, and AI separate? What breaks if you collapse them?
4. **What they refuse** — What lines do they draw? How does that compare to how most AI vendors operate?
5. **Vs. typical "AI for churches"** — How is this different from a chatbot vendor, a ChMS add-on, or a generic AI policy template?
6. **Red flags / verification** — What would I need to see in practice to believe they're living this ethic?

**Before you answer:** Ask about my role (leader, board, practitioner, skeptic) and what I care most about (trust, formation, governance, product).

**Continue** — help me articulate my own Babel/Pentecost test for AI decisions, or prepare questions for Movemental's founders.`,

  aboutStub: `I'm in Movemental's agent room, on a short About entry that points to the full page (movemental.ai/agent/about).

**What I know so far:**
- Founded 2026 by Alan Hirsch, Brad Brisco, and Joshua Shepherd — missiologist, missional strategist, and builder.
- Movemental helps churches, nonprofits, and schools use AI without losing trust.
- The full story covers: authorship break, fragmentation thesis, Babel vs. Pentecost ethic, four layers, refusals, formation stakes.

**Your role:** Help me decide whether to read the full About page and what to look for.

**Work through:**
1. **Who they are** — Founders, origin, and why movement leaders (not a typical SaaS team) might matter for this problem.
2. **The central question** — What problem are they actually solving? (Hint: not "AI adoption" alone.)
3. **What makes their approach different** from typical church-tech or AI consulting.
4. **What I'd learn on the full page** — What sections should I prioritize based on my role?
5. **Skeptic's view** — What might be oversold in a founding narrative like this?

**Before you answer:** Ask what brought me here (church, nonprofit, seminary, movement leader, curious observer) and my biggest concern about AI + trust.

**Continue** — if I paste content from the full About page, go deeper on ethics and fit.`,

  howWeUseAi: `I'm reading Movemental's "How We Use AI" transparency page (movemental.ai/agent/how-we-use-ai) — their operational ethics for AI use, not marketing fluff.

**What the page covers:**
- **Three named refusals:** (1) replacement of relationship — no AI simulating pastoral presence/mentoring/care; (2) formation without presence — nothing goes out under a human name without full engagement; (3) amplification without credibility — no looking bigger than the work/network warrant.
- **Green/yellow/red framework:** Green = structure, findability, admin, translation. Yellow = context-dependent, human must review before public/formative output. Red = undisclosed authorship, pastoral impersonation, eligibility decisions affecting access to care/services.
- **"You are the node":** AI supports credibility; the human stays accountable.
- **Scenius product refusals:** No ranked leaderboards, vanity metrics, engagement-optimized feeds, or parasocial substitutes where reading replaces relationship.
- **Meta-claim:** They use the tools they sell, on themselves first. Every guardrail they ask boards to ratify, they've built internally.

**Your role:** Help me evaluate whether Movemental's AI governance is substantive — and whether I could adopt similar standards in my organization.

**Work through:**
1. **The three refusals** — Are these meaningful constraints or performative? What would violating each look like in practice?
2. **Traffic-light framework** — Walk me through 3 real examples (one green, one yellow, one red) for my org context.
3. **Gaps** — What's NOT covered that I'd need in my own AI Charter?
4. **Vendor comparison** — How does this compare to OpenAI/Anthropic enterprise policies, or typical nonprofit AI guidelines?
5. **Audit questions** — If I were vetting Movemental as a vendor, what would I ask to verify they live this?
6. **Adaptation** — Could I use this framework for my own org? What would I need to customize?

**Before you answer:** Ask my org type, current AI tools in use, and whether we have any written AI policy today.

**Continue** — help me draft our own green/yellow/red list, or red-team a specific use case I'm considering.`,

  movementVoices: `I'm reading Movemental's Movement Voices page (movemental.ai/agent/movement-voices) — the invitation layer for trusted movement leaders, not a generic creator platform.

**What the page covers:**
- **Authorship break** — Faithful readers can no longer tell if a writer still stands behind the words. Good prose doesn't fix the wound.
- **Fragmentation** — Decades of work scattered (books, articles, talks, frameworks in others' paraphrases). Second face: the leader can't see who is moving through their work.
- **Scenius thesis** (Brian Eno) — Shared intelligence of a scene, not lone genius. All-channel network (not hub-and-spoke celebrity). Hypothesis: digital infrastructure can lower the cost of scenius across geography/time.
- **Build sequence:** One leader's full corpus made navigable → link a second leader → toward ~100 linked voices on shared tools, one vocabulary, honest citation, recognizable as one scene.
- **Four layers:** scenius / corpus / platform / AI — kept distinct.
- **Invitation:** Becoming a "Movement Voice" — what you're agreeing to and NOT agreeing to (not a roster growth funnel; trust/ecosystem proof).

**Your role:** Help me evaluate whether the Movement Voice invitation is right for a movement leader I know (possibly me) — with eyes open.

**Work through:**
1. **What is a Movement Voice?** — What are they offering leaders? What problems does it solve (fragmentation, authorship, scenius)?
2. **What you're NOT signing up for** — How is this different from Substack, a personal brand platform, or an AI ghostwriting service?
3. **Scenius claim** — Is "hosting scenius at scale" credible or romantic? What would success/failure look like?
4. **Consent and corpus** — What does "gathered only with consent" imply for IP, voice, and AI training?
5. **Red flags for leaders** — What should a movement leader push back on before saying yes?
6. **Fit assessment** — What kind of leader is this FOR vs. NOT for?

**Before you answer:** Ask whether I'm evaluating for myself or advising someone else, my publication history, and my relationship to the movemental/missional space.

**Continue** — help me list questions for a first conversation with Movemental, or compare this to staying independent with my own site + newsletter.`,

  churchesTheCase: `I just read Movemental's letter to a lead pastor on movemental.ai/agent/churches — the full case for churches, meant to share with elders or a leadership team.

**What the page argues (churches):**
- **Already happening:** AI-assisted sermon prep, pastoral notes in consumer tools, no disclosure standard, unsearchable teaching archives, voice-cloning scams, congregation trust eroding quietly.
- **One deeper problem:** Fragmentation — teaching in unsearchable sermons, wisdom in founders' heads, people known in pieces, body not visible whole. AI on fragmentation reflects scatter back, faster, wearing your name without carrying your person.
- **Formation audience:** Young adults asking the machine questions they used to ask the church — watching whether you answer with fear, shrug, or formation.
- **Foundation:** Gather people, teaching, and record into one connected source of truth the church owns — verifiable, not generic web-trained chatbot.
- **Build (after foundation):** Teaching search, grounded assistant with citations elders can check, member pathways through your body of work.
- **Path:** Safety (ratified AI Charter, pastoral boundaries, disclosure) → Sandbox → Training → Technology. First move is Safety, not tech.
- **Start:** Conversation, not checkout. Letter downloadable for elders.

**Your role:** Help me prepare to discuss this with my elders — not to sell Movemental, but to think clearly.

**Work through:**
1. **Letter summary** — Core argument in ~300 words I could read aloud at elders' meeting.
2. **What's genuinely urgent** vs. anxiety-driven — Which pain points are real in most churches right now?
3. **The four-stage path for a church** — What would Safety actually produce? (AI Charter: pastoral care boundaries, disclosure, data handling, incident response.)
4. **Foundation + build** — What's concrete vs. aspirational? What would I ask Movemental to demonstrate?
5. **Elder-ready objections** — Top 5 pushbacks my elders would raise (cost, "we don't need AI," theological concerns, staff autonomy, data privacy) with honest responses.
6. **What I'd verify** — Stats, claims, and references I'd want sourced before the board acts.

**Before you answer:** Ask my church size, denomination/tradition, current AI use on staff, and whether we have any AI policy.

**Continue** — help me draft an elders' agenda item, talking points for a skeptical deacon, or questions before I email hello@movemental.ai.`,

  churchesStart: `I'm at the end of Movemental's churches page (movemental.ai/agent/churches) and deciding whether to start a conversation with them.

**I understand their case:** AI is already inside church life ungoverned; fragmentation is the deeper problem; path is Safety → Sandbox → Training → Technology; first deliverable is a ratified AI Charter; they gather teaching/record into owned foundation before building tools; formation is not optional; young adults are watching.

**Your role:** Decision advisor for a lead pastor — help me think, not hype.

**Work through:**
1. **Fit check** — Is Movemental likely right for my church? What signals would say yes vs. no vs. "not yet"?
2. **Credible first step** — If I email them tomorrow, what should I know about our church first? What should I ask for?
3. **What to push back on** — Strongest objections I should raise on a first call (scope, cost, timeline, "we can DIY the charter," theological fit, vendor lock-in).
4. **DIY alternative** — Could we get 80% of Safety value without Movemental? What would we miss?
5. **Risk of waiting** — What's the cost of doing nothing for 12 months in a typical church?
6. **Questions for the first call** — Give me 10 specific questions ranked by importance.

**Before you answer:** Ask church size, staff AI habits, elder culture (innovative vs. cautious), and my biggest fear (pastoral boundaries, member trust, budget, theology).

**Continue** — role-play the first call, or help me decide whether to download the letter and circulate it first vs. call directly.`,

  nonprofitsTheCase: `I just read Movemental's letter to an executive director on movemental.ai/agent/nonprofits — the full case for nonprofits, meant to share with the board.

**What the page argues (nonprofits):**
- **Already happening:** Donor/beneficiary data in consumer AI tools; grant reports AI-polished without accuracy standards; most staff use AI individually not through shared workflows; many boards have no AI governance; mission voice drifts toward statistical center; efficiency gains don't compound org-wide.
- **Deeper problem:** Fragmentation — program knowledge scattered, donor relationships in silos, mission voice rewritten a dozen ways. Quiet harm: appeals mischaracterizing programs, reports rounding inconvenient details.
- **Foundation:** People, program record, mission voice → one connected source of truth, board-visible, donor-verifiable.
- **Build:** Program search, mission-grounded assistant with auditable sources, donor/impact workflows that compound capability.
- **Path:** Safety (board-ratifiable AI Charter: acceptable use, data handling, disclosure, incident response) → Sandbox → Training → Technology.
- **Formation + fiduciary duty:** Tools without formed people = unapproved AI at scale.

**Your role:** Help me prepare a board-ready briefing — rigorous, not promotional.

**Work through:**
1. **Board memo summary** — ~400 words: problem, Movemental's thesis, proposed path, ask of the board.
2. **Fiduciary framing** — How does AI governance connect to board duty now (even before harm)?
3. **Safety deliverable** — What would our AI Charter need to cover for a nonprofit handling donor + beneficiary data?
4. **Concrete vs. marketing** — Which claims need verification?
5. **Board objections** — Top 5 from a conservative board (budget, mission drift, staff revolt, "AI is just IT," competitor solutions).
6. **Comparison** — How does this differ from hiring a consultant, buying CRM AI, or adopting a nonprofit AI policy template?

**Before you answer:** Ask org mission type, budget size, current AI use, board sophistication, and whether we've had a data incident or near-miss.

**Continue** — help me draft the board email or a one-page appendix for the next meeting.`,

  nonprofitsStart: `I'm at the end of Movemental's nonprofits page (movemental.ai/agent/nonprofits) deciding whether to start a conversation.

**Your role:** Advisor to an executive director or COO evaluating Movemental.

**Work through:**
1. **Fit** — Mission type, size, and governance maturity where Movemental makes sense vs. doesn't.
2. **Board-ready first step** — What can I do in 30 days without board approval vs. what requires a vote?
3. **Pushback** — What I should challenge on call #1 (ROI, implementation burden, overlap with existing CRM/grant systems, vendor independence — they claim no ChatGPT/Claude/Gemini vendor relationship).
4. **DIY path** — Charter + traffic-light framework without Movemental — feasible?
5. **Cost of delay** — 12-month risk for a nonprofit already using shadow AI on donor data.
6. **First-call questions** — 10 specific questions for hello@movemental.ai.

**Before you answer:** Ask mission focus, staff count, CRM/grant stack, and whether ED or board is the bottleneck.

**Continue** — help me build a business case outline or decide between contacting Movemental vs. running an internal AI task force first.`,

  institutionsTheCase: `I just read Movemental's letter to a seminary president on movemental.ai/agent/institutions — the full case for seminaries and mission-driven institutions, for board sharing.

**What the page argues (institutions):**
- **Already happening:** Students use AI for sermons, exegesis, papers with no guidance; every professor has different rules; AI not in curriculum; degree meaning drifted across cohorts; records saved but unfindable; faculty voice/name cloneable.
- **Deeper problem:** Institutional fragmentation — people, work, record in pieces. AI on top makes more mess, faster.
- **Unique stakes:** Trust in the degree IS the product. Graduates will lead churches — your AI posture becomes their default.
- **Foundation:** People, work, record → one searchable, verifiable foundation the institution owns.
- **Build:** Search across syllabi/archives/faculty work; assistant grounded in your material; discovery for students asking the machine not the library.
- **Path:** Safety → Sandbox → Training → Technology. Formation is what seminaries already do — should lead with it.
- **Weight:** Doing nothing is still a choice that teaches graduates not to think carefully.

**Your role:** Help me prepare for academic leadership and board conversation — faculty senate politics included.

**Work through:**
1. **Presidential briefing** — Core argument in language a board of trustees understands.
2. **Academic freedom vs. governance** — How does an AI Charter interact with faculty autonomy and syllabus sovereignty?
3. **Curriculum gap** — What would "AI in the curriculum" mean at a seminary vs. a policy memo?
4. **Degree integrity** — How does fragmentation + AI threaten what our degree signifies?
5. **Faculty objections** — Top 5 (cheating panic, tool bans, "this is IT's job," research IP, LMS vendor already has AI).
6. **Verification** — What would I need to see from Movemental (reference institutions, sample charter, faculty formation model)?

**Before you answer:** Ask institution type (seminary, Bible college, Christian university), accreditation context, and current AI policy state.

**Continue** — help me draft a faculty senate discussion guide or board resolution language for "explore AI governance."`,

  institutionsStart: `I'm at the end of Movemental's institutions page (movemental.ai/agent/institutions) deciding whether to contact Movemental.

**Your role:** Advisor to a seminary president, provost, or dean.

**Work through:**
1. **Fit** — Institution profiles where this resonates vs. where it's premature.
2. **Credible first step** — Safety-only engagement vs. full path — what makes sense before board cycle?
3. **Pushback** — Scope creep, faculty backlash, student AI cheating narrative, "we'll wait for accreditors," build vs. buy.
4. **Leadership weight** — How seriously should we take "our graduates will copy our posture"?
5. **Sequencing** — Policy first, curriculum second, tools third — agree or disagree with Movemental's order?
6. **First-call questions** — 10 for hello@movemental.ai, including faculty formation and LMS integration.

**Before you answer:** Ask enrollment size, denominational ties, and whether we've had an AI-related academic integrity incident.

**Continue** — help me choose between a presidential listening tour vs. a formal RFP vs. a pilot with one department.`,
} as const;

export type AskAiPromptKey = keyof typeof ASK_AI_PROMPTS;

export function resolveAskAiPrompt(prompt?: string, promptKey?: AskAiPromptKey): string {
  if (prompt?.trim()) return prompt.trim();
  if (promptKey) return ASK_AI_PROMPTS[promptKey];
  return ASK_AI_PROMPTS.default;
}
