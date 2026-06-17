"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  DISCUSS_ENABLED,
  type DiscussReason,
  type RoomPhase,
  type TranscriptTurn,
} from "@/lib/agent-room/discuss";

/**
 * Discuss **phase** state — engine behavior only (SSOT §5).
 * Conversation content lives in `useRoomThread`, not here.
 */
export interface DiscussPhase {
  phase: RoomPhase;
  /** Assistant turns taken in Discuss — drives the turn-cap nudge. */
  discussTurnCount: number;
  enterDiscuss: (reason?: DiscussReason) => void;
  exitDiscuss: () => void;
  resetDiscuss: () => void;
  /** Bump assistant turn count when a thread turn finalizes in discuss phase. */
  recordAssistantTurn: () => void;
}

const PHASE_KEY = "movemental-room-discuss-phase";

function clearDiscussStorage() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(PHASE_KEY);
  } catch {
    /* non-fatal */
  }
}

function readStoredPhase(): RoomPhase {
  if (!DISCUSS_ENABLED || typeof window === "undefined") return "guide";
  try {
    return window.sessionStorage.getItem(PHASE_KEY) === "discuss" ? "discuss" : "guide";
  } catch {
    return "guide";
  }
}

export function useDiscussPhase(): DiscussPhase {
  const [phase, setPhase] = useState<RoomPhase>(readStoredPhase);
  const [discussTurnCount, setDiscussTurnCount] = useState(0);
  const reasonRef = useRef<DiscussReason | undefined>(undefined);

  const enterDiscuss = useCallback((reason?: DiscussReason) => {
    if (!DISCUSS_ENABLED) return;
    reasonRef.current = reason;
    setPhase("discuss");
  }, []);

  const exitDiscuss = useCallback(() => {
    setPhase("guide");
  }, []);

  const recordAssistantTurn = useCallback(() => {
    setDiscussTurnCount((c) => c + 1);
  }, []);

  const resetDiscuss = useCallback(() => {
    setPhase("guide");
    setDiscussTurnCount(0);
    clearDiscussStorage();
  }, []);

  useEffect(() => {
    if (!DISCUSS_ENABLED || typeof window === "undefined") return;
    try {
      if (phase === "guide") {
        clearDiscussStorage();
      } else {
        window.sessionStorage.setItem(PHASE_KEY, phase);
      }
    } catch {
      /* non-fatal */
    }
  }, [phase]);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    const w = window as unknown as {
      __agentRoomDiscuss?: {
        enter: (reason?: DiscussReason) => void;
        exit: () => void;
        append: (turn: TranscriptTurn) => void;
      };
    };
    w.__agentRoomDiscuss = {
      enter: enterDiscuss,
      exit: exitDiscuss,
      append: () => {
        /* dev seam append — wire via useRoomThread in controllers */
      },
    };
    return () => {
      delete w.__agentRoomDiscuss;
    };
  }, [enterDiscuss, exitDiscuss]);

  return {
    phase,
    discussTurnCount,
    enterDiscuss,
    exitDiscuss,
    resetDiscuss,
    recordAssistantTurn,
  };
}
