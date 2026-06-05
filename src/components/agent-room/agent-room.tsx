"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./agent-room.module.css";
import { useAgentRoomStream } from "./use-agent-room-stream";
import { Screen } from "./screen/screen";
import { Composer, DEFAULT_SUGGESTIONS } from "./composer";

/** Corner menu: things that are not a conversation (account / legal / escape hatch). */
function CornerMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as globalThis.Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div className={styles.menuWrap} ref={ref}>
      <button
        type="button"
        className={styles.menuBtn}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        ☰ Menu
      </button>
      {open ? (
        <div className={styles.menu} role="menu">
          <a href="/dashboard" role="menuitem">
            Sign in
          </a>
          <a href="/dashboard" role="menuitem">
            Dashboard
          </a>
          <a href="/privacy" role="menuitem">
            Privacy
          </a>
          <a href="/terms" role="menuitem">
            Terms
          </a>
          <a href="mailto:josh@movemental.ai" role="menuitem">
            Contact a human
          </a>
        </div>
      ) : null}
    </div>
  );
}

/**
 * The live Agent Room — three fixed zones (screen / voice / input), no page
 * scroll. The host speaks first via the opening hero; every subsequent turn runs
 * through the agent, which re-renders the screen to become the answer and
 * narrates it in the voice line.
 */
export function AgentRoom() {
  const { screen, voice, isStreaming, error, sendMessage, reset } = useAgentRoomStream();

  const inRealityCheck = screen.kind === "component" && screen.component === "reality_check_beat";
  const atOpening = screen.kind === "opening";
  // Suggested utterances are the general on-ramps; in a beat, the chips live in
  // the beat component, so the composer suggestions step aside.
  const suggestions = inRealityCheck ? [] : DEFAULT_SUGGESTIONS;
  const screenKey = screen.kind === "component" ? `c-${screen.nonce}` : "opening";

  return (
    <div className={`oat-surface ${styles.room}`}>
      <header className={styles.mast}>
        <button type="button" className={styles.logo} onClick={reset} aria-label="Start over">
          m<span className={styles.dot} />vemental
        </button>
        <div className={styles.mastActions}>
          {atOpening ? (
            <span className={styles.mastId}>Field Edition · a focused guide for one thing</span>
          ) : (
            <button type="button" className={styles.mastOver} onClick={reset}>
              ↻ Start over
            </button>
          )}
          <CornerMenu />
        </div>
      </header>

      <div className={styles.stage}>
        <div key={screenKey} className={styles.rise} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Screen state={screen} onSay={sendMessage} disabled={isStreaming} />
        </div>
      </div>

      <Composer
        voice={voice}
        error={error}
        isStreaming={isStreaming}
        suggestions={suggestions}
        onSay={sendMessage}
      />
    </div>
  );
}
