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
  THEME_NODE_H,
  THEME_NODE_W,
  VOICE_AVATAR_PX,
} from "./layout-movement-voices";
import {
  MOVEMENT_VOICES,
  MOVEMENT_VOICE_THEME_LINKS,
  VOICE_THEME_ANCHORS,
  type VoiceGraphVoice,
} from "./voices-graph-data";

type VoiceFlowData = { voice: VoiceGraphVoice };
type ThemeFlowData = { label: string };

const VoiceAvatarNode = memo(function VoiceAvatarNode({
  data,
}: NodeProps<Node<VoiceFlowData>>) {
  const v = data.voice;
  return (
    <div className="flex w-[72px] flex-col items-center gap-0 touch-manipulation">
      <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full bg-muted ring-1 ring-border">
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
        <span
          aria-hidden
          className="pointer-events-none absolute left-1.5 top-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-background/90 text-[10px] font-semibold tracking-tight text-foreground shadow-sm backdrop-blur-sm"
        >
          {v.initials}
        </span>
      </div>
    </div>
  );
});

const ThemeAnchorNode = memo(function ThemeAnchorNode({
  data,
}: NodeProps<Node<ThemeFlowData>>) {
  return (
    <div className="pointer-events-none flex max-w-28 touch-none items-center justify-center rounded-full border border-border bg-muted/90 px-3 py-1.5 text-center shadow-sm backdrop-blur-sm">
      <span className="text-[10px] font-medium uppercase tracking-eyebrow text-muted-foreground">
        {data.label}
      </span>
    </div>
  );
});

const nodeTypes = {
  voice: VoiceAvatarNode,
  theme: ThemeAnchorNode,
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

  for (const t of VOICE_THEME_ANCHORS) {
    const p = positions.get(t.id);
    if (!p) continue;
    out.push({
      id: t.id,
      type: "theme",
      position: { x: p.x - THEME_NODE_W / 2, y: p.y - THEME_NODE_H / 2 },
      data: { label: t.label },
      draggable: false,
      selectable: false,
    });
  }

  for (const v of MOVEMENT_VOICES) {
    const p = positions.get(v.id);
    if (!p) continue;
    out.push({
      id: v.id,
      type: "voice",
      position: { x: p.x - VOICE_AVATAR_PX / 2, y: p.y - VOICE_AVATAR_PX / 2 },
      data: { voice: v },
      draggable: false,
      selectable: false,
    });
  }

  return out;
}

const edges: Edge[] = MOVEMENT_VOICE_THEME_LINKS.map((l, i) => ({
  id: `mv-${i}`,
  source: l.source,
  target: l.target,
  style: {
    stroke: "var(--border)",
    strokeWidth: 1,
    strokeOpacity: 0.42,
  },
  interactionWidth: 20,
}));

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
      const h = Math.max(360, Math.min(540, w * 0.58));
      setDims({ w, h });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const positions = useMemo(
    () =>
      layoutMovementVoices(
        MOVEMENT_VOICES,
        VOICE_THEME_ANCHORS,
        MOVEMENT_VOICE_THEME_LINKS,
        dims.w,
        dims.h,
        reducedMotion,
      ),
    [dims.w, dims.h, reducedMotion],
  );

  const nodes = useMemo(() => flowNodesFromLayout(positions), [positions]);

  const onInit = useCallback((inst: ReactFlowInstance) => {
    rfRef.current = inst;
    inst.fitView({ padding: 0.18, duration: 0 });
  }, []);

  useEffect(() => {
    const inst = rfRef.current;
    if (!inst) return;
    inst.fitView({
      padding: 0.18,
      duration: reducedMotion ? 0 : 220,
    });
  }, [dims.w, dims.h, positions, reducedMotion]);

  const onNodeEnter = useCallback(
    (_: React.MouseEvent, n: Node) => {
      if (n.type === "voice" && n.data && "voice" in n.data) {
        setHoverVoice((n.data as VoiceFlowData).voice);
      }
    },
    [],
  );

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
                padding: 0.18,
                duration: reducedMotion ? 0 : 280,
              })
            }
          >
            Reset view
          </Button>
          <p className="max-w-sm text-xs text-muted-foreground md:text-right">
            Drag to pan, scroll or pinch to zoom. Hover a portrait for detail — a
            shared field of formation, mission, and place.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,260px)] lg:items-start">
        <div>
          <div
            ref={wrapRef}
            className="relative w-full overflow-hidden rounded-xl bg-card ring-1 ring-border"
            style={{ height: "min(520px, 70vh)", minHeight: 360 }}
          >
            <div
              className="h-full w-full"
              role="img"
              aria-label={ariaLabel}
            >
              <ReactFlow
                className="h-full w-full"
                nodes={nodes}
                edges={edges}
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
