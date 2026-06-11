"use client";

import type { ReactNode } from "react";

import { AGENT_ROOM_MODE } from "@/lib/agent-room/mode";
import styles from "./ink-band.module.css";
import { AgentRoomProvider } from "./agent-room-context";
import { useAgentRoomHybrid } from "./use-agent-room-hybrid";
import { useAgentRoomStream } from "./use-agent-room-stream";
import { useAgentRoomStub } from "./use-agent-room-stub";
import { Mast } from "./shell/mast";
import { ScreenZone } from "./shell/screen-zone";
import { VoiceZone } from "./shell/voice-zone";
import { StreamScreen } from "./screen/stream-screen";
import { HybridScreen } from "./screen/hybrid-screen";
import { StubScreen } from "./screen/stub/stub-screen";
import { CaptureScreen } from "./screen/stub/capture-screen";
import { Composer, BEAT_PLACEHOLDER, STREAM_PLACEHOLDER, type ComposerChip } from "./composer";
import { DiscussOverlay } from "./discuss/discuss-overlay";
import { DiscussFold } from "./discuss/discuss-sheet";
import type { VoiceState } from "./use-agent-room-stream";
import type { RoomPhase, TranscriptTurn } from "@/lib/agent-room/discuss";

/**
 * The Agent Room shell — the prototype's four fixed zones (mast / screen / voice
 * / composer) in a 100dvh column with no page scroll. Presentational and
 * mode-agnostic: each mode container builds the screen node + its chrome
 * (`home`/`scroll`) and feeds them here. `screenKey` re-fires the `settle`
 * animation on every screen change.
 */
function AgentRoomView({
  screenNode,
  screenKey,
  home,
  scroll,
  beat,
  voice,
  error,
  suggestions,
  isStreaming,
  onSay,
  onReplay,
  placeholder,
  phase = "guide",
  transcript = [],
  onExitDiscuss,
  stubDiscussCapture = false,
  onCaptureSubmit,
  onCaptureSkip,
}: {
  screenNode: ReactNode;
  screenKey: string;
  home: boolean;
  scroll: boolean;
  /** Reality-check beat — compact sheet + scroll fallback so options aren't clipped. */
  beat: boolean;
  voice: VoiceState;
  error: string | null;
  suggestions: ComposerChip[];
  isStreaming: boolean;
  onSay: (text: string) => void;
  onReplay: () => void;
  placeholder?: string;
  phase?: RoomPhase;
  transcript?: TranscriptTurn[];
  onExitDiscuss?: () => void;
  stubDiscussCapture?: boolean;
  onCaptureSubmit?: (kind: string, values: Record<string, string>) => void;
  onCaptureSkip?: () => void;
}) {
  const discuss = phase === "discuss";
  // Passage turns already render in the thread as body prose; keep live ink only
  // while streaming or for short voice-surface replies (filtered from the thread).
  const lastAssistant = transcript.filter((t) => t.role === "assistant").at(-1);
  const liveText =
    discuss && !voice.thinking && voice.text
      ? lastAssistant?.surface === "passage" && lastAssistant.content === voice.text
        ? undefined
        : voice.text
      : undefined;

  const stubCaptureNode =
    stubDiscussCapture && onCaptureSubmit ? (
      <div className={styles.discussOverlayStubCapture}>
        <CaptureScreen
          opts={{ kind: "discuss" }}
          mapRead={null}
          onHome={() => {}}
          onBeatAnswer={() => {}}
          onLeaderSelect={() => {}}
          onCaptureSubmit={onCaptureSubmit}
          onCaptureSkip={onCaptureSkip ?? (() => {})}
          disabled={false}
        />
      </div>
    ) : undefined;

  return (
    <div
      className={`ink-band-surface ${styles.room} ${beat ? styles.roomBeat : ""} ${
        discuss ? styles.discuss : ""
      } ${discuss ? styles.roomDiscussOverlay : ""}`}
    >
      <Mast onHome={onReplay} />

      <ScreenZone scroll={scroll || discuss} home={home && !discuss}>
        <div key={screenKey} className={styles.settle}>
          {screenNode}
        </div>
        {!discuss && <DiscussFold transcript={transcript} />}
      </ScreenZone>

      <VoiceZone
        voice={voice}
        error={error}
        phase={discuss ? "guide" : phase}
        transcript={transcript}
      />

      {!discuss ? (
        <Composer
          suggestions={suggestions}
          disabled={isStreaming}
          onSay={onSay}
          onReplay={onReplay}
          placeholder={placeholder}
        />
      ) : null}

      {discuss && (
        <DiscussOverlay
          transcript={transcript}
          liveText={liveText}
          liveThinking={voice.thinking}
          disabled={isStreaming}
          onSay={onSay}
          onReplay={onReplay}
          onExit={onExitDiscuss}
          stubCapture={stubCaptureNode}
        />
      )}
    </div>
  );
}

/**
 * Hybrid container — local SCENES runner + SSE on unscripted moves (default mode).
 */
