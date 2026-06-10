"use client";

import type { ReactNode } from "react";

import { AGENT_ROOM_MODE } from "@/lib/agent-room/mode";
import styles from "./ink-band.module.css";
import { AgentRoomProvider } from "./agent-room-context";
import { useAgentRoomStream } from "./use-agent-room-stream";
import { useAgentRoomStub } from "./use-agent-room-stub";
import { Mast } from "./shell/mast";
import { ScreenZone } from "./shell/screen-zone";
import { VoiceZone } from "./shell/voice-zone";
import { StreamScreen } from "./screen/stream-screen";
import { StubScreen } from "./screen/stub/stub-screen";
import { Composer, BEAT_PLACEHOLDER, type ComposerChip } from "./composer";
import { DiscussComposer } from "./discuss/discuss-composer";
import { DiscussMarginalia, DiscussFold } from "./discuss/discuss-sheet";
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
}: {
  screenNode: ReactNode;
  screenKey: string;
  home: boolean;
  scroll: boolean;
  voice: VoiceState;
  error: string | null;
  suggestions: ComposerChip[];
  isStreaming: boolean;
  onSay: (text: string) => void;
  onReplay: () => void;
  placeholder?: string;
  /** Discuss phase (INT-08, Model B). Defaults keep Guide identical to AF-12. */
  phase?: RoomPhase;
  transcript?: TranscriptTurn[];
  onExitDiscuss?: () => void;
}) {
  const discuss = phase === "discuss";
  return (
    <div className={`ink-band-surface ${styles.room} ${discuss ? styles.discuss : ""}`}>
      <Mast onHome={onReplay} />

      {/* Model B: screen stays dominant; in Discuss it always scrolls and the
          transcript appends as marginalia on the same sheet. The "What we
          discussed" fold shows in Guide only after a Discuss session. */}
      <ScreenZone scroll={scroll || discuss} home={home && !discuss}>
        <div key={screenKey} className={styles.settle}>
          {screenNode}
        </div>
        {discuss ? (
          <DiscussMarginalia transcript={transcript} />
        ) : (
          <DiscussFold transcript={transcript} />
        )}
      </ScreenZone>

      <VoiceZone voice={voice} error={error} phase={phase} transcript={transcript} />

      {discuss ? (
        <DiscussComposer
          disabled={isStreaming}
          onSay={onSay}
          onReplay={onReplay}
          onExit={onExitDiscuss}
        />
      ) : (
        <Composer
          suggestions={suggestions}
          disabled={isStreaming}
          onSay={onSay}
          onReplay={onReplay}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

/**
 * Stub container — local scene runner, no network (offline fallback). Renders
 * the Ink Band screen registry; everything scrolls except the reality-check beat,
 * and only `home` is the centered, margin-rule-free sheet.
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
      scroll={screen.id !== "beat"}
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
    />
  );
}

/** Stream container — live SSE agent. Opt-in via env; wired fully in AF-90. */
function StreamRoom() {
  const room = useAgentRoomStream();
  const { screen } = room;
  const atOpening = screen.kind === "opening";
  const inBeat = screen.kind === "component" && screen.component === "beat";
  return (
    <AgentRoomView
      screenNode={
        <StreamScreen
          state={screen}
          onSay={room.sendMessage}
          onReset={room.reset}
          disabled={room.isStreaming}
        />
      }
      screenKey={screen.kind === "component" ? `c-${screen.nonce}` : "opening"}
      home={atOpening}
      scroll={!inBeat}
      voice={room.voice}
      error={room.error}
      suggestions={room.suggestions}
      isStreaming={room.isStreaming}
      onSay={room.sendMessage}
      onReplay={room.reset}
      phase={room.phase}
      transcript={room.transcript}
      onExitDiscuss={room.exitDiscuss}
    />
  );
}

/**
 * The Agent Room. The provider (ink layer + shell refs) wraps the mode dispatch
 * so the stub hook can drive the ink layer. Dispatches on the build-time
 * `AGENT_ROOM_MODE` flag (constant per render → each branch's hook is called
 * unconditionally within its own component, no rules-of-hooks violation, and
 * stub mode never mounts the stream hook). Defaults to `"stub"` (full local
 * choreography); set `NEXT_PUBLIC_AGENT_ROOM_MODE=stream` for the live agent.
 */
export function AgentRoom() {
  return (
    <AgentRoomProvider>
      {AGENT_ROOM_MODE === "stream" ? <StreamRoom /> : <StubRoom />}
    </AgentRoomProvider>
  );
}
