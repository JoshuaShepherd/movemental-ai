# Audience pain points — final proposed sections (2026-06)

**Status:** Proposal. The recommended "where you stand" pain-point sections for the three organizational audiences — **nonprofits, churches, institutions** — written in the Movemental voice and checked claim-by-claim against the citations we already hold.
**What this is:** my clear final answer on what each section should say, and the evidence each line stands on.
**How claims were checked:** every factual statement is mapped to a wired claim in [`src/lib/citations/claims.ts`](../../../src/lib/citations/claims.ts) / [`sources.ts`](../../../src/lib/citations/sources.ts), or to a VERIFIED source there, or it is labeled **Synthesis** (a structural pattern from [the-cost-of-fragmentation](../articles/graded-high/added/85-99/the-cost-of-fragmentation.md), not a survey number) and written so it never poses as a statistic. Where the current site copy overstates the evidence, I corrected it and said so.
**Voice + quality bar:** written against [movemental-voice](../../../.claude/skills/movemental-voice/SKILL.md) and scored against the [article quality rubric](./movemental-article-quality-rubric.md). Plain sentences, no em dashes, no hype, sell relief, name who it is for.

---

## The three corrections every section depends on

The corpus verification pass ([movemental-research-corpus-v1, §10](../articles/graded-high/added/85-99/movemental-research-corpus-v1.md)) killed three numbers that have circulated in our drafts. None of them may appear in any pain-point copy:

| Dropped claim | Why | Use instead |
|---|---|---|
| "91% of church leaders use AI" | Does not appear in the Lifeway report | **42%** of pastors use AI for ministry (Lifeway 2026); **60%** of leaders use AI monthly (Barna/Pushpay 2026) |
| "9% of churches have an AI policy" | Wrong figure | **5%** have a formal AI policy (Barna/Pushpay 2026) |
| "25% of churches encountered AI scams" | Cannot be located in any source | Voice-cloning fraud rose **400%+** year-over-year (FBI IC3 2025) |

One more standing rule, from the same pass: **adoption is not capability.** "Most staff use AI" is true; "AI is working for most organizations" is not. Keep the two apart in every line.

---

# 1. Nonprofits

**The frame (one line):** *AI is already in your organization. It just is not yet under your roof.*

The nonprofit story is the cleanest one we can tell, because it is the best-sourced. Three Virtuous 2026 numbers carry almost the whole section, and they are strong, recent, and primary. Lead with them. The structural costs (donor amnesia, mission drift) come second, framed honestly as patterns rather than statistics.

### Proposed pain points

**1. AI is already inside your organization.**
Your staff are not waiting for a policy. Ninety-two percent of nonprofits already use AI in some form, and most of that use is one person, one personal account, one task at a time. The tools arrived before the decision did.
> *Anchor: [`nonprofit-92-adoption`] + [`nonprofit-81-adhoc`] — 92% of nonprofits use AI; 81% individually and ad hoc (Virtuous & Fundraising.AI, 2026, n=346). VERIFIED.*

**2. Donor records are sitting in tools you do not control.**
Someone on your team pastes donor and beneficiary details into a personal AI account to clean up a list or draft an appeal. There is no contract, no retention rule, and no one ever decided this was allowed. It is not negligence. It is what happens when 81% of the work runs through individual accounts with no shared place to do it safely.
> *Anchor: [`nonprofit-81-adhoc`] (Virtuous 2026) for the prevalence. The data-exposure consequence is Synthesis ([the-cost-of-fragmentation], risk exposure); written as a scene, not a breach statistic.*

**3. Your board has not met its duty yet.**
Nearly half of nonprofits have no AI governance policy at all. The board's job to oversee how the organization handles risk now includes this, whether or not anything has gone wrong so far. The duty applies before the harm, not after it.
> *Anchor: [`nonprofit-47-no-policy`] — 47% have no AI governance policy; TechSoup's adjacent measure: 76% have no formal AI strategy (Virtuous 2026 / TechSoup 2025). VERIFIED. Fiduciary framing: [`forvis-fiduciary-ai`] (Forvis Mazars, Feb 2026).*

