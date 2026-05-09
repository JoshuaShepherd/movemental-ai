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
          stroke: "var(--foreground)",
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
          stroke="var(--foreground)"
          strokeWidth={Math.max(0.85, strokeWidth * 0.88)}
          strokeLinecap="round"
          strokeOpacity={opacity * 0.72}
          strokeDasharray="2 11"
        />
      ) : null}
    </>
  );
}

export const MovementVoicesFlowEdge = memo(MovementVoicesFlowEdgeInner);
