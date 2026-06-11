"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { ScreenId, Scene, SceneFactory, ShowOpts, SuggestChip } from "@/lib/agent-room/acts";
import { SCENES } from "@/lib/agent-room/data/scenes";
import { submitLead, LEADS } from "@/lib/agent-room/capture";
import { MAP_Q, computeMapRead, type MapOption, type MapRead } from "@/lib/agent-room/data/map-q";
import { beatScene } from "@/lib/agent-room/beat-scenes";
import { leaderScene, leaderWorkScene, leaderConnectScene } from "@/lib/agent-room/leader-scenes";
import { routeInput, FALLBACK_SAY } from "@/lib/agent-room/route-input";
import {
  DISCUSS_ENABLED,
  type DiscussReason,
} from "@/lib/agent-room/discuss";
import {
  handleDiscussChipTarget,
  resolveTypedDiscussSignal,
  STUB_DISCUSS_OPENER,
} from "@/lib/agent-room/discuss-entry";
import { handleSuggestChipTarget } from "@/lib/agent-room/suggest-chip-targets";
import { playScene, type Generation } from "@/lib/agent-room/scene-runner";
import { useInk } from "./agent-room-context";
import type { ComposerChip } from "./composer";
import type { StubScreenState } from "./screen/stub/stub-screen";
import type { VoiceState } from "./use-agent-room-stream";
import { useDiscussPhase, type DiscussPhase } from "./use-discuss-phase";

/**
 * The stub room controller. Its `screen` is the Ink Band `{ id, opts, nonce }`
 * (the stream controller carries its own `ScreenState`); the two render paths are
 * selected by mode in the container. The voice band is driven by the ink layer,
 * so `voice` here is just the idle fallback.
 */
export interface AgentRoomController
  extends Pick<
    DiscussPhase,
    "phase" | "transcript" | "discussTurnCount" | "enterDiscuss" | "exitDiscuss"
  > {
  screen: StubScreenState;
  voice: VoiceState;
  suggestions: ComposerChip[];
  isStreaming: boolean;
  error: string | null;
  /** The computed read-back (set when the reality-check finishes). */
  mapRead: MapRead | null;
  /** Stub Discuss overlay shows capture form instead of live LLM chat. */
  stubDiscussCapture: boolean;
  sendMessage: (raw: string) => void;
  reset: () => void;
  /** A reality-check answer was tapped → `answerMap` choreography. */
  onBeatAnswer: (qi: number, oi: number) => void;
  /** A leader portrait was tapped (wired in AF-10). */
  onLeaderSelect: (i: number) => void;
  /** A capture form submitted (valid) → store + resolve the awaiting scene. */
  onCaptureSubmit: (kind: string, values: Record<string, string>) => void;
  /** Capture skipped (map soft-gate) → abandon + show Safety. */
  onCaptureSkip: () => void;
}

const IDLE_VOICE: VoiceState = { thinking: false, text: "" };
const INITIAL_SCREEN: StubScreenState = { id: "home", opts: {}, nonce: 0 };

/**
 * Stub runner hook (AF-05) — the heart of the prototype in React. Drives the
 * local scene runner (`playScene`) over ported `SCENES` with **no network**:
 * `show` swaps the screen (AF-07 registry), `say` writes an ink line, `gesture`
 * draws on the sheet, `suggest` sets the chips. A generation token lets `reset`
 * (goHome) and `replay` cut an in-flight scene short. Boots the `opening` scene
 * once fonts are ready, matching the prototype.
 */
