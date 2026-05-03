(function () {
  "use strict";
  window.COURSE_LESSONS = (window.COURSE_LESSONS || []).concat([
    {
      id: "w4d17",
      navGroup: "w4",
      title: "Day 17 — Pathway architecture deep dive",
      subtitle: "Twelve sections (1–3)",
      kicker: "Week 4 · Integration & Launch",
      meta: "Day 17 · ~2 hours",
      html:
        "<div class=\"callout dissonance\"><strong>Weekly dissonance.</strong> What if the most important thing you build this week is not a new asset but the connective tissue between everything you have already built?</div>" +
        "<p>Pathways integrate your platform. The twelve-section architecture moves from provocation to protection to invitation:</p>" +
        "<ol>" +
        "<li><strong>Hero</strong> — image, title, tagline, anchor verse.</li>" +
        "<li><strong>Provocation</strong> — reframing question + productive tension.</li>" +
        "<li><strong>Overview</strong> — five bullets of theological invitation (not a feature list).</li>" +
        "<li><strong>Core model</strong> — framework presentation with visual.</li>" +
        "<li><strong>Scripture thread</strong> — four to six passages woven (not proof-texted).</li>" +
        "<li><strong>Case studies</strong> — historical and contemporary narratives.</li>" +
        "<li><strong>Formation practices</strong> — ten to fifteen minute actionable practice.</li>" +
        "<li><strong>Curated resources</strong> — featured book + course from your corpus.</li>" +
        "<li><strong>AI Lab invitation</strong> — explore with pathway-specific context.</li>" +
        "<li><strong>FAQs</strong> — common questions + what this is NOT.</li>" +
        "<li><strong>Distortion warnings</strong> — three ways the concept can be misappropriated.</li>" +
        "<li><strong>Invitation</strong> — warm, Christ-centered closing with personal, communal, and missional outcomes.</li>" +
        "</ol>" +
        "<h2>Study</h2>" +
        "<p>Walk a reference pathway end to end. Notice how FAQs and distortion warnings protect the idea from misuse.</p>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> Choose your <strong>primary pathway</strong> from Week 1 candidates. Draft <strong>sections 1–3</strong> (Hero, Provocation, Overview).</div>",
    },
    {
      id: "w4d18",
      navGroup: "w4",
      title: "Day 18 — Build the pathway",
      subtitle: "Sections 4–12",
      kicker: "Week 4 · Integration & Launch",
      meta: "Day 18 · ~3–5 hours",
      html:
        "<p>Draft sections 4–12. Two requirements are non-negotiable for integration:</p>" +
        "<ul>" +
        "<li><strong>Section 8 (Curated resources)</strong> — link to your pillar article and your course. This is where the ecosystem becomes visible.</li>" +
        "<li><strong>Section 11 (Distortion warnings)</strong> — name three specific ways your concept gets co-opted, flattened, or weaponized. This is prophetic work.</li>" +
        "</ul>" +
        "<p>Your pathway is a <strong>hub</strong>, not a page. It routes people to the right content for their formation stage.</p>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> Complete pathway draft — all twelve sections.</div>",
    },
    {
      id: "w4d19",
      navGroup: "w4",
      title: "Day 19 — Content ecosystem map",
      subtitle: "Visual + roadmap",
      kicker: "Week 4 · Integration & Launch",
      meta: "Day 19 · ~2–3 hours",
      html:
        "<p>Draw a map (digital or paper) of your ecosystem:</p>" +
        "<ul>" +
        "<li><strong>Pathways</strong> — organizing intelligence</li>" +
        "<li><strong>Articles</strong> — discovery and depth; include your Week 2 <strong>full thematic inventory</strong> plus published pillar/cluster pieces</li>" +
        "<li><strong>Books</strong> — scholarship and canonical corpus for AI grounding</li>" +
        "<li><strong>Courses</strong> — structured transformation</li>" +
        "<li><strong>Assessments</strong> — mirrors and on-ramps</li>" +
        "<li><strong>AI Lab</strong> — companion layer across everything</li>" +
        "</ul>" +
        "<p>Each asset type does a different job. Formation is the system, not the single asset.</p>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> Completed ecosystem map plus a <strong>prioritized publishing roadmap</strong>: what ships first, second, third, and why. Include a one-paragraph rationale for sequencing.</div>",
    },
    {
      id: "w4d20",
      navGroup: "w4",
      title: "Day 20 — Platform tooling & workflow",
      subtitle: "Type safety · tenant config · ingest",
      kicker: "Week 4 · Integration & Launch",
      meta: "Day 20 · ~2–3 hours",
      html:
        "<p>You do not need to become a programmer. You do need a <strong>mental model</strong> of integrity: content lives in a typed pipeline from database/schema through validation, services, APIs, hooks, and UI. That chain protects your platform from silent corruption.</p>" +
        "<h2>Tenant configuration</h2>" +
        "<p>Tenant-specific strings and feature flags live in configuration (for example <code>tenant.config.ts</code> in this codebase). Your tenant name, tagline, themes, chat text, and hero content are centralized — not scattered across components.</p>" +
        "<h2>Publishing workflows (hands-on)</h2>" +
        "<ul>" +
        "<li><strong>Articles</strong> — markdown ingestion to database, article detail rendering, AI Lab indexing.</li>" +
        "<li><strong>Courses</strong> — scaffold → lesson content → cohort → AI conversation configuration.</li>" +
        "</ul>" +
        "<p>Follow your team&rsquo;s runbook for staging. If you are the first author on a tenant, pair with engineering for the first publish.</p>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> Publish your pillar and cluster articles to <strong>staging</strong>. Verify rendering, cross-links, and that the AI Lab can reason about your content. Document any issues with exact URLs.</div>",
    },
    {
      id: "w4d21",
      navGroup: "w4",
      title: "Day 21 — Launch plan & commissioning",
      subtitle: "Brief · M100 · ninety days",
      kicker: "Week 4 · Integration & Launch",
      meta: "Day 21 · ~2 hours",
      html:
        "<p>Finalize artifacts for review:</p>" +
        "<ul>" +
        "<li>Full thematic article inventory (final)</li>" +
        "<li>Pillar article (final, published to staging or production per policy)</li>" +
        "<li>Cluster article (final)</li>" +
        "<li>Eight-week course outline with Week 2 fully drafted</li>" +
        "<li>Primary pathway (twelve sections drafted)</li>" +
        "<li>Ecosystem map and publishing roadmap</li>" +
        "<li>Updated monetization map</li>" +
        "</ul>" +
        "<p><strong>Scenius reminder.</strong> You are not launching alone. Movemental tenants participate in a larger network; cross-pollination (shared pathways, guest articles, co-taught courses) is part of the long-term vision.</p>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> A one-page <strong>launch brief</strong>: what is ready to ship, what needs one to two more weeks, and what your <strong>ninety-day content calendar</strong> looks like after onboarding.</div>",
    },
    {
      id: "w4-cohort",
      navGroup: "w4",
      title: "Week 4 cohort — Commissioning",
      subtitle: "Celebration & mutual sending",
      kicker: "Week 4 · Cohort",
      meta: "Live · 90 minutes",
      html:
        "<p><strong>Agenda.</strong> Each author presents ecosystem map and launch brief. Cohort celebrates: read watermark lines and pillar hooks aloud. End with mutual commissioning — short, specific blessings over each author&rsquo;s work.</p>" +
        "<h2>Norms</h2>" +
        "<ul>" +
        "<li>Keep presentations concise; leave room for blessing.</li>" +
        "<li>Speak truthfully: name fear and name hope.</li>" +
        "<li><strong>This is ready. This will form people. Go.</strong></li>" +
        "</ul>" +
        "<div class=\"callout cohort\"><strong>Final reflection.</strong> What did you learn about your own body of work by organizing it as a formation platform rather than a content archive?</div>",
    },
    {
      id: "appendix-deliverables",
      navGroup: "more",
      title: "Cumulative deliverables",
      subtitle: "Checklist by week",
      kicker: "Reference",
      meta: "Checklist",
      html:
        "<table>" +
        "<thead><tr><th>Deliverable</th><th>Type</th><th>Week</th></tr></thead><tbody>" +
        "<tr><td>Body-of-work library description</td><td>One paragraph</td><td>1</td></tr>" +
        "<tr><td>Personal watermark line</td><td>One sentence</td><td>1</td></tr>" +
        "<tr><td>Candidate pathways with reframing questions</td><td>Strategy</td><td>1</td></tr>" +
        "<tr><td>Voice calibration memo</td><td>~300 words</td><td>1</td></tr>" +
        "<tr><td>Content monetization map</td><td>One page</td><td>1</td></tr>" +
        "<tr><td>Full thematic article inventory</td><td>Strategy (table or spreadsheet)</td><td>2</td></tr>" +
        "<tr><td>Pillar-cluster execution plan (primary pathway)</td><td>Strategy</td><td>2</td></tr>" +
        "<tr><td>Pillar article (published)</td><td>3,500–4,500 words</td><td>2</td></tr>" +
        "<tr><td>Cluster article (published)</td><td>2,200–3,200 words</td><td>2</td></tr>" +
        "<tr><td>Course thesis statement</td><td>One paragraph</td><td>3</td></tr>" +
        "<tr><td>Eight-week course outline</td><td>Strategy</td><td>3</td></tr>" +
        "<tr><td>Course Week 2 full module draft</td><td>Content bundle</td><td>3</td></tr>" +
        "<tr><td>Dissonance prompts for Weeks 2–4</td><td>AI configuration</td><td>3</td></tr>" +
        "<tr><td>Assessment concept (if applicable)</td><td>Strategy</td><td>3</td></tr>" +
        "<tr><td>Primary pathway (twelve sections)</td><td>Content</td><td>4</td></tr>" +
        "<tr><td>Content ecosystem map</td><td>Visual + strategy</td><td>4</td></tr>" +
        "<tr><td>Publishing roadmap</td><td>Strategy</td><td>4</td></tr>" +
        "<tr><td>Launch brief</td><td>One page</td><td>4</td></tr>" +
        "</tbody></table>",
    },
    {
      id: "appendix-success",
      navGroup: "more",
      title: "Success criteria",
      subtitle: "Graduation bar",
      kicker: "Reference",
      meta: "Rubrics",
      html:
        "<p>An author graduates this residency when all of the following are true:</p>" +
        "<ol>" +
        "<li><strong>Vision fluency</strong> — Can articulate the Christocentric spine, the Four Necessities, and pathway architecture without notes, and explain why each serves formation rather than mere delivery.</li>" +
        "<li><strong>Voice calibration</strong> — Published articles score above threshold on all five voice markers, without anti-pattern violations.</li>" +
        "<li><strong>Article strategy + content shipped</strong> — Full thematic article inventory submitted; at least one pillar and one cluster article published and rendering correctly.</li>" +
        "<li><strong>Course designed</strong> — Complete eight-week outline with at least one fully drafted module and AI conversation prompts.</li>" +
        "<li><strong>Pathway integrated</strong> — Primary pathway draft connects articles, course, and assessment (if applicable).</li>" +
        "<li><strong>Business clarity</strong> — Monetization map and ninety-day roadmap align with platform pricing layers.</li>" +
        "<li><strong>Scenius orientation</strong> — Can name at least two cross-pollination opportunities with other tenants or authors.</li>" +
        "</ol>",
    },
    {
      id: "appendix-reading",
      navGroup: "more",
      title: "Recommended reading",
      subtitle: "Before and during",
      kicker: "Reference",
      meta: "Bibliography",
      html:
        "<h3>Before Day 1 (required)</h3>" +
        "<ol>" +
        "<li>01 — Content Strategy for Movement Leaders</li>" +
        "<li>02 — The Evergreen Article Architecture</li>" +
        "<li>03 — Transformation Over Information</li>" +
        "<li>04 — The Eight-Week Formation Scaffold</li>" +
        "<li>05 — Formation Journeys: The Pathway Architecture</li>" +
        "<li>06 — The Christocentric Spine</li>" +
        "</ol>" +
        "<p>Files live in <code>_docs/publishable/</code> in this repository.</p>" +
        "<h3>During the course</h3>" +
        "<ul>" +
        "<li><code>_docs/_imported/06-content-leadership-marketing/seo-topic-clusters.md</code> — Week 2 Day 6 (reference article inventory; adapt to your themes)</li>" +
        "<li>Reference tenant walkthroughs (repeat regularly)</li>" +
        "<li>At least two published pillar articles (full read, section-by-section)</li>" +
        "<li>One complete pathway (all twelve sections)</li>" +
        "<li>One complete course (minimum: outline + one full module)</li>" +
        "</ul>",
    },
  ]);
})();
