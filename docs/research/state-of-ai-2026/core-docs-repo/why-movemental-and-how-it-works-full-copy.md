# Why Movemental & How It Works — Full Front-End Copy (Prose + Annotations)

**Purpose:** Single editable document that represents everything currently on the front end for **Why Movemental** (`/why-movemental-final`) and **How It Works** (canonical `/how-it-works` plus alternate versions). Prose is written out; annotations mark source (route, component, version) so you can edit copy and then find where it lives in code.

---

## Routes and versions

| Route | Status | Container | In nav? |
|-------|--------|-----------|--------|
| `/why-movemental-final` | **Live** | `WhyMovementalFinalContainer` | Yes (Why Movemental) |
| `/how-it-works` | **Canonical** | `OnboardingPathContainer` | Yes (How It Works) |
| `/how-it-works-new` | Redirect → `/how-it-works` | `HowItWorksNewContainer` (reference only) | No |
| `/how-it-works-final` | Redirect → `/how-it-works` | `HowItWorksFinalContainer` (reference only) | No |
| `/onboarding` | Redirect → `/how-it-works` | — | No |

Only `/why-movemental-final` and `/how-it-works` are linked from the main site. The “new” and “final” How It Works variants are merged or reflected in the canonical page; their component copy is included below for reference.

---

# Part 1: Why Movemental (`/why-movemental-final`)

**Container:** `WhyMovementalFinalContainer`  
**Section nav IDs (in order):** hero → network → sound-familiar → trust-collapse → credibility-crisis → fragmentation → playbook → transformation → proof → amplification → network-effect → invitation

---

## 1. Hero [why-movemental-final · GSAPHeroTextSection]

*Scroll-driven; three blocks that replace each other.*

**Block 1:**  
What if your life’s work could live on one platform you own but didn’t have to build—e-books, courses, articles, AI tools, all in one place, built for your content and the people shaped by it?  
Not scattered PDFs and videos—books, articles, and courses, structured, AI-supported, and ready to grow.  
In under 2 weeks.

**Block 2:**  
And what if that platform was part of a credibility network of 100 movement leaders—like Alan Hirsch and Brad Brisco.  
100 movement leaders:  
- Linking to each other  
- Collaborating in new ways  
- Publishing their best work  

**Block 3:**  
Look.

---

## 2. Network (Scenius visualization) [why-movemental-final · SceniusVisualization]

*Scroll-pinned network panel. Narrative beats shown as user scrolls.*

**Narrative beats (in order):**  
1. One voice.  
2. Two. The graph begins—who points to you.  
3. Connected voices. Each addition makes the whole more findable.  
4. The scenius grows.  
5. At 100: a real credibility graph.  
6. Your content discoverable through the people who already trust you. Click a node to explore.

*Node data (e.g. Alan Hirsch, Brad Brisco) and modal copy come from `network-data.ts` and `NodeModal`; not duplicated here.*

---

## 2a. Sound familiar [why-movemental-final · SoundFamiliarSection]

*Compact pain-point resonance moment. Placed after network, before Trust Collapse.*

**Statements (4):**  
1. My best work already exists. Almost nobody can find it.  
2. I have credibility in the room. Online I'm invisible.  
3. I'm not being heard on a technicality—credibility is part of my calling, but I didn't have the amplifier.  
4. The people I'm called to form can't get what would form them.

**Pivot:** This is structural, not personal. The middle—where publication and wisdom used to travel—has collapsed. Rebuilding it is the work. What was impossible is now possible; there's a scenius for this time.

---

## 3. Trust collapse (middle) [why-movemental-final · TrustCollapseMiddleSection]

*GSAP scroll-driven; one block at a time.*

