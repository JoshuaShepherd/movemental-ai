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

function ComposerForm({
  value,
  onChange,
  onSubmit,
  disabled,
  placeholder,
  inputRef,
  expanded,
  onToggleExpand,
}: {
  value: string;
  onChange: (next: string) => void;
  onSubmit: (e: FormEvent) => void;
  disabled?: boolean;
  placeholder?: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  expanded: boolean;
  onToggleExpand: () => void;
}) {
  return (
    <form className={styles.cardBody} id="composer-form" onSubmit={onSubmit}>
      <label className={styles.cardInput}>
        <input
          ref={inputRef}
          type="text"
          name="message"
          id="composer-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
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
          <button type="button" className={styles.toolBtn} aria-label="Context" title="Context">
            <ContextIcon />
          </button>
          {!expanded ? (
            <button
              type="button"
              className={styles.toolBtn}
              id="expand-toggle"
              aria-label="Expand chat"
              aria-expanded={false}
              title="Expand chat"
              onClick={onToggleExpand}
            >
              <ExpandIcon />
            </button>
          ) : null}
          <button type="submit" className={styles.sendRound} aria-label="Send" disabled={disabled}>
            <SendIcon />
          </button>
        </div>
      </div>
    </form>
  );
}

function FloatChips({
  suggestions,
  disabled,
  highlightChipLabel,
}: {
  suggestions: ComposerChip[];
  disabled?: boolean;
  highlightChipLabel: string | null;
}) {
  if (suggestions.length === 0) return null;
  return (
    <div className={styles.floatChips} id="float-chips">
      {suggestions.map((s) => (
        <button
          key={s.label}
          type="button"
          className={`${styles.floatChip} ${
            highlightChipLabel && s.label === highlightChipLabel ? styles.floatChipLead : ""
          }`}
          disabled={disabled}
          onClick={s.onSelect}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}

/**
 * Floating agent dock — collapsed bar OR expanded conversation room (never both).
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
  onExpandedChange,
  screenKey,
  highlightChipLabel = null,
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
  onExpandedChange?: (expanded: boolean) => void;
  screenKey?: string;
  /** Label of the ONE float chip that earns the highlighter swipe (null = none). */
  highlightChipLabel?: string | null;
}) {
  const discuss = phase === "discuss";
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("");
  const [guideMessages, setGuideMessages] = useState<GuideMessage[]>([]);
  const [chatEngaged, setChatEngaged] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const { voiceEl } = useAgentRoomRefs();
  const prevScreenKey = useRef(screenKey);

  const captureMode = Boolean(showHandbookCapture && onHandbookCaptureSubmit);

  const setExpandedState = useCallback(
    (next: boolean) => {
      if (next) onConversationActive?.();
      setExpanded(next);
      onExpandedChange?.(next);
      if (next) {
        requestAnimationFrame(() => {
          if (captureMode) {
            const el = document.getElementById(HANDBOOK_EMAIL_INPUT_ID);
            if (el instanceof HTMLInputElement) el.focus();
          } else {
            inputRef.current?.focus();
          }
        });
      }
    },
    [captureMode, onConversationActive, onExpandedChange],
  );

  useEffect(() => {
    if (screenKey === undefined || screenKey === prevScreenKey.current) return;
    prevScreenKey.current = screenKey;
    setGuideMessages([]);
    setChatEngaged(false);
    setExpanded(false);
    onExpandedChange?.(false);
    setValue("");
  }, [onExpandedChange, screenKey]);

  useEffect(() => {
    if (discuss) setExpandedState(true);
  }, [discuss, setExpandedState]);

  useEffect(() => {
    if (!liveText && !liveThinking) return;
    if (!discuss && !chatEngaged) return;
    setExpanded((open) => {
      if (open) return open;
      onConversationActive?.();
      onExpandedChange?.(true);
      return true;
    });
  }, [liveText, liveThinking, onConversationActive, onExpandedChange, chatEngaged, discuss]);

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
    const onFocusHandbook = () => setExpandedState(true);
    document.addEventListener(FOCUS_HANDBOOK_EMAIL_EVENT, onFocusHandbook);
    return () => document.removeEventListener(FOCUS_HANDBOOK_EMAIL_EVENT, onFocusHandbook);
  }, [setExpandedState]);

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
    !discuss && chatEngaged && (guideMessages.length > 0 || liveText || liveThinking);
  const showDiscussThread = discuss && (transcript.length > 0 || liveText || liveThinking);
  const showThreadBody = showGuideThread || showDiscussThread || stubCapture;

  const captureFooter =
    captureMode && expanded && onHandbookCaptureSubmit ? (
      <HandbookDockEmail onCaptureSubmit={onHandbookCaptureSubmit} disabled={disabled} />
    ) : null;

  const composerFooter = !captureMode ? (
    <ComposerForm
      value={value}
      onChange={setValue}
      onSubmit={submit}
      disabled={disabled}
      placeholder={placeholder}
      inputRef={inputRef}
      expanded={expanded}
      onToggleExpand={() => setExpandedState(true)}
    />
  ) : null;

  if (expanded) {
    return (
      <div
        className={`${styles.agentDock} ${styles.agentDockExpanded}`}
        id="agent-dock"
      >
        <button
          type="button"
          className={styles.dockBackdrop}
          id="dock-backdrop"
          aria-hidden={false}
          tabIndex={0}
          onClick={() => setExpandedState(false)}
        />

        <div className={styles.agentDockPanel}>
          <div className={styles.agentFloat} id="agent-float">
            <div
              className={`${styles.agentCard} ${styles.agentCardExpanded}`}
              id="agent-card"
              role="dialog"
              aria-modal="true"
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

              <div className={styles.cardThread} id="card-thread" ref={threadRef}>
                {discuss ? (
                  <>
                    {showDiscussThread ? (
                      <DiscussThread
                        transcript={transcript}
                        liveText={liveText}
                        liveThinking={liveThinking}
                        liveThinkingNote={liveThinkingNote}
                        compact
                      />
                    ) : null}
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
                    {liveThinking && !liveText ? (
                      <div className={styles.thinking}>
                        <span className={styles.pulse} aria-hidden="true" />
                        {liveThinkingNote ? (
                          <span className={styles.thinkingNote}>{liveThinkingNote}…</span>
                        ) : null}
                      </div>
                    ) : null}
                    {stubCapture}
                  </>
                ) : (
                  <p className={styles.threadEmptyHint}>
                    Tap a suggestion below the sheet, or type to continue.
                  </p>
                )}
              </div>

              {captureFooter ?? composerFooter}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.agentDock} id="agent-dock">
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
              />
            </div>
          </div>
        </div>

        <div className={styles.agentFloat} id="agent-float">
          <FloatChips
            suggestions={suggestions}
            disabled={disabled}
            highlightChipLabel={highlightChipLabel ?? null}
          />

          <div className={styles.agentCard} id="agent-card" role="region" aria-label="Agent">
            {captureFooter ?? composerFooter}
            <button
              type="button"
              className={styles.cardHandle}
              id="card-handle"
              aria-label="Expand drawer"
              aria-expanded={false}
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
