"use client";

import * as d3 from "d3";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  OPACITY_EXTRA_FILTER,
  OPACITY_EXTRA_HOVER,
  OPACITY_EXTRA_IDLE,
  OPACITY_PORTRAIT_DIM_FILTER,
  buildLeadersFromMovementVoices,
  generateGraphData,
  isPortraitNode,
  linkHighlightsPortraitHover,
  matchesAudienceFilters,
  seedNodePositions,
  type SceniusV3GraphLink,
  type SceniusV3GraphNode,
} from "./scenius-v3-topology";
import {
  AUDIENCE_SEGMENTS,
  AUDIENCE_SEGMENT_LABEL,
  CREDENTIAL_STRENGTH_LABEL,
  type AudienceCredentialStrength,
  type AudienceSegment,
} from "./voice-audience-credentials";

const SEGMENT_KEYS: readonly AudienceSegment[] = [
  "churches",
  "nonprofits",
  "institutions",
];

const SEGMENT_LABELS = ["Churches", "Nonprofits", "Institutions"] as const;

const LINK_BASE_OPACITY = 0.072;
const LINK_BASE_WIDTH = 0.42;

function subscribeReducedMotion(onChange: () => void): () => void {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function snapshotReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function strengthTickOpacity(st: AudienceCredentialStrength | undefined): number {
  if (!st) return 0.16;
  const m: Record<AudienceCredentialStrength, number> = {
    none: 0.22,
    light: 0.48,
    moderate: 0.84,
    strong: 1,
  };
  return m[st] ?? 0.16;
}

function strengthRingStrokeWidth(
  st: AudienceCredentialStrength | undefined,
): number {
  if (!st) return 1.85;
  const m: Record<AudienceCredentialStrength, number> = {
    none: 1.95,
    light: 2.5,
    moderate: 3.25,
    strong: 4.05,
  };
  return m[st] ?? 1.85;
}

function rankLabel(st: AudienceCredentialStrength | undefined): string {
  if (!st) return "—";
  return CREDENTIAL_STRENGTH_LABEL[st] ?? "—";
}

function ringSegmentPath(r: number, segmentIndex: number): string {
  const sweep = (2 * Math.PI) / 3;
  const a0 = -Math.PI / 2 + segmentIndex * sweep;
  const a1 = a0 + sweep;
  const x0 = r * Math.cos(a0);
  const y0 = r * Math.sin(a0);
  const x1 = r * Math.cos(a1);
  const y1 = r * Math.sin(a1);
  return `M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`;
}

const RING_STROKE = [
  "var(--audience-ring-churches)",
  "var(--audience-ring-nonprofits)",
  "var(--audience-ring-institutions)",
] as const;

type NodeLayerSel = d3.Selection<
  SVGGElement,
  SceniusV3GraphNode,
  SVGGElement,
  SceniusV3GraphNode | undefined
>;

function appendAudienceRingArcs(portraitSel: NodeLayerSel, d: SceniusV3GraphNode) {
  const g = portraitSel
    .append("g")
    .attr("class", "audience-ring")
    .style("pointer-events", "none");
  const rRing = d.radius + 2.85;
  if (d.researchPending) {
    for (let ri = 0; ri < 3; ri++) {
      g.append("path")
        .attr("d", ringSegmentPath(rRing, ri))
        .attr("fill", "none")
        .attr("stroke", RING_STROKE[ri])
        .attr("stroke-width", 2.1)
        .attr("stroke-linecap", "round")
        .attr("opacity", 0.28)
        .append("title")
        .text("Audience credentials not mapped for this profile yet.");
    }
    return;
  }
  const segs = d.audienceCredentials?.segments ?? {};
  SEGMENT_KEYS.forEach((key, i) => {
    const st = segs[key];
    g.append("path")
      .attr("d", ringSegmentPath(rRing, i))
      .attr("fill", "none")
      .attr("stroke", RING_STROKE[i])
      .attr("stroke-width", strengthRingStrokeWidth(st))
      .attr("stroke-linecap", "round")
      .attr("opacity", strengthTickOpacity(st))
      .append("title")
      .text(`${SEGMENT_LABELS[i]} · ${rankLabel(st)}`);
  });
}

function segmentStrengthPct(
  strength: AudienceCredentialStrength | undefined,
): number {
  switch (strength) {
    case "strong":
      return 100;
    case "moderate":
      return 66;
    case "light":
      return 36;
    case "none":
      return 12;
    default:
      return 0;
  }
}

function applyNodeOpacity(
  sel: NodeLayerSel,
  activeFilters: ReadonlySet<AudienceSegment>,
  hoveredPortraitId: string | null,
) {
  sel.attr("opacity", (n) => {
    if (!isPortraitNode(n)) {
      if (hoveredPortraitId) return OPACITY_EXTRA_HOVER;
      if (activeFilters.size > 0) return OPACITY_EXTRA_FILTER;
      return OPACITY_EXTRA_IDLE;
    }
    if (hoveredPortraitId) return 1;
    if (activeFilters.size === 0) return 1;
    return matchesAudienceFilters(n, activeFilters)
      ? 1
      : OPACITY_PORTRAIT_DIM_FILTER;
  });
}

interface SceniusNetworkHomeProps {
  ariaLabel: string;
}

export const SceniusNetworkHome = memo(function SceniusNetworkHome({
  ariaLabel,
}: SceniusNetworkHomeProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const zoomTransformRef = useRef(d3.zoomIdentity);
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<
    SVGSVGElement,
    unknown
  > | null>(null);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  const [filters, setFilters] = useState<ReadonlySet<AudienceSegment>>(
    () => new Set(),
  );
  const [hoverNode, setHoverNode] = useState<SceniusV3GraphNode | null>(null);
  /** Tap a portrait to pin the detail panel + name tag (esp. coarse pointers). */
  const [tappedNode, setTappedNode] = useState<SceniusV3GraphNode | null>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    snapshotReducedMotion,
    () => false,
  );

  const filtersRef = useRef(filters);
  filtersRef.current = filters;
  const hoverIdRef = useRef<string | null>(null);
  hoverIdRef.current = hoverNode?.id ?? null;
  const tappedNodeRef = useRef<SceniusV3GraphNode | null>(null);
  tappedNodeRef.current = tappedNode;
  const setTappedNodeRef = useRef(setTappedNode);
  setTappedNodeRef.current = setTappedNode;

  const displayNode = hoverNode ?? tappedNode;

  const leaders = useMemo(() => buildLeadersFromMovementVoices(), []);

  const toggleAudienceSegment = useCallback((seg: AudienceSegment) => {
    setFilters((prev) => {
      const next = new Set(prev);
      if (next.has(seg)) next.delete(seg);
      else next.add(seg);
      return next;
    });
    setHoverNode(null);
    setTappedNode(null);
  }, []);

  const clearAudienceFilters = useCallback(() => {
    setFilters(new Set());
    setHoverNode(null);
    setTappedNode(null);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTappedNode(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const read = () => {
      const r = el.getBoundingClientRect();
      const w = Math.max(320, Math.floor(r.width));
      const h = Math.max(360, Math.floor(r.height));
      setDims((prev) =>
        prev && prev.w === w && prev.h === h ? prev : { w, h },
      );
    };
    read();
    const ro = new ResizeObserver(() => read());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const svgEl = svgRef.current;
    const host = wrapRef.current;
    if (!svgEl || !host || !dims) return;

    const width = dims.w;
    const height = dims.h;
    const activeFilters = filtersRef.current;

    const { nodes, links } = generateGraphData(leaders);
    seedNodePositions(nodes, width, height);

    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();

    svg
      .attr("viewBox", [0, 0, width, height])
      .attr("width", "100%")
      .attr("height", "100%")
      .style("display", "block");

    const defs = svg.append("defs");
    const gradient = defs
      .append("radialGradient")
      .attr("id", "scenius-home-bg")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "55%");
    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "var(--primary)")
      .attr("stop-opacity", 0.07);
    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "var(--background)")
      .attr("stop-opacity", 0);

    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "url(#scenius-home-bg)")
      .attr("class", "scenius-home-bg pointer-events-none");

    const rootG = svg.append("g").attr("class", "scenius-zoom-inner");

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.45, 2.2])
      .on("zoom", (event) => {
        zoomTransformRef.current = event.transform;
        rootG.attr("transform", event.transform.toString());
      });
    zoomBehaviorRef.current = zoom;

    svg.call(zoom).call(zoom.transform, zoomTransformRef.current);

    const dim = Math.min(width, height);
    const radialPortrait = dim * 0.13;
    const radialExtra = dim * 0.39;

    const simulation = d3
      .forceSimulation<SceniusV3GraphNode>(nodes)
      .force(
        "link",
        d3
          .forceLink<SceniusV3GraphNode, SceniusV3GraphLink>(links)
          .id((d) => d.id)
          .distance(46)
          .strength(0.028),
      )
      .force(
        "charge",
        d3.forceManyBody<SceniusV3GraphNode>().strength((d) =>
          d.imageUrl ? -395 : -705,
        ),
      )
      .force("center", d3.forceCenter(width / 2, height / 2).strength(0.065))
      .force(
        "radial",
        d3
          .forceRadial<SceniusV3GraphNode>(
            (d) => (d.imageUrl ? radialPortrait : radialExtra),
            width / 2,
            height / 2,
          )
          .strength(0.078),
      )
      .force(
        "collide",
        d3
          .forceCollide<SceniusV3GraphNode>()
          .radius((d) => d.radius + (d.imageUrl ? 14 : 7))
          .iterations(3),
      )
      .alphaDecay(0.041);

    const EDGE_DEFAULT = "var(--border)";
    const EDGE_HIGHLIGHT = "var(--primary)";

    const link = rootG
      .append("g")
      .attr("stroke", EDGE_DEFAULT)
      .attr("stroke-opacity", LINK_BASE_OPACITY)
      .selectAll<SVGLineElement, SceniusV3GraphLink>("line")
      .data(links)
      .join("line")
      .attr("stroke-width", LINK_BASE_WIDTH);

    const nodeGroup = rootG
      .append("g")
      .selectAll<SVGGElement, SceniusV3GraphNode>("g")
      .data(nodes)
      .join("g")
      .call(
        d3
          .drag<SVGGElement, SceniusV3GraphNode>()
          .on("start", (event) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
          })
          .on("drag", (event) => {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
          })
          .on("end", (event) => {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
          }),
      );

    nodeGroup.each(function (d) {
      const sel = d3.select(this);
      if (!d.imageUrl) {
        /* Empty cells: --muted/--border sit on --background and disappear in both
         * themes; ink-soft is the tertiary ramp built for readable UI on paper/ink. */
        sel
          .append("circle")
          .attr("r", d.radius)
          .attr(
            "fill",
            "color-mix(in srgb, var(--ink-soft) 38%, var(--background))",
          )
          .attr("stroke", "var(--ink-soft)")
          .attr("stroke-opacity", 0.92)
          .attr("stroke-width", 1.35)
          .style("pointer-events", "none");
      } else {
        const clipId = `scenius-clip-${String(d.id).replace(/[^a-zA-Z0-9_-]/g, "_")}-${width}`;
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
          .attr("clip-path", `url(#${clipId})`)
          .style("pointer-events", "none");
        sel
          .append("circle")
          .attr("r", d.radius)
          .attr("fill", "none")
          .attr("stroke", "var(--foreground)")
          .attr("stroke-opacity", 0.2)
          .attr("stroke-width", 2)
          .style("pointer-events", "none");
        appendAudienceRingArcs(sel as unknown as NodeLayerSel, d);
      }
      sel
        .append("circle")
        .attr("r", d.imageUrl ? d.radius + 12 : d.radius)
        .attr("fill", "transparent")
        .attr("stroke", "none")
        .attr("data-scenius-node-hit", d.imageUrl ? "1" : null)
        .style("pointer-events", "all");
    });

    applyNodeOpacity(nodeGroup, activeFilters, null);

    const nameTagLayer = rootG
      .append("g")
      .attr("class", "scenius-name-tag")
      .style("pointer-events", "none")
      .style("opacity", 0);

    const nameTagBg = nameTagLayer
      .append("rect")
      .attr("rx", 7)
      .attr("ry", 7)
      .attr("fill", "var(--card)")
      .attr("stroke", "var(--border)")
      .attr("stroke-width", 1);

    const nameTagText = nameTagLayer
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-family", "var(--font-sans), ui-sans-serif, system-ui")
      .style("font-size", "11px")
      .style("font-weight", "600")
      .style("fill", "var(--foreground)");

    function layoutNameTag(n: SceniusV3GraphNode) {
      const label = n.name;
      nameTagText.text(label);
      const approxW = Math.min(220, Math.max(72, label.length * 7 + 20));
      const h = 26;
      nameTagBg
        .attr("x", -approxW / 2)
        .attr("y", -h / 2)
        .attr("width", approxW)
        .attr("height", h);
      nameTagText.attr("x", 0).attr("y", 0);
      const gap = 8;
      nameTagLayer.attr(
        "transform",
        `translate(${n.x ?? 0},${(n.y ?? 0) - n.radius - h / 2 - gap})`,
      );
      nameTagLayer.style("opacity", 1);
    }

    function syncNameTag() {
      const id = hoverIdRef.current ?? tappedNodeRef.current?.id ?? null;
      const n = id
        ? nodes.find((node) => node.id === id && node.imageUrl)
        : undefined;
      if (!n || n.x == null || n.y == null) {
        nameTagLayer.style("opacity", 0);
        return;
      }
      layoutNameTag(n);
    }

    const ticked = () => {
      link
        .attr("x1", (d) => (d.source as SceniusV3GraphNode).x!)
        .attr("y1", (d) => (d.source as SceniusV3GraphNode).y!)
        .attr("x2", (d) => (d.target as SceniusV3GraphNode).x!)
        .attr("y2", (d) => (d.target as SceniusV3GraphNode).y!);

      nodeGroup.attr(
        "transform",
        (d) => `translate(${d.x ?? 0},${d.y ?? 0})`,
      );
      syncNameTag();
    };

    if (reducedMotion) {
      simulation.stop();
      for (let i = 0; i < 420; i++) simulation.tick();
      ticked();
    } else {
      simulation.on("tick", ticked);
    }

    const applyFilterVisuals = () => {
      applyNodeOpacity(nodeGroup, filtersRef.current, hoverIdRef.current);
    };

    const setLinkHover = (hid: string | null) => {
      link
        .attr("stroke", (l) =>
          linkHighlightsPortraitHover(l, hid) ? EDGE_HIGHLIGHT : EDGE_DEFAULT,
        )
        .attr("stroke-opacity", (l) =>
          linkHighlightsPortraitHover(l, hid)
            ? 0.48
            : LINK_BASE_OPACITY * 0.28,
        )
        .attr("stroke-width", (l) =>
          linkHighlightsPortraitHover(l, hid)
            ? 0.92
            : LINK_BASE_WIDTH * 0.88,
        );
    };

    svg.on("click.tapclear", (event: Event) => {
      const path = event.composedPath() as Element[];
      const hitPortrait = path.some(
        (el) =>
          el instanceof Element && el.hasAttribute("data-scenius-node-hit"),
      );
      if (!hitPortrait) {
        setTappedNodeRef.current(null);
      }
    });

    nodeGroup
      .style("cursor", (d) => (d.imageUrl ? "pointer" : "grab"))
      .on("mouseover", (_event, d) => {
        if (!d.imageUrl) return;
        hoverIdRef.current = d.id;
        setHoverNode(d);
        setLinkHover(d.id);
        applyNodeOpacity(nodeGroup, filtersRef.current, d.id);
        syncNameTag();
      })
      .on("mouseout", (event) => {
        const rt = event.relatedTarget as Node | null;
        if (rt && host.contains(rt)) {
          const panel = host.querySelector("[data-scenius-home-detail]");
          if (panel?.contains(rt)) return;
        }
        hoverIdRef.current = null;
        setHoverNode(null);
        setLinkHover(null);
        link
          .attr("stroke", EDGE_DEFAULT)
          .attr("stroke-opacity", LINK_BASE_OPACITY)
          .attr("stroke-width", LINK_BASE_WIDTH);
        applyNodeOpacity(nodeGroup, filtersRef.current, null);
        syncNameTag();
      })
      .on("click", (event, d) => {
        if (!d.imageUrl) return;
        event.stopPropagation();
        setTappedNodeRef.current((prev) => (prev?.id === d.id ? null : d));
      });

    const filterListener = () => {
      applyFilterVisuals();
      setLinkHover(hoverIdRef.current);
    };
    (host as HTMLElement & { __sceniusFilter?: () => void }).__sceniusFilter =
      filterListener;
    (host as HTMLElement & { __sceniusSyncTag?: () => void }).__sceniusSyncTag =
      syncNameTag;

    return () => {
      simulation.stop();
      svg.on(".zoom", null);
      svg.on("click.tapclear", null);
      zoomBehaviorRef.current = null;
      delete (host as HTMLElement & { __sceniusFilter?: () => void })
        .__sceniusFilter;
      delete (host as HTMLElement & { __sceniusSyncTag?: () => void })
        .__sceniusSyncTag;
    };
  }, [dims, leaders, reducedMotion]);

  useEffect(() => {
    const host = wrapRef.current;
    const fn = (host as HTMLElement & { __sceniusFilter?: () => void })
      .__sceniusFilter;
    if (fn) fn();
  }, [filters]);

  useEffect(() => {
    const host = wrapRef.current;
    const sync = (host as HTMLElement & { __sceniusSyncTag?: () => void })
      .__sceniusSyncTag;
    if (sync) sync();
  }, [tappedNode]);

  const onResetView = useCallback(() => {
    zoomTransformRef.current = d3.zoomIdentity;
    const el = svgRef.current;
    const zb = zoomBehaviorRef.current;
    if (el && zb) {
      d3.select(el).transition().duration(200).call(zb.transform, d3.zoomIdentity);
    }
    setHoverNode(null);
    setTappedNode(null);
  }, []);

  return (
    <div>
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
            Movement Voices
          </p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-8 text-xs"
            onClick={onResetView}
          >
            Reset view
          </Button>
        </div>
      </div>

      <div
        ref={wrapRef}
        className="relative w-full overflow-hidden rounded-4xl border border-border/60 bg-background/40"
        style={{ height: "clamp(380px, 62vw, 640px)" }}
      >
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end p-3 sm:p-4">
          <div className="pointer-events-auto max-w-xs rounded-xl border border-border/80 bg-card/95 p-3 shadow-ambient backdrop-blur-md">
            <div className="mb-2">
              <span className="text-[10px] font-medium uppercase tracking-eyebrow text-muted-foreground">
                Filter
              </span>
            </div>
            <p className="sr-only">
              Optional audience filters emphasize voices with moderate or
              stronger credentials in the checked segments.
            </p>
            <div className="flex flex-wrap gap-2">
              {AUDIENCE_SEGMENTS.map((seg) => {
                const on = filters.has(seg);
                return (
                  <label
                    key={seg}
                    className={cn(
                      "flex cursor-pointer items-center gap-1.5 rounded-md border border-border bg-background/80 px-2 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors",
                      "border-l-[3px] border-l-transparent",
                      on &&
                        seg === "churches" &&
                        "border-l-[var(--audience-ring-churches)] bg-primary/8 text-foreground",
                      on &&
                        seg === "nonprofits" &&
                        "border-l-[var(--audience-ring-nonprofits)] bg-muted/90 text-foreground",
                      on &&
                        seg === "institutions" &&
                        "border-l-[var(--audience-ring-institutions)] bg-muted/90 text-foreground",
                    )}
                  >
                    <input
                      type="checkbox"
                      className="size-3.5 rounded border-border accent-primary"
                      checked={on}
                      onChange={() => toggleAudienceSegment(seg)}
                    />
                    {AUDIENCE_SEGMENT_LABEL[seg]}
                  </label>
                );
              })}
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-[11px] text-muted-foreground"
                disabled={filters.size === 0}
                onClick={clearAudienceFilters}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>

        <aside
          className="pointer-events-none absolute right-3 top-3 z-10 max-w-[min(18rem,calc(100%-1.5rem))] rounded-xl border border-border/80 bg-card/95 p-4 shadow-ambient backdrop-blur-md sm:right-4 sm:top-4"
          aria-live="polite"
        >
          {displayNode?.imageUrl ? (
            <div
              className="pointer-events-auto space-y-3 text-left"
              data-scenius-home-detail
            >
              <p className="text-[10px] font-medium uppercase tracking-eyebrow text-muted-foreground">
                Voice
              </p>
              <p className="text-base font-semibold leading-snug text-foreground">
                {displayNode.name}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {displayNode.role}
              </p>
              {displayNode.topics.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {displayNode.topics.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-border/80 bg-muted/50 px-1.5 py-0.5 text-[10px] capitalize text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
              {displayNode.researchPending ? (
                <p className="border-t border-border pt-3 text-xs text-muted-foreground">
                  Credentials not mapped for this profile yet.
                </p>
              ) : (
                <div className="border-t border-border pt-3 space-y-3">
                  <p className="text-[10px] font-medium uppercase tracking-eyebrow text-muted-foreground">
                    Audience signal
                  </p>
                  <ul className="space-y-3">
                    {SEGMENT_KEYS.map((seg) => {
                      const st = displayNode.audienceCredentials?.segments[seg];
                      const summary =
                        displayNode.audienceCredentials?.summaries[seg];
                      if (!st) return null;
                      const pct = segmentStrengthPct(st);
                      return (
                        <li key={seg} className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2 text-xs">
                            <span className="font-medium text-foreground">
                              {AUDIENCE_SEGMENT_LABEL[seg]}
                            </span>
                            <span className="tabular-nums text-muted-foreground">
                              {CREDENTIAL_STRENGTH_LABEL[st]}
                            </span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-border/70">
                            <div
                              className="h-full rounded-full transition-[width] duration-300"
                              style={{
                                width: `${pct}%`,
                                backgroundColor: RING_STROKE[SEGMENT_KEYS.indexOf(seg)],
                              }}
                            />
                          </div>
                          {summary ? (
                            <p className="text-[11px] leading-snug text-muted-foreground">
                              {summary}
                            </p>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              <p className="border-t border-border pt-3">
                <a
                  href={`#/profile/${displayNode.id}`}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Open profile
                </a>
              </p>
            </div>
          ) : (
            <div className="pointer-events-auto text-left">
              <p className="text-xs leading-snug text-muted-foreground">
                Hover or tap a portrait for audience signal and credentials. Tap
                again to deselect, or press Escape.
              </p>
            </div>
          )}
        </aside>

        <div className="h-full w-full [&_svg]:cursor-grab" role="img" aria-label={ariaLabel}>
          <svg ref={svgRef} className="h-full w-full" aria-hidden />
        </div>
      </div>

      <ul className="sr-only">
        {leaders.map((v) => (
          <li key={v.id}>
            {v.name}: {v.role}
          </li>
        ))}
      </ul>
    </div>
  );
});
