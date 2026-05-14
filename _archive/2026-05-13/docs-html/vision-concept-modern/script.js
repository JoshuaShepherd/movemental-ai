/* ============================================================================
   Movemental — Vision concept · MODERN
   Scroll reveal, reading progress, and six reimagined interactive
   visualizations. No external dependencies.
   ============================================================================ */

(function () {
  "use strict";

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------------------------------------------------------------------------
     Shell: year, sticky nav, reading progress, reveal-on-scroll
     --------------------------------------------------------------------------- */

  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const nav = document.querySelector("[data-nav]");
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    if (prefersReduced || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-visible"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
      );
      reveals.forEach((el) => io.observe(el));
    }
  }

  const fill = document.querySelector("[data-reading-fill]");
  if (fill) {
    let ticking = false;
    const update = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct =
        max <= 0
          ? 0
          : Math.max(0, Math.min(100, (window.scrollY / max) * 100));
      fill.style.setProperty("--reading-progress", pct + "%");
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }

  /* ---------------------------------------------------------------------------
     Shared data — mirrors src/components/marketing/ui/types.ts
     --------------------------------------------------------------------------- */

  const DIMENSIONS = [
    {
      id: "tam",
      num: "01",
      label: "Total Addressable Mission",
      title: "The set of people your work can actually reach.",
      body:
        "Not followers, not raw impressions — the audience your ideas could realistically serve. Translations, search visibility, and cross-leader reference are all forces that expand this axis.",
    },
    {
      id: "formation",
      num: "02",
      label: "Formation Capacity",
      title: "The depth and durability of change your system produces.",
      body:
        "Not impressions. Transformation that sticks. Formation capacity grows when pathways, courses, and practice sit on top of an anchored corpus — not when content volume grows.",
    },
    {
      id: "credibility",
      num: "03",
      label: "Online Credibility",
      title:
        "Whether search engines, AI models, and informed readers treat you as a primary source.",
      body:
        "Credibility compounds when books anchor, articles link coherently, transcripts make spoken teaching citable, and translations show scale of readership. This is authority as structure — not performance.",
    },
    {
      id: "amplification",
      num: "04",
      label: "Amplification & Discoverability",
      title:
        "How effectively your ideas surface in the channels that matter.",
      body:
        "Organic search, AI retrieval, citations, recommendations, word of mouth. This is where structure shows up as reach — earned, not bought, and not algorithm-captive.",
    },
    {
      id: "revenue",
      num: "05",
      label: "Revenue",
      title:
        "Sustainable income generated from the work itself.",
      body:
        "Courses, memberships, licensed corpora, partnerships. Not donations or speaking fees alone — the layer that makes it possible to keep doing the work.",
    },
  ];

  const LAYERS = [
    {
      id: "books",
      num: "01",
      label: "Books",
      description:
        "The corpus — structured, searchable, and connected to every downstream surface. The anchor that gives every other layer something to refer to.",
    },
    {
      id: "media",
      num: "02",
      label: "Media Archives",
      description:
        "Talks, interviews, and video organized by theme and linked to the written corpus. High-trust teaching artifacts with long half-life.",
    },
    {
      id: "transcripts",
      num: "03",
      label: "Transcripts",
      description:
        "Spoken content made textual — searchable, citable, and available for AI grounding. The layer that converts lectures into a lasting reference.",
    },
    {
      id: "articles",
      num: "04",
      label: "Core Articles",
      description:
        "Evergreen, SEO-architected pieces that serve as canonical entry points into the leader's thinking. The front door for search and social.",
    },
    {
      id: "pathways",
      num: "05",
      label: "Pathways",
      description:
        "Curated learning sequences that guide people from first encounter to deep formation. The synthesis layer — ideas arranged for human progression.",
    },
    {
      id: "courses",
      num: "06",
      label: "Courses",
      description:
        "Structured, time-bound formation experiences with community, assessment, and support. Rhythm, practice, and cohort — formation with scaffolding.",
    },
    {
      id: "ai",
      num: "07",
      label: "AI",
      description:
        "A grounded AI layer that speaks from the leader's corpus — not the open internet. Access, not replacement.",
    },
    {
      id: "translations",
      num: "08",
      label: "Translations",
      description:
        "The entire system rendered in additional languages — multiplying reach without diluting voice.",
    },
  ];

  const SHAPE_META = {
    "primary-driver":   { label: "Primary driver",   copy: "direct structural cause" },
    "strong-amplifier": { label: "Strong amplifier", copy: "significant multiplier" },
    "enabler":          { label: "Enabler",          copy: "creates the conditions" },
    "indirect":         { label: "Indirect",         copy: "second-order contribution" },
    "minimal":          { label: "Minimal",          copy: "little direct effect" },
  };

  // mirrors DEFAULT_LAYER_IMPACT_MAP
  const IMPACT = {
    books:        { tam: "enabler",         formation: "primary-driver",   credibility: "primary-driver",  amplification: "enabler",         revenue: "indirect" },
    media:        { tam: "strong-amplifier",formation: "enabler",          credibility: "strong-amplifier",amplification: "strong-amplifier",revenue: "indirect" },
    transcripts:  { tam: "enabler",         formation: "indirect",         credibility: "strong-amplifier",amplification: "primary-driver",  revenue: "minimal" },
    articles:     { tam: "primary-driver",  formation: "enabler",          credibility: "primary-driver",  amplification: "primary-driver",  revenue: "enabler" },
    pathways:     { tam: "enabler",         formation: "primary-driver",   credibility: "enabler",         amplification: "enabler",         revenue: "strong-amplifier" },
    courses:      { tam: "indirect",        formation: "primary-driver",   credibility: "enabler",         amplification: "indirect",        revenue: "primary-driver" },
    ai:           { tam: "strong-amplifier",formation: "strong-amplifier", credibility: "enabler",         amplification: "strong-amplifier",revenue: "enabler" },
    translations: { tam: "primary-driver",  formation: "strong-amplifier", credibility: "strong-amplifier",amplification: "primary-driver",  revenue: "strong-amplifier" },
  };

  /* ---------------------------------------------------------------------------
     VIZ 1 — Pentagon of realized capacity
     --------------------------------------------------------------------------- */

  const pentagon = document.querySelector("[data-pentagon]");
  if (pentagon) {
    const detail     = pentagon.querySelector("[data-pentagon-detail]");
    const axisLabel  = pentagon.querySelector("[data-detail-axis]");
    const titleEl    = pentagon.querySelector("[data-detail-title]");
    const bodyEl     = pentagon.querySelector("[data-detail-body]");
    const dotEl      = pentagon.querySelector("[data-detail-dot]");
    const vertices   = pentagon.querySelectorAll(".vertex");
    const spokes     = pentagon.querySelectorAll(".spoke");
    const labels     = pentagon.querySelectorAll("[data-label]");
    const cards      = pentagon.parentElement.querySelectorAll(".dim-card");

    const setActive = (axisId) => {
      if (!axisId) {
        pentagon.classList.remove("is-active");
        vertices.forEach((v) => v.classList.remove("is-active"));
        spokes.forEach((s) => s.classList.remove("is-active"));
        labels.forEach((l) => l.classList.remove("is-active"));
        cards.forEach((c) => c.classList.remove("is-active"));
        return;
      }
      pentagon.classList.add("is-active");
      vertices.forEach((v) => v.classList.toggle("is-active", v.dataset.vertex === axisId));
      spokes.forEach((s) => s.classList.toggle("is-active", s.dataset.spoke === axisId));
      labels.forEach((l) => l.classList.toggle("is-active", l.dataset.label === axisId));
      cards.forEach((c) => c.classList.toggle("is-active", c.dataset.dimCard === axisId));

      const dim = DIMENSIONS.find((d) => d.id === axisId);
      if (dim) {
        axisLabel.textContent = `Axis ${dim.num} · ${dim.label}`;
        titleEl.innerHTML = `<em>${dim.title}</em>`;
        bodyEl.textContent = dim.body;
      }
    };

    // Make vertices keyboard-focusable (SVG circles need tabindex)
    vertices.forEach((v) => {
      v.setAttribute("tabindex", "0");
      v.setAttribute("role", "button");
      v.setAttribute("aria-label", `Highlight ${v.dataset.vertex}`);
      const axisId = v.dataset.vertex;
      v.addEventListener("mouseenter", () => setActive(axisId));
      v.addEventListener("focus", () => setActive(axisId));
      v.addEventListener("click", () => setActive(axisId));
    });
    cards.forEach((c) => {
      const axisId = c.dataset.dimCard;
      c.addEventListener("mouseenter", () => setActive(axisId));
      c.addEventListener("focus", () => setActive(axisId));
      c.addEventListener("click", () => setActive(axisId));
    });

    // Reset on outside interaction
    pentagon.addEventListener("mouseleave", () => setActive(null));
    pentagon.parentElement.addEventListener("mouseleave", (e) => {
      // only if leaving both pentagon + cards
      if (!pentagon.contains(e.relatedTarget) && !pentagon.parentElement.querySelector(".dim-cards")?.contains(e.relatedTarget)) {
        setActive(null);
      }
    });
  }

  /* ---------------------------------------------------------------------------
     VIZ 2 — Experience stack reveal handled by .reveal already
     --------------------------------------------------------------------------- */

  /* ---------------------------------------------------------------------------
     VIZ 3 — Layer × Dimension matrix (signal-bar ladder, expandable rows)
     --------------------------------------------------------------------------- */

  const matrixRows = document.querySelector("[data-mx-rows]");
  if (matrixRows) {
    const buildRow = (layer) => {
      const row = document.createElement("li");
      row.className = "mx__row";
      row.setAttribute("role", "row");
      row.setAttribute("tabindex", "0");
      row.dataset.layer = layer.id;

      // layer column
      const layerCell = document.createElement("div");
      layerCell.className = "mx__layer";
      layerCell.innerHTML =
        `<span class="mx__layer-num">${layer.num}</span>` +
        `<span class="mx__layer-name">${layer.label}</span>`;
      row.appendChild(layerCell);

      // five dimension cells
      DIMENSIONS.forEach((dim) => {
        const shape = IMPACT[layer.id]?.[dim.id] || "minimal";
        const cell = document.createElement("div");
        cell.className = "mx__cell";
        cell.innerHTML =
          `<span class="mx__signal" title="${SHAPE_META[shape].label} · ${dim.label}">` +
            `<span class="mx__signal-track">` +
              `<span class="mx__signal-fill mx__signal-fill--${shape}"></span>` +
            `</span>` +
            `<span class="mx__signal-label">${SHAPE_META[shape].label}</span>` +
          `</span>`;
        row.appendChild(cell);
      });

      // expandable detail
      const detail = document.createElement("div");
      detail.className = "mx__detail";
      const shapeList = DIMENSIONS.map((d) => {
        const shape = IMPACT[layer.id]?.[d.id] || "minimal";
        return (
          `<li>` +
            `<span class="mx__detail-dim">${d.label}</span>` +
            `<span class="mx__detail-shape">${SHAPE_META[shape].label} — ${SHAPE_META[shape].copy}</span>` +
          `</li>`
        );
      }).join("");
      detail.innerHTML =
        `<p class="mx__detail-desc">${layer.description}</p>` +
        `<ul class="mx__detail-list">${shapeList}</ul>`;
      row.appendChild(detail);

      const toggle = () => row.classList.toggle("is-open");
      row.addEventListener("click", toggle);
      row.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
      });
      return row;
    };

    LAYERS.forEach((l) => matrixRows.appendChild(buildRow(l)));
  }

  /* ---------------------------------------------------------------------------
     VIZ 4 — Conclusion beats: reveal handled by .reveal already
     --------------------------------------------------------------------------- */

  /* ---------------------------------------------------------------------------
     VIZ 5 — Orbital ecosystem
     --------------------------------------------------------------------------- */

  const orbit = document.querySelector("[data-orbit]");
  if (orbit) {
    const nodesGroup  = orbit.querySelector("[data-orbit-nodes]");
    const labelsGroup = orbit.querySelector("[data-orbit-labels]");
    const detailEl    = orbit.querySelector("[data-orbit-detail]");
    const titleEl     = orbit.querySelector("[data-orbit-title]");
    const bodyEl      = orbit.querySelector("[data-orbit-body]");
    const ringTagEl   = orbit.querySelector(".orbit__detail-ring");

    const center = { x: 400, y: 400 };
    const ringRadii = { 1: 130, 2: 210, 3: 290, 4: 360 };
    const ringLabels = {
      1: "Ring I · Corpus",
      2: "Ring II · Surface",
      3: "Ring III · Formation",
      4: "Ring IV · Reach",
    };

    const nodes = [
      { id: "books",        ring: 1, angle: -110, label: "Books",        title: "Anchor object — stable spine for the ecosystem.",        body: "The corpus. Structured, searchable, and connected to every downstream surface." },
      { id: "media",        ring: 1, angle:  -30, label: "Media",        title: "High-trust teaching artifacts with long half-life.",    body: "Talks, interviews, and video organized by theme and linked to the written corpus." },
      { id: "transcripts",  ring: 2, angle: -150, label: "Transcripts",  title: "Spoken teaching made quotable and searchable.",          body: "Makes audio- and video-native content citable, indexable, and available for AI grounding." },
      { id: "articles",     ring: 2, angle:  -20, label: "Articles",     title: "Discoverable entry ramps for search and social.",        body: "Evergreen, SEO-architected pieces that serve as canonical entry points." },
      { id: "pathways",     ring: 3, angle: -130, label: "Pathways",     title: "Synthesis layer — ideas arranged for progression.",     body: "Curated journeys across articles, media, and practices." },
      { id: "courses",      ring: 3, angle:  -50, label: "Courses",      title: "Formation with scaffolding — rhythm, practice, cohort.",body: "Structured, time-bound formation with community, assessment, and support." },
      { id: "ai",           ring: 4, angle: -100, label: "AI",           title: "Interaction layer — access, not replacement.",           body: "A grounded AI that answers from the corpus with citations, not generic chat." },
      { id: "translations", ring: 4, angle:  -40, label: "Translations", title: "Multiplier — same argument, new readers.",               body: "Parallel readership without forking the underlying spine." },
    ];

    const NS = "http://www.w3.org/2000/svg";

    const polar = (r, deg) => {
      const rad = (deg * Math.PI) / 180;
      return { x: center.x + r * Math.cos(rad), y: center.y + r * Math.sin(rad) };
    };

    nodes.forEach((n) => {
      const r = ringRadii[n.ring];
      const pos = polar(r, n.angle);

      const circle = document.createElementNS(NS, "circle");
      circle.setAttribute("class", "orbit__node");
      circle.setAttribute("cx", pos.x);
      circle.setAttribute("cy", pos.y);
      circle.setAttribute("r", 16);
      circle.setAttribute("tabindex", "0");
      circle.setAttribute("role", "button");
      circle.setAttribute("aria-label", n.label);
      circle.dataset.nodeId = n.id;
      nodesGroup.appendChild(circle);

      const text = document.createElementNS(NS, "text");
      text.setAttribute("class", "orbit__node-label");
      const labelOffset = 28;
      const pos2 = polar(r + labelOffset, n.angle);
      text.setAttribute("x", pos2.x);
      text.setAttribute("y", pos2.y);
      text.setAttribute("text-anchor", n.angle > -90 && n.angle < 90 ? "start" : "end");
      text.setAttribute("dominant-baseline", "middle");
      text.textContent = n.label;
      text.dataset.labelId = n.id;
      labelsGroup.appendChild(text);
    });

    const rings = orbit.querySelectorAll(".orbit__ring");

    const setActive = (nodeId) => {
      if (!nodeId) {
        orbit.classList.remove("is-active");
        nodesGroup.querySelectorAll(".orbit__node").forEach((n) => n.classList.remove("is-active"));
        labelsGroup.querySelectorAll(".orbit__node-label").forEach((n) => n.classList.remove("is-active"));
        rings.forEach((r) => r.classList.remove("is-active"));
        return;
      }
      const n = nodes.find((x) => x.id === nodeId);
      if (!n) return;
      orbit.classList.add("is-active");
      nodesGroup.querySelectorAll(".orbit__node").forEach((el) => el.classList.toggle("is-active", el.dataset.nodeId === nodeId));
      labelsGroup.querySelectorAll(".orbit__node-label").forEach((el) => el.classList.toggle("is-active", el.dataset.labelId === nodeId));
      rings.forEach((r) => r.classList.toggle("is-active", Number(r.dataset.ring) === n.ring));

      ringTagEl.textContent = ringLabels[n.ring];
      titleEl.innerHTML = `<em>${n.title}</em>`;
      bodyEl.textContent = n.body;
    };

    nodesGroup.querySelectorAll(".orbit__node").forEach((n) => {
      const id = n.dataset.nodeId;
      n.addEventListener("mouseenter", () => setActive(id));
      n.addEventListener("focus", () => setActive(id));
      n.addEventListener("click", () => setActive(id));
    });

    // clicking a ring focuses that ring (deactivates specific node)
    rings.forEach((r) => {
      r.addEventListener("click", () => {
        const ringId = Number(r.dataset.ring);
        orbit.classList.add("is-active");
        rings.forEach((x) => x.classList.toggle("is-active", Number(x.dataset.ring) === ringId));
        nodesGroup.querySelectorAll(".orbit__node").forEach((el) => {
          const node = nodes.find((n) => n.id === el.dataset.nodeId);
          el.classList.toggle("is-active", node.ring === ringId);
        });
        labelsGroup.querySelectorAll(".orbit__node-label").forEach((el) => {
          const node = nodes.find((n) => n.id === el.dataset.labelId);
          el.classList.toggle("is-active", node.ring === ringId);
        });
        ringTagEl.textContent = ringLabels[ringId];
        const ringNodesList = nodes.filter((n) => n.ring === ringId).map((n) => n.label).join(" · ");
        titleEl.innerHTML = `<em>${ringLabels[ringId]}</em>`;
        bodyEl.textContent = `${ringNodesList}. Click a node on this ring to see its role in the ecosystem.`;
      });
    });

    orbit.addEventListener("mouseleave", () => setActive(null));
  }

  /* ---------------------------------------------------------------------------
     VIZ 6 — Field constellation: 100 leaders + 5 backbone concepts
     --------------------------------------------------------------------------- */

  const field = document.querySelector("[data-field]");
  if (field) {
    const svg = field.querySelector("[data-field-svg]");
    const NS = "http://www.w3.org/2000/svg";

    const width = 900;
    const height = 640;

    // seeded PRNG for stable layout
    const seeded = (seed) => {
      let s = seed;
      return () => {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
      };
    };
    const rnd = seeded(42);

    // Backbone concept hubs, positioned around the field
    const hubs = [
      { id: "mission",       label: "Mission",        x: 180, y: 130 },
      { id: "formation",     label: "Formation",      x: 720, y: 140 },
      { id: "leadership",    label: "Leadership",     x: 760, y: 490 },
      { id: "apest",         label: "APEST",          x: 150, y: 500 },
      { id: "incarnational", label: "Incarnational",  x: 450, y: 580 },
    ];

    // 100 leaders — scattered within a central band, jittered from a 10×10 grid
    const leaders = [];
    for (let i = 0; i < 100; i++) {
      const col = i % 10;
      const row = Math.floor(i / 10);
      const gx = 260 + col * 42;
      const gy = 170 + row * 30;
      const jx = (rnd() - 0.5) * 18;
      const jy = (rnd() - 0.5) * 18;
      leaders.push({ id: `l${i}`, i, x: gx + jx, y: gy + jy });
    }

    // Deterministic connections (mirrors sampleFieldKnowledgeGraph rules)
    const edges = []; // { backboneId, leaderId }
    leaders.forEach(({ i }) => {
      if (i % 3 === 0) edges.push({ bb: "mission",       li: i });
      if (i % 4 === 0) edges.push({ bb: "formation",     li: i });
      if (i % 6 === 0) edges.push({ bb: "leadership",    li: i });
      if (i % 7 === 0) edges.push({ bb: "apest",         li: i });
      if (i % 9 === 0) edges.push({ bb: "incarnational", li: i });
    });

    // SVG setup
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    // Draw edges first
    const edgeGroup = document.createElementNS(NS, "g");
    edgeGroup.setAttribute("aria-hidden", "true");
    svg.appendChild(edgeGroup);

    edges.forEach((e, idx) => {
      const hub = hubs.find((h) => h.id === e.bb);
      const lead = leaders[e.li];
      const line = document.createElementNS(NS, "line");
      line.setAttribute("class", `fld-edge fld-edge--${e.bb}`);
      line.setAttribute("x1", hub.x);
      line.setAttribute("y1", hub.y);
      line.setAttribute("x2", lead.x);
      line.setAttribute("y2", lead.y);
      line.dataset.bb = e.bb;
      line.dataset.li = e.li;
      edgeGroup.appendChild(line);
    });

    // Draw leader dots
    const leaderGroup = document.createElementNS(NS, "g");
    svg.appendChild(leaderGroup);
    leaders.forEach((l) => {
      const c = document.createElementNS(NS, "circle");
      c.setAttribute("class", "fld-leader");
      c.setAttribute("cx", l.x);
      c.setAttribute("cy", l.y);
      c.setAttribute("r", 3);
      c.dataset.li = l.i;
      leaderGroup.appendChild(c);
    });

    // Draw hubs on top
    const hubGroup = document.createElementNS(NS, "g");
    svg.appendChild(hubGroup);
    hubs.forEach((h) => {
      const c = document.createElementNS(NS, "circle");
      c.setAttribute("class", `fld-hub fld-hub--${h.id}`);
      c.setAttribute("cx", h.x);
      c.setAttribute("cy", h.y);
      c.setAttribute("r", 14);
      c.dataset.bb = h.id;
      c.setAttribute("tabindex", "0");
      c.setAttribute("role", "button");
      c.setAttribute("aria-label", h.label);
      hubGroup.appendChild(c);

      const t = document.createElementNS(NS, "text");
      t.setAttribute("class", "fld-hub-label");
      t.setAttribute("x", h.x);
      t.setAttribute("y", h.y - 22);
      t.dataset.bb = h.id;
      t.textContent = h.label;
      hubGroup.appendChild(t);
    });

    // Legend counts
    const counts = edges.reduce((acc, e) => {
      acc[e.bb] = (acc[e.bb] || 0) + 1;
      return acc;
    }, {});
    field.querySelectorAll("[data-bb-count]").forEach((el) => {
      const bb = el.dataset.bbCount;
      el.textContent = `· ${counts[bb] || 0} leaders`;
    });

    const legendItems = field.querySelectorAll(".fld-backbone");

    const setActive = (bbId) => {
      if (!bbId) {
        field.classList.remove("is-active");
        edgeGroup.querySelectorAll("line").forEach((l) => l.classList.remove("is-active"));
        leaderGroup.querySelectorAll("circle").forEach((c) => {
          c.classList.remove("is-highlight");
          c.classList.remove(
            "is-highlight-mission",
            "is-highlight-formation",
            "is-highlight-leadership",
            "is-highlight-apest",
            "is-highlight-incarnational"
          );
        });
        hubGroup.querySelectorAll(".fld-hub").forEach((h) => h.classList.remove("is-active"));
        hubGroup.querySelectorAll(".fld-hub-label").forEach((h) => h.classList.remove("is-active"));
        legendItems.forEach((li) => li.classList.remove("is-active"));
        return;
      }
      field.classList.add("is-active");
      const connectedLeaderIds = new Set(
        edges.filter((e) => e.bb === bbId).map((e) => String(e.li))
      );

      edgeGroup.querySelectorAll("line").forEach((l) => {
        l.classList.toggle("is-active", l.dataset.bb === bbId);
      });
      leaderGroup.querySelectorAll("circle").forEach((c) => {
        const isLinked = connectedLeaderIds.has(c.dataset.li);
        c.classList.toggle("is-highlight", isLinked);
        c.classList.toggle(`is-highlight-${bbId}`, isLinked);
      });
      hubGroup.querySelectorAll(".fld-hub").forEach((h) => h.classList.toggle("is-active", h.dataset.bb === bbId));
      hubGroup.querySelectorAll(".fld-hub-label").forEach((h) => h.classList.toggle("is-active", h.dataset.bb === bbId));
      legendItems.forEach((li) => li.classList.toggle("is-active", li.dataset.bb === bbId));
    };

    legendItems.forEach((item) => {
      const id = item.dataset.bb;
      item.addEventListener("mouseenter", () => setActive(id));
      item.addEventListener("focus", () => setActive(id));
      item.addEventListener("click", () => setActive(id));
    });
    hubGroup.querySelectorAll(".fld-hub").forEach((h) => {
      const id = h.dataset.bb;
      h.addEventListener("mouseenter", () => setActive(id));
      h.addEventListener("focus", () => setActive(id));
      h.addEventListener("click", () => setActive(id));
    });

    field.addEventListener("mouseleave", () => setActive(null));
  }
})();
