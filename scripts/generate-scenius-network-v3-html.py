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

# Maps legend slugs → credential segment keys (aligned with voice-audience-credentials.ts)
SEG_MAP = {
    "church": "churches",
    "nonprofit": "nonprofits",
    "institution": "institutions",
}

STRENGTH_RANK = {"none": 0, "light": 1, "moderate": 2, "strong": 3}

# Editorial source: docs/movement_leader_research/site-voices-eeat-audience-credentials.md
VOICE_ROWS = [
    {
        "slug": "alan-hirsch",
        "name": "Alan Hirsch",
        "role": "Founder, 100Movements & Forge Mission Training Network",
        "bio": (
            "Triple-layer credibility: congregations, mission organizations, "
            "and graduate theological education."
        ),
        "image": "alan-hirsch.webp",
        "research_pending": False,
        "segments": {
            "churches": "strong",
            "nonprofits": "moderate",
            "institutions": "strong",
        },
        "summaries": {
            "churches": (
                "Decades leading and planting congregations; Forge, 100Movements, "
                "and movement mentorship at national scale."
            ),
            "nonprofits": (
                "Embedded consulting and mission-organizational change "
                "(e.g. Redeemer City to City, CRM lineage)."
            ),
            "institutions": (
                "Co-founded Wheaton's M.A. in Missional Church Movements; "
                "multi-seminary faculty across years."
            ),
        },
    },
    {
        "slug": "brad-brisco",
        "name": "Dr. Brad Brisco",
        "role": "CEO & Co-founder, Movemental",
        "bio": (
            "National church multiplication systems plus training-network "
            "authority for cohort-style graduate formation."
        ),
        "image": "brad-brisco.webp",
        "research_pending": False,
        "segments": {
            "churches": "strong",
            "nonprofits": "light",
            "institutions": "moderate",
        },
        "summaries": {
            "churches": (
                "National multiplication leadership (Send Network / NAMB); "
                "Forge Kansas City; covocational planting expertise."
            ),
            "nonprofits": (
                "Primary documented lane is denominations and networks rather "
                "than secular-style NGOs."
            ),
            "institutions": (
                "Long college-level teaching and D.Min. trajectory; "
                "training-network authority for cohort leaders."
            ),
        },
    },
    {
        "slug": "josh-shepherd",
        "name": "Joshua Shepherd",
        "role": "CTO & Founder, Movemental",
        "bio": "Product and technology leadership for Movemental.",
        "image": "josh-shepherd.webp",
        "research_pending": True,
        "segments": {},
        "summaries": {},
    },
    {
        "slug": "tim-catchim",
        "name": "Tim Catchim",
        "role": "APE practitioner · Co-author, The Permanent Revolution",
        "bio": (
            "Strong church and movement practitioner credibility with nonprofit "
            "adjacency via entrepreneurship; lighter traditional academy signals."
        ),
        "image": "tim-catchim.webp",
        "research_pending": False,
        "segments": {
            "churches": "strong",
            "nonprofits": "moderate",
            "institutions": "light",
        },
        "summaries": {
            "churches": (
                "Movemental church leadership and planting; IVP co-author on "
                "APEST and organizational design."
            ),
            "nonprofits": (
                "Early nonprofit and social-enterprise formation; community "
                "development and youth-facing work."
            ),
            "institutions": (
                "Publisher-backed authority; seminary faculty / accrediting depth "
                "not documented in research files."
            ),
        },
    },
    {
        "slug": "jr-woodward",
        "name": "Dr. JR Woodward",
        "role": "National Director, V3 Church Planting Movement",
        "bio": (
            "National planting leadership, international nonprofit-adjacent work, "
            "and doctoral / seminary gravity."
        ),
        "image": "jr-woodward.webp",
        "research_pending": False,
        "segments": {
            "churches": "strong",
            "nonprofits": "moderate",
            "institutions": "strong",
        },
        "summaries": {
            "churches": (
                "National V3 church-planting leadership; decades planting and "
                "polycentric movement culture."
            ),
            "nonprofits": (
                "International development posture (e.g. Solis Foundation era) "
                "adjacent to ecclesial networks."
            ),
            "institutions": (
                "Ph.D.; adjunct across multiple seminaries; doctoral cohort "
                "leadership and society memberships."
            ),
        },
    },
    {
        "slug": "rowland-smith",
        "name": "Dr. Rowland Smith",
        "role": "National Director, Forge America · Founder, The Pando Collective",
        "bio": (
            "Forge America + microchurch operator credibility with doctoral "
            "seminary teaching lanes."
        ),
        "image": "rowland-smith.webp",
        "research_pending": False,
        "segments": {
            "churches": "strong",
            "nonprofits": "light",
            "institutions": "strong",
        },
        "summaries": {
            "churches": (
                "Forge America national director; Pando microchurch network; "
                "missional culture in large congregational context."
            ),
            "nonprofits": (
                "Community / BAM-adjacent initiatives; not primarily secular NGO "
                "board service on file."
            ),
            "institutions": (
                "DMiss and adjunct teaching across seminaries; doctoral cohort "
                "design for leaders."
            ),
        },
    },
    {
        "slug": "liz-rios",
        "name": "Dr. Liz Rios",
        "role": "Founder, Passion2Plant · Director, Púlpito Fellows",
        "bio": (
            "Balanced credentials across congregations, justice-facing nonprofits, "
            "and higher-ed / seminary contexts."
        ),
        "image": "liz-rios.webp",
        "research_pending": False,
        "segments": {
            "churches": "strong",
            "nonprofits": "strong",
            "institutions": "strong",
        },
        "summaries": {
            "churches": (
                "Ordained ministry, denominational commission work, and national "
                "Passion2Plant / Púlpito Fellows leadership."
            ),
            "nonprofits": (
                "Board and consulting depth across justice-facing faith nonprofits "
                "and grant-funded programs."
            ),
            "institutions": (
                "Higher-ed teaching and advancement; doctoral credentials; "
                "seminary adjunct and publisher-backed scholarship."
            ),
        },
    },
    {
        "slug": "lucas-pulley",
        "name": "Lucas Pulley",
        "role": "Movements Director, Underground Network",
        "bio": (
            "Microchurch and nonprofit-style network operations with lighter "
            "traditional seminary-chair signals."
        ),
        "image": "lucas-pulley.webp",
        "research_pending": False,
        "segments": {
            "churches": "strong",
            "nonprofits": "moderate",
            "institutions": "light",
        },
        "summaries": {
            "churches": (
                "Underground Network movements director; microchurch operator and "
                "national movement-facing teaching."
            ),
            "nonprofits": (
                "Chartered campus ministry formation (InterVarsity) and "
                "nonprofit-style network operations."
            ),
            "institutions": (
                "Graduate credential without seminary faculty seat on file; "
                "practitioner credibility vs accreditation committees."
            ),
        },
    },
    {
        "slug": "rob-wegner",
        "name": "Rob Wegner",
        "role": "Founding Leader, Kansas City Underground",
        "bio": (
            "Megachurch-to-microchurch bridge plus mission-agency and national "
            "association leadership."
        ),
        "image": "rob-wegner.webp",
        "research_pending": False,
        "segments": {
            "churches": "strong",
            "nonprofits": "moderate",
            "institutions": "moderate",
        },
        "summaries": {
            "churches": (
                "Rare bridge: years in large teaching-pastor roles plus founding "
                "decentralized microchurch infrastructure."
            ),
            "nonprofits": (
                "Mission-agency and national association leadership (Exponential / "
                "NewThing lineage)."
            ),
            "institutions": (
                "Training-network institutionality and conference-scale authority "
                "vs traditional seminary chair."
            ),
        },
    },
]


