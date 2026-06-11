"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import type { RoomPhase, TranscriptTurn } from "@/lib/agent-room/discuss";
import { useAgentRoomRefs, useInk } from "../agent-room-context";
import type { ComposerChip } from "../composer";
import { DiscussThread } from "../discuss/discuss-thread";
import { VoiceZone } from "./voice-zone";
import styles from "../ink-band.module.css";
import type { VoiceState } from "../use-agent-room-stream";

type GuideMessage = { role: "agent" | "user"; content: string };

function ExpandIcon() {
  return (
    <svg
      className={styles.iconExpand}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  );
}

function CollapseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 11.25L9 6.75l4.5 4.5" />
    </svg>
  );
}

function ContextIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <rect
        x="2"
        y="3"
        width="9"
        height="11"
        rx="1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M11 5h3v9H5" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M8 12V4M8 4l-3.5 3.5M8 4l3.5 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Floating agent dock — handwriting strip + expandable conversation card.
 * Ported from `docs/html/home` (agentDock / agentFloat / agentCard).
 */
export function AgentDock({
  voice,
  error,
  suggestions,
  disabled,
  onSay,
  onReplay,
  placeholder,
  phase = "guide",
  transcript = [],
  onExitDiscuss,
  stubCapture,
  liveText,
  liveThinking,
}: {
  voice: VoiceState;
  error: string | null;
  suggestions: ComposerChip[];
  disabled?: boolean;
  onSay: (text: string) => void;
  onReplay: () => void;
  placeholder?: string;
  phase?: RoomPhase;
  transcript?: TranscriptTurn[];
  onExitDiscuss?: () => void;
  stubCapture?: ReactNode;
  liveText?: string;
  liveThinking?: boolean;
}) {
  const discuss = phase === "discuss";
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("");
  const [guideMessages, setGuideMessages] = useState<GuideMessage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const { voiceEl } = useAgentRoomRefs();
  const { voiceLines } = useInk();
  const prevVoiceCount = useRef(0);

  const setExpandedState = useCallback(
    (next: boolean) => {
      if (next && !discuss) {
        setGuideMessages((prev) => {
          const known = new Set(
            prev.filter((m) => m.role === "agent").map((m) => m.content),
          );
          const backfill = voiceLines
            .filter((line) => !known.has(line.text))
            .map((line) => ({ role: "agent" as const, content: line.text }));
          return backfill.length ? [...prev, ...backfill] : prev;
        });
        prevVoiceCount.current = voiceLines.length;
      }
      setExpanded(next);
      if (next) {
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    },
    [discuss, voiceLines],
  );

  useEffect(() => {
    if (discuss) setExpandedState(true);
  }, [discuss, setExpandedState]);

  // Append resolved agent voice lines to the guide thread when expanded.
  useEffect(() => {
    if (discuss || voiceLines.length <= prevVoiceCount.current) {
      prevVoiceCount.current = voiceLines.length;
      return;
    }
    const fresh = voiceLines.slice(prevVoiceCount.current);
    prevVoiceCount.current = voiceLines.length;
    setGuideMessages((prev) => [
      ...prev,
      ...fresh.map((line) => ({ role: "agent" as const, content: line.text })),
    ]);
  }, [discuss, voiceLines]);

  useEffect(() => {
    if (!expanded || !threadRef.current) return;
    threadRef.current.scrollTop = threadRef.current.scrollHeight;
  }, [expanded, guideMessages, transcript, liveText, voice.text]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && expanded) setExpandedState(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [expanded, setExpandedState]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const v = value.trim();
    if (!v || disabled) return;
    setValue("");
    if (!discuss) {
      setGuideMessages((prev) => [...prev, { role: "user", content: v }]);
    }
    onSay(v);
    if (!expanded) setExpandedState(true);
  };

  const handleReplay = () => {
    setGuideMessages([]);
    prevVoiceCount.current = 0;
    setExpandedState(false);
    setValue("");
    onReplay();
  };

  const showGuideThread = !discuss && guideMessages.length > 0;
  const showDiscussThread = discuss && (transcript.length > 0 || liveText || liveThinking);
  const showThreadBody = showGuideThread || showDiscussThread || stubCapture;

  return (
    <div
      className={`${styles.agentDock} ${expanded ? styles.agentDockExpanded : ""}`}
      id="agent-dock"
    >
      <button
        type="button"
        className={styles.dockBackdrop}
        id="dock-backdrop"
        aria-hidden={!expanded}
        tabIndex={expanded ? 0 : -1}
        onClick={() => setExpandedState(false)}
      />

      <div className={styles.handwritingStrip} aria-live="polite">
        <div className={styles.handwritingInner}>
          <div ref={voiceEl} className={styles.handwritingVoice}>
            <VoiceZone
              voice={voice}
              error={error}
              phase={discuss ? "discuss" : phase}
              transcript={transcript}
              strip
            />
          </div>
        </div>
      </div>

      <div className={styles.agentFloat} id="agent-float">
        <div className={styles.floatChips} id="float-chips">
          {suggestions.map((s) => (
            <button
              key={s.label}
              type="button"
              className={`${styles.floatChip} ${s.lead ? styles.floatChipLead : ""}`}
              disabled={disabled}
              onClick={s.onSelect}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div
          className={`${styles.agentCard} ${expanded ? styles.agentCardExpanded : ""}`}
          id="agent-card"
          role="region"
          aria-label="Agent conversation"
        >
          <div className={styles.cardHeader} id="card-header">
            <span className={styles.cardTitle}>Conversation</span>
            <button
              type="button"
              className={styles.cardCollapse}
              id="card-collapse"
              aria-label="Collapse chat"
              title="Collapse chat"
              onClick={() => setExpandedState(false)}
            >
              <CollapseIcon />
            </button>
          </div>

          {expanded && (
            <div className={styles.cardThread} id="card-thread" ref={threadRef}>
              {discuss ? (
                <>
                  {showDiscussThread && (
                    <DiscussThread
                      transcript={transcript}
                      liveText={liveText}
                      liveThinking={liveThinking}
                      compact
                    />
                  )}
                  {stubCapture}
                </>
              ) : showThreadBody ? (
                guideMessages.map((msg, i) => (
                  <div
                    key={`${msg.role}-${i}-${msg.content.slice(0, 24)}`}
                    className={
                      msg.role === "agent" ? styles.threadMsgAgent : styles.threadMsgUser
                    }
                  >
                    <p>{msg.content}</p>
                  </div>
                ))
              ) : null}
            </div>
          )}

          <form className={styles.cardBody} id="composer-form" onSubmit={submit}>
            <label className={styles.cardInput}>
              <input
                ref={inputRef}
                type="text"
                name="message"
                id="composer-input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoComplete="off"
                aria-label="Talk to Movemental"
                placeholder={placeholder ?? "Type here, or tap a suggestion…"}
                disabled={disabled}
              />
            </label>
            <div className={styles.cardToolbar}>
              <div className={styles.toolbarGroup}>
                <button type="button" className={styles.toolBtn} aria-label="Add attachment">
                  +
                </button>
                <button type="button" className={styles.toolBtn} aria-label="Slash commands">
                  /
                </button>
              </div>
              <div className={styles.toolbarGroup}>
                <button
                  type="button"
                  className={styles.toolBtn}
                  aria-label="Context"
                  title="Context"
                >
                  <ContextIcon />
                </button>
                <button
                  type="button"
                  className={`${styles.toolBtn} ${styles.expandToggle} ${
                    expanded ? styles.expandToggleActive : ""
                  }`}
                  id="expand-toggle"
                  aria-label={expanded ? "Collapse chat" : "Expand chat"}
                  aria-expanded={expanded}
                  title={expanded ? "Collapse chat" : "Expand chat"}
                  onClick={() => setExpandedState(!expanded)}
                >
                  <ExpandIcon />
                </button>
                <button type="submit" className={styles.sendRound} aria-label="Send" disabled={disabled}>
                  <SendIcon />
                </button>
              </div>
            </div>
          </form>

          <button
            type="button"
            className={styles.cardHandle}
            id="card-handle"
            aria-label="Expand drawer"
            aria-expanded={expanded}
            onClick={() => setExpandedState(true)}
          >
            <span className={styles.handleBar} />
          </button>
        </div>

        <p className={styles.dockLegend}>
          {discuss && onExitDiscuss ? (
            <button type="button" className={styles.replay} onClick={onExitDiscuss}>
              ↑ back to the guided path
            </button>
          ) : null}
          <button type="button" className={styles.replay} id="replay" onClick={handleReplay}>
            ↻ replay
          </button>
        </p>
      </div>
    </div>
  );
}
