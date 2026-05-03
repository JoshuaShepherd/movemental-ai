(function () {
  "use strict";
  window.COURSE_LESSONS = (window.COURSE_LESSONS || []).concat([
    {
      id: "w2s1",
      navGroup: "w2",
      title: "Session 1 — Prompting workshop",
      subtitle: "Structure · iteration · peer review",
      kicker: "Week 2 — Experimentation",
      meta: "Suggested 60–90 minutes",
      html:
        "<p><strong>Theme:</strong> Move from curiosity to <strong>repeatable skill</strong> and <strong>honest measurement</strong>. Build an evidence base, not an opinion base.</p>" +
        "<h2>Core moves</h2>" +
        "<ul>" +
        "<li><strong>Structured prompts:</strong> role + context + task + format + constraints. Teach participants to paste organization voice examples (from approved messaging) as style anchors — not as secret data.</li>" +
        "<li><strong>Iteration as competence:</strong> first output is draft zero; refinement prompts fix tone, length, audience, and risk.</li>" +
        "<li><strong>Peer review:</strong> swap screens (or share exports) and score outputs against a simple quality rubric (see Week 2 deliverables).</li>" +
        "</ul>" +
        "<h2>Non-profit patterns (live practice)</h2>" +
        "<p>Use <em>synthetic or public</em> scenarios: grant narrative outline, donor thank-you variants, board summary of a public annual report, volunteer shift reminder. <strong>Do not</strong> use real donor names or unreleased figures in the room unless policy allows.</p>" +
        "<h2>Guardrails to verbalize</h2>" +
        "<ul>" +
        "<li>No invented statistics — if numbers appear, they must be supplied by humans or cited sources.</li>" +
        "<li>No AI-only external publish — human reviewer signs off (see <code>ai-digital-content-comms.md</code>).</li>" +
        "</ul>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> Each pair produces <strong>three prompt variants</strong> for the same task and keeps the winning prompt in a shared prompt library (starter).</div>",
    },
    {
      id: "w2s2",
      navGroup: "w2",
      title: "Session 2 — Workflow mapping",
      subtitle: "Value / risk matrix · Start here",
      kicker: "Week 2 — Experimentation",
      meta: "Suggested 60–90 minutes",
      html:
        "<p>Not every workflow deserves AI. Map recurring work on two axes: <strong>value if improved</strong> (volume, strategic importance) vs. <strong>risk if wrong</strong> (reputational, legal, relational).</p>" +
        "<h2>Exercise</h2>" +
        "<ol>" +
        "<li>List fifteen recurring tasks (silent brainstorm).</li>" +
        "<li>Plot each on a whiteboard: high/low value × high/low risk.</li>" +
        "<li>Circle the <strong>Start here</strong> quadrant: high value, comparatively lower risk <em>within charter</em>.</li>" +
        "</ol>" +
        "<h2>For each candidate task, define</h2>" +
        "<ul>" +
        "<li>What &ldquo;good enough&rdquo; means</li>" +
        "<li>Named reviewer</li>" +
        "<li>Known failure modes (tone drift, hallucinated citations, flattening theology)</li>" +
        "</ul>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> <strong>Value/risk matrix</strong> photo + prioritized task list (top five) with reviewer names.</div>",
    },
    {
      id: "w2s3",
      navGroup: "w2",
      title: "Session 3 — Structured compare",
      subtitle: "Baseline vs assisted · log negatives",
      kicker: "Week 2 — Experimentation",
      meta: "Suggested 60–90 minutes",
      html:
        "<p>Insist on <strong>logging negative outcomes</strong>. If assisted work is faster but wrong more often, that is data — it changes the go/no-go decision.</p>" +
        "<h2>Protocol</h2>" +
        "<ol>" +
        "<li>Pick one task from the prioritized list.</li>" +
        "<li>Run <strong>baseline</strong> without AI — time it, note quality in one line.</li>" +
        "<li>Run <strong>assisted</strong> with saved prompts — time it, note errors/hallucinations.</li>" +
        "<li>Reviewer scores both on agreed quality dimensions (1–5).</li>" +
        "<li>Decision: go / iterate / stop for this task type.</li>" +
        "</ol>" +
        "<h2>Efficiency Diary</h2>" +
        "<p>Begin a simple log (spreadsheet) of repeat runs — learning curve, prompt drift, reviewer burden. You are building an <strong>evidence base</strong> for leadership.</p>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> At least <strong>one full SEP experiment</strong> per participant or pair with complete log fields.</div>",
    },
    {
      id: "w2-wrap",
      navGroup: "w2",
      title: "Week 2 — Deliverables & homework",
      subtitle: "Quality rubric · three repeats",
      kicker: "Week 2 — Wrap",
      meta: "Between sessions",
      html:
        "<h2>Deliverables</h2>" +
        "<table><thead><tr><th>Deliverable</th><th>Owner</th></tr></thead><tbody>" +
        "<tr><td>Value/risk matrix + prioritized task list</td><td>Team leads</td></tr>" +
        "<tr><td>Completed SEP experiments (&ge;1 per participant)</td><td>Participants</td></tr>" +
        "<tr><td>Prompt library (starter templates)</td><td>Comms/ops lead</td></tr>" +
        "</tbody></table>" +
        "<h2>Value / quality scoring (agree in Week 2)</h2>" +
        "<p>Tag each experiment with at least one primary dimension: <strong>efficiency</strong> (time), <strong>financial</strong>, or <strong>work quality</strong>. For quality, use a simple 1–5 rubric on: accuracy, alignment to messaging/case for support, accessibility/plain language, audience fit, theological or mission fit (if applicable).</p>" +
        "<h2>Homework</h2>" +
        "<p>Repeat the <strong>same experiment type three times</strong>. Note learning curve, prompt drift, and reviewer burden. Compare run 1 vs run 3 — where does speed stabilize? Where does quality plateau?</p>" +
        "<h2>Read map</h2>" +
        "<ul>" +
        "<li><code>_docs/_imported/05-training-experimentation/ai-digital-content-comms.md</code></li>" +
        "<li><code>_docs/_imported/06-content-leadership-marketing/copy-scoring-rubric.md</code> (optional depth)</li>" +
        "<li><code>_docs/publishable/02-the-evergreen-article-architecture.md</code> (if anchoring content strategy)</li>" +
        "</ul>",
    },
  ]);
})();