1. Because of AI, anything that isn’t face-to-face can be fake or real—and you often can’t tell.  
2. The volume of that content is beyond what any person can take in.  
3. The result is confusion and overwhelm. → *Body:* Which leads to shutdown.  
4. What do people shut down? → *Body:* What they can’t verify. And they can’t verify what wasn’t live.  
5. For most people, trust is becoming two things: → *Body:* Hyperlocal. And AI-mediated. → *Small:* In between, trust collapses.  
6. What used to live in that middle? → *Body:* Publication. Wisdom—personal and collective.  
7. Movement leaders work across all three: hyperlocal, middle, digital. → *Body:* But most have taught and published in the middle. And that middle is gone.  
8. For most people, not being able to tell what’s real—plus the speed and scale—means they’re done. → *Body:* Online trust, done. TV trust, done. Print trust, done.  
9. So what? → *Body:* The middle is where movement leaders live. Rebuilding trust there—through relational credibility, through networks of verified humans—is the work.

---

## 4. Credibility crisis (facts + implications) [why-movemental-final · CredibilityCrisisSection]

**Facts block (three facts + card):**

- **Fact 1 heading:** There is a **credibility crisis**, and for us it was personal.  
  **Body:** We’re the team behind Movemental. We built our first platform for Alan Hirsch—9+ books, seminal work in missional theology and APEST, organizations that multiply practitioners worldwide. We saw his content stuck in silos: books on retailer pages, org content scattered across domains, ideas in formats the digital world can’t find. The ways people used to discover voices like his were breaking down.

- **Fact 2 heading:** The crisis is **credibility signals no longer signal.**  
  **Body:** As of 2025, 40–60% of content online involves AI. Volume no longer means expertise—AI can produce in a week what most writers produce in a year. Polish doesn’t mean professionalism. Presence doesn’t mean commitment. People can’t tell what’s real. Studies show 68% of users struggle to tell human-created from AI-generated content. Movement leaders, whose credibility is relational and hard-won, feel it acutely.

- **Fact 3 heading:** For Alan, the crisis was **invisibility, not authority.**  
  **Body:** Alan’s credibility in the room is clear: seminal books, multiple organizations, academic appointments. Online it’s partial. His content lives in silos—books on retailer pages, org content on org sites, academic material behind paywalls. There’s no one place where “everything Alan has said and written about APEST” is structured, linked, and findable. So it doesn’t move. Search and AI can’t reliably find it. The gap between people who know his work and people who would be formed by it if they could find it is large.

- **Implications card heading:** So what?  
  **Body:** Many movement leaders feel it: I have credibility in the room. Online I’m invisible. I don’t want to create more—I want what I’ve created to do more. I don’t have time to become a content strategist, and I shouldn’t have to. For a long time it was right not to pour years into "being findable"—the cost made it poor stewardship. The moment has flipped: the opportunity now costs you almost nothing, and the upside isn’t just your credibility but the network’s. This isn’t a tech problem. **It’s a human problem.** It needs a human response—thoughtful, personalized AI integration. That’s not mainly technical. It’s hard. And it needs a community to carry it. We decided to build **credibility through networks**, not individual metrics—so your work becomes discoverable through the people who already trust you.

**Following narrative sections (same component):**

- **Statement:** In 2025, the AI people used to write could **code** too.  
  **Body:** Most people haven’t yet grasped what it means to work with systems that can do anything language can do—program, use your computer, the internet, other AI agents. But a few were suddenly faced with the question: what would you build if you could build anything, digitally, for anyone? God put Alan, Brad, and me together to test that. Our answer wasn’t to build the perfect digital platform. It was to build the **scenius to wield it**—the network of verified humans who can steward credibility, content, and community when the middle has collapsed.

- **Statement:** We decided to build **credibility through networks,** not individual metrics.  
  **Body:** The solution isn’t to work harder alone. It’s to work together. Credibility in the AI age comes through scenius—networks of verified humans who vouch for each other, build on each other’s ideas, and create collective authority that’s harder to fake than follower counts or polish. Movemental is that scenius in practice: one place you control where your credibility, content, and network are clearly attached. Content that’s findable, connected, and linked to trusted peers. Your work doesn’t sit alone—it becomes discoverable through the people who already trust you.