**4. The time you are saving is not adding up.**
Most teams report small gains from AI and little that compounds. Across nonprofit, enterprise, and faith-sector studies, only five to seven percent of organizations see real capability improvement, and almost all of them have one thing in common: they redesigned how the work flows, instead of bolting AI onto the old steps. Individual use never adds up to organizational strength on its own.
> *Anchor: [`nonprofit-92-adoption`] (only 7% report major capability improvement) + [`high-performer-cohort-5-7`] + [`mckinsey-workflow-redesign`] (55% of high performers redesigned workflows vs ~20% of the field). VERIFIED.*

**5. Your mission voice is drifting, quietly.**
The loud risk is a data breach. The quiet one is worse, because no one notices it for a year. Appeals start to sound generic. Reports round off the inconvenient detail. The specific, particular voice that made donors trust you gets sanded down a draft at a time, until your organization reads like every other organization.
> *Synthesis ([the-cost-of-fragmentation], mission drift + impact-storytelling starvation). No survey quantifies this. Written as a pattern leaders recognize, not a measured rate. Honest signal word: "quietly."*

**6. Every staff departure takes memory with it.**
A mid-tier donor who gave steadily for seven years drifts away, because the only person who knew them left, and the relationship lived in that person's head and inbox, not in anything the organization kept. It is one donor, then another. A slow leak no dashboard catches. This is not a generosity problem. It is a memory problem.
> *Synthesis ([the-cost-of-fragmentation], donor amnesia + staff turnover). Pattern, not statistic. The "not generosity, memory" reframe is the load-bearing move and is opinion, clearly framed as such.*

### The deeper problem (fragmentation), in voice

Underneath the governance gap is fragmentation. Your program knowledge lives in scattered documents. Your donor relationships sit in separate systems. Your mission gets retold a dozen ways by a dozen people. None of it is connected, and none of it is held as one record the organization owns. AI did not cause this. It raised the cost of it, because a model asked about your work will fill the gaps with something fluent and wrong, faster than you can correct it.

### What changed from the current copy

- **Kept and strengthened** the two exact-match stats already in use (81% individual, 47% no policy) and tied each to its claim id.
- **Added** the 92%/7% adoption-vs-capability pair and the workflow-redesign mechanism, which the current copy gestures at ("few see real gains") but does not source.
- **Corrected** "Most nonprofit staff use AI individually" — fine as written, but pinned to the 81% figure so it is not a vibe.
- Donor-data and mission-drift cards stay, **relabeled as structural synthesis** so they never read as measured rates.

---

# 2. Churches

**The frame (one line):** *For a church, trust is not an advantage. It is the product. And it is the thing AI puts quietly at risk.*

Churches are the most trust-fragile audience and, after the corpus correction, one of the best-sourced. The Lifeway and Barna numbers are strong primary surveys. The discipline here is to use the *real* numbers (42%, 5%, 60%) and to never let AI sound like it touches pastoral care or the soul of a sermon.

### Proposed pain points

**1. AI is already in the study, with no rule about the pulpit.**
Many pastors already use AI for research or a first draft. Few have decided, in writing, what that means for teaching from the pulpit. About four in ten Protestant pastors now use AI for ministry, and only one in twenty churches has a formal policy for it. The practice arrived years ahead of the agreement.
> *Anchor: [`lifeway-pastor-42-use`] — 42% of pastors use AI (10% regular, 32% experimenting), 56% non-users (Lifeway 2026, n=1,003) + [`barna-pushpay-church-tech-2026`] — 5% have a formal policy (Barna/Pushpay 2026, n=1,306). VERIFIED. Note: corrected from the dropped "91%."*

**2. Pastoral care notes are in the wrong place.**
Staff paste counseling and care notes into consumer AI tools with no standard for what is kept or who can see it. AI does not do pastoral care, and these notes should never be in those tools. No one decided this. It is just where the work landed when there was nowhere safer to put it.
> *Synthesis ([the-cost-of-fragmentation], risk exposure). The "AI does not do pastoral care" line is a brand refusal, not a claim — keep it. Prevalence is not surveyed; written as a scene.*

**3. People cannot always tell what is really you.**
When a member cannot tell whether you wrote it, a volunteer drafted it, or it was generated, trust erodes a little. Most people now say it matters whether something was made by a person or by AI, and most are not confident they can tell the difference. That gap is exactly where a church's credibility leaks.
> *Anchor: [`pew-ai-detection-attribution-gap`] — 76% say it is important to tell AI from human; 53% are not confident they can (Pew, Sept 2025, n=5,023). VERIFIED. Scoped correctly: this is about telling AI from human, not "trust is dead."*

