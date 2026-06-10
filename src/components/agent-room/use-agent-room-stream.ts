"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { parseSSEBuffer, type ComponentId } from "@/lib/agent-room/stream-chunk";
import { validateComponentProps } from "@/lib/agent-room/component-props";
import { useInk } from "./agent-room-context";
import { DEFAULT_SUGGESTIONS, type ComposerChip } from "./composer";
import { useDiscussPhase } from "./use-discuss-phase";
import {
  DISCUSS_PASSAGE_THRESHOLD,
  ENTER_DISCUSS_VALUE,
  type RoomPhase,
} from "@/lib/agent-room/discuss";

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
  // The ink layer (shared with the stub via the provider). INT-04 draws live
  // `ink_gesture` chunks through the same `drawGesture` the stub runner uses;
  // INT-03 routes `text_delta` through the same Caveat ink voice the stub's `say`
  // uses (`beginStream`/`appendStream`/`commitStream`), so live and stub share one
  // visual voice instead of plain `voice.text`.
  const { drawGesture, clearVoice, beginStream, appendStream, commitStream } = useInk();
  const discuss = useDiscussPhase();
  // Stable callbacks (so memoized handlers don't depend on the whole `discuss`
  // object, whose identity changes every render).
  const { appendTranscript, enterDiscuss, resetDiscuss } = discuss;
  // Latest phase for the async send loop (avoids a stale closure on `phase`).
  const phaseRef = useRef<RoomPhase>(discuss.phase);
  phaseRef.current = discuss.phase;

  const [screen, setScreen] = useState<ScreenState>({ kind: "opening" });
  const [voice, setVoice] = useState<VoiceState>({ thinking: false, text: "" });
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /** True while the diagnostician composes the read-back (after agent_handoff). */
  const [composing, setComposing] = useState(false);
  /**
   * Agent-driven composer chips (INT-05 `suggest`). `null` = no offer this turn,
   * fall back to the static on-ramp (`DEFAULT_SUGGESTIONS`). A `suggest` chunk
   * replaces this; `value` is sent back as the next user turn when tapped.
   */
  const [agentChips, setAgentChips] = useState<ComposerChip[] | null>(null);

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
    clearVoice();
    setVoice({ thinking: false, text: "" });
    setError(null);
    setComposing(false);
    setIsStreaming(false);
    setAgentChips(null); // back to the static on-ramp
    resetDiscuss(); // back to Guide; drop any Discuss transcript
  }, [clearVoice, resetDiscuss]);

  const sendMessage = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || isStreaming) return;

      const inDiscuss = phaseRef.current === "discuss";

      const priorHistory = [...historyRef.current];
      historyRef.current = [...historyRef.current, { role: "user", content: text }];
      // Discuss (INT-10): the visitor's turn lands on the sheet as a margin note.
      if (inDiscuss) appendTranscript({ role: "user", content: text, surface: "margin" });

      setError(null);
      setComposing(false);
      setIsStreaming(true);
      // The prior turn's chips no longer apply; a new `suggest` chunk repopulates.
      setAgentChips([]);
      // Wipe the prior turn's ink and show the calm thinking pulse until the
      // first delta (the pulse is stream-only — the stub never sets `thinking`).
      clearVoice();
      setVoice({ thinking: true, text: "" });

      const controller = new AbortController();
      abortRef.current = controller;

      let assistant = "";
      // Whether a streaming ink line is currently open (the drain loop runs
      // synchronously, so we can't read the async `stream` state here).
      let streamOpen = false;

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
            phase: phaseRef.current, // INT-10 — engine selects the phase-aware prompt
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
                // One growing ink line per assistant turn: open it on the first
                // delta, then grow the tail as more arrive (see §10 line-commit
                // policy). `voice.text` is kept only as a non-ink fallback.
                if (!streamOpen) {
                  beginStream();
                  streamOpen = true;
                }
                appendStream(assistant);
                setVoice({ thinking: false, text: assistant });
                break;
              case "progress":
                if (ch.phase === "thinking" && !assistant) {
                  setVoice((v) => ({ ...v, thinking: true }));
                }
                break;
              case "agent_handoff":
                // Host → diagnostician: settle the host's line, then pulse while
                // the read-back is composed.
                commitStream();
                streamOpen = false;
                setComposing(true);
                setVoice({ thinking: true, text: "" });
                assistant = "";
                break;
              case "ui_render": {
                const props = validateComponentProps(ch.component, ch.props);
                if (props) {
                  // A new screen settles the voice (prototype parity): commit the
                  // narration line so any later deltas open a fresh one.
                  commitStream();
                  streamOpen = false;
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
              case "ink_gesture":
                // Fire-and-forget: `drawGesture` waits a bounded number of frames
                // for the target to mount (the gesture may arrive in the same
                // batch as its `ui_render`), then draws — or no-ops if it never
                // appears. Never blocks the drain loop or throws.
                void drawGesture(ch.kind, ch.target);
                break;
              case "suggest":
                // The agent's `suggest` act: replace the composer chips. A tap
                // sends the chip's `value` back as the next user turn — except the
                // Discuss-transition sentinel (INT-10), which switches phase
                // **locally** (`enterDiscuss`) with no network round-trip (§2.4).
                setAgentChips(
                  ch.chips.map((c) => ({
                    label: c.label,
                    lead: c.lead,
                    onSelect:
                      c.value === ENTER_DISCUSS_VALUE
                        ? () => enterDiscuss("agent")
                        : () => void sendMessage(c.value),
                  })),
                );
                break;
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
        // Turn end. Guide (INT-03): settle the ephemeral ink line into the queue.
        // Discuss (INT-10): commit the turn to the transcript — a short reply stays
        // in the voice band, a long one (over the threshold) also lands as a sheet
        // passage (Model B §2.3) — then drop the ephemeral ink stream.
        if (phaseRef.current === "discuss") {
          if (assistant) {
            appendTranscript({
              role: "assistant",
              content: assistant,
              surface: assistant.length > DISCUSS_PASSAGE_THRESHOLD ? "passage" : "voice",
            });
          }
          clearVoice();
        } else {
          commitStream();
        }
        streamOpen = false;
        setVoice({ thinking: false, text: assistant });
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setError(e instanceof Error ? e.message : "Stream failed");
        clearVoice();
        setVoice({ thinking: false, text: "" });
        historyRef.current = priorHistory;
      } finally {
        setComposing(false);
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [
      isStreaming,
      drawGesture,
      clearVoice,
      beginStream,
      appendStream,
      commitStream,
      appendTranscript,
      enterDiscuss,
    ],
  );

  // Composer chips. They step aside inside a reality-check beat (the beat
  // carries its own answer chips). Otherwise the agent's `suggest` chips
  // (`agentChips`) win when offered; the static on-ramp is the fallback. Each
  // sends its utterance through the agent.
  const suggestions: ComposerChip[] =
    screen.kind === "component" && screen.component === "beat"
      ? []
      : (agentChips ??
        DEFAULT_SUGGESTIONS.map((s) => ({
          label: s.label,
          lead: s.lead,
          onSelect: () => sendMessage(s.say),
        })));

  return {
    screen,
    voice,
    suggestions,
    isStreaming,
    composing,
    error,
    sendMessage,
    reset,
    // Discuss phase (INT-08) — shared with the stub controller. Live Discuss
    // stream behavior (phase in POST, passage routing) lands in INT-10.
    phase: discuss.phase,
    transcript: discuss.transcript,
    discussTurnCount: discuss.discussTurnCount,
    enterDiscuss: discuss.enterDiscuss,
    exitDiscuss: discuss.exitDiscuss,
  };
}