def _topics_for_row(row):
    if row["research_pending"]:
        return ["church"]
    chips = []
    segs = row["segments"]
    for slug, seg_key in SEG_MAP.items():
        tier = STRENGTH_RANK.get(segs.get(seg_key, "none"), 0)
        if tier >= STRENGTH_RANK["moderate"]:
            chips.append(slug)
    if chips:
        return chips
    order = ["churches", "nonprofits", "institutions"]
    best_k = None
    best_r = -1
    for k in order:
        r = STRENGTH_RANK.get(segs.get(k, "none"), 0)
        if r > best_r:
            best_r = r
            best_k = k
    inv = {v: k for k, v in SEG_MAP.items()}
    return [inv.get(best_k, "church")]


def _audience_cred_payload(row):
    if row["research_pending"]:
        return {"segments": {}, "summaries": {}}
    return {"segments": dict(row["segments"]), "summaries": dict(row["summaries"])}


def _build_leader(row):
    return {
        "id": row["slug"],
        "name": row["name"],
        "role": row["role"],
        "bio": row["bio"],
        "imageUrl": f"{VOICES_MEDIA_BASE}{row['image']}",
        "topics": _topics_for_row(row),
        "themes": [],
        "connections": [],
        "books": [],
        "researchPending": row["research_pending"],
        "audienceCredentials": _audience_cred_payload(row),
    }


