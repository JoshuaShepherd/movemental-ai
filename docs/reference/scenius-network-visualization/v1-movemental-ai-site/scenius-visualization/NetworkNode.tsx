import React from 'react';
import { LayoutNode } from './useNetworkLayout';

interface NetworkNodeProps {
  node: LayoutNode;
  isVisible: boolean;
  onClick: (node: LayoutNode) => void;
}

export function NetworkNode({ node, isVisible, onClick }: NetworkNodeProps) {
  if (!isVisible) return null;

  const isAnchor = node.tier === 0;
  const isSecondary = node.tier === 1;
  const radius = isAnchor ? 24 : isSecondary ? 20 : 16;

  return (
    <g
      transform={`translate(${node.x},${node.y})`}
      onClick={() => onClick(node)}
      className="cursor-pointer transition-transform hover:scale-110"
    >
      {node.image ? (
        <>
          <defs>
            <clipPath id={`clip-${node.id}`}>
              <circle r={radius} />
            </clipPath>
          </defs>
          <circle
            r={radius + 2}
            className={isAnchor ? "fill-primary" : "fill-muted-foreground/80"}
          />
          <image
            href={node.image}
            x={-radius}
            y={-radius}
            height={radius * 2}
            width={radius * 2}
            clipPath={`url(#clip-${node.id})`}
            preserveAspectRatio="xMidYMid slice"
          />
        </>
      ) : (
        <>
          <circle
            r={radius}
            className={
              isAnchor
                ? "fill-primary stroke-background"
                : node.type === "persona"
                  ? "fill-accent stroke-background"
                  : "fill-muted-foreground/90 stroke-background"
            }
            strokeWidth={2}
          />
          <text
            textAnchor="middle"
            dy=".3em"
            className="pointer-events-none fill-background text-[10px] font-bold"
          >
            {node.initials}
          </text>
        </>
      )}
      {(isAnchor || isSecondary) && (
        <text
          y={isAnchor ? 36 : 32}
          textAnchor="middle"
          className="pointer-events-none fill-foreground text-xs font-semibold"
        >
          {node.label}
        </text>
      )}
    </g>
  );
}
