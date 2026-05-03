(function () {
  "use strict";
  window.COURSE_LESSONS = (window.COURSE_LESSONS || []).concat([
    {
      id: "intro",
      navGroup: "start",
      title: "Welcome",
      subtitle: "Outcomes & design",
      kicker: "Start here",
      h1: "AI Workforce Training &amp; Safe Experimentation",
      meta: "4 weeks · Non-profit cohorts · Change management, not a tools tutorial",
      html:
        "<p><strong>Audience:</strong> Executive teams, people managers, program leads, communications and development staff, board members, and volunteer coordinators who must train others to use AI responsibly while running a <strong>designed experimentation program</strong> that surfaces real value and documents human concerns before they become crises.</p>" +
        "<p><strong>Premise:</strong> AI adoption is a <strong>human process first</strong> and a technology process second. Tools are comparatively easy; shared vocabulary, bounded play, evidence over hype, and stewardship of trust — especially with donors, clients, and vulnerable populations — are the hard work.</p>" +
        "<div class=\"callout\"><strong>Companion materials.</strong> For session-by-session scripts (twelve sessions), pair this outline with <code>_docs/publishable/07-ai-adoption-for-nonprofits-course-outline.md</code>. For fundraising-specific implementation, see <code>_docs/ai-powered-fundraising-implementation-4-week-course-outline.md</code>.</div>" +
        "<h2>Organization-level outcomes (end of Week 4)</h2>" +
        "<ol>" +
        "<li><strong>Train</strong> staff with a common frame: what AI is, what it is not, and where it must not go.</li>" +
        "<li><strong>Run</strong> a repeating <strong>Safe Experimentation Protocol (SEP)</strong> — scoped tasks, approved data, named reviewers, written logs.</li>" +
        "<li><strong>Identify</strong> evidence-backed use cases mapped to <strong>efficiency</strong> (time), <strong>financial impact</strong>, and <strong>work quality</strong> (explicitly defined per task).</li>" +
        "<li><strong>Maintain</strong> a <strong>Concerns Register</strong> with owners, mitigations, and review dates.</li>" +
        "<li><strong>Publish</strong> an internal <strong>AI playbook</strong> ready to extend into a 30/60/90-day plan.</li>" +
        "</ol>" +
        "<h2>Design principles (hold these weekly)</h2>" +
        "<table><thead><tr><th>Principle</th><th>In practice</th></tr></thead><tbody>" +
        "<tr><td>Governance before scale</td><td>Senior leadership owns stance; no-go zones precede new tools.</td></tr>" +
        "<tr><td>Experimentation before adoption</td><td>Bounded trials produce discernment; skipping experiment is guessing.</td></tr>" +
        "<tr><td>Humans accountable</td><td>Named reviewers for every externally visible or high-stakes output.</td></tr>" +
        "<tr><td>Data minimization</td><td>Default: no PII, donor records, client notes, or youth data in consumer tools until policy matches risk.</td></tr>" +
        "<tr><td>Negative results are data</td><td>If AI does not save time or hurts quality, log it.</td></tr>" +
        "<tr><td>Stakeholders have voice</td><td>Concerns are captured structurally, not dismissed as resistance.</td></tr>" +
        "</tbody></table>" +
        "<h2>Cohort design</h2>" +
        "<p><strong>Ideal size:</strong> four to twelve people from the <em>same organization</em>. <strong>Roles:</strong> executive sponsor, operations/IT liaison, program lead, comms/marketing, development (if applicable), HR or volunteer coordinator, and a <strong>board liaison</strong> where possible. Sponsor and board liaison should attend governance and playbook sessions — otherwise AI is signaled as a staff IT issue.</p>",
    },
    {
      id: "w1s1",
      navGroup: "w1",
      title: "Session 1 — What AI does and does not do",
      subtitle: "Plain language · failure modes",
      kicker: "Week 1 — Orientation",
      meta: "Suggested 60–90 minutes · Facilitator-led",
      html:
        "<p><strong>Theme:</strong> Demystify the technology, surface hopes and fears honestly, and prepare for Draft 1 boundaries before anyone &ldquo;goes prod.&rdquo;</p>" +
        "<h2>Learning goals</h2>" +
        "<ul>" +
        "<li>Explain LLM behavior in plain language: <strong>pattern completion</strong> on training data — not understanding, conscience, or intrinsic care for your mission.</li>" +
        "<li>Name strengths: drafting, summarizing, reformatting, brainstorming, first-pass structure.</li>" +
        "<li>Name weaknesses: uncited &ldquo;facts,&rdquo; unreliable math, false confidence in legal/medical/financial domains, shallow community judgment, tendency to sound authoritative when wrong.</li>" +
        "<li>Connect to non-profit life: reporting, comms, volunteer coordination, light analysis — without inventing statistics or donor metrics.</li>" +
        "</ul>" +
        "<h2>Facilitation flow</h2>" +
        "<ol>" +
        "<li><strong>Ground rules (10 min):</strong> curiosity over shame; no tool demos until vocabulary is shared; what is said in the room about fear stays critique-friendly.</li>" +
        "<li><strong>Live contrast (15 min):</strong> Show one harmless example — e.g. summarize a public blog post vs. ask for &ldquo;donor retention stats for our city&rdquo; and watch the model invent. Debrief: <em>the tool confabulates; the human verifies.</em></li>" +
        "<li><strong>Implications table (20 min):</strong> In small groups, sort tasks into: (A) good AI assist candidates, (B) only with reviewer, (C) not with consumer tools. Plenary share.</li>" +
        "<li><strong>Bridge to charter (15 min):</strong> Everything in (B) and (C) will land in your Team AI Charter next session.</li>" +
        "</ol>" +
        "<div class=\"callout deliverable\"><strong>Exit ticket.</strong> Each participant writes three sentences: one hope, one fear, one boundary they already sense the org needs.</div>",
    },
    {
      id: "w1s2",
      navGroup: "w1",
      title: "Session 2 — Assumptions audit",
      subtitle: "Hopes · fears · Concerns Register seed",
      kicker: "Week 1 — Orientation",
      meta: "Suggested 60–90 minutes",
      html:
        "<p>The goal is <strong>psychological safety</strong> with <strong>accountability</strong>. You are not collecting gossip; you are clustering themes that will feed the <strong>Concerns Register</strong> in Week 3.</p>" +
        "<h2>Methods (pick what fits your culture)</h2>" +
        "<ul>" +
        "<li>Anonymous sticky notes or digital board (Miro, Slido) — cluster into themes: accuracy, jobs, privacy, authenticity, theology/mission, equity.</li>" +
        "<li>Round-robin with pass option — facilitator models brevity.</li>" +
        "<li>Pair-and-share before plenary — lowers the stakes for introverts.</li>" +
        "</ul>" +
        "<h2>Facilitation prompts</h2>" +
        "<ul>" +
        "<li>&ldquo;Where might AI help us love our neighbors better? Where might it shortcut relationship?&rdquo;</li>" +
        "<li>&ldquo;What would embarrass us if it were published without human review?&rdquo;</li>" +
        "<li>&ldquo;Whose voice is most at risk of being erased or mimicked?&rdquo;</li>" +
        "</ul>" +
        "<h2>Preview the Concerns Register</h2>" +
        "<p>Show the minimum columns (see Reference appendix): plain concern, category, severity, likelihood, mitigation, gap, owner, review date. Assign a <strong>scribe</strong> to capture raw notes without resolving everything today.</p>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> <strong>Assumptions Map</strong> — one page: two columns (Hopes / Fears) with clustered themes and three &ldquo;so what&rdquo; bullets for leadership.</div>",
    },
    {
      id: "w1s3",
      navGroup: "w1",
      title: "Session 3 — Charter workshop (Draft 1)",
      subtitle: "No-go list · disclosure · data classes",
      kicker: "Week 1 — Orientation",
      meta: "Suggested 60–90 minutes",
      html:
        "<p>The <strong>Team AI Charter (Draft 1)</strong> is your boundary document for the course period. It is not final policy; it is <strong>shared clarity</strong> so experiments stay inside defensible risk.</p>" +
        "<h2>Charter sections to draft today</h2>" +
        "<ol>" +
        "<li><strong>Mission anchor</strong> — one paragraph: why your organization exists; how AI use must serve that (not generic efficiency theater).</li>" +
        "<li><strong>Approved scope for this pilot</strong> — task types allowed (e.g. internal drafts, public-domain sources only).</li>" +
        "<li><strong>No-go list for the course period</strong> — e.g. donor PII, client notes, minors&rsquo; data, pastoral counseling transcripts, unpublished grant budgets — be specific.</li>" +
        "<li><strong>Disclosure defaults</strong> — when staff must label AI assistance; what &ldquo;human accountable&rdquo; means for external comms.</li>" +
        "<li><strong>Data classes</strong> — public / internal / sensitive / regulated. Rule: sensitive+ does not enter unapproved tools.</li>" +
        "<li><strong>Experiment approval path</strong> — who must sign off before a new task type or tool.</li>" +
        "</ol>" +
        "<h2>Read map (assign by role)</h2>" +
        "<ul>" +
        "<li><code>_docs/_imported/02-maturity-model/ai-maturity-model-ch7.md</code> — experimentation as hinge to discernment.</li>" +
        "<li><code>_docs/_imported/03-governance-ethics/ai-governance-guide.md</code> — board stance, inventory-before-policy.</li>" +
        "<li><code>_docs/_imported/03-governance-ethics/vim-framework.md</code> — Vision / Intention / Means alignment.</li>" +
        "</ul>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> <strong>Team AI Charter (Draft 1)</strong> — sponsor named; scribe circulates PDF within 48 hours.</div>",
    },
    {
      id: "w1-wrap",
      navGroup: "w1",
      title: "Week 1 — Deliverables & homework",
      subtitle: "Checklist · first SEP",
      kicker: "Week 1 — Wrap",
      meta: "Between sessions",
      html:
        "<h2>Deliverables (owners)</h2>" +
        "<table><thead><tr><th>Deliverable</th><th>Owner</th></tr></thead><tbody>" +
        "<tr><td>Assumptions Map</td><td>Facilitator + team</td></tr>" +
        "<tr><td>Team AI Charter (Draft 1)</td><td>Executive sponsor</td></tr>" +
        "<tr><td>Tool inventory (what people already use)</td><td>Operations liaison</td></tr>" +
        "<tr><td>First SEP experiment logs</td><td>Each participant</td></tr>" +
        "</tbody></table>" +
        "<h2>Homework (every participant)</h2>" +
        "<p>Complete <strong>one SEP-compliant</strong> low-stakes task — e.g. rewrite a newsletter paragraph, summarize a long public document, draft subject lines. <strong>No sensitive data.</strong> Log baseline time, assisted time, prompts, reviewer, and go/no-go. Use the SEP steps in Reference.</p>" +
        "<p><strong>Optional reading:</strong> <code>_docs/_imported/03-governance-ethics/ai-leadership-christian-nonprofits.md</code> for faith-based framing.</p>" +
        "<div class=\"callout\"><strong>Anti-pattern.</strong> Skipping baseline measurement — you cannot claim value without &ldquo;before AI&rdquo; numbers.</div>",
    },
  ]);
})();