export function useAgentRoomStub(): AgentRoomController {
  const { inkLine, drawGesture, clearInk, clearVoice } = useInk();
  const discuss = useDiscussPhase();
  const { appendTranscript, enterDiscuss: baseEnterDiscuss, resetDiscuss } = discuss;
  const phaseRef = useRef(discuss.phase);
  phaseRef.current = discuss.phase;

  const [screen, setScreen] = useState<StubScreenState>(INITIAL_SCREEN);
  const [suggestions, setSuggestions] = useState<ComposerChip[]>([]);
  const [busy, setBusy] = useState(false);
  const [mapRead, setMapRead] = useState<MapRead | null>(null);
  const [stubDiscussCapture, setStubDiscussCapture] = useState(false);

  // Mutable generation token (shared with playScene) + latest `run` for chips +
  // the reality-check answers (read by `answerMap`, not displayed → a ref).
  const genRef = useRef<Generation>({ value: 0 });
  const runRef = useRef<(name: string) => void>(() => {});
  const mapAnswersRef = useRef<(MapOption | null)[]>([]);
  const lastSceneRef = useRef<string>("opening");
  // The leader the agent is currently on (prototype `currentLeader`), read by the
  // leader-aware `leaderWork` / `leaderConnect` chip targets.
  const currentLeaderRef = useRef<number>(0);
  // Capture await: a submit (or skip/Home) resolves the runner's `await:'capture'`.
  const captureResolveRef = useRef<((r: { cancelled?: boolean }) => void) | null>(null);
  const capturePendingRef = useRef(false);
  // Implicit Discuss-offer signals (INT-09, design §4.2): consecutive free-text
  // turns without a chip tap, and consecutive router fallbacks. A chip tap resets
  // the free-text streak (the visitor took the on-ramp).
  const freeTextStreakRef = useRef(0);
  const fallbackStreakRef = useRef(0);
  const screenRef = useRef(screen);
  screenRef.current = screen;

  const enterDiscuss = useCallback(
    (reason?: DiscussReason) => {
      if (!DISCUSS_ENABLED) return;
      baseEnterDiscuss(reason);
      appendTranscript({
        role: "assistant",
        content: STUB_DISCUSS_OPENER,
        surface: "passage",
      });
      setStubDiscussCapture(true);
    },
    [appendTranscript, baseEnterDiscuss],
  );

  const exitDiscuss = useCallback(() => {
    discuss.exitDiscuss();
    setStubDiscussCapture(false);
  }, [discuss]);

  // `show` — swap the screen (prototype `renderScreen`). The registry maps the
  // id → component; `home` clears the voice; starting the beat (`qi === 0`)
  // resets the reality-check answers (prototype `renderScreen` `id==='beat'`).
  const show = useCallback(
    (id: ScreenId, opts: ShowOpts) => {
      clearInk();
      if (id === "home") clearVoice();
      if (id === "beat" && (opts.qi ?? 0) === 0) {
        mapAnswersRef.current = [];
        setMapRead(null);
      }
      setScreen((prev) => ({ id, opts, nonce: prev.nonce + 1 }));
    },
    [clearInk, clearVoice],
  );

  // `suggest` — bind each scene chip's `to` to a scene run (via the latest run).
  // Discuss entry chips (`toDiscuss` / `discussOffer`) only appear when the
  // feature flag is on — flag off → Guide is exactly AF-12. A chip tap is the
  // on-ramp, so it resets the free-text streak that drives the implicit offer.
  const suggest = useCallback((chips: SuggestChip[]) => {
    const visible = DISCUSS_ENABLED
      ? chips
      : chips.filter((c) => c.to !== "toDiscuss" && c.to !== "discussOffer");
    setSuggestions(
      visible.map((c) => ({
        label: c.label,
        lead: c.lead,
        onSelect: () => {
          freeTextStreakRef.current = 0;
          handleSuggestChipTarget(
            c.to,
            enterDiscuss,
            runRef.current,
            { lastScene: lastSceneRef.current },
          );
        },
      })),
    );
  }, [enterDiscuss]);

  // `await:'capture'` → resolve when the rendered form submits; latch a submit
  // that beats the await (pre-await gesture) so it still completes.
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
      // Leader-aware names are built from the current leader (prototype overrode
      // `SCENES.leaderWork` / `SCENES.leaderConnect` with `currentLeader`-closing
      // functions); intercept them before the static SCENES lookup.
      if (name === "leaderWork") {
        void play(leaderWorkScene(currentLeaderRef.current));
        return;
      }
      if (name === "leaderConnect") {
        void play(leaderConnectScene(currentLeaderRef.current));
        return;
      }
      // String lookup (a chip may target a not-yet-ported scene → undefined no-op).
      const entry = (SCENES as Record<string, Scene | SceneFactory | undefined>)[name];
      const scene = typeof entry === "function" ? entry() : entry;
      if (scene) void play(scene);
    },
    [play],
  );

  useEffect(() => {
    runRef.current = run;
  }, [run]);

  const goHome = useCallback(() => {
    genRef.current.value += 1; // supersede any in-flight scene
    abandonCapture(); // clean up any pending capture await
    setBusy(false);
    clearInk();
    freeTextStreakRef.current = 0;
    fallbackStreakRef.current = 0;
    setStubDiscussCapture(false);
    discuss.resetDiscuss(); // back to Guide; drop any Discuss transcript
    run("opening");
  }, [abandonCapture, clearInk, discuss, run]);

  const sendMessage = useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text) return;

      if (phaseRef.current === "discuss") {
        // Stub never fakes LLM chat — capture is in the overlay.
        return;
      }

      const target = routeInput(text);
      freeTextStreakRef.current += 1;
      fallbackStreakRef.current = target === "fallback" ? fallbackStreakRef.current + 1 : 0;

      const signal = resolveTypedDiscussSignal({
        text,
        phase: phaseRef.current,
        screenId: screenRef.current.id,
        freeTextStreak: freeTextStreakRef.current,
        fallbackStreak: fallbackStreakRef.current,
      });
      if (signal.kind === "offer") {
        freeTextStreakRef.current = 0;
        fallbackStreakRef.current = 0;
        run("discussOffer");
        return;
      }

      if (target === "fallback") {
        void play([{ say: FALLBACK_SAY }]);
        return;
      }
      run(target);
    },
    [play, run],
  );

  // The reality-check beat → `answerMap`: record the chosen option, then play
  // the beat choreography (circle → reply → advance, or finish into the
  // read-back). The beat screen disables options while busy, so this can't
  // double-fire mid-scene.
  const onBeatAnswer = useCallback(
    (qi: number, oi: number) => {
      const answers = [...mapAnswersRef.current];
      answers[qi] = MAP_Q[qi].opts[oi];
      mapAnswersRef.current = answers;
      const read = computeMapRead(answers);
      if (qi >= MAP_Q.length - 1 || MAP_Q[qi].opts[oi].gateFail) setMapRead(read);
      void play(beatScene(qi, oi, read));
    },
    [play],
  );

  // A leader portrait → `leaderScene(i)`: record the current leader (so the
  // `leaderWork` / `leaderConnect` chips resolve to it), then play its scene.
  const onLeaderSelect = useCallback(
    (i: number) => {
      currentLeaderRef.current = i;
      void play(leaderScene(i));
    },
    [play],
  );

  // A capture form submitted (valid) → attach the diagnostic answers for `map`,
  // store in-memory, fire the stub, and resolve the awaiting scene.
  const onCaptureSubmit = useCallback(
    (kind: string, values: Record<string, string>) => {
      const payload =
        kind === "map"
          ? { ...values, mapAnswers: [...mapAnswersRef.current], mapRead }
          : values;
      if (kind in LEADS) LEADS[kind as keyof typeof LEADS] = payload;
      void submitLead(kind, payload);
      const r = captureResolveRef.current;
      captureResolveRef.current = null;
      if (r) r({});
      else capturePendingRef.current = true;
    },
    [mapRead],
  );
  // Soft skip (map gate) → abandon the await and show Safety.
  const onCaptureSkip = useCallback(() => {
    abandonCapture();
    run("toSafety");
  }, [abandonCapture, run]);

  // Boot the opening scene once fonts settle (prototype `app.js`). The ink
  // layer already sizes its overlay on mount + `fonts.ready`.
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

  return {
    screen,
    voice: IDLE_VOICE,
    suggestions,
    isStreaming: busy,
    error: null,
    mapRead,
    sendMessage,
    reset: goHome,
    onBeatAnswer,
    onLeaderSelect,
    onCaptureSubmit,
    onCaptureSkip,
    stubDiscussCapture,
    // Discuss phase (INT-08) — shared with the stream controller.
    phase: discuss.phase,
    transcript: discuss.transcript,
    discussTurnCount: discuss.discussTurnCount,
    enterDiscuss,
    exitDiscuss,
  };
}
