"use client";

import type { ComponentId } from "@/lib/agent-room/stream-chunk";
import type { HandoffHumanProps } from "@/lib/agent-room/component-props";

import { NetworkScreen } from "./network";
import { AudienceScreen } from "./audience";
import { HandoffHuman } from "./handoff-human";
import {
  StubScreen,
  type StreamScreenInput,
  type StubScreenState,
} from "./stub/stub-screen";
import type { MapRead } from "@/lib/agent-room/data/map-q";

export type EngineExtraState = {
  component: ComponentId;
  props: Record<string, unknown>;
};

/**
 * Hybrid mode screen adapter — stub registry for scripted moves; engine-extra
 * components render directly when the agent emits `ui_render` for ids with no
 * Ink Band screen.
 */
export function HybridScreen({
  screen,
  engineExtra,
  stream,
  mapRead,
  onHome,
  onBeatAnswer,
  onLeaderSelect,
  onCaptureSubmit,
  onCaptureSkip,
  disabled,
  onRunScene,
}: {
  screen: StubScreenState;
  engineExtra: EngineExtraState | null;
  stream: StreamScreenInput | null;
  mapRead: MapRead | null;
  onHome: () => void;
  onBeatAnswer: (qi: number, oi: number) => void;
  onLeaderSelect: (i: number) => void;
  onCaptureSubmit: (kind: string, values: Record<string, string>) => void;
  onCaptureSkip: () => void;
  disabled: boolean;
  onRunScene?: (scene: string) => void;
}) {
  if (engineExtra?.component === "network") return <NetworkScreen />;
  if (engineExtra?.component === "audience") return <AudienceScreen />;
  if (engineExtra?.component === "handoff_human") {
    return <HandoffHuman props={engineExtra.props as unknown as HandoffHumanProps} />;
  }

  return (
    <StubScreen
      screen={screen}
      mapRead={mapRead}
      onHome={onHome}
      onBeatAnswer={onBeatAnswer}
      onLeaderSelect={onLeaderSelect}
      onCaptureSubmit={onCaptureSubmit}
      onCaptureSkip={onCaptureSkip}
      disabled={disabled}
      stream={stream ?? undefined}
      onRunScene={onRunScene}
    />
  );
}
