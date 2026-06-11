"use client";

import { useCallback, useId, useState } from "react";

import {
  ASK_AI_PROVIDERS,
  resolveAskAiPrompt,
  type AskAiPromptKey,
} from "@/lib/agent-room/ask-ai";

import styles from "../ink-band.module.css";
import { AskAiProviderIcon } from "./ask-ai-provider-icons";

type AskAiPromptButtonProps = {
  /** Raw prompt text — prefer promptKey when a catalog prompt exists. */
  prompt?: string;
  promptKey?: AskAiPromptKey;
  /** Defaults to "Ask your AI about this" */
  heading?: string;
  className?: string;
};

/**
 * Secondary end-of-content control — three provider links with a robust
 * pre-filled prompt. Never a primary CTA; never competes with the agent dock.
 */
export function AskAiPromptButton({
  prompt,
  promptKey,
  heading = "Ask your AI about this",
  className,
}: AskAiPromptButtonProps) {
  const resolvedPrompt = resolveAskAiPrompt(prompt, promptKey);
  const copyHintId = useId();
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(resolvedPrompt);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      setCopyState("failed");
      window.setTimeout(() => setCopyState("idle"), 2500);
    }
  }, [resolvedPrompt]);

  const copyLabel =
    copyState === "copied"
      ? "Prompt copied"
      : copyState === "failed"
        ? "Copy failed — select manually"
        : "Copy full prompt";

  return (
    <section
      className={className ? `${styles.askAiWrap} ${className}` : styles.askAiWrap}
      aria-labelledby={copyHintId}
    >
      <h2 className={styles.askAiHeading} id={copyHintId}>
        {heading}
      </h2>
      <ul className={styles.askAiProviders} role="list">
        {ASK_AI_PROVIDERS.map((provider) => (
          <li key={provider.id}>
            <a
              href={provider.buildUrl(resolvedPrompt)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.askAiProviderBtn}
            >
              <AskAiProviderIcon provider={provider.id} className={styles.askAiProviderIcon} />
              <span>{provider.label}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className={styles.askAiCopyRow}>
        <button type="button" className={styles.askAiCopyBtn} onClick={onCopy}>
          {copyLabel}
        </button>
        <span className={styles.askAiCopyHint}>
          Gemini may need paste — use copy if the link does not pre-fill.
        </span>
      </p>
    </section>
  );
}
