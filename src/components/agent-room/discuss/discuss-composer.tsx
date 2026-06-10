"use client";

import { useCallback, useRef, useState } from "react";

import styles from "../ink-band.module.css";

/** Max textarea height before it scrolls internally (~6 rows). */
const MAX_TEXTAREA_PX = 168;

/**
 * The Discuss-phase composer (INT-08, Model B §5.2): a multi-line `<textarea>`
 * for writing as much as you need, replacing Guide's single-line input. Send via
 * the → button or Enter (⌘/Ctrl+Enter also sends); Shift+Enter inserts a
 * newline. Replay confirms before clearing the conversation. A "back to the
 * guided path" affordance exits Discuss without discarding the sheet history.
 */
export function DiscussComposer({
  disabled,
  onSay,
  onReplay,
  onExit,
}: {
  disabled?: boolean;
  onSay: (text: string) => void;
  onReplay: () => void;
  onExit?: () => void;
}) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  const grow = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_TEXTAREA_PX)}px`;
  }, []);

  const submit = useCallback(() => {
    const v = value.trim();
    if (!v || disabled) return;
    setValue("");
    const el = ref.current;
    if (el) el.style.height = "auto";
    onSay(v);
  }, [value, disabled, onSay]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Enter") return;
    if (e.shiftKey) return; // Shift+Enter → newline
    e.preventDefault(); // Enter (and ⌘/Ctrl+Enter) → send
    submit();
  };

  const replay = () => {
    if (typeof window !== "undefined" && !window.confirm("Start over? This clears the conversation.")) {
      return;
    }
    onReplay();
  };

  return (
    <div className={`${styles.composer} ${styles.composerDiscuss}`}>
      <form
        className={styles.lineDiscuss}
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <label className={styles.fieldDiscuss}>
          <textarea
            ref={ref}
            rows={2}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              grow();
            }}
            onKeyDown={onKeyDown}
            autoComplete="off"
            aria-label="Talk to Movemental"
            placeholder="Say as much as you need…"
            disabled={disabled}
          />
        </label>
        <button type="submit" className={styles.send} aria-label="Send" disabled={disabled}>
          &rarr;
        </button>
      </form>

      <p className={styles.legend}>
        {onExit && (
          <button type="button" className={styles.replay} onClick={onExit}>
            &#8593; back to the guided path
          </button>
        )}
        <button type="button" className={styles.replay} onClick={replay}>
          &#8635; replay
        </button>
      </p>
    </div>
  );
}
