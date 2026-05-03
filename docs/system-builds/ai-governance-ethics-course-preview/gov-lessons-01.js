(function () {
  "use strict";
  window.COURSE_LESSONS = (window.COURSE_LESSONS || []).concat([
    {
      id: "intro",
      navGroup: "start",
      title: "Welcome",
      subtitle: "Promise & pedagogy",
      kicker: "Declaring Our AI",
      h1: "Declaring Our AI",
      meta: "4-week cohort · ~90 min/week · Board-ready output",
      html:
        "<p><strong>Subtitle:</strong> Articulating, declaring, and codifying your organization&rsquo;s governance, ethics, and principles for AI.</p>" +
        "<p><strong>Audience:</strong> Non-profit executive teams, board members, ministry leaders, and organizational decision-makers. <strong>Cohort size:</strong> 8–15 participants (ideally 2–3 per organization). <strong>Prerequisite:</strong> None.</p>" +
        "<p><strong>Source outline:</strong> <code>_docs/courses/ai-governance-ethics-course-outline.md</code></p>" +
        "<h2>Course promise</h2>" +
        "<p>By the end of four weeks, your organization will have a <strong>board-ready AI governance document</strong> — not theory, but a living policy grounded in mission, values, and operational reality. You will know where AI may serve your work, where it must not go, who owns what, and how to answer donors, accreditors, and staff with one clear voice.</p>" +
        "<h2>Why this course exists</h2>" +
        "<p>Most non-profits are not in danger of adopting AI recklessly. They are in danger of <strong>not deciding at all</strong> — and letting ad hoc, ungoverned use fill the vacuum. Governance is <strong>stewardship</strong>: it protects who you are, whom you serve, and the trust you hold.</p>" +
        "<h2>Pedagogical approach (Four Necessities)</h2>" +
        "<ul>" +
        "<li><strong>Dissonance</strong> — Each week opens with a tension between &ldquo;we should have a policy&rdquo; and actually having one.</li>" +
        "<li><strong>Action</strong> — Inventories, drafts, role assignments happen during the course.</li>" +
        "<li><strong>Reflection</strong> — Integration questions tie governance to mission and identity.</li>" +
        "<li><strong>Community</strong> — Cohort processing across organizations.</li>" +
        "</ul>" +
        "<div class=\"callout\"><strong>Output.</strong> Not a certificate — a <strong>document your board can adopt</strong>.</div>",
    },
    {
      id: "w0",
      navGroup: "start",
      title: "Week 0 — Pre-work",
      subtitle: "~30 minutes asynchronous",
      kicker: "Pre-work",
      meta: "Before Week 1",
      html:
        "<p><strong>Purpose:</strong> Honest placement before the first session. No one walks in pretending.</p>" +
        "<h2>1. AI maturity self-assessment</h2>" +
        "<p>Each participant locates themselves and their organization on the five-level model: Awareness → Experimentation → Adoption → Integration → Leadership (<code>ai-maturity-model-ch7.md</code>). No shame in Level 1. Honesty is the prerequisite.</p>" +
        "<h2>2. Shadow inventory</h2>" +
        "<ul>" +
        "<li>What AI tools do <em>you</em> personally use (even casually)?</li>" +
        "<li>What AI tools do you know or suspect staff in your area use?</li>" +
        "<li>Has anyone ever asked &ldquo;what&rsquo;s our position on AI?&rdquo; — and what happened?</li>" +
        "</ul>" +
        "<h2>3. Values pull</h2>" +
        "<p>Bring mission statement, values statement, and any technology or ethics policies. If you lack written values, bring what you would say if someone asked what your organization stands for.</p>" +
        "<div class=\"callout deliverable\"><strong>Bring to Week 1:</strong> completed pre-work notes + values materials.</div>",
    },
    {
      id: "w1p1",
      navGroup: "w1",
      title: "Week 1 — Dissonance & teaching",
      subtitle: "Why the board owns this",
      kicker: "Week 1 — Governance foundations",
      meta: "Opening ~40 min",
      html:
        "<p><strong>Theme:</strong> Governance is not about technology. It is about stewardship of mission.</p>" +
        "<h2>Opening dissonance (15 min)</h2>" +
        "<p><strong>Scenario:</strong> A staff member at a youth-serving non-profit pastes de-identified but sensitive program notes into a public AI tool to summarize themes for a grant report. The provider&rsquo;s terms allow training on inputs. No policy exists. The ED learns months later when a board member asks after a conference demo: &ldquo;Are we doing this?&rdquo;</p>" +
        "<p><strong>Discussion:</strong> What went wrong? (Not only the staff member — the <strong>system</strong>: no policy, no ownership, no boundaries. Reasonable choices happen in a vacuum.)</p>" +
        "<h2>Core teaching (25 min)</h2>" +
        "<p><strong>Why governance comes first:</strong></p>" +
        "<ul>" +
        "<li>Without board-level stance, staff make ad hoc choices that may conflict with mission.</li>" +
        "<li>Donors and accreditors increasingly expect a stated position.</li>" +
        "<li>Having &ldquo;nothing&rdquo; is a growing liability — ungoverned use erodes trust.</li>" +
        "<li>Governance says: <em>our mission is not negotiable; technology serves it or does not enter.</em></li>" +
        "</ul>" +
        "<p><strong>Minimum viable policy must cover:</strong> (1) Scope and limits (2) Ownership and approval (3) Vulnerable populations (4) Documentation/inventory.</p>" +
        "<p><strong>Ordering principle:</strong> Governance &amp; safety → efficiency → revenue → quality. You cannot responsibly pursue later stages without earlier ones.</p>" +
        "<p><strong>One owner per area:</strong> Programs, fundraising, content, operations, formation — each needs a named person for AI use. The board adopts the framework; the executive team executes; area owners enforce.</p>" +
        "<div class=\"callout\"><strong>Sources:</strong> <code>ai-governance-guide.md</code>, <code>ai-core-leadership-briefs.md</code>, <code>ai-leadership-christian-nonprofits.md</code></div>",
    },
    {
      id: "w1p2",
      navGroup: "w1",
      title: "Week 1 — In-session action",
      subtitle: "Inventory & values test",
      kicker: "Week 1 — Governance foundations",
      meta: "Action ~20 min",
      html:
        "<h2>Exercise 1: The inventory</h2>" +
        "<p>From Shadow Inventory pre-work, complete a structured table:</p>" +
        "<table><thead><tr><th>Area</th><th>Current AI use</th><th>Planned/desired</th><th>Who uses</th><th>Who approved</th><th>Touches vulnerable populations?</th></tr></thead><tbody>" +
        "<tr><td>Administration</td><td></td><td></td><td></td><td></td><td></td></tr>" +
        "<tr><td>Fundraising</td><td></td><td></td><td></td><td></td><td></td></tr>" +
        "<tr><td>Communications</td><td></td><td></td><td></td><td></td><td></td></tr>" +
        "<tr><td>Programs/Ministry</td><td></td><td></td><td></td><td></td><td></td></tr>" +
        "<tr><td>Content/Curriculum</td><td></td><td></td><td></td><td></td><td></td></tr>" +
        "<tr><td>HR/Internal</td><td></td><td></td><td></td><td></td><td></td></tr>" +
        "</tbody></table>" +
        "<p><strong>Key insight:</strong> Most orgs discover AI is already in use — without governance. The inventory makes the invisible visible.</p>" +
        "<h2>Exercise 2: The values test</h2>" +
        "<p>For each organizational value, complete: &ldquo;Our commitment to [value] means that AI in our organization must / must never…&rdquo;</p>" +
        "<p><em>Example:</em> &ldquo;Our commitment to community means that AI must never replace the human relationships through which formation happens.&rdquo;</p>",
    },
    {
      id: "w1p3",
      navGroup: "w1",
      title: "Week 1 — Reflection & homework",
      subtitle: "Cohort + take-home",
      kicker: "Week 1 — Governance foundations",
      meta: "Close ~50 min",
      html:
        "<h2>Reflection (10 min, journaled)</h2>" +
        "<ol>" +
        "<li>What surprised you about your inventory?</li>" +
        "<li>Where is the gap between stated values and current (or absent) AI governance?</li>" +
        "<li>If your largest donor asked tomorrow &ldquo;what&rsquo;s your position on AI?&rdquo; — what would you say? What do you wish you could say?</li>" +
        "</ol>" +
        "<h2>Cohort discussion (20 min)</h2>" +
        "<p>Each organization shares one inventory finding and one values-test sentence. Name common gaps. <strong>Facilitator line:</strong> The absence of policy is itself a policy — it just says &ldquo;anything goes.&rdquo;</p>" +
        "<h2>Take-home</h2>" +
        "<ol>" +
        "<li>Complete the full inventory with input from at least one colleague who was not in the session.</li>" +
        "<li>Draft a <strong>one-paragraph AI stance</strong> (3–5 sentences: what AI is for, what it is not for, who owns it). Bring to Week 2.</li>" +
        "</ol>",
    },
  ]);
})();
