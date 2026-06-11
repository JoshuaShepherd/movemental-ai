"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { resolveStreamChipRoute } from "@/lib/agent-room/composer-routing";
import { runAgentStreamTurn } from "@/lib/agent-room/agent-stream-turn";
import { beatScene } from "@/lib/agent-room/beat-scenes";
import type { Scene, SceneFactory, ScreenId, ShowOpts, SuggestChip } from "@/lib/agent-room/acts";
import { submitLead, LEADS } from "@/lib/agent-room/capture";
import { MAP_Q, computeMapRead, type MapOption, type MapRead } from "@/lib/agent-room/data/map-q";
import { SCENES } from "@/lib/agent-room/data/scenes";
import { handleSuggestChipTarget } from "@/lib/agent-room/suggest-chip-targets";
import {
  playOpeningChoreography,
  playToBeatColdVoiceChoreography,
  scheduleLocalChoreography,
} from "@/lib/agent-room/local-choreography";
import { validateComponentProps } from "@/lib/agent-room/component-props";
import { focusReadbackMapEmail } from "@/lib/agent-room/suggest-chip-targets";
import type { ComponentId } from "@/lib/agent-room/stream-chunk";
import { playScene, type Generation } from "@/lib/agent-room/scene-runner";
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
          say: inkLine,
          show: showLocal,
          gesture: drawGesture,
          suggest: suggestLocal,
          setBusy: setLocalBusy,
          awaitCapture,
        },
        localGenRef.current,
      ),
    [clearInk, inkLine, showLocal, drawGesture, suggestLocal, awaitCapture],
  );

  const runLocalScene = useCallback(
    (name: string) => {
      lastSceneRef.current = name;
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

  const startToBeatCold = useCallback(() => {
    localGenRef.current.value += 1;
    setLocalChips(null);
    setAgentChips(null);
    runLocalScene("toBeatCold");
  }, [runLocalScene]);

  const onBeatAnswer = useCallback(
    (qi: number, oi: number) => {
      const answers = [...mapAnswersRef.current];
      answers[qi] = MAP_Q[qi].opts[oi];
      mapAnswersRef.current = answers;
      const read = computeMapRead(answers);
      if (qi >= MAP_Q.length - 1 || MAP_Q[qi].opts[oi].gateFail) setMapRead(read);
      lastSceneRef.current = "beatScene";
      void playLocalScene(beatScene(qi, oi, read));
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
    setComposing(false);
    setIsStreaming(false);
    setLocalBusy(false);
    setLocalChips(null);
    setMapRead(null);
    mapAnswersRef.current = [];
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
              if (!props) return;
              if (component === "capture" && (props as { kind?: string }).kind === "map") {
                commitStream();
                streamOpen = false;
                focusReadbackMapEmail();
                return;
              }
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
          setVoice({
            thinking: false,
            text:
              assistant && assistant.length <= DISCUSS_PASSAGE_THRESHOLD ? assistant : "",
          });
        } else {
          commitStream();
          setVoice({ thinking: false, text: assistant });
        }
        streamOpen = false;
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
  const inLocalBeat = screen.kind === "local" && screen.id === "beat";
  const suggestions: ComposerChip[] =
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
              if (route.kind === "local" && route.scene === "toBeatCold") {
                startToBeatCold();
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
    mapRead,
    onBeatAnswer,
    onCaptureSubmit,
    // Discuss phase (INT-08) — shared with the stub controller. Live Discuss
    // stream behavior (phase in POST, passage routing) lands in INT-10.
    phase: discuss.phase,
    transcript: discuss.transcript,
    discussTurnCount: discuss.discussTurnCount,
    enterDiscuss: discuss.enterDiscuss,
    exitDiscuss: discuss.exitDiscuss,
    stubDiscussCapture: false,
  };
}
