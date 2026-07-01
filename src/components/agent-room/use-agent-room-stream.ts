/**
 * @deprecated AU-20 — legacy full-AI stream controller. Use `useAgentRoomHybrid`
 * instead. Still available when `NEXT_PUBLIC_AGENT_ROOM_LEGACY_STREAM=1` and
 * `NEXT_PUBLIC_AGENT_ROOM_MODE=stream`.
 */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { resolveStreamChipRoute } from "@/lib/agent-room/composer-routing";
import { runAgentStreamTurn } from "@/lib/agent-room/agent-stream-turn";
import { resolveAssistantForTurnEnd } from "@/lib/agent-room/thread";
import { THINKING_STATUS } from "@/lib/agent-room/thinking-status";
import { beatScene } from "@/lib/agent-room/beat-scenes";
import type { Scene, SceneFactory, ScreenId, ShowOpts, SuggestChip } from "@/lib/agent-room/acts";
import { submitLead, LEADS } from "@/lib/agent-room/capture";
import { computeMapRead, getMapQuestionForShow, isTerminalBeatIndex, type MapOption, type MapRead } from "@/lib/agent-room/data/map-q";
import { SCENES } from "@/lib/agent-room/data/scenes";
import { CONCIERGE_VOICE } from "@/lib/agent-room/data/concierge-voice-lines";
import { handleSuggestChipTarget } from "@/lib/agent-room/suggest-chip-targets";
import {
  playOpeningChoreography,
  playToBeatColdVoiceChoreography,
  playToSafetyFlowVoiceChoreography,
  scheduleLocalChoreography,
} from "@/lib/agent-room/local-choreography";
import { validateComponentProps } from "@/lib/agent-room/component-props";
import { focusReadbackMapEmail } from "@/lib/agent-room/suggest-chip-targets";
import type { ComponentId } from "@/lib/agent-room/stream-chunk";
import { playScene, type Generation } from "@/lib/agent-room/scene-runner";
import { useInk } from "./agent-room-context";
import { DEFAULT_SUGGESTIONS, type ComposerChip } from "./composer";
import { useDiscussPhase } from "./use-discuss-phase";
import { useRoomThread } from "./use-room-thread";
import { ENTER_DISCUSS_VALUE, type RoomPhase } from "@/lib/agent-room/discuss";
import { requestExpandConversation } from "@/lib/agent-room/suggest-chip-targets";
import type { DockState } from "./shell/agent-dock";

const ANON_KEY = "movemental-room-anon";
const SESSION_KEY = "movemental-room-session";

/** The screen zone: opening hero, local stub screens, or agent ui_render. */
export type ScreenState =
  | { kind: "opening" }
  | {
      kind: "local";
      id: ScreenId;
      opts: ShowOpts;
      nonce: number;
    }
  | {
      kind: "component";
      component: ComponentId;
      props: Record<string, unknown>;
      /** Bumped per render so the rise animation re-fires. */
      nonce: number;
    };

/**
 * The voice zone: a calm pulse while thinking, then the host's streaming words.
 * `note` is an optional quiet status ("consulting the field guide") shown beside
 * the pulse while the host runs a tool — cleared the moment prose begins.
 */
