import { ASK_AI_PROVIDERS } from "./providers";
import { resolveAskAiPrompt, type AskAiPromptKey } from "./prompts";

export type BuildAskAiMarkdownOptions = {
  prompt?: string;
  promptKey?: AskAiPromptKey;
  /** Heading above the provider row. Default: "Ask your AI about this" */
  heading?: string;
  /** Include a collapsible full-prompt block (HTML details). Default: false — links embed the prompt. */
  includePromptBlock?: boolean;
};

/**
 * Markdown block for docs/articles — three provider links with the prompt in each URL.
 * Use in movement leader research, board letters, or any exported markdown.
 */
export function buildAskAiMarkdown(options: BuildAskAiMarkdownOptions = {}): string {
  const {
    heading = "Ask your AI about this",
    includePromptBlock = false,
    prompt,
    promptKey,
  } = options;

  const resolved = resolveAskAiPrompt(prompt, promptKey);
  const links = ASK_AI_PROVIDERS.map(
    (provider) => `[${provider.label}](${provider.buildUrl(resolved)})`,
  ).join(" · ");

  const lines = [`## ${heading}`, "", links, ""];

  if (includePromptBlock) {
    lines.push("<details>", "<summary>Full prompt</summary>", "", "```", resolved, "```", "", "</details>", "");
  }

  return lines.join("\n");
}
