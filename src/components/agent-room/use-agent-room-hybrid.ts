"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  runAgentStreamTurn,
  type RoomContext,
  type StreamTurn,
} from "@/lib/agent-room/agent-stream-turn";
import type { ScreenId, Scene, SceneFactory, ShowOpts, SuggestChip } from "@/lib/agent-room/acts";
import { validateComponentProps } from "@/lib/agent-room/component-props";
import { SCENES } from "@/lib/agent-room/data/scenes";
import { submitLead, LEADS } from "@/lib/agent-room/capture";
import { MAP_Q, computeMapRead, type MapOption, type MapRead } from "@/lib/agent-room/data/map-q";
import { beatScene } from "@/lib/agent-room/beat-scenes";
import { leaderScene, leaderWorkScene, leaderConnectScene } from "@/lib/agent-room/leader-scenes";
import {
  classifyTypedInput,
  isTypedFallback,
  shouldResetTextStreak,
} from "@/lib/agent-room/move-classifier";
import { routeInput, FALLBACK_SAY } from "@/lib/agent-room/route-input";
import {
  DISCUSS_PASSAGE_THRESHOLD,
  ENTER_DISCUSS_VALUE,
  type RoomPhase,
} from "@/lib/agent-room/discuss";
import { handleSuggestChipTarget, focusReadbackMapEmail } from "@/lib/agent-room/suggest-chip-targets";
import { isEngineExtra, toScreenId } from "@/lib/agent-room/screen-map";
import type { ComponentId } from "@/lib/agent-room/stream-chunk";
import { playScene, type Generation } from "@/lib/agent-room/scene-runner";
import { useInk } from "./agent-room-context";
import type { ComposerChip } from "./composer";
import type { EngineExtraState } from "./screen/hybrid-screen";
import type { StreamScreenInput, StubScreenState } from "./screen/stub/stub-screen";
import type { VoiceState } from "./use-agent-room-stream";
import { useDiscussPhase } from "./use-discuss-phase";
import type { AgentRoomController } from "./use-agent-room-stub";

const ANON_KEY = "movemental-room-anon";
const SESSION_KEY = "movemental-room-session";

const INITIAL_SCREEN: StubScreenState = { id: "home", opts: {}, nonce: 0 };
const INITIAL_VOICE: VoiceState = { thinking: false, text: "" };

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

/** Props → stub `ShowOpts` when the agent renders an Ink Band screen. */
function optsFromAgentRender(
  component: ComponentId,
  props: Record<string, unknown>,
): ShowOpts {
  if (component === "beat") {
    const step = (props.progress as { step?: number } | undefined)?.step;
    return { qi: typeof step === "number" ? Math.max(0, step - 1) : 0 };
  }
  if (component === "leader") {
    const id = props.id;
    return typeof id === "number" ? { id } : {};
  }
  if (component === "capture") {
    const kind = props.kind;
    return typeof kind === "string" ? { kind } : {};
  }
  return {};
}

/**
 * Hybrid room controller — full local `SCENES` runner plus SSE agent turns on
 * classified unscripted moves (typed fallback, Discuss phase, agent chips).
 */
