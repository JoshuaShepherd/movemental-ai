"use client";

import Image from "next/image";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  Background,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
  type ReactFlowInstance,
} from "@xyflow/react";

import { Button } from "@/components/ui/button";

import {
  layoutMovementVoices,
  VOICE_AVATAR_PX,
} from "./layout-movement-voices";
import {
  CENTER_VOICE_ID,
  MOVEMENT_VOICES,
  type VoiceGraphVoice,
} from "./voices-graph-data";

type VoiceFlowData = { voice: VoiceGraphVoice; isCenter: boolean };

const VoiceAvatarNode = memo(function VoiceAvatarNode({
  data,
}: NodeProps<Node<VoiceFlowData>>) {
  const v = data.voice;
  return (
    <div className="flex w-[72px] flex-col items-center gap-0 touch-manipulation">
      <div
        className={`relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full bg-muted transition-shadow ${
          data.isCenter
            ? "ring-2 ring-foreground/80 ring-offset-2 ring-offset-card"
            : "ring-1 ring-border"
        }`}
      >
        <Image
          src={v.imageSrc}
          alt=""
          width={144}
          height={144}
          className="h-full w-full object-cover"
          sizes="72px"
          priority={false}
          aria-hidden
        />
      </div>
    </div>
  );
});

const nodeTypes = {
  voice: VoiceAvatarNode,
};

function subscribeReducedMotion(onChange: () => void): () => void {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function snapshotReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function flowNodesFromLayout(
  positions: Map<string, { x: number; y: number }>,
): Node[] {
  const out: Node[] = [];

  for (const v of MOVEMENT_VOICES) {
    const p = positions.get(v.id);
    if (!p) continue;
    out.push({
      id: v.id,
      type: "voice",
      position: { x: p.x - VOICE_AVATAR_PX / 2, y: p.y - VOICE_AVATAR_PX / 2 },
      data: { voice: v, isCenter: v.id === CENTER_VOICE_ID },
      draggable: false,
      selectable: false,
    });
  }

  return out;
}

/**
 * All-channel mesh — every voice connects to every other voice (K_n). Lines
 * touching the center voice render a hair stronger so Alan reads as the hub
 * without breaking the all-channel intent.
 */
const allChannelEdges: Edge[] = (() => {
  const edges: Edge[] = [];
  for (let i = 0; i < MOVEMENT_VOICES.length; i++) {
    for (let j = i + 1; j < MOVEMENT_VOICES.length; j++) {
      const a = MOVEMENT_VOICES[i].id;
      const b = MOVEMENT_VOICES[j].id;
      const touchesCenter = a === CENTER_VOICE_ID || b === CENTER_VOICE_ID;
      edges.push({
        id: `mv-${a}-${b}`,
        source: a,
        target: b,
        type: "straight",
        style: {
          stroke: "var(--foreground)",
          strokeWidth: touchesCenter ? 1 : 0.75,
          strokeOpacity: touchesCenter ? 0.28 : 0.16,
        },
        interactionWidth: 0,
      });
    }
  }
  return edges;
})();

interface MovementVoicesNetworkProps {
  ariaLabel: string;
}

export function MovementVoicesNetwork({ ariaLabel }: MovementVoicesNetworkProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const rfRef = useRef<ReactFlowInstance | null>(null);
  const [dims, setDims] = useState({ w: 640, h: 420 });
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    snapshotReducedMotion,
    () => false,
  );
  const [hoverVoice, setHoverVoice] = useState<VoiceGraphVoice | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect;
      if (!r) return;
      const w = Math.max(320, r.width);
      const h = Math.max(360, Math.min(540, w * 0.62));
      setDims({ w, h });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const positions = useMemo(
    () => layoutMovementVoices(MOVEMENT_VOICES, dims.w, dims.h),
    [dims.w, dims.h],
  );

  const nodes = useMemo(() => flowNodesFromLayout(positions), [positions]);

  const onInit = useCallback((inst: ReactFlowInstance) => {
    rfRef.current = inst;
    inst.fitView({ padding: 0.16, duration: 0 });
  }, []);

  useEffect(() => {
    const inst = rfRef.current;
    if (!inst) return;
    inst.fitView({
      padding: 0.16,
      duration: reducedMotion ? 0 : 220,
    });
  }, [dims.w, dims.h, positions, reducedMotion]);

  const onNodeEnter = useCallback((_: React.MouseEvent, n: Node) => {
    if (n.type === "voice" && n.data && "voice" in n.data) {
      setHoverVoice((n.data as VoiceFlowData).voice);
    }
  }, []);

  const onNodeLeave = useCallback(() => {
    setHoverVoice(null);
  }, []);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
          Movement Voices
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={() =>
              rfRef.current?.fitView({
                padding: 0.16,
                duration: reducedMotion ? 0 : 280,
              })
            }
          >
            Reset view
          </Button>
          <p className="max-w-sm text-xs text-muted-foreground md:text-right">
            Drag to pan, scroll or pinch to zoom. Hover a portrait for detail —
            an all-channel network of trusted voices around the conversation.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,260px)] lg:items-start">
        <div>
          <div
            ref={wrapRef}
            className="relative w-full overflow-hidden rounded-xl bg-card ring-1 ring-border"
            style={{ height: "min(540px, 72vh)", minHeight: 360 }}
          >
            <div
              className="h-full w-full"
              role="img"
              aria-label={ariaLabel}
            >
              <ReactFlow
                className="h-full w-full"
                nodes={nodes}
                edges={allChannelEdges}
                nodeTypes={nodeTypes}
                onInit={onInit}
                onNodeMouseEnter={onNodeEnter}
                onNodeMouseLeave={onNodeLeave}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                panOnDrag
                zoomOnScroll
                zoomOnPinch
                minZoom={0.4}
                maxZoom={1.65}
                proOptions={{ hideAttribution: true }}
              >
                <Background
                  gap={22}
                  color="var(--border)"
                  className="opacity-[0.35]"
                />
              </ReactFlow>
            </div>
          </div>
        </div>

        <aside
          className="rounded-xl border border-border bg-card p-4 shadow-ambient lg:min-h-[200px]"
          aria-live="polite"
        >
          {hoverVoice ? (
            <div className="space-y-2">
              <p className="text-[10px] font-medium uppercase tracking-eyebrow text-muted-foreground">
                Voice
              </p>
              <p className="text-base font-semibold leading-snug text-foreground">
                {hoverVoice.name}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {hoverVoice.title}
              </p>
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-muted-foreground">
              Hover a portrait to see who shapes the Movemental conversation —
              trusted voices in a shared ecosystem, not a flat directory.
            </p>
          )}
        </aside>
      </div>

      <ul className="sr-only">
        {MOVEMENT_VOICES.map((v) => (
          <li key={v.id}>
            {v.name}: {v.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
