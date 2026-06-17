"use client";

import { useCallback, useEffect, useState } from "react";

import { DISCUSS_ENABLED } from "@/lib/agent-room/discuss";
import {
  appendUserTurn,
  finalizeAssistantTurn,
  updateStreamingAssistant,
  type ThreadTurn,
} from "@/lib/agent-room/thread";
import { DISCUSS_PASSAGE_THRESHOLD } from "@/lib/agent-room/discuss";

const THREAD_KEY = "movemental-room-thread";

function readStoredThread(): ThreadTurn[] {
  if (!DISCUSS_ENABLED || typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem(THREAD_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed) ? (parsed as ThreadTurn[]) : [];
  } catch {
    return [];
  }
}

/**
 * Single conversation thread shared by hybrid, stub, and stream controllers.
 */
export function useRoomThread() {
  const [thread, setThread] = useState<ThreadTurn[]>(readStoredThread);

  const appendUser = useCallback((content: string) => {
    setThread((prev) => appendUserTurn(prev, content));
  }, []);

  const updateStreaming = useCallback((content: string) => {
    setThread((prev) => updateStreamingAssistant(prev, content));
  }, []);

  const finalizeAssistant = useCallback((content: string) => {
    setThread((prev) => finalizeAssistantTurn(prev, content, DISCUSS_PASSAGE_THRESHOLD));
  }, []);

  const resetThread = useCallback(() => {
    setThread([]);
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.removeItem(THREAD_KEY);
      } catch {
        /* non-fatal */
      }
    }
  }, []);

  useEffect(() => {
    if (!DISCUSS_ENABLED || typeof window === "undefined") return;
    try {
      if (thread.length === 0) {
        window.sessionStorage.removeItem(THREAD_KEY);
      } else {
        window.sessionStorage.setItem(THREAD_KEY, JSON.stringify(thread));
      }
    } catch {
      /* non-fatal */
    }
  }, [thread]);

  return {
    thread,
    setThread,
    appendUser,
    updateStreaming,
    finalizeAssistant,
    resetThread,
  };
}