**4. Your people are already asking the machine.**
Nearly one in three U.S. adults now say spiritual advice from AI is as trustworthy as advice from a pastor, and among Gen Z and Millennials it is two in five. Meanwhile only twelve percent of pastors say they feel ready to teach about AI at all. Your younger members are asking the questions they used to bring to a mentor, and getting answers from a model trained by someone else.
> *Anchor: [`barna-gloo-spiritual-trust-1-in-3`] — 1 in 3 adults / 2 in 5 Gen Z–Millennials trust AI spiritual advice as much as a pastor; 12% of pastors comfortable teaching about AI (Barna/Gloo, Nov 2025, n=1,514). VERIFIED. This replaces the vague "half hopeful, half wary" line in the current letter.*

**5. A model does not share your church's convictions.**
The general-purpose models your members ask are not neutral on faith. Independent testing found they score lowest of all on questions of Christian worldview. When your congregation asks the machine instead of asking you, they are not getting your church's theology back. They are getting an average of the internet's.
> *Anchor: source [`gloo-faic-2025`] — Gloo Flourishing AI Christian benchmark; faith/worldview the lowest-scoring dimension (Gloo, Dec 2025, 807 questions). VERIFIED source; not yet a claim atom — recommend adding one. Worded as "lowest-scoring," not a precise number, until the atom is wired.*

**6. Your voice can be cloned, and it is already happening.**
A few minutes of sermon footage is enough to fake a pastor's voice and use it to solicit emergency gifts from members. This is not hypothetical. Voice-cloning fraud rose more than four hundred percent year over year, and faith leaders are being impersonated specifically because their people trust their voice.
> *Anchor: [`fbi-ic3-893m`] — voice-cloning fraud up 400%+ YoY; $893M in AI-related scam losses in 2025 (FBI IC3 2025). VERIFIED. Replaces the dropped "25% encountered scams" claim with a real, sourced number.*

### The deeper problem (fragmentation), in voice

Underneath all of it is fragmentation. Your teaching lives in sermons no one can search. Your people are known in pieces, in one pastor's memory, one bus accident away from being lost. Formation happens by accident, if it happens, because it was never built as something a person could walk through. AI does not fix this, and dropped into a fragmented church it makes things worse: a model asked to extend your teaching will invent connections you never made, and they may get preached back with your authority.

### What changed from the current copy

- **Corrected the headline number.** "Most pastors use AI" is not true. It is 42% (with 56% not using it). The card now leads with the real split.
- **Replaced** the unsourced "young adults splitting nearly down the middle" with the sourced 1-in-3 / 2-in-5 spiritual-trust figures and the 12% pastoral-readiness gap, which is the real, defensible crisis.
- **Replaced** "scammers can clone your voice / it's already happening" (true but unsupported) with the FBI 400%+ figure.
- **Added** the FAI-C worldview finding, which gives the "your people are asking the machine" card a second, sourced leg.
- **Kept** the pastoral-care-notes and disclosure cards, relabeled as structural where they are not surveyed, and kept the "AI does not do pastoral care" refusal intact.

---

# 3. Institutions

**The frame (one line):** *Whatever you decide about AI becomes the example every church your graduates lead will follow. Doing nothing is still teaching something.*

Institutions (seminaries, denominations, colleges, agencies) are the hardest to source with hard numbers, and we should be honest about that rather than borrow nonprofit stats that do not fit. The strongest moves here are the fiduciary frame (Forvis), the student-adoption baseline (Stanford HAI), the documented deepfake threat (FBI), and the structural credentialing argument from the fragmentation map. Lead with the weight only an institution carries.

### Proposed pain points

**1. Your students are already using it. Almost no one is teaching them how.**
Around four in five students now use generative AI in their coursework. They draft, they do exegesis, they write with it. Most get no real guidance on how to think about it, and the graduates you send out will lead churches in an AI world they were never taught to navigate.
> *Anchor: source [`stanford-hai-2026`] — ~80% of students use generative AI (Stanford HAI AI Index 2026). VERIFIED source; not yet a claim atom — recommend wiring. "Almost no one teaches them" is QUALIFIED below.*

