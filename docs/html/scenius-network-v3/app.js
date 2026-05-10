/**
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