export function useAgentRoomHybrid(): AgentRoomController & {
  voice: VoiceState;
  engineExtra: EngineExtraState | null;
  streamInput: StreamScreenInput | null;
} {
  const {
    inkLine,
    drawGesture,
    clearInk,
    clearVoice,
    beginStream,
    appendStream,
    commitStream,
  } = useInk();
  const discuss = useDiscussPhase();
  const { appendTranscript, enterDiscuss, resetDiscuss } = discuss;
  const phaseRef = useRef<RoomPhase>(discuss.phase);
  phaseRef.current = discuss.phase;

  const [screen, setScreen] = useState<StubScreenState>(INITIAL_SCREEN);
  const [suggestions, setSuggestions] = useState<ComposerChip[]>([]);
  const [agentChips, setAgentChips] = useState<ComposerChip[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [voice, setVoice] = useState<VoiceState>(INITIAL_VOICE);
  const [error, setError] = useState<string | null>(null);
  const [mapRead, setMapRead] = useState<MapRead | null>(null);
  const [engineExtra, setEngineExtra] = useState<EngineExtraState | null>(null);
  const [streamInput, setStreamInput] = useState<StreamScreenInput | null>(null);

  const genRef = useRef<Generation>({ value: 0 });
  const runRef = useRef<(name: string) => void>(() => {});
  const sendMessageRef = useRef<(raw: string) => void>(() => {});
  const mapAnswersRef = useRef<(MapOption | null)[]>([]);
  const currentLeaderRef = useRef<number>(0);
  const lastSceneRef = useRef<string>("opening");
  const captureResolveRef = useRef<((r: { cancelled?: boolean }) => void) | null>(null);
  const capturePendingRef = useRef(false);
  const freeTextStreakRef = useRef(0);
  const fallbackStreakRef = useRef(0);
  const anonRef = useRef<string>("");
  const sessionRef = useRef<string>("");
  const historyRef = useRef<StreamTurn[]>([]);
  const abortRef = useRef<AbortController | null>(null);
  const screenRef = useRef(screen);
  screenRef.current = screen;

  useEffect(() => {
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    const ss = typeof window !== "undefined" ? window.sessionStorage : null;
    anonRef.current = readOrCreate(ls, ANON_KEY, "anon");
    sessionRef.current = readOrCreate(ss, SESSION_KEY, "sess");
  }, []);

  const buildRoomContext = useCallback((): RoomContext => {
    return {
      screenId: screenRef.current.id,
      lastScene: lastSceneRef.current,
      phase: phaseRef.current,
      mapAnswersCount: mapAnswersRef.current.filter(Boolean).length,
      inLocalScene: busy,
    };
  }, [busy]);

  const show = useCallback(
    (id: ScreenId, opts: ShowOpts) => {
      clearInk();
      setEngineExtra(null);
      setStreamInput(null);
      if (id === "home") clearVoice();
      if (id === "beat" && (opts.qi ?? 0) === 0) {
        mapAnswersRef.current = [];
        setMapRead(null);
      }
      setScreen((prev) => ({ id, opts, nonce: prev.nonce + 1 }));
    },
    [clearInk, clearVoice],
  );

  const suggest = useCallback((chips: SuggestChip[]) => {
    setAgentChips(null);
    setSuggestions(
      chips.map((c) => ({
        label: c.label,
        lead: c.lead,
        onSelect: () => {
          freeTextStreakRef.current = 0;
          handleSuggestChipTarget(
            c.to,
            discuss.enterDiscuss,
            runRef.current,
            { lastScene: lastSceneRef.current },
          );
        },
      })),
    );
  }, [discuss.enterDiscuss]);

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

  const abandonCapture = useCallback(() => {
    capturePendingRef.current = false;
    const r = captureResolveRef.current;
    captureResolveRef.current = null;
    if (r) r({ cancelled: true });
  }, []);

  const play = useCallback(
    (scene: Scene) =>
      playScene(
        scene,
        { clearInk, say: inkLine, show, gesture: drawGesture, suggest, setBusy, awaitCapture },
        genRef.current,
      ),
    [clearInk, inkLine, show, drawGesture, suggest, awaitCapture],
  );

  const run = useCallback(
    (name: string) => {
      lastSceneRef.current = name;
      if (name === "leaderWork") {
        void play(leaderWorkScene(currentLeaderRef.current));
        return;
      }
      if (name === "leaderConnect") {
        void play(leaderConnectScene(currentLeaderRef.current));
        return;
      }
      const entry = (SCENES as Record<string, Scene | SceneFactory | undefined>)[name];
      const scene = typeof entry === "function" ? entry() : entry;
      if (scene) void play(scene);
    },
    [play],
  );

  useEffect(() => {
    runRef.current = run;
  }, [run]);

  const applyAgentUiRender = useCallback(
    (component: ComponentId, rawProps: Record<string, unknown>) => {
      const props = validateComponentProps(component, rawProps);
      if (!props) return;

      commitStream();
      setAgentChips(null);

      // Map capture is inline under readback — never swap to the full capture screen.
      if (component === "capture" && (props as { kind?: string }).kind === "map") {
        focusReadbackMapEmail();
        return;
      }

      if (isEngineExtra(component)) {
        setEngineExtra({ component, props });
        setStreamInput(null);
        return;
      }

      const screenId = toScreenId(component);
      if (!screenId) return;

      setEngineExtra(null);
      setStreamInput({
        props,
        onSay: (text) => void sendMessageRef.current(text),
      });
      setScreen((prev) => ({
        id: screenId,
        opts: optsFromAgentRender(component, props),
        nonce: prev.nonce + 1,
      }));
    },
    [commitStream],
  );

  const runAgentTurn = useCallback(
    async (text: string) => {
      const inDiscuss = phaseRef.current === "discuss";
      const priorHistory = [...historyRef.current];
      historyRef.current = [...historyRef.current, { role: "user", content: text }];
      if (inDiscuss) appendTranscript({ role: "user", content: text, surface: "margin" });

      setError(null);
      setIsStreaming(true);
      setAgentChips([]);
      clearVoice();
      setVoice({ thinking: true, text: "" });

      const controller = new AbortController();
      abortRef.current = controller;

      let streamOpen = false;

      try {
        const result = await runAgentStreamTurn({
        message: text,
        sessionId: sessionRef.current,
        anonId: anonRef.current,
        history: priorHistory,
        phase: phaseRef.current,
        roomContext: buildRoomContext(),
        signal: controller.signal,
        callbacks: {
          onTextDelta: (acc) => {
            if (!streamOpen) {
              beginStream();
              streamOpen = true;
            }
            appendStream(acc);
            setVoice({ thinking: false, text: acc });
          },
          onProgressThinking: () => {
            setVoice((v) => ({ ...v, thinking: true }));
          },
          onAgentHandoff: () => {
            commitStream();
            streamOpen = false;
            setVoice({ thinking: true, text: "" });
          },
          onUiRender: (component, props) => {
            applyAgentUiRender(component, props);
          },
          onInkGesture: (kind, target) => {
            void drawGesture(kind, target);
          },
          onSuggest: (chips) => {
            setSuggestions([]);
            setAgentChips(
              chips.map((c) => ({
                label: c.label,
                lead: c.lead,
                onSelect:
                  c.value === ENTER_DISCUSS_VALUE
                    ? () => enterDiscuss("agent")
                    : () => void sendMessageRef.current(c.value),
              })),
            );
          },
          onError: (message) => {
            setError(message);
          },
        },
      });

        if (result.ok === false) {
          if (result.error === "aborted") {
            historyRef.current = priorHistory;
            return;
          }
          setError(result.error);
          setVoice({ thinking: false, text: "" });
          historyRef.current = priorHistory;
          if (result.status === 502 || result.status === 503) {
            void play([{ say: FALLBACK_SAY }]);
          }
          return;
        }

        const assistant = result.assistant;
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
          // Long passages live on the thread; short voice lines stay in live ink.
          setVoice({
            thinking: false,
            text:
              assistant && assistant.length <= DISCUSS_PASSAGE_THRESHOLD ? assistant : "",
          });
        } else {
          commitStream();
          setVoice({ thinking: false, text: assistant });
        }
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [
      appendStream,
      appendTranscript,
      applyAgentUiRender,
      beginStream,
      buildRoomContext,
      clearVoice,
      commitStream,
      drawGesture,
      enterDiscuss,
      play,
    ],
  );

  const sendMessage = useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text || busy || isStreaming) return;

      genRef.current.value += 1;
      setAgentChips(null);

      const route = classifyTypedInput({
        type: "text",
        text,
        phase: phaseRef.current,
        screenId: screenRef.current.id,
        freeTextStreak: freeTextStreakRef.current,
        fallbackStreak: fallbackStreakRef.current,
      });

      freeTextStreakRef.current += 1;
      if (routeInput(text) === "fallback") {
        fallbackStreakRef.current += 1;
      } else if (!isTypedFallback(route)) {
        fallbackStreakRef.current = 0;
      }
      if (shouldResetTextStreak(route)) {
        freeTextStreakRef.current = 0;
        fallbackStreakRef.current = 0;
      }

      if (route.kind === "local" && "scene" in route) {
        run(route.scene);
        return;
      }

      void runAgentTurn(text);
    },
    [busy, isStreaming, run, runAgentTurn],
  );

  sendMessageRef.current = (raw) => sendMessage(raw);

  const goHome = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    genRef.current.value += 1;
    abandonCapture();
    setBusy(false);
    setIsStreaming(false);
    clearInk();
    clearVoice();
    setVoice(INITIAL_VOICE);
    setError(null);
    setAgentChips(null);
    setEngineExtra(null);
    setStreamInput(null);
    historyRef.current = [];
    sessionRef.current = makeId("sess");
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(SESSION_KEY, sessionRef.current);
    }
    freeTextStreakRef.current = 0;
    fallbackStreakRef.current = 0;
    resetDiscuss();
    run("opening");
  }, [abandonCapture, clearInk, clearVoice, resetDiscuss, run]);

  const onBeatAnswer = useCallback(
    (qi: number, oi: number) => {
      const answers = [...mapAnswersRef.current];
      answers[qi] = MAP_Q[qi].opts[oi];
      mapAnswersRef.current = answers;
      const read = computeMapRead(answers);
      if (qi >= MAP_Q.length - 1 || MAP_Q[qi].opts[oi].gateFail) setMapRead(read);
      lastSceneRef.current = "beatScene";
      void play(beatScene(qi, oi, read));
    },
    [play],
  );

  const onLeaderSelect = useCallback(
    (i: number) => {
      currentLeaderRef.current = i;
      lastSceneRef.current = "leaderScene";
      void play(leaderScene(i));
    },
    [play],
  );

  const onCaptureSubmit = useCallback(
    (kind: string, values: Record<string, string>) => {
      const session = { sessionId: sessionRef.current, anonId: anonRef.current };
      const payload =
        kind === "map"
          ? { ...values, ...session, mapAnswers: [...mapAnswersRef.current], mapRead }
          : { ...values, ...session };
      if (kind in LEADS) LEADS[kind as keyof typeof LEADS] = payload;
      void submitLead(kind, payload);
      const r = captureResolveRef.current;
      captureResolveRef.current = null;
      if (r) r({});
      else capturePendingRef.current = true;
    },
    [mapRead],
  );

  const onCaptureSkip = useCallback(() => {
    abandonCapture();
    run("toSafety");
  }, [abandonCapture, run]);

  useEffect(() => {
    let cancelled = false;
    const boot = () => {
      if (!cancelled) run("opening");
    };
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(boot).catch(boot);
    } else {
      boot();
    }
    return () => {
      cancelled = true;
    };
  }, [run]);

  const hybridSuggestions: ComposerChip[] =
    screen.id === "beat"
      ? []
      : (agentChips ?? suggestions);

  return {
    screen,
    voice,
    suggestions: hybridSuggestions,
    isStreaming: isStreaming || busy,
    error,
    mapRead,
    sendMessage,
    reset: goHome,
    onBeatAnswer,
    onLeaderSelect,
    onCaptureSubmit,
    onCaptureSkip,
    stubDiscussCapture: false,
    phase: discuss.phase,
    transcript: discuss.transcript,
    discussTurnCount: discuss.discussTurnCount,
    enterDiscuss: discuss.enterDiscuss,
    exitDiscuss: discuss.exitDiscuss,
    engineExtra,
    streamInput,
  };
}
