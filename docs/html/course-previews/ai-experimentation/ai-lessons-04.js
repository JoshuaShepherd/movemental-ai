(function () {
  "use strict";
  window.COURSE_LESSONS = (window.COURSE_LESSONS || []).concat([
    {
      id: "w4s1",
      navGroup: "w4",
      title: "Session 1 — Evidence review",
      subtitle: "Assumptions vs data · aggregate stats",
      kicker: "Week 4 — Integration",
      meta: "Suggested 60–90 minutes",
      html:
        "<p><strong>Theme:</strong> Turn experiments and concerns into <strong>operational clarity</strong> and a plan to train the wider organization without losing boundaries.</p>" +
        "<h2>Agenda</h2>" +
        "<ol>" +
        "<li><strong>Revisit Assumptions Map</strong> — What proved true? What proved naive?</li>" +
        "<li><strong>Compile experiment stats</strong> — mean time saved (where measured), quality deltas, reviewer hours.</li>" +
        "<li><strong>Reconcile with Concerns Register</strong> — did experiments surface new rows? Close resolved gaps?</li>" +
        "</ol>" +
        "<h2>Outputs</h2>" +
        "<p>For each task type: <strong>definite yes</strong> (scale with guardrails), <strong>iterate</strong> (needs prompt or policy work), <strong>not yet</strong> (risk or quality fail). No mushy &ldquo;pilot ongoing forever.&rdquo;</p>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> One-slide-per-task summary for leadership with metrics, not adjectives.</div>",
    },
    {
      id: "w4s2",
      navGroup: "w4",
      title: "Session 2 — Playbook drafting",
      subtitle: "Approved uses · escalation · review cadence",
      kicker: "Week 4 — Integration",
      meta: "Suggested 60–90 minutes",
      html:
        "<p>Produce <strong>AI Playbook v1</strong> — internal document staff can actually use. Mirror structure from <code>publishable/07-ai-adoption-for-nonprofits-course-outline.md</code> where helpful.</p>" +
        "<h2>Suggested sections</h2>" +
        "<ol>" +
        "<li><strong>Approved uses</strong> — bullet list with examples and tool classes.</li>" +
        "<li><strong>Boundaries</strong> — no-go data, no AI-only publish, escalation for exceptions.</li>" +
        "<li><strong>Policies</strong> — disclosure, data handling, review, new-use proposals.</li>" +
        "<li><strong>Concerns / open questions</strong> — pointer to Concerns Register.</li>" +
        "<li><strong>Review schedule</strong> — monthly team touchpoint; quarterly playbook update; annual board alignment.</li>" +
        "</ol>" +
        "<h2>Training cascade (minimum viable)</h2>" +
        "<table><thead><tr><th>Audience</th><th>Mechanism</th><th>Artifact</th></tr></thead><tbody>" +
        "<tr><td>All staff</td><td>30–45 min briefing + Q&amp;A</td><td>Slide summary + where to ask</td></tr>" +
        "<tr><td>Managers</td><td>Office hours + escalation</td><td>Manager one-pager</td></tr>" +
        "<tr><td>Volunteers</td><td>Plain-language sheet</td><td>Volunteer FAQ</td></tr>" +
        "<tr><td>Board</td><td>15 min annual slot</td><td>Board memo + policy link</td></tr>" +
        "</tbody></table>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> <strong>AI Playbook v1</strong> draft in shared doc; assign owners per section.</div>",
    },
    {
      id: "w4s3",
      navGroup: "w4",
      title: "Session 3 — Charter revision & commitments",
      subtitle: "30/60/90 · commissioning",
      kicker: "Week 4 — Integration",
      meta: "Suggested 60–90 minutes",
      html:
        "<p>Finalize <strong>Team AI Charter</strong> — Draft 1 becomes a signed commitment. Pair with <code>field-experiment.md</code> capstone pattern if used in your facilitation pack.</p>" +
        "<h2>Closing ritual (optional but powerful)</h2>" +
        "<ul>" +
        "<li>Sponsor reads mission anchor aloud.</li>" +
        "<li>Each participant states one <strong>30-day commitment</strong> (behavior, not tool).</li>" +
        "<li>Board liaison names one oversight mechanism they will actually calendar.</li>" +
        "</ul>" +
        "<h2>30 / 60 / 90</h2>" +
        "<ul>" +
        "<li><strong>30 days:</strong> playbook published internally; first org-wide briefing scheduled.</li>" +
        "<li><strong>60 days:</strong> managers trained; Concerns Register reviewed.</li>" +
        "<li><strong>90 days:</strong> expand pilot cohort or add task types per evidence; quarterly review on calendar.</li>" +
        "</ul>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> Signed charter + <strong>30/60/90 plan</strong> with named dates and owners.</div>",
    },
    {
      id: "w4-wrap",
      navGroup: "w4",
      title: "Week 4 — Exit checklist",
      subtitle: "What &ldquo;done&rdquo; looks like",
      kicker: "Week 4 — Wrap",
      meta: "Program completion",
      html:
        "<h2>Exit checklist</h2>" +
        "<ul>" +
        "<li>☐ Revised <strong>Team AI Charter</strong> (signed by leadership)</li>" +
        "<li>☐ <strong>AI Playbook v1</strong></li>" +
        "<li>☐ <strong>Concerns Register</strong> with owners and dates</li>" +
        "<li>☐ <strong>Stakeholder FAQ</strong></li>" +
        "<li>☐ <strong>Experiment evidence base</strong> (≥4 SEP runs org-wide; individuals may have fewer)</li>" +
        "<li>☐ <strong>Review schedule</strong> (monthly team; quarterly playbook; annual board)</li>" +
        "<li>☐ <strong>30/60/90 plan</strong> for rollout beyond pilot cohort</li>" +
        "</ul>" +
        "<h2>Read map</h2>" +
        "<ul>" +
        "<li><code>_docs/_imported/03-governance-ethics/ai-governance-guide.md</code> — annual review, board ownership</li>" +
        "<li><code>_docs/_prompts/platform-product-demo-design.md</code> — optional if aligning training with platform narrative</li>" +
        "</ul>" +
        "<div class=\"callout\"><strong>What this course does not cover:</strong> building custom models or RAG pipelines; pure fundraising system build-out (use the fundraising outline); client-facing AI products for beneficiaries — distinct ethics obligations.</div>" +
        "<p><strong>Regulated sectors:</strong> HIPAA/FERPA/SOX and similar require <strong>legal counsel</strong> beyond this outline.</p>",
    },
    {
      id: "sep",
      navGroup: "more",
      title: "Safe Experimentation Protocol (SEP)",
      subtitle: "Use for every formal experiment",
      kicker: "Reference",
      meta: "Template",
      html:
        "<p>Use this template for <strong>every</strong> formal experiment in Weeks 2–4. Variations are allowed; skipping steps is not.</p>" +
        "<table><thead><tr><th>Step</th><th>Requirement</th></tr></thead><tbody>" +
        "<tr><td>1. Charter fit</td><td>Task allowed by Team AI Charter. If unclear, pause for sponsor approval.</td></tr>" +
        "<tr><td>2. Data class</td><td>Public / internal / sensitive / regulated. Sensitive+ does not go into unapproved tools.</td></tr>" +
        "<tr><td>3. Hypothesis</td><td>Expected value: time, money, or quality — one measurable sentence.</td></tr>" +
        "<tr><td>4. Baseline</td><td>Complete without AI once; record time, quality note, reviewer.</td></tr>" +
        "<tr><td>5. Assisted pass</td><td>Complete with AI; save prompts and outputs verbatim.</td></tr>" +
        "<tr><td>6. Review</td><td>Named human checks voice, facts, risk.</td></tr>" +
        "<tr><td>7. Log</td><td>Hypothesis, baseline, result, errors, reviewer, go / no-go / iterate.</td></tr>" +
        "<tr><td>8. Debrief</td><td>15 min: surprises? new concerns? update Concerns Register.</td></tr>" +
        "</tbody></table>",
    },
    {
      id: "value",
      navGroup: "more",
      title: "Value tracking (three dimensions)",
      subtitle: "Tag every experiment",
      kicker: "Reference",
      meta: "Metrics",
      html:
        "<p>Tag each experiment with <strong>at least one</strong> primary value dimension.</p>" +
        "<ol>" +
        "<li><strong>Efficiency (time)</strong> — minutes or hours saved per unit; rework rate; calendar cost of review.</li>" +
        "<li><strong>Financial</strong> — direct savings or responsible revenue enablement where human-verified — not speculative ROI stories.</li>" +
        "<li><strong>Work quality</strong> — 1–5 rubric: accuracy, messaging alignment, accessibility/plain language, audience fit, theological/mission fit (if applicable). Quality can improve while time stays flat — still a win.</li>" +
        "</ol>" +
        "<div class=\"callout dissonance\"><strong>Anti-pattern:</strong> Declaring victory on &ldquo;feeling faster&rdquo; without baseline timing or reviewer load.</div>",
    },
    {
      id: "principles",
      navGroup: "more",
      title: "Design principles (summary)",
      subtitle: "One-page reminder",
      kicker: "Reference",
      meta: "Quick reference",
      html:
        "<table><thead><tr><th>Principle</th><th>In practice</th></tr></thead><tbody>" +
        "<tr><td>Governance before scale</td><td>Board/senior leadership owns stance; scope and no-go zones precede new tools.</td></tr>" +
        "<tr><td>Experimentation before adoption</td><td>Bounded trials produce discernment.</td></tr>" +
        "<tr><td>Humans accountable</td><td>Named reviewers for every high-stakes or external output.</td></tr>" +
        "<tr><td>Data minimization</td><td>Default: no sensitive data in consumer-grade tools until policy and tooling match risk.</td></tr>" +
        "<tr><td>Negative results are data</td><td>Log failures — they protect the mission from theater adoption.</td></tr>" +
        "<tr><td>Stakeholders have voice</td><td>Concerns captured structurally.</td></tr>" +
        "</tbody></table>",
    },
    {
      id: "facil",
      navGroup: "more",
      title: "Facilitation notes",
      subtitle: "Pacing · resistance · tools",
      kicker: "Reference",
      meta: "Facilitators",
      html:
        "<ul>" +
        "<li><strong>Pacing:</strong> Three sessions per week is intensive; twice-weekly over six weeks is acceptable if SEP homework needs air.</li>" +
        "<li><strong>Resistance:</strong> Protect the person asking &ldquo;should we?&rdquo; — that voice often guards mission and trust.</li>" +
        "<li><strong>Tools:</strong> Stay tool-agnostic until evidence supports paid/enterprise controls for sensitive workflows.</li>" +
        "<li><strong>Regulated sectors:</strong> Involve legal counsel early for HIPAA/FERPA/SOX-class data.</li>" +
        "</ul>",
    },
    {
      id: "appendix-log",
      navGroup: "more",
      title: "Appendix A — SEP log fields",
      subtitle: "Spreadsheet / Notion",
      kicker: "Reference",
      meta: "Appendix",
      html:
        "<p>Copy into a spreadsheet or Notion database:</p>" +
        "<ul>" +
        "<li>Experiment ID, date, participant(s)</li>" +
        "<li>Task name and workflow step</li>" +
        "<li>Charter clause / approval reference</li>" +
        "<li>Data class used</li>" +
        "<li>Value hypothesis (efficiency | financial | quality) + one-line metric</li>" +
        "<li>Baseline: time, quality note, reviewer</li>" +
        "<li>Prompt(s) and tool(s)</li>" +
        "<li>Assisted: time, quality note, errors/hallucinations</li>" +
        "<li>Reviewer name and outcome (approved / edited / rejected)</li>" +
        "<li>Decision: go | iterate | stop for this task type</li>" +
        "<li>Concern surfaced (Y/N) + link to Concerns Register ID</li>" +
        "</ul>",
    },
    {
      id: "appendix-concerns",
      navGroup: "more",
      title: "Appendix B — Concerns Register columns",
      subtitle: "Minimum schema",
      kicker: "Reference",
      meta: "Appendix",
      html:
        "<table><thead><tr><th>Column</th><th>Notes</th></tr></thead><tbody>" +
        "<tr><td>Concern</td><td>Plain language</td></tr>" +
        "<tr><td>Category</td><td>Data / Accuracy / Labor / Equity / Mission</td></tr>" +
        "<tr><td>Severity (1–5)</td><td>Impact if realized</td></tr>" +
        "<tr><td>Likelihood (1–5)</td><td></td></tr>" +
        "<tr><td>Mitigation</td><td>Current controls</td></tr>" +
        "<tr><td>Gap</td><td>What is missing</td></tr>" +
        "<tr><td>Owner</td><td>Named person</td></tr>" +
        "<tr><td>Review date</td><td></td></tr>" +
        "</tbody></table>",
    },
    {
      id: "appendix-sources",
      navGroup: "more",
      title: "Appendix C — Source index (repo)",
      subtitle: "Paths in this codebase",
      kicker: "Reference",
      meta: "Appendix",
      html:
        "<table><thead><tr><th>Topic</th><th>Path</th></tr></thead><tbody>" +
        "<tr><td>Detailed 12-session outline</td><td><code>_docs/publishable/07-ai-adoption-for-nonprofits-course-outline.md</code></td></tr>" +
        "<tr><td>Fundraising AI implementation</td><td><code>_docs/ai-powered-fundraising-implementation-4-week-course-outline.md</code></td></tr>" +
        "<tr><td>This course outline (source)</td><td><code>_docs/ai-workforce-training-safe-experimentation-4-week-course-outline.md</code></td></tr>" +
        "<tr><td>Maturity model</td><td><code>_docs/_imported/02-maturity-model/ai-maturity-model-ch7.md</code></td></tr>" +
        "<tr><td>Governance guide</td><td><code>_docs/_imported/03-governance-ethics/ai-governance-guide.md</code></td></tr>" +
        "<tr><td>VIM alignment</td><td><code>_docs/_imported/03-governance-ethics/vim-framework.md</code></td></tr>" +
        "<tr><td>Leadership briefs</td><td><code>_docs/_imported/03-governance-ethics/ai-core-leadership-briefs.md</code></td></tr>" +
        "<tr><td>Donor intelligence ethics</td><td><code>_docs/_imported/03-governance-ethics/ai-ethics-donor-intelligence.md</code></td></tr>" +
        "<tr><td>Digital content &amp; comms</td><td><code>_docs/_imported/05-training-experimentation/ai-digital-content-comms.md</code></td></tr>" +
        "<tr><td>Field experiment playbook</td><td><code>_docs/_imported/05-training-experimentation/playbooks/field-experiment.md</code></td></tr>" +
        "<tr><td>Copy quality (optional)</td><td><code>_docs/_imported/06-content-leadership-marketing/copy-scoring-rubric.md</code></td></tr>" +
        "<tr><td>Platform demo context (optional)</td><td><code>_docs/_prompts/platform-product-demo-design.md</code></td></tr>" +
        "</tbody></table>",
    },
  ]);
})();
