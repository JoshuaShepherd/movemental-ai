#!/usr/bin/env python3
"""
Emit docs/html/scenius-network-v3/ — static remake of
docs/reference/scenius-network-visualization/v2-movemental-latest/scenius-graph.tsx
+ supporting-lib-data.ts (leaders + topics only).

Run: python3 scripts/generate-scenius-network-v3-html.py
"""
from __future__ import annotations

import json
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
OUT = REPO / "docs/html/scenius-network-v3"

# Public voice headshots (same bucket as `src/data/home-data.ts` VOICES images)
VOICES_MEDIA_BASE = (
    "https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/"
    "media-library/movemental/voices/"
)

# Audience segments — legend + placeholder topic assignment for extras (Movemental IA)
TOPICS = [
    {"slug": "church", "name": "Church", "description": "Congregations and church networks.", "leaderCount": 0, "contentCount": 0},
    {"slug": "nonprofit", "name": "NonProfit", "description": "Nonprofit and mission-driven organizations.", "leaderCount": 0, "contentCount": 0},
    {"slug": "institution", "name": "Institution", "description": "Institutions and enterprise-scale organizations.", "leaderCount": 0, "contentCount": 0},
]

LEADERS = [
    {
        "id": "1",
        "name": "Alan Hirsch",
        "role": "Theologian & Author",
        "bio": "Dr. Sarah Chen is a leading voice at the intersection of systematic theology and cultural anthropology. Her work focuses on how ancient texts speak to modern crises of meaning.",
        "imageUrl": f"{VOICES_MEDIA_BASE}alan-hirsch.webp",
        "topics": ["church"],
        "themes": ["kingdom-mission"],
        "connections": ["2", "4"],
        "organization": "Center for Public Theology",
        "books": [{"slug": "the-meaning-crisis", "title": "The Meaning Crisis", "year": "2023", "coverUrl": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=600"}],
    },
    {
        "id": "2",
        "name": "Dr. Brad Brisco",
        "role": "CEO & Co-founder, Movemental",
        "bio": "Marcus Weaver has spent two decades catalyzing decentralized movements in urban contexts. He writes about polycentric leadership and network dynamics.",
        "imageUrl": f"{VOICES_MEDIA_BASE}brad-brisco.webp",
        "topics": ["church"],
        "themes": ["apest", "missional-church"],
        "connections": ["1", "3", "5"],
        "organization": "Urban Catalyst Network",
        "books": [
            {"slug": "decentralized", "title": "Decentralized", "year": "2021", "coverUrl": "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400&h=600"},
            {"slug": "the-polycentric-church", "title": "The Polycentric Church", "year": "2024", "coverUrl": "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400&h=600"},
        ],
    },
    {
        "id": "3",
        "name": "Joshua Shepherd",
        "role": "Author & Psychologist",
        "bio": "Elena integrates clinical psychology with spiritual formation, helping leaders navigate burnout, trauma, and the emotional weight of movement leadership.",
        "imageUrl": f"{VOICES_MEDIA_BASE}josh-shepherd.webp",
        "topics": ["nonprofit"],
        "themes": ["spiritual-formation"],
        "connections": ["2", "4"],
        "books": [{"slug": "leading-from-the-deep", "title": "Leading from the Deep", "year": "2022", "coverUrl": "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=400&h=600"}],
    },
    {
        "id": "4",
        "name": "Tim Catchim",
        "role": "Academic & Practitioner",
        "bio": "David bridges the gap between the academy and the streets, focusing on systemic justice and the theology of the city.",
        "imageUrl": f"{VOICES_MEDIA_BASE}tim-catchim.webp",
        "topics": ["church"],
        "themes": ["kingdom-mission", "missional-church"],
        "connections": ["1", "3"],
        "organization": "Institute for Urban Justice",
        "books": [{"slug": "city-of-god-city-of-man", "title": "City of God, City of Man", "year": "2020", "coverUrl": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400&h=600"}],
    },
    {
        "id": "5",
        "name": "Dr. JR Woodward",
        "role": "Creative Director",
        "bio": "Aisha explores the intersection of liturgy, art, and embodied worship. She designs experiences that form communities through beauty.",
        "imageUrl": f"{VOICES_MEDIA_BASE}jr-woodward.webp",
        "topics": ["nonprofit"],
        "themes": ["spiritual-formation"],
        "connections": ["2"],
        "books": [],
    },
    {
        "id": "6",
        "name": "Dr. Rowland Smith",
        "role": "Theologian",
        "bio": "Focusing on historical theology and its implications for modern ecclesiology.",
        "imageUrl": f"{VOICES_MEDIA_BASE}rowland-smith.webp",
        "topics": ["institution"],
        "themes": ["missional-church"],
        "connections": ["1"],
        "books": [],
    },
    {
        "id": "7",
        "name": "Lucas Pulley",
        "role": "Movements Director, Underground Network",
        "bio": "Lucas Pulley leads movement formation with the Underground Network — microchurch practice, neighborhood presence, and systems thinking shaped by years in the field.",
        "imageUrl": f"{VOICES_MEDIA_BASE}lucas-pulley.webp",
        "topics": ["church"],
        "themes": ["missional-church"],
        "connections": ["2", "4"],
        "organization": "Underground Network",
        "books": [],
    },
]

INDEX_HTML = """<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>The Scenius — v3 (reference v2 static remake)</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <div class="page">
      <div class="context-panel">
        <h1>The Scenius</h1>
        <p class="blurb">
          This is the Movemental credibility graph — a living map of how movement leaders reference,
          reinforce, and amplify one another&apos;s work.
        </p>
      </div>

      <div class="controls-panel">
        <div class="controls-head">
          <span class="controls-label">Controls</span>
          <button type="button" id="toggle-labels" class="link-btn">Hide Labels</button>
        </div>
        <div id="legend-topics"></div>
        <div class="legend-extended">
          <span class="dot-extended"></span>
          <span class="legend-muted">Remaining Movement Leader Seats</span>
        </div>
      </div>

      <div id="hover-panel" class="hover-panel" aria-hidden="true">
        <h2 id="hp-name"></h2>
        <p id="hp-role" class="hp-role"></p>
        <div id="hp-topics"></div>
        <p class="hp-hint">Click to view full profile</p>
      </div>

      <div id="graph-host" class="graph-host">
        <svg id="viz"></svg>
      </div>
    </div>

    <p class="foot-note">
      Static remake of <code>docs/reference/scenius-network-visualization/v2-movemental-latest/scenius-graph.tsx</code>.
      Serve from repo root: <code>python3 -m http.server 8080</code> →
      <code>/docs/html/scenius-network-v3/</code>
    </p>

    <script src="https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js"></script>
    <script src="./scenius-graph-data-embedded.js"></script>
    <script src="./app.js"></script>
  </body>
</html>
"""

STYLES_CSS = """/* Movemental — midnight band + brand blue (globals.css / DESIGN.md) */
:root {
  --inverse-surface: #141110;
  --inverse-foreground: #f4efe5;
  --inverse-muted: rgba(244, 239, 229, 0.68);
  --inverse-border: rgba(244, 239, 229, 0.14);
  --brand-blue: #0053db;
  --brand-blue-dim: rgba(0, 83, 219, 0.65);
  --glass-fill: rgba(20, 17, 16, 0.82);
  --shadow-ambient: 0 12px 40px rgba(42, 52, 57, 0.12);
  --pt-top: 5rem;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  height: 100%;
}

body {
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  background: var(--inverse-surface);
  color: var(--inverse-foreground);
  overflow: hidden;
}

.page {
  position: relative;
  width: 100%;
  height: 100vh;
  padding-top: var(--pt-top);
  overflow: hidden;
}

.context-panel {
  position: absolute;
  top: calc(var(--pt-top) + 3rem);
  left: 1.5rem;
  z-index: 10;
  max-width: 24rem;
  pointer-events: none;
}

@media (min-width: 1024px) {
  .context-panel {
    left: 3rem;
  }
}

.context-panel h1 {
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  font-size: 2.25rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--inverse-foreground);
  margin: 0 0 1rem;
}

.context-panel .blurb {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--inverse-muted);
  background: var(--glass-fill);
  backdrop-filter: blur(10px);
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid var(--inverse-border);
  margin: 0;
  box-shadow: var(--shadow-ambient);
}

.controls-panel {
  position: absolute;
  bottom: 3rem;
  left: 1.5rem;
  z-index: 10;
  background: var(--glass-fill);
  backdrop-filter: blur(12px);
  border: 1px solid var(--inverse-border);
  border-radius: 0.75rem;
  padding: 1rem;
  max-width: 19rem;
}

@media (min-width: 1024px) {
  .controls-panel {
    left: 3rem;
  }
}

.controls-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.controls-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--inverse-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.link-btn {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--brand-blue);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.link-btn:hover {
  color: var(--brand-blue-dim);
}

.legend-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.legend-dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 999px;
  flex-shrink: 0;
}

.legend-name {
  font-size: 0.75rem;
  color: var(--inverse-muted);
}

.legend-extended {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--inverse-border);
}

.dot-extended {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 999px;
  flex-shrink: 0;
  margin-top: 0.15rem;
  background: rgba(244, 239, 229, 0.08);
  border: 1px solid var(--inverse-border);
}

.legend-muted {
  font-size: 0.75rem;
  line-height: 1.45;
  color: var(--inverse-muted);
}

.hover-panel {
  position: absolute;
  bottom: 3rem;
  right: 1.5rem;
  z-index: 10;
  background: var(--glass-fill);
  border: 1px solid var(--inverse-border);
  border-radius: 0.75rem;
  padding: 1.5rem;
  max-width: 20rem;
  box-shadow: var(--shadow-ambient);
  pointer-events: none;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.2s ease, transform 0.2s ease;
  backdrop-filter: blur(12px);
}

.hover-panel.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (min-width: 1024px) {
  .hover-panel {
    right: 3rem;
  }
}

.hover-panel h2 {
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  font-size: 1.375rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--inverse-foreground);
  margin: 0 0 0.25rem;
}

.hp-role {
  font-size: 0.875rem;
  color: var(--inverse-muted);
  margin: 0 0 0.75rem;
}

.topic-chip {
  display: inline-block;
  font-size: 10px;
  padding: 0.25rem 0.5rem;
  margin: 0 0.35rem 0.35rem 0;
  background: rgba(244, 239, 229, 0.06);
  color: var(--inverse-muted);
  border-radius: 0.25rem;
  border: 1px solid var(--inverse-border);
  text-transform: capitalize;
}

.hp-hint {
  font-size: 0.75rem;
  color: var(--inverse-muted);
  margin: 1rem 0 0;
  padding-top: 1rem;
  border-top: 1px solid var(--inverse-border);
}

.graph-host {
  width: 100%;
  height: calc(100vh - var(--pt-top));
  cursor: move;
}

.graph-host svg {
  width: 100%;
  height: 100%;
  display: block;
}

.foot-note {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0.35rem 1rem;
  font-size: 10px;
  color: var(--inverse-muted);
  background: rgba(20, 17, 16, 0.94);
  border-top: 1px solid var(--inverse-border);
  z-index: 20;
}
"""

APP_JS = r"""/**
 * scenius-graph.tsx (v2 reference) — imperative D3 port
 */
(function () {
  "use strict";

  var PACK = window.__SCIENIUS_V3_DATA__;
  /* Church → brand blue; NonProfit → pathway gold; Institution → signal sage (site tokens) */
  var LEGEND_COLORS = ["#0053db", "#b8893a", "#6b7e3f"];
  var EDGE_STROKE = "rgba(244, 239, 229, 0.13)";
  var EDGE_HIGHLIGHT = "#0053db";
  var NODE_FILL_EMPTY = "rgba(244, 239, 229, 0.07)";
  var NODE_STROKE_EMPTY = "rgba(244, 239, 229, 0.18)";
  var NODE_RING_PORTRAIT = "rgba(244, 239, 229, 0.88)";
  var LABEL_FILL = "rgba(244, 239, 229, 0.88)";

  /** Fixed seed → deterministic extras (topic assignment + radii). */
  var SCIENIUS_V3_SEED = 0xc0010203;

  var showLabels = true;
  var simulation = null;

  function mulberry32(seed) {
    return function () {
      var t = (seed += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /** Full mesh: default view. Distinct / curated edges can be layered in a future overlay. */
  function buildCompleteGraphLinks(nodes) {
    var links = [];
    var n = nodes.length;
    for (var i = 0; i < n; i++) {
      for (var j = i + 1; j < n; j++) {
        links.push({ source: nodes[i].id, target: nodes[j].id, value: 1 });
      }
    }
    return links;
  }

  /**
   * Elliptical golden spiral + deterministic jitter — breaks perfect circle read,
   * uses most of the viewport. Portrait nodes bias slightly inward (hub seeds).
   */
  function seedNodePositions(nodes, width, height) {
    var cx = width / 2;
    var cy = height / 2;
    var rx = width * 0.49;
    var ry = height * 0.44;
    var n = nodes.length;
    var golden = 2.39996322972865332;
    var jitterRng = mulberry32((SCIENIUS_V3_SEED ^ 0x85ebca6b) >>> 0);
    for (var i = 0; i < n; i++) {
      var d = nodes[i];
      var angle = i * golden + (jitterRng() - 0.5) * 0.62;
      var t = Math.sqrt((i + 0.5) / n);
      var hubPull = d.imageUrl ? 0.68 : 1.06;
      var radial = t * hubPull * (0.86 + jitterRng() * 0.26);
      d.x = cx + Math.cos(angle) * rx * radial;
      d.y = cy + Math.sin(angle) * ry * radial;
    }
  }

  var graphTopologyCache = { key: "", data: null };

  function getTopology(leaders, topics) {
    var key = leaders.length + "|" + leaders
      .map(function (l) {
        return l.id;
      })
      .join(",");
    if (graphTopologyCache.key === key && graphTopologyCache.data) {
      return graphTopologyCache.data;
    }
    graphTopologyCache.key = key;
    graphTopologyCache.data = generateGraphData(leaders, topics);
    return graphTopologyCache.data;
  }

  function generateGraphData(leaders, topics) {
    var TARGET_TOTAL_NODES = 100;
    var rng = mulberry32(SCIENIUS_V3_SEED >>> 0);

    var nodes = leaders.map(function (l) {
      var copy = {};
      for (var k in l) copy[k] = l[k];
      copy.group = l.topics[0] || "general";
      copy.radius = 20;
      return copy;
    });

    var extraCount = Math.max(0, TARGET_TOTAL_NODES - leaders.length);
    var ti = topics.length;
    for (var i = 0; i < extraCount; i++) {
      var id = "extra-" + i;
      var topicSlug = topics[Math.floor(rng() * ti)].slug;
      nodes.push({
        id: id,
        name: "",
        role: "",
        bio: "",
        imageUrl: "",
        topics: [topicSlug],
        themes: [],
        connections: [],
        books: [],
        group: topicSlug,
        radius: 8 + rng() * 8,
      });
    }

    var links = buildCompleteGraphLinks(nodes);
    return { nodes: nodes, links: links };
  }

  function buildLegend(topics) {
    var host = document.getElementById("legend-topics");
    host.innerHTML = "";
    topics.slice(0, 3).forEach(function (topic, i) {
      var row = document.createElement("div");
      row.className = "legend-row";
      var dot = document.createElement("span");
      dot.className = "legend-dot";
      dot.style.backgroundColor = LEGEND_COLORS[i];
      var name = document.createElement("span");
      name.className = "legend-name";
      name.textContent = topic.name;
      row.appendChild(dot);
      row.appendChild(name);
      host.appendChild(row);
    });
  }

  function setHoverPanel(d, visible) {
    var panel = document.getElementById("hover-panel");
    if (!visible || !d) {
      panel.classList.remove("is-visible");
      panel.setAttribute("aria-hidden", "true");
      return;
    }
    panel.classList.add("is-visible");
    panel.setAttribute("aria-hidden", "false");
    document.getElementById("hp-name").textContent = d.name;
    document.getElementById("hp-role").textContent = d.role;
    var th = document.getElementById("hp-topics");
    th.innerHTML = "";
    (d.topics || []).forEach(function (t) {
      var span = document.createElement("span");
      span.className = "topic-chip";
      span.textContent = t;
      th.appendChild(span);
    });
  }

  function runGraph() {
    var svgEl = document.getElementById("viz");
    var container = document.getElementById("graph-host");
    if (!PACK || !svgEl || !container) return;

    var leaders = PACK.leaders;
    var topics = PACK.topics;
    buildLegend(topics);

    var width = container.clientWidth || 800;
    var height = container.clientHeight || 600;

    var data = getTopology(leaders, topics);
    seedNodePositions(data.nodes, width, height);

    if (simulation) simulation.stop();
    d3.select(svgEl).selectAll("*").remove();

    var svg = d3
      .select(svgEl)
      .attr("viewBox", [0, 0, width, height])
      .style("max-width", "100%")
      .style("height", "auto");

    var defs = svg.append("defs");
    var gradient = defs
      .append("radialGradient")
      .attr("id", "bg-gradient")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "50%");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#0053db").attr("stop-opacity", 0.14);
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#141110").attr("stop-opacity", 0);

    svg.append("rect").attr("width", width).attr("height", height).style("fill", "url(#bg-gradient)");

    var g = svg.append("g");

    var zoom = d3
      .zoom()
      .scaleExtent([0.5, 4])
      .on("zoom", function (event) {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    var linkBaseOpacity = 0.095;
    var linkBaseWidth = 0.48;

    var dim = Math.min(width, height);
    var radialPortrait = dim * 0.13;
    var radialExtra = dim * 0.39;

    simulation = d3
      .forceSimulation(data.nodes)
      .force(
        "link",
        d3
          .forceLink(data.links)
          .id(function (d) {
            return d.id;
          })
          .distance(46)
          .strength(0.028)
      )
      .force(
        "charge",
        d3.forceManyBody().strength(function (d) {
          return d.imageUrl ? -395 : -705;
        })
      )
      .force("center", d3.forceCenter(width / 2, height / 2).strength(0.065))
      .force(
        "radial",
        d3
          .forceRadial(function (d) {
            return d.imageUrl ? radialPortrait : radialExtra;
          }, width / 2, height / 2)
          .strength(0.078)
      )
      .force("collide", d3.forceCollide().radius(function (d) { return d.radius + (d.imageUrl ? 10 : 7); }).iterations(3))
      .alphaDecay(0.041);

    var link = g
      .append("g")
      .attr("stroke", EDGE_STROKE)
      .attr("stroke-opacity", linkBaseOpacity)
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke-width", linkBaseWidth);

    var nodeGroup = g
      .append("g")
      .selectAll("g")
      .data(data.nodes)
      .join("g")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    nodeGroup.each(function (d) {
      var sel = d3.select(this);
      if (!d.imageUrl) {
        sel
          .append("circle")
          .attr("r", d.radius)
          .attr("fill", NODE_FILL_EMPTY)
          .attr("stroke", NODE_STROKE_EMPTY)
          .attr("stroke-width", 1)
          .style("pointer-events", "none");
      } else {
        var clipId = "scenius-clip-" + String(d.id).replace(/[^a-zA-Z0-9_-]/g, "_");
        defs
          .append("clipPath")
          .attr("id", clipId)
          .append("circle")
          .attr("r", d.radius)
          .attr("cx", 0)
          .attr("cy", 0);
        sel
          .append("image")
          .attr("href", d.imageUrl)
          .attr("x", -d.radius)
          .attr("y", -d.radius)
          .attr("width", d.radius * 2)
          .attr("height", d.radius * 2)
          .attr("preserveAspectRatio", "xMidYMid slice")
          .attr("clip-path", "url(#" + clipId + ")")
          .style("pointer-events", "none");
        sel
          .append("circle")
          .attr("r", d.radius)
          .attr("fill", "none")
          .attr("stroke", NODE_RING_PORTRAIT)
          .attr("stroke-width", 2)
          .style("pointer-events", "none");
      }
      sel
        .append("circle")
        .attr("r", d.radius)
        .attr("fill", "transparent")
        .attr("stroke", "none")
        .style("pointer-events", "all");
    });

    nodeGroup
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        if (d.imageUrl) {
          setHoverPanel(d, true);
          link
            .attr("stroke", function (l) {
              return l.source.id === d.id || l.target.id === d.id ? EDGE_HIGHLIGHT : EDGE_STROKE;
            })
            .attr("stroke-opacity", function (l) {
              return l.source.id === d.id || l.target.id === d.id ? 0.55 : linkBaseOpacity * 0.35;
            })
            .attr("stroke-width", function (l) {
              return l.source.id === d.id || l.target.id === d.id ? 0.85 : linkBaseWidth;
            });
          nodeGroup.attr("opacity", function (n) {
            return n.id === d.id ||
              data.links.some(function (l) {
                return (
                  (l.source.id === d.id && l.target.id === n.id) ||
                  (l.target.id === d.id && l.source.id === n.id)
                );
              })
              ? 1
              : 0.2;
          });
        }
      })
      .on("mouseout", function () {
        setHoverPanel(null, false);
        link.attr("stroke", EDGE_STROKE).attr("stroke-opacity", linkBaseOpacity).attr("stroke-width", linkBaseWidth);
        nodeGroup.attr("opacity", 1);
      })
      .on("click", function (event, d) {
        if (d.imageUrl) {
          window.location.hash = "#/profile/" + d.id;
        }
      });

    var labelSel = nodeGroup
      .append("text")
      .text(function (d) {
        return d.imageUrl && showLabels ? d.name : "";
      })
      .attr("x", function (d) { return d.radius + 5; })
      .attr("y", 4)
      .style("font-family", "Inter, sans-serif")
      .style("font-size", "10px")
      .style("fill", LABEL_FILL)
      .style("pointer-events", "none");

    simulation.on("tick", function () {
      link
        .attr("x1", function (d) { return d.source.x; })
        .attr("y1", function (d) { return d.source.y; })
        .attr("x2", function (d) { return d.target.x; })
        .attr("y2", function (d) { return d.target.y; });

      nodeGroup.attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });
    });

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    window.__sceniusV3SyncLabels = function () {
      labelSel.text(function (d) {
        return d.imageUrl && showLabels ? d.name : "";
      });
    };
  }

  document.getElementById("toggle-labels").addEventListener("click", function () {
    showLabels = !showLabels;
    this.textContent = showLabels ? "Hide Labels" : "Show Labels";
    if (typeof window.__sceniusV3SyncLabels === "function") window.__sceniusV3SyncLabels();
  });

  var resizeScheduled = false;
  window.addEventListener("resize", function () {
    if (resizeScheduled) return;
    resizeScheduled = true;
    requestAnimationFrame(function () {
      resizeScheduled = false;
      runGraph();
    });
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runGraph);
  } else {
    runGraph();
  }
})();
"""


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    payload = {"topics": TOPICS, "leaders": LEADERS}
    (OUT / "scenius-graph-data-embedded.js").write_text(
        "window.__SCIENIUS_V3_DATA__ = " + json.dumps(payload) + ";\n",
        encoding="utf-8",
    )
    (OUT / "index.html").write_text(INDEX_HTML, encoding="utf-8")
    (OUT / "styles.css").write_text(STYLES_CSS, encoding="utf-8")
    (OUT / "app.js").write_text(APP_JS, encoding="utf-8")
    print(f"Wrote {OUT}/ (index.html, styles.css, app.js, scenius-graph-data-embedded.js)")


if __name__ == "__main__":
    main()
