"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NetworkEdge } from "./NetworkEdge";
import { NetworkNode } from "./NetworkNode";
import { NodeModal } from "./NodeModal";
import { initialLinks, initialNodes } from "./network-data";
import { CENTER, useNetworkLayout, WORLD_SIZE, type LayoutNode } from "./useNetworkLayout";

gsap.registerPlugin(ScrollTrigger);

export function SceniusVisualization() {
  const sectionRef = useRef<HTMLElement>(null);
  const cameraRef = useRef<SVGGElement>(null);
  const { layoutNodes, layoutLinks, isReady } = useNetworkLayout(initialNodes, initialLinks);
  const [selected, setSelected] = useState<LayoutNode | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const onNodeClick = useCallback((node: LayoutNode) => {
    setSelected(node);
    setSheetOpen(true);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const camera = cameraRef.current;
    if (!section || !camera || !isReady) return;

    const offsetX = -CENTER * 0.35;
    const offsetY = -CENTER * 0.25;

    const tween = gsap.fromTo(
      camera,
      { x: 0, y: 0 },
      {
        x: offsetX,
        y: offsetY,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [isReady]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-[180vh] w-full border-t border-border bg-muted/30"
        aria-label="Scenius network graph"
      >
        <div className="sticky top-14 z-0 flex h-[min(85vh,900px)] w-full items-center justify-center overflow-hidden px-2 py-8 md:px-6">
          <div className="relative h-full w-full max-w-6xl rounded-xl border border-border bg-background/80 shadow-sm backdrop-blur-sm">
            {!isReady ? (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Laying out network…
              </div>
            ) : (
              <svg
                className="h-full w-full touch-pan-y"
                viewBox={`0 0 ${WORLD_SIZE} ${WORLD_SIZE}`}
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-hidden
              >
                <rect
                  width={WORLD_SIZE}
                  height={WORLD_SIZE}
                  className="fill-muted/20"
                />
                <g ref={cameraRef}>
                  {layoutLinks.map((link, i) => (
                    <NetworkEdge key={`${link.source.id}-${link.target.id}-${i}`} link={link} isVisible />
                  ))}
                  {layoutNodes.map((node) => (
                    <NetworkNode
                      key={node.id}
                      node={node}
                      isVisible
                      onClick={onNodeClick}
                    />
                  ))}
                </g>
              </svg>
            )}
          </div>
        </div>
      </section>

      <NodeModal node={selected} open={sheetOpen} onOpenChange={setSheetOpen} />
    </>
  );
}
