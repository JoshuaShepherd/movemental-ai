"use client";

import * as React from "react";
import {
  Background,
  Controls,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Edge,
  type Node,
} from "@xyflow/react";

type LayerNodeData = { role: string; label: string };

function LayerNode({
  data,
}: {
  data: LayerNodeData;
}) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="!size-2 !border-border !bg-primary"
      />
      <div className="min-w-[168px] max-w-[200px] rounded-md border border-border bg-card px-3 py-2 text-left shadow-ambient">
        <div className="text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
          {data.role}
        </div>
        <div className="mt-1 text-sm font-semibold leading-snug text-foreground">
          {data.label}
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!size-2 !border-border !bg-primary"
      />
    </>
  );
}

const nodeTypes = { layer: LayerNode };

const pipelineNodes: Node<LayerNodeData>[] = [
  {
    id: "books",
    type: "layer",
    position: { x: 0, y: 0 },
    data: { role: "Canonical", label: "Books & long-form" },
  },
  {
    id: "articles",
    type: "layer",
    position: { x: 0, y: 110 },
    data: { role: "Surface", label: "Articles & essays" },
  },
  {
    id: "pathways",
    type: "layer",
    position: { x: 0, y: 220 },
    data: { role: "Synthesis", label: "Pathways" },
  },
  {
    id: "courses",
    type: "layer",
    position: { x: 0, y: 330 },
    data: { role: "Formation", label: "Courses" },
  },
  {
    id: "ai",
    type: "layer",
    position: { x: 0, y: 440 },
    data: { role: "Interaction", label: "Grounded AI layer" },
  },
  {
    id: "network",
    type: "layer",
    position: { x: 0, y: 550 },
    data: { role: "Field", label: "Network of leaders" },
  },
];

const pipelineEdges: Edge[] = [
  {
    id: "e1",
    source: "books",
    target: "articles",
    markerEnd: { type: MarkerType.ArrowClosed, color: "var(--border)" },
    style: { stroke: "var(--border)", strokeWidth: 1.5 },
  },
  {
    id: "e2",
    source: "articles",
    target: "pathways",
    markerEnd: { type: MarkerType.ArrowClosed, color: "var(--border)" },
    style: { stroke: "var(--border)", strokeWidth: 1.5 },
  },
  {
    id: "e3",
    source: "pathways",
    target: "courses",
    markerEnd: { type: MarkerType.ArrowClosed, color: "var(--border)" },
    style: { stroke: "var(--border)", strokeWidth: 1.5 },
  },
  {
    id: "e4",
    source: "courses",
    target: "ai",
    markerEnd: { type: MarkerType.ArrowClosed, color: "var(--border)" },
    style: { stroke: "var(--border)", strokeWidth: 1.5 },
  },
  {
    id: "e5",
    source: "ai",
    target: "network",
    markerEnd: { type: MarkerType.ArrowClosed, color: "var(--border)" },
    style: { stroke: "var(--border)", strokeWidth: 1.5 },
  },
];

/**
 * Curated explainer — React Flow for controlled diagrams (not hairball graphs).
 * Controlled state follows https://reactflow.dev/learn Quick Start.
 */
export function SystemLayerFlow() {
  const [nodes, , onNodesChange] = useNodesState(pipelineNodes);
  const [edges, , onEdgesChange] = useEdgesState(pipelineEdges);

  return (
    <div className="h-[min(640px,75svh)] min-h-[420px] w-full rounded-md border border-border bg-section">
      <ReactFlow
        className="h-full w-full"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag
        zoomOnScroll
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={20} color="var(--border)" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

type LaneData = { lane: string; body: string };

function LaneCard({ data }: { data: LaneData }) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        className="!size-2 !border-border !bg-primary"
      />
      <div className="w-[200px] rounded-md border border-border bg-card px-3 py-2 shadow-ambient">
        <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-primary">
          {data.lane}
        </p>
        <p className="mt-1 text-sm leading-snug text-foreground">{data.body}</p>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="!size-2 !border-border !bg-primary"
      />
    </>
  );
}

const laneNodeTypes = { lane: LaneCard };

const laneNodes: Node<LaneData>[] = [
  {
    id: "pub",
    type: "lane",
    position: { x: 0, y: 0 },
    data: {
      lane: "Public web",
      body: "Articles, pages, and media that visitors can discover directly.",
    },
  },
  {
    id: "machine",
    type: "lane",
    position: { x: 260, y: 0 },
    data: {
      lane: "Machine legibility",
      body: "Entities, transcripts, and internal links models can align reliably.",
    },
  },
  {
    id: "leader",
    type: "lane",
    position: { x: 520, y: 0 },
    data: {
      lane: "Leader view",
      body: "Teaching, formation arcs, and cohort rhythm you actually steward.",
    },
  },
  {
    id: "mv",
    type: "lane",
    position: { x: 780, y: 0 },
    data: {
      lane: "Movemental view",
      body: "Infrastructure that keeps those three lenses coherent over time.",
    },
  },
];

const laneEdges: Edge[] = [
  {
    id: "l1",
    source: "pub",
    target: "machine",
    markerEnd: { type: MarkerType.ArrowClosed, color: "var(--border)" },
    style: { stroke: "var(--border)", strokeWidth: 1.5 },
  },
  {
    id: "l2",
    source: "machine",
    target: "leader",
    markerEnd: { type: MarkerType.ArrowClosed, color: "var(--border)" },
    style: { stroke: "var(--border)", strokeWidth: 1.5 },
  },
  {
    id: "l3",
    source: "leader",
    target: "mv",
    markerEnd: { type: MarkerType.ArrowClosed, color: "var(--border)" },
    style: { stroke: "var(--border)", strokeWidth: 1.5 },
  },
];

/** Parallel “who sees what” explainer — still React Flow, still curated. */
export function LegibilityLanesFlow() {
  const [nodes, , onNodesChange] = useNodesState(laneNodes);
  const [edges, , onEdgesChange] = useEdgesState(laneEdges);

  return (
    <div className="h-[min(280px,40svh)] min-h-[220px] w-full rounded-md border border-border bg-section">
      <ReactFlow
        className="h-full w-full"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={laneNodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag
        zoomOnScroll
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={24} color="var(--border)" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
