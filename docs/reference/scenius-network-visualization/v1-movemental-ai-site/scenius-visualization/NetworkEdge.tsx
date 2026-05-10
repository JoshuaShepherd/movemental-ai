'use client';

import React, { useEffect, useRef } from 'react';
import { LayoutLink } from './useNetworkLayout';
import gsap from 'gsap';

interface NetworkEdgeProps {
  link: LayoutLink;
  isVisible: boolean;
}

export function NetworkEdge({ link, isVisible }: NetworkEdgeProps) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (isVisible && pathRef.current) {
      const length = pathRef.current.getTotalLength();
      gsap.fromTo(pathRef.current,
        { strokeDasharray: length, strokeDashoffset: length },
        { strokeDashoffset: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <path
      ref={pathRef}
      d={`M ${link.source.x} ${link.source.y} L ${link.target.x} ${link.target.y}`}
      className="stroke-border"
      strokeWidth={1.5}
      fill="none"
    />
  );
}