**2. Every professor has a different rule, and the student just guesses.**
One faculty member welcomes AI. The next calls it cheating. Your institution has no shared account of what AI use means for formation, so the student improvises, and the credential quietly comes to mean different things depending on whose class they took.
> *Synthesis ([the-cost-of-fragmentation], coherence + credentialing drift). Pattern, not statistic. There is no binding Association of Theological Schools AI standard as of mid-2026 (QUALIFIED — write as "no shared standard," not a number).*

**3. Your degree does not mean one thing anymore.**
What the degree stood for in 2011, in 2014, and in 2023 drifted, a little at a time, and no faculty body ever reconciled the three. A credential is a promise that the institution behind it is coherent. When formation is scattered, that promise erodes slowly, and then all at once when an accreditor, an employer, or a peer institution notices.
> *Synthesis ([the-cost-of-fragmentation], credentialing drift). Opinion, framed as structural. The trust-collapse pattern is Attributed to Edelman's Trust Barometer (via [09-trust-verification]) — "slowly, then all at once" is the sourced shape.*

**4. The duty to govern this now sits with your board.**
A board's basic duties of care, loyalty, and obedience now include how the institution governs AI. This is not optional and not only a technology matter. It means naming who is accountable, requiring that vendors be accountable too, and folding AI risk into how the institution manages every other risk.
> *Anchor: [`forvis-fiduciary-ai`] — AI expands board fiduciary duties of Care, Loyalty, Obedience; codify via NIST AI RMF (Forvis Mazars, Feb 2026). VERIFIED.*

**5. Your own archive is lost to you.**
The dissertations, the curricula, the journals, the decades of scholarship are all saved somewhere, and almost none of it is findable. Doctoral students reach conclusions your faculty reached thirty years ago. The institution built to hold knowledge across generations cannot, in practice, learn from itself.
> *Synthesis ([the-cost-of-fragmentation], archival illegibility + compounding). Pattern, not statistic.*

**6. Your name can be faked, and the model speaks for you by default.**
A professor's writing or voice can be copied in minutes, and your name no longer proves a thing is really yours. Worse, when someone asks a general model about your institution's position, it answers with confidence, and it is often wrong, because your actual position was never gathered into one place a model could find. You are being represented, at scale, by a tool you never authorized.
> *Anchor: [`fbi-ic3-893m`] — voice-cloning fraud up 400%+ YoY (FBI IC3 2025) for the impersonation half. The "model answers wrong because your position was never gathered" half is Synthesis ([the-cost-of-fragmentation], AI-readiness; the seminary-dean scene in [01-the-invisible-tax]).*

### The deeper problem (fragmentation), in voice

Underneath all of it, your institution is scattered. Faculty, scholarship, and record sit in pieces that do not connect. Syllabi in one place, scholarship in another, the formation pathway visible nowhere as a whole. And you carry a weight the other audiences do not: whatever you model about AI is the template every leader you form will copy. Doing nothing is not neutral. It teaches them that no one needs to think about this carefully.

### What changed from the current copy

- **Sourced the student-use card** with the Stanford ~80% baseline instead of leaving "students are already using it" unquantified.
- **Softened "almost no seminary teaches them"** to "no shared standard," which is what the evidence actually supports (there is no binding ATS standard yet; some schools do have policies).
- **Added the fiduciary card** (Forvis), which gives institutions a concrete, sourced governance hook the current copy lacks.
- **Split the deepfake card** honestly: the impersonation half is sourced (FBI 400%+), the "model misrepresents you" half is labeled structural.
- **Kept** the credential-drift and lost-archive cards as the institution's distinctive pain, clearly marked as structural synthesis with the Edelman trust-collapse shape behind the one sourced claim.

---

# Cross-audience claim audit

Every factual statement proposed above, and where it stands. "Atom" = a wired claim in `claims.ts`. "Source only" = a VERIFIED row in `sources.ts` with no claim atom yet (safe to cite; recommend wiring an atom). "Synthesis" = a structural pattern, written so it never poses as a statistic.