LEADERS = [_build_leader(r) for r in VOICE_ROWS]


def _leader_count_at_least(topic_slug, minimum="moderate"):
    seg_key = SEG_MAP[topic_slug]
    need = STRENGTH_RANK[minimum]
    n = 0
    for row in VOICE_ROWS:
        if row["research_pending"]:
            continue
        tier = STRENGTH_RANK.get(row["segments"].get(seg_key, "none"), 0)
        if tier >= need:
            n += 1
    return n


TOPICS = [
    {
        "slug": "church",
        "name": "Church",
        "description": "Congregations and church networks.",
        "leaderCount": _leader_count_at_least("church"),
        "contentCount": 0,
    },
    {
        "slug": "nonprofit",
        "name": "NonProfit",
        "description": "Nonprofit and mission-driven organizations.",
        "leaderCount": _leader_count_at_least("nonprofit"),
        "contentCount": 0,
    },
    {
        "slug": "institution",
        "name": "Institution",
        "description": "Institutions and enterprise-scale organizations.",
        "leaderCount": _leader_count_at_least("institution"),
        "contentCount": 0,
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
        <div class="audience-filters" id="audience-filters">
          <span class="controls-label">Audience relevance</span>
          <label class="filter-label"
            ><input type="checkbox" data-audience="churches" /> Churches</label
          >
          <label class="filter-label"
            ><input type="checkbox" data-audience="nonprofits" /> Nonprofits</label
          >
          <label class="filter-label"
            ><input type="checkbox" data-audience="institutions" /> Institutions</label
          >
        </div>
        <div class="legend-extended">
          <span class="dot-extended"></span>
          <span class="legend-muted">Remaining Movement Leader Seats</span>
        </div>
      </div>

      <div id="hover-panel" class="hover-panel" aria-hidden="true">
        <h2 id="hp-name"></h2>
        <p id="hp-role" class="hp-role"></p>
        <div id="hp-topics"></div>
        <div id="hp-credentials" class="hp-credentials"></div>
        <p class="hp-hint">Click to pin hash route (demo)</p>
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

.audience-filters {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--inverse-border);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.audience-filters .controls-label {
  display: block;
  margin-bottom: 0.25rem;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--inverse-muted);
  cursor: pointer;
}

.filter-label input {
  accent-color: var(--brand-blue);
}

.hp-credentials {
  font-size: 0.75rem;
  line-height: 1.45;
  color: var(--inverse-muted);
  margin: 0.75rem 0 0;
  padding-top: 0.75rem;
  border-top: 1px solid var(--inverse-border);
}

.hp-credentials .cred-line {
  margin-bottom: 0.5rem;
}

.hp-credentials .cred-label {
  font-weight: 600;
  color: var(--inverse-foreground);
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
