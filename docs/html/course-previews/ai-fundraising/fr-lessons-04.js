(function () {
  "use strict";
  window.COURSE_LESSONS = (window.COURSE_LESSONS || []).concat([
    {
      id: "w4m1",
      navGroup: "w4",
      title: "Module 1 — Pilot design",
      subtitle: "Hypothesis & ethics",
      kicker: "Week 4 — Pilot, measure, sustain",
      meta: "Suggested 90 minutes",
      html:
        "<p><strong>Theme:</strong> Shift from design to <strong>operating rhythm</strong>: 90-day pilot, honest metrics, board reporting, continuous improvement.</p>" +
        "<p>Define a <strong>pilot cohort</strong> (e.g. one region, one persona, one campaign). Pre-register success metrics that include <strong>relationship quality</strong>, not only revenue — <code>ai-fundraising-guide.md</code>, <code>ai-ethics-donor-intelligence.md</code>.</p>" +
        "<h2>Include</h2>" +
        "<ul>" +
        "<li>Hypothesis, scope, exclusions</li>" +
        "<li>Ethical review — rubric-style thinking from ethics doc</li>" +
        "<li>What happens if results disappoint</li>" +
        "</ul>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> <strong>90-day pilot charter</strong> — VP Development.</div>",
    },
    {
      id: "w4m2",
      navGroup: "w4",
      title: "Module 2 — Metrics that matter",
      subtitle: "Pipeline & stewardship",
      kicker: "Week 4 — Pilot, measure, sustain",
      meta: "Suggested 90 minutes",
      html:
        "<p>Balance conversion metrics with stewardship indicators — <code>donor-expected-value.md</code>, <code>donor-conversion-modifiers.md</code>. Leading vs. lagging indicators; retention by segment.</p>" +
        "<h2>Ethical KPI</h2>" +
        "<p>Track <strong>policy violations</strong> (near-miss PII misuse) — target zero with training.</p>" +
        "<div class=\"callout\"><strong>Anti-pattern.</strong> Moving goalposts after the pilot starts.</div>",
    },
    {
      id: "w4m3",
      navGroup: "w4",
      title: "Module 3 — Board reporting pack",
      subtitle: "One slide each",
      kicker: "Week 4 — Pilot, measure, sustain",
      meta: "Suggested 60 minutes",
      html:
        "<p>Build a repeatable <strong>board slide</strong>: stance, inventory, pilot results, risks, next quarter — tie to <code>ai-governance-guide.md</code> annual review expectations.</p>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> <strong>Board report template</strong> (quarterly) — CEO + VP Development.</div>",
    },
    {
      id: "w4m4",
      navGroup: "w4",
      title: "Module 4 — Retrospective",
      subtitle: "Scale · stop · clean data",
      kicker: "Week 4 — Pilot, measure, sustain",
      meta: "Suggested 90 minutes",
      html:
        "<p>Honest retrospective: what to scale, what to stop, what data to clean next. Document <strong>lessons and incidents</strong> and update policy.</p>" +
        "<h2>Outputs</h2>" +
        "<ul>" +
        "<li>Updated AI inventory if pilot introduced tools</li>" +
        "<li>Knowledge base links: SOPs, approved prompt templates</li>" +
        "</ul>",
    },
    {
      id: "w4m5",
      navGroup: "w4",
      title: "Module 5 — Graduation criteria",
      subtitle: "Pilot → BAU",
      kicker: "Week 4 — Pilot, measure, sustain",
      meta: "Suggested 60 minutes",
      html:
        "<p>When does the pilot become &ldquo;how we work&rdquo;? Criteria: pre-registered metrics reviewed; playbook and owners stable; board confidence; no open critical gaps in Concerns-style register for fundraising AI.</p>" +
        "<h2>Training cascade</h2>" +
        "<p>Align to org comms: managers, volunteers, board — plain language on disclosure and escalation.</p>" +
        "<div class=\"callout deliverable\"><strong>Deliverables.</strong> <strong>Weekly operating cadence</strong> doc + <strong>knowledge base</strong> index — Development team + Ops.</div>",
    },
    {
      id: "w4-wrap",
      navGroup: "w4",
      title: "Week 4 — Exit checklist",
      subtitle: "Final artifacts",
      kicker: "Week 4 — Wrap",
      meta: "Program completion",
      html:
        "<h2>Deliverables (exit)</h2>" +
        "<ul>" +
        "<li>90-day pilot charter + results review</li>" +
        "<li>Board report template in use</li>" +
        "<li>Updated stance / inventory if tools changed</li>" +
        "<li>Knowledge base with SOPs and approved prompts</li>" +
        "</ul>" +
        "<h2>Success criteria</h2>" +
        "<ul>" +
        "<li>Pilot has <strong>pre-registered metrics</strong>; results reviewed without moving goalposts.</li>" +
        "<li><strong>Next quarter decisions</strong> explicit: scale, iterate, or pause.</li>" +
        "</ul>" +
        "<h2>Read map</h2>" +
        "<p><code>ai-fundraising-guide.md</code>, <code>ai-ethics-donor-intelligence.md</code>, <code>trailguide-business-architecture.md</code>, <code>_docs/_imported/README.md</code> for technical references.</p>",
    },
    {
      id: "crosscut",
      navGroup: "more",
      title: "Cross-cutting requirements",
      subtitle: "All four weeks",
      kicker: "Reference",
      meta: "Non-negotiables",
      html:
        "<table><thead><tr><th>Requirement</th><th>Implementation</th></tr></thead><tbody>" +
        "<tr><td>Human-in-the-loop</td><td>No donor-facing AI output without named human approval.</td></tr>" +
        "<tr><td>PII discipline</td><td>No donor PII in unapproved tools; inventory exceptions.</td></tr>" +
        "<tr><td>Mission alignment</td><td>Affinity weighted in scoring; no wealth-only prospecting without values fit.</td></tr>" +
        "<tr><td>Transparency</td><td>Donor-facing answer ready if asked; internal board scripts.</td></tr>" +
        "<tr><td>Youth / vulnerable</td><td>Hard walls on data and AI decisions if org serves minors or sensitive populations.</td></tr>" +
        "</tbody></table>",
    },
    {
      id: "rhythm",
      navGroup: "more",
      title: "Suggested weekly rhythm",
      subtitle: "Mon–Fri pattern",
      kicker: "Reference",
      meta: "Facilitation",
      html:
        "<table><thead><tr><th>Day</th><th>Focus</th></tr></thead><tbody>" +
        "<tr><td>Mon</td><td>Facilitated module + reading</td></tr>" +
        "<tr><td>Tue</td><td>Hands-on lab (scoring, segmentation, connection data)</td></tr>" +
        "<tr><td>Wed</td><td>Cross-functional sync (dev + ops + programs)</td></tr>" +
        "<tr><td>Thu</td><td>Deliverable drafting</td></tr>" +
        "<tr><td>Fri</td><td>Short retrospective + next week prep</td></tr>" +
        "</tbody></table>",
    },
    {
      id: "extensions",
      navGroup: "more",
      title: "Optional extensions (post–Week 4)",
      subtitle: "Stretch goals",
      kicker: "Reference",
      meta: "After graduation",
      html:
        "<ul>" +
        "<li><strong>Content authority:</strong> E-E-A-T-style discipline for campaign copy — <code>05-training-experimentation/eeat-guide-template.md</code></li>" +
        "<li><strong>Maturity alignment:</strong> Map org AI maturity — <code>ai-maturity-model-ch7.md</code>, <code>content-scoring-rubric.md</code></li>" +
        "<li><strong>Technical track:</strong> API-level enrichment and dashboards — see <code>_docs/_imported/README.md</code></li>" +
        "</ul>" +
        "<div class=\"callout\"><strong>Scope boundary.</strong> This course does not replace legal counsel for regulated data (HIPAA/FERPA, etc.).</div>",
    },
    {
      id: "sources",
      navGroup: "more",
      title: "Source index & document control",
      subtitle: "Repository paths",
      kicker: "Reference",
      meta: "Appendix",
      html:
        "<p><strong>Primary outline:</strong> <code>_docs/ai-powered-fundraising-implementation-4-week-course-outline.md</code></p>" +
        "<p><strong>Publishable companion:</strong> <code>_docs/publishable/08-ai-powered-fundraising-system-4-week-course-outline.md</code></p>" +
        "<p><strong>Fundraising corpus:</strong> <code>_docs/_imported/04-fundraising/</code> — scoring, segmentation, personas, cultivation, connection mapping, AI fundraising guide, case for support, ideal donor profile, expected value, conversion modifiers.</p>" +
        "<p><strong>Governance &amp; ethics:</strong> <code>_docs/_imported/03-governance-ethics/</code> — governance guide, leadership briefs, ethics of donor intelligence, VIM, youth formation where applicable.</p>" +
        "<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody>" +
        "<tr><td>Repository</td><td>movemental-ai-site</td></tr>" +
        "<tr><td>Type</td><td>Course outline (implementation); not legal advice</td></tr>" +
        "</tbody></table>",
    },
  ]);
})();
