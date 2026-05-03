(function () {
  "use strict";
  window.COURSE_LESSONS = (window.COURSE_LESSONS || []).concat([
    {
      id: "w2m1",
      navGroup: "w2",
      title: "Module 1 — Scoring lab",
      subtitle: "Four dimensions · calibration",
      kicker: "Week 2 — Score, segment, portfolio",
      meta: "Suggested 120 minutes",
      html:
        "<p><strong>Theme:</strong> Turn the donor file from a list into a <strong>prioritized portfolio</strong>: capacity, affinity, engagement, and behavioral signals — documented so humans and tools share logic.</p>" +
        "<h2>Learning goals</h2>" +
        "<ul>" +
        "<li>Apply the <strong>four-dimension model</strong> with partial data; document gaps honestly (<code>donor-scoring-rubric.md</code>).</li>" +
        "<li>Calibrate <strong>inter-rater reliability</strong> — two staff should score within defined tolerance or escalate.</li>" +
        "</ul>" +
        "<h2>Lab flow</h2>" +
        "<ol>" +
        "<li>Score 10 real or anonymized records individually.</li>" +
        "<li>Compare results; discuss variance drivers.</li>" +
        "<li>Agree on tie-break rules and escalation to leadership.</li>" +
        "</ol>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> <strong>Scoring worksheet</strong> or CRM blueprint with four dimensions — Director of Advancement.</div>",
    },
    {
      id: "w2m2",
      navGroup: "w2",
      title: "Module 2 — Personas & messaging hooks",
      subtitle: "Prompt context for AI",
      kicker: "Week 2 — Score, segment, portfolio",
      meta: "Suggested 90 minutes",
      html:
        "<p>Map personas to program affinity and tone; ensure future AI prompts cite <strong>persona + score band</strong> — <code>donor-personas.md</code>.</p>" +
        "<h2>Exercise</h2>" +
        "<p>For each primary persona: three messaging hooks drawn from case for support; one anti-example (&ldquo;we never sound like this&rdquo;).</p>" +
        "<div class=\"callout\"><strong>Link to quality.</strong> Optional depth: <code>copy-scoring-rubric.md</code> for work-quality dimension scoring.</div>",
    },
    {
      id: "w2m3",
      navGroup: "w2",
      title: "Module 3 — Segmentation working session",
      subtitle: "Matrix & appeals",
      kicker: "Week 2 — Score, segment, portfolio",
      meta: "Suggested 90 minutes",
      html:
        "<p>Build a first <strong>segment matrix</strong> for appeals: year-end, recurring, major gift, lapsed — <code>donor-segmentation.md</code>. Each segment gets primary channel and owner.</p>" +
        "<h2>Outputs</h2>" +
        "<ul>" +
        "<li>Score band × persona × lifecycle grid</li>" +
        "<li>Primary owner per segment</li>" +
        "<li>Primary channel (mail, email, call, event)</li>" +
        "</ul>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> Documented <strong>segment definitions</strong> — Development + comms.</div>",
    },
    {
      id: "w2m4",
      navGroup: "w2",
      title: "Module 4 — Conversion modifiers",
      subtitle: "Next-quarter tactics",
      kicker: "Week 2 — Score, segment, portfolio",
      meta: "Suggested 60 minutes",
      html:
        "<p>Select 3–5 practical tactics the team will actually use next quarter — <code>donor-conversion-modifiers.md</code>. Avoid theoretical lists; tie each tactic to a segment.</p>" +
        "<h2>Connect to EV</h2>" +
        "<p>Introduce <strong>expected value</strong> thinking for resourcing — <code>donor-expected-value.md</code>: where major-gift time pays off vs. mass appeal.</p>",
    },
    {
      id: "w2m5",
      navGroup: "w2",
      title: "Module 5 — CRM / data readiness",
      subtitle: "Checklist",
      kicker: "Week 2 — Score, segment, portfolio",
      meta: "Suggested 90 minutes",
      html:
        "<p>Required fields, hygiene, deduplication, consent flags. Connect to Week 1 governance stance. Document <strong>what may enter approved AI systems</strong> and what never leaves controlled environments.</p>" +
        "<h2>Data dictionary minimum</h2>" +
        "<p>Field name, source system, PII classification, allowed downstream systems — owners from Ops + IT.</p>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> <strong>Data dictionary</strong> v1 + <strong>portfolio tiers</strong> (hours per week: Platinum/Gold vs. mass) — VP Development.</div>",
    },
    {
      id: "w2-wrap",
      navGroup: "w2",
      title: "Week 2 — Deliverables & success",
      subtitle: "Wrap",
      kicker: "Week 2 — Wrap",
      meta: "Checklist",
      html:
        "<h2>Deliverables</h2>" +
        "<table><thead><tr><th>Artifact</th><th>Owner</th></tr></thead><tbody>" +
        "<tr><td>Scoring worksheet / CRM blueprint</td><td>Dir. Advancement</td></tr>" +
        "<tr><td>Segment definitions</td><td>Development + comms</td></tr>" +
        "<tr><td>Data dictionary</td><td>Ops + IT</td></tr>" +
        "<tr><td>Portfolio time allocation by tier</td><td>VP Development</td></tr>" +
        "</tbody></table>" +
        "<h2>Success criteria</h2>" +
        "<ul>" +
        "<li>Two staff score the same prospect within <strong>defined tolerance</strong> or escalate.</li>" +
        "<li>Every segment has <strong>primary owner</strong> and <strong>primary channel</strong>.</li>" +
        "</ul>" +
        "<h2>Read map</h2>" +
        "<p><code>donor-scoring-rubric.md</code>, <code>donor-segmentation.md</code>, <code>donor-personas.md</code>, <code>donor-expected-value.md</code>, <code>donor-conversion-modifiers.md</code> — under <code>_docs/_imported/04-fundraising/</code>.</p>",
    },
  ]);
})();
