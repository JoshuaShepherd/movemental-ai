(function () {
  "use strict";
  window.COURSE_LESSONS = (window.COURSE_LESSONS || []).concat([
    {
      id: "intro",
      navGroup: "start",
      title: "Welcome",
      subtitle: "System overview & principles",
      kicker: "AI-powered fundraising",
      h1: "AI-Powered Fundraising System",
      meta: "4-week implementation · Human-centered · Preview",
      html:
        "<p><strong>Audience:</strong> Non-profit executive teams, development directors, board members in advancement, and operations/IT stakeholders who must govern data and tools.</p>" +
        "<p><strong>Purpose:</strong> Move from zero to <strong>operating</strong> on an AI-assisted fundraising system: governed donor intelligence, scored prioritization, warm-relationship activation, human-in-the-loop communications, and measurable stewardship — without trading trust for throughput.</p>" +
        "<p><strong>Source outline:</strong> <code>_docs/ai-powered-fundraising-implementation-4-week-course-outline.md</code>. Extended session detail also appears in <code>_docs/publishable/08-ai-powered-fundraising-system-4-week-course-outline.md</code>.</p>" +
        "<h2>What the system includes</h2>" +
        "<ol>" +
        "<li><strong>Single narrative spine</strong> — Case for support and messaging guide as the anchor for every AI-assisted draft.</li>" +
        "<li><strong>Governed intelligence</strong> — Research and enrichment with approved tools and data classes; no raw PII in consumer chatbots.</li>" +
        "<li><strong>Scoring &amp; segmentation</strong> — Composite scores, personas, lifecycle, segment-specific plays.</li>" +
        "<li><strong>Connection mapping</strong> — Org-side network matched to prospects for warm introductions.</li>" +
        "<li><strong>Human-in-the-loop comms</strong> — AI drafts; humans edit, personalize, approve every donor-facing message.</li>" +
        "<li><strong>Measurement</strong> — Expected value, conversion modifiers, pipeline metrics, relationship-quality indicators.</li>" +
        "</ol>" +
        "<h2>Design principles (from internal corpus)</h2>" +
        "<ul>" +
        "<li><strong>Governance before tooling</strong> — Board-owned stance; clear domain owners.</li>" +
        "<li><strong>Ethics at scale</strong> — Donor intelligence carries upside and moral risk; explicit ethical framing.</li>" +
        "<li><strong>Relationship over automation</strong> — AI prioritizes and drafts; humans qualify, cultivate, approve.</li>" +
        "<li><strong>Single source of truth</strong> — Case for support, messaging guide, ideal donor profile anchor segmentation.</li>" +
        "<li><strong>System architecture</strong> — Prospect universe + org network + connection matching + scored outputs.</li>" +
        "</ul>" +
        "<div class=\"callout\"><strong>Related courses.</strong> Pair with the general AI adoption course (<code>publishable/07</code>) or the safe experimentation course if your org still needs charter and SEP discipline.</div>",
    },
    {
      id: "w0-prereqs",
      navGroup: "start",
      title: "Week 0 — Prerequisites",
      subtitle: "Before Week 1",
      kicker: "Week 0",
      meta: "Sign-off checklist",
      html:
        "<p>Complete or explicitly <strong>waive</strong> each item with leadership sign-off. Lean teams may compress timelines but should not skip governance awareness.</p>" +
        "<table><thead><tr><th>Prerequisite</th><th>Outcome</th></tr></thead><tbody>" +
        "<tr><td>Team AI Charter (or equivalent)</td><td>Written boundaries on data, disclosure, review, approved tools.</td></tr>" +
        "<tr><td>Fundraising AI owner</td><td>Named person accountable for donor-facing AI use.</td></tr>" +
        "<tr><td>CRM reality check</td><td>Know where donor data lives, who can export, what fields exist.</td></tr>" +
        "<tr><td>Stakeholder alignment</td><td>Board or governance committee aware that donor intelligence and connection mapping will be discussed.</td></tr>" +
        "</tbody></table>" +
        "<p><strong>Optional:</strong> Use the Kairos-style recognition flow on Movemental resources if you want shared language for team stress points before adding fundraising workload.</p>" +
        "<div class=\"callout deliverable\"><strong>Exit.</strong> Sponsor confirms prerequisites met or waived in writing.</div>",
    },
    {
      id: "w1m1",
      navGroup: "w1",
      title: "Module 1 — Executive framing",
      subtitle: "Why governance, not demos",
      kicker: "Week 1 — Align, govern, anchor",
      meta: "Suggested 90 minutes",
      html:
        "<p><strong>Theme:</strong> Without shared stance and a crisp case for support, AI amplifies confusion. Week 1 builds the governance and messaging spine.</p>" +
        "<h2>Learning goals</h2>" +
        "<ul>" +
        "<li>Frame AI in fundraising as a <strong>governance and trust</strong> topic — not a vendor parade.</li>" +
        "<li>Introduce ordered adoption: efficiency → revenue enablement → quality → ethics — without skipping ethics.</li>" +
        "<li>Connect to <code>ai-leadership-christian-nonprofits.md</code> where faith-based context applies.</li>" +
        "</ul>" +
        "<h2>Agenda</h2>" +
        "<ol>" +
        "<li>Current state: tools already in use (inventory preview).</li>" +
        "<li>Where AI helps: drafting, summarization, research briefs, segmentation logic — with humans accountable.</li>" +
        "<li>Where AI harms: false certainty, surveillance creep, unreviewed donor sends, mission drift.</li>" +
        "<li>Decision: Week 1 selects <strong>rules and owners</strong>, not new vendors.</li>" +
        "</ol>" +
        "<div class=\"callout deliverable\"><strong>Exit ticket.</strong> Sponsor states one sentence: &ldquo;We will not use AI for ___ until policy says otherwise.&rdquo;</div>",
    },
    {
      id: "w1m2",
      navGroup: "w1",
      title: "Module 2 — Board-ready AI stance",
      subtitle: "Workshop",
      kicker: "Week 1 — Align, govern, anchor",
      meta: "Suggested 120 minutes",
      html:
        "<p>Facilitated workshop using <code>ai-governance-guide.md</code>: scope, no-go zones, owners, annual review cadence.</p>" +
        "<h2>Cover in Draft 1</h2>" +
        "<ul>" +
        "<li>Who approves donor emails, appeals, major-gift proposals?</li>" +
        "<li>What data classes may enter which tool classes?</li>" +
        "<li>Youth / vulnerable populations — hard walls if applicable.</li>" +
        "<li>Escalation when someone wants a new workflow or tool.</li>" +
        "</ul>" +
        "<h2>Roles (explicit)</h2>" +
        "<p>Development/marketing for donor comms; operations for inventory; programs for boundaries on formation-adjacent data — per <code>ai-core-leadership-briefs.md</code>.</p>" +
        "<div class=\"callout deliverable\"><strong>Output.</strong> One-page <strong>AI stance</strong> (board-ready) — CEO + board chair owners.</div>",
    },
    {
      id: "w1m3",
      navGroup: "w1",
      title: "Module 3 — Donor ethics primer",
      subtitle: "Wealth lists & transparency",
      kicker: "Week 1 — Align, govern, anchor",
      meta: "Suggested 90 minutes",
      html:
        "<p>Walk <code>ai-ethics-donor-intelligence.md</code> (at least Part I–II): public vs. sensitive data, transparency with donors, &ldquo;wealth list&rdquo; risks, when mass OSINT is and is not appropriate.</p>" +
        "<h2>Discussion prompts</h2>" +
        "<ul>" +
        "<li>What would damage trust if donors discovered how we researched prospects?</li>" +
        "<li>Where does mission alignment filter capacity-only scoring?</li>" +
        "</ul>" +
        "<div class=\"callout dissonance\"><strong>Guardrail.</strong> Ethics at scale is not optional — donor intelligence has financial upside and moral risk.</div>",
    },
    {
      id: "w1m4",
      navGroup: "w1",
      title: "Module 4 — Messaging anchor",
      subtitle: "Case for support & ideal donor",
      kicker: "Week 1 — Align, govern, anchor",
      meta: "Suggested 90 minutes",
      html:
        "<p>Lock <strong>case for support</strong> and <strong>ideal donor profile</strong> as non-negotiable inputs to any AI-assisted copy or scoring — <code>case-for-support.md</code>, <code>ideal-donor-profile.md</code>. Align VIM (Vision / Intention / Means) using <code>vim-framework.md</code>.</p>" +
        "<h2>Exercise</h2>" +
        "<p>Extract five &ldquo;never contradict&rdquo; claims that every appeal, briefing, and prompt context must honor.</p>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> Excerpt list: 5 claims + one-page message hierarchy for VP Development.</div>",
    },
    {
      id: "w1m5",
      navGroup: "w1",
      title: "Module 5 — Fundraising AI rules in practice",
      subtitle: "Ten-rule pattern",
      kicker: "Week 1 — Align, govern, anchor",
      meta: "Suggested 60 minutes",
      html:
        "<p>Teach the <strong>ten-rule pattern</strong> from <code>ai-fundraising-guide.md</code>: governance, PII boundaries, human review, transparency, ownership — applied to appeals, research, segmentation.</p>" +
        "<h2>Hands-on</h2>" +
        "<p>Take one sample appeal paragraph; run it through the rules checklist as a group. Mark violations and fixes.</p>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> <strong>Transparency script</strong> for donors who ask about AI (2–3 sentences) — VP Development.</div>",
    },
    {
      id: "w1-wrap",
      navGroup: "w1",
      title: "Week 1 — Deliverables & read map",
      subtitle: "Success check",
      kicker: "Week 1 — Wrap",
      meta: "Checklist",
      html:
        "<h2>Deliverables</h2>" +
        "<table><thead><tr><th>Artifact</th><th>Owner</th></tr></thead><tbody>" +
        "<tr><td>One-page AI stance (board-ready)</td><td>CEO + board chair</td></tr>" +
        "<tr><td>Domain owners named</td><td>CEO</td></tr>" +
        "<tr><td>Inventory of current AI tools and uses</td><td>COO / operations</td></tr>" +
        "<tr><td>Case for support: 5 &ldquo;never contradict&rdquo; claims</td><td>VP Development</td></tr>" +
        "<tr><td>Transparency script for donors</td><td>VP Development</td></tr>" +
        "</tbody></table>" +
        "<h2>Success criteria</h2>" +
        "<ul>" +
        "<li>Board can answer: What is out of bounds? Who approves donor emails? Where does youth or vulnerable data never go?</li>" +
        "<li><strong>No tool vendors selected in Week 1</strong> — only rules and owners.</li>" +
        "</ul>" +
        "<h2>Read map</h2>" +
        "<p><code>ai-governance-guide.md</code>, <code>ai-core-leadership-briefs.md</code>, <code>ai-ethics-donor-intelligence.md</code> (Part I–II), <code>ai-fundraising-guide.md</code>, <code>case-for-support.md</code>, <code>ideal-donor-profile.md</code>, <code>vim-framework.md</code> — paths under <code>_docs/_imported/</code> as in the source outline.</p>",
    },
  ]);
})();