| # | Statement (paraphrase) | Audience | Status | Citation |
|---|------------------------|----------|--------|----------|
| 1 | 92% of nonprofits use AI; 7% see major capability gain | NP | Atom | `nonprofit-92-adoption` · Virtuous 2026 |
| 2 | 81% use AI individually / ad hoc; 4% have documented workflows | NP | Atom | `nonprofit-81-adhoc` · Virtuous 2026 |
| 3 | 47% have no AI policy; 76% no formal strategy | NP | Atom | `nonprofit-47-no-policy` · Virtuous / TechSoup |
| 4 | Only 5–7% see real capability gains | NP | Atom | `high-performer-cohort-5-7` · McKinsey/BCG/MIT |
| 5 | 55% of high performers redesigned workflows vs ~20% | NP | Atom | `mckinsey-workflow-redesign` · McKinsey 2025 |
| 6 | Board fiduciary duty now includes AI governance | NP + Inst | Atom | `forvis-fiduciary-ai` · Forvis Mazars 2026 |
| 7 | Donor amnesia / mid-tier leakage is memory, not generosity | NP | Synthesis | the-cost-of-fragmentation |
| 8 | Mission voice drifts quietly | NP | Synthesis | the-cost-of-fragmentation |
| 9 | 42% of pastors use AI (10% regular, 32% experimenting) | Ch | Atom | `lifeway-pastor-42-use` · Lifeway 2026 |
| 10 | 5% of churches have a formal AI policy; 60% leaders use AI monthly | Ch | Atom | `barna-pushpay-church-tech-2026` · Barna/Pushpay 2026 |
| 11 | 76% say it matters whether content is AI; 53% not confident they can tell | Ch | Atom | `pew-ai-detection-attribution-gap` · Pew 2025 |
| 12 | 1 in 3 trust AI spiritual advice as a pastor; 2 in 5 Gen Z–Mill; 12% pastors ready to teach | Ch | Atom | `barna-gloo-spiritual-trust-1-in-3` · Barna/Gloo 2025 |
| 13 | Models score lowest on Christian worldview | Ch | Source only | `gloo-faic-2025` · Gloo FAI-C 2025 (wire an atom) |
| 14 | Voice-cloning fraud up 400%+; $893M AI-scam losses 2025 | Ch + Inst | Atom | `fbi-ic3-893m` · FBI IC3 2025 |
| 15 | Pastoral-care notes in consumer tools / AI does not do care | Ch | Synthesis + refusal | the-cost-of-fragmentation + voice refusal |
| 16 | ~80% of students use generative AI | Inst | Source only | `stanford-hai-2026` · Stanford HAI 2026 (wire an atom) |
| 17 | No shared / binding ATS AI standard yet | Inst | Qualified | corpus §ATS (write as "no shared standard") |
| 18 | Credential drifts; trust collapses slowly then at once | Inst | Synthesis + Attributed | the-cost-of-fragmentation + Edelman (via 09-trust-verification) |
| 19 | Archive is unfindable; institution can't learn from itself | Inst | Synthesis | the-cost-of-fragmentation |
| 20 | Model misrepresents the institution because its position was never gathered | Inst | Synthesis | the-cost-of-fragmentation + 01-the-invisible-tax |

**Dropped and not used anywhere** (corpus §10): "91% of church leaders use AI," "9% have an AI policy," "25% of churches encountered AI scams," any single-dollar "fragmentation tax" figure, "68% can't distinguish AI," "40–60% of blogs are AI."

---

# Recommendations

1. **Wire two new claim atoms.** `gloo-faic-2025` (worldview benchmark) and `stanford-hai-2026` (~80% student use) are VERIFIED sources already in `sources.ts` but have no claim atom in `claims.ts`. Statements 13 and 16 lean on them. Add the atoms and the chips become first-class on the audience pages.
2. **Hold the line on adoption vs capability.** The single most common slip in this material is letting a high adoption number imply that AI is working. Every section above keeps them separate; keep it that way in the rendered cards.
3. **Keep the synthesis cards labeled in the source, not the surface.** The reader never sees "Synthesis." They see a concrete scene (the seven-year donor, the 2011/2014/2023 drift). The label is for us, so we never accidentally attach a chip to an opinion.
4. **Institutions are evidence-light by design.** Resist importing nonprofit stats to fill the gap. The honest, well-sourced spine is fiduciary duty (Forvis) + student baseline (Stanford) + impersonation (FBI), with the distinctive pain (credential drift, lost archive) carried as structural argument. That is stronger than a borrowed number that does not survive a cold read by a committee.
