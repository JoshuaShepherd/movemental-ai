"use client";

import { useRef, useState, type ReactNode } from "react";

import { AGENT_ROOM_MODE } from "@/lib/agent-room/mode";
import styles from "./ink-band.module.css";
import { useAgentRoomHybrid } from "./use-agent-room-hybrid";
import { useAgentRoomStream } from "./use-agent-room-stream";
import { useAgentRoomStub } from "./use-agent-room-stub";
import { useAgentRoomRefs } from "./agent-room-context";
import { Mast } from "./shell/mast";
import { ScreenZone } from "./shell/screen-zone";
import { AgentDock, type DockState } from "./shell/agent-dock";
import { InkOverlay } from "./shell/ink-overlay";
import { StreamScreen } from "./screen/stream-screen";
import { HybridScreen } from "./screen/hybrid-screen";
import { StubScreen } from "./screen/stub/stub-screen";
import { CaptureScreen } from "./screen/stub/capture-screen";
import { highlightChipForScene } from "@/lib/agent-room/scene-highlight";
import { BEAT_PLACEHOLDER, STREAM_PLACEHOLDER, type ComposerChip } from "./composer";
import { DiscussFold } from "./discuss/discuss-sheet";
import type { VoiceState } from "./use-agent-room-stream";
import type { RoomPhase } from "@/lib/agent-room/discuss";
import type { ThreadTurn } from "@/lib/agent-room/thread";

/**
 * The Agent Room shell — mast + stage + floating agent dock (docs/html/home).
 * Screen stays mounted behind scrim when expanded (SSOT I6).
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
  thread = [],
  stubDiscussCapture = false,
  onCaptureSubmit,
  onCaptureSkip,
  showHandbookCapture,
  onDockStateChange,
  onDockExpand,
  highlightChipLabel,
}: {
  screenNode: ReactNode;
  screenKey: string;
  home: boolean;
  scroll: boolean;
  beat: boolean;
  voice: VoiceState;
  error: string | null;
  suggestions: ComposerChip[];
  isStreaming: boolean;
  onSay: (text: string) => void;
  onReplay: () => void;
  placeholder?: string;
  phase?: RoomPhase;
  thread?: ThreadTurn[];
  stubDiscussCapture?: boolean;
  onCaptureSubmit?: (kind: string, values: Record<string, string>) => void;
  onCaptureSkip?: () => void;
  showHandbookCapture?: boolean;
  onDockStateChange?: (state: DockState) => void;
  onDockExpand?: (reason: "user" | "send" | "chip" | "discuss" | "agent") => void;
  highlightChipLabel?: string | null;
}) {
  const { gestureRootEl } = useAgentRoomRefs();
  const [dockExpanded, setDockExpanded] = useState(false);

  const handleDockStateChange = (state: DockState) => {
    setDockExpanded(state === "expanded");
    onDockStateChange?.(state);
  };

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
      ref={gestureRootEl}
      className={`ink-band-surface ${styles.room} ${styles.roomDock} ${
        dockExpanded ? styles.roomDockConversation : ""
      } ${beat ? styles.roomBeat : ""}`}
    >
      <InkOverlay />
      <Mast onHome={onReplay} />

      <ScreenZone scroll={scroll && !dockExpanded} home={home && !dockExpanded}>
        <div
          key={screenKey}
          className={`${styles.settle} ${dockExpanded ? styles.screenBehindScrim : ""}`}
        >
          {screenNode}
        </div>
        {!dockExpanded && <DiscussFold thread={thread} />}
      </ScreenZone>

      <AgentDock
        voice={voice}
        error={error}
        suggestions={suggestions}
        disabled={isStreaming}
        onSay={onSay}
        placeholder={placeholder}
        phase={phase}
        thread={thread}
        stubCapture={stubCaptureNode}
        showHandbookCapture={showHandbookCapture}
        onHandbookCaptureSubmit={onCaptureSubmit}
        liveThinking={isStreaming && voice.thinking}
        liveThinkingNote={voice.note}
        onDockStateChange={handleDockStateChange}
        onDockExpand={onDockExpand}
        screenKey={screenKey}
        highlightChipLabel={highlightChipLabel}
      />
    </div>
  );
}

function HybridRoom() {
  const room = useAgentRoomHybrid();
  const { screen } = room;
  const highlightChipLabel = highlightChipForScene(screen.id, room.suggestions);
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
          onRunScene={room.runScene}
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
      thread={room.thread}
      stubDiscussCapture={room.stubDiscussCapture}
      onCaptureSubmit={room.onCaptureSubmit}
      onCaptureSkip={room.onCaptureSkip}
      showHandbookCapture={room.showHandbookCapture}
      onDockStateChange={room.onDockStateChange}
      onDockExpand={room.onDockExpand}
      highlightChipLabel={highlightChipLabel}
    />
  );
}

function StubRoom() {
  const room = useAgentRoomStub();
  const { screen } = room;
  const highlightChipLabel = highlightChipForScene(screen.id, room.suggestions);
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
          onRunScene={room.runScene}
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
      thread={room.thread}
      stubDiscussCapture={room.stubDiscussCapture}
      onCaptureSubmit={room.onCaptureSubmit}
      onCaptureSkip={room.onCaptureSkip}
      showHandbookCapture={room.showHandbookCapture}
      highlightChipLabel={highlightChipLabel}
    />
  );
}

function StreamRoom() {
  const room = useAgentRoomStream();
  const { screen } = room;
  const atOpening = screen.kind === "opening";
  const inBeat =
    (screen.kind === "local" && screen.id === "beat") ||
    (screen.kind === "component" && screen.component === "beat");
  const screenId = screen.kind === "local" ? screen.id : atOpening ? "home" : "stream";
  const highlightChipLabel = highlightChipForScene(screenId, room.suggestions);
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
      thread={room.thread}
      stubDiscussCapture={room.stubDiscussCapture}
      onDockStateChange={room.onDockStateChange}
      highlightChipLabel={highlightChipLabel}
    />
  );
}

export function AgentRoom() {
  return AGENT_ROOM_MODE === "stream" ? (
    <StreamRoom />
  ) : AGENT_ROOM_MODE === "hybrid" ? (
    <HybridRoom />
  ) : (
    <StubRoom />
  );
}
