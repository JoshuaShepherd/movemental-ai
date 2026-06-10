"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode, type RefObject } from "react";

import type { GestureKind } from "@/lib/agent-room/acts";
import { useInkGestures } from "./ink/use-ink-gestures";
import { useInkVoice, type StreamLine, type VoiceLineItem } from "./ink/use-ink-voice";

/**
 * The prototype reached for global DOM nodes by id (`#screen`, `#sheet`, `#ink`,
 * `#voice`) so the ink layer and runner could measure and draw against them.
 * In React those become refs shared through context — set by the shell zones
 * (AF-03), read by the ink/gesture layer (AF-04) and the scene runner (AF-05).
 */
export interface AgentRoomRefs {
  /** `#screen` — the stage; ink gestures are measured relative to this box. */
  screenEl: RefObject<HTMLElement | null>;
  /** `#sheet` — the manuscript page holding the active screen's content. */
  sheetEl: RefObject<HTMLDivElement | null>;
  /** `#ink` — the absolute SVG overlay strokes are appended to. */
  inkSvg: RefObject<SVGSVGElement | null>;
  /** `#voice` — the zone the agent's hand-written lines are written into. */
  voiceEl: RefObject<HTMLDivElement | null>;
}

/** The ink layer exposed to the runner (AF-05) and the voice zone. */
export interface InkApi {
  /** Write one voice line; resolves when it finishes drawing. */
  inkLine: (text: string) => Promise<void>;
  /** Draw a roughened gesture on a target (selector relative to the sheet). */
  drawGesture: (kind: GestureKind, target: string | HTMLElement) => Promise<void>;
  /** Wipe the gesture strokes (the `clear` act). */
  clearInk: () => void;
  /** Wipe the voice lines (returning home). */
  clearVoice: () => void;
  /** The current voice queue (≤ 2 lines) for the voice zone to render. */
  voiceLines: VoiceLineItem[];
  /** A voice line reports its write-on animation finished. */
  resolveLine: (id: number) => void;
  /** The active streaming line (live mode), or null. Grows as deltas arrive. */
  voiceStream: StreamLine | null;
  /** Start a streaming line (first `text_delta` of an assistant turn). */
  beginStream: () => void;
  /** Replace the streaming line with the full accumulated turn so far. */
  appendStream: (fullText: string) => void;
  /** Settle the streaming line into the queue (on `ui_render`/handoff/turn end). */
  commitStream: () => void;
}

type AgentRoomContextValue = AgentRoomRefs & InkApi;

const AgentRoomContext = createContext<AgentRoomContextValue | null>(null);

export function AgentRoomProvider({ children }: { children: ReactNode }) {
  // The ink layer owns the three stage refs (so its callbacks see stable refs);
  // the voice band ref is local since no callback closes over it.
  const { screenEl, sheetEl, inkSvg, drawGesture, clearInk } = useInkGestures();
  const voiceEl = useRef<HTMLDivElement | null>(null);
  const refs = { screenEl, sheetEl, inkSvg, voiceEl };

  const { lines, stream, inkLine, resolveLine, beginStream, appendStream, commitStream, clearVoice } =
    useInkVoice();

  // Dev-only test seam: lets a manual test / Playwright drive the ink layer
  // (`window.__agentRoomInk.inkLine(...)`) without shipping a debug button.
  // Stripped from production builds.
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    const w = window as unknown as { __agentRoomInk?: Pick<InkApi, "inkLine" | "drawGesture" | "clearInk"> };
    w.__agentRoomInk = { inkLine, drawGesture, clearInk };
    return () => {
      delete w.__agentRoomInk;
    };
  }, [inkLine, drawGesture, clearInk]);

  return (
    <AgentRoomContext.Provider
      value={{
        ...refs,
        inkLine,
        drawGesture,
        clearInk,
        clearVoice,
        voiceLines: lines,
        resolveLine,
        voiceStream: stream,
        beginStream,
        appendStream,
        commitStream,
      }}
    >
      {children}
    </AgentRoomContext.Provider>
  );
}

function useAgentRoom(): AgentRoomContextValue {
  const ctx = useContext(AgentRoomContext);
  if (!ctx) {
    throw new Error("useAgentRoom* must be used within an AgentRoomProvider");
  }
  return ctx;
}

/** The four shell refs (set by the zone components). */
export function useAgentRoomRefs(): AgentRoomRefs {
  const { screenEl, sheetEl, inkSvg, voiceEl } = useAgentRoom();
  return { screenEl, sheetEl, inkSvg, voiceEl };
}

/** The ink layer — voice + gestures (consumed by the runner and voice zone). */
export function useInk(): InkApi {
  const {
    inkLine,
    drawGesture,
    clearInk,
    clearVoice,
    voiceLines,
    resolveLine,
    voiceStream,
    beginStream,
    appendStream,
    commitStream,
  } = useAgentRoom();
  return {
    inkLine,
    drawGesture,
    clearInk,
    clearVoice,
    voiceLines,
    resolveLine,
    voiceStream,
    beginStream,
    appendStream,
    commitStream,
  };
}
