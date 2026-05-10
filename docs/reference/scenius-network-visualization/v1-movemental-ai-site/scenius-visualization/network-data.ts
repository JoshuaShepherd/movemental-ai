export interface NodeData {
  id: string;
  label: string;
  tier: number;
  type: 'known' | 'persona';
  initials: string;
  image?: string;
}

export interface LinkData {
  source: string;
  target: string;
  tier: number;
}

export const ANCHOR_NODE_ID = 'alan-hirsch';

const generateNetworkData = () => {
  const nodes: NodeData[] = [
    { id: ANCHOR_NODE_ID, label: 'Alan Hirsch', tier: 0, type: 'known', initials: 'AH', image: 'https://picsum.photos/seed/alanhirsch/800/1000?grayscale' },
    { id: 'brad-brisco', label: 'Brad Brisco', tier: 1, type: 'known', initials: 'BB', image: 'https://picsum.photos/seed/bradbrisco/800/1000?grayscale' },
  ];

  const links: LinkData[] = [
    { source: 'brad-brisco', target: ANCHOR_NODE_ID, tier: 1 },
  ];

  let currentNodeCount = 2;
  const maxNodes = 100;
  const maxTiers = 12;

  for (let tier = 2; tier <= maxTiers; tier++) {
    const nodesInTier = Math.floor(Math.random() * 8) + 5;

    for (let i = 0; i < nodesInTier; i++) {
      if (currentNodeCount >= maxNodes) break;

      const id = `node-${currentNodeCount}`;
      const isPersona = Math.random() > 0.7;
      const initials = isPersona ? `P${currentNodeCount}` : `N${currentNodeCount}`;

      nodes.push({
        id,
        label: isPersona ? `Persona ${currentNodeCount}` : `Node ${currentNodeCount}`,
        tier,
        type: isPersona ? 'persona' : 'known',
        initials
      });

      const previousNodes = nodes.filter(n => n.tier < tier);
      const targetNode = previousNodes[Math.floor(Math.random() * previousNodes.length)];

      links.push({
        source: id,
        target: targetNode.id,
        tier
      });

      if (Math.random() > 0.6) {
        const anotherTarget = previousNodes[Math.floor(Math.random() * previousNodes.length)];
        if (anotherTarget.id !== targetNode.id) {
          links.push({
            source: id,
            target: anotherTarget.id,
            tier
          });
        }
      }

      currentNodeCount++;
    }
  }

  return { nodes, links };
};

export const { nodes: initialNodes, links: initialLinks } = generateNetworkData();
