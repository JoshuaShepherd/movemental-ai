"use client";

import { useCallback, useId, type MouseEvent } from "react";

import {
  ASK_AI_PROVIDERS,
  launchAskAiProvider,
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
 * Secondary end-of-content control — three provider buttons that copy the
 * prompt and open the chosen AI chat. Never a primary CTA; never competes
 * with the agent dock.
 */
export function AskAiPromptButton({
  prompt,
  promptKey,
  heading = "Ask your AI about this",
  className,
}: AskAiPromptButtonProps) {
  const resolvedPrompt = resolveAskAiPrompt(prompt, promptKey);
  const headingId = useId();

  const onProviderClick = useCallback(
    (provider: (typeof ASK_AI_PROVIDERS)[number]) =>
      (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        launchAskAiProvider(provider, resolvedPrompt);
      },
    [resolvedPrompt],
  );

  return (
    <section
      className={className ? `${styles.askAiWrap} ${className}` : styles.askAiWrap}
      aria-labelledby={headingId}
    >
      <h2 className={styles.askAiHeading} id={headingId}>
        {heading}
      </h2>
      <ul className={styles.askAiProviders} role="list">
        {ASK_AI_PROVIDERS.map((provider) => (
          <li key={provider.id}>
            <button
              type="button"
              className={styles.askAiProviderBtn}
              onClick={onProviderClick(provider)}
            >
              <AskAiProviderIcon provider={provider.id} className={styles.askAiProviderIcon} />
              <span>{provider.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
