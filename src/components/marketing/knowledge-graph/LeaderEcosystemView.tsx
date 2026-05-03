"use client";

import * as React from "react";

import { useElementSize } from "@/hooks/use-element-size";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  collectEntityTypes,
  collectLanguages,
  collectTopics,
  defaultKnowledgeGraphFilters,
  emergenceScenes,
  emergenceSubgraph,
  filterGraph,
  layoutLeaderOrbit,
  type KnowledgeGraphFilters,
} from "@/lib/knowledge-graph";
import type { EntityType, KnowledgeGraph, KnowledgeNode } from "@/lib/knowledge-graph/types";

import { ClusterLabelLayer } from "./ClusterLabelLayer";
import { entityFillClass, entityStrokeClass } from "./entity-styles";
import { GraphDetailPanel } from "./GraphDetailPanel";
import { GraphFilters } from "./GraphFilters";
import { GraphStoryControls } from "./GraphStoryControls";
import { NarrativeStepOverlay } from "./NarrativeStepOverlay";
import { VisualizationLegend } from "./VisualizationLegend";

export function LeaderEcosystemView({ graph }: { graph: KnowledgeGraph }) {
  const { ref, width, height } = useElementSize<HTMLDivElement>();
  const [selectedTypes, setSelectedTypes] = React.useState<Set<EntityType>>(
    () => new Set(),
  );
  const [topicFilter, setTopicFilter] = React.useState<string>("");
  const [langFilter, setLangFilter] = React.useState<string>("");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [storyMode, setStoryMode] = React.useState(false);
  const [sceneIndex, setSceneIndex] = React.useState(0);

  const scenes = React.useMemo(() => emergenceScenes(), []);
  const reducedMotion = usePrefersReducedMotion();

  const filters: KnowledgeGraphFilters = React.useMemo(() => {
    const f = defaultKnowledgeGraphFilters();
    selectedTypes.forEach((t) => f.entityTypes.add(t));
    if (topicFilter) f.topics.add(topicFilter);
    if (langFilter) f.languages.add(langFilter);
    return f;
  }, [selectedTypes, topicFilter, langFilter]);

  const filteredBase = React.useMemo(
    () => filterGraph(graph, filters),
    [graph, filters],
  );

  const viewGraph = React.useMemo(() => {
    if (!storyMode) return filteredBase;
    return emergenceSubgraph(filteredBase, sceneIndex as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7);
  }, [filteredBase, storyMode, sceneIndex]);

  const layout = React.useMemo(
    () => layoutLeaderOrbit(viewGraph, width, height),
    [viewGraph, width, height],
  );

  const nodeById = React.useMemo(() => {
    const m = new Map<string, KnowledgeNode>();
    for (const n of viewGraph.nodes) m.set(n.id, n);
    return m;
  }, [viewGraph.nodes]);

  const selectedNode = selectedId ? nodeById.get(selectedId) ?? null : null;

  const topics = React.useMemo(() => collectTopics(graph), [graph]);
  const langs = React.useMemo(() => collectLanguages(graph), [graph]);
  const availableTypes = React.useMemo(() => collectEntityTypes(graph), [graph]);

  const onToggleType = (t: EntityType) => {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  };

  const scene = scenes[sceneIndex] ?? scenes[0];
  const vbW = Math.max(1, width);
  const vbH = Math.max(1, height);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="flex flex-col gap-6">
        <div
          ref={ref}
          className="relative aspect-5/4 w-full min-h-[min(280px,42svh)] max-h-[min(560px,72svh)] overflow-hidden rounded-md bg-section p-3 sm:p-4"
        >
          <ClusterLabelLayer
            layout={layout}
            width={width}
            height={height}
            visible={!storyMode}
          />
          <svg
            viewBox={`0 0 ${vbW} ${vbH}`}
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 h-full w-full text-border"
            role="img"
            aria-label="Leader knowledge ecosystem map"
          >
            {viewGraph.edges.map((e) => {
              const a = layout.positions.get(e.source);
              const b = layout.positions.get(e.target);
              if (!a || !b) return null;
              return (
                <line
                  key={e.id}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="currentColor"
                  strokeOpacity={0.22}
                  strokeWidth={1}
                />
              );
            })}
            {viewGraph.nodes.map((n) => {
              const p = layout.positions.get(n.id);
              if (!p) return null;
              const r = p.r ?? 6;
              const isSel = n.id === selectedId;
              return (
                <g key={n.id}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={r + (isSel ? 4 : 0)}
                    className="fill-none stroke-primary"
                    strokeOpacity={isSel ? 0.55 : 0}
                    strokeWidth={1.5}
                  />
                  <g
                    role="button"
                    tabIndex={0}
                    className="cursor-pointer outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    onClick={() =>
                      setSelectedId((id) => (id === n.id ? null : n.id))
                    }
                    onKeyDown={(ev) => {
                      if (ev.key === "Enter" || ev.key === " ") {
                        ev.preventDefault();
                        setSelectedId((id) => (id === n.id ? null : n.id));
                      }
                    }}
                    aria-label={`${n.title}, ${n.type}`}
                  >
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={r}
                      className={`${entityFillClass(n.type)} ${entityStrokeClass(n.type)}`}
                      strokeWidth={1}
                    />
                  </g>
                  {n.type !== "leader" && r >= 5 ? (
                    <text
                      x={p.x}
                      y={p.y + r + 12}
                      textAnchor="middle"
                      className="fill-muted-foreground text-[10px] pointer-events-none"
                    >
                      {n.title.length > 22 ? `${n.title.slice(0, 20)}…` : n.title}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </svg>
          {storyMode ? (
            <NarrativeStepOverlay
              title={scene.title}
              lede={scene.lede}
              callout={scene.callout}
              active={storyMode}
              reducedMotion={reducedMotion}
            />
          ) : null}
        </div>
        <div className="space-y-4">
          <VisualizationLegend />
          <GraphFilters
            availableTypes={availableTypes}
            selectedTypes={selectedTypes}
            onToggleType={onToggleType}
            onClear={() => {
              setSelectedTypes(new Set());
              setTopicFilter("");
              setLangFilter("");
            }}
          />
          <div className="flex flex-wrap gap-3 text-sm">
            <label className="flex items-center gap-2 text-muted-foreground">
              <span className="text-xs uppercase tracking-wide">Topic</span>
              <select
                className="rounded-md border border-border bg-card px-2 py-1.5 text-foreground"
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
              >
                <option value="">All</option>
                {topics.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-muted-foreground">
              <span className="text-xs uppercase tracking-wide">Language</span>
              <select
                className="rounded-md border border-border bg-card px-2 py-1.5 text-foreground"
                value={langFilter}
                onChange={(e) => setLangFilter(e.target.value)}
              >
                <option value="">All</option>
                {langs.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <GraphStoryControls
            sceneIndex={sceneIndex}
            sceneCount={scenes.length}
            storyMode={storyMode}
            onToggleStory={() => setStoryMode((s) => !s)}
            onPrev={() =>
              setSceneIndex((i) => (i - 1 + scenes.length) % scenes.length)
            }
            onNext={() => setSceneIndex((i) => (i + 1) % scenes.length)}
            onJump={setSceneIndex}
          />
        </div>
      </div>
      <div className="lg:sticky lg:top-24 lg:max-h-[calc(100dvh-6rem)] lg:overflow-y-auto lg:self-start">
        <GraphDetailPanel node={selectedNode} graph={viewGraph} />
      </div>
    </div>
  );
}
