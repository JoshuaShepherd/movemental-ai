/* eslint-disable max-len */
(function () {
  "use strict";
  window.COURSE_LESSONS = (window.COURSE_LESSONS || []).concat([
    {
      id: "intro",
      navGroup: "start",
      title: "Welcome to the residency",
      subtitle: "How this course works",
      kicker: "Start here",
      h1: "The Movemental Author Residency",
      meta: "4 weeks · Formation, not a CMS tutorial",
      html:
        "<p>Welcome. You are not here to learn where buttons live on a dashboard. You are here because your life&rsquo;s work deserves a <strong>formation platform</strong> &mdash; a single home where read, form, assess, and explore belong together, grounded in Christ&rsquo;s lordship and mission.</p>" +
        "<p>This residency follows the same rhythm as every Movemental course: <strong>dissonance</strong> (productive tension), <strong>action</strong> (ship real work), <strong>reflection</strong> (name what you are learning), and <strong>community</strong> (cohort accountability). Each week ends with a live session; each day ends with a concrete deliverable.</p>" +
        "<h2>What you will ship by Week 4</h2>" +
        "<ul>" +
        "<li>A calibrated voice and a personal watermark line</li>" +
        "<li>Candidate pathways that organize your body of work as formation journeys</li>" +
        "<li>A <strong>full thematic article inventory</strong> (all pillars/themes planned) using the pillar-cluster model, plus a published pillar article and cluster article (nine-section architecture)</li>" +
        "<li>An eight-week <strong>course scaffold</strong> (complete outline) with Week 2 drafted and AI dissonance prompts for Weeks 2&ndash;4</li>" +
        "<li>A primary pathway draft (<strong>all twelve sections</strong>) and a content ecosystem map</li>" +
        "<li>A launch brief and ninety-day publishing roadmap</li>" +
        "</ul>" +
        "<div class=\"callout\"><strong>Prerequisites.</strong> Platform access (Scholar tier or author account), access to the AI Lab, familiarity with your own corpus, and the six publishable methodology articles (01&ndash;06 in <code>_docs/publishable/</code>) read before Day 1.</div>" +
        "<h2>How to use this preview</h2>" +
        "<p>Use the left navigation to move day by day. Bookmark a lesson with the URL hash (for example <code>#w1d3</code>). For local preview, open <code>index.html</code> from a static server so scripts load reliably (for example <code>pnpm dlx serve _docs/author-onboarding-course-preview</code> from the repo root).</p>",
    },
    {
      id: "w1d1",
      navGroup: "w1",
      title: "Day 1 — The problem we're solving",
      subtitle: "Origin story · reference tenant",
      kicker: "Week 1 · Vision and Voice",
      meta: "Day 1 · ~60–90 minutes",
      html:
        "<div class=\"callout dissonance\"><strong>Weekly dissonance.</strong> What if the way you have been distributing your work online is fragmenting the very formation you are trying to catalyze?</div>" +
        "<h2>Why Movemental exists</h2>" +
        "<p>Movement leaders rarely lack ideas. They lack a <strong>digital layer</strong> that keeps mission, content, community, and assessment from splintering across PDFs, isolated video channels, course platforms that never speak to one another, and inboxes full of one-off links. Scattered distribution trains audiences to consume fragments. Formation requires coherence.</p>" +
        "<p>Movemental is designed as <strong>one home</strong> for a leader&rsquo;s body of work: articles for discovery, books for depth, courses for structured transformation, pathways for narrative integration, assessments as mirrors, and the AI Lab as a conversational layer grounded in the corpus. The point is not novelty. The point is <strong>integrity</strong>: one place where your public teaching can actually form people.</p>" +
        "<h2>Explore the reference tenant</h2>" +
        "<p>Spend unhurried time on the live reference tenant (for example <em>alanhirsch.com</em>). Move as a curious learner, not a critic. Trace how content types connect: an article links forward to a pathway; a pathway routes to a course; the course invites AI conversations; the AI Lab answers from the books. Notice repetition of themes, not feature sprawl. That repetition is formation architecture.</p>" +
        "<h2>Core concept</h2>" +
        "<p>Write this sentence in your own words: <strong>The platform exists to give movement leaders the digital layer they were missing</strong> &mdash; a unified library where people read, form, assess, and explore without leaving the ecosystem of your vocation.</p>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> One paragraph describing <em>your</em> body of work as if it were a single library (not a list of products). Name what belongs on the shelf, what the shelf is for, and who it serves.</div>",
    },
    {
      id: "w1d2",
      navGroup: "w1",
      title: "Day 2 — The Christocentric spine",
      subtitle: "Watermark · allegiance · mission",
      kicker: "Week 1 · Vision and Voice",
      meta: "Day 2 · ~60 minutes",
      html:
        "<p>Movemental is unapologetically <strong>Christ-centered</strong>. Not as a branding garnish, but as load-bearing theology. The Christocentric spine names how Jesus&rsquo; lordship, the gospel&rsquo;s fullness, obedience, communal formation, and sentness hold the platform&rsquo;s content accountable.</p>" +
        "<h2>Six dimensions (study, do not memorize jargon)</h2>" +
        "<ul>" +
        "<li><strong>Core confession</strong> — the faith once delivered; creedal gravity.</li>" +
        "<li><strong>Allegiance</strong> — Jesus is Lord; rival loyalties named and refused.</li>" +
        "<li><strong>Gospel fullness</strong> — the whole story, not a truncated &ldquo;spiritual&rdquo; slice.</li>" +
        "<li><strong>Obedience</strong> — truth that walks; ethics that cost.</li>" +
        "<li><strong>Communal formation</strong> — faith that forms a people, not only private opinion.</li>" +
        "<li><strong>Sentness</strong> — the church exists for the world; mission is not an appendix.</li>" +
        "</ul>" +
        "<p>The watermark line used across courses is a compass: <em>We learn this to follow Jesus more deeply and join his mission more faithfully.</em> Your platform should have an equivalent <strong>filtering sentence</strong>: what belongs because it strengthens discipleship and mission, and what does not belong because it merely performs expertise.</p>" +
        "<h2>Discussion (journal)</h2>" +
        "<p>Where does your teaching naturally anchor to Jesus&rsquo; lordship and to mission? Where do you drift into generic leadership language that could belong to any speaker?</p>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> Draft your personal <strong>watermark line</strong> — one sentence that determines what belongs on your platform and what does not. Iterate until it would exclude at least one kind of content you could write but should not.</div>",
    },
    {
      id: "w1d3",
      navGroup: "w1",
      title: "Day 3 — Pathways as organizing intelligence",
      subtitle: "Doorways, not categories",
      kicker: "Week 1 · Vision and Voice",
      meta: "Day 3 · ~75 minutes",
      html:
        "<p>Pathways are <strong>thematic doorways</strong> into your body of work. They are not blog categories. Each pathway should carry a <strong>reframing question</strong>, a formation arc, and explicit connections between articles, books, courses, and assessments so a learner experiences one narrative, not a pile of assets.</p>" +
        "<h2>Twelve-section architecture (orientation)</h2>" +
        "<p>Reference pathways (for example Reframation, Metanoia, mDNA, Movement Intelligence, Discipleship) model a twelve-section arc from provocation to invitation. You will draft your own pathway in Week 4; for now, <strong>study the pattern</strong>: how provocation creates tension, how overview turns features into theological invitation, how distortion warnings protect the idea.</p>" +
        "<h2>Exercise</h2>" +
        "<p>Skim two pathways on the reference tenant. For each, answer: What question does the pathway answer? What would a newcomer feel invited into — information or transformation?</p>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> Draft <strong>three to five candidate pathways</strong> for your work. For each: name, reframing question, and one sentence describing the doorway (what it opens, not what it &ldquo;covers&rdquo;).</div>",
    },
    {
      id: "w1d4",
      navGroup: "w1",
      title: "Day 4 — Voice, not just content",
      subtitle: "Five voice markers",
      kicker: "Week 1 · Vision and Voice",
      meta: "Day 4 · ~90 minutes",
      html:
        "<p>Movemental articles are not generic thought leadership. They carry a recognizable <strong>voice profile</strong> calibrated for formation. The five markers are weighted intentionally:</p>" +
        "<ul>" +
        "<li><strong>Christocentric anchoring (30%)</strong> — two to three explicit Jesus / Christ / kingdom references in a typical article-length piece.</li>" +
        "<li><strong>Prophetic intensity (25%)</strong> — roughly three reframing questions per thousand words.</li>" +
        "<li><strong>Pastoral warmth (20%)</strong> — &ldquo;we&rdquo; language; relational, invitational tone.</li>" +
        "<li><strong>Narrative imagery (15%)</strong> — roughly eight to nine metaphors per thousand words (movement, journey, organic life, water, soil).</li>" +
        "<li><strong>Theological depth (10%)</strong> — real terms named, historical and biblical specificity.</li>" +
        "</ul>" +
        "<h2>Exercise</h2>" +
        "<p>Take five hundred words of your published writing. Score each marker with a quick 1–5 note. Where are you strongest? Where do you default to corporate consulting tone, detached academic voice, or motivational generality?</p>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> A three-hundred-word <strong>voice calibration memo</strong>: &ldquo;My natural voice leans toward ___ and I need to be intentional about ___.&rdquo; End with one concrete habit you will practice in drafting.</div>",
    },
    {
      id: "w1d5",
      navGroup: "w1",
      title: "Day 5 — Scenius and the business model",
      subtitle: "Network · pricing layers",
      kicker: "Week 1 · Vision and Voice",
      meta: "Day 5 · ~75 minutes",
      html:
        "<p><strong>Scenius</strong> (Brian Eno) names the creative intelligence of a whole scene — mutual influence, shared risk, cross-pollination. Movemental is not a solo publishing toy. It is infrastructure for a <strong>network of movement leaders</strong> (including the M100 founding network). Your tenant is a room in a larger house.</p>" +
        "<h2>Four pricing layers (authors need fluency, not accounting mastery)</h2>" +
        "<ul>" +
        "<li><strong>Subscriptions</strong> — Free, Reader, Leader, Scholar tiers that fund ongoing access and unlock depth.</li>" +
        "<li><strong>E-commerce</strong> — books, courses, bundles, assessments sold as products.</li>" +
        "<li><strong>Movement leader platforms</strong> — white-label, multi-tenant deployments for organizations.</li>" +
        "<li><strong>Institutional licensing</strong> — cohorts, teams, and enterprises.</li>" +
        "</ul>" +
        "<p>Why this matters for you: content is not only <em>published</em>. It is <strong>monetized, measured, and connected</strong>. Subscriptions create recurring revenue. Courses create high-value formation environments. Assessments create on-ramps. The AI Lab increases the return on your corpus by making it conversational and contextual.</p>" +
        "<div class=\"callout deliverable\"><strong>Deliverable.</strong> A one-page <strong>content monetization map</strong>: what is free for discovery, what belongs to subscribers, what is premium (courses, assessments, bundles). Note one tension you feel about paywalls and how you will resolve it ethically for your audience.</div>",
    },
    {
      id: "w1-cohort",
      navGroup: "w1",
      title: "Week 1 cohort session",
      subtitle: "90 minutes · peer feedback",
      kicker: "Week 1 · Cohort",
      meta: "Live · 90 minutes",
      html:
        "<p><strong>Agenda.</strong> Each author presents their watermark line, candidate pathways, and monetization map. Keep presentations tight so peers can respond.</p>" +
        "<h2>Peer feedback norms</h2>" +
        "<ul>" +
        "<li>Ask whether the watermark line <strong>actually filters</strong> — does it exclude fluff?</li>" +
        "<li>Ask whether pathways feel like <strong>doorways</strong> (reframing questions) or mere categories.</li>" +
        "<li>No vague praise. Specificity only.</li>" +
        "</ul>" +
        "<div class=\"callout cohort\"><strong>Reflection prompt.</strong> What surprised you about the difference between publishing content and building a formation platform?</div>" +
        "<p><strong>Prep.</strong> Bring your paragraph-length library description, watermark line, pathway list, and monetization map. Be ready to read the watermark line aloud.</p>",
    },
  ]);
})();
