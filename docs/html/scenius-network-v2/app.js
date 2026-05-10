/**
 * Movement Voices — static D3/SVG twin of movement-voices-network + settle-movement-voices
 */
(function () {
  "use strict";

  var DATA = window.__MOVEMENT_VOICES_GRAPH__;
  var VOICE_AVATAR_PX = 72;
  var CENTER_NODE_PX = 92;
  var STAGGER_MS = 380;
  var ZOOM_MIN = 0.4;
  var ZOOM_MAX = 1.65;

  var svg = null;
  var gZoom = null;
  var zoomBehavior = null;
  var positionsCache = null;
  var dimsCache = null;
  var revealStep = 0;
  var reducedMotion = false;
  var staggerTimeout = null;
  var staggerInterval = null;
  var resizeScheduled = false;

  var NODE_IDS = [];
  var TOTAL_REVEAL_STEPS = 0;
  var EDGE_RECIPES = [];

  function mulberry32(seed) {
    var s = seed >>> 0;
    return function () {
      s = (s + 0x6d2b79f5) | 0;
      var t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function settleNetworkPositions(width, height) {
    var cx = width / 2;
    var cy = height / 2;
    var minDim = Math.min(width, height);
    var PADDING = Math.max(VOICE_AVATAR_PX, CENTER_NODE_PX) / 2 + 18;

    function seedNodes(w, h) {
      var cx2 = w / 2;
      var cy2 = h / 2;
      var minD = Math.min(w, h);
      var maxD = Math.max(w, h);
      return NODE_IDS.map(function (id, i) {
        if (id === DATA.centerNodeId) {
          return { id: id, x: cx2, y: cy2, fx: cx2, fy: cy2 };
        }
        var angle = i * 2.3999632 + 0.31;
        var radius = minD * (0.2 + ((i * 13) % 17) / 90);
        var biasX = ((i * 47) % 23) / 22 - 0.5;
        var biasY = ((i * 31) % 19) / 18 - 0.5;
        var stretch = maxD / minD;
        var ex = stretch > 1.12 ? 1.05 + biasX * 0.09 : 1 + biasX * 0.06;
        var ey = stretch > 1.12 ? 1 + biasY * 0.06 : 1.05 + biasY * 0.09;
        return {
          id: id,
          x: cx2 + Math.cos(angle) * radius * ex,
          y: cy2 + Math.sin(angle) * radius * ey,
        };
      });
    }

    function buildLinks(w, h) {
      var minD = Math.min(w, h);
      var baseDist = minD * 0.38;
      var out = [];
      for (var i = 0; i < NODE_IDS.length; i++) {
        for (var j = i + 1; j < NODE_IDS.length; j++) {
          var a = NODE_IDS[i];
          var b = NODE_IDS[j];
          var touchesCenter = a === DATA.centerNodeId || b === DATA.centerNodeId;
          var jitter = (((i + 1) * 17 + (j + 1) * 11) % 27) - 13;
          var distance = touchesCenter ? baseDist * 0.92 : baseDist * 1.38 + jitter;
          out.push({ source: a, target: b, distance: distance, touchesCenter: touchesCenter });
        }
      }
      return out;
    }

    var nodes = seedNodes(width, height);
    var links = buildLinks(width, height);

    var chargeFor = function (n) {
      if (n.id === DATA.centerNodeId) return -760;
      var idx = NODE_IDS.indexOf(n.id);
      return -340 - ((idx * 53) % 181);
    };

    var sim = d3
      .forceSimulation(nodes)
      .randomSource(mulberry32(0x9e3779b1))
      .force(
        "charge",
        d3.forceManyBody().strength(chargeFor).distanceMax(minDim * 0.95)
      )
      .force("collide", d3.forceCollide(VOICE_AVATAR_PX * 0.94).iterations(4))
      .force(
        "link",
        d3
          .forceLink(links)
          .id(function (d) {
            return d.id;
          })
          .distance(function (l) {
            return l.distance;
          })
          .strength(function (l) {
            return l.touchesCenter ? 0.08 : 0.035;
          })
      )
      .force("x", d3.forceX(cx).strength(0.035))
      .force("y", d3.forceY(cy).strength(0.035))
      .alpha(1)
      .alphaDecay(0.035)
      .alphaMin(0.01)
      .stop();

    for (var t = 0; t < 520; t++) {
      sim.tick();
      if (sim.alpha() < sim.alphaMin()) break;
    }

    var outMap = new Map();
    for (var ni = 0; ni < nodes.length; ni++) {
      var n = nodes[ni];
      var x = Math.max(PADDING, Math.min(width - PADDING, n.x != null ? n.x : cx));
      var y = Math.max(PADDING, Math.min(height - PADDING, n.y != null ? n.y : cy));
      outMap.set(n.id, { x: x, y: y });
    }
    return outMap;
  }

  function revealIndexFor(id) {
    if (id === DATA.centerNodeId) return 1;
    for (var i = 0; i < DATA.voices.length; i++) {
      if (DATA.voices[i].id === id) return 1 + DATA.voices[i].appearOrder;
    }
    return Infinity;
  }

  function buildEdgeRecipes() {
    var out = [];
    for (var i = 0; i < NODE_IDS.length; i++) {
      for (var j = i + 1; j < NODE_IDS.length; j++) {
        var a = NODE_IDS[i];
        var b = NODE_IDS[j];
        out.push({
          source: a,
          target: b,
          touchesCenter: a === DATA.centerNodeId || b === DATA.centerNodeId,
          revealAt: Math.max(revealIndexFor(a), revealIndexFor(b)),
        });
      }
    }
    return out;
  }

  function computeFitTransform(width, height, positions, pad) {
    var minX = Infinity;
    var minY = Infinity;
    var maxX = -Infinity;
    var maxY = -Infinity;
    for (var i = 0; i < NODE_IDS.length; i++) {
      var id = NODE_IDS[i];
      var p = positions.get(id);
      if (!p) continue;
      var half = id === DATA.centerNodeId ? CENTER_NODE_PX / 2 : VOICE_AVATAR_PX / 2;
      minX = Math.min(minX, p.x - half);
      maxX = Math.max(maxX, p.x + half);
      minY = Math.min(minY, p.y - half);
      maxY = Math.max(maxY, p.y + half);
    }
    var gw = maxX - minX || 1;
    var gh = maxY - minY || 1;
    var innerPad = pad != null ? pad : 0.1;
    var scale = (1 - innerPad) * Math.min(width / gw, height / gh);
    var tx = width / 2 - (scale * (minX + maxX)) / 2;
    var ty = height / 2 - (scale * (minY + maxY)) / 2;
    return d3.zoomIdentity.translate(tx, ty).scale(scale);
  }

  function clearStagger() {
    if (staggerTimeout) clearTimeout(staggerTimeout);
    if (staggerInterval) clearInterval(staggerInterval);
    staggerTimeout = null;
    staggerInterval = null;
  }

  function updateRevealVisuals(edgeLayer, nodeLayer) {
    var animateFlow = revealStep >= TOTAL_REVEAL_STEPS && !reducedMotion;

    edgeLayer.selectAll("g.edge").each(function (d) {
      var visible = revealStep >= d.revealAt;
      var baseOp = d.touchesCenter ? 0.5 : 0.36;
      var g = d3.select(this);
      g.select("line.base")
        .style("stroke-opacity", visible ? baseOp : 0)
        .style("transition", "stroke-opacity 320ms ease-out");
      g.select("path.flow")
        .style("stroke-opacity", visible && animateFlow ? baseOp * 0.9 : 0)
        .classed("movement-voices-edge-flow-dash", Boolean(visible && animateFlow));
    });

    nodeLayer.selectAll("g.node").each(function (d) {
      var idx = revealIndexFor(d.id);
      var visible = revealStep >= idx;
      d3.select(this).style("opacity", visible ? 1 : 0);
    });
  }

  function render() {
    var wrap = document.getElementById("canvas-wrap");
    var svgEl = document.getElementById("viz");
    if (!DATA || !wrap || !svgEl) {
      if (wrap)
        wrap.innerHTML =
          '<p style="padding:1rem;color:#71717a">Missing embedded data. Run <code>pnpm docs:sync-movement-voices-html</code>.</p>';
      return;
    }

    var rect = wrap.getBoundingClientRect();
    var width = Math.max(320, rect.width);
    var height = Math.max(360, rect.height);
    dimsCache = { w: width, h: height };

    positionsCache = settleNetworkPositions(width, height);

    d3.select(svgEl).selectAll("*").remove();

    svg = d3.select(svgEl).attr("viewBox", [0, 0, width, height]).style("max-width", "100%").style("height", "100%");

    var defs = svg.append("defs");

    DATA.voices.forEach(function (v) {
      var cid = "clip-voice-" + v.id.replace(/[^a-zA-Z0-9_-]/g, "_");
      defs.append("clipPath").attr("id", cid).append("circle").attr("r", VOICE_AVATAR_PX / 2);
    });

    gZoom = svg.append("g").attr("class", "zoom-layer");

    zoomBehavior = d3
      .zoom()
      .scaleExtent([ZOOM_MIN, ZOOM_MAX])
      .on("zoom", function (event) {
        gZoom.attr("transform", event.transform);
      });

    svg.call(zoomBehavior);

    var positions = positionsCache;

    var edgeLayer = gZoom.append("g").attr("class", "edges");

    var edgesData = EDGE_RECIPES.map(function (r) {
      var sa = positions.get(r.source);
      var sb = positions.get(r.target);
      return {
        source: r.source,
        target: r.target,
        touchesCenter: r.touchesCenter,
        revealAt: r.revealAt,
        x1: sa.x,
        y1: sa.y,
        x2: sb.x,
        y2: sb.y,
      };
    });

    edgeLayer
      .selectAll("g.edge")
      .data(edgesData)
      .join("g")
      .attr("class", "edge")
      .each(function (d) {
        var g = d3.select(this);
        g.append("line")
          .attr("class", "base")
          .attr("x1", d.x1)
          .attr("y1", d.y1)
          .attr("x2", d.x2)
          .attr("y2", d.y2)
          .attr("stroke", "#71717a")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", d.touchesCenter ? 1.28 : 0.95);
        var dpath = "M " + d.x1 + " " + d.y1 + " L " + d.x2 + " " + d.y2;
        g.append("path")
          .attr("class", "flow")
          .attr("d", dpath)
          .attr("fill", "none")
          .attr("stroke", "#0053db")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", Math.max(0.9, (d.touchesCenter ? 1.28 : 0.95) * 0.92))
          .attr("stroke-dasharray", "3 10")
          .style("stroke-opacity", 0);
      });

    var nodeLayer = gZoom.append("g").attr("class", "nodes");

    var cp = positions.get(DATA.centerNodeId);
    if (cp) {
      var half = CENTER_NODE_PX / 2;
      var cg = nodeLayer
        .append("g")
        .datum({ id: DATA.centerNodeId })
        .attr("class", "node node-center")
        .attr("transform", "translate(" + (cp.x - half) + "," + (cp.y - half) + ")");

      cg.append("rect")
        .attr("width", CENTER_NODE_PX)
        .attr("height", CENTER_NODE_PX)
        .attr("rx", 6)
        .attr("fill", "#2a3439")
        .attr("stroke", "rgba(42, 52, 57, 0.9)")
        .attr("stroke-width", 2);

      var icon = cg.append("g").attr("transform", "translate(" + (CENTER_NODE_PX / 2 - 12) + ",20)");
      icon.append("circle").attr("cx", 12).attr("cy", 12).attr("r", 3.4).attr("fill", "#fafafa");
      icon
        .append("circle")
        .attr("cx", 12)
        .attr("cy", 12)
        .attr("r", 7.5)
        .attr("fill", "none")
        .attr("stroke", "#fafafa")
        .attr("stroke-width", 1.4)
        .attr("opacity", 0.65);
      icon
        .append("circle")
        .attr("cx", 12)
        .attr("cy", 12)
        .attr("r", 10.5)
        .attr("fill", "none")
        .attr("stroke", "#fafafa")
        .attr("stroke-width", 1)
        .attr("opacity", 0.35);

      cg.append("text")
        .attr("x", CENTER_NODE_PX / 2)
        .attr("y", CENTER_NODE_PX - 14)
        .attr("text-anchor", "middle")
        .attr("fill", "#fafafa")
        .attr("font-size", 9)
        .attr("font-weight", 600)
        .attr("letter-spacing", "0.05em")
        .text("MOVEMENTAL");

      cg.append("title").text(DATA.centerLabel);
    }

    DATA.voices.forEach(function (v) {
      var p = positions.get(v.id);
      if (!p) return;
      var r = VOICE_AVATAR_PX / 2;
      var cid = "clip-voice-" + v.id.replace(/[^a-zA-Z0-9_-]/g, "_");
      var vg = nodeLayer
        .append("g")
        .datum({ id: v.id, voice: v })
        .attr("class", "node node-voice")
        .attr("transform", "translate(" + p.x + "," + p.y + ")");

      vg
        .append("image")
        .attr("href", v.imageSrcHtml)
        .attr("x", -r)
        .attr("y", -r)
        .attr("width", VOICE_AVATAR_PX)
        .attr("height", VOICE_AVATAR_PX)
        .attr("clip-path", "url(#" + cid + ")")
        .attr("preserveAspectRatio", "xMidYMid slice");

      vg
        .append("circle")
        .attr("r", r)
        .attr("fill", "none")
        .attr("stroke", "rgba(42, 52, 57, 0.15)")
        .attr("stroke-width", 1);

      vg
        .on("mouseenter", function () {
          showDetail(v);
        })
        .on("mouseleave", function () {
          hideDetail();
        })
        .on("click", function () {
          window.location.href = "/voices";
        });

      vg.append("title").text(v.name + " — " + v.title);
    });

    svg.call(zoomBehavior.transform, computeFitTransform(width, height, positions, 0.1));

    if (reducedMotion) {
      revealStep = TOTAL_REVEAL_STEPS;
    } else {
      revealStep = 0;
    }
    updateRevealVisuals(edgeLayer, nodeLayer);

    if (!reducedMotion) {
      observeAndStagger(edgeLayer, nodeLayer);
    }
  }

  function applyRevealStep(edgeLayer, nodeLayer, step) {
    revealStep = step;
    updateRevealVisuals(edgeLayer, nodeLayer);
  }

  function observeAndStagger(edgeLayer, nodeLayer) {
    clearStagger();
    var wrap = document.getElementById("canvas-wrap");
    if (!wrap) return;

    var kickoff = function () {
      staggerTimeout = setTimeout(function () {
        applyRevealStep(edgeLayer, nodeLayer, 1);
      }, 80);
      staggerInterval = setInterval(function () {
        applyRevealStep(edgeLayer, nodeLayer, Math.min(revealStep + 1, TOTAL_REVEAL_STEPS));
        if (revealStep >= TOTAL_REVEAL_STEPS) clearInterval(staggerInterval);
      }, STAGGER_MS);
    };

    var io = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            kickoff();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 }
    );
    io.observe(wrap);
  }

  function showDetail(v) {
    document.getElementById("detail-placeholder").hidden = true;
    document.getElementById("detail-active").hidden = false;
    document.getElementById("detail-name").textContent = v.name;
    document.getElementById("detail-title").textContent = v.title;
  }

  function hideDetail() {
    document.getElementById("detail-placeholder").hidden = false;
    document.getElementById("detail-active").hidden = true;
  }

  function populateSrList() {
    var ul = document.getElementById("sr-list");
    if (!ul || !DATA) return;
    ul.innerHTML = "";
    var li0 = document.createElement("li");
    li0.textContent = DATA.centerLabel + " (center node)";
    ul.appendChild(li0);
    var sorted = DATA.voices.slice().sort(function (a, b) {
      return a.appearOrder - b.appearOrder;
    });
    sorted.forEach(function (v) {
      var li = document.createElement("li");
      li.textContent = v.name + ": " + v.title;
      ul.appendChild(li);
    });
  }

  function resetView() {
    if (!dimsCache || !positionsCache || !svg || !zoomBehavior) return;
    svg.call(zoomBehavior.transform, computeFitTransform(dimsCache.w, dimsCache.h, positionsCache, 0.1));

    var edgeLayer = gZoom.select("g.edges");
    var nodeLayer = gZoom.select("g.nodes");

    clearStagger();
    reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      revealStep = TOTAL_REVEAL_STEPS;
      updateRevealVisuals(edgeLayer, nodeLayer);
      return;
    }

    revealStep = 0;
    updateRevealVisuals(edgeLayer, nodeLayer);
    staggerTimeout = setTimeout(function () {
      applyRevealStep(edgeLayer, nodeLayer, 1);
      staggerInterval = setInterval(function () {
        applyRevealStep(edgeLayer, nodeLayer, Math.min(revealStep + 1, TOTAL_REVEAL_STEPS));
        if (revealStep >= TOTAL_REVEAL_STEPS) clearInterval(staggerInterval);
      }, STAGGER_MS);
    }, 120);
  }

  function boot() {
    if (!DATA) {
      render();
      return;
    }

    NODE_IDS = [DATA.centerNodeId].concat(DATA.voices.map(function (v) { return v.id; }));
    TOTAL_REVEAL_STEPS = 1 + DATA.voices.length;
    EDGE_RECIPES = buildEdgeRecipes();

    reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    populateSrList();
    render();

    document.getElementById("btn-reset").addEventListener("click", resetView);

    window.addEventListener("resize", function () {
      if (resizeScheduled) return;
      resizeScheduled = true;
      requestAnimationFrame(function () {
        resizeScheduled = false;
        clearStagger();
        render();
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
