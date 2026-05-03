/**
 * Inventory §2 helpers: time-series + brush, D3 force graph.
 * Mermaid uses startOnLoad in page inline init — not started here.
 */
(function () {
  "use strict";

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function token(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  function buildSeries(months) {
    return Array.from({ length: months }, function (_, i) {
      var t = i / (months - 1 || 1);
      return 40 + Math.sin(t * Math.PI * 1.4) * 18 + t * 28 + (i % 5) * 1.2;
    });
  }

  function pathDFromSeries(series, months, x0, x1, yBase, yScale) {
    var parts = series.map(function (val, i) {
      var x = x0 + (i / (months - 1 || 1)) * (x1 - x0);
      var y = yBase - (val / 110) * yScale;
      return (i ? "L " : "M ") + x + " " + y;
    });
    return parts.join(" ");
  }

  function bootTimeSeries(root) {
    var months = Number(root.getAttribute("data-inv-months")) || 24;
    var x0 = Number(root.getAttribute("data-inv-x0")) || 40;
    var x1 = Number(root.getAttribute("data-inv-x1")) || 340;
    var yBase = Number(root.getAttribute("data-inv-y-base")) || 124;
    var yScale = Number(root.getAttribute("data-inv-y-scale")) || 100;
    var pathEl = root.querySelector("[data-inv-ts-line]");
    var clipRect = root.querySelector("[data-inv-ts-clip]");
    var startEl = root.querySelector("[data-inv-ts-start]");
    var widthEl = root.querySelector("[data-inv-ts-width]");
    if (!pathEl || !clipRect || !startEl || !widthEl) return;

    var series = buildSeries(months);
    var hasD3 = typeof d3 !== "undefined" && d3.line;

    if (hasD3) {
      var line = d3
        .line()
        .x(function (d, i) {
          return x0 + (i / (months - 1 || 1)) * (x1 - x0);
        })
        .y(function (d) {
          return yBase - (d / 110) * yScale;
        })
        .curve(d3.curveMonotoneX);
      pathEl.setAttribute("d", line(series));
    } else {
      pathEl.setAttribute("d", pathDFromSeries(series, months, x0, x1, yBase, yScale));
    }

    function updateBrush() {
      var start = Number(startEl.value);
      var wMonths = Number(widthEl.value);
      var fracStart = start / (months - 1 || 1);
      var fracW = (wMonths - 1) / (months - 1 || 1);
      var x = x0 + fracStart * (x1 - x0);
      var w = Math.max(8, fracW * (x1 - x0));
      var maxW = x1 - x;
      clipRect.setAttribute("x", String(x));
      clipRect.setAttribute("width", String(Math.min(maxW, w)));
    }

    startEl.addEventListener("input", updateBrush);
    widthEl.addEventListener("input", updateBrush);
    updateBrush();
  }

  function bootForce(svg) {
    var width = 420;
    var height = 260;
    var vb = svg.getAttribute("viewBox");
    if (vb) {
      var p = vb.trim().split(/\s+/);
      if (p.length >= 4) {
        width = Number(p[2]) || width;
        height = Number(p[3]) || height;
      }
    } else {
      width = Number(svg.getAttribute("width")) || width;
      height = Number(svg.getAttribute("height")) || height;
      svg.setAttribute("viewBox", "0 0 " + width + " " + height);
    }

    var nodes = [
      { id: "hub", name: "Movemental", group: "primary" },
      { id: "n1", name: "Leaders", group: "muted" },
      { id: "n2", name: "Orgs", group: "muted" },
      { id: "n3", name: "Content", group: "muted" },
      { id: "n4", name: "Formation", group: "muted" },
      { id: "n5", name: "Evidence", group: "muted" },
      { id: "n6", name: "Fundraising", group: "muted" },
      { id: "n7", name: "Governance", group: "muted" },
      { id: "n8", name: "Networks", group: "muted" },
      { id: "n9", name: "Courses", group: "muted" },
      { id: "n10", name: "Assess", group: "muted" },
      { id: "n11", name: "Trust", group: "muted" },
    ];
    var links = [
      { source: "hub", target: "n1" },
      { source: "hub", target: "n2" },
      { source: "hub", target: "n3" },
      { source: "hub", target: "n4" },
      { source: "hub", target: "n5" },
      { source: "n3", target: "n9" },
      { source: "n4", target: "n9" },
      { source: "n2", target: "n6" },
      { source: "n2", target: "n7" },
      { source: "n1", target: "n8" },
      { source: "n5", target: "n11" },
      { source: "n4", target: "n10" },
      { source: "n8", target: "n2" },
      { source: "n6", target: "n3" },
    ];

    var strokeBorder = token("--border", token("--color-border", "rgba(169,180,185,0.25)"));
    var fillPrimary = token("--primary", token("--color-primary", "#0053db"));
    var nodeFill = "color-mix(in srgb, var(--card, #fff) 88%, var(--elevated, #e1e9ee))";

    if (typeof d3 === "undefined" || !d3.select) {
      var msg = document.createElementNS("http://www.w3.org/2000/svg", "text");
      msg.setAttribute("x", "16");
      msg.setAttribute("y", "28");
      msg.setAttribute("fill", "var(--muted-foreground, var(--color-muted-foreground, #566166))");
      msg.setAttribute("font-size", "12");
      msg.textContent = "D3 not loaded — check network and refresh.";
      svg.appendChild(msg);
      return;
    }

    var root = d3.select(svg).append("g");
    var linkG = root.append("g").attr("stroke", strokeBorder).attr("stroke-opacity", 0.9).attr("stroke-width", 1.25);
    function nodeRadius(d) {
      return d.group === "primary" ? 11 : 7;
    }

    function renderStaticLayout() {
      var cx = width / 2;
      var cy = height / 2;
      var orbit = Math.min(width, height) * 0.38;
      nodes[0].x = cx;
      nodes[0].y = cy;
      nodes.slice(1).forEach(function (n, i) {
        var a = (i / (nodes.length - 1)) * Math.PI * 2 - Math.PI / 2;
        n.x = cx + Math.cos(a) * orbit;
        n.y = cy + Math.sin(a) * orbit;
      });
      linkG
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("x1", function (d) {
          return nodes.find(function (n) {
            return n.id === d.source;
          }).x;
        })
        .attr("y1", function (d) {
          return nodes.find(function (n) {
            return n.id === d.source;
          }).y;
        })
        .attr("x2", function (d) {
          return nodes.find(function (n) {
            return n.id === d.target;
          }).x;
        })
        .attr("y2", function (d) {
          return nodes.find(function (n) {
            return n.id === d.target;
          }).y;
        });
      var nodeG = root
        .append("g")
        .selectAll("g")
        .data(nodes)
        .join("g")
        .attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        });
      nodeG
        .append("circle")
        .attr("r", nodeRadius)
        .attr("fill", function (d) {
          return d.group === "primary" ? fillPrimary : nodeFill;
        })
        .attr("stroke", strokeBorder);
      nodeG
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", function (d) {
          return d.group === "primary" ? 22 : 20;
        })
        .attr("fill", "var(--muted-foreground, var(--color-muted-foreground, #566166))")
        .attr("font-size", "10px")
        .attr("font-family", "var(--font-sans), Inter, system-ui, sans-serif")
        .text(function (d) {
          return d.name;
        });
    }

    if (prefersReducedMotion()) {
      renderStaticLayout();
      return;
    }

    var simNodes = nodes.map(function (d) {
      return Object.assign({}, d);
    });
    var simLinks = links.map(function (d) {
      return {
        source: simNodes.find(function (n) {
          return n.id === d.source;
        }),
        target: simNodes.find(function (n) {
          return n.id === d.target;
        }),
      };
    });

    var simulation = d3
      .forceSimulation(simNodes)
      .force(
        "link",
        d3
          .forceLink(simLinks)
          .id(function (d) {
            return d.id;
          })
          .distance(62)
      )
      .force("charge", d3.forceManyBody().strength(-118))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3.forceCollide().radius(function (d) {
          return nodeRadius(d) + 6;
        })
      );

    var linkSel = linkG
      .selectAll("line")
      .data(simLinks)
      .join("line");

    var nodeG = root
      .append("g")
      .selectAll("g")
      .data(simNodes)
      .join("g");

    nodeG
      .append("circle")
      .attr("r", nodeRadius)
      .attr("fill", function (d) {
        return d.group === "primary" ? fillPrimary : nodeFill;
      })
      .attr("stroke", strokeBorder);

    nodeG
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", function (d) {
        return d.group === "primary" ? 22 : 20;
      })
      .attr("fill", "var(--muted-foreground, var(--color-muted-foreground, #566166))")
      .attr("font-size", "10px")
      .attr("font-family", "var(--font-sans), Inter, system-ui, sans-serif")
      .text(function (d) {
        return d.name;
      });

    simulation.on("tick", function () {
      linkSel
        .attr("x1", function (d) {
          return d.source.x;
        })
        .attr("y1", function (d) {
          return d.source.y;
        })
        .attr("x2", function (d) {
          return d.target.x;
        })
        .attr("y2", function (d) {
          return d.target.y;
        });
      nodeG.attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });
    });

    setTimeout(function () {
      simulation.alpha(0.55).restart();
    }, 40);
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-inv-time-series]").forEach(bootTimeSeries);
    document.querySelectorAll("svg[data-inv-force]").forEach(bootForce);
  });
})();
