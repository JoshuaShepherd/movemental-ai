/* Audience + field narrative for fragmentation-unified-full-story-mockup.html
   Run synchronously before GSAP so copy and scatter src order are final. */
(function () {
  if (window.__fragUnifiedNarrative) return;
  window.__fragUnifiedNarrative = true;

  const AUDS = ["leader", "nonprofit", "church", "seminary"];
  const SCATTER_IMGS = [
    "../../public/images/fragmentation-story/book-fragments-of-form.webp",
    "../../public/images/fragmentation-story/core-hub-to-fragment-nodes.webp",
    "../../public/images/fragmentation-story/cover-principles-design-fragmentation.webp",
    "../../public/images/fragmentation-story/cover-structural-fragments-investigation.webp",
    "../../public/images/fragmentation-story/email-thread-multi-participant.webp",
    "../../public/images/fragmentation-story/formal-design-systems-split-flow.webp",
    "../../public/images/fragmentation-story/message-thread-staggered-fragments.webp",
    "../../public/images/fragmentation-story/mobile-chat-skeleton-bubbles.webp",
    "../../public/images/fragmentation-story/module-formal-systems-intro.webp",
    "../../public/images/fragmentation-story/order-of-service-structured-units.webp",
    "../../public/images/fragmentation-story/podcast-card-abstract-structures.webp",
    "../../public/images/fragmentation-story/session-essential-structures-card.webp",
    "../../public/images/fragmentation-story/sketch-converge-diverge-flow.webp",
    "../../public/images/fragmentation-story/stage-presentation-three-shapes.webp",
  ];
  const SCATTER_PERM = {
    leader: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    nonprofit: [3, 0, 5, 2, 7, 1, 9, 4, 11, 6, 13, 8, 10, 12],
    church: [8, 10, 0, 12, 2, 4, 6, 1, 3, 5, 7, 9, 11, 13],
    seminary: [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
  };

  function readState() {
    const q = new URLSearchParams(location.search);
    let aud = q.get("audience") || sessionStorage.getItem("fragAudience") || "leader";
    let field = q.get("field") || sessionStorage.getItem("fragField") || "info";
    if (!AUDS.includes(aud)) aud = "leader";
    if (field !== "info" && field !== "rel") field = "info";
    return { audience: aud, field: field };
  }

  function writeState(aud, field) {
    try {
      sessionStorage.setItem("fragAudience", aud);
      sessionStorage.setItem("fragField", field);
    } catch (e) {}
    const q = new URLSearchParams(location.search);
    q.set("audience", aud);
    q.set("field", field);
    history.replaceState(null, "", "?" + q.toString());
  }

  function fillBodies(sel, texts) {
    const root = document.querySelector(sel);
    if (!root) return;
    const bodies = root.querySelectorAll(".stage__caption-body");
    texts.forEach(function (t, i) {
      if (bodies[i]) bodies[i].textContent = t;
    });
  }

  function setScatterImages(audience) {
    const perm = SCATTER_PERM[audience] || SCATTER_PERM.leader;
    const imgs = document.querySelectorAll("#scatter-field .scatter__tile img");
    perm.forEach(function (srcIx, domIx) {
      const img = imgs[domIx];
      if (img && SCATTER_IMGS[srcIx]) img.src = SCATTER_IMGS[srcIx];
    });
  }

  const COPY = {
    leader: {
      info: {
        introLede:
          "Your body of work—books, talks, drafts, course modules—lives as a widening spread of files and platforms. Each artifact is real and partial. None of them knows the others exist. Use the dock to switch audience and field (informational vs relational).",
        costTitle: "You built a public theology.<br />None of it can find itself.",
        ledger: [
          "Every new channel is another <strong>search</strong> across your own corpus.",
          "Every republication is a <strong>drift</strong> risk for version truth.",
          "Every thread is a <strong>relationship edge</strong> that your content never meets.",
        ],
        climaxSub:
          "One library: books, modules, podcasts, and threads become surfaces over the same intelligence—defensible in search and faithful in citation.",
      },
      rel: {
        introLede:
          "Your intelligence also lives in pastoral threads, cohort chats, board-side conversations, and introductions you never logged. The relational field carries memory your CMS will never see—until it is wired to the same source.",
        costTitle: "You built trust in rooms.<br />The map is still in email.",
        ledger: [
          "Every handoff is a <strong>search</strong> for who already knows.",
          "Every transition is <strong>drift</strong> in pastoral continuity.",
          "Every urgent DM is a <strong>meeting that didn't happen</strong>—with no shared record.",
        ],
        climaxSub:
          "One intelligence behind public artifacts and private care threads—so the right person is always in the room with the right fragment.",
      },
    },
    nonprofit: {
      info: {
        introLede:
          "Programs, grants, and fundraising each speak a true version of the mission—from different drives, decks, and PDFs. The informational field is where beneficiaries, officers, and the public meet parallel truths.",
        costTitle: "You built impact stories.<br />They disagree in the wild.",
        ledger: [
          "Every report cycle is a <strong>search</strong> for the canonical numbers.",
          "Every attachment chain is <strong>drift</strong> between program and development.",
          "Every site refresh is a <strong>meeting that didn't happen</strong> between teams.",
        ],
        climaxSub:
          "Grant narrative, curriculum, and annual report draw from one typed library—publish once, cite everywhere, keep GEO-clean.",
      },
      rel: {
        introLede:
          "Donors, grant officers, and volunteers meet your mission in relationships first—then in documents. Relational fragmentation is duplicated care, silent handoffs, and cohorts that outgrow the spreadsheet.",
        costTitle: "You built donor love in conversations.<br />The CRM is a postcard.",
        ledger: [
          "Every major donor thread is a <strong>search</strong> across who said what when.",
          "Every staff change is <strong>drift</strong> in donor memory.",
          "Every board packet is a <strong>meeting that didn't happen</strong> with the field.",
        ],
        climaxSub:
          "Relational integration means handoffs carry context—who was formed, what was promised, what artifact proves it.",
      },
    },
    church: {
      info: {
        introLede:
          "Weekend liturgy, discipleship pathways, and teaching archives live in slides, PDFs, and LMS modules that rarely share a spine. The informational field is your scattered curriculum of record.",
        costTitle: "You built formation content.<br />It ships in twelve formats.",
        ledger: [
          "Every ministry silo is a <strong>search</strong> for the same scripture-shaped idea.",
          "Every volunteer rewrite is <strong>drift</strong> from the theology you approved.",
          "Every microsite is a <strong>meeting that didn't happen</strong> with comms.",
        ],
        climaxSub:
          "One library powers weekend word, small-group kits, and leader training—versioned, attributable, translatable.",
      },
      rel: {
        introLede:
          "Care conversations, elder threads, and mission partnerships live outside the sermon file. Relational fragmentation is when pastoral knowledge cannot ride along with teaching knowledge.",
        costTitle: "You built community in rooms.<br />The care graph is in texts.",
        ledger: [
          "Every crisis thread is a <strong>search</strong> for prior pastoral context.",
          "Every handoff is <strong>drift</strong> between staff and volunteers.",
          "Every new family is a <strong>meeting that didn't happen</strong> with history.",
        ],
        climaxSub:
          "Relational integration keeps pastoral continuity next to public teaching—same intelligence, two legitimate surfaces.",
      },
    },
    seminary: {
      info: {
        introLede:
          "Syllabi, reader packs, accreditation artifacts, and faculty research live in parallel systems that rarely share ontology. The informational field is your institution's contested library of record.",
        costTitle: "You built a curriculum.<br />Accreditation lives elsewhere.",
        ledger: [
          "Every learning outcome is a <strong>search</strong> across LMS, PDF, and site.",
          "Every committee edit is <strong>drift</strong> between catalog and classroom.",
          "Every digital initiative is a <strong>meeting that didn't happen</strong> with IT.",
        ],
        climaxSub:
          "Course, library, and public scholarship connect in one schema—citations travel, versions reconcile, translation pipelines stay honest.",
      },
      rel: {
        introLede:
          "Formation happens in advisories, field education, and faculty mentorship that never becomes metadata. Relational fragmentation is when student stories cannot find the readings that named them.",
        costTitle: "You built formation in mentorship.<br />The LMS is only half.",
        ledger: [
          "Every advising note is a <strong>search</strong> across years and advisors.",
          "Every cohort handoff is a <strong>drift</strong> in spiritual continuity.",
          "Every placement site is a <strong>meeting that didn't happen</strong> with faculty.",
        ],
        climaxSub:
          "Relational integration carries cohort memory beside the corpus—so formation is witnessed, not only assigned.",
      },
    },
  };

  function capBlock(aud, field, stage) {
    const a = COPY[aud] && COPY[aud][field];
    if (!a || !a.captions || !a.captions[stage]) return null;
    return a.captions[stage];
  }

  COPY.leader.info.captions = {
    integration: [
      "Update the book; the course, the deck, and the grant attachment update with it.",
      "Tags and connections carry meaning—search and GEO read the same graph you curate once.",
      "Fewer rogue PDFs. Fewer 'which version is live?' fights before Sunday or the board.",
    ],
    activation: [
      "Ask your corpus first—staff or scholar, same routed truth.",
      "Citations land with chapter, timestamp, and artifact type.",
      "New hires inherit the whole graph on day one—not a folder dump.",
    ],
    formation: [
      "Dissonance is named from lived ministry data, not only reading lists.",
      "Cohorts move in rhythm; the corpus serves the arc.",
      "Practice sites stay tied to the sentences that formed them.",
    ],
    multiplication: [
      "Each movement or parish tenant inherits the whole library and localizes.",
      "Cohorts compound; revenue and formation trace the same usage graph.",
      "Corrections from the field improve the commons without forking doctrine.",
    ],
  };
  COPY.leader.rel.captions = COPY.leader.info.captions;

  COPY.nonprofit.info.captions = {
    integration: [
      "Program outcomes, grant logic models, and donor letters reference one program spine.",
      "Impact metrics attach to stories without duplicate entry in Salesforce and Word.",
      "Audit season stops being archaeology across twelve folders.",
    ],
    activation: [
      "Ask across grants, annual reports, and beneficiary stories with citations.",
      "Compliance answers show which artifact satisfied which clause.",
      "Program and development share one query surface—politics down, truth up.",
    ],
    formation: [
      "Volunteer pathways begin from lived tension in the neighborhood, typed to outcomes.",
      "Board and field staff reflect with the same curated fragments.",
      "Local partners see the same promises the grant officer signed.",
    ],
    multiplication: [
      "Chapters and affiliates inherit policy, curriculum, and crisis playbooks.",
      "Each site feeds usage signals without merging donor PII inappropriately.",
      "Network learning improves the base templates every quarter.",
    ],
  };
  COPY.nonprofit.rel.captions = {
    integration: [
      "Major donor memory, volunteer edges, and beneficiary introductions share one trust graph.",
      "Handoffs between program and development carry who met whom, not only amounts.",
      "Succession preserves relationships—not only files.",
    ],
    activation: [
      "Ask who already knows this family or funder before composing the next email.",
      "Answers cite conversations and artifacts together—no fantasy relationship advice.",
      "Onboarding reads the relational spine alongside the theory of change.",
    ],
    formation: [
      "Cohorts name dissonance from lived case files, not generic icebreakers.",
      "Mentors see the same pathway map the curriculum team authored.",
      "Field supervisors link practice journals to institutional learning outcomes.",
    ],
    multiplication: [
      "Partner NGOs inherit playbooks and relational templates with guardrails.",
      "Federated learning improves care patterns without centralizing sensitive notes blindly.",
      "Each tenant keeps local nuance; the graph stays truthful at the edge.",
    ],
  };

  COPY.church.info.captions = {
    integration: [
      "Liturgy, sermon series, and discipleship kits reference one scripture-shaped spine.",
      "Kids ministry and adult ed stop contradicting the same doctrine quietly.",
      "Microsites inherit typography, theology notes, and version pins.",
    ],
    activation: [
      "Leaders query across sermon, small-group plan, and policy in one workspace.",
      "Answers respect role—what elders see differs from what the public sees.",
      "Seasonal planning reuses prior years without copy-paste drift.",
    ],
    formation: [
      "Pathways begin from neighborhood tension surfaced in pastoral data.",
      "Cohorts carry the same vocabulary from weekend stage to living room.",
      "Baptism and membership milestones stay tied to the readings that named them.",
    ],
    multiplication: [
      "Plants and partner churches inherit curriculum and comms rails.",
      "Regional networks share exemplars without merging every database.",
      "Denomination-wide edits propagate with review, not chaos.",
    ],
  };
  COPY.church.rel.captions = {
    integration: [
      "Care teams, elders, and mission partners see handoffs with shared pastoral memory.",
      "Referrals carry context—who prayed, what was promised, what resource was sent.",
      "Confidentiality tiers stay explicit while still connecting to public teaching.",
    ],
    activation: [
      "Ask who walked with this household before scheduling the next visit.",
      "Citations pair policy, scripture, and prior pastoral notes appropriately.",
      "Crisis responses reuse approved language without cold templates.",
    ],
    formation: [
      "Dissonance is named from actual pastoral encounters, anonymized where needed.",
      "Mentors and small-group leaders share one formation arc map.",
      "Ordination pathways show which artifacts grounded each competency.",
    ],
    multiplication: [
      "Plants receive pastoral patterns and teaching spine together.",
      "Partnerships preserve independent governance but shared intelligence.",
      "Mission agencies see ecclesial context beside content licenses.",
    ],
  };

  COPY.seminary.info.captions = {
    integration: [
      "Syllabus, library reserves, and public faculty pages cite the same objects.",
      "Accreditation narratives pull live outcomes instead of frozen exports.",
      "Translation and localization share one canonical text chain.",
    ],
    activation: [
      "Committees query across policy, reader, and prior self-study with citations.",
      "Students see which artifact supports each rubric line.",
      "IT and faculty share one interface to object permissions.",
    ],
    formation: [
      "Field education journals link to the readings that reframed them.",
      "Faculty formation cohorts reuse the same primary sources as MDiv learners—at depth.",
      "Competency maps stay tied to exemplar papers and sermons, not only boxes.",
    ],
    multiplication: [
      "Partner schools and extension sites inherit course packs with attribution.",
      "Consortia improve shared rare books handling without duplicating scans badly.",
      "Library and faculty governance workflows stay in sync across tenants.",
    ],
  };
  COPY.seminary.rel.captions = {
    integration: [
      "Advising notes, spiritual direction, and placement feedback respect tiers but share lineage.",
      "Cohort memory carries between advisors with student consent boundaries.",
      "Donor and trustee briefings align with what students actually experienced.",
    ],
    activation: [
      "Ask across advising history and learning outcomes before the tenure conversation.",
      "Citations separate public scholarship from protected formation notes cleanly.",
      "Field supervisors and faculty see complementary slices of the same pathway.",
    ],
    formation: [
      "Dissonance is named from placement sites and community pain, not only theory.",
      "Spiritual formation groups trace the same arc as academic competencies—intentionally.",
      "Ordination committees see evidence chains, not scattered PDFs.",
    ],
    multiplication: [
      "Denomination partners and global extensions reuse formation scaffolds safely.",
      "Alumni networks contribute practice signals back to curriculum without leaking FERPA.",
      "Each extension center localizes language while keeping canonical relationships.",
    ],
  };

  function applyNarrative(audience, field) {
    const pack = COPY[audience] && COPY[audience][field];
    if (!pack) return;
    const lede = document.getElementById("intro-lede");
    if (lede && pack.introLede) lede.textContent = pack.introLede;
    const title = document.getElementById("scatter-cost-title");
    if (title && pack.costTitle) title.innerHTML = pack.costTitle;
    const ledger = document.getElementById("scatter-cost-ledger");
    if (ledger && pack.ledger) {
      const lis = ledger.querySelectorAll("li");
      pack.ledger.forEach(function (html, i) {
        if (lis[i]) lis[i].innerHTML = html;
      });
    }
    const sub = document.querySelector(".scatter__climax-sub");
    if (sub && pack.climaxSub) sub.textContent = pack.climaxSub;

    ["integration", "activation", "formation", "multiplication"].forEach(function (st) {
      const lines = capBlock(audience, field, st);
      if (lines) fillBodies("#" + st + "-captions", lines);
    });

    setScatterImages(audience);
  }

  function setDockUI(audience, field) {
    document.querySelectorAll(".audience-card").forEach(function (btn) {
      const on = btn.getAttribute("data-tab") === audience;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
    document.querySelectorAll(".mode-rail__opt").forEach(function (btn) {
      const on = btn.getAttribute("data-view") === field;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  const initial = readState();
  let audience = initial.audience;
  let field = initial.field;
  setDockUI(audience, field);
  applyNarrative(audience, field);

  document.querySelectorAll(".audience-card").forEach(function (btn) {
    btn.addEventListener("click", function () {
      audience = btn.getAttribute("data-tab") || "leader";
      setDockUI(audience, field);
      writeState(audience, field);
      applyNarrative(audience, field);
      if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
    });
  });
  document.querySelectorAll(".mode-rail__opt").forEach(function (btn) {
    btn.addEventListener("click", function () {
      field = btn.getAttribute("data-view") === "rel" ? "rel" : "info";
      setDockUI(audience, field);
      writeState(audience, field);
      applyNarrative(audience, field);
      if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
    });
  });
})();