export type VoiceState = { thinking: boolean; text: string; note?: string };

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
  const { inkLine, drawGesture, clearInk, clearVoice } = useInk();
  const discuss = useDiscussPhase();
  const { enterDiscuss, resetDiscuss, recordAssistantTurn } = discuss;
  const { thread, appendUser, updateStreaming, finalizeAssistant, discardStreaming, resetThread } = useRoomThread();
  const threadRef = useRef(thread);
  threadRef.current = thread;
  const streamingContentRef = useRef("");
  const dockExpandedRef = useRef(false);
  // Latest phase for the async send loop (avoids a stale closure on `phase`).
  const phaseRef = useRef<RoomPhase>(discuss.phase);
  phaseRef.current = discuss.phase;

  const [screen, setScreen] = useState<ScreenState>({ kind: "opening" });
  const [voice, setVoice] = useState<VoiceState>({ thinking: false, text: "" });
  const [isStreaming, setIsStreaming] = useState(false);
  /** Local choreography (opening / toBeatCold voice) — not the live agent. */
  const [localBusy, setLocalBusy] = useState(false);
  /** Composer chips from local scene `suggest` acts (readback forks, etc.). */
  const [localChips, setLocalChips] = useState<ComposerChip[] | null>(null);
  const [mapRead, setMapRead] = useState<MapRead | null>(null);
  const localGenRef = useRef<Generation>({ value: 0 });
  const mapAnswersRef = useRef<(MapOption | null)[]>([]);
  const lastSceneRef = useRef<string>("opening");
  const runRef = useRef<(name: string) => void>(() => {});
  const captureResolveRef = useRef<((r: { cancelled?: boolean }) => void) | null>(null);
  const capturePendingRef = useRef(false);
  const [error, setError] = useState<string | null>(null);
  /** True when `error` came from a transient failure (stall / 5xx / network). */
  const [errorRetryable, setErrorRetryable] = useState(false);
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
  /** Last text sent to the agent — replayed by `retry()` after a transient fail. */
  const lastTurnRef = useRef<string | null>(null);
  const hadUiRenderRef = useRef(false);

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

  const showLocal = useCallback(
    (id: ScreenId, opts: ShowOpts) => {
      clearInk();
      if (id === "beat" && (opts.qi ?? 0) === 0) {
        mapAnswersRef.current = [];
        setMapRead(null);
      }
      setScreen((prev) => ({
        kind: "local",
        id,
        opts,
        nonce: prev.kind === "local" ? prev.nonce + 1 : 1,
      }));
    },
    [clearInk],
  );

  const suggestLocal = useCallback((chips: SuggestChip[]) => {
    setAgentChips(null);
    setLocalChips(
      chips.map((c) => ({
        label: c.label,
        lead: c.lead,
        onSelect: () => {
          handleSuggestChipTarget(c.to, enterDiscuss, runRef.current, {
            lastScene: lastSceneRef.current,
          });
        },
      })),
    );
  }, [enterDiscuss]);

  const awaitCapture = useCallback(
    () =>
      new Promise<{ cancelled?: boolean }>((resolve) => {
        if (capturePendingRef.current) {
          capturePendingRef.current = false;
          resolve({});
        } else {
          captureResolveRef.current = resolve;
        }
      }),
    [],
  );

  const playLocalScene = useCallback(
    (scene: Parameters<typeof playScene>[0]) =>
      playScene(
        scene,
        {
          clearInk,
          clearVoice,
          say: inkLine,
          show: showLocal,
          gesture: drawGesture,
          suggest: suggestLocal,
          setBusy: setLocalBusy,
          awaitCapture,
        },
        localGenRef.current,
      ),
    [clearInk, clearVoice, inkLine, showLocal, drawGesture, suggestLocal, awaitCapture],
  );

  const runLocalScene = useCallback(
    (name: string) => {
      lastSceneRef.current = name;
      if (name === "toSafetyFlow" || name === "toSafetyFlowDiy" || name === "toSafetyFlowSignup") {
        const step =
          name === "toSafetyFlowDiy" ? "diy" : name === "toSafetyFlowSignup" ? "signup" : "question";
        showLocal("safetyFlow", { step });
        if (name === "toSafetyFlow") {
          void playToSafetyFlowVoiceChoreography(localCtx(), localGenRef.current);
        }
        return;
      }
      if (name === "toBeatCold") {
        showLocal("beat", { qi: 0, singleQuestionHint: true });
        void playToBeatColdVoiceChoreography(localCtx(), localGenRef.current);
        return;
      }
      if (name === "opening") {
        setScreen({ kind: "opening" });
        mapAnswersRef.current = [];
        setMapRead(null);
      }
      const entry = (SCENES as Record<string, Scene | SceneFactory | undefined>)[name];
      const scene = typeof entry === "function" ? entry() : entry;
      if (scene) void playLocalScene(scene);
    },
    [localCtx, playLocalScene, showLocal],
  );

  useEffect(() => {
    runRef.current = runLocalScene;
  }, [runLocalScene]);

  const startToSafetyFlow = useCallback(() => {
    localGenRef.current.value += 1;
    setLocalChips(null);
    setAgentChips(null);
    runLocalScene("toSafetyFlow");
  }, [runLocalScene]);

  const onBeatAnswer = useCallback(
    (qi: number, oi: number) => {
      const answers = [...mapAnswersRef.current];
      const question = getMapQuestionForShow(qi, answers);
      if (!question) return;
      answers[qi] = question.opts[oi];
      mapAnswersRef.current = answers;
      const read = computeMapRead(answers);
      const opt = answers[qi]!;
      if (isTerminalBeatIndex(qi, opt)) setMapRead(read);
      lastSceneRef.current = "beatScene";
      void playLocalScene(beatScene(qi, oi, read, answers));
    },
    [playLocalScene],
  );

  const onCaptureSubmit = useCallback((kind: string, values: Record<string, string>) => {
    const payload =
      kind === "map"
        ? {
            ...values,
            sessionId: sessionRef.current,
            anonId: anonRef.current,
            mapAnswers: [...mapAnswersRef.current],
            mapRead,
          }
        : { ...values, sessionId: sessionRef.current, anonId: anonRef.current };
    if (kind in LEADS) LEADS[kind as keyof typeof LEADS] = payload;
    void submitLead(kind, payload);
    const r = captureResolveRef.current;
    captureResolveRef.current = null;
    if (r) r({});
    else capturePendingRef.current = true;
  }, [mapRead]);

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
    setErrorRetryable(false);
    lastTurnRef.current = null;
    setComposing(false);
    setIsStreaming(false);
    setLocalBusy(false);
    setLocalChips(null);
    setMapRead(null);
    mapAnswersRef.current = [];
    setAgentChips(null); // back to the static on-ramp
    resetDiscuss();
    resetThread();
    playOpening();
  }, [clearInk, clearVoice, playOpening, resetDiscuss, resetThread]);

  const onDockStateChange = useCallback((state: DockState) => {
    dockExpandedRef.current = state === "expanded";
  }, []);

  const sendMessage = useCallback(
    async (raw: string, opts?: { isRetry?: boolean }) => {
      const text = raw.trim();
      if (!text || isStreaming || localBusy) return;

      localGenRef.current.value += 1;
      setLocalBusy(false);
      setLocalChips(null);

      lastTurnRef.current = text;
      hadUiRenderRef.current = false;

      const priorHistory = [...historyRef.current];
      historyRef.current = [...historyRef.current, { role: "user", content: text }];
      if (!opts?.isRetry) {
        appendUser(text);
      }

      setError(null);
      setErrorRetryable(false);
      setComposing(false);
      setIsStreaming(true);
      setAgentChips([]);
      clearVoice();
      setVoice({ thinking: true, text: "", note: THINKING_STATUS.readingQuestion });
      requestExpandConversation();
      streamingContentRef.current = "";

      const controller = new AbortController();
      abortRef.current = controller;

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
              requestExpandConversation();
              streamingContentRef.current = acc;
              updateStreaming(acc);
              setVoice({ thinking: false, text: "", note: undefined });
            },
            onProgressThinking: () => {
              setVoice((v) => ({ ...v, thinking: true }));
            },
            onThinkingStatus: (message) => {
              if (message) {
                setVoice((v) => ({ ...v, thinking: true, note: message }));
              } else {
                setVoice((v) => ({ ...v, note: undefined }));
              }
            },
            onToolActivity: (label) => {
              setVoice((v) => ({ ...v, thinking: true, note: label ?? undefined }));
            },
            onAgentHandoff: () => {
              setComposing(true);
              setVoice({ thinking: true, text: "", note: THINKING_STATUS.handoff });
            },
            onUiRender: (component, rawProps) => {
              hadUiRenderRef.current = true;
              const props = validateComponentProps(component, rawProps);
              if (!props) return;
              if (component === "capture" && (props as { kind?: string }).kind === "map") {
                focusReadbackMapEmail();
                return;
              }
              nonceRef.current += 1;
              setScreen({
                kind: "component",
                component,
                props,
                nonce: nonceRef.current,
              });
              setComposing(false);
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
          discardStreaming();
          if (result.error === "aborted") return;
          const displayError =
            result.error === "stalled"
              ? CONCIERGE_VOICE.stallRecovery
              : result.error;
          finalizeAssistant(displayError);
          setError(displayError);
          setErrorRetryable(Boolean(result.retryable));
          setVoice({ thinking: false, text: "", note: undefined });
          historyRef.current = priorHistory;
          return;
        }

        const resolved = resolveAssistantForTurnEnd(
          result.assistant,
          threadRef.current,
          hadUiRenderRef.current,
          streamingContentRef.current,
        );
        if (resolved) {
          historyRef.current = [...historyRef.current, { role: "assistant", content: resolved }];
          finalizeAssistant(resolved);
          if (phaseRef.current === "discuss") recordAssistantTurn();
        }
        clearVoice();
        setVoice({ thinking: false, text: "", note: undefined });
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
      inkLine,
      clearVoice,
      appendUser,
      updateStreaming,
      finalizeAssistant,
      discardStreaming,
      recordAssistantTurn,
      enterDiscuss,
    ],
  );

  const retry = useCallback(() => {
    const text = lastTurnRef.current;
    if (!text || isStreaming || localBusy) return;
    void sendMessage(text, { isRetry: true });
  }, [isStreaming, localBusy, sendMessage]);

  // Composer chips. Beat screen carries its own answer chips. Local choreography
  // may offer follow-up chips (beatIntro). Agent `suggest` chips win next; then
  // the static on-ramp with PAR-02 routing (LOCAL beatIntro vs AGENT utterance).
  const inLocalBeat = screen.kind === "local" && screen.id === "beat";
  const baseSuggestions: ComposerChip[] =
    inLocalBeat || (screen.kind === "component" && screen.component === "beat")
      ? []
      : (localChips ??
        agentChips ??
        DEFAULT_SUGGESTIONS.map((s) => {
          const route = resolveStreamChipRoute(s);
          return {
            label: s.label,
            lead: s.lead,
            onSelect: () => {
              if (route.kind === "local" && route.scene === "toSafetyFlow") {
                startToSafetyFlow();
              } else if (route.kind === "navigate") {
                window.location.assign(route.href);
              } else {
                void sendMessage(route.kind === "agent" ? route.utterance : s.say);
              }
            },
          };
        }));
  const suggestions: ComposerChip[] =
    errorRetryable && !inLocalBeat
      ? [{ label: "Try again", lead: true, onSelect: retry }, ...baseSuggestions]
      : baseSuggestions;

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
    mapRead,
    onBeatAnswer,
    onCaptureSubmit,
    // Discuss phase (INT-08) — shared with the stub controller. Live Discuss
    // stream behavior (phase in POST, passage routing) lands in INT-10.
    phase: discuss.phase,
    thread,
    discussTurnCount: discuss.discussTurnCount,
    enterDiscuss: discuss.enterDiscuss,
    exitDiscuss: discuss.exitDiscuss,
    onDockStateChange,
    stubDiscussCapture: false,
  };
}
