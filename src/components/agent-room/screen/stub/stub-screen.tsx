/**
 * The Ink Band screen registry + router (AF-07) — the React port of
 * `renderScreen(id, opts)` from `js/screens.js`. The runner's `show` act updates
 * the screen state `{ id, opts, nonce }`; this router maps the `ScreenId` to its
 * component. The scroll/`home` chrome (the prototype's `screenEl.classList`
 * toggling) is applied by the container from the same state, per the AF-07
 * table: everything scrolls except `beat`; only `home` gets the centered,
 * margin-rule-free sheet.
 *
 * INT-02: this is now the **single, shared** screen registry — the live stream
 * renders through `SCREEN_COMPONENTS` too (via the `StreamScreen` adapter and the
 * `screen-map.ts` ComponentId→ScreenId SSOT), not a parallel switch. Screens are
 * prop-driven: in stub mode they read local data keyed by `opts` (+ the `on*`
 * handlers); in stream mode the adapter passes a `stream` payload (validated
 * agent props + the `say()` channel) and the prop-typed screens (`beat`,
 * `readback`, `capture`) render from it instead.
 */
import type { ComponentType } from "react";

import type { ScreenId, ShowOpts } from "@/lib/agent-room/acts";
import type { MapRead } from "@/lib/agent-room/data/map-q";
import { HomeScreen } from "./home-screen";
import { BeatScreen } from "./beat-screen";
import { ReadbackScreen } from "./readback-screen";
import { PathScreen } from "./path-screen";
import { AboutScreen } from "./about-screen";
import { PricingScreen } from "./pricing-screen";
import { FaqScreen } from "./faq-screen";
import { SafetyScreen } from "./safety-screen";
import { FoundersScreen } from "./founders-screen";
import { ContactScreen } from "./contact-screen";
import { ConfirmScreen } from "./confirm-screen";
import { LeaderScreen } from "./leader-screen";
import { CaptureScreen } from "./capture-screen";
import { SafetyDashboardScreen } from "./safety-dashboard-screen";
import { SandboxScreen } from "./sandbox-screen";
import { TrainingScreen } from "./training-screen";
import { TechnologyScreen } from "./technology-screen";

/** The current screen on the wall (prototype `renderScreen` arguments + a
 *  nonce so the `settle` animation re-fires on every `show`). */
export interface StubScreenState {
  id: ScreenId;
  opts: ShowOpts;
  nonce: number;
}

/**
 * Stream-mode input (INT-02): the validated agent `props` for this `ui_render`
 * plus the `say()` channel for in-screen interactions (chips/forks become user
 * turns). Present only when the `StreamScreen` adapter drives the registry;
 * **absent in stub mode**, where screens read local data + the `on*` handlers.
 */
export interface StreamScreenInput {
  props: Record<string, unknown>;
  onSay: (text: string) => void;
}

/** Props every screen component accepts (each screen reads what it needs). */
export interface ScreenProps {
  opts: ShowOpts;
  /** The computed read-back, for the readback screen (null until a beat finishes). */
  mapRead: MapRead | null;
  /** Back to the opening (the crumb on inner screens → `goHome`). */
  onHome: () => void;
  /** A reality-check answer was tapped (beat screen → `beatScene`). */
  onBeatAnswer: (qi: number, oi: number) => void;
  /** A leader portrait was tapped (home band → `leaderScene`, AF-10). */
  onLeaderSelect: (i: number) => void;
  /** A capture form submitted (valid) → store + resolve the awaiting scene. */
  onCaptureSubmit: (kind: string, values: Record<string, string>) => void;
  /** Capture skipped (map soft-gate) → abandon + show Safety. */
  onCaptureSkip: () => void;
  disabled: boolean;
  /** Stream mode only — validated agent props + `say()`. Absent in stub. INT-02. */
  stream?: StreamScreenInput;
  /** Run a named scene (`onOwn`, `withUs`, …) from in-screen CTAs. */
  onRunScene?: (scene: string) => void;
}

/**
 * The shared Ink Band screen registry. Keyed by `ScreenId`; consumed by the stub
 * runner (`StubScreen`) and the live stream (`StreamScreen`) alike. INT-02.
 */
export const SCREEN_COMPONENTS: Record<ScreenId, ComponentType<ScreenProps>> = {
  home: HomeScreen,
  beat: BeatScreen,
  readback: ReadbackScreen,
  safety: SafetyScreen,
  confirm: ConfirmScreen,
  path: PathScreen,
  founders: FoundersScreen,
  leader: LeaderScreen,
  about: AboutScreen,
  contact: ContactScreen,
  pricing: PricingScreen,
  faq: FaqScreen,
  capture: CaptureScreen,
  safetyDashboard: SafetyDashboardScreen,
  sandbox: SandboxScreen,
  training: TrainingScreen,
  technology: TechnologyScreen,
};

export function StubScreen({
  screen,
  mapRead,
  onHome,
  onBeatAnswer,
  onLeaderSelect,
  onCaptureSubmit,
  onCaptureSkip,
  disabled,
  stream,
  onRunScene,
}: {
  screen: StubScreenState;
  mapRead: MapRead | null;
  onHome: () => void;
  onBeatAnswer: (qi: number, oi: number) => void;
  onLeaderSelect: (i: number) => void;
  onCaptureSubmit: (kind: string, values: Record<string, string>) => void;
  onCaptureSkip: () => void;
  disabled: boolean;
  /** Hybrid/stream agent props for prop-driven screens (beat, readback, capture). */
  stream?: StreamScreenInput;
  onRunScene?: (scene: string) => void;
}) {
  const Component = SCREEN_COMPONENTS[screen.id];
  return (
    <Component
      opts={screen.opts}
      mapRead={mapRead}
      onHome={onHome}
      onBeatAnswer={onBeatAnswer}
      onLeaderSelect={onLeaderSelect}
      onCaptureSubmit={onCaptureSubmit}
      onCaptureSkip={onCaptureSkip}
      disabled={disabled}
      stream={stream}
      onRunScene={onRunScene}
    />
  );
}
