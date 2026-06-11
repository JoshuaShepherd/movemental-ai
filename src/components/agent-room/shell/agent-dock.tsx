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
import { useAgentRoomRefs } from "../agent-room-context";
import type { ComposerChip } from "../composer";
import { DiscussThread } from "../discuss/discuss-thread";
import { VoiceZone } from "./voice-zone";
import styles from "../ink-band.module.css";
import {
  FOCUS_HANDBOOK_EMAIL_EVENT,
  HANDBOOK_EMAIL_INPUT_ID,
} from "@/lib/agent-room/suggest-chip-targets";
import type { VoiceState } from "../use-agent-room-stream";
import { HandbookDockEmail } from "./handbook-dock-email";

type GuideMessage = {
  role: "agent" | "user";
  content: string;
  /** True while the agent turn is still streaming into this bubble. */
  streaming?: boolean;
};

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
  placeholder,
  phase = "guide",
  transcript = [],
  stubCapture,
  showHandbookCapture,
  onHandbookCaptureSubmit,
  liveText,
  liveThinking,
  liveThinkingNote,
  onConversationActive,
  screenKey,
}: {
  voice: VoiceState;
  error: string | null;
  suggestions: ComposerChip[];
  disabled?: boolean;
  onSay: (text: string) => void;
  placeholder?: string;
  phase?: RoomPhase;
  transcript?: TranscriptTurn[];
  stubCapture?: ReactNode;
  showHandbookCapture?: boolean;
  onHandbookCaptureSubmit?: (kind: string, values: Record<string, string>) => void;
  liveText?: string;
  liveThinking?: boolean;
  liveThinkingNote?: string;
  onConversationActive?: () => void;
  /** When the stage screen changes, the dock thread resets (no cross-screen bleed). */
  screenKey?: string;
}) {
  const discuss = phase === "discuss";
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("");
  const [guideMessages, setGuideMessages] = useState<GuideMessage[]>([]);
  const [chatEngaged, setChatEngaged] = useState(false);
  const [handbookHighlight, setHandbookHighlight] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const { voiceEl } = useAgentRoomRefs();
  const prevScreenKey = useRef(screenKey);

  const setExpandedState = useCallback(
    (next: boolean) => {
      if (next) onConversationActive?.();
      setExpanded(next);
      if (next) {
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    },
    [onConversationActive],
  );

  // New screen → fresh conversation drawer (scripted voice stays in the strip only).
  useEffect(() => {
    if (screenKey === undefined || screenKey === prevScreenKey.current) return;
    prevScreenKey.current = screenKey;
    setGuideMessages([]);
    setChatEngaged(false);
    setExpanded(false);
    setValue("");
  }, [screenKey]);

  useEffect(() => {
    if (discuss) setExpandedState(true);
  }, [discuss, setExpandedState]);

  // Auto-open the drawer when the agent is replying to an engaged chat turn.
  useEffect(() => {
    if (!liveText && !liveThinking) return;
    if (!discuss && !chatEngaged) return;
    setExpanded((open) => {
      if (open) return open;
      onConversationActive?.();
      return true;
    });
  }, [liveText, liveThinking, onConversationActive, chatEngaged, discuss]);

  // Mirror live stream ink into the guide thread so the drawer grows incrementally.
  useEffect(() => {
    if (discuss || !liveText || !chatEngaged) return;
    setGuideMessages((prev) => {
      const last = prev[prev.length - 1];
      if (last?.role === "agent" && last.streaming) {
        if (last.content === liveText) return prev;
        return [...prev.slice(0, -1), { role: "agent", content: liveText, streaming: true }];
      }
      return [...prev, { role: "agent", content: liveText, streaming: true }];
    });
  }, [discuss, liveText, chatEngaged]);

  // Turn ended — drop the streaming flag on the in-flight agent bubble.
  useEffect(() => {
    if (discuss || !chatEngaged || liveText) return;
    setGuideMessages((prev) => {
      const last = prev[prev.length - 1];
      if (last?.role === "agent" && last.streaming) {
        return [...prev.slice(0, -1), { role: "agent", content: last.content }];
      }
      return prev;
    });
  }, [discuss, chatEngaged, liveText]);

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

  useEffect(() => {
    const onFocusHandbook = () => {
      setHandbookHighlight(true);
      setExpandedState(true);
      window.setTimeout(() => setHandbookHighlight(false), 4200);
    };
    document.addEventListener(FOCUS_HANDBOOK_EMAIL_EVENT, onFocusHandbook);
    return () =>
      document.removeEventListener(FOCUS_HANDBOOK_EMAIL_EVENT, onFocusHandbook);
  }, [setExpandedState]);

  // Focus after capture mounts — chip/plan CTAs can open the dock before the form exists.
  useEffect(() => {
    if (!handbookHighlight || !showHandbookCapture) return;
    const id = window.requestAnimationFrame(() => {
      const el = document.getElementById(HANDBOOK_EMAIL_INPUT_ID);
      if (!(el instanceof HTMLInputElement)) return;
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      el.focus();
    });
    return () => window.cancelAnimationFrame(id);
  }, [handbookHighlight, showHandbookCapture]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const v = value.trim();
    if (!v || disabled) return;
    setValue("");
    setChatEngaged(true);
    const wasExpanded = expanded;
    if (!discuss) {
      setGuideMessages((prev) => [...prev, { role: "user", content: v }]);
    }
    if (wasExpanded || discuss) onConversationActive?.();
    onSay(v);
    if (!expanded) setExpandedState(true);
  };

  const showGuideThread =
    !discuss &&
    chatEngaged &&
    (guideMessages.length > 0 || liveText || liveThinking);
  const showDiscussThread = discuss && (transcript.length > 0 || liveText || liveThinking);
  const showThreadBody =
    showGuideThread || showDiscussThread || stubCapture || showHandbookCapture;

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

      <div className={styles.agentDockPanel}>
        <div className={styles.handwritingStrip} aria-live="polite">
          <div className={styles.handwritingInner}>
            <div ref={voiceEl} className={styles.handwritingVoice}>
              <VoiceZone
                voice={voice}
                error={error}
                phase={discuss ? "discuss" : phase}
                transcript={transcript}
                strip
                hideLiveStream={expanded}
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
                      liveThinkingNote={liveThinkingNote}
                      compact
                    />
                  )}
                  {stubCapture}
                </>
              ) : showThreadBody ? (
                <>
                  {guideMessages.map((msg, i) => (
                    <div
                      key={`${msg.role}-${i}-${msg.content.slice(0, 24)}`}
                      className={
                        msg.role === "agent" ? styles.threadMsgAgent : styles.threadMsgUser
                      }
                    >
                      <p
                        className={
                          msg.role === "agent" && msg.streaming
                            ? `${styles.liveInk} ${styles.settle}`
                            : undefined
                        }
                        aria-live={msg.streaming ? "polite" : undefined}
                      >
                        {msg.content}
                      </p>
                    </div>
                  ))}
                  {liveThinking && !liveText && (
                    <div className={styles.thinking}>
                      <span className={styles.pulse} aria-hidden="true" />
                      {liveThinkingNote && (
                        <span className={styles.thinkingNote}>{liveThinkingNote}…</span>
                      )}
                    </div>
                  )}
                  {showHandbookCapture && onHandbookCaptureSubmit ? (
                    <HandbookDockEmail
                      onCaptureSubmit={onHandbookCaptureSubmit}
                      disabled={disabled}
                      highlighted={handbookHighlight}
                    />
                  ) : null}
                </>
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
        </div>
      </div>
    </div>
  );
}
