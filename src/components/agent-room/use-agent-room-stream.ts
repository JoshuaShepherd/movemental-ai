"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  BEAT_INTRO_AGENT_CHIPS,
  resolveStreamChipRoute,
} from "@/lib/agent-room/composer-routing";
import { runAgentStreamTurn } from "@/lib/agent-room/agent-stream-turn";
import {
  playBeatIntroChoreography,
  playOpeningChoreography,
  scheduleLocalChoreography,
} from "@/lib/agent-room/local-choreography";
import { validateComponentProps } from "@/lib/agent-room/component-props";
import type { ComponentId } from "@/lib/agent-room/stream-chunk";
import type { Generation } from "@/lib/agent-room/scene-runner";
import { useInk } from "./agent-room-context";
import { DEFAULT_SUGGESTIONS, type ComposerChip } from "./composer";
import { useDiscussPhase } from "./use-discuss-phase";
import {
  DISCUSS_PASSAGE_THRESHOLD,
  ENTER_DISCUSS_VALUE,
  type RoomPhase,
} from "@/lib/agent-room/discuss";

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
  const { inkLine, drawGesture, clearInk, clearVoice, beginStream, appendStream, commitStream } =
    useInk();
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
  /** Local choreography (opening / beatIntro) — not the live agent. */
  const [localBusy, setLocalBusy] = useState(false);
  /** Chips offered after a local scene (e.g. beatIntro → "Okay, map it"). */
  const [localChips, setLocalChips] = useState<ComposerChip[] | null>(null);
  const localGenRef = useRef<Generation>({ value: 0 });
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

  const localCtx = useCallback(
    () => ({
      clearInk,
      say: inkLine,
      gesture: drawGesture,
      setBusy: setLocalBusy,
    }),
    [clearInk, inkLine, drawGesture],
  );

  const playOpening = useCallback(() => {
    setLocalChips(null);
    void playOpeningChoreography(localCtx(), localGenRef.current);
  }, [localCtx]);

  const playBeatIntro = useCallback(() => {
    localGenRef.current.value += 1; // cut opening or any in-flight local scene
    setLocalChips(null);
    const scene = playBeatIntroChoreography(localCtx(), localGenRef.current);
    // `playScene` bumps `gen.value` synchronously before its first await, so this
    // captures *this* run's generation. If the visitor sends / replays mid-scene,
    // `playScene` bails early but still resolves — without this guard the stale
    // "Okay, map it" chip would re-appear over the live turn the visitor moved to.
    const myGen = localGenRef.current.value;
    void scene.then(() => {
      if (localGenRef.current.value !== myGen) return; // superseded by send/reset
      setLocalChips(
        BEAT_INTRO_AGENT_CHIPS.map((c) => ({
          label: c.label,
          lead: c.lead,
          onSelect: () => void sendMessageRef.current(c.utterance),
        })),
      );
    });
  }, [localCtx]);

  const sendMessageRef = useRef<(raw: string) => void>(() => {});

  useEffect(() => scheduleLocalChoreography(playOpening), [playOpening]);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    localGenRef.current.value += 1; // cut any in-flight local scene
    historyRef.current = [];
    sessionRef.current = makeId("sess");
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(SESSION_KEY, sessionRef.current);
    }
    setScreen({ kind: "opening" });
    clearInk();
    clearVoice();
    setVoice({ thinking: false, text: "" });
    setError(null);
    setComposing(false);
    setIsStreaming(false);
    setLocalBusy(false);
    setLocalChips(null);
    setAgentChips(null); // back to the static on-ramp
    resetDiscuss(); // back to Guide; drop any Discuss transcript
    playOpening();
  }, [clearInk, clearVoice, playOpening, resetDiscuss]);

  const sendMessage = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || isStreaming || localBusy) return;

      localGenRef.current.value += 1; // visitor acted — cut local choreography
      setLocalBusy(false);
      setLocalChips(null);

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
      let streamOpen = false;

      try {
        const result = await runAgentStreamTurn({
          message: text,
          sessionId: sessionRef.current,
          anonId: anonRef.current,
          history: priorHistory,
          phase: phaseRef.current,
          signal: controller.signal,
          callbacks: {
            onTextDelta: (acc) => {
              assistant = acc;
              if (!streamOpen) {
                beginStream();
                streamOpen = true;
              }
              appendStream(assistant);
              setVoice({ thinking: false, text: assistant });
            },
            onProgressThinking: () => {
              setVoice((v) => ({ ...v, thinking: true }));
            },
            onAgentHandoff: () => {
              commitStream();
              streamOpen = false;
              setComposing(true);
              setVoice({ thinking: true, text: "" });
              assistant = "";
            },
            onUiRender: (component, rawProps) => {
              const props = validateComponentProps(component, rawProps);
              if (props) {
                commitStream();
                streamOpen = false;
                nonceRef.current += 1;
                setScreen({
                  kind: "component",
                  component,
                  props,
                  nonce: nonceRef.current,
                });
                setComposing(false);
              }
            },
            onInkGesture: (kind, target) => {
              void drawGesture(kind, target);
            },
            onSuggest: (chips) => {
              setAgentChips(
                chips.map((c) => ({
                  label: c.label,
                  lead: c.lead,
                  onSelect:
                    c.value === ENTER_DISCUSS_VALUE
                      ? () => enterDiscuss("agent")
                      : () => void sendMessage(c.value),
                })),
              );
            },
            onError: (message) => {
              setError(message);
            },
          },
        });

        if (result.ok === false) {
          if (result.error === "aborted") return;
          setError(result.error);
          setVoice({ thinking: false, text: "" });
          historyRef.current = priorHistory;
          return;
        }

        assistant = result.assistant;
        if (assistant) {
          historyRef.current = [...historyRef.current, { role: "assistant", content: assistant }];
        }
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
      } finally {
        setComposing(false);
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [
      isStreaming,
      localBusy,
      drawGesture,
      clearVoice,
      beginStream,
      appendStream,
      commitStream,
      appendTranscript,
      enterDiscuss,
    ],
  );

  // Composer chips. Beat screen carries its own answer chips. Local choreography
  // may offer follow-up chips (beatIntro). Agent `suggest` chips win next; then
  // the static on-ramp with PAR-02 routing (LOCAL beatIntro vs AGENT utterance).
  const suggestions: ComposerChip[] =
    screen.kind === "component" && screen.component === "beat"
      ? []
      : (localChips ??
        agentChips ??
        DEFAULT_SUGGESTIONS.map((s) => {
          const route = resolveStreamChipRoute(s);
          return {
            label: s.label,
            lead: s.lead,
            onSelect: () => {
              if (route.kind === "local" && route.scene === "beatIntro") {
                playBeatIntro();
              } else {
                void sendMessage(route.kind === "agent" ? route.utterance : s.say);
              }
            },
          };
        }));

  sendMessageRef.current = (raw) => void sendMessage(raw);

  return {
    screen,
    voice,
    suggestions,
    isStreaming: isStreaming || localBusy,
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
