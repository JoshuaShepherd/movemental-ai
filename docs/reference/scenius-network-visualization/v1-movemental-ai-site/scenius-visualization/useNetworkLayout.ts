import { useEffect, useState } from 'react';
import * as d3 from 'd3-force';
import { NodeData, LinkData, ANCHOR_NODE_ID } from './network-data';

export interface LayoutNode extends NodeData, d3.SimulationNodeDatum {
  x: number;
  y: number;
}

export interface LayoutLink extends Omit<LinkData, 'source' | 'target'>, d3.SimulationLinkDatum<LayoutNode> {
  source: LayoutNode;
  target: LayoutNode;
}

export const WORLD_SIZE = 2000;
export const CENTER = WORLD_SIZE / 2;

export function useNetworkLayout(nodes: NodeData[], links: LinkData[]) {
  const [layoutNodes, setLayoutNodes] = useState<LayoutNode[]>([]);
  const [layoutLinks, setLayoutLinks] = useState<LayoutLink[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!nodes.length) return;

    const simNodes: LayoutNode[] = nodes.map(n => ({
      ...n,
      x: CENTER + (Math.random() - 0.5) * 100,
      y: CENTER + (Math.random() - 0.5) * 100,
      ...(n.id === ANCHOR_NODE_ID ? { fx: CENTER, fy: CENTER } : {})
    }));

    const simLinks = links.map(l => ({ ...l })) as unknown as LayoutLink[];

    const simulation = d3.forceSimulation<LayoutNode>(simNodes)
      .force('link', d3.forceLink<LayoutNode, LayoutLink>(simLinks).id(d => d.id).distance(80))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('collide', d3.forceCollide().radius(30))
      .stop();

    for (let i = 0; i < 300; ++i) {
      simulation.tick();
    }

    const timer = setTimeout(() => {
      setLayoutNodes(simNodes);
      setLayoutLinks(simLinks);
      setIsReady(true);
    }, 0);

    return () => clearTimeout(timer);
  }, [nodes, links]);

  return { layoutNodes, layoutLinks, isReady };
}
