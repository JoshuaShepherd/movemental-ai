'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { D3DragEvent, SimulationLinkDatum } from 'd3';
import { useRouter } from 'next/navigation';
import { leaders, topics } from '@/lib/data';
import { motion, AnimatePresence } from 'motion/react';

interface LeaderDatum {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  topics: string[];
  themes: string[];
  connections: string[];
  books: unknown[];
}

interface GraphNode extends LeaderDatum, d3.SimulationNodeDatum {
  group: string;
  radius: number;
}

type GraphLinkInitial = SimulationLinkDatum<GraphNode> & { value: number };

// Generate more mock nodes and links to make the graph look impressive
const generateGraphData = (): {
  nodes: GraphNode[];
  links: GraphLinkInitial[];
} => {
  const nodes: GraphNode[] = [...leaders].map((l) => ({
    ...(l as LeaderDatum),
    group: l.topics[0] || 'general',
    radius: 20,
  }));
  const links: GraphLinkInitial[] = [];

  // Add real connections
  leaders.forEach((source) => {
    source.connections.forEach((targetId: string) => {
      links.push({ source: source.id, target: targetId, value: 2 });
    });
  });

  // Add some fake nodes to make it look like a large network (~50 nodes)
  for (let i = 0; i < 40; i++) {
    const id = `fake-${i}`;
    const randomTopic = topics[Math.floor(Math.random() * topics.length)].slug;
    nodes.push({
      id,
      name: `Leader ${i}`,
      role: 'Practitioner',
      bio: '',
      imageUrl: '',
      topics: [randomTopic],
      themes: [],
      connections: [],
      books: [],
      group: randomTopic,
      radius: 8 + Math.random() * 8,
    });

    // Connect fake nodes to real nodes or other fake nodes
    const targetNode = nodes[Math.floor(Math.random() * nodes.length)]!;
    if (targetNode.id !== id) {
      links.push({ source: id, target: targetNode.id, value: 1 });
    }
  }

  return { nodes, links };
};

