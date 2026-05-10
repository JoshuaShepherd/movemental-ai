'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useRouter } from 'next/navigation';
import { leaders, topics } from '@/lib/data';
import { motion, AnimatePresence } from 'motion/react';

// Generate more mock nodes and links to make the graph look impressive
const generateGraphData = () => {
  const nodes = [...leaders].map(l => ({ ...l, group: l.topics[0] || 'general', radius: 20 }));
  const links = [];

  // Add real connections
  leaders.forEach(source => {
    source.connections.forEach(targetId => {
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
      radius: 8 + Math.random() * 8
    });

    // Connect fake nodes to real nodes or other fake nodes
    const targetNode = nodes[Math.floor(Math.random() * nodes.length)];
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
  const [hoveredNode, setHoveredNode] = useState<any>(null);
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

    const simulation = d3.forceSimulation(data.nodes as d3.SimulationNodeDatum[])
      .force("link", d3.forceLink(data.links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius((d: any) => d.radius + 10).iterations(2));

    const link = g.append("g")
      .attr("stroke", "#374151") // snow-800
      .attr("stroke-opacity", 0.4)
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke-width", (d: any) => Math.sqrt(d.value));

    const nodeGroup = g.append("g")
      .selectAll("g")
      .data(data.nodes)
      .join("g")
      .call(d3.drag<SVGGElement, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any);

    // Node circles
    nodeGroup.append("circle")
      .attr("r", (d: any) => d.radius)
      .attr("fill", (d: any) => d.id.startsWith('fake') ? '#1F2937' : colorScale(d.group) as string)
      .attr("stroke", (d: any) => d.id.startsWith('fake') ? '#374151' : '#fff')
      .attr("stroke-width", (d: any) => d.id.startsWith('fake') ? 1 : 2)
      .style("cursor", "pointer")
      .on("mouseover", (event, d: any) => {
        if (!d.id.startsWith('fake')) {
          setHoveredNode(d);
          // Highlight connected links
          link.attr("stroke", (l: any) => l.source.id === d.id || l.target.id === d.id ? "#DC2626" : "#374151")
              .attr("stroke-opacity", (l: any) => l.source.id === d.id || l.target.id === d.id ? 1 : 0.1);
          // Dim other nodes
          nodeGroup.attr("opacity", (n: any) => n.id === d.id || data.links.some((l:any) => (l.source.id === d.id && l.target.id === n.id) || (l.target.id === d.id && l.source.id === n.id)) ? 1 : 0.2);
        }
      })
      .on("mouseout", () => {
        setHoveredNode(null);
        link.attr("stroke", "#374151").attr("stroke-opacity", 0.4);
        nodeGroup.attr("opacity", 1);
      })
      .on("click", (event, d: any) => {
        if (!d.id.startsWith('fake')) {
          router.push(`/profile/${d.id}`);
        }
      });

    // Node labels
    if (showLabels) {
      nodeGroup.append("text")
        .text((d: any) => !d.id.startsWith('fake') ? d.name : '')
        .attr("x", (d: any) => d.radius + 5)
        .attr("y", 4)
        .style("font-family", "Inter, sans-serif")
        .style("font-size", "10px")
        .style("fill", "#D1D5DB") // snow-300
        .style("pointer-events", "none");
    }

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      nodeGroup
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
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