- **Statement (dark):** **Credibility amplification** via the very tool behind the crisis.  
  **Body:** AI creates the credibility crisis: infinite content, broken signals, trust collapse. But AI can also help us navigate it—when we use it to amplify what’s real, not simulate what isn’t. Your expertise is hard-won. Your voice is distinctive. Your credibility is relational. AI can help you communicate more clearly, reach more people, adapt your teaching, handle structure and formatting so you can focus on what only you can do. The credibility stays yours. It’s grounded in what’s real—verified through the network, not fabricated by the algorithm. Whether you want AI for human flourishing or not: if you don't know its power, you miss the benefits and you miss the harm. The posture that serves movement leaders is liminal, experimental, risk-taking in public—toward maturity and formation while staying embodied and relational.  
  **Closing line:** Use AI to amplify what’s real. Don’t use it to fake what isn’t.

- **Statement:** Our numbers: **100** · **$1,000** · **10%**  
  **Body:**  
  - **100 movement leaders.** Relational credibility has limits. We’re building a coherent ecology—a scenius—not a marketplace. One hundred is enough to form a network of verified humans who vouch for each other and carry each other’s work; it’s not so many that the middle becomes noise again.  
  - **$1,000 at first.** We wanted the bar to be real but reachable. Not $50K and not free. A commitment that says “I’m in” without requiring capital that movement leaders don’t have. Ownership and infrastructure from day one.  
  - **10%.** Traditional publishing has taken 85–90% and left the writer with the rest; the only credibility model said you needed them to be legit. We take 10% when you succeed. Revenue share aligns us with your success—we don’t make money unless your content moves. That keeps us building for circulation and credibility, not for extraction. We grow when you do.

- **Statement (dark):** Movement still happens **offline.**  
  **Body:** Formation can’t be automated. Community can’t be simulated. Movemental exists to reduce digital burden so leaders can stay present to the people in front of them. Success is being heard by your people, not everyone. We’re not building the perfect digital platform for its own sake. We’re building the scenius to wield it: the infrastructure so the middle—publication, wisdom that travels—can hold again. So movement leaders can teach and publish there, and movement can still happen in the room.

---

## 5. Crisis (fragmentation) [why-movemental · CredibilityCrisis]

**Statement:** **The Credibility Crisis**  
**Sub:** Modern movement leaders are digitally fragmented.  
**Pain lead-in:** My best work exists. Nobody can find it. The people who trust me can't point others to it.

**Two columns:**

- **Current Reality:** PDFs scattered across drives; Sermons buried on YouTube; Articles lost in archives; No canonical structure; No continuity; No amplification.  
- **Impact:** Ideas disappear; No structured discoverability; No network leverage; No AI readiness; No scalable distribution.

---

## 6. Playbook [why-movemental · MovementalPlaybook]

**Statement:** **The Movemental Playbook**  
**Sub:** It followed a structured content architecture.

**Steps (accordion):**  
1. **Content Extraction** — Audit existing content—books, talks, articles, courses. Identify core frameworks, themes, and signature ideas. Capture the raw material that defines the leader’s contribution.  
2. **Canonical Structuring** — Organize content into a coherent knowledge architecture. Establish relationships between ideas, themes, and bodies of work. Create a single source of truth for the leader’s output.  
3. **Modularization** — Break content into reusable, addressable modules. Each module can stand alone or connect to larger narratives. Content can be surfaced, remixed, and delivered in multiple formats.  
4. **Platformization** — Deploy modular content into a leader-owned platform. Books, courses, articles, resources—all in one place. The leader controls the experience, audience, and data.  
5. **AI Integration** — Add AI tools that respect the leader’s voice and intent. Writing assistance, repurposing, intelligent search. AI as translation layer—not replacement.  
6. **Distribution Network** — Connect the platform to the Movemental credibility network. Structured content becomes discoverable across the movement. Peer connections compound credibility and reach.  
7. **Feedback & Amplification** — Measure what resonates. Surface what compounds. Content that connects earns visibility through trust, not algorithms. Structure creates leverage; leverage creates amplification.

---

## 7. From fragmented to platform [why-movemental · FragmentedToPlatform]

**Statement (dark):** From **Fragmented** to **Platform**

**Before:** Scattered PDFs (Multiple drives, no index); YouTube Sermons (Buried in playlists); Blog Archives (Chronological, unsearchable); Static Book (Print-only, no discoverability); Document Folders (Local files, no structure).

