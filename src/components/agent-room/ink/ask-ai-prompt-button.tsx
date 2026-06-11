"use client";

import styles from "../ink-band.module.css";

const DEFAULT_PROMPT = `I'm reading about Movemental (movemental.ai) — a path for mission-driven organizations to adopt AI without eroding trust. The four stages are Safety, Sandbox, Training, and Tech; the Safety deliverable is an AI Safety Handbook ratified by leadership.

Summarize what Movemental is offering, who it's for, and what would be a sensible first step for a church, nonprofit, or seminary. Flag anything that sounds like marketing hype versus a concrete practice.`;

type AskAiPromptButtonProps = {
  prompt?: string;
  className?: string;
};

/**
 * Secondary end-of-content control — opens the visitor's AI tool with a clean
 * prompt about Movemental. Never a primary CTA; never competes with the agent dock.
 */
export function AskAiPromptButton({
  prompt = DEFAULT_PROMPT,
  className,
}: AskAiPromptButtonProps) {
  const href = `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;

  return (
    <p className={className ? `${styles.askAiWrap} ${className}` : styles.askAiWrap}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.askAiBtn}
      >
        Ask your AI about this
      </a>
    </p>
  );
}