function HybridRoom() {
  const room = useAgentRoomHybrid();
  const { screen } = room;
  return (
    <AgentRoomView
      screenNode={
        <HybridScreen
          screen={screen}
          engineExtra={room.engineExtra}
          stream={room.streamInput}
          mapRead={room.mapRead}
          onHome={room.reset}
          onBeatAnswer={room.onBeatAnswer}
          onLeaderSelect={room.onLeaderSelect}
          onCaptureSubmit={room.onCaptureSubmit}
          onCaptureSkip={room.onCaptureSkip}
          disabled={room.isStreaming}
        />
      }
      screenKey={
        room.engineExtra
          ? `extra-${room.engineExtra.component}`
          : `${screen.id}-${screen.nonce}`
      }
      home={screen.id === "home" && !room.engineExtra}
      scroll
      beat={screen.id === "beat" && !room.engineExtra}
      voice={room.voice}
      error={room.error}
      suggestions={room.suggestions}
      isStreaming={room.isStreaming}
      onSay={room.sendMessage}
      onReplay={room.reset}
      placeholder={screen.id === "beat" ? BEAT_PLACEHOLDER : undefined}
      phase={room.phase}
      transcript={room.transcript}
      onExitDiscuss={room.exitDiscuss}
      stubDiscussCapture={room.stubDiscussCapture}
      onCaptureSubmit={room.onCaptureSubmit}
      onCaptureSkip={room.onCaptureSkip}
    />
  );
}

/**
 * Stub container — local scene runner, no network (offline fallback).
 */
function StubRoom() {
  const room = useAgentRoomStub();
  const { screen } = room;
  return (
    <AgentRoomView
      screenNode={
        <StubScreen
          screen={screen}
          mapRead={room.mapRead}
          onHome={room.reset}
          onBeatAnswer={room.onBeatAnswer}
          onLeaderSelect={room.onLeaderSelect}
          onCaptureSubmit={room.onCaptureSubmit}
          onCaptureSkip={room.onCaptureSkip}
          disabled={room.isStreaming}
        />
      }
      screenKey={`${screen.id}-${screen.nonce}`}
      home={screen.id === "home"}
      scroll
      beat={screen.id === "beat"}
      voice={room.voice}
      error={room.error}
      suggestions={room.suggestions}
      isStreaming={room.isStreaming}
      onSay={room.sendMessage}
      onReplay={room.reset}
      placeholder={screen.id === "beat" ? BEAT_PLACEHOLDER : undefined}
      phase={room.phase}
      transcript={room.transcript}
      onExitDiscuss={room.exitDiscuss}
      stubDiscussCapture={room.stubDiscussCapture}
      onCaptureSubmit={room.onCaptureSubmit}
      onCaptureSkip={room.onCaptureSkip}
    />
  );
}

/** Stream container — live SSE agent. Opt-in via env; wired fully in AF-90. */
function StreamRoom() {
  const room = useAgentRoomStream();
  const { screen } = room;
  const atOpening = screen.kind === "opening";
  const inBeat =
    (screen.kind === "local" && screen.id === "beat") ||
    (screen.kind === "component" && screen.component === "beat");
  return (
    <AgentRoomView
      screenNode={
        <StreamScreen
          state={screen}
          mapRead={room.mapRead}
          onBeatAnswer={room.onBeatAnswer}
          onCaptureSubmit={room.onCaptureSubmit}
          onSay={room.sendMessage}
          onReset={room.reset}
          disabled={room.isStreaming}
        />
      }
      screenKey={
        screen.kind === "local"
          ? `local-${screen.id}-${screen.nonce}`
          : screen.kind === "component"
            ? `c-${screen.nonce}`
            : "opening"
      }
      home={atOpening}
      scroll
      beat={inBeat}
      voice={room.voice}
      error={room.error}
      suggestions={room.suggestions}
      isStreaming={room.isStreaming}
      onSay={room.sendMessage}
      onReplay={room.reset}
      placeholder={inBeat ? BEAT_PLACEHOLDER : STREAM_PLACEHOLDER}
      phase={room.phase}
      transcript={room.transcript}
      onExitDiscuss={room.exitDiscuss}
      stubDiscussCapture={room.stubDiscussCapture}
    />
  );
}

/**
 * The Agent Room. The provider (ink layer + shell refs) wraps the mode dispatch
 * so the stub hook can drive the ink layer. Dispatches on the build-time
 * `AGENT_ROOM_MODE` flag (constant per render → each branch's hook is called
 * unconditionally within its own component, no rules-of-hooks violation, and
 * stub/stream hooks). Defaults to `"hybrid"`; set `NEXT_PUBLIC_AGENT_ROOM_MODE=stub`
 * for zero-network or `stream` for legacy full-AI regression.
 */
export function AgentRoom() {
  return (
    <AgentRoomProvider>
      {AGENT_ROOM_MODE === "stream" ? (
        <StreamRoom />
      ) : AGENT_ROOM_MODE === "hybrid" ? (
        <HybridRoom />
      ) : (
        <StubRoom />
      )}
    </AgentRoomProvider>
  );
}