**After:** Structured Books (Chapters, search, cross-links); Modular Courses (Nested modules, progression); Searchable Articles (Tagged, categorized, discoverable); AI Writing Assistant (Voice-matched, context-aware); Unified Dashboard (One view, full control).

---

## 8. Proof (Alan) [why-movemental · AlanProof]

**Statement:** **The Alan Hirsch Platform**

*Visual: browser mock with alanhirsch.movemental.ai and four modules: Structured Books, Modular Courses, AI Writing Assistant, Unified Dashboard.*

**Closing line:** Built. Structured. **Live.**

---

## 9. Credibility amplified (stats) [why-movemental · CredibilityAmplified]

**Statement:** **Credibility Amplified**

**Stats:**  
- **100** — Structured Ideas — Core frameworks extracted, organized, and made discoverable.  
- **1,000** — Discoverable Nodes — Content modules—chapters, lessons, articles—each addressable and searchable.  
- **10%** — Compounded Credibility — Structured content compounds visibility over time through network connections.

**Closing:** Structure creates **leverage.** Leverage creates **amplification.**

---

## 10. Network effect [why-movemental · NetworkEffect]

**Statement (dark):** **The Network Effect**  
**Body:** When structured content connects to structured systems, amplification multiplies. Each node in the network strengthens the others.

*(Diagram: abstract node graph.)*

---

## 11. Invitation [why-movemental · Invitation]

**Statement:** What would it look like if **yours was structured?**  
**Body:** Your content already exists. Your ideas already matter. The question is whether they’re structured to move.

**CTAs:**  
- Primary: Start Structuring → `/fit-check`  
- Secondary: Explore the Platform → `/how-it-works`

---

# Part 2: How It Works — Canonical (`/how-it-works`)

**Container:** `OnboardingPathContainer`  
**Section nav IDs:** order → work-here → path → phases → pipeline → ai-role → different → get → pricing → supporting → summary → cta

---

## Hero [onboarding-path]

