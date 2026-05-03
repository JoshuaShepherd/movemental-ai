(function () {
  "use strict";
  window.COURSE_LESSONS = (window.COURSE_LESSONS || []).concat([
    {
      id: "w3m1",
      navGroup: "w3",
      title: "Module 1 — Connection mapping overview",
      subtitle: "Org-side network",
      kicker: "Week 3 — Intelligence & workflows",
      meta: "Suggested 90 minutes",
      html:
        "<p><strong>Theme:</strong> Move from &ldquo;who is on the list?&rdquo; to &ldquo;who already knows us?&rdquo; and &ldquo;what is the next best touch?&rdquo;</p>" +
        "<p>Teach the <strong>two-map</strong> model: prospect universe × relationship network — <code>connection-mapping-playbook.md</code>. Harvest insider lists (board, staff connectors, church partners, volunteers); normalize identifiers; fuzzy match; score connection strength; output prioritized connector–prospect pairs.</p>" +
        "<h2>Governance</h2>" +
        "<p>Exports and insider data require consent and internal-use policy. No surprise mining.</p>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> <strong>Insider network harvest plan</strong> — who to ask, file format, timeline — Board chair + VP Dev.</div>",
    },
    {
      id: "w3m2",
      navGroup: "w3",
      title: "Module 2 — Governance checkpoint",
      subtitle: "Exports & consent",
      kicker: "Week 3 — Intelligence & workflows",
      meta: "Suggested 60 minutes",
      html:
        "<p>Board/staff cooperation for LinkedIn or network exports; <strong>show results before acting</strong> on sensitive matches. Align with playbook &ldquo;governance moments.&rdquo;</p>" +
        "<h2>Outputs</h2>" +
        "<ul>" +
        "<li>Written policy for connector outreach (who asks, how asks are framed).</li>" +
        "<li>Escalation if a match implies non-public information.</li>" +
        "</ul>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> <strong>Connection match runbook</strong> — steps, tools, quality checks — Advancement ops.</div>",
    },
    {
      id: "w3m3",
      navGroup: "w3",
      title: "Module 3 — Cultivation playbooks by band",
      subtitle: "Platinum / Gold / Silver",
      kicker: "Week 3 — Intelligence & workflows",
      meta: "Suggested 120 minutes",
      html:
        "<p>Translate score bands into realistic cadences for <em>your</em> team size — <code>donor-cultivation-guide.md</code>. Cover identify → qualify → cultivate → solicit → steward → upgrade.</p>" +
        "<h2>Exercise</h2>" +
        "<p>Build two example 90-day cultivation calendars for top bands — activities humans must do vs. what AI may draft.</p>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> <strong>Cultivation calendars</strong> for top two score bands — Major gift officer.</div>",
    },
    {
      id: "w3m4",
      navGroup: "w3",
      title: "Module 4 — AI workflow design",
      subtitle: "SOP & briefings",
      kicker: "Week 3 — Intelligence & workflows",
      meta: "Suggested 120 minutes",
      html:
        "<p>Design: research briefing template; appeal draft workflow (draft → edit against case for support → leader approval); thank-you SLAs — <code>ai-fundraising-guide.md</code>. <strong>No raw PII in consumer chatbots.</strong></p>" +
        "<h2>Human-in-the-loop</h2>" +
        "<p>Named reviewers; log every donor-facing send. Optional: <code>ai-digital-content-comms.md</code> for comms guardrails.</p>" +
        "<div class=\"callout deliverable\"><strong>Deliverables.</strong> <strong>AI workflow SOP</strong> (one page) + <strong>major-gift briefing template</strong> — VP Development / Sr. Dir. Advancement.</div>",
    },
    {
      id: "w3m5",
      navGroup: "w3",
      title: "Module 5 — Platform alignment (optional)",
      subtitle: "Movemental-class stack",
      kicker: "Week 3 — Intelligence & workflows",
      meta: "Suggested 60 minutes",
      html:
        "<p>If using a Movemental-class platform: where <strong>AI Lab</strong> supports research and voice-grounded drafting; where <strong>content library</strong> reinforces messaging — <code>_docs/_prompts/platform-product-demo-design.md</code>.</p>" +
        "<p>This session is optional for orgs not on the platform; use the time for extra cultivation or workflow rehearsal.</p>" +
        "<div class=\"callout\"><strong>Product context.</strong> TrailGuide / cohort training trajectory appears in <code>trailguide-business-architecture.md</code> for organizational tooling conversations.</div>",
    },
    {
      id: "w3-wrap",
      navGroup: "w3",
      title: "Week 3 — Deliverables & success",
      subtitle: "Wrap",
      kicker: "Week 3 — Wrap",
      meta: "Checklist",
      html:
        "<h2>Deliverables</h2>" +
        "<table><thead><tr><th>Artifact</th><th>Owner</th></tr></thead><tbody>" +
        "<tr><td>Insider network harvest plan</td><td>Board chair + VP Dev</td></tr>" +
        "<tr><td>Connection match runbook</td><td>Advancement ops</td></tr>" +
        "<tr><td>Cultivation calendars (top bands)</td><td>MGO</td></tr>" +
        "<tr><td>AI workflow SOP</td><td>VP Development</td></tr>" +
        "<tr><td>Briefing template</td><td>Sr. Dir. Advancement</td></tr>" +
        "</tbody></table>" +
        "<h2>Success criteria</h2>" +
        "<ul>" +
        "<li>At least <strong>one</strong> warm-introduction pathway executed with documented connector consent.</li>" +
        "<li><strong>Zero</strong> donor-facing sends without <strong>human approval</strong> logged.</li>" +
        "</ul>" +
        "<h2>Read map</h2>" +
        "<p><code>connection-mapping-playbook.md</code>, <code>donor-cultivation-guide.md</code>, <code>ai-fundraising-guide.md</code>; optional <code>ai-digital-content-comms.md</code>.</p>",
    },
  ]);
})();