export function SceniusGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [showLabels, setShowLabels] = useState(true);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    const data = generateGraphData();

    // Clear previous graph
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .style("max-width", "100%")
      .style("height", "auto");

    // Add a subtle background gradient
    const defs = svg.append("defs");
    const gradient = defs.append("radialGradient")
      .attr("id", "bg-gradient")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "50%");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#1F2937").attr("stop-opacity", 0.3);
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#0F172A").attr("stop-opacity", 0);

    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "url(#bg-gradient)");

    const g = svg.append("g");

    // Zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    // Color scale based on topics
    const colorScale = d3.scaleOrdinal()
      .domain(topics.map(t => t.slug))
      .range(['#DC2626', '#E11D48', '#BE123C', '#9F1239', '#881337', '#4C1D95', '#5B21B6', '#6D28D9']); // Scarlet to Orchid hues

    const simulation = d3
      .forceSimulation<GraphNode>(data.nodes)
      .force(
        "link",
        d3
          .forceLink<GraphNode, GraphLinkInitial>(data.links)
          .id((d) => d.id)
          .distance(100),
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collide",
        d3.forceCollide<GraphNode>().radius((d) => d.radius + 10).iterations(2),
      );

    const link = g
      .append("g")
      .attr("stroke", "#374151") // snow-800
      .attr("stroke-opacity", 0.4)
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value));

    const nodeGroup = g
      .append("g")
      .selectAll("g")
      .data(data.nodes)
      .join("g")
      .call(
        d3
          .drag<SVGGElement, GraphNode>()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended),
      );

    function linkEndpoints(l: GraphLinkInitial): { s: GraphNode; t: GraphNode } {
      const s = typeof l.source === "object" ? l.source : data.nodes.find((n) => n.id === l.source)!;
      const t = typeof l.target === "object" ? l.target : data.nodes.find((n) => n.id === l.target)!;
      return { s, t };
    }

    // Node circles
    nodeGroup
      .append("circle")
      .attr("r", (d) => d.radius)
      .attr("fill", (d) =>
        d.id.startsWith("fake") ? "#1F2937" : (colorScale(d.group) as string),
      )
      .attr("stroke", (d) => (d.id.startsWith("fake") ? "#374151" : "#fff"))
      .attr("stroke-width", (d) => (d.id.startsWith("fake") ? 1 : 2))
      .style("cursor", "pointer")
      .on("mouseover", (_event, d) => {
        if (!d.id.startsWith("fake")) {
          setHoveredNode(d);
          // Highlight connected links
          link
            .attr("stroke", (l) => {
              const { s, t } = linkEndpoints(l);
              return s.id === d.id || t.id === d.id ? "#DC2626" : "#374151";
            })
            .attr("stroke-opacity", (l) => {
              const { s, t } = linkEndpoints(l);
              return s.id === d.id || t.id === d.id ? 1 : 0.1;
            });
          // Dim other nodes
          nodeGroup.attr("opacity", (n) =>
            n.id === d.id ||
            data.links.some((l) => {
              const { s, t } = linkEndpoints(l);
              return (
                (s.id === d.id && t.id === n.id) || (t.id === d.id && s.id === n.id)
              );
            })
              ? 1
              : 0.2,
          );
        }
      })
      .on("mouseout", () => {
        setHoveredNode(null);
        link.attr("stroke", "#374151").attr("stroke-opacity", 0.4);
        nodeGroup.attr("opacity", 1);
      })
      .on("click", (_event, d) => {
        if (!d.id.startsWith("fake")) {
          router.push(`/profile/${d.id}`);
        }
      });

    // Node labels
    if (showLabels) {
      nodeGroup
        .append("text")
        .text((d) => (!d.id.startsWith("fake") ? d.name : ""))
        .attr("x", (d) => d.radius + 5)
        .attr("y", 4)
        .style("font-family", "Inter, sans-serif")
        .style("font-size", "10px")
        .style("fill", "#D1D5DB") // snow-300
        .style("pointer-events", "none");
    }

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => linkEndpoints(d).s.x ?? 0)
        .attr("y1", (d) => linkEndpoints(d).s.y ?? 0)
        .attr("x2", (d) => linkEndpoints(d).t.x ?? 0)
        .attr("y2", (d) => linkEndpoints(d).t.y ?? 0);

      nodeGroup.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    function dragstarted(event: D3DragEvent<SVGGElement, GraphNode, GraphNode>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: D3DragEvent<SVGGElement, GraphNode, GraphNode>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: D3DragEvent<SVGGElement, GraphNode, GraphNode>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [router, showLabels]);

  return (
    <div className="relative w-full h-screen bg-sage-950 overflow-hidden pt-20">
      
      {/* Context Panel */}
      <div className="absolute top-28 left-6 lg:left-12 z-10 max-w-sm pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-4xl text-white mb-4">The Scenius</h1>
          <p className="text-snow-400 text-sm leading-relaxed bg-sage-950/80 backdrop-blur-sm p-4 rounded-xl border border-snow-800/50">
            This is the Movemental credibility graph — a living map of how movement leaders reference, reinforce, and amplify one another&apos;s work.
          </p>
        </motion.div>
      </div>

      {/* Controls / Legend */}
      <div className="absolute bottom-12 left-6 lg:left-12 z-10 bg-sage-900/80 backdrop-blur-md border border-snow-800/50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium text-snow-300 uppercase tracking-wider">Controls</span>
          <button 
            onClick={() => setShowLabels(!showLabels)}
            className="text-xs text-scarlet-400 hover:text-scarlet-300 transition-colors"
          >
            {showLabels ? 'Hide Labels' : 'Show Labels'}
          </button>
        </div>
        <div className="space-y-2">
          {topics.slice(0, 4).map((topic, i) => {
            const colors = ['#DC2626', '#E11D48', '#BE123C', '#9F1239'];
            return (
              <div key={topic.slug} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors[i] }} />
                <span className="text-xs text-snow-400">{topic.name}</span>
              </div>
            );
          })}
          <div className="flex items-center mt-2 pt-2 border-t border-snow-800/50">
            <div className="w-3 h-3 rounded-full mr-2 bg-sage-800 border border-snow-700" />
            <span className="text-xs text-snow-500">Extended Network</span>
          </div>
        </div>
      </div>

      {/* Hover Info Panel */}
      <AnimatePresence>
        {hoveredNode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-12 right-6 lg:right-12 z-10 bg-sage-900 border border-snow-700/50 rounded-xl p-6 shadow-2xl max-w-xs pointer-events-none"
          >
            <h3 className="font-serif text-2xl text-white mb-1">{hoveredNode.name}</h3>
            <p className="text-sm text-scarlet-400 mb-3">{hoveredNode.role}</p>
            <div className="flex flex-wrap gap-2">
              {hoveredNode.topics.map((t: string) => (
                <span key={t} className="text-[10px] px-2 py-1 bg-sage-950 text-snow-400 rounded border border-snow-800/50 capitalize">
                  {t}
                </span>
              ))}
            </div>
            <p className="text-xs text-snow-500 mt-4 pt-4 border-t border-snow-800/50">
              Click to view full profile
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* D3 Container */}
      <div ref={containerRef} className="w-full h-full cursor-move">
        <svg ref={svgRef} className="w-full h-full" />
      </div>
    </div>
  );
}