**Lead:** You’ve seen the problem. Here’s the path.  
**Badge:** [Clock icon] 3–4 weeks from fit to live  
**Headline:** How Movemental **Works** (gradient on “Works”)  
**Sub:** Four phases to get your content discoverable, connected, and moving. Your platform launches with content, not empty templates.  
**CTA:** See the four phases (scrolls to #phases)

---

## Order of understanding [OnboardingPathContainer · id="order"]

**Statement:** The right **order** to understand Movemental  
**Body:** For someone who doesn’t know, the path only makes sense after you understand why Movemental exists.

**Order steps (numbered list):**  
1. Self-Screen — Am I the right person for this?  
2. Why Movemental — What problem does this solve and why does it matter?  
3. How It Works — What actually happens from fit to launch?  
4. Team / Credibility — Who is behind this and why should I trust them?  
5. AI Book / Knowledge — What is the foundational thinking and posture?  
6. Learning Hub — How do I use the platform?  
7. Pricing & Access — What does it cost and what are the limits?

---

## Your work is here [OnboardingPathContainer · WorkHereVisionSection]

**Statement:** Your work is here. **It should also be here.**  
**Body:** Your sermons, books, talks, and notes already exist — in PDFs, on YouTube, in archives. We don’t start from a blank page. We start with what you have and make it findable, linked, and part of a coherent platform.

*Diagram (WorkHereVisionSection):*  
- **Your work is here** — Where it currently exists: PDFs, YouTube sermons, Books, Notes, Archives.  
- **Arrow + stewardship:** If it’s cheap & fast (stewardship)  
- **It should also be here** — Our digital vision: One platform you control; Findable & linked; Evergreen articles & courses; Ready to translate; Part of the scenius.

---

## Path intro [OnboardingPathContainer · id="path"]

**Statement:** From fit to live in **3–4 weeks**  
**Body:** After you confirm fit and understand why Movemental exists, you go through four phases. Your platform launches with content, not empty templates—configured for your voice and connected to the Movemental network. Each phase builds on the last. The process is movement-first, evidence-based, and launch-ready.

---

## Four phases [OnboardingPathContainer · Timeline + ONBOARDING_PHASES]

**Statement:** **Four phases** to launch

**Phases (from `lib/schemas/onboarding-path.ts`):**  
1. **Discovery & Vision** — Establishing Your Foundation — We start by understanding who you are, your movement context, and your vision. This phase aligns your identity with what Movemental can do. *Week 1 · 2–3 sessions.* Activities: Core Identity Exploration; Movement Context Mapping; Business Model Alignment; Vision Documentation.  
2. **Content Research** — Understanding Your Body of Work — Our AI analyzes your existing content to understand your voice, themes, and audience. Your platform ends up reflecting your actual work. *Week 1–2 · 3–5 days.* Activities: Automated Content Analysis; Theme & Topic Extraction; Network Intelligence; Content Strategy Brief.  
3. **Platform Architecture** — Building Your Digital Home — We configure your platform with the features and integrations that match your needs. Every decision is driven by the insights from discovery and research. *Week 2 · 1 week.* Activities: Platform Requirements; AI Integration Setup; Content Migration; Feature Configuration.  
4. **Network & Launch** — Going Live Together — You join the Movemental network and launch—with content already on the platform and connection to other movement leaders. *Week 3–4 · 1–2 weeks.* Activities: Network Onboarding; Cross-Promotion Strategy; Launch Preparation; Platform Launch.

---

## Content pipeline [OnboardingPathContainer · ContentPipelineDiagram + ContentPipelinePreviewAgent]

**Statement:** What happens to the work **you’re already doing**  
**Body:** Your existing work—sermons, talks, books, notes, archives—passes through a layer that identifies your voice, themes, and lane. What emerges is evergreen content structured for discovery.  
**Punch:** We don’t speed up creation. We speed up circulation.

*ContentPipelineDiagram labels:*  
- **Inputs:** Sermons, Talks, Books, Notes, Archives  
- **Discernment Layer:** voice, themes, primary lane, what matters / what doesn’t  
- **Evergreen Outputs:** articles, courses, collections, translations  

*ContentPipelinePreviewAgent:*  
**Heading:** Where does your content live?  
**Sub:** Select everything that applies. We’ll show you how the Movemental pipeline would work for your situation.  
**Source options (from `lib/content-pipeline-sources.ts`):** Books; Sermons; Sermon series; Talks & keynotes; PDFs & documents; Desktop files & folders; Trello; Notion; Google Drive; Dropbox; YouTube / Vimeo; Podcast episodes; Website / blog; Email newsletters; Courses (other platforms); Slide decks (PowerPoint, Keynote); Spreadsheets (outlines, planning); Notes (Apple Notes, Evernote, etc.); Archives (old sites, backups).  
*(Plus button to generate preview and display API result.)*

---

## AI’s role [OnboardingPathContainer · id="ai-role"]

**Statement (dark):** **AI’s role** — and what stays human  

**AI assists with:** Drafting and structuring from your material; Pattern recognition and themes; Editing and formatting; Translation and SEO as background.  
**Humans retain:** Voice and theological judgment; Discernment and course design; What to publish and when; Honesty with your audience.  

**Closing:** Quality is preserved through feedback loops. AI helps draft; humans shape. The system learns your constraints over time.

---

## What makes this different [OnboardingPathContainer · WHAT_MAKES_DIFFERENT]

**Statement:** This is not a **DIY platform** or a generic template.

**Cards:**  
- **Movement-First** — Built for movement leaders with missional theology and incarnational practice at the core.  
- **Evidence-Based** — AI analyzes your content so the platform reflects your real voice and body of work.  
- **Launch-Ready** — Your platform launches with content, not empty templates. Ready to serve from day one.  
- **Network Effects** — Connect with other movement leaders. Cross-pollinate. Amplify reach together.  
- **Owned, Not Rented** — Your platform, your audience, your data. No algorithmic gatekeeping.  
- **AI-Amplified** — Movemental Intelligence helps create, curate, and connect your content across the network.

---

## What you get [OnboardingPathContainer · WHAT_YOU_GET]

**Statement:** **What you get**

**Bullets:**  
- A complete digital publishing platform — content, commerce, community, and analytics in one place.  
- Your voice — the platform is configured from your existing content and identity, not a generic theme.  
- Ownership — you own the platform, the audience relationship, and the data.  
- Connection — you’re part of the Movemental network: discoverability and credibility alongside trusted peers.  
- Ongoing support — AI and tools that help your content stay discoverable, connected, and moving.

---

## Pricing and access [OnboardingPathContainer · id="pricing"]

**Heading:** Pricing and access  
**Body:** Movemental charges an upfront fee (far below the $50K–$150K norm) plus a revenue share so we're aligned with your success. You keep most of the revenue. Full pricing is on the Pricing page—after you understand why Movemental exists and what the path looks like, so you can evaluate it in context.  
**CTA:** View pricing → `/pricing`

---

## Supporting pieces [OnboardingPathContainer · id="supporting"]

**Statement:** **Supporting pieces**  
**List:** Team / Credibility — Who built Movemental and who guides it. | AI Book / Knowledge Spine — Foundational language, discernment, and posture. Free and substantive. | Learning Hub — Guides and resources to use the platform.  
**Links:** Team → `/team`, AI Book → `/book`, Learn → `/learn`

---

## Summary [OnboardingPathContainer · id="summary"]

**Heading:** How it works in one pass  
**Body:** You confirm fit. You understand why Movemental exists (your content is transformative; it doesn’t move; we fix that). You see the path: four phases over 3–4 weeks—Discovery & Vision, Content Research, Platform Architecture, Network & Launch. Your platform goes live with content and with connection to the Movemental network. You own it. You keep most of the revenue. You’re part of a relational credibility network, not an isolated site. Supporting that: who we are (team), what we believe (AI book), and how to use it (learning hub). That’s how Movemental works.

---

## CTA [OnboardingPathContainer · id="cta"]

**Statement:** **Ready to begin?**  
**Body:** See if you’re a fit. No commitment required.  
**CTAs:** Start with Self-Screen → `/fit-check` | Why Movemental → `/why-movemental`

---

# Part 3: How It Works — Alternate versions (reference)

*These versions are not live; routes redirect to `/how-it-works`. Copy is included so you can compare or merge.*

---

## How-it-works-final (HowItWorksFinalContainer)

**Hero:** A clear path from your existing work to a living system. No hype. No black box. A repeatable process built around credible leadership.

**Your work is here:** Your work is here. **It should also be here.** Your sermons, books, talks, and notes already exist—in PDFs, on YouTube, in archives. We don’t start from a blank page. We start with what you have and make it findable, linked, and part of one coherent platform. Cheap and fast is good stewardship. *(Same WorkHereVisionSection diagram.)*

**Playbook:** The full digital playbook we extracted and employed for **Alan.** We begin with what already exists. We clarify your lane. We turn it into a coherent body of work that compounds over time. *(PlaybookFlowDiagram — see playbook nodes below.)*

**Content pipeline:** The **content pipeline.** Your existing material becomes a living archive—then evergreen content, courses, and circulation. We don’t speed up creation. We speed up circulation. *(Same ContentPipelineDiagram.)*

**AI’s role:** Same split as canonical (AI assists / Humans retain + closing line).  
**Closing line (final):** Quality is preserved through feedback loops. AI drafts; humans shape. The system learns your constraints over time.

**2-week timeline:** The **2-week** onboarding timeline. Platform setup, corpus ingestion, voice and lane clarification, then core content and launch. Sustainable rhythm from day one.  
*TwoWeekTimelineDiagram:* Week 1 — Platform setup & profile; Corpus ingestion (your existing work); Voice and lane clarification. Week 2 — Core content structured & published; Feedback loop established; Launch & sustainable rhythm.

**CTA:** If you’re curious what this would look like for your work, the next step is discernment—not commitment. Take the Self-Screen → `/fit-check`

---

## How-it-works-new (HowItWorksNewContainer)

**Section nav:** The Path, Playbook, Pipeline, AI Role, Voice, Launch, After.

**The path:** A Clear Path — Not a **Content Treadmill**. Movemental is not about creating more content. It begins with what you have already created and helps it become a **living, discoverable body of work**. The process is simple, finite, and designed to fit within the rhythms of embodied leadership.  
*PathDiagram steps:* Start with existing work; Clarify voice and lane; Build a living digital corpus; Establish a sustainable rhythm.

**The playbook:** A Proven Playbook — **Shown, Not Dumped**. Movemental follows a disciplined content playbook developed through decades of thought leadership, publishing, and long-term circulation. It prioritizes work that **compounds over time** rather than chasing attention.  
*PlaybookFlowDiagram nodes (same as in final):* Existing Work; Evergreen Content; Courses & Deep Work; Translation & Circulation; Long-Term Compounding (with descriptions/examples per node).

**Content pipeline:** What Happens to the Work **You’re Already Doing**. Movemental begins with your existing body of work — sermons, talks, books, notes, archives. Creation is not accelerated. Circulation is. *(Same ContentPipelineDiagram.)*

**AI role:** What AI Does — and **What It Doesn’t**. AI Assists With: Pattern recognition; Drafting from your material; Editing and formatting; Translation; SEO as background translation. Humans Retain: Voice; Theological judgment; Discernment; Course design; Honesty with audience; Formation decisions.  
**Closing:** AI is used to **reduce digital burden** — not replace human judgment or vocation.

**Voice:** Preserving **Voice and Integrity**. AI assistance is only useful if your voice remains intact. Movemental tools are designed to **adapt to your language, tone, and theological posture** — not overwrite them. *(VoiceComparisonDemo.)* No claim of perfection. The process is iterative and human-reviewed.

**Launch:** A 30-Day Launch — Not an **Endless Setup**. *(LaunchTimelineDiagram:)* Week 1 — Platform setup; Profile + corpus ingestion. Week 2 — Voice and lane clarification; Evergreen priorities identified. Week 3 — Core content published; Feedback loop established. Week 4 — Launch; Sustainable rhythm defined.  
**Sub:** The process is primarily **self-directed**, with optional human touchpoints for deeper work.

**After launch:** After Launch: A Sustainable **Rule of Life**. Movemental is designed to integrate into your existing rhythms — not replace them. Most leaders commit approximately **three hours per week**. Sermons, writing, teaching, and local ministry continue. The platform becomes an anchor for circulation, not a demand for constant output.

**CTA:** If you’re curious what this would look like for your work, the next step is **discernment** — not commitment. Take the Self-Screen → `/fit-check`

---

## PlaybookFlowDiagram — node copy (shared by final + new)

- **Existing Work** — Books, sermons, talks, articles, notes — the raw material of decades. *Example:* A leader’s 15 years of sermon archives.  
- **Evergreen Content** — Timeless articles and resources that answer recurring questions. *Example:* Core theological frameworks rewritten for web discovery.  
- **Courses & Deep Work** — Structured learning paths for those ready to go deeper. *Example:* A 6-week formation course built from existing teaching.  
- **Translation & Circulation** — Adapting content for new contexts, languages, and discovery channels. *Example:* Spanish translation, podcast summaries, newsletter digests.  
- **Long-Term Compounding** — Work that finds new audiences over years, not days. *Example:* An article written in 2020 still generating traffic in 2030.

---

# Quick reference

**Page titles (metadata):**  
- Why Movemental: “Why Movemental | Movemental”; description references credibility crisis, Alan Hirsch, credibility amplification.  
- How It Works: “How It Works | Movemental”; description: path to platform launch in 3–4 weeks, four phases.

**Cross-links:**  
- Why outro: Start Structuring → `/fit-check`, Explore the Platform → `/how-it-works`.  
- How It Works CTA: Start with Self-Screen → `/fit-check`, Why Movemental → `/why-movemental`.  
- FAQ / footer / nav: How It Works → `/how-it-works`; Why Movemental → `/why-movemental` (or `/why-movemental-final` depending on link).

Use this doc to edit prose in one place, then update the corresponding component or schema (noted in brackets) in the repo.
