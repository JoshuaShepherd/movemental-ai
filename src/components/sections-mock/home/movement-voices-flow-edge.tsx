"use client";

import { memo } from "react";
import { BaseEdge, getBezierPath, type EdgeProps } from "@xyflow/react";

export type MovementVoicesFlowEdgeData = {
  animateFlow: boolean;
  baseOpacity: number;
  strokeWidth: number;
  visible: boolean;
};

function MovementVoicesFlowEdgeInner(props: EdgeProps) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data,
  } = props;

  const d = data as MovementVoicesFlowEdgeData | undefined;
  const opacity = d?.visible ? d.baseOpacity : 0;
  const strokeWidth = d?.strokeWidth ?? 1;
  const animateFlow = Boolean(d?.animateFlow && d?.visible);

  const [path] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        style={{
          stroke: "var(--muted-foreground)",
          strokeWidth,
          strokeOpacity: opacity,
          strokeLinecap: "round",
          transition: "stroke-opacity 320ms ease-out",
        }}
      />
      {animateFlow ? (
        <path
          d={path}
          fill="none"
          className="react-flow__edge-path movement-voices-edge-flow-dash"
          stroke="var(--primary)"
          strokeWidth={Math.max(0.9, strokeWidth * 0.92)}
          strokeLinecap="round"
          strokeOpacity={opacity * 0.9}
          strokeDasharray="3 10"
        />
      ) : null}
    </>
  );
}

export const MovementVoicesFlowEdge = memo(MovementVoicesFlowEdgeInner);
