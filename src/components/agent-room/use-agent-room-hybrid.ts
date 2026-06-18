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
import { getKnownStreamChipRoute, getOpeningChipLocalScene, resolveChipRoute } from "@/lib/agent-room/composer-routing";
import { routeInput } from "@/lib/agent-room/route-input";
import { readAgentDeepLink, clearAgentDeepLinkParams } from "@/lib/agent-room/deep-link";
import { stashHandoffAudience, readHandoffScene, clearHandoffScene, isWaysInDoor, type AgentSayOptions } from "@/lib/agent-room/ways-in-doors";
import { CONCIERGE_VOICE } from "@/lib/agent-room/data/concierge-voice-lines";
import {
  ENTER_DISCUSS_VALUE,
  type RoomPhase,
} from "@/lib/agent-room/discuss";
import { handleSuggestChipTarget, focusReadbackMapEmail, HANDBOOK_EMAIL_CHIP_TARGET, focusHandbookEmail, FOCUS_HANDBOOK_EMAIL_EVENT, requestExpandConversation } from "@/lib/agent-room/suggest-chip-targets";
import { isEngineExtra, toScreenId } from "@/lib/agent-room/screen-map";
import type { ComponentId } from "@/lib/agent-room/stream-chunk";
import { playScene, type Generation } from "@/lib/agent-room/scene-runner";
import { useInk } from "./agent-room-context";
import type { ComposerChip } from "./composer";
import type { EngineExtraState } from "./screen/hybrid-screen";
import type { StreamScreenInput, StubScreenState } from "./screen/stub/stub-screen";
import type { VoiceState } from "./use-agent-room-stream";
import { useDiscussPhase } from "./use-discuss-phase";
import { useRoomThread } from "./use-room-thread";
import type { AgentRoomController } from "./use-agent-room-stub";
import type { DockState } from "./shell/agent-dock";

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
  if (component === "safetyFlow") {
    const step = props.step;
    return typeof step === "string" ? { step } : {};
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
  onDockStateChange: (state: DockState) => void;
} {
  const {
    inkLine,
    drawGesture,
    clearInk,
    clearVoice,
    commitStream,
  } = useInk();
  const discuss = useDiscussPhase();
  const { enterDiscuss, resetDiscuss, recordAssistantTurn } = discuss;
  const roomThread = useRoomThread();
  const { thread, appendUser, updateStreaming, finalizeAssistant, discardStreaming, resetThread } = roomThread;
  const phaseRef = useRef<RoomPhase>(discuss.phase);
  phaseRef.current = discuss.phase;

  const [screen, setScreen] = useState<StubScreenState>(INITIAL_SCREEN);
  const [suggestions, setSuggestions] = useState<ComposerChip[]>([]);
  const [agentChips, setAgentChips] = useState<ComposerChip[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [voice, setVoice] = useState<VoiceState>(INITIAL_VOICE);
  const [error, setError] = useState<string | null>(null);
  /** True when `error` came from a transient failure (stall / 5xx / network). */
  const [errorRetryable, setErrorRetryable] = useState(false);
  const [mapRead, setMapRead] = useState<MapRead | null>(null);
  const [handbookCaptureActive, setHandbookCaptureActive] = useState(false);
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
  /** Last text sent to the agent — replayed by `retry()` after a transient fail. */
  const lastTurnRef = useRef<string | null>(null);
  /** Expanded dock — typed input skips scripted scenes (SSOT I4). */
  const dockExpandedRef = useRef(false);
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
          const surface = dockExpandedRef.current ? "expanded" : "collapsed";
          const isOpeningChip =
            getOpeningChipLocalScene(c.label) !== null || getKnownStreamChipRoute(c.label) !== null;
          if (isOpeningChip) {
            const route = resolveChipRoute(
              { label: c.label, say: c.label, lead: c.lead },
              surface,
            );
            if (route.kind === "local") {
              runRef.current(route.scene);
              return;
            }
            if (route.kind === "navigate") {
              if (typeof window !== "undefined") window.location.assign(route.href);
              return;
            }
            requestExpandConversation();
            void sendMessageRef.current(route.utterance);
            return;
          }
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
        { clearInk, clearVoice, say: inkLine, show, gesture: drawGesture, suggest, setBusy, awaitCapture },
        genRef.current,
      ),
    [clearInk, clearVoice, inkLine, show, drawGesture, suggest, awaitCapture],
  );

  const run = useCallback(
    (name: string) => {
      lastSceneRef.current = name;
      if (name === HANDBOOK_EMAIL_CHIP_TARGET) {
        setHandbookCaptureActive(true);
        focusHandbookEmail();
      }
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

  const onDockStateChange = useCallback((state: DockState) => {
    dockExpandedRef.current = state === "expanded";
  }, []);

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
    async (text: string, opts?: { isRetry?: boolean }) => {
      lastTurnRef.current = text;
      const priorHistory = [...historyRef.current];
      historyRef.current = [...historyRef.current, { role: "user", content: text }];
      if (!opts?.isRetry) {
        appendUser(text);
      }

      setError(null);
      setErrorRetryable(false);
      setIsStreaming(true);
      setAgentChips([]);
      clearVoice();
      setVoice({ thinking: true, text: "" });
      requestExpandConversation();

      const controller = new AbortController();
      abortRef.current = controller;

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
            requestExpandConversation();
            updateStreaming(acc);
            setVoice({ thinking: false, text: "" });
          },
          onProseDiscard: () => {
            discardStreaming();
          },
          onProgressThinking: () => {
            setVoice((v) => ({ ...v, thinking: true }));
          },
          onToolActivity: (label) => {
            setVoice((v) => ({ ...v, note: label ?? undefined }));
          },
          onAgentHandoff: () => {
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
          if (result.retryable) {
            void inkLine(
              result.error === "stalled"
                ? CONCIERGE_VOICE.stallRecovery
                : CONCIERGE_VOICE.terminalError,
            );
            setError(null);
          } else {
            setError(result.error);
          }
          setErrorRetryable(Boolean(result.retryable));
          setVoice({ thinking: false, text: "" });
          historyRef.current = priorHistory;
          return;
        }

        const assistant = result.assistant;
        if (assistant) {
          historyRef.current = [...historyRef.current, { role: "assistant", content: assistant }];
          finalizeAssistant(assistant);
          if (phaseRef.current === "discuss") recordAssistantTurn();
        }
        clearVoice();
        setVoice({ thinking: false, text: "" });
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [
      appendUser,
      applyAgentUiRender,
      buildRoomContext,
      clearVoice,
      drawGesture,
      discardStreaming,
      enterDiscuss,
      finalizeAssistant,
      inkLine,
      recordAssistantTurn,
      updateStreaming,
    ],
  );

  const sendMessage = useCallback(
    (raw: string, opts?: AgentSayOptions) => {
      const text = raw.trim();
      if (!text || isStreaming) return;
      // Opening choreography sets busy while inkLine animates; expanding the dock
      // hides the handwriting strip but the runner must still finish. Once the
      // visitor engages the conversation panel, honor their message.
      if (busy && !dockExpandedRef.current && historyRef.current.length === 0) return;

      genRef.current.value += 1;
      setBusy(false);
      setAgentChips(null);

      const surface = dockExpandedRef.current ? "expanded" : "collapsed";
      const isOpeningLabel =
        getOpeningChipLocalScene(text) !== null || getKnownStreamChipRoute(text) !== null;
      if (isOpeningLabel) {
        const route = resolveChipRoute({ label: text, say: text }, surface);
        if (route.kind === "local") {
          run(route.scene);
          return;
        }
        if (route.kind === "agent") {
          void runAgentTurn(route.utterance);
          return;
        }
      }

      const fromWaysInPanel = opts?.source === "ways-in";
      const route = classifyTypedInput({
        type: "text",
        text,
        phase: phaseRef.current,
        screenId: screenRef.current.id,
        freeTextStreak: freeTextStreakRef.current,
        fallbackStreak: fallbackStreakRef.current,
        chatActive:
          (historyRef.current.length > 0 || thread.length > 0) &&
          !(fromWaysInPanel && isWaysInDoor(text)),
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

  const retry = useCallback(() => {
    const text = lastTurnRef.current;
    if (!text || busy || isStreaming) return;
    genRef.current.value += 1;
    setAgentChips(null);
    void runAgentTurn(text, { isRetry: true });
  }, [busy, isStreaming, runAgentTurn]);

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
    setErrorRetryable(false);
    lastTurnRef.current = null;
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
    dockExpandedRef.current = false;
    setHandbookCaptureActive(false);
    resetDiscuss();
    resetThread();
    run("opening");
  }, [abandonCapture, clearInk, clearVoice, resetDiscuss, resetThread, run]);

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

  // Seed hand-off: a reader on `/agent/nonprofits` (or any document surface) routes
  // here as `/agent?ask=…&from=<segment>`. Read the URL once on mount — stashing the
  // segment so the Ways-in panel opens route-aware — then, once the opening scene
  // has settled (idle, on home), deliver the question as the first turn so the guide
  // opens where the reading left off instead of dropping the visitor on home.
  const seedSentRef = useRef(false);
  const seedTextRef = useRef<string | null>(null);
  const seedReadRef = useRef(false);
  const sceneHandoffSentRef = useRef(false);
  const sceneHandoffRef = useRef<string | null>(null);
  useEffect(() => {
    if (seedReadRef.current) return;
    seedReadRef.current = true;
    const link = readAgentDeepLink();
    if (link?.kind === "ask") {
      seedTextRef.current = link.text;
      if (link.audience) stashHandoffAudience(link.audience);
    } else {
      const scene = readHandoffScene();
      if (scene) {
        clearHandoffScene();
        sceneHandoffRef.current = scene;
      }
    }
    clearAgentDeepLinkParams();
  }, []);
  useEffect(() => {
    if (seedSentRef.current) return;
    const text = seedTextRef.current;
    if (!text) {
      seedSentRef.current = true;
      return;
    }
    // Wait for the opening to finish (the local scene lands on `home` and clears
    // busy) so the send isn't swallowed by the busy/streaming gate.
    if (busy || isStreaming || screen.id !== "home") return;
    seedSentRef.current = true;
    seedTextRef.current = null;
    sendMessageRef.current(text);
  }, [busy, isStreaming, screen.id]);

  useEffect(() => {
    if (sceneHandoffSentRef.current) return;
    const scene = sceneHandoffRef.current;
    if (!scene) {
      sceneHandoffSentRef.current = true;
      return;
    }
    if (busy || isStreaming || screen.id !== "home") return;
    sceneHandoffSentRef.current = true;
    sceneHandoffRef.current = null;
    run(scene);
  }, [busy, isStreaming, screen.id, run]);

  useEffect(() => {
    const onOpenHandbook = () => setHandbookCaptureActive(true);
    document.addEventListener(FOCUS_HANDBOOK_EMAIL_EVENT, onOpenHandbook);
    return () => document.removeEventListener(FOCUS_HANDBOOK_EMAIL_EVENT, onOpenHandbook);
  }, []);

  const retryChip: ComposerChip = { label: "Try again", lead: true, onSelect: retry };
  const hybridSuggestions: ComposerChip[] =
    screen.id === "beat"
      ? []
      : errorRetryable
        ? [retryChip, ...(agentChips ?? suggestions)]
        : (agentChips ?? suggestions);

  const showHandbookCapture =
    handbookCaptureActive ||
    (screen.id === "readback" && mapRead !== null && !mapRead.clearedSafety);

  return {
    screen,
    voice,
    suggestions: hybridSuggestions,
    isStreaming: isStreaming || busy,
    error,
    mapRead,
    sendMessage,
    onDockStateChange,
    reset: goHome,
    onBeatAnswer,
    onLeaderSelect,
    onCaptureSubmit,
    onCaptureSkip,
    runScene: run,
    stubDiscussCapture: false,
    phase: discuss.phase,
    thread,
    discussTurnCount: discuss.discussTurnCount,
    enterDiscuss: discuss.enterDiscuss,
    exitDiscuss: discuss.exitDiscuss,
    engineExtra,
    streamInput,
    showHandbookCapture,
  };
}
