"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import type { RoomPhase } from "@/lib/agent-room/discuss";
import { useAgentRoomRefs } from "../agent-room-context";
import type { ComposerChip } from "../composer";
import { DiscussThread } from "../discuss/discuss-thread";
import { VoiceZone } from "./voice-zone";
import styles from "../ink-band.module.css";
import {
  FOCUS_HANDBOOK_EMAIL_EVENT,
  HANDBOOK_EMAIL_INPUT_ID,
  EXPAND_CONVERSATION_EVENT,
} from "@/lib/agent-room/suggest-chip-targets";
import type { AgentSayHandler, AgentSayOptions } from "@/lib/agent-room/ways-in-doors";
import type { VoiceState } from "../use-agent-room-stream";
import type { ThreadTurn } from "@/lib/agent-room/thread";
import { HandbookDockEmail } from "./handbook-dock-email";
import { WaysInPanel } from "./ways-in-panel";

export type DockState = "collapsed" | "expanded";

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
  showWaysInButton,
  onOpenWaysIn,
}: {
  value: string;
  onChange: (next: string) => void;
  onSubmit: (e: FormEvent) => void;
  disabled?: boolean;
  placeholder?: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  expanded: boolean;
  onToggleExpand: () => void;
  showWaysInButton?: boolean;
  onOpenWaysIn?: () => void;
}) {
  return (
    <form className={styles.cardBody} id="composer-form" onSubmit={onSubmit}>
      {showWaysInButton && onOpenWaysIn ? (
        <div className={styles.waysInResummonRow}>
          <button
            type="button"
            className={styles.waysInResummon}
            onClick={onOpenWaysIn}
            aria-label="Open ways in"
          >
            Ways in
          </button>
        </div>
      ) : null}
      <div className={styles.composerRow}>
        <label className={styles.composerField}>
          <input
            ref={inputRef}
            type="text"
            name="message"
            id="composer-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            autoComplete="off"
            autoFocus={expanded}
            aria-label="Talk to Movemental"
            placeholder={placeholder ?? "Type here, or tap a suggestion…"}
          />
        </label>
        <div className={styles.composerActions}>
          {!expanded ? (
            <div className={styles.toolbarGroup}>
              <button type="button" className={styles.toolBtn} aria-label="Context" title="Context">
                <ContextIcon />
              </button>
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
            </div>
          ) : null}
          <button type="submit" className={styles.sendSquare} aria-label="Send" disabled={disabled}>
            <SendIcon />
          </button>
        </div>
      </div>
      {expanded ? (
        <p className={styles.chatDisclaimer}>
          Responses may be imperfect. This is a guided conversation, not a substitute for
          professional advice.
        </p>
      ) : null}
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
 * Floating agent dock — collapsed orientation OR expanded conversation (SSOT §2).
 * `dockState` is the only surface switch; thread is the single conversation log.
 */
export function AgentDock({
  voice,
  error,
  suggestions,
  disabled,
  onSay,
  placeholder,
  phase: _phase = "guide",
  thread = [],
  stubCapture,
  showHandbookCapture,
  onHandbookCaptureSubmit,
  liveThinking,
  liveThinkingNote,
  onDockStateChange,
  screenKey,
  highlightChipLabel = null,
  caption,
}: {
  voice: VoiceState;
  error: string | null;
  suggestions: ComposerChip[];
  disabled?: boolean;
  onSay: AgentSayHandler;
  placeholder?: string;
  phase?: RoomPhase;
  thread?: ThreadTurn[];
  stubCapture?: ReactNode;
  showHandbookCapture?: boolean;
  onHandbookCaptureSubmit?: (kind: string, values: Record<string, string>) => void;
  liveThinking?: boolean;
  liveThinkingNote?: string;
  onDockStateChange?: (state: DockState) => void;
  screenKey?: string;
  highlightChipLabel?: string | null;
  caption?: string;
}) {
  const [dockState, setDockState] = useState<DockState>("collapsed");
  const [value, setValue] = useState("");
  const [waysInOpen, setWaysInOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const { voiceEl } = useAgentRoomRefs();
  const prevScreenKey = useRef(screenKey);

  const expanded = dockState === "expanded";
  const captureMode = Boolean(showHandbookCapture && onHandbookCaptureSubmit);

  const expand = useCallback(
    (_reason?: "send" | "chip" | "agent" | "user") => {
      setDockState("expanded");
      onDockStateChange?.("expanded");
    },
    [onDockStateChange],
  );

  const collapse = useCallback(() => {
    setDockState("collapsed");
    onDockStateChange?.("collapsed");
  }, [onDockStateChange]);

  useEffect(() => {
    if (screenKey === undefined || screenKey === prevScreenKey.current) return;
    prevScreenKey.current = screenKey;
    setWaysInOpen(false);
    collapse();
    setValue("");
  }, [collapse, screenKey]);

  // Auto-expand when agent streaming begins (I2, I3).
  useEffect(() => {
    if (thread.some((t) => t.streaming) || (liveThinking && thread.length > 0)) {
      expand("agent");
    }
  }, [thread, liveThinking, expand]);

  useEffect(() => {
    if (!expanded || !threadRef.current) return;
    threadRef.current.scrollTop = threadRef.current.scrollHeight;
  }, [expanded, thread, liveThinking]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && expanded) collapse();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [expanded, collapse]);

  useEffect(() => {
    const onExpand = () => {
      expand("chip");
    };
    document.addEventListener(EXPAND_CONVERSATION_EVENT, onExpand);
    return () => document.removeEventListener(EXPAND_CONVERSATION_EVENT, onExpand);
  }, [expand]);

  useEffect(() => {
    const onFocusHandbook = () => expand("user");
    document.addEventListener(FOCUS_HANDBOOK_EMAIL_EVENT, onFocusHandbook);
    return () => document.removeEventListener(FOCUS_HANDBOOK_EMAIL_EVENT, onFocusHandbook);
  }, [expand]);

  useLayoutEffect(() => {
    if (!expanded) return;
    if (captureMode) {
      const el = document.getElementById(HANDBOOK_EMAIL_INPUT_ID);
      if (el instanceof HTMLInputElement) el.focus();
      return;
    }
    inputRef.current?.focus();
  }, [captureMode, expanded]);

  const composerBusy = Boolean(disabled && !expanded);

  const sendText = useCallback(
    (raw: string, opts?: { bypassDisabled?: boolean; say?: AgentSayOptions }) => {
      const v = raw.trim();
      if (!v) return;
      const allowWhileBusy = opts?.bypassDisabled || expanded;
      if (composerBusy && !allowWhileBusy) return;
      setValue("");
      setWaysInOpen(false);
      onSay(v, opts?.say);
    },
    [composerBusy, expanded, onSay],
  );

  const submit = (e: FormEvent) => {
    e.preventDefault();
    sendText(value);
  };

  const handleDoorSelect = useCallback(
    (text: string) => {
      setValue(text);
      sendText(text, { bypassDisabled: true, say: { source: "ways-in" } });
    },
    [sendText],
  );

  const conversationActive = thread.length > 0 || liveThinking || Boolean(stubCapture);

  const captureFooter =
    captureMode && expanded && onHandbookCaptureSubmit ? (
      <HandbookDockEmail onCaptureSubmit={onHandbookCaptureSubmit} disabled={disabled} />
    ) : null;

  const composerFooter = !captureMode ? (
    <ComposerForm
      value={value}
      onChange={setValue}
      onSubmit={submit}
      disabled={composerBusy}
      placeholder={placeholder}
      inputRef={inputRef}
      expanded={expanded}
      onToggleExpand={() => expand("user")}
      showWaysInButton={Boolean(expanded && conversationActive)}
      onOpenWaysIn={() => setWaysInOpen(true)}
    />
  ) : null;

  if (expanded) {
    return (
      <div
        className={`${styles.agentDock} ${styles.agentDockExpanded}`}
        id="agent-dock"
      >
        <div
          className={styles.dockBackdrop}
          id="dock-backdrop"
          aria-hidden="true"
          onClick={collapse}
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
                  onClick={collapse}
                >
                  <CollapseIcon />
                </button>
              </div>

              <div className={styles.cardThread} id="card-thread" ref={threadRef}>
                <div className={styles.cardThreadInner}>
                  {conversationActive ? (
                    <>
                      {thread.length > 0 || liveThinking ? (
                        <DiscussThread
                          thread={thread}
                          liveThinking={liveThinking}
                          liveThinkingNote={liveThinkingNote}
                          compact
                        />
                      ) : stubCapture ? null : (
                        <WaysInPanel onSelectDoor={handleDoorSelect} />
                      )}
                      {stubCapture}
                    </>
                  ) : (
                    <WaysInPanel onSelectDoor={handleDoorSelect} />
                  )}
                </div>

                {waysInOpen && conversationActive ? (
                  <div className={styles.waysInOverlay} role="presentation">
                    <WaysInPanel
                      overlay
                      onSelectDoor={handleDoorSelect}
                      onDismiss={() => setWaysInOpen(false)}
                    />
                  </div>
                ) : null}
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
              <VoiceZone voice={voice} error={error} caption={caption} />
            </div>
          </div>
        </div>

        <div className={styles.agentFloat} id="agent-float">
          <FloatChips
            suggestions={suggestions}
            disabled={composerBusy}
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
              onClick={() => expand("user")}
            >
              <span className={styles.handleBar} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
