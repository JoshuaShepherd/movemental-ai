"use client";

import { ASK_AI_PROVIDERS, launchAskAiProvider, resolveAskAiPrompt, type AskAiPromptKey } from "@/lib/agent-room/ask-ai";

/** "Ask your AI about this": three provider buttons that copy the prompt and open that chat. */
export function MvAskAi({ promptKey, heading = "Ask your AI about this" }: { promptKey: AskAiPromptKey; heading?: string }) {
  const prompt = resolveAskAiPrompt(undefined, promptKey);
  return (
    <section className="mv-askai" aria-label={heading}>
      <p className="mv-kicker">{heading}</p>
      <div className="mv-actions">
        {ASK_AI_PROVIDERS.map((p) => (
          <button key={p.id} type="button" className="mv-btn-quiet" onClick={() => launchAskAiProvider(p, prompt)}>
            {p.label}
          </button>
        ))}
      </div>
    </section>
  );
}
