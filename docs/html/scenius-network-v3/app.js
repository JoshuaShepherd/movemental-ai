/**
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
  var activeAudienceFilters = new Set();
  var lastNodeGroupForFilters = null;

  function strengthRank(s) {
    var m = { none: 0, light: 1, moderate: 2, strong: 3 };
    return m[s] || 0;
  }

  function matchesAudienceFilters(d) {
    if (activeAudienceFilters.size === 0) return true;
    if (!d.imageUrl) return false;
    if (d.researchPending) return true;
    var cred = d.audienceCredentials;
    if (!cred || !cred.segments) return false;
    var segs = cred.segments;
    var it = activeAudienceFilters.values();
    var next;
    while (!(next = it.next()).done) {
      if (strengthRank(segs[next.value]) >= strengthRank("moderate")) return true;
    }
    return false;
  }

  function applyAudienceOpacity(sel) {
    sel.attr("opacity", function (n) {
      return matchesAudienceFilters(n) ? 1 : 0.32;
    });
  }

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
    var credHost = document.getElementById("hp-credentials");
    credHost.innerHTML = "";
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
    if (d.researchPending) {
      var p = document.createElement("p");
      p.textContent =
        "Audience-specific EEAT credentials are not mapped for this profile yet.";
      credHost.appendChild(p);
    } else if (d.audienceCredentials && d.audienceCredentials.segments) {
      var order = ["churches", "nonprofits", "institutions"];
      var labels = {
        churches: "Churches",
        nonprofits: "Nonprofits",
        institutions: "Institutions",
      };
      var rankLabel = {
        none: "—",
        light: "Light",
        moderate: "Moderate",
        strong: "Strong",
      };
      var segs = d.audienceCredentials.segments;
      var sums = d.audienceCredentials.summaries || {};
      order.forEach(function (key) {
        var st = segs[key];
        if (!st) return;
        var div = document.createElement("div");
        div.className = "cred-line";
        var head = document.createElement("div");
        head.innerHTML =
          '<span class="cred-label">' +
          labels[key] +
          "</span> · " +
          rankLabel[st];
        div.appendChild(head);
        if (sums[key]) {
          var sub = document.createElement("div");
          sub.style.opacity = "0.88";
          sub.textContent = sums[key];
          div.appendChild(sub);
        }
        credHost.appendChild(div);
      });
    }
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

    lastNodeGroupForFilters = nodeGroup;
    applyAudienceOpacity(nodeGroup);

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
        applyAudienceOpacity(nodeGroup);
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

  document.querySelectorAll("#audience-filters input[type=checkbox]").forEach(function (el) {
    el.addEventListener("change", function () {
      activeAudienceFilters.clear();
      document.querySelectorAll("#audience-filters input[type=checkbox]").forEach(function (box) {
        if (box.checked) activeAudienceFilters.add(box.getAttribute("data-audience"));
      });
      if (lastNodeGroupForFilters) applyAudienceOpacity(lastNodeGroupForFilters);
    });
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
