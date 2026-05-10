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

# Snapshot from supporting-lib-data.ts (topics + leaders only)
TOPICS = [
    {"slug": "formation", "name": "Formation", "description": "Spiritual and character development.", "leaderCount": 12, "contentCount": 45},
    {"slug": "leadership", "name": "Leadership", "description": "Guiding organizations and movements.", "leaderCount": 18, "contentCount": 62},
    {"slug": "psychology", "name": "Psychology", "description": "Understanding the human mind and behavior.", "leaderCount": 8, "contentCount": 24},
    {"slug": "movement", "name": "Movement", "description": "Catalyzing and sustaining decentralized growth.", "leaderCount": 15, "contentCount": 51},
    {"slug": "theology", "name": "Theology", "description": "The study of the nature of God and religious belief.", "leaderCount": 22, "contentCount": 89},
    {"slug": "creativity", "name": "Creativity", "description": "Innovation, art, and expression.", "leaderCount": 10, "contentCount": 33},
    {"slug": "justice", "name": "Justice", "description": "Advocating for equity and systemic change.", "leaderCount": 14, "contentCount": 48},
    {"slug": "worship", "name": "Worship", "description": "Liturgical and contemporary expressions of faith.", "leaderCount": 9, "contentCount": 27},
]

LEADERS = [
    {
        "id": "1",
        "name": "Alan Hirsch",
        "role": "Theologian & Author",
        "bio": "Dr. Sarah Chen is a leading voice at the intersection of systematic theology and cultural anthropology. Her work focuses on how ancient texts speak to modern crises of meaning.",
        "imageUrl": f"{VOICES_MEDIA_BASE}alan-hirsch.webp",
        "topics": ["theology", "culture"],
        "themes": ["kingdom-mission"],
        "connections": ["2", "4"],
        "organization": "Center for Public Theology",
        "books": [{"slug": "the-meaning-crisis", "title": "The Meaning Crisis", "year": "2023", "coverUrl": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=600"}],
    },
    {
        "id": "2",
        "name": "Brad Brisco",
        "role": "Movement Practitioner",
        "bio": "Marcus Weaver has spent two decades catalyzing decentralized movements in urban contexts. He writes about polycentric leadership and network dynamics.",
        "imageUrl": f"{VOICES_MEDIA_BASE}brad-brisco.webp",
        "topics": ["movement", "leadership"],
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
        "topics": ["psychology", "formation"],
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
        "topics": ["justice", "theology"],
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
        "topics": ["creativity", "worship"],
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
        "topics": ["theology"],
        "themes": ["missional-church"],
        "connections": ["1"],
        "books": [],
    },
]

INDEX_HTML = """<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>The Scenius — v3 (reference v2 static remake)</title>
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
          <span class="legend-muted">Extended Network</span>
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

STYLES_CSS = """/* Reference: v2 SceniusGraph — sage / snow palette */
:root {
  --sage-950: #101916;
  --sage-900: #1a2820;
  --sage-800: #243028;
  --snow-300: #d1d5db;
  --snow-400: #9ca3af;
  --snow-500: #6b7280;
  --snow-700: #374151;
  --snow-800: #1f2937;
  --scarlet-400: #f87171;
  --scarlet-300: #fca5a5;
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
  background: var(--sage-950);
  color: var(--snow-300);
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
  font-family: Georgia, "Times New Roman", serif;
  font-size: 2.25rem;
  font-weight: 400;
  color: #fff;
  margin: 0 0 1rem;
}

.context-panel .blurb {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--snow-400);
  background: rgba(16, 25, 22, 0.8);
  backdrop-filter: blur(8px);
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(31, 41, 55, 0.5);
  margin: 0;
}

.controls-panel {
  position: absolute;
  bottom: 3rem;
  left: 1.5rem;
  z-index: 10;
  background: rgba(26, 40, 32, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(31, 41, 55, 0.5);
  border-radius: 0.75rem;
  padding: 1rem;
  max-width: 16rem;
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
  color: var(--snow-300);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.link-btn {
  font-size: 0.75rem;
  color: var(--scarlet-400);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.link-btn:hover {
  color: var(--scarlet-300);
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
  color: var(--snow-400);
}

.legend-extended {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(31, 41, 55, 0.5);
}

.dot-extended {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 999px;
  background: var(--sage-800);
  border: 1px solid var(--snow-700);
}

.legend-muted {
  font-size: 0.75rem;
  color: var(--snow-500);
}

.hover-panel {
  position: absolute;
  bottom: 3rem;
  right: 1.5rem;
  z-index: 10;
  background: var(--sage-900);
  border: 1px solid rgba(55, 65, 81, 0.5);
  border-radius: 0.75rem;
  padding: 1.5rem;
  max-width: 20rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.35);
  pointer-events: none;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.2s ease, transform 0.2s ease;
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
  font-family: Georgia, serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: #fff;
  margin: 0 0 0.25rem;
}

.hp-role {
  font-size: 0.875rem;
  color: var(--scarlet-400);
  margin: 0 0 0.75rem;
}

.topic-chip {
  display: inline-block;
  font-size: 10px;
  padding: 0.25rem 0.5rem;
  margin: 0 0.35rem 0.35rem 0;
  background: var(--sage-950);
  color: var(--snow-400);
  border-radius: 0.25rem;
  border: 1px solid rgba(31, 41, 55, 0.5);
  text-transform: capitalize;
}

.hp-hint {
  font-size: 0.75rem;
  color: var(--snow-500);
  margin: 1rem 0 0;
  padding-top: 1rem;
  border-top: 1px solid rgba(31, 41, 55, 0.5);
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
  color: var(--snow-500);
  background: rgba(16, 25, 22, 0.92);
  border-top: 1px solid rgba(31, 41, 55, 0.35);
  z-index: 20;
}
"""

APP_JS = r"""/**
 * scenius-graph.tsx (v2 reference) — imperative D3 port
 */
(function () {
  "use strict";

  var PACK = window.__SCIENIUS_V3_DATA__;
  var COLOR_RANGE = ["#DC2626", "#E11D48", "#BE123C", "#9F1239", "#881337", "#4C1D95", "#5B21B6", "#6D28D9"];
  var LEGEND_COLORS = ["#DC2626", "#E11D48", "#BE123C", "#9F1239"];

  var showLabels = true;
  var simulation = null;

  function generateGraphData(leaders, topics) {
    var TARGET_TOTAL_NODES = 100;

    var nodes = leaders.map(function (l) {
      var copy = {};
      for (var k in l) copy[k] = l[k];
      copy.group = l.topics[0] || "general";
      copy.radius = 20;
      return copy;
    });
    var links = [];

    leaders.forEach(function (source) {
      source.connections.forEach(function (targetId) {
        links.push({ source: source.id, target: targetId, value: 2 });
      });
    });

    var extraCount = Math.max(0, TARGET_TOTAL_NODES - leaders.length);
    for (var i = 0; i < extraCount; i++) {
      var id = "extra-" + i;
      var randomTopic = topics[Math.floor(Math.random() * topics.length)].slug;
      var targetPool = nodes;
      var targetId = targetPool[Math.floor(Math.random() * targetPool.length)].id;

      nodes.push({
        id: id,
        name: "",
        role: "",
        bio: "",
        imageUrl: "",
        topics: [randomTopic],
        themes: [],
        connections: [],
        books: [],
        group: randomTopic,
        radius: 8 + Math.random() * 8,
      });

      links.push({ source: id, target: targetId, value: 1 });
    }

    return { nodes: nodes, links: links };
  }

  function buildLegend(topics) {
    var host = document.getElementById("legend-topics");
    host.innerHTML = "";
    topics.slice(0, 4).forEach(function (topic, i) {
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

    var data = generateGraphData(leaders, topics);

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
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#1F2937").attr("stop-opacity", 0.3);
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#0F172A").attr("stop-opacity", 0);

    svg.append("rect").attr("width", width).attr("height", height).style("fill", "url(#bg-gradient)");

    var g = svg.append("g");

    var zoom = d3
      .zoom()
      .scaleExtent([0.5, 4])
      .on("zoom", function (event) {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    var colorScale = d3.scaleOrdinal().domain(topics.map(function (t) { return t.slug; })).range(COLOR_RANGE);
    colorScale.unknown("#DC2626");

    simulation = d3
      .forceSimulation(data.nodes)
      .force(
        "link",
        d3.forceLink(data.links).id(function (d) { return d.id; }).distance(function (l) { return l.value >= 2 ? 95 : 72; })
      )
      .force("charge", d3.forceManyBody().strength(-320))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius(function (d) { return d.radius + 8; }).iterations(3));

    var link = g
      .append("g")
      .attr("stroke", "#374151")
      .attr("stroke-opacity", 0.4)
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke-width", function (d) { return Math.sqrt(d.value); });

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
          .attr("fill", "#1F2937")
          .attr("stroke", "#374151")
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
          .attr("stroke", "#fff")
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
              return l.source.id === d.id || l.target.id === d.id ? "#DC2626" : "#374151";
            })
            .attr("stroke-opacity", function (l) {
              return l.source.id === d.id || l.target.id === d.id ? 1 : 0.1;
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
        link.attr("stroke", "#374151").attr("stroke-opacity", 0.4);
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
      .style("fill", "#D1D5DB")
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
