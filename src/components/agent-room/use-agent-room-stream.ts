"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { parseSSEBuffer, type ComponentId } from "@/lib/agent-room/stream-chunk";
import { validateComponentProps } from "@/lib/agent-room/component-props";

const STREAM_PATH = "/api/agent-room/stream";
const ANON_KEY = "movemental-room-anon";
const SESSION_KEY = "movemental-room-session";

/** The screen zone: the opening hero until a render replaces it. */
export type ScreenState =
  | { kind: "opening" }
  | {
      kind: "component";
      component: ComponentId;
      props: Record<string, unknown>;
      /** Bumped per render so the rise animation re-fires. */
      nonce: number;
    };

/** The voice zone: a calm pulse while thinking, then the host's streaming words. */
export type VoiceState = { thinking: boolean; text: string };

type Turn = { role: "user" | "assistant"; content: string };

function makeId(prefix: string): string {
  const rand =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
  return `${prefix}-${rand}`;
}

function readOrCreate(storage: Storage | null, key: string, prefix: string): string {
  if (!storage) return makeId(prefix);
  const existing = storage.getItem(key);
  if (existing) return existing;
  const fresh = makeId(prefix);
  storage.setItem(key, fresh);
  return fresh;
}

export function useAgentRoomStream() {
  const [screen, setScreen] = useState<ScreenState>({ kind: "opening" });
  const [voice, setVoice] = useState<VoiceState>({ thinking: false, text: "" });
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /** True while the diagnostician composes the read-back (after agent_handoff). */
  const [composing, setComposing] = useState(false);

  const anonRef = useRef<string>("");
  const sessionRef = useRef<string>("");
  const historyRef = useRef<Turn[]>([]);
  const nonceRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    const ss = typeof window !== "undefined" ? window.sessionStorage : null;
    anonRef.current = readOrCreate(ls, ANON_KEY, "anon");
    sessionRef.current = readOrCreate(ss, SESSION_KEY, "sess");
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    historyRef.current = [];
    sessionRef.current = makeId("sess");
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(SESSION_KEY, sessionRef.current);
    }
    setScreen({ kind: "opening" });
    setVoice({ thinking: false, text: "" });
    setError(null);
    setComposing(false);
    setIsStreaming(false);
  }, []);

  const sendMessage = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || isStreaming) return;

      const priorHistory = [...historyRef.current];
      historyRef.current = [...historyRef.current, { role: "user", content: text }];

      setError(null);
      setComposing(false);
      setIsStreaming(true);
      setVoice({ thinking: true, text: "" });

      const controller = new AbortController();
      abortRef.current = controller;

      let assistant = "";

      try {
        const res = await fetch(STREAM_PATH, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            message: text,
            sessionId: sessionRef.current,
            anonId: anonRef.current,
            history: priorHistory.length ? priorHistory : undefined,
          }),
        });

        if (!res.ok || !res.body) {
          const body = (await res.json().catch(() => ({}))) as { error?: unknown };
          const msg =
            typeof body.error === "string" ? body.error : `Request failed (${res.status})`;
          setError(msg);
          setVoice({ thinking: false, text: "" });
          historyRef.current = priorHistory;
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        const drain = (chunkText: string) => {
          buffer += chunkText;
          const { chunks, remaining } = parseSSEBuffer(buffer);
          buffer = remaining;
          for (const ch of chunks) {
            switch (ch.type) {
              case "text_delta":
                assistant += ch.delta;
                setVoice({ thinking: false, text: assistant });
                break;
              case "progress":
                if (ch.phase === "thinking" && !assistant) {
                  setVoice((v) => ({ ...v, thinking: true }));
                }
                break;
              case "agent_handoff":
                // Host → diagnostician: the read-back is being composed.
                setComposing(true);
                setVoice({ thinking: true, text: "" });
                assistant = "";
                break;
              case "ui_render": {
                const props = validateComponentProps(ch.component, ch.props);
                if (props) {
                  nonceRef.current += 1;
                  setScreen({
                    kind: "component",
                    component: ch.component,
                    props,
                    nonce: nonceRef.current,
                  });
                  setComposing(false);
                }
                // Invalid props → drop the render (the voice still carries the turn).
                break;
              }
              case "error":
                setError(ch.message);
                break;
              default:
                break;
            }
          }
        };

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          drain(decoder.decode(value, { stream: true }));
        }
        if (buffer.trim()) drain("\n\n");

        if (assistant) {
          historyRef.current = [...historyRef.current, { role: "assistant", content: assistant }];
        }
        setVoice({ thinking: false, text: assistant });
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setError(e instanceof Error ? e.message : "Stream failed");
        setVoice({ thinking: false, text: "" });
        historyRef.current = priorHistory;
      } finally {
        setComposing(false);
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [isStreaming],
  );

  return { screen, voice, isStreaming, composing, error, sendMessage, reset };
}
