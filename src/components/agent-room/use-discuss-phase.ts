"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  DISCUSS_ENABLED,
  type DiscussReason,
  type RoomPhase,
  type TranscriptTurn,
} from "@/lib/agent-room/discuss";

/**
 * The Discuss-phase state, shared by both room controllers (INT-08). Keeping it
 * in one hook means `useAgentRoomStub` and `useAgentRoomStream` expose an
 * identical `phase` / `transcript` / `discussTurnCount` / `enterDiscuss` /
 * `exitDiscuss` surface, so `AgentRoomView` renders Model B the same way in
 * either mode.
 *
 * Guide keeps its ephemeral `voiceLines` + ink queue untouched; this hook only
 * adds the Discuss overlay state. `enterDiscuss` is gated by the feature flag —
 * with it off the room can never leave Guide, so Guide stays AF-12-identical.
 *
 * INT-08 is the foundation: the transition *triggers* (chips, implicit signals,
 * seeding from voice history) land in INT-09, and the live Discuss stream in
 * INT-10. A dev-only `window.__agentRoomDiscuss` seam lets a manual test drive
 * the phase + push transcript turns to verify the Model B layout now.
 */
export interface DiscussPhase {
  phase: RoomPhase;
  transcript: TranscriptTurn[];
  /** Assistant turns taken in Discuss — drives the turn-cap nudge (INT-09/INT-05). */
  discussTurnCount: number;
  enterDiscuss: (reason?: DiscussReason) => void;
  exitDiscuss: () => void;
  /** Append a turn to the transcript (INT-09/INT-10 wiring + dev seam). */
  appendTranscript: (turn: TranscriptTurn) => void;
  /** Full reset back to Guide with an empty transcript (called by `reset`). */
  resetDiscuss: () => void;
}

/** sessionStorage keys for Discuss refresh-survival (INT-09 §6, design §6.3). */
const PHASE_KEY = "movemental-room-discuss-phase";
const TRANSCRIPT_KEY = "movemental-room-discuss-transcript";

function clearDiscussStorage() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(PHASE_KEY);
    window.sessionStorage.removeItem(TRANSCRIPT_KEY);
  } catch {
    /* storage unavailable — non-fatal */
  }
}

/** Read a persisted Discuss session for refresh-survival (INT-09 §6). The live
 *  room mounts only after hydration (`AgentRoomShell` server-renders a fallback),
 *  so reading sessionStorage in a lazy initializer is safe — no SSR mismatch. */
function readStoredTranscript(): TranscriptTurn[] {
  if (!DISCUSS_ENABLED || typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem(TRANSCRIPT_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed) ? (parsed as TranscriptTurn[]) : [];
  } catch {
    return [];
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
  // Initialize from sessionStorage (refresh survival) — lazy initializers, not a
  // restore effect, so there's no synchronous setState-in-effect.
  const [phase, setPhase] = useState<RoomPhase>(readStoredPhase);
  const [transcript, setTranscript] = useState<TranscriptTurn[]>(readStoredTranscript);
  const [discussTurnCount, setDiscussTurnCount] = useState<number>(
    () => readStoredTranscript().filter((t) => t?.role === "assistant").length,
  );
  // Why Discuss was entered — recorded for the phase-aware prompt policy /
  // analytics that land in INT-09/INT-10 (no re-render needed yet).
  const reasonRef = useRef<DiscussReason | undefined>(undefined);

  const enterDiscuss = useCallback((reason?: DiscussReason) => {
    if (!DISCUSS_ENABLED) return; // flag off → Guide stays the only phase
    reasonRef.current = reason;
    setPhase("discuss");
  }, []);

  const exitDiscuss = useCallback(() => {
    // Return to Guide but keep the transcript so the "What we discussed" fold can
    // render on the sheet (§6.2). A full wipe is `resetDiscuss` (replay/home).
    setPhase("guide");
  }, []);

  const appendTranscript = useCallback((turn: TranscriptTurn) => {
    setTranscript((prev) => [...prev, turn]);
    if (turn.role === "assistant") setDiscussTurnCount((c) => c + 1);
  }, []);

  const resetDiscuss = useCallback(() => {
    setPhase("guide");
    setTranscript([]);
    setDiscussTurnCount(0);
    clearDiscussStorage(); // replay/home wipes the persisted session
  }, []);

  // Persist phase + transcript while a Discuss session exists; clear once the
  // room is back to an empty Guide. State is already seeded from storage above,
  // so this only ever writes (no setState) — no setState-in-effect.
  useEffect(() => {
    if (!DISCUSS_ENABLED || typeof window === "undefined") return;
    try {
      if (phase === "guide" && transcript.length === 0) {
        clearDiscussStorage();
      } else {
        window.sessionStorage.setItem(PHASE_KEY, phase);
        window.sessionStorage.setItem(TRANSCRIPT_KEY, JSON.stringify(transcript));
      }
    } catch {
      /* storage unavailable — non-fatal */
    }
  }, [phase, transcript]);

  // Dev-only seam (stripped from production) so a manual test / Playwright can
  // drive Discuss before the INT-09 triggers exist: `__agentRoomDiscuss.enter()`,
  // `.append({ role:'assistant', content:'…' })`, `.exit()`.
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    const w = window as unknown as {
      __agentRoomDiscuss?: {
        enter: (reason?: DiscussReason) => void;
        exit: () => void;
        append: (turn: TranscriptTurn) => void;
      };
    };
    w.__agentRoomDiscuss = { enter: enterDiscuss, exit: exitDiscuss, append: appendTranscript };
    return () => {
      delete w.__agentRoomDiscuss;
    };
  }, [enterDiscuss, exitDiscuss, appendTranscript]);

  return {
    phase,
    transcript,
    discussTurnCount,
    enterDiscuss,
    exitDiscuss,
    appendTranscript,
    resetDiscuss,
  };
}
